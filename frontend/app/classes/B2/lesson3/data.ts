/**
 * B2 Lesson 3 - Historic Past (Passé Simple) & Anterior Past (Passé Antérieur)
 * =============================================================================
 *
 * This file contains all lesson data for B2 Lesson 3, teaching the literary
 * tenses passé simple and passé antérieur used in formal writing, literature,
 * and journalism.
 *
 * **Lesson Content:**
 * - Introduction: Why these tenses matter and production vs recognition approach
 * - Passé simple formation: Regular and highly irregular verbs
 * - Passé antérieur formation: Compound literary tense
 * - Recognition examples: Learning to identify and understand passé simple
 * - Literary usage contexts: Where these tenses appear
 * - Timeline comparisons: Passé composé vs passé simple vs plus-que-parfait vs passé antérieur
 * - Recognition practice exercises
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Passé simple: Narrative past used almost exclusively in written French
 * - Passé antérieur: Indicates action completed before another past action
 * - Formation: Passé simple of auxiliary (avoir/être) + past participle
 * - Recognition matters more than production at B2 level
 * - Common irregulars: fut, eut, fit, vit, naquit, mourut
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. introSections - Introduction to literary tenses
 * 4. passeSimpleInfo - Passé simple formation rules
 * 5. recognitionExamples - Passé simple recognition examples
 * 6. passeAntérieurInfo - Passé antérieur formation and usage
 * 7. passeAntérieurExamples - Passé antérieur timeline examples
 * 8. literaryUsageContexts - Where these tenses appear
 * 9. timelineComparisons - Comparison of past tenses
 * 10. recognitionPractice - Recognition exercises
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
 * 1. intro - Introduction to literary tenses
 * 2. what-is-passe-simple - Passé simple explanation
 * 3. recognition - Recognition examples
 * 4. passif-anterieur - Passé antérieur formation
 * 5. literary-usage - Where these tenses appear
 * 6. recognition-practice - Practice exercises
 * 7. comparison - Timeline comparisons
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "what-is-passe-simple", "recognition", "passif-anterieur", "literary-usage", "recognition-practice", "comparison", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Historic Past & Anterior Past",
  /** Brief description of lesson content */
  subtitle: "Recognize and understand literary tenses. At B2, you read literature, journalism, and formal texts where these tenses appear. Recognition matters more than production.",
  /** Lesson number in B2 series */
  lessonNumber: 3,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to literary tenses.
 *
 * Content:
 * - Why these tenses matter: Encountered in novels, history, journalism
 * - Production vs recognition: Focus on understanding, not producing
 */
export const introSections = [
  {
    title: "Why These Tenses Matter",
    content: "The passé simple and passé antérieur are literary tenses. You will encounter them in novels, history books, formal journalism, and academic writing. At B2, your goal is recognition and comprehension—you need to understand timelines in sophisticated texts.",
  },
  {
    title: "Production vs. Recognition",
    content: "Native speakers rarely use passé simple in speech. However, you must recognize it instantly in writing. Focus on identifying who did what, when, and in what sequence.",
  },
];

// =============================================================================
// PASSÉ SIMPLE INFORMATION
// =============================================================================

/**
 * passeSimpleInfo - Information about the passé simple (historic past).
 *
 * The passé simple is a narrative past used almost exclusively in written
 * French. It creates distance, formality, and literary tone.
 *
 * Formation covered:
 * - Regular -er verbs: Replace -er with -a
 * - Regular -ir/-re verbs: Replace with -it
 * - Highly irregular: être (fut), avoir (eut), aller (alla), faire (fit), venir (vint), voir (vit)
 */
