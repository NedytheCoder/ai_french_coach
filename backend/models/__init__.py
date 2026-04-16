"""
Models Package
==============

Data models for the French Coach application.

This package contains:
- Base model classes with common functionality
- Entity-specific models (User, Profile, etc.)
- Type definitions and enums

Models are:
- Dataclasses for clean, typed data structures
- Immutable where possible (frozen dataclasses)
- Serializable to/from dictionaries for API responses

Usage:
------
from backend.models import User, UserProfile

# Create a new user
user = User(name="Marie", email="marie@example.com")

# Convert to dict for JSON serialization
user_dict = user.to_dict()
"""

from .user import User, UserProfile, StudySession

__all__ = [
    "User",
    "UserProfile", 
    "StudySession",
]
