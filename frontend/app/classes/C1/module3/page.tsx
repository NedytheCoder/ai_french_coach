/**
 * C1 Module 3 - Advanced Connectors & Flow
 * =========================================
 *
 * This page teaches C1-level French learners to master sophisticated connectors
 * and create seamless discourse flow. Students learn advanced alternatives to
 * basic connectors and discourse structuring techniques.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 2
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Connector Architecture Section - Introduction via introSections
 * 5. Sophisticated Markers Section - Connector toolkit data table
 * 6. NuanceCard - Discourse Flow Principles (consequence/concession chains)
 * 7. Discourse Structure Section - Text organization markers
 * 8. Weak vs Strong Section - Connector elevation examples
 * 9. Transformations Section - Sophisticated transformations
 * 10. PracticeSection - Interactive quiz (15 questions)
 * 11. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: Two-column comparison of connector chains
 * - WeakVsStrongCard: Shows before/after connector examples
 * - TransformationCard: Demonstrates connector transformations
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Cyan/teal gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Data table for sophisticated connectors
 * - Two-column grid for consequence/concession chains
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
  FaStream,         // Sophisticated markers and transformations sections
  FaNetworkWired,   // Connector Architecture section
  FaExchangeAlt,    // Weak vs Strong section
  FaAlignLeft,      // Discourse Structure section
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
 * Module3Page - Main component for C1 Module 3.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with cyan/teal theme
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
    const saved = localStorage.getItem("c1Module3Progress");
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
      localStorage.setItem("c1Module3Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
        <ModuleNav backPath="/classes/C1/module2" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={3} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Connector Architecture - Introduction to advanced connectors */}
        <SectionCard id="intro" title="Connector Architecture" icon={FaNetworkWired} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Sophisticated Markers Section - Connector toolkit data table */}
        <SectionCard id="sophisticated-markers" title="Sophisticated Connector Toolkit" icon={FaStream} isReviewed={reviewedSections.includes("sophisticated-markers")} onMarkReviewed={handleMarkReviewed}>
          <div className="overflow-x-auto">
            {/* Data table showing connector categories with basic and advanced alternatives */}
            <table className="w-full text-sm">
              <thead className="bg-cyan-100"><tr><th className="p-3 text-left text-cyan-800">Category</th><th className="p-3 text-left text-cyan-800">Basic</th><th className="p-3 text-left text-cyan-800">Advanced</th></tr></thead>
              <tbody className="divide-y divide-cyan-100">
                {data.sophisticatedConnectors.categories.map((cat, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{cat.category}</td>
                    <td className="p-3 text-slate-500">{cat.basic}</td>
                    <td className="p-3 text-cyan-700">{cat.advanced.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Nuance Card - Discourse Flow Principles (consequence/concession chains) */}
        <NuanceCard title="Discourse Flow Principles" highlight="Connectors are the joints of your argument">
          <div className="space-y-4">
            <p className="text-slate-700">Sophisticated connectors don't just link—they signal logical relationships:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Left column - Consequence chain */}
              <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="font-medium text-cyan-800 mb-2">Consequence chain</p>
                <p className="text-sm text-slate-700">par conséquent → dès lors → partant</p>
                <p className="text-xs text-slate-500">Increasing formality</p>
              </div>
              {/* Right column - Concession chain */}
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="font-medium text-teal-800 mb-2">Concession chain</p>
                <p className="text-sm text-slate-700">cependant → néanmoins → il n'en demeure pas moins</p>
                <p className="text-xs text-slate-500">Increasing sophistication</p>
              </div>
            </div>
          </div>
        </NuanceCard>

        {/* Discourse Structure Section - Text organization markers */}
        <SectionCard id="discourse-structure" title="Discourse Structuring" icon={FaAlignLeft} isReviewed={reviewedSections.includes("discourse-structure")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-4">
            {data.discourseStructure.sections.map((section, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-medium text-slate-800">{section.type}</p>
                <p className="text-sm text-slate-600 mb-2">{section.markers.join(" • ")}</p>
                <p className="text-slate-700 italic">{section.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Weak vs Strong Section - Connector elevation examples */}
        <SectionCard id="weak-vs-strong" title="Connector Elevation" icon={FaExchangeAlt} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Transformations Section - Sophisticated connector transformations */}
        <SectionCard id="transformations" title="Sophisticated Transformations" icon={FaStream} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-cyan-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Connector Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={3} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module4" recapItems={["Dès lors / partant for formal consequence", "Il n'en demeure pas moins for elegant concession", "De surcroît / qui plus est for sophisticated addition", "En l'occurrence for precise exemplification", "Temporal structuring: dans un premier temps...", "Metadiscourse for text architecture control"]} />
        )}
      </div>
    </div>
  );
}
