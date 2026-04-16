/**
 * B2 Lesson 10 - High-Level Connectors & Transitions
 * =====================================================
 *
 * This file contains all lesson data for B2 Lesson 10, teaching sophisticated
 * discourse markers for advanced French communication.
 *
 * **Lesson Content:**
 * - Introduction: Beyond basic connectors, discourse architecture
 * - Logic categories: Addition, contrast, concession, cause, consequence, restriction
 * - Contrast section: Sophisticated opposition markers (cependant, néanmoins, etc.)
 * - Consequence section: Cause and consequence connectors
 * - Chronology section: Temporal and logical sequencing
 * - Exemplification section: Illustration markers
 * - Summary section: Conclusion and synthesis markers
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Basic connectors (et, mais, donc) → Advanced connectors (cependant, par conséquent)
 * - Register distinctions: Formal vs neutral usage
 * - Logical relationships: Opposition, concession, cause, consequence, chronology
 * - Discourse structure: Opening, continuation, conclusion markers
 * - Position flexibility: Most formal connectors can start sentences or appear mid-sentence
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. introSections - Introduction to high-level connectors
 * 4. logicCategories - Connector categories with basic → advanced progression
 * 5. contrastSection - Sophisticated contrast and opposition
 * 6. consequenceSection - Cause and consequence connectors
 * 7. chronologySection - Chronological and logical sequencing
 * 8. exemplificationSection - Exemplification and illustration
 * 9. summarySection - Summary and conclusion markers
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
 * 1. intro - Introduction to high-level connectors
 * 2. logic - Logic categories overview
 * 3. contrast - Sophisticated contrast markers
 * 4. consequence - Cause and consequence
 * 5. chronology - Chronological sequencing
 * 6. exemplification - Exemplification markers
 * 7. summary - Summary and conclusion
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "logic", "contrast", "consequence", "chronology", "exemplification", "summary", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "High-Level Connectors & Transitions",
  /** Brief description of lesson content */
  subtitle: "Master sophisticated discourse markers that create cohesion, flow, and logical structure in advanced French communication.",
  /** Lesson number in B2 series */
  lessonNumber: 10,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to high-level connectors.
 *
 * Content:
 * - Beyond Basic Connectors: Moving beyond et, mais, donc
 * - Discourse Architecture: How connectors structure and guide messages
 */
export const introSections = [
  {
    title: "Beyond Basic Connectors",
    content: "At B2, you move beyond simple et, mais, donc. You need connectors that express subtle logical relationships: opposition, concession, cause, consequence, chronology, restriction.",
  },
  {
    title: "Discourse Architecture",
    content: "Connectors structure your message. They guide readers through your reasoning, signal turns in argumentation, and create sophisticated rhetorical patterns.",
  },
];

// =============================================================================
// LOGIC CATEGORIES
// =============================================================================

/**
 * logicCategories - Connector categories with basic → advanced progression.
 *
 * Categories:
 * - Addition: et → de plus, en outre, par ailleurs, qui plus est
 * - Contrast: mais → cependant, néanmoins, toutefois, pourtant, en revanche
 * - Concession: bien que → certes... mais, il est vrai que... mais
 * - Cause: parce que → puisque, étant donné que, vu que, du fait que
 * - Consequence: donc → par conséquent, dès lors, ainsi, c'est pourquoi
 * - Restriction: mais → seulement, sauf que, excepté que, tout au plus
 */
export const logicCategories = [
  { category: "Addition", basic: "et", advanced: ["de plus", "en outre", "par ailleurs", "qui plus est"], example: "En outre, cette solution est économique." },
  { category: "Contrast", basic: "mais", advanced: ["cependant", "néanmoins", "toutefois", "pourtant", "en revanche"], example: "Néanmoins, il reste des obstacles." },
  { category: "Concession", basic: "bien que", advanced: ["certes... mais", "il est vrai que... mais", "sans doute... cependant"], example: "Certes, c'est cher, mais c'est durable." },
  { category: "Cause", basic: "parce que", advanced: ["puisque", "étant donné que", "vu que", "du fait que"], example: "Étant donné que nous avons peu de temps..." },
  { category: "Consequence", basic: "donc", advanced: ["par conséquent", "dès lors", "ainsi", "c'est pourquoi", "de ce fait"], example: "Par conséquent, nous devons agir vite." },
  { category: "Restriction", basic: "mais", advanced: ["seulement", "sauf que", "excepté que", "tout au plus"], example: "Il viendra, seulement en retard." },
];

