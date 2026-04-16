/**
 * A2 Lesson 14 - Adverbs of Frequency, Quantity, and Manner
 * =============================================================
 *
 * This page teaches A2 learners how to use French adverbs to add detail and
 * precision to sentences, covering frequency, quantity, and manner adverbs.
 *
 * **Lesson Structure:**
 * 1. WhatIsAdverbSection - Introduction to adverbs
 * 2. FrequencySection - Adverbs of frequency (toujours, souvent, jamais)
 * 3. QuantitySection - Adverbs of quantity (très, beaucoup, assez)
 * 4. MannerSection - Adverbs of manner (lentement, bien, mal)
 * 5. PositionSection - Where to place adverbs in sentences
 * 6. AdjectiveVsAdverbSection - Difference between adjectives and adverbs
 * 7. GuidedExamplesSection - Full example sentences
 * 8. MistakesSection - Common errors to avoid
 * 9. PracticeSection - Interactive quiz (18 questions)
 * 10. CompletionSection - Lesson completion UI
 *
 * **Key Concepts:**
 * - Adverbs modify verbs, adjectives, or other adverbs
 * - Many French adverbs end in -ment
 * - Position: usually after the verb they modify
 * - Adjectives describe nouns, adverbs describe actions
 *
 * **Features:**
 * - Collapsible sections with auto-mark-as-reviewed
 * - Progress persistence to localStorage
 * - 18-question interactive quiz with feedback
 * - Performance-based personalized messages
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
  FaBookOpen,               // Lesson content/introduction
  FaClock,                  // Frequency/time
  FaBalanceScale,           // Comparison
  FaRuler,                  // Quantity/measurement
  FaRunning,                // Manner/action
  FaList,                   // Position/patterns
  FaExchangeAlt,            // Adjective vs adverb comparison
  FaExclamationTriangle,    // Mistakes/warnings
  FaQuestionCircle,         // Practice questions
  FaTrophy,                 // Completion badge
  FaRedo,                   // Retake practice
  FaArrowAltCircleRight,    // Continue navigation
  FaInfoCircle,             // Additional info
} from "react-icons/fa";

// Lesson data imports
import {
  sectionIds,
  frequencyAdverbs,
  quantityAdverbs,
  mannerAdverbs,
  positionPatterns,
  adjectiveVsAdverb,
  guidedExamples,
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
        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-cyan-50 to-white hover:from-cyan-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500 rounded-xl text-white">
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
                  className="mt-6 flex items-center gap-2 px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg transition-colors font-medium"
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
 * - A2 Lesson 14 badge
 * - Main title: "Adverbs of Frequency, Quantity, and Manner"
 * - Brief description of lesson content
 * - Instructions for learners
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-cyan-500 to-teal-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">A2 Lesson 14</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">Adverbs of Frequency, Quantity, and Manner</h1>
      <p className="text-cyan-100 text-lg">Learn how to talk about how often, how much, and how something happens in French.</p>
      <p className="mt-4 text-sm text-cyan-50">Read the explanations, notice the patterns, and complete the practice to build confidence.</p>
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
          className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
        />
      </div>
    </div>
  );
}

/**
 * WhatIsAdverbSection - Introduction to adverbs.
 *
 * Content:
 * - Definition of adverbs
 * - What adverbs modify (verbs, adjectives, sentences)
 * - Questions adverbs answer (how, how often, how much)
 * - Simple examples showing adverbs in action
 */
function WhatIsAdverbSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="what-is-adverb" title="What is an Adverb?" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          An adverb gives more information about a verb, an adjective, or sometimes a whole sentence.
        </p>
        <p className="text-slate-700">It can answer questions like:</p>
        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li>how?</li>
          <li>how often?</li>
          <li>how much?</li>
        </ul>
        <div className="space-y-3 mt-4">
          <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
            <p className="font-medium text-cyan-800">Il parle lentement.</p>
          </div>
          <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
            <p className="font-medium text-cyan-800">Je vais souvent à la bibliothèque.</p>
          </div>
          <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
            <p className="font-medium text-cyan-800">Elle est très gentille.</p>
          </div>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800"><strong>Helper:</strong> At A2 level, you do not need every rule. Focus on recognizing common patterns and positions.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * FrequencySection - Adverbs expressing how often something happens.
 *
 * Content:
 * - toujours (always)
 * - souvent (often)
 * - parfois/quelquefois (sometimes)
 * - rarement (rarely)
 * - jamais (never)
 */
