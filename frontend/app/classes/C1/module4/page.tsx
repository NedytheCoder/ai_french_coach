/**
 * C1 Module 4 - Complex Sentence Mastery
 * =========================================
 *
 * This page teaches C1-level French learners to construct sophisticated,
 * layered sentences with complex syntax. Students learn subordination patterns,
 * cleft constructions, and participial phrases.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 3
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Syntactic Architecture Section - Introduction via introSections
 * 5. Subordination Patterns Section - Advanced subordination examples
 * 6. NuanceCard - Sentence Layering (three-column grid)
 * 7. Weak vs Strong Section - Simple vs complex comparisons
 * 8. Transformations Section - Complex sentence transformations
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: Three-column sentence layering visualization
 * - WeakVsStrongCard: Shows before/after sentence examples
 * - TransformationCard: Demonstrates complex transformations
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Purple/violet gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Three-column grid for sentence layers
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
  FaProjectDiagram, // Syntactic Architecture section
  FaSitemap,        // Subordination Patterns section
  FaCodeBranch,     // Transformations section
  FaParagraph,      // Weak vs Strong section
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
 * Module4Page - Main component for C1 Module 4.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with purple/violet theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module4Page() {
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
    const saved = localStorage.getItem("c1Module4Progress");
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
      localStorage.setItem("c1Module4Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 flex items-center justify-center"><div className="text-purple-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C1/module3" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={4} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Syntactic Architecture - Introduction to complex sentences */}
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

        {/* Subordination Patterns Section - Advanced subordination examples */}
        <SectionCard id="subordination" title="Subordination Patterns" icon={FaSitemap} isReviewed={reviewedSections.includes("subordination")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-4">
            {data.subordinationPatterns.patterns.map((p, idx) => (
              <div key={idx} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="font-medium text-purple-800">{p.pattern}</p>
                <p className="text-sm text-slate-500 mb-2">{p.structure}</p>
                <p className="text-slate-700 italic mb-2">{p.example}</p>
                <p className="text-sm text-slate-600">{p.analysis}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Nuance Card - Sentence Layering (three-column grid) */}
        <NuanceCard title="Sentence Layering" highlight="Complex sentences have foreground and background">
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Column 1 - Main clause (foreground) */}
              <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                <p className="font-medium text-violet-800 mb-2">Main clause</p>
                <p className="text-sm text-slate-700">Foreground information</p>
                <p className="text-xs text-slate-500">The core assertion</p>
              </div>
              {/* Column 2 - Subordinate (background) */}
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="font-medium text-purple-800 mb-2">Subordinate</p>
                <p className="text-sm text-slate-700">Background details</p>
                <p className="text-xs text-slate-500">Temporal, causal, relative</p>
              </div>
              {/* Column 3 - Participial (texture) */}
              <div className="p-4 bg-fuchsia-50 rounded-lg border border-fuchsia-200">
                <p className="font-medium text-fuchsia-800 mb-2">Participial</p>
                <p className="text-sm text-slate-700">Textural nuance</p>
                <p className="text-xs text-slate-500">Manner, simultaneity</p>
              </div>
            </div>
          </div>
        </NuanceCard>

        {/* Weak vs Strong Section - Simple vs complex comparisons */}
        <SectionCard id="weak-vs-strong" title="Simple vs Complex" icon={FaParagraph} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Transformations Section - Complex sentence transformations */}
        <SectionCard id="transformations" title="Complex Transformations" icon={FaCodeBranch} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Syntax Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={4} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module5" recapItems={["Subordination for information layering", "Relative clause stacking", "Participial phrases for elegance", "Cleft constructions for emphasis", "Nominalization for formality", "Concessive and conditional complexity"]} />
        )}
      </div>
    </div>
  );
}
