/**
 * B1 Lesson 9 - Futur Antérieur (Future Perfect)
 * ==================================================
 *
 * This file contains all lesson data for B1 Lesson 9, teaching the futur antérieur
 * used to express actions that will have been completed before another future action.
 *
 * **Lesson Content:**
 * - What is the futur antérieur (future perfect)
 * - Formation: future tense of auxiliary + past participle
 * - Avoir and être auxiliaries in future tense
 * - Usage cases: completed before future, hypothesis about past, independent action
 * - Examples comparing futur vs futur antérieur
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Futur antérieur = future auxiliary + past participle
 * - Used when an action will be completed before another future action
 * - English equivalent: "will have + past participle"
 * - Agreement required with être verbs
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. whatIs - Definition and explanation of futur antérieur
 * 4. formationRules - How to form the futur antérieur
 * 5. avoirEtre - Auxiliary verbs in future tense
 * 6. usageCases - Different usage scenarios
 * 7. examples - Examples comparing futur and futur antérieur
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
 * 1. intro - Introduction to futur antérieur
 * 2. what-is - What is the futur antérieur
 * 3. formation - How to form the futur antérieur
 * 4. avoir-etre - Auxiliary verbs in future
 * 5. usage - Usage cases
 * 6. examples - Examples comparing tenses
 * 7. vs-future - Difference from simple future
 * 8. mistakes - Common errors
 * 9. practice - Interactive quiz
 * 10. completion - Lesson completion
 */
export const sectionIds = ["intro", "what-is", "formation", "avoir-etre", "usage", "examples", "vs-future", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Futur Antérieur",
  /** Brief description of lesson content */
  subtitle: "Express actions that will have been completed before another future action.",
  /** Lesson number in B1 series */
  lessonNumber: 9,
};

// =============================================================================
// WHAT IS FUTUR ANTÉRIEUR
// =============================================================================

/**
 * whatIs - Definition and explanation of the futur antérieur.
 *
 * The futur antérieur describes an action that will be completed before another
 * future action. English equivalent: "will have + past participle".
 */
export const whatIs = [
  "The futur antérieur describes an action that will be completed before another future action.",
  "It's the future perfect tense in English: 'will have + past participle'.",
  "Example: 'J'aurai fini avant midi.' (I will have finished before noon)",
];

// =============================================================================
// FORMATION RULES
// =============================================================================

/**
 * formationRules - How to form the futur antérieur.
 *
 * Pattern: Future tense of auxiliary (avoir/être) + past participle
 * - Avoir future: j'aurai, tu auras, il aura, nous aurons
 * - Être future: je serai, tu seras, il sera, nous serons
 * - Agreement applies for être verbs
 */
export const formationRules = [
  "Take the future tense of avoir or être",
  "Add the past participle of the main verb",
  "Agreement rules apply for être verbs",
];

// =============================================================================
// AVOIR AND ÊTRE AUXILIARIES
// =============================================================================

/**
 * avoirEtre - The auxiliary verbs avoir and être in future tense.
 *
 * Avoir future forms:
 * - j'aurai, tu auras, il aura, nous aurons, vous aurez, ils auront
 *
 * Être future forms:
 * - je serai, tu seras, il sera, nous serons, vous serez, ils seront
 */
export const avoirEtre = [
  { auxiliary: "avoir", je: "j'aurai", tu: "tu auras", il: "il aura", nous: "nous aurons" },
  { auxiliary: "être", je: "je serai", tu: "tu seras", il: "il sera", nous: "nous serons" },
];

// =============================================================================
// USAGE CASES
// =============================================================================

/**
 * usageCases - Different scenarios for using the futur antérieur.
 *
 * Cases:
 * - Completed before future: action completed before another future action
 * - Hypothesis about past: supposition about something already happened (Il aura oublié)
 * - Independent action: completed action by a specific future time
 */
export const usageCases = [
  { case: "Completed before future", example: "Quand tu arriveras, j'aurai fini.", explanation: "I will have finished before you arrive" },
  { case: "Hypothesis about past", example: "Il aura oublié.", explanation: "He must have forgotten (supposition)" },
  { case: "Independent action", example: "Dans deux ans, j'aurai fini mes études.", explanation: "In two years, I will have completed my studies" },
];

// =============================================================================
// EXAMPLES
// =============================================================================

/**
 * examples - Comparison of futur simple and futur antérieur.
 *
 * Shows the difference between:
 * - Futur simple: Je finirai (I will finish)
 * - Futur antérieur: J'aurai fini (I will have finished)
 */
