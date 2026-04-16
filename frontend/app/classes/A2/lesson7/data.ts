/**
 * A2 Lesson 7 - Indirect Object Pronouns (Pronoms Compléments d'Objet Indirect)
 * =================================================================================
 *
 * This file contains all lesson data for A2 Lesson 7, focusing on using
 * indirect object pronouns in French (me, te, lui, nous, vous, leur).
 *
 * **Lesson Content:**
 * - What is an indirect object (à + person)
 * - Indirect object pronouns table (me, te, lui, nous, vous, leur)
 * - Common verbs that take indirect objects (parler à, téléphoner à, etc.)
 * - Replacing nouns with pronouns
 * - Pronoun position in sentences (before the verb)
 * - Using pronouns with negation (ne...pas)
 * - Using pronouns in passé composé
 * - Direct vs indirect object comparison
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Indirect object = à + person (to/for someone)
 * - Pronouns: me, te, lui (him/her), nous, vous, leur (them)
 * - Placement: before the conjugated verb (or auxiliary in passé composé)
 * - Unlike direct objects, NO agreement in passé composé with indirect objects
 * - Different from direct objects: lui/leur vs le/la/les
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. indirectObjectExamples - What is an indirect object
 * 3. pronounReplacementExamples - Replacing nouns with pronouns
 * 4. indirectObjectPronouns - The six pronouns with examples
 * 5. elisionExamples - m' and t' before vowels
 * 6. commonIndirectVerbs - Verbs requiring à + person
 * 7. replacementExamples - Step-by-step replacement examples
 * 8. positionExamples - Pronoun placement in sentences
 * 9. negativeExamples - Using pronouns with negation
 * 10. elisionNegativeExamples - Elision in negative sentences
 * 11. passeComposeExamples - Pronouns in passé composé
 * 12. directVsIndirectExamples - Comparison of direct vs indirect
 * 13. guidedExamples - Full example sentences
 * 14. commonMistakes - Common errors to avoid
 * 15. practiceQuestions - 15 quiz questions
 * 16. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections in order:
 * 1. intro - Introduction to indirect object pronouns
 * 2. what-is-indirect-object - Identifying indirect objects
 * 3. what-is-pronoun - Understanding pronouns
 * 4. pronouns-table - The six indirect object pronouns
 * 5. common-verbs - Verbs that use indirect objects
 * 6. replacing - Replacing nouns with pronouns
 * 7. position - Pronoun placement in sentences
 * 8. negation - Using pronouns with negation
 * 9. passe-compose - Using pronouns in passé composé
 * 10. direct-vs-indirect - Comparison with direct objects
 * 11. guided-examples - Example sentences
 * 12. mistakes - Common errors
 * 13. practice - Interactive quiz
 * 14. completion - Lesson completion
 */
export const sectionIds = [
  "intro",
  "what-is-indirect-object",
  "what-is-pronoun",
  "pronouns-table",
  "common-verbs",
  "replacing",
  "position",
  "negation",
  "passe-compose",
  "direct-vs-indirect",
  "guided-examples",
  "mistakes",
  "practice",
  "completion",
];

// =============================================================================
// SECTION 1: WHAT IS AN INDIRECT OBJECT?
// =============================================================================

/**
 * indirectObjectExamples - Shows how to identify indirect objects in sentences.
 *
 * The indirect object answers "to whom?" or "for whom?" after the verb.
 * In French, it's typically introduced by "à".
 */
export const indirectObjectExamples = [
  {
    sentence: "Je parle à Marie.",
    verb: "parle",
    indirectObject: "à Marie",
    english: "I am speaking to Marie.",
  },
  {
    sentence: "Il téléphone à ses parents.",
    verb: "téléphone",
    indirectObject: "à ses parents",
    english: "He is calling his parents.",
  },
  {
    sentence: "Nous écrivons à notre professeur.",
    verb: "écrivons",
    indirectObject: "à notre professeur",
    english: "We are writing to our teacher.",
  },
];

