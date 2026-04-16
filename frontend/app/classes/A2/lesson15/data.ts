/**
 * A2 Lesson 15 - Communicating in Longer Sentences
 * ===================================================
 *
 * This file contains all lesson data for A2 Lesson 15, the final A2 lesson,
 * focusing on combining skills to create more complex French sentences.
 *
 * **Lesson Content:**
 * - Storytelling with connected events (passé composé + imparfait)
 * - Expressing opinions (je pense que, à mon avis)
 * - Making comparisons (plus...que, moins...que, aussi...que)
 * - Sentence connectors (et, mais, parce que, ensuite, donc, puis)
 * - Building complex sentences with multiple clauses
 * - Common mistakes to avoid in longer sentences
 * - 15 practice quiz questions
 *
 * **Key Concepts:**
 * - Combine tenses for richer storytelling
 * - Use connectors to link ideas smoothly
 * - Express personal opinions and preferences
 * - Build on all A2 skills learned throughout the level
 *
 * **Data Categories:**
 * 1. storytellingExamples
 * 2. opinionExpressions
 * 3. comparisonExamples
 * 4. connectors
 * 5. commonMistakes
 * 6. practiceQuestions
 * 7. sectionIds / SectionId
 * 8. getPerformanceMessage
 */

// =============================================================================
// SECTION IDENTIFIERS
// =============================================================================

/**
 * sectionIds - Array of all lesson section identifiers.
 */
export const sectionIds = ["intro", "why-matters", "storytelling", "opinions", "comparisons", "connectors", "guided-examples", "patterns", "mistakes", "practice", "completion"];

// =============================================================================
// STORYTELLING EXAMPLES
// =============================================================================

/**
 * storytellingExamples - Examples of connected sentences for storytelling.
 *
 * Shows how to link multiple past events using the passé composé
 * and imparfait together with connectors like et, ensuite.
 */
export const storytellingExamples = [
  { french: "Hier, je suis allé au marché. J'ai acheté des fruits et j'ai parlé avec un ami. C'était agréable.", english: "Yesterday, I went to the market. I bought fruit and talked with a friend. It was nice." },
  { french: "Le week-end dernier, nous avons visité un musée. Ensuite, nous avons mangé au restaurant.", english: "Last weekend, we visited a museum. Then, we ate at a restaurant." },
];

// =============================================================================
// OPINION EXPRESSIONS
// =============================================================================

/**
 * opinionExpressions - Common phrases for expressing opinions in French.
 *
 * Patterns:
 * - Je pense que... (I think that...)
 * - À mon avis... (In my opinion...)
 * - Je trouve... (I find...)
 * - Je préfère... parce que... (I prefer... because...)
 */
export const opinionExpressions = [
  { french: "Je pense que ce film est intéressant.", english: "I think this film is interesting." },
  { french: "À mon avis, cette ville est trop bruyante.", english: "In my opinion, this city is too noisy." },
  { french: "Je trouve ce livre très utile.", english: "I find this book very useful." },
  { french: "Je préfère étudier le matin parce que je suis plus concentré.", english: "I prefer to study in the morning because I am more focused." },
];

// =============================================================================
// COMPARISON EXAMPLES
// =============================================================================

/**
 * comparisonExamples - Examples of comparative sentences in French.
 *
 * Shows the three main comparison patterns:
 * - plus...que (more...than)
 * - moins...que (less...than)
 * - aussi...que (as...as)
 */
export const comparisonExamples = [
  { french: "Paris est plus grand que Lyon.", english: "Paris is bigger than Lyon." },
  { french: "Ce livre est moins intéressant que l'autre.", english: "This book is less interesting than the other one." },
  { french: "Mon frère est aussi sportif que moi.", english: "My brother is as sporty as me." },
];

// =============================================================================
// CONNECTORS
// =============================================================================

/**
 * connectors - Common French connectors for linking ideas.
 *
 * These small words help join sentences and show relationships
 * between ideas (addition, contrast, cause, sequence).
 */
export const connectors = [
  { word: "et", english: "and" },
  { word: "mais", english: "but" },
  { word: "parce que", english: "because" },
  { word: "ensuite", english: "then / next" },
  { word: "donc", english: "so / therefore" },
  { word: "puis", english: "then" },
];

/**
 * connectorExamples - Examples showing connectors in context.
 *
 * Demonstrates how et, mais, donc, and parce que connect
 * ideas in longer sentences.
 */
