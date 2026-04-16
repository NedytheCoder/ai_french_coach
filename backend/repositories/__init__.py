"""
Repositories Package
====================

Data access layer for the French Coach application.

Repositories encapsulate database operations for specific entities.
Each repository handles CRUD operations for one entity type.

This separation allows:
- Centralized query logic
- Easy testing with mock repositories
- Database implementation details hidden from services

Usage:
------
from backend.repositories import UserRepository

repo = UserRepository()
user = repo.create_user("Marie", "marie@example.com")
all_users = repo.list_users()
"""

from .user_repository import UserRepository

__all__ = ["UserRepository"]
