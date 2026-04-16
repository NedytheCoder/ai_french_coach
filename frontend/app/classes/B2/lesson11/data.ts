/**
 * B2 Lesson 11 - Complex Sentence Construction
 * ===============================================
 *
 * This file contains all lesson data for B2 Lesson 11, teaching advanced
 * sentence construction techniques for sophisticated French prose.
 *
 * **Lesson Content:**
 * - Introduction: Beyond simple sentences, syntactic sophistication
 * - Clause embedding: Relative clauses, participial embedding, subordinate clauses
 * - Participles: Present participles and past participle absolute
 * - Subordination: Temporal, causal, conditional, concessive, final clauses
 * - Coordination: Coordinating conjunctions with nuance
 * - Cleft sentences: Focus and emphasis constructions
 * - Nominalization: Verbs as nouns for abstraction
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Embedding inserts one clause within another for density
 * - Present participle (-ant): Actions simultaneous with main verb
 * - Past participle absolute: Background circumstances, anterior events
 * - Cleft sentences (phrases clivées): Foreground specific information
 * - Nominalization: Converts verbs/actions to noun phrases
 * - Subordination establishes logical, temporal, causal relationships
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. introSections - Introduction to complex sentences
 * 4. embeddingSection - Clause embedding techniques
 * 5. participlesSection - Present and past participles
 * 6. subordinationSection - Subordination strategies
 * 7. coordinationSection - Coordination with nuance
 * 8. cleftsSection - Cleft sentences
 * 9. nominalizationSection - Nominalization patterns
 * 10. practiceQuestions - 15 quiz questions
 * 11. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to complex sentence construction
 * 2. embedding - Clause embedding techniques
 * 3. participles - Present and past participles
 * 4. subordination - Subordination strategies
 * 5. coordination - Coordination with nuance
 * 6. clefts - Cleft sentences
 * 7. nominalization - Nominalization patterns
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "embedding", "participles", "subordination", "coordination", "clefts", "nominalization", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Complex Sentence Construction",
  /** Brief description of lesson content */
  subtitle: "Build sophisticated sentences using embedding, participles, cleft constructions, and nominalization for advanced French prose.",
  /** Lesson number in B2 series */
  lessonNumber: 11,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to complex sentence construction.
 *
 * Content:
 * - Beyond Simple Sentences: Constructing multi-layered sentences
 * - Syntactic Sophistication: Managing temporal layers, embedding, foregrounding
 */
export const introSections = [
  {
    title: "Beyond Simple Sentences",
    content: "At B2, you construct multi-layered sentences that express nuanced relationships. You combine clauses using participles, relative clauses, cleft sentences, and sophisticated subordination.",
  },
  {
    title: "Syntactic Sophistication",
    content: "Complex sentences demonstrate syntactic maturity. They show you can manage multiple temporal layers, embed background information, and foreground key assertions.",
  },
];

// =============================================================================
// EMBEDDING SECTION
// =============================================================================

/**
 * embeddingSection - Clause embedding techniques.
 *
 * Embedding inserts one clause within another to create density and efficiency.
 *
 * Techniques:
 * - Relative clause embedding: J'ai lu un livre qui était fascinant
 * - Participial embedding: Souriant, il entra dans la pièce
 * - Subordinate clause embedding: Avant de partir, il a dit au revoir
 */
export const embeddingSection = {
  title: "Clause Embedding",
  explanation: "Embedding inserts one clause within another to create density and efficiency.",
  techniques: [
    { technique: "Relative clause embedding", simple: "J'ai lu un livre. Le livre était fascinant.", embedded: "J'ai lu un livre qui était fascinant.", note: "Combine with relative" },
    { technique: "Participial embedding", simple: "Il entra dans la pièce. Il souriait.", embedded: "Souriant, il entra dans la pièce.", note: "Present participle = simultaneous" },
    { technique: "Subordinate clause embedding", simple: "Il est parti. Il a dit au revoir.", embedded: "Avant de partir, il a dit au revoir.", note: "Subordinate clause establishes sequence" },
  ],
};

// =============================================================================
// PARTICIPLES SECTION
// =============================================================================

