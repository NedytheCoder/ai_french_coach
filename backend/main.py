from dotenv import load_dotenv
import os

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.auth import router as auth_router
from api.conversation import router as conversation_router

app = FastAPI(
    title="AI Language Coach API",
    description="Backend API for AI-powered language learning",
    version="1.0.0",
)

_allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,https://ai-french-coach.vercel.app",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(auth_router)
app.include_router(conversation_router)


@app.get("/")
def root():
    return {"message": "AI Language Coach API", "version": "1.0.0"}
