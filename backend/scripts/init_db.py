"""
Database initialization script.

Creates the data directory if needed, initializes the SQLite database,
and executes all schema creation statements.

Usage:
    Run this script from the backend directory:
    
    $ python scripts/init_db.py
    
    Or from the project root:
    $ python backend/scripts/init_db.py
"""

import os
import sys

# Add the parent directory to the path so we can import from database package
script_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(script_dir)
# sys.exit()
sys.path.insert(0, backend_dir)

from database.config import DATA_DIR, DATABASE_PATH
from database.connection import get_connection
from database.schema import get_schema_sql


def ensure_data_directory() -> None:
    """
    Create the data directory if it does not exist.
    """
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        print(f"Created data directory: {DATA_DIR}")
    else:
        print(f"Data directory already exists: {DATA_DIR}")


def initialize_database() -> None:
    """
    Initialize the database by executing the schema SQL.
    
    Creates all tables and indexes defined in schema.py.
    """
    conn = get_connection()
    try:
        # Get the schema SQL and execute it
        schema_sql = get_schema_sql()
        conn.executescript(schema_sql)
        conn.commit()
        print("Database schema initialized successfully.")
        print("Tables created:")
        
        # List created tables for confirmation
        cursor = conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        )
        tables = cursor.fetchall()
        for table in tables:
            print(f"  - {table['name']}")
            
    except sqlite3.Error as e:
        print(f"Error initializing database: {e}")
        sys.exit(1)
    finally:
        conn.close()


def main() -> None:
    """
    Main entry point for the initialization script.
    """
    print("=" * 50)
    print("Database Initialization")
    print("=" * 50)
    print()
    
    # Step 1: Ensure data directory exists
    ensure_data_directory()
    print()
    
    # Step 2: Initialize the database schema
    print(f"Database file: {DATABASE_PATH}")
    initialize_database()
    print()
    
    print("=" * 50)
    print("Initialization complete!")
    print("=" * 50)


if __name__ == "__main__":
    import sqlite3  # Import here for the error handling in initialize_database
    main()
