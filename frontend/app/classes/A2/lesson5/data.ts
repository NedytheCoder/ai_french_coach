/**
 * A2 Lesson 5 - Comparisons (Comparatifs) Data
 * =============================================
 *
 * This file contains all lesson data for A2 Lesson 5, focusing on making
 * comparisons in French using plus...que, moins...que, and aussi...que.
 *
 * **Lesson Content:**
 * - Adjective comparisons (plus grand que, moins cher que, aussi lourd que)
 * - Adverb comparisons (plus vite, moins lentement, aussi bien)
 * - Noun comparisons (plus de, moins de, autant de)
 * - Irregular comparatives (bon → meilleur, bien → mieux)
 * - Using que + stress pronouns (moi, toi, lui, elle)
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Patterns:**
 * - plus + adjective/adverb/noun + que = more...than
 * - moins + adjective/adverb/noun + que = less...than
 * - aussi + adjective/adverb + que = as...as
 * - plus/moins/autant + de + noun = more/less/as many...noun
 *
 * **Data Categories:**
 * 1. AdjectiveComparison / adjectiveComparisons
 * 2. AdverbComparison / adverbComparisons
 * 3. NounComparison / nounComparisons
 * 4. IrregularComparative / irregularComparatives
 * 5. StressPronoun / stressPronouns
 * 6. CommonMistake / commonMistakes
 * 7. PracticeQuestion / practiceQuestions
 * 8. sectionIds / SectionId
 * 9. getPerformanceMessage
 */

// =============================================================================
// ADJECTIVE COMPARISONS
// =============================================================================

/**
 * AdjectiveComparison - Comparison using adjectives.
 *
 * Pattern: plus/moins/aussi + adjective + que
 */
export interface AdjectiveComparison {
  french: string
  english: string
  pattern: string
}

export const adjectiveComparisons: AdjectiveComparison[] = [
  {
    french: "Marie est plus grande que Paul.",
    english: "Marie is taller than Paul.",
    pattern: "plus + adjective + que"
  },
  {
    french: "Cette voiture est moins chère que l'autre.",
    english: "This car is less expensive than the other one.",
    pattern: "moins + adjective + que"
  },
  {
    french: "Mon sac est aussi lourd que le tien.",
    english: "My bag is as heavy as yours.",
    pattern: "aussi + adjective + que"
  }
]

// =============================================================================
// ADVERB COMPARISONS
// =============================================================================

/**
 * AdverbComparison - Comparing actions using adverbs.
 *
 * Pattern: plus/moins/aussi + adverb + que
 */
export interface AdverbComparison {
  french: string
  english: string
}

export const adverbComparisons: AdverbComparison[] = [
  {
    french: "Il court plus vite que moi.",
    english: "He runs faster than me."
  },
  {
    french: "Elle parle moins lentement maintenant.",
    english: "She speaks less slowly now."
  },
  {
    french: "Tu travailles aussi bien que lui.",
    english: "You work as well as he does."
  }
]

// =============================================================================
// NOUN COMPARISONS
// =============================================================================

/**
 * NounComparison - Comparing quantities with nouns.
 *
 * Pattern: plus de / moins de / autant de + noun + que
 * Note: "de" is required before the noun being compared.
 */
export interface NounComparison {
  french: string
  english: string
}

export const nounComparisons: NounComparison[] = [
  {
    french: "J'ai plus de livres que toi.",
    english: "I have more books than you."
  },
  {
    french: "Nous avons moins de temps qu'eux.",
    english: "We have less time than them."
  },
  {
    french: "Elle a autant d'amis que son frère.",
    english: "She has as many friends as her brother."
  }
]

// =============================================================================
// VERB COMPARISONS
// =============================================================================

/**
 * VerbComparison - Comparing actions or verb frequency/intensity.
 */
export interface VerbComparison {
  french: string
  english: string
}

