import sqlite3
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException

from ai.chat_handler import chat as ai_chat
from models.chat import (
    ChatResponse,
    MessagesResponse,
    MessageOut,
    SessionOut,
    SessionsResponse,
)
from services.progress_service import record_activity

_XP_PER_REPLY = 5
_HISTORY_LIMIT = 20  # messages sent to the AI for context


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

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


def _get_or_create_session(
    conn: sqlite3.Connection, pair_id: int, session_id: int | None, mode: str
) -> int:
    if session_id is not None:
        row = conn.execute(
            "SELECT id FROM conversation_sessions WHERE id = ? AND pair_id = ?",
            (session_id, pair_id),
        ).fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Session not found")
        return row["id"]

    conn.execute(
        "INSERT INTO conversation_sessions (pair_id, mode) VALUES (?, ?)",
        (pair_id, mode),
    )
    return conn.execute("SELECT last_insert_rowid()").fetchone()[0]


def _fetch_history(conn: sqlite3.Connection, session_id: int) -> list[dict]:
    rows = conn.execute(
        "SELECT role, content FROM messages WHERE session_id = ? ORDER BY id DESC LIMIT ?",
        (session_id, _HISTORY_LIMIT),
    ).fetchall()
    return [{"role": r["role"], "content": r["content"]} for r in reversed(rows)]


def _persist_message(
    conn: sqlite3.Connection, session_id: int, role: str, content: str
) -> None:
    conn.execute(
        "INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)",
        (session_id, role, content),
    )
    conn.execute(
        """
        UPDATE conversation_sessions
        SET message_count = message_count + 1,
            last_message_at = datetime('now')
        WHERE id = ?
        """,
        (session_id,),
    )


def _award_xp(conn: sqlite3.Connection, pair_id: int) -> None:
    conn.execute(
        "UPDATE user_language_pairs SET total_xp = total_xp + ? WHERE id = ?",
        (_XP_PER_REPLY, pair_id),
    )
    record_activity(conn, pair_id, _XP_PER_REPLY, messages_sent=1)


def _save_vocabulary(
    conn: sqlite3.Connection,
    pair_id: int,
    vocab: list[tuple[str, str]],
) -> list[str]:
    saved: list[str] = []
    next_review = (datetime.now(timezone.utc).date() + timedelta(days=1)).isoformat()
    for target_word, source_translation in vocab:
        try:
            conn.execute(
                """
                INSERT OR IGNORE INTO vocabulary_items
                    (pair_id, target_word, source_translation, next_review_at)
                VALUES (?, ?, ?, ?)
                """,
                (pair_id, target_word, source_translation or "", next_review),
            )
            saved.append(target_word)
        except sqlite3.Error:
            pass
    return saved


# ---------------------------------------------------------------------------
# Public service functions
# ---------------------------------------------------------------------------

def send_message(
    conn: sqlite3.Connection,
    user_id: int,
    pair_id: int,
    session_id: int | None,
    message: str,
    mode: str,
) -> ChatResponse:
    pair = _get_pair(conn, user_id, pair_id)
    sid = _get_or_create_session(conn, pair_id, session_id, mode)

    history = _fetch_history(conn, sid)
    history.append({"role": "user", "content": message})

    reply, vocab_pairs = ai_chat(
        history=history,
        source_language=pair["source_language"],
        target_language=pair["target_language"],
        level=pair["current_level"],
        mode=mode,  # type: ignore[arg-type]
    )

    _persist_message(conn, sid, "user", message)
    _persist_message(conn, sid, "assistant", reply)
    _award_xp(conn, pair_id)
    vocabulary_saved = _save_vocabulary(conn, pair_id, vocab_pairs)

    return ChatResponse(
        session_id=sid,
        reply=reply,
        xp_awarded=_XP_PER_REPLY,
        vocabulary_saved=vocabulary_saved,
    )


def list_sessions(
    conn: sqlite3.Connection,
    user_id: int,
    pair_id: int,
    limit: int,
    offset: int,
) -> SessionsResponse:
    _get_pair(conn, user_id, pair_id)  # ownership check
    rows = conn.execute(
        """
        SELECT id, pair_id, mode, message_count, created_at, last_message_at
        FROM conversation_sessions
        WHERE pair_id = ?
        ORDER BY last_message_at DESC NULLS LAST, created_at DESC
        LIMIT ? OFFSET ?
        """,
        (pair_id, limit, offset),
    ).fetchall()
    return SessionsResponse(sessions=[SessionOut(**dict(r)) for r in rows])


def get_messages(
    conn: sqlite3.Connection,
    user_id: int,
    session_id: int,
) -> MessagesResponse:
    session = conn.execute(
        """
        SELECT cs.id, cs.pair_id
        FROM conversation_sessions cs
        JOIN user_language_pairs p ON p.id = cs.pair_id
        WHERE cs.id = ? AND p.user_id = ?
        """,
        (session_id, user_id),
    ).fetchone()
    if session is None:
        raise HTTPException(status_code=404, detail="Session not found")

    rows = conn.execute(
        "SELECT id, role, content, created_at FROM messages WHERE session_id = ? ORDER BY id",
        (session_id,),
    ).fetchall()
    return MessagesResponse(
        session_id=session_id,
        messages=[MessageOut(**dict(r)) for r in rows],
    )
