"use client"
import { FaGraduationCap, FaArrowRight, FaBookOpen, FaClipboardCheck, FaStar } from 'react-icons/fa'
import { LevelLandingPage } from '../components/LevelLandingPage'
import { LevelHeader } from '../components/LevelHeader'
import { LearningPointsList } from '../components/LearningPointsList'
import { EncouragementCard } from '../components/EncouragementCard'
import { CTASection } from '../components/CTASection'

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

      {/* Intro Section */}
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
