/**
 * C1 Module 9 - Advanced Pronoun & Structure Control
 * ======================================================
 *
 * This page teaches C1-level French learners to master complex pronoun chains,
 * strategic restructuring, and stylistic choices between clarity and elegance.
 * Students learn when to deploy pronouns vs repetition, and how to restructure
 * sentences for different rhetorical effects.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 8
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Pronoun Precision Section - Introduction via introSections
 * 5. Pronoun Chains Section - Two-column grid of chain examples
 * 6. NuanceCard - Restructuring Choices (data table)
 * 7. Simple vs Restructured Section - Before/after comparisons
 * 8. Structural Transformations Section - Transformation examples
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: Restructuring patterns data table
 * - WeakVsStrongCard: Simple vs restructured comparisons
 * - TransformationCard: Structural transformation examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Blue/indigo gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for pronoun chains
 * - Data table for restructuring patterns
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
  FaLink,          // Pronoun Precision section
  FaSitemap,       // Pronoun Chains section
  FaArrowsAlt,     // Simple vs Restructured section
  FaBalanceScale,  // Structural Transformations section
  FaQuestionCircle, // Practice section header
} from "react-icons/fa";

// Shared C1 components
import { ModuleHeader, ProgressBar, PracticeSection, CompletionCard, ModuleNav, SectionCard, NuanceCard, WeakVsStrongCard, TransformationCard } from "../components";

// Module data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Module9Page - Main component for C1 Module 9.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with blue/indigo theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module9Page() {
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
    const saved = localStorage.getItem("c1Module9Progress");
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
      localStorage.setItem("c1Module9Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center"><div className="text-blue-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C1/module8" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={9} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Pronoun Precision - Introduction to pronoun chains and restructuring */}
        <SectionCard id="intro" title="Pronoun Precision" icon={FaLink} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Pronoun Chains Section - Two-column grid of chain examples */}
        <SectionCard id="pronoun-chains" title="Pronoun Chains" icon={FaSitemap} isReviewed={reviewedSections.includes("pronoun-chains")} onMarkReviewed={handleMarkReviewed}>
          {/* Two-column grid for pronoun chain examples */}
          <div className="grid md:grid-cols-2 gap-4">
            {data.pronounChainExamples.examples.map((ex, idx) => (
              <div key={idx} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-medium text-blue-800">{ex.chain}</p>
                <p className="text-sm text-slate-600">{ex.analysis}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Nuance Card - Restructuring Choices (data table) */}
        <NuanceCard title="Restructuring Choices" highlight="Same idea, different architecture">
          <div className="overflow-x-auto">
            {/* Data table showing restructuring patterns with examples */}
            <table className="w-full text-sm">
              <thead className="bg-blue-100"><tr><th className="p-3 text-left text-blue-800">Pattern</th><th className="p-3 text-left text-blue-800">Example</th><th className="p-3 text-left text-blue-800">Effect</th></tr></thead>
              <tbody className="divide-y divide-blue-100">
                {data.restructuringPatterns.patterns.map((p, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{p.pattern}</td>
                    <td className="p-3 text-slate-600 italic">{p.passive || p.impersonal || p.nominal || p.cleft}</td>
                    <td className="p-3 text-slate-600">{p.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NuanceCard>

        {/* Simple vs Restructured Section - Before/after comparisons */}
        <SectionCard id="weak-vs-strong" title="Simple vs Restructured" icon={FaArrowsAlt} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Structural Transformations Section - Transformation examples */}
        <SectionCard id="transformations" title="Structural Transformations" icon={FaBalanceScale} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Structure Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={9} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module10" recapItems={["Pronoun chain order: me, te, se, nous, vous, le, la, les, lui, leur", "Y before en", "Me/te become moi/toi in affirmative imperative", "Active vs passive for focus", "Nominalization for formality", "Clefts for emphasis"]} />
        )}
      </div>
    </div>
  );
}