/**
 * participlesSection - Participles: Verbal adjectives.
 *
 * Participles allow incorporating secondary actions with elegant economy.
 *
 * Present Participle (-ant):
 * - Formation: Verb root + -ant (marcher → marchant)
 * - Usage: Actions simultaneous with main verb, manner, circumstance
 * - Examples: Méditant sur la vie, il marchait dans le parc
 *
 * Past Participle Absolute:
 * - Formation: Past participle with avoir/être subjects
 * - Usage: Background circumstances, anterior events
 * - Examples: Les devoirs finis, les enfants sont sortis jouer
 */
export const participlesSection = {
  title: "Participles: Verbal Adjectives",
  explanation: "Participles allow you to incorporate secondary actions with elegant economy.",
  presentParticiple: {
    formation: "Verb root + -ant (marcher → marchant)",
    usage: "Actions simultaneous with main verb, manner, circumstance",
    examples: [
      { sentence: "Méditant sur la vie, il marchait dans le parc.", meaning: "While meditating on life, he walked..." },
      { sentence: "Répondant à la question, elle sourit.", meaning: "Answering the question, she smiled." },
    ],
  },
  pastParticipleAbsolute: {
    formation: "Past participle with avoir/être subjects",
    usage: "Background circumstances, anterior events",
    examples: [
      { sentence: "Les devoirs finis, les enfants sont sortis jouer.", meaning: "With homework done, the children went out..." },
      { sentence: "La nuit tombée, nous sommes rentrés.", meaning: "With night fallen, we went home." },
    ],
  },
};

// =============================================================================
// SUBORDINATION SECTION
// =============================================================================

/**
 * subordinationSection - Subordination strategies.
 *
 * Subordinate clauses establish logical, temporal, and causal relationships.
 *
 * Types:
 * - Temporal: quand, lorsque, dès que, aussitôt que, avant que
 * - Causal: parce que, puisque, étant donné que
 * - Conditional: si, à condition que, pourvu que
 * - Concessive: bien que, quoique, même si
 * - Final (purpose): pour que, afin que, de peur que
 */
export const subordinationSection = {
  title: "Subordination Strategies",
  explanation: "Subordinate clauses establish logical, temporal, and causal relationships.",
  types: [
    { type: "Temporal", markers: "quand, lorsque, dès que, aussitôt que, avant que", example: "Dès qu'il aura fini, il partira." },
    { type: "Causal", markers: "parce que, puisque, étant donné que", example: "Étant donné qu'il est malade, il ne viendra pas." },
    { type: "Conditional", markers: "si, à condition que, pourvu que", example: "Pourvu qu'il fasse beau, nous irons." },
    { type: "Concessive", markers: "bien que, quoique, même si", example: "Bien qu'il soit fatigué, il travaille." },
    { type: "Final (purpose)", markers: "pour que, afin que, de peur que", example: "Je parle lentement pour qu'il comprenne." },
  ],
};

// =============================================================================
// COORDINATION SECTION
// =============================================================================

/**
 * coordinationSection - Coordination with nuance.
 *
 * Coordinating conjunctions link independent clauses with specific
 * logical relationships.
 *
 * Conjunctions:
 * - et: Addition (Il est intelligent et travailleur)
 * - mais: Contrast (Il est pauvre mais honnête)
 * - ou: Alternative (Viens ou reste, mais décide-toi)
 * - donc: Consequence (Il pleut, donc je reste)
 * - ni...ni: Double negation (Il n'est ni riche ni pauvre)
 * - or: Opposition/now (Il devait venir; or, il est malade)
 */
export const coordinationSection = {
  title: "Coordination with Nuance",
  explanation: "Coordinating conjunctions link independent clauses with specific logical relationships.",
  conjunctions: [
    { conjunction: "et", relation: "Addition", example: "Il est intelligent et travailleur." },
    { conjunction: "mais", relation: "Contrast", example: "Il est pauvre mais honnête." },
    { conjunction: "ou", relation: "Alternative", example: "Viens ou reste, mais décide-toi." },
    { conjunction: "donc", relation: "Consequence", example: "Il pleut, donc je reste." },
    { conjunction: "ni...ni", relation: "Double negation", example: "Il n'est ni riche ni pauvre." },
    { conjunction: "or", relation: "Opposition/now", example: "Il devait venir; or, il est malade." },
  ],
};

