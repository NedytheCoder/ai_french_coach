/**
 * C1 Module 5 - Stylistic Refinement
 * =====================================
 *
 * This file contains all lesson data for C1 Module 5, teaching advanced French
 * learners to transform adequate prose into elegant, native-like French.
 *
 * **Module Content:**
 * - Introduction: Beyond correctness, the art of economy
 * - Redundancy elimination: Common pleonasms and verbose constructions
 * - Rhythm patterns: Short-long alternation, crescendo, chiasmus, anaphora, triptych
 * - Weak vs Strong examples: Before/after stylistic comparisons
 * - Transformations: Techniques for prose refinement
 * - French phrases: Native-like fixed expressions (il y a lieu de, loin de moi l'idée de)
 * - 15 practice quiz questions (rewrite, comparison, transformation types)
 *
 * **Key Concepts:**
 * - Redundancy: Eliminating pleonasms (avancer en avant → avancer)
 * - Litotes: Elegant understatement via negation (n'est pas dépourvu de)
 * - Nominalization: Converting verbs to nouns for concision
 * - Personification: Attributing agency to abstract concepts
 * - Rhythm: Short-long alternation, crescendo, chiasmus, anaphora
 * - Fixed phrases: Idiomatic expressions for native-like fluency
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to stylistic refinement
 * 4. redundancySection - Common redundancy patterns to eliminate
 * 5. weakVsStrongExamples - Before/after stylistic comparisons
 * 6. transformations - Prose refinement techniques
 * 7. rhythmPatterns - Rhythmic devices for elegant prose
 * 8. frenchPhrases - Native-like fixed expressions
 * 9. practiceQuestions - 15 quiz questions
 * 10. getResultMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all module section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to stylistic refinement
 * 2. redundancy - Eliminating redundancy
 * 3. rhythm - Rhythmic patterns
 * 4. elegance - Elegance techniques
 * 5. french-phrasing - Native-like fixed phrases
 * 6. weak-vs-strong - Before/after comparisons
 * 7. practice - Interactive quiz
 * 8. completion - Module completion
 */
