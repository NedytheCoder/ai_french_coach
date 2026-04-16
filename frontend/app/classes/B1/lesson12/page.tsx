/**
 * B1 Lesson 12 - Double Object Pronouns (Les Pronoms Objets Doubles)
 * =====================================================================
 *
 * This page teaches B1 learners how to combine multiple object pronouns in
 * French sentences with correct order.
 *
 * **Lesson Structure:**
 * 1. LessonHeader - Title and introduction using lessonMeta
 * 2. OrderSection - Pronoun order rules (1st to 5th position table)
 * 3. MeTeSeSection - 1st position pronouns (me/te/se)
 * 4. LeLaLesSection - 2nd position pronouns (le/la/les)
 * 5. YEnSection - 4th and 5th position pronouns (y + en)
 * 6. ExamplesSection - Common examples with breakdowns
 * 7. MistakesSection - Common errors to avoid
 * 8. PracticeSection - Interactive quiz (15 questions)
 * 9. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Pronoun order: me/te/se → le/la/les → lui/leur → y → en
 * - All pronouns go before the verb (except in positive imperatives)
 * - Y always comes before en
 * - Elision rules: te + y = t'y, se + en = s'en
 *
 * **Features:**
 * - Uses shared B1 components (SectionCard, ProgressBar, PracticeSection, etc.)
 * - Violet accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Order rules displayed in table format
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
  FaSortNumericDown, // Order section
  FaUser,            // Me/te/se section
  FaArrowRight,      // Le/la/les section
  FaMapMarkerAlt,    // Y/en section
  FaBox,             // Box icon
  FaList,            // Examples section
  FaExclamationTriangle, // Mistakes section
} from "react-icons/fa";

// Shared B1 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  orderRules,
  meTeSeExamples,
  leLaLesExamples,
  yEnExamples,
  commonExamples,
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
 * Features violet/fuchsia gradient background.
 */
function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-violet-500 to-fuchsia-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 12</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-violet-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

/**
 * OrderSection - Pronoun order rules in French.
 *
 * Content displayed in table format:
 * - 1st: me/te/se/nous/vous (reflexive/direct/indirect)
 * - 2nd: le/la/les (direct object)
 * - 3rd: lui/leur (indirect object)
 * - 4th: y (place)
 * - 5th: en (quantity)
 */
function OrderSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="order-rules" title="Pronoun Order" icon={FaSortNumericDown} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <p className="text-slate-700">French pronouns appear in this strict order before the verb:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-violet-100">
              <tr>
                <th className="p-2 text-left text-violet-800">Position</th>
                <th className="p-2 text-left text-violet-800">Pronouns</th>
                <th className="p-2 text-left text-violet-800">Type</th>
              </tr>
            </thead>
            <tbody>
              {orderRules.map((rule, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium">{rule.position}</td>
                  <td className="p-2 text-violet-700 font-bold">{rule.pronouns}</td>
                  <td className="p-2 text-slate-600">{rule.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800 font-medium">Memory: "Me/Te/Se Le/La/Les Lui/Leur Y En"</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * MeTeSeSection - 1st position pronouns combined with others.
 *
 * Content:
 * - me + le = me le (Il me le donne)
 * - te + la = te la (Elle te la montre)
 * - se + les = se les (Ils se les achètent)
 */
function MeTeSeSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="me-te-se" title="Me/Te/Se + Another Pronoun" icon={FaUser} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <div className="grid gap-3">
          {meTeSeExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="font-medium text-violet-800">{ex.before}</p>
              <p className="text-sm text-slate-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * LeLaLesSection - 2nd position pronouns combined with others.
 *
 * Content:
 * - le + lui = le lui (Je le lui donne)
 * - la + leur = la leur (Tu la leur envoies)
 * - les + y = les y (Il les y met)
 */
function LeLaLesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="le-la-les" title="Le/La/Les + Another Pronoun" icon={FaArrowRight} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <div className="grid gap-3">
          {leLaLesExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="font-medium text-violet-800">{ex.before}</p>
              <p className="text-sm text-slate-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * YEnSection - 4th and 5th position pronouns (y and en).
 *
 * Content:
 * - y + en = y en (Il y en a)
 * - nous + en = nous en (Elle nous en parle)
 * - vous + y = vous y (Je vous y attends)
 * Key: Y always comes before en
 */
function YEnSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="y-en" title="Y and En Combinations" icon={FaMapMarkerAlt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <div className="grid gap-3">
          {yEnExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="font-medium text-violet-800">{ex.before}</p>
              <p className="text-sm text-slate-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-emerald-800"><strong>Key:</strong> Y always comes before en when both appear.</p>
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * ExamplesSection - Common double pronoun examples with breakdowns.
 *
 * Content:
 * - Mixed examples showing pronoun combinations
 * - Breakdown of each pronoun's function
 * - English translations
 */
function ExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="examples" title="Common Examples" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <div className="grid gap-3">
          {commonExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-medium text-violet-800">{ex.sentence}</p>
              <p className="text-sm text-slate-600">{ex.breakdown}</p>
              <p className="text-slate-700">{ex.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/**
 * MistakesSection - Common errors with double object pronouns.
 *
 * Content:
 * - Wrong pronoun order (me le vs le me)
 * - Putting y after en
 * - Agreement errors with le/la/les
 */
function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
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
 * Lesson12Page - Main component for B1 Lesson 12.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B1 components with violet accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson12Page() {
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
    const saved = localStorage.getItem("b1Lesson12Progress");
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
      localStorage.setItem("b1Lesson12Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-50 flex items-center justify-center"><div className="text-violet-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B1" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="violet" /></div>

        {/* Lesson Sections - In Order of Instruction */}
        <OrderSection isReviewed={reviewedSections.includes("order-rules")} onMarkReviewed={handleMarkReviewed} />
        <MeTeSeSection isReviewed={reviewedSections.includes("me-te-se")} onMarkReviewed={handleMarkReviewed} />
        <LeLaLesSection isReviewed={reviewedSections.includes("le-la-les")} onMarkReviewed={handleMarkReviewed} />
        <YEnSection isReviewed={reviewedSections.includes("y-en")} onMarkReviewed={handleMarkReviewed} />
        <ExamplesSection isReviewed={reviewedSections.includes("examples")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-violet-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="violet" />
          </div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={12} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson13" recapItems={["Pronoun order: me/te/se + le/la/les + lui/leur + y + en", "Direct object before indirect object", "Y before en", "Common double pronoun combinations", "Position before the verb"]} accentColor="violet" />
        )}
      </div>
    </div>
  );
}
