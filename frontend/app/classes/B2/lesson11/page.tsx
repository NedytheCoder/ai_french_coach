/**
 * B2 Lesson 11 - Complex Sentence Construction
 * ===============================================
 *
 * This page teaches B2 learners advanced sentence construction techniques
 * including embedding, participles, cleft constructions, and nominalization.
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with slate accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. Complex Constructions Section - Introduction via introSections
 * 5. Clause Embedding Section - Embedding techniques (relative, participial, subordinate)
 * 6. Participles Section - Present and past participles (two-column grid)
 * 7. Subordination Section - Subordination strategies and types
 * 8. Cleft Sentences Section - Focus and emphasis constructions
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Embedding inserts one clause within another for density
 * - Present participle (-ant): Actions simultaneous with main verb
 * - Past participle absolute: Background circumstances, anterior events
 * - Cleft sentences (phrases clivées): Foreground specific information
 * - Subordination establishes logical, temporal, causal relationships
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, etc.)
 * - Slate accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Two-column grid for present/past participle comparison
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
  FaProjectDiagram, // Complex Constructions section
  FaCodeBranch,     // Subordination section
  FaAlignLeft,      // Available but unused
  FaLayerGroup,     // Embedding section
  FaBullseye,       // Clefts section
  FaFont,           // Available but unused
  FaFeather,        // Participles section
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";

// Lesson data imports (all data accessed via data namespace)
import * as data from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson11Page - Main component for B2 Lesson 11.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B2 components with slate accent color
 *
 * All lesson content is accessed via the data namespace import.
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
    const saved = localStorage.getItem("b2Lesson11Progress");
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
      localStorage.setItem("b2Lesson11Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center"><div className="text-slate-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from data.lessonMeta */}
        <LessonHeader lessonNumber={11} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="slate" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="slate" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* Complex Constructions - Introduction to complex sentence construction */}
        <SectionCard id="intro" title="Complex Constructions" icon={FaProjectDiagram} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        {/* Clause Embedding - Relative clause, participial, and subordinate embedding */}
        <SectionCard id="embedding" title={data.embeddingSection.title} icon={FaLayerGroup} isReviewed={reviewedSections.includes("embedding")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700">{data.embeddingSection.explanation}</p>
            <div className="space-y-3">{data.embeddingSection.techniques.map((t, idx) => (<div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{t.technique}</p><p className="text-slate-600">{t.simple} → <span className="text-slate-800 font-medium">{t.embedded}</span></p><p className="text-sm text-slate-500">{t.note}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Participles - Present and past participles (two-column grid) */}
        <SectionCard id="participles" title={data.participlesSection.title} icon={FaFeather} isReviewed={reviewedSections.includes("participles")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700">{data.participlesSection.explanation}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Present participle column */}
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"><h4 className="font-semibold text-emerald-800 mb-2">Present Participle</h4><p className="text-sm text-slate-700 mb-2">{data.participlesSection.presentParticiple.formation}</p><ul className="space-y-1">{data.participlesSection.presentParticiple.examples.map((ex, idx) => (<li key={idx} className="text-sm text-slate-600">{ex.sentence}</li>))}</ul></div>
              {/* Past participle absolute column */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200"><h4 className="font-semibold text-amber-800 mb-2">Past Participle Absolute</h4><p className="text-sm text-slate-700 mb-2">{data.participlesSection.pastParticipleAbsolute.formation}</p><ul className="space-y-1">{data.participlesSection.pastParticipleAbsolute.examples.map((ex, idx) => (<li key={idx} className="text-sm text-slate-600">{ex.sentence}</li>))}</ul></div>
            </div>
          </div>
        </SectionCard>

        {/* Subordination - Temporal, causal, conditional, concessive, final clauses */}
        <SectionCard id="subordination" title={data.subordinationSection.title} icon={FaCodeBranch} isReviewed={reviewedSections.includes("subordination")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700">{data.subordinationSection.explanation}</p>
            <div className="space-y-3">{data.subordinationSection.types.map((t, idx) => (<div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{t.type}</p><p className="text-slate-600">{t.markers}</p><p className="text-slate-500 italic">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Cleft Sentences - Focus and emphasis constructions */}
        <SectionCard id="clefts" title={data.cleftsSection.title} icon={FaBullseye} isReviewed={reviewedSections.includes("clefts")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700">{data.cleftsSection.explanation}</p>
            <div className="space-y-3">{data.cleftsSection.types.map((t, idx) => (<div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{t.type}</p><p className="text-slate-700">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="slate" /></div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={11} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes/B2/lesson12" recapItems={["Clause embedding techniques", "Present and past participles", "Subordination strategies", "Cleft sentences for emphasis", "Nominalization patterns"]} accentColor="slate" />
        )}
      </div>
    </div>
  );
}
