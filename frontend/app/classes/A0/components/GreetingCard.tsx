/**
 * GreetingCard Component
 * ======================
 * 
 * Purpose:
 * --------
 * Displays a French greeting phrase card with the French text, English translation,
 * phonetic pronunciation guide, and interactive audio button. Used in A0 Lesson 3
 * for teaching common French greetings and farewells. Features visual progress
 * indication through border color changes.
 * 
 * Usage:
 * ------
 *   import { GreetingCard, Greeting } from '../components'
 *   
 *   const greeting: Greeting = {
 *     id: 'bonjour',
 *     french: 'Bonjour',
 *     english: 'Hello / Good morning',
 *     phonetic: 'bohn-zhoor',
 *     audioSrc: '/audio/greetings/bonjour.mp3'
 *   }
 *   
 *   <GreetingCard
 *     greeting={greeting}
 *     playCount={2}
 *     isPlaying={false}
 *     isComplete={true}
 *     onPlay={() => playAudio(greeting.audioSrc)}
 *     index={0}
 *   />
 */

'use client'

// Framer Motion for animations and presence transitions
import { motion, AnimatePresence } from 'framer-motion'
// React Icons - Font Awesome play and check icons
import { FaPlay, FaCheck } from 'react-icons/fa'

/**
 * Greeting Interface
 * ------------------
 * Defines the data structure for a French greeting phrase.
 * Includes unique ID for tracking and audio source for playback.
 */
export interface Greeting {
  id: string
  french: string
  english: string
  phonetic: string
  audioSrc: string
}

/**
 * GreetingCardProps Interface
 * ---------------------------
 * Defines the props for the GreetingCard component.
 */
interface GreetingCardProps {
  greeting: Greeting      // The greeting data with French/English/phonetic
  playCount: number        // Number of times played (0-2)
  isPlaying: boolean      // Whether audio is currently playing
  isComplete: boolean     // Whether greeting has been practiced twice
  onPlay: () => void       // Callback when play button clicked
  index: number           // Index for staggered entrance animation
}

/**
 * GreetingCard functional component
 * 
 * Renders a greeting phrase card with:
 * - French phrase in bold
 * - English translation
 * - Phonetic pronunciation guide
 * - Play button with audio feedback
 * - Completion badge
 * - Visual state indicators (border colors)
 * 
 * Border colors indicate progress:
 * - Gray (default): Not started
 * - Amber: Played once (partial progress)
 * - Green: Completed (played twice)
 * 
 * @param {GreetingCardProps} props - Component props
 * @returns {JSX.Element} The rendered greeting card
 */
export function GreetingCard({ greeting, playCount, isPlaying, isComplete, onPlay, index }: GreetingCardProps) {
  /**
   * Helper function to determine border styling based on completion state.
   * Returns different Tailwind classes for visual progress indication.
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
      {/* Completion badge - green checkmark in top-right corner */}
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

      {/* French greeting phrase - main content */}
      <h3 className="text-xl font-bold text-slate-800 mb-1">{greeting.french}</h3>

      {/* English translation - secondary text */}
      <p className="text-sm text-slate-600 mb-2">{greeting.english}</p>

      {/* Phonetic pronunciation guide - italic styled */}
      <p className="text-sm font-medium text-purple-600 mb-3 italic">
        /{greeting.phonetic}/
      </p>

      {/* Controls row - play button and progress counter */}
      <div className="flex items-center justify-between">
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

        {/* Play counter showing X/2 progress */}
        <span className={`text-sm font-medium ${
          isComplete ? 'text-green-600' : 'text-slate-500'
        }`}>
          Played {playCount}/2
        </span>
      </div>
    </motion.div>
  )
}
