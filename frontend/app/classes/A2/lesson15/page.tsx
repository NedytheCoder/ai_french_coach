/**
 * A2 Lesson 15 - Communicating in Longer Sentences (Final A2 Lesson)
 * ====================================================================
 *
 * This page teaches A2 learners how to combine skills to create more complex
 * French sentences. This is the final A2 lesson before progressing to B1.
 *
 * **Lesson Structure:**
 * 1. WhyMattersSection - Why longer communication matters
 * 2. StorytellingSection - Connecting events in narratives
 * 3. OpinionsSection - Expressing opinions with reasons
 * 4. ComparisonsSection - Making comparisons (plus...que, moins...que, aussi...que)
 * 5. ConnectorsSection - Linking ideas with connectors (et, mais, parce que, donc)
 * 6. GuidedExamplesSection - Full example sentences
 * 7. PatternsSection - Structured speaking/writing patterns
 * 8. MistakesSection - Common errors to avoid
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionSection - Lesson completion and A2 graduation
 *
 * **Key Concepts:**
 * - Storytelling: Time + action + detail + feeling
 * - Opinions: Je pense que..., À mon avis..., Je trouve...
 * - Comparisons: plus...que, moins...que, aussi...que
 * - Connectors: et, mais, parce que, donc, ensuite, puis
 * - Building on all A2 skills for B1 readiness
 *
 * **Features:**
 * - Collapsible sections with auto-mark-as-reviewed
 * - Progress persistence to localStorage
 * - 15-question interactive quiz with feedback
 * - Performance-based personalized messages
 * - Link to B1 lessons upon completion
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import React, { useState, useEffect, useMemo } from "react";

// Framer Motion for animations and transitions
import { motion, AnimatePresence } from "framer-motion";

// Next.js Link for navigation
import Link from "next/link";

// React Icons for UI elements
import {
  FaArrowLeft,              // Back navigation
  FaArrowRight,             // Continue/Next buttons
  FaCheckCircle,            // Reviewed status
  FaBookOpen,               // Storytelling/lesson content
  FaComments,               // Opinions/discussion
  FaLightbulb,              // Introduction/why it matters
  FaBalanceScale,           // Comparisons
  FaLink,                   // Connectors
  FaList,                   // Patterns/structure
  FaExclamationTriangle,    // Mistakes/warnings
  FaQuestionCircle,         // Practice questions
  FaTrophy,                 // Completion badge
  FaRedo,                   // Retake practice
  FaArrowAltCircleRight,    // Continue navigation
  FaStar,                   // Guided examples
} from "react-icons/fa";

// Lesson data imports
import {
  sectionIds,
  storytellingExamples,
  opinionExpressions,
  comparisonExamples,
  connectors,
  connectorExamples,
  guidedExamples,
  communicationPatterns,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

// =============================================================================
// TYPES
// =============================================================================

/**
 * SectionCardProps - Props for the collapsible section card component.
 */
interface SectionCardProps {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}

// =============================================================================
// SUB-COMPONENT: SectionCard
// =============================================================================

/**
 * SectionCard - Collapsible wrapper for lesson content sections.
 *
 * Features:
 * - Expandable/collapsible content with animated transitions
 * - Auto-mark-as-reviewed when opened
 * - Icon and title in gradient header
 * - Visual indicator for reviewed status
 *
 * @param id - Section identifier
 * @param title - Section title displayed in header
 * @param icon - React icon component for the section
 * @param children - Section content to display when expanded
 * @param isReviewed - Whether this section has been reviewed
 * @param onMarkReviewed - Callback to mark section as reviewed
 */
function SectionCard({
  id,
  title,
  icon: Icon,
  children,
  isReviewed,
  onMarkReviewed,
}: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-amber-50 to-white hover:from-amber-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500 rounded-xl text-white">
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
                  className="mt-6 flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-colors font-medium"
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

/**
 * LessonHeader - Displays the lesson title and introduction.
 *
 * Shows:
 * - A2 Lesson 15 badge (Final A2 Lesson)
 * - Main title: "Communicating in Longer Sentences"
 * - Brief description of lesson content
 * - Instructions for learners
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">A2 Lesson 15</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">Communicating in Longer Sentences</h1>
      <p className="text-amber-100 text-lg">Learn how to tell stories, give opinions, and compare ideas in French.</p>
      <p className="mt-4 text-sm text-amber-50">Focus on expressing ideas clearly. You don't need perfect grammar to communicate well.</p>
    </div>
  );
}

/**
 * ProgressBar - Visual indicator of lesson completion.
 *
 * @param current - Number of sections reviewed
 * @param total - Total number of sections
 * @param label - Label to display (e.g., "Lesson Progress")
 */
function ProgressBar({ current, total, label }: { current: number; total: number; label: string }) {
  const percentage = Math.round((current / total) * 100);
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
          className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
        />
      </div>
    </div>
  );
}

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

