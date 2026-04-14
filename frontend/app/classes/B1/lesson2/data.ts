// B1 Lesson 2 — Subjunctive Mood Basics
export const sectionIds = ["intro", "what-is-subjunctive", "triggers", "formation", "common-verbs", "vs-indicative", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Subjunctive Mood Basics",
  subtitle: "Learn when and why French uses the subjunctive mood.",
  lessonNumber: 2,
};

export const whatIsSubjunctive = [
  "The subjunctive expresses uncertainty, desire, emotion, or necessity.",
  "It often appears in dependent clauses introduced by 'que'.",
  "At B1 level, focus on recognizing and beginning to produce it.",
];

export const triggerPhrases = [
  { phrase: "il faut que", english: "it is necessary that", example: "Il faut que tu viennes.", exampleEnglish: "You must come." },
  { phrase: "je veux que", english: "I want that", example: "Je veux que tu réussisses.", exampleEnglish: "I want you to succeed." },
  { phrase: "il est important que", english: "it is important that", example: "Il est important que nous soyons ponctuels.", exampleEnglish: "It is important that we be punctual." },
  { phrase: "bien que", english: "although", example: "Bien qu'il pleuve, nous sortons.", exampleEnglish: "Although it is raining, we are going out." },
  { phrase: "pour que", english: "so that", example: "Je parle lentement pour que tu comprennes.", exampleEnglish: "I speak slowly so that you understand." },
  { phrase: "avant que", english: "before", example: "Viens avant qu'il parte.", exampleEnglish: "Come before he leaves." },
];

export const formationRules = [
  "Take the ils form of the present indicative, drop -ent, add subjunctive endings.",
  "Endings: -e, -es, -e, -ions, -iez, -ent",
];

export const regularExamples = [
  { infinitive: "parler", ils: "parlent", stem: "parl", je: "je parle", tu: "tu parles" },
  { infinitive: "finir", ils: "finissent", stem: "finiss", je: "je finisse", tu: "tu finisses" },
  { infinitive: "vendre", ils: "vendent", stem: "vend", je: "je vende", tu: "tu vendes" },
];

export const irregularSubjunctives = [
  { infinitive: "être", je: "sois", tu: "sois", il: "soit", nous: "soyons", vous: "soyez", ils: "soient" },
  { infinitive: "avoir", je: "aie", tu: "aies", il: "ait", nous: "ayons", vous: "ayez", ils: "aient" },
  { infinitive: "aller", je: "aille", tu: "ailles", il: "aille", nous: "allions", vous: "alliez", ils: "aillent" },
  { infinitive: "faire", je: "fasse", tu: "fasses", il: "fasse", nous: "fassions", vous: "fassiez", ils: "fassent" },
  { infinitive: "pouvoir", je: "puisse", tu: "puisses", il: "puisse", nous: "puissions", vous: "puissiez", ils: "puissent" },
  { infinitive: "savoir", je: "sache", tu: "saches", il: "sache", nous: "sachions", vous: "sachiez", ils: "sachent" },
  { infinitive: "vouloir", je: "veuille", tu: "veuilles", il: "veuille", nous: "voulions", vous: "vouliez", ils: "veuillent" },
];

export const subjunctiveVsIndicative = [
  { context: "Certainty / Fact", mood: "Indicative", example: "Je sais qu'il est là." },
  { context: "Doubt / Uncertainty", mood: "Subjunctive", example: "Je doute qu'il soit là." },
  { context: "Statement", mood: "Indicative", example: "Il dit qu'il vient." },
  { context: "Will / Desire", mood: "Subjunctive", example: "Je veux qu'il vienne." },
];

export const commonMistakes = [
  { wrong: "Je veux que tu viens.", correct: "Je veux que tu viennes.", explanation: "After expressions of will, use subjunctive, not indicative." },
  { wrong: "Il faut que je suis prudent.", correct: "Il faut que je sois prudent.", explanation: "Être becomes sois in subjunctive." },
  { wrong: "Bien que je suis fatigué.", correct: "Bien que je sois fatigué.", explanation: "Bien que always triggers subjunctive." },
];

