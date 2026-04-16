/**
 * B2 Shared Components
 * =====================
 *
 * This file contains shared React components used across all B2 (Upper Intermediate)
 * French lessons. These components provide a sophisticated, consistent UI for
 * advanced French language learning content.
 *
 * **Components:**
 * 1. SectionCard - Collapsible lesson section with review marking
 * 2. ProgressBar - Visual progress indicator
 * 3. PracticeSection - Interactive 15-question quiz
 * 4. CompletionSection - Lesson completion celebration
 * 5. LessonNav - Navigation back to B2 lessons
 * 6. LessonHeader - B2 lesson header with accent color
 * 7. AnalysisCard - Text analysis display (B2 specific)
 * 8. ComparisonCard - Side-by-side comparison (B2 specific)
 * 9. QuoteCard - Quote/example display with context (B2 specific)
 *
 * **Features:**
 * - Sophisticated color palette (slate, stone, amber, teal, indigo, etc.)
 * - Framer Motion animations for smooth interactions
 * - Consistent B2 styling with rounded corners and gradients
 * - Accessibility support with ARIA attributes
 * - Responsive design for all screen sizes
 *
 * **B2 Specific Features:**
 * - AnalysisCard for literary/linguistic analysis
 * - ComparisonCard for contrasting concepts
 * - QuoteCard for authentic French text examples
 * - More sophisticated feedback messages in practice
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaRedo,
  FaArrowAltCircleRight,
  FaTrophy,
  FaGraduationCap,
  FaBookOpen,
  FaBalanceScale,
  FaExclamationTriangle,
  FaLightbulb,
  FaQuoteLeft,
  FaPenFancy,
  FaComments,
} from "react-icons/fa";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================
/**
 * SectionCardProps - Props for the SectionCard component.
 */
export interface SectionCardProps {
  /** Unique section identifier */
  id: string;
  /** Section title */
  title: string;
  /** Icon component to display */
  icon: React.ElementType;
  /** Section content */
  children: React.ReactNode;
  /** Whether section has been reviewed */
  isReviewed: boolean;
  /** Callback when section is marked reviewed */
  onMarkReviewed: (id: string) => void;
  /** Accent color theme */
  accentColor?: string;
}

/**
 * PracticeQuestion - Single quiz question structure.
 */
export interface PracticeQuestion {
  /** Question ID */
  id: number;
  /** Topic/category for grouping */
  topic: string;
  /** Question text */
  prompt: string;
  /** Array of 3 answer options */
  options: string[];
  /** Index of correct answer (0-2) */
  correct: number;
  /** Explanation for correct answer */
  explanation: string;
}

/**
 * PerformanceMessage - Feedback structure for quiz completion.
 */
export interface PerformanceMessage {
  /** Feedback title (e.g., "Great job") */
  title: string;
  /** Detailed feedback message */
  message: string;
  /** Emoji for visual feedback */
  emoji: string;
  /** Color theme for feedback */
  color: "blue" | "yellow" | "green";
}

// =============================================================================
// COLOR SCHEMES
// =============================================================================

/**
 * colorClasses - Sophisticated color palette for B2 lessons.
 *
 * Each color includes:
 * - bg: Background gradient classes
 * - border: Border color class
 * - button: Button background/text classes
 * - buttonHover: Button hover state classes
 * - text: Text color class
 * - gradient: Gradient background classes
 *
 * Available colors: slate, zinc, stone, neutral, orange, amber, yellow, lime,
 * green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
 */
