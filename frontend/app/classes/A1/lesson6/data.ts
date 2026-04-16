/**
 * A1 Lesson 6 - French Verb Groups Data
 * =======================================
 *
 * This file contains all lesson data for A1 Lesson 6, focusing on French verb groups
 * and conjugation patterns. French verbs are categorized into three groups based on
 * their infinitive endings, which determine their conjugation patterns.
 *
 * Data Categories:
 * ----------------
 * 1. First Group Verbs (5 items) - Regular -er verbs
 * 2. Second Group Verbs (5 items) - Regular -ir verbs
 * 3. Third Group Verbs (5 items) - Irregular verbs
 * 4. Verb Summary (3 items) - Group characteristics overview
 * 5. Practice Questions (12 items) - Identification and classification
 * 6. Section IDs (8 items) - Lesson section identifiers
 * 7. Conjugation Examples (3 items) - Present tense conjugation tables
 *
 * Verb Groups:
 * ------------
 * - 1st group: Regular verbs ending in -er (parler, aimer, travailler)
 * - 2nd group: Regular verbs ending in -ir (finir, choisir, réussir)
 * - 3rd group: Irregular verbs with varied patterns (être, avoir, aller, faire, prendre)
 */

// =============================================================================
// VERB EXAMPLES BY GROUP
// =============================================================================

/**
 * VerbExample Interface
 * ---------------------
 * Simple structure for verb with English translation.
 */
export interface VerbExample {
  verb: string
  english: string
}

/**
 * First Group Verbs - Regular -er verbs (largest group in French).
 * Pattern: Drop -er, add endings (e, es, e, ons, ez, ent).
 */
export const firstGroupVerbs: VerbExample[] = [
  { verb: "parler", english: "to speak" },
  { verb: "aimer", english: "to like / love" },
  { verb: "travailler", english: "to work" },
  { verb: "manger", english: "to eat" },
  { verb: "habiter", english: "to live" }
]

/**
 * Second Group Verbs - Regular -ir verbs.
 * Pattern: Add -iss- before plural endings (issons, issez, issent).
 */
export const secondGroupVerbs: VerbExample[] = [
  { verb: "finir", english: "to finish" },
  { verb: "choisir", english: "to choose" },
  { verb: "réussir", english: "to succeed" },
  { verb: "grandir", english: "to grow" },
  { verb: "remplir", english: "to fill" }
]

/**
 * Third Group Verbs - Irregular verbs (most important common verbs).
 * No single pattern; each verb has unique forms that must be memorized.
 */
export const thirdGroupVerbs: VerbExample[] = [
  { verb: "être", english: "to be" },
  { verb: "avoir", english: "to have" },
  { verb: "aller", english: "to go" },
  { verb: "faire", english: "to do / make" },
  { verb: "prendre", english: "to take" }
]

// =============================================================================
// VERB SUMMARY
// =============================================================================

/**
 * VerbSummaryItem Interface
 * -------------------------
 * Summary of characteristics for each verb group.
 */
export interface VerbSummaryItem {
  group: string
  pattern: string
  type: string
  example: string
}

/**
 * Verb Summary - Quick reference for the three verb groups.
 * Shows ending patterns and regularity type for each group.
 */
export const verbSummary: VerbSummaryItem[] = [
  {
    group: "1st group",
    pattern: "-er",
    type: "mostly regular",
    example: "parler"
  },
  {
    group: "2nd group",
    pattern: "-ir",
    type: "regular",
    example: "finir"
  },
  {
    group: "3rd group",
    pattern: "varied",
    type: "irregular",
    example: "être"
  }
]

// =============================================================================
// PRACTICE QUESTIONS
// =============================================================================

/**
 * PracticeQuestion Interface
 * --------------------------
 * Multiple-choice question for verb group identification.
 */
