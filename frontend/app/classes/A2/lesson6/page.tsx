/**
 * A2 Lesson 6 - Direct Object Pronouns (Pronoms Compléments d'Objet Direct)
 * ===========================================================================
 *
 * This page teaches A2 learners how to use direct object pronouns in French,
 * including le, la, les, me, te, nous, vous.
 *
 * **Lesson Structure:**
 * 1. IntroSection - Introduction to direct object pronouns
 * 2. WhatIsDirectObjectSection - Identifying direct objects (what? who?)
 * 3. PronounsTableSection - Chart of all direct object pronouns
 * 4. ReplacementSection - Replacing nouns with pronouns
 * 5. PositionSection - Pronoun placement before the verb
 * 6. NegationSection - Using pronouns with negation (ne...pas)
 * 7. PasseComposeSection - Agreement rules in passé composé
 * 8. ExamplesSection - Guided example sentences
 * 9. MistakesSection - Common errors to avoid
 * 10. PracticeSection - Interactive quiz (15 questions)
 * 11. CompletionSection - Lesson completion UI
 *
 * **Key Concepts:**
 * - Direct object = answers "what?" or "who?" after the verb
 * - Pronouns: me, te, le/la, nous, vous, les
 * - Placement: before the conjugated verb (or auxiliary in passé composé)
 * - Agreement: past participle agrees with preceding direct object pronoun
 * - Le/la → l' before vowels (elision)
 *
 * **Features:**
 * - Collapsible sections with auto-mark-as-reviewed
 * - Progress persistence to localStorage
 * - 15-question interactive quiz with feedback
 * - Performance-based personalized messages
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import { useState, useEffect } from 'react'

// Framer Motion for animations and transitions
import { motion, AnimatePresence } from 'framer-motion'

// React Icons for UI elements
import {
  FaHome,               // Back navigation
  FaCheck,              // Reviewed status, correct answer
  FaChevronRight,       // Next button
  FaArrowRight,         // Continue button
  FaBookOpen,           // Lesson content
  FaGraduationCap,      // Lesson header
  FaLightbulb,          // Tips and intro
  FaTimes,              // Incorrect answer
  FaRedo,               // Retake practice
  FaChevronDown,        // Expand section
  FaChevronUp,          // Collapse section
  FaExclamationTriangle, // Mistakes section
  FaArrowUp,            // Position/Placement
  FaExchangeAlt,        // Replacement examples
  FaList,               // Pronouns table
  FaBan,                // Negation
  FaClock,              // Passé composé/timing
  FaStar                // Agreement/important
} from 'react-icons/fa'

// Next.js Link for navigation
import Link from 'next/link'

// Lesson data imports
import {
  directObjectExamples,
  directObjectPronouns,
  replacementExamples,
  positionExamples,
  negativeExamples,
  passeComposeExamples,
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
 * A2Lesson6Page - Main component for the direct object pronouns lesson.
 *
 * Manages lesson state, persists progress to localStorage, and renders
 * all lesson sections with collapsible cards.
 */