export const connectorExamples = [
  { french: "Je suis allé au café et j'ai rencontré un ami.", english: "I went to the café and met a friend." },
  { french: "Il voulait sortir, mais il était fatigué.", english: "He wanted to go out, but he was tired." },
  { french: "J'ai étudié, donc j'ai réussi.", english: "I studied, so I succeeded." },
];

// =============================================================================
// GUIDED EXAMPLES
// =============================================================================

/**
 * guidedExamples - Complete example sentences combining multiple A2 skills.
 *
 * These examples show how to combine:
 * - Storytelling with opinions
 * - Comparisons with reasons
 * - Multiple connectors in one narrative
 */
export const guidedExamples = [
  { french: "Hier, j'ai étudié le français et j'ai regardé un film. Je pense que c'était une bonne journée.", english: "Yesterday, I studied French and watched a film. I think it was a good day." },
  { french: "Je préfère le café parce qu'il est plus fort que le thé.", english: "I prefer coffee because it is stronger than tea." },
  { french: "Nous avons visité un musée, puis nous avons mangé au restaurant. C'était très intéressant.", english: "We visited a museum, then we ate at a restaurant. It was very interesting." },
  { french: "À mon avis, cette ville est plus agréable que l'autre parce qu'elle est moins bruyante.", english: "In my opinion, this city is more pleasant than the other because it is less noisy." },
];

// =============================================================================
// COMMUNICATION PATTERNS
// =============================================================================

/**
 * communicationPatterns - Common patterns for building longer sentences.
 *
 * Three key patterns:
 * 1. Story pattern: Time + action + detail + feeling
 * 2. Opinion pattern: Opinion + reason (with parce que)
 * 3. Comparison pattern: Thing A + comparison + thing B
 */
export const communicationPatterns = [
  { title: "Story pattern", structure: "Time + action + detail + feeling", example: "Hier, je suis allé au cinéma. J'ai vu un film intéressant. J'ai beaucoup aimé." },
  { title: "Opinion pattern", structure: "Opinion + reason", example: "Je pense que ce livre est bon parce qu'il est facile à comprendre." },
  { title: "Comparison pattern", structure: "Thing A + comparison + thing B", example: "Ce restaurant est meilleur que l'autre." },
];

// =============================================================================
// COMMON MISTAKES
// =============================================================================

/**
 * commonMistakes - Examples of errors learners often make in longer sentences.
 *
 * Common errors:
 * - Missing que after Je pense
 * - Missing que in comparisons
 * - Missing connectors between clauses
 * - Incorrect use of parce que
 *
 * Each mistake shows wrong form, correct form, and explanation.
 */
export const commonMistakes = [
  { wrong: "Je pense ce film est intéressant.", correct: "Je pense que ce film est intéressant.", explanation: "Use que after Je pense." },
  { wrong: "Paris est plus grand Lyon.", correct: "Paris est plus grand que Lyon.", explanation: "Use que in comparisons." },
  { wrong: "Hier je suis allé au marché je acheté des fruits.", correct: "Hier, je suis allé au marché et j'ai acheté des fruits.", explanation: "Use connectors to link ideas." },
  { wrong: "Je préfère café parce je aime.", correct: "Je préfère le café parce que je l'aime.", explanation: "Use parce que correctly." },
];

// =============================================================================
// PRACTICE QUESTIONS - 15 total
// =============================================================================

