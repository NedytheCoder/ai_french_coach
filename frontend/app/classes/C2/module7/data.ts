/**
 * C2 Module 7 - Idiomatic & Native-Level Expression
 * ====================================================
 *
 * This file contains all lesson data for C2 Module 7, teaching mastery of
 * French idioms, collocations, and natural phrasing. Students learn to eliminate
 * translation traces and achieve authentic, native-like fluency.
 *
 * **Module Content:**
 * - Introduction: The mark of nativeness, beyond correctness
 * - Advanced Idioms: 8 sophisticated idioms (avoir le bras long, poser un lapin, etc.)
 * - Essential Collocations: 6 natural verb+noun pairings (prendre une décision, etc.)
 * - Weak/Strong/Expert examples: 3-tier idiomatic progression
 * - Translation Traps: 6 common anglicisms to avoid
 * - 15 practice quiz questions (precision and transformation types)
 *
 * **Key Concepts:**
 * - Natural collocations: 'prendre une décision' (not 'faire'), 'remédier à' (not 'réparer')
 * - Idiomatic competence: Using expressions like 'avoir le bras long', 'poser un lapin'
 * - Translation traps: English phrases that don't translate literally
 * - Body part idioms: 'coûter les yeux de la tête', 'donner sa langue au chat'
 * - Time idioms: 'chercher midi à quatorze heures'
 * - Formal elegance: 'Je vous suis redevable', 'faire part de la gratitude'
 *
 * **Common Translation Traps:**
 * - Make a decision → prendre (not faire) une décision
 * - Fix a problem → remédier à (not réparer) un problème
 * - Have a meeting → tenir (not avoir) une réunion
 * - Do research → mener des recherches
 * - Ask a question → poser (not demander) une question
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to idiomatic mastery
 * 4. advancedIdioms - 8 sophisticated French idioms
 * 5. collocations - 6 essential verb+noun collocations
 * 6. weakStrongExpertExamples - 3-tier idiomatic progression
 * 7. translationTraps - 6 common anglicisms to avoid
 * 8. practiceQuestions - 15 quiz questions
 * 9. getResultMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all module section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to the mark of nativeness
 * 2. idioms - Advanced idioms and expressions
 * 3. collocations - Natural verb+noun pairings
 * 4. native - Native-level phrasing
 * 5. translation - Translation trap avoidance
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "idioms", "collocations", "native", "translation", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Idiomatic & Native-Level Expression",
  /** Brief description of module content */
  subtitle: "Master idioms, collocations, and natural phrasing. Eliminate all traces of translation and express yourself with authentic, native-like fluency.",
  /** Module number in C2 series */
  moduleNumber: 7,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to idiomatic and native-level expression.
 *
 * Content:
 * - The Mark of Nativeness: Idiomatic competence as native speaker recognition
 * - Beyond Correctness: Natural preferences ('prendre une décision' vs 'faire')
 */
export const introSections = [
  {
    title: "The Mark of Nativeness",
    content: "At C2, your French should sound conceived in French. This means using idioms appropriately, deploying collocations naturally, and avoiding the subtle traces of translation that mark even advanced speakers. Native speakers recognize each other by idiomatic competence.",
  },
  {
    title: "Beyond Correctness",
    content: "Grammatical correctness is necessary but not sufficient. Native speakers say 'prendre une décision' not 'faire une décision', 'remédier à' not 'réparer', 'en termes de' not 'sur le plan de' (in many contexts). C2 mastery means knowing these preferences instinctively.",
  },
];

// =============================================================================
// ADVANCED IDIOMS
// =============================================================================

/**
 * advancedIdioms - Eight sophisticated French idioms for C2 mastery.
 *
 * Idioms:
 * - Avoir le bras long: Have influence/connections (networking contexts)
 * - Mettre les points sur les i: Clarify precisely (precision contexts)
 * - Chercher midi à quatorze heures: Overcomplicate (simplification)
 * - Coûter les yeux de la tête: Extremely expensive (expressive cost)
 * - Avoir le coup de foudre: Love at first sight (strong immediate reaction)
 * - Donner sa langue au chat: Give up guessing (admitting defeat)
 * - Poser un lapin: Stand someone up (not showing up)
 * - Avoir le culot: Have nerve/audacity (negative audacity)
 *
 * Each idiom includes meaning, example sentence, and usage note.
 */
