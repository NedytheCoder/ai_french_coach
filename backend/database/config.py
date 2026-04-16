"""
Database Configuration
======================

Central configuration for SQLite database settings.

This module defines:
- Database file path
- Connection parameters
- Directory creation utilities

To change the database location, modify DB_PATH below.
"""

import os
from pathlib import Path

# Base directory of the backend
BACKEND_DIR = Path(__file__).parent.parent.resolve()

# Data directory for database files
DATA_DIR = BACKEND_DIR / "data"

# SQLite database file path
# Default: backend/data/app.db
DB_PATH = DATA_DIR / "app.db"

# Connection settings
# SQLite pragma settings for better reliability
DEFAULT_PRAGMAS = {
    "foreign_keys": "ON",  # Enforce foreign key constraints
    "journal_mode": "WAL",  # Write-Ahead Logging for better concurrency
    "synchronous": "NORMAL",  # Balance between safety and speed
}


def ensure_data_directory() -> None:
    """
    Ensure the data directory exists.
    
    Creates the directory if it doesn't exist, including any parent directories.
    This should be called before attempting to connect to the database.
    """
    DATA_DIR.mkdir(parents=True, exist_ok=True)


def get_db_path() -> Path:
    """
    Get the resolved database file path.
    
    Ensures the data directory exists before returning the path.
    
    Returns:
        Path: Absolute path to the SQLite database file
    """
    ensure_data_directory()
    return DB_PATH.resolve()


# Allow override via environment variable
_env_db_path = os.getenv("DATABASE_PATH")
if _env_db_path:
    DB_PATH = Path(_env_db_path)
