#!/usr/bin/env python3
"""
French Coach - Database Demo
============================

Demonstrates the complete database layer with CRUD operations.

This script shows how all the components work together:
- Database initialization
- User creation with validation
- Fetching users by ID and email
- Listing all users
- Updating user information
- Deleting users
- Error handling

Usage:
------
# From project root:
python backend/main_demo.py

# From backend directory:
python main_demo.py

What it demonstrates:
--------------------
1. Database initialization (init_db)
2. Sample data seeding (seed_db)
3. UserService CRUD operations
4. Validation and error handling
5. Repository pattern usage
6. Logging output

Expected Output:
---------------
✅ Database initialized successfully
✅ Database seeded with sample data
ℹ️  Creating new user...
✅ Created user: Demo User (ID: 6)
ℹ️  Listing all users...
   ID 1: Marie Dubois
   ID 2: Jean Martin
   ...
ℹ️  Fetching user by email...
✅ Found: marie@example.com
ℹ️  Updating user...
✅ Updated to: Marie Updated
ℹ️  Deleting user...
✅ User deleted successfully
ℹ️  Total users: 5
"""

import sys
from pathlib import Path

# Ensure backend is importable
backend_dir = Path(__file__).parent.resolve()
if backend_dir.name == "backend":
    sys.path.insert(0, str(backend_dir.parent))

# Import our modules
from backend.database import init_database, seed_database
from backend.services import UserService
from backend.utils.logger import get_logger
from backend.utils.exceptions import (
    ValidationError,
    ConflictError,
    NotFoundError
)

logger = get_logger("main_demo")


def run_demo():
    """
    Run the complete database demo.
    
    This function demonstrates:
    - Initialization
    - Seeding
    - CRUD operations
    - Error handling
    """
    print("\n" + "=" * 60)
    print("🎯 FRENCH COACH - DATABASE DEMO")
    print("=" * 60 + "\n")
    
    # ========================================================================
    # STEP 1: Initialize Database
    # ========================================================================
    logger.info("STEP 1: Initializing database...")
    try:
        init_database()
        print()
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        return 1
    
    # ========================================================================
    # STEP 2: Seed Sample Data
    # ========================================================================
    logger.info("STEP 2: Seeding sample data...")
    try:
        results = seed_database()
        print()
    except Exception as e:
        logger.error(f"Failed to seed database: {e}")
        return 1
    
    # ========================================================================
    # STEP 3: Demonstrate CRUD Operations
    # ========================================================================
    logger.info("STEP 3: Demonstrating CRUD operations...")
    print()
    
    # Create service instance
    user_service = UserService()
    
    # ------------------------------------------------------------------------
    # CREATE - Register a new user
    # ------------------------------------------------------------------------
    logger.info("→ Creating a new user...")
    try:
        new_user = user_service.register_user(
            name="Demo User",
            email="demo@frenchcoach.app"
        )
        logger.success(f"Created user: {new_user.name} (ID: {new_user.id})")
    except ConflictError:
        # User might already exist from previous run
        logger.warning("Demo user already exists, fetching existing...")
        new_user = user_service.get_user_by_email("demo@frenchcoach.app")
        if new_user:
            logger.info(f"Found existing: {new_user.name} (ID: {new_user.id})")
    print()
    
    # ------------------------------------------------------------------------
    # READ - List all users
    # ------------------------------------------------------------------------
    logger.info("→ Listing all users...")
    all_users = user_service.list_users()
    for user in all_users[:5]:  # Show first 5
        logger.info(f"   ID {user.id}: {user.name} ({user.email})")
    if len(all_users) > 5:
        logger.info(f"   ... and {len(all_users) - 5} more")
    print()
    
    # ------------------------------------------------------------------------
    # READ - Fetch by email
    # ------------------------------------------------------------------------
    logger.info("→ Fetching user by email...")
    found_user = user_service.get_user_by_email("marie@example.com")
    if found_user:
        logger.success(f"Found: {found_user.name} ({found_user.email})")
    else:
        logger.warning("User not found")
    print()
    
    # ------------------------------------------------------------------------
    # UPDATE - Modify user
    # ------------------------------------------------------------------------
    if new_user:
        logger.info("→ Updating the demo user...")
        try:
            updated_user = user_service.update_user(
                user_id=new_user.id,
                name="Demo User Updated"
            )
            logger.success(f"Updated name to: {updated_user.name}")
        except Exception as e:
            logger.error(f"Update failed: {e}")
    print()
    
    # ------------------------------------------------------------------------
    # VALIDATION DEMO - Try invalid input
    # ------------------------------------------------------------------------
    logger.info("→ Testing validation (invalid email)...")
    try:
        user_service.register_user(name="Test", email="invalid-email")
    except ValidationError as e:
        logger.warning(f"Validation caught: {e}")
    print()
    
    logger.info("→ Testing validation (duplicate email)...")
    try:
        user_service.register_user(name="Duplicate", email="marie@example.com")
    except ConflictError as e:
        logger.warning(f"Conflict caught: {e}")
    print()
    
    # ------------------------------------------------------------------------
    # DELETE - Remove demo user
    # ------------------------------------------------------------------------
    if new_user:
        logger.info("→ Deleting the demo user...")
        try:
            user_service.delete_user(new_user.id)
            logger.success("User deleted successfully")
        except NotFoundError:
            logger.warning("User already deleted")
        except Exception as e:
            logger.error(f"Delete failed: {e}")
    print()
    
    # ------------------------------------------------------------------------
    # STATISTICS
    # ------------------------------------------------------------------------
    logger.info("→ Final statistics...")
    count = user_service.count_users()
    logger.info(f"Total users in database: {count}")
    print()
    
    # ========================================================================
    # COMPLETION
    # ========================================================================
    print("=" * 60)
    logger.success("Demo completed successfully!")
    print("=" * 60)
    print()
    
    return 0


if __name__ == "__main__":
    exit_code = run_demo()
    sys.exit(exit_code)
