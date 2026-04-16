/**
 * Write Test Level - French Writing Skills Assessment
 * ======================================================
 *
 * This page provides an interactive writing test to assess the user's French
 * writing skills. Users complete various writing tasks ranging from simple
 * copying to essay writing. The test progressively increases in difficulty
 * from A0 (complete beginner) to B2 (upper intermediate).
 *
 * **Test Structure:**
 * - 8 writing tasks total with progressive difficulty
 * - Task types by level:
 *   - A0: Copy (exact word copying), Fill (complete sentences)
 *   - A1: Short sentence writing, Medium paragraph writing
 *   - A2: Long story/essay writing
 *   - B1: Email writing, Book review writing
 *   - B2: Extended essay writing
 *
 * **Scoring System:**
 * - 0-2 correct: A0 (Beginner)
 * - 3-4 correct: A1 (Elementary)
 * - 5-6 correct: A2 (Pre-intermediate)
 * - 7 correct: B1 (Intermediate)
 * - 8 correct: B2 (Upper-intermediate)
 *
 * **Validation Types:**
 * - copy: Exact match validation (case-insensitive)
 * - fill: Keyword matching in answer
 * - short/medium/long: Word count validation
 *
 * **Components:**
 * - WritingTestLevel: Main quiz component managing state and flow
 * - Results Screen: Level badge, score, progress bar, motivational message
 * - Writing Card: Task prompt, text input, word counter, submit/feedback
 *
 * **Features:**
 * - Dynamic input fields (text input for short tasks, textarea for long)
 * - Real-time word counter for medium/long tasks
 * - Color-coded feedback (green for correct, red for incorrect)
 * - Detailed validation explanations
 * - Restart option to retake the test
 */

"use client"

// =============================================================================
// IMPORTS
// =============================================================================

// React state hook for quiz management
import { useState } from "react"
// Animation library for smooth transitions and interactions
import { motion, AnimatePresence } from "framer-motion"
// Next.js navigation for results CTA and back link
import Link from "next/link"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * Question interface for writing test
 * @property id - unique identifier for the question
 * @property level - CEFR level (A0, A1, A2, B1, B2)
 * @property type - type of writing task (copy, fill, short, medium, long)
 * @property prompt - instructions for the user
 * @property text - additional text or context for the question
 * @property placeholder - placeholder text for input field
 * @property expectedAnswer - exact answer expected (for copy type)
 * @property expectedKeywords - keywords that should be in answer (for fill type)
 * @property validation - validation rule (non-empty, min-words-X)
 */
interface Question {
  id: number
  level: string
  type: "copy" | "fill" | "short" | "medium" | "long"
  prompt: string
  text: string
  placeholder: string
  expectedAnswer?: string
  expectedKeywords?: string[]
  validation?: string
}

const write_questions: Question[] = [
  {
    id: 1,
    level: "A0",
    type: "copy",
    prompt: "Copy the following word:",
    text: "Bonjour",
    placeholder: "Type 'Bonjour'",
    expectedAnswer: "Bonjour",
    validation: "non-empty"
  },
  {
    id: 2,
    level: "A0",
    type: "fill",
    prompt: "Fill in the blank with the correct word:",
    text: "Je m'appelle Marie. J'ai 25 ans. J'habite à Paris.",
    placeholder: "Enter your name",
    expectedKeywords: ["Marie", "25", "Paris"],
    validation: "min-words-3"
  },
  {
    id: 3,
    level: "A1",
    type: "short",
    prompt: "Write a short sentence about yourself:",
    text: "Example: I live in France.",
    placeholder: "Write your sentence...",
    validation: "min-words-2"
  },
  {
    id: 4,
    level: "A1",
    type: "medium",
    prompt: "Write a paragraph about your daily routine:",
    text: "Example: I wake up at 7 AM. I eat breakfast. I go to work.",
    placeholder: "Write your paragraph...",
    validation: "min-words-10"
  },
  {
    id: 5,
    level: "A2",
    type: "long",
    prompt: "Write a short story about your last vacation:",
    text: "Example: Last summer, I went to Spain. I visited Barcelona...",
    placeholder: "Write your story...",
    validation: "min-words-20"
  },
  {
    id: 6,
    level: "B1",
    type: "short",
    prompt: "Write a short email to a friend:",
    text: "Example: Hi Sarah, How are you? I'm doing well...",
    placeholder: "Write your email...",
    validation: "min-words-5"
  },
  {
    id: 7,
    level: "B1",
    type: "medium",
    prompt: "Write a review of a book you read:",
    text: "Example: I read 'The Alchemist' by Paulo Coelho. It was amazing...",
    placeholder: "Write your review...",
    validation: "min-words-15"
  },
  {
    id: 8,
    level: "B2",
    type: "long",
    prompt: "Write an essay about your favorite hobby:",
    text: "Example: My favorite hobby is reading. I love books...",
    placeholder: "Write your essay...",
    validation: "min-words-30"
  }
]

