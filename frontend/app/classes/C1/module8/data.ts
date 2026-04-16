/**
 * C1 Module 8 - Idiomatic & Natural Expression
 * ===============================================
 *
 * This file contains all lesson data for C1 Module 8, teaching advanced French
 * learners to master idioms, fixed expressions, and native-like phrasing to
 * eliminate translation traces and achieve authentic French fluency.
 *
 * **Module Content:**
 * - Introduction: Beyond translation, the mark of fluency through idiomatic competence
 * - Advanced idioms: 8 essential C1-level idioms with meanings and examples
 * - Fixed expressions: 8 elegant formulas for natural French expression
 * - False friends: 8 critical French-English false friends to avoid
 * - Weak vs Strong examples: Idiomatic vs literal translation comparisons
 * - 15 practice quiz questions (comparison, rewrite types)
 *
 * **Key Concepts:**
 * - Idiomatic competence: Using expressions that sound naturally French
 * - Body part idioms: "Avoir le bras long" (have influence), "Tenir le bon bout" (on right track)
 * - Fixed expressions: "Ça va de soi", "Le cas échéant", "Sauf erreur de ma part"
 * - False friends: assumer (take responsibility) vs assume (suppose), attendre (wait) vs attend (participate)
 * - Verb collocations: prendre une décision, rendre un verdict, commettre une erreur
 * - Elegant formulas: Je vous en prie, Il n'y a pas de quoi, Je vous suis redevable
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to idiomatic expression
 * 4. advancedIdioms - C1-level idioms with meanings and examples
 * 5. fixedExpressions - Fixed formulas for natural phrasing
 * 6. falseFriends - Critical French-English false friends
 * 7. weakVsStrongExamples - Idiomatic vs literal comparisons
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
 * 1. intro - Introduction to idiomatic expression
 * 2. idioms - Advanced French idioms
 * 3. fixed-expressions - Fixed expression formulas
 * 4. native-phrasing - Native-like phrasing patterns
 * 5. false-friends - False friend warnings
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "idioms", "fixed-expressions", "native-phrasing", "false-friends", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Idiomatic & Natural Expression",
  /** Brief description of module content */
  subtitle: "Master idioms, fixed expressions, and native-like phrasing. Eliminate translation traces and express yourself with authentic French fluency.",
  /** Module number in C1 series */
  moduleNumber: 8,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to idiomatic and natural expression.
 *
 * Content:
 * - Beyond Translation: Using idioms appropriately, avoiding literal translation traces
 * - The Mark of Fluency: Idiomatic competence through correct verb collocations
 */
export const introSections = [
  {
    title: "Beyond Translation",
    content: "At C1, the goal is native-like expression. This means using idioms appropriately, deploying fixed expressions naturally, and avoiding the telltale traces of literal translation. Your French should sound like it was conceived in French.",
  },
  {
    title: "The Mark of Fluency",
    content: "Native speakers recognize each other not just by grammar but by idiomatic competence: knowing that on 'prend' a decision but 'rend' a verdict, that problems 'se posent' but questions 'arrivent', that one 'fait' a mistake but 'commet' an error.",
  },
];

// =============================================================================
// ADVANCED IDIOMS
// =============================================================================

/**
 * advancedIdioms - C1-level French idioms for native-like expression.
 *
 * Idioms covered:
 * - Avoir le bras long: To have influence/connections (body part metaphor)
 * - Mettre les points sur les i: To clarify precisely (attention to detail)
 * - Chercher midi à quatorze heures: To overcomplicate simple things
 * - Prendre quelqu'un en flagrant délit: To catch someone red-handed
 * - Donner carte blanche: To give full authority/delegation
 * - Faire la part des choses: To put things in perspective
 * - Passer comme une lettre à la poste: To be accepted without resistance
 * - Tenir le bon bout: To be on the right track (optimistic progress)
 */
export const advancedIdioms = {
  title: "Advanced Idioms for C1 Expression",
  idioms: [
    { idiom: "Avoir le bras long", literal: "To have long arms", meaning: "To have influence/connections", example: "Il a le bras long dans ce milieu.", context: "Networking, influence" },
    { idiom: "Mettre les points sur les i", literal: "To dot the i's", meaning: "To clarify precisely", example: "Permettez-moi de mettre les points sur les i.", context: "Clarification, precision" },
    { idiom: "Chercher midi à quatorze heures", literal: "To look for noon at 2pm", meaning: "To overcomplicate simple things", example: "Ne cherchons pas midi à quatorze heures.", context: "Simplification" },
    { idiom: "Prendre quelquun en flagrant délit", literal: "To catch someone in flagrante delicto", meaning: "To catch red-handed", example: "Il fut pris en flagrant délit de mensonge.", context: "Exposing deception" },
    { idiom: "Donner carte blanche", literal: "To give white card", meaning: "To give full authority", example: "On lui a donné carte blanche pour ce projet.", context: "Delegation" },
    { idiom: "Faire la part des choses", literal: "To make the part of things", meaning: "To put things in perspective", example: "Sachons faire la part des choses.", context: "Balance, perspective" },
    { idiom: "Passer comme une lettre à la poste", literal: "To pass like a letter at the post", meaning: "To be accepted without resistance", example: "Sa proposition passa comme une lettre à la poste.", context: "Easy acceptance" },
    { idiom: "Tenir le bon bout", literal: "To hold the good end", meaning: "To be on the right track", example: "Nous tenons le bon bout.", context: "Progress, optimism" },
  ],
};

