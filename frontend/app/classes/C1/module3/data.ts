/**
 * C1 Module 3 - Advanced Connectors & Flow
 * ===========================================
 *
 * This file contains all lesson data for C1 Module 3, teaching advanced French
 * learners to master sophisticated connectors and create seamless discourse flow.
 *
 * **Module Content:**
 * - Introduction: Connectors as architecture, beyond basic transitions
 * - Sophisticated connectors: Advanced alternatives to basic connectors
 * - Weak vs Strong examples: Connector-based improvements
 * - Transformations: Elevating connector usage
 * - Discourse structuring: Opening, development, contrast, addition, conclusion markers
 * - 15 practice quiz questions (connector, comparison, rewrite, transformation types)
 *
 * **Key Concepts:**
 * - Connectors as architecture: Guiding readers through complex arguments
 * - Sophisticated alternatives: dès lors, partant, en l'occurrence, ce faisant
 * - Discourse markers: Opening, development, contrast, addition, conclusion
 * - Metadiscourse: Showing control of text architecture
 * - Rhetorical flow: Creating intellectual rhythm through connectors
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to advanced connectors
 * 4. sophisticatedConnectors - Advanced connector toolkit by category
 * 5. weakVsStrongExamples - Before/after connector examples
 * 6. transformations - Connector elevation examples
 * 7. discourseStructure - Discourse structuring markers
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
 * 1. intro - Introduction to connectors as architecture
 * 2. logical-flow - Logical flow and transitions
 * 3. sophisticated-markers - Advanced connector markers
 * 4. argument-linking - Linking arguments
 * 5. discourse-structure - Discourse structuring
 * 6. nuance-shifts - Nuance and register shifts
 * 7. practice - Interactive quiz
 * 8. completion - Module completion
 */
