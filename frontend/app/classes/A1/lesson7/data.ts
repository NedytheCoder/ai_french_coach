/**
 * A1 Lesson 7 - French Pronunciation Patterns Data
 * =================================================
 *
 * This file contains all lesson data for A1 Lesson 7, focusing on French
 * pronunciation patterns and spelling-to-sound rules. French pronunciation
 * can be tricky for beginners because spelling doesn't always match English
 * expectations. This lesson teaches 16 core patterns to help learners
 * predict how French words should sound.
 *
 * Data Categories:
 * ----------------
 * 1. Pronunciation Patterns (16 items) - Core spelling-to-sound rules
 * 2. Sound Comparisons (3 items) - Contrasting similar sounds
 * 3. Guided Examples (5 items) - Full phrases with audio
 * 4. Practice Questions (16 items) - Pattern recognition quiz
 * 5. Section IDs (5 items) - Lesson section identifiers
 * 6. Performance Message Function - Feedback based on score
 *
 * Key Patterns Covered:
 * ---------------------
 * - S between vowels sounds like Z
 * - AU/EAU sounds like O
 * - Final E effects on consonants
 * - Silent final consonants
 * - Nasal vowels (AN, ON, IN)
 * - OU vs U distinction
 * - GN sounds like 'ny'
 * - ILL sounds like 'y'
 * - Soft/hard C and G
 * - CH sounds like SH
 * - OI sounds like WAH
 * - AI/EI sounds like EH
 * - Accents effect on pronunciation
 * - Liaison introduction
 */

// =============================================================================
// PRONUNCIATION EXAMPLES AND PATTERNS
// =============================================================================

/**
 * PronunciationExample Interface
 * -----------------------------
 * Individual word example with French, English, phonetic, and audio.
 */
export interface PronunciationExample {
  french: string
  english: string
  phonetic: string
  audioSrc: string
}

/**
 * PronunciationPattern Interface
 * -----------------------------
 * Complete pattern with rule, explanation, examples, and common mistakes.
 */
export interface PronunciationPattern {
  id: string
  title: string
  rule: string
  explanation: string
  examples: PronunciationExample[]
  mistakeNote: string
}

/**
 * Pronunciation Patterns - 16 core French pronunciation rules.
 *
 * Each pattern includes:
 * - A clear title and rule statement
 * - Detailed explanation of when the pattern applies
 * - 3-4 example words with phonetic guides
 * - Common mistake warnings for beginners
 */
