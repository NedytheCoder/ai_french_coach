// B2 Lesson 9 — Advanced Pronoun System
export const sectionIds = ["intro", "double-object", "position", "y-en", "advanced-order", "emphasis", "stylistic", "practice", "completion"];

export const lessonMeta = {
  title: "Advanced Pronoun System",
  subtitle: "Master double object pronouns, y and en in all positions, and sophisticated pronoun ordering for elegant French expression.",
  lessonNumber: 9,
};

export const introSections = [
  {
    title: "The Pronoun Matrix",
    content: "French pronouns are precise tools for reference. At B2, you combine them efficiently: me/te/se/nous/vous before le/la/les before lui/leur before y before en. This order reflects grammatical hierarchy.",
  },
  {
    title: "Pronouns as Cohesion",
    content: "Pronouns create cohesion in discourse. They avoid repetition while maintaining clarity. Understanding their placement rules allows you to construct fluid, sophisticated sentences.",
  },
];

export const doubleObjectSection = {
  title: "Double Object Pronouns",
  explanation: "When two pronouns combine, they follow a strict order based on grammatical function.",
  orderRule: "me/te/se/nous/vous → le/la/les → lui/leur → y → en",
  examples: [
    { pronouns: "me + le", combined: "Il me le donne.", analysis: "Indirect (me) + direct (le)" },
    { pronouns: "te + la", combined: "Elle te la montre.", analysis: "Indirect (te) + direct (la)" },
    { pronouns: "nous + les", combined: "Ils nous les envoient.", analysis: "Indirect (nous) + direct (les)" },
    { pronouns: "le + lui", combined: "Je le lui donne.", analysis: "Direct (le) + indirect (lui) - 3rd person order flips" },
    { pronouns: "lui + y", combined: "Il y lui répond.", analysis: "Indirect + location (y)" },
    { pronouns: "le + en", combined: "Je l'en prie.", analysis: "Direct (le/en contraction) + quantity (en)" },
  ],
};

export const positionSection = {
  title: "Pronoun Position: Affirmative, Negative, Imperative",
  explanation: "Pronoun position changes based on sentence type.",
  positions: [
    { type: "Affirmative", rule: "Before conjugated verb", example: "Je le lui donne." },
    { type: "Infinitive", rule: "Before infinitive", example: "Je vais le lui donner." },
    { type: "Negative", rule: "Before verb (same position)", example: "Je ne le lui donne pas." },
    { type: "Imperative affirmative", rule: "After verb with hyphen", example: "Donne-le-moi!" },
    { type: "Imperative negative", rule: "Before verb (normal position)", example: "Ne me le donne pas." },
  ],
  imperativeNote: "me → moi after imperative; te → toi; keep hyphen",
};

export const yEnSection = {
  title: "Y and En: Adverbial Pronouns",
  explanation: "Y replaces à + place/thing; en replaces de + thing/quantity. They follow all other pronouns.",
  yUses: [
    { use: "À + place", example: "Je vais à Paris → J'y vais.", note: "Location replacement" },
    { use: "À + thing (non-person)", example: "Je pense à ce problème → J'y pense.", note: "Abstract thing" },
    { use: "In + location", example: "Il est dans la maison → Il y est.", note: "Dans becomes y" },
  ],
  enUses: [
    { use: "De + thing", example: "Je parle de ce livre → J'en parle.", note: "Topic replacement" },
    { use: "Partitive (some/any)", example: "Je veux du pain → J'en veux.", note: "Quantity/partitive" },
    { use: "Number/quantity + de", example: "J'ai trois livres → J'en ai trois.", note: "Keep the number" },
    { use: "Adverbial de", example: "Je viens de France → J'en viens.", note: "Origin" },
  ],
  together: "Il y en a. (There are some.) - Y and en can coexist with y first.",
};

