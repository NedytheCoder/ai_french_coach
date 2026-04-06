export interface Noun {
  id: string
  noun: string
  article: string
  full: string
  english: string
  phonetic: string
  audioSrc: string
  example: string
  exampleEnglish: string
  gender?: 'masculine' | 'feminine'
}

export const masculineNouns: Noun[] = [
  {
    id: "livre",
    noun: "livre",
    article: "le",
    full: "le livre",
    english: "book",
    phonetic: "luh leevr",
    audioSrc: "/audio/a1/nouns/livre.mp3",
    example: "Le livre est sur la table.",
    exampleEnglish: "The book is on the table."
  },
  {
    id: "cafe",
    noun: "café",
    article: "le",
    full: "le café",
    english: "coffee",
    phonetic: "luh kah-fay",
    audioSrc: "/audio/a1/nouns/cafe.mp3",
    example: "Le café est chaud.",
    exampleEnglish: "The coffee is hot."
  },
  {
    id: "stylo",
    noun: "stylo",
    article: "le",
    full: "le stylo",
    english: "pen",
    phonetic: "luh stee-lo",
    audioSrc: "/audio/a1/nouns/stylo.mp3",
    example: "Le stylo est bleu.",
    exampleEnglish: "The pen is blue."
  },
  {
    id: "chien",
    noun: "chien",
    article: "le",
    full: "le chien",
    english: "dog",
    phonetic: "luh shyan",
    audioSrc: "/audio/a1/nouns/chien.mp3",
    example: "Le chien dort.",
    exampleEnglish: "The dog is sleeping."
  },
  {
    id: "jardin",
    noun: "jardin",
    article: "le",
    full: "le jardin",
    english: "garden",
    phonetic: "luh zhar-dan",
    audioSrc: "/audio/a1/nouns/jardin.mp3",
    example: "Le jardin est grand.",
    exampleEnglish: "The garden is big."
  }
]

export const feminineNouns: Noun[] = [
  {
    id: "table",
    noun: "table",
    article: "la",
    full: "la table",
    english: "table",
    phonetic: "lah tahbl",
    audioSrc: "/audio/a1/nouns/table.mp3",
    example: "La table est propre.",
    exampleEnglish: "The table is clean."
  },
  {
    id: "maison",
    noun: "maison",
    article: "la",
    full: "la maison",
    english: "house",
    phonetic: "lah meh-zon",
    audioSrc: "/audio/a1/nouns/maison.mp3",
    example: "La maison est grande.",
    exampleEnglish: "The house is big."
  },
  {
    id: "voiture",
    noun: "voiture",
    article: "la",
    full: "la voiture",
    english: "car",
    phonetic: "lah vwah-tewr",
    audioSrc: "/audio/a1/nouns/voiture.mp3",
    example: "La voiture est rouge.",
    exampleEnglish: "The car is red."
  },
  {
    id: "porte",
    noun: "porte",
    article: "la",
    full: "la porte",
    english: "door",
    phonetic: "lah port",
    audioSrc: "/audio/a1/nouns/porte.mp3",
    example: "La porte est ouverte.",
    exampleEnglish: "The door is open."
  },
  {
    id: "chaise",
    noun: "chaise",
    article: "la",
    full: "la chaise",
    english: "chair",
    phonetic: "lah shez",
    audioSrc: "/audio/a1/nouns/chaise.mp3",
    example: "La chaise est noire.",
    exampleEnglish: "The chair is black."
  }
]