// =============================================================================
// CONTRAST SECTION
// =============================================================================

/**
 * contrastSection - Sophisticated contrast and opposition connectors.
 *
 * Connectors:
 * - cependant: Formal, neutral opposition
 * - néanmoins: Formal, stronger opposition
 * - toutefois: Formal, qualification
 * - pourtant: Neutral, unexpected contrast
 * - en revanche: Neutral, alternative perspective
 * - au contraire: Neutral, strong contradiction
 *
 * Position note: Most formal connectors can start sentences or appear after subject.
 */
export const contrastSection = {
  title: "Sophisticated Contrast and Opposition",
  connectors: [
    { connector: "cependant", register: "Formal", usage: "Neutral opposition", example: "Cependant, cette approche présente des risques." },
    { connector: "néanmoins", register: "Formal", usage: "Stronger opposition", example: "Néanmoins, il persévéra dans son projet." },
    { connector: "toutefois", register: "Formal", usage: "Qualification", example: "Toutefois, il convient de nuancer." },
    { connector: "pourtant", register: "Neutral", usage: "Unexpected contrast", example: "Pourtant, tout semblait facile." },
    { connector: "en revanche", register: "Neutral", usage: "Alternative perspective", example: "En revanche, les coûts augmentent." },
    { connector: "au contraire", register: "Neutral", usage: "Strong contradiction", example: "Au contraire, il faut accélérer." },
  ],
  positionNote: "Most formal connectors can start sentences or appear after subject (il néanmoins persévéra).",
};

// =============================================================================
// CONSEQUENCE SECTION
// =============================================================================

/**
 * consequenceSection - Cause and consequence connectors.
 *
 * Cause connectors:
 * - puisque: since/because (known fact)
 * - étant donné que: given that (formal)
 * - vu que: seeing that (neutral)
 * - en raison de: due to (nominal)
 *
 * Consequence connectors:
 * - par conséquent: therefore (formal)
 * - dès lors: from which follows (formal/literary)
 * - ainsi: thus (formal)
 * - c'est pourquoi: that's why (neutral)
 * - de ce fait: consequently (formal)
 * - partant: very formal consequence marker
 */
export const consequenceSection = {
  title: "Cause and Consequence",
  causeConnectors: [
    { connector: "puisque", meaning: "since/because (known fact)", example: "Puisque tu es là, commençons." },
    { connector: "étant donné que", meaning: "given that (formal)", example: "Étant donné que les données sont claires..." },
    { connector: "vu que", meaning: "seeing that (neutral)", example: "Vu que tu insistes, je vais expliquer." },
    { connector: "en raison de", meaning: "due to (nominal)", example: "En raison de la pluie, le match est annulé." },
  ],
  consequenceConnectors: [
    { connector: "par conséquent", register: "Formal", example: "Par conséquent, il démissionna." },
    { connector: "dès lors", register: "Formal/literary", example: "Dès lors, tout changea." },
    { connector: "ainsi", register: "Formal", example: "Ainsi, nous évitons les erreurs." },
    { connector: "c'est pourquoi", register: "Neutral", example: "C'est pourquoi je ne peux pas accepter." },
    { connector: "de ce fait", register: "Formal", example: "De ce fait, la décision est reportée." },
    { connector: "partant", register: "Very formal", example: "Partant de ce constat, nous proposons..." },
  ],
};

// =============================================================================
// CHRONOLOGY SECTION
// =============================================================================

/**
 * chronologySection - Chronological and logical sequencing markers.
 *
 * Types:
 * - Opening/Introduction: tout d'abord, premièrement, en premier lieu, avant tout
 * - Continuation/Addition: ensuite, deuxièmement, par la suite, de surcroît
 * - Conclusion/Synthesis: enfin, finalement, pour conclure, en conclusion
 * - Simultaneity: pendant ce temps, simultanément, au même moment, tandis que
 * - Precedence: auparavant, préalablement, au préalable, précédemment
 * - Subsequence: ensuite, par la suite, ultérieurement, dans un second temps
 */
