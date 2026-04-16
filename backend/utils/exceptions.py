"""
Custom Exceptions
=================

Domain-specific exception classes for the French Coach application.

These exceptions provide:
- Clear error categorization
- Meaningful error messages
- Consistent API error responses

Usage:
------
from backend.utils.exceptions import NotFoundError, ValidationError

# In service layer
if not user:
    raise NotFoundError(f"User {user_id} not found")

if not is_valid_email(email):
    raise ValidationError("Invalid email format")

# In API layer
try:
    user = service.register_user(name, email)
except ValidationError as e:
    return JSONResponse({"error": str(e)}, status_code=400)
except ConflictError as e:
    return JSONResponse({"error": str(e)}, status_code=409)
"""


class FrenchCoachError(Exception):
    """
    Base exception for all French Coach application errors.
    
    All custom exceptions should inherit from this class
to allow catching all application-specific errors together.
    
    Attributes:
        message: Human-readable error description
        code: Optional error code for programmatic handling
    """
    
    def __init__(self, message: str, code: str = None):
        super().__init__(message)
        self.message = message
        self.code = code
    
    def __str__(self) -> str:
        if self.code:
            return f"[{self.code}] {self.message}"
        return self.message


class DatabaseError(FrenchCoachError):
    """
    Database operation failure.
    
    Raised when:
    - Connection fails
    - Query execution fails
    - Integrity constraints violated
    - Transaction errors occur
    
    HTTP Mapping: 500 Internal Server Error
    """
    
    def __init__(self, message: str = "Database operation failed"):
        super().__init__(message, code="DB_ERROR")


class ValidationError(FrenchCoachError):
    """
    Input validation failure.
    
    Raised when:
    - Required fields are missing
    - Field formats are invalid (email, name length, etc.)
    - Business rules violated
    
    HTTP Mapping: 400 Bad Request
    """
    
    def __init__(self, message: str = "Validation failed"):
        super().__init__(message, code="VALIDATION_ERROR")


class NotFoundError(FrenchCoachError):
    """
    Resource not found.
    
    Raised when:
    - User ID doesn't exist
    - Email not found in database
    - Referenced resource missing
    
    HTTP Mapping: 404 Not Found
    """
    
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, code="NOT_FOUND")


class ConflictError(FrenchCoachError):
    """
    Resource conflict.
    
    Raised when:
    - Email already registered
    - Duplicate unique key
    - Concurrent modification conflict
    
    HTTP Mapping: 409 Conflict
    """
    
    def __init__(self, message: str = "Resource conflict"):
        super().__init__(message, code="CONFLICT")


class AuthenticationError(FrenchCoachError):
    """
    Authentication failure.
    
    Raised when:
    - Invalid credentials
    - Session expired
    - Token invalid
    
    HTTP Mapping: 401 Unauthorized
    
    Note:
        Not currently used, placeholder for future auth implementation.
    """
    
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message, code="AUTH_ERROR")


class AuthorizationError(FrenchCoachError):
    """
    Authorization failure (permission denied).
    
    Raised when:
    - User lacks required permissions
    - Resource access denied
    
    HTTP Mapping: 403 Forbidden
    
    Note:
        Not currently used, placeholder for future auth implementation.
    """
    
    def __init__(self, message: str = "Permission denied"):
        super().__init__(message, code="FORBIDDEN")


# Exception to HTTP status code mapping
# Useful for API error response generation
HTTP_STATUS_CODES = {
    ValidationError: 400,
    AuthenticationError: 401,
    AuthorizationError: 403,
    NotFoundError: 404,
    ConflictError: 409,
    DatabaseError: 500,
    FrenchCoachError: 500,
}


def get_http_status_code(exception: FrenchCoachError) -> int:
    """
    Get the appropriate HTTP status code for an exception.
    
    Args:
        exception: The exception that occurred
        
    Returns:
        int: HTTP status code
        
    Example:
        >>> try:
        ...     user = service.get_user(999)
        ... except FrenchCoachError as e:
        ...     status = get_http_status_code(e)
        ...     return JSONResponse({"error": str(e)}, status_code=status)
    """
    for exc_class, status_code in HTTP_STATUS_CODES.items():
        if isinstance(exception, exc_class):
            return status_code
    return 500  # Default to internal server error
