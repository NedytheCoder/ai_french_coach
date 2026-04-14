// A2 Lesson 12 — Relative Pronouns: Qui, Que, Où
// Data and content for the lesson

export const sectionIds = [
  "intro",
  "what-are-relative",
  "understanding-qui",
  "understanding-que",
  "understanding-ou",
  "qui-vs-que",
  "joining-sentences",
  "guided-examples",
  "mistakes",
  "practice",
  "completion",
];

// Section 2 — Understanding qui
export const quiExamples = [
  {
    before: "Voici le professeur. Le professeur parle.",
    after: "Voici le professeur qui parle.",
    englishBefore: "Here is the teacher. The teacher is speaking.",
    englishAfter: "Here is the teacher who is speaking.",
  },
  {
    before: "J'ai un ami. Mon ami habite à Paris.",
    after: "J'ai un ami qui habite à Paris.",
    englishBefore: "I have a friend. My friend lives in Paris.",
    englishAfter: "I have a friend who lives in Paris.",
  },
  {
    before: "C'est un film. Le film commence bientôt.",
    after: "C'est un film qui commence bientôt.",
    englishBefore: "It's a film. The film starts soon.",
    englishAfter: "It's a film that starts soon.",
  },
];

// Section 3 — Understanding que
export const queExamples = [
  {
    before: "Je connais la femme. Tu regardes la femme.",
    after: "Je connais la femme que tu regardes.",
    englishBefore: "I know the woman. You are looking at the woman.",
    englishAfter: "I know the woman that / whom you are looking at.",
  },
  {
    before: "Voilà le livre. J'achète le livre.",
    after: "Voilà le livre que j'achète.",
    englishBefore: "There is the book. I am buying the book.",
    englishAfter: "There is the book that I am buying.",
  },
  {
    before: "C'est l'hôtel. Nous aimons l'hôtel.",
    after: "C'est l'hôtel que nous aimons.",
    englishBefore: "It's the hotel. We like the hotel.",
    englishAfter: "It's the hotel that we like.",
  },
  {
    before: "C'est une idée. Il adore cette idée.",
    after: "C'est une idée qu'il adore.",
    englishBefore: "It's an idea. He loves that idea.",
    englishAfter: "It's an idea that he loves.",
  },
];

// Section 4 — Understanding où
export const ouExamples = [
  {
    before: "Voici la ville. J'habite dans cette ville.",
    after: "Voici la ville où j'habite.",
    englishBefore: "Here is the city. I live in that city.",
    englishAfter: "Here is the city where I live.",
  },
  {
    before: "C'est le restaurant. Nous mangeons dans ce restaurant.",
    after: "C'est le restaurant où nous mangeons.",
    englishBefore: "It's the restaurant. We eat in that restaurant.",
    englishAfter: "It's the restaurant where we eat.",
  },
  {
    before: "Je me souviens du jour. Nous nous sommes rencontrés ce jour-là.",
    after: "Je me souviens du jour où nous nous sommes rencontrés.",
    englishBefore: "I remember the day. We met that day.",
    englishAfter: "I remember the day when we met.",
  },
];

// Section 5 — Qui vs Que comparison
export const quiVsQueComparisons = [
  {
    sentenceWithQui: "Le garçon qui parle est mon frère.",
    sentenceWithQue: "Le garçon que je vois est mon frère.",
    explanation: "In the first sentence, the boy is doing the action (speaking), so use qui. In the second sentence, the boy receives the action (I see him), so use que.",
  },
  {
    sentenceWithQui: "C'est une voiture qui coûte cher.",
    sentenceWithQue: "C'est une voiture que je veux acheter.",
    explanation: "Use qui when the noun is the subject of the second clause. Use que when it is the direct object.",
  },
  {
    sentenceWithQui: "Voici les étudiants qui travaillent.",
    sentenceWithQue: "Voici les étudiants que le professeur aide.",
    explanation: "Who is doing the action? If it is the repeated noun, use qui. If the repeated noun receives the action, use que.",
  },
];

