/**
 * C1 Module 9 - Advanced Pronoun & Structure Control
 * ======================================================
 *
 * This file contains all lesson data for C1 Module 9, teaching advanced French
 * learners to master complex pronoun chains, strategic restructuring, and
 * stylistic choices between clarity and elegance.
 *
 * **Module Content:**
 * - Introduction: Pronouns as precision tools, restructuring for effect
 * - Elegant pronoun chains: 6 patterns (le-lui, en, y, y+en combinations)
 * - Restructuring patterns: 5 transformations (active/passive, personal/impersonal, verbal/nominal, clefts)
 * - Clarity vs elegance: Strategic choices for different contexts
 * - 15 practice quiz questions (rewrite, comparison, transformation types)
 *
 * **Key Concepts:**
 * - Pronoun chains: le/la/les + lui/leur, en + y combinations
 * - Pronoun order: me/te/se/nous/vous → le/la/les → lui/leur → y → en
 * - Restructuring: Active → Passive, Personal → Impersonal, Verbal → Nominal
 * - Cleft constructions: C'est... qui/que for emphasis
 * - Participles: Condensing clauses into phrases
 * - Nominalization: Adding weight and formality
 * - Impersonal structures: Creating distance and authority
 * - Clarity vs elegance trade-offs for different contexts
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to pronoun precision and restructuring
 * 4. pronounChainExamples - Elegant pronoun chain patterns
 * 5. restructuringPatterns - Structural transformation examples
 * 6. weakVsStrongExamples - Pronoun-based vs repetitive comparisons
 * 7. transformations - Before/after sentence transformations
 * 8. clarityVsElegance - Strategic context-based recommendations
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
 * 1. intro - Introduction to pronoun precision and restructuring
 * 2. pronoun-chains - Elegant pronoun chain patterns
 * 3. restructuring - Structural transformation patterns
 * 4. clarity - Clarity vs elegance strategic choices
 * 5. stylistic-choice - Context-based recommendations
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "pronoun-chains", "restructuring", "clarity", "stylistic-choice", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Advanced Pronoun & Structure Control",
  /** Brief description of module content */
  subtitle: "Master complex pronoun chains, strategic restructuring, and stylistic choices between clarity and elegance.",
  /** Module number in C1 series */
  moduleNumber: 9,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to advanced pronoun and structure control.
 *
 * Content:
 * - Pronouns as Precision Tools: Deploying en, y, le, la, les, lui, leur in chains
 * - Restructuring for Effect: Choosing structures intentionally for clarity, emphasis, elegance
 */
export const introSections = [
  {
    title: "Pronouns as Precision Tools",
    content: "At C1, pronouns are not just grammatical necessities but precision instruments. You deploy en, y, le, la, les, lui, leur in chains that create elegant, compact expression. You know when repetition clarifies and when pronouns sophisticate.",
  },
  {
    title: "Restructuring for Effect",
    content: "The same idea can be structured multiple ways: active or passive, personal or impersonal, nominal or verbal. C1 mastery means choosing structures intentionally for clarity, emphasis, or elegance.",
  },
];

// =============================================================================
// PRONOUN CHAIN EXAMPLES
// =============================================================================

/**
 * pronounChainExamples - Elegant French pronoun chain patterns.
 *
 * Examples covered:
 * - Il me le donne: Indirect (me) + direct (le) - standard order
 * - Je le lui ai dit: Direct (le) before indirect (lui) - 3rd person exception
 * - Il m'en parle: Indirect (me) + en - de-complement replacement
 * - Elle y pense: Y replacing à + thing - elegant concision
 * - Il y en a: Y + en coexisting - impersonal existence
 * - Je l'ai vu le leur donner: Le (direct) + leur (indirect) - complex infinitive chain
 *
 * Key rule: Pronoun order is me/te/se/nous/vous → le/la/les → lui/leur → y → en
 */
export const pronounChainExamples = {
  title: "Elegant Pronoun Chains",
  examples: [
    { chain: "Il me le donne.", analysis: "Indirect (me) + direct (le) - standard order" },
    { chain: "Je le lui ai dit.", analysis: "Direct (le) before indirect (lui) - 3rd person exception" },
    { chain: "Il m'en parle.", analysis: "Indirect (me) + en - de-complement replacement" },
    { chain: "Elle y pense.", analysis: "Y replacing à + thing - elegant concision" },
    { chain: "Il y en a.", analysis: "Y + en coexisting - impersonal existence" },
    { chain: "Je l'ai vu le leur donner.", analysis: "Le (direct) + leur (indirect) - complex infinitive chain" },
  ],
};

