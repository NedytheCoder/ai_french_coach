/**
 * A2 Lesson 6 - Direct Object Pronouns (Pronoms Compléments d'Objet Direct)
 * ==========================================================================
 *
 * This file contains all lesson data for A2 Lesson 6, focusing on using
 * direct object pronouns in French (le, la, les, me, te, nous, vous).
 *
 * **Lesson Content:**
 * - Identifying direct objects in sentences
 * - Direct object pronouns table (me, te, le/la, nous, vous, les)
 * - Placement before the verb (or auxiliary in passé composé)
 * - Agreement in gender and number (le/la → l' before vowels)
 * - Using direct object pronouns in passé composé (agreement rules)
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Direct object = answers "what?" or "who?" after the verb
 * - Pronouns replace the noun to avoid repetition
 * - Position: before conjugated verb, after infinitive/participle
 * - Passé composé: agreement with preceding direct object pronoun
 *
 * **Data Categories:**
 * 1. directObjectExamples
 * 2. directObjectPronouns
 * 3. placementExamples
 * 4. passeComposeExamples
 * 5. commonMistakes
 * 6. practiceQuestions
 * 7. sectionIds / SectionId
 * 8. getPerformanceMessage
 */

// =============================================================================
// DIRECT OBJECT EXAMPLES
// =============================================================================

/**
 * directObjectExamples - Shows how to identify direct objects.
 *
 * The direct object answers "what?" or "who?" after the verb.
 */
export const directObjectExamples = [
  {
    sentence: "Je regarde le film.",
    verb: "regarde",
    directObject: "le film",
    english: "I watch the film."
  },
  {
    sentence: "Elle aime Marie.",
    verb: "aime",
    directObject: "Marie",
    english: "She loves Marie / She likes Marie."
  },
  {
    sentence: "Nous mangeons les pommes.",
    verb: "mangeons",
    directObject: "les pommes",
    english: "We eat the apples."
  }
]

/**
 * directObjectPronouns - Table of all direct object pronouns.
 *
 * Shows each pronoun with:
 * - Pronoun form (including elided forms like m', l')
 * - Usage description (who it refers to)
 * - Example sentence in French
 * - English translation
 */
export const directObjectPronouns = [
  {
    pronoun: "me / m'",
    use: "me",
    example: "Il me regarde.",
    english: "He is watching me."
  },
  {
    pronoun: "te / t'",
    use: "you (informal singular)",
    example: "Je te vois.",
    english: "I see you."
  },
  {
    pronoun: "le / l'",
    use: "him / it (masculine singular)",
    example: "Je le connais.",
    english: "I know him / it."
  },
  {
    pronoun: "la / l'",
    use: "her / it (feminine singular)",
    example: "Je la vois.",
    english: "I see her / it."
  },
  {
    pronoun: "nous",
    use: "us",
    example: "Elle nous aide.",
    english: "She helps us."
  },
  {
    pronoun: "vous",
    use: "you (formal/plural)",
    example: "Je vous écoute.",
    english: "I am listening to you."
  },
  {
    pronoun: "les",
    use: "them (plural)",
    example: "Je les invite.",
    english: "I invite them."
  }
]

// =============================================================================
// REPLACEMENT EXAMPLES
// =============================================================================

/**
 * replacementExamples - Shows how to replace nouns with direct object pronouns.
 *
 * Each example shows:
 * - Original sentence with noun
 * - Transformed sentence with pronoun
 * - Explanation of which pronoun to use and why
 */
export const replacementExamples = [
  {
    original: "Je regarde le livre.",
    replaced: "Je le regarde.",
    explanation: "Le livre is masculine singular, so use le."
  },
  {
    original: "Elle écoute la chanson.",
    replaced: "Elle l'écoute.",
    explanation: "La chanson is feminine singular before a vowel sound, so use l'."
  },
  {
    original: "Nous invitons les amis.",
    replaced: "Nous les invitons.",
    explanation: "Les amis is plural, so use les."
  },
  {
    original: "Tu aimes Marie.",
    replaced: "Tu l'aimes.",
    explanation: "Marie is a singular direct object before a vowel, so use l'."
  }
]

// =============================================================================
// POSITION EXAMPLES
// =============================================================================

/**
 * positionExamples - Demonstrates correct pronoun placement.
 *
 * Shows pronouns placed before the conjugated verb in simple affirmative sentences.
 */
export const positionExamples = [
  {
    french: "Je le vois.",
    english: "I see him / it."
  },
  {
    french: "Elle la prend.",
    english: "She takes it."
  },
  {
    french: "Nous les mangeons.",
    english: "We eat them."
  },
  {
    french: "Tu m'écoutes.",
    english: "You are listening to me."
  }
]

// =============================================================================
// NEGATION EXAMPLES
// =============================================================================

/**
 * negativeExamples - Using direct object pronouns in negative sentences.
 *
 * Pattern: subject + ne + pronoun + verb + pas
 */
