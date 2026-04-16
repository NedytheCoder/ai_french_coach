/**
 * C2 Module 5 - Interpretation & Implicit Meaning
 * ==================================================
 *
 * This page teaches C2-level French learners to master reading between the lines,
 * detecting tone, and interpreting implicit meaning. Students develop analytical
 * sensitivity through tone markers (ironic, hedged, dismissive, passive-aggressive,
 * euphemistic) and subtext analysis frameworks.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C2 Module 4
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Analytical Reading Section - Introduction via introSections
 * 5. Tone Detection Section - Vertical stack of 5 tone categories
 * 6. NuanceBlock - Subtext Analysis with 4 analytical questions
 * 7. Interpretation Progression Section - Weak/Strong/Expert comparisons
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceBlock: Subtext analysis framework display
 * - WeakStrongExpertCard: 3-tier interpretation progression examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Teal/cyan gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Vertical stack for tone detection markers
 * - Vertical stack for subtext analysis questions
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
  FaBookOpen,       // Analytical Reading section
  FaTheaterMasks,   // Tone Detection section
  FaSearch,         // Interpretation Progression section
  FaComments,       // (unused but imported)
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
 * Module5Page - Main component for C2 Module 5.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C2 components with teal/cyan theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module5Page() {
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
    const saved = localStorage.getItem("c2Module5Progress");
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
      localStorage.setItem("c2Module5Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center"><div className="text-teal-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C2/module4" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={5} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Analytical Reading - Introduction to interpretation mastery */}
        <SectionCard id="intro" title="Analytical Reading" icon={FaBookOpen} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Tone Detection Section - Vertical stack of 5 tone categories */}
        <SectionCard id="tone" title="Tone Detection" icon={FaTheaterMasks} isReviewed={reviewedSections.includes("tone")} onMarkReviewed={handleMarkReviewed}>
          {/* Vertical stack for tone markers (Ironic, Hedged, Dismissive, Passive-aggressive, Euphemistic) */}
          <div className="space-y-4">
            {data.toneMarkers.tones.map((t, idx) => (
              <div key={idx} className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="font-medium text-teal-800">{t.tone}</p>
                <p className="text-sm text-slate-600">{t.markers.join(", ")}</p>
                <p className="text-slate-700 italic">{t.example}</p>
                <p className="text-sm text-slate-500">{t.analysis}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* NuanceBlock - Subtext Analysis with 4 analytical questions */}
        <NuanceBlock title="Subtext Analysis" highlight="Reading between the lines">
          {/* Vertical stack of 4 subtext analysis questions */}
          <div className="space-y-4">
            {data.subtextPatterns.questions.map((q, idx) => (
              <div key={idx} className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="font-medium text-cyan-800">{q.question}</p>
                <p className="text-sm text-slate-600">{q.purpose}</p>
                <p className="text-sm text-slate-500 italic">Example: {q.example}</p>
              </div>
            ))}
          </div>
        </NuanceBlock>

        {/* Interpretation Progression Section - Weak/Strong/Expert comparisons */}
        <SectionCard id="weak-strong-expert" title="Interpretation Progression" icon={FaSearch} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-teal-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Analysis Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={5} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C2/module6" recapItems={["Tone markers: 'bien sûr', 'semblerait'", "Irony detection through overstatement", "Hedging and distance markers", "Euphemism recognition", "Presupposition analysis", "Metaphor and framing analysis"]} />
        )}
      </div>
    </div>
  );
}
