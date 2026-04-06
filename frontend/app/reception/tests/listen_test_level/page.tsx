"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

/**
 * Question interface for listening comprehension test
 * @property id - unique identifier for the question
 * @property level - CEFR level (A0, A1, A2, B1, B2)
 * @property transcript - French text that will be heard in audio
 * @property audioSrc - path to the audio file
 * @property question - the question asked about the audio
 * @property options - array of possible answer choices
 * @property correct - index of the correct answer in options array
 */
interface Question {
  id: number
  level: string
  transcript: string
  audioSrc: string
  question: string
  options: string[]
  correct: number
}

/**
 * Questions database - 8 progressive French listening comprehension questions
 * Each question includes audio source, transcript, and comprehension question
 */
const questions: Question[] = [
  {
    id: 1,
    level: "A0",
    transcript: "Bonjour !",
    audioSrc: "/audio/q1.mp3",
    question: "Que veut dire \"Bonjour\" ?",
    options: ["Goodbye", "Hello", "Thank you"],
    correct: 1
  },
  {
    id: 2,
    level: "A0",
    transcript: "Merci",
    audioSrc: "/audio/q2.mp3",
    question: "Que veut dire \"Merci\" ?",
    options: ["Please", "Sorry", "Thank you"],
    correct: 2
  },
  {
    id: 3,
    level: "A1",
    transcript: "Je m'appelle Marie.",
    audioSrc: "/audio/q3.mp3",
    question: "Comment s'appelle la personne ?",
    options: ["Paul", "Marie", "Sophie"],
    correct: 1
  },
  {
    id: 4,
    level: "A1",
    transcript: "J'habite à Paris.",
    audioSrc: "/audio/q4.mp3",
    question: "Où habite la personne ?",
    options: ["Lyon", "Marseille", "Paris"],
    correct: 2
  },
  {
    id: 5,
    level: "A2",
    transcript: "Je travaille dans un café. J'aime parler avec les clients.",
    audioSrc: "/audio/q5.mp3",
    question: "Pourquoi la personne aime son travail ?",
    options: [
      "Parce qu'elle gagne beaucoup d'argent",
      "Parce qu'elle parle avec les clients",
      "Parce qu'elle travaille seule"
    ],
    correct: 1
  },
  {
    id: 6,
    level: "A2",
    transcript: "Je commence à 9h et je finis à 17h.",
    audioSrc: "/audio/q6.mp3",
    question: "À quelle heure la personne finit ?",
    options: ["9h", "17h", "12h"],
    correct: 1
  },
  {
    id: 7,
    level: "B1",
    transcript: "J'aime vivre en ville parce qu'il y a beaucoup d'activités et de travail, mais c'est parfois stressant.",
    audioSrc: "/audio/q7.mp3",
    question: "Pourquoi la personne aime vivre en ville ?",
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
    transcript: "Les réseaux sociaux sont utiles pour communiquer rapidement, mais ils peuvent aussi créer une dépendance et diffuser de fausses informations.",
    audioSrc: "/audio/q8.mp3",
    question: "Pourquoi faut-il faire attention aux réseaux sociaux ?",
    options: [
      "Parce qu'ils sont toujours dangereux",
      "Parce qu'ils sont seulement utiles",
      "Parce qu'ils ont des effets positifs et négatifs"
    ],
    correct: 2
  }
]

/**
 * Determines user's French level based on listening test score
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
      message: "Nice progress! You can understand everyday French now. 🎉",
      color: "from-purple-400 to-violet-500"
    }
  }
  if (score === 7) {
    return {
      level: "B1",
      message: "Impressive! Your listening skills are getting strong. 🌟",
      color: "from-orange-400 to-amber-500"
    }
  }
  return {
    level: "B2",
    message: "Excellent! You have advanced listening comprehension skills. 🏆",
    color: "from-red-400 to-rose-500"
  }
}

/**
 * Generates encouraging feedback message
 * @param isCorrect - whether the answer was correct
 * @returns Randomized encouraging message
 */
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

/**
 * AudioPlayer component - handles audio playback with replay limit
 * @property src - audio file source path
 * @property replaysLeft - number of replays remaining
 * @property onReplay - callback when replay is used
 */
