"""
Database schema definitions.

Contains all CREATE TABLE statements for initializing the database.
Add new tables here as the application grows.
"""

# SQL statements to create the initial database schema
SCHEMA_SQL = """
-- Users table: stores basic user account information
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster email lookups (useful for login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
"""


def get_schema_sql() -> str:
    """
    Return the complete schema SQL as a single string.
    
    Returns:
        str: SQL statements to create all tables and indexes.
    """
    return SCHEMA_SQL
