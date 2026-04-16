/**
 * A2 Lesson 10 - The Present Conditional (Le Conditionnel Présent)
 * ===================================================================
 *
 * This file contains all lesson data for A2 Lesson 10, focusing on the
 * present conditional tense in French for polite requests, wishes, and
 * hypothetical situations.
 *
 * **Lesson Content:**
 * - What the present conditional is and when to use it
 * - Formation rule: future stem + imparfait endings
 * - Regular verb conjugations in conditional
 * - Common irregular stems (être → ser-, avoir → aur-, etc.)
 * - Conditional vs futur simple distinctions
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Formation: future stem + imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient)
 * - Used for: polite requests, wishes, hypothetical situations, advice
 * - Often corresponds to "would" in English
 * - Irregular stems must be memorized
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. conditionalUses - When to use the conditional
 * 3. conditionalFormationRule - Formation explanation
 * 4. conditionalEndings - Conjugation endings table
 * 5. regularConditionalVerbs - Regular verb examples
 * 6. irregularConditionalVerbs - Irregular verb stems
 * 7. futureVsConditionalComparisons - Conditional vs future
 * 8. guidedExamples - Example sentences for study
 * 9. commonMistakes - Common errors to avoid
 * 10. practiceQuestions - 15 quiz questions
 * 11. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to conditional
 * 2. what-is-conditional - Understanding the tense
 * 3. when-to-use - Appropriate contexts
 * 4. formation - How to form the conditional
 * 5. endings - Conjugation endings
 * 6. regular-verbs - Regular verb examples
 * 7. irregular-stems - Irregular verb stems
 * 8. vs-futur - Conditional vs future
 * 9. guided-examples - Example sentences
 * 10. mistakes - Common errors
 * 11. practice - Interactive quiz
 * 12. completion - Lesson completion
 */
export const sectionIds = [
  "intro",
  "what-is-conditional",
  "when-to-use",
  "formation",
  "endings",
  "regular-verbs",
  "irregular-stems",
  "vs-futur",
  "guided-examples",
  "mistakes",
  "practice",
  "completion",
];

// =============================================================================
// WHEN TO USE THE CONDITIONAL (Section 2)
// =============================================================================

/**
 * conditionalUses - Appropriate contexts for the present conditional.
 *
 * Primary uses:
 * - Polite requests (voudrais, pourrais)
 * - Wishes or desires (aimerais)
 * - Hypothetical situations
 * - Soft suggestions or advice (devrais)
 */
export const conditionalUses = [
  {
    title: "Polite requests",
    explanation: "The conditional makes requests sound softer and more polite.",
    example: "Je voudrais un café.",
    english: "I would like a coffee.",
  },
  {
    title: "Wishes or desires",
    explanation: "The conditional can express what someone would like or want.",
    example: "J'aimerais visiter Paris.",
    english: "I would like to visit Paris.",
  },
  {
    title: "Hypothetical situations",
    explanation: "The conditional can describe imagined situations.",
    example: "Avec plus de temps, je lirais davantage.",
    english: "With more time, I would read more.",
  },
  {
    title: "Soft suggestions or advice",
    explanation: "Some verbs in the conditional are used for advice or suggestions.",
    example: "Tu devrais te reposer.",
    english: "You should rest.",
  },
];

// =============================================================================
// FORMATION RULE (Section 3)
// =============================================================================

/**
 * conditionalFormationRule - How to form the present conditional.
 *
 * The key rule: future stem + imparfait endings
 * - Take the future stem (usually infinitive or irregular stem)
 * - Add imparfait endings: -ais, -ais, -ait, -ions, -iez, -aient
 */
export const conditionalFormationRule = {
  rule: "future stem + imparfait endings",
  examples: [
    {
      infinitive: "parler",
      stem: "parler-",
      form: "je parlerais",
      english: "I would speak",
    },
    {
      infinitive: "finir",
      stem: "finir-",
      form: "je finirais",
      english: "I would finish",
    },
    {
      infinitive: "vendre",
      stem: "vendr-",
      form: "je vendrais",
      english: "I would sell",
    },
  ],
};

// =============================================================================
// CONDITIONAL ENDINGS (Section 4)
// =============================================================================

