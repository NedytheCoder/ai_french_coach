/**
 * B1 Lesson 14 - Advanced Connectors and Discourse Markers
 * ==========================================================
 *
 * This file contains all lesson data for B1 Lesson 14, teaching sophisticated
 * French linking words for complex expression.
 *
 * **Lesson Content:**
 * - Opposition connectors: cependant, néanmoins, toutefois, par contre, en revanche
 * - Consequence connectors: par conséquent, en conséquence, de ce fait, c'est pourquoi
 * - Purpose connectors: dans le but de, dans l'intention de, afin de/afin que
 * - Concession connectors: bien que, quoique, malgré, même si
 * - Time connectors: pendant que, lorsque, dès que, au moment où
 * - Usage examples with breakdowns
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Cependant/néanmoins/toutefois: formal alternatives to "mais"
 * - Par conséquent/en conséquence: formal alternatives to "donc"
 * - Bien que/quoique: require subjunctive
 * - Malgré: followed by noun
 * - Même si: followed by indicative
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. oppositionConnectors - Opposition and contrast connectors
 * 4. consequenceConnectors - Result and consequence connectors
 * 5. purposeConnectors - Purpose and intention connectors
 * 6. concessionConnectors - Concession connectors
 * 7. timeConnectors - Time-related connectors
 * 8. usageExamples - Examples with breakdowns
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
 * 1. intro - Introduction to advanced connectors
 * 2. opposition - Opposition and contrast
 * 3. consequence - Result and consequence
 * 4. purpose - Purpose and intention
 * 5. concession - Concession connectors
 * 6. time - Time-related connectors
 * 7. examples - Usage examples
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "opposition", "consequence", "purpose", "concession", "time", "examples", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Advanced Connectors",
  /** Brief description of lesson content */
  subtitle: "Master sophisticated French linking words for complex expression.",
  /** Lesson number in B1 series */
  lessonNumber: 14,
};

// =============================================================================
// OPPOSITION CONNECTORS
// =============================================================================

/**
 * oppositionConnectors - Connectors for expressing opposition and contrast.
 *
 * Formal alternatives to "mais" (but):
 * - cependant: however (B1 formal)
 * - néanmoins: nevertheless (B1 formal)
 * - toutefois: however/though (B1 formal)
 * - par contre: on the other hand (conversational)
 * - en revanche: conversely (formal)
 */
export const oppositionConnectors = [
  { connector: "cependant", meaning: "however", example: "Il fait froid; cependant, nous sortons.", level: "B1 formal" },
  { connector: "néanmoins", meaning: "nevertheless", example: "Elle est fatiguée; néanmoins, elle travaille.", level: "B1 formal" },
  { connector: "toutefois", meaning: "however/though", example: "C'est difficile; toutefois, c'est possible.", level: "B1 formal" },
  { connector: "par contre", meaning: "on the other hand", example: "J'aime le café; par contre, je déteste le thé.", level: "conversational" },
  { connector: "en revanche", meaning: "conversely", example: "Il est pauvre; en revanche, il est heureux.", level: "formal" },
];

// =============================================================================
// CONSEQUENCE CONNECTORS
// =============================================================================

/**
 * consequenceConnectors - Connectors for expressing result and consequence.
 *
 * Formal alternatives to "donc" (so):
 * - par conséquent: consequently (formal)
 * - en conséquence: as a result (formal)
 * - de ce fait: because of this (formal)
 * - c'est pourquoi: that's why (common)
 */
export const consequenceConnectors = [
  { connector: "par conséquent", meaning: "consequently", example: "Il a triché; par conséquent, il a été exclu.", level: "formal" },
  { connector: "en conséquence", meaning: "as a result", example: "Elle a beaucoup étudié; en conséquence, elle a réussi.", level: "formal" },
  { connector: "de ce fait", meaning: "because of this", example: "Il a menti; de ce fait, personne ne lui fait confiance.", level: "formal" },
  { connector: "c'est pourquoi", meaning: "that's why", example: "Je suis malade; c'est pourquoi je reste chez moi.", level: "common" },
];

// =============================================================================
// PURPOSE CONNECTORS
// =============================================================================

/**
 * purposeConnectors - Connectors for expressing purpose and intention.
 *
 * Ways to express "in order to":
 * - dans le but de: with the aim of (formal)
 * - dans l'intention de: with the intention of (formal)
 * - afin de / afin que: in order to / so that (common)
 * Note: afin que requires subjunctive
 */
export const purposeConnectors = [
  { connector: "dans le but de", meaning: "with the aim of", example: "Il travaille dans le but de réussir.", level: "formal" },
  { connector: "dans l'intention de", meaning: "with the intention of", example: "Elle étudie dans l'intention de devenir médecin.", level: "formal" },
  { connector: "afin de / afin que", meaning: "in order to / so that", example: "Je parle lentement afin qu'il comprenne.", level: "common" },
];

// =============================================================================
// CONCESSION CONNECTORS
// =============================================================================

/**
 * concessionConnectors - Connectors for expressing concession.
 *
 * - bien que: although (+ subjunctive)
 * - quoique: even though (+ subjunctive)
 * - malgré: despite (+ noun)
 * - même si: even if (+ indicative)
 */
export const concessionConnectors = [
  { connector: "bien que", meaning: "although", example: "Bien qu'il soit riche, il n'est pas heureux.", note: "+ subjunctive" },
  { connector: "quoique", meaning: "even though", example: "Quoique je sois fatigué, je continue.", note: "+ subjunctive" },
  { connector: "malgré", meaning: "despite", example: "Malgré la pluie, nous sommes sortis.", note: "+ noun" },
  { connector: "même si", meaning: "even if", example: "Même si c'est difficile, je vais essayer.", note: "+ indicative" },
];

