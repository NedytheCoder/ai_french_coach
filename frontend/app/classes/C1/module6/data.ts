/**
 * C1 Module 6 - Argumentation & Persuasion
 * ===========================================
 *
 * This file contains all lesson data for C1 Module 6, teaching advanced French
 * learners to construct compelling arguments with sophisticated reasoning and
 * persuasive elegance.
 *
 * **Module Content:**
 * - Introduction: The architecture of persuasion, persuasion vs proof
 * - Thesis formulations: Direct assertion, analytical framing, rhetorical question, contrast opening
 * - Evidence strategies: Authority appeal, data grounding, example illustration, consensus appeal
 * - Weak vs Strong examples: Argumentation formulations
 * - Transformations: Elevating argumentation to persuasive elegance
 * - Persuasion techniques: Praeteritio, anaphora, antithesis, rhetorical question, gradatio
 * - 15 practice quiz questions (rewrite, comparison, transformation types)
 *
 * **Key Concepts:**
 * - Persuasion vs proof: Moving people vs demonstrating truth
 * - Thesis formulation: Clear position + analytical sophistication
 * - Evidence introduction: Establishing authority and currency
 * - Strategic concessions: Strengthening position by acknowledging objections
 * - Rhetorical devices: Praeteritio, anaphora, antithesis, gradatio (climax)
 * - Elegant refutation: Acknowledging before dismantling
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to argumentation and persuasion
 * 4. thesisFormulations - Thesis statement patterns
 * 5. evidenceStrategies - Evidence introduction techniques
 * 6. weakVsStrongExamples - Before/after argumentation examples
 * 7. transformations - Persuasive transformation examples
 * 8. persuasionTechniques - Rhetorical devices for persuasion
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
 * 1. intro - Introduction to argumentation architecture
 * 2. thesis - Thesis formulation strategies
 * 3. evidence - Evidence introduction techniques
 * 4. reasoning - Logical reasoning patterns
 * 5. objection - Handling objections and concessions
 * 6. persuasion - Persuasion techniques and rhetorical devices
 * 7. practice - Interactive quiz
 * 8. completion - Module completion
 */