// =============================================================================
// FIXED EXPRESSIONS
// =============================================================================

/**
 * fixedExpressions - Essential fixed formulas for elegant French expression.
 *
 * Expressions covered:
 * - Il n'y a pas de quoi / Je vous en prie: You're welcome (informal/formal)
 * - Ça ne fait rien: It doesn't matter (more elegant alternative)
 * - Ça va de soi: It goes without saying
 * - En l'occurrence: In this instance (specific reference)
 * - Le cas échéant: If applicable (formal/legal)
 * - Sauf erreur de ma part: If I'm not mistaken (polite hedge)
 * - Cela dit: That said (transition after concession)
 * - Pour l'heure: For now (temporal limitation)
 */
export const fixedExpressions = {
  title: "Essential Fixed Expressions",
  expressions: [
    { expression: "Il n'y a pas de quoi", usage: "You're welcome (informal)", alternative: "Je vous en prie (formal)" },
    { expression: "Ça ne fait rien", usage: "It doesn't matter", note: "More elegant than 'ça n'a pas d'importance'" },
    { expression: "Ça va de soi", usage: "It goes without saying", note: "Implies obviousness" },
    { expression: "En l'occurrence", usage: "In this instance", note: "Specific reference" },
    { expression: "Le cas échéant", usage: "If applicable", note: "Formal/legal" },
    { expression: "Sauf erreur de ma part", usage: "If I'm not mistaken", note: "Polite hedge" },
    { expression: "Cela dit", usage: "That said", note: "Transition after concession" },
    { expression: "Pour l'heure", usage: "For now", note: "Temporal limitation" },
  ],
};

// =============================================================================
// FALSE FRIENDS
// =============================================================================

/**
 * falseFriends - Critical French-English false friends to avoid.
 *
 * Common false friends:
 * - assumer: to take responsibility (NOT assume/suppose)
 * - attendre: to wait (NOT attend/participate)
 * - prétendre: to claim/assert (NOT pretend/feign)
 * - décevoir: to disappoint (NOT deceive/tromper)
 * - sensible: sensitive (NOT sensible/reasonable)
 * - actuellement: currently (NOT actually/en fait)
 * - éventuellement: possibly (NOT eventually/finalement)
 * - formellement: strictly/categorically (NOT formerly/anciennement)
 */
