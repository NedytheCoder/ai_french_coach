/**
 * B1 Lesson 1 - Conditional Mood (Le Conditionnel)
 * =================================================
 *
 * This page teaches B1 learners the French conditional mood, used to express
 * wishes, hypothetical situations, and polite requests.
 *
 * **Lesson Structure:**
 * 1. LessonHeader - Title and introduction using lessonMeta
 * 2. FormationSection - How to form the conditional (future stem + imparfait endings)
 * 3. UsesSection - Common uses (politeness, wishes, hypothetical, advice)
 * 4. IfClausesSection - Si clause patterns (si + imparfait → conditionnel)
 * 5. IrregularsSection - Irregular verb stems
 * 6. ComparisonSection - Future vs conditional comparison
 * 7. MistakesSection - Common errors to avoid
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Conditional = future stem + imparfait endings
 * - Never use conditional after "si"
 * - Irregular stems: être→ser-, avoir→aur-, aller→ir-, faire→fer-, etc.
 *
 * **Features:**
 * - Uses shared B1 components (SectionCard, ProgressBar, PracticeSection, etc.)
 * - Indigo accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
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
  FaBookOpen,       // Irregular stems section
  FaGraduationCap,  // Formation section
  FaLink,           // If-clauses section
  FaBalanceScale,   // Comparison section
  FaExclamationTriangle, // Mistakes section
  FaLightbulb,      // Uses section
} from "react-icons/fa";

// Shared B1 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  formationExamples,
  useCases,
  ifClauseExamples,
  irregularStems,
  futurVsConditional,
  commonMistakes,
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
 * Features indigo/violet gradient background.
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-violet-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 1</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-indigo-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

/**
 * FormationSection - How to form the conditional mood.
 *
 * Content:
 * - Explanation of formation rule (future stem + imparfait endings)
 * - Examples with -er, -ir, -re verbs
 * - Endings table: -ais, -ais, -ait, -ions, -iez, -aient
 */
function FormationSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="formation" title="Formation of the Conditional" icon={FaGraduationCap} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">The conditional is formed by taking the future stem and adding imparfait endings:</p>
        <div className="grid gap-4">
          {formationExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="font-semibold text-indigo-800 mb-2">{ex.stem} + endings</p>
              <p className="text-slate-700 text-sm">{ex.endings.join(", ")}</p>
              <p className="text-sm text-indigo-600 mt-2">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Endings:</strong> -ais, -ais, -ait, -ions, -iez, -aient</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * UsesSection - Common uses of the conditional mood.
 *
 * Content:
 * - Politeness (Je voudrais...)
 * - Wishes (J'aimerais...)
 * - Hypothetical situations
 * - Advice (Tu devrais...)
 */
function UsesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="uses" title="Common Uses" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <div className="grid gap-4">
          {useCases.map((use, idx) => (
            <div key={idx} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="font-semibold text-indigo-800 mb-1">{use.use}</p>
              <p className="text-slate-700">{use.example}</p>
              <p className="text-sm text-indigo-600">{use.english}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * IfClausesSection - Si clause patterns with conditional.
 *
 * Content:
 * - Pattern: Si + imparfait → conditionnel
 * - Examples showing condition and result
 * - Warning: Never use conditional after "si"
 */
function IfClausesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="if-clauses" title="If-Clauses (Si)" icon={FaLink} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">Use the imparfait after si, and the conditional in the result clause:</p>
        <div className="grid gap-4">
          {ifClauseExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-slate-700"><strong>{ex.condition}, {ex.result}</strong></p>
              <p className="text-sm text-indigo-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
          <p className="text-red-800"><strong>Important:</strong> Never use conditional after si. Always use imparfait.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * IrregularsSection - Irregular verb stems in the conditional.
 *
 * Content:
 * - être → ser-
 * - avoir → aur-
 * - aller → ir-
 * - faire → fer-
 * - venir → viendr-
 * - pouvoir → pourr-
 * - vouloir → voudr-
 * - devoir → devr-
 */
function IrregularsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="irregulars" title="Irregular Stems" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">These common verbs have irregular stems in the conditional:</p>
        <div className="grid md:grid-cols-2 gap-4">
          {irregularStems.map((irr, idx) => (
            <div key={idx} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="font-semibold text-indigo-800">{irr.infinitive} → {irr.stem}</p>
              <p className="text-sm text-slate-600">{irr.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ComparisonSection - Comparing future and conditional.
 *
 * Content:
 * - Future: definite, will happen
 * - Conditional: hypothetical, depends on condition
 * - Side-by-side examples
 */
function ComparisonSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="comparison" title="Future vs Conditional" icon={FaBalanceScale} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <div className="grid gap-4">
          {futurVsConditional.map((comp, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">Future: {comp.futur}</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <p className="font-medium text-indigo-800">Conditional: {comp.conditional}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">{comp.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * MistakesSection - Common errors with the conditional.
 *
 * Content:
 * - Using hyphens in conditional forms
 * - Using conditional after "si"
 * - Polite expression mistakes
 */
function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="indigo">
      <div className="space-y-4">
        <div className="grid gap-4">
          {commonMistakes.map((ex, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-slate-100">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-red-600">{ex.wrong}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-emerald-700 font-medium">{ex.correct}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3 bg-slate-50 p-2 rounded">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson1Page - Main component for B1 Lesson 1.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B1 components with indigo accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson1Page() {
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
    const saved = localStorage.getItem("b1Lesson1Progress");
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
      localStorage.setItem("b1Lesson1Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
        <FormationSection isReviewed={reviewedSections.includes("formation")} onMarkReviewed={handleMarkReviewed} />
        <UsesSection isReviewed={reviewedSections.includes("uses")} onMarkReviewed={handleMarkReviewed} />
        <IfClausesSection isReviewed={reviewedSections.includes("if-clauses")} onMarkReviewed={handleMarkReviewed} />
        <IrregularsSection isReviewed={reviewedSections.includes("irregulars")} onMarkReviewed={handleMarkReviewed} />
        <ComparisonSection isReviewed={reviewedSections.includes("comparison")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
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
          <CompletionSection lessonNumber={1} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson2" recapItems={["How to form the conditional mood", "Common irregular stems (être, avoir, aller, faire)", "Si clauses with imparfait + conditional", "Difference between future and conditional", "Using conditional for politeness and wishes"]} accentColor="indigo" />
        )}
      </div>
    </div>
  );
}