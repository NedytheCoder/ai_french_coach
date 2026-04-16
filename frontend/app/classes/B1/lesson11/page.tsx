/**
 * B1 Lesson 11 - All Relative Pronouns (Les Pronoms Relatifs)
 * ============================================================
 *
 * This page teaches B1 learners the complete set of French relative pronouns
 * for constructing complex sentences.
 *
 * **Lesson Structure:**
 * 1. LessonHeader - Title and introduction using lessonMeta
 * 2. QuiSection - Subject pronoun (who/which/that)
 * 3. QueSection - Direct object pronoun (whom/which/that)
 * 4. OuSection - Place/time pronoun (where/when)
 * 5. DontSection - Of which/whose/with de
 * 6. LequelSection - Lequel/laquelle/lesquels/lesquelles (table format)
 * 7. CeQuiSection - Ce qui/ce que/ce dont (no antecedent)
 * 8. SummarySection - Quick reference table
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Qui = subject (followed by verb)
 * - Que = direct object (followed by subject + verb)
 * - Où = place or time
 * - Dont = replaces de + noun
 * - Lequel = after prepositions (avec lequel, sur laquelle)
 * - Ce qui/ce que/ce dont = when no specific noun antecedent
 *
 * **Features:**
 * - Uses shared B1 components (SectionCard, ProgressBar, PracticeSection, etc.)
 * - Indigo accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Tables for lequel forms and quick reference
 */

"use client";

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import React, { useState, useEffect, useMemo } from "react";

// Framer Motion for animations
import { motion } from "framer-motion";

// React Icons for UI elements
import {
  FaUser,           // Qui section (subject)
  FaArrowRight,     // Que section (direct object)
  FaMapMarkerAlt,   // Ou section (place/time)
  FaBookOpen,       // Dont section
  FaListOl,         // Lequel section
  FaQuestionCircle, // Ce qui section
  FaTable,          // Summary section
} from "react-icons/fa";

// Shared B1 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  quiSummary,
  queSummary,
  ouSummary,
  dontSummary,
  lequelForms,
  ceQuiCeQue,
  quickReference,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * LessonHeader - Displays the lesson title and introduction.
 *
 * Uses lessonMeta from data.ts for dynamic title and subtitle.
 * Features indigo/purple gradient background.
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 11</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-indigo-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

/**
 * QuiSection - The relative pronoun "qui" as subject.
 *
 * Content:
 * - Usage: Subject (who/which/that)
 * - Examples: L'homme qui parle, Le livre qui est sur la table
 * - Key tip: Qui is followed by a verb
 */
function QuiSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="qui" title="Qui (Subject)" icon={FaUser} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <p className="text-slate-700"><strong>Usage:</strong> {quiSummary.usage}</p>
        <div className="grid gap-2">
          {quiSummary.examples.map((ex, idx) => (<p key={idx} className="p-2 bg-indigo-50 rounded text-indigo-800">{ex}</p>))}
        </div>
        <div className="p-3 bg-amber-50 rounded border border-amber-100">
          <p className="text-amber-800 text-sm"><strong>Tip:</strong> {quiSummary.tip}</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * QueSection - The relative pronoun "que" as direct object.
 *
 * Content:
 * - Usage: Direct object (whom/which/that)
 * - Examples: Le livre que je lis, La personne que j'ai vue
 * - Key tip: Que is followed by subject + verb
 */
function QueSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="que" title="Que (Direct Object)" icon={FaArrowRight} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <p className="text-slate-700"><strong>Usage:</strong> {queSummary.usage}</p>
        <div className="grid gap-2">
          {queSummary.examples.map((ex, idx) => (<p key={idx} className="p-2 bg-indigo-50 rounded text-indigo-800">{ex}</p>))}
        </div>
        <div className="p-3 bg-amber-50 rounded border border-amber-100">
          <p className="text-amber-800 text-sm"><strong>Tip:</strong> {queSummary.tip}</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * OuSection - The relative pronoun "où" for place or time.
 *
 * Content:
 * - Usage: Place or time (where/when)
 * - Examples: La maison où j'habite, Le jour où je suis arrivé
 * - Key tip: For location or time reference
 */
function OuSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="ou" title="Où (Place/Time)" icon={FaMapMarkerAlt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <p className="text-slate-700"><strong>Usage:</strong> {ouSummary.usage}</p>
        <div className="grid gap-2">
          {ouSummary.examples.map((ex, idx) => (<p key={idx} className="p-2 bg-indigo-50 rounded text-indigo-800">{ex}</p>))}
        </div>
        <div className="p-3 bg-amber-50 rounded border border-amber-100">
          <p className="text-amber-800 text-sm"><strong>Tip:</strong> {ouSummary.tip}</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * DontSection - The relative pronoun "dont" for de constructions.
 *
 * Content:
 * - Usage: Of which/whose/with de
 * - Examples: Le livre dont je parle, La personne dont je me souviens
 * - Key tip: Replaces de + noun
 */
function DontSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="dont" title="Dont (With de)" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <p className="text-slate-700"><strong>Usage:</strong> {dontSummary.usage}</p>
        <div className="grid gap-2">
          {dontSummary.examples.map((ex, idx) => (<p key={idx} className="p-2 bg-indigo-50 rounded text-indigo-800">{ex}</p>))}
        </div>
        <div className="p-3 bg-amber-50 rounded border border-amber-100">
          <p className="text-amber-800 text-sm"><strong>Tip:</strong> {dontSummary.tip}</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * LequelSection - Lequel/laquelle/lesquels/lesquelles after prepositions.
 *
 * Content displayed in table format:
 * - lequel: masculine singular (avec lequel)
 * - laquelle: feminine singular (sur laquelle)
 * - lesquels: masculine plural (dans lesquels)
 * - lesquelles: feminine plural (devant lesquelles)
 */
function LequelSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="lequel" title="Lequel Forms" icon={FaListOl} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <p className="text-slate-700">Used after prepositions, agreeing in gender and number:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-indigo-100">
              <tr>
                <th className="p-2 text-left text-indigo-800">Form</th>
                <th className="p-2 text-left text-indigo-800">Gender</th>
                <th className="p-2 text-left text-indigo-800">Example</th>
              </tr>
            </thead>
            <tbody>
              {lequelForms.map((lf, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium text-indigo-700">{lf.form}</td>
                  <td className="p-2">{lf.gender}</td>
                  <td className="p-2 text-slate-600">{lf.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * CeQuiSection - Ce qui / Ce que / Ce dont when no specific antecedent.
 *
 * Content:
 * - ce qui: subject (what/which) - Ce qui me surprend...
 * - ce que: direct object (what) - Ce que je veux...
 * - ce dont: with de (what/about which) - Ce dont je parle...
 */
function CeQuiSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="ce-qui-que" title="Ce qui / Ce que / Ce dont" icon={FaQuestionCircle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <p className="text-slate-700">Used when there's no specific antecedent:</p>
        <div className="grid gap-3">
          {ceQuiCeQue.map((item, idx) => (
            <div key={idx} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="font-bold text-indigo-800">{item.pronoun}</p>
              <p className="text-indigo-700">{item.example}</p>
              <p className="text-sm text-indigo-600">{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * SummarySection - Quick reference table for choosing relative pronouns.
 *
 * Content displayed in table format:
 * - Subject does action → qui
 * - Receives action → que
 * - Place/time → où
 * - With de → dont
 * - After preposition → lequel/dont
 * - No antecedent → ce qui/ce que/ce dont
 */
function SummarySection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="summary" title="Quick Reference Table" icon={FaTable} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-indigo-100">
              <tr>
                <th className="p-2 text-left text-indigo-800">Situation</th>
                <th className="p-2 text-left text-indigo-800">Pronoun</th>
                <th className="p-2 text-left text-indigo-800">Example</th>
              </tr>
            </thead>
            <tbody>
              {quickReference.map((ref, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2">{ref.situation}</td>
                  <td className="p-2 font-bold text-indigo-700">{ref.pronoun}</td>
                  <td className="p-2 text-slate-600">{ref.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson11Page - Main component for B1 Lesson 11.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B1 components with indigo accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson11Page() {
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
    const saved = localStorage.getItem("b1Lesson11Progress");
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
      localStorage.setItem("b1Lesson11Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  // Show loading state during SSR hydration
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-50 flex items-center justify-center"><div className="text-indigo-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B1" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="indigo" /></div>

        {/* Lesson Sections - In Order of Instruction */}
        <QuiSection isReviewed={reviewedSections.includes("qui")} onMarkReviewed={handleMarkReviewed} />
        <QueSection isReviewed={reviewedSections.includes("que")} onMarkReviewed={handleMarkReviewed} />
        <OuSection isReviewed={reviewedSections.includes("ou")} onMarkReviewed={handleMarkReviewed} />
        <DontSection isReviewed={reviewedSections.includes("dont")} onMarkReviewed={handleMarkReviewed} />
        <LequelSection isReviewed={reviewedSections.includes("lequel")} onMarkReviewed={handleMarkReviewed} />
        <CeQuiSection isReviewed={reviewedSections.includes("ce-qui-que")} onMarkReviewed={handleMarkReviewed} />
        <SummarySection isReviewed={reviewedSections.includes("summary")} onMarkReviewed={handleMarkReviewed} />
        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="indigo" />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={11} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson12" recapItems={["Qui, que, où, dont basics", "Lequel forms with prepositions", "Ce qui/ce que/ce dont for no antecedent", "Complete relative pronoun system"]} accentColor="indigo" />
        )}
      </div>
    </div>
  );
}
