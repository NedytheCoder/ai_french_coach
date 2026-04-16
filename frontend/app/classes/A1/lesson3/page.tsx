/**
 * A1 Lesson 3 - Essential French Verbs and Present Tense Page
 * ===========================================================
 *
 * This page implements A1 Lesson 3 covering 10 essential French verbs and
 * their present tense conjugations. The lesson is organized into 6 sections:
 *
 * - Section 1: What is a Verb? (Introduction to verbs and conjugation)
 * - Section 2: The 10 Core A1 Verbs (3 core + 7 regular verbs with audio)
 * - Section 3: Spotlight (Why être, avoir, and aller are essential)
 * - Section 4: What is Conjugation? (How verbs change with subjects)
 * - Section 5: Present Tense Conjugation (Complete conjugation tables for all 10 verbs)
 * - Section 6: Pattern Notes (Regular vs irregular verb patterns)
 *
 * Features:
 * ---------
 * - Interactive audio playback for all 10 verbs
 * - Color-coded verb cards (amber for core verbs, gray for regular)
 * - Complete conjugation tables for all 10 verbs with irregular highlighting
 * - Subject pronoun reference guide
 * - 12 practice questions with immediate feedback
 * - Progress tracking with localStorage persistence
 * - Section review system with visual indicators
 *
 * State Management:
 * -----------------
 * - playCounts: Audio play frequency per verb
 * - currentlyPlaying: Currently active audio element
 * - reviewedSections: 6 sections review status
 * - currentPracticeIndex: Current practice question (0-11)
 * - practiceAnswers: User's answer history
 * - selectedOption: Currently selected answer choice
 * - showFeedback: Whether to display answer feedback
 * - isClient: Hydration flag for Next.js
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import { useState, useRef, useEffect } from 'react'

// Framer Motion for smooth animations and transitions
import { motion, AnimatePresence } from 'framer-motion'

// React Icons for visual elements
import { FaPlay, FaCheck, FaArrowRight, FaHome, FaChevronRight, FaStar, FaBookOpen } from 'react-icons/fa'

// Next.js Link for client-side navigation
import Link from 'next/link'

// Lesson data: verbs, conjugations, pronouns, and practice questions
import { verbs, conjugations, subjectPronouns, practiceQuestions, Verb, Conjugation } from './data'

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * SectionReview Interface
 * -----------------------
 * Tracks which of the 6 lesson sections have been reviewed by the user.
 * All sections must be reviewed before completing the lesson.
 */
interface SectionReview {
  intro: boolean       // Section 1: What is a Verb?
  verbs: boolean       // Section 2: The 10 Core A1 Verbs
  spotlight: boolean   // Section 3: Spotlight on être, avoir, aller
  conjugation: boolean // Section 4: What is Conjugation?
  tables: boolean      // Section 5: Present Tense Conjugation Tables
  patterns: boolean    // Section 6: Pattern Notes
}

/**
 * PracticeAnswer Interface
 * ------------------------
 * Records a user's answer to a practice question.
 */
interface PracticeAnswer {
  questionId: number      // ID of the question answered
  selectedOption: number  // Index of selected answer (0, 1, or 2)
  isCorrect: boolean      // Whether the answer was correct
}

/**
 * A1Lesson3Page Component
 * -----------------------
 * Main lesson page component for A1 Lesson 3.
 * Manages verb vocabulary learning with audio, conjugation tables, and practice.
 */
