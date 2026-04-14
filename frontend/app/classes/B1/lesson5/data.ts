// B1 Lesson 5 — Expressing Hypotheses
export const sectionIds = ["intro", "what-are-hypotheses", "si-patterns", "real-hypotheses", "unreal-present", "unreal-past", "common-pitfalls", "practice", "completion"];

export const lessonMeta = {
  title: "Expressing Hypotheses",
  subtitle: "Learn to talk about possibilities, conditions, and imaginary situations.",
  lessonNumber: 5,
};

export const hypothesisTypes = [
  { type: "Real hypothesis", definition: "Possible, likely situations", example: "Si je finis tôt, je viendrai." },
  { type: "Unreal present", definition: "Imaginary situations now", example: "Si j'étais riche, je voyagerais." },
  { type: "Unreal past", definition: "Regrets about the past", example: "Si j'avais étudié, j'aurais réussi." },
];

export const siPatterns = [
  { pattern: "Si + présent, futur", usage: "Real/likely hypotheses", example: "Si tu viens, je serai content." },
  { pattern: "Si + imparfait, conditionnel", usage: "Unreal present", example: "Si j'avais le temps, je lirais." },
  { pattern: "Si + plus-que-parfait, conditionnel passé", usage: "Unreal past", example: "Si j'avais su, je serais venu." },
];

export const realHypotheses = [
  { si: "Si tu viens à la fête", result: "tu verras tous tes amis.", explanation: "Présent + futur: likely to happen" },
  { si: "Si nous partons tôt", result: "nous arriverons à l'heure.", explanation: "Présent + futur: realistic plan" },
  { si: "Si elle m'appelle", result: "je répondrai immédiatement.", explanation: "Présent + futur: expected possibility" },
];

export const unrealPresentExamples = [
  { si: "Si j'avais beaucoup d'argent", result: "j'achèterais une maison.", explanation: "Imparfait + conditionnel: imaginary now" },
  { si: "Si tu étais plus gentil", result: "les gens t'aimeraient plus.", explanation: "Imparfait + conditionnel: contrary to fact" },
  { si: "Si je savais la réponse", result: "je te le dirais.", explanation: "Imparfait + conditionnel: hypothetical" },
];

export const unrealPastExamples = [
  { si: "Si j'avais étudié plus", result: "j'aurais eu de meilleures notes.", explanation: "Plus-que-parfait + conditionnel passé: regret" },
  { si: "Si nous étions partis plus tôt", result: "nous n'aurions pas manqué le train.", explanation: "Plus-que-parfait + conditionnel passé: missed opportunity" },
  { si: "Si elle m'avait prévenu", result: "je serais venu l'aider.", explanation: "Plus-que-parfait + conditionnel passé: hindsight" },
];

export const commonPitfalls = [
  { wrong: "Si j'aurais su", correct: "Si j'avais su", explanation: "Never use conditional after si." },
  { wrong: "Si je serai prêt, je viendrai.", correct: "Si je suis prêt, je viendrai.", explanation: "After si, use présent, not futur." },
  { wrong: "Si j'étais venu, je verrais le spectacle.", correct: "Si j'étais venu, j'aurais vu le spectacle.", explanation: "Match the time frame: past condition needs past result." },
];

export const practiceQuestions = [
  { id: 1, topic: "patterns", prompt: "Which pattern is for real hypotheses?", options: ["Si + présent, futur", "Si + imparfait, conditionnel", "Si + plus-que-parfait, conditionnel passé"], correct: 0, explanation: "Real hypotheses use présent + futur." },
  { id: 2, topic: "patterns", prompt: "Which pattern is for unreal present situations?", options: ["Si + présent, futur", "Si + imparfait, conditionnel", "Si + plus-que-parfait, conditionnel passé"], correct: 1, explanation: "Unreal present uses imparfait + conditionnel." },
  { id: 3, topic: "patterns", prompt: "Which pattern is for regrets about the past?", options: ["Si + présent, futur", "Si + imparfait, conditionnel", "Si + plus-que-parfait, conditionnel passé"], correct: 2, explanation: "Past regrets use plus-que-parfait + conditionnel passé." },
  { id: 4, topic: "real", prompt: "Complete: Si tu finis tôt, tu _____ (pouvoir) partir.", options: ["pourras", "pourrais", "pouvais"], correct: 0, explanation: "Real hypothesis: présent + futur (pourras)." },
  { id: 5, topic: "unreal-present", prompt: "Complete: Si j'_____ (avoir) le temps, je viendrais.", options: ["avais", "aurais", "ai"], correct: 0, explanation: "Unreal present: imparfait (avais) + conditionnel." },
  { id: 6, topic: "unreal-present", prompt: "What does 'Si j'étais riche, je voyagerais' mean?", options: ["I am rich and traveling", "I wish I were rich", "I will be rich"], correct: 1, explanation: "Imparfait + conditionnel = hypothetical present." },
  { id: 7, topic: "unreal-past", prompt: "What does 'Si j'avais su, je serais venu' mean?", options: ["I knew and came", "I wish I had known", "I will know and come"], correct: 1, explanation: "Plus-que-parfait + conditionnel passé = past regret." },
  { id: 8, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Si j'avais su, je serais venu.", "Si j'aurais su, je serais venu.", "Si j'avais su, je serai venu."], correct: 0, explanation: "Never use conditional after si." },
  { id: 9, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Si je suis prêt, je viendrai.", "Si je serai prêt, je viendrai.", "Si j'aurai prêt, je viendrai."], correct: 0, explanation: "After si, use présent (suis), not futur." },
  { id: 10, topic: "mixed", prompt: "Complete: Si elle _____ (venir), je serais content.", options: ["venait", "viendrait", "vient"], correct: 0, explanation: "Unreal present: imparfait (venait) + conditionnel." },
  { id: 11, topic: "real", prompt: "What does 'Si tu étudies, tu réussiras' mean?", options: ["Hypothetical studying", "If you study, you'll succeed", "You studied and succeeded"], correct: 1, explanation: "Présent + futur = real hypothesis." },
  { id: 12, topic: "unreal-past", prompt: "Complete: Si nous _____ (partir) plus tôt, nous n'aurions pas manqué le train.", options: ["étions partis", "serions partis", "partions"], correct: 0, explanation: "Past regret: plus-que-parfait (étions partis) + conditionnel passé." },
  { id: 13, topic: "meaning", prompt: "Which sentence expresses a wish?", options: ["Si j'étais plus grand, je jouerais au basket.", "Si je suis plus grand, je jouerai au basket.", "Si j'avais été plus grand, j'aurais joué au basket."], correct: 0, explanation: "Imparfait + conditionnel expresses a present wish/hypothesis." },
  { id: 14, topic: "meaning", prompt: "Which sentence expresses a past regret?", options: ["Si j'avais étudié, j'aurais réussi.", "Si j'étudie, je réussirai.", "Si j'étudiais, je réussirais."], correct: 0, explanation: "Plus-que-parfait + conditionnel passé expresses past regret." },
  { id: 15, topic: "si-rule", prompt: "What tense should NEVER follow 'si'?", options: ["Présent", "Imparfait", "Conditionnel"], correct: 2, explanation: "Never use conditional immediately after si." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Hypotheses are complex. Focus on the three si patterns and remember: no conditional after si.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're starting to handle different hypothesis types. Review the tense patterns once more.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're expressing hypotheses well. This opens up sophisticated conversation possibilities.", emoji: "🎉", color: "green" as const };
}
