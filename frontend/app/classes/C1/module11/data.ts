/**
 * C1 Module 11 - Spoken Expression Simulation
 * =============================================
 *
 * This file contains all lesson data for C1 Module 11, teaching advanced French
 * learners to master natural spoken French. Focuses on moving from written elegance
 * to spoken spontaneity through fillers, reactions, turn-taking, and conversational
 * fluidity.
 *
 * **Module Content:**
 * - Introduction: Spoken vs written French, markers of orality
 * - Discourse markers: 5 categories (processing, engagement, topic management, hedging, emphasis)
 * - Natural reaction patterns: 6 situations (agreement, surprise, disagreement, hesitation)
 * - Turn-taking strategies: Claiming, yielding, interrupting, holding floor
 * - Weak vs Strong examples: Written vs spoken comparisons
 * - 15 practice quiz questions (comparison, rewrite types)
 *
 * **Key Concepts:**
 * - Discourse markers: tu vois, quoi, enfin, bon, alors, dis donc, écoute
 * - Fillers: euh, alors, enfin, comment dire (processing time)
 * - Engagement checks: tu vois, tu sais, tu comprends
 * - Turn management: Écoute, Dis donc, Attends, Tu vois ce que je veux dire?
 * - Hedging/softening: enfin, quoi, si tu veux, en quelque sorte
 * - Intensifiers: carrément, grave, franchement, sérieusement, honnêtement
 * - Exclamations: C'est pas vrai!, Sans déconner!, La vache!, Mais non!
 * - Elisions and informal forms: t'as, t'en, t'es
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to spoken vs written French
 * 4. fillersAndMarkers - Discourse markers by category
 * 5. reactionPatterns - Natural reaction patterns
 * 6. turnTaking - Turn-taking strategies
 * 7. weakVsStrongExamples - Written vs spoken comparisons
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
 * 1. intro - Introduction to spoken vs written French
 * 2. fillers - Discourse markers and fillers
 * 3. reactions - Natural reaction patterns
 * 4. fluency - Conversational fluidity
 * 5. turn-taking - Turn management strategies
 * 6. natural-phrasing - Colloquial expressions
 * 7. practice - Interactive quiz
 * 8. completion - Module completion
 */
