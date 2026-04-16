/**
 * C1 Module 12 - Final Integration Challenge
 * ==========================================
 *
 * This page presents the capstone challenge for C1-level French learners.
 * Students demonstrate comprehensive mastery by integrating precision, nuance,
 * style, and analysis in complex, real-world tasks.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 11
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Integration Challenge Section - Introduction via introSections
 * 5. NuanceCard - C1 Mastery Pillars (three-column grid)
 * 6. Integrated Skills Section - Skills data table
 * 7. Mastery Examples Section - Before/after comparisons
 * 8. Integrated Transformations Section - Transformation examples
 * 9. PracticeSection - Final interactive quiz (15 questions)
 * 10. CompletionCard - Course completion with full recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: Three-column mastery pillars (Precision, Nuance, Structure)
 * - WeakVsStrongCard: Integrated C1 examples
 * - TransformationCard: Sophisticated transformations
 * - PracticeSection: Final assessment
 *
 * **Features:**
 * - Amber/yellow gradient background theme (celebratory)
 * - localStorage persistence for progress
 * - 15-question final challenge quiz
 * - Three-column grid for mastery pillars
 * - Data table for integrated skills
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
  FaTrophy,         // Integration Challenge section
  FaPuzzlePiece,    // Integrated Skills section
  FaLayerGroup,     // Nuance pillar icon
  FaGlobe,          // Integrated Transformations section
  FaQuestionCircle, // Practice section header
  FaStar,           // Mastery Examples section + Precision pillar
} from "react-icons/fa";

// Shared C1 components
import { ModuleHeader, ProgressBar, PracticeSection, CompletionCard, ModuleNav, SectionCard, NuanceCard, WeakVsStrongCard, TransformationCard } from "../components";

// Module data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Module12Page - Main component for C1 Module 12 (Final Integration Challenge).
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with amber/yellow theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module12Page() {
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
    const saved = localStorage.getItem("c1Module12Progress");
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
      localStorage.setItem("c1Module12Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center"><div className="text-amber-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C1/module11" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={12} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Integration Challenge - Introduction to synthesis of mastery */}
        <SectionCard id="intro" title="Integration Challenge" icon={FaTrophy} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Nuance Card - C1 Mastery Pillars (three-column grid) */}
        <NuanceCard title="C1 Mastery Pillars" highlight="All skills working together">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Precision pillar */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-center">
              <FaStar className="text-amber-500 mx-auto mb-2" />
              <p className="font-medium text-amber-800">Precision</p>
              <p className="text-xs text-slate-600">Exact vocabulary, nominalization</p>
            </div>
            {/* Nuance pillar */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
              <FaLayerGroup className="text-yellow-600 mx-auto mb-2" />
              <p className="font-medium text-yellow-800">Nuance</p>
              <p className="text-xs text-slate-600">Register, hedging, tone</p>
            </div>
            {/* Structure pillar */}
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-center">
              <FaPuzzlePiece className="text-orange-500 mx-auto mb-2" />
              <p className="font-medium text-orange-800">Structure</p>
              <p className="text-xs text-slate-600">Complex syntax, cohesion</p>
            </div>
          </div>
        </NuanceCard>

        {/* Integrated Skills Section - Skills data table */}
        <SectionCard id="skills-integration" title="Integrated Skills" icon={FaPuzzlePiece} isReviewed={reviewedSections.includes("skills-integration")} onMarkReviewed={handleMarkReviewed}>
          <div className="overflow-x-auto">
            {/* Data table showing skill pairs, challenges, and demonstrations */}
            <table className="w-full text-sm">
              <thead className="bg-amber-100"><tr><th className="p-3 text-left text-amber-800">Skill Pair</th><th className="p-3 text-left text-amber-800">Challenge</th><th className="p-3 text-left text-amber-800">Demonstration</th></tr></thead>
              <tbody className="divide-y divide-amber-100">
                {data.integrationSkills.skills.map((s, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{s.skill}</td>
                    <td className="p-3 text-slate-600">{s.challenge}</td>
                    <td className="p-3 text-amber-700 italic">{s.demonstration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Mastery Examples Section - Before/after comparisons */}
        <SectionCard id="weak-vs-strong" title="Mastery Examples" icon={FaStar} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Integrated Transformations Section - Transformation examples */}
        <SectionCard id="transformations" title="Integrated Transformations" icon={FaGlobe} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
        </SectionCard>

        {/* Practice Section - Final 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Final Challenge</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when final practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={12} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes" recapItems={["Precision + Register control", "Argumentation + Persuasion", "Analysis + Nuance", "Structure + Cohesion", "Idioms + Fluency", "Comprehensive C1 Mastery"]} />
        )}
      </div>
    </div>
  );
}
