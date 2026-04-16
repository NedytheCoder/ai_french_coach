/**
 * A2 Lesson 3 - The Imparfait (Imperfect Tense) Data
 * ====================================================
 *
 * This file contains all lesson data for A2 Lesson 3, focusing on the imparfait
 * tense in French (l'imparfait), used for describing past actions and states.
 *
 * **Lesson Content:**
 * - Uses of the imparfait (habits, descriptions, background actions, states)
 * - Formation rule: nous form stem + imparfait endings
 * - Imparfait endings: -ais, -ais, -ait, -ions, -iez, -aient
 * - Common verbs in the imparfait
 * - Imparfait vs passé composé comparisons
 * - The irregular verb être in imparfait
 * - Common mistakes to avoid
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Imparfait = ongoing/repeated past, descriptions, background
 * - Passé composé = completed actions, events
 * - Formation: Remove -ons from nous form, add imparfait endings
 * - Être is irregular: ét- + endings
 *
 * **Data Categories:**
 * 1. ImparfaitUse / imparfaitUses - Four main uses with examples
 * 2. ImparfaitEnding / imparfaitEndings - Conjugation endings chart
 * 3. FormationExample / formationExamples - How to form the tense
 * 4. EtreImparfaitForm / etreImparfait - Irregular être conjugation
 * 5. CommonImparfaitVerb / commonImparfaitVerbs - 10 common verbs
 * 6. TenseComparison / tenseComparisons - Imparfait vs passé composé
 * 7. GuidedExample / guidedExamples - Full example sentences
 * 8. CommonMistake / commonMistakes - Error corrections
 * 9. PracticeQuestion / practiceQuestions - 15 quiz questions
 * 10. sectionIds / SectionId - Lesson sections
 * 11. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// IMPARFAIT USES
// =============================================================================

/**
 * ImparfaitUse - Describes a specific use case for the imparfait.
 */
export interface ImparfaitUse {
  title: string
  explanation: string
  example: string
  english: string
}

/**
 * imparfaitUses - The four main uses of the imparfait tense.
 *
 * 1. Past habits - Regular/repeated actions in the past
 * 2. Descriptions in the past - What things/people were like
 * 3. Background actions - Actions already in progress
 * 4. Past states / age - Feelings, states, ages
 */
export const imparfaitUses: ImparfaitUse[] = [
  {
    title: "Past habits",
    explanation: "Actions that happened regularly in the past.",
    example: "Quand j'étais enfant, je jouais au football.",
    english: "When I was a child, I used to play football."
  },
  {
    title: "Descriptions in the past",
    explanation: "What things, people, or situations were like.",
    example: "La maison était grande.",
    english: "The house was big."
  },
  {
    title: "Background actions",
    explanation: "Actions or situations already in progress in the past.",
    example: "Je dormais quand tu as appelé.",
    english: "I was sleeping when you called."
  },
  {
    title: "Past states / age",
    explanation: "How someone felt, was, or how old they were.",
    example: "J'avais dix ans.",
    english: "I was ten years old."
  }
]

// =============================================================================
// IMPARFAIT ENDINGS
// =============================================================================

/**
 * ImparfaitEnding - A single imparfait conjugation ending.
 */
export interface ImparfaitEnding {
  pronoun: string
  ending: string
}

/**
 * imparfaitEndings - The six imparfait endings.
 *
 * Pattern: -ais, -ais, -ait, -ions, -iez, -aient
 * Note: je and tu share the same ending (-ais)
 */
export const imparfaitEndings: ImparfaitEnding[] = [
  { pronoun: "je", ending: "-ais" },
  { pronoun: "tu", ending: "-ais" },
  { pronoun: "il / elle / on", ending: "-ait" },
  { pronoun: "nous", ending: "-ions" },
  { pronoun: "vous", ending: "-iez" },
  { pronoun: "ils / elles", ending: "-aient" }
]

// =============================================================================
// FORMATION EXAMPLES
// =============================================================================

/**
 * FormationExample - Shows how to derive the imparfait from the present.
 */
export interface FormationExample {
  infinitive: string
  nousForm: string
  stem: string
  sample: string
  english: string
}