export const verbComparisons: VerbComparison[] = [
  {
    french: "Je travaille plus que toi.",
    english: "I work more than you."
  },
  {
    french: "Ils mangent moins que nous.",
    english: "They eat less than we do."
  },
  {
    french: "Elle étudie autant que son ami.",
    english: "She studies as much as her friend."
  }
]

// =============================================================================
// SUPERLATIVE EXAMPLES
// =============================================================================

/**
 * SuperlativeExample - Using le plus/le moins to express extremes.
 *
 * Pattern: le/la/les + plus/moins + adjective
 * Indicates the highest or lowest degree of a quality.
 */
export interface SuperlativeExample {
  french: string
  english: string
}

export const superlativeExamples: SuperlativeExample[] = [
  {
    french: "C'est le plus grand bâtiment de la ville.",
    english: "It is the tallest building in the city."
  },
  {
    french: "Elle est la plus intelligente de la classe.",
    english: "She is the smartest in the class."
  },
  {
    french: "C'est la moins chère des trois options.",
    english: "It is the least expensive of the three options."
  },
  {
    french: "Ils sont les plus rapides.",
    english: "They are the fastest."
  }
]

// =============================================================================
// IRREGULAR COMPARISONS
// =============================================================================

/**
 * IrregularComparison - Irregular comparative forms in French.
 *
 * Unlike regular comparisons, these don't follow the standard plus/moins pattern:
 * - bon → meilleur (better, adjective)
 * - bien → mieux (better, adverb)
 * - mauvais → pire (worse)
 */
export interface IrregularComparison {
  form: string
  use: string
  example: string
  english: string
}

export const irregularComparisons: IrregularComparison[] = [
  {
    form: "meilleur / meilleure / meilleurs / meilleures",
    use: "better (with nouns / adjective use of bon)",
    example: "Ce livre est meilleur que l'autre.",
    english: "This book is better than the other one."
  },
  {
    form: "mieux",
    use: "better (with verbs and adverbs)",
    example: "Elle chante mieux que moi.",
    english: "She sings better than me."
  },
  {
    form: "pire",
    use: "worse",
    example: "Ce film est pire que le premier.",
    english: "This film is worse than the first one."
  }
]

// =============================================================================
// GUIDED EXAMPLES
// =============================================================================

/**
 * GuidedExample - Full sentences demonstrating comparison patterns.
 *
 * Mix of adjective, adverb, noun, verb comparisons and superlatives.
 */
export interface GuidedExample {
  french: string
  english: string
}

export const guidedExamples: GuidedExample[] = [
  { french: "Paul est plus grand que Marc.", english: "Paul is taller than Marc." },
  { french: "Ce sac est moins lourd que l'autre.", english: "This bag is less heavy than the other one." },
  { french: "Elle a autant de travail que moi.", english: "She has as much work as I do." },
  { french: "Nous étudions plus qu'avant.", english: "We study more than before." },
  { french: "C'est le plus beau parc de la ville.", english: "It is the most beautiful park in the city." },
  { french: "Tu chantes mieux maintenant.", english: "You sing better now." }
]

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * CommonMistake - Incorrect vs correct comparison usage.
 *
 * Typical errors:
 * - Using "de" instead of "que" after comparisons
 * - Forgetting "de" when comparing nouns
 * - Using wrong irregular forms (meilleur vs mieux)
 * - Missing articles in superlatives
 */
export interface CommonMistake {
  wrong: string
  correct: string
  explanation: string
}

export const commonMistakes: CommonMistake[] = [
  { wrong: "Marie est plus grande de Paul.", correct: "Marie est plus grande que Paul.", explanation: "Use que after the comparison, not de." },
  { wrong: "J'ai plus livres que toi.", correct: "J'ai plus de livres que toi.", explanation: "When comparing nouns, use plus de / moins de / autant de." },
  { wrong: "Elle chante meilleur que moi.", correct: "Elle chante mieux que moi.", explanation: "Use mieux for verbs and adverbs, not meilleur." },
  { wrong: "C'est plus grand bâtiment.", correct: "C'est le plus grand bâtiment.", explanation: "Superlatives need the definite article: le / la / les." }
]