// =============================================================================
// RESTRUCTURING PATTERNS
// =============================================================================

/**
 * restructuringPatterns - Five key structural transformations in French.
 *
 * Patterns covered:
 * - Active → Passive: Object becomes subject; depersonalizes
 * - Personal → Impersonal: Creates distance and formality (il convient)
 * - Verbal → Nominal: Adds weight and formality (prendre la décision)
 * - Declarative → Cleft: Emphasizes specific element (c'est... qui)
 * - Direct → Indirect: Softens obligation (il est nécessaire que)
 *
 * Each pattern shows the transformation with example and rhetorical effect.
 */
export const restructuringPatterns = {
  title: "Restructuring Patterns",
  patterns: [
    { pattern: "Active → Passive", active: "Le comité a voté la loi.", passive: "La loi a été votée par le comité.", effect: "Object becomes subject; depersonalizes" },
    { pattern: "Personal → Impersonal", personal: "Nous devons agir.", impersonal: "Il convient d'agir.", effect: "Creates distance and formality" },
    { pattern: "Verbal → Nominal", verbal: "Ils ont décidé de partir.", nominal: "Ils ont pris la décision de partir.", effect: "Adds weight and formality" },
    { pattern: "Declarative → Cleft", declarative: "Cette politique a échoué.", cleft: "C'est cette politique qui a échoué.", effect: "Emphasizes specific element" },
    { pattern: "Direct → Indirect", direct: "Tu dois venir.", indirect: "Il est nécessaire que tu viennes.", effect: "Softens obligation" },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Pronoun-based elegant vs repetitive comparisons.
 *
 * Examples showing how pronoun chains and restructuring transform
 * repetitive, literal phrasing into elegant, compact French.
 *
 * Scenarios: Concise explanation, fluent narrative, formal analysis, critical observation
 */
export const weakVsStrongExamples = [
  {
    weak: "Il parle de ce problème et il donne des exemples de ce problème.",
    strong: "Il en parle, donnant des exemples concrets.",
    why: "'En' replaces 'de ce problème'; participle 'donnant' condenses; 'y' implied but avoided for clarity.",
    context: "Concise explanation",
  },
  {
    weak: "Je donne le livre à Marie et je dis à Marie de le lire.",
    strong: "Je le lui donne, lui recommandant de le lire.",
    why: "Pronoun chain 'le lui' + 'lui' repetition creates elegant structure; participle condenses.",
    context: "Fluent narrative",
  },
  {
    weak: "On doit penser à cette question et on doit y répondre.",
    strong: "Cette question mérite qu'on y réfléchisse avant d'y répondre.",
    why: "Nominalization 'mérite' elevates; subjunctive 'réfléchisse' adds elegance; 'y' twice = natural.",
    context: "Formal analysis",
  },
  {
    weak: "Les gens disent qu'ils veulent ça mais ils ne le font pas.",
    strong: "Cette volonté affichée ne se traduit guère en actes.",
    why: "Nominalization 'volonté affichée'; impersonal 'se traduit'; 'guère' is elegant negation.",
    context: "Critical observation",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Before/after sentence restructuring demonstrations.
 *
 * Techniques shown:
 * - En + participle condensation: Replacing repetition with pronoun + participle
 * - Pronoun chain + participle: Le lui + lui repetition + recommandant
 * - Impersonal + nominative absolute: Il convient + participial absolute
 *
 * Each transformation shows the technique name and detailed explanation.
 */
export const transformations = [
  {
    original: "Il parle du problème et il donne des exemples du problème.",
    improved: "Il en parle, donnant des exemples concrets.",
    technique: "En + participle condensation",
    explanation: "'En' replaces 'de ce problème'; participle 'donnant' condenses second clause.",
  },
  {
    original: "Je donne le livre à Marie et je dis à Marie de le lire.",
    improved: "Je le lui donne, lui recommandant de le lire.",
    technique: "Pronoun chain + participle",
    explanation: "'Le lui' chain + 'lui' repetition + participle 'recommandant'.",
  },
  {
    original: "Nous devons agir vite. Nous avons trois options.",
    improved: "Il convient d'agir, trois options s'offrant à nous.",
    technique: "Impersonal + nominative absolute",
    explanation: "'Il convient' elevates; participial absolute creates elegant density.",
  },
];

// =============================================================================
// CLARITY VS ELEGANCE
// =============================================================================

/**
 * clarityVsElegance - Strategic context-based recommendations for structural choices.
 *
 * Scenarios analyzed:
 * - Complex technical explanation: Clarity recommended - needs transparency
 * - Literary analysis: Elegance recommended - permits density
 * - Executive summary: Elegance recommended - should be dense
 *
 * Each scenario provides clarity version, elegance version, and recommendation.
 */
export const clarityVsElegance = {
  title: "Clarity vs. Elegance: Strategic Choices",
  scenarios: [
    { scenario: "Complex technical explanation", clarity: "Le chercheur explique sa méthode. Il montre comment elle fonctionne.", elegance: "Le chercheur explique sa méthode et en démontre le fonctionnement.", recommendation: "Clarity - technical content needs transparency" },
    { scenario: "Literary analysis", clarity: "L'auteur critique la société. Il utilise des exemples.", elegance: "L'auteur en fait la critique, s'appuyant sur des exemples éloquents.", recommendation: "Elegance - literary context permits density" },
    { scenario: "Executive summary", clarity: "Nous devons agir. Nous avons trois options.", elegance: "Il convient d'agir, trois options s'offrant à nous.", recommendation: "Elegance - summaries should be dense" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 9.
 *
 * Question types:
 * - rewrite (1, 4, 6, 8, 14): Use specific pronoun or structure
 * - comparison (2, 5, 7, 9, 11, 13, 15): Choose more elegant version
 * - transformation (3, 10, 12): Restructure for formality/effect
 *
 * Topics covered:
 * - Pronoun chains (le-lui, les-moi, double pronouns)
 * - En and y usage and order
 * - Impersonal restructuring (il y a urgence, il convient)
 * - Cleft constructions (c'est... qui)
 * - Participles (past and present)
 * - Passive voice transformations
 * - Nominalization techniques
 * - Subjunctive in subordinate clauses
 * - Layered nominalization and subordination
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
    prompt: "Use pronoun chain for elegance:",
    context: "Give it to him",
    options: [
      "Donne-le-lui.",
      "Donne le à lui.",
      "Donne lui le.",
    ],
    correct: 0,
    explanation: "Imperative: le-lui with hyphen; direct (le) before indirect (lui) in 3rd person.",
    nuance: "Pronoun order: me/te/se/nous/vous → le/la/les → lui/leur.",
  },
  {
    id: 2,
    type: "comparison",
    prompt: "Which uses pronouns more elegantly?",
    options: [
      "Il parle de ce projet. Il pense à ce projet. Il travaille sur ce projet.",
      "Il en parle, y pense et y travaille.",
    ],
    correct: 1,
    explanation: "En + y + y chain eliminates repetition; creates elegant concision.",
    nuance: "Pronoun chains avoid awkward repetition.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Restructure for formality:",
    context: "We must act quickly",
    options: [
      "Nous devons agir vite.",
      "Il y a urgence à agir.",
      "Faut agir rapidement.",
    ],
    correct: 1,
    explanation: "Impersonal 'il y a urgence' is formal; 'à agir' is elegant construction.",
    nuance: "Impersonal structures create distance and formality.",
  },
  {
    id: 4,
    type: "rewrite",
    prompt: "Use y and en together:",
    context: "There are some",
    options: [
      "Il en y a.",
      "Il y en a.",
      "Il y a en.",
    ],
    correct: 1,
    explanation: "Y + en: y first, then en. Standard impersonal formula.",
    nuance: "Y before en in all constructions.",
  },
  {
    id: 5,
    type: "comparison",
    prompt: "Which restructures more elegantly?",
    options: [
      "Les employés doivent suivre ces règles. Les employés doivent respecter ces règles.",
      "Ces règles, qu'il convient de suivre et de respecter, s'imposent à tous.",
    ],
    correct: 1,
    explanation: "Relative clause + impersonal + 's'imposent' personifies elegantly.",
    nuance: "Stacking infinitives in relative clause creates sophistication.",
  },
  {
    id: 6,
    type: "rewrite",
    prompt: "Create cleft for emphasis:",
    context: "This decision caused the problem",
    options: [
      "C'est cette décision qui a causé le problème.",
      "C'est le problème que cette décision a causé.",
      "Cette décision, c'est elle qui a causé.",
    ],
    correct: 0,
    explanation: "C'est... qui cleft emphasizes subject (this decision).",
    nuance: "Clefts foreground specific information.",
  },
  {
    id: 7,
    type: "comparison",
    prompt: "Which uses participle elegantly?",
    options: [
      "Il est entré dans la pièce et il portait un costume et il regardait les gens.",
      "Vêtu d'un costume sombre, il pénétra dans la pièce, scrutant l'assistance.",
    ],
    correct: 1,
    explanation: "Past participle (state) + present participle (action) creates elegant economy.",
    nuance: "Participles condense clauses into phrases.",
  },
  {
    id: 8,
    type: "rewrite",
    prompt: "Use double pronoun correctly:",
    context: "Give them to me",
    options: [
      "Donne-les-moi.",
      "Donne-moi-les.",
      "Les donne-moi.",
    ],
    correct: 0,
    explanation: "Imperative: les-moi; direct before indirect, but me becomes moi after affirmative imperative.",
    nuance: "Me/te become moi/toi after affirmative imperative.",
  },
  {
    id: 9,
    type: "comparison",
    prompt: "Which shows better structural control?",
    options: [
      "On pense que c'est important mais on ne fait rien.",
      "Cette importance reconnue ne se traduit guère en actes.",
    ],
    correct: 1,
    explanation: "Nominalization + impersonal 'se traduit' + 'guère' elegant negation.",
    nuance: "Nominalization + impersonal creates distance and authority.",
  },
  {
    id: 10,
    type: "rewrite",
    prompt: "Restructure using passive:",
    context: "The committee approved the proposal",
    options: [
      "Le comité a approuvé la proposition.",
      "La proposition a été approuvée par le comité.",
      "La proposition, le comité l'a approuvée.",
    ],
    correct: 1,
    explanation: "Passive shifts focus to proposal (the topic); formal register.",
    nuance: "Passive creates objectivity and formality.",
  },
  {
    id: 11,
    type: "comparison",
    prompt: "Which handles pronoun chain more elegantly?",
    options: [
      "Je donne le livre à Marie et je dis à Marie de le lire.",
      "Je le lui donne, lui recommandant de le lire.",
    ],
    correct: 1,
    explanation: "Le lui + lui repetition + participle 'recommandant' creates sophisticated chain.",
    nuance: "Pronoun repetition can create elegant emphasis.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Nominalize for formality:",
    context: "They decided to expand",
    options: [
      "Ils ont décidé d'expansionner.",
      "La décision d'expansion a été prise.",
      "Ils ont choisi de grandir.",
    ],
    correct: 1,
    explanation: "Nominalization 'décision d'expansion' + passive = very formal.",
    nuance: "Nominalization + passive creates maximum formality.",
  },
  {
    id: 13,
    type: "comparison",
    prompt: "Which uses en correctly?",
    options: [
      "Je vais au magasin. J'achète du pain.",
      "J'y vais. J'en achète.",
    ],
    correct: 1,
    explanation: "Y = à + place; en = de + thing (du pain).",
    nuance: "Y replaces à-phrases; en replaces de-phrases.",
  },
  {
    id: 14,
    type: "rewrite",
    prompt: "Use subjunctive in subordinate elegantly:",
    context: "We want him to succeed",
    options: [
      "Nous voulons qu'il réussit.",
      "Nous voulons qu'il réussisse.",
      "Nous voulons qu'il a réussi.",
    ],
    correct: 1,
    explanation: "Vouloir que + subjunctive (il réussisse); subjunctive adds elegance.",
    nuance: "Subjunctive in subordinate clause is required and elegant.",
  },
  {
    id: 15,
    type: "comparison",
    prompt: "Which demonstrates best structural mastery?",
    options: [
      "Les problèmes continuent. Les gens sont inquiets. Le gouvernement ne fait rien.",
      "Cette persistance des difficultés, qui alimente l'inquiétude populaire, contraste avec l'impuissance gouvernementale manifeste.",
    ],
    correct: 1,
    explanation: "Nominalization + relative embedding + contrast structure + evaluative 'manifeste'.",
    nuance: "Mature sentences layer nominalization and subordination.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on y/en usage and standard double
 *   pronoun order (il y en a, le lui patterns)
 * - 8-11/15: "Nice progress" - encourages refining restructuring choices,
 *   working on participles and cleft constructions
 * - 12-15/15: "Excellent structural mastery" - celebrates command of complex
 *   pronoun chains and sophisticated restructuring with native-like flexibility
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Pronoun chains require practice. Focus on y/en usage and standard double pronoun order.",
      focus: "Practice 'il y en a' and 'le lui' patterns.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your pronoun control is developing. Continue refining restructuring choices.",
      focus: "Work on participles and cleft constructions for emphasis.",
    };
  }
  return {
    title: "Excellent structural mastery",
    message: "You command complex pronoun chains and sophisticated restructuring. Your sentences flow with native-like flexibility.",
    focus: "Continue developing your ability to choose structures for rhetorical effect.",
  };
}
