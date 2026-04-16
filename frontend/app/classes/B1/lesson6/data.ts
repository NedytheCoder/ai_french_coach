/**
 * B1 Lesson 6 - Present Subjunctive Full Uses (Le Subjonctif - Tous les Emplois)
 * =============================================================================
 *
 * This file contains all lesson data for B1 Lesson 6, covering the complete
 * range of situations requiring the French subjunctive mood.
 *
 * **Lesson Content:**
 * - Emotion triggers (content que, craindre que, avoir peur que)
 * - Doubt triggers (douter que, il est douteux que)
 * - Necessity triggers (il faut que, il est nécessaire que)
 * - Conjunction triggers (pour que, bien que, à moins que, etc.)
 * - Full patterns: will/desire, orders, impersonal expressions
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Subjunctive follows expressions of emotion, doubt, necessity
 * - Many conjunctions require subjunctive (pour que, bien que, etc.)
 * - Certainty uses indicative, uncertainty uses subjunctive
 * - This lesson covers the full range of subjunctive uses at B1 level
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. emotionTriggers - Emotion expressions requiring subjunctive
 * 4. doubtTriggers - Doubt expressions requiring subjunctive
 * 5. necessityTriggers - Necessity expressions requiring subjunctive
 * 6. conjunctionTriggers - Conjunctions requiring subjunctive
 * 7. fullPatterns - Additional patterns (will, orders, impersonal)
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
 * 1. intro - Introduction to subjunctive uses
 * 2. emotion - Emotion triggers
 * 3. doubt - Doubt triggers
 * 4. necessity - Necessity triggers
 * 5. conjunctions - Subjunctive conjunctions
 * 6. full-patterns - Additional patterns
 * 7. mistakes - Common errors
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "emotion", "doubt", "necessity", "conjunctions", "full-patterns", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Present Subjunctive - Full Uses",
  /** Brief description of lesson content */
  subtitle: "Master all the situations requiring the subjunctive mood.",
  /** Lesson number in B1 series */
  lessonNumber: 6,
};

// =============================================================================
// EMOTION TRIGGERS
// =============================================================================

/**
 * emotionTriggers - Expressions of emotion that require the subjunctive.
 *
 * Emotions that trigger subjunctive:
 * - Happiness: Je suis content(e) que
 * - Fear: Je crains que, J'ai peur que
 * - Disappointment: Il est dommage que
 */
export const emotionTriggers = [
  { phrase: "Je suis content(e) que", example: "Je suis contente que tu viennes.", note: "Happiness about something" },
  { phrase: "Je crains que", example: "Je crains qu'il pleuve demain.", note: "Fear about something" },
  { phrase: "Il est dommage que", example: "Il est dommage qu'elle parte.", note: "Disappointment" },
  { phrase: "J'ai peur que", example: "J'ai peur que ce soit trop tard.", note: "Fear/worry" },
];

// =============================================================================
// DOUBT TRIGGERS
// =============================================================================

/**
 * doubtTriggers - Expressions of doubt that require the subjunctive.
 *
 * Doubt expressions:
 * - Je doute que (I doubt that)
 * - Il est douteux que (It is doubtful that)
 * - Je ne suis pas sûr(e) que (I'm not sure that)
 */
export const doubtTriggers = [
  { phrase: "Je doute que", example: "Je doute qu'il comprenne.", note: "Uncertainty" },
  { phrase: "Il est douteux que", example: "Il est douteux que ça marche.", note: "Questionable" },
  { phrase: "Je ne suis pas sûr(e) que", example: "Je ne suis pas sûr qu'il vienne.", note: "Not certain" },
];

// =============================================================================
// NECESSITY TRIGGERS
// =============================================================================

/**
 * necessityTriggers - Expressions of necessity that require the subjunctive.
 *
 * Necessity expressions:
 * - Il faut que (it is necessary that) - strongest
 * - Il est nécessaire que (it is necessary that)
 * - Il est important que (it is important that)
 * - Il vaut mieux que (it is better that)
 */
export const necessityTriggers = [
  { phrase: "Il faut que", example: "Il faut que tu travailles.", note: "Strong necessity" },
  { phrase: "Il est nécessaire que", example: "Il est nécessaire qu'on finisse.", note: "Requirement" },
  { phrase: "Il est important que", example: "Il est important que vous soyez là.", note: "Importance" },
  { phrase: "Il vaut mieux que", example: "Il vaut mieux que tu partes.", note: "Preference/advice" },
];

// =============================================================================
// CONJUNCTION TRIGGERS
// =============================================================================

/**
 * conjunctionTriggers - Conjunctions that require the subjunctive.
 *
 * Subjunctive conjunctions:
 * - Purpose: pour que, afin que (so that, in order that)
 * - Concession: bien que, quoique (although, even though)
 * - Condition: à moins que (unless)
 * - Time: avant que, jusqu'à ce que (before, until)
 */
export const conjunctionTriggers = [
  { conjunction: "pour que", meaning: "so that", example: "Je parle lentement pour qu'il comprenne." },
  { conjunction: "afin que", meaning: "in order that", example: "Je révise afin que je réussisse." },
  { conjunction: "bien que", meaning: "although", example: "Bien qu'il soit fatigué, il travaille." },
  { conjunction: "quoique", meaning: "even though", example: "Quoique je sois malade, je sors." },
  { conjunction: "à moins que", meaning: "unless", example: "Je viendrai à moins qu'il pleuve." },
  { conjunction: "avant que", meaning: "before", example: "Viens avant qu'il parte." },
  { conjunction: "jusqu'à ce que", meaning: "until", example: "Attends jusqu'à ce qu'il arrive." },
];

// =============================================================================
// FULL PATTERNS
// =============================================================================

