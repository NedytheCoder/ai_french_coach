/**
 * B1 Shared Components Library
 * ============================
 *
 * This file contains reusable, theme-aware components used across all B1 level
 * French lessons. These components provide consistent UI patterns while allowing
 * for flexible accent color customization per lesson.
 *
 * **Exported Components:**
 * 1. SectionCard - Collapsible section wrapper with auto-mark-as-reviewed
 * 2. ProgressBar - Visual progress indicator with accent colors
 * 3. PracticeSection - Interactive quiz component (15-20 questions)
 * 4. CompletionSection - Lesson completion celebration with recap
 * 5. LessonNav - Back navigation header
 *
 * **Exported Types:**
 * - SectionCardProps - Props for SectionCard component
 * - PracticeQuestion - Question structure for practice quizzes
 * - PerformanceMessage - Feedback message structure
 *
 * **Accent Color System:**
 * Supported accent colors: blue, indigo, violet, purple, teal, cyan, emerald,
 * amber, rose. Each color has associated gradient, button, and background styles.
 *
 * **Features:**
 * - Framer Motion animations for smooth transitions
 * - Consistent styling with Tailwind CSS
 * - Theme-aware color system for lesson differentiation
 * - React Icons for visual elements
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management
import React, { useState } from "react";

// Framer Motion for animations and transitions
import { motion, AnimatePresence } from "framer-motion";

// Next.js Link for navigation
import Link from "next/link";

// React Icons for UI elements
import {
  FaArrowLeft,              // Back navigation
  FaArrowRight,             // Next/Continue buttons
  FaCheckCircle,            // Reviewed status indicator
  FaRedo,                   // Retake practice
  FaArrowAltCircleRight,    // Continue navigation
  FaTrophy,                 // Completion badge
} from "react-icons/fa";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================
/**
 * SectionCardProps - Props for the collapsible section card component.
 *
 * @param id - Section identifier
 * @param title - Section title displayed in header
 * @param icon - React icon component for the section
 * @param children - Section content to display when expanded
 * @param isReviewed - Whether this section has been reviewed
 * @param onMarkReviewed - Callback to mark section as reviewed
 * @param accentColor - Theme color for the section (default: "blue")
 */
export interface SectionCardProps {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
  accentColor?: string;
}

/**
 * PracticeQuestion - Structure for practice quiz questions.
 *
 * @param id - Unique question identifier
 * @param topic - Category/topic of the question (e.g., "grammar", "vocabulary")
 * @param prompt - The question text
 * @param options - Array of possible answer choices
 * @param correct - Index of the correct option (0-based)
 * @param explanation - Explanation shown after answering
 */
export interface PracticeQuestion {
  id: number;
  topic: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
}

/**
 * PerformanceMessage - Structure for quiz performance feedback.
 *
 * @param title - Feedback title (e.g., "Great job", "Nice progress")
 * @param message - Detailed feedback message
 * @param emoji - Emoji to display with feedback
 * @param color - Color scheme for feedback box (blue/yellow/green)
 */
export interface PerformanceMessage {
  title: string;
  message: string;
  emoji: string;
  color: "blue" | "yellow" | "green";
}

// =============================================================================
// COMPONENT: SectionCard
// =============================================================================

/**
 * SectionCard - Collapsible wrapper for lesson content sections.
 *
 * Features:
 * - Expandable/collapsible content with animated transitions
 * - Auto-mark-as-reviewed when opened
 * - Icon and title in gradient header
 * - Visual indicator for reviewed status
 * - Theme-aware accent color system
 *
 * @param id - Section identifier
 * @param title - Section title displayed in header
 * @param icon - React icon component for the section
 * @param children - Section content to display when expanded
 * @param isReviewed - Whether this section has been reviewed
 * @param onMarkReviewed - Callback to mark section as reviewed
 * @param accentColor - Theme color for styling (default: "blue")
 */
