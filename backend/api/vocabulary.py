from fastapi import APIRouter, Depends, HTTPException, Query

from database.connection import get_connection
from models.vocabulary import ReviewRequest, ReviewResponse, VocabularyListResponse
from services.auth_service import get_current_user
from services.vocabulary_service import list_vocabulary, review_vocabulary

router = APIRouter(prefix="/vocabulary", tags=["vocabulary"])


@router.get("", response_model=VocabularyListResponse)
def get_vocabulary(
    pair_id: int = Query(...),
    due_for_review: bool = Query(default=False),
    limit: int = Query(default=50, ge=1, le=200),
    current_user=Depends(get_current_user),
):
    conn = get_connection()
    try:
        return list_vocabulary(conn, current_user["id"], pair_id, due_for_review, limit)
    finally:
        conn.close()


@router.post("/{item_id}/review", response_model=ReviewResponse)
def post_review(item_id: int, body: ReviewRequest, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        result = review_vocabulary(conn, current_user["id"], item_id, body.correct)
        conn.commit()
        return result
    except HTTPException:
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
