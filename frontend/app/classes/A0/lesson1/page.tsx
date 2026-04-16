/**
 * A0 Lesson 1 - French Alphabet Pronunciation
 * =============================================
 *
 * This is the first lesson for absolute beginners (A0 level).
 * It introduces the French alphabet with audio pronunciation,
 * phonetic guides, and interactive play functionality.
 *
 * **Lesson Content:**
 * - All 26 letters of the French alphabet (A-Z)
 * - Phonetic pronunciation guides for each letter
 * - Audio playback for each letter
 * - Progress tracking (must play each letter twice to complete)
 *
 * **Features:**
 * - Interactive letter cards with play button
 * - Visual progress tracking
 * - Audio playback with completion states
 * - Sticky footer with navigation
 * - Completion requirement: play every letter at least 2 times
 *
 * **Components:**
 * - LessonHeader - Title and instructions
 * - ProgressBar - Visual progress indicator
 * - LetterCard - Individual letter with audio controls
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
import { FaPlay, FaCheck, FaArrowRight } from "react-icons/fa"

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
// MAIN COMPONENT
// =============================================================================

/**
 * AlphabetLessonPage - Main component for A0 Lesson 1.
 *
 * Manages:
 * - Play counts for each letter (must play twice to complete)
 * - Audio playback state
 * - Progress tracking
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
  // REF: Audio Element
  // ---------------------------------------------------------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ---------------------------------------------------------------------------
  // DERIVED STATE: Completion Stats
  // ---------------------------------------------------------------------------
  const completedCount = playCounts.filter(count => count >= 2).length
  const totalCount = letters.length
  const canProceed = completedCount === totalCount

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
  // HANDLER: Navigate to Next Topic
  // ---------------------------------------------------------------------------
  /**
   * handleNext - Navigates to the next lesson/topic.
   *
   * Only navigates if all letters have been played at least twice.
   * Redirects to /classes/A0/topic-2
   */
  const handleNext = () => {
    if (canProceed) {
      // Navigate to next lesson/topic
      window.location.href = "/classes/A0/topic-2"
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
      </div>

      {/* Sticky Footer - Next button (enabled when all letters played twice) */}
      <FooterActionBar
        completedCount={completedCount}
        totalCount={totalCount}
        canProceed={canProceed}
        onNext={handleNext}
      />
    </div>
  )
}
