/**
 * A0 Level Welcome Page
 * ======================
 *
 * Purpose:
 * --------
 * Landing page for A0 (absolute beginner) level French learners.
 * Introduces the course, outlines learning objectives, and provides
 * navigation to start lessons or take a placement test.
 *
 * Page Structure:
 * ---------------
 * 1. LevelHeader - Badge, title, and subtitle with emerald-teal branding
 * 2. Intro Section - Description of what A0 level covers
 * 3. LearningPointsList - Bullet points of learning objectives
 * 4. EncouragementCard - Motivational messages for beginners
 * 5. CTASection - Call-to-action buttons (Start Lesson, Placement Test)
 *
 * Color Scheme:
 * -------------
 * - Emerald/Teal gradient for A0 branding
 * - Emerald-600 for icons and accents
 * - Emerald-50 for card backgrounds
 *
 * Navigation:
 * -----------
 * - "Start Lesson 1" → /classes/A0/lesson1
 * - "Take placement test" → /placement-test
 */

"use client"

// React Icons - Font Awesome icons for visual elements
import { FaGraduationCap, FaArrowRight, FaClipboardCheck, FaHeart } from 'react-icons/fa'

// Welcome page components from shared components folder
import { LevelLandingPage } from '../welcome_components/LevelLandingPage'
import { LevelHeader } from '../welcome_components/LevelHeader'
import { LearningPointsList } from '../welcome_components/LearningPointsList'
import { EncouragementCard } from '../welcome_components/EncouragementCard'
import { CTASection } from '../welcome_components/CTASection'

/**
 * A0LandingPage Component
 *
 * The main landing page for the A0 (absolute beginner) level.
 * Composed of reusable welcome components configured for A0 branding.
 *
 * @returns {JSX.Element} The rendered A0 welcome page
 */
export default function A0LandingPage() {
  return (
    <LevelLandingPage>
      <LevelHeader
        badge="Level A0"
        title="Welcome to Beginner French"
        subtitle="Start your journey into French from zero."
        icon={FaGraduationCap}
        gradientFrom="from-emerald-500"
        gradientTo="from-teal-600"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <p className="text-slate-700 leading-relaxed mb-4">
          This course is designed for <strong>complete beginners</strong>.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          You don't need any prior knowledge of French. We'll guide you step by step through every sound, word, and phrase.
        </p>
        <p className="text-slate-600">
          By the end of this level, you'll be ready to move into A1 with confidence.
        </p>
      </div>

      <LearningPointsList
        title="What you'll learn"
        points={[
          "French alphabet and sounds",
          "Basic pronunciation patterns",
          "Numbers and greetings",
          "Simple words and phrases",
          "How to understand basic French"
        ]}
        iconColor="text-emerald-600"
      />

      <EncouragementCard
        title="You've got this"
        messages={[
          "You don't need to be perfect.",
          "Just start — progress comes with practice."
        ]}
        icon={FaHeart}
        bgColor="bg-emerald-50"
        borderColor="border-emerald-200"
        textColor="text-emerald-800"
      />

      <CTASection
        buttons={[
          {
            label: "Start Lesson 1",
            href: "/classes/A0/lesson1",
            primary: true,
            icon: <FaArrowRight size={18} />
          },
          {
            label: "Take placement test",
            href: "/placement-test",
            primary: false,
            icon: <FaClipboardCheck size={18} />
          }
        ]}
      />
    </LevelLandingPage>
  )
}