export const practiceQuestions = [
  { id: 1, topic: "triggers", prompt: "Which phrase triggers the subjunctive?", options: ["Je sais que", "Il faut que", "Il dit que"], correct: 1, explanation: "Il faut que is a common subjunctive trigger." },
  { id: 2, topic: "triggers", prompt: "Which conjunction requires subjunctive?", options: ["Parce que", "Bien que", "Quand"], correct: 1, explanation: "Bien que (although) always triggers subjunctive." },
  { id: 3, topic: "formation", prompt: "What is the subjunctive of 'parler' for 'je'?", options: ["je parle", "je parlais", "je parlerai"], correct: 0, explanation: "Je parle is both present indicative and subjunctive for parler." },
  { id: 4, topic: "irregulars", prompt: "What is the subjunctive of 'être' for 'je'?", options: ["je suis", "je sois", "je soit"], correct: 1, explanation: "Je sois is the subjunctive of être." },
  { id: 5, topic: "irregulars", prompt: "What is the subjunctive of 'avoir' for 'nous'?", options: ["nous avons", "nous ayons", "nous ayez"], correct: 1, explanation: "Nous ayons is the subjunctive of avoir." },
  { id: 6, topic: "meaning", prompt: "What does 'pour que' mean?", options: ["because", "so that", "although"], correct: 1, explanation: "Pour que means so that and triggers subjunctive." },
  { id: 7, topic: "triggers", prompt: "Which phrase expresses desire and requires subjunctive?", options: ["Je veux que", "Je crois que", "Je pense que"], correct: 0, explanation: "Je veux que expresses will and requires subjunctive." },
  { id: 8, topic: "vs-indicative", prompt: "When do you use subjunctive instead of indicative?", options: ["For facts", "For doubt/desire", "For past events"], correct: 1, explanation: "Use subjunctive for doubt, desire, emotion, or necessity." },
  { id: 9, topic: "formation", prompt: "Complete: Il faut que tu _____ (finir).", options: ["finis", "finisses", "finisse"], correct: 2, explanation: "Il faut que tu finisse uses the subjunctive." },
  { id: 10, topic: "irregulars", prompt: "What is the subjunctive of 'faire' for 'il'?", options: ["il fait", "il fasse", "il faise"], correct: 1, explanation: "Il fasse is the subjunctive of faire." },
  { id: 11, topic: "triggers", prompt: "Which means 'before' and triggers subjunctive?", options: ["Après que", "Avant que", "Pendant que"], correct: 1, explanation: "Avant que triggers subjunctive; après que uses indicative." },
  { id: 12, topic: "meaning", prompt: "What does 'bien que' mean?", options: ["well that", "although", "so that"], correct: 1, explanation: "Bien que means although." },
  { id: 13, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Je veux que tu viens.", "Je veux que tu viennes.", "Je veux tu viennes."], correct: 1, explanation: "Use subjunctive after je veux que." },
  { id: 14, topic: "formation", prompt: "How do you form most regular subjunctives?", options: ["Take ils form, drop -ent, add endings", "Use present tense", "Use imparfait"], correct: 0, explanation: "Take ils form, drop -ent, add subjunctive endings." },
  { id: 15, topic: "irregulars", prompt: "What is the subjunctive of 'savoir' for 'je'?", options: ["je sais", "je sache", "je sache"], correct: 1, explanation: "Je sache is the subjunctive of savoir." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The subjunctive is challenging. Focus on recognizing trigger phrases and common irregular forms.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're starting to recognize subjunctive triggers. Review the difference between indicative and subjunctive contexts.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're understanding the subjunctive mood well. This is a major step forward in French grammar.", emoji: "🎉", color: "green" as const };
}
