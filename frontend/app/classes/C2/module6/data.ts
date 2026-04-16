/**
 * C2 Module 6 - Complex Sentence Mastery
 * =========================================
 *
 * This file contains all lesson data for C2 Module 6, teaching mastery of
 * advanced subordination, sentence compression, and the balance between
 * clarity and density. Students construct prose at the highest level of
 * syntactic sophistication.
 *
 * **Module Content:**
 * - Introduction: The architecture of complexity, compression and expansion
 * - Advanced Subordination Patterns: 4 patterns (temporal, causal, conditional, relative)
 * - Weak/Strong/Expert examples: 3-tier progression showing syntactic sophistication
 * - Transformations: 3 examples of compression and expansion
 * - 15 practice quiz questions (all transformation type focusing on syntax)
 *
 * **Four Subordination Patterns:**
 * 1. Temporal layering: Quand X, Y qui Z, alors... (three temporal layers)
 * 2. Causal stacking: Parce que X, et que Y, il s'ensuit que... (double cause)
 * 3. Conditional complex: Si X, ce qui impliquerait Y, à moins que Z...
 * 4. Relative embedding: N qui, dont X, et que Y... (multiple relatives)
 *
 * **Key Concepts:**
 * - Sentence compression: Combining multiple simple sentences into complex structures
 * - Participial phrases: Méditant sur..., Les précipitations ayant...
 * - Subject clauses: Que les données corroborent... est un fait
 * - Cleft constructions: C'est... qui... with elaboration
 * - Litotic complexity: Loin d'être dépourvus, ne saurait occulter
 * - Evidential sophistication: Si l'on en croit..., sauf erreur de notre part
 * - Temporal absolutes: La réunion close..., Les précipitations ayant...
 * - Concessive stacking: Talentueux qu'il soit..., pour n'avoir... jamais...
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to syntactic mastery
 * 4. subordinationPatterns - Four advanced subordination patterns
 * 5. weakStrongExpertExamples - 3-tier syntactic progression
 * 6. transformations - 3 compression/expansion examples
 * 7. practiceQuestions - 15 transformation quiz questions
 * 8. getResultMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all module section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to sentence architecture
 * 2. subordination - Advanced subordination patterns
 * 3. compression - Sentence compression techniques
 * 4. clarity - Balancing clarity with complexity
 * 5. density - Sentence density control
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "subordination", "compression", "clarity", "density", "practice", "completion"];

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
  subtitle: "Master advanced subordination, sentence compression, and the balance between clarity and density. Construct prose at the highest level of sophistication.",
  /** Module number in C2 series */
  moduleNumber: 6,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to complex sentence mastery.
 *
 * Content:
 * - The Architecture of Complexity: Layering subordinate clauses, embedding participial phrases
 * - Compression and Expansion: Controlling sentence density with structural control
 */
export const introSections = [
  {
    title: "The Architecture of Complexity",
    content: "At C2, sentences become architectural marvels. You layer subordinate clauses, embed participial phrases, and balance density with clarity. The goal is not complexity for its own sake but expressive precision—saying exactly what you mean with elegance and economy.",
  },
  {
    title: "Compression and Expansion",
    content: "C2 mastery means controlling sentence density. You can compress three simple sentences into one elegant complex sentence, or expand a single idea into a layered exploration. Both require structural control and syntactic sophistication.",
  },
];

// =============================================================================
// ADVANCED SUBORDINATION PATTERNS
// =============================================================================

/**
 * subordinationPatterns - Four advanced subordination patterns for C2 mastery.
 *
 * Patterns:
 * - Temporal layering: Quand X, Y qui Z, alors... (three temporal layers)
 * - Causal stacking: Parce que X, et que Y, il s'ensuit que... (double cause to hedged conclusion)
 * - Conditional complex: Si X, ce qui impliquerait Y, à moins que Z... (main + implication + exception)
 * - Relative embedding: N qui, dont X, et que Y... (multiple relatives layering information)
 *
 * Each pattern includes structure, example, and analysis.
 */
