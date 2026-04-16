/**
 * A0 Lesson 3 - French Greetings
 * =============================================
 *
 * This is the third lesson for absolute beginners (A0 level).
 * It teaches essential French greetings and polite expressions
 * for everyday conversations.
 *
 * **Lesson Content:**
 * - Basic greetings: Bonjour, Salut, Bonsoir
 * - Polite expressions: S'il vous plaît, Merci, Pardon
 * - Introduction phrases: Je m'appelle, Enchanté(e)
 * - Organized into 3 sections for progressive learning
 *
 * **Features:**
 * - Interactive greeting cards with audio playback
 * - Visual progress tracking with localStorage persistence
 * - Phonetic pronunciation guides
 * - Section grouping (Basic Greetings, Polite Phrases, Introductions)
 * - Sticky footer with navigation
 * - Completion requirement: play every greeting at least 2 times
 *
 * **Components:**
 * - GreetingsLessonPage - Main component with state management
 * - SectionHeader - Visual section divider with gradient icons
 * - GreetingCard - Individual greeting with audio controls
 *
 * **Audio Files:**
 * - Located at /audio/greetings/[id].mp3 (imported from data.ts)
 *
 * **Data:**
 * - greetings array imported from ./data
 * - sections array for visual grouping
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management, refs, and side effects
import { useState, useRef, useEffect } from 'react'

// Framer Motion for animations and transitions
import { motion, AnimatePresence } from 'framer-motion'

// React Icons for UI elements
import { FaPlay, FaCheck, FaArrowRight, FaHome } from 'react-icons/fa'

// Next.js Link for navigation
import Link from 'next/link'

// Lesson data (greetings, sections, and Greeting type)
import { greetings, sections, Greeting } from './data'

// =============================================================================
// TYPES
// =============================================================================

/**
 * PlayCount - Type for tracking play counts by greeting ID.
 * Key: greeting id string, Value: number of times played
 */
