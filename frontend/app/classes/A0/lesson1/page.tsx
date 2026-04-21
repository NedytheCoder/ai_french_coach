/**
 * A0 Lesson 1 - French Alphabet Pronunciation
 * =============================================
 *
 * This is the first lesson for absolute beginners (A0 level).
 * It introduces the French alphabet with audio pronunciation,
 * phonetic guides, interactive play functionality, and gamified practice.
 *
 * **Lesson Content:**
 * - All 26 letters of the French alphabet (A-Z)
 * - Phonetic pronunciation guides for each letter
 * - Audio playback for each letter
 * - Progress tracking (must play each letter twice to complete)
 * - Interactive practice section with 7 quiz questions
 *
 * **Features:**
 * - Interactive letter cards with play button
 * - Visual progress tracking
 * - Audio playback with completion states
 * - Gamified practice section (multiple choice, audio recognition)
 * - Immediate feedback on answers
 * - Results summary with score and retry option
 * - Sticky footer with navigation
 * - Completion requirement: play every letter at least 2 times + complete practice
 *
 * **Components:**
 * - LessonHeader - Title and instructions
 * - ProgressBar - Visual progress indicator
 * - LetterCard - Individual letter with audio controls
 * - PracticeSection - Gamified quiz section
 * - QuestionCard - Individual question with answer options
 * - FeedbackCard - Answer feedback display
 * - ResultsSummary - Final score and next actions
 * - FooterActionBar - Sticky footer with next button
 *
 * **Audio Files:**
 * - Located at /audio/alphabet/[letter].mp3
 */

"use client"

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management, refs, and side effects
import { useState, useRef, useEffect } from "react"

// Framer Motion for animations and transitions
import { motion, AnimatePresence } from "framer-motion"

// Next.js Link for navigation
import Link from "next/link"

// React Icons for UI elements
import { FaPlay, FaCheck, FaArrowRight, FaVolumeUp, FaRedo, FaHome } from "react-icons/fa"

// =============================================================================
// TYPES & DATA
// =============================================================================

/**
 * Letter data interface for alphabet lesson
 * @property id - uppercase letter identifier
 * @property lowercase - lowercase letter form
 * @property phonetic - phonetic pronunciation guide
 * @property audioSrc - path to audio file
 */
interface Letter {
  id: string
  lowercase: string
  phonetic: string
  audioSrc: string
}

// =============================================================================
// PRACTICE QUESTION TYPES
// =============================================================================

/**
 * Practice question types for gamified learning
 */
type QuestionType = "multiple-choice" | "audio-recognition" | "phonetic-matching"

/**
 * Practice question data interface
 * @property id - unique question identifier
 * @property type - question format type
 * @property prompt - question text to display
 * @property options - array of answer choices
 * @property correct - index of correct answer in options array
 * @property explanation - educational explanation shown after answering
 * @property audioSrc - optional audio for audio-recognition questions
 */
interface PracticeQuestion {
  id: number
  type: QuestionType
  prompt: string
  options: string[]
  correct: number
  explanation: string
  audioSrc?: string
}

// =============================================================================
// FRENCH ALPHABET DATA
// =============================================================================

/**
 * letters - French alphabet data with phonetic pronunciation guides.
 *
 * All 26 letters (A-Z) with:
 * - Uppercase and lowercase forms
 * - Phonetic pronunciation in English approximation
 * - Path to audio file for each letter
 *
 * Note: French alphabet differs from English in pronunciation:
 * - G = "zhay" (soft, like 's' in measure)
 * - H = "ash" (always silent in French)
 * - J = "zhee" (soft 'j')
 * - R = "air" (guttural, from back of throat)
 * - W = "doo-bluh-vay" (double V)
 * - Y = "ee-grek" (Greek i)
 * - Z = "zed" (not "zee")
 */
