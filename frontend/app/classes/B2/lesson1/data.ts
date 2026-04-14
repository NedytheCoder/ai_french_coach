// B2 Lesson 1 — Formal and Informal Registers
export const sectionIds = ["intro", "what-is-register", "tu-vs-vous", "formal-markers", "informal-markers", "rewriting", "comparison", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Formal and Informal Registers",
  subtitle: "Master the art of choosing the right level of language for every situation. At B2, you need to navigate effortlessly between formal, neutral, and casual French.",
  lessonNumber: 1,
};

export const introSections = [
  {
    title: "Why Register Matters",
    content: "Register is not just about politeness—it's about social intelligence. Using the wrong register can make you sound arrogant, disrespectful, or simply out of place. At B2, you must demonstrate awareness of context and adapt your language accordingly.",
  },
  {
    title: "The Three Registers",
    content: "French operates primarily in three registers: soutenu (formal/written), courant (neutral/standard), and familier (casual/spoken). Each has distinct vocabulary, grammatical structures, and pronunciation patterns.",
  },
];

export const tuVsVous = {
  title: "Tu versus Vous: Beyond Grammar",
  explanation: "The choice between tu and vous reflects social dynamics: power, solidarity, age, and context. In professional settings, vous maintains distance and respect. Tu signals equality, intimacy, or a deliberate choice to break formality.",
  examples: [
    { context: "Job interview", choice: "vous", explanation: "Respect for hierarchy and professional distance" },
    { context: "First meeting, same age", choice: "vous or on se tutoie?", explanation: "Often preceded by asking permission to use tu" },
    { context: "Work colleague after months", choice: "tu", explanation: "Established rapport allows informality" },
    { context: "Email to unknown recipient", choice: "vous", explanation: "Default to formality when uncertain" },
  ],
};

export const formalMarkers = {
  title: "Markers of Formal French",
  features: [
    { feature: "Subjunctive abundance", example: "Il est nécessaire que vous soyez présent", note: "More frequent in formal contexts" },
    { feature: "Conditional politeness", example: "Je voudrais vous demander", note: "Softens requests" },
    { feature: "Passif (passive voice)", example: "Il a été décidé que...", note: "Impersonal constructions" },
    { feature: "Nominalisation", example: "La réalisation du projet", note: "Nouns instead of verbs" },
    { feature: "Complex connectors", example: "Cependant, néanmoins, par conséquent", note: "Sophisticated linking words" },
    { feature: "Full forms (not elided)", example: "Je ne sais pas (not 'sais pas')", note: "Preservation of ne in negatives" },
  ],
};

export const informalMarkers = {
  title: "Markers of Informal French",
  features: [
    { feature: "Dropping ne", example: "Je sais pas", note: "Very common in speech" },
    { feature: "Tu's and reduced forms", example: "Chuis (je suis), T'es (tu es)", note: "Phonetic reductions" },
    { feature: "Filler words", example: "Genre, du coup, enfin bref", note: "Discourse markers" },
    { feature: "Vague quantifiers", example: "Un truc, des machins", note: "Non-specific references" },
    { feature: "Question inversion dropped", example: "Tu viens ? (not Viens-tu ?)", note: "Subject-verb order" },
    { feature: "Slang and verlan", example: "Meuf (femme), keum (mec)", note: "Youth and urban language" },
  ],
};

export const rewritingExamples = [
  {
    neutral: "Je voudrais savoir si vous êtes disponible demain.",
    formal: "Je souhaiterais prendre connaissance de votre disponibilité pour demain.",
    informal: "T'es libre demain ou quoi ?",
    note: "Requesting availability",
  },
  {
    neutral: "Je ne comprends pas ce que tu dis.",
    formal: "Je n'ai pas saisi le sens de vos propos.",
    informal: "J'ai rien capté à ce que tu racontes.",
    note: "Expressing misunderstanding",
  },
  {
    neutral: "Il faut finir ce travail rapidement.",
    formal: "Il est impératif d'achever ce travail dans les plus brefs délais.",
    informal: "Faut qu'on boucle ça vite fait !",
    note: "Urgency in completing work",
  },
];

export const comparisonTable = [
  { situation: "Job application email", formal: "Je me permets de vous adresser ma candidature", neutral: "Je vous envoie ma candidature", informal: "Je te envoie mon CV (never!)" },
  { situation: "Asking for help", formal: "Pourriez-vous m'accorder votre assistance ?", neutral: "Pourriez-vous m'aider ?", informal: "Tu peux m'aider ?" },
  { situation: "Disagreeing politely", formal: "Je ne partage pas tout à fait cette opinion", neutral: "Je ne suis pas d'accord", informal: "C'est n'importe quoi !" },
  { situation: "Thanking sincerely", formal: "Je vous saurais gré de bien vouloir...", neutral: "Je vous remercie beaucoup", informal: "Merci, t'es trop cool !" },
];

