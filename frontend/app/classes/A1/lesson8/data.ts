/**
 * A1 Lesson 8 - French Adjectives and Adverbs Data
 * =================================================
 *
 * This file contains all lesson data for A1 Lesson 8, focusing on French
 * adjectives and adverbs. The lesson covers:
 * - Common adjectives with masculine/feminine forms
 * - Adjective agreement rules (gender and number)
 * - Adjective placement (before vs after nouns)
 * - Common adverbs and their usage
 * - Distinguishing adjectives from adverbs
 *
 * Data Categories:
 * ----------------
 * 1. Adjectives (10 items) - With masculine and feminine forms
 * 2. Placement Examples (4 items) - Before/after noun patterns
 * 3. Adverbs (10 items) - Common French adverbs
 * 4. Guided Examples (8 items) - Sentences showing usage in context
 * 5. Practice Questions (16 items) - Recognition and usage quiz
 *
 * Key Concepts:
 * -------------
 * - Adjectives describe nouns and must agree in gender/number
 * - Many adjectives add 'e' for feminine form
 * - Some adjectives go before nouns, others after
 * - Adverbs modify verbs, adjectives, or other adverbs
 * - Adverbs don't change form (invariable)
 */

// =============================================================================
// ADJECTIVES
// =============================================================================

/**
 * Common A1 Adjectives with Masculine/Feminine Forms
 *
 * Note: Some adjectives change form for feminine (add 'e'),
 * while others are already the same in both genders.
 *
 * Special cases:
 * - beau → belle (irregular stem change)
 * - vieux → vieille (irregular with 'x' → 'ill')
 */
export const adjectives = [
  { word: "grand", english: "big / tall", feminine: "grande" },
  { word: "petit", english: "small", feminine: "petite" },
  { word: "bon", english: "good", feminine: "bonne" },
  { word: "mauvais", english: "bad", feminine: "mauvaise" },
  { word: "beau", english: "beautiful", feminine: "belle" },
  { word: "jeune", english: "young", feminine: "jeune" },
  { word: "vieux", english: "old", feminine: "vieille" },
  { word: "rapide", english: "fast", feminine: "rapide" },
  { word: "lent", english: "slow", feminine: "lente" },
  { word: "facile", english: "easy", feminine: "facile" }
]

// =============================================================================
// PLACEMENT EXAMPLES
// =============================================================================

/**
 * Adjective Placement Examples
 *
 * French adjectives can go before or after the noun:
 * - Most descriptive adjectives go AFTER (rouge, intéressant)
 * - Common short adjectives go BEFORE (petit, grand, beau)
 */
export const placementExamples = [
  { french: "une voiture rouge", english: "a red car" },
  { french: "un livre intéressant", english: "an interesting book" },
  { french: "un petit chat", english: "a small cat" },
  { french: "une grande maison", english: "a big house" }
]

// =============================================================================
// ADVERBS
// =============================================================================

/**
 * Common A1 Adverbs
 *
 * Adverbs modify verbs, adjectives, or other adverbs.
 * Unlike adjectives, adverbs are invariable (don't change form).
 *
 * Categories:
 * - Manner: bien, mal, vite, lentement
 * - Frequency: souvent, toujours, parfois
 * - Place: ici, là
 * - Intensity: très
 */
export const adverbs = [
  { word: "bien", english: "well" },
  { word: "mal", english: "badly" },
  { word: "vite", english: "quickly" },
  { word: "lentement", english: "slowly" },
  { word: "souvent", english: "often" },
  { word: "toujours", english: "always" },
  { word: "parfois", english: "sometimes" },
  { word: "ici", english: "here" },
  { word: "là", english: "there" },
  { word: "très", english: "very" }
]

// =============================================================================
// GUIDED EXAMPLES
// =============================================================================

/**
 * GuidedExample Type
 * ------------------
 * Example sentence with focus point explaining the grammar concept.
 */
export type GuidedExample = {
  id: string
  french: string
  english: string
  focus: string
}

/**
 * Guided Examples - 8 sentences demonstrating adjective and adverb usage.
 *
 * Examples cover:
 * - Adjectives describing nouns
 * - Agreement (masculine → feminine)
 * - Adverbs modifying verbs
 * - Adjective vs adverb distinction
 * - Adjective placement (before/after noun)
 */
export const guidedExamples: GuidedExample[] = [
  {
    id: "ex-1",
    french: "C’est un grand livre.",
    english: "It’s a big book.",
    focus: "Adjective describes a noun (livre)."
  },
  {
    id: "ex-2",
    french: "C’est une petite maison.",
    english: "It’s a small house.",
    focus: "Agreement: petit → petite (feminine)."
  },
  {
    id: "ex-3",
    french: "Il est rapide.",
    english: "He is fast.",
    focus: "Adjective: rapide describes “il”."
  },
  {
    id: "ex-4",
    french: "Il court vite.",
    english: "He runs fast.",
    focus: "Adverb: vite modifies the verb (court)."
  },
  {
    id: "ex-5",
    french: "Elle travaille bien.",
    english: "She works well.",
    focus: "Adverb: bien modifies the verb (travaille)."
  },
  {
    id: "ex-6",
    french: "Une voiture rouge.",
    english: "A red car.",
    focus: "Placement: many adjectives come after the noun."
  },
  {
    id: "ex-7",
    french: "Un beau jardin.",
    english: "A beautiful garden.",
    focus: "Placement: some common adjectives come before."
  },
  {
    id: "ex-8",
    french: "Elle parle très lentement.",
    english: "She speaks very slowly.",
    focus: "Adverbs don’t change form; très modifies an adverb."
  }
]

// =============================================================================
// PRACTICE QUESTIONS
// =============================================================================

