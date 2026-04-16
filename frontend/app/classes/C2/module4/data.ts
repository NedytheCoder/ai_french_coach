/**
 * C2 Module 4 - Rhetoric & Persuasion
 * =====================================
 *
 * This file contains all lesson data for C2 Module 4, teaching mastery of
 * classical rhetoric and persuasive techniques. Students learn to construct
 * arguments that are both logically sound and rhetorically compelling.
 *
 * **Module Content:**
 * - Introduction: The art of persuasion, beyond logic
 * - Classical Rhetoric: 6 techniques (Anaphora, Antithesis, Gradatio, Praeteritio, Litotes, Rhetorical question)
 * - Weak/Strong/Expert examples: 3-tier persuasive progression
 * - Emphasis Patterns: 4 techniques (Cleft emphasis, Superlative + absolute, etc.)
 * - 15 practice quiz questions (rhetoric identification and transformation)
 *
 * **Six Classical Rhetoric Techniques:**
 * 1. Anaphora - Repetition at sentence openings for rhythm and emphasis
 * 2. Antithesis - Balanced contrast to sharpen distinction
 * 3. Gradatio - Climactic progression building intensity
 * 4. Praeteritio - Pretended omission (mentioning while claiming restraint)
 * 5. Litotes - Understatement via negation for sophisticated emphasis
 * 6. Rhetorical question - Question with implied answer to engage audience
 *
 * **Emphasis Patterns:**
 * - Cleft emphasis: C'est... qui construction for foregrounding
 * - Superlative + absolute: La plus... qui soit for maximum evaluation
 * - Double negation: Il n'est pas impossible for hedged emphasis
 * - Enumerative climax: Non pas X, ni Y, mais Z for building to preferred option
 *
 * **Key Concepts:**
 * - Classical rhetoric as tools of intellectual influence
 * - Combining logic with emotional and stylistic force
 * - Personification for persuasive power (appeler, commander)
 * - Litotic understatement: 'n'est pas dépourvu', 'nul ne saurait éluder'
 * - Concessive refutation: Conceding before dismantling
 * - Persuasive enumeration: 'Trois impératifs, tous d'une urgence vitale'
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to rhetorical mastery
 * 4. rhetoricTechniques - Six classical rhetoric techniques
 * 5. weakStrongExpertExamples - 3-tier persuasive progression
 * 6. emphasisPatterns - Four emphasis techniques
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
 * 1. intro - Introduction to the art of persuasion
 * 2. rhetoric - Classical rhetoric techniques
 * 3. persuasion - Persuasive language strategies
 * 4. emphasis - Emphasis patterns and techniques
 * 5. contrast - Contrast and antithesis
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "rhetoric", "persuasion", "emphasis", "contrast", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Rhetoric & Persuasion",
  /** Brief description of module content */
  subtitle: "Master convincing arguments, emphasis techniques, and persuasive language. Develop the rhetorical power of a native speaker.",
  /** Module number in C2 series */
  moduleNumber: 4,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to rhetoric and persuasion mastery.
 *
 * Content:
 * - The Art of Persuasion: Classical techniques as tools of intellectual influence
 * - Beyond Logic: Combining rigorous reasoning with emotional and stylistic force
 */
export const introSections = [
  {
    title: "The Art of Persuasion",
    content: "At C2, persuasion is an art form. You construct arguments that are not just logically sound but rhetorically compelling. You use classical techniques—anaphora, antithesis, gradatio—not as ornaments but as tools of intellectual influence.",
  },
  {
    title: "Beyond Logic",
    content: "Logic convinces the mind; rhetoric moves the will. C2 mastery means combining both: rigorous reasoning presented with emotional and stylistic force. Your arguments should be irrefutable and unforgettable.",
  },
];

// =============================================================================
// CLASSICAL RHETORIC TECHNIQUES
// =============================================================================

/**
 * rhetoricTechniques - Six classical rhetoric techniques for C2 mastery.
 *
 * Techniques:
 * - Anaphora: Repetition at sentence openings (Nous voulons... Nous voulons...)
 * - Antithesis: Balanced contrast (Non pas l'immobilisme, mais le progrès)
 * - Gradatio: Climactic progression (Une erreur. Un risque. Un danger mortel.)
 * - Praeteritio: Pretended omission (Je n'insisterai pas sur... nombreux qu'ils soient)
 * - Litotes: Understatement via negation (n'est pas dépourvu d'intérêt)
 * - Rhetorical question: Question with implied answer (Comment pourrions-nous...?)
 *
 * Each technique includes description, example, and effect explanation.
 */
