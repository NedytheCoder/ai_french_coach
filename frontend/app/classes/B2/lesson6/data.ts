/**
 * B2 Lesson 6 - Advanced Passive Voice
 * =======================================
 *
 * This file contains all lesson data for B2 Lesson 6, teaching advanced
 * passive voice constructions across all tenses and stylistic usage.
 *
 * **Lesson Content:**
 * - Introduction: Why passive matters and the core transformation
 * - Formation: Être + past participle + par + agent (optional)
 * - Tenses table: Passive in all tenses from présent to subjonctif passé
 * - Stylistic choice: When to use active vs passive
 * - Agent omission: When and why to omit the par + agent phrase
 * - Informational focus: Topic vs comment structure
 * - Transformation drills: Active to passive conversion practice
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Passive formation: Être (conjugated) + past participle (agrees with subject)
 * - Agent is optional and often omitted (unknown, unimportant, diplomatic)
 * - Passive creates formality, objectivity, and emphasis on action/recipient
 * - Active preferred for clarity, directness, everyday conversation
 * - Information flow: French prefers known → new (passive helps achieve this)
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. introSections - Introduction to passive voice
 * 4. formationInfo - Passive formation rule and examples
 * 5. tensesTable - Passive conjugation across all tenses
 * 6. stylisticChoice - When to use active vs passive
 * 7. agentOmission - Scenarios for omitting the agent
 * 8. informationalFocus - Topic vs comment information structure
 * 9. transformationDrills - Active to passive transformation exercises
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
 * 1. intro - Introduction to passive voice
 * 2. formation - Passive formation rule
 * 3. tenses - Passive across all tenses
 * 4. stylistic-choice - When to use active vs passive
 * 5. agent-omission - Omitting the agent
 * 6. informational-focus - Topic vs comment structure
 * 7. transformation - Transformation drills
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "formation", "tenses", "stylistic-choice", "agent-omission", "informational-focus", "transformation", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Advanced Passive Voice",
  /** Brief description of lesson content */
  subtitle: "Master passive constructions across all tenses. Understand when passive creates formality, objectivity, or emphasis—and when active voice serves you better.",
  /** Lesson number in B2 series */
  lessonNumber: 6,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to passive voice.
 *
 * Content:
 * - Why Passive Matters: Choosing between active and passive with intention
 * - The Core Transformation: Object becomes subject, verb becomes être + participle
 */
export const introSections = [
  {
    title: "Why Passive Matters",
    content: "The passive voice shifts focus from the actor to the action or its recipient. At B2, you choose between active and passive not from ignorance but with intention—understanding how each affects tone, clarity, and emphasis.",
  },
  {
    title: "The Core Transformation",
    content: "Active: Le chien a mordu l'homme. Passive: L'homme a été mordu par le chien. The object becomes subject; the verb becomes être + past participle; the agent becomes optional.",
  },
];

// =============================================================================
// FORMATION INFORMATION
// =============================================================================

/**
 * formationInfo - Passive formation rule and examples across tenses.
 *
 * Rule: Être (conjugated) + past participle (agrees with subject) + par + agent (optional)
 *
 * Examples across tenses:
 * - Present: Le repas est préparé
 * - Passé composé: Le repas a été préparé
 * - Imparfait: Le repas était préparé
 * - Future: Le repas sera préparé
 * - Conditional: Le repas serait préparé
 * - Subjunctive: Il faut que le repas soit préparé
 */
export const formationInfo = {
  title: "Passive Formation",
  rule: "Être (conjugated) + past participle (agrees with subject) + par + agent (optional)",
  examples: [
    { tense: "Present", active: "Le chef prépare le repas.", passive: "Le repas est préparé (par le chef)." },
    { tense: "Passé composé", active: "Le chef a préparé le repas.", passive: "Le repas a été préparé (par le chef)." },
    { tense: "Imparfait", active: "Le chef préparait le repas.", passive: "Le repas était préparé (par le chef)." },
    { tense: "Future", active: "Le chef préparera le repas.", passive: "Le repas sera préparé (par le chef)." },
    { tense: "Conditional", active: "Le chef préparerait le repas.", passive: "Le repas serait préparé (par le chef)." },
    { tense: "Subjunctive present", active: "Il faut que le chef prépare le repas.", passive: "Il faut que le repas soit préparé." },
  ],
};

