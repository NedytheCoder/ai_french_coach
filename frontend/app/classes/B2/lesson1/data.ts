/**
 * B2 Lesson 1 - Formal and Informal Registers (Soutenu, Courant, Familier)
 * ========================================================================
 *
 * This file contains all lesson data for B2 Lesson 1, teaching register
 * awareness and the ability to navigate between formal, neutral, and casual
 * French appropriately.
 *
 * **Lesson Content:**
 * - Introduction to the three registers: soutenu, courant, familier
 * - Tu vs Vous: Social dynamics and context-based choice
 * - Formal French markers: subjunctive, passive voice, nominalisation
 * - Informal French markers: dropped ne, filler words, verlan
 * - Rewriting examples: same content in three registers
 * - Comparison table for common situations
 * - Common mistakes in register usage
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Soutenu: formal/written register
 * - Courant: neutral/standard register
 * - Familier: casual/spoken register
 * - Register mixing creates cognitive dissonance
 * - Context determines appropriate register
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. introSections - Introduction to registers
 * 4. tuVsVous - Tu versus vous usage guide
 * 5. formalMarkers - Features of formal French
 * 6. informalMarkers - Features of informal French
 * 7. rewritingExamples - Same content in three registers
 * 8. comparisonTable - Situation-based register comparison
 * 9. commonMistakes - Register errors to avoid
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
 * 1. intro - Introduction to registers
 * 2. what-is-register - Three registers explained
 * 3. tu-vs-vous - Tu versus vous usage
 * 4. formal-markers - Formal French features
 * 5. informal-markers - Informal French features
 * 6. rewriting - Rewriting in different registers
 * 7. comparison - Situation comparison
 * 8. mistakes - Common errors
 * 9. practice - Interactive quiz
 * 10. completion - Lesson completion
 */
