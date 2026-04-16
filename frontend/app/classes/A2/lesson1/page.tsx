/**
 * A2 Lesson 1 - Near Future (Futur Proche) with Aller + Infinitive
 * ================================================================
 *
 * This page teaches A2 learners how to form the near future tense in French
 * using the structure: aller + infinitive (le futur proche).
 *
 * **Lesson Structure:**
 * 1. IntroSection - Introduction to the near future concept
 * 2. FormulaSection - Structure formula explanation
 * 3. ConjugationSection - Present tense conjugation of "aller"
 * 4. InfinitivesSection - Common infinitives to use
 * 5. ComparisonSection - Present vs near future comparison
 * 6. ExamplesSection - Guided example sentences
 * 7. MistakesSection - Common beginner mistakes
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionSection - Lesson completion UI
 *
 * **State Management:**
 * - reviewedSections: Array of reviewed section IDs (persisted to localStorage)
 * - practiceAnswers: Array of user's quiz answers
 * - practiceCompleted: Boolean flag for quiz completion
 * - lessonCompleted: Boolean flag for overall lesson completion
 *
 * **Features:**
 * - Collapsible sections with auto-mark-as-reviewed on open
 * - Progress bar showing completion status
 * - 15-question interactive quiz with feedback
 * - LocalStorage persistence for progress
 * - Performance-based feedback messages
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state and side effects
import { useState, useEffect } from 'react'

// Framer Motion for animations
import { motion, AnimatePresence } from 'framer-motion'

// React Icons for UI elements
import {
  FaHome,             // Back navigation
  FaCheck,            // Reviewed status, correct answer
  FaChevronRight,     // Next button
  FaArrowRight,       // Continue button
  FaBookOpen,         // Section icons
  FaGraduationCap,    // Lesson header icon
  FaLightbulb,        // Intro section, tips
  FaTimes,            // Incorrect answer
  FaRedo,             // Retake practice
  FaChevronDown,      // Expand section
  FaChevronUp,        // Collapse section
  FaVolumeUp,         // Audio playback
  FaRocket,           // Completion
  FaExclamationTriangle // Mistakes section
} from 'react-icons/fa'

// Next.js Link for navigation
import Link from 'next/link'

// Lesson data
import {
  allerConjugation,
  commonInfinitives,
  tenseComparisons,
  guidedExamples,
  commonMistakes,
  practiceQuestions,
  sectionIds,
  SectionId,
  getPerformanceMessage
} from './data'

// =============================================================================
// TYPES
// =============================================================================

/**
 * LessonProgress - Shape of persisted lesson progress in localStorage.
 */
interface LessonProgress {
  reviewedSections: SectionId[]
  practiceAnswers: { questionId: number; selectedOption: number; isCorrect: boolean }[]
  practiceCompleted: boolean
  lessonCompleted: boolean
}

// =============================================================================
// FEEDBACK MESSAGES
// =============================================================================

/**
 * feedbackMessages - Random encouraging messages for quiz feedback.
 */
const feedbackMessages = {
  correct: ['Nice 😏', 'Good catch', "That's right", "You're getting it", 'Well done!', 'Perfect!'],
  incorrect: ['Careful now…', 'Almost there', 'Keep trying', 'Not quite', 'Review the pattern']
}

/**
 * getRandomFeedback - Returns a random feedback message.
 * @param isCorrect - Whether the answer was correct
 * @returns Random message string
 */
