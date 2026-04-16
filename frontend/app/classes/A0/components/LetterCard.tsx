/**
 * LetterCard Component
 * ====================
 * 
 * Purpose:
 * --------
 * Displays an individual French alphabet letter card with pronunciation guide,
 * example words, and an interactive audio play button. Used in A0 Lesson 1 for
 * teaching the French alphabet. Shows completion status and play count.
 * 
 * Usage:
 * ------
 *   import { LetterCard, LetterItem } from '../components'
 *   
 *   const letter: LetterItem = {
 *     letter: 'A',
 *     pronunciation: 'ah',
 *     examples: ['avion', 'arbre'],
 *     audioSrc: '/audio/letters/a.mp3'
 *   }
 *   
 *   <LetterCard
 *     item={letter}
 *     isCompleted={true}
 *     isPlaying={false}
 *     playCount={2}
 *     onPlay={() => playAudio(letter.audioSrc)}
 *     index={0}
 *   />
 */

'use client'

// Framer Motion for animations and AnimatePresence for conditional rendering
import { motion, AnimatePresence } from 'framer-motion'
// React Icons - Font Awesome play and check icons
import { FaPlay, FaCheck } from 'react-icons/fa'

/**
 * LetterItem Interface
 * --------------------
 * Defines the data structure for a French alphabet letter.
 * This interface is exported so lesson pages can use it for type safety.
 */
export interface LetterItem {
  letter: string
  pronunciation: string
  examples: string[]
  audioSrc: string
}

/**
 * LetterCardProps Interface
 * -------------------------
 * Defines the props for the LetterCard component.
 */
interface LetterCardProps {
  item: LetterItem           // The letter data to display
  isCompleted: boolean       // Whether user has played audio twice
  isPlaying: boolean         // Whether audio is currently playing
  playCount: number          // Number of times audio has been played (0-2)
  onPlay: () => void        // Callback when play button is clicked
  index: number             // Index for staggered animation delay
}

/**
 * LetterCard functional component
 * 
 * Renders an interactive letter card with:
 * - Large letter display
 * - Pronunciation guide and example words
 * - Animated play button with visual feedback
 * - Completion badge and play counter
 * - Conditional styling based on completion state
 * 
 * @param {LetterCardProps} props - Component props
 * @returns {JSX.Element} The rendered letter card
 */
export function LetterCard({ item, isCompleted, isPlaying, playCount, onPlay, index }: LetterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative bg-white rounded-2xl p-4 border-2 transition-all duration-200 ${
        isCompleted
          ? 'border-emerald-400 bg-emerald-50/50 shadow-md'
          : 'border-slate-200 hover:border-purple-300'
      }`}
    >
      {/* Completion badge - only shows when isCompleted is true */}
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
        {/* Letter display - large bold letter */}
        <div className="flex-shrink-0 w-16 text-center">
          <div className="text-4xl font-bold text-slate-900">
            {item.letter}
          </div>
        </div>

        {/* Pronunciation and examples - takes remaining space */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-purple-700 mb-1">
            {item.pronunciation}
          </div>
          <div className="text-xs text-slate-500">
            {item.examples.join(', ')}
          </div>
        </div>

        {/* Play button and counter - right side */}
        <div className="flex flex-col items-end gap-2">
          <motion.button
            onClick={onPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isPlaying}
            aria-label={`Play pronunciation for letter ${item.letter}`}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-purple-300 text-white cursor-not-allowed'
                : isCompleted
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30'
            }`}
          >
            {isPlaying ? (
              /* Pulsing dot animation while audio plays */
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="w-3 h-3 bg-white rounded-full"
              />
            ) : (
              /* Play icon when not playing */
              <FaPlay className="w-5 h-5 ml-0.5" />
            )}
          </motion.button>

          {/* Play counter - shows progress toward completion (2 plays needed) */}
          <div className={`text-xs font-medium ${
            isCompleted ? 'text-emerald-600' : 'text-slate-500'
          }`}>
            Played {playCount}/2
          </div>
        </div>
      </div>
    </motion.div>
  )
}
