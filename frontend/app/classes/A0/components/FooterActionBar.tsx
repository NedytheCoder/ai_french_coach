/**
 * FooterActionBar Component
 * =========================
 * 
 * Purpose:
 * --------
 * A sticky footer bar that appears at the bottom of A0 lesson pages.
 * Shows completion status and provides navigation to the next lesson/topic.
 * The bar is always visible (fixed position) as the user scrolls.
 * 
 * Usage:
 * ------
 *   import { FooterActionBar } from '../components'
 *   
 *   <FooterActionBar
 *     completedCount={5}
 *     totalCount={10}
 *     canProceed={true}
 *     onNext={() => router.push('/next-lesson')}
 *     nextLabel="Continue"
 *   />
 * 
 * Props:
 * ------
 * @property {number} completedCount - Number of items completed by user
 * @property {number} totalCount - Total number of items in lesson
 * @property {boolean} canProceed - Whether user can navigate to next (controls button state)
 * @property {() => void} onNext - Callback function when next button is clicked
 * @property {string} [nextLabel='Next Topic'] - Text displayed on next button
 * @property {string} [lockedMessage] - Message shown when not all items completed
 * @property {string} [unlockedMessage] - Message shown when all items completed
 */

'use client'

// React Icons - Font Awesome checkmark and arrow icons
import { FaCheck, FaArrowRight } from 'react-icons/fa'

/**
 * TypeScript interface defining props for FooterActionBar component
 */
interface FooterActionBarProps {
  completedCount: number
  totalCount: number
  canProceed: boolean
  onNext: () => void
  nextLabel?: string
  lockedMessage?: string
  unlockedMessage?: string
}

/**
 * FooterActionBar functional component
 * 
 * Features:
 * - Fixed positioning at bottom of viewport (sticky footer)
 * - Status message showing completion progress
 * - Conditional button styling based on canProceed state
 * - Purple gradient button when active, gray when disabled
 * 
 * @param {FooterActionBarProps} props - Component props with defaults
 * @returns {JSX.Element} The rendered footer action bar
 */
export function FooterActionBar({
  completedCount,
  totalCount,
  canProceed,
  onNext,
  nextLabel = 'Next Topic',
  lockedMessage = 'Play every item twice to unlock',
  unlockedMessage = 'All items completed!'
}: FooterActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
        
        {/* Status message area showing completion progress */}
        <div className="flex-1">
          <div className="text-sm font-medium text-slate-700">
            {completedCount === totalCount ? (
              /* Success state - all items completed with checkmark icon */
              <span className="text-emerald-600 flex items-center gap-2">
                <FaCheck className="w-4 h-4" />
                {unlockedMessage}
              </span>
            ) : (
              /* Locked state - show message about completing items */
              <span className="text-slate-500">
                {lockedMessage}
              </span>
            )}
          </div>
        </div>

        {/* Next/Continue button with conditional styling based on canProceed */}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
            canProceed
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {nextLabel}
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
