#!/usr/bin/env python3
"""
Seed Database Script
====================

Inserts sample data into the database for development and testing.

Safe to run multiple times - uses INSERT OR IGNORE to skip
data that already exists (based on unique constraints).

Usage:
------
# From project root:
python -m backend.scripts.seed_db

# From backend directory:
python scripts/seed_db.py

What it seeds:
--------------
- Sample users with realistic French names
- User profiles with varied CEFR levels and goals
- Study sessions with realistic timestamps

Output:
-------
Shows count of records inserted for each table.
"""

import sys
from pathlib import Path

# Add backend to path if running directly
backend_dir = Path(__file__).parent.parent.resolve()
if backend_dir.name == "backend":
    sys.path.insert(0, str(backend_dir.parent))

from backend.database import get_connection, seed_database
from backend.utils.logger import get_logger

logger = get_logger("seed_db")


def seed_db():
    """
    Seed the database with sample data.
    
    Creates:
    - 5 sample users with French names
    - User profiles with random CEFR levels and goals
    - Study sessions with varied activity types
    
    Returns:
        int: 0 on success, 1 on failure
    """
    try:
        logger.info("=" * 50)
        logger.info("Seeding Database")
        logger.info("=" * 50)
        
        # Run seeding through the database module
        results = seed_database()
        
        # Report results
        logger.info("-" * 50)
        logger.info("Seeding Results:")
        logger.info(f"  Users inserted:     {results['users']}")
        logger.info(f"  Profiles created:   {results['profiles']}")
        logger.info(f"  Sessions created:   {results['sessions']}")
        logger.info("-" * 50)
        
        total = sum(results.values())
        if total > 0:
            logger.success(f"Seeding complete! ({total} records inserted)")
        else:
            logger.info("Database already seeded (no new records needed)")
        
        logger.info("=" * 50)
        
        return 0
        
    except Exception as e:
        logger.error(f"Failed to seed database: {e}")
        import traceback
        logger.debug(traceback.format_exc())
        return 1


if __name__ == "__main__":
    exit_code = seed_db()
    sys.exit(exit_code)
