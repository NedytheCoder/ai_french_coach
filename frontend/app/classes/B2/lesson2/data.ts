/**
 * B2 Lesson 2 - Idiomatic Expressions (Expressions Idiomatiques)
 * ================================================================
 *
 * This file contains all lesson data for B2 Lesson 2, teaching high-frequency
 * French idioms that make speech natural and culturally attuned.
 *
 * **Lesson Content:**
 * - Introduction to why idioms matter and the translation trap
 * - Common idioms with literal meaning, actual meaning, and register
 * - Context examples: when to use and when not to use
 * - Usage vs misuse examples
 * - Mini dialogues showing idioms in conversation
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Idioms carry cultural wisdom and shared understanding
 * - Literal translation often produces nonsense
 * - Register awareness is crucial (formal, neutral, informal, very informal)
 * - Some idioms have literary origins (e.g., avoir le cafard from Camus)
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. introSections - Introduction to idioms
 * 4. commonIdioms - Core idioms with meanings and registers
 * 5. contextExamples - When to use/when not to use
 * 6. usageVsMisuse - Correct vs incorrect usage
 * 7. miniDialogues - Conversational examples
 * 8. practiceQuestions - 15 quiz questions
 * 9. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to idioms
 * 2. what-are-idioms - Explanation of idiomatic expressions
 * 3. common-idioms - Core French idioms
 * 4. context-matters - Register and situation awareness
 * 5. usage-misuse - Correct vs incorrect examples
 * 6. dialogues - Mini conversations with idioms
 * 7. practice - Interactive quiz
 * 8. completion - Lesson completion
 */