export const falseFriends = {
  title: "Critical False Friends",
  pairs: [
    { french: "assumer", frenchMeaning: "to take responsibility", englishLookalike: "assume (suppose)", correct: "supposer / présumer" },
    { french: "attendre", frenchMeaning: "to wait", englishLookalike: "attend (participate)", correct: "assister à / participer à" },
    { french: "prétendre", frenchMeaning: "to claim/assert", englishLookalike: "pretend (feign)", correct: "faire semblant / feindre" },
    { french: "décevoir", frenchMeaning: "to disappoint", englishLookalike: "deceive (tromper)", correct: "tromper / leurrer" },
    { french: "sensible", frenchMeaning: "sensitive", englishLookalike: "sensible (reasonable)", correct: "raisonnable / sensé" },
    { french: "actuellement", frenchMeaning: "currently", englishLookalike: "actually (en fait)", correct: "en fait / effectivement" },
    { french: "éventuellement", frenchMeaning: "possibly", englishLookalike: "eventually (finalement)", correct: "finalement / à la longue" },
    { french: "formellement", frenchMeaning: "strictly/categorically", englishLookalike: "formerly (anciennement)", correct: "anciennement / autrefois" },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Idiomatic vs literal translation comparisons.
 *
 * Examples showing how to transform literal, translation-like phrasing
 * into natural, idiomatic French expression.
 *
 * Scenarios: Professional evaluation, self-deprecating humor, formal gratitude, urgent formal communication
 */
export const weakVsStrongExamples = [
  {
    weak: "Selon moi, cette idée est bonne.",
    strong: "Cette approche me semble des plus pertinentes.",
    why: "'Me semble' is natural evaluative; 'des plus pertinentes' is idiomatic superlative formula.",
    context: "Professional evaluation",
  },
  {
    weak: "Je vais faire une erreur quand je parle français.",
    strong: "Je vais inévitablement commettre quelques impairs.",
    why: "'Commettre' is correct verb for errors; 'impairs' is elegant for 'erreurs'.",
    context: "Self-deprecating humor",
  },
  {
    weak: "Merci beaucoup pour votre aide importante.",
    strong: "Je vous suis très redevable de votre précieux concours.",
    why: "'Redevable' is idiomatic gratitude; 'précieux concours' is elegant formula.",
    context: "Formal gratitude",
  },
  {
    weak: "Nous devons résoudre ce problème maintenant.",
    strong: "Il y a urgence à remédier à cette situation.",
    why: "'Il y a urgence à' is idiomatic urgency; 'remédier à' is correct collocation.",
    context: "Urgent formal communication",
  },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 8.
 *
 * Question types:
 * - comparison (1, 3, 5, 7, 9, 11, 13, 15): Compare idiomatic vs literal phrasing
 * - rewrite (2, 4, 6, 8, 10, 12, 14): Use correct idiom or fixed expression
 *
 * Topics covered:
 * - Verb collocations (commettre une erreur vs faire une erreur)
 * - Body part idioms (avoir le bras long)
 * - False friends (assumer, attendre, prétendre, décevoir)
 * - Fixed expressions (Ça va de soi, Le cas échéant)
 * - Elegant gratitude formulas (Je vous suis redevable)
 * - Formal 'you're welcome' (Je vous en prie)
 * - Idiomatic overcomplication (Chercher midi à quatorze heures)
 * - False friend corrections (actuellement vs en fait)
 * - Progress idioms (Tenir le bon bout)
 * - Polite hedges (Sauf erreur de ma part)
 * - Eventuality expressions (finalement vs éventuellement)
 * - Influence expressions (avoir le bras long)
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
export const practiceQuestions: { id: number; type: "rewrite" | "comparison" | "tone" | "transformation" | "ambiguity" | "connector"; prompt: string; context?: string; options: string[]; correct: number; explanation: string; nuance?: string; }[] = [
  {
    id: 1,
    type: "comparison",
    prompt: "Which uses correct collocation?",
    options: [
      "Faire une erreur",
      "Commettre une erreur",
    ],
    correct: 1,
    explanation: "'Commettre' is the correct verb for errors/mistakes; 'faire' is acceptable but less precise.",
    nuance: "Verbs have specific collocations with error types.",
  },
  {
    id: 2,
    type: "rewrite",
    prompt: "Use natural idiom for 'He has connections':",
    options: [
      "Il a des connexions.",
      "Il a le bras long.",
      "Il possède des relations.",
    ],
    correct: 1,
    explanation: "'Avoir le bras long' is the natural idiom for having influence/connections.",
    nuance: "Native idioms often use body parts metaphorically.",
  },
  {
    id: 3,
    type: "comparison",
    prompt: "Which avoids false friend?",
    options: [
      "Je suppose que vous assumerez les coûts.",
      "Je suppose que vous prendrez en charge les coûts.",
    ],
    correct: 1,
    explanation: "'Assumer' means to take responsibility, not to suppose; 'prendre en charge' is correct for costs.",
    nuance: "Assumer = take responsibility/guilt, not assume/suppose.",
  },
  {
    id: 4,
    type: "rewrite",
    prompt: "Use elegant fixed expression for 'It goes without saying':",
    options: [
      "Il va sans dire.",
      "Ça va de soi.",
      "C'est évident.",
    ],
    correct: 1,
    explanation: "'Ça va de soi' is the natural fixed expression; 'il va sans dire' is also used but less common.",
    nuance: "Fixed expressions have preferred natural forms.",
  },
  {
    id: 5,
    type: "comparison",
    prompt: "Which is more idiomatic?",
    options: [
      "Je vous remercie beaucoup pour votre aide.",
      "Je vous suis très redevable de votre précieux concours.",
    ],
    correct: 1,
    explanation: "'Redevable' + 'concours' is elegant formula; avoids generic 'remercier'.",
    nuance: "Formal gratitude has elegant set phrases.",
  },
  {
    id: 6,
    type: "rewrite",
    prompt: "Correct false friend: 'I will attend the meeting'",
    options: [
      "J'assisterai à la réunion.",
      "Je vais attendre la réunion.",
      "J'attendrai la réunion.",
    ],
    correct: 0,
    explanation: "'Assister à' = attend; 'attendre' = wait. Classic false friend.",
    nuance: "Attendre = wait; assister à = attend.",
  },
  {
    id: 7,
    type: "comparison",
    prompt: "Which uses idiom correctly?",
    options: [
      "Nous cherchons midi à quatorze heures avec cette solution simple.",
      "Ne cherchons pas midi à quatorze heures, la réponse est évidente.",
    ],
    correct: 1,
    explanation: "Idiom means overcomplicating simple things; used here correctly to advocate simplicity.",
    nuance: "Chercher midi à 14h = overcomplicate simple matters.",
  },
  {
    id: 8,
    type: "rewrite",
    prompt: "Use natural expression for 'Thank you (formal)':",
    options: [
      "Merci.",
      "Je vous en prie.",
      "Il n'y a pas de quoi.",
    ],
    correct: 1,
    explanation: "'Je vous en prie' is formal 'you're welcome'; 'il n'y a pas de quoi' is also correct but more casual.",
    nuance: "Register affects 'you're welcome' choice.",
  },
  {
    id: 9,
    type: "comparison",
    prompt: "Which avoids false friend 'actually'?",
    options: [
      "Actuellement, je ne suis pas d'accord.",
      "En fait, je ne suis pas d'accord.",
    ],
    correct: 1,
    explanation: "'Actuellement' = currently; 'en fait' = actually/in fact.",
    nuance: "Actuellement = currently, not actually.",
  },
  {
    id: 10,
    type: "rewrite",
    prompt: "Use idiom for 'We are on the right track':",
    options: [
      "Nous sommes sur la bonne voie.",
      "Nous tenons le bon bout.",
      "Nous avons la bonne direction.",
    ],
    correct: 1,
    explanation: "'Tenir le bon bout' is the natural idiom; 'sur la bonne voie' is also used but less idiomatic.",
    nuance: "Tenir le bon bout = on the right track (optimistic).",
  },
  {
    id: 11,
    type: "comparison",
    prompt: "Which uses elegant expression?",
    options: [
      "Si j'ai tort, dites-le-moi.",
      "Sauf erreur de ma part, bien entendu.",
    ],
    correct: 1,
    explanation: "'Sauf erreur de ma part' is elegant hedge; 'bien entendu' adds polite acknowledgment.",
    nuance: "Polite hedges demonstrate social finesse.",
  },
  {
    id: 12,
    type: "rewrite",
    prompt: "Correct false friend: 'Eventually, we will succeed'",
    options: [
      "Éventuellement, nous réussirons.",
      "Finalement, nous réussirons.",
      "À la longue, nous réussirons.",
    ],
    correct: 1,
    explanation: "'Éventuellement' = possibly; 'finalement/à la longue' = eventually.",
    nuance: "Éventuellement = possibly, not eventually.",
  },
  {
    id: 13,
    type: "comparison",
    prompt: "Which is more natural for 'Don't overcomplicate'?",
    options: [
      "Ne compliquez pas trop.",
      "Ne cherchons pas midi à quatorze heures.",
    ],
    correct: 1,
    explanation: "Idiomatic expression is more natural and elegant than literal translation.",
    nuance: "Idioms demonstrate native competence.",
  },
  {
    id: 14,
    type: "rewrite",
    prompt: "Use natural phrasing for 'if applicable':",
    options: [
      "Si c'est applicable.",
      "Le cas échéant.",
      "Si ça marche.",
    ],
    correct: 1,
    explanation: "'Le cas échéant' is the standard fixed expression in formal contexts.",
    nuance: "Fixed expressions have standard forms.",
  },
  {
    id: 15,
    type: "comparison",
    prompt: "Which demonstrates best idiomatic mastery?",
    options: [
      "Il a beaucoup d'influence dans ce domaine.",
      "Il a le bras long dans ce milieu.",
    ],
    correct: 1,
    explanation: "Idiomatic expression 'a le bras long' is natural and concise.",
    nuance: "Idioms condense meaning memorably.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on high-frequency false friends
 *   (assumer, attendre, actuellement) and common idioms (bras long, bon bout)
 * - 8-11/15: "Nice progress" - encourages avoiding false friends and using
 *   fixed expressions naturally (Je vous en prie, Sauf erreur de ma part)
 * - 12-15/15: "Excellent idiomatic mastery" - celebrates natural, native-like
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
      message: "Idiomatic expression requires exposure. Focus on high-frequency false friends and common idioms.",
      focus: "Practice 'avoir le bras long', 'tenir le bon bout', and correct verb collocations.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your idiomatic competence is developing. Continue avoiding false friends and using fixed expressions.",
      focus: "Work on elegant formulas like 'je vous en prie' and 'sauf erreur de ma part'.",
    };
  }
  return {
    title: "Excellent idiomatic mastery",
    message: "Your French sounds natural and native-like. You deploy idioms appropriately and avoid translation traces.",
    focus: "Continue expanding your repertoire of sophisticated expressions.",
  };
}
