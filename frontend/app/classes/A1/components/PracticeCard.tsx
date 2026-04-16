/**
 * PracticeCard Component (A1 Level)
 * ===================================
 * 
 * Purpose:
 * --------
 * An interactive quiz/practice question card for A1 lessons. Presents a
 * multiple-choice question with visual feedback, explanations, and
 * progress tracking. Includes randomized positive feedback messages for
 * correct answers.
 * 
 * Features:
 * ---------
 * - Multiple choice options with radio-style selection
 * - Visual feedback (green=correct, red=incorrect, purple=selected)
 * - Random encouraging messages for correct answers
 * - Detailed explanations after answering
 * - Topic badges with color coding
 * - Smooth animations for feedback reveal
 * 
 * Usage:
 * ------
 *   import { PracticeCard } from '../components'
 *   
 *   <PracticeCard
 *     question={{
 *       id: 1,
 *       prompt: "What is the French word for 'the' (masculine)?",
 *       options: ['le', 'la', 'les', 'un'],
 *       correct: 0,
 *       explanation: "'Le' is the masculine definite article.",
 *       topic: 'articles'
 *     }}
 *     questionNumber={1}
 *     totalQuestions={8}
 *     selectedOption={null}
 *     showFeedback={false}
 *     onSelectOption={(idx) => setSelected(idx)}
 *     onSubmit={() => checkAnswer()}
 *     onNext={() => nextQuestion()}
 *   />
 */

'use client'

// Framer Motion for animations
import { motion } from 'framer-motion'
// React Icons - Font Awesome check and chevron icons
import { FaCheck, FaChevronRight } from 'react-icons/fa'

/**
 * Question Interface
 * ------------------
 * Defines the data structure for a practice question.
 * Exported for use in data files and component props.
 */
export interface Question {
  id: number           // Unique question identifier
  prompt: string       // The question text shown to user
  options: string[]    // Array of possible answer choices
  correct: number     // Index of the correct answer in options array
  explanation: string // Explanation shown after answering
  topic?: string       // Optional topic category for badge
}

/**
 * PracticeCardProps Interface
 * ---------------------------
 * Defines the props for the PracticeCard component.
 */
interface PracticeCardProps {
  question: Question          // The question data
  questionNumber: number      // Current question number (1-based)
  totalQuestions: number      // Total questions in the quiz
  selectedOption: number | null  // Currently selected option index
  showFeedback: boolean       // Whether to show answer feedback
  onSelectOption: (index: number) => void  // Handler for option selection
  onSubmit: () => void        // Handler for submitting answer
  onNext: () => void          // Handler for advancing to next question
}

/**
 * Array of positive feedback messages shown for correct answers.
 * A random message is selected for each correct response.
 */
const feedbackMessages = [
  "Nice 😏",
  "Good catch",
  "You got it",
  "Perfect",
  "Well done"
]

/**
 * PracticeCard functional component
 * 
 * Renders an interactive quiz question with:
 * - Question header with progress indicator
 * - Topic badge with color coding
 * - Multiple choice options with visual states
 * - Animated feedback area with explanation
 * - Submit/Next buttons with appropriate states
 * 
 * Option styling states:
 * - Default: Gray border, hover effect
 * - Selected: Purple border and background
 * - Correct (after submit): Green border and background
 * - Incorrect (after submit): Red border and background
 * 
 * @param {PracticeCardProps} props - Component props
 * @returns {JSX.Element} The rendered practice card
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
  // Determine if selected answer is correct
  const isCorrect = selectedOption === question.correct
  
  // Select random positive feedback message for correct answers
  const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]

  /**
   * Helper function to determine topic badge colors.
   * Maps topic names to Tailwind color classes.
   */
  const getTopicColor = () => {
    if (question.topic === 'pronouns') return 'bg-purple-100 text-purple-700'
    if (question.topic === 'definite') return 'bg-blue-100 text-blue-700'
    if (question.topic === 'indefinite') return 'bg-emerald-100 text-emerald-700'
    if (question.topic === 'masculine') return 'bg-blue-100 text-blue-700'
    if (question.topic === 'feminine') return 'bg-pink-100 text-pink-700'
    return 'bg-slate-100 text-slate-700'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      {/* Question header with progress and topic badge */}
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

      {/* Question prompt text */}
      <h3 className="text-lg font-medium text-slate-800 mb-6">{question.prompt}</h3>

      {/* Multiple choice options list */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelectOption(idx)}
            disabled={showFeedback}
            className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
              /* Conditional styling based on selection and feedback state */
              showFeedback
                ? idx === question.correct
                  ? 'border-green-400 bg-green-50 text-green-800'    /* Correct answer */
                  : selectedOption === idx
                  ? 'border-red-400 bg-red-50 text-red-800'        /* Wrong selection */
                  : 'border-slate-200 text-slate-400'              /* Other options */
                : selectedOption === idx
                ? 'border-purple-500 bg-purple-50 text-purple-800' /* Selected */
                : 'border-slate-200 hover:border-purple-300 text-slate-700' /* Default */
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Radio indicator circle */}
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

      {/* Feedback area - shown after submitting answer */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`p-4 rounded-xl mb-4 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
          }`}
        >
          {/* Feedback message - encouraging for correct, gentle for incorrect */}
          <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
            {isCorrect ? randomMessage : "Careful now…"}
          </p>
          {/* Explanation text */}
          <p className="text-sm text-slate-600">{question.explanation}</p>
        </motion.div>
      )}

      {/* Action button - Submit or Next depending on state */}
      {!showFeedback ? (
        /* Submit button - disabled until option selected */
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
        /* Next button - shown after feedback */
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