export const sectionIds = ["intro", "redundancy", "rhythm", "elegance", "french-phrasing", "weak-vs-strong", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Stylistic Refinement",
  /** Brief description of module content */
  subtitle: "Transform adequate prose into elegant French. Eliminate redundancy, improve rhythm, and master native-like phrasing.",
  /** Module number in C1 series */
  moduleNumber: 5,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to stylistic refinement.
 *
 * Content:
 * - Beyond Correctness: Elegance as the goal, not just correctness
 * - The Art of Economy: French values concision and precision
 */
export const introSections = [
  {
    title: "Beyond Correctness",
    content: "At C1, correctness is assumed. The goal is elegance—prose that flows, that surprises pleasantly, that demonstrates mastery not just of rules but of the aesthetic possibilities of French.",
  },
  {
    title: "The Art of Economy",
    content: "French values concision. Elegant expression says more with less, using precise vocabulary and efficient structures. Redundancy is not just excess—it is a failure of precision.",
  },
];

// =============================================================================
// REDUNDANCY SECTION
// =============================================================================

/**
 * redundancySection - Common redundancy patterns to eliminate.
 *
 * Pleonasms (redundant expressions):
 * - avancer en avant → avancer (direction inherent in verb)
 * - descendre en bas → descendre
 * - monter en haut → monter
 * - entrer à l'intérieur → entrer
 * - sortir à l'extérieur → sortir
 * - revenir en arrière → revenir (re- already implies back)
 * - coopérer ensemble → coopérer
 * - meilleur idéal → idéal
 */
export const redundancySection = {
  title: "Eliminating Redundancy",
  patterns: [
    { redundant: "avancer en avant", refined: "avancer", saving: "En avant is already in avancer", example: "avancer" },
    { redundant: "descendre en bas", refined: "descendre", saving: "En bas is inherent in descendre", example: "descendre" },
    { redundant: "monter en haut", refined: "monter", saving: "En haut is inherent in monter", example: "monter" },
    { redundant: "entrer à l'intérieur", refined: "entrer", saving: "À l'intérieur is inherent in entrer", example: "entrer" },
    { redundant: "sortir à l'extérieur", refined: "sortir", saving: "À l'extérieur is inherent in sortir", example: "sortir" },
    { redundant: "revenir en arrière", refined: "revenir / retourner", saving: "Re- already implies back", example: "revenir" },
    { redundant: "coopérer ensemble", refined: "coopérer", saving: "Coopérer already implies togetherness", example: "coopérer" },
    { redundant: "meilleur idéal", refined: "idéal", saving: "Idéal is already the best", example: "idéal" },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Before/after stylistic comparisons.
 *
 * Examples showing how to transform verbose, casual prose into
 * elegant, concise French using nominalization, personification, and
 * precise vocabulary.
 *
 * Scenarios: Philosophical reflection, formal analysis, executive summary, economic analysis
 */
export const weakVsStrongExamples = [
  {
    weak: "Il faut faire attention au fait que le temps passe vite.",
    strong: "La fuite du temps commande notre attention.",
    why: "Nominalization 'fuite du temps' replaces verbose clause; 'commande' personifies elegantly.",
    context: "Philosophical reflection",
  },
  {
    weak: "Il y a beaucoup de personnes qui pensent que c'est important.",
    strong: "L'importance de cette dimension recueille un large consensus.",
    why: "Eliminates 'il y a' + relative clause; transforms subjective into measured observation.",
    context: "Formal analysis",
  },
  {
    weak: "Le fait est que nous devons prendre une décision maintenant.",
    strong: "Une décision s'impose.",
    why: "Three words replace eight; 's'impose' personifies necessity elegantly.",
    context: "Executive summary",
  },
  {
    weak: "C'est une situation qui est difficile pour tout le monde.",
    strong: "Tous pâtissent de cette conjoncture.",
    why: "Tous replaces 'tout le monde'; pâtir is elegant suffering; 'conjoncture' is technical.",
    context: "Economic analysis",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Prose refinement techniques.
 *
 * Each transformation demonstrates specific techniques for elevating
 * prose from adequate to elegant.
 *
 * Techniques demonstrated:
 * - Eliminate meta-commentary + personification
 * - Negation elegance (litotes) + formal vocabulary
 * - Nominalization + technical vocabulary
 */
export const transformations = [
  {
    original: "Il est important de noter que les résultats sont bons.",
    improved: "Les résultats méritent d'être salués.",
    technique: "Eliminate meta-commentary + personification",
    explanation: "'Méritent d'être salués' personifies results and eliminates filler 'il est important de noter'.",
  },
  {
    original: "Je voudrais dire que je ne suis pas d'accord avec cette opinion.",
    improved: "Cette opinion ne saurait recueillir mon adhésion.",
    technique: "Negation elegance + formal vocabulary",
    explanation: "'Ne saurait' is litotic understatement; 'recueillir mon adhésion' is formal for agreement.",
  },
  {
    original: "Il y a eu une augmentation du nombre de gens qui viennent.",
    improved: "La fréquentation connaît une croissance soutenue.",
    technique: "Nominalization + technical vocabulary",
    explanation: "'Fréquentation' is technical; 'connaît' personifies elegantly; 'croissance soutenue' is professional.",
  },
];

// =============================================================================
// RHYTHM PATTERNS
// =============================================================================

/**
 * rhythmPatterns - Rhythmic devices for elegant French prose.
 *
 * Patterns:
 * - Short-long alternation: Nous voulons. Nous agissons. Nous réussissons.
 * - Crescendo structure: Une idée. Un projet. Une révolution.
 * - Chiasmus (crossed structure): Aux forts la foi, aux faibles la loi.
 * - Anaphora (repetition): Toujours plus haut. Toujours plus loin...
 * - Triptych: Liberté, Égalité, Fraternité.
 */
export const rhythmPatterns = {
  title: "Rhythmic Patterns in French",
  patterns: [
    { pattern: "Short-long alternation", example: "Nous voulons. Nous agissons. Nous réussissons.", effect: "Martial, declarative rhythm" },
    { pattern: "Crescendo structure", example: "Une idée. Un projet. Une révolution.", effect: "Building intensity" },
    { pattern: "Chiasmus (crossed structure)", example: "Aux forts la foi, aux faibles la loi.", effect: "Elegant balance" },
    { pattern: "Anaphora (repetition)", example: "Toujours plus haut. Toujours plus loin. Toujours plus fort.", effect: "Emphatic accumulation" },
    { pattern: "Triptych", example: "Liberté, Égalité, Fraternité.", effect: "Classical balance" },
  ],
};

// =============================================================================
// FRENCH PHRASES
// =============================================================================

/**
 * frenchPhrases - Native-like fixed expressions for elegant French.
 *
 * Fixed phrases:
 * - Cela fait que / Il en résulte que: Consequence
 * - Non pas que / Ce n'est pas que: Concession opening
 * - Il va de soi que: Obvious point
 * - Il y a lieu de: Necessity/appropriateness
 * - Il n'est pas sans: Litotes
 * - Loin de moi l'idée de: Polite disclaimer
 */
export const frenchPhrases = {
  title: "Native-Like Fixed Phrases",
  phrases: [
    { literal: "It makes that / This makes", french: "Cela fait que / Il en résulte que", context: "Consequence" },
    { literal: "It is not that", french: "Non pas que / Ce n'est pas que", context: "Concession opening" },
    { literal: "It goes without saying", french: "Il va de soi que", context: "Obvious point" },
    { literal: "There is place to", french: "Il y a lieu de", context: "Necessity/appropriateness" },
    { literal: "It is not without", french: "Il n'est pas sans", context: "Litotes" },
    { literal: "Far from me the idea", french: "Loin de moi l'idée de", context: "Polite disclaimer" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 5.
 *
 * Question types:
 * - rewrite (1, 4, 6, 9, 11, 14): Eliminate redundancy, use fixed phrases
 * - comparison (2, 5, 7, 10, 12, 15): Compare stylistic elegance
 * - transformation (3, 8, 13): Refine to native-like prose
 *
 * Topics covered:
 * - Redundancy elimination (avancer en avant)
 * - Nominalization and personification
 * - Litotes (n'est pas dépourvu de)
 * - Rhythmic patterns (triptych, anaphora)
 * - Fixed phrases (il y a lieu de, loin de moi l'idée de)
 * - Chiasmus and parallel structure
 * - Concision through precise vocabulary
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
    type: "rewrite",
    prompt: "Eliminate redundancy:",
    context: "avancer en avant",
    options: ["avancer en avant", "avancer", "aller en avant"],
    correct: 1,
    explanation: "Avancer already contains the direction; 'en avant' is redundant.",
    nuance: "French directional verbs include their direction inherently.",
  },
  {
    id: 2,
    type: "comparison",
    prompt: "Which is more elegant?",
    options: [
      "Il faut faire attention au fait que le temps passe.",
      "La fuite du temps commande vigilance.",
    ],
    correct: 1,
    explanation: "Nominalization + personification + elimination of filler 'faire attention au fait que'.",
    nuance: "Economy through nominalization creates elegance.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Refine to native-like elegance:",
    context: "We need to take this into account",
    options: [
      "Nous devons prendre cela en compte.",
      "Cette dimension mérite d'être prise en considération.",
      "Il faut penser à ça.",
    ],
    correct: 1,
    explanation: "'Mérite d'être' is elegant; 'dimension' elevates 'cela'; 'considération' is formal.",
    nuance: "Mériter + passive infinitive creates formal elegance.",
  },
  {
    id: 4,
    type: "rewrite",
    prompt: "Use litotes elegantly:",
    context: "This is very important",
    options: [
      "C'est très important.",
      "Ceci n'est pas dépourvu d'importance.",
      "C'est super important.",
    ],
    correct: 1,
    explanation: "'N'est pas dépourvu de' is classic litotic understatement for emphasis.",
    nuance: "Litotes (understatement via negation) is a hallmark of elegant French.",
  },
  {
    id: 5,
    type: "comparison",
    prompt: "Which has better rhythm?",
    options: [
      "Nous devons travailler dur et faire des efforts constants pour obtenir les résultats souhaités dans ce domaine difficile.",
      "Travail. Effort. Résultat.",
    ],
    correct: 1,
    explanation: "Triptych creates powerful, memorable rhythm; nominal style is punchy.",
    nuance: "French oratory values rhythmic patterns and triads.",
  },
  {
    id: 6,
    type: "rewrite",
    prompt: "Eliminate 'le fait que' construction:",
    context: "The fact that he arrived early surprised us",
    options: [
      "Le fait qu'il soit arrivé tôt nous a surpris.",
      "Sa ponctualité nous a surpris.",
      "Qu'il soit arrivé tôt est surprenant.",
    ],
    correct: 1,
    explanation: "'Sa ponctualité' nominalizes elegantly, eliminating wordy 'le fait que'.",
    nuance: "Direct nominalization is always more elegant than 'le fait que'.",
  },
  {
    id: 7,
    type: "comparison",
    prompt: "Which uses native-like fixed phrase?",
    options: [
      "Cela cause que nous devons agir.",
      "Il en résulte que nous devons intervenir.",
    ],
    correct: 1,
    explanation: "'Il en résulte que' is native fixed phrase for consequence.",
    nuance: "Fixed phrases demonstrate idiomatic mastery.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Make more concise and elegant:",
    context: "Many people think this is a problem",
    options: [
      "Beaucoup de gens pensent que c'est un problème.",
      "Cette situation préoccupe nombre d'observateurs.",
      "Il y a plein de monde qui trouve ça gênant.",
    ],
    correct: 1,
    explanation: "'Nombre d'observateurs' is elegant; 'préoccupe' personifies; eliminates vague 'beaucoup'.",
    nuance: "Concision through precise vocabulary.",
  },
  {
    id: 9,
    type: "rewrite",
    prompt: "Use 'il y a lieu de' appropriately:",
    context: "We should examine this carefully",
    options: [
      "Nous devons examiner cela avec soin.",
      "Il y a lieu d'examiner cette question avec la plus grande attention.",
      "Il faut regarder ça bien.",
    ],
    correct: 1,
    explanation: "'Il y a lieu de' is formal necessity formula; 'la plus grande attention' elevates.",
    nuance: "'Il y a lieu de' signals formal evaluation of appropriateness.",
  },
  {
    id: 10,
    type: "comparison",
    prompt: "Which has better chiasmic structure?",
    options: [
      "Les riches ont de l'argent et les pauvres sont pauvres.",
      "Aux riches l'opulence, aux pauvres la pénurie.",
    ],
    correct: 1,
    explanation: "Prepositional parallel structure creates elegant chiasmus.",
    nuance: "Chiasmus (crossed parallel structure) is rhetorically powerful.",
  },
  {
    id: 11,
    type: "rewrite",
    prompt: "Eliminate 'tout le monde' and elevate:",
    context: "Everyone knows this",
    options: [
      "Tout le monde sait ça.",
      "Nul n'ignore ce fait.",
      "Les gens savent.",
    ],
    correct: 1,
    explanation: "'Nul n'ignore' is elegant litotes; 'ce fait' elevates 'ça'.",
    nuance: "'Nul ne' + verb is formal universal statement.",
  },
  {
    id: 12,
    type: "comparison",
    prompt: "Which is more elegantly concise?",
    options: [
      "Il est nécessaire que nous prenions une décision à ce moment présent.",
      "Une décision s'impose.",
    ],
    correct: 1,
    explanation: "Three words replace ten; 's'impose' personifies necessity.",
    nuance: "Extreme concision through nominalization and personification.",
  },
  {
    id: 13,
    type: "transformation",
    prompt: "Use 'loin de moi l'idée de' for polite disagreement:",
    context: "I don't want to criticize, but...",
    options: [
      "Je ne veux pas critiquer, mais...",
      "Loin de moi l'idée de critiquer; il n'en demeure pas moins que...",
      "Je critique pas, mais quand même...",
    ],
    correct: 1,
    explanation: "'Loin de moi l'idée de' is polite disclaimer; sophisticated continuation.",
    nuance: "Fixed polite formulas demonstrate social finesse.",
  },
  {
    id: 14,
    type: "rewrite",
    prompt: "Create anaphora (repetition) for emphasis:",
    context: "We want justice, peace, prosperity",
    options: [
      "Nous voulons la justice et la paix et la prospérité.",
      "Justice. Paix. Prospérité. Voilà ce que nous voulons.",
      "On veut que tout aille bien.",
    ],
    correct: 1,
    explanation: "Nominal anaphora + summary 'voilà ce que nous voulons' creates oratorical power.",
    nuance: "Anaphora (repetition) is a classical rhetorical device.",
  },
  {
    id: 15,
    type: "comparison",
    prompt: "Which demonstrates best stylistic refinement?",
    options: [
      "Il y a beaucoup de problèmes dans ce système qui ne fonctionne pas bien.",
      "Ce système, loin d'être dépourvu de défauts, appelle une refonte complète.",
    ],
    correct: 1,
    explanation: "Litotes 'loin d'être dépourvu' + personification 'appelle' + elegant 'refonte'.",
    nuance: "Multiple stylistic devices create layered elegance.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on eliminating fillers
 *   like 'le fait que', practicing nominalization and fixed phrases
 * - 8-11/15: "Nice progress" - encourages working on litotes and
 *   rhythmic patterns, concision through precise vocabulary
 * - 12-15/15: "Excellent stylistic mastery" - celebrates elegant,
 *   economical prose with native-like fluency
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Stylistic refinement requires attention to redundancy and native patterns. Focus on eliminating fillers like 'le fait que'.",
      focus: "Practice nominalization and using fixed phrases like 'il y a lieu de'.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your style is becoming more elegant. Continue refining your use of litotes and rhythmic patterns.",
      focus: "Work on concision through precise vocabulary and personification.",
    };
  }
  return {
    title: "Excellent stylistic mastery",
    message: "Your prose demonstrates elegance, economy, and native-like fluency. You balance clarity with sophistication.",
    focus: "Continue developing your personal style while maintaining these qualities.",
  };
}