// Section 6 — How relative pronouns join sentences
export const joiningSteps = [
  {
    type: "qui",
    step1: "Voici le professeur.",
    step2: "Le professeur parle.",
    step3: "The repeated noun is the subject of the second clause.",
    result: "Voici le professeur qui parle.",
  },
  {
    type: "que",
    step1: "Je regarde le film.",
    step2: "Tu recommandes le film.",
    step3: "The repeated noun is the direct object of the second clause.",
    result: "Je regarde le film que tu recommandes.",
  },
  {
    type: "où",
    step1: "C'est la ville.",
    step2: "Nous vivons dans cette ville.",
    step3: "The repeated noun refers to a place.",
    result: "C'est la ville où nous vivons.",
  },
];

// Section 7 — Guided examples
export const guidedExamples = [
  {
    french: "J'ai un voisin qui joue du piano.",
    english: "I have a neighbor who plays the piano.",
  },
  {
    french: "Voici le livre que je lis en ce moment.",
    english: "Here is the book that I am reading at the moment.",
  },
  {
    french: "C'est la maison où mes grands-parents habitaient.",
    english: "It is the house where my grandparents used to live.",
  },
  {
    french: "Tu connais la fille qui travaille ici ?",
    english: "Do you know the girl who works here?",
  },
  {
    french: "Voilà le café que nous aimons.",
    english: "There is the café that we like.",
  },
  {
    french: "Je me souviens du moment où il est arrivé.",
    english: "I remember the moment when he arrived.",
  },
];

// Section 8 — Common mistakes
export const commonMistakes = [
  {
    wrong: "Le professeur que parle est gentil.",
    correct: "Le professeur qui parle est gentil.",
    explanation: "The repeated noun is the subject of the second clause, so use qui.",
  },
  {
    wrong: "Le livre qui j'achète est cher.",
    correct: "Le livre que j'achète est cher.",
    explanation: "The repeated noun is the direct object of the second clause, so use que.",
  },
  {
    wrong: "La ville que j'habite est grande.",
    correct: "La ville où j'habite est grande.",
    explanation: "For a place, use où.",
  },
  {
    wrong: "C'est une idée que elle adore.",
    correct: "C'est une idée qu'elle adore.",
    explanation: "Before a vowel or silent h, que becomes qu'.",
  },
];

