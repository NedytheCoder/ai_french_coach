/**
 * A1 Lesson 3 - French Verbs and Present Tense Data
 * =================================================
 *
 * This file contains all lesson data for A1 Lesson 3 covering essential
 * French verbs and their present tense conjugations. The content includes:
 *
 * - 10 essential French verbs with audio pronunciations and example sentences
 *   • 3 core verbs (être, avoir, aller) marked as high importance
 *   • 7 regular -er verbs for everyday communication
 * - Complete present tense conjugation tables for all 10 verbs (6 forms each)
 * - Subject pronoun reference guide (je, tu, il/elle/on, nous, vous, ils/elles)
 * - 12 practice questions testing verb meanings, conjugations, and patterns
 *
 * Key Concepts:
 * - Regular -er verbs follow predictable conjugation patterns
 * - Irregular verbs (être, avoir, aller, faire) have unique forms
 * - Manger has a special nous form (mangeons) to preserve soft 'g' sound
 */

/**
 * Verb Interface
 * --------------
 * Represents a French verb with its infinitive form, translation,
 * pronunciation guide, example usage, and importance level.
 *
 * @property id - Unique identifier for the verb (used for audio lookup)
 * @property infinitive - The base form of the verb (e.g., "parler")
 * @property english - English translation(s)
 * @property phonetic - Phonetic pronunciation guide
 * @property audioSrc - Path to pronunciation audio file
 * @property example - Example sentence in French
 * @property exampleEnglish - Translation of example sentence
 * @property importance - 'high' for core verbs (être, avoir, aller), 'normal' for others
 */
export interface Verb {
  id: string
  infinitive: string
  english: string
  phonetic: string
  audioSrc: string
  example: string
  exampleEnglish: string
  importance: 'high' | 'normal'
}

// =============================================================================
// VERBS DATA
// =============================================================================

/**
 * verbs Array
 * -----------
 * Collection of 10 essential French verbs for A1 learners.
 *
 * Structure:
 * - First 3 verbs (être, avoir, aller): Core verbs marked as 'high' importance
 *   These are used constantly at all French levels and form foundation for many expressions
 * - Remaining 7 verbs: Regular -er verbs marked as 'normal' importance
 *   These follow predictable conjugation patterns
 *
 * Each verb includes:
 * - Infinitive form (dictionary form ending in -er, -ir, or -re)
 * - English translation with common meanings
 * - Phonetic guide for pronunciation
 * - Audio file path for listening practice
 * - Example sentence showing verb in context
 */
export const verbs: Verb[] = [
  // ---------------------------------------------------------------------------
  // CORE VERBS (High Importance) - Essential at all French levels
  // These verbs appear frequently in both beginner and advanced French
  // ---------------------------------------------------------------------------
  {
    id: "etre",
    infinitive: "être",
    english: "to be",
    phonetic: "eh-truh",
    audioSrc: "/audio/a1/verbs/etre.mp3",
    example: "Je suis étudiant.",
    exampleEnglish: "I am a student.",
    importance: "high"
  },
  {
    id: "avoir",
    infinitive: "avoir",
    english: "to have",
    phonetic: "ah-vwahr",
    audioSrc: "/audio/a1/verbs/avoir.mp3",
    example: "J'ai un livre.",
    exampleEnglish: "I have a book.",
    importance: "high"
  },
  {
    id: "aller",
    infinitive: "aller",
    english: "to go",
    phonetic: "ah-lay",
    audioSrc: "/audio/a1/verbs/aller.mp3",
    example: "Nous allons au marché.",
    exampleEnglish: "We are going to the market.",
    importance: "high"
  },

  // ---------------------------------------------------------------------------
  // REGULAR -ER VERBS (Normal Importance) - Follow predictable patterns
  // These verbs all end in -er and follow similar conjugation rules
  // ---------------------------------------------------------------------------
  {
    id: "parler",
    infinitive: "parler",
    english: "to speak",
    phonetic: "par-lay",
    audioSrc: "/audio/a1/verbs/parler.mp3",
    example: "Tu parles français.",
    exampleEnglish: "You speak French.",
    importance: "normal"
  },
  {
    id: "aimer",
    infinitive: "aimer",
    english: "to like / to love",
    phonetic: "eh-may",
    audioSrc: "/audio/a1/verbs/aimer.mp3",
    example: "Elle aime la musique.",
    exampleEnglish: "She likes music.",
    importance: "normal"
  },
  {
    id: "habiter",
    infinitive: "habiter",
    english: "to live",
    phonetic: "ah-bee-tay",
    audioSrc: "/audio/a1/verbs/habiter.mp3",
    example: "J'habite à Paris.",
    exampleEnglish: "I live in Paris.",
    importance: "normal"
  },
  {
    id: "manger",
    infinitive: "manger",
    english: "to eat",
    phonetic: "mahn-zhay",
    audioSrc: "/audio/a1/verbs/manger.mp3",
    example: "Nous mangeons à midi.",
    exampleEnglish: "We eat at noon.",
    importance: "normal"
    // Note: Special nous form "mangeons" keeps soft 'g' sound (vs "mangons")
  },
  {
    id: "travailler",
    infinitive: "travailler",
    english: "to work",
    phonetic: "trah-vai-yay",
    audioSrc: "/audio/a1/verbs/travailler.mp3",
    example: "Ils travaillent ici.",
    exampleEnglish: "They work here.",
    importance: "normal"
  },
  {
    id: "etudier",
    infinitive: "étudier",
    english: "to study",
    phonetic: "ay-tew-dee-ay",
    audioSrc: "/audio/a1/verbs/etudier.mp3",
    example: "Vous étudiez le français.",
    exampleEnglish: "You study French.",
    importance: "normal"
  },
  {
    id: "faire",
    infinitive: "faire",
    english: "to do / to make",
    phonetic: "fehr",
    audioSrc: "/audio/a1/verbs/faire.mp3",
    example: "Je fais mes devoirs.",
    exampleEnglish: "I do my homework.",
    importance: "normal"
    // Note: Faire is irregular despite ending in -re
  }
]

