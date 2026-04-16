/**
 * LevelWelcome - Shared Components for Level Welcome Pages
 * ==========================================================
 *
 * This file contains reusable components for CEFR level welcome pages (A1, A2, B1, B2, C1, C2).
 * All components support consistent theming through a color prop (emerald, blue, violet, slate)
 * and feature framer-motion animations for smooth entrance effects.
 *
 * **Components:**
 * 1. LevelHeader - Animated header with level badge, title, and subtitle
 * 2. InfoSection - Content card with title and custom children
 * 3. BulletList - Checkmark bullet list for feature lists
 * 4. CTAButton - Animated call-to-action button with arrow icon
 * 5. OutcomeCard - Outcome statement card for level completion
 *
 * **Color Themes:**
 * - emerald: Green gradient (A1 level) - freshness, beginner-friendly
 * - blue: Blue gradient (A2/B1 levels) - calm, intermediate progression
 * - violet: Purple gradient (B2 level) - sophistication, advanced
 * - slate: Gray gradient (C1/C2 levels) - elegance, mastery
 *
 * **Animation Patterns:**
 * - All components use fade-in + slide-up entrance (opacity 0→1, y: 20→0)
 * - Duration: 0.5s standard, with configurable delay for staggered reveals
 * - OutcomeCard uses scale animation (0.95→1) for emphasis
 *
 * **Usage Context:**
 * Used in /classes/[level]/welcome pages to provide consistent level introduction UI.
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

// React for JSX and types
import React from "react";
// Animation library for entrance effects
import { motion } from "framer-motion";
// Next.js navigation
import Link from "next/link";
// Icons for bullet lists and CTA buttons
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * LevelHeaderProps - Props for the LevelHeader component.
 *
 * @property level - Level identifier badge text (e.g., "A1 Beginner", "C2 Mastery")
 * @property title - Main heading text
 * @property subtitle - Descriptive subtitle text
 * @property color - Theme color for styling (emerald | blue | violet | slate)
 */
interface LevelHeaderProps {
  level: string;
  title: string;
  subtitle: string;
  color: "emerald" | "blue" | "violet" | "slate";
}

// =============================================================================
// COLOR THEME CONFIGURATION
// =============================================================================

/**
 * colorClasses - Tailwind class mappings for each supported color theme.
 *
 * Defines consistent styling classes for:
 * - badge: Level badge background and text
 * - gradient: Header gradient background
 * - button: CTA button background with hover state
 * - icon: Icon and accent color
 * - border: Card border color
 * - bg: Light background color for cards
 *
 * Available themes: emerald (A1), blue (A2/B1), violet (B2), slate (C1/C2)
 */
const colorClasses = {
  emerald: {
    badge: "bg-emerald-100 text-emerald-800",
    gradient: "from-emerald-500 to-teal-600",
    button: "bg-emerald-600 hover:bg-emerald-700",
    icon: "text-emerald-600",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
  },
  blue: {
    badge: "bg-blue-100 text-blue-800",
    gradient: "from-blue-500 to-indigo-600",
    button: "bg-blue-600 hover:bg-blue-700",
    icon: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  violet: {
    badge: "bg-violet-100 text-violet-800",
    gradient: "from-violet-500 to-purple-600",
    button: "bg-violet-600 hover:bg-violet-700",
    icon: "text-violet-600",
    border: "border-violet-200",
    bg: "bg-violet-50",
  },
  slate: {
    badge: "bg-slate-100 text-slate-800",
    gradient: "from-slate-600 to-slate-800",
    button: "bg-slate-800 hover:bg-slate-900",
    icon: "text-slate-600",
    border: "border-slate-200",
    bg: "bg-slate-50",
  },
};

// =============================================================================
// COMPONENT: LevelHeader
// =============================================================================

/**
 * LevelHeader - Renders an animated level header with badge, title, and subtitle.
 *
 * Features:
 * - Centered layout with animated entrance (fade + slide up)
 * - Color-coded badge based on level theme
 * - Responsive typography (4xl mobile, 5xl desktop)
 * - Maximum width constraint for subtitle readability
 *
 * @param level - Badge text (e.g., "A1 Beginner")
 * @param title - Main heading
 * @param subtitle - Descriptive text
 * @param color - Theme color from colorClasses
 * @returns JSX.Element - Animated header section
 */
export function LevelHeader({ level, title, subtitle, color }: LevelHeaderProps) {
  const colors = colorClasses[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${colors.badge}`}>
        {level}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{title}</h1>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  );
}

// =============================================================================
// COMPONENT: InfoSection
// =============================================================================

/**
 * InfoSectionProps - Props for the InfoSection component.
 *
 * @property title - Section heading text
 * @property children - React content (paragraphs, lists, etc.)
 * @property color - Theme color for border and icon
 * @property delay - Animation delay in seconds (for staggered reveals)
 */
interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  color: "emerald" | "blue" | "violet" | "slate";
  delay?: number;
}

/**
 * InfoSection - Renders a content card with title and custom content.
 *
 * Features:
 * - White card with themed border and shadow
 * - Animated entrance with configurable delay
 * - Color-coded title icon
 * - Relaxed line height for readability
 *
 * @param title - Section heading
 * @param children - Content to display
 * @param color - Theme color
 * @param delay - Animation delay (default: 0)
 * @returns JSX.Element - Info card section
 */
export function InfoSection({ title, children, color, delay = 0 }: InfoSectionProps) {
  const colors = colorClasses[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-white rounded-2xl p-8 shadow-sm border ${colors.border}`}
    >
      <h2 className={`text-xl font-semibold mb-4 ${colors.icon}`}>{title}</h2>
      <div className="text-slate-700 leading-relaxed">{children}</div>
    </motion.div>
  );
}

