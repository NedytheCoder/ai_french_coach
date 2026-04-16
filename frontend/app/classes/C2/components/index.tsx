/**
 * C2 Shared Components - Mastery Level (Near-Native)
 * ====================================================
 *
 * This file contains all shared React components used across C2 modules.
 * These components implement the UI for near-native French mastery level
 * lessons, featuring sophisticated styling and interactive elements.
 *
 * **Component Categories:**
 *
 * 1. TYPES & INTERFACES - Data structures for C2 content
 *    - ModuleMeta: Module metadata (title, subtitle, number)
 *    - PracticeQuestion: Quiz question structure (precision, register, etc.)
 *    - WeakStrongExpert: 3-tier progression examples (weak/strong/expert)
 *    - Transformation: Original/improved/expert text transformation
 *    - AnalysisTask: Text analysis exercise structure
 *
 * 2. MODULE LAYOUT COMPONENTS - Page structure elements
 *    - ModuleHeader: Module title badge with C2 Mastery label
 *    - ModuleNav: Navigation back button
 *    - ProgressBar: Section review progress indicator
 *    - SectionCard: Reviewable content section container
 *    - CompletionCard: Module completion summary
 *
 * 3. CONTENT DISPLAY COMPONENTS - Educational content presentation
 *    - NuanceBlock: Highlighted insight container with lightbulb icon
 *    - RhetoricCard: Rhetorical technique display
 *    - WeakStrongExpertCard: 3-tier progression display (rose/amber/emerald)
 *    - ComparisonCard: Side-by-side comparison with level badges
 *    - TransformationCard: Original/improved/expert transformation display
 *    - ExampleBlock: Level-tagged examples with analysis
 *    - AnalysisCard: Text analysis task display
 *
 * 4. INTERACTIVE COMPONENTS - User engagement
 *    - PracticeSection: Full quiz interface with scoring and feedback
 *
 * **Design System:**
 * - Color coding: rose (weak/C1), amber (strong/C2 entry), emerald (expert/near-native)
 * - Icons: react-icons/fa for consistent iconography
 * - Motion: framer-motion for smooth animations
 * - Styling: Tailwind CSS with slate color palette
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheck,            // Reviewed state indicator
  FaArrowRight,       // Next button, navigation
  FaArrowLeft,        // Back navigation
  FaRedo,             // Restart quiz
  FaTrophy,           // Completion achievement
  FaLightbulb,        // NuanceBlock insight
  FaBalanceScale,     // ComparisonCard
  FaFeather,          // ExampleBlock
  FaExclamationTriangle, // (unused)
  FaStar,             // (unused)
  FaGem,              // C2 Mastery badge
} from "react-icons/fa";
import Link from "next/link";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * ModuleMeta - Module metadata structure.
 */
export interface ModuleMeta {
  title: string;
  subtitle: string;
  moduleNumber: number;
}

export interface PracticeQuestion {
  id: number;
  type: "precision" | "register" | "transformation" | "interpretation" | "rhetoric" | "ambiguity";
  prompt: string;
  context?: string;
  options: string[];
  correct: number;
  explanation: string;
  nuance?: string;
}

export interface WeakStrongExpert {
  weak: string;
  strong: string;
  expert: string;
  analysis: string;
}

export interface Transformation {
  original: string;
  improved: string;
  expert: string;
  technique: string;
}

