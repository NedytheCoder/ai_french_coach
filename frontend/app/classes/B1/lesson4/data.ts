/**
 * B1 Lesson 4 - Reported Speech (Le Discours Rapporté)
 * =====================================================
 *
 * This file contains all lesson data for B1 Lesson 4, teaching how to report
 * what others say in French (indirect speech / discours rapporté).
 *
 * **Lesson Content:**
 * - Direct vs reported speech comparison
 * - Reporting verbs (dire que, demander si, expliquer que)
 * - Reporting statements with pronoun changes
 * - Reporting questions (yes/no and WH-questions)
 * - Tense consistency rules
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Use "que" for statements, "si" for yes/no questions
 * - Pronouns change: je → il/elle, nous → ils/elles
 * - Remove quotation marks in reported speech
 * - WH-questions keep their question word
 * - Tense may shift when reporting verb is past
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. directVsReported - Comparison of direct and reported speech
 * 4. reportingVerbs - Common verbs for reporting
 * 5. statementExamples - Reporting statements
 * 6. questionExamples - Reporting questions
 * 7. tenseConsistency - Tense change rules
 * 8. commonMistakes - Common errors to avoid
 * 9. practiceQuestions - 15 quiz questions
 * 10. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to reported speech
 * 2. direct-vs-reported - Direct vs reported comparison
 * 3. reporting-statements - How to report statements
 * 4. reporting-questions - How to report questions
 * 5. tense-changes - Tense consistency rules
 * 6. common-verbs - Reporting verbs
 * 7. mistakes - Common errors
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "direct-vs-reported", "reporting-statements", "reporting-questions", "tense-changes", "common-verbs", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Reported Speech",
  /** Brief description of lesson content */
  subtitle: "Learn how to report what others say in French.",
  /** Lesson number in B1 series */
  lessonNumber: 4,
};

// =============================================================================
// DIRECT VS REPORTED
// =============================================================================

/**
 * directVsReported - Side-by-side comparison of direct and reported speech.
 *
 * Shows the transformation from direct speech (with quotation marks)
 * to reported speech (indirect, no quotes).
 */
export const directVsReported = [
  { direct: "Marie dit : 'Je suis fatiguée.'", reported: "Marie dit qu'elle est fatiguée.", explanation: "Change pronouns and sometimes tense" },
  { direct: "Il demande : 'Tu viens ?'", reported: "Il demande si je viens.", explanation: "Use si for yes/no questions" },
];

// =============================================================================
// REPORTING VERBS
// =============================================================================

/**
 * reportingVerbs - Common verbs used for reporting speech.
 *
 * Categories:
 * - Statements: dire que, expliquer que
 * - Questions: demander si, demander pourquoi
 * - Knowledge: savoir si
 */
export const reportingVerbs = [
  { verb: "dire que", english: "say that", example: "Il dit qu'il arrivera demain." },
  { verb: "expliquer que", english: "explain that", example: "Elle explique que c'est difficile." },
  { verb: "demander si", english: "ask if", example: "Je demande s'il va pleuvoir." },
  { verb: "demander pourquoi", english: "ask why", example: "Elle demande pourquoi je suis en retard." },
  { verb: "savoir si", english: "know if", example: "Je ne sais pas si c'est vrai." },
];

// =============================================================================
// STATEMENT EXAMPLES
// =============================================================================

/**
 * statementExamples - Examples of reporting statements.
 *
 * Shows pronoun changes when reporting:
 * - je → il/elle
 * - nous → ils/elles
 */
export const statementExamples = [
  { speaker: "Marie : 'Je suis malade.'", reported: "Marie dit qu'elle est malade.", note: "Pronoun changes: je → elle" },
  { speaker: "Paul : 'Je vais partir.'", reported: "Paul dit qu'il va partir.", note: "Pronoun changes: je → il" },
  { speaker: "Ils : 'Nous avons fini.'", reported: "Ils disent qu'ils ont fini.", note: "Pronoun changes: nous → ils" },
];

// =============================================================================
// QUESTION EXAMPLES
// =============================================================================

/**
 * questionExamples - Examples of reporting questions.
 *
 * Types:
 * - Yes/No questions: use "si"
 * - WH-questions: keep question word (pourquoi, quand, etc.)
 */
export const questionExamples = [
  { direct: "Elle demande : 'Tu aimes le café ?'", reported: "Elle demande si j'aime le café.", type: "Yes/No question → si" },
  { direct: "Il demande : 'Pourquoi es-tu triste ?'", reported: "Il demande pourquoi je suis triste.", type: "WH-question → same word" },
  { direct: "Ils demandent : 'Quand partez-vous ?'", reported: "Ils demandent quand nous partons.", type: "WH-question → quand" },
];

// =============================================================================
// TENSE CONSISTENCY
// =============================================================================

/**
 * tenseConsistency - Rules for tense changes in reported speech.
 *
 * Rules:
 * - Present reporting verb: tense usually stays the same
 * - Past reporting verb: present → imparfait
 */
