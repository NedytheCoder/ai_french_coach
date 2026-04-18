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
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FaMicrophone, FaStop, FaPlay, FaRedo, FaArrowRight,
  FaCheckCircle, FaVolumeUp, FaClock, FaStar,
  FaTrophy, FaRocket, FaChevronRight, FaHeadphones
} from "react-icons/fa"

// =============================================================================
// TYPES & DATA
// =============================================================================

interface SpeakingQuestion {
  id: number
  level: "A0" | "A1" | "A2" | "B1" | "B2"
  type: "intro" | "describe" | "opinion" | "react" | "scenario"
  prompt: string
  instruction: string
  example?: string
  suggestedTime: number
  xpReward: number
}

const speakingQuestions: SpeakingQuestion[] = [
  {
    id: 1,
    level: "A0",
    type: "intro",
    prompt: "Présentez-vous en quelques phrases.",
    instruction: "Parlez de votre nom et d'où vous venez. Parlez pendant 20-30 secondes.",
    example: "Bonjour, je m'appelle... Je viens de...",
    suggestedTime: 30,
    xpReward: 50
  },
  {
    id: 2,
    level: "A0",
    type: "describe",
    prompt: "Décrivez votre famille.",
    instruction: "Parlez des membres de votre famille. Utilisez des mots simples.",
    example: "Dans ma famille, il y a... Ma mère est... Mon père est...",
    suggestedTime: 30,
    xpReward: 50
  },
  {
    id: 3,
    level: "A1",
    type: "describe",
    prompt: "Décrivez votre jour typique.",
    instruction: "Parlez de votre routine quotidienne et de vos habitudes.",
    example: "Le matin, je... Le soir, je...",
    suggestedTime: 40,
    xpReward: 75
  },
  {
    id: 4,
    level: "A1",
    type: "opinion",
    prompt: "Quel est votre passe-temps préféré ?",
    instruction: "Expliquez pourquoi vous aimez cette activité.",
    example: "J'aime... parce que...",
    suggestedTime: 35,
    xpReward: 75
  },
  {
    id: 5,
    level: "A2",
    type: "describe",
    prompt: "Décrivez votre repas préféré.",
    instruction: "Parlez de la nourriture, des saveurs, et pourquoi vous l'aimez.",
    example: "Mon plat préféré est... Il contient...",
    suggestedTime: 35,
    xpReward: 100
  },
  {
    id: 6,
    level: "A2",
    type: "scenario",
    prompt: "Vous êtes perdu en ville. Demandez votre chemin.",
    instruction: "Utilisez des phrases polies pour demander de l'aide à un passant.",
    example: "Excusez-moi, pouvez-vous m'aider ? Je cherche...",
    suggestedTime: 30,
    xpReward: 100
  },
  {
    id: 7,
    level: "B1",
    type: "opinion",
    prompt: "Pensez-vous qu'il est important d'apprendre une langue étrangère ?",
    instruction: "Donnez votre opinion avec au moins deux raisons et un exemple.",
    example: "À mon avis, c'est important parce que... De plus...",
    suggestedTime: 45,
    xpReward: 150
  },
  {
    id: 8,
    level: "B2",
    type: "opinion",
    prompt: "Discutez des avantages et inconvénients de la vie en ville.",
    instruction: "Présentez les deux côtés de l'argument avec des exemples concrets.",
    example: "D'un côté... Cependant... En conclusion...",
    suggestedTime: 50,
    xpReward: 200
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
      message: "Impressive! Your speaking skills are getting strong. 🌟",
      color: "from-orange-400 to-amber-500"
    }
  }
  return {
    level: "B2",
    message: "Excellent! You have advanced speaking skills. 🏆",
    color: "from-red-400 to-rose-500"
  }
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
  )
}

// =============================================================================
// PROMPT CARD
// =============================================================================

