/**
 * NumberCard Component
 * ====================
 * 
 * Purpose:
 * --------
 * Displays a French number card showing the numeric value, French word,
 * phonetic pronunciation guide, and audio playback button. Used in A0 Lesson 2
 * for teaching French numbers 0-20. Tracks completion and play count.
 * 
 * Usage:
 * ------
 *   import { NumberCard, NumberItem } from '../components'
 *   
 *   const number: NumberItem = {
 *     value: 5,
 *     word: 'cinq',
 *     phonetic: 'sank',
 *     audioSrc: '/audio/numbers/5.mp3'
 *   }
 *   
 *   <NumberCard
 *     number={number}
 *     playCount={2}
 *     isCompleted={true}
 *     isPlaying={false}
 *     onPlay={() => playAudio(number.audioSrc)}
 *   />
 */

'use client'

// Framer Motion for entrance animations and conditional rendering
import { motion, AnimatePresence } from 'framer-motion'
// React Icons - Font Awesome play and check icons
import { FaPlay, FaCheck } from 'react-icons/fa'

/**
 * NumberItem Interface
 * --------------------
 * Defines the data structure for a French number.
 * Exported for use in lesson pages and data files.
 */
export interface NumberItem {
  value: number
  word: string
  phonetic: string
  audioSrc: string
}

/**
 * NumberCardProps Interface
 * -------------------------
 * Defines the props for the NumberCard component.
 */
interface NumberCardProps {
  number: NumberItem       // The number data to display
  playCount: number        // Times audio played (0-2 for completion)
  isCompleted: boolean      // Whether number has been practiced enough
  isPlaying: boolean        // Whether audio is currently playing
  onPlay: () => void       // Callback when play button clicked
}

/**
 * NumberCard functional component
 * 
 * Renders a number learning card with:
 * - Large numeric value display
 * - French word with phonetic pronunciation
 * - Interactive audio play button
 * - Completion badge and play counter
 * - Color-coded states (purple = active, emerald = complete)
 * 
 * @param {NumberCardProps} props - Component props
 * @returns {JSX.Element} The rendered number card
 */
export function NumberCard({ number, playCount, isCompleted, isPlaying, onPlay }: NumberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-2xl p-4 border-2 transition-all duration-200 ${
        isCompleted
          ? 'border-emerald-400 bg-emerald-50/50 shadow-md'
          : 'border-slate-200 hover:border-purple-300'
      }`}
    >
      {/* Completion badge - animated checkmark in corner */}
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
        {/* Numeric value - large display on left */}
        <div className="flex-shrink-0 w-16 text-center">
          <div className="text-3xl font-bold text-slate-900">
            {number.value}
          </div>
        </div>

        {/* French word and phonetic guide - center content */}
        <div className="flex-1 min-w-0">
          <div className="text-lg font-semibold text-purple-700 mb-1">
            {number.word}
          </div>
          <div className="text-sm text-slate-500">
            Sounds like: <span className="italic">&quot;{number.phonetic}&quot;</span>
          </div>
        </div>

        {/* Play button and counter - right side controls */}
        <div className="flex flex-col items-end gap-2">
          <motion.button
            onClick={onPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isPlaying}
            aria-label={`Play pronunciation for number ${number.value}`}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-purple-300 text-white cursor-not-allowed'
                : isCompleted
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30'
            }`}
          >
            {isPlaying ? (
              /* Animated pulsing dot while playing */
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="w-3 h-3 bg-white rounded-full"
              />
            ) : (
              /* Play icon when idle */
              <FaPlay className="w-5 h-5 ml-0.5" />
            )}
          </motion.button>

          {/* Play counter showing X/2 progress */}
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