export const sectionIds = ["intro", "what-are-idioms", "common-idioms", "context-matters", "usage-misuse", "dialogues", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Idiomatic Expressions",
  /** Brief description of lesson content */
  subtitle: "Go beyond literal meaning. Master high-frequency French idioms that make your speech natural and culturally attuned.",
  /** Lesson number in B2 series */
  lessonNumber: 2,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to idiomatic expressions.
 *
 * Content:
 * - Why idioms matter: cultural wisdom and shared understanding
 * - The translation trap: literal translation produces nonsense
 */
export const introSections = [
  {
    title: "Why Idioms Matter",
    content: "Idioms are the soul of a language. They carry cultural wisdom, humor, and shared understanding. At B2, you need to recognize and use common idioms appropriately—neither over-using them nor missing them when others speak.",
  },
  {
    title: "The Translation Trap",
    content: "Literal translation of idioms often produces nonsense. 'It's raining cats and dogs' makes sense in English, but word-for-word translation into French would confuse everyone. Instead, French has 'il pleut comme vache qui pisse' (it's raining like a pissing cow).",
  },
];

// =============================================================================
// COMMON IDIOMS
// =============================================================================

/**
 * commonIdioms - High-frequency French idioms with meanings and registers.
 *
 * Each idiom includes:
 * - idiom: French expression
 * - literal: Word-for-word English translation
 * - meaning: Actual meaning in English
 * - context: Usage situation
 * - register: Formality level (Formal, Neutral, Informal, Very informal, Literary)
 *
 * Examples:
 * - Poser un lapin: To stand someone up (Informal)
 * - Avoir le cafard: To be depressed (Literary - from Camus)
 * - Coûter les yeux de la tête: To cost an arm and a leg (Neutral)
 */
export const commonIdioms = [
  { idiom: "Poser un lapin", literal: "To leave a rabbit", meaning: "To stand someone up", context: "Rendez-vous, amitié", register: "Informal" },
  { idiom: "Coûter les yeux de la tête", literal: "To cost the eyes from the head", meaning: "To cost an arm and a leg", context: "Argent, achats", register: "Neutral" },
  { idiom: "Avoir le cafard", literal: "To have the cockroach", meaning: "To be down/depressed", context: "Émotions", register: "Literary" },
  { idiom: "Prendre la tangente", literal: "To take the tangent", meaning: "To make a quick exit/escape", context: "Situations sociales", register: "Neutral" },
  { idiom: "Avoir la pêche", literal: "To have the peach", meaning: "To feel great/full of energy", context: "Santé, énergie", register: "Very informal" },
  { idiom: "Raconter des salades", literal: "To tell salads", meaning: "To tell lies/fibs", context: "Déception, mensonge", register: "Informal" },
  { idiom: "Casser les pieds à quelqu'un", literal: "To break someone's feet", meaning: "To annoy someone", context: "Relations", register: "Informal" },
  { idiom: "Mettre les points sur les i", literal: "To put the dots on the i's", meaning: "To be clear and precise", context: "Communication", register: "Formal" },
  { idiom: "En avoir marre", literal: "To have enough", meaning: "To be fed up", context: "Frustration", register: "Very informal" },
  { idiom: "Être au bout du rouleau", literal: "To be at the end of the roll", meaning: "To be exhausted/at wit's end", context: "Fatigue, épuisement", register: "Neutral" },
];

// =============================================================================
// CONTEXT EXAMPLES
// =============================================================================

/**
 * contextExamples - When to use and when not to use specific idioms.
 *
 * Each example includes:
 * - idiom: The French expression
 * - meaning: English translation
 * - whenToUse: Appropriate contexts
 * - whenNot: Inappropriate contexts
 */
export const contextExamples = [
  { idiom: "Il pleut comme vache qui pisse", meaning: "It's raining heavily", whenToUse: "Among friends, complaining about weather", whenNot: "Formal weather reports" },
  { idiom: "On verra ça plus tard", meaning: "We'll see about that later", whenToUse: "Neutral contexts, postponing decisions", whenNot: "When you want to be direct and decisive" },
  { idiom: "Ça ne casse pas trois pattes à un canard", meaning: "It's nothing special", whenToUse: "Expressing mild disappointment politely", whenNot: "Praising something excellent" },
  { idiom: "Avoir du pain sur la planche", meaning: "To have a lot of work to do", whenToUse: "Work contexts, describing workload", whenNot: "When describing leisure time" },
];

// =============================================================================
// USAGE VS MISUSE
// =============================================================================

/**
 * usageVsMisuse - Examples of correct and incorrect idiom usage.
 *
 * Each example shows:
 * - correct: Proper usage of the idiom
 * - incorrect: Improper usage with explanation of why
 * - explanation: Reason for the error
 */
export const usageVsMisuse = [
  { correct: "Après ce projet, j'ai la pêche !", incorrect: "Après ce projet, j'ai la pêche, Monsieur le Maire.", explanation: "'La pêche' is too informal for formal authority figures" },
  { correct: "Elle m'a posé un lapin.", incorrect: "Le client a posé un lapin à la réunion.", explanation: "Business contexts require more formal language" },
  { correct: "Cet ordinateur coûte les yeux de la tête.", incorrect: "Cet stylo coûte les yeux de la tête.", explanation: "Idioms should match the scale of the situation" },
];

// =============================================================================
// MINI DIALOGUES
// =============================================================================

/**
 * miniDialogues - Conversational examples showing idioms in context.
 *
 * Dialogues:
 * - At work: Expressing frustration with "avoir du pain sur la planche"
 * - Friends making plans: Using "avoir la pêche" for enthusiasm
 *
 * Each dialogue includes speaker labels (A, B) and text.
 */
export const miniDialogues = [
  {
    context: "At work, expressing frustration",
    dialogue: [
      { speaker: "A", text: "Tu as fini le rapport ?" },
      { speaker: "B", text: "Non, j'ai tellement de travail. J'ai du pain sur la planche." },
      { speaker: "A", text: "Je comprends. On verra ça demain." },
    ],
  },
  {
    context: "Friends making plans",
    dialogue: [
      { speaker: "A", text: "Tu viens ce soir ?" },
      { speaker: "B", text: "Oui, j'ai la pêche aujourd'hui !" },
      { speaker: "A", text: "Super, on va s'amuser." },
    ],
  },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B2 Lesson 2.
 *
 * Topics covered:
 * - recognition (1-2): Understanding idiom meanings
 * - register (3, 6): Appropriate formality levels
 * - meaning (4, 8, 10, 13): Idiom definitions
 * - context (5, 9, 13): When to use idioms
 * - translation (7): Cross-language equivalents
 * - misuse (9): Common errors
 * - intensity (11): Strength of expression
 * - literary (12): Idioms from literature
 * - politeness (14): Social appropriateness
 * - appropriateness (15): Formal contexts
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
  { id: 1, topic: "recognition", prompt: "What does 'poser un lapin' mean?", options: ["To stand someone up", "To give a gift", "To make someone laugh"], correct: 0, explanation: "Poser un lapin = not showing up for a date/appointment" },
  { id: 2, topic: "recognition", prompt: "What does 'avoir le cafard' express?", options: ["Sadness/depression", "Fear of insects", "Hunger"], correct: 0, explanation: "Avoir le cafard = feeling down (from 'La peste' by Camus)" },
  { id: 3, topic: "register", prompt: "Which idiom is too informal for a job interview?", options: ["J'ai la pêche", "Je suis motivé", "Je suis compétent"], correct: 0, explanation: "'La pêche' is very casual slang" },
  { id: 4, topic: "meaning", prompt: "'Coûter les yeux de la tête' means:", options: ["To be very expensive", "To be painful", "To be dangerous"], correct: 0, explanation: "It's the French equivalent of 'cost an arm and a leg'" },
  { id: 5, topic: "context", prompt: "When would you use 'prendre la tangente'?", options: ["Leaving a boring party", "Solving a math problem", "Cooking dinner"], correct: 0, explanation: "Prendre la tangente = making a quick escape" },
  { id: 6, topic: "register", prompt: "Which is appropriate for formal writing?", options: ["Mettre les points sur les i", "Avoir la pêche", "Raconter des salades"], correct: 0, explanation: "This idiom about clarity is acceptable in formal contexts" },
  { id: 7, topic: "translation", prompt: "The English 'it's raining cats and dogs' in French is:", options: ["Il pleut comme vache qui pisse", "Il pleut des chats et des chiens", "Il pleut beaucoup"], correct: 0, explanation: "French uses a different animal metaphor (cow, not cats/dogs)" },
  { id: 8, topic: "meaning", prompt: "'Avoir du pain sur la planche' means:", options: ["To have much work ahead", "To be hungry", "To bake bread"], correct: 0, explanation: "Originally from artisans who had bread waiting to be sliced = work waiting" },
  { id: 9, topic: "misuse", prompt: "What's wrong with: 'Le ministre a posé un lapin'?", options: ["Wrong register for formal context", "Wrong meaning", "Grammatically incorrect"], correct: 0, explanation: "Too informal for describing a minister's actions" },
  { id: 10, topic: "meaning", prompt: "'Casser les pieds à quelqu'un' means:", options: ["To annoy someone", "To help someone", "To dance with someone"], correct: 0, explanation: "Literally 'break someone's feet' = annoy them" },
  { id: 11, topic: "intensity", prompt: "'En avoir marre' expresses:", options: ["Being fed up", "Being happy", "Being confused"], correct: 0, explanation: "Strong expression of having had enough" },
  { id: 12, topic: "literary", prompt: "Which idiom comes from Camus's 'La Peste'?", options: ["Avoir le cafard", "Avoir la pêche", "Poser un lapin"], correct: 0, explanation: "The cockroach metaphor for depression appears in this novel" },
  { id: 13, topic: "context", prompt: "'Être au bout du rouleau' describes:", options: ["Exhaustion/depletion", "Success", "Beginning something"], correct: 0, explanation: "At the end of the roll (paper/fabric) = nothing left" },
  { id: 14, topic: "politeness", prompt: "'Ça ne casse pas trois pattes à un canard' is:", options: ["Mild criticism", "High praise", "A question"], correct: 0, explanation: "It doesn't break three legs of a duck = nothing special" },
  { id: 15, topic: "appropriateness", prompt: "In a formal email, replace 'J'en ai marre' with:", options: ["Je souhaite explorer d'autres options", "C'est génial", "Je suis fatigué"], correct: 0, explanation: "Use formal, professional language in emails" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests reviewing core meanings and register
 * - 8-11/15: "Nice progress" - encourages context awareness
 * - 12-15/15: "Excellent command" - celebrates idiom mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Idioms require exposure and practice. Review the core meanings and pay attention to register.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are recognizing idioms well. Focus on using them appropriately in context.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand French idioms deeply. Your speech will sound natural and culturally attuned.", emoji: "🌟", color: "green" as const };
}
