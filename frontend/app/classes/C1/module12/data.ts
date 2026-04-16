/**
 * C1 Module 12 - Final Integration Challenge
 * ==========================================
 *
 * This file contains all lesson data for C1 Module 12, the capstone module that
 * tests comprehensive mastery of all C1 skills. Students face complex, ambiguous
 * tasks requiring simultaneous deployment of precision, nuance, style, and analysis.
 *
 * **Module Content:**
 * - Introduction: Synthesis of mastery, real-world complexity
 * - Integration skills: 5 combined skill areas (Precision+Register, Argument+Style, etc.)
 * - Real-world scenarios: Executive presentation, academic peer review, crisis communication, cross-cultural negotiation
 * - Weak vs Strong examples: Professional context transformations
 * - Transformations: Integrated C1 prose examples
 * - 15 practice quiz questions (rewrite, comparison, transformation types)
 *
 * **Key Concepts:**
 * - Integrated mastery: Combining multiple C1 skills simultaneously
 * - Professional contexts: Formal precision with diplomatic nuance
 * - Academic contexts: Analytical rigor with stylistic elegance
 * - Crisis communication: Urgency without alarm, action without overpromising
 * - Cross-cultural negotiation: Reading subtext while advancing position
 * - Nominalization + formal hedging: Core integrated technique
 * - Concessive structures + litotic negation: Sophisticated qualification
 * - Personification + evaluation: Creating authoritative voice
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to integration challenge
 * 4. integrationSkills - Required skill combinations
 * 5. realWorldScenarios - Complex professional scenarios
 * 6. weakVsStrongExamples - Professional context comparisons
 * 7. transformations - Integrated C1 prose examples
 * 8. practiceQuestions - 15 quiz questions (final challenge)
 * 9. getResultMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all module section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to the synthesis of mastery
 * 2. challenge - Final integration challenge overview
 * 3. skills-integration - Combined skill requirements
 * 4. real-world - Real-world scenario examples
 * 5. reflection - Achievement reflection
 * 6. practice - Final interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "challenge", "skills-integration", "real-world", "reflection", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Final Integration Challenge",
  /** Brief description of module content */
  subtitle: "Demonstrate comprehensive C1 mastery. Integrate precision, nuance, style, and analysis in complex, real-world tasks.",
  /** Module number in C1 series */
  moduleNumber: 12,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to the Final Integration Challenge.
 *
 * Content:
 * - The Synthesis of Mastery: Testing integrated command of C1 French
 * - Real-World Complexity: Language use in professional, academic, social contexts
 */
export const introSections = [
  {
    title: "The Synthesis of Mastery",
    content: "This final module tests your integrated command of C1 French. You will face complex, ambiguous tasks that require you to deploy precision, navigate register shifts, construct elegant arguments, and analyze subtle meaning—all simultaneously.",
  },
  {
    title: "Real-World Complexity",
    content: "Language use is never isolated. Professional contexts demand formal precision with diplomatic nuance. Academic contexts require analytical rigor with stylistic elegance. Social contexts call for spontaneous fluency with appropriate register. This module simulates that complexity.",
  },
];

// =============================================================================
// INTEGRATION SKILLS
// =============================================================================

/**
 * integrationSkills - Five integrated skill combinations required for C1 mastery.
 *
 * Skill combinations:
 * - Precision + Register: Formal email with exact vocabulary (nominalization + conditional politeness)
 * - Argument + Style: Persuasive presentation (thesis + rhetorical devices + elegant flow)
 * - Analysis + Nuance: Text interpretation (tone identification + subtext + hedged conclusions)
 * - Structure + Cohesion: Complex paragraph writing (embedded clauses + sophisticated connectors)
 * - Idiom + Fluency: Spoken interaction (fillers + natural reactions + turn management)
 */
export const integrationSkills = {
  title: "Integrated Skills Required",
  skills: [
    { skill: "Precision + Register", challenge: "Formal email with exact vocabulary", demonstration: "Nominalization + conditional politeness + technical terms" },
    { skill: "Argument + Style", challenge: "Persuasive presentation", demonstration: "Thesis formulation + rhetorical devices + elegant flow" },
    { skill: "Analysis + Nuance", challenge: "Text interpretation", demonstration: "Tone identification + subtext analysis + hedged conclusions" },
    { skill: "Structure + Cohesion", challenge: "Complex paragraph writing", demonstration: "Embedded clauses + connector sophistication + lexical chains" },
    { skill: "Idiom + Fluency", challenge: "Spoken interaction simulation", demonstration: "Appropriate fillers + natural reactions + turn management" },
  ],
};

