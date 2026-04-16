/**
 * A1 Lesson 1 - Personal Pronouns and Articles Page
 * =================================================
 *
 * This page implements the first A1 lesson covering:
 * - French subject pronouns (je, tu, il, elle, nous, vous, ils, elles)
 * - Definite articles (le, la, l', les)
 * - Indefinite articles (un, une, des)
 * - Article usage comparison
 * - Practice questions with feedback
 *
 * Features:
 * ---------
 * - Interactive audio playback for pronunciation
 * - Section review tracking with visual indicators
 * - Progress persistence using localStorage
 * - Multiple-choice practice with immediate feedback
 * - Animated UI transitions with Framer Motion
 * - Responsive grid layout for cards
 *
 * State Management:
 * ---------------
 * - playCounts: Tracks audio play frequency per item
 * - currentlyPlaying: Currently active audio element
 * - reviewedSections: Which sections have been marked as reviewed
 * - currentPracticeIndex: Current question in practice sequence
 * - practiceAnswers: User's answer history with correctness
 * - selectedOption: Currently selected answer option
 * - showFeedback: Whether to show answer feedback
 * - isClient: Hydration flag for Next.js
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import { useState, useRef, useEffect } from 'react'

// Framer Motion for smooth animations
import { motion, AnimatePresence } from 'framer-motion'

// React Icons for visual elements
import { FaPlay, FaCheck, FaArrowRight, FaHome, FaChevronRight } from 'react-icons/fa'

// Next.js Link for client-side navigation
import Link from 'next/link'

// Lesson data: pronouns, articles, comparisons, and practice questions
import { pronouns, definiteArticles, indefiniteArticles, comparisonExamples, practiceQuestions } from './data'

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * SectionReview Interface
 * -----------------------
 * Tracks which lesson sections have been reviewed by the user.
 * All sections must be reviewed before practice unlocks.
 */
interface SectionReview {
  pronouns: boolean     // Subject pronouns section
  definite: boolean     // Definite articles section
  indefinite: boolean   // Indefinite articles section
  comparison: boolean   // Article comparison section
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
 * A1LessonPage Component
 * ----------------------
 * Main lesson page component that manages the entire lesson flow.
 * Handles audio playback, section review, practice questions, and progress tracking.
 */
export default function A1LessonPage() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // playCounts: Maps item IDs to number of times audio has been played
  const [playCounts, setPlayCounts] = useState<{[key: string]: number}>({})

  // currentlyPlaying: ID of the currently playing audio item (null if none)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)

