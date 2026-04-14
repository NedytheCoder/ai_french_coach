// B2 Lesson 5 — All Hypothesis Structures (Si Clauses)
export const sectionIds = ["intro", "first-conditional", "second-conditional", "third-conditional", "mixed-conditional", "nuance", "practice", "completion"];

export const lessonMeta = {
  title: "All Hypothesis Structures",
  subtitle: "Master the complete system of French hypothetical expressions. Understand realism, unreal present, and unreal past with precise tense coordination.",
  lessonNumber: 5,
};

export const introSections = [
  {
    title: "The Logic of Hypothesis",
    content: "French si clauses follow logical patterns based on reality. First conditional (realistic), second conditional (unreal present), and third conditional (unreal past) each express different relationships between condition and consequence.",
  },
  {
    title: "Tense Coordination",
    content: "The tense in the si clause determines the tense in the main clause. This coordination creates meaning: possibility, hypothesis, or regret.",
  },
];

export const firstConditional = {
  title: "First Conditional: Realistic Possibility",
  description: "If + present → future or present. Used for realistic, achievable conditions.",
  structure: { si: "Present", result: "Future or present" },
  examples: [
    { sentence: "Si tu viens, je serai content.", meaning: "Realistic invitation", nuance: "I believe you might come" },
    { sentence: "S'il fait beau, nous sortirons.", meaning: "Weather-dependent plan", nuance: "Possible, likely scenario" },
    { sentence: "Si j'ai le temps, je le ferai.", meaning: "Time-permitting action", nuance: "Realistic condition" },
  ],
  keywords: "Realistic, achievable, possible, likely",
};

export const secondConditional = {
  title: "Second Conditional: Unreal Present",
  description: "If + imperfect → conditional present. Used for hypothetical, unreal, or unlikely present/future situations.",
  structure: { si: "Imparfait", result: "Conditionnel présent" },
  examples: [
    { sentence: "Si j'avais de l'argent, j'achèterais une maison.", meaning: "I don't have money (unreal)", nuance: "Hypothetical present" },
    { sentence: "S'il était là, il comprendrait.", meaning: "He's not here (unreal)", nuance: "Counterfactual now" },
    { sentence: "Si je savais, je te le dirais.", meaning: "I don't know (unreal)", nuance: "Present ignorance" },
  ],
  keywords: "Hypothetical, unreal, wishful, counterfactual",
  commonError: "Never use conditional after si! 'Si j'aurais' is ALWAYS wrong.",
};

export const thirdConditional = {
  title: "Third Conditional: Unreal Past (Regret)",
  description: "If + past perfect → past conditional. Used for regrets, missed opportunities, imagining different past outcomes.",
  structure: { si: "Plus-que-parfait", result: "Conditionnel passé" },
  examples: [
    { sentence: "Si j'avais su, je serais venu.", meaning: "I didn't know (past fact)", nuance: "Regret about past ignorance" },
    { sentence: "S'il avait étudié, il aurait réussi.", meaning: "He didn't study (past fact)", nuance: "Missed opportunity" },
    { sentence: "Si nous étions partis plus tôt, nous n'aurions pas raté le train.", meaning: "We left late (past fact)", nuance: "Past mistake consequence" },
  ],
  keywords: "Regret, missed opportunity, past counterfactual",
};

export const mixedConditional = {
  title: "Mixed Conditionals: Complex Scenarios",
  description: "Sometimes we combine tenses to express complex time relationships.",
  types: [
    { type: "Past condition, present result", structure: "Si + plus-que-parfait → conditionnel présent", example: "Si j'avais accepté ce poste, je serais directeur maintenant." },
    { type: "Present condition, past result", structure: "Si + imparfait → conditionnel passé", example: "Si j'étais plus prudent, je n'aurais pas eu cet accident." },
  ],
};

export const nuanceSection = {
  title: "Degrees of Reality",
  scale: [
    { level: "Certainty", example: "Comme il fait beau, nous sortons.", note: "No si clause needed - fact stated directly" },
    { level: "High probability (first)", example: "S'il fait beau, nous sortirons.", note: "Expected outcome" },
    { level: "Hypothesis (second)", example: "S'il faisait beau, nous sortirions.", note: "Not currently true" },
    { level: "Impossible (second with context)", example: "Si j'étais roi, je changerai tout.", note: "Never possible" },
    { level: "Past regret (third)", example: "Si j'avais su, je serais venu.", note: "Cannot change now" },
  ],
  keyRule: "Never use conditional after si. This is the most common error in French hypothesis.",
};

