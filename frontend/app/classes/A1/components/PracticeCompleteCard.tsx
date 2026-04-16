/**
 * PracticeCompleteCard Component (A1 Level)
 * ==========================================
 * 
 * Purpose:
 * --------
 * Displays the final score and completion message after a practice quiz.
 * Shows a celebratory message, score breakdown, progress bar, and encouraging
 * feedback. Adapts messaging based on performance (70%+ is considered good).
 * 
 * Scoring:
 * --------
 * - 70% or higher: Green theme, celebration emoji, positive message
 * - Below 70%: Amber theme, thumbs up emoji, encouraging message
 * 
 * Usage:
 * ------
 *   import { PracticeCompleteCard } from '../components'
 *   
 *   <PracticeCompleteCard
 *     score={7}
 *     total={10}
 *   />
 */

'use client'

// Framer Motion for entrance animation
import { motion } from 'framer-motion'

/**
 * PracticeCompleteCardProps Interface
 * -----------------------------------
 * Defines the props for the PracticeCompleteCard component.
 */
interface PracticeCompleteCardProps {
  score: number   // Number of correctly answered questions
  total: number   // Total number of questions in the quiz
}

/**
 * PracticeCompleteCard functional component
 * 
 * Renders a completion summary with:
 * - Celebration emoji (varies by score)
 * - Score display (X out of Y)
 * - Visual progress bar showing percentage
 * - Encouraging feedback message
 * - Color-coded theming based on performance
 * 
 * @param {PracticeCompleteCardProps} props - Component props
 * @returns {JSX.Element} The rendered completion card
 */
export function PracticeCompleteCard({ score, total }: PracticeCompleteCardProps) {
  // Calculate percentage score (0-100)
  const percentage = (score / total) * 100
  
  // Determine if score is considered good (70% threshold)
  const isGood = percentage >= 70

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center"
    >
      {/* Score emoji icon - celebration or thumbs up */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
        isGood ? 'bg-green-100' : 'bg-amber-100'
      }`}>
        <span className="text-3xl">{isGood ? '🎉' : '👍'}</span>
      </div>
      
      {/* Completion heading */}
      <h3 className="text-xl font-bold text-slate-800 mb-2">Practice Complete!</h3>
      
      {/* Score text */}
      <p className="text-slate-600 mb-4">
        You scored {score} out of {total}
      </p>
      
      {/* Visual score bar */}
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden max-w-xs mx-auto mb-4">
        <div 
          className={`h-full ${isGood ? 'bg-green-500' : 'bg-amber-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Encouraging message */}
      <p className={`text-sm font-medium ${isGood ? 'text-green-600' : 'text-amber-600'}`}>
        {isGood 
          ? "Great job! You're ready to move on." 
          : "Good effort! Review the lesson and try again."}
      </p>
    </motion.div>
  )
}
