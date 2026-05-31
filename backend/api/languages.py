from fastapi import APIRouter

from database.connection import get_connection
from models.languages import LanguagesResponse
from services.languages_service import list_active_languages

router = APIRouter(prefix="/languages", tags=["languages"])


@router.get("", response_model=LanguagesResponse)
def list_languages():
    conn = get_connection()
    try:
        return list_active_languages(conn)
    finally:
        conn.close()