export const pronunciationPatterns: PronunciationPattern[] = [
  {
    id: "s-between-vowels",
    title: "S between vowels sounds like Z",
    rule: "When \"s\" comes between two vowels, it often sounds like a z.",
    explanation: "This is a very common French pronunciation pattern.",
    examples: [
      { french: "maison", english: "house", phonetic: "meh-zon", audioSrc: "/audio/a1/pronunciation/maison.mp3" },
      { french: "musique", english: "music", phonetic: "mew-zeek", audioSrc: "/audio/a1/pronunciation/musique.mp3" },
      { french: "rose", english: "rose", phonetic: "rohz", audioSrc: "/audio/a1/pronunciation/rose.mp3" }
    ],
    mistakeNote: "Many beginners pronounce the s like a hard 's'. In these words, it sounds like 'z'."
  },
  {
    id: "au-eau",
    title: "AU and EAU usually sound like O",
    rule: "The letter groups \"au\" and \"eau\" usually make an \"o\" sound.",
    explanation: "Even though these groups have several letters, they often make one simple sound.",
    examples: [
      { french: "chaud", english: "hot", phonetic: "sho", audioSrc: "/audio/a1/pronunciation/chaud.mp3" },
      { french: "tableau", english: "board / painting", phonetic: "tab-lo", audioSrc: "/audio/a1/pronunciation/tableau.mp3" },
      { french: "eau", english: "water", phonetic: "o", audioSrc: "/audio/a1/pronunciation/eau.mp3" },
      { french: "beau", english: "beautiful / handsome", phonetic: "bo", audioSrc: "/audio/a1/pronunciation/beau.mp3" }
    ],
    mistakeNote: "Do not pronounce each vowel separately. Treat the pattern as one sound."
  },
  {
    id: "final-e-effect",
    title: "Final E can change how the word sounds",
    rule: "A final silent e can affect whether the consonant before it is pronounced more clearly.",
    explanation: "French spelling often changes how the final consonant behaves depending on whether an e is present.",
    examples: [
      { french: "petit", english: "small (masculine)", phonetic: "puh-tee", audioSrc: "/audio/a1/pronunciation/petit.mp3" },
      { french: "petite", english: "small (feminine)", phonetic: "puh-teet", audioSrc: "/audio/a1/pronunciation/petite.mp3" },
      { french: "grand", english: "big / tall (masculine)", phonetic: "grahn", audioSrc: "/audio/a1/pronunciation/grand.mp3" },
      { french: "grande", english: "big / tall (feminine)", phonetic: "grahnd", audioSrc: "/audio/a1/pronunciation/grande.mp3" }
    ],
    mistakeNote: "The added final e does not always sound strongly itself, but it can make the final consonant easier to hear."
  },
  {
    id: "final-consonants",
    title: "Many final consonants are silent",
    rule: "In many French words, the final consonant is not pronounced.",
    explanation: "This is one of the biggest differences between French spelling and pronunciation.",
    examples: [
      { french: "petit", english: "small", phonetic: "puh-tee", audioSrc: "/audio/a1/pronunciation/petit.mp3" },
      { french: "nez", english: "nose", phonetic: "nay", audioSrc: "/audio/a1/pronunciation/nez.mp3" },
      { french: "grand", english: "big / tall", phonetic: "grahn", audioSrc: "/audio/a1/pronunciation/grand.mp3" },
      { french: "parlent", english: "they speak", phonetic: "parl", audioSrc: "/audio/a1/pronunciation/parlent.mp3" }
    ],
    mistakeNote: "Do not assume you pronounce every final letter."
  },
  {
    id: "final-consonants-pronounced-sometimes",
    title: "Some final consonants are pronounced",
    rule: "Some final consonants are pronounced, especially in shorter everyday words or when spelling patterns require it.",
    explanation: "French has many silent endings, but not all final consonants disappear.",
    examples: [
      { french: "avec", english: "with", phonetic: "ah-vek", audioSrc: "/audio/a1/pronunciation/avec.mp3" },
      { french: "sac", english: "bag", phonetic: "sak", audioSrc: "/audio/a1/pronunciation/sac.mp3" },
      { french: "vite", english: "fast", phonetic: "veet", audioSrc: "/audio/a1/pronunciation/vite.mp3" },
      { french: "huit", english: "eight", phonetic: "weet", audioSrc: "/audio/a1/pronunciation/huit.mp3" }
    ],
    mistakeNote: "The best approach is to learn common patterns and listen often."
  },
  {
    id: "nasal-an-on-in",
    title: "Nasal vowels: AN, ON, IN",
    rule: "In French, vowel + n or m often creates a nasal sound instead of a fully pronounced consonant.",
    explanation: "This is a key part of French pronunciation and may feel new to many learners.",
    examples: [
      { french: "sans", english: "without", phonetic: "sahn", audioSrc: "/audio/a1/pronunciation/sans.mp3" },
      { french: "nom", english: "name", phonetic: "nohn", audioSrc: "/audio/a1/pronunciation/nom.mp3" },
      { french: "vin", english: "wine", phonetic: "vanh", audioSrc: "/audio/a1/pronunciation/vin.mp3" },
      { french: "blanc", english: "white", phonetic: "blahn", audioSrc: "/audio/a1/pronunciation/blanc.mp3" }
    ],
    mistakeNote: "Try not to pronounce the final n strongly. Let the vowel carry the nasal sound."
  },
  {
    id: "ou-vs-u",
    title: "OU and U are different sounds",
    rule: "French \"ou\" and \"u\" are not the same sound.",
    explanation: "This difference is very important because it changes meaning.",
    examples: [
      { french: "tout", english: "all", phonetic: "too", audioSrc: "/audio/a1/pronunciation/tout.mp3" },
      { french: "tu", english: "you", phonetic: "tew", audioSrc: "/audio/a1/pronunciation/tu.mp3" },
      { french: "roue", english: "wheel", phonetic: "roo", audioSrc: "/audio/a1/pronunciation/roue.mp3" },
      { french: "rue", english: "street", phonetic: "rew", audioSrc: "/audio/a1/pronunciation/rue.mp3" }
    ],
    mistakeNote: "Many beginners pronounce u like ou, but French keeps them separate."
  },
  {
    id: "gn",
    title: "GN often sounds like 'ny'",
    rule: "The letter group \"gn\" often sounds similar to 'ny' in 'canyon'.",
    explanation: "This pattern appears in common French words.",
    examples: [
      { french: "montagne", english: "mountain", phonetic: "mon-tahn-yuh", audioSrc: "/audio/a1/pronunciation/montagne.mp3" },
      { french: "ligne", english: "line", phonetic: "leen-yuh", audioSrc: "/audio/a1/pronunciation/ligne.mp3" },
      { french: "mignon", english: "cute", phonetic: "mee-nyohn", audioSrc: "/audio/a1/pronunciation/mignon.mp3" }
    ],
    mistakeNote: "Do not pronounce g and n separately here."
  },
  {
    id: "ill",
    title: "ILL can make a 'y' sound",
    rule: "In many words, \"ill\" sounds like 'y'.",
    explanation: "This does not happen in every single word, but it is common enough to learn early.",
    examples: [
      { french: "fille", english: "girl", phonetic: "feey", audioSrc: "/audio/a1/pronunciation/fille.mp3" },
      { french: "famille", english: "family", phonetic: "fah-mee-y", audioSrc: "/audio/a1/pronunciation/famille.mp3" },
      { french: "travail", english: "work", phonetic: "trah-vahy", audioSrc: "/audio/a1/pronunciation/travail.mp3" }
    ],
    mistakeNote: "Avoid sounding out every letter one by one."
  },
  {
    id: "soft-c-hard-c",
    title: "C can be soft or hard",
    rule: "Before e, i, or y, c often sounds like s. Before a, o, or u, it often sounds like k.",
    explanation: "This helps learners predict pronunciation better.",
    examples: [
      { french: "cinéma", english: "cinema", phonetic: "see-nay-ma", audioSrc: "/audio/a1/pronunciation/cinema.mp3" },
      { french: "français", english: "French", phonetic: "frahn-say", audioSrc: "/audio/a1/pronunciation/francais.mp3" },
      { french: "café", english: "coffee", phonetic: "kah-fay", audioSrc: "/audio/a1/pronunciation/cafe.mp3" },
      { french: "couleur", english: "color", phonetic: "koo-luhr", audioSrc: "/audio/a1/pronunciation/couleur.mp3" }
    ],
    mistakeNote: "Look at the next vowel to predict the sound."
  },
  {
    id: "soft-g-hard-g",
    title: "G can be soft or hard",
    rule: "Before e, i, or y, g often sounds like zh. Before a, o, or u, it often sounds like g in 'go'.",
    explanation: "This is another very common spelling-to-sound pattern.",
    examples: [
      { french: "girafe", english: "giraffe", phonetic: "zhee-rahf", audioSrc: "/audio/a1/pronunciation/girafe.mp3" },
      { french: "géant", english: "giant", phonetic: "zhay-ahn", audioSrc: "/audio/a1/pronunciation/geant.mp3" },
      { french: "gare", english: "station", phonetic: "gahr", audioSrc: "/audio/a1/pronunciation/gare.mp3" },
      { french: "gomme", english: "eraser", phonetic: "gohm", audioSrc: "/audio/a1/pronunciation/gomme.mp3" }
    ],
    mistakeNote: "Check the vowel after g."
  },
  {
    id: "ch",
    title: "CH usually sounds like SH",
    rule: "In many French words, \"ch\" sounds like 'sh'.",
    explanation: "This is one of the most useful patterns for beginners.",
    examples: [
      { french: "chat", english: "cat", phonetic: "shah", audioSrc: "/audio/a1/pronunciation/chat.mp3" },
      { french: "chocolat", english: "chocolate", phonetic: "sho-koh-lah", audioSrc: "/audio/a1/pronunciation/chocolat.mp3" },
      { french: "acheter", english: "to buy", phonetic: "ash-tay", audioSrc: "/audio/a1/pronunciation/acheter.mp3" }
    ],
    mistakeNote: "Do not pronounce it like English 'ch' in 'chair'."
  },
  {
    id: "oi",
    title: "OI usually sounds like WAH",
    rule: "The letter group \"oi\" usually sounds like 'wah'.",
    explanation: "This is a very common French vowel pattern.",
    examples: [
      { french: "moi", english: "me", phonetic: "mwah", audioSrc: "/audio/a1/pronunciation/moi.mp3" },
      { french: "toi", english: "you", phonetic: "twah", audioSrc: "/audio/a1/pronunciation/toi.mp3" },
      { french: "voiture", english: "car", phonetic: "vwah-tewr", audioSrc: "/audio/a1/pronunciation/voiture.mp3" }
    ],
    mistakeNote: "Avoid reading it like English 'oy'."
  },
  {
    id: "ai-ei",
    title: "AI and EI often sound like EH",
    rule: "In many common words, ai and ei sound like 'eh'.",
    explanation: "This appears often in common verbs and adjectives.",
    examples: [
      { french: "j'ai", english: "I have", phonetic: "zheh", audioSrc: "/audio/a1/pronunciation/jai.mp3" },
      { french: "lait", english: "milk", phonetic: "leh", audioSrc: "/audio/a1/pronunciation/lait.mp3" },
      { french: "seize", english: "sixteen", phonetic: "sez", audioSrc: "/audio/a1/pronunciation/seize.mp3" }
    ],
    mistakeNote: "Do not automatically read ai like English 'eye'."
  },
  {
    id: "accents",
    title: "Accents change pronunciation and reading",
    rule: "French accents can change how a vowel sounds or help show the correct spelling.",
    explanation: "At beginner level, the most important thing is to notice and respect accented vowels.",
    examples: [
      { french: "école", english: "school", phonetic: "ay-kol", audioSrc: "/audio/a1/pronunciation/ecole.mp3" },
      { french: "frère", english: "brother", phonetic: "frehr", audioSrc: "/audio/a1/pronunciation/frere.mp3" },
      { french: "où", english: "where", phonetic: "oo", audioSrc: "/audio/a1/pronunciation/ou.mp3" }
    ],
    mistakeNote: "Accents are part of the word. Do not ignore them."
  },
  {
    id: "liaison-intro",
    title: "Beginner introduction to liaison",
    rule: "Sometimes a normally silent final consonant is pronounced before a following vowel sound.",
    explanation: "This is called liaison. At A1 level, just notice it in common expressions.",
    examples: [
      { french: "les amis", english: "the friends", phonetic: "lay-zah-mee", audioSrc: "/audio/a1/pronunciation/les-amis.mp3" },
      { french: "vous avez", english: "you have", phonetic: "voo-zah-vay", audioSrc: "/audio/a1/pronunciation/vous-avez.mp3" },
      { french: "un enfant", english: "a child", phonetic: "uh-nahn-fahn", audioSrc: "/audio/a1/pronunciation/un-enfant.mp3" }
    ],
    mistakeNote: "Do not worry about mastering all liaison rules yet. Just begin to notice the sound link."
  }
]

