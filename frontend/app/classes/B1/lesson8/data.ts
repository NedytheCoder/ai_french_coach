// B1 Lesson 8 — Past Conditional
export const sectionIds = ["intro", "what-is", "formation", "avoir-etre", "usage", "examples", "si-clauses", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Past Conditional",
  subtitle: "Express regrets and hypothetical past actions.",
  lessonNumber: 8,
};

export const whatIs = [
  "The past conditional describes what would have happened in the past.",
  "It's used for regrets, missed opportunities, and hypothetical past situations.",
  "Example: 'J'aurais aimé voyager.' (I would have liked to travel)",
];

export const formationRules = [
  "Take the present conditional of avoir or être",
  "Add the past participle of the main verb",
  "Agreement rules apply for être verbs",
];

export const avoirEtre = [
  { auxiliary: "avoir", je: "j'aurais", tu: "tu aurais", il: "il aurait", nous: "nous aurions" },
  { auxiliary: "être", je: "je serais", tu: "tu serais", il: "il serait", nous: "nous serions" },
];

export const usageCases = [
  { case: "Regrets", example: "J'aurais dû étudier plus.", explanation: "I should have studied more (but I didn't)" },
  { case: "Missed opportunities", example: "J'aurais pu venir.", explanation: "I could have come (but I didn't)" },
  { case: "Hypothetical past", example: "Je serais venu si j'avais su.", explanation: "I would have come if I had known" },
  { case: "Third conditional", example: "S'il avait fait beau, nous serions sortis.", explanation: "If the weather had been good, we would have gone out" },
];

export const siClauses = [
  { pattern: "Si + plus-que-parfait, conditionnel passé", example: "Si j'avais eu le temps, j'aurais fini.", note: "Most common third conditional pattern" },
  { pattern: "Si + imparfait, conditionnel", example: "Si j'étais riche, je voyagerais.", note: "Second conditional (present hypothetical)" },
];

export const commonExamples = [
  { french: "J'aurais aimé voir ça.", english: "I would have liked to see that." },
  { french: "Tu aurais dû me dire.", english: "You should have told me." },
  { french: "Il aurait pu réussir.", english: "He could have succeeded." },
  { french: "Nous serions arrivés plus tôt.", english: "We would have arrived earlier." },
  { french: "Elle serait venue avec nous.", english: "She would have come with us." },
];

export const commonMistakes = [
  { wrong: "Si j'aurais su, je serais venu.", correct: "Si j'avais su, je serais venu.", explanation: "Never use conditional after si." },
  { wrong: "J'aurais fini si j'aurais eu le temps.", correct: "J'aurais fini si j'avais eu le temps.", explanation: "Plus-que-parfait follows si." },
  { wrong: "Je serais venu si je saurais.", correct: "Je serais venu si j'avais su.", explanation: "Use plus-que-parfait in the if-clause for past hypotheticals." },
];

export const practiceQuestions = [
  { id: 1, topic: "what-is", prompt: "What does the past conditional express?", options: ["Hypothetical past actions", "Future actions", "Present habits"], correct: 0, explanation: "Past conditional = what would have happened." },
  { id: 2, topic: "formation", prompt: "How is the past conditional formed?", options: ["Conditional auxiliary + past participle", "Present auxiliary + past participle", "Imparfait auxiliary + past participle"], correct: 0, explanation: "Take avoir/être in conditional + past participle." },
  { id: 3, topic: "avoir", prompt: "What is the conditional auxiliary avoir for 'je'?", options: ["j'aurais", "j'avais", "j'eus"], correct: 0, explanation: "J'aurais is the conditional of avoir." },
  { id: 4, topic: "etre", prompt: "What is the conditional auxiliary être for 'il'?", options: ["il serait", "il était", "il sera"], correct: 0, explanation: "Il serait is the conditional of être." },
  { id: 5, topic: "meaning", prompt: "What does 'J'aurais dû étudier' mean?", options: ["I should have studied", "I should study", "I will have studied"], correct: 0, explanation: "Past conditional of devoir = should have." },
  { id: 6, topic: "meaning", prompt: "What does 'J'aurais pu venir' mean?", options: ["I could have come", "I can come", "I was able to come"], correct: 0, explanation: "Past conditional of pouvoir = could have." },
  { id: 7, topic: "si-clauses", prompt: "What tense follows 'si' in third conditional?", options: ["Plus-que-parfait", "Conditionnel", "Imparfait"], correct: 0, explanation: "Third conditional: Si + plus-que-parfait, conditionnel passé." },
  { id: 8, topic: "si-clauses", prompt: "Complete: Si j'_____ (savoir), je serais venu.", options: ["avais su", "aurais su", "savais"], correct: 0, explanation: "Third conditional requires plus-que-parfait after si." },
  { id: 9, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Si j'avais su, je serais venu.", "Si j'aurais su, je serais venu.", "Si j'avais su, j'aurais venu."], correct: 0, explanation: "Use plus-que-parfait after si, conditional in result." },
  { id: 10, topic: "meaning", prompt: "What does 'Il aurait pu réussir' mean?", options: ["He could have succeeded", "He can succeed", "He succeeded"], correct: 0, explanation: "Past conditional of pouvoir = could have." },
  { id: 11, topic: "agreement", prompt: "Does 'elle serait partie' need agreement?", options: ["Yes, -e added", "No agreement", "Only in writing"], correct: 0, explanation: "With être and feminine subject, add -e." },
  { id: 12, topic: "si-clauses", prompt: "Complete: S'il avait fait beau, nous _____ (sortir).", options: ["serions sortis", "aurions sortis", "sortirions"], correct: 0, explanation: "Sortir uses être: nous serions sortis." },
  { id: 13, topic: "auxiliary", prompt: "Which auxiliary does 'manger' use in past conditional?", options: ["avoir", "être", "Either"], correct: 0, explanation: "Most verbs use avoir." },
  { id: 14, topic: "auxiliary", prompt: "Which auxiliary does 'partir' use in past conditional?", options: ["être", "avoir", "Either"], correct: 0, explanation: "Partir is a DR MRS VANDERTRAMP verb, using être." },
  { id: 15, topic: "meaning", prompt: "What does 'Tu aurais dû me dire' mean?", options: ["You should have told me", "You should tell me", "You had to tell me"], correct: 0, explanation: "Past conditional of devoir = should have." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The past conditional combines tenses. Focus on the conditional forms of avoir/être + past participles.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting the past conditional. Review si clause patterns and never use conditional after si.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're using the past conditional well. This expresses sophisticated past hypotheticals.", emoji: "🎉", color: "green" as const };
}
