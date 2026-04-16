/**
 * B1 Lesson 2 - Subjunctive Mood Basics (Le Subjonctif)
 * ======================================================
 *
 * This file contains all lesson data for B1 Lesson 2, introducing the French
 * subjunctive mood used to express uncertainty, desire, emotion, or necessity.
 *
 * **Lesson Content:**
 * - What is the subjunctive and when to use it
 * - Trigger phrases that require subjunctive (il faut que, je veux que, etc.)
 * - Formation rules (ils form -ent + subjunctive endings)
 * - Common regular and irregular verbs
 * - Subjunctive vs indicative distinction
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Subjunctive expresses doubt, desire, emotion, necessity
 * - Often appears in dependent clauses introduced by "que"
 * - Formation: ils form -ent + endings (-e, -es, -e, -ions, -iez, -ent)
 * - Trigger phrases: il faut que, je veux que, bien que, pour que, avant que
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. whatIsSubjunctive - Explanation of subjunctive concept
 * 4. triggerPhrases - Phrases that trigger subjunctive
 * 5. formationRules - How to form the subjunctive
 * 6. regularExamples - Regular verb conjugations
 * 7. irregularSubjunctives - Irregular verb conjugations
 * 8. subjunctiveVsIndicative - Comparison between moods
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
 * 1. intro - Introduction to subjunctive
 * 2. what-is-subjunctive - Understanding the subjunctive mood
 * 3. triggers - Trigger phrases that require subjunctive
 * 4. formation - How to form the subjunctive
 * 5. common-verbs - Regular and irregular verb examples
 * 6. vs-indicative - Subjunctive vs indicative distinction
 * 7. mistakes - Common errors
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "what-is-subjunctive", "triggers", "formation", "common-verbs", "vs-indicative", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Subjunctive Mood Basics",
  /** Brief description of lesson content */
  subtitle: "Learn when and why French uses the subjunctive mood.",
  /** Lesson number in B1 series */
  lessonNumber: 2,
};

// =============================================================================
// WHAT IS SUBJUNCTIVE
// =============================================================================

/**
 * whatIsSubjunctive - Key concepts explaining the subjunctive mood.
 *
 * The subjunctive is used to express:
 * - Uncertainty and doubt
 * - Desire and will
 * - Emotion and feelings
 * - Necessity and obligation
 */
export const whatIsSubjunctive = [
  "The subjunctive expresses uncertainty, desire, emotion, or necessity.",
  "It often appears in dependent clauses introduced by 'que'.",
  "At B1 level, focus on recognizing and beginning to produce it.",
];

// =============================================================================
// TRIGGER PHRASES
// =============================================================================

/**
 * triggerPhrases - Common phrases that require the subjunctive mood.
 *
 * Categories:
 * - Necessity: il faut que (it is necessary that)
 * - Will/Desire: je veux que (I want that)
 * - Importance: il est important que (it is important that)
 * - Concession: bien que (although)
 * - Purpose: pour que (so that)
 * - Time: avant que (before)
 */
export const triggerPhrases = [
  { phrase: "il faut que", english: "it is necessary that", example: "Il faut que tu viennes.", exampleEnglish: "You must come." },
  { phrase: "je veux que", english: "I want that", example: "Je veux que tu réussisses.", exampleEnglish: "I want you to succeed." },
  { phrase: "il est important que", english: "it is important that", example: "Il est important que nous soyons ponctuels.", exampleEnglish: "It is important that we be punctual." },
  { phrase: "bien que", english: "although", example: "Bien qu'il pleuve, nous sortons.", exampleEnglish: "Although it is raining, we are going out." },
  { phrase: "pour que", english: "so that", example: "Je parle lentement pour que tu comprennes.", exampleEnglish: "I speak slowly so that you understand." },
  { phrase: "avant que", english: "before", example: "Viens avant qu'il parte.", exampleEnglish: "Come before he leaves." },
];

// =============================================================================
// FORMATION RULES
// =============================================================================

/**
 * formationRules - How to form the subjunctive for regular verbs.
 *
 * Pattern: Take the ils form of the present indicative, drop -ent, add endings
 * Endings: -e, -es, -e, -ions, -iez, -ent
 */