// =============================================================================
// SOUND COMPARISONS
// =============================================================================

/**
 * SoundComparison Interface
 * -------------------------
 * Side-by-side comparison of two similar French sounds.
 */
export interface SoundComparison {
  id: string
  left: { label: string; example: string; phonetic: string }
  right: { label: string; example: string; phonetic: string }
  note: string
}

/**
 * Sound Comparisons - Three key sound distinctions.
 *
 * Comparisons:
 * - u vs ou (tu vs tout)
 * - s vs z-sound (salut vs maison)
 * - au/eau vs oi (beau vs moi)
 */
export const soundComparisons: SoundComparison[] = [
  {
    id: "u-vs-ou",
    left: { label: "u", example: "tu", phonetic: "tew" },
    right: { label: "ou", example: "tout", phonetic: "too" },
    note: "These are different sounds in French."
  },
  {
    id: "s-vs-z",
    left: { label: "s", example: "salut", phonetic: "sah-lu" },
    right: { label: "z-sound from s between vowels", example: "maison", phonetic: "meh-zon" },
    note: "The position of s in the word changes the sound."
  },
  {
    id: "o-vs-wah",
    left: { label: "au / eau", example: "beau", phonetic: "bo" },
    right: { label: "oi", example: "moi", phonetic: "mwah" },
    note: "These spelling patterns create very different vowel sounds."
  }
]

