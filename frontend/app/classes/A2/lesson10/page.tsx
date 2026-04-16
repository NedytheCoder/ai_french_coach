/**
 * A2 Lesson 10 - The Present Conditional (Le Conditionnel Présent)
 * ===================================================================
 *
 * This page teaches A2 learners how to use the present conditional in French
 * for polite requests, wishes, hypothetical situations, and soft advice.
 *
 * **Lesson Structure:**
 * 1. WhatIsConditionalSection - Introduction to the conditional
 * 2. WhenToUseSection - Appropriate contexts (polite requests, wishes, advice)
 * 3. FormationSection - How to form: future stem + imparfait endings
 * 4. EndingsSection - The imparfait endings used (-ais, -ait, -ions, -iez, -aient)
 * 5. RegularVerbsSection - Common regular verb conjugations
 * 6. IrregularStemsSection - Common irregular stems (être→ser-, avoir→aur-, etc.)
 * 7. VsFuturSection - Distinguishing conditional from futur simple
 * 8. GuidedExamplesSection - Full example sentences
 * 9. MistakesSection - Common errors to avoid
 * 10. PracticeSection - Interactive quiz (15 questions)
 * 11. CompletionSection - Lesson completion UI
 *
 * **Key Concepts:**
 * - Formation: future stem + imparfait endings
 * - Often corresponds to "would" in English
 * - Used for: polite requests, wishes, hypothetical situations, advice
 * - Irregular stems must be memorized
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
  FaClock,                  // Time/usage contexts
  FaCogs,                   // Formation/settings
  FaTable,                  // Tables/endings
  FaBolt,                   // Irregular verbs
  FaBalanceScale,           // Comparisons
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
  conditionalUses,
  conditionalFormationRule,
  conditionalEndings,
  regularConditionalVerbs,
  irregularConditionalVerbs,
  futureVsConditionalComparisons,
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
        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-teal-50 to-white hover:from-teal-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-500 rounded-xl text-white">
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
                  className="mt-6 flex items-center gap-2 px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-lg transition-colors font-medium"
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
 * - A2 Lesson 10 badge
 * - Main title: "The Present Conditional"
 * - Brief description of lesson content
 * - Instructions for learners
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-cyan-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
          A2 Lesson 10
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">The Present Conditional</h1>
      <p className="text-teal-100 text-lg">
        Learn how to say would in French for polite requests, wishes, and imagined situations.
      </p>
      <p className="mt-4 text-sm text-teal-50">
        Read the explanations, notice the patterns, and complete the practice to build confidence.
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
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
        />
      </div>
    </div>
  );
}

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

/**
 * WhatIsConditionalSection - Introduction to the present conditional.
 *
 * Content:
 * - Definition of the conditional (would, would like, could)
 * - Example sentences showing conditional forms
 * - Key points about polite French and imagined situations
 */
function WhatIsConditionalSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="what-is-conditional"
      title="What is the Present Conditional?"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          The present conditional is often used to express:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li>what someone would do</li>
          <li>what someone would like</li>
          <li>what someone could do</li>
        </ul>

        <p className="text-slate-700 leading-relaxed mt-4">
          In English, it often corresponds to <strong>would</strong>.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {[
            { french: "Je voudrais un café.", english: "I would like a coffee." },
            { french: "Nous irions avec toi.", english: "We would go with you." },
            { french: "Elle serait contente.", english: "She would be happy." },
            { french: "Ils feraient le travail.", english: "They would do the work." },
          ].map((ex, idx) => (
            <div key={idx} className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <p className="font-medium text-teal-800">{ex.french}</p>
              <p className="text-sm text-teal-600">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-amber-800">
                <strong>Key points:</strong>
              </p>
              <ul className="list-disc list-inside text-amber-700 space-y-1">
                <li>The present conditional is very common in polite French</li>
                <li>It is also used in imagined or uncertain situations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * WhenToUseSection - Appropriate contexts for the conditional.
 *
 * Content:
 * - Polite requests (Je voudrais...)
 * - Wishes or desires (J'aimerais...)
 * - Hypothetical situations
 * - Soft suggestions or advice (Tu devrais...)
 */
function WhenToUseSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="when-to-use"
      title="When Do We Use the Present Conditional?"
      icon={FaClock}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        {conditionalUses.map((use, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <h3 className="font-semibold text-teal-700 mb-2">{use.title}</h3>
            <p className="text-slate-600 text-sm mb-4">{use.explanation}</p>
            <div className="p-3 bg-teal-50 rounded-lg">
              <p className="font-medium text-teal-800">{use.example}</p>
              <p className="text-sm text-teal-600">{use.english}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/**
 * FormationSection - How to form the present conditional.
 *
 * Content:
 * - Formation rule: future stem + imparfait endings
 * - Step-by-step explanation
 * - Examples showing the pattern
 */
function FormationSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="formation"
      title="How to Form the Present Conditional"
      icon={FaCogs}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          To form the present conditional:
        </p>
        <ol className="list-decimal list-inside text-slate-700 space-y-2 ml-4">
          <li>Start with the <strong>future stem</strong></li>
          <li>Add the <strong>imparfait endings</strong></li>
        </ol>

        <div className="p-5 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
          <p className="font-semibold text-teal-800 text-lg text-center">
            {conditionalFormationRule.rule}
          </p>
        </div>

        <div className="space-y-4">
          {conditionalFormationRule.examples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-semibold">
                  {ex.infinitive}
                </span>
                <span className="text-slate-500">→</span>
                <span className="text-slate-600">stem: <strong>{ex.stem}</strong></span>
                <span className="text-slate-500">→</span>
                <span className="font-semibold text-teal-700">{ex.form}</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800">
            <strong>Important:</strong> The stem is often the same as the futur simple stem. The endings are the same as the imparfait endings.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * EndingsSection - The imparfait endings used in conditional.
 *
 * Content:
 * - Table of endings (-ais, -ais, -ait, -ions, -iez, -aient)
 * - Corresponding pronouns
 * - Example conjugations
 */
function EndingsSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="endings"
      title="Regular Conditional Endings"
      icon={FaTable}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          These endings are the <strong>same as the imparfait endings</strong>. This is one of the easiest ways to remember the conditional.
        </p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-teal-100">
                <th className="p-3 text-left text-teal-800 font-semibold rounded-tl-lg">Pronoun</th>
                <th className="p-3 text-left text-teal-800 font-semibold">Ending</th>
                <th className="p-3 text-left text-teal-800 font-semibold rounded-tr-lg">Example (parler)</th>
              </tr>
            </thead>
            <tbody>
              {conditionalEndings.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                  <td className="p-3 font-medium text-slate-700">{row.pronoun}</td>
                  <td className="p-3 text-teal-700 font-semibold">{row.ending}</td>
                  <td className="p-3 text-slate-600">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800">
            <strong>Note:</strong> These endings are the same as the imparfait endings. The only difference is the stem (future stem vs imparfait stem).
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * RegularVerbsSection - Common regular verbs in conditional.
 *
 * Content:
 * - parler, finir, travailler, étudier, manger, habiter, vendre, attendre
 * - Shows infinitive and je form for each
 */
function RegularVerbsSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="regular-verbs"
      title="Common Regular Verbs in the Conditional"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {regularConditionalVerbs.map((verb, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-teal-50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded font-semibold">
                  {verb.infinitive}
                </span>
              </div>
              <p className="font-medium text-slate-800">{verb.je}</p>
              <p className="text-sm text-slate-500">{verb.english}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * IrregularStemsSection - Common irregular conditional stems.
 *
 * Content:
 * - être → ser-, avoir → aur-, aller → ir-, faire → fer-
 * - venir → viendr-, voir → verr-, vouloir → voudr-
 * - pouvoir → pourr-, devoir → devr-, savoir → saur-
 */
function IrregularStemsSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="irregular-stems"
      title="Common Irregular Stems"
      icon={FaBolt}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Many important conditional verbs use the same irregular stems as the futur simple. The endings are the same.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {irregularConditionalVerbs.map((verb, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded font-semibold">
                  {verb.infinitive}
                </span>
                <span className="text-slate-400">→</span>
                <span className="text-amber-600 font-medium">{verb.stem}</span>
              </div>
              <p className="font-medium text-slate-800">{verb.sample}</p>
              <p className="text-sm text-slate-500">{verb.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
          <p className="text-blue-800">
            <strong>Remember:</strong> The stem is often the same as the futur simple. Only the endings change.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * VsFuturSection - Distinguishing conditional from futur simple.
 *
 * Content:
 * - Side-by-side comparison of future and conditional
 * - Future: real action (will)
 * - Conditional: imagined action (would)
 */
function VsFuturSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="vs-futur"
      title="Conditional vs Futur Simple"
      icon={FaBalanceScale}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">Futur Simple</h4>
            <p className="text-blue-700">what will happen</p>
            <p className="text-sm text-blue-600">real future action</p>
          </div>
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2">Conditionnel Présent</h4>
            <p className="text-teal-700">what would happen</p>
            <p className="text-sm text-teal-600">possible or imagined action</p>
          </div>
        </div>

        <div className="space-y-4">
          {futureVsConditionalComparisons.map((comp, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-xs font-medium text-blue-600 uppercase">Futur Simple</span>
                  <p className="font-medium text-blue-800 mt-1">{comp.future}</p>
                  <p className="text-sm text-blue-600">{comp.futureEnglish}</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                  <span className="text-xs font-medium text-teal-600 uppercase">Conditionnel</span>
                  <p className="font-medium text-teal-800 mt-1">{comp.conditional}</p>
                  <p className="text-sm text-teal-600">{comp.conditionalEnglish}</p>
                </div>
              </div>
              <p className="text-slate-600 mt-4 text-sm">{comp.note}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800">
            <strong>Tip:</strong> The stems may look similar. Pay close attention to the endings and the meaning.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * GuidedExamplesSection - Collection of example sentences for study.
 *
 * Various contexts showing conditional in everyday French.
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
          Study these examples to see the present conditional in different contexts:
        </p>

        <div className="grid gap-4 mt-4">
          {guidedExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
            >
              <span className="text-lg font-medium text-teal-700">
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
 * - Confusing future and conditional
 * - Wrong irregular stems
 * - Wrong endings
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
            These mistakes are very common. They often happen when learners mix the future and the conditional or forget an irregular stem.
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
 * PracticeSection - Interactive quiz for Lesson 10.
 *
 * Features:
 * - 15 questions testing conditional knowledge
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

  // Calculate actual score when showing results
  const actualScore = showResults
    ? isCorrect && hasSubmitted && currentQuestion === practiceQuestions.length - 1
      ? score + 1
      : score
    : score;

  if (showResults) {
    const performance = getPerformanceMessage(actualScore, practiceQuestions.length);

    // Call onComplete with the final score
    useEffect(() => {
      onComplete(actualScore);
    }, []);

    return (
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Practice Complete!
          </h2>
          <p className="text-slate-600">
            You scored {actualScore} out of {practiceQuestions.length}
          </p>
          <p className="text-lg font-medium text-teal-600 mt-1">
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
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors font-medium"
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
          <span className="text-sm font-medium text-teal-600">
            Score: {score}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-300"
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
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-3">
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
                      : "bg-teal-100 border-2 border-teal-500 text-teal-800"
                    : hasSubmitted && idx === question.correct
                    ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                    : "bg-slate-50 border-2 border-slate-200 hover:border-teal-300 text-slate-700"
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
                  : ["Careful now…", "You're getting it"][
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
                className="flex-1 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
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
      className="bg-gradient-to-br from-teal-500 to-cyan-400 rounded-2xl p-8 text-white shadow-lg"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <FaTrophy size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-teal-100 mb-6">
          You've completed A2 Lesson 10 — The Present Conditional
        </p>

        {practiceScore > 0 && (
          <p className="text-teal-50 mb-4">
            Practice score: {practiceScore}/{practiceQuestions.length}
          </p>
        )}

        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-teal-50 text-sm">
            <li>• How to form and use the present conditional in French</li>
            <li>• The formation rule: future stem + imparfait endings</li>
            <li>• Common regular and irregular verbs in the conditional</li>
            <li>• How to use it for politeness, wishes, and imagined situations</li>
            <li>• How to distinguish it from the futur simple</li>
          </ul>
        </div>

        <Link
          href="/classes/A2/lesson11"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 rounded-xl font-medium hover:bg-teal-50 transition-colors"
        >
          Continue to Lesson 11
          <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Lesson10Page() {
  // ---------------------------------------------------------------------------
  // STATE: Section Review Tracking
  // ---------------------------------------------------------------------------
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // ---------------------------------------------------------------------------
  // EFFECT: Load Progress from localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("a2Lesson10Progress");
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
        "a2Lesson10Progress",
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
  // HANDLER: Mark Section Reviewed
  // ---------------------------------------------------------------------------
  const handleMarkReviewed = (id: string) => {
    setReviewedSections((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  // ---------------------------------------------------------------------------
  // DERIVED STATE
  // ---------------------------------------------------------------------------
  const progress = useMemo(() => {
    const totalSections = sectionIds.length;
    const completed = reviewedSections.length;
    return Math.round((completed / totalSections) * 100);
  }, [reviewedSections]);

  // ---------------------------------------------------------------------------
  // HANDLER: Complete Lesson
  // ---------------------------------------------------------------------------
  const handlePracticeComplete = (score: number) => {
    setPracticeScore(score);
    setPracticeCompleted(true);
  };

  // ===========================================================================
  // RENDER
  // ===========================================================================
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-50 flex items-center justify-center">
        <div className="text-teal-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/classes/A2"
            className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors"
          >
            <FaArrowLeft size={18} />
            <span>Back to A2 Lessons</span>
          </Link>
        </div>

        {/* Header */}
        <LessonHeader />

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <ProgressBar
            current={reviewedSections.length}
            total={sectionIds.length}
            label="Lesson Progress"
          />
        </div>

        {/* Sections */}
        <WhatIsConditionalSection
          isReviewed={reviewedSections.includes("what-is-conditional")}
          onMarkReviewed={handleMarkReviewed}
        />

        <WhenToUseSection
          isReviewed={reviewedSections.includes("when-to-use")}
          onMarkReviewed={handleMarkReviewed}
        />

        <FormationSection
          isReviewed={reviewedSections.includes("formation")}
          onMarkReviewed={handleMarkReviewed}
        />

        <EndingsSection
          isReviewed={reviewedSections.includes("endings")}
          onMarkReviewed={handleMarkReviewed}
        />

        <RegularVerbsSection
          isReviewed={reviewedSections.includes("regular-verbs")}
          onMarkReviewed={handleMarkReviewed}
        />

        <IrregularStemsSection
          isReviewed={reviewedSections.includes("irregular-stems")}
          onMarkReviewed={handleMarkReviewed}
        />

        <VsFuturSection
          isReviewed={reviewedSections.includes("vs-futur")}
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

        {/* Practice */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-teal-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-500 rounded-xl text-white">
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

        {/* Completion */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection practiceScore={practiceScore} />
        )}
      </div>
    </div>
  );
}
