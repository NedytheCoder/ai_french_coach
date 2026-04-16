/**
 * C1 Module 7 - Text Analysis & Interpretation
 * ================================================
 *
 * This file contains all lesson data for C1 Module 7, teaching advanced French
 * learners to read beneath the surface and interpret implicit meaning with
 * analytical precision.
 *
 * **Module Content:**
 * - Introduction: Reading as analysis, layers of text
 * - Tone markers: Identifying ironic, hedging, authoritative, confrontational, euphemistic tones
 * - Weak vs Strong examples: Analytical reading formulations
 * - Transformations: Elevating surface reading to analytical interpretation
 * - Subtext analysis framework: Questions for decoding implicit meaning
 * - 15 practice quiz questions (tone, comparison, transformation types)
 *
 * **Key Concepts:**
 * - Reading as analysis: Not decoding but interpreting meaning construction
 * - Tone identification: Recognizing markers like "bien sûr", "semble", "force est de constater"
 * - Subtext analysis: What is NOT said, who benefits, what is presupposed
 * - Rhetorical strategies: Exposing techniques like ad hominem, euphemism, framing
 * - Analytical vocabulary: Technical terms for sophisticated interpretation
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to text analysis
 * 4. toneMarkers - Tone identification markers by category
 * 5. weakVsStrongExamples - Before/after analytical reading examples
 * 6. transformations - Analytical transformation examples
 * 7. subtextAnalysis - Framework for subtext analysis
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
 * 1. intro - Introduction to reading as analysis
 * 2. tone-identification - Tone markers and identification
 * 3. intent-analysis - Author intent analysis
 * 4. reading-between - Reading between the lines
 * 5. subtext - Subtext and implicit meaning
 * 6. interpretation - Interpretation strategies
 * 7. practice - Interactive quiz
 * 8. completion - Module completion
 */
