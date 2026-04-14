// B2 Lesson 7 — Indirect Speech with Tense Shifts
export const sectionIds = ["intro", "tense-shifts", "present-reporting", "past-reporting", "imperative", "questions", "time-words", "practice", "completion"];

export const lessonMeta = {
  title: "Indirect Speech: Tense Shifts",
  subtitle: "Master the art of reporting speech with precise tense coordination. Understand 'consonance des temps' and how to maintain temporal logic in complex narratives.",
  lessonNumber: 7,
};

export const introSections = [
  {
    title: "The Art of Reporting",
    content: "Indirect speech transforms direct quotations into integrated discourse. At B2, you must handle not just the pronoun and word order changes, but the subtle tense shifts that maintain temporal logic.",
  },
  {
    title: "Consonance des Temps",
    content: "This principle governs tense relationships in reported speech. When the reporting verb moves to the past, reported tenses typically 'backshift' to maintain logical sequence.",
  },
];

export const tenseShiftsTable = [
  { direct: "Je suis fatigué.", present: "Il dit qu'il est fatigué.", past: "Il a dit qu'il était fatigué.", shift: "Présent → imparfait" },
  { direct: "Je travaillais.", present: "Il dit qu'il travaillait.", past: "Il a dit qu'il travaillait.", shift: "Imparfait → imparfait (no change)" },
  { direct: "J'ai fini.", present: "Il dit qu'il a fini.", past: "Il a dit qu'il avait fini.", shift: "Passé composé → plus-que-parfait" },
  { direct: "J'avais fini.", present: "Il dit qu'il avait fini.", past: "Il a dit qu'il avait fini.", shift: "Plus-que-parfait → plus-que-parfait" },
  { direct: "Je finirai.", present: "Il dit qu'il finira.", past: "Il a dit qu'il finirait.", shift: "Futur → conditionnel" },
  { direct: "Je finirais.", present: "Il dit qu'il finirait.", past: "Il a dit qu'il finirait.", shift: "Conditionnel → conditionnel" },
];

export const presentReporting = {
  title: "Reporting with Present Tense",
  explanation: "When the reporting verb (dire, affirmer, expliquer) is in present tense, reported tenses usually stay the same.",
  examples: [
    { direct: "'Je suis malade.'", reported: "Il dit qu'il est malade.", note: "Present stays present" },
    { direct: "'Je serai là.'", reported: "Il dit qu'il sera là.", note: "Future stays future" },
    { direct: "'J'ai compris.'", reported: "Il dit qu'il a compris.", note: "Passé composé stays" },
  ],
  exception: "Even with present reporting, subjunctive may shift to past subjunctive for anteriority.",
};

export const pastReporting = {
  title: "Reporting with Past Tense",
  explanation: "When the reporting verb is in past tense (a dit, a expliqué), tenses typically backshift to maintain temporal logic.",
  examples: [
    { direct: "'Je suis prêt.'", reported: "Il a dit qu'il était prêt.", analysis: "Present → imparfait" },
    { direct: "'J'ai mangé.'", reported: "Il a dit qu'il avait mangé.", analysis: "Passé composé → plus-que-parfait" },
    { direct: "'Je viendrai.'", reported: "Il a dit qu'il viendrait.", analysis: "Futur → conditionnel" },
    { direct: "'Je pourrai.'", reported: "Il a dit qu'il pourrait.", analysis: "Futur → conditionnel (modal)" },
  ],
  keyRule: "Each tense backs up one step in the temporal hierarchy.",
};

export const imperativeReporting = {
  title: "Reporting Imperatives and Requests",
  explanation: "Commands and requests transform into infinitive clauses or subjunctive constructions.",
  transformations: [
    { direct: "'Viens !'", reported: "Il m'a dit de venir.", structure: "Dire à quelqu'un de + infinitif" },
    { direct: "'Fais attention !'", reported: "Il m'a ordonné de faire attention.", structure: "Ordonner à quelqu'un de + infinitif" },
    { direct: "'Partez.'", reported: "Il leur a demandé de partir.", structure: "Demander à quelqu'un de + infinitif" },
    { direct: "'Venez demain.'", reported: "Il a suggéré que nous venions le lendemain.", structure: "Subjunctive for complex requests" },
  ],
};

export const questionReporting = {
  title: "Reporting Questions",
  explanation: "Questions transform with si (yes/no) or question words, followed by normal indirect word order (subject before verb).",
  types: [
    { type: "Yes/No questions", direct: "'Viens-tu ?'", reported: "Il demande si je viens.", note: "Si introduces yes/no questions" },
    { type: "Information questions", direct: "'Où vas-tu ?'", reported: "Il demande où je vais.", note: "Question word maintained" },
    { type: "With past reporting", direct: "'Que fais-tu ?'", reported: "Il a demandé ce que je faisais.", note: "Tense backshift applies" },
  ],
};

export const timeWordShifts = {
  title: "Time and Place Word Shifts",
  explanation: "Just as tenses shift, time and place references often change to maintain perspective from the reporting moment.",
  shifts: [
    { original: "aujourd'hui", becomes: "ce jour-là, le jour même", example: "'Je pars aujourd'hui' → Il a dit qu'il partait ce jour-là." },
    { original: "hier", becomes: "la veille", example: "'Je suis arrivé hier' → Il a dit qu'il était arrivé la veille." },
    { original: "demain", becomes: "le lendemain", example: "'Je partirai demain' → Il a dit qu'il partirait le lendemain." },
    { original: "maintenant", becomes: "à ce moment-là", example: "'Je travaille maintenant' → Il a dit qu'il travaillait à ce moment-là." },
    { original: "ici", becomes: "là, à cet endroit", example: "'Viens ici' → Il m'a dit de venir là." },
  ],
};

