"""
Database schema definitions.

Contains all CREATE TABLE statements for initializing the database.
Add new tables here as the application grows.
"""

# SQL statements to create the initial database schema (core tables)
SCHEMA_SQL = """
-- Levels (A0, A1, A2, B1, ...)
CREATE TABLE IF NOT EXISTS levels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL
);

-- Data for the Levels above
INSERT INTO levels (code, title, description, sort_order) VALUES
('A0', 'Absolute Beginner', 'Start from zero. Learn basic sounds, letters, and simple words.', 1),
('A1', 'Beginner Foundation', 'Understand and use familiar everyday expressions and simple phrases.', 2),
('A2', 'Elementary', 'Communicate in simple and routine tasks requiring direct information exchange.', 3),
('B1', 'Intermediate', 'Handle most situations while traveling and produce simple connected text.', 4),
('B2', 'Upper Intermediate', 'Interact with fluency and spontaneity, express ideas clearly.', 5),
('C1', 'Advanced', 'Use language flexibly and effectively for social, academic, and professional purposes.', 6),
('C2', 'Mastery', 'Understand virtually everything heard or read and express yourself precisely.', 7);

-- Creating the reception table
CREATE TABLE IF NOT EXISTS reception (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT,
    xp INTEGER,
    FOREIGN KEY (level_id) REFERENCES levels(id)
);

-- Populating the reception with data
INSERT INTO reception (level_id, title, description, difficulty, xp)
SELECT id, 'Novice', 'Complete beginner starting from zero', 'Easy', 100 FROM levels WHERE code = 'A0'
UNION ALL
SELECT id, 'Beginner', 'Basic words and simple phrases', 'Easy', 150 FROM levels WHERE code = 'A1'
UNION ALL
SELECT id, 'Elementary', 'Everyday conversations and sentences', 'Medium', 200 FROM levels WHERE code = 'A2'
UNION ALL
SELECT id, 'Intermediate', 'Clear standard French and opinions', 'Medium', 300 FROM levels WHERE code = 'B1'
UNION ALL
SELECT id, 'Upper Intermediate', 'Complex text and detailed discussions', 'Hard', 400 FROM levels WHERE code = 'B2'
UNION ALL
SELECT id, 'Advanced', 'Fluent and flexible use for social & professional contexts', 'Hard', 500 FROM levels WHERE code = 'C1'
UNION ALL
SELECT id, 'Mastery', 'Effortless and precise expression like a native', 'Hard', 600 FROM levels WHERE code = 'C2';

-- Reception test types
CREATE TABLE IF NOT EXISTS placement_test_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    sort_order INTEGER NOT NULL
);

-- Data for placement test types
INSERT INTO placement_test_types (code, title, sort_order) VALUES
('reading', 'Reading', 1),
('listening', 'Listening', 2),
('writing', 'Writing', 3),
('speaking', 'Speaking', 4);

-- Placement test descriptions
CREATE TABLE IF NOT EXISTS placement_test_descriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_type_id INTEGER NOT NULL UNIQUE,
    description TEXT NOT NULL,
    min_questions INTEGER NOT NULL,
    max_questions INTEGER NOT NULL,
    min_minutes INTEGER NOT NULL,
    max_minutes INTEGER NOT NULL,
    FOREIGN KEY (test_type_id) REFERENCES placement_test_types(id),
    CHECK (min_questions <= max_questions),
    CHECK (min_minutes <= max_minutes)
);

-- Data for placement test descriptions
INSERT INTO placement_test_descriptions (test_type_id, description, min_questions, max_questions, min_minutes, max_minutes)
SELECT id, '["Understand written French texts", "Multiple choice/Comprehension"]', 10, 15, 5, 8
FROM placement_test_types WHERE code = 'reading'
UNION ALL
SELECT id, '["Understand spoken French", "Audio-based questions"]', 8, 12, 5, 7
FROM placement_test_types WHERE code = 'listening'
UNION ALL
SELECT id, '["Express your ideas in French", "Short written responses"]', 2, 3, 5, 10
FROM placement_test_types WHERE code = 'writing'
UNION ALL
SELECT id, '["Speak and respond in French", "Voice responses"]', 2, 3, 5, 10
FROM placement_test_types WHERE code = 'speaking';

-- Global answer feedback messages
CREATE TABLE IF NOT EXISTS immediate_question_feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feedback_type TEXT NOT NULL, -- correct or incorrect
    skill TEXT NOT NULL,         -- reading, listening, writing, speaking
    messages_json TEXT NOT NULL,

    UNIQUE(feedback_type, skill)
);

INSERT INTO immediate_question_feedback
(feedback_type, skill, messages_json)
VALUES

-- =====================
-- READING
-- =====================
('correct', 'reading', '["Well read! 📖", "Sharp eyes! 👀", "You got the meaning! 💡", "Spot on! 🎯"]'),
('incorrect', 'reading', '["Look carefully! 👀", "Read it again! 🔁", "Check the words! 📝", "Focus on the text! 📖"]'),

-- =====================
-- LISTENING
-- =====================
('correct', 'listening', '["Well heard! 🎧", "Nice catch! 👂", "You picked that up! 🔊", "Clear listening! 👌"]'),
('incorrect', 'listening', '["Listen again! 🎧", "Catch the sound! 🔊", "Focus your ears! 👂", "Try that again! 🔁"]'),

-- =====================
-- WRITING
-- =====================
('correct', 'writing', '["Well written! ✍️", "Nice structure! 🧱", "Clean sentence! ✅", "Great writing! ✨"]'),
('incorrect', 'writing', '["Check your writing! ✍️", "Fix the structure! 🧱", "Watch your spelling! 🔍", "Try again! 🔁"]'),

-- =====================
-- SPEAKING
-- =====================
('correct', 'speaking', '["Well said! 🗣️", "Nice pronunciation! 🔊", "That sounded great! 🎤", "Smooth speaking! 😏"]'),
('incorrect', 'speaking', '["Say it again! 🗣️", "Focus on pronunciation! 🔊", "Slow it down! ⏳", "Try that again! 🔁"]');

-- Reading Questions
CREATE TABLE IF NOT EXISTS reading_placement_tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level_id TEXT NOT NULL,
    passage TEXT NOT NULL,
    question TEXT NOT NULL,
    options_json TEXT NOT NULL,
    answer TEXT NOT NULL,
    instructions TEXT NOT NULL,
    sort_order INTEGER NOT NULL
);

INSERT INTO reading_placement_tests
(level_id, passage, question, options_json, answer, instructions, sort_order)
VALUES
(
'A0',
'Bonjour',
'What does "Bonjour" mean?',
'["Goodbye", "Hello", "Please"]',
'1',
'Read carefully before selecting your answer',
'1'
),
(
'A0',
'Café',
'What does "Café" mean?',
'["Coffee", "Car", "House"]',
'0',
'Read carefully before selecting your answer',
'2'
),
(
'A1',
'Marie habite à Lyon.',
'Où habite Marie?',
'["Lyon", "Paris", "Rome"]',
'0',
'Read carefully before selecting your answer',
'3'
),
(
'A1',
'Paul a 25 ans.',
'Quel âge a Paul?',
'["20 ans", "25 ans", "30 ans"]',
'1',
'Read carefully before selecting your answer',
'4'
),
(
'A2',
'Sophie travaille dans un café. Elle commence à 8h et finit à 16h. Elle aime parler avec les clients.',
'Pourquoi Sophie aime-t-elle son travail?',
'["Parce qu''elle gagne beaucoup d''argent", "Parce qu''elle parle avec les clients", "Parce qu''elle travaille peu"]',
'1',
'Read carefully before selecting your answer',
'5'
),
(
'A2',
'King travaille dans une bibliotheque. Il finit à 16h.',
'À quelle heure il finit?',
'["8h", "12h", "16h"]',
'2',
'Read carefully before selecting your answer',
'6'
),
(
'B1',
'Beaucoup de gens préfèrent vivre en ville parce qu''il y a plus d''activités et d''emplois disponibles.',
'Pourquoi les gens préfèrent la vie en ville?',
'["Parce que c''est calme", "Parce qu''il y a plus d''opportunités", "Parce que c''est moins cher"]',
'1',
'Read carefully before selecting your answer',
'7'
),
(
'B2',
'Les réseaux sociaux nous permettent de communiquer rapidement, mais ils peuvent aussi créer une dépendance et propager des informations non fiables.',
'Pourquoi devrions-nous faire attention aux réseaux sociaux?',
'["Parce qu''ils sont toujours dangereux", "Parce qu''ils sont seulement utiles", "Parce qu''ils ont des effets positifs et négatifs"]',
'2',
'Read carefully before selecting your answer',
'8'
),
(
'C1',
'Bien que la proposition ait d''abord semblé prometteuse, une analyse plus approfondie a révélé plusieurs failles sous-jacentes qui pourraient compromettre sa viabilité à long terme.',
'Quel est l''idée principale du passage?',
'["La proposition a été un succès global", "La proposition semblait bonne mais avait de graves problèmes cachés", "La proposition a été rejetée immédiatement"]',
'1',
'Read carefully before selecting your answer',
'9'
),
(
'C2',
'Dans une ère où l''information est à la fois abondante et instantanée, le défi ne réside plus dans l''accès, mais dans la discernement de la crédibilité et de la pertinence, une compétence qui reste inégalement répartie à travers les populations.',
'Quel est l''implication de l''auteur?',
'["Les gens ont du mal à accéder à l''information", "Le principal défi aujourd''hui est d''évaluer la qualité de l''information", "L''information devient de moins en moins disponible"]',
'1',
'Read carefully before selecting your answer',
'10'
);

pirhg[orj]hbq9erpjg
orkg[rgp
orjkf[k
peeeeeppppppppppppppppppp]] CHECK HERE OUT TOMORROW!
-- Result Card
CREATE TABLE IF NOT EXISTS placement_result_card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score TEXT NOT NULL,
    feedback TEXT NOT NULL,
    xp_reward INTEGER NOT NULL,

    UNIQUE(score)
);
"""

def get_schema_sql() -> str:
    """
    Return the complete schema SQL as a single string.
    Includes both core tables and lesson content tables.

    Returns:
        str: SQL statements to create all tables and indexes.
    """
    return SCHEMA_SQL