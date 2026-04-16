/**
 * B2 Lesson 9 - Advanced Pronoun System
 * =======================================
 *
 * This page teaches B2 learners the complete French pronoun system including
 * double object pronouns, y, en, and sophisticated ordering rules.
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with rose accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. Pronoun Mastery Section - Introduction via introSections
 * 5. Double Object Section - Pronoun order rules (me/te/se → le/la/les → lui/leur → y → en)
 * 6. Position Section - Affirmative, negative, imperative position rules
 * 7. Y and En Section - Adverbial pronouns (two-column grid)
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Order rule: me/te/se/nous/vous → le/la/les → lui/leur → y → en
 * - 3rd person order flips: Direct before indirect (le + lui)
 * - Y replaces à + place/thing; en replaces de + thing/quantity
 * - Imperative affirmative: Pronouns after verb (me → moi, te → toi)
 * - Imperative negative: Normal position before verb
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, etc.)
 * - Rose accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for y/en comparison
 * - Order rule displayed in monospace font
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
  FaUsers,       // Pronoun Mastery section
  FaListOl,      // Double Object section
  FaMapMarkerAlt, // Y and En section
  FaBoxOpen,     // Available but unused
  FaArrowsAltH,  // Position section
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";

// Lesson data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson9Page - Main component for B2 Lesson 9.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B2 components with rose accent color
 *
 * All lesson content is accessed via the data namespace import.
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
    const saved = localStorage.getItem("b2Lesson9Progress");
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
      localStorage.setItem("b2Lesson9Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center"><div className="text-rose-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from data.lessonMeta */}
        <LessonHeader lessonNumber={9} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="rose" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-rose-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="rose" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* Pronoun Mastery - Introduction to advanced pronoun system */}
        <SectionCard id="intro" title="Pronoun Mastery" icon={FaUsers} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="rose">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        {/* Double Object - Pronoun order: me/te/se → le/la/les → lui/leur → y → en */}
        <SectionCard id="double-object" title={data.doubleObjectSection.title} icon={FaListOl} isReviewed={reviewedSections.includes("double-object")} onMarkReviewed={handleMarkReviewed} accentColor="rose">
          <div className="space-y-4">
            <p className="text-slate-700">{data.doubleObjectSection.explanation}</p>
            {/* Display the order rule in monospace for clarity */}
            <p className="p-3 bg-rose-50 rounded font-mono text-rose-800 text-sm">{data.doubleObjectSection.orderRule}</p>
            <div className="space-y-3">{data.doubleObjectSection.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{ex.combined}</p><p className="text-sm text-rose-600">{ex.pronouns}: {ex.analysis}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Position - Affirmative, negative, and imperative position rules */}
        <SectionCard id="position" title={data.positionSection.title} icon={FaArrowsAltH} isReviewed={reviewedSections.includes("position")} onMarkReviewed={handleMarkReviewed} accentColor="rose">
          <div className="space-y-4">
            <p className="text-slate-700">{data.positionSection.explanation}</p>
            <div className="space-y-3">{data.positionSection.positions.map((pos, idx) => (<div key={idx} className="p-4 bg-rose-50 rounded-lg border border-rose-200"><p className="font-medium text-rose-800">{pos.type}</p><p className="text-slate-700">{pos.example}</p><p className="text-sm text-slate-500">{pos.rule}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Y and En - Adverbial pronouns (two-column grid comparison) */}
        <SectionCard id="y-en" title={data.yEnSection.title} icon={FaMapMarkerAlt} isReviewed={reviewedSections.includes("y-en")} onMarkReviewed={handleMarkReviewed} accentColor="rose">
          <div className="space-y-4">
            <p className="text-slate-700">{data.yEnSection.explanation}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Y = à + place/thing column */}
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"><h4 className="font-semibold text-emerald-800 mb-2">Y (à + place/thing)</h4><ul className="space-y-1">{data.yEnSection.yUses.map((u, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{u.use}:</span> {u.example}</li>))}</ul></div>
              {/* En = de + thing/quantity column */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200"><h4 className="font-semibold text-amber-800 mb-2">En (de + thing/quantity)</h4><ul className="space-y-1">{data.yEnSection.enUses.map((u, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{u.use}:</span> {u.example}</li>))}</ul></div>
            </div>
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-rose-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-rose-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="rose" /></div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={9} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes/B2/lesson10" recapItems={["Order: me/te/se/nous/vous → le/la/les → lui/leur → y → en", "3rd person: direct before indirect", "Y = à + place/thing", "En = de + thing/quantity", "Imperative position changes", "Me/te → moi/toi after affirmative imperative"]} accentColor="rose" />
        )}
      </div>
    </div>
  );
}
