/**
 * C2 Module 9 - Advanced Writing Mastery
 * ========================================
 *
 * This file contains all lesson data for C2 Module 9, teaching mastery of
 * structured essays, logical progression, and style refinement. Students learn
 * to create prose at the highest level of clarity and sophistication.
 *
 * **Module Content:**
 * - Introduction: The architecture of prose, style and substance
 * - C2 Essay Structure: 4 sections (Introduction, Development, Concession, Conclusion)
 * - Weak/Strong/Expert examples: 3-tier progression in essay writing sophistication
 * - Style Refinement Techniques: 4 techniques (varied openings, nominalization, etc.)
 * - 15 practice quiz questions (transformation and precision types)
 *
 * **C2 Essay Structure:**
 * 1. Introduction: Hook/engagement, Context, Thesis statement, Roadmap
 * 2. Development: Topic sentence (claim), Evidence, Analysis, Transition
 * 3. Concession: Acknowledgment of opposing view, Limited validity, Rebuttal
 * 4. Conclusion: Thesis restatement, Synthesis, Broader implications
 *
 * **Style Refinement Techniques:**
 * - Varied sentence openings: Cette... Malgré... Force... (creates rhythm)
 * - Nominalization density: Sa décision de partir... (adds formality)
 * - Embedded evaluation: revêt une importance capitale (precise weight)
 * - Cumulative syntax: participial absolute + adjectives + passive (creates flow)
 *
 * **Key Writing Concepts:**
 * - Hook/engagement: 'À l'aube de ce nouveau millénaire...'
 * - Thesis statement: Clear claim with roadmap
 * - Concession structure: 'Force est d'admettre... Toutefois...'
 * - Conclusion synthesis: 'Ces éléments étant posés...'
 * - Temporal structuring: 'Dans un second temps' (not enumeration)
 * - Sophisticated hedging: 'Selon toute apparence...'
 * - Litotic limitation: 'ne saurait être généralisée'
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to writing mastery
 * 4. essayStructure - 4-part C2 essay structure with examples
 * 5. weakStrongExpertExamples - 3-tier writing progression
 * 6. styleRefinement - 4 style refinement techniques
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
 * 1. intro - Introduction to prose architecture
 * 2. structure - C2 essay structure
 * 3. progression - Logical progression techniques
 * 4. style - Style and refinement
 * 5. refinement - Advanced refinement techniques
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "structure", "progression", "style", "refinement", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Advanced Writing Mastery",
  /** Brief description of module content */
  subtitle: "Master structured essays, logical progression, and style refinement. Create prose at the highest level of clarity and sophistication.",
  /** Module number in C2 series */
  moduleNumber: 9,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to advanced writing mastery.
 *
 * Content:
 * - The Architecture of Prose: Structural engineering of essays with clear theses
 * - Style and Substance: Varying structures for rhythm, vocabulary for precision
 */
export const introSections = [
  {
    title: "The Architecture of Prose",
    content: "At C2, writing is structural engineering. You construct essays with clear theses, logical development, and elegant conclusions. Every paragraph serves the whole; every sentence advances the argument. Your prose is both clear and sophisticated—accessible without being simplistic.",
  },
  {
    title: "Style and Substance",
    content: "Sophisticated style serves substance. At C2, you vary sentence structures for rhythm, deploy vocabulary for precision, and use rhetorical devices for emphasis—all while maintaining clarity. Your style enhances your message without obscuring it.",
  },
];

// =============================================================================
// C2 ESSAY STRUCTURE
// =============================================================================

/**
 * essayStructure - Four-part C2 essay structure with components and examples.
 *
 * Sections:
 * 1. Introduction: Hook/engagement, Context, Thesis statement, Roadmap
 *    Example: "À l'aube de ce nouveau millénaire, la question de X revêt une acuité particulière."
 * 2. Development: Topic sentence (claim), Evidence, Analysis, Transition
 *    Example: "Premièrement, X présente l'avantage indéniable de..."
 * 3. Concession: Acknowledgment, Limited validity, Rebuttal
 *    Example: "Force est d'admettre que... Toutefois..."
 * 4. Conclusion: Thesis restatement, Synthesis, Broader implications
 *    Example: "Ces éléments étant posés, il apparaît que..."
 *
 * Each section includes components and full example sentence.
 */
