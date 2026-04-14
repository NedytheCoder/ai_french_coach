// B2 Lesson 10 — High-Level Connectors & Transitions
export const sectionIds = ["intro", "logic", "contrast", "consequence", "chronology", "exemplification", "summary", "practice", "completion"];

export const lessonMeta = {
  title: "High-Level Connectors & Transitions",
  subtitle: "Master sophisticated discourse markers that create cohesion, flow, and logical structure in advanced French communication.",
  lessonNumber: 10,
};

export const introSections = [
  {
    title: "Beyond Basic Connectors",
    content: "At B2, you move beyond simple et, mais, donc. You need connectors that express subtle logical relationships: opposition, concession, cause, consequence, chronology, restriction.",
  },
  {
    title: "Discourse Architecture",
    content: "Connectors structure your message. They guide readers through your reasoning, signal turns in argumentation, and create sophisticated rhetorical patterns.",
  },
];

export const logicCategories = [
  { category: "Addition", basic: "et", advanced: ["de plus", "en outre", "par ailleurs", "qui plus est"], example: "En outre, cette solution est économique." },
  { category: "Contrast", basic: "mais", advanced: ["cependant", "néanmoins", "toutefois", "pourtant", "en revanche"], example: "Néanmoins, il reste des obstacles." },
  { category: "Concession", basic: "bien que", advanced: ["certes... mais", "il est vrai que... mais", "sans doute... cependant"], example: "Certes, c'est cher, mais c'est durable." },
  { category: "Cause", basic: "parce que", advanced: ["puisque", "étant donné que", "vu que", "du fait que"], example: "Étant donné que nous avons peu de temps..." },
  { category: "Consequence", basic: "donc", advanced: ["par conséquent", "dès lors", "ainsi", "c'est pourquoi", "de ce fait"], example: "Par conséquent, nous devons agir vite." },
  { category: "Restriction", basic: "mais", advanced: ["seulement", "sauf que", "excepté que", "tout au plus"], example: "Il viendra, seulement en retard." },
];

export const contrastSection = {
  title: "Sophisticated Contrast and Opposition",
  connectors: [
    { connector: "cependant", register: "Formal", usage: "Neutral opposition", example: "Cependant, cette approche présente des risques." },
    { connector: "néanmoins", register: "Formal", usage: "Stronger opposition", example: "Néanmoins, il persévéra dans son projet." },
    { connector: "toutefois", register: "Formal", usage: "Qualification", example: "Toutefois, il convient de nuancer." },
    { connector: "pourtant", register: "Neutral", usage: "Unexpected contrast", example: "Pourtant, tout semblait facile." },
    { connector: "en revanche", register: "Neutral", usage: "Alternative perspective", example: "En revanche, les coûts augmentent." },
    { connector: "au contraire", register: "Neutral", usage: "Strong contradiction", example: "Au contraire, il faut accélérer." },
  ],
  positionNote: "Most formal connectors can start sentences or appear after subject (il néanmoins persévéra).",
};

export const consequenceSection = {
  title: "Cause and Consequence",
  causeConnectors: [
    { connector: "puisque", meaning: "since/because (known fact)", example: "Puisque tu es là, commençons." },
    { connector: "étant donné que", meaning: "given that (formal)", example: "Étant donné que les données sont claires..." },
    { connector: "vu que", meaning: "seeing that (neutral)", example: "Vu que tu insistes, je vais expliquer." },
    { connector: "en raison de", meaning: "due to (nominal)", example: "En raison de la pluie, le match est annulé." },
  ],
  consequenceConnectors: [
    { connector: "par conséquent", register: "Formal", example: "Par conséquent, il démissionna." },
    { connector: "dès lors", register: "Formal/literary", example: "Dès lors, tout changea." },
    { connector: "ainsi", register: "Formal", example: "Ainsi, nous évitons les erreurs." },
    { connector: "c'est pourquoi", register: "Neutral", example: "C'est pourquoi je ne peux pas accepter." },
    { connector: "de ce fait", register: "Formal", example: "De ce fait, la décision est reportée." },
    { connector: "partant", register: "Very formal", example: "Partant de ce constat, nous proposons..." },
  ],
};

export const chronologySection = {
  title: "Chronological and Logical Sequencing",
  connectors: [
    { type: "Opening/Introduction", markers: ["tout d'abord", "premièrement", "en premier lieu", "avant tout"], example: "Tout d'abord, examinons le contexte." },
    { type: "Continuation/Addition", markers: ["ensuite", "deuxièmement", "par la suite", "de surcroît"], example: "Ensuite, nous aborderons les solutions." },
    { type: "Conclusion/Synthesis", markers: ["enfin", "finalement", "pour conclure", "en conclusion", "en dernier lieu"], example: "Pour conclure, résumons nos arguments." },
    { type: "Simultaneity", markers: ["pendant ce temps", "simultanément", "au même moment", "tandis que"], example: "Pendant ce temps, les négociations continuaient." },
    { type: "Precedence", markers: ["auparavant", "préalablement", "au préalable", "précédemment"], example: "Auparavant, il avait travaillé à Paris." },
    { type: "Subsequence", markers: ["ensuite", "par la suite", "ultérieurement", "dans un second temps"], example: "Ulérieurement, il deviendra président." },
  ],
};

