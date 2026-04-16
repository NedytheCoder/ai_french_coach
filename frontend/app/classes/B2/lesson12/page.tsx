/**
 * B2 Lesson 12 - Argumentation & Analysis
 * ==========================================
 *
 * This page teaches B2 learners the language of critical thinking and persuasive
 * discourse, including thesis formulation, evidence presentation, logical reasoning,
 * objection handling, and hedging strategies.
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with amber accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. Argumentation Mastery Section - Introduction via introSections
 * 5. Thesis Section - Thesis statement formulations
 * 6. Evidence Section - Introducing evidence markers
 * 7. Reasoning Section - Logical reasoning connectors (two-column grid)
 * 8. Objection Section - Acknowledging and refuting objections
 * 9. Conclusion Section - Conclusion strategies
 * 10. Hedging Section - Hedging and qualification devices
 * 11. PracticeSection - Interactive quiz (15 questions)
 * 12. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Thesis: Clear position statement (Je soutiens que..., Il apparaît que...)
 * - Evidence: Grounds arguments in reality (Selon X, Les données montrent)
 * - Reasoning: Explicit logic through connectors (donc, par conséquent, de même)
 * - Objections: Strengthen position by addressing counterarguments (Certes... mais)
 * - Hedging: Softens claims appropriately (probablement, en général)
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, etc.)
 * - Amber accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for reasoning categories
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
  FaGavel,         // Argumentation Mastery section
  FaQuoteLeft,     // Evidence section
  FaStream,        // Reasoning section
  FaBalanceScale,  // Objection section
  FaFlagCheckered, // Thesis and Conclusion sections
  FaAdjust,        // Hedging section
  FaTrophy,        // Available but unused
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";

// Lesson data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson12Page - Main component for B2 Lesson 12.
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
export default function Lesson12Page() {
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
    const saved = localStorage.getItem("b2Lesson12Progress");
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
      localStorage.setItem("b2Lesson12Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center"><div className="text-amber-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from data.lessonMeta */}
        <LessonHeader lessonNumber={12} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="amber" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="amber" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* Argumentation Mastery - Introduction to argumentation and analysis */}
        <SectionCard id="intro" title="Argumentation Mastery" icon={FaGavel} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        {/* Thesis Section - Thesis statement formulations */}
        <SectionCard id="thesis" title={data.thesisSection.title} icon={FaFlagCheckered} isReviewed={reviewedSections.includes("thesis")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.thesisSection.explanation}</p>
            <div className="space-y-3">{data.thesisSection.patterns.map((p, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{p.pattern}</p><p className="text-slate-700">{p.example}</p><p className="text-sm text-slate-500">{p.strength}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Evidence Section - Introducing evidence markers */}
        <SectionCard id="evidence" title={data.evidenceSection.title} icon={FaQuoteLeft} isReviewed={reviewedSections.includes("evidence")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.evidenceSection.explanation}</p>
            <div className="space-y-3">{data.evidenceSection.markers.map((m, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{m.marker}</p><p className="text-slate-600 italic">{m.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Reasoning Section - Logical reasoning connectors (two-column grid) */}
        <SectionCard id="reasoning" title={data.reasoningSection.title} icon={FaStream} isReviewed={reviewedSections.includes("reasoning")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.reasoningSection.explanation}</p>
            {/* Two-column grid for reasoning categories: Deduction, Induction, Analogy, Causation */}
            <div className="grid md:grid-cols-2 gap-4">{data.reasoningSection.categories.map((cat, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{cat.category}</p><p className="text-slate-600">{cat.markers.join(", ")}</p><p className="text-sm text-slate-500 italic">{cat.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Objection Section - Acknowledging and refuting objections */}
        <SectionCard id="objection" title={data.objectionSection.title} icon={FaBalanceScale} isReviewed={reviewedSections.includes("objection")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.objectionSection.explanation}</p>
            <div className="space-y-3">{data.objectionSection.strategies.map((s, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{s.strategy}</p><p className="text-slate-600">{s.pattern}</p><p className="text-sm text-slate-500 italic">{s.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Conclusion Section - Conclusion strategies */}
        <SectionCard id="conclusion" title={data.conclusionSection.title} icon={FaFlagCheckered} isReviewed={reviewedSections.includes("conclusion")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.conclusionSection.explanation}</p>
            <div className="space-y-3">{data.conclusionSection.techniques.map((t, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{t.technique}</p><p className="text-slate-600">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Hedging Section - Hedging and qualification devices */}
        <SectionCard id="hedging" title={data.hedgingSection.title} icon={FaAdjust} isReviewed={reviewedSections.includes("hedging")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.hedgingSection.explanation}</p>
            <div className="space-y-3">{data.hedgingSection.devices.map((d, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{d.device}</p><p className="text-slate-600">{d.examples.join(", ")}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="amber" /></div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={12} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes" recapItems={["Thesis formulation patterns", "Evidence markers", "Logical reasoning connectors", "Objection handling strategies", "Conclusion techniques", "Hedging and qualification"]} accentColor="amber" />
        )}
      </div>
    </div>
  );
}
