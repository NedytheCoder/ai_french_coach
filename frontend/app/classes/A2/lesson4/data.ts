/**
 * A2 Lesson 4 - The Simple Future (Futur Simple) Data
 * =====================================================
 *
 * This file contains all lesson data for A2 Lesson 4, focusing on the futur simple
 * tense in French, used for expressing future actions and predictions.
 *
 * **Lesson Content:**
 * - Uses of the futur simple (future actions, plans, predictions, promises)
 * - Formation: infinitive + future endings (-ai, -as, -a, -ons, -ez, -ont)
 * - Regular verbs in -er, -ir, -re
 * - Irregular verb stems (être → ser-, avoir → aur-, etc.)
 * - Futur simple vs near future (futur proche) comparison
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Futur simple = formal future tense for distant or uncertain future
 * - Near future (aller + infinitive) = informal, immediate plans
 * - Many verbs have irregular stems in futur simple
 * - Endings are consistent across all verbs (regular and irregular)
 *
 * **Data Categories:**
 * 1. FuturSimpleUse / futurSimpleUses - Four main uses
 * 2. FutureEnding / futureEndings - Conjugation endings
 * 3. RegularFutureVerb / regularFutureVerbs - Regular conjugations
 * 4. IrregularFutureVerb / irregularFutureVerbs - Irregular stems
 * 5. TenseComparison / tenseComparisons - Futur simple vs near future
 * 6. GuidedExample / guidedExamples - Full example sentences
 * 7. CommonMistake / commonMistakes - Error corrections
 * 8. PracticeQuestion / practiceQuestions - 15 quiz questions
 * 9. sectionIds / SectionId - Lesson sections
 * 10. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// FUTUR SIMPLE USES
// =============================================================================

/**
 * FuturSimpleUse - Describes a specific use case for the futur simple.
 */
export interface FuturSimpleUse {
  title: string
  explanation: string
  example: string
  english: string
}

/**
 * futurSimpleUses - The four main uses of the futur simple tense.
 *
 * 1. Future actions - What will happen
 * 2. Plans or intentions - What someone plans to do
 * 3. Predictions - What will likely happen
 * 4. Promises - Commitments about the future
 */
export const futurSimpleUses: FuturSimpleUse[] = [
  {
    title: "Future actions",
    explanation: "Actions that will happen later.",
    example: "Je visiterai Paris un jour.",
    english: "I will visit Paris one day."
  },
  {
    title: "Plans or intentions",
    explanation: "Things the speaker plans to do.",
    example: "Demain, je commencerai tôt.",
    english: "Tomorrow, I will start early."
  },
  {
    title: "Predictions",
    explanation: "Things the speaker thinks will happen.",
    example: "Il fera beau demain.",
    english: "The weather will be nice tomorrow."
  },
  {
    title: "Promises or future statements",
    explanation: "Things the speaker says will happen.",
    example: "Je t'aiderai.",
    english: "I will help you."
  }
]

// =============================================================================
// FUTURE ENDINGS
// =============================================================================

/**
 * FutureEnding - A single futur simple conjugation ending.
 *
 * These endings are the same for ALL verbs (regular and irregular).
 * Pattern: -ai, -as, -a, -ons, -ez, -ont
 */
export interface FutureEnding {
  pronoun: string
  ending: string
}

export const futureEndings: FutureEnding[] = [
  { pronoun: "je", ending: "-ai" },
  { pronoun: "tu", ending: "-as" },
  { pronoun: "il / elle / on", ending: "-a" },
  { pronoun: "nous", ending: "-ons" },
  { pronoun: "vous", ending: "-ez" },
  { pronoun: "ils / elles", ending: "-ont" }
]

// =============================================================================
// REGULAR FUTURE VERBS
// =============================================================================

/**
 * RegularFutureVerb - Regular verb conjugated in futur simple.
 *
 * For regular verbs: Keep infinitive, add future endings.
 */
export interface RegularFutureVerb {
  infinitive: string
  je: string
  english: string
}

export const regularFutureVerbs: RegularFutureVerb[] = [
  { infinitive: "parler", je: "je parlerai", english: "I will speak" },
  { infinitive: "finir", je: "je finirai", english: "I will finish" },
  { infinitive: "travailler", je: "je travaillerai", english: "I will work" },
  { infinitive: "étudier", je: "j'étudierai", english: "I will study" },
  { infinitive: "manger", je: "je mangerai", english: "I will eat" },
  { infinitive: "habiter", je: "j'habiterai", english: "I will live" },
  { infinitive: "vendre", je: "je vendrai", english: "I will sell" },
  { infinitive: "attendre", je: "j'attendrai", english: "I will wait" }
]

// =============================================================================
// IRREGULAR FUTURE VERBS
// =============================================================================