export const sectionIds = ["intro", "tone-identification", "intent-analysis", "reading-between", "subtext", "interpretation", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Text Analysis & Interpretation",
  /** Brief description of module content */
  subtitle: "Read beneath the surface. Identify tone, decode intent, and interpret implicit meaning with analytical precision.",
  /** Module number in C1 series */
  moduleNumber: 7,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to text analysis and interpretation.
 *
 * Content:
 * - Reading as Analysis: Interpreting meaning construction through word choice, structure, subtext
 * - The Layers of Text: Explicit content, implicit attitudes, rhetorical strategies, cultural subtext
 */
export const introSections = [
  {
    title: "Reading as Analysis",
    content: "At C1, reading is not decoding but interpreting. You analyze how meaning is constructed through word choice, structure, and subtext. You understand not just what is said, but why it is said that way—and what remains unsaid.",
  },
  {
    title: "The Layers of Text",
    content: "Every text operates on multiple levels: explicit content, implicit attitudes, rhetorical strategies, and cultural subtext. C1 mastery requires navigating all these layers simultaneously.",
  },
];

// =============================================================================
// TONE MARKERS
// =============================================================================

/**
 * toneMarkers - Tone identification markers for analytical reading.
 *
 * Categories:
 * - Ironic/Sarcastic: "bien sûr", "évidemment", "comme par hasard", "quelle surprise"
 * - Hedging/Cautious: "semble", "pourrait", "apparemment", "sans doute"
 * - Authoritative: "il est clair que", "nul ne peut nier", "force est de constater"
 * - Confrontational: "il faut choisir", "ou bien... ou bien", "ne saurait"
 * - Euphemistic: "ne pas être en mesure de", "difficultés", "s'interroger sur"
 */
export const toneMarkers = {
  title: "Tone Identification Markers",
  tones: [
    { tone: "Ironic/Sarcastic", markers: ["bien sûr", "évidemment", "comme par hasard", "quelle surprise"], example: "Bien sûr, la décision a été prise 'démocratiquement'.", analysis: "Scare quotes + 'bien sûr' signal skepticism" },
    { tone: "Hedging/Cautious", markers: ["semble", "pourrait", "apparemment", "sans doute"], example: "Les résultats semblent indiquer une tendance possible.", analysis: "Multiple hedges create measured distance" },
    { tone: "Authoritative", markers: ["il est clair que", "nul ne peut nier", "force est de constater"], example: "Il est clair que cette approche s'impose.", analysis: "Strong assertions without qualification" },
    { tone: "Confrontational", markers: ["il faut choisir", "ou bien... ou bien", "ne saurait"], example: "Ou bien nous agissons, ou bien nous renonçons.", analysis: "Binary framing forces position-taking" },
    { tone: "Euphemistic", markers: ["ne pas être en mesure de", "difficultés", "s'interroger sur"], example: "La société connaît actuellement des difficultés.", analysis: "Softening of harsh reality" },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Analytical reading formulation comparisons.
 *
 * Examples showing how to transform casual description into
 * sophisticated analytical interpretation using technical vocabulary
 * and rhetorical analysis.
 *
 * Scenarios: Critical analysis, rhetorical analysis, deconstructive reading, critical interpretation
 */
export const weakVsStrongExamples = [
  {
    weak: "Il dit que c'est bien mais il ne semble pas vraiment convaincu.",
    strong: "Son approbation, quelque peu tiède, ne surprendra point l'observateur attentif.",
    why: "'Tiède' captures lukewarm precision; 'ne surprendra point' is ironic understatement; 'observateur attentif' positions analyst above surface reading.",
    context: "Critical analysis",
  },
  {
    weak: "L'auteur critique le gouvernement de façon assez dure.",
    strong: "L'auteur ne ménage guère sa cible, multipliant les attaques ad hominem sous couvert d'analyse objective.",
    why: "'Ne ménage guère' is elegant; 'sous couvert de' exposes rhetorical strategy; 'ad hominem' identifies logical flaw.",
    context: "Rhetorical analysis",
  },
  {
    weak: "Il y a des choses qui ne sont pas dites dans ce texte.",
    strong: "Ces silences éloquents trahissent les non-dits structurants de ce discours.",
    why: "'Silences éloquents' is oxymoronic insight; 'trahissent' personifies; 'non-dits structurants' is analytical concept.",
    context: "Deconstructive reading",
  },
  {
    weak: "Le texte est écrit de manière à faire penser quelque chose sans le dire directement.",
    strong: "Cette insinuation systématique, à mi-voix, vise à suggérer sans jamais assumer.",
    why: "'Insinuation' names the strategy; 'à mi-voix' captures tone; 'suggérer sans assumer' identifies rhetorical cowardice.",
    context: "Critical interpretation",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Analytical transformation examples.
 *
 * Each transformation shows how to elevate surface reading to
 * analytical interpretation using various techniques.
 *
 * Techniques demonstrated:
 * - Nominalization + oxymoron
 * - Technical vocabulary + exposed motive
 * - Rhetorical vocabulary + exposed strategy
 */
export const transformations = [
  {
    original: "L'auteur dit qu'il aime cette idée mais on sent qu'il n'est pas sûr.",
    improved: "Cette approbation réservée, perceptible sous l'emphase proclamée, trahit des réserves sourdes.",
    technique: "Nominalization + oxymoron",
    explanation: "'Réservée + emphase' creates paradox; 'trahit' personifies; 'sourdes' adds subtext dimension.",
  },
  {
    original: "Il critique sans être trop direct pour ne pas avoir de problèmes.",
    improved: "Cette critique en creux, prudentielle, révèle une stratégie évidemment calculée de préservation.",
    technique: "Technical vocabulary + exposed motive",
    explanation: "'En creux' names indirect criticism; 'prudentielle' identifies motivation; 'évidemment calculée' is analytical judgment.",
  },
  {
    original: "Le texte veut nous faire croire quelque chose qui n'est pas vrai.",
    improved: "Ce raisonnement spécieux, habilement construit, cherche à imposer une conclusion fallacieuse.",
    technique: "Rhetorical vocabulary + exposed strategy",
    explanation: "'Spécieux' identifies logical flaw; 'habilement construit' acknowledges craft; 'fallacieuse' names deception.",
  },
];

// =============================================================================
// SUBTEXT ANALYSIS FRAMEWORK
// =============================================================================

/**
 * subtextAnalysis - Framework for analyzing implicit meaning and subtext.
 *
 * Key questions for subtext analysis:
 * - What is NOT being said? (strategic omissions)
 * - Who benefits from this framing? (power dynamics)
 * - What is presupposed? (hidden assumptions)
 * - What metaphors structure the argument? (conceptual framing)
 * - What emotions are being triggered? (affective manipulation)
 */
export const subtextAnalysis = {
  title: "Subtext Analysis Framework",
  questions: [
    { question: "What is NOT being said?", purpose: "Identify strategic omissions", example: "Absence of economic costs in pro-growth argument" },
    { question: "Who benefits from this framing?", purpose: "Expose power dynamics", example: "Corporate language benefiting management over workers" },
    { question: "What is presupposed?", purpose: "Uncover hidden assumptions", example: "'Even welfare recipients' assumes their inferiority" },
    { question: "What metaphors structure the argument?", purpose: "Reveal conceptual framing", example: "'War on poverty' frames complex problem as combat" },
    { question: "What emotions are being triggered?", purpose: "Identify affective manipulation", example: "Fear appeals in security discourse" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 7.
 *
 * Question types:
 * - tone (1, 4, 7, 10, 13): Identify tone markers and their signals
 * - comparison (2, 5, 8, 11, 14): Compare analytical formulations
 * - transformation (3, 6, 9, 12, 15): Transform to analytical interpretation
 *
 * Topics covered:
 * - Irony and sarcasm identification
 * - Hedging and cautious language
 * - Authoritative assertion markers
 * - Subtext and implicit meaning
 * - Rhetorical strategy analysis
 * - Euphemism analysis
 * - Repetition and psychological interpretation
 * - Surface reading vs depth analysis
 * - Presupposition and framing
 * - Metaphor and conceptual framing
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
    type: "tone",
    prompt: "Identify the tone: 'Bien sûr, les dirigeants ont agi dans l'intérêt général.'",
    options: ["Sincere approval", "Ironic skepticism", "Neutral reporting"],
    correct: 1,
    explanation: "'Bien sûr' + scare quotes signal sarcasm; overstatement suggests opposite.",
    nuance: "French irony often uses affirmation to signal doubt.",
  },
  {
    id: 2,
    type: "comparison",
    prompt: "Which demonstrates better analytical reading?",
    options: [
      "L'auteur est en colère contre le gouvernement.",
      "La virulence des attaques ad hominem, sous couvert d'analyse économique, trahit une animosité personnelle mal déguisée.",
    ],
    correct: 1,
    explanation: "Identifies rhetorical device ('ad hominem'); exposes strategy ('sous couvert'); names technique ('trahit').",
    nuance: "Analytical reading names rhetorical strategies explicitly.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Transform surface reading into analytical interpretation:",
    context: "Author is polite but critical",
    options: [
      "L'auteur est gentil mais critique.",
      "Cette politesse feutrée ne masque guère la critique acerbe qui traverse l'énoncé.",
      "Il dit des choses gentilles puis des méchancetés.",
    ],
    correct: 1,
    explanation: "'Feutrée' captures tone; 'ne masque guère' exposes; 'traverse' personifies criticism.",
    nuance: "Analytical vocabulary elevates description to interpretation.",
  },
  {
    id: 4,
    type: "tone",
    prompt: "What does 'Il semblerait que' signal in formal analysis?",
    options: ["Certainty", "Hedging/caution", "Excitement"],
    correct: 1,
    explanation: "Conditional 'semblerait' creates distance between analyst and claim.",
    nuance: "Hedging is professional caution, not weakness.",
  },
  {
    id: 5,
    type: "comparison",
    prompt: "Which better identifies subtext?",
    options: [
      "L'auteur ne parle pas des problèmes.",
      "Ces silences éloquents, ces non-dits stratégiques, trahissent les limites conscientes de ce raisonnement.",
    ],
    correct: 1,
    explanation: "'Silences éloquents' is oxymoron; 'stratégiques' identifies intent; 'trahissent' exposes.",
    nuance: "Subtext analysis transforms absence into meaning.",
  },
  {
    id: 6,
    type: "transformation",
    prompt: "Analyze rhetorical strategy:",
    context: "Author uses complex language to obscure simple point",
    options: [
      "C'est compliqué.",
      "Cette rhétorique ampoulée, loin d'éclairer, semble surtout destinée à impressionner par l'obscurité.",
      "Il utilise des mots difficiles.",
    ],
    correct: 1,
    explanation: "'Ampoulée' identifies style; 'loin d'éclairer' names failure; 'impressionner par l'obscurité' exposes motive.",
    nuance: "Rhetorical analysis judges effectiveness and intent.",
  },
  {
    id: 7,
    type: "tone",
    prompt: "'Force est de constater' signals what tone?",
    options: ["Uncertainty", "Authoritative assertion", "Confusion"],
    correct: 1,
    explanation: "Impersonal + 'force' creates necessity; allows no disagreement.",
    nuance: "Impersonal constructions create distance and authority.",
  },
  {
    id: 8,
    type: "comparison",
    prompt: "Which better analyzes euphemism?",
    options: [
      "L'auteur utilise des mots gentils pour des choses mauvaises.",
      "Ces euphémismes bien choisis visent à atténuer la gravité d'une réalité autrement dérangeante.",
    ],
    correct: 1,
    explanation: "Names technique ('euphémismes'); identifies purpose ('atténuer'); acknowledges craft ('bien choisis').",
    nuance: "Technical vocabulary demonstrates analytical competence.",
  },
  {
    id: 9,
    type: "transformation",
    prompt: "Transform observation into analytical interpretation:",
 context: "Author repeats same point often",
    options: [
      "Il dit la même chose plusieurs fois.",
      "Cette insistence lancinante, cette redite obsessionnelle, trahissent l'inquiétude de ne pas être entendu.",
      "Il répète pour être clair.",
    ],
    correct: 1,
    explanation: "'Lancinante' and 'obsessionnelle' evaluate negatively; 'trahissent' exposes psychology; 'inquiétude' interprets motive.",
    nuance: "Repetition analysis connects form to psychology.",
  },
  {
    id: 10,
    type: "tone",
    prompt: "What does 'à première vue' typically introduce?",
    options: ["Final conclusion", "Surface reading to be complicated", "Absolute certainty"],
    correct: 1,
    explanation: "'À première vue' sets up apparent reading that subsequent analysis will nuance or refute.",
    nuance: "This formula signals interpretive depth to follow.",
  },
  {
    id: 11,
    type: "comparison",
    prompt: "Which better decodes presupposition?",
    options: [
      "Le texte suppose des choses.",
      "Cette formulation présuppose l'existence d'un consensus là où règne en fait la controverse.",
    ],
    correct: 1,
    explanation: "Names technique ('présuppose'); identifies specific assumption; contrasts with reality ('là où règne').",
    nuance: "Presupposition analysis exposes hidden assumptions.",
  },
  {
    id: 12,
    type: "transformation",
    prompt: "Analyze implicit meaning:",
    context: "Author praises opponent's 'courage' for unpopular position",
    options: [
      "Il admire le courage.",
      "Cette louange ambiguë, soulignant le caractère 'courageux' d'une position impopulaire, suggère subtilement son caractère répréhensible.",
      "Il dit que l'autre est brave.",
    ],
    correct: 1,
    explanation: "'Ambiguë' identifies complexity; quotes isolate loaded term; 'suggère subtilement' names implicit communication.",
    nuance: "Irony analysis requires reading between affirmations.",
  },
  {
    id: 13,
    type: "tone",
    prompt: "'Comme par hasard' signals:",
    options: ["Sincere coincidence", "Ironic skepticism about timing", "Scientific randomness"],
    correct: 1,
    explanation: "Formula signals suspicion that timing was planned, not accidental.",
    nuance: "French irony often uses 'hasard' formulas.",
  },
  {
    id: 14,
    type: "comparison",
    prompt: "Which better analyzes framing?",
    options: [
      "L'auteur présente les choses d'une certaine façon.",
      "Ce cadrage sélectif, privilégiant les aspects favorables, occulte délibérément les données contradictoires.",
    ],
    correct: 1,
    explanation: "Names technique ('cadrage sélectif'); identifies strategy ('privilégiant'); exposes omission ('occulte').",
    nuance: "Framing analysis exposes construction of perspective.",
  },
  {
    id: 15,
    type: "transformation",
    prompt: "Transform into sophisticated analysis:",
    context: "Text uses war metaphors for policy debate",
    options: [
      "Il utilise des mots de guerre.",
      "Cette métaphorique belliqueuse, structurellement dominante, transforme un débat démocratique en affrontement existentiel.",
      "Il parle de batailles et de combats.",
    ],
    correct: 1,
    explanation: "'Métaphorique belliqueuse' is technical; 'structurellement dominante' shows analysis; 'affrontement existentiel' evaluates impact.",
    nuance: "Metaphor analysis connects language to conceptual framing.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on identifying tone markers
 *   like 'bien sûr' and 'semblerait', distinguishing explicit from implicit
 * - 8-11/15: "Nice progress" - encourages working on subtext and rhetorical
 *   strategies, using technical vocabulary (euphémisme, présupposition)
 * - 12-15/15: "Excellent analytical mastery" - celebrates sophisticated analytical
 *   awareness, identifying tone, subtext, and rhetorical strategies with precision
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Text analysis requires practice. Focus on identifying tone markers like 'bien sûr' and 'semblerait'.",
      focus: "Work on distinguishing explicit content from implicit meaning.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your analytical reading is developing. Continue refining your ability to decode subtext and rhetorical strategies.",
      focus: "Practice using technical vocabulary: euphémisme, présupposition, insinuation.",
    };
  }
  return {
    title: "Excellent analytical mastery",
    message: "You read with sophisticated analytical awareness, identifying tone, subtext, and rhetorical strategies with precision.",
    focus: "Continue developing your ability to connect formal choices to ideological effects.",
  };
}
