"use client"
import { FaGraduationCap, FaArrowRight, FaClipboardCheck, FaHeart } from 'react-icons/fa'
import { LevelLandingPage } from '../components/LevelLandingPage'
import { LevelHeader } from '../components/LevelHeader'
import { LearningPointsList } from '../components/LearningPointsList'
import { EncouragementCard } from '../components/EncouragementCard'
import { CTASection } from '../components/CTASection'

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

      {/* Intro Section */}
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
