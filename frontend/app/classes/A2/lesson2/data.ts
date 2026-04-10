export interface ReflexivePronoun {
  subject: string
  pronoun: string
  example: string
}

export const reflexivePronouns: ReflexivePronoun[] = [
  { subject: "je", pronoun: "me / m'", example: "Je me lève." },
  { subject: "tu", pronoun: "te / t'", example: "Tu te laves." },
  { subject: "il / elle / on", pronoun: "se / s'", example: "Elle se réveille." },
  { subject: "nous", pronoun: "nous", example: "Nous nous habillons." },
  { subject: "vous", pronoun: "vous", example: "Vous vous reposez." },
  { subject: "ils / elles", pronoun: "se / s'", example: "Ils se couchent." }
]

export interface ReflexiveVerb {
  infinitive: string
  english: string
}

export const commonReflexiveVerbs: ReflexiveVerb[] = [
  { infinitive: "se lever", english: "to get up" },
  { infinitive: "se laver", english: "to wash oneself" },
  { infinitive: "s'habiller", english: "to get dressed" },
  { infinitive: "se réveiller", english: "to wake up" },
  { infinitive: "se coucher", english: "to go to bed" },
  { infinitive: "se brosser", english: "to brush" },
  { infinitive: "se reposer", english: "to rest" },
  { infinitive: "s'appeler", english: "to be called / to call oneself" },
  { infinitive: "se promener", english: "to go for a walk" },
  { infinitive: "se dépêcher", english: "to hurry" }
]

export interface PresentExample {
  french: string
  english: string
}

export const presentTenseExamples: PresentExample[] = [
  { french: "Je me lève à sept heures.", english: "I get up at seven o'clock." },
  { french: "Tu te laves rapidement.", english: "You wash yourself quickly." },
  { french: "Elle s'habille avant le petit-déjeuner.", english: "She gets dressed before breakfast." },
  { french: "Nous nous reposons le soir.", english: "We rest in the evening." },
  { french: "Vous vous couchez tard.", english: "You go to bed late." },
  { french: "Ils se réveillent tôt.", english: "They wake up early." }
]

export const dailyRoutineExamples: PresentExample[] = [
  { french: "Je me réveille à six heures.", english: "I wake up at six o'clock." },
  { french: "Je me lève et je me lave.", english: "I get up and wash myself." },
  { french: "Je m'habille avant de partir.", english: "I get dressed before leaving." },
  { french: "Le soir, je me couche à dix heures.", english: "In the evening, I go to bed at ten o'clock." }
]

export interface NegativeExample {
  affirmative: string
  negative: string
  english: string
}

export const negativeExamples: NegativeExample[] = [
  { affirmative: "Je me lève tôt.", negative: "Je ne me lève pas tôt.", english: "I do not get up early." },
  { affirmative: "Elle se couche tard.", negative: "Elle ne se couche pas tard.", english: "She does not go to bed late." },
  { affirmative: "Nous nous reposons.", negative: "Nous ne nous reposons pas.", english: "We do not rest." }
]

export interface PasseComposeExample {
  french: string
  english: string
}

export const passeComposeExamples: PasseComposeExample[] = [
  { french: "Je me suis levé(e).", english: "I got up." },
  { french: "Elle s'est lavée.", english: "She washed herself." },
  { french: "Nous nous sommes habillés.", english: "We got dressed." },
  { french: "Ils se sont couchés tard.", english: "They went to bed late." }
]

export interface CommonMistake {
  wrong: string
  correct: string
  explanation: string
}

export const commonMistakes: CommonMistake[] = [
  { wrong: "Je lève à sept heures.", correct: "Je me lève à sept heures.", explanation: "Do not forget the reflexive pronoun." },
  { wrong: "Nous se couchons tôt.", correct: "Nous nous couchons tôt.", explanation: "The reflexive pronoun must match the subject." },
  { wrong: "Elle ne couche pas tôt.", correct: "Elle ne se couche pas tôt.", explanation: "In negation, keep the reflexive pronoun before the verb." },
  { wrong: "Je suis me levé.", correct: "Je me suis levé.", explanation: "In the passé composé, the reflexive pronoun comes before the auxiliary." }
]

