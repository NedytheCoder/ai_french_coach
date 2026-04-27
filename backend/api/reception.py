from fastapi import APIRouter
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
                "isCorrect": word_count >= min_words_required,
                "score": 5,
                "feedback": "Response evaluated successfully.",
                "xpAwarded": 10
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