/**
 * Determines user's French level based on writing test score
 * @param score - number of correct answers (0-8)
 * @returns Object with level, motivational message, and color scheme
 */
const getLevelFromScore = (score: number): { level: string; message: string; color: string } => {
  if (score <= 2) {
    return {
      level: "A0",
      message: "Every expert was once a beginner. Let's start your journey! 🌱",
      color: "from-green-400 to-emerald-500"
    }
  }
  if (score <= 4) {
    return {
      level: "A1",
      message: "Great start! You're building solid foundations. Keep going! 💪",
      color: "from-blue-400 to-cyan-500"
    }
  }
  if (score <= 6) {
    return {
      level: "A2",
      message: "Nice progress! You can express yourself in French now. 🎉",
      color: "from-purple-400 to-violet-500"
    }
  }
  if (score === 7) {
    return {
      level: "B1",
      message: "Impressive! Your writing skills are getting strong. 🌟",
      color: "from-orange-400 to-amber-500"
    }
  }
  return {
    level: "B2",
    message: "Excellent! You have advanced writing skills. 🏆",
    color: "from-red-400 to-rose-500"
  }
}

/**
 * Generates encouraging feedback message based on task progression
 * @param taskIndex - current task number (0-7)
 * @param isCorrect - whether the answer passed validation
 * @returns Encouraging message for the user
 */
const getFeedbackMessage = (taskIndex: number, isCorrect: boolean): string => {
  const messages = [
    "Nice start 😏",
    "Good job!",
    "You're warming up 🔥",
    "That works!",
    "Now it gets interesting...",
    "Keep going!",
    "Almost there!",
    "Great effort!"
  ]
  
  if (!isCorrect) {
    return "Keep trying! Every attempt helps you learn 💪"
  }
  
  return messages[taskIndex] || "Well done!"
}

/**
 * Validates user answer based on question type and validation rules
 * @param question - the question being answered
 * @param answer - user's submitted answer
 * @returns boolean indicating if answer is correct
 */
