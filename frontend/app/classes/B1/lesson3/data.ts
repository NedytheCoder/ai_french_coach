// B1 Lesson 3 — Relative Pronouns Review
export const sectionIds = ["intro", "qui", "que", "ou", "dont", "comparison", "sentence-joining", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Relative Pronouns Review",
  subtitle: "Master qui, que, où, and dont to connect sentences smoothly.",
  lessonNumber: 3,
};

export const quiExamples = [
  { french: "L'homme qui parle est mon professeur.", english: "The man who is speaking is my teacher.", explanation: "qui = subject (the man speaks)" },
  { french: "C'est un livre qui intéresse beaucoup de monde.", english: "It's a book that interests many people.", explanation: "qui = subject (the book interests)" },
];

export const queExamples = [
  { french: "Le livre que je lis est excellent.", english: "The book (that) I'm reading is excellent.", explanation: "que = direct object (I read the book)" },
  { french: "La personne que j'ai rencontrée est sympa.", english: "The person (whom) I met is nice.", explanation: "que = direct object (I met the person)" },
];

export const ouExamples = [
  { french: "Le restaurant où nous avons mangé était cher.", english: "The restaurant where we ate was expensive.", explanation: "où = place" },
  { french: "Le jour où je suis arrivé, il pleuvait.", english: "The day when I arrived, it was raining.", explanation: "où = time" },
];

export const dontExamples = [
  { french: "Voici le livre dont je t'ai parlé.", english: "Here's the book (that) I told you about.", explanation: "dont = de + thing (parler de)" },
  { french: "C'est une personne dont je me souviens.", english: "It's a person (whom) I remember.", explanation: "dont = de + thing/person (se souvenir de)" },
];

export const pronounComparison = [
  { pronoun: "qui", usage: "Subject (does the action)", example: "Le chien qui aboie" },
  { pronoun: "que", usage: "Direct object (receives the action)", example: "Le chien que je vois" },
  { pronoun: "où", usage: "Place or time", example: "La maison où j'habite" },
  { pronoun: "dont", usage: "With de (about/of/from)", example: "L'histoire dont je parle" },
];

export const sentenceJoiningSteps = [
  {
    step1: "J'ai un ami. Mon ami habite à Paris.",
    step2: "J'ai un ami qui habite à Paris.",
    explanation: "qui replaces 'mon ami' as subject",
  },
  {
    step1: "Je lis un livre. Le livre est intéressant.",
    step2: "Je lis un livre qui est intéressant.",
    explanation: "qui replaces 'le livre' as subject",
  },
  {
    step1: "C'est un film. J'ai vu ce film.",
    step2: "C'est un film que j'ai vu.",
    explanation: "que replaces 'ce film' as object",
  },
];

export const commonMistakes = [
  { wrong: "L'homme que parle est professeur.", correct: "L'homme qui parle est professeur.", explanation: "Use qui when the pronoun is the subject (he speaks)." },
  { wrong: "Le livre qui je lis est bon.", correct: "Le livre que je lis est bon.", explanation: "Use que when the pronoun is the object (I read it)." },
  { wrong: "Le sujet je pense est difficile.", correct: "Le sujet dont je pense est difficile.", explanation: "Penser takes de, so use dont." },
  { wrong: "La maison que je visite est grande.", correct: "La maison que je visite est grande.", note: "This is actually correct! But où could also work depending on meaning.", explanation: "Visiter takes a direct object, so use que." },
];

export const practiceQuestions = [
  { id: 1, topic: "qui", prompt: "Which pronoun replaces a subject?", options: ["qui", "que", "où"], correct: 0, explanation: "Qui is used when the pronoun is the subject of the clause." },
  { id: 2, topic: "que", prompt: "Which pronoun replaces a direct object?", options: ["qui", "que", "dont"], correct: 1, explanation: "Que is used when the pronoun is the direct object." },
  { id: 3, topic: "dont", prompt: "Which pronoun is used with verbs taking 'de'?", options: ["qui", "que", "dont"], correct: 2, explanation: "Dont replaces de + noun." },
  { id: 4, topic: "ou", prompt: "Which pronoun is used for place and time?", options: ["où", "que", "qui"], correct: 0, explanation: "Où is used for both place and time." },
  { id: 5, topic: "sentence-joining", prompt: "Join: 'J'ai un chat. Mon chat est noir.'", options: ["J'ai un chat qui est noir.", "J'ai un chat que est noir.", "J'ai un chat où est noir."], correct: 0, explanation: "Use qui for the subject (the cat is black)." },
  { id: 6, topic: "sentence-joining", prompt: "Join: 'C'est un film. J'aime ce film.'", options: ["C'est un film que j'aime.", "C'est un film qui j'aime.", "C'est un film dont j'aime."], correct: 0, explanation: "Use que for the direct object (I love the film)." },
  { id: 7, topic: "dont", prompt: "Complete: Le livre _____ je parle est intéressant.", options: ["dont", "que", "qui"], correct: 0, explanation: "Parler de → use dont." },
  { id: 8, topic: "dont", prompt: "Complete: La personne _____ je me souviens est Marie.", options: ["dont", "que", "qui"], correct: 0, explanation: "Se souvenir de → use dont." },
  { id: 9, topic: "ou", prompt: "Complete: C'est la ville _____ je suis né.", options: ["où", "que", "qui"], correct: 0, explanation: "Où is used for place (where)." },
  { id: 10, topic: "ou", prompt: "Complete: Le jour _____ nous avons gagné était spécial.", options: ["où", "que", "qui"], correct: 0, explanation: "Où is used for time (when)." },
  { id: 11, topic: "mistakes", prompt: "Which is correct?", options: ["L'homme qui parle est professeur.", "L'homme que parle est professeur.", "L'homme dont parle est professeur."], correct: 0, explanation: "Qui is the subject (he speaks)." },
  { id: 12, topic: "mistakes", prompt: "Which is correct?", options: ["Le film que j'ai vu était bon.", "Le film qui j'ai vu était bon.", "Le film où j'ai vu était bon."], correct: 0, explanation: "Que is the object (I saw the film)." },
  { id: 13, topic: "comparison", prompt: "What's the difference between 'qui' and 'que'?", options: ["Subject vs object", "Place vs time", "Person vs thing"], correct: 0, explanation: "Qui = subject, que = direct object." },
  { id: 14, topic: "sentence-joining", prompt: "Join: 'C'est un ami. Je parle souvent de cet ami.'", options: ["C'est un ami dont je parle souvent.", "C'est un ami que je parle souvent.", "C'est un ami où je parle souvent."], correct: 0, explanation: "Parler de → use dont." },
  { id: 15, topic: "mixed", prompt: "Which pronoun is correct here: 'Le restaurant _____ nous avons dîné'?", options: ["où", "que", "qui"], correct: 0, explanation: "Où is used for place (where we dined)." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Relative pronouns take practice. Focus on subject vs object to choose between qui and que.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting better at choosing the right pronoun. Review dont and où once more.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using relative pronouns well. This skill is essential for complex sentences.", emoji: "🎉", color: "green" as const };
}