export const chronologySection = {
  title: "Chronological and Logical Sequencing",
  connectors: [
    { type: "Opening/Introduction", markers: ["tout d'abord", "premièrement", "en premier lieu", "avant tout"], example: "Tout d'abord, examinons le contexte." },
    { type: "Continuation/Addition", markers: ["ensuite", "deuxièmement", "par la suite", "de surcroît"], example: "Ensuite, nous aborderons les solutions." },
    { type: "Conclusion/Synthesis", markers: ["enfin", "finalement", "pour conclure", "en conclusion", "en dernier lieu"], example: "Pour conclure, résumons nos arguments." },
    { type: "Simultaneity", markers: ["pendant ce temps", "simultanément", "au même moment", "tandis que"], example: "Pendant ce temps, les négociations continuaient." },
    { type: "Precedence", markers: ["auparavant", "préalablement", "au préalable", "précédemment"], example: "Auparavant, il avait travaillé à Paris." },
    { type: "Subsequence", markers: ["ensuite", "par la suite", "ultérieurement", "dans un second temps"], example: "Ulérieurement, il deviendra président." },
  ],
};

// =============================================================================
// EXEMPLIFICATION SECTION
// =============================================================================

/**
 * exemplificationSection - Exemplification and illustration markers.
 *
 * Markers:
 * - ainsi: thus/in this way
 * - par exemple: for example
 * - notamment: notably/in particular
 * - en particulier: in particular
 * - c'est le cas de: this is the case of
 * - à titre d'exemple: as an example
 * - prenons le cas de: let's take the case of
 */
export const exemplificationSection = {
  title: "Exemplification and Illustration",
  markers: [
    { marker: "ainsi", meaning: "thus/in this way", example: "Ainsi, le problème se résout facilement." },
    { marker: "par exemple", meaning: "for example", example: "Plusieurs pays, par exemple la France, ont adopté..." },
    { marker: "notamment", meaning: "notably/in particular", example: "Des pays européens, notamment l'Allemagne..." },
    { marker: "en particulier", meaning: "in particular", example: "Cela concerne en particulier les jeunes." },
    { marker: "c'est le cas de", meaning: "this is the case of", example: "C'est le cas de nombreuses startups." },
    { marker: "à titre d'exemple", meaning: "as an example", example: "À titre d'exemple, citons ce projet." },
    { marker: "prenons le cas de", meaning: "let's take the case of", example: "Prenons le cas d'un étudiant typique." },
  ],
};

// =============================================================================
// SUMMARY SECTION
// =============================================================================

/**
 * summarySection - Summary and conclusion markers.
 *
 * Markers:
 * - en somme: in sum (formal)
 * - bref: in short (neutral)
 * - en résumé: in summary (neutral)
 * - pour résumer: to summarize (neutral)
 * - tout compte fait: all things considered (neutral)
 * - en définitive: ultimately (formal)
 * - au bout du compte: in the end (neutral)
 */
