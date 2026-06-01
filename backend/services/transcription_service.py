import os
import tempfile
import time

from pydub import AudioSegment
from pydub.silence import detect_nonsilent

from ai.transcriber import transcribe as _transcribe


def transcribe_audio(audio_bytes: bytes) -> dict:
    """
    Validate audio and return a transcription result dict.
    Returns {"transcription": text} on success or {"detail": reason} on validation failure.
    Raises on unexpected errors (let the handler convert to 500).
    """
    if len(audio_bytes) < 1024:
        return {"detail": "Audio file size too small."}

    tmp_path: str | None = None
    try:
        fd, tmp_path = tempfile.mkstemp(suffix=".webm")
        os.close(fd)
        with open(tmp_path, "wb") as f:
            f.write(audio_bytes)

        audio = AudioSegment.from_file(tmp_path, format="webm")

        if len(audio) < 500:
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

    finally:
        # Windows holds file locks after close(); retry is the documented workaround.
        if tmp_path and os.path.exists(tmp_path):
            for _ in range(5):
                try:
                    os.unlink(tmp_path)
                    break
                except PermissionError:
                    time.sleep(0.1)

    text = _transcribe(audio_bytes)
    if not text:
        return {"detail": "No transcription detected."}
    return {"transcription": text}
