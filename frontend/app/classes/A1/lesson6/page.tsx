'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaHome,
  FaCheck,
  FaChevronRight,
  FaArrowRight,
  FaBookOpen,
  FaGraduationCap,
  FaLightbulb,
  FaTimes,
  FaRedo,
  FaChevronDown,
  FaChevronUp,
  FaVolumeUp
} from 'react-icons/fa'
import Link from 'next/link'
import {
  firstGroupVerbs,
  secondGroupVerbs,
  thirdGroupVerbs,
  verbSummary,
  practiceQuestions,
  sectionIds,
  SectionId,
  conjugationExamples
} from './data'

interface LessonProgress {
  reviewedSections: SectionId[]
  practiceAnswers: { questionId: number; selectedOption: number; isCorrect: boolean }[]
  practiceCompleted: boolean
  lessonCompleted: boolean
}

const feedbackMessages = {
  correct: ['Nice 😏', 'Good catch', "That's right", "You're getting it", 'Well done!', 'Perfect!'],
  incorrect: ['Careful now…', 'Almost there', 'Keep trying', 'Not quite', 'Review the pattern']
}

function getRandomFeedback(isCorrect: boolean) {
  const messages = isCorrect ? feedbackMessages.correct : feedbackMessages.incorrect
  return messages[Math.floor(Math.random() * messages.length)]
}

export default function A1Lesson6Page() {
  const [reviewedSections, setReviewedSections] = useState<SectionId[]>([])
  const [practiceAnswers, setPracticeAnswers] = useState<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>([])
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a1Lesson6Progress')
    if (saved) {
      const parsed: LessonProgress = JSON.parse(saved)
      setReviewedSections(parsed.reviewedSections || [])
      setPracticeAnswers(parsed.practiceAnswers || [])
      setPracticeCompleted(parsed.practiceCompleted || false)
      setLessonCompleted(parsed.lessonCompleted || false)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('a1Lesson6Progress', JSON.stringify({
        reviewedSections,
        practiceAnswers,
        practiceCompleted,
        lessonCompleted
      }))
    }
  }, [reviewedSections, practiceAnswers, practiceCompleted, lessonCompleted, isClient])

  const markSectionReviewed = (sectionId: SectionId) => {
    if (!reviewedSections.includes(sectionId)) {
      setReviewedSections(prev => [...prev, sectionId])
    }
  }

  const allSectionsReviewed = sectionIds.every(id => reviewedSections.includes(id))
  const practiceScore = practiceAnswers.filter(a => a.isCorrect).length

  const completeLesson = () => {
    if (allSectionsReviewed && practiceCompleted) {
      setLessonCompleted(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back to home */}
        <div className="mb-6">
          <Link
            href="/classes/A1"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A1 Lessons</span>
          </Link>
        </div>

        {/* Lesson Header */}
        <LessonHeader />

        {/* Progress Bar */}
        <ProgressBar reviewedSections={reviewedSections} practiceCompleted={practiceCompleted} />

        {/* Sections */}
        <div className="space-y-6">
          <VerbGroupsIntroSection
            isReviewed={reviewedSections.includes('verb-groups-intro')}
            onMarkReviewed={() => markSectionReviewed('verb-groups-intro')}
          />

          <FirstGroupSection
            isReviewed={reviewedSections.includes('first-group')}
            onMarkReviewed={() => markSectionReviewed('first-group')}
          />

          <SecondGroupSection
            isReviewed={reviewedSections.includes('second-group')}
            onMarkReviewed={() => markSectionReviewed('second-group')}
          />

          <ThirdGroupSection
            isReviewed={reviewedSections.includes('third-group')}
            onMarkReviewed={() => markSectionReviewed('third-group')}
          />

          <RegularVsIrregularSection
            isReviewed={reviewedSections.includes('regular-vs-irregular')}
            onMarkReviewed={() => markSectionReviewed('regular-vs-irregular')}
          />

          <ConjugationExamplesSection
            isReviewed={reviewedSections.includes('conjugation-examples')}
            onMarkReviewed={() => markSectionReviewed('conjugation-examples')}
          />

          <PatternSummarySection
            isReviewed={reviewedSections.includes('pattern-summary')}
            onMarkReviewed={() => markSectionReviewed('pattern-summary')}
          />

          <PracticeSection
            isReviewed={reviewedSections.includes('practice')}
            onMarkReviewed={() => markSectionReviewed('practice')}
            practiceAnswers={practiceAnswers}
            setPracticeAnswers={setPracticeAnswers}
            onComplete={() => setPracticeCompleted(true)}
          />

          {/* Completion Section */}
          <CompletionSection
            isComplete={lessonCompleted}
            canComplete={allSectionsReviewed && practiceCompleted}
            score={practiceScore}
            total={practiceQuestions.length}
            onComplete={completeLesson}
          />
        </div>
      </div>
    </div>
  )
}

function LessonHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <FaGraduationCap size={14} />
          <span>A1 Lesson 6</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Verbs II — Verb Groups and Patterns</h1>
        <p className="text-indigo-100 text-lg">
          Learn how French verbs are grouped and how regular and irregular verbs behave.
        </p>
      </div>

      <div className="p-6 bg-indigo-50 border-t border-indigo-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-indigo-700" size={14} />
          </div>
          <p className="text-indigo-800 text-sm">
            Read the explanations, explore examples, and complete the practice to understand verb patterns.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ProgressBar({ reviewedSections, practiceCompleted }: { reviewedSections: SectionId[]; practiceCompleted: boolean }) {
  const totalSections = sectionIds.length
  const completedSections = reviewedSections.length
  const progress = Math.round((completedSections / totalSections) * 100)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 sticky top-4 z-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">Lesson Progress</span>
        <span className="text-sm font-medium text-indigo-600">{completedSections}/{totalSections} sections</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

interface SectionProps {
  isReviewed: boolean
  onMarkReviewed: () => void
}

function SectionCard({
  id,
  title,
  icon: Icon,
  isReviewed,
  onMarkReviewed,
  children,
  defaultOpen = false
}: {
  id: string
  title: string
  icon: React.ElementType
  isReviewed: boolean
  onMarkReviewed: () => void
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  useEffect(() => {
    if (isOpen) {
      onMarkReviewed()
    }
  }, [isOpen])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isReviewed ? 'bg-green-100' : 'bg-indigo-100'
          }`}>
            {isReviewed ? (
              <FaCheck className="text-green-600" size={18} />
            ) : (
              <Icon className="text-indigo-600" size={18} />
            )}
          </div>
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {isReviewed && (
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Reviewed
            </span>
          )}
          {isOpen ? <FaChevronUp className="text-slate-400" /> : <FaChevronDown className="text-slate-400" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function VerbGroupsIntroSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="verb-groups-intro"
      title="What Are Verb Groups?"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          French verbs are divided into 3 groups. These groups help us understand how verbs are conjugated:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-700 font-bold">1st</span>
            </div>
            <p className="font-medium text-slate-800">-er verbs</p>
            <p className="text-sm text-slate-500">Most common</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-700 font-bold">2nd</span>
            </div>
            <p className="font-medium text-slate-800">-ir verbs</p>
            <p className="text-sm text-slate-500">Regular pattern</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-700 font-bold">3rd</span>
            </div>
            <p className="font-medium text-slate-800">Irregular</p>
            <p className="text-sm text-slate-500">Unique forms</p>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <h3 className="font-medium text-indigo-900 mb-2">Why this matters:</h3>
          <ul className="space-y-2 text-indigo-800">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>Some verbs follow clear patterns (regular)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>Others change in unique ways (irregular)</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Remember:</span> Understanding verb groups helps you learn faster. 
            You don't need to memorize everything — just recognize patterns.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function FirstGroupSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="first-group"
      title="1st Group Verbs (-er verbs)"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          The 1st group is the most common. These verbs end in <span className="font-medium text-indigo-600">-er</span> (except <em>aller</em>) and are usually regular.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {firstGroupVerbs.map((verb, idx) => (
            <div key={idx} className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 text-lg">{verb.verb}</p>
                  <p className="text-sm text-slate-500">{verb.english}</p>
                </div>
                <button 
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                  aria-label={`Play pronunciation of ${verb.verb}`}
                >
                  <FaVolumeUp className="text-blue-600" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <p className="text-indigo-800 text-sm">
            <span className="font-medium">Note:</span> These verbs follow predictable patterns in the present tense. 
            Once you know the pattern, you can conjugate many verbs easily.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function SecondGroupSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="second-group"
      title="2nd Group Verbs (-ir regular)"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          The 2nd group verbs end in <span className="font-medium text-indigo-600">-ir</span> and follow a regular pattern — though different from -er verbs. They are less common than 1st group verbs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {secondGroupVerbs.map((verb, idx) => (
            <div key={idx} className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 text-lg">{verb.verb}</p>
                  <p className="text-sm text-slate-500">{verb.english}</p>
                </div>
                <button 
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                  aria-label={`Play pronunciation of ${verb.verb}`}
                >
                  <FaVolumeUp className="text-green-600" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-800 text-sm">
            <span className="font-medium">Pattern note:</span> These verbs often have <span className="font-medium">-issons</span> in the <em>nous</em> form. 
            For example: "nous finissons" (we finish).
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function ThirdGroupSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="third-group"
      title="3rd Group Verbs (Irregular Group)"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          The 3rd group is the "irregular" group. These verbs do not follow a single pattern and must often be learned individually.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {thirdGroupVerbs.map((verb, idx) => (
            <div key={idx} className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 text-lg">{verb.verb}</p>
                  <p className="text-sm text-slate-500">{verb.english}</p>
                </div>
                <button 
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                  aria-label={`Play pronunciation of ${verb.verb}`}
                >
                  <FaVolumeUp className="text-purple-600" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <p className="text-purple-800 text-sm">
            <span className="font-medium">Important:</span> Many of the most important verbs are in this group — 
            <em>être</em> (to be), <em>avoir</em> (to have), <em>aller</em> (to go). These are used constantly in everyday French.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function RegularVsIrregularSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="regular-vs-irregular"
      title="Regular vs Irregular Verbs"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-5 border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3">Regular Verbs</h3>
            <ul className="space-y-2 text-green-700 text-sm">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Follow predictable patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Easier to learn once pattern is known</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-green-200">
              <p className="text-sm text-slate-600">Examples:</p>
              <p className="font-medium text-slate-800">parler (1st), finir (2nd)</p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-3">Irregular Verbs</h3>
            <ul className="space-y-2 text-amber-700 text-sm">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Do not follow standard patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Must be memorized individually</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-amber-200">
              <p className="text-sm text-slate-600">Examples:</p>
              <p className="font-medium text-slate-800">être, avoir, aller</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <p className="text-indigo-800 text-sm">
            <span className="font-medium">Remember:</span> Even advanced learners continue to use irregular verbs every day. 
            Don't worry about perfect mastery — focus on recognizing the patterns first.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function ConjugationExamplesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="conjugation-examples"
      title="Conjugation Examples"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          Here's how one verb from each group is conjugated in the present tense. Notice the patterns (or lack thereof):
        </p>

        {conjugationExamples.map((example, idx) => (
          <div key={idx} className={`rounded-xl border-2 overflow-hidden ${
            idx === 0 ? 'border-blue-200' :
            idx === 1 ? 'border-green-200' :
            'border-purple-200'
          }`}>
            {/* Header */}
            <div className={`px-5 py-3 ${
              idx === 0 ? 'bg-blue-50' :
              idx === 1 ? 'bg-green-50' :
              'bg-purple-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                    idx === 0 ? 'bg-blue-200 text-blue-800' :
                    idx === 1 ? 'bg-green-200 text-green-800' :
                    'bg-purple-200 text-purple-800'
                  }`}>
                    {example.group}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800">
                    {example.verb} <span className="text-slate-500 font-normal">({example.english})</span>
                  </h3>
                </div>
                <button 
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                  aria-label={`Play pronunciation of ${example.verb}`}
                >
                  <FaVolumeUp className={`${
                    idx === 0 ? 'text-blue-600' :
                    idx === 1 ? 'text-green-600' :
                    'text-purple-600'
                  }`} size={14} />
                </button>
              </div>
            </div>

            {/* Conjugation Table */}
            <div className="bg-white p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {example.forms.map((form, formIdx) => (
                  <div key={formIdx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <span className="text-slate-500 text-sm">{form.pronoun}</span>
                    <span className="font-semibold text-slate-800">{form.form}</span>
                  </div>
                ))}
              </div>

              {/* Pattern Note */}
              <div className={`mt-4 pt-3 border-t ${
                idx === 0 ? 'border-blue-100' :
                idx === 1 ? 'border-green-100' :
                'border-purple-100'
              }`}>
                <p className={`text-sm ${
                  idx === 0 ? 'text-blue-700' :
                  idx === 1 ? 'text-green-700' :
                  'text-purple-700'
                }`}>
                  <span className="font-medium">Pattern:</span> {example.note}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Compare and Notice */}
        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <h3 className="font-semibold text-indigo-900 mb-3">What to notice:</h3>
          <ul className="space-y-2 text-indigo-800 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5">→</span>
              <span><strong>1st & 2nd groups:</strong> You can see the pattern — the verb stem stays consistent, and only the endings change.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5">→</span>
              <span><strong>3rd group:</strong> The stem changes completely (suis, es, est, sommes...). This is why irregular verbs need more attention.</span>
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

function PatternSummarySection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="pattern-summary"
      title="Pattern Summary"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Here's a quick-reference guide to the three verb groups:
        </p>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Group</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Pattern</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {verbSummary.map((item, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      idx === 0 ? 'bg-blue-100 text-blue-700' :
                      idx === 1 ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {item.group}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-800 font-medium">{item.pattern}</td>
                  <td className="px-4 py-3 text-slate-600">{item.type}</td>
                  <td className="px-4 py-3 text-slate-800 font-medium">{item.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
            <p className="text-2xl font-bold text-blue-700">-er</p>
            <p className="text-xs text-blue-600">1st group</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
            <p className="text-2xl font-bold text-green-700">-ir</p>
            <p className="text-xs text-green-600">2nd group</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
            <p className="text-2xl font-bold text-purple-700">...</p>
            <p className="text-xs text-purple-600">3rd group</p>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

function PracticeSection({
  isReviewed,
  onMarkReviewed,
  practiceAnswers,
  setPracticeAnswers,
  onComplete
}: SectionProps & {
  practiceAnswers: { questionId: number; selectedOption: number; isCorrect: boolean }[]
  setPracticeAnswers: React.Dispatch<React.SetStateAction<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>>
  onComplete: () => void
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = practiceQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === practiceQuestions.length - 1
  const score = practiceAnswers.filter(a => a.isCorrect).length
  const total = practiceQuestions.length
  const percentage = Math.round((score / total) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 80) {
      return {
        title: "Great job! 🎉",
        message: "You understand verb groups and patterns well. You're ready to move forward!",
        tone: "high" as const,
        color: "green" as const
      }
    } else if (percentage >= 50) {
      return {
        title: "Nice progress! 👍",
        message: "You're getting the hang of verb groups. A bit more practice will help solidify these patterns.",
        tone: "medium" as const,
        color: "blue" as const
      }
    } else {
      return {
        title: "Good effort! 💪",
        message: "Verb groups take time to learn. You can retake this practice or review the lesson sections again.",
        tone: "low" as const,
        color: "amber" as const
      }
    }
  }

  const handleSelectOption = (index: number) => {
    if (hasSubmitted) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null || hasSubmitted) return

    const isCorrect = selectedOption === currentQuestion.correct
    setFeedback(getRandomFeedback(isCorrect))
    setHasSubmitted(true)

    const newAnswers = [...practiceAnswers, {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect
    }]
    setPracticeAnswers(newAnswers)

    if (isLastQuestion) {
      onMarkReviewed()
    }
  }

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOption(null)
      setHasSubmitted(false)
      setFeedback('')
    } else {
      setShowResults(true)
    }
  }

  const handleRetake = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setHasSubmitted(false)
    setFeedback('')
    setShowResults(false)
    setPracticeAnswers([])
  }

  const handleContinueAnyway = () => {
    onComplete()
  }

  const progress = ((currentQuestionIndex + (hasSubmitted ? 1 : 0)) / practiceQuestions.length) * 100
  const performance = getPerformanceMessage()

  if (showResults) {
    return (
      <SectionCard
        id="practice"
        title="Guided Interactive Practice"
        icon={FaCheck}
        isReviewed={isReviewed}
        onMarkReviewed={onMarkReviewed}
        defaultOpen={true}
      >
        <div className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-3xl font-bold mb-4">
              {percentage}%
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">
              {score}<span className="text-slate-400">/{total}</span>
            </div>
            <p className="text-slate-600">questions correct</p>
          </div>

          {/* Performance Message */}
          <div className={`rounded-xl p-6 border-2 ${
            performance.color === 'green' ? 'bg-green-50 border-green-200' :
            performance.color === 'blue' ? 'bg-blue-50 border-blue-200' :
            'bg-amber-50 border-amber-200'
          }`}>
            <h3 className={`text-xl font-bold mb-3 ${
              performance.color === 'green' ? 'text-green-700' :
              performance.color === 'blue' ? 'text-blue-700' :
              'text-amber-700'
            }`}>
              {performance.title}
            </h3>
            <p className="text-slate-700 leading-relaxed">{performance.message}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {performance.tone === 'high' ? (
              <button
                onClick={handleContinueAnyway}
                className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Lesson Summary</span>
                <FaArrowRight size={18} />
              </button>
            ) : (
              <>
                <button
                  onClick={handleRetake}
                  className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaRedo size={18} />
                  <span>Retake Practice</span>
                </button>
                <button
                  onClick={handleContinueAnyway}
                  className="w-full py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                >
                  Continue Anyway — I'll Review More Later
                </button>
              </>
            )}
          </div>

          {/* Review Answers Option */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              Want to see what you got wrong? Review the lesson sections above for detailed explanations.
            </p>
          </div>
        </div>
      </SectionCard>
    )
  }

  return (
    <SectionCard
      id="practice"
      title="Guided Interactive Practice"
      icon={FaCheck}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
      defaultOpen={true}
    >
      <div className="space-y-4">
        {/* Progress */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Practice {currentQuestionIndex + 1} of {practiceQuestions.length}
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-medium text-slate-800 mb-6">{currentQuestion.prompt}</h3>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                  hasSubmitted
                    ? idx === currentQuestion.correct
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : selectedOption === idx
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-slate-200 text-slate-400'
                    : selectedOption === idx
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                      : 'border-slate-200 hover:border-indigo-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    hasSubmitted
                      ? idx === currentQuestion.correct
                        ? 'border-green-500 bg-green-500'
                        : selectedOption === idx
                          ? 'border-red-500 bg-red-500'
                          : 'border-slate-300'
                      : selectedOption === idx
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-slate-300'
                  }`}>
                    {hasSubmitted ? (
                      idx === currentQuestion.correct ? (
                        <FaCheck size={12} className="text-white" />
                      ) : selectedOption === idx ? (
                        <FaTimes size={12} className="text-white" />
                      ) : null
                    ) : selectedOption === idx ? (
                      <FaCheck size={12} className="text-white" />
                    ) : null}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {hasSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 mb-4 ${
                selectedOption === currentQuestion.correct
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-amber-50 border border-amber-200'
              }`}
            >
              <p className={`font-medium mb-1 ${
                selectedOption === currentQuestion.correct ? 'text-green-700' : 'text-amber-700'
              }`}>
                {feedback}
              </p>
              <p className="text-sm text-slate-600">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          {/* Submit/Next Button */}
          <button
            onClick={hasSubmitted ? handleNext : handleSubmit}
            disabled={selectedOption === null}
            className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>
              {hasSubmitted
                ? isLastQuestion
                  ? 'See My Results'
                  : 'Next Question'
                : 'Check Answer'}
            </span>
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    </SectionCard>
  )
}

function CompletionSection({
  isComplete,
  canComplete,
  score,
  total,
  onComplete
}: {
  isComplete: boolean
  canComplete: boolean
  score: number
  total: number
  onComplete: () => void
}) {
  const percentage = Math.round((score / total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-1">
          {isComplete ? 'Lesson Complete!' : 'Complete the Lesson'}
        </h2>
        <p className="text-indigo-100">
          {isComplete
            ? "Nice work — you've completed A1 Lesson 6."
            : "Review all sections and complete the practice to finish."}
        </p>
      </div>

      <div className="p-6">
        {isComplete ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">
                {score}<span className="text-slate-400">/{total}</span>
              </div>
              <div className="text-lg text-slate-600">Practice Score: {percentage}%</div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <p className="text-green-800 font-medium mb-2">You now understand how French verbs are grouped!</p>
              <p className="text-green-700 text-sm">This foundation will help you learn new verbs faster.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/classes/A1"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <FaBookOpen size={16} />
                <span>Review Lessons</span>
              </Link>
              <Link
                href="/classes/A1/lesson7"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all"
              >
                <span>Continue to Lesson 7</span>
                <FaArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-amber-800 text-sm">
                Complete all sections and the practice quiz to unlock the next lesson.
              </p>
            </div>

            <button
              onClick={onComplete}
              disabled={!canComplete}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                canComplete
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {canComplete ? 'Mark Lesson Complete' : 'Complete All Sections First'}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