/**
 * WhyMattersSection - Why longer communication matters at A2 level.
 *
 * Content:
 * - Explains the importance of combining A2 skills
 * - How longer sentences help express complete thoughts
 * - Preparation for B1 level communication
 */
function WhyMattersSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="why-matters" title="Why Longer Communication Matters" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">At beginner level, learners use short sentences. At A2 level, learners begin to:</p>
        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li>connect ideas</li>
          <li>explain things</li>
          <li>describe experiences</li>
        </ul>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800"><strong>The goal is not perfection — it's clarity.</strong></p>
          <p className="text-amber-700 mt-2">Even simple sentences can form strong communication when connected.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * StorytellingSection - Connecting events in narratives.
 *
 * Content:
 * - How to link multiple past events
 * - Using passé composé + imparfait together
 * - Story structure: Time + action + detail + feeling
 * - Examples of connected storytelling
 */
function StorytellingSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="storytelling" title="Storytelling Basics" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700">To tell a simple story:</p>
        <ol className="list-decimal list-inside text-slate-700 space-y-2 ml-4">
          <li>say when (time)</li>
          <li>say what happened</li>
          <li>add one or two details</li>
        </ol>
        <div className="space-y-3 mt-4">
          {storytellingExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-medium text-amber-800">{ex.french}</p>
              <p className="text-sm text-amber-600">{ex.english}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
          <p className="text-blue-800"><strong>Pattern:</strong> Time + action + detail + feeling (optional)</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * OpinionsSection - Expressing opinions with reasons.
 *
 * Content:
 * - Je pense que... (I think that...)
 * - À mon avis... (In my opinion...)
 * - Je trouve... (I find...)
 * - Adding reasons with parce que
 */
function OpinionsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="opinions" title="Giving Opinions" icon={FaComments} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700">To give an opinion:</p>
        <ol className="list-decimal list-inside text-slate-700 space-y-2 ml-4">
          <li>say what you think</li>
          <li>give a reason</li>
        </ol>
        <div className="space-y-3 mt-4">
          {opinionExpressions.map((ex, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-medium text-amber-800">{ex.french}</p>
              <p className="text-sm text-amber-600">{ex.english}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 mt-4">
          <p className="text-emerald-800"><strong>Tip:</strong> Always try to add <strong>parce que (because)</strong> for stronger communication.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ComparisonsSection - Making comparisons in French.
 *
 * Content:
 * - plus...que (more...than)
 * - moins...que (less...than)
 * - aussi...que (as...as)
 * - Examples showing all three patterns
 */
function ComparisonsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="comparisons" title="Making Comparisons" icon={FaBalanceScale} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700">To compare things, use:</p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-semibold text-blue-800">plus… que</p>
            <p className="text-sm text-blue-600">more… than</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <p className="font-semibold text-purple-800">moins… que</p>
            <p className="text-sm text-purple-600">less… than</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="font-semibold text-emerald-800">aussi… que</p>
            <p className="text-sm text-emerald-600">as… as</p>
          </div>
        </div>
        <div className="space-y-3 mt-4">
          {comparisonExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-medium text-amber-800">{ex.french}</p>
              <p className="text-sm text-amber-600">{ex.english}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 mt-4">
          <p className="text-indigo-800">Comparisons help you express opinions more clearly.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ConnectorsSection - Linking ideas with connectors.
 *
 * Content:
 * - et (and) - addition
 * - mais (but) - contrast
 * - parce que (because) - cause/reason
 * - donc (so/therefore) - result
 * - ensuite, puis (then) - sequence
 */
function ConnectorsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="connectors" title="Linking Ideas (Connectors)" icon={FaLink} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700">To speak in longer sentences, you need connectors.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {connectors.map((conn, idx) => (
            <div key={idx} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
              <p className="font-semibold text-amber-800">{conn.word}</p>
              <p className="text-sm text-amber-600">{conn.english}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3 mt-4">
          <h4 className="font-semibold text-slate-700">Examples</h4>
          {connectorExamples.map((ex, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-lg">
              <p className="font-medium text-amber-700">{ex.french}</p>
              <p className="text-sm text-slate-500">{ex.english}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * GuidedExamplesSection - Complete example sentences combining multiple A2 skills.
 *
 * Various contexts showing storytelling, opinions, comparisons,
 * and connectors all working together in natural French.
 */
function GuidedExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="guided-examples" title="Guided Communication Examples" icon={FaStar} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700">Study these examples that combine storytelling, opinions, and comparisons:</p>
        <div className="space-y-3 mt-4">
          {guidedExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-medium text-amber-800">{ex.french}</p>
              <p className="text-sm text-amber-600">{ex.english}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * PatternsSection - Structured speaking/writing patterns.
 *
 * Content:
 * - Story pattern: Time + action + detail + feeling
 * - Opinion pattern: Opinion + reason
 * - Comparison pattern: Thing A + comparison + thing B
 */
function PatternsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="patterns" title="Structured Speaking/Writing Patterns" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700">Use these simple templates for your own communication:</p>
        <div className="space-y-4 mt-4">
          {communicationPatterns.map((pat, idx) => (
            <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-2">{pat.title}</h4>
              <p className="text-sm text-slate-500 mb-2">Structure: <span className="font-medium text-amber-600">{pat.structure}</span></p>
              <p className="text-slate-700 italic">{pat.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * MistakesSection - Common errors and how to avoid them.
 *
 * Content:
 * - Missing que after Je pense
 * - Missing que in comparisons
 * - Missing connectors between clauses
 * - Incorrect use of parce que
 */
function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Beginner Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <div className="space-y-4 mt-4">
          {commonMistakes.map((ex, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-slate-100">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-red-600 line-through">{ex.wrong}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-emerald-700 font-medium">{ex.correct}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3 bg-slate-50 p-2 rounded">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * PracticeSection - Interactive quiz for Lesson 15 (final A2 lesson).
 *
 * Features:
 * - 15 questions testing combined A2 skills
 * - Multiple choice format
 * - Immediate feedback with explanations
 * - Score tracking and performance message
 *
 * State:
 * - currentQuestion - Index of current question (0-14)
 * - selectedOption - Currently selected answer index
 * - hasSubmitted - Whether answer has been submitted
 * - isCorrect - Whether submitted answer was correct
 * - score - Total correct answers
 * - showResults - Whether to show final results screen
 */
function PracticeSection({ isReviewed, onMarkReviewed, onComplete }: { isReviewed: boolean; onMarkReviewed: (id: string) => void; onComplete: (score: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = practiceQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / practiceQuestions.length) * 100;

  const handleSelect = (index: number) => { if (!hasSubmitted) setSelectedOption(index); };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === question.correct;
    setIsCorrect(correct);
    setHasSubmitted(true);
    if (correct) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentQuestion < practiceQuestions.length - 1) {
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
    const performance = getPerformanceMessage(score, practiceQuestions.length);
    onComplete(score);

    return (
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice Complete!</h2>
          <p className="text-slate-600">You scored {score} out of {practiceQuestions.length}</p>
          <p className="text-lg font-medium text-amber-600 mt-1">{Math.round((score / practiceQuestions.length) * 100)}%</p>
        </div>
        <div className={`p-6 rounded-xl border mb-6 ${performance.color === "green" ? "bg-emerald-50 border-emerald-100" : performance.color === "yellow" ? "bg-amber-50 border-amber-100" : "bg-blue-50 border-blue-100"}`}>
          <h3 className={`font-semibold mb-2 ${performance.color === "green" ? "text-emerald-800" : performance.color === "yellow" ? "text-amber-800" : "text-blue-800"}`}>{performance.title}</h3>
          <p className={`${performance.color === "green" ? "text-emerald-700" : performance.color === "yellow" ? "text-amber-700" : "text-blue-700"}`}>{performance.message}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleRetake} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-medium"><FaRedo size={18} /> Retake practice</button>
          <button onClick={handleContinueAnyway} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors font-medium">Continue lesson <FaArrowAltCircleRight size={18} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">Practice {currentQuestion + 1} of {practiceQuestions.length}</span>
          <span className="text-sm font-medium text-amber-600">Score: {score}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3">{question.topic}</span>
            <h3 className="text-lg font-medium text-slate-800">{question.prompt}</h3>
          </div>
          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl text-left transition-all ${selectedOption === idx ? (hasSubmitted ? (idx === question.correct ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800" : "bg-red-100 border-2 border-red-500 text-red-800") : "bg-amber-100 border-2 border-amber-500 text-amber-800") : (hasSubmitted && idx === question.correct ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800" : "bg-slate-50 border-2 border-slate-200 hover:border-amber-300 text-slate-700")}`}
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
              <p className={`font-medium mb-2 ${isCorrect ? "text-emerald-800" : "text-amber-800"}`}>{isCorrect ? ["Nice", "Good catch", "That's right"][Math.floor(Math.random() * 3)] : ["Careful now", "You're seeing the pattern"][Math.floor(Math.random() * 2)]}</p>
              <p className={isCorrect ? "text-emerald-700" : "text-amber-700"}>{question.explanation}</p>
            </motion.div>
          )}
          <div className="flex gap-4">
            {!hasSubmitted ? (
              <button onClick={handleSubmit} disabled={selectedOption === null} className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors">Submit</button>
            ) : (
              <button onClick={handleNext} className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">{currentQuestion < practiceQuestions.length - 1 ? (<>Next <FaArrowRight /></>) : "See Results"}</button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * CompletionSection - Lesson completion celebration and A2 graduation.
 *
 * Content:
 * - Trophy icon and congratulations message
 * - Practice score display
 * - Summary of all A2 skills learned
 * - Link to B1 lessons (next level)
 *
 * @param practiceScore - Score achieved in practice quiz
 */
function CompletionSection({ practiceScore }: { practiceScore: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4"><FaTrophy size={32} className="text-white" /></div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-amber-100 mb-6">You've completed A2 Lesson 15 — Communicating in Longer Sentences</p>
        {practiceScore > 0 && <p className="text-amber-50 mb-4">Practice score: {practiceScore}/{practiceQuestions.length}</p>}
        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-amber-50 text-sm">
            <li>• How to tell a simple story in French</li>
            <li>• How to give opinions with reasons</li>
            <li>• How to make comparisons</li>
            <li>• How to use basic connectors (et, mais, parce que, donc)</li>
            <li>• How to build short structured responses</li>
          </ul>
        </div>
        <Link href="/learn/b1" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-colors">Continue to B1 Lessons <FaArrowRight /></Link>
      </div>
    </motion.div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson15Page - Main component for A2 Lesson 15 (final A2 lesson).
 *
 * Manages:
 * - Section review state (which sections have been reviewed)
 * - Practice quiz answers and score
 * - Lesson completion status
 * - Progress persistence to localStorage
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson15Page() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  // List of reviewed section IDs
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  // Score achieved in practice quiz
  const [practiceScore, setPracticeScore] = useState(0);
  // Whether practice quiz is completed
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  // Hydration flag to prevent SSR/localStorage mismatch
  const [isClient, setIsClient] = useState(false);

  // ---------------------------------------------------------------------------
  // EFFECT: Load Progress from localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("a2Lesson15Progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviewedSections(parsed.reviewedSections || []);
        setPracticeScore(parsed.practiceScore || 0);
        setPracticeCompleted(parsed.practiceCompleted || false);
      } catch {
        // Invalid saved data, ignore
      }
    }
  }, []);

  // ---------------------------------------------------------------------------
  // EFFECT: Save Progress to localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("a2Lesson15Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------
  /**
   * handleMarkReviewed - Marks a section as reviewed.
   * @param id - Section identifier
   */
  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };

  /**
   * handlePracticeComplete - Updates practice score and marks as completed.
   * @param score - Final score achieved
   */
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------
  /**
   * progress - Calculated percentage of sections reviewed.
   */
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  // Show loading state during SSR hydration
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-50 flex items-center justify-center"><div className="text-amber-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/classes/A2" className="flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors"><FaArrowLeft size={18} /><span>Back to A2 Lessons</span></Link>
        </div>

        {/* Lesson Header */}
        <LessonHeader />

        {/* Progress Bar - Section Review Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" /></div>

        {/* Lesson Sections - In Order of Instruction */}
        <WhyMattersSection isReviewed={reviewedSections.includes("why-matters")} onMarkReviewed={handleMarkReviewed} />
        <StorytellingSection isReviewed={reviewedSections.includes("storytelling")} onMarkReviewed={handleMarkReviewed} />
        <OpinionsSection isReviewed={reviewedSections.includes("opinions")} onMarkReviewed={handleMarkReviewed} />
        <ComparisonsSection isReviewed={reviewedSections.includes("comparisons")} onMarkReviewed={handleMarkReviewed} />
        <ConnectorsSection isReviewed={reviewedSections.includes("connectors")} onMarkReviewed={handleMarkReviewed} />
        <GuidedExamplesSection isReviewed={reviewedSections.includes("guided-examples")} onMarkReviewed={handleMarkReviewed} />
        <PatternsSection isReviewed={reviewedSections.includes("patterns")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500 rounded-xl text-white"><FaQuestionCircle size={24} /></div>
              <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
            </div>
          </div>
          <div className="p-6">
            <PracticeSection isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && <CompletionSection practiceScore={practiceScore} />}
      </div>
    </div>
  );
}