/**
 * fullPatterns - Additional patterns requiring the subjunctive.
 *
 * Categories:
 * - Will/Desire: vouloir que, désirer que, préférer que
 * - Orders: ordonner que, exiger que
 * - Impersonal expressions: il est bon que, il est utile que
 */
export const fullPatterns = [
  { category: "Will/Desire", triggers: ["vouloir que", "désirer que", "préférer que"], example: "Je veux que tu sois honnête." },
  { category: "Orders", triggers: ["ordonner que", "exiger que"], example: "Il exige que je parte." },
  { category: "Impersonal expressions", triggers: ["il est bon que", "il est utile que"], example: "Il est bon que vous sachiez cela." },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors with the subjunctive.
 *
 * Common errors:
 * - Forgetting subjunctive after emotion expressions
 * - Using subjunctive with certainty (savoir, il est certain)
 * - Using subjunctive with probability (il est probable)
 * - Forgetting bien que requires subjunctive
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Je suis content que tu viens.", correct: "Je suis content que tu viennes.", explanation: "Emotions trigger subjunctive." },
  { wrong: "Il est probable qu'il vienne.", correct: "Il est probable qu'il vient.", explanation: "Probability uses indicative, not subjunctive." },
  { wrong: "Je sais qu'il soit là.", correct: "Je sais qu'il est là.", explanation: "Certainty (savoir) uses indicative." },
  { wrong: "Bien qu'il fait beau.", correct: "Bien qu'il fasse beau.", explanation: "Bien que always triggers subjunctive." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 6.
 *
 * Topics covered:
 * - emotion (1): Emotion triggers
 * - doubt (2): Doubt triggers
 * - necessity (3, 11): Necessity triggers
 * - conjunctions (4-6, 10, 14): Subjunctive conjunctions
 * - mistakes (7-9): Common errors
 * - will (12): Will/desire expressions
 * - impersonal (13): Impersonal expressions
 * - meaning (14): Conjunction meanings
 * - mixed (15): Certainty vs uncertainty
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
  { id: 1, topic: "emotion", prompt: "Which phrase triggers subjunctive due to emotion?", options: ["Je suis content que", "Je sais que", "Je crois que"], correct: 0, explanation: "Je suis content que expresses emotion and requires subjunctive." },
  { id: 2, topic: "doubt", prompt: "Which phrase expresses doubt?", options: ["Je doute que", "Je sais que", "Je vois que"], correct: 0, explanation: "Je doute que expresses doubt and triggers subjunctive." },
  { id: 3, topic: "necessity", prompt: "Which is the most common necessity trigger?", options: ["Il faut que", "Il est probable que", "Il semble que"], correct: 0, explanation: "Il faut que is the strongest and most common necessity trigger." },
  { id: 4, topic: "conjunctions", prompt: "Which conjunction means 'so that'?", options: ["pour que", "bien que", "avant que"], correct: 0, explanation: "Pour que means so that and triggers subjunctive." },
  { id: 5, topic: "conjunctions", prompt: "Which conjunction means 'although'?", options: ["bien que", "pour que", "afin que"], correct: 0, explanation: "Bien que means although and triggers subjunctive." },
  { id: 6, topic: "conjunctions", prompt: "Which conjunction means 'unless'?", options: ["à moins que", "jusqu'à ce que", "avant que"], correct: 0, explanation: "À moins que means unless and triggers subjunctive." },
  { id: 7, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Je suis content que tu viennes.", "Je suis content que tu viens.", "Je suis content tu viennes."], correct: 0, explanation: "Je suis content que triggers subjunctive (viennes)." },
  { id: 8, topic: "mistakes", prompt: "Which sentence uses indicative correctly?", options: ["Il est probable qu'il vient.", "Il est probable qu'il vienne.", "Il est probable qu'il venait."], correct: 0, explanation: "Il est probable uses indicative (vient), not subjunctive." },
  { id: 9, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Je sais qu'il est là.", "Je sais qu'il soit là.", "Je sais qu'il ait là."], correct: 0, explanation: "Je sais indicates certainty, so use indicative." },
  { id: 10, topic: "conjunctions", prompt: "Which conjunction means 'until'?", options: ["jusqu'à ce que", "avant que", "à moins que"], correct: 0, explanation: "Jusqu'à ce que means until and triggers subjunctive." },
  { id: 11, topic: "necessity", prompt: "Complete: Il faut que tu _____ (être) prudent.", options: ["sois", "es", "suis"], correct: 0, explanation: "Il faut que triggers subjunctive: sois." },
  { id: 12, topic: "will", prompt: "Which expresses will?", options: ["Je veux que", "Je crois que", "Je vois que"], correct: 0, explanation: "Je veux que expresses will and triggers subjunctive." },
  { id: 13, topic: "impersonal", prompt: "Which impersonal expression triggers subjunctive?", options: ["Il est important que", "Il est certain que", "Il est vrai que"], correct: 0, explanation: "Il est important que triggers subjunctive." },
  { id: 14, topic: "meaning", prompt: "What does 'afin que' mean?", options: ["so that / in order that", "although", "unless"], correct: 0, explanation: "Afin que is a more formal version of pour que." },
  { id: 15, topic: "mixed", prompt: "Which does NOT trigger subjunctive?", options: ["Il est certain que", "Il est possible que", "Il faut que"], correct: 0, explanation: "Il est certain que uses indicative because certainty = reality." },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focus on main categories
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates subjunctive mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The subjunctive has many uses. Focus on the main categories: emotion, doubt, necessity, and conjunctions.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're recognizing subjunctive triggers well. Review the difference between certainty (indicative) and uncertainty (subjunctive).", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're mastering the subjunctive uses. This is one of the most advanced aspects of French grammar.", emoji: "🎉", color: "green" as const };
}
