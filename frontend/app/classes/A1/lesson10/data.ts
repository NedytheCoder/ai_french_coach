/**
 * A1 Lesson 10 - Negation Data
 * ==============================
 *
 * This file contains all lesson data for A1 Lesson 10, focusing on French negation.
 * The lesson covers:
 * - ne...pas (not) - the most common negation
 * - Other negations: jamais, plus, rien, personne, guerre
 * - Negation in passé composé (around the auxiliary)
 * - Important patterns: ne → n', de replacing un/une/des
 *
 * Data Categories:
 * ----------------
 * 1. nePasExamples (3 items) - Positive to negative sentence transformations
 * 2. negations (5 items) - Other common negation forms with meanings and examples
 * 3. passeComposeNegation (3 items) - Negation in passé composé examples
 * 4. guidedExamples (8 items) - Full sentences with tense tags
 * 5. practiceQuestions (20 items) - Multiple-choice quiz questions
 *
 * Practice Topics:
 * ----------------
 * - nepas: ne...pas usage and placement (6 questions)
 * - other: Other negations jamais/plus/rien/personne/guerre (6 questions)
 * - passe-compose: Negation in passé composé (4 questions)
 * - structure: General structure recognition (4 questions)
 */

// =============================================================================
// NE...PAS EXAMPLES
// =============================================================================

/**
 * nePasExamples - Shows how affirmative sentences become negative.
 *
 * Demonstrates:
 * - Basic ne...pas wrapping around the verb
 * - ne → n' before vowels (n'aime)
 * - ne → n' before silent h (n'habite)
 * - de replacing un/une/des in negatives (pas de chien)
 */
export const nePasExamples = [
  {
    french: "Je parle français.",
    negative: "Je ne parle pas français.",
    english: "I do not speak French."
  },
  {
    french: "Elle aime le café.",
    negative: "Elle n’aime pas le café.",
    english: "She does not like coffee."
  },
  {
    french: "Nous avons un chien.",
    negative: "Nous n’avons pas de chien.",
    english: "We do not have a dog."
  }
]

// =============================================================================
// OTHER NEGATION FORMS
// =============================================================================

/**
 * negations - Collection of other common French negation forms.
 *
 * All follow the same ne...[word] structure as ne...pas:
 * - ne...jamais = never
 * - ne...plus = no longer / no more
 * - ne...rien = nothing
 * - ne...personne = nobody / no one
 * - ne...guerre = hardly / barely (less common)
 */
export const negations = [
  {
    form: "ne...jamais",
    meaning: "never",
    examples: [{ french: "Je ne mange jamais ici.", english: "I never eat here." }]
  },
  {
    form: "ne...plus",
    meaning: "no longer / no more",
    examples: [{ french: "Je ne travaille plus ici.", english: "I no longer work here." }]
  },
  {
    form: "ne...rien",
    meaning: "nothing",
    examples: [{ french: "Je ne vois rien.", english: "I see nothing." }]
  },
  {
    form: "ne...personne",
    meaning: "no one / nobody",
    examples: [{ french: "Je ne vois personne.", english: "I see no one." }]
  },
  {
    form: "ne...guerre",
    meaning: "hardly / barely",
    examples: [{ french: "Je ne joue guerre la bas.", english: "I barely play." }]
  }
]

// =============================================================================
// PASSÉ COMPOSÉ NEGATION
// =============================================================================

/**
 * passeComposeNegation - Examples of negation in passé composé.
 *
 * Key rule: Negation wraps around the auxiliary (avoir/être), NOT the past participle.
 * Pattern: ne + auxiliary + negation word + past participle
 */
export const passeComposeNegation = [
  { french: "Je n’ai pas mangé.", english: "I did not eat." },
  { french: "Elle n’est jamais arrivée.", english: "She never arrived." },
  { french: "Nous n’avons rien vu.", english: "We saw nothing." }
]

// =============================================================================
// GUIDED EXAMPLES
// =============================================================================

/**
 * GuidedExample Type
 * ------------------
 * French sentence with English translation and tense classification.
 */
export type GuidedExample = { french: string; english: string; tag: 'present' | 'passe-compose' }

