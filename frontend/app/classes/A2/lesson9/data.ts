// A2 Lesson 9 — The Passive Voice
// Data and content for the lesson

export const sectionIds = [
  "intro",
  "what-is-passive",
  "active-vs-passive",
  "formation",
  "agreement",
  "agent",
  "tenses",
  "when-to-use",
  "guided-examples",
  "mistakes",
  "practice",
  "completion",
];

// Section 2 — Active vs Passive examples
export const activeVsPassiveExamples = [
  {
    active: "Le professeur explique la leçon.",
    passive: "La leçon est expliquée par le professeur.",
    activeEnglish: "The teacher explains the lesson.",
    passiveEnglish: "The lesson is explained by the teacher.",
  },
  {
    active: "Marie écrit la lettre.",
    passive: "La lettre est écrite par Marie.",
    activeEnglish: "Marie writes the letter.",
    passiveEnglish: "The letter is written by Marie.",
  },
  {
    active: "Les enfants mangent le gâteau.",
    passive: "Le gâteau est mangé par les enfants.",
    activeEnglish: "The children eat the cake.",
    passiveEnglish: "The cake is eaten by the children.",
  },
];

// Section 3 — Passive formation steps
export const passiveFormationSteps = [
  {
    active: "Le chef prépare le repas.",
    step1: "Direct object: le repas",
    step2: "Passive subject: Le repas",
    step3: "Être in present tense: est",
    step4: "Past participle: préparé",
    result: "Le repas est préparé par le chef.",
    english: "The meal is prepared by the chef.",
  },
  {
    active: "Paul ouvre la porte.",
    step1: "Direct object: la porte",
    step2: "Passive subject: La porte",
    step3: "Être in present tense: est",
    step4: "Past participle: ouverte",
    result: "La porte est ouverte par Paul.",
    english: "The door is opened by Paul.",
  },
];

// Section 4 — Agreement examples
export const agreementExamples = [
  {
    french: "Le livre est lu.",
    english: "The book is read.",
    note: "Masculine singular",
  },
  {
    french: "La lettre est écrite.",
    english: "The letter is written.",
    note: "Feminine singular adds -e",
  },
  {
    french: "Les livres sont lus.",
    english: "The books are read.",
    note: "Masculine plural adds -s",
  },
  {
    french: "Les lettres sont écrites.",
    english: "The letters are written.",
    note: "Feminine plural adds -es",
  },
];

// Section 5 — Agent examples
export const agentExamples = [
  {
    withoutAgent: "La porte est fermée.",
    withAgent: "La porte est fermée par le gardien.",
    englishWithoutAgent: "The door is closed.",
    englishWithAgent: "The door is closed by the guard.",
  },
  {
    withoutAgent: "Le film est regardé.",
    withAgent: "Le film est regardé par les élèves.",
    englishWithoutAgent: "The film is watched.",
    englishWithAgent: "The film is watched by the students.",
  },
];

// Section 6 — Tense examples
export const tenseExamples = [
  {
    tense: "present",
    french: "La leçon est expliquée par le professeur.",
    english: "The lesson is explained by the teacher.",
  },
  {
    tense: "imparfait",
    french: "La leçon était expliquée par le professeur.",
    english: "The lesson was being explained by the teacher.",
  },
  {
    tense: "futur simple",
    french: "La leçon sera expliquée demain.",
    english: "The lesson will be explained tomorrow.",
  },
  {
    tense: "passé composé",
    french: "La leçon a été expliquée hier.",
    english: "The lesson was explained yesterday.",
  },
];

// Section 7 — When to use passive
export const passiveUses = [
  {
    title: "The result is more important",
    example: "Le repas est servi.",
    english: "The meal is served.",
  },
  {
    title: "The agent is unknown",
    example: "La voiture a été volée.",
    english: "The car was stolen.",
  },
  {
    title: "The sentence sounds more formal or neutral",
    example: "Les documents seront envoyés demain.",
    english: "The documents will be sent tomorrow.",
  },
];

// Section 8 — Guided examples
export const guidedExamples = [
  {
    french: "La maison est décorée pour la fête.",
    english: "The house is decorated for the party.",
  },
  {
    french: "Le repas est préparé par mon père.",
    english: "The meal is prepared by my father.",
  },
  {
    french: "Les devoirs sont corrigés par la professeure.",
    english: "The homework is corrected by the teacher.",
  },
  {
    french: "La lettre a été envoyée ce matin.",
    english: "The letter was sent this morning.",
  },
  {
    french: "Les résultats seront annoncés demain.",
    english: "The results will be announced tomorrow.",
  },
  {
    french: "La porte était fermée quand nous sommes arrivés.",
    english: "The door was closed when we arrived.",
  },
];

// Section 9 — Common mistakes
export const commonMistakes = [
  {
    wrong: "La lettre écrit par Marie.",
    correct: "La lettre est écrite par Marie.",
    explanation: "The passive voice needs être.",
  },
  {
    wrong: "Le repas est préparée par le chef.",
    correct: "Le repas est préparé par le chef.",
    explanation: "The past participle must agree with the subject.",
  },
  {
    wrong: "Le gâteau mange par les enfants.",
    correct: "Le gâteau est mangé par les enfants.",
    explanation: "Do not forget the correct form of être.",
  },
  {
    wrong: "La porte est fermée de Paul.",
    correct: "La porte est fermée par Paul.",
    explanation: "Use par to express the agent in the passive voice.",
  },
];

