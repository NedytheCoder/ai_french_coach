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
  FaSun,
  FaMoon,
  FaExclamationTriangle
} from 'react-icons/fa'
import Link from 'next/link'
import {
  reflexivePronouns,
  commonReflexiveVerbs,
  presentTenseExamples,
  dailyRoutineExamples,
  negativeExamples,
  passeComposeExamples,
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

export default function A2Lesson2Page() {
  const [reviewedSections, setReviewedSections] = useState<SectionId[]>([])
  const [practiceAnswers, setPracticeAnswers] = useState<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>([])
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a2Lesson2Progress')
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
      localStorage.setItem('a2Lesson2Progress', JSON.stringify({
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/classes/A2" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A2</span>
          </Link>
        </div>

        <LessonHeader />
        <ProgressBar reviewedSections={reviewedSections} />

        <div className="space-y-6">
          <IntroSection isReviewed={reviewedSections.includes('intro')} onMarkReviewed={() => markSectionReviewed('intro')} />
          <PronounsSection isReviewed={reviewedSections.includes('pronouns')} onMarkReviewed={() => markSectionReviewed('pronouns')} />
          <VerbsSection isReviewed={reviewedSections.includes('verbs')} onMarkReviewed={() => markSectionReviewed('verbs')} />
          <PresentSection isReviewed={reviewedSections.includes('present')} onMarkReviewed={() => markSectionReviewed('present')} />
          <RoutineSection isReviewed={reviewedSections.includes('routine')} onMarkReviewed={() => markSectionReviewed('routine')} />
          <NegationSection isReviewed={reviewedSections.includes('negation')} onMarkReviewed={() => markSectionReviewed('negation')} />
          <PasseComposeSection isReviewed={reviewedSections.includes('passe-compose')} onMarkReviewed={() => markSectionReviewed('passe-compose')} />
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <FaGraduationCap size={14} />
          <span>A2 Lesson 2</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Reflexive Verbs (Pronominal Verbs)</h1>
        <p className="text-blue-100 text-lg">Learn how to talk about routines and actions people do to themselves in French.</p>
      </div>
      <div className="p-6 bg-blue-50 border-t border-blue-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-blue-700" size={14} />
          </div>
          <p className="text-blue-800 text-sm">Read the examples, notice the structure, and complete the practice to build confidence.</p>
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
        <span className="text-sm font-medium text-blue-600">{completedSections}/{totalSections} sections</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
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
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isReviewed ? 'bg-green-100' : 'bg-blue-100'}`}>
            {isReviewed ? <FaCheck className="text-green-600" size={18} /> : <Icon className="text-blue-600" size={18} />}
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
    <SectionCard id="intro" title="What is a Reflexive / Pronominal Verb?" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          A <strong>reflexive verb</strong> (or <strong>pronominal verb</strong>) uses a <strong>reflexive pronoun</strong> with the verb. It often shows that the subject is doing the action to themselves.
        </p>
        <p className="text-slate-700 leading-relaxed">
          These verbs are very common in everyday French, especially for routines and daily activities.
        </p>

        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">Quick examples:</h3>
          <div className="space-y-2 text-blue-800">
            <p><strong>Je me lève.</strong> = I get up.</p>
            <p><strong>Elle se lave.</strong> = She washes herself.</p>
            <p><strong>Nous nous habillons.</strong> = We get dressed.</p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Important:</span> In French, many daily routine actions are expressed with reflexive verbs. You must use both the pronoun and the verb.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function PronounsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="pronouns" title="Reflexive Pronouns" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">The reflexive pronoun changes to match the subject:</p>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-50 p-3 border-b border-slate-200 font-medium text-slate-600 text-sm">
            <span>Subject</span>
            <span>Pronoun</span>
            <span>Example</span>
          </div>
          {reflexivePronouns.map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 p-3 border-b border-slate-100 last:border-0 items-center">
              <span className="text-slate-600">{item.subject}</span>
              <span className="font-semibold text-blue-600">{item.pronoun}</span>
              <span className="font-medium text-slate-800">{item.example}</span>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
          <h4 className="font-semibold text-indigo-900 mb-2">Before a vowel or silent h:</h4>
          <p className="text-indigo-800 text-sm mb-2">me, te, and se become <strong>m', t',</strong> and <strong>s'</strong></p>
          <ul className="text-indigo-700 text-sm space-y-1">
            <li><strong>Je m'appelle</strong> (not Je me appelle)</li>
            <li><strong>Tu t'habilles</strong> (not Tu te habilles)</li>
            <li><strong>Elle s'appelle</strong> (not Elle se appelle)</li>
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

function VerbsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="verbs" title="Common Reflexive Verbs" icon={FaSun} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">These reflexive verbs are used often in everyday French:</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {commonReflexiveVerbs.map((item, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
              <p className="font-semibold text-slate-800 text-lg mb-1">{item.infinitive}</p>
              <p className="text-slate-500 text-sm">{item.english}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-800 text-sm">
            <span className="font-medium">Tip:</span> Notice how many of these are daily routine verbs. Reflexive verbs are essential for talking about your day in French.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function PresentSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="present" title="Present Tense Structure" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">A reflexive verb in the present tense follows this pattern:</p>

        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-white text-lg font-medium">Subject + <span className="text-blue-400">reflexive pronoun</span> + <span className="text-green-400">conjugated verb</span></p>
        </div>

        <div className="space-y-3">
          {presentTenseExamples.map((ex, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800 text-lg">{ex.french}</p>
                <p className="text-slate-500">{ex.english}</p>
              </div>
              <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                <FaVolumeUp size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <ul className="text-amber-800 text-sm space-y-1">
            <li>• The reflexive pronoun comes <strong>before</strong> the conjugated verb</li>
            <li>• The main verb is conjugated to match the subject</li>
            <li>• The reflexive pronoun must also match the subject</li>
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

function RoutineSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="routine" title="Daily Routine Examples" icon={FaSun} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">Reflexive verbs are especially common when talking about daily habits and routines:</p>

        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6">
          <div className="space-y-4">
            {dailyRoutineExamples.map((ex, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 text-orange-700 font-bold text-sm">
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
          <FaSun className="text-orange-500" size={24} />
          <div>
            <p className="text-slate-700 font-medium">Morning routine</p>
            <p className="text-slate-500 text-sm">se réveiller → se lever → se laver → s'habiller</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-100 rounded-xl p-4">
          <FaMoon className="text-indigo-500" size={24} />
          <div>
            <p className="text-slate-700 font-medium">Evening routine</p>
            <p className="text-slate-500 text-sm">se coucher, se reposer</p>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

function NegationSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="negation" title="Negation with Reflexive Verbs" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">In negation, the reflexive pronoun stays with the verb, and the negation wraps around them:</p>

        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-white text-lg font-medium">Subject + <span className="text-red-400">ne</span> + <span className="text-blue-400">reflexive pronoun</span> + verb + <span className="text-red-400">pas</span></p>
        </div>

        <div className="space-y-3">
          {negativeExamples.map((ex, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-4 bg-slate-50 border-b sm:border-b-0 sm:border-r border-slate-200">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Affirmative</p>
                  <p className="font-medium text-slate-800">{ex.affirmative}</p>
                </div>
                <div className="p-4 bg-red-50">
                  <p className="text-xs text-red-600 uppercase tracking-wide mb-2">Negative</p>
                  <p className="font-medium text-slate-800">{ex.negative}</p>
                  <p className="text-slate-500 text-sm mt-1">{ex.english}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
          <p className="text-indigo-800 text-sm">
            <span className="font-medium">Note:</span> ne becomes <strong>n'</strong> before a vowel:
            <br />• Je <strong>n'</strong>me lève pas → Je ne m'habille pas vite.
            <br />• Elle <strong>n'</strong>se couche pas → Elle ne s'appelle pas Marie.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function PasseComposeSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="passe-compose" title="Passé Composé with Reflexive Verbs" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">Reflexive verbs use <strong>être</strong> in the passé composé. The reflexive pronoun stays before the auxiliary.</p>

        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-white text-lg font-medium">Subject + <span className="text-blue-400">reflexive pronoun</span> + <span className="text-purple-400">être</span> + <span className="text-green-400">past participle</span></p>
        </div>

        <div className="space-y-3">
          {passeComposeExamples.map((ex, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800 text-lg">{ex.french}</p>
                <p className="text-slate-500">{ex.english}</p>
              </div>
              <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                <FaVolumeUp size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Agreement note:</span> Because reflexive verbs use <strong>être</strong>, you may notice agreement in the past participle. At this level, focus on recognizing the structure: <strong>pronoun + être + participle</strong>.
          </p>
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
          <p className="text-amber-800 text-sm">These mistakes are very common. They usually happen when learners forget the reflexive pronoun or put words in the wrong order.</p>
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
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-3xl font-bold mb-4">
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
              <button onClick={handleContinueAnyway} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <span>Continue to Lesson Summary</span>
                <FaArrowRight size={18} />
              </button>
            ) : (
              <>
                <button onClick={handleRetake} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
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
            <motion.div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
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
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-slate-200 hover:border-blue-300 text-slate-700'
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
                        ? 'border-blue-500 bg-blue-500'
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
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-1">{isComplete ? 'Lesson Complete!' : 'Complete the Lesson'}</h2>
        <p className="text-blue-100">{isComplete ? "You've completed A2 Lesson 2." : 'Review all sections and complete the practice to finish.'}</p>
      </div>

      <div className="p-6">
        {isComplete ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">{score}<span className="text-slate-400">/{total}</span></div>
              <div className="text-lg text-slate-600">Practice Score: {percentage}%</div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <p className="text-green-800 font-medium mb-2">You now know how reflexive verbs work in the present tense and how to recognize them in negation and the passé composé!</p>
              <p className="text-green-700 text-sm">This will help you talk about routines and everyday actions more naturally.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/classes/A2" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <FaBookOpen size={16} />
                <span>Review Lessons</span>
              </Link>
              <Link href="/classes/A2/lesson3" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transition-all">
                <span>Continue to Lesson 3</span>
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
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
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