// =============================================================================
// GUIDED EXAMPLES
// =============================================================================

/**
 * GuidedExample Interface
 * -----------------------
 * Full phrase example for listening practice.
 */
export interface GuidedExample {
  french: string
  english: string
  phonetic: string
  audioSrc: string
}

/**
 * Guided Examples - 5 full phrases demonstrating multiple patterns.
 *
 * Examples:
 * - la maison (shows s-between-vowels)
 * - un beau livre (shows au pattern)
 * - les amis (shows liaison)
 * - une petite voiture rouge (shows final e effect)
 * - tu parles français (shows u sound and soft c)
 */
export const guidedExamples: GuidedExample[] = [
  { french: "la maison", english: "the house", phonetic: "lah meh-zon", audioSrc: "/audio/a1/pronunciation/la-maison.mp3" },
  { french: "un beau livre", english: "a beautiful book", phonetic: "uhn bo leevr", audioSrc: "/audio/a1/pronunciation/un-beau-livre.mp3" },
  { french: "les amis", english: "the friends", phonetic: "lay-zah-mee", audioSrc: "/audio/a1/pronunciation/les-amis.mp3" },
  { french: "une petite voiture rouge", english: "a small red car", phonetic: "ewn puh-teet vwah-tewr roozh", audioSrc: "/audio/a1/pronunciation/une-petite-voiture-rouge.mp3" },
  { french: "tu parles français ?", english: "do you speak French?", phonetic: "tew parl frahn-say", audioSrc: "/audio/a1/pronunciation/tu-parles-francais.mp3" }
]

