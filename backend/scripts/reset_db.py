#!/usr/bin/env python3
"""
Reset Database Script
=====================

⚠️  WARNING: DESTRUCTIVE OPERATION  ⚠️

This script:
1. Deletes the entire SQLite database file
2. Recreates all tables from scratch
3. All data will be permanently lost!

Only use this during development or when you explicitly want
to start fresh. Never run this in production without backups.

Usage:
------
# From project root:
python -m backend.scripts.reset_db

# From backend directory:
python scripts/reset_db.py

Safety:
-------
- Requires confirmation before deletion
- Shows database path for verification
"""

import sys
import os
from pathlib import Path

# Add backend to path if running directly
backend_dir = Path(__file__).parent.parent.resolve()
if backend_dir.name == "backend":
    sys.path.insert(0, str(backend_dir.parent))

from backend.database import get_connection, create_tables, drop_tables, get_db_path
from backend.database.config import DATA_DIR, DB_PATH
from backend.utils.logger import get_logger

logger = get_logger("reset_db")


def confirm_deletion():
    """
    Prompt user for confirmation before deleting database.
    
    Returns:
        bool: True if user confirmed, False otherwise
    """
    print("\n" + "=" * 60)
    print("⚠️   DANGER: DATABASE RESET")
    print("=" * 60)
    print(f"\nThis will PERMANENTLY DELETE:")
    print(f"  Database file: {DB_PATH}")
    print(f"\nAll data will be lost forever!")
    print("=" * 60)
    
    response = input("\nType 'RESET' to confirm deletion: ").strip()
    return response == "RESET"


def reset_database(force: bool = False):
    """
    Reset the database by deleting and recreating it.
    
    Args:
        force: If True, skip confirmation prompt (use with caution)
    
    Returns:
        int: 0 on success, 1 on failure or cancellation
    """
    try:
        logger.info("=" * 50)
        logger.info("Database Reset")
        logger.info("=" * 50)
        
        # Get confirmation unless forced
        if not force:
            if not confirm_deletion():
                logger.warning("Reset cancelled by user")
                return 0
        
        db_path = get_db_path()
        
        # Check if database file exists
        if DB_PATH.exists():
            logger.warning(f"Deleting database: {db_path}")
            
            # Close any open connections (SQLite handles this)
            # Delete the file
            DB_PATH.unlink()
            
            logger.success("Database file deleted")
        else:
            logger.info("No existing database file found")
        
        # Recreate database
        logger.info("Recreating database...")
        
        with get_connection() as conn:
            create_tables(conn)
            
            # Verify tables
            cursor = conn.cursor()
            cursor.execute("""
                SELECT name FROM sqlite_master 
                WHERE type='table' AND name NOT LIKE 'sqlite_%'
            """)
            tables = [row[0] for row in cursor.fetchall()]
            cursor.close()
            
            logger.success(f"Created {len(tables)} tables: {', '.join(tables)}")
        
        logger.success("Database reset complete!")
        logger.info("=" * 50)
        
        return 0
        
    except Exception as e:
        logger.error(f"Failed to reset database: {e}")
        return 1


def main():
    """
    Main entry point with command-line argument handling.
    
    Supports:
    - --force or -f: Skip confirmation (DANGEROUS)
    """
    force = "--force" in sys.argv or "-f" in sys.argv
    
    if force:
        logger.warning("Force flag detected - skipping confirmation!")
    
    exit_code = reset_database(force=force)
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