// =============================================================================
// REAL-WORLD SCENARIOS
// =============================================================================

/**
 * realWorldScenarios - Complex professional and academic scenarios.
 *
 * Scenarios:
 * - Executive presentation: Authority + diplomatic concession (formal register, argument structure, rhetorical persuasion)
 * - Academic peer review: Collegial critique (analytical precision, tone management, constructive criticism)
 * - Crisis communication: Strategic messaging (urgency markers, strategic ambiguity, stakeholder management)
 * - Cross-cultural negotiation: Cultural reading (register calibration, indirect strategies, patience markers)
 */
export const realWorldScenarios = {
  title: "Real-World Scenarios",
  scenarios: [
    { scenario: "Executive presentation", demands: ["Formal register", "Argument structure", "Rhetorical persuasion", "Handling objections"], complexity: "Must shift between authority and diplomatic concession" },
    { scenario: "Academic peer review", demands: ["Analytical precision", "Tone management", "Constructive criticism", "Hedging"], complexity: "Must critique while maintaining collegiality" },
    { scenario: "Crisis communication", demands: ["Urgency markers", "Strategic ambiguity", "Stakeholder management", "Reassurance"], complexity: "Must inform without alarming, act without overpromising" },
    { scenario: "Cross-cultural negotiation", demands: ["Register calibration", "Indirect strategies", "Cultural framing", "Patience markers"], complexity: "Must read cultural subtext while advancing position" },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Simple vs fully integrated C1 professional prose.
 *
 * Examples showing how to transform basic statements into sophisticated,
 * multi-layered C1 expression appropriate for professional contexts.
 *
 * Scenarios: Crisis communication, academic peer review, executive presentation, diplomatic negotiation
 */
export const weakVsStrongExamples = [
  {
    weak: "Je pense que nous devons faire quelque chose. C'est important. Les gens sont inquiets.",
    strong: "L'urgence de la situation, ainsi que l'inquiétude légitime de nos parties prenantes, commande une intervention résolue dans les plus brefs délais.",
    why: "Nominalization throughout + personification 'commande' + formal 'parties prenantes' + temporal precision.",
    context: "Crisis communication",
  },
  {
    weak: "Votre idée est intéressante mais il y a des problèmes. Je ne suis pas sûr que ça marchera.",
    strong: "Force est de reconnaître l'intérêt de cette proposition. Il n'en demeure pas moins que des difficultés majeures, dont vous n'avez pas tout à fait mesuré l'ampleur, risquent d'en compromettre la mise en œuvre.",
    why: "Elegant concession + sophisticated continuation + embedded relative + hedged prediction + formal 'mise en œuvre'.",
    context: "Academic peer review",
  },
  {
    weak: "Nous avons trois options. Nous pouvons choisir A, B, ou C. Chacune a des avantages et des inconvénients.",
    strong: "Trois voies s'offrent à nous, chacune présentant un rapport coût-bénéfice distinct que nous aurions avantage à évaluer avec la plus grande rigueur.",
    why: "Personification 's'offrent' + participial embedding + conditional 'aurions avantage à' + formal 'rigueur'.",
    context: "Executive presentation",
  },
  {
    weak: "Je ne suis pas d'accord avec cette approche. Elle ne fonctionne pas bien selon moi.",
    strong: "Après mûre réflexion, cette approche, bien qu'envisageable dans certains contextes, ne saurait recueillir mon adhésion pleine et entière, des réserves substantielles subsistant quant à son efficacité opérationnelle.",
    why: "Deliberation formula + concessive embedding + litotic negation + multiple hedging + technical evaluation.",
    context: "Diplomatic negotiation",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Integrated C1 prose transformation examples.
 *
 * Techniques shown:
 * - Formal roadmap + nominalization stack: Multiple nominalizations + formal 'je me permis'
 * - Impersonal framing + balanced concession: Relational vocabulary + diplomatic evaluation
 * - Nominalization + concessive subordinate + litotic triumph: Understated success
 *
 * Each transformation shows original, improved version, technique name, and detailed explanation.
 */
export const transformations = [
  {
    original: "Je vais vous expliquer pourquoi c'est important et ce que nous devons faire.",
    improved: "Je me permets d'esquisser les enjeux fondamentaux qui sous-tendent cette décision, avant d'évoquer les modalités de sa mise en œuvre.",
    technique: "Formal roadmap + nominalization stack",
    explanation: "Multiple nominalizations ('enjeux', 'modalités', 'mise en œuvre') + formal 'je me permis' + elegant 'esquisser'.",
  },
  {
    original: "Certains pensent A, d'autres pensent B. Moi je pense que C est mieux.",
    improved: "Si les partisans de A et les défenseurs de B continuent de s'opposer sur ce point fondamental, il apparaît pourtant que C constitue la voie médiane la plus prometteuse.",
    technique: "Impersonal framing + balanced concession + measured evaluation",
    explanation: "Relational vocabulary ('partisans', 'défenseurs') + 's'opposent' personifies + 'il apparaît' is analytical + 'voie médiane' evaluates diplomatically.",
  },
  {
    original: "Nous avons eu des problèmes mais nous avons réussi à résoudre la situation.",
    improved: "Les aléas de la mise en œuvre, s'ils ont effectivement contrarié nos échéanciers initiaux, n'ont pu compromettre l'aboutissement final de cette entreprise.",
    technique: "Nominalization + concessive subordinate + litotic triumph",
    explanation: "'Aléas' elevates 'problèmes'; 'contrarié' is elegant; litotic 'n'ont pu compromettre' understates success.",
  },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question final quiz for C1 Module 12.
 *
 * Question types:
 * - comparison (1, 4, 6, 8, 10, 12, 14): Choose best integrated C1 mastery
 * - rewrite (2, 5, 7, 11, 13, 15): Create integrated C1 expression
 * - transformation (3, 9): Transform into fully integrated prose
 *
 * Topics covered (integrating all prior modules):
 * - Elegant concession + sophisticated continuation + embedded relative
 * - Formal register with multiple sophisticated elements (Je me permis, sous réserve)
 * - Nominal subject + participle + conditional + méritent d'être
 * - Rhetorical + analytical integration (concessive 'certes' + antithesis)
 * - Hedging + nominalization + formal register (participle absolute, multiple hedges)
 * - Cohesion + structure + style (concessive conditional + litotic negation)
 * - Persuasive + analytical integration (nominalization + personification)
 * - Idiomatic + formal mastery ('Il y a lieu de' + personified 's'impose')
 * - Acknowledging complexity with litotic 'loin d'être dépourvue'
 * - Spoken + written integration (oratory combining warmth and elegance)
 * - Participle absolute + 'il apparaît manifeste' + personified 's'impose'
 * - Diplomatic + analytical mastery (maximal hedging and formality)
 * - Maximal integration (nominalization + concessive + litotic + literary 'demeurent')
 * - Comprehensive mastery (participle absolute + litotic 'loin d'être hors d'atteinte')
 * - Final statement with nominal enumeration + 'tels sont' + formal 'puis mobiliser'
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
    type: "comparison",
    prompt: "Which demonstrates best integrated C1 mastery?",
    context: "Formal response to criticism",
    options: [
      "Vous avez tort et je vais vous expliquer pourquoi.",
      "Force est de reconnaître la pertinence de cette objection. Il n'en demeure pas moins que des éléments contextuels, que vous n'avez pu tout à fait saisir, justifient notre position.",
    ],
    correct: 1,
    explanation: "Elegant concession + sophisticated continuation + embedded relative + face-saving 'justifient'.",
    nuance: "Integrated mastery combines multiple C1 skills simultaneously.",
  },
  {
    id: 2,
    type: "rewrite",
    prompt: "Create integrated formal response:",
    context: "Accepting proposal with reservations",
    options: [
      "Oui, je suis d'accord mais avec quelques doutes.",
      "Je me permets de vous faire part de mon accord de principe, sous réserve de quelques ajustements que nous aurions avantage à discuter préalablement.",
      "Ça me va, mais il faut modifier des trucs.",
    ],
    correct: 1,
    explanation: "'Je me permis' + 'accord de principe' + 'sous réserve' + conditional 'aurions avantage' + formal 'préalablement'.",
    nuance: "Integrated formal register requires multiple sophisticated elements.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Transform into fully integrated C1 prose:",
    context: "Opening complex argument",
    options: [
      "Je vais parler de trois choses importantes pour notre projet.",
      "Trois considérations déterminantes, qui devraient guider notre réflexion collective, méritent d'être soulignées dès l'emblée.",
      "Il y a trois points importants à discuter.",
    ],
    correct: 1,
    explanation: "Nominal subject + participle + conditional + 'méritent d'être' + 'dès l'emblée'.",
    nuance: "Sophisticated openings combine multiple devices.",
  },
  {
    id: 4,
    type: "comparison",
    prompt: "Which shows best rhetorical + analytical integration?",
    context: "Analyzing opposing view",
    options: [
      "Ils pensent différemment et c'est faux.",
      "Cette interprétation alternative, certes séduisante en première analyse, ne résiste cependant pas à l'examen rigoureux des données empiriques disponibles.",
    ],
    correct: 1,
    explanation: "Concessive 'certes' + evaluation 'séduisante' + antithesis 'ne résiste cependant pas' + technical 'données empiriques'.",
    nuance: "Rhetorical + analytical skills combine in evaluation.",
  },
  {
    id: 5,
    type: "rewrite",
    prompt: "Integrate hedging + nominalization + formal register:",
    context: "Tentative prediction",
    options: [
      "Je pense que ça va probablement marcher.",
      "Tous éléments considérés, les perspectives de succès paraissent, sauf impondérables, relativement favorables.",
      "Ça devrait aller, j'espère.",
    ],
    correct: 1,
    explanation: "Participle absolute + nominalization 'perspectives' + multiple hedging 'sauf impondérables, relativement'.",
    nuance: "Multiple hedges create sophisticated tentativeness.",
  },
  {
    id: 6,
    type: "comparison",
    prompt: "Which demonstrates best cohesion + structure + style?",
    options: [
      "Le projet a des avantages. Il a aussi des problèmes. Nous devons décider.",
      "Si les avantages stratégiques de cette initiative ne sauraient être ignorés, les obstacles opérationnels qui en compromettent la mise en œuvre imposent une évaluation minutieuse avant toute décision.",
    ],
    correct: 1,
    explanation: "Concessive conditional + litotic negation + embedded relative + personified 'imposent' + formal 'minutieuse'.",
    nuance: "Complex sentences integrate all C1 skills.",
  },
  {
    id: 7,
    type: "rewrite",
    prompt: "Create integrated persuasive + analytical statement:",
    context: "Advancing position with evidence",
    options: [
      "Je pense que j'ai raison parce que les données le montrent.",
      "L'évidence des faits établis, désormais incontestable, impose la reconnaissance de la pertinence de cette analyse.",
      "Les chiffres disent que j'ai raison.",
    ],
    correct: 1,
    explanation: "Nominalization 'évidence' + participle 'établis' + temporal authority 'désormais' + personified 'impose'.",
    nuance: "Persuasion + analysis combine in authoritative formulation.",
  },
  {
    id: 8,
    type: "comparison",
    prompt: "Which integrates idiomatic + formal mastery best?",
    context: "Professional recommendation",
    options: [
      "Faites ça, c'est la meilleure façon.",
      "Il y a lieu de privilégier cette voie, qui s'impose comme la plus adéquate au vu des contraintes évoquées.",
    ],
    correct: 1,
    explanation: "'Il y a lieu de' fixed phrase + personified 's'impose' + formal 'au vu des contraintes'.",
    nuance: "Idiomatic + formal can combine elegantly.",
  },
  {
    id: 9,
    type: "transformation",
    prompt: "Transform with integrated C1 sophistication:",
    context: "Acknowledging complexity",
    options: [
      "C'est compliqué, ce n'est pas simple.",
      "La complexité intrinsèque de cette problématique, loin d'être dépourvue de nuances essentielles, commande une analyse approfondie avant toute conclusion hâtive.",
      "Il y a beaucoup de choses à considérer.",
    ],
    correct: 1,
    explanation: "Nominalization + litotic 'loin d'être dépourvue' + personified 'commande' + evaluation 'hâtive'.",
    nuance: "Complexity acknowledgment uses multiple devices.",
  },
  {
    id: 10,
    type: "comparison",
    prompt: "Which shows best spoken + written integration?",
    context: "Formal speech with natural flow",
    options: [
      "Mesdames et messieurs, je vais maintenant présenter mes arguments.",
      "Mesdames et messieurs, permettez-moi d'esquisser, en quelques mots, les grandes lignes de notre réflexion.",
    ],
    correct: 1,
    explanation: "'Permettez-moi' is spoken polite; 'esquisser' is elegant; 'en quelques mots' acknowledges brevity; 'grandes lignes' is idiomatic.",
    nuance: "Oratory combines spoken warmth with written elegance.",
  },
  {
    id: 11,
    type: "rewrite",
    prompt: "Integrate all C1 skills in one sentence:",
    context: "Closing argument",
    options: [
      "En conclusion, merci de votre attention.",
      "Ces considérations étant exposées, il apparaît manifeste que cette voie s'impose comme la seule viable, et je vous remercie de votre attention bienveillante.",
      "Voilà, c'est tout.",
    ],
    correct: 1,
    explanation: "Participle absolute + 'il apparaît manifeste' + personified 's'impose' + elegant closing formula.",
    nuance: "Closings synthesize all preceding skills.",
  },
  {
    id: 12,
    type: "comparison",
    prompt: "Which demonstrates best diplomatic + analytical mastery?",
    context: "International negotiation",
    options: [
      "Nous voulons ça. Donnez-nous ce que nous demandons.",
      "Nous nous permettrons de souligner l'importance stratégique de cette dimension, qui mérite, croyons-nous, d'être prise en considération avec la plus grande attention.",
    ],
    correct: 1,
    explanation: "Conditional 'nous nous permettrons' + nominalization + hedged 'croyons-nous' + formal 'prise en considération'.",
    nuance: "Diplomatic mastery requires maximal hedging and formality.",
  },
  {
    id: 13,
    type: "rewrite",
    prompt: "Create maximally integrated C1 expression:",
    context: "Evaluating success with nuance",
    options: [
      "Ça a marché, c'était bien.",
      "Les résultats obtenus, au terme d'un processus certes complexe, réjouissants qu'ils soient, ne sauraient cependant masquer les défis persistants qui demeurent à surmonter.",
      "C'était un succès total.",
    ],
    correct: 1,
    explanation: "Nominalization + concessive 'certes' + concessive clause 'réjouissants qu'ils soient' + litotic negation + embedded relative + 'demeurent' literary.",
    nuance: "Maximal integration stacks multiple sophisticated devices.",
  },
  {
    id: 14,
    type: "comparison",
    prompt: "Which demonstrates comprehensive C1 mastery?",
    context: "Final challenge",
    options: [
      "J'ai fini le cours de français.",
      "Ces douze modules ayant été parcourus avec la diligence requise, il apparaît que le palier C1, loin d'être désormais hors d'atteinte, s'impose comme un objectif pleinement accessible au plus grand nombre.",
    ],
    correct: 1,
    explanation: "Participle absolute + conditional 'ayant été' + 'diligence requise' + 'il apparaît' + litotic 'loin d'être hors d'atteinte' + personified 's'impose' + 'pleinement accessible' evaluation.",
    nuance: "Comprehensive mastery demonstrates all skills working together.",
  },
  {
    id: 15,
    type: "rewrite",
    prompt: "Your final C1 challenge - demonstrate integrated mastery:",
    context: "Summarizing achievement",
    options: [
      "Je sais parler français maintenant.",
      "Maîtrise de la précision, contrôle du registre, élégance stylistique, et rigueur analytique: tels sont désormais les atouts que je puis mobiliser dans ma pratique du français à un niveau avancé.",
      "Je suis bon en français.",
    ],
    correct: 1,
    explanation: "Nominal enumeration + 'tels sont' + 'désormais' temporal marker + formal 'puis' + 'mobiliser' + 'niveau avancé'.",
    nuance: "Final statement demonstrates accumulated mastery.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on final quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on combining nominalization with
 *   formal hedging, practicing concessive structures with litotic negation
 * - 8-11/15: "Nice progress" - encourages combining rhetorical and analytical
 *   elements, stacking multiple sophisticated devices in single sentences
 * - 12-15/15: "C1 Mastery Achieved" - celebrates comprehensive C1 French mastery
 *   with precise, nuanced, elegant, and analytical expression
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Integrated C1 mastery requires combining multiple skills. Focus on using nominalization with formal hedging.",
      focus: "Practice combining concessive structures with litotic negation.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your integrated skills are developing well. Continue combining rhetorical and analytical elements.",
      focus: "Work on stacking multiple sophisticated devices in single sentences.",
    };
  }
  return {
    title: "C1 Mastery Achieved",
    message: "You have demonstrated comprehensive C1 French mastery. Your expression is precise, nuanced, elegant, and analytical. You command the full range of sophisticated French expression.",
    focus: "Continue refining your personal voice while maintaining this level of excellence.",
  };
}
