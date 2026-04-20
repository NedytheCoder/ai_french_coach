"""
Database configuration settings.

This module defines the database file path and related settings.
The data folder will be created automatically if it does not exist.
"""

import os

# Base directory is the parent of the database folder (i.e., the backend root)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Data folder path (where the SQLite database file will be stored)
DATA_DIR = os.path.join(BASE_DIR, "data")

# SQLite database file path
DATABASE_PATH = os.path.join(DATA_DIR, "app.db")
