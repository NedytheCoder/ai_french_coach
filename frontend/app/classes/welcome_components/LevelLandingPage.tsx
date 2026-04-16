/**
 * LevelLandingPage - Level Landing Page Layout Wrapper
 * ======================================================
 *
 * This component provides a consistent layout wrapper for CEFR level landing/welcome
 * pages. It establishes a full-height gradient background and centered content container
 * for all level-specific welcome content.
 *
 * **Layout Features:**
 * - Full viewport height (min-h-screen) with soft gradient background
 * - Three-color gradient: slate-50 → indigo-50 → slate-100 (subtle, professional)
 * - Bottom padding (pb-24) to ensure content doesn't get cut off
 * - Centered content container with max-width constraint (max-w-3xl)
 * - Responsive horizontal padding (px-4)
 * - Vertical spacing (py-8)
 *
 * **Usage Context:**
 * Used as the root wrapper for all level welcome pages (/classes/[level]/welcome).
 * Provides consistent visual foundation while allowing flexible child content.
 *
 * **Usage Example:**
 * ```tsx
 * <LevelLandingPage>
 *   <LevelHeader level="A1 Beginner" title="Start Your Journey" ... />
 *   <InfoSection title="What You'll Learn">...</InfoSection>
 *   <CTAButton href="/classes/A1" text="Start Learning" ... />
 * </LevelLandingPage>
 * ```
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// Animation library (imported but available for child components)
import { motion } from 'framer-motion'
// React type for children prop
import { ReactNode } from 'react'

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * LevelLandingPageProps - Props for the LevelLandingPage layout wrapper.
 *
 * @property children - React content to render inside the layout
 * @property className - Optional additional CSS classes for customization
 */
interface LevelLandingPageProps {
  children: ReactNode
  className?: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * LevelLandingPage - Layout wrapper for level welcome pages.
 *
 * @param children - Page content to wrap
 * @param className - Optional additional styling classes
 * @returns JSX.Element - Layout wrapper with gradient background
 */

export function LevelLandingPage({ children, className = '' }: LevelLandingPageProps) {
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 pb-24 ${className}`}>
      {/* Centered content container with max-width */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