export const exemplificationSection = {
  title: "Exemplification and Illustration",
  markers: [
    { marker: "ainsi", meaning: "thus/in this way", example: "Ainsi, le problème se résout facilement." },
    { marker: "par exemple", meaning: "for example", example: "Plusieurs pays, par exemple la France, ont adopté..." },
    { marker: "notamment", meaning: "notably/in particular", example: "Des pays européens, notamment l'Allemagne..." },
    { marker: "en particulier", meaning: "in particular", example: "Cela concerne en particulier les jeunes." },
    { marker: "c'est le cas de", meaning: "this is the case of", example: "C'est le cas de nombreuses startups." },
    { marker: "à titre d'exemple", meaning: "as an example", example: "À titre d'exemple, citons ce projet." },
    { marker: "prenons le cas de", meaning: "let's take the case of", example: "Prenons le cas d'un étudiant typique." },
  ],
};

export const summarySection = {
  title: "Summary and Conclusion Markers",
  markers: [
    { marker: "en somme", register: "Formal", meaning: "in sum", example: "En somme, nous devons agir maintenant." },
    { marker: "bref", register: "Neutral", meaning: "in short", example: "Bref, la situation est critique." },
    { marker: "en résumé", register: "Neutral", meaning: "in summary", example: "En résumé, trois facteurs déterminent..." },
    { marker: "pour résumer", register: "Neutral", meaning: "to summarize", example: "Pour résumer les points essentiels..." },
    { marker: "tout compte fait", register: "Neutral", meaning: "all things considered", example: "Tout compte fait, c'est une bonne idée." },
    { marker: "en définitive", register: "Formal", meaning: "ultimately", example: "En définitive, peu importe le choix." },
    { marker: "au bout du compte", register: "Neutral", meaning: "in the end", example: "Au bout du compte, tout s'arrange." },
  ],
};

export const practiceQuestions = [
  { id: 1, topic: "contrast", prompt: "Formal alternative to 'mais':", options: ["cependant", "et", "donc"], correct: 0, explanation: "Cependant = formal but/however" },
  { id: 2, topic: "cause", prompt: "'Since you're here' (known fact):", options: ["Puisque tu es là", "Parce que tu es là", "Alors que tu es là"], correct: 0, explanation: "Puisque = cause as known fact" },
  { id: 3, topic: "consequence", prompt: "Most formal 'therefore':", options: ["par conséquent", "alors", "du coup"], correct: 0, explanation: "Par conséquent = very formal" },
  { id: 4, topic: "concession", prompt: "'Certes... mais' expresses:", options: ["Concession/acknowledgment", "Pure contrast", "Cause and effect"], correct: 0, explanation: "Acknowledge something, then contrast" },
  { id: 5, topic: "chronology", prompt: "Opening marker:", options: ["Tout d'abord", "En conclusion", "Cependant"], correct: 0, explanation: "First/To begin with" },
  { id: 6, topic: "exemplification", prompt: "'Notably/in particular':", options: ["notamment", "cependant", "ainsi"], correct: 0, explanation: "Notamment = notably" },
  { id: 7, topic: "summary", prompt: "'In sum' (formal):", options: ["En somme", "Bref", "Donc"], correct: 0, explanation: "En somme = in sum" },
  { id: 8, topic: "addition", prompt: "Formal 'moreover':", options: ["en outre", "mais", "pourtant"], correct: 0, explanation: "En outre = moreover/furthermore" },
  { id: 9, topic: "precedence", prompt: "'Previously/beforehand':", options: ["auparavant", "ensuite", "désormais"], correct: 0, explanation: "Auparavant = before" },
  { id: 10, topic: "simultaneity", prompt: "'Meanwhile':", options: ["pendant ce temps", "après", "enfin"], correct: 0, explanation: "Pendant ce temps = meanwhile" },
  { id: 11, topic: "formal-given", prompt: "Formal 'given that':", options: ["étant donné que", "parce que", "quand"], correct: 0, explanation: "Étant donné que = given that (formal)" },
  { id: 12, topic: "literary", prompt: "Very formal/literary 'from which follows':", options: ["partant", "ainsi", "donc"], correct: 0, explanation: "Partant = very formal consequence marker" },
  { id: 13, topic: "restriction", prompt: "'Only/except that':", options: ["seulement", "de plus", "ainsi"], correct: 0, explanation: "Seulement = restriction marker" },
  { id: 14, topic: "conclusion-opening", prompt: "To introduce a conclusion:", options: ["Pour conclure", "Tout d'abord", "Cependant"], correct: 0, explanation: "Pour conclure = in conclusion" },
  { id: 15, topic: "ultimately", prompt: "'Ultimately/in the final analysis':", options: ["en définitive", "bref", "en somme"], correct: 0, explanation: "En définitive = ultimately" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "High-level connectors require exposure. Focus on the main categories: contrast (cependant, néanmoins), consequence (par conséquent), cause (puisque, étant donné que).", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are expanding your connector repertoire. Focus on formal variants and their register distinctions.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You command a sophisticated range of connectors. Your discourse flows with logical precision and appropriate register.", emoji: "🌟", color: "green" as const };
}
