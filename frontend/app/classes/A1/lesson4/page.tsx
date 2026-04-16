/**
 * A1 Lesson 4 - French Prepositions Page
 * =======================================
 *
 * This page implements A1 Lesson 4, teaching French prepositions and their usage.
 * Prepositions are small words that connect parts of sentences and show relationships
 * like location, movement, origin, and relationships between words.
 *
 * Page Structure:
 * ---------------
 * 1. Header with back navigation and lesson title
 * 2. Progress bar showing lesson completion
 * 3. Six content sections (all must be reviewed to complete lesson):
 *    - What is a preposition? (Introduction)
 *    - Core prepositions (8 prepositions with audio)
 *    - Prepositions in context (Location, Movement, Origin, Relationship)
 *    - Verb + preposition patterns (Common combinations)
 *    - Contractions (à/de + le/les)
 *    - Guided examples (Annotated sentences with audio)
 * 4. Guided interactive practice (16 multiple-choice questions)
 * 5. Results and completion cards
 * 6. Sticky footer with lesson completion status
 *
 * State Management:
 * -----------------
 * - reviewedSections: Tracks which content sections user has marked as reviewed
 * - currentlyPlaying: ID of currently playing audio
 * - currentPracticeIndex: Current question index in practice section
 * - practiceAnswers: User's answers with correctness tracking
 * - selectedOption: Currently selected answer option
 * - showFeedback/showResults/showCompletion: UI visibility flags
 *
 * Key Features:
 * -------------
 * - Audio playback for prepositions and example sentences
 * - Section-by-section progress tracking
 * - Interactive practice with immediate feedback
 * - Score calculation and performance-based encouragement
 * - Sticky footer with completion CTA
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management, memoization, and DOM refs
import { useMemo, useRef, useState } from 'react'

// Framer Motion for smooth animations and transitions
import { motion, AnimatePresence } from 'framer-motion'

// Font Awesome icons for UI elements
import {
  FaArrowRight,   // Navigation arrows
  FaCheck,        // Checkmarks for completion states
  FaChevronRight, // Next question indicator
  FaHome,         // Back to lessons link
  FaPlay,         // Audio play button
  FaRedoAlt       // Retake practice button
} from 'react-icons/fa'

// Next.js navigation for routing
import Link from 'next/link'

// Lesson data imports (prepositions, patterns, examples, practice questions)
import {
  guidedExamples,
  practiceQuestions,
  prepositions,
  verbPrepositionPatterns,
  type PracticeQuestion,
  type PracticeTopic
} from './data'

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * SectionKey - Union type for all lesson content section identifiers.
 * Each key corresponds to a collapsible/reviewable content section.
 */
type SectionKey =
  | 'what'           // Introduction: What is a preposition?
  | 'core'           // Core prepositions with audio
  | 'context'        // Prepositions in context (location/movement/origin/relationship)
  | 'verbPatterns'   // Verb + preposition patterns
  | 'contractions'   // à/de contractions with articles
  | 'guidedExamples' // Annotated example sentences

/**
 * SectionReview - Record type tracking review status for each section.
 * All sections must be marked reviewed to enable lesson completion.
 */
type SectionReview = Record<SectionKey, boolean>

/**
 * PracticeAnswer - Tracks a user's answer to a practice question.
 * - questionId: Links to the question
 * - selectedOption: Index of chosen answer (0-3)
 * - isCorrect: Whether the answer was correct
 */
type PracticeAnswer = {
  questionId: number
  selectedOption: number
  isCorrect: boolean
}

/**
 * A1Lesson4Page - Main component for A1 Lesson 4: French Prepositions
 *
 * This component manages the complete lesson flow including:
 * - Content section review tracking
 * - Audio playback for prepositions and examples
 * - Interactive practice quiz with 16 questions
 * - Score calculation and completion tracking
 */
