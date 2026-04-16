"""
Database Schema Module
======================

Defines and manages the database schema (table structures).

This module contains:
- Table creation SQL
- Table drop SQL (for resets)
- Schema version tracking (future use)

To add a new table:
1. Add the CREATE TABLE SQL to CREATE_TABLES list
2. Add corresponding DROP TABLE to DROP_TABLES (reverse order for FK constraints)
3. Create a model in backend/models/
4. Create a repository in backend/repositories/
"""

from typing import List, Tuple
import sqlite3

from .connection import ConnectionContext


# ============================================================================
# TABLE CREATION SQL
# ============================================================================

# Users table - starter table for user management
# This is the primary user table with essential fields
CREATE_USERS_TABLE = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

# User profiles table - extended user information
# Separated from users to keep core user table lean
CREATE_USER_PROFILES_TABLE = """
CREATE TABLE IF NOT EXISTS user_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    cefr_level TEXT CHECK(cefr_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
    native_language TEXT DEFAULT 'en',
    learning_goal TEXT,
    daily_streak INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
"""

# Study sessions table - track when users study
CREATE_STUDY_SESSIONS_TABLE = """
CREATE TABLE IF NOT EXISTS study_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    session_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duration_minutes INTEGER DEFAULT 0,
    activity_type TEXT,
    xp_earned INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
"""

# Aggregate all CREATE TABLE statements
# Order matters: tables with FK references must come after their referenced tables
CREATE_TABLES: List[str] = [
    CREATE_USERS_TABLE,
    CREATE_USER_PROFILES_TABLE,
    CREATE_STUDY_SESSIONS_TABLE,
]


# ============================================================================
# TABLE DROP SQL (for resets)
# ============================================================================

# Drop in reverse order to avoid foreign key constraint violations
DROP_TABLES: List[str] = [
    "DROP TABLE IF EXISTS study_sessions;",
    "DROP TABLE IF EXISTS user_profiles;",
    "DROP TABLE IF EXISTS users;",
]


# ============================================================================
# INDEX CREATION SQL (for performance)
# ============================================================================

# Indexes for frequently queried columns
CREATE_INDEXES: List[str] = [
    "CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);",
    "CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);",
    "CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON study_sessions(user_id);",
    "CREATE INDEX IF NOT EXISTS idx_study_sessions_date ON study_sessions(session_date);",
]


# ============================================================================
# SCHEMA FUNCTIONS
# ============================================================================

def create_tables(conn: sqlite3.Connection) -> None:
    """
    Create all database tables.
    
    This function creates tables if they don't exist, using
    CREATE TABLE IF NOT EXISTS for idempotency.
    
    Args:
        conn: Active database connection
        
    Note:
        Commits changes automatically. Safe to run multiple times.
    """
    cursor = conn.cursor()
    
    # Create tables
    for create_sql in CREATE_TABLES:
        cursor.execute(create_sql)
    
    # Create indexes
    for index_sql in CREATE_INDEXES:
        cursor.execute(index_sql)
    
    conn.commit()
    cursor.close()


def drop_tables(conn: sqlite3.Connection) -> None:
    """
    Drop all database tables.
    
    WARNING: This destroys all data! Used by reset scripts.
    Tables are dropped in reverse order to handle foreign key constraints.
    
    Args:
        conn: Active database connection
        
    Warning:
        This is destructive and cannot be undone!
    """
    cursor = conn.cursor()
    
    # Temporarily disable foreign keys for dropping
    cursor.execute("PRAGMA foreign_keys = OFF;")
    
    for drop_sql in DROP_TABLES:
        cursor.execute(drop_sql)
    
    # Re-enable foreign keys
    cursor.execute("PRAGMA foreign_keys = ON;")
    
    conn.commit()
    cursor.close()


def init_database() -> None:
    """
    Initialize the database with all tables.
    
    Convenience function that creates a connection, initializes
    all tables, and closes the connection.
    
    Example:
        from backend.database.schema import init_database
        init_database()
        print("Database initialized successfully!")
    """
    with ConnectionContext() as conn:
        create_tables(conn)


def get_table_names(conn: sqlite3.Connection) -> List[str]:
    """
    Get list of all user tables in the database.
    
    Args:
        conn: Active database connection
        
    Returns:
        List of table names
    """
    cursor = conn.cursor()
    cursor.execute("""
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
    """)
    tables = [row[0] for row in cursor.fetchall()]
    cursor.close()
    return tables


def get_table_schema(conn: sqlite3.Connection, table_name: str) -> List[Tuple]:
    """
    Get schema information for a specific table.
    
    Args:
        conn: Active database connection
        table_name: Name of the table to inspect
        
    Returns:
        List of column information tuples from PRAGMA table_info
    """
    cursor = conn.cursor()
    cursor.execute(f"PRAGMA table_info({table_name})")
    schema = cursor.fetchall()
    cursor.close()
    return schema
