/**
 * B1 Lesson 3 - Relative Pronouns Review (Pronoms Relatifs)
 * ==========================================================
 *
 * This page teaches B1 learners to master French relative pronouns:
 * qui, que, où, and dont, to connect sentences smoothly.
 *
 * **Lesson Structure:**
 * 1. LessonHeader - Title and introduction using lessonMeta
 * 2. QuiSection - Qui as subject pronoun (who/that)
 * 3. QueSection - Que as direct object pronoun (whom/that)
 * 4. OuSection - Où for place and time (where/when)
 * 5. DontSection - Dont with de verbs (of which/about whom)
 * 6. ComparisonSection - Side-by-side comparison of all pronouns
 * 7. SentenceJoiningSection - How to join sentences
 * 8. MistakesSection - Common errors to avoid
 * 9. PracticeSection - Interactive quiz (15 questions)
 * 10. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Qui = subject (does the action)
 * - Que = direct object (receives the action)
 * - Où = place or time
 * - Dont = with de (parler de, se souvenir de, etc.)
 *
 * **Features:**
 * - Uses shared B1 components (SectionCard, ProgressBar, PracticeSection, etc.)
 * - Purple accent color theme
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
  FaBookOpen,       // Dont section
  FaLink,           // Où section / Sentence joining
  FaBalanceScale,   // Comparison section
  FaExclamationTriangle, // Mistakes section
  FaUser,           // Qui section
  FaArrowRight,     // Que section
} from "react-icons/fa";

// Shared B1 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  quiExamples,
  queExamples,
  ouExamples,
  dontExamples,
  pronounComparison,
  sentenceJoiningSteps,
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
 * Features purple/pink gradient background.
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 3</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-purple-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

/**
 * QuiSection - Qui as subject pronoun.
 *
 * Content:
 * - Qui = subject (does the action)
 * - Can refer to people or things
 * - After qui, you'll usually see a verb directly
 */
function QuiSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="qui" title="Qui (Subject)" icon={FaUser} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <p className="text-slate-700">Use <strong>qui</strong> when the pronoun is the subject of the clause:</p>
        <div className="grid gap-3">
          {quiExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-medium text-purple-800">{ex.french}</p>
              <p className="text-sm text-purple-600">{ex.english}</p>
              <p className="text-sm text-slate-500 mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Tip:</strong> After qui, you'll usually see a verb directly.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * QueSection - Que as direct object pronoun.
 *
 * Content:
 * - Que = direct object (receives the action)
 * - After que, you'll usually see a subject + verb
 * - Elides before a vowel (qu')
 */
function QueSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="que" title="Que (Direct Object)" icon={FaArrowRight} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <p className="text-slate-700">Use <strong>que</strong> when the pronoun is the direct object:</p>
        <div className="grid gap-3">
          {queExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-medium text-purple-800">{ex.french}</p>
              <p className="text-sm text-purple-600">{ex.english}</p>
              <p className="text-sm text-slate-500 mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Tip:</strong> After que, you'll usually see a subject + verb.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * OuSection - Où for place and time.
 *
 * Content:
 * - Où = where (place) or when (time)
 * - Does not contract or elide
 * - Used for locations and temporal references
 */
function OuSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="ou" title="Où (Place and Time)" icon={FaLink} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <p className="text-slate-700">Use <strong>où</strong> for places and times:</p>
        <div className="grid gap-3">
          {ouExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-medium text-purple-800">{ex.french}</p>
              <p className="text-sm text-purple-600">{ex.english}</p>
              <p className="text-sm text-slate-500 mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800"><strong>Note:</strong> Où = where (place) or when (time).</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * DontSection - Dont with de verbs.
 *
 * Content:
 * - Dont = of which / about whom / from which
 * - Used with verbs that take de (parler de, se souvenir de)
 * - Replaces de + noun
 */
function DontSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="dont" title="Dont (With 'de')" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <p className="text-slate-700">Use <strong>dont</strong> with verbs that take <strong>de</strong>:</p>
        <div className="grid gap-3">
          {dontExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-medium text-purple-800">{ex.french}</p>
              <p className="text-sm text-purple-600">{ex.english}</p>
              <p className="text-sm text-slate-500 mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-emerald-800"><strong>Common verbs with de:</strong> parler de, se souvenir de, avoir besoin de, parler de</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ComparisonSection - Side-by-side comparison of all relative pronouns.
 *
 * Content:
 * - Qui vs Que vs Où vs Dont
 * - Quick reference table showing usage and examples
 */
function ComparisonSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="comparison" title="Qui vs Que vs Où vs Dont" icon={FaBalanceScale} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <div className="grid gap-3">
          {pronounComparison.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center">
                <span className="font-bold text-purple-700 text-lg">{item.pronoun}</span>
                <span className="text-slate-600">{item.usage}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{item.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * SentenceJoiningSection - How to join sentences with relative pronouns.
 *
 * Content:
 * - Transform two simple sentences into one complex sentence
 * - Examples showing qui and que usage
 */
function SentenceJoiningSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="sentence-joining" title="Joining Sentences" icon={FaLink} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        {sentenceJoiningSteps.map((step, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="grid gap-2">
              <p className="text-slate-600"><strong>Original:</strong> {step.step1}</p>
              <p className="text-purple-800 font-medium">→ {step.step2}</p>
              <p className="text-sm text-slate-500">{step.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/**
 * MistakesSection - Common errors with relative pronouns.
 *
 * Content:
 * - Confusing qui and que (subject vs object)
 * - Forgetting to use dont with de-verbs
 * - Incorrect pronoun choice
 */
function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
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
 * Lesson3Page - Main component for B1 Lesson 3.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B1 components with purple accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson3Page() {
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
    const saved = localStorage.getItem("b1Lesson3Progress");
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
      localStorage.setItem("b1Lesson3Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-50 flex items-center justify-center"><div className="text-purple-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B1" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="purple" /></div>

        {/* Lesson Sections - In Order of Instruction */}
        <QuiSection isReviewed={reviewedSections.includes("qui")} onMarkReviewed={handleMarkReviewed} />
        <QueSection isReviewed={reviewedSections.includes("que")} onMarkReviewed={handleMarkReviewed} />
        <OuSection isReviewed={reviewedSections.includes("ou")} onMarkReviewed={handleMarkReviewed} />
        <DontSection isReviewed={reviewedSections.includes("dont")} onMarkReviewed={handleMarkReviewed} />
        <ComparisonSection isReviewed={reviewedSections.includes("comparison")} onMarkReviewed={handleMarkReviewed} />
        <SentenceJoiningSection isReviewed={reviewedSections.includes("sentence-joining")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="purple" />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={3} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson4" recapItems={["Qui = subject pronoun", "Que = direct object pronoun", "Où = place and time", "Dont = with de verbs", "How to join sentences smoothly"]} accentColor="purple" />
        )}
      </div>
    </div>
  );
}
