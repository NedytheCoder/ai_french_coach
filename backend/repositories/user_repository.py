"""
User Repository
===============

CRUD operations for User entities.

This module provides data access functions for the users table.
All database queries are centralized here to maintain consistency
and make testing easier.

Security:
---------
- All queries use parameterized statements (no SQL injection)
- Email uniqueness enforced at database level
- Proper transaction handling with commits
"""

import sqlite3
from typing import List, Optional

from ..database.connection import ConnectionContext, execute_write, execute_query
from ..models.user import User
from ..utils.logger import get_logger
from ..utils.exceptions import DatabaseError, NotFoundError

logger = get_logger(__name__)


class UserRepository:
    """
    Repository for User entity CRUD operations.
    
    Provides methods to create, read, update, and delete users.
    All methods handle database connections and error logging.
    
    Example:
        >>> repo = UserRepository()
        >>> user = repo.create_user("Marie", "marie@example.com")
        >>> print(user.id)  # Auto-generated ID
        >>> found = repo.get_user_by_id(user.id)
        >>> all_users = repo.list_users()
    """
    
    def create_user(self, name: str, email: str) -> User:
        """
        Create a new user in the database.
        
        Args:
            name: User's display name (required)
            email: Unique email address (required)
            
        Returns:
            User: The created user with auto-generated ID
            
        Raises:
            DatabaseError: If database operation fails (e.g., duplicate email)
            
        Example:
            >>> user = repo.create_user("Marie Dubois", "marie@example.com")
            >>> print(f"Created user with ID: {user.id}")
        """
        try:
            with ConnectionContext() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO users (name, email) VALUES (?, ?)",
                    (name, email)
                )
                conn.commit()
                user_id = cursor.lastrowid
                cursor.close()
                
                logger.info(f"Created user: {name} (ID: {user_id})")
                
                # Return the created user
                return User(id=user_id, name=name, email=email)
                
        except sqlite3.IntegrityError as e:
            error_msg = f"Failed to create user: email '{email}' may already exist"
            logger.error(error_msg)
            raise DatabaseError(error_msg) from e
        except sqlite3.Error as e:
            error_msg = f"Database error creating user: {e}"
            logger.error(error_msg)
            raise DatabaseError(error_msg) from e
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """
        Fetch a user by their ID.
        
        Args:
            user_id: The user's unique identifier
            
        Returns:
            User if found, None otherwise
            
        Example:
            >>> user = repo.get_user_by_id(1)
            >>> if user:
            ...     print(f"Found: {user.name}")
            ... else:
            ...     print("User not found")
        """
        try:
            row = execute_query(
                "SELECT * FROM users WHERE id = ?",
                (user_id,),
                fetch_one=True
            )
            
            if row:
                return User.from_row(row)
            return None
            
        except sqlite3.Error as e:
            logger.error(f"Error fetching user by ID {user_id}: {e}")
            raise DatabaseError(f"Failed to fetch user: {e}") from e
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Fetch a user by their email address.
        
        Args:
            email: The user's email address
            
        Returns:
            User if found, None otherwise
            
        Example:
            >>> user = repo.get_user_by_email("marie@example.com")
            >>> if user:
            ...     print(f"Found user: {user.name}")
        """
        try:
            row = execute_query(
                "SELECT * FROM users WHERE email = ?",
                (email,),
                fetch_one=True
            )
            
            if row:
                return User.from_row(row)
            return None
            
        except sqlite3.Error as e:
            logger.error(f"Error fetching user by email {email}: {e}")
            raise DatabaseError(f"Failed to fetch user: {e}") from e
    
    def list_users(self, limit: int = 100, offset: int = 0) -> List[User]:
        """
        Get a list of all users with pagination.
        
        Args:
            limit: Maximum number of users to return (default: 100)
            offset: Number of users to skip (default: 0)
            
        Returns:
            List of User objects
            
        Example:
            >>> users = repo.list_users(limit=10)
            >>> for user in users:
            ...     print(f"{user.id}: {user.name}")
        """
        try:
            rows = execute_query(
                "SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?",
                (limit, offset),
                fetch_all=True
            )
            
            if rows:
                return [User.from_row(row) for row in rows]
            return []
            
        except sqlite3.Error as e:
            logger.error(f"Error listing users: {e}")
            raise DatabaseError(f"Failed to list users: {e}") from e
    
    def update_user(
        self, 
        user_id: int, 
        name: Optional[str] = None, 
        email: Optional[str] = None
    ) -> Optional[User]:
        """
        Update a user's information.
        
        Only updates fields that are provided (not None).
        
        Args:
            user_id: ID of the user to update
            name: New name (optional)
            email: New email (optional)
            
        Returns:
            Updated User if found and updated, None if user not found
            
        Raises:
            DatabaseError: If update fails (e.g., duplicate email)
            
        Example:
            >>> updated = repo.update_user(1, name="Marie Updated")
            >>> if updated:
            ...     print(f"Updated: {updated.name}")
        """
        if name is None and email is None:
            # Nothing to update, just fetch and return
            return self.get_user_by_id(user_id)
        
        try:
            with ConnectionContext() as conn:
                cursor = conn.cursor()
                
                # Build update dynamically based on provided fields
                updates = []
                params = []
                
                if name is not None:
                    updates.append("name = ?")
                    params.append(name)
                
                if email is not None:
                    updates.append("email = ?")
                    params.append(email)
                
                params.append(user_id)
                
                query = f"UPDATE users SET {', '.join(updates)} WHERE id = ?"
                cursor.execute(query, params)
                
                if cursor.rowcount == 0:
                    # No rows updated - user not found
                    cursor.close()
                    return None
                
                conn.commit()
                cursor.close()
                
                logger.info(f"Updated user ID {user_id}")
                
                # Return the updated user
                return self.get_user_by_id(user_id)
                
        except sqlite3.IntegrityError as e:
            error_msg = f"Failed to update user: email may already exist"
            logger.error(error_msg)
            raise DatabaseError(error_msg) from e
        except sqlite3.Error as e:
            logger.error(f"Error updating user {user_id}: {e}")
            raise DatabaseError(f"Failed to update user: {e}") from e
    
    def delete_user(self, user_id: int) -> bool:
        """
        Delete a user by ID.
        
        Args:
            user_id: ID of the user to delete
            
        Returns:
            True if user was deleted, False if user not found
            
        Example:
            >>> if repo.delete_user(1):
            ...     print("User deleted")
            ... else:
            ...     print("User not found")
        """
        try:
            with ConnectionContext() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
                
                deleted = cursor.rowcount > 0
                conn.commit()
                cursor.close()
                
                if deleted:
                    logger.info(f"Deleted user ID {user_id}")
                else:
                    logger.warning(f"Attempted to delete non-existent user ID {user_id}")
                
                return deleted
                
        except sqlite3.Error as e:
            logger.error(f"Error deleting user {user_id}: {e}")
            raise DatabaseError(f"Failed to delete user: {e}") from e
    
    def count_users(self) -> int:
        """
        Get the total number of users.
        
        Returns:
            int: Count of users in the database
            
        Example:
            >>> count = repo.count_users()
            >>> print(f"Total users: {count}")
        """
        try:
            row = execute_query(
                "SELECT COUNT(*) as count FROM users",
                (),
                fetch_one=True
            )
            return row["count"] if row else 0
            
        except sqlite3.Error as e:
            logger.error(f"Error counting users: {e}")
            raise DatabaseError(f"Failed to count users: {e}") from e