// Section 9 — Practice questions
export const practiceQuestions = [
  {
    id: 1,
    topic: "qui",
    prompt: "Choose the correct sentence.",
    options: [
      "Le garçon qui parle est mon frère.",
      "Le garçon que parle est mon frère.",
      "Le garçon où parle est mon frère.",
    ],
    correct: 0,
    explanation: "The boy is the subject of the second clause, so use qui.",
  },
  {
    id: 2,
    topic: "qui",
    prompt: "Which sentence means \"I have a friend who lives in Paris\"?",
    options: [
      "J'ai un ami que habite à Paris.",
      "J'ai un ami qui habite à Paris.",
      "J'ai un ami où habite à Paris.",
    ],
    correct: 1,
    explanation: "The friend is the subject of habite, so use qui.",
  },
  {
    id: 3,
    topic: "qui",
    prompt: "Choose the correct sentence.",
    options: [
      "Voici les étudiants qui travaillent.",
      "Voici les étudiants que travaillent.",
      "Voici les étudiants où travaillent.",
    ],
    correct: 0,
    explanation: "The students are doing the action, so use qui.",
  },
  {
    id: 4,
    topic: "qui",
    prompt: "Which relative pronoun usually replaces the subject of the second clause?",
    options: ["qui", "que", "où"],
    correct: 0,
    explanation: "Qui is used when the repeated noun is the subject.",
  },
  {
    id: 5,
    topic: "qui",
    prompt: "Choose the correct sentence.",
    options: [
      "C'est une voiture qui coûte cher.",
      "C'est une voiture que coûte cher.",
      "C'est une voiture où coûte cher.",
    ],
    correct: 0,
    explanation: "The car is the subject of coûte, so use qui.",
  },
  {
    id: 6,
    topic: "qui",
    prompt: "Choose the correct sentence.",
    options: [
      "Tu connais la fille qui travaille ici ?",
      "Tu connais la fille que travaille ici ?",
      "Tu connais la fille où travaille ici ?",
    ],
    correct: 0,
    explanation: "The girl is the subject of travaille, so use qui.",
  },
  {
    id: 7,
    topic: "que",
    prompt: "Choose the correct sentence.",
    options: [
      "Le livre que j'achète est cher.",
      "Le livre qui j'achète est cher.",
      "Le livre où j'achète est cher.",
    ],
    correct: 0,
    explanation: "The book is the direct object of j'achète, so use que.",
  },
  {
    id: 8,
    topic: "que",
    prompt: "Which sentence means \"Here is the film that I am watching\"?",
    options: [
      "Voici le film qui je regarde.",
      "Voici le film que je regarde.",
      "Voici le film où je regarde.",
    ],
    correct: 1,
    explanation: "The film is the direct object of regarde, so use que.",
  },
  {
    id: 9,
    topic: "que",
    prompt: "Choose the correct sentence.",
    options: [
      "C'est une idée qu'il adore.",
      "C'est une idée qui il adore.",
      "C'est une idée où il adore.",
    ],
    correct: 0,
    explanation: "Before a vowel, que becomes qu'.",
  },
  {
    id: 10,
    topic: "que",
    prompt: "Which relative pronoun usually replaces the direct object of the second clause?",
    options: ["qui", "que", "où"],
    correct: 1,
    explanation: "Que is used when the repeated noun is the direct object.",
  },
  {
    id: 11,
    topic: "que",
    prompt: "Choose the correct sentence.",
    options: [
      "Voilà le café que nous aimons.",
      "Voilà le café qui nous aimons.",
      "Voilà le café où nous aimons.",
    ],
    correct: 0,
    explanation: "The café is the direct object of aimons, so use que.",
  },
  {
    id: 12,
    topic: "ou",
    prompt: "Choose the correct sentence for a place.",
    options: [
      "Voici la ville où j'habite.",
      "Voici la ville qui j'habite.",
      "Voici la ville que j'habite.",
    ],
    correct: 0,
    explanation: "For a place, use où.",
  },
  {
    id: 13,
    topic: "ou",
    prompt: "Which sentence means \"It's the restaurant where we eat\"?",
    options: [
      "C'est le restaurant qui nous mangeons.",
      "C'est le restaurant que nous mangeons.",
      "C'est le restaurant où nous mangeons.",
    ],
    correct: 2,
    explanation: "Où is used for places.",
  },
  {
    id: 14,
    topic: "ou",
    prompt: "Choose the correct sentence for time.",
    options: [
      "Je me souviens du jour où nous nous sommes rencontrés.",
      "Je me souviens du jour qui nous nous sommes rencontrés.",
      "Je me souviens du jour que nous nous sommes rencontrés.",
    ],
    correct: 0,
    explanation: "Où can also be used for time expressions like day, moment, year.",
  },
  {
    id: 15,
    topic: "ou",
    prompt: "Which relative pronoun is commonly used for places and times?",
    options: ["qui", "que", "où"],
    correct: 2,
    explanation: "Où is used for places and times.",
  },
  {
    id: 16,
    topic: "mixed",
    prompt: "Choose the correct joined sentence.",
    options: [
      "Voici le professeur qui parle.",
      "Voici le professeur que parle.",
      "Voici le professeur où parle.",
    ],
    correct: 0,
    explanation: "The repeated noun is the subject of parle, so use qui.",
  },
  {
    id: 17,
    topic: "mixed",
    prompt: "Choose the correct joined sentence.",
    options: [
      "Je regarde le film qui tu recommandes.",
      "Je regarde le film que tu recommandes.",
      "Je regarde le film où tu recommandes.",
    ],
    correct: 1,
    explanation: "The film is the direct object of recommandes, so use que.",
  },
  {
    id: 18,
    topic: "mixed",
    prompt: "Choose the correct joined sentence.",
    options: [
      "C'est la maison où mes grands-parents habitaient.",
      "C'est la maison qui mes grands-parents habitaient.",
      "C'est la maison que mes grands-parents habitaient.",
    ],
    correct: 0,
    explanation: "For a place, use où.",
  },
];

// Performance messages based on score
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message:
        "Relative pronouns take time because you need to notice whether the noun is a subject, an object, or a place/time expression. You can retake the practice or continue the lesson. A quick review of qui, que, and où will help a lot.",
      emoji: "📚",
      color: "blue",
    };
  } else if (score <= 13) {
    return {
      title: "Nice progress",
      message:
        "You're starting to understand how relative pronouns work. Review the difference between qui and que once more if you want to feel more confident.",
      emoji: "🌟",
      color: "yellow",
    };
  } else {
    return {
      title: "Great job",
      message:
        "You're using qui, que, and où well. These relative pronouns will help your French sound much smoother and more natural.",
      emoji: "🎉",
      color: "green",
    };
  }
}
