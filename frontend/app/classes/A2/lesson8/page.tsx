/**
 * A2 Lesson 8 - Advanced Prepositions (Prépositions Avancées)
 * ================================================================
 *
 * This page teaches A2 learners advanced French prepositions including time
 * prepositions (depuis, pendant, pour), and other complex prepositional usage.
 *
 * **Lesson Structure:**
 * 1. IntroSection - Introduction to advanced prepositions
 * 2. WhyHarderSection - Why these prepositions are challenging
 * 3. TimePrepositionsSection - depuis, pendant, pour distinctions
 * 4. LimitPrepositionsSection - jusqu'à, à partir de, avant, après
 * 5. MovementPlaceSection - Prepositions of movement and location
 * 6. PurposeReasonSection - pour, à cause de, grâce à
 * 7. AdvancedExpressionsSection - Fixed prepositional phrases
 * 8. ConfusingPairsSection - Commonly confused prepositions
 * 9. GuidedExamplesSection - Full example sentences
 * 10. MistakesSection - Common errors to avoid
 * 11. PracticeSection - Interactive quiz (15 questions)
 * 12. CompletionSection - Lesson completion UI
 *
 * **Key Concepts:**
 * - depuis = since/for (action still continuing)
 * - pendant = during/for (completed duration)
 * - pour = for (future duration/intention)
 * - Many prepositions have multiple meanings based on context
 *
 * **Features:**
 * - Collapsible sections with auto-mark-as-reviewed
 * - Progress persistence to localStorage
 * - 15-question interactive quiz with feedback
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
  FaLightbulb,              // Introduction/tips
  FaClock,                  // Time prepositions
  FaMapMarkerAlt,           // Place/movement prepositions
  FaWalking,                // Movement
  FaBullseye,               // Purpose/target
  FaList,                   // Lists/categories
  FaBalanceScale,           // Comparisons/distinctions
  FaBookOpen,               // Lesson content
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
  timePrepositions,
  timeComparisonExamples,
  limitPrepositions,
  movementAndPlacePrepositions,
  purposeAndReasonPrepositions,
  advancedPrepositionExpressions,
  confusingPairs,
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
        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-violet-50 to-white hover:from-violet-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-violet-500 rounded-xl text-white">
            <Icon size={24} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 text-left">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {isReviewed && (
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <FaCheckCircle size={16} />
              Reviewed
            </span>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
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
                  className="mt-6 flex items-center gap-2 px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg transition-colors font-medium"
                >
                  <FaCheckCircle size={18} />
                  Mark as reviewed
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
 * - A2 Lesson 8 badge
 * - Main title: "More Advanced Prepositions"
 * - Brief description of lesson content
 * - Instructions for learners
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-violet-600 to-purple-500 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
          A2 Lesson 8
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        More Advanced Prepositions
      </h1>
      <p className="text-violet-100 text-lg">
        Learn how to use more precise French prepositions for time, movement, purpose, and limits.
      </p>
      <p className="mt-4 text-sm text-violet-50">
        Read the explanations, compare the patterns, and complete the practice to build confidence.
      </p>
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
function ProgressBar({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
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
          className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full"
        />
      </div>
    </div>
  );
}

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

/**
 * WhyHarderSection - Explains why prepositions get harder at A2 level.
 *
 * Content:
 * - Comparison of beginner vs A2 prepositions
 * - Context-dependent nature of advanced prepositions
 * - Tips for learning prepositions through examples
 */
function WhyHarderSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="why-harder"
      title="Why Prepositions Get Harder at A2"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          At beginner level, learners often study simple prepositions like <strong>a</strong>, <strong>de</strong>, <strong>dans</strong>, <strong>sur</strong>, <strong>sous</strong>, <strong>avec</strong>.
        </p>
        <p className="text-slate-700 leading-relaxed">
          At A2, learners start meeting prepositions that depend much more on context. A single English preposition may correspond to several French ones. Some French prepositions look simple, but their meaning changes depending on time, movement, or purpose.
        </p>

        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-amber-800">
                <strong>Helpful tips:</strong>
              </p>
              <ul className="list-disc list-inside text-amber-700 space-y-1">
                <li>Do not try to translate every preposition word for word</li>
                <li>Focus on patterns and context</li>
                <li>At A2, prepositions are often best learned through examples</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * TimePrepositionsSection - depuis, pendant, pour distinctions.
 *
 * Content:
 * - depuis: since/for (ongoing action)
 * - pendant: for/during (completed duration)
 * - pour: for (intended duration)
 * - Visual comparison with examples
 */
function TimePrepositionsSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="time-prepositions"
      title="Time Prepositions: depuis, pendant, pour"
      icon={FaClock}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        {timePrepositions.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold text-lg">
                {item.preposition}
              </span>
              <span className="text-slate-500">= {item.coreMeaning}</span>
            </div>
            <p className="text-slate-700 mb-3">{item.use}</p>

            <div className="space-y-2 mb-3">
              {item.examples.map((ex, exIdx) => (
                <div key={exIdx} className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="font-medium text-violet-700">{ex.french}</span>
                  <span className="text-sm text-slate-500">{ex.english}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-600 bg-amber-50 p-2 rounded">
              <strong>Note:</strong> {item.note}
            </p>
          </div>
        ))}

        {/* Visual comparison */}
        <div className="mt-8 p-5 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100">
          <h4 className="font-semibold text-violet-800 mb-4">Visual Comparison</h4>
          <div className="space-y-4">
            {timeComparisonExamples.map((ex, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg">
                <p className="font-medium text-violet-700 text-lg">{ex.french}</p>
                <p className="text-slate-600">{ex.english}</p>
                <p className="text-sm text-violet-600 mt-1 font-medium">{ex.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * LimitPrepositionsSection - jusqu'à, vers, envers for endpoints.
 *
 * Content:
 * - jusqu'à: until/up to/as far as
 * - vers: toward/around (direction or time)
 * - envers: toward (attitude/behavior, not physical)
 */
function LimitPrepositionsSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="limit-prepositions"
      title="Limit / Endpoint Prepositions: jusqu'a, vers, envers"
      icon={FaMapMarkerAlt}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        {limitPrepositions.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold text-lg">
                {item.preposition}
              </span>
              <span className="text-slate-500">= {item.coreMeaning}</span>
            </div>
            <p className="text-slate-700 mb-3">{item.use}</p>

            <div className="space-y-2 mb-3">
              {item.examples.map((ex, exIdx) => (
                <div key={exIdx} className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="font-medium text-violet-700">{ex.french}</span>
                  <span className="text-sm text-slate-500">{ex.english}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-600 bg-amber-50 p-2 rounded">
              <strong>Note:</strong> {item.note}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/**
 * MovementPlaceSection - chez, entre, parmi, à travers, au fond de.
 *
 * Content:
 * - chez: at/to the home of (people, professionals)
 * - entre: between (two or more items)
 * - parmi: among (inside a group)
 * - à travers: through/across (movement)
 * - au fond de: at the back/bottom of
 */
function MovementPlaceSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="movement-place"
      title="Movement / Place / Route Prepositions"
      icon={FaWalking}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        {movementAndPlacePrepositions.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold text-lg">
                {item.preposition}
              </span>
              <span className="text-slate-500">= {item.coreMeaning}</span>
            </div>
            <p className="text-slate-700 mb-3">{item.use}</p>

            <div className="space-y-2">
              {item.examples.map((ex, exIdx) => (
                <div key={exIdx} className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="font-medium text-violet-700">{ex.french}</span>
                  <span className="text-sm text-slate-500">{ex.english}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/**
 * PurposeReasonSection - pour, afin de, grâce à, à cause de.
 *
 * Content:
 * - pour: for/in order to (purpose, goal, recipient)
 * - afin de: in order to (more formal)
 * - grâce à: thanks to (positive cause)
 * - à cause de: because of (negative cause)
 * - Key contrast between grâce à and à cause de
 */
function PurposeReasonSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="purpose-reason"
      title="Purpose / Reason / Destination Uses"
      icon={FaBullseye}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        {purposeAndReasonPrepositions.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold text-lg">
                {item.preposition}
              </span>
              <span className="text-slate-500">= {item.coreMeaning}</span>
            </div>
            <p className="text-slate-700 mb-3">{item.use}</p>

            <div className="space-y-2 mb-3">
              {item.examples.map((ex, exIdx) => (
                <div key={exIdx} className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="font-medium text-violet-700">{ex.french}</span>
                  <span className="text-sm text-slate-500">{ex.english}</span>
                </div>
              ))}
            </div>

            {item.note && (
              <p className="text-sm text-slate-600 bg-amber-50 p-2 rounded">
                <strong>Note:</strong> {item.note}
              </p>
            )}
          </div>
        ))}

        <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-semibold text-emerald-800 mb-2">Key Contrast</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-emerald-700 font-medium">grâce à</p>
              <p className="text-emerald-600">positive cause</p>
            </div>
            <div>
              <p className="text-rose-700 font-medium">à cause de</p>
              <p className="text-rose-600">often negative cause</p>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * AdvancedExpressionsSection - Compound preposition expressions.
 *
 * Content:
 * - loin de: far from
 * - près de: near/close to
 * - autour de: around
 * - au lieu de: instead of
 * - en face de: opposite/facing
 * - auprès de: with/near (formal)
 */
function AdvancedExpressionsSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="advanced-expressions"
      title="Common Advanced Prepositions and Expressions"
      icon={FaList}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {advancedPrepositionExpressions.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-violet-50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded font-semibold">
                  {item.expression}
                </span>
                <span className="text-sm text-slate-500">= {item.meaning}</span>
              </div>
              <p className="font-medium text-violet-700">{item.example}</p>
              <p className="text-sm text-slate-500">{item.english}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ConfusingPairsSection - Comparison of similar prepositions.
 *
 * Pairs covered:
 * - depuis vs pendant (ongoing vs completed)
 * - pour vs pendant (intended vs actual)
 * - vers vs jusqu'à (direction vs endpoint)
 * - grâce à vs à cause de (positive vs negative)
 */
function ConfusingPairsSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="confusing-pairs"
      title="Comparison Section for Confusing Pairs"
      icon={FaBalanceScale}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        {confusingPairs.map((pair, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold">
                {pair.pair}
              </span>
            </div>
            <p className="text-slate-700 mb-4">{pair.explanation}</p>

            <div className="space-y-3">
              {pair.examples.map((ex, exIdx) => (
                <div key={exIdx} className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <span className="font-medium text-violet-700">{ex.french}</span>
                  <span className="text-sm text-slate-500">{ex.english}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/**
 * GuidedExamplesSection - Collection of example sentences for study.
 *
 * Various contexts showing advanced prepositions in everyday French.
 */
function GuidedExamplesSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="guided-examples"
      title="Guided Examples"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Study these examples to see advanced prepositions in different contexts:
        </p>

        <div className="grid gap-4 mt-4">
          {guidedExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
            >
              <span className="text-lg font-medium text-violet-700">
                {ex.french}
              </span>
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
 * - Warning about English-French differences
 * - Wrong vs correct examples
 * - Detailed explanations for each mistake
 */
function MistakesSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="mistakes"
      title="Common Beginner Mistakes"
      icon={FaExclamationTriangle}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800">
            These mistakes are very common. They usually happen because English and French organize time, purpose, and movement differently.
          </p>
        </div>

        <div className="space-y-4 mt-4">
          {commonMistakes.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-xl border border-slate-100"
            >
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
              <p className="text-sm text-slate-600 mt-3 bg-slate-50 p-2 rounded">
                {ex.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * PracticeSection - Interactive quiz for Lesson 8.
 *
 * Features:
 * - 18 questions testing advanced preposition knowledge
 * - Multiple choice format
 * - Immediate feedback with explanations
 * - Score tracking and performance message
 * - Option to retake or continue
 *
 * State:
 * - currentQuestion - Index of current question (0-17)
 * - selectedOption - Currently selected answer index
 * - hasSubmitted - Whether answer has been submitted
 * - isCorrect - Whether submitted answer was correct
 * - score - Total correct answers
 * - showResults - Whether to show final results screen
 */
function PracticeSection({
  isReviewed,
  onMarkReviewed,
  onComplete,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
  onComplete: (score: number) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = practiceQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / practiceQuestions.length) * 100;

  const handleSelect = (index: number) => {
    if (!hasSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === question.correct;
    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
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

  const handleContinueAnyway = () => {
    onMarkReviewed("practice");
  };

  // Calculate final score when showing results
  const finalScore = showResults
    ? score + (hasSubmitted && isCorrect ? 0 : 0) // The score state is already updated
    : score;

  const adjustedScore = showResults
    ? finalScore + (hasSubmitted && isCorrect && currentQuestion === practiceQuestions.length - 1 ? 1 : 0)
    : score;

  if (showResults) {
    // Recalculate actual score - count correctly
    const actualScore = isCorrect && hasSubmitted && currentQuestion === practiceQuestions.length - 1
      ? score + 1
      : score;

    const performance = getPerformanceMessage(actualScore, practiceQuestions.length);

    // Call onComplete with the final score
    useEffect(() => {
      onComplete(actualScore);
    }, []);

    return (
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Practice Complete!
          </h2>
          <p className="text-slate-600">
            You scored {actualScore} out of {practiceQuestions.length}
          </p>
          <p className="text-lg font-medium text-violet-600 mt-1">
            {Math.round((actualScore / practiceQuestions.length) * 100)}%
          </p>
        </div>

        <div className={`p-6 rounded-xl border mb-6 ${
          performance.color === "green"
            ? "bg-emerald-50 border-emerald-100"
            : performance.color === "yellow"
            ? "bg-amber-50 border-amber-100"
            : "bg-blue-50 border-blue-100"
        }`}>
          <h3 className={`font-semibold mb-2 ${
            performance.color === "green"
              ? "text-emerald-800"
              : performance.color === "yellow"
              ? "text-amber-800"
              : "text-blue-800"
          }`}>
            {performance.title}
          </h3>
          <p className={`${
            performance.color === "green"
              ? "text-emerald-700"
              : performance.color === "yellow"
              ? "text-amber-700"
              : "text-blue-700"
          }`}>
            {performance.message}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleRetake}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-medium"
          >
            <FaRedo size={18} />
            Retake practice
          </button>
          <button
            onClick={handleContinueAnyway}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-xl transition-colors font-medium"
          >
            Continue lesson
            <FaArrowAltCircleRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">
            Practice {currentQuestion + 1} of {practiceQuestions.length}
          </span>
          <span className="text-sm font-medium text-violet-600">
            Score: {score}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-3">
              {question.topic}
            </span>
            <h3 className="text-lg font-medium text-slate-800">
              {question.prompt}
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedOption === idx
                    ? hasSubmitted
                      ? idx === question.correct
                        ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                        : "bg-red-100 border-2 border-red-500 text-red-800"
                      : "bg-violet-100 border-2 border-violet-500 text-violet-800"
                    : hasSubmitted && idx === question.correct
                    ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                    : "bg-slate-50 border-2 border-slate-200 hover:border-violet-300 text-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {hasSubmitted && idx === question.correct && (
                    <FaCheckCircle className="text-emerald-500" />
                  )}
                  {hasSubmitted && selectedOption === idx && idx !== question.correct && (
                    <span className="text-red-500 font-bold">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {hasSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl mb-6 ${
                isCorrect
                  ? "bg-emerald-50 border border-emerald-100"
                  : "bg-amber-50 border border-amber-100"
              }`}
            >
              <p
                className={`font-medium mb-2 ${
                  isCorrect ? "text-emerald-800" : "text-amber-800"
                }`}
              >
                {isCorrect
                  ? ["Nice 😏", "Good catch", "That's right"][
                      Math.floor(Math.random() * 3)
                    ]
                  : ["Careful now…", "You're seeing the pattern"][
                      Math.floor(Math.random() * 2)
                    ]}
              </p>
              <p className={isCorrect ? "text-emerald-700" : "text-amber-700"}>
                {question.explanation}
              </p>
            </motion.div>
          )}

          <div className="flex gap-4">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="flex-1 py-3 bg-violet-500 hover:bg-violet-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                {currentQuestion < practiceQuestions.length - 1 ? (
                  <>
                    Next
                    <FaArrowRight />
                  </>
                ) : (
                  "See Results"
                )}
              </button>
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
 * - Link to next lesson
 *
 * @param practiceScore - Score achieved in practice quiz
 */
function CompletionSection({
  practiceScore,
}: {
  practiceScore: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-violet-600 to-purple-500 rounded-2xl p-8 text-white shadow-lg"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <FaTrophy size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-violet-100 mb-6">
          You've completed A2 Lesson 8 — More Advanced Prepositions
        </p>

        {practiceScore > 0 && (
          <p className="text-violet-50 mb-4">
            Practice score: {practiceScore}/{practiceQuestions.length}
          </p>
        )}

        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-violet-50 text-sm">
            <li>• How to use depuis, pendant, pour, and jusqu'a</li>
            <li>• How to distinguish prepositions used for duration, starting point, purpose, destination, and limit</li>
            <li>• How some prepositions change meaning depending on context</li>
            <li>• Common expressions with advanced prepositions</li>
            <li>• How to complete guided practice with confidence</li>
          </ul>
        </div>

        <Link
          href="/classes/A2/lesson9"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 rounded-xl font-medium hover:bg-violet-50 transition-colors"
        >
          Continue to Lesson 9
          <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson8Page - Main component for A2 Lesson 8.
 *
 * Manages:
 * - Section review state (which sections have been reviewed)
 * - Practice quiz answers and score
 * - Lesson completion status
 * - Progress persistence to localStorage
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson8Page() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  // List of reviewed section IDs
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  // Practice answers map (questionId -> selectedOption)
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  // Whether practice quiz is completed
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  // Score achieved in practice quiz
  const [practiceScore, setPracticeScore] = useState(0);
  // Whether entire lesson is marked complete
  const [lessonCompleted, setLessonCompleted] = useState(false);
  // Hydration flag to prevent SSR/localStorage mismatch
  const [isClient, setIsClient] = useState(false);

  // ---------------------------------------------------------------------------
  // EFFECT: Load Progress from localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("a2Lesson8Progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviewedSections(parsed.reviewedSections || []);
        setPracticeAnswers(parsed.practiceAnswers || {});
        setPracticeCompleted(parsed.practiceCompleted || false);
        setPracticeScore(parsed.practiceScore || 0);
        setLessonCompleted(parsed.lessonCompleted || false);
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
      localStorage.setItem(
        "a2Lesson8Progress",
        JSON.stringify({
          reviewedSections,
          practiceAnswers,
          practiceCompleted,
          practiceScore,
          lessonCompleted,
        })
      );
    }
  }, [reviewedSections, practiceAnswers, practiceCompleted, practiceScore, lessonCompleted, isClient]);

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------
  /**
   * handleMarkReviewed - Marks a section as reviewed.
   * @param id - Section identifier
   */
  const handleMarkReviewed = (id: string) => {
    setReviewedSections((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  /**
   * handlePracticeComplete - Updates practice score and marks as completed.
   * @param score - Final score achieved
   */
  const handlePracticeComplete = (score: number) => {
    setPracticeScore(score);
    setPracticeCompleted(true);
  };

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------
  /**
   * progress - Calculated percentage of sections reviewed.
   */
  const progress = useMemo(() => {
    const totalSections = sectionIds.length;
    const completed = reviewedSections.length;
    return Math.round((completed / totalSections) * 100);
  }, [reviewedSections]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  // Show loading state during SSR hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-50 flex items-center justify-center">
        <div className="text-violet-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/classes/A2"
            className="flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors"
          >
            <FaArrowLeft size={18} />
            <span>Back to A2 Lessons</span>
          </Link>
        </div>

        {/* Lesson Header */}
        <LessonHeader />

        {/* Progress Bar - Section Review Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <ProgressBar
            current={reviewedSections.length}
            total={sectionIds.length}
            label="Lesson Progress"
          />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        <WhyHarderSection
          isReviewed={reviewedSections.includes("why-harder")}
          onMarkReviewed={handleMarkReviewed}
        />

        <TimePrepositionsSection
          isReviewed={reviewedSections.includes("time-prepositions")}
          onMarkReviewed={handleMarkReviewed}
        />

        <LimitPrepositionsSection
          isReviewed={reviewedSections.includes("limit-prepositions")}
          onMarkReviewed={handleMarkReviewed}
        />

        <MovementPlaceSection
          isReviewed={reviewedSections.includes("movement-place")}
          onMarkReviewed={handleMarkReviewed}
        />

        <PurposeReasonSection
          isReviewed={reviewedSections.includes("purpose-reason")}
          onMarkReviewed={handleMarkReviewed}
        />

        <AdvancedExpressionsSection
          isReviewed={reviewedSections.includes("advanced-expressions")}
          onMarkReviewed={handleMarkReviewed}
        />

        <ConfusingPairsSection
          isReviewed={reviewedSections.includes("confusing-pairs")}
          onMarkReviewed={handleMarkReviewed}
        />

        <GuidedExamplesSection
          isReviewed={reviewedSections.includes("guided-examples")}
          onMarkReviewed={handleMarkReviewed}
        />

        <MistakesSection
          isReviewed={reviewedSections.includes("mistakes")}
          onMarkReviewed={handleMarkReviewed}
        />

        {/* Practice Section - 18 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-violet-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-violet-500 rounded-xl text-white">
                <FaQuestionCircle size={24} />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Guided Interactive Practice
              </h2>
            </div>
          </div>
          <div className="p-6">
            <PracticeSection
              isReviewed={reviewedSections.includes("practice")}
              onMarkReviewed={handleMarkReviewed}
              onComplete={handlePracticeComplete}
            />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection practiceScore={practiceScore} />
        )}
      </div>
    </div>
  );
}