export default function A1Lesson4Page() {
  // ===========================================================================
  // STATE: Section Review Tracking
  // ===========================================================================

  /**
   * reviewedSections - Tracks which content sections the user has marked as reviewed.
   * All 6 sections must be marked true before the lesson can be completed.
   */
  const [reviewedSections, setReviewedSections] = useState<SectionReview>({
    what: false,
    core: false,
    context: false,
    verbPatterns: false,
    contractions: false,
    guidedExamples: false
  })

  // ===========================================================================
  // STATE: Audio Playback
  // ===========================================================================

  /**
   * currentlyPlaying - ID of the audio currently playing (e.g., "prep-à", "ex-1").
   * Used to show playing state on audio buttons.
   */
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  /**
   * audioRef - Ref to the currently playing HTMLAudioElement.
   * Used to pause previous audio when new audio starts.
   */
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ===========================================================================
  // STATE: Practice Quiz
  // ===========================================================================

  /**
   * currentPracticeIndex - Index of the current practice question (0-15).
   * Increments as user progresses through the quiz.
   */
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)

  /**
   * practiceAnswers - Array of user's answers to practice questions.
   * Each answer stores the question ID, selected option, and correctness.
   */
  const [practiceAnswers, setPracticeAnswers] = useState<PracticeAnswer[]>([])

  /**
   * selectedOption - Index of the currently selected answer option (0-3).
   * Null when no option is selected. Reset between questions.
   */
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  /**
   * showFeedback - Controls visibility of the answer feedback panel.
   * True after user submits an answer.
   */
  const [showFeedback, setShowFeedback] = useState(false)

  // ===========================================================================
  // STATE: Results and Completion
  // ===========================================================================

  /**
   * showResults - Controls visibility of the practice results card.
   * Shown after all questions are answered.
   */
  const [showResults, setShowResults] = useState(false)

  /**
   * showCompletion - Controls visibility of the lesson completion celebration.
   * Shown when user clicks Continue from results.
   */
  const [showCompletion, setShowCompletion] = useState(false)

  // ===========================================================================
  // COMPUTED VALUES: Progress and Completion
  // ===========================================================================

  /** True when all 6 content sections have been marked as reviewed */
  const allSectionsReviewed = Object.values(reviewedSections).every(Boolean)

  /** True when user has answered all 16 practice questions */
  const practiceComplete = practiceAnswers.length === practiceQuestions.length

  /** Count of correct answers from the practice quiz */
  const correctAnswers = practiceAnswers.filter(a => a.isCorrect).length

  /** Practice score as a percentage (0-100) */
  const percentage = Math.round((correctAnswers / practiceQuestions.length) * 100)

  // ===========================================================================
  // COMPUTED VALUES: Topic Distribution
  // ===========================================================================

  /**
   * topicLabel - Aggregated count of answered questions by topic.
   * Used to display practice progress breakdown (Meaning, Completion, etc.)
   */
  const topicLabel = useMemo(() => {
    const counts = practiceAnswers.reduce<Record<PracticeTopic, number>>(
      (acc, a) => {
        const q = practiceQuestions.find(x => x.id === a.questionId)
        if (!q) return acc
        acc[q.topic] = (acc[q.topic] || 0) + 1
        return acc
      },
      { meaning: 0, completion: 0, 'verb-pattern': 0, contraction: 0 }
    )
    return counts
  }, [practiceAnswers])

  // ===========================================================================
  // HANDLERS: Audio Playback
  // ===========================================================================

  /**
   * playAudio - Plays pronunciation audio for prepositions or examples.
   * - Pauses any currently playing audio
   * - Creates new Audio instance and plays it
   * - Updates currentlyPlaying state for UI feedback
   * - Resets state when audio finishes or errors
   *
   * @param audioSrc - Path to the audio file
   * @param id - Unique identifier for this audio (used for playing state)
   */
  const playAudio = (audioSrc: string, id: string) => {
    // Pause any existing audio playback
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    // Create and play new audio
    const audio = new Audio(audioSrc)
    audioRef.current = audio
    setCurrentlyPlaying(id)

    // Handle play errors (e.g., file not found)
    audio.play().catch(() => {
      setCurrentlyPlaying(null)
    })

    // Reset playing state when audio finishes
    audio.onended = () => {
      setCurrentlyPlaying(null)
    }
  }

  // ===========================================================================
  // HANDLERS: Section Review
  // ===========================================================================

  /**
   * markSectionReviewed - Marks a content section as reviewed.
   * Called when user clicks "Mark as Reviewed" button in a section.
   *
   * @param section - The section key to mark as reviewed
   */
  const markSectionReviewed = (section: SectionKey) => {
    setReviewedSections(prev => ({ ...prev, [section]: true }))
  }

  // ===========================================================================
  // HANDLERS: Practice Quiz Answer Selection
  // ===========================================================================

  /**
   * handlePracticeAnswer - Called when user selects an answer option.
   * Does nothing if feedback is already showing (prevents changing answer).
   *
   * @param optionIndex - Index of selected option (0-3)
   */
  const handlePracticeAnswer = (optionIndex: number) => {
    if (showFeedback) return  // Prevent changing answer after submission
    setSelectedOption(optionIndex)
  }

  // ===========================================================================
  // HANDLERS: Practice Quiz Submission
  // ===========================================================================

  /**
   * submitAnswer - Validates the selected answer and shows feedback.
   * Records the answer with correctness in practiceAnswers array.
   */
  const submitAnswer = () => {
    if (selectedOption === null) return  // Require selection
    const currentQuestion = practiceQuestions[currentPracticeIndex]
    const isCorrect = selectedOption === currentQuestion.correct

    // Record the answer
    setPracticeAnswers(prev => [
      ...prev,
      { questionId: currentQuestion.id, selectedOption, isCorrect }
    ])
    setShowFeedback(true)  // Show correct/incorrect feedback
  }

  /**
   * nextQuestion - Advances to next question or shows results if complete.
   * Resets selection and feedback state for the new question.
   */
  const nextQuestion = () => {
    const nextIndex = currentPracticeIndex + 1
    setSelectedOption(null)
    setShowFeedback(false)
    setCurrentPracticeIndex(nextIndex)

    // Show results when all questions answered
    if (nextIndex >= practiceQuestions.length) {
      setShowResults(true)
    }
  }

  // ===========================================================================
  // HANDLERS: Practice Reset and Completion
  // ===========================================================================

  /**
   * retakePractice - Resets the practice quiz to initial state.
   * Clears all answers and returns to question 1.
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
   * continueFromResults - Transitions from results to completion screen.
   */
  const continueFromResults = () => {
    setShowResults(false)
    setShowCompletion(true)
  }

  // ===========================================================================
  // COMPUTED: Lesson Completion Status
  // ===========================================================================

  /** True when all conditions met: sections reviewed, practice complete, completion shown */
  const lessonComplete = allSectionsReviewed && practiceComplete && showCompletion

  // ===========================================================================
  // RENDER: Main Page Layout
  // ===========================================================================
  return (
    // Main container with gradient background and bottom padding for sticky footer
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ---------------------------------------------------------------
            NAVIGATION: Back to A1 lessons link
            --------------------------------------------------------------- */}
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
            PROGRESS BAR: Visual progress indicator
            Shows section review count and practice question progress
            --------------------------------------------------------------- */}
        <ProgressBar
          reviewedSections={reviewedSections}
          practiceProgress={practiceAnswers.length}
          totalPractice={practiceQuestions.length}
        />

        {/* ---------------------------------------------------------------
            SECTION 1: What is a preposition?
            Introduction to prepositions concept
            --------------------------------------------------------------- */}
        <SectionCard
          title="What is a preposition?"
          subtitle="Small word, big meaning"
          icon="🧩"
          isReviewed={reviewedSections.what}
          onMarkReviewed={() => markSectionReviewed('what')}
          index={0}
        >
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>A <strong>preposition</strong> is a small word that connects parts of a sentence.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>It often shows <strong>place</strong>, <strong>direction</strong>, <strong>time</strong>, or a relationship.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>In French, prepositions are used <strong>very frequently</strong>.</span>
              </li>
            </ul>

            <div className="mt-6 bg-white rounded-lg p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3">Examples:</h4>
              <div className="space-y-2 text-slate-600">
                <p><span className="font-medium text-purple-600">Je suis à la maison.</span></p>
                <p><span className="font-medium text-purple-600">Le livre est sur la table.</span></p>
                <p><span className="font-medium text-purple-600">Il parle avec son ami.</span></p>
              </div>
              <div className="mt-4 bg-purple-50 rounded-lg p-3 border border-purple-200 text-sm text-purple-800">
                <strong>Helper note:</strong> Prepositions are small, but very important.
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------
            SECTION 2: Core prepositions
            Grid of 8 prepositions with pronunciation audio
            --------------------------------------------------------------- */}
        <SectionCard
          title="Core prepositions"
          subtitle="Learn them through patterns + examples"
          icon="🗺️"
          isReviewed={reviewedSections.core}
          onMarkReviewed={() => markSectionReviewed('core')}
          index={1}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prepositions.map((p, idx) => (
              <PrepositionCard
                key={p.prep}
                prep={p.prep}
                english={p.english}
                example={p.example}
                phonetic={p.phonetic}
                isPlaying={currentlyPlaying === `prep-${p.prep}`}
                onPlay={() => playAudio(p.audioSrc, `prep-${p.prep}`)}
                index={idx}
              />
            ))}
          </div>
          <div className="mt-5 bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-700">
            <strong>Pattern tip:</strong> Try to notice what comes after the preposition (a place, a person, a country, a thing) rather than memorizing the English word.
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------
            SECTION 3: Prepositions in context
            Four context groups: Location, Movement, Origin, Relationship
            --------------------------------------------------------------- */}
        <SectionCard
          title="Prepositions in context"
          subtitle="Location, movement, origin, relationship"
          icon="📍"
          isReviewed={reviewedSections.context}
          onMarkReviewed={() => markSectionReviewed('context')}
          index={2}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ContextGroup
              title="Location"
              subtitle="Where is it?"
              color="blue"
              items={[
                { label: "dans (inside)", example: "Le chat est dans la maison." },
                { label: "sur (on)", example: "Le livre est sur la table." },
                { label: "sous (under)", example: "Le sac est sous la table." }
              ]}
            />
            <ContextGroup
              title="Movement"
              subtitle="Where are you going?"
              color="emerald"
              items={[
                { label: "à (to)", example: "Je vais à Paris." },
                { label: "en (to/in countries)", example: "Je vais en France." }
              ]}
            />
            <ContextGroup
              title="Origin"
              subtitle="Where are you from?"
              color="amber"
              items={[
                { label: "de (from)", example: "Je viens de France." }
              ]}
            />
            <ContextGroup
              title="Relationship"
              subtitle="With / for"
              color="purple"
              items={[
                { label: "avec (with)", example: "Je parle avec Marie." },
                { label: "pour (for)", example: "C’est pour toi." }
              ]}
            />
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------
            SECTION 4: Verb + preposition patterns
            8 common verb-preposition combinations
            --------------------------------------------------------------- */}
        <SectionCard
          title="Verb + preposition patterns"
          subtitle="Learn the verb together with the preposition"
          icon="🔗"
          isReviewed={reviewedSections.verbPatterns}
          onMarkReviewed={() => markSectionReviewed('verbPatterns')}
          index={3}
        >
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <p className="text-slate-700 mb-4">
              In French, some verbs are followed by specific prepositions. These combinations are best learned as one “chunk”.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verbPrepositionPatterns.map((v, idx) => (
                <VerbPatternCard
                  key={v.verb}
                  verb={v.verb}
                  english={v.english}
                  example={v.example}
                  index={idx}
                />
              ))}
            </div>
            <div className="mt-4 bg-white rounded-lg p-4 border border-slate-200 text-sm text-slate-700">
              <strong>Pattern tip:</strong> When you learn a verb, ask: “Does this verb usually use <em>à</em> or <em>de</em>?”
            </div>
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------
            SECTION 5: Contractions
            à/de + le/les → au, aux, du, des
            --------------------------------------------------------------- */}
        <SectionCard
          title="Important combinations to remember"
          subtitle="Common contractions with à and de"
          icon="🧠"
          isReviewed={reviewedSections.contractions}
          onMarkReviewed={() => markSectionReviewed('contractions')}
          index={4}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContractionCard left="à + le" right="au" example="Je vais au marché." />
            <ContractionCard left="à + les" right="aux" example="Il parle aux enfants." />
            <ContractionCard left="de + le" right="du" example="Elle joue du piano." />
            <ContractionCard left="de + les" right="des" example="Nous parlons des films." />
          </div>
          <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-200 text-sm text-amber-900">
            <strong>Beginner-safe rule:</strong> When you see <strong>au/aux</strong>, think “à + the”. When you see <strong>du/des</strong>, think “de + the”.
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------
            SECTION 6: Guided examples
            8 annotated example sentences with audio
            --------------------------------------------------------------- */}
        <SectionCard
          title="Guided examples"
          subtitle="Read, notice patterns, then copy the structure"
          icon="🗣️"
          isReviewed={reviewedSections.guidedExamples}
          onMarkReviewed={() => markSectionReviewed('guidedExamples')}
          index={5}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {guidedExamples.map((ex, idx) => (
              <GuidedExampleCard
                key={ex.id}
                french={ex.french}
                english={ex.english}
                focus={ex.focus}
                isPlaying={currentlyPlaying === ex.id}
                onPlay={() => playAudio(ex.audioSrc, ex.id)}
                index={idx}
              />
            ))}
          </div>
          <div className="mt-5 bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-700">
            <strong>Mini-drill:</strong> Replace the last word to make your own sentence. Example: “Je vais au marché.” → “Je vais au café.”
          </div>
        </SectionCard>

        {/* ---------------------------------------------------------------
            PRACTICE SECTION: Interactive quiz
            16 multiple-choice questions with progress tracking
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
              <PracticeMetaRow
                answered={practiceAnswers.length}
                total={practiceQuestions.length}
                counts={topicLabel}
              />

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

        {/* Completion section */}
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
                    Nice work — you finished A1 Lesson 4!
                  </h2>
                  <p className="text-slate-700 mb-3">
                    You can now recognize common prepositions, use them in simple sentences, and spot verb + preposition patterns.
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-green-200 text-sm text-slate-700">
                    <div className="font-semibold text-slate-800 mb-2">Quick recap</div>
                    <ul className="space-y-1">
                      <li>- <strong>Location</strong>: dans, sur, sous</li>
                      <li>- <strong>Movement</strong>: à, en</li>
                      <li>- <strong>Origin</strong>: de</li>
                      <li>- <strong>Relationship</strong>: avec, pour</li>
                      <li>- <strong>Verb chunks</strong>: parler à / parler de, avoir besoin de…</li>
                      <li>- <strong>Contractions</strong>: au/aux, du/des</li>
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
                        href="/classes/A1/lesson5"
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

      {/* ---------------------------------------------------------------
          STICKY FOOTER: Fixed position footer with progress status
          Shows current lesson state and Continue button
          --------------------------------------------------------------- */}
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
            disabled={!allSectionsReviewed || !practiceComplete}
            onClick={() => {
              if (!allSectionsReviewed || !practiceComplete) return
              setShowCompletion(true)
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }}
            className={`shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              allSectionsReviewed && practiceComplete
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
 * Uses Framer Motion for fade-in animation on page load.
 */
function LessonHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
        <span>A1 Lesson 4</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        A1 Lesson 4 — French Prepositions
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        Learn how prepositions connect words and how they are used in everyday French.
      </p>
      <p className="text-sm text-slate-500">
        Read the examples, notice patterns, and complete the practice to build confidence.
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
 * - reviewedSections: Object tracking which sections are reviewed
 * - practiceProgress: Number of practice questions answered
 * - totalPractice: Total number of practice questions
 *
 * Calculates total progress from 6 sections + practice (divided by 7).
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
  // Array of section keys for calculating progress
  const sections = ['what', 'core', 'context', 'verbPatterns', 'contractions', 'guidedExamples'] as const
  const completedSections = sections.filter(s => reviewedSections[s]).length
  // Calculate percentage: (sections + practice progress) / 7 total items
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
 * SectionCard - Reusable card wrapper for lesson content sections.
 *
 * Props:
 * - title: Section title
 * - subtitle: Section subtitle/description
 * - icon: Emoji icon for visual identification
 * - isReviewed: Whether section has been marked as reviewed
 * - onMarkReviewed: Callback when user marks section as reviewed
 * - index: Section index (0-5) for color theming and animation delay
 * - children: Section content
 *
 * Features:
 * - Gradient color theming based on index
 * - Staggered animation delay based on index
 * - "Mark as Reviewed" button with visual state change
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
  // Gradient color pairs for section icons based on index
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-indigo-500 to-purple-500',
    'from-rose-500 to-pink-500'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-8"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center text-white shadow-md`}
              >
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
                isReviewed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
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
// SUB-COMPONENT: PrepositionCard
// =============================================================================

