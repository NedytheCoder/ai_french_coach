/**
 * B1 Lesson 10 - Plus-que-parfait Mastery (Le Plus-que-parfait)
 * =============================================================
 *
 * This file contains all lesson data for B1 Lesson 10, teaching the plus-que-parfait
 * (pluperfect/past perfect) used to describe actions completed before other past actions.
 *
 * **Lesson Content:**
 * - What is the plus-que-parfait (pluperfect/past perfect)
 * - Formation: imparfait of auxiliary + past participle
 * - Avoir and être auxiliaries in imparfait
 * - Usage cases: before another past, in si clauses, background information
 * - Examples with context
 * - Comparison with other past tenses (passé composé, imparfait)
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Plus-que-parfait = imparfait auxiliary + past participle
 * - English equivalent: "had + past participle"
 * - Used for actions completed before another past action
 * - Essential for third conditional (Si + plus-que-parfait, conditionnel passé)
 * - Agreement required with être verbs
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. whatIs - Definition and explanation of plus-que-parfait
 * 4. formationRules - How to form the plus-que-parfait
 * 5. avoirEtre - Auxiliary verbs in imparfait
 * 6. usageCases - Different usage scenarios
 * 7. examples - Examples with context
 * 8. vsOtherPast - Comparison with other past tenses
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
 * 1. intro - Introduction to plus-que-parfait
 * 2. what-is - What is the plus-que-parfait
 * 3. formation - How to form the plus-que-parfait
 * 4. avoir-etre - Auxiliary verbs in imparfait
 * 5. usage - Usage cases
 * 6. examples - Examples with context
 * 7. vs-other-past - Comparison with other past tenses
 * 8. mistakes - Common errors
 * 9. practice - Interactive quiz
 * 10. completion - Lesson completion
 */
export const sectionIds = ["intro", "what-is", "formation", "avoir-etre", "usage", "examples", "vs-other-past", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Plus-que-parfait Mastery",
  /** Brief description of lesson content */
  subtitle: "Master the pluperfect for describing actions completed before other past actions.",
  /** Lesson number in B1 series */
  lessonNumber: 10,
};

// =============================================================================
// WHAT IS PLUS-QUE-PARFAIT
// =============================================================================

/**
 * whatIs - Definition and explanation of the plus-que-parfait.
 *
 * The plus-que-parfait describes an action completed before another past action.
 * English equivalent: "had + past participle" (past perfect/pluperfect).
 */
export const whatIs = [
  "The plus-que-parfait describes an action completed before another past action.",
  "It's the 'past perfect' in English: 'had + past participle'.",
  "Example: 'J'avais fini avant son arrivée.' (I had finished before his arrival)",
];

// =============================================================================
// FORMATION RULES
// =============================================================================

/**
 * formationRules - How to form the plus-que-parfait.
 *
 * Pattern: Imparfait of auxiliary (avoir/être) + past participle
 * - Avoir imparfait: j'avais, tu avais, il avait, nous avions
 * - Être imparfait: j'étais, tu étais, il était, nous étions
 * - Agreement applies for être verbs
 */
export const formationRules = [
  "Take the imparfait of avoir or être",
  "Add the past participle of the main verb",
  "Agreement rules apply for être verbs",
];

// =============================================================================
// AVOIR AND ÊTRE AUXILIARIES
// =============================================================================

/**
 * avoirEtre - The auxiliary verbs avoir and être in imparfait.
 *
 * Avoir imparfait forms:
 * - j'avais, tu avais, il avait, nous avions, vous aviez, ils avaient
 *
 * Être imparfait forms:
 * - j'étais, tu étais, il était, nous étions, vous étiez, ils étaient
 */
export const avoirEtre = [
  { auxiliary: "avoir", je: "j'avais", tu: "tu avais", il: "il avait", nous: "nous avions" },
  { auxiliary: "être", je: "j'étais", tu: "tu étais", il: "il était", nous: "nous étions" },
];

