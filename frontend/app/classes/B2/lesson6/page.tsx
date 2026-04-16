/**
 * B2 Lesson 6 - Advanced Passive Voice
 * =======================================
 *
 * This page teaches B2 learners advanced passive voice constructions across
 * all tenses and stylistic usage patterns.
 *
 * **Lesson Structure:**
 * 1. LessonNav - Navigation back to B2 lessons
 * 2. LessonHeader - Title with teal accent color
 * 3. ProgressBar - Lesson completion progress
 * 4. Passive Voice Principles Section - Introduction via introSections
 * 5. Passive Formation Section - Rule and examples table
 * 6. Tenses Section - Passive conjugation across all tenses (table)
 * 7. Stylistic Choice Section - When to use active vs passive (two-column grid)
 * 8. Agent Omission Section - Scenarios for omitting the agent
 * 9. Informational Focus Section - Topic vs comment structure
 * 10. Transformation Drills Section - Active to passive exercises
 * 11. PracticeSection - Interactive quiz (15 questions)
 * 12. CompletionSection - Lesson completion with recap
 *
 * **Key Concepts:**
 * - Passive formation: Être (conjugated) + past participle (agrees with subject)
 * - Agent is optional and often omitted (unknown, unimportant, diplomatic)
 * - Passive creates formality, objectivity, and emphasis on action/recipient
 * - Active preferred for clarity, directness, everyday conversation
 * - Information flow: French prefers known → new (passive helps achieve this)
 *
 * **Features:**
 * - Uses shared B2 components (SectionCard, LessonHeader, etc.)
 * - Teal accent color theme
 * - localStorage persistence for progress
 * - 15-question interactive quiz
 * - Multiple tables for formation and tenses
 * - Two-column grid for stylistic choice comparison
 * - Visual transformation drills with arrow indicators
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
  FaExchangeAlt,      // Passive Voice Principles and Transformation Drills sections
  FaTable,            // Passive Formation and Tenses sections
  FaPenFancy,         // Stylistic Choice section
  FaUserSecret,       // Agent Omission section
  FaBullseye,         // Informational Focus section
  FaArrowRight,       // Transformation arrow
  FaArrowLeft,        // Available but unused in this lesson
} from "react-icons/fa";

// Shared B2 components
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";

// Lesson data imports
import {
  sectionIds,
  lessonMeta,
  introSections,
  formationInfo,
  tensesTable,
  stylisticChoice,
  agentOmission,
  informationalFocus,
  transformationDrills,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

/**
 * Lesson6Page - Main component for B2 Lesson 6.
 *
 * Manages:
 * - Section review state
 * - Practice quiz score and completion
 * - Progress persistence to localStorage
 * - Uses shared B2 components with teal accent color
 *
 * @returns JSX.Element - The lesson page
 */
