/**
 * C1 Module 2 - Nuance & Register Control
 * ==========================================
 *
 * This file contains all lesson data for C1 Module 2, teaching advanced French
 * learners to master register control and tone adaptation across social contexts.
 *
 * **Module Content:**
 * - Introduction: Register as social intelligence, the register spectrum
 * - Register spectrum: Five levels from très soutenu to argot/vulgaire
 * - Weak vs Strong examples: Register-appropriate formulations
 * - Transformations: Elevating informal to formal register
 * - Politeness strategies: Conditional softening, impersonal constructions, subjunctive courtesy
 * - Tone adjustment by context: Email scenarios (CEO, colleague, friend, public)
 * - 15 practice quiz questions (tone, comparison, rewrite, transformation types)
 *
 * **Key Concepts:**
 * - Register: Level of formality appropriate to context (très soutenu → argot)
 * - Register spectrum: Five levels - très soutenu, soutenu, courant, familier, argot
 * - Conditional softening: Using conditional mood to reduce imposition
 * - Impersonal constructions: Depersonalizing obligations (il convient de...)
 * - Diplomatic phrasing: Face-saving vocabulary and indirectness
 * - Tone adaptation: Matching register to relationship and context
 *
 * **Data Categories:**
 * 1. sectionIds - Module section identifiers
 * 2. moduleMeta - Module metadata (title, subtitle, number)
 * 3. introSections - Introduction to register control
 * 4. registerSpectrum - Five register levels with characteristics
 * 5. weakVsStrongExamples - Before/after register examples
 * 6. transformations - Register elevation examples
 * 7. politenessStrategies - Advanced politeness techniques
 * 8. toneAdjustmentSection - Context-based tone guidance
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
 * 1. intro - Introduction to register control
 * 2. register-spectrum - Five register levels
 * 3. formal-strategies - Formal register strategies
 * 4. neutral-style - Neutral/standard register
 * 5. informal-control - Informal register control
 * 6. tone-shifts - Tone adjustment techniques
 * 7. politeness - Advanced politeness strategies
 * 8. practice - Interactive quiz
 * 9. completion - Module completion
 */
export const sectionIds = ["intro", "register-spectrum", "formal-strategies", "neutral-style", "informal-control", "tone-shifts", "politeness", "practice", "completion"];

// =============================================================================
// MODULE METADATA
// =============================================================================

/**
 * moduleMeta - Module metadata for display in headers and navigation.
 */
export const moduleMeta = {
  /** Module title */
  title: "Nuance & Register Control",
  /** Brief description of module content */
  subtitle: "Master the subtle art of tone adaptation. Move seamlessly between formal, neutral, and informal registers while maintaining precision and naturalness.",
  /** Module number in C1 series */
  moduleNumber: 2,
};

// =============================================================================
// INTRODUCTION SECTIONS
// =============================================================================

/**
 * introSections - Introduction to register control.
 *
 * Content:
 * - Register as Social Intelligence: Speaking appropriately, not just correctly
 * - The Register Spectrum: Five levels from très soutenu to familier
 */
export const introSections = [
  {
    title: "Register as Social Intelligence",
    content: "At C1, register choice demonstrates social awareness. You don't just speak correctly—you speak appropriately. The same idea expressed in three registers shows mastery: formal for authority, neutral for clarity, informal for connection.",
  },
  {
    title: "The Register Spectrum",
    content: "French operates on a spectrum from très soutenu (elevated) to familier (casual). C1 mastery means controlling your position on this spectrum intentionally, not drifting accidentally.",
  },
];

// =============================================================================
// REGISTER SPECTRUM
// =============================================================================

/**
 * registerSpectrum - The five register levels in French.
 *
 * Levels (from most to least formal):
 * 1. Très soutenu: Literary, archaic forms, complex syntax (academic writing)
 * 2. Soutenu: Formal vocabulary, abundant subjunctive (business letters)
 * 3. Courant/Standard: Natural, clear, grammatically correct (everyday professional)
 * 4. Familier: Contractions, idioms, relaxed grammar (friends, family)
 * 5. Argot/Vulgaire: Slang, potentially offensive (very close friends, risky)
 */
