"""
Migration script: legacy schema → language-pair-agnostic schema (M1-01).

The old database contained French-specific tables (levels, reception,
placement_test_types, placement_test_descriptions, immediate_question_feedback,
reading_placement_tests, listening_placement_tests, writing_placement_tests,
speaking_placement_tests). None of those tables held user-generated data —
only seed content — so they can be safely dropped.

The new schema is language-pair-agnostic and is documented in full in
docs/database_schema.md.

Usage:
    From the backend directory:
        python scripts/migrate_db.py

    From the project root:
        python backend/scripts/migrate_db.py

    Dry run (shows what would happen, makes no changes):
        python scripts/migrate_db.py --dry-run
"""

import os
import shutil
import sqlite3
import sys
from datetime import datetime, timezone

script_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(script_dir)
sys.path.insert(0, backend_dir)

from database.config import DATABASE_PATH
from database.schema import get_languages_seed_sql, get_schema_sql

MIGRATION_VERSION = "M1-01"

LEGACY_TABLES = [
    "levels",
    "reception",
    "placement_test_types",
    "placement_test_descriptions",
    "immediate_question_feedback",
    "reading_placement_tests",
    "listening_placement_tests",
    "writing_placement_tests",
    "speaking_placement_tests",
]


def backup_database(db_path: str) -> str:
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    backup_path = f"{db_path}.backup-{timestamp}"
    shutil.copy2(db_path, backup_path)
    return backup_path


def get_existing_tables(conn: sqlite3.Connection) -> list[str]:
    cursor = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    )
    return [row[0] for row in cursor.fetchall()]


def migration_already_applied(conn: sqlite3.Connection) -> bool:
    existing = get_existing_tables(conn)
    if "schema_migrations" not in existing:
        return False
    cursor = conn.execute(
        "SELECT 1 FROM schema_migrations WHERE version = ?", (MIGRATION_VERSION,)
    )
    return cursor.fetchone() is not None


def main(dry_run: bool = False) -> None:
    print("=" * 55)
    print(f"Migration {MIGRATION_VERSION}: legacy → language-pair-agnostic schema")
    if dry_run:
        print("DRY RUN — no changes will be made")
    print("=" * 55)

    if not os.path.exists(DATABASE_PATH):
        print("No existing database found. Run init_db.py instead.")
        sys.exit(0)

    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row

    if migration_already_applied(conn):
        print(f"Migration {MIGRATION_VERSION} has already been applied. Nothing to do.")
        conn.close()
        return

    existing_tables = get_existing_tables(conn)
    legacy_present = [t for t in LEGACY_TABLES if t in existing_tables]
    print(f"Legacy tables found: {legacy_present or 'none'}")

    if dry_run:
        if legacy_present:
            print(f"Would drop: {legacy_present}")
        print("Would apply new schema and seed languages table.")
        conn.close()
        return

    backup_path = backup_database(DATABASE_PATH)
    print(f"Backup created: {backup_path}")

    try:
        conn.execute("PRAGMA foreign_keys = OFF")

        for table in legacy_present:
            conn.execute(f"DROP TABLE IF EXISTS [{table}]")
            print(f"  Dropped: {table}")

        conn.executescript(get_schema_sql())
        print("New schema applied.")

        conn.executescript(get_languages_seed_sql())
        cursor = conn.execute("SELECT COUNT(*) FROM languages")
        count = cursor.fetchone()[0]
        print(f"Languages seeded: {count} rows.")

        conn.execute(
            "INSERT OR IGNORE INTO schema_migrations (version) VALUES (?)",
            (MIGRATION_VERSION,),
        )

        conn.execute("PRAGMA foreign_keys = ON")
        conn.commit()

        final_tables = get_existing_tables(conn)
        print(f"Final tables: {', '.join(sorted(final_tables))}")

    except sqlite3.Error as e:
        conn.rollback()
        print(f"Migration failed: {e}")
        print(f"Database unchanged. Restore from backup if needed: {backup_path}")
        sys.exit(1)
    finally:
        conn.close()

    print("=" * 55)
    print(f"Migration {MIGRATION_VERSION} complete.")
    print("=" * 55)


if __name__ == "__main__":
    dry_run = "--dry-run" in sys.argv
    main(dry_run=dry_run)