  // reviewedSections: Tracks which content sections user has marked as reviewed
  const [reviewedSections, setReviewedSections] = useState<SectionReview>({
    pronouns: false,
    definite: false,
    indefinite: false,
    comparison: false
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
   * This restores user's previous progress if they return to the lesson.
   */
  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a1Lesson1Progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      setReviewedSections(parsed.reviewedSections || { pronouns: false, definite: false, indefinite: false, comparison: false })
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
      localStorage.setItem('a1Lesson1Progress', JSON.stringify({
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
   * playAudio - Plays pronunciation audio for a lesson item
   * @param audioSrc - URL path to the audio file
   * @param id - Unique identifier for the item being played
   *
   * Handles:
   * - Stopping any currently playing audio
   * - Creating new audio element
   * - Updating playing state
   * - Incrementing play count when audio ends
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
   * @param section - Key of the section to mark (pronouns, definite, indefinite, comparison)
   */
  const markSectionReviewed = (section: keyof SectionReview) => {
    setReviewedSections(prev => ({ ...prev, [section]: true }))
  }

  /**
   * handlePracticeAnswer - Handles user selecting an answer option
   * @param optionIndex - Index of the selected option (0, 1, or 2)
   *
   * Does nothing if feedback is already being shown for current question.
   */
  const handlePracticeAnswer = (optionIndex: number) => {
    if (showFeedback) return  // Prevent changing answer after submission
    setSelectedOption(optionIndex)
  }

  /**
   * submitAnswer - Submits the selected answer and shows feedback
   *
   * Validates the answer against the correct answer and records it in history.
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
   *
   * Resets selection and feedback for the next question.
   */
  const nextQuestion = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    setCurrentPracticeIndex(prev => prev + 1)
  }

  // ============================================================================
  // DERIVED STATE
  // ============================================================================

  // Check if all content sections have been reviewed
  const allSectionsReviewed = Object.values(reviewedSections).every(v => v)

  // Check if all practice questions have been answered
  const practiceComplete = practiceAnswers.length === practiceQuestions.length

  // Count of correctly answered practice questions
  const correctAnswers = practiceAnswers.filter(a => a.isCorrect).length

  // Lesson is complete only when all sections reviewed AND all practice done
  const lessonComplete = allSectionsReviewed && practiceComplete

  // ============================================================================
  // RENDER - JSX STRUCTURE
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-32">
      {/* Main lesson container with gradient background padding for sticky footer */}
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
            SECTION 1: Subject Pronouns (je, tu, il, elle, nous, vous, ils, elles)
            - 8 pronoun cards in a responsive 2-column grid
            - Each card has audio playback and example sentences
            ---------------------------------------------------------- */}
        <SectionCard
          title="Subject Personal Pronouns"
          subtitle="Learn who is doing the action"
          icon="👤"
          isReviewed={reviewedSections.pronouns}
          onMarkReviewed={() => markSectionReviewed('pronouns')}
          index={0}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pronouns.map((pronoun, idx) => (
              <PronounCard
                key={pronoun.id}
                pronoun={pronoun}
                playCount={playCounts[pronoun.id] || 0}
                isPlaying={currentlyPlaying === pronoun.id}
                onPlay={() => playAudio(pronoun.audioSrc, pronoun.id)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 2: Definite Articles (le, la, l', les)
            - 4 article cards showing "the" forms
            - Color-coded with blue theme
            ---------------------------------------------------------- */}
        <SectionCard
          title="Definite Articles (the)"
          subtitle="Use these when talking about specific things"
          icon="📌"
          isReviewed={reviewedSections.definite}
          onMarkReviewed={() => markSectionReviewed('definite')}
          index={1}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {definiteArticles.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                type="definite"
                playCount={playCounts[article.id] || 0}
                isPlaying={currentlyPlaying === article.id}
                onPlay={() => playAudio(article.audioSrc, article.id)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 3: Indefinite Articles (un, une, des)
            - 3 article cards showing "a/an/some" forms
            - Color-coded with emerald theme
            ---------------------------------------------------------- */}
        <SectionCard
          title="Indefinite Articles (a, an, some)"
          subtitle="Use these when talking about things in general"
          icon="📝"
          isReviewed={reviewedSections.indefinite}
          onMarkReviewed={() => markSectionReviewed('indefinite')}
          index={2}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {indefiniteArticles.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                type="indefinite"
                playCount={playCounts[article.id] || 0}
                isPlaying={currentlyPlaying === article.id}
                onPlay={() => playAudio(article.audioSrc, article.id)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 4: Definite vs Indefinite Comparison
            - Side-by-side comparison of article usage
            - Tips for choosing between definite and indefinite
            ---------------------------------------------------------- */}
        <SectionCard
          title="Definite vs Indefinite Articles"
          subtitle="See the difference between specific and general"
          icon="🔄"
          isReviewed={reviewedSections.comparison}
          onMarkReviewed={() => markSectionReviewed('comparison')}
          index={3}
        >
          <ComparisonBlock />
        </SectionCard>

        {/* ----------------------------------------------------------
            SECTION 5: Practice Questions
            - 8 multiple-choice questions
            - Shows current question or completion card
            - Tracks score and provides feedback
            ---------------------------------------------------------- */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <span className="text-2xl">✏️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Practice Time</h2>
              <p className="text-sm text-slate-600">Test your understanding with 8 questions</p>
            </div>
          </div>

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

        {/* Completion Section */}
        <AnimatePresence>
          {lessonComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaCheck className="text-white text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Nice work — you've completed A1 Lesson 1!
              </h2>
              <p className="text-slate-600 mb-6">
                You now know the basic subject pronouns and articles in French.
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{correctAnswers}/8</div>
                  <div className="text-sm text-slate-500">Practice Score</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
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
          <button
            disabled={!lessonComplete}
            onClick={() => window.location.href = '/classes/A1/lesson2'}
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
 * Displays the lesson title, badge, and description.
 * Includes a fade-in animation from top on mount.
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
        <span>A1 Lesson 1</span>
      </div>
      {/* Main lesson title */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        Personal Pronouns and Articles
      </h1>
      {/* Lesson description */}
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        Learn how to say who is doing the action and how to use 'the', 'a', and 'an' in French.
      </p>
      {/* Instructions */}
      <p className="text-sm text-slate-500">
        Read the examples, listen to the words, and complete the practice before moving on.
      </p>
    </motion.div>
  )
}

/**
 * ProgressBar Component
 * ---------------------
 * Displays overall lesson progress including:
 * - Number of reviewed sections (4 total)
 * - Number of completed practice questions (8 total)
 * - Animated progress bar showing percentage complete
 *
 * Progress calculation: (reviewedSections + practiceProgress) / 5 * 100
 * (4 sections + 1 practice section = 5 total progress units)
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
  const sections = ['pronouns', 'definite', 'indefinite', 'comparison'] as const
  const completedSections = sections.filter(s => reviewedSections[s]).length
  
  // Calculate total progress percentage (4 sections + 1 practice = 5 units)
  const totalProgress = ((completedSections + practiceProgress / totalPractice) / 5) * 100

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
        <span>{completedSections}/4 sections reviewed</span>
        <span>•</span>
        <span>{practiceProgress}/{totalPractice} practice questions</span>
      </div>
    </div>
  )
}

/**
 * SectionCard Component
 * -------------------
 * Container component for lesson content sections.
 * Features:
 * - Color-coded header based on section index
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
  // Gradient colors for each section index (cycles through 4 colors)
  const colors = [
    'from-purple-500 to-pink-500',   // Section 0: Pronouns
    'from-blue-500 to-cyan-500',     // Section 1: Definite Articles
    'from-emerald-500 to-teal-500',  // Section 2: Indefinite Articles
    'from-orange-500 to-amber-500'   // Section 3: Comparison
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

        {/* Section Content: Render children (cards, examples, etc.) */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * PronounCard Component
 * ---------------------
 * Card displaying a French subject pronoun with:
 * - French word (large, bold)
 * - Phonetic pronunciation
 * - English translation
 * - Example sentence in French with translation
 * - Audio play button with loading state
 */
function PronounCard({ pronoun, playCount, isPlaying, onPlay, index }: {
  pronoun: typeof pronouns[0]
  playCount: number
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}  // Stagger animation
      className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-purple-300 transition-colors"
    >
      {/* Header: French word, phonetic, and play button */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">{pronoun.french}</h3>
          <p className="text-sm text-purple-600 font-medium">/{pronoun.phonetic}/</p>
        </div>
        {/* Audio play button with loading animation */}
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${pronoun.french}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying
              ? 'bg-purple-100 text-purple-600 animate-pulse'
              : 'bg-white text-purple-600 hover:bg-purple-50 shadow-sm'
          }`}
        >
          <FaPlay size={16} />
        </button>
      </div>
      {/* English translation */}
      <p className="text-sm text-slate-600 mb-2">{pronoun.english}</p>
      {/* Example sentence with translation */}
      <div className="text-sm text-slate-500 bg-white rounded-lg p-2 border border-slate-100">
        <span className="font-medium text-slate-700">{pronoun.example}</span>
        <span className="text-slate-400"> — {pronoun.exampleEnglish}</span>
      </div>
    </motion.div>
  )
}

/**
 * ArticleCard Component
 * ---------------------
 * Card displaying a French article (definite or indefinite) with:
 * - Article word (le, la, un, une, etc.)
 * - Phonetic pronunciation
 * - Usage context (masculine, feminine, plural, etc.)
 * - Example phrase with English translation
 * - Audio play button
 * - Color-coded by article type (blue=definite, emerald=indefinite)
 */
function ArticleCard({ article, type, playCount, isPlaying, onPlay, index }: {
  article: typeof definiteArticles[0] | typeof indefiniteArticles[0]
  type: 'definite' | 'indefinite'
  playCount: number
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  // Color scheme based on article type
  const bgColor = type === 'definite' ? 'bg-blue-50 border-blue-200' : 'bg-emerald-50 border-emerald-200'
  const textColor = type === 'definite' ? 'text-blue-600' : 'text-emerald-600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`${bgColor} rounded-xl p-4 border hover:shadow-sm transition-all`}
    >
      {/* Header: Article, phonetic, and play button */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-slate-800">{article.article}</span>
          <span className={`text-sm ${textColor} font-medium`}>/{article.phonetic}/</span>
        </div>
        {/* Audio play button */}
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${article.article}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying
              ? 'bg-white text-purple-600 animate-pulse'
              : 'bg-white text-slate-600 hover:text-purple-600 shadow-sm'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
      {/* Usage context */}
      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{article.usage}</p>
      {/* Example with translation */}
      <p className="text-sm font-medium text-slate-700">
        {article.example} <span className="text-slate-500">= {article.english}</span>
      </p>
    </motion.div>
  )
}

/**
 * ComparisonBlock Component
 * -------------------------
 * Displays side-by-side comparison of definite vs indefinite articles.
 * Features:
 * - 3 comparison cards showing the same noun with both article types
 * - Color-coded badges (blue=definite, emerald=indefinite)
 * - Tips section explaining when to use each article type
 */
function ComparisonBlock() {
  return (
    <div className="space-y-4">
      {/* Comparison examples grid */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {comparisonExamples.map((ex, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 border border-slate-200">
              {/* Noun label */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400 uppercase">{ex.noun}</span>
              </div>
              {/* Definite vs Indefinite comparison */}
              <div className="space-y-2">
                {/* Definite article (blue) */}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">{ex.definite.split(' ')[0]}</span>
                  <span className="text-slate-600">{ex.definiteEnglish}</span>
                </div>
                {/* Indefinite article (emerald) */}
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm font-medium">{ex.indefinite.split(' ')[0]}</span>
                  <span className="text-slate-600">{ex.indefiniteEnglish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key tips section */}
      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">💡 Key Tips</h4>
        <ul className="space-y-2 text-sm text-purple-700">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Use <strong>definite articles</strong> (le, la, l', les) when you mean a specific thing.</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Use <strong>indefinite articles</strong> (un, une, des) when you mean one thing in general, or some things.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

/**
 * PracticeCard Component
 * ----------------------
 * Interactive multiple-choice question card for practice section.
 * Features:
 * - Question number indicator (e.g., "Question 3 of 8")
 * - Topic badge (pronouns, definite, indefinite) with color coding
 * - 3 answer options with visual selection state
 * - Immediate feedback with correct/incorrect highlighting
 * - Random positive feedback messages for correct answers
 * - Detailed explanation after answering
 * - Submit and Next Question buttons
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
  question: typeof practiceQuestions[0]
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  showFeedback: boolean
  onSelectOption: (index: number) => void
  onSubmit: () => void
  onNext: () => void
}) {
  // Check if user's selected answer matches correct answer
  const isCorrect = selectedOption === question.correct

  // Array of positive feedback messages for correct answers (randomly selected)
  const feedbackMessages = [
    "Nice 😏",
    "Good catch",
    "You got it",
    "Perfect",
    "Well done"
  ]
  const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]

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
        {/* Topic badge with color coding */}
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          question.topic === 'pronouns' 
            ? 'bg-purple-100 text-purple-700'
            : question.topic === 'definite'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-emerald-100 text-emerald-700'
        }`}>
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
 * - Score display (e.g., "You scored 7 out of 8")
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
