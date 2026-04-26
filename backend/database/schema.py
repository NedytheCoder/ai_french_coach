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
    xp_reward INTEGER NOT NULL,
    sort_order INTEGER NOT NULL
);

INSERT INTO reading_placement_tests
(level_id, passage, question, options_json, answer, instructions, xp_reward, sort_order)
VALUES
(
'A0',
'Bonjour',
'What does "Bonjour" mean?',
'["Goodbye", "Hello", "Please"]',
'1',
'Read carefully before selecting your answer',
'10',
'1'
),
(
'A0',
'Café',
'What does "Café" mean?',
'["Coffee", "Car", "House"]',
'0',
'Read carefully before selecting your answer',
'10',
'2'
),
(
'A1',
'Marie habite à Lyon.',
'Où habite Marie?',
'["Lyon", "Paris", "Rome"]',
'0',
'Read carefully before selecting your answer',
'15',
'3'
),
(
'A1',
'Paul a 25 ans.',
'Quel âge a Paul?',
'["20 ans", "25 ans", "30 ans"]',
'1',
'Read carefully before selecting your answer',
'15',
'4'
),
(
'A2',
'Sophie travaille dans un café. Elle commence à 8h et finit à 16h. Elle aime parler avec les clients.',
'Pourquoi Sophie aime-t-elle son travail?',
'["Parce qu''elle gagne beaucoup d''argent", "Parce qu''elle parle avec les clients", "Parce qu''elle travaille peu"]',
'1',
'Read carefully before selecting your answer',
'20',
'5'
),
(
'A2',
'King travaille dans une bibliotheque. Il finit à 16h.',
'À quelle heure il finit?',
'["8h", "12h", "16h"]',
'2',
'Read carefully before selecting your answer',
'20',
'6'
),
(
'B1',
'Beaucoup de gens préfèrent vivre en ville parce qu''il y a plus d''activités et d''emplois disponibles.',
'Pourquoi les gens préfèrent la vie en ville?',
'["Parce que c''est calme", "Parce qu''il y a plus d''opportunités", "Parce que c''est moins cher"]',
'1',
'Read carefully before selecting your answer',
'25',
'7'
),
(
'B2',
'Les réseaux sociaux nous permettent de communiquer rapidement, mais ils peuvent aussi créer une dépendance et propager des informations non fiables.',
'Pourquoi devrions-nous faire attention aux réseaux sociaux?',
'["Parce qu''ils sont toujours dangereux", "Parce qu''ils sont seulement utiles", "Parce qu''ils ont des effets positifs et négatifs"]',
'2',
'Read carefully before selecting your answer',
'30',
'8'
),
(
'C1',
'Bien que la proposition ait d''abord semblé prometteuse, une analyse plus approfondie a révélé plusieurs failles sous-jacentes qui pourraient compromettre sa viabilité à long terme.',
'Quel est l''idée principale du passage?',
'["La proposition a été un succès global", "La proposition semblait bonne mais avait de graves problèmes cachés", "La proposition a été rejetée immédiatement"]',
'1',
'Read carefully before selecting your answer',
'35',
'9'
),
(
'C2',
'Dans une ère où l''information est à la fois abondante et instantanée, le défi ne réside plus dans l''accès, mais dans la discernement de la crédibilité et de la pertinence, une compétence qui reste inégalement répartie à travers les populations.',
'Quel est l''implication de l''auteur?',
'["Les gens ont du mal à accéder à l''information", "Le principal défi aujourd''hui est d''évaluer la qualité de l''information", "L''information devient de moins en moins disponible"]',
'1',
'Read carefully before selecting your answer',
'40',
'10'
);

-- Listening Questions
CREATE TABLE IF NOT EXISTS listening_placement_tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level_id TEXT NOT NULL,
    audio_path TEXT NOT NULL,
    question TEXT NOT NULL,
    options_json TEXT NOT NULL,
    answer TEXT NOT NULL,
    transcription TEXT NOT NULL,
    instructions TEXT NOT NULL,
    xp_reward INTEGER NOT NULL,
    sort_order INTEGER NOT NULL
);

