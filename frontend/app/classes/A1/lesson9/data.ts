export const avoirExamples = [
  {
    id: 1,
    infinitive: "parler",
    sentence: "J’ai parlé français.",
    english: "I spoke French."
  },
  {
    id: 2,
    infinitive: "manger",
    sentence: "Tu as mangé une pomme.",
    english: "You ate an apple."
  },
  {
    id: 3,
    infinitive: "finir",
    sentence: "Nous avons fini le travail.",
    english: "We finished the work."
  },
  {
    id: 4,
    infinitive: "faire",
    sentence: "Ils ont fait leurs devoirs.",
    english: "They did their homework."
  },
  {
    id: 5,
    infinitive: "avoir",
    sentence: "Elle a eu un problème.",
    english: "She had a problem."
  }
]

export const etreVerbs = [
  { letter: "D", infinitive: "devenir", english: "to become" },
  { letter: "R", infinitive: "revenir", english: "to come back" },
  { letter: "M", infinitive: "monter", english: "to go up" },
  { letter: "R", infinitive: "rester", english: "to stay" },
  { letter: "S", infinitive: "sortir", english: "to go out" },
  { letter: "V", infinitive: "venir", english: "to come" },
  { letter: "A", infinitive: "aller", english: "to go" },
  { letter: "N", infinitive: "naître", english: "to be born" },
  { letter: "D", infinitive: "descendre", english: "to go down" },
  { letter: "E", infinitive: "entrer", english: "to enter" },
  { letter: "R", infinitive: "rentrer", english: "to return home / go back in" },
  { letter: "T", infinitive: "tomber", english: "to fall" },
  { letter: "R", infinitive: "retourner", english: "to return" },
  { letter: "A", infinitive: "arriver", english: "to arrive" },
  { letter: "M", infinitive: "mourir", english: "to die" },
  { letter: "P", infinitive: "partir", english: "to leave" }
]

export const agreementExamples = [
  {
    id: 1,
    sentence: "Il est allé.",
    english: "He went.",
    note: "Masculine singular"
  },
  {
    id: 2,
    sentence: "Elle est allée.",
    english: "She went.",
    note: "Feminine singular adds -e"
  },
  {
    id: 3,
    sentence: "Ils sont allés.",
    english: "They went.",
    note: "Masculine plural adds -s"
  },
  {
    id: 4,
    sentence: "Elles sont allées.",
    english: "They went.",
    note: "Feminine plural adds -es"
  }
]

export const comparisonExamples = [
  {
    type: "avoir",
    sentence: "J’ai mangé.",
    english: "I ate."
  },
  {
    type: "avoir",
    sentence: "Nous avons parlé.",
    english: "We spoke."
  },
  {
    type: "etre",
    sentence: "Elle est arrivée.",
    english: "She arrived."
  },
  {
    type: "etre",
    sentence: "Ils sont partis.",
    english: "They left."
  }
]

export const guidedExamples = [
  {
    french: "J’ai parlé avec mon professeur.",
    english: "I spoke with my teacher."
  },
  {
    french: "Tu as fini tes devoirs.",
    english: "You finished your homework."
  },
  {
    french: "Elle est arrivée tôt.",
    english: "She arrived early."
  },
  {
    french: "Nous sommes allés au marché.",
    english: "We went to the market."
  },
  {
    french: "Ils sont restés à la maison.",
    english: "They stayed at home."
  },
  {
    french: "Je suis tombé.",
    english: "I fell."
  }
]

export type PracticeTopic = "recognition" | "auxiliary" | "vandertramp" | "agreement"

