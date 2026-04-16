/**
 * B2 Lesson 1 - Formal and Informal Registers (Soutenu, Courant, Familier)
 * =========================================================================
 *
 * This page teaches B2 learners about register awareness and the ability
 * to navigate between formal (soutenu), neutral (courant), and casual
 * (familier) French appropriately.
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with slate accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. Understanding Register Section - Introduction via introSections
 * 5. Tu vs Vous Section - Social dynamics of pronoun choice
 * 6. Formal Markers Section - Features of formal French (table format)
 * 7. Informal Markers Section - Features of informal French (table format)
 * 8. Register Transformation Section - Rewriting examples
 * 9. Context-Based Comparison Section - ComparisonCard for situations
 * 10. Common Errors Section - Mistakes to avoid
 * 11. PracticeSection - Interactive quiz (15 questions)
 * 12. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Soutenu: formal/written register with subjunctive, passive, nominalisation
 * - Courant: neutral/standard register
 * - Familier: casual/spoken register with dropped ne, filler words, verlan
 * - Tu vs vous: social dynamics and context-based choice
 * - Register mixing creates cognitive dissonance
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, ComparisonCard, etc.)
 * - Slate accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Tables for formal/informal markers
 * - ComparisonCard for situation-based register comparison
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
  FaGraduationCap,   // Understanding Register section
  FaUserTie,         // Tu vs vous section
  FaComments,        // Informal markers section
  FaPenFancy,        // Formal markers and rewriting sections
  FaBalanceScale,    // Comparison section
  FaExclamationCircle, // Mistakes section
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader, ComparisonCard } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  introSections,
  tuVsVous,
  formalMarkers,
  informalMarkers,
  rewritingExamples,
  comparisonTable,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson1Page - Main component for B2 Lesson 1.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B2 components with slate accent color
 *
 * Unlike A2/B1 lessons, this page uses SectionCard components inline
 * rather than separate sub-component functions.
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson1Page() {
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
    const saved = localStorage.getItem("b2Lesson1Progress");
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
      localStorage.setItem("b2Lesson1Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-50 flex items-center justify-center"><div className="text-slate-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader lessonNumber={1} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="slate" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="slate" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* Understanding Register - Introduction to why register matters */}
        <SectionCard id="intro" title="Understanding Register" icon={FaGraduationCap} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-6">
            {introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Tu vs Vous - Social dynamics and context-based choice */}
        <SectionCard id="tu-vs-vous" title={tuVsVous.title} icon={FaUserTie} isReviewed={reviewedSections.includes("tu-vs-vous")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed">{tuVsVous.explanation}</p>
            <div className="grid gap-3">
              {tuVsVous.examples.map((ex, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-slate-700">{ex.context}</span>
                    <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-sm">{ex.choice}</span>
                  </div>
                  <p className="text-sm text-slate-600">{ex.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Formal Markers - Features of formal (soutenu) French displayed in table */}
        <SectionCard id="formal-markers" title={formalMarkers.title} icon={FaPenFancy} isReviewed={reviewedSections.includes("formal-markers")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100"><tr><th className="p-3 text-left text-slate-700">Feature</th><th className="p-3 text-left text-slate-700">Example</th><th className="p-3 text-left text-slate-700">Note</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {formalMarkers.features.map((f, idx) => (<tr key={idx}><td className="p-3 font-medium text-slate-800">{f.feature}</td><td className="p-3 text-slate-700 italic">{f.example}</td><td className="p-3 text-slate-600">{f.note}</td></tr>))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Informal Markers - Features of informal (familier) French displayed in table */}
        <SectionCard id="informal-markers" title={informalMarkers.title} icon={FaComments} isReviewed={reviewedSections.includes("informal-markers")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100"><tr><th className="p-3 text-left text-slate-700">Feature</th><th className="p-3 text-left text-slate-700">Example</th><th className="p-3 text-left text-slate-700">Note</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {informalMarkers.features.map((f, idx) => (<tr key={idx}><td className="p-3 font-medium text-slate-800">{f.feature}</td><td className="p-3 text-slate-700 italic">{f.example}</td><td className="p-3 text-slate-600">{f.note}</td></tr>))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Register Transformation - Same content in three different registers */}
        <SectionCard id="rewriting" title="Register Transformation" icon={FaPenFancy} isReviewed={reviewedSections.includes("rewriting")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            {rewritingExamples.map((ex, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{ex.note}</p>
                <p className="text-slate-800"><span className="font-medium text-slate-600">Neutral:</span> {ex.neutral}</p>
                <p className="text-slate-800"><span className="font-medium text-emerald-600">Formal:</span> {ex.formal}</p>
                <p className="text-slate-800"><span className="font-medium text-amber-600">Informal:</span> {ex.informal}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Context-Based Comparison - Situation-based register comparison using ComparisonCard */}
        <SectionCard id="comparison" title="Context-Based Comparison" icon={FaBalanceScale} isReviewed={reviewedSections.includes("comparison")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <ComparisonCard title="Register by Situation" items={comparisonTable.map(row => ({ label: row.situation, content: `${row.formal} / ${row.neutral} / ${row.informal}` }))} accentColor="slate" />
        </SectionCard>

        {/* Common Register Errors - Mistakes to avoid in register usage */}
        <SectionCard id="mistakes" title="Common Register Errors" icon={FaExclamationCircle} isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            {commonMistakes.map((mistake, idx) => (
              <div key={idx} className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                <p className="font-medium text-rose-800 mb-1">Error: {mistake.wrong}</p>
                <p className="text-sm text-rose-700 mb-1">Problem: {mistake.problem}</p>
                <p className="text-sm text-emerald-700">Solution: {mistake.solution}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="slate" />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={1} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson2" recapItems={["Three registers: soutenu, courant, familier", "Tu vs vous in social context", "Formal markers: subjunctive, conditional, passive", "Informal markers: dropped ne, elisions, fillers", "Register transformation techniques"]} accentColor="slate" />
        )}
      </div>
    </div>
  );
}