// =============================================================================
// SECTION 2: PRONOUN REPLACEMENT
// =============================================================================

/**
 * pronounReplacementExamples - Shows before/after of replacing nouns with pronouns.
 *
 * Original: Je parle à Marie.
 * Replaced: Je lui parle.
 */
export const pronounReplacementExamples = [
  {
    original: "Je parle à Marie.",
    replaced: "Je lui parle.",
  },
  {
    original: "Il téléphone à ses parents.",
    replaced: "Il leur téléphone.",
  },
  {
    original: "Nous écrivons à notre professeur.",
    replaced: "Nous lui écrivons.",
  },
];

// =============================================================================
// SECTION 3: INDIRECT OBJECT PRONOUNS TABLE
// =============================================================================

/**
 * indirectObjectPronouns - The six French indirect object pronouns.
 *
 * Pronouns: me, te, lui, nous, vous, leur
 * Note: lui is used for both masculine and feminine singular
 * Note: leur is used for plural (both masculine and feminine)
 */
export const indirectObjectPronouns = [
  {
    pronoun: "me / m'",
    use: "to me",
    example: "Il me parle.",
    english: "He is speaking to me.",
  },
  {
    pronoun: "te / t'",
    use: "to you (informal singular)",
    example: "Je te téléphone.",
    english: "I am calling you.",
  },
  {
    pronoun: "lui",
    use: "to him / to her",
    example: "Nous lui écrivons.",
    english: "We are writing to him / her.",
  },
  {
    pronoun: "nous",
    use: "to us",
    example: "Elle nous explique la leçon.",
    english: "She explains the lesson to us.",
  },
  {
    pronoun: "vous",
    use: "to you (formal/plural)",
    example: "Je vous réponds.",
    english: "I am answering you.",
  },
  {
    pronoun: "leur",
    use: "to them",
    example: "Il leur parle.",
    english: "He is speaking to them.",
  },
];

// =============================================================================
// ELISION EXAMPLES
// =============================================================================

/**
 * elisionExamples - Shows elision with me (m') and te (t') before vowels.
 */
export const elisionExamples = [
  { french: "Il m'écrit.", english: "He writes to me." },
  { french: "Je t'explique.", english: "I explain to you." },
];

// =============================================================================
// SECTION 4: COMMON VERBS WITH INDIRECT OBJECTS
// =============================================================================

/**
 * commonIndirectVerbs - Verbs that require "à + person" (indirect object).
 *
 * These verbs always take an indirect object when the recipient is a person.
 * Examples: parler à, téléphoner à, écrire à, etc.
 */
export const commonIndirectVerbs = [
  { infinitive: "parler à", english: "to speak to" },
  { infinitive: "téléphoner à", english: "to call / phone" },
  { infinitive: "écrire à", english: "to write to" },
  { infinitive: "donner à", english: "to give to" },
  { infinitive: "dire à", english: "to say / tell to" },
  { infinitive: "demander à", english: "to ask from / ask of" },
  { infinitive: "répondre à", english: "to answer" },
  { infinitive: "expliquer à", english: "to explain to" },
  { infinitive: "montrer à", english: "to show to" },
  { infinitive: "envoyer à", english: "to send to" },
];

// =============================================================================
// SECTION 5: REPLACING NOUNS WITH PRONOUNS
// =============================================================================

/**
 * replacementExamples - Step-by-step examples of noun-to-pronoun replacement.
 *
 * Shows the transformation with explanation of which pronoun is used.
 */
export const replacementExamples = [
  {
    original: "Je parle à Marie.",
    replaced: "Je lui parle.",
    explanation: "À Marie becomes lui.",
  },
  {
    original: "Il téléphone à ses amis.",
    replaced: "Il leur téléphone.",
    explanation: "À ses amis is plural, so use leur.",
  },
  {
    original: "Nous écrivons à notre professeur.",
    replaced: "Nous lui écrivons.",
    explanation: "À notre professeur becomes lui.",
  },
  {
    original: "Tu expliques la règle à Paul.",
    replaced: "Tu lui expliques la règle.",
    explanation: "À Paul becomes lui.",
  },
];

