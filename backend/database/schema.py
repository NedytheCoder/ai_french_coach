"""
Database schema definitions.

Contains all CREATE TABLE statements for initializing the database.
Add new tables here as the application grows.
"""

# SQL statements to create the initial database schema (core tables)
SCHEMA_SQL = """
-- Users table: stores basic user account information
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster email lookups (useful for login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Levels (A0, A1, A2, B1, ...)
CREATE TABLE IF NOT EXISTS levels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL
);

-- Lessons/modules
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level_id INTEGER NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
    lesson_key TEXT NOT NULL UNIQUE,
    lesson_slug TEXT NOT NULL,
    lesson_number INTEGER,
    title TEXT NOT NULL,
    subtitle TEXT,
    objective TEXT,
    description TEXT,
    sort_order INTEGER NOT NULL,
    next_lesson_key TEXT,
    source_path TEXT NOT NULL,
    source_hash TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lessons_level_id ON lessons(level_id);
CREATE INDEX IF NOT EXISTS idx_lessons_level_sort ON lessons(level_id, sort_order);

-- Generic lesson sections (queryable + json content for flexibility)
CREATE TABLE IF NOT EXISTS lesson_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    section_key TEXT NOT NULL,
    section_title TEXT,
    section_type TEXT NOT NULL,
    content TEXT,
    extra_data_json TEXT,
    sort_order INTEGER NOT NULL,
    UNIQUE(lesson_id, section_key)
);

CREATE INDEX IF NOT EXISTS idx_lesson_sections_lesson ON lesson_sections(lesson_id, sort_order);

-- Flattened examples extracted from section arrays/objects
CREATE TABLE IF NOT EXISTS lesson_examples (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    section_key TEXT,
    french_text TEXT,
    english_text TEXT,
    extra_data_json TEXT,
    sort_order INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_lesson_examples_lesson ON lesson_examples(lesson_id, sort_order);

-- Practice questions
CREATE TABLE IF NOT EXISTS practice_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    topic TEXT,
    prompt TEXT NOT NULL,
    question_type TEXT,
    options_json TEXT,
    correct_answer TEXT,
    explanation TEXT,
    difficulty TEXT,
    metadata_json TEXT,
    sort_order INTEGER NOT NULL,
    UNIQUE(lesson_id, question_number)
);

CREATE INDEX IF NOT EXISTS idx_practice_questions_lesson ON practice_questions(lesson_id, sort_order);

-- Score-band feedback messages (parsed from getPerformanceMessage/getResultMessage)
CREATE TABLE IF NOT EXISTS lesson_result_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    score_band TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    extra_data_json TEXT,
    sort_order INTEGER NOT NULL,
    UNIQUE(lesson_id, score_band, title)
);

CREATE INDEX IF NOT EXISTS idx_result_messages_lesson ON lesson_result_messages(lesson_id, sort_order);
"""

def get_schema_sql() -> str:
    """
    Return the complete schema SQL as a single string.
    Includes both core tables and lesson content tables.

    Returns:
        str: SQL statements to create all tables and indexes.
    """
    return SCHEMA_SQL