export const registerSpectrum = {
  title: "The Five Register Levels",
  levels: [
    { level: "Très soutenu", characteristics: "Literary, archaic forms, complex syntax", useCase: "Academic writing, formal speeches, literature", example: "Je vous serais obligé de bien vouloir..." },
    { level: "Soutenu", characteristics: "Formal vocabulary, subjunctive abundant, careful structure", useCase: "Business letters, professional emails, presentations", example: "Je vous saurais gré de me communiquer..." },
    { level: "Courant/Standard", characteristics: "Natural, clear, grammatically correct", useCase: "Everyday professional communication, journalism", example: "Pourriez-vous m'envoyer les documents ?" },
    { level: "Familier", characteristics: "Contractions, idioms, relaxed grammar", useCase: "Friends, family, informal social situations", example: "Tu peux m'envoyer les docs ?" },
    { level: "Argot/Vulgaire", characteristics: "Slang, potentially offensive", useCase: "Very close friends, expressive emphasis (risky)", example: "File les papiers !" },
  ],
};

// =============================================================================
// WEAK VS STRONG EXAMPLES
// =============================================================================

/**
 * weakVsStrongExamples - Register-appropriate formulations.
 *
 * Examples showing how to transform blunt/direct statements into
 * diplomatic, register-appropriate versions for professional contexts.
 *
 * Scenarios: Professional request, disagreement, pointing out mistakes, urgent requests
 */
export const weakVsStrongExamples = [
  {
    weak: "Donne-moi le rapport. (too blunt)",
    strong: "Pourrais-tu me communiquer le rapport dès que possible ?",
    why: "Conditional + 'communiquer' elevates register; 'dès que possible' adds politeness without urgency pressure.",
    context: "Professional request",
  },
  {
    weak: "Je ne suis pas d'accord avec toi.",
    strong: "Je ne partage pas tout à fait votre analyse sur ce point.",
    why: "'Partager votre analyse' is more diplomatic than 'être d'accord'; 'tout à fait' softens without weakening.",
    context: "Professional disagreement",
  },
  {
    weak: "C'est une erreur. (too direct)",
    strong: "Il semble qu'une coquille se soit glissée dans ce document.",
    why: "'Coquille' (slip/error) is gentler than 'erreur'; 'se soit glissée' is indirect and face-saving.",
    context: "Pointing out mistake diplomatically",
  },
  {
    weak: "Tu dois faire ça maintenant.",
    strong: "Il serait souhaitable de procéder à cette étape dans l'immédiat.",
    why: "Impersonal 'il serait' removes pressure; 'souhaitable' is softer than obligatory; 'dans l'immédiat' is formal urgency.",
    context: "Urgent formal request",
  },
];

// =============================================================================
// TRANSFORMATION EXAMPLES
// =============================================================================

/**
 * transformations - Register elevation examples.
 *
 * Each transformation shows how to elevate informal/casual statements
 * to formal register using specific techniques.
 *
 * Techniques demonstrated:
 * - Register elevation + conditional
 * - Diplomatic negation
 * - Formal inquiry structure
 */
export const transformations = [
  {
    original: "Je veux que tu viennes.",
    improved: "Il serait souhaitable que vous puissiez être présent.",
    technique: "Register elevation + conditional",
    explanation: "Transforms informal command into formal suggestion using impersonal structure and subjunctive.",
  },
  {
    original: "C'est faux ce que tu dis.",
    improved: "Je ne suis pas certain que cette interprétation corresponde aux faits.",
    technique: "Diplomatic negation",
    explanation: "Replaces confrontational 'faux' with measured 'ne suis pas certain'; elevates 'dis' to 'interprétation'.",
  },
  {
    original: "On va faire ça comment ?",
    improved: "Quelle serait la meilleure approche pour procéder ?",
    technique: "Formal inquiry structure",
    explanation: "Replaces informal 'on va faire' with impersonal inquiry; 'comment' becomes 'approche'.",
  },
];