// =============================================================================
// CLEFTS SECTION
// =============================================================================

/**
 * cleftsSection - Cleft sentences: Focus and emphasis.
 *
 * Cleft constructions (phrases clivées) foreground specific information.
 *
 * Types:
 * - Ce qui/que est... c'est: Focus on subject/thing
 *   Example: Ce qui m'étonne, c'est sa réaction
 * - C'est... qui/que: It's X who/that...
 *   Examples: C'est Pierre qui a gagné (subject), C'est le prix que je veux (object)
 * - Ce dont je... c'est: Focus on complement
 *   Example: Ce dont je rêve, c'est voyager
 */
export const cleftsSection = {
  title: "Cleft Sentences: Focus and Emphasis",
  explanation: "Cleft constructions (phrases clivées) foreground specific information.",
  types: [
    { type: "Ce qui/que est... c'est", structure: "It's X who/that...", example: "Ce qui m'étonne, c'est sa réaction.", note: "Focus on subject/thing" },
    { type: "C'est... qui/que", structure: "It's X who/that...", example: "C'est Pierre qui a gagné. / C'est le prix que je veux.", note: "Subject = qui, Object = que" },
    { type: "Ce dont je... c'est", structure: "What I... is...", example: "Ce dont je rêve, c'est voyager.", note: "Focus on complement" },
  ],
};

// =============================================================================
// NOMINALIZATION SECTION
// =============================================================================

/**
 * nominalizationSection - Nominalization: Verbs as nouns.
 *
 * Nominalization converts verbs/actions into noun phrases for abstraction
 * and concision.
 *
 * Patterns:
 * - Le + infinitive: Le faire est difficile (infinitive as subject)
 * - Nominalized adjective: Les pauvres souffrent (adjective → noun group)
 * - Action nouns (-tion, -ment, -age): La construction fut rapide
 *
 * Benefits: Creates abstract, formal register; avoids repetitive verb constructions.
 */
