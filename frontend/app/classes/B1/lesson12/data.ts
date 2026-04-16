/**
 * B1 Lesson 12 - Double Object Pronouns (Les Pronoms Objets Doubles)
 * =====================================================================
 *
 * This file contains all lesson data for B1 Lesson 12, teaching how to combine
 * multiple object pronouns in French sentences with correct order.
 *
 * **Lesson Content:**
 * - Pronoun order rules (1st to 5th position)
 * - me/te/se/nous/vous examples (1st position)
 * - le/la/les examples (2nd position)
 * - lui/leur examples (3rd position)
 * - y and en combinations (4th and 5th position)
 * - Common examples with breakdowns
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Pronoun order: me/te/se → le/la/les → lui/leur → y → en
 * - All pronouns go before the verb (except in positive imperatives)
 * - Elision rules: te + y = t'y, se + en = s'en
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. orderRules - Pronoun position rules (1st to 5th)
 * 4. meTeSeExamples - 1st position pronoun examples
 * 5. leLaLesExamples - 2nd position pronoun examples
 * 6. yEnExamples - 4th and 5th position examples
 * 7. commonExamples - Mixed examples with breakdowns
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
 * 1. intro - Introduction to double object pronouns
 * 2. order-rules - Pronoun order rules
 * 3. me-te-se - 1st position pronouns
 * 4. le-la-les - 2nd position pronouns
 * 5. lui-leur - 3rd position pronouns
 * 6. y-en - 4th and 5th position pronouns
 * 7. examples - Common examples
 * 8. mistakes - Common errors
 * 9. practice - Interactive quiz
 * 10. completion - Lesson completion
 */
export const sectionIds = ["intro", "order-rules", "me-te-se", "le-la-les", "lui-leur", "y-en", "examples", "mistakes", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Double Object Pronouns",
  /** Brief description of lesson content */
  subtitle: "Learn how to combine pronouns in French sentences.",
  /** Lesson number in B1 series */
  lessonNumber: 12,
};

// =============================================================================
// ORDER RULES
// =============================================================================

/**
 * orderRules - The five positions for object pronouns in French.
 *
 * Order: 1st → 2nd → 3rd → 4th → 5th
 * - 1st: me/te/se/nous/vous (reflexive/direct/indirect)
 * - 2nd: le/la/les (direct object)
 * - 3rd: lui/leur (indirect object)
 * - 4th: y (place)
 * - 5th: en (quantity/some)
 */
export const orderRules = [
  { position: "1st", pronouns: "me/te/se/nous/vous", type: "Reflexive/Direct/Indirect" },
  { position: "2nd", pronouns: "le/la/les", type: "Direct object" },
  { position: "3rd", pronouns: "lui/leur", type: "Indirect object" },
  { position: "4th", pronouns: "y", type: "Place (there)" },
  { position: "5th", pronouns: "en", type: "Quantity/some/of it" },
];

// =============================================================================
// 1ST POSITION - ME/TE/SE
// =============================================================================

/**
 * meTeSeExamples - Pronouns in the 1st position (me/te/se/nous/vous).
 *
 * When combined with 2nd position pronouns (le/la/les):
 * - me + le = me le (Il me le donne)
 * - te + la = te la (Elle te la montre)
 * - se + les = se les (Ils se les achètent)
 */
export const meTeSeExamples = [
  { before: "Il me le donne.", explanation: "He gives it to me. Order: me (1st) + le (2nd)" },
  { before: "Elle te la montre.", explanation: "She shows it to you. Order: te (1st) + la (2nd)" },
  { before: "Ils se les achètent.", explanation: "They buy them for themselves. Order: se (1st) + les (2nd)" },
];

// =============================================================================
// 2ND POSITION - LE/LA/LES
// =============================================================================

/**
 * leLaLesExamples - Pronouns in the 2nd position (le/la/les).
 *
 * When combined with 3rd or 4th position pronouns:
 * - le + lui = le lui (Je le lui donne)
 * - la + leur = la leur (Tu la leur envoies)
 * - les + y = les y (Il les y met)
 */
export const leLaLesExamples = [
  { before: "Je le lui donne.", explanation: "I give it to him. Order: le (2nd) + lui (3rd)" },
  { before: "Tu la leur envoies.", explanation: "You send it to them. Order: la (2nd) + leur (3rd)" },
  { before: "Il les y met.", explanation: "He puts them there. Order: les (2nd) + y (4th)" },
];

// =============================================================================
// 4TH AND 5TH POSITION - Y AND EN
// =============================================================================

/**
 * yEnExamples - Pronouns in the 4th (y) and 5th (en) positions.
 *
 * - y (4th) + en (5th) = y en (Il y en a)
 * - nous (1st) + en (5th) = nous en (Elle nous en parle)
 * - vous (1st) + y (4th) = vous y (Je vous y attends)
 */
export const yEnExamples = [
  { before: "Il y en a.", explanation: "There is some. Order: y (4th) + en (5th)" },
  { before: "Elle nous en parle.", explanation: "She speaks to us about it. Order: nous (1st) + en (5th)" },
  { before: "Je vous y attends.", explanation: "I wait for you there. Order: vous (1st) + y (4th)" },
];

// =============================================================================
// COMMON EXAMPLES
// =============================================================================

/**
 * commonExamples - Mixed double pronoun examples with breakdowns.
 *
 * Examples with pronoun breakdown and meaning:
 * - Il me le donne → me (to me) + le (it)
 * - Je le lui envoie → le (it) + lui (to him)
 * - Ils nous en parlent → nous (to us) + en (about it)
 */
