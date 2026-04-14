// B2 Lesson 8 — Advanced Relative Pronouns
export const sectionIds = ["intro", "qui-que-ou", "dont", "lequel", "ce-qui-que", "advanced-dont", "preposition", "practice", "completion"];

export const lessonMeta = {
  title: "Advanced Relative Pronouns",
  subtitle: "Master the complete relative pronoun system: qui, que, où, dont, lequel forms, ce qui/que, and complex prepositional structures.",
  lessonNumber: 8,
};

export const introSections = [
  {
    title: "Beyond Basic Relatives",
    content: "At B2, you move beyond simple qui/que sentences. You need dont (whose/of which), lequel forms (for prepositions), ce qui/ce que (what/which), and sophisticated sentences with multiple clauses.",
  },
  {
    title: "The Logic of Relative Pronouns",
    content: "Relative pronouns connect ideas while clarifying grammatical relationships. Each has a specific function: qui as subject, que as direct object, où as place/time, dont for de relationships, lequel for à/de + things.",
  },
];

export const basicReview = {
  title: "Qui, Que, Où Review",
  summary: [
    { pronoun: "qui", function: "Subject", example: "L'homme qui parle est mon oncle.", analysis: "Qui = subject of 'parle'" },
    { pronoun: "que", function: "Direct object", example: "Le livre que je lis est excellent.", analysis: "Que = object of 'lis'" },
    { pronoun: "où", function: "Place or time", example: "La ville où j'habite / Le moment où il est parti", analysis: "Où = in which / when" },
  ],
};

export const dontSection = {
  title: "Dont: The 'De' Relationship",
  explanation: "Dont replaces de + thing. It expresses possession, origin, topic, and partitive relationships.",
  uses: [
    { type: "Possession", example: "L'homme dont la fille est médecin", meaning: "Whose daughter (the man's daughter)" },
    { type: "Topic (parler de)", example: "Le film dont je t'ai parlé", meaning: "That I talked about" },
    { type: "Origin (venir de)", example: "Le village dont il vient", meaning: "He comes from" },
    { type: "Partitive (avoir besoin de)", example: "Les choses dont j'ai besoin", meaning: "That I need" },
    { type: "Content (être plein de)", example: "La boîte dont elle est pleine", meaning: "Full of which" },
  ],
  wordOrder: "Dont + subject + verb + object (normal word order)",
};

export const lequelSection = {
  title: "Lequel Forms: After Prepositions",
  explanation: "When you need à + thing or de + thing as relative, use lequel forms. They must agree with the antecedent.",
  forms: [
    { form: "lequel", gender: "masc singular", example: "Le stylo avec lequel j'écris" },
    { form: "laquelle", gender: "fem singular", example: "La table sur laquelle je travaille" },
    { form: "lesquels", gender: "masc plural", example: "Les livres dans lesquels je cherche" },
    { form: "lesquelles", gender: "fem plural", example: "Les maisons devant lesquelles nous sommes" },
  ],
  contractions: [
    { preposition: "à + lequel", becomes: "auquel", example: "Le bureau auquel je pense" },
    { preposition: "à + lesquels", becomes: "auxquels", example: "Les problèmes auxquels nous faisons face" },
    { preposition: "de + lequel", becomes: "duquel", example: "L'auteur duquel je me souviens" },
    { preposition: "de + lesquels", becomes: "desquels", example: "Les conséquences desquels je doute" },
  ],
};

export const ceQuiQueSection = {
  title: "Ce qui, Ce que, Ce dont: Indefinite Relatives",
  explanation: "When there's no specific antecedent, use ce + relative pronoun. These mean 'what/which' as indefinite concepts.",
  usage: [
    { pronoun: "ce qui", function: "Subject (what/which)", example: "Ce qui me plaît, c'est sa simplicité.", analysis: "Ce qui = subject of 'plaît'" },
    { pronoun: "ce que", function: "Object (what/which)", example: "Je comprends ce que tu dis.", analysis: "Ce que = object of 'dis'" },
    { pronoun: "ce dont", function: "De + thing (what)", example: "Je sais ce dont tu as besoin.", analysis: "Ce dont = de ce que = what...of" },
    { pronoun: "ce à quoi", function: "À + thing (what)", example: "C'est ce à quoi je pensais.", analysis: "Ce à quoi = à ce que = what...to" },
  ],
};