// =============================================================================
// USAGE CASES
// =============================================================================

/**
 * usageCases - Different scenarios for using the plus-que-parfait.
 *
 * Cases:
 * - Before another past: action completed before another past action
 * - In si clauses: third conditional (Si + plus-que-parfait, conditionnel passé)
 * - Background information: explaining cause before effect in past
 */
export const usageCases = [
  { case: "Before another past", example: "Quand je suis arrivé, il avait déjà mangé.", explanation: "He had eaten before I arrived" },
  { case: "In si clauses", example: "Si j'avais su, je serais venu.", explanation: "Third conditional with past conditional" },
  { case: "Background information", example: "Elle était fatiguée parce qu'elle avait travaillé toute la nuit.", explanation: "Explaining why (worked all night → tired)" },
];

// =============================================================================
// EXAMPLES
// =============================================================================

/**
 * examples - Plus-que-parfait examples with context.
 *
 * Shows how plus-que-parfait is used with context to show sequence:
 * - J'avais déjà fini (when he called)
 * - Elle avait perdu ses clés (so she couldn't get in)
 */
export const examples = [
  { plusQueParfait: "J'avais déjà fini.", context: "When he called me", explanation: "Finished before the call" },
  { plusQueParfait: "Elle avait perdu ses clés.", context: "So she couldn't get in", explanation: "Lost keys before trying to enter" },
  { plusQueParfait: "Nous étions partis.", context: "When they arrived", explanation: "Left before their arrival" },
];

// =============================================================================
// VS OTHER PAST TENSES
// =============================================================================

/**
 * vsOtherPast - Comparison of passé composé, imparfait, and plus-que-parfait.
 *
 * Comparison:
 * - Passé composé: Completed action in past (I ate)
 * - Imparfait: Ongoing/background in past (I was eating)
 * - Plus-que-parfait: Before another past (I had eaten)
 */