const colorClasses: Record<string, { bg: string; border: string; button: string; buttonHover: string; text: string; gradient: string }> = {
  slate: { bg: "from-slate-50 to-white", border: "border-slate-200", button: "bg-slate-100 text-slate-700", buttonHover: "hover:bg-slate-200", text: "text-slate-800", gradient: "from-slate-600 to-slate-400" },
  zinc: { bg: "from-zinc-50 to-white", border: "border-zinc-200", button: "bg-zinc-100 text-zinc-700", buttonHover: "hover:bg-zinc-200", text: "text-zinc-800", gradient: "from-zinc-600 to-zinc-400" },
  stone: { bg: "from-stone-50 to-white", border: "border-stone-200", button: "bg-stone-100 text-stone-700", buttonHover: "hover:bg-stone-200", text: "text-stone-800", gradient: "from-stone-600 to-stone-400" },
  neutral: { bg: "from-neutral-50 to-white", border: "border-neutral-200", button: "bg-neutral-100 text-neutral-700", buttonHover: "hover:bg-neutral-200", text: "text-neutral-800", gradient: "from-neutral-600 to-neutral-400" },
  orange: { bg: "from-orange-50 to-white", border: "border-orange-200", button: "bg-orange-100 text-orange-700", buttonHover: "hover:bg-orange-200", text: "text-orange-800", gradient: "from-orange-600 to-orange-400" },
  amber: { bg: "from-amber-50 to-white", border: "border-amber-200", button: "bg-amber-100 text-amber-700", buttonHover: "hover:bg-amber-200", text: "text-amber-800", gradient: "from-amber-600 to-amber-400" },
  yellow: { bg: "from-yellow-50 to-white", border: "border-yellow-200", button: "bg-yellow-100 text-yellow-700", buttonHover: "hover:bg-yellow-200", text: "text-yellow-800", gradient: "from-yellow-600 to-yellow-400" },
  lime: { bg: "from-lime-50 to-white", border: "border-lime-200", button: "bg-lime-100 text-lime-700", buttonHover: "hover:bg-lime-200", text: "text-lime-800", gradient: "from-lime-600 to-lime-400" },
  green: { bg: "from-green-50 to-white", border: "border-green-200", button: "bg-green-100 text-green-700", buttonHover: "hover:bg-green-200", text: "text-green-800", gradient: "from-green-600 to-green-400" },
  emerald: { bg: "from-emerald-50 to-white", border: "border-emerald-200", button: "bg-emerald-100 text-emerald-700", buttonHover: "hover:bg-emerald-200", text: "text-emerald-800", gradient: "from-emerald-600 to-emerald-400" },
  teal: { bg: "from-teal-50 to-white", border: "border-teal-200", button: "bg-teal-100 text-teal-700", buttonHover: "hover:bg-teal-200", text: "text-teal-800", gradient: "from-teal-600 to-teal-400" },
  cyan: { bg: "from-cyan-50 to-white", border: "border-cyan-200", button: "bg-cyan-100 text-cyan-700", buttonHover: "hover:bg-cyan-200", text: "text-cyan-800", gradient: "from-cyan-600 to-cyan-400" },
  sky: { bg: "from-sky-50 to-white", border: "border-sky-200", button: "bg-sky-100 text-sky-700", buttonHover: "hover:bg-sky-200", text: "text-sky-800", gradient: "from-sky-600 to-sky-400" },
  blue: { bg: "from-blue-50 to-white", border: "border-blue-200", button: "bg-blue-100 text-blue-700", buttonHover: "hover:bg-blue-200", text: "text-blue-800", gradient: "from-blue-600 to-blue-400" },
  indigo: { bg: "from-indigo-50 to-white", border: "border-indigo-200", button: "bg-indigo-100 text-indigo-700", buttonHover: "hover:bg-indigo-200", text: "text-indigo-800", gradient: "from-indigo-600 to-indigo-400" },
  violet: { bg: "from-violet-50 to-white", border: "border-violet-200", button: "bg-violet-100 text-violet-700", buttonHover: "hover:bg-violet-200", text: "text-violet-800", gradient: "from-violet-600 to-violet-400" },
  purple: { bg: "from-purple-50 to-white", border: "border-purple-200", button: "bg-purple-100 text-purple-700", buttonHover: "hover:bg-purple-200", text: "text-purple-800", gradient: "from-purple-600 to-purple-400" },
  fuchsia: { bg: "from-fuchsia-50 to-white", border: "border-fuchsia-200", button: "bg-fuchsia-100 text-fuchsia-700", buttonHover: "hover:bg-fuchsia-200", text: "text-fuchsia-800", gradient: "from-fuchsia-600 to-fuchsia-400" },
  pink: { bg: "from-pink-50 to-white", border: "border-pink-200", button: "bg-pink-100 text-pink-700", buttonHover: "hover:bg-pink-200", text: "text-pink-800", gradient: "from-pink-600 to-pink-400" },
  rose: { bg: "from-rose-50 to-white", border: "border-rose-200", button: "bg-rose-100 text-rose-700", buttonHover: "hover:bg-rose-200", text: "text-rose-800", gradient: "from-rose-600 to-rose-400" },
};

