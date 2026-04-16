/**
 * C1 Module 1 - Precision in Expression
 * ======================================
 *
 * This file contains all lesson data for C1 Module 1, teaching advanced French
 * learners to express ideas with precision and clarity at the mastery level.
 *
 * **Module Content:**
 * - Introduction: The precision mindset, from vague to precise
 * - Weak vs Strong examples: Comparing imprecise and precise formulations
 * - Transformations: Sentence-level improvements with techniques
 * - Eliminating vague language: Common vague phrases and precise alternatives
 * - Choosing exact words: Semantic weight and nuance selection
 * - Avoiding repetition: Synonym chains, pronoun substitution, nominal/verbal alternation
 * - 15 practice quiz questions (rewrite, comparison, transformation, ambiguity types)
 *
 * **Key Concepts:**
 * - Precision: Choosing words that carry exactly the intended meaning
 * - Nominalization: Converting verbs to nouns for formal register
 * - Register elevation: Moving from casual to professional/formal language
 * - Elegant variation: Varying vocabulary while maintaining cohesion
 * - Specificity: Replacing general terms with exact measurements/contexts
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to precision in expression
 * 4. weakVsStrongExamples - Before/after comparison examples
 * 5. transformations - Sentence transformation examples
 * 6. vaguenessSection - Eliminating vague language guide
 * 7. exactWordsSection - Choosing exact words examples
 * 8. repetitionSection - Avoiding repetition techniques
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
 * 1. intro - Introduction to precision mindset
 * 2. vagueness - Eliminating vague language
 * 3. exact-words - Choosing exact words
 * 4. repetition - Avoiding repetition
 * 5. ambiguity - Eliminating ambiguity
 * 6. transformation - Sentence transformations
 * 7. practice - Interactive quiz
 * 8. completion - Module completion
 */
