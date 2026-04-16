/**
 * A1 Lesson 5 - French Sentence Structure Page
 * ============================================
 *
 * This page implements A1 Lesson 5, teaching French sentence structure and construction.
 * The lesson covers how to build simple French sentences, including affirmative statements,
 * negative forms, questions, and common patterns.
 *
 * Page Structure:
 * ---------------
 * 1. Header with back navigation and lesson title
 * 2. Progress bar showing lesson completion (sticky)
 * 3. Ten collapsible content sections:
 *    - What is a Sentence? (Introduction)
 *    - Basic French Sentence Order (S+V+C pattern)
 *    - Sentence Parts (Subject, Verb, Complement breakdown)
 *    - Affirmative Sentence Examples
 *    - Adjective Placement Rules
 *    - Negative Sentences (ne...pas)
 *    - Questions (intonation and est-ce-que)
 *    - Common Mistakes to Avoid
 *    - Sentence Patterns (formulas)
 *    - Interactive Practice (14 questions)
 * 4. Completion section with score display
 *
 * State Management:
 * -----------------
 * - reviewedSections: Array of section IDs marked as reviewed
 * - practiceAnswers: User's answers with correctness tracking
 * - practiceCompleted: Whether practice section is complete
 * - lessonCompleted: Whether entire lesson is marked complete
 * - isClient: Hydration flag for localStorage access
 *
 * Key Features:
 * -------------
 * - LocalStorage persistence for progress across sessions
 * - Collapsible sections that auto-mark as reviewed when opened
 * - Interactive practice quiz with randomized feedback
 * - Sticky progress bar showing completion status
 * - Random encouraging feedback messages
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and lifecycle
import { useState, useEffect } from 'react'

// Framer Motion for smooth animations
import { motion, AnimatePresence } from 'framer-motion'

// Font Awesome icons for UI elements
import {
  FaHome,         // Back to lessons link
  FaCheck,        // Completion checkmarks
  FaChevronRight, // Navigation arrows
  FaArrowRight,   // Action buttons
  FaBookOpen,     // Content sections
  FaGraduationCap, // Lesson header
  FaLightbulb,    // Tips and hints
  FaTimes,        // Close/incorrect indicators
  FaRedo,         // Retake practice
  FaChevronDown,  // Expand section
  FaChevronUp     // Collapse section
} from 'react-icons/fa'

// Next.js navigation
import Link from 'next/link'

// Lesson data imports
import {
  sentencePartsExamples,
  affirmativeExamples,
  adjectivePlacementExamples,
  negativeExamples,
  questionExamples,
  commonMistakes,
  sentencePatterns,
  practiceQuestions,
  sectionIds,
  SectionId
} from './data'

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * LessonProgress Interface
 * ------------------------
 * Structure for saving/loading lesson progress from localStorage.
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
 * Randomized feedback messages for practice quiz responses.
 * Shows encouraging messages for both correct and incorrect answers.
 */
const feedbackMessages = {
  correct: ['Nice 😏', 'Good catch', "That's right", "You're getting it", 'Well done!', 'Perfect!'],
  incorrect: ['Careful now…', 'Almost there', 'Keep trying', 'Not quite', 'Review the pattern']
}

/**
 * getRandomFeedback - Returns a random feedback message.
 * @param isCorrect - Whether the answer was correct
 * @returns Random message string from appropriate category
 */
function getRandomFeedback(isCorrect: boolean) {
  const messages = isCorrect ? feedbackMessages.correct : feedbackMessages.incorrect
  return messages[Math.floor(Math.random() * messages.length)]
}

/**
 * A1Lesson5Page - Main component for A1 Lesson 5: French Sentence Structure
 *
 * This component manages the complete lesson flow including:
 * - 10 collapsible content sections
 * - LocalStorage-based progress persistence
 * - Interactive practice quiz with 14 questions
 * - Lesson completion tracking
 */