// =============================================================================
// SECTION CARD COMPONENT
// =============================================================================

/**
 * SectionCard - Collapsible lesson section with review marking.
 *
 * Features:
 * - Animated expand/collapse with Framer Motion
 * - Icon header with accent color gradient
 * - "Mark as reviewed" button when not reviewed
 * - "Reviewed" badge when section is complete
 * - Accessible with ARIA expanded attribute
 *
 * @param props - SectionCardProps
 * @returns JSX.Element - Collapsible section card
 */
export function SectionCard({
  id,
  title,
  icon: Icon,
  children,
  isReviewed,
  onMarkReviewed,
  accentColor = "slate",
}: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const colors = colorClasses[accentColor] || colorClasses.slate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl shadow-sm border ${colors.border} overflow-hidden`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-6 flex items-center justify-between bg-gradient-to-r ${colors.bg} transition-colors text-left`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 bg-gradient-to-br ${colors.gradient} rounded-lg text-white shadow-sm`}>
            <Icon size={22} />
          </div>
          <h2 className={`text-xl font-semibold ${colors.text}`}>{title}</h2>
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
// PROGRESS BAR COMPONENT
// =============================================================================

/**
 * ProgressBar - Visual progress indicator for lesson completion.
 *
 * Features:
 * - Animated width transition
 * - Percentage label
 * - Customizable accent color
 *
 * @param current - Number of completed items
 * @param total - Total number of items
 * @param label - Progress bar label
 * @param accentColor - Color theme
 * @returns JSX.Element - Progress bar
 */
export function ProgressBar({ current, total, label, accentColor = "slate" }: { current: number; total: number; label: string; accentColor?: string }) {
  const percentage = Math.round((current / total) * 100);
  const colors = colorClasses[accentColor] || colorClasses.slate;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-slate-600">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
        />
      </div>
    </div>
  );
}

// =============================================================================
// PRACTICE SECTION COMPONENT
// =============================================================================

/**
 * PracticeSectionProps - Props for the PracticeSection component.
 */
interface PracticeSectionProps {
  /** Array of quiz questions */
  questions: PracticeQuestion[];
  /** Whether practice has been reviewed */
  isReviewed: boolean;
  /** Callback to mark practice as reviewed */
  onMarkReviewed: (id: string) => void;
  /** Callback when quiz is completed with final score */
  onComplete: (score: number) => void;
  /** Function to get performance message based on score */
  getPerformanceMessage: (score: number, total: number) => PerformanceMessage;
  /** Accent color theme */
  accentColor?: string;
}

/**
 * PracticeSection - Interactive 15-question quiz component.
 *
 * Features:
 * - Multiple choice questions with 3 options
 * - Animated question transitions
 * - Immediate feedback after submitting
 * - Score tracking
 * - Results screen with performance message
 * - Retake option
 * - Sophisticated feedback messages for B2 level
 *
 * @param props - PracticeSectionProps
 * @returns JSX.Element - Quiz interface
 */
export function PracticeSection({
  questions,
  isReviewed,
  onMarkReviewed,
  onComplete,
  getPerformanceMessage,
  accentColor = "slate",
}: PracticeSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const colors = colorClasses[accentColor] || colorClasses.slate;

  const handleSelect = (index: number) => { if (!hasSubmitted) setSelectedOption(index); };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === question.correct;
    setIsCorrect(correct);
    setHasSubmitted(true);
    if (correct) setScore((prev) => prev + 1);
  };

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

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setShowResults(false);
  };

  const handleContinueAnyway = () => { onMarkReviewed("practice"); };

  if (showResults) {
    const performance = getPerformanceMessage(score, questions.length);
    onComplete(score);

    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice Complete</h2>
          <p className="text-slate-600">You scored {score} out of {questions.length}</p>
          <p className="text-lg font-medium text-slate-700 mt-1">{Math.round((score / questions.length) * 100)}%</p>
        </div>
        <div className={`p-6 rounded-xl border mb-6 ${performance.color === "green" ? "bg-emerald-50 border-emerald-100" : performance.color === "yellow" ? "bg-amber-50 border-amber-100" : "bg-blue-50 border-blue-100"}`}>
          <h3 className={`font-semibold mb-2 ${performance.color === "green" ? "text-emerald-800" : performance.color === "yellow" ? "text-amber-800" : "text-blue-800"}`}>{performance.title}</h3>
          <p className={`${performance.color === "green" ? "text-emerald-700" : performance.color === "yellow" ? "text-amber-700" : "text-blue-700"}`}>{performance.message}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleRetake} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-medium"><FaRedo size={18} /> Retake practice</button>
          <button onClick={handleContinueAnyway} className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.gradient} text-white rounded-xl transition-colors font-medium`}>Continue lesson <FaArrowAltCircleRight size={18} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">Practice {currentQuestion + 1} of {questions.length}</span>
          <span className={`text-sm font-medium ${colors.text}`}>Score: {score}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-300`} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 bg-${accentColor}-100 ${colors.text} rounded-full text-sm font-medium mb-3`}>{question.topic}</span>
            <h3 className="text-lg font-medium text-slate-800">{question.prompt}</h3>
          </div>
          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl text-left transition-all ${selectedOption === idx ? (hasSubmitted ? (idx === question.correct ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800" : "bg-red-100 border-2 border-red-500 text-red-800") : `bg-${accentColor}-100 border-2 border-${accentColor}-500 ${colors.text}`) : (hasSubmitted && idx === question.correct ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800" : "bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-slate-700")}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {hasSubmitted && idx === question.correct && <FaCheckCircle className="text-emerald-500" />}
                  {hasSubmitted && selectedOption === idx && idx !== question.correct && <span className="text-red-500 font-bold">✗</span>}
                </div>
              </button>
            ))}
          </div>
          {hasSubmitted && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl mb-6 ${isCorrect ? "bg-emerald-50 border border-emerald-100" : "bg-amber-50 border border-amber-100"}`}>
              <p className={`font-medium mb-2 ${isCorrect ? "text-emerald-800" : "text-amber-800"}`}>{isCorrect ? ["Precisely", "Exactly right", "Well reasoned"][Math.floor(Math.random() * 3)] : ["Consider this carefully", "A subtle distinction", "Note this pattern"][Math.floor(Math.random() * 3)]}</p>
              <p className={isCorrect ? "text-emerald-700" : "text-amber-700"}>{question.explanation}</p>
            </motion.div>
          )}
          <div className="flex gap-4">
            {!hasSubmitted ? (
              <button onClick={handleSubmit} disabled={selectedOption === null} className={`flex-1 py-3 bg-gradient-to-r ${colors.gradient} disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors`}>Submit</button>
            ) : (
              <button onClick={handleNext} className={`flex-1 py-3 bg-gradient-to-r ${colors.gradient} text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2`}>{currentQuestion < questions.length - 1 ? (<>Next <FaArrowRight /></>) : "See Results"}</button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// COMPLETION SECTION COMPONENT
// =============================================================================

/**
 * CompletionSectionProps - Props for the CompletionSection component.
 */
interface CompletionSectionProps {
  /** Lesson number */
  lessonNumber: number;
  /** Lesson title */
  lessonTitle: string;
  /** Final practice score */
  practiceScore: number;
  /** Total number of questions */
  totalQuestions: number;
  /** Path to next lesson */
  nextLessonPath: string;
  /** Array of recap items to display */
  recapItems: string[];
  /** Accent color theme */
  accentColor?: string;
}

/**
 * CompletionSection - Lesson completion celebration component.
 *
 * Features:
 * - Trophy icon with gradient background
 * - Lesson completion message
 * - Practice score display
 * - Recap list of mastered concepts
 * - Link to next lesson
 * - Animated entrance with Framer Motion
 *
 * @param props - CompletionSectionProps
 * @returns JSX.Element - Completion celebration
 */
export function CompletionSection({ lessonNumber, lessonTitle, practiceScore, totalQuestions, nextLessonPath, recapItems, accentColor = "slate" }: CompletionSectionProps) {
  const colors = colorClasses[accentColor] || colorClasses.slate;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`bg-gradient-to-br ${colors.gradient} rounded-xl p-8 text-white shadow-lg`}>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4"><FaTrophy size={32} className="text-white" /></div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete</h2>
        <p className="text-white/80 mb-6">You have completed B2 Lesson {lessonNumber} — {lessonTitle}</p>
        {practiceScore > 0 && <p className="text-white/70 mb-4">Practice score: {practiceScore}/{totalQuestions}</p>}
        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you have mastered:</h3>
          <ul className="space-y-1 text-white/80 text-sm">
            {recapItems.map((item, idx) => (<li key={idx}>• {item}</li>))}
          </ul>
        </div>
        <Link href={nextLessonPath} className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl font-medium hover:bg-white/90 transition-colors text-slate-800">Continue to next lesson <FaArrowRight /></Link>
      </div>
    </motion.div>
  );
}

// =============================================================================
// NAVIGATION COMPONENTS
// =============================================================================

/**
 * LessonNav - Navigation back to B2 lessons.
 *
 * @param backPath - URL path for back navigation
 * @param backLabel - Label for back button
 * @returns JSX.Element - Navigation link
 */
export function LessonNav({ backPath, backLabel = "Back to B2 Lessons" }: { backPath: string; backLabel?: string }) {
  return (
    <div className="flex items-center gap-4">
      <Link href={backPath} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
        <FaArrowLeft size={18} /><span>{backLabel}</span>
      </Link>
    </div>
  );
}

/**
 * LessonHeaderProps - Props for the LessonHeader component.
 */
interface LessonHeaderProps {
  /** Lesson number */
  lessonNumber: number;
  /** Lesson title */
  title: string;
  /** Lesson subtitle/description */
  subtitle: string;
  /** Accent color theme */
  accentColor?: string;
}

/**
 * LessonHeader - B2 lesson header with accent color.
 *
 * Features:
 * - Gradient background based on accent color
 * - Lesson number badge
 * - Title and subtitle display
 * - Responsive text sizing
 *
 * @param props - LessonHeaderProps
 * @returns JSX.Element - Lesson header
 */
export function LessonHeader({ lessonNumber, title, subtitle, accentColor = "slate" }: LessonHeaderProps) {
  const colors = colorClasses[accentColor] || colorClasses.slate;
  
  return (
    <div className={`bg-gradient-to-br ${colors.gradient} rounded-xl p-8 text-white shadow-lg`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B2 Lesson {lessonNumber}</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
      <p className="text-white/90 text-lg leading-relaxed">{subtitle}</p>
    </div>
  );
}

// =============================================================================
// B2 SPECIFIC COMPONENTS
// =============================================================================

/**
 * AnalysisCardProps - Props for the AnalysisCard component.
 */
interface AnalysisCardProps {
  /** Card title */
  title: string;
  /** Analysis content text */
  content: string;
  /** Accent color theme */
  accentColor?: string;
}

/**
 * AnalysisCard - Text analysis display component (B2 specific).
 *
 * Features:
 * - Pen fancy icon header
 * - Gradient background
 * - Used for literary/linguistic analysis
 * - Sophisticated styling for advanced content
 *
 * @param props - AnalysisCardProps
 * @returns JSX.Element - Analysis card
 */
export function AnalysisCard({ title, content, accentColor = "slate" }: AnalysisCardProps) {
  const colors = colorClasses[accentColor] || colorClasses.slate;
  
  return (
    <div className={`p-5 rounded-xl bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
      <h4 className={`font-semibold ${colors.text} mb-2 flex items-center gap-2`}>
        <FaPenFancy size={16} /> {title}
      </h4>
      <p className="text-slate-700 leading-relaxed">{content}</p>
    </div>
  );
}

