/**
 * B1 Lesson 13 - Indirect Speech: Tense Changes (Discours Indirect)
 * ===================================================================
 *
 * This page teaches B1 learners how tenses change in indirect/reported speech
 * (discours indirect) in French.
 *
 * **Lesson Structure:**
 * 1. LessonHeader - Title and introduction using lessonMeta
 * 2. PresentSection - Reporting with present tense verb (no change)
 * 3. PastSection - Reporting with past tense verb (tense shifts back)
 * 4. ConsonanceSection - Consonance des temps with side-by-side examples
 * 5. ExceptionsSection - Special cases (general truths)
 * 6. MistakesSection - Common errors to avoid
 * 7. PracticeSection - Interactive quiz (15 questions)
 * 8. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Present reporting: no tense change (Il dit qu'il est malade)
 * - Past reporting: tense shifts back in time
 *   - Présent → imparfait
 *   - Passé composé → plus-que-parfait
 *   - Futur → conditionnel
 * - Consonance des temps: logical tense relationship
 * - General truths stay present (la Terre est ronde)
 *
 * **Features:**
 * - Uses shared B1 components (SectionCard, ProgressBar, PracticeSection, etc.)
 * - Teal accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Comparison tables for tense changes
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
  FaClock,           // Present section
  FaCalendarCheck,   // Past section
  FaBalanceScale,    // Consonance section
  FaList,            // List icon
  FaStar,            // Exceptions section
  FaExclamationTriangle, // Mistakes section
} from "react-icons/fa";

// Shared B1 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  presentReporting,
  pastReporting,
  consonance,
  detailedExamples,
  exceptions,
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
 * Features teal/cyan gradient background.
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-teal-600 to-cyan-500 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 13</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-teal-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

/**
 * PresentSection - Reporting with present tense verb.
 *
 * Content:
 * - When reporting verb is present (dire), tenses stay the same
 * - Present → present
 * - Imparfait → imparfait
 * - Passé composé → passé composé
 */
function PresentSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="present-reporting" title="Reporting with Present Tense" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
      <div className="space-y-4">
        <p className="text-slate-700">When the reporting verb (dire) is in present tense, tenses usually stay the same:</p>
        <div className="grid gap-3">
          {presentReporting.map((ex, idx) => (
            <div key={idx} className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <p className="text-slate-600"><strong>Direct:</strong> {ex.direct}</p>
              <p className="text-teal-700 font-medium">Reported: {ex.reported}</p>
              <p className="text-sm text-teal-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * PastSection - Reporting with past tense verb.
 *
 * Content displayed in table format:
 * - Présent → imparfait
 * - Passé composé → plus-que-parfait
 * - Futur → conditionnel
 * - Imparfait → imparfait (stays same)
 */
function PastSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="past-reporting" title="Reporting with Past Tense" icon={FaCalendarCheck} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
      <div className="space-y-4">
        <p className="text-slate-700">When the reporting verb is in past tense, tenses typically shift back:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-teal-100">
              <tr>
                <th className="p-2 text-left text-teal-800">Original</th>
                <th className="p-2 text-left text-teal-800">Changes to</th>
                <th className="p-2 text-left text-teal-800">Example</th>
              </tr>
            </thead>
            <tbody>
              {pastReporting.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2">{row.original}</td>
                  <td className="p-2 font-medium text-teal-700">{row.changesTo || row.stays}</td>
                  <td className="p-2 text-slate-600 text-xs">{row.reported}</td>
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
 * ConsonanceSection - Consonance des temps (tense harmony).
 *
 * Content:
 * - Explanation of consonance des temps concept
 * - Side-by-side comparison examples:
 *   - Present reporting vs Past reporting
 *   - Shows how tenses shift when reporting verb is past
 */
function ConsonanceSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="consonance" title="Consonance des Temps" icon={FaBalanceScale} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
      <div className="space-y-4">
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          {consonance.map((item, idx) => (<li key={idx}>{item}</li>))}
        </ul>
        <div className="grid gap-3">
          {detailedExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-600 text-sm">{ex.context}</p>
              <p className="text-teal-700">Present reporting: {ex.present}</p>
              <p className="text-cyan-700">Past reporting: {ex.past}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ExceptionsSection - Special cases that don't follow normal rules.
 *
 * Content:
 * - General truths stay present (la Terre est ronde)
 * - Very recent past can stay present if situation still current
 */
function ExceptionsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="exceptions" title="Exceptions" icon={FaStar} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
      <div className="space-y-4">
        <div className="grid gap-3">
          {exceptions.map((ex, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-semibold text-amber-800">{ex.case}</p>
              <p className="text-amber-700">{ex.example}</p>
              <p className="text-sm text-amber-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * MistakesSection - Common errors with indirect speech tense changes.
 *
 * Content:
 * - Not changing present to imparfait in past reporting
 * - Not changing passé composé to plus-que-parfait
 * - Not changing futur to conditionnel
 */
function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
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
 * Lesson13Page - Main component for B1 Lesson 13.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B1 components with teal accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson13Page() {
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
    const saved = localStorage.getItem("b1Lesson13Progress");
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
      localStorage.setItem("b1Lesson13Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-50 flex items-center justify-center"><div className="text-teal-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B1" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="teal" /></div>

        {/* Lesson Sections - In Order of Instruction */}
        <PresentSection isReviewed={reviewedSections.includes("present-reporting")} onMarkReviewed={handleMarkReviewed} />
        <PastSection isReviewed={reviewedSections.includes("past-reporting")} onMarkReviewed={handleMarkReviewed} />
        <ConsonanceSection isReviewed={reviewedSections.includes("consonance")} onMarkReviewed={handleMarkReviewed} />
        <ExceptionsSection isReviewed={reviewedSections.includes("exceptions")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-teal-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="teal" />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={13} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson14" recapItems={["Present reporting: no tense change", "Past reporting: tense shift", "Présent→imparfait, Passé composé→plus-que-parfait, Futur→conditionnel", "Consonance des temps", "Exceptions for general truths"]} accentColor="teal" />
        )}
      </div>
    </div>
  );
}
