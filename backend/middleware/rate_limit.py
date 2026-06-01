import os

from fastapi import Request
from jose import JWTError, jwt
from slowapi import Limiter
from slowapi.util import get_remote_address

_ALGORITHM = "HS256"

CHAT_LIMIT = "30/hour"
LESSON_GENERATE_LIMIT = "10/hour"
# 20/hour rather than 10 because this limit is shared: POST /assessment/score-writing
# and POST /assessment/score-speaking are called by both the assessment flow and the
# writing/speaking lesson UI. A user doing lessons and assessments in the same hour
# consumes from the same bucket.
ASSESSMENT_SCORE_LIMIT = "20/hour"


def _user_id_key(request: Request) -> str:
    """Rate-limit key: authenticated user ID extracted from Bearer JWT, or client IP."""
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        secret = os.getenv("JWT_SECRET_KEY", "")
        try:
            payload = jwt.decode(auth[7:], secret, algorithms=[_ALGORITHM])
            if payload.get("type") == "access":
                return f"user:{payload['sub']}"
        except (JWTError, Exception):
            pass
    return get_remote_address(request)


limiter = Limiter(key_func=_user_id_key)