// =============================================================================
// PRACTICE QUESTIONS
// =============================================================================

/**
 * PracticeQuestion - Multiple-choice question for the quiz.
 */
export interface PracticeQuestion {
  id: number
  topic: string
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

/**
 * practiceQuestions - 15 questions testing comparison knowledge.
 *
 * Topic distribution:
 * - adjective (4): Comparing adjectives
 * - noun (3): Comparing quantities with nouns
 * - adverb (2): Comparing adverbs
 * - superlative (3): Using le plus/le moins
 * - irregular (3): Irregular forms (meilleur, mieux)
 */
export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    topic: "adjective",
    prompt: "Choose the correct sentence.",
    options: [
      "Marie est plus grande que Paul.",
      "Marie est plus grande de Paul.",
      "Marie est grande plus que Paul."
    ],
    correct: 0,
    explanation: "Use plus + adjective + que."
  },
  {
    id: 2,
    topic: "adjective",
    prompt: "Which sentence means \"This car is less expensive than the other one\"?",
    options: [
      "Cette voiture est moins chère que l'autre.",
      "Cette voiture est plus chère que l'autre.",
      "Cette voiture est aussi chère que l'autre."
    ],
    correct: 0,
    explanation: "Moins chère means less expensive."
  },
  {
    id: 3,
    topic: "adverb",
    prompt: "Choose the correct sentence.",
    options: [
      "Il court plus vite que moi.",
      "Il court plus vite de moi.",
      "Il plus court vite que moi."
    ],
    correct: 0,
    explanation: "Use plus + adverb + que."
  },
  {
    id: 4,
    topic: "adverb",
    prompt: "Which word means \"better\" when comparing actions?",
    options: ["meilleur", "mieux", "plus bon"],
    correct: 1,
    explanation: "Use mieux for verbs and adverbs."
  },
  {
    id: 5,
    topic: "noun",
    prompt: "Choose the correct sentence.",
    options: [
      "J'ai plus de livres que toi.",
      "J'ai plus livres que toi.",
      "J'ai plus des livres que toi."
    ],
    correct: 0,
    explanation: "For nouns, use plus de + noun."
  },
  {
    id: 6,
    topic: "noun",
    prompt: "Which sentence means \"We have less time than them\"?",
    options: [
      "Nous avons moins de temps qu'eux.",
      "Nous avons moins temps qu'eux.",
      "Nous avons moins du temps qu'eux."
    ],
    correct: 0,
    explanation: "Use moins de + noun."
  },
  {
    id: 7,
    topic: "noun",
    prompt: "Choose the correct equality comparison with a noun.",
    options: [
      "Elle a autant d'amis que son frère.",
      "Elle a aussi amis que son frère.",
      "Elle a autant amis que son frère."
    ],
    correct: 0,
    explanation: "Use autant de / d' + noun + que."
  },
  {
    id: 8,
    topic: "verb",
    prompt: "Choose the correct sentence.",
    options: [
      "Je travaille plus que toi.",
      "Je travaille plus de toi.",
      "Je plus travaille que toi."
    ],
    correct: 0,
    explanation: "For verbs, use verb + plus / moins / autant + que."
  },
  {
    id: 9,
    topic: "verb",
    prompt: "Which sentence means \"They eat less than we do\"?",
    options: [
      "Ils mangent moins que nous.",
      "Ils mangent moins de nous.",
      "Ils moins mangent que nous."
    ],
    correct: 0,
    explanation: "This is the correct verb comparison pattern."
  },
  {
    id: 10,
    topic: "verb",
    prompt: "Choose the correct equality comparison with a verb.",
    options: [
      "Elle étudie autant que son ami.",
      "Elle étudie autant de son ami.",
      "Elle autant étudie que son ami."
    ],
    correct: 0,
    explanation: "For verbs, use autant + que."
  },
  {
    id: 11,
    topic: "superlative",
    prompt: "Choose the correct sentence.",
    options: [
      "C'est le plus grand bâtiment.",
      "C'est plus grand bâtiment.",
      "C'est le grand plus bâtiment."
    ],
    correct: 0,
    explanation: "Superlatives need the definite article."
  },
  {
    id: 12,
    topic: "superlative",
    prompt: "Which sentence means \"She is the smartest in the class\"?",
    options: [
      "Elle est la plus intelligente de la classe.",
      "Elle est plus intelligente de la classe.",
      "Elle est intelligente la plus de la classe."
    ],
    correct: 0,
    explanation: "Use la plus + adjective."
  },
  {
    id: 13,
    topic: "superlative",
    prompt: "Choose the correct sentence.",
    options: [
      "Ils sont les plus rapides.",
      "Ils sont plus rapides.",
      "Ils sont les rapides plus."
    ],
    correct: 0,
    explanation: "With a plural subject, use les plus."
  },
  {
    id: 14,
    topic: "irregular",
    prompt: "Choose the correct sentence.",
    options: [
      "Ce livre est meilleur que l'autre.",
      "Ce livre est mieux que l'autre.",
      "Ce livre est plus bien que l'autre."
    ],
    correct: 0,
    explanation: "Use meilleur to mean better when comparing things as an adjective."
  },
  {
    id: 15,
    topic: "irregular",
    prompt: "Choose the correct sentence.",
    options: [
      "Elle chante mieux que moi.",
      "Elle chante meilleur que moi.",
      "Elle chante plus bonne que moi."
    ],
    correct: 0,
    explanation: "Use mieux for verbs and adverbs."
  }
]

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections in order:
 * 1. intro - Introduction to comparisons
 * 2. adjectives - Comparing adjectives
 * 3. adverbs - Comparing adverbs
 * 4. nouns - Comparing nouns with quantities
 * 5. verbs - Comparing verbs/actions
 * 6. superlatives-intro - Introduction to superlatives
 * 7. superlatives - Using le plus/le moins
 * 8. irregular - Irregular forms
 * 9. examples - Guided example sentences
 * 10. mistakes - Common errors
 * 11. practice - Interactive quiz
 */
