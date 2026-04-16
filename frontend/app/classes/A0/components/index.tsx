/**
 * A0 Components Barrel Export
 * ===========================
 * 
 * This file serves as the central export point for all A0 (beginner) level
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
 *   import { LessonHeader, ProgressBar, LetterCard } from './components'
 * 
 * Or import everything as a namespace:
 *   import * as Components from './components'
 *   <Components.LessonHeader ... />
 * 
 * Available Components:
 * ---------------------
 * - LessonHeader:       Level badge, title, subtitle header for lessons
 * - ProgressBar:        Visual progress indicator with completion count
 * - SectionHeader:      Horizontal divider with section name
 * - FooterActionBar:    Sticky footer with completion status and next button
 * - LetterCard:         Interactive alphabet letter card with audio
 * - NumberCard:         French number card with phonetic guide
 * - GreetingCard:       Greeting phrase card with translation
 * 
 * Available Interfaces:
 * ---------------------
 * - LetterItem:         Type definition for alphabet letter data
 * - NumberItem:         Type definition for number data
 * - Greeting:           Type definition for greeting phrase data
 */

// Header and layout components
export { LessonHeader } from './LessonHeader'
export { ProgressBar } from './ProgressBar'
export { SectionHeader } from './SectionHeader'
export { FooterActionBar } from './FooterActionBar'

// Content card components
export { LetterCard } from './LetterCard'
export { NumberCard } from './NumberCard'
export { GreetingCard } from './GreetingCard'

// Re-export types for external use
export type { LetterItem } from './LetterCard'
export type { NumberItem } from './NumberCard'
export type { Greeting } from './GreetingCard'
