// B1 Lesson 9 — Futur Antérieur
export const sectionIds = ["intro", "what-is", "formation", "avoir-etre", "usage", "examples", "vs-future", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Futur Antérieur",
  subtitle: "Express actions that will have been completed before another future action.",
  lessonNumber: 9,
};

export const whatIs = [
  "The futur antérieur describes an action that will be completed before another future action.",
  "It's the future perfect tense in English: 'will have + past participle'.",
  "Example: 'J'aurai fini avant midi.' (I will have finished before noon)",
];

export const formationRules = [
  "Take the future tense of avoir or être",
  "Add the past participle of the main verb",
  "Agreement rules apply for être verbs",
];

export const avoirEtre = [
  { auxiliary: "avoir", je: "j'aurai", tu: "tu auras", il: "il aura", nous: "nous aurons" },
  { auxiliary: "être", je: "je serai", tu: "tu seras", il: "il sera", nous: "nous serons" },
];

export const usageCases = [
  { case: "Completed before future", example: "Quand tu arriveras, j'aurai fini.", explanation: "I will have finished before you arrive" },
  { case: "Hypothesis about past", example: "Il aura oublié.", explanation: "He must have forgotten (supposition)" },
  { case: "Independent action", example: "Dans deux ans, j'aurai fini mes études.", explanation: "In two years, I will have completed my studies" },
];

export const examples = [
  { futur: "Je finirai mon travail.", futurAnt: "J'aurai fini mon travail avant 18h.", explanation: "Simple future vs completed before a time" },
  { futur: "Elle partira.", futurAnt: "Elle sera déjà partie quand nous arriverons.", explanation: "Future vs completed before another action" },
];

export const commonMistakes = [
  { wrong: "Quand tu viendras, je finirai.", correct: "Quand tu viendras, j'aurai fini.", explanation: "If you want to say you'll be done by the time someone comes, use futur antérieur." },
  { wrong: "Dans un an, je finis mes études.", correct: "Dans un an, j'aurai fini mes études.", explanation: "For completed future actions, use futur antérieur." },
];

export const practiceQuestions = [
  { id: 1, topic: "what-is", prompt: "What does futur antérieur express?", options: ["Future action completed before another", "Simple future", "Past action"], correct: 0, explanation: "Futur antérieur = action completed before another future action." },
  { id: 2, topic: "formation", prompt: "How is futur antérieur formed?", options: ["Future auxiliary + past participle", "Present auxiliary + past participle", "Conditional auxiliary + past participle"], correct: 0, explanation: "Take avoir/être in future + past participle." },
  { id: 3, topic: "avoir", prompt: "What is the future of avoir for 'je'?", options: ["j'aurai", "j'aurais", "j'ai"], correct: 0, explanation: "J'aurai is the future of avoir." },
  { id: 4, topic: "etre", prompt: "What is the future of être for 'nous'?", options: ["nous serons", "nous serions", "nous sommes"], correct: 0, explanation: "Nous serons is the future of être." },
  { id: 5, topic: "usage", prompt: "Complete: Quand tu arriveras, je _____ (finir).", options: ["j'aurai fini", "je finirai", "je finis"], correct: 0, explanation: "Use futur antérieur for completed action before another future action." },
  { id: 6, topic: "meaning", prompt: "What does 'J'aurai fini avant midi' mean?", options: ["I will have finished before noon", "I will finish before noon", "I have finished before noon"], correct: 0, explanation: "Futur antérieur = will have finished." },
  { id: 7, topic: "usage", prompt: "Which expresses hypothesis about the past?", options: ["Il aura oublié.", "Il oubliera.", "Il oublie."], correct: 0, explanation: "Futur antérieur can express supposition about something already happened." },
  { id: 8, topic: "mistakes", prompt: "Which is correct for completed future?", options: ["Dans un an, j'aurai fini.", "Dans un an, je finis.", "Dans un an, je finirai."], correct: 0, explanation: "Futur antérieur for completed action in the future." },
  { id: 9, topic: "auxiliary", prompt: "Which auxiliary does 'manger' use in futur antérieur?", options: ["avoir", "être", "Either"], correct: 0, explanation: "Most verbs use avoir in compound tenses." },
  { id: 10, topic: "auxiliary", prompt: "Which auxiliary does 'arriver' use in futur antérieur?", options: ["être", "avoir", "Either"], correct: 0, explanation: "Arriver uses être in compound tenses." },
  { id: 11, topic: "agreement", prompt: "Does 'elle sera arrivée' need agreement?", options: ["Yes, -e added", "No agreement", "Only sometimes"], correct: 0, explanation: "With être and feminine subject, add -e." },
  { id: 12, topic: "meaning", prompt: "What does 'Quand tu arriveras, j'aurai fini' mean?", options: ["When you arrive, I will have finished", "When you arrive, I will finish", "When you arrived, I finished"], correct: 0, explanation: "Futur antérieur shows completion before the future arrival." },
  { id: 13, topic: "vs-future", prompt: "What's the difference between 'je finirai' and 'j'aurai fini'?", options: ["Simple future vs completed future", "Present vs past", "Singular vs plural"], correct: 0, explanation: "Je finirai = I will finish. J'aurai fini = I will have finished." },
  { id: 14, topic: "usage", prompt: "Complete: Elle _____ (partir) avant nous.", options: ["sera partie", "partira", "aurait parti"], correct: 0, explanation: "Partir uses être: sera partie (futur antérieur)." },
  { id: 15, topic: "time", prompt: "What time expression often accompanies futur antérieur?", options: ["Quand...", "Hier", "Avant-hier"], correct: 0, explanation: "Quand + future clause often triggers futur antérieur in the main clause." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Futur antérieur is about sequence of future events. Review avoir/être in future + past participles.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're understanding futur antérieur. Focus on when to use it vs simple future.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using futur antérieur well. This tense shows sophisticated future planning.", emoji: "🎉", color: "green" as const };
}