/**
 * Practice Topic Types
 * --------------------
 * Categorization for practice questions:
 * - adj-recognition: Identifying adjectives
 * - agreement: Gender/number agreement
 * - adverb-usage: Using adverbs correctly
 * - adj-vs-adv: Distinguishing adjectives from adverbs
 */
export type PracticeTopic = "adj-recognition" | "agreement" | "adverb-usage" | "adj-vs-adv"

/**
 * PracticeQuestion Type
 * ---------------------
 * Multiple-choice question with topic categorization.
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
 * Practice Questions - 16 questions testing adjective and adverb knowledge.
 *
 * Question distribution:
 * - IDs 1-6: Adjective recognition (identifying adjectives in sentences)
 * - IDs 7-10: Agreement (feminine forms, plural agreement)
 * - IDs 11-14: Adverb usage (choosing correct adverbs)
 * - IDs 15-16: Adjective vs adverb distinction
 */
export const practiceQuestions: PracticeQuestion[] = [
  // 6 adjective recognition
  {
    id: 1,
    topic: "adj-recognition",
    prompt: "Which word is an adjective (describes a noun)?",
    options: ["souvent", "grand", "vite", "ici"],
    correct: 1,
    explanation: "“Grand” is an adjective: un grand livre."
  },
  {
    id: 2,
    topic: "adj-recognition",
    prompt: "Pick the adjective in: “une voiture rouge”",
    options: ["une", "voiture", "rouge", "— there is no adjective"],
    correct: 2,
    explanation: "“Rouge” describes the noun “voiture”."
  },
  {
    id: 3,
    topic: "adj-recognition",
    prompt: "Which is a common A1 adjective?",
    options: ["toujours", "beau", "lentement", "très"],
    correct: 1,
    explanation: "“Beau” is an adjective: un beau jardin."
  },
  {
    id: 4,
    topic: "adj-recognition",
    prompt: "Which pair is masculine → feminine?",
    options: ["grand → grande", "bien → bonne", "vite → vieille", "souvent → souvente"],
    correct: 0,
    explanation: "Often you add “e” for feminine: grand → grande."
  },
  {
    id: 5,
    topic: "adj-recognition",
    prompt: "Which is an adjective meaning “old” (masculine form)?",
    options: ["vieux", "mal", "souvent", "là"],
    correct: 0,
    explanation: "“Vieux” = old (masculine). Feminine: vieille."
  },
  {
    id: 6,
    topic: "adj-recognition",
    prompt: "Which is an adjective meaning “easy”?",
    options: ["facile", "vite", "bien", "ici"],
    correct: 0,
    explanation: "“Facile” is an adjective: un exercice facile."
  },

  // 4 agreement questions
  {
    id: 7,
    topic: "agreement",
    prompt: "Choose the correct feminine form: petit → ?",
    options: ["petit", "petite", "petits", "petites"],
    correct: 1,
    explanation: "Feminine often adds “e”: petit → petite."
  },
  {
    id: 8,
    topic: "agreement",
    prompt: "Complete: une ___ maison (small)",
    options: ["petit", "petite", "petits", "petites"],
    correct: 1,
    explanation: "Maison is feminine singular → petite."
  },
  {
    id: 9,
    topic: "agreement",
    prompt: "Complete: des voitures ___ (red) (basic plural)",
    options: ["rouge", "rouges", "rougee", "rougees"],
    correct: 1,
    explanation: "Plural often adds “s”: rouge → rouges."
  },
  {
    id: 10,
    topic: "agreement",
    prompt: "Which sentence shows correct agreement?",
    options: ["un petite maison", "une petite maison", "une petit maison", "une petits maison"],
    correct: 1,
    explanation: "Maison is feminine → petite; “une petite maison”."
  },

  // 4 adverb usage
  {
    id: 11,
    topic: "adverb-usage",
    prompt: "Choose the best adverb for: “Elle travaille ___.” (well)",
    options: ["bonne", "bien", "beau", "grande"],
    correct: 1,
    explanation: "Adverbs modify verbs: travaille bien."
  },
  {
    id: 12,
    topic: "adverb-usage",
    prompt: "Complete: “Il parle ___.” (slowly)",
    options: ["lent", "lente", "lentement", "petit"],
    correct: 2,
    explanation: "“Lentement” is an adverb: Il parle lentement."
  },
  {
    id: 13,
    topic: "adverb-usage",
    prompt: "Choose the best word: “Je vais ___.” (quickly)",
    options: ["vite", "rapide", "bonne", "vieux"],
    correct: 0,
    explanation: "“Vite” is an adverb: Je vais vite."
  },
  {
    id: 14,
    topic: "adverb-usage",
    prompt: "In “Elle parle très lentement.” what does “très” do?",
    options: ["It makes an adjective feminine", "It modifies a verb", "It makes an adverb stronger", "It changes plural"],
    correct: 2,
    explanation: "“Très” intensifies: very slowly. It strengthens an adverb/adjective."
  },

  // 2 adjective vs adverb distinction
  {
    id: 15,
    topic: "adj-vs-adv",
    prompt: "Pick the sentence where “rapide” is an adjective.",
    options: ["Il court rapide.", "Il est rapide.", "Il parle rapide.", "Il va rapidement."],
    correct: 1,
    explanation: "“Il est rapide.” → adjective describing “il”. For running: Il court vite / rapidement."
  },
  {
    id: 16,
    topic: "adj-vs-adv",
    prompt: "Pick the sentence that uses an adverb correctly.",
    options: ["Elle est bien.", "Une bien voiture.", "Elle travaille bien.", "Un bien livre."],
    correct: 2,
    explanation: "Adverbs modify verbs: travaille bien."
  }
]

