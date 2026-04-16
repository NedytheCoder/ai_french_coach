"""
Database Connection Module
==========================

Provides SQLite connection management with:
- Connection factory functions
- Dictionary-style row access
- Context manager support for automatic cleanup
- Connection pooling considerations for future scaling

Example Usage:
--------------
# Simple connection
conn = get_connection()
cursor = conn.cursor()
# ... do work ...
conn.close()

# Context manager (recommended)
with get_connection() as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()
# Connection automatically closed

# Cursor helper
with get_cursor() as cursor:
    cursor.execute("SELECT * FROM users WHERE id = ?", (1,))
    row = cursor.fetchone()
"""

import sqlite3
from contextlib import contextmanager
from typing import Generator, Optional

from .config import get_db_path, DEFAULT_PRAGMAS


class DictRowConnection(sqlite3.Connection):
    """
    Custom connection class that returns rows as dictionaries.
    
    This makes it easier to work with row data without needing
    to remember column index positions.
    
    Example:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name FROM users")
        row = cursor.fetchone()
        # row["id"] and row["name"] work as expected
    """
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Set row factory to return sqlite3.Row objects (dict-like)
        self.row_factory = sqlite3.Row


def get_connection() -> sqlite3.Connection:
    """
    Create and return a new SQLite connection.
    
    The connection:
    - Uses the configured database path
    - Returns rows as dictionary-like objects
    - Applies default PRAGMA settings for reliability
    
    Returns:
        sqlite3.Connection: Configured database connection
        
    Note:
        Caller is responsible for closing the connection with conn.close()
        or use get_connection_context() for automatic cleanup.
    """
    db_path = get_db_path()
    
    # Create connection with dict-like row factory
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    
    # Apply default PRAGMA settings
    cursor = conn.cursor()
    for pragma, value in DEFAULT_PRAGMAS.items():
        cursor.execute(f"PRAGMA {pragma} = {value}")
    cursor.close()
    
    return conn


@contextmanager
def ConnectionContext() -> Generator[sqlite3.Connection, None, None]:
    """
    Context manager for database connections.
    
    Automatically closes the connection when exiting the context,
    even if an exception occurs.
    
    Example:
        with ConnectionContext() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users")
            rows = cursor.fetchall()
        # Connection is automatically closed here
    
    Yields:
        sqlite3.Connection: Configured database connection
    """
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()


@contextmanager
def get_cursor() -> Generator[sqlite3.Cursor, None, None]:
    """
    Context manager that provides a cursor from a managed connection.
    
    This is a convenience helper for simple queries where you don't
    need direct connection access (e.g., for transactions).
    
    Example:
        with get_cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE id = ?", (1,))
            row = cursor.fetchone()
        # Connection automatically closed
    
    Yields:
        sqlite3.Cursor: Cursor from a managed connection
    """
    with ConnectionContext() as conn:
        cursor = conn.cursor()
        try:
            yield cursor
        finally:
            cursor.close()


def execute_query(
    query: str, 
    parameters: tuple = (), 
    fetch_one: bool = False,
    fetch_all: bool = False
) -> Optional[list]:
    """
    Execute a query with automatic connection management.
    
    This is a convenience function for simple queries that don't
    need transaction control.
    
    Args:
        query: SQL query string with ? placeholders
        parameters: Tuple of values to substitute
        fetch_one: If True, return single row or None
        fetch_all: If True, return all rows as list
        
    Returns:
        sqlite3.Row, list of rows, or None depending on fetch flags
        
    Example:
        row = execute_query(
            "SELECT * FROM users WHERE email = ?",
            ("user@example.com",),
            fetch_one=True
        )
    """
    with get_cursor() as cursor:
        cursor.execute(query, parameters)
        
        if fetch_one:
            return cursor.fetchone()
        elif fetch_all:
            return cursor.fetchall()
        return None


def execute_write(
    query: str, 
    parameters: tuple = (),
    return_lastrowid: bool = False
) -> Optional[int]:
    """
    Execute a write query (INSERT, UPDATE, DELETE) with automatic commit.
    
    Args:
        query: SQL write query with ? placeholders
        parameters: Tuple of values to substitute
        return_lastrowid: If True, return the ID of the inserted row
        
    Returns:
        int: Last row ID if return_lastrowid is True, otherwise None
        
    Example:
        new_id = execute_write(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            ("John", "john@example.com"),
            return_lastrowid=True
        )
    """
    with ConnectionContext() as conn:
        cursor = conn.cursor()
        cursor.execute(query, parameters)
        conn.commit()
        
        lastrowid = cursor.lastrowid
        cursor.close()
        
        if return_lastrowid:
            return lastrowid
        return None
