/**
 * A1 Lesson 5 - French Sentence Structure Data
 * ============================================
 *
 * This file contains all lesson data for A1 Lesson 5, focusing on French sentence
 * structure and construction. The lesson covers basic sentence patterns, affirmative
 * and negative forms, questions, and common mistakes.
 *
 * Data Categories:
 * ----------------
 * 1. Sentence Parts Examples (4 items) - Breakdown of sentences into subject, verb, complement
 * 2. Affirmative Examples (6 items) - Simple positive statements
 * 3. Adjective Placement Examples (4 items) - Adjective position (before/after noun)
 * 4. Negative Examples (4 items) - Affirmative vs negative form comparisons
 * 5. Question Examples (4 items) - Intonation and est-ce-que question forms
 * 6. Common Mistakes (4 items) - Typical beginner errors with corrections
 * 7. Sentence Patterns (4 items) - Structural formulas for sentence types
 * 8. Practice Questions (14 items) - Multiple choice questions by topic
 *
 * Practice Topics:
 * ----------------
 * - sentence-order: Basic Subject + Verb + Complement patterns
 * - affirmative: Positive statement construction
 * - negative: Negation with ne...pas
 * - questions: Question formation techniques
 * - correction: Identifying and fixing common errors
 */

// =============================================================================
// SENTENCE PARTS EXAMPLES
// =============================================================================

/**
 * SentencePartExample Interface
 * -----------------------------
 * Defines the structure for breaking down French sentences into their
 * constituent parts (subject, verb, complement) for analysis.
 */
export interface SentencePartExample {
  id: number
  sentence: string
  subject: string
  verb: string
  complement: string
  english: string
}

/**
 * Sentence Parts Examples - 4 sentences broken down into components.
 * Used to teach the Subject + Verb + Complement structure.
 */
export const sentencePartsExamples: SentencePartExample[] = [
  {
    id: 1,
    sentence: "Je parle français.",
    subject: "Je",
    verb: "parle",
    complement: "français",
    english: "I speak French."
  },
  {
    id: 2,
    sentence: "Elle habite à Lyon.",
    subject: "Elle",
    verb: "habite",
    complement: "à Lyon",
    english: "She lives in Lyon."
  },
  {
    id: 3,
    sentence: "Nous mangeons au restaurant.",
    subject: "Nous",
    verb: "mangeons",
    complement: "au restaurant",
    english: "We eat at the restaurant."
  },
  {
    id: 4,
    sentence: "Ils aiment la musique.",
    subject: "Ils",
    verb: "aiment",
    complement: "la musique",
    english: "They like music."
  }
]

// =============================================================================
// AFFIRMATIVE EXAMPLES
// =============================================================================

/**
 * AffirmativeExample Interface
 * ----------------------------
 * Simple positive statement with French and English versions.
 */
export interface AffirmativeExample {
  id: number
  french: string
  english: string
}

/**
 * Affirmative Examples - 6 simple positive statements.
 * Demonstrates Subject + Verb + Complement pattern in affirmative form.
 */
export const affirmativeExamples: AffirmativeExample[] = [
  {
    id: 1,
    french: "Je suis étudiant.",
    english: "I am a student."
  },
  {
    id: 2,
    french: "Tu as un livre.",
    english: "You have a book."
  },
  {
    id: 3,
    french: "Elle aime le chocolat.",
    english: "She likes chocolate."
  },
  {
    id: 4,
    french: "Nous allons à l'école.",
    english: "We are going to school."
  },
  {
    id: 5,
    french: "Vous parlez anglais.",
    english: "You speak English."
  },
  {
    id: 6,
    french: "Ils travaillent ici.",
    english: "They work here."
  }
]

// =============================================================================
// ADJECTIVE PLACEMENT EXAMPLES
// =============================================================================

/**
 * AdjectivePlacementExample Interface
 * -----------------------------------
 * Demonstrates French adjective placement rules.
 * Most adjectives come after the noun, but some common ones (petit, grand,
 * bon, etc.) can come before.
 */
export interface AdjectivePlacementExample {
  id: number
  french: string
  english: string
  note: string
}

/**
 * Adjective Placement Examples - 4 examples showing adjective position.
 * - Examples 1-2: Adjectives after noun (typical French pattern)
 * - Examples 3-4: Common adjectives before noun (exceptional cases)
 */
