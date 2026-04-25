"""
AI French Coach - Conversation API Router
=========================================

This FastAPI router provides conversation and tutoring endpoints for the 
AI French Coach language learning application.

Core Features:
--------------
1. General French tutoring with GPT-4o-mini
2. Specialized conversation modes (Introduction, Traveling, Daily Conversations)
3. Audio transcription with speech quality validation

API Endpoints (all prefixed with /conversation):
-------------------------------------------------
- GET  /                    : Health check
- POST /respond             : General tutoring chat
- POST /introduction        : Self-introduction practice
- POST /traveling           : Travel scenario practice
- POST /daily_conversations : Daily conversation practice
- POST /transcribe          : Audio-to-text transcription

Dependencies:
-------------
- FastAPI: Web framework for building APIs
- OpenAI: GPT-4o-mini for tutoring and transcription
- pydub: Audio processing and validation
- langdetect: Language detection for transcripts

Environment Variables:
----------------------
- OPENAI_API_KEY: API key for OpenAI services
"""

# =============================================================================
# IMPORTS
# =============================================================================

# FastAPI - Router for modular API endpoints
from fastapi import APIRouter, File, UploadFile, HTTPException

# OpenAI - Client for GPT-4 and transcription services
from openai import OpenAI

# Environment configuration
from dotenv import load_dotenv
import os

# Audio processing
import tempfile
from pydub import AudioSegment  # Audio file manipulation
from pydub.silence import detect_nonsilent  # Silence detection for validation

# Utilities
import time  # For retry delays in file cleanup
from langdetect import detect  # Language detection for transcripts

# =============================================================================
# ROUTER SETUP
# =============================================================================

# Create router for conversation endpoints
# All routes will be prefixed with /conversation
router = APIRouter(prefix="/conversation", tags=["conversation"])

# =============================================================================
# CONFIGURATION
# =============================================================================

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# =============================================================================
# SYSTEM MESSAGES FOR AI TUTOR
# =============================================================================
# These messages define the behavior and personality of the AI French tutor.
# They are injected into every conversation to maintain consistent behavior.

backendMessages = [
    {
        "role": "system",
        "content": """
You are a beginner French tutor conducting a guided speaking session.

Core behavior:
- Always correct the user's sentence
- Always provide a short, simple explanation
- Always ask ONE follow-up question to continue the conversation
- Keep explanations beginner-friendly and concise
- Do not break the format

Language behavior:
- If the user speaks French → respond in French
- If the user speaks English → respond in English, but gently encourage them to use French more often

Translation behavior:
- If the user asks for a translation → provide the translation and a simple explanation in French

Adaptation:
- If the user specifies their level (A1–C2), adjust your complexity accordingly
- If the user shows confusion multiple times, ask for their level to adapt better

Tone:
- Be encouraging, positive, and supportive at all times

"""
    }
]


# =============================================================================
# API ENDPOINTS
# =============================================================================

# ------------------------------------------------------------------------------
# Health Check Endpoint
# ------------------------------------------------------------------------------
# Simple endpoint to verify the backend is running and accessible

@router.get("/")
def read_root():
    """
    Root endpoint - Health check.
    
    Returns:
        dict: Simple message confirming the backend is running
    """
    return {"message": "Hello from backend!"}


# ------------------------------------------------------------------------------
# General Tutoring Endpoint
# ------------------------------------------------------------------------------
# Handles general French tutoring conversations.
# Combines system instructions with the user's message history.

@router.post("/respond")
def respond(data: dict):
    """
    General French tutoring endpoint.
    
    Accepts a conversation history and returns the AI tutor's response.
    Uses GPT-4o-mini for generating contextual, encouraging feedback.
    
    Args:
        data (dict): Request body containing:
            - message (list): List of conversation messages (role, content)
    
    Returns:
        dict: Contains the AI tutor's reply
        {
            "reply": str  # The tutor's response message
        }
    """
    # Extract message history from request
    messages = data["message"]

    # Call OpenAI API with system context and conversation history
    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Fast, cost-effective model for tutoring
        messages=[
            # Primary system instruction - defines tutor personality
            {
                "role": "system",
                "content": "You are a beginner French tutor who loves to chat with students and in french for them to practice and improve their French skills.",
            },
            # Global behavior guidelines (from backendMessages)
            *backendMessages,
            # User's conversation history
            *messages,
        ],
    )

    # Extract and return the assistant's response text
    return {"reply": response.choices[0].message.content}


# ------------------------------------------------------------------------------
# Self-Introduction Practice Endpoint
# ------------------------------------------------------------------------------
# Specialized endpoint for practicing self-introductions in French.
# Focuses exclusively on topics like name, age, origin, profession, etc.
# The AI will gently redirect if the user tries to change subjects.