// =============================================================================
// CONJUGATION DATA
// =============================================================================

/**
 * Conjugation Interface
 * ---------------------
 * Represents the complete present tense conjugation of a French verb
 * across all 6 subject pronouns.
 *
 * @property verb - The infinitive form of the verb being conjugated
 * @property english - English translation of the infinitive
 * @property forms - Object containing conjugated forms for each subject pronoun:
 *   - je: First person singular (I)
 *   - tu: Second person singular informal (you)
 *   - ilElleOn: Third person singular (he/she/one)
 *   - nous: First person plural (we)
 *   - vous: Second person plural or formal (you all/you formal)
 *   - ilsElles: Third person plural (they)
 */
export interface Conjugation {
  verb: string
  english: string
  forms: {
    je: string
    tu: string
    ilElleOn: string
    nous: string
    vous: string
    ilsElles: string
  }
}

/**
 * conjugations Array
 * ------------------
 * Complete present tense conjugation tables for all 10 verbs.
 * Each entry shows how the verb changes for all 6 subject pronouns.
 *
 * Conjugation Patterns:
 * - Regular -er verbs: Follow pattern e, es, e, ons, ez, ent
 *   (parler → parle, parles, parle, parlons, parlez, parlent)
 * - Irregular verbs: Unique forms that must be memorized
 *   (être, avoir, aller, faire)
 * - Manger exception: nous mangeons (keeps soft 'g' sound)
 */
