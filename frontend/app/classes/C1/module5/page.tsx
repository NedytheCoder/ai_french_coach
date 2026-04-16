/**
 * C1 Module 5 - Stylistic Refinement
 * =====================================
 *
 * This page teaches C1-level French learners to transform adequate prose into
 * elegant, native-like French. Students learn to eliminate redundancy, improve
 * rhythm, and master sophisticated phrasing techniques.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 4
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Stylistic Elegance Section - Introduction via introSections
 * 5. Redundancy Section - Pleonasm elimination table
 * 6. NuanceCard - The Art of Economy (two-column grid)
 * 7. Rhythm Patterns Section - Rhythmic devices display
 * 8. Style Elevation Section - Before/after comparisons
 * 9. Transformations Section - Elegant transformation examples
 * 10. PracticeSection - Interactive quiz (15 questions)
 * 11. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: Two-column comparison (fillers vs replacements)
 * - WeakVsStrongCard: Shows before/after stylistic examples
 * - TransformationCard: Demonstrates prose refinement
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Rose/pink gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Data table for redundancy patterns
 * - Two-column grid for elegant replacements
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
  FaFeather,        // Stylistic Elegance and Transformations sections
  FaCut,            // Redundancy section
  FaWaveSquare,     // Rhythm Patterns section
  FaPalette,        // Style Elevation section
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
 * Module5Page - Main component for C1 Module 5.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with rose/pink theme
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
    const saved = localStorage.getItem("c1Module5Progress");
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
      localStorage.setItem("c1Module5Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
        <ModuleNav backPath="/classes/C1/module4" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={5} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Stylistic Elegance - Introduction to style refinement */}
        <SectionCard id="intro" title="Stylistic Elegance" icon={FaFeather} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Redundancy Section - Pleonasm elimination data table */}
        <SectionCard id="redundancy" title="Eliminating Redundancy" icon={FaCut} isReviewed={reviewedSections.includes("redundancy")} onMarkReviewed={handleMarkReviewed}>
          <div className="overflow-x-auto">
            {/* Data table showing redundant vs refined expressions */}
            <table className="w-full text-sm">
              <thead className="bg-rose-100"><tr><th className="p-3 text-left text-rose-800">Redundant</th><th className="p-3 text-left text-rose-800">Refined</th><th className="p-3 text-left text-rose-800">Why</th></tr></thead>
              <tbody className="divide-y divide-rose-100">
                {data.redundancySection.patterns.map((p, idx) => (
                  <tr key={idx}>
                    <td className="p-3 text-rose-700 line-through">{p.redundant}</td>
                    <td className="p-3 font-medium text-emerald-700">{p.refined}</td>
                    <td className="p-3 text-slate-600">{p.saving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Nuance Card - The Art of Economy (two-column comparison grid) */}
        <NuanceCard title="The Art of Economy" highlight="Say more with less">
          <div className="space-y-4">
            <p className="text-slate-700">French elegance values concision. Eliminate:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Left column - Fillers to eliminate */}
              <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                <p className="font-medium text-rose-800 mb-2">Fillers to cut</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• "le fait que" → nominalize directly</li>
                  <li>• "il est important de noter que" → delete</li>
                  <li>• "en ce qui concerne" → use preposition</li>
                  <li>• "par rapport à" → replace with "sur"</li>
                </ul>
              </div>
              {/* Right column - Elegant replacements */}
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="font-medium text-emerald-800 mb-2">Elegant replacements</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• "s'impose" for "il faut"</li>
                  <li>• "mérite" for "il est bon"</li>
                  <li>• "pâtissent" for "souffrent"</li>
                  <li>• "conjoncture" for "situation"</li>
                </ul>
              </div>
            </div>
          </div>
        </NuanceCard>

        {/* Rhythm Patterns Section - Rhythmic devices display */}
        <SectionCard id="rhythm" title="Rhythmic Patterns" icon={FaWaveSquare} isReviewed={reviewedSections.includes("rhythm")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-4">
            {data.rhythmPatterns.patterns.map((p, idx) => (
              <div key={idx} className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                <p className="font-medium text-rose-800">{p.pattern}</p>
                <p className="text-slate-700 italic">{p.example}</p>
                <p className="text-sm text-slate-500">{p.effect}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Style Elevation Section - Before/after stylistic comparisons */}
        <SectionCard id="weak-vs-strong" title="Style Elevation" icon={FaPalette} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Transformations Section - Elegant prose refinement examples */}
        <SectionCard id="transformations" title="Elegant Transformations" icon={FaFeather} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-rose-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Style Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={5} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module6" recapItems={["Eliminate redundancy in directional verbs", "Cut fillers like 'le fait que'", "Use litotes for elegant understatement", "Master rhythmic patterns: triads, anaphora", "Employ fixed phrases like 'il y a lieu de'", "Replace 'tout le monde' with 'nul ne'"]} />
        )}
      </div>
    </div>
  );
}
