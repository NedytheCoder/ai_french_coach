"""
Script entrypoint for lesson import verification.

Usage:
  python backend/scripts/verify_lessons_import.py
"""

from __future__ import annotations

import os
import sys

script_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(script_dir)
sys.path.insert(0, backend_dir)

from database.verify_lessons_import import verify


if __name__ == "__main__":
    verify()

