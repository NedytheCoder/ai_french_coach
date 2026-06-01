"""
Audio transcription — Rule 2: the only place that calls OpenAI for audio-to-text.
No language-specific hints; the model detects the language automatically.
"""

import os
import tempfile
import time

from openai import OpenAI

_client: OpenAI | None = None


def _get_client() -> OpenAI:
    global _client
    if _client is None:
        _client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    return _client


def transcribe(audio_bytes: bytes) -> str:
    """
    Transcribe raw audio bytes to text.
    Returns an empty string if transcription fails or input is empty.

    The temp file is retried for deletion up to 5 times — Windows holds
    file locks after close().
    """
    if not audio_bytes:
        return ""

    tmp_path: str | None = None
    try:
        fd, tmp_path = tempfile.mkstemp(suffix=".webm")
        os.close(fd)
        with open(tmp_path, "wb") as f:
            f.write(audio_bytes)
        with open(tmp_path, "rb") as f:
            result = _get_client().audio.transcriptions.create(
                model="gpt-4o-transcribe",
                file=f,
            )
        return (result.text or "").strip()
    except Exception:
        return ""
    finally:
        if tmp_path and os.path.exists(tmp_path):
            for _ in range(5):
                try:
                    os.unlink(tmp_path)
                    break
                except PermissionError:
                    time.sleep(0.1)