export function SectionCard({
  id,
  title,
  icon: Icon,
  children,
  isReviewed,
  onMarkReviewed,
  accentColor = "blue",
}: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // =============================================================================
  // THEME-AWARE COLOR CLASSES
  // =============================================================================
  // Map of accent colors to their associated Tailwind classes for consistent
  // theming across the component. Each color defines background gradients,
  // border colors, and button styles.
  const colorClasses: Record<string, { bg: string; border: string; button: string; buttonHover: string }> = {
    blue: { bg: "from-blue-50 to-white", border: "border-blue-100", button: "bg-blue-100 text-blue-700", buttonHover: "hover:bg-blue-200" },
    indigo: { bg: "from-indigo-50 to-white", border: "border-indigo-100", button: "bg-indigo-100 text-indigo-700", buttonHover: "hover:bg-indigo-200" },
    violet: { bg: "from-violet-50 to-white", border: "border-violet-100", button: "bg-violet-100 text-violet-700", buttonHover: "hover:bg-violet-200" },
    purple: { bg: "from-purple-50 to-white", border: "border-purple-100", button: "bg-purple-100 text-purple-700", buttonHover: "hover:bg-purple-200" },
    teal: { bg: "from-teal-50 to-white", border: "border-teal-100", button: "bg-teal-100 text-teal-700", buttonHover: "hover:bg-teal-200" },
    cyan: { bg: "from-cyan-50 to-white", border: "border-cyan-100", button: "bg-cyan-100 text-cyan-700", buttonHover: "hover:bg-cyan-200" },
    emerald: { bg: "from-emerald-50 to-white", border: "border-emerald-100", button: "bg-emerald-100 text-emerald-700", buttonHover: "hover:bg-emerald-200" },
    amber: { bg: "from-amber-50 to-white", border: "border-amber-100", button: "bg-amber-100 text-amber-700", buttonHover: "hover:bg-amber-200" },
    rose: { bg: "from-rose-50 to-white", border: "border-rose-100", button: "bg-rose-100 text-rose-700", buttonHover: "hover:bg-rose-200" },
  };

  const colors = colorClasses[accentColor] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-2xl shadow-md border ${colors.border} overflow-hidden`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-6 flex items-center justify-between bg-gradient-to-r ${colors.bg} transition-colors`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 bg-${accentColor}-500 rounded-xl text-white`}>
            <Icon size={24} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 text-left">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {isReviewed && (
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <FaCheckCircle size={16} /> Reviewed
            </span>
          )}
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <FaArrowRight className="rotate-90 text-slate-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              {children}
              {!isReviewed && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onMarkReviewed(id)}
                  className={`mt-6 flex items-center gap-2 px-4 py-2 ${colors.button} ${colors.buttonHover} rounded-lg transition-colors font-medium`}
                >
                  <FaCheckCircle size={18} /> Mark as reviewed
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// =============================================================================
// COMPONENT: ProgressBar
// =============================================================================

/**
 * ProgressBar - Visual indicator of lesson completion.
 *
 * Features:
 * - Animated progress bar with gradient
 * - Percentage display
 * - Theme-aware accent colors
 *
 * @param current - Number of sections reviewed
 * @param total - Total number of sections
 * @param label - Label to display (e.g., "Lesson Progress")
 * @param accentColor - Theme color for gradient (default: "blue")
 */
export function ProgressBar({ current, total, label, accentColor = "blue" }: { current: number; total: number; label: string; accentColor?: string }) {
  const percentage = Math.round((current / total) * 100);
  const gradientClass = accentColor === "indigo" ? "from-indigo-500 to-violet-400" : accentColor === "violet" ? "from-violet-500 to-purple-400" : accentColor === "purple" ? "from-purple-500 to-pink-400" : accentColor === "teal" ? "from-teal-500 to-cyan-400" : accentColor === "cyan" ? "from-cyan-500 to-blue-400" : accentColor === "emerald" ? "from-emerald-500 to-teal-400" : accentColor === "amber" ? "from-amber-500 to-orange-400" : accentColor === "rose" ? "from-rose-500 to-pink-400" : "from-blue-500 to-indigo-400";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-slate-600">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${gradientClass} rounded-full`}
        />
      </div>
    </div>
  );
}

// =============================================================================
// COMPONENT: PracticeSection
// =============================================================================

/**
 * PracticeSectionProps - Props for the practice quiz component.
 */
