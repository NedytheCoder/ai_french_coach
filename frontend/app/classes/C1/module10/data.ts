/**
 * C1 Module 10 - Writing Mastery
 * ================================
 *
 * This file contains all lesson data for C1 Module 10, teaching advanced French
 * learners to construct paragraphs with logical progression, cohesive flow, and
 * elegant structure. Focuses on the architecture of sophisticated prose at the
 * paragraph and text level.
 *
 * **Module Content:**
 * - Introduction: Writing as architecture, beyond sentences to paragraph mastery
 * - Paragraph structure: Topic sentence, development, concluding sentence
 * - Cohesion devices: Lexical chains, pronoun reference, demonstratives, connectors
 * - Weak vs Strong examples: Transforming simple lists into elegant prose
 * - Transformations: Nominal roadmaps, impersonal constructions, participle absolutes
 * - Elegant openings: Temporal framing, rhetorical questions, thesis statements
 * - 15 practice quiz questions (rewrite, comparison, transformation types)
 *
 * **Key Concepts:**
 * - Paragraph architecture: Topic sentence (foundation) → Development (framework) → Conclusion
 * - Cohesion (linking elements) vs Coherence (logical flow)
 * - Nominalization: Transforming verbs into nouns for density
 * - Participle absolutes: "Ces éléments étant posés..."
 * - Lexical chains: Thematic consistency through related vocabulary
 * - Demonstrative reference: "Ce point", "cette dimension"
 * - Elegant formulas: "Force est d'admettre", "il apparaît que"
 * - Impersonal constructions: Creating distance and authority
 * - Concessive openings: "Il n'en demeure pas moins que..."
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to writing architecture
 * 4. paragraphStructure - C1 paragraph components
 * 5. cohesionDevices - Devices for textual cohesion
 * 6. weakVsStrongExamples - Simple vs elegant prose comparisons
 * 7. transformations - Sentence restructuring examples
 * 8. elegantOpenings - Patterns for paragraph openings
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
 * 1. intro - Introduction to writing as architecture
 * 2. paragraph - Paragraph structure components
 * 3. progression - Logical progression patterns
 * 4. cohesion - Cohesion devices and techniques
 * 5. coherence - Coherence and flow
 * 6. elegant-openings - Paragraph opening patterns
 * 7. practice - Interactive quiz
 * 8. completion - Module completion
 */
