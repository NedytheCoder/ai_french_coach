/**
 * A1 Lesson 9 - Passé Composé (Past Tense) Page
 * =============================================
 *
 * This page implements A1 Lesson 9, teaching the French passé composé,
 * the compound past tense used for completed actions. The lesson covers:
 * - What the passé composé is and when to use it
 * - How it's formed (auxiliary verb + past participle)
 * - Verbs using AVOIR as auxiliary (most verbs)
 * - Verbs using ÊTRE as auxiliary (DR MRS VANDERTRAMP)
 * - Gender/number agreement with être verbs
 * - Interactive practice with 18 questions
 *
 * Page Structure:
 * ---------------
 * 1. Header with back navigation and lesson title
 * 2. Progress bar showing lesson completion
 * 3. Eight content sections:
 *    - What is the passé composé?
 *    - How it's formed (auxiliary + past participle)
 *    - Avoir as auxiliary (most verbs)
 *    - Être as auxiliary (small group)
 *    - Dr. & Mrs. Vandertramp mnemonic
 *    - Agreement with être verbs
 *    - Avoir vs Être comparison
 *    - Guided examples with audio
 * 4. Interactive Practice (18 questions)
 * 5. Completion section with score display
 *
 * State Management:
 * -----------------
 * - reviewedSections: Tracks which of 8 sections have been opened
 * - currentlyPlaying: ID of currently playing audio
 * - currentPracticeIndex: Current question in practice quiz
 * - practiceAnswers: User's answers with correctness tracking
 * - selectedOption: Currently selected option in practice
 * - showFeedback: Whether to show answer feedback
 * - showResults: Whether to show practice results
 * - showCompletion: Whether to show lesson completion card
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and memoization
import { useMemo, useRef, useState } from 'react'

// Framer Motion for smooth animations
import { motion, AnimatePresence } from 'framer-motion'

// Font Awesome icons for UI elements
import {
  FaArrowRight,   // Navigation and action buttons
  FaCheck,        // Completion checkmarks
  FaChevronRight, // Navigation arrows
  FaHome,         // Back to lessons link
  FaPlay,         // Audio play button
  FaRedoAlt       // Retake practice
} from 'react-icons/fa'

// Next.js navigation
import Link from 'next/link'

// Lesson data imports
import {
  agreementExamples,
  avoirExamples,
  comparisonExamples,
  etreVerbs,
  guidedExamples,
  practiceQuestions,
  type PracticeQuestion,
  type PracticeTopic
} from './data'

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * SectionKey - Union type of all section identifiers.
 * Used for tracking which sections have been reviewed.
 */
type SectionKey =
  | 'what'       // What is the passé composé?
  | 'formed'     // How it's formed
  | 'avoir'      // Avoir as auxiliary
  | 'etre'       // Être as auxiliary
  | 'mnemonic'   // Dr. & Mrs. Vandertramp
  | 'agreement'  // Agreement with être
  | 'comparison' // Avoir vs Être comparison
  | 'guided'     // Guided examples

/**
 * SectionReview - Record type mapping section keys to review status.
 */
type SectionReview = Record<SectionKey, boolean>

/**
 * PracticeAnswer - Structure for a single practice answer.
 */
