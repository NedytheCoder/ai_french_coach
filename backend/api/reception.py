from fastapi import APIRouter, File, UploadFile, Form
import sqlite3
import os
import json
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

router = APIRouter(prefix="/reception", tags=["reception"])

# Database path - adjust based on your project structure
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "app.db")
print(DB_PATH)

@router.get("/")
def get_reception():
    return {"message": "Reception endpoint"}

@router.get("/levels")
def get_reception_levels():
    """
    Fetch all levels from the reception table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT r.*, l.code as level_code 
            FROM reception r 
            JOIN levels l ON r.level_id = l.id 
            ORDER BY l.sort_order
        """)
        rows = cursor.fetchall()
        
        levels = [dict(row) for row in rows]
        
        conn.close()
        return {"levels": levels}
    except Exception as e:
        return {"error": str(e), "levels": []}

@router.get("/placement-tests")
def get_placement_tests():
    """
    Fetch all placement tests from the placement_test_types table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM placement_test_types
            ORDER BY sort_order
        """)
        rows = cursor.fetchall()
        
        tests = [dict(row) for row in rows]
        
        conn.close()
        return {"tests": tests}
    except Exception as e:
        return {"error": str(e), "tests": []}

@router.get("/placement-test-descriptions")
def get_placement_test_descriptions():
    """
    Fetch all placement test descriptions from the placement_test_descriptions table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT ptd.*, ptt.code, ptt.title
            FROM placement_test_descriptions ptd
            JOIN placement_test_types ptt ON ptd.test_type_id = ptt.id
            ORDER BY ptt.sort_order
        """)
        rows = cursor.fetchall()
        
        descriptions = [dict(row) for row in rows]
        
        conn.close()
        return {"descriptions": descriptions}
    except Exception as e:
        return {"error": str(e), "descriptions": []}

@router.get("/immediate-read-question-feedback")
def get_immediate_read_question_feedback():
    """
    Fetch all immediate read question feedback from the immediate_question_feedback table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM immediate_question_feedback
            WHERE skill = 'reading'
            ORDER BY skill, feedback_type
        """)
        rows = cursor.fetchall()
        
        feedback = [dict(row) for row in rows]
        
        conn.close()
        return {"feedback": feedback}
    except Exception as e:
        return {"error": str(e), "feedback": []}

@router.get("/reading-placement-tests")
def get_reading_placement_tests():
    """
    Fetch all reading placement tests from the reading_placement_tests table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM reading_placement_tests
            ORDER BY sort_order
        """)
        rows = cursor.fetchall()
        
        tests = [dict(row) for row in rows]
        
        conn.close()
        return {"tests": tests}
    except Exception as e:
        return {"error": str(e), "tests": []}

@router.get("/immediate-listen-question-feedback")
def get_immediate_listen_question_feedback():
    """
    Fetch all immediate listen question feedback from the immediate_question_feedback table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM immediate_question_feedback
            WHERE skill = 'listening'
            ORDER BY skill, feedback_type
        """)
        rows = cursor.fetchall()
        
        feedback = [dict(row) for row in rows]
        
        conn.close()
        return {"feedback": feedback}
    except Exception as e:
        return {"error": str(e), "feedback": []}

@router.get("/listening-placement-tests")
def get_listening_placement_tests():
    """
    Fetch all listening placement tests from the listening_placement_tests table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM listening_placement_tests
            ORDER BY sort_order
        """)
        rows = cursor.fetchall()
        
        tests = [dict(row) for row in rows]
        
        conn.close()
        return {"tests": tests}
    except Exception as e:
        return {"error": str(e), "tests": []}

@router.get("/immediate-write-question-feedback")
def get_immediate_write_question_feedback():
    """
    Fetch all immediate write question feedback from the immediate_question_feedback table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM immediate_question_feedback
            WHERE skill = 'writing'
            ORDER BY skill, feedback_type
        """)
        rows = cursor.fetchall()
        
        feedback = [dict(row) for row in rows]
        
        conn.close()
        return {"feedback": feedback}
    except Exception as e:
        return {"error": str(e), "feedback": []}

@router.get("/writing-placement-tests")
def get_writing_placement_tests():
    """
    Fetch all writing placement tests from the writing_placement_tests table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM writing_placement_tests
            ORDER BY sort_order
        """)
        rows = cursor.fetchall()
        
        tests = [dict(row) for row in rows]
        
        conn.close()
        return {"tests": tests}
    except Exception as e:
        return {"error": str(e), "tests": []}