function PromptCard({ question }: { question: SpeakingQuestion }) {
  const typeLabels = {
    intro: { label: "Introduction", color: "blue" },
    describe: { label: "Description", color: "emerald" },
    opinion: { label: "Opinion", color: "purple" },
    react: { label: "Reaction", color: "orange" },
    scenario: { label: "Scenario", color: "rose" }
  }

  const typeInfo = typeLabels[question.type]
  
  const levelColors: Record<string, string> = {
    A0: "bg-green-100 text-green-700",
    A1: "bg-blue-100 text-blue-700",
    A2: "bg-purple-100 text-purple-700",
    B1: "bg-orange-100 text-orange-700",
    B2: "bg-red-100 text-red-700"
  }

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header with type badge */}
      <div className={`px-6 py-3 bg-gradient-to-r from-${typeInfo.color}-50 to-${typeInfo.color}-100/50 border-b border-slate-100`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider text-${typeInfo.color}-600`}>
            {typeInfo.label}
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
        {/* Prompt */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-relaxed">
          {question.prompt}
        </h2>

        {/* Instruction */}
        <p className="text-slate-600 mb-4 leading-relaxed">
          {question.instruction}
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
  suggestedTime
}: {
  onRecordingComplete: (blob: Blob) => void
  suggestedTime: number
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
        setRecordedBlob(audioBlob)
        onRecordingComplete(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
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
                <li>• Speak clearly and at a natural pace</li>
                <li>• Find a quiet environment</li>
                <li>• Aim for {suggestedTime} seconds of speech</li>
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
  isLast
}: {
  xpGained: number
  onNext: () => void
  isLast: boolean
}) {
  const messages = [
    "Nice! 😏",
    "Good clarity! 🎙️",
    "Keep going! 🔥",
    "Well spoken! ✨",
    "Great effort! 💪"
  ]

  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 mb-6"
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
      <p className="text-center text-lg font-semibold text-slate-800 mb-6">
        {randomMessage}
      </p>

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

// =============================================================================
// RESULTS SCREEN
// =============================================================================

function ResultsScreen({
  totalXP,
  questionsCompleted,
  onRestart
}: {
  totalXP: number
  questionsCompleted: number
  onRestart: () => void
}) {
  const result = getLevelFromScore(questionsCompleted)

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

        {/* Title */}
        <motion.h2
          className="text-2xl font-bold text-slate-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Speaking Test Complete!
        </motion.h2>

        <motion.p
          className="text-slate-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Great job practicing your French speaking skills!
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-4 bg-purple-50 rounded-2xl">
            <div className="text-3xl font-bold text-purple-600 mb-1">{questionsCompleted}</div>
            <div className="text-sm text-purple-700">Questions Done</div>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl">
            <div className="text-3xl font-bold text-amber-600 mb-1">{totalXP}</div>
            <div className="text-sm text-amber-700">XP Earned</div>
          </div>
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
            animate={{ width: `${(questionsCompleted / 8) * 100}%` }}
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
        <div className="flex gap-3">
          <motion.button
            onClick={onRestart}
            className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Retake Test
          </motion.button>
          <Link href="/reception/tests" className="flex-1">
            <motion.button
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function SpeakingTestLevel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [recordings, setRecordings] = useState<Blob[]>([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [totalXP, setTotalXP] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = speakingQuestions[currentIndex]
  const progress = ((currentIndex + (hasSubmitted ? 1 : 0)) / speakingQuestions.length) * 100

  const handleRecordingComplete = (blob: Blob) => {
    const newRecordings = [...recordings]
    newRecordings[currentIndex] = blob
    setRecordings(newRecordings)
  }

  const handleSubmit = () => {
    setHasSubmitted(true)
    setTotalXP(prev => prev + currentQuestion.xpReward)
  }

  const handleNext = () => {
    if (currentIndex < speakingQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setHasSubmitted(false)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setRecordings([])
    setHasSubmitted(false)
    setTotalXP(0)
    setShowResults(false)
  }

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 font-sans overflow-x-hidden relative">
        <AnimatedBackground />
        <ResultsScreen
          totalXP={totalXP}
          questionsCompleted={speakingQuestions.length}
          onRestart={handleRestart}
        />
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

            {/* Level progression indicator */}
            {currentIndex > 0 && currentQuestion.level !== speakingQuestions[currentIndex - 1].level && (
              <motion.div
                className="flex items-center justify-center gap-2 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="px-3 py-1 bg-amber-100 rounded-full">
                  <span className="text-xs font-bold text-amber-700">⬆️ Difficulty increased to {currentQuestion.level}</span>
                </div>
              </motion.div>
            )}

            {/* Milestone indicator at halfway */}
            {currentIndex === Math.floor(speakingQuestions.length / 2) && !hasSubmitted && (
              <motion.div
                className="flex items-center justify-center gap-2 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="px-3 py-1 bg-blue-100 rounded-full">
                  <span className="text-xs font-bold text-blue-700">🏃 Halfway there!</span>
                </div>
              </motion.div>
            )}

            {/* Recorder */}
            <MicrophoneRecorder
              onRecordingComplete={handleRecordingComplete}
              suggestedTime={currentQuestion.suggestedTime}
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
              <FeedbackCard
                xpGained={currentQuestion.xpReward}
                onNext={handleNext}
                isLast={currentIndex === speakingQuestions.length - 1}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
