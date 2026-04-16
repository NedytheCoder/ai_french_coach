/**
 * C2 Module 2 - Register & Stylistic Flexibility
 * ================================================
 *
 * This file contains all lesson data for C2 Module 2, teaching near-native
 * register control. Students master seamless shifts between academic, professional,
 * neutral, and conversational styles.
 *
 * **Module Content:**
 * - Introduction: Register as social intelligence, four registers of C2 mastery
 * - Register spectrum: Four register markers (Academic, Professional, Neutral, Conversational)
 * - Weak/Strong/Expert examples: 3-tier progression across register levels
 * - Register shifts: Same content expressed in four different styles
 * - 15 practice quiz questions (register identification and transformation)
 *
 * **Four Registers of C2 Mastery:**
 * - Academic: Dense, abstract, hedged (nominalization, impersonality, complex subordination)
 * - Professional: Clear, courteous, action-oriented (conditional politeness, specific outcomes)
 * - Neutral: Natural, accessible, balanced (moderate formality)
 * - Conversational: Spontaneous, idiomatic, engaged (fillers, personal markers)
 *
 * **Key Concepts:**
 * - Register markers: Language features that signal each register level
 * - Register shifts: Expressing same content in different styles
 * - Academic register: 'Il apparaît que', nominalization, hedging
 * - Professional register: 'Je vous saurais gré', conditional politeness
 * - Conversational register: 'Tu vois', 'quoi', fillers, intensifiers
 * - Courtesy formulas: Traditional expressions for formal contexts
 * - Strategic register choice: Matching register to audience and purpose
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to register mastery
 * 4. registerSpectrum - Four register markers with examples
 * 5. weakStrongExpertExamples - 3-tier progression examples
 * 6. registerShifts - Same content in four registers
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
 * 1. intro - Introduction to register as social intelligence
 * 2. register-spectrum - Four register markers
 * 3. academic - Academic register mastery
 * 4. professional - Professional register mastery
 * 5. conversational - Conversational register mastery
 * 6. switching - Register switching strategies
 * 7. practice - Interactive quiz
 * 8. completion - Module completion
 */
