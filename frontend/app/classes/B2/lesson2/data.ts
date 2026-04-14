// B2 Lesson 2 — Idiomatic Expressions
export const sectionIds = ["intro", "what-are-idioms", "common-idioms", "context-matters", "usage-misuse", "dialogues", "practice", "completion"];

export const lessonMeta = {
  title: "Idiomatic Expressions",
  subtitle: "Go beyond literal meaning. Master high-frequency French idioms that make your speech natural and culturally attuned.",
  lessonNumber: 2,
};

export const introSections = [
  {
    title: "Why Idioms Matter",
    content: "Idioms are the soul of a language. They carry cultural wisdom, humor, and shared understanding. At B2, you need to recognize and use common idioms appropriately—neither over-using them nor missing them when others speak.",
  },
  {
    title: "The Translation Trap",
    content: "Literal translation of idioms often produces nonsense. 'It's raining cats and dogs' makes sense in English, but word-for-word translation into French would confuse everyone. Instead, French has 'il pleut comme vache qui pisse' (it's raining like a pissing cow).",
  },
];

export const commonIdioms = [
  { idiom: "Poser un lapin", literal: "To leave a rabbit", meaning: "To stand someone up", context: "Rendez-vous, amitié", register: "Informal" },
  { idiom: "Coûter les yeux de la tête", literal: "To cost the eyes from the head", meaning: "To cost an arm and a leg", context: "Argent, achats", register: "Neutral" },
  { idiom: "Avoir le cafard", literal: "To have the cockroach", meaning: "To be down/depressed", context: "Émotions", register: "Literary" },
  { idiom: "Prendre la tangente", literal: "To take the tangent", meaning: "To make a quick exit/escape", context: "Situations sociales", register: "Neutral" },
  { idiom: "Avoir la pêche", literal: "To have the peach", meaning: "To feel great/full of energy", context: "Santé, énergie", register: "Very informal" },
  { idiom: "Raconter des salades", literal: "To tell salads", meaning: "To tell lies/fibs", context: "Déception, mensonge", register: "Informal" },
  { idiom: "Casser les pieds à quelqu'un", literal: "To break someone's feet", meaning: "To annoy someone", context: "Relations", register: "Informal" },
  { idiom: "Mettre les points sur les i", literal: "To put the dots on the i's", meaning: "To be clear and precise", context: "Communication", register: "Formal" },
  { idiom: "En avoir marre", literal: "To have enough", meaning: "To be fed up", context: "Frustration", register: "Very informal" },
  { idiom: "Être au bout du rouleau", literal: "To be at the end of the roll", meaning: "To be exhausted/at wit's end", context: "Fatigue, épuisement", register: "Neutral" },
];

export const contextExamples = [
  { idiom: "Il pleut comme vache qui pisse", meaning: "It's raining heavily", whenToUse: "Among friends, complaining about weather", whenNot: "Formal weather reports" },
  { idiom: "On verra ça plus tard", meaning: "We'll see about that later", whenToUse: "Neutral contexts, postponing decisions", whenNot: "When you want to be direct and decisive" },
  { idiom: "Ça ne casse pas trois pattes à un canard", meaning: "It's nothing special", whenToUse: "Expressing mild disappointment politely", whenNot: "Praising something excellent" },
  { idiom: "Avoir du pain sur la planche", meaning: "To have a lot of work to do", whenToUse: "Work contexts, describing workload", whenNot: "When describing leisure time" },
];

export const usageVsMisuse = [
  { correct: "Après ce projet, j'ai la pêche !", incorrect: "Après ce projet, j'ai la pêche, Monsieur le Maire.", explanation: "'La pêche' is too informal for formal authority figures" },
  { correct: "Elle m'a posé un lapin.", incorrect: "Le client a posé un lapin à la réunion.", explanation: "Business contexts require more formal language" },
  { correct: "Cet ordinateur coûte les yeux de la tête.", incorrect: "Cet stylo coûte les yeux de la tête.", explanation: "Idioms should match the scale of the situation" },
];

export const miniDialogues = [
  {
    context: "At work, expressing frustration",
    dialogue: [
      { speaker: "A", text: "Tu as fini le rapport ?" },
      { speaker: "B", text: "Non, j'ai tellement de travail. J'ai du pain sur la planche." },
      { speaker: "A", text: "Je comprends. On verra ça demain." },
    ],
  },
  {
    context: "Friends making plans",
    dialogue: [
      { speaker: "A", text: "Tu viens ce soir ?" },
      { speaker: "B", text: "Oui, j'ai la pêche aujourd'hui !" },
      { speaker: "A", text: "Super, on va s'amuser." },
    ],
  },
];