const validateAnswer = (question: Question, answer: string): boolean => {
  const trimmedAnswer = answer.trim()
  
  if (trimmedAnswer === "") return false
  
  switch (question.type) {
    case "copy":
      // Exact match, case-insensitive, ignoring leading/trailing spaces
      return trimmedAnswer.toLowerCase() === question.expectedAnswer?.toLowerCase()
    
    case "fill":
      // Check if answer contains expected keywords (case-insensitive)
      if (question.expectedKeywords) {
        return question.expectedKeywords.some(keyword => 
          trimmedAnswer.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      return false
    
    case "short":
      // Check expected keywords or non-empty validation
      if (question.expectedKeywords) {
        return question.expectedKeywords.some(keyword => 
          trimmedAnswer.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      return trimmedAnswer.length > 0
    
    case "medium":
    case "long":
      // Word count validation
      if (question.validation) {
        const wordCount = trimmedAnswer.split(/\s+/).length
        if (question.validation === "min-words-3") return wordCount >= 3
        if (question.validation === "min-words-5") return wordCount >= 5
        if (question.validation === "min-words-12") return wordCount >= 12
        if (question.validation === "min-words-20") return wordCount >= 20
      }
      return trimmedAnswer.length > 0
    
    default:
      return trimmedAnswer.length > 0
  }
}

/**
 * Gets explanation for why answer passed or failed
 * @param question - the question being answered
 * @param isCorrect - whether the answer was correct
 * @returns Explanation string
 */
const getValidationExplanation = (question: Question, isCorrect: boolean): string => {
  if (isCorrect) {
    switch (question.type) {
      case "copy":
        return "Perfect! You copied it exactly right."
      case "fill":
        return "Correct! That's the right word."
      case "short":
        return "Good! That's a valid answer."
      case "medium":
        return "Nice! You wrote enough. Keep practicing!"
      case "long":
        return "Excellent! You expressed your ideas well."
      default:
        return "Good job!"
    }
  } else {
    switch (question.type) {
      case "copy":
        return `Try copying exactly: "${question.expectedAnswer}"`
      case "fill":
        return "The missing word is 'appelle'. Try again!"
      case "short":
        return "Please write something - any answer is a good start!"
      case "medium":
      case "long":
        if (question.validation) {
          const minWords = question.validation.split("-")[2]
          return `Try writing at least ${minWords} words. You've got this!`
        }
        return "Please write a bit more to complete this task."
      default:
        return "Give it another try!"
    }
  }
}

/**
 * Counts words in a string
 * @param text - text to count words in
 * @returns number of words
 */
const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

// =============================================================================
// MAIN WRITING TEST COMPONENT
// =============================================================================

/**
 * WritingTestLevel - Main writing skills quiz component.
 *
 * Manages the complete test flow:
 * - 8 writing tasks with progressive difficulty (A0 to B2)
 * - Text input with validation (exact match, keywords, word count)
 * - Results screen with level determination
 * - Animated transitions between tasks
 *
 * @returns JSX.Element - The writing test interface
 */
export default function WritingTestLevel() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------

  // Current task index (0-7)
  const [currentIndex, setCurrentIndex] = useState(0)
  // User's answers for all tasks
  const [answers, setAnswers] = useState<string[]>(Array(write_questions.length).fill(""))
  // Whether each task has been submitted
  const [hasSubmitted, setHasSubmitted] = useState<boolean[]>(Array(write_questions.length).fill(false))
  // Whether each submitted answer was correct
  const [isCorrect, setIsCorrect] = useState<boolean[]>(Array(write_questions.length).fill(false))
  // Whether to show the results screen
  const [showResult, setShowResult] = useState(false)
  // Number of correct answers so far
  const [score, setScore] = useState(0)

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------

  // Current question data from write_questions array
  const currentQuestion = write_questions[currentIndex]
  // Progress percentage for progress bar (0-100)
  const progress = ((currentIndex + 1) / write_questions.length) * 100
  // Current task's answer
  const currentAnswer = answers[currentIndex]
  // Whether current task has been submitted
  const currentSubmitted = hasSubmitted[currentIndex]
  // Whether current submitted answer was correct
  const currentIsCorrect = isCorrect[currentIndex]

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------

  /**
   * Handle text input changes.
   * Updates answer state for current task.
   * Disabled after submission to prevent changes.
   * @param value - new input value
   */
  const handleInputChange = (value: string) => {
    if (currentSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = value
    setAnswers(newAnswers)
  }

  /**
   * Handle submit button click.
   * Validates answer using validateAnswer function.
   * Updates submission state and score.
   * Shows feedback after validation.
   */
  const handleSubmit = () => {
    if (currentSubmitted || currentAnswer.trim() === "") return
    
    const correct = validateAnswer(currentQuestion, currentAnswer)
    
    const newSubmitted = [...hasSubmitted]
    newSubmitted[currentIndex] = true
    setHasSubmitted(newSubmitted)
    
    const newIsCorrect = [...isCorrect]
    newIsCorrect[currentIndex] = correct
    setIsCorrect(newIsCorrect)
    
    if (correct) {
      setScore(prev => prev + 1)
    }
  }

  /**
   * Handle next button click.
   * Advances to next task or shows results screen if last task.
   */
  const handleNext = () => {
    if (currentIndex < write_questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  /**
   * Handle restart button click.
   * Resets all state to initial values to start quiz from beginning.
   */
  const handleRestart = () => {
    setCurrentIndex(0)
    setAnswers(Array(write_questions.length).fill(""))
    setHasSubmitted(Array(write_questions.length).fill(false))
    setIsCorrect(Array(write_questions.length).fill(false))
    setShowResult(false)
    setScore(0)
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  // Results screen - shown after all tasks completed
  if (showResult) {
    const result = getLevelFromScore(score)

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 text-center"
        >
          {/* Level badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center`}
          >
            <span className="text-4xl font-bold text-white">{result.level}</span>
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Your French Level
          </h2>
          
          {/* Score */}
          <div className="mb-6">
            <div className="text-5xl font-bold text-slate-800 mb-1">
              {score}/{write_questions.length}
            </div>
            <p className="text-slate-500">tasks completed correctly</p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / write_questions.length) * 100}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`h-full bg-gradient-to-r ${result.color} rounded-full`}
            />
          </div>

          {/* Motivational message */}
          <p className="text-slate-700 mb-8 leading-relaxed">
            {result.message}
          </p>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/home"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all text-center"
            >
              Start Learning
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  // Main quiz interface - writing task card with input and feedback
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/home" className="text-slate-500 hover:text-slate-700 transition-colors text-sm">
              ← Back to Home
            </Link>
            <span className="text-sm font-medium text-slate-600">
              Task {currentIndex + 1} of {write_questions.length}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            />
          </div>
          
          {/* Level indicator */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Level
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-bold">
              {currentQuestion.level}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-8"
          >
            {/* Prompt */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">
                {currentQuestion.prompt}
              </h2>
              {currentQuestion.text && (
                <p className="text-lg text-slate-700 font-medium">
                  {currentQuestion.text}
                </p>
              )}
            </div>

            {/* Input field */}
            <div className="mb-4">
              {currentQuestion.type === "copy" || currentQuestion.type === "fill" || currentQuestion.type === "short" ? (
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  disabled={currentSubmitted}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                    currentSubmitted
                      ? currentIsCorrect
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-red-400 bg-red-50"
                      : "border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  }`}
                />
              ) : (
                <textarea
                  value={currentAnswer}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  disabled={currentSubmitted}
                  rows={currentQuestion.type === "medium" ? 3 : 5}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 resize-none ${
                    currentSubmitted
                      ? currentIsCorrect
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-red-400 bg-red-50"
                      : "border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  }`}
                />
              )}
              
              {/* Word counter for medium/long tasks */}
              {(currentQuestion.type === "medium" || currentQuestion.type === "long") && (
                <div className="text-right mt-2">
                  <span className={`text-sm ${
                    currentSubmitted && !currentIsCorrect ? "text-red-500" : "text-slate-400"
                  }`}>
                    {countWords(currentAnswer)} word{countWords(currentAnswer) !== 1 ? "s" : ""}
                    {currentQuestion.validation && ` (min ${currentQuestion.validation.split("-")[2]} required)`}
                  </span>
                </div>
              )}
            </div>

            {/* Submit button */}
            {!currentSubmitted && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleSubmit}
                disabled={currentAnswer.trim() === ""}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all ${
                  currentAnswer.trim() === ""
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30"
                }`}
              >
                Submit Answer
              </motion.button>
            )}

            {/* Feedback */}
            <AnimatePresence>
              {currentSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6"
                >
                  {/* Feedback message */}
                  <div className={`p-4 rounded-xl mb-4 ${
                    currentIsCorrect ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                  }`}>
                    <p className="font-semibold text-center mb-1">
                      {getFeedbackMessage(currentIndex, currentIsCorrect)}
                    </p>
                    <p className="text-sm text-center">
                      {getValidationExplanation(currentQuestion, currentIsCorrect)}
                    </p>
                  </div>
                  
                  {/* Next button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleNext}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    {currentIndex < write_questions.length - 1 ? "Next Task →" : "See Results →"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Score mini display */}
        <div className="text-center mt-4">
          <span className="text-sm text-slate-500">
            Score: <span className="font-semibold text-slate-700">{score}</span> correct
          </span>
        </div>
      </div>
    </div>
  )
}
