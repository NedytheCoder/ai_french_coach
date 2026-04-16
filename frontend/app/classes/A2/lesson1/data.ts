/**
 * A2 Lesson 1 - Near Future (Futur Proche) Data
 * ==============================================
 *
 * This file contains all lesson data for A2 Lesson 1, focusing on the near future
 * tense using aller + infinitive (le futur proche).
 *
 * **Lesson Content:**
 * - Conjugation of the verb "aller" (to go) in present tense
 * - Formula: subject + aller + infinitive
 * - Common infinitives used with aller
 * - Present vs near future comparisons
 * - Guided example sentences
 * - Common beginner mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Data Categories:**
 * 1. AllerForm / allerConjugation - Present tense conjugation table
 * 2. Infinitive / commonInfinitives - Common verbs to use after aller
 * 3. TenseComparison / tenseComparisons - Present vs near future examples
 * 4. GuidedExample / guidedExamples - Full near future sentences
 * 5. CommonMistake / commonMistakes - Incorrect vs correct examples
 * 6. PracticeQuestion / practiceQuestions - 15 quiz questions
 * 7. sectionIds / SectionId - Lesson section identifiers
 * 8. getPerformanceMessage - Score-based feedback messages
 */

// =============================================================================
// ALLER CONJUGATION
// =============================================================================

/**
 * AllerForm - Represents a single conjugated form of "aller".
 */
export interface AllerForm {
  pronoun: string
  form: string
  full: string
}

/**
 * allerConjugation - Present tense conjugation of "aller" (to go).
 *
 * Used in the conjugation section and as the foundation for forming
 * the near future tense: aller + infinitive.
 */
export const allerConjugation: AllerForm[] = [
  { pronoun: "je", form: "vais", full: "je vais" },
  { pronoun: "tu", form: "vas", full: "tu vas" },
  { pronoun: "il / elle / on", form: "va", full: "il / elle / on va" },
  { pronoun: "nous", form: "allons", full: "nous allons" },
  { pronoun: "vous", form: "allez", full: "vous allez" },
  { pronoun: "ils / elles", form: "vont", full: "ils / elles vont" }
]

// =============================================================================
// COMMON INFINITIVES
// =============================================================================

/**
 * Infinitive - Represents a French infinitive verb with English translation.
 */
export interface Infinitive {
  infinitive: string
  english: string
}

/**
 * commonInfinitives - Common verbs frequently used after "aller".
 *
 * These are everyday actions that learners commonly talk about
 * when expressing future intentions.
 */
export const commonInfinitives: Infinitive[] = [
  { infinitive: "manger", english: "to eat" },
  { infinitive: "parler", english: "to speak" },
  { infinitive: "étudier", english: "to study" },
  { infinitive: "travailler", english: "to work" },
  { infinitive: "sortir", english: "to go out" },
  { infinitive: "partir", english: "to leave" },
  { infinitive: "voir", english: "to see" },
  { infinitive: "faire", english: "to do / make" },
  { infinitive: "acheter", english: "to buy" },
  { infinitive: "voyager", english: "to travel" }
]

// =============================================================================
// PRESENT VS NEAR FUTURE COMPARISON
// =============================================================================

/**
 * TenseComparison - Shows parallel present tense and near future sentences.
 */
export interface TenseComparison {
  present: string
  future: string
  presentEnglish: string
  futureEnglish: string
}

/**
 * tenseComparisons - Side-by-side examples of present vs near future.
 *
 * Helps learners understand the difference between:
 * - Present: What is happening now (maintenant, aujourd'hui)
 * - Near future: What is going to happen (bientôt, demain, ce soir)
 */
export const tenseComparisons: TenseComparison[] = [
  {
    present: "Je mange maintenant.",
    future: "Je vais manger bientôt.",
    presentEnglish: "I am eating now.",
    futureEnglish: "I am going to eat soon."
  },
  {
    present: "Elle travaille aujourd'hui.",
    future: "Elle va travailler demain.",
    presentEnglish: "She is working today.",
    futureEnglish: "She is going to work tomorrow."
  },
  {
    present: "Nous regardons un film.",
    future: "Nous allons regarder un film ce soir.",
    presentEnglish: "We are watching a film.",
    futureEnglish: "We are going to watch a film tonight."
  }
]