/**
 * conditionalEndings - The imparfait endings used in conditional.
 *
 * Same endings as the imparfait tense:
 * - je: -ais
 * - tu: -ais
 * - il/elle/on: -ait
 * - nous: -ions
 * - vous: -iez
 * - ils/elles: -aient
 */
export const conditionalEndings = [
  { pronoun: "je", ending: "-ais", example: "je parlerais" },
  { pronoun: "tu", ending: "-ais", example: "tu parlerais" },
  { pronoun: "il / elle / on", ending: "-ait", example: "il parlerait" },
  { pronoun: "nous", ending: "-ions", example: "nous parlerions" },
  { pronoun: "vous", ending: "-iez", example: "vous parleriez" },
  { pronoun: "ils / elles", ending: "-aient", example: "ils parleraient" },
];

// =============================================================================
// REGULAR VERBS (Section 5)
// =============================================================================

/**
 * regularConditionalVerbs - Common regular verbs in conditional.
 *
 * These use the standard formation:
 * - Future stem (infinitive minus -e for -re verbs)
 * + Conditional endings
 */
export const regularConditionalVerbs = [
  {
    infinitive: "parler",
    je: "je parlerais",
    english: "I would speak",
  },
  {
    infinitive: "finir",
    je: "je finirais",
    english: "I would finish",
  },
  {
    infinitive: "travailler",
    je: "je travaillerais",
    english: "I would work",
  },
  {
    infinitive: "étudier",
    je: "j'étudierais",
    english: "I would study",
  },
  {
    infinitive: "manger",
    je: "je mangerais",
    english: "I would eat",
  },
  {
    infinitive: "habiter",
    je: "j'habiterais",
    english: "I would live",
  },
  {
    infinitive: "vendre",
    je: "je vendrais",
    english: "I would sell",
  },
  {
    infinitive: "attendre",
    je: "j'attendrais",
    english: "I would wait",
  },
];

// =============================================================================
// IRREGULAR STEMS (Section 6)
// =============================================================================

/**
 * irregularConditionalVerbs - Common irregular conditional stems.
 *
 * These verbs have irregular future stems that carry into conditional:
 * - être → ser-
 * - avoir → aur-
 * - aller → ir-
 * - faire → fer-
 * - venir → viendr-
 * - voir → verr-
 * - vouloir → voudr-
 * - pouvoir → pourr-
 * - devoir → devr-
 * - savoir → saur-
 */
export const irregularConditionalVerbs = [
  {
    infinitive: "être",
    stem: "ser-",
    sample: "je serais",
    english: "I would be",
  },
  {
    infinitive: "avoir",
    stem: "aur-",
    sample: "j'aurais",
    english: "I would have",
  },
  {
    infinitive: "aller",
    stem: "ir-",
    sample: "j'irais",
    english: "I would go",
  },
  {
    infinitive: "faire",
    stem: "fer-",
    sample: "je ferais",
    english: "I would do / make",
  },
  {
    infinitive: "venir",
    stem: "viendr-",
    sample: "je viendrais",
    english: "I would come",
  },
  {
    infinitive: "voir",
    stem: "verr-",
    sample: "je verrais",
    english: "I would see",
  },
  {
    infinitive: "vouloir",
    stem: "voudr-",
    sample: "je voudrais",
    english: "I would want / I would like",
  },
  {
    infinitive: "pouvoir",
    stem: "pourr-",
    sample: "je pourrais",
    english: "I could / I would be able to",
  },
  {
    infinitive: "devoir",
    stem: "devr-",
    sample: "je devrais",
    english: "I should / I would have to",
  },
  {
    infinitive: "savoir",
    stem: "saur-",
    sample: "je saurais",
    english: "I would know",
  },
];

// =============================================================================
// CONDITIONAL VS FUTUR SIMPLE (Section 7)
// =============================================================================

/**
 * futureVsConditionalComparisons - Side-by-side future and conditional comparison.
 *
 * Shows the difference between:
 * - Futur simple: real future action (will)
 * - Conditionnel: possible/imagined action (would)
 *
 * Often the conditional depends on a condition (si clause).
 */
