"""
Database Package
==============

This package provides all database-related functionality for the French Coach backend.

Modules:
--------
- config: Database configuration (paths, settings)
- connection: SQLite connection management
- schema: Table creation and schema definitions
- migrations: Database migration utilities (future use)
- seed: Sample data insertion

Usage:
------
from backend.database import get_connection, init_database

# Get a connection
conn = get_connection()

# Or use context manager
with get_connection() as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
"""

from .connection import get_connection, get_cursor, ConnectionContext
from .schema import create_tables, drop_tables
from .seed import seed_database

__all__ = [
    "get_connection",
    "get_cursor", 
    "ConnectionContext",
    "create_tables",
    "drop_tables",
    "seed_database",
]
