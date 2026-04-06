export interface Verb {
  id: string
  infinitive: string
  english: string
  phonetic: string
  audioSrc: string
  example: string
  exampleEnglish: string
  importance: 'high' | 'normal'
}

export const verbs: Verb[] = [
  {
    id: "etre",
    infinitive: "être",
    english: "to be",
    phonetic: "eh-truh",
    audioSrc: "/audio/a1/verbs/etre.mp3",
    example: "Je suis étudiant.",
    exampleEnglish: "I am a student.",
    importance: "high"
  },
  {
    id: "avoir",
    infinitive: "avoir",
    english: "to have",
    phonetic: "ah-vwahr",
    audioSrc: "/audio/a1/verbs/avoir.mp3",
    example: "J'ai un livre.",
    exampleEnglish: "I have a book.",
    importance: "high"
  },
  {
    id: "aller",
    infinitive: "aller",
    english: "to go",
    phonetic: "ah-lay",
    audioSrc: "/audio/a1/verbs/aller.mp3",
    example: "Nous allons au marché.",
    exampleEnglish: "We are going to the market.",
    importance: "high"
  },
  {
    id: "parler",
    infinitive: "parler",
    english: "to speak",
    phonetic: "par-lay",
    audioSrc: "/audio/a1/verbs/parler.mp3",
    example: "Tu parles français.",
    exampleEnglish: "You speak French.",
    importance: "normal"
  },
  {
    id: "aimer",
    infinitive: "aimer",
    english: "to like / to love",
    phonetic: "eh-may",
    audioSrc: "/audio/a1/verbs/aimer.mp3",
    example: "Elle aime la musique.",
    exampleEnglish: "She likes music.",
    importance: "normal"
  },
  {
    id: "habiter",
    infinitive: "habiter",
    english: "to live",
    phonetic: "ah-bee-tay",
    audioSrc: "/audio/a1/verbs/habiter.mp3",
    example: "J'habite à Paris.",
    exampleEnglish: "I live in Paris.",
    importance: "normal"
  },
  {
    id: "manger",
    infinitive: "manger",
    english: "to eat",
    phonetic: "mahn-zhay",
    audioSrc: "/audio/a1/verbs/manger.mp3",
    example: "Nous mangeons à midi.",
    exampleEnglish: "We eat at noon.",
    importance: "normal"
  },
  {
    id: "travailler",
    infinitive: "travailler",
    english: "to work",
    phonetic: "trah-vai-yay",
    audioSrc: "/audio/a1/verbs/travailler.mp3",
    example: "Ils travaillent ici.",
    exampleEnglish: "They work here.",
    importance: "normal"
  },
  {
    id: "etudier",
    infinitive: "étudier",
    english: "to study",
    phonetic: "ay-tew-dee-ay",
    audioSrc: "/audio/a1/verbs/etudier.mp3",
    example: "Vous étudiez le français.",
    exampleEnglish: "You study French.",
    importance: "normal"
  },
  {
    id: "faire",
    infinitive: "faire",
    english: "to do / to make",
    phonetic: "fehr",
    audioSrc: "/audio/a1/verbs/faire.mp3",
    example: "Je fais mes devoirs.",
    exampleEnglish: "I do my homework.",
    importance: "normal"
  }
]

export interface Conjugation {
  verb: string
  english: string
  forms: {
    je: string
    tu: string
    ilElleOn: string
    nous: string
    vous: string
    ilsElles: string
  }
}

export const conjugations: Conjugation[] = [
  {
    verb: "être",
    english: "to be",
    forms: {
      je: "suis",
      tu: "es",
      ilElleOn: "est",
      nous: "sommes",
      vous: "êtes",
      ilsElles: "sont"
    }
  },
  {
    verb: "avoir",
    english: "to have",
    forms: {
      je: "ai",
      tu: "as",
      ilElleOn: "a",
      nous: "avons",
      vous: "avez",
      ilsElles: "ont"
    }
  },
  {
    verb: "aller",
    english: "to go",
    forms: {
      je: "vais",
      tu: "vas",
      ilElleOn: "va",
      nous: "allons",
      vous: "allez",
      ilsElles: "vont"
    }
  },
  {
    verb: "parler",
    english: "to speak",
    forms: {
      je: "parle",
      tu: "parles",
      ilElleOn: "parle",
      nous: "parlons",
      vous: "parlez",
      ilsElles: "parlent"
    }
  },
  {
    verb: "aimer",
    english: "to like / love",
    forms: {
      je: "aime",
      tu: "aimes",
      ilElleOn: "aime",
      nous: "aimons",
      vous: "aimez",
      ilsElles: "aiment"
    }
  },
  {
    verb: "habiter",
    english: "to live",
    forms: {
      je: "habite",
      tu: "habites",
      ilElleOn: "habite",
      nous: "habitons",
      vous: "habitez",
      ilsElles: "habitent"
    }
  },
  {
    verb: "manger",
    english: "to eat",
    forms: {
      je: "mange",
      tu: "manges",
      ilElleOn: "mange",
      nous: "mangeons",
      vous: "mangez",
      ilsElles: "mangent"
    }
  },
  {
    verb: "travailler",
    english: "to work",
    forms: {
      je: "travaille",
      tu: "travailles",
      ilElleOn: "travaille",
      nous: "travaillons",
      vous: "travaillez",
      ilsElles: "travaillent"
    }
  },
  {
    verb: "étudier",
    english: "to study",
    forms: {
      je: "étudie",
      tu: "étudies",
      ilElleOn: "étudie",
      nous: "étudions",
      vous: "étudiez",
      ilsElles: "étudient"
    }
  },
  {
    verb: "faire",
    english: "to do / make",
    forms: {
      je: "fais",
      tu: "fais",
      ilElleOn: "fait",
      nous: "faisons",
      vous: "faites",
      ilsElles: "font"
    }
  }
]