export const passeSimpleInfo = {
  title: "The Passé Simple (Historic Past)",
  explanation: "A narrative past used almost exclusively in written French. It creates distance, formality, and literary tone.",
  formation: [
    { type: "Regular -er", example: "il parl → il parla", note: "Replace -er with -a" },
    { type: "Regular -ir/-re", example: "il fin → il finit / il vend → il vendit", note: "Replace with -it" },
    { type: "Être", example: "il fut", note: "Highly irregular" },
    { type: "Avoir", example: "il eut", note: "Highly irregular" },
    { type: "Aller", example: "il alla", note: "Irregular" },
    { type: "Faire", example: "il fit", note: "Irregular" },
    { type: "Venir", example: "il vint", note: "Irregular" },
    { type: "Voir", example: "il vit", note: "Irregular" },
  ],
};

// =============================================================================
// RECOGNITION EXAMPLES
// =============================================================================

/**
 * recognitionExamples - Examples of passé simple in authentic French texts.
 *
 * Each example includes:
 * - text: French sentence with passé simple verb
 * - verb: The passé simple form with infinitive
 * - meaning: English translation
 * - tense: Identified as "Passé simple"
 *
 * Common irregular forms: mourut, déclara, naquit, virent, fit
 */
export const recognitionExamples = [
  { text: "Napoléon mourut en 1821.", verb: "mourut (mourir)", meaning: "Napoleon died in 1821", tense: "Passé simple" },
  { text: "Le roi déclara la guerre.", verb: "déclara (déclarer)", meaning: "The king declared war", tense: "Passé simple" },
  { text: "Elle naquit à Paris.", verb: "naquit (naître)", meaning: "She was born in Paris", tense: "Passé simple" },
  { text: "Ils virent la mer.", verb: "virent (voir)", meaning: "They saw the sea", tense: "Passé simple" },
  { text: "Il fit construire un château.", verb: "fit (faire)", meaning: "He had a castle built", tense: "Passé simple" },
];

// =============================================================================
// PASSÉ ANTÉRIEUR INFORMATION
// =============================================================================

/**
 * passeAntérieurInfo - Information about the passé antérieur (anterior past).
 *
 * The passé antérieur is a compound literary tense indicating an action
 * completed before another past action.
 *
 * Formation:
 * - Passé simple of auxiliary (avoir: eus, être: fus) + past participle
 *
 * Usage:
 * - Appears after conjunctions like quand, lorsque, dès que, aussitôt que
 * - When the main verb is in passé simple
 */
export const passeAntérieurInfo = {
  title: "The Passé Antérieur (Anterior Past)",
  explanation: "A compound literary tense indicating an action completed before another past action. Formed with passé simple of auxiliary + past participle.",
  formation: [
    { auxiliary: "eus", example: "j'eus fini", note: "Passé simple of avoir + participle" },
    { auxiliary: "fus", example: "je fus parti", note: "Passé simple of être + participle" },
  ],
  usage: "Appears after conjunctions like quand, lorsque, dès que, aussitôt que when the main verb is in passé simple.",
};

// =============================================================================
// PASSÉ ANTÉRIEUR EXAMPLES
// =============================================================================

/**
 * passeAntérieurExamples - Timeline examples showing sequence with passé antérieur.
 *
 * Each example shows:
 * - text: Complete French sentence
 * - breakdown: Explanation of the passé antérieur form
 * - timeline: Sequence of events (First: X; Then: Y)
 */
export const passeAntérieurExamples = [
  { text: "Quand il eut terminé, il partit.", breakdown: "eut terminé = had finished (before leaving)", timeline: "First: finished; Then: left" },
  { text: "Dès qu'elle fut arrivée, elle téléphona.", breakdown: "fut arrivée = had arrived (before calling)", timeline: "First: arrived; Then: called" },
  { text: "Lorsque le roi eut signé, la loi entra en vigueur.", breakdown: "eut signé = had signed (before law took effect)", timeline: "First: signed; Then: law effective" },
];

// =============================================================================
// LITERARY USAGE CONTEXTS
// =============================================================================

/**
 * literaryUsageContexts - Where passé simple appears in French writing.
 *
 * Contexts covered:
 * - Historical narrative (very common)
 * - Classic literature (universal in pre-20th century)
 * - Modern literary fiction (selective, stylistic)
 * - Formal journalism (Le Monde, Le Figaro)
 * - Academic writing (less common today)
 *
 * Each context includes example and frequency note.
 */
