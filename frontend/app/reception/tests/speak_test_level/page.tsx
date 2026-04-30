/**
 * Speaking Test Level - French Speaking Assessment
 * ==================================================
 *
 * A fully gamified, interactive speaking exam experience that feels like
 * a guided conversation challenge rather than a traditional test.
 *
 * **Features:**
 * - MediaRecorder API for browser-based audio recording
 * - Animated microphone interface with pulse effects
 * - Playback and re-recording capabilities
 * - Progress tracking with gamified UI
 * - 8 questions with progressive difficulty (A0 → B2)
 * - Level badges and clear difficulty progression
 * - Encouraging feedback after each question
 * - XP and completion animations
 *
 * **Exam Structure:**
 * - 8 speaking questions with progressive difficulty
 * - Questions 1-2: A0 (Introduction basics)
 * - Questions 3-4: A1 (Simple descriptions)
 * - Questions 5-6: A2 (Opinions and scenarios)
 * - Question 7: B1 (Complex topics)
 * - Question 8: B2 (Advanced discussion)
 * - 20-40 seconds recommended per response
 *
 * **Gamification:**
 * - XP gain per completed question
 * - Progress milestones
 * - Streak indicator
 * - Completion celebrations
 */

"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FaMicrophone, FaStop, FaPlay, FaRedo, FaArrowRight,
  FaCheckCircle, FaVolumeUp, FaClock, FaStar,
  FaTrophy, FaRocket, FaChevronRight, FaHeadphones
} from "react-icons/fa"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// =============================================================================
// TYPES & DATA
// =============================================================================

interface Question {
  id: number
  level: string // Allow any level string from database
  theme: string
  question: string,
  explanation: string,
  example?: string
  suggestedTime: number
  xpReward: number
  tips?: string[] // For tips_json from database
}