export const adjectivePlacementExamples: AdjectivePlacementExample[] = [
  {
    id: 1,
    french: "une voiture rouge",
    english: "a red car",
    note: "The adjective comes after the noun."
  },
  {
    id: 2,
    french: "un livre intéressant",
    english: "an interesting book",
    note: "The adjective comes after the noun."
  },
  {
    id: 3,
    french: "un petit chat",
    english: "a small cat",
    note: "Some common adjectives can come before the noun."
  },
  {
    id: 4,
    french: "une grande maison",
    english: "a big house",
    note: "Some common adjectives can come before the noun."
  }
]

// =============================================================================
// NEGATIVE EXAMPLES
// =============================================================================

/**
 * NegativeExample Interface
 * -------------------------
 * Shows affirmative sentences transformed to negative form using ne...pas.
 */
export interface NegativeExample {
  id: number
  affirmative: string
  negative: string
  english: string
}

/**
 * Negative Examples - 4 pairs showing affirmative vs negative forms.
 * Pattern: ne/n' + verb + pas (wraps around the verb)
 */
export const negativeExamples: NegativeExample[] = [
  {
    id: 1,
    affirmative: "Je parle français.",
    negative: "Je ne parle pas français.",
    english: "I do not speak French."
  },
  {
    id: 2,
    affirmative: "Elle aime le café.",
    negative: "Elle n'aime pas le café.",
    english: "She does not like coffee."
  },
  {
    id: 3,
    affirmative: "Nous avons un chien.",
    negative: "Nous n'avons pas de chien.",
    english: "We do not have a dog."
  },
  {
    id: 4,
    affirmative: "Ils habitent ici.",
    negative: "Ils n'habitent pas ici.",
    english: "They do not live here."
  }
]

// =============================================================================
// QUESTION EXAMPLES
// =============================================================================

/**
 * QuestionExample Interface
 * -------------------------
 * Demonstrates two simple question formation methods for A1 level:
 * - intonation: Rising tone at end of statement
 * - est-ce-que: Question marker placed before statement
 */
export interface QuestionExample {
  id: number
  type: 'intonation' | 'est-ce-que'
  french: string
  english: string
}

/**
 * Question Examples - 4 examples showing question formation.
 * - Examples 1-2: Intonation questions (simplest A1 method)
 * - Examples 3-4: Est-ce-que questions (slightly more formal)
 */
export const questionExamples: QuestionExample[] = [
  {
    id: 1,
    type: "intonation",
    french: "Tu aimes le chocolat ?",
    english: "Do you like chocolate?"
  },
  {
    id: 2,
    type: "intonation",
    french: "Vous habitez ici ?",
    english: "Do you live here?"
  },
  {
    id: 3,
    type: "est-ce-que",
    french: "Est-ce que tu parles anglais ?",
    english: "Do you speak English?"
  },
  {
    id: 4,
    type: "est-ce-que",
    french: "Est-ce qu'elle travaille aujourd'hui ?",
    english: "Does she work today?"
  }
]

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * CommonMistake Interface
 * -----------------------
 * Documents typical beginner errors with corrections and explanations.
 */
export interface CommonMistake {
  id: number
  wrong: string
  correct: string
  explanation: string
}

/**
 * Common Mistakes - 4 typical beginner errors to avoid.
 * - Word order errors (subject-verb placement)
 * - Negation errors (wrong placement of pas)
 * - Question formation errors (inversion at A1 level)
 * - Adjective placement errors (wrong side of noun)
 */
export const commonMistakes: CommonMistake[] = [
  {
    id: 1,
    wrong: "Je français parle.",
    correct: "Je parle français.",
    explanation: "In simple French, the verb usually comes after the subject."
  },
  {
    id: 2,
    wrong: "Elle pas aime le café.",
    correct: "Elle n'aime pas le café.",
    explanation: "Negation wraps around the verb: ne + verb + pas."
  },
  {
    id: 3,
    wrong: "Parles tu français ?",
    correct: "Tu parles français ?",
    explanation: "At A1 level, use intonation or est-ce que for simple questions."
  },
  {
    id: 4,
    wrong: "Une rouge voiture",
    correct: "Une voiture rouge",
    explanation: "Many adjectives come after the noun in French."
  }
]

