/**
 * A2 Lesson 8 - More Advanced Prepositions
 * ==========================================
 *
 * This file contains all lesson data for A2 Lesson 8, focusing on
 * advanced French prepositions for time, movement, purpose, and cause.
 *
 * **Lesson Content:**
 * - Time prepositions: depuis, pendant, pour
 * - Limit/endpoint prepositions: jusqu'à, vers, envers
 * - Movement/place prepositions: chez, entre, parmi, à travers, au fond de
 * - Purpose/reason prepositions: pour, afin de, grâce à, à cause de
 * - Advanced expressions: loin de, près de, autour de, etc.
 * - Confusing pairs: depuis vs pendant, grâce à vs à cause de, etc.
 * - 18 practice quiz questions
 *
 * **Key Concepts:**
 * - Depuis = since/for (ongoing action)
 * - Pendant = for/during (completed duration)
 * - Pour = for (intended duration)
 * - Jusqu'à = until/up to (endpoint)
 * - Grâce à = thanks to (positive)
 * - À cause de = because of (negative)
 *
 * **Data Categories:**
 * 1. sectionIds - Lesson section identifiers
 * 2. timePrepositions - depuis, pendant, pour
 * 3. timeComparisonExamples - Side-by-side comparisons
 * 4. limitPrepositions - jusqu'à, vers, envers
 * 5. movementAndPlacePrepositions - chez, entre, parmi, etc.
 * 6. purposeAndReasonPrepositions - pour, afin de, grâce à, à cause de
 * 7. advancedPrepositionExpressions - Compound expressions
 * 8. confusingPairs - Often confused preposition pairs
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
 * 1. intro - Introduction to advanced prepositions
 * 2. why-harder - Why these prepositions are challenging
 * 3. time-prepositions - Depuis, pendant, pour
 * 4. limit-prepositions - Jusqu'à, vers, envers
 * 5. movement-place - Chez, entre, parmi, etc.
 * 6. purpose-reason - Pour, afin de, grâce à, à cause de
 * 7. advanced-expressions - Compound preposition expressions
 * 8. confusing-pairs - Comparison of similar prepositions
 * 9. guided-examples - Example sentences
 * 10. mistakes - Common errors
 * 11. practice - Interactive quiz
 * 12. completion - Lesson completion
 */
export const sectionIds = [
  "intro",
  "why-harder",
  "time-prepositions",
  "limit-prepositions",
  "movement-place",
  "purpose-reason",
  "advanced-expressions",
  "confusing-pairs",
  "guided-examples",
  "mistakes",
  "practice",
  "completion",
];

// =============================================================================
// TIME PREPOSITIONS (Section 2)
// =============================================================================

/**
 * timePrepositions - depuis, pendant, pour
 *
 * These three prepositions all translate to "for" in English but have
 * distinct meanings in French:
 * - depuis: since/for (action started in past, continues now)
 * - pendant: for/during (completed or bounded duration)
 * - pour: for (intended or planned duration)
 *
 * Each entry includes preposition name, core meaning, usage description,
 * examples, and teaching note.
 */
export const timePrepositions = [
  {
    preposition: "depuis",
    coreMeaning: "since / for",
    use: "used for an action that started in the past and is still continuing now",
    examples: [
      {
        french: "J'habite ici depuis deux ans.",
        english: "I have been living here for two years.",
      },
      {
        french: "Elle etudie le francais depuis janvier.",
        english: "She has been studying French since January.",
      },
    ],
    note: "Depuis connects the past to the present.",
  },
  {
    preposition: "pendant",
    coreMeaning: "for / during",
    use: "used for a completed duration or a limited period of time",
    examples: [
      {
        french: "J'ai travaille pendant trois heures.",
        english: "I worked for three hours.",
      },
      {
        french: "Nous avons parle pendant le diner.",
        english: "We talked during dinner.",
      },
    ],
    note: "Pendant usually describes a duration seen as complete or bounded.",
  },
  {
    preposition: "pour",
    coreMeaning: "for",
    use: "used for intended duration, purpose, or expected time",
    examples: [
      {
        french: "Je pars pour deux semaines.",
        english: "I'm leaving for two weeks.",
      },
      {
        french: "Il est parti pour acheter du pain.",
        english: "He left to buy bread.",
      },
    ],
    note: "Pour often expresses intention, expected duration, or purpose.",
  },
];

