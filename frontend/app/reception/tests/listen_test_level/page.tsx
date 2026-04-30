"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FaPlay, FaPause, FaRedo, FaArrowRight, FaCheckCircle,
  FaTimes, FaHeadphones, FaVolumeUp, FaClock, FaStar,
  FaTrophy, FaChevronRight, FaWaveSquare
} from "react-icons/fa"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// =============================================================================
// TYPES & DATA
// =============================================================================

interface Question {
  id: number
  level_id: string
  transcript: string
  audioSrc: string
  question: string
  options: string[]
  correct: number
  instruction: string
  xp_reward: number
}

interface FeedbackMessage {
  id: number
  feedback_type: string
  skill: string
  messages_json: string
}

// const getLevelFromScore = (score: number): { level: string; message: string; color: string } => {
//   if (score <= 2) {
//     return {
//       level: "A0",
//       message: "Every expert was once a beginner. Let's start your journey! 🌱",
//       color: "from-green-400 to-emerald-500"
//     }
//   }
//   if (score <= 4) {
//     return {
//       level: "A1",
//       message: "Great start! You're building solid foundations. Keep going! 💪",
//       color: "from-blue-400 to-cyan-500"
//     }
//   }
//   if (score <= 6) {
//     return {
//       level: "A2",
//       message: "Nice progress! You can understand everyday French now. 🎉",
//       color: "from-purple-400 to-violet-500"
//     }
//   }
//   if (score === 7) {
//     return {
//       level: "B1",
//       message: "Impressive! Your listening skills are getting strong. 🌟",
//       color: "from-orange-400 to-amber-500"
//     }
//   }
//   return {
//     level: "B2",
//     message: "Excellent! You have advanced listening comprehension skills. 🏆",
//     color: "from-red-400 to-rose-500"
//   }
// }

