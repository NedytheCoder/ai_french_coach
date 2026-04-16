/**
 * A1 Lesson 8 - French Adjectives and Adverbs Page
 * ==================================================
 *
 * This page implements A1 Lesson 8, teaching French adjectives and adverbs.
 * The lesson covers common adjectives with gender agreement, adjective placement,
 * common adverbs, and the distinction between adjectives and adverbs.
 *
 * Page Structure:
 * ---------------
 * 1. Header with back navigation and lesson title
 * 2. Progress bar showing lesson completion (sticky)
 * 3. Eight collapsible content sections:
 *    - What is an adjective?
 *    - Common A1 adjectives (with audio)
 *    - Adjective agreement (masculine/feminine)
 *    - Adjective placement (before/after noun)
 *    - What is an adverb?
 *    - Common A1 adverbs
 *    - Compare: Adjectives vs Adverbs
 *    - Guided examples with audio
 * 4. Interactive Practice (16 questions)
 * 5. Completion section with score display
 *
 * State Management:
 * -----------------
 * - reviewedSections: Record tracking which sections have been opened
 * - currentlyPlaying: ID of currently playing audio
 * - currentPracticeIndex: Current question in practice quiz
 * - practiceAnswers: User's answers with correctness tracking
 * - selectedOption: Currently selected option in practice
 * - showFeedback: Whether to show answer feedback
 * - showResults: Whether to show practice results
 * - showCompletion: Whether to show lesson completion card
 *
 * Key Features:
 * -------------
 * - Audio playback for adjectives and examples
 * - Collapsible sections that auto-mark as reviewed when opened
 * - Interactive practice quiz with immediate feedback
 * - Topic-based question categorization
 * - Progress tracking with visual progress bar
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
  adjectives,
  adverbs,
  guidedExamples,
  placementExamples,
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
  | 'whatAdj'      // What is an adjective?
  | 'commonAdj'    // Common A1 adjectives
  | 'agreement'    // Adjective agreement
  | 'placement'    // Adjective placement
  | 'whatAdv'      // What is an adverb?
  | 'commonAdv'    // Common A1 adverbs
  | 'compare'      // Compare adjectives vs adverbs
  | 'guided'       // Guided examples

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

/**
 * A1Lesson8Page - Main component for A1 Lesson 8: Adjectives and Adverbs
 *
 * Manages the complete lesson flow including 8 content sections,
 * audio playback, and an interactive 16-question practice quiz.
 */
/**
 * A1Lesson8Page - Main component implementation
 *
 * Manages lesson state, audio playback, practice quiz, and completion tracking.
 */