// =============================================================================
// GUIDED EXAMPLES
// =============================================================================

/**
 * GuidedExample - A complete near future sentence with English translation.
 */
export interface GuidedExample {
  french: string
  english: string
}

/**
 * guidedExamples - Full sentences demonstrating aller + infinitive.
 *
 * Covers all subject pronouns (je, tu, il/elle, nous, vous, elles)
 * with common everyday actions.
 */
export const guidedExamples: GuidedExample[] = [
  { french: "Je vais étudier ce soir.", english: "I am going to study tonight." },
  { french: "Tu vas parler avec le professeur.", english: "You are going to speak with the teacher." },
  { french: "Il va acheter du pain.", english: "He is going to buy bread." },
  { french: "Nous allons partir demain matin.", english: "We are going to leave tomorrow morning." },
  { french: "Vous allez regarder un film.", english: "You are going to watch a film." },
  { french: "Elles vont voyager en France.", english: "They are going to travel in France." }
]

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * CommonMistake - An incorrect example with the correct form and explanation.
 */
export interface CommonMistake {
  wrong: string
  correct: string
  explanation: string
}

/**
 * commonMistakes - Frequent errors learners make with the near future.
 *
 * Typical mistakes:
 * - Conjugating the second verb instead of using infinitive
 * - Incorrect agreement of aller with the subject
 * - These help learners recognize and avoid common pitfalls
 */
export const commonMistakes: CommonMistake[] = [
  { wrong: "Je vais mange.", correct: "Je vais manger.", explanation: "After aller, use the infinitive." },
  { wrong: "Nous va partir.", correct: "Nous allons partir.", explanation: "Aller must agree with the subject." },
  { wrong: "Elle va travaille demain.", correct: "Elle va travailler demain.", explanation: "The second verb stays in the infinitive." },
  { wrong: "Ils vont parlent.", correct: "Ils vont parler.", explanation: "Do not conjugate the second verb here." }
]

// =============================================================================
// PRACTICE QUESTIONS
// =============================================================================

/**
 * PracticeQuestion - Multiple-choice question for the quiz.
 */
