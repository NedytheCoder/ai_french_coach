/**
 * C2 Module 1 - Precision & Subtle Meaning
 * =========================================
 *
 * This file contains all lesson data for C2 Module 1, the first module of the
 * C2 (Mastery/Proficiency) level. Students develop near-native precision in
 * French expression, mastering fine lexical distinctions and eliminating ambiguity.
 *
 * **Module Content:**
 * - Introduction: The precision of mastery, beyond synonyms
 * - Fine lexical distinctions: 6 word pairs with nuanced differences
 *   (suggérer/insinuer, décliner/refuser, profond/radical, etc.)
 * - Weak/Strong/Expert examples: 3-tier progression showing skill levels
 * - Nuance shifts: Lexical progressions showing increasing formality
 *   (problème → difficulté → contrainte → obstacle → enjeu)
 * - Transformations: Original → Improved → Expert level examples
 * - 15 practice quiz questions (precision, transformation, interpretation types)
 *
 * **Key Concepts:**
 * - Fine lexical distinctions: suggérer (gentle proposal) vs insinuer (implication, often negative)
 * - Register awareness: décliner (formal refusal) vs refuser (direct rejection)
 * - Connotation precision: profond (thorough) vs radical (transformative)
 * - Three-tier progression: Weak → Strong → Expert transformations
 * - Nuance shifts: Progressively formal vocabulary chains
 * - Technical vocabulary: 'dysfonctionnements', 'travers', 'irréductible'
 * - Literary terms: 'esquisser', 'feutrés', 'percevait'
 * - Personification: 'commande', 'trahissent'
 * - Litotic negation: 'loin d'être circonscrits'
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to C2 precision mastery
 * 4. fineDistinctions - Lexical pairs with nuanced differences
 * 5. weakStrongExpertExamples - 3-tier progression examples (weak/strong/expert)
 * 6. nuanceShifts - Formal vocabulary progressions
 * 7. transformations - 3-tier transformation examples
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
 * 1. intro - Introduction to precision mastery
 * 2. fine-distinctions - Lexical distinction pairs
 * 3. nuance-shifts - Vocabulary progressions
 * 4. ambiguity - Eliminating ambiguity
 * 5. lexical-precision - Precision techniques
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "fine-distinctions", "nuance-shifts", "ambiguity", "lexical-precision", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Precision & Subtle Meaning",
  /** Brief description of module content */
  subtitle: "Master fine lexical distinctions and eliminate ambiguity. Develop the precision of a near-native speaker in expressing subtle meaning differences.",
  /** Module number in C2 series */
  moduleNumber: 1,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to C2 precision and subtle meaning.
 *
 * Content:
 * - The Precision of Mastery: Choosing between near-synonyms with confidence
 * - Beyond Synonyms: Understanding connotations, registers, and collocations
 */
export const introSections = [
  {
    title: "The Precision of Mastery",
    content: "At C2, you operate at near-native precision. You choose between 'suggérer' and 'insinuer', 'décliner' and 'refuser', 'profond' and 'radical' with the confidence of someone who feels the weight of each word. This module trains your sensitivity to fine distinctions.",
  },
  {
    title: "Beyond Synonyms",
    content: "French words that seem synonymous often carry different connotations, registers, or collocations. 'Important' and 'majeur' are not interchangeable—one is evaluative, the other structural. C2 mastery means knowing exactly which word carries your intended meaning.",
  },
];

// =============================================================================
// FINE LEXICAL DISTINCTIONS
// =============================================================================

/**
 * fineDistinctions - Word pairs with subtle but significant differences.
 *
 * Pairs covered:
 * - suggérer (gentle proposal, open) vs insinuer (implication, often negative)
 * - décliner (polite formal refusal) vs refuser (direct neutral rejection)
 * - profond (deep, thorough) vs radical (fundamental, transformative)
 * - considérable (large in scope) vs substantiel (significant in substance)
 * - manifeste (obvious to all) vs flagrant (blatant, shocking)
 * - rigoureux (strict, precise) vs sévère (harsh, punishing)
 */
