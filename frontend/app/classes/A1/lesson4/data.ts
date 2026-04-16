/**
 * A1 Lesson 4 - French Prepositions Data
 * ======================================
 *
 * This file contains all lesson data for A1 Lesson 4, focusing on French prepositions.
 * Prepositions are small but essential words that connect parts of sentences and show
 * relationships between words (location, movement, origin, time).
 *
 * Data Categories:
 * ----------------
 * 1. Core Prepositions (8 items) - à, de, dans, sur, sous, avec, pour, en
 * 2. Verb-Preposition Patterns (8 items) - Common verb+preposition combinations
 * 3. Guided Examples (8 items) - Annotated example sentences with audio
 * 4. Practice Questions (16 items) - Multiple choice questions by topic
 *
 * Practice Topics:
 * ----------------
 * - meaning: Preposition meanings and translations
 * - completion: Fill-in-the-blank sentence completion
 * - verb-pattern: Verb + preposition combinations
 * - contraction: à/de + article contractions (au, aux, du, des)
 */

// =============================================================================
// CORE PREPOSITIONS
// =============================================================================

/**
 * Core prepositions array - 8 essential French prepositions for A1 learners.
 * Each preposition includes:
 * - prep: The French preposition
 * - english: English translation(s)
 * - example: Example sentence demonstrating usage
 * - phonetic: Pronunciation guide in IPA-like notation
 * - audioSrc: Path to audio pronunciation file
 */
export const prepositions = [
  { prep: "à", english: "to / at", example: "Je vais à Paris.", phonetic: "ah", audioSrc: "/audio/a1/prepositions/a.mp3" },
  { prep: "de", english: "from / of", example: "Je viens de France.", phonetic: "duh", audioSrc: "/audio/a1/prepositions/de.mp3" },
  { prep: "dans", english: "in (inside)", example: "Le chat est dans la maison.", phonetic: "dahn", audioSrc: "/audio/a1/prepositions/dans.mp3" },
  { prep: "sur", english: "on", example: "Le livre est sur la table.", phonetic: "soor", audioSrc: "/audio/a1/prepositions/sur.mp3" },
  { prep: "sous", english: "under", example: "Le sac est sous la table.", phonetic: "soo", audioSrc: "/audio/a1/prepositions/sous.mp3" },
  { prep: "avec", english: "with", example: "Je parle avec Marie.", phonetic: "ah-vek", audioSrc: "/audio/a1/prepositions/avec.mp3" },
  { prep: "pour", english: "for", example: "C'est pour toi.", phonetic: "poor", audioSrc: "/audio/a1/prepositions/pour.mp3" },
  { prep: "en", english: "in / by", example: "Je vais en France.", phonetic: "ahn", audioSrc: "/audio/a1/prepositions/en.mp3" }
]

// =============================================================================
// VERB-PREPOSITION PATTERNS
// =============================================================================

/**
 * Verb-preposition pattern combinations - 8 common French verb+preposition pairs.
 * These are best learned as "chunks" since the preposition usage often differs
 * from English equivalents.
 *
 * Key patterns:
 * - parler à vs parler de (speak TO vs talk ABOUT)
 * - jouer à vs jouer de (play games vs play instruments)
 * - aller à, venir de, penser à, avoir besoin de
 */
export const verbPrepositionPatterns = [
  {
    verb: "parler à",
    english: "to speak to",
    example: "Je parle à mon ami."
  },
  {
    verb: "parler de",
    english: "to talk about",
    example: "Nous parlons de musique."
  },
  {
    verb: "aller à",
    english: "to go to",
    example: "Je vais à l'école."
  },
  {
    verb: "venir de",
    english: "to come from",
    example: "Elle vient de France."
  },
  {
    verb: "penser à",
    english: "to think about",
    example: "Je pense à toi."
  },
  {
    verb: "avoir besoin de",
    english: "to need",
    example: "J'ai besoin de temps."
  },
  {
    verb: "jouer à",
    english: "to play (a game)",
    example: "Il joue au football."
  },
  {
    verb: "jouer de",
    english: "to play (an instrument)",
    example: "Elle joue du piano."
  }
]

// =============================================================================
// GUIDED EXAMPLES TYPES AND DATA
// =============================================================================

/**
 * GuidedExample Type
 * ------------------
 * Type definition for annotated example sentences with audio.
 * Used in the "Guided Examples" section to teach preposition usage patterns.
 */