export const negativeExamples = [
  {
    affirmative: "Je le vois.",
    negative: "Je ne le vois pas.",
    english: "I do not see him / it."
  },
  {
    affirmative: "Elle la connaît.",
    negative: "Elle ne la connaît pas.",
    english: "She does not know her / it."
  },
  {
    affirmative: "Nous les invitons.",
    negative: "Nous ne les invitons pas.",
    english: "We do not invite them."
  }
]

// =============================================================================
// PASSÉ COMPOSÉ EXAMPLES
// =============================================================================

/**
 * passeComposeExamples - Using direct object pronouns in passé composé.
 *
 * Key points:
 * - Pronoun goes before the auxiliary verb (avoir)
 * - Past participle agrees with preceding direct object pronoun
 * - Agreement shown in examples (invitée, mangées)
 */
export const passeComposeExamples = [
  {
    original: "J'ai vu le film.",
    replaced: "Je l'ai vu.",
    english: "I saw it."
  },
  {
    original: "Elle a invité Marie.",
    replaced: "Elle l'a invitée.",
    english: "She invited her."
  },
  {
    original: "Nous avons mangé les pommes.",
    replaced: "Nous les avons mangées.",
    english: "We ate them."
  },
  {
    original: "Je n'ai pas vu Paul.",
    replaced: "Je ne l'ai pas vu.",
    english: "I did not see him."
  }
]

// =============================================================================
// GUIDED EXAMPLES
// =============================================================================

/**
 * guidedExamples - Collection of example sentences for study.
 *
 * Various contexts showing direct object pronouns in everyday French.
 */
export const guidedExamples = [
  {
    french: "Je le regarde souvent.",
    english: "I watch him / it often."
  },
  {
    french: "Elle l'adore.",
    english: "She adores him / her / it."
  },
  {
    french: "Nous les connaissons bien.",
    english: "We know them well."
  },
  {
    french: "Tu ne me vois pas.",
    english: "You do not see me."
  },
  {
    french: "Je l'ai vu hier.",
    english: "I saw him / it yesterday."
  },
  {
    french: "Elle ne les a pas invités.",
    english: "She did not invite them."
  }
]

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Examples of errors learners often make.
 *
 * Each mistake shows:
 * - Wrong formulation (what NOT to do)
 * - Correct formulation
 * - Explanation of why the correct form works
 */
export const commonMistakes = [
  {
    wrong: "Je vois le.",
    correct: "Je le vois.",
    explanation: "The direct object pronoun goes before the verb."
  },
  {
    wrong: "Elle aime la.",
    correct: "Elle l'aime.",
    explanation: "Before a vowel, la becomes l'."
  },
  {
    wrong: "Je ne vois pas le.",
    correct: "Je ne le vois pas.",
    explanation: "In negation, keep the pronoun before the verb."
  },
  {
    wrong: "J'ai le vu.",
    correct: "Je l'ai vu.",
    explanation: "In the passé composé, the pronoun goes before the auxiliary."
  }
]