const letters: Letter[] = [
  { id: "A", lowercase: "a", phonetic: "ah", audioSrc: "/audio/alphabet/a.mp3" },
  { id: "B", lowercase: "b", phonetic: "bay", audioSrc: "/audio/alphabet/b.mp3" },
  { id: "C", lowercase: "c", phonetic: "say", audioSrc: "/audio/alphabet/c.mp3" },
  { id: "D", lowercase: "d", phonetic: "day", audioSrc: "/audio/alphabet/d.mp3" },
  { id: "E", lowercase: "e", phonetic: "uh", audioSrc: "/audio/alphabet/e.mp3" },
  { id: "F", lowercase: "f", phonetic: "eff", audioSrc: "/audio/alphabet/f.mp3" },
  { id: "G", lowercase: "g", phonetic: "zhay", audioSrc: "/audio/alphabet/g.mp3" },
  { id: "H", lowercase: "h", phonetic: "ash", audioSrc: "/audio/alphabet/h.mp3" },
  { id: "I", lowercase: "i", phonetic: "ee", audioSrc: "/audio/alphabet/i.mp3" },
  { id: "J", lowercase: "j", phonetic: "zhee", audioSrc: "/audio/alphabet/j.mp3" },
  { id: "K", lowercase: "k", phonetic: "kah", audioSrc: "/audio/alphabet/k.mp3" },
  { id: "L", lowercase: "l", phonetic: "ell", audioSrc: "/audio/alphabet/l.mp3" },
  { id: "M", lowercase: "m", phonetic: "emm", audioSrc: "/audio/alphabet/m.mp3" },
  { id: "N", lowercase: "n", phonetic: "enn", audioSrc: "/audio/alphabet/n.mp3" },
  { id: "O", lowercase: "o", phonetic: "oh", audioSrc: "/audio/alphabet/o.mp3" },
  { id: "P", lowercase: "p", phonetic: "pay", audioSrc: "/audio/alphabet/p.mp3" },
  { id: "Q", lowercase: "q", phonetic: "koo", audioSrc: "/audio/alphabet/q.mp3" },
  { id: "R", lowercase: "r", phonetic: "air", audioSrc: "/audio/alphabet/r.mp3" },
  { id: "S", lowercase: "s", phonetic: "ess", audioSrc: "/audio/alphabet/s.mp3" },
  { id: "T", lowercase: "t", phonetic: "tay", audioSrc: "/audio/alphabet/t.mp3" },
  { id: "U", lowercase: "u", phonetic: "ew", audioSrc: "/audio/alphabet/u.mp3" },
  { id: "V", lowercase: "v", phonetic: "vay", audioSrc: "/audio/alphabet/v.mp3" },
  { id: "W", lowercase: "w", phonetic: "doo-bluh-vay", audioSrc: "/audio/alphabet/w.mp3" },
  { id: "X", lowercase: "x", phonetic: "eeks", audioSrc: "/audio/alphabet/x.mp3" },
  { id: "Y", lowercase: "y", phonetic: "ee-grek", audioSrc: "/audio/alphabet/y.mp3" },
  { id: "Z", lowercase: "z", phonetic: "zed", audioSrc: "/audio/alphabet/z.mp3" }
]

// =============================================================================
// PRACTICE QUESTIONS DATA
// =============================================================================

/**
 * practiceQuestions - 7 interactive questions for alphabet practice.
 *
 * Question Types:
 * - Multiple Choice: Select correct answer from options
 * - Audio Recognition: Listen and identify the letter
 * - Phonetic Matching: Match letter to its phonetic sound
 *
 * Difficulty: A0 (absolute beginner)
 * Focus: Recognition, listening, phonetic awareness
 */
