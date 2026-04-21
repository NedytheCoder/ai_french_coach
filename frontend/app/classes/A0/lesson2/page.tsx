/**
 * A0 Lesson 2 - French Numbers Pronunciation
 * =============================================
 *
 * This is the second lesson for absolute beginners (A0 level).
 * It teaches French numbers 1-100 with audio pronunciation,
 * phonetic guides, interactive play functionality, and gamified practice.
 *
 * **Lesson Content:**
 * - Numbers 1-30 (full sequence)
 * - Tens: 40, 50, 60, 70, 80, 90
 * - 100 (cent)
 * - Phonetic pronunciation guides for each number
 * - Grouped into sections for easier learning
 * - Interactive practice section with 8 quiz questions
 *
 * **Features:**
 * - Interactive number cards with play button
 * - Visual progress tracking
 * - Audio playback with completion states
 * - Section grouping (1-10, 11-20, 21-30, Tens & 100)
 * - Gamified practice section (multiple choice, audio recognition)
 * - Immediate feedback on answers
 * - Results summary with score and retry option
 * - Sticky footer with navigation
 * - Completion requirement: play every number at least 2 times + complete practice
 *
 * **Components:**
 * - LessonHeader - Title and instructions
 * - ProgressBar - Visual progress indicator
 * - NumberCard - Individual number with audio controls
 * - SectionHeader - Visual divider for number groups
 * - PracticeSection - Gamified quiz section
 * - QuestionCard - Individual question with answer options
 * - FeedbackCard - Answer feedback display
 * - ResultsSummary - Final score and next actions
 * - FooterActionBar - Sticky footer with next button
 *
 * **Audio Files:**
 * - Located at /audio/numbers/[value].mp3
 *
 * **Note on French Numbers:**
 * - 70 = soixante-dix (60 + 10)
 * - 80 = quatre-vingts (4 × 20)
 * - 90 = quatre-vingt-dix (4 × 20 + 10)
 * - These are unique to French and differ from English pattern
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
 * Number data interface for numbers lesson
 * @property value - numeric value
 * @property word - French word for the number
 * @property phonetic - phonetic pronunciation guide
 * @property audioSrc - path to audio file
 */
interface NumberItem {
  value: number
  word: string
  phonetic: string
  audioSrc: string
}

// =============================================================================
// PRACTICE QUESTION TYPES
// =============================================================================

/**
 * Practice question types for gamified learning
 */
type QuestionType = "multiple-choice" | "audio-recognition" | "word-to-number" | "number-to-word" | "phonetic-matching"

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
// FRENCH NUMBERS DATA
// =============================================================================

/**
 * numbers - French numbers 1-100 with phonetic pronunciation guides.
 *
 * Includes:
 * - Numbers 1-30 (complete sequence)
 * - Tens: 40, 50, 60, 70, 80, 90
 * - 100 (cent)
 *
 * Total: 37 numbers
 *
 * **French Number Peculiarities:**
 * - 70 = soixante-dix (60 + 10), not "septante"
 * - 80 = quatre-vingts (4 × 20), not "huitante"
 * - 90 = quatre-vingt-dix (4 × 20 + 10), not "nonante"
 * - These vigesimal (base-20) forms are standard in France
 * - Belgian/Swiss French uses septante, huitante, nonante
 */
