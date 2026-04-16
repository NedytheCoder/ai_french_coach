"""
Logging Utility
===============

Simple, structured logging for the French Coach backend.

This module provides a lightweight logging wrapper that:
- Prints structured, readable log messages
- Includes timestamps and log levels
- Uses color coding for different log levels
- Is easy to extend for file logging later

Design Philosophy:
------------------
Keep it simple. No complex configuration needed.
Just import and use: logger = get_logger(__name__)

Future Extensions:
------------------
- File logging
- Log rotation
- JSON structured logging
- Integration with external logging services
"""

import sys
from datetime import datetime
from typing import Optional


# ANSI color codes for terminal output
class Colors:
    """ANSI color codes for log level highlighting."""
    RESET = "\033[0m"
    GRAY = "\033[90m"
    BLUE = "\033[94m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    MAGENTA = "\033[95m"
    CYAN = "\033[96m"


# Log level configurations
LEVELS = {
    "DEBUG": {"color": Colors.GRAY, "prefix": "🔍"},
    "INFO": {"color": Colors.BLUE, "prefix": "ℹ️"},
    "SUCCESS": {"color": Colors.GREEN, "prefix": "✅"},
    "WARNING": {"color": Colors.YELLOW, "prefix": "⚠️"},
    "ERROR": {"color": Colors.RED, "prefix": "❌"},
}


class SimpleLogger:
    """
    Lightweight logger with color-coded output.
    
    This logger writes to stdout with timestamp, level, and message.
    Designed for development and simple production use.
    
    Example output:
        2024-01-15 09:30:45 [INFO] Database initialized
        2024-01-15 09:30:46 [SUCCESS] User created: Marie
    """
    
    def __init__(self, name: str, level: str = "INFO"):
        """
        Initialize logger.
        
        Args:
            name: Logger name (typically __name__)
            level: Minimum log level (DEBUG, INFO, WARNING, ERROR)
        """
        self.name = name
        self.level = level
        self._level_priority = {"DEBUG": 0, "INFO": 1, "SUCCESS": 1, "WARNING": 2, "ERROR": 3}
    
    def _should_log(self, level: str) -> bool:
        """Check if message at given level should be logged."""
        return self._level_priority.get(level, 1) >= self._level_priority.get(self.level, 1)
    
    def _log(self, level: str, message: str):
        """Internal logging method."""
        if not self._should_log(level):
            return
        
        config = LEVELS.get(level, LEVELS["INFO"])
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Format: 2024-01-15 09:30:45 [INFO] module.name: Message
        log_line = (
            f"{Colors.GRAY}{timestamp}{Colors.RESET} "
            f"{config['color']}[{level}]{Colors.RESET} "
            f"{Colors.CYAN}{self.name}{Colors.RESET}: "
            f"{config['color']}{config['prefix']} {message}{Colors.RESET}"
        )
        
        print(log_line, file=sys.stdout if level != "ERROR" else sys.stderr)
    
    def debug(self, message: str):
        """Log a debug message."""
        self._log("DEBUG", message)
    
    def info(self, message: str):
        """Log an informational message."""
        self._log("INFO", message)
    
    def success(self, message: str):
        """Log a success message."""
        self._log("SUCCESS", message)
    
    def warning(self, message: str):
        """Log a warning message."""
        self._log("WARNING", message)
    
    def error(self, message: str):
        """Log an error message."""
        self._log("ERROR", message)


# Module-level cache for loggers
_loggers: dict = {}


def get_logger(name: str) -> SimpleLogger:
    """
    Get or create a logger instance.
    
    Loggers are cached by name for efficiency.
    
    Args:
        name: Logger name (typically __name__)
        
    Returns:
        SimpleLogger: Configured logger instance
        
    Example:
        >>> from backend.utils.logger import get_logger
        >>> logger = get_logger(__name__)
        >>> logger.info("Starting process...")
        >>> logger.success("Process complete!")
    """
    if name not in _loggers:
        _loggers[name] = SimpleLogger(name)
    return _loggers[name]


def set_log_level(level: str) -> None:
    """
    Set the global log level for all loggers.
    
    Args:
        level: Minimum level to log (DEBUG, INFO, WARNING, ERROR)
        
    Example:
        >>> set_log_level("DEBUG")  # Show all messages
        >>> set_log_level("WARNING")  # Only warnings and errors
    """
    for logger in _loggers.values():
        logger.level = level


def disable_colors() -> None:
    """
    Disable ANSI color codes in log output.
    
    Useful when logging to files or systems that don't support colors.
    """
    Colors.RESET = ""
    Colors.GRAY = ""
    Colors.BLUE = ""
    Colors.GREEN = ""
    Colors.YELLOW = ""
    Colors.RED = ""
    Colors.MAGENTA = ""
    Colors.CYAN = ""
    
    for level_config in LEVELS.values():
        level_config["color"] = ""
