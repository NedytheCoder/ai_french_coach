// B1 Lesson 7 — Past Subjunctive
export const sectionIds = ["intro", "when-to-use", "formation", "avoir-etre", "regular-verbs", "irregulars", "examples", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Past Subjunctive",
  subtitle: "Express completed actions in the subjunctive mood.",
  lessonNumber: 7,
};

export const whenToUse = [
  "When the subjunctive-triggering expression is in the present, but the action in the subjunctive clause happened before now.",
  "Example: 'Je regrette qu'il soit parti.' (I regret that he left - he left before now)",
  "Example: 'Il est bon que tu aies fini.' (It's good that you finished - already done)",
];

export const formationRules = [
  "Take the present subjunctive of avoir or être",
  "Add the past participle of the main verb",
  "Agreement rules apply for être verbs",
];

export const avoirEtre = [
  { auxiliary: "avoir", je: "j'aie", tu: "tu aies", il: "il ait", example: "J'aie fini", exampleVerb: "finir" },
  { auxiliary: "être", je: "je sois", tu: "tu sois", il: "il soit", example: "Je sois parti", exampleVerb: "partir" },
];

export const regularExamples = [
  { infinitive: "parler", auxiliary: "avoir", form: "que j'aie parlé", meaning: "that I spoke/have spoken" },
  { infinitive: "finir", auxiliary: "avoir", form: "que tu aies fini", meaning: "that you finished/have finished" },
  { infinitive: "partir", auxiliary: "être", form: "qu'il soit parti", meaning: "that he left/has left" },
  { infinitive: "aller", auxiliary: "être", form: "que nous soyons allés", meaning: "that we went/have gone" },
];

export const irregulars = [
  { infinitive: "faire", form: "que j'aie fait", note: "Uses avoir" },
  { infinitive: "voir", form: "que tu aies vu", note: "Uses avoir" },
  { infinitive: "venir", form: "qu'il soit venu", note: "Uses être" },
  { infinitive: "naître", form: "qu'elle soit née", note: "Uses être, agrees" },
];

export const usageExamples = [
  { trigger: "Je suis content", clause: "que tu aies réussi.", explanation: "Success happened before happiness" },
  { trigger: "Il est étonnant", clause: "qu'elle soit partie si tôt.", explanation: "Departure happened before surprise" },
  { trigger: "Je doute", clause: "qu'il ait dit cela.", explanation: "Speech happened before doubt" },
  { trigger: "Il faut", clause: "que vous ayez fini avant midi.", explanation: "Completion required before noon" },
];

export const agreementNote = [
  "With être verbs, the past participle agrees with the subject:",
  "Elle est partie (feminine) → qu'elle soit partie",
  "Ils sont partis (masculine plural) → qu'ils soient partis",
];

export const commonMistakes = [
  { wrong: "Je regrette qu'il part.", correct: "Je regrette qu'il soit parti.", explanation: "Use past subjunctive when the action is completed." },
  { wrong: "Il est bon que tu finisses.", correct: "Il est bon que tu aies fini.", explanation: "If already finished, use past subjunctive." },
  { wrong: "Je suis content qu'elle vienne.", correct: "Je suis content qu'elle soit venue.", explanation: "Use past subjunctive when referring to completed arrival." },
];

export const practiceQuestions = [
  { id: 1, topic: "when", prompt: "When do you use past subjunctive?", options: ["When action is completed before the main clause", "For future actions", "For habitual actions"], correct: 0, explanation: "Past subjunctive expresses actions completed before the main clause time." },
  { id: 2, topic: "formation", prompt: "How is the past subjunctive formed?", options: ["Present subjunctive of auxiliary + past participle", "Imparfait of auxiliary + past participle", "Passé composé only"], correct: 0, explanation: "Take avoir/être in present subjunctive + past participle." },
  { id: 3, topic: "avoir", prompt: "What is the auxiliary avoir in present subjunctive for 'je'?", options: ["j'aie", "j'ai", "j'avais"], correct: 0, explanation: "J'aie is the present subjunctive of avoir." },
  { id: 4, topic: "etre", prompt: "What is the auxiliary être in present subjunctive for 'nous'?", options: ["nous soyons", "nous sommes", "nous étions"], correct: 0, explanation: "Nous soyons is the present subjunctive of être." },
  { id: 5, topic: "example", prompt: "Complete: Je suis content que tu _____ (finir).", options: ["aies fini", "finisses", "as fini"], correct: 0, explanation: "Past subjunctive: aie (auxiliary) + fini." },
  { id: 6, topic: "example", prompt: "Complete: Il est étonnant qu'elle _____ (partir).", options: ["soit partie", "parte", "est partie"], correct: 0, explanation: "Partir uses être: soit (auxiliary) + partie." },
  { id: 7, topic: "agreement", prompt: "Should there be agreement in 'qu'elles soient parties'?", options: ["Yes, -es added", "No agreement", "Only in spoken French"], correct: 0, explanation: "With être and feminine plural subject, add -es." },
  { id: 8, topic: "auxiliary", prompt: "Which auxiliary does 'faire' use in past subjunctive?", options: ["avoir", "être", "Either"], correct: 0, explanation: "Faire uses avoir in compound tenses." },
  { id: 9, topic: "auxiliary", prompt: "Which auxiliary does 'venir' use in past subjunctive?", options: ["être", "avoir", "Either"], correct: 0, explanation: "Venir uses être in compound tenses." },
  { id: 10, topic: "meaning", prompt: "What does 'que j'aie fini' mean?", options: ["that I finished/have finished", "that I finish", "that I will finish"], correct: 0, explanation: "Past subjunctive = completed action." },
  { id: 11, topic: "mistakes", prompt: "Which is correct for completed action?", options: ["Je regrette qu'il soit parti.", "Je regrette qu'il part.", "Je regrette qu'il parte."], correct: 0, explanation: "Use past subjunctive for completed departure." },
  { id: 12, topic: "mistakes", prompt: "Which is correct?", options: ["Il est bon que tu aies fini.", "Il est bon que tu finisses.", "Il est bon que tu as fini."], correct: 0, explanation: "Use past subjunctive for completed action." },
  { id: 13, topic: "meaning", prompt: "What does 'qu'elle soit venue' mean?", options: ["that she came/has come", "that she comes", "that she will come"], correct: 0, explanation: "Past subjunctive = completed arrival." },
  { id: 14, topic: "formation", prompt: "Complete: Je doute qu'il _____ (dire) la vérité.", options: ["ait dit", "dise", "dit"], correct: 0, explanation: "Past subjunctive of dire: ait + dit." },
  { id: 15, topic: "usage", prompt: "Why use past subjunctive in 'Il faut que vous ayez fini'?", options: ["Completion required before deadline", "Future requirement", "Habitual action"], correct: 0, explanation: "Past subjunctive shows completion is required." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The past subjunctive combines two complex concepts. Review avoir/être in present subjunctive + past participles.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting the hang of past subjunctive formation. Review être verb agreements once more.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using the past subjunctive well. This is advanced French grammar mastery.", emoji: "🎉", color: "green" as const };
}