export interface PracticeQuestion {
  id: number
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

/**
 * Practice Questions - 12 questions testing verb group knowledge.
 *
 * Question distribution:
 * - IDs 1-4: Identify verb group by ending
 * - IDs 5-8: Identify regular vs irregular
 * - IDs 9-11: Match verb to meaning
 * - ID 12: Identify third group verbs
 */
export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    prompt: "Which group does \"parler\" belong to?",
    options: ["1st group", "2nd group", "3rd group"],
    correct: 0,
    explanation: "\"Parler\" ends in -er."
  },
  {
    id: 2,
    prompt: "Which group does \"finir\" belong to?",
    options: ["1st group", "2nd group", "3rd group"],
    correct: 1,
    explanation: "\"Finir\" is a regular -ir verb."
  },
  {
    id: 3,
    prompt: "Which group does \"être\" belong to?",
    options: ["1st group", "2nd group", "3rd group"],
    correct: 2,
    explanation: "\"Être\" is irregular."
  },
  {
    id: 4,
    prompt: "Which group does \"manger\" belong to?",
    options: ["1st group", "2nd group", "3rd group"],
    correct: 0,
    explanation: "\"Manger\" ends in -er."
  },
  {
    id: 5,
    prompt: "Is \"parler\" regular or irregular?",
    options: ["Regular", "Irregular"],
    correct: 0,
    explanation: "It follows a standard -er pattern."
  },
  {
    id: 6,
    prompt: "Is \"être\" regular or irregular?",
    options: ["Regular", "Irregular"],
    correct: 1,
    explanation: "Its forms are unique."
  },
  {
    id: 7,
    prompt: "Is \"finir\" regular or irregular?",
    options: ["Regular", "Irregular"],
    correct: 0,
    explanation: "It follows a regular -ir pattern."
  },
  {
    id: 8,
    prompt: "Is \"aller\" regular or irregular?",
    options: ["Regular", "Irregular"],
    correct: 1,
    explanation: "It is irregular."
  },
  {
    id: 9,
    prompt: "Which verb means \"to choose\"?",
    options: ["choisir", "parler", "prendre"],
    correct: 0,
    explanation: "\"Choisir\" means \"to choose\"."
  },
  {
    id: 10,
    prompt: "Which verb means \"to grow\"?",
    options: ["grandir", "avoir", "faire"],
    correct: 0,
    explanation: "\"Grandir\" means \"to grow\"."
  },
  {
    id: 11,
    prompt: "Which verb means \"to take\"?",
    options: ["prendre", "aimer", "manger"],
    correct: 0,
    explanation: "\"Prendre\" means \"to take\"."
  },
  {
    id: 12,
    prompt: "Which verb is from the 3rd group?",
    options: ["être", "parler", "finir"],
    correct: 0,
    explanation: "\"Être\" is irregular."
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
  'verb-groups-intro',     // Introduction to verb groups
  'first-group',            // First group (-er) verbs
  'second-group',           // Second group (-ir) verbs
  'third-group',            // Third group (irregular) verbs
  'regular-vs-irregular',   // Comparison of regular and irregular verbs
  'conjugation-examples',   // Conjugation table examples
  'pattern-summary',        // Pattern summary table
  'practice'                 // Interactive practice section
] as const

/**
 * SectionId Type - Union type derived from sectionIds array.
 * Ensures type safety when referencing section identifiers.
 */
export type SectionId = typeof sectionIds[number]

// =============================================================================
// CONJUGATION EXAMPLES
// =============================================================================

/**
 * ConjugationExample Interface
 * -----------------------------
 * Present tense conjugation table for a verb.
 */
export interface ConjugationExample {
  group: string
  verb: string
  english: string
  forms: { pronoun: string; form: string }[]
  note?: string
}

/**
 * Conjugation Examples - Present tense conjugations for one verb from each group.
 * - parler (1st group): Standard -er pattern
 * - finir (2nd group): -iss- infix pattern
 * - être (3rd group): Irregular unique forms
 */
export const conjugationExamples: ConjugationExample[] = [
  {
    group: "1st group (-er)",
    verb: "parler",
    english: "to speak",
    note: "Follows the standard -er pattern: drop -er, add endings",
    forms: [
      { pronoun: "je", form: "parle" },
      { pronoun: "tu", form: "parles" },
      { pronoun: "il/elle", form: "parle" },
      { pronoun: "nous", form: "parlons" },
      { pronoun: "vous", form: "parlez" },
      { pronoun: "ils/elles", form: "parlent" }
    ]
  },
  {
    group: "2nd group (-ir)",
    verb: "finir",
    english: "to finish",
    note: "Follows the regular -ir pattern: add -iss- before plural endings",
    forms: [
      { pronoun: "je", form: "finis" },
      { pronoun: "tu", form: "finis" },
      { pronoun: "il/elle", form: "finit" },
      { pronoun: "nous", form: "finissons" },
      { pronoun: "vous", form: "finissez" },
      { pronoun: "ils/elles", form: "finissent" }
    ]
  },
  {
    group: "3rd group (irregular)",
    verb: "être",
    english: "to be",
    note: "Irregular verb — each form is unique and must be memorized",
    forms: [
      { pronoun: "je", form: "suis" },
      { pronoun: "tu", form: "es" },
      { pronoun: "il/elle", form: "est" },
      { pronoun: "nous", form: "sommes" },
      { pronoun: "vous", form: "êtes" },
      { pronoun: "ils/elles", form: "sont" }
    ]
  }
]