export interface AnalysisTask {
  task: string;
  text: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

/**
 * ModuleHeader - Displays module title badge with C2 Mastery indicator.
 *
 * Features:
 * - FaGem icon with "Module {n}" badge
 * - "C2 Mastery" label
 * - Animated entrance with framer-motion
 * - Large title with subtitle
 */
export function ModuleHeader({ moduleNumber, title, subtitle }: { moduleNumber: number; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-8 shadow-sm border border-slate-200"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="px-3 py-1 bg-slate-900 text-white text-sm font-medium rounded-full flex items-center gap-1">
          <FaGem className="text-xs" /> Module {moduleNumber}
        </span>
        <span className="text-slate-400 text-sm">C2 Mastery</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-800 mb-3">{title}</h1>
      <p className="text-lg text-slate-600 leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}

/**
 * NuanceBlock - Highlighted insight container with lightbulb icon.
 *
 * Used for displaying key insights, tips, or nuanced explanations.
 * Features optional highlight text and custom content.
 */
export function NuanceBlock({ title, children, highlight }: { title: string; children: React.ReactNode; highlight?: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg"><FaLightbulb className="text-indigo-600" /></div>
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      {highlight && <p className="text-indigo-700 font-medium mb-3">{highlight}</p>}
      <div className="text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
}

/**
 * RhetoricCard - Displays a rhetorical technique with description and example.
 *
 * Shows technique name, description, example sentence, and effect.
 */
export function RhetoricCard({ technique, description, example, effect }: { technique: string; description: string; example: string; effect: string }) {
  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
      <p className="font-semibold text-slate-800 mb-1">{technique}</p>
      <p className="text-sm text-slate-600 mb-2">{description}</p>
      <p className="text-slate-700 italic mb-2">{example}</p>
      <p className="text-xs text-slate-500">Effect: {effect}</p>
    </div>
  );
}

/**
 * WeakStrongExpertCard - Displays 3-tier progression (weak/strong/expert).
 *
 * Color coding:
 * - rose: Weak (C1 level)
 * - amber: Strong (C2 entry level)
 * - emerald: Expert (Near-native level)
 *
 * Each tier shows the expression and includes analysis.
 */
export function WeakStrongExpertCard({ examples }: { examples: WeakStrongExpert[] }) {
  return (
    <div className="space-y-4">
      {examples.map((ex, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="grid gap-3 mb-4">
            <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
              <p className="text-xs text-rose-600 mb-1">Weak (C1 level)</p>
              <p className="text-slate-700">{ex.weak}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-600 mb-1">Strong (C2 entry)</p>
              <p className="text-slate-700">{ex.strong}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-xs text-emerald-600 mb-1">Expert (Near-native)</p>
              <p className="text-slate-700">{ex.expert}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600"><span className="font-medium">Analysis:</span> {ex.analysis}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * ComparisonCard - Side-by-side comparison with level badges.
 *
 * Displays multiple items with labels, colored by level (Weak/Strong/Expert).
 * Uses FaBalanceScale icon.
 */
export function ComparisonCard({ title, items }: { title: string; items: { label: string; text: string; level: string }[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <FaBalanceScale className="text-indigo-500" />
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-lg ${idx === 2 ? "bg-emerald-50 border border-emerald-200" : idx === 1 ? "bg-amber-50 border border-amber-200" : "bg-slate-50"}`}>
            <div className="flex justify-between mb-1">
              <p className="text-sm text-slate-500">{item.label}</p>
              <span className={`text-xs px-2 py-0.5 rounded ${idx === 2 ? "bg-emerald-200 text-emerald-800" : idx === 1 ? "bg-amber-200 text-amber-800" : "bg-slate-200 text-slate-600"}`}>{item.level}</span>
            </div>
            <p className={`font-medium ${idx === 2 ? "text-emerald-800" : idx === 1 ? "text-amber-800" : "text-slate-700"}`}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * TransformationCard - Displays original/improved/expert transformations.
 *
 * Shows technique badge and three versions of text with color coding.
 */
export function TransformationCard({ transformations }: { transformations: Transformation[] }) {
  return (
    <div className="space-y-4">
      {transformations.map((t, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-slate-800 text-white text-xs font-medium rounded">{t.technique}</span>
          </div>
          <div className="grid gap-3 mb-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Original</p>
              <p className="text-slate-700">{t.original}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="text-xs text-amber-600 mb-1">Improved</p>
              <p className="text-amber-800">{t.improved}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="text-xs text-emerald-600 mb-1">Expert</p>
              <p className="text-emerald-800">{t.expert}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * ExampleBlock - Displays level-tagged examples with analysis.
 *
 * Uses FaFeather icon. Each example shows level badge, text, and analysis.
 */
export function ExampleBlock({ title, examples }: { title: string; examples: { text: string; analysis: string; level: string }[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <FaFeather className="text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="space-y-4">
        {examples.map((ex, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className={`text-xs px-2 py-0.5 rounded ${ex.level === "Expert" ? "bg-emerald-200 text-emerald-800" : ex.level === "Strong" ? "bg-amber-200 text-amber-800" : "bg-slate-200 text-slate-600"}`}>{ex.level}</span>
            </div>
            <p className="text-slate-700 font-medium mb-2">{ex.text}</p>
            <p className="text-sm text-slate-600">{ex.analysis}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * AnalysisCard - Displays text analysis task with structured layout.
 *
 * Shows task description, text to analyze, and analysis in highlighted box.
 */
export function AnalysisCard({ task, text, analysis }: { task: string; text: string; analysis: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <p className="text-sm text-indigo-600 font-medium mb-2">{task}</p>
      <p className="text-slate-700 italic mb-4">{text}</p>
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="text-slate-700">{analysis}</p>
      </div>
    </div>
  );
}

/**
 * PracticeSection - Full interactive quiz component with scoring.
 *
 * Features:
 * - Question navigation with progress indicator
 * - Multiple choice selection with visual feedback
 * - Real-time score tracking
 * - Explanation and nuance display after answering
 * - Completion screen with trophy and results
 * - Restart functionality
 *
 * State:
 * - current: Current question index
 * - selected: Selected answer index
 * - showFeedback: Whether to show answer feedback
 * - score: Running score count
 * - finished: Whether quiz is complete
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
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------
  const question = questions[current];

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------
  /**
   * handleAnswer - Processes user answer selection.
   * @param idx - Index of selected option
   */
  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    if (idx === question.correct) setScore((s) => s + 1);
  };

  /**
   * next - Advances to next question or completes quiz.
   */
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

  // ---------------------------------------------------------------------------
  // RENDER: Completion Screen
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // RENDER: Quiz Interface
  // ---------------------------------------------------------------------------
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Quiz Header - Progress indicator */}
      <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-500">Question {current + 1}/{questions.length}</span>
          <span className="text-sm font-medium text-slate-700">Score: {score}</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full">
          <div className="h-2 bg-slate-800 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
      </div>
      {/* Question Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {/* Question Type Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 text-xs font-medium rounded ${question.type === "precision" ? "bg-indigo-100 text-indigo-700" : question.type === "register" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                {question.type}
              </span>
            </div>
            {/* Question Prompt and Context */}
            <p className="text-lg text-slate-800 font-medium mb-2">{question.prompt}</p>
            {question.context && <p className="text-sm text-slate-500 mb-4">{question.context}</p>}
            {/* Answer Options */}
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
            {/* Feedback Panel - Shows after answering */}
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

/**
 * ProgressBar - Section review progress indicator with animated bar.
 *
 * Shows current/total count with percentage and animated progress fill.
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
        <motion.div className="h-full bg-gradient-to-r from-slate-700 to-slate-900" initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.5 }} />
      </div>
    </div>
  );
}

/**
 * ModuleNav - Navigation back button with Link component.
 *
 * Simple back navigation with FaArrowLeft icon.
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

/**
 * CompletionCard - Module completion summary with achievement display.
 *
 * Features:
 * - FaTrophy icon with animated entrance
 * - Score display
 * - Mastery recap items list
 * - Next module navigation button
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white">
      <div className="flex items-center gap-3 mb-4">
        <FaTrophy className="text-3xl text-amber-400" />
        <div>
          <h2 className="text-2xl font-bold">Module {moduleNumber} Complete</h2>
          <p className="text-slate-400">{moduleTitle}</p>
        </div>
      </div>
      <p className="text-lg mb-4">Score: {practiceScore}/{totalQuestions}</p>
      <div className="bg-white/10 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Mastery Achieved</h3>
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

/**
 * SectionCard - Reviewable content section container with icon.
 *
 * Features:
 * - Icon display with title
 * - Mark Reviewed / Reviewed state toggle
 * - Animated entrance with framer-motion
 * - Custom children content
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