export const practiceQuestions = [
  { id: 1, topic: "recognition", prompt: "What does 'poser un lapin' mean?", options: ["To stand someone up", "To give a gift", "To make someone laugh"], correct: 0, explanation: "Poser un lapin = not showing up for a date/appointment" },
  { id: 2, topic: "recognition", prompt: "What does 'avoir le cafard' express?", options: ["Sadness/depression", "Fear of insects", "Hunger"], correct: 0, explanation: "Avoir le cafard = feeling down (from 'La peste' by Camus)" },
  { id: 3, topic: "register", prompt: "Which idiom is too informal for a job interview?", options: ["J'ai la pêche", "Je suis motivé", "Je suis compétent"], correct: 0, explanation: "'La pêche' is very casual slang" },
  { id: 4, topic: "meaning", prompt: "'Coûter les yeux de la tête' means:", options: ["To be very expensive", "To be painful", "To be dangerous"], correct: 0, explanation: "It's the French equivalent of 'cost an arm and a leg'" },
  { id: 5, topic: "context", prompt: "When would you use 'prendre la tangente'?", options: ["Leaving a boring party", "Solving a math problem", "Cooking dinner"], correct: 0, explanation: "Prendre la tangente = making a quick escape" },
  { id: 6, topic: "register", prompt: "Which is appropriate for formal writing?", options: ["Mettre les points sur les i", "Avoir la pêche", "Raconter des salades"], correct: 0, explanation: "This idiom about clarity is acceptable in formal contexts" },
  { id: 7, topic: "translation", prompt: "The English 'it's raining cats and dogs' in French is:", options: ["Il pleut comme vache qui pisse", "Il pleut des chats et des chiens", "Il pleut beaucoup"], correct: 0, explanation: "French uses a different animal metaphor (cow, not cats/dogs)" },
  { id: 8, topic: "meaning", prompt: "'Avoir du pain sur la planche' means:", options: ["To have much work ahead", "To be hungry", "To bake bread"], correct: 0, explanation: "Originally from artisans who had bread waiting to be sliced = work waiting" },
  { id: 9, topic: "misuse", prompt: "What's wrong with: 'Le ministre a posé un lapin'?", options: ["Wrong register for formal context", "Wrong meaning", "Grammatically incorrect"], correct: 0, explanation: "Too informal for describing a minister's actions" },
  { id: 10, topic: "meaning", prompt: "'Casser les pieds à quelqu'un' means:", options: ["To annoy someone", "To help someone", "To dance with someone"], correct: 0, explanation: "Literally 'break someone's feet' = annoy them" },
  { id: 11, topic: "intensity", prompt: "'En avoir marre' expresses:", options: ["Being fed up", "Being happy", "Being confused"], correct: 0, explanation: "Strong expression of having had enough" },
  { id: 12, topic: "literary", prompt: "Which idiom comes from Camus's 'La Peste'?", options: ["Avoir le cafard", "Avoir la pêche", "Poser un lapin"], correct: 0, explanation: "The cockroach metaphor for depression appears in this novel" },
  { id: 13, topic: "context", prompt: "'Être au bout du rouleau' describes:", options: ["Exhaustion/depletion", "Success", "Beginning something"], correct: 0, explanation: "At the end of the roll (paper/fabric) = nothing left" },
  { id: 14, topic: "politeness", prompt: "'Ça ne casse pas trois pattes à un canard' is:", options: ["Mild criticism", "High praise", "A question"], correct: 0, explanation: "It doesn't break three legs of a duck = nothing special" },
  { id: 15, topic: "appropriateness", prompt: "In a formal email, replace 'J'en ai marre' with:", options: ["Je souhaite explorer d'autres options", "C'est génial", "Je suis fatigué"], correct: 0, explanation: "Use formal, professional language in emails" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Idioms require exposure and practice. Review the core meanings and pay attention to register.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are recognizing idioms well. Focus on using them appropriately in context.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You understand French idioms deeply. Your speech will sound natural and culturally attuned.", emoji: "🌟", color: "green" as const };
}