// =============================================================================
// SENTENCE PATTERNS
// =============================================================================

/**
 * SentencePattern Interface
 * -------------------------
 * Structural formulas showing how to construct different sentence types.
 */
export interface SentencePattern {
  id: number
  label: string
  pattern: string
  example: string
}

/**
 * Sentence Patterns - 4 structural formulas for sentence construction.
 * - Basic statement: Subject + Verb + Complement
 * - Negative sentence: Subject + ne/n' + Verb + pas + Complement
 * - Intonation question: Statement + ?
 * - Est-ce-que question: Est-ce que + Subject + Verb + Complement ?
 */
export const sentencePatterns: SentencePattern[] = [
  {
    id: 1,
    label: "Basic statement",
    pattern: "Subject + Verb + Complement",
    example: "Je parle français."
  },
  {
    id: 2,
    label: "Negative sentence",
    pattern: "Subject + ne/n' + Verb + pas + Complement",
    example: "Je ne parle pas français."
  },
  {
    id: 3,
    label: "Simple question (intonation)",
    pattern: "Statement + ?",
    example: "Tu parles français ?"
  },
  {
    id: 4,
    label: "Simple question (est-ce que)",
    pattern: "Est-ce que + Subject + Verb + Complement ?",
    example: "Est-ce que tu parles français ?"
  }
]

// =============================================================================
// PRACTICE QUESTIONS
// =============================================================================

/**
 * PracticeQuestion Interface
 * --------------------------
 * Multiple-choice questions for testing sentence structure knowledge.
 */
