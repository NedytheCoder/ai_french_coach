/**
 * SectionCard Component (A1 Level)
 * ==================================
 * 
 * Purpose:
 * --------
 * A reusable card component for A1 lesson content sections. Each section
 * has a colorful icon badge, title, subtitle, and a "Mark as Reviewed" button.
 * Sections can contain any content via the children prop. Used for organizing
 * lesson content into digestible chunks.
 * 
 * Features:
 * ---------
 * - Colorful gradient icon badges (rotates through 5 color schemes)
 * - "Mark as Reviewed" button with stateful styling
 * - Staggered entrance animations based on index
 * - White card container with shadow and border
 * 
 * Usage:
 * ------
 *   import { SectionCard } from '../components'
 *   
 *   <SectionCard
 *     title="Subject Pronouns"
 *     subtitle="Learn who is doing the action"
 *     icon="👤"
 *     isReviewed={false}
 *     onMarkReviewed={() => markSection('pronouns')}
 *     index={0}
 *   >
 *     <PronounList />
 *   </SectionCard>
 */

'use client'

// Framer Motion for entrance animations
import { motion } from 'framer-motion'
// React Icons - Font Awesome check icon
import { FaCheck } from 'react-icons/fa'

/**
 * SectionCardProps Interface
 * --------------------------
 * Defines the props for the SectionCard component.
 */
interface SectionCardProps {
  title: string              // Section heading/title
  subtitle: string         // Secondary description text
  icon: string             // Emoji or icon character to display
  isReviewed: boolean      // Whether user has marked this section reviewed
  onMarkReviewed: () => void  // Callback when review button clicked
  index: number            // Position for staggered animation delay
  children: React.ReactNode   // Content to render inside the section
}

/**
 * Color rotation array for section icon badges.
 * Each section gets a different gradient color based on its index.
 * Cycles through: purple, blue, emerald, orange, rose.
 */
const colors = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-rose-500 to-red-500'
]

/**
 * SectionCard functional component
 * 
 * Renders a collapsible-style content section with:
 * - Animated entrance with staggered delay
 * - Gradient icon badge based on section index
 * - Title and subtitle header area
 * - "Mark as Reviewed" toggle button
 * - Content area for child components
 * 
 * @param {SectionCardProps} props - Component props
 * @returns {JSX.Element} The rendered section card
 */
export function SectionCard({ title, subtitle, icon, isReviewed, onMarkReviewed, index, children }: SectionCardProps) {
  // Select color based on index (cycles through the colors array)
  const colorClass = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-8"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Section header with icon, title, and review button */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-start justify-between">
            {/* Left side: Icon badge and text */}
            <div className="flex items-center gap-3">
              {/* Gradient icon badge - color based on section index */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white shadow-md`}>
                <span className="text-2xl">{icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                <p className="text-sm text-slate-600">{subtitle}</p>
              </div>
            </div>
            
            {/* Right side: Review toggle button */}
            <button
              onClick={onMarkReviewed}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isReviewed
                  ? 'bg-green-100 text-green-700'    /* Reviewed state: green */
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'  /* Unreviewed: purple */
              }`}
            >
              {isReviewed ? (
                <><FaCheck size={14} /> Reviewed</>
              ) : (
                <><FaCheck size={14} /> Mark as Reviewed</>
              )}
            </button>
          </div>
        </div>

        {/* Section content area - renders children prop */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
