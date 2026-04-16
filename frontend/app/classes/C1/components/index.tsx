/**
 * C1 Shared Components - Mastery Level
 * ======================================
 *
 * This file contains all shared React components used across C1 (mastery level)
 * lesson modules. These components are designed for advanced French learners
 * working with sophisticated language concepts.
 *
 * **Component Categories:**
 * 1. TypeScript Interfaces - Data structures for C1 lesson content
 * 2. ModuleHeader - Module title and metadata display
 * 3. NuanceCard - Highlighting subtle language distinctions
 * 4. ComparisonCard - Side-by-side comparison of options
 * 5. WeakVsStrongCard - Comparing weak vs strong formulations
 * 6. ExampleBlock - Displaying analyzed examples
 * 7. TransformationCard - Showing sentence transformations
 * 8. PracticeSection - Interactive quiz component (15 questions)
 * 9. ProgressBar - Visual progress indicator
 * 10. ModuleNav - Navigation back to C1 modules
 * 11. CompletionCard - Module completion summary
 * 12. SectionCard - Reviewable content sections
 *
 * **Design System:**
 * - Color scheme: Slate (professional, academic)
 * - Accent colors: Emerald (success), Rose (weak/incorrect), Amber (nuance/warning)
 * - Icons: FontAwesome (Fa) icons for visual cues
 * - Animations: Framer Motion for smooth transitions
 * - Styling: Tailwind CSS with consistent spacing
 *
 * **Key Features:**
 * - All components are client-side ("use client")
 * - TypeScript interfaces ensure data consistency
 * - Review system with Mark Reviewed functionality
 * - Practice quiz with feedback and scoring
 * - Responsive design with mobile support
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheck,           // Reviewed status indicator
  FaArrowRight,      // Navigation forward
  FaArrowLeft,       // Navigation back
  FaRedo,            // Restart quiz
  FaTrophy,          // Achievement/completion
  FaLightbulb,       // Nuance/insight
  FaBalanceScale,    // Comparison
  FaFeather,         // Writing examples
  FaExclamationTriangle, // Warning (unused but available)
} from "react-icons/fa";
import Link from "next/link";

// =============================================================================
// TYPESCRIPT INTERFACES
// =============================================================================

/**
 * ModuleMeta - Module metadata for display in headers.
 */
export interface ModuleMeta {
  title: string;
  subtitle: string;
  moduleNumber: number;
}

/**
 * PracticeQuestion - Single question for the C1 practice quiz.
 *
 * Question types:
 * - rewrite: Sentence rewriting exercises
 * - comparison: Comparing different formulations
 * - tone: Tone analysis questions
 * - transformation: Sentence transformation exercises
 * - ambiguity: Ambiguity resolution questions
 * - connector: Connector usage questions
 */
export interface PracticeQuestion {
  /** Unique question identifier */
  id: number;
  /** Question category/type */
  type: "rewrite" | "comparison" | "tone" | "transformation" | "ambiguity" | "connector";
  /** Question text/prompt */
  prompt: string;
  /** Optional context for the question */
  context?: string;
  /** Array of 3 possible answers */
  options: string[];
  /** Index (0-2) of the correct answer */
  correct: number;
  /** Detailed explanation of the correct answer */
  explanation: string;
  /** Optional nuance note for additional insight */
  nuance?: string;
}

/**
 * WeakVsStrong - Comparison of weak vs strong formulations.
 *
 * Used in WeakVsStrongCard to show students how to improve their French.
 */
export interface WeakVsStrong {
  /** Weak or incorrect formulation */
  weak: string;
  /** Strong, improved formulation */
  strong: string;
  /** Explanation of why the strong version is better */
  why: string;
  /** Context or usage scenario */
  context: string;
}

/**
 * Transformation - Sentence transformation example.
 *
 * Shows how to improve sentences using specific techniques.
 */
export interface Transformation {
  /** Original sentence */
  original: string;
  /** Improved sentence */
  improved: string;
  /** Technique used for improvement */
  technique: string;
  /** Explanation of the transformation */
  explanation: string;
}

/**
 * ComparisonBlock - Side-by-side comparison of two options.
 *
 * Used for analyzing different formulations or approaches.
 */
export interface ComparisonBlock {
  /** Comparison title */
  title: string;
  /** First option with label, text, and tone */
  optionA: { label: string; text: string; tone: string };
  /** Second option with label, text, and tone */
  optionB: { label: string; text: string; tone: string };
  /** Which option is best: A, B, or depends on context */
  bestChoice: "A" | "B" | "depends";
  /** Explanation of the comparison */
  explanation: string;
}