export const subordinationPatterns = {
  title: "Advanced Subordination Patterns",
  patterns: [
    { pattern: "Temporal layering", structure: "Quand X, Y qui Z, alors...", example: "Quand les résultats furent publiés, ceux qui avaient misé sur l'innovation constatèrent que leurs efforts avaient été récompensés.", analysis: "Three temporal layers: publication, actors, realization" },
    { pattern: "Causal stacking", structure: "Parce que X, et que Y, il s'ensuit que...", example: "Parce que les données étaient contradictoires, et qu'aucune méta-analyse n'était disponible, il s'ensuit que toute conclusion reste précaire.", analysis: "Double cause leading to hedged conclusion" },
    { pattern: "Conditional complex", structure: "Si X, ce qui impliquerait Y, à moins que Z...", example: "Si cette hypothèse se vérifiait, ce qui impliquerait un changement de paradigme, à moins que des facteurs externes n'interviennent.", analysis: "Main condition + implication + limiting exception" },
    { pattern: "Relative embedding", structure: "N qui, dont X, et que Y...", example: "L'auteur, dont l'influence sur la discipline reste considérable, et que les critiques continuent de citer, a profondément marqué la pensée.", analysis: "Multiple relative clauses layering information" },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES
// =============================================================================

/**
 * weakStrongExpertExamples - Three-tier progression in syntactic complexity.
 *
 * Examples showing sentence sophistication:
 * - Simple chain → participial + passive + relative → multiple embedding + temporal + 'au grand dam'
 * - Simple contrast → conditional + sophisticated concession → concessive + litotic 'ne saurait occulter'
 * - Simple cause-effect → relative with content → complex embedding + 'au terme' + 'qui avait vu s'affronter'
 *
 * Each includes detailed analysis of the syntactic progression.
 */
export const weakStrongExpertExamples = [
  {
    weak: "Il pleut. Donc le match est annulé. Les gens sont mécontents.",
    strong: "Les précipitations persistantes ayant rendu le terrain impraticable, la rencontre fut annulée, ce qui suscita une vive déception.",
    expert: "Les précipitations, qui s'étaient abattues avec une intensité inhabituelle sur le terrain depuis l'aube, ayant impraticable fait le site de la rencontre, celle-ci, qui devait constituer l'événement sportif majeur de la saison, fut, au grand dam des spectateurs et malgré les efforts déployés, contrainte d'être reportée.",
    analysis: "Progression: simple chain → participial + passive + relative → multiple embedding + temporal expansion + 'au grand dam' + 'contrainte'.",
  },
  {
    weak: "L'étude dit que c'est vrai. Mais d'autres pensent autre chose.",
    strong: "Si les conclusions de cette étude corroborent l'hypothèse initiale, il n'en demeure pas moins que des voix discordantes continuent de s'élever.",
    expert: "Que les conclusions de cette étude, pour méthodologiquement irréprochables qu'elles soient, corroborent l'hypothèse en lice ne saurait occulter le fait que des voix, par ailleurs légitimes, continuent de s'élever pour en contester la portée générale.",
    analysis: "Progression: simple contrast → conditional + sophisticated concession → concessive clause + litotic 'ne saurait occulter' + embedded evaluation.",
  },
  {
    weak: "Le gouvernement a fait une loi. Les entreprises doivent suivre cette loi.",
    strong: "La législation récemment adoptée, qui impose aux entreprises de nouvelles contraintes, vise à renforcer la protection.",
    expert: "Cette législation, adoptée au terme d'un processus législatif qui avait vu s'affronter partisans d'une régulation accrue et défenseurs du laisser-faire, et qui impose désormais aux entreprises, quelle que soit leur taille ou leur secteur d'activité, des contraintes drastiques en matière de conformité, vise, par-delà l'effet dissuasif immédiat, à instaurer une culture du respect des normes.",
    analysis: "Progression: simple cause-effect → relative with simple content → complex embedding + 'au terme' + 'qui avait vu s'affronter' + 'quelle que soit' + purposive 'par-delà'.",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Three examples of sentence compression and expansion.
 *
 * Techniques demonstrated:
 * - Multiple embedding + evidential + concessive: compressing three sentences
 * - Litotic stack + multiple embedding + purposive expansion: urgency and scope
 * - Subject clause + concessive embedding + litotic conclusion: protests and inflexibility
 *
 * Each transformation shows original, improved, expert, and technique name.
 */
export const transformations = [
  {
    original: "L'entreprise a des difficultés. Elle perd de l'argent. Les employés sont inquiets.",
    improved: "Les difficultés financières que traverse l'entreprise, et qui se traduisent par des pertes substantielles, génèrent une légitime inquiétude parmi le personnel.",
    expert: "Les difficultés financières, qui, si l'on en croit les derniers rapports, ne cessent de s'aggraver et qui se traduisent par des pertes substantielles, génèrent, bien que les dirigeants tentent de le dissimuler, une inquiétude légitime parmi un personnel de plus en plus dubitatif quant à l'avenir de l'entreprise.",
    technique: "Multiple embedding + evidential + concessive",
  },
  {
    original: "Le projet est important. Il faut le finir vite. Sinon on aura des problèmes.",
    improved: "L'importance stratégique de ce projet commande son achèvement dans les meilleurs délais, faute de quoi des conséquences dommageables ne manqueraient pas de se manifester.",
    expert: "L'importance stratégique de ce projet, que nul ne saurait sous-estimer en l'état actuel des choses, commande, et ce au-delà des seules considérations économiques immédiates, que soit mis en œuvre un plan d'action permettant son achèvement dans des délais réduits, faute de quoi des conséquences, dont on imagine sans peine l'ampleur, ne manqueraient pas de se faire immanquablement sentir.",
    technique: "Litotic stack + multiple embedding + purposive expansion",
  },
  {
    original: "Les gens protestent. Ils ne veulent pas de cette décision. Le gouvernement ne change pas d'avis.",
    improved: "Malgré les manifestations qui émaillent le paysage politique, les autorités demeurent inflexibles.",
    expert: "Que les manifestations, émaillant depuis des semaines le paysage politique et témoignant d'une opposition résolue à cette mesure, pour médiatisées qu'elles soient, n'empêchent point les autorités de demeurer inflexibles sur leur position, voilà qui ne saurait surprendre l'observateur averti des modes de gouvernance en vigueur.",
    technique: "Subject clause + concessive embedding + litotic conclusion",
  },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C2 Module 6 (all transformation type).
 *
 * Topics covered:
 * - Compression with maximum embedding (evidential + concessive + evaluative)
 * - Syntactic mastery: subordinate clause placement creating suspension
 * - Maximum embedding: multiple relatives + participial + parenthetical + litotic
 * - Participial phrases with temporal expansion + inspiration moment
 * - Litotic complexity: 'loin d'être dépourvus' + concessive + embedded relative
 * - Subject clauses with concessive embedding + litotic conclusion
 * - Elegant compression: concessive + evaluative + causative inversion
 * - Nested conditionals: concessive + counter-expectation + multiple subjunctives
 * - Expert antithesis: subject clause + dual concessive + philosophical
 * - Maximum density: subject clause + dash elaboration + generalizing conclusion
 * - Cleft elaboration: negated alternative + concessive + temporal
 * - Temporal sophistication: absolute + temporal expansion + 'non sans'
 * - Maximum concessive: literary concessive + participial stack + 'sauf à'
 * - Evidential sophistication: evidential + embedded relative + hedged
 * - Final challenge: subject clause + stacked concessive + temporal + existential
 *
 * Each question has:
 * - id: unique identifier
 * - type: question category (all transformation)
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
    type: "transformation",
    prompt: "Compress to elegant complex sentence:",
    context: "The company failed. It lost money. Investors are worried.",
    options: [
      "La société a échoué. Elle a perdu de l'argent. Les investisseurs sont inquiets.",
      "La déconfiture de cette entreprise, qui s'est traduite par des pertes considérables, suscite des inquiétudes légitimes.",
      "La déconfiture, qui, selon les rapports, s'aggrave et se traduit par des pertes, génère, bien que dissimulée, une inquiétude légitime parmi un personnel dubitatif.",
    ],
    correct: 2,
    explanation: "Maximum embedding with evidential, concessive, and evaluative elements.",
    nuance: "Expert compression uses multiple layers of embedding.",
  },
  {
    id: 2,
    type: "transformation",
    prompt: "Which demonstrates best syntactic mastery?",
    options: [
      "Il a parlé et les gens ont écouté parce que c'était important.",
      "Son propos, parce qu'il touchait à des questions essentielles, retint l'attention de son auditoire.",
    ],
    correct: 1,
    explanation: "Subordinate clause placement creates suspension; 'retint' elevates.",
    nuance: "Subordinate clauses create syntactic sophistication.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Create maximum embedding:",
    context: "The book is famous. Its author won a prize. Everyone has read it.",
    options: [
      "Le livre est célèbre. Son auteur a gagné un prix. Tout le monde l'a lu.",
      "Cet ouvrage, dont l'auteur fut couronné et que chacun s'accorde à reconnaître comme majeur, occupe une place particulière.",
      "Cet ouvrage, que, couronné d'un prix prestigieux ayant été son auteur, et que chacun, dans une sorte de consensus tacite mais néanmoins réel, s'accorde à reconnaître comme majeur, occupe, et c'est là un fait dont on ne saurait méconnaître la portée, une place tout à fait particulière.",
    ],
    correct: 2,
    explanation: "Extreme embedding: multiple relatives + participial + parenthetical + litotic conclusion.",
    nuance: "Maximum complexity requires careful balance with clarity.",
  },
  {
    id: 4,
    type: "transformation",
    prompt: "Use participial phrase for maximum elegance:",
    context: "He thought about the problem. He wrote the solution.",
    options: [
      "Il pensait au problème. Il a écrit la solution.",
      "Méditant sur cette problématique, il élabora une réponse.",
      "Méditant, et ce depuis des lustres déjà, sur cette problématique qui l'obsédait au point de lui faire perdre le sommeil, il élabora, dans un moment d'inspiration soudaine qui ne le quitterait plus, une réponse.",
    ],
    correct: 2,
    explanation: "Participial + temporal expansion + relative + parenthetical + temporal continuation.",
    nuance: "Participles can be expanded with temporal and causal elaboration.",
  },
  {
    id: 5,
    type: "transformation",
    prompt: "Transform with litotic complexity:",
    context: "The results are good",
    options: [
      "Les résultats sont bons.",
      "Les résultats ne sont pas dépourvus de mérite.",
      "Les résultats obtenus, loin d'être dépourvus d'un certain mérite, ne sauraient cependant masquer les défis persistants qui demeurent à surmonter.",
    ],
    correct: 2,
    explanation: "Litotic 'loin d'être dépourvus' + 'ne sauraient' + concessive + embedded relative.",
    nuance: "Litotes can be combined with concessive structures.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Create subject clause for sophistication:",
    context: "The data supports the hypothesis",
    options: [
      "Les données soutiennent l'hypothèse.",
      "Que ces données corroborent l'hypothèse est un fait établi.",
      "Que ces données, pour contradictoires qu'elles puissent sembler en première analyse, corroborent en définitive l'hypothèse en lice est un fait désormais établi, et ce au-delà de tout doute raisonnable.",
    ],
    correct: 2,
    explanation: "Subject clause + concessive embedding + litotic conclusion + absolute confirmation.",
    nuance: "Subject clauses create sophisticated suspension.",
  },
  {
    id: 7,
    type: "transformation",
    prompt: "Maximum elegant compression:",
    context: "Despite the rain, they continued, showing determination",
    options: [
      "Malgré la pluie, ils ont continué. Ils montraient de la détermination.",
      "Malgré la pluie, ils poursuivirent, manifestant une détermination certaine.",
      "Les précipitations, quoique drues et persistantes, ne purent, tellement grande était leur détermination, les arrêter en leur course.",
    ],
    correct: 2,
    explanation: "Concessive + evaluative + causative inversion 'tellement grande' + archaism 'ne purent'.",
    nuance: "Inversion can create elegant emphasis.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Create nested conditional:",
    context: "If it rains, we'll cancel, unless we find shelter",
    options: [
      "S'il pleut, on annule, sauf si on trouve un abri.",
      "Si les précipitations venaient à compromettre la tenue de l'événement, une solution alternative devrait être envisagée, à moins que des dispositions ne soient prises.",
      "Si les précipitations, contre toute attente quant à leur intensité, venaient à compromettre la tenue de l'événement, qu'il s'agisse pourtant de l'accomplir, une solution, dont on imagine sans peine la difficulté, devrait, à moins que des dispositions, prises en amont et de manière préventive, ne viennent à être mises en œuvre, être envisagée.",
    ],
    correct: 2,
    explanation: "Maximum embedding: concessive + counter-expectation + multiple subjunctives + parentheticals.",
    nuance: "Maximum complexity stacks conditional and concessive layers.",
  },
  {
    id: 9,
    type: "transformation",
    prompt: "Expert antithesis construction:",
    options: [
      "Il y a une différence entre la théorie et la pratique.",
      "Un fossé sépare les principes affichés des réalisations effectives.",
      "Que les visées théoriques, pour nobles qu'elles soient, et les réalisations empiriques, pour modestes qu'elles paraissent, soient séparées par un fossé que nul ne saurait éluder est la marque des entreprises humaines.",
    ],
    correct: 2,
    explanation: "Subject clause + dual concessive + litotic conclusion + philosophical generalization.",
    nuance: "Antithesis can be elevated to philosophical statement.",
  },
  {
    id: 10,
    type: "transformation",
    prompt: "Create maximum density with clarity:",
    context: "The proposal failed. Reasons: cost, complexity, timing. Lessons learned.",
    options: [
      "La proposition a échoué à cause du coût, de la complexité et du timing. Nous avons appris des leçons.",
      "L'échec de cette proposition, imputable à des facteurs multiples—coût, complexité, calendrier—offre des enseignements précieux.",
      "Que cette proposition, dont l'échec, imputable à une conjonction malencontreuse de facteurs—coût prohibitif, complexité technique et contraintes temporelles irréductibles—apparaît désormais consommé, offre des enseignements dont la portée dépasse le seul cas d'espèce est une évidence.",
    ],
    correct: 2,
    explanation: "Subject clause + dash elaboration + evaluative + generalizing conclusion.",
    nuance: "Density requires careful structural organization.",
  },
  {
    id: 11,
    type: "transformation",
    prompt: "Use cleft for maximum emphasis:",
    context: "This factor caused the problem",
    options: [
      "Ce facteur a causé le problème.",
      "C'est ce facteur qui a causé le problème.",
      "C'est ce facteur, et non pas tel autre dont on aurait pu, à première vue, tenir compte, qui, en définitive et malgré les apparences contraires, s'avéra être à l'origine de la difficulté.",
    ],
    correct: 2,
    explanation: "Cleft + negated alternative + concessive + temporal markers.",
    nuance: "Clefts can be elaborated with alternatives and concessions.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Create temporal sophistication:",
    context: "After the meeting, they decided to act",
    options: [
      "Après la réunion, ils ont décidé d'agir.",
      "La réunion close, ils décidèrent d'agir.",
      "La réunion, qui s'était éternisée bien au-delà des délais raisonnables et au cours de laquelle s'étaient affrontés des points de vue inconciliables, une fois close, ils décidèrent, non sans quelque hésitation manifeste, d'agir.",
    ],
    correct: 2,
    explanation: "Absolute + temporal expansion + conflict description + litotic 'non sans'.",
    nuance: "Temporal absolutes can embed narrative detail.",
  },
  {
    id: 13,
    type: "transformation",
    prompt: "Maximum concessive complexity:",
    context: "He's talented but hasn't succeeded",
    options: [
      "Il est talentueux mais il n'a pas encore réussi.",
      "Talentueux qu'il soit, il n'a pas encore connu le succès.",
      "Talentueux qu'il soit, et pour n'avoir, bien que persévérant dans ses efforts, jamais dévié de sa trajectoire, il n'a pas encore, sauf à considérer des succès partiels dont on peut discuter la portée, connu le succès au sens plein du terme.",
    ],
    correct: 2,
    explanation: "Literary concessive + participial stack + limiting 'sauf à' + definitional precision.",
    nuance: "Concessives can be nested with multiple qualifications.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Create evidential sophistication:",
    context: "Apparently, the data shows this",
    options: [
      "Apparemment, les données montrent ça.",
      "Selon toute apparence, les données suggèrent ceci.",
      "Si l'on en croit les données, dont la fiabilité, pour méthodologiquement irréprochable qu'elle soit, n'est pas à l'abri de tout questionnement, il apparaîtrait, sauf erreur de notre part, que...",
    ],
    correct: 2,
    explanation: "Evidential + embedded relative with concessive + hedged conclusion.",
    nuance: "Evidential markers can be heavily hedged.",
  },
  {
    id: 15,
    type: "transformation",
    prompt: "Final challenge - maximum complexity with clarity:",
    context: "The situation is difficult. We must act. There are risks.",
    options: [
      "La situation est difficile. Nous devons agir. Il y a des risques.",
      "La situation, pour difficile qu'elle soit, impose une action résolue, quoique risquée.",
      "Que la situation, pour difficile, complexe et précaire qu'elle se révèle être, et qu'elle demeure, malgré les efforts déployés et les tentatives, certes nombreuses, pour en stabiliser les paramètres, impose une action résolue, quoique, il faut en convenir, risquée, est un fait.",
    ],
    correct: 2,
    explanation: "Subject clause + stacked concessive + temporal continuity + concessive conclusion + existential statement.",
    nuance: "Maximum complexity requires careful syntactic management.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on relative clauses and participial
 *   phrases, practicing nominalization and subordinate clause embedding
 * - 8-11/15: "Strong performance" - encourages refining clefts and litotes,
 *   stacking multiple clauses while maintaining clarity
 * - 12-15/15: "Excellent syntactic mastery" - celebrates elegant layered sentences
 *   with sophisticated subordination and precise nominalization
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Complex syntax requires practice. Focus on combining relative clauses and using participial phrases.",
      focus: "Practice nominalization and subordinate clause embedding.",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your sentence construction is becoming sophisticated. Continue refining your use of clefts and litotes.",
      focus: "Work on stacking multiple clauses while maintaining clarity.",
    };
  }
  return {
    title: "Excellent syntactic mastery",
    message: "You construct elegant, layered sentences with sophisticated subordination and precise nominalization. Your syntax flows with near-native complexity.",
    focus: "Continue developing your ability to balance maximum density with clarity.",
  };
}
