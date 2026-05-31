"""
Database initialization script for fresh installs.

Creates the data directory if needed, applies the full schema, and seeds
the languages table. Safe to re-run — all statements use IF NOT EXISTS
and INSERT OR IGNORE.

Usage:
    From the backend directory:
        python scripts/init_db.py

    From the project root:
        python backend/scripts/init_db.py
"""

import os
import sqlite3
import sys

script_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(script_dir)
sys.path.insert(0, backend_dir)

from database.config import DATA_DIR, DATABASE_PATH
from database.connection import get_connection
from database.schema import get_languages_seed_sql, get_schema_sql


def ensure_data_directory() -> None:
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        print(f"Created data directory: {DATA_DIR}")
    else:
        print(f"Data directory exists: {DATA_DIR}")


def initialize_database() -> None:
    conn = get_connection()
    try:
        conn.executescript(get_schema_sql())
        conn.executescript(get_languages_seed_sql())
        conn.commit()

        cursor = conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        )
        tables = [row["name"] for row in cursor.fetchall()]
        print(f"Schema applied. Tables: {', '.join(sorted(tables))}")

        cursor = conn.execute("SELECT code, name FROM languages ORDER BY code")
        languages = cursor.fetchall()
        print(f"Languages seeded ({len(languages)}): {', '.join(r['code'] for r in languages)}")

    except sqlite3.Error as e:
        print(f"Error initializing database: {e}")
        sys.exit(1)
    finally:
        conn.close()


def main() -> None:
    print("=" * 50)
    print("Database Initialization")
    print("=" * 50)

    ensure_data_directory()
    print(f"Database: {DATABASE_PATH}")
    initialize_database()

    print("=" * 50)
    print("Initialization complete.")
    print("=" * 50)


if __name__ == "__main__":
    main()