INSERT INTO listening_placement_tests
(level_id, audio_path, question, options_json, answer, transcription,instructions, xp_reward, sort_order)
VALUES
(
'A0',
'reception/audios/question1.mp3',
'What did you hear?',
'["Au revoir", "Bonjour", "Merci"]',
'1',
'Bonjour.',
'Listen carefully and select the correct answer',
'10',
'1'
),
(
'A0',
'reception/audios/question2.mp3',
'What did you hear?',
'["S''il vous plaît", "Désolé", "Merci"]',
'2',
'Merci.',
'Listen carefully and select the correct answer',
'10',
'2'
),
(
'A1',
'reception/audios/question3.mp3',
'Comment s''appelle la personne?',
'["Paul", "Marie", "Sophie"]',
'1',
'Salut, mon ami. Je m''appelle Marie. Enchanté.',
'Listen carefully and select the correct answer',
'15',
'3'
),
(
'A1',
'reception/audios/question4.mp3',
'Où habite la personne?',
'["Lyon", "Marseille", "Paris"]',
'2',
'Bonjour. Je suis Laurent et j''habite à Paris.',
'Listen carefully and select the correct answer',
'15',
'4'
),
(
'A2',
'reception/audios/question5.mp3',
'Pourquoi la personne aime son travail ?',
'["Parce qu''elle gagne beaucoup d''argent", "Parce qu''elle parle avec les clients", "Parce qu''elle travaille peu"]',
'1',
'Je travaille dans un hôpital. Je parle avec les patients tous les jours. Ils racontent leurs histoires et leurs expériences. Je trouve cela très intéressant. J’aime écouter et aider les gens dans mon travail.',
'Listen carefully and select the correct answer',
'20',
'5'
),
(
'A2',
'reception/audios/question6.mp3',
'À quelle heure finit-il?',
'["8h", "12h", "16h"]',
'2',
'Je travaille dans un bureau en ville. Je commence le matin à neuf heures. Je parle avec des clients et je réponds à leurs questions. J’aime bien mon travail parce que c’est intéressant. Je travaille toute la journée et je finis à 16 heures.',
'Listen carefully and select the correct answer',
'20',
'6'
),
(
'B1',
'reception/audios/question7.mp3',
'Pourquoi les gens préfèrent la vie en ville?',
'["Parce que c''est calme", "Parce qu''il y a plus d''opportunités", "Parce que c''est moins cher"]',
'1',
'Je préfère vivre en ville. J’aime sortir après le travail, aller au cinéma ou retrouver mes amis dans un café. Le week-end, je peux visiter des musées ou me promener dans différents quartiers. Il y a toujours quelque chose à faire, donc je ne m’ennuie jamais.

Pour moi, c’est aussi plus pratique pour le travail. Il y a beaucoup d’entreprises et je peux facilement trouver un emploi ou changer de poste si je le souhaite. Les transports sont bien organisés, alors je peux me déplacer sans problème.

La vie est plus rapide et plus animée, et c’est exactement ce que j’aime.',
'Listen carefully and select the correct answer',
'25',
'7'
),
(
'B2',
'reception/audios/question8.mp3',
'Pourquoi devrions-nous faire attention aux réseaux sociaux?',
'["Parce qu''ils sont toujours dangereux", "Parce qu''ils sont seulement utiles", "Parce qu''ils ont des effets positifs et négatifs"]',
'2',
'Les réseaux sociaux nous permettent de communiquer facilement avec les autres, même à distance. On peut partager des photos, donner son avis et rester en contact avec ses proches sans difficulté. Ils font maintenant partie de notre vie quotidienne, que ce soit pour le travail ou pour les loisirs.

Cependant, ils peuvent aussi créer une certaine dépendance, car on a tendance à les consulter très souvent, parfois sans vraiment s’en rendre compte. Cela peut prendre beaucoup de temps et réduire notre concentration sur d’autres activités.

En plus, toutes les informations qui circulent ne sont pas forcément exactes. Il est parfois difficile de vérifier les sources, et certaines informations peuvent se diffuser rapidement sans être confirmées. C’est pour cela qu’il est important de faire attention à ce que l’on lit et de garder un esprit critique lorsqu’on utilise les réseaux sociaux.',
'Listen carefully and select the correct answer',
'30',
'8'
),
(
'C1',
'reception/audios/question9.mp3',
'Quel est l''idée principale du passage?',
'["La proposition a été un succès global", "La proposition semblait bonne mais avait de graves problèmes cachés", "La proposition a été rejetée immédiatement"]',
'1',
'Au départ, la proposition se présentait de manière structurée, avec des objectifs bien définis et des pistes de solution apparemment adaptées aux enjeux identifiés. Dans un premier temps, rien ne laissait vraiment présager de difficultés particulières quant à sa mise en œuvre.

Cependant, à mesure que l’analyse s’est approfondie, certains éléments ont commencé à soulever des interrogations. Plusieurs failles sous-jacentes sont apparues, notamment des incohérences internes ainsi que des hypothèses qui reposaient sur des bases relativement fragiles.

De plus, certaines contraintes n’avaient pas été pleinement intégrées dans la réflexion initiale, ce qui risque de compliquer sa mise en application. À plus long terme, ces limites pourraient affecter l’équilibre général du projet et en réduire la portée.

Ainsi, malgré un cadre initial apparemment solide, il semble indispensable de procéder à une réévaluation approfondie afin d’envisager une mise en œuvre réellement viable et durable.',
'Listen carefully and select the correct answer',
'35',
'9'
),
(
'C2',
'reception/audios/question10.mp3',
'Quel est l''implication de l''auteur?',
'["Les gens ont du mal à accéder à l''information", "Le principal défi aujourd''hui est d''évaluer la qualité de l''information", "L''information devient de moins en moins disponible"]',
'1',
'Aujourd’hui, nous évoluons dans un environnement où les contenus circulent sans interruption, se renouvellent à un rythme soutenu et s’imposent dans notre quotidien avec une facilité déconcertante. Cette profusion constante donne parfois l’illusion d’une parfaite maîtrise, comme si le simple fait d’être exposé à une multitude de sources suffisait à garantir une bonne compréhension du monde qui nous entoure.

Pourtant, à y regarder de plus près, tout ne se vaut pas. Entre les discours approximatifs, les interprétations biaisées et les informations sorties de leur contexte, il devient nécessaire d’opérer des distinctions de plus en plus fines. Cela suppose non seulement de prendre du recul, mais aussi de mobiliser des repères solides pour éviter de se laisser entraîner par ce qui paraît immédiatement plausible ou séduisant.

Or, cette aptitude à naviguer avec discernement dans un tel flux ne s’acquiert pas de manière uniforme. Elle dépend largement des parcours individuels, des habitudes intellectuelles et des cadres dans lesquels chacun évolue. Certains développent plus aisément des réflexes d’analyse et de mise à distance, tandis que d’autres restent davantage exposés aux effets de saturation ou de confusion.

Dans ce contexte, l’enjeu ne réside plus tant dans la possibilité d’accéder à des contenus variés que dans la manière de les appréhender, de les hiérarchiser et d’en saisir les implications. Autrement dit, il s’agit moins de recevoir que de comprendre — et surtout, de savoir sur quoi accorder sa confiance.',
'Listen carefully and select the correct answer',
'40',
'10'
);

