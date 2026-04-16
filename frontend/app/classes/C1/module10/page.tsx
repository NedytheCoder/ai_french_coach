/**
 * C1 Module 10 - Writing Mastery
 * ================================
 *
 * This page teaches C1-level French learners to construct paragraphs with logical
 * progression, cohesive flow, and elegant structure. Students learn the architecture
 * of sophisticated prose at the paragraph and text level.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 9
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Writing Architecture Section - Introduction via introSections
 * 5. Paragraph Structure Section - Component breakdown cards
 * 6. NuanceCard - Cohesion Devices (two-column grid)
 * 7. Paragraph Elevation Section - Before/after comparisons
 * 8. Writing Transformations Section - Transformation examples
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: Cohesion devices grid
 * - WeakVsStrongCard: Simple vs elegant paragraph comparisons
 * - TransformationCard: Writing transformation examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Orange/amber gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Paragraph component cards
 * - Two-column grid for cohesion devices
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
  FaEdit,         // Writing Architecture section
  FaAlignLeft,    // Paragraph Structure section
  FaStream,       // Paragraph Elevation section
  FaLink,         // Writing Transformations section
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
 * Module10Page - Main component for C1 Module 10.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with orange/amber theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module10Page() {
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
    const saved = localStorage.getItem("c1Module10Progress");
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
      localStorage.setItem("c1Module10Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
        <ModuleNav backPath="/classes/C1/module9" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={10} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Writing Architecture - Introduction to paragraph mastery */}
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

        {/* Paragraph Structure Section - Component breakdown cards */}
        <SectionCard id="paragraph" title="Paragraph Structure" icon={FaAlignLeft} isReviewed={reviewedSections.includes("paragraph")} onMarkReviewed={handleMarkReviewed}>
          {/* Vertical stack of paragraph component cards */}
          <div className="space-y-4">
            {data.paragraphStructure.components.map((c, idx) => (
              <div key={idx} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-800">{c.element}</p>
                <p className="text-sm text-slate-600">{c.function}</p>
                <p className="text-slate-700 italic">{c.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Nuance Card - Cohesion Devices (two-column grid) */}
        <NuanceCard title="Cohesion Devices" highlight="Linking elements create flow">
          {/* Two-column grid for cohesion devices */}
          <div className="grid md:grid-cols-2 gap-4">
            {data.cohesionDevices.devices.map((d, idx) => (
              <div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800">{d.device}</p>
                <p className="text-sm text-slate-700">{d.example}</p>
                <p className="text-xs text-slate-500">{d.effect}</p>
              </div>
            ))}
          </div>
        </NuanceCard>

        {/* Paragraph Elevation Section - Before/after comparisons */}
        <SectionCard id="weak-vs-strong" title="Paragraph Elevation" icon={FaStream} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Writing Transformations Section - Transformation examples */}
        <SectionCard id="transformations" title="Writing Transformations" icon={FaLink} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
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
          <CompletionCard moduleNumber={10} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module11" recapItems={["Topic sentence with nominalization", "Development with evidence/analysis", "Concluding synthesis or transition", "Lexical chains for cohesion", "Demonstratives for reference", "Elegant openings and conclusions"]} />
        )}
      </div>
    </div>
  );
}