@router.post("/writing-test-scoring")
def score_writing_test(data: dict):
    """
    Score response from OpenAI using the writing test scoring criteria.
    """
    try:
        # Extract data from request
        user_answer = data.get("userAnswer", "")
        question = data.get("question", "")
        question_text = data.get("questionText", "")
        level = data.get("level", "")
        
        # Create scoring prompt for OpenAI
        scoring_prompt = f"""
        Please evaluate this French writing response and provide a score.

        Question: {question}
        Additional Context: {question_text}
        Level: {level}
        User's Answer: {user_answer}

        Please evaluate based on:
        1. Grammar and syntax accuracy
        2. Vocabulary appropriateness for the level
        3. Coherence and structure
        4. Addressing the question requirements

        Return a JSON response with:
        {{
            "isCorrect": true/false,
            "feedback": "10 word brief feedback message based on my answer with respect to the question and level(Sound and use the tone of a teacher who would like to encourage the student)",
            "xpAwarded": number of XP points to award, 0-10 for level A0, 0-15 for level A1, 0-20 for level A2, 0-25 for level B1, 0-30 for level B2, 0-35 for level C1, 0-40 for level C2. Full marks must be awarded if the answer is fully correct.
        }}
        """
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a French writing test evaluator. Always respond with valid JSON only.",
                },
                {
                    "role": "user", 
                    "content": scoring_prompt
                }
            ],
            temperature=0.3
        )
        
        # Parse the response
        result_text = response.choices[0].message.content.strip()
        
        # Try to parse JSON response
        try:
            result = json.loads(result_text)
        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            result = {
                # "isCorrect": word_count >= min_words_required,
                # "score": 5,
                # "feedback": "Response evaluated successfully.",
                # "xpAwarded": 10
            }
        
        return result
        
    except Exception as e:
        # Return fallback response on error
        return {
            "isCorrect": True,
            "score": 5,
            "feedback": "Evaluation completed. Please try again if issues persist.",
            "xpAwarded": 10,
            "error": str(e)
        }

@router.get("/immediate-speak-question-feedback")
def get_immediate_speak_question_feedback():
    """
    Fetch all immediate speaking question feedback from the immediate_question_feedback table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM immediate_question_feedback
            WHERE skill = 'speaking'
            ORDER BY skill, feedback_type
        """)
        rows = cursor.fetchall()
        
        feedback = [dict(row) for row in rows]
        
        conn.close()
        return {"feedback": feedback}
    except Exception as e:
        return {"error": str(e), "feedback": []}

@router.get("/speaking-placement-tests")
def get_speaking_placement_tests():
    """
    Fetch all speaking placement tests from the speaking_placement_tests table.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT * FROM speaking_placement_tests
            ORDER BY sort_order
        """)
        rows = cursor.fetchall()
        
        tests = [dict(row) for row in rows]
        
        conn.close()
        return {"tests": tests}
    except Exception as e:
        return {"error": str(e), "tests": []}

