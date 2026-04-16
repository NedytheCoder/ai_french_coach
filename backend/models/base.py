"""
Base Model Classes
==================

Provides common functionality for all data models.

All models in the application should inherit from BaseModel
to get consistent serialization, validation, and representation.

Example:
--------
@dataclass(frozen=True)
class User(BaseModel):
    name: str
    email: str
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, asdict
from typing import Dict, Any, Optional
from datetime import datetime


class BaseModel(ABC):
    """
    Abstract base class for all domain models.
    
    Provides:
    - Dictionary serialization
    - String representation
    - Validation hooks
    
    All models should inherit from this class and use
    the @dataclass decorator for clean data structures.
    """
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert the model to a dictionary.
        
        Useful for JSON serialization and API responses.
        
        Returns:
            Dictionary representation of the model
        """
        result = asdict(self)
        
        # Convert datetime objects to ISO format strings
        for key, value in result.items():
            if isinstance(value, datetime):
                result[key] = value.isoformat()
        
        return result
    
    @classmethod
    @abstractmethod
    def from_row(cls, row) -> "BaseModel":
        """
        Create a model instance from a database row.
        
        Args:
            row: sqlite3.Row or dictionary-like object from query result
            
        Returns:
            Model instance populated from the row data
            
        Note:
            Subclasses must implement this method.
        """
        pass
    
    def __repr__(self) -> str:
        """
        Human-readable string representation.
        
        Shows the class name and key fields.
        """
        fields = ", ".join(
            f"{k}={v!r}" 
            for k, v in self.to_dict().items() 
            if v is not None
        )
        return f"{self.__class__.__name__}({fields})"


@dataclass(frozen=True)
class TimestampedModel(BaseModel):
    """
    Base for models with automatic timestamp tracking.
    
    Adds created_at and updated_at fields that are
    automatically managed by the database.
    
    Attributes:
        created_at: When the record was created (set by DB)
        updated_at: When the record was last modified (set by DB)
    """
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
