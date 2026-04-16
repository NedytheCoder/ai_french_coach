/**
 * B2 Lesson 2 - Idiomatic Expressions (Expressions Idiomatiques)
 * ================================================================
 *
 * This page teaches B2 learners high-frequency French idioms that make speech
 * natural and culturally attuned.
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with amber accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. Understanding Idioms Section - Introduction via introSections
 * 5. High-Frequency Idioms Section - Table of idioms with meanings/registers
 * 6. Context Matters Section - When to use/when not to use idioms
 * 7. Usage vs Misuse Section - Correct vs incorrect examples
 * 8. Idioms in Context Section - Mini dialogues showing usage
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Idioms carry cultural wisdom and shared understanding
 * - Literal translation often produces nonsense
 * - Register awareness is crucial (formal, neutral, informal, very informal)
 * - Some idioms have literary origins (e.g., avoir le cafard from Camus)
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, etc.)
 * - Amber accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Table format for idioms with columns: Idiom, Literal, Meaning, Context
 * - Mini dialogues showing idioms in conversation
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
  FaLightbulb,         // Understanding Idioms section
  FaLanguage,          // High-Frequency Idioms section
  FaComments,          // Idioms in Context section
  FaExclamationTriangle, // Usage vs Misuse section
  FaBookOpen,          // Book icon (available but unused in this lesson)
  FaTheaterMasks,      // Context Matters section
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  introSections,
  commonIdioms,
  contextExamples,
  usageVsMisuse,
  miniDialogues,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson2Page - Main component for B2 Lesson 2.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B2 components with amber accent color
 *
 * Unlike B2 Lesson 1, this page uses SectionCard components inline
 * rather than the ComparisonCard component.
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson2Page() {
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
    const saved = localStorage.getItem("b2Lesson2Progress");
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
      localStorage.setItem("b2Lesson2Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center"><div className="text-amber-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader lessonNumber={2} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="amber" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="amber" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* Understanding Idioms - Introduction to why idioms matter */}
        <SectionCard id="intro" title="Understanding Idioms" icon={FaLightbulb} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-6">
            {introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* High-Frequency Idioms - Table of idioms with meanings and registers */}
        <SectionCard id="common-idioms" title="High-Frequency French Idioms" icon={FaLanguage} isReviewed={reviewedSections.includes("common-idioms")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-amber-100"><tr><th className="p-3 text-left text-amber-800">Idiom</th><th className="p-3 text-left text-amber-800">Literal</th><th className="p-3 text-left text-amber-800">Meaning</th><th className="p-3 text-left text-amber-800">Context</th></tr></thead>
              <tbody className="divide-y divide-amber-100">
                {commonIdioms.map((idiom, idx) => (<tr key={idx}><td className="p-3 font-medium text-amber-800">{idiom.idiom}</td><td className="p-3 text-slate-600 italic">{idiom.literal}</td><td className="p-3 text-slate-800">{idiom.meaning}</td><td className="p-3 text-slate-600"><span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">{idiom.context}</span></td></tr>))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Context Matters - When to use and when not to use idioms */}
        <SectionCard id="context-matters" title="Context Determines Appropriateness" icon={FaTheaterMasks} isReviewed={reviewedSections.includes("context-matters")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            {contextExamples.map((ex, idx) => (
              <div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800 mb-1">{ex.idiom}</p>
                <p className="text-slate-700 mb-2">Meaning: {ex.meaning}</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <p className="text-emerald-700"><strong>Use when:</strong> {ex.whenToUse}</p>
                  <p className="text-rose-700"><strong>Avoid when:</strong> {ex.whenNot}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Usage vs Misuse - Correct vs incorrect idiom usage examples */}
        <SectionCard id="usage-misuse" title="Usage vs. Misuse" icon={FaExclamationTriangle} isReviewed={reviewedSections.includes("usage-misuse")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            {usageVsMisuse.map((ex, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border border-slate-200">
                <p className="text-emerald-700 font-medium mb-1">✓ {ex.correct}</p>
                <p className="text-rose-700 mb-1">✗ {ex.incorrect}</p>
                <p className="text-sm text-slate-600">{ex.explanation}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Idioms in Context - Mini dialogues showing idioms in conversation */}
        <SectionCard id="dialogues" title="Idioms in Context" icon={FaComments} isReviewed={reviewedSections.includes("dialogues")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-6">
            {miniDialogues.map((dialogue, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-3">{dialogue.context}</p>
                <div className="space-y-2">
                  {dialogue.dialogue.map((line, lineIdx) => (
                    <p key={lineIdx} className={line.speaker === "A" ? "text-slate-700" : "text-amber-700 font-medium pl-4"}>
                      <span className="font-bold">{line.speaker}:</span> {line.text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="amber" />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={2} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson3" recapItems={["High-frequency idioms", "Literal vs. actual meaning", "Register awareness with idioms", "Context appropriateness", "Common idioms in dialogue"]} accentColor="amber" />
        )}
      </div>
    </div>
  );
}