export const sectionIds = ["intro", "what-is-register", "tu-vs-vous", "formal-markers", "informal-markers", "rewriting", "comparison", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Formal and Informal Registers",
  /** Brief description of lesson content */
  subtitle: "Master the art of choosing the right level of language for every situation. At B2, you need to navigate effortlessly between formal, neutral, and casual French.",
  /** Lesson number in B2 series */
  lessonNumber: 1,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to register concepts.
 *
 * Content:
 * - Why register matters: social intelligence and context awareness
 * - The three registers: soutenu, courant, familier
 */
export const introSections = [
  {
    title: "Why Register Matters",
    content: "Register is not just about politeness—it's about social intelligence. Using the wrong register can make you sound arrogant, disrespectful, or simply out of place. At B2, you must demonstrate awareness of context and adapt your language accordingly.",
  },
  {
    title: "The Three Registers",
    content: "French operates primarily in three registers: soutenu (formal/written), courant (neutral/standard), and familier (casual/spoken). Each has distinct vocabulary, grammatical structures, and pronunciation patterns.",
  },
];

// =============================================================================
// TU VERSUS VOUS
// =============================================================================

/**
 * tuVsVous - Guide to choosing between tu and vous.
 *
 * The choice reflects social dynamics: power, solidarity, age, and context.
 * - vous: maintains distance and respect (professional settings)
 * - tu: signals equality, intimacy, or deliberate informality
 *
 * Examples by context:
 * - Job interview: vous (respect for hierarchy)
 * - First meeting, same age: vous or ask permission
 * - Work colleague after months: tu (established rapport)
 * - Email to unknown: vous (default to formality)
 */
export const tuVsVous = {
  title: "Tu versus Vous: Beyond Grammar",
  explanation: "The choice between tu and vous reflects social dynamics: power, solidarity, age, and context. In professional settings, vous maintains distance and respect. Tu signals equality, intimacy, or a deliberate choice to break formality.",
  examples: [
    { context: "Job interview", choice: "vous", explanation: "Respect for hierarchy and professional distance" },
    { context: "First meeting, same age", choice: "vous or on se tutoie?", explanation: "Often preceded by asking permission to use tu" },
    { context: "Work colleague after months", choice: "tu", explanation: "Established rapport allows informality" },
    { context: "Email to unknown recipient", choice: "vous", explanation: "Default to formality when uncertain" },
  ],
};

// =============================================================================
// FORMAL MARKERS
// =============================================================================

/**
 * formalMarkers - Features that mark formal (soutenu) French.
 *
 * Markers:
 * - Subjunctive abundance: more frequent in formal contexts
 * - Conditional politeness: softens requests
 * - Passive voice: impersonal constructions
 * - Nominalisation: using nouns instead of verbs
 * - Complex connectors: cependant, néanmoins, par conséquent
 * - Full forms: preservation of ne in negatives
 */
export const formalMarkers = {
  title: "Markers of Formal French",
  features: [
    { feature: "Subjunctive abundance", example: "Il est nécessaire que vous soyez présent", note: "More frequent in formal contexts" },
    { feature: "Conditional politeness", example: "Je voudrais vous demander", note: "Softens requests" },
    { feature: "Passif (passive voice)", example: "Il a été décidé que...", note: "Impersonal constructions" },
    { feature: "Nominalisation", example: "La réalisation du projet", note: "Nouns instead of verbs" },
    { feature: "Complex connectors", example: "Cependant, néanmoins, par conséquent", note: "Sophisticated linking words" },
    { feature: "Full forms (not elided)", example: "Je ne sais pas (not 'sais pas')", note: "Preservation of ne in negatives" },
  ],
};

// =============================================================================
// INFORMAL MARKERS
// =============================================================================

/**
 * informalMarkers - Features that mark informal (familier) French.
 *
 * Markers:
 * - Dropping ne: very common in speech
 * - Reduced forms: Chuis (je suis), T'es (tu es)
 * - Filler words: genre, du coup, enfin bref
 * - Vague quantifiers: un truc, des machins
 * - No question inversion: Tu viens? not Viens-tu?
 * - Slang and verlan: meuf (femme), keum (mec)
 */
export const informalMarkers = {
  title: "Markers of Informal French",
  features: [
    { feature: "Dropping ne", example: "Je sais pas", note: "Very common in speech" },
    { feature: "Tu's and reduced forms", example: "Chuis (je suis), T'es (tu es)", note: "Phonetic reductions" },
    { feature: "Filler words", example: "Genre, du coup, enfin bref", note: "Discourse markers" },
    { feature: "Vague quantifiers", example: "Un truc, des machins", note: "Non-specific references" },
    { feature: "Question inversion dropped", example: "Tu viens ? (not Viens-tu ?)", note: "Subject-verb order" },
    { feature: "Slang and verlan", example: "Meuf (femme), keum (mec)", note: "Youth and urban language" },
  ],
};

// =============================================================================
// REWRITING EXAMPLES
// =============================================================================

/**
 * rewritingExamples - Same content expressed in three registers.
 *
 * Examples:
 * - Requesting availability
 * - Expressing misunderstanding
 * - Urgency in completing work
 *
 * Each example shows neutral, formal, and informal versions.
 */
export const rewritingExamples = [
  {
    neutral: "Je voudrais savoir si vous êtes disponible demain.",
    formal: "Je souhaiterais prendre connaissance de votre disponibilité pour demain.",
    informal: "T'es libre demain ou quoi ?",
    note: "Requesting availability",
  },
  {
    neutral: "Je ne comprends pas ce que tu dis.",
    formal: "Je n'ai pas saisi le sens de vos propos.",
    informal: "J'ai rien capté à ce que tu racontes.",
    note: "Expressing misunderstanding",
  },
  {
    neutral: "Il faut finir ce travail rapidement.",
    formal: "Il est impératif d'achever ce travail dans les plus brefs délais.",
    informal: "Faut qu'on boucle ça vite fait !",
    note: "Urgency in completing work",
  },
];

// =============================================================================
// COMPARISON TABLE
// =============================================================================

/**
 * comparisonTable - Situation-based register comparison.
 *
 * Situations:
 * - Job application email
 * - Asking for help
 * - Disagreeing politely
 * - Thanking sincerely
 *
 * Each situation shows formal, neutral, and informal versions.
 */
export const comparisonTable = [
  { situation: "Job application email", formal: "Je me permets de vous adresser ma candidature", neutral: "Je vous envoie ma candidature", informal: "Je te envoie mon CV (never!)" },
  { situation: "Asking for help", formal: "Pourriez-vous m'accorder votre assistance ?", neutral: "Pourriez-vous m'aider ?", informal: "Tu peux m'aider ?" },
  { situation: "Disagreeing politely", formal: "Je ne partage pas tout à fait cette opinion", neutral: "Je ne suis pas d'accord", informal: "C'est n'importe quoi !" },
  { situation: "Thanking sincerely", formal: "Je vous saurais gré de bien vouloir...", neutral: "Je vous remercie beaucoup", informal: "Merci, t'es trop cool !" },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors in register usage.
 *
 * Mistakes:
 * - Using tu with a client's CEO (over-familiarity)
 * - Writing 'je sais pas' in formal email
 * - Over-using subjunctive in casual conversation
 * - Mixing registers inconsistently
 *
 * Each mistake includes the problem and solution.
 */
export const commonMistakes = [
  { wrong: "Using tu with a client's CEO", problem: "Over-familiarity can damage professional relationships", solution: "Always default to vous in business until invited otherwise" },
  { wrong: "Writing 'je sais pas' in a formal email", problem: "Informal constructions undermine credibility", solution: "Use complete forms: je ne sais pas" },
  { wrong: "Over-using subjunctive in casual conversation", problem: "Can sound pedantic or artificial", solution: "Match register to context" },
  { wrong: "Mixing registers inconsistently", problem: "Creates cognitive dissonance for the listener", solution: "Maintain register consistency within a text or conversation" },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B2 Lesson 1.
 *
 * Topics covered:
 * - register-recognition (1): Identifying formal versions
 * - tu-vous (2): When to use vous vs tu
 * - formal-markers (3, 8): Features of formal French
 * - informal-markers (4, 13): Features of informal French
 * - rewriting (5): Converting to formal register
 * - context (6): Choosing register for situation
 * - conditional (7): Polite request forms
 * - inappropriate (9): What's never formal
 * - nominalisation (10): Noun-based formal style
 * - email (11): Formal email openings
 * - over-formal (12): When formal sounds wrong
 * - verlan (13): Back slang recognition
 * - consistency (14): Problems with mixing
 * - professional (15): Professional communication
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
  { id: 1, topic: "register-recognition", prompt: "Which is the most formal version?", options: ["Je me permets de solliciter votre attention", "J'aimerais te parler", "Faut que je te dise un truc"], correct: 0, explanation: "Solliciter and me permets are formal markers" },
  { id: 2, topic: "tu-vous", prompt: "In a first business meeting, you should use:", options: ["vous until invited to use tu", "tu to be friendly", "on"], correct: 0, explanation: "Default to vous in professional contexts" },
  { id: 3, topic: "formal-markers", prompt: "Which feature marks formal French?", options: ["Preservation of 'ne' in negatives", "Dropping 'ne'", "Using 'genre' as filler"], correct: 0, explanation: "Keeping ne (je ne sais pas) is formal" },
  { id: 4, topic: "informal-markers", prompt: "Which is informal/casual?", options: ["Chuis fatigué", "Je suis fatigué", "Je me sens fatigué"], correct: 0, explanation: "Chuis is a phonetic reduction of je suis" },
  { id: 5, topic: "rewriting", prompt: "Rewrite formally: 'Faut qu'on parle'", options: ["Il est nécessaire que nous discussions", "Il faut qu'on parle", "Faut parler"], correct: 0, explanation: "Nominalisation (discussion) and nous make it formal" },
  { id: 6, topic: "context", prompt: "For a university application letter, use:", options: ["Formal register", "Informal register", "Familiar slang"], correct: 0, explanation: "Academic applications require soutenu register" },
  { id: 7, topic: "conditional", prompt: "Which softens a request politely?", options: ["Je voudrais", "Je veux", "Faut que j'aie"], correct: 0, explanation: "Conditional (voudrais) is polite and formal" },
  { id: 8, topic: "passive", prompt: "Which uses impersonal formal construction?", options: ["Il a été décidé que...", "On a décidé que...", "J'ai décidé que..."], correct: 0, explanation: "Passive voice (il a été décidé) is formal" },
  { id: 9, topic: "inappropriate", prompt: "Which is NEVER appropriate in formal writing?", options: ["Du coup", "Cependant", "Néanmoins"], correct: 0, explanation: "Du coup is spoken/informal only" },
  { id: 10, topic: "nominalisation", prompt: "Which demonstrates nominalisation?", options: ["La réalisation du projet", "Nous réalisons le projet", "On réalise le projet"], correct: 0, explanation: "Turning the verb into a noun (nominalisation) is formal" },
  { id: 11, topic: "email", prompt: "How to begin a formal email to an unknown person?", options: ["Madame, Monsieur,", "Salut !", "Coucou"], correct: 0, explanation: "Madame, Monsieur is standard formal opening" },
  { id: 12, topic: "over-formal", prompt: "Which might sound overly formal in casual conversation?", options: ["Je souhaiterais", "Je veux", "J'aimerais"], correct: 0, explanation: "Souhaiterais can sound stiff in casual contexts" },
  { id: 13, topic: "verlan", prompt: "Which is verlan (back slang)?", options: ["meuf", "femme", "fille"], correct: 0, explanation: "Meuf is verlan for femme" },
  { id: 14, topic: "consistency", prompt: "What happens when you mix registers inconsistently?", options: ["Sounds awkward/confusing", "Shows versatility", "Impresses listeners"], correct: 0, explanation: "Register mixing creates cognitive dissonance" },
  { id: 15, topic: "professional", prompt: "In a professional email, avoid:", options: ["Abbreviations like 'bcp' for beaucoup", "Complete sentences", "Clear subject lines"], correct: 0, explanation: "Text abbreviations are too informal for professional contexts" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests reviewing formal markers
 * - 8-11/15: "Solid progress" - encourages continued practice
 * - 12-15/15: "Excellent command" - celebrates register mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Register awareness takes time to develop. Review the formal markers and practice identifying context clues.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Solid progress", message: "You are developing good register sensitivity. Focus on distinguishing subtle formal markers and practicing rewrites.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You demonstrate strong awareness of French registers. You can navigate between formal, neutral, and informal contexts effectively.", emoji: "🌟", color: "green" as const };
}