const getFeedbackMessage = (isCorrect: boolean, feedbackData: FeedbackMessage[]): string => {
  const type = isCorrect ? "correct" : "incorrect"
  const feedback = feedbackData.find(f => f.feedback_type === type)
  
  if (feedback) {
    try {
      const messages = JSON.parse(feedback.messages_json)
      if (Array.isArray(messages) && messages.length > 0) {
        return messages[Math.floor(Math.random() * messages.length)]
      }
    } catch {
      // Fall through to defaults if JSON parsing fails
    }
  }
  
  // Fallback defaults
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
                ? "rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.08) 100%"
                : "rgba(34,197,94,0.08) 0%, rgba(59,130,246,0.05) 100%"
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
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-blue-400/15 to-purple-400/15"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
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

function QuizHeader({
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
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full">
            <FaHeadphones className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-700">Listening</span>
          </div>

          {/* XP display */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <FaStar className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-700">{score} XP</span>
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
            <span className="px-2 py-0.5 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-xs font-bold">
              {level}
            </span>
          </div>
          <span className="text-sm font-bold text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
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
// AUDIO PLAYER WITH WAVEFORM
// =============================================================================

function AudioPlayer({
  src,
  replaysLeft,
  onReplay,
  instruction
}: {
  src: string
  replaysLeft: number
  onReplay: () => void
  instruction: string
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const handlePlay = () => {
    if (audioRef.current && !hasStarted) {
      audioRef.current.play()
      setIsPlaying(true)
      setHasStarted(true)
    }
  }


  const handleEnded = () => {
    setIsPlaying(false)
  }

  const handleReplay = () => {
    if (replaysLeft > 0 && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
      onReplay()
    }
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 mb-6 border border-slate-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <audio ref={audioRef} src={src} onEnded={handleEnded} preload="auto" />

      {/* Waveform visualization */}
      <div className="flex items-center justify-center gap-1 h-12 mb-4">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-blue-500 rounded-full"
            animate={isPlaying ? {
              height: ["20%", "60%", "100%", "40%", "80%"],
            } : {
              height: "20%",
            }}
            transition={{
              duration: 0.4,
              repeat: isPlaying ? Infinity : 0,
              delay: i * 0.03,
              ease: "easeInOut",
            }}
            style={{ height: "20%" }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={handlePlay}
            disabled={hasStarted}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
              hasStarted
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/30"
            }`}
            whileHover={!hasStarted ? { scale: 1.1 } : {}}
            whileTap={!hasStarted ? { scale: 0.95 } : {}}
          >
            {isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5 ml-0.5" />}
          </motion.button>

          <div>
            <p className="font-semibold text-slate-800">
              {isPlaying ? "Playing..." : instruction}
            </p>
            <p className="text-xs text-slate-500">
              {replaysLeft} {replaysLeft === 1 ? "replay" : "replays"} remaining
            </p>
          </div>
        </div>

        <motion.button
          onClick={handleReplay}
          disabled={replaysLeft === 0 || isPlaying}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            replaysLeft === 0 || isPlaying
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-white text-slate-700 shadow-sm hover:shadow-md border border-slate-200"
          }`}
          whileHover={replaysLeft > 0 && !isPlaying ? { scale: 1.05 } : {}}
          whileTap={replaysLeft > 0 && !isPlaying ? { scale: 0.95 } : {}}
        >
          <FaRedo className="w-4 h-4" />
          <span>Replay</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

// =============================================================================
// ANSWER OPTION CARD
// =============================================================================

function AnswerOption({
  option,
  index,
  isSelected,
  isCorrect,
  showResult,
  onSelect
}: {
  option: string
  index: number
  isSelected: boolean
  isCorrect: boolean
  showResult: boolean
  onSelect: () => void
}) {
  const getStyles = () => {
    if (!showResult) {
      return isSelected
        ? "border-blue-500 bg-blue-50 text-blue-900 shadow-md"
        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
    }

    if (isCorrect) {
      return "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md"
    }

    if (isSelected && !isCorrect) {
      return "border-red-400 bg-red-50 text-red-900"
    }

    return "border-slate-200 bg-slate-50 text-slate-400"
  }

  return (
    <motion.button
      onClick={onSelect}
      disabled={showResult}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${getStyles()}`}
      whileHover={!showResult ? { scale: 1.02, y: -2 } : {}}
      whileTap={!showResult ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
          showResult
            ? isCorrect
              ? "bg-emerald-500 text-white"
              : isSelected
                ? "bg-red-400 text-white"
                : "bg-slate-200 text-slate-400"
            : isSelected
              ? "bg-blue-500 text-white"
              : "bg-slate-100 text-slate-600"
        }`}>
          {showResult ? (
            isCorrect ? <FaCheckCircle className="w-4 h-4" /> : isSelected ? <FaTimes className="w-4 h-4" /> : String.fromCharCode(65 + index)
          ) : (
            String.fromCharCode(65 + index)
          )}
        </div>
        <span className="font-medium">{option}</span>
      </div>
    </motion.button>
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
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(139,92,246,0.4)" }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{isLast ? "Writing Test" : "Next Question"}</span>
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

// function ResultsScreen({
//   score,
//   totalQuestions,
//   onRestart
// }: {
//   score: number
//   totalQuestions: number
//   onRestart: () => void
// }) {
//   const result = getLevelFromScore(score)

//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center px-4 py-8"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 text-center"
//         initial={{ opacity: 0, scale: 0.9, y: 30 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.6, type: "spring" }}
//       >
//         {/* Level badge */}
//         <motion.div
//           className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center shadow-xl`}
//           initial={{ scale: 0, rotate: -180 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//         >
//           <span className="text-4xl font-bold text-white">{result.level}</span>
//         </motion.div>

//         <motion.h2
//           className="text-2xl font-bold text-slate-900 mb-2"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           Your French Level
//         </motion.h2>

//         {/* Score */}
//         <motion.div
//           className="mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           <div className="text-5xl font-bold text-slate-800 mb-1">{score}/{totalQuestions}</div>
//           <p className="text-slate-500">correct answers</p>
//         </motion.div>

//         {/* XP earned */}
//         <motion.div
//           className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.5, type: "spring" }}
//         >
//           <FaStar className="w-5 h-5 text-amber-600" />
//           <span className="text-lg font-bold text-amber-700">+{score} XP Earned</span>
//         </motion.div>

//         {/* Progress bar */}
//         <motion.div
//           className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${(score / totalQuestions) * 100}%` }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             className={`h-full bg-gradient-to-r ${result.color} rounded-full`}
//           />
//         </motion.div>

//         {/* Message */}
//         <motion.p
//           className="text-slate-700 mb-8 leading-relaxed"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           {result.message}
//         </motion.p>

//         {/* Buttons */}
//         <motion.div
//           className="flex gap-3"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7 }}
//         >
//           <button
//             onClick={onRestart}
//             className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
//           >
//             Try Again
//           </button>
//           <Link href="/home" className="flex-1">
//             <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
//               Start Learning
//             </button>
//           </Link>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   )
// }

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ListenTestLevel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)

  // Reset score to 0 and clear localStorage on page load
  useEffect(() => {
    setScore(0)
    localStorage.removeItem('listening_test_score')
  }, [])

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('listening_test_score', score.toString())
  }, [score])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [feedback, setFeedback] = useState("")
  const router = useRouter()
  const [replaysLeft, setReplaysLeft] = useState(2)
  const [showTranscript, setShowTranscript] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [immediateQuestionFeedback, setImmediateQuestionFeedback] = useState<FeedbackMessage[]>([])

  const currentQuestion = questions[currentIndex]
  // console.log("Current question:", currentQuestion)
  const progress = ((currentIndex + (hasAnswered ? 1 : 0)) / questions.length) * 100

  useEffect(() => {
    setReplaysLeft(2)
    setShowTranscript(false)
  }, [currentIndex])

   useEffect(() => {
          const fetchReadingTest = async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/reception/listening-placement-tests`)
              const data = await response.json()
              // console.log(data.message)
              // return
              if (data.tests && Array.isArray(data.tests)) {
                // console.log("Reading tests from database:", data.tests)
                // Transform API data to match Question interface
                const transformedQuestions: Question[] = data.tests.map((test: any, index: number) => ({
                  id: test.id || index + 1,
                  level_id: test.level_id,
                  transcript: test.transcription,
                  audioSrc: `/${test.audio_path}`,
                  question: test.question,
                  options: JSON.parse(test.options_json || '[]'),
                  correct: parseInt(test.answer, 10),
                  instruction: test.instructions,
                  xp_reward: parseInt(test.xp_reward, 10)
                }))
                // console.log("Transformed questions:", transformedQuestions)
                setQuestions(transformedQuestions)
              } else {
                console.log("No reading tests found or error:", data.error)
              }
            } catch (error) {
              console.error("Failed to fetch reading tests:", error)
            }
          }
      
          fetchReadingTest()
        }, [])
  
    useEffect(() => {
      const fetchImmediateQuestionFeedback = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/reception/immediate-listen-question-feedback`)
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

  const handleReplay = () => {
    setReplaysLeft(prev => Math.max(0, prev - 1))
  }

  const handleSelectAnswer = (optionIndex: number) => {
    if (hasAnswered) return
    setSelectedAnswer(optionIndex)
    setHasAnswered(true)

    const correct = optionIndex === currentQuestion.correct
    setIsCorrect(correct)
    setFeedback(getFeedbackMessage(correct, immediateQuestionFeedback))

    if (correct) {
      setScore(score + currentQuestion.xp_reward)
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
      // Navigate to writing test after last question
      router.push("/reception/tests/write_test_level")
    }
  }

  // const handleRestart = () => {
  //   setCurrentIndex(0)
  //   setScore(0)
  //   setSelectedAnswer(null)
  //   setHasAnswered(false)
  //   setIsCorrect(null)
  //   setFeedback("")
  //   setReplaysLeft(3)
  //   setShowTranscript(false)
  // }

  // Loading state while questions fetch
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading questions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 font-sans overflow-x-hidden relative">
      <AnimatedBackground />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <QuizHeader
          currentQuestion={currentIndex + 1}
          totalQuestions={questions.length}
          progress={progress}
          score={score}
          level={currentQuestion.level_id}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Card */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Audio Player */}
              <AudioPlayer
                src={currentQuestion.audioSrc}
                replaysLeft={replaysLeft}
                onReplay={handleReplay}
                instruction={currentQuestion.instruction}
              /> 

              {/* Question */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-relaxed">
                {currentQuestion.question}
              </h2>

              {/* Transcript toggle */}
              {hasAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6"
                >
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    {showTranscript ? "Hide" : "Show"} transcript
                    <motion.div
                      animate={{ rotate: showTranscript ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronRight className="w-4 h-4 rotate-90" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showTranscript && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <p className="text-slate-700 italic">&ldquo;{currentQuestion.transcript}&rdquo;</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <AnswerOption
                    key={index}
                    option={option}
                    index={index}
                    isSelected={selectedAnswer === index}
                    isCorrect={index === currentQuestion.correct}
                    showResult={hasAnswered}
                    onSelect={() => handleSelectAnswer(index)}
                  />
                ))}
              </div>

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
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
