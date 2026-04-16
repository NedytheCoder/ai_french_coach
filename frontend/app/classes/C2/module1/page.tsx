/**
 * C2 Module 1 - Precision & Subtle Meaning
 * =========================================
 *
 * This page teaches C2-level French learners to master fine lexical distinctions
 * and develop near-native precision. Students progress through three levels of
 * expression: Weak (C1) → Strong (C2 entry) → Expert (Near-native).
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to classes overview
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Precision Mastery Section - Introduction via introSections
 * 5. Fine Lexical Distinctions Section - Data table of word pairs
 * 6. NuanceBlock - Progression to Expert (3-tier explanation)
 * 7. Progression Examples Section - Weak/Strong/Expert comparisons
 * 8. Transformation Practice Section - 3-tier transformation examples
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceBlock: 3-tier progression explanation (Weak → Strong → Expert)
 * - WeakStrongExpertCard: 3-tier before/after/expert comparisons
 * - TransformationCard: 3-tier transformation examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Slate/gray gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Data table for lexical distinctions
 * - 3-tier progression visualization
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
  FaBullseye,       // Precision Mastery section
  FaBalanceScale,   // Fine Lexical Distinctions section
  FaExchangeAlt,    // Transformation Practice section
  FaSearch,         // (unused but imported)
  FaQuestionCircle, // Practice section header
  FaGem,            // Progression Examples section
} from "react-icons/fa";

// Shared C2 components (NuanceBlock, WeakStrongExpertCard are C2-specific)
import { ModuleHeader, ProgressBar, PracticeSection, CompletionCard, ModuleNav, SectionCard, NuanceBlock, WeakStrongExpertCard, TransformationCard } from "../components";

// Module data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Module1Page - Main component for C2 Module 1.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C2 components with slate/gray theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module1Page() {
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
    const saved = localStorage.getItem("c2Module1Progress");
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
      localStorage.setItem("c2Module1Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center"><div className="text-slate-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={1} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Precision Mastery - Introduction to C2 precision */}
        <SectionCard id="intro" title="Precision Mastery" icon={FaBullseye} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Fine Lexical Distinctions Section - Data table of word pairs */}
        <SectionCard id="fine-distinctions" title="Fine Lexical Distinctions" icon={FaBalanceScale} isReviewed={reviewedSections.includes("fine-distinctions")} onMarkReviewed={handleMarkReviewed}>
          <div className="overflow-x-auto">
            {/* Data table comparing word pairs with nuances */}
            <table className="w-full text-sm">
              <thead className="bg-slate-100"><tr><th className="p-3 text-left text-slate-800">Word 1</th><th className="p-3 text-left text-slate-800">Nuance</th><th className="p-3 text-left text-slate-800">Word 2</th><th className="p-3 text-left text-slate-800">Nuance</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {data.fineDistinctions.pairs.map((pair, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{pair.word1}</td>
                    <td className="p-3 text-slate-600">{pair.nuance1}</td>
                    <td className="p-3 font-medium text-slate-800">{pair.word2}</td>
                    <td className="p-3 text-slate-600">{pair.nuance2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* NuanceBlock - Progression to Expert (3-tier explanation) */}
        <NuanceBlock title="Progression to Expert" highlight="Weak → Strong → Expert">
          <p className="text-slate-700 mb-4">C2 mastery requires progressing through three levels of expression:</p>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Weak (C1) level */}
            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
              <p className="text-sm text-rose-600 mb-2">Weak (C1)</p>
              <p className="text-sm text-slate-700">Generic vocabulary, vague quantifiers, simple structures</p>
            </div>
            {/* Strong (C2 entry) level */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-600 mb-2">Strong (C2 entry)</p>
              <p className="text-sm text-slate-700">Precise vocabulary, technical terms, nominalization</p>
            </div>
            {/* Expert (Near-native) level */}
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-600 mb-2">Expert (Near-native)</p>
              <p className="text-sm text-slate-700">Literary vocabulary, complex syntax, nuanced evaluation</p>
            </div>
          </div>
        </NuanceBlock>

        {/* Progression Examples Section - Weak/Strong/Expert comparisons */}
        <SectionCard id="weak-strong-expert" title="Progression Examples" icon={FaGem} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
        </SectionCard>

        {/* Transformation Practice Section - 3-tier transformation examples */}
        <SectionCard id="transformations" title="Transformation Practice" icon={FaExchangeAlt} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Precision Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={1} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C2/module2" recapItems={["Fine lexical distinctions: suggérer vs insinuer", "Décliner vs refuser for formal contexts", "Nuance shifts across formality levels", "Weak → Strong → Expert progression", "Personification for authority", "Litotic understatement for sophistication"]} />
        )}
      </div>
    </div>
  );
}