export const futureVsConditionalComparisons = [
  {
    future: "Je parlerai demain.",
    conditional: "Je parlerais si j'avais le temps.",
    futureEnglish: "I will speak tomorrow.",
    conditionalEnglish: "I would speak if I had time.",
    note: "The futur simple expresses a real future action. The conditional expresses a possible or imagined action.",
  },
  {
    future: "Nous irons à Paris.",
    conditional: "Nous irions à Paris avec plus d'argent.",
    futureEnglish: "We will go to Paris.",
    conditionalEnglish: "We would go to Paris with more money.",
    note: "The conditional often depends on a condition.",
  },
  {
    future: "Elle sera contente.",
    conditional: "Elle serait contente de te voir.",
    futureEnglish: "She will be happy.",
    conditionalEnglish: "She would be happy to see you.",
    note: "The forms look similar, but the meaning is different.",
  },
];

// =============================================================================
// GUIDED EXAMPLES (Section 8)
// =============================================================================

/**
 * guidedExamples - Collection of example sentences for study.
 *
 * Various contexts showing conditional in everyday French,
 * including polite requests, wishes, and hypothetical situations.
 */
export const guidedExamples = [
  {
    french: "Je voudrais un thé, s'il vous plaît.",
    english: "I would like a tea, please.",
  },
  {
    french: "Nous irions au cinéma ce soir.",
    english: "We would go to the cinema tonight.",
  },
  {
    french: "Elle serait plus heureuse ici.",
    english: "She would be happier here.",
  },
  {
    french: "Tu pourrais m'aider ?",
    english: "Could you help me?",
  },
  {
    french: "Ils feraient le travail demain.",
    english: "They would do the work tomorrow.",
  },
  {
    french: "Je devrais étudier davantage.",
    english: "I should study more.",
  },
];

// =============================================================================
// COMMON MISTAKES (Section 9)
// =============================================================================

/**
 * commonMistakes - Examples of errors learners often make.
 *
 * Common errors:
 * - Confusing futur simple and conditional endings (-ai vs -ais)
 * - Using wrong irregular stems
 * - Wrong conjugation endings
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  {
    wrong: "Je parlerai si j'avais le temps.",
    correct: "Je parlerais si j'avais le temps.",
    explanation: "Use the conditional, not the future, for an imagined result.",
  },
  {
    wrong: "Je voudraisais un café.",
    correct: "Je voudrais un café.",
    explanation: "Vouloir is irregular. The correct form is voudrais.",
  },
  {
    wrong: "Nous irerions ensemble.",
    correct: "Nous irions ensemble.",
    explanation: "Aller uses the irregular stem ir-.",
  },
  {
    wrong: "Tu pourrait m'aider ?",
    correct: "Tu pourrais m'aider ?",
    explanation: "With tu, use the ending -ais.",
  },
];

// =============================================================================
// PRACTICE QUESTIONS (Section 10) - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for Lesson 10.
 *
 * Topics covered:
 * - usage (1-4): When to use conditional
 * - regular (5-8): Regular verb conjugations
 * - irregular (9-11): Irregular verb stems
 * - comparison (12-13): Conditional vs future
 * - correction (14-15): Fixing mistakes
 *
 * Each question has:
 * - id: unique identifier
 * - topic: category for grouping
 * - prompt: question text
 * - options: array of 3 possible answers
 * - correct: index of correct option (0-2)
 * - explanation: detailed explanation of answer
 */