export type GuidedExample = {
  id: string       // Unique identifier for the example
  french: string   // French sentence
  english: string // English translation
  focus: string   // Learning focus note (e.g., "à + le → au")
  audioSrc: string // Path to audio file
}

/**
 * Guided Examples Array - 8 annotated sentences for pattern learning.
 * Each example highlights a specific preposition usage pattern:
 * - ex-1: à + le contraction (au)
 * - ex-2, ex-3: Location prepositions (sur, dans)
 * - ex-4: Origin (venir de)
 * - ex-5, ex-6: Verb patterns (parler de vs parler à)
 * - ex-7: de + le contraction (du) for instruments
 * - ex-8: en + country, avec for companionship
 */
export const guidedExamples: GuidedExample[] = [
  {
    id: "ex-1",
    french: "Je vais au marché.",
    english: "I'm going to the market.",
    focus: "à + le → au (movement)",
    audioSrc: "/audio/a1/prepositions/examples/je-vais-au-marche.mp3"
  },
  {
    id: "ex-2",
    french: "Le livre est sur la table.",
    english: "The book is on the table.",
    focus: "sur (location)",
    audioSrc: "/audio/a1/prepositions/examples/le-livre-est-sur-la-table.mp3"
  },
  {
    id: "ex-3",
    french: "Le chat est dans la maison.",
    english: "The cat is in the house (inside).",
    focus: "dans (inside)",
    audioSrc: "/audio/a1/prepositions/examples/le-chat-est-dans-la-maison.mp3"
  },
  {
    id: "ex-4",
    french: "Elle vient de France.",
    english: "She comes from France.",
    focus: "venir de (origin)",
    audioSrc: "/audio/a1/prepositions/examples/elle-vient-de-france.mp3"
  },
  {
    id: "ex-5",
    french: "Nous parlons de musique.",
    english: "We talk about music.",
    focus: "parler de (topic)",
    audioSrc: "/audio/a1/prepositions/examples/nous-parlons-de-musique.mp3"
  },
  {
    id: "ex-6",
    french: "Je parle à mon ami.",
    english: "I speak to my friend.",
    focus: "parler à (person)",
    audioSrc: "/audio/a1/prepositions/examples/je-parle-a-mon-ami.mp3"
  },
  {
    id: "ex-7",
    french: "Elle joue du piano.",
    english: "She plays the piano.",
    focus: "de + le → du (instrument)",
    audioSrc: "/audio/a1/prepositions/examples/elle-joue-du-piano.mp3"
  },
  {
    id: "ex-8",
    french: "Je vais en France avec Marie.",
    english: "I'm going to France with Marie.",
    focus: "en + country, avec (relation)",
    audioSrc: "/audio/a1/prepositions/examples/je-vais-en-france-avec-marie.mp3"
  }
]

// =============================================================================
// PRACTICE QUESTIONS
// =============================================================================

/**
 * PracticeTopic Type
 * ------------------
 * Type definition for practice question topics.
 */
export type PracticeTopic = "meaning" | "completion" | "verb-pattern" | "contraction"

/**
 * PracticeQuestion Type
 * ---------------------
 * Type definition for multiple-choice practice questions.
 *
 * Properties:
 * - id: Unique question number (1-16)
 * - topic: Question category (meaning, completion, verb-pattern, contraction)
 * - prompt: The question text
 * - options: Array of 4 answer choices
 * - correct: Index of the correct answer (0-3)
 * - explanation: Detailed explanation shown after answering
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
 * Practice Questions Array - 16 multiple-choice questions organized by topic.
 *
 * Distribution:
 * - 5 meaning questions (IDs 1-5): Preposition meanings
 * - 5 completion questions (IDs 6-10): Fill-in-the-blank sentences
 * - 4 verb-pattern questions (IDs 11-14): Verb + preposition combinations
 * - 2 contraction questions (IDs 15-16): à/de + article contractions
 */
