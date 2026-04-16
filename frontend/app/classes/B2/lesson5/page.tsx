/**
 * B2 Lesson 5 - All Hypothesis Structures (Si Clauses)
 * =======================================================
 *
 * This page teaches B2 learners the complete system of French hypothetical
 * expressions using si (if) clauses.
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with emerald accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. Hypothesis Logic Section - Introduction via introSections
 * 5. First Conditional Section - Si + présent → futur (realistic)
 * 6. Second Conditional Section - Si + imparfait → conditionnel (unreal)
 * 7. Third Conditional Section - Si + plus-que-parfait → conditionnel passé (regret)
 * 8. Mixed Conditional Section - Complex time relationships
 * 9. Nuance Section - Degrees of reality scale with golden rule
 * 10. PracticeSection - Interactive quiz (15 questions)
 * 11. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - First conditional: Realistic possibility (If you come, I'll be happy)
 * - Second conditional: Unreal present (If I had money, I'd buy...)
 * - Third conditional: Past regrets (If I had known, I would have come)
 * - Mixed conditionals: Past condition affecting present result
 * - CRITICAL RULE: Never use conditional after si ("Si j'aurais" is ALWAYS wrong)
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, etc.)
 * - Emerald accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Visual structure diagrams for each conditional type
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
  FaLightbulb,      // Hypothesis Logic section
  FaArrowRight,     // First Conditional section
  FaQuestionCircle, // Second Conditional section
  FaHistory,        // Third Conditional section
  FaExchangeAlt,    // Mixed Conditional section
  FaBan,            // Nuance/Golden Rule section
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  introSections,
  firstConditional,
  secondConditional,
  thirdConditional,
  mixedConditional,
  nuanceSection,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson5Page - Main component for B2 Lesson 5.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B2 components with emerald accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson5Page() {
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
    const saved = localStorage.getItem("b2Lesson5Progress");
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
      localStorage.setItem("b2Lesson5Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center"><div className="text-emerald-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader lessonNumber={5} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="emerald" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="emerald" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* Hypothesis Logic - Introduction to conditional logic and tense coordination */}
        <SectionCard id="intro" title="Hypothesis Logic" icon={FaLightbulb} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-6">{introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        {/* First Conditional - Si + présent → futur (realistic possibility) */}
        <SectionCard id="first-conditional" title={firstConditional.title} icon={FaArrowRight} isReviewed={reviewedSections.includes("first-conditional")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            <p className="text-slate-700">{firstConditional.description}</p>
            <div className="flex gap-4 p-4 bg-emerald-50 rounded-lg">
              <div className="text-center"><p className="text-sm text-emerald-600">Si clause</p><p className="font-medium text-emerald-800">{firstConditional.structure.si}</p></div>
              <div className="flex items-center text-emerald-400">→</div>
              <div className="text-center"><p className="text-sm text-emerald-600">Result</p><p className="font-medium text-emerald-800">{firstConditional.structure.result}</p></div>
            </div>
            <div className="space-y-3">{firstConditional.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-emerald-200"><p className="font-medium text-emerald-800">{ex.sentence}</p><p className="text-sm text-slate-600">{ex.meaning} — {ex.nuance}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Second Conditional - Si + imparfait → conditionnel (unreal present) */}
        <SectionCard id="second-conditional" title={secondConditional.title} icon={FaQuestionCircle} isReviewed={reviewedSections.includes("second-conditional")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            <p className="text-slate-700">{secondConditional.description}</p>
            {/* Display the critical "never use conditional after si" warning */}
            <p className="text-sm text-rose-600 font-medium">⚠️ {secondConditional.commonError}</p>
            <div className="flex gap-4 p-4 bg-emerald-50 rounded-lg">
              <div className="text-center"><p className="text-sm text-emerald-600">Si clause</p><p className="font-medium text-emerald-800">{secondConditional.structure.si}</p></div>
              <div className="flex items-center text-emerald-400">→</div>
              <div className="text-center"><p className="text-sm text-emerald-600">Result</p><p className="font-medium text-emerald-800">{secondConditional.structure.result}</p></div>
            </div>
            <div className="space-y-3">{secondConditional.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-emerald-200"><p className="font-medium text-emerald-800">{ex.sentence}</p><p className="text-sm text-slate-600">{ex.meaning} — {ex.nuance}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Third Conditional - Si + plus-que-parfait → conditionnel passé (regret) */}
        <SectionCard id="third-conditional" title={thirdConditional.title} icon={FaHistory} isReviewed={reviewedSections.includes("third-conditional")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            <p className="text-slate-700">{thirdConditional.description}</p>
            <div className="flex gap-4 p-4 bg-emerald-50 rounded-lg">
              <div className="text-center"><p className="text-sm text-emerald-600">Si clause</p><p className="font-medium text-emerald-800">{thirdConditional.structure.si}</p></div>
              <div className="flex items-center text-emerald-400">→</div>
              <div className="text-center"><p className="text-sm text-emerald-600">Result</p><p className="font-medium text-emerald-800">{thirdConditional.structure.result}</p></div>
            </div>
            <div className="space-y-3">{thirdConditional.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-emerald-200"><p className="font-medium text-emerald-800">{ex.sentence}</p><p className="text-sm text-slate-600">{ex.meaning} — {ex.nuance}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Mixed Conditional - Complex time relationships */}
        <SectionCard id="mixed-conditional" title={mixedConditional.title} icon={FaExchangeAlt} isReviewed={reviewedSections.includes("mixed-conditional")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            <p className="text-slate-700">{mixedConditional.description}</p>
            <div className="space-y-3">{mixedConditional.types.map((t, idx) => (<div key={idx} className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"><p className="font-medium text-emerald-800">{t.type}</p><p className="text-sm text-emerald-700">{t.structure}</p><p className="text-slate-600 italic">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Degrees of Reality - Scale from certainty to impossible with golden rule */}
        <SectionCard id="nuance" title={nuanceSection.title} icon={FaBan} isReviewed={reviewedSections.includes("nuance")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            {/* Degrees of reality scale */}
            <div className="space-y-2">{nuanceSection.scale.map((s, idx) => (<div key={idx} className="p-3 rounded-lg bg-emerald-50"><p className="font-medium text-emerald-800">{s.level}</p><p className="text-slate-700 italic">{s.example}</p></div>))}</div>
            {/* Golden Rule - Never use conditional after si */}
            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200 mt-4"><p className="font-medium text-rose-800">⚠️ Golden Rule</p><p className="text-rose-700">{nuanceSection.keyRule}</p></div>
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="emerald" /></div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={5} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson6" recapItems={["First conditional: Si + présent → futur", "Second conditional: Si + imparfait → conditionnel présent", "Third conditional: Si + plus-que-parfait → conditionnel passé", "Golden rule: Never conditional after si", "Mixed conditionals for complex scenarios"]} accentColor="emerald" />
        )}
      </div>
    </div>
  );
}