export const practiceQuestions = [
  {
    id: 1,
    topic: "usage",
    prompt: "Which tense is often used for polite requests?",
    options: ["futur simple", "conditionnel présent", "passé composé"],
    correct: 1,
    explanation: "The present conditional is commonly used for polite requests.",
  },
  {
    id: 2,
    topic: "usage",
    prompt: "Which sentence expresses a wish?",
    options: [
      "J'aimerais visiter Paris.",
      "Je visiterai Paris hier.",
      "Je visite Paris souvent.",
    ],
    correct: 0,
    explanation: "J'aimerais means \"I would like\".",
  },
  {
    id: 3,
    topic: "usage",
    prompt: "Which sentence expresses advice?",
    options: [
      "Tu devrais te reposer.",
      "Tu te reposais hier.",
      "Tu reposeras demain.",
    ],
    correct: 0,
    explanation: "Devrais is a common conditional form used for advice.",
  },
  {
    id: 4,
    topic: "usage",
    prompt: "What does the present conditional often mean in English?",
    options: ["did", "would", "has"],
    correct: 1,
    explanation: "The present conditional often corresponds to would.",
  },
  {
    id: 5,
    topic: "regular",
    prompt: "Choose the correct conditional form: Je ___ avec Marie.",
    options: ["parlerais", "parlerai", "parlerait"],
    correct: 0,
    explanation: "With je, the ending is -ais.",
  },
  {
    id: 6,
    topic: "regular",
    prompt: "Choose the correct conditional form: Nous ___ demain.",
    options: ["finirions", "finirons", "finirait"],
    correct: 0,
    explanation: "With nous, the ending is -ions.",
  },
  {
    id: 7,
    topic: "regular",
    prompt: "Choose the correct conditional form: Vous ___ ici.",
    options: ["travailleriez", "travaillerez", "travailleraient"],
    correct: 0,
    explanation: "With vous, the ending is -iez.",
  },
  {
    id: 8,
    topic: "regular",
    prompt: "Choose the correct conditional form: Ils ___ la voiture.",
    options: ["vendraient", "vendront", "vendrions"],
    correct: 0,
    explanation: "Vendraient is the correct conditional plural form.",
  },
  {
    id: 9,
    topic: "irregular",
    prompt: "What is the conditional stem of être?",
    options: ["ser-", "êt-", "ét-"],
    correct: 0,
    explanation: "Être uses the irregular stem ser-.",
  },
  {
    id: 10,
    topic: "irregular",
    prompt: "Choose the correct conditional form of avoir.",
    options: ["j'aurais", "j'aurai", "j'averais"],
    correct: 0,
    explanation: "Avoir uses the stem aur- and conditional endings.",
  },
  {
    id: 11,
    topic: "irregular",
    prompt: "Choose the correct conditional form of pouvoir.",
    options: ["je pourrais", "je pourrai", "je pouvrais"],
    correct: 0,
    explanation: "Pouvoir uses the irregular stem pourr-.",
  },
  {
    id: 12,
    topic: "comparison",
    prompt: "Which sentence is in the futur simple?",
    options: [
      "Je parlerais avec toi.",
      "Je parlerai avec toi.",
      "Je parlais avec toi.",
    ],
    correct: 1,
    explanation: "Parlerai is futur simple.",
  },
  {
    id: 13,
    topic: "comparison",
    prompt: "Which sentence is in the conditional present?",
    options: [
      "Nous irions à Paris avec plus d'argent.",
      "Nous irons à Paris demain.",
      "Nous allions à Paris souvent.",
    ],
    correct: 0,
    explanation: "Irions is a conditional form.",
  },
  {
    id: 14,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Je parlerai si j'avais le temps.",
      "Je parlerais si j'avais le temps.",
      "Je parleais si j'avais le temps.",
    ],
    correct: 1,
    explanation: "Use the conditional for the imagined result.",
  },
  {
    id: 15,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Tu pourrait m'aider ?",
      "Tu pourrais m'aider ?",
      "Tu pourraisai m'aider ?",
    ],
    correct: 1,
    explanation: "With tu, the correct ending is -ais.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-6/15: "Good effort" - suggests review of endings and irregular stems
 * - 7-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 6) {
    return {
      title: "Good effort",
      message:
        "The present conditional takes practice, especially because it looks similar to the future. You can retake the practice or continue the lesson. A quick review of the endings and irregular stems will help a lot.",
      emoji: "📚",
      color: "blue",
    };
  } else if (score <= 11) {
    return {
      title: "Nice progress",
      message:
        "You're starting to understand how the conditional works. Review the difference from the futur simple once more if you want to feel more confident.",
      emoji: "🌟",
      color: "yellow",
    };
  } else {
    return {
      title: "Great job",
      message:
        "You're using the present conditional well. This tense is very useful for polite French, wishes, and imagined situations.",
      emoji: "🎉",
      color: "green",
    };
  }
}
