/**
 * C2 Module 8 - Text Analysis & Critique
 * ========================================
 *
 * This file contains all lesson data for C2 Module 8, teaching mastery of
 * evaluating arguments, identifying weaknesses, and writing sophisticated
 * critiques. Students develop analytical and critical skills at the near-native
 * level while maintaining scholarly courtesy and intellectual generosity.
 *
 * **Module Content:**
 * - Introduction: The art of critique, beyond agreement and disagreement
 * - Evaluation Criteria: 5 criteria for text evaluation (logical validity, etc.)
 * - Weak/Strong/Expert examples: 3-tier progression in critique sophistication
 * - Strengthening Techniques: 4 techniques for argument strengthening
 * - 15 practice quiz questions (interpretation and transformation types)
 *
 * **Five Evaluation Criteria:**
 * 1. Logical validity: Does conclusion follow from premises? (non sequitur, circular)
 * 2. Evidence quality: Is evidence relevant, sufficient, reliable? (anecdotal, cherry-picking)
 * 3. Rhetorical fairness: Does author engage opposing views? (straw man, ad hominem)
 * 4. Scope and limitations: Does author acknowledge limitations? (overgeneralization)
 * 5. Implications: Are implications fully explored? (unexamined consequences)
 *
 * **Key Logical Fallacies Covered:**
 * - Appeal to popularity (ad populum): 'Everyone knows that...'
 * - Slippery slope: Assuming one step leads to extreme consequences
 * - Ad hominem: Attacking the author rather than argument
 * - Cherry-picking: Selective use of evidence
 * - Straw man: Oversimplifying opponent's argument
 * - False cause: Assuming correlation implies causation
 * - Hasty generalization: Broad conclusions from limited evidence
 *
 * **Strengthening Techniques:**
 * - Concession and reply: Bien que X soit vrai...
 * - Nested qualification: Si X, ce qui impliquerait Y, à moins que Z...
 * - Evidential hedging: Selon toute apparence...
 * - Scope limitation: Cette conclusion ne saurait être généralisée...
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to text analysis
 * 4. evaluationCriteria - 5 criteria with red flags
 * 5. weakStrongExpertExamples - 3-tier critique progression
 * 6. strengtheningTechniques - 4 argument strengthening techniques
 * 7. practiceQuestions - 15 quiz questions
 * 8. getResultMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all module section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to critique as constructive analysis
 * 2. evaluation - Criteria for text evaluation
 * 3. weaknesses - Identifying logical/rhetorical weaknesses
 * 4. strengthening - Techniques for strengthening arguments
 * 5. critique - Writing sophisticated critiques
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "evaluation", "weaknesses", "strengthening", "critique", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Text Analysis & Critique",
  /** Brief description of module content */
  subtitle: "Master evaluating arguments, identifying weaknesses, and writing sophisticated critiques. Develop analytical and critical skills at the highest level.",
  /** Module number in C2 series */
  moduleNumber: 8,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to text analysis and critique.
 *
 * Content:
 * - The Art of Critique: Constructive analysis vs. mere criticism
 * - Beyond Agreement/Disagreement: Examining premises, testing logic, evaluating evidence
 */
export const introSections = [
  {
    title: "The Art of Critique",
    content: "At C2, critique is constructive analysis, not mere criticism. You evaluate arguments rigorously, identify logical and rhetorical weaknesses, and suggest improvements—all while maintaining scholarly courtesy and intellectual generosity.",
  },
  {
    title: "Beyond Agreement and Disagreement",
    content: "C2 analysis moves beyond 'I agree' or 'I disagree.' You examine premises, test logic, evaluate evidence, and assess implications. Your critiques are nuanced, specific, and intellectually rigorous.",
  },
];

// =============================================================================
// EVALUATION CRITERIA
// =============================================================================

/**
 * evaluationCriteria - Five criteria for rigorous text evaluation.
 *
 * Criteria:
 * - Logical validity: Red flags include non sequitur, circular reasoning, false dichotomy
 * - Evidence quality: Red flags include anecdotal evidence, outdated sources, cherry-picking
 * - Rhetorical fairness: Red flags include straw man, ad hominem, selective quotation
 * - Scope and limitations: Red flags include overgeneralization, false universality
 * - Implications: Red flags include unexamined consequences, false causality
 *
 * Each criterion includes evaluation question and warning signs.
 */
