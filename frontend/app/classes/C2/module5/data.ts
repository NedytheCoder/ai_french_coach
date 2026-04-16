/**
 * C2 Module 5 - Interpretation & Implicit Meaning
 * ==================================================
 *
 * This file contains all lesson data for C2 Module 5, teaching mastery of
 * reading between the lines, detecting tone, and interpreting implicit meaning.
 * Students develop the analytical sensitivity of a near-native reader.
 *
 * **Module Content:**
 * - Introduction: Reading beneath the surface, the unsaid says more
 * - Tone Detection Markers: 5 tones (Ironic, Hedged, Dismissive, Passive-aggressive, Euphemistic)
 * - Weak/Strong/Expert examples: 3-tier progression in interpretation sophistication
 * - Subtext Analysis Framework: 4 analytical questions (what's not said, who benefits, etc.)
 * - 15 practice quiz questions (interpretation and transformation types)
 *
 * **Five Tone Categories:**
 * 1. Ironic: "bien sûr", "évidemment", scare quotes signal skepticism
 * 2. Hedged/Cautious: "semble", "pourrait", "apparemment" create measured distance
 * 3. Dismissive: "si tu veux", "comme tu voudras" signal lack of interest
 * 4. Passive-aggressive: "comme toujours", "sans surprise" imply pattern criticism
 * 5. Euphemistic: "difficultés", "s'interroger sur" soften harsh reality
 *
 * **Key Concepts:**
 * - Subtext: Reading what is NOT being said
 * - Implicit meaning: Understanding 'C'est intéressant' as reserved judgment
 * - Irony detection: Scare quotes + overstatement signal opposite meaning
 * - Presupposition analysis: Exposing hidden assumptions ('even experts')
 * - Metaphor analysis: 'War on poverty' frames problems as combat
 * - Euphemism: 'difficultés' as classic French understatement for crisis
 * - French formulas: 'bien sûr', 'comme par hasard', 'à première vue'
 *
 * **Subtext Analysis Questions:**
 * - What is NOT being said? (Identify strategic omissions)
 * - Who benefits from this framing? (Expose power dynamics)
 * - What is presupposed? (Uncover hidden assumptions)
 * - What metaphors structure the argument? (Reveal conceptual framing)
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to interpretive mastery
 * 4. toneMarkers - Five tone categories with markers and analysis
 * 5. weakStrongExpertExamples - 3-tier interpretation progression
 * 6. subtextPatterns - Four analytical framework questions
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
 * 1. intro - Introduction to interpretive reading
 * 2. subtext - Reading between the lines
 * 3. tone - Tone detection strategies
 * 4. implication - Implicit meaning analysis
 * 5. irony - Irony and sarcasm detection
 * 6. practice - Interactive quiz
 * 7. completion - Module completion
 */