export const commonExamples = [
  { sentence: "Il me le donne.", breakdown: "me (to me) + le (it)", meaning: "He gives it to me." },
  { sentence: "Elle te la montre.", breakdown: "te (to you) + la (it)", meaning: "She shows it to you." },
  { sentence: "Je le lui envoie.", breakdown: "le (it) + lui (to him)", meaning: "I send it to him." },
  { sentence: "Ils nous en parlent.", breakdown: "nous (to us) + en (about it)", meaning: "They speak to us about it." },
  { sentence: "Tu y en vas.", breakdown: "y (there) + en (of it)", note: "Actually: Tu t'y en vas (less common)", meaning: "You go there (of it)" },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors with double object pronouns.
 *
 * Common errors:
 * - Wrong pronoun order (me le vs le me)
 * - Putting y after en (y comes before en)
 * - Agreement errors with le/la/les
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Il me donne le.", correct: "Il me le donne.", explanation: "Pronouns go before the verb in a specific order." },
  { wrong: "Je lui le donne.", correct: "Je le lui donne.", explanation: "Direct object (le) comes before indirect (lui)." },
  { wrong: "Il en y a.", correct: "Il y en a.", explanation: "Y comes before en." },
  { wrong: "Elle le leur montre.", correct: "Elle la leur montre.", explanation: "Agreement: la (feminine) for feminine object." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B1 Lesson 12.
 *
 * Topics covered:
 * - order (1): Pronoun position rules
 * - me-le (2): 1st + 2nd position combinations
 * - le-lui (3, 9): 2nd + 3rd position combinations
 * - y-en (4, 11): 4th + 5th position combinations
 * - nous-en (5): 1st + 5th position combinations
 * - meaning (6-8): Understanding meanings
 * - mistakes (10-11): Common errors
 * - position (12): Where pronouns go
 * - vous-y (13): 1st + 4th position combinations
 * - se-les (14): Reflexive + direct object
 * - mixed (15): All combinations with elision
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
  { id: 1, topic: "order", prompt: "What is the correct pronoun order?", options: ["me/te/se + le/la/les + lui/leur + y + en", "le/la/les + me/te/se + y + en", "lui/leur + le/la/les + me/te/se"], correct: 0, explanation: "Correct order: reflexive → direct → indirect → y → en" },
  { id: 2, topic: "me-le", prompt: "Complete: Il _____ (me + le) donne.", options: ["me le", "le me", "me lui"], correct: 0, explanation: "me (1st) + le (2nd) = me le" },
  { id: 3, topic: "le-lui", prompt: "Complete: Je _____ (le + lui) envoie.", options: ["le lui", "lui le", "le leur"], correct: 0, explanation: "le (2nd) + lui (3rd) = le lui" },
  { id: 4, topic: "y-en", prompt: "Complete: Il _____ (y + en) a beaucoup.", options: ["y en", "en y", "y leur"], correct: 0, explanation: "y (4th) + en (5th) = y en" },
  { id: 5, topic: "nous-en", prompt: "Complete: Elle _____ (nous + en) parle.", options: ["nous en", "en nous", "nous leur"], correct: 0, explanation: "nous (1st) + en (5th) = nous en" },
  { id: 6, topic: "meaning", prompt: "What does 'Il me le donne' mean?", options: ["He gives it to me", "He gives me to him", "He gives himself to me"], correct: 0, explanation: "me = to me, le = it" },
  { id: 7, topic: "meaning", prompt: "What does 'Je le lui envoie' mean?", options: ["I send it to him/her", "I send him to him", "I send myself to him"], correct: 0, explanation: "le = it, lui = to him/her" },
  { id: 8, topic: "meaning", prompt: "What does 'Ils nous en parlent' mean?", options: ["They speak to us about it", "They speak about us", "They speak to themselves about it"], correct: 0, explanation: "nous = to us, en = about it/of it" },
  { id: 9, topic: "agreement", prompt: "Complete: Elle _____ (la + leur) montre.", options: ["la leur", "leur la", "les leur"], correct: 0, explanation: "la (2nd) + leur (3rd) = la leur" },
  { id: 10, topic: "mistakes", prompt: "Which is correct?", options: ["Je le lui donne.", "Je lui le donne.", "Je le leur donne."], correct: 0, explanation: "le (direct) comes before lui (indirect)" },
  { id: 11, topic: "mistakes", prompt: "Which is correct?", options: ["Il y en a.", "Il en y a.", "Il y leur a."], correct: 0, explanation: "y comes before en" },
  { id: 12, topic: "position", prompt: "Where do double pronouns go?", options: ["Before the verb", "After the verb", "At the end of the sentence"], correct: 0, explanation: "Object pronouns always go before the verb (except in positive imperatives)." },
  { id: 13, topic: "vous-y", prompt: "Complete: Je _____ (vous + y) attends.", options: ["vous y", "y vous", "vous en"], correct: 0, explanation: "vous (1st) + y (4th) = vous y" },
  { id: 14, topic: "se-les", prompt: "Complete: Ils _____ (se + les) achètent.", options: ["se les", "les se", "se leur"], correct: 0, explanation: "se (1st) + les (2nd) = se les" },
  { id: 15, topic: "mixed", prompt: "Complete: Tu _____ (te + y) trouves bien?", options: ["t'y", "te y", "y te"], correct: 0, explanation: "te + y = t'y (with elision)" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focus on pronoun order: me/te/se → le/la/les → lui/leur → y → en
 * - 8-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates double pronoun mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Double pronouns have strict order rules. Practice: me/te/se → le/la/les → lui/leur → y → en", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting the pronoun order. Review y + en combinations and agreement.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're combining pronouns well! This is a sophisticated French skill.", emoji: "🎉", color: "green" as const };
}
