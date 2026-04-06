export interface ExamQuestion {
  id: number
  topic: 'pronouns' | 'articles' | 'nouns' | 'verbs' | 'mixed'
  lesson: number
  type: 'multiple-choice' | 'sentence-completion'
  difficulty: 'easy' | 'medium' | 'hard'
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export const examQuestions: ExamQuestion[] = [
  {
    id: 1,
    topic: "pronouns",
    lesson: 1,
    type: "multiple-choice",
    difficulty: "easy",
    prompt: "Choose the correct French pronoun for \"I\".",
    options: ["tu", "je", "nous"],
    correct: 1,
    explanation: "\"Je\" means \"I\"."
  },
  {
    id: 2,
    topic: "pronouns",
    lesson: 1,
    type: "multiple-choice",
    difficulty: "easy",
    prompt: "Choose the correct French pronoun for \"they\" (feminine).",
    options: ["elles", "ils", "vous"],
    correct: 0,
    explanation: "\"Elles\" is used for a feminine group."
  },
  {
    id: 3,
    topic: "pronouns",
    lesson: 1,
    type: "sentence-completion",
    difficulty: "medium",
    prompt: "___ suis étudiant.",
    options: ["Je", "Tu", "Ils"],
    correct: 0,
    explanation: "The correct sentence is \"Je suis étudiant.\""
  },
  {
    id: 4,
    topic: "pronouns",
    lesson: 2,
    type: "multiple-choice",
    difficulty: "medium",
    prompt: "Choose the best subject pronoun for this sentence: \"___ parlez français.\"",
    options: ["vous", "je", "elle"],
    correct: 0,
    explanation: "\"Vous parlez français.\" is the correct form."
  },

  {
    id: 5,
    topic: "articles",
    lesson: 1,
    type: "multiple-choice",
    difficulty: "easy",
    prompt: "Choose the correct article: ___ livre",
    options: ["le", "la", "une"],
    correct: 0,
    explanation: "\"Livre\" is masculine singular, so use \"le\"."
  },
  {
    id: 6,
    topic: "articles",
    lesson: 1,
    type: "multiple-choice",
    difficulty: "easy",
    prompt: "Choose the correct article: ___ table",
    options: ["la", "le", "un"],
    correct: 0,
    explanation: "\"Table\" is feminine singular, so use \"la\"."
  },
  {
    id: 7,
    topic: "articles",
    lesson: 1,
    type: "multiple-choice",
    difficulty: "medium",
    prompt: "Choose the correct article: ___ école",
    options: ["le", "l'", "les"],
    correct: 1,
    explanation: "Use \"l'\" before a vowel."
  },
  {
    id: 8,
    topic: "articles",
    lesson: 1,
    type: "multiple-choice",
    difficulty: "medium",
    prompt: "Choose the correct article: ___ voiture",
    options: ["une", "un", "des"],
    correct: 0,
    explanation: "\"Voiture\" is feminine singular, so use \"une\"."
  },

  {
    id: 9,
    topic: "nouns",
    lesson: 3,
    type: "multiple-choice",
    difficulty: "easy",
    prompt: "What does \"le jardin\" mean?",
    options: ["the chair", "the garden", "the school"],
    correct: 1,
    explanation: "\"Le jardin\" means \"the garden\"."
  },
  {
    id: 10,
    topic: "nouns",
    lesson: 3,
    type: "multiple-choice",
    difficulty: "easy",
    prompt: "What does \"la voiture\" mean?",
    options: ["the table", "the car", "the house"],
    correct: 1,
    explanation: "\"La voiture\" means \"the car\"."
  },
  {
    id: 11,
    topic: "nouns",
    lesson: 3,
    type: "multiple-choice",
    difficulty: "medium",
    prompt: "Choose the correct article: ___ hôtel",
    options: ["l'", "le", "la"],
    correct: 0,
    explanation: "Use \"l'\" before a silent h."
  },
  {
    id: 12,
    topic: "nouns",
    lesson: 3,
    type: "multiple-choice",
    difficulty: "medium",
    prompt: "Which one is correct?",
    options: ["le voiture", "la voiture", "l'voiture"],
    correct: 1,
    explanation: "\"Voiture\" is feminine, so the correct form is \"la voiture\"."
  },

  {
    id: 13,
    topic: "verbs",
    lesson: 4,
    type: "multiple-choice",
    difficulty: "easy",
    prompt: "What does \"avoir\" mean?",
    options: ["to be", "to have", "to go"],
    correct: 1,
    explanation: "\"Avoir\" means \"to have\"."
  },
  {
    id: 14,
    topic: "verbs",
    lesson: 4,
    type: "multiple-choice",
    difficulty: "easy",
    prompt: "Which verb means \"to go\"?",
    options: ["aller", "aimer", "habiter"],
    correct: 0,
    explanation: "\"Aller\" means \"to go\"."
  },
  {
    id: 15,
    topic: "verbs",
    lesson: 4,
    type: "sentence-completion",
    difficulty: "medium",
    prompt: "Choose the correct form: Je ___ français.",
    options: ["parle", "parles", "parlons"],
    correct: 0,
    explanation: "With \"je\", the correct form is \"parle\"."
  },
  {
    id: 16,
    topic: "verbs",
    lesson: 4,
    type: "sentence-completion",
    difficulty: "medium",
    prompt: "Choose the correct form: Nous ___ à Paris.",
    options: ["habite", "habitons", "habitez"],
    correct: 1,
    explanation: "With \"nous\", the correct form is \"habitons\"."
  },
  {
    id: 17,
    topic: "verbs",
    lesson: 4,
    type: "sentence-completion",
    difficulty: "medium",
    prompt: "Choose the correct form: Tu ___ un chien.",
    options: ["as", "a", "avez"],
    correct: 0,
    explanation: "With \"tu\", the correct form is \"as\"."
  },
  {
    id: 18,
    topic: "verbs",
    lesson: 4,
    type: "multiple-choice",
    difficulty: "hard",
    prompt: "Why are être, avoir, and aller especially important?",
    options: [
      "They are rare and formal only",
      "They are used very often, even in later levels",
      "They are only used in writing"
    ],
    correct: 1,
    explanation: "These verbs are extremely common and remain important at every stage of learning French."
  },

  {
    id: 19,
    topic: "mixed",
    lesson: 2,
    type: "sentence-completion",
    difficulty: "hard",
    prompt: "Choose the best sentence:",
    options: [
      "Je suis un étudiant.",
      "Je suis étudiant.",
      "Je est étudiant."
    ],
    correct: 1,
    explanation: "\"Je suis étudiant.\" is the best and most natural basic sentence."
  },
  {
    id: 20,
    topic: "mixed",
    lesson: 4,
    type: "sentence-completion",
    difficulty: "hard",
    prompt: "Choose the correct sentence:",
    options: [
      "Nous allons à l'école.",
      "Nous allez à l'école.",
      "Nous vont à l'école."
    ],
    correct: 0,
    explanation: "With \"nous\", the correct form of aller is \"allons\"."
  }
]

export interface ExamAnswer {
  questionId: number
  selectedOption: number
  isCorrect: boolean
}

export interface TopicScore {
  topic: string
  correct: number
  total: number
  percentage: number
}

export function calculateTopicScores(answers: ExamAnswer[]): TopicScore[] {
  const topics = ['pronouns', 'articles', 'nouns', 'verbs', 'mixed'] as const
  
  return topics.map(topic => {
    const topicQuestions = examQuestions.filter(q => q.topic === topic)
    const topicAnswers = answers.filter(a => {
      const question = examQuestions.find(q => q.id === a.questionId)
      return question?.topic === topic
    })
    const correct = topicAnswers.filter(a => a.isCorrect).length
    
    return {
      topic: topic.charAt(0).toUpperCase() + topic.slice(1),
      correct,
      total: topicQuestions.length,
      percentage: Math.round((correct / topicQuestions.length) * 100)
    }
  })
}

export function getPerformanceLabel(score: number, total: number): {
  label: string
  color: string
  message: string
} {
  const percentage = (score / total) * 100
  
  if (percentage >= 90) {
    return {
      label: "Ready to move on",
      color: "text-green-600",
      message: "You're ready for the next step."
    }
  } else if (percentage >= 75) {
    return {
      label: "Good progress",
      color: "text-blue-600",
      message: "Nice work — you've completed the checkpoint."
    }
  } else if (percentage >= 50) {
    return {
      label: "Fair foundation",
      color: "text-amber-600",
      message: "You have a solid start. A quick review will make the next lessons easier."
    }
  } else {
    return {
      label: "Needs review",
      color: "text-red-600",
      message: "Take time to review the lessons. You'll build a stronger foundation."
    }
  }
}

export function getRecommendations(topicScores: TopicScore[]): string[] {
  const recommendations: string[] = []
  
  const weakTopics = topicScores.filter(t => t.percentage < 60)
  
  if (weakTopics.length === 0) {
    recommendations.push("Great job! You're ready to continue to the next unit.")
  } else {
    const verbsWeak = weakTopics.find(t => t.topic === 'Verbs')
    const nounsArticlesWeak = weakTopics.find(t => t.topic === 'Nouns' || t.topic === 'Articles')
    const pronounsWeak = weakTopics.find(t => t.topic === 'Pronouns')
    
    if (verbsWeak) {
      recommendations.push("Review Lesson 4: Essential Verbs and Present Tense")
    }
    if (nounsArticlesWeak) {
      recommendations.push("Review Lessons 1 & 3: Articles and Nouns")
    }
    if (pronounsWeak) {
      recommendations.push("Review Lesson 1: Subject Pronouns")
    }
  }
  
  return recommendations
}
