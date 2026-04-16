/**
 * A1 Level Welcome Page
 * ======================
 *
 * Purpose:
 * --------
 * Landing page for A1 (beginner) level French learners.
 * Introduces foundational grammar concepts and provides navigation
 * to continue learning, review previous content, or take placement tests.
 *
 * Page Structure:
 * ---------------
 * 1. LevelHeader - Badge, title, and subtitle with indigo-purple branding
 * 2. Intro Section - Description of A1 level objectives
 * 3. LearningPointsList - Grammar and vocabulary topics covered
 * 4. EncouragementCard - Motivational messages for foundational learning
 * 5. CTASection - Navigation buttons for lessons, review, and placement test
 *
 * Color Scheme:
 * -------------
 * - Indigo/Purple gradient for A1 branding
 * - Indigo-600 for icons and accents
 * - Indigo-50 for card backgrounds
 *
 * Navigation:
 * -----------
 * - "Continue Learning" → /classes/A1/lesson1
 * - "Review previous lessons" → /classes/A0
 * - "Take placement test" → /placement-test
 */

"use client"

// React Icons - Font Awesome icons for visual elements
import { FaGraduationCap, FaArrowRight, FaBookOpen, FaClipboardCheck, FaStar } from 'react-icons/fa'

// Welcome page components from shared components folder
import { LevelLandingPage } from '../welcome_components/LevelLandingPage'
import { LevelHeader } from '../welcome_components/LevelHeader'
import { LearningPointsList } from '../welcome_components/LearningPointsList'
import { EncouragementCard } from '../welcome_components/EncouragementCard'
import { CTASection } from '../welcome_components/CTASection'

/**
 * A1LandingPage Component
 *
 * The main landing page for the A1 (beginner foundation) level.
 * Composed of reusable welcome components configured for A1 branding.
 *
 * @returns {JSX.Element} The rendered A1 welcome page
 */
export default function A1LandingPage() {
  return (
    <LevelLandingPage>
      <LevelHeader
        badge="Level A1"
        title="Build Your French Foundation"
        subtitle="Learn to understand and form simple sentences in French."
        icon={FaGraduationCap}
        gradientFrom="from-indigo-500"
        gradientTo="to-purple-600"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <p className="text-slate-700 leading-relaxed mb-4">
          In this level, you will <strong>begin to communicate in French</strong>.
          You'll move beyond individual words and start forming complete thoughts.
        </p>
        <p className="text-slate-700 leading-relaxed">
          You'll learn grammar, vocabulary, and sentence structure — the building blocks
          that make French start to make sense.
        </p>
      </div>

      <LearningPointsList
        title="What you'll learn"
        points={[
          "Pronouns and articles",
          "Verbs and verb groups",
          "Sentence structure",
          "Prepositions",
          "Adjectives and adverbs",
          "Basic past tense (passé composé)",
          "Negation and simple communication"
        ]}
        iconColor="text-indigo-600"
      />

      <EncouragementCard
        title="This is where French starts to make sense"
        messages={[
          "Take your time and practice consistently.",
          "Every lesson builds on the last one."
        ]}
        icon={FaStar}
        bgColor="bg-indigo-50"
        borderColor="border-indigo-200"
        textColor="text-indigo-800"
      />

      <CTASection
        buttons={[
          {
            label: "Continue Learning",
            href: "/classes/A1/lesson1",
            primary: true,
            icon: <FaArrowRight size={18} />
          },
          {
            label: "Review previous lessons",
            href: "/classes/A0",
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