export const literaryUsageContexts = [
  { context: "Historical narrative", example: "Louis XIV construit le château de Versailles. (history book uses présent historique or passé simple)", frequency: "Very common" },
  { context: "Classic literature", example: "Marcel Proust, Albert Camus, Victor Hugo", frequency: "Universal in pre-20th century literature" },
  { context: "Modern literary fiction", example: "Contemporary novelists still use passé simple for literary effect", frequency: "Selective, stylistic" },
  { context: "Journalism (formal)", example: "Le président déclara que... (in written press)", frequency: "Common in Le Monde, Le Figaro" },
  { context: "Academic writing", example: "L'auteur démontre que... (more common: présent)", frequency: "Less common today" },
];

// =============================================================================
// TIMELINE COMPARISONS
// =============================================================================

/**
 * timelineComparisons - Comparison of all past tenses.
 *
 * Tenses compared:
 * - Passé composé: Everyday speech/writing (A2-B1)
 * - Passé simple: Literary narrative (B2 recognition)
 * - Plus-que-parfait: Past before past (B1)
 * - Passé antérieur: Literary past before literary past (B2 recognition)
 *
 * Each includes example sentence, usage description, and CEFR level.
 */
export const timelineComparisons = [
  { tense: "Passé composé", example: "Il a mangé puis il est parti.", usage: "Everyday speech and writing", level: "A2-B1" },
  { tense: "Passé simple", example: "Il mangea puis il partit.", usage: "Literary narrative", level: "B2 recognition" },
  { tense: "Plus-que-parfait", example: "Il avait mangé avant de partir.", usage: "Past before past", level: "B1" },
  { tense: "Passé antérieur", example: "Quand il eut mangé, il partit.", usage: "Literary past before literary past", level: "B2 recognition" },
];

// =============================================================================
// RECOGNITION PRACTICE
// =============================================================================

/**
 * recognitionPractice - Interactive exercises for recognizing literary tenses.
 *
 * Exercises:
 * - Identifying meaning of passé simple verbs (mourut = died)
 * - Determining sequence with passé antérieur (what happened first?)
 *
 * Each exercise includes sentence, question, options, correct answer, and explanation.
 */
