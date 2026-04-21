"""
Simple lesson query utilities for DB-backed lesson content.
"""

from __future__ import annotations

import json
import sqlite3
from typing import Any

from .connection import get_connection


def _rows_to_dicts(rows: list[sqlite3.Row]) -> list[dict[str, Any]]:
    return [dict(row) for row in rows]


def _decode_json_field(rows: list[dict[str, Any]], field: str) -> None:
    for row in rows:
        value = row.get(field)
        if isinstance(value, str):
            try:
                row[field] = json.loads(value)
            except json.JSONDecodeError:
                pass


def get_all_levels(conn: sqlite3.Connection | None = None) -> list[dict[str, Any]]:
    owns_conn = conn is None
    conn = conn or get_connection()
    try:
        rows = conn.execute(
            "SELECT id, code, title, description, sort_order FROM levels ORDER BY sort_order"
        ).fetchall()
        return _rows_to_dicts(rows)
    finally:
        if owns_conn:
            conn.close()


def get_lessons_by_level(level_code: str, conn: sqlite3.Connection | None = None) -> list[dict[str, Any]]:
    owns_conn = conn is None
    conn = conn or get_connection()
    try:
        rows = conn.execute(
            """
            SELECT l.*
            FROM lessons l
            JOIN levels lv ON lv.id = l.level_id
            WHERE lv.code = ?
            ORDER BY l.sort_order, l.lesson_key
            """,
            (level_code,),
        ).fetchall()
        return _rows_to_dicts(rows)
    finally:
        if owns_conn:
            conn.close()


def get_lesson_by_key(lesson_key: str, conn: sqlite3.Connection | None = None) -> dict[str, Any] | None:
    owns_conn = conn is None
    conn = conn or get_connection()
    try:
        row = conn.execute("SELECT * FROM lessons WHERE lesson_key = ?", (lesson_key,)).fetchone()
        return dict(row) if row else None
    finally:
        if owns_conn:
            conn.close()


def get_lesson_sections(lesson_id: int, conn: sqlite3.Connection | None = None) -> list[dict[str, Any]]:
    owns_conn = conn is None
    conn = conn or get_connection()
    try:
        rows = conn.execute(
            """
            SELECT id, lesson_id, section_key, section_title, section_type, content, extra_data_json, sort_order
            FROM lesson_sections
            WHERE lesson_id = ?
            ORDER BY sort_order, id
            """,
            (lesson_id,),
        ).fetchall()
        payload = _rows_to_dicts(rows)
        _decode_json_field(payload, "extra_data_json")
        return payload
    finally:
        if owns_conn:
            conn.close()


def get_lesson_examples(lesson_id: int, conn: sqlite3.Connection | None = None) -> list[dict[str, Any]]:
    owns_conn = conn is None
    conn = conn or get_connection()
    try:
        rows = conn.execute(
            """
            SELECT id, lesson_id, section_key, french_text, english_text, extra_data_json, sort_order
            FROM lesson_examples
            WHERE lesson_id = ?
            ORDER BY sort_order, id
            """,
            (lesson_id,),
        ).fetchall()
        payload = _rows_to_dicts(rows)
        _decode_json_field(payload, "extra_data_json")
        return payload
    finally:
        if owns_conn:
            conn.close()


def get_practice_questions(lesson_id: int, conn: sqlite3.Connection | None = None) -> list[dict[str, Any]]:
    owns_conn = conn is None
    conn = conn or get_connection()
    try:
        rows = conn.execute(
            """
            SELECT id, lesson_id, question_number, topic, prompt, question_type, options_json,
                   correct_answer, explanation, difficulty, metadata_json, sort_order
            FROM practice_questions
            WHERE lesson_id = ?
            ORDER BY sort_order, id
            """,
            (lesson_id,),
        ).fetchall()
        payload = _rows_to_dicts(rows)
        _decode_json_field(payload, "options_json")
        _decode_json_field(payload, "metadata_json")
        return payload
    finally:
        if owns_conn:
            conn.close()


def get_lesson_result_messages(lesson_id: int, conn: sqlite3.Connection | None = None) -> list[dict[str, Any]]:
    owns_conn = conn is None
    conn = conn or get_connection()
    try:
        rows = conn.execute(
            """
            SELECT id, lesson_id, score_band, title, message, extra_data_json, sort_order
            FROM lesson_result_messages
            WHERE lesson_id = ?
            ORDER BY sort_order, id
            """,
            (lesson_id,),
        ).fetchall()
        payload = _rows_to_dicts(rows)
        _decode_json_field(payload, "extra_data_json")
        return payload
    finally:
        if owns_conn:
            conn.close()


def get_full_lesson(lesson_key: str, conn: sqlite3.Connection | None = None) -> dict[str, Any] | None:
    owns_conn = conn is None
    conn = conn or get_connection()
    try:
        lesson = get_lesson_by_key(lesson_key, conn)
        if not lesson:
            return None
        lesson_id = lesson["id"]
        return {
            "lesson": lesson,
            "sections": get_lesson_sections(lesson_id, conn),
            "examples": get_lesson_examples(lesson_id, conn),
            "practice_questions": get_practice_questions(lesson_id, conn),
            "result_messages": get_lesson_result_messages(lesson_id, conn),
        }
    finally:
        if owns_conn:
            conn.close()

