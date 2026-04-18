/**
 * Writing Test Level - Gamified French Writing Assessment
 * =========================================================
 *
 * A fully gamified, guided writing exam with:
 * - Structure helpers to reduce blank-page anxiety
 * - Rich, comfortable writing space with focus effects
 * - Real-time word count with progress indicator
 * - Interactive guidance cards
 * - Smooth Framer Motion animations
 *
 * **Features:**
 * - Two-column layout: guidance left, writing right
 * - Word count progress bar
 * - Structure suggestions based on task type
 * - Encouragement messages during typing
 * - XP system and gamified feedback
 */

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FaPen, FaArrowRight, FaCheckCircle, FaLightbulb,
  FaStar, FaTrophy, FaChevronRight, FaPencilAlt,
  FaAlignLeft, FaParagraph, FaBook
} from "react-icons/fa"

// =============================================================================
// TYPES & DATA
// =============================================================================

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
  guidance?: string[]
}

const write_questions: Question[] = [
  {
    id: 1,
    level: "A0",
    type: "copy",
    prompt: "Copy the following word:",
    text: "Bonjour",
    placeholder: "Type 'Bonjour' here...",
    expectedAnswer: "Bonjour",
    validation: "non-empty",
    guidance: ["Look at the word carefully", "Type it exactly as shown", "Check your spelling"]
  },
  {
    id: 2,
    level: "A0",
    type: "fill",
    prompt: "Fill in the blank:",
    text: "Je m'appelle _____. J'ai 25 ans. J'habite à Paris.",
    placeholder: "Write the missing name...",
    expectedKeywords: ["Marie", "25", "Paris"],
    validation: "min-words-3",
    guidance: ["Read the sentence", "What's the missing name?", "The answer is 'Marie'"]
  },
  {
    id: 3,
    level: "A1",
    type: "short",
    prompt: "Write a sentence about yourself:",
    text: "Tell us your name and where you're from.",
    placeholder: "Example: My name is John. I am from London.",
    validation: "min-words-3",
    guidance: ["Start with your name", "Add where you're from", "Keep it simple!"]
  },
  {
    id: 4,
    level: "A1",
    type: "medium",
    prompt: "Describe your daily routine:",
    text: "Write 2-3 sentences about what you do every day.",
    placeholder: "I wake up at... Then I... After that...",
    validation: "min-words-10",
    guidance: ["Start with morning activities", "Add afternoon tasks", "Finish with evening routine"]
  },
  {
    id: 5,
    level: "A2",
    type: "long",
    prompt: "Write about your last vacation:",
    text: "Describe where you went, what you did, and how you felt.",
    placeholder: "Last summer, I went to... I visited... It was...",
    validation: "min-words-20",
    guidance: ["Where did you go?", "What did you do there?", "How was your experience?"]
  },
  {
    id: 6,
    level: "B1",
    type: "medium",
    prompt: "Write an email to a friend:",
    text: "Ask how they are and share your news.",
    placeholder: "Hi [name], How are you? I'm doing well...",
    validation: "min-words-15",
    guidance: ["Start with a greeting", "Ask about your friend", "Share your news", "End with a closing"]
  },
  {
    id: 7,
    level: "B1",
    type: "medium",
    prompt: "Write a book review:",
    text: "Choose a book and share your opinion about it.",
    placeholder: "I read [book title] by [author]. I think...",
    validation: "min-words-15",
    guidance: ["Name the book and author", "Give your opinion", "Explain why you liked/disliked it"]
  },
  {
    id: 8,
    level: "B2",
    type: "long",
    prompt: "Write about your favorite hobby:",
    text: "Explain why you enjoy it and how it enriches your life.",
    placeholder: "My favorite hobby is... I started when... It makes me feel...",
    validation: "min-words-30",
    guidance: ["Introduce your hobby", "When/how did you start?", "Why do you enjoy it?", "How does it benefit you?"]
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

const getFeedbackMessage = (taskIndex: number, isCorrect: boolean): string => {
  const messages = ["Nice start 😏", "Good job!", "You're warming up 🔥", "That works!", "Now it gets interesting...", "Keep going!", "Almost there!", "Great effort!"]
  
  if (!isCorrect) {
    return "Keep trying! Every attempt helps you learn 💪"
  }
  
  return messages[taskIndex] || "Well done!"
}

const validateAnswer = (question: Question, answer: string): boolean => {
  const trimmedAnswer = answer.trim()
  
  if (trimmedAnswer === "") return false
  
  switch (question.type) {
    case "copy":
      return trimmedAnswer.toLowerCase() === question.expectedAnswer?.toLowerCase()
    
    case "fill":
      if (question.expectedKeywords) {
        return question.expectedKeywords.some(keyword => 
          trimmedAnswer.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      return false
    
    case "short":
      if (question.expectedKeywords) {
        return question.expectedKeywords.some(keyword => 
          trimmedAnswer.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      return trimmedAnswer.length > 0
    
    case "medium":
    case "long":
      if (question.validation) {
        const wordCount = trimmedAnswer.split(/\s+/).length
        if (question.validation === "min-words-3") return wordCount >= 3
        if (question.validation === "min-words-5") return wordCount >= 5
        if (question.validation === "min-words-10") return wordCount >= 10
        if (question.validation === "min-words-15") return wordCount >= 15
        if (question.validation === "min-words-20") return wordCount >= 20
        if (question.validation === "min-words-30") return wordCount >= 30
      }
      return trimmedAnswer.length > 0
    
    default:
      return trimmedAnswer.length > 0
  }
}

const getValidationExplanation = (question: Question, isCorrect: boolean): string => {
  if (isCorrect) {
    switch (question.type) {
      case "copy": return "Perfect! You copied it exactly right."
      case "fill": return "Correct! That's the right answer."
      case "short": return "Good! That's a valid answer."
      case "medium": return "Nice! You wrote enough. Keep practicing!"
      case "long": return "Excellent! You expressed your ideas well."
      default: return "Good job!"
    }
  } else {
    switch (question.type) {
      case "copy": return `Try copying exactly: "${question.expectedAnswer}"`
      case "fill": return "Check the text again. What name is missing?"
      case "short": return "Please write a few words. Any answer is a good start!"
      case "medium":
      case "long":
        if (question.validation) {
          const minWords = question.validation.split("-")[2]
          return `Try writing at least ${minWords} words. You've got this!`
        }
        return "Please write a bit more to complete this task."
      default: return "Give it another try!"
    }
  }
}

const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

const getMinWords = (validation?: string): number => {
  if (!validation) return 0
  const match = validation.match(/min-words-(\d+)/)
  return match ? parseInt(match[1]) : 0
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
                ? "rgba(245,158,11,0.08) 0%, rgba(59,130,246,0.06) 100%"
                : "rgba(16,185,129,0.06) 0%, rgba(59,130,246,0.04) 100%"
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
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-amber-400/10 to-blue-400/10"
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

function WritingHeader({
  currentTask,
  totalTasks,
  progress,
  score,
  level
}: {
  currentTask: number
  totalTasks: number
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
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full">
            <FaPen className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-700">Writing</span>
          </div>

          {/* XP display */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <FaStar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-700">{score * 15} XP</span>
          </motion.div>
        </div>
      </div>

      {/* Progress card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">
              Task {currentTask} of {totalTasks}
            </span>
            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-xs font-bold">
              {level}
            </span>
          </div>
          <span className="text-sm font-bold text-amber-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-full"
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
// PROMPT CARD
// =============================================================================

function PromptCard({ prompt, text, type }: { prompt: string; text: string; type: string }) {
  const typeIcons = {
    copy: FaPencilAlt,
    fill: FaAlignLeft,
    short: FaPen,
    medium: FaParagraph,
    long: FaBook
  }
  
  const TypeIcon = typeIcons[type as keyof typeof typeIcons] || FaPen
  
  const typeLabels = {
    copy: "Copy Task",
    fill: "Fill in Blank",
    short: "Short Answer",
    medium: "Paragraph",
    long: "Essay Writing"
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header */}
      <div className="px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <TypeIcon className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            {typeLabels[type as keyof typeof typeLabels] || "Writing Task"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-3">
          {prompt}
        </h2>
        {text && (
          <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-amber-400">
            <p className="text-slate-700 font-medium text-lg leading-relaxed">
              {text}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// =============================================================================
// GUIDANCE CARD
// =============================================================================

function GuidanceCard({ guidance }: { guidance?: string[] }) {
  if (!guidance || guidance.length === 0) return null

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <FaLightbulb className="w-5 h-5 text-blue-500" />
        <span className="text-sm font-bold text-blue-700">Structure Guide</span>
      </div>
      
      <ul className="space-y-2">
        {guidance.map((step, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-2 text-sm text-slate-600"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span>{step}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

// =============================================================================
// WRITING AREA
// =============================================================================

function WritingArea({
  value,
  onChange,
  placeholder,
  type,
  isSubmitted,
  isCorrect,
  wordCount,
  minWords
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  type: string
  isSubmitted: boolean
  isCorrect: boolean
  wordCount: number
  minWords: number
}) {
  const [isFocused, setIsFocused] = useState(false)
  
  const isShortInput = type === "copy" || type === "fill" || type === "short"
  
  const getInputStyles = () => {
    if (isSubmitted) {
      return isCorrect
        ? "border-emerald-500 bg-emerald-50/50"
        : "border-red-400 bg-red-50/50"
    }
    return isFocused
      ? "border-amber-400 bg-white ring-4 ring-amber-100"
      : "border-slate-200 bg-slate-50 hover:border-amber-300"
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaPencilAlt className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Answer</span>
        </div>
        
        {/* Word counter for longer tasks */}
        {!isShortInput && minWords > 0 && (
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${
              wordCount >= minWords ? "text-emerald-600" : "text-slate-500"
            }`}>
              {wordCount} / {minWords} words
            </span>
            
            {/* Mini progress bar */}
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  wordCount >= minWords ? "bg-emerald-500" : "bg-amber-400"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((wordCount / minWords) * 100, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Input field */}
      {isShortInput ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={isSubmitted}
          className={`w-full p-4 rounded-xl border-2 text-lg transition-all duration-300 outline-none ${getInputStyles()}`}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={isSubmitted}
          rows={type === "medium" ? 4 : 6}
          className={`w-full p-4 rounded-xl border-2 text-lg leading-relaxed transition-all duration-300 outline-none resize-none ${getInputStyles()}`}
        />
      )}

      {/* Encouragement message */}
      {!isSubmitted && !isShortInput && wordCount > 0 && (
        <motion.div
          className="mt-3 text-sm text-amber-600 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={wordCount}
        >
          {wordCount < minWords * 0.3 && "💭 Good start, keep going!"}
          {wordCount >= minWords * 0.3 && wordCount < minWords * 0.6 && "✍️ You're making progress!"}
          {wordCount >= minWords * 0.6 && wordCount < minWords && "🔥 Almost there, keep writing!"}
          {wordCount >= minWords && "🎉 Great job! You've met the minimum."}
        </motion.div>
      )}
    </motion.div>
  )
}

// =============================================================================
// SUBMIT BUTTON
// =============================================================================

function SubmitButton({
  onClick,
  disabled,
  wordCount,
  minWords,
  type
}: {
  onClick: () => void
  disabled: boolean
  wordCount: number
  minWords: number
  type: string
}) {
  const isShortInput = type === "copy" || type === "fill" || type === "short"
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
        disabled
          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
          : "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl"
      }`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <span className="flex items-center justify-center gap-2">
        {!isShortInput && wordCount < minWords && wordCount > 0 ? (
          <>
            <span>Keep Writing</span>
            <span className="text-sm opacity-80">({minWords - wordCount} more words)</span>
          </>
        ) : (
          <>
            <FaCheckCircle className="w-5 h-5" />
            <span>Submit Answer</span>
          </>
        )}
      </span>
    </motion.button>
  )
}

// =============================================================================
// FEEDBACK CARD
// =============================================================================

function FeedbackCard({
  isCorrect,
  message,
  explanation,
  onNext,
  isLast
}: {
  isCorrect: boolean
  message: string
  explanation: string
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
      <div className={`p-5 rounded-xl mb-4 ${
        isCorrect
          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
          : "bg-red-100 text-red-800 border border-red-200"
      }`}>
        <p className="font-bold text-center text-lg mb-1">{message}</p>
        <p className="text-sm text-center opacity-80">{explanation}</p>
      </div>

      <motion.button
        onClick={onNext}
        className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(245,158,11,0.4)" }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{isLast ? "See Results" : "Next Task"}</span>
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
  totalTasks,
  onRestart
}: {
  score: number
  totalTasks: number
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
        {/* Level badge */}
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
          <div className="text-5xl font-bold text-slate-800 mb-1">{score}/{totalTasks}</div>
          <p className="text-slate-500">tasks completed correctly</p>
        </motion.div>

        {/* XP earned */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <FaStar className="w-5 h-5 text-blue-600" />
          <span className="text-lg font-bold text-blue-700">+{score * 15} XP Earned</span>
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
            animate={{ width: `${(score / totalTasks) * 100}%` }}
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
            <button className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all">
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

export default function WritingTestLevel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(write_questions.length).fill(""))
  const [hasSubmitted, setHasSubmitted] = useState<boolean[]>(Array(write_questions.length).fill(false))
  const [isCorrect, setIsCorrect] = useState<boolean[]>(Array(write_questions.length).fill(false))
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = write_questions[currentIndex]
  const progress = ((currentIndex + (hasSubmitted[currentIndex] ? 1 : 0)) / write_questions.length) * 100
  const currentAnswer = answers[currentIndex]
  const currentSubmitted = hasSubmitted[currentIndex]
  const currentIsCorrect = isCorrect[currentIndex]
  const wordCount = countWords(currentAnswer)
  const minWords = getMinWords(currentQuestion.validation)

  const handleInputChange = (value: string) => {
    if (currentSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (currentSubmitted || currentAnswer.trim() === "") return
    
    // For longer tasks, check minimum word count
    if (minWords > 0 && wordCount < minWords) {
      return // Don't allow submit if below minimum
    }
    
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

  const handleNext = () => {
    if (currentIndex < write_questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setAnswers(Array(write_questions.length).fill(""))
    setHasSubmitted(Array(write_questions.length).fill(false))
    setIsCorrect(Array(write_questions.length).fill(false))
    setShowResult(false)
    setScore(0)
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 font-sans overflow-x-hidden relative">
        <AnimatedBackground />
        <ResultsScreen
          score={score}
          totalTasks={write_questions.length}
          onRestart={handleRestart}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 font-sans overflow-x-hidden relative">
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <WritingHeader
          currentTask={currentIndex + 1}
          totalTasks={write_questions.length}
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
            className="grid lg:grid-cols-5 gap-6"
          >
            {/* Left: Prompt & Guidance */}
            <div className="lg:col-span-2 order-1">
              <PromptCard
                prompt={currentQuestion.prompt}
                text={currentQuestion.text}
                type={currentQuestion.type}
              />
              
              <GuidanceCard guidance={currentQuestion.guidance} />
            </div>

            {/* Right: Writing Area */}
            <div className="lg:col-span-3 order-2">
              <WritingArea
                value={currentAnswer}
                onChange={handleInputChange}
                placeholder={currentQuestion.placeholder}
                type={currentQuestion.type}
                isSubmitted={currentSubmitted}
                isCorrect={currentIsCorrect}
                wordCount={wordCount}
                minWords={minWords}
              />

              {/* Submit button (only when not submitted) */}
              {!currentSubmitted && (
                <div className="mt-4">
                  <SubmitButton
                    onClick={handleSubmit}
                    disabled={currentAnswer.trim() === "" || (minWords > 0 && wordCount < minWords)}
                    wordCount={wordCount}
                    minWords={minWords}
                    type={currentQuestion.type}
                  />
                </div>
              )}

              {/* Feedback */}
              <AnimatePresence>
                {currentSubmitted && (
                  <FeedbackCard
                    isCorrect={currentIsCorrect}
                    message={getFeedbackMessage(currentIndex, currentIsCorrect)}
                    explanation={getValidationExplanation(currentQuestion, currentIsCorrect)}
                    onNext={handleNext}
                    isLast={currentIndex === write_questions.length - 1}
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