// =============================================================================
// SECTION 6: PRONOUN POSITION
// =============================================================================

/**
 * positionExamples - Shows pronoun placement before the verb.
 *
 * In French, indirect object pronouns always precede the conjugated verb.
 */
export const positionExamples = [
  {
    french: "Je lui parle.",
    english: "I am speaking to him / her.",
  },
  {
    french: "Elle leur téléphone.",
    english: "She is calling them.",
  },
  {
    french: "Nous vous écrivons.",
    english: "We are writing to you.",
  },
  {
    french: "Tu me réponds.",
    english: "You are answering me.",
  },
];

// =============================================================================
// SECTION 7: NEGATION
// =============================================================================

/**
 * negativeExamples - Using indirect object pronouns with negation.
 *
 * Pattern: ne + pronoun + verb + pas
 * The pronoun stays before the verb in negative sentences.
 */
export const negativeExamples = [
  {
    affirmative: "Je lui parle.",
    negative: "Je ne lui parle pas.",
    english: "I am not speaking to him / her.",
  },
  {
    affirmative: "Elle leur téléphone.",
    negative: "Elle ne leur téléphone pas.",
    english: "She is not calling them.",
  },
  {
    affirmative: "Nous vous écrivons.",
    negative: "Nous ne vous écrivons pas.",
    english: "We are not writing to you.",
  },
];

// =============================================================================
// ELISION IN NEGATION
// =============================================================================

/**
 * elisionNegativeExamples - Elision with m' and t' in negative sentences.
 */
export const elisionNegativeExamples = [
  { french: "Je ne lui écris pas.", english: "I don't write to him/her." },
  { french: "Il ne m'explique pas.", english: "He doesn't explain to me." },
];

// =============================================================================
// SECTION 8: PASSÉ COMPOSÉ
// =============================================================================

/**
 * passeComposeExamples - Using indirect object pronouns in passé composé.
 *
 * Key rule: Pronoun goes before the auxiliary verb (avoir/être).
 * Important: NO agreement with indirect objects (unlike direct objects).
 */
export const passeComposeExamples = [
  {
    original: "J'ai parlé à Marie.",
    replaced: "Je lui ai parlé.",
    english: "I spoke to her.",
  },
  {
    original: "Elle a téléphoné à ses amis.",
    replaced: "Elle leur a téléphoné.",
    english: "She called them.",
  },
  {
    original: "Nous avons écrit au professeur.",
    replaced: "Nous lui avons écrit.",
    english: "We wrote to him / her.",
  },
  {
    original: "Je n'ai pas répondu à Paul.",
    replaced: "Je ne lui ai pas répondu.",
    english: "I did not answer him.",
  },
];

// =============================================================================
// SECTION 9: DIRECT VS INDIRECT COMPARISON
// =============================================================================

/**
 * directVsIndirectExamples - Side-by-side comparison of direct vs indirect objects.
 *
 * Shows the difference in pronouns and explains which verbs take which type.
 * Direct: le, la, les (no preposition)
 * Indirect: lui, leur (requires à)
 */
export const directVsIndirectExamples = [
  {
    direct: "Je vois Marie. → Je la vois.",
    indirect: "Je parle à Marie. → Je lui parle.",
    note: "Voir takes a direct object. Parler à takes an indirect object.",
  },
  {
    direct: "Nous invitons Paul. → Nous l'invitons.",
    indirect: "Nous écrivons à Paul. → Nous lui écrivons.",
    note: "Inviter is direct. Écrire à is indirect.",
  },
  {
    direct: "Elle aime ses amis. → Elle les aime.",
    indirect: "Elle téléphone à ses amis. → Elle leur téléphone.",
    note: "Direct and indirect pronouns are different.",
  },
];

// =============================================================================
// SECTION 10: GUIDED EXAMPLES
// =============================================================================

