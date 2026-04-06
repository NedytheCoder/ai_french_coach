from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os
import tempfile
import math
from pydub import AudioSegment
from pydub.silence import detect_nonsilent
import sys
import time
from langdetect import detect

load_dotenv()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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


@app.get("/")
def read_root():
    return {"message": "Hello from backend!"}


# Function to respond to chat with the user
@app.post("/respond")
def respond(data: dict):
    messages = data["message"]

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a beginner French tutor who loves to chat with students and in french for them to practice and improve their French skills.",
            },
            *backendMessages,
            *messages,
        ],
    )

    return {"reply": response.choices[0].message.content}


# Function to assist with self-introductions
@app.post("/introduction")
def introduction(data: dict):
    messages = data["message"]

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a beginner French tutor who is only focused on assisting the user with self-introductions(e.g. name, age, where you're from, etc.). Never change the subject or talk about anything else besides self-introductions. If the user tries to change the subject, gently redirect them back to self-introduction topics.",
            },
            {
                "role": "system",
                "content": "You are a beginner French tutor who loves to help users to become masters at introducing themselves in french.",
            },
            *backendMessages,
            *messages,
        ],
    )

    return {"reply": response.choices[0].message.content}


# Function to assist with traveling
@app.post("/traveling")
def traveling(data: dict):
    messages = data["message"]

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a beginner French tutor who is only focused on assisting the user with traveling(e.g. asking for directions, ordering food, airport, etc.). Never change the subject or talk about anything else besides traveling. If the user tries to change the subject, gently redirect them back to traveling topics.",
            },
            {
                "role": "system",
                "content": "You are a beginner French tutor who loves to help users to become masters at knowing what to say when traveling in french.",
            },
            *backendMessages,
            *messages,
        ],
    )

    return {"reply": response.choices[0].message.content}


# Function to assist with daily conversations
@app.post("/daily_conversations")
def daily_conversations(data: dict):
    messages = data["message"]

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a beginner French tutor who is only focused on assisting the user with daily conversations(e.g. hobbies, weather, family, routine, etc.). Never change the subject or talk about anything else besides daily conversations. If the user tries to change the subject, gently redirect them back to daily conversation topics.",
            },
            {
                "role": "system",
                "content": "You are a beginner French tutor who loves to help users become masters at daily conversations(e.g. hobbies, weather, family, routine, etc.) in french.",
            },
            *backendMessages,
            *messages,
        ],
    )

    return {"reply": response.choices[0].message.content}


# Function to transcribe audio
@app.post("/transcribe")
def transcribe(file: UploadFile = File(...)):
    tmp_path = None

    try:
        file_content = file.file.read()
        file_size = len(file_content)

        if file_size < 1024:
            return {"detail": "Audio file size too small."}

        fd, tmp_path = tempfile.mkstemp(suffix=".webm")
        os.close(fd)  # important on Windows

        with open(tmp_path, "wb") as tmp_file:
            tmp_file.write(file_content)

        audio = AudioSegment.from_file(tmp_path, format="webm")

        duration_ms = len(audio)
        if duration_ms < 500:
            return {"detail": "Audio duration too short."}

        dbfs = audio.dBFS
        if dbfs == float("-inf") or dbfs < -40:
            return {"detail": "Audio volume too low."}

        nonsilent_ranges = detect_nonsilent(
            audio,
            min_silence_len=300,
            silence_thresh=max(audio.dBFS - 16, -45),
        )

        if not nonsilent_ranges:
            return {"detail": "No clear speech detected."}

        voiced_ms = sum(end - start for start, end in nonsilent_ranges)
        if voiced_ms < 400:
            return {"detail": "Not enough speech detected."}

        # return {"detail": "We in the try block"}

        with open(tmp_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="gpt-4o-transcribe",
                file=audio_file,
                prompt="User is learning French. Input may be in French or English."
            )

        transcript_text = transcription.text.strip()

        if not transcript_text:
            return {"detail": "No transcription detected."}

        lang = detect(transcript_text)

        # if lang not in ["fr", "en"]:
        #     return {"detail": "Only French or English allowed."}

        return {"transcription": transcript_text}

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during transcription: {e}")
        raise HTTPException(status_code=500, detail="Transcription failed")
    finally:
        if tmp_path and os.path.exists(tmp_path):
            for _ in range(5):
                try:
                    os.unlink(tmp_path)
                    break
                except PermissionError:
                    time.sleep(0.1)
