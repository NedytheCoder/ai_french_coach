"""
Database connection utilities.

Provides a clean, reusable function for establishing SQLite connections
with sensible defaults for row access.
"""

import sqlite3
from typing import Optional

from .config import DATABASE_PATH


def get_connection() -> sqlite3.Connection:
    """
    Create and return a new SQLite database connection.
    
    Returns:
        sqlite3.Connection: A configured database connection.
        
        The connection is configured with:
        - Row factory set to sqlite3.Row for dictionary-like column access
        - Foreign key support enabled
    
    Example:
        >>> conn = get_connection()
        >>> cursor = conn.execute("SELECT * FROM users")
        >>> row = cursor.fetchone()
        >>> print(row["email"])  # Access by column name
        >>> conn.close()
    """
    conn = sqlite3.connect(DATABASE_PATH)
    
    # Enable dictionary-style access to rows (access columns by name)
    conn.row_factory = sqlite3.Row
    
    # Enable foreign key constraints (SQLite disables them by default)
    conn.execute("PRAGMA foreign_keys = ON")
    
    return conn