// =============================================================================
// PRACTICE QUESTIONS
// =============================================================================

/**
 * PracticeQuestion Interface
 * -------------------------
 * Multiple-choice question for pronunciation pattern recognition.
 */
export interface PracticeQuestion {
  id: number
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

/**
 * Practice Questions - 16 questions testing pronunciation knowledge.
 *
 * Question topics:
 * - IDs 1-4: S sounds, AU pattern, final consonants, OI pattern
 * - IDs 5-8: Nasal vowels, CH sound, soft C, hard G
 * - IDs 9-12: OU vs U, liaison, ILL pattern, final E effect
 * - IDs 13-16: Pattern recognition, sound comparisons, learning strategy
 */
export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    prompt: "In \"maison\", how does the letter s sound?",
    options: ["like s", "like z", "silent"],
    correct: 1,
    explanation: "Between vowels, s often sounds like z."
  },
  {
    id: 2,
    prompt: "What sound does \"au\" usually make in French?",
    options: ["ah", "o", "ow"],
    correct: 1,
    explanation: "\"Au\" usually sounds like o."
  },
  {
    id: 3,
    prompt: "Choose the correct phonetic guide for \"beau\".",
    options: ["bo", "bew", "bah-oo"],
    correct: 0,
    explanation: "\"Beau\" is pronounced like bo."
  },
  {
    id: 4,
    prompt: "What is true about many final consonants in French?",
    options: ["They are always pronounced", "They are often silent", "They always become vowels"],
    correct: 1,
    explanation: "Many final consonants are often silent in French."
  },
  {
    id: 5,
    prompt: "Choose the correct phonetic guide for \"moi\".",
    options: ["moy", "mwah", "mo"],
    correct: 1,
    explanation: "\"Oi\" usually sounds like wah."
  },
  {
    id: 6,
    prompt: "Which word contains a nasal vowel sound?",
    options: ["vin", "vite", "ville"],
    correct: 0,
    explanation: "\"Vin\" has a nasal vowel."
  },
  {
    id: 7,
    prompt: "In many French words, \"ch\" sounds like:",
    options: ["k", "ch as in chair", "sh"],
    correct: 2,
    explanation: "\"Ch\" usually sounds like sh."
  },
  {
    id: 8,
    prompt: "Choose the correct rule for \"cinéma\".",
    options: ["c sounds like k", "c sounds like s", "c is silent"],
    correct: 1,
    explanation: "Before e, i, or y, c often sounds like s."
  },
  {
    id: 9,
    prompt: "Choose the correct rule for \"gare\".",
    options: ["g sounds like zh", "g sounds like g", "g is silent"],
    correct: 1,
    explanation: "Before a, o, or u, g often sounds hard."
  },
  {
    id: 10,
    prompt: "Which word best shows that \"u\" and \"ou\" are different sounds?",
    options: ["tu / tout", "beau / eau", "chat / chocolat"],
    correct: 0,
    explanation: "\"Tu\" and \"tout\" are a classic comparison."
  },
  {
    id: 11,
    prompt: "What often happens before a vowel in liaison?",
    options: ["The whole word disappears", "A silent final consonant may be pronounced", "The vowel becomes silent"],
    correct: 1,
    explanation: "Liaison can make a normally silent consonant heard."
  },
  {
    id: 12,
    prompt: "Choose the correct phonetic guide for \"fille\".",
    options: ["fill", "fee-lee", "feey"],
    correct: 2,
    explanation: "In many words, ill makes a y sound."
  },
  {
    id: 13,
    prompt: "What is the most likely pronunciation clue for \"petite\" compared with \"petit\"?",
    options: ["The final consonant is heard more clearly", "The whole word becomes shorter", "The t disappears completely"],
    correct: 0,
    explanation: "The final e can change how the ending is pronounced."
  },
  {
    id: 14,
    prompt: "Which pattern usually sounds like o?",
    options: ["oi", "eau", "ill"],
    correct: 1,
    explanation: "\"Eau\" usually sounds like o."
  },
  {
    id: 15,
    prompt: "Which word is most likely pronounced with a z sound in the middle?",
    options: ["salut", "maison", "chat"],
    correct: 1,
    explanation: "The s in maison is between vowels."
  },
  {
    id: 16,
    prompt: "Which statement is best for beginners?",
    options: [
      "Pronounce every French letter clearly",
      "Ignore spelling and guess",
      "Learn common spelling-to-sound patterns"
    ],
    correct: 2,
    explanation: "Pattern recognition is the best beginner strategy."
  }
]

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * Section IDs Array - Ordered list of all lesson section identifiers.
 * Used for progress tracking and determining completion status.
 */
