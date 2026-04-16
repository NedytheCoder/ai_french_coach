/**
 * B1 Lesson 10 - Plus-que-parfait Mastery (Le Plus-que-parfait)
 * ===============================================================
 *
 * This page teaches B1 learners the plus-que-parfait (pluperfect/past perfect)
 * used to describe actions completed before other past actions.
 *
 * **Lesson Structure:**
 * 1. LessonHeader - Title and introduction using lessonMeta
 * 2. WhatIsSection - Definition and explanation of plus-que-parfait
 * 3. FormationSection - Formation rules with avoir/être table
 * 4. UsageSection - When to use plus-que-parfait
 * 5. ExamplesSection - Common examples with context
 * 6. VsPastSection - Comparison with other past tenses (table format)
 * 7. MistakesSection - Common errors to avoid
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Plus-que-parfait = imparfait auxiliary + past participle
 * - English equivalent: "had + past participle"
 * - Used for actions completed before another past action
 * - Essential for third conditional (Si + plus-que-parfait, conditionnel passé)
 *
 * **Features:**
 * - Uses shared B1 components (SectionCard, ProgressBar, PracticeSection, etc.)
 * - Blue accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Auxiliary verbs and tense comparison displayed in table format
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import React, { useState, useEffect, useMemo } from "react";

// Framer Motion for animations
import { motion } from "framer-motion";

// React Icons for UI elements
import {
  FaHistory,        // What is section
  FaGraduationCap,  // Formation section
  FaClock,          // Usage section
  FaExchangeAlt,    // Vs past section (comparing)
  FaExclamationTriangle, // Mistakes section
  FaList,           // Examples section
} from "react-icons/fa";

// Shared B1 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  whatIs,
  formationRules,
  avoirEtre,
  usageCases,
  examples,
  vsOtherPast,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * LessonHeader - Displays the lesson title and introduction.
 *
 * Uses lessonMeta from data.ts for dynamic title and subtitle.
 * Features blue/indigo gradient background.
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 10</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-blue-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

/**
 * WhatIsSection - Definition and explanation of the plus-que-parfait.
 *
 * Content:
 * - Describes an action completed before another past action
 * - English equivalent: "had + past participle" (pluperfect)
 * - Example: J'avais fini avant son arrivée (I had finished before his arrival)
 */
function WhatIsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="what-is" title="What is Plus-que-parfait?" icon={FaHistory} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="blue">
      <div className="space-y-4">
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          {whatIs.map((item, idx) => (<li key={idx}>{item}</li>))}
        </ul>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800"><strong>Think of it as:</strong> 'had done' - the 'more than perfect' past (pluperfect).</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * FormationSection - How to form the plus-que-parfait.
 *
 * Content:
 * - Formation rules (imparfait of auxiliary + past participle)
 * - Avoir and être auxiliaries in imparfait (table format)
 * - Agreement rules for être verbs
 */
function FormationSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="formation" title="Formation" icon={FaGraduationCap} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="blue">
      <div className="space-y-4">
        <ul className="list-decimal list-inside text-slate-700 space-y-2">
          {formationRules.map((rule, idx) => (<li key={idx}>{rule}</li>))}
        </ul>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 text-left text-blue-800">Auxiliary</th>
                <th className="p-2 text-left text-blue-800">je</th>
                <th className="p-2 text-left text-blue-800">tu</th>
                <th className="p-2 text-left text-blue-800">il</th>
                <th className="p-2 text-left text-blue-800">nous</th>
              </tr>
            </thead>
            <tbody>
              {avoirEtre.map((aux, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium">{aux.auxiliary}</td>
                  <td className="p-2">{aux.je}</td>
                  <td className="p-2">{aux.tu}</td>
                  <td className="p-2">{aux.il}</td>
                  <td className="p-2">{aux.nous}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * UsageSection - When to use the plus-que-parfait.
 *
 * Content:
 * - Before another past: action completed before another past action
 * - In si clauses: third conditional (Si + plus-que-parfait, conditionnel passé)
 * - Background information: explaining cause before effect in past
 */
function UsageSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="usage" title="When to Use Plus-que-parfait" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="blue">
      <div className="space-y-4">
        <div className="grid gap-3">
          {usageCases.map((use, idx) => (
            <div key={idx} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="font-semibold text-blue-800">{use.case}</p>
              <p className="text-blue-700">{use.example}</p>
              <p className="text-sm text-blue-600">{use.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ExamplesSection - Common examples of plus-que-parfait with context.
 *
 * Content:
 * - Examples showing sequence of past events
 * - Context provided for each example
 * - Explanations of why plus-que-parfait is used
 */
function ExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="examples" title="Common Examples" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="blue">
      <div className="space-y-4">
        <div className="grid gap-3">
          {examples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-blue-700 font-medium">{ex.plusQueParfait}</p>
              <p className="text-slate-600">Context: {ex.context}</p>
              <p className="text-sm text-slate-500">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * VsPastSection - Comparison of plus-que-parfait with other past tenses.
 *
 * Content displayed in table format:
 * - Passé composé: Completed action in past (I ate)
 * - Imparfait: Ongoing/background in past (I was eating)
 * - Plus-que-parfait: Before another past (I had eaten)
 */
function VsPastSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="vs-other-past" title="Plus-que-parfait vs Other Past Tenses" icon={FaExchangeAlt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="blue">
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 text-left text-blue-800">Tense</th>
                <th className="p-2 text-left text-blue-800">When</th>
                <th className="p-2 text-left text-blue-800">Example</th>
                <th className="p-2 text-left text-blue-800">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {vsOtherPast.map((tense, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium">{tense.tense}</td>
                  <td className="p-2">{tense.when}</td>
                  <td className="p-2">{tense.example}</td>
                  <td className="p-2 text-slate-600">{tense.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * MistakesSection - Common errors with the plus-que-parfait.
 *
 * Content:
 * - Using passé composé when plus-que-parfait is needed for first action
 * - Using wrong tense in third conditional si clause
 * - Not recognizing cause-effect sequence requires plus-que-parfait
 */
function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="blue">
      <div className="space-y-4">
        {commonMistakes.map((ex, idx) => (
          <div key={idx} className="p-4 bg-white rounded-xl border border-slate-100">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2"><span className="text-red-500 font-bold">✗</span><span className="text-red-600">{ex.wrong}</span></div>
              <div className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span><span className="text-emerald-700 font-medium">{ex.correct}</span></div>
            </div>
            <p className="text-sm text-slate-600 mt-3 bg-slate-50 p-2 rounded">{ex.explanation}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson10Page - Main component for B1 Lesson 10.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B1 components with blue accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson10Page() {
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
    const saved = localStorage.getItem("b1Lesson10Progress");
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
      localStorage.setItem("b1Lesson10Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center"><div className="text-blue-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B1" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="blue" /></div>

        {/* Lesson Sections - In Order of Instruction */}
        <WhatIsSection isReviewed={reviewedSections.includes("what-is")} onMarkReviewed={handleMarkReviewed} />
        <FormationSection isReviewed={reviewedSections.includes("formation")} onMarkReviewed={handleMarkReviewed} />
        <UsageSection isReviewed={reviewedSections.includes("usage")} onMarkReviewed={handleMarkReviewed} />
        <ExamplesSection isReviewed={reviewedSections.includes("examples")} onMarkReviewed={handleMarkReviewed} />
        <VsPastSection isReviewed={reviewedSections.includes("vs-other-past")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="blue" />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={10} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson11" recapItems={["Plus-que-parfait formation", "Imparfait auxiliary + past participle", "Action completed before another past action", "Si clause patterns", "Difference from passé composé and imparfait"]} accentColor="blue" />
        )}
      </div>
    </div>
  );
}
