/**
 * C1 Module 6 - Argumentation & Persuasion
 * ===========================================
 *
 * This page teaches C1-level French learners to construct compelling arguments
 * with sophisticated reasoning and persuasive elegance. Students learn thesis
 * formulation, evidence strategies, and rhetorical devices.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 5
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Persuasion Architecture Section - Introduction via introSections
 * 5. Thesis Formulations Section - Thesis pattern examples
 * 6. NuanceCard - Rhetorical Strategies (two-column grid)
 * 7. Evidence Strategies Section - Evidence introduction techniques
 * 8. Persuasive Elevation Section - Before/after comparisons
 * 9. Transformations Section - Persuasive transformations
 * 10. PracticeSection - Interactive quiz (15 questions)
 * 11. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: Two-column comparison (classical techniques vs strategic moves)
 * - WeakVsStrongCard: Shows before/after persuasive examples
 * - TransformationCard: Demonstrates persuasive transformations
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Amber/orange gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for rhetorical strategies
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
  FaGavel,          // Persuasion Architecture section
  FaBullhorn,       // Thesis Formulations section
  FaBalanceScale,   // Persuasive Elevation section
  FaTheaterMasks,   // Transformations section
  FaChartLine,      // Evidence Strategies section
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
 * Module6Page - Main component for C1 Module 6.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with amber/orange theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module6Page() {
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
    const saved = localStorage.getItem("c1Module6Progress");
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
      localStorage.setItem("c1Module6Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
        <ModuleNav backPath="/classes/C1/module5" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={6} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Persuasion Architecture - Introduction to argumentation */}
        <SectionCard id="intro" title="Persuasion Architecture" icon={FaGavel} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Thesis Formulations Section - Thesis pattern examples */}
        <SectionCard id="thesis" title="Thesis Formulations" icon={FaBullhorn} isReviewed={reviewedSections.includes("thesis")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-4">
            {data.thesisFormulations.patterns.map((p, idx) => (
              <div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800">{p.pattern}</p>
                <p className="text-slate-600">{p.formulation}</p>
                <p className="text-slate-700 italic">{p.example}</p>
                <p className="text-sm text-slate-500">{p.strength}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Nuance Card - Rhetorical Strategies (two-column comparison grid) */}
        <NuanceCard title="Rhetorical Strategies" highlight="Persuasion = Logic + Artistry">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left column - Classical techniques */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="font-medium text-amber-800 mb-2">Classical techniques</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <b>Praeteritio:</b> Mention by claiming not to</li>
                <li>• <b>Anaphora:</b> Repetition for rhythm</li>
                <li>• <b>Antithesis:</b> Balanced opposition</li>
                <li>• <b>Gradatio:</b> Building climax</li>
              </ul>
            </div>
            {/* Right column - Strategic moves */}
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="font-medium text-orange-800 mb-2">Strategic moves</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <b>Concession:</b> Acknowledge before refuting</li>
                <li>• <b>Litotes:</b> Understate for emphasis</li>
                <li>• <b>Personification:</b> Give abstract concepts agency</li>
                <li>• <b>Consensus:</b> Appeal to shared agreement</li>
              </ul>
            </div>
          </div>
        </NuanceCard>

        {/* Evidence Strategies Section - Evidence introduction techniques */}
        <SectionCard id="evidence" title="Evidence Strategies" icon={FaChartLine} isReviewed={reviewedSections.includes("evidence")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-4">
            {data.evidenceStrategies.strategies.map((s, idx) => (
              <div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800">{s.strategy}</p>
                <p className="text-slate-600">{s.marker}</p>
                <p className="text-slate-700 italic">{s.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Persuasive Elevation Section - Before/after persuasive comparisons */}
        <SectionCard id="weak-vs-strong" title="Persuasive Elevation" icon={FaBalanceScale} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Transformations Section - Persuasive transformation examples */}
        <SectionCard id="transformations" title="Persuasive Transformations" icon={FaTheaterMasks} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Persuasion Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={6} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module7" recapItems={["'Je soutiens' for clear thesis", "Strategic concessions with 'certes'", "Praeteritio for subtle criticism", "Anaphora for rhythmic emphasis", "Antithesis for clear contrast", "Gradatio for building intensity"]} />
        )}
      </div>
    </div>
  );
}