// Speaking questions are now loaded dynamically from database

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
            width: `${100 + i * 30}px`,
            height: `${100 + i * 30}px`,
            left: `${10 + i * 22}%`,
            top: `${15 + (i % 2) * 35}%`,
            background: `linear-gradient(135deg, ${
              i % 2 === 0
                ? "rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.08) 100%"
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
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-purple-400/15 to-blue-400/15"
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

function SpeakingHeader({
  currentQuestion,
  totalQuestions,
  progress,
  totalXP,
  level
}: {
  currentQuestion: number
  totalQuestions: number
  progress: number
  totalXP: number
  level: string
}) {
  return (
    <motion.div
      className="mb-8"
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
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 rounded-full">
            <FaHeadphones className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-purple-700">Speaking</span>
          </div>

          {/* XP display */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <FaStar className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-amber-700">{totalXP} XP</span>
          </motion.div>
        </div>
      </div>

      {/* Progress section */}
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
          <span className="text-sm font-bold text-purple-600">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  )}
// PROMPT CARD
// =============================================================================
  
function PromptCard({ question }: { question: Question }) {
  const levelColors: Record<string, string> = {
    A0: "bg-green-100 text-green-700",
    A1: "bg-blue-100 text-blue-700",
    A2: "bg-purple-100 text-purple-700",
    B1: "bg-orange-100 text-orange-700",
    B2: "bg-red-100 text-red-700",
    C1: "bg-indigo-100 text-indigo-700",
    C2: "bg-pink-100 text-pink-700"
  }

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header with theme badge */}
      <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {question.theme}
          </span>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${levelColors[question.level]}`}>
              {question.level}
            </span>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <FaClock className="w-3.5 h-3.5" />
              <span>~{question.suggestedTime}s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Question */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-relaxed">
          {question.question}
        </h2>

        {/* Explanation */}
        <p className="text-slate-600 mb-4 leading-relaxed">
          {question.explanation}
        </p>

        {/* Example */}
        {question.example && (
          <motion.div
            className="p-4 bg-slate-50 rounded-xl border-l-4 border-purple-400"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Example</p>
            <p className="text-sm text-slate-600 italic">&ldquo;{question.example}&rdquo;</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// =============================================================================
// WAVEFORM VISUALIZER
// =============================================================================

function WaveformVisualizer({ isRecording }: { isRecording: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-rose-500 rounded-full"
          animate={isRecording ? {
            height: ["20%", "80%", "40%", "100%", "30%"],
          } : {
            height: "20%",
          }}
          transition={{
            duration: 0.5,
            repeat: isRecording ? Infinity : 0,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
          style={{ height: "20%" }}
        />
      ))}
    </div>
  )
}

// =============================================================================
// MICROPHONE RECORDER
// =============================================================================

function MicrophoneRecorder({
  onRecordingComplete,
  suggestedTime,
  tips
}: {
  onRecordingComplete: (blob: Blob, duration: number) => void
  suggestedTime: number
  tips?: string | string[] | null
}) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const recordingDurationRef = useRef<number>(0)

  // Request microphone permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach(track => track.stop())
        setHasPermission(true)
      } catch {
        setHasPermission(false)
      }
    }
    checkPermission()
  }, [])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const finalDuration = recordingDurationRef.current
        setRecordedBlob(audioBlob)
        onRecordingComplete(audioBlob, finalDuration)
        recordingDurationRef.current = 0
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      recordingDurationRef.current = 0

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
        recordingDurationRef.current += 1
      }, 1000)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setHasPermission(false)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const playRecording = () => {
    if (recordedBlob && !audioRef.current) {
      const audioUrl = URL.createObjectURL(recordedBlob)
      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onended = () => {
        setIsPlaying(false)
        audioRef.current = null
      }

      audio.onplay = () => setIsPlaying(true)
      audio.play()
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setIsPlaying(false)
        audioRef.current = null
      }
    }
  }

  const reRecord = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setRecordedBlob(null)
    setRecordingTime(0)
    setIsPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Permission denied state
  if (hasPermission === false) {
    return (
      <motion.div
        className="bg-red-50 rounded-2xl p-6 text-center border-2 border-red-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <FaMicrophone className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-red-700 mb-2">Microphone Access Needed</h3>
        <p className="text-red-600 text-sm mb-4">
          Please allow microphone access in your browser settings to complete the speaking test.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <WaveformVisualizer isRecording={isRecording} />

      {/* Recording controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {/* Record/Stop button */}
        <motion.button
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isRecording
              ? "bg-rose-500 shadow-rose-500/30"
              : "bg-gradient-to-r from-rose-500 to-red-500 shadow-rose-500/30"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isRecording ? {
            boxShadow: [
              "0 10px 15px -3px rgba(244,63,94,0.3)",
              "0 0 30px rgba(244,63,94,0.5)",
              "0 10px 15px -3px rgba(244,63,94,0.3)",
            ],
          } : {}}
          transition={{ boxShadow: { duration: 1.5, repeat: Infinity } }}
        >
          {isRecording ? (
            <FaStop className="w-6 h-6 text-white" />
          ) : (
            <FaMicrophone className="w-7 h-7 text-white" />
          )}
        </motion.button>

        {/* Play button (when recorded) */}
        {recordedBlob && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={playRecording}
            className="w-14 h-14 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <FaStop className="w-5 h-5" /> : <FaPlay className="w-5 h-5 ml-0.5" />}
          </motion.button>
        )}

        {/* Re-record button (when recorded) */}
        {recordedBlob && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={reRecord}
            className="w-14 h-14 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRedo className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Recording timer */}
      <div className="text-center mt-4">
        <div className={`text-2xl font-mono font-bold ${
          isRecording ? "text-rose-600" : "text-slate-600"
        }`}>
          {formatTime(recordingTime)}
        </div>
        <p className="text-sm text-slate-400 mt-1">
          {isRecording
            ? "Recording... Speak clearly!"
            : recordedBlob
              ? "Recording saved. You can play it back or re-record."
              : "Tap the microphone to start recording"}
        </p>
      </div>

      {/* Recording tips */}
      {!recordedBlob && !isRecording && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100"
        >
          <div className="flex items-start gap-2">
            <FaVolumeUp className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-700">Tips for best results:</p>
              <ul className="text-sm text-blue-600 mt-1 space-y-1">
                {tips && Array.isArray(tips) 
                  ? tips.map((tip: string, index: number) => (
                      <li key={index}>• {tip}</li>
                    ))
                  : (
                      <>
                        <li>• Speak clearly and at a natural pace</li>
                        <li>• Find a quiet environment</li>
                        <li>• Aim for {suggestedTime} seconds of speech</li>
                      </>
                    )}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// =============================================================================
// FEEDBACK CARD
// =============================================================================

function FeedbackCard({
  xpGained,
  onNext,
  isLast,
  feedbackMessage,
  isCorrect,
  transcription
}: {
  xpGained: number
  onNext: () => void
  isLast: boolean
  feedbackMessage?: string
  isCorrect?: boolean
  transcription?: string
}) {
  const displayMessage = feedbackMessage || "Great job! Keep practicing! 🎯"

  return (
    <motion.div
      className={`rounded-3xl shadow-lg shadow-slate-200/50 border p-6 mb-6 ${
        isCorrect
          ? "bg-emerald-50/50 border-emerald-200"
          : "bg-red-50/50 border-red-200"
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* XP animation */}
      <div className="text-center mb-4">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
        >
          <FaStar className="w-5 h-5 text-amber-500" />
          <span className="text-lg font-bold text-amber-700">+{xpGained} XP</span>
        </motion.div>
      </div>

      {/* Message */}
      <div className={`p-4 rounded-xl mb-4 ${
        isCorrect
          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
          : "bg-red-100 text-red-800 border border-red-200"
      }`}>
        <p className="text-center font-semibold">{displayMessage}</p>
        {transcription && (
          <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">What you said:</p>
            <p className="text-slate-800 font-medium italic">"{transcription}"</p>
          </div>
        )}
      </div>

      {/* Next button */}
      <motion.button
        onClick={onNext}
        className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(139,92,246,0.4)" }}
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

interface FeedbackItem {
  skill: string
  feedback_type: 'correct' | 'incorrect'
  messages_json: string
}

const getFeedbackMessage = (feedback: FeedbackItem[], questionType: string, isCorrect: boolean = true): string => {
  const speakingFeedback = feedback.find(f => f.skill === 'speaking' && f.feedback_type === (isCorrect ? 'correct' : 'incorrect'))
  if (speakingFeedback && speakingFeedback.messages_json) {
    try {
      const messages = JSON.parse(speakingFeedback.messages_json)
      if (Array.isArray(messages) && messages.length > 0) {
        return messages[Math.floor(Math.random() * messages.length)]
      }
    } catch (error) {
      console.error('Error parsing feedback messages:', error)
    }
  }
  
  // Fallback messages based on question type and correctness
  const fallbackMessages = {
    intro: {
      correct: "Excellent introduction! Your pronunciation was clear and confident. 🎤",
      incorrect: "Try your introduction again. Speak clearly and at a good pace. 🎤"
    },
    describe: {
      correct: "Great description! You used good vocabulary and structure. 📝",
      incorrect: "Keep practicing your description. Try to use more descriptive words. 📝"
    },
    opinion: {
      correct: "Good opinion! You expressed your thoughts clearly. 💭",
      incorrect: "Share your thoughts more clearly. Try to organize your ideas better. 💭"
    },
    scenario: {
      correct: "Well done on the scenario! You handled the situation well. 🎭",
      incorrect: "Try the scenario again. Think about the situation and respond appropriately. 🎭"
    }
  }
  
  const messageType = isCorrect ? 'correct' : 'incorrect'
  return fallbackMessages[questionType as keyof typeof fallbackMessages]?.[messageType] || "Great job! Keep practicing! 🎯"
}

// MAIN COMPONENT
// =============================================================================

export default function SpeakingTestLevel() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [recordings, setRecordings] = useState<Blob[]>([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [totalXP, setTotalXP] = useState(0)

  // Reset score to 0 and clear localStorage on page load
  useEffect(() => {
    setTotalXP(0)
    localStorage.removeItem('speaking_test_score')
  }, [])

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('speaking_test_score', totalXP.toString())
  }, [totalXP])
  const [immediateQuestionFeedback, setImmediateQuestionFeedback] = useState<any[]>([])
  const [speakingQuestions, setSpeakingQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [recordingDurations, setRecordingDurations] = useState<number[]>([])
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true)
  const [isEvaluating, setIsEvaluating] = useState(false)
  interface EvaluationResult {
  isCorrect: boolean
  feedback: string
  xpAwarded: number | undefined
  transcription: string
}

const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null)

  const currentQuestion = speakingQuestions[currentIndex]
  const progress = speakingQuestions.length > 0 ? ((currentIndex + (hasSubmitted ? 1 : 0)) / speakingQuestions.length) * 100 : 0

  useEffect(() => {
        const fetchSpeakingTest = async () => {
          setIsLoadingQuestions(true)
          try {
            const response = await fetch(`${API_BASE_URL}/reception/speaking-placement-tests`)
            const data = await response.json()
            
            if (data.tests && Array.isArray(data.tests)) {
              const questions: Question[] = data.tests.map((test: any, index: number) => ({
                id: test.id || index + 1,
                level: test.level_id,
                theme: test.theme,
                question: test.question_title,
                explanation: test.explanation,
                example: test.example,
                suggestedTime: test.time,
                xpReward: test.xp_reward,
                tips: JSON.parse(test.tips_json)
              }))
              setSpeakingQuestions(questions)
              setAnswers(Array(questions.length).fill(""))
            } else {
              console.log("No speaking tests found or error:", data.error)
              setSpeakingQuestions([])
            }
          } catch (error) {
            console.error("Failed to fetch speaking tests:", error)
            setSpeakingQuestions([])
          } finally {
            setIsLoadingQuestions(false)
          }
        }
    
        fetchSpeakingTest()
      }, [])

  useEffect(() => {
    const fetchImmediateQuestionFeedback = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reception/immediate-speak-question-feedback`)
        const data = await response.json()
        if (data.feedback && Array.isArray(data.feedback)) {
          setImmediateQuestionFeedback(data.feedback)
        }
      } catch (error) {
        // console.error("Failed to fetch immediate question feedback:", error)
      }
    }
    
    fetchImmediateQuestionFeedback()
  }, [])
  
  const handleRecordingComplete = (blob: Blob, duration: number) => {
    const newRecordings = [...recordings]
    newRecordings[currentIndex] = blob
    setRecordings(newRecordings)
    
    // Store recording duration for validation
    const newDurations = [...(recordingDurations || [])]
    newDurations[currentIndex] = duration
    setRecordingDurations(newDurations)
    
    // Reset submission state when re-recording
    setHasSubmitted(false)
    
    // Use the current recording time for validation
    // console.log(`Recording completed: ${duration}s for question ${currentIndex + 1}`)
  }

  const handleSubmit = async () => {
    // Validate minimum recording duration (80% of suggested time)
    const currentDuration = recordingDurations[currentIndex] || 0
    const minimumDuration = Math.floor(currentQuestion.suggestedTime * 0.8)
    
    // console.log(`Current recording duration: ${currentDuration}s, Minimum required: ${minimumDuration}s`)
    
    if (currentDuration < minimumDuration) {
      alert(`Recording is too short! Please record for at least ${minimumDuration} seconds. Current recording: ${currentDuration} seconds.`)
      return
    }
    
    setHasSubmitted(true)
    setIsEvaluating(true)
    
    // Call speaking test scoring API
    try {
      const formData = new FormData()
      const recordingBlob = recordings[currentIndex]
      if (recordingBlob) {
        formData.append('audio', recordingBlob, 'recording.webm')
        formData.append('question', currentQuestion.question)
        formData.append('instruction', currentQuestion.explanation)
        formData.append('level', currentQuestion.level)
        formData.append('questionType', currentQuestion.theme)
        formData.append('actualDuration', currentDuration.toString())
        formData.append('xpReward', currentQuestion.xpReward.toString())
        
        const response = await fetch(`${API_BASE_URL}/reception/speaking-test-scoring`, {
          method: 'POST',
          body: formData
        })
        
        if (response.ok) {
          const result = await response.json()
          console.log("the result is: " + JSON.stringify(result, null, 2))
          // Store evaluation result for feedback display
          setEvaluationResult(result)
          setIsEvaluating(false)
          // Handle scoring result here
          setTotalXP(prev => prev + (result?.xpAwarded !== undefined ? result.xpAwarded : currentQuestion.xpReward))
        } else {
          console.error('Scoring failed:', response.status)
          setIsEvaluating(false)
          setTotalXP(prev => prev + currentQuestion.xpReward)
        }
      }
    } catch (error) {
      console.error('Error submitting speaking test:', error)
      setIsEvaluating(false)
      setTotalXP(prev => prev + currentQuestion.xpReward)
    }
  }

  const handleNext = () => {
    if (currentIndex < speakingQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setHasSubmitted(false)
    } else {
      // Navigate to results page
      router.push('/reception/tests/results')
    }
  }

  // Loading state