export const sectionIds = [
  'intro',                  // Introduction to pronunciation
  'core-patterns',          // 16 pronunciation patterns
  'sound-comparisons',      // Side-by-side sound contrasts
  'guided-examples',        // Full phrase listening practice
  'practice'                // Interactive quiz (16 questions)
] as const

/**
 * SectionId Type - Union type derived from sectionIds array.
 * Ensures type safety when referencing section identifiers.
 */
export type SectionId = typeof sectionIds[number]

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * PerformanceMessage Interface
 * ----------------------------
 * Structure for personalized feedback based on quiz score.
 */
export interface PerformanceMessage {
  title: string
  message: string
  tone: 'high' | 'medium' | 'low'
  color: 'green' | 'blue' | 'amber'
}

/**
 * getPerformanceMessage - Returns feedback based on practice score.
 *
 * Score tiers:
 * - 80%+ (13-16 correct): High praise, green theme
 * - 44-79% (7-12 correct): Encouragement, blue theme
 * - Below 44% (0-6 correct): Supportive guidance, amber theme
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions
 * @returns PerformanceMessage with title, message, tone, and color
 */
export function getPerformanceMessage(score: number, total: number): PerformanceMessage {
  const percentage = (score / total) * 100
  
  if (percentage >= 80) {
    return {
      title: "Great job!",
      message: "You're noticing French pronunciation patterns well. That will make reading, listening, and speaking much easier as you continue.",
      tone: "high",
      color: "green"
    }
  } else if (percentage >= 44) {
    return {
      title: "Nice progress",
      message: "You're starting to recognize important French sound patterns. A quick review could help, but you can also keep moving forward.",
      tone: "medium",
      color: "blue"
    }
  } else {
    return {
      title: "Good effort",
      message: "French pronunciation patterns take time. You can retake this practice or keep going — both are okay. The more you listen, the easier these patterns become.",
      tone: "low",
      color: "amber"
    }
  }
}
