/**
 * SectionCard Component (A2 Level)
 * =================================
 * 
 * Purpose:
 * --------
 * A reusable card component for A2 lesson content sections. Features
 * emerald-teal themed icon badges and the A2 color scheme. Sections
 * can be marked as reviewed and contain any content via children prop.
 * 
 * Color Rotation:
 * ---------------
 * Cycles through: emerald, cyan, violet, amber, rose
 * 
 * Usage:
 * ------
 *   import { SectionCard } from '../components'
 *   
 *   <SectionCard
 *     title="Common Verbs"
 *     subtitle="Essential verbs for daily conversation"
 *     icon="📝"
 *     isReviewed={false}
 *     onMarkReviewed={() => markSection('verbs')}
 *     index={0}
 *   >
 *     <VerbList />
 *   </SectionCard>
 */

'use client'

// Framer Motion for entrance animations
import { motion } from 'framer-motion'
// React Icons - Font Awesome check icon
import { FaCheck } from 'react-icons/fa'

/**
 * SectionCardProps Interface
 */
interface SectionCardProps {
  title: string              // Section heading
  subtitle: string           // Secondary description
  icon: string               // Emoji/icon character
  isReviewed: boolean        // Review status
  onMarkReviewed: () => void // Review button callback
  index: number              // Animation delay index
  children: React.ReactNode   // Section content
}

/**
 * Color rotation array for A2 sections
 * Cycles through: emerald, cyan, violet, amber, rose
 */
const colors = [
  'from-emerald-500 to-teal-500',
  'from-cyan-500 to-blue-500',
  'from-violet-500 to-purple-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500'
]

/**
 * SectionCard functional component for A2 level
 * 
 * @param {SectionCardProps} props - Component props
 * @returns {JSX.Element} The rendered section card
 */
export function SectionCard({ title, subtitle, icon, isReviewed, onMarkReviewed, index, children }: SectionCardProps) {
  // Select color based on index
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
            {/* Icon and title */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white shadow-md`}>
                <span className="text-2xl">{icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                <p className="text-sm text-slate-600">{subtitle}</p>
              </div>
            </div>
            
            {/* Review toggle button */}
            <button
              onClick={onMarkReviewed}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isReviewed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
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

        {/* Section content area */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
