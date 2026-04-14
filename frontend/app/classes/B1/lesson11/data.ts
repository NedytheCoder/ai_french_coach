// B1 Lesson 11 — All Relative Pronouns
export const sectionIds = ["intro", "qui", "que", "ou", "dont", "lequel", "ce-qui-que", "summary", "practice", "completion"];

export const lessonMeta = {
  title: "All Relative Pronouns",
  subtitle: "Master the complete set of French relative pronouns for complex sentences.",
  lessonNumber: 11,
};

export const quiSummary = {
  usage: "Subject (who/which/that)",
  examples: ["L'homme qui parle", "Le livre qui est sur la table"],
  tip: "Qui is followed by a verb",
};

export const queSummary = {
  usage: "Direct object (whom/which/that)",
  examples: ["Le livre que je lis", "La personne que j'ai vue"],
  tip: "Que is followed by subject + verb",
};

export const ouSummary = {
  usage: "Place or time (where/when)",
  examples: ["La maison où j'habite", "Le jour où je suis arrivé"],
  tip: "For location or time reference",
};

export const dontSummary = {
  usage: "Of which/whose/with de",
  examples: ["Le livre dont je parle", "La personne dont je me souviens"],
  tip: "Replaces de + noun",
};

export const lequelForms = [
  { form: "lequel", gender: "masculine singular", example: "Le stylo avec lequel j'écris" },
  { form: "laquelle", gender: "feminine singular", example: "La chaise sur laquelle je suis assis" },
  { form: "lesquels", gender: "masculine plural", example: "Les livres dans lesquels je cherche" },
  { form: "lesquelles", gender: "feminine plural", example: "Les maisons devant lesquelles je passe" },
];

export const ceQuiCeQue = [
  { pronoun: "ce qui", usage: "Subject (what/which)", example: "Ce qui me surprend, c'est sa réaction.", explanation: "When no specific antecedent, use ce qui as subject" },
  { pronoun: "ce que", usage: "Direct object (what)", example: "Ce que je veux, c'est la vérité.", explanation: "When no specific antecedent, use ce que as object" },
  { pronoun: "ce dont", usage: "With de (what/about which)", example: "Ce dont je parle est important.", explanation: "When no specific antecedent with de" },
];

export const quickReference = [
  { situation: "Subject does action", pronoun: "qui", example: "Le chat qui dort" },
  { situation: "Receives action", pronoun: "que", example: "Le chat que je vois" },
  { situation: "Place/time", pronoun: "où", example: "La ville où je vis" },
  { situation: "With de", pronoun: "dont", example: "L'homme dont je parle" },
  { situation: "After preposition", pronoun: "lequel/dont", example: "Le stylo avec lequel" },
  { situation: "No antecedent", pronoun: "ce qui/ce que/ce dont", example: "Ce qui est vrai" },
];

export const practiceQuestions = [
  { id: 1, topic: "qui", prompt: "Which pronoun as subject?", options: ["qui", "que", "dont"], correct: 0, explanation: "Qui = subject pronoun" },
  { id: 2, topic: "que", prompt: "Which pronoun as direct object?", options: ["qui", "que", "dont"], correct: 1, explanation: "Que = direct object pronoun" },
  { id: 3, topic: "ou", prompt: "Which for place/time?", options: ["où", "que", "qui"], correct: 0, explanation: "Où = where/when" },
  { id: 4, topic: "dont", prompt: "Which with de verbs?", options: ["dont", "que", "qui"], correct: 0, explanation: "Dont replaces de + noun" },
  { id: 5, topic: "lequel", prompt: "Which after 'avec'?", options: ["lequel", "que", "qui"], correct: 0, explanation: "Lequel follows prepositions" },
  { id: 6, topic: "lequel", prompt: "What is 'laquelle' for?", options: ["Feminine singular", "Masculine singular", "Plural"], correct: 0, explanation: "Laquelle = feminine singular" },
  { id: 7, topic: "ce-qui", prompt: "When to use 'ce qui'?", options: ["No antecedent as subject", "With a specific noun", "As object"], correct: 0, explanation: "Ce qui = what (no antecedent, subject)" },
  { id: 8, topic: "ce-que", prompt: "Complete: _____ je veux, c'est la paix.", options: ["Ce que", "Ce qui", "Ce dont"], correct: 0, explanation: "Ce que = what (object)" },
  { id: 9, topic: "summary", prompt: "Complete: Le livre _____ est sur la table est à moi.", options: ["qui", "que", "dont"], correct: 0, explanation: "Qui as subject (the book is on the table)" },
  { id: 10, topic: "summary", prompt: "Complete: Le livre _____ je lis est intéressant.", options: ["que", "qui", "dont"], correct: 0, explanation: "Que as object (I read the book)" },
  { id: 11, topic: "summary", prompt: "Complete: La maison _____ j'habite est vieille.", options: ["où", "que", "qui"], correct: 0, explanation: "Où for place (where I live)" },
  { id: 12, topic: "dont", prompt: "Complete: L'histoire _____ il parle est vraie.", options: ["dont", "que", "qui"], correct: 0, explanation: "Parler de → dont" },
  { id: 13, topic: "lequel", prompt: "Complete: Le stylo _____ j'écris est rouge.", options: ["avec lequel", "avec que", "avec qui"], correct: 0, explanation: "Lequel follows prepositions like avec" },
  { id: 14, topic: "ce-qui", prompt: "Complete: _____ m'intéresse, c'est l'art.", options: ["Ce qui", "Ce que", "Ce dont"], correct: 0, explanation: "Ce qui as subject (what interests me)" },
  { id: 15, topic: "mixed", prompt: "Complete: C'est la personne _____ je pense souvent.", options: ["dont", "que", "qui"], correct: 0, explanation: "Penser de → dont" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Relative pronouns are complex. Focus on subject vs object and the lequel forms.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting all the relative pronouns. Review ce qui/ce que/ce dont once more.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You know all the relative pronouns! This allows you to build very complex sentences.", emoji: "🎉", color: "green" as const };
}