export const sectionIds = ["intro", "vagueness", "exact-words", "repetition", "ambiguity", "transformation", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Precision in Expression",
  /** Brief description of module content */
  subtitle: "Eliminate vague language, choose exact words, and express ideas with clarity and confidence. Move from 'sort of correct' to precisely right.",
  /** Module number in C1 series */
  moduleNumber: 1,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to precision in expression.
 *
 * Content:
 * - The Precision Mindset: Refining communication, eliminating fillers
 * - From Vague to Precise: Transforming general statements into specific ones
 */
export const introSections = [
  {
    title: "The Precision Mindset",
    content: "At C1, you already know how to communicate. Now you refine. Precision means choosing words that carry exactly the meaning you intend—no more, no less. It means eliminating fillers, replacing approximations with specifics, and structuring sentences for maximum clarity.",
  },
  {
    title: "From Vague to Precise",
    content: "French values precision. A statement like 'Les gens sont mécontents' is grammatically correct but imprecise. 'Les habitants du quartier expriment une méfiance croissante envers le projet' conveys specific meaning with authority.",
  },
];

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Before/after comparison of imprecise vs precise formulations.
 *
 * Each example shows:
 * - weak: Vague, casual, or imprecise formulation
 * - strong: Precise, formal, authoritative formulation
 * - why: Explanation of the improvements made
 * - context: Usage scenario
 *
 * Examples cover urban planning, weather reports, business strategy, and event analysis.
 */
export const weakVsStrongExamples = [
  {
    weak: "Les gens pensent que c'est un problème.",
    strong: "Les résidents manifestent une inquiétude croissante face à cette évolution.",
    why: "Replaces vague 'les gens' with specific 'résidents'; transforms passive 'pensent que' into active 'manifestent'; replaces generic 'problème' with nuanced 'inquiétude croissante'.",
    context: "Urban planning discussion",
  },
  {
    weak: "Il fait très froid ici.",
    strong: "Les températures avoisinent les -10°C, bien en dessous des normales saisonnières.",
    why: "Replaces subjective 'très froid' with precise measurement; adds context 'normales saisonnières' for comparison.",
    context: "Weather report / formal communication",
  },
  {
    weak: "C'est une bonne idée de faire ça.",
    strong: "Cette démarche s'avère stratégiquement pertinente compte tenu des contraintes actuelles.",
    why: "Replaces casual 'bonne idée' with analytical 'stratégiquement pertinente'; removes vague 'faire ça' with specific 'démarche'.",
    context: "Business / strategic planning",
  },
  {
    weak: "Beaucoup de personnes sont venues.",
    strong: "La participation a dépassé les attentes, avec près de trois cents présents.",
    why: "Transforms vague quantity 'beaucoup' into specific number; reframes from passive observation to active success metric.",
    context: "Event analysis / report",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Sentence transformation examples with techniques.
 *
 * Each transformation shows:
 * - original: Casual or vague sentence
 * - improved: Precise, formal version
 * - technique: Method used (e.g., "Nominalization + specificity")
 * - explanation: Detailed breakdown of improvements
 *
 * Techniques demonstrated:
 * - Nominalization + specificity
 * - Subject elevation + formal register
 * - Abstract precision + technical vocabulary
 */
export const transformations = [
  {
    original: "Il y a des choses qui ne vont pas.",
    improved: "Plusieurs dysfonctionnements structurels compromettent l'efficacité du processus.",
    technique: "Nominalization + specificity",
    explanation: "Replaces vague 'des choses' with technical 'dysfonctionnements structurels'; elevates casual 'qui ne vont pas' to analytical 'compromettent l'efficacité'.",
  },
  {
    original: "On devrait penser à cette question.",
    improved: "Cette problématique mérite une analyse approfondie avant toute décision.",
    technique: "Subject elevation + formal register",
    explanation: "Replaces informal 'on devrait' with authoritative 'mérite'; transforms generic 'penser' to rigorous 'analyse approfondie'.",
  },
  {
    original: "C'est compliqué de dire ce qui va se passer.",
    improved: "Les perspectives demeurent incertaines, tributaires de multiples variables.",
    technique: "Abstract precision + technical vocabulary",
    explanation: "Replaces casual 'compliqué' with analytical 'incertaines'; removes vague 'dire ce qui va se passer' with precise 'tributaires de multiples variables'.",
  },
];

// =============================================================================
// VAGUENESS SECTION
// =============================================================================

/**
 * vaguenessSection - Guide to eliminating vague language.
 *
 * Common vague phrases and their precise alternatives:
 * - des choses → des facteurs/éléments/aspects/considérations
 * - les gens → les citoyens/participants/résidents/acteurs
 * - faire → réaliser/mettre en œuvre/procéder à/effectuer
 * - très/beaucoup → significativement/considérablement/substantiellement
 * - problème → enjeu/défis/obstacle/difficulté/contrainte
 * - bon/mauvais → pertinent/stratégique/adéquat/inadapté/contre-productif
 */
export const vaguenessSection = {
  title: "Eliminating Vague Language",
  explanation: "Vague language creates distance between you and your reader. It signals uncertainty, lack of preparation, or disengagement.",
  commonVaguePhrases: [
    { vague: "des choses", precise: "des facteurs / des éléments / des aspects / des considérations" },
    { vague: "les gens", precise: "les citoyens / les participants / les résidents / les acteurs" },
    { vague: "faire", precise: "réaliser / mettre en œuvre / procéder à / effectuer" },
    { vague: "très / beaucoup", precise: "significativement / considérablement / substantiellement" },
    { vague: "problème", precise: "enjeu / défis / obstacle / difficulté / contrainte" },
    { vague: "bon / mauvais", precise: "pertinent / stratégique / adéquat / inadapté / contre-productif" },
  ],
};

// =============================================================================
// EXACT WORDS SECTION
// =============================================================================

/**
 * exactWordsSection - Guide to choosing exact words with precise semantic weight.
 *
 * Examples cover choosing between:
 * - Important: important, crucial, déterminant, capital, majeur
 * - Disagreement: je ne suis pas d'accord, je conteste, je m'oppose à, je réfute
 * - Growth: augmenter, progresser, se développer, s'accroître, se renforcer
 * - Analysis: regarder, examiner, analyser, scruter, évaluer
 *
 * Each example includes best choice and rationale.
 */
export const exactWordsSection = {
  title: "Choosing Exact Words",
  explanation: "Exact words carry precise semantic weight. They convey not just meaning but attitude, register, and nuance.",
  examples: [
    { context: "Saying something is important", options: ["important", "crucial", "déterminant", "capital", "majeur"], best: "déterminant", why: "Implies decisive influence on outcome" },
    { context: "Expressing disagreement", options: ["je ne suis pas d'accord", "je conteste", "je m'oppose à", "je réfute"], best: "je conteste", why: "Measured formality for professional contexts" },
    { context: "Indicating growth", options: ["augmenter", "progresser", "se développer", "s'accroître", "se renforcer"], best: "s'accroître", why: "Connotes steady, organic growth" },
    { context: "Describing analysis", options: ["regarder", "examiner", "analyser", "scruter", "évaluer"], best: "scruter", why: "Implies careful, detailed examination" },
  ],
};

// =============================================================================
// REPETITION SECTION
// =============================================================================

/**
 * repetitionSection - Techniques for avoiding repetition while maintaining cohesion.
 *
 * Techniques:
 * - Synonym chains: Progressive variation maintaining reference clarity
 * - Pronoun substitution: Demonstrative pronouns for elegant variation
 * - Nominal/verbal alternation: Same root, different grammatical forms
 * - Hyperonym/hyponym: General to specific and back
 */
export const repetitionSection = {
  title: "Avoiding Repetition",
  explanation: "Repetition weakens prose. Elegant French varies vocabulary while maintaining cohesion through concept rather than word repetition.",
  techniques: [
    { technique: "Synonym chains", example: "L'entreprise... Cette société... L'organisation... L'entité...", note: "Progressive variation maintaining reference clarity" },
    { technique: "Pronoun substitution", example: "Le projet... Celui-ci... Cette initiative...", note: "Demonstrative pronouns for elegant variation" },
    { technique: "Nominal/verbal alternation", example: "Le développement... se développer... cette croissance...", note: "Same root, different grammatical forms" },
    { technique: "Hyperonym/hyponym", example: "La politique... cette réforme spécifique... cette mesure...", note: "General to specific and back" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 1.
 *
 * Question types:
 * - rewrite (1, 5, 7, 11, 14): Rewrite sentences with precision
 * - comparison (2, 6, 9, 13): Compare formulations and choose best
 * - transformation (3, 8, 12, 15): Transform vague to precise
 * - ambiguity (4, 10): Eliminate ambiguity
 *
 * Topics covered:
 * - Academic/urban planning register
 * - Business/professional language
 * - Environmental reports
 * - Formal letters
 * - Economic analysis
 *
 * Each question has:
 * - id: unique identifier
 * - type: question category
 * - prompt: question text
 * - context: usage scenario
 * - options: array of 3 possible answers
 * - correct: index of correct option (0-2)
 * - explanation: detailed explanation
 * - nuance: additional insight
 */
export const practiceQuestions: { id: number; type: "rewrite" | "comparison" | "tone" | "transformation" | "ambiguity" | "connector"; prompt: string; context?: string; options: string[]; correct: number; explanation: string; nuance?: string; }[] = [
  {
    id: 1,
    type: "rewrite",
    prompt: "Choose the most precise version:",
    context: "Academic report on housing",
    options: [
      "Les gens du quartier n'aiment pas le projet.",
      "Les résidents expriment des réserves quant à ce projet d'aménagement.",      "Les habitants du secteur sont mécontents de cette construction.",
    ],
    correct: 1,
    explanation: "'Réserves' is precise and measured; 'résidents' is more formal than 'gens'; 'quant à' is elegant and precise.",
    nuance: "In academic contexts, measured disagreement ('réserves') is preferred to emotional reactions.",
  },
  {
    id: 2,
    type: "comparison",
    prompt: "Which sounds more professional?",
    options: [
      "C'est une bonne idée de faire ça maintenant.",
      "Il serait stratégiquement pertinent de procéder à cette étape dès présent.",
    ],
    correct: 1,
    explanation: "'Stratégiquement pertinent' elevates casual 'bonne idée'; 'procéder' replaces vague 'faire'; 'dès présent' is more formal than 'maintenant'.",
    nuance: "Register shift from casual to professional while maintaining the core meaning.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Transform this vague statement into precise language:",
    context: "Business analysis",
    options: [
      "Il y a beaucoup de problèmes avec ce système.",
      "Ce système présente plusieurs dysfonctionnements opérationnels significatifs.",
      "Ce système ne marche pas bien du tout.",
    ],
    correct: 1,
    explanation: "'Plusieurs' replaces vague 'beaucoup'; 'dysfonctionnements opérationnels' is technical and precise; 'significatifs' adds weight.",
    nuance: "Nominalization ('présente') creates distance and authority.",
  },
  {
    id: 4,
    type: "ambiguity",
    prompt: "Which eliminates ambiguity?",
    context: "Policy document",
    options: [
      "Les employés concernés doivent suivre cette formation.",
      "L'ensemble du personnel technique est tenu de valider ce module de certification avant le 30 juin.",
      "Tout le monde doit faire cette formation bientôt.",
    ],
    correct: 1,
    explanation: "Specifies who ('personnel technique'), what ('module de certification'), and when ('avant le 30 juin').",
    nuance: "Precision includes all relevant parameters: agent, action, timeframe.",
  },
  {
    id: 5,
    type: "rewrite",
    prompt: "Select the most elegant alternative to avoid repetition:",
    context: "The same company is mentioned three times",
    options: [
      "L'entreprise... L'entreprise... L'entreprise...",
      "L'entreprise... Cette société... Cette dernière...",
      "L'entreprise... La boîte... La structure...",
    ],
    correct: 1,
    explanation: "'Cette société' maintains formality; 'cette dernière' is elegant anaphoric reference.",
    nuance: "Elegant variation maintains register consistency.",
  },
  {
    id: 6,
    type: "comparison",
    prompt: "Which expresses the idea with more precision?",
    options: [
      "Les résultats sont très bons cette année.",
      "Les performances financières dépassent significativement les projections initiales.",
    ],
    correct: 1,
    explanation: "'Performances financières' specifies domain; 'dépassent significativement' is measurable; 'projections initiales' provides benchmark.",
    nuance: "Precision often means adding contextual benchmarks.",
  },
  {
    id: 7,
    type: "rewrite",
    prompt: "Choose the version with exact vocabulary:",
    context: "Research presentation",
    options: [
      "Nous avons regardé les données pendant longtemps.",
      "Nous avons analysé ces données de manière approfondie.",
      "Nous avons scruté ces données avec une attention particulière.",
    ],
    correct: 2,
    explanation: "'Scruter' implies careful, detailed examination—exactly what rigorous research requires.",
    nuance: "Word choice signals methodology rigor.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Transform into precise, formal language:",
    context: "Environmental report",
    options: [
      "La pollution augmente beaucoup.",
      "Les niveaux de pollution connaissent une augmentation préoccupante.",
      "La pollution est de plus en plus forte.",
    ],
    correct: 1,
    explanation: "'Niveaux' adds precision; 'connaissent une augmentation' is formal structure; 'préoccupante' evaluates significance.",
    nuance: "Evaluation adjectives add analytical depth.",
  },
  {
    id: 9,
    type: "comparison",
    prompt: "Which is more precise for academic writing?",
    options: [
      "Cette théorie est très importante pour comprendre.",
      "Cette théorie constitue un cadre interprétatif déterminant pour la compréhension du phénomène.",
    ],
    correct: 1,
    explanation: "'Constitue un cadre interprétatif' specifies theoretical role; 'déterminant' is precise evaluation; 'phénomène' is academic term.",
    nuance: "Academic precision requires theoretical framing.",
  },
  {
    id: 10,
    type: "ambiguity",
    prompt: "Which eliminates all ambiguity about timeframe?",
    options: [
      "Nous livrerons bientôt.",
      "La livraison est prévue pour le troisième trimestre 2024.",
      "Nous livrerons dans les prochains mois.",
    ],
    correct: 1,
    explanation: "Specific quarter and year eliminates all temporal uncertainty.",
    nuance: "Business precision requires specific temporal markers.",
  },
  {
    id: 11,
    type: "rewrite",
    prompt: "Select the most precise connector:",
    options: [
      "C'est pourquoi nous devons agir.",
      "Partant de ce constat, il convient d'intervenir sans délai.",
      "Donc nous devons faire quelque chose.",
    ],
    correct: 1,
    explanation: "'Partant de ce constat' explicitly links to previous analysis; 'il convient' is formal; 'sans délai' is precise urgency.",
    nuance: "Sophisticated connectors show logical reasoning explicitly.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Transform this casual statement:",
    context: "Formal letter",
    options: [
      "Je voudrais savoir si c'est possible de changer la date.",
      "Je souhaiterais connaître les modalités d'un éventuel report.",
      "Je veux changer la date, c'est possible ?",
    ],
    correct: 1,
    explanation: "'Souhaiterais' is conditional politeness; 'connaître les modalités' is precise inquiry; 'éventuel report' is formal vocabulary.",
    nuance: "Formality requires both vocabulary elevation and structural complexity.",
  },
  {
    id: 13,
    type: "comparison",
    prompt: "Which expresses cause with most precision?",
    options: [
      "Parce qu'il pleut, le match est annulé.",
      "En raison des conditions météorologiques défavorables, la rencontre est reportée.",
    ],
    correct: 1,
    explanation: "'Conditions météorologiques défavorables' is formal and precise; 'reportée' is more formal than 'annulé' in this context.",
    nuance: "Causal connectors carry register information.",
  },
  {
    id: 14,
    type: "rewrite",
    prompt: "Choose the most elegant and precise version:",
    options: [
      "Il faut faire attention à ce problème.",
      "Cette problématique mérite une attention particulière.",
      "On doit regarder ce problème de près.",
    ],
    correct: 1,
    explanation: "'Mérite' elevates 'faut'; 'problématique' is more analytical than 'problème'; 'attention particulière' is measured precision.",
    nuance: "Elegance comes from verb choice as much as noun choice.",
  },
  {
    id: 15,
    type: "transformation",
    prompt: "Transform into precise, analytical language:",
    context: "Economic analysis",
    options: [
      "L'économie va mal depuis quelques mois.",
      "La conjoncture économique présente une dégradation sensible depuis le début de l'exercice.",
      "Les choses économiques ne vont pas bien récemment.",
    ],
    correct: 1,
    explanation: "'Conjoncture économique' is technical term; 'dégradation sensible' is precise measurement; 'exercice' is formal timeframe.",
    nuance: "Economic discourse has specific technical vocabulary.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on eliminating vague words
 *   (choses, gens, faire) and practicing nominalization
 * - 8-11/15: "Nice progress" - encourages working on register-appropriate
 *   precision and elegant variation techniques
 * - 12-15/15: "Excellent precision" - celebrates precise, specific,
 *   authoritative expression
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Focus on eliminating vague words like 'choses', 'gens', 'faire' and replacing them with specific terms.",
      focus: "Practice nominalization and using technical vocabulary appropriate to context.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your expression is becoming more precise. Continue refining your vocabulary choices and avoiding approximations.",
      focus: "Work on register-appropriate precision and elegant variation techniques.",
    };
  }
  return {
    title: "Excellent precision",
    message: "Your French is precise, specific, and authoritative. You choose words that convey exact meaning with elegance.",
    focus: "Continue developing your ability to vary vocabulary while maintaining cohesion.",
  };
}
