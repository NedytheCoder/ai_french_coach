/**
 * B1 Lesson 8 - Past Conditional (Le Conditionnel Passé)
 * ===========================================================
 *
 * This file contains all lesson data for B1 Lesson 8, teaching the past
 * conditional used to express regrets and hypothetical past situations.
 *
 * **Lesson Content:**
 * - What is the past conditional
 * - Formation: present conditional of auxiliary + past participle
 * - Avoir and être auxiliaries in present conditional
 * - Usage cases: regrets, missed opportunities, hypothetical past
 * - Common examples with translations
 * - Si clause patterns (third conditional)
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Past conditional = conditional auxiliary + past participle
 * - Used for: regrets (j'aurais dû), missed opportunities (j'aurais pu)
 * - Third conditional: Si + plus-que-parfait, conditionnel passé
 * - Never use conditional after si
 * - Agreement required with être verbs
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. whatIs - Definition and explanation of past conditional
 * 4. formationRules - How to form the past conditional
 * 5. avoirEtre - Auxiliary verbs in present conditional
 * 6. usageCases - Different usage scenarios
 * 7. siClauses - Si clause patterns (third conditional)
 * 8. commonExamples - Common example sentences
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
 * 1. intro - Introduction to past conditional
 * 2. what-is - What is the past conditional
 * 3. formation - How to form the past conditional
 * 4. avoir-etre - Auxiliary verbs in conditional
 * 5. usage - Usage cases
 * 6. examples - Common examples
 * 7. si-clauses - Third conditional patterns
 * 8. mistakes - Common errors
 * 9. practice - Interactive quiz
 * 10. completion - Lesson completion
 */
export const sectionIds = ["intro", "what-is", "formation", "avoir-etre", "usage", "examples", "si-clauses", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Past Conditional",
  /** Brief description of lesson content */
  subtitle: "Express regrets and hypothetical past actions.",
  /** Lesson number in B1 series */
  lessonNumber: 8,
};

// =============================================================================
// WHAT IS PAST CONDITIONAL
// =============================================================================

/**
 * whatIs - Definition and explanation of the past conditional.
 *
 * The past conditional describes what would have happened in the past.
 * Used for regrets, missed opportunities, and hypothetical past situations.
 */
export const whatIs = [
  "The past conditional describes what would have happened in the past.",
  "It's used for regrets, missed opportunities, and hypothetical past situations.",
  "Example: 'J'aurais aimé voyager.' (I would have liked to travel)",
];

// =============================================================================
// FORMATION RULES
// =============================================================================

/**
 * formationRules - How to form the past conditional.
 *
 * Pattern: Present conditional of auxiliary (avoir/être) + past participle
 * - Avoir forms: j'aurais, tu aurais, il aurait, nous aurions
 * - Être forms: je serais, tu serais, il serait, nous serions
 * - Agreement applies for être verbs
 */
export const formationRules = [
  "Take the present conditional of avoir or être",
  "Add the past participle of the main verb",
  "Agreement rules apply for être verbs",
];

// =============================================================================
// AVOIR AND ÊTRE AUXILIARIES
// =============================================================================

/**
 * avoirEtre - The auxiliary verbs avoir and être in present conditional.
 *
 * Avoir conditional forms:
 * - j'aurais, tu aurais, il aurait, nous aurions, vous auriez, ils auraient
 *
 * Être conditional forms:
 * - je serais, tu serais, il serait, nous serions, vous seriez, ils seraient
 */
export const avoirEtre = [
  { auxiliary: "avoir", je: "j'aurais", tu: "tu aurais", il: "il aurait", nous: "nous aurions" },
  { auxiliary: "être", je: "je serais", tu: "tu serais", il: "il serait", nous: "nous serions" },
];

// =============================================================================
// USAGE CASES
// =============================================================================

/**
 * usageCases - Different scenarios for using the past conditional.
 *
 * Cases:
 * - Regrets: J'aurais dû... (I should have...)
 * - Missed opportunities: J'aurais pu... (I could have...)
 * - Hypothetical past: Je serais venu si... (I would have come if...)
 * - Third conditional: Si + plus-que-parfait, conditionnel passé
 */
export const usageCases = [
  { case: "Regrets", example: "J'aurais dû étudier plus.", explanation: "I should have studied more (but I didn't)" },
  { case: "Missed opportunities", example: "J'aurais pu venir.", explanation: "I could have come (but I didn't)" },
  { case: "Hypothetical past", example: "Je serais venu si j'avais su.", explanation: "I would have come if I had known" },
  { case: "Third conditional", example: "S'il avait fait beau, nous serions sortis.", explanation: "If the weather had been good, we would have gone out" },
];

// =============================================================================
// SI CLAUSES
// =============================================================================

/**
 * siClauses - Si clause patterns with past conditional (third conditional).
 *
 * Patterns:
 * - Third conditional: Si + plus-que-parfait, conditionnel passé
 * - Second conditional: Si + imparfait, conditionnel
 */
export const siClauses = [
  { pattern: "Si + plus-que-parfait, conditionnel passé", example: "Si j'avais eu le temps, j'aurais fini.", note: "Most common third conditional pattern" },
  { pattern: "Si + imparfait, conditionnel", example: "Si j'étais riche, je voyagerais.", note: "Second conditional (present hypothetical)" },
];

// =============================================================================
// COMMON EXAMPLES
// =============================================================================

/**
 * commonExamples - Frequently used past conditional sentences.
 *
 * Examples with English translations:
 * - J'aurais aimé... (I would have liked...)
 * - Tu aurais dû... (You should have...)
 * - Il aurait pu... (He could have...)
 */
