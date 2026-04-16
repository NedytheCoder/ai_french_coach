/**
 * LearningPointsList - Learning Points List Component
 * =====================================================
 *
 * This component renders a card displaying a list of learning objectives or key
 * takeaways with animated checkmark icons. Used in welcome/onboarding flows to
 * highlight what users will learn or achieve.
 *
 * **Features:**
 * - Animated entrance using framer-motion (fade in + slide up with delay)
 * - Card container with white background, shadow, and border
 * - Customizable title and list of points
 * - Checkmark icons with customizable color (default: green-600)
 * - Spaced list items for readability
 * - Flex layout for icon + text alignment with gap spacing
 *
 * **Props:**
 * - title: Section heading text (e.g., "What You'll Learn", "Key Takeaways")
 * - points: Array of text strings representing learning objectives
 * - iconColor: Optional Tailwind text color class for checkmarks
 *
 * **Usage Example:**
 * ```tsx
 * <LearningPointsList
 *   title="What You'll Master"
 *   points={[
 *     "Complex sentence structures",
 *     "Advanced vocabulary usage",
 *     "Idiomatic expressions"
 *   ]}
 *   iconColor="text-blue-600"
 * />
 * ```
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// Animation library for entrance effects
import { motion } from 'framer-motion'
// Checkmark icon from react-icons
import { FaCheck } from 'react-icons/fa'

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * LearningPointsListProps - Props for the LearningPointsList component.
 *
 * @property title - Section heading text (e.g., "What You'll Learn")
 * @property points - Array of learning objective text strings
 * @property iconColor - Optional Tailwind text color class for checkmark icons
 */
interface LearningPointsListProps {
  title: string
  points: string[]
  iconColor?: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * LearningPointsList - Renders a card with checkmark bullet list of learning points.
 *
 * @param title - Section heading text
 * @param points - Array of learning objective strings
 * @param iconColor - Tailwind text color class for checkmarks (default: 'text-green-600')
 * @returns JSX.Element - Learning points card
 */
export function LearningPointsList({
  title,
  points,
  iconColor = 'text-green-600'
}: LearningPointsListProps) {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6"
    >
      {/* Section title */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">{title}</h2>
      {/* Checkmark bullet list */}
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            {/* Checkmark icon with customizable color */}
            <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>
              <FaCheck size={16} />
            </div>
            {/* Learning point text */}
            <span className="text-slate-700">{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
