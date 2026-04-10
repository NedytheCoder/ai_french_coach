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
  FaVolumeUp,
  FaExclamationTriangle,
  FaBalanceScale,
  FaArrowUp,
  FaCrown,
  FaStar
} from 'react-icons/fa'
import Link from 'next/link'
import {
  adjectiveComparisons,
  adverbComparisons,
  nounComparisons,
  verbComparisons,
  superlativeExamples,
  irregularComparisons,
  guidedExamples,
  commonMistakes,
  practiceQuestions,
  sectionIds,
  SectionId,
  getPerformanceMessage
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

export default function A2Lesson5Page() {
  const [reviewedSections, setReviewedSections] = useState<SectionId[]>([])
  const [practiceAnswers, setPracticeAnswers] = useState<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>([])
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a2Lesson5Progress')
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
      localStorage.setItem('a2Lesson5Progress', JSON.stringify({
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/classes/A2" className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors">
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A2</span>
          </Link>
        </div>

        <LessonHeader />
        <ProgressBar reviewedSections={reviewedSections} />

        <div className="space-y-6">
          <IntroSection isReviewed={reviewedSections.includes('intro')} onMarkReviewed={() => markSectionReviewed('intro')} />
          <AdjectivesSection isReviewed={reviewedSections.includes('adjectives')} onMarkReviewed={() => markSectionReviewed('adjectives')} />
          <AdverbsSection isReviewed={reviewedSections.includes('adverbs')} onMarkReviewed={() => markSectionReviewed('adverbs')} />
          <NounsSection isReviewed={reviewedSections.includes('nouns')} onMarkReviewed={() => markSectionReviewed('nouns')} />
          <VerbsSection isReviewed={reviewedSections.includes('verbs')} onMarkReviewed={() => markSectionReviewed('verbs')} />
          <SuperlativesIntroSection isReviewed={reviewedSections.includes('superlatives-intro')} onMarkReviewed={() => markSectionReviewed('superlatives-intro')} />
          <SuperlativesSection isReviewed={reviewedSections.includes('superlatives')} onMarkReviewed={() => markSectionReviewed('superlatives')} />
          <IrregularSection isReviewed={reviewedSections.includes('irregular')} onMarkReviewed={() => markSectionReviewed('irregular')} />
          <ExamplesSection isReviewed={reviewedSections.includes('examples')} onMarkReviewed={() => markSectionReviewed('examples')} />
          <MistakesSection isReviewed={reviewedSections.includes('mistakes')} onMarkReviewed={() => markSectionReviewed('mistakes')} />
          <PracticeSection
            isReviewed={reviewedSections.includes('practice')}
            onMarkReviewed={() => markSectionReviewed('practice')}
            practiceAnswers={practiceAnswers}
            setPracticeAnswers={setPracticeAnswers}
            onComplete={() => setPracticeCompleted(true)}
          />
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <FaGraduationCap size={14} />
          <span>A2 Lesson 5</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Comparatives and Superlatives</h1>
        <p className="text-amber-100 text-lg">Learn how to compare people, things, actions, and qualities in French.</p>
      </div>
      <div className="p-6 bg-amber-50 border-t border-amber-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-amber-700" size={14} />
          </div>
          <p className="text-amber-800 text-sm">Read the explanations, notice the patterns, and complete the practice to build confidence.</p>
        </div>
      </div>
    </motion.div>
  )
}

function ProgressBar({ reviewedSections }: { reviewedSections: SectionId[] }) {
  const totalSections = sectionIds.length
  const completedSections = reviewedSections.length
  const progress = Math.round((completedSections / totalSections) * 100)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 sticky top-4 z-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">Lesson Progress</span>
        <span className="text-sm font-medium text-amber-600">{completedSections}/{totalSections} sections</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-amber-600 to-orange-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
      </div>
    </div>
  )
}

interface SectionProps {
  isReviewed: boolean
  onMarkReviewed: () => void
}

function SectionCard({ id, title, icon: Icon, isReviewed, onMarkReviewed, children, defaultOpen = false }: {
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
    if (isOpen) onMarkReviewed()
  }, [isOpen])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isReviewed ? 'bg-green-100' : 'bg-amber-100'}`}>
            {isReviewed ? <FaCheck className="text-green-600" size={18} /> : <Icon className="text-amber-600" size={18} />}
          </div>
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {isReviewed && <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Reviewed</span>}
          {isOpen ? <FaChevronUp className="text-slate-400" /> : <FaChevronDown className="text-slate-400" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
            <div className="p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function IntroSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="intro" title="What Are Comparatives?" icon={FaBalanceScale} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>Comparatives</strong> help us compare two things, people, or actions. In French, the main words are:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
            <p className="text-2xl font-bold text-blue-600 mb-1">plus</p>
            <p className="text-blue-800 font-medium">more</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-200 text-center">
            <p className="text-2xl font-bold text-red-600 mb-1">moins</p>
            <p className="text-red-800 font-medium">less</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
            <p className="text-2xl font-bold text-green-600 mb-1">aussi</p>
            <p className="text-green-800 font-medium">as / equally</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-white">
          <p className="text-lg font-medium mb-3">Simple examples:</p>
          <div className="space-y-2">
            <p><span className="text-blue-400">Marie est plus grande que Paul.</span></p>
            <p className="text-slate-300">Marie is taller than Paul.</p>
            <p className="mt-3"><span className="text-red-400">Ce livre est moins intéressant que l'autre.</span></p>
            <p className="text-slate-300">This book is less interesting than the other one.</p>
            <p className="mt-3"><span className="text-green-400">Il est aussi rapide que son frère.</span></p>
            <p className="text-slate-300">He is as fast as his brother.</p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Key insight:</span> Comparatives are <strong>very common</strong> in everyday French. You can compare qualities, actions, quantities, and performance.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function AdjectivesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="adjectives" title="Comparatives with Adjectives" icon={FaArrowUp} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">The structure for comparing adjectives is usually:</p>

        <div className="bg-slate-800 rounded-xl p-5 text-white text-center">
          <p className="text-lg font-medium">subject + verb + <span className="text-blue-400">plus</span> / <span className="text-red-400">moins</span> / <span className="text-green-400">aussi</span> + adjective + <span className="text-yellow-400">que</span> + comparison</p>
        </div>

        <div className="space-y-3">
          {adjectiveComparisons.map((comp, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">{comp.pattern}</p>
              <p className="font-medium text-slate-800 text-lg mb-1">{comp.french}</p>
              <p className="text-slate-500">{comp.english}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-800 text-sm">
            <span className="font-medium">Note:</span> Adjectives still agree normally where needed. The comparative word comes <strong>before</strong> the adjective.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function AdverbsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="adverbs" title="Comparatives with Adverbs" icon={FaArrowUp} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">Adverbs are also compared with <strong>plus</strong>, <strong>moins</strong>, and <strong>aussi</strong>:</p>

        <div className="bg-slate-800 rounded-xl p-5 text-white text-center">
          <p className="text-lg font-medium">subject + verb + <span className="text-blue-400">plus</span> / <span className="text-red-400">moins</span> / <span className="text-green-400">aussi</span> + adverb + <span className="text-yellow-400">que</span></p>
        </div>

        <div className="space-y-3">
          {adverbComparisons.map((comp, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 text-lg">{comp.french}</p>
                <p className="text-slate-500">{comp.english}</p>
              </div>
              <button className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-colors">
                <FaVolumeUp size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-800 text-sm">
            <span className="font-medium">Tip:</span> Adverbs describe how an action is done. You can compare actions just like qualities.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function NounsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="nouns" title="Comparatives with Nouns" icon={FaArrowUp} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">When comparing quantities of nouns, French uses:</p>

        <div className="bg-slate-800 rounded-xl p-5 text-white text-center">
          <p className="text-lg font-medium"><span className="text-blue-400">plus de</span> / <span className="text-red-400">moins de</span> / <span className="text-green-400">autant de</span> + noun + <span className="text-yellow-400">que</span></p>
        </div>

        <div className="space-y-3">
          {nounComparisons.map((comp, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 text-lg">{comp.french}</p>
                <p className="text-slate-500">{comp.english}</p>
              </div>
              <button className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-colors">
                <FaVolumeUp size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Important:</span> Use <strong>de / d'</strong> after plus, moins, and autant when comparing nouns. This is different from adjective comparison.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function VerbsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="verbs" title="Comparatives with Verbs" icon={FaArrowUp} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">When comparing actions, French often uses:</p>

        <div className="bg-slate-800 rounded-xl p-5 text-white text-center">
          <p className="text-lg font-medium">verb + <span className="text-blue-400">plus</span> / <span className="text-red-400">moins</span> / <span className="text-green-400">autant</span> + <span className="text-yellow-400">que</span></p>
        </div>

        <div className="space-y-3">
          {verbComparisons.map((comp, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 text-lg">{comp.french}</p>
                <p className="text-slate-500">{comp.english}</p>
              </div>
              <button className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-colors">
                <FaVolumeUp size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <p className="text-purple-800 text-sm">
            <span className="font-medium">Note:</span> In this pattern, the comparison is about the <strong>action itself</strong>, not a noun or adjective.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function SuperlativesIntroSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="superlatives-intro" title="What Are Superlatives?" icon={FaCrown} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>Superlatives</strong> show the highest or lowest degree in a group. In English, this is like:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 text-center">
            <p className="font-bold text-yellow-700">the biggest</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 text-center">
            <p className="font-bold text-yellow-700">the most interesting</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 text-center">
            <p className="font-bold text-yellow-700">the least expensive</p>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed">In French, common forms are:</p>

        <div className="bg-slate-800 rounded-xl p-5 text-white text-center">
          <p className="text-lg font-medium"><span className="text-yellow-400">le / la / les plus</span></p>
          <p className="text-lg font-medium mt-2"><span className="text-red-400">le / la / les moins</span></p>
        </div>

        <div className="bg-slate-100 rounded-xl p-4">
          <p className="text-slate-700 text-sm mb-2">Examples:</p>
          <ul className="text-slate-600 text-sm space-y-1">
            <li><strong>C'est le plus grand bâtiment.</strong> = It is the tallest building.</li>
            <li><strong>Elle est la moins fatiguée.</strong> = She is the least tired.</li>
            <li><strong>Ce sont les plus rapides.</strong> = They are the fastest.</li>
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

function SuperlativesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="superlatives" title="Superlative Structures" icon={FaStar} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">For adjectives, the structure is:</p>

        <div className="bg-slate-800 rounded-xl p-5 text-white text-center">
          <p className="text-lg font-medium"><span className="text-yellow-400">definite article</span> + <span className="text-blue-400">plus</span> / <span className="text-red-400">moins</span> + adjective</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="font-bold text-blue-600">le</p>
            <p className="text-xs text-blue-700">masculine</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-3 border border-pink-200">
            <p className="font-bold text-pink-600">la</p>
            <p className="text-xs text-pink-700">feminine</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <p className="font-bold text-purple-600">les</p>
            <p className="text-xs text-purple-700">plural</p>
          </div>
        </div>

        <div className="space-y-3">
          {superlativeExamples.map((ex, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="font-medium text-slate-800 text-lg">{ex.french}</p>
              <p className="text-slate-500">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Important:</span> The definite article must agree: <strong>le, la, les</strong>. The adjective may also agree in gender and number.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function IrregularSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="irregular" title="Irregular Forms" icon={FaStar} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">Some important comparative forms are <strong>irregular</strong>:</p>

        <div className="space-y-3">
          {irregularComparisons.map((irreg, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-amber-50 px-4 py-3 border-b border-amber-200">
                <p className="font-bold text-amber-800">{irreg.form}</p>
                <p className="text-amber-600 text-sm">{irreg.use}</p>
              </div>
              <div className="p-4">
                <p className="font-medium text-slate-800">{irreg.example}</p>
                <p className="text-slate-500 text-sm">{irreg.english}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-800 text-sm">
            <span className="font-medium">Memory tip:</span> Use <strong>meilleur</strong> mostly when comparing things with the idea of 'better' as an adjective. Use <strong>mieux</strong> when comparing how an action is done.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function ExamplesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="examples" title="Guided Examples" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">Study these examples. Notice the different patterns:</p>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
          <div className="space-y-4">
            {guidedExamples.map((ex, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 text-amber-700 font-bold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{ex.french}</p>
                  <p className="text-slate-500">{ex.english}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-100 rounded-xl p-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-green-600" size={18} />
          </div>
          <p className="text-slate-700 text-sm">Look for <strong>plus / moins / aussi</strong> for comparatives and <strong>le / la / les plus</strong> for superlatives.</p>
        </div>
      </div>
    </SectionCard>
  )
}

function MistakesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="mistakes" title="Common Beginner Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">These mistakes are very common. They often happen when learners mix adjective, noun, and verb comparison patterns.</p>
        </div>

        <div className="space-y-3">
          {commonMistakes.map((mistake, idx) => (
            <div key={idx} className="bg-white rounded-xl border-2 border-red-200 overflow-hidden">
              <div className="bg-red-50 px-4 py-2 border-b border-red-200">
                <span className="text-xs font-medium text-red-600 uppercase tracking-wide">Incorrect</span>
              </div>
              <div className="p-4 border-b border-slate-100">
                <p className="text-red-700 font-medium line-through">{mistake.wrong}</p>
              </div>
              <div className="bg-green-50 px-4 py-2 border-b border-green-200">
                <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Correct</span>
              </div>
              <div className="p-4">
                <p className="text-green-700 font-medium">{mistake.correct}</p>
                <p className="text-slate-600 text-sm mt-2">{mistake.explanation}</p>
              </div>
            </div>
          ))}
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
  const performance = getPerformanceMessage(score, total)

  const handleSelectOption = (index: number) => {
    if (hasSubmitted) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null || hasSubmitted) return
    const isCorrect = selectedOption === currentQuestion.correct
    setFeedback(getRandomFeedback(isCorrect))
    setHasSubmitted(true)
    setPracticeAnswers(prev => [...prev, { questionId: currentQuestion.id, selectedOption, isCorrect }])
    if (isLastQuestion) onMarkReviewed()
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

  if (showResults) {
    return (
      <SectionCard id="practice" title="Guided Interactive Practice" icon={FaCheck} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} defaultOpen={true}>
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-3xl font-bold mb-4">
              {percentage}%
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">{score}<span className="text-slate-400">/{total}</span></div>
            <p className="text-slate-600">questions correct</p>
          </div>

          <div className={`rounded-xl p-6 border-2 ${performance.color === 'green' ? 'bg-green-50 border-green-200' : performance.color === 'blue' ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
            <h3 className={`text-xl font-bold mb-3 ${performance.color === 'green' ? 'text-green-700' : performance.color === 'blue' ? 'text-blue-700' : 'text-amber-700'}`}>{performance.title}</h3>
            <p className="text-slate-700 leading-relaxed">{performance.message}</p>
          </div>

          <div className="space-y-3">
            {performance.tone === 'high' ? (
              <button onClick={handleContinueAnyway} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <span>Continue to Lesson Summary</span>
                <FaArrowRight size={18} />
              </button>
            ) : (
              <>
                <button onClick={handleRetake} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <FaRedo size={18} />
                  <span>Retake Practice</span>
                </button>
                <button onClick={handleContinueAnyway} className="w-full py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-600 transition-all">
                  Continue Anyway — I'll Review More Later
                </button>
              </>
            )}
          </div>
        </div>
      </SectionCard>
    )
  }

  return (
    <SectionCard id="practice" title="Guided Interactive Practice" icon={FaCheck} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} defaultOpen={true}>
      <div className="space-y-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Practice {currentQuestionIndex + 1} of {practiceQuestions.length}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-amber-600 to-orange-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>

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
                      ? 'border-amber-500 bg-amber-50 text-amber-800'
                      : 'border-slate-200 hover:border-amber-300 text-slate-700'
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
                        ? 'border-amber-500 bg-amber-500'
                        : 'border-slate-300'
                  }`}>
                    {hasSubmitted ? (idx === currentQuestion.correct ? <FaCheck size={12} className="text-white" /> : selectedOption === idx ? <FaTimes size={12} className="text-white" /> : null) : selectedOption === idx ? <FaCheck size={12} className="text-white" /> : null}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {hasSubmitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-xl p-4 mb-4 ${selectedOption === currentQuestion.correct ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              <p className={`font-medium mb-1 ${selectedOption === currentQuestion.correct ? 'text-green-700' : 'text-amber-700'}`}>{feedback}</p>
              <p className="text-sm text-slate-600">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          <button
            onClick={hasSubmitted ? handleNext : handleSubmit}
            disabled={selectedOption === null}
            className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{hasSubmitted ? (isLastQuestion ? 'See My Results' : 'Next Question') : 'Check Answer'}</span>
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-1">{isComplete ? 'Lesson Complete!' : 'Complete the Lesson'}</h2>
        <p className="text-amber-100">{isComplete ? "You've completed A2 Lesson 5." : 'Review all sections and complete the practice to finish.'}</p>
      </div>

      <div className="p-6">
        {isComplete ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">{score}<span className="text-slate-400">/{total}</span></div>
              <div className="text-lg text-slate-600">Practice Score: {percentage}%</div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <p className="text-green-800 font-medium mb-2">You now know how to compare people, things, quantities, and actions in French.</p>
              <p className="text-green-700 text-sm">You can also form basic superlatives and recognize important irregular forms like mieux and meilleur.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/classes/A2" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <FaBookOpen size={16} />
                <span>Review Lessons</span>
              </Link>
              <Link href="/classes/A2/lesson6" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg transition-all">
                <span>Continue to Lesson 6</span>
                <FaArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-amber-800 text-sm">Complete all sections and the practice quiz to mark this lesson complete.</p>
            </div>

            <button
              onClick={onComplete}
              disabled={!canComplete}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                canComplete
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-lg'
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
