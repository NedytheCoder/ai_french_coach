/**
 * A2 PracticeCard Component
 * ===========================
 *
 * This component renders an interactive practice question card for A2 lessons.
 * It displays multiple-choice questions with selectable options, provides
 * immediate feedback after submission, and tracks user progress.
 *
 * **Features:**
 * - Animated entrance with Framer Motion
 * - Question counter showing progress (e.g., "Question 3 of 15")
 * - Topic badges with color coding (verbs, tenses, vocabulary)
 * - Multiple-choice options with visual selection states
 * - Real-time feedback showing correct/incorrect answers
 * - Randomized encouraging messages for correct answers
 * - Detailed explanations for all answers
 * - Submit/Next navigation flow
 *
 * **Props:**
 * @param question - The question object with prompt, options, and explanation
 * @param questionNumber - Current question number (1-based)
 * @param totalQuestions - Total number of questions in the quiz
 * @param selectedOption - Index of currently selected option (null if none)
 * @param showFeedback - Whether to show answer feedback (after submission)
 * @param onSelectOption - Callback when user selects an option
 * @param onSubmit - Callback when user submits their answer
 * @param onNext - Callback when user proceeds to next question
 *
 * **Usage:**
 * ```tsx
 * <PracticeCard
 *   question={practiceQuestions[0]}
 *   questionNumber={1}
 *   totalQuestions={15}
 *   selectedOption={selectedOption}
 *   showFeedback={showFeedback}
 *   onSelectOption={setSelectedOption}
 *   onSubmit={handleSubmit}
 *   onNext={handleNext}
 * />
 * ```
 */

'use client'

// =============================================================================
// IMPORTS
// =============================================================================

// Framer Motion for animations
import { motion } from 'framer-motion'

// React Icons for UI elements
import { FaCheck, FaChevronRight } from 'react-icons/fa'

// =============================================================================
// TYPES
// =============================================================================

/**
 * Question - Shape of a practice quiz question.
 */
interface Question {
  id: number
  prompt: string
  options: string[]
  correct: number
  explanation: string
  topic?: string
}

/**
 * PracticeCardProps - Props for the practice card component.
 */
interface PracticeCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  showFeedback: boolean
  onSelectOption: (index: number) => void
  onSubmit: () => void
  onNext: () => void
}

// =============================================================================
// FEEDBACK MESSAGES
// =============================================================================

/**
 * feedbackMessages - Random encouraging messages for correct answers.
 */
const feedbackMessages = [
  "Excellent! 🎉",
  "Well done!",
  "Correct!",
  "Great job!",
  "Perfect!"
]

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * PracticeCard - Interactive practice question card with feedback.
 *
 * Renders a quiz question with:
 * - Question header with progress indicator and topic badge
 * - Question prompt text
 * - Selectable multiple-choice options with visual states
 * - Feedback section showing correctness and explanation
 * - Submit/Next action buttons
 *
 * @param question - The question object
 * @param questionNumber - Current question number
 * @param totalQuestions - Total questions in quiz
 * @param selectedOption - Currently selected option index
 * @param showFeedback - Whether feedback is visible
 * @param onSelectOption - Option selection callback
 * @param onSubmit - Submit answer callback
 * @param onNext - Next question callback
 * @returns JSX.Element - The rendered practice card
 */
export function PracticeCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  showFeedback,
  onSelectOption,
  onSubmit,
  onNext
}: PracticeCardProps) {
  // Determine if the selected answer is correct
  const isCorrect = selectedOption === question.correct
  
  // Select a random encouraging message for correct answers
  const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]

  // Get color classes based on question topic for the badge
  const getTopicColor = () => {
    if (question.topic === 'verbs') return 'bg-emerald-100 text-emerald-700'
    if (question.topic === 'tenses') return 'bg-cyan-100 text-cyan-700'
    if (question.topic === 'vocabulary') return 'bg-violet-100 text-violet-700'
    return 'bg-slate-100 text-slate-700'
  }

  // ===========================================================================
  // RENDER
  // ===========================================================================
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        {question.topic && (
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTopicColor()}`}>
            {question.topic}
          </span>
        )}
      </div>

      {/* Question Prompt */}
      <h3 className="text-lg font-medium text-slate-800 mb-6">{question.prompt}</h3>

      {/* Options */}
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
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                : 'border-slate-200 hover:border-emerald-300 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                showFeedback
                  ? idx === question.correct
                    ? 'border-green-500 bg-green-500'
                    : selectedOption === idx
                    ? 'border-red-500 bg-red-500'
                    : 'border-slate-300'
                  : selectedOption === idx
                  ? 'border-emerald-500 bg-emerald-500'
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

      {/* Feedback */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`p-4 rounded-xl mb-4 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
            {isCorrect ? randomMessage : "Not quite…"}
          </p>
          <p className="text-sm text-slate-600">{question.explanation}</p>
        </motion.div>
      )}

      {/* Action Button */}
      {!showFeedback ? (
        <button
          onClick={onSubmit}
          disabled={selectedOption === null}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            selectedOption !== null
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={onNext}
          className="w-full py-3 rounded-xl font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
        >
          Next Question
          <FaChevronRight size={14} />
        </button>
      )}
    </motion.div>
  )
}
