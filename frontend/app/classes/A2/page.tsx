/**
 * A2 Level Welcome Page
 * ======================
 *
 * Purpose:
 * --------
 * Landing page for A2 (pre-intermediate) level French learners.
 * Encourages learners building on their A1 foundation with more
 * complex structures and practical communication scenarios.
 *
 * Page Structure:
 * ---------------
 * 1. LevelHeader - Badge, title, and subtitle with blue-indigo branding
 * 2. Intro Section - Description of A2 progression from A1
 * 3. LearningPointsList - Advanced learning objectives
 * 4. EncouragementCard - Motivational messages for continued learning
 * 5. CTASection - Navigation to A2 lessons, A1 review, or placement test
 *
 * Color Scheme:
 * -------------
 * - Blue/Indigo gradient for A2 branding
 * - Blue-600 for icons and accents
 * - Blue-50 for card backgrounds
 *
 * Navigation:
 * -----------
 * - "Start A2 Lessons" → /classes/A2/lesson1
 * - "Review A1 content" → /classes/A1
 * - "Take placement test" → /placement-test
 */

"use client"

// React Icons - Font Awesome icons for visual elements
import { FaGraduationCap, FaArrowRight, FaBookOpen, FaClipboardCheck, FaRocket } from 'react-icons/fa'

// Welcome page components from shared components folder
import { LevelLandingPage } from '../welcome_components/LevelLandingPage'
import { LevelHeader } from '../welcome_components/LevelHeader'
import { LearningPointsList } from '../welcome_components/LearningPointsList'
import { EncouragementCard } from '../welcome_components/EncouragementCard'
import { CTASection } from '../welcome_components/CTASection'

/**
 * A2LandingPage Component
 *
 * The main landing page for the A2 (pre-intermediate) level.
 * Composed of reusable welcome components configured for A2 branding.
 *
 * @returns {JSX.Element} The rendered A2 welcome page
 */
export default function A2LandingPage() {
  return (
    <LevelLandingPage>
      <LevelHeader
        badge="Level A2"
        title="Strengthen Your French Skills"
        subtitle="Expand your ability to understand and communicate in everyday French."
        icon={FaGraduationCap}
        gradientFrom="from-blue-600"
        gradientTo="to-indigo-700"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <p className="text-slate-700 leading-relaxed mb-4">
          At A2 level, you will <strong>build on your foundation</strong>.
          You're no longer starting from scratch — you're expanding what you know.
        </p>
        <p className="text-slate-700 leading-relaxed">
          You'll become more comfortable forming longer sentences, expressing opinions,
          and handling real-world situations in French.
        </p>
      </div>

      <LearningPointsList
        title="What you'll learn"
        points={[
          "More complex sentence structures",
          "Expanded vocabulary",
          "Improved listening and reading skills",
          "More verb usage and tense control",
          "Practical communication in real situations"
        ]}
        iconColor="text-blue-600"
      />

      <EncouragementCard
        title="You're progressing"
        messages={[
          "You're no longer a beginner — you're moving forward.",
          "Consistency will take you far."
        ]}
        icon={FaRocket}
        bgColor="bg-blue-50"
        borderColor="border-blue-200"
        textColor="text-blue-800"
      />

      <CTASection
        buttons={[
          {
            label: "Start A2 Lessons",
            href: "/classes/A2/lesson1",
            primary: true,
            icon: <FaArrowRight size={18} />
          },
          {
            label: "Review A1 content",
            href: "/classes/A1",
            primary: false,
            icon: <FaBookOpen size={18} />
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