const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    prompt: "Which letter sounds like 'ah'?",
    options: ["A", "E", "I", "O"],
    correct: 0,
    explanation: "The letter A in French is pronounced 'ah', similar to the 'a' in 'father'."
  },
  {
    id: 2,
    type: "audio-recognition",
    prompt: "Listen carefully. Which letter do you hear?",
    options: ["B", "D", "P", "T"],
    correct: 1,
    explanation: "The letter D is pronounced 'day' in French.",
    audioSrc: "/audio/alphabet/d.mp3"
  },
  {
    id: 3,
    type: "phonetic-matching",
    prompt: "Which letter is pronounced 'zhay'?",
    options: ["G", "J", "Z", "S"],
    correct: 0,
    explanation: "The letter G has a soft sound in French, pronounced 'zhay' (like the 's' in 'measure')."
  },
  {
    id: 4,
    type: "multiple-choice",
    prompt: "Which letter is pronounced 'ee-grek' (Greek i)?",
    options: ["I", "Y", "E", "U"],
    correct: 1,
    explanation: "The letter Y is called 'ee-grek' in French, which means 'Greek i'.",
  },
  {
    id: 5,
    type: "audio-recognition",
    prompt: "Listen to this sound. Which letter is it?",
    options: ["R", "H", "L", "V"],
    correct: 0,
    explanation: "The French R is pronounced from the back of the throat, sounding like 'air'.",
    audioSrc: "/audio/alphabet/r.mp3"
  },
  {
    id: 6,
    type: "phonetic-matching",
    prompt: "Match the sound: 'ess'",
    options: ["C", "S", "X", "Z"],
    correct: 1,
    explanation: "The letter S is pronounced 'ess' in French, similar to English.",
  },
  {
    id: 7,
    type: "multiple-choice",
    prompt: "In French, which letter is called 'doo-bluh-vay' (double V)?",
    options: ["U", "V", "W", "X"],
    correct: 2,
    explanation: "The letter W is called 'double V' in French because it looks like two V's together!",
  }
]

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * LessonHeader - Displays lesson title and instructions.
 *
 * Features:
 * - A0 Level / Lesson 1 badge
 * - Main title: "French Alphabet Pronunciation"
 * - Instructions: Tap to hear, repeat out loud, play twice to continue
 */
function LessonHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
        <span>A0 Level</span>
        <span className="w-1 h-1 bg-purple-400 rounded-full" />
        <span>Lesson 1</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
        French Alphabet Pronunciation
      </h1>
      <div className="space-y-2 text-slate-600 max-w-lg mx-auto">
        <p className="text-lg">
          Tap each letter to hear how it sounds in French.
        </p>
        <p className="text-sm">
          Repeat the sound out loud. Play every letter at least twice to continue.
        </p>
      </div>
    </div>
  )
}

/**
 * ProgressBar - Visual indicator of overall lesson completion.
 *
 * Displays:
 * - Completion count (e.g., "15 of 26 letters completed")
 * - Animated progress bar with gradient fill
 * - Percentage of letters played at least twice
 *
 * @param completedCount - Number of letters completed (played twice)
 * @param totalCount - Total number of letters (26)
 */
interface ProgressBarProps {
  completedCount: number
  totalCount: number
}

function ProgressBar({ completedCount, totalCount }: ProgressBarProps) {
  const progress = (completedCount / totalCount) * 100

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">
          Your Progress
        </span>
        <span className="text-sm font-semibold text-purple-600">
          {completedCount} of {totalCount} letters completed
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
        />
      </div>
    </div>
  )
}

/**
 * LetterCard - Individual letter card with play button and progress.
 *
 * Features:
 * - Large letter display (uppercase + lowercase)
 * - Phonetic pronunciation guide
 * - Play button with visual states (idle, playing, completed)
 * - Play counter (0/2, 1/2, 2/2)
 * - Completion badge when played twice
 * - Animated transitions
 *
 * @param letter - Letter data (id, lowercase, phonetic, audioSrc)
 * @param playCount - Number of times audio has been played
 * @param isCompleted - Whether letter is completed (playCount >= 2)
 * @param isPlaying - Whether audio is currently playing for this letter
 * @param onPlay - Callback when play button is clicked
 */
interface LetterCardProps {
  letter: Letter
  playCount: number
  isCompleted: boolean
  isPlaying: boolean
  onPlay: () => void
}

