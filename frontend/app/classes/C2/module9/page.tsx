/**
 * C2 Module 9 - Advanced Writing Mastery
 * ========================================
 *
 * This page teaches C2-level French learners to master structured essays,
 * logical progression, and style refinement. Students learn to create prose
 * at the highest level of clarity and sophistication.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C2 Module 8
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Writing Architecture Section - Introduction via introSections
 * 5. Essay Structure Section - Vertical stack of 4 essay sections
 * 6. NuanceBlock - Style Refinement (two-column grid of 4 techniques)
 * 7. Writing Progression Section - Weak/Strong/Expert comparisons
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceBlock: Style refinement techniques display
 * - WeakStrongExpertCard: 3-tier writing progression examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Orange/amber gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Vertical stack for essay structure sections
 * - Two-column grid for style refinement techniques
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
  FaEdit,           // Writing Architecture section
  FaAlignLeft,      // Essay Structure section
  FaStream,         // Writing Progression section
  FaPalette,        // (unused but imported)
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
 * Module9Page - Main component for C2 Module 9.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C2 components with orange/amber theme
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
    const saved = localStorage.getItem("c2Module9Progress");
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
      localStorage.setItem("c2Module9Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center"><div className="text-orange-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C2/module8" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={9} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Writing Architecture - Introduction to essay mastery */}
        <SectionCard id="intro" title="Writing Architecture" icon={FaEdit} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Essay Structure Section - Vertical stack of 4 essay sections */}
        <SectionCard id="structure" title="Essay Structure" icon={FaAlignLeft} isReviewed={reviewedSections.includes("structure")} onMarkReviewed={handleMarkReviewed}>
          {/* Vertical stack for 4 essay sections (Introduction, Development, Concession, Conclusion) */}
          <div className="space-y-4">
            {data.essayStructure.sections.map((s, idx) => (
              <div key={idx} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-800">{s.section}</p>
                <p className="text-sm text-slate-600">{s.components.join(" • ")}</p>
                <p className="text-slate-700 italic text-sm mt-2">{s.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* NuanceBlock - Style Refinement (two-column grid of 4 techniques) */}
        <NuanceBlock title="Style Refinement" highlight="Techniques for sophisticated prose">
          {/* Two-column grid for 4 style refinement techniques */}
          <div className="grid md:grid-cols-2 gap-4">
            {data.styleRefinement.techniques.map((t, idx) => (
              <div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800">{t.technique}</p>
                <p className="text-sm text-slate-600">{t.weak} → {t.strong}</p>
                <p className="text-xs text-slate-500 mt-1">{t.effect}</p>
              </div>
            ))}
          </div>
        </NuanceBlock>

        {/* Writing Progression Section - Weak/Strong/Expert comparisons */}
        <SectionCard id="weak-strong-expert" title="Writing Progression" icon={FaStream} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-orange-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Writing Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={9} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C2/module10" recapItems={["Essay structure: hook, context, thesis, roadmap", "Temporal structuring vs enumeration", "Concession structures in argument", "Sophisticated hedging", "Varied sentence openings", "Cumulative syntax"]} />
        )}
      </div>
    </div>
  );
}