// =============================================================================
// TIME CONNECTORS
// =============================================================================

/**
 * timeConnectors - Time-related connectors.
 *
 * - pendant que: while (simultaneous)
 * - lorsque: when (+ imparfait for past)
 * - dès que: as soon as (future after dès que)
 * - au moment où: at the moment when (precise timing)
 */
export const timeConnectors = [
  { connector: "pendant que", meaning: "while", example: "Pendant que je lis, elle regarde la télé.", note: "simultaneous" },
  { connector: "lorsque", meaning: "when", example: "Lorsque j'étais jeune, je jouais au foot.", note: "+ imparfait" },
  { connector: "dès que", meaning: "as soon as", example: "Dès qu'il arrivera, nous partirons.", note: "future after dès que" },
  { connector: "au moment où", meaning: "at the moment when", example: "Au moment où je suis parti, il est arrivé.", note: "precise timing" },
];

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/**
 * usageExamples - Practical examples with breakdowns.
 *
 * Examples showing how each connector is used in context
 * with explanations of their meaning and grammatical notes.
 */
export const usageExamples = [
  { french: "Il fait froid; cependant, nous sortons.", breakdown: "cependant = however (introduces contrast)" },
  { french: "Elle a triché; par conséquent, elle a échoué.", breakdown: "par conséquent = consequently (shows result)" },
  { french: "Je travaille afin de réussir.", breakdown: "afin de = in order to (shows purpose)" },
  { french: "Bien qu'il soit riche, il n'est pas heureux.", breakdown: "bien que + subjunctive = although" },
  { french: "Dès qu'il arrivera, nous mangerons.", breakdown: "dès que + future = as soon as" },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 14.
 *
 * Topics covered:
 * - opposition (1-3): Opposition connectors
 * - consequence (4-5): Consequence connectors
 * - purpose (6-7): Purpose connectors
 * - concession (8-10): Concession connectors
 * - time (11-13): Time connectors
 * - formality (14): Formal vs informal
 * - mixed (15): All connectors
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
  { id: 1, topic: "opposition", prompt: "Which means 'however'?", options: ["cependant", "par conséquent", "afin de"], correct: 0, explanation: "Cependant = however" },
  { id: 2, topic: "opposition", prompt: "Which means 'nevertheless'?", options: ["néanmoins", "donc", "parce que"], correct: 0, explanation: "Néanmoins = nevertheless" },
  { id: 3, topic: "opposition", prompt: "Which is more formal than 'mais'?", options: ["toutefois", "et", "ou"], correct: 0, explanation: "Toutefois = more formal version of however" },
  { id: 4, topic: "consequence", prompt: "Which shows consequence/result?", options: ["par conséquent", "cependant", "bien que"], correct: 0, explanation: "Par conséquent = consequently" },
  { id: 5, topic: "consequence", prompt: "Which means 'that's why'?", options: ["c'est pourquoi", "malgré", "quoique"], correct: 0, explanation: "C'est pourquoi = that's why" },
  { id: 6, topic: "purpose", prompt: "Which shows purpose?", options: ["afin de", "par contre", "cependant"], correct: 0, explanation: "Afin de = in order to" },
  { id: 7, topic: "purpose", prompt: "What follows 'afin que'?", options: ["Subjunctive", "Indicative", "Conditional"], correct: 0, explanation: "Afin que requires subjunctive" },
  { id: 8, topic: "concession", prompt: "Which means 'although' and requires subjunctive?", options: ["bien que", "même si", "parce que"], correct: 0, explanation: "Bien que + subjunctive = although" },
  { id: 9, topic: "concession", prompt: "Which means 'even if' and uses indicative?", options: ["même si", "bien que", "quoique"], correct: 0, explanation: "Même si + indicative = even if" },
  { id: 10, topic: "concession", prompt: "Which means 'despite' and is followed by a noun?", options: ["malgré", "bien que", "quoique"], correct: 0, explanation: "Malgré + noun = despite" },
  { id: 11, topic: "time", prompt: "Which means 'while' for simultaneous actions?", options: ["pendant que", "dès que", "lorsque"], correct: 0, explanation: "Pendant que = while (simultaneous)" },
  { id: 12, topic: "time", prompt: "Which means 'as soon as'?", options: ["dès que", "pendant que", "lorsque"], correct: 0, explanation: "Dès que = as soon as" },
  { id: 13, topic: "time", prompt: "What tense follows 'dès que' for future?", options: ["Future", "Subjunctive", "Conditional"], correct: 0, explanation: "Dès que + future = as soon as" },
  { id: 14, topic: "formality", prompt: "Which is the most formal 'however'?", options: ["néanmoins", "par contre", "mais"], correct: 0, explanation: "Néanmoins is the most formal" },
  { id: 15, topic: "mixed", prompt: "Complete: _____ il pleuve, je sors.", options: ["Bien qu'il", "Malgré", "Même s'il"], correct: 0, explanation: "Bien que + subjunctive = although it rains" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focus on connector categories
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates advanced connector mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Advanced connectors add sophistication to your French. Focus on the categories: opposition, consequence, purpose, concession, and time.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're learning the advanced connectors. Review which ones require subjunctive vs indicative.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You've mastered the advanced connectors! Your French expression is now sophisticated and nuanced.", emoji: "🎉", color: "green" as const };
}
