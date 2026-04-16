"""
Services Package
================

Business logic layer for the French Coach application.

Services orchestrate operations between repositories and implement
business rules, validation, and transaction management.

Each service typically handles one domain area:
- UserService: User management and authentication
- (Future) LessonService: Learning content
- (Future) ProgressService: User progress tracking

Usage:
------
from backend.services import UserService

user_service = UserService()
user = user_service.register_user("Marie", "marie@example.com")
"""

from .user_service import UserService

__all__ = ["UserService"]