export default function A1Lesson5Page() {
  // ===========================================================================
  // STATE: Section Review Tracking
  // ===========================================================================

  /**
   * reviewedSections - Array of section IDs the user has opened/reviewed.
   * All 10 sections must be reviewed to enable lesson completion.
   */
  const [reviewedSections, setReviewedSections] = useState<SectionId[]>([])

  // ===========================================================================
  // STATE: Practice Quiz
  // ===========================================================================

  /**
   * practiceAnswers - Array of user's answers to practice questions.
   * Each answer stores the question ID, selected option, and correctness.
   */
  const [practiceAnswers, setPracticeAnswers] = useState<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>([])

  /**
   * practiceCompleted - Whether the user has finished the practice section.
   */
  const [practiceCompleted, setPracticeCompleted] = useState(false)

  // ===========================================================================
  // STATE: Lesson Completion
  // ===========================================================================

  /**
   * lessonCompleted - Whether the entire lesson is marked as complete.
   * Requires all sections reviewed and practice completed.
   */
  const [lessonCompleted, setLessonCompleted] = useState(false)

  /**
   * isClient - Flag to prevent hydration mismatch with localStorage.
   * Set to true after component mounts on client side.
   */
  const [isClient, setIsClient] = useState(false)

  // ===========================================================================
  // EFFECT: Load Progress from LocalStorage
  // ===========================================================================

  /**
   * On mount: Load saved progress from localStorage if available.
   * LocalStorage key: 'a1Lesson5Progress'
   */
  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a1Lesson5Progress')
    if (saved) {
      const parsed: LessonProgress = JSON.parse(saved)
      setReviewedSections(parsed.reviewedSections || [])
      setPracticeAnswers(parsed.practiceAnswers || [])
      setPracticeCompleted(parsed.practiceCompleted || false)
      setLessonCompleted(parsed.lessonCompleted || false)
    }
  }, [])

  // ===========================================================================
  // EFFECT: Save Progress to LocalStorage
  // ===========================================================================

  /**
   * Auto-save progress to localStorage whenever state changes.
   * Only runs on client side (after isClient is true).
   */
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('a1Lesson5Progress', JSON.stringify({
        reviewedSections,
        practiceAnswers,
        practiceCompleted,
        lessonCompleted
      }))
    }
  }, [reviewedSections, practiceAnswers, practiceCompleted, lessonCompleted, isClient])

  // ===========================================================================
  // HANDLERS: Section Review
  // ===========================================================================

  /**
   * markSectionReviewed - Adds a section ID to the reviewed sections list.
   * Called automatically when a section is expanded.
   *
   * @param sectionId - The section identifier to mark as reviewed
   */
  const markSectionReviewed = (sectionId: SectionId) => {
    if (!reviewedSections.includes(sectionId)) {
      setReviewedSections(prev => [...prev, sectionId])
    }
  }

  // ===========================================================================
  // COMPUTED: Progress and Scores
  // ===========================================================================

  /** True when all 10 sections have been reviewed */
  const allSectionsReviewed = sectionIds.every(id => reviewedSections.includes(id))

  /** Count of correct answers from the practice quiz */
  const practiceScore = practiceAnswers.filter(a => a.isCorrect).length

  // ===========================================================================
  // HANDLER: Lesson Completion
  // ===========================================================================

  /**
   * completeLesson - Marks the lesson as complete if all conditions met.
   * Requires all sections reviewed and practice completed.
   */
  const completeLesson = () => {
    if (allSectionsReviewed && practiceCompleted) {
      setLessonCompleted(true)
    }
  }

  // ===========================================================================
  // RENDER: Main Page Layout
  // ===========================================================================
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

        {/* ---------------------------------------------------------------
            HEADER: Lesson title and description
            --------------------------------------------------------------- */}
        <LessonHeader />

        {/* ---------------------------------------------------------------
            PROGRESS BAR: Visual progress indicator (sticky)
            Shows section review count and completion status
            --------------------------------------------------------------- */}
        <ProgressBar reviewedSections={reviewedSections} practiceCompleted={practiceCompleted} />

        {/* ---------------------------------------------------------------
            CONTENT SECTIONS: 10 collapsible lesson sections
            --------------------------------------------------------------- */}
        <div className="space-y-6">
          <WhatIsSentenceSection
            isReviewed={reviewedSections.includes('what-is-sentence')}
            onMarkReviewed={() => markSectionReviewed('what-is-sentence')}
          />

          <BasicOrderSection
            isReviewed={reviewedSections.includes('basic-order')}
            onMarkReviewed={() => markSectionReviewed('basic-order')}
          />

          <SentencePartsSection
            isReviewed={reviewedSections.includes('sentence-parts')}
            onMarkReviewed={() => markSectionReviewed('sentence-parts')}
          />

          <AffirmativeSection
            isReviewed={reviewedSections.includes('affirmative')}
            onMarkReviewed={() => markSectionReviewed('affirmative')}
          />

          <AdjectivesSection
            isReviewed={reviewedSections.includes('adjectives')}
            onMarkReviewed={() => markSectionReviewed('adjectives')}
          />

          <NegativesSection
            isReviewed={reviewedSections.includes('negatives')}
            onMarkReviewed={() => markSectionReviewed('negatives')}
          />

          <QuestionsSection
            isReviewed={reviewedSections.includes('questions')}
            onMarkReviewed={() => markSectionReviewed('questions')}
          />

          <MistakesSection
            isReviewed={reviewedSections.includes('mistakes')}
            onMarkReviewed={() => markSectionReviewed('mistakes')}
          />

          <PatternsSection
            isReviewed={reviewedSections.includes('patterns')}
            onMarkReviewed={() => markSectionReviewed('patterns')}
          />

          <PracticeSection
            isReviewed={reviewedSections.includes('practice')}
            onMarkReviewed={() => markSectionReviewed('practice')}
            practiceAnswers={practiceAnswers}
            setPracticeAnswers={setPracticeAnswers}
            onComplete={() => setPracticeCompleted(true)}
          />

          {/* ---------------------------------------------------------------
              COMPLETION SECTION: Final celebration and summary
              Shows when user completes all sections and practice
              --------------------------------------------------------------- */}
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
 * Features a gradient banner with lesson info and a helper tip.
 */
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
          <span>A1 Lesson 5</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">French Sentence Structure</h1>
        <p className="text-indigo-100 text-lg">
          Learn how French sentences are built and how to make simple statements, negatives, and questions.
        </p>
      </div>

      <div className="p-6 bg-indigo-50 border-t border-indigo-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-indigo-700" size={14} />
          </div>
          <p className="text-indigo-800 text-sm">
            Read the examples, review the patterns, and complete the practice before moving on.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// SUB-COMPONENT: ProgressBar
