import sqlite3
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException

from models.vocabulary import ReviewResponse, VocabularyItemOut, VocabularyListResponse
from services.progress_service import record_activity

_XP_PER_CORRECT_REVIEW = 2
_INITIAL_INTERVAL_DAYS = 1


def _verify_pair_ownership(conn: sqlite3.Connection, user_id: int, pair_id: int) -> None:
    row = conn.execute(
        "SELECT id FROM user_language_pairs WHERE id = ? AND user_id = ?",
        (pair_id, user_id),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Language pair not found")


def _parse_date_or_datetime(value: str) -> datetime:
    """Parse either a date string (YYYY-MM-DD) or ISO datetime into a UTC datetime."""
    if len(value) == 10:  # date only: "2026-06-01"
        return datetime.fromisoformat(value).replace(tzinfo=timezone.utc)
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def _compute_next_review(correct: bool, last_seen_at: str | None, next_review_at: str | None) -> str:
    now = datetime.now(timezone.utc)

    if correct and last_seen_at and next_review_at:
        try:
            last = _parse_date_or_datetime(last_seen_at)
            nxt = _parse_date_or_datetime(next_review_at)
            current_interval = max(_INITIAL_INTERVAL_DAYS, (nxt - last).days)
        except (ValueError, OverflowError):
            current_interval = _INITIAL_INTERVAL_DAYS
        new_interval = current_interval * 2
    else:
        new_interval = _INITIAL_INTERVAL_DAYS

    next_dt = now + timedelta(days=new_interval)
    return next_dt.strftime("%Y-%m-%dT00:00:00Z")


def list_vocabulary(
    conn: sqlite3.Connection,
    user_id: int,
    pair_id: int,
    due_for_review: bool,
    limit: int,
) -> VocabularyListResponse:
    _verify_pair_ownership(conn, user_id, pair_id)

    now_iso = datetime.now(timezone.utc).isoformat()

    if due_for_review:
        rows = conn.execute(
            """
            SELECT id, target_word, source_translation, context_sentence,
                   times_seen, times_correct, next_review_at
            FROM vocabulary_items
            WHERE pair_id = ? AND (next_review_at IS NULL OR next_review_at <= ?)
            ORDER BY next_review_at ASC NULLS FIRST
            LIMIT ?
            """,
            (pair_id, now_iso, limit),
        ).fetchall()
    else:
        rows = conn.execute(
            """
            SELECT id, target_word, source_translation, context_sentence,
                   times_seen, times_correct, next_review_at
            FROM vocabulary_items
            WHERE pair_id = ?
            ORDER BY created_at DESC
            LIMIT ?
            """,
            (pair_id, limit),
        ).fetchall()

    return VocabularyListResponse(items=[VocabularyItemOut(**dict(r)) for r in rows])


def review_vocabulary(
    conn: sqlite3.Connection,
    user_id: int,
    item_id: int,
    correct: bool,
) -> ReviewResponse:
    row = conn.execute(
        """
        SELECT v.id, v.pair_id, v.last_seen_at, v.next_review_at
        FROM vocabulary_items v
        JOIN user_language_pairs p ON p.id = v.pair_id
        WHERE v.id = ? AND p.user_id = ?
        """,
        (item_id, user_id),
    ).fetchone()

    if row is None:
        raise HTTPException(status_code=404, detail="Vocabulary item not found")

    now_iso = datetime.now(timezone.utc).isoformat()
    next_review = _compute_next_review(correct, row["last_seen_at"], row["next_review_at"])
    xp = _XP_PER_CORRECT_REVIEW if correct else 0

    conn.execute(
        """
        UPDATE vocabulary_items
        SET times_seen    = times_seen + 1,
            times_correct = times_correct + ?,
            last_seen_at  = ?,
            next_review_at = ?
        WHERE id = ?
        """,
        (1 if correct else 0, now_iso, next_review, item_id),
    )

    if xp > 0:
        conn.execute(
            "UPDATE user_language_pairs SET total_xp = total_xp + ? WHERE id = ?",
            (xp, row["pair_id"]),
        )
        record_activity(conn, row["pair_id"], xp)

    return ReviewResponse(item_id=item_id, next_review_at=next_review, xp_awarded=xp)
