// B2 Lesson 3 — Historic Past (Passé Simple) & Anterior Past (Passé Antérieur)
export const sectionIds = ["intro", "what-is-passe-simple", "recognition", "passif-anterieur", "literary-usage", "recognition-practice", "comparison", "practice", "completion"];

export const lessonMeta = {
  title: "Historic Past & Anterior Past",
  subtitle: "Recognize and understand literary tenses. At B2, you read literature, journalism, and formal texts where these tenses appear. Recognition matters more than production.",
  lessonNumber: 3,
};

export const introSections = [
  {
    title: "Why These Tenses Matter",
    content: "The passé simple and passé antérieur are literary tenses. You will encounter them in novels, history books, formal journalism, and academic writing. At B2, your goal is recognition and comprehension—you need to understand timelines in sophisticated texts.",
  },
  {
    title: "Production vs. Recognition",
    content: "Native speakers rarely use passé simple in speech. However, you must recognize it instantly in writing. Focus on identifying who did what, when, and in what sequence.",
  },
];

export const passeSimpleInfo = {
  title: "The Passé Simple (Historic Past)",
  explanation: "A narrative past used almost exclusively in written French. It creates distance, formality, and literary tone.",
  formation: [
    { type: "Regular -er", example: "il parl → il parla", note: "Replace -er with -a" },
    { type: "Regular -ir/-re", example: "il fin → il finit / il vend → il vendit", note: "Replace with -it" },
    { type: "Être", example: "il fut", note: "Highly irregular" },
    { type: "Avoir", example: "il eut", note: "Highly irregular" },
    { type: "Aller", example: "il alla", note: "Irregular" },
    { type: "Faire", example: "il fit", note: "Irregular" },
    { type: "Venir", example: "il vint", note: "Irregular" },
    { type: "Voir", example: "il vit", note: "Irregular" },
  ],
};

export const recognitionExamples = [
  { text: "Napoléon mourut en 1821.", verb: "mourut (mourir)", meaning: "Napoleon died in 1821", tense: "Passé simple" },
  { text: "Le roi déclara la guerre.", verb: "déclara (déclarer)", meaning: "The king declared war", tense: "Passé simple" },
  { text: "Elle naquit à Paris.", verb: "naquit (naître)", meaning: "She was born in Paris", tense: "Passé simple" },
  { text: "Ils virent la mer.", verb: "virent (voir)", meaning: "They saw the sea", tense: "Passé simple" },
  { text: "Il fit construire un château.", verb: "fit (faire)", meaning: "He had a castle built", tense: "Passé simple" },
];

export const passeAntérieurInfo = {
  title: "The Passé Antérieur (Anterior Past)",
  explanation: "A compound literary tense indicating an action completed before another past action. Formed with passé simple of auxiliary + past participle.",
  formation: [
    { auxiliary: "eus", example: "j'eus fini", note: "Passé simple of avoir + participle" },
    { auxiliary: "fus", example: "je fus parti", note: "Passé simple of être + participle" },
  ],
  usage: "Appears after conjunctions like quand, lorsque, dès que, aussitôt que when the main verb is in passé simple.",
};

export const passeAntérieurExamples = [
  { text: "Quand il eut terminé, il partit.", breakdown: "eut terminé = had finished (before leaving)", timeline: "First: finished; Then: left" },
  { text: "Dès qu'elle fut arrivée, elle téléphona.", breakdown: "fut arrivée = had arrived (before calling)", timeline: "First: arrived; Then: called" },
  { text: "Lorsque le roi eut signé, la loi entra en vigueur.", breakdown: "eut signé = had signed (before law took effect)", timeline: "First: signed; Then: law effective" },
];

export const literaryUsageContexts = [
  { context: "Historical narrative", example: "Louis XIV construit le château de Versailles. (history book uses présent historique or passé simple)", frequency: "Very common" },
  { context: "Classic literature", example: "Marcel Proust, Albert Camus, Victor Hugo", frequency: "Universal in pre-20th century literature" },
  { context: "Modern literary fiction", example: "Contemporary novelists still use passé simple for literary effect", frequency: "Selective, stylistic" },
  { context: "Journalism (formal)", example: "Le président déclara que... (in written press)", frequency: "Common in Le Monde, Le Figaro" },
  { context: "Academic writing", example: "L'auteur démontre que... (more common: présent)", frequency: "Less common today" },
];

export const timelineComparisons = [
  { tense: "Passé composé", example: "Il a mangé puis il est parti.", usage: "Everyday speech and writing", level: "A2-B1" },
  { tense: "Passé simple", example: "Il mangea puis il partit.", usage: "Literary narrative", level: "B2 recognition" },
  { tense: "Plus-que-parfait", example: "Il avait mangé avant de partir.", usage: "Past before past", level: "B1" },
  { tense: "Passé antérieur", example: "Quand il eut mangé, il partit.", usage: "Literary past before literary past", level: "B2 recognition" },
];