// =============================================================================
// TIME COMPARISON EXAMPLES
// =============================================================================

/**
 * timeComparisonExamples - Side-by-side comparison of depuis, pendant, pour.
 *
 * Shows the same duration (two years) expressed with each preposition
 * to highlight the subtle differences in meaning.
 */
export const timeComparisonExamples = [
  {
    french: "J'etudie ici depuis deux ans.",
    english: "I have been studying here for two years.",
    explanation: "depuis: started in the past and still continues",
  },
  {
    french: "J'ai etudie ici pendant deux ans.",
    english: "I studied here for two years.",
    explanation: "pendant: completed duration",
  },
  {
    french: "Je vais a Paris pour deux ans.",
    english: "I'm going to Paris for two years.",
    explanation: "pour: intended/planned duration",
  },
];

// =============================================================================
// LIMIT / ENDPOINT PREPOSITIONS (Section 3)
// =============================================================================

/**
 * limitPrepositions - jusqu'à, vers, envers
 *
 * - jusqu'à: until, up to, as far as (endpoint in time or place)
 * - vers: toward, around (direction or approximate time)
 * - envers: toward/with regard to (attitude/behavior, not physical direction)
 */
export const limitPrepositions = [
  {
    preposition: "jusqu'a",
    coreMeaning: "until / up to / as far as",
    use: "used to express an endpoint in time or place",
    examples: [
      {
        french: "Je travaille jusqu'a 18h.",
        english: "I work until 6 p.m.",
      },
      {
        french: "Nous marchons jusqu'a la gare.",
        english: "We are walking as far as the station.",
      },
    ],
    note: "Jusqu'a marks the limit or final point.",
  },
  {
    preposition: "vers",
    coreMeaning: "toward / around",
    use: "used for direction or approximate time",
    examples: [
      {
        french: "Nous allons vers le centre-ville.",
        english: "We are going toward the city center.",
      },
      {
        french: "Je viendrai vers 20h.",
        english: "I will come around 8 p.m.",
      },
    ],
    note: "Vers can mean direction or approximation.",
  },
  {
    preposition: "envers",
    coreMeaning: "toward / with regard to",
    use: "used mostly for attitude or behavior toward a person or group",
    examples: [
      {
        french: "Il est toujours poli envers ses collegues.",
        english: "He is always polite toward his colleagues.",
      },
    ],
    note: "Envers is not the same as vers. It is more relational or emotional.",
  },
];

// =============================================================================
// MOVEMENT / PLACE PREPOSITIONS (Section 4)
// =============================================================================

/**
 * movementAndPlacePrepositions - chez, entre, parmi, à travers, au fond de
 *
 * - chez: at/to the home of (people, professionals)
 * - entre: between (two or more items)
 * - parmi: among (inside a group)
 * - à travers: through/across (movement)
 * - au fond de: at the back/bottom of (location)
 */