function LetterCard({ letter, playCount, isCompleted, isPlaying, onPlay }: LetterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-2xl p-4 border-2 transition-all duration-200 ${
        isCompleted
          ? "border-emerald-400 bg-emerald-50/50 shadow-md"
          : "border-slate-200 hover:border-purple-300"
      }`}
    >
      {/* Completed badge */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center"
          >
            <FaCheck className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        {/* Letter display */}
        <div className="flex-shrink-0 w-16 text-center">
          <div className="text-3xl font-bold text-slate-900">
            {letter.id}<span className="text-2xl text-slate-400">{letter.lowercase}</span>
          </div>
        </div>

        {/* Phonetic guide */}
        <div className="flex-1">
          <div className="text-sm text-slate-500 mb-1">Sounds like:</div>
          <div className="text-lg font-medium text-purple-700">"{letter.phonetic}"</div>
        </div>

        {/* Play button and counter */}
        <div className="flex flex-col items-end gap-2">
          <motion.button
            onClick={onPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isPlaying}
            aria-label={`Play pronunciation for letter ${letter.id}`}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? "bg-purple-300 text-white cursor-not-allowed"
                : isCompleted
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30"
            }`}
          >
            {isPlaying ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="w-3 h-3 bg-white rounded-full"
              />
            ) : (
              <FaPlay className="w-5 h-5 ml-0.5" />
            )}
          </motion.button>

          {/* Play counter */}
          <div className={`text-xs font-medium ${
            isCompleted ? "text-emerald-600" : "text-slate-500"
          }`}>
            Played {playCount}/2
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * FooterActionBar - Sticky footer with next button and completion status.
 *
 * Features:
 * - Fixed position at bottom of viewport
 * - Completion status message
 * - "Next Topic" button (disabled until all letters completed)
 * - Visual feedback when all letters are done
 *
 * @param completedCount - Number of completed letters
 * @param totalCount - Total number of letters (26)
 * @param canProceed - Whether all letters are completed (enables button)
 * @param onNext - Callback when next button is clicked
 */
interface FooterActionBarProps {
  completedCount: number
  totalCount: number
  canProceed: boolean
  onNext: () => void
}

function FooterActionBar({ completedCount, totalCount, canProceed, onNext }: FooterActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        {/* Progress info */}
        <div className="flex-1">
          <div className="text-sm font-medium text-slate-700">
            {completedCount === totalCount ? (
              <span className="text-emerald-600 flex items-center gap-2">
                <FaCheck className="w-4 h-4" />
                All letters completed!
              </span>
            ) : (
              <span className="text-slate-500">
                Play every letter twice to unlock
              </span>
            )}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
            canProceed
              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Next Topic
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// =============================================================================
// PRACTICE SECTION COMPONENTS
// =============================================================================

/**
 * PracticeSectionHeader - Header for the practice section
 */
function PracticeSectionHeader({ current, total }: { current: number; total: number }) {
  const progress = ((current + 1) / total) * 100
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
          <span>🎯</span>
          <span>Practice Time</span>
        </div>
        <span className="text-sm font-medium text-slate-600">
          Question {current + 1} of {total}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
        />
      </div>
    </div>
  )
}

/**
 * AudioButton - Play button for audio recognition questions
 */
interface AudioButtonProps {
  audioSrc: string
  isPlaying: boolean
  onPlay: () => void
}