export const conjugations: Conjugation[] = [
  // ---------------------------------------------------------------------------
  // IRREGULAR VERBS - Core verbs with unique conjugation patterns
  // These must be memorized as they don't follow regular rules
  // ---------------------------------------------------------------------------
  {
    verb: "être",
    english: "to be",
    forms: {
      je: "suis",       // I am
      tu: "es",         // You are (informal)
      ilElleOn: "est",  // He/She/One is
      nous: "sommes",   // We are
      vous: "êtes",     // You are (plural/formal)
      ilsElles: "sont"  // They are
    }
  },
  {
    verb: "avoir",
    english: "to have",
    forms: {
      je: "ai",         // I have
      tu: "as",         // You have (informal)
      ilElleOn: "a",    // He/She/One has
      nous: "avons",    // We have
      vous: "avez",     // You have (plural/formal)
      ilsElles: "ont"   // They have
    }
  },
  {
    verb: "aller",
    english: "to go",
    forms: {
      je: "vais",       // I go
      tu: "vas",        // You go (informal)
      ilElleOn: "va",   // He/She/One goes
      nous: "allons",   // We go
      vous: "allez",    // You go (plural/formal)
      ilsElles: "vont"  // They go
    }
  },

  // ---------------------------------------------------------------------------
  // REGULAR -ER VERBS - Follow predictable conjugation patterns
  // Pattern: Remove -er, add endings e, es, e, ons, ez, ent
  // ---------------------------------------------------------------------------
  {
    verb: "parler",
    english: "to speak",
    forms: {
      je: "parle",
      tu: "parles",
      ilElleOn: "parle",
      nous: "parlons",
      vous: "parlez",
      ilsElles: "parlent"
    }
  },
  {
    verb: "aimer",
    english: "to like / love",
    forms: {
      je: "aime",
      tu: "aimes",
      ilElleOn: "aime",
      nous: "aimons",
      vous: "aimez",
      ilsElles: "aiment"
    }
  },
  {
    verb: "habiter",
    english: "to live",
    forms: {
      je: "habite",
      tu: "habites",
      ilElleOn: "habite",
      nous: "habitons",
      vous: "habitez",
      ilsElles: "habitent"
    }
  },
  {
    verb: "manger",
    english: "to eat",
    forms: {
      je: "mange",
      tu: "manges",
      ilElleOn: "mange",
      nous: "mangeons",  // Special form: adds 'e' to keep soft 'g' sound (zh)
      vous: "mangez",
      ilsElles: "mangent"
    }
  },
  {
    verb: "travailler",
    english: "to work",
    forms: {
      je: "travaille",
      tu: "travailles",
      ilElleOn: "travaille",
      nous: "travaillons",
      vous: "travaillez",
      ilsElles: "travaillent"
    }
  },
  {
    verb: "étudier",
    english: "to study",
    forms: {
      je: "étudie",
      tu: "étudies",
      ilElleOn: "étudie",
      nous: "étudions",
      vous: "étudiez",
      ilsElles: "étudient"
    }
  },

  // ---------------------------------------------------------------------------
  // IRREGULAR -RE VERB - Faire is irregular despite -re ending
  // ---------------------------------------------------------------------------
  {
    verb: "faire",
    english: "to do / make",
    forms: {
      je: "fais",
      tu: "fais",
      ilElleOn: "fait",
      nous: "faisons",
      vous: "faites",
      ilsElles: "font"
    }
  }
]

// =============================================================================
// SUBJECT PRONOUNS REFERENCE
// =============================================================================

/**
 * SubjectPronoun Interface
 * ------------------------
 * Represents a French subject pronoun with its English equivalent.
 *
 * @property french - The French subject pronoun (je, tu, il, etc.)
 * @property english - English translation with usage notes
 */
export interface SubjectPronoun {
  french: string
  english: string
}

/**
 * subjectPronouns Array
 * ---------------------
 * Reference list of all 6 French subject pronouns used in conjugation.
 * These are the "subjects" that determine how verbs are conjugated.
 *
 * Order matches standard French conjugation tables:
 * 1. je (I) - First person singular
 * 2. tu (you) - Second person singular informal
 * 3. il/elle/on (he/she/one) - Third person singular
 * 4. nous (we) - First person plural
 * 5. vous (you) - Second person plural or formal singular
 * 6. ils/elles (they) - Third person plural
 */
export const subjectPronouns: SubjectPronoun[] = [
  { french: "je", english: "I" },
  { french: "tu", english: "you (informal singular)" },
  { french: "il / elle / on", english: "he / she / one" },
  { french: "nous", english: "we" },
  { french: "vous", english: "you (formal/plural)" },
  { french: "ils / elles", english: "they" }
]

// =============================================================================
// PRACTICE QUESTIONS
// =============================================================================

/**
 * PracticeQuestion Interface
 * --------------------------
 * Represents a multiple-choice practice question for verb learning.
 *
 * @property id - Unique question identifier (1-12)
 * @property type - Question format, always "multiple-choice"
 * @property topic - Category: 'meaning', 'conjugation', 'patterns', or 'core-verbs'
 * @property prompt - The question text shown to the user
 * @property options - Array of 3 answer choices
 * @property correct - Index (0-2) of the correct answer in options array
 * @property explanation - Explanation shown after answering
 */
