/**
 * A2 StickyFooter Component
 * ==========================
 *
 * This component renders a fixed footer at the bottom of A2 lesson pages
 * that displays lesson completion status and provides navigation to the next lesson.
 *
 * **Features:**
 * - Fixed position at bottom of viewport (z-50)
 * - Visual status indicator (green dot = complete, amber dot = in progress)
 * - Contextual status message based on progress
 * - Continue button with disabled state until lesson is complete
 * - Gradient styling for enabled state
 * - Smooth hover animations on enabled button
 *
 * **Props:**
 * @param lessonComplete - Whether the entire lesson is completed
 * @param allSectionsReviewed - Whether all lesson sections have been reviewed
 * @param practiceComplete - Whether the practice quiz is completed
 * @param nextLessonPath - URL path to navigate to next lesson
 *
 * **Status Messages:**
 * - "Review all sections to continue" - when sections are pending
 * - "Complete all practice questions to continue" - when practice is pending
 * - "Lesson complete! Ready to continue." - when everything is done
 *
 * **Usage:**
 * ```tsx
 * <StickyFooter
 *   lessonComplete={lessonCompleted}
 *   allSectionsReviewed={allSectionsReviewed}
 *   practiceComplete={practiceCompleted}
 *   nextLessonPath="/classes/A2/lesson2"
 * />
 * ```
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React Icons for UI elements
import { FaArrowRight } from 'react-icons/fa'

// =============================================================================
// TYPES
// =============================================================================

/**
 * StickyFooterProps - Props for the sticky footer component.
 */
interface StickyFooterProps {
  lessonComplete: boolean
  allSectionsReviewed: boolean
  practiceComplete: boolean
  nextLessonPath: string
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * StickyFooter - Fixed bottom footer showing lesson progress and continue button.
 *
 * Displays:
 * - Status indicator dot (emerald when complete, amber when pending)
 * - Contextual message based on completion state
 * - Continue button (disabled until lesson is complete)
 *
 * @param lessonComplete - Whether lesson is fully completed
 * @param allSectionsReviewed - Whether all sections are reviewed
 * @param practiceComplete - Whether practice is completed
 * @param nextLessonPath - Path to navigate to next lesson
 * @returns JSX.Element - The rendered sticky footer
 */
export function StickyFooter({
  lessonComplete,
  allSectionsReviewed,
  practiceComplete,
  nextLessonPath
}: StickyFooterProps) {
  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Status Indicator Section */}
        <div className="flex items-center gap-3">
          {lessonComplete ? (
            <>
              {/* Green dot indicator for complete status */}
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-slate-600">Lesson complete! Ready to continue.</span>
            </>
          ) : (
            <>
              {/* Amber dot indicator for pending status */}
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-slate-600">
                {!allSectionsReviewed 
                  ? 'Review all sections to continue' 
                  : 'Complete all practice questions to continue'}
              </span>
            </>
          )}
        </div>
        
        {/* Continue Button */}
        <button
          disabled={!lessonComplete}
          onClick={() => window.location.href = nextLessonPath}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            lessonComplete
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:scale-105'
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
