// B1 Lesson 6 — Present Subjunctive Full Uses
export const sectionIds = ["intro", "emotion", "doubt", "necessity", "conjunctions", "full-patterns", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Present Subjunctive - Full Uses",
  subtitle: "Master all the situations requiring the subjunctive mood.",
  lessonNumber: 6,
};

export const emotionTriggers = [
  { phrase: "Je suis content(e) que", example: "Je suis contente que tu viennes.", note: "Happiness about something" },
  { phrase: "Je crains que", example: "Je crains qu'il pleuve demain.", note: "Fear about something" },
  { phrase: "Il est dommage que", example: "Il est dommage qu'elle parte.", note: "Disappointment" },
  { phrase: "J'ai peur que", example: "J'ai peur que ce soit trop tard.", note: "Fear/worry" },
];

export const doubtTriggers = [
  { phrase: "Je doute que", example: "Je doute qu'il comprenne.", note: "Uncertainty" },
  { phrase: "Il est douteux que", example: "Il est douteux que ça marche.", note: "Questionable" },
  { phrase: "Je ne suis pas sûr(e) que", example: "Je ne suis pas sûr qu'il vienne.", note: "Not certain" },
];

export const necessityTriggers = [
  { phrase: "Il faut que", example: "Il faut que tu travailles.", note: "Strong necessity" },
  { phrase: "Il est nécessaire que", example: "Il est nécessaire qu'on finisse.", note: "Requirement" },
  { phrase: "Il est important que", example: "Il est important que vous soyez là.", note: "Importance" },
  { phrase: "Il vaut mieux que", example: "Il vaut mieux que tu partes.", note: "Preference/advice" },
];

export const conjunctionTriggers = [
  { conjunction: "pour que", meaning: "so that", example: "Je parle lentement pour qu'il comprenne." },
  { conjunction: "afin que", meaning: "in order that", example: "Je révise afin que je réussisse." },
  { conjunction: "bien que", meaning: "although", example: "Bien qu'il soit fatigué, il travaille." },
  { conjunction: "quoique", meaning: "even though", example: "Quoique je sois malade, je sors." },
  { conjunction: "à moins que", meaning: "unless", example: "Je viendrai à moins qu'il pleuve." },
  { conjunction: "avant que", meaning: "before", example: "Viens avant qu'il parte." },
  { conjunction: "jusqu'à ce que", meaning: "until", example: "Attends jusqu'à ce qu'il arrive." },
];

export const fullPatterns = [
  { category: "Will/Desire", triggers: ["vouloir que", "désirer que", "préférer que"], example: "Je veux que tu sois honnête." },
  { category: "Orders", triggers: ["ordonner que", "exiger que"], example: "Il exige que je parte." },
  { category: "Impersonal expressions", triggers: ["il est bon que", "il est utile que"], example: "Il est bon que vous sachiez cela." },
];

export const commonMistakes = [
  { wrong: "Je suis content que tu viens.", correct: "Je suis content que tu viennes.", explanation: "Emotions trigger subjunctive." },
  { wrong: "Il est probable qu'il vienne.", correct: "Il est probable qu'il vient.", explanation: "Probability uses indicative, not subjunctive." },
  { wrong: "Je sais qu'il soit là.", correct: "Je sais qu'il est là.", explanation: "Certainty (savoir) uses indicative." },
  { wrong: "Bien qu'il fait beau.", correct: "Bien qu'il fasse beau.", explanation: "Bien que always triggers subjunctive." },
];

export const practiceQuestions = [
  { id: 1, topic: "emotion", prompt: "Which phrase triggers subjunctive due to emotion?", options: ["Je suis content que", "Je sais que", "Je crois que"], correct: 0, explanation: "Je suis content que expresses emotion and requires subjunctive." },
  { id: 2, topic: "doubt", prompt: "Which phrase expresses doubt?", options: ["Je doute que", "Je sais que", "Je vois que"], correct: 0, explanation: "Je doute que expresses doubt and triggers subjunctive." },
  { id: 3, topic: "necessity", prompt: "Which is the most common necessity trigger?", options: ["Il faut que", "Il est probable que", "Il semble que"], correct: 0, explanation: "Il faut que is the strongest and most common necessity trigger." },
  { id: 4, topic: "conjunctions", prompt: "Which conjunction means 'so that'?", options: ["pour que", "bien que", "avant que"], correct: 0, explanation: "Pour que means so that and triggers subjunctive." },
  { id: 5, topic: "conjunctions", prompt: "Which conjunction means 'although'?", options: ["bien que", "pour que", "afin que"], correct: 0, explanation: "Bien que means although and triggers subjunctive." },
  { id: 6, topic: "conjunctions", prompt: "Which conjunction means 'unless'?", options: ["à moins que", "jusqu'à ce que", "avant que"], correct: 0, explanation: "À moins que means unless and triggers subjunctive." },
  { id: 7, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Je suis content que tu viennes.", "Je suis content que tu viens.", "Je suis content tu viennes."], correct: 0, explanation: "Je suis content que triggers subjunctive (viennes)." },
  { id: 8, topic: "mistakes", prompt: "Which sentence uses indicative correctly?", options: ["Il est probable qu'il vient.", "Il est probable qu'il vienne.", "Il est probable qu'il venait."], correct: 0, explanation: "Il est probable uses indicative (vient), not subjunctive." },
  { id: 9, topic: "mistakes", prompt: "Which sentence is correct?", options: ["Je sais qu'il est là.", "Je sais qu'il soit là.", "Je sais qu'il ait là."], correct: 0, explanation: "Je sais indicates certainty, so use indicative." },
  { id: 10, topic: "conjunctions", prompt: "Which conjunction means 'until'?", options: ["jusqu'à ce que", "avant que", "à moins que"], correct: 0, explanation: "Jusqu'à ce que means until and triggers subjunctive." },
  { id: 11, topic: "necessity", prompt: "Complete: Il faut que tu _____ (être) prudent.", options: ["sois", "es", "suis"], correct: 0, explanation: "Il faut que triggers subjunctive: sois." },
  { id: 12, topic: "will", prompt: "Which expresses will?", options: ["Je veux que", "Je crois que", "Je vois que"], correct: 0, explanation: "Je veux que expresses will and triggers subjunctive." },
  { id: 13, topic: "impersonal", prompt: "Which impersonal expression triggers subjunctive?", options: ["Il est important que", "Il est certain que", "Il est vrai que"], correct: 0, explanation: "Il est important que triggers subjunctive." },
  { id: 14, topic: "meaning", prompt: "What does 'afin que' mean?", options: ["so that / in order that", "although", "unless"], correct: 0, explanation: "Afin que is a more formal version of pour que." },
  { id: 15, topic: "mixed", prompt: "Which does NOT trigger subjunctive?", options: ["Il est certain que", "Il est possible que", "Il faut que"], correct: 0, explanation: "Il est certain que uses indicative because certainty = reality." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "The subjunctive has many uses. Focus on the main categories: emotion, doubt, necessity, and conjunctions.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're recognizing subjunctive triggers well. Review the difference between certainty (indicative) and uncertainty (subjunctive).", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're mastering the subjunctive uses. This is one of the most advanced aspects of French grammar.", emoji: "🎉", color: "green" as const };
}
