/**
 * Read Test Level - French Reading Comprehension Assessment
 * ===========================================================
 *
 * This page provides an interactive reading comprehension test to assess
 * the user's French level. Users read French text and answer multiple-choice
 * comprehension questions. The test progressively increases in difficulty
 * from A0 (complete beginner) to B2 (upper intermediate).
 *
 * **Test Structure:**
 * - 8 questions total (2 per CEFR level: A0, A1, A2, B1/B2)
 * - Progressive difficulty from basic vocabulary to complex texts
 * - Multiple choice answers (3 options per question)
 * - Immediate feedback with color-coded responses
 *
 * **Scoring System:**
 * - 0-2 correct: A0 (Beginner)
 * - 3-4 correct: A1 (Elementary)
 * - 5-6 correct: A2 (Pre-intermediate)
 * - 7 correct: B1 (Intermediate)
 * - 8 correct: B2 (Upper-intermediate)
 *
 * **Components:**
 * - TestLevel: Main quiz component managing state and flow
 * - Results Screen: Level badge, score, progress bar, motivational message
 * - Question Card: French text display with animated options
 *
 * **Features:**
 * - Framer Motion animations for smooth transitions between questions
 * - Color-coded feedback (green for correct, red for incorrect)
 * - Progress tracking with visual progress bar
 * - Level indicator showing current CEFR difficulty
 * - Restart option to retake the test
 * - Navigation to learning dashboard after completion
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
 * Question interface - defines the structure for each quiz question
 * @property id - unique identifier for the question
 * @property level - CEFR level (A0, A1, A2, B1, B2)
 * @property text - the question text in French
 * @property options - array of possible answer choices
 * @property correct - index of the correct answer in options array
 */
interface Question {
  id: number
  level: string
  text: string
  options: string[]
  correct: number
}

/**
 * Questions database - 8 progressive French reading comprehension questions
 * Organized by CEFR levels from A0 (beginner) to B2 (upper-intermediate)
 * Each question tests different aspects of French reading ability
 */
const questions: Question[] = [
  {
    id: 1,
    level: "A0",
    text: "Bonjour = ?",
    options: ["Goodbye", "Hello", "Please"],
    correct: 1
  },
  {
    id: 2,
    level: "A0",
    text: "Café = ?",
    options: ["Coffee", "Car", "House"],
    correct: 0
  },
  {
    id: 3,
    level: "A1",
    text: "Marie habite à Lyon. Où habite Marie ?",
    options: ["Lyon", "Paris", "Rome"],
    correct: 0
  },
  {
    id: 4,
    level: "A1",
    text: "Paul a 25 ans. Quel âge a Paul ?",
    options: ["20 ans", "25 ans", "30 ans"],
    correct: 1
  },
  {
    id: 5,
    level: "A2",
    text: "Sophie travaille dans un café. Elle commence à 8h et finit à 16h. Elle aime parler avec les clients. Pourquoi Sophie aime son travail ?",
    options: [
      "Parce qu'elle gagne beaucoup d'argent",
      "Parce qu'elle parle avec les clients",
      "Parce qu'elle travaille peu"
    ],
    correct: 1
  },
  {
    id: 6,
    level: "A2",
    text: "Sophie travaille dans un café. Elle finit à 16h. À quelle heure finit-elle ?",
    options: ["8h", "12h", "16h"],
    correct: 2
  },
  {
    id: 7,
    level: "B1",
    text: "Beaucoup de personnes préfèrent vivre en ville parce qu'il y a plus d'activités et d'emplois. Pourquoi ?",
    options: [
      "Parce que c'est calme",
      "Parce qu'il y a plus d'opportunités",
      "Parce que c'est moins cher"
    ],
    correct: 1
  },
  {
    id: 8,
    level: "B2",
    text: "Les réseaux sociaux permettent de communiquer rapidement, mais ils peuvent aussi créer une dépendance et diffuser des informations peu fiables. Pourquoi faut-il faire attention ?",
    options: [
      "Parce qu'ils sont toujours dangereux",
      "Parce qu'ils sont seulement utiles",
      "Parce qu'ils ont des effets positifs et négatifs"
    ],
    correct: 2
  }
]