export const formationRules = [
  "Take the ils form of the present indicative, drop -ent, add subjunctive endings.",
  "Endings: -e, -es, -e, -ions, -iez, -ent",
];

// =============================================================================
// REGULAR EXAMPLES
// =============================================================================

/**
 * regularExamples - Regular verb conjugations in the subjunctive.
 *
 * Shows formation pattern for -er, -ir, and -re verbs:
 * - parler: parlent → parl- + endings
 * - finir: finissent → finiss- + endings
 * - vendre: vendent → vend- + endings
 */
export const regularExamples = [
  { infinitive: "parler", ils: "parlent", stem: "parl", je: "je parle", tu: "tu parles" },
  { infinitive: "finir", ils: "finissent", stem: "finiss", je: "je finisse", tu: "tu finisses" },
  { infinitive: "vendre", ils: "vendent", stem: "vend", je: "je vende", tu: "tu vendes" },
];

// =============================================================================
// IRREGULAR SUBJUNCTIVES
// =============================================================================

/**
 * irregularSubjunctives - Irregular verb conjugations in the subjunctive.
 *
 * These common verbs have irregular subjunctive forms that must be memorized:
 * - être: sois, sois, soit, soyons, soyez, soient
 * - avoir: aie, aies, ait, ayons, ayez, aient
 * - aller: aille, ailles, aille, allions, alliez, aillent
 * - faire: fasse, fasses, fasse, fassions, fassiez, fassent
 * - pouvoir: puisse, puisses, puisse, puissions, puissiez, puissent
 * - savoir: sache, saches, sache, sachions, sachiez, sachent
 * - vouloir: veuille, veuilles, veuille, voulions, vouliez, veuillent
 */
export const irregularSubjunctives = [
  { infinitive: "être", je: "sois", tu: "sois", il: "soit", nous: "soyons", vous: "soyez", ils: "soient" },
  { infinitive: "avoir", je: "aie", tu: "aies", il: "ait", nous: "ayons", vous: "ayez", ils: "aient" },
  { infinitive: "aller", je: "aille", tu: "ailles", il: "aille", nous: "allions", vous: "alliez", ils: "aillent" },
  { infinitive: "faire", je: "fasse", tu: "fasses", il: "fasse", nous: "fassions", vous: "fassiez", ils: "fassent" },
  { infinitive: "pouvoir", je: "puisse", tu: "puisses", il: "puisse", nous: "puissions", vous: "puissiez", ils: "puissent" },
  { infinitive: "savoir", je: "sache", tu: "saches", il: "sache", nous: "sachions", vous: "sachiez", ils: "sachent" },
  { infinitive: "vouloir", je: "veuille", tu: "veuilles", il: "veuille", nous: "voulions", vous: "vouliez", ils: "veuillent" },
];

// =============================================================================
// SUBJUNCTIVE VS INDICATIVE
// =============================================================================

/**
 * subjunctiveVsIndicative - Comparison of when to use each mood.
 *
 * Use Indicative for:
 * - Facts and certainty (Je sais que...)
 * - Statements (Il dit que...)
 *
 * Use Subjunctive for:
 * - Doubt and uncertainty (Je doute que...)
 * - Will and desire (Je veux que...)
 */
