"""
Script entrypoint for lesson migration.

Usage:
  python backend/scripts/migrate_lessons.py
"""

from __future__ import annotations

import os
import sys

script_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(script_dir)
sys.path.insert(0, backend_dir)

from database.migrate_lessons import migrate_lessons


def main() -> None:
    stats = migrate_lessons()
    print("Lesson migration complete:")
    for key, value in stats.items():
        print(f"  {key}: {value}")


if __name__ == "__main__":
    main()

