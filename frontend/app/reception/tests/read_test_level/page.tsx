/**
 * Reading Test Level - Gamified French Reading Comprehension
 * =============================================================
 *
 * A fully gamified, interactive reading exam with two-zone layout:
 * - Left: Reading passage with comfortable typography
 * - Right: Question and answer area
 *
 * **Features:**
 * - Two-column responsive layout (stacked on mobile)
 * - Animated progress tracking with XP system
 * - Interactive answer cards with hover/tap feedback
 * - Color-coded feedback (green/red)
 * - Smooth Framer Motion transitions
 * - Gamified encouragement messages
 */

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FaBookOpen, FaArrowRight, FaCheckCircle, FaTimes,
  FaStar, FaTrophy, FaChevronRight, FaHighlighter
} from "react-icons/fa"

// =============================================================================
// TYPES & DATA
// =============================================================================

interface Question {
  id: number
  level: string
  passage: string
  question: string
  options: string[]
  correct: number
}

const questions: Question[] = [
  {
    id: 1,
    level: "A0",
    passage: "Bonjour",
    question: "What does \"Bonjour\" mean?",
    options: ["Goodbye", "Hello", "Please"],
    correct: 1
  },
  {
    id: 2,
    level: "A0",
    passage: "Café",
    question: "What does \"Café\" mean?",
    options: ["Coffee", "Car", "House"],
    correct: 0
  },
  {
    id: 3,
    level: "A1",
    passage: "Marie habite à Lyon.",
    question: "Where does Marie live?",
    options: ["Lyon", "Paris", "Rome"],
    correct: 0
  },
  {
    id: 4,
    level: "A1",
    passage: "Paul a 25 ans.",
    question: "How old is Paul?",
    options: ["20 years", "25 years", "30 years"],
    correct: 1
  },
  {
    id: 5,
    level: "A2",
    passage: "Sophie works in a café. She starts at 8am and finishes at 4pm. She likes talking with the customers.",
    question: "Why does Sophie like her job?",
    options: [
      "Because she earns a lot of money",
      "Because she talks with customers",
      "Because she works little"
    ],
    correct: 1
  },
  {
    id: 6,
    level: "A2",
    passage: "Sophie works in a café. She finishes at 4pm.",
    question: "What time does she finish?",
    options: ["8am", "12pm", "4pm"],
    correct: 2
  },
  {
    id: 7,
    level: "B1",
    passage: "Many people prefer living in the city because there are more activities and jobs available.",
    question: "Why do people prefer city life?",
    options: [
      "Because it's calm",
      "Because there are more opportunities",
      "Because it's cheaper"
    ],
    correct: 1
  },
  {
    id: 8,
    level: "B2",
    passage: "Social media allows us to communicate quickly, but they can also create addiction and spread unreliable information.",
    question: "Why should we be careful with social media?",
    options: [
      "Because they are always dangerous",
      "Because they are only useful",
      "Because they have positive and negative effects"
    ],
    correct: 2
  }
]

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
      message: "Nice progress! You can handle everyday French now. 🎉",
      color: "from-purple-400 to-violet-500"
    }
  }
  if (score === 7) {
    return {
      level: "B1",
      message: "Impressive! Your reading skills are getting strong. 🌟",
      color: "from-orange-400 to-amber-500"
    }
  }
  return {
    level: "B2",
    message: "Excellent! You have advanced reading comprehension skills. 🏆",
    color: "from-red-400 to-rose-500"
  }
}

