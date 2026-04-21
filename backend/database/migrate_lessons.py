"""
Run schema migration + lesson import using the existing SQLite setup.
"""

from __future__ import annotations

from .connection import get_connection
from .import_lessons import import_lessons
from .schema import get_schema_sql


def migrate_lessons() -> dict[str, int]:
    conn = get_connection()
    try:
        conn.executescript(get_schema_sql())
        conn.commit()
        stats = import_lessons(conn)
        return {
            "levels": stats.levels,
            "lessons": stats.lessons,
            "sections": stats.sections,
            "examples": stats.examples,
            "questions": stats.questions,
            "result_messages": stats.result_messages,
        }
    finally:
        conn.close()


if __name__ == "__main__":
    results = migrate_lessons()
    print("Lesson migration complete:")
    for key, value in results.items():
        print(f"  {key}: {value}")

