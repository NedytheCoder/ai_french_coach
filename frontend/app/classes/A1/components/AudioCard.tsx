/**
 * AudioCard Component (A1 Level)
 * ==============================
 * 
 * Purpose:
 * --------
 * A versatile audio content card for A1 lessons. Supports multiple content
 * types (pronouns, articles, nouns) with color-coded styling. Displays
 * French text, phonetic pronunciation, example sentences, and an audio
 * play button.
 * 
 * Variants and Styling:
 * ---------------------
 * - pronoun: Slate background, purple accents
 * - article (definite): Blue background and text
 * - article (indefinite): Emerald background and text
 * - noun (masculine): Blue background and text
 * - noun (feminine): Pink background and text
 * - noun (vowel): Amber background and text
 * 
 * Usage:
 * ------
 *   import { AudioCard } from '../components'
 *   
 *   // Pronoun example
 *   <AudioCard
 *     title="Je"
 *     subtitle="I"
 *     phonetic="zhuh"
 *     example="Je suis étudiant"
 *     exampleEnglish="I am a student"
 *     playCount={1}
 *     isPlaying={false}
 *     onPlay={() => playAudio('je.mp3')}
 *     index={0}
 *     variant="pronoun"
 *   />
 */

'use client'

// Framer Motion for entrance animation
import { motion } from 'framer-motion'
// React Icons - Font Awesome play icon
import { FaPlay } from 'react-icons/fa'

/**
 * AudioCardProps Interface
 * --------------------------
 * Defines the props for the AudioCard component.
 */
interface AudioCardProps {
  title: string           // Main French word/phrase to display
  subtitle?: string     // English translation
  phonetic?: string      // Phonetic pronunciation guide
  example?: string       // Example sentence in French
  exampleEnglish?: string  // English translation of example
  playCount: number     // Times played (for tracking)
  isPlaying: boolean    // Whether audio is currently playing
  onPlay: () => void     // Callback when play button clicked
  index: number          // Position for staggered animation
  variant?: 'default' | 'pronoun' | 'article' | 'noun'  // Content type variant
  type?: 'masculine' | 'feminine' | 'vowel' | 'definite' | 'indefinite'  // Sub-type for styling
}

/**
 * AudioCard functional component
 * 
 * Renders an audio learning card with:
 * - Title (French word/phrase)
 * - Optional phonetic pronunciation
 * - Optional subtitle (English translation)
 * - Optional example sentence
 * - Play button with visual feedback
 * - Color-coded styling based on content type
 * 
 * @param {AudioCardProps} props - Component props with defaults
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
  type = 'masculine'
}: AudioCardProps) {
  /**
   * Helper function to determine background and border colors
   * based on the variant and type props.
   */
  const getStyles = () => {
    if (variant === 'pronoun') {
      return 'bg-slate-50 border-slate-200 hover:border-purple-300'
    }
    if (variant === 'article') {
      if (type === 'definite') return 'bg-blue-50 border-blue-200'
      return 'bg-emerald-50 border-emerald-200'
    }
    if (variant === 'noun') {
      if (type === 'masculine') return 'bg-blue-50 border-blue-200'
      if (type === 'feminine') return 'bg-pink-50 border-pink-200'
      return 'bg-amber-50 border-amber-200'
    }
    return 'bg-slate-50 border-slate-200 hover:border-purple-300'
  }

  /**
   * Helper function to determine text accent colors
   * based on the variant and type props.
   */
  const getTextColor = () => {
    if (variant === 'article') {
      return type === 'definite' ? 'text-blue-600' : 'text-emerald-600'
    }
    if (variant === 'noun') {
      if (type === 'masculine') return 'text-blue-600'
      if (type === 'feminine') return 'text-pink-600'
      return 'text-amber-600'
    }
    return 'text-purple-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`${getStyles()} rounded-xl p-4 border hover:shadow-sm transition-all`}
    >
      {/* Header row with title, phonetic, and play button */}
      <div className="flex items-start justify-between mb-2">
        <div>
          {/* Title and phonetic pronunciation */}
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            {phonetic && <span className={`text-sm ${getTextColor()} font-medium`}>/{phonetic}/</span>}
          </div>
          {/* English translation subtitle */}
          {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
        </div>
        
        {/* Audio play button */}
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${title}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying
              ? 'bg-purple-100 text-purple-600 animate-pulse'
              : 'bg-white text-purple-600 hover:bg-purple-50 shadow-sm'
          }`}
        >
          <FaPlay size={16} />
        </button>
      </div>
      
      {/* Optional example sentence with translation */}
      {example && (
        <div className="text-sm text-slate-500 bg-white rounded-lg p-2 border border-slate-100 mt-2">
          <span className="font-medium text-slate-700">{example}</span>
          {exampleEnglish && <span className="text-slate-400"> — {exampleEnglish}</span>}
        </div>
      )}
    </motion.div>
  )
}