// =============================================================================
// PRACTICE QUESTIONS (15 total)
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for Lesson 6.
 *
 * Topics covered:
 * - pronouns (1-4): Choosing correct pronoun
 * - replacement (5-8): Replacing nouns with pronouns
 * - position (9-11): Correct word order
 * - negation (12-13): Negative sentences
 * - passe-compose (14-15): Passé composé usage
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
  {
    id: 1,
    topic: "pronouns",
    prompt: 'Which pronoun replaces "le livre"?',
    options: ["la", "le", "les"],
    correct: 1,
    explanation: "Le livre is masculine singular, so use le."
  },
  {
    id: 2,
    topic: "pronouns",
    prompt: 'Which pronoun replaces "les amis"?',
    options: ["les", "leur", "le"],
    correct: 0,
    explanation: "Les amis is plural, so use les."
  },
  {
    id: 3,
    topic: "pronouns",
    prompt: 'Which pronoun replaces "Marie" in "Je vois Marie"?',
    options: ["l'", "les", "leur"],
    correct: 0,
    explanation: "Marie is a singular direct object before a vowel, so use l'."
  },
  {
    id: 4,
    topic: "pronouns",
    prompt: 'Which pronoun means "us" as a direct object?',
    options: ["vous", "nous", "les"],
    correct: 1,
    explanation: "Nous means us."
  },
  {
    id: 5,
    topic: "replacement",
    prompt: 'Replace the object in: "Je regarde le film."',
    options: [
      "Je regarde le.",
      "Je le regarde.",
      "Je regarde l'."
    ],
    correct: 1,
    explanation: "Le film becomes le, and the pronoun goes before the verb."
  },
  {
    id: 6,
    topic: "replacement",
    prompt: 'Replace the object in: "Elle écoute la chanson."',
    options: [
      "Elle la écoute.",
      "Elle l'écoute.",
      "Elle écoute l'."
    ],
    correct: 1,
    explanation: "La chanson becomes l' before a vowel sound."
  },
  {
    id: 7,
    topic: "replacement",
    prompt: 'Replace the object in: "Nous invitons les amis."',
    options: [
      "Nous invitons les.",
      "Nous les invitons.",
      "Nous nous invitons."
    ],
    correct: 1,
    explanation: "Les amis becomes les, placed before the verb."
  },
  {
    id: 8,
    topic: "replacement",
    prompt: 'Replace the object in: "Tu aimes Marie."',
    options: [
      "Tu l'aimes.",
      "Tu la aimes.",
      "Tu aimes l'."
    ],
    correct: 0,
    explanation: "Marie becomes l' before the verb."
  },
  {
    id: 9,
    topic: "position",
    prompt: "Choose the correct sentence.",
    options: [
      "Je le vois.",
      "Je vois le.",
      "Le je vois."
    ],
    correct: 0,
    explanation: "The pronoun goes before the verb."
  },
  {
    id: 10,
    topic: "position",
    prompt: "Choose the correct sentence.",
    options: [
      "Elle la prend.",
      "Elle prend la.",
      "La elle prend."
    ],
    correct: 0,
    explanation: "The direct object pronoun comes before the conjugated verb."
  },
  {
    id: 11,
    topic: "position",
    prompt: 'Which sentence means "We know them well"?',
    options: [
      "Nous les connaissons bien.",
      "Nous connaissons les bien.",
      "Nous bien les connaissons."
    ],
    correct: 0,
    explanation: "Les goes before the verb connaissons."
  },
  {
    id: 12,
    topic: "negation",
    prompt: "Choose the correct negative sentence.",
    options: [
      "Je ne le vois pas.",
      "Je le ne vois pas.",
      "Je ne vois pas le."
    ],
    correct: 0,
    explanation: "In negation, the pronoun stays before the verb."
  },
  {
    id: 13,
    topic: "negation",
    prompt: "Choose the correct negative sentence.",
    options: [
      "Elle ne l'aime pas.",
      "Elle l'ne aime pas.",
      "Elle ne aime pas l'."
    ],
    correct: 0,
    explanation: "With negation, use ne + pronoun + verb + pas."
  },
  {
    id: 14,
    topic: "passe-compose",
    prompt: "Choose the correct sentence in the passé composé.",
    options: [
      "Je l'ai vu.",
      "J'ai le vu.",
      "Je ai l' vu."
    ],
    correct: 0,
    explanation: "In the passé composé, the pronoun goes before the auxiliary."
  },
  {
    id: 15,
    topic: "passe-compose",
    prompt: "Choose the correct negative sentence in the passé composé.",
    options: [
      "Je ne l'ai pas vu.",
      "Je l'ai ne pas vu.",
      "Je n'ai pas l' vu."
    ],
    correct: 0,
    explanation: "In negation with the passé composé, the pronoun stays before the auxiliary."
  }
]

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections in order:
 * 1. intro - Introduction to direct objects
 * 2. what-is-direct-object - Identifying direct objects
 * 3. what-is-pronoun - Understanding pronouns
 * 4. pronouns-table - The pronoun table
 * 5. replacing-nouns - Replacing nouns
 * 6. position - Word placement
 * 7. negation - Negative sentences
 * 8. passe-compose - Passé composé
 * 9. examples - Guided examples
 * 10. mistakes - Common errors
 * 11. practice - Interactive quiz
 */
export const sectionIds = [
  'intro',
  'what-is-direct-object',
  'what-is-pronoun',
  'pronouns-table',
  'replacing-nouns',
  'position',
  'negation',
  'passe-compose',
  'examples',
  'mistakes',
  'practice'
] as const

/**
 * SectionId - Type for all valid section identifiers.
 */
export type SectionId = typeof sectionIds[number]

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-40%: "Good effort" - amber color, suggests review
 * - 41-73%: "Nice progress" - blue color, encourages continued learning
 * - 74-100%: "Great job" - green color, congratulates mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions
 * @returns Object with title, message, color, and tone
 */
export function getPerformanceMessage(score: number, total: number): {
  title: string
  message: string
  color: 'amber' | 'blue' | 'green'
  tone: 'low' | 'mid' | 'high'
} {
  const percentage = Math.round((score / total) * 100)
  
  if (percentage <= 40) {
    return {
      title: "Good effort",
      message: "Direct object pronouns take practice because French word order is different from English. You can retake the practice or continue the lesson. A quick review of pronoun choice and sentence position will help a lot.",
      color: 'amber',
      tone: 'low'
    }
  } else if (percentage <= 73) {
    return {
      title: "Nice progress",
      message: "You're starting to understand how direct object pronouns work. Review negation and passé composé position once more if you want to feel more confident.",
      color: 'blue',
      tone: 'mid'
    }
  } else {
    return {
      title: "Great job",
      message: "You're using direct object pronouns well. This is an important step toward more natural and fluent French.",
      color: 'green',
      tone: 'high'
    }
  }
}
