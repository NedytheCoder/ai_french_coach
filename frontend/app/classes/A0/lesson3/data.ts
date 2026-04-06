export interface Greeting {
  id: string
  french: string
  english: string
  phonetic: string
  audioSrc: string
}

export const greetings: Greeting[] = [
  {
    id: "bonjour",
    french: "Bonjour",
    english: "Hello / Good morning",
    phonetic: "bohn-zhoor",
    audioSrc: "/audio/greetings/bonjour.mp3"
  },
  {
    id: "bonsoir",
    french: "Bonsoir",
    english: "Good evening",
    phonetic: "bohn-swahr",
    audioSrc: "/audio/greetings/bonsoir.mp3"
  },
  {
    id: "salut",
    french: "Salut",
    english: "Hi / Bye (informal)",
    phonetic: "sah-lu",
    audioSrc: "/audio/greetings/salut.mp3"
  },
  {
    id: "coucou",
    french: "Coucou",
    english: "Hey / Hi (very informal)",
    phonetic: "koo-koo",
    audioSrc: "/audio/greetings/coucou.mp3"
  },
  {
    id: "au-revoir",
    french: "Au revoir",
    english: "Goodbye",
    phonetic: "oh ruh-vwahr",
    audioSrc: "/audio/greetings/au-revoir.mp3"
  },
  {
    id: "a-bientot",
    french: "À bientôt",
    english: "See you soon",
    phonetic: "ah byan-toh",
    audioSrc: "/audio/greetings/a-bientot.mp3"
  },
  {
    id: "a-demain",
    french: "À demain",
    english: "See you tomorrow",
    phonetic: "ah duh-man",
    audioSrc: "/audio/greetings/a-demain.mp3"
  },
  {
    id: "a-plus-tard",
    french: "À plus tard",
    english: "See you later",
    phonetic: "ah plu tar",
    audioSrc: "/audio/greetings/a-plus-tard.mp3"
  },
  {
    id: "bonne-nuit",
    french: "Bonne nuit",
    english: "Good night",
    phonetic: "bun nwee",
    audioSrc: "/audio/greetings/bonne-nuit.mp3"
  },
  {
    id: "bonne-journee",
    french: "Bonne journée",
    english: "Have a nice day",
    phonetic: "bun zhoor-nay",
    audioSrc: "/audio/greetings/bonne-journee.mp3"
  },
  {
    id: "bonne-soiree",
    french: "Bonne soirée",
    english: "Have a nice evening",
    phonetic: "bun swah-ray",
    audioSrc: "/audio/greetings/bonne-soiree.mp3"
  },
  {
    id: "comment-ca-va",
    french: "Comment ça va ?",
    english: "How are you?",
    phonetic: "koh-mahn sah vah",
    audioSrc: "/audio/greetings/comment-ca-va.mp3"
  },
  {
    id: "ca-va-bien",
    french: "Ça va bien",
    english: "I'm doing well",
    phonetic: "sah vah byan",
    audioSrc: "/audio/greetings/ca-va-bien.mp3"
  },
  {
    id: "ca-va-mal",
    french: "Ça va mal",
    english: "I'm not doing well",
    phonetic: "sah vah mahl",
    audioSrc: "/audio/greetings/ca-va-mal.mp3"
  },
  {
    id: "enchante",
    french: "Enchanté / Enchantée",
    english: "Nice to meet you",
    phonetic: "ahn-shahn-tay",
    audioSrc: "/audio/greetings/enchante.mp3"
  },
  {
    id: "bienvenue",
    french: "Bienvenue",
    english: "Welcome",
    phonetic: "byan-vuh-new",
    audioSrc: "/audio/greetings/bienvenue.mp3"
  }
]

export interface Section {
  name: string
  start: number
  end: number
}

export const sections: Section[] = [
  { name: "Basic Hellos", start: 0, end: 4 },
  { name: "Farewells", start: 4, end: 11 },
  { name: "Polite Conversation", start: 11, end: 16 }
]
