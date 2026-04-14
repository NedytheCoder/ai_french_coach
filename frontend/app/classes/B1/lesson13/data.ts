// B1 Lesson 13 — Indirect Speech with Tense Changes
export const sectionIds = ["intro", "present-reporting", "past-reporting", "consonance", "examples", "exceptions", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Indirect Speech: Tense Changes",
  subtitle: "Learn when and how tenses change in reported speech.",
  lessonNumber: 13,
};

export const presentReporting = [
  { direct: "'Je suis malade.'", reported: "Il dit qu'il est malade.", explanation: "Present → present (no change)" },
  { direct: "'Je travaillais hier.'", reported: "Il dit qu'il travaillait hier.", explanation: "Imparfait → imparfait (no change)" },
  { direct: "'J'ai fini.'", reported: "Il dit qu'il a fini.", explanation: "Passé composé → passé composé (no change)" },
];

export const pastReporting = [
  { original: "Présent", changesTo: "Imparfait", direct: "'Je suis prêt.'", reported: "Il a dit qu'il était prêt." },
  { original: "Passé composé", changesTo: "Plus-que-parfait", direct: "'J'ai mangé.'", reported: "Il a dit qu'il avait mangé." },
  { original: "Futur", changesTo: "Conditionnel", direct: "'Je viendrai.'", reported: "Il a dit qu'il viendrait." },
  { original: "Imparfait", stays: "Imparfait", direct: "'Je dormais.'", reported: "Il a dit qu'il dormait." },
];

export const consonance = [
  "When the main verb is past, the reported tense often 'backs up' in time.",
  "This creates a logical timeline relationship between events.",
  "It's called 'consonance des temps' in French.",
];

export const detailedExamples = [
  { context: "Direct: 'Je suis fatigué.'", present: "Il dit qu'il est fatigué.", past: "Il a dit qu'il était fatigué." },
  { context: "Direct: 'J'ai déjà mangé.'", present: "Il dit qu'il a déjà mangé.", past: "Il a dit qu'il avait déjà mangé." },
  { context: "Direct: 'Je partirai demain.'", present: "Il dit qu'il partira demain.", past: "Il a dit qu'il partirait le lendemain." },
];

export const exceptions = [
  { case: "General truths", example: "Il a dit que la Terre est ronde.", explanation: "Truths stay in present even with past reporting" },
  { case: "Very recent past", example: "Il a dit qu'il arrive maintenant.", explanation: "Can stay present if the situation is still current" },
];

export const commonMistakes = [
  { wrong: "Il a dit qu'il est malade (yesterday).", correct: "Il a dit qu'il était malade.", explanation: "Use imparfait when reporting past present." },
  { wrong: "Elle a dit qu'elle a mangé.", correct: "Elle a dit qu'elle avait mangé.", explanation: "Passé composé becomes plus-que-parfait in past reporting." },
  { wrong: "Il a dit qu'il viendra.", correct: "Il a dit qu'il viendrait.", explanation: "Futur becomes conditionnel in past reporting." },
];

export const practiceQuestions = [
  { id: 1, topic: "present", prompt: "When reporting with present tense verb, what happens?", options: ["Usually no tense change", "Everything changes", "Always use imparfait"], correct: 0, explanation: "Present reporting usually keeps the original tense." },
  { id: 2, topic: "past", prompt: "Direct: 'Je suis prêt.' Report with 'Il a dit':", options: ["Il a dit qu'il était prêt.", "Il a dit qu'il est prêt.", "Il a dit qu'il soit prêt."], correct: 0, explanation: "Present → imparfait in past reporting." },
  { id: 3, topic: "past", prompt: "Direct: 'J'ai mangé.' Report with 'Elle a dit':", options: ["Elle a dit qu'elle avait mangé.", "Elle a dit qu'elle a mangé.", "Elle a dit qu'elle mangeait."], correct: 0, explanation: "Passé composé → plus-que-parfait." },
  { id: 4, topic: "past", prompt: "Direct: 'Je viendrai.' Report with 'Il a dit':", options: ["Il a dit qu'il viendrait.", "Il a dit qu'il viendra.", "Il a dit qu'il venait."], correct: 0, explanation: "Futur → conditionnel." },
  { id: 5, topic: "consonance", prompt: "What is 'consonance des temps'?", options: ["Logical tense relationship", "Speaking with music", "Perfect pronunciation"], correct: 0, explanation: "Tense harmony: backing up in time when reporting past events." },
  { id: 6, topic: "imparfait", prompt: "Direct: 'Je dormais.' Report with 'Elle a dit':", options: ["Elle a dit qu'elle dormait.", "Elle a dit qu'elle avait dormi.", "Elle a dit qu'elle dort."], correct: 0, explanation: "Imparfait often stays imparfait in past reporting." },
  { id: 7, topic: "exceptions", prompt: "Which stays in present even with past reporting?", options: ["General truths", "All actions", "Past events"], correct: 0, explanation: "General truths (Earth is round) stay present." },
  { id: 8, topic: "exceptions", prompt: "Report with 'Il a dit': 'La Terre est ronde.'", options: ["Il a dit que la Terre est ronde.", "Il a dit que la Terre était ronde.", "Il a dit que la Terre a été ronde."], correct: 0, explanation: "General truths stay present." },
  { id: 9, topic: "mistakes", prompt: "Which is correct?", options: ["Il a dit qu'il était malade.", "Il a dit qu'il est malade.", "Il a dit qu'il avait été malade."], correct: 0, explanation: "Present → imparfait in past reporting." },
  { id: 10, topic: "time-words", prompt: "What happens to 'demain' in past reporting?", options: ["Becomes 'le lendemain'", "Stays 'demain'", "Becomes 'hier'"], correct: 0, explanation: "Time words also shift: demain → le lendemain." },
  { id: 11, topic: "subjunctive", prompt: "Does subjunctive change in indirect speech?", options: ["No, stays subjunctive", "Yes, becomes indicative", "Becomes conditional"], correct: 0, explanation: "Subjunctive stays subjunctive, but may become past subjunctive if needed." },
  { id: 12, topic: "conditional", prompt: "Direct: 'Je sais.' Report with 'Elle a dit':", options: ["Elle a dit qu'elle savait.", "Elle a dit qu'elle sait.", "Elle a dit qu'elle sache."], correct: 0, explanation: "Present → imparfait (savoir is not a subjunctive trigger here)." },
  { id: 13, topic: "plus-que-parfait", prompt: "Direct: 'J'avais fini.' Report with 'Il a dit':", options: ["Il a dit qu'il avait fini.", "Il a dit qu'il avait eu fini.", "Il a dit qu'il a fini."], correct: 0, explanation: "Plus-que-parfait often stays plus-que-parfait." },
  { id: 14, topic: "futur", prompt: "Direct: 'Je finirai.' Report with 'Elle a dit':", options: ["Elle a dit qu'elle finirait.", "Elle a dit qu'elle finira.", "Elle a dit qu'elle a fini."], correct: 0, explanation: "Futur → conditionnel in past reporting." },
  { id: 15, topic: "mixed", prompt: "Which tense change is correct?", options: ["Présent → imparfait", "Passé composé → présent", "Futur → passé composé"], correct: 0, explanation: "Present becomes imparfait in past reporting." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Tense changes in indirect speech take practice. Focus on the three main shifts: présent→imparfait, passé composé→plus-que-parfait, futur→conditionnel.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're understanding tense changes. Review the exceptions for general truths.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're mastering tense changes in indirect speech! This is a sophisticated grammatical skill.", emoji: "🎉", color: "green" as const };
}