// =============================================================================
// TENSES TABLE
// =============================================================================

/**
 * tensesTable - Passive voice conjugation across all tenses.
 *
 * Tenses covered:
 * - Présent: est (La lettre est écrite)
 * - Passé composé: a été (La lettre a été écrite)
 * - Imparfait: était (La lettre était écrite)
 * - Plus-que-parfait: avait été (La lettre avait été écrite)
 * - Futur simple: sera (La lettre sera écrite)
 * - Futur antérieur: aura été (La lettre aura été écrite)
 * - Conditionnel présent: serait (La lettre serait écrite)
 * - Conditionnel passé: aurait été (La lettre aurait été écrite)
 * - Subjonctif présent: soit (Il faut que la lettre soit écrite)
 * - Subjonctif passé: ait été (Il faut que la lettre ait été écrite)
 */
export const tensesTable = [
  { tense: "Présent", être: "est", example: "La lettre est écrite." },
  { tense: "Passé composé", être: "a été", example: "La lettre a été écrite." },
  { tense: "Imparfait", être: "était", example: "La lettre était écrite." },
  { tense: "Plus-que-parfait", être: "avait été", example: "La lettre avait été écrite." },
  { tense: "Futur simple", être: "sera", example: "La lettre sera écrite." },
  { tense: "Futur antérieur", être: "aura été", example: "La lettre aura été écrite." },
  { tense: "Conditionnel présent", être: "serait", example: "La lettre serait écrite." },
  { tense: "Conditionnel passé", être: "aurait été", example: "La lettre aurait été écrite." },
  { tense: "Subjonctif présent", être: "soit", example: "Il faut que la lettre soit écrite." },
  { tense: "Subjonctif passé", être: "ait été", example: "Il faut que la lettre ait été écrite." },
];

// =============================================================================
// STYLISTIC CHOICE
// =============================================================================

/**
 * stylisticChoice - When to use active vs passive voice.
 *
 * When Active:
 * - Clarity and directness (Le comité a voté la loi)
 * - Everyday conversation (J'ai fait les courses)
 * - Responsibility emphasis (Vous avez commis une erreur)
 *
 * When Passive:
 * - Unknown or unimportant actor (La voiture a été volée)
 * - Formal/Academic tone (Il a été démontré que...)
 * - Object/topic focus (Ce livre a été traduit en 20 langues)
 * - Diplomatic indirectness (Une erreur a été commise)
 */
export const stylisticChoice = {
  title: "Active vs. Passive: Stylistic Decisions",
  whenActive: [
    { situation: "Clarity and directness", example: "Le comité a voté la loi. (clear actor)" },
    { situation: "Everyday conversation", example: "J'ai fait les courses. (natural)" },
    { situation: "Responsibility emphasis", example: "Vous avez commis une erreur. (direct)" },
  ],
  whenPassive: [
    { situation: "Unknown or unimportant actor", example: "La voiture a été volée. (we don't know who)" },
    { situation: "Formal/Academic tone", example: "Il a été démontré que... (objective)" },
    { situation: "Object/topic focus", example: "Ce livre a été traduit en 20 langues. (book is topic)" },
    { situation: "Diplomatic indirectness", example: "Une erreur a été commise. (avoiding blame)" },
  ],
};

// =============================================================================
// AGENT OMISSION
// =============================================================================

/**
 * agentOmission - When and why to omit the par + agent phrase.
 *
 * The par + agent phrase is optional. Omitting it creates mystery,
 * shifts focus, or acknowledges unknown actors.
 *
 * Scenarios:
 * - Unknown actor: Ma voiture a été rayée (I don't know who)
 * - Unimportant actor: Le rapport a été publié (report matters, not who)
 * - General knowledge: La tour Eiffel a été construite en 1889
 * - Diplomatic vagueness: Des erreurs ont été commises (avoiding blame)
 */
