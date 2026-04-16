/**
 * SectionHeader Component
 * =======================
 * 
 * Purpose:
 * --------
 * Displays a horizontal divider with a centered section name label.
 * Used to visually separate different content sections within A0 lessons.
 * Creates a clean visual break with horizontal lines on both sides of the text.
 * 
 * Usage:
 * ------
 *   import { SectionHeader } from '../components'
 *   
 *   <SectionHeader name="Basic Hellos" />
 *   <SectionHeader name="Farewells" />
 * 
 * Props:
 * ------
 * @property {string} name - The section name to display (uppercase, centered)
 */

'use client'

/**
 * TypeScript interface for SectionHeader props
 */
interface SectionHeaderProps {
  name: string
}

/**
 * SectionHeader functional component
 * 
 * Renders a centered section header with:
 * - Full-width horizontal lines on both sides
 * - Uppercase section name in the center
 * - Consistent spacing with my-6 (margin top/bottom)
 * 
 * @param {SectionHeaderProps} props - Component props
 * @returns {JSX.Element} The rendered section header
 */
export function SectionHeader({ name }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-4 my-6">
      {/* Left horizontal line - takes equal space with flex-1 */}
      <div className="flex-1 h-px bg-slate-200" />
      
      {/* Centered section name - uppercase with letter spacing */}
      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
        {name}
      </span>
      
      {/* Right horizontal line - takes equal space with flex-1 */}
      <div className="flex-1 h-px bg-slate-200" />
    </div>
  )
}
