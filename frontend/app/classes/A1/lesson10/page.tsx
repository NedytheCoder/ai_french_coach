/**
 * A1 Lesson 10 - Negation in French
 * ===================================
 *
 * This page teaches A1 learners how to form negative sentences in French.
 *
 * **Lesson Scope:**
 * - ne...pas (not) - the most common negation form
 * - Other negations: ne...jamais, ne...plus, ne...rien, ne...personne, ne...guerre
 * - Negation placement in passé composé (around the auxiliary)
 * - Important patterns: ne → n' before vowels, de replacing un/une/des
 *
 * **Page Structure:**
 * 1. Navigation link to A1 lessons
 * 2. LessonHeader - Title and description
 * 3. ProgressBar - Visual progress tracking
 * 4. 6 Content Sections (SectionCard):
 *    - Recap: ne...pas review
 *    - Structure: Present vs passé composé formulas
 *    - Other negations: jamais, plus, rien, personne, guerre
 *    - Passé composé: Negation around auxiliary
 *    - Patterns: ne→n', de replacement rules
 *    - Guided examples: Mixed present and past examples
 * 5. Practice Quiz - 20 questions with feedback
 * 6. Completion UI - Recap and navigation
 * 7. Sticky footer - Progress and continue button
 *
 * **State Management:**
 * - reviewedSections: Tracks which 6 sections have been reviewed
 * - currentlyPlaying: ID of active audio playback
 * - Practice state: Answers, selection, feedback, results, completion
 *
 * **Sub-components:**
 * - LessonHeader, ProgressBar, SectionCard, TwoLineExample
 * - FormulaCard, NegationCard, ExampleCard, RuleCard
 * - PracticeMetaRow, Chip, PracticeCard, PracticeResultsCard
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import { useMemo, useRef, useState } from 'react'

// Framer Motion for page animations and transitions
import { motion, AnimatePresence } from 'framer-motion'

// React Icons for UI elements
import {
  FaArrowRight,   // Continue/Next button
  FaCheck,        // Reviewed status indicator
  FaChevronRight, // Next question arrow
  FaHome,         // Back to lessons navigation
  FaPlay,         // Audio playback
  FaRedoAlt       // Retake practice
} from 'react-icons/fa'

// Next.js Link for navigation
import Link from 'next/link'

// Lesson data: examples, negations, questions
import {
  guidedExamples,
  nePasExamples,
  negations,
  passeComposeNegation,
  practiceQuestions,
  type PracticeQuestion,
  type PracticeTopic
} from './data'

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * SectionKey - Union type of all lesson section identifiers.
 */
type SectionKey =
  | 'recap'
  | 'structure'
  | 'other'
  | 'pc'
  | 'patterns'
  | 'guided'

/**
 * SectionReview - Type mapping each section to its reviewed status.
 */
type SectionReview = Record<SectionKey, boolean>

/**
 * PracticeAnswer - Records a single practice quiz response.
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
 * A1Lesson10Page - Main component for the negation lesson.
 *
 * Manages lesson state including section reviews, audio playback, and practice quiz.
 */
