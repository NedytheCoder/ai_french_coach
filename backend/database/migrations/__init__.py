"""
Migration runner — applies numbered *.sql files in this directory.

Each file is applied exactly once; the version (filename) is recorded in
schema_migrations to prevent re-application.
"""

import glob
import os
import sqlite3


def apply_pending_migrations(conn: sqlite3.Connection) -> None:
    migrations_dir = os.path.dirname(os.path.abspath(__file__))
    sql_files = sorted(glob.glob(os.path.join(migrations_dir, "*.sql")))

    for sql_file in sql_files:
        version = os.path.basename(sql_file)
        already_applied = conn.execute(
            "SELECT 1 FROM schema_migrations WHERE version = ?", (version,)
        ).fetchone()

        if already_applied:
            continue

        with open(sql_file, "r") as f:
            sql = f.read().strip()

        try:
            conn.execute(sql)
            conn.execute(
                "INSERT INTO schema_migrations (version) VALUES (?)", (version,)
            )
            conn.commit()
            print(f"Applied migration: {version}")
        except sqlite3.OperationalError as e:
            # Idempotent safety: column already exists on re-run without schema_migrations entry
            if "duplicate column name" in str(e).lower():
                conn.execute(
                    "INSERT OR IGNORE INTO schema_migrations (version) VALUES (?)", (version,)
                )
                conn.commit()
            else:
                raise