// =============================================================================
// COMPONENT: BulletList
// =============================================================================

/**
 * BulletListProps - Props for the BulletList component.
 *
 * @property items - Array of text items to display as bullets
 * @property color - Theme color for checkmark icons
 */
interface BulletListProps {
  items: string[];
  color: "emerald" | "blue" | "violet" | "slate";
}

/**
 * BulletList - Renders a checkmark bullet list.
 *
 * Features:
 * - FaCheckCircle icons with themed colors
 * - Spaced list items for readability
 * - Flex layout for icon + text alignment
 *
 * @param items - Array of bullet text strings
 * @param color - Theme color for icons
 * @returns JSX.Element - Bullet list
 */
export function BulletList({ items, color }: BulletListProps) {
  const colors = colorClasses[color];
  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <FaCheckCircle className={`mt-1 flex-shrink-0 ${colors.icon}`} />
          <span className="text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// =============================================================================
// COMPONENT: CTAButton
// =============================================================================

/**
 * CTAButtonProps - Props for the CTAButton component.
 *
 * @property href - Destination URL
 * @property text - Button label text
 * @property color - Theme color for button background
 */
interface CTAButtonProps {
  href: string;
  text: string;
  color: "emerald" | "blue" | "violet" | "slate";
}

/**
 * CTAButton - Renders an animated call-to-action button.
 *
 * Features:
 * - Themed background with hover state
 * - Scale animation on hover (105%)
 * - Arrow icon (FaArrowRight) for direction indication
 * - Large, prominent styling with shadow
 * - Delayed entrance animation (0.6s)
 *
 * @param href - Link destination
 * @param text - Button text
 * @param color - Theme color
 * @returns JSX.Element - CTA button
 */
export function CTAButton({ href, text, color }: CTAButtonProps) {
  const colors = colorClasses[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="text-center"
    >
      <Link
        href={href}
        className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all transform hover:scale-105 shadow-lg ${colors.button}`}
      >
        {text}
        <FaArrowRight />
      </Link>
    </motion.div>
  );
}

// =============================================================================
// COMPONENT: OutcomeCard
// =============================================================================

/**
 * OutcomeCardProps - Props for the OutcomeCard component.
 *
 * @property text - Outcome statement text
 * @property color - Theme color for card styling
 */
interface OutcomeCardProps {
  text: string;
  color: "emerald" | "blue" | "violet" | "slate";
}

/**
 * OutcomeCard - Renders a level outcome statement card.
 *
 * Features:
 * - Themed light background with border
 * - Scale entrance animation (0.95→1) for emphasis
 * - "At the end of this level" label with themed color
 * - Large, prominent outcome text
 * - Delayed entrance (0.5s delay)
 *
 * @param text - Outcome statement
 * @param color - Theme color
 * @returns JSX.Element - Outcome card
 */
export function OutcomeCard({ text, color }: OutcomeCardProps) {
  const colors = colorClasses[color];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`${colors.bg} rounded-2xl p-8 border ${colors.border}`}
    >
      <p className={`text-lg font-medium ${colors.icon} mb-2`}>At the end of this level</p>
      <p className="text-xl text-slate-800 font-semibold">{text}</p>
    </motion.div>
  );
}