function AudioPlayer({ src, replaysLeft, onReplay }: { src: string; replaysLeft: number; onReplay: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleReplay = () => {
    if (replaysLeft > 0 && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
      onReplay()
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="bg-slate-50 rounded-xl p-4 mb-6">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={src}
        onEnded={handleEnded}
        preload="auto"
      />
      
      {/* Audio controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Play/Pause button */}
          <button
            onClick={handlePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <rect x="6" y="4" width="3" height="12" />
                <rect x="11" y="4" width="3" height="12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            )}
          </button>
          
          <span className="text-slate-600 font-medium">
            {isPlaying ? "Playing..." : "Listen to audio"}
          </span>
        </div>
        
        {/* Replay button with counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReplay}
            disabled={replaysLeft === 0 || isPlaying}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              replaysLeft === 0 || isPlaying
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Replay
            </span>
          </button>
          <span className="text-xs text-slate-500">
            {replaysLeft} left
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Main Listening Test Component
 * French listening comprehension quiz with audio playback
 */
export default function ListenTestLevel() {
  // Quiz state management
  const [currentIndex, setCurrentIndex] = useState(0)           // Current question index (0-7)
  const [score, setScore] = useState(0)                       // Number of correct answers
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)  // Selected option
  const [hasAnswered, setHasAnswered] = useState(false)         // Whether question is answered
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)  // Answer correctness
  const [showResult, setShowResult] = useState(false)           // Show results screen
  const [feedback, setFeedback] = useState("")                // Feedback message
  const [replaysLeft, setReplaysLeft] = useState(3)             // Replays for current question
  const [showTranscript, setShowTranscript] = useState(false)   // Toggle transcript visibility

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  /**
   * Reset replays when question changes
   */
  useEffect(() => {
    setReplaysLeft(3)
    setShowTranscript(false)
  }, [currentIndex])

  /**
   * Handles using a replay
   */
  const handleReplay = () => {
    setReplaysLeft(prev => Math.max(0, prev - 1))
  }

  /**
   * Handles selecting an answer option
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
   * Advances to next question or shows results
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
   * Restarts the quiz from beginning
   */
  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setHasAnswered(false)
    setIsCorrect(null)
    setShowResult(false)
    setFeedback("")
    setReplaysLeft(3)
    setShowTranscript(false)
  }

  // Results screen
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
              {score}/{questions.length}
            </div>
            <p className="text-slate-500">correct answers</p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / questions.length) * 100}%` }}
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

  // Main quiz interface
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
              Question {currentIndex + 1} of {questions.length}
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
            {/* Audio Player */}
            <AudioPlayer
              src={currentQuestion.audioSrc}
              replaysLeft={replaysLeft}
              onReplay={handleReplay}
            />

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Transcript toggle (shown after answering or when replays exhausted) */}
            {(hasAnswered || replaysLeft === 0) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6"
              >
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                >
                  {showTranscript ? "Hide" : "Show"} transcript
                  <svg className={`w-4 h-4 transition-transform ${showTranscript ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {showTranscript && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-3 bg-slate-100 rounded-lg"
                    >
                      <p className="text-slate-700 italic">"{currentQuestion.transcript}"</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-all duration-200 "
                
                if (hasAnswered) {
                  if (index === currentQuestion.correct) {
                    buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900"
                  } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                    buttonClass += "border-red-400 bg-red-50 text-red-900"
                  } else {
                    buttonClass += "border-slate-200 bg-slate-50 text-slate-500"
                  }
                } else {
                  buttonClass += "border-slate-200 hover:border-purple-400 hover:bg-purple-50 text-slate-800 cursor-pointer"
                }

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={hasAnswered}
                    whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                    whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                    className={buttonClass}
                  >
                    <span className="font-medium">{option}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {hasAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6"
                >
                  <div className={`p-4 rounded-xl ${isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                    <p className="font-semibold text-center">{feedback}</p>
                  </div>
                  
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleNext}
                    className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    {currentIndex < questions.length - 1 ? "Next Question →" : "See Results →"}
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