export const advancedOrderSection = {
  title: "Complex Pronoun Combinations",
  explanation: "Three or more pronouns create sophisticated but precise constructions.",
  examples: [
    { combination: "me + le + lui", sentence: "Il me le lui donne.", breakdown: "me (1st), le (2nd), lui (3rd)" },
    { combination: "le + en", sentence: "Je l'en prie.", note: "Le + en → l'en (elision)" },
    { combination: "y + en", sentence: "Il y en a.", note: "Y before en" },
  ],
  trickyCases: [
    { case: "Imperative with moi/toi", normal: "Il me le donne.", imperative: "Donne-le-moi!", note: "Me becomes moi after imperative" },
    { case: "Neuter le", example: "Je le sais.", note: "Le = the fact (not replaceable by en or y)" },
  ],
};

export const practiceQuestions = [
  { id: 1, topic: "order", prompt: "'Il _____ donne' (me + le)", options: ["me le", "le me", "m'en"], correct: 0, explanation: "Indirect before direct: me + le" },
  { id: 2, topic: "3rd-person", prompt: "'Je _____ donne' (le + lui)", options: ["le lui", "lui le", "le leur"], correct: 0, explanation: "Direct before indirect for 3rd person" },
  { id: 3, topic: "y", prompt: "'J'_____ vais' (à Paris)", options: ["y", "en", "lui"], correct: 0, explanation: "Y = à + place" },
  { id: 4, topic: "en", prompt: "'J'_____ parle' (de ce livre)", options: ["en", "y", "le"], correct: 0, explanation: "En = de + thing" },
  { id: 5, topic: "imperative", prompt: "Imperative: 'Give it to me!'", options: ["Donne-le-moi!", "Donne-me-le!", "Me le donne!"], correct: 0, explanation: "After imperative: verb-pronoun-hyphen, moi not me" },
  { id: 6, topic: "imperative-negative", prompt: "Negative imperative: 'Don't give it to me'", options: ["Ne me le donne pas!", "Ne donne-le-moi pas!", "Ne me donne pas le!"], correct: 0, explanation: "Negative imperative = normal position before verb" },
  { id: 7, topic: "infinitive", prompt: "Infinitive: 'I'm going to give it to him'", options: ["Je vais le lui donner.", "Je vais lui le donner.", "Je le vais lui donner."], correct: 0, explanation: "Pronouns before infinitive, 3rd person order" },
  { id: 8, topic: "en-quantity", prompt: "'I have three' (books)", options: ["J'en ai trois.", "Je les ai trois.", "J'y ai trois."], correct: 0, explanation: "En + number for quantity" },
  { id: 9, topic: "y-en", prompt: "'There are some' (apples)", options: ["Il y en a.", "Il en y a.", "Il les y a."], correct: 0, explanation: "Y before en: Il y en a" },
  { id: 10, topic: "partitive", prompt: "'I want some' (bread)", options: ["J'en veux.", "Je le veux.", "J'y veux."], correct: 0, explanation: "En = partitive (du pain)" },
  { id: 11, topic: "elision", prompt: "'Je l'en prie' - the l' is:", options: ["Le with elision before en", "La with elision", "Lui abbreviated"], correct: 0, explanation: "Le + en → l'en (elision)" },
  { id: 12, topic: "neuter", prompt: "'Je le sais' - le refers to:", options: ["A fact/truth (neuter)", "A masculine object", "A person"], correct: 0, explanation: "Le can be neuter (the fact)" },
  { id: 13, topic: "lui-leur", prompt: "Lui and leur are:", options: ["Only for people (indirect)", "For things too", "Direct objects"], correct: 0, explanation: "Lui/leur = indirect, people only" },
  { id: 14, topic: "moi-toi", prompt: "After affirmative imperative, me becomes:", options: ["moi", "me", "lui"], correct: 0, explanation: "Donne-le-moi (not me)" },
  { id: 15, topic: "y-location", prompt: "Y replaces:", options: ["À + place", "De + thing", "Direct object"], correct: 0, explanation: "Y = à + place/thing" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Pronoun order takes practice. Focus on the sequence: indirect (1st/2nd) → direct → indirect (3rd) → y → en.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are mastering pronoun combinations. Focus on imperative position and elision rules.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You navigate complex pronoun combinations with ease. Your French flows naturally with proper pronoun placement.", emoji: "🌟", color: "green" as const };
}
