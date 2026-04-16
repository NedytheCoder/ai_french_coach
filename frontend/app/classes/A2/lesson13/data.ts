/**
 * A2 Lesson 13 - Advanced Relative Pronouns (Pronoms Relatifs Complexes)
 * =========================================================================
 *
 * This file contains all lesson data for A2 Lesson 13, focusing on advanced
 * French relative pronouns including ce qui, ce que, ce à quoi, ce dont,
 * and the lequel family of pronouns.
 *
 * **Lesson Content:**
 * - Understanding ce qui (subject of clause, refers to idea/action)
 * - Understanding ce que (object of clause, refers to idea/action)
 * - Understanding ce à quoi (with verbs taking à)
 * - Understanding ce dont (with verbs taking de)
 * - The lequel forms (auquel, duquel, etc.) with gender/number agreement
 * - Comparing different forms and when to use each
 * - 18 practice quiz questions
 *
 * **Key Concepts:**
 * - Ce qui = what/which (subject)
 * - Ce que = what/which (object), becomes ce qu' before vowels
 * - Ce à quoi = what (with à-expressions like penser à)
 * - Ce dont = what (with de-expressions like parler de, avoir besoin de)
 * - Lequel/laquelle/lesquels/lesquelles + à/de contractions
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. ceQuiExamples - Ce qui usage examples
 * 3. ceQueExamples - Ce que usage examples
 * 4. ceAQuoiExamples - Ce à quoi usage examples
 * 5. ceDontExamples - Ce dont usage examples
 * 6. lequelForms - Lequel pronoun declension table
 * 7. lequelExamples - Lequel usage examples
 * 8. comparisonExamples - Side-by-side comparisons
 * 9. guidedExamples - Example sentences for study
 * 10. commonMistakes - Common errors to avoid
 * 11. practiceQuestions - 18 quiz questions
 * 12. getPerformanceMessage - Score-based feedback
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 *
 * Sections:
 * 1. intro - Introduction to advanced relative pronouns
 * 2. what-makes-advanced - Understanding the complexity
 * 3. ce-qui - Using ce qui for subjects
 * 4. ce-que - Using ce que for objects
 * 5. ce-a-quoi - Using ce à quoi with à
 * 6. ce-dont - Using ce dont with de
 * 7. lequel-forms - The lequel pronoun family
 * 8. comparison - Comparing different forms
 * 9. guided-examples - Example sentences
 * 10. mistakes - Common errors
 * 11. practice - Interactive quiz
 * 12. completion - Lesson completion
 */
export const sectionIds = [
  "intro",
  "what-makes-advanced",
  "ce-qui",
  "ce-que",
  "ce-a-quoi",
  "ce-dont",
  "lequel-forms",
  "comparison",
  "guided-examples",
  "mistakes",
  "practice",
  "completion",
];

// =============================================================================
// UNDERSTANDING CE QUI (Section 2)
// =============================================================================

/**
 * ceQuiExamples - Examples using ce qui as a relative pronoun.
 *
 * Ce qui means "what" or "which" and refers to an idea or action.
 * It is used when the "what" is the SUBJECT of the relative clause.
 *
 * Pattern: Ce qui + verb (what does the action)
 */
export const ceQuiExamples = [
  {
    french: "Je comprends ce qui se passe.",
    english: "I understand what is happening.",
  },
  {
    french: "Ce qui est important, c'est la pratique.",
    english: "What is important is practice.",
  },
];

// =============================================================================
// UNDERSTANDING CE QUE (Section 3)
// =============================================================================

/**
 * ceQueExamples - Examples using ce que as a relative pronoun.
 *
 * Ce que means "what" and refers to an idea or action.
 * It is used when the "what" is the DIRECT OBJECT of the relative clause.
 * Before a vowel or silent h, ce que becomes ce qu'.
 *
 * Pattern: Ce que/qu' + subject + verb (what receives the action)
 */
export const ceQueExamples = [
  {
    french: "Je sais ce que tu fais.",
    english: "I know what you are doing.",
  },
  {
    french: "Dis-moi ce que tu veux.",
    english: "Tell me what you want.",
  },
];

// =============================================================================
// UNDERSTANDING CE À QUOI (Section 4)
// =============================================================================

