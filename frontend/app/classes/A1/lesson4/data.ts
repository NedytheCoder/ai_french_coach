export const prepositions = [
  { prep: "à", english: "to / at", example: "Je vais à Paris.", phonetic: "ah", audioSrc: "/audio/a1/prepositions/a.mp3" },
  { prep: "de", english: "from / of", example: "Je viens de France.", phonetic: "duh", audioSrc: "/audio/a1/prepositions/de.mp3" },
  { prep: "dans", english: "in (inside)", example: "Le chat est dans la maison.", phonetic: "dahn", audioSrc: "/audio/a1/prepositions/dans.mp3" },
  { prep: "sur", english: "on", example: "Le livre est sur la table.", phonetic: "soor", audioSrc: "/audio/a1/prepositions/sur.mp3" },
  { prep: "sous", english: "under", example: "Le sac est sous la table.", phonetic: "soo", audioSrc: "/audio/a1/prepositions/sous.mp3" },
  { prep: "avec", english: "with", example: "Je parle avec Marie.", phonetic: "ah-vek", audioSrc: "/audio/a1/prepositions/avec.mp3" },
  { prep: "pour", english: "for", example: "C’est pour toi.", phonetic: "poor", audioSrc: "/audio/a1/prepositions/pour.mp3" },
  { prep: "en", english: "in / by", example: "Je vais en France.", phonetic: "ahn", audioSrc: "/audio/a1/prepositions/en.mp3" }
]

export const verbPrepositionPatterns = [
  {
    verb: "parler à",
    english: "to speak to",
    example: "Je parle à mon ami."
  },
  {
    verb: "parler de",
    english: "to talk about",
    example: "Nous parlons de musique."
  },
  {
    verb: "aller à",
    english: "to go to",
    example: "Je vais à l’école."
  },
  {
    verb: "venir de",
    english: "to come from",
    example: "Elle vient de France."
  },
  {
    verb: "penser à",
    english: "to think about",
    example: "Je pense à toi."
  },
  {
    verb: "avoir besoin de",
    english: "to need",
    example: "J’ai besoin de temps."
  },
  {
    verb: "jouer à",
    english: "to play (a game)",
    example: "Il joue au football."
  },
  {
    verb: "jouer de",
    english: "to play (an instrument)",
    example: "Elle joue du piano."
  }
]

export type GuidedExample = {
  id: string
  french: string
  english: string
  focus: string
  audioSrc: string
}

export const guidedExamples: GuidedExample[] = [
  {
    id: "ex-1",
    french: "Je vais au marché.",
    english: "I’m going to the market.",
    focus: "à + le → au (movement)",
    audioSrc: "/audio/a1/prepositions/examples/je-vais-au-marche.mp3"
  },
  {
    id: "ex-2",
    french: "Le livre est sur la table.",
    english: "The book is on the table.",
    focus: "sur (location)",
    audioSrc: "/audio/a1/prepositions/examples/le-livre-est-sur-la-table.mp3"
  },
  {
    id: "ex-3",
    french: "Le chat est dans la maison.",
    english: "The cat is in the house (inside).",
    focus: "dans (inside)",
    audioSrc: "/audio/a1/prepositions/examples/le-chat-est-dans-la-maison.mp3"
  },
  {
    id: "ex-4",
    french: "Elle vient de France.",
    english: "She comes from France.",
    focus: "venir de (origin)",
    audioSrc: "/audio/a1/prepositions/examples/elle-vient-de-france.mp3"
  },
  {
    id: "ex-5",
    french: "Nous parlons de musique.",
    english: "We talk about music.",
    focus: "parler de (topic)",
    audioSrc: "/audio/a1/prepositions/examples/nous-parlons-de-musique.mp3"
  },
  {
    id: "ex-6",
    french: "Je parle à mon ami.",
    english: "I speak to my friend.",
    focus: "parler à (person)",
    audioSrc: "/audio/a1/prepositions/examples/je-parle-a-mon-ami.mp3"
  },
  {
    id: "ex-7",
    french: "Elle joue du piano.",
    english: "She plays the piano.",
    focus: "de + le → du (instrument)",
    audioSrc: "/audio/a1/prepositions/examples/elle-joue-du-piano.mp3"
  },
  {
    id: "ex-8",
    french: "Je vais en France avec Marie.",
    english: "I’m going to France with Marie.",
    focus: "en + country, avec (relation)",
    audioSrc: "/audio/a1/prepositions/examples/je-vais-en-france-avec-marie.mp3"
  }
]

