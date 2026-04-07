export interface VerbExample {
  verb: string
  english: string
}

export const firstGroupVerbs: VerbExample[] = [
  { verb: "parler", english: "to speak" },
  { verb: "aimer", english: "to like / love" },
  { verb: "travailler", english: "to work" },
  { verb: "manger", english: "to eat" },
  { verb: "habiter", english: "to live" }
]

export const secondGroupVerbs: VerbExample[] = [
  { verb: "finir", english: "to finish" },
  { verb: "choisir", english: "to choose" },
  { verb: "réussir", english: "to succeed" },
  { verb: "grandir", english: "to grow" },
  { verb: "remplir", english: "to fill" }
]

export const thirdGroupVerbs: VerbExample[] = [
  { verb: "être", english: "to be" },
  { verb: "avoir", english: "to have" },
  { verb: "aller", english: "to go" },
  { verb: "faire", english: "to do / make" },
  { verb: "prendre", english: "to take" }
]

export interface VerbSummaryItem {
  group: string
  pattern: string
  type: string
  example: string
}

export const verbSummary: VerbSummaryItem[] = [
  {
    group: "1st group",
    pattern: "-er",
    type: "mostly regular",
    example: "parler"
  },
  {
    group: "2nd group",
    pattern: "-ir",
    type: "regular",
    example: "finir"
  },
  {
    group: "3rd group",
    pattern: "varied",
    type: "irregular",
    example: "être"
  }
]

export interface PracticeQuestion {
  id: number
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    prompt: "Which group does \"parler\" belong to?",
    options: ["1st group", "2nd group", "3rd group"],
    correct: 0,
    explanation: "\"Parler\" ends in -er."
  },
  {
    id: 2,
    prompt: "Which group does \"finir\" belong to?",
    options: ["1st group", "2nd group", "3rd group"],
    correct: 1,
    explanation: "\"Finir\" is a regular -ir verb."
  },
  {
    id: 3,
    prompt: "Which group does \"être\" belong to?",
    options: ["1st group", "2nd group", "3rd group"],
    correct: 2,
    explanation: "\"Être\" is irregular."
  },
  {
    id: 4,
    prompt: "Which group does \"manger\" belong to?",
    options: ["1st group", "2nd group", "3rd group"],
    correct: 0,
    explanation: "\"Manger\" ends in -er."
  },
  {
    id: 5,
    prompt: "Is \"parler\" regular or irregular?",
    options: ["Regular", "Irregular"],
    correct: 0,
    explanation: "It follows a standard -er pattern."
  },
  {
    id: 6,
    prompt: "Is \"être\" regular or irregular?",
    options: ["Regular", "Irregular"],
    correct: 1,
    explanation: "Its forms are unique."
  },
  {
    id: 7,
    prompt: "Is \"finir\" regular or irregular?",
    options: ["Regular", "Irregular"],
    correct: 0,
    explanation: "It follows a regular -ir pattern."
  },
  {
    id: 8,
    prompt: "Is \"aller\" regular or irregular?",
    options: ["Regular", "Irregular"],
    correct: 1,
    explanation: "It is irregular."
  },
  {
    id: 9,
    prompt: "Which verb means \"to choose\"?",
    options: ["choisir", "parler", "prendre"],
    correct: 0,
    explanation: "\"Choisir\" means \"to choose\"."
  },
  {
    id: 10,
    prompt: "Which verb means \"to grow\"?",
    options: ["grandir", "avoir", "faire"],
    correct: 0,
    explanation: "\"Grandir\" means \"to grow\"."
  },
  {
    id: 11,
    prompt: "Which verb means \"to take\"?",
    options: ["prendre", "aimer", "manger"],
    correct: 0,
    explanation: "\"Prendre\" means \"to take\"."
  },
  {
    id: 12,
    prompt: "Which verb is from the 3rd group?",
    options: ["être", "parler", "finir"],
    correct: 0,
    explanation: "\"Être\" is irregular."
  }
]

export const sectionIds = [
  'verb-groups-intro',
  'first-group',
  'second-group',
  'third-group',
  'regular-vs-irregular',
  'conjugation-examples',
  'pattern-summary',
  'practice'
] as const

export type SectionId = typeof sectionIds[number]

export interface ConjugationExample {
  group: string
  verb: string
  english: string
  forms: { pronoun: string; form: string }[]
  note?: string
}

export const conjugationExamples: ConjugationExample[] = [
  {
    group: "1st group (-er)",
    verb: "parler",
    english: "to speak",
    note: "Follows the standard -er pattern: drop -er, add endings",
    forms: [
      { pronoun: "je", form: "parle" },
      { pronoun: "tu", form: "parles" },
      { pronoun: "il/elle", form: "parle" },
      { pronoun: "nous", form: "parlons" },
      { pronoun: "vous", form: "parlez" },
      { pronoun: "ils/elles", form: "parlent" }
    ]
  },
  {
    group: "2nd group (-ir)",
    verb: "finir",
    english: "to finish",
    note: "Follows the regular -ir pattern: add -iss- before plural endings",
    forms: [
      { pronoun: "je", form: "finis" },
      { pronoun: "tu", form: "finis" },
      { pronoun: "il/elle", form: "finit" },
      { pronoun: "nous", form: "finissons" },
      { pronoun: "vous", form: "finissez" },
      { pronoun: "ils/elles", form: "finissent" }
    ]
  },
  {
    group: "3rd group (irregular)",
    verb: "être",
    english: "to be",
    note: "Irregular verb — each form is unique and must be memorized",
    forms: [
      { pronoun: "je", form: "suis" },
      { pronoun: "tu", form: "es" },
      { pronoun: "il/elle", form: "est" },
      { pronoun: "nous", form: "sommes" },
      { pronoun: "vous", form: "êtes" },
      { pronoun: "ils/elles", form: "sont" }
    ]
  }
]