@router.post("/speaking-test-scoring")
def score_speaking_test(
    audio: UploadFile = File(...),
    question: str = Form(...),
    instruction: str = Form(...),
    level: str = Form(...),
    questionType: str = Form(...),
    xpReward: str = Form(...)
):
    """
    Score speaking response using conversation-style API call.
    """
    import os
    import json
    import tempfile
    from pydub import AudioSegment

    tmp_path = None
    
    try:
        # ----------------------------------------------------------------------
        # STEP 1: Read and validate uploaded audio file
        # ----------------------------------------------------------------------
        file_content = audio.file.read()
        file_size = len(file_content)

        # Validation: Minimum file size (1KB)
        if file_size < 1024:
            return {
                "isCorrect": False,
                "answeredQuestion": False,
                "feedback": "I could not hear enough audio. Please try again.",
                "xpAwarded": 0,
                "detail": "Audio file size too small."
            }

        # ----------------------------------------------------------------------
        # STEP 2: Save audio to temporary file
        # ----------------------------------------------------------------------
        fd, tmp_path = tempfile.mkstemp(suffix=".webm")
        os.close(fd)

        with open(tmp_path, "wb") as tmp_file:
            tmp_file.write(file_content)

        # ----------------------------------------------------------------------
        # STEP 3: Load and analyze audio
        # ----------------------------------------------------------------------
        audio_segment = AudioSegment.from_file(tmp_path, format="webm")
        
        # Validation: Minimum duration (500ms)
        duration_ms = len(audio_segment)
        if duration_ms < 500:
            return {
                "isCorrect": False,
                "answeredQuestion": False,
                "feedback": "Your recording was too short. Please try again.",
                "xpAwarded": 0,
                "detail": "Audio duration too short."
            }

        # Validation: Volume level check (-40 dBFS threshold)
        dbfs = audio_segment.dBFS
        if dbfs == float("-inf") or dbfs < -40:
            return {
                "isCorrect": False,
                "answeredQuestion": False,
                "feedback": "Your voice was too quiet. Please speak louder.",
                "xpAwarded": 0,
                "detail": "Audio volume too low."
            }

        # ----------------------------------------------------------------------
        # STEP 4: Speech detection
        # ----------------------------------------------------------------------
        from pydub.silence import detect_nonsilent
        nonsilent_ranges = detect_nonsilent(
            audio_segment,
            min_silence_len=300,
            silence_thresh=max(audio_segment.dBFS - 16, -45),
        )

        if not nonsilent_ranges:
            return {
                "isCorrect": False,
                "answeredQuestion": False,
                "feedback": "I could not detect clear speech. Please try again.",
                "xpAwarded": 0,
                "detail": "No clear speech detected."
            }

        # Validation: Minimum voiced audio duration (400ms)
        voiced_ms = sum(end - start for start, end in nonsilent_ranges)
        if voiced_ms < 400:
            return {
                "isCorrect": False,
                "answeredQuestion": False,
                "feedback": "Please speak a little more before submitting.",
                "xpAwarded": 0,
                "detail": "Not enough speech detected."
            }

        # ----------------------------------------------------------------------
        # STEP 5: Transcribe audio for evaluation
        # ----------------------------------------------------------------------
        fd, tmp_wav_path = tempfile.mkstemp(suffix=".wav")
        os.close(fd)

        audio_segment.export(tmp_wav_path, format="wav")

        with open(tmp_wav_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="gpt-4o-transcribe",
                file=audio_file,
                prompt="User is learning French. Input may be in French or English.",
                response_format="text"
            )

        max_xp = int(xpReward) if str(xpReward).isdigit() else 10

        # ----------------------------------------------------------------------
        # STEP 6: Create scoring prompt for OpenAI
        # ----------------------------------------------------------------------
        scoring_prompt = f"""
        Please evaluate this French speaking response and provide a score.

        Question: {question}
        Instruction: {instruction}
        Level: {level}
        Question Type: {questionType}
        Transcription: {transcription}
        xpReward: {max_xp}

        Please evaluate based on:
        1. Grammar and syntax accuracy
        2. Vocabulary appropriateness for the level
        3. Content coherence and relevance to the question
        4. Sentence structure and flow
        5. Addressing the question requirements
        6. Make sure the response is relevant before giving any score higher than 0
        
        Note: Audio quality (pronunciation, clarity) has been validated separately.

        Return a JSON response with:
        {{
            "isCorrect": true/false,
            "feedback": "10 word brief feedback message based on the transcription with respect to the question and level(Sound and use the tone of a teacher who would like to encourage the student)",
            "xpAwarded": number of XP points to award, 0-10 for level A0, 0-15 for level A1, 0-20 for level A2, 0-25 for level B1, 0-30 for level B2, 0-35 for level C1, 0-40 for level C2. Full marks must be awarded if the answer is fully correct.
        }}
        """
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a French speaking test evaluator. ALWAYS RESPOND WITH VALID JSON ONLY(HIGHEST IMPORTANCE).",
                },
                {
                    "role": "user", 
                    "content": scoring_prompt
                }
            ],
            temperature=0.3
        )
        
        # Parse the response
        result_text = response.choices[0].message.content.strip()
        
        # Try to parse JSON response
        try:
            # Handle case where JSON is wrapped in markdown code blocks
            if result_text.startswith('```json'):
                result_text = result_text.replace('```json', '').replace('```', '').strip()
            elif result_text.startswith('```'):
                result_text = result_text.replace('```', '').strip()
            
            result = json.loads(result_text)
            # Add transcription to the result
            result["transcription"] = transcription
            
        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            result = {
                "isCorrect": True,
                "feedback": "Response evaluated successfully.",
                "xpAwarded": int(xpReward) if xpReward.isdigit() else 10,
                "transcription": transcription
            }
        
        return result
        
    except Exception as e:
        # Return fallback response on error
        return {
            "isCorrect": True,
            "feedback": "Evaluation completed. Please try again if issues persist.",
            "xpAwarded": int(xpReward) if xpReward.isdigit() else 10,
            "error": str(e)
        }
    finally:
        # Clean up temporary file
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.unlink(tmp_path)
            except:
                pass
   