export interface PracticeQuestion {
  id: number
  topic: string
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

/**
 * practiceQuestions - 15 questions testing near future knowledge.
 *
 * Topic distribution:
 * - structure (5): Formula and sentence construction
 * - aller (4): Conjugation of aller with different subjects
 * - meaning (4): Understanding near future translations
 * - correction (2): Identifying and fixing common errors
 */
export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    topic: "structure",
    prompt: "Which formula is correct for the near future?",
    options: ["subject + infinitive + aller", "subject + aller + infinitive", "subject + past participle + aller"],
    correct: 1,
    explanation: "The correct structure is subject + aller + infinitive."
  },
  {
    id: 2,
    topic: "structure",
    prompt: "Choose the correct sentence.",
    options: ["Je vais manger.", "Je vais mange.", "Je manger vais."],
    correct: 0,
    explanation: "After aller, use the infinitive."
  },
  {
    id: 3,
    topic: "structure",
    prompt: "Choose the correct sentence.",
    options: ["Elle va étudier.", "Elle va étudie.", "Elle est va étudier."],
    correct: 0,
    explanation: "The second verb stays in the infinitive."
  },
  {
    id: 4,
    topic: "structure",
    prompt: 'Which sentence means "We are going to leave"?',
    options: ["Nous allons partir.", "Nous va partir.", "Nous allons partons."],
    correct: 0,
    explanation: "Use allons with nous, then the infinitive partir."
  },
  {
    id: 5,
    topic: "structure",
    prompt: "What comes after aller in this lesson?",
    options: ["an adjective", "an infinitive", "a noun only"],
    correct: 1,
    explanation: "Aller is followed by an infinitive."
  },
  {
    id: 6,
    topic: "aller",
    prompt: "Choose the correct form: Tu ___ manger.",
    options: ["vas", "va", "allez"],
    correct: 0,
    explanation: "With tu, the correct form is vas."
  },
  {
    id: 7,
    topic: "aller",
    prompt: "Choose the correct form: Nous ___ regarder un film.",
    options: ["allons", "allez", "vont"],
    correct: 0,
    explanation: "With nous, the correct form is allons."
  },
  {
    id: 8,
    topic: "aller",
    prompt: "Choose the correct form: Ils ___ voyager demain.",
    options: ["va", "vont", "vas"],
    correct: 1,
    explanation: "With ils, the correct form is vont."
  },
  {
    id: 9,
    topic: "aller",
    prompt: "Choose the correct form: Je ___ parler avec Marie.",
    options: ["vais", "vas", "va"],
    correct: 0,
    explanation: "With je, the correct form is vais."
  },
  {
    id: 10,
    topic: "meaning",
    prompt: 'What does "Elle va travailler demain" mean?',
    options: ["She works tomorrow.", "She is going to work tomorrow.", "She worked tomorrow."],
    correct: 1,
    explanation: "This is the near future with aller."
  },
  {
    id: 11,
    topic: "meaning",
    prompt: 'What does "Nous allons étudier ce soir" mean?',
    options: ["We are going to study tonight.", "We studied tonight.", "We study every night."],
    correct: 0,
    explanation: "Allons + étudier expresses the near future."
  },
  {
    id: 12,
    topic: "meaning",
    prompt: 'Choose the best translation of "Je vais acheter du pain."',
    options: ["I am buying bread now.", "I am going to buy bread.", "I bought bread."],
    correct: 1,
    explanation: "Je vais + infinitive means \"I am going to …\""
  },
  {
    id: 13,
    topic: "meaning",
    prompt: 'Which sentence means "They are going to speak French"?',
    options: ["Ils vont parler français.", "Ils parlent français.", "Ils ont parlé français."],
    correct: 0,
    explanation: "Vont + parler expresses the near future."
  },
  {
    id: 14,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: ["Elle va travaille demain.", "Elle va travailler demain.", "Elle travaille va demain."],
    correct: 1,
    explanation: "After aller, use the infinitive travailler."
  },
  {
    id: 15,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: ["Nous va partir.", "Nous allons partir.", "Nous allons partons."],
    correct: 1,
    explanation: "With nous, use allons, then the infinitive partir."
  }
]

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections in order:
 * 1. intro - Introduction to near future concept
 * 2. formula - Structure formula explanation
 * 3. conjugation - Aller conjugation table
 * 4. infinitives - Common infinitives to use
 * 5. comparison - Present vs near future comparison
 * 6. examples - Guided example sentences
 * 7. mistakes - Common beginner mistakes
 * 8. practice - Interactive practice quiz
 */
export const sectionIds = [
  'intro',
  'formula',
  'conjugation',
  'infinitives',
  'comparison',
  'examples',
  'mistakes',
  'practice'
] as const

export type SectionId = typeof sectionIds[number]

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * PerformanceMessage - Feedback message based on quiz performance.
 */
export interface PerformanceMessage {
  title: string
  message: string
  tone: 'high' | 'medium' | 'low'
  color: 'green' | 'blue' | 'amber'
}

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score thresholds:
 * - ≥80% (12/15): "Great job!" - green, high tone
 * - 47-79% (7-11/15): "Nice progress" - blue, medium tone
 * - <47% (<7/15): "Good effort" - amber, low tone
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns PerformanceMessage with title, message, tone, and color
 */
export function getPerformanceMessage(score: number, total: number): PerformanceMessage {
  const percentage = (score / total) * 100
  
  if (percentage >= 80) {
    return {
      title: "Great job!",
      message: "You're using aller + infinitive well. This is an important structure for everyday French.",
      tone: "high",
      color: "green"
    }
  } else if (percentage >= 47) {
    return {
      title: "Nice progress",
      message: "You're starting to understand how the near future works. Review the structure once more if you want to feel even more confident.",
      tone: "medium",
      color: "blue"
    }
  } else {
    return {
      title: "Good effort",
      message: "This structure gets easier with repetition. You can retake the practice or continue the lesson. A quick review of aller will help a lot.",
      tone: "low",
      color: "amber"
    }
  }
}