export const advancedIdioms = {
  title: "Advanced Idioms for C2",
  idioms: [
    { idiom: "Avoir le bras long", meaning: "To have influence/connections", example: "Il a le bras long dans ce milieu.", note: "Networking contexts" },
    { idiom: "Mettre les points sur les i", meaning: "To clarify precisely", example: "Permettez-moi de mettre les points sur les i.", note: "Precision contexts" },
    { idiom: "Chercher midi à quatorze heures", meaning: "To overcomplicate", example: "Ne cherchons pas midi à quatorze heures.", note: "Simplification" },
    { idiom: "Coûter les yeux de la tête", meaning: "Extremely expensive", example: "Ça coûte les yeux de la tête!", note: "Expressive cost" },
    { idiom: "Avoir le coup de foudre", meaning: "Love at first sight", example: "J'ai eu le coup de foudre.", note: "Strong immediate reaction" },
    { idiom: "Donner sa langue au chat", meaning: "Give up guessing", example: "Je donne ma langue au chat.", note: "Admitting defeat in guessing" },
    { idiom: "Poser un lapin", meaning: "Stand someone up", example: "Il m'a posé un lapin.", note: "Not showing up" },
    { idiom: "Avoir le culot", meaning: "Have nerve/audacity", example: "Il a le culot de prétendre que...", note: "Negative audacity" },
  ],
};

// =============================================================================
// COLLOCATIONS
// =============================================================================

/**
 * collocations - Six essential French collocations (verb+noun pairings).
 *
 * Natural pairings:
 * - prendre: une décision, conscience de, en compte, en charge (not 'faire')
 * - remédier: à un problème, à une situation (not 'réparer')
 * - apporter: une solution, des précisions, son aide (not 'donner')
 * - porter: atteinte à, plainte, un jugement (not 'apporter')
 * - tirer: profit de, les conséquences, parti de (not 'prendre')
 * - faire: fausse route, l'impasse, figure (not 'prendre')
 *
 * Each shows correct verb and common incorrect alternative.
 */
