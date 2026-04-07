export interface SentencePartExample {
  id: number
  sentence: string
  subject: string
  verb: string
  complement: string
  english: string
}

export const sentencePartsExamples: SentencePartExample[] = [
  {
    id: 1,
    sentence: "Je parle français.",
    subject: "Je",
    verb: "parle",
    complement: "français",
    english: "I speak French."
  },
  {
    id: 2,
    sentence: "Elle habite à Lyon.",
    subject: "Elle",
    verb: "habite",
    complement: "à Lyon",
    english: "She lives in Lyon."
  },
  {
    id: 3,
    sentence: "Nous mangeons au restaurant.",
    subject: "Nous",
    verb: "mangeons",
    complement: "au restaurant",
    english: "We eat at the restaurant."
  },
  {
    id: 4,
    sentence: "Ils aiment la musique.",
    subject: "Ils",
    verb: "aiment",
    complement: "la musique",
    english: "They like music."
  }
]

export interface AffirmativeExample {
  id: number
  french: string
  english: string
}

export const affirmativeExamples: AffirmativeExample[] = [
  {
    id: 1,
    french: "Je suis étudiant.",
    english: "I am a student."
  },
  {
    id: 2,
    french: "Tu as un livre.",
    english: "You have a book."
  },
  {
    id: 3,
    french: "Elle aime le chocolat.",
    english: "She likes chocolate."
  },
  {
    id: 4,
    french: "Nous allons à l'école.",
    english: "We are going to school."
  },
  {
    id: 5,
    french: "Vous parlez anglais.",
    english: "You speak English."
  },
  {
    id: 6,
    french: "Ils travaillent ici.",
    english: "They work here."
  }
]

export interface AdjectivePlacementExample {
  id: number
  french: string
  english: string
  note: string
}

export const adjectivePlacementExamples: AdjectivePlacementExample[] = [
  {
    id: 1,
    french: "une voiture rouge",
    english: "a red car",
    note: "The adjective comes after the noun."
  },
  {
    id: 2,
    french: "un livre intéressant",
    english: "an interesting book",
    note: "The adjective comes after the noun."
  },
  {
    id: 3,
    french: "un petit chat",
    english: "a small cat",
    note: "Some common adjectives can come before the noun."
  },
  {
    id: 4,
    french: "une grande maison",
    english: "a big house",
    note: "Some common adjectives can come before the noun."
  }
]

export interface NegativeExample {
  id: number
  affirmative: string
  negative: string
  english: string
}

export const negativeExamples: NegativeExample[] = [
  {
    id: 1,
    affirmative: "Je parle français.",
    negative: "Je ne parle pas français.",
    english: "I do not speak French."
  },
  {
    id: 2,
    affirmative: "Elle aime le café.",
    negative: "Elle n'aime pas le café.",
    english: "She does not like coffee."
  },
  {
    id: 3,
    affirmative: "Nous avons un chien.",
    negative: "Nous n'avons pas de chien.",
    english: "We do not have a dog."
  },
  {
    id: 4,
    affirmative: "Ils habitent ici.",
    negative: "Ils n'habitent pas ici.",
    english: "They do not live here."
  }
]

export interface QuestionExample {
  id: number
  type: 'intonation' | 'est-ce-que'
  french: string
  english: string
}

export const questionExamples: QuestionExample[] = [
  {
    id: 1,
    type: "intonation",
    french: "Tu aimes le chocolat ?",
    english: "Do you like chocolate?"
  },
  {
    id: 2,
    type: "intonation",
    french: "Vous habitez ici ?",
    english: "Do you live here?"
  },
  {
    id: 3,
    type: "est-ce-que",
    french: "Est-ce que tu parles anglais ?",
    english: "Do you speak English?"
  },
  {
    id: 4,
    type: "est-ce-que",
    french: "Est-ce qu'elle travaille aujourd'hui ?",
    english: "Does she work today?"
  }
]

export interface CommonMistake {
  id: number
  wrong: string
  correct: string
  explanation: string
}

export const commonMistakes: CommonMistake[] = [
  {
    id: 1,
    wrong: "Je français parle.",
    correct: "Je parle français.",
    explanation: "In simple French, the verb usually comes after the subject."
  },
  {
    id: 2,
    wrong: "Elle pas aime le café.",
    correct: "Elle n'aime pas le café.",
    explanation: "Negation wraps around the verb: ne + verb + pas."
  },
  {
    id: 3,
    wrong: "Parles tu français ?",
    correct: "Tu parles français ?",
    explanation: "At A1 level, use intonation or est-ce que for simple questions."
  },
  {
    id: 4,
    wrong: "Une rouge voiture",
    correct: "Une voiture rouge",
    explanation: "Many adjectives come after the noun in French."
  }
]

export interface SentencePattern {
  id: number
  label: string
  pattern: string
  example: string
}

export const sentencePatterns: SentencePattern[] = [
  {
    id: 1,
    label: "Basic statement",
    pattern: "Subject + Verb + Complement",
    example: "Je parle français."
  },
  {
    id: 2,
    label: "Negative sentence",
    pattern: "Subject + ne/n' + Verb + pas + Complement",
    example: "Je ne parle pas français."
  },
  {
    id: 3,
    label: "Simple question (intonation)",
    pattern: "Statement + ?",
    example: "Tu parles français ?"
  },
  {
    id: 4,
    label: "Simple question (est-ce que)",
    pattern: "Est-ce que + Subject + Verb + Complement ?",
    example: "Est-ce que tu parles français ?"
  }
]