export interface PracticeQuestion {
  id: number
  type: 'multiple-choice'
  topic: 'sentence-order' | 'affirmative' | 'negative' | 'questions' | 'correction'
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

/**
 * Practice Questions - 14 multiple-choice questions organized by topic.
 *
 * Distribution:
 * - 4 sentence-order questions (IDs 1-4): Word order patterns
 * - 3 affirmative questions (IDs 5-7): Positive statements
 * - 3 negative questions (IDs 8-10): Negation patterns
 * - 2 questions questions (IDs 11-12): Question formation
 * - 2 correction questions (IDs 13-14): Error identification
 */
export const practiceQuestions: PracticeQuestion[] = [
  // --------------------------------------------------
  // 4 SENTENCE-ORDER QUESTIONS: Test S+V+C pattern
  // --------------------------------------------------
  {
    id: 1,
    type: "multiple-choice",
    topic: "sentence-order",
    prompt: "Choose the correct sentence order.",
    options: [
      "Je parle français.",
      "Je français parle.",
      "Parle je français."
    ],
    correct: 0,
    explanation: "The correct beginner structure is Subject + Verb + Complement."
  },
  {
    id: 2,
    type: "multiple-choice",
    topic: "sentence-order",
    prompt: "Choose the correct sentence.",
    options: [
      "Elle aime la musique.",
      "Elle la musique aime.",
      "Aime elle la musique."
    ],
    correct: 0,
    explanation: "The verb usually comes after the subject in simple French sentences."
  },
  {
    id: 3,
    type: "multiple-choice",
    topic: "sentence-order",
    prompt: "Which sentence follows the basic French pattern?",
    options: [
      "Nous mangeons au restaurant.",
      "Nous au restaurant mangeons.",
      "Mangeons nous au restaurant."
    ],
    correct: 0,
    explanation: "The basic pattern is Subject + Verb + Complement."
  },
  {
    id: 4,
    type: "multiple-choice",
    topic: "sentence-order",
    prompt: "Choose the correctly ordered sentence.",
    options: [
      "Ils travaillent ici.",
      "Ils ici travaillent.",
      "Travaillent ils ici."
    ],
    correct: 0,
    explanation: "Simple affirmative sentences usually follow Subject + Verb + Complement."
  },

  // --------------------------------------------------
  // 3 AFFIRMATIVE QUESTIONS: Test positive statements
  // --------------------------------------------------
  {
    id: 5,
    type: "multiple-choice",
    topic: "affirmative",
    prompt: "What does 'Vous parlez anglais.' mean?",
    options: [
      "You speak English.",
      "Do you speak English?",
      "You do not speak English."
    ],
    correct: 0,
    explanation: "This is a simple affirmative sentence."
  },
  {
    id: 6,
    type: "multiple-choice",
    topic: "affirmative",
    prompt: "Which sentence is affirmative?",
    options: [
      "Je ne parle pas français.",
      "Tu aimes le chocolat ?",
      "Je parle français."
    ],
    correct: 2,
    explanation: "An affirmative sentence states something directly."
  },
  {
    id: 7,
    type: "multiple-choice",
    topic: "affirmative",
    prompt: "Choose the best translation of 'Elle aime le café.'",
    options: [
      "She likes coffee.",
      "She does not like coffee.",
      "Does she like coffee?"
    ],
    correct: 0,
    explanation: "This is a positive statement."
  },

  // --------------------------------------------------
  // 3 NEGATIVE QUESTIONS: Test negation patterns (ne...pas)
  // --------------------------------------------------
  {
    id: 8,
    type: "multiple-choice",
    topic: "negative",
    prompt: "Choose the correct negative sentence.",
    options: [
      "Je ne parle pas français.",
      "Je pas parle français.",
      "Je ne français parle pas."
    ],
    correct: 0,
    explanation: "The negative pattern is ne + verb + pas."
  },
  {
    id: 9,
    type: "multiple-choice",
    topic: "negative",
    prompt: "Choose the correct negative form of 'Elle aime le café.'",
    options: [
      "Elle ne aime pas le café.",
      "Elle n'aime pas le café.",
      "Elle aime pas le café."
    ],
    correct: 1,
    explanation: "Use n' before a vowel and place pas after the verb."
  },
  {
    id: 10,
    type: "multiple-choice",
    topic: "negative",
    prompt: "Which sentence means 'We do not have a dog'?",
    options: [
      "Nous avons un chien.",
      "Nous n'avons pas de chien.",
      "Nous ne avons pas un chien."
    ],
    correct: 1,
    explanation: "The correct beginner negative form is 'Nous n'avons pas de chien.'"
  },

  // --------------------------------------------------
  // 2 QUESTIONS: Test question formation techniques
  // --------------------------------------------------
  {
    id: 11,
    type: "multiple-choice",
    topic: "questions",
    prompt: "Which is a correct simple question using intonation?",
    options: [
      "Tu parles français ?",
      "Tu français parles ?",
      "Parles tu français."
    ],
    correct: 0,
    explanation: "At A1 level, intonation questions are simple and correct."
  },
  {
    id: 12,
    type: "multiple-choice",
    topic: "questions",
    prompt: "Which is a correct question using est-ce que?",
    options: [
      "Est-ce que tu habites ici ?",
      "Est-ce que habites tu ici ?",
      "Tu est-ce que habites ici ?"
    ],
    correct: 0,
    explanation: "Use est-ce que + subject + verb + complement."
  },

  // --------------------------------------------------
  // 2 CORRECTION QUESTIONS: Test error identification
  // --------------------------------------------------
  {
    id: 13,
    type: "multiple-choice",
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Une rouge voiture",
      "Une voiture rouge",
      "Rouge une voiture"
    ],
    correct: 1,
    explanation: "Many adjectives come after the noun in French."
  },
  {
    id: 14,
    type: "multiple-choice",
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Elle pas aime le café.",
      "Elle n'aime pas le café.",
      "Pas elle aime le café."
    ],
    correct: 1,
    explanation: "Negation wraps around the verb."
  }
]

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * Section IDs Array - Ordered list of all lesson section identifiers.
 * Used for progress tracking and determining completion status.
 */
export const sectionIds = [
  'what-is-sentence',   // Introduction: What is a sentence?
  'basic-order',        // Basic French sentence order
  'sentence-parts',     // Subject, verb, complement breakdown
  'affirmative',        // Affirmative sentence examples
  'adjectives',         // Adjective placement rules
  'negatives',          // Negative sentence formation
  'questions',          // Question formation techniques
  'mistakes',           // Common mistakes to avoid
  'patterns',           // Sentence pattern formulas
  'practice'            // Interactive practice section
] as const

/**
 * SectionId Type - Union type derived from sectionIds array.
 * Ensures type safety when referencing section identifiers.
 */
export type SectionId = typeof sectionIds[number]
