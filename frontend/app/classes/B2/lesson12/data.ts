/**
 * B2 Lesson 12 - Argumentation & Analysis
 * ==========================================
 *
 * This file contains all lesson data for B2 Lesson 12, teaching the language
 * of critical thinking and persuasive discourse in French.
 *
 * **Lesson Content:**
 * - Introduction: The architecture of argument, rhetorical strategies
 * - Thesis statement formulations: Direct assertion, measured, reframing, academic
 * - Introducing evidence: Attribution, data, examples, established facts
 * - Logical reasoning: Deduction, induction, analogy, causation
 * - Acknowledging objections: Concede then refute, admit limitation, anticipate, reject
 * - Conclusion strategies: Summary, thesis echo, extension, call to action
 * - Hedging and qualification: Modal adverbs, approximators, scope limiters
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Thesis: Clear position statement (Je soutiens que..., Il apparaît que...)
 * - Evidence: Grounds arguments in reality (Selon X, Les données montrent)
 * - Reasoning: Explicit logic through connectors (donc, par conséquent, de même)
 * - Objections: Strengthen position by addressing counterarguments (Certes... mais)
 * - Hedging: Softens claims appropriately (probablement, en général, il semble que)
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. lessonMeta - Lesson metadata (title, subtitle, number)
 * 3. introSections - Introduction to argumentation
 * 4. thesisSection - Thesis statement formulations
 * 5. evidenceSection - Introducing evidence
 * 6. reasoningSection - Logical reasoning connectors
 * 7. objectionSection - Acknowledging and refuting objections
 * 8. conclusionSection - Conclusion strategies
 * 9. hedgingSection - Hedging and qualification
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
 * 1. intro - Introduction to argumentation
 * 2. thesis - Thesis statement formulations
 * 3. evidence - Introducing evidence
 * 4. reasoning - Logical reasoning connectors
 * 5. objection - Acknowledging objections
 * 6. conclusion - Conclusion strategies
 * 7. hedging - Hedging and qualification
 * 8. practice - Interactive quiz
 * 9. completion - Lesson completion
 */
export const sectionIds = ["intro", "thesis", "evidence", "reasoning", "objection", "conclusion", "hedging", "practice", "completion"];

// =============================================================================
// LESSON METADATA
// =============================================================================

/**
 * lessonMeta - Lesson metadata for display in headers and navigation.
 */