/**
 * ceAQuoiExamples - Examples using ce à quoi as a relative pronoun.
 *
 * Ce à quoi is used with verbs that take the preposition à.
 * It means "what" or "to what" and refers to the object of à.
 *
 * Used with verbs like: penser à, réfléchir à, s'intéresser à
 */
export const ceAQuoiExamples = [
  {
    french: "Je pense à quelque chose.",
    replaced: "Je pense à ce à quoi tu penses.",
    english: "I am thinking about what you are thinking about.",
  },
  {
    french: "C'est ce à quoi je réfléchis.",
    english: "That's what I'm thinking about.",
  },
];

// =============================================================================
// UNDERSTANDING CE DONT (Section 5)
// =============================================================================

/**
 * ceDontExamples - Examples using ce dont as a relative pronoun.
 *
 * Ce dont is used with verbs and expressions that take the preposition de.
 * It means "what" or "of which" and refers to the object of de.
 *
 * Used with expressions like: parler de, avoir besoin de, rêver de
 */
export const ceDontExamples = [
  {
    french: "Je parle de quelque chose.",
    replaced: "Je parle de ce dont tu parles.",
    english: "I am talking about what you are talking about.",
  },
  {
    french: "C'est ce dont j'ai besoin.",
    english: "That's what I need.",
  },
];

// =============================================================================
// LEQUEL FORMS (Section 6)
// =============================================================================

/**
 * lequelForms - The declension table for the lequel relative pronoun.
 *
 * Lequel agrees in gender and number with the noun it replaces:
 * - Masculine singular: lequel
 * - Feminine singular: laquelle
 * - Masculine plural: lesquels
 * - Feminine plural: lesquelles
 *
 * When combined with à or de, they contract:
 * - à + lequel = auquel, à + laquelle, auxquels, auxquelles
 * - de + lequel = duquel, de laquelle, desquels, desquelles
 */
export const lequelForms = [
  {
    base: "lequel",
    forms: [
      "lequel (masc. singular)",
      "laquelle (fem. singular)",
      "lesquels (masc. plural)",
      "lesquelles (fem. plural)",
    ],
  },
  {
    withA: ["auquel", "à laquelle", "auxquels", "auxquelles"],
    note: "used with à",
  },
  {
    withDe: ["duquel", "de laquelle", "desquels", "desquelles"],
    note: "used with de",
  },
];

/**
 * lequelExamples - Examples using lequel family pronouns.
 *
 * Shows practical usage of lequel/laquelle with à and de contractions.
 * These pronouns replace specific nouns and must agree in gender/number.
 */
export const lequelExamples = [
  {
    french: "La table à laquelle je pense",
    english: "The table I'm thinking about",
  },
  {
    french: "Le sujet auquel je réfléchis",
    english: "The subject I'm thinking about",
  },
  {
    french: "Le livre dont je parle",
    english: "The book I'm talking about",
  },
];

// =============================================================================
// COMPARISON EXAMPLES (Section 7)
// =============================================================================

/**
 * comparisonExamples - Side-by-side comparison of different forms.
 *
 * Shows when to use ce qui vs ce que, and ce à quoi vs ce dont.
 * Helps learners distinguish between similar-looking structures.
 */
export const comparisonExamples = [
  {
    ceQui: "Je comprends ce qui se passe.",
    ceQue: "Je comprends ce que tu dis.",
    explanation: "Ce qui = subject, ce que = object.",
  },
  {
    ceAQuoi: "Je pense à ce à quoi tu penses.",
    ceDont: "Je parle de ce dont tu parles.",
    explanation: "Use à → ce à quoi, use de → ce dont.",
  },
];

// =============================================================================
// GUIDED EXAMPLES (Section 8)
// =============================================================================

/**
 * guidedExamples - Collection of example sentences for study.
 *
 * Various contexts showing advanced relative pronouns in everyday French.
 */