const getFeedbackMessage = (isCorrect: boolean): string => {
  if (isCorrect) {
    const messages = ["Nice! 😏", "Good catch! 🔥", "Perfect! ✨", "Spot on! 🎯"]
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
// ANIMATED BACKGROUND
// =============================================================================

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            left: `${10 + i * 22}%`,
            top: `${15 + (i % 2) * 35}%`,
            background: `linear-gradient(135deg, ${
              i % 2 === 0
                ? "rgba(59,130,246,0.08) 0%, rgba(147,51,234,0.06) 100%"
                : "rgba(34,197,94,0.06) 0%, rgba(59,130,246,0.04) 100%"
            })`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

// =============================================================================
// HEADER COMPONENT
// =============================================================================

function ReadingHeader({
  currentQuestion,
  totalQuestions,
  progress,
  score,
  level
}: {
  currentQuestion: number
  totalQuestions: number
  progress: number
  score: number
  level: string
}) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/reception/tests">
          <motion.button
            className="text-slate-500 hover:text-slate-700 font-medium text-sm flex items-center gap-1 transition-colors"
            whileHover={{ x: -3 }}
          >
            <FaChevronRight className="w-4 h-4 rotate-180" />
            Back
          </motion.button>
        </Link>

        <div className="flex items-center gap-3">
          {/* Section badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 rounded-full">
            <FaBookOpen className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-700">Reading</span>
          </div>

          {/* XP display */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <FaStar className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-700">{score * 10} XP</span>
          </motion.div>
        </div>
      </div>

      {/* Progress card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-xs font-bold">
              {level}
            </span>
          </div>
          <span className="text-sm font-bold text-emerald-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// PASSAGE CARD
// =============================================================================

function PassageCard({ passage }: { passage: string }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden h-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header */}
      <div className="px-6 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <FaHighlighter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reading Text</span>
        </div>
      </div>

      {/* Passage content */}
      <div className="p-6">
        <p className="text-lg leading-relaxed text-slate-800 font-medium">
          {passage}
        </p>
      </div>

      {/* Reading tip */}
      <div className="px-6 py-3 bg-blue-50/50 border-t border-slate-100">
        <p className="text-xs text-blue-600">
          💡 Read carefully before selecting your answer
        </p>
      </div>
    </motion.div>
  )
}

// =============================================================================
// QUESTION CARD
// =============================================================================

function QuestionCard({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  hasAnswered,
  onSelect
}: {
  question: string
  options: string[]
  selectedAnswer: number | null
  correctAnswer: number
  hasAnswered: boolean
  onSelect: (index: number) => void
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Question */}
      <h2 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed">
        {question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === correctAnswer
          
          let buttonClass = "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 "
          
          if (hasAnswered) {
            if (isCorrect) {
              buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md"
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-red-400 bg-red-50 text-red-900"
            } else {
              buttonClass += "border-slate-200 bg-slate-50 text-slate-400"
            }
          } else {
            buttonClass += isSelected
              ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md"
              : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50"
          }

          return (
            <motion.button
              key={index}
              onClick={() => onSelect(index)}
              disabled={hasAnswered}
              className={buttonClass}
              whileHover={!hasAnswered ? { scale: 1.02, y: -2 } : {}}
              whileTap={!hasAnswered ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  hasAnswered
                    ? isCorrect
                      ? "bg-emerald-500 text-white"
                      : isSelected
                        ? "bg-red-400 text-white"
                        : "bg-slate-200 text-slate-400"
                    : isSelected
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-600"
                }`}>
                  {hasAnswered ? (
                    isCorrect ? <FaCheckCircle className="w-4 h-4" /> : 
                    isSelected ? <FaTimes className="w-4 h-4" /> : 
                    String.fromCharCode(65 + index)
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

// =============================================================================
// FEEDBACK CARD
// =============================================================================

function FeedbackCard({
  isCorrect,
  message,
  onNext,
  isLast
}: {
  isCorrect: boolean
  message: string
  onNext: () => void
  isLast: boolean
}) {
  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`p-4 rounded-xl mb-4 ${
        isCorrect
          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
          : "bg-red-100 text-red-800 border border-red-200"
      }`}>
        <p className="font-bold text-center text-lg">{message}</p>
      </div>

      <motion.button
        onClick={onNext}
        className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(16,185,129,0.4)" }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{isLast ? "See Results" : "Next Question"}</span>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FaArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

// =============================================================================
// RESULTS SCREEN
// =============================================================================

function ResultsScreen({
  score,
  totalQuestions,
  onRestart
}: {
  score: number
  totalQuestions: number
  onRestart: () => void
}) {
  const result = getLevelFromScore(score)

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 text-center"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Trophy icon */}
        <motion.div
          className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center shadow-xl`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="text-4xl font-bold text-white">{result.level}</span>
        </motion.div>

        <motion.h2
          className="text-2xl font-bold text-slate-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Your French Level
        </motion.h2>

        {/* Score */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-5xl font-bold text-slate-800 mb-1">{score}/{totalQuestions}</div>
          <p className="text-slate-500">correct answers</p>
        </motion.div>

        {/* XP earned */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <FaStar className="w-5 h-5 text-amber-600" />
          <span className="text-lg font-bold text-amber-700">+{score * 10} XP Earned</span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(score / totalQuestions) * 100}%` }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`h-full bg-gradient-to-r ${result.color} rounded-full`}
          />
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-slate-700 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {result.message}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
          >
            Try Again
          </button>
          <Link href="/home" className="flex-1">
            <button className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
              Start Learning
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ReadingTestLevel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [feedback, setFeedback] = useState("")

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + (hasAnswered ? 1 : 0)) / questions.length) * 100

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

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setHasAnswered(false)
    setIsCorrect(null)
    setShowResult(false)
    setFeedback("")
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 font-sans overflow-x-hidden relative">
        <AnimatedBackground />
        <ResultsScreen
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 font-sans overflow-x-hidden relative">
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <ReadingHeader
          currentQuestion={currentIndex + 1}
          totalQuestions={questions.length}
          progress={progress}
          score={score}
          level={currentQuestion.level}
        />

        {/* Two-zone layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Left: Reading Passage */}
            <div className="order-1">
              <PassageCard passage={currentQuestion.passage} />
            </div>

            {/* Right: Question & Answers */}
            <div className="order-2">
              <QuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedAnswer={selectedAnswer}
                correctAnswer={currentQuestion.correct}
                hasAnswered={hasAnswered}
                onSelect={handleSelectAnswer}
              />

              {/* Feedback */}
              <AnimatePresence>
                {hasAnswered && (
                  <FeedbackCard
                    isCorrect={isCorrect!}
                    message={feedback}
                    onNext={handleNext}
                    isLast={currentIndex === questions.length - 1}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
