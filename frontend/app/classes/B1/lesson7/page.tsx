/**
 * B1 Lesson 7 - Past Subjunctive (Le Subjonctif Passé)
 * =======================================================
 *
 * This page teaches B1 learners the past subjunctive used to express completed
 * actions in the subjunctive mood.
 *
 * **Lesson Structure:**
 * 1. LessonHeader - Title and introduction using lessonMeta
 * 2. WhenSection - When to use past subjunctive vs present subjunctive
 * 3. FormationSection - Formation rules and auxiliary verbs (avoir/être)
 * 4. RegularSection - Regular verb examples (table format)
 * 5. IrregularsSection - Common irregular examples
 * 6. ExamplesSection - Usage examples with agreement reminder
 * 7. MistakesSection - Common errors to avoid
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Use past subjunctive when action is completed before the main clause
 * - Formation: auxiliary (avoir/être in present subjunctive) + past participle
 * - Avoir: j'aie, tu aies, il ait, nous ayons, vous ayez, ils aient
 * - Être: je sois, tu sois, il soit, nous soyons, vous soyez, ils soient
 * - Agreement required with être verbs
 *
 * **Features:**
 * - Uses shared B1 components (SectionCard, ProgressBar, PracticeSection, etc.)
 * - Amber accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Regular verbs displayed in table format
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
  FaClock,          // When to use section
  FaGraduationCap,  // Formation section
  FaBookOpen,       // Regular verbs section
  FaPuzzlePiece,    // Irregulars section
  FaList,           // Examples section
  FaExclamationTriangle, // Mistakes section
} from "react-icons/fa";

// Shared B1 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  whenToUse,
  formationRules,
  avoirEtre,
  regularExamples,
  irregulars,
  usageExamples,
  agreementNote,
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
 * Features amber/orange gradient background.
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 7</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-amber-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

/**
 * WhenSection - When to use past subjunctive vs present subjunctive.
 *
 * Content:
 * - Use past subjunctive when the subjunctive-triggering expression is in the present,
 *   but the action in the subjunctive clause happened before now
 * - Examples showing completed actions
 */
function WhenSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="when-to-use" title="When to Use Past Subjunctive" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          {whenToUse.map((item, idx) => (<li key={idx}>{item}</li>))}
        </ul>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Key point:</strong> Use past subjunctive when the action is already completed, even though the trigger is in present.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * FormationSection - How to form the past subjunctive.
 *
 * Content:
 * - Formation rules (present subjunctive of auxiliary + past participle)
 * - Avoir and être auxiliaries in present subjunctive
 * - Examples for each auxiliary
 */
function FormationSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="formation" title="Formation" icon={FaGraduationCap} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <ul className="list-decimal list-inside text-slate-700 space-y-2">
          {formationRules.map((rule, idx) => (<li key={idx}>{rule}</li>))}
        </ul>
        <div className="grid gap-3 mt-4">
          {avoirEtre.map((aux, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-semibold text-amber-800">{aux.auxiliary}</p>
              <p className="text-slate-700">{aux.je}, {aux.tu}, {aux.il}</p>
              <p className="text-sm text-amber-600 mt-1">Example: {aux.example} ({aux.exampleVerb})</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * RegularSection - Regular verb examples in past subjunctive.
 *
 * Content displayed in table format:
 * - Infinitive, auxiliary, past subjunctive form, meaning
 * - Examples with avoir (parler, finir)
 * - Examples with être (partir, aller)
 */
function RegularSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="regular-verbs" title="Regular Verb Examples" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-amber-100">
              <tr>
                <th className="p-2 text-left text-amber-800">Infinitive</th>
                <th className="p-2 text-left text-amber-800">Auxiliary</th>
                <th className="p-2 text-left text-amber-800">Past Subjunctive</th>
                <th className="p-2 text-left text-amber-800">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {regularExamples.map((ex, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium">{ex.infinitive}</td>
                  <td className="p-2">{ex.auxiliary}</td>
                  <td className="p-2 text-amber-700">{ex.form}</td>
                  <td className="p-2 text-slate-600">{ex.meaning}</td>
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
 * IrregularsSection - Common irregular verbs in past subjunctive.
 *
 * Content:
 * - faire: que j'aie fait (avoir)
 * - voir: que tu aies vu (avoir)
 * - venir: qu'il soit venu (être)
 * - naître: qu'elle soit née (être, agrees)
 */
function IrregularsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="irregulars" title="Common Irregular Examples" icon={FaPuzzlePiece} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <div className="grid gap-3">
          {irregulars.map((irr, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-semibold text-amber-800">{irr.infinitive}</p>
              <p className="text-amber-700">{irr.form}</p>
              <p className="text-sm text-slate-600">{irr.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ExamplesSection - Usage examples with agreement reminder.
 *
 * Content:
 * - Contextual examples showing past subjunctive in sentences
 * - Agreement rules for être verbs (gender and number)
 * - Examples: Je suis content que tu aies réussi, etc.
 */
function ExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="examples" title="Usage Examples" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <div className="grid gap-3">
          {usageExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-800"><strong>{ex.trigger}</strong> {ex.clause}</p>
              <p className="text-sm text-amber-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-emerald-800"><strong>Agreement reminder:</strong></p>
          <ul className="list-disc list-inside text-emerald-700 mt-2">
            {agreementNote.map((note, idx) => (<li key={idx}>{note}</li>))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * MistakesSection - Common errors with the past subjunctive.
 *
 * Content:
 * - Using present subjunctive when action is completed
 * - Forgetting past participle agreement with être
 * - Using wrong auxiliary (avoir vs être)
 */
function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        {commonMistakes.map((ex, idx) => (
          <div key={idx} className="p-4 bg-white rounded-xl border border-slate-100">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2"><span className="text-red-500 font-bold">✗</span><span className="text-red-600">{ex.wrong}</span></div>
              <div className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span><span className="text-emerald-700 font-medium">{ex.correct}</span></div>
            </div>
            <p className="text-sm text-slate-600 mt-3 bg-slate-50 p-2 rounded">{ex.explanation}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson7Page - Main component for B1 Lesson 7.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B1 components with amber accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson7Page() {
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
    const saved = localStorage.getItem("b1Lesson7Progress");
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
      localStorage.setItem("b1Lesson7Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-50 flex items-center justify-center"><div className="text-amber-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B1" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="amber" /></div>

        {/* Lesson Sections - In Order of Instruction */}
        <WhenSection isReviewed={reviewedSections.includes("when-to-use")} onMarkReviewed={handleMarkReviewed} />
        <FormationSection isReviewed={reviewedSections.includes("formation")} onMarkReviewed={handleMarkReviewed} />
        <RegularSection isReviewed={reviewedSections.includes("regular-verbs")} onMarkReviewed={handleMarkReviewed} />
        <IrregularsSection isReviewed={reviewedSections.includes("irregulars")} onMarkReviewed={handleMarkReviewed} />
        <ExamplesSection isReviewed={reviewedSections.includes("examples")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="amber" />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={7} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson8" recapItems={["When to use past subjunctive", "Formation with auxiliary + past participle", "Avoir and être in present subjunctive", "Agreement rules for être verbs", "Common examples and usage"]} accentColor="amber" />
        )}
      </div>
    </div>
  );
}
