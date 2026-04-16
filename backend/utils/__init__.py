"""
Utilities Package
=================

Shared utilities for the French Coach backend.

Modules:
--------
- logger: Structured logging utilities
- exceptions: Custom exception classes

These utilities are used across all layers of the application
for consistent error handling and logging.
"""

from .exceptions import (
    FrenchCoachError,
    DatabaseError,
    ValidationError,
    NotFoundError,
    ConflictError,
)
from .logger import get_logger

__all__ = [
    "FrenchCoachError",
    "DatabaseError",
    "ValidationError", 
    "NotFoundError",
    "ConflictError",
    "get_logger",
]
