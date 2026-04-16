/**
 * A2 PracticeCompleteCard Component
 * ===================================
 *
 * This component displays a completion card after a user finishes a practice
 * quiz in any A2 lesson. It shows the score, a progress bar, and encouraging
 * feedback based on performance.
 *
 * **Features:**
 * - Animated entrance with Framer Motion
 * - Color-coded feedback (green for ≥70%, amber for lower scores)
 * - Emoji indicator (🎉 for good scores, 👍 for others)
 * - Progress bar visualizing score percentage
 * - Encouraging message based on performance
 *
 * **Props:**
 * @param score - Number of correct answers
 * @param total - Total number of questions
 *
 * **Usage:**
 * ```tsx
 * <PracticeCompleteCard score={12} total={15} />
 * ```
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// Framer Motion for animations
import { motion } from 'framer-motion'

// =============================================================================
// TYPES
// =============================================================================

/**
 * PracticeCompleteCardProps - Props for the practice completion card.
 */
interface PracticeCompleteCardProps {
  score: number
  total: number
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * PracticeCompleteCard - Displays practice quiz results with visual feedback.
 *
 * Renders a card showing:
 * - Completion status with appropriate emoji
 * - Score display (X out of Y)
 * - Visual progress bar
 * - Performance-based encouraging message
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions
 * @returns JSX.Element - The rendered completion card
 */
export function PracticeCompleteCard({ score, total }: PracticeCompleteCardProps) {
  // Calculate percentage for display and conditional styling
  const percentage = (score / total) * 100
  
  // Determine if score is "good" (70% or higher) for color coding
  const isGood = percentage >= 70

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center"
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
        isGood ? 'bg-emerald-100' : 'bg-amber-100'
      }`}>
        <span className="text-3xl">{isGood ? '🎉' : '👍'}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Practice Complete!</h3>
      <p className="text-slate-600 mb-4">
        You scored {score} out of {total}
      </p>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden max-w-xs mx-auto mb-4">
        <div 
          className={`h-full ${isGood ? 'bg-emerald-500' : 'bg-amber-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={`text-sm font-medium ${isGood ? 'text-emerald-600' : 'text-amber-600'}`}>
        {isGood 
          ? "Excellent work! You're ready for the next lesson." 
          : "Good effort! Review the lesson and try again."}
      </p>
    </motion.div>
  )
}
