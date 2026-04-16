/**
 * B1 Lesson 14 - Advanced Connectors and Discourse Markers
 * ==========================================================
 *
 * This page teaches B1 learners sophisticated French linking words for complex
 * expression, including opposition, consequence, purpose, concession, and time connectors.
 *
 * **Lesson Structure:**
 * 1. LessonHeader - Title and introduction using lessonMeta
 * 2. OppositionSection - Opposition connectors (cependant, néanmoins, toutefois)
 * 3. ConsequenceSection - Consequence connectors (par conséquent, en conséquence)
 * 4. PurposeSection - Purpose connectors (dans le but de, afin de)
 * 5. ConcessionSection - Concession connectors (bien que, malgré, même si)
 * 6. TimeSection - Time connectors (pendant que, lorsque, dès que)
 * 7. ExamplesSection - Complete usage examples with breakdowns
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Cependant/néanmoins/toutefois: formal alternatives to "mais"
 * - Par conséquent/en conséquence: formal alternatives to "donc"
 * - Bien que/quoique: require subjunctive
 * - Malgré: followed by noun
 * - Même si: followed by indicative
 *
 * **Features:**
 * - Uses shared B1 components (SectionCard, ProgressBar, PracticeSection, etc.)
 * - Amber accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Formality levels indicated (B1 formal, conversational, formal)
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
  FaNotEqual,        // Opposition section
  FaArrowRight,      // Consequence section
  FaBullseye,        // Purpose section
  FaHandPaper,       // Concession section
  FaClock,           // Time section
  FaList,            // Examples section
  FaGraduationCap,   // Graduation icon
} from "react-icons/fa";

// Shared B1 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  oppositionConnectors,
  consequenceConnectors,
  purposeConnectors,
  concessionConnectors,
  timeConnectors,
  usageExamples,
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
    <div className="bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 14</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-amber-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

/**
 * OppositionSection - Connectors for expressing opposition and contrast.
 *
 * Content:
 * - cependant: however (B1 formal)
 * - néanmoins: nevertheless (B1 formal)
 * - toutefois: however/though (B1 formal)
 * - par contre: on the other hand (conversational)
 * - en revanche: conversely (formal)
 */
function OppositionSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="opposition" title="Opposition" icon={FaNotEqual} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that show contrast or opposition:</p>
        <div className="grid gap-3">
          {oppositionConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex justify-between items-start">
                <p className="font-bold text-amber-800">{conn.connector}</p>
                <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded">{conn.level}</span>
              </div>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ConsequenceSection - Connectors for expressing result and consequence.
 *
 * Content:
 * - par conséquent: consequently (formal)
 * - en conséquence: as a result (formal)
 * - de ce fait: because of this (formal)
 * - c'est pourquoi: that's why (common)
 */
function ConsequenceSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="consequence" title="Consequence & Result" icon={FaArrowRight} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that show logical results:</p>
        <div className="grid gap-3">
          {consequenceConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex justify-between items-start">
                <p className="font-bold text-amber-800">{conn.connector}</p>
                <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded">{conn.level}</span>
              </div>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * PurposeSection - Connectors for expressing purpose and intention.
 *
 * Content:
 * - dans le but de: with the aim of (formal)
 * - dans l'intention de: with the intention of (formal)
 * - afin de / afin que: in order to / so that (common)
 * Note: afin que requires subjunctive
 */
function PurposeSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="purpose" title="Purpose & Aim" icon={FaBullseye} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that show intention:</p>
        <div className="grid gap-3">
          {purposeConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex justify-between items-start">
                <p className="font-bold text-amber-800">{conn.connector}</p>
                <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded">{conn.level}</span>
              </div>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ConcessionSection - Connectors for expressing concession.
 *
 * Content:
 * - bien que: although (+ subjunctive)
 * - quoique: even though (+ subjunctive)
 * - malgré: despite (+ noun)
 * - même si: even if (+ indicative)
 */
function ConcessionSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="concession" title="Concession" icon={FaHandPaper} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that concede a point:</p>
        <div className="grid gap-3">
          {concessionConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-bold text-amber-800">{conn.connector}</p>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
              <p className="text-xs text-amber-600 font-medium mt-1">{conn.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * TimeSection - Time-related connectors.
 *
 * Content:
 * - pendant que: while (simultaneous actions)
 * - lorsque: when (+ imparfait for past)
 * - dès que: as soon as (future after dès que)
 * - au moment où: at the moment when (precise timing)
 */
function TimeSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="time" title="Time & Sequence" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that show temporal relationships:</p>
        <div className="grid gap-3">
          {timeConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-bold text-amber-800">{conn.connector}</p>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
              <p className="text-xs text-amber-600 font-medium mt-1">{conn.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ExamplesSection - Complete usage examples with breakdowns.
 *
 * Content:
 * - Practical examples showing how each connector is used in context
 * - Breakdowns explaining connector meaning and grammatical notes
 */
function ExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="examples" title="Complete Examples" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <div className="grid gap-3">
          {usageExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-medium text-slate-800">{ex.french}</p>
              <p className="text-sm text-amber-600">{ex.breakdown}</p>
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
 * Lesson14Page - Main component for B1 Lesson 14.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B1 components with amber accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson14Page() {
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
    const saved = localStorage.getItem("b1Lesson14Progress");
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
      localStorage.setItem("b1Lesson14Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
        <OppositionSection isReviewed={reviewedSections.includes("opposition")} onMarkReviewed={handleMarkReviewed} />
        <ConsequenceSection isReviewed={reviewedSections.includes("consequence")} onMarkReviewed={handleMarkReviewed} />
        <PurposeSection isReviewed={reviewedSections.includes("purpose")} onMarkReviewed={handleMarkReviewed} />
        <ConcessionSection isReviewed={reviewedSections.includes("concession")} onMarkReviewed={handleMarkReviewed} />
        <TimeSection isReviewed={reviewedSections.includes("time")} onMarkReviewed={handleMarkReviewed} />
        <ExamplesSection isReviewed={reviewedSections.includes("examples")} onMarkReviewed={handleMarkReviewed} />
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
          <CompletionSection lessonNumber={14} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2" recapItems={["Opposition: cependant, néanmoins, toutefois, par contre, en revanche", "Consequence: par conséquent, en conséquence, de ce fait, c'est pourquoi", "Purpose: afin de, dans le but de", "Concession: bien que (subj), même si (ind), malgré", "Time: pendant que, lorsque, dès que, au moment où"]} accentColor="amber" />
        )}
      </div>
    </div>
  );
}
