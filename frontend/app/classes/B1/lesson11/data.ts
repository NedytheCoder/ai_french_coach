/**
 * B1 Lesson 11 - All Relative Pronouns (Les Pronoms Relatifs)
 * ============================================================
 *
 * This file contains all lesson data for B1 Lesson 11, teaching the complete
 * set of French relative pronouns for constructing complex sentences.
 *
 * **Lesson Content:**
 * - Qui: Subject pronoun (who/which/that)
 * - Que: Direct object pronoun (whom/which/that)
 * - Où: Place or time (where/when)
 * - Dont: Of which/whose/with de
 * - Lequel forms: After prepositions (lequel/laquelle/lesquels/lesquelles)
 * - Ce qui/Ce que/Ce dont: When no specific antecedent
 * - Quick reference guide for choosing the right pronoun
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Qui = subject (followed by verb)
 * - Que = direct object (followed by subject + verb)
 * - Où = place or time
 * - Dont = replaces de + noun
 * - Lequel = after prepositions (avec lequel, sur laquelle)
 * - Ce qui/ce que/ce dont = when no specific noun antecedent
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. quiSummary - Qui usage and examples
 * 4. queSummary - Que usage and examples
 * 5. ouSummary - Où usage and examples
 * 6. dontSummary - Dont usage and examples
 * 7. lequelForms - Lequel/laquelle/lesquels/lesquelles
 * 8. ceQuiCeQue - Ce qui/ce que/ce dont usage
 * 9. quickReference - Quick decision guide
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
 * 2. qui - Subject pronoun
 * 3. que - Direct object pronoun
 * 4. ou - Place/time pronoun
 * 5. dont - Of which/whose
 * 6. lequel - After prepositions
 * 7. ce-qui-que - No antecedent forms
 * 8. summary - Quick reference
 * 9. practice - Interactive quiz
 * 10. completion - Lesson completion
 */
export const sectionIds = ["intro", "qui", "que", "ou", "dont", "lequel", "ce-qui-que", "summary", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "All Relative Pronouns",
  /** Brief description of lesson content */
  subtitle: "Master the complete set of French relative pronouns for complex sentences.",
  /** Lesson number in B1 series */
  lessonNumber: 11,
};

// =============================================================================
// QUI - SUBJECT PRONOUN
// =============================================================================

/**
 * quiSummary - The relative pronoun "qui" as subject.
 *
 * Usage: Subject (who/which/that)
 * Key tip: Qui is followed by a verb
 * Examples: L'homme qui parle, Le livre qui est sur la table
 */
export const quiSummary = {
  usage: "Subject (who/which/that)",
  examples: ["L'homme qui parle", "Le livre qui est sur la table"],
  tip: "Qui is followed by a verb",
};

// =============================================================================
// QUE - DIRECT OBJECT PRONOUN
// =============================================================================

/**
 * queSummary - The relative pronoun "que" as direct object.
 *
 * Usage: Direct object (whom/which/that)
 * Key tip: Que is followed by subject + verb
 * Examples: Le livre que je lis, La personne que j'ai vue
 */
export const queSummary = {
  usage: "Direct object (whom/which/that)",
  examples: ["Le livre que je lis", "La personne que j'ai vue"],
  tip: "Que is followed by subject + verb",
};

// =============================================================================
// OÙ - PLACE OR TIME
// =============================================================================

/**
 * ouSummary - The relative pronoun "où" for place or time.
 *
 * Usage: Place or time (where/when)
 * Key tip: For location or time reference
 * Examples: La maison où j'habite, Le jour où je suis arrivé
 */
export const ouSummary = {
  usage: "Place or time (where/when)",
  examples: ["La maison où j'habite", "Le jour où je suis arrivé"],
  tip: "For location or time reference",
};

// =============================================================================
// DONT - OF WHICH/WITH DE
// =============================================================================

/**
 * dontSummary - The relative pronoun "dont" for de constructions.
 *
 * Usage: Of which/whose/with de
 * Key tip: Replaces de + noun
 * Examples: Le livre dont je parle, La personne dont je me souviens
 */
export const dontSummary = {
  usage: "Of which/whose/with de",
  examples: ["Le livre dont je parle", "La personne dont je me souviens"],
  tip: "Replaces de + noun",
};

// =============================================================================
// LEQUEL FORMS
// =============================================================================

/**
 * lequelForms - Lequel/laquelle/lesquels/lesquelles after prepositions.
 *
 * Forms:
 * - lequel: masculine singular (avec lequel)
 * - laquelle: feminine singular (sur laquelle)
 * - lesquels: masculine plural (dans lesquels)
 * - lesquelles: feminine plural (devant lesquelles)
 */
export const lequelForms = [
  { form: "lequel", gender: "masculine singular", example: "Le stylo avec lequel j'écris" },
  { form: "laquelle", gender: "feminine singular", example: "La chaise sur laquelle je suis assis" },
  { form: "lesquels", gender: "masculine plural", example: "Les livres dans lesquels je cherche" },
  { form: "lesquelles", gender: "feminine plural", example: "Les maisons devant lesquelles je passe" },
];

// =============================================================================
// CE QUI / CE QUE / CE DONT
// =============================================================================

/**
 * ceQuiCeQue - When no specific antecedent exists.
 *
 * Forms:
 * - ce qui: subject (what/which) - Ce qui me surprend...
 * - ce que: direct object (what) - Ce que je veux...
 * - ce dont: with de (what/about which) - Ce dont je parle...
 */