export interface SubjectPronoun {
  french: string
  english: string
}

export const subjectPronouns: SubjectPronoun[] = [
  { french: "je", english: "I" },
  { french: "tu", english: "you (informal singular)" },
  { french: "il / elle / on", english: "he / she / one" },
  { french: "nous", english: "we" },
  { french: "vous", english: "you (formal/plural)" },
  { french: "ils / elles", english: "they" }
]

export interface PracticeQuestion {
  id: number
  type: string
  topic: string
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    topic: "meaning",
    prompt: 'What does "avoir" mean?',
    options: ["to be", "to have", "to go"],
    correct: 1,
    explanation: '"Avoir" means "to have".'
  },
  {
    id: 2,
    type: "multiple-choice",
    topic: "meaning",
    prompt: 'What does "faire" mean?',
    options: ["to do / to make", "to eat", "to study"],
    correct: 0,
    explanation: '"Faire" means "to do" or "to make".'
  },
  {
    id: 3,
    type: "multiple-choice",
    topic: "meaning",
    prompt: 'Which verb means "to go"?',
    options: ["aller", "aimer", "habiter"],
    correct: 0,
    explanation: '"Aller" means "to go".'
  },
  {
    id: 4,
    type: "multiple-choice",
    topic: "meaning",
    prompt: 'Which verb means "to speak"?',
    options: ["parler", "manger", "être"],
    correct: 0,
    explanation: '"Parler" means "to speak".'
  },
  {
    id: 5,
    type: "multiple-choice",
    topic: "conjugation",
    prompt: "Choose the correct form: Je ___ français.",
    options: ["parle", "parles", "parlons"],
    correct: 0,
    explanation: 'With "je", the correct form is "parle".'
  },
  {
    id: 6,
    type: "multiple-choice",
    topic: "conjugation",
    prompt: "Choose the correct form: Nous ___ à Paris.",
    options: ["habite", "habitons", "habitez"],
    correct: 1,
    explanation: 'With "nous", the correct form is "habitons".'
  },
  {
    id: 7,
    type: "multiple-choice",
    topic: "conjugation",
    prompt: "Choose the correct form: Ils ___ leurs devoirs.",
    options: ["fait", "font", "faites"],
    correct: 1,
    explanation: 'With "ils", the correct form is "font".'
  },
  {
    id: 8,
    type: "multiple-choice",
    topic: "conjugation",
    prompt: "Choose the correct form: Tu ___ un chien.",
    options: ["as", "a", "avez"],
    correct: 0,
    explanation: 'With "tu", the correct form is "as".'
  },
  {
    id: 9,
    type: "multiple-choice",
    topic: "patterns",
    prompt: "Which verb is a regular -er verb?",
    options: ["parler", "être", "avoir"],
    correct: 0,
    explanation: '"Parler" is a regular -er verb.'
  },
  {
    id: 10,
    type: "multiple-choice",
    topic: "patterns",
    prompt: 'Which verb has a special nous form "mangeons"?',
    options: ["manger", "aller", "faire"],
    correct: 0,
    explanation: '"Manger" keeps the soft g sound in "nous mangeons".'
  },
  {
    id: 11,
    type: "multiple-choice",
    topic: "core-verbs",
    prompt: "Why are être, avoir, and aller especially important?",
    options: [
      "They are rare and formal only",
      "They are used very often, even in later levels",
      "They are only used in writing"
    ],
    correct: 1,
    explanation: "These verbs are extremely common and remain important at every stage of learning French."
  },
  {
    id: 12,
    type: "multiple-choice",
    topic: "core-verbs",
    prompt: "Which group contains the three especially important verbs from this lesson?",
    options: [
      "parler, aimer, manger",
      "être, avoir, aller",
      "habiter, étudier, travailler"
    ],
    correct: 1,
    explanation: "The three especially important verbs are être, avoir, and aller."
  }
]
