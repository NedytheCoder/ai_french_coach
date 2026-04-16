/**
 * B2 Lesson 7 - Indirect Speech with Tense Shifts
 * =================================================
 *
 * This page teaches B2 learners how to report speech with proper tense
 * coordination (consonance des temps).
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with cyan accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. Reporting Speech Section - Introduction via introSections
 * 5. Tense Shift Table Section - Direct → present → past reporting (table)
 * 6. Present Reporting Section - Tenses stay the same
 * 7. Past Reporting Section - Tenses backshift
 * 8. Imperative Section - Reporting commands and requests
 * 9. Questions Section - Yes/no and information questions
 * 10. Time Words Section - Time and place word shifts
 * 11. PracticeSection - Interactive quiz (15 questions)
 * 12. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Consonance des temps: Tense harmony/backshifting in reported speech
 * - Present reporting: Tenses usually stay the same
 * - Past reporting: Présent → imparfait, passé composé → plus-que-parfait, futur → conditionnel
 * - Imperatives: Use dire à quelqu'un de + infinitif
 * - Questions: Use si for yes/no, maintain question words
 * - Time shifts: aujourd'hui → ce jour-là, hier → la veille, demain → le lendemain
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, etc.)
 * - Cyan accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Tense shift reference table
 * - All lesson data imported via data namespace
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import React, { useState, useEffect, useMemo } from "react";

// React Icons for UI elements
import {
  FaComments,       // Reporting Speech section
  FaTable,          // Tense Shift Table section
  FaClock,          // Past Reporting section
  FaArrowRight,     // Present and Imperative sections
  FaQuestionCircle, // Questions section
  FaCalendarAlt,    // Time Words section
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";

// Lesson data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson7Page - Main component for B2 Lesson 7.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B2 components with cyan accent color
 *
 * All lesson content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson7Page() {
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
    const saved = localStorage.getItem("b2Lesson7Progress");
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
      localStorage.setItem("b2Lesson7Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  const progress = useMemo(() => Math.round((reviewedSections.length / data.sectionIds.length) * 100), [reviewedSections]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  // Show loading state during SSR hydration
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center"><div className="text-cyan-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from data.lessonMeta */}
        <LessonHeader lessonNumber={7} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="cyan" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-cyan-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="cyan" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* Reporting Speech - Introduction to indirect speech and consonance des temps */}
        <SectionCard id="intro" title="Reporting Speech" icon={FaComments} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        {/* Tense Shift Table - Reference table: Direct → Present → Past reporting */}
        <SectionCard id="tense-shifts" title="Tense Shift Table" icon={FaTable} isReviewed={reviewedSections.includes("tense-shifts")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cyan-100"><tr><th className="p-3 text-left text-cyan-800">Direct</th><th className="p-3 text-left text-cyan-800">Present reporting</th><th className="p-3 text-left text-cyan-800">Past reporting</th><th className="p-3 text-left text-cyan-800">Shift</th></tr></thead>
              <tbody className="divide-y divide-cyan-100">{data.tenseShiftsTable.map((row, idx) => (<tr key={idx}><td className="p-3 italic text-slate-600">{row.direct}</td><td className="p-3 text-slate-700">{row.present}</td><td className="p-3 text-cyan-700">{row.past}</td><td className="p-3 text-sm text-slate-500">{row.shift}</td></tr>))}</tbody>
            </table>
          </div>
        </SectionCard>

        {/* Present Reporting - Tenses stay the same with present reporting verbs */}
        <SectionCard id="present-reporting" title={data.presentReporting.title} icon={FaArrowRight} isReviewed={reviewedSections.includes("present-reporting")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-4">
            <p className="text-slate-700">{data.presentReporting.explanation}</p>
            <div className="space-y-3">{data.presentReporting.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-cyan-50 rounded-lg border border-cyan-200"><p className="font-medium text-cyan-800">{ex.reported}</p><p className="text-sm text-slate-600">Direct: {ex.direct}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Past Reporting - Tenses backshift with past reporting verbs */}
        <SectionCard id="past-reporting" title={data.pastReporting.title} icon={FaClock} isReviewed={reviewedSections.includes("past-reporting")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-4">
            <p className="text-slate-700">{data.pastReporting.explanation}</p>
            {/* Display the key rule for tense backshifting */}
            <p className="text-sm text-cyan-600 font-medium">{data.pastReporting.keyRule}</p>
            <div className="space-y-3">{data.pastReporting.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-cyan-50 rounded-lg border border-cyan-200"><p className="font-medium text-cyan-800">{ex.reported}</p><p className="text-sm text-slate-600">Direct: {ex.direct} → {ex.analysis}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Imperative Reporting - Commands transform to infinitive or subjunctive */}
        <SectionCard id="imperative" title={data.imperativeReporting.title} icon={FaArrowRight} isReviewed={reviewedSections.includes("imperative")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-4">
            <p className="text-slate-700">{data.imperativeReporting.explanation}</p>
            <div className="space-y-3">{data.imperativeReporting.transformations.map((t, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{t.direct} → {t.reported}</p><p className="text-sm text-cyan-600">{t.structure}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Question Reporting - Yes/no (si) and information questions */}
        <SectionCard id="questions" title={data.questionReporting.title} icon={FaQuestionCircle} isReviewed={reviewedSections.includes("questions")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-4">
            <p className="text-slate-700">{data.questionReporting.explanation}</p>
            <div className="space-y-3">{data.questionReporting.types.map((t, idx) => (<div key={idx} className="p-4 bg-cyan-50 rounded-lg border border-cyan-200"><p className="font-medium text-cyan-800">{t.type}</p><p className="text-slate-700">{t.direct} → {t.reported}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Time Words - Time and place word shifts in indirect speech */}
        <SectionCard id="time-words" title={data.timeWordShifts.title} icon={FaCalendarAlt} isReviewed={reviewedSections.includes("time-words")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-3">{data.timeWordShifts.shifts.map((s, idx) => (<div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{s.original} → {s.becomes}</p><p className="text-sm text-slate-600">{s.example}</p></div>))}</div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-cyan-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-cyan-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="cyan" /></div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={7} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes/B2/lesson8" recapItems={["Présent → imparfait", "Passé composé → plus-que-parfait", "Futur → conditionnel", "Imperative reporting with infinitive", "Question reporting with si", "Time word shifts"]} accentColor="cyan" />
        )}
      </div>
    </div>
  );
}