export interface PracticeQuestion {
  id: number
  type: 'multiple-choice'
  topic: 'sentence-order' | 'affirmative' | 'negative' | 'questions' | 'correction'
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    topic: "sentence-order",
    prompt: "Choose the correct sentence order.",
    options: [
      "Je parle français.",
      "Je français parle.",
      "Parle je français."
    ],
    correct: 0,
    explanation: "The correct beginner structure is Subject + Verb + Complement."
  },
  {
    id: 2,
    type: "multiple-choice",
    topic: "sentence-order",
    prompt: "Choose the correct sentence.",
    options: [
      "Elle aime la musique.",
      "Elle la musique aime.",
      "Aime elle la musique."
    ],
    correct: 0,
    explanation: "The verb usually comes after the subject in simple French sentences."
  },
  {
    id: 3,
    type: "multiple-choice",
    topic: "sentence-order",
    prompt: "Which sentence follows the basic French pattern?",
    options: [
      "Nous mangeons au restaurant.",
      "Nous au restaurant mangeons.",
      "Mangeons nous au restaurant."
    ],
    correct: 0,
    explanation: "The basic pattern is Subject + Verb + Complement."
  },
  {
    id: 4,
    type: "multiple-choice",
    topic: "sentence-order",
    prompt: "Choose the correctly ordered sentence.",
    options: [
      "Ils travaillent ici.",
      "Ils ici travaillent.",
      "Travaillent ils ici."
    ],
    correct: 0,
    explanation: "Simple affirmative sentences usually follow Subject + Verb + Complement."
  },
  {
    id: 5,
    type: "multiple-choice",
    topic: "affirmative",
    prompt: "What does 'Vous parlez anglais.' mean?",
    options: [
      "You speak English.",
      "Do you speak English?",
      "You do not speak English."
    ],
    correct: 0,
    explanation: "This is a simple affirmative sentence."
  },
  {
    id: 6,
    type: "multiple-choice",
    topic: "affirmative",
    prompt: "Which sentence is affirmative?",
    options: [
      "Je ne parle pas français.",
      "Tu aimes le chocolat ?",
      "Je parle français."
    ],
    correct: 2,
    explanation: "An affirmative sentence states something directly."
  },
  {
    id: 7,
    type: "multiple-choice",
    topic: "affirmative",
    prompt: "Choose the best translation of 'Elle aime le café.'",
    options: [
      "She likes coffee.",
      "She does not like coffee.",
      "Does she like coffee?"
    ],
    correct: 0,
    explanation: "This is a positive statement."
  },
  {
    id: 8,
    type: "multiple-choice",
    topic: "negative",
    prompt: "Choose the correct negative sentence.",
    options: [
      "Je ne parle pas français.",
      "Je pas parle français.",
      "Je ne français parle pas."
    ],
    correct: 0,
    explanation: "The negative pattern is ne + verb + pas."
  },
  {
    id: 9,
    type: "multiple-choice",
    topic: "negative",
    prompt: "Choose the correct negative form of 'Elle aime le café.'",
    options: [
      "Elle ne aime pas le café.",
      "Elle n'aime pas le café.",
      "Elle aime pas le café."
    ],
    correct: 1,
    explanation: "Use n' before a vowel and place pas after the verb."
  },
  {
    id: 10,
    type: "multiple-choice",
    topic: "negative",
    prompt: "Which sentence means 'We do not have a dog'?",
    options: [
      "Nous avons un chien.",
      "Nous n'avons pas de chien.",
      "Nous ne avons pas un chien."
    ],
    correct: 1,
    explanation: "The correct beginner negative form is 'Nous n'avons pas de chien.'"
  },
  {
    id: 11,
    type: "multiple-choice",
    topic: "questions",
    prompt: "Which is a correct simple question using intonation?",
    options: [
      "Tu parles français ?",
      "Tu français parles ?",
      "Parles tu français."
    ],
    correct: 0,
    explanation: "At A1 level, intonation questions are simple and correct."
  },
  {
    id: 12,
    type: "multiple-choice",
    topic: "questions",
    prompt: "Which is a correct question using est-ce que?",
    options: [
      "Est-ce que tu habites ici ?",
      "Est-ce que habites tu ici ?",
      "Tu est-ce que habites ici ?"
    ],
    correct: 0,
    explanation: "Use est-ce que + subject + verb + complement."
  },
  {
    id: 13,
    type: "multiple-choice",
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Une rouge voiture",
      "Une voiture rouge",
      "Rouge une voiture"
    ],
    correct: 1,
    explanation: "Many adjectives come after the noun in French."
  },
  {
    id: 14,
    type: "multiple-choice",
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Elle pas aime le café.",
      "Elle n'aime pas le café.",
      "Pas elle aime le café."
    ],
    correct: 1,
    explanation: "Negation wraps around the verb."
  }
]

export const sectionIds = [
  'what-is-sentence',
  'basic-order',
  'sentence-parts',
  'affirmative',
  'adjectives',
  'negatives',
  'questions',
  'mistakes',
  'patterns',
  'practice'
] as const

export type SectionId = typeof sectionIds[number]
