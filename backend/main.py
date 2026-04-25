# FastAPI - Modern web framework for building APIs with Python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.conversation import router as conversation_router
from api.reception import router as reception_router

# OpenAI - Client for GPT-4 and transcription services
from openai import OpenAI

# Environment configuration
from dotenv import load_dotenv
import os

load_dotenv()

# =============================================================================
# FASTAPI APPLICATION SETUP
# =============================================================================

# Create FastAPI application instance
# This is the main application object that handles all HTTP requests
app = FastAPI(
    title="AI French Coach API",
    description="Backend API for AI-powered French language learning",
    version="1.0.0"
)

# ------------------------------------------------------------------------------
# CORS (Cross-Origin Resource Sharing) Configuration
# ------------------------------------------------------------------------------
# Enable CORS to allow the frontend (running on different origin) to communicate
# with this backend. This is necessary for browser security policies.

app.add_middleware(
    CORSMiddleware,
    # Allowed origins - frontend URLs that can access this API
    allow_origins=[
        "http://localhost:3000",           # Local development (Next.js default)
        "https://ai-french-coach.vercel.app"  # Production deployment
    ],
    allow_methods=["*"],        # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],        # Allow all headers
    allow_credentials=True,     # Allow cookies and authentication headers
)

# ------------------------------------------------------------------------------
# OpenAI CLIENT INITIALIZATION
# ------------------------------------------------------------------------------
# Initialize OpenAI client with API key from environment variables
# This client is used for both chat completions and audio transcription

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# ------------------------------------------------------------------------------
# ROUTER REGISTRATION
# ------------------------------------------------------------------------------
# Include API routers from separate service modules
# Each router handles a specific domain of functionality

app.include_router(reception_router)      # /reception/* endpoints
app.include_router(conversation_router)   # /conversation/* endpoints

# ------------------------------------------------------------------------------
# ROOT ENDPOINT
# ------------------------------------------------------------------------------
# Health check endpoint to verify API is running

@app.get("/")
def root():
    return {"message": "AI French Coach API running", "version": "1.0.0"}