export const movementAndPlacePrepositions = [
  {
    preposition: "chez",
    coreMeaning: "at the home/place of / to the home/place of",
    use: "used with people, professionals, homes, or businesses identified through people",
    examples: [
      {
        french: "Je vais chez le medecin.",
        english: "I am going to the doctor's.",
      },
      {
        french: "Nous dinons chez Marie.",
        english: "We are having dinner at Marie's place.",
      },
    ],
  },
  {
    preposition: "entre",
    coreMeaning: "between",
    use: "used between two or more things, places, or times",
    examples: [
      {
        french: "La banque est entre le cafe et la poste.",
        english: "The bank is between the cafe and the post office.",
      },
      {
        french: "Je suis libre entre 14h et 16h.",
        english: "I am free between 2 p.m. and 4 p.m.",
      },
    ],
  },
  {
    preposition: "parmi",
    coreMeaning: "among",
    use: "used inside a group",
    examples: [
      {
        french: "Elle est la plus jeune parmi nous.",
        english: "She is the youngest among us.",
      },
    ],
  },
  {
    preposition: "a travers",
    coreMeaning: "through / across",
    use: "used for movement through something or across an area",
    examples: [
      {
        french: "Nous marchons a travers le parc.",
        english: "We are walking through the park.",
      },
    ],
  },
  {
    preposition: "au fond de",
    coreMeaning: "at the back / bottom of",
    use: "used for location deep inside or at the far end",
    examples: [
      {
        french: "Les cles sont au fond du sac.",
        english: "The keys are at the bottom of the bag.",
      },
    ],
  },
];

// =============================================================================
// PURPOSE / REASON PREPOSITIONS (Section 5)
// =============================================================================

/**
 * purposeAndReasonPrepositions - pour, afin de, grâce à, à cause de
 *
 * - pour: for, in order to (purpose, goal, recipient)
 * - afin de: in order to (more formal)
 * - grâce à: thanks to (positive cause)
 * - à cause de: because of (often negative cause)
 */
export const purposeAndReasonPrepositions = [
  {
    preposition: "pour",
    coreMeaning: "for / in order to",
    use: "used for purpose, goal, target, recipient, or intended duration",
    examples: [
      {
        french: "Ce cadeau est pour toi.",
        english: "This gift is for you.",
      },
      {
        french: "Je travaille pour gagner de l'argent.",
        english: "I work to earn money.",
      },
    ],
  },
  {
    preposition: "afin de",
    coreMeaning: "in order to",
    use: "more formal expression of purpose",
    examples: [
      {
        french: "Il etudie afin de reussir l'examen.",
        english: "He studies in order to pass the exam.",
      },
    ],
    note: "This is more formal than pour.",
  },
  {
    preposition: "grace a",
    coreMeaning: "thanks to",
    use: "used for a positive cause or helpful reason",
    examples: [
      {
        french: "J'ai reussi grace a ton aide.",
        english: "I succeeded thanks to your help.",
      },
    ],
  },
  {
    preposition: "a cause de",
    coreMeaning: "because of",
    use: "used for a cause, often negative",
    examples: [
      {
        french: "Nous sommes arrives en retard a cause du trafic.",
        english: "We arrived late because of the traffic.",
      },
    ],
  },
];

// =============================================================================
// ADVANCED PREPOSITION EXPRESSIONS (Section 6)
// =============================================================================

/**
 * advancedPrepositionExpressions - Compound expressions with prepositions.
 *
 * Common two-word expressions:
 * - loin de: far from
 * - près de: near/close to
 * - autour de: around
 * - au lieu de: instead of
 * - en face de: opposite/facing
 * - auprès de: with/near (formal)
 */
export const advancedPrepositionExpressions = [
  {
    expression: "loin de",
    meaning: "far from",
    example: "J'habite loin de l'ecole.",
    english: "I live far from the school.",
  },
  {
    expression: "pres de",
    meaning: "near / close to",
    example: "Nous sommes pres de la gare.",
    english: "We are near the station.",
  },
  {
    expression: "autour de",
    meaning: "around",
    example: "Il y a beaucoup de monde autour de la place.",
    english: "There are many people around the square.",
  },
  {
    expression: "au lieu de",
    meaning: "instead of",
    example: "Je prends le bus au lieu du train.",
    english: "I take the bus instead of the train.",
  },
  {
    expression: "en face de",
    meaning: "opposite / facing",
    example: "La pharmacie est en face de la banque.",
    english: "The pharmacy is opposite the bank.",
  },
  {
    expression: "aupres de",
    meaning: "with / close to / from (institution/person in formal contexts)",
    example: "Elle travaille aupres des enfants.",
    english: "She works with children.",
  },
];