export default function A1Lesson3Page() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // playCounts: Maps verb IDs to number of times audio has been played
  const [playCounts, setPlayCounts] = useState<{[key: string]: number}>({})

  // currentlyPlaying: ID of the currently playing audio verb (null if none)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  // reviewedSections: Tracks which of the 6 content sections user has reviewed
  const [reviewedSections, setReviewedSections] = useState<SectionReview>({
    intro: false,
    verbs: false,
    spotlight: false,
    conjugation: false,
    tables: false,
    patterns: false
  })

  // currentPracticeIndex: Current question number in practice sequence (0-indexed)
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)

  // practiceAnswers: Array of user's answers to practice questions
  const [practiceAnswers, setPracticeAnswers] = useState<PracticeAnswer[]>([])

  // selectedOption: Currently selected answer option index (null = none selected)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  // showFeedback: Whether to show answer feedback (true after submitting)
  const [showFeedback, setShowFeedback] = useState(false)

  // isClient: Prevents hydration mismatch in Next.js
  const [isClient, setIsClient] = useState(false)

  // audioRef: Reference to the currently playing audio element for cleanup
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Load saved progress from localStorage on component mount.
   * Restores user's previous progress if they return to the lesson.
   */
  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a1Lesson3Progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      setReviewedSections(parsed.reviewedSections || { intro: false, verbs: false, spotlight: false, conjugation: false, tables: false, patterns: false })
      setPracticeAnswers(parsed.practiceAnswers || [])
      setCurrentPracticeIndex(parsed.currentPracticeIndex || 0)
    }
  }, [])

  /**
   * Save progress to localStorage whenever state changes.
   * Only runs on client side to prevent SSR issues.
   */
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('a1Lesson3Progress', JSON.stringify({
        reviewedSections,
        practiceAnswers,
        currentPracticeIndex
      }))
    }
  }, [reviewedSections, practiceAnswers, currentPracticeIndex, isClient])

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  /**
   * playAudio - Plays pronunciation audio for a verb
   * @param audioSrc - URL path to the audio file
   * @param id - Unique identifier for the verb being played
   */
  const playAudio = (audioSrc: string, id: string) => {
    // Stop any existing audio before starting new one
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    // Create and play new audio element
    const audio = new Audio(audioSrc)
    audioRef.current = audio
    setCurrentlyPlaying(id)

    // Handle playback errors gracefully
    audio.play().catch(() => {
      console.log('Audio playback failed for:', id)
    })

    // When audio ends: clear playing state and increment play count
    audio.onended = () => {
      setCurrentlyPlaying(null)
      setPlayCounts(prev => ({
        ...prev,
        [id]: (prev[id] || 0) + 1
      }))
    }
  }

  /**
   * markSectionReviewed - Marks a lesson section as reviewed
   * @param section - Key of the section to mark
   */
  const markSectionReviewed = (section: keyof SectionReview) => {
    setReviewedSections(prev => ({ ...prev, [section]: true }))
  }

  /**
   * handlePracticeAnswer - Handles user selecting an answer option
   * @param optionIndex - Index of the selected option
   */
  const handlePracticeAnswer = (optionIndex: number) => {
    if (showFeedback) return  // Prevent changing answer after submission
    setSelectedOption(optionIndex)
  }

  /**
   * submitAnswer - Submits the selected answer and shows feedback
   */
  const submitAnswer = () => {
    if (selectedOption === null) return  // Require selection before submitting

    const currentQuestion = practiceQuestions[currentPracticeIndex]
    const isCorrect = selectedOption === currentQuestion.correct

    // Record the answer in practice history
    setPracticeAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect
    }])
    setShowFeedback(true)  // Show correct/incorrect feedback
  }

  /**
   * nextQuestion - Advances to the next practice question
   */
  const nextQuestion = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    setCurrentPracticeIndex(prev => prev + 1)
  }

  // ============================================================================
  // DERIVED STATE
  // ============================================================================

  // Check if all 6 content sections have been reviewed
  const allSectionsReviewed = Object.values(reviewedSections).every(v => v)

  // Check if all 12 practice questions have been answered
  const practiceComplete = practiceAnswers.length === practiceQuestions.length

  // Count of correctly answered practice questions
  const correctAnswers = practiceAnswers.filter(a => a.isCorrect).length

  // Lesson is complete only when all sections reviewed AND all practice done
  const lessonComplete = allSectionsReviewed && practiceComplete

  // Separate core verbs (être, avoir, aller) from regular verbs
  const coreVerbs = verbs.filter(v => v.importance === 'high')
  const regularVerbs = verbs.filter(v => v.importance === 'normal')

  // ============================================================================
  // RENDER - JSX STRUCTURE
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ----------------------------------------------------------
            NAVIGATION: Back link to A1 lessons page
            ---------------------------------------------------------- */}
        <div className="mb-6">
          <Link
            href="/classes/A1"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
          >
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A1 Lessons</span>
          </Link>
        </div>

        {/* ----------------------------------------------------------
            HEADER: Lesson title and description
            ---------------------------------------------------------- */}
        <LessonHeader />

        {/* ----------------------------------------------------------
            PROGRESS BAR: Visual progress indicator
            ---------------------------------------------------------- */}
        <ProgressBar 
          reviewedSections={reviewedSections}
          practiceProgress={practiceAnswers.length}
          totalPractice={practiceQuestions.length}
        />

        {/* ----------------------------------------------------------
            SECTION 1: Introduction - What is a Verb?
            - Defines verbs and conjugation concepts
            - Shows example sentences
            ---------------------------------------------------------- */}
        <SectionCard
          title="What is a Verb?"
          subtitle="Understanding French verbs and conjugation"
          icon="📚"
          isReviewed={reviewedSections.intro}
          onMarkReviewed={() => markSectionReviewed('intro')}
          index={0}
        >
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>A <strong>verb</strong> is a word that shows an action or a state.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>In French, verbs <strong>change</strong> depending on who is doing the action.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>This change is called <strong>conjugation</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>Learning a few important verbs early helps you understand and build many sentences.</span>
              </li>
            </ul>
            <div className="mt-6 bg-white rounded-lg p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3">Examples:</h4>
              <div className="space-y-2 text-slate-600">
                <p><span className="font-medium text-purple-600">Je parle.</span> = I speak.</p>
                <p><span className="font-medium text-purple-600">Il est ici.</span> = He is here.</p>
                <p><span className="font-medium text-purple-600">Nous allons à l'école.</span> = We are going to school.</p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 2: The 10 Core A1 Verbs
            - 3 core verbs (être, avoir, aller) with star badge
            - 7 regular verbs with audio and examples
            ---------------------------------------------------------- */}
        <SectionCard
          title="The 10 Core A1 Verbs"
          subtitle="Essential verbs for everyday French"
          icon="💬"
          isReviewed={reviewedSections.verbs}
          onMarkReviewed={() => markSectionReviewed('verbs')}
          index={1}
        >
          {/* Core Verbs - The 3 most important (être, avoir, aller) */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <FaStar className="text-amber-500" />
              Core Verbs (Most Important)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coreVerbs.map((verb, idx) => (
                <VerbCard
                  key={verb.id}
                  verb={verb}
                  playCount={playCounts[verb.id] || 0}
                  isPlaying={currentlyPlaying === verb.id}
                  onPlay={() => playAudio(verb.audioSrc, verb.id)}
                  index={idx}
                />
              ))}
            </div>
          </div>

          {/* Regular Verbs - The other 7 verbs */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Other Important Verbs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {regularVerbs.map((verb, idx) => (
                <VerbCard
                  key={verb.id}
                  verb={verb}
                  playCount={playCounts[verb.id] || 0}
                  isPlaying={currentlyPlaying === verb.id}
                  onPlay={() => playAudio(verb.audioSrc, verb.id)}
                  index={idx + 3}
                />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 3: Spotlight on Core Verbs
            - Explains why être, avoir, aller are essential
            - Shows usage examples for each
            ---------------------------------------------------------- */}
        <SectionCard
          title="Spotlight: être, avoir, aller"
          subtitle="Why these three verbs matter so much"
          icon="⭐"
          isReviewed={reviewedSections.spotlight}
          onMarkReviewed={() => markSectionReviewed('spotlight')}
          index={2}
        >
          <CoreVerbSpotlight />
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 4: What is Conjugation?
            - Explains the concept of verb conjugation
            - Shows conjugation examples
            ---------------------------------------------------------- */}
        <SectionCard
          title="What is Conjugation?"
          subtitle="How verbs change in French"
          icon="🔄"
          isReviewed={reviewedSections.conjugation}
          onMarkReviewed={() => markSectionReviewed('conjugation')}
          index={3}
        >
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl">•</span>
                <span><strong>Conjugation</strong> means changing the verb form depending on the subject.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl">•</span>
                <span>In English, this also happens a little: <em>I speak</em> / <em>he speaks</em></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl">•</span>
                <span>In French, verbs change more often:</span>
              </li>
            </ul>
            <div className="mt-4 bg-white rounded-lg p-4 border border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-slate-800">je parle</p>
                  <p className="text-sm text-slate-500">I speak</p>
                </div>
                <div>
                  <p className="font-medium text-slate-800">tu parles</p>
                  <p className="text-sm text-slate-500">you speak</p>
                </div>
                <div>
                  <p className="font-medium text-slate-800">il parle</p>
                  <p className="text-sm text-slate-500">he speaks</p>
                </div>
                <div>
                  <p className="font-medium text-slate-800">nous parlons</p>
                  <p className="text-sm text-slate-500">we speak</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-slate-600">The subject pronoun and verb form work together.</p>
          </div>
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 5: Present Tense Conjugation Tables
            - Subject pronoun reference guide
            - Complete conjugation tables for all 10 verbs
            - Irregular verbs highlighted in amber
            ---------------------------------------------------------- */}
        <SectionCard
          title="Present Tense Conjugation"
          subtitle="How to conjugate all 10 verbs in the present tense"
          icon="📊"
          isReviewed={reviewedSections.tables}
          onMarkReviewed={() => markSectionReviewed('tables')}
          index={4}
        >
          {/* Subject Pronouns Reference - Quick lookup guide */}
          <div className="mb-6 bg-slate-100 rounded-xl p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Subject Pronouns</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {subjectPronouns.map((pronoun, idx) => (
                <div key={idx} className="bg-white rounded-lg p-2 border border-slate-200">
                  <span className="font-medium text-purple-600">{pronoun.french}</span>
                  <span className="text-slate-500"> = {pronoun.english}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conjugation Tables - All 10 verbs in 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {conjugations.map((conj, idx) => (
              <ConjugationTable
                key={conj.verb}
                conjugation={conj}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 6: Pattern Notes
            - Regular vs irregular verb patterns
            - Special case explanation for manger
            ---------------------------------------------------------- */}
        <SectionCard
          title="Pattern Notes"
          subtitle="Recognizing regular and irregular verbs"
          icon="📝"
          isReviewed={reviewedSections.patterns}
          onMarkReviewed={() => markSectionReviewed('patterns')}
          index={5}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <FaBookOpen />
                Regular -er Verbs
              </h4>
              <p className="text-sm text-slate-600 mb-3">Many common verbs follow similar patterns:</p>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="font-medium text-slate-700">Pattern: e, es, e, ons, ez, ent</p>
                <p className="text-sm text-slate-500 mt-1">parler, aimer, habiter, travailler, étudier</p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <FaStar />
                Irregular Verbs
              </h4>
              <p className="text-sm text-slate-600 mb-3">These must be memorized:</p>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="font-medium text-slate-700">être, avoir, aller, faire</p>
                <p className="text-sm text-slate-500 mt-1">Each has unique forms</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-purple-50 rounded-xl p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">💡 Special Case: manger</h4>
            <p className="text-sm text-slate-600">
              <strong>Manger</strong> is mostly regular, but has a special <em>nous</em> form: <strong>nous mangeons</strong>
              (to keep the soft 'g' sound). Compare: <em>nous parlons</em> vs <em>nous mangeons</em>.
            </p>
          </div>
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 7: Practice Questions
            - 12 multiple-choice questions
            - Topics: meaning, conjugation, patterns, core verbs
            ---------------------------------------------------------- */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <span className="text-2xl">✏️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Practice Time</h2>
              <p className="text-sm text-slate-600">Test your understanding with 12 questions</p>
            </div>
          </div>

          {/* Show current question or completion card */}
          {currentPracticeIndex < practiceQuestions.length ? (
            <PracticeCard
              question={practiceQuestions[currentPracticeIndex]}
              questionNumber={currentPracticeIndex + 1}
              totalQuestions={practiceQuestions.length}
              selectedOption={selectedOption}
              showFeedback={showFeedback}
              onSelectOption={handlePracticeAnswer}
              onSubmit={submitAnswer}
              onNext={nextQuestion}
            />
          ) : (
            <PracticeCompleteCard 
              score={correctAnswers}
              total={practiceQuestions.length}
            />
          )}
        </div>

        {/* ----------------------------------------------------------
            LESSON COMPLETION: Celebration card shown when lesson is complete
            - Displays success message and final score
            - Shows only when all sections reviewed AND practice complete
            ---------------------------------------------------------- */}
        <AnimatePresence>
          {lessonComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8 text-center"
            >
              {/* Success icon */}
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaCheck className="text-white text-3xl" />
              </div>
              {/* Completion message */}
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Nice work — you've completed A1 Lesson 3!
              </h2>
              <p className="text-slate-600 mb-4">
                You now know 10 essential French verbs and how they work in the present tense.
              </p>
              <p className="text-sm text-slate-500 mb-6">
                The more comfortable you become with être, avoir, and aller, the easier later lessons will feel.
              </p>
              {/* Final practice score */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{correctAnswers}/12</div>
                  <div className="text-sm text-slate-500">Practice Score</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ----------------------------------------------------------
          STICKY FOOTER: Fixed navigation bar at bottom of viewport
          - Shows progress status (green when complete, amber when in progress)
          - Continue button links to next lesson when lesson is complete
          ---------------------------------------------------------- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Progress status indicator */}
          <div className="flex items-center gap-3">
            {lessonComplete ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600">Lesson complete! Ready to continue.</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-600">
                  {!allSectionsReviewed
                    ? 'Review all sections to continue'
                    : 'Complete all practice questions to continue'}
                </span>
              </>
            )}
          </div>
          {/* Continue button - disabled until lesson is complete */}
          <button
            disabled={!lessonComplete}
            onClick={() => window.location.href = '/classes/A1/lesson4'}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              lessonComplete
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * LessonHeader Component
 * ----------------------
 * Displays the lesson title, level badge, and description.
 * Explains the focus on essential verbs and present tense conjugation.
 */
function LessonHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      {/* Level badge with gradient background */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
        <span>A1 Lesson 3</span>
      </div>
      {/* Main lesson title */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        Essential French Verbs and Present Tense
      </h1>
      {/* Lesson description */}
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        Learn 10 important French verbs, understand why some are used all the time, and see how they change in the present tense.
      </p>
      {/* Instructions */}
      <p className="text-sm text-slate-500">
        Read the explanations, listen to the verbs, review the conjugation tables, and complete the practice before moving on.
      </p>
    </motion.div>
  )
}

/**
 * ProgressBar Component
 * ---------------------
 * Displays overall lesson progress including:
 * - Number of reviewed sections (6 total)
 * - Number of completed practice questions (12 total)
 * - Animated progress bar showing percentage complete
 *
 * Progress calculation: (reviewedSections + practiceProgress) / 7 * 100
 * (6 sections + 1 practice section = 7 total progress units)
 */
function ProgressBar({ 
  reviewedSections, 
  practiceProgress, 
  totalPractice 
}: { 
  reviewedSections: SectionReview
  practiceProgress: number
  totalPractice: number
}) {
  // List of section keys for counting completed sections
  const sections = ['intro', 'verbs', 'spotlight', 'conjugation', 'tables', 'patterns'] as const
  const completedSections = sections.filter(s => reviewedSections[s]).length
  
  // Calculate total progress percentage (6 sections + 1 practice = 7 units)
  const totalProgress = ((completedSections + practiceProgress / totalPractice) / 7) * 100

  return (
    <div className="mb-8 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      {/* Header: Label and percentage */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">Lesson Progress</span>
        <span className="text-sm font-medium text-purple-600">{Math.round(totalProgress)}%</span>
      </div>
      {/* Animated progress bar */}
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${totalProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {/* Footer: Detailed counts */}
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
        <span>{completedSections}/6 sections reviewed</span>
        <span>•</span>
        <span>{practiceProgress}/{totalPractice} practice questions</span>
      </div>
    </div>
  )
}

/**
 * SectionCard Component
 * ---------------------
 * Container component for lesson content sections.
 * Features:
 * - Color-coded header based on section index (6 different colors)
 * - "Mark as Reviewed" toggle button
 * - Animated entrance with stagger delay
 * - White card with border styling
 */
function SectionCard({ 
  title, 
  subtitle, 
  icon, 
  isReviewed, 
  onMarkReviewed, 
  index, 
  children 
}: {
  title: string
  subtitle: string
  icon: string
  isReviewed: boolean
  onMarkReviewed: () => void
  index: number
  children: React.ReactNode
}) {
  // Gradient colors for each section index
  const colors = [
    'from-purple-500 to-pink-500',    // Section 0: Intro
    'from-blue-500 to-cyan-500',      // Section 1: Core Verbs
    'from-amber-500 to-orange-500',     // Section 2: Spotlight
    'from-emerald-500 to-teal-500',   // Section 3: Conjugation
    'from-rose-500 to-pink-500',      // Section 4: Tables
    'from-indigo-500 to-purple-500'   // Section 5: Patterns
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}  // Stagger animation by index
      className="mb-8"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Section Header: Icon, title, subtitle, and review button */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Gradient icon container */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center text-white shadow-md`}>
                <span className="text-2xl">{icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                <p className="text-sm text-slate-600">{subtitle}</p>
              </div>
            </div>
            {/* Review toggle button */}
            <button
              onClick={onMarkReviewed}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isReviewed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {isReviewed ? (
                <><FaCheck size={14} /> Reviewed</>
              ) : (
                <><FaCheck size={14} /> Mark as Reviewed</>
              )}
            </button>
          </div>
        </div>
        {/* Section Content: Render children (verb cards, tables, etc.) */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * VerbCard Component
 * ------------------
 * Card displaying a French verb with its details.
 * Features:
 * - Color-coded by importance (amber for core verbs, gray for regular)
 * - "Core verb" badge for high-importance verbs (être, avoir, aller)
 * - Audio play button with loading state
 * - Phonetic pronunciation guide
 * - Example sentence with translation
 */
function VerbCard({ verb, playCount, isPlaying, onPlay, index }: {
  verb: Verb
  playCount: number
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  // Determine if this is a core verb (être, avoir, aller) for special styling
  const isCore = verb.importance === 'high'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}  // Stagger animation
      className={`rounded-xl p-4 border-2 transition-all hover:shadow-md ${
        isCore 
          ? 'bg-amber-50 border-amber-200 hover:border-amber-300'   // Amber for core verbs
          : 'bg-slate-50 border-slate-200 hover:border-purple-300'  // Gray for regular verbs
      }`}
    >
      {/* Header: Infinitive, core verb badge, and play button */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Verb infinitive (dictionary form) */}
          <h3 className={`text-xl font-bold ${isCore ? 'text-amber-700' : 'text-slate-800'}`}>
            {verb.infinitive}
          </h3>
          {/* Core verb badge for être, avoir, aller */}
          {isCore && (
            <span className="text-xs px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full font-medium">
              Core verb
            </span>
          )}
        </div>
        {/* Audio play button */}
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${verb.infinitive}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying
              ? 'bg-white text-purple-600 animate-pulse'
              : 'bg-white text-slate-600 hover:text-purple-600 shadow-sm'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
      {/* Phonetic pronunciation and English translation */}
      <p className="text-sm text-purple-600 font-medium mb-1">/{verb.phonetic}/</p>
      <p className="text-sm text-slate-600 mb-2">{verb.english}</p>
      {/* Example sentence with translation */}
      <div className="text-sm text-slate-500 bg-white rounded-lg p-2 border border-slate-100">
        <span className="font-medium text-slate-700">{verb.example}</span>
        <span className="text-slate-400"> — {verb.exampleEnglish}</span>
      </div>
    </motion.div>
  )
}

/**
 * CoreVerbSpotlight Component
 * ---------------------------
 * Detailed explanation of why être, avoir, and aller are essential verbs.
 * Features:
 * - Importance message explaining why these verbs matter at all levels
 * - Three-column grid with color-coded cards for each verb
 * - Usage explanations and example sentences for each verb
 */
function CoreVerbSpotlight() {
  return (
    <div className="space-y-6">
      {/* Importance Message - Why these verbs are essential */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 border-2 border-amber-300">
        <div className="flex items-center gap-2 mb-3">
          <FaStar className="text-amber-600" size={24} />
          <h3 className="text-lg font-bold text-amber-800">Why These Three Verbs Are Essential</h3>
        </div>
        <ul className="space-y-2 text-amber-900">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>These three verbs appear <strong>all the time</strong> in French</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>You will use them in beginner lessons, intermediate lessons, and even advanced French</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>If you learn these well now, many future topics become easier</span>
          </li>
        </ul>
      </div>

      {/* Individual Verb Explanations - Color-coded by verb */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* être (to be) - Purple card */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h4 className="text-2xl font-bold text-purple-700 mb-2">être</h4>
          <p className="text-sm text-slate-600 mb-3">Used to say what someone is, how they are, where they are</p>
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-lg p-2 border border-slate-200">
              <p className="font-medium text-slate-700">Je suis fatigué.</p>
              <p className="text-slate-500">I am tired.</p>
            </div>
            <div className="bg-white rounded-lg p-2 border border-slate-200">
              <p className="font-medium text-slate-700">Il est professeur.</p>
              <p className="text-slate-500">He is a teacher.</p>
            </div>
          </div>
        </div>

        {/* avoir (to have) - Blue card */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h4 className="text-2xl font-bold text-blue-700 mb-2">avoir</h4>
          <p className="text-sm text-slate-600 mb-3">Used to say what someone has, age, and common expressions</p>
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-lg p-2 border border-slate-200">
              <p className="font-medium text-slate-700">J'ai vingt ans.</p>
              <p className="text-slate-500">I am twenty years old.</p>
            </div>
            <div className="bg-white rounded-lg p-2 border border-slate-200">
              <p className="font-medium text-slate-700">Tu as faim?</p>
              <p className="text-slate-500">Are you hungry?</p>
            </div>
          </div>
        </div>

        {/* aller (to go) - Green card */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h4 className="text-2xl font-bold text-green-700 mb-2">aller</h4>
          <p className="text-sm text-slate-600 mb-3">Used for movement and the near future</p>
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-lg p-2 border border-slate-200">
              <p className="font-medium text-slate-700">Nous allons partir.</p>
              <p className="text-slate-500">We are going to leave.</p>
            </div>
            <div className="bg-white rounded-lg p-2 border border-slate-200">
              <p className="font-medium text-slate-700">Je vais à Paris.</p>
              <p className="text-slate-500">I am going to Paris.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * ConjugationTable Component
 * --------------------------
 * Displays a complete present tense conjugation table for a single verb.
 * Features:
 * - 2x3 grid showing all 6 subject pronoun forms
 * - Irregular verb highlighting (amber background and badge)
 * - Header with verb name and English translation
 *
 * Irregular verbs: être, avoir, aller, faire
 */
function ConjugationTable({ conjugation, index }: {
  conjugation: Conjugation
  index: number
}) {
  // Check if this verb is irregular (requires special highlighting)
  const isIrregular = ['être', 'avoir', 'aller', 'faire'].includes(conjugation.verb)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}  // Stagger animation
      className={`rounded-xl border-2 overflow-hidden ${
        isIrregular 
          ? 'bg-amber-50 border-amber-200'   // Amber styling for irregular verbs
          : 'bg-slate-50 border-slate-200'   // Gray styling for regular verbs
      }`}
    >
      {/* Table Header: Verb name, translation, and irregular badge */}
      <div className={`p-3 border-b ${
        isIrregular 
          ? 'bg-amber-100 border-amber-200' 
          : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            {/* Verb infinitive with color based on irregular status */}
            <h4 className={`text-lg font-bold ${isIrregular ? 'text-amber-800' : 'text-slate-800'}`}>
              {conjugation.verb}
            </h4>
            <p className="text-xs text-slate-500">{conjugation.english}</p>
          </div>
          {/* Irregular badge for être, avoir, aller, faire */}
          {isIrregular && (
            <span className="text-xs px-2 py-1 bg-amber-200 text-amber-800 rounded-full font-medium">
              Irregular
            </span>
          )}
        </div>
      </div>
      {/* Conjugation Forms Grid - 2 columns x 3 rows */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {/* Row 1: je and tu */}
          <div className="flex justify-between bg-white rounded p-1.5 border border-slate-100">
            <span className="text-slate-500">je</span>
            <span className="font-medium text-slate-800">{conjugation.forms.je}</span>
          </div>
          <div className="flex justify-between bg-white rounded p-1.5 border border-slate-100">
            <span className="text-slate-500">tu</span>
            <span className="font-medium text-slate-800">{conjugation.forms.tu}</span>
          </div>
          {/* Row 2: il/elle and nous */}
          <div className="flex justify-between bg-white rounded p-1.5 border border-slate-100">
            <span className="text-slate-500">il/elle</span>
            <span className="font-medium text-slate-800">{conjugation.forms.ilElleOn}</span>
          </div>
          <div className="flex justify-between bg-white rounded p-1.5 border border-slate-100">
            <span className="text-slate-500">nous</span>
            <span className="font-medium text-slate-800">{conjugation.forms.nous}</span>
          </div>
          {/* Row 3: vous and ils/elles */}
          <div className="flex justify-between bg-white rounded p-1.5 border border-slate-100">
            <span className="text-slate-500">vous</span>
            <span className="font-medium text-slate-800">{conjugation.forms.vous}</span>
          </div>
          <div className="flex justify-between bg-white rounded p-1.5 border border-slate-100">
            <span className="text-slate-500">ils/elles</span>
            <span className="font-medium text-slate-800">{conjugation.forms.ilsElles}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * PracticeCardProps Interface
 * ---------------------------
 * Props for the PracticeCard component.
 */
interface PracticeCardProps {
  question: typeof practiceQuestions[0]  // Current practice question data
  questionNumber: number                 // Current question number (1-12)
  totalQuestions: number                 // Total questions (12)
  selectedOption: number | null          // Currently selected option index
  showFeedback: boolean                  // Whether answer feedback is showing
  onSelectOption: (index: number) => void  // Handler for option selection
  onSubmit: () => void                   // Handler for submitting answer
  onNext: () => void                     // Handler for advancing to next question
}

/**
 * PracticeCard Component
 * ----------------------
 * Interactive multiple-choice question card for practice section.
 * Features:
 * - Question number and topic badge with color coding (meaning/blue, conjugation/purple, patterns/green, core-verbs/amber)
 * - 3 answer options with visual selection state
 * - Immediate feedback with correct/incorrect highlighting
 * - Random positive feedback messages for correct answers
 * - Detailed explanation after answering
 */
function PracticeCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  showFeedback,
  onSelectOption,
  onSubmit,
  onNext
}: PracticeCardProps) {
  // Check if user's selected answer matches correct answer
  const isCorrect = selectedOption === question.correct

  // Array of positive feedback messages for correct answers (randomly selected)
  const feedbackMessages = [
    "Nice 😏",
    "Good catch",
    "That's right",
    "Perfect",
    "Well done",
    "You're getting it"
  ]
  const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]

  // Get color class based on question topic
  const getTopicColor = () => {
    if (question.topic === 'meaning') return 'bg-blue-100 text-blue-700'
    if (question.topic === 'conjugation') return 'bg-purple-100 text-purple-700'
    if (question.topic === 'patterns') return 'bg-green-100 text-green-700'
    return 'bg-amber-100 text-amber-700'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      {/* Header: Question number and topic badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        {/* Topic badge with color based on question category */}
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTopicColor()}`}>
          {question.topic}
        </span>
      </div>

      {/* Question prompt text */}
      <h3 className="text-lg font-medium text-slate-800 mb-6">{question.prompt}</h3>

      {/* Answer options with visual selection and feedback states */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelectOption(idx)}
            disabled={showFeedback}  // Prevent changing answer after submission
            className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
              showFeedback
                ? idx === question.correct
                  ? 'border-green-400 bg-green-50 text-green-800'    // Correct answer (green)
                  : selectedOption === idx
                  ? 'border-red-400 bg-red-50 text-red-800'        // Wrong selection (red)
                  : 'border-slate-200 text-slate-400'              // Unselected options
                : selectedOption === idx
                ? 'border-purple-500 bg-purple-50 text-purple-800' // Selected but not submitted
                : 'border-slate-200 hover:border-purple-300 text-slate-700' // Unselected
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Selection indicator circle */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                showFeedback
                  ? idx === question.correct
                    ? 'border-green-500 bg-green-500'
                    : selectedOption === idx
                    ? 'border-red-500 bg-red-500'
                    : 'border-slate-300'
                  : selectedOption === idx
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-slate-300'
              }`}>
                {showFeedback && idx === question.correct && <FaCheck size={12} className="text-white" />}
                {showFeedback && selectedOption === idx && idx !== question.correct && <span className="text-white text-xs">×</span>}
                {!showFeedback && selectedOption === idx && <FaCheck size={12} className="text-white" />}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Feedback section (shown after submitting answer) */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`p-4 rounded-xl mb-4 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
            {isCorrect ? randomMessage : "Careful now…"}
          </p>
          <p className="text-sm text-slate-600">{question.explanation}</p>
        </motion.div>
      )}

      {/* Action button: Submit (before feedback) or Next (after feedback) */}
      {!showFeedback ? (
        <button
          onClick={onSubmit}
          disabled={selectedOption === null}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            selectedOption !== null
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={onNext}
          className="w-full py-3 rounded-xl font-semibold bg-purple-500 text-white hover:bg-purple-600 transition-all flex items-center justify-center gap-2"
        >
          Next Question
          <FaChevronRight size={14} />
        </button>
      )}
    </motion.div>
  )
}

/**
 * PracticeCompleteCard Component
 * ------------------------------
 * Completion card shown after all practice questions are answered.
 * Features:
 * - Score display (e.g., "You scored 10 out of 12")
 * - Percentage progress bar
 * - Emoji celebration (🎉 for good, 👍 for okay)
 * - Encouragement message based on performance
 * - Color coding: green for 70%+ score, amber for below
 */
function PracticeCompleteCard({ score, total }: { score: number; total: number }) {
  // Calculate percentage score
  const percentage = (score / total) * 100
  // Consider 70% or higher as a good score
  const isGood = percentage >= 70

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center"
    >
      {/* Celebration emoji with colored background */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
        isGood ? 'bg-green-100' : 'bg-amber-100'
      }`}>
        <span className="text-3xl">{isGood ? '🎉' : '👍'}</span>
      </div>
      {/* Completion title */}
      <h3 className="text-xl font-bold text-slate-800 mb-2">Practice Complete!</h3>
      {/* Score display */}
      <p className="text-slate-600 mb-4">
        You scored {score} out of {total}
      </p>
      {/* Progress bar showing percentage */}
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden max-w-xs mx-auto mb-4">
        <div 
          className={`h-full ${isGood ? 'bg-green-500' : 'bg-amber-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {/* Encouragement message based on performance */}
      <p className={`text-sm font-medium ${isGood ? 'text-green-600' : 'text-amber-600'}`}>
        {isGood 
          ? "Great job! You're ready to move on." 
          : "Good effort! Review the lesson and try again."}
      </p>
    </motion.div>
  )
}
