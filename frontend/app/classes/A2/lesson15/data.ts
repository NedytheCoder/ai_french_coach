// A2 Lesson 15 — Communicating in Longer Sentences
export const sectionIds = ["intro", "why-matters", "storytelling", "opinions", "comparisons", "connectors", "guided-examples", "patterns", "mistakes", "practice", "completion"];

export const storytellingExamples = [
  { french: "Hier, je suis allé au marché. J'ai acheté des fruits et j'ai parlé avec un ami. C'était agréable.", english: "Yesterday, I went to the market. I bought fruit and talked with a friend. It was nice." },
  { french: "Le week-end dernier, nous avons visité un musée. Ensuite, nous avons mangé au restaurant.", english: "Last weekend, we visited a museum. Then, we ate at a restaurant." },
];

export const opinionExpressions = [
  { french: "Je pense que ce film est intéressant.", english: "I think this film is interesting." },
  { french: "À mon avis, cette ville est trop bruyante.", english: "In my opinion, this city is too noisy." },
  { french: "Je trouve ce livre très utile.", english: "I find this book very useful." },
  { french: "Je préfère étudier le matin parce que je suis plus concentré.", english: "I prefer to study in the morning because I am more focused." },
];

export const comparisonExamples = [
  { french: "Paris est plus grand que Lyon.", english: "Paris is bigger than Lyon." },
  { french: "Ce livre est moins intéressant que l'autre.", english: "This book is less interesting than the other one." },
  { french: "Mon frère est aussi sportif que moi.", english: "My brother is as sporty as me." },
];

export const connectors = [
  { word: "et", english: "and" },
  { word: "mais", english: "but" },
  { word: "parce que", english: "because" },
  { word: "ensuite", english: "then / next" },
  { word: "donc", english: "so / therefore" },
  { word: "puis", english: "then" },
];

export const connectorExamples = [
  { french: "Je suis allé au café et j'ai rencontré un ami.", english: "I went to the café and met a friend." },
  { french: "Il voulait sortir, mais il était fatigué.", english: "He wanted to go out, but he was tired." },
  { french: "J'ai étudié, donc j'ai réussi.", english: "I studied, so I succeeded." },
];

export const guidedExamples = [
  { french: "Hier, j'ai étudié le français et j'ai regardé un film. Je pense que c'était une bonne journée.", english: "Yesterday, I studied French and watched a film. I think it was a good day." },
  { french: "Je préfère le café parce qu'il est plus fort que le thé.", english: "I prefer coffee because it is stronger than tea." },
  { french: "Nous avons visité un musée, puis nous avons mangé au restaurant. C'était très intéressant.", english: "We visited a museum, then we ate at a restaurant. It was very interesting." },
  { french: "À mon avis, cette ville est plus agréable que l'autre parce qu'elle est moins bruyante.", english: "In my opinion, this city is more pleasant than the other because it is less noisy." },
];

export const communicationPatterns = [
  { title: "Story pattern", structure: "Time + action + detail + feeling", example: "Hier, je suis allé au cinéma. J'ai vu un film intéressant. J'ai beaucoup aimé." },
  { title: "Opinion pattern", structure: "Opinion + reason", example: "Je pense que ce livre est bon parce qu'il est facile à comprendre." },
  { title: "Comparison pattern", structure: "Thing A + comparison + thing B", example: "Ce restaurant est meilleur que l'autre." },
];

export const commonMistakes = [
  { wrong: "Je pense ce film est intéressant.", correct: "Je pense que ce film est intéressant.", explanation: "Use que after Je pense." },
  { wrong: "Paris est plus grand Lyon.", correct: "Paris est plus grand que Lyon.", explanation: "Use que in comparisons." },
  { wrong: "Hier je suis allé au marché je acheté des fruits.", correct: "Hier, je suis allé au marché et j'ai acheté des fruits.", explanation: "Use connectors to link ideas." },
  { wrong: "Je préfère café parce je aime.", correct: "Je préfère le café parce que je l'aime.", explanation: "Use parce que correctly." },
];

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

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 6) {
    return { title: "Good effort", message: "Building longer sentences takes practice. Focus on using connectors and simple patterns. You can retake the practice or continue the lesson.", emoji: "📚", color: "blue" };
  } else if (score <= 11) {
    return { title: "Nice progress", message: "You're starting to connect ideas more naturally. Review the connectors and patterns once more if you want to feel more confident.", emoji: "🌟", color: "yellow" };
  } else {
    return { title: "Great job", message: "You can now express ideas in longer sentences with confidence. This is an important step toward B1 communication.", emoji: "🎉", color: "green" };
  }
}