// =============================================================================
// CONFUSING PAIRS (Section 7)
// =============================================================================

/**
 * confusingPairs - Side-by-side comparison of often-confused prepositions.
 *
 * Pairs covered:
 * - depuis vs pendant (ongoing vs completed)
 * - pour vs pendant (intended vs actual)
 * - vers vs jusqu'à (direction/approx vs endpoint)
 * - grâce à vs à cause de (positive vs negative)
 */
export const confusingPairs = [
  {
    pair: "depuis vs pendant",
    explanation: "Depuis is for something that started in the past and continues now. Pendant is for a completed or bounded duration.",
    examples: [
      {
        french: "J'habite ici depuis trois ans.",
        english: "I have been living here for three years.",
      },
      {
        french: "J'ai habite la pendant trois ans.",
        english: "I lived there for three years.",
      },
    ],
  },
  {
    pair: "pour vs pendant",
    explanation: "Pour often shows intended duration. Pendant shows actual duration.",
    examples: [
      {
        french: "Je pars pour deux jours.",
        english: "I'm leaving for two days.",
      },
      {
        french: "Je suis reste pendant deux jours.",
        english: "I stayed for two days.",
      },
    ],
  },
  {
    pair: "vers vs jusqu'a",
    explanation: "Vers suggests direction or approximation. Jusqu'a marks the endpoint.",
    examples: [
      {
        french: "Nous allons vers le centre.",
        english: "We are going toward the center.",
      },
      {
        french: "Nous marchons jusqu'au centre.",
        english: "We are walking as far as the center.",
      },
    ],
  },
  {
    pair: "grace a vs a cause de",
    explanation: "Grace a usually introduces a positive cause. A cause de often introduces a negative one.",
    examples: [
      {
        french: "J'ai reussi grace a toi.",
        english: "I succeeded thanks to you.",
      },
      {
        french: "J'ai echoue a cause du stress.",
        english: "I failed because of stress.",
      },
    ],
  },
];

// =============================================================================
// GUIDED EXAMPLES (Section 8)
// =============================================================================

/**
 * guidedExamples - Collection of example sentences for study.
 *
 * Various contexts showing advanced prepositions in everyday French.
 */
export const guidedExamples = [
  {
    french: "J'apprends le francais depuis six mois.",
    english: "I have been learning French for six months.",
  },
  {
    french: "Nous avons attendu pendant une heure.",
    english: "We waited for one hour.",
  },
  {
    french: "Je pars pour trois semaines.",
    english: "I'm leaving for three weeks.",
  },
  {
    french: "Le magasin est ouvert jusqu'a 20h.",
    english: "The shop is open until 8 p.m.",
  },
  {
    french: "Je vais chez le dentiste demain.",
    english: "I'm going to the dentist tomorrow.",
  },
  {
    french: "Elle est arrivee en retard a cause de la pluie.",
    english: "She arrived late because of the rain.",
  },
  {
    french: "Nous avons termine grace a ton aide.",
    english: "We finished thanks to your help.",
  },
  {
    french: "Il habite pres de la riviere mais loin de la ville.",
    english: "He lives near the river but far from the city.",
  },
];

// =============================================================================
// COMMON MISTAKES (Section 9)
// =============================================================================

/**
 * commonMistakes - Examples of errors learners often make.
 *
 * Each mistake shows:
 * - Wrong formulation with context
 * - Correct formulation
 * - Explanation of why the correct form works
 */
export const commonMistakes = [
  {
    wrong: "J'etudie ici pendant deux ans. (for an action still continuing now)",
    correct: "J'etudie ici depuis deux ans.",
    explanation: "For an action that started in the past and continues now, use depuis.",
  },
  {
    wrong: "Je pars pendant deux semaines.",
    correct: "Je pars pour deux semaines.",
    explanation: "For intended duration, use pour.",
  },
  {
    wrong: "Je travaille vers 18h. (meaning until 18h)",
    correct: "Je travaille jusqu'a 18h.",
    explanation: "Jusqu'a marks the endpoint. Vers means around or toward.",
  },
  {
    wrong: "J'ai reussi a cause de ton aide.",
    correct: "J'ai reussi grace a ton aide.",
    explanation: "Grace a is better for a positive cause.",
  },
  {
    wrong: "Je vais a le medecin.",
    correct: "Je vais chez le medecin.",
    explanation: "Use chez with people and professionals like doctors.",
  },
];