export default function A1Lesson8Page() {
  // ===========================================================================
  // STATE: Section Review Tracking
  // ===========================================================================

  /**
   * reviewedSections - Tracks which of the 8 sections have been opened/reviewed.
   * Each section is initially false and set to true when expanded.
   */
  const [reviewedSections, setReviewedSections] = useState<SectionReview>({
    whatAdj: false,
    commonAdj: false,
    agreement: false,
    placement: false,
    whatAdv: false,
    commonAdv: false,
    compare: false,
    guided: false
  })

  // ===========================================================================
  // STATE: Audio Playback
  // ===========================================================================

  /**
   * currentlyPlaying - ID of the audio currently playing (null if none).
   * Used to show playing state on audio buttons.
   */
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  /**
   * audioRef - Ref to the currently playing HTMLAudioElement.
   * Used to pause audio when switching to a new one.
   */
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ===========================================================================
  // STATE: Practice Quiz
  // ===========================================================================

  /**
   * currentPracticeIndex - Index of the current practice question (0-15).
   */
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)

  /**
   * practiceAnswers - Array of user's answers to practice questions.
   * Stores question ID, selected option, and correctness.
   */
  const [practiceAnswers, setPracticeAnswers] = useState<PracticeAnswer[]>([])

  /**
   * selectedOption - Index of the currently selected option in practice.
   * Null if no option selected yet.
   */
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  /**
   * showFeedback - Whether to show answer feedback (correct/incorrect).
   * Set to true after submitting an answer.
   */
  const [showFeedback, setShowFeedback] = useState(false)

  /**
   * showResults - Whether to show the practice results screen.
   * Set to true after completing all 16 questions.
   */
  const [showResults, setShowResults] = useState(false)

  /**
   * showCompletion - Whether to show the lesson completion card.
   * Set to true when user chooses to continue from results.
   */
  const [showCompletion, setShowCompletion] = useState(false)

  // ===========================================================================
  // COMPUTED: Progress and Scores
  // ===========================================================================

  /** True when all 8 sections have been reviewed */
  const allSectionsReviewed = Object.values(reviewedSections).every(Boolean)

  /** True when all 16 practice questions have been answered */
  const practiceComplete = practiceAnswers.length === practiceQuestions.length

  /** Count of correct answers from the practice quiz */
  const correctAnswers = practiceAnswers.filter(a => a.isCorrect).length

  /** Percentage score (0-100) based on correct answers */
  const percentage = Math.round((correctAnswers / practiceQuestions.length) * 100)

  /**
   * topicCounts - Memoized count of answered questions by topic.
   * Used to show topic breakdown in practice metadata.
   */
  const topicCounts = useMemo(() => {
    return practiceAnswers.reduce<Record<PracticeTopic, number>>(
      (acc, a) => {
        const q = practiceQuestions.find(x => x.id === a.questionId)
        if (!q) return acc
        acc[q.topic] = (acc[q.topic] || 0) + 1
        return acc
      },
      { 'adj-recognition': 0, agreement: 0, 'adverb-usage': 0, 'adj-vs-adv': 0 }
    )
  }, [practiceAnswers])

  // ===========================================================================
  // HANDLER: Audio Playback
  // ===========================================================================

  /**
   * playAudio - Plays audio for a given source and tracks playing state.
   *
   * @param audioSrc - URL to the audio file
   * @param id - Unique identifier for the audio (for tracking playing state)
   */
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

  // ===========================================================================
  // HANDLER: Section Review
  // ===========================================================================

  /**
   * markSectionReviewed - Marks a section as reviewed.
   *
   * @param section - The section key to mark as reviewed
   */
  const markSectionReviewed = (section: SectionKey) => {
    setReviewedSections(prev => ({ ...prev, [section]: true }))
  }

  // ===========================================================================
  // HANDLERS: Practice Quiz
  // ===========================================================================

  /**
   * handlePracticeAnswer - Selects an option in the practice quiz.
   *
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
   * nextQuestion - Advances to the next practice question or shows results.
   */
  const nextQuestion = () => {
    const nextIndex = currentPracticeIndex + 1
    setSelectedOption(null)
    setShowFeedback(false)
    setCurrentPracticeIndex(nextIndex)
    if (nextIndex >= practiceQuestions.length) setShowResults(true)
  }

  /**
   * retakePractice - Resets the practice quiz to start over.
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
   * continueFromResults - Continues from results screen to completion card.
   */
  const continueFromResults = () => {
    setShowResults(false)
    setShowCompletion(true)
  }

  // ===========================================================================
  // COMPUTED: Lesson Completion
  // ===========================================================================

  /** True when all sections reviewed and practice completed */
  const lessonReadyToComplete = allSectionsReviewed && practiceComplete

  /** True when lesson is ready and completion card is shown */
  const lessonComplete = lessonReadyToComplete && showCompletion

  // ===========================================================================
  // RENDER: Main Page Layout
  // ===========================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back to home */}
        <div className="mb-6">
          <Link
            href="/classes/A1"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
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
            Shows section review count and practice progress
            --------------------------------------------------------------- */}
        <ProgressBar
          reviewedSections={reviewedSections}
          practiceProgress={practiceAnswers.length}
          totalPractice={practiceQuestions.length}
        />

        {/* ---------------------------------------------------------------
            CONTENT SECTIONS: 8 collapsible lesson sections
            --------------------------------------------------------------- */}

        {/* Section 1: What is an adjective? */}
        <SectionCard
          title="What is an adjective?"
          subtitle="Words that describe nouns"
          icon="🏷️"
          isReviewed={reviewedSections.whatAdj}
          onMarkReviewed={() => markSectionReviewed('whatAdj')}
          index={0}
        >
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>An <strong>adjective</strong> describes a noun (a person, place, or thing).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>It gives more information: size, color, quality, etc.</span>
              </li>
            </ul>

            <div className="mt-6 bg-white rounded-lg p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3">Examples:</h4>
              <div className="space-y-2 text-slate-600">
                <p><span className="font-medium text-purple-600">un grand livre</span></p>
                <p><span className="font-medium text-purple-600">une voiture rouge</span></p>
                <p><span className="font-medium text-purple-600">un petit chat</span></p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 2: Common A1 adjectives */}
        <SectionCard
          title="Common A1 adjectives"
          subtitle="Masculine + feminine forms"
          icon="📚"
          isReviewed={reviewedSections.commonAdj}
          onMarkReviewed={() => markSectionReviewed('commonAdj')}
          index={1}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adjectives.map((a, idx) => (
              <AdjectiveCard
                key={a.word}
                masculine={a.word}
                feminine={a.feminine}
                english={a.english}
                example={exampleForAdjective(a.word, a.feminine)}
                isPlaying={currentlyPlaying === `adj-${a.word}`}
                onPlay={() => playAudio(`/audio/a1/adj-adverbs/adjectives/${a.word}.mp3`, `adj-${a.word}`)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* Section 3: Adjective agreement */}
        <SectionCard
          title="Adjective agreement"
          subtitle="Masculine/feminine + singular/plural (basic)"
          icon="🧩"
          isReviewed={reviewedSections.agreement}
          onMarkReviewed={() => markSectionReviewed('agreement')}
          index={2}
        >
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 mb-4">
              In French, adjectives <strong>agree</strong> with the noun. That means the adjective can change for:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5">
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-500">•</span>
                <span><strong>Masculine</strong> vs <strong>feminine</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-500">•</span>
                <span><strong>Singular</strong> vs <strong>plural</strong> (basic intro)</span>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExampleCard
                title="Feminine often adds “e”"
                examples={[
                  { french: "un petit chat", english: "a small cat" },
                  { french: "une petite maison", english: "a small house" }
                ]}
              />
              <ExampleCard
                title="Plural often adds “s”"
                examples={[
                  { french: "une voiture rouge", english: "a red car" },
                  { french: "des voitures rouges", english: "red cars" }
                ]}
              />
            </div>

            <div className="mt-5 bg-amber-50 rounded-xl p-4 border border-amber-200 text-sm text-amber-900">
              <strong>Simple rule:</strong> often add <strong>e</strong> for feminine, and add <strong>s</strong> for plural.
            </div>
          </div>
        </SectionCard>

        {/* Section 4: Adjective placement */}
        <SectionCard
          title="Adjective placement"
          subtitle="Before vs after the noun"
          icon="📍"
          isReviewed={reviewedSections.placement}
          onMarkReviewed={() => markSectionReviewed('placement')}
          index={3}
        >
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 mb-4">
              Most adjectives come <strong>after</strong> the noun. Some very common adjectives often come <strong>before</strong>
              (think: small/big/beautiful/good, etc.).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {placementExamples.map((ex, idx) => (
                <PlacementCard key={idx} french={ex.french} english={ex.english} index={idx} />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Section 5: What is an adverb? */}
        <SectionCard
          title="What is an adverb?"
          subtitle="Words that modify verbs"
          icon="⚡"
          isReviewed={reviewedSections.whatAdv}
          onMarkReviewed={() => markSectionReviewed('whatAdv')}
          index={4}
        >
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl">•</span>
                <span>An <strong>adverb</strong> modifies a <strong>verb</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl">•</span>
                <span>It describes <strong>how</strong> something is done.</span>
              </li>
            </ul>

            <div className="mt-6 bg-white rounded-lg p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3">Examples:</h4>
              <div className="space-y-2 text-slate-600">
                <p><span className="font-medium text-blue-700">Il parle lentement.</span></p>
                <p><span className="font-medium text-blue-700">Elle travaille bien.</span></p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 7. Common A1 adverbs */}
        <SectionCard
          title="Common A1 adverbs"
          subtitle="Simple words you can use immediately"
          icon="🗣️"
          isReviewed={reviewedSections.commonAdv}
          onMarkReviewed={() => markSectionReviewed('commonAdv')}
          index={5}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adverbs.map((a, idx) => (
              <WordCard
                key={a.word}
                word={a.word}
                english={a.english}
                tag="adverb"
                isPlaying={currentlyPlaying === `adv-${a.word}`}
                onPlay={() => playAudio(`/audio/a1/adj-adverbs/adverbs/${a.word}.mp3`, `adv-${a.word}`)}
                index={idx}
              />
            ))}
          </div>
          <div className="mt-5 bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-700">
            <strong>Good news:</strong> Adverbs do <strong>not</strong> agree with nouns. They usually stay the same.
          </div>
        </SectionCard>

        {/* 8. Adjectives vs adverbs */}
        <SectionCard
          title="Adjectives vs adverbs"
          subtitle="Same idea, different job"
          icon="🔍"
          isReviewed={reviewedSections.compare}
          onMarkReviewed={() => markSectionReviewed('compare')}
          index={6}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CompareCard
              title="Adjective"
              bullets={[
                "describes a noun",
                "agrees with the noun (basic agreement)"
              ]}
              exampleFrench="Il est rapide."
              exampleEnglish="He is fast."
              accent="purple"
            />
            <CompareCard
              title="Adverb"
              bullets={[
                "describes a verb (an action)",
                "does NOT change form"
              ]}
              exampleFrench="Il court rapidement."
              exampleEnglish="He runs quickly."
              accent="blue"
            />
          </div>
        </SectionCard>

        {/* Section 8: Guided examples with audio */}
        <SectionCard
          title="Guided examples"
          subtitle="Read, notice patterns, then copy"
          icon="🧠"
          isReviewed={reviewedSections.guided}
          onMarkReviewed={() => markSectionReviewed('guided')}
          index={7}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {guidedExamples.map((ex, idx) => (
              <GuidedExampleCard
                key={ex.id}
                french={ex.french}
                english={ex.english}
                focus={ex.focus}
                isPlaying={currentlyPlaying === ex.id}
                onPlay={() => playAudio(`/audio/a1/adj-adverbs/examples/${ex.id}.mp3`, ex.id)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------
            PRACTICE SECTION: Interactive 16-question quiz
            --------------------------------------------------------------- */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <span className="text-2xl">✏️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Guided interactive practice</h2>
              <p className="text-sm text-slate-600">16 questions, one at a time</p>
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
                  onSelect={handlePracticeAnswer}
                  onSubmit={submitAnswer}
                  onNext={nextQuestion}
                />
              ) : (
                <ResultsCard
                  score={correctAnswers}
                  total={practiceQuestions.length}
                  onRetake={retakePractice}
                  onContinue={continueFromResults}
                />
              )}
            </div>
          ) : (
            <ResultsCard
              score={correctAnswers}
              total={practiceQuestions.length}
              onRetake={retakePractice}
              onContinue={continueFromResults}
            />
          )}
        </div>

        {/* 12. Completion */}
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
                    Nice work — you finished A1 Lesson 8!
                  </h2>
                  <p className="text-slate-700 mb-3">
                    You can now describe things with adjectives, and modify actions with adverbs.
                  </p>

                  <div className="bg-white rounded-xl p-4 border border-green-200 text-sm text-slate-700">
                    <div className="font-semibold text-slate-800 mb-2">Recap</div>
                    <ul className="space-y-1">
                      <li>- <strong>Adjectives</strong> describe nouns.</li>
                      <li>- <strong>Adverbs</strong> describe verbs.</li>
                      <li>- Adjectives can <strong>agree</strong>; adverbs usually <strong>do not change</strong>.</li>
                    </ul>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <div className="bg-white rounded-2xl p-5 border border-green-200 text-center">
                    <div className="text-sm text-slate-500 mb-1">Practice score</div>
                    <div className="text-3xl font-bold text-green-700">{correctAnswers}/16</div>
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

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {lessonComplete ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600 truncate">
                  Lesson complete! You’re ready for the next one.
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
 * Features a gradient banner with lesson info.
 */
function LessonHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
        <span>A1 Lesson 8</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        A1 Lesson 8 — Adjectives and Adverbs
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        Learn how to describe things and how to modify actions in French.
      </p>
      <p className="text-sm text-slate-500">
        Read the examples, notice the patterns, and complete the practice.
      </p>
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
 * - reviewedSections: Record of reviewed section statuses
 * - practiceProgress: Number of practice questions answered
 * - totalPractice: Total number of practice questions
 *
 * Features sticky positioning at top of viewport.
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
  const sections = [
    'whatAdj',
    'commonAdj',
    'agreement',
    'placement',
    'whatAdv',
    'commonAdv',
    'compare',
    'guided'
  ] as const
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
 * SectionCard - Reusable collapsible card wrapper for lesson sections.
 *
 * Props:
 * - title: Section title
 * - subtitle: Section subtitle
 * - icon: Emoji icon for the section
 * - isReviewed: Whether section has been reviewed
 * - onMarkReviewed: Callback when section is marked as reviewed
 * - children: Section content
 * - defaultOpen: Whether section starts expanded
 * - index: Index for animation delay
 *
 * Features:
 * - Auto-marks as reviewed when expanded
 * - Animated expand/collapse
 * - Visual review status indicator
 */
function SectionCard({
  title,
  subtitle,
  icon,
  isReviewed,
  onMarkReviewed,
  children,
  defaultOpen = false,
  index
}: {
  title: string
  subtitle: string
  icon: string
  isReviewed: boolean
  onMarkReviewed: () => void
  children: React.ReactNode
  defaultOpen?: boolean
  index: number
}) {
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

// =============================================================================
// HELPER COMPONENT: AdjectiveCard
// =============================================================================

/**
 * AdjectiveCard - Displays an adjective with masculine/feminine forms.
 *
 * Props:
 * - masculine: Masculine form of the adjective
 * - feminine: Feminine form of the adjective
 * - english: English translation
 * - example: Example phrase using the adjective
 * - isPlaying: Whether audio is currently playing
 * - onPlay: Callback to play audio
 * - index: Index for color cycling
 *
 * Features:
 * - Color-coded by index
 * - Audio playback button
 * - Shows gender forms and example
 */
function AdjectiveCard({
  masculine,
  feminine,
  english,
  example,
  isPlaying,
  onPlay,
  index
}: {
  masculine: string
  feminine: string
  english: string
  example: string
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="rounded-xl p-4 border-2 bg-slate-50 border-slate-200 hover:border-purple-300 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">masc</span>
            <span className="text-xl font-bold text-slate-800">{masculine}</span>
            <span className="text-slate-400">→</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">fem</span>
            <span className="text-xl font-bold text-purple-700">{feminine}</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">{english}</p>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${masculine}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying ? 'bg-white text-purple-600 animate-pulse' : 'bg-white text-slate-600 hover:text-purple-600 shadow-sm'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
      <div className="text-sm text-slate-500 bg-white rounded-lg p-3 border border-slate-100">
        <span className="font-medium text-slate-700">{example}</span>
      </div>
    </motion.div>
  )
}

function WordCard({
  word,
  english,
  tag,
  isPlaying,
  onPlay,
  index
}: {
  word: string
  english: string
  tag: 'adverb'
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="rounded-xl p-4 border-2 bg-slate-50 border-slate-200 hover:border-blue-300 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-800">{word}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">{tag}</span>
          </div>
          <p className="text-sm text-slate-600">{english}</p>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${word}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying ? 'bg-white text-blue-600 animate-pulse' : 'bg-white text-slate-600 hover:text-blue-600 shadow-sm'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
      <div className="text-xs text-slate-500 bg-white rounded-lg p-3 border border-slate-100">
        Example: {exampleForAdverb(word)}
      </div>
    </motion.div>
  )
}

// =============================================================================
// HELPER COMPONENT: ExampleCard
// =============================================================================

/**
 * ExampleCard - Displays a set of example phrases for a grammar rule.
 *
 * Props:
 * - title: Title of the example set
 * - examples: Array of French/English example pairs
 */
function ExampleCard({
  title,
  examples
}: {
  title: string
  examples: { french: string; english: string }[]
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="font-bold text-slate-800 mb-3">{title}</div>
      <div className="space-y-3">
        {examples.map((ex, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="font-semibold text-slate-800">{ex.french}</div>
            <div className="text-sm text-slate-600">{ex.english}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// HELPER COMPONENT: PlacementCard
// =============================================================================

/**
 * PlacementCard - Displays an adjective placement example.
 *
 * Props:
 * - french: French example phrase
 * - english: English translation
 * - index: Index for animation delay
 */
function PlacementCard({ french, english, index }: { french: string; english: string; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="text-lg font-bold text-slate-800">{french}</div>
      <div className="text-sm text-slate-600 mt-1">{english}</div>
    </motion.div>
  )
}

// =============================================================================
// HELPER COMPONENT: CompareCard
// =============================================================================

/**
 * CompareCard - Side-by-side comparison card for adjectives vs adverbs.
 *
 * Props:
 * - title: Title of the card (Adjective or Adverb)
 * - bullets: List of characteristic bullet points
 * - exampleFrench: French example sentence
 * - exampleEnglish: English translation
 * - accent: Color theme ('purple' or 'blue')
 */
function CompareCard({
  title,
  bullets,
  exampleFrench,
  exampleEnglish,
  accent
}: {
  title: string
  bullets: string[]
  exampleFrench: string
  exampleEnglish: string
  accent: 'purple' | 'blue'
}) {
  const header =
    accent === 'purple'
      ? 'bg-purple-50 border-purple-200'
      : 'bg-blue-50 border-blue-200'
  const badge =
    accent === 'purple'
      ? 'bg-purple-100 text-purple-700'
      : 'bg-blue-100 text-blue-700'

  return (
    <div className={`rounded-2xl p-5 border-2 ${header}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${badge}`}>{title.toLowerCase()}</span>
      </div>
      <ul className="space-y-2 text-slate-700 mb-4">
        {bullets.map((b, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="font-bold text-slate-500">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="font-semibold text-slate-800">{exampleFrench}</div>
        <div className="text-sm text-slate-600">{exampleEnglish}</div>
      </div>
    </div>
  )
}

// =============================================================================
// HELPER COMPONENT: GuidedExampleCard
// =============================================================================

/**
 * GuidedExampleCard - Individual guided example display with audio.
 *
 * Props:
 * - french: French example sentence
 * - english: English translation
 * - focus: Focus point explaining the grammar concept
 * - isPlaying: Whether audio is currently playing
 * - onPlay: Callback to play audio
 * - index: Index for animation delay
 */
function GuidedExampleCard({
  french,
  english,
  focus,
  isPlaying,
  onPlay,
  index
}: {
  french: string
  english: string
  focus: string
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-bold text-slate-800">{french}</div>
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
      <div className="mt-3 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-full inline-flex px-3 py-1">
        {focus}
      </div>
    </motion.div>
  )
}

// =============================================================================
// HELPER COMPONENT: PracticeMetaRow
// =============================================================================

/**
 * PracticeMetaRow - Displays practice progress and topic breakdown.
 *
 * Props:
 * - answered: Number of questions answered
 * - total: Total number of questions
 * - counts: Record of answered questions by topic
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
        <Chip label={`Adj recognition: ${counts['adj-recognition']}`} />
        <Chip label={`Agreement: ${counts.agreement}`} />
        <Chip label={`Adverb usage: ${counts['adverb-usage']}`} />
        <Chip label={`Adj vs adv: ${counts['adj-vs-adv']}`} />
      </div>
    </div>
  )
}

// =============================================================================
// HELPER COMPONENT: Chip
// =============================================================================

/**
 * Chip - Small badge component for topic labels.
 *
 * Props:
 * - label: Text to display in the chip
 */
function Chip({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
      {label}
    </span>
  )
}

/**
 * PracticeCard - Individual practice question card with options and feedback.
 *
 * Props:
 * - question: Current practice question data
 * - questionNumber: Current question number (1-16)
 * - totalQuestions: Total number of questions (16)
 * - selectedOption: Index of selected option (null if none)
 * - showFeedback: Whether to show answer feedback
 * - onSelect: Callback when an option is selected
 * - onSubmit: Callback to submit answer
 * - onNext: Callback to advance to next question
 */
function PracticeCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  showFeedback,
  onSelect,
  onSubmit,
  onNext
}: {
  question: PracticeQuestion
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  showFeedback: boolean
  onSelect: (index: number) => void
  onSubmit: () => void
  onNext: () => void
}) {
  const isCorrect = selectedOption === question.correct
  const topicBadge =
    question.topic === 'adj-recognition'
      ? 'bg-purple-100 text-purple-700'
      : question.topic === 'agreement'
      ? 'bg-amber-100 text-amber-700'
      : question.topic === 'adverb-usage'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-emerald-100 text-emerald-700'

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="text-sm font-medium text-slate-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${topicBadge}`}>{question.topic}</span>
      </div>

      <h3 className="text-lg font-medium text-slate-800 mb-6">{question.prompt}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            disabled={showFeedback}
            className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
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
                {showFeedback && selectedOption === idx && idx !== question.correct && <span className="text-white text-xs">×</span>}
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
          className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}
        >
          <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
            {isCorrect ? 'Nice — pattern spotted.' : 'Good effort — check the pattern.'}
          </p>
          <p className="text-sm text-slate-600">{question.explanation}</p>
        </motion.div>
      )}

      {!showFeedback ? (
        <button
          onClick={onSubmit}
          disabled={selectedOption === null}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            selectedOption !== null ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
 * ResultsCard - Displays practice quiz results with score and feedback.
 *
 * Props:
 * - score: Number of correct answers
 * - total: Total number of questions
 * - onRetake: Callback to retake the practice
 * - onContinue: Callback to continue to completion
 */
function ResultsCard({
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
    score <= 6
      ? {
          title: "Good effort — this takes practice.",
          detail: "Retake the practice, or continue and review examples again later."
        }
      : score <= 12
      ? {
          title: "Nice progress — you're understanding the patterns.",
          detail: "You’re building intuition. Another run will make it feel automatic."
        }
      : {
          title: "Great job — you’re using adjectives and adverbs well.",
          detail: "You can choose correct forms and use simple adverbs naturally."
        }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Practice results</h3>
          <p className="text-slate-600 mb-4">{feedback.title}</p>
          <p className="text-sm text-slate-500">{feedback.detail}</p>
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

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * exampleForAdjective - Generates an example phrase for an adjective.
 *
 * @param masc - Masculine form of the adjective
 * @param fem - Feminine form of the adjective
 * @returns Example phrase showing both forms
 */
function exampleForAdjective(masc: string, fem: string) {
  if (masc === 'grand') return `un grand livre → une ${fem} maison`
  if (masc === 'petit') return `un petit chat → une ${fem} maison`
  if (masc === 'bon') return `un bon café → une ${fem} idée`
  if (masc === 'mauvais') return `un mauvais film → une ${fem} journée`
  if (masc === 'beau') return `un beau jardin → une ${fem} photo`
  if (masc === 'jeune') return `un jeune homme → une ${fem} femme`
  if (masc === 'vieux') return `un vieux livre → une ${fem} ville`
  if (masc === 'rapide') return `un train rapide → une voiture ${fem}`
  if (masc === 'lent') return `un bus lent → une tortue ${fem}`
  if (masc === 'facile') return `un exercice facile → une question ${fem}`
  return `un ${masc} ... → une ${fem} ...`
}

/**
 * exampleForAdverb - Returns an example sentence for an adverb.
 *
 * @param word - The adverb to get an example for
 * @returns Example sentence using the adverb
 */
function exampleForAdverb(word: string) {
  const examples: Record<string, string> = {
    bien: 'Elle travaille bien.',
    mal: 'Il chante mal.',
    vite: 'Il court vite.',
    lentement: 'Elle parle lentement.',
    souvent: 'Nous allons souvent au parc.',
    toujours: 'Il est toujours ponctuel.',
    parfois: 'Nous mangeons parfois tard.',
    ici: 'Je suis ici.',
    là: 'Il est là.',
    très: 'C’est très bon.'
  }
  return examples[word] || ''
}