/**
 * practiceQuestions - 15-question quiz for Lesson 15 (final A2 lesson).
 *
 * Topics covered:
 * - opinion (1-4): Expressing opinions correctly
 * - comparison (5-7): Using comparative structures
 * - storytelling (8-9): Linking events with connectors
 * - connectors (10-12): Choosing the right connector
 * - patterns (13-14): Following communication patterns
 * - mixed (15): Combining multiple skills
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
  { id: 1, topic: "opinion", prompt: "Choose the correct sentence.", options: ["Je pense que ce film est intéressant.", "Je pense ce film est intéressant.", "Je pense film est intéressant."], correct: 0, explanation: "Use que after Je pense." },
  { id: 2, topic: "opinion", prompt: "Which phrase means 'In my opinion'?", options: ["À mon avis", "Je pense", "Je trouve"], correct: 0, explanation: "À mon avis means 'in my opinion'." },
  { id: 3, topic: "opinion", prompt: "Choose the correct sentence with a reason.", options: ["Je préfère le café je aime.", "Je préfère le café parce que je l'aime.", "Je préfère café parce je aime."], correct: 1, explanation: "Use parce que to give a reason." },
  { id: 4, topic: "opinion", prompt: "Choose the correct sentence.", options: ["Je trouve ce livre utile.", "Je trouve que ce livre utile.", "Je ce livre utile."], correct: 0, explanation: "Je trouve can be used directly with the object and adjective." },
  { id: 5, topic: "comparison", prompt: "Choose the correct comparison.", options: ["Paris est plus grand Lyon.", "Paris est plus grand que Lyon.", "Paris est que grand Lyon."], correct: 1, explanation: "Use plus...que for comparisons." },
  { id: 6, topic: "comparison", prompt: "Which sentence is correct?", options: ["Ce livre est moins intéressant l'autre.", "Ce livre est moins intéressant que l'autre.", "Ce livre est intéressant moins que l'autre."], correct: 1, explanation: "Use moins...que for 'less than'." },
  { id: 7, topic: "comparison", prompt: "Which sentence means 'My brother is as sporty as me'?", options: ["Mon frère est aussi sportif que moi.", "Mon frère est plus sportif que moi.", "Mon frère est moins sportif que moi."], correct: 0, explanation: "Aussi...que means 'as...as'." },
  { id: 8, topic: "storytelling", prompt: "Which connector best continues this story: 'Je suis allé au café...'?", options: ["mais", "et", "parce que"], correct: 1, explanation: "Et adds another action to the story." },
  { id: 9, topic: "storytelling", prompt: "Choose the best sequence for a story.", options: ["D'abord, ensuite, puis", "Parce que, donc, mais", "Que, qui, où"], correct: 0, explanation: "D'abord, ensuite, puis are story connectors." },
  { id: 10, topic: "connectors", prompt: "Which word means 'but'?", options: ["et", "mais", "donc"], correct: 1, explanation: "Mais means but." },
  { id: 11, topic: "connectors", prompt: "Which word means 'so / therefore'?", options: ["parce que", "ensuite", "donc"], correct: 2, explanation: "Donc means so or therefore." },
  { id: 12, topic: "connectors", prompt: "Choose the correct sentence with 'because'.", options: ["Je suis fatigué mais je travaille.", "Je travaille parce que je suis fatigué.", "Je suis fatigué parce que je travaille."], correct: 2, explanation: "Parce que explains the reason." },
  { id: 13, topic: "patterns", prompt: "What is the correct pattern for giving an opinion with a reason?", options: ["Opinion + parce que + reason", "Reason + opinion", "Comparison + opinion"], correct: 0, explanation: "Opinion + parce que + reason is the standard pattern." },
  { id: 14, topic: "patterns", prompt: "Which sentence follows the story pattern correctly?", options: ["Hier, je suis allé au parc. J'ai joué au football. C'était amusant.", "Je pense hier parc.", "Plus grand que Lyon."], correct: 0, explanation: "Time + action + detail + feeling is the story pattern." },
  { id: 15, topic: "mixed", prompt: "Choose the most complete and correct sentence.", options: ["À mon avis, ce restaurant est meilleur que l'autre parce que la nourriture est bonne.", "Ce restaurant meilleur.", "Je pense restaurant bon."], correct: 0, explanation: "This combines opinion, comparison, and reason." },
];

// =============================================================================
// PERFORMANCE FEEDBACK
// =============================================================================

/**
 * getPerformanceMessage - Returns personalized feedback based on quiz score.
 *
 * Score ranges:
 * - 0-6/15: "Good effort" - suggests focus on connectors and patterns
 * - 7-11/15: "Nice progress" - encourages continued learning
 * - 12-15/15: "Great job" - celebrates readiness for B1
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions (15)
 * @returns Object with title, message, emoji, and color
 */
export function getPerformanceMessage(score: number, total: number) {
  if (score <= 6) {
    return { title: "Good effort", message: "Building longer sentences takes practice. Focus on using connectors and simple patterns. You can retake the practice or continue the lesson.", emoji: "📚", color: "blue" };
  } else if (score <= 11) {
    return { title: "Nice progress", message: "You're starting to connect ideas more naturally. Review the connectors and patterns once more if you want to feel more confident.", emoji: "🌟", color: "yellow" };
  } else {
    return { title: "Great job", message: "You can now express ideas in longer sentences with confidence. This is an important step toward B1 communication.", emoji: "🎉", color: "green" };
  }
}
