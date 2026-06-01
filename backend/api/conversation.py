"""
Conversation legacy router.

Active endpoint: POST /conversation/transcribe — audio-to-text transcription
used by the assessment speaking flow and chat voice input.

Deprecated endpoints (POST /respond, /introduction, /traveling,
/daily_conversations) return 410 Gone. Use POST /chat instead.
See api_contract.md §12.
"""

from fastapi import APIRouter, File, UploadFile, HTTPException

from services.transcription_service import transcribe_audio

router = APIRouter(prefix="/conversation", tags=["conversation"])


@router.get("/")
def read_root():
    return {"message": "Hello from backend!"}


@router.post("/respond")
def respond(data: dict):
    # Deprecated — superseded by POST /chat with mode="general". See api_contract.md §12.
    raise HTTPException(status_code=410, detail="Deprecated. Use POST /chat with mode='general'.")


@router.post("/introduction")
def introduction(data: dict):
    # Deprecated — superseded by POST /chat with mode="introduction". See api_contract.md §12.
    raise HTTPException(status_code=410, detail="Deprecated. Use POST /chat with mode='introduction'.")


@router.post("/traveling")
def traveling(data: dict):
    # Deprecated — superseded by POST /chat with mode="travelling". See api_contract.md §12.
    raise HTTPException(status_code=410, detail="Deprecated. Use POST /chat with mode='travelling'.")


@router.post("/daily_conversations")
def daily_conversations(data: dict):
    # Deprecated — superseded by POST /chat with mode="daily_life". See api_contract.md §12.
    raise HTTPException(status_code=410, detail="Deprecated. Use POST /chat with mode='daily_life'.")


@router.post("/transcribe")
def transcribe(file: UploadFile = File(...)):
    try:
        audio_bytes = file.file.read()
        return transcribe_audio(audio_bytes)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Transcription failed")