// =============================================================================
// PRACTICE QUESTIONS (Section 10) - 18 total
// =============================================================================

/**
 * practiceQuestions - 18-question quiz for Lesson 8.
 *
 * Topics covered:
 * - time (1-5): depuis, pendant, pour, jusqu'à
 * - movement (6-9): chez, entre, parmi, à travers
 * - purpose (10-13): pour, afin de, grâce à, à cause de
 * - comparison (14-16): confusing pairs
 * - correction (17-18): fixing mistakes
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
    topic: "time",
    prompt: "Choose the correct sentence for an action that started in the past and still continues now.",
    options: [
      "J'habite ici depuis deux ans.",
      "J'habite ici pendant deux ans.",
      "J'habite ici pour deux ans.",
    ],
    correct: 0,
    explanation: "Use depuis for an action that started in the past and still continues.",
  },
  {
    id: 2,
    topic: "time",
    prompt: "Choose the correct sentence for a completed duration.",
    options: [
      "J'ai travaille pendant trois heures.",
      "J'ai travaille depuis trois heures.",
      "J'ai travaille pour trois heures.",
    ],
    correct: 0,
    explanation: "Pendant is used for a completed or bounded duration.",
  },
  {
    id: 3,
    topic: "time",
    prompt: "Which sentence means \"I'm leaving for two weeks\"?",
    options: [
      "Je pars depuis deux semaines.",
      "Je pars pendant deux semaines.",
      "Je pars pour deux semaines.",
    ],
    correct: 2,
    explanation: "Pour is used for intended duration.",
  },
  {
    id: 4,
    topic: "time",
    prompt: "Choose the correct sentence.",
    options: [
      "Elle etudie le francais depuis janvier.",
      "Elle etudie le francais pendant janvier.",
      "Elle etudie le francais pour janvier.",
    ],
    correct: 0,
    explanation: "Depuis connects a starting point in the past to the present.",
  },
  {
    id: 5,
    topic: "time",
    prompt: "Which sentence means \"The shop is open until 8 p.m.\"?",
    options: [
      "Le magasin est ouvert vers 20h.",
      "Le magasin est ouvert jusqu'a 20h.",
      "Le magasin est ouvert pour 20h.",
    ],
    correct: 1,
    explanation: "Jusqu'a marks the endpoint.",
  },
  {
    id: 6,
    topic: "movement",
    prompt: "Choose the correct sentence.",
    options: [
      "Je vais chez le medecin.",
      "Je vais a le medecin.",
      "Je vais de le medecin.",
    ],
    correct: 0,
    explanation: "Use chez with people and professionals.",
  },
  {
    id: 7,
    topic: "movement",
    prompt: "Which sentence means \"The bank is between the cafe and the post office\"?",
    options: [
      "La banque est parmi le cafe et la poste.",
      "La banque est entre le cafe et la poste.",
      "La banque est vers le cafe et la poste.",
    ],
    correct: 1,
    explanation: "Entre means between.",
  },
  {
    id: 8,
    topic: "movement",
    prompt: "Choose the correct sentence for movement through a place.",
    options: [
      "Nous marchons a travers le parc.",
      "Nous marchons chez le parc.",
      "Nous marchons jusqu'a le parc.",
    ],
    correct: 0,
    explanation: "A travers means through or across.",
  },
  {
    id: 9,
    topic: "movement",
    prompt: "Which sentence means \"She is the youngest among us\"?",
    options: [
      "Elle est la plus jeune parmi nous.",
      "Elle est la plus jeune entre nous.",
      "Elle est la plus jeune vers nous.",
    ],
    correct: 0,
    explanation: "Parmi means among.",
  },
  {
    id: 10,
    topic: "purpose",
    prompt: "Which sentence shows purpose?",
    options: [
      "Je travaille pour gagner de l'argent.",
      "Je travaille depuis gagner de l'argent.",
      "Je travaille jusqu'a gagner de l'argent.",
    ],
    correct: 0,
    explanation: "Pour can express purpose.",
  },
  {
    id: 11,
    topic: "purpose",
    prompt: "Choose the sentence with a positive cause.",
    options: [
      "J'ai reussi grace a ton aide.",
      "J'ai reussi a cause de ton aide.",
      "J'ai reussi jusqu'a ton aide.",
    ],
    correct: 0,
    explanation: "Grace a is typically used for a positive cause.",
  },
  {
    id: 12,
    topic: "purpose",
    prompt: "Choose the sentence with a negative cause.",
    options: [
      "Nous sommes en retard grace au trafic.",
      "Nous sommes en retard a cause du trafic.",
      "Nous sommes en retard pour le trafic.",
    ],
    correct: 1,
    explanation: "A cause de often introduces a negative cause.",
  },
  {
    id: 13,
    topic: "purpose",
    prompt: "Which expression is more formal for \"in order to\"?",
    options: ["afin de", "pres de", "au lieu de"],
    correct: 0,
    explanation: "Afin de is a more formal way to express purpose.",
  },
  {
    id: 14,
    topic: "comparison",
    prompt: "Choose the best sentence for an action that still continues now.",
    options: [
      "J'habite ici depuis trois ans.",
      "J'ai habite ici pendant trois ans.",
      "Je pars ici pour trois ans.",
    ],
    correct: 0,
    explanation: "Depuis shows an action that began in the past and still continues.",
  },
  {
    id: 15,
    topic: "comparison",
    prompt: "What is the difference between vers and jusqu'a here?",
    options: [
      "Vers marks an endpoint and jusqu'a shows approximation.",
      "Vers shows direction or approximation, while jusqu'a marks the endpoint.",
      "They always mean exactly the same thing.",
    ],
    correct: 1,
    explanation: "Vers suggests direction or approximation. Jusqu'a marks the endpoint.",
  },
  {
    id: 16,
    topic: "comparison",
    prompt: "Which pair is correctly matched?",
    options: [
      "grace a = usually positive cause; a cause de = often negative cause",
      "grace a = endpoint; a cause de = purpose",
      "grace a = among; a cause de = between",
    ],
    correct: 0,
    explanation: "This is the correct contrast.",
  },
  {
    id: 17,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "Je pars pendant deux semaines.",
      "Je pars pour deux semaines.",
      "Je pars depuis deux semaines.",
    ],
    correct: 1,
    explanation: "Use pour for intended duration.",
  },
  {
    id: 18,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: [
      "J'ai reussi a cause de ton aide.",
      "J'ai reussi grace a ton aide.",
      "J'ai reussi vers ton aide.",
    ],
    correct: 1,
    explanation: "Use grace a for a positive cause.",
  },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-7/18: "Good effort" - suggests review of depuis, pendant, pour, jusqu'à
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
        "These prepositions take time because French often uses different patterns from English. You can retake the practice or continue the lesson. A quick review of depuis, pendant, pour, and jusqu'a will help a lot.",
      emoji: "📚",
      color: "blue",
    };
  } else if (score <= 13) {
    return {
      title: "Nice progress",
      message:
        "You're starting to understand these more advanced prepositions. Review the confusing pairs once more if you want to feel more confident.",
      emoji: "🌟",
      color: "yellow",
    };
  } else {
    return {
      title: "Great job",
      message:
        "You're using advanced prepositions well. This will help you express time, cause, movement, and purpose much more naturally in French.",
      emoji: "🎉",
      color: "green",
    };
  }
}
