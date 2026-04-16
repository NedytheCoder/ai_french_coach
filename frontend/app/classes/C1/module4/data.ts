/**
 * C1 Module 4 - Complex Sentence Mastery
 * ========================================
 *
 * This file contains all lesson data for C1 Module 4, teaching advanced French
 * learners to construct sophisticated, layered sentences with complex syntax.
 *
 * **Module Content:**
 * - Introduction: Syntactic sophistication and sentence architecture
 * - Subordination patterns: Temporal layering, causal stacking, conditional complex, relative embedding
 * - Weak vs Strong examples: Simple vs complex sentence comparisons
 * - Transformations: Elevating simple sentences to complex prose
 * - Cleft sentences: C'est... qui/que, Ce qui/ce que... c'est, Ce dont... c'est
 * - Participial constructions: Present participles, past participle absolutes
 * - 15 practice quiz questions (transformation, comparison, rewrite types)
 *
 * **Key Concepts:**
 * - Sentence layering: Main clause (foreground), subordinate (background), participial (texture)
 * - Subordination: Temporal, causal, conditional, relative clause embedding
 * - Cleft constructions: Emphasis through syntactic focusing
 * - Participles: Present for simultaneity/manner, past absolute for completed circumstances
 * - Nominalization: Converting verbs to nouns for formal register
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to complex sentences
 * 4. subordinationPatterns - Advanced subordination patterns
 * 5. weakVsStrongExamples - Simple vs complex comparisons
 * 6. transformations - Sentence transformation examples
 * 7. cleftSentences - Cleft construction types
 * 8. participialConstructions - Participial usage guide
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
 * 1. intro - Introduction to syntactic sophistication
 * 2. subordination - Subordination patterns
 * 3. clause-layering - Clause layering techniques
 * 4. participles - Participial constructions
 * 5. clefts - Cleft sentences
 * 6. nominalization - Nominalization techniques
 * 7. practice - Interactive quiz
 * 8. completion - Module completion
 */
