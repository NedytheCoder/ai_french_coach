// B2 Lesson 4 — Present & Past Subjunctive Full System
export const sectionIds = ["intro", "triggers", "concession", "obligation", "emotion", "doubt", "purpose", "restriction", "past-subjunctive", "practice", "completion"];

export const lessonMeta = {
  title: "Subjunctive: The Complete System",
  subtitle: "Master the full subjunctive system at B2 level. Understand not just when to use it, but the nuances between present and past subjunctive in connected discourse.",
  lessonNumber: 4,
};

export const introSections = [
  {
    title: "Beyond Basics",
    content: "At B2, you already know the subjunctive follows expressions like 'il faut que' and 'je veux que.' Now we explore the complete trigger system: concession, obligation, emotion, doubt, purpose, and restriction. Plus, we master the past subjunctive for complex timelines.",
  },
  {
    title: "Subjunctive as Attitude Marker",
    content: "The subjunctive signals the speaker's attitude toward what they're saying—doubt, desire, necessity, emotion. It creates psychological distance between the speaker and the reality being described.",
  },
];

export const triggerCategories = [
  { category: "Concession", trigger: "bien que, quoique, malgré que", example: "Bien qu'il soit riche, il n'est pas heureux.", note: "Although something is true..." },
  { category: "Obligation/Necessity", trigger: "il faut que, il est nécessaire que, il est indispensable que", example: "Il faut que tu viennes immédiatement.", note: "Requirement or strong necessity" },
  { category: "Emotion", trigger: "je suis content que, il est dommage que, j'ai peur que", example: "Je suis ravi que vous soyez là.", note: "Emotional reaction to something" },
  { category: "Doubt/Possibility", trigger: "je doute que, il est possible que, il semble que", example: "Je doute qu'il vienne.", note: "Uncertainty or non-factuality" },
  { category: "Purpose", trigger: "pour que, afin que, de peur que", example: "Je parle lentement pour qu'il comprenne.", note: "Goal or intention" },
  { category: "Restriction/Condition", trigger: "à moins que, pourvu que, avant que", example: "Je partirai à moins qu'il pleuve.", note: "Condition with implied negation" },
];

export const concessionSection = {
  title: "Concession: Accepting a Contradiction",
  explanation: "Concession acknowledges a reality while asserting something unexpected. It creates tension between what is and what one might expect.",
  examples: [
    { sentence: "Bien qu'il soit ministre, il vit modestement.", analysis: "Being a minister usually implies wealth, but he lives modestly" },
    { sentence: "Quoique fatigué, il continua à travailler.", analysis: "Fatigue would normally stop work, but he continued" },
    { sentence: "Malgré que la situation soit difficile, nous avançons.", analysis: "Difficulty doesn't prevent progress" },
  ],
  commonErrors: [
    { error: "Bien qu'il est riche", correction: "Bien qu'il soit riche", note: "Subjunctive required after bien que" },
    { error: "Quoique je suis fatigué", correction: "Quoique je sois fatigué", note: "Subjunctive required" },
  ],
};

export const obligationSection = {
  title: "Obligation and Necessity",
  explanation: "These triggers express requirements, from polite suggestions to absolute necessities.",
  scale: [
    { level: "Weak suggestion", expression: "il est souhaitable que", example: "Il est souhaitable que vous arriviez à l'heure." },
    { level: "Standard requirement", expression: "il faut que", example: "Il faut que tu étudies." },
    { level: "Strong necessity", expression: "il est indispensable que", example: "Il est indispensable que nous agissions vite." },
    { level: "Absolute necessity", expression: "il est impératif que", example: "Il est impératif que cette loi soit votée." },
  ],
};

export const emotionSection = {
  title: "Emotion: Subjectivity in Action",
  explanation: "Emotion triggers always take subjunctive because they express subjective reactions to situations.",
  categories: [
    { emotion: "Joy", triggers: "être content/heureux/ravi que", example: "Je suis contente que tu réussisses." },
    { emotion: "Fear", triggers: "avoir peur que, craindre que", example: "J'ai peur qu'il ne comprenne pas.", note: "'Ne' explétif often added" },
    { emotion: "Sadness", triggers: "être désolé/triste que", example: "Je suis désolé que vous partiez." },
    { emotion: "Surprise", triggers: "être étonné/surpris que", example: "Il est étonnant qu'elle sache cela." },
    { emotion: "Disappointment", triggers: "regretter que, il est dommage que", example: "Il est dommage qu'il pleuve." },
  ],
};

export const doubtSection = {
  title: "Doubt and Non-Factuality",
  explanation: "When something is uncertain, possible but not confirmed, or doubted, use the subjunctive.",
  scale: [
    { certainty: "Certain (indicative)", expression: "Je sais qu'il vient.", note: "Known fact = indicative" },
    { certainty: "Neutral statement (indicative)", expression: "Il est probable qu'il vient.", note: "High probability can use indicative" },
    { certainty: "Doubtful (subjunctive)", expression: "Je doute qu'il vienne.", note: "Doubt = subjunctive" },
    { certainty: "Very doubtful (subjunctive)", expression: "Il est impossible qu'il vienne.", note: "Strong negation of possibility" },
  ],
  specialNote: "Il est possible que + subjunctive (possibility), but Il se peut que + subjunctive (it may be that)",
};

export const purposeSection = {
  title: "Purpose and Intention",
  explanation: "Purpose clauses explain why something is done. They always aim at a potential, not yet realized outcome.",
  triggers: [
    { trigger: "pour que", meaning: "so that / in order that", example: "Je parle fort pour qu'il m'entende." },
    { trigger: "afin que", meaning: "in order that (more formal)", example: "Nous travaillons afin que vous réussissiez." },
    { trigger: "de peur que / de crainte que", meaning: "for fear that", example: "Je reste de peur qu'il ne revienne.", note: "Often with 'ne' explétif" },
  ],
};