const numbers: NumberItem[] = [
  { value: 1, word: "un", phonetic: "uh(n)", audioSrc: "/audio/numbers/1.mp3" },
  { value: 2, word: "deux", phonetic: "duh", audioSrc: "/audio/numbers/2.mp3" },
  { value: 3, word: "trois", phonetic: "trwah", audioSrc: "/audio/numbers/3.mp3" },
  { value: 4, word: "quatre", phonetic: "katr", audioSrc: "/audio/numbers/4.mp3" },
  { value: 5, word: "cinq", phonetic: "sank", audioSrc: "/audio/numbers/5.mp3" },
  { value: 6, word: "six", phonetic: "sees", audioSrc: "/audio/numbers/6.mp3" },
  { value: 7, word: "sept", phonetic: "set", audioSrc: "/audio/numbers/7.mp3" },
  { value: 8, word: "huit", phonetic: "weet", audioSrc: "/audio/numbers/8.mp3" },
  { value: 9, word: "neuf", phonetic: "nuhf", audioSrc: "/audio/numbers/9.mp3" },
  { value: 10, word: "dix", phonetic: "dees", audioSrc: "/audio/numbers/10.mp3" },
  { value: 11, word: "onze", phonetic: "onz", audioSrc: "/audio/numbers/11.mp3" },
  { value: 12, word: "douze", phonetic: "dooz", audioSrc: "/audio/numbers/12.mp3" },
  { value: 13, word: "treize", phonetic: "trez", audioSrc: "/audio/numbers/13.mp3" },
  { value: 14, word: "quatorze", phonetic: "kah-torz", audioSrc: "/audio/numbers/14.mp3" },
  { value: 15, word: "quinze", phonetic: "kanz", audioSrc: "/audio/numbers/15.mp3" },
  { value: 16, word: "seize", phonetic: "sez", audioSrc: "/audio/numbers/16.mp3" },
  { value: 17, word: "dix-sept", phonetic: "dees-set", audioSrc: "/audio/numbers/17.mp3" },
  { value: 18, word: "dix-huit", phonetic: "deez-weet", audioSrc: "/audio/numbers/18.mp3" },
  { value: 19, word: "dix-neuf", phonetic: "deez-nuhf", audioSrc: "/audio/numbers/19.mp3" },
  { value: 20, word: "vingt", phonetic: "van", audioSrc: "/audio/numbers/20.mp3" },
  { value: 21, word: "vingt et un", phonetic: "van-tay-uh(n)", audioSrc: "/audio/numbers/21.mp3" },
  { value: 22, word: "vingt-deux", phonetic: "van-duh", audioSrc: "/audio/numbers/22.mp3" },
  { value: 23, word: "vingt-trois", phonetic: "van-trwah", audioSrc: "/audio/numbers/23.mp3" },
  { value: 24, word: "vingt-quatre", phonetic: "van-katr", audioSrc: "/audio/numbers/24.mp3" },
  { value: 25, word: "vingt-cinq", phonetic: "van-sank", audioSrc: "/audio/numbers/25.mp3" },
  { value: 26, word: "vingt-six", phonetic: "van-sees", audioSrc: "/audio/numbers/26.mp3" },
  { value: 27, word: "vingt-sept", phonetic: "van-set", audioSrc: "/audio/numbers/27.mp3" },
  { value: 28, word: "vingt-huit", phonetic: "van-weet", audioSrc: "/audio/numbers/28.mp3" },
  { value: 29, word: "vingt-neuf", phonetic: "van-nuhf", audioSrc: "/audio/numbers/29.mp3" },
  { value: 30, word: "trente", phonetic: "tront", audioSrc: "/audio/numbers/30.mp3" },
  { value: 40, word: "quarante", phonetic: "kah-ront", audioSrc: "/audio/numbers/40.mp3" },
  { value: 50, word: "cinquante", phonetic: "san-kont", audioSrc: "/audio/numbers/50.mp3" },
  { value: 60, word: "soixante", phonetic: "swah-sont", audioSrc: "/audio/numbers/60.mp3" },
  { value: 70, word: "soixante-dix", phonetic: "swah-sont-dees", audioSrc: "/audio/numbers/70.mp3" },
  { value: 80, word: "quatre-vingts", phonetic: "katr-van", audioSrc: "/audio/numbers/80.mp3" },
  { value: 90, word: "quatre-vingt-dix", phonetic: "katr-van-dees", audioSrc: "/audio/numbers/90.mp3" },
  { value: 100, word: "cent", phonetic: "son", audioSrc: "/audio/numbers/100.mp3" }
]

// =============================================================================
// SECTION GROUPINGS
// =============================================================================

/**
 * sections - Defines visual groupings for the numbers.
 *
 * Groups numbers into 4 sections for easier learning:
 * 1. Numbers 1-10 (indices 0-9)
 * 2. Numbers 11-20 (indices 10-19)
 * 3. Numbers 21-30 (indices 20-29)
 * 4. Tens & 100 (indices 30-36)
 *
 * Each section has a header displayed above its numbers.
 */
const sections = [
  { name: "Numbers 1–10", start: 0, end: 10 },
  { name: "Numbers 11–20", start: 10, end: 20 },
  { name: "Numbers 21–30", start: 20, end: 30 },
  { name: "Tens & 100", start: 30, end: 37 }
]

// =============================================================================
// PRACTICE QUESTIONS DATA
// =============================================================================

/**
 * practiceQuestions - 8 interactive questions for numbers practice.
 *
 * Question Types:
 * - Multiple Choice: Select correct answer from options
 * - Audio Recognition: Listen and identify the number
 * - Word-to-Number: Match French word to numeral
 * - Number-to-Word: Match numeral to French word
 * - Phonetic Matching: Match pronunciation clue to number
 *
 * Difficulty: A0 (absolute beginner)
 * Focus: Recognition, listening, word-number association
 */
