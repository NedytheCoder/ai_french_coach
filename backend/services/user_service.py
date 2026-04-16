"""
User Service
============

Business logic layer for user management.

Wraps the UserRepository and adds:
- Input validation
- Business rule enforcement
- Email duplicate prevention
- Meaningful error messages

This is the primary interface for user operations from the
API layer or other services.
"""

import re
from typing import Optional, List

from ..repositories.user_repository import UserRepository
from ..models.user import User
from ..utils.logger import get_logger
from ..utils.exceptions import (
    ValidationError, 
    ConflictError, 
    NotFoundError,
    DatabaseError
)

logger = get_logger(__name__)


class UserService:
    """
    Service for user management operations.
    
    Provides a clean API for user CRUD with validation and
    business rules. All methods raise domain-specific exceptions
    on errors.
    
    Example:
        >>> service = UserService()
        >>> 
        >>> # Create a user
        >>> user = service.register_user("Marie", "marie@example.com")
        >>> 
        >>> # Fetch a user
        >>> found = service.get_user(user.id)
        >>> 
        >>> # Update
        >>> updated = service.update_user(user.id, name="Marie Updated")
        >>> 
        >>> # Delete
        >>> service.delete_user(user.id)
    """
    
    # Simple email regex for basic validation
    EMAIL_PATTERN = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    
    # Minimum name length
    MIN_NAME_LENGTH = 2
    MAX_NAME_LENGTH = 100
    
    def __init__(self, repository: Optional[UserRepository] = None):
        """
        Initialize the user service.
        
        Args:
            repository: Optional UserRepository instance.
                       If not provided, creates a new one.
        """
        self._repo = repository or UserRepository()
    
    def _validate_email(self, email: str) -> None:
        """
        Validate email format.
        
        Args:
            email: Email address to validate
            
        Raises:
            ValidationError: If email is invalid
        """
        if not email or not email.strip():
            raise ValidationError("Email is required")
        
        email = email.strip().lower()
        
        if not self.EMAIL_PATTERN.match(email):
            raise ValidationError(f"Invalid email format: {email}")
    
    def _validate_name(self, name: str) -> None:
        """
        Validate user name.
        
        Args:
            name: Name to validate
            
        Raises:
            ValidationError: If name is invalid
        """
        if not name or not name.strip():
            raise ValidationError("Name is required")
        
        name = name.strip()
        
        if len(name) < self.MIN_NAME_LENGTH:
            raise ValidationError(
                f"Name must be at least {self.MIN_NAME_LENGTH} characters"
            )
        
        if len(name) > self.MAX_NAME_LENGTH:
            raise ValidationError(
                f"Name must be no more than {self.MAX_NAME_LENGTH} characters"
            )
    
    def _check_email_exists(self, email: str, exclude_user_id: Optional[int] = None) -> bool:
        """
        Check if an email is already in use.
        
        Args:
            email: Email to check
            exclude_user_id: Optional user ID to exclude (for updates)
            
        Returns:
            True if email exists and belongs to another user
        """
        existing = self._repo.get_user_by_email(email)
        
        if existing is None:
            return False
        
        # If we're updating a user, allow them to keep their own email
        if exclude_user_id and existing.id == exclude_user_id:
            return False
        
        return True
    
    def register_user(self, name: str, email: str) -> User:
        """
        Register a new user with validation.
        
        Args:
            name: User's display name
            email: User's email address
            
        Returns:
            User: The created user
            
        Raises:
            ValidationError: If name or email is invalid
            ConflictError: If email already exists
            DatabaseError: If database operation fails
            
        Example:
            >>> user = service.register_user("Marie", "marie@example.com")
            >>> print(f"Registered: {user.name} (ID: {user.id})")
        """
        # Validate inputs
        self._validate_name(name)
        self._validate_email(email)
        
        # Normalize
        name = name.strip()
        email = email.strip().lower()
        
        # Check for duplicate email
        if self._check_email_exists(email):
            raise ConflictError(f"Email already registered: {email}")
        
        # Create user
        try:
            user = self._repo.create_user(name, email)
            logger.success(f"Registered new user: {user.name} ({user.email})")
            return user
        except DatabaseError:
            # Re-raise with context
            raise
    
    def get_user(self, user_id: int) -> User:
        """
        Get a user by ID.
        
        Args:
            user_id: User's unique identifier
            
        Returns:
            User: The found user
            
        Raises:
            NotFoundError: If user doesn't exist
            
        Example:
            >>> user = service.get_user(1)
            >>> print(user.name)
        """
        user = self._repo.get_user_by_id(user_id)
        
        if user is None:
            raise NotFoundError(f"User not found with ID: {user_id}")
        
        return user
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Get a user by email.
        
        Args:
            email: User's email address
            
        Returns:
            User if found, None otherwise
            
        Example:
            >>> user = service.get_user_by_email("marie@example.com")
            >>> if user:
            ...     print(f"Found: {user.name}")
        """
        if not email:
            return None
        
        email = email.strip().lower()
        return self._repo.get_user_by_email(email)
    
    def list_users(self, limit: int = 100, offset: int = 0) -> List[User]:
        """
        List all users with pagination.
        
        Args:
            limit: Maximum users to return
            offset: Users to skip
            
        Returns:
            List of users
            
        Example:
            >>> users = service.list_users(limit=10)
            >>> for u in users:
            ...     print(f"{u.id}: {u.name}")
        """
        return self._repo.list_users(limit=limit, offset=offset)
    
    def update_user(
        self,
        user_id: int,
        name: Optional[str] = None,
        email: Optional[str] = None
    ) -> User:
        """
        Update a user's information.
        
        Args:
            user_id: ID of user to update
            name: New name (optional)
            email: New email (optional)
            
        Returns:
            User: Updated user
            
        Raises:
            NotFoundError: If user doesn't exist
            ValidationError: If inputs are invalid
            ConflictError: If new email already exists
            
        Example:
            >>> updated = service.update_user(1, name="Marie Updated")
            >>> print(updated.name)
        """
        # Verify user exists
        existing = self._repo.get_user_by_id(user_id)
        if existing is None:
            raise NotFoundError(f"User not found with ID: {user_id}")
        
        # Validate new values if provided
        if name is not None:
            self._validate_name(name)
            name = name.strip()
        
        if email is not None:
            self._validate_email(email)
            email = email.strip().lower()
            
            # Check email isn't taken by another user
            if self._check_email_exists(email, exclude_user_id=user_id):
                raise ConflictError(f"Email already in use: {email}")
        
        # Perform update
        updated = self._repo.update_user(user_id, name=name, email=email)
        
        if updated is None:
            # This shouldn't happen since we checked existence
            raise NotFoundError(f"User not found with ID: {user_id}")
        
        logger.info(f"Updated user ID {user_id}")
        return updated
    
    def delete_user(self, user_id: int) -> None:
        """
        Delete a user.
        
        Args:
            user_id: ID of user to delete
            
        Raises:
            NotFoundError: If user doesn't exist
            
        Example:
            >>> service.delete_user(1)
            >>> # User deleted
        """
        # Verify user exists
        existing = self._repo.get_user_by_id(user_id)
        if existing is None:
            raise NotFoundError(f"User not found with ID: {user_id}")
        
        # Perform deletion
        deleted = self._repo.delete_user(user_id)
        
        if not deleted:
            raise NotFoundError(f"User not found with ID: {user_id}")
        
        logger.info(f"Deleted user ID {user_id}")
    
    def count_users(self) -> int:
        """
        Get total number of registered users.
        
        Returns:
            int: User count
        """
        return self._repo.count_users()