/**
 * Determines the user's French level based on their score
 * @param score - number of correct answers (0-8)
 * @returns Object containing level label, motivational message, and color scheme
 * 
 * Scoring rubric:
 * - 0-2 correct: A0 (Beginner)
 * - 3-4 correct: A1 (Elementary)
 * - 5-6 correct: A2 (Pre-intermediate)
 * - 7 correct: B1 (Intermediate)
 * - 8 correct: B2 (Upper-intermediate)
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
      message: "Nice progress! You can handle everyday conversations now. 🎉",
      color: "from-purple-400 to-violet-500"
    }
  }
  if (score === 7) {
    return {
      level: "B1",
      message: "Impressive! You're becoming confident in French. 🌟",
      color: "from-orange-400 to-amber-500"
    }
  }
  return {
    level: "B2",
    message: "Excellent! You have strong reading comprehension skills. 🏆",
    color: "from-red-400 to-rose-500"
  }
}

/**
 * Generates encouraging feedback message based on answer correctness
 * @param isCorrect - whether the user selected the correct answer
 * @returns A randomized feedback message to keep the experience engaging
 */
const getFeedbackMessage = (isCorrect: boolean): string => {
  if (isCorrect) {
    const messages = ["Nice! 😏", "Too easy! 🔥", "Perfect! ✨", "Spot on! 🎯"]
    return messages[Math.floor(Math.random() * messages.length)]
  }
  const messages = [
    "Careful now... 🤔",
    "Almost! 💭",
    "Not quite! 📝",
    "Keep trying! 💪"
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

// =============================================================================
// MAIN READING TEST COMPONENT
// =============================================================================

/**
 * TestLevel - Main reading comprehension quiz component.
 *
 * Manages the complete test flow:
 * - 8 questions with progressive difficulty (A0 to B2)
 * - Answer selection with instant feedback
 * - Results screen with level determination
 * - Animated transitions between questions
 *
 * @returns JSX.Element - The reading test interface
 */
export default function TestLevel() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------

  // Current question index (0-7)
  const [currentIndex, setCurrentIndex] = useState(0)
  // Number of correct answers so far
  const [score, setScore] = useState(0)
  // Currently selected answer option (null if none selected)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  // Whether current question has been answered
  const [hasAnswered, setHasAnswered] = useState(false)
  // Whether the selected answer was correct (null if not answered)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  // Whether to show the results screen
  const [showResult, setShowResult] = useState(false)
  // Feedback message after answering (randomized encouraging message)
  const [feedback, setFeedback] = useState("")

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------

  // Current question data from questions array
  const currentQuestion = questions[currentIndex]
  // Progress percentage for progress bar (0-100)
  const progress = ((currentIndex + 1) / questions.length) * 100

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------

  /**
   * Handle answer selection.
   * Checks if answer is correct, updates score, shows feedback.
   * Prevents changing answer after selection.
   * @param optionIndex - index of the selected option (0-2)
   */
  const handleSelectAnswer = (optionIndex: number) => {
    if (hasAnswered) return
    setSelectedAnswer(optionIndex)
    setHasAnswered(true)
    
    const correct = optionIndex === currentQuestion.correct
    setIsCorrect(correct)
    setFeedback(getFeedbackMessage(correct))
    
    if (correct) {
      setScore(score + 1)
    }
  }

  /**
   * Handle next button click.
   * Advances to next question or shows results screen if last question.
   */
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setHasAnswered(false)
      setIsCorrect(null)
      setFeedback("")
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
    setScore(0)
    setSelectedAnswer(null)
    setHasAnswered(false)
    setIsCorrect(null)
    setShowResult(false)
    setFeedback("")
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  // Results screen - shown after all questions answered
  if (showResult) {
    const result = getLevelFromScore(score)
    const percentage = (score / questions.length) * 100

    return (
      // Full-screen container with gradient background
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
        {/* Animated results card with fade-in and scale animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 text-center"
        >
          {/* Animated level badge with spring bounce effect */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center`}
          >
            {/* Display CEFR level (A0, A1, A2, B1, or B2) */}
            <span className="text-4xl font-bold text-white">{result.level}</span>
          </motion.div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Your French Level
          </h2>
          
          {/* Score display - shows correct answers out of total */}
          <div className="mb-6">
            <div className="text-5xl font-bold text-slate-800 mb-1">
              {score}/{questions.length}
            </div>
            <p className="text-slate-500">correct answers</p>
          </div>

          {/* Animated progress bar - fills based on score percentage */}
          <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`h-full bg-gradient-to-r ${result.color} rounded-full`}
            />
          </div>

          {/* Motivational message based on user's level */}
          <p className="text-slate-700 mb-8 leading-relaxed">
            {result.message}
          </p>

          {/* Action buttons - restart quiz or go to learning dashboard */}
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

  // Main quiz interface - question card with French text and options
  return (
    // Full-screen container with soft gradient background
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
      {/* Main content wrapper - limits max width for readability */}
      <div className="w-full max-w-lg">
        {/* Header section - navigation and progress info */}
        <div className="mb-6">
          {/* Top row - back link and question counter */}
          <div className="flex items-center justify-between mb-4">
            <Link href="/home" className="text-slate-500 hover:text-slate-700 transition-colors text-sm">
              ← Back to Home
            </Link>
            <span className="text-sm font-medium text-slate-600">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          
          {/* Progress bar - visual indicator of quiz completion */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            />
          </div>
          
          {/* Level indicator badge - shows current CEFR level */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Level
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-bold">
              {currentQuestion.level}
            </span>
          </div>
        </div>

        {/* Question Card Container with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          {/* Animated card - slides in from right when question changes */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-8"
          >
            {/* Question text - displays French reading comprehension question */}
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-8 leading-relaxed">
              {currentQuestion.text}
            </h2>

            {/* Options container - displays 3 multiple choice buttons */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                // Dynamic styling based on answer state
                let buttonClass = "w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-all duration-200 "
                
                // Apply different styles based on whether question was answered and which option was selected
                if (hasAnswered) {
                  if (index === currentQuestion.correct) {
                    // Green styling for correct answer
                    buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900"
                  } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                    // Red styling for incorrect user selection
                    buttonClass += "border-red-400 bg-red-50 text-red-900"
                  } else {
                    // Gray styling for unselected options
                    buttonClass += "border-slate-200 bg-slate-50 text-slate-500"
                  }
                } else {
                  // Hover styling for options before selection
                  buttonClass += "border-slate-200 hover:border-purple-400 hover:bg-purple-50 text-slate-800 cursor-pointer"
                }

                return (
                  // Animated answer button with hover and tap effects
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={hasAnswered}
                    whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                    whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                    className={buttonClass}
                  >
                    {/* Answer option text */}
                    <span className="font-medium">{option}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback section - shows after user answers */}
            <AnimatePresence>
              {hasAnswered && (
                // Animated feedback container with fade-in effect
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6"
                >
                  {/* Feedback message with color based on correctness */}
                  <div className={`p-4 rounded-xl ${isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                    <p className="font-semibold text-center">{feedback}</p>
                  </div>
                  
                  {/* Next button - fades in after delay for user to read feedback */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleNext}
                    className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    {/* Dynamic button text - "Next Question" or "See Results" */}
                    {currentIndex < questions.length - 1 ? "Next Question →" : "See Results →"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Live score display - shows current correct answer count */}
        <div className="text-center mt-4">
          <span className="text-sm text-slate-500">
            Score: <span className="font-semibold text-slate-700">{score}</span> correct
          </span>
        </div>
      </div>
    </div>
  )
}