export const guidedExamples = [
  {
    french: "Ce qui me plaît, c'est la musique.",
    english: "What I like is the music.",
  },
  {
    french: "Je fais ce que je peux.",
    english: "I do what I can.",
  },
  {
    french: "C'est ce dont j'ai besoin.",
    english: "That's what I need.",
  },
  {
    french: "Je pense à ce à quoi tu penses.",
    english: "I think about what you think about.",
  },
  {
    french: "Le sujet auquel je réfléchis est difficile.",
    english: "The subject I'm thinking about is difficult.",
  },
];

// =============================================================================
// COMMON MISTAKES (Section 9)
// =============================================================================

/**
 * commonMistakes - Examples of errors learners often make.
 *
 * Common errors:
 * - Using ce que instead of ce qui for subjects
 * - Using ce qui instead of ce que for objects
 * - Using ce que instead of ce dont with de expressions
 * - Wrong preposition with penser (à not de)
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  {
    wrong: "Je comprends ce que se passe.",
    correct: "Je comprends ce qui se passe.",
    explanation: "Use ce qui when it is the subject.",
  },
  {
    wrong: "Je sais ce qui tu fais.",
    correct: "Je sais ce que tu fais.",
    explanation: "Use ce que for the object.",
  },
  {
    wrong: "Je parle de ce que j'ai besoin.",
    correct: "Je parle de ce dont j'ai besoin.",
    explanation: "Use ce dont with de expressions.",
  },
  {
    wrong: "Je pense de ce que tu dis.",
    correct: "Je pense à ce que tu dis.",
    explanation: "Use à with penser.",
  },
];

// =============================================================================
// PRACTICE QUESTIONS (Section 10) - 18 total
// =============================================================================

/**
 * practiceQuestions - 18-question quiz for Lesson 13.
 *
 * Topics covered:
 * - ce qui / ce que (1-5): Choosing between subject and object forms
 * - ce dont / ce à quoi (6-10): Using correct preposition forms
 * - lequel forms (11-14): Gender/number agreement with à and de
 * - mixed (15-18): Choosing the correct advanced relative pronoun
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
    topic: "ce qui / ce que",
    prompt: "Choose the correct sentence.",
    options: [
      "Je comprends ce qui se passe.",
      "Je comprends ce que se passe.",
      "Je comprends ce dont se passe.",
    ],
    correct: 0,
    explanation: "Ce qui is used as the subject.",
  },
  {
    id: 2,
    topic: "ce qui / ce que",
    prompt: "Choose the correct sentence.",
    options: [
      "Je sais ce qui tu fais.",
      "Je sais ce que tu fais.",
      "Je sais ce dont tu fais.",
    ],
    correct: 1,
    explanation: "Ce que is used as the object.",
  },
  {
    id: 3,
    topic: "ce qui / ce que",
    prompt: "Which sentence means \"Tell me what you want\"?",
    options: [
      "Dis-moi ce qui tu veux.",
      "Dis-moi ce que tu veux.",
      "Dis-moi ce dont tu veux.",
    ],
    correct: 1,
    explanation: "Ce que is used as the object of veux.",
  },
  {
    id: 4,
    topic: "ce qui / ce que",
    prompt: "What does ce qui usually replace?",
    options: [
      "the object of the verb",
      "the subject of the verb",
      "a place",
    ],
    correct: 1,
    explanation: "Ce qui replaces the subject.",
  },
  {
    id: 5,
    topic: "ce qui / ce que",
    prompt: "What does ce que usually replace?",
    options: [
      "the object of the verb",
      "the subject of the verb",
      "a time expression",
    ],
    correct: 0,
    explanation: "Ce que replaces the object.",
  },
  {
    id: 6,
    topic: "ce dont / ce à quoi",
    prompt: "Choose the correct sentence with de.",
    options: [
      "Je parle de ce qui tu parles.",
      "Je parle de ce que tu parles.",
      "Je parle de ce dont tu parles.",
    ],
    correct: 2,
    explanation: "Use ce dont with verbs that take de.",
  },
  {
    id: 7,
    topic: "ce dont / ce à quoi",
    prompt: "Which sentence means \"That's what I need\"?",
    options: [
      "C'est ce que j'ai besoin.",
      "C'est ce dont j'ai besoin.",
      "C'est ce à quoi j'ai besoin.",
    ],
    correct: 1,
    explanation: "Avoir besoin de → use ce dont.",
  },
  {
    id: 8,
    topic: "ce dont / ce à quoi",
    prompt: "Choose the correct sentence with à.",
    options: [
      "Je pense à ce qui tu penses.",
      "Je pense à ce que tu penses.",
      "Je pense à ce à quoi tu penses.",
    ],
    correct: 2,
    explanation: "Use ce à quoi with verbs that take à.",
  },
  {
    id: 9,
    topic: "ce dont / ce à quoi",
    prompt: "Which form is used with the preposition de?",
    options: ["ce que", "ce qui", "ce dont"],
    correct: 2,
    explanation: "Ce dont is used with de.",
  },
  {
    id: 10,
    topic: "ce dont / ce à quoi",
    prompt: "Which form is used with the preposition à?",
    options: ["ce à quoi", "ce que", "ce qui"],
    correct: 0,
    explanation: "Ce à quoi is used with à.",
  },
  {
    id: 11,
    topic: "lequel forms",
    prompt: "Which is the masculine singular form with à?",
    options: ["auquel", "duquel", "lequel"],
    correct: 0,
    explanation: "Auquel = à + lequel (masculine singular).",
  },
  {
    id: 12,
    topic: "lequel forms",
    prompt: "Which is the feminine singular form with à?",
    options: ["à laquelle", "duquel", "auxquelles"],
    correct: 0,
    explanation: "À laquelle is used with à (feminine singular).",
  },
  {
    id: 13,
    topic: "lequel forms",
    prompt: "Which form is used with de (masculine singular)?",
    options: ["auquel", "duquel", "desquels"],
    correct: 1,
    explanation: "Duquel = de + lequel.",
  },
  {
    id: 14,
    topic: "lequel forms",
    prompt: "Choose the correct sentence.",
    options: [
      "Le sujet auquel je réfléchis.",
      "Le sujet duquel je réfléchis.",
      "Le sujet ce qui je réfléchis.",
    ],
    correct: 0,
    explanation: "Réfléchir à → use auquel (à + lequel).",
  },
  {
    id: 15,
    topic: "mixed",
    prompt: "Choose the correct sentence.",
    options: [
      "Ce qui est important, c'est la pratique.",
      "Ce que est important, c'est la pratique.",
      "Ce dont est important, c'est la pratique.",
    ],
    correct: 0,
    explanation: "Ce qui is used as the subject (est important).",
  },
  {
    id: 16,
    topic: "mixed",
    prompt: "Choose the correct sentence.",
    options: [
      "Je fais ce qui je peux.",
      "Je fais ce que je peux.",
      "Je fais ce dont je peux.",
    ],
    correct: 1,
    explanation: "Ce que is used as the object of fais.",
  },
  {
    id: 17,
    topic: "mixed",
    prompt: "Choose the correct sentence.",
    options: [
      "Je comprends ce que se passe.",
      "Je comprends ce qui se passe.",
      "Je comprends ce dont se passe.",
    ],
    correct: 1,
    explanation: "Ce qui is used as the subject of se passe.",
  },
  {
    id: 18,
    topic: "mixed",
    prompt: "Choose the correct sentence.",
    options: [
      "C'est ce que j'ai besoin.",
      "C'est ce dont j'ai besoin.",
      "C'est ce à quoi j'ai besoin.",
    ],
    correct: 1,
    explanation: "Avoir besoin de → use ce dont.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/18: "Good effort" - suggests focus on à vs de and subject vs object
 * - 8-13/18: "Nice progress" - encourages continued learning
 * - 14-18/18: "Great job" - celebrates mastery
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (18)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) {
    return {
      title: "Good effort",
      message:
        "These patterns take time. Focus on à vs de and subject vs object. You can retake the practice or continue the lesson.",
      emoji: "📚",
      color: "blue",
    };
  } else if (score <= 13) {
    return {
      title: "Nice progress",
      message:
        "You're starting to see the patterns. Review the difference between subject and object forms once more if you want to feel more confident.",
      emoji: "🌟",
      color: "yellow",
    };
  } else {
    return {
      title: "Great job",
      message:
        "You're handling advanced relative pronouns well. These structures will make your French more precise and natural.",
      emoji: "🎉",
      color: "green",
    };
  }
}
