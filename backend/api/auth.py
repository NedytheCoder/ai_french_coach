"""
Auth endpoints — Rule 5: handlers own HTTP, services own business logic.
"""

import sqlite3

from fastapi import APIRouter, Depends, HTTPException, Response, status

from database.connection import get_connection
from models.auth import AuthResponse, LoginRequest, RefreshRequest, RegisterRequest, TokenResponse, UserOut
from services.auth_service import (
    create_access_token,
    create_refresh_token,
    create_user,
    get_current_user,
    get_user_by_email,
    get_user_by_id,
    revoke_refresh_token,
    store_refresh_token,
    update_last_seen,
    verify_password,
    verify_refresh_token,
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
        user_id = create_user(conn, body.email, body.password, body.display_name, body.source_language_code)
        raw_refresh, token_hash = create_refresh_token(user_id)
        store_refresh_token(conn, user_id, token_hash)
        conn.commit()
        user_row = get_user_by_id(conn, user_id)
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

        update_last_seen(conn, user["id"])
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
    conn = get_connection()
    try:
        user_id = verify_refresh_token(conn, body.refresh_token)
        return TokenResponse(access_token=create_access_token(user_id))
    except HTTPException:
        raise
    finally:
        conn.close()


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(body: RefreshRequest):
    conn = get_connection()
    try:
        revoke_refresh_token(conn, body.refresh_token)
        conn.commit()
    finally:
        conn.close()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/me", response_model=UserOut)
def me(current_user=Depends(get_current_user)):
    return _user_out(current_user)