function FrequencySection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="frequency" title="Adverbs of Frequency" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">These adverbs say how often something happens.</p>
        <div className="grid gap-3 mt-4">
          {frequencyAdverbs.map((adv, idx) => (
            <div key={idx} className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-cyan-800 text-lg">{adv.word}</p>
                  <p className="text-sm text-cyan-600">{adv.english}</p>
                </div>
              </div>
              <p className="mt-2 text-slate-700">{adv.example}</p>
              <p className="text-sm text-slate-500">{adv.exampleEnglish}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800">Frequency adverbs often come near the verb. Some, like jamais, often appear in negative structures.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * QuantitySection - Adverbs expressing amount or degree.
 *
 * Content:
 * - très (very)
 * - trop (too much)
 * - beaucoup (a lot)
 * - assez (enough)
 * - peu (little)
 * - presque (almost)
 * - environ (about/approximately)
 */
function QuantitySection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="quantity" title="Adverbs of Quantity" icon={FaRuler} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          These adverbs show degree, amount, or intensity. They often modify verbs, adjectives, or other adverbs.
        </p>
        <div className="grid gap-3 mt-4">
          {quantityAdverbs.map((adv, idx) => (
            <div key={idx} className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-cyan-800 text-lg">{adv.word}</p>
                  <p className="text-sm text-cyan-600">{adv.english}</p>
                </div>
              </div>
              <p className="mt-2 text-slate-700">{adv.example}</p>
              <p className="text-sm text-slate-500">{adv.exampleEnglish}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800">Some quantity adverbs describe amount. Others describe intensity.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * MannerSection - Adverbs expressing how something is done.
 *
 * Content:
 * - lentement (slowly)
 * - rapidement (quickly)
 * - facilement (easily)
 * - heureusement/malheureusement (fortunately/unfortunately)
 * - bien (well)
 * - mal (badly)
 */
function MannerSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="manner" title="Adverbs of Manner" icon={FaRunning} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">These adverbs describe how an action happens. Many are formed from adjectives, often with -ment.</p>
        <div className="grid gap-3 mt-4">
          {mannerAdverbs.map((adv, idx) => (
            <div key={idx} className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-cyan-800 text-lg">{adv.word}</p>
                  <p className="text-sm text-cyan-600">{adv.english}</p>
                </div>
              </div>
              <p className="mt-2 text-slate-700">{adv.example}</p>
              <p className="text-sm text-slate-500">{adv.exampleEnglish}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800"><strong>Note:</strong> Many adverbs of manner end in -ment, but not all. Bien and mal are especially important common adverbs.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * PositionSection - Where to place adverbs in French sentences.
 *
 * Content:
 * - After simple verbs
 * - Near the verb for frequency adverbs
 * - Très + adjective/adverb
 * - Between auxiliary and participle in compound tenses
 */
function PositionSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="position" title="Sentence Position Patterns" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">Adverb position can vary, but at this level learners should focus on the most common patterns.</p>
        <div className="space-y-4 mt-4">
          {positionPatterns.map((pat, idx) => (
            <div key={idx} className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
              <p className="font-semibold text-cyan-800 mb-2">{pat.pattern}</p>
              <p className="text-slate-700">{pat.example}</p>
              <p className="text-sm text-slate-500">{pat.english}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
          <p className="text-blue-800 text-sm"><strong>Important:</strong> Keep this practical. Do not overload with rare exceptions.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * AdjectiveVsAdverbSection - Difference between adjectives and adverbs.
 *
 * Content:
 * - Adjectives describe nouns (agree in gender/number)
 * - Adverbs describe verbs/actions (invariable)
 * - Examples showing rapide vs rapidement
 * - Formation of -ment adverbs from adjectives
 */
function AdjectiveVsAdverbSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="adjective-vs-adverb" title="Adjective vs Adverb" icon={FaExchangeAlt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2">Adjective</h4>
            <p className="text-sm text-teal-600">Describes a noun</p>
          </div>
          <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
            <h4 className="font-semibold text-cyan-800 mb-2">Adverb</h4>
            <p className="text-sm text-cyan-600">Describes a verb, adjective, or sentence</p>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {adjectiveVsAdverb.map((ex, idx) => (
            <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                  <p className="font-medium text-teal-800">{ex.adjectiveSentence}</p>
                  <p className="text-sm text-teal-600">{ex.adjectiveEnglish}</p>
                </div>
                <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-100">
                  <p className="font-medium text-cyan-800">{ex.adverbSentence}</p>
                  <p className="text-sm text-cyan-600">{ex.adverbEnglish}</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * GuidedExamplesSection - Collection of example sentences for study.
 *
 * Various contexts showing adverbs in everyday French sentences,
 * combining different types of adverbs.
 */
function GuidedExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="guided-examples" title="Guided Examples" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <p className="text-slate-700">Study these examples to see adverbs in context:</p>
        <div className="space-y-3 mt-4">
          {guidedExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <span className="text-lg font-medium text-cyan-700">{ex.french}</span>
              <span className="text-sm text-slate-500">{ex.english}</span>
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
 * - Using adjective instead of adverb (bon vs bien)
 * - Incorrect position of adverbs
 * - Stacking adverbs incorrectly
 * - Wrong placement in compound tenses
 */
function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Beginner Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed}>
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800">
            These mistakes are very common. They usually happen when learners mix adjectives and adverbs, or place adverbs in an unnatural position.
          </p>
        </div>
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
 * PracticeSection - Interactive quiz for Lesson 14.
 *
 * Features:
 * - 18 questions testing adverb knowledge
 * - Multiple choice format
 * - Immediate feedback with explanations
 * - Score tracking and performance message
 *
 * State:
 * - currentQuestion - Index of current question (0-17)
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Practice Complete!</h2>
          <p className="text-slate-600">You scored {score} out of {practiceQuestions.length}</p>
          <p className="text-lg font-medium text-cyan-600 mt-1">{Math.round((score / practiceQuestions.length) * 100)}%</p>
        </div>
        <div className={`p-6 rounded-xl border mb-6 ${performance.color === "green" ? "bg-emerald-50 border-emerald-100" : performance.color === "yellow" ? "bg-amber-50 border-amber-100" : "bg-blue-50 border-blue-100"}`}>
          <h3 className={`font-semibold mb-2 ${performance.color === "green" ? "text-emerald-800" : performance.color === "yellow" ? "text-amber-800" : "text-blue-800"}`}>{performance.title}</h3>
          <p className={`${performance.color === "green" ? "text-emerald-700" : performance.color === "yellow" ? "text-amber-700" : "text-blue-700"}`}>{performance.message}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleRetake} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-medium"><FaRedo size={18} /> Retake practice</button>
          <button onClick={handleContinueAnyway} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-colors font-medium">Continue lesson <FaArrowAltCircleRight size={18} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">Practice {currentQuestion + 1} of {practiceQuestions.length}</span>
          <span className="text-sm font-medium text-cyan-600">Score: {score}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium mb-3">{question.topic}</span>
            <h3 className="text-lg font-medium text-slate-800">{question.prompt}</h3>
          </div>
          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl text-left transition-all ${selectedOption === idx ? (hasSubmitted ? (idx === question.correct ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800" : "bg-red-100 border-2 border-red-500 text-red-800") : "bg-cyan-100 border-2 border-cyan-500 text-cyan-800") : (hasSubmitted && idx === question.correct ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800" : "bg-slate-50 border-2 border-slate-200 hover:border-cyan-300 text-slate-700")}`}
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
              <button onClick={handleSubmit} disabled={selectedOption === null} className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors">Submit</button>
            ) : (
              <button onClick={handleNext} className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">{currentQuestion < practiceQuestions.length - 1 ? (<>Next <FaArrowRight /></>) : "See Results"}</button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * CompletionSection - Lesson completion celebration and summary.
 *
 * Content:
 * - Trophy icon and congratulations message
 * - Practice score display
 * - Summary of learned skills
 * - Link to B1 lessons (next level)
 *
 * @param practiceScore - Score achieved in practice quiz
 */
function CompletionSection({ practiceScore }: { practiceScore: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-cyan-500 to-teal-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4"><FaTrophy size={32} className="text-white" /></div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-cyan-100 mb-6">You've completed A2 Lesson 14 — Adverbs of Frequency, Quantity, and Manner</p>
        {practiceScore > 0 && <p className="text-cyan-50 mb-4">Practice score: {practiceScore}/{practiceQuestions.length}</p>}
        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-cyan-50 text-sm">
            <li>• How to recognize adverbs of frequency, quantity, and manner</li>
            <li>• Where to place common adverbs in a sentence</li>
            <li>• The difference between adjectives and adverbs</li>
            <li>• Common patterns for bien, mal, très, beaucoup, and others</li>
          </ul>
        </div>
        <Link href="/learn/b1" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-cyan-600 rounded-xl font-medium hover:bg-cyan-50 transition-colors">Continue to B1 Lessons <FaArrowRight /></Link>
      </div>
    </motion.div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson14Page - Main component for A2 Lesson 14.
 *
 * Manages:
 * - Section review state (which sections have been reviewed)
 * - Practice quiz answers and score
 * - Lesson completion status
 * - Progress persistence to localStorage
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson14Page() {
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
    const saved = localStorage.getItem("a2Lesson14Progress");
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
      localStorage.setItem("a2Lesson14Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-slate-50 flex items-center justify-center"><div className="text-cyan-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/classes/A2" className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors"><FaArrowLeft size={18} /><span>Back to A2 Lessons</span></Link>
        </div>

        {/* Lesson Header */}
        <LessonHeader />

        {/* Progress Bar - Section Review Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" /></div>

        {/* Lesson Sections - In Order of Instruction */}
        <WhatIsAdverbSection isReviewed={reviewedSections.includes("what-is-adverb")} onMarkReviewed={handleMarkReviewed} />
        <FrequencySection isReviewed={reviewedSections.includes("frequency")} onMarkReviewed={handleMarkReviewed} />
        <QuantitySection isReviewed={reviewedSections.includes("quantity")} onMarkReviewed={handleMarkReviewed} />
        <MannerSection isReviewed={reviewedSections.includes("manner")} onMarkReviewed={handleMarkReviewed} />
        <PositionSection isReviewed={reviewedSections.includes("position")} onMarkReviewed={handleMarkReviewed} />
        <AdjectiveVsAdverbSection isReviewed={reviewedSections.includes("adjective-vs-adverb")} onMarkReviewed={handleMarkReviewed} />
        <GuidedExamplesSection isReviewed={reviewedSections.includes("guided-examples")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        {/* Practice Section - 18 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-cyan-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500 rounded-xl text-white"><FaQuestionCircle size={24} /></div>
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