export const sectionIds = ["intro", "fillers", "reactions", "fluency", "turn-taking", "natural-phrasing", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Spoken Expression Simulation",
  /** Brief description of module content */
  subtitle: "Master natural spoken French: fillers, reactions, turn-taking, and conversational fluidity. Move from written elegance to spoken spontaneity.",
  /** Module number in C1 series */
  moduleNumber: 11,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to spoken French mastery.
 *
 * Content:
 * - Spoken vs. Written French: Flow and spontaneity vs density and precision
 * - The Markers of Orality: Discourse markers (tu vois, quoi, enfin, bon, alors)
 */
export const introSections = [
  {
    title: "Spoken vs. Written French",
    content: "At C1, you must command both registers. Written French values density and precision. Spoken French values flow, spontaneity, and interaction. The same idea expressed orally requires different structures: looser syntax, fillers for processing time, and markers of engagement.",
  },
  {
    title: "The Markers of Orality",
    content: "Native speakers signal engagement through discourse markers: tu vois, quoi, enfin, bon, alors. They manage turns with eh bien, dis donc, écoute. These markers are not errors—they are the texture of living speech.",
  },
];

// =============================================================================
// FILLERS AND DISCOURSE MARKERS
// =============================================================================

/**
 * fillersAndMarkers - Discourse markers organized by communicative function.
 *
 * Categories:
 * - Processing time: euh, alors, enfin, comment dire (time to formulate thoughts)
 * - Engagement check: tu vois, quoi, tu sais, tu comprends (seeks listener confirmation)
 * - Topic management: bon, alors, écoute, dis donc (transitions, openings)
 * - Hedging/softening: enfin, quoi, si tu veux, en quelque sorte (qualifies statements)
 * - Emphasis: franchement, sérieusement, honnêtement (intensifies evaluation)
 */
export const fillersAndMarkers = {
  title: "Discourse Markers for Fluency",
  categories: [
    { category: "Processing time", markers: ["euh", "alors", "enfin", "comment dire"], example: "Euh... comment dire... c'est compliqué.", note: "Time to formulate thoughts" },
    { category: "Engagement check", markers: ["tu vois", "quoi", "tu sais", "tu comprends"], example: "C'est difficile, tu vois.", note: "Seeks listener confirmation" },
    { category: "Topic management", markers: ["bon", "alors", "écoute", "dis donc"], example: "Bon, passons à autre chose.", note: "Transitions, openings" },
    { category: "Hedging/softening", markers: ["enfin", "quoi", "si tu veux", "en quelque sorte"], example: "C'est bon, enfin, pas mal.", note: "Softens or qualifies" },
    { category: "Emphasis", markers: ["franchement", "sérieusement", "honêtement"], example: "Franchement, c'est génial!", note: "Intensifies evaluation" },
  ],
};

// =============================================================================
// REACTION PATTERNS
// =============================================================================

/**
 * reactionPatterns - Natural spoken reactions vs formal written equivalents.
 *
 * Situations covered:
 * - Agreement (enthusiastic): Carrément! / Totalement! / Ça alors, oui!
 * - Agreement (qualified): Oui, enfin, à peu près, quoi
 * - Surprise: Sans déconner? / C'est pas vrai! / La vache!
 * - Disagreement (polite): Oui, enfin, je sais pas, moi
 * - Disagreement (strong): Mais non, mais c'est pas ça du tout!
 * - Hesitation: Euh... je sais pas, là... peut-être...
 */
export const reactionPatterns = {
  title: "Natural Reaction Patterns",
  reactions: [
    { situation: "Agreement (enthusiastic)", written: "Je suis tout à fait d'accord.", spoken: "Carrément! / Totalement! / Ça alors, oui!" },
    { situation: "Agreement (qualified)", written: "Je suis d'accord avec certaines réserves.", spoken: "Oui, enfin, à peu près, quoi." },
    { situation: "Surprise", written: "Ceci est surprenant.", spoken: "Sans déconner? / C'est pas vrai! / La vache!" },
    { situation: "Disagreement (polite)", written: "Je ne partage pas cette opinion.", spoken: "Oui, enfin, je sais pas, moi." },
    { situation: "Disagreement (strong)", written: "Je conteste vigoureusement cette affirmation.", spoken: "Mais non, mais c'est pas ça du tout!" },
    { situation: "Hesitation", written: "Je ne suis pas certain.", spoken: "Euh... je sais pas, là... peut-être..." },
  ],
};

// =============================================================================
// TURN-TAKING STRATEGIES
// =============================================================================

/**
 * turnTaking - Strategies for managing conversational turns in spoken French.
 *
 * Strategies covered:
 * - Claiming floor: Écoute, Dis donc, Attends (gaining attention to speak)
 * - Yielding floor: Tu vois ce que je veux dire?, Qu'est-ce que t'en penses? (inviting response)
 * - Interrupting (soft): Oui mais, Attends, Si je peux juste (gentle interruption)
 * - Holding floor: En fait, Ce que je voulais dire (maintaining speaking right)
 */
export const turnTaking = {
  title: "Turn-Taking Strategies",
  strategies: [
    { strategy: "Claiming floor", marker: "Ecoute / Dis donc / Attends", example: "Écoute, il faut que je te dise quelque chose." },
    { strategy: "Yielding floor", marker: "Tu vois ce que je veux dire? / Qu'est-ce que t'en penses?", example: "...tu vois ce que je veux dire?" },
    { strategy: "Interrupting (soft)", marker: "Oui mais / Attends / Si je peux juste", example: "Oui mais, là, tu oublies un truc." },
    { strategy: "Holding floor", marker: "En fait / Ce que je voulais dire", example: "Ce que je voulais dire, c'est que..." },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Formal written vs natural spoken French comparisons.
 *
 * Examples showing how to transform formal, written-style phrasing into
 * spontaneous, natural spoken French with markers, elisions, and colloquialisms.
 *
 * Scenarios: Casual conversation, friendly interruption, requesting clarification,
 * enthusiastic agreement
 */
export const weakVsStrongExamples = [
  {
    weak: "Je pense que cette idée est intéressante. Quelle est votre opinion?",
    strong: "Moi, je trouve ça super pertinent. Et toi, t'en penses quoi?",
    why: "'Moi, je' is natural spoken subject; 'super' is colloquial intensifier; 't'en penses quoi' is casual tag.",
    context: "Casual conversation",
  },
  {
    weak: "Permettez-moi de vous interrompre pour ajouter une précision.",
    strong: "Attends, là, je te coupe juste deux secondes: t'as oublié le truc le plus important.",
    why: "'Attends' is natural interjection; 't'as' is elided; 'truc' is informal precision.",
    context: "Friendly interruption",
  },
  {
    weak: "Je ne suis pas certain de comprendre votre point de vue.",
    strong: "Euh... attends, là, tu perds là. Tu peux répéter?",
    why: "'Euh' buys time; 'attends' signals confusion; 'tu perds' (you're losing me) is idiomatic; 'là' is oral marker.",
    context: "Requesting clarification",
  },
  {
    weak: "C'est une excellente suggestion que vous avez faite.",
    strong: "Ah mais carrément! Excellente idée, ça!",
    why: "'Carrément' is enthusiastic agreement; 'Ah mais' expresses sudden recognition; 'ça' refers deictically.",
    context: "Enthusiastic agreement",
  },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 11.
 *
 * Question types:
 * - comparison (1, 3, 5, 7, 9, 11, 13, 15): Choose more natural spoken version
 * - rewrite (2, 4, 6, 8, 10, 12, 14): Transform into spoken French
 *
 * Topics covered:
 * - Natural agreement patterns (Carrément!, Grave!)
 * - Spoken confusion markers (Euh... attends, là)
 * - Fillers and processing time (euh, comment dire)
 * - Exclamations of surprise (C'est pas vrai!, Sans déconner?)
 * - Turn-taking and interruptions (Attends, je te coupe)
 * - Colloquial solidarity expressions (Je suis totalement avec toi)
 * - Cumulative hedging (enfin, peut-être, je sais pas trop)
 * - Engagement checks (Tu vois ce que je veux dire?)
 * - Topic openers (Bon, écoute, faut qu'on parle)
 * - Exclamatory rejection (Mais non!, C'est n'importe quoi!)
 * - Floor-holding (Attends, laisse-moi finir)
 * - Real hesitation patterns (Euh... je sais pas, là...)
 * - Gentle disagreement with multiple softeners
 * - Stacked intensifiers for enthusiasm (grave, carrément, franchement)
 * - Complete spoken fluency with all markers
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
    prompt: "Which sounds more natural in spoken French?",
    options: [
      "Je suis tout à fait d'accord avec votre proposition.",
      "Carrément, c'est exactement ce qu'il faut!",
    ],
    correct: 1,
    explanation: "'Carrément' is natural spoken intensifier; 'exactement ce qu'il faut' is idiomatic.",
    nuance: "Spoken French uses intensifiers and exclamations.",
  },
  {
    id: 2,
    type: "rewrite",
    prompt: "Make more natural for spoken context:",
    context: "I don't understand",
    options: [
      "Je ne comprends pas ce que vous voulez dire.",
      "Euh... attends, là, je suis perdu. Tu peux expliquer?",
      "Je n'ai pas saisi votre intention.",
    ],
    correct: 1,
    explanation: "Fillers ('euh'), markers ('attends, là'), and direct question create natural oral style.",
    nuance: "Spoken confusion uses fillers and self-reference.",
  },
  {
    id: 3,
    type: "comparison",
    prompt: "Which uses fillers naturally?",
    options: [
      "C'est une question difficile. Je dois réfléchir.",
      "C'est... euh... comment dire... une question super compliquée, quoi.",
    ],
    correct: 1,
    explanation: "'Euh' and 'comment dire' buy processing time; 'super' is colloquial; 'quoi' marks end.",
    nuance: "Fillers are natural processing time markers.",
  },
  {
    id: 4,
    type: "rewrite",
    prompt: "Add natural spoken reaction:",
    context: "Responding to surprising news",
    options: [
      "Cette information est surprenante.",
      "C'est pas vrai! Sans déconner?",
      "Ceci présente un caractère inattendu.",
    ],
    correct: 1,
    explanation: "'C'est pas vrai' and 'sans déconner' are natural exclamations of surprise.",
    nuance: "Spoken surprise uses exclamations and colloquialisms.",
  },
  {
    id: 5,
    type: "comparison",
    prompt: "Which takes a turn more naturally?",
    options: [
      "Permettez-moi d'ajouter quelque chose à ce sujet.",
      "Attends, là, je te coupe: y'a un truc que t'as oublié.",
    ],
    correct: 1,
    explanation: "'Attends' claims attention; 'je te coupe' acknowledges interruption; 'truc' is informal.",
    nuance: "Spoken turn-taking uses direct interjections.",
  },
  {
    id: 6,
    type: "rewrite",
    prompt: "Make agreement more colloquial:",
    options: [
      "Je suis en accord avec votre position.",
      "Ouais, grave. Je suis totalement avec toi.",
      "J'adhère pleinement à votre point de vue.",
    ],
    correct: 1,
    explanation: "'Grave' is very colloquial yes; 'totalement avec toi' is idiomatic solidarity.",
    nuance: "Youth/colloquial French uses 'grave' for agreement.",
  },
  {
    id: 7,
    type: "comparison",
    prompt: "Which hedges more naturally?",
    options: [
      "C'est possible mais je ne suis pas certain.",
      "Ouais, enfin, peut-être, je sais pas trop, quoi.",
    ],
    correct: 1,
    explanation: "Multiple hedges ('enfin, peut-être, je sais pas trop') create natural uncertainty.",
    nuance: "Spoken hedging uses cumulative uncertainty markers.",
  },
  {
    id: 8,
    type: "rewrite",
    prompt: "Use natural engagement check:",
    context: "Checking listener understanding",
    options: [
      "Comprenez-vous ce que je veux dire?",
      "Tu vois ce que je veux dire? Tu me suis?",
      "Avez-vous saisi ma pensée?",
    ],
    correct: 1,
    explanation: "'Tu vois' is natural engagement check; 'tu me suis' checks attention.",
    nuance: "Spoken checks use 'tu vois' and 'tu comprends'.",
  },
  {
    id: 9,
    type: "comparison",
    prompt: "Which opens a topic more naturally?",
    options: [
      "Je souhaite aborder un nouveau sujet.",
      "Bon, écoute, faut qu'on parle de quelque chose.",
    ],
    correct: 1,
    explanation: "'Bon' opens; 'écoute' claims attention; 'faut qu'on parle' signals importance.",
    nuance: "'Bon' and 'écoute' are natural spoken openers.",
  },
  {
    id: 10,
    type: "rewrite",
    prompt: "Make evaluation more spoken:",
    context: "Strong negative reaction",
    options: [
      "Ceci est tout à fait inacceptable.",
      "Mais non, mais c'est pas possible! C'est n'importe quoi!",
      "Cette situation présente un caractère inadmissible.",
    ],
    correct: 1,
    explanation: "'Mais non' expresses rejection; 'c'est pas possible' is exclamatory; 'n'importe quoi' dismisses.",
    nuance: "Spoken rejection uses repetition and exclamation.",
  },
  {
    id: 11,
    type: "comparison",
    prompt: "Which holds floor more naturally?",
    options: [
      "Permettez-moi de terminer ma pensée.",
      "Attends, laisse-moi finir, j'y arrive...",
    ],
    correct: 1,
    explanation: "'Attends' claims floor; 'laisse-moi finir' is direct; 'j'y arrive' is natural self-reference.",
    nuance: "Floor-holding uses 'attends' and 'laisse-moi'.",
  },
  {
    id: 12,
    type: "rewrite",
    prompt: "Use natural hesitation:",
    context: "Uncertain response",
    options: [
      "Je ne sais pas encore.",
      "Euh... je sais pas, là... faut que je réfléchisse...",
      "Je n'ai pas encore formulé une réponse définitive.",
    ],
    correct: 1,
    explanation: "Fillers ('euh', 'là') + drawn-out syntax mimics real processing.",
    nuance: "Real hesitation uses fillers and pauses.",
  },
  {
    id: 13,
    type: "comparison",
    prompt: "Which softens more naturally?",
    options: [
      "Ce n'est pas tout à fait exact.",
      "Ouais, enfin, c'est pas exactement ça, quoi.",
    ],
    correct: 1,
    explanation: "Multiple softeners ('enfin', 'pas exactement', 'quoi') create gentle disagreement.",
    nuance: "Spoken softening uses multiple hedges.",
  },
  {
    id: 14,
    type: "rewrite",
    prompt: "Make enthusiasm more spoken:",
    context: "Excited agreement",
    options: [
      "Je trouve cette proposition excellente.",
      "Ah mais grave! Carrément! Franchement, c'est trop bien!",
      "Cette proposition mérite approbation unanime.",
    ],
    correct: 1,
    explanation: "Multiple intensifiers ('grave', 'carrément', 'franchement', 'trop bien') stack enthusiasm.",
    nuance: "Spoken enthusiasm stacks intensifiers.",
  },
  {
    id: 15,
    type: "comparison",
    prompt: "Which demonstrates best spoken fluency?",
    options: [
      "Je souhaite exprimer mon désaccord concernant cette proposition.",
      "Écoute, euh... je sais pas, là. Moi, ça me convainc pas trop, tu vois?",
    ],
    correct: 1,
    explanation: "Opener ('écoute'), fillers, subject dislocation ('moi'), and engagement check create natural speech.",
    nuance: "Spoken fluency combines all oral markers.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on fillers (euh, quoi) and
 *   engagement checks (tu vois, tu sais)
 * - 8-11/15: "Nice progress" - encourages refining turn-taking and reaction
 *   patterns, working on natural interruptions and floor management
 * - 12-15/15: "Excellent spoken fluency" - celebrates command of the texture
 *   of natural spoken French: fillers, reactions, and conversational flow
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Spoken French requires different markers than written. Focus on using 'euh', 'quoi', and 'tu vois' naturally.",
      focus: "Practice fillers and engagement checks like 'tu vois' and 'quoi'.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your spoken markers are developing. Continue refining turn-taking and reaction patterns.",
      focus: "Work on natural interruptions and floor management.",
    };
  }
  return {
    title: "Excellent spoken fluency",
    message: "You command the texture of natural spoken French: fillers, reactions, and conversational flow.",
    focus: "Continue developing your ability to switch between formal and casual spoken registers.",
  };
}
