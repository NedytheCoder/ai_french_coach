/**
 * CTASection - Call-to-Action Button Section Component
 * ======================================================
 *
 * This component renders a vertical stack of call-to-action buttons with
 * animated entrance effects. Used primarily in welcome/onboarding flows to
 * guide users toward key actions (starting lessons, exploring content, etc.).
 *
 * **Features:**
 * - Animated entrance using framer-motion (fade in + slide up with delay)
 * - Support for primary and secondary button styles
 * - Optional icon support for visual enhancement
 * - Full-width responsive design
 * - Next.js Link integration for client-side navigation
 *
 * **Button Types:**
 * - Primary: Gradient background (indigo to slate), white text, shadow on hover
 * - Secondary: Bordered style, slate text, color shift on hover
 *
 * **Usage Example:**
 * ```tsx
 * <CTASection
 *   buttons={[
 *     { label: 'Start Learning', href: '/classes', primary: true, icon: <FaRocket /> },
 *     { label: 'Learn More', href: '/about', primary: false }
 *   ]}
 * />
 * ```
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// Animation library for entrance effects
import { motion } from 'framer-motion'
// Next.js navigation component
import Link from 'next/link'
// React type for icon elements
import { ReactNode } from 'react'

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * CTAButton - Interface defining a single call-to-action button.
 *
 * @property label - Button text displayed to the user
 * @property href - Destination URL for navigation
 * @property primary - Whether to use primary (gradient) or secondary (bordered) style
 * @property icon - Optional React element (icon) to display before label
 */
interface CTAButton {
  label: string
  href: string
  primary?: boolean
  icon?: ReactNode
}

/**
 * CTASectionProps - Props interface for the CTASection component.
 *
 * @property buttons - Array of CTAButton objects to render
 */
interface CTASectionProps {
  buttons: CTAButton[]
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * CTASection - Renders a vertical stack of animated call-to-action buttons.
 *
 * @param buttons - Array of button configurations
 * @returns JSX.Element - The rendered CTA section
 */
export function CTASection({ buttons }: CTASectionProps) {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-3"
    >
      {/* Map through buttons array to render each CTA button */}
      {buttons.map((button, index) => (
        <Link
          key={index}
          href={button.href}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
            button.primary
              ? 'bg-gradient-to-r from-indigo-600 to-slate-700 text-white hover:shadow-lg'
              : 'border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
          }`}
        >
          {/* Optional icon displayed before button label */}
          {button.icon}
          <span>{button.label}</span>
        </Link>
      ))}
    </motion.div>
  )
}
