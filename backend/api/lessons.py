from fastapi import APIRouter, Depends, HTTPException, Request

from database.connection import get_connection
from middleware.rate_limit import LESSON_GENERATE_LIMIT, limiter
from models.lesson import (
    CompleteLessonRequest,
    CompleteLessonResponse,
    GenerateLessonRequest,
    LessonOut,
)
from services.auth_service import get_current_user
from services.lesson_service import complete_lesson, generate_or_get_lesson, get_lesson

router = APIRouter(prefix="/lesson", tags=["lessons"])


@router.post("/generate", response_model=LessonOut)
@limiter.limit(LESSON_GENERATE_LIMIT)
def post_generate_lesson(request: Request, body: GenerateLessonRequest, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        result = generate_or_get_lesson(
            conn,
            user_id=current_user["id"],
            pair_id=body.pair_id,
            level=body.level,
            lesson_type=body.lesson_type,
            topic=body.topic,
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


@router.get("/{lesson_id}", response_model=LessonOut)
def get_lesson_by_id(lesson_id: int, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        return get_lesson(conn, current_user["id"], lesson_id)
    finally:
        conn.close()


@router.post("/{lesson_id}/complete", response_model=CompleteLessonResponse)
def post_complete_lesson(
    lesson_id: int,
    body: CompleteLessonRequest,
    current_user=Depends(get_current_user),
):
    conn = get_connection()
    try:
        result = complete_lesson(
            conn,
            user_id=current_user["id"],
            lesson_id=lesson_id,
            score=body.score,
            max_score=body.max_score,
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