export const evaluationCriteria = {
  title: "Criteria for Text Evaluation",
  criteria: [
    { criterion: "Logical validity", question: "Does the conclusion follow from the premises?", redFlag: "Non sequitur, circular reasoning, false dichotomy" },
    { criterion: "Evidence quality", question: "Is the evidence relevant, sufficient, and reliable?", redFlag: "Anecdotal evidence, outdated sources, cherry-picking" },
    { criterion: "Rhetorical fairness", question: "Does the author engage opposing views fairly?", redFlag: "Straw man, ad hominem, selective quotation" },
    { criterion: "Scope and limitations", question: "Does the author acknowledge limitations?", redFlag: "Overgeneralization, false universality" },
    { criterion: "Implications", question: "Are the implications fully explored?", redFlag: "Unexamined consequences, false causality" },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES
// =============================================================================

/**
 * weakStrongExpertExamples - Three-tier progression in critical writing.
 *
 * Examples showing critique sophistication:
 * - blunt criticism → concession + technical critique → litotic acknowledgment + 'compromet'
 * - vague 'erreurs' → 'présupposés contestables' → 'édifice' metaphor + 'fragiliser, voire réfuter'
 * - simple criticism → 'mériterait d'intégrer' → 's'inscrit résolument' + 'feint d'ignorer'
 * - simple judgment → 'gagnerait à être' → concessive + 'sinon... du moins'
 *
 * Each includes detailed analysis of the critique progression.
 */
export const weakStrongExpertExamples = [
  {
    weak: "Cet article n'est pas bon. Je ne suis pas d'accord avec l'auteur.",
    strong: "Cette contribution, bien qu'intéressante, présente des lacunes méthodologiques significatives.",
    expert: "Cette contribution, que nul ne saurait nier l'intérêt intrinsèque, présente, si l'on en examine attentivement les présupposés, des lacunes méthodologiques dont la portée, loin d'être circonscrite, compromet en définitive la validité des conclusions avancées.",
    analysis: "Progression: blunt criticism → concession + technical critique → litotic 'que nul ne saurait nier' + 'si l'on en examine' + 'loin d'être circonscrite' + 'compromet'.",
  },
  {
    weak: "Il y a des erreurs dans le raisonnement de l'auteur.",
    strong: "L'argumentation repose sur plusieurs présupposés contestables qui affaiblissent la conclusion.",
    expert: "L'édifice argumentatif, pour cohérent qu'il puisse paraître en première analyse, repose en définitive sur des présupposés que la confrontation aux données empiriques disponibles ne manque pas de fragiliser, voire de réfuter.",
    analysis: "Progression: vague 'erreurs' → 'présupposés contestables' + 'affaiblissent' → 'édifice' metaphor + concessive + 'confrontation' + litotic 'ne manque pas' + 'fragiliser, voire réfuter'.",
  },
  {
    weak: "L'auteur ne pense pas aux autres points de vue.",
    strong: "L'analyse mériterait d'intégrer les perspectives contradictoires.",
    expert: "Cette analyse, qui s'inscrit résolument dans une perspective univoque, mériterait, pour plus de intellectual rigueur, d'intégrer les voix discordantes que, pour l'heure, elle feint d'ignorer.",
    analysis: "Progression: simple criticism → 'mériterait d'intégrer' → 's'inscrit résolument' + 'univoque' + 'feint d'ignorer'.",
  },
  {
    weak: "Les exemples ne sont pas bons.",
    strong: "L'illustration empirique gagnerait à être plus diversifiée.",
    expert: "L'illustration empirique, pour éclairante qu'elle soit dans ses grandes lignes, gagnerait à être, sinon plus diversifiée géographiquement, du moins plus représentative des variations contextuelles.",
    analysis: "Progression: simple judgment → 'gagnerait à être' → concessive + litotic 'sinon... du moins' + specific recommendation.",
  },
];

// =============================================================================
// STRENGTHENING TECHNIQUES
// =============================================================================

/**
 * strengtheningTechniques - Four techniques for strengthening arguments.
 *
 * Techniques:
 * - Concession and reply: Bien que X soit vrai, il n'en demeure pas moins que Y (shows awareness)
 * - Nested qualification: Si X, ce qui impliquerait Y, à moins que Z (maximum nuance)
 * - Evidential hedging: Selon toute apparence, les données suggèrent... (scholarly caution)
 * - Scope limitation: Cette conclusion, valide dans le cas présent, ne saurait être généralisée (honesty)
 *
 * Each technique includes example and effect description.
 */
export const strengtheningTechniques = {
  title: "Techniques for Strengthening Arguments",
  techniques: [
    { technique: "Concession and reply", example: "Bien que X soit vrai, il n'en demeure pas moins que Y.", effect: "Shows awareness of complexity" },
    { technique: "Nested qualification", example: "Si X, ce qui impliquerait Y, à moins que Z...", effect: "Maximum nuance" },
    { technique: "Evidential hedging", example: "Selon toute apparence, les données suggèrent...", effect: "Scholarly caution" },
    { technique: "Scope limitation", example: "Cette conclusion, valide dans le cas présent, ne saurait être généralisée.", effect: "Intellectual honesty" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C2 Module 8.
 *
 * Question types:
 * - interpretation (1, 3, 5, 7, 9, 11, 13, 15): Identify logical fallacies
 * - transformation (2, 4, 6, 8, 10, 12, 14): Write sophisticated critiques
 *
 * Topics covered:
 * - Appeal to popularity (ad populum): 'Everyone knows that...'
 * - Slippery slope fallacy: 'If we don't act now, disaster will follow'
 * - Ad hominem attacks: Attacking author rather than argument
 * - Cherry-picking: Selective use of evidence
 * - Straw man: Oversimplifying opponent's argument
 * - False cause: Correlation vs. causation
 * - Hasty generalization: Broad conclusions from limited evidence
 * - Concession structures: 'Bien que... il n'en demeure pas moins'
 * - Litotic hedging: 'ne saurait', 'ne manque pas de'
 * - Scope limitation: 'Cette conclusion ne saurait être généralisée'
 * - Diplomatic critique: 'Cette contribution, que nul ne saurait nier'
 * - Nested concessives: 'pour ingénieux qu'il soit, et dont on ne saurait nier'
 * - Architectural metaphors: 'édifice argumentatif', 'failles'
 * - Expert openings: 'si l'on en pousse l'examen au-delà des apparences'
 * - Sophisticated closings: 'Nonobstant les réserves, pour fondées qu'elles soient'
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
    type: "interpretation",
    prompt: "Identify the logical fallacy: 'Everyone knows that...'",
    options: ["Appeal to authority", "Appeal to popularity", "False cause"],
    correct: 1,
    explanation: "'Everyone knows' is argumentum ad populum—appeal to popularity/belief.",
    nuance: "Common knowledge claims often mask lack of evidence.",
  },
  {
    id: 2,
    type: "transformation",
    prompt: "Transform into constructive critique:",
    context: "This article is wrong",
    options: [
      "Cet article est faux.",
      "Cette contribution présente des lacunes méthodologiques.",
      "Cette contribution, que nul ne saurait nier l'intérêt, présente des lacunes dont la portée compromet la validité des conclusions.",
    ],
    correct: 2,
    explanation: "Maximum diplomacy: litotic acknowledgment + specific critique + consequence evaluation.",
    nuance: "Expert critique concedes before criticizing.",
  },
  {
    id: 3,
    type: "interpretation",
    prompt: "What's wrong with: 'If we don't act now, disaster will follow'",
    options: ["False dichotomy", "Slippery slope", "Circular reasoning"],
    correct: 1,
    explanation: "Slippery slope assumes one step inevitably leads to extreme consequences.",
    nuance: "Slippery slopes ignore intermediate possibilities.",
  },
  {
    id: 4,
    type: "transformation",
    prompt: "Suggest improvement diplomatically:",
    context: "The author ignores other perspectives",
    options: [
      "L'auteur ignore les autres perspectives.",
      "L'analyse mériterait d'intégrer les perspectives contradictoires.",
      "Cette analyse, résolument univoque, mériterait d'intégrer les voix discordantes qu'elle feint d'ignorer.",
    ],
    correct: 2,
    explanation: "Evaluative 'résolument univoque' + 'mériterait' + 'feint d'ignorer'.",
    nuance: "Diplomatic critique uses evaluation verbs.",
  },
  {
    id: 5,
    type: "interpretation",
    prompt: "Identify rhetorical weakness: Attacking the author rather than the argument",
    options: ["Straw man", "Ad hominem", "False analogy"],
    correct: 1,
    explanation: "Ad hominem attacks the person instead of addressing the argument.",
    nuance: "Personal attacks indicate inability to address the argument.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Strengthen with concession:",
    context: "This approach is best",
    options: [
      "Cette approche est la meilleure.",
      "Bien qu'imparfaite, cette approche reste la plus adéquate.",
      "Cette approche, pour perfectible qu'elle soit, demeure, en l'état actuel des connaissances, l'option la plus conforme à nos objectifs.",
    ],
    correct: 2,
    explanation: "Concessive + litotic 'perfectible' + temporal 'en l'état actuel' + evaluative.",
    nuance: "Strong claims benefit from acknowledging limitations.",
  },
  {
    id: 7,
    type: "interpretation",
    prompt: "What's the problem with selective use of evidence?",
    options: ["Cherry-picking", "Straw man", "Circular reasoning"],
    correct: 0,
    explanation: "Cherry-picking selects only favorable evidence while ignoring contrary data.",
    nuance: "Cherry-picking misrepresents the full picture.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Write sophisticated limitation acknowledgment:",
    context: "Our findings are limited",
    options: [
      "Nos résultats sont limités.",
      "Cette conclusion ne saurait être généralisée au-delà du cas étudié.",
      "Cette conclusion, valide dans le cas présent et eu égard aux contraintes méthodologiques évoquées, ne saurait, sauf à en vérifier la pertinence, être généralisée à des contextes substantiellement différents.",
    ],
    correct: 2,
    explanation: "Specific scope + evidential + litotic 'ne saurait' + conditional 'sauf à'.",
    nuance: "Sophisticated limitations show methodological awareness.",
  },
  {
    id: 9,
    type: "interpretation",
    prompt: "Identify: Oversimplifying opponent's argument to attack it",
    options: ["Straw man", "Red herring", "False dilemma"],
    correct: 0,
    explanation: "Straw man distorts opponent's position to make it easier to attack.",
    nuance: "Straw men avoid engaging the strongest version of opposing views.",
  },
  {
    id: 10,
    type: "transformation",
    prompt: "Suggest strengthening through evidence:",
    context: "More data would help",
    options: [
      "Il faudrait plus de données.",
      "L'argument gagnerait à être étayé par des données empiriques complémentaires.",
      "L'argument, pour convaincant qu'il puisse paraître, gagnerait à être étayé par des données empiriques dont la collecte, certes coûteuse, ne manquerait pas de consolider la portée des conclusions avancées.",
    ],
    correct: 2,
    explanation: "Concessive + litotic 'gagnerait' + acknowledgment of cost + litotic benefit.",
    nuance: "Recommendations should acknowledge practical constraints.",
  },
  {
    id: 11,
    type: "interpretation",
    prompt: "What's problematic about assuming A causes B because they occur together?",
    options: ["False cause", "False analogy", "Slippery slope"],
    correct: 0,
    explanation: "Correlation does not imply causation—classic false cause fallacy.",
    nuance: "Temporal sequence and correlation don't establish causation.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Write expert-level critique opening:",
    context: "This argument has merit but problems",
    options: [
      "Cet argument a du mérite mais des problèmes.",
      "Cet argument, que son ingéniosité ne saurait faire douter, présente des failles.",
      "L'argument, pour ingénieux qu'il soit, et dont on ne saurait nier la cohérence apparente, présente, si l'on en pousse l'examen au-delà des apparences, des failles dont la portée compromet l'édifice dans son ensemble.",
    ],
    correct: 2,
    explanation: "Stacked concessives + litotic acknowledgment + 'si l'on en pousse' + architectural metaphor.",
    nuance: "Expert critique opens with multiple layers of concession.",
  },
  {
    id: 13,
    type: "interpretation",
    prompt: "Identify: Drawing broad conclusions from limited evidence",
    options: ["Hasty generalization", "False cause", "Begging the question"],
    correct: 0,
    explanation: "Hasty generalization draws broad conclusions from insufficient evidence.",
    nuance: "Sample size and representativeness matter.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Write sophisticated closing for critique:",
    context: "Despite flaws, worth considering",
    options: [
      "Malgré les défauts, ça vaut le coup.",
      "Nonobstant les réserves émises, cette contribution mérite d'être prise en considération.",
      "Nonobstant les réserves, pour fondées qu'elles soient, émises au cours de cette analyse, cette contribution, qui n'en demeure pas moins stimulante, mérite, et c'est là le paradoxe, d'être prise en considération par tous ceux que la question intéresse.",
    ],
    correct: 2,
    explanation: "'Nonobstant' + nested concessive + 'qui n'en demeure pas moins' + paradox framing.",
    nuance: "Sophisticated closings balance criticism with recognition of value.",
  },
  {
    id: 15,
    type: "interpretation",
    prompt: "Which demonstrates best critical analysis?",
    options: [
      "C'est nul, je n'aime pas.",
      "Cette contribution, que nul ne saurait nier l'intérêt, présente des lacunes méthodologiques dont la portée compromet la validité des conclusions.",
    ],
    correct: 1,
    explanation: "Litotic acknowledgment + specific critique + consequence evaluation.",
    nuance: "Expert critique is specific, balanced, and constructive.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on identifying logical fallacies
 *   (straw man, ad hominem, slippery slope) and distinguishing valid from fallacious
 * - 8-11/15: "Strong performance" - encourages refining constructive critique
 *   writing and using concession structures
 * - 12-15/15: "Excellent critical mastery" - celebrates sophisticated critical
 *   thinking with rigorous argument evaluation and nuanced critiques
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Critical analysis requires practice. Focus on identifying logical fallacies like straw man and ad hominem.",
      focus: "Practice distinguishing between valid arguments and fallacious reasoning.",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your critical skills are developing well. Continue refining your ability to write constructive critiques.",
      focus: "Work on using concession structures in critique writing.",
    };
  }
  return {
    title: "Excellent critical mastery",
    message: "Your French demonstrates sophisticated critical thinking. You evaluate arguments rigorously and write nuanced, constructive critiques.",
    focus: "Continue developing your ability to identify subtle rhetorical strategies.",
  };
}