/**
 * IrregularFutureVerb - Verb with irregular stem in futur simple.
 *
 * Common irregulars: être (ser-), avoir (aur-), aller (ir-), faire (fer-),
 * venir (viendr-), voir (verr-), vouloir (voudr-), pouvoir (pourr-), etc.
 */
export interface IrregularFutureVerb {
  infinitive: string
  stem: string
  sample: string
  english: string
}

export const irregularFutureVerbs: IrregularFutureVerb[] = [
  { infinitive: "être", stem: "ser-", sample: "je serai", english: "I will be" },
  { infinitive: "avoir", stem: "aur-", sample: "j'aurai", english: "I will have" },
  { infinitive: "aller", stem: "ir-", sample: "j'irai", english: "I will go" },
  { infinitive: "faire", stem: "fer-", sample: "je ferai", english: "I will do / make" },
  { infinitive: "venir", stem: "viendr-", sample: "je viendrai", english: "I will come" },
  { infinitive: "voir", stem: "verr-", sample: "je verrai", english: "I will see" },
  { infinitive: "vouloir", stem: "voudr-", sample: "je voudrai", english: "I will want" },
  { infinitive: "pouvoir", stem: "pourr-", sample: "je pourrai", english: "I will be able to / can" },
  { infinitive: "devoir", stem: "devr-", sample: "je devrai", english: "I will have to / must" },
  { infinitive: "savoir", stem: "saur-", sample: "je saurai", english: "I will know" }
]

// =============================================================================
// FUTURE TENSE COMPARISON
// =============================================================================

/**
 * FutureComparison - Compares futur proche and futur simple.
 *
 * Shows when to use near future (aller + infinitive) vs formal future.
 */
export interface FutureComparison {
  futurProche: string
  futurSimple: string
  futurProcheEnglish: string
  futurSimpleEnglish: string
  note: string
}

export const futureComparisons: FutureComparison[] = [
  {
    futurProche: "Je vais partir bientôt.",
    futurSimple: "Je partirai demain.",
    futurProcheEnglish: "I am going to leave soon.",
    futurSimpleEnglish: "I will leave tomorrow.",
    note: "The futur proche often feels closer or more immediate. The futur simple is a standard future tense."
  },
  {
    futurProche: "Nous allons étudier ce soir.",
    futurSimple: "Nous étudierons demain.",
    futurProcheEnglish: "We are going to study tonight.",
    futurSimpleEnglish: "We will study tomorrow.",
    note: "Both talk about the future, but they are formed differently."
  },
  {
    futurProche: "Il va pleuvoir.",
    futurSimple: "Il pleuvra demain.",
    futurProcheEnglish: "It is going to rain.",
    futurSimpleEnglish: "It will rain tomorrow.",
    note: "Learners should understand both structures."
  }
]

// =============================================================================
// GUIDED EXAMPLES
// =============================================================================

/**
 * GuidedExample - Full sentences in futur simple.
 */
export interface GuidedExample {
  french: string
  english: string
}

export const guidedExamples: GuidedExample[] = [
  { french: "Je parlerai avec le professeur demain.", english: "I will speak with the teacher tomorrow." },
  { french: "Nous finirons le travail ce soir.", english: "We will finish the work tonight." },
  { french: "Elle sera fatiguée après le voyage.", english: "She will be tired after the trip." },
  { french: "Tu auras plus de temps demain.", english: "You will have more time tomorrow." },
  { french: "Ils iront en France l'année prochaine.", english: "They will go to France next year." },
  { french: "Je ferai mes devoirs après le dîner.", english: "I will do my homework after dinner." }
]

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * CommonMistake - Incorrect vs correct futur simple usage.
 */
export interface CommonMistake {
  wrong: string
  correct: string
  explanation: string
}

