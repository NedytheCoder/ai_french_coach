/**
 * ProgressBar Component (A2 Level)
 * =================================
 * 
 * Purpose:
 * --------
 * Displays a comprehensive progress bar for A2 lessons tracking both
 * section review completion and practice question progress. Features
 * A2 emerald-teal color scheme.
 * 
 * Usage:
 * ------
 *   import { ProgressBar } from '../components'
 *   
 *   <ProgressBar
 *     reviewedSections={{ verbs: true, tenses: false }}
 *     practiceProgress={5}
 *     totalPractice={10}
 *     sectionKeys={['verbs', 'tenses', 'vocabulary']}
 *   />
 */

'use client'

// Framer Motion for animated progress bar
import { motion } from 'framer-motion'

/**
 * SectionReview Interface - tracks completion status of lesson sections
 */
interface SectionReview {
  [key: string]: boolean
}

/**
 * ProgressBarProps Interface
 */
interface ProgressBarProps {
  reviewedSections: SectionReview  // Map of section IDs to review status
  practiceProgress: number          // Number of practice questions answered
  totalPractice: number           // Total practice questions
  sectionKeys: string[]           // Array of section IDs to track
}

/**
 * ProgressBar functional component for A2 level
 * 
 * Calculates and displays lesson progress with emerald-teal theming.
 * 
 * @param {ProgressBarProps} props - Component props
 * @returns {JSX.Element} The rendered progress bar
 */
export function ProgressBar({ reviewedSections, practiceProgress, totalPractice, sectionKeys }: ProgressBarProps) {
  // Count reviewed sections
  const completedSections = sectionKeys.filter(key => reviewedSections[key]).length
  const totalSections = sectionKeys.length
  
  // Calculate overall progress percentage
  const totalProgress = ((completedSections + practiceProgress / totalPractice) / (totalSections + 1)) * 100

  return (
    <div className="mb-8 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      {/* Header with progress label and percentage */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">Lesson Progress</span>
        <span className="text-sm font-medium text-emerald-600">{Math.round(totalProgress)}%</span>
      </div>
      
      {/* Progress bar with emerald-teal gradient */}
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${totalProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Footer with detailed counts */}
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
        <span>{completedSections}/{totalSections} sections reviewed</span>
        <span>•</span>
        <span>{practiceProgress}/{totalPractice} practice questions</span>
      </div>
    </div>
  )
}