export const lessonMeta = {
  /** Lesson title */
  title: "Argumentation & Analysis",
  /** Brief description of lesson content */
  subtitle: "Master the language of critical thinking: thesis, evidence, reasoning, objection, and conclusion. Build persuasive, analytical discourse in French.",
  /** Lesson number in B2 series */
  lessonNumber: 12,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to argumentation and analysis.
 *
 * Content:
 * - The Architecture of Argument: Clear thesis, logical reasoning, evidence
 * - Rhetorical Strategies: Connectors, hedging devices, emphasis techniques
 */
export const introSections = [
  {
    title: "The Architecture of Argument",
    content: "B2 argumentation requires clear thesis statements, logical reasoning, evidence presentation, and acknowledgment of counterarguments. You move beyond opinion to structured, persuasive discourse.",
  },
  {
    title: "Rhetorical Strategies",
    content: "Argumentation uses connectors, hedging devices, emphasis techniques, and metadiscourse. These tools guide readers through your reasoning and establish your analytical authority.",
  },
];

// =============================================================================
// THESIS SECTION
// =============================================================================

/**
 * thesisSection - Thesis statement formulations.
 *
 * A clear thesis announces your position and previews your argument structure.
 *
 * Patterns:
 * - Direct assertion: Je soutiens que... (Clear, confident)
 * - It appears that: Il apparaît que... (Measured, analytical)
 * - The question is: La question n'est pas... (Reframes debate)
 * - This essay argues: Cette analyse démontre que... (Academic register)
 */
export const thesisSection = {
  title: "Thesis Statement Formulations",
  explanation: "A clear thesis announces your position and previews your argument structure.",
  patterns: [
    { pattern: "Direct assertion", example: "Je soutiens que cette politique est nécessaire.", strength: "Clear, confident" },
    { pattern: "It appears that", example: "Il apparaît que les bénéfices dépassent les risques.", strength: "Measured, analytical" },
    { pattern: "The question is", example: "La question n'est pas de savoir si, mais comment.", strength: "Reframes debate" },
    { pattern: "This essay argues", example: "Cette analyse démontre que...", strength: "Academic register" },
  ],
};

// =============================================================================
// EVIDENCE SECTION
// =============================================================================

/**
 * evidenceSection - Introducing evidence.
 *
 * Evidence grounds arguments in reality. How you introduce it affects credibility.
 *
 * Markers:
 * - Selon X: According to X (attribute source)
 * - Les données montrent: Data show (empirical authority)
 * - Par exemple: For example (illustration)
 * - En l'occurrence: In this instance (specific case)
 * - Il est établi que: It is established that (accepted fact)
 */
export const evidenceSection = {
  title: "Introducing Evidence",
  explanation: "Evidence grounds arguments in reality. How you introduce it affects credibility.",
  markers: [
    { marker: "Selon X", meaning: "According to X", example: "Selon l'INSEE, le chômage a baissé.", note: "Attribute source" },
    { marker: "Les données montrent", meaning: "Data show", example: "Les données montrent une tendance claire.", note: "Empirical authority" },
    { marker: "Par exemple", meaning: "For example", example: "Par exemple, le cas de l'Allemagne...", note: "Illustration" },
    { marker: "En l'occurrence", meaning: "In this instance", example: "En l'occurrence, nous constatons...", note: "Specific case" },
    { marker: "Il est établi que", meaning: "It is established that", example: "Il est établi que le réchauffement s'accélère.", note: "Accepted fact" },
  ],
};

// =============================================================================
// REASONING SECTION
// =============================================================================

/**
 * reasoningSection - Logical reasoning connectors.
 *
 * Reasoning connectors make your logic explicit and transparent.
 *
 * Categories:
 * - Deduction: donc, par conséquent, dès lors, il s'ensuit que
 * - Induction: en général, dans la plupart des cas, il semble que
 * - Analogy: de même, de façon similaire, à l'instar de
 * - Causation: parce que, en raison de, grâce à, à cause de
 */
export const reasoningSection = {
  title: "Logical Reasoning Connectors",
  explanation: "Reasoning connectors make your logic explicit and transparent.",
  categories: [
    { category: "Deduction", markers: ["donc", "par conséquent", "dès lors", "il s'ensuit que"], example: "Il pleut; par conséquent, je reste." },
    { category: "Induction", markers: ["en général", "dans la plupart des cas", "il semble que"], example: "En général, les prix augmentent." },
    { category: "Analogy", markers: ["de même", "de façon similaire", "à l'instar de"], example: "De même, l'économie suit des cycles." },
    { category: "Causation", markers: ["parce que", "en raison de", "grâce à", "à cause de"], example: "Grâce à cette réforme, les résultats s'améliorent." },
  ],
};

// =============================================================================
// OBJECTION SECTION
// =============================================================================

/**
 * objectionSection - Acknowledging and refuting objections.
 *
 * Addressing counterarguments strengthens your position by showing you've
 * considered alternatives.
 *
 * Strategies:
 * - Concede then refute: Certes... mais/cependant
 * - Admit limitation: Il est vrai que... toutefois
 * - Anticipate objection: On pourrait objecter que... cependant
 * - Reject entirely: Cette critique néglige...
 */
export const objectionSection = {
  title: "Acknowledging and Refuting Objections",
  explanation: "Addressing counterarguments strengthens your position by showing you've considered alternatives.",
  strategies: [
    { strategy: "Concede then refute", pattern: "Certes... mais/cependant", example: "Certes, cette solution coûte cher; néanmoins, elle est durable." },
    { strategy: "Admit limitation", pattern: "Il est vrai que... toutefois", example: "Il est vrai que le délai est court; toutefois, c'est faisable." },
    { strategy: "Anticipate objection", pattern: "On pourrait objecter que... cependant", example: "On pourrait objecter que... cependant, les données prouvent..." },
    { strategy: "Reject entirely", pattern: "Cette critique néglige...", example: "Cette critique néglige l'aspect économique." },
  ],
};

// =============================================================================
// CONCLUSION SECTION
// =============================================================================

/**
 * conclusionSection - Conclusion strategies.
 *
 * Conclusions summarize, synthesize, and extend your argument.
 *
 * Techniques:
 * - Summary restatement: En résumé, nous avons démontré que... (Recap)
 * - Thesis echo: Ainsi, comme nous l'avons soutenu... (Return to opening)
 * - Extension: Cette analyse ouvre des perspectives pour... (Future implications)
 * - Call to action: Il est impératif que nous agissions. (Urgency)
 * - Rhetorical question: Comment pourrions-nous ignorer ces faits? (Engage)
 */
export const conclusionSection = {
  title: "Conclusion Strategies",
  explanation: "Conclusions summarize, synthesize, and extend your argument.",
  techniques: [
    { technique: "Summary restatement", example: "En résumé, nous avons démontré que...", function: "Recap main points" },
    { technique: "Thesis echo", example: "Ainsi, comme nous l'avons soutenu...", function: "Return to opening" },
    { technique: "Extension", example: "Cette analyse ouvre des perspectives pour...", function: "Future implications" },
    { technique: "Call to action", example: "Il est impératif que nous agissions.", function: "Urgency" },
    { technique: "Rhetorical question", example: "Comment pourrions-nous ignorer ces faits?", function: "Engage reader" },
  ],
};

// =============================================================================
// HEDGING SECTION
// =============================================================================

/**
 * hedgingSection - Hedging and qualification.
 *
 * Hedging softens claims appropriately, showing intellectual honesty without
 * weakening your position.
 *
 * Devices:
 * - Modal adverbs: probablement, vraisemblablement, peut-être, sans doute
 * - Approximators: environ, à peu près, plus ou moins
 * - Scope limiters: en général, dans la plupart des cas, tendance
 * - Probability markers: il est probable que, il semble que, on peut supposer que
 */
export const hedgingSection = {
  title: "Hedging and Qualification",
  explanation: "Hedging softens claims appropriately, showing intellectual honesty without weakening your position.",
  devices: [
    { device: "Modal adverbs", examples: ["probablement", "vraisemblablement", "peut-être", "sans doute"], example: "Cela réussira probablement." },
    { device: "Approximators", examples: ["environ", "à peu près", "plus ou moins"], example: "Environ 30% des cas." },
    { device: "Scope limiters", examples: ["en général", "dans la plupart des cas", "tendance"], example: "Dans la plupart des cas, cela fonctionne." },
    { device: "Probability markers", examples: ["il est probable que", "il semble que", "on peut supposer que"], example: "Il est probable que cette tendance continue." },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for B2 Lesson 12.
 *
 * Topics covered:
 * - thesis (1): Formal thesis pattern (Je soutiens que)
 * - evidence (2): Selon vs D'après for attribution
 * - deduction (3): Strong formal 'therefore' (par conséquent)
 * - concession (4): Certes... mais/cependant pattern
 * - objection (5): On pourrait objecter que... (impersonal objection)
 * - conclusion (6): En résumé (formal summary)
 * - hedging (7): Probablement (softened certainty)
 * - scope (8): Dans la plupart des cas (qualified generalization)
 * - established (9): Il est établi que (accepted fact)
 * - perspective (10): Extension/implications pattern
 * - analogy (11): De même (similarly)
 * - gratitude (12): Grâce à (positive cause)
 * - negative-cause (13): À cause de (negative cause)
 * - reject (14): Cette critique néglige... (reject criticism)
 * - appears (15): Il apparaît que (measured tone)
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
  { id: 1, topic: "thesis", prompt: "Formal thesis statement pattern:", options: ["Je soutiens que...", "Je pense que...", "Je crois que..."], correct: 0, explanation: "Je soutiens que = I maintain that (formal, strong)" },
  { id: 2, topic: "evidence", prompt: "'According to INSEE' in French:", options: ["Selon l'INSEE", "D'après l'INSEE", "Les deux sont corrects"], correct: 2, explanation: "Both selon and d'après work for attribution" },
  { id: 3, topic: "deduction", prompt: "Strong formal 'therefore':", options: ["par conséquent", "alors", "donc"], correct: 0, explanation: "Par conséquent = very formal therefore" },
  { id: 4, topic: "concession", prompt: "Pattern: 'Admittedly... however':", options: ["Certes... mais/cependant", "Peut-être... donc", "Sans doute... et"], correct: 0, explanation: "Certes... mais/cependant = concede then refute" },
  { id: 5, topic: "objection", prompt: "'One might object that...':", options: ["On pourrait objecter que...", "Tu dois objecter que...", "Il faut objecter que..."], correct: 0, explanation: "On pourrait = impersonal, polite objection" },
  { id: 6, topic: "conclusion", prompt: "'In summary' (formal):", options: ["En résumé", "Bref", "Finalement"], correct: 0, explanation: "En résumé = formal summary opening" },
  { id: 7, topic: "hedging", prompt: "Hedging adverb for 'probably':", options: ["probablement", "certainement", "sûrement"], correct: 0, explanation: "Probablement = softened certainty" },
  { id: 8, topic: "scope", prompt: "'In most cases' (scope limiter):", options: ["dans la plupart des cas", "toujours", "jamais"], correct: 0, explanation: "Dans la plupart des cas = qualified generalization" },
  { id: 9, topic: "established", prompt: "'It is established that' =", options: ["Il est établi que", "On sait que", "Je pense que"], correct: 0, explanation: "Il est établi que = accepted fact" },
  { id: 10, topic: "perspective", prompt: "'This opens perspectives for...' =", options: ["extension/implications", "summary", "concession"], correct: 0, explanation: "Opens perspectives = future implications" },
  { id: 11, topic: "analogy", prompt: "Connector for 'similarly':", options: ["de même", "cependant", "donc"], correct: 0, explanation: "De même = similarly/by the same token" },
  { id: 12, topic: "gratitude", prompt: "'Thanks to' (positive cause) =", options: ["grâce à", "à cause de", "malgré"], correct: 0, explanation: "Grâce à = positive cause (favorable)" },
  { id: 13, topic: "negative-cause", prompt: "'Because of' (negative) =", options: ["à cause de", "grâce à", "selon"], correct: 0, explanation: "À cause de = negative cause (unfavorable)" },
  { id: 14, topic: "reject", prompt: "To reject a criticism entirely:", options: ["Cette critique néglige...", "Cette critique a raison...", "Cette critique est bonne..."], correct: 0, explanation: "Cette critique néglige = this criticism ignores (rejection)" },
  { id: 15, topic: "appears", prompt: "'It appears that' (measured) =", options: ["Il apparaît que", "Je suis sûr que", "Certainement"], correct: 0, explanation: "Il apparaît que = measured, analytical tone" },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on thesis patterns
 *   (je soutiens que), evidence markers (selon), concession structures (certes... mais)
 * - 8-11/15: "Nice progress" - encourages focusing on hedging devices
 *   and conclusion strategies
 * - 12-15/15: "Excellent command" - celebrates argumentation mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Argumentation language requires practice. Focus on thesis patterns (je soutiens que), evidence markers (selon), and concession structures (certes... mais).", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You are developing argumentative skills. Focus on hedging devices and conclusion strategies for sophisticated discourse.", emoji: "🎯", color: "yellow" as const };
  return { title: "Excellent command", message: "You command the language of argumentation. You can construct persuasive, analytical discourse with appropriate hedging and sophisticated connectors.", emoji: "🌟", color: "green" as const };
}