export const subjunctiveVsIndicative = [
  { context: "Certainty / Fact", mood: "Indicative", example: "Je sais qu'il est là." },
  { context: "Doubt / Uncertainty", mood: "Subjunctive", example: "Je doute qu'il soit là." },
  { context: "Statement", mood: "Indicative", example: "Il dit qu'il vient." },
  { context: "Will / Desire", mood: "Subjunctive", example: "Je veux qu'il vienne." },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors learners make with the subjunctive.
 *
 * Common errors:
 * - Using indicative after expressions of will
 * - Confusing être forms (suis vs sois)
 * - Forgetting bien que requires subjunctive
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Je veux que tu viens.", correct: "Je veux que tu viennes.", explanation: "After expressions of will, use subjunctive, not indicative." },
  { wrong: "Il faut que je suis prudent.", correct: "Il faut que je sois prudent.", explanation: "Être becomes sois in subjunctive." },
  { wrong: "Bien que je suis fatigué.", correct: "Bien que je sois fatigué.", explanation: "Bien que always triggers subjunctive." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 2.
 *
 * Topics covered:
 * - triggers (1-2, 7, 11): Recognizing subjunctive triggers
 * - formation (3, 9, 14): Forming regular subjunctives
 * - irregulars (4-5, 10, 15): Irregular subjunctive forms
 * - meaning (6, 12): Meaning of conjunctions (pour que, bien que)
 * - vs-indicative (8): When to use subjunctive vs indicative
 * - mistakes (13): Correct vs incorrect usage
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
  { id: 1, topic: "triggers", prompt: "Which phrase triggers the subjunctive?", options: ["Je sais que", "Il faut que", "Il dit que"], correct: 1, explanation: "Il faut que is a common subjunctive trigger." },
  { id: 2, topic: "triggers", prompt: "Which conjunction requires subjunctive?", options: ["Parce que", "Bien que", "Quand"], correct: 1, explanation: "Bien que (although) always triggers subjunctive." },
  { id: 3, topic: "formation", prompt: "What is the subjunctive of 'parler' for 'je'?", options: ["je parle", "je parlais", "je parlerai"], correct: 0, explanation: "Je parle is both present indicative and subjunctive for parler." },
  { id: 4, topic: "irregulars", prompt: "What is the subjunctive of 'être' for 'je'?", options: ["je suis", "je sois", "je soit"], correct: 1, explanation: "Je sois is the subjunctive of être." },
  { id: 5, topic: "irregulars", prompt: "What is the subjunctive of 'avoir' for 'nous'?", options: ["nous avons", "nous ayons", "nous ayez"], correct: 1, explanation: "Nous ayons is the subjunctive of avoir." },
  { id: 6, topic: "meaning", prompt: "What does 'pour que' mean?", options: ["because", "so that", "although"], correct: 1, explanation: "Pour que means so that and triggers subjunctive." },
  { id: 7, topic: "triggers", prompt: "Which phrase expresses desire and requires subjunctive?", options: ["Je veux que", "Je crois que", "Je pense que"], correct: 0, explanation: "Je veux que expresses will and requires subjunctive." },
  { id: 8, topic: "vs-indicative", prompt: "When do you use subjunctive instead of indicative?", options: ["For facts", "For doubt/desire", "For past events"], correct: 1, explanation: "Use subjunctive for doubt, desire, emotion, or necessity." },
  { id: 9, topic: "formation", prompt: "Complete: Il faut que tu _____ (finir).", options: ["finis", "finisses", "finisse"], correct: 2, explanation: "Il faut que tu finisse uses the subjunctive." },
  { id: 10, topic: "irregulars", prompt: "What is the subjunctive of 'faire' for 'il'?", options: ["il fait", "il fasse", "il faise"], correct: 1, explanation: "Il fasse is the subjunctive of faire." },
  { id: 11, topic: "triggers", prompt: "Which means 'before' and triggers subjunctive?", options: ["Après que", "Avant que", "Pendant que"], correct: 1, explanation: "Avant que triggers subjunctive; après que uses indicative." },
  { id: 12, topic: "meaning", prompt: "What does 'bien que' mean?", options: ["well that", "although", "so that"], correct: 1, explanation: "Bien que means although." },
  { id: 13, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Je veux que tu viens.", "Je veux que tu viennes.", "Je veux tu viennes."], correct: 1, explanation: "Use subjunctive after je veux que." },
  { id: 14, topic: "formation", prompt: "How do you form most regular subjunctives?", options: ["Take ils form, drop -ent, add endings", "Use present tense", "Use imparfait"], correct: 0, explanation: "Take ils form, drop -ent, add subjunctive endings." },
  { id: 15, topic: "irregulars", prompt: "What is the subjunctive of 'savoir' for 'je'?", options: ["je sais", "je sache", "je sache"], correct: 1, explanation: "Je sache is the subjunctive of savoir." },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focus on trigger phrases
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates subjunctive mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The subjunctive is challenging. Focus on recognizing trigger phrases and common irregular forms.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're starting to recognize subjunctive triggers. Review the difference between indicative and subjunctive contexts.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're understanding the subjunctive mood well. This is a major step forward in French grammar.", emoji: "🎉", color: "green" as const };
}