export const nominalizationSection = {
  title: "Nominalization: Verbs as Nouns",
  explanation: "Nominalization converts verbs/actions into noun phrases for abstraction and concision.",
  patterns: [
    { pattern: "Le + infinitive", example: "Le faire est difficile.", note: "Infinitive as subject" },
    { pattern: "Nominalized adjective", example: "Les pauvres souffrent.", note: "Adjective → noun group" },
    { pattern: "Action nouns (-tion, -ment, -age)", example: "La construction fut rapide.", note: "Verb → action noun" },
  ],
  benefits: "Creates abstract, formal register. Avoids repetitive verb constructions.",
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B2 Lesson 11.
 *
 * Topics covered:
 * - embedding (1): Participial embedding (simultaneous action)
 * - present-participle (2): Present participle formation (-issant for -ir verbs)
 * - absolute (3): Past participle absolute (completed action)
 * - cleft (4): C'est... qui for subject focus
 * - cleft-object (5): C'est... que for object focus
 * - temporal (6): Dès que + future perfect
 * - causal (7): Étant donné que (formal given that)
 * - purpose (8): Pour que + subjunctive
 * - nominalization (9): Infinitive as subject (le faire)
 * - concessive (10): Bien que + subjunctive
 * - ce-qui-focus (11): Ce qui = subject of verb
 * - coordinating (12): Or = opposition/contrast
 * - subjunctive-trigger (13): Pourvu que + subjunctive
 * - manner (14): Participle for manner
 * - ni (15): Ni...ni = neither...nor
 *
 * Each question has:
 * - id: unique identifier
 * - topic: category for grouping
 * - prompt: question text
 * - options: array of 3 possible answers
 * - correct: index of correct option (0-2)
 * - explanation: detailed explanation of answer
 */
export const practiceQuestions = [
  { id: 1, topic: "embedding", prompt: "Combine: 'Il entra. Il souriait.' (participle)", options: ["Souriant, il entra.", "Il entra et il souriait.", "Entrant, il souriait."], correct: 0, explanation: "Present participle = simultaneous action" },
  { id: 2, topic: "present-participle", prompt: "Present participle of 'finir':", options: ["finissant", "fini", "finissant"], correct: 0, explanation: "-issant ending for -ir verbs" },
  { id: 3, topic: "absolute", prompt: "'Les devoirs _____, il sortit'", options: ["finis", "finissant", "fini"], correct: 0, explanation: "Past participle absolute = completed action" },
  { id: 4, topic: "cleft", prompt: "Cleft for 'Pierre a gagné' (focus Pierre):", options: ["C'est Pierre qui a gagné.", "Ce qui a gagné, c'est Pierre.", "C'est Pierre que a gagné."], correct: 0, explanation: "C'est... qui for subject focus" },
  { id: 5, topic: "cleft-object", prompt: "Cleft for 'Je veux le prix' (focus le prix):", options: ["C'est le prix que je veux.", "C'est le prix qui je veux.", "Ce que je veux, c'est le prix."], correct: 0, explanation: "C'est... que for object focus" },
  { id: 6, topic: "temporal", prompt: "'As soon as he finishes, he'll leave':", options: ["Dès qu'il aura fini, il partira.", "Quand il finit, il part.", "Avant qu'il finisse, il partira."], correct: 0, explanation: "Dès que + future perfect for 'as soon as'" },
  { id: 7, topic: "causal", prompt: "Formal 'Given that he's sick':", options: ["Étant donné qu'il est malade", "Parce qu'il est malade", "Puisqu'il est malade"], correct: 0, explanation: "Étant donné que = formal given that" },
  { id: 8, topic: "purpose", prompt: "'I speak slowly so that he understands':", options: ["Je parle lentement pour qu'il comprenne.", "Je parle lentement pour qu'il comprend.", "Je parle lentement pour qu'il comprendra."], correct: 0, explanation: "Pour que + subjunctive" },
  { id: 9, topic: "nominalization", prompt: "Nominalized: 'Le _____ est difficile' (faire)", options: ["faire", "faisant", "fait"], correct: 0, explanation: "Infinitive as subject: le faire" },
  { id: 10, topic: "concessive", prompt: "'Although he's tired, he works':", options: ["Bien qu'il soit fatigué, il travaille.", "Quoique il est fatigué, il travaille.", "Même s'il était fatigué, il travaille."], correct: 0, explanation: "Bien que + subjunctive" },
  { id: 11, topic: "ce-qui-focus", prompt: "'What surprises me is his reaction':", options: ["Ce qui m'étonne, c'est sa réaction.", "Ce que m'étonne, c'est sa réaction.", "Ce dont m'étonne, c'est sa réaction."], correct: 0, explanation: "Ce qui = subject of étonne" },
  { id: 12, topic: "coordinating", prompt: "'Or' expresses:", options: ["Opposition/contrast (now)", "Time sequence", "Addition"], correct: 0, explanation: "Or = but/however/now (formal)" },
  { id: 13, topic: "subjunctive-trigger", prompt: "'Pourvu que' requires:", options: ["Subjunctive", "Indicative", "Conditional"], correct: 0, explanation: "Pourvu que + subjunctive (provided that)" },
  { id: 14, topic: "manner", prompt: "Participle for manner: 'He left, singing'", options: ["Chantant, il est parti.", "Il est parti chantant.", "Chanté, il est parti."], correct: 0, explanation: "Both positions possible; chantant = while singing" },
  { id: 15, topic: "ni", prompt: "'Ni...ni' means:", options: ["Neither...nor", "Either...or", "Not only...but also"], correct: 0, explanation: "Double negation: neither X nor Y" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on cleft constructions
 *   and present participles for embedding
 * - 8-11/15: "Nice progress" - encourages focusing on subjunctive triggers
 *   and nominalization patterns
 * - 12-15/15: "Excellent command" - celebrates complex sentence mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Complex sentences require practice. Focus on cleft constructions and present participles for embedding.", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are building sophisticated sentences. Focus on subjunctive triggers and nominalization patterns.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You construct complex, layered sentences with precision. Your prose demonstrates advanced syntactic maturity.", emoji: "🌟", color: "green" as const };
}