@router.post("/introduction")
def introduction(data: dict):
    """
    Self-introduction practice endpoint.
    
    Provides focused practice for introducing oneself in French.
    Covers: name, age, where you're from, profession, hobbies, etc.
    The tutor stays strictly on this topic and redirects off-topic queries.
    
    Args:
        data (dict): Request body containing:
            - message (list): Conversation messages
    
    Returns:
        dict: Contains the tutor's focused response
        {
            "reply": str  # The tutor's response
        }
    """
    # Extract message history
    messages = data["message"]

    # Generate response with topic-specific system instructions
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            # Primary topic constraint - must stay on self-introductions
            {
                "role": "system",
                "content": "You are a beginner French tutor who is only focused on assisting the user with self-introductions(e.g. name, age, where you're from, etc.). Never change the subject or talk about anything else besides self-introductions. If the user tries to change the subject, gently redirect them back to self-introduction topics.",
            },
            # Secondary personality instruction
            {
                "role": "system",
                "content": "You are a beginner French tutor who loves to help users to become masters at introducing themselves in french.",
            },
            # Global behavior guidelines
            *backendMessages,
            # User's conversation
            *messages,
        ],
    )

    return {"reply": response.choices[0].message.content}


# ------------------------------------------------------------------------------
# Traveling Scenario Practice Endpoint
# ------------------------------------------------------------------------------
# Specialized endpoint for practicing travel-related French conversations.
# Covers: asking for directions, ordering food, airport interactions, etc.

@router.post("/traveling")
def traveling(data: dict):
    """
    Travel scenario practice endpoint.
    
    Provides focused practice for travel situations in French.
    Covers: directions, ordering food, airport, hotel, shopping, etc.
    The tutor stays on travel topics and redirects off-topic queries.
    
    Args:
        data (dict): Request body containing:
            - message (list): Conversation messages
    
    Returns:
        dict: Contains the tutor's travel-focused response
        {
            "reply": str  # The tutor's response
        }
    """
    messages = data["message"]

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            # Topic constraint - stay on travel scenarios
            {
                "role": "system",
                "content": "You are a beginner French tutor who is only focused on assisting the user with traveling(e.g. asking for directions, ordering food, airport, etc.). Never change the subject or talk about anything else besides traveling. If the user tries to change the subject, gently redirect them back to traveling topics.",
            },
            # Personality instruction
            {
                "role": "system",
                "content": "You are a beginner French tutor who loves to help users to become masters at knowing what to say when traveling in french.",
            },
            *backendMessages,
            *messages,
        ],
    )

    return {"reply": response.choices[0].message.content}


# ------------------------------------------------------------------------------
# Daily Conversation Practice Endpoint
# ------------------------------------------------------------------------------
# Specialized endpoint for practicing everyday French conversations.
# Covers: hobbies, weather, family, daily routine, small talk, etc.

@router.post("/daily_conversations")
def daily_conversations(data: dict):
    """
    Daily conversation practice endpoint.
    
    Provides focused practice for everyday French conversations.
    Covers: hobbies, weather, family, routine, small talk, etc.
    The tutor stays on daily conversation topics and redirects off-topic queries.
    
    Args:
        data (dict): Request body containing:
            - message (list): Conversation messages
    
    Returns:
        dict: Contains the tutor's conversation-focused response
        {
            "reply": str  # The tutor's response
        }
    """
    messages = data["message"]

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            # Topic constraint - stay on daily conversation topics
            {
                "role": "system",
                "content": "You are a beginner French tutor who is only focused on assisting the user with daily conversations(e.g. hobbies, weather, family, routine, etc.). Never change the subject or talk about anything else besides daily conversations. If the user tries to change the subject, gently redirect them back to daily conversation topics.",
            },
            # Personality instruction
            {
                "role": "system",
                "content": "You are a beginner French tutor who loves to help users become masters at daily conversations(e.g. hobbies, weather, family, routine, etc.) in french.",
            },
            *backendMessages,
            *messages,
        ],
    )

    return {"reply": response.choices[0].message.content}


# ------------------------------------------------------------------------------
# Audio Transcription Endpoint
# ------------------------------------------------------------------------------
# Transcribes audio files to text using OpenAI's transcription API.
# Includes comprehensive audio quality validation before transcription:
# - File size validation (must be at least 1KB)
# - Audio duration validation (must be at least 500ms)
# - Volume level validation (must be above -40 dBFS)
# - Speech detection (must contain clear speech segments)
# 
# The endpoint supports webm audio format from browser recording.