/**
 * guidedExamples - Full sentences demonstrating various uses.
 *
 * Mix of affirmative, negative, and passé composé examples.
 */
export const guidedExamples = [
  {
    french: "Je lui téléphone chaque soir.",
    english: "I call him / her every evening.",
  },
  {
    french: "Elle leur explique la leçon.",
    english: "She explains the lesson to them.",
  },
  {
    french: "Nous vous écrivons demain.",
    english: "We will write to you tomorrow.",
  },
  {
    french: "Tu ne me réponds pas.",
    english: "You are not answering me.",
  },
  {
    french: "Je lui ai parlé hier.",
    english: "I spoke to him / her yesterday.",
  },
  {
    french: "Ils ne leur ont pas écrit.",
    english: "They did not write to them.",
  },
];

// =============================================================================
// SECTION 11: COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Common errors when using indirect object pronouns.
 *
 * Typical mistakes:
 * - Wrong word order (after the verb)
 * - Using direct instead of indirect pronouns
 * - Incorrect negation placement
 * - Wrong position in passé composé
 */
export const commonMistakes = [
  {
    wrong: "Je parle lui.",
    correct: "Je lui parle.",
    explanation: "The indirect object pronoun goes before the verb.",
  },
  {
    wrong: "Elle téléphone les.",
    correct: "Elle leur téléphone.",
    explanation: "Téléphoner à uses an indirect object pronoun, not a direct one.",
  },
  {
    wrong: "Je ne parle pas lui.",
    correct: "Je ne lui parle pas.",
    explanation: "In negation, keep the pronoun before the verb.",
  },
  {
    wrong: "J'ai lui parlé.",
    correct: "Je lui ai parlé.",
    explanation: "In the passé composé, the pronoun goes before the auxiliary.",
  },
];

// =============================================================================
// SECTION 12: PRACTICE QUESTIONS
// =============================================================================

/**
 * practiceQuestions - 15 questions testing indirect object pronoun knowledge.
 *
 * Topic distribution:
 * - pronouns (4): Identifying correct pronoun
 * - replacement (4): Replacing nouns with pronouns
 * - direct-vs-indirect (3): Distinguishing direct from indirect
 * - negation (2): Using pronouns with ne...pas
 * - passe-compose (2): Pronouns in passé composé
 */
