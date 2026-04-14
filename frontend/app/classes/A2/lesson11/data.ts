// A2 Lesson 11 — Y and En
// Data and content for the lesson

export const sectionIds = [
  "intro",
  "what-are-y-en",
  "understanding-y",
  "understanding-en",
  "y-vs-en",
  "position",
  "tenses",
  "guided-examples",
  "mistakes",
  "practice",
  "completion",
];

// Section 2 — Understanding Y
export const yUses = [
  {
    title: "Y replaces a place",
    explanation: "Y can replace a location already mentioned.",
    exampleBefore: "Je vais à la banque.",
    exampleAfter: "J'y vais.",
    englishBefore: "I am going to the bank.",
    englishAfter: "I am going there.",
  },
  {
    title: "Y replaces à + thing / idea",
    explanation: "Y can replace something introduced by à when it is not a person.",
    exampleBefore: "Tu penses à ton travail.",
    exampleAfter: "Tu y penses.",
    englishBefore: "You are thinking about your work.",
    englishAfter: "You are thinking about it.",
  },
  {
    title: "Y is not usually used for people after à",
    explanation: "For people, French often uses stressed pronouns instead of y.",
    exampleBefore: "Je pense à Marie.",
    exampleAfter: "Je pense à elle.",
    englishBefore: "I am thinking about Marie.",
    englishAfter: "I am thinking about her.",
  },
];

export const commonYVerbs = [
  { expression: "aller à", english: "to go to" },
  { expression: "penser à", english: "to think about" },
  { expression: "répondre à", english: "to answer" },
  { expression: "s'intéresser à", english: "to be interested in" },
  { expression: "assister à", english: "to attend" },
];

// Section 3 — Understanding En
export const enUses = [
  {
    title: "En replaces de + thing",
    explanation: "En often replaces something introduced by de.",
    exampleBefore: "Je parle de ce livre.",
    exampleAfter: "J'en parle.",
    englishBefore: "I am talking about this book.",
    englishAfter: "I am talking about it.",
  },
  {
    title: "En replaces a quantity noun phrase",
    explanation: "En can replace something counted or measured.",
    exampleBefore: "Tu as trois frères ? Oui, j'ai trois frères.",
    exampleAfter: "Oui, j'en ai trois.",
    englishBefore: "Do you have three brothers? Yes, I have three brothers.",
    englishAfter: "Yes, I have three.",
  },
  {
    title: "En replaces partitive / some",
    explanation: "En is common with things like du, de la, des.",
    exampleBefore: "Tu veux du pain ? Oui, je veux du pain.",
    exampleAfter: "Oui, j'en veux.",
    englishBefore: "Do you want some bread? Yes, I want some bread.",
    englishAfter: "Yes, I want some.",
  },
];

export const commonEnVerbs = [
  { expression: "parler de", english: "to talk about" },
  { expression: "avoir besoin de", english: "to need" },
  { expression: "rêver de", english: "to dream about" },
  { expression: "venir de", english: "to come from / to have just" },
  { expression: "vouloir de", english: "to want some / some of it (in quantity contexts)" },
];

// Section 4 — Y vs En Comparison
export const yVsEnComparisons = [
  {
    withY: "Je vais à Paris. → J'y vais.",
    withEn: "Je viens de Paris. → J'en viens.",
    explanation: "Y often replaces a destination or place with à. En often replaces something with de.",
  },
  {
    withY: "Tu penses à ton examen. → Tu y penses.",
    withEn: "Tu parles de ton examen. → Tu en parles.",
    explanation: "Y often works with à. En often works with de.",
  },
  {
    withY: "Nous répondons à la question. → Nous y répondons.",
    withEn: "Nous avons besoin de temps. → Nous en avons besoin.",
    explanation: "The preposition helps you choose.",
  },
];

// Section 5 — Sentence Position
export const positionExamples = [
  {
    french: "J'y vais.",
    english: "I'm going there.",
  },
  {
    french: "Tu y penses.",
    english: "You are thinking about it.",
  },
  {
    french: "J'en parle.",
    english: "I'm talking about it.",
  },
  {
    french: "Nous en avons deux.",
    english: "We have two of them / We have two.",
  },
];