export const vowelOrSilentHNouns: Noun[] = [
  {
    id: "ecole",
    noun: "école",
    article: "l'",
    full: "l'école",
    english: "school",
    phonetic: "lay-kol",
    audioSrc: "/audio/a1/nouns/ecole.mp3",
    example: "L'école est ouverte.",
    exampleEnglish: "The school is open.",
    gender: "feminine"
  },
  {
    id: "ami",
    noun: "ami",
    article: "l'",
    full: "l'ami",
    english: "friend",
    phonetic: "lah-mee",
    audioSrc: "/audio/a1/nouns/ami.mp3",
    example: "L'ami arrive.",
    exampleEnglish: "The friend arrives.",
    gender: "masculine"
  },
  {
    id: "hotel",
    noun: "hôtel",
    article: "l'",
    full: "l'hôtel",
    english: "hotel",
    phonetic: "loh-tel",
    audioSrc: "/audio/a1/nouns/hotel.mp3",
    example: "L'hôtel est calme.",
    exampleEnglish: "The hotel is quiet.",
    gender: "masculine"
  },
  {
    id: "hopital",
    noun: "hôpital",
    article: "l'",
    full: "l'hôpital",
    english: "hospital",
    phonetic: "loh-pee-tal",
    audioSrc: "/audio/a1/nouns/hopital.mp3",
    example: "L'hôpital est ici.",
    exampleEnglish: "The hospital is here.",
    gender: "masculine"
  },
  {
    id: "orange",
    noun: "orange",
    article: "l'",
    full: "l'orange",
    english: "orange",
    phonetic: "loh-rahnzh",
    audioSrc: "/audio/a1/nouns/orange.mp3",
    example: "L'orange est sucrée.",
    exampleEnglish: "The orange is sweet.",
    gender: "feminine"
  }
]

export interface ArticleRule {
  article: string
  usage: string
  example: string
  exampleEnglish: string
  color: string
}

export const articleRules: ArticleRule[] = [
  {
    article: "le",
    usage: "masculine nouns",
    example: "le livre",
    exampleEnglish: "the book",
    color: "blue"
  },
  {
    article: "la",
    usage: "feminine nouns",
    example: "la table",
    exampleEnglish: "the table",
    color: "pink"
  },
  {
    article: "l'",
    usage: "nouns starting with a vowel or silent h",
    example: "l'école",
    exampleEnglish: "the school",
    color: "purple"
  }
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
    topic: "masculine",
    prompt: "Choose the correct article: ___ livre",
    options: ["le", "la", "l'"],
    correct: 0,
    explanation: "Livre is masculine, so use le."
  },
  {
    id: 2,
    type: "multiple-choice",
    topic: "masculine",
    prompt: "Choose the correct article: ___ chien",
    options: ["la", "le", "l'"],
    correct: 1,
    explanation: "Chien is masculine, so use le."
  },
  {
    id: 3,
    type: "multiple-choice",
    topic: "masculine",
    prompt: "What does le jardin mean?",
    options: ["the chair", "the garden", "the school"],
    correct: 1,
    explanation: "Le jardin means the garden."
  },
  {
    id: 4,
    type: "multiple-choice",
    topic: "feminine",
    prompt: "Choose the correct article: ___ maison",
    options: ["la", "le", "l'"],
    correct: 0,
    explanation: "Maison is feminine, so use la."
  },
  {
    id: 5,
    type: "multiple-choice",
    topic: "feminine",
    prompt: "Choose the correct article: ___ chaise",
    options: ["le", "la", "l'"],
    correct: 1,
    explanation: "Chaise is feminine, so use la."
  },
  {
    id: 6,
    type: "multiple-choice",
    topic: "feminine",
    prompt: "What does la voiture mean?",
    options: ["the table", "the car", "the house"],
    correct: 1,
    explanation: "La voiture means the car."
  },
  {
    id: 7,
    type: "multiple-choice",
    topic: "vowel",
    prompt: "Choose the correct article: ___ école",
    options: ["la", "le", "l'"],
    correct: 2,
    explanation: "Use l' before a vowel."
  },
  {
    id: 8,
    type: "multiple-choice",
    topic: "vowel",
    prompt: "Choose the correct article: ___ hôtel",
    options: ["l'", "le", "la"],
    correct: 0,
    explanation: "Use l' before a silent h."
  },
  {
    id: 9,
    type: "multiple-choice",
    topic: "mixed",
    prompt: "Which one is correct?",
    options: ["le voiture", "la voiture", "l'voiture"],
    correct: 1,
    explanation: "Voiture is feminine, so the correct form is la voiture."
  },
  {
    id: 10,
    type: "multiple-choice",
    topic: "mixed",
    prompt: "Which one is correct?",
    options: ["l'école", "la école", "le école"],
    correct: 0,
    explanation: "Before a vowel, use l'."
  }
]
