import sqlite3

from fastapi import HTTPException

from models.pairs import LanguageBrief, PairOut, PairsResponse

_PAIR_SELECT = """
    SELECT p.id, p.current_level, p.total_xp, p.streak_days, p.created_at,
           sl.code AS source_code, sl.name AS source_name,
           tl.code AS target_code, tl.name AS target_name
    FROM user_language_pairs p
    JOIN languages sl ON sl.id = p.source_language_id
    JOIN languages tl ON tl.id = p.target_language_id
"""


def _row_to_pair_out(row: sqlite3.Row) -> PairOut:
    return PairOut(
        id=row["id"],
        source_language=LanguageBrief(code=row["source_code"], name=row["source_name"]),
        target_language=LanguageBrief(code=row["target_code"], name=row["target_name"]),
        current_level=row["current_level"],
        total_xp=row["total_xp"],
        streak_days=row["streak_days"],
        created_at=row["created_at"],
    )


def _resolve_language(conn: sqlite3.Connection, code: str, field: str) -> int:
    row = conn.execute(
        "SELECT id FROM languages WHERE code = ? AND is_active = 1", (code,)
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=400, detail=f"Unknown or inactive {field}")
    return row["id"]


def list_pairs(conn: sqlite3.Connection, user_id: int) -> PairsResponse:
    rows = conn.execute(
        _PAIR_SELECT + "WHERE p.user_id = ? ORDER BY p.created_at",
        (user_id,),
    ).fetchall()
    return PairsResponse(pairs=[_row_to_pair_out(r) for r in rows])


def create_pair(
    conn: sqlite3.Connection, user_id: int, source_code: str, target_code: str
) -> PairOut:
    src_id = _resolve_language(conn, source_code, "source_language_code")
    tgt_id = _resolve_language(conn, target_code, "target_language_code")

    if src_id == tgt_id:
        raise HTTPException(status_code=422, detail="source and target languages must differ")

    try:
        conn.execute(
            "INSERT INTO user_language_pairs (user_id, source_language_id, target_language_id) VALUES (?, ?, ?)",
            (user_id, src_id, tgt_id),
        )
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=422, detail="Language pair already exists for this user")

    pair_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    row = conn.execute(_PAIR_SELECT + "WHERE p.id = ?", (pair_id,)).fetchone()
    return _row_to_pair_out(row)


def delete_pair(conn: sqlite3.Connection, user_id: int, pair_id: int) -> None:
    row = conn.execute(
        "SELECT id FROM user_language_pairs WHERE id = ? AND user_id = ?",
        (pair_id, user_id),
    ).fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Language pair not found")

    conn.execute("DELETE FROM user_language_pairs WHERE id = ?", (pair_id,))