/**
 * formationExamples - Step-by-step formation of the imparfait.
 *
 * Rule: Take the nous form, remove -ons, add imparfait endings.
 * Examples show -er, -ir, and -re verbs.
 */
export const formationExamples: FormationExample[] = [
  {
    infinitive: "parler",
    nousForm: "nous parlons",
    stem: "parl-",
    sample: "je parlais",
    english: "I was speaking / I used to speak"
  },
  {
    infinitive: "finir",
    nousForm: "nous finissons",
    stem: "finiss-",
    sample: "je finissais",
    english: "I was finishing / I used to finish"
  },
  {
    infinitive: "manger",
    nousForm: "nous mangeons",
    stem: "mange-",
    sample: "je mangeais",
    english: "I was eating / I used to eat"
  }
]

// =============================================================================
// ÊTRE IN THE IMPARFAIT
// =============================================================================

/**
 * EtreImparfaitForm - Conjugated form of être in imparfait.
 */
export interface EtreImparfaitForm {
  pronoun: string
  form: string
}

/**
 * etreImparfait - The irregular verb être in the imparfait.
 *
 * Être is completely irregular: uses stem "ét-" instead of present stem.
 * Forms: j'étais, tu étais, il était, nous étions, vous étiez, ils étaient
 */
export const etreImparfait = {
  infinitive: "être",
  stem: "ét-",
  forms: [
    { pronoun: "je", form: "étais" },
    { pronoun: "tu", form: "étais" },
    { pronoun: "il / elle / on", form: "était" },
    { pronoun: "nous", form: "étions" },
    { pronoun: "vous", form: "étiez" },
    { pronoun: "ils / elles", form: "étaient" }
  ] as EtreImparfaitForm[]
}

// =============================================================================
// COMMON IMPARFAIT VERBS
// =============================================================================

/**
 * CommonImparfaitVerb - Common verb with its imparfait je form.
 */
export interface CommonImparfaitVerb {
  infinitive: string
  je: string
  english: string
}

/**
 * commonImparfaitVerbs - 10 essential verbs in the imparfait.
 *
 * Includes être and avoir (irregular) plus common -er, -ir, -re verbs.
 * Each shows both translations: "was ___ing" and "used to ___"
 */
export const commonImparfaitVerbs: CommonImparfaitVerb[] = [
  { infinitive: "être", je: "j'étais", english: "I was / I used to be" },
  { infinitive: "avoir", je: "j'avais", english: "I had / I used to have" },
  { infinitive: "aller", je: "j'allais", english: "I was going / I used to go" },
  { infinitive: "faire", je: "je faisais", english: "I was doing / I used to do" },
  { infinitive: "parler", je: "je parlais", english: "I was speaking / I used to speak" },
  { infinitive: "manger", je: "je mangeais", english: "I was eating / I used to eat" },
  { infinitive: "jouer", je: "je jouais", english: "I was playing / I used to play" },
  { infinitive: "habiter", je: "j'habitais", english: "I was living / I used to live" },
  { infinitive: "étudier", je: "j'étudiais", english: "I was studying / I used to study" },
  { infinitive: "travailler", je: "je travaillais", english: "I was working / I used to work" }
]

// =============================================================================
// IMPARFAIT VS PASSÉ COMPOSÉ COMPARISON
// =============================================================================

/**
 * TenseComparison - Side-by-side comparison of imparfait and passé composé.
 */
export interface TenseComparison {
  imparfait: string
  passeCompose: string
  imparfaitEnglish: string
  passeComposeEnglish: string
  note: string
}

/**
 * tenseComparisons - Examples showing when to use each tense.
 *
 * Key distinction:
 * - Imparfait: Ongoing, background, habitual, descriptive
 * - Passé composé: Completed events, specific actions
 */