export const advancedDont = {
  title: "Advanced Dont: Complex Sentences",
  explanation: "Dont becomes powerful in complex constructions combining multiple relationships.",
  examples: [
    { sentence: "C'est un problème dont nous ne connaissons pas la solution.", analysis: "Dont = de ce problème, la solution de ce problème" },
    { sentence: "Les personnes dont je vous ai parlé arrivent.", analysis: "Dont = de ces personnes, parler de" },
    { sentence: "Voici le livre dont l'auteur est célèbre.", analysis: "Dont = de ce livre, l'auteur du livre (possession)" },
  ],
};

export const prepositionSection = {
  title: "Preposition + Relative: Complex Structures",
  explanation: "When a preposition precedes the relative, the pronoun choice depends on what follows.",
  rules: [
    { preposition: "Preposition + person", pronoun: "qui (always)", example: "L'homme avec qui je parle", note: "Person after prep = qui" },
    { preposition: "Preposition + thing", pronoun: "lequel or où (place)", example: "Le pays dans lequel/dans lequel je vis", note: "Thing after prep = lequel" },
    { preposition: "De + person", pronoun: "qui (colloquial) / duquel (formal)", example: "L'homme de qui/duquel je parle", note: "Both possible, qui more common" },
  ],
};

export const practiceQuestions = [
  { id: 1, topic: "qui", prompt: "'L'homme _____ parle est mon frère'", options: ["qui", "que", "dont"], correct: 0, explanation: "Qui = subject of parle" },
  { id: 2, topic: "que", prompt: "'Le livre _____ je lis'", options: ["que", "qui", "dont"], correct: 0, explanation: "Que = direct object" },
  { id: 3, topic: "dont", prompt: "'L'homme _____ la fille est médecin'", options: ["dont", "que", "lequel"], correct: 0, explanation: "Dont = possession (whose daughter)" },
  { id: 4, topic: "dont-parler", prompt: "'Le film _____ je t'ai parlé'", options: ["dont", "que", "où"], correct: 0, explanation: "Dont = parler DE quelque chose" },
  { id: 5, topic: "lequel", prompt: "'Le stylo avec _____ j'écris'", options: ["lequel", "qui", "que"], correct: 0, explanation: "Lequel after preposition + thing" },
  { id: 6, topic: "contraction", prompt: "'Le problème à _____ je pense'", options: ["lequel (auquel)", "qui", "que"], correct: 0, explanation: "À + lequel = auquel" },
  { id: 7, topic: "ce-qui", prompt: "'_____ me plaît, c'est ta simplicité'", options: ["Ce qui", "Ce que", "Ce dont"], correct: 0, explanation: "Ce qui = subject of plaît" },
  { id: 8, topic: "ce-que", prompt: "'Je comprends _____ tu dis'", options: ["ce que", "ce qui", "ce dont"], correct: 0, explanation: "Ce que = object of dis" },
  { id: 9, topic: "ce-dont", prompt: "'Je sais _____ tu as besoin'", options: ["ce dont", "ce que", "ce qui"], correct: 0, explanation: "Ce dont = avoir besoin DE" },
  { id: 10, topic: "person-prep", prompt: "'L'homme avec _____ je parle'", options: ["qui", "que", "lequel"], correct: 0, explanation: "Preposition + person = qui" },
  { id: 11, topic: "ou", prompt: "'La ville _____ j'habite'", options: ["où", "que", "dont"], correct: 0, explanation: "Où = in which place" },
  { id: 12, topic: "auquel", prompt: "'Le problème auquel' =", options: ["à + lequel", "de + lequel", "avec + lequel"], correct: 0, explanation: "Auquel = à + lequel" },
  { id: 13, topic: "feminin", prompt: "'La table sur _____ je mets'", options: ["laquelle", "lequel", "lesquelles"], correct: 0, explanation: "Laquelle = feminine singular" },
  { id: 14, topic: "duquel", prompt: "'L'auteur _____ je parle' (formal)", options: ["duquel", "dont", "qui"], correct: 0, explanation: "Duquel = de + lequel (formal alternative to dont)" },
  { id: 15, topic: "complex", prompt: "'Les personnes _____ je vous ai parlé'", options: ["dont", "desquels", "que"], correct: 0, explanation: "Parler DE quelqu'un = dont" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Relative pronouns require practice. Focus on qui=subject, que=object, dont=de-relationship, lequel=after prepositions.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are mastering relative pronouns. Review ce qui/que/dont and lequel contractions.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand the complete relative pronoun system. You can construct sophisticated relative clauses with precision.", emoji: "🌟", color: "green" as const };
}