export interface PracticeQuestion {
  id: number
  topic: string
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    topic: "pronouns",
    prompt: "Choose the correct reflexive pronoun: Je ___ lève.",
    options: ["me", "te", "se"],
    correct: 0,
    explanation: "With je, the correct reflexive pronoun is me."
  },
  {
    id: 2,
    topic: "pronouns",
    prompt: "Choose the correct reflexive pronoun: Nous ___ couchons tôt.",
    options: ["se", "nous", "vous"],
    correct: 1,
    explanation: "With nous, the correct reflexive pronoun is nous."
  },
  {
    id: 3,
    topic: "pronouns",
    prompt: "Choose the correct reflexive pronoun: Elle ___ habille rapidement.",
    options: ["me", "te", "s'"],
    correct: 2,
    explanation: "Before a vowel, se becomes s'."
  },
  {
    id: 4,
    topic: "pronouns",
    prompt: "Choose the correct reflexive pronoun: Tu ___ reposes après le travail.",
    options: ["te", "me", "nous"],
    correct: 0,
    explanation: "With tu, the reflexive pronoun is te."
  },
  {
    id: 5,
    topic: "present",
    prompt: "Choose the correct sentence.",
    options: ["Je me lève à sept heures.", "Je lève à sept heures.", "Je me lever à sept heures."],
    correct: 0,
    explanation: "The correct present tense pattern is subject + reflexive pronoun + conjugated verb."
  },
  {
    id: 6,
    topic: "present",
    prompt: "Choose the correct sentence.",
    options: ["Nous nous habillons avant de partir.", "Nous se habillons avant de partir.", "Nous habillons nous avant de partir."],
    correct: 0,
    explanation: "With nous, the correct reflexive pronoun is nous."
  },
  {
    id: 7,
    topic: "present",
    prompt: 'What does "Elle se réveille tôt" mean?',
    options: ["She wakes up early.", "She goes to bed early.", "She gets dressed early."],
    correct: 0,
    explanation: '“Se réveiller” means “to wake up.”'
  },
  {
    id: 8,
    topic: "present",
    prompt: 'Which sentence means "They rest in the evening"?',
    options: ["Ils se reposent le soir.", "Ils reposent le soir.", "Ils se reposer le soir."],
    correct: 0,
    explanation: 'The correct present tense reflexive form is "Ils se reposent."'
  },
  {
    id: 9,
    topic: "negation",
    prompt: "Choose the correct negative sentence.",
    options: ["Je ne me lève pas tôt.", "Je me ne lève pas tôt.", "Je ne lève pas tôt."],
    correct: 0,
    explanation: "In negation, ne comes before the reflexive pronoun and pas after the verb."
  },
  {
    id: 10,
    topic: "negation",
    prompt: "Choose the correct negative sentence.",
    options: ["Elle ne se couche pas tard.", "Elle ne couche pas se tard.", "Elle se ne couche pas tard."],
    correct: 0,
    explanation: "Keep the reflexive pronoun close to the verb."
  },
  {
    id: 11,
    topic: "negation",
    prompt: 'Which sentence means "We do not rest"?',
    options: ["Nous ne nous reposons pas.", "Nous ne reposons pas.", "Nous nous ne reposons pas."],
    correct: 0,
    explanation: 'The correct negative reflexive pattern is "Nous ne nous reposons pas."'
  },
  {
    id: 12,
    topic: "passe-compose",
    prompt: "Choose the correct passé composé sentence.",
    options: ["Je me suis levé.", "Je suis me levé.", "Je me levé suis."],
    correct: 0,
    explanation: "In the passé composé, the reflexive pronoun comes before the auxiliary."
  },
  {
    id: 13,
    topic: "passe-compose",
    prompt: 'Which sentence means "She washed herself"?',
    options: ["Elle s'est lavée.", "Elle a lavée.", "Elle se lavée est."],
    correct: 0,
    explanation: "Reflexive verbs use être in the passé composé."
  },
  {
    id: 14,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: ["Nous se couchons tôt.", "Nous nous couchons tôt.", "Nous couchons nous tôt."],
    correct: 1,
    explanation: "With nous, the correct reflexive pronoun is nous."
  },
  {
    id: 15,
    topic: "correction",
    prompt: "Choose the corrected sentence.",
    options: ["Elle ne couche pas tôt.", "Elle ne se couche pas tôt.", "Elle se ne couche pas tôt."],
    correct: 1,
    explanation: "The reflexive pronoun must stay before the verb in negation."
  }
]

export const sectionIds = [
  'intro',
  'pronouns',
  'verbs',
  'present',
  'routine',
  'negation',
  'passe-compose',
  'mistakes',
  'practice'
] as const

export type SectionId = typeof sectionIds[number]

export interface PerformanceMessage {
  title: string
  message: string
  tone: 'high' | 'medium' | 'low'
  color: 'green' | 'blue' | 'amber'
}

export function getPerformanceMessage(score: number, total: number): PerformanceMessage {
  const percentage = (score / total) * 100
  
  if (percentage >= 80) {
    return {
      title: "Great job!",
      message: "You're using reflexive verbs well. This is an important structure for everyday French, especially when talking about routines.",
      tone: "high",
      color: "green"
    }
  } else if (percentage >= 47) {
    return {
      title: "Nice progress",
      message: "You're starting to understand how reflexive verbs work. Review the pronouns and word order once more if you want to feel more confident.",
      tone: "medium",
      color: "blue"
    }
  } else {
    return {
      title: "Good effort",
      message: "Reflexive verbs take practice, especially because of the extra pronoun. You can retake the practice or continue the lesson. A quick review of the structure will help a lot.",
      tone: "low",
      color: "amber"
    }
  }
}