@router.post("/transcribe")
def transcribe(file: UploadFile = File(...)):
    """
    Audio transcription endpoint with quality validation.
    
    Accepts an audio file (webm format), validates audio quality, and
    returns a text transcription using OpenAI's transcription API.
    
    Args:
        file (UploadFile): Audio file uploaded by the user
        
    Returns:
        dict: Contains either the transcription or an error detail
        {
            "transcription": str  # The transcribed text (on success)
        }
        OR
        {
            "detail": str  # Error message (on validation/transcription failure)
        }
    
    Validation Steps:
    -----------------
    1. File size must be at least 1KB (prevents empty/corrupt uploads)
    2. Audio duration must be at least 500ms (prevents accidental triggers)
    3. Volume level must be above -40 dBFS (prevents silent recordings)
    4. Must contain clear speech segments (filters out noise-only recordings)
    5. Total voiced audio must be at least 400ms (ensures substantial speech)
    """
    tmp_path = None  # Initialize for cleanup in finally block

    try:
        # ----------------------------------------------------------------------
        # STEP 1: Read and validate uploaded file
        # ----------------------------------------------------------------------
        file_content = file.file.read()
        file_size = len(file_content)

        # Validation: Minimum file size (1KB) to prevent empty/corrupted uploads
        if file_size < 1024:
            return {"detail": "Audio file size too small."}

        # ----------------------------------------------------------------------
        # STEP 2: Save audio to temporary file
        # ----------------------------------------------------------------------
        # Create a temporary file with .webm extension for processing
        fd, tmp_path = tempfile.mkstemp(suffix=".webm")
        os.close(fd)  # Close file descriptor - important on Windows

        # Write uploaded content to temporary file
        with open(tmp_path, "wb") as tmp_file:
            tmp_file.write(file_content)

        # ----------------------------------------------------------------------
        # STEP 3: Load and analyze audio
        # ----------------------------------------------------------------------
        # Load audio using pydub for analysis
        audio = AudioSegment.from_file(tmp_path, format="webm")

        # Validation: Minimum duration (500ms)
        duration_ms = len(audio)
        if duration_ms < 500:
            return {"detail": "Audio duration too short."}

        # Validation: Volume level check (-40 dBFS threshold)
        # dBFS = decibels relative to full scale
        dbfs = audio.dBFS
        if dbfs == float("-inf") or dbfs < -40:
            return {"detail": "Audio volume too low."}

        # ----------------------------------------------------------------------
        # STEP 4: Speech detection
        # ----------------------------------------------------------------------
        # Detect non-silent portions of audio to identify clear speech
        nonsilent_ranges = detect_nonsilent(
            audio,
            min_silence_len=300,  # Minimum silence to consider as gap (ms)
            silence_thresh=max(audio.dBFS - 16, -45),  # Silence threshold (dB)
        )

        # Validation: Must have clear speech segments
        if not nonsilent_ranges:
            return {"detail": "No clear speech detected."}

        # Validation: Minimum voiced audio duration (400ms)
        voiced_ms = sum(end - start for start, end in nonsilent_ranges)
        if voiced_ms < 400:
            return {"detail": "Not enough speech detected."}

        # ----------------------------------------------------------------------
        # STEP 5: Transcription
        # ----------------------------------------------------------------------
        # All validations passed - proceed with transcription
        with open(tmp_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="gpt-4o-transcribe",  # OpenAI's transcription model
                file=audio_file,
                prompt="User is learning French. Input may be in French or English."
                # Context prompt helps the model with language switching
            )

        # Extract and clean transcription text
        transcript_text = transcription.text.strip()

        # Validation: Ensure transcription is not empty
        if not transcript_text:
            return {"detail": "No transcription detected."}

        # Detect language of transcript (for potential filtering)
        lang = detect(transcript_text)

        # Language filtering is currently disabled but could be re-enabled:
        # if lang not in ["fr", "en"]:
        #     return {"detail": "Only French or English allowed."}

        # Return successful transcription
        return {"transcription": transcript_text}

    except HTTPException:
        # Re-raise HTTP exceptions (already properly formatted)
        raise
    except Exception as e:
        # Log unexpected errors and return generic error to client
        print(f"Error during transcription: {e}")
        raise HTTPException(status_code=500, detail="Transcription failed")
    finally:
        # ----------------------------------------------------------------------
        # Cleanup: Remove temporary file
        # ----------------------------------------------------------------------
        # Attempt to delete temporary file with retry logic for Windows
        if tmp_path and os.path.exists(tmp_path):
            for _ in range(5):  # Retry up to 5 times
                try:
                    os.unlink(tmp_path)  # Delete file
                    break
                except PermissionError:
                    # File may be locked by another process (Windows)
                    # Wait briefly and retry
                    time.sleep(0.1)
