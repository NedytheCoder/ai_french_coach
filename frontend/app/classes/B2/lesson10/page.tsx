/**
 * B2 Lesson 10 - High-Level Connectors & Transitions
 * =====================================================
 *
 * This page teaches B2 learners sophisticated discourse markers for advanced
 * French communication, including connectors for contrast, consequence, chronology,
 * exemplification, and summary.
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with amber accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. Connectors & Transitions Section - Introduction via introSections
 * 5. Connector Categories Section - Logic categories table
 * 6. Contrast Section - Sophisticated opposition markers
 * 7. Consequence Section - Cause and consequence (two-column grid)
 * 8. Chronology Section - Temporal sequencing markers
 * 9. Exemplification Section - Illustration markers
 * 10. PracticeSection - Interactive quiz (15 questions)
 * 11. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Basic connectors → Advanced connectors (et → de plus, mais → cependant)
 * - Register distinctions: Formal vs neutral usage
 * - Logical relationships: Opposition, concession, cause, consequence, chronology
 * - Discourse structure: Opening, continuation, conclusion markers
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, etc.)
 * - Amber accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Category table and two-column grid for cause/consequence
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
  FaStream,        // Connectors & Transitions section
  FaRandom,        // Connector Categories and Contrast sections
  FaArrowRight,    // Consequence section
  FaClock,         // Chronology section
  FaListUl,        // Exemplification section
  FaClipboardList, // Available but unused
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";

// Lesson data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson10Page - Main component for B2 Lesson 10.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B2 components with amber accent color
 *
 * All lesson content is accessed via the data namespace import.
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
    const saved = localStorage.getItem("b2Lesson10Progress");
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
      localStorage.setItem("b2Lesson10Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center"><div className="text-amber-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from data.lessonMeta */}
        <LessonHeader lessonNumber={10} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="amber" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="amber" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* Connectors & Transitions - Introduction to high-level connectors */}
        <SectionCard id="intro" title="Connectors & Transitions" icon={FaStream} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        {/* Connector Categories - Logic categories with basic → advanced progression (table) */}
        <SectionCard id="logic" title="Connector Categories" icon={FaRandom} isReviewed={reviewedSections.includes("logic")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-100"><tr><th className="p-3 text-left text-amber-800">Category</th><th className="p-3 text-left text-amber-800">Advanced Connectors</th><th className="p-3 text-left text-amber-800">Example</th></tr></thead>
              <tbody className="divide-y divide-amber-100">{data.logicCategories.map((cat, idx) => (<tr key={idx}><td className="p-3 font-medium text-amber-800">{cat.category}</td><td className="p-3 text-slate-700">{cat.advanced.join(", ")}</td><td className="p-3 text-slate-600 italic">{cat.example}</td></tr>))}</tbody>
            </table>
          </div>
        </SectionCard>

        {/* Contrast Section - Sophisticated opposition markers */}
        <SectionCard id="contrast" title={data.contrastSection.title} icon={FaRandom} isReviewed={reviewedSections.includes("contrast")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-3">{data.contrastSection.connectors.map((c, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{c.connector} <span className="text-slate-500 font-normal">({c.register})</span></p><p className="text-slate-700">{c.example}</p></div>))}</div>
        </SectionCard>

        {/* Consequence Section - Cause and consequence connectors (two-column grid) */}
        <SectionCard id="consequence" title={data.consequenceSection.title} icon={FaArrowRight} isReviewed={reviewedSections.includes("consequence")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Cause connectors column */}
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"><h4 className="font-semibold text-emerald-800 mb-2">Cause</h4><ul className="space-y-1">{data.consequenceSection.causeConnectors.map((c, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{c.connector}:</span> {c.example}</li>))}</ul></div>
              {/* Consequence connectors column */}
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200"><h4 className="font-semibold text-orange-800 mb-2">Consequence</h4><ul className="space-y-1">{data.consequenceSection.consequenceConnectors.map((c, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{c.connector}:</span> {c.example}</li>))}</ul></div>
            </div>
          </div>
        </SectionCard>

        {/* Chronology Section - Temporal and logical sequencing markers */}
        <SectionCard id="chronology" title={data.chronologySection.title} icon={FaClock} isReviewed={reviewedSections.includes("chronology")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-3">{data.chronologySection.connectors.map((c, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{c.type}</p><p className="text-slate-700">{c.markers.join(", ")}</p></div>))}</div>
        </SectionCard>

        {/* Exemplification Section - Illustration and example markers */}
        <SectionCard id="exemplification" title={data.exemplificationSection.title} icon={FaListUl} isReviewed={reviewedSections.includes("exemplification")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-3">{data.exemplificationSection.markers.map((m, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{m.marker}</p><p className="text-slate-600 italic">{m.example}</p></div>))}</div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="amber" /></div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={10} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes/B2/lesson11" recapItems={["Contrast: cependant, néanmoins, toutefois", "Cause: puisque, étant donné que", "Consequence: par conséquent, dès lors", "Chronology: tout d'abord, ensuite, enfin", "Exemplification: notamment, à titre d'exemple", "Summary: en somme, en définitive"]} accentColor="amber" />
        )}
      </div>
    </div>
  );
}