export const agentOmission = {
  title: "When to Omit the Agent",
  explanation: "The par + agent phrase is optional. Omitting it creates mystery, shifts focus, or acknowledges unknown actors.",
  scenarios: [
    { scenario: "Unknown actor", example: "Ma voiture a été rayée.", note: "I don't know who did it" },
    { scenario: "Unimportant actor", example: "Le rapport a été publié hier.", note: "The report matters, not who published it" },
    { scenario: "General knowledge", example: "La tour Eiffel a été construite en 1889.", note: "Everyone knows Eiffel's company built it" },
    { scenario: "Diplomatic vagueness", example: "Des erreurs ont été commises.", note: "Avoiding specific blame" },
  ],
};

// =============================================================================
// INFORMATIONAL FOCUS
// =============================================================================

/**
 * informationalFocus - Topic vs comment information structure.
 *
 * French prefers to move from known to new information.
 * Passive helps rearrange this flow.
 *
 * Example:
 * - Active (abrupt): Marie a écrit ce livre. Édité en 2020, il...
 *   (Jump from Marie to 'il' is abrupt)
 * - Passive (smooth): Ce livre a été écrit par Marie. Édité en 2020, il...
 *   (Smooth flow: book → book → book)
 */
export const informationalFocus = {
  title: "Information Structure: Topic vs. Comment",
  explanation: "French prefers to move from known to new information. Passive helps rearrange this flow.",
  examples: [
    { arrangement: "Active (actor known)", sentence: "Marie a écrit ce livre. Édité en 2020, il...", critique: "Jump from Marie to 'il' is abrupt" },
    { arrangement: "Passive (object as topic)", sentence: "Ce livre a été écrit par Marie. Édité en 2020, il...", critique: "Smooth flow: book → book → book" },
  ],
};

// =============================================================================
// TRANSFORMATION DRILLS
// =============================================================================

/**
 * transformationDrills - Active to passive transformation exercises.
 *
 * Drills:
 * - Standard transformation: Le professeur explique → La leçon est expliquée
 * - Agent omission with dates: Les ouvriers ont construit → Ce pont a été construit en 1950
 * - Unknown actor: Quelqu'un a volé → Mon vélo a été volé
 * - On passive transformation: On a découvert → Une erreur a été découverte
 * - Modal + passive infinitive: Le gouvernement doit résoudre → Ce problème doit être résolu
 */
