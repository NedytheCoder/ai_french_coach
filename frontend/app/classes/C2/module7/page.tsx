/**
 * C2 Module 7 - Idiomatic & Native-Level Expression
 * ====================================================
 *
 * This page teaches C2-level French learners to master idioms, collocations,
 * and natural phrasing. Students learn to eliminate translation traces and
 * achieve authentic, native-like fluency.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C2 Module 6
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Native Fluency Section - Introduction via introSections
 * 5. Advanced Idioms Section - Two-column grid of 8 idioms
 * 6. NuanceBlock - Collocation Mastery with comparison table
 * 7. Native Progression Section - Weak/Strong/Expert comparisons
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceBlock: Collocation comparison table display
 * - WeakStrongExpertCard: 3-tier idiomatic progression examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Emerald/green gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for idioms
 * - Comparison table for collocations (correct vs wrong)
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
  FaLanguage,       // Native Fluency section
  FaComments,       // Advanced Idioms section
  FaExclamationTriangle, // (unused but imported)
  FaExchangeAlt,    // Native Progression section
  FaQuestionCircle, // Practice section header
} from "react-icons/fa";

// Shared C2 components
import { ModuleHeader, ProgressBar, PracticeSection, CompletionCard, ModuleNav, SectionCard, NuanceBlock, WeakStrongExpertCard } from "../components";

// Module data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Module7Page - Main component for C2 Module 7.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C2 components with emerald/green theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module7Page() {
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
    const saved = localStorage.getItem("c2Module7Progress");
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
      localStorage.setItem("c2Module7Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------
  /**
   * handleMarkReviewed - Marks a section as reviewed.
   * @param id - Section identifier
   */
  const handleMarkReviewed = (id: string) => {
    setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id]));
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
  const progress = useMemo(() => Math.round((reviewedSections.length / data.sectionIds.length) * 100), [reviewedSections]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  // Show loading state during SSR hydration
  if (!isClient) return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
      <div className="text-emerald-600">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C2/module6" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={7} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Native Fluency - Introduction to idiomatic mastery */}
        <SectionCard id="intro" title="Native Fluency" icon={FaLanguage} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Advanced Idioms Section - Two-column grid of 8 idioms */}
        <SectionCard id="idioms" title="Advanced Idioms" icon={FaComments} isReviewed={reviewedSections.includes("idioms")} onMarkReviewed={handleMarkReviewed}>
          {/* Two-column grid for idioms (avoir le bras long, poser un lapin, etc.) */}
          <div className="grid md:grid-cols-2 gap-4">
            {data.advancedIdioms.idioms.map((idiom, idx) => (
              <div key={idx} className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="font-medium text-emerald-800">{idiom.idiom}</p>
                <p className="text-sm text-slate-600">{idiom.meaning}</p>
                <p className="text-slate-700 italic text-sm mt-1">{idiom.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* NuanceBlock - Collocation Mastery with comparison table */}
        <NuanceBlock title="Collocation Mastery" highlight="The right verb + noun combinations">
          {/* Comparison table showing correct vs wrong collocations */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* Table header: Verb | Correct | Wrong */}
              <thead className="bg-emerald-100"><tr><th className="p-3 text-left text-emerald-800">Verb</th><th className="p-3 text-left text-emerald-800">Collocates with</th><th className="p-3 text-left text-emerald-800">Not</th></tr></thead>
              <tbody className="divide-y divide-emerald-100">
                {data.collocations.pairs.map((pair, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{pair.verb}</td>
                    <td className="p-3 text-emerald-700">{pair.noun}</td>
                    <td className="p-3 text-rose-600 line-through">{pair.wrong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NuanceBlock>

        {/* Native Progression Section - Weak/Strong/Expert comparisons */}
        <SectionCard id="weak-strong-expert" title="Native Progression" icon={FaExchangeAlt} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
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
          <CompletionCard moduleNumber={7} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C2/module8" recapItems={["Avoir le bras long: influence", "Mettre les points sur les i: precision", "Chercher midi à 14h: overcomplicate", "Coûter les yeux de la tête: expensive", "Prendre une décision (not faire)", "Remédier à (not réparer)"]} />
        )}
      </div>
    </div>);
}
