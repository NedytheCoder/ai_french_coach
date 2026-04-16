/**
 * C1 Module 11 - Spoken Expression Simulation
 * =============================================
 *
 * This page teaches C1-level French learners to master natural spoken French.
 * Students learn fillers, reactions, turn-taking, and conversational fluidity
 * to move from written elegance to spoken spontaneity.
 *
 * **Module Structure:**
 * 1. ModuleNav - Navigation back to C1 Module 10
 * 2. ModuleHeader - Module title and subtitle
 * 3. ProgressBar - Module completion progress
 * 4. Spoken Fluency Section - Introduction via introSections
 * 5. Discourse Markers Section - Two-column grid of marker categories
 * 6. NuanceCard - Spoken vs Written (two-column comparison)
 * 7. Natural Reactions Section - Data table of reaction patterns
 * 8. Turn Management Section - Strategy cards
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionCard - Module completion with recap
 *
 * **Key Components Used:**
 * - SectionCard: Reviewable content sections
 * - NuanceCard: Two-column comparison (written → spoken vs spoken strategies)
 * - PracticeSection: Interactive assessment
 *
 * **Features:**
 * - Pink/rose gradient background theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grids for discourse markers and comparisons
 * - Data table for reaction patterns
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
  FaMicrophone,     // Spoken Fluency section
  FaComments,       // Turn Management section
  FaReply,          // Natural Reactions section
  FaWaveSquare,     // Discourse Markers section
  FaQuestionCircle, // Practice section header
} from "react-icons/fa";

// Shared C1 components
import { ModuleHeader, ProgressBar, PracticeSection, CompletionCard, ModuleNav, SectionCard, NuanceCard, WeakVsStrongCard } from "../components";

// Module data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Module11Page - Main component for C1 Module 11.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared C1 components with pink/rose theme
 *
 * All module content is accessed via the data namespace import.
 *
 * @returns JSX.Element - The module page
 */
export default function Module11Page() {
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
    const saved = localStorage.getItem("c1Module11Progress");
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
      localStorage.setItem("c1Module11Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center"><div className="text-pink-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <ModuleNav backPath="/classes/C1/module10" />

        {/* Module Header with title from data.moduleMeta */}
        <ModuleHeader moduleNumber={11} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        {/* Module Sections - In Order of Instruction */}
        {/* Spoken Fluency - Introduction to spoken vs written French */}
        <SectionCard id="intro" title="Spoken Fluency" icon={FaMicrophone} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Discourse Markers Section - Two-column grid of marker categories */}
        <SectionCard id="fillers" title="Discourse Markers" icon={FaWaveSquare} isReviewed={reviewedSections.includes("fillers")} onMarkReviewed={handleMarkReviewed}>
          {/* Two-column grid for discourse marker categories */}
          <div className="grid md:grid-cols-2 gap-4">
            {data.fillersAndMarkers.categories.map((cat, idx) => (
              <div key={idx} className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="font-medium text-pink-800">{cat.category}</p>
                <p className="text-sm text-slate-600">{cat.markers.join(", ")}</p>
                <p className="text-slate-700 italic">{cat.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Nuance Card - Spoken vs Written (two-column comparison) */}
        <NuanceCard title="Spoken vs Written" highlight="Orality has its own markers">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left column - Written to Spoken transformations */}
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <p className="font-medium text-pink-800 mb-2">Written → Spoken</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Je suis d'accord → Carrément!</li>
                <li>• C'est surprenant → Sans déconner?</li>
                <li>• Je ne comprends pas → Attends, là, je suis perdu.</li>
                <li>• C'est excellent → Grave! Trop bien!</li>
              </ul>
            </div>
            {/* Right column - Spoken strategies */}
            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
              <p className="font-medium text-rose-800 mb-2">Spoken strategies</p>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Use fillers for thinking time</li>
                <li>• Check engagement with 'tu vois'</li>
                <li>• Claim floor with 'écoute'</li>
                <li>• Soften with 'enfin, quoi'</li>
              </ul>
            </div>
          </div>
        </NuanceCard>

        {/* Natural Reactions Section - Data table of reaction patterns */}
        <SectionCard id="reactions" title="Natural Reactions" icon={FaReply} isReviewed={reviewedSections.includes("reactions")} onMarkReviewed={handleMarkReviewed}>
          <div className="overflow-x-auto">
            {/* Data table comparing written vs spoken reactions */}
            <table className="w-full text-sm">
              <thead className="bg-pink-100"><tr><th className="p-3 text-left text-pink-800">Situation</th><th className="p-3 text-left text-pink-800">Written</th><th className="p-3 text-left text-pink-800">Spoken</th></tr></thead>
              <tbody className="divide-y divide-pink-100">
                {data.reactionPatterns.reactions.map((r, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{r.situation}</td>
                    <td className="p-3 text-slate-500 italic">{r.written}</td>
                    <td className="p-3 text-rose-700 font-medium">{r.spoken}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Turn Management Section - Strategy cards */}
        <SectionCard id="turn-taking" title="Turn Management" icon={FaComments} isReviewed={reviewedSections.includes("turn-taking")} onMarkReviewed={handleMarkReviewed}>
          {/* Vertical stack of turn-taking strategy cards */}
          <div className="space-y-4">
            {data.turnTaking.strategies.map((s, idx) => (
              <div key={idx} className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="font-medium text-pink-800">{s.strategy}</p>
                <p className="text-sm text-slate-600">{s.marker}</p>
                <p className="text-slate-700 italic">{s.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-pink-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Spoken Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {/* Completion Card - Shown when practice is done */}
        {practiceCompleted && (
          <CompletionCard moduleNumber={11} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C1/module12" recapItems={["Fillers: euh, alors, enfin", "Engagement checks: tu vois, quoi", "Intensifiers: carrément, grave, franchement", "Floor management: écoute, attends", "Reactions: sans déconner, c'est pas vrai", "Hedging: enfin, je sais pas, quoi"]} />
        )}
      </div>
    </div>
  );
}
