"""
Auth service — token generation, password hashing, get_current_user dependency.

ADR-001: JWT access tokens (15 min) + server-side refresh tokens (7 days, SHA-256 hashed).
Rule 4: every protected endpoint uses Depends(get_current_user) — never roll custom checks.
"""

import hashlib
import os
import sqlite3
import uuid
from datetime import datetime, timedelta, timezone

import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from database.connection import get_connection

ACCESS_TOKEN_TTL_MINUTES = 15
REFRESH_TOKEN_TTL_DAYS = 7
ALGORITHM = "HS256"

_bearer = HTTPBearer()


def _secret() -> str:
    secret = os.getenv("JWT_SECRET_KEY")
    if not secret:
        raise RuntimeError("JWT_SECRET_KEY environment variable is not set")
    return secret


# ---------------------------------------------------------------------------
# Password helpers
# ---------------------------------------------------------------------------

def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


# ---------------------------------------------------------------------------
# Token helpers
# ---------------------------------------------------------------------------

def _now_utc() -> datetime:
    return datetime.now(timezone.utc)


def _hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def create_access_token(user_id: int) -> str:
    expire = _now_utc() + timedelta(minutes=ACCESS_TOKEN_TTL_MINUTES)
    return jwt.encode(
        {"sub": str(user_id), "exp": expire, "type": "access"},
        _secret(),
        algorithm=ALGORITHM,
    )


def create_refresh_token(user_id: int) -> tuple[str, str]:
    """Return (raw_token, token_hash). Store the hash; send the raw token to the client."""
    expire = _now_utc() + timedelta(days=REFRESH_TOKEN_TTL_DAYS)
    raw = jwt.encode(
        {"sub": str(user_id), "exp": expire, "type": "refresh", "jti": str(uuid.uuid4())},
        _secret(),
        algorithm=ALGORITHM,
    )
    return raw, _hash_token(raw)


def store_refresh_token(conn: sqlite3.Connection, user_id: int, token_hash: str) -> None:
    expires_at = (_now_utc() + timedelta(days=REFRESH_TOKEN_TTL_DAYS)).isoformat()
    conn.execute(
        "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
        (user_id, token_hash, expires_at),
    )


def revoke_refresh_token(conn: sqlite3.Connection, token_hash: str) -> None:
    conn.execute(
        "UPDATE refresh_tokens SET revoked = 1 WHERE token_hash = ?",
        (token_hash,),
    )


# ---------------------------------------------------------------------------
# User lookup helpers
# ---------------------------------------------------------------------------

def get_user_by_email(conn: sqlite3.Connection, email: str) -> sqlite3.Row | None:
    return conn.execute(
        """
        SELECT u.*, l.code AS source_language_code
        FROM users u
        JOIN languages l ON l.id = u.source_language_id
        WHERE u.email = ?
        """,
        (email,),
    ).fetchone()


def get_user_by_id(conn: sqlite3.Connection, user_id: int) -> sqlite3.Row | None:
    return conn.execute(
        """
        SELECT u.*, l.code AS source_language_code
        FROM users u
        JOIN languages l ON l.id = u.source_language_id
        WHERE u.id = ?
        """,
        (user_id,),
    ).fetchone()


# ---------------------------------------------------------------------------
# User record helpers (Rule 5 — business logic belongs in service layer)
# ---------------------------------------------------------------------------

def create_user(
    conn: sqlite3.Connection,
    email: str,
    password: str,
    display_name: str,
    source_language_code: str,
) -> int:
    """Validate, insert a new user, and return the new user id."""
    lang = conn.execute(
        "SELECT id FROM languages WHERE code = ? AND is_active = 1",
        (source_language_code,),
    ).fetchone()
    if lang is None:
        raise HTTPException(status_code=400, detail="Unknown or inactive source_language_code")

    if get_user_by_email(conn, email) is not None:
        raise HTTPException(status_code=422, detail="Email already registered")

    conn.execute(
        "INSERT INTO users (email, password_hash, display_name, source_language_id) VALUES (?, ?, ?, ?)",
        (email, hash_password(password), display_name, lang["id"]),
    )
    return conn.execute("SELECT last_insert_rowid()").fetchone()[0]


def update_last_seen(conn: sqlite3.Connection, user_id: int) -> None:
    conn.execute(
        "UPDATE users SET last_seen_at = datetime('now') WHERE id = ?",
        (user_id,),
    )


# ---------------------------------------------------------------------------
# FastAPI dependency — use on every protected endpoint
# ---------------------------------------------------------------------------

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer),
) -> sqlite3.Row:
    """
    FastAPI dependency that validates the Bearer access token and returns the user row.
    Rule 4: never bypass this; never roll a custom auth check.
    """
    invalid = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, _secret(), algorithms=[ALGORITHM])
        if payload.get("type") != "access":
            raise invalid
        user_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError):
        raise invalid

    conn = get_connection()
    try:
        user = get_user_by_id(conn, user_id)
    finally:
        conn.close()

    if user is None:
        raise invalid
    return user
