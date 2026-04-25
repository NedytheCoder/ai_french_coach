from fastapi import APIRouter
import sqlite3
import os

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

