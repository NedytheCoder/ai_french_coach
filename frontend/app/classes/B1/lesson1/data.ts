/**
 * B1 Lesson 1 - Conditional Mood (Le Conditionnel)
 * ===================================================
 *
 * This file contains all lesson data for B1 Lesson 1, focusing on the French
 * conditional mood used to express wishes, hypothetical situations, and polite requests.
 *
 * **Lesson Content:**
 * - Formation of the conditional (future stem + imparfait endings)
 * - Uses: politeness, wishes, hypothetical situations, advice
 * - If-clauses (si + imparfait, conditionnel)
 * - Irregular conditional stems
 * - Comparison: future vs conditional
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Conditional = future stem + imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient)
 * - Used for: polite requests, wishes, hypothetical situations, advice
 * - Si clause pattern: Si + imparfait → conditionnel
 * - Never use conditional after "si"
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. formationExamples - How to form the conditional
 * 4. useCases - Common uses of the conditional
 * 5. ifClauseExamples - Si clause patterns
 * 6. irregularStems - Irregular verb stems in conditional
 * 7. futurVsConditional - Comparing future and conditional
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
 * 1. intro - Introduction to conditional mood
 * 2. what-is-conditional - Understanding the conditional
 * 3. formation - How to form the conditional
 * 4. uses - Different uses of the conditional
 * 5. if-clauses - Si clause patterns
 * 6. irregulars - Irregular verb stems
 * 7. comparison - Future vs conditional
 * 8. mistakes - Common errors
 * 9. practice - Interactive quiz
 * 10. completion - Lesson completion
 */
export const sectionIds = ["intro", "what-is-conditional", "formation", "uses", "if-clauses", "irregulars", "comparison", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Conditional Mood",
  /** Brief description of lesson content */
  subtitle: "Express wishes, hypothetical situations, and polite requests in French.",
  /** Lesson number in B1 series */
  lessonNumber: 1,
};

// =============================================================================
// FORMATION EXAMPLES
// =============================================================================

/**
 * formationExamples - How to form the conditional mood.
 *
 * Pattern: Take the future stem and add imparfait endings
 * - je: -ais
 * - tu: -ais
 * - il/elle: -ait
 * - nous: -ions
 * - vous: -iez
 * - ils/elles: -aient
 */
export const formationExamples = [
  { stem: "parler", endings: ["parlerais", "parlerais", "parlerait", "parlerions", "parleriez", "parleraient"], explanation: "Take the future stem and add imparfait endings" },
  { stem: "finir", endings: ["finirais", "finirais", "finirait", "finirions", "finiriez", "finiraient"], explanation: "Same pattern with -ir verbs" },
  { stem: "vendre", endings: ["vendrais", "vendrais", "vendrait", "vendrions", "vendriez", "vendraient"], explanation: "Same pattern with -re verbs" },
];

// =============================================================================
// USE CASES
// =============================================================================

/**
 * useCases - Common uses of the conditional mood in French.
 *
 * Categories:
 * - Politeness: Making polite requests (Je voudrais...)
 * - Wishes: Expressing desires (J'aimerais...)
 * - Hypothetical: Situations that depend on conditions
 * - Advice: Giving softer advice (Tu devrais...)
 */
export const useCases = [
  { use: "Politeness", example: "Je voudrais un café, s'il vous plaît.", english: "I would like a coffee, please." },
  { use: "Wishes", example: "J'aimerais voyager en Italie.", english: "I would like to travel to Italy." },
  { use: "Hypothetical situations", example: "Si j'avais de l'argent, j'achèterais une maison.", english: "If I had money, I would buy a house." },
  { use: "Advice", example: "Tu devrais étudier plus.", english: "You should study more." },
];

// =============================================================================
// IF-CLAUSE EXAMPLES (SI CLAUSES)
// =============================================================================

/**
 * ifClauseExamples - Si clause patterns with conditional.
 *
 * Pattern: Si + imparfait → conditionnel
 * The condition (si clause) uses imparfait, the result uses conditional.
 */
export const ifClauseExamples = [
  { condition: "Si j'avais le temps", result: "je lirais plus.", explanation: "Imparfait + Conditionnel" },
  { condition: "Si elle était là", result: "elle nous aiderait.", explanation: "Imparfait + Conditionnel" },
  { condition: "S'il faisait beau", result: "nous irions à la plage.", explanation: "Imparfait + Conditionnel" },
];

// =============================================================================
// IRREGULAR STEMS
// =============================================================================

/**
 * irregularStems - Irregular verb stems in the conditional mood.
 *
 * These verbs have irregular future/conditional stems that must be memorized:
 * - être → ser-
 * - avoir → aur-
 * - aller → ir-
 * - faire → fer-
 * - venir → viendr-
 * - pouvoir → pourr-
 * - vouloir → voudr-
 * - devoir → devr-
 */
export const irregularStems = [
  { infinitive: "être", stem: "ser-", example: "je serais, tu serais" },
  { infinitive: "avoir", stem: "aur-", example: "j'aurais, tu aurais" },
  { infinitive: "aller", stem: "ir-", example: "j'irais, tu irais" },
  { infinitive: "faire", stem: "fer-", example: "je ferais, tu ferais" },
  { infinitive: "venir", stem: "viendr-", example: "je viendrais, tu viendrais" },
  { infinitive: "pouvoir", stem: "pourr-", example: "je pourrais, tu pourrais" },
  { infinitive: "vouloir", stem: "voudr-", example: "je voudrais, tu voudrais" },
  { infinitive: "devoir", stem: "devr-", example: "je devrais, tu devrais" },
];

// =============================================================================
// FUTUR VS CONDITIONAL COMPARISON
// =============================================================================