export type PracticeTopic = "meaning" | "completion" | "verb-pattern" | "contraction"

export type PracticeQuestion = {
  id: number
  topic: PracticeTopic
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export const practiceQuestions: PracticeQuestion[] = [
  // 5 meaning questions
  {
    id: 1,
    topic: "meaning",
    prompt: "What does “sous” usually mean?",
    options: ["on", "under", "with", "from"],
    correct: 1,
    explanation: "“Sous” means “under”. Example: Le sac est sous la table."
  },
  {
    id: 2,
    topic: "meaning",
    prompt: "What does “avec” usually mean?",
    options: ["with", "in (inside)", "to / at", "of"],
    correct: 0,
    explanation: "“Avec” means “with”. Example: Je parle avec Marie."
  },
  {
    id: 3,
    topic: "meaning",
    prompt: "What does “de” usually mean?",
    options: ["to", "from / of", "under", "for"],
    correct: 1,
    explanation: "“De” often means “from” or “of”. Example: Je viens de France."
  },
  {
    id: 4,
    topic: "meaning",
    prompt: "What does “dans” usually mean?",
    options: ["in (inside)", "on", "to", "for"],
    correct: 0,
    explanation: "“Dans” is “in (inside)”. Example: Le chat est dans la maison."
  },
  {
    id: 5,
    topic: "meaning",
    prompt: "What does “pour” usually mean?",
    options: ["for", "from", "at", "under"],
    correct: 0,
    explanation: "“Pour” means “for”. Example: C’est pour toi."
  },

  // 5 sentence completion
  {
    id: 6,
    topic: "completion",
    prompt: "Complete: Je vais ___ Paris.",
    options: ["de", "à", "avec", "sous"],
    correct: 1,
    explanation: "For movement to a city: aller à + city → Je vais à Paris."
  },
  {
    id: 7,
    topic: "completion",
    prompt: "Complete: Je viens ___ France.",
    options: ["de", "en", "sur", "pour"],
    correct: 0,
    explanation: "For origin: venir de → Je viens de France."
  },
  {
    id: 8,
    topic: "completion",
    prompt: "Complete: Le livre est ___ la table.",
    options: ["sur", "dans", "à", "de"],
    correct: 0,
    explanation: "For “on”: sur → Le livre est sur la table."
  },
  {
    id: 9,
    topic: "completion",
    prompt: "Complete: Le chat est ___ la maison.",
    options: ["dans", "sur", "pour", "à"],
    correct: 0,
    explanation: "For “inside”: dans → Le chat est dans la maison."
  },
  {
    id: 10,
    topic: "completion",
    prompt: "Complete: Il parle ___ son ami.",
    options: ["avec", "en", "sous", "de"],
    correct: 0,
    explanation: "For “with”: avec → Il parle avec son ami."
  },

  // 4 verb-preposition matching
  {
    id: 11,
    topic: "verb-pattern",
    prompt: "Choose the best meaning: “parler à”",
    options: ["to talk about", "to speak to", "to need", "to play (an instrument)"],
    correct: 1,
    explanation: "“Parler à” is for the person you speak to: Je parle à mon ami."
  },
  {
    id: 12,
    topic: "verb-pattern",
    prompt: "Choose the best meaning: “parler de”",
    options: ["to speak to", "to talk about", "to go to", "to come from"],
    correct: 1,
    explanation: "“Parler de” is for the topic: Nous parlons de musique."
  },
  {
    id: 13,
    topic: "verb-pattern",
    prompt: "Complete the pattern: “avoir besoin ___”",
    options: ["à", "de", "en", "sur"],
    correct: 1,
    explanation: "The common pattern is “avoir besoin de”: J’ai besoin de temps."
  },
  {
    id: 14,
    topic: "verb-pattern",
    prompt: "Pick the correct pattern for “to play an instrument”",
    options: ["jouer à", "jouer de", "aller à", "venir de"],
    correct: 1,
    explanation: "You usually use “jouer de” for instruments: Elle joue du piano."
  },

  // 2 contraction questions
  {
    id: 15,
    topic: "contraction",
    prompt: "Choose the correct contraction: à + le = ?",
    options: ["au", "aux", "du", "des"],
    correct: 0,
    explanation: "à + le → au. Example: Je vais au marché."
  },
  {
    id: 16,
    topic: "contraction",
    prompt: "Choose the correct contraction: de + les = ?",
    options: ["au", "aux", "du", "des"],
    correct: 3,
    explanation: "de + les → des. Example: Il parle des enfants (about the children)."
  }
]

