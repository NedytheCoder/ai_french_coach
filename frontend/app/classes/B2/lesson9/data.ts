/**
 * B2 Lesson 9 - Advanced Pronoun System
 * =======================================
 *
 * This file contains all lesson data for B2 Lesson 9, teaching the complete
 * French pronoun system including double object pronouns, y, en, and
 * sophisticated ordering rules.
 *
 * **Lesson Content:**
 * - Introduction: The pronoun matrix and pronouns as cohesion
 * - Double object pronouns: Strict order based on grammatical function
 * - Pronoun position: Affirmative, negative, imperative rules
 * - Y and en: Adverbial pronouns for à + place/thing and de + thing/quantity
 * - Complex combinations: Three or more pronouns
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Order rule: me/te/se/nous/vous → le/la/les → lui/leur → y → en
 * - 3rd person order flips: Direct (le/la/les) before indirect (lui/leur)
 * - Y replaces à + place/thing; en replaces de + thing/quantity
 * - Imperative affirmative: Pronouns after verb with hyphens (me → moi, te → toi)
 * - Imperative negative: Normal position before verb
 * - Elision: Le + en → l'en
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. introSections - Introduction to pronoun system
 * 4. doubleObjectSection - Double object pronoun order
 * 5. positionSection - Pronoun position rules
 * 6. yEnSection - Y and en usage
 * 7. advancedOrderSection - Complex pronoun combinations
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
 * 1. intro - Introduction to pronoun matrix
 * 2. double-object - Double object pronouns
 * 3. position - Pronoun position rules
 * 4. y-en - Y and en adverbial pronouns
 * 5. advanced-order - Complex combinations
 * 6. emphasis - Emphasis structures (if applicable)
 * 7. stylistic - Stylistic usage (if applicable)
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "double-object", "position", "y-en", "advanced-order", "emphasis", "stylistic", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Advanced Pronoun System",
  /** Brief description of lesson content */
  subtitle: "Master double object pronouns, y and en in all positions, and sophisticated pronoun ordering for elegant French expression.",
  /** Lesson number in B2 series */
  lessonNumber: 9,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to the advanced pronoun system.
 *
 * Content:
 * - The Pronoun Matrix: Combining pronouns efficiently with strict order
 * - Pronouns as Cohesion: Creating fluid, sophisticated sentences
 */
export const introSections = [
  {
    title: "The Pronoun Matrix",
    content: "French pronouns are precise tools for reference. At B2, you combine them efficiently: me/te/se/nous/vous before le/la/les before lui/leur before y before en. This order reflects grammatical hierarchy.",
  },
  {
    title: "Pronouns as Cohesion",
    content: "Pronouns create cohesion in discourse. They avoid repetition while maintaining clarity. Understanding their placement rules allows you to construct fluid, sophisticated sentences.",
  },
];

// =============================================================================
// DOUBLE OBJECT SECTION
// =============================================================================

/**
 * doubleObjectSection - Double object pronouns and their strict order.
 *
 * Order rule: me/te/se/nous/vous → le/la/les → lui/leur → y → en
 *
 * Examples:
 * - me + le: Il me le donne (indirect + direct)
 * - te + la: Elle te la montre (indirect + direct)
 * - le + lui: Je le lui donne (direct + indirect - 3rd person flips)
 * - lui + y: Il y lui répond (indirect + location)
 * - le + en: Je l'en prie (direct + quantity, with elision)
 */
export const doubleObjectSection = {
  title: "Double Object Pronouns",
  explanation: "When two pronouns combine, they follow a strict order based on grammatical function.",
  orderRule: "me/te/se/nous/vous → le/la/les → lui/leur → y → en",
  examples: [
    { pronouns: "me + le", combined: "Il me le donne.", analysis: "Indirect (me) + direct (le)" },
    { pronouns: "te + la", combined: "Elle te la montre.", analysis: "Indirect (te) + direct (la)" },
    { pronouns: "nous + les", combined: "Ils nous les envoient.", analysis: "Indirect (nous) + direct (les)" },
    { pronouns: "le + lui", combined: "Je le lui donne.", analysis: "Direct (le) + indirect (lui) - 3rd person order flips" },
    { pronouns: "lui + y", combined: "Il y lui répond.", analysis: "Indirect + location (y)" },
    { pronouns: "le + en", combined: "Je l'en prie.", analysis: "Direct (le/en contraction) + quantity (en)" },
  ],
};

// =============================================================================
// POSITION SECTION
// =============================================================================

