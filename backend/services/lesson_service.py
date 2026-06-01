import json
import sqlite3
from datetime import date, datetime, timedelta, timezone

from fastapi import HTTPException

from ai.lesson_generator import generate_lesson as ai_generate
from models.lesson import CompleteLessonResponse, LessonOut
from services.progress_service import check_and_advance_level


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


def _row_to_lesson_out(row: sqlite3.Row) -> LessonOut:
    return LessonOut(
        lesson_id=row["id"],
        pair_id=row["pair_id"],
        level=row["level"],
        lesson_type=row["lesson_type"],
        title=row["title"],
        xp_reward=row["xp_reward"],
        content=json.loads(row["content_json"]),
        is_completed=bool(row["is_completed"]),
        created_at=row["created_at"],
    )


def _update_streak(conn: sqlite3.Connection, pair_id: int, today_str: str) -> None:
    row = conn.execute(
        "SELECT streak_days, longest_streak, last_activity_date FROM user_language_pairs WHERE id = ?",
        (pair_id,),
    ).fetchone()

    last = row["last_activity_date"]
    if last == today_str:
        return

    today = date.fromisoformat(today_str)
    if last and date.fromisoformat(last) == today - timedelta(days=1):
        new_streak = row["streak_days"] + 1
    else:
        new_streak = 1

    new_longest = max(row["longest_streak"], new_streak)
    conn.execute(
        """
        UPDATE user_language_pairs
        SET streak_days = ?, longest_streak = ?, last_activity_date = ?
        WHERE id = ?
        """,
        (new_streak, new_longest, today_str, pair_id),
    )


def _award_xp(conn: sqlite3.Connection, pair_id: int, xp: int, today: str) -> None:
    conn.execute(
        "UPDATE user_language_pairs SET total_xp = total_xp + ? WHERE id = ?",
        (xp, pair_id),
    )
    conn.execute(
        """
        INSERT INTO progress_records (pair_id, date, xp_earned, lessons_completed)
        VALUES (?, ?, ?, 1)
        ON CONFLICT(pair_id, date) DO UPDATE SET
            xp_earned = xp_earned + ?,
            lessons_completed = lessons_completed + 1
        """,
        (pair_id, today, xp, xp),
    )
    _update_streak(conn, pair_id, today)


# ---------------------------------------------------------------------------
# Public service functions
# ---------------------------------------------------------------------------

def generate_or_get_lesson(
    conn: sqlite3.Connection,
    user_id: int,
    pair_id: int,
    level: str,
    lesson_type: str,
    topic: str | None,
) -> LessonOut:
    pair = _get_pair(conn, user_id, pair_id)

    existing = conn.execute(
        """
        SELECT id, pair_id, level, lesson_type, title, topic, content_json,
               xp_reward, is_completed, created_at
        FROM lessons
        WHERE pair_id = ? AND level = ? AND lesson_type = ?
          AND COALESCE(topic, '') = COALESCE(?, '')
        ORDER BY created_at DESC
        LIMIT 1
        """,
        (pair_id, level, lesson_type, topic or ""),
    ).fetchone()

    if existing is not None:
        return _row_to_lesson_out(existing)

    generated = ai_generate(
        source_language=pair["source_language"],
        target_language=pair["target_language"],
        level=level,
        lesson_type=lesson_type,  # type: ignore[arg-type]
        topic=topic,
    )

    conn.execute(
        """
        INSERT INTO lessons (pair_id, level, lesson_type, title, topic, content_json, xp_reward)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            pair_id,
            level,
            lesson_type,
            generated.title,
            topic,
            json.dumps(generated.content),
            generated.xp_reward,
        ),
    )
    lesson_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]

    row = conn.execute(
        """
        SELECT id, pair_id, level, lesson_type, title, topic, content_json,
               xp_reward, is_completed, created_at
        FROM lessons WHERE id = ?
        """,
        (lesson_id,),
    ).fetchone()
    return _row_to_lesson_out(row)


def get_lesson(
    conn: sqlite3.Connection, user_id: int, lesson_id: int
) -> LessonOut:
    row = conn.execute(
        """
        SELECT l.id, l.pair_id, l.level, l.lesson_type, l.title, l.topic,
               l.content_json, l.xp_reward, l.is_completed, l.created_at
        FROM lessons l
        JOIN user_language_pairs p ON p.id = l.pair_id
        WHERE l.id = ? AND p.user_id = ?
        """,
        (lesson_id, user_id),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return _row_to_lesson_out(row)


def complete_lesson(
    conn: sqlite3.Connection,
    user_id: int,
    lesson_id: int,
    score: int,
    max_score: int,
) -> CompleteLessonResponse:
    row = conn.execute(
        """
        SELECT l.id, l.pair_id, l.xp_reward, l.is_completed
        FROM lessons l
        JOIN user_language_pairs p ON p.id = l.pair_id
        WHERE l.id = ? AND p.user_id = ?
        """,
        (lesson_id, user_id),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Lesson not found")

    pair_id = row["pair_id"]

    if row["is_completed"]:
        total_xp = conn.execute(
            "SELECT total_xp FROM user_language_pairs WHERE id = ?", (pair_id,)
        ).fetchone()["total_xp"]
        return CompleteLessonResponse(
            lesson_id=lesson_id,
            xp_awarded=0,
            total_xp=total_xp,
            level_up=False,
            new_level=None,
        )

    xp_reward = row["xp_reward"]
    xp_awarded = max(0, min(round(xp_reward * score / max_score), xp_reward)) if max_score > 0 else xp_reward

    conn.execute(
        """
        UPDATE lessons
        SET is_completed = 1, score = ?, max_score = ?, completed_at = datetime('now')
        WHERE id = ?
        """,
        (score, max_score, lesson_id),
    )

    today = datetime.now(timezone.utc).date().isoformat()
    _award_xp(conn, pair_id, xp_awarded, today)

    level_up, new_level = check_and_advance_level(conn, pair_id)

    total_xp = conn.execute(
        "SELECT total_xp FROM user_language_pairs WHERE id = ?", (pair_id,)
    ).fetchone()["total_xp"]

    return CompleteLessonResponse(
        lesson_id=lesson_id,
        xp_awarded=xp_awarded,
        total_xp=total_xp,
        level_up=level_up,
        new_level=new_level,
    )
