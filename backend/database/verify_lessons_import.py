"""
Quick verification utility for lesson import.
"""

from __future__ import annotations

from .connection import get_connection
from .lesson_loader import get_all_levels, get_full_lesson, get_lessons_by_level


def _count(conn, table: str) -> int:
    return int(conn.execute(f"SELECT COUNT(*) AS c FROM {table}").fetchone()["c"])


def verify(sample_lesson_key: str = "a1-lesson1") -> None:
    conn = get_connection()
    try:
        print("Verification summary:")
        print(f"  levels inserted: {_count(conn, 'levels')}")
        print(f"  lessons inserted: {_count(conn, 'lessons')}")
        print(f"  sections inserted: {_count(conn, 'lesson_sections')}")
        print(f"  examples inserted: {_count(conn, 'lesson_examples')}")
        print(f"  questions inserted: {_count(conn, 'practice_questions')}")
        print(f"  result messages inserted: {_count(conn, 'lesson_result_messages')}")

        levels = get_all_levels(conn)
        print(f"\nLevels present: {[row['code'] for row in levels]}")

        a1_lessons = get_lessons_by_level("A1", conn)
        print(f"A1 lessons available: {len(a1_lessons)}")

        payload = get_full_lesson(sample_lesson_key, conn)
        if not payload:
            print(f"Sample lesson '{sample_lesson_key}' not found.")
            return

        print(f"\nSample lesson loaded: {payload['lesson']['lesson_key']}")
        print(f"  title: {payload['lesson']['title']}")
        print(f"  sections: {len(payload['sections'])}")
        print(f"  examples: {len(payload['examples'])}")
        print(f"  practice_questions: {len(payload['practice_questions'])}")
        print(f"  result_messages: {len(payload['result_messages'])}")
    finally:
        conn.close()


if __name__ == "__main__":
    verify()

