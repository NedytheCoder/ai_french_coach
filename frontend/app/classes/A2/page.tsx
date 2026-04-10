"use client"
import { FaGraduationCap, FaArrowRight, FaBookOpen, FaClipboardCheck, FaRocket } from 'react-icons/fa'
import { LevelLandingPage } from '../components/LevelLandingPage'
import { LevelHeader } from '../components/LevelHeader'
import { LearningPointsList } from '../components/LearningPointsList'
import { EncouragementCard } from '../components/EncouragementCard'
import { CTASection } from '../components/CTASection'

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

      {/* Intro Section */}
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
