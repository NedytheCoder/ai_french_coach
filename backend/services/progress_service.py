import sqlite3
from datetime import date, datetime, timedelta, timezone

from fastapi import HTTPException

from models.progress import DailyRecord, LevelProgress, ProgressResponse

# XP required to advance FROM a given level to the next.
# Authoritative source per ADR-003 — do not duplicate these values elsewhere.
_XP_THRESHOLDS: dict[str, int] = {
    "A0": 500,
    "A1": 1_000,
    "A2": 2_000,
    "B1": 3_500,
    "B2": 5_000,
    "C1": 7_500,
}

# Cumulative XP earned at the start of each level.
_CUMULATIVE_XP: dict[str, int] = {
    "A0": 0,
    "A1": 500,
    "A2": 1_500,
    "B1": 3_500,
    "B2": 7_000,
    "C1": 12_000,
    "C2": 19_500,
}

# Canonical level progression order — single authoritative source per ADR-003.
CEFR_LEVELS = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]


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


def record_activity(
    conn: sqlite3.Connection,
    pair_id: int,
    xp_earned: int,
    *,
    messages_sent: int = 0,
    lessons_completed: int = 0,
) -> None:
    """Upsert today's progress_records row and update the streak for any XP-awarding event."""
    today = datetime.now(timezone.utc).date().isoformat()
    conn.execute(
        """
        INSERT INTO progress_records (pair_id, date, xp_earned, messages_sent, lessons_completed)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(pair_id, date) DO UPDATE SET
            xp_earned         = xp_earned         + ?,
            messages_sent     = messages_sent     + ?,
            lessons_completed = lessons_completed + ?
        """,
        (pair_id, today, xp_earned, messages_sent, lessons_completed,
         xp_earned, messages_sent, lessons_completed),
    )
    _update_streak(conn, pair_id, today)


def check_and_advance_level(
    conn: sqlite3.Connection, pair_id: int
) -> tuple[bool, str | None]:
    """Advance current_level if total_xp has crossed the next threshold. Returns (leveled_up, new_level)."""
    row = conn.execute(
        "SELECT current_level, total_xp FROM user_language_pairs WHERE id = ?",
        (pair_id,),
    ).fetchone()

    current = row["current_level"]
    total_xp = row["total_xp"]

    try:
        idx = CEFR_LEVELS.index(current)
    except ValueError:
        return False, None

    if idx + 1 >= len(CEFR_LEVELS):
        return False, None

    next_lvl = CEFR_LEVELS[idx + 1]
    if total_xp >= _CUMULATIVE_XP.get(next_lvl, 0):
        conn.execute(
            "UPDATE user_language_pairs SET current_level = ? WHERE id = ?",
            (next_lvl, pair_id),
        )
        return True, next_lvl

    return False, None


def _compute_level_progress(level: str, total_xp: int) -> LevelProgress:
    xp_at_start = _CUMULATIVE_XP.get(level, 0)
    xp_in_level = max(0, total_xp - xp_at_start)

    if level == "C2":
        return LevelProgress(
            current_level=level,
            xp_in_level=xp_in_level,
            xp_required=_XP_THRESHOLDS["C1"],
            percent=100,
        )

    xp_required = _XP_THRESHOLDS.get(level, 500)
    percent = min(100, round(xp_in_level / xp_required * 100)) if xp_required > 0 else 100
    return LevelProgress(
        current_level=level,
        xp_in_level=xp_in_level,
        xp_required=xp_required,
        percent=percent,
    )


def get_progress(
    conn: sqlite3.Connection, user_id: int, pair_id: int
) -> ProgressResponse:
    pair = conn.execute(
        """
        SELECT p.id, p.current_level, p.total_xp, p.streak_days, p.longest_streak
        FROM user_language_pairs p
        WHERE p.id = ? AND p.user_id = ?
        """,
        (pair_id, user_id),
    ).fetchone()
    if pair is None:
        raise HTTPException(status_code=404, detail="Language pair not found")

    totals = conn.execute(
        """
        SELECT COALESCE(SUM(lessons_completed), 0) AS lessons_completed,
               COALESCE(SUM(messages_sent), 0)     AS messages_sent
        FROM progress_records
        WHERE pair_id = ?
        """,
        (pair_id,),
    ).fetchone()

    history_rows = conn.execute(
        """
        SELECT date, xp_earned, lessons_completed
        FROM progress_records
        WHERE pair_id = ?
        ORDER BY date DESC
        LIMIT 7
        """,
        (pair_id,),
    ).fetchall()

    daily_history = [
        DailyRecord(
            date=r["date"],
            xp_earned=r["xp_earned"],
            lessons_completed=r["lessons_completed"],
        )
        for r in reversed(history_rows)
    ]

    return ProgressResponse(
        pair_id=pair_id,
        current_level=pair["current_level"],
        total_xp=pair["total_xp"],
        streak_days=pair["streak_days"],
        longest_streak=pair["longest_streak"],
        lessons_completed=totals["lessons_completed"],
        messages_sent=totals["messages_sent"],
        daily_history=daily_history,
        level_progress=_compute_level_progress(pair["current_level"], pair["total_xp"]),
    )
