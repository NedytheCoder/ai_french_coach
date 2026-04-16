/**
 * B2 Lesson 5 - All Hypothesis Structures (Si Clauses)
 * =======================================================
 *
 * This file contains all lesson data for B2 Lesson 5, teaching the complete
 * system of French hypothetical expressions using si (if) clauses.
 *
 * **Lesson Content:**
 * - Introduction: The logic of hypothesis and tense coordination
 * - First conditional: Realistic possibility (Si + present → future/present)
 * - Second conditional: Unreal present (Si + imparfait → conditionnel présent)
 * - Third conditional: Unreal past/regret (Si + plus-que-parfait → conditionnel passé)
 * - Mixed conditionals: Complex time relationships
 * - Degrees of reality scale: From certainty to impossible
 * - Common mistakes: The "never use conditional after si" rule
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - First conditional: Realistic, achievable conditions (If you come, I'll be happy)
 * - Second conditional: Hypothetical present (If I had money, I'd buy...)
 * - Third conditional: Past regrets (If I had known, I would have come)
 * - Mixed conditionals: Past condition affecting present result
 * - CRITICAL RULE: Never use conditional after si ("Si j'aurais" is ALWAYS wrong)
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. introSections - Introduction to hypothesis logic
 * 4. firstConditional - Realistic possibility structure and examples
 * 5. secondConditional - Unreal present structure and examples
 * 6. thirdConditional - Unreal past/regret structure and examples
 * 7. mixedConditional - Complex time relationships
 * 8. nuanceSection - Degrees of reality scale
 * 9. commonMistakes - Common errors and corrections
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
 * 1. intro - Introduction to hypothesis logic
 * 2. first-conditional - Realistic possibility
 * 3. second-conditional - Unreal present
 * 4. third-conditional - Unreal past/regret
 * 5. mixed-conditional - Complex time relationships
 * 6. nuance - Degrees of reality
 * 7. practice - Interactive quiz
 * 8. completion - Lesson completion
 */