export const recognitionPractice = [
  { sentence: "Napoléon mourut en 1821 à Sainte-Hélène.", question: "What does 'mourut' mean?", options: ["died", "lived", "traveled"], correct: 0, explanation: "Mourut = passé simple of mourir = died" },
  { sentence: "Quand il eut fini son discours, il quitta la tribune.", question: "What happened first?", options: ["He finished speaking", "He left the podium", "Neither"], correct: 0, explanation: "Eut fini = passé antérieur = had finished (before leaving)" },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B2 Lesson 3.
 *
 * Topics covered:
 * - passe-simple-recognition (1): Identifying passé simple forms
 * - passe-simple-meaning (2): Understanding meanings
 * - irregular (3): Highly irregular verbs (être)
 * - passe-anterieur-formation (4): How passé antérieur is formed
 * - sequence (5): Timeline with passé antérieur
 * - context (6): Where to encounter passé simple
 * - avoir (7): Passé simple of avoir (eut)
 * - faire (8): Passé simple of faire (fit)
 * - venir (9): Passé simple of venir (vinrent)
 * - naître (10): Passé simple of naître (naquit)
 * - conjunction (11): Conjunctions triggering passé antérieur
 * - recognition (12): B2 approach to literary tenses
 * - mourir (13): Passé simple of mourir (mourut)
 * - vocab (14): Alternative names (historic past/prétérit)
 * - literary (15): Famous authors using passé simple
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
  { id: 1, topic: "passe-simple-recognition", prompt: "What is 'il parla'?", options: ["Passé simple of parler", "Imparfait of parler", "Future of parler"], correct: 0, explanation: "Parla = passé simple (he spoke)" },
  { id: 2, topic: "passe-simple-meaning", prompt: "'Le roi déclara la guerre' means:", options: ["The king declared war", "The king will declare war", "The king declares war"], correct: 0, explanation: "Déclara = passé simple = past action" },
  { id: 3, topic: "irregular", prompt: "What is the passé simple of 'être'?", options: ["je fus / il fut", "j'étais / il était", "j'ai été / il a été"], correct: 0, explanation: "Être is highly irregular: fus, fus, fut, fûmes, fûtes, furent" },
  { id: 4, topic: "passe-anterieur-formation", prompt: "Passé antérieur is formed with:", options: ["Passé simple of auxiliary + past participle", "Imparfait of auxiliary + participle", "Present of auxiliary + participle"], correct: 0, explanation: "Uses passé simple of avoir/être, not imparfait" },
  { id: 5, topic: "sequence", prompt: "In 'Quand il eut terminé, il partit', what happened first?", options: ["He finished", "He left", "Both at once"], correct: 0, explanation: "Eut terminé = had finished (before leaving)" },
  { id: 6, topic: "context", prompt: "Where would you encounter passé simple?", options: ["Novels and formal writing", "Everyday conversation", "Text messages"], correct: 0, explanation: "Literary/formal written French" },
  { id: 7, topic: "avoir", prompt: "What is 'il eut'?", options: ["Passé simple of avoir", "Imparfait of avoir", "Passé composé of avoir"], correct: 0, explanation: "Eut = passé simple of avoir (he had)" },
  { id: 8, topic: "faire", prompt: "What is 'elle fit'?", options: ["Passé simple of faire", "Imparfait of faire", "Present of faire"], correct: 0, explanation: "Fit = passé simple of faire (she did/made)" },
  { id: 9, topic: "venir", prompt: "'Ils vinrent de Paris' means:", options: ["They came from Paris", "They come from Paris", "They will come from Paris"], correct: 0, explanation: "Vinrent = passé simple of venir" },
  { id: 10, topic: "naître", prompt: "'Elle naquit en 1900' means:", options: ["She was born in 1900", "She is born in 1900", "She will be born in 1900"], correct: 0, explanation: "Naquit = passé simple of naître" },
  { id: 11, topic: "conjunction", prompt: "Passé antérieur often follows:", options: ["Quand, dès que, aussitôt que", "Parce que, puisque", "Si, quoique"], correct: 0, explanation: "Time conjunctions trigger passé antérieur" },
  { id: 12, topic: "recognition", prompt: "How should B2 learners approach passé simple?", options: ["Recognition in reading", "Active production in speech", "Avoid completely"], correct: 0, explanation: "Focus on understanding, not producing" },
  { id: 13, topic: "mourir", prompt: "'Il mourut' means:", options: ["He died", "He dies", "He will die"], correct: 0, explanation: "Mourut = passé simple of mourir" },
  { id: 14, topic: "vocab", prompt: "Passé simple is also called:", options: ["Historic past / Prétérit", "Perfect past", "Compound past"], correct: 0, explanation: "Also called passé historique or prétérit" },
  { id: 15, topic: "literary", prompt: "Which author famously uses passé simple?", options: ["Marcel Proust", "Only modern bloggers", "SMS writers"], correct: 0, explanation: "Proust's 'Du côté de chez Swann' uses passé simple throughout" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on common irregular forms
 * - 8-11/15: "Nice progress" - encourages continued reading
 * - 12-15/15: "Excellent command" - celebrates literary tense mastery
 *
 * Common irregular forms to focus on: fut, eut, fit, vit, naquit, mourut
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Literary tenses take time to recognize. Focus on the most common irregular forms: fut, eut, fit, vit, naquit, mourut.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are recognizing literary tenses well. Continue reading French literature to strengthen recognition.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand literary tenses deeply. You can read sophisticated French texts with confidence.", emoji: "🌟", color: "green" as const };
}
