// B1 Lesson 12 — Double Object Pronouns
export const sectionIds = ["intro", "order-rules", "me-te-se", "le-la-les", "lui-leur", "y-en", "examples", "mistakes", "practice", "completion"];

export const lessonMeta = {
  title: "Double Object Pronouns",
  subtitle: "Learn how to combine pronouns in French sentences.",
  lessonNumber: 12,
};

export const orderRules = [
  { position: "1st", pronouns: "me/te/se/nous/vous", type: "Reflexive/Direct/Indirect" },
  { position: "2nd", pronouns: "le/la/les", type: "Direct object" },
  { position: "3rd", pronouns: "lui/leur", type: "Indirect object" },
  { position: "4th", pronouns: "y", type: "Place (there)" },
  { position: "5th", pronouns: "en", type: "Quantity/some/of it" },
];

export const meTeSeExamples = [
  { before: "Il me le donne.", explanation: "He gives it to me. Order: me (1st) + le (2nd)" },
  { before: "Elle te la montre.", explanation: "She shows it to you. Order: te (1st) + la (2nd)" },
  { before: "Ils se les achètent.", explanation: "They buy them for themselves. Order: se (1st) + les (2nd)" },
];

export const leLaLesExamples = [
  { before: "Je le lui donne.", explanation: "I give it to him. Order: le (2nd) + lui (3rd)" },
  { before: "Tu la leur envoies.", explanation: "You send it to them. Order: la (2nd) + leur (3rd)" },
  { before: "Il les y met.", explanation: "He puts them there. Order: les (2nd) + y (4th)" },
];

export const yEnExamples = [
  { before: "Il y en a.", explanation: "There is some. Order: y (4th) + en (5th)" },
  { before: "Elle nous en parle.", explanation: "She speaks to us about it. Order: nous (1st) + en (5th)" },
  { before: "Je vous y attends.", explanation: "I wait for you there. Order: vous (1st) + y (4th)" },
];

export const commonExamples = [
  { sentence: "Il me le donne.", breakdown: "me (to me) + le (it)", meaning: "He gives it to me." },
  { sentence: "Elle te la montre.", breakdown: "te (to you) + la (it)", meaning: "She shows it to you." },
  { sentence: "Je le lui envoie.", breakdown: "le (it) + lui (to him)", meaning: "I send it to him." },
  { sentence: "Ils nous en parlent.", breakdown: "nous (to us) + en (about it)", meaning: "They speak to us about it." },
  { sentence: "Tu y en vas.", breakdown: "y (there) + en (of it)", note: "Actually: Tu t'y en vas (less common)", meaning: "You go there (of it)" },
];

export const commonMistakes = [
  { wrong: "Il me donne le.", correct: "Il me le donne.", explanation: "Pronouns go before the verb in a specific order." },
  { wrong: "Je lui le donne.", correct: "Je le lui donne.", explanation: "Direct object (le) comes before indirect (lui)." },
  { wrong: "Il en y a.", correct: "Il y en a.", explanation: "Y comes before en." },
  { wrong: "Elle le leur montre.", correct: "Elle la leur montre.", explanation: "Agreement: la (feminine) for feminine object." },
];

export const practiceQuestions = [
  { id: 1, topic: "order", prompt: "What is the correct pronoun order?", options: ["me/te/se + le/la/les + lui/leur + y + en", "le/la/les + me/te/se + y + en", "lui/leur + le/la/les + me/te/se"], correct: 0, explanation: "Correct order: reflexive → direct → indirect → y → en" },
  { id: 2, topic: "me-le", prompt: "Complete: Il _____ (me + le) donne.", options: ["me le", "le me", "me lui"], correct: 0, explanation: "me (1st) + le (2nd) = me le" },
  { id: 3, topic: "le-lui", prompt: "Complete: Je _____ (le + lui) envoie.", options: ["le lui", "lui le", "le leur"], correct: 0, explanation: "le (2nd) + lui (3rd) = le lui" },
  { id: 4, topic: "y-en", prompt: "Complete: Il _____ (y + en) a beaucoup.", options: ["y en", "en y", "y leur"], correct: 0, explanation: "y (4th) + en (5th) = y en" },
  { id: 5, topic: "nous-en", prompt: "Complete: Elle _____ (nous + en) parle.", options: ["nous en", "en nous", "nous leur"], correct: 0, explanation: "nous (1st) + en (5th) = nous en" },
  { id: 6, topic: "meaning", prompt: "What does 'Il me le donne' mean?", options: ["He gives it to me", "He gives me to him", "He gives himself to me"], correct: 0, explanation: "me = to me, le = it" },
  { id: 7, topic: "meaning", prompt: "What does 'Je le lui envoie' mean?", options: ["I send it to him/her", "I send him to him", "I send myself to him"], correct: 0, explanation: "le = it, lui = to him/her" },
  { id: 8, topic: "meaning", prompt: "What does 'Ils nous en parlent' mean?", options: ["They speak to us about it", "They speak about us", "They speak to themselves about it"], correct: 0, explanation: "nous = to us, en = about it/of it" },
  { id: 9, topic: "agreement", prompt: "Complete: Elle _____ (la + leur) montre.", options: ["la leur", "leur la", "les leur"], correct: 0, explanation: "la (2nd) + leur (3rd) = la leur" },
  { id: 10, topic: "mistakes", prompt: "Which is correct?", options: ["Je le lui donne.", "Je lui le donne.", "Je le leur donne."], correct: 0, explanation: "le (direct) comes before lui (indirect)" },
  { id: 11, topic: "mistakes", prompt: "Which is correct?", options: ["Il y en a.", "Il en y a.", "Il y leur a."], correct: 0, explanation: "y comes before en" },
  { id: 12, topic: "position", prompt: "Where do double pronouns go?", options: ["Before the verb", "After the verb", "At the end of the sentence"], correct: 0, explanation: "Object pronouns always go before the verb (except in positive imperatives)." },
  { id: 13, topic: "vous-y", prompt: "Complete: Je _____ (vous + y) attends.", options: ["vous y", "y vous", "vous en"], correct: 0, explanation: "vous (1st) + y (4th) = vous y" },
  { id: 14, topic: "se-les", prompt: "Complete: Ils _____ (se + les) achètent.", options: ["se les", "les se", "se leur"], correct: 0, explanation: "se (1st) + les (2nd) = se les" },
  { id: 15, topic: "mixed", prompt: "Complete: Tu _____ (te + y) trouves bien?", options: ["t'y", "te y", "y te"], correct: 0, explanation: "te + y = t'y (with elision)" },
];

export function getPerformanceMessage(score: number, total: number) {
  if (score <= 7) return { title: "Good effort", message: "Double pronouns have strict order rules. Practice: me/te/se → le/la/les → lui/leur → y → en", emoji: "📚", color: "blue" as const };
  if (score <= 11) return { title: "Nice progress", message: "You're getting the pronoun order. Review y + en combinations and agreement.", emoji: "🌟", color: "yellow" as const };
  return { title: "Great job", message: "You're combining pronouns well! This is a sophisticated French skill.", emoji: "🎉", color: "green" as const };
}