export const sectionIds = ["intro", "paragraph", "progression", "cohesion", "coherence", "elegant-openings", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Writing Mastery",
  /** Brief description of module content */
  subtitle: "Construct paragraphs with logical progression, cohesive flow, and elegant structure. Master the architecture of sophisticated prose.",
  /** Module number in C1 series */
  moduleNumber: 10,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to writing mastery and paragraph architecture.
 *
 * Content:
 * - Writing as Architecture: Building paragraphs with topic sentences as foundations
 * - Beyond Sentences: Mastery at paragraph and text level through cohesion and coherence
 */
export const introSections = [
  {
    title: "Writing as Architecture",
    content: "At C1, writing is structural engineering. You build paragraphs that stand firm, with topic sentences as foundations, supporting evidence as framework, and conclusions that complete the structure. Every element serves the whole.",
  },
  {
    title: "Beyond Sentences",
    content: "Individual sentences can be elegant, but C1 writing demonstrates mastery at the paragraph and text level. Cohesion (linking elements) and coherence (logical flow) work together to create prose that guides the reader effortlessly.",
  },
];

// =============================================================================
// PARAGRAPH STRUCTURE
// =============================================================================

/**
 * paragraphStructure - The C1 paragraph architecture components.
 *
 * Three essential components:
 * - Topic sentence (assertion): States main claim (e.g., "Cette approche présente plusieurs avantages déterminants")
 * - Development (evidence/analysis): Supports claim with evidence
 * - Concluding sentence (synthesis): Sums up or transitions to next paragraph
 *
 * Each component has its function and example in formal French prose.
 */
export const paragraphStructure = {
  title: "The C1 Paragraph",
  components: [
    { element: "Topic sentence (assertion)", function: "States main claim", example: "Cette approche présente plusieurs avantages déterminants." },
    { element: "Development (evidence/analysis)", function: "Supports claim", example: "Premièrement, elle réduit les coûts opérationnels... Deuxièmement..." },
    { element: "Concluding sentence (synthesis)", function: "Sums up or transitions", example: "Ces éléments justifient pleinement l'adoption de cette stratégie." },
  ],
};

// =============================================================================
// COHESION DEVICES
// =============================================================================

/**
 * cohesionDevices - Tools for creating textual cohesion in French prose.
 *
 * Devices covered:
 * - Lexical chains: Thematic consistency through related vocabulary (problème → difficulté → obstacle → enjeu)
 * - Pronoun reference: Avoids repetition (Cette politique... Elle... Cette dernière...)
 * - Demonstratives: Maintains reference clarity (Ceci, cela, ce point, cette dimension)
 * - Connectors: Logical relationships (Cependant, par conséquent, de surcroît)
 * - Substitution: Varies expression (Le faire, ainsi agir, une telle mesure)
 */
export const cohesionDevices = {
  title: "Cohesion Devices",
  devices: [
    { device: "Lexical chains", example: "problème → difficulté → obstacle → enjeu", effect: "Thematic consistency" },
    { device: "Pronoun reference", example: "Cette politique... Elle... Cette dernière...", effect: "Avoids repetition" },
    { device: "Demonstratives", example: "Ceci, cela, ce point, cette dimension", effect: "Maintains reference clarity" },
    { device: "Connectors", example: "Cependant, par conséquent, de surcroît", effect: "Logical relationships" },
    { device: "Substitution", example: "Le faire, ainsi agir, une telle mesure", effect: "Varies expression" },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Simple list-based vs elegant integrated prose comparisons.
 *
 * Examples showing how to transform choppy, repetitive sentences into cohesive,
 * nominalized paragraphs with sophisticated structure.
 *
 * Scenarios: Economic analysis opening, presentation roadmap, analysis introduction, formal conclusion
 */
export const weakVsStrongExamples = [
  {
    weak: "Je vais parler de l'économie. L'économie va mal. Beaucoup de gens sont au chômage. C'est un problème sérieux.",
    strong: "La conjoncture actuelle, marquée par une dégradation persistante des indicateurs économiques et une hausse préoccupante du chômage, appelle une intervention résolue des pouvoirs publics.",
    why: "One elegant sentence replaces four simple ones; nominalization throughout; 'appelle' personifies.",
    context: "Economic analysis opening",
  },
  {
    weak: "D'abord je vais dire pourquoi c'est important. Ensuite je vais donner des exemples. Enfin je vais conclure.",
    strong: "Après avoir établi l'importance stratégique de cette dimension, nous illustrerons notre propos par des cas concrets avant de tirer les conclusions qui s'imposent.",
    why: "Infinitive + participle construction; 'tirer les conclusions qui s'imposent' is elegant formula.",
    context: "Presentation roadmap",
  },
  {
    weak: "Il y a beaucoup de raisons. Les raisons sont importantes. Nous devons les considérer.",
    strong: "La multiplicité et l'importance des facteurs en jeu commandent une analyse approfondie.",
    why: "'Multiplicité' and 'importance' nominalize; 'en jeu' is idiomatic; 'commandent' personifies elegantly.",
    context: "Analysis introduction",
  },
  {
    weak: "C'est fini. Nous avons tout dit. Merci de votre attention.",
    strong: "Ces considérations étant exposées, il me reste à vous remercier de votre attention bienveillante.",
    why: "Participle absolute opens; 'il me reste à' is elegant closing formula; 'bienveillante' adds warmth.",
    context: "Formal conclusion",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Sentence restructuring for elegant paragraph construction.
 *
 * Techniques shown:
 * - Nominal roadmap + elegant progression: Infinitive verbs become nouns
 * - Impersonal + relational vocabulary: "Fait l'objet", "opposant" for dramatic structure
 * - Participle absolute + adjective dominance: "Évidence des faits établis"
 *
 * Each transformation shows original, improved version, technique name, and explanation.
 */
export const transformations = [
  {
    original: "Je vais d'abord expliquer le problème. Puis je vais donner des solutions. Enfin je vais dire ce que je pense.",
    improved: "Nous procéderons en trois temps : diagnostic des difficultés, exploration des voies possibles, puis formulation de recommandations opérationnelles.",
    technique: "Nominal roadmap + elegant progression",
    explanation: "Infinitive verbs become nouns; 'procéderons en trois temps' is formal structure; 'diagnostic/exploration/formulation' parallel elegance.",
  },
  {
    original: "Les gens ne sont pas d'accord sur cette question. Certains pensent A. D'autres pensent B.",
    improved: "Cette question fait l'objet d'un débat animé, opposant partisans de A et défenseurs de B.",
    technique: "Impersonal + relational vocabulary",
    explanation: "'Fait l'objet' is formal; 'animé' evaluates intensity; 'opposant' creates dramatic structure.",
  },
  {
    original: "J'ai montré que c'est vrai. Les preuves sont claires. On ne peut pas nier ça.",
    improved: "L'évidence des faits établis, désormais incontestable, impose la reconnaissance de cette réalité.",
    technique: "Participle absolute + adjective dominance",
    explanation: "'Évidence' nominalizes; 'désormais incontestable' adds temporal authority; 'impose' personifies conclusion.",
  },
];

// =============================================================================
// ELEGANT OPENINGS
// =============================================================================

/**
 * elegantOpenings - Patterns for sophisticated paragraph openings.
 *
 * Patterns covered:
 * - Temporal framing: "À l'aube de ce nouveau millénaire..." (establishes context)
 * - Rhetorical question: "Comment ne pas voir que...?" (engages reader)
 * - Thesis statement: "Il convient dès l'abord de souligner que..." (clear direction)
 * - Concessive opening: "Force est d'admettre que..." (shows balance)
 * - Metaphorical: "À l'instar d'un édifice..." (creates vivid framing)
 */
export const elegantOpenings = {
  title: "Elegant Paragraph Openings",
  patterns: [
    { pattern: "Temporal framing", example: "À l'aube de ce nouveau millénaire...", effect: "Establishes historical context" },
    { pattern: "Rhetorical question", example: "Comment ne pas voir que...?", effect: "Engages reader" },
    { pattern: "Thesis statement", example: "Il convient dès l'abord de souligner que...", effect: "Clear direction" },
    { pattern: "Concessive opening", example: "Force est d'admettre que...", effect: "Shows balanced consideration" },
    { pattern: "Metaphorical", example: "À l'instar d'un édifice...", effect: "Creates vivid framing" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 10.
 *
 * Question types:
 * - rewrite (1, 4, 7, 9, 12, 14): Create elegant openings, transitions, conclusions
 * - comparison (2, 5, 8, 10, 13, 15): Choose more cohesive/progressive version
 * - transformation (3, 6, 11): Transform lists into elegant prose
 *
 * Topics covered:
 * - Elegant paragraph openings with nominalization
 * - Cohesion through nominalization and parallel structure
 * - Dash structures for listing (— pauvreté, inégalités, dérèglement —)
 * - Cohesive transitions ("Face à ces constats")
 * - Lexical chains and thematic consistency
 * - Roadmap paragraphs with participles and infinitives
 * - Academic conclusions with participle absolutes
 * - Pronoun cohesion (dont, lui)
 * - Topic sentences with nominalization
 * - Demonstrative reference for backward cohesion
 * - Paragraph unity through grammatical integration
 * - Concessive openings ("Force est d'admettre")
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
    prompt: "Create elegant paragraph opening:",
    context: "Essay on climate change",
    options: [
      "Je vais parler du changement climatique.",
      "L'urgence climatique, désormais incontestable, impose une réévaluation fondamentale de nos modèles de développement.",
      "Le climat change et c'est un problème.",
    ],
    correct: 1,
    explanation: "Nominal subject + participle 'désormais incontestable' + personified 'impose'.",
    nuance: "Strong openings establish authority immediately.",
  },
  {
    id: 2,
    type: "comparison",
    prompt: "Which demonstrates better paragraph coherence?",
    options: [
      "L'économie va mal. Beaucoup de gens perdent leur travail. Les prix augmentent. C'est difficile pour les familles.",
      "Cette dégradation conjoncturelle, caractérisée par une montée du chômage et une inflation galopante, pèse lourdement sur le pouvoir d'achat des ménages.",
    ],
    correct: 1,
    explanation: "One sentence with nominalization and parallel structure replaces choppy list.",
    nuance: "Nominalization creates cohesive, dense prose.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Transform list into elegant sentence:",
    context: "Three main causes: poverty, inequality, climate",
    options: [
      "Il y a trois causes : la pauvreté, l'inégalité et le climat.",
      "Trois facteurs structurels — pauvreté persistante, inégalités croissantes et dérèglement climatique — concourent à cette crise systémique.",
      "On a la pauvreté, les inégalités, et aussi le problème du climat.",
    ],
    correct: 1,
    explanation: "Dash structure + adjective-noun pairs + elevated 'concourent' + 'systémique'.",
    nuance: "Listing can be elegant with parallel structure and dashes.",
  },
  {
    id: 4,
    type: "rewrite",
    prompt: "Create cohesive transition:",
    context: "Moving from problem to solution",
    options: [
      "Maintenant je vais dire la solution.",
      "Face à ces constats, quelles réponses apporter ?",
      "Passons aux solutions.",
    ],
    correct: 1,
    explanation: "'Face à ces constats' summarizes previous; rhetorical question engages; 'réponses' echoes 'constats'.",
    nuance: "Elegant transitions echo previous while signaling new direction.",
  },
  {
    id: 5,
    type: "comparison",
    prompt: "Which has better lexical cohesion?",
    options: [
      "Le projet a échoué. La tentative a raté. L'essai n'a pas marché.",
      "Ce projet, dont l'ambition initiale méritait pourtant d'être saluée, a finalement échoué, victime de contraintes budgétaires insurmontables.",
    ],
    correct: 1,
    explanation: "Stays with 'projet' + adds evaluation + explains with nominal 'contraintes'.",
    nuance: "Lexical chains create thematic consistency.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Create elegant roadmap paragraph:",
    context: "Three-part analysis",
    options: [
      "D'abord A, puis B, enfin C.",
      "Nous procéderons en trois temps : après avoir esquissé le contexte historique, nous examinerons les enjeux actuels avant de formuler des perspectives d'avenir.",
      "Je vais parler de trois choses.",
    ],
    correct: 1,
    explanation: "'Procéderons en trois temps' is formal; participles + infinitives create parallel elegance.",
    nuance: "Roadmaps establish structure with authority.",
  },
  {
    id: 7,
    type: "rewrite",
    prompt: "Write elegant conclusion:",
    context: "End of academic paper",
    options: [
      "C'est fini. Merci.",
      "Ces éléments étant posés, il apparaît que cette recherche ouvre des perspectives prometteuses pour les travaux futurs.",
      "Voilà, j'ai fini mon exposé.",
    ],
    correct: 1,
    explanation: "Participle absolute + 'il apparaît' measured conclusion + 'perspectives prometteuses' forward-looking.",
    nuance: "Academic conclusions synthesize and project forward.",
  },
  {
    id: 8,
    type: "comparison",
    prompt: "Which demonstrates better pronoun cohesion?",
    options: [
      "Marie a écrit un livre. Le livre de Marie est bon. Tout le monde aime le livre de Marie.",
      "Marie a écrit un ouvrage dont la qualité lui vaut l'approbation unanime.",
    ],
    correct: 1,
    explanation: "'Dont' relative + 'lui' + singular 'ouvrage' avoids all repetition.",
    nuance: "Pronouns and relatives create elegant cohesion.",
  },
  {
    id: 9,
    type: "rewrite",
    prompt: "Create topic sentence with nominalization:",
    context: "Paragraph on education reform",
    options: [
      "Je vais parler de la réforme de l'éducation.",
      "La réforme des systèmes éducatifs, incontournable dans le contexte actuel, soulève des questions fondamentales sur les finalités de l'enseignement.",
      "L'éducation a besoin de changement.",
    ],
    correct: 1,
    explanation: "Nominal subject + participle 'incontournable' + 'soulève des questions' personifies.",
    nuance: "Strong topic sentences nominalize and evaluate.",
  },
  {
    id: 10,
    type: "comparison",
    prompt: "Which has more coherent progression?",
    options: [
      "Le chômage est haut. Les prix augmentent. Les gens sont mécontents.",
      "La persistance d'un chômage élevé, conjuguée à l'inflation galopante, engendre un mécontentement populaire croissant.",
    ],
    correct: 1,
    explanation: "One sentence shows causality (conjugée/engendre); nominalization throughout.",
    nuance: "Coherent progression shows logical relationships.",
  },
  {
    id: 11,
    type: "transformation",
    prompt: "Transform into sophisticated development:",
    context: "Supporting argument with evidence",
    options: [
      "Comme preuve, voici des chiffres.",
      "Les données statistiques viennent confirmer cette analyse : elles révèlent une tendance sans équivoque.",
      "J'ai des preuves avec des nombres.",
    ],
    correct: 1,
    explanation: "'Viennent confirmer' adds process; 'révèlent' personifies data; 'sans équivoque' evaluates.",
    nuance: "Development should integrate evidence elegantly.",
  },
  {
    id: 12,
    type: "rewrite",
    prompt: "Use demonstrative for cohesion:",
    context: "Referring back to previous point",
    options: [
      "Comme je l'ai dit avant...",
      "Ce point, que nous avons établi précédemment, mérite d'être souligné.",
      "Vous vous souvenez de ce que j'ai dit ?",
    ],
    correct: 1,
    explanation: "'Ce point' refers back; relative 'que' adds sophistication; 'mérite' evaluates importance.",
    nuance: "Demonstratives maintain reference without repetition.",
  },
  {
    id: 13,
    type: "comparison",
    prompt: "Which creates more elegant paragraph unity?",
    options: [
      "Le problème est grave. Il faut agir. Les solutions existent. Nous devons les mettre en œuvre.",
      "L'acuité de cette crise commande une intervention immédiate, d'autant que des solutions éprouvées s'offrent à nous.",
    ],
    correct: 1,
    explanation: "One complex sentence with 'commande' + 'd'autant que' (especially as) integrates causality.",
    nuance: "Paragraph unity comes from grammatical integration.",
  },
  {
    id: 14,
    type: "rewrite",
    prompt: "Create concessive opening:",
    context: "Acknowledging complexity before thesis",
    options: [
      "C'est compliqué mais je pense que...",
      "Force est d'admettre la complexité de cette problématique ; il n'en demeure pas moins que...",
      "C'est difficile, mais voici ma thèse...",
    ],
    correct: 1,
    explanation: "'Force est d'admettre' is elegant; 'il n'en demeure pas moins que' sophisticated continuation.",
    nuance: "Concessive openings demonstrate balanced consideration.",
  },
  {
    id: 15,
    type: "comparison",
    prompt: "Which demonstrates best writing mastery?",
    options: [
      "En conclusion, j'ai dit trois choses. Merci.",
      "Ces considérations étant exposées, il apparaît manifeste que cette voie s'impose comme l'option la plus judicieuse.",
    ],
    correct: 1,
    explanation: "Participle absolute + 'il apparaît manifeste' + 's'impose' + 'judicieuse'.",
    nuance: "Mature conclusions synthesize with authority.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on topic sentences and logical
 *   progression, practicing nominalization for cohesive prose
 * - 8-11/15: "Nice progress" - encourages refining transitions and paragraph
 *   structure, working on elegant openings and sophisticated development
 * - 12-15/15: "Excellent writing mastery" - celebrates sophisticated cohesion,
 *   logical progression, elegant structure, and authoritative prose flow
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Paragraph construction requires practice. Focus on topic sentences and logical progression.",
      focus: "Practice nominalization for cohesive, dense prose.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your writing shows developing cohesion. Continue refining transitions and paragraph structure.",
      focus: "Work on elegant openings and sophisticated development.",
    };
  }
  return {
    title: "Excellent writing mastery",
    message: "You construct paragraphs with sophisticated cohesion, logical progression, and elegant structure. Your prose flows with authority.",
    focus: "Continue developing your distinctive written voice while maintaining these qualities.",
  };
}