export const sectionIds = ["intro", "subtext", "tone", "implication", "irony", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Interpretation & Implicit Meaning",
  /** Brief description of module content */
  subtitle: "Master reading between the lines, detecting tone, and interpreting implicit meaning. Develop the analytical sensitivity of a near-native reader.",
  /** Module number in C2 series */
  moduleNumber: 5,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to interpretation and implicit meaning mastery.
 *
 * Content:
 * - Reading Beneath the Surface: Detecting irony, criticism, resistance in text
 * - The Unsaid Says More: Understanding implication in native speaker communication
 */
export const introSections = [
  {
    title: "Reading Beneath the Surface",
    content: "At C2, you don't just read words—you interpret layers. You detect irony in praise, criticism in apparent neutrality, and resistance in apparent agreement. This module trains your sensitivity to subtext, tone, and implicit meaning.",
  },
  {
    title: "The Unsaid Says More",
    content: "Native speakers communicate extensively through implication. 'C'est intéressant' can mean 'I disagree,' 'I'm bored,' or 'I need to think about this.' C2 mastery means reading these signals with confidence and precision.",
  },
];

// =============================================================================
// TONE DETECTION MARKERS
// =============================================================================

/**
 * toneMarkers - Five tone categories with characteristic markers.
 *
 * Tones:
 * - Ironic: "bien sûr", "évidemment", scare quotes signal skepticism
 * - Hedged/Cautious: "semble", "pourrait", "apparemment" create measured distance
 * - Dismissive: "si tu veux", "comme tu voudras" signal lack of interest
 * - Passive-aggressive: "comme toujours", "sans surprise" imply pattern criticism
 * - Euphemistic: "difficultés", "s'interroger sur" soften harsh reality
 *
 * Each tone includes markers, example sentence, and analysis explanation.
 */
export const toneMarkers = {
  title: "Tone Detection Markers",
  tones: [
    { tone: "Ironic", markers: ["bien sûr", "évidemment", "comme par hasard", "quelle surprise"], example: "Bien sûr, la décision a été prise 'démocratiquement'.", analysis: "Scare quotes + overstatement signal skepticism" },
    { tone: "Hedged/Cautious", markers: ["semble", "pourrait", "apparemment", "sans doute"], example: "Les résultats semblent indiquer une tendance possible.", analysis: "Multiple hedges create measured distance" },
    { tone: "Dismissive", markers: ["si tu veux", "comme tu voudras", "fais comme tu veux"], example: "Si tu veux, on peut essayer.", analysis: "Apparent permission signals lack of interest" },
    { tone: "Passive-aggressive", markers: ["comme toujours", "sans surprise", "on s'en doutait"], example: "Comme toujours, tu as raison.", analysis: "Pattern attribution implies criticism" },
    { tone: "Euphemistic", markers: ["difficultés", "s'interroger sur", "ne pas être en mesure de"], example: "La société connaît des difficultés.", analysis: "Softens harsh reality" },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES
// =============================================================================

/**
 * weakStrongExpertExamples - Three-tier progression in interpretive analysis.
 *
 * Examples showing interpretation sophistication:
 * - 'on sent qu'il n'est pas sûr' → 'tiède' + 'ne surprendra point' → 'toute relative' + 'trahit' + 'peine à dissimuler'
 * - 'critique pas de façon directe' → 'sous couvert' + 'attaque ad hominem' → 'virulence' + 'voilées' + 'feint'
 * - 'choses pas dites' → oxymoron 'silences éloquents' + 'trahissent' → litotic 'loin d'être fortuites'
 * - 'faire penser sans dire' → 'insinuation systématique' → 'rhétorique de l'allusion' + 'à mi-voix' + 'en creux'
 *
 * Each includes detailed analysis of the interpretive progression.
 */
export const weakStrongExpertExamples = [
  {
    weak: "L'auteur dit que c'est bien mais on sent qu'il n'est pas sûr.",
    strong: "Son approbation, quelque peu tiède, ne surprendra point l'observateur attentif.",
    expert: "Cette approbation, toute relative, trahit des réserves que l'auteur peine à dissimuler, malgré ses efforts manifestes pour paraitre convaincu.",
    analysis: "Progression: vague 'dit que c'est bien' → 'tiède' precision + 'ne surprendra point' → 'toute relative' + 'trahit' + 'peine à dissimuler' + litotic observation.",
  },
  {
    weak: "Il critique le gouvernement mais pas de façon directe.",
    strong: "L'auteur ne ménage guère sa cible, multipliant les attaques ad hominem sous couvert d'analyse objective.",
    expert: "La virulence des attaques, habilement voilées sous une rhétorique d'objectivité affichée, révèle une animosité personnelle que l'auteur feint de tenir sous contrôle.",
    analysis: "Progression: basic description → 'ne ménage guère' + 'sous couvert' → 'virulence' + 'voilées' + 'feint de tenir sous contrôle' = sophisticated analysis.",
  },
  {
    weak: "Il y a des choses qui ne sont pas dites dans le texte.",
    strong: "Ces silences éloquents trahissent les non-dits structurants.",
    expert: "Ces lacunes, loin d'être fortuites, trahissent une stratégie rhétorique consciente visant à orienter l'interprétation sans en assumer pleinement les implications.",
    analysis: "Progression: vague 'choses pas dites' → oxymoron 'silences éloquents' + 'trahissent' → litotic 'loin d'être fortuites' + analytical conclusion.",
  },
  {
    weak: "Le texte veut nous faire penser quelque chose sans le dire.",
    strong: "Cette insinuation systématique vise à suggérer sans assumer.",
    expert: "Cette rhétorique de l'allusion, à mi-voix et en creux, cherche à imposer une lecture sans en assumer la paternité, créant ainsi une zone floue de déni plausible.",
    analysis: "Progression: vague 'faire penser' → 'insinuation systématique' + 'suggérer sans assumer' → 'rhétorique de l'allusion' + 'à mi-voix' + 'en creux' + 'déni plausible'.",
  },
];

// =============================================================================
// SUBTEXT ANALYSIS FRAMEWORK
// =============================================================================

/**
 * subtextPatterns - Four analytical questions for subtext analysis.
 *
 * Questions:
 * - What is NOT being said? Identify strategic omissions (e.g., absence of costs)
 * - Who benefits from this framing? Expose power dynamics (corporate language)
 * - What is presupposed? Uncover hidden assumptions ('even experts')
 * - What metaphors structure the argument? Reveal conceptual framing ('war on poverty')
 *
 * Each question includes purpose and example.
 */
export const subtextPatterns = {
  title: "Subtext Analysis Framework",
  questions: [
    { question: "What is NOT being said?", purpose: "Identify strategic omissions", example: "Absence of costs in pro-growth argument" },
    { question: "Who benefits from this framing?", purpose: "Expose power dynamics", example: "Corporate language benefiting management" },
    { question: "What is presupposed?", purpose: "Uncover hidden assumptions", example: "'Even experts' assumes their superiority" },
    { question: "What metaphors structure the argument?", purpose: "Reveal conceptual framing", example: "'War on poverty' frames problem as combat" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C2 Module 5.
 *
 * Question types:
 * - interpretation (1, 3, 4, 6, 7, 9, 10, 12, 13, 15): Detect tone and implicit meaning
 * - transformation (2, 5, 8, 11, 14): Transform into analytical interpretation
 *
 * Topics covered:
 * - Scare quotes + 'bien sûr' signal ironic skepticism
 * - 'politesse feutrée' masks acerbic critique
 * - 'C'est intéressant' as reserved judgment in academic contexts
 * - 'Si tu veux' + conditional signals dismissive permission
 * - Rhetoric analysis: 'ampoulée' vs 'spécieux' + 'habilement'
 * - Impersonal 'Force est de constater' as authoritative assertion
 * - 'Comme toujours' as pattern-based passive-aggressive criticism
 * - Repetition analysis: 'insistance lancinante' + 'redite obsessionnelle' = psychology
 * - 'À première vue' signals surface reading to be complicated
 * - 'Difficultés' as French euphemism for crisis
 * - Presupposition analysis: 'even experts' assumes hierarchy
 * - 'Comme par hasard' signals ironic skepticism about timing
 * - Metaphor analysis: 'war on poverty' frames problem as combat
 * - Ambiguous praise: 'courage' for unpopular position suggests criticism
 * - Expert analysis: 'virulence' + 'voilées' + 'feint de tenir sous contrôle'
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
    type: "interpretation",
    prompt: "Interpret: 'Bien sûr, les dirigeants ont agi dans l'intérêt général.' (with scare quotes around intérêt général)",
    options: ["Sincere praise", "Ironic skepticism", "Neutral reporting"],
    correct: 1,
    explanation: "Scare quotes + 'bien sûr' signal sarcasm; overstatement suggests opposite.",
    nuance: "French irony often uses overstatement and scare quotes.",
  },
  {
    id: 2,
    type: "transformation",
    prompt: "Transform observation into analytical interpretation:",
    context: "Author is polite but critical",
    options: [
      "L'auteur est gentil mais critique.",
      "Cette politesse feutrée ne masque guère la critique acerbe.",
      "Cette rhétorique de la politesse, à mi-voix et en creux, vise à imposer une lecture critique sans en assumer la paternité.",
    ],
    correct: 2,
    explanation: "Maximum analysis: 'rhétorique' + 'à mi-voix' + 'en creux' + 'imposer' + 'sans en assumer'.",
    nuance: "Expert interpretation names techniques and exposes strategy.",
  },
  {
    id: 3,
    type: "interpretation",
    prompt: "What does 'C'est intéressant' often imply in academic contexts?",
    options: ["Genuine interest", "I reserve judgment", "Strong agreement"],
    correct: 1,
    explanation: "In academic French, 'intéressant' often signals measured, non-committal evaluation.",
    nuance: "Intéressant is often a placeholder for reserved judgment.",
  },
  {
    id: 4,
    type: "interpretation",
    prompt: "Interpret subtext: 'Si tu veux, on peut essayer.'",
    options: ["Enthusiastic support", "Dismissive permission", "Uncertain hesitation"],
    correct: 1,
    explanation: "'Si tu veux' + conditional 'peut' signals lack of enthusiasm and passive resistance.",
    nuance: "Conditional + 'si tu veux' often signals dismissal.",
  },
  {
    id: 5,
    type: "transformation",
    prompt: "Analyze rhetorical strategy:",
    context: "Author uses complex language to obscure simple point",
    options: [
      "C'est compliqué.",
      "Cette rhétorique ampoulée, loin d'éclairer, semble surtout destinée à impressionner.",
      "Ce raisonnement spécieux, habilement construit, cherche à imposer une conclusion fallacieuse.",
    ],
    correct: 2,
    explanation: "Names technique ('spécieux'), acknowledges craft ('habilement'), exposes goal ('imposer conclusion fallacieuse').",
    nuance: "Expert analysis identifies logical flaws and rhetorical strategies.",
  },
  {
    id: 6,
    type: "interpretation",
    prompt: "What does 'Force est de constater' signal?",
    options: ["Uncertainty", "Authoritative assertion", "Confusion"],
    correct: 1,
    explanation: "Impersonal + 'force' creates necessity; allows no disagreement.",
    nuance: "Impersonal constructions create distance and authority.",
  },
  {
    id: 7,
    type: "interpretation",
    prompt: "Interpret: 'Comme toujours, tu as raison.'",
    options: ["Genuine agreement", "Pattern-based criticism", "Neutral observation"],
    correct: 1,
    explanation: "'Comme toujours' implies this is a recurring, tiresome pattern; passive-aggressive.",
    nuance: "Pattern attribution ('comme toujours') implies criticism.",
  },
  {
    id: 8,
    type: "transformation",
    prompt: "Transform observation into subtext analysis:",
    context: "Author repeats same point often",
    options: [
      "Il dit la même chose plusieurs fois.",
      "Cette insistence lancinante, cette redite obsessionnelle, trahissent l'inquiétude de ne pas être entendu.",
    ],
    correct: 1,
    explanation: "Evaluative adjectives ('lancinante', 'obsessionnelle') + 'trahissent' + psychological interpretation.",
    nuance: "Repetition analysis connects form to psychology.",
  },
  {
    id: 9,
    type: "interpretation",
    prompt: "What does 'à première vue' typically introduce?",
    options: ["Final conclusion", "Surface reading to be complicated", "Absolute certainty"],
    correct: 1,
    explanation: "Sets up apparent reading that subsequent analysis will nuance or refute.",
    nuance: "This formula signals interpretive depth to follow.",
  },
  {
    id: 10,
    type: "interpretation",
    prompt: "Interpret euphemism: 'La société connaît des difficultés.'",
    options: ["Minor problems", "Serious crisis", "Normal operations"],
    correct: 1,
    explanation: "'Difficultés' is classic French euphemism for crisis; formal contexts use understatement.",
    nuance: "French formal discourse uses understatement for bad news.",
  },
  {
    id: 11,
    type: "transformation",
    prompt: "Decode presupposition:",
    context: "Even experts sometimes make mistakes",
    options: [
      "Les experts font parfois des erreurs.",
      "Cette formulation présuppose l'existence d'une hiérarchie cognitive là où règne la controverse.",
    ],
    correct: 1,
    explanation: "Names technique ('présuppose'); identifies assumption ('hiérarchie cognitive'); contrasts with reality ('controverse').",
    nuance: "Presupposition analysis exposes hidden assumptions.",
  },
  {
    id: 12,
    type: "interpretation",
    prompt: "What does 'comme par hasard' signal?",
    options: ["Sincere coincidence", "Ironic skepticism about timing", "Scientific randomness"],
    correct: 1,
    explanation: "Formula signals suspicion that timing was planned, not accidental.",
    nuance: "French irony often uses 'hasard' formulas.",
  },
  {
    id: 13,
    type: "interpretation",
    prompt: "Interpret framing: 'The war on poverty'",
    options: ["Neutral description", "Military metaphor", "Economic analysis"],
    correct: 1,
    explanation: "'War' metaphor frames social problem as combat with enemies, casualties, and victory/defeat.",
    nuance: "Metaphors structure how we conceptualize problems.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Analyze implicit meaning:",
    context: "Author praises opponent's 'courage' for unpopular position",
    options: [
      "Il admire le courage.",
      "Cette louange ambiguë, soulignant le caractère 'courageux' d'une position impopulaire, suggère subtilement son caractère répréhensible.",
    ],
    correct: 1,
    explanation: "Identifies ambiguity; notes loaded term in quotes; suggests implicit criticism.",
    nuance: "Irony analysis requires reading between affirmations.",
  },
  {
    id: 15,
    type: "interpretation",
    prompt: "Which demonstrates best analytical reading?",
    options: [
      "L'auteur est en colère contre le gouvernement.",
      "La virulence des attaques, habilement voilées sous une rhétorique d'objectivité affichée, révèle une animosité personnelle que l'auteur feint de tenir sous contrôle.",
    ],
    correct: 1,
    explanation: "Evaluative vocabulary ('virulence', 'voilées'); identifies technique ('rhétorique d'objectivité'); exposes strategy ('feint').",
    nuance: "Expert analysis names techniques and exposes hidden motives.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on tone markers ('bien sûr', 'semblerait')
 *   and distinguishing explicit content from implicit meaning
 * - 8-11/15: "Strong performance" - encourages refining subtext decoding and using
 *   technical vocabulary: euphémisme, présupposition, insinuation
 * - 12-15/15: "Excellent interpretive mastery" - celebrates sophisticated analytical
 *   awareness with near-native precision in detecting tone and implicit meaning
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Interpretation requires practice. Focus on tone markers like 'bien sûr' and 'semblerait'.",
      focus: "Work on distinguishing explicit content from implicit meaning.",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your analytical reading is developing well. Continue refining your ability to decode subtext.",
      focus: "Practice using technical vocabulary: euphémisme, présupposition, insinuation.",
    };
  }
  return {
    title: "Excellent interpretive mastery",
    message: "You read with sophisticated analytical awareness, detecting tone, subtext, and implicit meaning with near-native precision.",
    focus: "Continue developing your ability to connect formal choices to ideological effects.",
  };
}