export const sectionIds = ["intro", "first-conditional", "second-conditional", "third-conditional", "mixed-conditional", "nuance", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "All Hypothesis Structures",
  /** Brief description of lesson content */
  subtitle: "Master the complete system of French hypothetical expressions. Understand realism, unreal present, and unreal past with precise tense coordination.",
  /** Lesson number in B2 series */
  lessonNumber: 5,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to hypothesis structures.
 *
 * Content:
 * - The Logic of Hypothesis: Three patterns based on reality
 * - Tense Coordination: How si clause tense determines main clause tense
 */
export const introSections = [
  {
    title: "The Logic of Hypothesis",
    content: "French si clauses follow logical patterns based on reality. First conditional (realistic), second conditional (unreal present), and third conditional (unreal past) each express different relationships between condition and consequence.",
  },
  {
    title: "Tense Coordination",
    content: "The tense in the si clause determines the tense in the main clause. This coordination creates meaning: possibility, hypothesis, or regret.",
  },
];

// =============================================================================
// FIRST CONDITIONAL
// =============================================================================

/**
 * firstConditional - Realistic possibility (first conditional).
 *
 * Structure: If + present → future or present
 * Usage: Realistic, achievable conditions
 *
 * Examples:
 * - Si tu viens, je serai content. (Realistic invitation)
 * - S'il fait beau, nous sortirons. (Weather-dependent plan)
 * - Si j'ai le temps, je le ferai. (Time-permitting action)
 *
 * Keywords: Realistic, achievable, possible, likely
 */
export const firstConditional = {
  title: "First Conditional: Realistic Possibility",
  description: "If + present → future or present. Used for realistic, achievable conditions.",
  structure: { si: "Present", result: "Future or present" },
  examples: [
    { sentence: "Si tu viens, je serai content.", meaning: "Realistic invitation", nuance: "I believe you might come" },
    { sentence: "S'il fait beau, nous sortirons.", meaning: "Weather-dependent plan", nuance: "Possible, likely scenario" },
    { sentence: "Si j'ai le temps, je le ferai.", meaning: "Time-permitting action", nuance: "Realistic condition" },
  ],
  keywords: "Realistic, achievable, possible, likely",
};

// =============================================================================
// SECOND CONDITIONAL
// =============================================================================

/**
 * secondConditional - Unreal present (second conditional).
 *
 * Structure: If + imparfait → conditionnel présent
 * Usage: Hypothetical, unreal, or unlikely present/future situations
 *
 * Examples:
 * - Si j'avais de l'argent, j'achèterais une maison. (I don't have money)
 * - S'il était là, il comprendrait. (He's not here)
 * - Si je savais, je te le dirais. (I don't know)
 *
 * Keywords: Hypothetical, unreal, wishful, counterfactual
 * CRITICAL: Never use conditional after si! "Si j'aurais" is ALWAYS wrong.
 */
export const secondConditional = {
  title: "Second Conditional: Unreal Present",
  description: "If + imperfect → conditional present. Used for hypothetical, unreal, or unlikely present/future situations.",
  structure: { si: "Imparfait", result: "Conditionnel présent" },
  examples: [
    { sentence: "Si j'avais de l'argent, j'achèterais une maison.", meaning: "I don't have money (unreal)", nuance: "Hypothetical present" },
    { sentence: "S'il était là, il comprendrait.", meaning: "He's not here (unreal)", nuance: "Counterfactual now" },
    { sentence: "Si je savais, je te le dirais.", meaning: "I don't know (unreal)", nuance: "Present ignorance" },
  ],
  keywords: "Hypothetical, unreal, wishful, counterfactual",
  commonError: "Never use conditional after si! 'Si j'aurais' is ALWAYS wrong.",
};

// =============================================================================
// THIRD CONDITIONAL
// =============================================================================

/**
 * thirdConditional - Unreal past/regret (third conditional).
 *
 * Structure: If + plus-que-parfait → conditionnel passé
 * Usage: Regrets, missed opportunities, imagining different past outcomes
 *
 * Examples:
 * - Si j'avais su, je serais venu. (I didn't know - regret)
 * - S'il avait étudié, il aurait réussi. (He didn't study - missed opportunity)
 * - Si nous étions partis plus tôt, nous n'aurions pas raté le train. (Past mistake)
 *
 * Keywords: Regret, missed opportunity, past counterfactual
 */
export const thirdConditional = {
  title: "Third Conditional: Unreal Past (Regret)",
  description: "If + past perfect → past conditional. Used for regrets, missed opportunities, imagining different past outcomes.",
  structure: { si: "Plus-que-parfait", result: "Conditionnel passé" },
  examples: [
    { sentence: "Si j'avais su, je serais venu.", meaning: "I didn't know (past fact)", nuance: "Regret about past ignorance" },
    { sentence: "S'il avait étudié, il aurait réussi.", meaning: "He didn't study (past fact)", nuance: "Missed opportunity" },
    { sentence: "Si nous étions partis plus tôt, nous n'aurions pas raté le train.", meaning: "We left late (past fact)", nuance: "Past mistake consequence" },
  ],
  keywords: "Regret, missed opportunity, past counterfactual",
};

// =============================================================================
// MIXED CONDITIONAL
// =============================================================================

/**
 * mixedConditional - Complex time relationships (mixed conditional).
 *
 * Types:
 * 1. Past condition, present result: Si + plus-que-parfait → conditionnel présent
 *    Example: Si j'avais accepté ce poste, je serais directeur maintenant.
 * 2. Present condition, past result: Si + imparfait → conditionnel passé
 *    Example: Si j'étais plus prudent, je n'aurais pas eu cet accident.
 */
export const mixedConditional = {
  title: "Mixed Conditionals: Complex Scenarios",
  description: "Sometimes we combine tenses to express complex time relationships.",
  types: [
    { type: "Past condition, present result", structure: "Si + plus-que-parfait → conditionnel présent", example: "Si j'avais accepté ce poste, je serais directeur maintenant." },
    { type: "Present condition, past result", structure: "Si + imparfait → conditionnel passé", example: "Si j'étais plus prudent, je n'aurais pas eu cet accident." },
  ],
};

// =============================================================================
// NUANCE SECTION
// =============================================================================

/**
 * nuanceSection - Degrees of reality scale.
 *
 * Scale from certainty to impossible:
 * 1. Certainty: No si clause needed (Comme il fait beau, nous sortons)
 * 2. High probability (first): S'il fait beau, nous sortirons
 * 3. Hypothesis (second): S'il faisait beau, nous sortirions
 * 4. Impossible (second with context): Si j'étais roi, je changerais tout
 * 5. Past regret (third): Si j'avais su, je serais venu
 *
 * Key Rule: Never use conditional after si. This is the most common error.
 */
export const nuanceSection = {
  title: "Degrees of Reality",
  scale: [
    { level: "Certainty", example: "Comme il fait beau, nous sortons.", note: "No si clause needed - fact stated directly" },
    { level: "High probability (first)", example: "S'il fait beau, nous sortirons.", note: "Expected outcome" },
    { level: "Hypothesis (second)", example: "S'il faisait beau, nous sortirions.", note: "Not currently true" },
    { level: "Impossible (second with context)", example: "Si j'étais roi, je changerai tout.", note: "Never possible" },
    { level: "Past regret (third)", example: "Si j'avais su, je serais venu.", note: "Cannot change now" },
  ],
  keyRule: "Never use conditional after si. This is the most common error in French hypothesis.",
};

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors in hypothesis structures.
 *
 * Critical errors:
 * - "Si j'aurais su, j'aurais venu" → "Si j'avais su, je serais venu"
 *   (Never use conditional after si)
 * - "Si je serais riche, j'achèterais" → "Si j'étais riche, j'achèterais"
 *   (Imparfait after si, not conditional)
 */
export const commonMistakes = [
  { error: "Si j'aurais su, j'aurais venu.", correction: "Si j'avais su, je serais venu.", explanation: "Never use conditional after si. Plus-que-parfait required." },
  { error: "Si je serais riche, j'achèterais.", correction: "Si j'étais riche, j'achèterais.", explanation: "Imparfait after si, not conditional." },
  { error: "Si j'avais été là, je l'aurais vu.", correction: "Si j'avais été là, je l'aurais vu.", note: "Actually correct! But often confused with present conditional.", explanation: "Third conditional is correct here." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B2 Lesson 5.
 *
 * Topics covered:
 * - first-conditional (1, 14): Si + present → future
 * - second-conditional (2, 5, 8, 10, 12): Si + imparfait → conditionnel présent
 * - third-conditional (3, 6, 9, 13): Si + plus-que-parfait → conditionnel passé
 * - common-error (4): "Si j'aurais" is ALWAYS wrong
 * - reality (5): Imparfait = unreal present
 * - past-regret (6): Plus-que-parfait = regret
 * - structure (7): Second conditional structure
 * - meaning (8): Imparfait = counterfactual
 * - third-meaning (9): Plus-que-parfait = didn't know in past
 * - keyword (10): Second conditional keywords
 * - mixed (11): Past condition, present result
 * - translation (12): "If I were you" = "Si j'étais toi"
 * - regret (13): Third conditional for deep regret
 * - probable (14): First conditional for probable scenarios
 * - impossible (15): Second conditional for impossible scenarios
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
  { id: 1, topic: "first-conditional", prompt: "Complete: Si tu viens, je _____ content.", options: ["serai", "serais", "étais"], correct: 0, explanation: "First conditional: present → future (serai)" },
  { id: 2, topic: "second-conditional", prompt: "Complete: Si j'avais de l'argent, j'_____ une maison.", options: ["achèterais", "achèterai", "achète"], correct: 0, explanation: "Second conditional: imparfait → conditionnel présent" },
  { id: 3, topic: "third-conditional", prompt: "Complete: Si j'avais su, je _____ venu.", options: ["serais", "serai", "étais"], correct: 0, explanation: "Third conditional: plus-que-parfait → conditionnel passé" },
  { id: 4, topic: "common-error", prompt: "Which is ALWAYS wrong?", options: ["Si j'aurais", "Si j'avais", "Si j'ai"], correct: 0, explanation: "Never use conditional after si" },
  { id: 5, topic: "reality", prompt: "Si j'avais de l'argent... implies:", options: ["I don't have money now", "I have money", "I will have money"], correct: 0, explanation: "Imparfait = unreal present situation" },
  { id: 6, topic: "past-regret", prompt: "Si j'avais étudié... expresses:", options: ["Past regret/missed opportunity", "Future plan", "Current habit"], correct: 0, explanation: "Plus-que-parfait = unreal past, often regret" },
  { id: 7, topic: "structure", prompt: "Second conditional structure:", options: ["Si + imparfait → conditionnel présent", "Si + présent → futur", "Si + plus-que-parfait → conditionnel passé"], correct: 0, explanation: "Imparfait in si clause, conditionnel in result" },
  { id: 8, topic: "meaning", prompt: "S'il faisait beau, nous sortirions implies:", options: ["It's not nice now", "It's nice now", "It will be nice"], correct: 0, explanation: "Imparfait = counterfactual (not currently true)" },
  { id: 9, topic: "third-meaning", prompt: "Si elle avait su, elle serait venue means:", options: ["She didn't know (past fact)", "She knows now", "She will know"], correct: 0, explanation: "Plus-que-parfait = didn't know in the past" },
  { id: 10, topic: "keyword", prompt: "Which keywords suggest second conditional?", options: ["Hypothetical, unreal, wishful", "Certain, definite, sure", "Tomorrow, next week, soon"], correct: 0, explanation: "Second conditional = hypothetical/unreal" },
  { id: 11, topic: "mixed", prompt: "Si j'avais accepté, je serais directeur maintenant =", options: ["Mixed: past condition, present result", "Third conditional", "First conditional"], correct: 0, explanation: "Past decision affects present situation" },
  { id: 12, topic: "translation", prompt: "'If I were you' in French:", options: ["Si j'étais toi", "Si je serais toi", "Si j'avais été toi"], correct: 0, explanation: "Si j'étais = imparfait (unreal present)" },
  { id: 13, topic: "regret", prompt: "Best for expressing deep regret:", options: ["Third conditional", "First conditional", "Second conditional"], correct: 0, explanation: "Third conditional for past counterfactuals" },
  { id: 14, topic: "probable", prompt: "S'il pleut, je resterai chez moi =", options: ["First conditional (probable)", "Second conditional", "Third conditional"], correct: 0, explanation: "Present + future = realistic scenario" },
  { id: 15, topic: "impossible", prompt: "If I were king =", options: ["Si j'étais roi (second conditional)", "Si je serais roi", "Si j'ai été roi"], correct: 0, explanation: "Impossible scenario = second conditional" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on the "never use conditional after si" rule
 * - 8-11/15: "Nice progress" - encourages distinguishing second and third conditionals
 * - 12-15/15: "Excellent command" - celebrates complete hypothesis mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Conditional sentences require practice. Focus on the key rule: never use conditional after si. Review the three main patterns.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are mastering hypothesis structures. Focus on distinguishing second and third conditionals by time reference.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand the complete hypothesis system. You can express possibility, hypothesis, and regret with precision.", emoji: "🌟", color: "green" as const };
}