-- Writing Questions
CREATE TABLE IF NOT EXISTS writing_placement_tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level_id TEXT NOT NULL,
    question TEXT NOT NULL,
    question_text TEXT NOT NULL,
    placeholder TEXT NOT NULL,
    guide_json TEXT NOT NULL,
    word_count INTEGER NOT NULL,
    xp_reward INTEGER NOT NULL,
    sort_order INTEGER NOT NULL
);

INSERT INTO writing_placement_tests
(level_id, question, question_text, placeholder, guide_json, word_count, xp_reward, sort_order)
VALUES
(
'A0',
'What does "Hello/Good morning" mean?',
'Hello/Good morning',
'Type your answer here',
'["Think of the word carefully", "Check your spelling"]',
'1',
'10',
'1'
),
(
'A0',
'Fill in the blank',
'Je m''appelle _____. J''ai ____ ans. J''habite à _____.',
'Name, age, city',
'["Think about the structure of the sentence", "Check your spelling"]',
'3',
'10',
'2'
),
(
'A1',
'Remplacez les blancs par les mots appropriés',
'Nom : .......................................
Prénom : .....................................
Nationalité : .....................................
Adresse personnelle : .....................................
Profession : .....................................
Date d’arrivée à l’hôtel : .....................................
Profession : .....................................
Date d’arrivée à l’hôtel : .....................................
Date de départ : .....................................
Langue parlée : .....................................
Avez-vous un animal ? .....................................',
'Nom, Prénom, Nationalité, ...',
'["No need to form sentences. Simply write the missing words all seperated with a comma"]',
'11',
'15',
'3'
),
(
'A1',
'Écrivez une phrase courte en vous décrivant',
'Dites-nous votre nom, votre âge, où vous vivez et ce que vous aimez faire',
'Je m''appelle [votre nom]. J''ai ...',
'["Talk about yourself", "Write complete sentences"]',
'15',
'15',
'4'
),
(
'A2',
'Parlez de votre quotidien',
'Parlez de votre routine quotidienne: le matin, le travail, le soir.',
'Je me réveille à ... Je prends ... Je vais au travail à ...',
'["Talk about your daily routine", "Use correct grammar"]',
'20',
'20',
'5'
),
(
'A2',
'Écrivez des phrases courtes sur votre dernier voyage',
'Decrivez où vous êtes allé, ce que vous avez fait et comment vous vous êtes senti.',
'Je suis allé à ... J''ai ... J''ai ...',
'["Write about you last travel", "Use correct grammar"]',
'20',
'20',
'6'
),
(
'B1',
'Écrivez un email à un ami:',
'Demandez comment il va et partagez vos nouvelles.',
'Tapez ici...',
'["Utilisez le grammaire B1"]',
'25',
'25',
'7'
),
(
'B2',
'Écrivez un court paragraphe sur un livre que vous avez lu:',
'Décrivez l''intrigue, les personnages et votre opinion.',
'Tapez ici...',
'["Utilisez le grammaire B2"]',
'30',
'30',
'8'
),
(
'C1',
'Essai de problème-solution',
'Beaucoup de villes sont confrontées à une congestion routière croissante.
Quels sont les causes principaux de ce problème et quelles solutions peuvent être proposées?',
'Tapez ici...',
'["Utilisez le grammaire C1", "incluez des exemples spécifiques"]',
'35',
'35',
'9'
),
(
'C2',
'Analysez et discutez de cette idée avec des exemples:',
'La liberté n''est pas l''absence de contraintes, mais la capacité de les choisir',
'Tapez ici...',
'["Discutez de l''idée", "Donnez des exemples", "Utilisez le grammaire C2"]',
'40',
'40',
'10'
);
"""
# Daily routine for a1 instead
def get_schema_sql() -> str:
    """
    Return the complete schema SQL as a single string.
    Includes both core tables and lesson content tables.

    Returns:
        str: SQL statements to create all tables and indexes.
    """
    return SCHEMA_SQL