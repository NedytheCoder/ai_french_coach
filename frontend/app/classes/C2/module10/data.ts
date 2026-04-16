/**
 * C2 Module 10 - Final Mastery Simulation
 * =========================================
 *
 * This file contains all lesson data for C2 Module 10, the final C2 module.
 * Students demonstrate comprehensive mastery by integrating all skills in
 * complex, demanding tasks that simulate real-world near-native challenges.
 *
 * **Module Content:**
 * - Introduction: The synthesis of mastery, near-native complexity
 * - Integration Challenge: 5 integrated skill combinations
 * - Weak/Strong/Expert examples: 4-tier final progression demonstrations
 * - 15 practice quiz questions (all transformation type)
 *
 * **Integrated Skills Challenge:**
 * 1. Precision + Register: Formal email with exact vocabulary + hedging
 * 2. Argument + Style: Persuasive presentation with rhetorical devices
 * 3. Analysis + Nuance: Text interpretation with subtext analysis
 * 4. Structure + Cohesion: Complex paragraph with embedded clauses
 * 5. Idiom + Fluency: Natural expression with collocations
 *
 * **Key Integration Techniques Demonstrated:**
 * - Subject clauses: 'Que les avantages... ne sauraient occulter...'
 * - Stacked concessives: 'pour... qu'ils soient et même...'
 * - Litotic chains: 'que nul ne saurait éluder/contester/nier'
 * - Multiple hedging: 'pour incertaines qu'elles puissent demeurer'
 * - Temporal urgency: 'qui ne souffre aucun délai'
 * - Evidential framing: 'eu égard aux...'
 * - Philosophical conclusions: 'constitue le seuil d'une exploration...'
 *
 * **Maximum Device Stacking Examples:**
 * - Subject clause + concessive + litotic + relative + 'sauf à'
 * - Participle absolute + evidential + multiple hedging + litotic
 * - Nominal enumeration + temporal + litotic + 'loin d'être'
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to final mastery
 * 4. integrationChallenge - 5 integrated skill challenges
 * 5. weakStrongExpertExamples - 4 final progression demonstrations
 * 6. practiceQuestions - 15 final quiz questions (all transformation)
 * 7. getResultMessage - Score-based feedback with "C2 Mastery Achieved"
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all module section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to synthesis of mastery
 * 2. challenge - Integrated skills challenge
 * 3. integration - Skill integration techniques
 * 4. synthesis - Synthesizing all C2 competencies
 * 5. reflection - Reflecting on mastery journey
 * 6. practice - Final interactive quiz
 * 7. completion - C2 completion celebration
 */
