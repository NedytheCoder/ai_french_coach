"""
Database schema definitions.

Contains all CREATE TABLE statements for the language-pair-agnostic schema.
Never modify existing CREATE TABLE statements — add new tables as numbered
migration files in backend/database/migrations/ instead.
"""

SCHEMA_SQL = """
-- Migration tracking: one row per applied migration
CREATE TABLE IF NOT EXISTS schema_migrations (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    version    TEXT    NOT NULL UNIQUE,
    applied_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Registry of all languages the platform supports.
-- Adding a new language requires only one INSERT here.
CREATE TABLE IF NOT EXISTS languages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    code        TEXT    NOT NULL UNIQUE,
    name        TEXT    NOT NULL,
    native_name TEXT    NOT NULL,
    is_active   INTEGER NOT NULL DEFAULT 1,
    is_rtl      INTEGER NOT NULL DEFAULT 0
);

-- Authenticated platform users.
CREATE TABLE IF NOT EXISTS users (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    email              TEXT    NOT NULL UNIQUE,
    password_hash      TEXT    NOT NULL,
    display_name       TEXT    NOT NULL,
    source_language_id INTEGER NOT NULL REFERENCES languages(id),
    created_at         TEXT    NOT NULL DEFAULT (datetime('now')),
    last_seen_at       TEXT
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Issued refresh tokens for server-side revocation.
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash  TEXT    NOT NULL UNIQUE,
    issued_at   TEXT    NOT NULL DEFAULT (datetime('now')),
    expires_at  TEXT    NOT NULL,
    revoked     INTEGER NOT NULL DEFAULT 0
);

-- The central learning context. Every learning record is scoped to a pair.
CREATE TABLE IF NOT EXISTS user_language_pairs (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id             INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    source_language_id  INTEGER NOT NULL REFERENCES languages(id),
    target_language_id  INTEGER NOT NULL REFERENCES languages(id),
    current_level       TEXT    NOT NULL DEFAULT 'A0',
    total_xp            INTEGER NOT NULL DEFAULT 0,
    streak_days         INTEGER NOT NULL DEFAULT 0,
    longest_streak      INTEGER NOT NULL DEFAULT 0,
    last_activity_date  TEXT,
    created_at          TEXT    NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, target_language_id),
    CHECK(source_language_id != target_language_id)
);
CREATE INDEX IF NOT EXISTS idx_pairs_user ON user_language_pairs(user_id);

-- Structured lesson records; content is AI-generated JSON.
CREATE TABLE IF NOT EXISTS lessons (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    pair_id      INTEGER NOT NULL REFERENCES user_language_pairs(id) ON DELETE CASCADE,
    level        TEXT    NOT NULL,
    lesson_type  TEXT    NOT NULL,
    title        TEXT    NOT NULL,
    topic        TEXT,
    content_json TEXT    NOT NULL,
    xp_reward    INTEGER NOT NULL,
    is_completed INTEGER NOT NULL DEFAULT 0,
    score        INTEGER,
    max_score    INTEGER,
    completed_at TEXT,
    created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_lessons_pair  ON lessons(pair_id);
CREATE INDEX IF NOT EXISTS idx_lessons_level ON lessons(pair_id, level);

-- Groups messages into a session with a mode and context.
CREATE TABLE IF NOT EXISTS conversation_sessions (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    pair_id          INTEGER NOT NULL REFERENCES user_language_pairs(id) ON DELETE CASCADE,
    mode             TEXT    NOT NULL DEFAULT 'general',
    message_count    INTEGER NOT NULL DEFAULT 0,
    created_at       TEXT    NOT NULL DEFAULT (datetime('now')),
    last_message_at  TEXT
);
CREATE INDEX IF NOT EXISTS idx_sessions_pair ON conversation_sessions(pair_id);

-- Individual messages within a conversation session.
CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL REFERENCES conversation_sessions(id) ON DELETE CASCADE,
    role       TEXT    NOT NULL CHECK(role IN ('user', 'assistant')),
    content    TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id);

-- Daily XP and activity log; one row per pair per day.
CREATE TABLE IF NOT EXISTS progress_records (
    id                 INTEGER PRIMARY KEY AUTOINCREMENT,
    pair_id            INTEGER NOT NULL REFERENCES user_language_pairs(id) ON DELETE CASCADE,
    date               TEXT    NOT NULL,
    xp_earned          INTEGER NOT NULL DEFAULT 0,
    lessons_completed  INTEGER NOT NULL DEFAULT 0,
    messages_sent      INTEGER NOT NULL DEFAULT 0,
    UNIQUE(pair_id, date)
);
CREATE INDEX IF NOT EXISTS idx_progress_pair_date ON progress_records(pair_id, date);

-- Words and phrases the learner has encountered, with spaced repetition state.
CREATE TABLE IF NOT EXISTS vocabulary_items (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    pair_id             INTEGER NOT NULL REFERENCES user_language_pairs(id) ON DELETE CASCADE,
    target_word         TEXT    NOT NULL,
    source_translation  TEXT    NOT NULL,
    context_sentence    TEXT,
    difficulty_score    REAL    NOT NULL DEFAULT 0.5,
    times_seen          INTEGER NOT NULL DEFAULT 0,
    times_correct       INTEGER NOT NULL DEFAULT 0,
    last_seen_at        TEXT,
    next_review_at      TEXT,
    created_at          TEXT    NOT NULL DEFAULT (datetime('now')),
    UNIQUE(pair_id, target_word)
);
CREATE INDEX IF NOT EXISTS idx_vocab_pair   ON vocabulary_items(pair_id);
CREATE INDEX IF NOT EXISTS idx_vocab_review ON vocabulary_items(pair_id, next_review_at);

-- Assessment sessions tracking placement or progress evaluations.
CREATE TABLE IF NOT EXISTS assessments (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    pair_id           INTEGER NOT NULL REFERENCES user_language_pairs(id) ON DELETE CASCADE,
    assessment_type   TEXT    NOT NULL,
    skills_json       TEXT    NOT NULL,
    status            TEXT    NOT NULL DEFAULT 'pending',
    result_level      TEXT,
    skill_levels_json TEXT,
    total_xp_awarded  INTEGER,
    completed_at      TEXT,
    created_at        TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Individual answers within an assessment.
CREATE TABLE IF NOT EXISTS assessment_answers (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    assessment_id  INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    question_id    TEXT    NOT NULL,
    skill          TEXT    NOT NULL,
    level          TEXT    NOT NULL,
    user_answer    TEXT    NOT NULL,
    is_correct     INTEGER,
    xp_awarded     INTEGER NOT NULL DEFAULT 0,
    feedback       TEXT,
    created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_answers_assessment ON assessment_answers(assessment_id);
"""

LANGUAGES_SEED_SQL = """
INSERT OR IGNORE INTO languages (code, name, native_name, is_rtl) VALUES
('en', 'English',    'English',    0),
('fr', 'French',     'Français',   0),
('de', 'German',     'Deutsch',    0),
('es', 'Spanish',    'Español',    0),
('pt', 'Portuguese', 'Português',  0),
('it', 'Italian',    'Italiano',   0),
('nl', 'Dutch',      'Nederlands', 0),
('ja', 'Japanese',   '日本語',      0),
('ko', 'Korean',     '한국어',      0),
('ar', 'Arabic',     'العربية',    1),
('yo', 'Yoruba',     'Yorùbá',     0),
('zh', 'Chinese',    '中文',        0);
"""


def get_schema_sql() -> str:
    return SCHEMA_SQL


def get_languages_seed_sql() -> str:
    return LANGUAGES_SEED_SQL
