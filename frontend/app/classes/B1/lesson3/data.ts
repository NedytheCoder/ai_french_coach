/**
 * B1 Lesson 3 - Relative Pronouns Review (Pronoms Relatifs)
 * ===========================================================
 *
 * This file contains all lesson data for B1 Lesson 3, reviewing and mastering
 * French relative pronouns: qui, que, où, and dont.
 *
 * **Lesson Content:**
 * - Qui (subject) - who/that/which does the action
 * - Que (direct object) - whom/that/which receives the action
 * - Où (place/time) - where/when
 * - Dont (with de) - of which/about whom
 * - Comparison table of all four pronouns
 * - Sentence joining exercises
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Qui = subject (does the action)
 * - Que = direct object (receives the action)
 * - Où = place or time (where/when)
 * - Dont = with de (about/of/from which/whom)
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. quiExamples - Qui usage examples
 * 4. queExamples - Que usage examples
 * 5. ouExamples - Où usage examples
 * 6. dontExamples - Dont usage examples
 * 7. pronounComparison - Side-by-side comparison
 * 8. sentenceJoiningSteps - How to join sentences
 * 9. commonMistakes - Common errors to avoid
 * 10. practiceQuestions - 15 quiz questions
 * 11. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to relative pronouns
 * 2. qui - Subject pronoun (who/that)
 * 3. que - Direct object pronoun (whom/that)
 * 4. ou - Place/time pronoun (where/when)
 * 5. dont - De + noun pronoun (of which)
 * 6. comparison - Comparing all pronouns
 * 7. sentence-joining - How to join sentences
 * 8. mistakes - Common errors
 * 9. practice - Interactive quiz
 * 10. completion - Lesson completion
 */
export const sectionIds = ["intro", "qui", "que", "ou", "dont", "comparison", "sentence-joining", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Relative Pronouns Review",
  /** Brief description of lesson content */
  subtitle: "Master qui, que, où, and dont to connect sentences smoothly.",
  /** Lesson number in B1 series */
  lessonNumber: 3,
};

// =============================================================================
// QUI EXAMPLES
// =============================================================================

/**
 * quiExamples - Examples of qui as subject pronoun.
 *
 * Qui = subject (does the action)
 * - Replaces the subject in the relative clause
 * - Can refer to people or things
 * - Never elides (always qui, never qu')
 */
export const quiExamples = [
  { french: "L'homme qui parle est mon professeur.", english: "The man who is speaking is my teacher.", explanation: "qui = subject (the man speaks)" },
  { french: "C'est un livre qui intéresse beaucoup de monde.", english: "It's a book that interests many people.", explanation: "qui = subject (the book interests)" },
];

// =============================================================================
// QUE EXAMPLES
// =============================================================================

/**
 * queExamples - Examples of que as direct object pronoun.
 *
 * Que = direct object (receives the action)
 * - Replaces the direct object in the relative clause
 * - Can refer to people or things
 * - Elides before a vowel (qu')
 */
export const queExamples = [
  { french: "Le livre que je lis est excellent.", english: "The book (that) I'm reading is excellent.", explanation: "que = direct object (I read the book)" },
  { french: "La personne que j'ai rencontrée est sympa.", english: "The person (whom) I met is nice.", explanation: "que = direct object (I met the person)" },
];

// =============================================================================
// OÙ EXAMPLES
// =============================================================================

/**
 * ouExamples - Examples of où for place and time.
 *
 * Où = place or time
 * - Can mean "where" (place) or "when" (time)
 * - Does not contract or elide
 * - Used for locations and temporal references
 */
export const ouExamples = [
  { french: "Le restaurant où nous avons mangé était cher.", english: "The restaurant where we ate was expensive.", explanation: "où = place" },
  { french: "Le jour où je suis arrivé, il pleuvait.", english: "The day when I arrived, it was raining.", explanation: "où = time" },
];

// =============================================================================
// DONT EXAMPLES
// =============================================================================

/**
 * dontExamples - Examples of dont (de + noun).
 *
 * Dont = of which / about whom / from which
 * - Replaces "de + noun" constructions
 * - Common with verbs: parler de, se souvenir de, avoir besoin de
 * - Refers to people or things
 */
export const dontExamples = [
  { french: "Voici le livre dont je t'ai parlé.", english: "Here's the book (that) I told you about.", explanation: "dont = de + thing (parler de)" },
  { french: "C'est une personne dont je me souviens.", english: "It's a person (whom) I remember.", explanation: "dont = de + thing/person (se souvenir de)" },
];

// =============================================================================
// PRONOUN COMPARISON
// =============================================================================

/**
 * pronounComparison - Side-by-side comparison of all relative pronouns.
 *
 * Quick reference table:
 * - qui: subject (does the action)
 * - que: direct object (receives the action)
 * - où: place or time
 * - dont: with de (about/of/from)
 */
export const pronounComparison = [
  { pronoun: "qui", usage: "Subject (does the action)", example: "Le chien qui aboie" },
  { pronoun: "que", usage: "Direct object (receives the action)", example: "Le chien que je vois" },
  { pronoun: "où", usage: "Place or time", example: "La maison où j'habite" },
  { pronoun: "dont", usage: "With de (about/of/from)", example: "L'histoire dont je parle" },
];

// =============================================================================
// SENTENCE JOINING STEPS
// =============================================================================

/**
 * sentenceJoiningSteps - Examples of how to join sentences with relative pronouns.
 *
 * Shows transformation from two simple sentences to one complex sentence:
 * - Step 1: Two separate sentences
 * - Step 2: Joined with relative pronoun
 * - Explanation: Which pronoun and why
 */
