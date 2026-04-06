export interface Pronoun {
  id: string
  french: string
  english: string
  example: string
  exampleEnglish: string
  audioSrc: string
  phonetic: string
}

export const pronouns: Pronoun[] = [
  { id: "je", french: "je", english: "I", example: "Je parle français.", exampleEnglish: "I speak French.", audioSrc: "/audio/a1/pronouns/je.mp3", phonetic: "zhuh" },
  { id: "tu", french: "tu", english: "you (informal singular)", example: "Tu habites ici.", exampleEnglish: "You live here.", audioSrc: "/audio/a1/pronouns/tu.mp3", phonetic: "tew" },
  { id: "il", french: "il", english: "he / it", example: "Il est étudiant.", exampleEnglish: "He is a student.", audioSrc: "/audio/a1/pronouns/il.mp3", phonetic: "eel" },
  { id: "elle", french: "elle", english: "she / it", example: "Elle est contente.", exampleEnglish: "She is happy.", audioSrc: "/audio/a1/pronouns/elle.mp3", phonetic: "ell" },
  { id: "nous", french: "nous", english: "we", example: "Nous aimons apprendre.", exampleEnglish: "We like learning.", audioSrc: "/audio/a1/pronouns/nous.mp3", phonetic: "noo" },
  { id: "vous", french: "vous", english: "you (formal or plural)", example: "Vous parlez anglais.", exampleEnglish: "You speak English.", audioSrc: "/audio/a1/pronouns/vous.mp3", phonetic: "voo" },
  { id: "ils", french: "ils", english: "they (masculine/mixed)", example: "Ils sont prêts.", exampleEnglish: "They are ready.", audioSrc: "/audio/a1/pronouns/ils.mp3", phonetic: "eel" },
  { id: "elles", french: "elles", english: "they (feminine)", example: "Elles sont ici.", exampleEnglish: "They are here.", audioSrc: "/audio/a1/pronouns/elles.mp3", phonetic: "ell" }
]

export interface DefiniteArticle {
  id: string
  article: string
  usage: string
  example: string
  english: string
  audioSrc: string
  phonetic: string
}

export const definiteArticles: DefiniteArticle[] = [
  { id: "le", article: "le", usage: "masculine singular", example: "le livre", english: "the book", audioSrc: "/audio/a1/articles/le.mp3", phonetic: "luh" },
  { id: "la", article: "la", usage: "feminine singular", example: "la table", english: "the table", audioSrc: "/audio/a1/articles/la.mp3", phonetic: "lah" },
  { id: "l-apostrophe", article: "l'", usage: "before vowel or silent h", example: "l'école", english: "the school", audioSrc: "/audio/a1/articles/l-apostrophe.mp3", phonetic: "l" },
  { id: "les", article: "les", usage: "plural", example: "les amis", english: "the friends", audioSrc: "/audio/a1/articles/les.mp3", phonetic: "lay" }
]

export interface IndefiniteArticle {
  id: string
  article: string
  usage: string
  example: string
  english: string
  audioSrc: string
  phonetic: string
}

export const indefiniteArticles: IndefiniteArticle[] = [
  { id: "un", article: "un", usage: "masculine singular", example: "un café", english: "a coffee", audioSrc: "/audio/a1/articles/un.mp3", phonetic: "uh(n)" },
  { id: "une", article: "une", usage: "feminine singular", example: "une voiture", english: "a car", audioSrc: "/audio/a1/articles/une.mp3", phonetic: "ewn" },
  { id: "des", article: "des", usage: "plural", example: "des livres", english: "some books", audioSrc: "/audio/a1/articles/des.mp3", phonetic: "day" }
]

export interface ComparisonExample {
  definite: string
  indefinite: string
  definiteEnglish: string
  indefiniteEnglish: string
  noun: string
}

export const comparisonExamples: ComparisonExample[] = [
  { definite: "le livre", indefinite: "un livre", definiteEnglish: "the book", indefiniteEnglish: "a book", noun: "livre" },
  { definite: "la table", indefinite: "une table", definiteEnglish: "the table", indefiniteEnglish: "a table", noun: "table" },
  { definite: "les livres", indefinite: "des livres", definiteEnglish: "the books", indefiniteEnglish: "some books", noun: "livres" }
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
    topic: "pronouns",
    prompt: "Choose the correct French pronoun for \"I\".",
    options: ["tu", "je", "nous"],
    correct: 1,
    explanation: "\"Je\" means \"I\"."
  },
  {
    id: 2,
    type: "multiple-choice",
    topic: "pronouns",
    prompt: "Choose the correct French pronoun for \"they\" (feminine).",
    options: ["elles", "ils", "vous"],
    correct: 0,
    explanation: "\"Elles\" is used for a feminine group."
  },
  {
    id: 3,
    type: "multiple-choice",
    topic: "definite",
    prompt: "Choose the correct article: ___ livre",
    options: ["le", "la", "une"],
    correct: 0,
    explanation: "\"Livre\" is masculine singular, so use \"le\"."
  },
  {
    id: 4,
    type: "multiple-choice",
    topic: "definite",
    prompt: "Choose the correct article: ___ table",
    options: ["la", "le", "un"],
    correct: 0,
    explanation: "\"Table\" is feminine singular, so use \"la\"."
  },
  {
    id: 5,
    type: "multiple-choice",
    topic: "definite",
    prompt: "Choose the correct article: ___ école",
    options: ["le", "l'", "les"],
    correct: 1,
    explanation: "Use \"l'\" before a vowel."
  },
  {
    id: 6,
    type: "multiple-choice",
    topic: "indefinite",
    prompt: "Choose the correct article: ___ café",
    options: ["une", "un", "des"],
    correct: 1,
    explanation: "\"Café\" is masculine singular, so use \"un\"."
  },
  {
    id: 7,
    type: "multiple-choice",
    topic: "indefinite",
    prompt: "Choose the correct article: ___ voiture",
    options: ["une", "un", "les"],
    correct: 0,
    explanation: "\"Voiture\" is feminine singular, so use \"une\"."
  },
  {
    id: 8,
    type: "multiple-choice",
    topic: "indefinite",
    prompt: "Choose the correct article: ___ livres",
    options: ["des", "un", "la"],
    correct: 0,
    explanation: "\"Livres\" is plural, so use \"des\"."
  }
]