type PracticeAnswer = {
  questionId: number
  selectedOption: number
  isCorrect: boolean
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * A1Lesson9Page - Main component implementation
 *
 * Manages lesson state, audio playback, practice quiz, and completion tracking.
 */
export default function A1Lesson9Page() {
  // ===========================================================================
  // STATE: Section Review Tracking
  // ===========================================================================

  /**
   * reviewedSections - Tracks which of the 8 sections have been opened/reviewed.
   * Each section is initially false and set to true when expanded.
   */
  const [reviewedSections, setReviewedSections] = useState<SectionReview>({
    what: false,
    formed: false,
    avoir: false,
    etre: false,
    mnemonic: false,
    agreement: false,
    comparison: false,
    guided: false
  })

  // ===========================================================================
  // STATE: Audio Playback
  // ===========================================================================

  /**
   * currentlyPlaying - ID of the audio currently playing (null if none).
   * Used to show playing state and prevent multiple simultaneous playbacks.
   */
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  /**
   * audioRef - Ref to the currently playing HTMLAudioElement.
   * Used to control playback (pause when starting new audio).
   */
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ===========================================================================
  // STATE: Practice Quiz
  // ===========================================================================

  /**
   * currentPracticeIndex - Index of the current question being displayed (0-17).
   */
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)

  /**
   * practiceAnswers - Array of user's answers to practice questions.
   * Each answer tracks the question ID, selected option, and correctness.
   */
  const [practiceAnswers, setPracticeAnswers] = useState<PracticeAnswer[]>([])

  /**
   * selectedOption - Index of the currently selected option in practice (null if none selected).
   */
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  /**
   * showFeedback - Whether to show the feedback after submitting an answer.
   */
  const [showFeedback, setShowFeedback] = useState(false)

  /**
   * showResults - Whether to display the practice results card.
   */
  const [showResults, setShowResults] = useState(false)

  /**
   * showCompletion - Whether to display the lesson completion celebration card.
   */
  const [showCompletion, setShowCompletion] = useState(false)

  // ===========================================================================
  // DERIVED STATE: Progress Calculations
  // ===========================================================================

  /**
   * allSectionsReviewed - True when all 8 lesson sections have been marked as reviewed.
   */
  const allSectionsReviewed = Object.values(reviewedSections).every(Boolean)

  /**
   * practiceComplete - True when all 18 practice questions have been answered.
   */
  const practiceComplete = practiceAnswers.length === practiceQuestions.length

  /**
   * score - Number of correctly answered practice questions.
   */
  const score = practiceAnswers.filter(a => a.isCorrect).length

  /**
   * percentage - Practice score as a percentage (0-100).
   */
  const percentage = Math.round((score / practiceQuestions.length) * 100)

  /**
   * topicCounts - Count of answered questions by topic category.
   * Used to display progress breakdown in PracticeMetaRow.
   */
  const topicCounts = useMemo(() => {
    return practiceAnswers.reduce<Record<PracticeTopic, number>>(
      (acc, a) => {
        const q = practiceQuestions.find(x => x.id === a.questionId)
        if (!q) return acc
        acc[q.topic] = (acc[q.topic] || 0) + 1
        return acc
      },
      { recognition: 0, auxiliary: 0, vandertramp: 0, agreement: 0 }
    )
  }, [practiceAnswers])

  // ===========================================================================
  // HANDLERS: Audio Playback
  // ===========================================================================

  /**
   * playAudio - Plays audio for a given source and tracks playing state.
   * @param audioSrc - Path to the audio file
   * @param id - Unique identifier for the audio element
   */
  const playAudio = (audioSrc: string, id: string) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(audioSrc)
    audioRef.current = audio
    setCurrentlyPlaying(id)

    audio.play().catch(() => {
      setCurrentlyPlaying(null)
    })

    audio.onended = () => setCurrentlyPlaying(null)
  }

  // ===========================================================================
  // HANDLERS: Section Review
  // ===========================================================================

  /**
   * markSectionReviewed - Marks a lesson section as reviewed.
   * @param section - The section key to mark as reviewed
   */
  const markSectionReviewed = (section: SectionKey) => {
    setReviewedSections(prev => ({ ...prev, [section]: true }))
  }

  // ===========================================================================
  // HANDLERS: Practice Quiz
  // ===========================================================================

  /**
   * handlePracticeAnswer - Handles selection of an answer option.
   * @param optionIndex - Index of the selected option
   */
  const handlePracticeAnswer = (optionIndex: number) => {
    if (showFeedback) return
    setSelectedOption(optionIndex)
  }

  /**
   * submitAnswer - Submits the selected answer and shows feedback.
   */
  const submitAnswer = () => {
    if (selectedOption === null) return
    const currentQuestion = practiceQuestions[currentPracticeIndex]
    const isCorrect = selectedOption === currentQuestion.correct
    setPracticeAnswers(prev => [
      ...prev,
      { questionId: currentQuestion.id, selectedOption, isCorrect }
    ])
    setShowFeedback(true)
  }

  /**
   * nextQuestion - Advances to the next practice question.
   * Shows results when all questions are answered.
   */
  const nextQuestion = () => {
    const nextIndex = currentPracticeIndex + 1
    setSelectedOption(null)
    setShowFeedback(false)
    setCurrentPracticeIndex(nextIndex)
    if (nextIndex >= practiceQuestions.length) setShowResults(true)
  }

  /**
   * retakePractice - Resets practice state to allow retaking the quiz.
   */
  const retakePractice = () => {
    setCurrentPracticeIndex(0)
    setPracticeAnswers([])
    setSelectedOption(null)
    setShowFeedback(false)
    setShowResults(false)
    setShowCompletion(false)
  }

  /**
   * continueFromResults - Continues from results to completion screen.
   */
  const continueFromResults = () => {
    setShowResults(false)
    setShowCompletion(true)
  }

  // ===========================================================================
  // DERIVED STATE: Lesson Completion
  // ===========================================================================

  /**
   * lessonReadyToComplete - True when all sections reviewed AND practice complete.
   */
  const lessonReadyToComplete = allSectionsReviewed && practiceComplete

  /**
   * lessonComplete - True when lesson is ready AND completion screen shown.
   */
  const lessonComplete = lessonReadyToComplete && showCompletion

  // ===========================================================================
  // RENDER: Main JSX
  // ===========================================================================

  return (
    // -------------------------------------------------------------------------
    // Main page container with gradient background and bottom padding for footer
    // -------------------------------------------------------------------------
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ---------------------------------------------------------------------
          Back Navigation
          Links back to A1 lessons list
        --------------------------------------------------------------------- */}
        <div className="mb-6">
          <Link
            href="/classes/A1"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
          >
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A1 Lessons</span>
          </Link>
        </div>

        {/* ---------------------------------------------------------------------
          Lesson Header Component
          Displays lesson title and description
        --------------------------------------------------------------------- */}
        <LessonHeader />

        {/* ---------------------------------------------------------------------
          Progress Bar Component
          Shows overall lesson completion including sections and practice
        --------------------------------------------------------------------- */}
        <ProgressBar
          reviewedSections={reviewedSections}
          practiceProgress={practiceAnswers.length}
          totalPractice={practiceQuestions.length}
        />

        {/* ---------------------------------------------------------------------
          SECTION 1: What is the passé composé?
          Introduction to the French compound past tense
        --------------------------------------------------------------------- */}
        <SectionCard
          title="What is the passé composé?"
          subtitle="A very useful past tense for beginners"
          icon="⏳"
          isReviewed={reviewedSections.what}
          onMarkReviewed={() => markSectionReviewed('what')}
          index={0}
        >
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>The <strong>passé composé</strong> is one of the main past tenses in French.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>It is often used to talk about <strong>completed</strong> actions in the past.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>At beginner level, it’s one of the most useful ways to say what happened.</span>
              </li>
            </ul>

            <div className="mt-6 bg-white rounded-lg p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3">Examples:</h4>
              <div className="space-y-2 text-slate-600">
                <p><span className="font-medium text-purple-700">J’ai mangé.</span> = I ate / I have eaten.</p>
                <p><span className="font-medium text-purple-700">Elle est arrivée.</span> = She arrived / She has arrived.</p>
              </div>
              <div className="mt-4 bg-purple-50 rounded-lg p-3 border border-purple-200 text-sm text-purple-800 space-y-1">
                <p><strong>Helper:</strong> At A1 level, focus on recognizing the form and building simple sentences.</p>
                <p>You do not need every exception yet.</p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------------
          SECTION 2: How the passé composé is formed
          Explains the structure: auxiliary + past participle
        --------------------------------------------------------------------- */}
        <SectionCard
          title="How the passé composé is formed"
          subtitle="Auxiliary + past participle"
          icon="🧩"
          isReviewed={reviewedSections.formed}
          onMarkReviewed={() => markSectionReviewed('formed')}
          index={1}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ExplanationCard
              title="2 parts"
              bullets={[
                "the auxiliary verb (avoir or être)",
                "the past participle"
              ]}
              accent="purple"
            />
            <FormulaCard />
          </div>

          <div className="mt-4 bg-white rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-slate-800 mb-2">Quick examples</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <MiniExample french="J’ai parlé." />
              <MiniExample french="Nous avons fini." />
              <MiniExample french="Elle est allée." />
            </div>
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------------
          SECTION 3: Avoir as auxiliary
          Shows examples of verbs using AVOIR (most verbs)
        --------------------------------------------------------------------- */}
        <SectionCard
          title="Avoir as auxiliary"
          subtitle="The default pattern (most verbs)"
          icon="✅"
          isReviewed={reviewedSections.avoir}
          onMarkReviewed={() => markSectionReviewed('avoir')}
          index={2}
        >
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 mb-4">
              Most verbs use <strong>avoir</strong> in the passé composé. This is the default pattern you’ll see most often.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {avoirExamples.map((ex, idx) => (
                <ExampleCard
                  key={ex.id}
                  label={`avoir • ${ex.infinitive}`}
                  french={ex.sentence}
                  english={ex.english}
                  accent="blue"
                  isPlaying={currentlyPlaying === `avoir-${ex.id}`}
                  onPlay={() => playAudio(`/audio/a1/passe-compose/avoir/${ex.infinitive}.mp3`, `avoir-${ex.id}`)}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------------
          SECTION 4: Être as auxiliary
          Introduces the small group of verbs using ÊTRE
        --------------------------------------------------------------------- */}
        <SectionCard
          title="Être as auxiliary"
          subtitle="A small but important group"
          icon="⭐"
          isReviewed={reviewedSections.etre}
          onMarkReviewed={() => markSectionReviewed('etre')}
          index={3}
        >
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <p className="text-amber-900 mb-4">
              A smaller set of verbs uses <strong>être</strong> instead of <strong>avoir</strong>. These are often movement verbs
              or verbs of change of state.
            </p>
            <div className="bg-white rounded-xl p-4 border border-amber-200 text-sm text-slate-700 space-y-1">
              <p><strong>Do not panic — this is a small group.</strong></p>
              <p>Most beginners learn them through a mnemonic.</p>
              <p className="text-slate-500">
                Note: All reflexive / pronominal verbs also use être, but for this lesson focus mainly on the common movement verbs.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------------
          SECTION 5: Dr. & Mrs. Vandertramp verbs
          Displays the 16 être verbs using the mnemonic
        --------------------------------------------------------------------- */}
        <SectionCard
          title="Dr. & Mrs. Vandertramp verbs"
          subtitle="Common être verbs (movement / change of state)"
          icon="🧠"
          isReviewed={reviewedSections.mnemonic}
          onMarkReviewed={() => markSectionReviewed('mnemonic')}
          index={4}
        >
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200">
              <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    The mnemonic: “Dr. & Mrs. Vandertramp.”
                  </h3>
                  <p className="text-sm text-slate-600">
                    Different teachers may present slightly different mnemonic versions, but this is the classic one learners often see.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center w-full md:w-auto">
                  <div className="text-xs text-slate-500 font-semibold mb-1">Letters</div>
                  <div className="font-mono text-sm text-slate-800 tracking-wider">
                    D R M R S V A N D E R T R A M P
                  </div>
                </div>
              </div>
            </div>

            <MnemonicGrid />
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------------
          SECTION 6: Agreement with être
          Shows gender/number agreement rules for être verbs
        --------------------------------------------------------------------- */}
        <SectionCard
          title="Agreement with être"
          subtitle="Notice the pattern (don’t panic)"
          icon="🧷"
          isReviewed={reviewedSections.agreement}
          onMarkReviewed={() => markSectionReviewed('agreement')}
          index={5}
        >
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <p className="text-emerald-900 mb-4">
              With <strong>être</strong>, the past participle agrees with the subject in gender and number, so the ending may change.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agreementExamples.map((ex, idx) => (
                <AgreementCard
                  key={ex.id}
                  sentence={ex.sentence}
                  english={ex.english}
                  note={ex.note}
                  index={idx}
                />
              ))}
            </div>
            <div className="mt-4 bg-white rounded-xl p-4 border border-emerald-200 text-sm text-slate-700 space-y-1">
              <p><strong>At A1 level, the most important thing is to notice this pattern.</strong></p>
              <p>You do not need to master every agreement rule immediately.</p>
            </div>
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------------
          SECTION 7: Avoir vs Être comparison
          Side-by-side comparison of both auxiliary types
        --------------------------------------------------------------------- */}
        <SectionCard
          title="Avoir vs être comparison"
          subtitle="Same tense, different auxiliary"
          icon="⚖️"
          isReviewed={reviewedSections.comparison}
          onMarkReviewed={() => markSectionReviewed('comparison')}
          index={6}
        >
          <ComparisonPanel />
        </SectionCard>

        {/* ---------------------------------------------------------------------
          SECTION 8: Guided examples
          Full sentences demonstrating passé composé in context
        --------------------------------------------------------------------- */}
        <SectionCard
          title="Guided examples"
          subtitle="Read, notice the auxiliary, then copy"
          icon="🗣️"
          isReviewed={reviewedSections.guided}
          onMarkReviewed={() => markSectionReviewed('guided')}
          index={7}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {guidedExamples.map((ex, idx) => (
              <GuidedExampleCard
                key={ex.french}
                french={ex.french}
                english={ex.english}
                isPlaying={currentlyPlaying === `guided-${idx}`}
                onPlay={() => playAudio(`/audio/a1/passe-compose/guided/${idx + 1}.mp3`, `guided-${idx}`)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------------
          SECTION 9: Interactive Practice
          18-question quiz testing passé composé concepts
        --------------------------------------------------------------------- */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <span className="text-2xl">✏️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Guided interactive practice</h2>
              <p className="text-sm text-slate-600">18 questions, one at a time</p>
            </div>
          </div>

          {!showResults ? (
            <div className="space-y-4">
              <PracticeMetaRow answered={practiceAnswers.length} total={practiceQuestions.length} counts={topicCounts} />

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
                <PracticeResultsCard score={score} total={practiceQuestions.length} onRetake={retakePractice} onContinue={continueFromResults} />
              )}
            </div>
          ) : (
            <PracticeResultsCard score={score} total={practiceQuestions.length} onRetake={retakePractice} onContinue={continueFromResults} />
          )}
        </div>

        {/* ---------------------------------------------------------------------
          SECTION 10: Lesson Completion
          Celebration card shown when all sections and practice complete
        --------------------------------------------------------------------- */}
        <AnimatePresence>
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8"
            >
              <div className="flex items-start gap-4 flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-200 text-green-900 text-xs font-semibold mb-3">
                    <FaCheck />
                    Lesson completion
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">You’ve completed Lesson 9.</h2>
                  <p className="text-slate-700 mb-3">
                    You now understand the basic structure of the passé composé.
                  </p>
                  <p className="text-slate-700 mb-4">
                    You’ve also met the common être verbs often remembered with Dr. & Mrs. Vandertramp.
                  </p>

                  <div className="bg-white rounded-xl p-4 border border-green-200 text-sm text-slate-700">
                    <div className="font-semibold text-slate-800 mb-2">Quick recap</div>
                    <ul className="space-y-1">
                      <li>- Passé composé = <strong>auxiliary</strong> + <strong>past participle</strong></li>
                      <li>- Most verbs → <strong>avoir</strong></li>
                      <li>- Small important group → <strong>être</strong> (often movement / change of state)</li>
                      <li>- With être, <strong>agreement</strong> can appear (allé / allée / allés / allées)</li>
                    </ul>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <div className="bg-white rounded-2xl p-5 border border-green-200 text-center">
                    <div className="text-sm text-slate-500 mb-1">Practice score</div>
                    <div className="text-3xl font-bold text-green-700">
                      {score}/{practiceQuestions.length}
                    </div>
                    <div className="text-sm font-medium text-slate-600">{percentage}%</div>
                    <div className="mt-4 flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={retakePractice}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
                      >
                        <FaRedoAlt size={14} />
                        Retake practice
                      </button>
                      <a
                        href="/learn/a1/lesson-10"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transition-all"
                      >
                        Continue
                        <FaArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------------------------------------------------------------------
        STICKY FOOTER
        Progress indicator and Continue button fixed at bottom
      --------------------------------------------------------------------- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {lessonComplete ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600 truncate">
                  Lesson complete! You’re ready to continue.
                </span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-600 truncate">
                  {!allSectionsReviewed
                    ? 'Review all lesson sections to continue'
                    : !practiceComplete
                    ? 'Finish the practice to see your results'
                    : 'Continue to the completion screen'}
                </span>
              </>
            )}
          </div>

          <button
            disabled={!lessonReadyToComplete}
            onClick={() => {
              if (!lessonReadyToComplete) return
              setShowCompletion(true)
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }}
            className={`shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              lessonReadyToComplete
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
 * LessonHeader - Displays the lesson title, badge, and description.
 *
 * Shows A1 Lesson 9 title and subtitle explaining the passé composé.
 */
function LessonHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
        <span>A1 Lesson 9</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        Past Tense — Passé Composé
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        Learn how to talk about completed actions in the past in French.
      </p>
      <p className="text-sm text-slate-500">
        Read the explanations, notice the patterns, and complete the practice.
      </p>
    </motion.div>
  )
}

/**
 * ProgressBar - Displays overall lesson progress.
 *
 * Shows percentage bar, reviewed sections count, and practice questions answered.
 *
 * @param reviewedSections - Object tracking which sections have been reviewed
 * @param practiceProgress - Number of practice questions answered
 * @param totalPractice - Total number of practice questions
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
  const sections = ['what', 'formed', 'avoir', 'etre', 'mnemonic', 'agreement', 'comparison', 'guided'] as const
  const completedSections = sections.filter(s => reviewedSections[s]).length
  const totalProgress = ((completedSections + practiceProgress / totalPractice) / 9) * 100

  return (
    <div className="mb-8 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">Lesson Progress</span>
        <span className="text-sm font-medium text-purple-600">{Math.round(totalProgress)}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${totalProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 flex-wrap">
        <span>{completedSections}/8 sections reviewed</span>
        <span>•</span>
        <span>{practiceProgress}/{totalPractice} practice questions</span>
      </div>
    </div>
  )
}

/**
 * SectionCard - Wrapper component for lesson sections.
 *
 * Displays section with title, icon, subtitle, and "Mark as Reviewed" button.
 *
 * @param title - Section title
 * @param subtitle - Section subtitle/description
 * @param icon - Emoji icon for the section
 * @param isReviewed - Whether section has been marked as reviewed
 * @param onMarkReviewed - Callback when review button is clicked
 * @param index - Section index for color rotation and animation delay
 * @param children - Section content
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
  // Gradient colors for section icons (8 different gradients)
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-indigo-500 to-purple-500',
    'from-rose-500 to-pink-500',
    'from-sky-500 to-indigo-500',
    'from-lime-500 to-emerald-500'
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center text-white shadow-md`}>
                <span className="text-2xl">{icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                <p className="text-sm text-slate-600">{subtitle}</p>
              </div>
            </div>
            <button
              onClick={onMarkReviewed}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isReviewed ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              <FaCheck size={14} />
              {isReviewed ? 'Reviewed' : 'Mark as Reviewed'}
            </button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </motion.div>
  )
}

