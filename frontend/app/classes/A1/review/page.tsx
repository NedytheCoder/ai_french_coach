/**
 * A1 French Level Landing Page (A1HomePage)
 * ===========================================
 *
 * This page serves as the main landing/hub page for the A1 (Beginner) French level.
 * It provides navigation to all 10 A1 lessons and access to the final exam.
 *
 * **Page Structure:**
 * 1. Header - A1 level badge, title, and introduction text
 * 2. Lessons Section - Grid of links to all 10 A1 lessons
 * 3. Exam Card - Information about the final exam with start button
 *
 * **Features:**
 * - Responsive layout (3 columns on large screens, stacked on mobile)
 * - Gradient background for visual appeal
 * - Consistent card styling with shadows and borders
 * - Lesson grid with hover states
 * - Exam card with gradient call-to-action button
 *
 * **Exam Details:**
 * - 4 sections: Reading, Listening, Writing, Speaking
 * - 60% minimum overall score to pass
 * - Retakes allowed
 *
 * **Lessons Available:**
 * - Lessons 1-10 covering A1 curriculum topics
 *
 * **Usage:**
 * This is the entry point at `/classes/A1`
 */

// =============================================================================
// IMPORTS
// =============================================================================

// Next.js Link for client-side navigation
import Link from 'next/link'

// React Icons for UI elements
import { FaArrowRight, FaClipboardCheck } from 'react-icons/fa'

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * A1HomePage - Main landing page for A1 French level.
 *
 * Renders:
 * - A1 header with description
 * - Grid of lesson navigation links
 * - Exam card with exam details and start button
 *
 * @returns JSX.Element - The rendered A1 level page
 */
export default function A1HomePage() {
  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 pb-24">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header Section - Level badge, title, and description */}
        <header className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mb-3">
            A1
          </div>
          <h1 className="text-3xl font-bold text-slate-900">A1 French</h1>
          <p className="mt-2 text-slate-700 max-w-2xl">
            Work through lessons, then take the exam when you’re ready. If you don’t pass the first time, a quick review
            usually helps a lot.
          </p>
        </header>

        {/* Main Content Grid - Lessons (2/3) and Exam Card (1/3) */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Lessons Grid - Links to all 10 A1 lessons */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Lessons</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Array of all A1 lessons mapped to navigation links */}
              {[
                { href: '/classes/A1/lesson1', label: 'Lesson 1' },
                { href: '/classes/A1/lesson2', label: 'Lesson 2' },
                { href: '/classes/A1/lesson3', label: 'Lesson 3' },
                { href: '/classes/A1/lesson4', label: 'Lesson 4' },
                { href: '/classes/A1/lesson5', label: 'Lesson 5' },
                { href: '/classes/A1/lesson6', label: 'Lesson 6' },
                { href: '/classes/A1/lesson7', label: 'Lesson 7' },
                { href: '/classes/A1/lesson8', label: 'Lesson 8' },
                { href: '/classes/A1/lesson9', label: 'Lesson 9' },
                { href: '/classes/A1/lesson10', label: 'Lesson 10' }
              ].map(x => (
                <Link
                  key={x.href}
                  href={x.href}
                  className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors px-4 py-3 font-semibold text-slate-800 inline-flex items-center justify-between"
                >
                  <span>{x.label}</span>
                  <FaArrowRight className="text-slate-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* Exam Card - Final exam information and start button */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
              <FaClipboardCheck />
              Exam
            </div>
            <h2 className="text-xl font-bold text-slate-900">A1 Final Exam</h2>
            <p className="mt-2 text-sm text-slate-600">
              Reading → Listening → Writing → Speaking. You need at least 60% overall to unlock the next class.
            </p>
            <Link
              href="/classes/A1/exam"
              className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-xl px-5 py-3 font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg transition-all"
            >
              Start exam <FaArrowRight />
            </Link>
            <div className="mt-3 text-xs text-slate-500">
              You can review lessons first, and you can retake the exam any time.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

