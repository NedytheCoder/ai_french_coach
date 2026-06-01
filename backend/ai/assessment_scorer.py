"""
Assessment AI layer — question generation and answer scoring.

Rule 2: the only place in the codebase that calls OpenAI for assessment tasks.
Rule 1: no language name is hard-coded; source_language / target_language are
        always injected from the caller's pair record.
ADR-002: isolated behind this module so the provider is swappable.
ADR-003: XP per question scales with CEFR level (10 XP at A0 → 40 XP at C2).
"""

import json
import os
from openai import OpenAI

from ai.prompt_builder import AssessmentSkill, PromptBuilder

_client: OpenAI | None = None
_builder = PromptBuilder()

# XP awarded per correct question by CEFR level (ADR-003: 10-40 XP by level).
XP_BY_LEVEL: dict[str, int] = {
    "A0": 10, "A1": 15, "A2": 20,
    "B1": 25, "B2": 30, "C1": 35, "C2": 40,
}
_DEFAULT_XP = 10


def _get_client() -> OpenAI:
    global _client
    if _client is None:
        _client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    return _client


def _xp_for_level(level: str) -> int:
    return XP_BY_LEVEL.get(level, _DEFAULT_XP)


def _call_json(system_prompt: str, user_content: str = "Generate now.") -> dict:
    """Single OpenAI call that returns guaranteed JSON."""
    response = _get_client().chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ],
    )
    return json.loads(response.choices[0].message.content or "{}")


def generate_questions(
    source_language: str,
    target_language: str,
    level: str,
    skill: AssessmentSkill,
    count: int = 1,
) -> list[dict]:
    """
    Generate `count` assessment questions for the given skill and level.

    Each returned dict has:
        id, skill, type, level, xp_reward, instructions
        + for multiple_choice: passage, question, options, correct_index
        + for open_response:  question, placeholder

    `correct_index` is present for multiple_choice questions and must be
    stripped before sending questions to the client (handled by M2-02).
    """
    system_prompt = _builder.assessment_question_prompt(
        source_language, target_language, level, skill, count
    )
    raw = _call_json(system_prompt)

    questions: list[dict] = []
    raw_list = raw.get("questions", [raw])  # graceful fallback if AI returns bare object

    xp = _xp_for_level(level)
    for i, q in enumerate(raw_list[:count], start=1):
        q["id"] = f"q{i}"
        q["skill"] = skill
        q["level"] = level
        q["xp_reward"] = xp
        if "instructions" not in q:
            q["instructions"] = ""
        questions.append(q)

    return questions


def score_writing(
    source_language: str,
    target_language: str,
    level: str,
    question: str,
    user_answer: str,
    xp_reward: int,
) -> dict:
    """
    Score a written answer.

    Returns: {is_correct: bool, feedback: str, xp_awarded: int}
    """
    return _score(source_language, target_language, level, "writing", question, user_answer, xp_reward)


def score_speaking(
    source_language: str,
    target_language: str,
    level: str,
    question: str,
    transcription: str,
    xp_reward: int,
) -> dict:
    """
    Score a spoken answer given its transcription.

    Returns: {is_correct: bool, feedback: str, xp_awarded: int}
    """
    return _score(source_language, target_language, level, "speaking", question, transcription, xp_reward)


def _score(
    source_language: str,
    target_language: str,
    level: str,
    skill: str,
    question: str,
    user_answer: str,
    xp_reward: int,
) -> dict:
    if not user_answer or not user_answer.strip():
        return {
            "is_correct": False,
            "feedback": "",
            "xp_awarded": 0,
        }

    system_prompt = _builder.assessment_scoring_prompt(
        source_language, target_language, level, skill, question, user_answer
    )
    raw = _call_json(system_prompt)

    is_correct: bool = bool(raw.get("is_correct", False))
    feedback: str = str(raw.get("feedback", ""))
    score_percent: int = max(0, min(100, int(raw.get("score_percent", 0))))
    xp_awarded: int = max(0, round(score_percent / 100 * xp_reward))

    return {
        "is_correct": is_correct,
        "feedback": feedback,
        "xp_awarded": xp_awarded,
    }
