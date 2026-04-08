export interface ListeningQuestion {
  id: number
  topic: string
  type: 'multiple-choice' | 'short-passage'
  difficulty: 'easy' | 'medium' | 'hard'
  transcript: string
  audioSrc: string
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export const listeningExamQuestions: ListeningQuestion[] = [
  {
    id: 1,
    topic: "pronouns",
    type: "multiple-choice",
    difficulty: "easy",
    transcript: "Elles parlent français.",
    audioSrc: "/audio/exam/listening/q1.mp3",
    prompt: "Who is speaking French?",
    options: ["They (feminine)", "He", "You (plural/formal)"],
    correct: 0,
    explanation: "“Elles” means “they” for a feminine plural group."
  },
  {
    id: 2,
    topic: "articles",
    type: "multiple-choice",
    difficulty: "easy",
    transcript: "L'école est grande.",
    audioSrc: "/audio/exam/listening/q2.mp3",
    prompt: "Which article do you hear before “école”?",
    options: ["le", "la", "l'"],
    correct: 2,
    explanation: "Before a vowel sound, French uses “l'”."
  },
  {
    id: 3,
    topic: "nouns",
    type: "multiple-choice",
    difficulty: "easy",
    transcript: "La voiture rouge est ici.",
    audioSrc: "/audio/exam/listening/q3.mp3",
    prompt: "What is being described?",
    options: ["A red car", "A blue house", "A small book"],
    correct: 0,
    explanation: "“La voiture rouge” means “the red car”."
  },
  {
    id: 4,
    topic: "verbs",
    type: "multiple-choice",
    difficulty: "easy",
    transcript: "Nous allons à l'école.",
    audioSrc: "/audio/exam/listening/q4.mp3",
    prompt: "What does the sentence mean?",
    options: ["We are going to school.", "We speak at school.", "We live at school."],
    correct: 0,
    explanation: "“Nous allons à l'école” means “We are going to school.”"
  },
  {
    id: 5,
    topic: "sentence-structure",
    type: "multiple-choice",
    difficulty: "medium",
    transcript: "Je parle français.",
    audioSrc: "/audio/exam/listening/q5.mp3",
    prompt: "Which transcript matches the audio?",
    options: ["Je français parle.", "Je parle français.", "Parle je français."],
    correct: 1,
    explanation: "The correct transcript is “Je parle français.”"
  },
  {
    id: 6,
    topic: "prepositions",
    type: "multiple-choice",
    difficulty: "medium",
    transcript: "Le livre est sur la table.",
    audioSrc: "/audio/exam/listening/q6.mp3",
    prompt: "Where is the book?",
    options: ["Under the table", "On the table", "In the table"],
    correct: 1,
    explanation: "“Sur” means “on”."
  },
  {
    id: 7,
    topic: "adjectives-adverbs",
    type: "multiple-choice",
    difficulty: "medium",
    transcript: "Il court rapidement.",
    audioSrc: "/audio/exam/listening/q7.mp3",
    prompt: "Which word in the sentence is an adverb?",
    options: ["Il", "court", "rapidement"],
    correct: 2,
    explanation: "“Rapidement” is the adverb."
  },
  {
    id: 8,
    topic: "negation",
    type: "multiple-choice",
    difficulty: "medium",
    transcript: "Je ne parle pas anglais.",
    audioSrc: "/audio/exam/listening/q8.mp3",
    prompt: "What does the sentence mean?",
    options: ["I speak English.", "I do not speak English.", "I am speaking English."],
    correct: 1,
    explanation: "“Je ne parle pas anglais” means “I do not speak English.”"
  },
  {
    id: 9,
    topic: "past-tense",
    type: "multiple-choice",
    difficulty: "medium",
    transcript: "Elle est arrivée tôt.",
    audioSrc: "/audio/exam/listening/q9.mp3",
    prompt: "When did she arrive?",
    options: ["She is arriving now.", "She arrived early.", "She will arrive early."],
    correct: 1,
    explanation: "This is passé composé with être: “She arrived early.”"
  },
  {
    id: 10,
    topic: "verb-groups",
    type: "multiple-choice",
    difficulty: "medium",
    transcript: "Finir est un verbe du deuxième groupe.",
    audioSrc: "/audio/exam/listening/q10.mp3",
    prompt: "Which verb group is being mentioned?",
    options: ["First group", "Second group", "Third group"],
    correct: 1,
    explanation: "“Finir” is a regular -ir verb from the second group."
  },
  {
    id: 11,
    topic: "pronunciation-recognition",
    type: "multiple-choice",
    difficulty: "medium",
    transcript: "Maison",
    audioSrc: "/audio/exam/listening/q11.mp3",
    prompt: "What pronunciation pattern is being tested?",
    options: ["s between vowels sounds like z", "au sounds like o", "ch sounds like k"],
    correct: 0,
    explanation: "In “maison”, the s between vowels sounds like z."
  },
  {
    id: 12,
    topic: "prepositions-verbs",
    type: "multiple-choice",
    difficulty: "medium",
    transcript: "Elle vient de France.",
    audioSrc: "/audio/exam/listening/q12.mp3",
    prompt: "What does “de” express here?",
    options: ["direction", "origin", "possession"],
    correct: 1,
    explanation: "“Venir de” expresses origin: “to come from”."
  },
  {
    id: 13,
    topic: "adjectives",
    type: "multiple-choice",
    difficulty: "medium",
    transcript: "Une voiture rouge",
    audioSrc: "/audio/exam/listening/q13.mp3",
    prompt: "What does the phrase mean?",
    options: ["A red car", "A small car", "A fast car"],
    correct: 0,
    explanation: "“Une voiture rouge” means “a red car”."
  },
  {
    id: 14,
    topic: "negation-past-tense",
    type: "multiple-choice",
    difficulty: "hard",
    transcript: "Je n'ai pas mangé.",
    audioSrc: "/audio/exam/listening/q14.mp3",
    prompt: "What does the sentence mean?",
    options: ["I ate.", "I did not eat.", "I am not eating."],
    correct: 1,
    explanation: "In passé composé, negation surrounds the auxiliary: “I did not eat.”"
  },
  {
    id: 15,
    topic: "listening-comprehension",
    type: "short-passage",
    difficulty: "hard",
    transcript: "Marie est allée au marché ce matin. Elle a acheté du pain et des fruits. Ensuite, elle est rentrée à la maison.",
    audioSrc: "/audio/exam/listening/q15.mp3",
    prompt: "What did Marie do after going to the market?",
    options: [
      "She went to school.",
      "She bought bread and fruit, then went home.",
      "She stayed at the market all day."
    ],
    correct: 1,
    explanation: "The passage says she bought bread and fruit, then returned home."
  }
]

export const PASSING_SCORE = 9
export const TOTAL_QUESTIONS = 15
export const PASSING_PERCENTAGE = 60

export interface ExamResult {
  score: number
  passed: boolean
  answers: { questionId: number; selectedOption: number; isCorrect: boolean }[]
}

export function calculateExamResult(answers: { questionId: number; selectedOption: number; isCorrect: boolean }[]): ExamResult {
  const score = answers.filter(a => a.isCorrect).length
  return {
    score,
    passed: score >= PASSING_SCORE,
    answers
  }
}

export function getPassFailMessage(passed: boolean) {
  if (passed) {
    return {
      title: "Well done!",
      body: [
        "You've passed the A1 Listening Exam.",
        "Your listening foundation is strong enough to move forward."
      ]
    }
  } else {
    return {
      title: "Not quite there yet",
      body: [
        "You've already built some useful listening skills. Review the lessons that felt harder, then come back and try again.",
        "You need at least 9/15 to move on.",
        "Revisiting the lessons can help you improve your grade."
      ]
    }
  }
}