export const essayStructure = {
  title: "The C2 Essay Structure",
  sections: [
    { section: "Introduction", components: ["Hook/engagement", "Context", "Thesis statement", "Roadmap"], example: "À l'aube de ce nouveau millénaire, la question de X revêt une acuité particulière. Je soutiens que Y, et ce pour trois raisons essentielles." },
    { section: "Development", components: ["Topic sentence (claim)", "Evidence", "Analysis", "Transition"], example: "Premièrement, X présente l'avantage indéniable de... Les données disponibles montrent que... Il s'ensuit que..." },
    { section: "Concession", components: ["Acknowledgment of opposing view", "Limited validity", "Rebuttal/return to thesis"], example: "Force est d'admettre que... Toutefois, cette objection ne résiste pas à l'examen de..." },
    { section: "Conclusion", components: ["Thesis restatement", "Synthesis of main points", "Broader implications/future directions"], example: "Ces éléments étant posés, il apparaît que... Cette réflexion ouvre des perspectives pour..." },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES
// =============================================================================

/**
 * weakStrongExpertExamples - Three-tier progression in essay writing sophistication.
 *
 * Examples showing writing sophistication:
 * - vague topic → 'urgence incontestable' → 'à l'aube' + litotic + 'commande' + philosophical
 * - simple enumeration → 'considérations déterminantes' → 'impératifs' + 'commandent' + urgency
 * - blunt dismissal → elegant concession → litotic acknowledgment + 'sauf à' + specific critique
 * - simple closing → 'ces éléments étant posés' → 'conduisent inéluctablement' + litotic expansion
 *
 * Each includes detailed analysis of the writing progression.
 */
export const weakStrongExpertExamples = [
  {
    weak: "Je vais parler de l'environnement. C'est important.",
    strong: "L'urgence climatique, désormais incontestable, impose une réévaluation fondamentale de nos modèles de développement.",
    expert: "À l'aube de ce nouveau millénaire, la crise climatique, que nul ne saurait plus éluder en toute conscience, commande une réévaluation, non pas seulement technique mais anthropologique, des rapports que nous entretenons avec notre milieu.",
    analysis: "Progression: vague topic → 'urgence incontestable' + 'réévaluation fondamentale' → 'à l'aube' + litotic 'que nul ne saurait' + 'commande' + 'non pas... mais' + philosophical depth.",
  },
  {
    weak: "Il y a trois raisons. Premièrement... Deuxièmement... Troisièmement...",
    strong: "Trois considérations déterminantes, qui devraient guider notre réflexion collective, méritent d'être soulignées.",
    expert: "Trois impératifs, dont la portée dépasse le seul cadre économique pour toucher à des considérations éthiques fondamentales, commandent, et ce avec une urgence qui ne souffre aucun retard, une attention toute particulière.",
    analysis: "Progression: simple enumeration → 'considérations déterminantes' + 'réflexion collective' → 'impératifs' + relative expansion + 'commandent' + temporal urgency.",
  },
  {
    weak: "D'autres pensent différemment mais ils ont tort.",
    strong: "Force est d'admettre la cohérence de cette analyse alternative. Il n'en demeure pas moins que...",
    expert: "Force est de reconnaître, et c'est là un point que nul ne saurait nier, la cohérence interne de cette construction théorique alternative. Il n'en demeure pas moins, sauf à en minorer la portée, que son application empirique soulève des questionnements auxquels elle ne saurait, en l'état, apporter de réponse pleinement satisfaisante.",
    analysis: "Progression: blunt dismissal → elegant concession → litotic acknowledgment + 'sauf à' + specific critique + litotic 'ne saurait'.",
  },
  {
    weak: "En conclusion, j'ai montré que j'avais raison. Merci.",
    strong: "Ces éléments étant posés, il apparaît manifeste que cette voie s'impose comme l'option la plus judicieuse.",
    expert: "Ces considérations, que nous avons tenté d'exposer avec la rigueur requise, conduisent inéluctablement à la conclusion que cette voie, loin de n'être qu'une simple alternative parmi d'autres, s'impose avec une évidence qui, loin de s'imposer brutalement, se révèle au terme d'un raisonnement progressivement élaboré.",
    analysis: "Progression: simple closing → 'ces éléments étant posés' + 'apparaît manifeste' → 'conduisent inéluctablement' + litotic expansion + progressive revelation.",
  },
];

// =============================================================================
// STYLE REFINEMENT TECHNIQUES
// =============================================================================

/**
 * styleRefinement - Four techniques for refining academic writing style.
 *
 * Techniques:
 * - Varied sentence openings: Cette... Malgré... Force... (creates rhythm and interest)
 * - Nominalization density: Sa décision de partir... (adds formality and abstraction)
 * - Embedded evaluation: Cette dimension revêt une importance capitale (precise weight)
 * - Cumulative syntax: Participial absolute + adjectives + passive (creates density and flow)
 *
 * Each technique includes weak example, strong improvement, and effect description.
 */
export const styleRefinement = {
  title: "Style Refinement Techniques",
  techniques: [
    { technique: "Varied sentence openings", weak: "Il... Il... Il...", strong: "Cette... Malgré... Force...", effect: "Creates rhythm and interest" },
    { technique: "Nominalization density", weak: "Il a décidé de partir.", strong: "Sa décision de partir...", effect: "Adds formality and abstraction" },
    { technique: "Embedded evaluation", weak: "C'est important.", strong: "Cette dimension revêt une importance capitale.", effect: "Precise evaluative weight" },
    { technique: "Cumulative syntax", weak: "Il pleut. Le match est annulé.", strong: "Les précipitations, drues et persistantes, ayant rendu le terrain impraticable...", effect: "Creates density and flow" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C2 Module 9.
 *
 * Question types:
 * - transformation (1-4, 6-15): Essay writing transformations
 * - precision (5): Best practice identification
 *
 * Topics covered:
 * - Sophisticated essay opening with temporal framing ('À l'aube')
 * - Elegant roadmap with 'impératifs' and relative expansion
 * - Sophisticated concession with 'Force est de reconnaître'
 * - Sophisticated conclusion with 'conduisent inéluctablement'
 * - Varied sentence openings (demonstrative, concessive, noun)
 * - Nominalization density ('Sa décision de partir')
 * - Embedded evaluation ('revêt une importance capitale')
 * - Cumulative syntax (participial absolute + adjectives + passive)
 * - Temporal structuring ('Dans un second temps' vs enumeration)
 * - Sophisticated transitions (summarizing participle + rhetorical question)
 * - Elevated evidence presentation ('travaux disponibles corroborent')
 * - Sophisticated hedging ('Selon toute apparence')
 * - Scope limitation with litotic 'ne saurait'
 * - Maximum sophistication with stacked concessives
 * - Expert essay opening combining all elements
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
    type: "transformation",
    prompt: "Create sophisticated essay opening:",
    context: "Essay on climate change",
    options: [
      "Je vais parler du changement climatique.",
      "L'urgence climatique impose une réévaluation de nos modèles.",
      "À l'aube de ce millénaire, la crise climatique commande une réévaluation anthropologique de nos rapports au milieu.",
    ],
    correct: 2,
    explanation: "'À l'aube' + 'commande' + 'anthropologique' + 'rapports au milieu' = sophisticated.",
    nuance: "Strong openings combine temporal framing with conceptual depth.",
  },
  {
    id: 2,
    type: "transformation",
    prompt: "Create elegant roadmap:",
    context: "Three-part essay",
    options: [
      "Il y a trois points.",
      "Trois considérations méritent attention.",
      "Trois impératifs, dont la portée dépasse le cadre économique, commandent une attention particulière.",
    ],
    correct: 2,
    explanation: "'Impératifs' + relative expansion + 'commandent' + evaluative.",
    nuance: "Roadmaps establish authority and structure.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Write sophisticated concession:",
    context: "Acknowledging opposing view",
    options: [
      "D'autres pensent différemment mais ont tort.",
      "Force est d'admettre la cohérence de cette analyse. Toutefois...",
      "Force est de reconnaître la cohérence interne de cette construction. Il n'en demeure pas moins que son application soulève des questionnements.",
    ],
    correct: 2,
    explanation: "Maximum: 'construction' + 'il n'en demeure pas moins' + specific critique.",
    nuance: "Concessions should acknowledge before refuting.",
  },
  {
    id: 4,
    type: "transformation",
    prompt: "Create sophisticated conclusion:",
    context: "Summarizing argument",
    options: [
      "En conclusion, j'ai raison.",
      "Ces éléments étant posés, il apparaît que cette voie s'impose.",
      "Ces considérations conduisent inéluctablement à la conclusion que cette voie, loin de n'être qu'une alternative, s'impose avec évidence.",
    ],
    correct: 2,
    explanation: "'Conduisent inéluctablement' + litotic 'loin de' + 's'impose avec évidence'.",
    nuance: "Conclusions synthesize with authority.",
  },
  {
    id: 5,
    type: "precision",
    prompt: "Best for varied sentence openings?",
    options: [
      "Il... Il... Il...",
      "Cette... Malgré... Force...",
    ],
    correct: 1,
    explanation: "Varied openings (demonstrative, concessive, noun) create rhythm.",
    nuance: "Variety prevents monotony.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Apply nominalization:",
    context: "He decided to leave",
    options: [
      "Il a décidé de partir.",
      "Sa décision de partir...",
    ],
    correct: 1,
    explanation: "Nominalization adds formality and abstraction.",
    nuance: "Nominalization is preferred in academic writing.",
  },
  {
    id: 7,
    type: "transformation",
    prompt: "Add embedded evaluation:",
    context: "This is important",
    options: [
      "C'est important.",
      "Cette dimension revêt une importance capitale.",
    ],
    correct: 1,
    explanation: "Nominalization + 'revêt' + evaluative 'capitale' = sophisticated.",
    nuance: "Evaluative verbs add precision.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Create cumulative syntax:",
    context: "Rain caused cancellation",
    options: [
      "Il pleut. Le match est annulé.",
      "Les précipitations, drues et persistantes, ayant rendu le terrain impraticable, la rencontre fut annulée.",
    ],
    correct: 1,
    explanation: "Participial absolute + adjectives + passive = cumulative elegance.",
    nuance: "Cumulative syntax creates density and flow.",
  },
  {
    id: 9,
    type: "transformation",
    prompt: "Transform paragraph opening:",
    context: "Second main point",
    options: [
      "Deuxièmement...",
      "Dans un second temps...",
    ],
    correct: 1,
    explanation: "Temporal structuring is more elegant than enumeration.",
    nuance: "Formal French prefers temporal markers.",
  },
  {
    id: 10,
    type: "transformation",
    prompt: "Create sophisticated transition:",
    context: "From problem to solution",
    options: [
      "Maintenant, la solution.",
      "Face à ces constats, quelles réponses apporter ?",
    ],
    correct: 1,
    explanation: "Summarizing participle + rhetorical question engages reader.",
    nuance: "Transitions should echo previous while opening new direction.",
  },
  {
    id: 11,
    type: "transformation",
    prompt: "Elevate evidence presentation:",
    context: "Studies show this",
    options: [
      "Les études montrent ceci.",
      "Les travaux disponibles corroborent cette hypothèse.",
    ],
    correct: 1,
    explanation: "'Travaux' + 'corroborent' + 'hypothèse' = academic register.",
    nuance: "Evidence presentation establishes scholarly tone.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Create elegant hedging:",
    context: "This appears to be true",
    options: [
      "Cela semble être vrai.",
      "Selon toute apparence, les données suggèrent...",
    ],
    correct: 1,
    explanation: "Evidential 'selon toute apparence' + 'données suggèrent' = scholarly.",
    nuance: "Hedging shows scholarly caution.",
  },
  {
    id: 13,
    type: "transformation",
    prompt: "Write sophisticated limitation:",
    context: "Our findings are limited",
    options: [
      "Nos résultats sont limités.",
      "Cette conclusion, valide dans le cas présent, ne saurait être généralisée au-delà du contexte étudié.",
    ],
    correct: 1,
    explanation: "Specific scope + litotic 'ne saurait' + precise limitation.",
    nuance: "Limitations show intellectual honesty.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Create maximum sophistication:",
    context: "This view is correct",
    options: [
      "Cette vue est correcte.",
      "Cette perspective, pour contestable qu'elle puisse paraître en première analyse, demeure, en définitive et eu égard aux éléments en notre possession, l'interprétation la plus conforme aux faits.",
    ],
    correct: 1,
    explanation: "Concessive + temporal 'demeure' + evidential + evaluative = maximum.",
    nuance: "Maximum sophistication stacks qualifiers without obscuring meaning.",
  },
  {
    id: 15,
    type: "transformation",
    prompt: "Final challenge - expert essay opening:",
    context: "Any complex topic",
    options: [
      "Je vais parler de ce sujet.",
      "À l'aube de ce nouveau millénaire, la question de X revêt une acuité particulière. Je soutiens que Y, et ce pour trois raisons essentielles que nous nous proposons d'examiner avec la rigueur requise.",
    ],
    correct: 1,
    explanation: "Temporal framing + 'revêt acuité' + thesis + roadmap + 'rigueur requise'.",
    nuance: "Expert openings combine all sophisticated elements.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on structural control,
 *   clear thesis statements, and logical progression
 * - 8-11/15: "Strong performance" - encourages refining transitions and conclusions,
 *   working on cumulative syntax and sophisticated hedging
 * - 12-15/15: "Excellent writing mastery" - celebrates near-native elegance with
 *   balance of clarity and sophistication, accessible yet intellectually demanding
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Advanced writing requires structural control. Focus on clear thesis statements and logical progression.",
      focus: "Practice using nominalization and varied sentence openings.",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your writing shows developing sophistication. Continue refining your transitions and conclusions.",
      focus: "Work on cumulative syntax and sophisticated hedging.",
    };
  }
  return {
    title: "Excellent writing mastery",
    message: "Your prose demonstrates near-native elegance. You balance clarity with sophistication, creating text that is both accessible and intellectually demanding.",
    focus: "Continue developing your distinctive written voice.",
  };
}