export const vsOtherPast = [
  { tense: "Passé composé", when: "Completed action in past", example: "J'ai mangé.", time: "I ate (at a specific time)" },
  { tense: "Imparfait", when: "Ongoing/background in past", example: "Je mangeais.", time: "I was eating (ongoing)" },
  { tense: "Plus-que-parfait", when: "Before another past", example: "J'avais mangé.", time: "I had eaten (before something else)" },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors with the plus-que-parfait.
 *
 * Common errors:
 * - Using passé composé when plus-que-parfait is needed for first action
 * - Using wrong tense in third conditional si clause
 * - Not recognizing cause-effect sequence requires plus-que-parfait
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Quand je suis arrivé, il a déjà mangé.", correct: "Quand je suis arrivé, il avait déjà mangé.", explanation: "Use plus-que-parfait for the action that happened first." },
  { wrong: "Si j'ai su, je serais venu.", correct: "Si j'avais su, je serais venu.", explanation: "Third conditional requires plus-que-parfait after si." },
  { wrong: "Elle était fatiguée parce qu'elle a travaillé.", correct: "Elle était fatiguée parce qu'elle avait travaillé.", explanation: "The working happened before the fatigue." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 10.
 *
 * Topics covered:
 * - what-is (1): Definition of plus-que-parfait
 * - formation (2): How to form the plus-que-parfait
 * - avoir (3): Avoir auxiliary in imparfait
 * - etre (4): Être auxiliary in imparfait
 * - usage (5, 13): Contextual usage
 * - meaning (6, 14): Understanding meanings
 * - si-clauses (7-8): Third conditional patterns
 * - auxiliary (9-10): Choosing correct auxiliary
 * - agreement (11): Participle agreement
 * - vs-passe (12): Difference from passé composé
 * - context (13): Cause-effect relationships
 * - mistakes (15): Common errors
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
  { id: 1, topic: "what-is", prompt: "What does plus-que-parfait express?", options: ["Action completed before another past action", "Simple past", "Future action"], correct: 0, explanation: "Plus-que-parfait = had done something before another past event." },
  { id: 2, topic: "formation", prompt: "How is plus-que-parfait formed?", options: ["Imparfait auxiliary + past participle", "Present auxiliary + past participle", "Passé simple + past participle"], correct: 0, explanation: "Take avoir/être in imparfait + past participle." },
  { id: 3, topic: "avoir", prompt: "What is the imparfait of avoir for 'je'?", options: ["j'avais", "j'ai", "j'aurais"], correct: 0, explanation: "J'avais is the imparfait of avoir." },
  { id: 4, topic: "etre", prompt: "What is the imparfait of être for 'nous'?", options: ["nous étions", "nous sommes", "nous serions"], correct: 0, explanation: "Nous étions is the imparfait of être." },
  { id: 5, topic: "usage", prompt: "Complete: Quand je suis arrivé, il _____ (manger) déjà.", options: ["avait déjà mangé", "a déjà mangé", "mangeait déjà"], correct: 0, explanation: "He had eaten before I arrived → plus-que-parfait." },
  { id: 6, topic: "meaning", prompt: "What does 'J'avais fini avant son arrivée' mean?", options: ["I had finished before his arrival", "I finished before his arrival", "I was finishing before his arrival"], correct: 0, explanation: "Plus-que-parfait = had finished." },
  { id: 7, topic: "si-clauses", prompt: "What tense follows 'si' in third conditional?", options: ["Plus-que-parfait", "Passé composé", "Imparfait"], correct: 0, explanation: "Third conditional: Si + plus-que-parfait, conditionnel passé." },
  { id: 8, topic: "si-clauses", prompt: "Complete: Si j'_____ (savoir), je serais venu.", options: ["avais su", "ai su", "savais"], correct: 0, explanation: "Third conditional requires plus-que-parfait after si." },
  { id: 9, topic: "auxiliary", prompt: "Which auxiliary does 'vendre' use in plus-que-parfait?", options: ["avoir", "être", "Either"], correct: 0, explanation: "Vendre uses avoir." },
  { id: 10, topic: "auxiliary", prompt: "Which auxiliary does 'devenir' use in plus-que-parfait?", options: ["être", "avoir", "Either"], correct: 0, explanation: "Devenir uses être." },
  { id: 11, topic: "agreement", prompt: "Does 'elle était arrivée' need agreement?", options: ["Yes, -e added", "No agreement", "Only in speech"], correct: 0, explanation: "With être and feminine subject, add -e." },
  { id: 12, topic: "vs-passe", prompt: "What's the difference between 'j'ai mangé' and 'j'avais mangé'?", options: ["Simple past vs had eaten", "Present vs past", "Singular vs plural"], correct: 0, explanation: "J'ai mangé = I ate. J'avais mangé = I had eaten." },
  { id: 13, topic: "context", prompt: "Complete: Elle avait perdu ses clés, _____ elle ne pouvait pas entrer.", options: ["donc", "et", "puis"], correct: 0, explanation: "Plus-que-parfait explains cause (lost keys → couldn't enter)." },
  { id: 14, topic: "meaning", prompt: "What does 'Nous étions partis' mean?", options: ["We had left", "We left", "We were leaving"], correct: 0, explanation: "Être in imparfait + parti = had left." },
  { id: 15, topic: "mistakes", prompt: "Which is correct?", options: ["Quand je suis arrivé, il avait déjà mangé.", "Quand je suis arrivé, il a déjà mangé.", "Quand j'arrivais, il avait déjà mangé."], correct: 0, explanation: "Use plus-que-parfait for the action that happened first." },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focus on imparfait forms + participles
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates plus-que-parfait mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Plus-que-parfait is about sequence of past events. Review imparfait of avoir/être + past participles.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting plus-que-parfait. Focus on when to use it vs passé composé.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using plus-que-parfait well. This tense shows sophisticated handling of past timelines.", emoji: "🎉", color: "green" as const };
}