/**
 * guidedExamples - Full sentences demonstrating negation patterns.
 *
 * Mix of present tense and passé composé examples showing:
 * - ne...pas in present (Je ne parle pas)
 * - ne...jamais (Elle n'aime jamais)
 * - ne...plus (Nous ne travaillons plus)
 * - ne...rien (Je ne vois rien)
 * - Passé composé with avoir (Je n'ai pas mangé)
 * - Passé composé with être (Elle n'est jamais arrivée)
 */
export const guidedExamples: GuidedExample[] = [
  { french: "Je ne parle pas français.", english: "I do not speak French.", tag: "present" },
  { french: "Elle n’aime jamais le café.", english: "She never likes coffee.", tag: "present" },
  { french: "Nous ne travaillons plus ici.", english: "We no longer work here.", tag: "present" },
  { french: "Je ne vois rien.", english: "I see nothing.", tag: "present" },
  { french: "Je n’ai pas mangé.", english: "I did not eat.", tag: "passe-compose" },
  { french: "Nous n’avons rien vu.", english: "We saw nothing.", tag: "passe-compose" },
  { french: "Elle n’est jamais arrivée.", english: "She never arrived.", tag: "passe-compose" },
  { french: "Je n’ai plus travaillé.", english: "I didn’t work anymore / I no longer worked.", tag: "passe-compose" }
]

// =============================================================================
// PRACTICE QUESTIONS
// =============================================================================

/**
 * PracticeTopic Types
 * -------------------
 * - nepas: ne...pas usage and placement
 * - other: Other negations (jamais, plus, rien, personne, guerre)
 * - passe-compose: Negation in passé composé
 * - structure: General negation structure recognition
 */
export type PracticeTopic = "nepas" | "other" | "passe-compose" | "structure"

/**
 * PracticeQuestion Type
 * ---------------------
 * Multiple-choice question for negation concepts.
 */