export const recognitionPractice = [
  { sentence: "Napoléon mourut en 1821 à Sainte-Hélène.", question: "What does 'mourut' mean?", options: ["died", "lived", "traveled"], correct: 0, explanation: "Mourut = passé simple of mourir = died" },
  { sentence: "Quand il eut fini son discours, il quitta la tribune.", question: "What happened first?", options: ["He finished speaking", "He left the podium", "Neither"], correct: 0, explanation: "Eut fini = passé antérieur = had finished (before leaving)" },
];

export const practiceQuestions = [
  { id: 1, topic: "passe-simple-recognition", prompt: "What is 'il parla'?", options: ["Passé simple of parler", "Imparfait of parler", "Future of parler"], correct: 0, explanation: "Parla = passé simple (he spoke)" },
  { id: 2, topic: "passe-simple-meaning", prompt: "'Le roi déclara la guerre' means:", options: ["The king declared war", "The king will declare war", "The king declares war"], correct: 0, explanation: "Déclara = passé simple = past action" },
  { id: 3, topic: "irregular", prompt: "What is the passé simple of 'être'?", options: ["je fus / il fut", "j'étais / il était", "j'ai été / il a été"], correct: 0, explanation: "Être is highly irregular: fus, fus, fut, fûmes, fûtes, furent" },
  { id: 4, topic: "passe-anterieur-formation", prompt: "Passé antérieur is formed with:", options: ["Passé simple of auxiliary + past participle", "Imparfait of auxiliary + participle", "Present of auxiliary + participle"], correct: 0, explanation: "Uses passé simple of avoir/être, not imparfait" },
  { id: 5, topic: "sequence", prompt: "In 'Quand il eut terminé, il partit', what happened first?", options: ["He finished", "He left", "Both at once"], correct: 0, explanation: "Eut terminé = had finished (before leaving)" },
  { id: 6, topic: "context", prompt: "Where would you encounter passé simple?", options: ["Novels and formal writing", "Everyday conversation", "Text messages"], correct: 0, explanation: "Literary/formal written French" },
  { id: 7, topic: "avoir", prompt: "What is 'il eut'?", options: ["Passé simple of avoir", "Imparfait of avoir", "Passé composé of avoir"], correct: 0, explanation: "Eut = passé simple of avoir (he had)" },
  { id: 8, topic: "faire", prompt: "What is 'elle fit'?", options: ["Passé simple of faire", "Imparfait of faire", "Present of faire"], correct: 0, explanation: "Fit = passé simple of faire (she did/made)" },
  { id: 9, topic: "venir", prompt: "'Ils vinrent de Paris' means:", options: ["They came from Paris", "They come from Paris", "They will come from Paris"], correct: 0, explanation: "Vinrent = passé simple of venir" },
  { id: 10, topic: "naître", prompt: "'Elle naquit en 1900' means:", options: ["She was born in 1900", "She is born in 1900", "She will be born in 1900"], correct: 0, explanation: "Naquit = passé simple of naître" },
  { id: 11, topic: "conjunction", prompt: "Passé antérieur often follows:", options: ["Quand, dès que, aussitôt que", "Parce que, puisque", "Si, quoique"], correct: 0, explanation: "Time conjunctions trigger passé antérieur" },
  { id: 12, topic: "recognition", prompt: "How should B2 learners approach passé simple?", options: ["Recognition in reading", "Active production in speech", "Avoid completely"], correct: 0, explanation: "Focus on understanding, not producing" },
  { id: 13, topic: "mourir", prompt: "'Il mourut' means:", options: ["He died", "He dies", "He will die"], correct: 0, explanation: "Mourut = passé simple of mourir" },
  { id: 14, topic: "vocab", prompt: "Passé simple is also called:", options: ["Historic past / Prétérit", "Perfect past", "Compound past"], correct: 0, explanation: "Also called passé historique or prétérit" },
  { id: 15, topic: "literary", prompt: "Which author famously uses passé simple?", options: ["Marcel Proust", "Only modern bloggers", "SMS writers"], correct: 0, explanation: "Proust's 'Du côté de chez Swann' uses passé simple throughout" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Literary tenses take time to recognize. Focus on the most common irregular forms: fut, eut, fit, vit, naquit, mourut.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are recognizing literary tenses well. Continue reading French literature to strengthen recognition.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand literary tenses deeply. You can read sophisticated French texts with confidence.", emoji: "🌟", color: "green" as const };
}