export const sectionIds = ["intro", "thesis", "evidence", "reasoning", "objection", "persuasion", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Argumentation & Persuasion",
  /** Brief description of module content */
  subtitle: "Construct compelling arguments with sophisticated reasoning, strategic concessions, and persuasive elegance.",
  /** Module number in C1 series */
  moduleNumber: 6,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to argumentation and persuasion.
 *
 * Content:
 * - The Architecture of Persuasion: Rhetorically compelling arguments with strategic concessions
 * - Persuasion vs. Proof: Moving people vs demonstrating truth, combining rigor with rhetoric
 */
export const introSections = [
  {
    title: "The Architecture of Persuasion",
    content: "At C1, argumentation becomes an art form. You construct not just logically valid arguments, but rhetorically compelling ones. You anticipate objections, deploy concessions strategically, and guide your reader to your conclusion with elegance and authority.",
  },
  {
    title: "Persuasion vs. Proof",
    content: "Proof demonstrates truth. Persuasion moves people. C1 mastery requires both: rigorous reasoning presented with rhetorical awareness. Your arguments should be watertight, but also memorable, elegant, and compelling.",
  },
];

// =============================================================================
// THESIS FORMULATIONS
// =============================================================================

/**
 * thesisFormulations - Thesis statement patterns for argumentation.
 *
 * Patterns:
 * - Direct assertion: Je soutiens que... (clear, confident)
 * - Analytical framing: Il apparaît que... (measured, objective)
 * - Rhetorical question: Comment pourrait-on ignorer que...? (engaging, emphatic)
 * - Contrast opening: Contrairement à..., il semble que... (challenges assumptions)
 */
export const thesisFormulations = {
  title: "Thesis Statement Formulations",
  patterns: [
    { pattern: "Direct assertion", formulation: "Je soutiens que...", example: "Je soutiens que cette approche s'avère la plus viable.", strength: "Clear, confident" },
    { pattern: "Analytical framing", formulation: "Il apparaît que...", example: "Il apparaît que les avantages l'emportent sur les inconvénients.", strength: "Measured, objective" },
    { pattern: "Rhetorical question", formulation: "Comment pourrait-on ignorer que...?", example: "Comment pourrait-on ignorer l'ampleur de ce phénomène?", strength: "Engaging, emphatic" },
    { pattern: "Contrast opening", formulation: "Contrairement à..., il semble que...", example: "Contrairement aux apparences, il semble que...", strength: "Challenges assumptions" },
  ],
};

// =============================================================================
// EVIDENCE STRATEGIES
// =============================================================================

/**
 * evidenceStrategies - Techniques for introducing evidence persuasively.
 *
 * Strategies:
 * - Authority appeal: Selon X, spécialiste reconnu... (establishes expertise)
 * - Data grounding: Les chiffres révèlent que... (empirical authority)
 * - Example illustration: À titre d'illustration... (concrete grounding)
 * - Consensus appeal: Il est désormais acquis que... (establishes agreement)
 */
export const evidenceStrategies = {
  title: "Introducing Evidence",
  strategies: [
    { strategy: "Authority appeal", marker: "Selon X, spécialiste reconnu...", example: "Selon le Dr. Martin, éminente spécialiste de la question...", note: "Establishes expertise" },
    { strategy: "Data grounding", marker: "Les chiffres révèlent que...", example: "Les données recueillies révèlent une tendance sans équivoque...", note: "Empirical authority" },
    { strategy: "Example illustration", marker: "À titre d'illustration...", example: "À titre d'illustration, le cas de l'Allemagne mérite attention...", note: "Concrete grounding" },
    { strategy: "Consensus appeal", marker: "Il est désormais acquis que...", example: "Il est désormais acquis que cette théorie fait consensus...", note: "Establishes agreement" },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Argumentation formulation comparisons.
 *
 * Examples showing how to transform casual, subjective statements into
 * persuasive, analytical argumentation.
 *
 * Scenarios: Professional recommendation, academic rebuttal, formal presentation, diplomatic disagreement
 */
export const weakVsStrongExamples = [
  {
    weak: "Je pense que c'est une bonne idée parce que ça marche bien.",
    strong: "L'efficacité avérée de cette méthode en fait une option stratégiquement pertinente.",
    why: "Replaces subjective 'je pense' with objective 'efficacité avérée'; 'stratégiquement pertinente' elevates 'bonne idée'.",
    context: "Professional recommendation",
  },
  {
    weak: "Il y a des gens qui ne sont pas d'accord, mais je crois qu'ils ont tort.",
    strong: "Certes, des voix discordantes s'élèvent; néanmoins, leurs arguments ne résistent pas à l'examen approfondi.",
    why: "'Certes' concedes elegantly; 'voix discordantes' is metonymic; 'résistent pas à l'examen' is analytical refutation.",
    context: "Academic rebuttal",
  },
  {
    weak: "On peut dire que c'est important pour plusieurs raisons.",
    strong: "Cette dimension revêt une importance capitale, pour trois raisons essentielles.",
    why: "'Revêt une importance' is formal; 'capitale' elevates 'important'; 'trois raisons essentielles' structures anticipation.",
    context: "Formal presentation",
  },
  {
    weak: "Je ne suis pas sûr que ce soit la meilleure façon de faire.",
    strong: "Cette approche, bien qu'envisageable, ne saurait recueillir mon adhésion sans réserves.",
    why: "'Bien qu'envisageable' concedes before criticizing; 'ne saurait recueillir' is elegant litotes.",
    context: "Diplomatic disagreement",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Persuasive transformation examples.
 *
 * Each transformation shows how to elevate casual argumentation to
 * persuasive elegance using various rhetorical techniques.
 *
 * Techniques demonstrated:
 * - Impersonal necessity + formal relative + elegant solution verb
 * - Elegant concession + nominalization + formal objection
 * - Relative insertion + personification + formal appeal
 */
export const transformations = [
  {
    original: "Je pense qu'il faut faire ça. Ça résoudra le problème.",
    improved: "Il s'avère impératif d'adopter cette mesure, laquelle devrait permettre de remédier à la difficulté.",
    technique: "Impersonal necessity + formal relative + elegant solution verb",
    explanation: "'Il s'avère impératif' removes personal opinion; 'laquelle' is literary relative; 'remédier' elevates 'résoudre'.",
  },
  {
    original: "D'autres personnes pensent différemment. Ils disent que ce n'est pas bon.",
    improved: "Force est de reconnaître que des positions divergentes continuent de s'exprimer, arguant du caractère inadapté de cette proposition.",
    technique: "Elegant concession + nominalization + formal objection",
    explanation: "'Force est de reconnaître' is elegant; 'positions divergentes' nominalizes; 'arguant' is sophisticated.",
  },
  {
    original: "C'est la meilleure solution. Tout le monde devrait l'accepter.",
    improved: "Cette solution, qui s'impose comme la plus adéquate, mérite l'adhésion de tous les acteurs concernés.",
    technique: "Relative insertion + personification + formal appeal",
    explanation: "'Qui s'impose' personifies; 'mérite l'adhésion' is elegant; 'acteurs concernés' is professional.",
  },
];

// =============================================================================
// PERSUASION TECHNIQUES
// =============================================================================

/**
 * persuasionTechniques - Rhetorical devices for persuasive elegance.
 *
 * Techniques:
 * - Praeteritio (pretended omission): Mentions while claiming not to
 * - Anaphora (repetition): Rhythmic emphasis through repetition
 * - Antithesis: Clear contrast through parallel structure
 * - Rhetorical question: Engages audience through implied answer
 * - Gradatio (climax): Building intensity through progression
 */
export const persuasionTechniques = {
  title: "Persuasion Techniques",
  techniques: [
    { technique: "Praeteritio (pretended omission)", example: "Je n'insisterai pas sur les avantages économiques, bien qu'ils soient considérables.", effect: "Mentions while claiming not to" },
    { technique: "Anaphora (repetition)", example: "Nous voulons la sécurité. Nous voulons l'avenir. Nous voulons l'action.", effect: "Rhythmic emphasis" },
    { technique: "Antithesis", example: "Non pas l'immobilisme, mais le progrès. Non pas la peur, mais l'espoir.", effect: "Clear contrast" },
    { technique: "Rhetorical question", example: "Comment pourrions-nous, en conscience, ignorer ces faits?", effect: "Engages audience" },
    { technique: "Gradatio (climax)", example: "Une erreur. Un risque. Un danger mortel.", effect: "Building intensity" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 6.
 *
 * Question types:
 * - rewrite (1, 5, 8, 10, 13): Formulate thesis, use praeteritio, rhetorical questions, gradatio
 * - comparison (2, 4, 6, 9, 11, 14): Compare evidence introduction, objection handling, rhythm
 * - transformation (3, 7, 12, 15): Elevate to persuasive elegance, antithesis, consensus appeal
 *
 * Topics covered:
 * - Elegant thesis formulation (je soutiens que)
 * - Evidence introduction with authority
 * - Persuasive urgency through personification
 * - Elegant refutation and concessions
 * - Praeteritio (pretended omission)
 * - Anaphora and rhythmic patterns
 * - Antithesis for persuasive contrast
 * - Rhetorical questions for engagement
 * - Gradatio (climactic structure)
 * - Litotes for understated emphasis
 * - Professional diplomatic disagreement
 * - Persuasive conclusions with synthesis
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
    prompt: "Formulate an elegant thesis statement:",
    context: "Defending a policy",
    options: [
      "Je pense que cette politique est bonne.",
      "Je soutiens que cette politique présente l'avantage déterminant de concilier efficacité et équité.",
      "Cette politique, c'est la meilleure.",
    ],
    correct: 1,
    explanation: "'Je soutiens' is formal; 'avantage déterminant' elevates; 'concilier efficacité et équité' adds analytical depth.",
    nuance: "Strong thesis combines clear position with analytical sophistication.",
  },
  {
    id: 2,
    type: "comparison",
    prompt: "Which introduces evidence more persuasively?",
    options: [
      "Un gars a dit que c'est vrai.",
      "Les travaux les plus récents en la matière confirment unanimement cette hypothèse.",
    ],
    correct: 1,
    explanation: "'Travaux récents' establishes currency; 'confirment unanimement' shows consensus authority.",
    nuance: "Evidence introduction should establish authority and currency.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Transform to persuasive elegance:",
    context: "We must act",
    options: [
      "Il faut qu'on fasse quelque chose maintenant.",
      "L'urgence de la situation commande une intervention immédiate.",
      "Faut agir vite.",
    ],
    correct: 1,
    explanation: "'Commande' personifies urgency; 'intervention' elevates 'fasse quelque chose'.",
    nuance: "Personification creates persuasive urgency.",
  },
  {
    id: 4,
    type: "comparison",
    prompt: "Which handles objection more elegantly?",
    options: [
      "Vous avez tort et voici pourquoi.",
      "Cette interprétation, bien qu'envisageable, ne résiste pas à un examen approfondi.",
    ],
    correct: 1,
    explanation: "Concedes before refuting; 'résiste pas à un examen' is analytical rather than confrontational.",
    nuance: "Elegant refutation acknowledges before dismantling.",
  },
  {
    id: 5,
    type: "rewrite",
    prompt: "Use praeteritio (pretended omission):",
    context: "Mentioning opponent's weakness while appearing fair",
    options: [
      "Mon adversaire a beaucoup de défauts.",
      "Je n'insisterai pas sur les lacunes de l'approche adverse, qu'on ne saurait ignorer.",
      "Laissez-moi lister les problèmes chez l'autre...",
    ],
    correct: 1,
    explanation: "'Je n'insisterai pas' claims omission; 'qu'on ne saurait ignorer' ensures it's noted.",
    nuance: "Praeteritio mentions while claiming restraint.",
  },
  {
    id: 6,
    type: "comparison",
    prompt: "Which creates more persuasive rhythm?",
    options: [
      "Nous voulons la sécurité et aussi la paix et puis le progrès.",
      "Sécurité. Paix. Progrès.",
    ],
    correct: 1,
    explanation: "Nominal anaphora creates punchy, memorable oratorical rhythm.",
    nuance: "Rhythmic patterns enhance memorability.",
  },
  {
    id: 7,
    type: "transformation",
    prompt: "Make more persuasive through antithesis:",
    context: "Progress vs stagnation",
    options: [
      "Nous devons aller en avant pas en arrière.",
      "Non pas l'immobilisme, mais l'action. Non pas la peur, mais l'audace.",
      "Il faut progresser.",
    ],
    correct: 1,
    explanation: "Parallel negative/positive structure creates elegant antithesis.",
    nuance: "Antithesis structures contrast persuasively.",
  },
  {
    id: 8,
    type: "rewrite",
    prompt: "Formulate elegant rhetorical question:",
    context: "Emphasizing importance",
    options: [
      "C'est important, vous ne pensez pas?",
      "Comment pourrions-nous, en toute conscience, sous-estimer l'ampleur de cet enjeu?",
      "C'est important, non?",
    ],
    correct: 1,
    explanation: "'Comment pourrions-nous' opens; 'en toute conscience' adds moral weight; 'sous-estimer' is analytical.",
    nuance: "Rhetorical questions engage through implied answer.",
  },
  {
    id: 9,
    type: "comparison",
    prompt: "Which conclusion is more persuasive?",
    options: [
      "Donc c'est clair que j'ai raison.",
      "Ces éléments étant posés, il apparaît manifeste que cette voie est la seule viable.",
    ],
    correct: 1,
    explanation: "Metadiscourse 'ces éléments étant posés' + impersonal 'il apparaît' + measured 'manifeste'.",
    nuance: "Persuasive conclusions synthesize without overclaiming.",
  },
  {
    id: 10,
    type: "rewrite",
    prompt: "Use gradatio (climax) for building intensity:",
    context: "Warning about danger",
    options: [
      "C'est dangereux.",
      "Un risque. Une menace. Un danger imminent.",
      "Il y a beaucoup de danger.",
    ],
    correct: 1,
    explanation: "Triad building from risk to threat to imminent danger creates crescendo.",
    nuance: "Gradatio builds persuasive intensity through progression.",
  },
  {
    id: 11,
    type: "comparison",
    prompt: "Which handles concession more strategically?",
    options: [
      "Vous avez raison sur ce point, mais sur le fond vous tort.",
      "Force est de reconnaître la pertinence de cette observation; il n'en demeure pas moins que sur le fond...",
    ],
    correct: 1,
    explanation: "'Force est de reconnaître' is elegant; 'il n'en demeure pas moins' is sophisticated continuation.",
    nuance: "Strategic concessions strengthen your position.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Make appeal to consensus elegantly:",
    context: "Establishing agreement",
    options: [
      "Tout le monde pense ça.",
      "Il est désormais acquis, en l'état des connaissances, que cette hypothèse fait l'objet d'un large consensus.",
      "Les gens sont d'accord.",
    ],
    correct: 1,
    explanation: "'En l'état des connaissances' adds academic weight; 'large consensus' is measured.",
    nuance: "Consensus appeals should establish currency and breadth.",
  },
  {
    id: 13,
    type: "rewrite",
    prompt: "Formulate measured disagreement:",
    context: "Professional context",
    options: [
      "Je ne suis pas d'accord avec cette proposition.",
      "Je me permets de exprimer quelques réserves quant à cette orientation.",
      "C'est une mauvaise idée.",
    ],
    correct: 1,
    explanation: "'Je me permets de' shows deference; 'quelques réserves' is measured; 'orientation' is analytical.",
    nuance: "Professional disagreement requires diplomatic padding.",
  },
  {
    id: 14,
    type: "comparison",
    prompt: "Which uses litotes elegantly for persuasion?",
    options: [
      "C'est très important.",
      "Cette dimension n'est pas dépourvue d'importance.",
    ],
    correct: 1,
    explanation: "Double negative 'n'est pas dépourvu de' creates understated emphasis.",
    nuance: "Litotes (understatement) can be more persuasive than hyperbole.",
  },
  {
    id: 15,
    type: "transformation",
    prompt: "Synthesize into persuasive conclusion:",
    context: "Sum up argument",
    options: [
      "Donc voilà, c'est tout.",
      "Partant de ces observations, il apparaît que cette voie s'impose comme l'option la plus judicieuse.",
      "En bref, c'est ça.",
    ],
    correct: 1,
    explanation: "'Partant de' is literary; 'il apparaît' is measured; 's'impose' personifies; 'judicieuse' is evaluative.",
    nuance: "Persuasive conclusions synthesize with authority.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on structuring arguments
 *   with clear thesis and evidence, using 'je soutiens' formulations
 * - 8-11/15: "Nice progress" - encourages working on rhetorical devices
 *   (praeteritio, antithesis) and strategic concessions
 * - 12-15/15: "Excellent persuasive mastery" - celebrates compelling
 *   arguments with sophisticated reasoning and elegant rhetoric
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Persuasion requires rhetorical awareness. Focus on structuring arguments with clear thesis and evidence.",
      focus: "Practice using 'je soutiens' formulations and elegant concession patterns.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your arguments are becoming more persuasive. Continue developing your use of rhetorical devices and strategic concessions.",
      focus: "Work on praeteritio, antithesis, and climactic structures.",
    };
  }
  return {
    title: "Excellent persuasive mastery",
    message: "You construct compelling arguments with sophisticated reasoning and elegant rhetoric. Your persuasion is both rigorous and memorable.",
    focus: "Continue developing your ability to adapt persuasive strategies to different audiences.",
  };
}