export type PracticeQuestion = {
  id: number
  topic: PracticeTopic
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    topic: "recognition",
    prompt: "What are the 2 main parts of the passé composé?",
    options: [
      "subject + adjective",
      "auxiliary + past participle",
      "noun + infinitive"
    ],
    correct: 1,
    explanation: "The passé composé uses an auxiliary verb plus a past participle."
  },
  {
    id: 2,
    topic: "recognition",
    prompt: "Which sentence is in the passé composé?",
    options: [
      "Je parle français.",
      "J’ai parlé français.",
      "Je vais parler français."
    ],
    correct: 1,
    explanation: "“J’ai parlé” is a passé composé form."
  },
  {
    id: 3,
    topic: "recognition",
    prompt: "What does “Elle est arrivée” mean?",
    options: [
      "She arrives",
      "She arrived",
      "She will arrive"
    ],
    correct: 1,
    explanation: "This is a completed past action."
  },
  {
    id: 4,
    topic: "recognition",
    prompt: "Which auxiliary is used most often in the passé composé?",
    options: ["être", "avoir", "aller"],
    correct: 1,
    explanation: "Most verbs use avoir."
  },
  {
    id: 5,
    topic: "recognition",
    prompt: "Which sentence means “We finished the work”?",
    options: [
      "Nous finissons le travail.",
      "Nous avons fini le travail.",
      "Nous sommes finis le travail."
    ],
    correct: 1,
    explanation: "The correct passé composé form is “Nous avons fini le travail.”"
  },
  {
    id: 6,
    topic: "recognition",
    prompt: "Which sentence means “They left”?",
    options: [
      "Ils partent.",
      "Ils ont parti.",
      "Ils sont partis."
    ],
    correct: 2,
    explanation: "“Partir” is an être verb, so it becomes “Ils sont partis.”"
  },

  {
    id: 7,
    topic: "auxiliary",
    prompt: "Choose the correct form: Je ___ parlé.",
    options: ["ai", "suis", "es"],
    correct: 0,
    explanation: "“Parler” uses avoir."
  },
  {
    id: 8,
    topic: "auxiliary",
    prompt: "Choose the correct form: Elle ___ arrivée.",
    options: ["a", "est", "ait"],
    correct: 1,
    explanation: "“Arriver” is an être verb."
  },
  {
    id: 9,
    topic: "auxiliary",
    prompt: "Choose the correct form: Nous ___ mangé.",
    options: ["sommes", "avons", "êtes"],
    correct: 1,
    explanation: "“Manger” uses avoir."
  },
  {
    id: 10,
    topic: "auxiliary",
    prompt: "Choose the correct form: Ils ___ partis.",
    options: ["ont", "sont", "avez"],
    correct: 1,
    explanation: "“Partir” uses être."
  },
  {
    id: 11,
    topic: "auxiliary",
    prompt: "Which verb usually uses être in the passé composé?",
    options: ["parler", "finir", "aller"],
    correct: 2,
    explanation: "“Aller” is one of the classic être verbs."
  },

  {
    id: 12,
    topic: "vandertramp",
    prompt: "Which verb belongs to Dr. & Mrs. Vandertramp?",
    options: ["manger", "aller", "étudier"],
    correct: 1,
    explanation: "“Aller” is part of the mnemonic."
  },
  {
    id: 13,
    topic: "vandertramp",
    prompt: "Which verb is NOT usually in the Dr. & Mrs. Vandertramp list?",
    options: ["venir", "prendre", "tomber"],
    correct: 1,
    explanation: "“Prendre” is not in the classic mnemonic."
  },
  {
    id: 14,
    topic: "vandertramp",
    prompt: "What kind of verbs are many Dr. & Mrs. Vandertramp verbs?",
    options: [
      "movement or change-of-state verbs",
      "color adjectives",
      "food words"
    ],
    correct: 0,
    explanation: "Many of them describe movement or change of state."
  },
  {
    id: 15,
    topic: "vandertramp",
    prompt: "Which verb means “to stay” and takes être?",
    options: ["sortir", "rester", "avoir"],
    correct: 1,
    explanation: "“Rester” is one of the être verbs."
  },

  {
    id: 16,
    topic: "agreement",
    prompt: "Choose the correct sentence for “She went.”",
    options: [
      "Elle est allé.",
      "Elle est allée.",
      "Elle a allée."
    ],
    correct: 1,
    explanation: "With a feminine singular subject, add -e: allée."
  },
  {
    id: 17,
    topic: "agreement",
    prompt: "Choose the correct sentence for “They (feminine) arrived.”",
    options: [
      "Elles sont arrivées.",
      "Elles ont arrivées.",
      "Elles sont arrivé."
    ],
    correct: 0,
    explanation: "With feminine plural, the participle agrees: arrivées."
  },
  {
    id: 18,
    topic: "agreement",
    prompt: "Why does “allée” have an extra -e in “Elle est allée”?",
    options: [
      "because the subject is feminine",
      "because the verb uses avoir",
      "because it is future tense"
    ],
    correct: 0,
    explanation: "With être, the participle agrees with the subject."
  }
]