export const commonMistakes = [
  { error: "Si j'aurais su, j'aurais venu.", correction: "Si j'avais su, je serais venu.", explanation: "Never use conditional after si. Plus-que-parfait required." },
  { error: "Si je serais riche, j'achèterais.", correction: "Si j'étais riche, j'achèterais.", explanation: "Imparfait after si, not conditional." },
  { error: "Si j'avais été là, je l'aurais vu.", correction: "Si j'avais été là, je l'aurais vu.", note: "Actually correct! But often confused with present conditional.", explanation: "Third conditional is correct here." },
];

export const practiceQuestions = [
  { id: 1, topic: "first-conditional", prompt: "Complete: Si tu viens, je _____ content.", options: ["serai", "serais", "étais"], correct: 0, explanation: "First conditional: present → future (serai)" },
  { id: 2, topic: "second-conditional", prompt: "Complete: Si j'avais de l'argent, j'_____ une maison.", options: ["achèterais", "achèterai", "achète"], correct: 0, explanation: "Second conditional: imparfait → conditionnel présent" },
  { id: 3, topic: "third-conditional", prompt: "Complete: Si j'avais su, je _____ venu.", options: ["serais", "serai", "étais"], correct: 0, explanation: "Third conditional: plus-que-parfait → conditionnel passé" },
  { id: 4, topic: "common-error", prompt: "Which is ALWAYS wrong?", options: ["Si j'aurais", "Si j'avais", "Si j'ai"], correct: 0, explanation: "Never use conditional after si" },
  { id: 5, topic: "reality", prompt: "Si j'avais de l'argent... implies:", options: ["I don't have money now", "I have money", "I will have money"], correct: 0, explanation: "Imparfait = unreal present situation" },
  { id: 6, topic: "past-regret", prompt: "Si j'avais étudié... expresses:", options: ["Past regret/missed opportunity", "Future plan", "Current habit"], correct: 0, explanation: "Plus-que-parfait = unreal past, often regret" },
  { id: 7, topic: "structure", prompt: "Second conditional structure:", options: ["Si + imparfait → conditionnel présent", "Si + présent → futur", "Si + plus-que-parfait → conditionnel passé"], correct: 0, explanation: "Imparfait in si clause, conditionnel in result" },
  { id: 8, topic: "meaning", prompt: "S'il faisait beau, nous sortirions implies:", options: ["It's not nice now", "It's nice now", "It will be nice"], correct: 0, explanation: "Imparfait = counterfactual (not currently true)" },
  { id: 9, topic: "third-meaning", prompt: "Si elle avait su, elle serait venue means:", options: ["She didn't know (past fact)", "She knows now", "She will know"], correct: 0, explanation: "Plus-que-parfait = didn't know in the past" },
  { id: 10, topic: "keyword", prompt: "Which keywords suggest second conditional?", options: ["Hypothetical, unreal, wishful", "Certain, definite, sure", "Tomorrow, next week, soon"], correct: 0, explanation: "Second conditional = hypothetical/unreal" },
  { id: 11, topic: "mixed", prompt: "Si j'avais accepté, je serais directeur maintenant =", options: ["Mixed: past condition, present result", "Third conditional", "First conditional"], correct: 0, explanation: "Past decision affects present situation" },
  { id: 12, topic: "translation", prompt: "'If I were you' in French:", options: ["Si j'étais toi", "Si je serais toi", "Si j'avais été toi"], correct: 0, explanation: "Si j'étais = imparfait (unreal present)" },
  { id: 13, topic: "regret", prompt: "Best for expressing deep regret:", options: ["Third conditional", "First conditional", "Second conditional"], correct: 0, explanation: "Third conditional for past counterfactuals" },
  { id: 14, topic: "probable", prompt: "S'il pleut, je resterai chez moi =", options: ["First conditional (probable)", "Second conditional", "Third conditional"], correct: 0, explanation: "Present + future = realistic scenario" },
  { id: 15, topic: "impossible", prompt: "If I were king =", options: ["Si j'étais roi (second conditional)", "Si je serais roi", "Si j'ai été roi"], correct: 0, explanation: "Impossible scenario = second conditional" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Conditional sentences require practice. Focus on the key rule: never use conditional after si. Review the three main patterns.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are mastering hypothesis structures. Focus on distinguishing second and third conditionals by time reference.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand the complete hypothesis system. You can express possibility, hypothesis, and regret with precision.", emoji: "🌟", color: "green" as const };
}
