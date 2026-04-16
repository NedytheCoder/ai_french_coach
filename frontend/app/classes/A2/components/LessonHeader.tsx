/**
 * LessonHeader Component (A2 Level)
 * ====================================
 * 
 * Purpose:
 * --------
 * Displays the header section for A2 (pre-intermediate) level lessons.
 * Features an emerald-to-teal gradient badge, lesson title, subtitle,
 * and optional description. Uses Framer Motion for smooth entrance animation.
 * 
 * Color Scheme:
 * -------------
 * - Emerald/Teal gradient for A2 level branding
 * - Different from A0 (purple) and A1 (purple/blue)
 * 
 * Usage:
 * ------
 *   import { LessonHeader } from '../components'
 *   
 *   <LessonHeader
 *     level="A2"
 *     lessonNumber={1}
 *     title="Common Verbs in Context"
 *     subtitle="Learn essential French verbs and their conjugations"
 *     description="Practice with real-world examples"
 *   />
 */

'use client'

// Framer Motion for entrance animation
import { motion } from 'framer-motion'

/**
 * TypeScript interface for A2 LessonHeader props
 */
interface LessonHeaderProps {
  level: string           // CEFR level (A2)
  lessonNumber: number    // Lesson number within the level
  title: string          // Main lesson title
  subtitle: string       // Secondary description
  description?: string  // Optional tertiary description
}

/**
 * LessonHeader functional component for A2 level
 * 
 * Renders the lesson header with:
 * - Emerald-teal gradient badge showing level and lesson number
 * - Large bold title
 * - Subtitle with constrained max-width for readability
 * - Optional description in smaller text
 * 
 * @param {LessonHeaderProps} props - Component props
 * @returns {JSX.Element} The rendered lesson header
 */
export function LessonHeader({ level, lessonNumber, title, subtitle, description }: LessonHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      {/* Emerald-teal gradient badge for A2 branding */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white text-sm font-medium mb-4">
        <span>{level} Lesson {lessonNumber}</span>
      </div>
      
      {/* Main title with responsive sizing */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        {title}
      </h1>
      
      {/* Subtitle - centered with max-width */}
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        {subtitle}
      </p>
      
      {/* Optional description */}
      {description && (
        <p className="text-sm text-slate-500">
          {description}
        </p>
      )}
    </motion.div>
  )
}
