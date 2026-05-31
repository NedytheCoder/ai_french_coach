"""
Auth endpoints — Rule 5: handlers own HTTP, services own business logic.
"""

import hashlib
import sqlite3

from fastapi import APIRouter, Depends, HTTPException, Response, status

from database.connection import get_connection
from models.auth import AuthResponse, LoginRequest, RefreshRequest, RegisterRequest, TokenResponse, UserOut
from services.auth_service import (
    create_access_token,
    create_refresh_token,
    get_current_user,
    get_user_by_email,
    hash_password,
    revoke_refresh_token,
    store_refresh_token,
    verify_password,
)

router = APIRouter(prefix="/auth", tags=["auth"])


def _user_out(row: sqlite3.Row) -> UserOut:
    return UserOut(
        id=row["id"],
        email=row["email"],
        display_name=row["display_name"],
        source_language_code=row["source_language_code"],
        created_at=row["created_at"],
    )


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(body: RegisterRequest):
    conn = get_connection()
    try:
        lang = conn.execute(
            "SELECT id FROM languages WHERE code = ? AND is_active = 1",
            (body.source_language_code,),
        ).fetchone()
        if lang is None:
            raise HTTPException(status_code=400, detail="Unknown or inactive source_language_code")

        if get_user_by_email(conn, body.email) is not None:
            raise HTTPException(status_code=422, detail="Email already registered")

        conn.execute(
            """
            INSERT INTO users (email, password_hash, display_name, source_language_id)
            VALUES (?, ?, ?, ?)
            """,
            (body.email, hash_password(body.password), body.display_name, lang["id"]),
        )
        user_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]

        raw_refresh, token_hash = create_refresh_token(user_id)
        store_refresh_token(conn, user_id, token_hash)
        conn.commit()

        user_row = conn.execute(
            "SELECT u.*, l.code AS source_language_code FROM users u JOIN languages l ON l.id = u.source_language_id WHERE u.id = ?",
            (user_id,),
        ).fetchone()

        return AuthResponse(
            user=_user_out(user_row),
            access_token=create_access_token(user_id),
            refresh_token=raw_refresh,
        )
    except HTTPException:
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


@router.post("/login", response_model=AuthResponse)
def login(body: LoginRequest):
    conn = get_connection()
    try:
        user = get_user_by_email(conn, body.email)
        if user is None or not verify_password(body.password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        conn.execute(
            "UPDATE users SET last_seen_at = datetime('now') WHERE id = ?",
            (user["id"],),
        )

        raw_refresh, token_hash = create_refresh_token(user["id"])
        store_refresh_token(conn, user["id"], token_hash)
        conn.commit()

        return AuthResponse(
            user=_user_out(user),
            access_token=create_access_token(user["id"]),
            refresh_token=raw_refresh,
        )
    except HTTPException:
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


@router.post("/refresh", response_model=TokenResponse)
def refresh(body: RefreshRequest):
    from jose import JWTError, jwt
    from services.auth_service import ALGORITHM, _secret

    invalid = HTTPException(status_code=401, detail="Invalid or expired refresh token")
    try:
        payload = jwt.decode(body.refresh_token, _secret(), algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            raise invalid
        user_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError):
        raise invalid

    token_hash = hashlib.sha256(body.refresh_token.encode()).hexdigest()
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT * FROM refresh_tokens WHERE token_hash = ? AND revoked = 0",
            (token_hash,),
        ).fetchone()
        if row is None:
            raise invalid

        return TokenResponse(access_token=create_access_token(user_id))
    finally:
        conn.close()


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(body: RefreshRequest):
    token_hash = hashlib.sha256(body.refresh_token.encode()).hexdigest()
    conn = get_connection()
    try:
        revoke_refresh_token(conn, token_hash)
        conn.commit()
    finally:
        conn.close()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/me", response_model=UserOut)
def me(current_user=Depends(get_current_user)):
    return _user_out(current_user)
