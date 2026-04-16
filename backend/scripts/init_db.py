#!/usr/bin/env python3
"""
Initialize Database Script
==========================

Creates the SQLite database file and initializes all tables.

This script is safe to run multiple times - it uses CREATE TABLE IF NOT EXISTS
so existing tables won't be affected.

Usage:
------
# From project root:
python -m backend.scripts.init_db

# From backend directory:
python scripts/init_db.py

# Make executable and run directly:
chmod +x scripts/init_db.py
./scripts/init_db.py
"""

import sys
from pathlib import Path

# Add backend to path if running directly
backend_dir = Path(__file__).parent.parent.resolve()
if backend_dir.name == "backend":
    sys.path.insert(0, str(backend_dir.parent))

from backend.database import get_connection, create_tables, get_db_path
from backend.utils.logger import get_logger

logger = get_logger("init_db")


def init_database():
    """
    Initialize the database with all tables.
    
    Creates:
    - Data directory if it doesn't exist
    - SQLite database file
    - All required tables
    - Indexes for performance
    
    Prints:
    - Success message with database path
    - Table names that were created
    """
    try:
        logger.info("=" * 50)
        logger.info("Initializing French Coach Database")
        logger.info("=" * 50)
        
        # Get database path (creates data directory)
        db_path = get_db_path()
        logger.info(f"Database path: {db_path}")
        
        # Create connection and initialize tables
        with get_connection() as conn:
            logger.info("Creating tables...")
            create_tables(conn)
            
            # Get list of tables
            cursor = conn.cursor()
            cursor.execute("""
                SELECT name FROM sqlite_master 
                WHERE type='table' AND name NOT LIKE 'sqlite_%'
            """)
            tables = [row[0] for row in cursor.fetchall()]
            cursor.close()
            
            logger.success(f"Created {len(tables)} tables: {', '.join(tables)}")
        
        logger.success("Database initialized successfully!")
        logger.info("=" * 50)
        
        return 0
        
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        return 1


if __name__ == "__main__":
    exit_code = init_database()
    sys.exit(exit_code)
