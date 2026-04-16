/**
 * A1 Components Barrel Export
 * =============================
 * 
 * This file serves as the central export point for all A1 (elementary) level
 * lesson components. Using barrel exports allows lesson pages to import
 * multiple components from a single import statement.
 * 
 * Import Pattern:
 * ---------------
 * Instead of importing from individual files:
 *   import { LessonHeader } from './components/LessonHeader'
 *   import { ProgressBar } from './components/ProgressBar'
 * 
 * Use the barrel export:
 *   import { LessonHeader, ProgressBar, SectionCard } from './components'
 * 
 * Or import everything as a namespace:
 *   import * as Components from './components'
 *   <Components.LessonHeader ... />
 * 
 * Available Components:
 * ---------------------
 * - LessonHeader:           Level badge, title, subtitle header with gradient
 * - ProgressBar:            Combined section and practice progress indicator
 * - SectionCard:            Reviewable content section with icon badge
 * - AudioCard:              Audio content card with color-coded variants
 * - PracticeCard:           Interactive quiz question with feedback
 * - PracticeCompleteCard:   Score summary after quiz completion
 * - StickyFooter:           Fixed bottom navigation with status
 * 
 * Available Interfaces:
 * ---------------------
 * - Question:               Type definition for practice question data
 */

// Layout and header components
export { LessonHeader } from './LessonHeader'
export { ProgressBar } from './ProgressBar'
export { SectionCard } from './SectionCard'

// Content components
export { AudioCard } from './AudioCard'

// Practice and quiz components
export { PracticeCard } from './PracticeCard'
export { PracticeCompleteCard } from './PracticeCompleteCard'

// Navigation components
export { StickyFooter } from './StickyFooter'

// Export types for external use
export type { Question } from './PracticeCard'
