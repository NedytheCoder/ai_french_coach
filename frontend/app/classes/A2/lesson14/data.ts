// A2 Lesson 14 — Adverbs of Frequency, Quantity, and Manner
export const sectionIds = ["intro", "what-is-adverb", "frequency", "quantity", "manner", "position", "adjective-vs-adverb", "guided-examples", "mistakes", "practice", "completion"];

export const frequencyAdverbs = [
  { word: "toujours", english: "always", example: "Je suis toujours en retard.", exampleEnglish: "I am always late." },
  { word: "souvent", english: "often", example: "Nous allons souvent au cinéma.", exampleEnglish: "We often go to the cinema." },
  { word: "parfois", english: "sometimes", example: "Elle est parfois fatiguée après le travail.", exampleEnglish: "She is sometimes tired after work." },
  { word: "quelquefois", english: "sometimes", example: "Je cuisine quelquefois le dimanche.", exampleEnglish: "I sometimes cook on Sundays." },
  { word: "rarement", english: "rarely", example: "Ils sortent rarement en semaine.", exampleEnglish: "They rarely go out during the week." },
  { word: "jamais", english: "never", example: "Il ne boit jamais de café.", exampleEnglish: "He never drinks coffee." },
];

export const quantityAdverbs = [
  { word: "très", english: "very", example: "Elle est très gentille.", exampleEnglish: "She is very kind." },
  { word: "trop", english: "too / too much", example: "Tu travailles trop.", exampleEnglish: "You work too much." },
  { word: "beaucoup", english: "a lot / much", example: "Nous voyageons beaucoup.", exampleEnglish: "We travel a lot." },
  { word: "assez", english: "enough / quite", example: "J'ai assez de temps.", exampleEnglish: "I have enough time." },
  { word: "peu", english: "little / not much", example: "Il parle peu en classe.", exampleEnglish: "He speaks little in class." },
  { word: "presque", english: "almost", example: "J'ai presque fini.", exampleEnglish: "I have almost finished." },
  { word: "environ", english: "about / approximately", example: "Il y a environ vingt personnes.", exampleEnglish: "There are about twenty people." },
];

export const mannerAdverbs = [
  { word: "lentement", english: "slowly", example: "Il marche lentement.", exampleEnglish: "He walks slowly." },
  { word: "rapidement", english: "quickly", example: "Elle répond rapidement.", exampleEnglish: "She answers quickly." },
  { word: "facilement", english: "easily", example: "Nous apprenons facilement.", exampleEnglish: "We learn easily." },
  { word: "heureusement", english: "fortunately", example: "Heureusement, le bus est arrivé à l'heure.", exampleEnglish: "Fortunately, the bus arrived on time." },
  { word: "malheureusement", english: "unfortunately", example: "Malheureusement, il a oublié son passeport.", exampleEnglish: "Unfortunately, he forgot his passport." },
  { word: "bien", english: "well", example: "Tu chantes bien.", exampleEnglish: "You sing well." },
  { word: "mal", english: "badly", example: "Je dors mal ici.", exampleEnglish: "I sleep badly here." },
];

export const positionPatterns = [
  { pattern: "verb + adverb", example: "Il parle bien.", english: "He speaks well." },
  { pattern: "frequency adverb near the verb", example: "Je vais souvent au marché.", english: "I often go to the market." },
  { pattern: "très + adjective / adverb", example: "Elle est très gentille.", english: "She is very kind." },
  { pattern: "auxiliary + adverb + participle", example: "Nous avons beaucoup appris.", english: "We learned a lot." },
];

export const adjectiveVsAdverb = [
  { adjectiveSentence: "C'est une voiture rapide.", adjectiveEnglish: "It is a fast car.", adverbSentence: "Elle conduit rapidement.", adverbEnglish: "She drives quickly.", explanation: "Rapide describes the noun voiture. Rapidement describes the verb conduit." },
  { adjectiveSentence: "C'est un garçon calme.", adjectiveEnglish: "He is a calm boy.", adverbSentence: "Il parle calmement.", adverbEnglish: "He speaks calmly.", explanation: "Calme is an adjective. Calmement is an adverb." },
];

export const guidedExamples = [
  { french: "Je vais souvent à la bibliothèque.", english: "I often go to the library." },
  { french: "Elle travaille beaucoup pendant la semaine.", english: "She works a lot during the week." },
  { french: "Nous avons presque fini le projet.", english: "We have almost finished the project." },
  { french: "Il répond toujours poliment.", english: "He always answers politely." },
  { french: "Tu parles très bien français.", english: "You speak French very well." },
  { french: "Malheureusement, le train est en retard.", english: "Unfortunately, the train is late." },
];

export const commonMistakes = [
  { wrong: "Il parle bon.", correct: "Il parle bien.", explanation: "Use the adverb bien, not the adjective bon, to describe how someone speaks." },
  { wrong: "Je vais au cinéma souvent toujours.", correct: "Je vais souvent au cinéma.", explanation: "Avoid stacking frequency adverbs incorrectly. Use one clear adverb in a natural position." },
  { wrong: "Elle est très parle lentement.", correct: "Elle parle très lentement.", explanation: "Très modifies the adverb lentement, not the whole verb phrase in that position." },
  { wrong: "Nous avons travaillé beaucoup.", correct: "Nous avons beaucoup travaillé.", explanation: "In compound tenses, common adverbs often go between the auxiliary and the participle." },
];