if (isLoadingQuestions) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 font-sans overflow-x-hidden relative flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Speaking Test</h2>
        <p className="text-gray-500">Preparing your questions...</p>
      </div>
    </div>
  )
}

// Error state - no questions available
if (!speakingQuestions || speakingQuestions.length === 0) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 font-sans overflow-x-hidden relative flex items-center justify-center">
      <div className="text-center bg-white rounded-3xl shadow-lg p-8 max-w-md">
        <div className="text-6xl mb-4">Sorry! We couldn't load the speaking test questions. Please try refreshing the page or contact support if the problem persists.</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
}

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 font-sans overflow-x-hidden relative">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <SpeakingHeader
          currentQuestion={currentIndex + 1}
          totalQuestions={speakingQuestions.length}
          progress={progress}
          totalXP={totalXP}
          level={currentQuestion.level}
        />

        {/* Question content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Prompt card */}
            <PromptCard question={currentQuestion} />

        
            {/* Recorder */}
            <MicrophoneRecorder
              onRecordingComplete={handleRecordingComplete}
              suggestedTime={currentQuestion.suggestedTime}
              tips={currentQuestion.tips}
            />

            {/* Submit button (shown when recording exists and not yet submitted) */}
            {recordings[currentIndex] && !hasSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={handleSubmit}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(16,185,129,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCheckCircle className="w-5 h-5" />
                  <span>Submit Response</span>
                </motion.button>
              </motion.div>
            )}

            {/* Feedback card (shown after submission) */}
            {hasSubmitted && (
              <>
                {isEvaluating ? (
                  <motion.div
                    className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 mb-6"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-lg font-semibold text-slate-700">Getting your score...</p>
                    </div>
                  </motion.div>
                ) : (
                  <FeedbackCard
                    xpGained={evaluationResult?.xpAwarded || 0}
                    onNext={handleNext}
                    isLast={currentIndex === speakingQuestions.length - 1}
                    feedbackMessage={evaluationResult?.feedback || getFeedbackMessage(immediateQuestionFeedback, currentQuestion.theme, evaluationResult?.isCorrect)}
                    isCorrect={evaluationResult?.isCorrect}
                    transcription={evaluationResult?.transcription}
                  />
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