export type PracticeQuestion = {
  id: number
  topic: PracticeTopic
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

/**
 * practiceQuestions - 20 questions testing negation knowledge.
 *
 * Question distribution:
 * - IDs 1-6: ne...pas usage and placement
 * - IDs 7-12: Other negations (jamais, plus, rien, personne, guerre)
 * - IDs 13-16: Passé composé negation
 * - IDs 17-20: General structure recognition
 */
export const practiceQuestions: PracticeQuestion[] = [
  // 6 ne...pas usage
  {
    id: 1,
    topic: "nepas",
    prompt: "What does “ne...pas” do?",
    options: ["It makes a sentence negative", "It makes future tense", "It makes plural", "It shows possession"],
    correct: 0,
    explanation: "“Ne...pas” is the most common way to say “not” in French."
  },
  {
    id: 2,
    topic: "nepas",
    prompt: "Choose the correct negative: “Je parle français.”",
    options: ["Je ne parle pas français.", "Je parle ne pas français.", "Je pas parle français.", "Je n’parle pas français."],
    correct: 0,
    explanation: "Negation wraps around the verb: ne + verb + pas."
  },
  {
    id: 3,
    topic: "nepas",
    prompt: "Why do we write “n’” in “Elle n’aime pas”?",
    options: ["Because ne becomes n’ before a vowel/silent h", "Because it is plural", "Because it is past tense", "Because pas is optional"],
    correct: 0,
    explanation: "Ne → n’ before a vowel or silent h: n’aime, n’ai, n’habite."
  },
  {
    id: 4,
    topic: "nepas",
    prompt: "Complete: “Je ___ mange pas.”",
    options: ["ne", "pas", "n’", "plus"],
    correct: 0,
    explanation: "Present tense structure: subject + ne + verb + pas."
  },
  {
    id: 5,
    topic: "nepas",
    prompt: "Choose the correct negative: “Nous avons un chien.”",
    options: ["Nous n’avons pas de chien.", "Nous ne avons pas un chien.", "Nous n’avons de pas chien.", "Nous n’avons pas un chien."],
    correct: 0,
    explanation: "In negatives, “de” often replaces un/une/des: pas de chien."
  },
  {
    id: 6,
    topic: "nepas",
    prompt: "Which is correct?",
    options: ["Je ne parle pas.", "Je parle ne pas.", "Je pas ne parle.", "Je ne pas parle."],
    correct: 0,
    explanation: "The core wrap is ne + verb + pas."
  },

  // 6 other negations
  {
    id: 7,
    topic: "other",
    prompt: "What does “ne...jamais” mean?",
    options: ["no longer", "never", "nothing", "hardly"],
    correct: 1,
    explanation: "Jamais = never."
  },
  {
    id: 8,
    topic: "other",
    prompt: "Complete: “Je ne travaille ___ ici.” (no longer)",
    options: ["jamais", "plus", "rien", "personne"],
    correct: 1,
    explanation: "Ne...plus = no longer / no more."
  },
  {
    id: 9,
    topic: "other",
    prompt: "Complete: “Je ne vois ___.” (nothing)",
    options: ["jamais", "plus", "rien", "personne"],
    correct: 2,
    explanation: "Ne...rien = nothing."
  },
  {
    id: 10,
    topic: "other",
    prompt: "Complete: “Je ne vois ___.” (nobody)",
    options: ["personne", "rien", "plus", "jamais"],
    correct: 0,
    explanation: "Ne...personne = nobody."
  },
  {
    id: 11,
    topic: "other",
    prompt: "What does “ne...guerre” mean?",
    options: ["hardly / barely", "never", "no longer", "nothing"],
    correct: 0,
    explanation: "Ne...guerre means “hardly / barely” (less common, but possible)."
  },
  {
    id: 12,
    topic: "other",
    prompt: "Which sentence matches “ne...jamais”?",
    options: ["Je ne mange jamais ici.", "Je ne mange plus ici.", "Je ne mange rien ici.", "Je ne mange personne ici."],
    correct: 0,
    explanation: "Jamais = never."
  },

  // 4 passé composé negation
  {
    id: 13,
    topic: "passe-compose",
    prompt: "Where does negation go in passé composé?",
    options: ["Around the auxiliary", "Around the past participle", "After the subject only", "At the very end always"],
    correct: 0,
    explanation: "Passé composé: ne + auxiliary + negation + past participle."
  },
  {
    id: 14,
    topic: "passe-compose",
    prompt: "Choose the correct negative past: “J’ai mangé.”",
    options: ["Je n’ai pas mangé.", "Je n’ai mangé pas.", "Je ne ai pas mangé.", "Je n’ai pas mangée."],
    correct: 0,
    explanation: "Ne...pas surrounds the auxiliary: n’ai pas mangé."
  },
  {
    id: 15,
    topic: "passe-compose",
    prompt: "Choose the correct sentence:",
    options: ["Elle n’est jamais arrivée.", "Elle n’est arrivée jamais.", "Elle ne est jamais arrivée.", "Elle n’a jamais arrivée."],
    correct: 0,
    explanation: "Negation wraps around the auxiliary: n’est jamais arrivée."
  },
  {
    id: 16,
    topic: "passe-compose",
    prompt: "Choose the correct sentence:",
    options: ["Nous n’avons rien vu.", "Nous n’avons vu rien.", "Nous ne avons rien vu.", "Nous n’avons rien vus."],
    correct: 0,
    explanation: "Ne...rien goes around the auxiliary: n’avons rien vu."
  },

  // 4 structure recognition
  {
    id: 17,
    topic: "structure",
    prompt: "Present tense structure is…",
    options: ["Subject + ne + verb + negation word", "Subject + negation word + verb + ne", "Subject + verb + ne + negation word", "Subject + verb only"],
    correct: 0,
    explanation: "Present: subject + ne + verb + (pas/jamais/plus/rien/personne/guerre)."
  },
  {
    id: 18,
    topic: "structure",
    prompt: "Passé composé structure is…",
    options: ["Subject + ne + auxiliary + negation + past participle", "Subject + auxiliary + negation + ne + participle", "Subject + ne + participle + negation", "Subject + negation + auxiliary + participle"],
    correct: 0,
    explanation: "Past: ne + auxiliary + negation + past participle."
  },
  {
    id: 19,
    topic: "structure",
    prompt: "Which is a correct negative with “de”?",
    options: ["J’ai pas de chien.", "Je n’ai pas de chien.", "Je ne pas ai de chien.", "Je n’ai pas un chien."],
    correct: 1,
    explanation: "Standard: Je n’ai pas de chien."
  },
  {
    id: 20,
    topic: "structure",
    prompt: "Which sentence uses “n’” correctly?",
    options: ["Je n’aime pas.", "Je ne’aime pas.", "Je n aime pas.", "Je ne aime pas."],
    correct: 0,
    explanation: "Ne → n’ before vowels: n’aime, n’ai, n’habite."
  }
]