/**
 * futurVsConditional - Side-by-side comparison of future and conditional.
 *
 * Key distinction:
 * - Future: Definite, will happen
 * - Conditional: Hypothetical, depends on condition
 */
export const futurVsConditional = [
  { futur: "Je parlerai demain.", conditional: "Je parlerais si j'avais le temps.", explanation: "Future = will happen. Conditional = would happen (if...)." },
  { futur: "Il viendra ce soir.", conditional: "Il viendrait si tu l'invitais.", explanation: "Future = definite. Conditional = depends on condition." },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors learners make with the conditional.
 *
 * Common errors:
 * - Using hyphens in conditional forms
 * - Using conditional after "si" (should use imparfait)
 * - Confusing polite expressions
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Je parle-rais", correct: "Je parlerais", explanation: "No hyphen in conditional forms." },
  { wrong: "Si j'aurais de l'argent", correct: "Si j'avais de l'argent", explanation: "After si, use imparfait, not conditional." },
  { wrong: "Je voudrais un café, merci", correct: "Je voudrais un café, s'il vous plaît.", explanation: "Use s'il vous plaît for polite requests." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 1.
 *
 * Topics covered:
 * - formation (1-2, 11): Forming the conditional correctly
 * - irregulars (3-4, 12): Irregular stems
 * - uses (5-6, 13): Politeness, wishes, advice
 * - if-clauses (7-8): Si clause patterns
 * - comparison (9-10): Future vs conditional
 * - mistakes (14): Correct vs incorrect usage
 * - politeness (15): Polite requests
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
  { id: 1, topic: "formation", prompt: "How do you form the conditional?", options: ["Future stem + imparfait endings", "Present stem + future endings", "Imparfait stem + present endings"], correct: 0, explanation: "The conditional is formed with the future stem and imparfait endings." },
  { id: 2, topic: "formation", prompt: "Conjugate 'parler' for 'je':", options: ["je parlerais", "je parlerai", "je parlais"], correct: 0, explanation: "Je parlerais is the conditional form." },
  { id: 3, topic: "irregulars", prompt: "What is the conditional stem of 'aller'?", options: ["ir-", "all-", "va-"], correct: 0, explanation: "Aller becomes ir- in conditional (j'irais)." },
  { id: 4, topic: "irregulars", prompt: "What is the conditional stem of 'faire'?", options: ["fer-", "fais-", "fait-"], correct: 0, explanation: "Faire becomes fer- in conditional (je ferais)." },
  { id: 5, topic: "uses", prompt: "Which sentence uses conditional for politeness?", options: ["Je voudrais un verre d'eau.", "Je veux un verre d'eau.", "J'ai voulu un verre d'eau."], correct: 0, explanation: "Je voudrais is the polite conditional form." },
  { id: 6, topic: "uses", prompt: "Which sentence expresses a wish?", options: ["J'aimerais visiter Paris.", "J'aime visiter Paris.", "J'ai aimé visiter Paris."], correct: 0, explanation: "J'aimerais expresses a wish (would like)." },
  { id: 7, topic: "if-clauses", prompt: "Which is the correct si clause pattern?", options: ["Si + imparfait, conditionnel", "Si + conditionnel, imparfait", "Si + présent, passé composé"], correct: 0, explanation: "Use Si + imparfait, then conditionnel in the result clause." },
  { id: 8, topic: "if-clauses", prompt: "Complete: Si j'______ (avoir) le temps, je voyagerais.", options: ["avais", "aurais", "ai"], correct: 0, explanation: "After si, use imparfait: avais." },
  { id: 9, topic: "comparison", prompt: "What is the difference between 'je ferai' and 'je ferais'?", options: ["Future vs conditional", "Present vs past", "Singular vs plural"], correct: 0, explanation: "Je ferai = future (I will do). Je ferais = conditional (I would do)." },
  { id: 10, topic: "comparison", prompt: "Which expresses a hypothetical situation?", options: ["Si j'avais une voiture, je conduirais.", "Quand j'aurai une voiture, je conduirai.", "J'ai conduit hier."], correct: 0, explanation: "The first sentence with si + imparfait + conditional is hypothetical." },
  { id: 11, topic: "formation", prompt: "Conjugate 'finir' for 'nous':", options: ["nous finirions", "nous finirons", "nous finissions"], correct: 0, explanation: "Nous finirions is the conditional form." },
  { id: 12, topic: "irregulars", prompt: "What is the conditional form of 'pouvoir' for 'je'?", options: ["je pourrais", "je pourrai", "je peux"], correct: 0, explanation: "Je pourrais is the conditional form." },
  { id: 13, topic: "advice", prompt: "Which sentence gives advice?", options: ["Tu devrais manger des légumes.", "Tu dois manger des légumes.", "Tu as mangé des légumes."], correct: 0, explanation: "Tu devrais gives softer advice (you should vs you must)." },
  { id: 14, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Si j'avais de l'argent, j'achèterais.", "Si j'aurais de l'argent, j'achèterais.", "Si j'avais de l'argent, j'achèterai."], correct: 0, explanation: "Use imparfait after si, conditional in result." },
  { id: 15, topic: "politeness", prompt: "How do you politely ask for a menu?", options: ["Je voudrais un menu, s'il vous plaît.", "Je veux un menu.", "Donnez-moi un menu."], correct: 0, explanation: "Je voudrais is polite and conditional." },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests review of formation and if-clauses
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The conditional mood takes practice. Review the formation rules and if-clause patterns before moving on.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're starting to understand the conditional. Review irregular stems and si clause patterns once more.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using the conditional mood well. This is an important step toward expressing complex ideas in French.", emoji: "🎉", color: "green" as const };
}