export const collocations = {
  title: "Essential Collocations",
  pairs: [
    { verb: "prendre", noun: "une décision, conscience de, en compte, en charge", wrong: "faire une décision" },
    { verb: "remédier", noun: "à un problème, à une situation", wrong: "réparer un problème" },
    { verb: "apporter", noun: "une solution, des précisions, son aide", wrong: "donner une solution" },
    { verb: "porter", noun: "atteinte à, plainte, un jugement", wrong: "apporter atteinte" },
    { verb: "tirer", noun: "profit de, les conséquences, parti de", wrong: "prendre profit" },
    { verb: "faire", noun: "fausse route, l'impasse, figure", wrong: "prendre une fausse route" },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES
// =============================================================================

/**
 * weakStrongExpertExamples - Three-tier progression in idiomatic expression.
 *
 * Examples showing idiomatic sophistication:
 * - 'selon moi' → 'me semble' + 'des plus pertinentes' → relative + conditional + litotic
 * - direct → 'commettre' + 'impairs' → litotic 'ne manquerai pas' + 'ose l'espérer'
 * - direct thanks → 'redevable' + 'précieux concours' → formal 'faire part' + 'au-delà de toute expression'
 * - direct → 'urgence' + 'remédier' → personified 'commande' + subjunctive + litotic
 *
 * Each includes detailed analysis of the idiomatic progression.
 */
export const weakStrongExpertExamples = [
  {
    weak: "Selon moi, cette idée est bonne.",
    strong: "Cette approche me semble des plus pertinentes.",
    expert: "Cette approche, qui m'apparaît des plus pertinentes au vu des éléments en notre possession, mérite d'être, sinon adoptée sans délai, du moins sérieusement envisagée.",
    analysis: "Progression: 'selon moi' → 'me semble' + 'des plus pertinentes' → relative + conditional + litotic 'sinon... du moins'.",
  },
  {
    weak: "Je vais faire une erreur quand je parle français.",
    strong: "Je vais inévitablement commettre quelques impairs.",
    expert: "Je ne manquerai pas, en l'état actuel de ma pratique, de commettre quelques impairs dont la portée, j'ose l'espérer, demeurera néanmoins circonscrite.",
    analysis: "Progression: direct → 'commettre' + 'impairs' → litotic 'ne manquerai pas' + 'ose l'espérer' + 'demeurera néanmoins'.",
  },
  {
    weak: "Merci beaucoup pour votre aide importante.",
    strong: "Je vous suis très redevable de votre précieux concours.",
    expert: "Je me permets de vous faire part de la gratitude toute particulière que m'inspire votre concours, précieux au-delà de toute expression.",
    analysis: "Progression: direct thanks → 'redevable' + 'précieux concours' → formal 'faire part' + 'toute particulière' + 'au-delà de toute expression'.",
  },
  {
    weak: "Nous devons résoudre ce problème maintenant.",
    strong: "Il y a urgence à remédier à cette situation.",
    expert: "L'acuité de la situation commande que soit remédié, et ce dans l'immédiat, à un état de fait dont la pérennisation ne saurait être envisagée en l'état.",
    analysis: "Progression: direct → 'urgence' + 'remédier' + nominal → personified 'commande' + subjunctive + litotic 'ne saurait'.",
  },
];

// =============================================================================
// TRANSLATION TRAPS
// =============================================================================

/**
 * translationTraps - Six common anglicisms to avoid with correct French alternatives.
 *
 * Traps:
 * - Make a decision → prendre (not faire) une décision
 * - Fix a problem → remédier à (not réparer) un problème
 * - Have a meeting → tenir (not avoir) une réunion
 * - Take a picture → prendre une photo (not 'peinture')
 * - Do research → mener des recherches (not 'faire')
 * - Ask a question → poser (not demander) une question
 *
 * Each trap shows English phrase, wrong French, and correct French.
 */
export const translationTraps = {
  title: "Common Translation Traps",
  traps: [
    { english: "Make a decision", wrong: "faire une décision", correct: "prendre une décision" },
    { english: "Fix a problem", wrong: "réparer un problème", correct: "remédier à un problème" },
    { english: "Have a meeting", wrong: "avoir une réunion", correct: "tenir une réunion" },
    { english: "Take a picture", wrong: "prendre une peinture", correct: "prendre une photo" },
    { english: "Do research", wrong: "faire recherche", correct: "mener des recherches" },
    { english: "Ask a question", wrong: "demander une question", correct: "poser une question" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C2 Module 7.
 *
 * Question types:
 * - precision (1, 3, 5, 7, 9, 11, 13, 15): Correct collocation/idiom identification
 * - transformation (2, 4, 6, 8, 10, 12, 14): Elevate using natural idioms
 *
 * Topics covered:
 * - prendre une décision (not 'faire') - collocation
 * - avoir le bras long (idiom for connections)
 * - remédier à un problème (not 'réparer')
 * - formal gratitude expressions ('faire part', 'gratitude')
 * - poser un lapin (idiom for standing someone up)
 * - personification + subjunctive ('commande que soit remédié')
 * - poser une question (not 'demander')
 * - chercher midi à quatorze heures (idiom for overcomplicating)
 * - tenir une réunion (not 'avoir')
 * - litotic understatement ('ne manquerai pas', 'impairs')
 * - coûter les yeux de la tête (body part idiom)
 * - native preference for idioms over literal descriptions
 * - mener des recherches (collocation)
 * - expert opinion structures ('apparaît', 'au vu')
 * - donner sa langue au chat (animal idiom)
 *
 * Each question has:
 * - id: unique identifier
 * - type: question category
 * - prompt: question text
 * - context: usage scenario
 * - options: array of possible answers
 * - correct: index of correct option
 * - explanation: detailed explanation
 * - nuance: additional insight
 */
export const practiceQuestions: { id: number; type: "precision" | "register" | "transformation" | "interpretation" | "rhetoric" | "ambiguity"; prompt: string; context?: string; options: string[]; correct: number; explanation: string; nuance?: string; }[] = [
  {
    id: 1,
    type: "precision",
    prompt: "Correct collocation:",
    context: "Make a decision",
    options: ["faire une décision", "prendre une décision", "donner une décision"],
    correct: 1,
    explanation: "'Prendre une décision' is the natural collocation; 'faire' is anglicism.",
    nuance: "Prendre is the verb for decisions in French.",
  },
  {
    id: 2,
    type: "transformation",
    prompt: "Use natural idiom for 'He has connections':",
    options: ["Il a des connexions.", "Il a le bras long.", "Il possède des relations."],
    correct: 1,
    explanation: "'Avoir le bras long' is the natural idiom for having influence.",
    nuance: "Native idioms use body parts metaphorically.",
  },
  {
    id: 3,
    type: "precision",
    prompt: "Correct collocation:",
    context: "Fix this problem",
    options: ["réparer ce problème", "remédier à ce problème", "réparer cette situation"],
    correct: 1,
    explanation: "'Remédier à' is correct; 'réparer' is for objects, not problems.",
    nuance: "Remédier is the natural verb for abstract problems.",
  },
  {
    id: 4,
    type: "transformation",
    prompt: "Make more elegant:",
    context: "Thank you very much for your help",
    options: [
      "Merci beaucoup pour votre aide.",
      "Je vous suis très redevable de votre précieux concours.",
      "Je me permets de vous faire part de la gratitude toute particulière que m'inspire votre concours, précieux au-delà de toute expression.",
    ],
    correct: 2,
    explanation: "Maximum formal elegance: 'faire part' + 'gratitude' + relative + 'au-delà de toute expression'.",
    nuance: "Formal gratitude has elaborate set phrases.",
  },
  {
    id: 5,
    type: "precision",
    prompt: "Natural French for 'to stand someone up':",
    options: ["se tenir quelqu'un", "poser un lapin", "mettre quelqu'un debout"],
    correct: 1,
    explanation: "'Poser un lapin' is the natural idiom; literal translation is wrong.",
    nuance: "Idioms must be learned, not translated.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Elevate: 'We need to solve this now'",
    options: [
      "Il faut résoudre cela maintenant.",
      "Il y a urgence à remédier à cette situation.",
      "L'acuité de la situation commande que soit remédié dans l'immédiat.",
    ],
    correct: 2,
    explanation: "'Acuité' + personified 'commande' + subjunctive + 'dans l'immédiat' = maximum.",
    nuance: "Expert level uses personification and subjunctive.",
  },
  {
    id: 7,
    type: "precision",
    prompt: "Correct: 'Ask a question'",
    options: ["demander une question", "poser une question", "faire une question"],
    correct: 1,
    explanation: "'Poser une question' is natural; 'demander' takes the person as object.",
    nuance: "Poser is the verb for questions.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Use idiom: 'Don't overcomplicate'",
    options: [
      "Ne compliquez pas trop.",
      "Ne cherchons pas midi à quatorze heures.",
    ],
    correct: 1,
    explanation: "'Chercher midi à quatorze heures' is the natural idiom.",
    nuance: "Idioms make expression natural and memorable.",
  },
  {
    id: 9,
    type: "precision",
    prompt: "Natural collocation:",
    context: "Have a meeting",
    options: ["avoir une réunion", "tenir une réunion", "faire une réunion"],
    correct: 1,
    explanation: "'Tenir une réunion' is the natural collocation.",
    nuance: "Tenir is the verb for meetings in French.",
  },
  {
    id: 10,
    type: "transformation",
    prompt: "Elevate naturally: 'I will probably make mistakes'",
    options: [
      "Je vais probablement faire des erreurs.",
      "Je vais inévitablement commettre quelques impairs.",
      "Je ne manquerai pas de commettre quelques impairs dont la portée demeurera néanmoins circonscrite.",
    ],
    correct: 2,
    explanation: "Litotic 'ne manquerai pas' + 'impairs' + litotic 'demeurera néanmoins' = elegant.",
    nuance: "Understatement is sophisticated in French.",
  },
  {
    id: 11,
    type: "precision",
    prompt: "Idiom for 'extremely expensive':",
    options: ["très cher", "coûter les yeux de la tête", "extrêmement coûteux"],
    correct: 1,
    explanation: "'Coûter les yeux de la tête' is the expressive idiom.",
    nuance: "Body part idioms are vivid and natural.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Make natural: 'This is very expensive'",
    options: [
      "C'est très cher.",
      "C'est cher.",
      "Ça coûte les yeux de la tête !",
    ],
    correct: 2,
    explanation: "Idiomatic expression is more natural than literal.",
    nuance: "Native speakers prefer idioms to literal descriptions.",
  },
  {
    id: 13,
    type: "precision",
    prompt: "Collocation for 'do research':",
    options: ["faire recherche", "mener des recherches", "prendre des recherches"],
    correct: 1,
    explanation: "'Mener des recherches' is the natural collocation.",
    nuance: "Mener is the verb for research.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Elevate with natural elegance:",
    context: "According to me, this is good",
    options: [
      "Selon moi, c'est bon.",
      "Cette approche me semble des plus pertinentes.",
      "Cette approche, qui m'apparaît des plus pertinentes au vu des éléments en notre possession, mérite d'être sérieusement envisagée.",
    ],
    correct: 2,
    explanation: "Relative + 'apparaît' + 'au vu' + 'mérite d'être' + passive = sophisticated.",
    nuance: "Expert opinion uses indirect evaluative structures.",
  },
  {
    id: 15,
    type: "precision",
    prompt: "Best for 'give up guessing':",
    options: ["abandonner deviner", "donner sa langue au chat", "arrêter de deviner"],
    correct: 1,
    explanation: "'Donner sa langue au chat' is the natural idiom.",
    nuance: "Animal idioms are common in French.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on high-frequency collocations
 *   ('prendre une décision', 'remédier à', 'tenir une réunion')
 * - 8-11/15: "Strong performance" - encourages avoiding false friends and
 *   using natural collocations, working on idioms like 'avoir le bras long'
 * - 12-15/15: "Excellent idiomatic mastery" - celebrates natural native-like
 *   French with appropriate idiom deployment and no translation traces
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Idiomatic expression requires exposure. Focus on high-frequency collocations like 'prendre une décision'.",
      focus: "Practice using 'remédier à' and 'tenir une réunion'.",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your idiomatic competence is developing. Continue avoiding false friends and using natural collocations.",
      focus: "Work on idioms like 'avoir le bras long' and 'poser un lapin'.",
    };
  }
  return {
    title: "Excellent idiomatic mastery",
    message: "Your French sounds natural and native-like. You deploy idioms appropriately and avoid translation traces.",
    focus: "Continue expanding your repertoire of sophisticated expressions.",
  };
}