export default function A1Lesson10Page() {
  // ---------------------------------------------------------------------------
  // STATE: Section Review Tracking
  // ---------------------------------------------------------------------------
  // Tracks which of the 6 content sections have been reviewed by the learner.
  const [reviewedSections, setReviewedSections] = useState<SectionReview>({
    recap: false,
    structure: false,
    other: false,
    pc: false,
    patterns: false,
    guided: false
  })

  // ---------------------------------------------------------------------------
  // STATE: Audio Playback
  // ---------------------------------------------------------------------------
  // currentlyPlaying - ID of the currently playing audio clip.
  // audioRef - Reference to the active HTMLAudioElement for control.
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ---------------------------------------------------------------------------
  // STATE: Practice Quiz
  // ---------------------------------------------------------------------------
  // currentPracticeIndex - Index of the current question being displayed.
  // practiceAnswers - Array of the learner's submitted answers.
  // selectedOption - Currently selected option before submission.
  // showFeedback - Whether to show correct/incorrect feedback for current question.
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)
  const [practiceAnswers, setPracticeAnswers] = useState<PracticeAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // ---------------------------------------------------------------------------
  // STATE: UI Display Flags
  // ---------------------------------------------------------------------------
  // showResults - Display the practice results card after completing all questions.
  // showCompletion - Display the lesson completion UI.
  const [showResults, setShowResults] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------
  // Boolean flags computed from state for conditional rendering and UI logic.
  const allSectionsReviewed = Object.values(reviewedSections).every(Boolean)
  const practiceComplete = practiceAnswers.length === practiceQuestions.length
  const score = practiceAnswers.filter(a => a.isCorrect).length
  const percentage = Math.round((score / practiceQuestions.length) * 100)

  // ---------------------------------------------------------------------------
  // DERIVED STATE: Topic Counts
  // ---------------------------------------------------------------------------
  // Counts how many questions have been answered from each practice topic.
  // Used for the PracticeMetaRow topic breakdown.
  const topicCounts = useMemo(() => {
    return practiceAnswers.reduce<Record<PracticeTopic, number>>(
      (acc, a) => {
        const q = practiceQuestions.find(x => x.id === a.questionId)
        if (!q) return acc
        acc[q.topic] = (acc[q.topic] || 0) + 1
        return acc
      },
      { nepas: 0, other: 0, 'passe-compose': 0, structure: 0 }
    )
  }, [practiceAnswers])

  // ---------------------------------------------------------------------------
  // HANDLER: Audio Playback
  // ---------------------------------------------------------------------------
  // Plays French audio for example sentences.
  // Stops any currently playing audio before starting new clip.
  const playAudio = (audioSrc: string, id: string) => {
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

  // ---------------------------------------------------------------------------
  // HANDLER: Mark Section Reviewed
  // ---------------------------------------------------------------------------
  // Updates the reviewed status of a lesson section.
  const markSectionReviewed = (section: SectionKey) => {
    setReviewedSections(prev => ({ ...prev, [section]: true }))
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Practice Answer Selection
  // ---------------------------------------------------------------------------
  // Selects an option for the current question.
  // Disabled while feedback is showing.
  const handlePracticeAnswer = (optionIndex: number) => {
    if (showFeedback) return
    setSelectedOption(optionIndex)
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Submit Practice Answer
  // ---------------------------------------------------------------------------
  // Validates the selected answer, records it, and displays feedback.
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

  // ---------------------------------------------------------------------------
  // HANDLER: Next Question
  // ---------------------------------------------------------------------------
  // Advances to the next practice question or shows results if complete.
  const nextQuestion = () => {
    const nextIndex = currentPracticeIndex + 1
    setSelectedOption(null)
    setShowFeedback(false)
    setCurrentPracticeIndex(nextIndex)
    if (nextIndex >= practiceQuestions.length) setShowResults(true)
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Retake Practice
  // ---------------------------------------------------------------------------
  // Resets all practice state to start fresh.
  const retakePractice = () => {
    setCurrentPracticeIndex(0)
    setPracticeAnswers([])
    setSelectedOption(null)
    setShowFeedback(false)
    setShowResults(false)
    setShowCompletion(false)
  }

  // ---------------------------------------------------------------------------
  // HANDLER: Continue From Results
  // ---------------------------------------------------------------------------
  // Transitions from results screen to lesson completion UI.
  const continueFromResults = () => {
    setShowResults(false)
    setShowCompletion(true)
  }

  // ---------------------------------------------------------------------------
  // DERIVED: Lesson Completion Status
  // ---------------------------------------------------------------------------
  // Flags to determine if lesson is ready to complete and if fully complete.
  const lessonReadyToComplete = allSectionsReviewed && practiceComplete
  const lessonComplete = lessonReadyToComplete && showCompletion

  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/classes/A1"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
          >
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A1 Lessons</span>
          </Link>
        </div>

        {/* =================================================================
            HEADER SECTION
            ================================================================= */}
        <LessonHeader />

        {/* =================================================================
            PROGRESS BAR
            Shows lesson progress: sections reviewed and practice questions answered.
            ================================================================= */}
        <ProgressBar
          reviewedSections={reviewedSections}
          practiceProgress={practiceAnswers.length}
          totalPractice={practiceQuestions.length}
        />

        {/* =================================================================
            SECTION 1: Quick Recap - ne...pas
            Reviews the most common French negation form.
            Shows positive → negative transformations with examples.
            ================================================================= */}
        <SectionCard
          title="Quick recap: ne...pas"
          subtitle="The most common negation"
          icon="🚫"
          isReviewed={reviewedSections.recap}
          onMarkReviewed={() => markSectionReviewed('recap')}
          index={0}
        >
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 mb-4">
              <strong>Ne...pas</strong> is the most common negation in French. It “wraps around” the verb.
            </p>

            <div className="space-y-4">
              {nePasExamples.map((ex, idx) => (
                <TwoLineExample
                  key={idx}
                  positive={ex.french}
                  negative={ex.negative}
                  english={ex.english}
                  index={idx}
                />
              ))}
            </div>

            <div className="mt-5 bg-purple-50 rounded-xl p-4 border border-purple-200 text-sm text-purple-900">
              <strong>Note:</strong> <strong>ne</strong> becomes <strong>n’</strong> before a vowel or silent h.
            </div>
          </div>
        </SectionCard>

        {/* =================================================================
            SECTION 2: Structure
            Explains the formula for negation in present tense and passé composé.
            Uses FormulaCard components to show the patterns.
            ================================================================= */}
        <SectionCard
          title="How negation works (structure)"
          subtitle="Present vs passé composé"
          icon="🧩"
          isReviewed={reviewedSections.structure}
          onMarkReviewed={() => markSectionReviewed('structure')}
          index={1}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormulaCard
              title="Present tense"
              formula="Subject + ne + verb + negation word"
              examples={[
                "Je ne mange pas.",
                "Je ne mange jamais ici."
              ]}
              accent="blue"
            />
            <FormulaCard
              title="Passé composé"
              formula="Subject + ne + auxiliary + negation + past participle"
              examples={[
                "Je n’ai pas mangé.",
                "Elle n’est jamais arrivée."
              ]}
              accent="purple"
            />
          </div>
        </SectionCard>

        {/* =================================================================
            SECTION 3: Other Negations
            Covers ne...jamais, ne...plus, ne...rien, ne...personne, ne...guerre.
            Uses NegationCard to display each form with meaning and examples.
            ================================================================= */}
        <SectionCard
          title="Other common negations"
          subtitle="Same structure — only the second word changes"
          icon="📌"
          isReviewed={reviewedSections.other}
          onMarkReviewed={() => markSectionReviewed('other')}
          index={2}
        >
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="text-sm text-slate-700 mb-4 space-y-1">
              <p><strong>Helper:</strong> All of these follow the same structure as ne...pas.</p>
              <p>Only the second word changes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {negations.map((n, idx) => (
                <NegationCard
                  key={n.form}
                  form={n.form}
                  meaning={n.meaning}
                  examples={n.examples}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* =================================================================
            SECTION 4: Negation in Passé Composé
            Explains that negation wraps around the auxiliary (avoir/être).
            Shows examples with audio playback.
            ================================================================= */}
        <SectionCard
          title="Negation in passé composé"
          subtitle="Negation wraps around the auxiliary"
          icon="⏳"
          isReviewed={reviewedSections.pc}
          onMarkReviewed={() => markSectionReviewed('pc')}
          index={3}
        >
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <p className="text-amber-900 mb-4">
              In passé composé, negation goes around the <strong>auxiliary</strong> (avoir/être), not the past participle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {passeComposeNegation.map((ex, idx) => (
                <ExampleCard
                  key={idx}
                  french={ex.french}
                  english={ex.english}
                  tag="past"
                  isPlaying={currentlyPlaying === `pc-${idx}`}
                  onPlay={() => playAudio(`/audio/a1/negations/passe-compose/${idx + 1}.mp3`, `pc-${idx}`)}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* =================================================================
            SECTION 5: Important Patterns and Rules
            Three key patterns:
            1. ne → n' before vowels
            2. Negation surrounds auxiliary in passé composé
            3. de replaces un/une/des in negatives
            ================================================================= */}
        <SectionCard
          title="Important patterns and rules"
          subtitle="3 beginner-safe rules"
          icon="🧠"
          isReviewed={reviewedSections.patterns}
          onMarkReviewed={() => markSectionReviewed('patterns')}
          index={4}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <RuleCard
              title="1) ne → n’"
              body="Before a vowel or silent h, ne becomes n’."
              examples={["Elle n’aime pas le café.", "Je n’ai pas mangé."]}
              accent="purple"
            />
            <RuleCard
              title="2) Past tense"
              body="In passé composé, negation surrounds the auxiliary."
              examples={["Je n’ai pas mangé.", "Nous n’avons rien vu."]}
              accent="blue"
            />
            <RuleCard
              title="3) de in negatives"
              body="“De” often replaces un/une/des in negatives."
              examples={["J’ai un chien → Je n’ai pas de chien.", "Elle a des amis → Elle n’a pas d’amis."]}
              accent="amber"
            />
          </div>
        </SectionCard>

        {/* =================================================================
            SECTION 6: Guided Examples
            Mixed present and passé composé sentences for practice.
            Each example shows French, English, and tense tag with audio.
            ================================================================= */}
        <SectionCard
          title="Guided examples"
          subtitle="Notice the tense + the negation word"
          icon="🗣️"
          isReviewed={reviewedSections.guided}
          onMarkReviewed={() => markSectionReviewed('guided')}
          index={5}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {guidedExamples.map((ex, idx) => (
              <ExampleCard
                key={idx}
                french={ex.french}
                english={ex.english}
                tag={ex.tag === 'present' ? 'present' : 'past'}
                isPlaying={currentlyPlaying === `guided-${idx}`}
                onPlay={() => playAudio(`/audio/a1/negations/guided/${idx + 1}.mp3`, `guided-${idx}`)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* =================================================================
            INTERACTIVE PRACTICE SECTION
            20 multiple-choice questions covering all negation topics.
            Displays PracticeMetaRow (topic breakdown) and PracticeCard.
            Shows PracticeResultsCard when all questions are answered.
            ================================================================= */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <span className="text-2xl">✏️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Guided interactive practice</h2>
              <p className="text-sm text-slate-600">20 questions, one at a time</p>
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

        {/* =================================================================
            LESSON COMPLETION UI
            Animated card shown when all sections reviewed and practice complete.
            Displays recap of learned concepts and navigation buttons.
            ================================================================= */}
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
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    You’ve completed Lesson 10.
                  </h2>
                  <p className="text-slate-700 mb-4">
                    You can now form negative sentences using ne...pas and other common negations, in the present and passé composé.
                  </p>

                  <div className="bg-white rounded-xl p-4 border border-green-200 text-sm text-slate-700">
                    <div className="font-semibold text-slate-800 mb-2">Recap</div>
                    <ul className="space-y-1">
                      <li>- <strong>ne...pas</strong> (not)</li>
                      <li>- Other negations: <strong>jamais, plus, rien, personne, guerre</strong></li>
                      <li>- Placement rules (present vs passé composé)</li>
                      <li>- <strong>de</strong> often replaces un/une/des in negatives</li>
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
                        Retake
                      </button>
                      <Link
                        href="/classes/A1"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transition-all"
                      >
                        Next lesson
                        <FaArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =================================================================
        STICKY FOOTER
        Shows lesson progress status and the Continue button.
        - Amber status: sections pending review
        - Amber status: practice pending
        - Green status: lesson complete
        Continue button is disabled until lesson is ready to complete.
        ================================================================= */}
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

// =============================================================================
// SUB-COMPONENT: LessonHeader
// =============================================================================

/**
 * LessonHeader - Displays the lesson title, badge, and description.
 *
 * Features:
 * - A1 Lesson 10 badge with gradient background
 * - Main title "Negation in French"
 * - Subtitle describing the lesson scope
 * - Fade-in animation on page load
 */
function LessonHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-slate-800 rounded-full text-white text-sm font-medium mb-4">
        <span>A1 Lesson 10</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        Negation in French
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        Learn how to say ‘not’, ‘never’, ‘nothing’, 'hardly' and more in French.
      </p>
      <p className="text-sm text-slate-500">
        Review ne...pas and discover other common negative structures.
      </p>
    </motion.div>
  )
}

// =============================================================================
// SUB-COMPONENT: ProgressBar
// =============================================================================

/**
 * ProgressBar - Visual indicator of lesson progress.
 *
 * Calculates total progress based on:
 * - Number of sections reviewed (6 total)
 * - Number of practice questions answered (20 total)
 * - Progress is divided by 7 (6 sections + practice)
 *
 * @param reviewedSections - Object tracking reviewed status of each section
 * @param practiceProgress - Number of practice questions answered so far
 * @param totalPractice - Total number of practice questions (20)
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
  const sections = ['recap', 'structure', 'other', 'pc', 'patterns', 'guided'] as const
  const completedSections = sections.filter(s => reviewedSections[s]).length
  const totalProgress = ((completedSections + practiceProgress / totalPractice) / 7) * 100

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
        <span>{completedSections}/6 sections reviewed</span>
        <span>•</span>
        <span>{practiceProgress}/{totalPractice} practice questions</span>
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENT: SectionCard
// =============================================================================

/**
 * SectionCard - Wrapper component for lesson content sections.
 *
 * Features:
 * - Gradient icon with unique color per section (based on index)
 * - Title and subtitle header
 * - "Mark as Reviewed" / "Reviewed" button with visual feedback
 * - Animation on mount with staggered delay
 *
 * @param title - Section title displayed in the header
 * @param subtitle - Section subtitle providing additional context
 * @param icon - Emoji icon displayed in the section badge
 * @param isReviewed - Whether this section has been marked as reviewed
 * @param onMarkReviewed - Callback to mark the section as reviewed
 * @param index - Section index for color rotation and animation delay
 * @param children - Content to display inside the card
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
  const colors = [
    'from-slate-700 to-purple-700',
    'from-blue-600 to-cyan-600',
    'from-amber-500 to-orange-500',
    'from-purple-500 to-blue-500',
    'from-emerald-500 to-teal-500',
    'from-indigo-500 to-purple-500'
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
                isReviewed ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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

// =============================================================================
// SUB-COMPONENT: TwoLineExample
// =============================================================================

/**
 * TwoLineExample - Displays a positive sentence and its negative form.
 *
 * Shows the transformation from affirmative to negative with:
 * - Original French sentence (positive)
 * - Transformed French sentence (negative, highlighted in purple)
 * - English translation
 *
 * Used in the ne...pas recap section.
 *
 * @param positive - The original affirmative sentence
 * @param negative - The negative version of the sentence
 * @param english - English translation
 * @param index - Index for animation stagger delay
 */
function TwoLineExample({
  positive,
  negative,
  english,
  index
}: {
  positive: string
  negative: string
  english: string
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="text-sm text-slate-500 font-semibold mb-2">Positive → Negative</div>
      <div className="space-y-2">
        <div className="font-semibold text-slate-800">{positive}</div>
        <div className="font-semibold text-slate-800">
          <span className="text-slate-400">→ </span>
          <span className="text-purple-700">{negative}</span>
        </div>
        <div className="text-sm text-slate-600">{english}</div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// SUB-COMPONENT: FormulaCard
// =============================================================================

/**
 * FormulaCard - Displays a negation formula with examples.
 *
 * Used in the "Structure" section to show:
 * - Present tense negation formula
 * - Passé composé negation formula
 *
 * Color-coded by accent: blue for present, purple for passé composé.
 *
 * @param title - Formula title (e.g., "Present tense", "Passé composé")
 * @param formula - The grammatical formula string
 * @param examples - Array of example sentences
 * @param accent - Color scheme: 'blue' for present, 'purple' for passé composé
 */
function FormulaCard({
  title,
  formula,
  examples,
  accent
}: {
  title: string
  formula: string
  examples: string[]
  accent: 'blue' | 'purple'
}) {
  const styles = accent === 'blue'
    ? { bg: 'bg-blue-50', border: 'border-blue-200', chip: 'bg-blue-100 text-blue-700' }
    : { bg: 'bg-purple-50', border: 'border-purple-200', chip: 'bg-purple-100 text-purple-700' }

  return (
    <div className={`rounded-2xl p-5 border-2 ${styles.bg} ${styles.border}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${styles.chip}`}>pattern</span>
      </div>
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="text-sm text-slate-600 font-semibold">{formula}</div>
        <div className="mt-3 space-y-2">
          {examples.map((ex, idx) => (
            <div key={idx} className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              {ex}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENT: NegationCard
// =============================================================================

/**
 * NegationCard - Displays information about a specific negation form.
 *
 * Used in the "Other negations" section to show:
 * - ne...jamais (never)
 * - ne...plus (no longer)
 * - ne...rien (nothing)
 * - ne...personne (nobody)
 * - ne...guerre (hardly)
 *
 * @param form - The negation form (e.g., "ne...jamais")
 * @param meaning - English meaning of the negation
 * @param examples - Array of French/English example sentences
 * @param index - Index for animation stagger delay
 */
function NegationCard({
  form,
  meaning,
  examples,
  index
}: {
  form: string
  meaning: string
  examples: { french: string; english: string }[]
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-bold text-slate-800">{form}</div>
          <div className="text-sm text-slate-600">{meaning}</div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-700 font-semibold">negation</span>
      </div>
      <div className="mt-3 space-y-2">
        {examples.map((ex, idx2) => (
          <div key={idx2} className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="font-semibold text-slate-800">{ex.french}</div>
            <div className="text-sm text-slate-600">{ex.english}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// =============================================================================
// SUB-COMPONENT: ExampleCard
// =============================================================================

/**
 * ExampleCard - Displays a French sentence with audio playback.
 *
 * Features:
 * - Tense badge (present = blue, passé composé = amber)
 * - French sentence text
 * - English translation
 * - Play button with audio state indicator
 *
 * Used in guided examples and passé composé sections.
 *
 * @param french - The French sentence to display
 * @param english - English translation
 * @param tag - Tense indicator: 'present' or 'past'
 * @param isPlaying - Whether audio is currently playing for this card
 * @param onPlay - Callback to trigger audio playback
 * @param index - Index for animation stagger delay
 */
function ExampleCard({
  french,
  english,
  tag,
  isPlaying,
  onPlay,
  index
}: {
  french: string
  english: string
  tag: 'present' | 'past'
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  const chip = tag === 'present' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
  const label = tag === 'present' ? 'present' : 'passé composé'

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

// =============================================================================
// SUB-COMPONENT: RuleCard
// =============================================================================

/**
 * RuleCard - Displays an important negation rule with examples.
 *
 * Used in the "Important patterns" section for:
 * - Rule 1: ne → n' before vowels
 * - Rule 2: Negation surrounds auxiliary in passé composé
 * - Rule 3: de replaces un/une/des in negatives
 *
 * @param title - Rule title/number
 * @param body - Rule explanation text
 * @param examples - Array of example sentences demonstrating the rule
 * @param accent - Color scheme: 'purple', 'blue', or 'amber'
 */
function RuleCard({
  title,
  body,
  examples,
  accent
}: {
  title: string
  body: string
  examples: string[]
  accent: 'purple' | 'blue' | 'amber'
}) {
  const styles =
    accent === 'purple'
      ? { bg: 'bg-purple-50', border: 'border-purple-200', chip: 'bg-purple-100 text-purple-700' }
      : accent === 'blue'
      ? { bg: 'bg-blue-50', border: 'border-blue-200', chip: 'bg-blue-100 text-blue-700' }
      : { bg: 'bg-amber-50', border: 'border-amber-200', chip: 'bg-amber-100 text-amber-700' }

  return (
    <div className={`rounded-2xl p-5 border-2 ${styles.bg} ${styles.border}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${styles.chip}`}>rule</span>
      </div>
      <p className="text-sm text-slate-700 mb-3">{body}</p>
      <div className="space-y-2">
        {examples.map((ex, idx) => (
          <div key={idx} className="text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2">
            {ex}
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENT: PracticeMetaRow
// =============================================================================

/**
 * PracticeMetaRow - Displays practice quiz progress and topic breakdown.
 *
 * Shows:
 * - Number of questions answered out of total
 * - Chip breakdown by topic (ne...pas, other, passé composé, structure)
 *
 * @param answered - Number of questions answered so far
 * @param total - Total number of practice questions
 * @param counts - Object tracking answered count per topic
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
        <Chip label={`ne...pas: ${counts.nepas}`} />
        <Chip label={`other: ${counts.other}`} />
        <Chip label={`passé composé: ${counts['passe-compose']}`} />
        <Chip label={`structure: ${counts.structure}`} />
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENT: Chip
// =============================================================================

/**
 * Chip - Small badge component for displaying topic counts.
 *
 * Used within PracticeMetaRow to show how many questions
 * have been answered from each topic category.
 *
 * @param label - Text to display inside the chip (e.g., "ne...pas: 3")
 */
function Chip({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
      {label}
    </span>
  )
}

// =============================================================================
// SUB-COMPONENT: PracticeCard
// =============================================================================

/**
 * PracticeCard - Interactive multiple-choice question card.
 *
 * Features:
 * - Question prompt with topic badge
 * - Four selectable answer options
 * - Visual feedback on selection (purple highlight)
 * - Correct/incorrect feedback after submission (green/red)
 * - Random encouraging feedback messages
 * - "Check Answer" / "Next Question" buttons
 *
 * @param question - The practice question data
 * @param questionNumber - Current question number (1-20)
 * @param totalQuestions - Total number of questions (20)
 * @param selectedOption - Index of currently selected option (null if none)
 * @param showFeedback - Whether to show correct/incorrect feedback
 * @param onSelectOption - Callback when user selects an option
 * @param onSubmit - Callback to submit the selected answer
 * @param onNext - Callback to advance to the next question
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
  const isCorrect = selectedOption === question.correct

  const feedbackMessagesCorrect = ["Nice 😏", "Good catch", "That’s right", "You’re getting the pattern"]
  const feedbackMessagesWrong = ["Careful now…", "Good try — check the placement", "Almost — notice the structure"]
  const message = isCorrect
    ? feedbackMessagesCorrect[Math.floor(Math.random() * feedbackMessagesCorrect.length)]
    : feedbackMessagesWrong[Math.floor(Math.random() * feedbackMessagesWrong.length)]

  const topicBadge =
    question.topic === 'nepas'
      ? 'bg-purple-100 text-purple-700'
      : question.topic === 'other'
      ? 'bg-blue-100 text-blue-700'
      : question.topic === 'passe-compose'
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

// =============================================================================
// SUB-COMPONENT: PracticeResultsCard
// =============================================================================

/**
 * PracticeResultsCard - Displays final practice quiz results.
 *
 * Features:
 * - Score display (e.g., "15/20")
 * - Percentage calculation
 * - Personalized feedback message based on score:
 *   - Score ≤ 7: "Good effort — negation takes practice"
 *   - Score 8-13: "Nice progress — you're understanding the patterns"
 *   - Score ≥ 14: "Great job — you're using negation well"
 * - Visual progress bar
 * - Retake and Continue buttons
 *
 * @param score - Number of correctly answered questions
 * @param total - Total number of questions (20)
 * @param onRetake - Callback to restart the practice quiz
 * @param onContinue - Callback to proceed to lesson completion
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
  const percentage = Math.round((score / total) * 100)

  const feedback =
    score <= 7
      ? {
          title: "Good effort — negation takes practice.",
          body: "Review the patterns, then retake the practice. A small review can help a lot."
        }
      : score <= 13
      ? {
          title: "Nice progress — you're understanding the patterns.",
          body: "You’re getting the placement right. Keep going and repeat the structures."
        }
      : {
          title: "Great job — you’re using negation well.",
          body: "You can use different negations and place them correctly."
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
          <div className="text-sm text-slate-500 mb-1">Score</div>
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
          Retake
        </button>
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transition-all"
        >
          Continue
          <FaArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}