export const sectionIds = ["intro", "subordination", "clause-layering", "participles", "clefts", "nominalization", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Complex Sentence Mastery",
  /** Brief description of module content */
  subtitle: "Build sophisticated sentences with layered clauses, elegant participles, and precise nominalization. Transform simple statements into nuanced prose.",
  /** Module number in C1 series */
  moduleNumber: 4,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to complex sentence construction.
 *
 * Content:
 * - Syntactic Sophistication: Combining subordination, coordination, embedding
 * - The Architecture of Complex Sentences: Multiple information layers (main, subordinate, participial)
 */
export const introSections = [
  {
    title: "Syntactic Sophistication",
    content: "At C1, sentence construction becomes an art. You combine subordination, coordination, and embedding to create prose that is dense yet clear, complex yet elegant. The goal is not complexity for its own sake, but expressive precision.",
  },
  {
    title: "The Architecture of Complex Sentences",
    content: "Complex sentences have multiple information layers: main clause for foreground, subordinate clauses for background, and participial phrases for texture. Managing these layers demonstrates syntactic maturity.",
  },
];

// =============================================================================
// SUBORDINATION PATTERNS
// =============================================================================

/**
 * subordinationPatterns - Advanced subordination patterns for complex sentences.
 *
 * Patterns:
 * - Temporal layering: Quand X, Y qui Z, alors... (three temporal layers)
 * - Causal stacking: Parce que X, et que Y, il s'ensuit que... (double cause)
 * - Conditional complex: Si X, ce qui impliquerait Y, à moins que Z... (condition + implication + exception)
 * - Relative embedding: N qui, dont X, et que Y... (multiple relative clauses)
 */
export const subordinationPatterns = {
  title: "Advanced Subordination Patterns",
  patterns: [
    { pattern: "Temporal layering", structure: "Quand X, Y qui Z, alors...", example: "Quand les résultats furent publiés, ceux qui avaient misé sur l'innovation constatèrent que leurs efforts avaient été récompensés.", analysis: "Three temporal layers: publication moment, those who bet on innovation, realization of reward" },
    { pattern: "Causal stacking", structure: "Parce que X, et que Y, il s'ensuit que...", example: "Parce que les données étaient contradictoires, et qu'aucune méta-analyse n'était disponible, il s'ensuit que toute conclusion reste précaire.", analysis: "Double cause leading to hedged conclusion" },
    { pattern: "Conditional complex", structure: "Si X, ce qui impliquerait Y, à moins que Z...", example: "Si cette hypothèse se vérifiait, ce qui impliquerait un changement de paradigme, à moins que des facteurs externes n'interviennent.", analysis: "Main condition + implication + limiting exception" },
    { pattern: "Relative embedding", structure: "N qui, dont X, et que Y...", example: "L'auteur, dont l'influence sur la discipline reste considérable, et que les critiques contemporains continuent de citer, a profondément marqué la pensée du siècle.", analysis: "Multiple relative clauses layering information" },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Simple vs complex sentence comparisons.
 *
 * Examples showing how to transform simple, choppy sentences into
 * sophisticated, layered prose using subordination and embedding.
 *
 * Scenarios: Formal announcement, academic analysis, policy analysis, meeting report
 */
export const weakVsStrongExamples = [
  {
    weak: "Il pleut. Donc le match est annulé. Les gens sont mécontents.",
    strong: "Les précipitations persistantes ayant rendu le terrain impraticable, la rencontre fut annulée, ce qui suscita une vive déception parmi les spectateurs.",
    why: "Participial phrase replaces simple cause; passive élevé 'fut annulée'; relative clause connects consequence elegantly.",
    context: "Formal announcement",
  },
  {
    weak: "L'étude dit que c'est vrai. Mais d'autres gens pensent autre chose.",
    strong: "Si les conclusions de cette étude corroborent l'hypothèse initiale, il n'en demeure pas moins que des voix discordantes continuent de s'élever au sein de la communauté scientifique.",
    why: "Conditional + formal corroborent; sophisticated concession; 'voix discordantes' is elegant metonymy.",
    context: "Academic analysis",
  },
  {
    weak: "Le gouvernement a fait une loi. Les entreprises doivent suivre cette loi. C'est pour la protection de l'environnement.",
    strong: "La législation récemment adoptée, qui impose aux entreprises de nouvelles contraintes environnementales, vise à renforcer la protection écologique.",
    why: "Nominalization 'législation adoptée'; relative clause embeds details; impersonal 'vise à' is formal.",
    context: "Policy analysis",
  },
  {
    weak: "Il a parlé pendant longtemps. Il a dit des choses importantes. Tout le monde a écouté.",
    strong: "Son intervention, qui s'éternisa sur plusieurs heures mais livra des éléments déterminants pour la compréhension du dossier, retint l'attention de l'assistance.",
    why: "Relative clauses add layers; 's'éternisa' is evaluative; 'retint l'attention' is elegant for 'tout le monde a écouté'.",
    context: "Meeting report",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Sentence transformation examples.
 *
 * Each transformation shows how to combine multiple simple sentences into
 * one sophisticated, complex sentence using various techniques.
 *
 * Techniques demonstrated:
 * - Nominalization + relative stacking
 * - Personification + formal consequence + litotes
 * - Concessive opening + metonymy + antithesis
 */
export const transformations = [
  {
    original: "L'entreprise a des difficultés. Elle perd de l'argent. Les employés sont inquiets.",
    improved: "Les difficultés financières que traverse l'entreprise, et qui se traduisent par des pertes substantielles, génèrent une légitime inquiétude parmi le personnel.",
    technique: "Nominalization + relative stacking",
    explanation: "'Difficultés financières' nominalizes; stacked relatives 'que traverse' + 'qui se traduisent' layer information; 'légitime inquiétude' is evaluative.",
  },
  {
    original: "Le projet est important. Il faut le finir vite. Sinon on aura des problèmes.",
    improved: "L'importance stratégique de ce projet commande son achèvement dans les meilleurs délais, faute de quoi des conséquences dommageables ne manqueraient pas de se manifester.",
    technique: "Personification + formal consequence + litotes",
    explanation: "'Commande' personifies importance; 'faute de quoi' is sophisticated 'sinon'; 'ne manqueraient pas' is litotic understatement.",
  },
  {
    original: "Les gens protestent. Ils ne veulent pas de cette décision. Le gouvernement ne change pas d'avis.",
    improved: "Malgré les manifestations qui émaillent le paysage politique et témoignent d'une opposition résolue à cette mesure, les autorités demeurent inflexibles sur leur position.",
    technique: "Concessive opening + metonymy + antithesis",
    explanation: "'Malgré' opens with concession; 'émaillent' is elegant metaphor; 'demeurent inflexibles' opposes 'opposition résolue' elegantly.",
  },
];

// =============================================================================
// CLEFT SENTENCES
// =============================================================================

/**
 * cleftSentences - Cleft constructions (phrases clivées) for emphasis.
 *
 * Types:
 * - C'est... qui/que: Focus on subject or object
 * - Ce qui/ce que... c'est: Focus on concept or action
 * - Ce dont... c'est: Focus on complement of de
 */
export const cleftSentences = {
  title: "Cleft Constructions for Emphasis",
  explanation: "Clefts (phrases clivées) foreground specific information for rhetorical effect.",
  types: [
    { type: "C'est... qui/que", usage: "Focus on subject or object", example: "C'est le directeur qui a pris cette décision. (not someone else)", example2: "C'est cette décision que le directeur a prise. (not another decision)" },
    { type: "Ce qui/ce que... c'est", usage: "Focus on concept or action", example: "Ce qui me préoccupe, c'est le manque de transparence.", example2: "Ce que je conteste, c'est la méthode employée." },
    { type: "Ce dont... c'est", usage: "Focus on complement of de", example: "Ce dont nous avons besoin, c'est d'une clarification.", example2: "Ce dont il s'agit, c'est de choisir entre deux visions." },
  ],
};

// =============================================================================
// PARTICIPIAL CONSTRUCTIONS
// =============================================================================

/**
 * participialConstructions - Participial phrases for elegant sentence construction.
 *
 * Types:
 * - Present participle: Simultaneous actions, manner, circumstances (-ant forms)
 * - Past participle absolute: Completed circumstances, background setting
 */
export const participialConstructions = {
  title: "Participial Constructions for Elegance",
  presentParticiple: {
    usage: "Simultaneous actions, manner, circumstances",
    examples: [
      { sentence: "Méditant sur ces questions, il composa son ouvrage.", analysis: "Present participle = while meditating (simultaneity)" },
      { sentence: "S'appuyant sur ces données, l'auteur démontre que...", analysis: "Means/method = relying on these data" },
    ],
  },
  pastParticipleAbsolute: {
    usage: "Completed circumstances, background setting",
    examples: [
      { sentence: "Les préliminaires achevés, les négociations purent commencer.", analysis: "With preliminaries completed" },
      { sentence: "La soirée tombée, les invités se dispersèrent.", analysis: "With night fallen" },
    ],
  },
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 4.
 *
 * Question types:
 * - transformation (1, 4, 7, 11): Transform simple to complex sentences
 * - comparison (2, 5, 8, 10, 12, 15): Compare simple vs complex versions
 * - rewrite (3, 6, 9, 13): Create specific constructions (clefts, participles)
 *
 * Topics covered:
 * - Nominalization and relative clause embedding
 * - Cleft sentence construction (c'est... qui, ce que... c'est)
 * - Participial phrases (present and past absolute)
 * - Complex conditionals with subjunctive
 * - Stacked relative clauses
 * - Concessive subordination
 * - Subject subordinate clauses
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
    type: "transformation",
    prompt: "Transform three simple sentences into one complex sentence:",
    context: "The company failed. It lost money. Investors are worried.",
    options: [
      "La société a échoué. Elle a perdu de l'argent. Les investisseurs sont inquiets.",
      "La déconfiture de cette entreprise, qui s'est traduite par des pertes considérables, suscite des inquiétudes légitimes chez les investisseurs.",
      "L'entreprise a perdu de l'argent alors les gens qui ont investi sont inquiets parce qu'elle a échoué.",
    ],
    correct: 1,
    explanation: "Nominalization 'déconfiture' + relative clause 'qui s'est traduite' + elegant 'suscite'.",
    nuance: "Complex sentences use nominalization and embedding.",
  },
  {
    id: 2,
    type: "comparison",
    prompt: "Which sentence demonstrates better syntactic mastery?",
    options: [
      "Il a parlé et les gens ont écouté parce que c'était important.",
      "Son propos, parce qu'il touchait à des questions essentielles, retint l'attention de son auditoire.",
    ],
    correct: 1,
    explanation: "Subordinate clause placement creates suspension; 'retint l'attention' elevates 'gens ont écouté'.",
    nuance: "Subordinate clauses create syntactic sophistication.",
  },
  {
    id: 3,
    type: "rewrite",
    prompt: "Create a cleft sentence emphasizing the decision-maker:",
    context: "The CEO made this choice",
    options: [
      "Le PDG a fait ce choix.",
      "C'est le PDG qui a pris cette décision.",
      "Ce choix a été fait par le PDG.",
    ],
    correct: 1,
    explanation: "C'est... qui cleft construction foregrounds the subject.",
    nuance: "Clefts create emphasis through syntactic focusing.",
  },
  {
    id: 4,
    type: "transformation",
    prompt: "Use a participial phrase for elegance:",
    context: "He thought about the problem. He wrote the solution.",
    options: [
      "Il pensait au problème. Il a écrit la solution.",
      "Méditant sur cette problématique, il élabora une réponse.",
      "Pendant qu'il pensait au problème, il écrivait.",
    ],
    correct: 1,
    explanation: "Present participle 'méditant' creates elegant simultaneity; 'élabora' elevates 'écrit'.",
    nuance: "Participles condense clauses into elegant phrases.",
  },
  {
    id: 5,
    type: "comparison",
    prompt: "Which shows better clause layering?",
    options: [
      "L'étude dit que le changement climatique est réel. Les scientifiques sont d'accord. Mais certains politiciens ne croient pas.",
      "Si l'étude confirme que le réchauffement climatique constitue une réalité scientifique établie, il n'en demeure pas moins que certains acteurs politiques persistent à en contester la portée.",
    ],
    correct: 1,
    explanation: "Conditional + subordinate que + sophisticated concession + formal 'persiste à en contester'.",
    nuance: "Multiple embedding creates density and sophistication.",
  },
  {
    id: 6,
    type: "rewrite",
    prompt: "Create a past participle absolute:",
    context: "The meeting finished. Everyone left.",
    options: [
      "La réunion était finie alors tout le monde est parti.",
      "La séance close, les participants se dispersèrent.",
      "Quand la réunion a fini, les gens sont partis.",
    ],
    correct: 1,
    explanation: "'Séance close' is elegant past participle absolute; 'se dispersèrent' elevates 'sont partis'.",
    nuance: "Past participle absolutes create formal, literary openings.",
  },
  {
    id: 7,
    type: "transformation",
    prompt: "Use nominalization for formality:",
    context: "They decided to expand. This will help them grow.",
    options: [
      "Ils ont décidé d'expansionner. Ça va les aider à grandir.",
      "La décision d'expansion, qui devrait favoriser leur développement, a été prise à l'unanimité.",
      "Ils ont choisi de s'agrandir pour devenir plus grands.",
    ],
    correct: 1,
    explanation: "Nominalization 'décision d'expansion' + relative clause + passive élevé.",
    nuance: "Nominalization creates abstract, formal register.",
  },
  {
    id: 8,
    type: "comparison",
    prompt: "Which demonstrates cleft mastery?",
    options: [
      "J'aime sa méthode de travail.",
      "Ce que j'apprécie particulièrement, c'est sa méthode de travail.",
    ],
    correct: 1,
    explanation: "Ce que... c'est cleft construction foregrounds the object of appreciation.",
    nuance: "Clefts with ce que/ce qui emphasize concepts rather than people.",
  },
  {
    id: 9,
    type: "rewrite",
    prompt: "Create a complex conditional:",
    context: "If it rains, the event will be cancelled, unless we find a solution.",
    options: [
      "S'il pleut, l'événement sera annulé, sauf si on trouve une solution.",
      "Si les précipitations venaient à compromettre la tenue de l'événement, une solution alternative devrait être envisagée, à moins que des dispositions ne soient prises.",
      "S'il pleut on annule, sauf si on a une idée.",
    ],
    correct: 1,
    explanation: "Formal 'précipitations' + 'compromettre la tenue' + subjunctive 'ne soient prises'.",
    nuance: "Complex conditionals use elegant vocabulary and subjunctive.",
  },
  {
    id: 10,
    type: "comparison",
    prompt: "Which shows better participial control?",
    options: [
      "Il est entré dans la salle et il portait un costume bleu et il regardait les gens.",
      "Vêtu d'un élégant costume bleu, il pénétra dans la salle, scrutant l'assistance.",
    ],
    correct: 1,
    explanation: "Past participle 'vêtu' for state + present participle 'scrutant' for action.",
    nuance: "Multiple participles create elegant, condensed description.",
  },
  {
    id: 11,
    type: "transformation",
    prompt: "Stack relative clauses elegantly:",
    context: "The book is famous. Its author won a prize. Everyone has read it.",
    options: [
      "Le livre est célèbre. Son auteur a gagné un prix. Tout le monde l'a lu.",
      "Cet ouvrage, dont l'auteur fut couronné d'un prestigieux prix et que chacun s'accorde à reconnaître comme majeur, occupe une place particulière dans la littérature.",
      "C'est un livre célèbre et tout le monde l'a lu et l'auteur a gagné.",
    ],
    correct: 1,
    explanation: "Dont for possession + que for object + elegant 'fut couronné' + 's'accorde à reconnaître'.",
    nuance: "Multiple relative pronouns create sophisticated information density.",
  },
  {
    id: 12,
    type: "comparison",
    prompt: "Which uses subordination most elegantly?",
    options: [
      "Les données montrent que c'est vrai. C'est important pour la recherche.",
      "Que ces données corroborent l'hypothèse confère à cette découverte une importance majeure pour l'avancement des connaissances.",
    ],
    correct: 1,
    explanation: "Subject clause 'Que ces données...' creates suspension; 'confère' is formal.",
    nuance: "Subject subordinate clauses create sophisticated opening.",
  },
  {
    id: 13,
    type: "rewrite",
    prompt: "Create a ce dont cleft:",
    context: "We need clarity",
    options: [
      "Nous avons besoin de clarté.",
      "Ce dont nous avons besoin, c'est d'une clarification.",
      "La clarté est ce qu'il nous faut.",
    ],
    correct: 1,
    explanation: "Ce dont... c'est cleft emphasizes the complement of 'besoin de'.",
    nuance: "Ce dont handles de-complements in clefts.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Combine using concessive subordination:",
    context: "He's talented. He hasn't succeeded yet.",
    options: [
      "Il est talentueux mais il n'a pas encore réussi.",
      "Talentueux qu'il soit, il n'a pas encore connu le succès.",
      "Bien qu'il ait du talent, il n'a pas réussi.",
    ],
    correct: 1,
    explanation: "Adjective + qu'il soit is literary concessive structure.",
    nuance: "Literary concessive (adjective + qu'il soit) elevates style.",
  },
  {
    id: 15,
    type: "comparison",
    prompt: "Which demonstrates best complex sentence mastery?",
    options: [
      "Le gouvernement a pris une décision. Les gens protestent. Ils ne changeront pas d'avis.",
      "Bien que la décision gouvernementale ait suscité des protestations, les autorités demeurent inflexibles sur leur position, ce qui laisse présager des tensions persistantes.",
    ],
    correct: 1,
    explanation: "Concessive + nominalization + 'demeurent inflexibles' + relative consequence.",
    nuance: "Mature sentences layer multiple grammatical relationships.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on combining relative clauses
 *   and using participial phrases, practicing nominalization
 * - 8-11/15: "Nice progress" - encourages working on clefts and participles,
 *   stacking multiple clauses
 * - 12-15/15: "Excellent syntactic mastery" - celebrates elegant, layered
 *   sentences with sophisticated subordination
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Complex sentences require practice. Focus on combining relative clauses and using participial phrases.",
      focus: "Practice nominalization and subordinate clause embedding.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your sentence construction is becoming sophisticated. Continue refining your use of clefts and participles.",
      focus: "Work on stacking multiple clauses and varying sentence openings.",
    };
  }
  return {
    title: "Excellent syntactic mastery",
    message: "You construct elegant, layered sentences with sophisticated subordination and precise nominalization.",
    focus: "Continue developing your ability to balance complexity with clarity.",
  };
}
