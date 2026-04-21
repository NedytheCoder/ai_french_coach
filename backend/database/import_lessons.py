"""
Import hardcoded frontend lesson data into SQLite.

Safe for reruns:
- levels are upserted by code
- lessons are upserted by lesson_key
- child rows are replaced per lesson to avoid duplicate rows
"""

from __future__ import annotations

import sqlite3
from dataclasses import dataclass

from .connection import get_connection
from .serializers import (
    build_lesson_bundle,
    discover_lesson_data_files,
    get_level_seed_rows,
)


@dataclass
class ImportStats:
    levels: int = 0
    lessons: int = 0
    sections: int = 0
    examples: int = 0
    questions: int = 0
    result_messages: int = 0


def upsert_level(conn: sqlite3.Connection, row: dict) -> int:
    conn.execute(
        """
        INSERT INTO levels (code, title, description, sort_order)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(code) DO UPDATE SET
            title = excluded.title,
            description = excluded.description,
            sort_order = excluded.sort_order
        """,
        (row["code"], row["title"], row["description"], row["sort_order"]),
    )
    level_id = conn.execute("SELECT id FROM levels WHERE code = ?", (row["code"],)).fetchone()["id"]
    return int(level_id)


def upsert_lesson(conn: sqlite3.Connection, level_id: int, row: dict) -> int:
    conn.execute(
        """
        INSERT INTO lessons (
            level_id, lesson_key, lesson_slug, lesson_number, title, subtitle,
            objective, description, sort_order, next_lesson_key, source_path, source_hash
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(lesson_key) DO UPDATE SET
            level_id = excluded.level_id,
            lesson_slug = excluded.lesson_slug,
            lesson_number = excluded.lesson_number,
            title = excluded.title,
            subtitle = excluded.subtitle,
            objective = excluded.objective,
            description = excluded.description,
            sort_order = excluded.sort_order,
            next_lesson_key = excluded.next_lesson_key,
            source_path = excluded.source_path,
            source_hash = excluded.source_hash,
            updated_at = CURRENT_TIMESTAMP
        """,
        (
            level_id,
            row["lesson_key"],
            row["lesson_slug"],
            row["lesson_number"],
            row["title"],
            row["subtitle"],
            row["objective"],
            row["description"],
            row["sort_order"],
            row["next_lesson_key"],
            row["source_path"],
            row["source_hash"],
        ),
    )
    lesson_id = conn.execute(
        "SELECT id FROM lessons WHERE lesson_key = ?",
        (row["lesson_key"],),
    ).fetchone()["id"]
    return int(lesson_id)


def replace_lesson_children(conn: sqlite3.Connection, lesson_id: int, bundle) -> None:
    conn.execute("DELETE FROM lesson_sections WHERE lesson_id = ?", (lesson_id,))
    conn.execute("DELETE FROM lesson_examples WHERE lesson_id = ?", (lesson_id,))
    conn.execute("DELETE FROM practice_questions WHERE lesson_id = ?", (lesson_id,))
    conn.execute("DELETE FROM lesson_result_messages WHERE lesson_id = ?", (lesson_id,))

    for row in bundle.sections:
        conn.execute(
            """
            INSERT INTO lesson_sections (
                lesson_id, section_key, section_title, section_type, content, extra_data_json, sort_order
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                lesson_id,
                row["section_key"],
                row["section_title"],
                row["section_type"],
                row["content"],
                row["extra_data_json"],
                row["sort_order"],
            ),
        )

    for row in bundle.examples:
        conn.execute(
            """
            INSERT INTO lesson_examples (
                lesson_id, section_key, french_text, english_text, extra_data_json, sort_order
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                lesson_id,
                row["section_key"],
                row["french_text"],
                row["english_text"],
                row["extra_data_json"],
                row["sort_order"],
            ),
        )

    for row in bundle.practice_questions:
        conn.execute(
            """
            INSERT INTO practice_questions (
                lesson_id, question_number, topic, prompt, question_type, options_json,
                correct_answer, explanation, difficulty, metadata_json, sort_order
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                lesson_id,
                row["question_number"],
                row["topic"],
                row["prompt"],
                row["question_type"],
                row["options_json"],
                row["correct_answer"],
                row["explanation"],
                row["difficulty"],
                row["metadata_json"],
                row["sort_order"],
            ),
        )

    for row in bundle.result_messages:
        conn.execute(
            """
            INSERT INTO lesson_result_messages (
                lesson_id, score_band, title, message, extra_data_json, sort_order
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                lesson_id,
                row["score_band"],
                row["title"],
                row["message"],
                row["extra_data_json"],
                row["sort_order"],
            ),
        )


def import_lessons(conn: sqlite3.Connection | None = None) -> ImportStats:
    owns_conn = conn is None
    conn = conn or get_connection()
    stats = ImportStats()

    try:
        level_id_by_code: dict[str, int] = {}
        for level_row in get_level_seed_rows():
            level_id_by_code[level_row["code"]] = upsert_level(conn, level_row)
            stats.levels += 1

        for data_file in discover_lesson_data_files():
            bundle = build_lesson_bundle(data_file)
            level_id = level_id_by_code[bundle.lesson_row["level_code"]]
            lesson_id = upsert_lesson(conn, level_id, bundle.lesson_row)
            stats.lessons += 1

            replace_lesson_children(conn, lesson_id, bundle)
            stats.sections += len(bundle.sections)
            stats.examples += len(bundle.examples)
            stats.questions += len(bundle.practice_questions)
            stats.result_messages += len(bundle.result_messages)

        conn.commit()
        return stats
    finally:
        if owns_conn:
            conn.close()


if __name__ == "__main__":
    result = import_lessons()
    print("Import complete:")
    print(f"  levels: {result.levels}")
    print(f"  lessons: {result.lessons}")
    print(f"  sections: {result.sections}")
    print(f"  examples: {result.examples}")
    print(f"  questions: {result.questions}")
    print(f"  result_messages: {result.result_messages}")

