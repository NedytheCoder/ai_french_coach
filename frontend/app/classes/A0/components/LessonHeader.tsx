/**
 * LessonHeader Component
 * ======================
 * 
 * Purpose:
 * --------
 * This component displays the header section for A0 (beginner) level lessons.
 * It shows the CEFR level badge, lesson number, main title, and optional
 * subtitle and description text. The component uses Framer Motion for
 * smooth entrance animations.
 * 
 * Usage:
 * ------
 * Import and use in any A0 lesson page:
 * 
 *   import { LessonHeader } from '../components'
 *   
 *   <LessonHeader
 *     level="A0"
 *     lessonNumber={1}
 *     title="French Alphabet"
 *     subtitle="Learn the basics"
 *     description="Play each letter twice"
 *   />
 * 
 * Props:
 * ------
 * @property {string} level - The CEFR level (e.g., "A0", "A1", "A2")
 * @property {number} lessonNumber - The lesson number within the level
 * @property {string} title - The main lesson title (large heading)
 * @property {string} [subtitle] - Optional secondary description
 * @property {string} [description] - Optional tertiary description (smaller text)
 * 
 * Styling:
 * --------
 * - Uses Tailwind CSS for styling
 * - Purple color scheme for A0 level
 * - Responsive text sizes (3xl on mobile, 4xl on md+)
 * - Centered text alignment
 */

'use client'

// Framer Motion provides smooth entrance animations
import { motion } from 'framer-motion'

/**
 * TypeScript interface defining the props for the LessonHeader component.
 * All properties are strictly typed for better IDE support and error catching.
 */
interface LessonHeaderProps {
  level: string
  lessonNumber: number
  title: string
  subtitle?: string
  description?: string
}

/**
 * LessonHeader functional component
 * 
 * Renders the lesson header with animated entrance using Framer Motion.
 * The animation starts with opacity 0 and y position -20px, then animates
 * to fully visible at normal position.
 * 
 * @param {LessonHeaderProps} props - The component props destructured
 * @returns {JSX.Element} The rendered lesson header
 */
export function LessonHeader({ level, lessonNumber, title, subtitle, description }: LessonHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      {/* Level Badge - Shows CEFR level and lesson number with purple A0 branding */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
        <span>{level}</span>
        {/* Separator dot between level and lesson number */}
        <span className="w-1 h-1 bg-purple-400 rounded-full" />
        <span>Lesson {lessonNumber}</span>
      </div>
      
      {/* Main Title - Large, bold heading responsive text sizing */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        {title}
      </h1>
      
      {/* Subtitle - Optional, only renders if subtitle prop is provided */}
      {subtitle && (
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
          {subtitle}
        </p>
      )}
      
      {/* Description - Optional, smaller text with less emphasis */}
      {description && (
        <p className="text-sm text-slate-500">
          {description}
        </p>
      )}
    </motion.div>
  )
}