export const practiceQuestions = [
  {
    id: 1,
    topic: "pronouns",
    prompt: "Which pronoun replaces \"à Marie\"?",
    options: ["la", "lui", "leur"],
    correct: 1,
    explanation: "À Marie becomes lui.",
  },
  {
    id: 2,
    topic: "pronouns",
    prompt: "Which pronoun replaces \"à mes amis\"?",
    options: ["les", "leur", "lui"],
    correct: 1,
    explanation: "À mes amis is plural, so use leur.",
  },
  {
    id: 3,
    topic: "pronouns",
    prompt: "Which pronoun means \"to us\"?",
    options: ["nous", "vous", "leur"],
    correct: 0,
    explanation: "Nous means to us.",
  },
  {
    id: 4,
    topic: "pronouns",
    prompt: "Which pronoun means \"to him / to her\"?",
    options: ["le", "la", "lui"],
    correct: 2,
    explanation: "Lui means to him or to her.",
  },
  {
    id: 5,
    topic: "replacement",
    prompt: "Replace the object in: \"Je parle à Marie.\"",
    options: [
      "Je la parle.",
      "Je lui parle.",
      "Je parle lui.",
    ],
    correct: 1,
    explanation: "À Marie becomes lui, placed before the verb.",
  },
  {
    id: 6,
    topic: "replacement",
    prompt: "Replace the object in: \"Il téléphone à ses amis.\"",
    options: [
      "Il les téléphone.",
      "Il leur téléphone.",
      "Il téléphone leur.",
    ],
    correct: 1,
    explanation: "À ses amis becomes leur.",
  },
  {
    id: 7,
    topic: "replacement",
    prompt: "Replace the object in: \"Nous écrivons au professeur.\"",
    options: [
      "Nous lui écrivons.",
      "Nous le écrivons.",
      "Nous écrivons lui.",
    ],
    correct: 0,
    explanation: "Au professeur becomes lui.",
  },
  {
    id: 8,
    topic: "replacement",
    prompt: "Replace the object in: \"Tu expliques la règle à Paul.\"",
    options: [
      "Tu l'expliques la règle.",
      "Tu lui expliques la règle.",
      "Tu expliques lui la règle.",
    ],
    correct: 1,
    explanation: "À Paul becomes lui.",
  },
  {
    id: 9,
    topic: "direct-vs-indirect",
    prompt: "Which sentence uses an indirect object pronoun correctly?",
    options: [
      "Je lui parle.",
      "Je la parle.",
      "Je les parle.",
    ],
    correct: 0,
    explanation: "Parler à takes an indirect object pronoun.",
  },
  {
    id: 10,
    topic: "direct-vs-indirect",
    prompt: "Which sentence is correct for \"I see Marie\"?",
    options: [
      "Je lui vois.",
      "Je la vois.",
      "Je leur vois.",
    ],
    correct: 1,
    explanation: "Voir takes a direct object, so use la.",
  },
  {
    id: 11,
    topic: "direct-vs-indirect",
    prompt: "Which sentence is correct for \"She is writing to them\"?",
    options: [
      "Elle les écrit.",
      "Elle leur écrit.",
      "Elle lui écrit.",
    ],
    correct: 1,
    explanation: "Écrire à takes an indirect object pronoun.",
  },
  {
    id: 12,
    topic: "negation",
    prompt: "Choose the correct negative sentence.",
    options: [
      "Je ne lui parle pas.",
      "Je lui ne parle pas.",
      "Je ne parle pas lui.",
    ],
    correct: 0,
    explanation: "In negation, the indirect object pronoun stays before the verb.",
  },
  {
    id: 13,
    topic: "negation",
    prompt: "Choose the correct negative sentence.",
    options: [
      "Elle ne leur téléphone pas.",
      "Elle leur ne téléphone pas.",
      "Elle ne téléphone pas leur.",
    ],
    correct: 0,
    explanation: "Use ne + pronoun + verb + pas.",
  },
  {
    id: 14,
    topic: "passe-compose",
    prompt: "Choose the correct sentence in the passé composé.",
    options: [
      "Je lui ai parlé.",
      "J'ai lui parlé.",
      "Je ai lui parlé.",
    ],
    correct: 0,
    explanation: "In the passé composé, the pronoun goes before the auxiliary.",
  },
  {
    id: 15,
    topic: "passe-compose",
    prompt: "Choose the correct negative sentence in the passé composé.",
    options: [
      "Je ne lui ai pas répondu.",
      "Je lui n'ai pas répondu.",
      "Je n'ai pas lui répondu.",
    ],
    correct: 0,
    explanation: "In negation with the passé composé, the pronoun stays before the auxiliary.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score thresholds:
 * - 0-6/15: "Good effort" - Review pronoun choice and verb patterns
 * - 7-11/15: "Nice progress" - Understanding forming, review direct vs indirect
 * - 12-15/15: "Great job" - Using pronouns well
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  const percentage = Math.round((score / total) * 100);

  if (score <= 6) {
    return {
      title: "Good effort",
      message:
        "Indirect object pronouns take practice because French word order is different and some verbs use indirect objects instead of direct ones. You can retake the practice or continue the lesson. A quick review of pronoun choice and verb patterns will help a lot.",
      emoji: "📚",
      color: "blue",
    };
  } else if (score <= 11) {
    return {
      title: "Nice progress",
      message:
        "You're starting to understand how indirect object pronouns work. Review the difference between direct and indirect objects once more if you want to feel more confident.",
      emoji: "🌟",
      color: "yellow",
    };
  } else {
    return {
      title: "Great job",
      message:
        "You're using indirect object pronouns well. This is an important step toward more natural and accurate French.",
      emoji: "🎉",
      color: "green",
    };
  }
}
