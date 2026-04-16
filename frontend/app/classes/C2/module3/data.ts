/**
 * C2 Module 3 - Advanced Discourse & Flow
 * ==========================================
 *
 * This file contains all lesson data for C2 Module 3, teaching mastery of
 * sophisticated connectors, rhetorical flow, and argument architecture.
 * Students learn to create prose that guides readers with invisible elegance.
 *
 * **Module Content:**
 * - Introduction: The architecture of flow, invisible craft
 * - C2 Connector Toolkit: 6 categories of sophisticated connectors
 *   (Consequence, Concession, Addition, Opposition, Exemplification, Temporal)
 * - Weak/Strong/Expert examples: 3-tier progression in discourse sophistication
 * - Argument Architecture: 4 structural patterns (Thesis-Antithesis-Synthesis, etc.)
 * - 15 practice quiz questions (rhetoric, transformation, interpretation types)
 *
 * **Key Concepts:**
 * - Sophisticated connectors: dès lors, partant, de surcroît, qui plus est
 * - Concession formulas: toutefois, néanmoins, il n'en demeure pas moins que
 * - Exemplification: en l'occurrence, à titre illustratif, à titre purement indicatif
 * - Temporal structuring: dans un premier temps, en définitive, à terme
 * - Nested concessions: Maximum nuance through layered qualification
 * - Crescendo structures: Building persuasive intensity (Non pas X, mais Y, et surtout Z)
 * - Argument patterns: Classical dialectical structures, concessive openings
 * - Discourse invisibility: Best markers guide without drawing attention
 *
 * **Six Connector Categories:**
 * 1. Consequence (elevated): dès lors, partant, de ce fait, c'est pourquoi
 * 2. Concession (nuanced): toutefois, néanmoins, il n'en demeure pas moins que
 * 3. Addition (sophisticated): de surcroît, qui plus est, par ailleurs
 * 4. Opposition (subtle): or, seulement, tandis que, en revanche
 * 5. Exemplification (precise): ainsi, notamment, en l'occurrence
 * 6. Temporal structuring: dans un premier temps, ensuite, en définitive
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to discourse architecture
 * 4. sophisticatedConnectors - Six categories of C2 connectors
 * 5. weakStrongExpertExamples - 3-tier discourse progression examples
 * 6. argumentStructures - Four argument architecture patterns
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
 * 1. intro - Introduction to discourse architecture
 * 2. connectors - Sophisticated connector toolkit
 * 3. flow - Rhetorical flow techniques
 * 4. cohesion - Textual cohesion strategies
 * 5. argument-structure - Argument architecture patterns
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "connectors", "flow", "cohesion", "argument-structure", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Advanced Discourse & Flow",
  /** Brief description of module content */
  subtitle: "Master sophisticated connectors, rhetorical flow, and argument architecture. Create prose that guides readers with invisible elegance.",
  /** Module number in C2 series */
  moduleNumber: 3,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to advanced discourse and flow.
 *
 * Content:
 * - The Architecture of Flow: Seamless, purposeful writing that carries readers
 * - Invisible Craft: Sophisticated connectors (dès lors, en l'occurrence, partant)
 *   deployed with native-like naturalness
 */
export const introSections = [
  {
    title: "The Architecture of Flow",
    content: "At C2, your writing flows like a river—seamless, purposeful, carrying the reader effortlessly. This requires mastery beyond basic connectors: knowing when to use 'dès lors' versus 'partant', 'cependant' versus 'toutefois', and how to create rhythm through structural variation.",
  },
  {
    title: "Invisible Craft",
    content: "The best discourse markers are invisible. They guide without drawing attention to themselves. At C2, you deploy sophisticated connectors (dès lors, en l'occurrence, partant, de surcroît) with the naturalness of a native writer, creating logical pathways that feel inevitable.",
  },
];

// =============================================================================
// SOPHISTICATED CONNECTORS
// =============================================================================

/**
 * sophisticatedConnectors - Six categories of C2-level connectors.
 *
 * Categories:
 * - Consequence (elevated): dès lors, partant, de ce fait, c'est pourquoi, aussi
 * - Concession (nuanced): toutefois, néanmoins, cependant, il n'en demeure pas moins que
 * - Addition (sophisticated): de surcroît, qui plus est, par ailleurs, en outre
 * - Opposition (subtle): or, seulement, tandis que, en revanche, à l'inverse
 * - Exemplification (precise): ainsi, notamment, en l'occurrence, à titre illustratif
 * - Temporal structuring: dans un premier temps, ensuite, en définitive, à terme
 *
 * Each category includes characteristic connectors and example sentences.
 */
export const sophisticatedConnectors = {
  title: "C2 Connector Toolkit",
  categories: [
    { category: "Consequence (elevated)", connectors: ["dès lors", "partant", "de ce fait", "c'est pourquoi", "aussi"], example: "Dès lors, une révision s'impose." },
    { category: "Concession (nuanced)", connectors: ["toutefois", "néanmoins", "cependant", "il n'en demeure pas moins que", "quant à"], example: "Il n'en demeure pas moins que des doutes subsistent." },
    { category: "Addition (sophisticated)", connectors: ["de surcroît", "qui plus est", "par ailleurs", "en outre", "en l'espèce"], example: "Qui plus est, cette solution s'avère économique." },
    { category: "Opposition (subtle)", connectors: ["or", "seulement", "tandis que", "en revanche", "à l'inverse"], example: "Or, cette hypothèse ne résiste pas à l'examen." },
    { category: "Exemplification (precise)", connectors: ["ainsi", "notamment", "en l'occurrence", "à titre illustratif", "ce faisant"], example: "En l'occurrence, le cas de la France mérite attention." },
    { category: "Temporal structuring", connectors: ["dans un premier temps", "ensuite", "en définitive", "à terme", "à l'évidence"], example: "Dans un premier temps, examinons les présupposés." },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES
// =============================================================================

/**
 * weakStrongExpertExamples - Three-tier progression in discourse sophistication.
 *
 * Examples showing connector sophistication:
 * - Addition: 'et aussi' → 'qui plus est' → integrated relative + enhanced evaluation
 * - Concession: 'mais' → 'toutefois' + 'nécessite d'être nuancée' → concessive embedding + litotic negation
 * - Consequence: 'donc' → 'dès lors' + 's'avère impératif' → literary 'partant' + personified 's'impose'
 * - Exemplification: 'par exemple' → 'à titre illustratif' → hedged + technical 'paradigme révélateur'
 *
 * Each includes detailed analysis of the discourse progression.
 */
export const weakStrongExpertExamples = [
  {
    weak: "C'est une bonne idée. Et aussi, ça coûte moins cher.",
    strong: "Cette approche présente l'avantage d'être stratégiquement pertinente. Qui plus est, elle s'avère économiquement avantageuse.",
    expert: "Cette approche, stratégiquement indiscutable, présente l'avantage déterminant, qui plus est, d'être économiquement pertinente.",
    analysis: "Progression: basic addition → sophisticated connector 'qui plus est' → integrated relative + enhanced evaluation.",
  },
  {
    weak: "Mais il y a un problème avec cette théorie.",
    strong: "Cette analyse nécessite toutefois d'être nuancée : une difficulté majeure demeure.",
    expert: "Cette construction théorique, toutefois séduisante en première analyse, ne saurait occulter les contradictions internes qui la fragilisent structurellement.",
    analysis: "Progression: basic 'mais' → 'toutefois' + 'nécessite d'être nuancée' → concessive embedding + litotic negation + interpretive conclusion.",
  },
  {
    weak: "Donc nous devons faire ça maintenant.",
    strong: "Dès lors, il s'avère impératif de procéder sans délai.",
    expert: "Partant de ce constat, il apparaît manifeste que cette voie s'impose avec une urgence qui ne souffre aucun retard.",
    analysis: "Progression: basic 'donc' → formal 'dès lors' + 's'avère impératif' → literary 'partant' + 'apparaît manifeste' + personified 's'impose'.",
  },
  {
    weak: "Par exemple, en France c'est comme ça.",
    strong: "À titre illustratif, le cas français mérite une attention particulière.",
    expert: "À titre purement indicatif, et sans présumer de sa généralisation, le cas français offre un paradigme révélateur des dynamiques en jeu.",
    analysis: "Progression: basic 'par exemple' → formal 'à titre illustratif' → hedged 'à titre purement indicatif' + 'sans présumer' + technical 'paradigme révélateur'.",
  },
];

// =============================================================================
// ARGUMENT ARCHITECTURE
// =============================================================================

/**
 * argumentStructures - Four sophisticated argument patterns.
 *
 * Patterns:
 * - Thesis-Antithesis-Synthesis: Classical dialectical structure
 * - Concessive Opening: Shows balanced consideration ('Force est d'admettre... Toutefois')
 * - Crescendo: Building intensity ('Non pas X, mais Y, et surtout Z')
 * - Nested Concession: Maximum nuance through layered qualification
 *
 * Each pattern includes example and effect description.
 */
export const argumentStructures = {
  title: "Argument Architecture",
  structures: [
    { pattern: "Thesis-Antithesis-Synthesis", example: "Je soutiens que... Certes, on objectera que... Il n'en demeure pas moins que...", effect: "Classical dialectical structure" },
    { pattern: "Concessive Opening", example: "Force est d'admettre que... Toutefois...", effect: "Shows balanced consideration" },
    { pattern: "Crescendo", example: "Non pas X, mais Y, et surtout Z.", effect: "Building intensity" },
    { pattern: "Nested Concession", example: "Bien que... il n'en demeure pas moins que..., sauf à considérer que...", effect: "Maximum nuance" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C2 Module 3.
 *
 * Question types:
 * - rhetoric (1, 5, 7, 10, 12, 14, 15): Connector selection and discourse analysis
 * - transformation (2, 4, 6, 8, 11, 13): Transform to sophisticated discourse
 * - interpretation (3, 9): Interpret connector functions and structures
 *
 * Topics covered:
 * - Sophisticated consequence markers ('dès lors' vs 'alors' vs 'du coup')
 * - Concessive embedding with litotic negation
 * - Formal exemplification ('en l'occurrence' for specificity)
 * - Sophisticated addition ('qui plus est', 'de surcroît')
 * - Nested concessions ('certes séduisante, nécessite toutefois')
 * - Temporal structuring with formal verbs ('esquisserons', 'procéderons')
 * - Literary contrast marker 'or' with sophisticated refutation
 * - Hedged exemplification ('à titre purement indicatif')
 * - Literary concession formula ('il n'en demeure pas moins que')
 * - Crescendo structures for persuasive intensity
 * - Maximum nested concessions (concessive + relative + 'sauf à')
 * - Temporal vs enumerative structuring preference
 * - Literary addition ('qui plus est' vs 'de surcroît')
 * - Connector function interpretation ('partant' for consequence)
 * - Sophisticated connector chains ('dès lors qu'il est établi que')
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
    type: "rhetoric",
    prompt: "Most sophisticated alternative to 'donc' for formal academic writing:",
    options: ["alors", "dès lors", "du coup"],
    correct: 1,
    explanation: "'Dès lors' is the most formal and sophisticated consequence marker; 'alors' is neutral; 'du coup' is informal.",
    nuance: "Dès lors creates logical consequence from premises.",
  },
  {
    id: 2,
    type: "transformation",
    prompt: "Transform to sophisticated academic flow:",
    context: "But there are problems with this view",
    options: [
      "Mais il y a des problèmes avec cette vue.",
      "Cependant, cette perspective soulève des questions.",
      "Cette construction théorique, séduisante en première analyse, ne saurait occulter les contradictions internes.",
    ],
    correct: 2,
    explanation: "Concessive relative + litotic 'ne saurait occulter' + technical 'contradictions internes'.",
    nuance: "Sophisticated flow uses embedding and understatement.",
  },
  {
    id: 3,
    type: "rhetoric",
    prompt: "Best for introducing specific example in formal context:",
    options: ["par exemple", "en l'occurrence", "comme ça"],
    correct: 1,
    explanation: "'En l'occurrence' is formal and precise for 'in this specific case'.",
    nuance: "En l'occurrence demonstrates attention to specificity.",
  },
  {
    id: 4,
    type: "transformation",
    prompt: "Elevate: 'And also, it's cheaper'",
    options: [
      "Et aussi, c'est moins cher.",
      "De surcroît, cette solution présente un avantage économique.",
      "Qui plus est, cette approche s'avère indiscutablement pertinente sur le plan économique.",
    ],
    correct: 2,
    explanation: "'Qui plus est' + 'indiscutablement pertinente' + 'sur le plan économique' = sophisticated.",
    nuance: "De surcroît and qui plus are formal additions.",
  },
  {
    id: 5,
    type: "rhetoric",
    prompt: "Which creates most sophisticated concessive structure?",
    options: [
      "Mais je ne suis pas d'accord.",
      "Toutefois, je maintiens ma position.",
      "Cette interprétation, certes séduisante, nécessite toutefois d'être nuancée.",
    ],
    correct: 2,
    explanation: "Concessive relative 'certes séduisante' + 'nécessite d'être nuancée' = sophisticated diplomacy.",
    nuance: "Nested concessions create maximum nuance.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Create elegant argument flow:",
    context: "First, background. Then, analysis. Finally, conclusion.",
    options: [
      "D'abord le contexte. Puis l'analyse. Enfin la conclusion.",
      "Dans un premier temps, nous esquisserons le contexte. Dans un second temps, nous procéderons à l'analyse. En définitive...",
      "Bon, on commence par le contexte, puis on analyse, et voilà.",
    ],
    correct: 1,
    explanation: "Temporal structuring with formal verbs 'esquisserons', 'procéderons' = elegant flow.",
    nuance: "Formal temporal markers create academic rhythm.",
  },
  {
    id: 7,
    type: "rhetoric",
    prompt: "Which uses 'or' (presenting contrast) most effectively?",
    options: [
      "Or, je ne suis pas d'accord.",
      "Or, cette hypothèse ne résiste pas à l'examen attentif que mérite une telle affirmation.",
      "Or, c'est pas vrai.",
    ],
    correct: 1,
    explanation: "'Or' introduces unexpected contrast; embedded relative + 'résiste pas' + 'mérite' creates sophisticated refutation.",
    nuance: "Or is literary and signals unexpected contrast.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Transform to sophisticated exemplification:",
    context: "For example, France shows this",
    options: [
      "Par exemple, la France montre ça.",
      "À titre illustratif, le cas français mérite attention.",
      "À titre purement indicatif, le cas français offre un paradigme révélateur.",
    ],
    correct: 2,
    explanation: "'À titre purement indicatif' + hedging + 'paradigme révélateur' = most sophisticated.",
    nuance: "Sophisticated exemplification includes hedging and technical terms.",
  },
  {
    id: 9,
    type: "interpretation",
    prompt: "What discourse function does 'il n'en demeure pas moins que' serve?",
    options: ["Simple addition", "Elegant concession", "Temporal marking"],
    correct: 1,
    explanation: "This formula is sophisticated 'nevertheless', acknowledging while continuing.",
    nuance: "Il n'en demeure pas moins is literary and formal.",
  },
  {
    id: 10,
    type: "rhetoric",
    prompt: "Best for building crescendo in formal argument:",
    options: [
      "Et puis aussi...",
      "Non pas X seulement, mais Y, et surtout Z.",
      "Il y a A, B, et C.",
    ],
    correct: 1,
    explanation: "'Non pas... seulement' + 'mais' + 'surtout' creates building intensity.",
    nuance: "Crescendo structures build persuasive intensity.",
  },
  {
    id: 11,
    type: "transformation",
    prompt: "Create nested concessive structure:",
    context: "Although interesting, it has problems, unless we consider...",
    options: [
      "C'est intéressant mais y'a des problèmes sauf si on considère...",
      "Bien que stimulant, cette approche soulève des questions, sauf à considérer que...",
      "Bien que cette construction théorique, séduisante en première analyse, présente une cohérence indéniable, il n'en demeure pas moins, sauf à en minorer la portée, qu'elle soulève des questionnements épistémologiques de nature à en limiter la généralisation.",
    ],
    correct: 2,
    explanation: "Maximum nesting: concessive + relative + 'il n'en demeure pas moins' + 'sauf à' + technical evaluation.",
    nuance: "Nested concessions create maximum rhetorical sophistication.",
  },
  {
    id: 12,
    type: "rhetoric",
    prompt: "Which temporal structuring is most elegant?",
    options: [
      "Premièrement... Deuxièmement...",
      "Dans un premier temps... Dans un second temps... En définitive...",
    ],
    correct: 1,
    explanation: "Temporal rather than enumerative structuring creates narrative flow.",
    nuance: "Formal French prefers temporal to enumerative structure.",
  },
  {
    id: 13,
    type: "transformation",
    prompt: "Transform to sophisticated addition:",
    context: "Plus, it's strategic",
    options: [
      "Plus, c'est stratégique.",
      "De surcroît, cette dimension présente un caractère stratégique.",
      "Qui plus est, cette approche revêt une importance stratégique indiscutable.",
    ],
    correct: 2,
    explanation: "'Qui plus est' + 'revêt' + 'importance stratégique indiscutable' = most sophisticated.",
    nuance: "Qui plus est is more literary than de surcroît.",
  },
  {
    id: 14,
    type: "interpretation",
    prompt: "What does 'partant' signal in formal discourse?",
    options: ["Temporal beginning", "Logical consequence", "Contrast"],
    correct: 1,
    explanation: "'Partant' (from partir - to proceed) signals logical consequence from what precedes.",
    nuance: "Partant is literary and formal for consequence.",
  },
  {
    id: 15,
    type: "rhetoric",
    prompt: "Which demonstrates best integrated discourse flow?",
    options: [
      "D'abord je vais parler de A. Puis de B. Enfin de C.",
      "Dès lors qu'il est établi que..., il apparaît que..., dès lors...",
    ],
    correct: 1,
    explanation: "Sophisticated connector 'dès lors qu'il est établi que' + 'il apparaît' + 'dès lors' = elegant chain.",
    nuance: "Sophisticated flow uses connector chains with logical progression.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on sophisticated connectors
 *   (dès lors, néanmoins, de surcroît) and il n'en demeure pas moins que
 * - 8-11/15: "Strong performance" - encourages refining temporal structuring
 *   and nested concessions, working on partant and en l'occurrence
 * - 12-15/15: "Excellent discourse mastery" - celebrates sophisticated elegance
 *   with invisible connector deployment and logical flow
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Discourse flow requires familiarity with sophisticated connectors. Focus on dès lors, néanmoins, and de surcroît.",
      focus: "Practice using il n'en demeure pas moins que for elegant concessions.",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your discourse flow is developing well. Continue refining your use of temporal structuring and nested concessions.",
      focus: "Work on partant and en l'occurrence for formal contexts.",
    };
  }
  return {
    title: "Excellent discourse mastery",
    message: "Your French flows with sophisticated elegance. You deploy connectors invisibly, creating logical pathways that feel inevitable.",
    focus: "Continue developing your ability to chain sophisticated connectors fluently.",
  };
}