export const rhetoricTechniques = {
  title: "Classical Rhetoric for C2",
  techniques: [
    { technique: "Anaphora", description: "Repetition at sentence openings", example: "Nous voulons la sécurité. Nous voulons l'avenir. Nous voulons l'action.", effect: "Creates rhythm and emphasis" },
    { technique: "Antithesis", description: "Balanced contrast", example: "Non pas l'immobilisme, mais le progrès. Non pas la peur, mais l'espoir.", effect: "Sharpens distinction" },
    { technique: "Gradatio", description: "Climactic progression", example: "Une erreur. Un risque. Un danger mortel.", effect: "Builds intensity" },
    { technique: "Praeteritio", description: "Pretended omission", example: "Je n'insisterai pas sur ses défauts, nombreux qu'ils soient.", effect: "Mentions while claiming restraint" },
    { technique: "Litotes", description: "Understatement via negation", example: "Cette réussite n'est pas dépourvue d'intérêt.", effect: "Sophisticated emphasis" },
    { technique: "Rhetorical question", description: "Question with implied answer", example: "Comment pourrions-nous, en conscience, ignorer ces faits?", effect: "Engages audience" },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES
// =============================================================================

/**
 * weakStrongExpertExamples - Three-tier progression in rhetorical persuasion.
 *
 * Examples showing persuasive sophistication:
 * - Direct statement → nominalization + 'indéniables' + personified 'méritent' → 'indiscutables' + 'appellent'
 * - Vague 'beaucoup de raisons' → specific 'trois considérations' + 'commandent' → 'impératifs' + 'urgence vitale'
 * - Simple contrast → relational vocabulary + 'voie médiane' → subject clause + 'persiste à s'affronter'
 * - Direct statement → 'équivaudrait' + 'faute grave' → 'faire l'impasse' + litotic 'ne saurait manquer'
 *
 * Each includes detailed analysis of the persuasive progression.
 */
export const weakStrongExpertExamples = [
  {
    weak: "Je pense que c'est une bonne idée et vous devriez l'accepter.",
    strong: "Cette approche présente des avantages indéniables qui méritent votre considération.",
    expert: "Les avantages indiscutables de cette approche, qui sautent aux yeux de l'observateur attentif, appellent votre adhésion pleine et entière.",
    analysis: "Progression: direct statement → nominalization + 'indéniables' + personified 'méritent' → 'indiscutables' + relative + 'sautent aux yeux' + 'appellent' + 'pleine et entière'.",
  },
  {
    weak: "Il y a beaucoup de raisons pour lesquelles nous devons agir maintenant.",
    strong: "Trois considérations déterminantes commandent une intervention immédiate.",
    expert: "Trois impératifs, tous d'une urgence vitale, commandent que nous agissions sans délai, et ce, pour des raisons que nul ne saurait éluder en toute conscience.",
    analysis: "Progression: vague 'beaucoup de raisons' → specific 'trois considérations' + 'commandent' → 'impératifs' + 'urgence vitale' + subjunctive + litotic 'nul ne saurait éluder'.",
  },
  {
    weak: "Certains pensent A, d'autres pensent B. Moi je pense C.",
    strong: "Si les partisans de A et les défenseurs de B continuent de s'opposer, il apparaît pourtant que C constitue la voie médiane la plus prometteuse.",
    expert: "Que les tenants de A et les adeptes de B persistent à s'affronter sur ce point fondamental n'en demeure pas moins que C, loin d'être une simple position de conciliation, représente l'option la plus conforme à nos intérêts stratégiques.",
    analysis: "Progression: simple contrast → relational vocabulary + 'apparaît' + 'voie médiane' → subject clause + 'persiste à s'affronter' + 'n'en demeure pas moins' + 'loin d'être' + 'représente'.",
  },
  {
    weak: "C'est une erreur de ne pas considérer les conséquences.",
    strong: "Ignorer les conséquences équivaudrait à une faute grave.",
    expert: "Faire l'impasse sur les conséquences, aussi lointaines qu'elles puissent sembler, ne saurait manquer de constituer une faute dont les effets se feraient immanquablement sentir.",
    analysis: "Progression: direct statement → nominalization 'équivaudrait' + 'faute grave' → 'faire l'impasse' + concessive + litotic 'ne saurait manquer' + 'immanquablement'.",
  },
];

// =============================================================================
// EMPHASIS PATTERNS
// =============================================================================

/**
 * emphasisPatterns - Four rhetorical emphasis techniques.
 *
 * Patterns:
 * - Cleft emphasis: C'est... qui construction foregrounds specific element
 * - Superlative + absolute: La plus... qui soit creates maximum evaluation
 * - Double negation: Il n'est pas impossible... for hedged but emphatic
 * - Enumerative climax: Non pas X, ni Y, mais Z builds to preferred option
 *
 * Each pattern includes example and effect description.
 */
export const emphasisPatterns = {
  title: "Emphasis Patterns",
  patterns: [
    { pattern: "Cleft emphasis", example: "C'est cette dimension qui mérite attention.", effect: "Foregrounds specific element" },
    { pattern: "Superlative + absolute", example: "C'est la solution la plus adéquate qui soit.", effect: "Maximum evaluation" },
    { pattern: "Double negation", example: "Il n'est pas impossible que...", effect: "Hedged but emphatic" },
    { pattern: "Enumerative climax", example: "Non pas X, ni Y, mais Z.", effect: "Builds to preferred option" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C2 Module 4.
 *
 * Question types:
 * - rhetoric (1, 3, 5, 7, 9, 11, 13, 15): Identify rhetorical techniques
 * - transformation (2, 4, 6, 8, 10, 12, 14): Transform using rhetoric
 *
 * Topics covered:
 * - Anaphora: Repetition at sentence openings for rhythmic effect
 * - Antithesis: 'Non pas... mais' for sharp balanced contrast
 * - Gradatio: Climactic triad building intensity (error → risk → danger)
 * - Praeteritio: Pretended omission with 'nombreux qu'ils soient'
 * - Litotes: Double negative 'n'est pas dépourvu' for understatement
 * - Rhetorical questions: 'Comment pourrions-nous' for engagement
 * - Cleft emphasis: C'est... qui construction for foregrounding
 * - Superlative + absolute: 'la plus adéquate qui soit' for maximum evaluation
 * - Enumerative climax: 'Non pas X, ni Y, mais Z' for building to preference
 * - Personification: 'commandent' for persuasive power
 * - Sophisticated thesis: 'Je soutiens' + litotic 'loin d'être'
 * - Persuasive elegance: 'appellent' + 'adhésion pleine et entière'
 * - Rhetorical refutation: Concession 'certes séduisante' before dismantling
 * - Double negation: 'Il n'est pas impossible' for hedged emphasis
 * - Integrated mastery: Enumeration + personification + litotes combined
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
    prompt: "Which uses anaphora (repetition) most effectively?",
    options: [
      "Nous voulons la sécurité, l'avenir, et l'action.",
      "Nous voulons la sécurité. Nous voulons l'avenir. Nous voulons l'action.",
    ],
    correct: 1,
    explanation: "Repetition of 'nous voulons' at sentence opening creates rhythmic anaphora.",
    nuance: "Anaphora requires identical openings for rhythmic effect.",
  },
  {
    id: 2,
    type: "transformation",
    prompt: "Transform using antithesis:",
    context: "We don't want stagnation, we want progress",
    options: [
      "Nous ne voulons pas l'immobilisme, nous voulons le progrès.",
      "Non pas l'immobilisme, mais le progrès.",
    ],
    correct: 1,
    explanation: "'Non pas... mais' creates sharp, balanced antithesis.",
    nuance: "Antithesis creates memorable binary opposition.",
  },
  {
    id: 3,
    type: "rhetoric",
    prompt: "Which uses gradatio (climax) best?",
    options: [
      "C'est un problème grave.",
      "Une erreur. Un risque. Un danger mortel.",
    ],
    correct: 1,
    explanation: "Triad building from error to risk to mortal danger creates crescendo.",
    nuance: "Gradatio builds intensity through progression.",
  },
  {
    id: 4,
    type: "transformation",
    prompt: "Use praeteritio (pretended omission):",
    context: "Mentioning opponent's many flaws while appearing fair",
    options: [
      "Votre adversaire a beaucoup de défauts.",
      "Je n'insisterai pas sur les défauts de votre adversaire, nombreux qu'ils soient.",
    ],
    correct: 1,
    explanation: "Claims restraint while ensuring mention; 'nombreux qu'ils soient' emphasizes.",
    nuance: "Praeteritio allows negative mention with plausible deniability.",
  },
  {
    id: 5,
    type: "rhetoric",
    prompt: "Which uses litotes (understatement) most elegantly?",
    options: [
      "C'est très important.",
      "Ceci n'est pas dépourvu d'importance.",
    ],
    correct: 1,
    explanation: "Double negative 'n'est pas dépourvu' understates for sophisticated emphasis.",
    nuance: "Litotes can be more persuasive than hyperbole.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Create rhetorical question for engagement:",
    context: "We cannot ignore this",
    options: [
      "Nous ne pouvons pas ignorer ceci.",
      "Comment pourrions-nous, en toute conscience, faire l'impasse sur une telle évidence?",
    ],
    correct: 1,
    explanation: "'Comment pourrions-nous' + 'en toute conscience' + 'faire l'impasse' + 'telle évidence' = sophisticated.",
    nuance: "Rhetorical questions engage through implied obviousness.",
  },
  {
    id: 7,
    type: "rhetoric",
    prompt: "Which creates most persuasive cleft emphasis?",
    options: [
      "Cette dimension est importante.",
      "C'est cette dimension qui mérite attention.",
    ],
    correct: 1,
    explanation: "C'est... qui cleft construction foregrounds the specific element.",
    nuance: "Clefts create emphatic focus on chosen element.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Transform to maximum persuasive power:",
    context: "This is the best option",
    options: [
      "C'est la meilleure option.",
      "C'est la solution la plus adéquate qui soit.",
    ],
    correct: 1,
    explanation: "'La plus adéquate' + 'qui soit' (superlative absolute) = maximum evaluation.",
    nuance: "Superlative + absolute creates maximum persuasion.",
  },
  {
    id: 9,
    type: "rhetoric",
    prompt: "Which uses enumerative climax best?",
    options: [
      "Nous devons choisir A ou B ou C.",
      "Non pas X, ni Y, mais Z.",
    ],
    correct: 1,
    explanation: "'Non pas... ni... mais' rejects options before affirming preferred choice.",
    nuance: "Enumerative climax builds to the preferred option.",
  },
  {
    id: 10,
    type: "transformation",
    prompt: "Persuade through personification:",
    context: "The data shows we must act",
    options: [
      "Les données montrent que nous devons agir.",
      "Les données, qui ne sauraient être ignorées en toute conscience, commandent une intervention résolue.",
    ],
    correct: 1,
    explanation: "Litotic 'ne sauraient être ignorées' + personified 'commandent' + 'intervention résolue'.",
    nuance: "Personification makes abstract entities agents.",
  },
  {
    id: 11,
    type: "rhetoric",
    prompt: "Which creates most sophisticated thesis statement?",
    options: [
      "Je pense que A est mieux que B.",
      "Je soutiens que A, loin d'être une simple alternative à B, représente l'option stratégiquement la plus pertinente.",
    ],
    correct: 1,
    explanation: "'Je soutiens' + litotic 'loin d'être' + 'représente' + evaluative 'stratégiquement pertinente'.",
    nuance: "Strong thesis combines assertion with evaluation.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Create maximum persuasive elegance:",
    context: "We should accept this proposal",
    options: [
      "Nous devrions accepter cette proposition.",
      "Les avantages indiscutables de cette approche appellent votre adhésion pleine et entière.",
    ],
    correct: 1,
    explanation: "'Indiscutables' + personified 'appellent' + 'adhésion pleine et entière' = elegant.",
    nuance: "Elegant persuasion uses personification and absolutes.",
  },
  {
    id: 13,
    type: "rhetoric",
    prompt: "Which handles refutation most rhetorically?",
    options: [
      "Vous avez tort.",
      "Cette interprétation, certes séduisante, ne résiste pas à un examen attentif.",
    ],
    correct: 1,
    explanation: "Concession 'certes séduisante' + elegant refutation 'ne résiste pas'.",
    nuance: "Rhetorical refutation concedes before dismantling.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Use double negation for hedged emphasis:",
    context: "This is possible",
    options: [
      "C'est possible.",
      "Il n'est pas impossible que...",
    ],
    correct: 1,
    explanation: "Double negative 'n'est pas impossible' hedges while emphasizing.",
    nuance: "Double negation creates sophisticated tentativeness.",
  },
  {
    id: 15,
    type: "rhetoric",
    prompt: "Which demonstrates best integrated persuasive mastery?",
    options: [
      "Je pense qu'il faut faire ça parce que c'est bien.",
      "Trois impératifs, tous d'une urgence vitale, commandent que nous agissions sans délai, pour des raisons que nul ne saurait éluder en toute conscience.",
    ],
    correct: 1,
    explanation: "Enumeration + 'urgence vitale' + personified 'commandent' + subjunctive + litotic 'nul ne saurait éluder'.",
    nuance: "Persuasive mastery combines multiple rhetorical devices.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on classical techniques (anaphora,
 *   antithesis, litotes), cleft constructions, and rhetorical questions
 * - 8-11/15: "Strong performance" - encourages refining personification and
 *   litotes, combining multiple rhetorical devices for maximum effect
 * - 12-15/15: "Excellent rhetorical mastery" - celebrates powerful rhetorical
 *   control with elegant persuasion combining logic and style
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Rhetoric requires practice with classical techniques. Focus on anaphora, antithesis, and litotes.",
      focus: "Practice using cleft constructions and rhetorical questions for emphasis.",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your persuasive skills are developing well. Continue refining your use of personification and litotes.",
      focus: "Work on combining multiple rhetorical devices for maximum effect.",
    };
  }
  return {
    title: "Excellent rhetorical mastery",
    message: "Your French demonstrates powerful rhetorical control. You persuade with elegance, combining logic and style seamlessly.",
    focus: "Continue developing your ability to adapt rhetorical strategies to different audiences.",
  };
}