interface PlayCount {
  [key: string]: number
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * GreetingsLessonPage - Main component for A0 Lesson 3.
 *
 * Manages:
 * - Play counts for each greeting (persisted to localStorage)
 * - Audio playback state
 * - Progress tracking
 *
 * @returns JSX.Element - The greetings lesson page
 */
export default function GreetingsLessonPage() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  // Track play count for each greeting (id -> count map)
  const [playCounts, setPlayCounts] = useState<PlayCount>({})
  // ID of currently playing greeting, or null
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  // Hydration flag to prevent localStorage mismatch
  const [isClient, setIsClient] = useState(false)
  // Audio element ref
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ---------------------------------------------------------------------------
  // EFFECT: Load Progress from localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('greetingsLessonProgress')
    if (saved) {
      setPlayCounts(JSON.parse(saved))
    }
  }, [])

  // ---------------------------------------------------------------------------
  // EFFECT: Save Progress to localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('greetingsLessonProgress', JSON.stringify(playCounts))
    }
  }, [playCounts, isClient])

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------
  /**
   * playAudio - Plays audio for a greeting and updates play count.
   * @param greeting - The greeting to play
   */
  const playAudio = (greeting: Greeting) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(greeting.audioSrc)
    audioRef.current = audio
    setCurrentlyPlaying(greeting.id)

    audio.play().catch(() => {
      console.log('Audio playback failed for:', greeting.french)
    })

    audio.onended = () => {
      setCurrentlyPlaying(null)
      setPlayCounts(prev => ({
        ...prev,
        [greeting.id]: (prev[greeting.id] || 0) + 1
      }))
    }
  }

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------
  /**
   * isGreetingComplete - Checks if a greeting has been played twice.
   * @param greeting - The greeting to check
   * @returns boolean - True if played 2+ times
   */
  const isGreetingComplete = (greeting: Greeting) => {
    return (playCounts[greeting.id] || 0) >= 2
  }

  // Count of completed greetings
  const completedCount = greetings.filter(g => isGreetingComplete(g)).length
  // All greetings completed flag
  const allComplete = completedCount === greetings.length
  // Progress percentage for progress bar
  const progressPercent = (completedCount / greetings.length) * 100

  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back to A0 Lessons Link */}
        <div className="mb-6">
          <Link
            href="/classes/A0"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
          >
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A0 Lessons</span>
          </Link>
        </div>

        {/* Lesson Header - Title and Description */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-3"
          >
            A0 Lesson 3: French Greetings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Master essential French greetings for everyday conversations
          </motion.p>
        </div>

        {/* Instructions Card - How to Practice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">👋</span> How to Practice
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold">1.</span>
              <span>Tap each greeting to hear how it sounds in French</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold">2.</span>
              <span>Repeat the sound out loud to practice pronunciation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold">3.</span>
              <span>Use the English meaning and phonetic guide to help you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold">4.</span>
              <span>Play every greeting at least twice to unlock the next lesson</span>
            </li>
          </ul>
        </motion.div>

        {/* Progress Bar - Completion Status */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              {completedCount} of {greetings.length} greetings completed
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Greeting Sections - Grouped by Category */}
        {sections.map((section, sectionIndex) => (
          <div key={section.name} className="mb-10">
            <SectionHeader name={section.name} index={sectionIndex} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {greetings.slice(section.start, section.end).map((greeting, idx) => (
                <GreetingCard
                  key={greeting.id}
                  greeting={greeting}
                  playCount={playCounts[greeting.id] || 0}
                  isPlaying={currentlyPlaying === greeting.id}
                  isComplete={isGreetingComplete(greeting)}
                  onPlay={() => playAudio(greeting)}
                  index={section.start + idx}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Footer - Next Button (enabled when all played twice) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${allComplete ? 'bg-green-500' : 'bg-amber-500'}`} />
            <span className="text-sm text-slate-600">
              {allComplete
                ? 'All greetings complete! Great job!'
                : 'Play every greeting twice to unlock the next topic.'}
            </span>
          </div>
          <button
            disabled={!allComplete}
            onClick={() => window.location.href = '/classes/A0/lesson4'}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              allComplete
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Next Topic</span>
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * SectionHeader - Visual divider for greeting sections.
 *
 * Features:
 * - Gradient colored icon based on section index
 * - Section name in bold
 * - Animated entrance with staggered delay
 * - Decorative gradient line underneath
 *
 * @param name - Section name (e.g., "Basic Greetings")
 * @param index - Section index (0, 1, 2) for color/icon selection
 */
function SectionHeader({ name, index }: { name: string; index: number }) {
  // Gradient colors for each section
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500'
  ]
  // Emoji icons for each section
  const icons = ['👋', '👋', '💬']

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex items-center gap-3">
        {/* Section Icon with Gradient Background */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center text-white shadow-md`}>
          <span className="text-lg">{icons[index]}</span>
        </div>
        {/* Section Name */}
        <h2 className="text-xl font-bold text-slate-800">{name}</h2>
      </div>
      {/* Decorative Gradient Line */}
      <div className="mt-2 h-0.5 bg-gradient-to-r from-purple-200 to-transparent" />
    </motion.div>
  )
}

/**
 * GreetingCardProps - Props for the GreetingCard component.
 */
interface GreetingCardProps {
  /** Greeting data (french, english, phonetic, audioSrc) */
  greeting: Greeting
  /** Number of times this greeting has been played */
  playCount: number
  /** Whether this greeting is currently playing */
  isPlaying: boolean
  /** Whether this greeting is complete (played twice) */
  isComplete: boolean
  /** Callback when play button is clicked */
  onPlay: () => void
  /** Global index for staggered animation delay */
  index: number
}

/**
 * GreetingCard - Individual greeting card with audio controls.
 *
 * Features:
 * - French greeting in large bold text
 * - English translation
 * - Phonetic pronunciation guide
 * - Play button with visual states
 * - Play counter (0/2, 1/2, 2/2)
 * - Completion badge when played twice
 * - Border color changes based on progress
 *
 * @param props - Component props (see GreetingCardProps)
 */
function GreetingCard({ greeting, playCount, isPlaying, isComplete, onPlay, index }: GreetingCardProps) {
  // ---------------------------------------------------------------------------
  // HELPER: Get Border Color Based on Progress
  // ---------------------------------------------------------------------------
  /**
   * getBorderColor - Returns border and background classes based on progress.
   * - Complete (2 plays): Green border and background
   * - In Progress (1 play): Amber border and background
   * - Not Started (0 plays): Default slate border
   */
  const getBorderColor = () => {
    if (isComplete) return 'border-green-400 bg-green-50/50'
    if (playCount === 1) return 'border-amber-300 bg-amber-50/30'
    return 'border-slate-200 bg-white'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`relative rounded-xl border-2 p-4 transition-all hover:shadow-md ${getBorderColor()}`}
    >
      {/* Completion Badge (shown when played twice) */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10"
          >
            <FaCheck className="text-white" size={12} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* French Greeting (Main Text) */}
      <h3 className="text-xl font-bold text-slate-800 mb-1">{greeting.french}</h3>

      {/* English Translation */}
      <p className="text-sm text-slate-600 mb-2">{greeting.english}</p>

      {/* Phonetic Pronunciation Guide */}
      <p className="text-sm font-medium text-purple-600 mb-3 italic">
        /{greeting.phonetic}/
      </p>

      {/* Play Button & Counter Row */}
      <div className="flex items-center justify-between">
        {/* Play Button */}
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${greeting.french}`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isPlaying
              ? 'bg-purple-100 text-purple-600 animate-pulse'
              : 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-md'
          }`}
        >
          <FaPlay size={14} />
          <span>{isPlaying ? 'Playing...' : 'Play'}</span>
        </button>

        {/* Play Counter (X/2) */}
        <span className={`text-sm font-medium ${
          isComplete ? 'text-green-600' : 'text-slate-500'
        }`}>
          Played {playCount}/2
        </span>
      </div>
    </motion.div>
  )
}