export const sectionIds = ["intro", "challenge", "integration", "synthesis", "reflection", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Final Mastery Simulation",
  /** Brief description of module content */
  subtitle: "Demonstrate comprehensive C2 mastery. Integrate all skills in complex, demanding tasks that simulate real-world near-native challenges.",
  /** Module number in C2 series (final module) */
  moduleNumber: 10,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to final C2 mastery simulation.
 *
 * Content:
 * - The Synthesis of Mastery: Testing complete command requiring all skills
 * - Near-Native Complexity: Simultaneous deployment of multiple competencies
 */
export const introSections = [
  {
    title: "The Synthesis of Mastery",
    content: "This final module tests your complete command of C2 French. You will face integrated challenges requiring precision, register control, rhetorical sophistication, analytical depth, and stylistic elegance—all working together seamlessly.",
  },
  {
    title: "Near-Native Complexity",
    content: "Real-world language use is never isolated. Professional, academic, and social contexts demand simultaneous deployment of multiple skills. This module simulates that complexity: you will analyze, argue, persuade, and express—at the highest level.",
  },
];

// =============================================================================
// INTEGRATED SKILLS CHALLENGE
// =============================================================================

/**
 * integrationChallenge - Five integrated skill combination challenges.
 *
 * Challenges:
 * - Precision + Register: Formal email with exact vocabulary and appropriate hedging
 *   (Nominalization + conditional politeness + technical terms)
 * - Argument + Style: Persuasive presentation with rhetorical devices
 *   (Thesis formulation + anaphora + elegant flow)
 * - Analysis + Nuance: Text interpretation with subtext analysis
 *   (Tone identification + implicit meaning + hedged conclusions)
 * - Structure + Cohesion: Complex paragraph with embedded clauses
 *   (Subordination + connector sophistication + lexical chains)
 * - Idiom + Fluency: Natural expression with appropriate collocations
 *   (Idioms + collocations + natural phrasing)
 *
 * Each challenge shows skill combination, task, and demonstration elements.
 */
export const integrationChallenge = {
  title: "Integrated Skills Challenge",
  challenges: [
    { skill: "Precision + Register", task: "Formal email with exact vocabulary and appropriate hedging", demonstration: "Nominalization + conditional politeness + technical terms" },
    { skill: "Argument + Style", task: "Persuasive presentation with rhetorical devices", demonstration: "Thesis formulation + anaphora + elegant flow" },
    { skill: "Analysis + Nuance", task: "Text interpretation with subtext analysis", demonstration: "Tone identification + implicit meaning + hedged conclusions" },
    { skill: "Structure + Cohesion", task: "Complex paragraph with embedded clauses", demonstration: "Subordination + connector sophistication + lexical chains" },
    { skill: "Idiom + Fluency", task: "Natural expression with appropriate collocations", demonstration: "Idioms + collocations + natural phrasing" },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES - FINAL PROGRESSION
// =============================================================================

/**
 * weakStrongExpertExamples - Four final demonstrations of C2 mastery.
 *
 * These examples show maximum complexity integration:
 * - Simple chain → formal nominalization + 'commande' → complex embedding + litotic 'ne saurait' + concessive 'quelle que soit'
 * - Simple contrast → elegant concession → stacked concessives + litotic chain + 'sauf à' + specific critique
 * - Simple list → 's'offrent à nous' → complex relative + concessive + litotic 'ne saurait' + 'commande'
 * - Blunt disagreement → 'après mûre réflexion' + litotic → temporal expansion + stacked concessives + 'sauf à' + multiple evaluative frames
 *
 * Each demonstrates sophisticated device stacking at expert level.
 */
export const weakStrongExpertExamples = [
  {
    weak: "Je pense que nous devons faire quelque chose. C'est important. Les gens sont inquiets.",
    strong: "L'urgence de la situation, ainsi que l'inquiétude légitime des parties prenantes, commande une intervention résolue dans les plus brefs délais.",
    expert: "L'acuité de la situation, qui ne saurait être sous-estimée eu égard aux conséquences potentiellement dévastatrices qu'entraînerait son évolution incontrôlée, ainsi que l'inquiétude légitime—et partagée par l'ensemble des parties prenantes, quelle que soit leur position initiale—commande, et ce avec une urgence qui ne souffre aucun délai, une intervention résolue dont la portée devra, pour être efficace, dépasser le seul cadre des mesures d'urgence.",
    analysis: "Progression: simple chain → formal nominalization + 'commande' → complex embedding + litotic 'ne saurait' + concessive 'quelle que soit' + nested evaluation.",
  },
  {
    weak: "Votre idée est intéressante mais il y a des problèmes. Je ne suis pas sûr que ça marchera.",
    strong: "Force est de reconnaître l'intérêt de cette proposition. Il n'en demeure pas moins que des difficultés majeures compromettent sa mise en œuvre.",
    expert: "Force est de reconnaître, et c'est là un point que nul ne saurait éluder en toute intellectual honnêteté, l'intérêt indéniable—pour ne pas dire la fécondité heuristique—de cette proposition qui, loin d'être dépourvue de mérite, présente une cohérence interne qui force l'admiration. Il n'en demeure pas moins, sauf à en minorer délibérément la portée, que des difficultés, dont on imagine sans peine l'ampleur et que l'auteur, pour méthodologiquement rigoureux qu'il soit, n'a pu tout à fait résoudre, compromettent en définitive la mise en œuvre dans des délais raisonnables.",
    analysis: "Progression: simple contrast → elegant concession + 'il n'en demeure pas moins' → stacked concessives + litotic chain 'que nul ne saurait' + 'loin d'être' + 'sauf à' + specific critique.",
  },
  {
    weak: "Nous avons trois options. Nous pouvons choisir A, B, ou C. Chacune a des avantages et des inconvénients.",
    strong: "Trois voies s'offrent à nous, chacune présentant un rapport coût-bénéfice distinct que nous aurions avantage à évaluer avec rigueur.",
    expert: "Trois voies, dont les implications, pour immédiates qu'elles puissent sembler à première vue, se révèlent au examen attentif d'une complexité qui n'est pas pour surprendre l'observateur averti des enjeux stratégiques en présence, s'offrent à nous—et c'est là un luxe dont nous ne saurions, eu égard aux contraintes temporelles qui sont les nôtres, abuser indéfiniment—chacune présentant, dans une configuration qui mérite d'être analysée dans toute sa nuance, un rapport coût-bénéfice dont l'évaluation rigoureuse commande, et ce indépendamment des seules pressions conjoncturelles, une attention toute particulière.",
    analysis: "Progression: simple list → 's'offrent à nous' + 'rapport coût-bénéfice' → complex relative + concessive + litotic 'ne saurait' + 'commande' + nested evaluation.",
  },
  {
    weak: "Je ne suis pas d'accord avec cette approche. Elle ne fonctionne pas bien selon moi.",
    strong: "Après mûre réflexion, cette approche, bien qu'envisageable, ne saurait recueillir mon adhésion pleine et entière.",
    expert: "Après en avoir longuement débattu, et ce tant en séminaire restreint qu'en commission plénière, cette approche, pour perfectible qu'elle apparaisse et même, osons le dire, pour prometteuse que puissent en être les premières applications, ne saurait, sauf à en minorer la portée et à en occulter délibérément les implications à long terme, recueillir l'adhésion que, eu égard aux objectifs stratégiques que nous nous sommes fixés et aux contraintes éthiques auxquelles nous ne saurions déroger, nous serions en droit d'attendre.",
    analysis: "Progression: blunt disagreement → 'après mûre réflexion' + litotic 'ne saurait' → temporal expansion + stacked concessives + 'sauf à' + multiple evaluative frames.",
  },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total (Final C2 Assessment)
// =============================================================================

/**
 * practiceQuestions - 15-question final assessment for C2 Module 10.
 *
 * All questions are transformation type, requiring students to select the most
 * sophisticated integrated expression from three options.
 *
 * Question contexts (integrated scenarios):
 * 1. Formal response to criticism (litotic chain + concessive + relative)
 * 2. Accepting proposal with conditions (traditional formula + conditional)
 * 3. Opening complex argument (impératifs + relative expansion + urgency)
 * 4. Analyzing opposing view (subject clause + stacked concessives + litotic)
 * 5. Tentative prediction (participle absolute + evidential + hedging)
 * 6. Cohesion + structure + style integration (maximum device stacking)
 * 7. Persuasive + analytical statement (subject clause + concessive + litotic)
 * 8. Idiomatic + formal mastery (fixed phrase + litotic + concessive)
 * 9. Acknowledging complexity (subject clause + concessive + 'commande')
 * 10. Spoken + written mastery (courtesy + litotic + temporal + concessive)
 * 11. Integrated closing (participle + 'conduisent inéluctablement' + litotic)
 * 12. Diplomatic + analytical mastery (conditional + litotic + 'eu égard')
 * 13. Maximally integrated expression (maximum: subject clause + embedding)
 * 14. Comprehensive mastery demonstration (ultimate device stacking)
 * 15. Final C2 challenge (nominal enumeration + temporal + philosophical)
 *
 * Each question demonstrates:
 * - Integration of multiple C2 skills simultaneously
 * - Maximum device stacking (subject clauses, concessives, litotic chains)
 * - Real-world near-native complexity
 *
 * Each question has:
 * - id: unique identifier
 * - type: transformation (all questions)
 * - prompt: question text
 * - context: usage scenario
 * - options: array of 3 possible answers (weak/strong/expert)
 * - correct: index of correct option (2 = expert)
 * - explanation: detailed device analysis
 * - nuance: integration insight
 */
export const practiceQuestions: { id: number; type: "precision" | "register" | "transformation" | "interpretation" | "rhetoric" | "ambiguity"; prompt: string; context?: string; options: string[]; correct: number; explanation: string; nuance?: string; }[] = [
  {
    id: 1,
    type: "transformation",
    prompt: "Create integrated C2 expression:",
    context: "Formal response to criticism",
    options: [
      "Vous avez tort et je vais vous expliquer pourquoi.",
      "Force est de reconnaître la pertinence de cette objection. Il n'en demeure pas moins que des éléments contextuels justifient notre position.",
      "Force est de reconnaître, et c'est là un point que nul ne saurait éluder, la pertinence de cette objection qui, pour fondée qu'elle puisse paraître, ne saurait occulter les éléments contextuels—dont vous n'avez pu, faute d'information complète, tout à fait mesurer l'ampleur—qui justifient pleinement, eu égard aux contraintes spécifiques dont nous avons eu à faire état, la position que nous avons adopte.",
    ],
    correct: 2,
    explanation: "Maximum integration: litotic chain + concessive + relative + 'ne saurait occulter' + 'eu égard'.",
    nuance: "Integrated mastery stacks multiple sophisticated devices.",
  },
  {
    id: 2,
    type: "transformation",
    prompt: "Create formal acceptance with reservations:",
    context: "Accepting proposal with conditions",
    options: [
      "Oui, je suis d'accord mais avec quelques doutes.",
      "Je me permets de vous faire part de mon accord de principe, sous réserve de quelques ajustements.",
      "Je me permets de vous faire part de mon accord de principe, sous réserve d'ajustements que nous aurions avantage à discuter préalablement, et ce dans un délai qui, tout en respectant les contraintes dont vous avez eu à faire état, permette une mise en conformité optimale.",
    ],
    correct: 2,
    explanation: "Traditional formula + conditional 'aurions avantage' + temporal + purpose clause.",
    nuance: "Formal register requires traditional courtesy structures.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Maximum integrated sophistication:",
    context: "Opening complex argument",
    options: [
      "Je vais parler de trois choses importantes.",
      "Trois considérations déterminantes méritent d'être soulignées.",
      "Trois impératifs, dont la portée dépasse le seul cadre économique pour toucher à des considérations éthiques fondamentales, commandent, et ce avec une urgence qui ne souffre aucun retard, une attention toute particulière.",
    ],
    correct: 2,
    explanation: "'Impératifs' + relative expansion + 'commandent' + temporal urgency + evaluative.",
    nuance: "Sophisticated openings combine multiple devices.",
  },
  {
    id: 4,
    type: "transformation",
    prompt: "Integrated rhetorical + analytical expression:",
    context: "Analyzing opposing view",
    options: [
      "Ils pensent différemment et c'est faux.",
      "Cette interprétation alternative, certes séduisante, ne résiste pas à l'examen rigoureux.",
      "Que cette interprétation alternative, pour séduisante et même, osons le dire, pour cohérente qu'elle apparaisse en première analyse, ne résiste pas, sauf à en minorer délibérément la portée, à l'examen rigoureux des données empiriques disponibles, voilà qui ne saurait surprendre l'observateur averti des limites inhérentes à ce type d'approche.",
    ],
    correct: 2,
    explanation: "Subject clause + stacked concessives + 'sauf à' + litotic conclusion + 'averti'.",
    nuance: "Rhetorical + analytical skills integrate in evaluation.",
  },
  {
    id: 5,
    type: "transformation",
    prompt: "Integrate hedging + nominalization + formality:",
    context: "Tentative prediction",
    options: [
      "Je pense que ça va probablement marcher.",
      "Tous éléments considérés, les perspectives de succès paraissent relativement favorables.",
      "Tous éléments considérés, et eu égard aux tendances que nous avons pu identifier dans l'analyse qui précède, les perspectives de succès, pour incertaines qu'elles puissent demeurer en l'absence de confirmation empirique définitive, paraissent, sauf impondérables dont on imagine sans peine la nature, relativement favorables.",
    ],
    correct: 2,
    explanation: "Participle absolute + evidential + multiple hedging + litotic 'sauf'.",
    nuance: "Multiple hedges create sophisticated tentativeness.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Which demonstrates best cohesion + structure + style integration?",
    options: [
      "Le projet a des avantages. Il a aussi des problèmes. Nous devons décider.",
      "Si les avantages stratégiques de cette initiative ne sauraient être ignorés, les obstacles opérationnels qui en compromettent la mise en œuvre imposent une évaluation minutieuse.",
      "Que les avantages stratégiques de cette initiative, pour indéniables qu'ils soient et même, c'est là un point que nul ne saurait contester, déterminants pour l'avenir de notre organisation, ne sauraient occulter les obstacles opérationnels—dont l'ampleur, faute d'analyse approfondie, n'a pu être pleinement mesurée—qui en compromettent, sauf à en réduire délibérément la portée, la mise en œuvre, voilà qui impose, et ce indépendamment des seules pressions conjoncturelles, une évaluation minutieuse.",
    ],
    correct: 2,
    explanation: "Maximum: subject clause + stacked litotic concessives + relative + 'sauf à' + 'impose'.",
    nuance: "Maximum complexity integrates all C2 skills.",
  },
  {
    id: 7,
    type: "transformation",
    prompt: "Create integrated persuasive + analytical statement:",
    context: "Advancing position with evidence",
    options: [
      "Je pense que j'ai raison parce que les données le montrent.",
      "L'évidence des faits établis, désormais incontestable, impose la reconnaissance de la pertinence de cette analyse.",
      "Que l'évidence des faits établis, pour méthodologiquement contestables qu'aient pu être, dans une première phase, les modalités de leur recueil, apparaisse désormais, au terme d'un processus de vérification progressivement élaboré, incontestable, voilà qui impose, et ce au-delà de tout doute raisonnable, la reconnaissance de la pertinence d'une analyse dont la portée, loin d'être circonscrite au seul cas d'espèce, mérite d'être considérée dans toute sa généralité.",
    ],
    correct: 2,
    explanation: "Subject clause + concessive + temporal + litotic 'impose' + expansion.",
    nuance: "Persuasion + analysis combine in authoritative formulation.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Integrate idiomatic + formal mastery:",
    context: "Professional recommendation",
    options: [
      "Faites ça, c'est la meilleure façon.",
      "Il y a lieu de privilégier cette voie, qui s'impose comme la plus adéquate.",
      "Il y a lieu, et c'est là une évidence que nul ne saurait éluder en toute conscience, de privilégier cette voie qui, loin d'être une simple option parmi d'autres, s'impose avec une évidence qui, loin de s'imposer brutalement, se révèle au terme d'un raisonnement progressivement élaboré, comme la plus adéquate au vu des contraintes spécifiques évoquées.",
    ],
    correct: 2,
    explanation: "Fixed phrase + litotic 'et c'est là' + concessive + litotic 'loin de' + 'au vu'.",
    nuance: "Idiomatic + formal can combine with maximum elegance.",
  },
  {
    id: 9,
    type: "transformation",
    prompt: "Transform with integrated C2 sophistication:",
    context: "Acknowledging complexity",
    options: [
      "C'est compliqué, ce n'est pas simple.",
      "La complexité intrinsèque de cette problématique commande une analyse approfondie.",
      "Que la complexité intrinsèque de cette problématique, pour décomposable qu'elle puisse apparaître en une analyse qui en isolerait les différents paramètres, présente une unité structurelle qui en commande l'approche d'ensemble, voilà qui ne saurait, sauf à en minorer délibérément la portée, être ignoré en toute intellectual rigueur.",
    ],
    correct: 2,
    explanation: "Subject clause + concessive + 'commande' + litotic 'ne saurait' + 'sauf à'.",
    nuance: "Complexity acknowledgment uses maximum device stacking.",
  },
  {
    id: 10,
    type: "transformation",
    prompt: "Create integrated spoken + written mastery:",
    context: "Formal speech with natural flow",
    options: [
      "Mesdames et messieurs, je vais maintenant présenter mes arguments.",
      "Mesdames et messieurs, permettez-moi d'esquisser, en quelques mots, les grandes lignes de notre réflexion.",
      "Mesdames et messieurs, permettez-moi, et c'est là un honneur que je ne saurais trop souligner, d'esquisser, en quelques mots—car le temps, dont nous ne saurions abuser indéfiniment, est compté—les grandes lignes d'une réflexion qui, pour inachevée qu'elle puisse apparaître, mérite, et c'est là le paradoxe, d'être considérée dans toute sa complexité.",
    ],
    correct: 2,
    explanation: "Courtesy + litotic 'ne saurais trop' + temporal 'dont nous ne saurions' + concessive + 'paradoxe'.",
    nuance: "Oratory combines spoken warmth with maximum written elegance.",
  },
  {
    id: 11,
    type: "transformation",
    prompt: "Create integrated closing:",
    context: "Closing argument",
    options: [
      "En conclusion, merci de votre attention.",
      "Ces éléments étant posés, il apparaît manifeste que cette voie s'impose.",
      "Ces considérations, que nous avons tenté d'exposer avec la diligence requise et la rigueur nécessaire, conduisent inéluctablement à la conclusion que cette voie, qui n'en demeure pas moins l'objet de débats légitimes, s'impose avec une évidence qui, loin de s'imposer brutalement, se révèle au terme d'un raisonnement progressivement élaboré.",
    ],
    correct: 2,
    explanation: "Participle + 'tenté' + 'conduisent inéluctablement' + 'qui n'en demeure pas moins' + litotic 'loin de'.",
    nuance: "Closings synthesize with maximum authority.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Create diplomatic + analytical mastery:",
    context: "International negotiation",
    options: [
      "Nous voulons ça. Donnez-nous ce que nous demandons.",
      "Nous nous permettrons de souligner l'importance stratégique de cette dimension, qui mérite d'être prise en considération.",
      "Nous nous permettrons, et c'est là une démarche que nous ne saurions trop insister à qualifier de constructive, de souligner l'importance stratégique de cette dimension qui, pour contestable qu'elle puisse apparaître à première vue, mérite, eu égard aux enjeux considérables qui en dépendent, d'être prise en considération avec la plus grande attention.",
    ],
    correct: 2,
    explanation: "Conditional 'permettrons' + litotic 'ne saurions trop' + concessive + 'eu égard' + superlative.",
    nuance: "Diplomatic mastery requires maximum hedging and formality.",
  },
  {
    id: 13,
    type: "transformation",
    prompt: "Create maximally integrated C2 expression:",
    context: "Evaluating success with nuance",
    options: [
      "Ça a marché, c'était bien.",
      "Les résultats obtenus, au terme d'un processus complexe, réjouissants qu'ils soient, ne sauraient masquer les défis persistants.",
      "Que les résultats obtenus, au terme d'un processus dont la complexité n'est pas pour surprendre l'observateur averti des difficultés inhérentes à ce type d'entreprise, réjouissants qu'ils soient—et c'est là un point que nul ne saurait nier—ne sauraient, sauf à en minorer délibérément la portée et à en occulter les implications à long terme, masquer les défis qui demeurent, voilà qui s'impose avec une évidence qui commande l'attention de tous.",
    ],
    correct: 2,
    explanation: "Maximum: subject clause + multiple embedding + litotic chain + 'sauf à' + personified 's'impose'.",
    nuance: "Maximum integration stacks all sophisticated devices.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Comprehensive C2 mastery demonstration:",
    context: "Any complex topic",
    options: [
      "J'ai fini le cours de français.",
      "Ces douze modules ayant été parcourus avec la diligence requise, il apparaît que le palier C2, loin d'être désormais hors d'atteinte, s'impose comme un objectif accessible.",
      "Que ces douze modules, pour exigeants qu'ils aient pu apparaître à première vue et même, c'est là un constat partagé par l'ensemble des participants, pour ardus qu'ils se soient révélés dans leur déroulement effectif, aient été parcourus avec la diligence requise et la persévérance nécessaire, voilà qui permet d'affirmer, et ce au-delà de tout doute raisonnable, que le palier C2, loin d'être désormais hors d'atteinte pour qui en aura saisi toute la portée, s'impose comme un objectif pleinement accessible au plus grand nombre.",
    ],
    correct: 2,
    explanation: "Ultimate: subject clause + stacked concessives + litotic chain + 'au-delà de' + 'loin d'être' + 's'impose'.",
    nuance: "Comprehensive mastery demonstrates all skills working together.",
  },
  {
    id: 15,
    type: "transformation",
    prompt: "Final C2 challenge - demonstrate complete mastery:",
    context: "Summarizing achievement",
    options: [
      "Je sais parler français maintenant.",
      "Maîtrise de la précision, contrôle du registre, élégance stylistique: tels sont les atouts que je puis mobiliser.",
      "Maîtrise de la précision, contrôle du registre, élégance stylistique, et rigueur analytique: tels sont, désormais et pour l'avenir qui est le nôtre, les atouts que, fort d'un parcours dont la richesse n'est pas pour surprendre l'observateur attentif, je me permets de mobiliser dans ma pratique du français à un niveau qui, loin d'être un point d'arrivée, constitue le seuil d'une exploration toujours plus affinée de cette langue.",
    ],
    correct: 2,
    explanation: "Nominal enumeration + temporal 'désormais' + litotic 'fort de' + 'me permets' + 'loin d'être' + philosophical conclusion.",
    nuance: "Final statement demonstrates accumulated mastery at maximum level.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK - C2 MASTERY ACHIEVEMENT
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback for final C2 assessment.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests combining multiple skills, focusing on
 *   nominalization with formal hedging and concessive structures with litotic negation
 * - 8-11/15: "Strong performance" - encourages combining rhetorical and analytical
 *   elements, stacking multiple sophisticated devices in single sentences
 * - 12-15/15: "C2 Mastery Achieved" - celebrates comprehensive C2 French mastery
 *   with precise, nuanced, elegant, analytical expression and near-native control
 *
 * This is the final assessment message for completing all 10 C2 modules.
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Integrated C2 mastery requires combining multiple skills. Focus on using nominalization with formal hedging.",
      focus: "Practice combining concessive structures with litotic negation.",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your integrated skills are developing well. Continue combining rhetorical and analytical elements.",
      focus: "Work on stacking multiple sophisticated devices in single sentences.",
    };
  }
  return {
    title: "C2 Mastery Achieved",
    message: "You have demonstrated comprehensive C2 French mastery. Your expression is precise, nuanced, elegant, and analytical. You command near-native control and flexibility.",
    focus: "Continue refining your personal voice while maintaining this level of excellence.",
  };
}
