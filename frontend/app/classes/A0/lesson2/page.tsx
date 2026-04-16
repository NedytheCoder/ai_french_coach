/**
 * A0 Lesson 2 - French Numbers Pronunciation
 * =============================================
 *
 * This is the second lesson for absolute beginners (A0 level).
 * It teaches French numbers 1-100 with audio pronunciation,
 * phonetic guides, and interactive play functionality.
 *
 * **Lesson Content:**
 * - Numbers 1-30 (full sequence)
 * - Tens: 40, 50, 60, 70, 80, 90
 * - 100 (cent)
 * - Phonetic pronunciation guides for each number
 * - Grouped into sections for easier learning
 *
 * **Features:**
 * - Interactive number cards with play button
 * - Visual progress tracking
 * - Audio playback with completion states
 * - Section grouping (1-10, 11-20, 21-30, Tens & 100)
 * - Sticky footer with navigation
 * - Completion requirement: play every number at least 2 times
 *
 * **Components:**
 * - LessonHeader - Title and instructions
 * - ProgressBar - Visual progress indicator
 * - NumberCard - Individual number with audio controls
 * - SectionHeader - Visual divider for number groups
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
import { FaPlay, FaCheck, FaArrowRight } from "react-icons/fa"

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
 * @returns JSX.Element - The numbers lesson page
 */
export default function NumbersLessonPage() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const [playCounts, setPlayCounts] = useState<number[]>(Array(numbers.length).fill(0))
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------
  const completedCount = playCounts.filter(count => count >= 2).length
  const totalCount = numbers.length
  const canProceed = completedCount === totalCount

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------
  /**
   * handlePlay - Plays audio for a number.
   * @param index - Index in numbers array
   */
  const handlePlay = (index: number) => {
    if (playingIndex !== null) return

    const number = numbers[index]
    
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
    
    audioRef.current = new Audio(number.audioSrc)
    audioRef.current.play().catch(() => {
      // Audio file might not exist yet, just simulate
      console.log(`Audio not found: ${number.audioSrc}`)
    })
    
    audioRef.current.onended = () => {
      setPlayingIndex(null)
    }
    
    // Fallback if audio fails or is not loaded
    setTimeout(() => {
      setPlayingIndex(prev => prev === index ? null : prev)
    }, 1000)
  }

  /**
   * handleNext - Navigates to Lesson 3.
   */
  const handleNext = () => {
    if (canProceed) {
      window.location.href = "/classes/A0/lesson3"
    }
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
            ← Back to Home
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
      </div>

      {/* Sticky Footer - Next button (enabled when all played twice) */}
      <FooterActionBar
        completedCount={completedCount}
        totalCount={totalCount}
        canProceed={canProceed}
        onNext={handleNext}
      />
    </div>
  )
}