export interface PracticeQuestion {
  id: number
  type: string
  topic: string
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

/**
 * practiceQuestions Array
 * -----------------------
 * 12 multiple-choice questions testing verb knowledge.
 *
 * Question Distribution:
 * - Questions 1-4: Verb meanings (translation recognition)
 * - Questions 5-8: Conjugation practice (choosing correct verb forms)
 * - Questions 9-10: Pattern recognition (regular vs irregular, special cases)
 * - Questions 11-12: Core verb importance (understanding why être/avoir/aller matter)
 *
 * Topics:
 * - 'meaning': Tests English translation knowledge
 * - 'conjugation': Tests proper verb form for given subject pronoun
 * - 'patterns': Tests recognition of conjugation patterns and exceptions
 * - 'core-verbs': Tests understanding of which verbs are most important
 */
export const practiceQuestions: PracticeQuestion[] = [
  // ---------------------------------------------------------------------------
  // MEANING QUESTIONS (1-4) - Test English translations
  // ---------------------------------------------------------------------------
  {
    id: 1,
    type: "multiple-choice",
    topic: "meaning",
    prompt: 'What does "avoir" mean?',
    options: ["to be", "to have", "to go"],
    correct: 1,
    explanation: '"Avoir" means "to have".'
  },
  {
    id: 2,
    type: "multiple-choice",
    topic: "meaning",
    prompt: 'What does "faire" mean?',
    options: ["to do / to make", "to eat", "to study"],
    correct: 0,
    explanation: '"Faire" means "to do" or "to make".'
  },
  {
    id: 3,
    type: "multiple-choice",
    topic: "meaning",
    prompt: 'Which verb means "to go"?',
    options: ["aller", "aimer", "habiter"],
    correct: 0,
    explanation: '"Aller" means "to go".'
  },
  {
    id: 4,
    type: "multiple-choice",
    topic: "meaning",
    prompt: 'Which verb means "to speak"?',
    options: ["parler", "manger", "être"],
    correct: 0,
    explanation: '"Parler" means "to speak".'
  },

  // ---------------------------------------------------------------------------
  // CONJUGATION QUESTIONS (5-8) - Test correct verb form selection
  // ---------------------------------------------------------------------------
  {
    id: 5,
    type: "multiple-choice",
    topic: "conjugation",
    prompt: "Choose the correct form: Je ___ français.",
    options: ["parle", "parles", "parlons"],
    correct: 0,
    explanation: 'With "je", the correct form is "parle".'
  },
  {
    id: 6,
    type: "multiple-choice",
    topic: "conjugation",
    prompt: "Choose the correct form: Nous ___ à Paris.",
    options: ["habite", "habitons", "habitez"],
    correct: 1,
    explanation: 'With "nous", the correct form is "habitons".'
  },
  {
    id: 7,
    type: "multiple-choice",
    topic: "conjugation",
    prompt: "Choose the correct form: Ils ___ leurs devoirs.",
    options: ["fait", "font", "faites"],
    correct: 1,
    explanation: 'With "ils", the correct form is "font".'
  },
  {
    id: 8,
    type: "multiple-choice",
    topic: "conjugation",
    prompt: "Choose the correct form: Tu ___ un chien.",
    options: ["as", "a", "avez"],
    correct: 0,
    explanation: 'With "tu", the correct form is "as".'
  },

  // ---------------------------------------------------------------------------
  // PATTERN QUESTIONS (9-10) - Test recognition of verb patterns
  // ---------------------------------------------------------------------------
  {
    id: 9,
    type: "multiple-choice",
    topic: "patterns",
    prompt: "Which verb is a regular -er verb?",
    options: ["parler", "être", "avoir"],
    correct: 0,
    explanation: '"Parler" is a regular -er verb.'
  },
  {
    id: 10,
    type: "multiple-choice",
    topic: "patterns",
    prompt: 'Which verb has a special nous form "mangeons"?',
    options: ["manger", "aller", "faire"],
    correct: 0,
    explanation: '"Manger" keeps the soft g sound in "nous mangeons".'
  },

  // ---------------------------------------------------------------------------
  // CORE VERB QUESTIONS (11-12) - Test understanding of importance
  // ---------------------------------------------------------------------------
  {
    id: 11,
    type: "multiple-choice",
    topic: "core-verbs",
    prompt: "Why are être, avoir, and aller especially important?",
    options: [
      "They are rare and formal only",
      "They are used very often, even in later levels",
      "They are only used in writing"
    ],
    correct: 1,
    explanation: "These verbs are extremely common and remain important at every stage of learning French."
  },
  {
    id: 12,
    type: "multiple-choice",
    topic: "core-verbs",
    prompt: "Which group contains the three especially important verbs from this lesson?",
    options: [
      "parler, aimer, manger",
      "être, avoir, aller",
      "habiter, étudier, travailler"
    ],
    correct: 1,
    explanation: "The three especially important verbs are être, avoir, and aller."
  }
]