// Section 6 — Y and En in Different Tenses
export const tenseExamples = [
  {
    category: "present",
    french: "J'y vais souvent.",
    english: "I go there often.",
  },
  {
    category: "negation",
    french: "Je n'y vais pas.",
    english: "I am not going there.",
  },
  {
    category: "near future",
    french: "Je vais y aller demain.",
    english: "I'm going to go there tomorrow.",
  },
  {
    category: "passé composé",
    french: "J'y suis allé hier.",
    english: "I went there yesterday.",
  },
  {
    category: "present with en",
    french: "J'en veux.",
    english: "I want some / I want it.",
  },
  {
    category: "negation with en",
    french: "Je n'en veux pas.",
    english: "I do not want any / I do not want it.",
  },
  {
    category: "near future with en",
    french: "Je vais en acheter.",
    english: "I'm going to buy some.",
  },
  {
    category: "passé composé with en",
    french: "J'en ai acheté.",
    english: "I bought some.",
  },
];

// Section 7 — Guided Examples
export const guidedExamples = [
  {
    french: "Je vais à la bibliothèque. J'y vais après le déjeuner.",
    english: "I'm going to the library. I'm going there after lunch.",
  },
  {
    french: "Tu penses à ton avenir ? Oui, j'y pense souvent.",
    english: "Are you thinking about your future? Yes, I think about it often.",
  },
  {
    french: "Nous parlons de ce problème. Nous en parlons souvent.",
    english: "We are talking about this problem. We talk about it often.",
  },
  {
    french: "Tu veux du café ? Oui, j'en veux.",
    english: "Do you want some coffee? Yes, I want some.",
  },
  {
    french: "Elle a trois livres ? Oui, elle en a trois.",
    english: "Does she have three books? Yes, she has three.",
  },
  {
    french: "Je vais acheter du pain. Je vais en acheter cet après-midi.",
    english: "I'm going to buy bread. I'm going to buy some this afternoon.",
  },
];

// Section 8 — Common Mistakes
export const commonMistakes = [
  {
    wrong: "Je vais à la banque. Je vais là.",
    correct: "Je vais à la banque. J'y vais.",
    explanation: "When replacing the place, use y.",
  },
  {
    wrong: "Je parle de ce film. Je y parle.",
    correct: "Je parle de ce film. J'en parle.",
    explanation: "Parler de usually takes en, not y.",
  },
  {
    wrong: "J'ai deux frères. Je les ai deux.",
    correct: "J'en ai deux.",
    explanation: "With quantities, en is usually the correct pronoun.",
  },
  {
    wrong: "Je pense à Marie. J'y pense.",
    correct: "Je pense à Marie. Je pense à elle.",
    explanation: "For people after à, French usually does not use y.",
  },
  {
    wrong: "Je parle de Paul. J'en parle. (when the learner means the person specifically)",
    correct: "Je parle de Paul. Je parle de lui.",
    explanation: "For people after de, French often prefers stressed pronouns like de lui / d'elle.",
  },
];

