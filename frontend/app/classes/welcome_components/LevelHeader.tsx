/**
 * LevelHeader - Level Header Card Component
 * ==========================================
 *
 * This component renders an animated header card for CEFR language levels
 * (A1, A2, B1, B2, C1, C2). Features a gradient banner with badge, title,
 * subtitle, and optional icon. Used at the top of level-specific welcome pages.
 *
 * **Features:**
 * - Animated entrance using framer-motion (fade in + slide up)
 * - Customizable gradient background (Tailwind gradient classes)
 * - Optional icon support using react-icons
 * - Badge label with glassmorphism effect (bg-white/20)
 * - Responsive typography (3xl on mobile, 4xl on md+)
 * - White card with shadow and border styling
 *
 * **Props:**
 * - badge: Label text displayed in the badge (e.g., "A1 Beginner", "C2 Mastery")
 * - title: Main heading text (e.g., "Beginner Level", "Near-Native Mastery")
 * - subtitle: Descriptive subtitle text
 * - icon: Optional react-icon component (e.g., FaBook, FaGem)
 * - gradientFrom: Starting color for gradient (default: 'from-indigo-500')
 * - gradientTo: Ending color for gradient (default: 'to-purple-600')
 *
 * **Usage Example:**
 * ```tsx
 * <LevelHeader
 *   badge="C2 Mastery"
 *   title="Near-Native French"
 *   subtitle="Master sophisticated expression"
 *   icon={FaGem}
 *   gradientFrom="from-slate-800"
 *   gradientTo="to-slate-900"
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
 * LevelHeaderProps - Props interface for the LevelHeader component.
 *
 * @property badge - Label text displayed in the badge (e.g., "A1 Beginner")
 * @property title - Main heading text for the level
 * @property subtitle - Descriptive subtitle text
 * @property icon - Optional react-icon component type
 * @property gradientFrom - Starting color for gradient (Tailwind class)
 * @property gradientTo - Ending color for gradient (Tailwind class)
 */
interface LevelHeaderProps {
  badge: string
  title: string
  subtitle: string
  icon?: IconType
  gradientFrom?: string
  gradientTo?: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * LevelHeader - Renders an animated header card for a CEFR learning level.
 *
 * @param badge - Badge label text
 * @param title - Main heading text
 * @param subtitle - Descriptive subtitle
 * @param icon - Optional icon component (renamed to Icon for JSX usage)
 * @param gradientFrom - Starting gradient color class
 * @param gradientTo - Ending gradient color class
 * @returns JSX.Element - The rendered level header card
 */
export function LevelHeader({
  badge,
  title,
  subtitle,
  icon: Icon,
  gradientFrom = 'from-indigo-500',
  gradientTo = 'to-purple-600'
}: LevelHeaderProps) {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
    >
      {/* Gradient banner with badge, title, and subtitle */}
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-8 text-white`}>
        {/* Badge with glassmorphism effect and optional icon */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          {Icon && <Icon size={14} />}
          <span>{badge}</span>
        </div>
        {/* Main heading with responsive typography */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        {/* Subtitle with reduced opacity for hierarchy */}
        <p className="text-lg text-white/90">{subtitle}</p>
      </div>
    </motion.div>
  )
}