/**
 * positionSection - Pronoun position rules by sentence type.
 *
 * Positions:
 * - Affirmative: Before conjugated verb (Je le lui donne)
 * - Infinitive: Before infinitive (Je vais le lui donner)
 * - Negative: Before verb, same position (Je ne le lui donne pas)
 * - Imperative affirmative: After verb with hyphen (Donne-le-moi!)
 * - Imperative negative: Before verb, normal position (Ne me le donne pas)
 *
 * Imperative note: me → moi, te → toi after imperative; keep hyphen
 */
export const positionSection = {
  title: "Pronoun Position: Affirmative, Negative, Imperative",
  explanation: "Pronoun position changes based on sentence type.",
  positions: [
    { type: "Affirmative", rule: "Before conjugated verb", example: "Je le lui donne." },
    { type: "Infinitive", rule: "Before infinitive", example: "Je vais le lui donner." },
    { type: "Negative", rule: "Before verb (same position)", example: "Je ne le lui donne pas." },
    { type: "Imperative affirmative", rule: "After verb with hyphen", example: "Donne-le-moi!" },
    { type: "Imperative negative", rule: "Before verb (normal position)", example: "Ne me le donne pas." },
  ],
  imperativeNote: "me → moi after imperative; te → toi; keep hyphen",
};

// =============================================================================
// Y AND EN SECTION
// =============================================================================

/**
 * yEnSection - Y and en: Adverbial pronouns.
 *
 * Y replaces à + place/thing:
 * - À + place: Je vais à Paris → J'y vais
 * - À + thing (non-person): Je pense à ce problème → J'y pense
 * - In + location: Il est dans la maison → Il y est
 *
 * En replaces de + thing/quantity:
 * - De + thing: Je parle de ce livre → J'en parle
 * - Partitive (some/any): Je veux du pain → J'en veux
 * - Number + de: J'ai trois livres → J'en ai trois
 * - Adverbial de: Je viens de France → J'en viens
 *
 * Together: Il y en a (There are some) - Y before en
 */
export const yEnSection = {
  title: "Y and En: Adverbial Pronouns",
  explanation: "Y replaces à + place/thing; en replaces de + thing/quantity. They follow all other pronouns.",
  yUses: [
    { use: "À + place", example: "Je vais à Paris → J'y vais.", note: "Location replacement" },
    { use: "À + thing (non-person)", example: "Je pense à ce problème → J'y pense.", note: "Abstract thing" },
    { use: "In + location", example: "Il est dans la maison → Il y est.", note: "Dans becomes y" },
  ],
  enUses: [
    { use: "De + thing", example: "Je parle de ce livre → J'en parle.", note: "Topic replacement" },
    { use: "Partitive (some/any)", example: "Je veux du pain → J'en veux.", note: "Quantity/partitive" },
    { use: "Number/quantity + de", example: "J'ai trois livres → J'en ai trois.", note: "Keep the number" },
    { use: "Adverbial de", example: "Je viens de France → J'en viens.", note: "Origin" },
  ],
  together: "Il y en a. (There are some.) - Y and en can coexist with y first.",
};

// =============================================================================
// ADVANCED ORDER SECTION
// =============================================================================

/**
 * advancedOrderSection - Complex pronoun combinations.
 *
 * Three or more pronouns create sophisticated constructions:
 * - me + le + lui: Il me le lui donne (me 1st, le 2nd, lui 3rd)
 * - le + en: Je l'en prie (le + en with elision)
 * - y + en: Il y en a (y before en)
 *
 * Tricky cases:
 * - Imperative with moi/toi: Donne-le-moi! (me → moi)
 * - Neuter le: Je le sais (le = the fact, not replaceable)
 */
