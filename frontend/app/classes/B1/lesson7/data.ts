/**
 * B1 Lesson 7 - Past Subjunctive (Le Subjonctif Passé)
 * =======================================================
 *
 * This file contains all lesson data for B1 Lesson 7, teaching the past
 * subjunctive used to express completed actions in the subjunctive mood.
 *
 * **Lesson Content:**
 * - When to use past subjunctive vs present subjunctive
 * - Formation: present subjunctive of auxiliary + past participle
 * - Avoir and être auxiliaries in present subjunctive
 * - Regular verb examples with both auxiliaries
 * - Irregular verb forms
 * - Usage examples with explanations
 * - Agreement rules for être verbs
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Use past subjunctive when action is completed before the main clause
 * - Formation: auxiliary (avoir/être in present subjunctive) + past participle
 * - Avoir: j'aie, tu aies, il ait, nous ayons, vous ayez, ils aient
 * - Être: je sois, tu sois, il soit, nous soyons, vous soyez, ils soient
 * - Agreement required with être verbs (gender and number)
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. whenToUse - When to use past subjunctive
 * 4. formationRules - How to form the past subjunctive
 * 5. avoirEtre - Auxiliary verbs in present subjunctive
 * 6. regularExamples - Regular verb examples
 * 7. irregulars - Irregular verb forms
 * 8. usageExamples - Usage in context
 * 9. agreementNote - Agreement rules for être verbs
 * 10. commonMistakes - Common errors to avoid
 * 11. practiceQuestions - 15 quiz questions
 * 12. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to past subjunctive
 * 2. when-to-use - When to use past vs present subjunctive
 * 3. formation - How to form the past subjunctive
 * 4. avoir-etre - Auxiliary verbs in present subjunctive
 * 5. regular-verbs - Regular verb examples
 * 6. irregulars - Irregular verb forms
 * 7. examples - Usage examples
 * 8. mistakes - Common errors
 * 9. practice - Interactive quiz
 * 10. completion - Lesson completion
 */
export const sectionIds = ["intro", "when-to-use", "formation", "avoir-etre", "regular-verbs", "irregulars", "examples", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Past Subjunctive",
  /** Brief description of lesson content */
  subtitle: "Express completed actions in the subjunctive mood.",
  /** Lesson number in B1 series */
  lessonNumber: 7,
};

// =============================================================================
// WHEN TO USE
// =============================================================================

/**
 * whenToUse - Guidelines for when to use the past subjunctive.
 *
 * Key rule: Use past subjunctive when the subjunctive-triggering expression
 * is in the present, but the action in the subjunctive clause happened before now.
 */
export const whenToUse = [
  "When the subjunctive-triggering expression is in the present, but the action in the subjunctive clause happened before now.",
  "Example: 'Je regrette qu'il soit parti.' (I regret that he left - he left before now)",
  "Example: 'Il est bon que tu aies fini.' (It's good that you finished - already done)",
];

// =============================================================================
// FORMATION RULES
// =============================================================================

/**
 * formationRules - How to form the past subjunctive.
 *
 * Pattern: Present subjunctive of auxiliary (avoir/être) + past participle
 * - Use avoir for most verbs
 * - Use être for verbs of movement and reflexive verbs
 * - Agreement rules apply for être verbs
 */
export const formationRules = [
  "Take the present subjunctive of avoir or être",
  "Add the past participle of the main verb",
  "Agreement rules apply for être verbs",
];

// =============================================================================
// AVOIR AND ÊTRE AUXILIARIES
// =============================================================================

/**
 * avoirEtre - The auxiliary verbs avoir and être in present subjunctive.
 *
 * Avoir subjunctive forms:
 * - j'aie, tu aies, il ait, nous ayons, vous ayez, ils aient
 *
 * Être subjunctive forms:
 * - je sois, tu sois, il soit, nous soyons, vous soyez, ils soient
 */
export const avoirEtre = [
  { auxiliary: "avoir", je: "j'aie", tu: "tu aies", il: "il ait", example: "J'aie fini", exampleVerb: "finir" },
  { auxiliary: "être", je: "je sois", tu: "tu sois", il: "il soit", example: "Je sois parti", exampleVerb: "partir" },
];