export const transformationDrills = [
  { active: "Le professeur explique la leçon.", passive: "La leçon est expliquée par le professeur.", note: "Standard transformation" },
  { active: "Les ouvriers ont construit ce pont en 1950.", passive: "Ce pont a été construit (par les ouvriers) en 1950.", note: "Agent can be omitted (dates more important)" },
  { active: "Quelqu'un a volé mon vélo.", passive: "Mon vélo a été volé.", note: "Unknown actor = agent omitted" },
  { active: "On a découvert une erreur.", passive: "Une erreur a été découverte.", note: "On passive → true passive (more formal)" },
  { active: "Le gouvernement doit résoudre ce problème.", passive: "Ce problème doit être résolu (par le gouvernement).", note: "Modal verb + passive infinitive" },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B2 Lesson 6.
 *
 * Topics covered:
 * - formation (1): Passive uses être auxiliary
 * - agreement (2): Participle agrees with new subject
 * - tense (3): Passé composé passive (a été)
 * - agent (4): Par phrase is optional
 * - stylistic (5): Use passive when actor unknown
 * - formality (6): Passive creates formal/objective tone
 * - transformation (7): Keep tense consistency in transformation
 * - omission (8): Omit agent when actor unknown (theft)
 * - modal (9): Modal + passive infinitive (doit être résolu)
 * - tense-table (10): Imparfait passive (était écrite)
 * - feminine (11): Agreement with feminine subject (construite)
 * - on-passive (12): On passive → true passive transformation
 * - future (13): Future passive (sera lancé)
 * - academic (14): Passive for objectivity in academic writing
 * - reflexive (15): Distinguishing passive from reflexive
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
  { id: 1, topic: "formation", prompt: "Passive uses which auxiliary?", options: ["être", "avoir", "faire"], correct: 0, explanation: "Passive = être + past participle" },
  { id: 2, topic: "agreement", prompt: "In passive, the past participle agrees with:", options: ["The subject (new subject)", "The original subject", "The verb"], correct: 0, explanation: "Participle agrees with the new grammatical subject" },
  { id: 3, topic: "tense", prompt: "What is 'La lettre a été écrite'?", options: ["Passé composé passive", "Present passive", "Imparfait passive"], correct: 0, explanation: "A été = passé composé of être" },
  { id: 4, topic: "agent", prompt: "The 'par' phrase (agent) is:", options: ["Optional", "Always required", "Only in formal contexts"], correct: 0, explanation: "Agent can be omitted for various reasons" },
  { id: 5, topic: "stylistic", prompt: "Use passive when the actor is:", options: ["Unknown or unimportant", "The main focus", "Very important"], correct: 0, explanation: "Passive shifts focus away from actor" },
  { id: 6, topic: "formality", prompt: "Passive creates:", options: ["More formal/objective tone", "More casual tone", "Emotional emphasis"], correct: 0, explanation: "Passive is associated with formal/academic writing" },
  { id: 7, topic: "transformation", prompt: "Transform: 'Le chef a préparé le repas'", options: ["Le repas a été préparé par le chef.", "Le repas est préparé par le chef.", "Le repas était préparé par le chef."], correct: 0, explanation: "Keep tense: passé composé → a été" },
  { id: 8, topic: "omission", prompt: "In 'Ma voiture a été volée', the agent is omitted because:", options: ["Unknown actor", "Actor is obvious", "Actor is unimportant"], correct: 0, explanation: "Typically unknown in theft contexts" },
  { id: 9, topic: "modal", prompt: "Modal + passive: 'Ce problème doit _____'", options: ["être résolu", "résolu être", "avoir résolu"], correct: 0, explanation: "Devoir + être + past participle" },
  { id: 10, topic: "tense-table", prompt: "What is the imparfait passive of 'écrire'?", options: ["était écrite", "a été écrite", "serait écrite"], correct: 0, explanation: "Imparfait of être (était) + participle" },
  { id: 11, topic: "feminine", prompt: "'La maison _____ (construire) en 1900'", options: ["a été construite", "a été construit", "est construite"], correct: 0, explanation: "Agreement: maison (f) → construite + -e" },
  { id: 12, topic: "on-passive", prompt: "'On a découvert une erreur' → passive:", options: ["Une erreur a été découverte.", "Une erreur est découverte.", "Une erreur a découvert."], correct: 0, explanation: "On passive transforms to true passive" },
  { id: 13, topic: "future", prompt: "Futur passive of 'Le projet sera lancé':", options: ["Future passive", "Present passive", "Conditional passive"], correct: 0, explanation: "Sera + participle = future passive" },
  { id: 14, topic: "academic", prompt: "In academic writing, prefer:", options: ["Passive for objectivity", "Active for energy", "Imperative for clarity"], correct: 0, explanation: "Passive creates distance and objectivity" },
  { id: 15, topic: "reflexive", prompt: "Which is NOT passive?", options: ["Elle se lave.", "Elle est lavée.", "Elle a été lavée."], correct: 0, explanation: "Se laver = reflexive (she washes herself), not passive" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on être + participle agreement
 * - 8-11/15: "Nice progress" - encourages mastering stylistic choices
 * - 12-15/15: "Excellent command" - celebrates complete passive voice mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Passive voice requires practice. Focus on être + participle agreement and tense consistency.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are mastering passive constructions. Focus on when to use passive vs. active for stylistic effect.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand passive voice deeply. You can transform sentences and choose between active and passive with intention.", emoji: "🌟", color: "green" as const };
}