/**
 * ComparisonCardProps - Props for the ComparisonCard component.
 */
interface ComparisonCardProps {
  /** Card title */
  title: string;
  /** Array of comparison items with label and content */
  items: { label: string; content: string }[];
  /** Accent color theme */
  accentColor?: string;
}

/**
 * ComparisonCard - Side-by-side comparison component (B2 specific).
 *
 * Features:
 * - Balance scale icon header
 * - Divided list layout
 * - Used for contrasting concepts or usages
 * - Label and content pairs
 *
 * @param props - ComparisonCardProps
 * @returns JSX.Element - Comparison card
 */
export function ComparisonCard({ title, items, accentColor = "slate" }: ComparisonCardProps) {
  const colors = colorClasses[accentColor] || colorClasses.slate;
  
  return (
    <div className={`rounded-xl border ${colors.border} overflow-hidden`}>
      <div className={`p-4 bg-gradient-to-r ${colors.bg}`}>
        <h4 className={`font-semibold ${colors.text} flex items-center gap-2`}>
          <FaBalanceScale size={16} /> {title}
        </h4>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 flex gap-4">
            <span className="font-medium text-slate-600 min-w-[120px]">{item.label}</span>
            <span className="text-slate-800">{item.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * QuoteCardProps - Props for the QuoteCard component.
 */
interface QuoteCardProps {
  /** Quote or example text */
  quote: string;
  /** Optional source attribution */
  source?: string;
  /** Optional context explanation */
  context?: string;
  /** Accent color theme */
  accentColor?: string;
}

/**
 * QuoteCard - Quote/example display with context (B2 specific).
 *
 * Features:
 * - Quote left icon with decorative styling
 * - Italicized quote text
 * - Optional source attribution
 * - Optional context explanation
 * - Used for authentic French text examples
 *
 * @param props - QuoteCardProps
 * @returns JSX.Element - Quote card
 */
export function QuoteCard({ quote, source, context, accentColor = "slate" }: QuoteCardProps) {
  const colors = colorClasses[accentColor] || colorClasses.slate;
  
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-r ${colors.bg} border ${colors.border} relative`}>
      <FaQuoteLeft className={`absolute top-4 left-4 ${colors.text} opacity-30`} size={24} />
      <p className={`text-lg ${colors.text} italic pl-8 leading-relaxed`}>"{quote}"</p>
      {source && <p className="text-sm text-slate-500 mt-3 pl-8">— {source}</p>}
      {context && <p className="text-sm text-slate-600 mt-2 pl-8">{context}</p>}
    </div>
  );
}

// =============================================================================
// ICON RE-EXPORTS
// =============================================================================

/**
 * Re-export commonly used icons for convenience in B2 lessons.
 */
export { FaGraduationCap, FaBookOpen, FaBalanceScale, FaExclamationTriangle, FaLightbulb, FaQuoteLeft, FaPenFancy, FaComments };