function AudioButton({ isPlaying, onPlay }: AudioButtonProps) {
  return (
    <motion.button
      onClick={onPlay}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isPlaying}
      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
        isPlaying
          ? "bg-purple-400 text-white animate-pulse"
          : "bg-gradient-to-br from-purple-500 to-blue-500 text-white hover:shadow-purple-500/40"
      }`}
    >
      {isPlaying ? (
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 0.4 }}
          className="w-4 h-4 bg-white rounded-full"
        />
      ) : (
        <FaVolumeUp className="w-8 h-8" />
      )}
    </motion.button>
  )
}

/**
 * QuestionCard - Displays a single practice question with options
 */
interface QuestionCardProps {
  question: PracticeQuestion
  selectedAnswer: number | null
  showFeedback: boolean
  isPlaying: boolean
  onSelectAnswer: (index: number) => void
  onPlayAudio: () => void
}

function QuestionCard({
  question,
  selectedAnswer,
  showFeedback,
  isPlaying,
  onSelectAnswer,
  onPlayAudio
}: QuestionCardProps) {
  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      return selectedAnswer === index
        ? "border-purple-500 bg-purple-50 text-purple-700"
        : "border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50/50"
    }
    
    if (index === question.correct) {
      return "border-emerald-500 bg-emerald-50 text-emerald-700"
    }
    
    if (selectedAnswer === index && index !== question.correct) {
      return "border-red-400 bg-red-50 text-red-700"
    }
    
    return "border-slate-200 bg-white text-slate-400"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200"
    >
      {/* Question Type Badge */}
      <div className="flex items-center justify-center mb-6">
        {question.type === "audio-recognition" && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
            <FaVolumeUp className="w-4 h-4" />
            <span>Listen & Identify</span>
          </div>
        )}
        {question.type === "phonetic-matching" && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
            <span>📝</span>
            <span>Phonetic Match</span>
          </div>
        )}
        {question.type === "multiple-choice" && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm">
            <span>❓</span>
            <span>Multiple Choice</span>
          </div>
        )}
      </div>

      {/* Question Prompt */}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 text-center mb-6">
        {question.prompt}
      </h3>

      {/* Audio Button for Audio Recognition Questions */}
      {question.type === "audio-recognition" && question.audioSrc && (
        <div className="flex flex-col items-center gap-3 mb-8">
          <AudioButton
            audioSrc={question.audioSrc}
            isPlaying={isPlaying}
            onPlay={onPlayAudio}
          />
          <p className="text-sm text-slate-500">
            {isPlaying ? "Playing..." : "Tap to listen"}
          </p>
        </div>
      )}

      {/* Answer Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => !showFeedback && onSelectAnswer(index)}
            whileHover={!showFeedback ? { scale: 1.02 } : {}}
            whileTap={!showFeedback ? { scale: 0.98 } : {}}
            disabled={showFeedback}
            className={`p-4 rounded-xl border-2 font-bold text-lg sm:text-xl transition-all ${getOptionStyle(index)}`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

/**
 * FeedbackCard - Shows feedback after answering a question
 */
interface FeedbackCardProps {
  isCorrect: boolean
  correctAnswer: string
  explanation: string
  onContinue: () => void
}

function FeedbackCard({ isCorrect, correctAnswer, explanation, onContinue }: FeedbackCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 mt-6 ${
        isCorrect ? "bg-emerald-50 border-2 border-emerald-200" : "bg-amber-50 border-2 border-amber-200"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          isCorrect ? "bg-emerald-500" : "bg-amber-500"
        }`}>
          <span className="text-2xl">{isCorrect ? "😏" : "🤔"}</span>
        </div>
        <div className="flex-1">
          <h4 className={`font-bold text-lg mb-1 ${
            isCorrect ? "text-emerald-800" : "text-amber-800"
          }`}>
            {isCorrect ? "Correct! Well done!" : "Not quite..."}
          </h4>
          <p className="text-slate-700 mb-2">
            The correct answer was: <span className="font-bold">{correctAnswer}</span>
          </p>
          <p className={`text-sm ${isCorrect ? "text-emerald-700" : "text-amber-700"}`}>
            {explanation}
          </p>
        </div>
      </div>
      
      <button
        onClick={onContinue}
        className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all ${
          isCorrect
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-amber-500 text-white hover:bg-amber-600"
        }`}
      >
        Continue
      </button>
    </motion.div>
  )
}

/**
 * ResultsSummary - Shows final practice results
 */
interface ResultsSummaryProps {
  score: number
  total: number
  onRetry: () => void
  onContinue: () => void
}

function ResultsSummary({ score, total, onRetry, onContinue }: ResultsSummaryProps) {
  const percentage = Math.round((score / total) * 100)
  const isPerfect = score === total
  const isGood = score >= total * 0.7
  
  let message = ""
  let emoji = ""
  let colorClass = ""
  
  if (isPerfect) {
    message = "Perfect score! You're amazing!"
    emoji = "🎉"
    colorClass = "from-emerald-500 to-teal-500"
  } else if (isGood) {
    message = "Great job! You know your alphabet!"
    emoji = "👏"
    colorClass = "from-blue-500 to-cyan-500"
  } else {
    message = "Good effort! Keep practicing!"
    emoji = "💪"
    colorClass = "from-amber-500 to-orange-500"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 text-center"
    >
      {/* Score Circle */}
      <div className="mb-6">
        <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg mb-4`}>
          <div className="text-white">
            <div className="text-4xl font-bold">{score}/{total}</div>
            <div className="text-sm opacity-90">{percentage}%</div>
          </div>
        </div>
        <div className="text-5xl mb-2">{emoji}</div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{message}</h3>
        <p className="text-slate-600">
          You completed the alphabet practice!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
        >
          <FaRedo className="w-4 h-4" />
          Retry Practice
        </button>
        <button
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          Continue to Next Lesson
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * AlphabetLessonPage - Main component for A0 Lesson 1.
 *
 * Manages:
 * - Play counts for each letter (must play twice to complete)
 * - Audio playback state
 * - Progress tracking
 * - Practice section with quiz questions
 * - Navigation to next topic
 *
 * @returns JSX.Element - The rendered alphabet lesson page
 */
