/**
 * ProgressBar Component (A1 Level)
 * ==================================
 * 
 * Purpose:
 * --------
 * Displays a comprehensive progress bar for A1 lessons that tracks both
 * section review completion and practice question progress. Calculates
 * overall lesson progress as a weighted combination of both metrics.
 * 
 * Progress Calculation:
 * ---------------------
 * - Sections reviewed: Count of marked-as-reviewed sections
 * - Practice questions: Current progress through practice
 * - Total progress: (sections + practice%) / (totalSections + 1) * 100
 * 
 * Usage:
 * ------
 *   import { ProgressBar } from '../components'
 *   
 *   const reviewedSections = { pronouns: true, articles: false }
 *   const sectionKeys = ['pronouns', 'articles', 'verbs']
 *   
 *   <ProgressBar
 *     reviewedSections={reviewedSections}
 *     practiceProgress={3}
 *     totalPractice={8}
 *     sectionKeys={sectionKeys}
 *   />
 */

'use client'

// Framer Motion for animated progress bar width
import { motion } from 'framer-motion'

/**
 * SectionReview Interface
 * -------------------------
 * Record type where keys are section IDs and values are boolean review status.
 * Flexible structure allows any number of sections to be tracked.
 */
interface SectionReview {
  [key: string]: boolean
}

/**
 * ProgressBarProps Interface
 * --------------------------
 * Defines props for the A1 ProgressBar component.
 */
interface ProgressBarProps {
  reviewedSections: SectionReview  // Map of section IDs to review status
  practiceProgress: number        // Number of practice questions answered
  totalPractice: number          // Total number of practice questions
  sectionKeys: string[]          // Array of section IDs to track
}

/**
 * ProgressBar functional component
 * 
 * Calculates and displays:
 * - Percentage complete (sections + practice combined)
 * - Visual progress bar with gradient fill
 * - Text summary of sections reviewed
 * - Text summary of practice progress
 * 
 * @param {ProgressBarProps} props - Component props
 * @returns {JSX.Element} The rendered progress bar
 */
export function ProgressBar({ reviewedSections, practiceProgress, totalPractice, sectionKeys }: ProgressBarProps) {
  // Count how many sections have been marked as reviewed
  const completedSections = sectionKeys.filter(key => reviewedSections[key]).length
  const totalSections = sectionKeys.length
  
  // Calculate overall progress percentage
  // Formula: (completedSections + practiceProgress%) / (totalSections + 1) * 100
  // The +1 accounts for the practice section in the total
  const totalProgress = ((completedSections + practiceProgress / totalPractice) / (totalSections + 1)) * 100

  return (
    <div className="mb-8 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      {/* Header row with label and percentage */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">Lesson Progress</span>
        <span className="text-sm font-medium text-purple-600">{Math.round(totalProgress)}%</span>
      </div>
      
      {/* Progress bar track and animated fill */}
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${totalProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Footer row with detailed counts */}
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
        <span>{completedSections}/{totalSections} sections reviewed</span>
        <span>•</span>
        <span>{practiceProgress}/{totalPractice} practice questions</span>
      </div>
    </div>
  )
}
