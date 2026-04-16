/**
 * AudioCard Component (A2 Level)
 * ================================
 * 
 * Purpose:
 * --------
 * A versatile audio content card for A2 lessons with emerald-teal styling.
 * Supports verb variations (regular, irregular, reflexive) with color-coded
 * backgrounds. Displays French content, phonetic guides, and example sentences.
 * 
 * Variants and Colors:
 * --------------------
 * - verb (regular): Emerald background
 * - verb (irregular): Amber background
 * - verb (reflexive): Violet background
 * - phrase: Cyan background
 * - vocabulary: Slate background
 * 
 * Usage:
 * ------
 *   import { AudioCard } from '../components'
 *   
 *   <AudioCard
 *     title="parler"
 *     subtitle="to speak"
 *     phonetic="par-lay"
 *     example="Je parle français"
 *     exampleEnglish="I speak French"
 *     playCount={1}
 *     isPlaying={false}
 *     onPlay={() => playAudio('parler.mp3')}
 *     index={0}
 *     variant="verb"
 *     type="regular"
 *   />
 */

'use client'

// Framer Motion for entrance animation
import { motion } from 'framer-motion'
// React Icons - Font Awesome play icon
import { FaPlay } from 'react-icons/fa'

/**
 * AudioCardProps Interface
 */
interface AudioCardProps {
  title: string           // French word/phrase
  subtitle?: string      // English translation
  phonetic?: string      // Pronunciation guide
  example?: string       // Example sentence
  exampleEnglish?: string  // Example translation
  playCount: number     // Times played
  isPlaying: boolean    // Audio playing state
  onPlay: () => void     // Play button callback
  index: number          // Animation delay index
  variant?: 'default' | 'verb' | 'phrase' | 'vocabulary'  // Content type
  type?: 'regular' | 'irregular' | 'reflexive'  // Verb subtype
}

/**
 * AudioCard functional component for A2 level
 * 
 * @param {AudioCardProps} props - Component props
 * @returns {JSX.Element} The rendered audio card
 */
export function AudioCard({
  title,
  subtitle,
  phonetic,
  example,
  exampleEnglish,
  playCount,
  isPlaying,
  onPlay,
  index,
  variant = 'default',
  type = 'regular'
}: AudioCardProps) {
  /**
   * Helper to determine background and border styles
   */
  const getStyles = () => {
    if (variant === 'verb') {
      if (type === 'irregular') return 'bg-amber-50 border-amber-200'
      if (type === 'reflexive') return 'bg-violet-50 border-violet-200'
      return 'bg-emerald-50 border-emerald-200'
    }
    if (variant === 'phrase') {
      return 'bg-cyan-50 border-cyan-200'
    }
    if (variant === 'vocabulary') {
      return 'bg-slate-50 border-slate-200'
    }
    return 'bg-slate-50 border-slate-200 hover:border-emerald-300'
  }

  /**
   * Helper to determine text accent color
   */
  const getTextColor = () => {
    if (variant === 'verb') {
      if (type === 'irregular') return 'text-amber-600'
      if (type === 'reflexive') return 'text-violet-600'
      return 'text-emerald-600'
    }
    if (variant === 'phrase') return 'text-cyan-600'
    return 'text-emerald-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`${getStyles()} rounded-xl p-4 border hover:shadow-sm transition-all`}
    >
      {/* Header with title, phonetic, and play button */}
      <div className="flex items-start justify-between mb-2">
        <div>
          {/* Title and phonetic */}
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            {phonetic && <span className={`text-sm ${getTextColor()} font-medium`}>/{phonetic}/</span>}
          </div>
          {/* English subtitle */}
          {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
        </div>
        
        {/* Play button with emerald styling */}
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${title}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying
              ? 'bg-emerald-100 text-emerald-600 animate-pulse'
              : 'bg-white text-emerald-600 hover:bg-emerald-50 shadow-sm'
          }`}
        >
          <FaPlay size={16} />
        </button>
      </div>
      
      {/* Optional example sentence */}
      {example && (
        <div className="text-sm text-slate-500 bg-white rounded-lg p-2 border border-slate-100 mt-2">
          <span className="font-medium text-slate-700">{example}</span>
          {exampleEnglish && <span className="text-slate-400"> — {exampleEnglish}</span>}
        </div>
      )}
    </motion.div>
  )
}