export const restrictionSection = {
  title: "Restriction and Condition",
  explanation: "These triggers introduce conditions with implied limitations or negative presuppositions.",
  triggers: [
    { trigger: "à moins que", meaning: "unless", example: "Je viendrai à moins qu'il pleuve.", note: "Exception to the rule" },
    { trigger: "pourvu que", meaning: "provided that", example: "Je viendrai pourvu que tu viennes aussi.", note: "Condition for agreement" },
    { trigger: "avant que", meaning: "before", example: "Partez avant qu'il ne soit trop tard.", note: "Time restriction" },
    { trigger: "en attendant que", meaning: "while waiting for", example: "Attendez ici en attendant qu'il arrive." },
  ],
};

export const pastSubjunctiveSection = {
  title: "Past Subjunctive: Complex Timelines",
  explanation: "Use past subjunctive when the subjunctive action occurred before the main clause action.",
  formation: "Present subjunctive of auxiliary (avoir/être) + past participle",
  examples: [
    { present: "Je suis content qu'il vienne.", past: "J'étais content qu'il fût venu.", note: "Past subjunctive = he had already come" },
    { present: "Il est possible qu'il sache.", past: "Il était possible qu'il eût su.", note: "Past subjunctive = he had already known" },
    { present: "Je doute qu'il comprenne.", past: "Je doutais qu'il eût compris.", note: "Past subjunctive = doubt about prior understanding" },
  ],
  usageNote: "Past subjunctive is literary/formal. In everyday speech, present subjunctive often replaces it.",
};

export const practiceQuestions = [
  { id: 1, topic: "concession", prompt: "Which requires subjunctive?", options: ["Bien qu'il", "Parce qu'il", "Puisqu'il"], correct: 0, explanation: "Bien que requires subjunctive (concession)" },
  { id: 2, topic: "emotion", prompt: "'Je suis content que' takes:", options: ["Subjunctive", "Indicative", "Conditional"], correct: 0, explanation: "Emotion triggers require subjunctive" },
  { id: 3, topic: "doubt", prompt: "'Je doute qu'il' takes:", options: ["Subjunctive (doubt)", "Indicative (fact)", "Conditional (hypothesis)"], correct: 0, explanation: "Doubt triggers subjunctive" },
  { id: 4, topic: "obligation", prompt: "'Il faut que tu' requires:", options: ["Subjunctive", "Indicative", "Infinitive"], correct: 0, explanation: "Il faut que always + subjunctive" },
  { id: 5, topic: "purpose", prompt: "'Je parle lentement pour qu'il' takes:", options: ["Subjunctive (purpose)", "Indicative (fact)", "Imperative (command)"], correct: 0, explanation: "Pour que requires subjunctive" },
  { id: 6, topic: "past-subjunctive", prompt: "Past subjunctive is used when:", options: ["Subjunctive action precedes main clause", "Actions are simultaneous", "Main clause is future"], correct: 0, explanation: "Past subjunctive = anteriority in subjunctive context" },
  { id: 7, topic: "ne-expletif", prompt: "'J'ai peur qu'il ne comprenne' - the 'ne' is:", options: ["Expletive (extra, adds nuance)", "Negation", "Error"], correct: 0, explanation: "'Ne' explétif after fear expressions (not true negation)" },
  { id: 8, topic: "restriction", prompt: "'Je viendrai à moins qu'il' requires:", options: ["Subjunctive", "Indicative", "Conditional"], correct: 0, explanation: "À moins que requires subjunctive" },
  { id: 9, topic: "certainty", prompt: "Which takes INDICATIVE (not subjunctive)?", options: ["Je sais qu'il", "Je doute qu'il", "Il est possible qu'il"], correct: 0, explanation: "Certainty/fact = indicative" },
  { id: 10, topic: "emotion-types", prompt: "'Il est dommage que' expresses:", options: ["Disappointment/regret", "Joy", "Certainty"], correct: 0, explanation: "Dommage = disappointment, requires subjunctive" },
  { id: 11, topic: "concession-mistake", prompt: "Correct: 'Bien qu'il _____ riche'", options: ["soit", "est", "sera"], correct: 0, explanation: "Bien que + subjunctive (soit)" },
  { id: 12, topic: "purpose-formal", prompt: "The more formal 'pour que' is:", options: ["afin que", "parce que", "quand"], correct: 0, explanation: "Afin que = more formal version of pour que" },
  { id: 13, topic: "doubt-scale", prompt: "'Il est probable qu'il' can use:", options: ["Indicative or subjunctive", "Only subjunctive", "Only conditional"], correct: 0, explanation: "With probable, both possible (indicative preferred today)" },
  { id: 14, topic: "past-formation", prompt: "Past subjunctive uses:", options: ["Present subjunctive of auxiliary + participle", "Passé composé", "Imparfait"], correct: 0, explanation: "Present subjunctive of avoir/être + past participle" },
  { id: 15, topic: "literary", prompt: "'Il doutait qu'elle eût compris' is:", options: ["Past subjunctive (literary)", "Present subjunctive", "Pluperfect indicative"], correct: 0, explanation: "Eût compris = past subjunctive of comprendre" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The subjunctive system is complex. Focus on the main trigger categories: emotion, doubt, obligation, and concession.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are mastering the subjunctive triggers. Review the 'ne' explétif and past subjunctive usage.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand the complete subjunctive system. You can navigate complex emotional, doubtful, and obligatory expressions with precision.", emoji: "🌟", color: "green" as const };
}