interface PracticeSectionProps {
  /** Array of practice questions */
  questions: PracticeQuestion[];
  /** Whether the practice section has been reviewed */
  isReviewed: boolean;
  /** Callback to mark section as reviewed */
  onMarkReviewed: (id: string) => void;
  /** Callback when quiz is completed with final score */
  onComplete: (score: number) => void;
  /** Function to get performance message based on score */
  getPerformanceMessage: (score: number, total: number) => PerformanceMessage;
  /** Theme color for styling (default: "blue") */
  accentColor?: string;
}

/**
 * PracticeSection - Interactive quiz component for B1 lessons.
 *
 * Features:
 * - Multiple choice questions with immediate feedback
 * - Score tracking and progress bar
 * - Randomized positive feedback messages
 * - Results screen with performance message
 * - Retake option
 * - Theme-aware styling
 *
 * State:
 * - currentQuestion - Index of current question
 * - selectedOption - Currently selected answer
 * - hasSubmitted - Whether answer has been submitted
 * - isCorrect - Whether submitted answer was correct
 * - score - Total correct answers
 * - showResults - Whether to show results screen
 *
 * @param questions - Array of practice questions
 * @param isReviewed - Whether practice section is reviewed
 * @param onMarkReviewed - Callback to mark as reviewed
 * @param onComplete - Callback when quiz completes
 * @param getPerformanceMessage - Function for feedback message
 * @param accentColor - Theme color for styling
 */