/**
 * ResultMessage - Performance feedback message structure.
 *
 * Returned by getResultMessage function in practice quizzes.
 */
export interface ResultMessage {
  /** Score achieved */
  score: number;
  /** Feedback title (e.g., "Excellent command") */
  title: string;
  /** Main feedback message */
  message: string;
  /** Optional focus area for improvement */
  focus?: string;
}

// =============================================================================
// MODULE HEADER COMPONENT
// =============================================================================

/**
 * ModuleHeader - Displays module number, title, and subtitle.
 *
 * Features:
 * - Animated entrance with Framer Motion
 * - Module badge with number
 * - C1 Mastery label
 * - Large title with subtitle
 *
 * @param moduleNumber - Module number (1-12)
 * @param title - Module title
 * @param subtitle - Brief module description
 */
export function ModuleHeader({ moduleNumber, title, subtitle }: { moduleNumber: number; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-8 shadow-sm border border-slate-200"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="px-3 py-1 bg-slate-800 text-white text-sm font-medium rounded-full">Module {moduleNumber}</span>
        <span className="text-slate-400 text-sm">C1 Mastery</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-800 mb-3">{title}</h1>
      <p className="text-lg text-slate-600 leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}

// =============================================================================
// NUANCE CARD COMPONENT
// =============================================================================

/**
 * NuanceCard - Highlights subtle language distinctions and insights.
 *
 * Features:
 * - Lightbulb icon for insight/visual cue
 * - Optional highlight text in amber
 * - Consistent card styling with border
 *
 * @param title - Card title
 * @param children - Card content
 * @param highlight - Optional highlighted text (amber color)
 */
export function NuanceCard({ title, children, highlight }: { title: string; children: React.ReactNode; highlight?: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <FaLightbulb className="text-amber-500" />
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      {highlight && <p className="text-amber-700 font-medium mb-3">{highlight}</p>}
      <div className="text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
}

// =============================================================================
// COMPARISON CARD COMPONENT
// =============================================================================

/**
 * ComparisonCard - Side-by-side comparison of multiple options.
 *
 * Features:
 * - Balance scale icon
 * - Multiple items with labels
 * - Second item highlighted in emerald (recommended)
 * - Optional notes for each item
 *
 * @param title - Card title
 * @param items - Array of items to compare (label, text, optional note)
 */
export function ComparisonCard({ title, items }: { title: string; items: { label: string; text: string; note?: string }[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <FaBalanceScale className="text-indigo-500" />
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-lg ${idx === 1 ? "bg-emerald-50 border border-emerald-200" : "bg-slate-50"}`}>
            <p className="text-sm text-slate-500 mb-1">{item.label}</p>
            <p className={`font-medium ${idx === 1 ? "text-emerald-800" : "text-slate-700"}`}>{item.text}</p>
            {item.note && <p className="text-sm text-slate-500 mt-2">{item.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// WEAK VS STRONG CARD COMPONENT
// =============================================================================

/**
 * WeakVsStrongCard - Compares weak vs strong formulations with explanations.
 *
 * Features:
 * - Two-column grid: Weak (rose) vs Strong (emerald)
 * - Visual indicators: ⚠️ for weak, ✓ for strong
 * - Why explanation for each comparison
 * - Context note
 *
 * @param examples - Array of WeakVsStrong examples
 */
export function WeakVsStrongCard({ examples }: { examples: WeakVsStrong[] }) {
  return (
    <div className="space-y-4">
      {examples.map((ex, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
              <p className="text-sm text-rose-600 mb-1">⚠️ Weak</p>
              <p className="text-slate-700">{ex.weak}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-600 mb-1">✓ Strong</p>
              <p className="text-slate-700">{ex.strong}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600"><span className="font-medium">Why:</span> {ex.why}</p>
          <p className="text-xs text-slate-500 mt-1">{ex.context}</p>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// EXAMPLE BLOCK COMPONENT
// =============================================================================

/**
 * ExampleBlock - Displays analyzed examples with context.
 *
 * Features:
 * - Feather icon for writing examples
 * - Each example shows text, analysis, and optional context
 * - Consistent slate styling
 *
 * @param title - Block title
 * @param examples - Array of examples with text, analysis, and optional context
 */
export function ExampleBlock({ title, examples }: { title: string; examples: { text: string; analysis: string; context?: string }[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <FaFeather className="text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="space-y-4">
        {examples.map((ex, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-lg">
            <p className="text-slate-700 font-medium mb-2">{ex.text}</p>
            <p className="text-sm text-slate-600">{ex.analysis}</p>
            {ex.context && <p className="text-xs text-slate-500 mt-2">{ex.context}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// TRANSFORMATION CARD COMPONENT
// =============================================================================

/**
 * TransformationCard - Shows sentence transformations with techniques.
 *
 * Features:
 * - Technique badge (indigo)
 * - Two-column grid: Original vs Improved
 * - Color coding: Slate (original) vs Emerald (improved)
 * - Explanation of the transformation
 *
 * @param transformations - Array of Transformation examples
 */
export function TransformationCard({ transformations }: { transformations: Transformation[] }) {
  return (
    <div className="space-y-4">
      {transformations.map((t, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">{t.technique}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500 mb-1">Original</p>
              <p className="text-slate-700">{t.original}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-600 mb-1">Improved</p>
              <p className="text-emerald-800">{t.improved}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600">{t.explanation}</p>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// PRACTICE SECTION COMPONENT
// =============================================================================

/**
 * PracticeSection - Interactive quiz component for C1 modules.
 *
 * Features:
 * - Multiple choice questions (3 options each)
 * - Question type badges with color coding
 * - Progress bar showing quiz progress
 * - Score tracking throughout quiz
 * - Immediate feedback after answering
 * - Explanation and optional nuance notes
 * - Final results screen with performance message
 * - Restart quiz functionality
 *
 * Question type colors:
 * - Indigo: rewrite
 * - Emerald: comparison
 * - Amber: other types (tone, transformation, ambiguity, connector)
 *
 * @param questions - Array of PracticeQuestion objects
 * @param onComplete - Callback when quiz is completed (receives final score)
 * @param getResultMessage - Function to generate performance feedback
 */
export function PracticeSection({
  questions,
  onComplete,
  getResultMessage,
}: {
  questions: PracticeQuestion[];
  onComplete: (score: number) => void;
  getResultMessage: (score: number, total: number) => { title: string; message: string; focus?: string };
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    if (idx === question.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setFinished(true);
      onComplete(score + (selected === question.correct ? 1 : 0));
    }
  };

  if (finished) {
    const finalScore = score + (selected === question.correct ? 1 : 0);
    const result = getResultMessage(finalScore, questions.length);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center">
        <FaTrophy className="text-4xl text-amber-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{result.title}</h3>
        <p className="text-slate-600 mb-2">{result.message}</p>
        {result.focus && <p className="text-sm text-slate-500 mb-4">{result.focus}</p>}
        <div className="text-3xl font-bold text-slate-800 mb-6">{finalScore}/{questions.length}</div>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition flex items-center gap-2 mx-auto">
          <FaRedo /> Recommencer
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-500">Question {current + 1}/{questions.length}</span>
          <span className="text-sm font-medium text-slate-700">Score: {score}</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full">
          <div className="h-2 bg-slate-800 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
      </div>
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 text-xs font-medium rounded ${question.type === "rewrite" ? "bg-indigo-100 text-indigo-700" : question.type === "comparison" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                {question.type}
              </span>
            </div>
            <p className="text-lg text-slate-800 font-medium mb-2">{question.prompt}</p>
            {question.context && <p className="text-sm text-slate-500 mb-4">{question.context}</p>}
            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left rounded-lg border transition ${
                    showFeedback
                      ? idx === question.correct
                        ? "bg-emerald-50 border-emerald-300"
                        : idx === selected
                        ? "bg-rose-50 border-rose-300"
                        : "bg-slate-50 border-slate-200"
                      : selected === idx
                      ? "bg-slate-100 border-slate-400"
                      : "bg-white border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <span className="font-medium text-slate-800">{opt}</span>
                </button>
              ))}
            </div>
            {showFeedback && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 p-4 rounded-lg ${selected === question.correct ? "bg-emerald-50" : "bg-rose-50"}`}>
                <p className={selected === question.correct ? "text-emerald-800" : "text-rose-800"}>{question.explanation}</p>
                {question.nuance && <p className="text-sm text-slate-600 mt-2">{question.nuance}</p>}
                <button onClick={next} className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition flex items-center gap-2">
                  {current + 1 < questions.length ? (<>Suivant <FaArrowRight /></>) : ("Terminer")}
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// =============================================================================
// PROGRESS BAR COMPONENT
// =============================================================================

/**
 * ProgressBar - Visual progress indicator with percentage.
 *
 * Features:
 * - Shows current/total count with percentage
 * - Animated progress bar using Framer Motion
 * - Label for context
 * - Gradient styling (slate-600 to slate-800)
 *
 * @param current - Current progress value
 * @param total - Total/maximum value
 * @param label - Label describing what is being tracked
 */
export function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  const percentage = Math.round((current / total) * 100);
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm text-slate-500">{current}/{total} ({percentage}%)</span>
      </div>
      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-slate-600 to-slate-800" initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.5 }} />
      </div>
    </div>
  );
}

// =============================================================================
// MODULE NAV COMPONENT
// =============================================================================

/**
 * ModuleNav - Navigation link back to C1 modules list.
 *
 * Features:
 * - Left arrow icon
 * - "Retour" (Back) label
 * - Hover state transition
 *
 * @param backPath - URL path to navigate back to
 */
export function ModuleNav({ backPath }: { backPath: string }) {
  return (
    <div className="flex items-center justify-between">
      <Link href={backPath} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition">
        <FaArrowLeft /> Retour
      </Link>
    </div>
  );
}

// =============================================================================
// COMPLETION CARD COMPONENT
// =============================================================================

/**
 * CompletionCard - Module completion summary and next steps.
 *
 * Features:
 * - Animated entrance with Framer Motion
 * - Trophy icon with module title
 * - Final score display
 * - Key takeaways list (recap items)
 * - Next module navigation button
 * - Dark gradient background (slate-800 to slate-900)
 *
 * @param moduleNumber - Completed module number
 * @param moduleTitle - Title of completed module
 * @param practiceScore - Final quiz score
 * @param totalQuestions - Total number of questions
 * @param nextModulePath - Path to next module
 * @param recapItems - Array of key takeaways to display
 */
export function CompletionCard({
  moduleNumber,
  moduleTitle,
  practiceScore,
  totalQuestions,
  nextModulePath,
  recapItems,
}: {
  moduleNumber: number;
  moduleTitle: string;
  practiceScore: number;
  totalQuestions: number;
  nextModulePath: string;
  recapItems: string[];
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 text-white">
      <div className="flex items-center gap-3 mb-4">
        <FaTrophy className="text-3xl text-amber-400" />
        <div>
          <h2 className="text-2xl font-bold">Module {moduleNumber} Complete</h2>
          <p className="text-slate-400">{moduleTitle}</p>
        </div>
      </div>
      <p className="text-lg mb-4">Score: {practiceScore}/{totalQuestions}</p>
      <div className="bg-white/10 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Key Takeaways</h3>
        <ul className="space-y-1 text-sm text-slate-300">
          {recapItems.map((item, idx) => (<li key={idx}>• {item}</li>))}
        </ul>
      </div>
      <Link href={nextModulePath} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-800 rounded-lg hover:bg-slate-100 transition font-medium">
        Next Module <FaArrowRight />
      </Link>
    </motion.div>
  );
}

// =============================================================================
// SECTION CARD COMPONENT
// =============================================================================

/**
 * SectionCard - Reviewable content section for C1 modules.
 *
 * Features:
 * - Animated entrance (fade in + slide up)
 * - Icon in rounded background
 * - Section title
 * - "Mark Reviewed" button (shown when not reviewed)
 * - "Reviewed" badge with checkmark (shown when reviewed)
 * - Children content area
 * - Consistent card styling with border
 *
 * Used for all lesson content sections that students can mark as reviewed.
 *
 * @param id - Section identifier
 * @param title - Section title
 * @param icon - React icon component to display
 * @param isReviewed - Whether this section has been reviewed
 * @param onMarkReviewed - Callback when Mark Reviewed is clicked
 * @param children - Section content
 */
export function SectionCard({
  id,
  title,
  icon: Icon,
  isReviewed,
  onMarkReviewed,
  children,
}: {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg"><Icon className="text-slate-600" /></div>
            <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
          </div>
          {!isReviewed && (
            <button onClick={() => onMarkReviewed(id)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-sm">
              <FaCheck /> Mark Reviewed
            </button>
          )}
          {isReviewed && <span className="flex items-center gap-1 text-emerald-600 text-sm"><FaCheck /> Reviewed</span>}
        </div>
        {children}
      </div>
    </motion.div>
  );
}
