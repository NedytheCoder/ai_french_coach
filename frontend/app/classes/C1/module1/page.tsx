/**
 * C1 Module 1 - Precision in Expression
 * ======================================
 *
 * This page teaches C1-level French learners to express ideas with precision
 * and clarity. Students learn to eliminate vague language, choose exact words,
 * and transform casual statements into authoritative prose.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 modules
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Precision Mindset Section - Introduction via introSections
 * 5. NuanceCard - From Vague to Precise (two-column comparison)
 * 6. Weak vs Strong Section - Before/after comparison examples
 * 7. Transformations Section - Sentence transformation techniques
 * 8. Exact Words Section - Word choice guidance with table
 * 9. Repetition Section - Techniques for elegant variation
 * 10. PracticeSection - Interactive quiz (15 questions)
 * 11. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - NuanceCard: Highlights precision principles with two-column grid
 * - WeakVsStrongCard: Shows before/after examples
 * - TransformationCard: Demonstrates sentence-level improvements
 * - SectionCard: Reviewable content sections
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Slate/stone gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for vague vs precise comparison
 * - Table for exact word choices
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
  FaBullseye,      // Precision Mindset section
  FaSearch,        // Weak vs Strong section
  FaFont,          // Exact Words section
  FaSyncAlt,       // Transformations and Repetition sections
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
 * Module1Page - Main component for C1 Module 1.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with slate theme
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
    const saved = localStorage.getItem("c1Module1Progress");
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
      localStorage.setItem("c1Module1Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-50 flex items-center justify-center"><div className="text-slate-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-50">
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
        {/* Precision Mindset - Introduction to precision in expression */}
        <SectionCard id="intro" title="Precision Mindset" icon={FaBullseye} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Nuance Card - From Vague to Precise (two-column comparison grid) */}
        <NuanceCard title="From Vague to Precise" highlight="Precision eliminates distance between you and your reader">
          <p className="text-slate-700 mb-4">Vague language signals uncertainty. At C1, every word should carry specific weight. Replace approximations with measured specificity.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left column - Vague markers to eliminate */}
            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
              <p className="text-sm text-rose-600 mb-2">Vague markers to eliminate:</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• "des choses" → specify: facteurs, éléments, aspects</li>
                <li>• "les gens" → specify: citoyens, participants, acteurs</li>
                <li>• "très/beaucoup" → use: significativement, considérablement</li>
                <li>• "faire" → use: réaliser, mettre en œuvre, effectuer</li>
              </ul>
            </div>
            {/* Right column - Precision markers to adopt */}
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-600 mb-2">Precision markers to adopt:</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Specific quantities over "beaucoup"</li>
                <li>• Technical vocabulary for domain</li>
                <li>• Nominalization for authority</li>
                <li>• Benchmarks for evaluation</li>
              </ul>
            </div>
          </div>
        </NuanceCard>

        {/* Weak vs Strong Section - Before/after comparison examples */}
        <SectionCard id="weak-vs-strong" title="Weak vs Strong Phrasing" icon={FaSearch} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Transformations Section - Sentence transformation techniques */}
        <SectionCard id="transformations" title="Transformation Techniques" icon={FaSyncAlt} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
        </SectionCard>

        {/* Exact Words Section - Word choice guidance with data table */}
        <SectionCard id="exact-words" title="Choosing Exact Words" icon={FaFont} isReviewed={reviewedSections.includes("exact-words")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-4">
            <p className="text-slate-700">{data.exactWordsSection.explanation}</p>
            {/* Data table showing context, best choice, and rationale */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100"><tr><th className="p-3 text-left text-slate-800">Context</th><th className="p-3 text-left text-slate-800">Best Choice</th><th className="p-3 text-left text-slate-800">Why</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {data.exactWordsSection.examples.map((ex, idx) => (
                    <tr key={idx}>
                      <td className="p-3 text-slate-600">{ex.context}</td>
                      <td className="p-3 font-medium text-slate-800">{ex.best}</td>
                      <td className="p-3 text-slate-600">{ex.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        {/* Repetition Section - Techniques for elegant variation */}
        <SectionCard id="repetition" title="Avoiding Repetition" icon={FaSyncAlt} isReviewed={reviewedSections.includes("repetition")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-4">
            <p className="text-slate-700">{data.repetitionSection.explanation}</p>
            <div className="grid gap-4">{data.repetitionSection.techniques.map((t, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-medium text-slate-800">{t.technique}</p>
                <p className="text-slate-600 italic">{t.example}</p>
                <p className="text-sm text-slate-500">{t.note}</p>
              </div>
            ))}</div>
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Transformation Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={1} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module2" recapItems={["Eliminate vague words: choses, gens, faire, très", "Use nominalization for authority", "Vary vocabulary to avoid repetition", "Choose exact words with semantic precision", "Add benchmarks for evaluative statements"]} />
        )}
      </div>
    </div>
  );
}