export default function AlphabetLessonPage() {
  // ---------------------------------------------------------------------------
  // STATE: Play Counts for Each Letter
  // ---------------------------------------------------------------------------
  // Track how many times each letter has been played (index 0-25 = A-Z)
  const [playCounts, setPlayCounts] = useState<number[]>(Array(letters.length).fill(0))
  
  // ---------------------------------------------------------------------------
  // STATE: Currently Playing Letter
  // ---------------------------------------------------------------------------
  // Index of letter currently playing audio, or null if none
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  
  // ---------------------------------------------------------------------------
  // STATE: Practice Section
  // ---------------------------------------------------------------------------
  // Whether practice section is visible
  const [showPractice, setShowPractice] = useState(false)
  // Current question index (0-6)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // Score (number of correct answers)
  const [score, setScore] = useState(0)
  // Selected answer for current question
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  // Whether to show feedback after answering
  const [showFeedback, setShowFeedback] = useState(false)
  // Whether practice is completed
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  // Currently playing practice audio
  const [practiceAudioPlaying, setPracticeAudioPlaying] = useState(false)
  
  // ---------------------------------------------------------------------------
  // REF: Audio Element
  // ---------------------------------------------------------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ---------------------------------------------------------------------------
  // DERIVED STATE: Completion Stats
  // ---------------------------------------------------------------------------
  const completedCount = playCounts.filter(count => count >= 2).length
  const totalCount = letters.length
  const learningComplete = completedCount === totalCount
  // Can proceed only when both learning and practice are complete
  const canProceed = learningComplete && practiceCompleted

  // ---------------------------------------------------------------------------
  // HANDLER: Play Audio for Letter
  // ---------------------------------------------------------------------------
  /**
   * handlePlay - Plays audio for a specific letter.
   *
   * Actions:
   * - Increments play count for the letter
   * - Plays audio from file
   * - Manages playing state
   * - Handles audio errors gracefully
   *
   * @param index - Index of the letter in the letters array (0-25)
   */
  const handlePlay = (index: number) => {
    if (playingIndex !== null) return

    const letter = letters[index]
    
    // Update play count
    setPlayCounts(prev => {
      const newCounts = [...prev]
      newCounts[index] = newCounts[index] + 1
      return newCounts
    })

    // Play audio
    setPlayingIndex(index)
    
    if (audioRef.current) {
      audioRef.current.pause()
    }
    
    audioRef.current = new Audio(letter.audioSrc)
    audioRef.current.play().catch(() => {
      // Audio file might not exist yet, just simulate
      console.log(`Audio not found: ${letter.audioSrc}`)
    })
    
    audioRef.current.onended = () => {
      setPlayingIndex(null)
    }
    
    // Fallback if audio fails or is not loaded
    setTimeout(() => {
      setPlayingIndex(prev => prev === index ? null : prev)
    }, 1000)
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Start Practice
  // ---------------------------------------------------------------------------
  const handleStartPractice = () => {
    setShowPractice(true)
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setPracticeCompleted(false)
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Play Practice Question Audio
  // ---------------------------------------------------------------------------
  const handlePlayPracticeAudio = () => {
    const question = practiceQuestions[currentQuestionIndex]
    if (!question.audioSrc || practiceAudioPlaying) return

    setPracticeAudioPlaying(true)
    
    if (audioRef.current) {
      audioRef.current.pause()
    }
    
    audioRef.current = new Audio(question.audioSrc)
    audioRef.current.play().catch(() => {
      console.log(`Audio not found: ${question.audioSrc}`)
    })
    
    audioRef.current.onended = () => {
      setPracticeAudioPlaying(false)
    }
    
    setTimeout(() => {
      setPracticeAudioPlaying(false)
    }, 1000)
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Select Answer
  // ---------------------------------------------------------------------------
  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return
    
    setSelectedAnswer(index)
    setShowFeedback(true)
    
    if (index === practiceQuestions[currentQuestionIndex].correct) {
      setScore(prev => prev + 1)
    }
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Continue to Next Question
  // ---------------------------------------------------------------------------
  const handleContinue = () => {
    if (currentQuestionIndex < practiceQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setPracticeCompleted(true)
    }
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Retry Practice
  // ---------------------------------------------------------------------------
  const handleRetryPractice = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setPracticeCompleted(false)
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Navigate to Next Topic
  // ---------------------------------------------------------------------------
  /**
   * handleNext - Navigates to the next lesson/topic.
   *
   * Only navigates if all letters have been played at least twice
   * AND practice section is completed.
   * Redirects to /classes/A0/lesson2
   */
  const handleNext = () => {
    if (canProceed) {
      window.location.href = "/classes/A0/lesson2"
    }
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Continue from Results
  // ---------------------------------------------------------------------------
  const handleContinueToNext = () => {
    window.location.href = "/classes/A0/lesson2"
  }

  // ---------------------------------------------------------------------------
  // EFFECT: Cleanup Audio on Unmount
  // ---------------------------------------------------------------------------
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link 
            href="/home" 
            className="text-slate-500 hover:text-slate-700 transition-colors text-sm inline-flex items-center gap-1"
          >
            <FaHome className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Lesson Header - Title and Instructions */}
        <LessonHeader />

        {/* Progress Bar - Shows completion status */}
        <ProgressBar completedCount={completedCount} totalCount={totalCount} />

        {/* Letter Cards Grid - All 26 letters with audio */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {letters.map((letter, index) => (
            <LetterCard
              key={letter.id}
              letter={letter}
              playCount={playCounts[index]}
              isCompleted={playCounts[index] >= 2}
              isPlaying={playingIndex === index}
              onPlay={() => handlePlay(index)}
            />
          ))}
        </div>

        {/* Practice Section Divider */}
        {learningComplete && !showPractice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
              <span className="text-purple-600 font-semibold">🎯 Ready for Practice?</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Start Practice Button - Shows when learning complete but practice not started */}
        {learningComplete && !showPractice && !practiceCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Time to Practice!
              </h3>
              <p className="text-slate-600 mb-4">
                Test your knowledge with {practiceQuestions.length} interactive questions about the French alphabet.
              </p>
              <button
                onClick={handleStartPractice}
                className="w-full py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/30 transition-all"
              >
                Start Practice
              </button>
            </div>
          </motion.div>
        )}

        {/* Practice Section - Shows when practice is active */}
        {showPractice && !practiceCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            {/* Practice Section Header with Progress */}
            <PracticeSectionHeader 
              current={currentQuestionIndex} 
              total={practiceQuestions.length} 
            />

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <QuestionCard
                key={currentQuestionIndex}
                question={practiceQuestions[currentQuestionIndex]}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
                isPlaying={practiceAudioPlaying}
                onSelectAnswer={handleSelectAnswer}
                onPlayAudio={handlePlayPracticeAudio}
              />
            </AnimatePresence>

            {/* Feedback Card */}
            {showFeedback && (
              <FeedbackCard
                isCorrect={selectedAnswer === practiceQuestions[currentQuestionIndex].correct}
                correctAnswer={practiceQuestions[currentQuestionIndex].options[practiceQuestions[currentQuestionIndex].correct]}
                explanation={practiceQuestions[currentQuestionIndex].explanation}
                onContinue={handleContinue}
              />
            )}
          </motion.div>
        )}

        {/* Results Summary - Shows when practice is completed */}
        {practiceCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <ResultsSummary
              score={score}
              total={practiceQuestions.length}
              onRetry={handleRetryPractice}
              onContinue={handleContinueToNext}
            />
          </motion.div>
        )}
      </div>

      {/* Sticky Footer - Updated with practice flow messaging */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          {/* Progress info */}
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-700">
              {!learningComplete ? (
                <span className="text-slate-500">
                  Play every letter twice to unlock practice
                </span>
              ) : !showPractice && !practiceCompleted ? (
                <span className="text-purple-600 flex items-center gap-2">
                  <FaCheck className="w-4 h-4" />
                  Learning complete! Start practice to continue
                </span>
              ) : showPractice && !practiceCompleted ? (
                <span className="text-amber-600 flex items-center gap-2">
                  <span>🎯</span>
                  Complete practice to unlock next lesson
                </span>
              ) : (
                <span className="text-emerald-600 flex items-center gap-2">
                  <FaCheck className="w-4 h-4" />
                  All done! Ready for the next lesson
                </span>
              )}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
              canProceed
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Next Lesson
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