// =============================================================================

/**
 * ProgressBar - Visual progress indicator for lesson completion.
 *
 * Props:
 * - reviewedSections: Array of reviewed section IDs
 * - practiceCompleted: Whether practice section is complete
 *
 * Features sticky positioning at top of viewport.
 */
function ProgressBar({ reviewedSections, practiceCompleted }: { reviewedSections: SectionId[]; practiceCompleted: boolean }) {
  const totalSections = sectionIds.length
  const completedSections = reviewedSections.length + (practiceCompleted ? 0 : 0)
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

// =============================================================================
// SHARED INTERFACES
// =============================================================================

/**
 * SectionProps Interface
 * ------------------------
 * Common props shared by all lesson section components.
 */
interface SectionProps {
  isReviewed: boolean
  onMarkReviewed: () => void
}

// =============================================================================
// SUB-COMPONENT: SectionCard
// =============================================================================

/**
 * SectionCard - Reusable collapsible card wrapper for lesson sections.
 *
 * Props:
 * - id: Section identifier
 * - title: Section title
 * - icon: Font Awesome icon component
 * - isReviewed: Whether section has been reviewed
 * - onMarkReviewed: Callback when section is marked as reviewed
 * - children: Section content
 * - defaultOpen: Whether section starts expanded
 *
 * Features:
 * - Auto-marks as reviewed when expanded
 * - Animated expand/collapse
 * - Visual review status indicator
 */
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

// =============================================================================
// SECTION COMPONENT: WhatIsSentenceSection
// =============================================================================

/**
 * WhatIsSentenceSection - Introduction to sentences.
 * Explains what sentences are and why structure matters.
 */
function WhatIsSentenceSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="what-is-sentence"
      title="What is a Sentence?"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          A sentence is a group of words that expresses a complete idea. In French, as in English, 
          a sentence often begins with a subject and a verb.
        </p>

        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <h3 className="font-medium text-indigo-900 mb-3">Why sentence structure matters:</h3>
          <ul className="space-y-2 text-indigo-800">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>Good sentence structure helps learners speak and write clearly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>When learners understand sentence patterns, they can build many new sentences more easily.</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['Je parle.', 'Elle est ici.', "Nous allons à l'école."].map((sentence, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <p className="text-lg font-medium text-slate-800 mb-1">{sentence}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SECTION COMPONENT: BasicOrderSection
// =============================================================================

/**
 * BasicOrderSection - Teaches the Subject + Verb + Complement pattern.
 * Visual diagram and examples of basic French sentence order.
 */
function BasicOrderSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="basic-order"
      title="Basic French Sentence Order"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          The most common beginner French sentence pattern is:
        </p>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center">
          <p className="text-xl font-semibold mb-4">Subject + Verb + Complement</p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-medium mb-1">Subject</p>
              <p className="text-indigo-100">who does the action</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-medium mb-1">Verb</p>
              <p className="text-indigo-100">the action or state</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-medium mb-1">Complement</p>
              <p className="text-indigo-100">extra information</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { french: "Je mange une pomme.", english: "I eat an apple." },
            { french: "Tu habites à Paris.", english: "You live in Paris." },
            { french: "Nous parlons français.", english: "We speak French." },
            { french: "Il aime le café.", english: "He likes coffee." }
          ].map((example, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-slate-400 font-medium">{idx + 1}.</span>
              <div>
                <p className="font-medium text-slate-800">{example.french}</p>
                <p className="text-sm text-slate-500">{example.english}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Remember:</span> French word order is often similar to English in simple sentences. 
            At A1 level, learning this core pattern is the most important step.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SECTION COMPONENT: SentencePartsSection
// =============================================================================

/**
 * SentencePartsSection - Breaks down sentences into subject, verb, complement.
 * Uses color-coded visual breakdowns for clarity.
 */
function SentencePartsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="sentence-parts"
      title="Sentence Parts: Subject, Verb, Complement"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Let's break down some sentences to see how the parts fit together:
        </p>

        <div className="space-y-4">
          {sentencePartsExamples.map((example) => (
            <div key={example.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <p className="text-lg font-medium text-slate-800 mb-3">{example.sentence}</p>
              <p className="text-sm text-slate-500 mb-4">{example.english}</p>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-blue-100 rounded-lg p-3 text-center">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">Subject</p>
                  <p className="text-blue-800 font-medium">{example.subject}</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 text-center">
                  <p className="text-xs text-purple-600 font-medium uppercase tracking-wide mb-1">Verb</p>
                  <p className="text-purple-800 font-medium">{example.verb}</p>
                </div>
                <div className="bg-pink-100 rounded-lg p-3 text-center">
                  <p className="text-xs text-pink-600 font-medium uppercase tracking-wide mb-1">Complement</p>
                  <p className="text-pink-800 font-medium">{example.complement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SECTION COMPONENT: AffirmativeSection
// =============================================================================

/**
 * AffirmativeSection - Examples of positive statements.
 * Simple affirmative sentences following the S+V+C pattern.
 */
function AffirmativeSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="affirmative"
      title="Affirmative Sentence Examples"
      icon={FaCheck}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Affirmative sentences say what is true, what someone does, or what someone is. 
          At beginner level, many useful sentences follow this simple structure.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {affirmativeExamples.map((example) => (
            <div key={example.id} className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="font-medium text-slate-800 mb-1">{example.french}</p>
              <p className="text-sm text-slate-500">{example.english}</p>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
          <p className="text-indigo-800 text-sm">
            <span className="font-medium">Tip:</span> These are all positive statements that follow the 
            Subject + Verb + Complement pattern.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SECTION COMPONENT: AdjectivesSection
// =============================================================================

/**
 * AdjectivesSection - Teaches French adjective placement rules.
 * Most adjectives follow the noun, but some common ones precede it.
 */
function AdjectivesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="adjectives"
      title="Adjective Placement in Simple A1 Sentences"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In French, adjectives often come after the noun. But some common adjectives 
          can come before the noun. At A1 level, the most important thing is to notice 
          the pattern, not memorize every exception yet.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {adjectivePlacementExamples.map((example) => (
            <div key={example.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="font-medium text-slate-800 mb-1">{example.french}</p>
              <p className="text-sm text-slate-500 mb-2">{example.english}</p>
              <p className="text-xs text-indigo-600 bg-indigo-50 rounded-lg px-2 py-1">{example.note}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">For now:</span> Focus on reading and noticing the pattern. 
            You will learn adjective placement in more detail later.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SECTION COMPONENT: NegativesSection
// =============================================================================

/**
 * NegativesSection - Teaches negation with ne...pas.
 * Shows affirmative sentences transformed to negative form.
 */
function NegativesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="negatives"
      title="Negative Sentence Structure"
      icon={FaTimes}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In simple French, negation often uses <span className="font-medium text-indigo-600">ne + verb + pas</span>. 
          The negative wraps around the conjugated verb.
        </p>

        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 text-white text-center mb-4">
          <p className="text-lg font-semibold">Subject + ne/n' + Verb + pas + Complement</p>
        </div>

        <div className="space-y-3">
          {negativeExamples.map((example) => (
            <div key={example.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-600 font-medium">{example.affirmative}</span>
                <FaArrowRight className="text-slate-400" size={14} />
                <span className="text-red-600 font-medium">{example.negative}</span>
              </div>
              <p className="text-sm text-slate-500">{example.english}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="font-medium text-slate-800">Important teaching points:</p>
          <ul className="space-y-1 text-slate-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500">•</span>
              <span><span className="font-medium">ne</span> becomes <span className="font-medium">n'</span> before a vowel or silent h</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500">•</span>
              <span><span className="font-medium">pas</span> usually comes after the conjugated verb</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500">•</span>
              <span>In beginner French, this pattern is one of the most important sentence changes to learn</span>
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SECTION COMPONENT: QuestionsSection
// =============================================================================

/**
 * QuestionsSection - Teaches two question formation methods:
 * - Intonation questions (rising tone)
 * - Est-ce-que questions (question marker)
 */
function QuestionsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="questions"
      title="Simple Question Structures"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          At A1 level, learners should focus on these two simple yes/no question patterns:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-3">1. Intonation</h3>
            <p className="text-sm text-purple-600 mb-3">Rise your voice at the end of a statement.</p>
            <div className="space-y-2">
              <p className="font-medium text-slate-800">Tu parles français ?</p>
              <p className="font-medium text-slate-800">Elle est ici ?</p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-200">
            <h3 className="font-semibold text-indigo-800 mb-3">2. Est-ce que</h3>
            <p className="text-sm text-indigo-600 mb-3">Add "Est-ce que" at the beginning.</p>
            <div className="space-y-2">
              <p className="font-medium text-slate-800">Est-ce que tu parles français ?</p>
              <p className="font-medium text-slate-800">Est-ce qu'il habite à Paris ?</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {questionExamples.map((example) => (
            <div key={example.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  example.type === 'intonation' ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {example.type === 'intonation' ? 'Intonation' : "Est-ce que"}
                </span>
              </div>
              <p className="font-medium text-slate-800">{example.french}</p>
              <p className="text-sm text-slate-500">{example.english}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            <span className="font-medium">Remember:</span> Both patterns are useful. At beginner level, 
            est-ce que is a very clear and safe question structure. You do not need to learn 
            inversion in detail yet.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SECTION COMPONENT: MistakesSection
// =============================================================================

/**
 * MistakesSection - Common beginner errors with corrections.
 * Helps learners avoid typical word order and grammar mistakes.
 */
function MistakesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="mistakes"
      title="Common Beginner Mistakes"
      icon={FaTimes}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-amber-800 text-sm">
            These mistakes are normal. You are learning a new pattern. Noticing mistakes is part of learning.
          </p>
        </div>

        <div className="space-y-4">
          {commonMistakes.map((mistake) => (
            <div key={mistake.id} className="bg-red-50 rounded-xl p-5 border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <FaTimes className="text-red-500" />
                <span className="text-red-600 font-medium line-through">{mistake.wrong}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <FaCheck className="text-green-500" />
                <span className="text-green-700 font-medium">{mistake.correct}</span>
              </div>
              <p className="text-sm text-slate-600 mt-2">{mistake.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SECTION COMPONENT: PatternsSection
// =============================================================================

/**
 * PatternsSection - Structural formulas for sentence construction.
 * Visual patterns for statements, negatives, and questions.
 */
function PatternsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="patterns"
      title="Sentence Pattern Summary"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Here's a quick-reference guide to the most important beginner patterns:
        </p>

        <div className="grid grid-cols-1 gap-3">
          {sentencePatterns.map((pattern) => (
            <div key={pattern.id} className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-800">{pattern.label}</h3>
                <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">Pattern {pattern.id}</span>
              </div>
              <p className="text-sm font-medium text-indigo-700 mb-2">{pattern.pattern}</p>
              <p className="text-sm text-slate-600">Example: <span className="font-medium text-slate-800">{pattern.example}</span></p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}

// =============================================================================
// SECTION COMPONENT: PracticeSection
// =============================================================================

/**
 * PracticeSection - Interactive 14-question quiz.
 *
 * Props:
 * - isReviewed: Whether practice section has been opened
 * - onMarkReviewed: Callback when section is reviewed
 * - practiceAnswers: User's answer history
 * - setPracticeAnswers: State setter for answers
 * - onComplete: Callback when all questions answered
 *
 * Features:
 * - Multiple choice questions by topic
 * - Immediate feedback with randomized messages
 * - Score tracking and progress display
 */
function PracticeSection({
  isReviewed,
  onMarkReviewed,
  practiceAnswers,
  setPracticeAnswers,
  onComplete
}: {
  isReviewed: boolean
  onMarkReviewed: () => void
  practiceAnswers: { questionId: number; selectedOption: number; isCorrect: boolean }[]
  setPracticeAnswers: React.Dispatch<React.SetStateAction<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>>
  onComplete: () => void
}) {
  // State for current question tracking
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showResults, setShowResults] = useState(false)

  // Derived values for current question and progress
  const currentQuestion = practiceQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === practiceQuestions.length - 1
  const score = practiceAnswers.filter(a => a.isCorrect).length
  const total = practiceQuestions.length
  const percentage = Math.round((score / total) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 80) {
      return {
        title: "Great work! 🎉",
        message: "You've shown a strong understanding of French sentence structure. You're ready to move forward with confidence!",
        tone: "high",
        color: "green"
      }
    } else if (percentage >= 60) {
      return {
        title: "Good progress! 👍",
        message: "You're getting the hang of it. A little more practice will help these patterns feel natural.",
        tone: "medium",
        color: "blue"
      }
    } else if (percentage >= 40) {
      return {
        title: "Keep going! 💪",
        message: "Learning sentence structure takes time. You can retake this practice or continue to review the lesson material.",
        tone: "low",
        color: "amber"
      }
    } else {
      return {
        title: "You're learning! 🌱",
        message: "Don't worry — French sentence structure is new, and every attempt helps. Feel free to retake this practice or review the lesson sections again.",
        tone: "very-low",
        color: "indigo"
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
            performance.color === 'amber' ? 'bg-amber-50 border-amber-200' :
            'bg-indigo-50 border-indigo-200'
          }`}>
            <h3 className={`text-xl font-bold mb-3 ${
              performance.color === 'green' ? 'text-green-700' :
              performance.color === 'blue' ? 'text-blue-700' :
              performance.color === 'amber' ? 'text-amber-700' :
              'text-indigo-700'
            }`}>
              {performance.title}
            </h3>
            <p className="text-slate-700 leading-relaxed">{performance.message}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {performance.tone === 'high' || performance.tone === 'medium' ? (
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
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              currentQuestion.topic === 'sentence-order' ? 'bg-blue-100 text-blue-700' :
              currentQuestion.topic === 'affirmative' ? 'bg-green-100 text-green-700' :
              currentQuestion.topic === 'negative' ? 'bg-red-100 text-red-700' :
              currentQuestion.topic === 'questions' ? 'bg-purple-100 text-purple-700' :
              'bg-amber-100 text-amber-700'
            }`}>
              {currentQuestion.topic.replace('-', ' ')}
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

// =============================================================================
// SUB-COMPONENT: CompletionSection
// =============================================================================

/**
 * CompletionSection - Final celebration card with lesson summary.
 *
 * Props:
 * - isComplete: Whether lesson is marked complete
 * - canComplete: Whether completion requirements are met
 * - score: Number of correct practice answers
 * - total: Total number of practice questions
 * - onComplete: Callback to mark lesson as complete
 *
 * Shows score, feedback, and completion button when ready.
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
            ? "Nice work — you've completed A1 Lesson 5."
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
              <p className="text-green-800 font-medium mb-2">You now understand the basic structure of simple French sentences.</p>
              <p className="text-green-700 text-sm">This will help you read, write, and speak with more confidence.</p>
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
                href="/classes/A1/lesson6"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all"
              >
                <span>Continue to Lesson 6</span>
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