// =============================================================================
// POLITENESS STRATEGIES
// =============================================================================

/**
 * politenessStrategies - Advanced politeness techniques for formal contexts.
 *
 * Strategies:
 * - Conditional softening: Je veux → Je voudrais... (reduces imposition)
 * - Negative questions: Tu peux → Vous ne pourriez pas... (implies effort)
 * - Impersonal constructions: Tu dois → Il convient de... (depersonalizes)
 * - Verbal nouns: Pense → Veillez à... (elevates register)
 * - Subjunctive courtesy: Dis-moi → Faites-moi savoir... (shows deference)
 */
export const politenessStrategies = {
  title: "Advanced Politeness Strategies",
  strategies: [
    { strategy: "Conditional softening", informal: "Je veux...", formal: "Je voudrais... / J'aimerais...", effect: "Reduces imposition" },
    { strategy: "Negative questions", informal: "Tu peux venir ?", formal: "Vous ne pourriez pas venir ?", effect: "Implies effort already made" },
    { strategy: "Impersonal constructions", informal: "Tu dois faire...", formal: "Il convient de... / Il est nécessaire de...", effect: "Depersonalizes obligation" },
    { strategy: "Verbal nouns", informal: "Pense à...", formal: "Veillez à... / Prenez garde à...", effect: "Elevates register" },
    { strategy: "Subjunctive courtesy", informal: "Dis-moi quand...", formal: "Faites-moi savoir lorsque...", effect: "Shows deference" },
  ],
};

// =============================================================================
// TONE ADJUSTMENT SECTION
// =============================================================================

/**
 * toneAdjustmentSection - Tone guidance by communication context.
 *
 * Scenarios covered:
 * - Email to CEO: Soutenu (distance and hierarchy)
 * - Email to colleague: Courant (peer relationship)
 * - Email to friend: Familier acceptable (established relationship)
 * - Public presentation: Standard élevé (clarity + authority)
 */
