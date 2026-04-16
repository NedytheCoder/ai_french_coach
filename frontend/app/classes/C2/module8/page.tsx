/**
 * C2 Module 8 - Text Analysis & Critique
 * ========================================
 *
 * This page teaches C2-level French learners to master evaluating arguments,
 * identifying weaknesses, and writing sophisticated critiques. Students develop
 * analytical and critical skills at the near-native level.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C2 Module 7
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Critical Analysis Section - Introduction via introSections
 * 5. Evaluation Criteria Section - Vertical stack of 5 criteria with red flags
 * 6. NuanceBlock - Strengthening Arguments (two-column grid of 4 techniques)
 * 7. Critique Progression Section - Weak/Strong/Expert comparisons
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceBlock: Strengthening techniques display
 * - WeakStrongExpertCard: 3-tier critique progression examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Rose/pink gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Vertical stack for evaluation criteria with warning icons
 * - Two-column grid for strengthening techniques
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
  FaGavel,          // Critical Analysis section
  FaSearch,         // Evaluation Criteria section
  FaBalanceScale,   // Critique Progression section
  FaPencilAlt,      // (unused but imported)
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
 * Module8Page - Main component for C2 Module 8.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C2 components with rose/pink theme
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
    const saved = localStorage.getItem("c2Module8Progress");
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
      localStorage.setItem("c2Module8Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center"><div className="text-rose-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C2/module7" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={8} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Critical Analysis - Introduction to critique mastery */}
        <SectionCard id="intro" title="Critical Analysis" icon={FaGavel} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Evaluation Criteria Section - Vertical stack of 5 criteria with red flags */}
        <SectionCard id="evaluation" title="Evaluation Criteria" icon={FaSearch} isReviewed={reviewedSections.includes("evaluation")} onMarkReviewed={handleMarkReviewed}>
          {/* Vertical stack for 5 evaluation criteria (logical validity, evidence quality, etc.) */}
          <div className="space-y-4">
            {data.evaluationCriteria.criteria.map((c, idx) => (
              <div key={idx} className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                <p className="font-medium text-rose-800">{c.criterion}</p>
                <p className="text-sm text-slate-600">{c.question}</p>
                <p className="text-sm text-rose-600">⚠️ {c.redFlag}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* NuanceBlock - Strengthening Arguments (two-column grid of 4 techniques) */}
        <NuanceBlock title="Strengthening Arguments" highlight="Making good arguments better">
          {/* Two-column grid for 4 strengthening techniques */}
          <div className="grid md:grid-cols-2 gap-4">
            {data.strengtheningTechniques.techniques.map((t, idx) => (
              <div key={idx} className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="font-medium text-pink-800">{t.technique}</p>
                <p className="text-slate-700 italic text-sm">{t.example}</p>
                <p className="text-xs text-slate-500 mt-1">{t.effect}</p>
              </div>
            ))}
          </div>
        </NuanceBlock>

        {/* Critique Progression Section - Weak/Strong/Expert comparisons */}
        <SectionCard id="weak-strong-expert" title="Critique Progression" icon={FaBalanceScale} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-rose-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Critique Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={8} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C2/module9" recapItems={["Logical validity assessment", "Evidence quality evaluation", "Rhetorical fairness analysis", "Identifying logical fallacies", "Concession and reply technique", "Scope limitation acknowledgment"]} />
        )}
      </div>
    </div>
  );
}