export const sectionIds = ["intro", "register-spectrum", "academic", "professional", "conversational", "switching", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Register & Stylistic Flexibility",
  /** Brief description of module content */
  subtitle: "Master seamless register shifts. Move fluently between academic, professional, neutral, and conversational styles with native-like control.",
  /** Module number in C2 series */
  moduleNumber: 2,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to register mastery and stylistic flexibility.
 *
 * Content:
 * - Register as Social Intelligence: Automatic and nuanced register choice
 * - The Four Registers: Academic, Professional, Neutral, Conversational mastery
 */
export const introSections = [
  {
    title: "Register as Social Intelligence",
    content: "At C2, register choice is automatic and nuanced. You don't just know formal vs informal—you control the subtle gradations within each register. You shift seamlessly based on audience, context, and purpose, with the effortlessness of a native speaker.",
  },
  {
    title: "The Four Registers of C2 Mastery",
    content: "Academic: dense, abstract, hedged. Professional: clear, courteous, action-oriented. Neutral: natural, accessible, balanced. Conversational: spontaneous, idiomatic, engaged. C2 mastery means commanding all four and moving between them fluently.",
  },
];

// =============================================================================
// REGISTER SPECTRUM
// =============================================================================

/**
 * registerSpectrum - The four registers of C2 mastery with markers and examples.
 *
 * Registers:
 * - Academic: Nominalization, hedging, impersonality, complex subordination
 * - Professional: Clear action verbs, conditional politeness, specific outcomes
 * - Neutral: Natural flow, moderate formality, accessible vocabulary
 * - Conversational: Fillers, idioms, personal markers, spontaneous syntax
 *
 * Each register includes characteristic markers and authentic example sentences.
 */
export const registerSpectrum = {
  title: "Register Markers at C2",
  registers: [
    { register: "Academic", markers: "Nominalization, hedging, impersonality, complex subordination", example: "Il apparaît que les données disponibles suggèrent une corrélation significative, quoique non dépourvue de ambiguïtés." },
    { register: "Professional", markers: "Clear action verbs, conditional politeness, specific outcomes", example: "Nous vous serions reconnaissants de bien vouloir examiner cette proposition et de nous faire part de votre décision avant le 15 courant." },
    { register: "Neutral", markers: "Natural flow, moderate formality, accessible vocabulary", example: "Je pense que cette idée mérite d'être étudiée de plus près avant de prendre une décision." },
    { register: "Conversational", markers: "Fillers, idioms, personal markers, spontaneous syntax", example: "Tu vois, moi, je trouve que c'est une idée à creuser, quoi. Faut pas se précipiter." },
  ],
};

// =============================================================================
// WEAK/STRONG/EXPERT EXAMPLES
// =============================================================================

/**
 * weakStrongExpertExamples - Three-tier progression showing register mastery.
 *
 * Each example shows progression across different registers:
 * - Academic progression: 'intéressante' → 'stimulante' → 'fertilite heuristique'
 * - Professional escalation: 'je veux' → 'saurais gré' → 'obligés' + 'célérité'
 * - Formal progression: 'faut qu'on parle' → 'serait opportun' → 's'impose'
 * - Conversational progression: 'pas clair' → 'pas certain' → 'je te suis plus trop'
 *
 * Each includes detailed analysis of the register progression.
 */
export const weakStrongExpertExamples = [
  {
    weak: "Cette théorie est intéressante mais il y a des problèmes.",
    strong: "Cette théorie, certes stimulante, soulève néanmoins des questions méthodologiques importantes.",
    expert: "La fertilité heuristique de ce cadre théorique, à n'en point douter, ne saurait occulter les questionnements épistémologiques qu'il soulève de manière concomitante.",
    analysis: "Academic progression: generic 'intéressante' → 'stimulante' + 'méthodologiques' → 'fertilite heuristique' + 'épistémologiques' + 'concomitante'.",
  },
  {
    weak: "Je veux que vous fassiez ce travail vite.",
    strong: "Je vous saurais gré de bien vouloir procéder à cette tâche dans les meilleurs délais.",
    expert: "Nous vous serions obligés de donner suite à cette demande avec la célérité que commande la situation.",
    analysis: "Professional escalation: direct 'je veux' → conditional 'saurais gré' → 'obligés' + 'célérité' + personified 'commande'.",
  },
  {
    weak: "Il faut qu'on parle de ce sujet plus en détail.",
    strong: "Il serait opportun d'examiner cette question de manière plus approfondie.",
    expert: "Une analyse plus fouillée de cette problématique s'impose, eu égard aux enjeux considérables qui en dépendent.",
    analysis: "Formal progression: 'faut qu'on parle' → conditional 'serait opportun' → 's'impose' + 'fouillée' + 'eu égard'.",
  },
  {
    weak: "C'est pas clair ce que tu veux dire.",
    strong: "Je ne suis pas certain de saisir exactement ce que tu entends.",
    expert: "Tu vois, là, je te suis plus trop. T'as un exemple pour illustrer ce que tu veux dire ?",
    analysis: "Conversational progression: blunt 'pas clair' → hedged 'pas certain' → natural 'je te suis plus trop' + request for example.",
  },
];

// =============================================================================
// REGISTER SHIFTS
// =============================================================================

/**
 * registerShifts - Same content expressed in four different registers.
 *
 * Contexts covered:
 * - Requesting information: Academic 'solliciterions' vs Professional 'pourriez-vous'
 *   vs Neutral 'j'aimerais savoir' vs Conversational 'tu peux me dire'
 * - Expressing disagreement: Academic nuanced critique vs Professional 'ne partageons pas'
 *   vs Neutral 'pas tout à fait d'accord' vs Conversational 'mouais, bof'
 * - Indicating importance: Academic 'caractère déterminant' vs Professional 'importance stratégique'
 *   vs Neutral 'vraiment important' vs Conversational 'hyper crucial'
 */
export const registerShifts = {
  title: "Register Shifts: Same Content, Different Styles",
  shifts: [
    { context: "Requesting information", academic: "Nous solliciterions volontiers des précisions quant à...", professional: "Pourriez-vous nous communiquer...", neutral: "J'aimerais savoir...", conversational: "Tu peux me dire..." },
    { context: "Expressing disagreement", academic: "Cette interprétation, tout en présentant une certaine cohérence, mérite d'être nuancée.", professional: "Nous ne partageons pas entièrement cette analyse.", neutral: "Je ne suis pas tout à fait d'accord.", conversational: "Mouais, bof. Pas vraiment convaincu, là." },
    { context: "Indicating importance", academic: "Cette dimension revêt un caractère déterminant.", professional: "Cet aspect présente une importance stratégique majeure.", neutral: "C'est vraiment important.", conversational: "C'est hyper crucial, quoi." },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C2 Module 2.
 *
 * Question types:
 * - register (1, 2, 4, 6, 8, 10, 12, 15): Identify appropriate register for context
 * - transformation (3, 5, 9, 11, 14): Transform to specific register
 * - interpretation (7, 13): Interpret register shifts and strategic choices
 *
 * Topics covered:
 * - Academic register markers ('il convient', nominalization, 'problématique')
 * - Professional register ('je me permets', conditional politeness)
 * - Conversational register ('carrément', 'grave', intensifiers)
 * - Academic evaluation ('mérite', 'fouillée', 'eu égard', 'enjeux')
 * - Professional courtesy formulas ('saurais gré', 'bien vouloir')
 * - Neutral register balance (accessibility with precision)
 * - Strategic register flexibility (audience-aware choices)
 * - Academic hedging ('suggèrent', 'quoique perfectible')
 * - Conversational disagreement ('mouais', 'bof', indirect hedging)
 * - Formal diplomatic disagreement ('force est de reconnaître')
 * - Academic technical vocabulary ('fertilite heuristique', 'épistémologiques')
 * - Professional closing formulas ('retiendra votre attention')
 * - Register shifts ('il convient' → 'on peut' = formal → accessible)
 * - Maximum courtesy formulas ('saurais très obligé', 'bien vouloir')
 * - Academic peer review balance (criticism + collegial respect)
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
    type: "register",
    prompt: "Most appropriate for formal academic paper:",
    context: "Opening statement",
    options: [
      "Je vais parler de quelque chose d'important.",
      "Il convient d'examiner une dimension essentielle de cette problématique.",
      "C'est un truc hyper important qu'on doit regarder.",
    ],
    correct: 1,
    explanation: "'Il convient' impersonal + nominalization 'dimension essentielle' + 'problématique' is academic register.",
    nuance: "Academic register uses impersonal constructions and nominalization.",
  },
  {
    id: 2,
    type: "register",
    prompt: "Best for professional email to CEO:",
    options: [
      "Salut, faut qu'on parle de ce projet.",
      "Je me permets de vous contacter concernant l'avancement de ce projet.",
      "Écoute, ce projet, là, ça devient compliqué.",
    ],
    correct: 1,
    explanation: "'Je me permets' + formal 'concernant' + nominalization 'avancement' = professional.",
    nuance: "Professional register balances formality with clarity.",
  },
  {
    id: 3,
    type: "transformation",
    prompt: "Transform to academic register:",
    context: "We should look at this more carefully",
    options: [
      "Faut qu'on regarde ça de plus près.",
      "Il serait opportun d'examiner cette question de manière plus approfondie.",
      "Cette question mérite une analyse plus fouillée, eu égard aux enjeux considérables.",
    ],
    correct: 2,
    explanation: "'Mérite' + 'fouillée' + 'eu égard' + 'enjeux considérables' = high academic register.",
    nuance: "Academic register adds evaluative and contextual framing.",
  },
  {
    id: 4,
    type: "register",
    prompt: "Most natural for friendly conversation:",
    options: [
      "Je souhaiterais exprimer mon accord avec votre proposition.",
      "Carrément, grave ! C'est exactement ça !",
      "Il apparaît que votre proposition présente une pertinence indéniable.",
    ],
    correct: 1,
    explanation: "'Carrément' + 'grave' (youthful intensifier) + exclamation = conversational.",
    nuance: "Conversational register uses intensifiers and exclamations.",
  },
  {
    id: 5,
    type: "transformation",
    prompt: "Shift to professional register:",
    context: "I need you to send me the documents",
    options: [
      "J'ai besoin que tu m'envoies les docs.",
      "Je vous saurais gré de bien vouloir me communiquer ces documents.",
      "Pourriez-vous me faire parvenir les documents en question ?",
    ],
    correct: 1,
    explanation: "'Saurais gré' + 'bien vouloir' + 'communiquer' = highest professional courtesy formula.",
    nuance: "Professional register can use traditional courtesy formulas.",
  },
  {
    id: 6,
    type: "register",
    prompt: "Best for neutral/formal presentation:",
    options: [
      "Vous voyez, c'est super important ce truc.",
      "Cet aspect présente une importance stratégique majeure.",
      "Cette dimension est particulièrement significative dans notre analyse.",
    ],
    correct: 2,
    explanation: "'Présente' + 'stratégique majeure' = formal but accessible; 'particulièrement significative' slightly more academic.",
    nuance: "Neutral register balances accessibility with precision.",
  },
  {
    id: 7,
    type: "interpretation",
    prompt: "Which demonstrates most sophisticated register awareness?",
    options: [
      "Using same register regardless of context",
      "Shifting from formal to casual within same text",
      "Matching register precisely to audience and purpose",
    ],
    correct: 2,
    explanation: "C2 mastery means register flexibility based on audience and purpose, not rigidity or random variation.",
    nuance: "Register choice should be strategic and audience-aware.",
  },
  {
    id: 8,
    type: "register",
    prompt: "Most appropriate hedging for academic context:",
    options: [
      "C'est sûrement vrai.",
      "Les données suggèrent une tendance significative, quoique perfectible.",
      "Peut-être que c'est vrai, je sais pas trop.",
    ],
    correct: 1,
    explanation: "'Suggèrent' + 'significative' + 'quoique perfectible' (concessive hedging) = academic hedging.",
    nuance: "Academic hedging uses measured evaluation, not uncertainty.",
  },
  {
    id: 9,
    type: "transformation",
    prompt: "Transform to conversational:",
    context: "I disagree with your interpretation",
    options: [
      "Je ne partage pas votre interprétation.",
      "Mouais, bof. Pas vraiment convaincu, là.",
      "Je conteste vigoureusement cette analyse.",
    ],
    correct: 1,
    explanation: "'Mouais' (hesitant yes) + 'bof' (dismissive) + 'pas vraiment convaincu' = conversational disagreement.",
    nuance: "Conversational disagreement is indirect and hedged with fillers.",
  },
  {
    id: 10,
    type: "register",
    prompt: "Best for diplomatic/formal disagreement:",
    options: [
      "Vous avez tort.",
      "Force est de reconnaître la cohérence de votre analyse, qu'il convient néanmoins de nuancer.",
      "Je suis pas d'accord, là.",
    ],
    correct: 1,
    explanation: "'Force est de reconnaître' (concession) + 'qu'il convient néanmoins' = elegant formal disagreement.",
    nuance: "Formal disagreement requires maximum diplomatic padding.",
  },
  {
    id: 11,
    type: "transformation",
    prompt: "Shift from casual to formal academic:",
    context: "This idea seems good but has problems",
    options: [
      "Cette idée a l'air bien mais y'a des problèmes.",
      "Cette théorie présente des avantages mais soulève des questions.",
      "La fertilite heuristique de ce cadre théorique ne saurait occulter les questionnements épistémologiques concomitants.",
    ],
    correct: 2,
    explanation: "'Fertilite heuristique' + 'cadre théorique' + 'occulter' + 'épistémologiques' + 'concomitants' = highest academic.",
    nuance: "Academic register uses technical terminology and literary vocabulary.",
  },
  {
    id: 12,
    type: "register",
    prompt: "Most appropriate for business proposal conclusion:",
    options: [
      "Bref, c'est tout. Merci.",
      "Nous espérons que cette proposition retiendra votre attention.",
      "Ces éléments étant posés, il apparaît que cette voie s'impose.",
    ],
    correct: 1,
    explanation: "'Nous espérons' + 'retiendra votre attention' is standard professional closing formula.",
    nuance: "Professional closings use traditional courtesy formulas.",
  },
  {
    id: 13,
    type: "interpretation",
    prompt: "What register shift is happening here: 'Il convient de noter... Néanmoins, on peut se demander...'",
    options: ["Academic → Conversational", "Formal → More accessible", "Professional → Academic"],
    correct: 1,
    explanation: "From impersonal 'il convient' to personal 'on peut' = shift toward accessibility while maintaining formality.",
    nuance: "Strategic register shifts can make academic content more accessible.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Elevate to highest professional courtesy:",
    context: "Please send me the report",
    options: [
      "Envoie-moi le rapport.",
      "Pourriez-vous m'envoyer le rapport ?",
      "Je vous saurais très obligé de bien vouloir me faire parvenir ce rapport.",
    ],
    correct: 2,
    explanation: "'Saurais très obligé' + 'bien vouloir' + 'faire parvenir' = traditional maximum courtesy formula.",
    nuance: "Traditional courtesy formulas demonstrate social sophistication.",
  },
  {
    id: 15,
    type: "register",
    prompt: "Best for academic peer review (critical but collegial):",
    options: [
      "C'est nul, cette article.",
      "Cette contribution, malgré son intérêt indéniable, présente des lacunes méthodologiques.",
      "Votre article est mauvais et vous devriez avoir honte.",
    ],
    correct: 1,
    explanation: "'Contribution' (honorific) + 'malgré son intérêt' (concession) + 'lacunes méthodologiques' (technical critique).",
    nuance: "Academic peer review balances criticism with collegial respect.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on recognizing register markers
 *   and shifting between academic (nominalization, hedging) and conversational
 *   (fillers, idioms)
 * - 8-11/15: "Strong performance" - encourages refining seamless register shifts
 *   and using traditional courtesy formulas in professional contexts
 * - 12-15/15: "Excellent register mastery" - celebrates near-native register
 *   control with fluid shifting between styles
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Register control requires practice. Focus on recognizing the markers of each register level.",
      focus: "Practice shifting between academic (nominalization, hedging) and conversational (fillers, idioms).",
    };
  }
  if (score <= 11) {
    return {
      title: "Strong performance",
      message: "Your register flexibility is developing well. Continue refining your ability to shift seamlessly.",
      focus: "Work on using traditional courtesy formulas in professional contexts.",
    };
  }
  return {
    title: "Excellent register mastery",
    message: "Your French demonstrates near-native register control. You shift fluidly between styles with precision and elegance.",
    focus: "Continue developing your ability to use the most subtle gradations within each register.",
  };
}