export const toneAdjustmentSection = {
  title: "Tone Adjustment by Context",
  scenarios: [
    { scenario: "Email to CEO", tone: "Soutenu", example: "Je me permets de vous contacter concernant...", why: "Distance and hierarchy require formality" },
    { scenario: "Email to colleague", tone: "Courant", example: "Je te contacte au sujet de...", why: "Peer relationship allows standard register" },
    { scenario: "Email to friend", tone: "Familier acceptable", example: "Salut, je t'écris pour...", why: "Established relationship permits informality" },
    { scenario: "Public presentation", tone: "Standard élevé", example: "Permettez-moi de vous présenter...", why: "Public speaking requires clarity + authority" },
  ],
};

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for C1 Module 2.
 *
 * Question types:
 * - tone (1, 4, 6, 9, 12, 15): Choose appropriate register for context
 * - comparison (2, 5, 8, 10, 13): Compare and select better formulation
 * - rewrite (3, 11): Elevate or adjust register
 * - transformation (7, 14): Transform informal to formal
 *
 * Topics covered:
 * - Formal emails to clients/unknown recipients
 * - Diplomatic disagreement with superiors
 * - Professional requests and complaints
 * - Cover letters and academic writing
 * - Formal invitations and closings
 * - Professional signatures
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
    prompt: "Choose the most appropriate version for a formal email to a client:",
    context: "First contact",
    options: [
      "Salut, je voulais te demander quelque chose.",
      "Je me permets de vous contacter concernant...",
      "Écoute, il faut qu'on parle de...",
    ],
    correct: 1,
    explanation: "'Je me permets' is classic formal opening; 'concernant' is professional; 'vous' maintains distance.",
    nuance: "First contact requires elevated register to establish professionalism.",
  },
  {
    id: 2,
    type: "comparison",
    prompt: "Which is more diplomatic for disagreeing with a superior?",
    options: [
      "Je ne suis pas d'accord avec votre décision.",
      "Je me permets de vous faire part de quelques réserves quant à cette orientation.",
    ],
    correct: 1,
    explanation: "'Me permets' shows deference; 'réserves' is measured; 'orientation' is analytical rather than personal.",
    nuance: "Disagreement with superiors requires maximum diplomatic padding.",
  },
  {
    id: 3,
    type: "rewrite",
    prompt: "Elevate this informal request to formal register:",
    context: "Professional email",
    options: [
      "Tu peux m'envoyer le doc ?",
      "Pourriez-vous m'adresser ce document ?",
      "Envoyez-moi le document svp.",
    ],
    correct: 1,
    explanation: "'Pourriez-vous' is conditional politeness; 'adresser' is formal; absence of abbreviation maintains register.",
    nuance: "Conditional + formal vocabulary = appropriate elevation.",
  },
  {
    id: 4,
    type: "tone",
    prompt: "Select the best version for a formal complaint:",
    options: [
      "C'est inacceptable ce que vous avez fait !",
      "Je constate avec surprise que les termes convenus n'ont pas été respectés.",
      "Vous n'avez pas tenu vos promesses.",
    ],
    correct: 1,
    explanation: "'Constater' is objective; 'avec surprise' implies good faith; 'termes convenus' is professional reference.",
    nuance: "Formal complaints should be factual, measured, and impersonal.",
  },
  {
    id: 5,
    type: "comparison",
    prompt: "Which shows better register control for a cover letter?",
    options: [
      "Je postule pour ce job car je suis très motivé.",
      "C'est avec un vif intérêt que je vous soumets ma candidature pour ce poste.",
    ],
    correct: 1,
    explanation: "'Vif intérêt' is elegant; 'soumettre ma candidature' is formal procedure; absence of 'job' shows register awareness.",
    nuance: "Cover letters require elevated, enthusiastic but professional tone.",
  },
  {
    id: 6,
    type: "tone",
    prompt: "Choose appropriate for informal email to close colleague:",
    options: [
      "Cher Monsieur Dupont, Je vous écris pour...",
      "Salut Pierre, Tu as eu le temps de regarder...",
      "Hey mec, faut qu'on cause de...",
    ],
    correct: 1,
    explanation: "'Salut' + first name indicates established relationship; 'tu' is appropriate for peers; 'avoir le temps' is polite but not formal.",
    nuance: "Peer relationships permit standard register with familiar elements.",
  },
  {
    id: 7,
    type: "transformation",
    prompt: "Transform to formal request:",
    context: "Asking for extension",
    options: [
      "J'ai besoin de plus de temps.",
      "Je souhaiterais solliciter un délai supplémentaire pour mener à bien cette mission.",
      "Peux-tu me donner quelques jours de plus ?",
    ],
    correct: 1,
    explanation: "'Souhaiterais' is conditional; 'solliciter' is formal; 'mener à bien' is professional expression.",
    nuance: "Requests benefit from conditional + formal action verbs.",
  },
  {
    id: 8,
    type: "comparison",
    prompt: "Which is more tactful for pointing out an error?",
    options: [
      "Il y a une erreur dans votre calcul.",
      "Il semble qu'une inadvertance se soit glissée dans cette analyse.",
    ],
    correct: 1,
    explanation: "'Inadvertance' is face-saving; 'se soit glissée' is indirect; 'semble' introduces doubt gently.",
    nuance: "Face-threatening acts require maximum indirectness and face-saving vocabulary.",
  },
  {
    id: 9,
    type: "tone",
    prompt: "Best opening for formal business letter to unknown recipient:",
    options: [
      "Salut,",
      "Madame, Monsieur,",
      "Cher Monsieur/Madame,",
    ],
    correct: 1,
    explanation: "'Madame, Monsieur' is standard when name unknown; avoids wrong gender assumption; respects formality.",
    nuance: "When gender unknown, use inclusive formal formula.",
  },
  {
    id: 10,
    type: "comparison",
    prompt: "Which closing is most appropriate for formal French letter?",
    options: [
      "Bisous,",
      "Cordialement,",
      "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
    ],
    correct: 2,
    explanation: "Traditional formal French closings use full formula with 'agréer' + 'salutations distinguées'.",
    nuance: "French formal letters have elaborate closing conventions.",
  },
  {
    id: 11,
    type: "rewrite",
    prompt: "Make this more diplomatic:",
    context: "Rejecting proposal",
    options: [
      "Non, ça ne marchera pas.",
      "Après mûre réflexion, cette approche ne semble pas adaptée à nos contraintes actuelles.",
      "C'est pas possible avec notre budget.",
    ],
    correct: 1,
    explanation: "'Après mûre réflexion' shows consideration; 'ne semble pas adaptée' is soft negation; 'contraintes' is professional.",
    nuance: "Rejections should show deliberation and impersonal criteria.",
  },
  {
    id: 12,
    type: "tone",
    prompt: "Most appropriate for academic paper conclusion:",
    options: [
      "Enfin bref, on voit que...",
      "Ces observations permettent de conclure que...",
      "Donc voilà, c'est la fin.",
    ],
    correct: 1,
    explanation: "'Ces observations' is analytical; 'permettent de conclure' is formal structure; absent colloquial markers.",
    nuance: "Academic register requires impersonality and analytical vocabulary.",
  },
  {
    id: 13,
    type: "comparison",
    prompt: "Which shows better register for formal invitation?",
    options: [
      "Viens à ma fête samedi !",
      "Nous aurions le plaisir de vous compter parmi nous...",
    ],
    correct: 1,
    explanation: "'Aurions le plaisir' is conditional politeness; 'compter parmi nous' is elegant formula; formal vocabulary throughout.",
    nuance: "Formal invitations use conditional and traditional formulas.",
  },
  {
    id: 14,
    type: "transformation",
    prompt: "Elevate to very formal register:",
    context: "Requesting meeting",
    options: [
      "Tu es dispo pour un café demain ?",
      "Seriez-vous disponible pour un entretien dans les prochains jours ?",
      "On se voit quand ?",
    ],
    correct: 1,
    explanation: "'Seriez-vous' is conditional; 'disponible' replaces slang 'dispo'; 'entretien' elevates 'café'; 'dans les prochains jours' is formal flexibility.",
    nuance: "Very formal requests use conditional + elevated vocabulary + flexible timeframe.",
  },
  {
    id: 15,
    type: "tone",
    prompt: "Best for professional email signature:",
    options: [
      "A plus, Jean",
      "Bien cordialement, Jean Dupont",
      "XX, Jean",
    ],
    correct: 1,
    explanation: "'Bien cordialement' is standard professional; full name shows formality; 'bien' adds politeness without excess.",
    nuance: "Professional signatures balance warmth and formality.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getResultMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/15: "Good effort" - suggests focusing on recognizing when formality
 *   is required, using conditional forms and impersonal constructions
 * - 8-11/15: "Nice progress" - encourages working on diplomatic phrasing
 *   and softening direct statements
 * - 12-15/15: "Excellent register control" - celebrates ability to navigate
 *   register shifts and adapt to any social context
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, and focus area
 */
export function getResultMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message: "Register control requires awareness of context. Focus on recognizing when formality is required.",
      focus: "Practice using conditional forms and impersonal constructions for formal contexts.",
    };
  }
  if (score <= 11) {
    return {
      title: "Nice progress",
      message: "Your register awareness is developing. Continue refining your ability to adjust tone for different contexts.",
      focus: "Work on diplomatic phrasing and softening direct statements.",
    };
  }
  return {
    title: "Excellent register control",
    message: "You navigate register shifts with sophistication. Your French adapts appropriately to any social context.",
    focus: "Continue developing your ability to code-switch seamlessly between registers.",
  };
}
