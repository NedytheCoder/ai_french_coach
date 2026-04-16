/**
 * C1 Module 8 - Idiomatic & Natural Expression
 * ===============================================
 *
 * This page teaches C1-level French learners to master idioms, fixed expressions,
 * and native-like phrasing. Students learn to eliminate translation traces and
 * achieve authentic French fluency.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 7
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Native Expression Section - Introduction via introSections
 * 5. Advanced Idioms Section - Idioms data table
 * 6. NuanceCard - False Friends Alert (data table)
 * 7. Fixed Expressions Section - Fixed formulas grid
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: False friends warning table
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Emerald/green gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Data tables for idioms and false friends
 * - Two-column grid for fixed expressions
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
  FaComments,       // Advanced Idioms section
  FaExclamationTriangle, // False Friends alert
  FaLanguage,       // Native Expression section
  FaExchangeAlt,    // Fixed Expressions section
  FaQuestionCircle, // Practice section header
} from "react-icons/fa";

// Shared C1 components
import { ModuleHeader, ProgressBar, PracticeSection, CompletionCard, ModuleNav, SectionCard, NuanceCard } from "../components";

// Module data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Module8Page - Main component for C1 Module 8.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with emerald/green theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module8Page() {
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
    const saved = localStorage.getItem("c1Module8Progress");
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
      localStorage.setItem("c1Module8Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center"><div className="text-emerald-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C1/module7" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={8} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Native Expression - Introduction to idiomatic fluency */}
        <SectionCard id="intro" title="Native Expression" icon={FaLanguage} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Advanced Idioms Section - Idioms data table */}
        <SectionCard id="idioms" title="Advanced Idioms" icon={FaComments} isReviewed={reviewedSections.includes("idioms")} onMarkReviewed={handleMarkReviewed}>
          <div className="overflow-x-auto">
            {/* Data table showing idiom, meaning, and example */}
            <table className="w-full text-sm">
              <thead className="bg-emerald-100"><tr><th className="p-3 text-left text-emerald-800">Idiom</th><th className="p-3 text-left text-emerald-800">Meaning</th><th className="p-3 text-left text-emerald-800">Example</th></tr></thead>
              <tbody className="divide-y divide-emerald-100">
                {data.advancedIdioms.idioms.map((idiom, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{idiom.idiom}</td>
                    <td className="p-3 text-slate-600">{idiom.meaning}</td>
                    <td className="p-3 text-slate-700 italic">{idiom.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Nuance Card - False Friends Alert (data table) */}
        <NuanceCard title="False Friends Alert" highlight="Watch out for these traps">
          <div className="overflow-x-auto">
            {/* Data table showing false friends with corrections */}
            <table className="w-full text-sm">
              <thead className="bg-rose-100"><tr><th className="p-3 text-left text-rose-800">French</th><th className="p-3 text-left text-rose-800">French meaning</th><th className="p-3 text-left text-rose-800">Not English</th><th className="p-3 text-left text-rose-800">Use instead</th></tr></thead>
              <tbody className="divide-y divide-rose-100">
                {data.falseFriends.pairs.map((pair, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-rose-700">{pair.french}</td>
                    <td className="p-3 text-slate-600">{pair.frenchMeaning}</td>
                    <td className="p-3 text-slate-500 line-through">{pair.englishLookalike}</td>
                    <td className="p-3 text-emerald-700">{pair.correct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NuanceCard>

        {/* Fixed Expressions Section - Fixed formulas two-column grid */}
        <SectionCard id="fixed-expressions" title="Fixed Expressions" icon={FaExchangeAlt} isReviewed={reviewedSections.includes("fixed-expressions")} onMarkReviewed={handleMarkReviewed}>
          {/* Two-column grid for fixed expressions */}
          <div className="grid md:grid-cols-2 gap-4">
            {data.fixedExpressions.expressions.map((expr, idx) => (
              <div key={idx} className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="font-medium text-emerald-800">{expr.expression}</p>
                <p className="text-sm text-slate-600">{expr.usage}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Idiomatic Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={8} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module9" recapItems={["Avoir le bras long: connections", "Tenir le bon bout: on track", "Chercher midi à 14h: overcomplicate", "Commettre une erreur (not faire)", "Assister à (not attendre)", "En fait (not actuellement)"]} />
        )}
      </div>
    </div>
  );
}