export const advancedOrderSection = {
  title: "Complex Pronoun Combinations",
  explanation: "Three or more pronouns create sophisticated but precise constructions.",
  examples: [
    { combination: "me + le + lui", sentence: "Il me le lui donne.", breakdown: "me (1st), le (2nd), lui (3rd)" },
    { combination: "le + en", sentence: "Je l'en prie.", note: "Le + en → l'en (elision)" },
    { combination: "y + en", sentence: "Il y en a.", note: "Y before en" },
  ],
  trickyCases: [
    { case: "Imperative with moi/toi", normal: "Il me le donne.", imperative: "Donne-le-moi!", note: "Me becomes moi after imperative" },
    { case: "Neuter le", example: "Je le sais.", note: "Le = the fact (not replaceable by en or y)" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B2 Lesson 9.
 *
 * Topics covered:
 * - order (1): Indirect before direct (me + le)
 * - 3rd-person (2): Direct before indirect for 3rd person (le + lui)
 * - y (3): Y = à + place
 * - en (4): En = de + thing
 * - imperative (5): After imperative with hyphen (Donne-le-moi!)
 * - imperative-negative (6): Negative imperative normal position
 * - infinitive (7): Pronouns before infinitive
 * - en-quantity (8): En + number for quantity
 * - y-en (9): Y before en (Il y en a)
 * - partitive (10): En = partitive
 * - elision (11): Le + en → l'en
 * - neuter (12): Le as neuter (fact/truth)
 * - lui-leur (13): Lui/leur = indirect, people only
 * - moi-toi (14): After affirmative imperative, me → moi
 * - y-location (15): Y replaces à + place
 *
 * Each question has:
 * - id: unique identifier
 * - topic: category for grouping
 * - prompt: question text with fill-in-the-blank or translation
 * - options: array of 3 possible answers
 * - correct: index of correct option (0-2)
 * - explanation: detailed explanation of answer
 */
export const practiceQuestions = [
  { id: 1, topic: "order", prompt: "'Il _____ donne' (me + le)", options: ["me le", "le me", "m'en"], correct: 0, explanation: "Indirect before direct: me + le" },
  { id: 2, topic: "3rd-person", prompt: "'Je _____ donne' (le + lui)", options: ["le lui", "lui le", "le leur"], correct: 0, explanation: "Direct before indirect for 3rd person" },
  { id: 3, topic: "y", prompt: "'J'_____ vais' (à Paris)", options: ["y", "en", "lui"], correct: 0, explanation: "Y = à + place" },
  { id: 4, topic: "en", prompt: "'J'_____ parle' (de ce livre)", options: ["en", "y", "le"], correct: 0, explanation: "En = de + thing" },
  { id: 5, topic: "imperative", prompt: "Imperative: 'Give it to me!'", options: ["Donne-le-moi!", "Donne-me-le!", "Me le donne!"], correct: 0, explanation: "After imperative: verb-pronoun-hyphen, moi not me" },
  { id: 6, topic: "imperative-negative", prompt: "Negative imperative: 'Don't give it to me'", options: ["Ne me le donne pas!", "Ne donne-le-moi pas!", "Ne me donne pas le!"], correct: 0, explanation: "Negative imperative = normal position before verb" },
  { id: 7, topic: "infinitive", prompt: "Infinitive: 'I'm going to give it to him'", options: ["Je vais le lui donner.", "Je vais lui le donner.", "Je le vais lui donner."], correct: 0, explanation: "Pronouns before infinitive, 3rd person order" },
  { id: 8, topic: "en-quantity", prompt: "'I have three' (books)", options: ["J'en ai trois.", "Je les ai trois.", "J'y ai trois."], correct: 0, explanation: "En + number for quantity" },
  { id: 9, topic: "y-en", prompt: "'There are some' (apples)", options: ["Il y en a.", "Il en y a.", "Il les y a."], correct: 0, explanation: "Y before en: Il y en a" },
  { id: 10, topic: "partitive", prompt: "'I want some' (bread)", options: ["J'en veux.", "Je le veux.", "J'y veux."], correct: 0, explanation: "En = partitive (du pain)" },
  { id: 11, topic: "elision", prompt: "'Je l'en prie' - the l' is:", options: ["Le with elision before en", "La with elision", "Lui abbreviated"], correct: 0, explanation: "Le + en → l'en (elision)" },
  { id: 12, topic: "neuter", prompt: "'Je le sais' - le refers to:", options: ["A fact/truth (neuter)", "A masculine object", "A person"], correct: 0, explanation: "Le can be neuter (the fact)" },
  { id: 13, topic: "lui-leur", prompt: "Lui and leur are:", options: ["Only for people (indirect)", "For things too", "Direct objects"], correct: 0, explanation: "Lui/leur = indirect, people only" },
  { id: 14, topic: "moi-toi", prompt: "After affirmative imperative, me becomes:", options: ["moi", "me", "lui"], correct: 0, explanation: "Donne-le-moi (not me)" },
  { id: 15, topic: "y-location", prompt: "Y replaces:", options: ["À + place", "De + thing", "Direct object"], correct: 0, explanation: "Y = à + place/thing" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on pronoun order sequence
 *   (indirect 1st/2nd → direct → indirect 3rd → y → en)
 * - 8-11/15: "Nice progress" - encourages focusing on imperative position
 *   and elision rules
 * - 12-15/15: "Excellent command" - celebrates complex pronoun mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Pronoun order takes practice. Focus on the sequence: indirect (1st/2nd) → direct → indirect (3rd) → y → en.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are mastering pronoun combinations. Focus on imperative position and elision rules.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You navigate complex pronoun combinations with ease. Your French flows naturally with proper pronoun placement.", emoji: "🌟", color: "green" as const };
}
