"""
Database Seeding Module
=======================

Provides sample data for development and testing.

This module inserts realistic sample data into the database.
Safe to run multiple times - uses INSERT OR IGNORE to skip duplicates.

Usage:
------
from backend.database.seed import seed_database

# Seed all tables
seed_database()

# Seed specific tables (future)
seed_users()
seed_study_sessions()
"""

import sqlite3
from datetime import datetime, timedelta
from typing import List, Tuple

from .connection import ConnectionContext
from ..utils.logger import get_logger

logger = get_logger(__name__)


# ============================================================================
# SAMPLE DATA
# ============================================================================

# Sample users for development
SAMPLE_USERS: List[Tuple[str, str]] = [
    ("Marie Dubois", "marie@example.com"),
    ("Jean Martin", "jean@example.com"),
    ("Sophie Laurent", "sophie@example.com"),
    ("Pierre Bernard", "pierre@example.com"),
    ("Emma Petit", "emma@example.com"),
]

# Sample CEFR levels
CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1"]

# Sample learning goals
LEARNING_GOALS = [
    "Travel to France",
    "Work in a French-speaking country",
    "Pass DELF exam",
    "Connect with French family",
    "Read French literature",
]


# ============================================================================
# SEED FUNCTIONS
# ============================================================================

def seed_users(conn: sqlite3.Connection) -> int:
    """
    Insert sample users into the database.
    
    Uses INSERT OR IGNORE to safely skip users that already exist
    (based on unique email constraint).
    
    Args:
        conn: Active database connection
        
    Returns:
        int: Number of users inserted
    """
    cursor = conn.cursor()
    inserted = 0
    
    for name, email in SAMPLE_USERS:
        try:
            cursor.execute("""
                INSERT OR IGNORE INTO users (name, email)
                VALUES (?, ?)
            """, (name, email))
            if cursor.rowcount > 0:
                inserted += 1
                logger.info(f"Inserted user: {name} ({email})")
        except sqlite3.Error as e:
            logger.warning(f"Failed to insert user {email}: {e}")
    
    conn.commit()
    cursor.close()
    
    if inserted > 0:
        logger.success(f"Inserted {inserted} new users")
    else:
        logger.info("All sample users already exist (skipped)")
    
    return inserted


def seed_user_profiles(conn: sqlite3.Connection) -> int:
    """
    Insert sample user profiles.
    
    Creates profiles for users that don't have one yet.
    Assigns random CEFR levels and learning goals for variety.
    
    Args:
        conn: Active database connection
        
    Returns:
        int: Number of profiles inserted
    """
    cursor = conn.cursor()
    inserted = 0
    
    # Get all users without profiles
    cursor.execute("""
        SELECT u.id, u.name 
        FROM users u
        LEFT JOIN user_profiles up ON u.id = up.user_id
        WHERE up.id IS NULL
    """)
    
    users_without_profiles = cursor.fetchall()
    
    import random
    random.seed(42)  # Reproducible "random" data
    
    for idx, (user_id, name) in enumerate(users_without_profiles):
        cefr = CEFR_LEVELS[idx % len(CEFR_LEVELS)]
        goal = LEARNING_GOALS[idx % len(LEARNING_GOALS)]
        native_lang = "en" if idx % 3 != 0 else "es" if idx % 3 == 1 else "de"
        
        try:
            cursor.execute("""
                INSERT INTO user_profiles 
                (user_id, cefr_level, native_language, learning_goal, daily_streak, total_xp)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (user_id, cefr, native_lang, goal, 
                  random.randint(0, 30), random.randint(0, 1000)))
            
            if cursor.rowcount > 0:
                inserted += 1
                logger.info(f"Created profile for: {name} (CEFR: {cefr})")
        except sqlite3.Error as e:
            logger.warning(f"Failed to create profile for user {user_id}: {e}")
    
    conn.commit()
    cursor.close()
    
    if inserted > 0:
        logger.success(f"Created {inserted} user profiles")
    else:
        logger.info("All users already have profiles")
    
    return inserted


def seed_study_sessions(conn: sqlite3.Connection) -> int:
    """
    Insert sample study sessions for existing users.
    
    Creates realistic study session history for the past week.
    
    Args:
        conn: Active database connection
        
    Returns:
        int: Number of sessions inserted
    """
    cursor = conn.cursor()
    inserted = 0
    
    # Get all users
    cursor.execute("SELECT id FROM users")
    user_ids = [row[0] for row in cursor.fetchall()]
    
    if not user_ids:
        logger.warning("No users found to create study sessions for")
        return 0
    
    # Activity types
    activities = ["vocabulary", "grammar", "listening", "speaking", "reading", "conversation"]
    
    import random
    random.seed(42)
    
    now = datetime.now()
    
    for user_id in user_ids:
        # Create 1-5 sessions per user over the past week
        num_sessions = random.randint(1, 5)
        
        for i in range(num_sessions):
            # Random date within past 7 days
            days_ago = random.randint(0, 7)
            session_date = now - timedelta(days=days_ago, hours=random.randint(0, 23))
            
            duration = random.choice([5, 10, 15, 20, 30, 45, 60])
            activity = random.choice(activities)
            xp = duration * random.randint(1, 3)  # XP based on duration
            
            try:
                cursor.execute("""
                    INSERT INTO study_sessions 
                    (user_id, session_date, duration_minutes, activity_type, xp_earned)
                    VALUES (?, ?, ?, ?, ?)
                """, (user_id, session_date.isoformat(), duration, activity, xp))
                
                if cursor.rowcount > 0:
                    inserted += 1
            except sqlite3.Error as e:
                logger.warning(f"Failed to create study session: {e}")
    
    conn.commit()
    cursor.close()
    
    if inserted > 0:
        logger.success(f"Created {inserted} study sessions")
    else:
        logger.info("No new study sessions created")
    
    return inserted


def seed_database(conn: sqlite3.Connection = None) -> dict:
    """
    Seed the database with all sample data.
    
    This is the main entry point for seeding. It seeds tables
    in the correct order to respect foreign key constraints.
    
    Args:
        conn: Optional existing connection. If None, creates a new one.
        
    Returns:
        dict: Summary of what was seeded with counts
        
    Example:
        results = seed_database()
        print(f"Inserted {results['users']} users")
    """
    results = {
        "users": 0,
        "profiles": 0,
        "sessions": 0,
    }
    
    if conn:
        # Use provided connection
        results["users"] = seed_users(conn)
        results["profiles"] = seed_user_profiles(conn)
        results["sessions"] = seed_study_sessions(conn)
    else:
        # Create new connection
        with ConnectionContext() as conn:
            results["users"] = seed_users(conn)
            results["profiles"] = seed_user_profiles(conn)
            results["sessions"] = seed_study_sessions(conn)
    
    total = sum(results.values())
    if total > 0:
        logger.success(f"Database seeding complete! ({total} records inserted)")
    else:
        logger.info("Database already seeded (no new records)")
    
    return results


# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def clear_seed_data(conn: sqlite3.Connection = None) -> dict:
    """
    Remove all seed data from the database.
    
    WARNING: This deletes data but keeps the table structure.
    Use with caution - primarily for testing.
    
    Args:
        conn: Optional existing connection
        
    Returns:
        dict: Count of deleted records per table
    """
    # Future implementation
    logger.warning("clear_seed_data() not yet implemented")
    return {"deleted": 0}
