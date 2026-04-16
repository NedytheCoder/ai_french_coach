import sqlite3
from pathlib import Path

DB_PATH = Path("mvp_language_app.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn


def create_tables(conn):
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        cefr_level TEXT NOT NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS units (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER NOT NULL,
        unit_number INTEGER NOT NULL,
        title TEXT NOT NULL,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE(course_id, unit_number)
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS lessons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        unit_id INTEGER NOT NULL,
        lesson_number INTEGER NOT NULL,
        title TEXT NOT NULL,
        lesson_type TEXT NOT NULL,
        content TEXT,
        FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE,
        UNIQUE(unit_id, lesson_number)
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lesson_id INTEGER NOT NULL,
        question_order INTEGER NOT NULL,
        question_type TEXT NOT NULL,
        prompt TEXT NOT NULL,
        correct_answer TEXT,
        explanation TEXT,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
        UNIQUE(lesson_id, question_order)
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS answer_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        option_text TEXT NOT NULL,
        is_correct INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        lesson_id INTEGER NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0,
        score REAL DEFAULT 0,
        last_question_index INTEGER DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
        UNIQUE(user_id, lesson_id)
    );
    """)

    conn.commit()


def seed_dummy_data(conn):
    cursor = conn.cursor()

    cursor.execute(
        "INSERT OR IGNORE INTO courses (code, title, cefr_level) VALUES (?, ?, ?)",
        ("french-a1", "French A1", "A1")
    )

    cursor.execute("SELECT id FROM courses WHERE code = ?", ("french-a1",))
    course_id = cursor.fetchone()[0]

    units = [
        (course_id, 1, "Introductions"),
        (course_id, 2, "Family"),
    ]
    cursor.executemany("""
        INSERT OR IGNORE INTO units (course_id, unit_number, title)
        VALUES (?, ?, ?)
    """, units)

    cursor.execute("""
        SELECT id FROM units
        WHERE course_id = ? AND unit_number = ?
    """, (course_id, 1))
    unit_1_id = cursor.fetchone()[0]

    lessons = [
        (unit_1_id, 1, "Saying Hello", "vocabulary", "Basic greetings in French"),
        (unit_1_id, 2, "Introducing Yourself", "grammar", "Je m'appelle..., Je suis...")
    ]
    cursor.executemany("""
        INSERT OR IGNORE INTO lessons (unit_id, lesson_number, title, lesson_type, content)
        VALUES (?, ?, ?, ?, ?)
    """, lessons)

    cursor.execute("""
        SELECT id FROM lessons
        WHERE unit_id = ? AND lesson_number = ?
    """, (unit_1_id, 1))
    lesson_1_id = cursor.fetchone()[0]

    questions = [
        (lesson_1_id, 1, "multiple_choice", "How do you say 'Hello' in French?", "Bonjour", "Bonjour means hello."),
        (lesson_1_id, 2, "fill_blank", "Complete: ___ means 'Good evening'", "Bonsoir", "Bonsoir is used in the evening.")
    ]
    cursor.executemany("""
        INSERT OR IGNORE INTO questions
        (lesson_id, question_order, question_type, prompt, correct_answer, explanation)
        VALUES (?, ?, ?, ?, ?, ?)
    """, questions)

    cursor.execute("""
        SELECT id FROM questions
        WHERE lesson_id = ? AND question_order = ?
    """, (lesson_1_id, 1))
    question_1_id = cursor.fetchone()[0]

    options = [
        (question_1_id, "Bonjour", 1),
        (question_1_id, "Merci", 0),
        (question_1_id, "Bonsoir", 0),
        (question_1_id, "Au revoir", 0),
    ]
    cursor.executemany("""
        INSERT INTO answer_options (question_id, option_text, is_correct)
        VALUES (?, ?, ?)
    """, options)

    cursor.execute("""
        INSERT OR IGNORE INTO user_progress
        (user_id, lesson_id, completed, score, last_question_index)
        VALUES (?, ?, ?, ?, ?)
    """, ("demo-user-1", lesson_1_id, 0, 0, 0))

    conn.commit()


def main():
    conn = get_connection()
    try:
        create_tables(conn)
        seed_dummy_data(conn)
        print(f"Database created successfully at: {DB_PATH.resolve()}")
    finally:
        conn.close()


if __name__ == "__main__":
    main()