export const commonMistakes: CommonMistake[] = [
  { wrong: "Je parleras demain.", correct: "Je parlerai demain.", explanation: "With je, use the ending -ai." },
  { wrong: "Nous vendrerons la voiture.", correct: "Nous vendrons la voiture.", explanation: "For -re verbs, remove the final e before adding the endings." },
  { wrong: "J'irai voir et je vais manger demain.", correct: "J'irai voir Marie demain.", explanation: "Be careful not to mix structures accidentally unless the sentence really needs both." },
  { wrong: "Je fairai mes devoirs.", correct: "Je ferai mes devoirs.", explanation: "Faire is irregular and uses the stem fer-." }
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
 * practiceQuestions - 15 questions testing futur simple knowledge.
 *
 * Topic distribution:
 * - usage (4): When to use futur simple
 * - regular (4): Regular verb conjugation
 * - irregular (3): Irregular verb stems
 * - comparison (2): Futur proche vs futur simple
 * - correction (2): Error identification
 */
export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    topic: "usage",
    prompt: "Which tense is this lesson about?",
    options: ["imparfait", "futur simple", "passé composé"],
    correct: 1,
    explanation: "This lesson focuses on the futur simple."
  },
  {
    id: 2,
    topic: "usage",
    prompt: "Which sentence expresses a prediction?",
    options: ["Il fera beau demain.", "Il faisait beau hier.", "Il va à l'école."],
    correct: 0,
    explanation: "The futur simple can express predictions."
  },
  {
    id: 3,
    topic: "usage",
    prompt: "Which sentence expresses a future action?",
    options: ["Je parlerai demain.", "Je parlais hier.", "Je vais parle."],
    correct: 0,
    explanation: "Je parlerai is a futur simple form."
  },
  {
    id: 4,
    topic: "usage",
    prompt: "Which idea is commonly expressed with the futur simple?",
    options: ["past description", "future plan or prediction", "present habit only"],
    correct: 1,
    explanation: "The futur simple is used for future actions, plans, and predictions."
  },
  {
    id: 5,
    topic: "regular",
    prompt: "Choose the correct futur simple form: Je ___ avec Marie.",
    options: ["parlerai", "parleras", "parlera"],
    correct: 0,
    explanation: "With je, the ending is -ai."
  },
  {
    id: 6,
    topic: "regular",
    prompt: "Choose the correct futur simple form: Nous ___ demain.",
    options: ["finirons", "finirai", "finiront"],
    correct: 0,
    explanation: "With nous, the ending is -ons."
  },
  {
    id: 7,
    topic: "regular",
    prompt: "Choose the correct futur simple form: Vous ___ ici.",
    options: ["travaillerez", "travaillerons", "travaillera"],
    correct: 0,
    explanation: "With vous, the ending is -ez."
  },
  {
    id: 8,
    topic: "regular",
    prompt: "Choose the correct futur simple form: Ils ___ la voiture.",
    options: ["vendront", "vendreront", "vendreont"],
    correct: 0,
    explanation: "Vendre becomes vendr- in the future, then add -ont."
  },
  {
    id: 9,
    topic: "irregular",
    prompt: "What is the futur simple stem of être?",
    options: ["ser-", "êt-", "et-"],
    correct: 0,
    explanation: "Être uses the irregular future stem ser-."
  },
  {
    id: 10,
    topic: "irregular",
    prompt: "Choose the correct future form of avoir.",
    options: ["j'aurai", "j'averai", "j'aiurai"],
    correct: 0,
    explanation: "Avoir uses the stem aur-."
  },
  {
    id: 11,
    topic: "irregular",
    prompt: "Choose the correct future form of faire.",
    options: ["je fairai", "je ferai", "je faiserai"],
    correct: 1,
    explanation: "Faire uses the irregular stem fer-."
  },
  {
    id: 12,
    topic: "comparison",
    prompt: "Which sentence is in the futur proche?",
    options: ["Je vais partir bientôt.", "Je partirai demain.", "Je partais hier."],
    correct: 0,
    explanation: "The futur proche uses aller + infinitive."
  },
  {
    id: 13,
    topic: "comparison",
    prompt: "Which sentence is in the futur simple?",
    options: ["Nous allons manger.", "Nous mangerons ce soir.", "Nous mangions souvent."],
    correct: 1,
    explanation: "Mangerons is a futur simple form."
  },
  {
    id: 14,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: ["Je parleras demain.", "Je parlerai demain.", "Je parleai demain."],
    correct: 1,
    explanation: "With je, the correct ending is -ai."
  },
  {
    id: 15,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: ["Je fairai mes devoirs.", "Je ferai mes devoirs.", "Je faireai mes devoirs."],
    correct: 1,
    explanation: "Faire is irregular and uses the stem fer-."
  }
]

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections in order:
 * 1. intro - Introduction to futur simple
 * 2. uses - Four main uses of futur simple
 * 3. formation - How to form the tense
 * 4. regular-verbs - Regular verb conjugations
 * 5. irregular-verbs - Irregular verb stems
 * 6. comparison - Futur proche vs futur simple
 * 7. examples - Guided example sentences
 * 8. mistakes - Common errors
 * 9. practice - Interactive quiz
 */
export const sectionIds = [
  'intro',
  'uses',
  'formation',
  'regular-verbs',
  'irregular-verbs',
  'comparison',
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
      message: "You're using the futur simple well. This tense is very useful for talking about future plans and predictions in French.",
      tone: "high",
      color: "green"
    }
  } else if (percentage >= 47) {
    return {
      title: "Nice progress",
      message: "You're starting to understand how the futur simple works. Review the endings and the difference from futur proche once more if you want to feel more confident.",
      tone: "medium",
      color: "blue"
    }
  } else {
    return {
      title: "Good effort",
      message: "The futur simple takes practice, especially with irregular stems. You can retake the practice or continue the lesson. A quick review of the endings and common irregular verbs will help a lot.",
      tone: "low",
      color: "amber"
    }
  }
}
