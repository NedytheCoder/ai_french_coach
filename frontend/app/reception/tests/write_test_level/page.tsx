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
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FaPen, FaArrowRight, FaCheckCircle, FaLightbulb,
  FaStar, FaChevronRight, FaPencilAlt
} from "react-icons/fa"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// =============================================================================
// TYPES & DATA
// =============================================================================

interface Question {
  id: number
  level_id: string
  question: string
  question_text: string
  placeholder: string
  guide_json: string
  word_count: number
  xp_reward: number
}

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



const getFeedbackMessage = (feedback: any[], isCorrect: boolean): string => {
  const feedbackType = isCorrect ? 'correct' : 'incorrect'
  const feedbackItem = feedback.find(f => f.feedback_type === feedbackType && f.skill === 'writing')
  
  if (feedbackItem && feedbackItem.messages_json) {
    const messages = JSON.parse(feedbackItem.messages_json)
    return messages[Math.floor(Math.random() * messages.length)]
  }
  
  return isCorrect ? "Well done!" : "Keep trying! 💪"
}

const getValidationExplanation = (isCorrect: boolean): string => {
  return isCorrect 
    ? "Your answer meets the requirements. Great work!"
    : "Check your answer and try again. Look at the guidance for hints."
}

const validateAnswer = (question: Question, answer: string): boolean => {
  const trimmedAnswer = answer.trim()
  return trimmedAnswer.length > 0
}

const countWords = (text: string | undefined): number => {
  if (!text) return 0
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
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
  totalXP,
  level
}: {
  currentTask: number
  totalTasks: number
  progress: number
  score: number
  totalXP: number
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
            <span className="text-sm font-bold text-blue-700">{totalXP} XP</span>
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

function PromptCard({ prompt, text }: { prompt: string; text: string }) {
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
          <FaPen className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Writing Task
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
  isSubmitted,
  isCorrect,
  wordCount,
  minWords
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  isSubmitted: boolean
  isCorrect: boolean
  wordCount: number
  minWords: number
}) {
  const [isFocused, setIsFocused] = useState(false)
  
  const isShortInput = minWords === 0
  
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
          rows={6}
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
  minWords
}: {
  onClick: () => void
  disabled: boolean
  wordCount: number
  minWords: number
}) {
  const isShortInput = minWords === 0
  
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
        <span>{isLast ? "Speaking test" : "Next Task"}</span>
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
// MAIN COMPONENT
// =============================================================================

export default function WritingTestLevel() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [hasSubmitted, setHasSubmitted] = useState<boolean[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean[]>([])
  const [score, setScore] = useState(0)
  const [totalXP, setTotalXP] = useState(0)
  const [writingQuestions, setWritingQuestions] = useState<Question[]>([])
  const [immediateQuestionFeedback, setImmediateQuestionFeedback] = useState<any[]>([])
  const currentQuestion = writingQuestions[currentIndex]
  const progress = writingQuestions.length > 0 ? ((currentIndex + (hasSubmitted[currentIndex] ? 1 : 0)) / writingQuestions.length) * 100 : 0
  const currentAnswer = answers[currentIndex] || ""
  const currentSubmitted = hasSubmitted[currentIndex]
  const currentIsCorrect = isCorrect[currentIndex]
  const wordCount = countWords(currentAnswer)
  const minWords = currentQuestion?.word_count || 0

  useEffect(() => {
        const fetchWritingTest = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/reception/writing-placement-tests`)
            const data = await response.json()
            // console.log(data.message)
            // return
            if (data.tests && Array.isArray(data.tests)) {
              console.log("Writing tests from database:", data.tests)
              // Transform API data to match Question interface
              const transformedQuestions: Question[] = data.tests.map((test: any, index: number) => ({
                id: test.id || index + 1,
                level_id: test.level_id,
                question: test.question,
                question_text: test.question_text,
                placeholder: test.placeholder,
                guide_json: test.guide_json,
                word_count: test.word_count,
                xp_reward: parseInt(test.xp_reward, 10),
              }))
              setWritingQuestions(transformedQuestions)
              setAnswers(Array(transformedQuestions.length).fill(""))
              setHasSubmitted(Array(transformedQuestions.length).fill(false))
              setIsCorrect(Array(transformedQuestions.length).fill(false))
            } else {
              console.log("No writing tests found or error:", data.error)
            }
          } catch (error) {
            console.error("Failed to fetch writing tests:", error)
          }
        }
    
        fetchWritingTest()
      }, [])

  useEffect(() => {
    const fetchImmediateQuestionFeedback = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reception/immediate-write-question-feedback`)
        const data = await response.json()
        if (data.feedback && Array.isArray(data.feedback)) {
          setImmediateQuestionFeedback(data.feedback)
        }
      } catch (error) {
        console.error("Failed to fetch immediate question feedback:", error)
      }
    }
    
    fetchImmediateQuestionFeedback()
  }, [])

  const handleInputChange = (value: string) => {
    if (currentSubmitted) return
    const newAnswers = [...answers]
    newAnswers[currentIndex] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (currentSubmitted || currentAnswer.trim() === "") return
    
    // For longer tasks, check minimum word count
    // if (minWords > 0 && wordCount < minWords) {
    //   return // Don't allow submit if below minimum
    // }
    
    const correct = validateAnswer(currentQuestion, currentAnswer)
    
    const newSubmitted = [...hasSubmitted]
    newSubmitted[currentIndex] = true
    setHasSubmitted(newSubmitted)
    
    const newIsCorrect = [...isCorrect]
    newIsCorrect[currentIndex] = correct
    setIsCorrect(newIsCorrect)
    
    if (correct) {
      setScore(prev => prev + 1)
      setTotalXP(prev => prev + (currentQuestion?.xp_reward || 0))
    }
  }

  const handleNext = () => {
    if (currentIndex < writingQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      router.push('/reception/tests/speak_test_level')
    }
  }

  // Loading state while questions fetch
  if (writingQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading questions...</p>
        </div>
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
          totalTasks={writingQuestions.length}
          progress={progress}
          score={score}
          totalXP={totalXP}
          level={currentQuestion?.level_id || 'A0'}
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
                prompt={currentQuestion.question}
                text={currentQuestion.question_text}
              />
              
              <GuidanceCard guidance={JSON.parse(currentQuestion.guide_json || '[]')} />
            </div>

            {/* Right: Writing Area */}
            <div className="lg:col-span-3 order-2">
              <WritingArea
                value={currentAnswer}
                onChange={handleInputChange}
                placeholder={currentQuestion.placeholder}
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
                    disabled={currentAnswer.trim() === "" || (
                      minWords > 0 && wordCount < minWords
                    )}
                    wordCount={wordCount}
                    minWords={minWords}
                  />
                </div>
              )}

              {/* Feedback */}
              <AnimatePresence>
                {currentSubmitted && (
                  <FeedbackCard
                    isCorrect={currentIsCorrect}
                    message={getFeedbackMessage(immediateQuestionFeedback, currentIsCorrect)}
                    explanation={getValidationExplanation(currentIsCorrect)}
                    onNext={handleNext}
                    isLast={currentIndex === writingQuestions.length - 1}
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
