"""
Assessment service — Rule 5: business logic lives here, handlers own HTTP.
"""

import json
import sqlite3
from datetime import datetime, timezone

from fastapi import HTTPException

from ai.assessment_scorer import (
    XP_BY_LEVEL,
    generate_questions,
    score_speaking,
    score_writing,
)
from services.progress_service import CEFR_LEVELS, record_activity
from models.assessment import (
    AssessmentResult,
    QuestionOut,
    StartAssessmentResponse,
    SubmitAssessmentResponse,
    GetResultResponse,
)

_QUESTIONS_PER_SKILL = 1  # one question per skill keeps generation fast (~4 API calls)


def _next_level(level: str) -> str:
    try:
        idx = CEFR_LEVELS.index(level)
    except ValueError:
        idx = 0
    return CEFR_LEVELS[min(idx + 1, len(CEFR_LEVELS) - 1)]


def _get_pair(conn: sqlite3.Connection, user_id: int, pair_id: int) -> sqlite3.Row:
    row = conn.execute(
        """
        SELECT p.id, p.current_level,
               sl.name AS source_language,
               tl.name AS target_language
        FROM user_language_pairs p
        JOIN languages sl ON sl.id = p.source_language_id
        JOIN languages tl ON tl.id = p.target_language_id
        WHERE p.id = ? AND p.user_id = ?
        """,
        (pair_id, user_id),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Language pair not found")
    return row


def _get_assessment(conn: sqlite3.Connection, user_id: int, assessment_id: int) -> sqlite3.Row:
    row = conn.execute(
        """
        SELECT a.*
        FROM assessments a
        JOIN user_language_pairs p ON p.id = a.pair_id
        WHERE a.id = ? AND p.user_id = ?
        """,
        (assessment_id, user_id),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return row


def _strip_internal_fields(question: dict) -> QuestionOut:
    """Return QuestionOut without correct_index (server-side only field)."""
    q = dict(question)
    q.pop("correct_index", None)
    return QuestionOut(**{k: v for k, v in q.items() if k in QuestionOut.model_fields})


def _build_feedback(overall_pct: float, skill_levels: dict[str, str]) -> str:
    # MVP: feedback is English-only regardless of learner's source language.
    # Post-MVP: generate via AI in source_language (see backlog F-12).
    if overall_pct >= 80:
        return "Excellent work! You demonstrated strong competency. Keep up the great practice."
    elif overall_pct >= 60:
        weakest = min(skill_levels, key=lambda s: CEFR_LEVELS.index(skill_levels[s]))
        return f"Good effort! You have solid foundations. Focus on {weakest} to progress further."
    else:
        return "Keep practicing! Every session builds your skills. Try daily conversations to improve."


# ---------------------------------------------------------------------------
# Public service functions
# ---------------------------------------------------------------------------

def start_assessment(
    conn: sqlite3.Connection,
    user_id: int,
    pair_id: int,
    assessment_type: str,
    skills: list[str],
) -> StartAssessmentResponse:
    pair = _get_pair(conn, user_id, pair_id)
    tested_level = pair["current_level"]

    # Generate questions for each requested skill (one API call per skill)
    all_questions: list[dict] = []
    question_counter = 1
    for skill in skills:
        skill_qs = generate_questions(
            source_language=pair["source_language"],
            target_language=pair["target_language"],
            level=tested_level,
            skill=skill,  # type: ignore[arg-type]
            count=_QUESTIONS_PER_SKILL,
        )
        for q in skill_qs:
            q["id"] = f"q{question_counter}"
            question_counter += 1
        all_questions.extend(skill_qs)

    # Persist assessment with full questions (including correct_index)
    conn.execute(
        """
        INSERT INTO assessments (pair_id, assessment_type, skills_json, questions_json)
        VALUES (?, ?, ?, ?)
        """,
        (pair_id, assessment_type, json.dumps(skills), json.dumps(all_questions)),
    )
    assessment_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]

    # Strip correct_index before returning questions to client
    questions_out = [_strip_internal_fields(q) for q in all_questions]
    return StartAssessmentResponse(assessment_id=assessment_id, questions=questions_out)


def submit_assessment(
    conn: sqlite3.Connection,
    user_id: int,
    assessment_id: int,
    answers: list[dict],
) -> SubmitAssessmentResponse:
    assessment = _get_assessment(conn, user_id, assessment_id)

    if assessment["status"] != "pending":
        raise HTTPException(status_code=422, detail="Assessment already completed")

    questions: list[dict] = json.loads(assessment["questions_json"] or "[]")
    q_map = {q["id"]: q for q in questions}

    pair = _get_pair(conn, user_id, assessment["pair_id"])

    skill_correct: dict[str, int] = {}
    skill_total: dict[str, int] = {}
    skill_xp: dict[str, int] = {}
    total_xp = 0

    for ans in answers:
        q = q_map.get(ans["question_id"])
        if q is None:
            continue

        skill = q["skill"]
        level = q["level"]
        xp_reward = q.get("xp_reward", XP_BY_LEVEL.get(level, 10))
        skill_total[skill] = skill_total.get(skill, 0) + 1

        if q["type"] == "multiple_choice":
            try:
                answer_idx = int(ans["answer"])
            except (ValueError, TypeError):
                answer_idx = -1
            is_correct = answer_idx == q.get("correct_index", -99)
            xp_awarded = xp_reward if is_correct else 0
            feedback = ""
        elif skill == "writing":
            result = score_writing(
                pair["source_language"], pair["target_language"],
                level, q.get("question", ""), ans["answer"], xp_reward,
            )
            is_correct = result["is_correct"]
            xp_awarded = result["xp_awarded"]
            feedback = result["feedback"]
        else:  # speaking — answer is the transcription
            result = score_speaking(
                pair["source_language"], pair["target_language"],
                level, q.get("question", ""), ans["answer"], xp_reward,
            )
            is_correct = result["is_correct"]
            xp_awarded = result["xp_awarded"]
            feedback = result["feedback"]

        if is_correct:
            skill_correct[skill] = skill_correct.get(skill, 0) + 1
        skill_xp[skill] = skill_xp.get(skill, 0) + xp_awarded
        total_xp += xp_awarded

        conn.execute(
            """
            INSERT INTO assessment_answers
                (assessment_id, question_id, skill, level, user_answer, is_correct, xp_awarded, feedback)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (assessment_id, ans["question_id"], skill, level,
             ans["answer"], int(is_correct), xp_awarded, feedback),
        )

    # Determine levels per skill and overall
    tested_level = questions[0]["level"] if questions else pair["current_level"]
    skill_levels: dict[str, str] = {}
    for skill, total in skill_total.items():
        pct = (skill_correct.get(skill, 0) / total) * 100 if total > 0 else 0
        skill_levels[skill] = _next_level(tested_level) if pct >= 70 else tested_level

    total_answered = sum(skill_total.values())
    total_correct = sum(skill_correct.values())
    overall_pct = (total_correct / total_answered * 100) if total_answered > 0 else 0
    overall_level = _next_level(tested_level) if overall_pct >= 70 else tested_level
    feedback_text = _build_feedback(overall_pct, skill_levels)

    # Update assessment record — feedback persisted so GET /result can return it (D-02)
    conn.execute(
        """
        UPDATE assessments
        SET status = 'completed', result_level = ?, skill_levels_json = ?,
            total_xp_awarded = ?, feedback = ?, completed_at = datetime('now')
        WHERE id = ?
        """,
        (overall_level, json.dumps(skill_levels), total_xp, feedback_text, assessment_id),
    )

    # Update pair: level (for all assessment types) + total_xp
    conn.execute(
        "UPDATE user_language_pairs SET current_level = ?, total_xp = total_xp + ? WHERE id = ?",
        (overall_level, total_xp, assessment["pair_id"]),
    )
    if total_xp > 0:
        record_activity(conn, assessment["pair_id"], total_xp)

    result = AssessmentResult(
        overall_level=overall_level,
        skill_levels=skill_levels,
        total_xp_awarded=total_xp,
        feedback=feedback_text,
    )
    return SubmitAssessmentResponse(assessment_id=assessment_id, result=result)


def get_result(
    conn: sqlite3.Connection,
    user_id: int,
    assessment_id: int,
) -> GetResultResponse:
    assessment = _get_assessment(conn, user_id, assessment_id)

    if assessment["status"] != "completed":
        raise HTTPException(status_code=422, detail="Assessment not yet completed")

    skill_levels: dict[str, str] = json.loads(assessment["skill_levels_json"] or "{}")
    result = AssessmentResult(
        overall_level=assessment["result_level"] or "",
        skill_levels=skill_levels,
        total_xp_awarded=assessment["total_xp_awarded"] or 0,
        feedback=assessment["feedback"] or "",
    )
    return GetResultResponse(assessment_id=assessment_id, result=result)


def score_writing_standalone(
    conn: sqlite3.Connection,
    user_id: int,
    pair_id: int,
    question: str,
    level: str,
    user_answer: str,
    xp_reward: int,
) -> dict:
    pair = _get_pair(conn, user_id, pair_id)
    return score_writing(
        pair["source_language"], pair["target_language"],
        level, question, user_answer, xp_reward,
    )


def score_speaking_standalone(
    conn: sqlite3.Connection,
    user_id: int,
    pair_id: int,
    question: str,
    level: str,
    transcription: str,
    xp_reward: int,
) -> dict:
    pair = _get_pair(conn, user_id, pair_id)
    return score_speaking(
        pair["source_language"], pair["target_language"],
        level, question, transcription, xp_reward,
    )