/**
 * ExplanationCard - Displays explanation with bullet points.
 *
 * Used in the "How formed" section to show the 2-part structure.
 *
 * @param title - Card title
 * @param bullets - Array of bullet point strings
 * @param accent - Color accent for styling (purple or blue)
 */
function ExplanationCard({
  title,
  bullets,
  accent
}: {
  title: string
  bullets: string[]
  accent: 'purple' | 'blue'
}) {
  const styles =
    accent === 'purple'
      ? { bg: 'bg-purple-50', border: 'border-purple-200' }
      : { bg: 'bg-blue-50', border: 'border-blue-200' }

  return (
    <div className={`rounded-2xl p-5 border-2 ${styles.bg} ${styles.border}`}>
      <h3 className="text-lg font-bold text-slate-800 mb-3">{title}</h3>
      <ul className="space-y-2 text-slate-700">
        {bullets.map((b, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="font-bold text-slate-500">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * FormulaCard - Displays the passé composé formula with visual breakdown.
 *
 * Shows: subject + auxiliary + past participle
 * Example: Je + ai + mangé
 */
function FormulaCard() {
  return (
    <div className="rounded-2xl p-5 border-2 bg-slate-50 border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-3">Formula</h3>
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="text-sm text-slate-500 font-semibold mb-2">subject + auxiliary + past participle</div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 font-semibold text-slate-700">Je</span>
          <span className="px-2 py-1 rounded-lg bg-blue-50 border border-blue-200 font-semibold text-blue-700">ai</span>
          <span className="px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 font-semibold text-emerald-700">mangé</span>
        </div>
      </div>
    </div>
  )
}

/**
 * MiniExample - Simple card displaying a French sentence example.
 *
 * Used for quick examples in the "How formed" section.
 *
 * @param french - French sentence to display
 */
function MiniExample({ french }: { french: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 font-semibold text-slate-800">
      {french}
    </div>
  )
}

/**
 * ExampleCard - Card displaying a French sentence example with audio button.
 *
 * Used in the Avoir section to show avoir example sentences.
 *
 * @param label - Label showing the verb (e.g., "avoir • manger")
 * @param french - French sentence
 * @param english - English translation
 * @param accent - Color accent (blue or purple)
 * @param isPlaying - Whether this audio is currently playing
 * @param onPlay - Callback to play audio
 * @param index - Index for animation delay
 */
function ExampleCard({
  label,
  french,
  english,
  accent,
  isPlaying,
  onPlay,
  index
}: {
  label: string
  french: string
  english: string
  accent: 'blue' | 'purple'
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  const chip = accent === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${chip}`}>{label}</span>
          <div className="text-lg font-bold text-slate-800 mt-2">{french}</div>
          <div className="text-sm text-slate-600 mt-1">{english}</div>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label="Play audio"
          className={`p-2 rounded-lg transition-all ${
            isPlaying ? 'bg-purple-100 text-purple-600 animate-pulse' : 'bg-slate-50 text-slate-600 hover:text-purple-600 border border-slate-200'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
    </motion.div>
  )
}

/**
 * MnemonicGrid - Displays the 16 Dr. & Mrs. Vandertramp verbs in a grid.
 *
 * Shows each letter of the mnemonic with corresponding verb and English translation.
 */
function MnemonicGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {etreVerbs.map((v, idx) => (
        <motion.div
          key={`${v.letter}-${v.infinitive}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.02 }}
          className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
        >
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-purple-700">{v.letter}</div>
            <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">être</span>
          </div>
          <div className="mt-2 text-lg font-bold text-slate-800">{v.infinitive}</div>
          <div className="text-sm text-slate-600">{v.english}</div>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * AgreementCard - Card showing gender/number agreement examples.
 *
 * Displays French sentence, English translation, and agreement rule note.
 *
 * @param sentence - French sentence showing agreement
 * @param english - English translation
 * @param note - Agreement rule note (e.g., "Feminine singular adds -e")
 * @param index - Index for animation delay
 */
function AgreementCard({ sentence, english, note, index }: { sentence: string; english: string; note: string; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-emerald-200">
      <div className="text-lg font-bold text-slate-800">{sentence}</div>
      <div className="text-sm text-slate-600 mt-1">{english}</div>
      <div className="mt-3 text-xs font-semibold text-emerald-800 bg-emerald-100 border border-emerald-200 rounded-full inline-flex px-3 py-1">
        {note}
      </div>
    </motion.div>
  )
}

/**
 * ComparisonPanel - Side-by-side comparison of avoir vs être examples.
 *
 * Shows examples using each auxiliary with summary notes.
 */
function ComparisonPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-2xl p-5 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-800">Avoir</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">most verbs</span>
          </div>
          <div className="space-y-3">
            {comparisonExamples.filter(x => x.type === 'avoir').map((ex, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-blue-200">
                <div className="font-semibold text-slate-800">{ex.sentence}</div>
                <div className="text-sm text-slate-600">{ex.english}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-800">Être</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">small group</span>
          </div>
          <div className="space-y-3">
            {comparisonExamples.filter(x => x.type === 'etre').map((ex, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-amber-200">
                <div className="font-semibold text-slate-800">{ex.sentence}</div>
                <div className="text-sm text-slate-600">{ex.english}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200">
        <div className="font-semibold text-slate-800 mb-2">Summary notes</div>
        <ul className="space-y-1 text-sm text-slate-700">
          <li>- <strong>Most verbs</strong> → avoir</li>
          <li>- <strong>Small important group</strong> → être</li>
          <li>- Être verbs often relate to <strong>movement</strong> or <strong>change of state</strong></li>
          <li>- With être, <strong>agreement</strong> matters</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * GuidedExampleCard - Card for guided example sentences with audio.
 *
 * Auto-detects whether the sentence uses avoir or être based on auxiliary verb.
 *
 * @param french - French sentence
 * @param english - English translation
 * @param isPlaying - Whether this audio is currently playing
 * @param onPlay - Callback to play audio
 * @param index - Index for animation delay
 */
function GuidedExampleCard({
  french,
  english,
  isPlaying,
  onPlay,
  index
}: {
  french: string
  english: string
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  // Detect if this example uses être by checking for être conjugations
  const isEtre = french.includes(' suis ') || french.includes(' sommes ') || french.includes(' sont ') || french.includes(' est ')
  const chip = isEtre ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
  const label = isEtre ? 'être' : 'avoir'

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${chip}`}>{label}</span>
          <div className="text-lg font-bold text-slate-800 mt-2">{french}</div>
          <div className="text-sm text-slate-600 mt-1">{english}</div>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label="Play audio"
          className={`p-2 rounded-lg transition-all ${
            isPlaying ? 'bg-purple-100 text-purple-600 animate-pulse' : 'bg-slate-50 text-slate-600 hover:text-purple-600 border border-slate-200'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
    </motion.div>
  )
}

/**
 * PracticeMetaRow - Shows practice progress and topic counts.
 *
 * Displays number of questions answered and counts for each topic category.
 *
 * @param answered - Number of questions answered
 * @param total - Total number of practice questions
 * @param counts - Record of answered questions by topic
 */
function PracticeMetaRow({
  answered,
  total,
  counts
}: {
  answered: number
  total: number
  counts: Record<PracticeTopic, number>
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="text-sm text-slate-600">
        <strong className="text-slate-800">{answered}</strong> / {total} answered
      </div>
      <div className="flex gap-2 flex-wrap">
        <Chip label={`Recognition: ${counts.recognition}`} />
        <Chip label={`Avoir/Être: ${counts.auxiliary}`} />
        <Chip label={`Vandertramp: ${counts.vandertramp}`} />
        <Chip label={`Agreement: ${counts.agreement}`} />
      </div>
    </div>
  )
}

/**
 * Chip - Small pill-shaped label for topic counts.
 *
 * @param label - Text to display inside the chip
 */
function Chip({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
      {label}
    </span>
  )
}

/**
 * PracticeCard - Interactive practice question card.
 *
 * Displays a multiple-choice question with selectable options,
 * feedback after submission, and navigation to next question.
 *
 * @param question - The practice question to display
 * @param questionNumber - Current question number (1-based)
 * @param totalQuestions - Total number of questions in the quiz
 * @param selectedOption - Index of currently selected option
 * @param showFeedback - Whether to show answer feedback
 * @param onSelectOption - Callback when an option is selected
 * @param onSubmit - Callback to submit the selected answer
 * @param onNext - Callback to go to the next question
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
}: {
  question: PracticeQuestion
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  showFeedback: boolean
  onSelectOption: (index: number) => void
  onSubmit: () => void
  onNext: () => void
}) {
  // Check if the selected answer is correct
  const isCorrect = selectedOption === question.correct

  // Random feedback messages based on correctness
  const feedbackMessagesCorrect = ["Nice 😏", "Good catch", "That's right", "You're getting the pattern"]
  const feedbackMessagesWrong = ["Careful now…", "Good try — check the auxiliary", "Almost — notice the pattern"]
  const message = isCorrect
    ? feedbackMessagesCorrect[Math.floor(Math.random() * feedbackMessagesCorrect.length)]
    : feedbackMessagesWrong[Math.floor(Math.random() * feedbackMessagesWrong.length)]

  const topicBadge =
    question.topic === 'recognition'
      ? 'bg-purple-100 text-purple-700'
      : question.topic === 'auxiliary'
      ? 'bg-blue-100 text-blue-700'
      : question.topic === 'vandertramp'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-emerald-100 text-emerald-700'

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="text-sm font-medium text-slate-500">
          Practice {questionNumber} of {totalQuestions}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${topicBadge}`}>
          {question.topic}
        </span>
      </div>

      <h3 className="text-lg font-medium text-slate-800 mb-6">{question.prompt}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelectOption(idx)}
            disabled={showFeedback}
            aria-label={`Answer option ${idx + 1}: ${option}`}
            className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              showFeedback
                ? idx === question.correct
                  ? 'border-green-400 bg-green-50 text-green-800'
                  : selectedOption === idx
                  ? 'border-red-400 bg-red-50 text-red-800'
                  : 'border-slate-200 text-slate-400'
                : selectedOption === idx
                ? 'border-purple-500 bg-purple-50 text-purple-800'
                : 'border-slate-200 hover:border-purple-300 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  showFeedback
                    ? idx === question.correct
                      ? 'border-green-500 bg-green-500'
                      : selectedOption === idx
                      ? 'border-red-500 bg-red-500'
                      : 'border-slate-300'
                    : selectedOption === idx
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-slate-300'
                }`}
              >
                {showFeedback && idx === question.correct && <FaCheck size={12} className="text-white" />}
                {showFeedback && selectedOption === idx && idx !== question.correct && (
                  <span className="text-white text-xs">×</span>
                )}
                {!showFeedback && selectedOption === idx && <FaCheck size={12} className="text-white" />}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`p-4 rounded-xl mb-4 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
            {message}
          </p>
          <p className="text-sm text-slate-600">{question.explanation}</p>
        </motion.div>
      )}

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
 * PracticeResultsCard - Shows practice quiz results with score and feedback.
 *
 * Displays final score, percentage, personalized feedback based on score,
 * and buttons to retake or continue.
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions
 * @param onRetake - Callback to retake the quiz
 * @param onContinue - Callback to continue to lesson completion
 */
function PracticeResultsCard({
  score,
  total,
  onRetake,
  onContinue
}: {
  score: number
  total: number
  onRetake: () => void
  onContinue: () => void
}) {
  // Calculate percentage score
  const percentage = Math.round((score / total) * 100)

  // Feedback message based on score tier
  const feedback =
    score <= 7
      ? {
          title: "Good effort",
          body:
            "The passé composé takes time, especially with être verbs. You can retake this practice or keep going. A quick review will help a lot."
        }
      : score <= 13
      ? {
          title: "Nice progress",
          body:
            "You’re starting to recognize the passé composé patterns. Review the être verbs again if you want to feel more confident."
        }
      : {
          title: "Great job",
          body:
            "You’re handling the passé composé well, including the important être verbs. Keep going."
        }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Practice results</h3>
          <p className="text-slate-800 font-semibold mb-2">{feedback.title}</p>
          <p className="text-sm text-slate-600">{feedback.body}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center w-full md:w-[260px]">
          <div className="text-sm text-slate-500 mb-1">Final score</div>
          <div className="text-4xl font-bold text-purple-700">{score}/{total}</div>
          <div className="text-sm font-semibold text-slate-600 mt-1">{percentage}%</div>
          <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
        >
          <FaRedoAlt size={14} />
          Retake practice
        </button>
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transition-all"
        >
          Continue lesson
          <FaArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}