export const tenseComparisons: TenseComparison[] = [
  {
    imparfait: "Je lisais quand il est arrivé.",
    passeCompose: "Il est arrivé.",
    imparfaitEnglish: "I was reading when he arrived.",
    passeComposeEnglish: "He arrived.",
    note: "The ongoing background action uses the imparfait. The completed event uses the passé composé."
  },
  {
    imparfait: "Quand j'étais petit, je jouais dehors.",
    passeCompose: "Hier, j'ai joué au tennis.",
    imparfaitEnglish: "When I was little, I used to play outside.",
    passeComposeEnglish: "Yesterday, I played tennis.",
    note: "Habit in the past uses the imparfait. One completed action uses the passé composé."
  },
  {
    imparfait: "Il faisait beau.",
    passeCompose: "Nous sommes sortis.",
    imparfaitEnglish: "The weather was nice.",
    passeComposeEnglish: "We went out.",
    note: "Description uses the imparfait. Action uses the passé composé."
  }
]

// =============================================================================
// GUIDED EXAMPLES
// =============================================================================

/**
 * GuidedExample - Full sentence demonstrating imparfait usage.
 */
export interface GuidedExample {
  french: string
  english: string
}

/**
 * guidedExamples - Full sentences showing various imparfait uses.
 *
 * Mix of habits, descriptions, background actions, and states.
 */
export const guidedExamples: GuidedExample[] = [
  { french: "Quand j'avais dix ans, j'habitais à Lyon.", english: "When I was ten years old, I used to live in Lyon." },
  { french: "Nous regardions souvent des films le soir.", english: "We used to watch films often in the evening." },
  { french: "Elle était fatiguée et il faisait froid.", english: "She was tired and it was cold." },
  { french: "Je faisais mes devoirs quand mon ami est arrivé.", english: "I was doing my homework when my friend arrived." },
  { french: "Ils allaient à l'école à pied.", english: "They used to go to school on foot." },
  { french: "Vous étudiiez le français tous les jours.", english: "You used to study French every day." }
]

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * CommonMistake - Incorrect vs correct imparfait usage.
 */
export interface CommonMistake {
  wrong: string
  correct: string
  explanation: string
}

/**
 * commonMistakes - Common errors when using the imparfait.
 *
 * Typical mistakes:
 * - Wrong endings (using -ait instead of -ais for je)
 * - Not removing -ons before adding endings
 * - Using passé composé for habits
 * - Wrong tense for weather descriptions
 */
