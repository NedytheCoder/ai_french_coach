from dotenv import load_dotenv
import os

load_dotenv()

# ADR-002: server must not start without these variables.
_missing_env = [v for v in ("JWT_SECRET_KEY", "OPENAI_API_KEY") if not os.getenv(v)]
if _missing_env:
    raise RuntimeError(f"Required environment variables not set: {', '.join(_missing_env)}")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from api.assessment import router as assessment_router
from api.auth import router as auth_router
from api.chat import router as chat_router
from api.conversation import router as conversation_router
from api.languages import router as languages_router
from api.lessons import router as lessons_router
from api.pairs import router as pairs_router
from api.progress import router as progress_router
from api.vocabulary import router as vocabulary_router
from middleware.rate_limit import limiter

app = FastAPI(
    title="AI Language Coach API",
    description="Backend API for AI-powered language learning",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

_allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,https://ai-french-coach.vercel.app",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
    allow_credentials=True,
)

app.include_router(assessment_router)
app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(conversation_router)
app.include_router(languages_router)
app.include_router(lessons_router)
app.include_router(pairs_router)
app.include_router(progress_router)
app.include_router(vocabulary_router)


@app.get("/")
def root():
    return {"message": "AI Language Coach API", "version": "1.0.0"}
