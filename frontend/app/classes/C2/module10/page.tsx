/**
 * C2 Module 10 - Final Mastery Simulation
 * =========================================
 *
 * This is the final C2 module page, representing the culmination of all C2
 * learning. Students demonstrate comprehensive mastery by integrating all skills
 * in complex, demanding tasks that simulate real-world near-native challenges.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C2 Module 9
 * 2. ModuleHeader - Final module title and subtitle
 * 3. ProgressBar - Final module completion progress
 * 4. Final Challenge Section - Introduction to synthesis of mastery
 * 5. NuanceBlock - C2 Mastery Pillars (three-column grid: Precision, Nuance, Structure)
 * 6. Integrated Skills Section - Table of 5 skill pair challenges
 * 7. Mastery Examples Section - Weak/Strong/Expert final demonstrations
 * 8. PracticeSection - Final 15-question integrated assessment
 * 9. CompletionCard - C2 completion celebration with recap of all competencies
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceBlock: C2 Mastery Pillars display (three-column grid)
 * - WeakStrongExpertCard: Final mastery progression examples
 * - PracticeSection: Final integrated assessment
 *
 * **Features:**
 * - Slate/gray gradient background theme (sophisticated, final module aesthetic)
 * - localStorage persistence for final module progress
 * - 15-question final assessment (all transformation type)
 * - Three-column grid for C2 Mastery Pillars (Precision, Nuance, Structure)
 * - Table display for 5 integrated skill challenges
 * - Completion leads to celebration with "Near-Native Mastery Achieved"
 * - All lesson data imported via data namespace
 *
 * **C2 Completion Journey:**
 * This module completes the C2 French learning path:
 * - Modules 1-6: Individual skill mastery (Precision, Register, Discourse,
 *   Rhetoric, Interpretation, Complex Syntax)
 * - Modules 7-9: Applied mastery (Idioms, Critique, Writing)
 * - Module 10: Integrated mastery demonstration
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import React, { useState, useEffect, useMemo } from "react";

// React Icons for UI elements
import {
  FaTrophy,         // Final Challenge section (achievement symbol)
  FaPuzzlePiece,    // Integrated Skills section
  FaLayerGroup,     // C2 Mastery Pillars - Nuance
  FaCrown,          // Mastery Examples section
  FaQuestionCircle, // Final Challenge quiz header
  FaStar,           // C2 Mastery Pillars - Precision
} from "react-icons/fa";

// Shared C2 components
import { ModuleHeader, ProgressBar, PracticeSection, CompletionCard, ModuleNav, SectionCard, NuanceBlock, WeakStrongExpertCard } from "../components";

// Module data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Module10Page - Main component for C2 Module 10 (Final Mastery Simulation).
 *
 * This is the culminating module of the C2 French learning path. It tests
 * complete command of C2 French through integrated challenges requiring
 * simultaneous deployment of precision, register control, rhetorical sophistication,
 * analytical depth, and stylistic elegance.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C2 components with slate/gray theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The final module page
 */
export default function Module10Page() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  // List of reviewed section IDs
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  // Score achieved in final practice quiz
  const [practiceScore, setPracticeScore] = useState(0);
  // Whether final practice quiz is completed
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  // Hydration flag to prevent SSR/localStorage mismatch
  const [isClient, setIsClient] = useState(false);

  // ---------------------------------------------------------------------------
  // EFFECT: Load Progress from localStorage
  // ---------------------------------------------------------------------------
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("c2Module10Progress");
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
      localStorage.setItem("c2Module10Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
   * handlePracticeComplete - Updates practice score and marks final assessment as completed.
   * @param score - Final score achieved (0-15)
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center"><div className="text-slate-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C2/module9" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={10} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - Final C2 Module */}
        {/* Final Challenge - Introduction to synthesis of mastery */}
        <SectionCard id="intro" title="Final Challenge" icon={FaTrophy} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* NuanceBlock - C2 Mastery Pillars (three-column grid) */}
        <NuanceBlock title="C2 Mastery Pillars" highlight="All skills working together">
          {/* Three-column grid for C2 Mastery Pillars: Precision, Nuance, Structure */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 text-center">
              <FaStar className="text-slate-600 mx-auto mb-2" />
              <p className="font-medium text-slate-800">Precision</p>
              <p className="text-xs text-slate-600">Exact vocabulary, lexical distinctions</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 text-center">
              <FaLayerGroup className="text-slate-600 mx-auto mb-2" />
              <p className="font-medium text-slate-800">Nuance</p>
              <p className="text-xs text-slate-600">Register, hedging, tone control</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg border border-slate-200 text-center">
              <FaPuzzlePiece className="text-slate-600 mx-auto mb-2" />
              <p className="font-medium text-slate-800">Structure</p>
              <p className="text-xs text-slate-600">Complex syntax, rhetorical flow</p>
            </div>
          </div>
        </NuanceBlock>

        {/* Integrated Skills Section - Table of 5 skill pair challenges */}
        <SectionCard id="integration" title="Integrated Skills" icon={FaPuzzlePiece} isReviewed={reviewedSections.includes("integration")} onMarkReviewed={handleMarkReviewed}>
          {/* Table displaying 5 integrated skill challenges */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* Table header: Skill Pair | Challenge | Demonstration */}
              <thead className="bg-slate-100"><tr><th className="p-3 text-left text-slate-800">Skill Pair</th><th className="p-3 text-left text-slate-800">Challenge</th><th className="p-3 text-left text-slate-800">Demonstration</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {data.integrationChallenge.challenges.map((c, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{c.skill}</td>
                    <td className="p-3 text-slate-600">{c.task}</td>
                    <td className="p-3 text-slate-700 italic">{c.demonstration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Mastery Examples Section - Weak/Strong/Expert final demonstrations */}
        <SectionCard id="weak-strong-expert" title="Mastery Examples" icon={FaCrown} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
        </SectionCard>

        {/* Practice Section - Final 15-Question Integrated Assessment */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Final Challenge</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - C2 Final Completion Celebration */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={10} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes" recapItems={["Precision + Register control", "Argumentation + Persuasion", "Analysis + Nuance", "Structure + Cohesion", "Idioms + Fluency", "Near-Native Mastery Achieved"]} />
        )}
      </div>
    </div>
  );
}
