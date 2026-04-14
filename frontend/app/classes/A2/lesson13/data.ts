// A2 Lesson 13 — Advanced Relative Pronouns
// Data and content for the lesson

export const sectionIds = [
  "intro",
  "what-makes-advanced",
  "ce-qui",
  "ce-que",
  "ce-a-quoi",
  "ce-dont",
  "lequel-forms",
  "comparison",
  "guided-examples",
  "mistakes",
  "practice",
  "completion",
];

// Section 2 — Understanding ce qui
export const ceQuiExamples = [
  {
    french: "Je comprends ce qui se passe.",
    english: "I understand what is happening.",
  },
  {
    french: "Ce qui est important, c'est la pratique.",
    english: "What is important is practice.",
  },
];

// Section 3 — Understanding ce que / ce qu'
export const ceQueExamples = [
  {
    french: "Je sais ce que tu fais.",
    english: "I know what you are doing.",
  },
  {
    french: "Dis-moi ce que tu veux.",
    english: "Tell me what you want.",
  },
];

// Section 4 — Understanding ce à quoi
export const ceAQuoiExamples = [
  {
    french: "Je pense à quelque chose.",
    replaced: "Je pense à ce à quoi tu penses.",
    english: "I am thinking about what you are thinking about.",
  },
  {
    french: "C'est ce à quoi je réfléchis.",
    english: "That's what I'm thinking about.",
  },
];

// Section 5 — Understanding ce dont
export const ceDontExamples = [
  {
    french: "Je parle de quelque chose.",
    replaced: "Je parle de ce dont tu parles.",
    english: "I am talking about what you are talking about.",
  },
  {
    french: "C'est ce dont j'ai besoin.",
    english: "That's what I need.",
  },
];

// Section 6 — Lequel forms
export const lequelForms = [
  {
    base: "lequel",
    forms: [
      "lequel (masc. singular)",
      "laquelle (fem. singular)",
      "lesquels (masc. plural)",
      "lesquelles (fem. plural)",
    ],
  },
  {
    withA: ["auquel", "à laquelle", "auxquels", "auxquelles"],
    note: "used with à",
  },
  {
    withDe: ["duquel", "de laquelle", "desquels", "desquelles"],
    note: "used with de",
  },
];

export const lequelExamples = [
  {
    french: "La table à laquelle je pense",
    english: "The table I'm thinking about",
  },
  {
    french: "Le sujet auquel je réfléchis",
    english: "The subject I'm thinking about",
  },
  {
    french: "Le livre dont je parle",
    english: "The book I'm talking about",
  },
];

// Section 7 — Simple comparison
export const comparisonExamples = [
  {
    ceQui: "Je comprends ce qui se passe.",
    ceQue: "Je comprends ce que tu dis.",
    explanation: "Ce qui = subject, ce que = object.",
  },
  {
    ceAQuoi: "Je pense à ce à quoi tu penses.",
    ceDont: "Je parle de ce dont tu parles.",
    explanation: "Use à → ce à quoi, use de → ce dont.",
  },
];

// Section 8 — Guided examples
export const guidedExamples = [
  {
    french: "Ce qui me plaît, c'est la musique.",
    english: "What I like is the music.",
  },
  {
    french: "Je fais ce que je peux.",
    english: "I do what I can.",
  },
  {
    french: "C'est ce dont j'ai besoin.",
    english: "That's what I need.",
  },
  {
    french: "Je pense à ce à quoi tu penses.",
    english: "I think about what you think about.",
  },
  {
    french: "Le sujet auquel je réfléchis est difficile.",
    english: "The subject I'm thinking about is difficult.",
  },
];

// Section 9 — Common mistakes
export const commonMistakes = [
  {
    wrong: "Je comprends ce que se passe.",
    correct: "Je comprends ce qui se passe.",
    explanation: "Use ce qui when it is the subject.",
  },
  {
    wrong: "Je sais ce qui tu fais.",
    correct: "Je sais ce que tu fais.",
    explanation: "Use ce que for the object.",
  },
  {
    wrong: "Je parle de ce que j'ai besoin.",
    correct: "Je parle de ce dont j'ai besoin.",
    explanation: "Use ce dont with de expressions.",
  },
  {
    wrong: "Je pense de ce que tu dis.",
    correct: "Je pense à ce que tu dis.",
    explanation: "Use à with penser.",
  },
];