// =============================================================================
// REGULAR EXAMPLES
// =============================================================================

/**
 * regularExamples - Regular verbs in the past subjunctive.
 *
 * Shows formation with both auxiliaries:
 * - Avoir verbs: parler, finir → que j'aie parlé, que tu aies fini
 * - Être verbs: partir, aller → qu'il soit parti, que nous soyons allés
 */
export const regularExamples = [
  { infinitive: "parler", auxiliary: "avoir", form: "que j'aie parlé", meaning: "that I spoke/have spoken" },
  { infinitive: "finir", auxiliary: "avoir", form: "que tu aies fini", meaning: "that you finished/have finished" },
  { infinitive: "partir", auxiliary: "être", form: "qu'il soit parti", meaning: "that he left/has left" },
  { infinitive: "aller", auxiliary: "être", form: "que nous soyons allés", meaning: "that we went/have gone" },
];

// =============================================================================
// IRREGULAR VERBS
// =============================================================================

/**
 * irregulars - Irregular verbs in the past subjunctive.
 *
 * Examples:
 * - faire: que j'aie fait (avoir)
 * - voir: que tu aies vu (avoir)
 * - venir: qu'il soit venu (être)
 * - naître: qu'elle soit née (être, agrees)
 */
export const irregulars = [
  { infinitive: "faire", form: "que j'aie fait", note: "Uses avoir" },
  { infinitive: "voir", form: "que tu aies vu", note: "Uses avoir" },
  { infinitive: "venir", form: "qu'il soit venu", note: "Uses être" },
  { infinitive: "naître", form: "qu'elle soit née", note: "Uses être, agrees" },
];

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/**
 * usageExamples - Contextual examples of past subjunctive usage.
 *
 * Shows how past subjunctive expresses actions completed before the main clause:
 * - Je suis content que tu aies réussi (success before happiness)
 * - Il est étonnant qu'elle soit partie (departure before surprise)
 */
export const usageExamples = [
  { trigger: "Je suis content", clause: "que tu aies réussi.", explanation: "Success happened before happiness" },
  { trigger: "Il est étonnant", clause: "qu'elle soit partie si tôt.", explanation: "Departure happened before surprise" },
  { trigger: "Je doute", clause: "qu'il ait dit cela.", explanation: "Speech happened before doubt" },
  { trigger: "Il faut", clause: "que vous ayez fini avant midi.", explanation: "Completion required before noon" },
];

// =============================================================================
// AGREEMENT NOTE
// =============================================================================

/**
 * agreementNote - Agreement rules for être verbs in past subjunctive.
 *
 * Rule: The past participle agrees with the subject in gender and number when using être.
 * - Feminine singular: add -e
 * - Masculine plural: add -s
 * - Feminine plural: add -es
 */