export const sectionIds = ["intro", "logical-flow", "sophisticated-markers", "argument-linking", "discourse-structure", "nuance-shifts", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Advanced Connectors & Flow",
  /** Brief description of module content */
  subtitle: "Master discourse flow with sophisticated connectors. Create seamless logical progressions and elegant rhetorical structures.",
  /** Module number in C1 series */
  moduleNumber: 3,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to advanced connectors.
 *
 * Content:
 * - Connectors as Architecture: Connectors guide readers through complex arguments
 * - Beyond Basic Transitions: Mastering sophisticated connectors (dès lors, partant, etc.)
 */
export const introSections = [
  {
    title: "Connectors as Architecture",
    content: "At C1, connectors are not just transition words—they are the architecture of your thinking. They guide readers through complex arguments, signal relationships between ideas, and create intellectual rhythm.",
  },
  {
    title: "Beyond Basic Transitions",
    content: "You know et, mais, donc. Now master: dès lors, partant, en l'occurrence, ce faisant, sinon dit. These connectors demonstrate sophisticated control of logical relationships.",
  },
];

// =============================================================================
// SOPHISTICATED CONNECTORS
// =============================================================================

/**
 * sophisticatedConnectors - Advanced connector toolkit with basic vs advanced comparison.
 *
 * Categories:
 * - Consequence (formal): donc → dès lors, partant, de ce fait
 * - Concession (elegant): mais → cependant, néanmoins, il n'en demeure pas moins que
 * - Addition (sophisticated): et → de surcroît, en outre, qui plus est
 * - Opposition (subtle): mais → or, seulement, tandis que
 * - Exemplification (precise): par exemple → en l'occurrence, à titre illustratif
 * - Restriction (nuanced): mais → seulement, sauf que, tout au plus
 */
export const sophisticatedConnectors = {
  title: "Sophisticated Connector Toolkit",
  categories: [
    { category: "Consequence (formal)", basic: "donc", advanced: ["dès lors", "partant", "de ce fait", "c'est pourquoi", "aussi"], example: "Dès lors, la décision s'impose." },
    { category: "Concession (elegant)", basic: "mais", advanced: ["cependant", "néanmoins", "toutefois", "il n'en demeure pas moins que"], example: "Il n'en demeure pas moins que des efforts restent nécessaires." },
    { category: "Addition (sophisticated)", basic: "et", advanced: ["de surcroît", "en outre", "qui plus est", "par ailleurs"], example: "Qui plus est, cette approche s'avère économique." },
    { category: "Opposition (subtle)", basic: "mais", advanced: ["or", "seulement", "tandis que", "en revanche"], example: "Or, cette hypothèse ne résiste pas à l'examen." },
    { category: "Exemplification (precise)", basic: "par exemple", advanced: ["ainsi", "notamment", "en l'occurrence", "à titre illustratif"], example: "En l'occurrence, le cas de la France est révélateur." },
    { category: "Restriction (nuanced)", basic: "mais", advanced: ["seulement", "sauf que", "tout au plus", "à condition que"], example: "Seulement, cette solution suppose des moyens importants." },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Connector-based improvements.
 *
 * Examples showing how sophisticated connectors elevate casual phrasing
 * to formal, elegant prose.
 *
 * Scenarios: Professional recommendation, academic critique, urgent directive, academic presentation
 */
export const weakVsStrongExamples = [
  {
    weak: "C'est une bonne idée. Et aussi, ça coûte moins cher.",
    strong: "Cette approche présente l'avantage d'être stratégiquement pertinente. Qui plus est, elle s'avère économiquement avantageuse.",
    why: "Replaces casual 'bonne idée' with analytical 'stratégiquement pertinente'; 'qui plus est' elevates 'et aussi'; 's'avère' is formal.",
    context: "Professional recommendation",
  },
  {
    weak: "Mais il y a un problème avec ça.",
    strong: "Cette analyse nécessite toutefois d'être nuancée : une difficulté majeure demeure.",
    why: "'Toutefois' is elegant concession; 'nécessite d'être nuancée' is analytical; 'demeure' adds formality.",
    context: "Academic critique",
  },
  {
    weak: "Donc nous devons faire ça maintenant.",
    strong: "Dès lors, il s'avère impératif de procéder sans délai.",
    why: "'Dès lors' is formal consequence; impersonal 'il s'avère' elevates register; 'imperatif' is stronger than 'devons'.",
    context: "Urgent formal directive",
  },
  {
    weak: "Par exemple, en France c'est comme ça.",
    strong: "À titre illustratif, le cas français mérite une attention particulière.",
    why: "'À titre illustratif' is formal exemplification; 'mérite une attention particulière' elevates observation to analysis.",
    context: "Academic presentation",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Connector elevation examples.
 *
 * Each transformation shows how to replace basic connectors with
 * sophisticated alternatives for formal contexts.
 *
 * Techniques demonstrated:
 * - Concession elevation + formal continuation
 * - Formal addition + double negation
 * - Sophisticated consequence + elegant conclusion
 */
export const transformations = [
  {
    original: "C'est vrai, mais il y a aussi un autre problème.",
    improved: "Force est de reconnaître la pertinence de cette observation. Il n'en demeure pas moins qu'une difficulté subsidiaire mérite attention.",
    technique: "Concession elevation + formal continuation",
    explanation: "'Force est de reconnaître' is elegant concession; 'il n'en demeure pas moins' is sophisticated 'mais'; 'subsidiaire' is technical.",
  },
  {
    original: "Et puis, il faut penser à l'avenir.",
    improved: "Par surcroît, la dimension prospective ne saurait être éludée.",
    technique: "Formal addition + double negation",
    explanation: "'Par surcroît' elevates 'et puis'; 'ne saurait être éludée' is very formal for 'il faut penser'.",
  },
  {
    original: "Donc on peut dire que c'est fini.",
    improved: "Partant, on peut conclure que cette phase touche à sa fin.",
    technique: "Sophisticated consequence + elegant conclusion",
    explanation: "'Partant' is literary consequence; 'toucher à sa fin' is elegant metaphor for ending.",
  },
];

// =============================================================================
// DISCOURSE STRUCTURE
// =============================================================================

/**
 * discourseStructure - Discourse structuring markers for text organization.
 *
 * Sections:
 * - Opening: Tout d'abord, En premier lieu, Il convient de noter que
 * - Development: Par la suite, Dans un second temps, Sur ce point
 * - Contrast shift: En revanche, À l'inverse, Toutefois
 * - Addition: De surcroît, En outre, Par ailleurs
 * - Conclusion: Enfin, En définitive, Au final
 */
export const discourseStructure = {
  title: "Discourse Structuring",
  sections: [
    { type: "Opening", markers: ["Tout d'abord", "En premier lieu", "Il convient de noter que", "Dans un premier temps"], example: "Il convient de noter que cette analyse repose sur plusieurs postulats." },
    { type: "Development", markers: ["Par la suite", "Ensuite", "Dans un second temps", "Sur ce point"], example: "Dans un second temps, examinons les implications pratiques." },
    { type: "Contrast shift", markers: ["En revanche", "À l'inverse", "Toutefois", "Cependant"], example: "En revanche, les données récentes suggèrent une tendance inverse." },
    { type: "Addition", markers: ["De surcroît", "En outre", "Par ailleurs", "Qui plus est"], example: "Par ailleurs, cette solution présente un avantage déterminant." },
    { type: "Conclusion", markers: ["Enfin", "Pour conclure", "En définitive", "Au final"], example: "En définitive, ces observations appellent une reconsideration du modèle." },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 3.
 *
 * Question types:
 * - connector (1, 4, 7, 9, 12, 14): Choose sophisticated connector
 * - comparison (2, 5, 8, 11, 15): Compare formulations
 * - rewrite (3, 10): Elevate connector usage
 * - transformation (6, 13): Transform to academic register
 *
 * Topics covered:
 * - Formal consequence markers (dès lors, partant)
 * - Elegant concession (il n'en demeure pas moins que)
 * - Sophisticated addition (de surcroît, qui plus est)
 * - Discourse structuring
 * - Academic conclusions (en définitive)
 * - Metadiscourse and rhetorical flow
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
    type: "connector",
    prompt: "Most sophisticated alternative to 'donc' for formal writing:",
    options: ["alors", "dès lors", "du coup"],
    correct: 1,
    explanation: "'Dès lors' is formal, elegant, and often used in academic and legal contexts.",
    nuance: "Literary/formal consequence marker.",
  },
  {
    id: 2,
    type: "comparison",
    prompt: "Which creates more sophisticated flow?",
    context: "Academic paper",
    options: [
      "Mais il reste des problèmes.",
      "Il n'en demeure pas moins que des obstacles subsistent.",
    ],
    correct: 1,
    explanation: "'Il n'en demeure pas moins que' is highly formal; 'subsistent' is literary for 'restent'.",
    nuance: "Elegant concession formula with literary verb.",
  },
  {
    id: 3,
    type: "rewrite",
    prompt: "Elevate: 'Et aussi, c'est moins cher'",
    options: [
      "De surcroît, cette solution présente un avantage économique.",
      "Et en plus, c'est pas cher.",
      "Aussi, il y a le prix.",
    ],
    correct: 0,
    explanation: "'De surcroît' is formal addition; 'présente un avantage' elevates 'c'est moins cher'.",
    nuance: "Formal addition + nominalization for elegance.",
  },
  {
    id: 4,
    type: "connector",
    prompt: "Best for introducing specific example in formal context:",
    options: ["par exemple", "en l'occurrence", "comme ça"],
    correct: 1,
    explanation: "'En l'occurrence' is formal and precise for 'in this specific case'.",
    nuance: "Demonstrates attention to particular instance.",
  },
  {
    id: 5,
    type: "comparison",
    prompt: "Which shows better discourse control?",
    options: [
      "Premièrement... Deuxièmement...",
      "Dans un premier temps... Dans un second temps... Enfin...",
    ],
    correct: 1,
    explanation: "Temporal structuring is more sophisticated than simple enumeration.",
    nuance: "Temporal markers create narrative flow in analysis.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Transform to sophisticated academic register:",
    context: "Concluding argument",
    options: [
      "Donc on voit que c'est important.",
      "Partant de ces observations, l'importance stratégique de cette dimension apparaît manifeste.",
      "Alors c'est clair que ça compte.",
    ],
    correct: 1,
    explanation: "'Partant de' is literary; 'apparaît manifeste' is formal evaluation.",
    nuance: "Literary consequence + impersonal evaluation.",
  },
  {
    id: 7,
    type: "connector",
    prompt: "Best connector for 'However, one must admit':",
    options: [
      "Mais il faut dire que",
      "Toutefois, force est de reconnaître que",
      "Cependant on doit admettre",
    ],
    correct: 1,
    explanation: "'Force est de reconnaître' is elegant impersonal formula for obligation.",
    nuance: "Impersonal constructions add formality and authority.",
  },
  {
    id: 8,
    type: "comparison",
    prompt: "Which creates better rhetorical flow?",
    options: [
      "C'est vrai. Mais il y a aussi...",
      "Cette observation mérite d'être saluée. Il n'en demeure pas moins que...",
    ],
    correct: 1,
    explanation: "Acknowledgment + formal concession creates sophisticated rhetorical structure.",
    nuance: "Rhetorical politeness enhances persuasive power.",
  },
  {
    id: 9,
    type: "connector",
    prompt: "Most sophisticated 'furthermore' for academic prose:",
    options: ["en plus", "de surcroît", "et aussi"],
    correct: 1,
    explanation: "'De surcroît' is literary and formal, used in high-register prose.",
    nuance: "Literary addition marker.",
  },
  {
    id: 10,
    type: "rewrite",
    prompt: "Improve: 'Et puis on doit penser au futur'",
    options: [
      "Qui plus est, l'avenir commande d'agir avec prudence.",
      "En plus, le futur c'est important.",
      "Aussi, pensons à demain.",
    ],
    correct: 0,
    explanation: "'Qui plus est' is elegant; 'l'avenir commande' personifies time elegantly.",
    nuance: "Personification + elegant addition.",
  },
  {
    id: 11,
    type: "comparison",
    prompt: "Which is more appropriate for formal analysis conclusion?",
    options: [
      "Bref, c'est la fin.",
      "En définitive, ces observations appellent une reconsidération de l'approche adoptée.",
    ],
    correct: 1,
    explanation: "'En définitive' is formal; 'appellent une reconsidération' is analytical.",
    nuance: "Formal conclusion + call to action.",
  },
  {
    id: 12,
    type: "connector",
    prompt: "Best for 'in other words' in formal register:",
    options: ["autrement dit", "sinon dit", "c'est-à-dire"],
    correct: 0,
    explanation: "'Autrement dit' is standard formal; 'sinon dit' is also acceptable but less common.",
    nuance: "Reformulation markers serve clarification function.",
  },
  {
    id: 13,
    type: "transformation",
    prompt: "Elevate this transition to academic register:",
    options: [
      "Passons maintenant à un autre point.",
      "Ces éléments étant posés, examinons à présent la seconde problématique.",
      "Maintenant on va voir autre chose.",
    ],
    correct: 1,
    explanation: "'Ces éléments étant posés' acknowledges previous section elegantly; 'examinons' is formal.",
    nuance: "Metadiscourse shows control of text architecture.",
  },
  {
    id: 14,
    type: "connector",
    prompt: "Most sophisticated 'or/now' (presenting contrast) marker:",
    options: ["mais", "or", "par contre"],
    correct: 1,
    explanation: "'Or' is literary/formal for presenting unexpected contrast or continuation.",
    nuance: "Literary connector often used in academic argumentation.",
  },
  {
    id: 15,
    type: "comparison",
    prompt: "Which shows masterful discourse control?",
    options: [
      "D'abord... Ensuite... Enfin...",
      "Il convient premièrement de... Dans un second temps... Pour conclure sur ce point...",
    ],
    correct: 1,
    explanation: "Complex metadiscourse formulas demonstrate sophisticated text management.",
    nuance: "Metadiscourse sophistication signals C1 mastery.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on dès lors, néanmoins,
 *   and de surcroît for formal contexts
 * - 8-11/15: "Nice progress" - encourages working on il n'en demeure pas moins
 *   and other sophisticated concession formulas
 * - 12-15/15: "Excellent discourse control" - celebrates sophisticated connectors
 *   and seamless logical flow
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Advanced connectors require familiarity. Focus on dès lors, néanmoins, and de surcroît for formal contexts.",
      focus: "Practice recognizing register levels of different connectors.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your connector repertoire is expanding. Continue refining your ability to create elegant discourse flow.",
      focus: "Work on il n'en demeure pas moins and other sophisticated concession formulas.",
    };
  }
  return {
    title: "Excellent discourse control",
    message: "You command sophisticated connectors that create seamless logical flow. Your prose demonstrates architectural mastery.",
    focus: "Continue developing your ability to vary connectors while maintaining cohesive discourse.",
  };
}
