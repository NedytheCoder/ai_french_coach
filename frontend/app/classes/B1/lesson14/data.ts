// B1 Lesson 14 — Advanced Connectors and Discourse Markers
export const sectionIds = ["intro", "opposition", "consequence", "purpose", "concession", "time", "examples", "practice", "completion"];

export const lessonMeta = {
  title: "Advanced Connectors",
  subtitle: "Master sophisticated French linking words for complex expression.",
  lessonNumber: 14,
};

export const oppositionConnectors = [
  { connector: "cependant", meaning: "however", example: "Il fait froid; cependant, nous sortons.", level: "B1 formal" },
  { connector: "néanmoins", meaning: "nevertheless", example: "Elle est fatiguée; néanmoins, elle travaille.", level: "B1 formal" },
  { connector: "toutefois", meaning: "however/though", example: "C'est difficile; toutefois, c'est possible.", level: "B1 formal" },
  { connector: "par contre", meaning: "on the other hand", example: "J'aime le café; par contre, je déteste le thé.", level: "conversational" },
  { connector: "en revanche", meaning: "conversely", example: "Il est pauvre; en revanche, il est heureux.", level: "formal" },
];

export const consequenceConnectors = [
  { connector: "par conséquent", meaning: "consequently", example: "Il a triché; par conséquent, il a été exclu.", level: "formal" },
  { connector: "en conséquence", meaning: "as a result", example: "Elle a beaucoup étudié; en conséquence, elle a réussi.", level: "formal" },
  { connector: "de ce fait", meaning: "because of this", example: "Il a menti; de ce fait, personne ne lui fait confiance.", level: "formal" },
  { connector: "c'est pourquoi", meaning: "that's why", example: "Je suis malade; c'est pourquoi je reste chez moi.", level: "common" },
];

export const purposeConnectors = [
  { connector: "dans le but de", meaning: "with the aim of", example: "Il travaille dans le but de réussir.", level: "formal" },
  { connector: "dans l'intention de", meaning: "with the intention of", example: "Elle étudie dans l'intention de devenir médecin.", level: "formal" },
  { connector: "afin de / afin que", meaning: "in order to / so that", example: "Je parle lentement afin qu'il comprenne.", level: "common" },
];

export const concessionConnectors = [
  { connector: "bien que", meaning: "although", example: "Bien qu'il soit riche, il n'est pas heureux.", note: "+ subjunctive" },
  { connector: "quoique", meaning: "even though", example: "Quoique je sois fatigué, je continue.", note: "+ subjunctive" },
  { connector: "malgré", meaning: "despite", example: "Malgré la pluie, nous sommes sortis.", note: "+ noun" },
  { connector: "même si", meaning: "even if", example: "Même si c'est difficile, je vais essayer.", note: "+ indicative" },
];

export const timeConnectors = [
  { connector: "pendant que", meaning: "while", example: "Pendant que je lis, elle regarde la télé.", note: "simultaneous" },
  { connector: "lorsque", meaning: "when", example: "Lorsque j'étais jeune, je jouais au foot.", note: "+ imparfait" },
  { connector: "dès que", meaning: "as soon as", example: "Dès qu'il arrivera, nous partirons.", note: "future after dès que" },
  { connector: "au moment où", meaning: "at the moment when", example: "Au moment où je suis parti, il est arrivé.", note: "precise timing" },
];

export const usageExamples = [
  { french: "Il fait froid; cependant, nous sortons.", breakdown: "cependant = however (introduces contrast)" },
  { french: "Elle a triché; par conséquent, elle a échoué.", breakdown: "par conséquent = consequently (shows result)" },
  { french: "Je travaille afin de réussir.", breakdown: "afin de = in order to (shows purpose)" },
  { french: "Bien qu'il soit riche, il n'est pas heureux.", breakdown: "bien que + subjunctive = although" },
  { french: "Dès qu'il arrivera, nous mangerons.", breakdown: "dès que + future = as soon as" },
];

export const practiceQuestions = [
  { id: 1, topic: "opposition", prompt: "Which means 'however'?", options: ["cependant", "par conséquent", "afin de"], correct: 0, explanation: "Cependant = however" },
  { id: 2, topic: "opposition", prompt: "Which means 'nevertheless'?", options: ["néanmoins", "donc", "parce que"], correct: 0, explanation: "Néanmoins = nevertheless" },
  { id: 3, topic: "opposition", prompt: "Which is more formal than 'mais'?", options: ["toutefois", "et", "ou"], correct: 0, explanation: "Toutefois = more formal version of however" },
  { id: 4, topic: "consequence", prompt: "Which shows consequence/result?", options: ["par conséquent", "cependant", "bien que"], correct: 0, explanation: "Par conséquent = consequently" },
  { id: 5, topic: "consequence", prompt: "Which means 'that's why'?", options: ["c'est pourquoi", "malgré", "quoique"], correct: 0, explanation: "C'est pourquoi = that's why" },
  { id: 6, topic: "purpose", prompt: "Which shows purpose?", options: ["afin de", "par contre", "cependant"], correct: 0, explanation: "Afin de = in order to" },
  { id: 7, topic: "purpose", prompt: "What follows 'afin que'?", options: ["Subjunctive", "Indicative", "Conditional"], correct: 0, explanation: "Afin que requires subjunctive" },
  { id: 8, topic: "concession", prompt: "Which means 'although' and requires subjunctive?", options: ["bien que", "même si", "parce que"], correct: 0, explanation: "Bien que + subjunctive = although" },
  { id: 9, topic: "concession", prompt: "Which means 'even if' and uses indicative?", options: ["même si", "bien que", "quoique"], correct: 0, explanation: "Même si + indicative = even if" },
  { id: 10, topic: "concession", prompt: "Which means 'despite' and is followed by a noun?", options: ["malgré", "bien que", "quoique"], correct: 0, explanation: "Malgré + noun = despite" },
  { id: 11, topic: "time", prompt: "Which means 'while' for simultaneous actions?", options: ["pendant que", "dès que", "lorsque"], correct: 0, explanation: "Pendant que = while (simultaneous)" },
  { id: 12, topic: "time", prompt: "Which means 'as soon as'?", options: ["dès que", "pendant que", "lorsque"], correct: 0, explanation: "Dès que = as soon as" },
  { id: 13, topic: "time", prompt: "What tense follows 'dès que' for future?", options: ["Future", "Subjunctive", "Conditional"], correct: 0, explanation: "Dès que + future = as soon as" },
  { id: 14, topic: "formality", prompt: "Which is the most formal 'however'?", options: ["néanmoins", "par contre", "mais"], correct: 0, explanation: "Néanmoins is the most formal" },
  { id: 15, topic: "mixed", prompt: "Complete: _____ il pleuve, je sors.", options: ["Bien qu'il", "Malgré", "Même s'il"], correct: 0, explanation: "Bien que + subjunctive = although it rains" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Advanced connectors add sophistication to your French. Focus on the categories: opposition, consequence, purpose, concession, and time.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're learning the advanced connectors. Review which ones require subjunctive vs indicative.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You've mastered the advanced connectors! Your French expression is now sophisticated and nuanced.", emoji: "🎉", color: "green" as const };
}