export const agreementNote = [
  "With être verbs, the past participle agrees with the subject:",
  "Elle est partie (feminine) → qu'elle soit partie",
  "Ils sont partis (masculine plural) → qu'ils soient partis",
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors with the past subjunctive.
 *
 * Common errors:
 * - Using present subjunctive when action is completed
 * - Forgetting past participle agreement with être
 * - Using wrong auxiliary (avoir vs être)
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Je regrette qu'il part.", correct: "Je regrette qu'il soit parti.", explanation: "Use past subjunctive when the action is completed." },
  { wrong: "Il est bon que tu finisses.", correct: "Il est bon que tu aies fini.", explanation: "If already finished, use past subjunctive." },
  { wrong: "Je suis content qu'elle vienne.", correct: "Je suis content qu'elle soit venue.", explanation: "Use past subjunctive when referring to completed arrival." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 7.
 *
 * Topics covered:
 * - when (1): When to use past subjunctive
 * - formation (2): How to form the past subjunctive
 * - avoir (3): Avoir auxiliary forms
 * - etre (4): Être auxiliary forms
 * - example (5-6, 14): Complete sentences
 * - agreement (7): Participle agreement
 * - auxiliary (8-9): Choosing correct auxiliary
 * - meaning (10, 13): Understanding meanings
 * - mistakes (11-12): Common errors
 * - usage (15): Contextual usage
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
  { id: 1, topic: "when", prompt: "When do you use past subjunctive?", options: ["When action is completed before the main clause", "For future actions", "For habitual actions"], correct: 0, explanation: "Past subjunctive expresses actions completed before the main clause time." },
  { id: 2, topic: "formation", prompt: "How is the past subjunctive formed?", options: ["Present subjunctive of auxiliary + past participle", "Imparfait of auxiliary + past participle", "Passé composé only"], correct: 0, explanation: "Take avoir/être in present subjunctive + past participle." },
  { id: 3, topic: "avoir", prompt: "What is the auxiliary avoir in present subjunctive for 'je'?", options: ["j'aie", "j'ai", "j'avais"], correct: 0, explanation: "J'aie is the present subjunctive of avoir." },
  { id: 4, topic: "etre", prompt: "What is the auxiliary être in present subjunctive for 'nous'?", options: ["nous soyons", "nous sommes", "nous étions"], correct: 0, explanation: "Nous soyons is the present subjunctive of être." },
  { id: 5, topic: "example", prompt: "Complete: Je suis content que tu _____ (finir).", options: ["aies fini", "finisses", "as fini"], correct: 0, explanation: "Past subjunctive: aie (auxiliary) + fini." },
  { id: 6, topic: "example", prompt: "Complete: Il est étonnant qu'elle _____ (partir).", options: ["soit partie", "parte", "est partie"], correct: 0, explanation: "Partir uses être: soit (auxiliary) + partie." },
  { id: 7, topic: "agreement", prompt: "Should there be agreement in 'qu'elles soient parties'?", options: ["Yes, -es added", "No agreement", "Only in spoken French"], correct: 0, explanation: "With être and feminine plural subject, add -es." },
  { id: 8, topic: "auxiliary", prompt: "Which auxiliary does 'faire' use in past subjunctive?", options: ["avoir", "être", "Either"], correct: 0, explanation: "Faire uses avoir in compound tenses." },
  { id: 9, topic: "auxiliary", prompt: "Which auxiliary does 'venir' use in past subjunctive?", options: ["être", "avoir", "Either"], correct: 0, explanation: "Venir uses être in compound tenses." },
  { id: 10, topic: "meaning", prompt: "What does 'que j'aie fini' mean?", options: ["that I finished/have finished", "that I finish", "that I will finish"], correct: 0, explanation: "Past subjunctive = completed action." },
  { id: 11, topic: "mistakes", prompt: "Which is correct for completed action?", options: ["Je regrette qu'il soit parti.", "Je regrette qu'il part.", "Je regrette qu'il parte."], correct: 0, explanation: "Use past subjunctive for completed departure." },
  { id: 12, topic: "mistakes", prompt: "Which is correct?", options: ["Il est bon que tu aies fini.", "Il est bon que tu finisses.", "Il est bon que tu as fini."], correct: 0, explanation: "Use past subjunctive for completed action." },
  { id: 13, topic: "meaning", prompt: "What does 'qu'elle soit venue' mean?", options: ["that she came/has come", "that she comes", "that she will come"], correct: 0, explanation: "Past subjunctive = completed arrival." },
  { id: 14, topic: "formation", prompt: "Complete: Je doute qu'il _____ (dire) la vérité.", options: ["ait dit", "dise", "dit"], correct: 0, explanation: "Past subjunctive of dire: ait + dit." },
  { id: 15, topic: "usage", prompt: "Why use past subjunctive in 'Il faut que vous ayez fini'?", options: ["Completion required before deadline", "Future requirement", "Habitual action"], correct: 0, explanation: "Past subjunctive shows completion is required." },
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
 * - 12-15/15: "Great job" - celebrates past subjunctive mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The past subjunctive combines two complex concepts. Review avoir/être in present subjunctive + past participles.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting the hang of past subjunctive formation. Review être verb agreements once more.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using the past subjunctive well. This is advanced French grammar mastery.", emoji: "🎉", color: "green" as const };
}
