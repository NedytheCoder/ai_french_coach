from fastapi import APIRouter, Depends, HTTPException, Response, status

from database.connection import get_connection
from models.pairs import CreatePairRequest, PairOut, PairsResponse
from services.auth_service import get_current_user
from services.pairs_service import create_pair, delete_pair, list_pairs

router = APIRouter(prefix="/user/language-pairs", tags=["pairs"])


@router.get("", response_model=PairsResponse)
def get_pairs(current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        return list_pairs(conn, current_user["id"])
    finally:
        conn.close()


@router.post("", response_model=PairOut, status_code=status.HTTP_201_CREATED)
def add_pair(body: CreatePairRequest, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        pair = create_pair(conn, current_user["id"], body.source_language_code, body.target_language_code)
        conn.commit()
        return pair
    except HTTPException:
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


@router.delete("/{pair_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_pair(pair_id: int, current_user=Depends(get_current_user)):
    conn = get_connection()
    try:
        delete_pair(conn, current_user["id"], pair_id)
        conn.commit()
    except HTTPException:
        raise
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