export const commonExamples = [
  { french: "J'aurais aimé voir ça.", english: "I would have liked to see that." },
  { french: "Tu aurais dû me dire.", english: "You should have told me." },
  { french: "Il aurait pu réussir.", english: "He could have succeeded." },
  { french: "Nous serions arrivés plus tôt.", english: "We would have arrived earlier." },
  { french: "Elle serait venue avec nous.", english: "She would have come with us." },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors with the past conditional.
 *
 * Common errors:
 * - Using conditional after si (never do this)
 * - Using wrong tense in si clause (must be plus-que-parfait)
 * - Using wrong auxiliary (avoir vs être)
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Si j'aurais su, je serais venu.", correct: "Si j'avais su, je serais venu.", explanation: "Never use conditional after si." },
  { wrong: "J'aurais fini si j'aurais eu le temps.", correct: "J'aurais fini si j'avais eu le temps.", explanation: "Plus-que-parfait follows si." },
  { wrong: "Je serais venu si je saurais.", correct: "Je serais venu si j'avais su.", explanation: "Use plus-que-parfait in the if-clause for past hypotheticals." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 8.
 *
 * Topics covered:
 * - what-is (1): Definition of past conditional
 * - formation (2): How to form the past conditional
 * - avoir (3): Avoir auxiliary forms
 * - etre (4): Être auxiliary forms
 * - meaning (5-6, 10, 15): Understanding meanings
 * - si-clauses (7-8, 12): Third conditional patterns
 * - mistakes (9): Common errors
 * - agreement (11): Participle agreement
 * - auxiliary (13-14): Choosing correct auxiliary
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
  { id: 1, topic: "what-is", prompt: "What does the past conditional express?", options: ["Hypothetical past actions", "Future actions", "Present habits"], correct: 0, explanation: "Past conditional = what would have happened." },
  { id: 2, topic: "formation", prompt: "How is the past conditional formed?", options: ["Conditional auxiliary + past participle", "Present auxiliary + past participle", "Imparfait auxiliary + past participle"], correct: 0, explanation: "Take avoir/être in conditional + past participle." },
  { id: 3, topic: "avoir", prompt: "What is the conditional auxiliary avoir for 'je'?", options: ["j'aurais", "j'avais", "j'eus"], correct: 0, explanation: "J'aurais is the conditional of avoir." },
  { id: 4, topic: "etre", prompt: "What is the conditional auxiliary être for 'il'?", options: ["il serait", "il était", "il sera"], correct: 0, explanation: "Il serait is the conditional of être." },
  { id: 5, topic: "meaning", prompt: "What does 'J'aurais dû étudier' mean?", options: ["I should have studied", "I should study", "I will have studied"], correct: 0, explanation: "Past conditional of devoir = should have." },
  { id: 6, topic: "meaning", prompt: "What does 'J'aurais pu venir' mean?", options: ["I could have come", "I can come", "I was able to come"], correct: 0, explanation: "Past conditional of pouvoir = could have." },
  { id: 7, topic: "si-clauses", prompt: "What tense follows 'si' in third conditional?", options: ["Plus-que-parfait", "Conditionnel", "Imparfait"], correct: 0, explanation: "Third conditional: Si + plus-que-parfait, conditionnel passé." },
  { id: 8, topic: "si-clauses", prompt: "Complete: Si j'_____ (savoir), je serais venu.", options: ["avais su", "aurais su", "savais"], correct: 0, explanation: "Third conditional requires plus-que-parfait after si." },
  { id: 9, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Si j'avais su, je serais venu.", "Si j'aurais su, je serais venu.", "Si j'avais su, j'aurais venu."], correct: 0, explanation: "Use plus-que-parfait after si, conditional in result." },
  { id: 10, topic: "meaning", prompt: "What does 'Il aurait pu réussir' mean?", options: ["He could have succeeded", "He can succeed", "He succeeded"], correct: 0, explanation: "Past conditional of pouvoir = could have." },
  { id: 11, topic: "agreement", prompt: "Does 'elle serait partie' need agreement?", options: ["Yes, -e added", "No agreement", "Only in writing"], correct: 0, explanation: "With être and feminine subject, add -e." },
  { id: 12, topic: "si-clauses", prompt: "Complete: S'il avait fait beau, nous _____ (sortir).", options: ["serions sortis", "aurions sortis", "sortirions"], correct: 0, explanation: "Sortir uses être: nous serions sortis." },
  { id: 13, topic: "auxiliary", prompt: "Which auxiliary does 'manger' use in past conditional?", options: ["avoir", "être", "Either"], correct: 0, explanation: "Most verbs use avoir." },
  { id: 14, topic: "auxiliary", prompt: "Which auxiliary does 'partir' use in past conditional?", options: ["être", "avoir", "Either"], correct: 0, explanation: "Partir is a DR MRS VANDERTRAMP verb, using être." },
  { id: 15, topic: "meaning", prompt: "What does 'Tu aurais dû me dire' mean?", options: ["You should have told me", "You should tell me", "You had to tell me"], correct: 0, explanation: "Past conditional of devoir = should have." },
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
 * - 12-15/15: "Great job" - celebrates past conditional mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The past conditional combines tenses. Focus on the conditional forms of avoir/être + past participles.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting the past conditional. Review si clause patterns and never use conditional after si.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using the past conditional well. This expresses sophisticated past hypotheticals.", emoji: "🎉", color: "green" as const };
}