const practiceQuestions: PracticeQuestion[] = [
  {
    id: 1,
    type: "word-to-number",
    prompt: "Which number is 'trois'?",
    options: ["2", "3", "5", "8"],
    correct: 1,
    explanation: "'Trois' is the French word for 3."
  },
  {
    id: 2,
    type: "number-to-word",
    prompt: "Which word means 7?",
    options: ["six", "sept", "huit", "cinq"],
    correct: 1,
    explanation: "'Sept' (pronounced 'set') is the French word for 7."
  },
  {
    id: 3,
    type: "audio-recognition",
    prompt: "Listen carefully. Which number do you hear?",
    options: ["deux", "douze", "dix", "vingt"],
    correct: 0,
    explanation: "'Deux' means 2 and is pronounced like 'duh'.",
    audioSrc: "/audio/numbers/2.mp3"
  },
  {
    id: 4,
    type: "phonetic-matching",
    prompt: "Which number sounds like 'sank'?",
    options: ["six", "sept", "cinq", "cent"],
    correct: 2,
    explanation: "'Cinq' means 5 and is pronounced 'sank' (like 'sank' without the final 'k' sound)."
  },
  {
    id: 5,
    type: "audio-recognition",
    prompt: "Listen to this sound. Which number is it?",
    options: ["onze", "douze", "treize", "vingt"],
    correct: 1,
    explanation: "'Douze' means 12 and is pronounced 'dooz'.",
    audioSrc: "/audio/numbers/12.mp3"
  },
  {
    id: 6,
    type: "word-to-number",
    prompt: "What does 'vingt' mean?",
    options: ["10", "15", "20", "25"],
    correct: 2,
    explanation: "'Vingt' means 20 and is pronounced 'van' (like the vehicle)."
  },
  {
    id: 7,
    type: "number-to-word",
    prompt: "Which word means 10?",
    options: ["deux", "neuf", "dix", "six"],
    correct: 2,
    explanation: "'Dix' means 10 and is pronounced 'dees'."
  },
  {
    id: 8,
    type: "multiple-choice",
    prompt: "Which of these is the French word for 100?",
    options: ["cent", "vingt", "cinq", "dix"],
    correct: 0,
    explanation: "'Cent' means 100 in French, pronounced like 'son'."
  }
]

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * LessonHeader - Displays lesson title and instructions.
 *
 * Features:
 * - A0 Level / Lesson 2 badge
 * - Main title: "French Numbers Pronunciation"
 * - Instructions: Tap to hear, repeat out loud, play twice to continue
 */
function LessonHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
        <span>A0 Level</span>
        <span className="w-1 h-1 bg-purple-400 rounded-full" />
        <span>Lesson 2</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
        French Numbers Pronunciation
      </h1>
      <div className="space-y-2 text-slate-600 max-w-lg mx-auto">
        <p className="text-lg">
          Tap each number to hear how it sounds in French.
        </p>
        <p className="text-sm">
          Repeat the sound out loud. Play every number at least twice to continue.
        </p>
      </div>
    </div>
  )
}

/**
 * ProgressBar - Shows lesson completion status.
 * @param completedCount - Numbers played twice
 * @param totalCount - Total numbers (37)
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
          {completedCount} of {totalCount} numbers completed
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
 * NumberCard - Individual number with audio controls.
 * @param number - Number data (value, word, phonetic, audioSrc)
 * @param playCount - Times played
 * @param isCompleted - Played twice
 * @param isPlaying - Audio playing
 * @param onPlay - Play callback
 */
interface NumberCardProps {
  number: NumberItem
  playCount: number
  isCompleted: boolean
  isPlaying: boolean
  onPlay: () => void
}

