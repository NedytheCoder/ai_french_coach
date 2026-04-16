/**
 * C1 Module 7 - Text Analysis & Interpretation
 * ================================================
 *
 * This page teaches C1-level French learners to read beneath the surface
 * and interpret implicit meaning with analytical precision. Students learn
 * to identify tone, decode intent, and analyze rhetorical strategies.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 6
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Analytical Reading Section - Introduction via introSections
 * 5. Tone Markers Section - Tone identification examples
 * 6. NuanceCard - Reading Between Lines (two-column grid)
 * 7. Surface vs Analytical Section - Before/after comparisons
 * 8. Analytical Elevation Section - Transformation examples
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: Two-column comparison (what to look for vs questions to ask)
 * - WeakVsStrongCard: Shows before/after analytical examples
 * - TransformationCard: Demonstrates analytical transformations
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Teal/cyan gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for subtext analysis
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
  FaTheaterMasks,   // Tone Markers section
  FaSearch,         // Surface vs Analytical section
  FaComments,       // Analytical Elevation section
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
 * Module7Page - Main component for C1 Module 7.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with teal/cyan theme
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
    const saved = localStorage.getItem("c1Module7Progress");
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
      localStorage.setItem("c1Module7Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
        <ModuleNav backPath="/classes/C1/module6" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={7} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Analytical Reading - Introduction to text analysis */}
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

        {/* Tone Markers Section - Tone identification examples */}
        <SectionCard id="tone-identification" title="Tone Markers" icon={FaTheaterMasks} isReviewed={reviewedSections.includes("tone-identification")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-4">
            {data.toneMarkers.tones.map((t, idx) => (
              <div key={idx} className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="font-medium text-teal-800">{t.tone}</p>
                <p className="text-sm text-slate-600 mb-2">{t.markers.join(", ")}</p>
                <p className="text-slate-700 italic">{t.example}</p>
                <p className="text-sm text-slate-500">{t.analysis}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Nuance Card - Reading Between Lines (two-column subtext analysis grid) */}
        <NuanceCard title="Reading Between Lines" highlight="Subtext is where meaning resides">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left column - What to look for */}
            <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
              <p className="font-medium text-teal-800 mb-2">What to look for</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Scare quotes around loaded terms</li>
                <li>• Overstatement suggesting irony</li>
                <li>• Strategic silences (what's missing)</li>
                <li>• Metaphors that frame thinking</li>
              </ul>
            </div>
            {/* Right column - Questions to ask */}
            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <p className="font-medium text-cyan-800 mb-2">Questions to ask</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Who benefits from this framing?</li>
                <li>• What's presupposed?</li>
                <li>• What emotions are triggered?</li>
                <li>• What remains unsaid?</li>
              </ul>
            </div>
          </div>
        </NuanceCard>

        {/* Surface vs Analytical Section - Before/after analytical comparisons */}
        <SectionCard id="weak-vs-strong" title="Surface vs Analytical" icon={FaSearch} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Analytical Elevation Section - Analytical transformation examples */}
        <SectionCard id="transformations" title="Analytical Elevation" icon={FaComments} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
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
          <CompletionCard moduleNumber={7} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module8" recapItems={["Tone markers: bien sûr, semblerait", "Ironic understatement techniques", "Euphemism identification", "Presupposition analysis", "Metaphor and framing analysis", "Subtext as strategic silence"]} />
        )}
      </div>
    </div>
  );
}
