/**
 * C2 Module 3 - Advanced Discourse & Flow
 * ==========================================
 *
 * This page teaches C2-level French learners to master sophisticated connectors,
 * rhetorical flow, and argument architecture. Students learn to create prose
 * that guides readers with invisible elegance using advanced discourse markers.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C2 Module 2
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Discourse Architecture Section - Introduction via introSections
 * 5. C2 Connector Toolkit Section - Two-column grid of connector categories
 * 6. NuanceBlock - Argument Architecture patterns
 * 7. Connector Progression Section - Weak/Strong/Expert comparisons
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceBlock: Argument architecture patterns display
 * - WeakStrongExpertCard: 3-tier connector progression examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Cyan/teal gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for connector categories
 * - Vertical stack for argument structures
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
  FaStream,         // C2 Connector Toolkit section
  FaNetworkWired,   // Discourse Architecture section
  FaCodeBranch,     // Connector Progression section
  FaAlignLeft,      // (unused but imported)
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
 * Module3Page - Main component for C2 Module 3.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C2 components with cyan/teal theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module3Page() {
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
    const saved = localStorage.getItem("c2Module3Progress");
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
      localStorage.setItem("c2Module3Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 flex items-center justify-center"><div className="text-cyan-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C2/module2" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={3} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Discourse Architecture - Introduction to flow and connectors */}
        <SectionCard id="intro" title="Discourse Architecture" icon={FaNetworkWired} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* C2 Connector Toolkit Section - Two-column grid of connector categories */}
        <SectionCard id="connectors" title="C2 Connector Toolkit" icon={FaStream} isReviewed={reviewedSections.includes("connectors")} onMarkReviewed={handleMarkReviewed}>
          {/* Two-column grid for 6 connector categories */}
          <div className="grid md:grid-cols-2 gap-4">
            {data.sophisticatedConnectors.categories.map((cat, idx) => (
              <div key={idx} className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="font-medium text-cyan-800">{cat.category}</p>
                <p className="text-sm text-slate-600">{cat.connectors.join(", ")}</p>
                <p className="text-slate-700 italic text-sm mt-2">{cat.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* NuanceBlock - Argument Architecture patterns */}
        <NuanceBlock title="Argument Architecture" highlight="Structure creates flow">
          {/* Vertical stack of 4 argument structure patterns */}
          <div className="space-y-4">
            {data.argumentStructures.structures.map((s, idx) => (
              <div key={idx} className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="font-medium text-teal-800">{s.pattern}</p>
                <p className="text-sm text-slate-600">{s.example}</p>
                <p className="text-xs text-slate-500">Effect: {s.effect}</p>
              </div>
            ))}
          </div>
        </NuanceBlock>

        {/* Connector Progression Section - Weak/Strong/Expert comparisons */}
        <SectionCard id="weak-strong-expert" title="Connector Progression" icon={FaCodeBranch} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-cyan-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Flow Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={3} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C2/module4" recapItems={["Dès lors / partant for consequence", "Il n'en demeure pas moins for concession", "Qui plus est / de surcroît for addition", "En l'occurrence for exemplification", "Temporal structuring vs enumeration", "Nested concessions for nuance"]} />
        )}
      </div>
    </div>
  );
}
