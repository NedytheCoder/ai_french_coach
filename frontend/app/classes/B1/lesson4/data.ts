// B1 Lesson 4 — Reported Speech
export const sectionIds = ["intro", "direct-vs-reported", "reporting-statements", "reporting-questions", "tense-changes", "common-verbs", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Reported Speech",
  subtitle: "Learn how to report what others say in French.",
  lessonNumber: 4,
};

export const directVsReported = [
  { direct: "Marie dit : 'Je suis fatiguée.'", reported: "Marie dit qu'elle est fatiguée.", explanation: "Change pronouns and sometimes tense" },
  { direct: "Il demande : 'Tu viens ?'", reported: "Il demande si je viens.", explanation: "Use si for yes/no questions" },
];

export const reportingVerbs = [
  { verb: "dire que", english: "say that", example: "Il dit qu'il arrivera demain." },
  { verb: "expliquer que", english: "explain that", example: "Elle explique que c'est difficile." },
  { verb: "demander si", english: "ask if", example: "Je demande s'il va pleuvoir." },
  { verb: "demander pourquoi", english: "ask why", example: "Elle demande pourquoi je suis en retard." },
  { verb: "savoir si", english: "know if", example: "Je ne sais pas si c'est vrai." },
];

export const statementExamples = [
  { speaker: "Marie : 'Je suis malade.'", reported: "Marie dit qu'elle est malade.", note: "Pronoun changes: je → elle" },
  { speaker: "Paul : 'Je vais partir.'", reported: "Paul dit qu'il va partir.", note: "Pronoun changes: je → il" },
  { speaker: "Ils : 'Nous avons fini.'", reported: "Ils disent qu'ils ont fini.", note: "Pronoun changes: nous → ils" },
];

export const questionExamples = [
  { direct: "Elle demande : 'Tu aimes le café ?'", reported: "Elle demande si j'aime le café.", type: "Yes/No question → si" },
  { direct: "Il demande : 'Pourquoi es-tu triste ?'", reported: "Il demande pourquoi je suis triste.", type: "WH-question → same word" },
  { direct: "Ils demandent : 'Quand partez-vous ?'", reported: "Ils demandent quand nous partons.", type: "WH-question → quand" },
];

export const tenseConsistency = [
  { present: "Il dit : 'Je suis fatigué.'", reported: "Il dit qu'il est fatigué.", explanation: "Present → present (no change if reporting verb is present)" },
  { present: "Il a dit : 'Je suis fatigué.'", reported: "Il a dit qu'il était fatigué.", explanation: "Present → imparfait (if reporting verb is past)" },
];

export const commonMistakes = [
  { wrong: "Elle dit je suis fatiguée.", correct: "Elle dit qu'elle est fatiguée.", explanation: "Use que and change pronouns." },
  { wrong: "Il demande que tu viens.", correct: "Il demande si tu viens.", explanation: "Use si for yes/no questions, not que." },
  { wrong: "Elle dit 'je suis fatiguée'.", correct: "Elle dit qu'elle est fatiguée.", explanation: "Remove quotation marks and adjust." },
  { wrong: "Je demande qu'est-ce que tu fais.", correct: "Je demande ce que tu fais.", explanation: "Simplify indirect questions." },
];

export const practiceQuestions = [
  { id: 1, topic: "reporting-verbs", prompt: "Which verb means 'to say that'?", options: ["dire que", "demander si", "savoir que"], correct: 0, explanation: "Dire que means 'to say that'." },
  { id: 2, topic: "reporting-verbs", prompt: "Which phrase is used for yes/no questions?", options: ["demander si", "dire que", "expliquer que"], correct: 0, explanation: "Demander si introduces yes/no questions in reported speech." },
  { id: 3, topic: "statements", prompt: "Convert: Marie dit : 'Je suis fatiguée.'", options: ["Marie dit qu'elle est fatiguée.", "Marie dit je suis fatiguée.", "Marie dit que je suis fatiguée."], correct: 0, explanation: "Change je to elle when reporting." },
  { id: 4, topic: "statements", prompt: "Convert: Paul dit : 'J'ai fini.'", options: ["Paul dit qu'il a fini.", "Paul dit j'ai fini.", "Paul dit que j'ai fini."], correct: 0, explanation: "Change j' to il when reporting." },
  { id: 5, topic: "questions", prompt: "Convert: Elle demande : 'Tu viens ?'", options: ["Elle demande si je viens.", "Elle demande que je viens.", "Elle demande pourquoi je viens."], correct: 0, explanation: "Use si for yes/no questions." },
  { id: 6, topic: "questions", prompt: "Convert: Il demande : 'Pourquoi es-tu en retard ?'", options: ["Il demande pourquoi je suis en retard.", "Il demande si je suis en retard.", "Il demande que je suis en retard."], correct: 0, explanation: "WH-questions keep their question word." },
  { id: 7, topic: "pronoun-change", prompt: "When reporting 'je', what pronoun should you use for a female speaker?", options: ["elle", "il", "je"], correct: 0, explanation: "Je becomes elle when the speaker is female." },
  { id: 8, topic: "pronoun-change", prompt: "When reporting 'nous', what is the typical change?", options: ["ils/elles", "je", "tu"], correct: 0, explanation: "Nous typically becomes ils/elles in reported speech." },
  { id: 9, topic: "mistakes", prompt: "Which is correct?", options: ["Elle dit qu'elle est fatiguée.", "Elle dit je suis fatiguée.", "Elle dit 'je suis fatiguée'."], correct: 0, explanation: "Use que and change pronouns." },
  { id: 10, topic: "tense", prompt: "If the reporting verb is in present tense, what happens to the reported tense?", options: ["Usually stays the same", "Always changes to past", "Always changes to future"], correct: 0, explanation: "If dire is present, the reported tense often stays the same." },
  { id: 11, topic: "questions", prompt: "What word introduces reported yes/no questions?", options: ["si", "que", "pourquoi"], correct: 0, explanation: "Si introduces yes/no questions in reported speech." },
  { id: 12, topic: "reporting-verbs", prompt: "Which means 'to explain that'?", options: ["expliquer que", "dire que", "demander que"], correct: 0, explanation: "Expliquer que means to explain that." },
  { id: 13, topic: "questions", prompt: "Convert: Ils demandent : 'Quand partez-vous ?'", options: ["Ils demandent quand nous partons.", "Ils demandent si nous partons.", "Ils demandent que nous partons."], correct: 0, explanation: "Quand remains in reported speech." },
  { id: 14, topic: "statements", prompt: "What punctuation change happens in reported speech?", options: ["Remove quotation marks", "Add more quotation marks", "Keep everything the same"], correct: 0, explanation: "Remove quotation marks in reported speech." },
  { id: 15, topic: "mixed", prompt: "Which is correct reported speech?", options: ["Elle demande si je suis prêt.", "Elle demande que je suis prêt.", "Elle demande je suis prêt."], correct: 0, explanation: "Use si for yes/no questions." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Reported speech takes practice. Focus on pronoun changes and using si for questions.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting better at converting speech. Review tense consistency and question patterns.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're handling reported speech well. This is an important skill for complex communication.", emoji: "🎉", color: "green" as const };
}
