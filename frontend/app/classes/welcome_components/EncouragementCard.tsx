/**
 * EncouragementCard - Encouragement/Info Card Component
 * =====================================================
 *
 * This component renders a themed card for displaying encouragement messages,
 * tips, or important information. Features customizable colors and optional
 * icon support. Used in welcome/onboarding flows to provide motivational
 * content or helpful guidance.
 *
 * **Features:**
 * - Animated entrance using framer-motion (fade in + slide up with delay)
 * - Fully customizable color scheme via Tailwind classes
 * - Optional title with icon support
 * - Multiple message support (array of strings)
 * - Warm amber default theme (encouraging, friendly)
 * - Spaced message layout for readability
 *
 * **Props:**
 * - title: Optional card heading text
 * - messages: Array of message text strings to display
 * - icon: Optional react-icon component (e.g., FaLightbulb, FaStar)
 * - bgColor: Tailwind background color class (default: 'bg-amber-50')
 * - borderColor: Tailwind border color class (default: 'border-amber-200')
 * - textColor: Tailwind text color class (default: 'text-amber-800')
 *
 * **Default Theme:**
 * Amber color scheme creates a warm, encouraging visual feel perfect for
 * motivational content and positive reinforcement.
 *
 * **Usage Example:**
 * ```tsx
 * <EncouragementCard
 *   title="Keep Going!"
 *   messages={[
 *     "You're making great progress!",
 *     "Consistency is key to mastery."
 *   ]}
 *   icon={FaStar}
 *   bgColor="bg-blue-50"
 *   borderColor="border-blue-200"
 *   textColor="text-blue-800"
 * />
 * ```
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// Animation library for entrance effects
import { motion } from 'framer-motion'
// Type definition for react-icons
import { IconType } from 'react-icons'

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * EncouragementCardProps - Props for the EncouragementCard component.
 *
 * @property title - Optional card heading text
 * @property messages - Array of message text strings to display
 * @property icon - Optional react-icon component type
 * @property bgColor - Tailwind background color class
 * @property borderColor - Tailwind border color class
 * @property textColor - Tailwind text color class
 */
interface EncouragementCardProps {
  title?: string
  messages: string[]
  icon?: IconType
  bgColor?: string
  borderColor?: string
  textColor?: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * EncouragementCard - Renders a themed card with encouragement messages.
 *
 * @param title - Optional card heading
 * @param messages - Array of message strings
 * @param icon - Optional icon component (renamed to Icon for JSX usage)
 * @param bgColor - Background color class (default: 'bg-amber-50')
 * @param borderColor - Border color class (default: 'border-amber-200')
 * @param textColor - Text color class (default: 'text-amber-800')
 * @returns JSX.Element - Encouragement card
 */
export function EncouragementCard({
  title,
  messages,
  icon: Icon,
  bgColor = 'bg-amber-50',
  borderColor = 'border-amber-200',
  textColor = 'text-amber-800'
}: EncouragementCardProps) {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`${bgColor} rounded-2xl border ${borderColor} p-6 mb-6`}
    >
      {/* Optional title with icon */}
      {title && (
        <div className="flex items-center gap-2 mb-3">
          {Icon && <Icon size={20} className={textColor} />}
          <h3 className={`font-bold text-lg ${textColor}`}>{title}</h3>
        </div>
      )}
      {/* Messages container with themed text color */}
      <div className={`${textColor} space-y-2`}>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </motion.div>
  )
}