function getRandomFeedback(isCorrect: boolean) {
  const messages = isCorrect ? feedbackMessages.correct : feedbackMessages.incorrect
  return messages[Math.floor(Math.random() * messages.length)]
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * A2Lesson1Page - Main component for the near future lesson.
 *
 * Manages lesson state, persists progress to localStorage, and renders
 * all lesson sections with collapsible cards.
 */
export default function A2Lesson1Page() {
  // ---------------------------------------------------------------------------
  // STATE: Section Review Tracking
  // ---------------------------------------------------------------------------
  const [reviewedSections, setReviewedSections] = useState<SectionId[]>([])

  // ---------------------------------------------------------------------------
  // STATE: Practice Quiz
  // ---------------------------------------------------------------------------
  const [practiceAnswers, setPracticeAnswers] = useState<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>([])
  const [practiceCompleted, setPracticeCompleted] = useState(false)

  // ---------------------------------------------------------------------------
  // STATE: Lesson Completion
  // ---------------------------------------------------------------------------
  const [lessonCompleted, setLessonCompleted] = useState(false)

  // ---------------------------------------------------------------------------
  // STATE: Hydration Check
  // ---------------------------------------------------------------------------
  // Prevents hydration mismatch by tracking client-side mount
  const [isClient, setIsClient] = useState(false)

  // ---------------------------------------------------------------------------
  // EFFECT: Load Progress from localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a2Lesson1Progress')
    if (saved) {
      const parsed: LessonProgress = JSON.parse(saved)
      setReviewedSections(parsed.reviewedSections || [])
      setPracticeAnswers(parsed.practiceAnswers || [])
      setPracticeCompleted(parsed.practiceCompleted || false)
      setLessonCompleted(parsed.lessonCompleted || false)
    }
  }, [])

  // ---------------------------------------------------------------------------
  // EFFECT: Save Progress to localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('a2Lesson1Progress', JSON.stringify({
        reviewedSections,
        practiceAnswers,
        practiceCompleted,
        lessonCompleted
      }))
    }
  }, [reviewedSections, practiceAnswers, practiceCompleted, lessonCompleted, isClient])

  // ---------------------------------------------------------------------------
  // HANDLER: Mark Section Reviewed
  // ---------------------------------------------------------------------------
  const markSectionReviewed = (sectionId: SectionId) => {
    if (!reviewedSections.includes(sectionId)) {
      setReviewedSections(prev => [...prev, sectionId])
    }
  }

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------
  const allSectionsReviewed = sectionIds.every(id => reviewedSections.includes(id))
  const practiceScore = practiceAnswers.filter(a => a.isCorrect).length

  // ---------------------------------------------------------------------------
  // HANDLER: Complete Lesson
  // ---------------------------------------------------------------------------
  const completeLesson = () => {
    if (allSectionsReviewed && practiceCompleted) {
      setLessonCompleted(true)
    }
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================
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
          <FormulaSection isReviewed={reviewedSections.includes('formula')} onMarkReviewed={() => markSectionReviewed('formula')} />
          <ConjugationSection isReviewed={reviewedSections.includes('conjugation')} onMarkReviewed={() => markSectionReviewed('conjugation')} />
          <InfinitivesSection isReviewed={reviewedSections.includes('infinitives')} onMarkReviewed={() => markSectionReviewed('infinitives')} />
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

// =============================================================================
// SUB-COMPONENT: LessonHeader
// =============================================================================

/**
 * LessonHeader - Displays the lesson title, badge, and description.
 *
 * Features:
 * - A2 Lesson 1 badge with graduation cap icon
 * - Main title about near future (futur proche)
 * - Blue gradient header background
 * - Tip box with lightbulb icon
 * - Fade-in animation on mount
 */
function LessonHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <FaGraduationCap size={14} />
          <span>A2 Lesson 1</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Near Future (Futur Proche) — Aller + Infinitive</h1>
        <p className="text-blue-100 text-lg">Learn how to talk about what you are going to do in French.</p>
      </div>
      <div className="p-6 bg-blue-50 border-t border-blue-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-blue-700" size={14} />
          </div>
          <p className="text-blue-800 text-sm">Read the examples, notice the pattern, and complete the practice to build confidence.</p>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// SUB-COMPONENT: ProgressBar
// =============================================================================

/**
 * ProgressBar - Visual indicator of lesson progress.
 *
 * Displays:
 * - Number of completed sections out of total (8)
 * - Animated progress bar with gradient fill
 * - Percentage completion
 *
 * @param reviewedSections - Array of section IDs that have been reviewed
 */
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
        <motion.div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENT: SectionProps Interface
// =============================================================================

/**
 * SectionProps - Common props for all lesson section components.
 */
interface SectionProps {
  isReviewed: boolean
  onMarkReviewed: () => void
}

// =============================================================================
// SUB-COMPONENT: SectionCard
// =============================================================================

/**
 * SectionCard - Collapsible wrapper for lesson content sections.
 *
 * Features:
 * - Clickable header to expand/collapse content
 * - Auto-mark-as-reviewed when opened
 * - Icon showing review status (checkmark when reviewed)
 * - Animated expand/collapse with AnimatePresence
 * - Color-coded header (blue when pending, green when reviewed)
 *
 * @param id - Section identifier
 * @param title - Section title displayed in header
 * @param icon - React icon component for the section
 * @param isReviewed - Whether this section has been reviewed
 * @param onMarkReviewed - Callback to mark section as reviewed
 * @param children - Section content to display when expanded
 * @param defaultOpen - Whether section starts expanded
 */
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

// =============================================================================
// SUB-COMPONENT: IntroSection
// =============================================================================

/**
 * IntroSection - Introduction to the near future tense concept.
 *
 * Content:
 * - Explanation of aller + infinitive structure
 * - Quick examples showing the pattern
 * - Pro tip about this being an essential everyday structure
 */
function IntroSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="intro" title="What is the Near Future with Aller?" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In French, one common way to talk about the near future is: <strong>aller + infinitive</strong>. This structure is often called <strong>le futur proche</strong>.
        </p>
        <p className="text-slate-700 leading-relaxed">
          It is used to talk about actions that are going to happen soon or that the speaker plans to do.
        </p>

        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">Quick examples:</h3>
          <div className="space-y-2 text-blue-800">
            <p><strong>Je vais manger.</strong> = I am going to eat.</p>
            <p><strong>Nous allons partir.</strong> = We are going to leave.</p>
            <p><strong>Elle va étudier.</strong> = She is going to study.</p>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
          <p className="text-indigo-800 text-sm">
            <span className="font-medium">Pro tip:</span> This is one of the most useful future structures in everyday French. It is often easier to learn first than the full future tense.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SUB-COMPONENT: FormulaSection
// =============================================================================

/**
 * FormulaSection - Displays the grammatical formula for near future.
 *
 * Content:
 * - Visual formula: Subject + aller (present) + infinitive
 * - Grid of 6 example sentences with different subjects
 * - Reminder that aller changes but the second verb stays infinitive
 */
function FormulaSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="formula" title="Formula and Structure" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">The formula is simple:</p>

        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <p className="text-white text-lg font-medium">Subject + <span className="text-blue-400">aller</span> (present) + <span className="text-green-400">infinitive</span></p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['Je vais parler.', 'Tu vas finir.', 'Il va travailler.', 'Nous allons regarder un film.', 'Vous allez apprendre.', 'Elles vont sortir.'].map((ex, i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <p className="font-medium text-slate-800">{ex}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Remember:</span> <strong>aller</strong> changes depending on the subject. The second verb stays in the infinitive.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SUB-COMPONENT: ConjugationSection
// =============================================================================

/**
 * ConjugationSection - Table showing aller conjugation in present tense.
 *
 * Content:
 * - 3-column table: Pronoun, Form, Full
 * - All 6 subject pronouns with their forms
 * - Visual reference for using aller in near future
 */
function ConjugationSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="conjugation" title="Conjugation Recap of Aller" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">You already met <strong>aller</strong> earlier. Now you are using it to talk about the future.</p>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-50 p-3 border-b border-slate-200 font-medium text-slate-600 text-sm">
            <span>Pronoun</span>
            <span>Form</span>
            <span>Full</span>
          </div>
          {allerConjugation.map((item, idx) => (
            <div key={idx} className="grid grid-cols-3 p-3 border-b border-slate-100 last:border-0 items-center">
              <span className="text-slate-600">{item.pronoun}</span>
              <span className="font-semibold text-blue-600">{item.form}</span>
              <span className="font-medium text-slate-800">{item.full}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SUB-COMPONENT: InfinitivesSection
// =============================================================================

/**
 * InfinitivesSection - Grid of common verbs to use after aller.
 *
 * Content:
 * - 10 common infinitives in a 2-3 column grid
 * - Each shows French infinitive and English meaning
 * - Everyday actions like manger, parler, étudier, etc.
 */
function InfinitivesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="infinitives" title="Common Infinitives with Aller" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">These are common verbs you can use after aller:</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {commonInfinitives.map((item, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
              <p className="font-semibold text-slate-800 text-lg mb-1">{item.infinitive}</p>
              <p className="text-slate-500 text-sm">{item.english}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SUB-COMPONENT: ComparisonSection
// =============================================================================

/**
 * ComparisonSection - Side-by-side present vs near future comparison.
 *
 * Content:
 * - 3 comparison cards showing present and near future versions
 * - Each card shows French and English for both tenses
 * - Key difference explanation box
 */
function ComparisonSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="comparison" title="Present vs Near Future" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">Notice the difference between present tense and aller + infinitive:</p>

        <div className="space-y-3">
          {tenseComparisons.map((comp, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="p-4 bg-slate-50 border-b sm:border-b-0 sm:border-r border-slate-200">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Present Tense</p>
                  <p className="font-medium text-slate-800">{comp.present}</p>
                  <p className="text-slate-500 text-sm mt-1">{comp.presentEnglish}</p>
                </div>
                <div className="p-4 bg-blue-50">
                  <p className="text-xs text-blue-600 uppercase tracking-wide mb-2">Near Future</p>
                  <p className="font-medium text-slate-800">{comp.future}</p>
                  <p className="text-slate-500 text-sm mt-1">{comp.futureEnglish}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-800 text-sm">
            <span className="font-medium">Key difference:</span> The present tense describes what is happening now. Aller + infinitive describes what is going to happen.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SUB-COMPONENT: ExamplesSection
// =============================================================================

/**
 * ExamplesSection - Full near future sentences with audio buttons.
 *
 * Content:
 * - 6 guided example sentences
 * - French sentence with English translation
 * - Audio playback button for each example
 */
function ExamplesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="examples" title="Guided Examples" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-3">
        {guidedExamples.map((ex, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between">
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
    </SectionCard>
  )
}

// =============================================================================
// SUB-COMPONENT: MistakesSection
// =============================================================================

/**
 * MistakesSection - Shows common errors learners make.
 *
 * Content:
 * - 4 common mistakes with wrong/correct comparison
 * - Visual distinction: red for wrong, green for correct
 * - Explanation of why each mistake is wrong
 */
function MistakesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="mistakes" title="Common Beginner Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">These mistakes are normal. They usually happen when learners conjugate the second verb by accident.</p>
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

// =============================================================================
// SUB-COMPONENT: PracticeSection
// =============================================================================

/**
 * PracticeSection - Interactive 15-question quiz with feedback.
 *
 * Features:
 * - Multiple-choice questions with 4 options each
 * - Visual feedback on selection (blue highlight)
 * - Correct/incorrect indication after submission (green/red)
 * - Random encouraging feedback messages
 * - Progress bar showing quiz progress
 * - Results screen with score and performance message
 * - Retake option for low scores
 * - Continue anyway option
 *
 * @param isReviewed - Whether practice section has been reviewed
 * @param onMarkReviewed - Callback to mark section as reviewed
 * @param practiceAnswers - Array of user's submitted answers
 * @param setPracticeAnswers - Setter for practice answers state
 * @param onComplete - Callback when user completes/continues from practice
 */
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

// =============================================================================
// SUB-COMPONENT: CompletionSection
// =============================================================================

/**
 * CompletionSection - Lesson completion UI with score display.
 *
 * Features:
 * - Two states: incomplete (prompts to complete sections) vs complete (shows results)
 * - Score display with percentage calculation
 * - Success message about what was learned
 * - Navigation buttons: Review Lessons or Continue to Lesson 2
 * - "Mark Lesson Complete" button when sections and practice are done
 *
 * @param isComplete - Whether the lesson is marked as complete
 * @param canComplete - Whether all sections and practice are done (enables complete button)
 * @param score - Number of correct practice answers
 * @param total - Total number of practice questions (15)
 * @param onComplete - Callback to mark lesson as complete
 */
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
        <p className="text-blue-100">{isComplete ? "You've completed A2 Lesson 1." : 'Review all sections and complete the practice to finish.'}</p>
      </div>

      <div className="p-6">
        {isComplete ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">{score}<span className="text-slate-400">/{total}</span></div>
              <div className="text-lg text-slate-600">Practice Score: {percentage}%</div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <p className="text-green-800 font-medium mb-2">You now know how to talk about the near future with aller + infinitive!</p>
              <p className="text-green-700 text-sm">This structure will help you talk about plans and intentions in everyday French.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/classes/A2" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <FaBookOpen size={16} />
                <span>Review Lessons</span>
              </Link>
              <Link href="/classes/A2/lesson2" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transition-all">
                <span>Continue to Lesson 2</span>
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
