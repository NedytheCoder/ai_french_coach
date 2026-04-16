/**
 * C2 Module 4 - Rhetoric & Persuasion
 * =====================================
 *
 * This page teaches C2-level French learners to master classical rhetoric and
 * persuasive techniques. Students learn six classical techniques (Anaphora,
 * Antithesis, Gradatio, Praeteritio, Litotes, Rhetorical question) and four
 * emphasis patterns to create compelling, persuasive prose.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C2 Module 3
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Rhetorical Power Section - Introduction via introSections
 * 5. Classical Rhetoric Section - Two-column grid of 6 rhetoric techniques
 * 6. NuanceBlock - Persuasive Architecture with 4 emphasis patterns
 * 7. Persuasive Progression Section - Weak/Strong/Expert comparisons
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceBlock: Emphasis patterns display (Logic + Style + Emotion)
 * - WeakStrongExpertCard: 3-tier persuasive progression examples
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Amber/orange gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for rhetoric techniques
 * - Vertical stack for emphasis patterns
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
  FaBullhorn,       // Rhetorical Power section
  FaTheaterMasks,   // Classical Rhetoric section
  FaChartLine,      // Persuasive Progression section
  FaBalanceScale,   // (unused but imported)
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
 * Module4Page - Main component for C2 Module 4.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C2 components with amber/orange theme
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
    const saved = localStorage.getItem("c2Module4Progress");
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
      localStorage.setItem("c2Module4Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center"><div className="text-amber-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C2/module3" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={4} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Rhetorical Power - Introduction to rhetoric and persuasion */}
        <SectionCard id="intro" title="Rhetorical Power" icon={FaBullhorn} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Classical Rhetoric Section - Two-column grid of 6 techniques */}
        <SectionCard id="rhetoric" title="Classical Rhetoric" icon={FaTheaterMasks} isReviewed={reviewedSections.includes("rhetoric")} onMarkReviewed={handleMarkReviewed}>
          {/* Two-column grid for rhetoric techniques (Anaphora, Antithesis, Gradatio, etc.) */}
          <div className="grid md:grid-cols-2 gap-4">
            {data.rhetoricTechniques.techniques.map((t, idx) => (
              <div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800">{t.technique}</p>
                <p className="text-sm text-slate-600">{t.description}</p>
                <p className="text-slate-700 italic text-sm mt-2">{t.example}</p>
                <p className="text-xs text-slate-500 mt-1">{t.effect}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* NuanceBlock - Persuasive Architecture with emphasis patterns */}
        <NuanceBlock title="Persuasive Architecture" highlight="Logic + Style + Emotion">
          {/* Vertical stack of 4 emphasis patterns (Cleft, Superlative, Double negation, Enumerative) */}
          <div className="space-y-4">
            {data.emphasisPatterns.patterns.map((p, idx) => (
              <div key={idx} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-medium text-orange-800">{p.pattern}</p>
                <p className="text-slate-700 italic">{p.example}</p>
                <p className="text-sm text-slate-500">{p.effect}</p>
              </div>
            ))}
          </div>
        </NuanceBlock>

        {/* Persuasive Progression Section - Weak/Strong/Expert comparisons */}
        <SectionCard id="weak-strong-expert" title="Persuasive Progression" icon={FaChartLine} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Rhetoric Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={4} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C2/module5" recapItems={["Anaphora (repetition) for rhythm", "Antithesis for sharp contrast", "Gradatio (climax) for building intensity", "Praeteritio for strategic mention", "Litotes (understatement) for sophistication", "Rhetorical questions for engagement"]} />
        )}
      </div>
    </div>
  );
}