/**
 * PrepositionCard - Displays a single preposition with audio playback.
 *
 * Props:
 * - prep: The French preposition (e.g., "à", "de")
 * - english: English translation
 * - example: Example sentence using the preposition
 * - phonetic: IPA-like pronunciation guide
 * - isPlaying: Whether this preposition's audio is currently playing
 * - onPlay: Callback to play pronunciation audio
 * - index: Index for staggered animation
 */
function PrepositionCard({
  prep,
  english,
  example,
  phonetic,
  isPlaying,
  onPlay,
  index
}: {
  prep: string
  english: string
  example: string
  phonetic: string
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl p-4 border-2 bg-slate-50 border-slate-200 hover:border-purple-300 transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-2 gap-3">
        <div>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-bold text-slate-800">{prep}</h3>
            <p className="text-sm text-purple-600 font-medium">/{phonetic}/</p>
          </div>
          <p className="text-sm text-slate-600">{english}</p>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${prep}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying
              ? 'bg-white text-purple-600 animate-pulse'
              : 'bg-white text-slate-600 hover:text-purple-600 shadow-sm'
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

// =============================================================================
// SUB-COMPONENT: ContextGroup
// =============================================================================

/**
 * ContextGroup - Displays a themed group of preposition examples by context.
 *
 * Props:
 * - title: Context category (e.g., "Location", "Movement")
 * - subtitle: Brief description of the context
 * - color: Theme color for the group (blue, emerald, amber, purple)
 * - items: Array of preposition examples with labels
 *
 * Used in Section 3 to group prepositions by usage context.
 */
function ContextGroup({
  title,
  subtitle,
  color,
  items
}: {
  title: string
  subtitle: string
  color: 'blue' | 'emerald' | 'amber' | 'purple'
  items: { label: string; example: string }[]
}) {
  // Dynamic Tailwind classes based on color theme
  const styles =
    color === 'blue'
      ? { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' }
      : color === 'emerald'
      ? { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' }
      : color === 'amber'
      ? { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' }
      : { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700' }

  return (
    <div className={`rounded-2xl p-5 border-2 ${styles.bg} ${styles.border}`}>
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${styles.badge}`}>context</span>
      </div>
      <div className="space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="font-semibold text-slate-800">{it.label}</div>
            <div className="text-sm text-slate-600 mt-1">{it.example}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENT: VerbPatternCard
// =============================================================================

/**
 * VerbPatternCard - Displays a verb + preposition combination.
 *
 * Props:
 * - verb: The French verb with preposition (e.g., "parler à")
 * - english: English translation
 * - example: Example sentence
 * - index: Index for staggered animation
 *
 * Used in Section 4 to teach common verb-preposition patterns.
 */
function VerbPatternCard({
  verb,
  english,
  example,
  index
}: {
  verb: string
  english: string
  example: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="bg-white rounded-xl p-4 border border-slate-200"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-bold text-slate-800">{verb}</div>
          <div className="text-sm text-slate-600">{english}</div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
          verb + prep
        </span>
      </div>
      <div className="mt-3 text-sm text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-200">
        {example}
      </div>
    </motion.div>
  )
}

// =============================================================================
// SUB-COMPONENT: ContractionCard
// =============================================================================

/**
 * ContractionCard - Displays a preposition + article contraction.
 *
 * Props:
 * - left: The preposition + article combination (e.g., "à + le")
 * - right: The contraction result (e.g., "au")
 * - example: Example sentence using the contraction
 *
 * Used in Section 5 to teach à/de + le/les contractions.
 */
function ContractionCard({ left, right, example }: { left: string; right: string; example: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-slate-500 font-medium">{left}</div>
        <div className="text-2xl font-bold text-purple-700">{right}</div>
      </div>
      <div className="mt-3 text-sm text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-200">
        {example}
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENT: GuidedExampleCard
// =============================================================================

/**
 * GuidedExampleCard - Displays an annotated example sentence with audio.
 *
 * Props:
 * - french: French sentence
 * - english: English translation
 * - focus: Learning focus note (e.g., "à + le → au")
 * - isPlaying: Whether audio is currently playing
 * - onPlay: Callback to play audio
 * - index: Index for staggered animation
 *
 * Used in Section 6 for guided example sentences.
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white rounded-2xl p-5 border border-slate-200"
    >
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
            isPlaying
              ? 'bg-purple-100 text-purple-600 animate-pulse'
              : 'bg-slate-50 text-slate-600 hover:text-purple-600 border border-slate-200'
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
// SUB-COMPONENT: PracticeMetaRow
// =============================================================================

/**
 * PracticeMetaRow - Displays practice quiz progress and topic breakdown.
 *
 * Props:
 * - answered: Number of questions answered
 * - total: Total number of questions
 * - counts: Record of answered questions by topic
 *
 * Shows topic chips for Meaning, Completion, Verb patterns, and Contractions.
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
        <Chip label={`Meaning: ${counts.meaning}`} />
        <Chip label={`Completion: ${counts.completion}`} />
        <Chip label={`Verb patterns: ${counts['verb-pattern']}`} />
        <Chip label={`Contractions: ${counts.contraction}`} />
      </div>
    </div>
  )
}

// =============================================================================
// SUB-COMPONENT: Chip
// =============================================================================

/**
 * Chip - Small badge component for displaying topic labels.
 *
 * Props:
 * - label: Text to display in the chip
 *
 * Used in PracticeMetaRow to show question topic counts.
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
 * Props:
 * - question: Current PracticeQuestion data
 * - questionNumber: Current question number (1-16)
 * - totalQuestions: Total number of questions (16)
 * - selectedOption: Index of selected answer option
 * - showFeedback: Whether to show correct/incorrect feedback
 * - onSelectOption: Callback when user selects an option
 * - onSubmit: Callback to submit the answer
 * - onNext: Callback to advance to next question
 *
 * Features:
 * - Topic-colored badge (blue, emerald, purple, amber)
 * - Visual selection states with radio-like indicators
 * - Correct/incorrect feedback with color coding
 * - Animated feedback panel with explanation
 * - Submit/Next button state transitions
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
  const topicBadge =
    question.topic === 'meaning'
      ? 'bg-blue-100 text-blue-700'
      : question.topic === 'completion'
      ? 'bg-emerald-100 text-emerald-700'
      : question.topic === 'verb-pattern'
      ? 'bg-purple-100 text-purple-700'
      : 'bg-amber-100 text-amber-700'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="text-sm font-medium text-slate-500">
          Question {questionNumber} of {totalQuestions}
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
  // Calculate percentage score
  const percentage = Math.round((score / total) * 100)

  // Performance-based feedback with three tiers
  const feedback =
    score <= 6
      ? {
          title: "Good effort — prepositions take time.",
          detail: "Retake the practice, or continue and review examples again later."
        }
      : score <= 12
      ? {
          title: "Nice progress — you're starting to see patterns.",
          detail: "You're building strong intuition. Try another run to make it automatic."
        }
      : {
          title: "Great job — you understand prepositions well.",
          detail: "You can recognize patterns and apply them in simple sentences."
        }

  // Render the results card with score, feedback, and actions
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
    >
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