export const sentenceJoiningSteps = [
  {
    step1: "J'ai un ami. Mon ami habite à Paris.",
    step2: "J'ai un ami qui habite à Paris.",
    explanation: "qui replaces 'mon ami' as subject",
  },
  {
    step1: "Je lis un livre. Le livre est intéressant.",
    step2: "Je lis un livre qui est intéressant.",
    explanation: "qui replaces 'le livre' as subject",
  },
  {
    step1: "C'est un film. J'ai vu ce film.",
    step2: "C'est un film que j'ai vu.",
    explanation: "que replaces 'ce film' as object",
  },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors learners make with relative pronouns.
 *
 * Common errors:
 * - Confusing qui and que (subject vs object)
 * - Forgetting to use dont with de-verbs
 * - Incorrect pronoun choice
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "L'homme que parle est professeur.", correct: "L'homme qui parle est professeur.", explanation: "Use qui when the pronoun is the subject (he speaks)." },
  { wrong: "Le livre qui je lis est bon.", correct: "Le livre que je lis est bon.", explanation: "Use que when the pronoun is the object (I read it)." },
  { wrong: "Le sujet je pense est difficile.", correct: "Le sujet dont je pense est difficile.", explanation: "Penser takes de, so use dont." },
  { wrong: "La maison que je visite est grande.", correct: "La maison que je visite est grande.", note: "This is actually correct! But où could also work depending on meaning.", explanation: "Visiter takes a direct object, so use que." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 3.
 *
 * Topics covered:
 * - qui (1, 5, 11): Subject pronoun
 * - que (2, 6, 12): Direct object pronoun
 * - dont (3, 7-8, 14): De + noun pronoun
 * - ou (4, 9-10, 15): Place/time pronoun
 * - sentence-joining (5-6, 14): Joining sentences
 * - mistakes (11-12): Correct vs incorrect usage
 * - comparison (13): Comparing pronouns
 * - mixed (15): Mixed usage
 *
 * Each question has:
 * - id: unique identifier
 * - topic: category for grouping
 * - prompt: question text
 * - options: array of 3 possible answers
 * - correct: index of correct option (0-2)
 * - explanation: detailed explanation of answer
 */
export const practiceQuestions = [
  { id: 1, topic: "qui", prompt: "Which pronoun replaces a subject?", options: ["qui", "que", "où"], correct: 0, explanation: "Qui is used when the pronoun is the subject of the clause." },
  { id: 2, topic: "que", prompt: "Which pronoun replaces a direct object?", options: ["qui", "que", "dont"], correct: 1, explanation: "Que is used when the pronoun is the direct object." },
  { id: 3, topic: "dont", prompt: "Which pronoun is used with verbs taking 'de'?", options: ["qui", "que", "dont"], correct: 2, explanation: "Dont replaces de + noun." },
  { id: 4, topic: "ou", prompt: "Which pronoun is used for place and time?", options: ["où", "que", "qui"], correct: 0, explanation: "Où is used for both place and time." },
  { id: 5, topic: "sentence-joining", prompt: "Join: 'J'ai un chat. Mon chat est noir.'", options: ["J'ai un chat qui est noir.", "J'ai un chat que est noir.", "J'ai un chat où est noir."], correct: 0, explanation: "Use qui for the subject (the cat is black)." },
  { id: 6, topic: "sentence-joining", prompt: "Join: 'C'est un film. J'aime ce film.'", options: ["C'est un film que j'aime.", "C'est un film qui j'aime.", "C'est un film dont j'aime."], correct: 0, explanation: "Use que for the direct object (I love the film)." },
  { id: 7, topic: "dont", prompt: "Complete: Le livre _____ je parle est intéressant.", options: ["dont", "que", "qui"], correct: 0, explanation: "Parler de → use dont." },
  { id: 8, topic: "dont", prompt: "Complete: La personne _____ je me souviens est Marie.", options: ["dont", "que", "qui"], correct: 0, explanation: "Se souvenir de → use dont." },
  { id: 9, topic: "ou", prompt: "Complete: C'est la ville _____ je suis né.", options: ["où", "que", "qui"], correct: 0, explanation: "Où is used for place (where)." },
  { id: 10, topic: "ou", prompt: "Complete: Le jour _____ nous avons gagné était spécial.", options: ["où", "que", "qui"], correct: 0, explanation: "Où is used for time (when)." },
  { id: 11, topic: "mistakes", prompt: "Which is correct?", options: ["L'homme qui parle est professeur.", "L'homme que parle est professeur.", "L'homme dont parle est professeur."], correct: 0, explanation: "Qui is the subject (he speaks)." },
  { id: 12, topic: "mistakes", prompt: "Which is correct?", options: ["Le film que j'ai vu était bon.", "Le film qui j'ai vu était bon.", "Le film où j'ai vu était bon."], correct: 0, explanation: "Que is the object (I saw the film)." },
  { id: 13, topic: "comparison", prompt: "What's the difference between 'qui' and 'que'?", options: ["Subject vs object", "Place vs time", "Person vs thing"], correct: 0, explanation: "Qui = subject, que = direct object." },
  { id: 14, topic: "sentence-joining", prompt: "Join: 'C'est un ami. Je parle souvent de cet ami.'", options: ["C'est un ami dont je parle souvent.", "C'est un ami que je parle souvent.", "C'est un ami où je parle souvent."], correct: 0, explanation: "Parler de → use dont." },
  { id: 15, topic: "mixed", prompt: "Which pronoun is correct here: 'Le restaurant _____ nous avons dîné'?", options: ["où", "que", "qui"], correct: 0, explanation: "Où is used for place (where we dined)." },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focus on qui vs que distinction
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Relative pronouns take practice. Focus on subject vs object to choose between qui and que.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting better at choosing the right pronoun. Review dont and où once more.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using relative pronouns well. This skill is essential for complex sentences.", emoji: "🎉", color: "green" as const };
}
