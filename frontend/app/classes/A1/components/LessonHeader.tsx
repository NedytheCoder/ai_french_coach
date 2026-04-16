/**
 * LessonHeader Component (A1 Level)
 * ===================================
 * 
 * Purpose:
 * --------
 * Displays the header section for A1 (elementary) level lessons.
 * Features a gradient badge (purple to blue), lesson title, subtitle,
 * and optional description. Uses Framer Motion for smooth entrance animation.
 * 
 * Differences from A0:
 * --------------------
 * - Uses gradient badge instead of solid color
 * - Different color scheme (purple/blue vs purple only)
 * - More compact badge design
 * 
 * Usage:
 * ------
 *   import { LessonHeader } from '../components'
 *   
 *   <LessonHeader
 *     level="A1"
 *     lessonNumber={1}
 *     title="Personal Pronouns and Articles"
 *     subtitle="Learn how to say who is doing the action"
 *     description="Read the examples and complete the practice"
 *   />
 */

'use client'

// Framer Motion for entrance animation
import { motion } from 'framer-motion'

/**
 * TypeScript interface for A1 LessonHeader props
 */
interface LessonHeaderProps {
  level: string
  lessonNumber: number
  title: string
  subtitle: string
  description?: string
}

/**
 * LessonHeader functional component for A1 level
 * 
 * Renders the lesson header with:
 * - Gradient badge (purple to blue) showing level and lesson number
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
      {/* Gradient badge - purple to blue for A1 branding */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
        <span>{level} Lesson {lessonNumber}</span>
      </div>
      
      {/* Main title - responsive sizing */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        {title}
      </h1>
      
      {/* Subtitle - centered with max-width constraint */}
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        {subtitle}
      </p>
      
      {/* Optional description - smaller text */}
      {description && (
        <p className="text-sm text-slate-500">
          {description}
        </p>
      )}
    </motion.div>
  )
}
