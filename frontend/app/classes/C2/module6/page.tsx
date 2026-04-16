/**
 * C2 Module 6 - Complex Sentence Mastery
 * =========================================
 *
 * This page teaches C2-level French learners to master advanced subordination,
 * sentence compression, and the balance between clarity and density. Students
 * learn four subordination patterns (temporal, causal, conditional, relative)
 * and techniques for syntactic sophistication.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C2 Module 5
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Syntactic Architecture Section - Introduction via introSections
 * 5. Subordination Patterns Section - Vertical stack of 4 patterns
 * 6. NuanceBlock - Density vs Clarity (two-column comparison)
 * 7. Compression Mastery Section - Weak/Strong/Expert comparisons
 * 8. PracticeSection - Interactive quiz (15 transformation questions)
 * 9. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceBlock: Density vs Clarity comparison (compression vs clarity)
 * - WeakStrongExpertCard: 3-tier syntactic progression examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Violet/purple gradient background theme
 * - localStorage persistence for progress
 * - 15-question transformation quiz (all syntax-focused)
 * - Vertical stack for subordination patterns
 * - Two-column grid for density vs clarity comparison
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
  FaProjectDiagram,  // Syntactic Architecture section
  FaSitemap,          // Subordination Patterns section
  FaCodeBranch,       // (unused but imported)
  FaCompress,         // Compression Mastery section
  FaQuestionCircle,   // Practice section header
} from "react-icons/fa";

// Shared C2 components
import { ModuleHeader, ProgressBar, PracticeSection, CompletionCard, ModuleNav, SectionCard, NuanceBlock, WeakStrongExpertCard } from "../components";

// Module data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Module6Page - Main component for C2 Module 6.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C2 components with violet/purple theme
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
    const saved = localStorage.getItem("c2Module6Progress");
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
      localStorage.setItem("c2Module6Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center"><div className="text-violet-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C2/module5" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={6} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Syntactic Architecture - Introduction to sentence complexity */}
        <SectionCard id="intro" title="Syntactic Architecture" icon={FaProjectDiagram} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Subordination Patterns Section - Vertical stack of 4 patterns */}
        <SectionCard id="subordination" title="Subordination Patterns" icon={FaSitemap} isReviewed={reviewedSections.includes("subordination")} onMarkReviewed={handleMarkReviewed}>
          {/* Vertical stack for 4 subordination patterns (Temporal, Causal, Conditional, Relative) */}
          <div className="space-y-4">
            {data.subordinationPatterns.patterns.map((p, idx) => (
              <div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                <p className="font-medium text-violet-800">{p.pattern}</p>
                <p className="text-sm text-slate-600">{p.structure}</p>
                <p className="text-slate-700 italic text-sm mt-2">{p.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* NuanceBlock - Density vs Clarity (two-column comparison) */}
        <NuanceBlock title="Density vs Clarity" highlight="Balance complexity with comprehension">
          {/* Two-column grid comparing compression vs clarity */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left column - Compression techniques */}
            <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
              <p className="font-medium text-violet-800 mb-2">Compression techniques</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Participial phrases</li>
                <li>• Relative embedding</li>
                <li>• Nominalization</li>
                <li>• Absolute constructions</li>
              </ul>
            </div>
            {/* Right column - Clarity markers */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="font-medium text-purple-800 mb-2">Clarity markers</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Clear subjects</li>
                <li>• Logical connectors</li>
                <li>• Parallel structures</li>
                <li>• Strategic pauses</li>
              </ul>
            </div>
          </div>
        </NuanceBlock>

        {/* Compression Mastery Section - Weak/Strong/Expert comparisons */}
        <SectionCard id="weak-strong-expert" title="Compression Mastery" icon={FaCompress} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
        </SectionCard>

        {/* Practice Section - 15 Question Transformation Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-violet-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Syntax Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={6} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C2/module7" recapItems={["Temporal layering with subordination", "Causal stacking with il s'ensuit", "Conditional complexity", "Relative embedding chains", "Participial compression", "Subject clauses for suspension"]} />
        )}
      </div>
    </div>
  );
}