export const summarySection = {
  title: "Summary and Conclusion Markers",
  markers: [
    { marker: "en somme", register: "Formal", meaning: "in sum", example: "En somme, nous devons agir maintenant." },
    { marker: "bref", register: "Neutral", meaning: "in short", example: "Bref, la situation est critique." },
    { marker: "en résumé", register: "Neutral", meaning: "in summary", example: "En résumé, trois facteurs déterminent..." },
    { marker: "pour résumer", register: "Neutral", meaning: "to summarize", example: "Pour résumer les points essentiels..." },
    { marker: "tout compte fait", register: "Neutral", meaning: "all things considered", example: "Tout compte fait, c'est une bonne idée." },
    { marker: "en définitive", register: "Formal", meaning: "ultimately", example: "En définitive, peu importe le choix." },
    { marker: "au bout du compte", register: "Neutral", meaning: "in the end", example: "Au bout du compte, tout s'arrange." },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B2 Lesson 10.
 *
 * Topics covered:
 * - contrast (1): Formal alternative to 'mais' (cependant)
 * - cause (2): Puisque = cause as known fact
 * - consequence (3): Most formal 'therefore' (par conséquent)
 * - concession (4): Certes... mais expresses concession
 * - chronology (5): Opening marker (tout d'abord)
 * - exemplification (6): Notably/in particular (notamment)
 * - summary (7): In sum formal (en somme)
 * - addition (8): Formal 'moreover' (en outre)
 * - precedence (9): Previously/beforehand (auparavant)
 * - simultaneity (10): Meanwhile (pendant ce temps)
 * - formal-given (11): Formal 'given that' (étant donné que)
 * - literary (12): Very formal 'from which follows' (partant)
 * - restriction (13): Only/except that (seulement)
 * - conclusion-opening (14): To introduce conclusion (pour conclure)
 * - ultimately (15): Ultimately/in final analysis (en définitive)
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
  { id: 1, topic: "contrast", prompt: "Formal alternative to 'mais':", options: ["cependant", "et", "donc"], correct: 0, explanation: "Cependant = formal but/however" },
  { id: 2, topic: "cause", prompt: "'Since you're here' (known fact):", options: ["Puisque tu es là", "Parce que tu es là", "Alors que tu es là"], correct: 0, explanation: "Puisque = cause as known fact" },
  { id: 3, topic: "consequence", prompt: "Most formal 'therefore':", options: ["par conséquent", "alors", "du coup"], correct: 0, explanation: "Par conséquent = very formal" },
  { id: 4, topic: "concession", prompt: "'Certes... mais' expresses:", options: ["Concession/acknowledgment", "Pure contrast", "Cause and effect"], correct: 0, explanation: "Acknowledge something, then contrast" },
  { id: 5, topic: "chronology", prompt: "Opening marker:", options: ["Tout d'abord", "En conclusion", "Cependant"], correct: 0, explanation: "First/To begin with" },
  { id: 6, topic: "exemplification", prompt: "'Notably/in particular':", options: ["notamment", "cependant", "ainsi"], correct: 0, explanation: "Notamment = notably" },
  { id: 7, topic: "summary", prompt: "'In sum' (formal):", options: ["En somme", "Bref", "Donc"], correct: 0, explanation: "En somme = in sum" },
  { id: 8, topic: "addition", prompt: "Formal 'moreover':", options: ["en outre", "mais", "pourtant"], correct: 0, explanation: "En outre = moreover/furthermore" },
  { id: 9, topic: "precedence", prompt: "'Previously/beforehand':", options: ["auparavant", "ensuite", "désormais"], correct: 0, explanation: "Auparavant = before" },
  { id: 10, topic: "simultaneity", prompt: "'Meanwhile':", options: ["pendant ce temps", "après", "enfin"], correct: 0, explanation: "Pendant ce temps = meanwhile" },
  { id: 11, topic: "formal-given", prompt: "Formal 'given that':", options: ["étant donné que", "parce que", "quand"], correct: 0, explanation: "Étant donné que = given that (formal)" },
  { id: 12, topic: "literary", prompt: "Very formal/literary 'from which follows':", options: ["partant", "ainsi", "donc"], correct: 0, explanation: "Partant = very formal consequence marker" },
  { id: 13, topic: "restriction", prompt: "'Only/except that':", options: ["seulement", "de plus", "ainsi"], correct: 0, explanation: "Seulement = restriction marker" },
  { id: 14, topic: "conclusion-opening", prompt: "To introduce a conclusion:", options: ["Pour conclure", "Tout d'abord", "Cependant"], correct: 0, explanation: "Pour conclure = in conclusion" },
  { id: 15, topic: "ultimately", prompt: "'Ultimately/in the final analysis':", options: ["en définitive", "bref", "en somme"], correct: 0, explanation: "En définitive = ultimately" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on main categories
 *   (contrast: cependant/néanmoins, consequence: par conséquent, cause: puisque)
 * - 8-11/15: "Nice progress" - encourages focusing on formal variants
 *   and register distinctions
 * - 12-15/15: "Excellent command" - celebrates sophisticated connector mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "High-level connectors require exposure. Focus on the main categories: contrast (cependant, néanmoins), consequence (par conséquent), cause (puisque, étant donné que).", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are expanding your connector repertoire. Focus on formal variants and their register distinctions.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You command a sophisticated range of connectors. Your discourse flows with logical precision and appropriate register.", emoji: "🌟", color: "green" as const };
}