export const tenseConsistency = [
  { present: "Il dit : 'Je suis fatigué.'", reported: "Il dit qu'il est fatigué.", explanation: "Present → present (no change if reporting verb is present)" },
  { present: "Il a dit : 'Je suis fatigué.'", reported: "Il a dit qu'il était fatigué.", explanation: "Present → imparfait (if reporting verb is past)" },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors in reported speech.
 *
 * Common errors:
 * - Forgetting to use "que"
 * - Using "que" instead of "si" for questions
 * - Not changing pronouns
 * - Keeping quotation marks
 * - Not simplifying questions
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Elle dit je suis fatiguée.", correct: "Elle dit qu'elle est fatiguée.", explanation: "Use que and change pronouns." },
  { wrong: "Il demande que tu viens.", correct: "Il demande si tu viens.", explanation: "Use si for yes/no questions, not que." },
  { wrong: "Elle dit 'je suis fatiguée'.", correct: "Elle dit qu'elle est fatiguée.", explanation: "Remove quotation marks and adjust." },
  { wrong: "Je demande qu'est-ce que tu fais.", correct: "Je demande ce que tu fais.", explanation: "Simplify indirect questions." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 4.
 *
 * Topics covered:
 * - reporting-verbs (1-2, 12): Common reporting verbs
 * - statements (3-4, 14): Reporting statements
 * - questions (5-6, 11, 13): Reporting questions
 * - pronoun-change (7-8): Pronoun transformations
 * - mistakes (9): Common errors
 * - tense (10): Tense consistency
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
  { id: 1, topic: "reporting-verbs", prompt: "Which verb means 'to say that'?", options: ["dire que", "demander si", "savoir que"], correct: 0, explanation: "Dire que means 'to say that'." },
  { id: 2, topic: "reporting-verbs", prompt: "Which phrase is used for yes/no questions?", options: ["demander si", "dire que", "expliquer que"], correct: 0, explanation: "Demander si introduces yes/no questions in reported speech." },
  { id: 3, topic: "statements", prompt: "Convert: Marie dit : 'Je suis fatiguée.'", options: ["Marie dit qu'elle est fatiguée.", "Marie dit je suis fatiguée.", "Marie dit que je suis fatiguée."], correct: 0, explanation: "Change je to elle when reporting." },
  { id: 4, topic: "statements", prompt: "Convert: Paul dit : 'J'ai fini.'", options: ["Paul dit qu'il a fini.", "Paul dit j'ai fini.", "Paul dit que j'ai fini."], correct: 0, explanation: "Change j' to il when reporting." },
  { id: 5, topic: "questions", prompt: "Convert: Elle demande : 'Tu viens ?'", options: ["Elle demande si je viens.", "Elle demande que je viens.", "Elle demande pourquoi je viens."], correct: 0, explanation: "Use si for yes/no questions." },
  { id: 6, topic: "questions", prompt: "Convert: Il demande : 'Pourquoi es-tu en retard ?'", options: ["Il demande pourquoi je suis en retard.", "Il demande si je suis en retard.", "Il demande que je suis en retard."], correct: 0, explanation: "WH-questions keep their question word." },
  { id: 7, topic: "pronoun-change", prompt: "When reporting 'je', what pronoun should you use for a female speaker?", options: ["elle", "il", "je"], correct: 0, explanation: "Je becomes elle when the speaker is female." },
  { id: 8, topic: "pronoun-change", prompt: "When reporting 'nous', what is the typical change?", options: ["ils/elles", "je", "tu"], correct: 0, explanation: "Nous typically becomes ils/elles in reported speech." },
  { id: 9, topic: "mistakes", prompt: "Which is correct?", options: ["Elle dit qu'elle est fatiguée.", "Elle dit je suis fatiguée.", "Elle dit 'je suis fatiguée'."], correct: 0, explanation: "Use que and change pronouns." },
  { id: 10, topic: "tense", prompt: "If the reporting verb is in present tense, what happens to the reported tense?", options: ["Usually stays the same", "Always changes to past", "Always changes to future"], correct: 0, explanation: "If dire is present, the reported tense often stays the same." },
  { id: 11, topic: "questions", prompt: "What word introduces reported yes/no questions?", options: ["si", "que", "pourquoi"], correct: 0, explanation: "Si introduces yes/no questions in reported speech." },
  { id: 12, topic: "reporting-verbs", prompt: "Which means 'to explain that'?", options: ["expliquer que", "dire que", "demander que"], correct: 0, explanation: "Expliquer que means to explain that." },
  { id: 13, topic: "questions", prompt: "Convert: Ils demandent : 'Quand partez-vous ?'", options: ["Ils demandent quand nous partons.", "Ils demandent si nous partons.", "Ils demandent que nous partons."], correct: 0, explanation: "Quand remains in reported speech." },
  { id: 14, topic: "statements", prompt: "What punctuation change happens in reported speech?", options: ["Remove quotation marks", "Add more quotation marks", "Keep everything the same"], correct: 0, explanation: "Remove quotation marks in reported speech." },
  { id: 15, topic: "mixed", prompt: "Which is correct reported speech?", options: ["Elle demande si je suis prêt.", "Elle demande que je suis prêt.", "Elle demande je suis prêt."], correct: 0, explanation: "Use si for yes/no questions." },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focus on pronoun changes and si
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Reported speech takes practice. Focus on pronoun changes and using si for questions.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting better at converting speech. Review tense consistency and question patterns.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're handling reported speech well. This is an important skill for complex communication.", emoji: "🎉", color: "green" as const };
}