export default function A2Lesson6Page() {
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
  const [isClient, setIsClient] = useState(false)

  // ---------------------------------------------------------------------------
  // EFFECT: Load Progress from localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a2Lesson6Progress')
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
      localStorage.setItem('a2Lesson6Progress', JSON.stringify({
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/classes/A2" className="inline-flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors">
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A2</span>
          </Link>
        </div>

        <LessonHeader />
        <ProgressBar reviewedSections={reviewedSections} />

        <div className="space-y-6">
          <IntroSection isReviewed={reviewedSections.includes('intro')} onMarkReviewed={() => markSectionReviewed('intro')} />
          <WhatIsDirectObjectSection isReviewed={reviewedSections.includes('what-is-direct-object')} onMarkReviewed={() => markSectionReviewed('what-is-direct-object')} />
          <WhatIsPronounSection isReviewed={reviewedSections.includes('what-is-pronoun')} onMarkReviewed={() => markSectionReviewed('what-is-pronoun')} />
          <PronounsTableSection isReviewed={reviewedSections.includes('pronouns-table')} onMarkReviewed={() => markSectionReviewed('pronouns-table')} />
          <ReplacingNounsSection isReviewed={reviewedSections.includes('replacing-nouns')} onMarkReviewed={() => markSectionReviewed('replacing-nouns')} />
          <PositionSection isReviewed={reviewedSections.includes('position')} onMarkReviewed={() => markSectionReviewed('position')} />
          <NegationSection isReviewed={reviewedSections.includes('negation')} onMarkReviewed={() => markSectionReviewed('negation')} />
          <PasseComposeSection isReviewed={reviewedSections.includes('passe-compose')} onMarkReviewed={() => markSectionReviewed('passe-compose')} />
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
      <div className="bg-gradient-to-r from-cyan-600 to-teal-700 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <FaGraduationCap size={14} />
          <span>A2 Lesson 6</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Direct Object Pronouns</h1>
        <p className="text-cyan-100 text-lg">Learn how to replace direct objects with pronouns in French.</p>
      </div>
      <div className="p-6 bg-cyan-50 border-t border-cyan-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-cyan-700" size={14} />
          </div>
          <p className="text-cyan-800 text-sm">Read the explanations, notice the sentence patterns, and complete the practice to build confidence.</p>
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
 * - Number of completed sections out of total (11)
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
        <span className="text-sm font-medium text-cyan-600">{completedSections}/{totalSections} sections</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-cyan-600 to-teal-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
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
 * - Color-coded header (cyan when pending, green when reviewed)
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
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isReviewed ? 'bg-green-100' : 'bg-cyan-100'}`}>
            {isReviewed ? <FaCheck className="text-green-600" size={18} /> : <Icon className="text-cyan-600" size={18} />}
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
 * IntroSection - Introduction to direct object pronouns.
 *
 * Content:
 * - Explanation of what direct object pronouns do (avoid repetition)
 * - English comparison showing "it" replacing a noun
 * - Learning objectives checklist
 * - Opens by default to engage learners immediately
 */
function IntroSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="intro" title="Introduction" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} defaultOpen={true}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In French, direct object pronouns help you avoid repeating nouns. Instead of saying "I watch the film" and then "I watch the film again," you can say "I watch <strong>it</strong> again."
        </p>
        <p className="text-slate-700 leading-relaxed">
          This lesson will teach you how to identify direct objects, choose the right pronoun, and place it correctly in French sentences.
        </p>

        <div className="bg-cyan-50 rounded-xl p-5 border border-cyan-200">
          <h3 className="font-semibold text-cyan-900 mb-3">What you will learn:</h3>
          <ul className="space-y-2 text-cyan-800 text-sm">
            <li className="flex items-center gap-2">
              <FaCheck size={14} className="text-cyan-600" />
              <span>What a direct object is</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={14} className="text-cyan-600" />
              <span>The French direct object pronouns (me, te, le, la, l', nous, vous, les)</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={14} className="text-cyan-600" />
              <span>How to replace nouns with pronouns</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={14} className="text-cyan-600" />
              <span>Correct sentence position</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={14} className="text-cyan-600" />
              <span>How they work in negation and the passé composé</span>
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

function WhatIsDirectObjectSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="what-is-direct-object" title="What is a Direct Object?" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          A <strong>direct object</strong> receives the action of the verb directly. It answers questions like <strong>what?</strong> or <strong>whom?</strong>
        </p>
        <p className="text-slate-700 leading-relaxed">
          In French, many common verbs take direct objects. Here are some examples:
        </p>

        <div className="space-y-3">
          {directObjectExamples.map((item, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-600 font-bold">{idx + 1}</span>
                </div>
              </div>
              <p className="font-semibold text-slate-800 text-lg">{item.sentence}</p>
              <p className="text-slate-500 mb-3">{item.english}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Verb:</span>
                <span className="font-medium text-cyan-600">{item.verb}</span>
                <span className="text-slate-400 mx-2">|</span>
                <span className="text-slate-400">Direct object:</span>
                <span className="font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">{item.directObject}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Key insight:</span> In "Je regarde le film", the action is "regarde" and the direct object is "le film". In "Elle aime Marie", the direct object is "Marie".
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function WhatIsPronounSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="what-is-pronoun" title="What is a Direct Object Pronoun?" icon={FaExchangeAlt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          A <strong>direct object pronoun</strong> replaces the direct object noun. This helps avoid repetition and makes your French sound more natural.
        </p>
        <p className="text-slate-700 leading-relaxed">
          In French, the direct object pronoun usually comes <strong>before the verb</strong>.
        </p>

        <div className="bg-slate-800 rounded-xl p-6 text-white">
          <p className="text-lg font-medium mb-4">Before and after:</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-slate-300">Je regarde le film.</p>
                <p className="text-slate-400 text-sm">I watch the film.</p>
              </div>
              <FaArrowRight className="text-cyan-400" />
              <div className="flex-1">
                <p className="text-green-400 font-semibold">Je <strong>le</strong> regarde.</p>
                <p className="text-slate-400 text-sm">I watch it.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-slate-300">Elle aime Marie.</p>
                <p className="text-slate-400 text-sm">She loves Marie.</p>
              </div>
              <FaArrowRight className="text-cyan-400" />
              <div className="flex-1">
                <p className="text-green-400 font-semibold">Elle <strong>l'</strong> aime.</p>
                <p className="text-slate-400 text-sm">She loves her.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-slate-300">Nous mangeons les pommes.</p>
                <p className="text-slate-400 text-sm">We eat the apples.</p>
              </div>
              <FaArrowRight className="text-cyan-400" />
              <div className="flex-1">
                <p className="text-green-400 font-semibold">Nous <strong>les</strong> mangeons.</p>
                <p className="text-slate-400 text-sm">We eat them.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
          <p className="text-cyan-800 text-sm">
            <span className="font-medium">Important:</span> French places these pronouns before the verb, which is different from English. This is one of the most important word-order changes to notice.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function PronounsTableSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="pronouns-table" title="The French Direct Object Pronouns" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Here are all the direct object pronouns in French:
        </p>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-4 bg-slate-50 p-3 border-b border-slate-200 font-medium text-slate-600 text-sm">
            <span>Pronoun</span>
            <span>Use</span>
            <span>Example</span>
            <span>English</span>
          </div>
          {directObjectPronouns.map((item, idx) => (
            <div key={idx} className="grid grid-cols-4 p-3 border-b border-slate-100 last:border-0 items-center text-sm">
              <span className="font-semibold text-cyan-600">{item.pronoun}</span>
              <span className="text-slate-600">{item.use}</span>
              <span className="font-medium text-slate-800">{item.example}</span>
              <span className="text-slate-500">{item.english}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="font-medium text-amber-800 mb-2">Before a vowel or silent h:</p>
          <p className="text-amber-700 text-sm mb-2">
            <strong>me, te, le, la</strong> become <strong>m', t', l', l'</strong>
          </p>
          <div className="space-y-1 text-sm text-amber-700">
            <p>• Il <strong>m'</strong>aime. (He loves me.)</p>
            <p>• Je <strong>t'</strong>écoute. (I listen to you.)</p>
            <p>• Elle <strong>l'</strong>adore. (She adores him/her/it.)</p>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

function ReplacingNounsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="replacing-nouns" title="Replacing Nouns with Pronouns" icon={FaExchangeAlt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Follow these steps to replace a noun with a pronoun:
        </p>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <ol className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700 font-bold text-sm flex-shrink-0">1</span>
              <span>Find the direct object</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700 font-bold text-sm flex-shrink-0">2</span>
              <span>Identify its gender and number if needed</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700 font-bold text-sm flex-shrink-0">3</span>
              <span>Replace it with the correct pronoun</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700 font-bold text-sm flex-shrink-0">4</span>
              <span>Move the pronoun before the verb</span>
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          {replacementExamples.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">Original:</p>
                  <p className="text-slate-600">{item.original}</p>
                </div>
                <FaArrowRight className="text-cyan-500" />
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">Replaced:</p>
                  <p className="font-semibold text-cyan-700">{item.replaced}</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm bg-slate-50 p-2 rounded">{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}

function PositionSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="position" title="Sentence Position of Direct Object Pronouns" icon={FaArrowUp} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In simple affirmative sentences, the direct object pronoun comes <strong>before the conjugated verb</strong>.
        </p>

        <div className="bg-slate-800 rounded-xl p-5 text-white text-center">
          <p className="text-lg font-medium mb-2">Pattern:</p>
          <p className="text-xl"><span className="text-cyan-400">subject</span> + <span className="text-green-400">direct object pronoun</span> + <span className="text-purple-400">verb</span></p>
        </div>

        <div className="space-y-3">
          {positionExamples.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="font-semibold text-slate-800 text-lg">{item.french}</p>
              <p className="text-slate-500">{item.english}</p>
            </div>
          ))}
        </div>

        <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
          <p className="text-cyan-800 text-sm">
            <span className="font-medium">Remember:</span> This word order is very important. In English, the object often stays after the verb. In French, the pronoun usually moves before it.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function NegationSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="negation" title="Direct Object Pronouns in Negation" icon={FaBan} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          With negation, the pronoun stays close to the verb. The pattern is:
        </p>

        <div className="bg-slate-800 rounded-xl p-5 text-white text-center">
          <p className="text-lg font-medium mb-2">Pattern:</p>
          <p className="text-xl"><span className="text-cyan-400">subject</span> + <span className="text-amber-400">ne</span> + <span className="text-green-400">pronoun</span> + <span className="text-purple-400">verb</span> + <span className="text-amber-400">pas</span></p>
        </div>

        <div className="space-y-3">
          {negativeExamples.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Affirmative</p>
                  <p className="font-medium text-slate-700">{item.affirmative}</p>
                </div>
                <div className="bg-cyan-50 p-3 rounded-lg">
                  <p className="text-xs text-cyan-600 uppercase tracking-wide mb-1">Negative</p>
                  <p className="font-medium text-cyan-700">{item.negative}</p>
                  <p className="text-slate-500 text-sm mt-1">{item.english}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Note:</span> The pronoun stays before the verb, even in negation. Also, <strong>ne</strong> becomes <strong>n'</strong> before a vowel: <em>Je n'aime pas.</em> or <em>Il ne m'écoute pas.</em>
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function PasseComposeSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="passe-compose" title="Direct Object Pronouns in the Passé Composé" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In the passé composé, the direct object pronoun comes <strong>before the auxiliary verb</strong> (avoir or être).
        </p>

        <div className="bg-slate-800 rounded-xl p-5 text-white">
          <p className="text-lg font-medium mb-3">Pattern:</p>
          <div className="space-y-2 text-sm">
            <p><span className="text-cyan-400">subject</span> + <span className="text-green-400">direct object pronoun</span> + <span className="text-purple-400">auxiliary</span> + <span className="text-orange-400">past participle</span></p>
            <p className="text-slate-400 mt-2">In negation:</p>
            <p><span className="text-cyan-400">subject</span> + <span className="text-amber-400">ne</span> + <span className="text-green-400">pronoun</span> + <span className="text-purple-400">auxiliary</span> + <span className="text-amber-400">pas</span> + <span className="text-orange-400">past participle</span></p>
          </div>
        </div>

        <div className="space-y-3">
          {passeComposeExamples.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">Original:</p>
                  <p className="text-slate-600">{item.original}</p>
                </div>
                <FaArrowRight className="text-cyan-500" />
                <div className="flex-1">
                  <p className="text-slate-400 text-sm mb-1">With pronoun:</p>
                  <p className="font-semibold text-cyan-700">{item.replaced}</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm">{item.english}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-blue-800 text-sm mb-2">
            <span className="font-medium">Teaching note:</span> With a direct object pronoun before the past participle, you may notice agreement in writing (like invitée vs invités). At this level, focus mainly on where the pronoun goes. Agreement can be studied in more detail later.
          </p>
          <p className="text-blue-700 text-sm">
            <span className="font-medium">For now:</span> Focus mainly on where the pronoun goes.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

function ExamplesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard id="examples" title="Guided Examples" icon={FaStar} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">Study these examples. Notice how the pronouns are placed before the verb:</p>

        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl border border-cyan-200 p-6">
          <div className="space-y-4">
            {guidedExamples.map((ex, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-200 rounded-full flex items-center justify-center text-cyan-700 font-bold text-sm flex-shrink-0">
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
          <p className="text-slate-700 text-sm">Look for the pattern: <strong>subject + pronoun + verb</strong> or <strong>subject + ne + pronoun + verb + pas</strong>.</p>
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
          <p className="text-amber-800 text-sm">These mistakes are very common. They usually happen because French word order is different from English.</p>
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
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-3xl font-bold mb-4">
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
              <button onClick={handleContinueAnyway} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <span>Continue to Lesson Summary</span>
                <FaArrowRight size={18} />
              </button>
            ) : (
              <>
                <button onClick={handleRetake} className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <FaRedo size={18} />
                  <span>Retake Practice</span>
                </button>
                <button onClick={handleContinueAnyway} className="w-full py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-600 transition-all">
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
            <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full capitalize">{currentQuestion.topic}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-cyan-600 to-teal-600" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
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
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-800'
                      : 'border-slate-200 hover:border-cyan-300 text-slate-700'
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
                        ? 'border-cyan-500 bg-cyan-500'
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
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:shadow-lg'
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
      <div className="bg-gradient-to-r from-cyan-600 to-teal-700 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-1">{isComplete ? 'Lesson Complete!' : 'Complete the Lesson'}</h2>
        <p className="text-cyan-100">{isComplete ? "You've completed A2 Lesson 6." : 'Review all sections and complete the practice to finish.'}</p>
      </div>

      <div className="p-6">
        {isComplete ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">{score}<span className="text-slate-400">/{total}</span></div>
              <div className="text-lg text-slate-600">Practice Score: {percentage}%</div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <p className="text-green-800 font-medium mb-2">You now know how to identify and use direct object pronouns in French.</p>
              <p className="text-green-700 text-sm">You can place them correctly in simple sentences, negation, and the passé composé.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/classes/A2" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                <FaBookOpen size={16} />
                <span>Review Lessons</span>
              </Link>
              <Link href="/classes/A2/lesson7" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:shadow-lg transition-all">
                <span>Continue to Lesson 7</span>
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
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:shadow-lg'
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