export function PracticeSection({
  questions,
  isReviewed,
  onMarkReviewed,
  onComplete,
  getPerformanceMessage,
  accentColor = "blue",
}: PracticeSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // =============================================================================
  // EVENT HANDLERS
  // =============================================================================
  // Handle option selection (only before submission)
  const handleSelect = (index: number) => { if (!hasSubmitted) setSelectedOption(index); };

  // Handle answer submission and scoring
  const handleSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === question.correct;
    setIsCorrect(correct);
    setHasSubmitted(true);
    if (correct) setScore((prev) => prev + 1);
  };

  // Navigate to next question or show results
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
      setIsCorrect(false);
    } else {
      setShowResults(true);
    }
  };

  // Reset quiz state for retake
  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setShowResults(false);
  };

  // Mark practice as reviewed without completing quiz
  const handleContinueAnyway = () => { onMarkReviewed("practice"); };

  // =============================================================================
  // THEME-AWARE BUTTON CLASSES
  // =============================================================================
  // Dynamic button classes based on accent color
  const mainBtnClass = accentColor === "indigo" ? "bg-indigo-500 hover:bg-indigo-600" : accentColor === "violet" ? "bg-violet-500 hover:bg-violet-600" : accentColor === "purple" ? "bg-purple-500 hover:bg-purple-600" : accentColor === "teal" ? "bg-teal-500 hover:bg-teal-600" : accentColor === "cyan" ? "bg-cyan-500 hover:bg-cyan-600" : accentColor === "emerald" ? "bg-emerald-500 hover:bg-emerald-600" : accentColor === "amber" ? "bg-amber-500 hover:bg-amber-600" : accentColor === "rose" ? "bg-rose-500 hover:bg-rose-600" : "bg-blue-500 hover:bg-blue-600";

  // Topic badge background classes based on accent color
  const topicBgClass = accentColor === "indigo" ? "bg-indigo-100 text-indigo-700" : accentColor === "violet" ? "bg-violet-100 text-violet-700" : accentColor === "purple" ? "bg-purple-100 text-purple-700" : accentColor === "teal" ? "bg-teal-100 text-teal-700" : accentColor === "cyan" ? "bg-cyan-100 text-cyan-700" : accentColor === "emerald" ? "bg-emerald-100 text-emerald-700" : accentColor === "amber" ? "bg-amber-100 text-amber-700" : accentColor === "rose" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700";

  // =============================================================================
  // RENDER: RESULTS SCREEN
  // =============================================================================
  // Show results when all questions are answered
  if (showResults) {
    // Get performance message based on score
    const performance = getPerformanceMessage(score, questions.length);
    // Notify parent component of completion
    onComplete(score);

    return (
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice Complete!</h2>
          <p className="text-slate-600">You scored {score} out of {questions.length}</p>
          <p className="text-lg font-medium text-slate-700 mt-1">{Math.round((score / questions.length) * 100)}%</p>
        </div>
        <div className={`p-6 rounded-xl border mb-6 ${performance.color === "green" ? "bg-emerald-50 border-emerald-100" : performance.color === "yellow" ? "bg-amber-50 border-amber-100" : "bg-blue-50 border-blue-100"}`}>
          <h3 className={`font-semibold mb-2 ${performance.color === "green" ? "text-emerald-800" : performance.color === "yellow" ? "text-amber-800" : "text-blue-800"}`}>{performance.title}</h3>
          <p className={`${performance.color === "green" ? "text-emerald-700" : performance.color === "yellow" ? "text-amber-700" : "text-blue-700"}`}>{performance.message}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleRetake} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-medium"><FaRedo size={18} /> Retake practice</button>
          <button onClick={handleContinueAnyway} className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 ${mainBtnClass} text-white rounded-xl transition-colors font-medium`}>Continue lesson <FaArrowAltCircleRight size={18} /></button>
        </div>
      </div>
    );
  }

  // =============================================================================
  // RENDER: MAIN QUIZ INTERFACE
  // =============================================================================
  // Render the quiz question and answer options
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
      {/* Quiz progress header - question counter and score */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">Practice {currentQuestion + 1} of {questions.length}</span>
          <span className={`text-sm font-medium ${topicBgClass.split(" ")[1]}`}>Score: {score}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${accentColor === "indigo" ? "from-indigo-500 to-violet-400" : accentColor === "violet" ? "from-violet-500 to-purple-400" : accentColor === "purple" ? "from-purple-500 to-pink-400" : accentColor === "teal" ? "from-teal-500 to-cyan-400" : accentColor === "cyan" ? "from-cyan-500 to-blue-400" : accentColor === "emerald" ? "from-emerald-500 to-teal-400" : accentColor === "amber" ? "from-amber-500 to-orange-400" : accentColor === "rose" ? "from-rose-500 to-pink-400" : "from-blue-500 to-indigo-400"} transition-all duration-300`} style={{ width: `${progress}%` }} />
        </div>
      </div>
      {/* Animated question container with transition effects */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
          {/* Question display - topic badge and prompt */}
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 ${topicBgClass} rounded-full text-sm font-medium mb-3`}>{question.topic}</span>
            <h3 className="text-lg font-medium text-slate-800">{question.prompt}</h3>
          </div>
          {/* Answer options grid */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl text-left transition-all ${selectedOption === idx ? (hasSubmitted ? (idx === question.correct ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800" : "bg-red-100 border-2 border-red-500 text-red-800") : `bg-${accentColor}-100 border-2 border-${accentColor}-500 text-${accentColor}-800`) : (hasSubmitted && idx === question.correct ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800" : "bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-700")}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {hasSubmitted && idx === question.correct && <FaCheckCircle className="text-emerald-500" />}
                  {hasSubmitted && selectedOption === idx && idx !== question.correct && <span className="text-red-500 font-bold">✗</span>}
                </div>
              </button>
            ))}
          </div>
          {/* Feedback message after submission */}
          {hasSubmitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl mb-6 ${isCorrect ? "bg-emerald-50 border border-emerald-100" : "bg-amber-50 border border-amber-100"}`}>
              {/* Randomized positive feedback for correct answers, gentle correction for wrong */}
              <p className={`font-medium mb-2 ${isCorrect ? "text-emerald-800" : "text-amber-800"}`}>{isCorrect ? ["Nice", "Good catch", "That's right"][Math.floor(Math.random() * 3)] : ["Careful now", "You're seeing the pattern"][Math.floor(Math.random() * 2)]}</p>
              <p className={isCorrect ? "text-emerald-700" : "text-amber-700"}>{question.explanation}</p>
            </motion.div>
          )}
          {/* Submit/Next button controls */}
          <div className="flex gap-4">
            {!hasSubmitted ? (
              <button onClick={handleSubmit} disabled={selectedOption === null} className={`flex-1 py-3 ${mainBtnClass} disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors`}>Submit</button>
            ) : (
              <button onClick={handleNext} className={`flex-1 py-3 ${mainBtnClass} text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2`}>{currentQuestion < questions.length - 1 ? (<>Next <FaArrowRight /></>) : "See Results"}</button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// COMPONENT: CompletionSection
// =============================================================================

/**
 * CompletionSectionProps - Props for the lesson completion component.
 */
interface CompletionSectionProps {
  /** Lesson number (e.g., 1, 2, 3) */
  lessonNumber: number;
  /** Lesson title text */
  lessonTitle: string;
  /** Score achieved in practice */
  practiceScore: number;
  /** Total number of practice questions */
  totalQuestions: number;
  /** Path to next lesson */
  nextLessonPath: string;
  /** Array of learned skills for recap */
  recapItems: string[];
  /** Theme color for styling (default: "blue") */
  accentColor?: string;
}

/**
 * CompletionSection - Lesson completion celebration and summary.
 *
 * Features:
 * - Trophy icon and congratulations message
 * - Practice score display
 * - Recap of learned skills
 * - Link to next lesson with dynamic styling
 * - Theme-aware gradient background
 *
 * @param lessonNumber - Lesson number
 * @param lessonTitle - Lesson title
 * @param practiceScore - Score achieved in practice
 * @param totalQuestions - Total number of questions
 * @param nextLessonPath - Path to next lesson
 * @param recapItems - Array of learned skills
 * @param accentColor - Theme color for styling
 */
export function CompletionSection({ lessonNumber, lessonTitle, practiceScore, totalQuestions, nextLessonPath, recapItems, accentColor = "blue" }: CompletionSectionProps) {
  const gradientClass = accentColor === "indigo" ? "from-indigo-500 to-violet-400" : accentColor === "violet" ? "from-violet-500 to-purple-400" : accentColor === "purple" ? "from-purple-500 to-pink-400" : accentColor === "teal" ? "from-teal-500 to-cyan-400" : accentColor === "cyan" ? "from-cyan-500 to-blue-400" : accentColor === "emerald" ? "from-emerald-500 to-teal-400" : accentColor === "amber" ? "from-amber-500 to-orange-400" : accentColor === "rose" ? "from-rose-500 to-pink-400" : "from-blue-500 to-indigo-400";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`bg-gradient-to-br ${gradientClass} rounded-2xl p-8 text-white shadow-lg`}>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4"><FaTrophy size={32} className="text-white" /></div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-white/80 mb-6">You've completed B1 Lesson {lessonNumber} — {lessonTitle}</p>
        {practiceScore > 0 && <p className="text-white/70 mb-4">Practice score: {practiceScore}/{totalQuestions}</p>}
        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-white/80 text-sm">
            {recapItems.map((item, idx) => (<li key={idx}>• {item}</li>))}
          </ul>
        </div>
        <Link href={nextLessonPath} className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-medium hover:bg-white/90 transition-colors" style={{ color: accentColor === "indigo" ? "#6366f1" : accentColor === "violet" ? "#8b5cf6" : accentColor === "purple" ? "#a855f7" : accentColor === "teal" ? "#14b8a6" : accentColor === "cyan" ? "#06b6d4" : accentColor === "emerald" ? "#10b981" : accentColor === "amber" ? "#f59e0b" : accentColor === "rose" ? "#f43f5e" : "#3b82f6" }}>Continue to next lesson <FaArrowRight /></Link>
      </div>
    </motion.div>
  );
}

// =============================================================================
// COMPONENT: LessonNav
// =============================================================================

/**
 * LessonNav - Back navigation header for lessons.
 *
 * Simple navigation component with back arrow and label.
 *
 * @param backPath - URL path for back navigation
 * @param backLabel - Label text for back link (default: "Back to B1 Lessons")
 */
export function LessonNav({ backPath, backLabel = "Back to B1 Lessons" }: { backPath: string; backLabel?: string }) {
  return (
    <div className="flex items-center gap-4">
      <Link href={backPath} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
        <FaArrowLeft size={18} /><span>{backLabel}</span>
      </Link>
    </div>
  );
}