function NumberCard({ number, playCount, isCompleted, isPlaying, onPlay }: NumberCardProps) {
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
        {/* Number display */}
        <div className="flex-shrink-0 w-16 text-center">
          <div className="text-3xl font-bold text-slate-900">
            {number.value}
          </div>
        </div>

        {/* French word and phonetic guide */}
        <div className="flex-1 min-w-0">
          <div className="text-lg font-semibold text-purple-700 mb-1">
            {number.word}
          </div>
          <div className="text-sm text-slate-500">
            Sounds like: <span className="italic">&quot;{number.phonetic}&quot;</span>
          </div>
        </div>

        {/* Play button and counter */}
        <div className="flex flex-col items-end gap-2">
          <motion.button
            onClick={onPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isPlaying}
            aria-label={`Play pronunciation for number ${number.value}`}
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
 * SectionHeader - Visual divider for number groups.
 * @param name - Section name (e.g., "Numbers 1-10")
 */
function SectionHeader({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-slate-200" />
      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
        {name}
      </span>
      <div className="flex-1 h-px bg-slate-200" />
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

  const getQuestionTypeLabel = () => {
    switch (question.type) {
      case "audio-recognition":
        return { icon: <FaVolumeUp className="w-4 h-4" />, label: "Listen & Identify", color: "bg-purple-100 text-purple-700" }
      case "word-to-number":
        return { icon: <span>🔢</span>, label: "Word to Number", color: "bg-blue-100 text-blue-700" }
      case "number-to-word":
        return { icon: <span>📝</span>, label: "Number to Word", color: "bg-cyan-100 text-cyan-700" }
      case "phonetic-matching":
        return { icon: <span>🎵</span>, label: "Sound Match", color: "bg-pink-100 text-pink-700" }
      default:
        return { icon: <span>❓</span>, label: "Multiple Choice", color: "bg-emerald-100 text-emerald-700" }
    }
  }

  const typeLabel = getQuestionTypeLabel()

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
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${typeLabel.color}`}>
          {typeLabel.icon}
          <span>{typeLabel.label}</span>
        </div>
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
      <div className="grid grid-cols-2 gap-3">
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
    message = "Perfect! You're a numbers master!"
    emoji = "🎉"
    colorClass = "from-emerald-500 to-teal-500"
  } else if (isGood) {
    message = "Great job! You know your numbers!"
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
          You completed the numbers practice!
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

/**
 * FooterActionBar - Sticky footer with next button.
 * @param completedCount - Completed numbers
 * @param totalCount - Total (37)
 * @param canProceed - All completed
 * @param onNext - Next callback
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
                All numbers completed!
              </span>
            ) : (
              <span className="text-slate-500">
                Play every number twice to unlock
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
// MAIN COMPONENT
// =============================================================================

/**
 * NumbersLessonPage - Main component for A0 Lesson 2.
 *
 * Manages:
 * - Play counts for each number (must play twice to complete)
 * - Audio playback state
 * - Progress tracking
 * - Practice section with quiz questions
 * - Navigation to next topic
 *
 * @returns JSX.Element - The numbers lesson page
 */
export default function NumbersLessonPage() {
  // ---------------------------------------------------------------------------
  // STATE: Play Counts for Each Number
  // ---------------------------------------------------------------------------
  const [playCounts, setPlayCounts] = useState<number[]>(Array(numbers.length).fill(0))
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  
  // ---------------------------------------------------------------------------
  // STATE: Practice Section
  // ---------------------------------------------------------------------------
  const [showPractice, setShowPractice] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [practiceAudioPlaying, setPracticeAudioPlaying] = useState(false)
  
  // ---------------------------------------------------------------------------
  // REF: Audio Element
  // ---------------------------------------------------------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ---------------------------------------------------------------------------
  // DERIVED STATE: Completion Stats
  // ---------------------------------------------------------------------------
  const completedCount = playCounts.filter(count => count >= 2).length
  const totalCount = numbers.length
  const learningComplete = completedCount === totalCount
  const canProceed = learningComplete && practiceCompleted

  // ---------------------------------------------------------------------------
  // HANDLER: Play Audio for Number
  // ---------------------------------------------------------------------------
  const handlePlay = (index: number) => {
    if (playingIndex !== null) return

    const number = numbers[index]
    
    setPlayCounts(prev => {
      const newCounts = [...prev]
      newCounts[index] = newCounts[index] + 1
      return newCounts
    })

    setPlayingIndex(index)
    
    if (audioRef.current) {
      audioRef.current.pause()
    }
    
    audioRef.current = new Audio(number.audioSrc)
    audioRef.current.play().catch(() => {
      console.log(`Audio not found: ${number.audioSrc}`)
    })
    
    audioRef.current.onended = () => {
      setPlayingIndex(null)
    }
    
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
  const handleNext = () => {
    if (canProceed) {
      window.location.href = "/classes/A0/lesson3"
    }
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Continue from Results
  // ---------------------------------------------------------------------------
  const handleContinueToNext = () => {
    window.location.href = "/classes/A0/lesson3"
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

        {/* Number Cards Grouped by Sections */}
        {sections.map((section) => (
          <div key={section.name}>
            <SectionHeader name={section.name} />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {numbers.slice(section.start, section.end).map((number, idx) => {
                const globalIndex = section.start + idx
                return (
                  <NumberCard
                    key={number.value}
                    number={number}
                    playCount={playCounts[globalIndex]}
                    isCompleted={playCounts[globalIndex] >= 2}
                    isPlaying={playingIndex === globalIndex}
                    onPlay={() => handlePlay(globalIndex)}
                  />
                )
              })}
            </div>
          </div>
        ))}

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
                Test your knowledge with {practiceQuestions.length} interactive questions about French numbers.
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
                  Play every number twice to unlock practice
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