// Section 9 — Practice Questions
export const practiceQuestions = [
  {
    id: 1,
    topic: "y",
    prompt: "Replace the place in: \"Je vais à la banque.\"",
    options: ["Je l'y vais.", "J'y vais.", "J'en vais."],
    correct: 1,
    explanation: "A place is often replaced by y.",
  },
  {
    id: 2,
    topic: "y",
    prompt: "Choose the correct sentence.",
    options: ["Tu y penses.", "Tu en penses.", "Tu le penses."],
    correct: 0,
    explanation: "Penser à usually takes y when replacing a thing or idea.",
  },
  {
    id: 3,
    topic: "y",
    prompt: "Which sentence means \"We are answering it\" for a question?",
    options: ["Nous y répondons.", "Nous en répondons.", "Nous le répondons."],
    correct: 0,
    explanation: "Répondre à often takes y for things.",
  },
  {
    id: 4,
    topic: "y",
    prompt: "Which pronoun usually replaces a place?",
    options: ["y", "en", "leur"],
    correct: 0,
    explanation: "Y often replaces a place.",
  },
  {
    id: 5,
    topic: "y",
    prompt: "Choose the best replacement: \"Je m'intéresse à ce sujet.\"",
    options: ["Je m'y intéresse.", "Je m'en intéresse.", "Je le m'intéresse."],
    correct: 0,
    explanation: "S'intéresser à usually takes y for a thing or idea.",
  },
  {
    id: 6,
    topic: "en",
    prompt: "Replace the phrase in: \"Je parle de ce livre.\"",
    options: ["J'y parle.", "J'en parle.", "Je le parle."],
    correct: 1,
    explanation: "Parler de usually takes en.",
  },
  {
    id: 7,
    topic: "en",
    prompt: "Choose the correct sentence.",
    options: ["J'en veux.", "J'y veux.", "Je le veux. (for some bread)"],
    correct: 0,
    explanation: "With partitive quantity ideas, en is common.",
  },
  {
    id: 8,
    topic: "en",
    prompt: "Which sentence means \"I have three of them\"?",
    options: ["Je les ai trois.", "J'en ai trois.", "J'y ai trois."],
    correct: 1,
    explanation: "En is used with quantities.",
  },
  {
    id: 9,
    topic: "en",
    prompt: "Which pronoun usually replaces something introduced by de?",
    options: ["y", "en", "lui"],
    correct: 1,
    explanation: "En often replaces expressions with de.",
  },
  {
    id: 10,
    topic: "en",
    prompt: "Choose the best replacement: \"Nous avons besoin de temps.\"",
    options: ["Nous y avons besoin.", "Nous en avons besoin.", "Nous le avons besoin."],
    correct: 1,
    explanation: "Avoir besoin de usually takes en.",
  },
  {
    id: 11,
    topic: "distinction",
    prompt: "Which sentence is correct for \"I'm thinking about my work\"?",
    options: ["J'en pense.", "J'y pense.", "Je lui pense."],
    correct: 1,
    explanation: "Penser à takes y for a thing or idea.",
  },
  {
    id: 12,
    topic: "distinction",
    prompt: "Which sentence is correct for \"I'm talking about my work\"?",
    options: ["J'y parle.", "J'en parle.", "Je le parle."],
    correct: 1,
    explanation: "Parler de takes en.",
  },
  {
    id: 13,
    topic: "distinction",
    prompt: "Which sentence is correct for a person: \"I'm thinking about Marie\"?",
    options: ["J'y pense.", "J'en pense.", "Je pense à elle."],
    correct: 2,
    explanation: "For people after à, French usually uses stressed pronouns like à elle.",
  },
  {
    id: 14,
    topic: "distinction",
    prompt: "Which sentence is correct for a person: \"I'm talking about Paul\"?",
    options: ["J'en parle.", "Je parle de lui.", "J'y parle."],
    correct: 1,
    explanation: "For people after de, French often prefers de lui / d'elle.",
  },
  {
    id: 15,
    topic: "position",
    prompt: "Choose the correct sentence in the passé composé.",
    options: ["J'ai y pensé.", "J'y ai pensé.", "Je ai y pensé."],
    correct: 1,
    explanation: "Y goes before the auxiliary in the passé composé.",
  },
  {
    id: 16,
    topic: "position",
    prompt: "Choose the correct sentence with the near future.",
    options: ["Je vais acheter en.", "Je vais en acheter.", "J'en vais acheter."],
    correct: 1,
    explanation: "With aller + infinitive, en goes before the infinitive.",
  },
  {
    id: 17,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Je parle de ce film. Je y parle.",
      "Je parle de ce film. J'en parle.",
      "Je parle de ce film. Je lui parle.",
    ],
    correct: 1,
    explanation: "Parler de usually takes en.",
  },
  {
    id: 18,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "J'ai deux sœurs. Je les ai deux.",
      "J'ai deux sœurs. J'en ai deux.",
      "J'ai deux sœurs. J'y ai deux.",
    ],
    correct: 1,
    explanation: "With quantities, en is usually correct.",
  },
];

// Performance messages based on score
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message:
        "Y and en take time because they replace different kinds of information. You can retake the practice or continue the lesson. A quick review of à vs de patterns will help a lot.",
      emoji: "📚",
      color: "blue",
    };
  } else if (score <= 13) {
    return {
      title: "Nice progress",
      message:
        "You're starting to understand how y and en work. Review the difference between place, à, de, and quantity once more if you want to feel more confident.",
      emoji: "🌟",
      color: "yellow",
    };
  } else {
    return {
      title: "Great job",
      message:
        "You're using y and en well. These are very common pronouns and they will make your French sound much more natural.",
      emoji: "🎉",
      color: "green",
    };
  }
}