export const fineDistinctions = {
  title: "Fine Lexical Distinctions",
  pairs: [
    { word1: "suggérer", nuance1: "Gentle proposal, open to discussion", word2: "insinuer", nuance2: "Subtle implication, often negative", context: "Suggérer une solution vs insinuer quelque chose" },
    { word1: "décliner", nuance1: "Polite refusal, formal", word2: "refuser", nuance2: "Direct rejection, neutral", context: "Décliner une invitation vs refuser une demande" },
    { word1: "profond", nuance1: "Deep, thorough", word2: "radical", nuance2: "Fundamental, transformative", context: "Une réforme profonde vs une réforme radicale" },
    { word1: "considérable", nuance1: "Large in size/scope", word2: "substantiel", nuance2: "Significant in substance", context: "Des coûts considérables vs des progrès substantiels" },
    { word1: "manifeste", nuance1: "Obvious, visible to all", word2: "flagrant", nuance2: "Blatant, shocking in its obviousness", context: "Une erreur manifeste vs une injustice flagrante" },
    { word1: "rigoureux", nuance1: "Strict, precise", word2: "sévère", nuance2: "Harsh, punishing", context: "Une analyse rigoureuse vs une sanction sévère" },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES
// =============================================================================

/**
 * weakStrongExpertExamples - Three-tier progression showing skill levels.
 *
 * Each example shows:
 * - weak: Basic, vague expression
 * - strong: Improved with metaphor and precision
 * - expert: Sophisticated with technical terms, literary language, complex syntax
 * - analysis: Explanation of the progression
 *
 * Examples cover: differences between ideas, indirect criticism, project problems,
 * attention to detail
 */
export const weakStrongExpertExamples = [
  {
    weak: "C'est une très grande différence entre les deux idées.",
    strong: "Un fossé sépare ces deux conceptions, radicalement divergentes.",
    expert: "Ces deux conceptions, que tout oppose fondamentalement, présentent un écart structurel irréductible.",
    analysis: "Progression: generic 'très grande différence' → metaphor 'fossé' + 'radicalement' → nominal 'écart structurel' + 'irréductible' (technical).",
  },
  {
    weak: "Il a dit que c'était mal mais sans être trop direct.",
    strong: "Il a suggéré, avec une certaine prudence, que cette approche comportait des failles.",
    expert: "Il a esquissé, en termes feutrés, les limitations d'une méthode dont il percevait, de manière aiguë, les travers.",
    analysis: "Progression: vague 'dit mal' → precise 'suggéré' + 'prudence' + 'failles' → literary 'esquissé' + 'feutrés' + 'percevait' + 'travers' (critical term).",
  },
  {
    weak: "Le projet a beaucoup de problèmes et ça ne va pas fonctionner.",
    strong: "Ce projet présente des dysfonctionnements majeurs qui compromettent sa viabilité.",
    expert: "Les dysfonctionnements structurels que révèle ce projet, loin d'être circonscrits, en compromettent l'architecture même.",
    analysis: "Progression: vague 'beaucoup de problèmes' → technical 'dysfonctionnements' + 'compromettent viabilité' → relative 'que révèle' + litotic 'loin d'être circonscrits' + 'architecture même'.",
  },
  {
    weak: "Je pense qu'il faut faire attention à ce détail.",
    strong: "Ce détail mérite une attention particulière, compte tenu de son incidence potentielle.",
    expert: "L'importance stratégique de cet élément, toute relative qu'elle puisse sembler, justifie qu'on lui accorde la plus grande attention.",
    analysis: "Progression: generic 'faire attention' → formal 'mérite attention' + 'compte tenu' → concessive 'toute relative' + subjunctive 'justifie qu'on lui accorde'.",
  },
];

// =============================================================================
// NUANCE SHIFTS
// =============================================================================

/**
 * nuanceShifts - Vocabulary progressions showing increasing formality.
 *
 * Progressions:
 * - problème → difficulté → contrainte → obstacle → enjeu
 * - changer → modifier → réviser → réformer → transformer
 * - important → significatif → majeur → déterminant → crucial
 * - dire → indiquer → souligner → mettre en évidence → mettre en lumière
 */
export const nuanceShifts = {
  title: "Nuance Shifts in Context",
  examples: [
    { base: "problème", shift: "difficulté → contrainte → obstacle → enjeu", analysis: "Increasing formality and analytical framing" },
    { base: "changer", shift: "modifier → réviser → réformer → transformer", analysis: "Increasing scope and systematicity" },
    { base: "important", shift: "significatif → majeur → déterminant → crucial", analysis: "Increasing decisiveness and weight" },
    { base: "dire", shift: "indiquer → souligner → mettre en évidence → mettre en lumière", analysis: "Increasing formality and emphasis" },
  ],
};

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Three-tier transformation examples (original → improved → expert).
 *
 * Examples showing progression from basic to sophisticated expression:
 * - Nominalization + litotic negation + personification
 * - Antithesis + nominalization + interpretive conclusion
 * - Litotes + temporal reference + formal comparison
 */
export const transformations = [
  {
    original: "C'est une chose très importante qu'il faut bien regarder.",
    improved: "Cette dimension revêt une importance capitale et mérite un examen attentif.",
    expert: "La portée de cette dimension, qu'il convient de ne point sous-estimer, commande une investigation approfondie.",
    technique: "Nominalization + litotic negation + personification",
  },
  {
    original: "Il y a des différences entre ce qu'ils disent et ce qu'ils font.",
    improved: "Un écart significatif sépare leurs déclarations de leurs actions effectives.",
    expert: "Ces écarts, entre les visées affichées et les réalisations effectives, trahissent des priorités mal alignées.",
    technique: "Antithesis + nominalization + interpretive conclusion",
  },
  {
    original: "Le résultat n'est pas très bon selon moi.",
    improved: "Cette performance laisse à désirer, eu égard aux attentes initiales.",
    expert: "Les résultats obtenus, sans être décevants en soi, demeurent en-deçà des objectifs que nous nous étions fixés.",
    technique: "Litotes + temporal reference + formal comparison",
  },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C2 Module 1.
 *
 * Question types:
 * - precision (1, 2, 4, 6, 8, 10, 13): Choose most precise word for context
 * - transformation (3, 5, 9, 12, 15): Transform to expert level
 * - ambiguity (7): Eliminate ambiguity elegantly
 * - interpretation (11): Interpret nuance of sophisticated structures
 * - rhetoric (14): Create sophisticated antithesis
 *
 * Topics covered:
 * - suggérer vs insinuer connotations
 * - Formal refusal (décliner vs refuser)
 * - Technical vocabulary for differences (divergences structurelles)
 * - Evaluative weight (flagrant vs manifeste)
 * - Personification + nominalization
 * - Academic register (substantiel vs considérable)
 * - Acknowledging ambiguity elegantly
 * - Methodological precision (rigoureuse vs sévère)
 * - Literary expression (esquisser, feutrés, travers)
 * - Root-level change (radical vs profond)
 * - Concessive structures (toute relative qu'elle puisse sembler)
 * - Precise analytical terms (indicateurs, dégradation sensible)
 * - Subtle indirect communication (suggérer)
 * - Sophisticated antithesis with technical terms
 * - Expert transformations (portée stratégique + commande)
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
    type: "precision",
    prompt: "Choose the most precise word for this context: 'She ___ that he was incompetent' (implied, not stated directly, somewhat negative)",
    options: ["a suggéré", "a insinué", "a dit", "a expliqué"],
    correct: 1,
    explanation: "'Insinuer' carries the negative connotation of subtle, implied criticism that 'suggérer' lacks.",
    nuance: "Insinuer implies without stating; often used for criticism.",
  },
  {
    id: 2,
    type: "precision",
    prompt: "Select the most appropriate for a formal refusal of an invitation:",
    options: ["refuser", "décliner", "rejeter", "repousser"],
    correct: 1,
    explanation: "'Décliner' is the formal, polite term for refusing invitations; 'refuser' is more direct.",
    nuance: "Décliner is specifically for invitations; more elegant than refuser.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Transform to expert level: 'There are big differences between these approaches'",
    options: [
      "Il y a de grandes différences entre ces approches.",
      "Un fossé sépare ces approches radicalement différentes.",
      "Ces approches présentent des divergences structurelles irréductibles.",
    ],
    correct: 2,
    explanation: "'Divergences structurelles irréductibles' is technical, precise, and formal.",
    nuance: "Expert level uses technical vocabulary and nominalization.",
  },
  {
    id: 4,
    type: "precision",
    prompt: "Choose the word with the strongest evaluative weight: 'A ___ error'",
    options: ["manifeste", "flagrante", "claire", "évidente"],
    correct: 1,
    explanation: "'Flagrant' implies not just obvious but shockingly so; carries moral weight.",
    nuance: "Flagrant suggests the error is visible and inexcusable.",
  },
  {
    id: 5,
    type: "transformation",
    prompt: "Elevate: 'We need to look at this problem carefully'",
    options: [
      "Nous devons regarder ce problème attentivement.",
      "Cette problématique mérite un examen approfondi.",
      "La portée de cette problématique commande une investigation minutieuse.",
    ],
    correct: 2,
    explanation: "'Portée' + 'commande' (personification) + 'investigation minutieuse' creates expert level.",
    nuance: "Expert level combines nominalization with personification.",
  },
  {
    id: 6,
    type: "precision",
    prompt: "Which expresses 'significant' in the most formal, analytical register?",
    options: ["important", "considérable", "substantiel", "majeur"],
    correct: 2,
    explanation: "'Substantiel' connotes significance in substance/essence; preferred in academic contexts.",
    nuance: "Substantiel suggests weight in substance rather than size.",
  },
  {
    id: 7,
    type: "ambiguity",
    prompt: "Which eliminates ambiguity most elegantly?",
    context: "Referring to multiple possible interpretations",
    options: [
      "Il y a plusieurs façons de comprendre cela.",
      "Cette ambiguïté fondamentale appelle une clarification.",
      "Plusieurs lectures, toutes légitimes, s'offrent à nous.",
    ],
    correct: 2,
    explanation: "'Lectures' (interpretations) + 'toutes légitimes' acknowledges validity + 's'offrent' is elegant.",
    nuance: "Ambiguity can be acknowledged elegantly without judgment.",
  },
  {
    id: 8,
    type: "precision",
    prompt: "Choose for academic context: 'A ___ analysis' (strict, methodical)",
    options: ["sévère", "rigoureuse", "stricte", "dure"],
    correct: 1,
    explanation: "'Rigoureuse' implies methodological precision without the harshness of 'sévère' or 'stricte'.",
    nuance: "Rigoureux is the academic term for methodical precision.",
  },
  {
    id: 9,
    type: "transformation",
    prompt: "Expert transformation: 'He said there were problems'",
    options: [
      "Il a dit qu'il y avait des problèmes.",
      "Il a esquissé les dysfonctionnements observés.",
      "Il a esquissé, en termes feutrés, les limitations d'une méthode dont il percevait les travers.",
    ],
    correct: 2,
    explanation: "Full expert version with literary 'esquissé', 'feutrés', 'percevait', 'travers'.",
    nuance: "Expert level uses multiple literary and technical terms.",
  },
  {
    id: 10,
    type: "precision",
    prompt: "Which indicates the most fundamental level of change?",
    options: ["profond", "radical", "important", "significatif"],
    correct: 1,
    explanation: "'Radical' goes to the root (radix); implies transformation at the foundation.",
    nuance: "Radical = root-level; structural rather than surface.",
  },
  {
    id: 11,
    type: "interpretation",
    prompt: "What nuance does 'toute relative qu'elle puisse sembler' add?",
    options: ["Dismissal", "Concession", "Emphasis", "Confusion"],
    correct: 1,
    explanation: "Concessive clause acknowledges potential objection while maintaining position.",
    nuance: "Concessive structures show awareness of counterarguments.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Transform to eliminate vagueness: 'Things are not going well'",
    options: [
      "Les choses ne vont pas bien.",
      "La situation présente des dysfonctionnements.",
      "Les indicateurs révèlent une dégradation sensible de la situation.",
    ],
    correct: 2,
    explanation: "'Indicateurs' + 'révèlent' + 'dégradation sensible' = precise, analytical, formal.",
    nuance: "Expert level replaces vague subjects with precise analytical terms.",
  },
  {
    id: 13,
    type: "precision",
    prompt: "Which is most appropriate for subtle, indirect communication?",
    options: ["dire", "exprimer", "suggérer", "affirmer"],
    correct: 2,
    explanation: "'Suggérer' implies without fully stating; leaves room for interpretation.",
    nuance: "Suggestion is preferred to assertion in delicate contexts.",
  },
  {
    id: 14,
    type: "rhetoric",
    prompt: "Which creates the most sophisticated antithesis?",
    options: [
      "Il y a une différence entre la théorie et la pratique.",
      "Un fossé sépare les principes affichés des réalisations effectives.",
      "Les écarts entre visées théoriques et réalisations empiriques trahissent des contradictions structurelles.",
    ],
    correct: 2,
    explanation: "'Visées théoriques' vs 'réalisations empiriques' + 'trahissent' + 'contradictions structurelles'.",
    nuance: "Antithesis can be elevated through technical vocabulary and interpretive verbs.",
  },
  {
    id: 15,
    type: "transformation",
    prompt: "Final transformation challenge - reach expert level: 'This needs careful thought'",
    options: [
      "Cela a besoin d'une réflexion attentive.",
      "Cette dimension mérite d'être examinée avec soin.",
      "La portée stratégique de cet élément commande une investigation approfondie.",
    ],
    correct: 2,
    explanation: "'Portée stratégique' + personified 'commande' + 'investigation approfondie' = expert.",
    nuance: "Expert transformations use personification and technical nominalizations.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on fine distinctions between
 *   near-synonyms (suggérer/insinuer, décliner/refuser)
 * - 8-11/15: "Strong performance" - encourages refining sensitivity to lexical
 *   weight and connotation, combining vocabulary with sophisticated structures
 * - 12-15/15: "Excellent precision mastery" - celebrates near-native lexical
 *   precision with confident navigation of fine distinctions
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "C2 precision requires attention to fine distinctions. Focus on learning nuanced word pairs like suggérer/insinuer.",
      focus: "Practice distinguishing between near-synonyms and their contexts.",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your precision is developing well. Continue refining your sensitivity to lexical weight and connotation.",
      focus: "Work on combining precise vocabulary with sophisticated structures.",
    };
  }
  return {
    title: "Excellent precision mastery",
    message: "Your French demonstrates near-native lexical precision. You navigate fine distinctions with confidence and elegance.",
    focus: "Continue expanding your repertoire of sophisticated lexical choices.",
  };
}
