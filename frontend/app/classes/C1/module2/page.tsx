/**
 * C1 Module 2 - Nuance & Register Control
 * ==========================================
 *
 * This page teaches C1-level French learners to master register control and
 * tone adaptation. Students learn to navigate the five register levels and
 * adapt their language to different social contexts.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 1
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Register Intelligence Section - Introduction via introSections
 * 5. Register Spectrum Section - Five register levels table
 * 6. NuanceCard - Formal vs Informal Markers (two-column comparison)
 * 7. Politeness Strategies Section - Advanced politeness techniques table
 * 8. Weak vs Strong Section - Before/after comparison examples
 * 9. Transformations Section - Register elevation examples
 * 10. PracticeSection - Interactive quiz (15 questions)
 * 11. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections for register spectrum, politeness, etc.
 * - NuanceCard: Two-column comparison of formal vs informal markers
 * - WeakVsStrongCard: Shows before/after register examples
 * - TransformationCard: Demonstrates register transformations
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Indigo/purple gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Data tables for register spectrum and politeness strategies
 * - Two-column grid for formal vs informal markers
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
  FaLayerGroup,     // Register Intelligence section
  FaUserTie,        // Weak vs Strong section
  FaComments,       // Transformations section
  FaTheaterMasks,   // Register Spectrum section
  FaHandshake,      // Politeness Strategies section
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
 * Module2Page - Main component for C1 Module 2.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with indigo/purple theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module2Page() {
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
    const saved = localStorage.getItem("c1Module2Progress");
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
      localStorage.setItem("c1Module2Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center"><div className="text-indigo-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C1/module1" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={2} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Register Intelligence - Introduction to register control */}
        <SectionCard id="intro" title="Register Intelligence" icon={FaLayerGroup} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Register Spectrum Section - Five register levels data table */}
        <SectionCard id="register-spectrum" title="Register Spectrum" icon={FaTheaterMasks} isReviewed={reviewedSections.includes("register-spectrum")} onMarkReviewed={handleMarkReviewed}>
          <div className="overflow-x-auto">
            {/* Data table showing five register levels with characteristics and examples */}
            <table className="w-full text-sm">
              <thead className="bg-indigo-100"><tr><th className="p-3 text-left text-indigo-800">Level</th><th className="p-3 text-left text-indigo-800">Characteristics</th><th className="p-3 text-left text-indigo-800">Example</th></tr></thead>
              <tbody className="divide-y divide-indigo-100">
                {data.registerSpectrum.levels.map((level, idx) => (
                  <tr key={idx} className={idx === 2 ? "bg-emerald-50" : ""}>
                    <td className="p-3 font-medium text-slate-800">{level.level}</td>
                    <td className="p-3 text-slate-600">{level.characteristics}</td>
                    <td className="p-3 text-slate-700 italic">{level.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Nuance Card - Formal vs Informal Markers (two-column comparison grid) */}
        <NuanceCard title="Formal vs Informal Markers" highlight="Register choice signals social awareness">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left column - Formal markers */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-600 mb-2">Formal markers:</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Conditional: voudrais, pourriez, seriez</li>
                <li>• Impersonal: il convient, il semble</li>
                <li>• Subjunctive: after bien que, pour que</li>
                <li>• Full forms: not contractions</li>
              </ul>
            </div>
            {/* Right column - Informal markers */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-600 mb-2">Informal markers:</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• tu instead of vous</li>
                <li>• Contractions: chuis, jsais</li>
                <li>• Fillers: quoi, tu vois, bref</li>
                <li>• Shortened forms: d'ac, OK</li>
              </ul>
            </div>
          </div>
        </NuanceCard>

        {/* Politeness Strategies Section - Advanced politeness techniques table */}
        <SectionCard id="politeness" title="Politeness Strategies" icon={FaHandshake} isReviewed={reviewedSections.includes("politeness")} onMarkReviewed={handleMarkReviewed}>
          <div className="overflow-x-auto">
            {/* Data table showing politeness strategies with informal/formal comparison */}
            <table className="w-full text-sm">
              <thead className="bg-indigo-100"><tr><th className="p-3 text-left text-indigo-800">Strategy</th><th className="p-3 text-left text-indigo-800">Informal</th><th className="p-3 text-left text-indigo-800">Formal</th><th className="p-3 text-left text-indigo-800">Effect</th></tr></thead>
              <tbody className="divide-y divide-indigo-100">
                {data.politenessStrategies.strategies.map((s, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{s.strategy}</td>
                    <td className="p-3 text-slate-600 italic">{s.informal}</td>
                    <td className="p-3 text-indigo-700">{s.formal}</td>
                    <td className="p-3 text-slate-600">{s.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Weak vs Strong Section - Before/after comparison examples */}
        <SectionCard id="weak-vs-strong" title="Weak vs Strong Phrasing" icon={FaUserTie} isReviewed={reviewedSections.includes("weak-vs-strong")} onMarkReviewed={handleMarkReviewed}>
          <WeakVsStrongCard examples={data.weakVsStrongExamples} />
        </SectionCard>

        {/* Transformations Section - Register elevation examples */}
        <SectionCard id="transformations" title="Register Transformations" icon={FaComments} isReviewed={reviewedSections.includes("transformations")} onMarkReviewed={handleMarkReviewed}>
          <TransformationCard transformations={data.transformations} />
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Register Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={2} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module3" recapItems={["Five register levels: très soutenu to familier", "Conditional softening for politeness", "Impersonal constructions for formality", "Subjunctive in formal requests", "Diplomatic negation techniques", "Context determines register choice"]} />
        )}
      </div>
    </div>
  );
}