export default function Lesson6Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson6Progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviewedSections(parsed.reviewedSections || []);
        setPracticeScore(parsed.practiceScore || 0);
        setPracticeCompleted(parsed.practiceCompleted || false);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("b2Lesson6Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center"><div className="text-teal-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <LessonNav backPath="/classes/B2" />

        {/* Lesson Header with title from lessonMeta */}
        <LessonHeader lessonNumber={6} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="teal" />

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-teal-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="teal" />
        </div>

        {/* Lesson Sections - In Order of Instruction */}
        {/* Passive Voice Principles - Introduction to passive voice concepts */}
        <SectionCard id="intro" title="Passive Voice Principles" icon={FaExchangeAlt} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-6">{introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        {/* Passive Formation - Rule and examples across tenses (table) */}
        <SectionCard id="formation" title={formationInfo.title} icon={FaTable} isReviewed={reviewedSections.includes("formation")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-4">
            <p className="text-slate-700 font-medium">{formationInfo.rule}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-teal-100"><tr><th className="p-3 text-left text-teal-800">Tense</th><th className="p-3 text-left text-teal-800">Active</th><th className="p-3 text-left text-teal-800">Passive</th></tr></thead>
                <tbody className="divide-y divide-teal-100">{formationInfo.examples.map((ex, idx) => (<tr key={idx}><td className="p-3 font-medium text-teal-800">{ex.tense}</td><td className="p-3 text-slate-600 italic">{ex.active}</td><td className="p-3 text-slate-700">{ex.passive}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        {/* Passive Across All Tenses - Conjugation table */}
        <SectionCard id="tenses" title="Passive Across All Tenses" icon={FaTable} isReviewed={reviewedSections.includes("tenses")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-teal-100"><tr><th className="p-3 text-left text-teal-800">Tense</th><th className="p-3 text-left text-teal-800">Être form</th><th className="p-3 text-left text-teal-800">Example</th></tr></thead>
              <tbody className="divide-y divide-teal-100">{tensesTable.map((t, idx) => (<tr key={idx}><td className="p-3 font-medium text-teal-800">{t.tense}</td><td className="p-3 text-slate-700">{t.être}</td><td className="p-3 text-slate-600 italic">{t.example}</td></tr>))}</tbody>
            </table>
          </div>
        </SectionCard>

        {/* Stylistic Choice - When to use active vs passive (two-column grid) */}
        <SectionCard id="stylistic-choice" title={stylisticChoice.title} icon={FaPenFancy} isReviewed={reviewedSections.includes("stylistic-choice")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Use Active When column */}
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-3">Use Active When:</h4>
                <ul className="space-y-2">{stylisticChoice.whenActive.map((item, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{item.situation}:</span> {item.example}</li>))}</ul>
              </div>
              {/* Use Passive When column */}
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <h4 className="font-semibold text-teal-800 mb-3">Use Passive When:</h4>
                <ul className="space-y-2">{stylisticChoice.whenPassive.map((item, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{item.situation}:</span> {item.example}</li>))}</ul>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Agent Omission - When and why to omit the par + agent phrase */}
        <SectionCard id="agent-omission" title={agentOmission.title} icon={FaUserSecret} isReviewed={reviewedSections.includes("agent-omission")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-4">
            <p className="text-slate-700">{agentOmission.explanation}</p>
            <div className="space-y-3">{agentOmission.scenarios.map((s, idx) => (<div key={idx} className="p-4 bg-teal-50 rounded-lg border border-teal-200"><p className="font-medium text-teal-800">{s.scenario}</p><p className="text-slate-600 italic">{s.example}</p><p className="text-sm text-slate-500">{s.note}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Informational Focus - Topic vs comment information structure */}
        <SectionCard id="informational-focus" title={informationalFocus.title} icon={FaBullseye} isReviewed={reviewedSections.includes("informational-focus")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-4">
            <p className="text-slate-700">{informationalFocus.explanation}</p>
            <div className="space-y-3">{informationalFocus.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{ex.arrangement}</p><p className="text-slate-600 italic">{ex.sentence}</p><p className="text-sm text-teal-600">{ex.critique}</p></div>))}</div>
          </div>
        </SectionCard>

        {/* Transformation Drills - Active to passive exercises with visual arrows */}
        <SectionCard id="transformation" title="Transformation Drills" icon={FaExchangeAlt} isReviewed={reviewedSections.includes("transformation")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-4">
            {transformationDrills.map((drill, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-4">
                  {/* Active sentence side */}
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-1">Active:</p>
                    <p className="text-slate-700">{drill.active}</p>
                  </div>
                  {/* Transformation arrow */}
                  <FaArrowRight className="text-teal-400" />
                  {/* Passive sentence side */}
                  <div className="flex-1">
                    <p className="text-sm text-teal-600 mb-1">Passive:</p>
                    <p className="text-teal-700">{drill.passive}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-2">{drill.note}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Practice Section - 15 Question Quiz */}
        <div className="bg-white rounded-xl shadow-sm border border-teal-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-teal-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="teal" /></div>
        </div>

        {/* Completion Section - Shown when practice is done */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={6} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson7" recapItems={["Passive formation: être + participle", "Agreement with new subject", "Passive across all tenses", "Stylistic choice: active vs. passive", "Agent omission strategies", "Information flow management"]} accentColor="teal" />
        )}
      </div>
    </div>
  );
}