export const practiceQuestions = [
  { id: 1, topic: "frequency", prompt: "Which adverb means 'often'?", options: ["souvent", "jamais", "très"], correct: 0, explanation: "Souvent means often." },
  { id: 2, topic: "frequency", prompt: "Choose the correct sentence.", options: ["Je vais souvent au marché.", "Je vais au marché souvent toujours.", "Je souvent vais au marché."], correct: 0, explanation: "Souvent is correctly placed near the verb." },
  { id: 3, topic: "frequency", prompt: "Which adverb means 'never'?", options: ["rarement", "jamais", "presque"], correct: 1, explanation: "Jamais means never." },
  { id: 4, topic: "frequency", prompt: "Choose the correct sentence.", options: ["Il ne boit jamais de café.", "Il boit jamais de café.", "Il jamais boit de café."], correct: 0, explanation: "Jamais is commonly used in negative structures." },
  { id: 5, topic: "frequency", prompt: "Which adverb means 'rarely'?", options: ["rarement", "toujours", "beaucoup"], correct: 0, explanation: "Rarement means rarely." },
  { id: 6, topic: "quantity", prompt: "Which adverb means 'a lot'?", options: ["beaucoup", "lentement", "toujours"], correct: 0, explanation: "Beaucoup means a lot." },
  { id: 7, topic: "quantity", prompt: "Choose the correct sentence.", options: ["Nous travaillons beaucoup.", "Nous beaucoup travaillons.", "Nous travaillons beaucoup très."], correct: 0, explanation: "Beaucoup is correctly placed after the verb here." },
  { id: 8, topic: "quantity", prompt: "Which adverb means 'almost'?", options: ["presque", "assez", "mal"], correct: 0, explanation: "Presque means almost." },
  { id: 9, topic: "quantity", prompt: "Choose the correct sentence.", options: ["J'ai presque fini.", "J'ai fini presque.", "Je presque ai fini."], correct: 0, explanation: "Presque is correctly placed before the participle idea here." },
  { id: 10, topic: "quantity", prompt: "Which sentence means 'She is very kind'?", options: ["Elle est très gentille.", "Elle est beaucoup gentille.", "Elle est bien gentille."], correct: 0, explanation: "Très is the standard adverb for very." },
  { id: 11, topic: "manner", prompt: "Which adverb means 'quickly'?", options: ["rapidement", "beaucoup", "jamais"], correct: 0, explanation: "Rapidement means quickly." },
  { id: 12, topic: "manner", prompt: "Choose the correct sentence.", options: ["Il marche lentement.", "Il marche lente.", "Il marche lent."], correct: 0, explanation: "Use the adverb lentement, not the adjective lent." },
  { id: 13, topic: "manner", prompt: "Which adverb means 'well'?", options: ["bon", "bien", "beau"], correct: 1, explanation: "Bien means well." },
  { id: 14, topic: "manner", prompt: "Choose the correct sentence.", options: ["Tu chantes bien.", "Tu chantes bon.", "Tu bien chantes."], correct: 0, explanation: "Bien is the correct adverb." },
  { id: 15, topic: "position", prompt: "Choose the most natural sentence in the passé composé.", options: ["Nous avons beaucoup appris.", "Nous avons appris beaucoup.", "Nous beaucoup avons appris."], correct: 0, explanation: "Beaucoup often comes between the auxiliary and participle." },
  { id: 16, topic: "position", prompt: "Choose the correct sentence.", options: ["Elle parle très lentement.", "Elle très parle lentement.", "Elle parle lentement très."], correct: 0, explanation: "Très comes before the adverb it modifies." },
  { id: 17, topic: "correction", prompt: "Choose the corrected sentence.", options: ["Il parle bon.", "Il parle bien.", "Il bien parle."], correct: 1, explanation: "Use bien to describe how someone speaks." },
  { id: 18, topic: "correction", prompt: "Choose the corrected sentence.", options: ["Nous avons travaillé beaucoup.", "Nous avons beaucoup travaillé.", "Nous beaucoup avons travaillé."], correct: 1, explanation: "In compound tenses, common adverbs often go between the auxiliary and the participle." },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) {
    return { title: "Good effort", message: "French adverbs take time because meaning and position both matter. You can retake the practice or continue the lesson. A quick review of the three adverb types will help a lot.", emoji: "📚", color: "blue" };
  } else if (score <= 13) {
    return { title: "Nice progress", message: "You're starting to understand adverbs of frequency, quantity, and manner. Review adjective vs adverb differences and position patterns once more if you want to feel more confident.", emoji: "🌟", color: "yellow" };
  } else {
    return { title: "Great job", message: "You're using French adverbs well. These patterns will help your French sound more natural, precise, and fluent.", emoji: "🎉", color: "green" };
  }
}
