/**
 * B2 Lesson 4 - Present & Past Subjunctive Full System
 * ======================================================
 *
 * This page teaches B2 learners the complete subjunctive system including
 * all six trigger categories and the past subjunctive.
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with violet accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. The Subjunctive System Section - Introduction via introSections
 * 5. Six Trigger Categories Section - Overview table
 * 6. Concession Section - bien que, quoique with examples
 * 7. Obligation Section - Scale from weak to absolute necessity
 * 8. Emotion Section - Joy, fear, sadness, surprise, disappointment
 * 9. Doubt Section - Certainty scale
 * 10. Purpose Section - pour que, afin que, de peur que
 * 11. Restriction Section - à moins que, pourvu que, avant que
 * 12. Past Subjunctive Section - Complex timelines
 * 13. PracticeSection - Interactive quiz (15 questions)
 * 14. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Six trigger categories: concession, obligation, emotion, doubt, purpose, restriction
 * - Subjunctive signals speaker's attitude (doubt, desire, necessity, emotion)
 * - Past subjunctive: Present subjunctive of auxiliary + past participle
 * - Ne explétif: Extra "ne" after fear expressions
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, etc.)
 * - Violet accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Multiple tables and grid layouts for content
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
  FaBookOpen,        // The Subjunctive System section
  FaBalanceScale,    // Trigger Categories and Concession sections
  FaHeart,           // Emotion section
  FaQuestionCircle,  // Doubt section
  FaBullseye,        // Obligation and Purpose sections
  FaBan,             // Restriction section
  FaClock,           // Past Subjunctive section
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  introSections,
  triggerCategories,
  concessionSection,
  obligationSection,
  emotionSection,
  doubtSection,
  purposeSection,
  restrictionSection,
  pastSubjunctiveSection,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson4Page - Main component for B2 Lesson 4.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B2 components with violet accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson4Page() {
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
    const saved = localStorage.getItem("b2Lesson4Progress");
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
      localStorage.setItem("b2Lesson4Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center"><div className="text-violet-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader lessonNumber={4} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="violet" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-violet-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="violet" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* The Subjunctive System - Introduction to complete trigger system */}
        <SectionCard id="intro" title="The Subjunctive System" icon={FaBookOpen} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-6">
            {introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}
          </div>
        </SectionCard>

        {/* Six Trigger Categories - Overview of all subjunctive triggers (table) */}
        <SectionCard id="triggers" title="Six Trigger Categories" icon={FaBalanceScale} isReviewed={reviewedSections.includes("triggers")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-violet-100"><tr><th className="p-3 text-left text-violet-800">Category</th><th className="p-3 text-left text-violet-800">Triggers</th><th className="p-3 text-left text-violet-800">Example</th></tr></thead>
              <tbody className="divide-y divide-violet-100">{triggerCategories.map((t, idx) => (<tr key={idx}><td className="p-3 font-medium text-violet-800">{t.category}</td><td className="p-3 text-slate-700">{t.trigger}</td><td className="p-3 text-slate-600 italic">{t.example}</td></tr>))}</tbody>
            </table>
          </div>
        </SectionCard>

        {/* Concession - bien que, quoique, malgré que with examples */}
        <SectionCard id="concession" title={concessionSection.title} icon={FaBalanceScale} isReviewed={reviewedSections.includes("concession")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{concessionSection.explanation}</p>
            <div className="space-y-3">{concessionSection.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="font-medium text-violet-800">{ex.sentence}</p><p className="text-sm text-slate-600">{ex.analysis}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Obligation - Scale from weak suggestion to absolute necessity (table) */}
        <SectionCard id="obligation" title={obligationSection.title} icon={FaBullseye} isReviewed={reviewedSections.includes("obligation")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{obligationSection.explanation}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-violet-100"><tr><th className="p-3 text-left text-violet-800">Level</th><th className="p-3 text-left text-violet-800">Expression</th><th className="p-3 text-left text-violet-800">Example</th></tr></thead>
                <tbody className="divide-y divide-violet-100">{obligationSection.scale.map((s, idx) => (<tr key={idx}><td className="p-3 text-slate-600">{s.level}</td><td className="p-3 font-medium text-violet-700">{s.expression}</td><td className="p-3 text-slate-600 italic">{s.example}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        {/* Emotion - Joy, fear, sadness, surprise, disappointment categories */}
        <SectionCard id="emotion" title={emotionSection.title} icon={FaHeart} isReviewed={reviewedSections.includes("emotion")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{emotionSection.explanation}</p>
            <div className="grid gap-3">{emotionSection.categories.map((cat, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="font-medium text-violet-800">{cat.emotion}</p><p className="text-slate-700">{cat.triggers}</p><p className="text-slate-600 italic">{cat.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Doubt - Certainty scale with indicative vs subjunctive */}
        <SectionCard id="doubt" title={doubtSection.title} icon={FaQuestionCircle} isReviewed={reviewedSections.includes("doubt")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{doubtSection.explanation}</p>
            <div className="space-y-2">{doubtSection.scale.map((s, idx) => (<div key={idx} className={`p-3 rounded-lg ${idx < 2 ? "bg-slate-50" : "bg-violet-50"}`}><p className="font-medium text-slate-700">{s.certainty}</p><p className="text-slate-600 italic">{s.expression}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Purpose - pour que, afin que, de peur que with examples */}
        <SectionCard id="purpose" title={purposeSection.title} icon={FaBullseye} isReviewed={reviewedSections.includes("purpose")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{purposeSection.explanation}</p>
            <div className="space-y-3">{purposeSection.triggers.map((t, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="font-medium text-violet-800">{t.trigger} <span className="text-slate-500 font-normal">({t.meaning})</span></p><p className="text-slate-600 italic">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Restriction - à moins que, pourvu que, avant que, en attendant que */}
        <SectionCard id="restriction" title={restrictionSection.title} icon={FaBan} isReviewed={reviewedSections.includes("restriction")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{restrictionSection.explanation}</p>
            <div className="space-y-3">{restrictionSection.triggers.map((t, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="font-medium text-violet-800">{t.trigger} <span className="text-slate-500 font-normal">({t.meaning})</span></p><p className="text-slate-600 italic">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Past Subjunctive - Complex timelines and formation */}
        <SectionCard id="past-subjunctive" title={pastSubjunctiveSection.title} icon={FaClock} isReviewed={reviewedSections.includes("past-subjunctive")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{pastSubjunctiveSection.explanation}</p>
            <p className="text-sm text-slate-600 italic">{pastSubjunctiveSection.formation}</p>
            <div className="space-y-3">{pastSubjunctiveSection.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="text-slate-700"><span className="text-slate-500">Present:</span> {ex.present}</p><p className="text-violet-700"><span className="text-violet-500">Past:</span> {ex.past}</p><p className="text-sm text-slate-600">{ex.note}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-violet-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-violet-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="violet" /></div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={4} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson5" recapItems={["Six trigger categories", "Concession: bien que, quoique", "Emotion and doubt triggers", "Purpose: pour que, afin que", "Restriction: à moins que, pourvu que", "Past subjunctive formation"]} accentColor="violet" />
        )}
      </div>
    </div>
  );
}