export const commonMistakes = [
  { error: "Il a dit qu'il est malade (yesterday).", correction: "Il a dit qu'il était malade.", explanation: "Use imparfait for reported present when reporting verb is past." },
  { error: "Elle a dit qu'elle a mangé.", correction: "Elle a dit qu'elle avait mangé.", explanation: "Passé composé becomes plus-que-parfait in past reporting." },
  { error: "Il a demandé où est-ce que je vais.", correction: "Il a demandé où j'allais.", explanation: "Indirect questions don't use est-ce que; tense backshifts." },
  { error: "Il a dit 'je partirai demain' → Il a dit qu'il partirait demain.", correction: "Il a dit qu'il partirait le lendemain.", explanation: "Time words shift: demain → le lendemain." },
];

export const practiceQuestions = [
  { id: 1, topic: "present-shift", prompt: "Direct: 'Je suis fatigué.' Report with 'Il a dit':", options: ["qu'il était fatigué", "qu'il est fatigué", "qu'il soit fatigué"], correct: 0, explanation: "Présent → imparfait in past reporting" },
  { id: 2, topic: "passe-compose", prompt: "Direct: 'J'ai mangé.' Report with 'Elle a dit':", options: ["qu'elle avait mangé", "qu'elle a mangé", "qu'elle mangeait"], correct: 0, explanation: "Passé composé → plus-que-parfait" },
  { id: 3, topic: "futur", prompt: "Direct: 'Je viendrai.' Report with 'Il a dit':", options: ["qu'il viendrait", "qu'il viendra", "qu'il venait"], correct: 0, explanation: "Futur → conditionnel in past reporting" },
  { id: 4, topic: "imparfait", prompt: "Direct: 'Je dormais.' Report with 'Elle a dit':", options: ["qu'elle dormait", "qu'elle avait dormi", "qu'elle dort"], correct: 0, explanation: "Imparfait often stays imparfait" },
  { id: 5, topic: "present-reporting", prompt: "With PRESENT reporting, tenses:", options: ["Usually stay the same", "Always backshift", "Become subjunctive"], correct: 0, explanation: "Present reporting maintains original tenses" },
  { id: 6, topic: "imperative", prompt: "'Viens !' reported as:", options: ["Il m'a dit de venir.", "Il a dit que je viens.", "Il a dit que je venais."], correct: 0, explanation: "Commands use dire à quelqu'un de + infinitif" },
  { id: 7, topic: "yes-no", prompt: "'Viens-tu ?' reported as:", options: ["Il demande si je viens.", "Il demande que je viens.", "Il demande pourquoi je viens."], correct: 0, explanation: "Si introduces reported yes/no questions" },
  { id: 8, topic: "information", prompt: "'Où vas-tu ?' reported as:", options: ["Il demande où je vais.", "Il demande où est-ce que je vais.", "Il demande si je vais."], correct: 0, explanation: "Question word maintained, no est-ce que" },
  { id: 9, topic: "time-shift", prompt: "'demain' becomes when reported in past:", options: ["le lendemain", "hier", "aujourd'hui"], correct: 0, explanation: "Demain → le lendemain in past reporting" },
  { id: 10, topic: "time-shift", prompt: "'hier' becomes when reported in past:", options: ["la veille", "le lendemain", "aujourd'hui"], correct: 0, explanation: "Hier → la veille in past reporting" },
  { id: 11, topic: "subjunctive", prompt: "Does subjunctive shift in indirect speech?", options: ["Stays subjunctive (may become past subj.)", "Becomes indicative", "Becomes conditional"], correct: 0, explanation: "Subjunctive maintains mood but may shift tense" },
  { id: 12, topic: "word-order", prompt: "Indirect question word order:", options: ["Subject before verb", "Verb before subject", "Same as direct"], correct: 0, explanation: "Indirect: normal word order (no inversion)" },
  { id: 13, topic: "plus-que-parfait", prompt: "'J'avais fini' reported as:", options: ["qu'il avait fini", "qu'il a fini", "qu'il finissait"], correct: 0, explanation: "Plus-que-parfait often stays plus-que-parfait" },
  { id: 14, topic: "consonance", prompt: "'Consonance des temps' means:", options: ["Tense harmony/backshifting", "Speaking with music", "Perfect pronunciation"], correct: 0, explanation: "Logical tense relationships in reported speech" },
  { id: 15, topic: "modal", prompt: "'Je pourrai' reported in past:", options: ["qu'il pourrait", "qu'il pourra", "qu'il pouvait"], correct: 0, explanation: "Futur/modal → conditionnel" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Tense shifts require practice. Focus on the three main shifts: présent→imparfait, passé composé→plus-que-parfait, futur→conditionnel.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are mastering tense shifts. Focus on time word changes and question reporting.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand tense coordination in indirect speech. You can report complex discourse with precision.", emoji: "🌟", color: "green" as const };
}
