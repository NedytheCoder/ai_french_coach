/**
 * StickyFooter Component (A1 Level)
 * ===================================
 * 
 * Purpose:
 * --------
 * A fixed navigation footer that appears at the bottom of A1 lesson pages.
 * Shows completion status, provides contextual messaging about what remains
 * to be done, and enables navigation to the next lesson when complete.
 * 
 * Status Indicators:
 * ------------------
 * - Green dot: Lesson fully complete (sections reviewed + practice done)
 * - Amber dot: Lesson incomplete with message about remaining tasks
 * 
 * Navigation:
 * -----------
 * - Complete state: Purple gradient button, hover effects enabled
 * - Incomplete state: Gray disabled button with cursor-not-allowed
 * 
 * Usage:
 * ------
 *   import { StickyFooter } from '../components'
 *   
 *   <StickyFooter
 *     lessonComplete={false}
 *     allSectionsReviewed={true}
 *     practiceComplete={false}
 *     nextLessonPath="/classes/A1/lesson2"
 *   />
 */

'use client'

// React Icons - Font Awesome arrow icon
import { FaArrowRight } from 'react-icons/fa'

/**
 * StickyFooterProps Interface
 * ---------------------------
 * Defines the props for the StickyFooter component.
 */
interface StickyFooterProps {
  lessonComplete: boolean       // Whether entire lesson is complete
  allSectionsReviewed: boolean  // Whether all sections marked as reviewed
  practiceComplete: boolean      // Whether all practice questions answered
  nextLessonPath: string         // URL path to next lesson
}

/**
 * StickyFooter functional component
 * 
 * Renders a fixed bottom navigation bar with:
 * - Status indicator dot (green/amber)
 * - Contextual message about remaining tasks
 * - Continue button with conditional styling
 * 
 * @param {StickyFooterProps} props - Component props
 * @returns {JSX.Element} The rendered sticky footer
 */
export function StickyFooter({
  lessonComplete,
  allSectionsReviewed,
  practiceComplete,
  nextLessonPath
}: StickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Status indicator with message */}
        <div className="flex items-center gap-3">
          {lessonComplete ? (
            /* Complete state - green indicator */
            <>
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-slate-600">Lesson complete! Ready to continue.</span>
            </>
          ) : (
            /* Incomplete state - amber indicator with specific message */
            <>
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-slate-600">
                {!allSectionsReviewed 
                  ? 'Review all sections to continue' 
                  : 'Complete all practice questions to continue'}
              </span>
            </>
          )}
        </div>
        
        {/* Continue navigation button */}
        <button
          disabled={!lessonComplete}
          onClick={() => window.location.href = nextLessonPath}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            lessonComplete
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <FaArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