export const commonMistakes = [
  { wrong: "Using tu with a client's CEO", problem: "Over-familiarity can damage professional relationships", solution: "Always default to vous in business until invited otherwise" },
  { wrong: "Writing 'je sais pas' in a formal email", problem: "Informal constructions undermine credibility", solution: "Use complete forms: je ne sais pas" },
  { wrong: "Over-using subjunctive in casual conversation", problem: "Can sound pedantic or artificial", solution: "Match register to context" },
  { wrong: "Mixing registers inconsistently", problem: "Creates cognitive dissonance for the listener", solution: "Maintain register consistency within a text or conversation" },
];

export const practiceQuestions = [
  { id: 1, topic: "register-recognition", prompt: "Which is the most formal version?", options: ["Je me permets de solliciter votre attention", "J'aimerais te parler", "Faut que je te dise un truc"], correct: 0, explanation: "Solliciter and me permets are formal markers" },
  { id: 2, topic: "tu-vous", prompt: "In a first business meeting, you should use:", options: ["vous until invited to use tu", "tu to be friendly", "on"], correct: 0, explanation: "Default to vous in professional contexts" },
  { id: 3, topic: "formal-markers", prompt: "Which feature marks formal French?", options: ["Preservation of 'ne' in negatives", "Dropping 'ne'", "Using 'genre' as filler"], correct: 0, explanation: "Keeping ne (je ne sais pas) is formal" },
  { id: 4, topic: "informal-markers", prompt: "Which is informal/casual?", options: ["Chuis fatigué", "Je suis fatigué", "Je me sens fatigué"], correct: 0, explanation: "Chuis is a phonetic reduction of je suis" },
  { id: 5, topic: "rewriting", prompt: "Rewrite formally: 'Faut qu'on parle'", options: ["Il est nécessaire que nous discussions", "Il faut qu'on parle", "Faut parler"], correct: 0, explanation: "Nominalisation (discussion) and nous make it formal" },
  { id: 6, topic: "context", prompt: "For a university application letter, use:", options: ["Formal register", "Informal register", "Familiar slang"], correct: 0, explanation: "Academic applications require soutenu register" },
  { id: 7, topic: "conditional", prompt: "Which softens a request politely?", options: ["Je voudrais", "Je veux", "Faut que j'aie"], correct: 0, explanation: "Conditional (voudrais) is polite and formal" },
  { id: 8, topic: "passive", prompt: "Which uses impersonal formal construction?", options: ["Il a été décidé que...", "On a décidé que...", "J'ai décidé que..."], correct: 0, explanation: "Passive voice (il a été décidé) is formal" },
  { id: 9, topic: "inappropriate", prompt: "Which is NEVER appropriate in formal writing?", options: ["Du coup", "Cependant", "Néanmoins"], correct: 0, explanation: "Du coup is spoken/informal only" },
  { id: 10, topic: "nominalisation", prompt: "Which demonstrates nominalisation?", options: ["La réalisation du projet", "Nous réalisons le projet", "On réalise le projet"], correct: 0, explanation: "Turning the verb into a noun (nominalisation) is formal" },
  { id: 11, topic: "email", prompt: "How to begin a formal email to an unknown person?", options: ["Madame, Monsieur,", "Salut !", "Coucou"], correct: 0, explanation: "Madame, Monsieur is standard formal opening" },
  { id: 12, topic: "over-formal", prompt: "Which might sound overly formal in casual conversation?", options: ["Je souhaiterais", "Je veux", "J'aimerais"], correct: 0, explanation: "Souhaiterais can sound stiff in casual contexts" },
  { id: 13, topic: "verlan", prompt: "Which is verlan (back slang)?", options: ["meuf", "femme", "fille"], correct: 0, explanation: "Meuf is verlan for femme" },
  { id: 14, topic: "consistency", prompt: "What happens when you mix registers inconsistently?", options: ["Sounds awkward/confusing", "Shows versatility", "Impresses listeners"], correct: 0, explanation: "Register mixing creates cognitive dissonance" },
  { id: 15, topic: "professional", prompt: "In a professional email, avoid:", options: ["Abbreviations like 'bcp' for beaucoup", "Complete sentences", "Clear subject lines"], correct: 0, explanation: "Text abbreviations are too informal for professional contexts" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Register awareness takes time to develop. Review the formal markers and practice identifying context clues.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Solid progress", message: "You are developing good register sensitivity. Focus on distinguishing subtle formal markers and practicing rewrites.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You demonstrate strong awareness of French registers. You can navigate between formal, neutral, and informal contexts effectively.", emoji: "🌟", color: "green" as const };
}
