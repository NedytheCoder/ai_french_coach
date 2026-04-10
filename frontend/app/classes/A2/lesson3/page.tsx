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
  FaClock,
  FaHistory,
  FaList
} from 'react-icons/fa'
import Link from 'next/link'
import {
  imparfaitUses,
  imparfaitEndings,
  formationExamples,
  etreImparfait,
  commonImparfaitVerbs,
  tenseComparisons,
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

export default function A2Lesson3Page() {
  const [reviewedSections, setReviewedSections] = useState<SectionId[]>([])
  const [practiceAnswers, setPracticeAnswers] = useState<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>([])
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a2Lesson3Progress')
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
      localStorage.setItem('a2Lesson3Progress', JSON.stringify({
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
        <div className="mb-6">
          <Link href="/classes/A2" className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A2</span>
          </Link>
        </div>

        <LessonHeader />
        <ProgressBar reviewedSections={reviewedSections} />

        <div className="space-y-6">
          <IntroSection isReviewed={reviewedSections.includes('intro')} onMarkReviewed={() => markSectionReviewed('intro')} />
          <UsesSection isReviewed={reviewedSections.includes('uses')} onMarkReviewed={() => markSectionReviewed('uses')} />
          <FormationSection isReviewed={reviewedSections.includes('formation')} onMarkReviewed={() => markSectionReviewed('formation')} />
          <VerbsSection isReviewed={reviewedSections.includes('verbs')} onMarkReviewed={() => markSectionReviewed('verbs')} />
          <ComparisonSection isReviewed={reviewedSections.includes('comparison')} onMarkReviewed={() => markSectionReviewed('comparison')} />
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <FaGraduationCap size={14} />
          <span>A2 Lesson 3</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">The Imperfect Past (Imparfait)</h1>
        <p className="text-indigo-100 text-lg">Learn how to talk about past habits, descriptions, and background actions in French.</p>
      </div>
      <div className="p-6 bg-indigo-50 border-t border-indigo-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-indigo-700" size={14} />
          </div>
          <p className="text-indigo-800 text-sm">Read the explanations, notice the patterns, and complete the practice to build confidence.</p>
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
        <span className="text-sm font-medium text-indigo-600">{completedSections}/{totalSections} sections</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
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
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isReviewed ? 'bg-green-100' : 'bg-indigo-100'}`}>
            {isReviewed ? <FaCheck className="text-green-600" size={18} /> : <Icon className="text-indigo-600" size={18} />}
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
    <SectionCard id="intro" title="What is the Imparfait?" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          The <strong>imparfait</strong> is a past tense in French. It is used to talk about ongoing situations, repeated actions, habits, descriptions, and background information in the past.
        </p>

        <p className="text-slate-700 leading-relaxed">It often corresponds to English ideas like:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <p className="font-medium text-indigo-800">“I was doing”</p>
            <p className="text-indigo-600 text-sm">ongoing action</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <p className="font-medium text-indigo-800">“I used to do”</p>
            <p className="text-indigo-600 text-sm">repeated habit</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <p className="font-medium text-indigo-800">“it was”</p>
            <p className="text-indigo-600 text-sm">description</p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <p className="font-medium text-indigo-800">“they were”</p>
            <p className="text-indigo-600 text-sm">background state</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-white">
          <p className="text-lg font-medium mb-3">Simple examples:</p>
          <div className="space-y-2">
            <p><span className="text-green-400">Quand j'étais petit, je jouais au football.</span></p>
            <p className="text-slate-300">When I was little, I used to play football.</p>
            <p className="mt-3"><span className="text-blue-400">Il faisait froid.</span></p>
            <p className="text-slate-300">It was cold. (description)</p>
            <p className="mt-3"><span className="text-purple-400">Nous regardions souvent la télévision.</span></p>
            <p className="text-slate-300">We used to watch TV often.</p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Key insight:</span> The imparfait often paints the <strong>background</strong> of a past situation. It is different from the passé composé, which often shows a <strong>completed action</strong>.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function UsesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="uses" title="When Do We Use the Imparfait?" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">The imparfait is used for several common situations in the past:</p>

        <div className="grid grid-cols-1 gap-4">
          {imparfaitUses.map((use, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">{idx + 1}</span>
                </div>
                <h3 className="font-semibold text-slate-800">{use.title}</h3>
              </div>
              <p className="text-slate-600 text-sm mb-3">{use.explanation}</p>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="font-medium text-slate-800">{use.example}</p>
                <p className="text-slate-500 text-sm">{use.english}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-800 text-sm">
            <span className="font-medium">Remember:</span> If you're describing what was happening, how things were, or talking about regular past habits, the imparfait is usually your best choice.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function FormationSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="formation" title="How to Form the Imparfait" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-5">
        <p className="text-slate-700 leading-relaxed">To form the imparfait, follow these steps:</p>

        <div className="bg-slate-800 rounded-xl p-6">
          <div className="space-y-3">
            <p className="text-white"><span className="bg-indigo-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">1</span>Take the <strong>nous</strong> form of the verb in the present tense</p>
            <p className="text-white"><span className="bg-indigo-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">2</span>Remove <strong>-ons</strong></p>
            <p className="text-white"><span className="bg-indigo-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">3</span>Add the imparfait endings</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-2 bg-slate-50 p-3 border-b border-slate-200 font-medium text-slate-600 text-sm">
            <span>Subject</span>
            <span>Ending</span>
          </div>
          {imparfaitEndings.map((item, idx) => (
            <div key={idx} className="grid grid-cols-2 p-3 border-b border-slate-100 last:border-0 items-center">
              <span className="text-slate-600">{item.pronoun}</span>
              <span className="font-semibold text-indigo-600">{item.ending}</span>
            </div>
          ))}
        </div>

        <p className="text-slate-700 font-medium">Formation examples:</p>
        {formationExamples.map((ex, idx) => (
          <div key={idx} className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-xs text-slate-500">Infinitive</p>
                <p className="font-semibold text-slate-800">{ex.infinitive}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Nous form</p>
                <p className="font-semibold text-indigo-700">{ex.nousForm}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Stem</p>
                <p className="font-semibold text-green-600">{ex.stem}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Sample</p>
                <p className="font-semibold text-slate-800">{ex.sample}</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm text-center mt-3">{ex.english}</p>
          </div>
        ))}

        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
          <h4 className="font-semibold text-amber-900 mb-3">Important: être is irregular!</h4>
          <p className="text-amber-800 text-sm mb-3">Être has a special stem in the imparfait: <strong>ét-</strong></p>
          <div className="bg-white rounded-lg p-3 space-y-1">
            {etreImparfait.forms.map((form, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-slate-600 w-24">{form.pronoun}</span>
                <span className="font-semibold text-amber-700">{form.form}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

function VerbsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="verbs" title="Common Verbs in the Imparfait" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">These are commonly used verbs in the imparfait. Practice the je form to build confidence:</p>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-50 p-3 border-b border-slate-200 font-medium text-slate-600 text-sm">
            <span>Infinitive</span>
            <span>je form</span>
            <span>English</span>
          </div>
          {commonImparfaitVerbs.map((verb, idx) => (
            <div key={idx} className="grid grid-cols-3 p-3 border-b border-slate-100 last:border-0 items-center">
              <span className="text-slate-600">{verb.infinitive}</span>
              <span className="font-semibold text-indigo-600">{verb.je}</span>
              <span className="text-slate-500 text-sm">{verb.english}</span>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-800 text-sm">
            <span className="font-medium">Tip:</span> Notice that avoir → j'avais and aller → j'allais. These common verbs don't follow the nous stem rule, so they need to be memorized separately.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function ComparisonSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="comparison" title="Imparfait vs Passé Composé" icon={FaHistory} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-xl p-5 text-white">
          <p className="text-center text-lg mb-2">
            <span className="text-green-400">Imparfait</span> = <strong>background, description, habits</strong>
          </p>
          <p className="text-center text-lg">
            <span className="text-blue-400">Passé composé</span> = <strong>completed action, event</strong>
          </p>
        </div>

        <div className="space-y-4">
          {tenseComparisons.map((comp, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 bg-green-50 border-b md:border-b-0 md:border-r border-slate-200">
                  <p className="text-xs text-green-600 font-medium uppercase tracking-wide mb-2">Imparfait</p>
                  <p className="font-medium text-slate-800 mb-1">{comp.imparfait}</p>
                  <p className="text-slate-500 text-sm">{comp.imparfaitEnglish}</p>
                </div>
                <div className="p-4 bg-blue-50">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-2">Passé composé</p>
                  <p className="font-medium text-slate-800 mb-1">{comp.passeCompose}</p>
                  <p className="text-slate-500 text-sm">{comp.passeComposeEnglish}</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-600 text-sm"><span className="font-medium">Note:</span> {comp.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <p className="text-purple-800 text-sm">
            <span className="font-medium">Memory trick:</span> Think of the imparfait as the <strong>background</strong> or <strong>repeated</strong> past. Think of the passé composé as the <strong>main event</strong> or <strong>finished action</strong>.
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
        <p className="text-slate-700 leading-relaxed">Study these examples. Notice how the imparfait is used for habits, descriptions, and background situations:</p>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
          <div className="space-y-4">
            {guidedExamples.map((ex, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-700 font-bold text-sm">
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
          <p className="text-slate-700 text-sm">Look for the <strong>-ais/-ait/-ions/-iez/-aient</strong> endings to spot the imparfait.</p>
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
          <p className="text-amber-800 text-sm">These mistakes are very common. They often happen when learners confuse the imparfait with the passé composé or use the wrong ending.</p>
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
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-3xl font-bold mb-4">
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
              <button onClick={handleContinueAnyway} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <span>Continue to Lesson Summary</span>
                <FaArrowRight size={18} />
              </button>
            ) : (
              <>
                <button onClick={handleRetake} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <FaRedo size={18} />
                  <span>Retake Practice</span>
                </button>
                <button onClick={handleContinueAnyway} className="w-full py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all">
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
            <motion.div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
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
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-1">{isComplete ? 'Lesson Complete!' : 'Complete the Lesson'}</h2>
        <p className="text-indigo-100">{isComplete ? "You've completed A2 Lesson 3." : 'Review all sections and complete the practice to finish.'}</p>
      </div>

      <div className="p-6">
        {isComplete ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">{score}<span className="text-slate-400">/{total}</span></div>
              <div className="text-lg text-slate-600">Practice Score: {percentage}%</div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <p className="text-green-800 font-medium mb-2">You now know how to form and use the imparfait for habits, descriptions, and background actions in the past.</p>
              <p className="text-green-700 text-sm">This will help you talk about past experiences more naturally and in more detail.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/classes/A2" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <FaBookOpen size={16} />
                <span>Review Lessons</span>
              </Link>
              <Link href="/classes/A2/lesson4" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transition-all">
                <span>Continue to Lesson 4</span>
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
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
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
