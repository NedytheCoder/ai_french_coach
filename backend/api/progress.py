from fastapi import APIRouter, Depends, HTTPException

from database.connection import get_connection
from models.progress import ProgressResponse
from services.auth_service import get_current_user
from services.progress_service import get_progress

router = APIRouter(prefix="/progress", tags=["progress"])


@router.get("/{pair_id}", response_model=ProgressResponse)
def get_pair_progress(pair_id: int, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        return get_progress(conn, current_user["id"], pair_id)
    except HTTPException:
        raise
    finally:
        conn.close()
