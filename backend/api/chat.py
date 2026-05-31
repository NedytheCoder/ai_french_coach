from fastapi import APIRouter, Depends, HTTPException, Query, status

from database.connection import get_connection
from models.chat import ChatRequest, ChatResponse, MessagesResponse, SessionsResponse
from services.auth_service import get_current_user
from services.chat_service import get_messages, list_sessions, send_message

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def post_chat(body: ChatRequest, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        result = send_message(
            conn,
            user_id=current_user["id"],
            pair_id=body.pair_id,
            session_id=body.session_id,
            message=body.message,
            mode=body.mode,
        )
        conn.commit()
        return result
    except HTTPException:
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


@router.get("/sessions", response_model=SessionsResponse)
def get_sessions(
    pair_id: int = Query(...),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    current_user=Depends(get_current_user),
):
    conn = get_connection()
    try:
        return list_sessions(conn, current_user["id"], pair_id, limit, offset)
    finally:
        conn.close()


@router.get("/sessions/{session_id}/messages", response_model=MessagesResponse)
def get_session_messages(session_id: int, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        return get_messages(conn, current_user["id"], session_id)
    finally:
        conn.close()