// Section 10 — Practice questions
export const practiceQuestions = [
  {
    id: 1,
    topic: "recognition",
    prompt: "Which sentence is in the passive voice?",
    options: [
      "Le professeur explique la leçon.",
      "La leçon est expliquée par le professeur.",
      "Le professeur va expliquer la leçon.",
    ],
    correct: 1,
    explanation: "The passive voice uses être + past participle.",
  },
  {
    id: 2,
    topic: "recognition",
    prompt: "In the passive voice, what becomes the subject?",
    options: [
      "the active subject",
      "the direct object of the active sentence",
      "the indirect object",
    ],
    correct: 1,
    explanation: "The direct object of the active sentence becomes the subject in the passive.",
  },
  {
    id: 3,
    topic: "recognition",
    prompt: "Which sentence means \"The cake is eaten by the children\"?",
    options: [
      "Les enfants mangent le gâteau.",
      "Le gâteau est mangé par les enfants.",
      "Le gâteau mange les enfants.",
    ],
    correct: 1,
    explanation: "This is the passive structure.",
  },
  {
    id: 4,
    topic: "recognition",
    prompt: "What is usually used to form the passive voice in French?",
    options: ["avoir + infinitive", "être + past participle", "aller + infinitive"],
    correct: 1,
    explanation: "The passive voice is usually formed with être + past participle.",
  },
  {
    id: 5,
    topic: "formation",
    prompt: "Choose the correct passive sentence for: \"Le chef prépare le repas.\"",
    options: [
      "Le repas est préparé par le chef.",
      "Le repas prépare le chef.",
      "Le repas a préparé par le chef.",
    ],
    correct: 0,
    explanation: "This is the correct passive transformation.",
  },
  {
    id: 6,
    topic: "formation",
    prompt: "Choose the correct passive sentence for: \"Marie écrit la lettre.\"",
    options: [
      "La lettre est écrite par Marie.",
      "La lettre écrit par Marie.",
      "La lettre est écrit par Marie.",
    ],
    correct: 0,
    explanation: "The passive needs être and correct agreement.",
  },
  {
    id: 7,
    topic: "formation",
    prompt: "Choose the correct passive sentence for: \"Paul ouvre la porte.\"",
    options: [
      "La porte est ouverte par Paul.",
      "La porte est ouvert par Paul.",
      "La porte ouvre par Paul.",
    ],
    correct: 0,
    explanation: "La porte is feminine singular, so ouverte agrees.",
  },
  {
    id: 8,
    topic: "formation",
    prompt: "Which passive sentence is correct?",
    options: [
      "Les devoirs sont corrigés par la professeure.",
      "Les devoirs est corrigés par la professeure.",
      "Les devoirs sont corrigé par la professeure.",
    ],
    correct: 0,
    explanation: "Les devoirs is plural, so use sont corrigés.",
  },
  {
    id: 9,
    topic: "agreement",
    prompt: "Choose the correct sentence.",
    options: [
      "La lettre est écrite.",
      "La lettre est écrit.",
      "La lettre est écrits.",
    ],
    correct: 0,
    explanation: "La lettre is feminine singular, so écrite.",
  },
  {
    id: 10,
    topic: "agreement",
    prompt: "Choose the correct sentence.",
    options: [
      "Les portes sont fermées.",
      "Les portes sont fermé.",
      "Les portes est fermées.",
    ],
    correct: 0,
    explanation: "Les portes is feminine plural, so fermées.",
  },
  {
    id: 11,
    topic: "agreement",
    prompt: "Which sentence is correct for a masculine plural subject?",
    options: [
      "Les livres sont lus.",
      "Les livres sont lues.",
      "Les livres est lus.",
    ],
    correct: 0,
    explanation: "Les livres is masculine plural, so lus.",
  },
  {
    id: 12,
    topic: "agent",
    prompt: "Which preposition usually introduces the agent in a passive sentence?",
    options: ["à", "de", "par"],
    correct: 2,
    explanation: "The agent is usually introduced by par.",
  },
  {
    id: 13,
    topic: "agent",
    prompt: "Choose the correct sentence.",
    options: [
      "La porte est fermée par le gardien.",
      "La porte est fermée de le gardien.",
      "La porte est fermée à le gardien.",
    ],
    correct: 0,
    explanation: "Use par to introduce the agent.",
  },
  {
    id: 14,
    topic: "tense",
    prompt: "Which sentence is passive in the futur simple?",
    options: [
      "La leçon sera expliquée demain.",
      "La leçon est expliquée demain.",
      "La leçon a été expliquée demain.",
    ],
    correct: 0,
    explanation: "Sera explained indicates future passive.",
  },
  {
    id: 15,
    topic: "tense",
    prompt: "Which sentence is passive in the passé composé?",
    options: [
      "La lettre a été envoyée hier.",
      "La lettre est envoyée hier.",
      "La lettre sera envoyée hier.",
    ],
    correct: 0,
    explanation: "A été envoyée is the passive in the passé composé.",
  },
];

// Performance messages based on score
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 6) {
    return {
      title: "Good effort",
      message:
        "The passive voice takes practice because the sentence focus changes and agreement matters. You can retake the practice or continue the lesson. A quick review of être + past participle will help a lot.",
      emoji: "📚",
      color: "blue",
    };
  } else if (score <= 11) {
    return {
      title: "Nice progress",
      message:
        "You're starting to understand how the passive voice works. Review agreement and the role of par once more if you want to feel more confident.",
      emoji: "🌟",
      color: "yellow",
    };
  } else {
    return {
      title: "Great job",
      message:
        "You're using the passive voice well. This is an important structure for more formal and varied French.",
      emoji: "🎉",
      color: "green",
    };
  }
}