export const examples = [
  { futur: "Je finirai mon travail.", futurAnt: "J'aurai fini mon travail avant 18h.", explanation: "Simple future vs completed before a time" },
  { futur: "Elle partira.", futurAnt: "Elle sera déjà partie quand nous arriverons.", explanation: "Future vs completed before another action" },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors with the futur antérieur.
 *
 * Common errors:
 * - Using simple future when futur antérieur is needed
 * - Not using futur antérieur for completed future actions
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Quand tu viendras, je finirai.", correct: "Quand tu viendras, j'aurai fini.", explanation: "If you want to say you'll be done by the time someone comes, use futur antérieur." },
  { wrong: "Dans un an, je finis mes études.", correct: "Dans un an, j'aurai fini mes études.", explanation: "For completed future actions, use futur antérieur." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 9.
 *
 * Topics covered:
 * - what-is (1): Definition of futur antérieur
 * - formation (2): How to form the futur antérieur
 * - avoir (3): Avoir auxiliary in future
 * - etre (4): Être auxiliary in future
 * - usage (5, 7, 12, 14): Contextual usage
 * - meaning (6, 13): Understanding meanings
 * - mistakes (8): Common errors
 * - auxiliary (9-10): Choosing correct auxiliary
 * - agreement (11): Participle agreement
 * - vs-future (13): Difference from simple future
 * - time (15): Time expressions
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
  { id: 1, topic: "what-is", prompt: "What does futur antérieur express?", options: ["Future action completed before another", "Simple future", "Past action"], correct: 0, explanation: "Futur antérieur = action completed before another future action." },
  { id: 2, topic: "formation", prompt: "How is futur antérieur formed?", options: ["Future auxiliary + past participle", "Present auxiliary + past participle", "Conditional auxiliary + past participle"], correct: 0, explanation: "Take avoir/être in future + past participle." },
  { id: 3, topic: "avoir", prompt: "What is the future of avoir for 'je'?", options: ["j'aurai", "j'aurais", "j'ai"], correct: 0, explanation: "J'aurai is the future of avoir." },
  { id: 4, topic: "etre", prompt: "What is the future of être for 'nous'?", options: ["nous serons", "nous serions", "nous sommes"], correct: 0, explanation: "Nous serons is the future of être." },
  { id: 5, topic: "usage", prompt: "Complete: Quand tu arriveras, je _____ (finir).", options: ["j'aurai fini", "je finirai", "je finis"], correct: 0, explanation: "Use futur antérieur for completed action before another future action." },
  { id: 6, topic: "meaning", prompt: "What does 'J'aurai fini avant midi' mean?", options: ["I will have finished before noon", "I will finish before noon", "I have finished before noon"], correct: 0, explanation: "Futur antérieur = will have finished." },
  { id: 7, topic: "usage", prompt: "Which expresses hypothesis about the past?", options: ["Il aura oublié.", "Il oubliera.", "Il oublie."], correct: 0, explanation: "Futur antérieur can express supposition about something already happened." },
  { id: 8, topic: "mistakes", prompt: "Which is correct for completed future?", options: ["Dans un an, j'aurai fini.", "Dans un an, je finis.", "Dans un an, je finirai."], correct: 0, explanation: "Futur antérieur for completed action in the future." },
  { id: 9, topic: "auxiliary", prompt: "Which auxiliary does 'manger' use in futur antérieur?", options: ["avoir", "être", "Either"], correct: 0, explanation: "Most verbs use avoir in compound tenses." },
  { id: 10, topic: "auxiliary", prompt: "Which auxiliary does 'arriver' use in futur antérieur?", options: ["être", "avoir", "Either"], correct: 0, explanation: "Arriver uses être in compound tenses." },
  { id: 11, topic: "agreement", prompt: "Does 'elle sera arrivée' need agreement?", options: ["Yes, -e added", "No agreement", "Only sometimes"], correct: 0, explanation: "With être and feminine subject, add -e." },
  { id: 12, topic: "meaning", prompt: "What does 'Quand tu arriveras, j'aurai fini' mean?", options: ["When you arrive, I will have finished", "When you arrive, I will finish", "When you arrived, I finished"], correct: 0, explanation: "Futur antérieur shows completion before the future arrival." },
  { id: 13, topic: "vs-future", prompt: "What's the difference between 'je finirai' and 'j'aurai fini'?", options: ["Simple future vs completed future", "Present vs past", "Singular vs plural"], correct: 0, explanation: "Je finirai = I will finish. J'aurai fini = I will have finished." },
  { id: 14, topic: "usage", prompt: "Complete: Elle _____ (partir) avant nous.", options: ["sera partie", "partira", "aurait parti"], correct: 0, explanation: "Partir uses être: sera partie (futur antérieur)." },
  { id: 15, topic: "time", prompt: "What time expression often accompanies futur antérieur?", options: ["Quand...", "Hier", "Avant-hier"], correct: 0, explanation: "Quand + future clause often triggers futur antérieur in the main clause." },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focus on avoir/être forms + participles
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates futur antérieur mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Futur antérieur is about sequence of future events. Review avoir/être in future + past participles.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're understanding futur antérieur. Focus on when to use it vs simple future.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using futur antérieur well. This tense shows sophisticated future planning.", emoji: "🎉", color: "green" as const };
}