// Section 10 — Practice questions
export const practiceQuestions = [
  {
    id: 1,
    topic: "ce qui / ce que",
    prompt: "Choose the correct sentence.",
    options: [
      "Je comprends ce qui se passe.",
      "Je comprends ce que se passe.",
      "Je comprends ce dont se passe.",
    ],
    correct: 0,
    explanation: "Ce qui is used as the subject.",
  },
  {
    id: 2,
    topic: "ce qui / ce que",
    prompt: "Choose the correct sentence.",
    options: [
      "Je sais ce qui tu fais.",
      "Je sais ce que tu fais.",
      "Je sais ce dont tu fais.",
    ],
    correct: 1,
    explanation: "Ce que is used as the object.",
  },
  {
    id: 3,
    topic: "ce qui / ce que",
    prompt: "Which sentence means \"Tell me what you want\"?",
    options: [
      "Dis-moi ce qui tu veux.",
      "Dis-moi ce que tu veux.",
      "Dis-moi ce dont tu veux.",
    ],
    correct: 1,
    explanation: "Ce que is used as the object of veux.",
  },
  {
    id: 4,
    topic: "ce qui / ce que",
    prompt: "What does ce qui usually replace?",
    options: [
      "the object of the verb",
      "the subject of the verb",
      "a place",
    ],
    correct: 1,
    explanation: "Ce qui replaces the subject.",
  },
  {
    id: 5,
    topic: "ce qui / ce que",
    prompt: "What does ce que usually replace?",
    options: [
      "the object of the verb",
      "the subject of the verb",
      "a time expression",
    ],
    correct: 0,
    explanation: "Ce que replaces the object.",
  },
  {
    id: 6,
    topic: "ce dont / ce à quoi",
    prompt: "Choose the correct sentence with de.",
    options: [
      "Je parle de ce qui tu parles.",
      "Je parle de ce que tu parles.",
      "Je parle de ce dont tu parles.",
    ],
    correct: 2,
    explanation: "Use ce dont with verbs that take de.",
  },
  {
    id: 7,
    topic: "ce dont / ce à quoi",
    prompt: "Which sentence means \"That's what I need\"?",
    options: [
      "C'est ce que j'ai besoin.",
      "C'est ce dont j'ai besoin.",
      "C'est ce à quoi j'ai besoin.",
    ],
    correct: 1,
    explanation: "Avoir besoin de → use ce dont.",
  },
  {
    id: 8,
    topic: "ce dont / ce à quoi",
    prompt: "Choose the correct sentence with à.",
    options: [
      "Je pense à ce qui tu penses.",
      "Je pense à ce que tu penses.",
      "Je pense à ce à quoi tu penses.",
    ],
    correct: 2,
    explanation: "Use ce à quoi with verbs that take à.",
  },
  {
    id: 9,
    topic: "ce dont / ce à quoi",
    prompt: "Which form is used with the preposition de?",
    options: ["ce que", "ce qui", "ce dont"],
    correct: 2,
    explanation: "Ce dont is used with de.",
  },
  {
    id: 10,
    topic: "ce dont / ce à quoi",
    prompt: "Which form is used with the preposition à?",
    options: ["ce à quoi", "ce que", "ce qui"],
    correct: 0,
    explanation: "Ce à quoi is used with à.",
  },
  {
    id: 11,
    topic: "lequel forms",
    prompt: "Which is the masculine singular form with à?",
    options: ["auquel", "duquel", "lequel"],
    correct: 0,
    explanation: "Auquel = à + lequel (masculine singular).",
  },
  {
    id: 12,
    topic: "lequel forms",
    prompt: "Which is the feminine singular form with à?",
    options: ["à laquelle", "duquel", "auxquelles"],
    correct: 0,
    explanation: "À laquelle is used with à (feminine singular).",
  },
  {
    id: 13,
    topic: "lequel forms",
    prompt: "Which form is used with de (masculine singular)?",
    options: ["auquel", "duquel", "desquels"],
    correct: 1,
    explanation: "Duquel = de + lequel.",
  },
  {
    id: 14,
    topic: "lequel forms",
    prompt: "Choose the correct sentence.",
    options: [
      "Le sujet auquel je réfléchis.",
      "Le sujet duquel je réfléchis.",
      "Le sujet ce qui je réfléchis.",
    ],
    correct: 0,
    explanation: "Réfléchir à → use auquel (à + lequel).",
  },
  {
    id: 15,
    topic: "mixed",
    prompt: "Choose the correct sentence.",
    options: [
      "Ce qui est important, c'est la pratique.",
      "Ce que est important, c'est la pratique.",
      "Ce dont est important, c'est la pratique.",
    ],
    correct: 0,
    explanation: "Ce qui is used as the subject (est important).",
  },
  {
    id: 16,
    topic: "mixed",
    prompt: "Choose the correct sentence.",
    options: [
      "Je fais ce qui je peux.",
      "Je fais ce que je peux.",
      "Je fais ce dont je peux.",
    ],
    correct: 1,
    explanation: "Ce que is used as the object of fais.",
  },
  {
    id: 17,
    topic: "mixed",
    prompt: "Choose the correct sentence.",
    options: [
      "Je comprends ce que se passe.",
      "Je comprends ce qui se passe.",
      "Je comprends ce dont se passe.",
    ],
    correct: 1,
    explanation: "Ce qui is used as the subject of se passe.",
  },
  {
    id: 18,
    topic: "mixed",
    prompt: "Choose the correct sentence.",
    options: [
      "C'est ce que j'ai besoin.",
      "C'est ce dont j'ai besoin.",
      "C'est ce à quoi j'ai besoin.",
    ],
    correct: 1,
    explanation: "Avoir besoin de → use ce dont.",
  },
];

// Performance messages based on score
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message:
        "These patterns take time. Focus on à vs de and subject vs object. You can retake the practice or continue the lesson.",
      emoji: "📚",
      color: "blue",
    };
  } else if (score <= 13) {
    return {
      title: "Nice progress",
      message:
        "You're starting to see the patterns. Review the difference between subject and object forms once more if you want to feel more confident.",
      emoji: "🌟",
      color: "yellow",
    };
  } else {
    return {
      title: "Great job",
      message:
        "You're handling advanced relative pronouns well. These structures will make your French more precise and natural.",
      emoji: "🎉",
      color: "green",
    };
  }
}
