from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile, status

from database.connection import get_connection
from middleware.rate_limit import ASSESSMENT_SCORE_LIMIT, limiter
from models.assessment import (
    GetResultResponse,
    ScoreSpeakingResponse,
    ScoreWritingRequest,
    ScoreWritingResponse,
    StartAssessmentRequest,
    StartAssessmentResponse,
    SubmitAssessmentRequest,
    SubmitAssessmentResponse,
)
from services.auth_service import get_current_user
from services.assessment_service import (
    get_result,
    score_speaking_standalone,
    score_writing_standalone,
    start_assessment,
    submit_assessment,
)
from services.transcription_service import transcribe_audio

router = APIRouter(prefix="/assessment", tags=["assessment"])


@router.post("/start", response_model=StartAssessmentResponse, status_code=status.HTTP_201_CREATED)
def post_start(body: StartAssessmentRequest, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        result = start_assessment(
            conn,
            user_id=current_user["id"],
            pair_id=body.pair_id,
            assessment_type=body.assessment_type,
            skills=body.skills,
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


@router.post("/{assessment_id}/submit", response_model=SubmitAssessmentResponse)
def post_submit(
    assessment_id: int,
    body: SubmitAssessmentRequest,
    current_user=Depends(get_current_user),
):
    conn = get_connection()
    try:
        result = submit_assessment(
            conn,
            user_id=current_user["id"],
            assessment_id=assessment_id,
            answers=[a.model_dump() for a in body.answers],
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


@router.get("/{assessment_id}/result", response_model=GetResultResponse)
def get_assessment_result(assessment_id: int, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        return get_result(conn, user_id=current_user["id"], assessment_id=assessment_id)
    finally:
        conn.close()


@router.post("/score-writing", response_model=ScoreWritingResponse)
@limiter.limit(ASSESSMENT_SCORE_LIMIT)
def post_score_writing(request: Request, body: ScoreWritingRequest, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        result = score_writing_standalone(
            conn,
            user_id=current_user["id"],
            pair_id=body.pair_id,
            question=body.question,
            level=body.level,
            user_answer=body.user_answer,
            xp_reward=body.xp_reward,
        )
        return ScoreWritingResponse(**result)
    except HTTPException:
        raise
    finally:
        conn.close()


@router.post("/score-speaking", response_model=ScoreSpeakingResponse)
@limiter.limit(ASSESSMENT_SCORE_LIMIT)
def post_score_speaking(
    request: Request,
    audio: UploadFile = File(...),
    pair_id: str = Form(...),
    question: str = Form(...),
    level: str = Form(...),
    xp_reward: str = Form(...),
    current_user=Depends(get_current_user),
):
    audio_bytes = audio.file.read()
    transcription = transcribe_audio(audio_bytes).get("transcription", "")

    conn = get_connection()
    try:
        result = score_speaking_standalone(
            conn,
            user_id=current_user["id"],
            pair_id=int(pair_id),
            question=question,
            level=level,
            transcription=transcription,
            xp_reward=int(xp_reward),
        )
        return ScoreSpeakingResponse(transcription=transcription, **result)
    except HTTPException:
        raise
    finally:
        conn.close()
