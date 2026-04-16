/**
 * ProgressBar Component
 * =====================
 * 
 * Purpose:
 * --------
 * Displays a visual progress bar showing completion status for lesson items.
 * Used in A0 beginner lessons to indicate how many items (letters, numbers,
 * greetings) the student has completed. Features smooth animated transitions
 * when progress updates.
 * 
 * Usage:
 * ------
 *   import { ProgressBar } from '../components'
 *   
 *   <ProgressBar
 *     completedCount={5}
 *     totalCount={10}
 *     label="Letters Learned"
 *   />
 * 
 * Props:
 * ------
 * @property {number} completedCount - Number of items completed
 * @property {number} totalCount - Total number of items to complete
 * @property {string} [label='Your Progress'] - Label text displayed above bar
 */

'use client'

// Framer Motion for smooth width animation on progress changes
import { motion } from 'framer-motion'

/**
 * TypeScript interface for ProgressBar component props
 */
interface ProgressBarProps {
  completedCount: number
  totalCount: number
  label?: string
}

/**
 * ProgressBar functional component
 * 
 * Calculates percentage and renders a progress bar with:
 * - Label and count display (e.g., "5 of 10 completed")
 * - Animated progress fill with gradient colors
 * - White card container with shadow
 * 
 * @param {ProgressBarProps} props - Component props with defaults
 * @returns {JSX.Element} The rendered progress bar
 */
export function ProgressBar({ completedCount, totalCount, label = 'Your Progress' }: ProgressBarProps) {
  // Calculate percentage for the progress bar width (0-100)
  const progress = (completedCount / totalCount) * 100

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6">
      {/* Header row with label and count display */}
      <div className="flex items-center justify-between mb-2">
        {/* Left side: Progress label */}
        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>
        {/* Right side: Completed count (e.g., "5 of 10 completed") */}
        <span className="text-sm font-semibold text-purple-600">
          {completedCount} of {totalCount} completed
        </span>
      </div>
      
      {/* Progress bar track - gray background container */}
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        {/* Animated progress fill with purple-to-blue gradient */}
        <motion.div
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
        />
      </div>
    </div>
  )
}
