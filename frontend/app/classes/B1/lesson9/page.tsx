/**
 * B1 Lesson 9 - Futur Antérieur (Future Perfect)
 * ================================================
 *
 * This page teaches B1 learners the futur antérieur used to express actions
 * that will have been completed before another future action.
 *
 * **Lesson Structure:**
 * 1. LessonHeader - Title and introduction using lessonMeta
 * 2. WhatIsSection - Definition and explanation of futur antérieur
 * 3. FormationSection - Formation rules with avoir/être table
 * 4. UsageSection - When to use futur antérieur
 * 5. ExamplesSection - Comparing futur simple vs futur antérieur
 * 6. MistakesSection - Common errors to avoid
 * 7. PracticeSection - Interactive quiz (15 questions)
 * 8. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Futur antérieur = future auxiliary + past participle
 * - English equivalent: "will have + past participle"
 * - Used when an action will be completed before another future action
 * - Can also express hypothesis about past events
 *
 * **Features:**
 * - Uses shared B1 components (SectionCard, ProgressBar, PracticeSection, etc.)
 * - Cyan accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Auxiliary verbs displayed in table format
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
  FaClock,          // Usage section
  FaGraduationCap,  // Formation section
  FaForward,        // What is section
  FaExchangeAlt,    // Examples section (comparing)
  FaExclamationTriangle, // Mistakes section
  FaList,           // List icon
} from "react-icons/fa";

// Shared B1 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  whatIs,
  formationRules,
  avoirEtre,
  usageCases,
  examples,
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
 * Features cyan/teal gradient background.
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-cyan-500 to-teal-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 9</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-cyan-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

/**
 * WhatIsSection - Definition and explanation of the futur antérieur.
 *
 * Content:
 * - Describes an action that will be completed before another future action
 * - English equivalent: "will have + past participle"
 * - Example: J'aurai fini avant midi (I will have finished before noon)
 */
function WhatIsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="what-is" title="What is Futur Antérieur?" icon={FaForward} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          {whatIs.map((item, idx) => (<li key={idx}>{item}</li>))}
        </ul>
        <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
          <p className="text-cyan-800"><strong>Think of it as:</strong> 'will have done' - an action completed before another point in the future.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * FormationSection - How to form the futur antérieur.
 *
 * Content:
 * - Formation rules (future auxiliary + past participle)
 * - Avoir and être auxiliaries in future tense (table format)
 * - Agreement rules for être verbs
 */
function FormationSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="formation" title="Formation" icon={FaGraduationCap} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        <ul className="list-decimal list-inside text-slate-700 space-y-2">
          {formationRules.map((rule, idx) => (<li key={idx}>{rule}</li>))}
        </ul>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead className="bg-cyan-100">
              <tr>
                <th className="p-2 text-left text-cyan-800">Auxiliary</th>
                <th className="p-2 text-left text-cyan-800">je</th>
                <th className="p-2 text-left text-cyan-800">tu</th>
                <th className="p-2 text-left text-cyan-800">il</th>
                <th className="p-2 text-left text-cyan-800">nous</th>
              </tr>
            </thead>
            <tbody>
              {avoirEtre.map((aux, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium">{aux.auxiliary}</td>
                  <td className="p-2">{aux.je}</td>
                  <td className="p-2">{aux.tu}</td>
                  <td className="p-2">{aux.il}</td>
                  <td className="p-2">{aux.nous}</td>
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
 * UsageSection - When to use the futur antérieur.
 *
 * Content:
 * - Completed before future: action completed before another future action
 * - Hypothesis about past: supposition about something already happened
 * - Independent action: completed action by a specific future time
 */
function UsageSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="usage" title="When to Use Futur Antérieur" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        <div className="grid gap-3">
          {usageCases.map((use, idx) => (
            <div key={idx} className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
              <p className="font-semibold text-cyan-800">{use.case}</p>
              <p className="text-cyan-700">{use.example}</p>
              <p className="text-sm text-cyan-600">{use.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ExamplesSection - Comparing futur simple and futur antérieur.
 *
 * Content:
 * - Side-by-side comparison of simple future vs completed future
 * - Examples showing the difference in meaning
 * - Visual distinction between the two tenses
 */
function ExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="examples" title="Futur vs Futur Antérieur" icon={FaExchangeAlt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        <div className="grid gap-4">
          {examples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="grid gap-2">
                <p className="text-slate-600"><strong>Simple:</strong> {ex.futur}</p>
                <p className="text-cyan-700 font-medium"><strong>Completed:</strong> {ex.futurAnt}</p>
                <p className="text-sm text-slate-500">{ex.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * MistakesSection - Common errors with the futur antérieur.
 *
 * Content:
 * - Using simple future when futur antérieur is needed
 * - Not using futur antérieur for completed future actions
 */
function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
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
 * Lesson9Page - Main component for B1 Lesson 9.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B1 components with cyan accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson9Page() {
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
    const saved = localStorage.getItem("b1Lesson9Progress");
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
      localStorage.setItem("b1Lesson9Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-slate-50 flex items-center justify-center"><div className="text-cyan-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B1" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="cyan" /></div>

        {/* Lesson Sections - In Order of Instruction */}
        <WhatIsSection isReviewed={reviewedSections.includes("what-is")} onMarkReviewed={handleMarkReviewed} />
        <FormationSection isReviewed={reviewedSections.includes("formation")} onMarkReviewed={handleMarkReviewed} />
        <UsageSection isReviewed={reviewedSections.includes("usage")} onMarkReviewed={handleMarkReviewed} />
        <ExamplesSection isReviewed={reviewedSections.includes("examples")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-cyan-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="cyan" />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={9} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson10" recapItems={["Futur antérieur formation", "Future auxiliary + past participle", "When to use vs simple future", "Completed before another future action", "Hypothesis about past events"]} accentColor="cyan" />
        )}
      </div>
    </div>
  );
}