export const ceQuiCeQue = [
  { pronoun: "ce qui", usage: "Subject (what/which)", example: "Ce qui me surprend, c'est sa réaction.", explanation: "When no specific antecedent, use ce qui as subject" },
  { pronoun: "ce que", usage: "Direct object (what)", example: "Ce que je veux, c'est la vérité.", explanation: "When no specific antecedent, use ce que as object" },
  { pronoun: "ce dont", usage: "With de (what/about which)", example: "Ce dont je parle est important.", explanation: "When no specific antecedent with de" },
];

// =============================================================================
// QUICK REFERENCE
// =============================================================================

/**
 * quickReference - Decision guide for choosing the right relative pronoun.
 *
 * Guide:
 * - Subject does action → qui
 * - Receives action → que
 * - Place/time → où
 * - With de → dont
 * - After preposition → lequel/dont
 * - No antecedent → ce qui/ce que/ce dont
 */
export const quickReference = [
  { situation: "Subject does action", pronoun: "qui", example: "Le chat qui dort" },
  { situation: "Receives action", pronoun: "que", example: "Le chat que je vois" },
  { situation: "Place/time", pronoun: "où", example: "La ville où je vis" },
  { situation: "With de", pronoun: "dont", example: "L'homme dont je parle" },
  { situation: "After preposition", pronoun: "lequel/dont", example: "Le stylo avec lequel" },
  { situation: "No antecedent", pronoun: "ce qui/ce que/ce dont", example: "Ce qui est vrai" },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 11.
 *
 * Topics covered:
 * - qui (1): Subject pronoun
 * - que (2): Direct object pronoun
 * - ou (3): Place/time pronoun
 * - dont (4, 12, 15): De constructions
 * - lequel (5-6): After prepositions
 * - ce-qui (7, 14): No antecedent as subject
 * - ce-que (8): No antecedent as object
 * - summary (9-11): Mixed practice
 * - mixed (15): All pronouns
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
  { id: 1, topic: "qui", prompt: "Which pronoun as subject?", options: ["qui", "que", "dont"], correct: 0, explanation: "Qui = subject pronoun" },
  { id: 2, topic: "que", prompt: "Which pronoun as direct object?", options: ["qui", "que", "dont"], correct: 1, explanation: "Que = direct object pronoun" },
  { id: 3, topic: "ou", prompt: "Which for place/time?", options: ["où", "que", "qui"], correct: 0, explanation: "Où = where/when" },
  { id: 4, topic: "dont", prompt: "Which with de verbs?", options: ["dont", "que", "qui"], correct: 0, explanation: "Dont replaces de + noun" },
  { id: 5, topic: "lequel", prompt: "Which after 'avec'?", options: ["lequel", "que", "qui"], correct: 0, explanation: "Lequel follows prepositions" },
  { id: 6, topic: "lequel", prompt: "What is 'laquelle' for?", options: ["Feminine singular", "Masculine singular", "Plural"], correct: 0, explanation: "Laquelle = feminine singular" },
  { id: 7, topic: "ce-qui", prompt: "When to use 'ce qui'?", options: ["No antecedent as subject", "With a specific noun", "As object"], correct: 0, explanation: "Ce qui = what (no antecedent, subject)" },
  { id: 8, topic: "ce-que", prompt: "Complete: _____ je veux, c'est la paix.", options: ["Ce que", "Ce qui", "Ce dont"], correct: 0, explanation: "Ce que = what (object)" },
  { id: 9, topic: "summary", prompt: "Complete: Le livre _____ est sur la table est à moi.", options: ["qui", "que", "dont"], correct: 0, explanation: "Qui as subject (the book is on the table)" },
  { id: 10, topic: "summary", prompt: "Complete: Le livre _____ je lis est intéressant.", options: ["que", "qui", "dont"], correct: 0, explanation: "Que as object (I read the book)" },
  { id: 11, topic: "summary", prompt: "Complete: La maison _____ j'habite est vieille.", options: ["où", "que", "qui"], correct: 0, explanation: "Où for place (where I live)" },
  { id: 12, topic: "dont", prompt: "Complete: L'histoire _____ il parle est vraie.", options: ["dont", "que", "qui"], correct: 0, explanation: "Parler de → dont" },
  { id: 13, topic: "lequel", prompt: "Complete: Le stylo _____ j'écris est rouge.", options: ["avec lequel", "avec que", "avec qui"], correct: 0, explanation: "Lequel follows prepositions like avec" },
  { id: 14, topic: "ce-qui", prompt: "Complete: _____ m'intéresse, c'est l'art.", options: ["Ce qui", "Ce que", "Ce dont"], correct: 0, explanation: "Ce qui as subject (what interests me)" },
  { id: 15, topic: "mixed", prompt: "Complete: C'est la personne _____ je pense souvent.", options: ["dont", "que", "qui"], correct: 0, explanation: "Penser de → dont" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focus on subject vs object and lequel forms
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates relative pronoun mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Relative pronouns are complex. Focus on subject vs object and the lequel forms.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting all the relative pronouns. Review ce qui/ce que/ce dont once more.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You know all the relative pronouns! This allows you to build very complex sentences.", emoji: "🎉", color: "green" as const };
}