export const commonMistakes: CommonMistake[] = [
  { wrong: "Je parlait avec mes amis.", correct: "Je parlais avec mes amis.", explanation: "With je, use the ending -ais." },
  { wrong: "Nous parlionsons souvent.", correct: "Nous parlions souvent.", explanation: "Do not keep the full present tense ending. Remove -ons before adding imparfait endings." },
  { wrong: "J'étais allé à l'école chaque jour.", correct: "J'allais à l'école chaque jour.", explanation: "A repeated habit in the past usually uses the imparfait, not the passé composé." },
  { wrong: "Il est beau toute la journée.", correct: "Il faisait beau toute la journée.", explanation: "Weather descriptions in the past often use the imparfait." }
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
 * practiceQuestions - 15 questions testing imparfait knowledge.
 *
 * Topic distribution:
 * - usage (4): When to use imparfait vs other tenses
 * - formation (4): Conjugation and endings
 * - etre (3): The irregular verb être
 * - comparison (2): Imparfait vs passé composé
 * - correction (2): Error identification
 */
export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    topic: "usage",
    prompt: "Which tense is usually used for past habits?",
    options: ["imparfait", "passé composé", "near future"],
    correct: 0,
    explanation: "The imparfait is often used for repeated actions or habits in the past."
  },
  {
    id: 2,
    topic: "usage",
    prompt: "Which sentence shows a past description?",
    options: ["Il faisait froid.", "Il a mangé une pomme.", "Il va partir."],
    correct: 0,
    explanation: "Descriptions in the past usually use the imparfait."
  },
  {
    id: 3,
    topic: "usage",
    prompt: 'Which sentence means "I was sleeping when you called"?',
    options: [
      "Je dormais quand tu as appelé.",
      "J'ai dormi quand tu as appelé.",
      "Je vais dormir quand tu appelles."
    ],
    correct: 0,
    explanation: "The background action uses the imparfait."
  },
  {
    id: 4,
    topic: "usage",
    prompt: "Which tense is often used for a completed action in the past?",
    options: ["imparfait", "passé composé", "present tense"],
    correct: 1,
    explanation: "The passé composé often marks a completed event."
  },
  {
    id: 5,
    topic: "formation",
    prompt: "To form the imparfait, you usually start from which present tense form?",
    options: ["je form", "tu form", "nous form"],
    correct: 2,
    explanation: "The usual imparfait stem comes from the nous form."
  },
  {
    id: 6,
    topic: "formation",
    prompt: "Choose the correct imparfait form: Je ___ avec mes amis.",
    options: ["parlais", "parlait", "parlions"],
    correct: 0,
    explanation: "With je, the ending is usually -ais."
  },
  {
    id: 7,
    topic: "formation",
    prompt: "Choose the correct imparfait form: Nous ___ souvent à la plage.",
    options: ["allait", "allions", "allais"],
    correct: 1,
    explanation: "With nous, the ending is -ions."
  },
  {
    id: 8,
    topic: "formation",
    prompt: "Choose the correct imparfait form: Ils ___ au football.",
    options: ["jouaient", "jouait", "jouions"],
    correct: 0,
    explanation: "With ils / elles, the ending is -aient."
  },
  {
    id: 9,
    topic: "etre",
    prompt: "What is the imparfait stem of être?",
    options: ["ét-", "êt-", "somm-"],
    correct: 0,
    explanation: "Être is irregular in the imparfait and uses the stem ét-."
  },
  {
    id: 10,
    topic: "etre",
    prompt: "Choose the correct form: Elle ___ fatiguée.",
    options: ["était", "étais", "étaient"],
    correct: 0,
    explanation: "With elle, the correct imparfait form is était."
  },
  {
    id: 11,
    topic: "etre",
    prompt: "Choose the correct form: Nous ___ contents.",
    options: ["étions", "étaient", "était"],
    correct: 0,
    explanation: "With nous, the correct form is étions."
  },
  {
    id: 12,
    topic: "comparison",
    prompt: "Choose the best sentence for a repeated childhood habit.",
    options: [
      "Quand j'étais enfant, je jouais dehors.",
      "Quand j'étais enfant, j'ai joué dehors.",
      "Quand j'étais enfant, je vais jouer dehors."
    ],
    correct: 0,
    explanation: "Repeated habits in the past usually use the imparfait."
  },
  {
    id: 13,
    topic: "comparison",
    prompt: "Choose the best pair.",
    options: [
      "Je lisais quand il est arrivé.",
      "J'ai lu quand il arrivait.",
      "Je vais lire quand il est arrivé."
    ],
    correct: 0,
    explanation: "The ongoing background action uses the imparfait, and the completed event uses the passé composé."
  },
  {
    id: 14,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Je parlait avec mes amis.",
      "Je parlais avec mes amis.",
      "Je parlions avec mes amis."
    ],
    correct: 1,
    explanation: "With je, the correct ending is -ais."
  },
  {
    id: 15,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Il est beau toute la journée.",
      "Il faisait beau toute la journée.",
      "Il a fait beau toute la journée."
    ],
    correct: 1,
    explanation: "For past weather description, the imparfait is the best choice here."
  }
]

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections in order:
 * 1. intro - Introduction to imparfait
 * 2. uses - Four main uses of imparfait
 * 3. formation - How to form the tense
 * 4. verbs - Common imparfait verbs
 * 5. comparison - Imparfait vs passé composé
 * 6. examples - Guided example sentences
 * 7. mistakes - Common errors
 * 8. practice - Interactive quiz
 */
export const sectionIds = [
  'intro',
  'uses',
  'formation',
  'verbs',
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
      message: "You're using the imparfait well. This tense is very important for describing the past naturally in French.",
      tone: "high",
      color: "green"
    }
  } else if (percentage >= 47) {
    return {
      title: "Nice progress",
      message: "You're starting to understand how the imparfait works. Review the stem and endings once more if you want to feel more confident.",
      tone: "medium",
      color: "blue"
    }
  } else {
    return {
      title: "Good effort",
      message: "The imparfait takes practice, especially when comparing it with the passé composé. You can retake the practice or continue the lesson. A quick review of the endings and uses will help a lot.",
      tone: "low",
      color: "amber"
    }
  }
}