export const practiceQuestions: PracticeQuestion[] = [
  // --------------------------------------------------
  // 5 MEANING QUESTIONS: Test preposition definitions
  // --------------------------------------------------
  {
    id: 1,
    topic: "meaning",
    prompt: "What does “sous” usually mean?",
    options: ["on", "under", "with", "from"],
    correct: 1,
    explanation: "“Sous” means “under”. Example: Le sac est sous la table."
  },
  {
    id: 2,
    topic: "meaning",
    prompt: "What does “avec” usually mean?",
    options: ["with", "in (inside)", "to / at", "of"],
    correct: 0,
    explanation: "“Avec” means “with”. Example: Je parle avec Marie."
  },
  {
    id: 3,
    topic: "meaning",
    prompt: "What does “de” usually mean?",
    options: ["to", "from / of", "under", "for"],
    correct: 1,
    explanation: "“De” often means “from” or “of”. Example: Je viens de France."
  },
  {
    id: 4,
    topic: "meaning",
    prompt: "What does “dans” usually mean?",
    options: ["in (inside)", "on", "to", "for"],
    correct: 0,
    explanation: "“Dans” is “in (inside)”. Example: Le chat est dans la maison."
  },
  {
    id: 5,
    topic: "meaning",
    prompt: "What does “pour” usually mean?",
    options: ["for", "from", "at", "under"],
    correct: 0,
    explanation: "“Pour” means “for”. Example: C’est pour toi."
  },

  // --------------------------------------------------
  // 5 COMPLETION QUESTIONS: Fill-in-the-blank sentences
  // --------------------------------------------------
  {
    id: 6,
    topic: "completion",
    prompt: "Complete: Je vais ___ Paris.",
    options: ["de", "à", "avec", "sous"],
    correct: 1,
    explanation: "For movement to a city: aller à + city → Je vais à Paris."
  },
  {
    id: 7,
    topic: "completion",
    prompt: "Complete: Je viens ___ France.",
    options: ["de", "en", "sur", "pour"],
    correct: 0,
    explanation: "For origin: venir de → Je viens de France."
  },
  {
    id: 8,
    topic: "completion",
    prompt: "Complete: Le livre est ___ la table.",
    options: ["sur", "dans", "à", "de"],
    correct: 0,
    explanation: "For “on”: sur → Le livre est sur la table."
  },
  {
    id: 9,
    topic: "completion",
    prompt: "Complete: Le chat est ___ la maison.",
    options: ["dans", "sur", "pour", "à"],
    correct: 0,
    explanation: "For “inside”: dans → Le chat est dans la maison."
  },
  {
    id: 10,
    topic: "completion",
    prompt: "Complete: Il parle ___ son ami.",
    options: ["avec", "en", "sous", "de"],
    correct: 0,
    explanation: "For “with”: avec → Il parle avec son ami."
  },

  // --------------------------------------------------
  // 4 VERB-PATTERN QUESTIONS: Test verb+preposition knowledge
  // --------------------------------------------------
  {
    id: 11,
    topic: "verb-pattern",
    prompt: "Choose the best meaning: “parler à”",
    options: ["to talk about", "to speak to", "to need", "to play (an instrument)"],
    correct: 1,
    explanation: "“Parler à” is for the person you speak to: Je parle à mon ami."
  },
  {
    id: 12,
    topic: "verb-pattern",
    prompt: "Choose the best meaning: “parler de”",
    options: ["to speak to", "to talk about", "to go to", "to come from"],
    correct: 1,
    explanation: "“Parler de” is for the topic: Nous parlons de musique."
  },
  {
    id: 13,
    topic: "verb-pattern",
    prompt: "Complete the pattern: “avoir besoin ___”",
    options: ["à", "de", "en", "sur"],
    correct: 1,
    explanation: "The common pattern is “avoir besoin de”: J’ai besoin de temps."
  },
  {
    id: 14,
    topic: "verb-pattern",
    prompt: "Pick the correct pattern for “to play an instrument”",
    options: ["jouer à", "jouer de", "aller à", "venir de"],
    correct: 1,
    explanation: "You usually use “jouer de” for instruments: Elle joue du piano."
  },

  // --------------------------------------------------
  // 2 CONTRACTION QUESTIONS: à/de + article combinations
  // --------------------------------------------------
  {
    id: 15,
    topic: "contraction",
    prompt: "Choose the correct contraction: à + le = ?",
    options: ["au", "aux", "du", "des"],
    correct: 0,
    explanation: "à + le → au. Example: Je vais au marché."
  },
  {
    id: 16,
    topic: "contraction",
    prompt: "Choose the correct contraction: de + les = ?",
    options: ["au", "aux", "du", "des"],
    correct: 3,
    explanation: "de + les → des. Example: Il parle des enfants (about the children)."
  }
]