export const sectionIds = [
  'intro',
  'adjectives',
  'adverbs',
  'nouns',
  'verbs',
  'superlatives-intro',
  'superlatives',
  'irregular',
  'examples',
  'mistakes',
  'practice'
] as const

export type SectionId = typeof sectionIds[number]

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * PerformanceMessage - Feedback message based on quiz performance.
 */
export interface PerformanceMessage {
  title: string
  message: string
  tone: 'high' | 'medium' | 'low'
  color: 'green' | 'blue' | 'amber'
}

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score thresholds:
 * - ≥80% (12/15): "Great job!" - green, high tone
 * - 47-79% (7-11/15): "Nice progress" - blue, medium tone
 * - <47% (<7/15): "Good effort" - amber, low tone
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns PerformanceMessage with title, message, tone, and color
 */
export function getPerformanceMessage(score: number, total: number): PerformanceMessage {
  const percentage = (score / total) * 100
  
  if (percentage >= 80) {
    return {
      title: "Great job!",
      message: "You're using comparatives and superlatives well. This will help you express opinions and comparisons much more naturally in French.",
      tone: "high",
      color: "green"
    }
  } else if (percentage >= 47) {
    return {
      title: "Nice progress",
      message: "You're starting to understand how French comparison works. Review noun comparison and irregular forms once more if you want to feel more confident.",
      tone: "medium",
      color: "blue"
    }
  } else {
    return {
      title: "Good effort",
      message: "Comparatives and superlatives take practice because French uses different patterns for adjectives, nouns, verbs, and adverbs. You can retake the practice or continue the lesson. A quick review of the structures will help a lot.",
      tone: "low",
      color: "amber"
    }
  }
}
