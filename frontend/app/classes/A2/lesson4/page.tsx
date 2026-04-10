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
  FaRocket,
  FaList,
  FaBolt
} from 'react-icons/fa'
import Link from 'next/link'
import {
  futurSimpleUses,
  futureEndings,
  regularFutureVerbs,
  irregularFutureVerbs,
  futureComparisons,
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

export default function A2Lesson4Page() {
  const [reviewedSections, setReviewedSections] = useState<SectionId[]>([])
  const [practiceAnswers, setPracticeAnswers] = useState<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>([])
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a2Lesson4Progress')
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
      localStorage.setItem('a2Lesson4Progress', JSON.stringify({
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/classes/A2" className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors">
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
          <RegularVerbsSection isReviewed={reviewedSections.includes('regular-verbs')} onMarkReviewed={() => markSectionReviewed('regular-verbs')} />
          <IrregularVerbsSection isReviewed={reviewedSections.includes('irregular-verbs')} onMarkReviewed={() => markSectionReviewed('irregular-verbs')} />
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
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <FaGraduationCap size={14} />
          <span>A2 Lesson 4</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">The Simple Future (Futur Simple)</h1>
        <p className="text-emerald-100 text-lg">Learn how to talk about future actions, plans, and predictions in French.</p>
      </div>
      <div className="p-6 bg-emerald-50 border-t border-emerald-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-emerald-700" size={14} />
          </div>
          <p className="text-emerald-800 text-sm">Read the explanations, notice the patterns, and complete the practice to build confidence.</p>
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
        <span className="text-sm font-medium text-emerald-600">{completedSections}/{totalSections} sections</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-emerald-600 to-teal-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
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
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isReviewed ? 'bg-green-100' : 'bg-emerald-100'}`}>
            {isReviewed ? <FaCheck className="text-green-600" size={18} /> : <Icon className="text-emerald-600" size={18} />}
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
    <SectionCard id="intro" title="What is the Futur Simple?" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          The <strong>futur simple</strong> is a future tense in French. It is used to talk about what will happen in the future. It is common in both written and spoken French.
        </p>

        <p className="text-slate-700 leading-relaxed">It often corresponds to English ideas like:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p className="font-medium text-emerald-800">“I will speak”</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p className="font-medium text-emerald-800">“she will go”</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p className="font-medium text-emerald-800">“they will arrive”</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p className="font-medium text-emerald-800">“you will have”</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-white">
          <p className="text-lg font-medium mb-3">Simple examples:</p>
          <div className="space-y-2">
            <p><span className="text-green-400">Je parlerai avec Marie.</span></p>
            <p className="text-slate-300">I will speak with Marie.</p>
            <p className="mt-3"><span className="text-blue-400">Nous finirons demain.</span></p>
            <p className="text-slate-300">We will finish tomorrow.</p>
            <p className="mt-3"><span className="text-purple-400">Il fera beau.</span></p>
            <p className="text-slate-300">The weather will be nice.</p>
            <p className="mt-3"><span className="text-yellow-400">Tu auras du temps.</span></p>
            <p className="text-slate-300">You will have time.</p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Key insight:</span> The futur simple is <strong>different</strong> from <strong>aller + infinitive</strong> (futur proche). At A2 level, the goal is to recognize the structure and begin using it with confidence.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function UsesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="uses" title="When Do We Use the Futur Simple?" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">The futur simple is used for several common situations about the future:</p>

        <div className="grid grid-cols-1 gap-4">
          {futurSimpleUses.map((use, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">{idx + 1}</span>
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
            <span className="font-medium">Remember:</span> The futur simple is very useful for talking about the future in a straightforward way, whether it's a plan, a prediction, or a promise.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function FormationSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="formation" title="How to Form the Futur Simple" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-5">
        <p className="text-slate-700 leading-relaxed">To form the futur simple, follow these steps:</p>

        <div className="bg-slate-800 rounded-xl p-6">
          <div className="space-y-3">
            <p className="text-white"><span className="bg-emerald-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">1</span>Start with the <strong>infinitive</strong> of the verb</p>
            <p className="text-white"><span className="bg-emerald-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">2</span>For <strong>-re</strong> verbs, remove the final <strong>e</strong></p>
            <p className="text-white"><span className="bg-emerald-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-sm mr-3">3</span>Add the <strong>future endings</strong></p>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          <p className="text-emerald-800 text-sm">Examples:</p>
          <ul className="text-emerald-700 text-sm space-y-1 mt-2">
            <li><strong>parler</strong> → parlerai (add endings to infinitive)</li>
            <li><strong>finir</strong> → finirai (add endings to infinitive)</li>
            <li><strong>vendre</strong> → vendrai (remove e, then add endings)</li>
          </ul>
        </div>

        <p className="text-slate-700 font-medium">The regular future endings:</p>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-2 bg-slate-50 p-3 border-b border-slate-200 font-medium text-slate-600 text-sm">
            <span>Subject</span>
            <span>Ending</span>
          </div>
          {futureEndings.map((item, idx) => (
            <div key={idx} className="grid grid-cols-2 p-3 border-b border-slate-100 last:border-0 items-center">
              <span className="text-slate-600">{item.pronoun}</span>
              <span className="font-semibold text-emerald-600">{item.ending}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-xl p-5 text-white">
          <p className="text-lg font-medium mb-3">parler in the futur simple:</p>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-green-400">je parlerai</span></div>
            <div><span className="text-blue-400">nous parlerons</span></div>
            <div><span className="text-purple-400">tu parleras</span></div>
            <div><span className="text-yellow-400">vous parlerez</span></div>
            <div><span className="text-pink-400">il parlera</span></div>
            <div><span className="text-cyan-400">ils parleront</span></div>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

function RegularVerbsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="regular-verbs" title="Common Regular Verbs in the Future" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">These regular verbs follow the standard pattern (infinitive + endings):</p>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-50 p-3 border-b border-slate-200 font-medium text-slate-600 text-sm">
            <span>Infinitive</span>
            <span>je form</span>
            <span>English</span>
          </div>
          {regularFutureVerbs.map((verb, idx) => (
            <div key={idx} className="grid grid-cols-3 p-3 border-b border-slate-100 last:border-0 items-center">
              <span className="text-slate-600">{verb.infinitive}</span>
              <span className="font-semibold text-emerald-600">{verb.je}</span>
              <span className="text-slate-500 text-sm">{verb.english}</span>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-800 text-sm">
            <span className="font-medium">Note:</span> Notice that <strong>vendre</strong> and <strong>attendre</strong> drop the final <strong>e</strong> before adding the endings: vendre → vendr-, attendre → attendr-.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function IrregularVerbsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="irregular-verbs" title="Common Irregular Future Stems" icon={FaBolt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Some important verbs do not keep the full infinitive. They use special stems in the futur simple. The <strong>endings stay the same</strong> — only the stem changes.
        </p>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Important:</span> These are the most common irregular future stems you should begin recognizing.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-4 bg-slate-50 p-3 border-b border-slate-200 font-medium text-slate-600 text-sm">
            <span>Infinitive</span>
            <span>Stem</span>
            <span>Sample</span>
            <span>English</span>
          </div>
          {irregularFutureVerbs.map((verb, idx) => (
            <div key={idx} className="grid grid-cols-4 p-3 border-b border-slate-100 last:border-0 items-center">
              <span className="text-slate-600">{verb.infinitive}</span>
              <span className="font-semibold text-amber-600">{verb.stem}</span>
              <span className="font-medium text-emerald-600">{verb.sample}</span>
              <span className="text-slate-500 text-sm">{verb.english}</span>
            </div>
          ))}
        </div>

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <p className="text-purple-800 text-sm">
            <span className="font-medium">Pattern tip:</span> Many irregular stems end in <strong>-r</strong> or <strong>-rr</strong>. Look for ser-, aur-, ir-, fer-, viendr-, verr-, voudr-, pourr-, devr-, saur-.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function ComparisonSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="comparison" title="Futur Simple vs Futur Proche" icon={FaRocket} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-xl p-5 text-white">
          <p className="text-center text-lg mb-2">
            <span className="text-yellow-400">Futur proche</span> = <strong>aller + infinitive</strong>
          </p>
          <p className="text-center text-lg">
            <span className="text-green-400">Futur simple</span> = <strong>one future tense form</strong>
          </p>
        </div>

        <div className="space-y-4">
          {futureComparisons.map((comp, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 bg-yellow-50 border-b md:border-b-0 md:border-r border-slate-200">
                  <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide mb-2">Futur proche</p>
                  <p className="font-medium text-slate-800 mb-1">{comp.futurProche}</p>
                  <p className="text-slate-500 text-sm">{comp.futurProcheEnglish}</p>
                </div>
                <div className="p-4 bg-green-50">
                  <p className="text-xs text-green-600 font-medium uppercase tracking-wide mb-2">Futur simple</p>
                  <p className="font-medium text-slate-800 mb-1">{comp.futurSimple}</p>
                  <p className="text-slate-500 text-sm">{comp.futurSimpleEnglish}</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-200">
                <p className="text-slate-600 text-sm"><span className="font-medium">Note:</span> {comp.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
          <p className="text-emerald-800 text-sm">
            <span className="font-medium">Key insight:</span> Both forms are correct, but the structure is different. The futur proche often feels closer or more immediate. The futur simple is a standard future tense for general future statements.
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
        <p className="text-slate-700 leading-relaxed">Study these examples. Notice the futur simple forms and their endings:</p>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
          <div className="space-y-4">
            {guidedExamples.map((ex, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold text-sm">
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
          <p className="text-slate-700 text-sm">Look for the <strong>-ai/-as/-a/-ons/-ez/-ont</strong> endings to spot the futur simple.</p>
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
          <p className="text-amber-800 text-sm">These mistakes are very common. They often happen when learners mix regular endings, forget irregular stems, or confuse futur simple with futur proche.</p>
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
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-3xl font-bold mb-4">
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
              <button onClick={handleContinueAnyway} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <span>Continue to Lesson Summary</span>
                <FaArrowRight size={18} />
              </button>
            ) : (
              <>
                <button onClick={handleRetake} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <FaRedo size={18} />
                  <span>Retake Practice</span>
                </button>
                <button onClick={handleContinueAnyway} className="w-full py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 transition-all">
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
            <motion.div className="h-full bg-gradient-to-r from-emerald-600 to-teal-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
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
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 hover:border-emerald-300 text-slate-700'
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
                        ? 'border-emerald-500 bg-emerald-500'
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
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg'
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
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-1">{isComplete ? 'Lesson Complete!' : 'Complete the Lesson'}</h2>
        <p className="text-emerald-100">{isComplete ? "You've completed A2 Lesson 4." : 'Review all sections and complete the practice to finish.'}</p>
      </div>

      <div className="p-6">
        {isComplete ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">{score}<span className="text-slate-400">/{total}</span></div>
              <div className="text-lg text-slate-600">Practice Score: {percentage}%</div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <p className="text-green-800 font-medium mb-2">You now know how to form and use the futur simple for future actions, plans, and predictions.</p>
              <p className="text-green-700 text-sm">You can also begin to distinguish it from futur proche.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/classes/A2" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <FaBookOpen size={16} />
                <span>Review Lessons</span>
              </Link>
              <Link href="/classes/A2/lesson5" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg transition-all">
                <span>Continue to Lesson 5</span>
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
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg'
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
