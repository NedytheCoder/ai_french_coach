"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaExchangeAlt, FaQuestionCircle, FaComments, FaBalanceScale, FaExclamationTriangle } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";
import {
  sectionIds,
  lessonMeta,
  directVsReported,
  reportingVerbs,
  statementExamples,
  questionExamples,
  tenseConsistency,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-cyan-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 4</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-teal-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

function DirectVsReportedSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="direct-vs-reported" title="Direct vs Reported Speech" icon={FaExchangeAlt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
      <div className="space-y-4">
        <div className="grid gap-4">
          {directVsReported.map((ex, idx) => (
            <div key={idx} className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <div className="grid gap-2">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <p className="text-slate-600 text-sm">Direct:</p>
                  <p className="font-medium text-slate-800">{ex.direct}</p>
                </div>
                <div className="p-2 bg-teal-100 rounded border border-teal-200">
                  <p className="text-teal-700 text-sm">Reported:</p>
                  <p className="font-medium text-teal-900">{ex.reported}</p>
                </div>
                <p className="text-sm text-slate-500">{ex.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function ReportingVerbsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="reporting-verbs" title="Common Reporting Verbs" icon={FaComments} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
      <div className="space-y-4">
        <div className="grid gap-3">
          {reportingVerbs.map((rv, idx) => (
            <div key={idx} className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <p className="font-semibold text-teal-800">{rv.verb}</p>
              <p className="text-sm text-teal-600">{rv.english}</p>
              <p className="text-slate-700 mt-1">{rv.example}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Key point:</strong> Use que for statements, si for yes/no questions.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function StatementsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="reporting-statements" title="Reporting Statements" icon={FaQuoteLeft} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
      <div className="space-y-4">
        <p className="text-slate-700">When reporting statements:</p>
        <ol className="list-decimal list-inside text-slate-700 space-y-2 ml-4">
          <li>Use <strong>dire que</strong> or similar + que</li>
          <li>Change pronouns (je → il/elle, tu → je, nous → ils/elles)</li>
          <li>Remove quotation marks</li>
        </ol>
        <div className="grid gap-3 mt-4">
          {statementExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-600"><strong>Original:</strong> {ex.speaker}</p>
              <p className="text-teal-700 font-medium">Reported: {ex.reported}</p>
              <p className="text-sm text-slate-500">{ex.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function QuestionsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="reporting-questions" title="Reporting Questions" icon={FaQuestionCircle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
      <div className="space-y-4">
        <div className="grid gap-3">
          {questionExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <p className="text-slate-600"><strong>Direct:</strong> {ex.direct}</p>
              <p className="text-teal-700 font-medium">Reported: {ex.reported}</p>
              <p className="text-sm text-teal-600">{ex.type}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-emerald-800"><strong>Yes/No questions:</strong> Use si</p>
          <p className="text-emerald-700"><strong>WH-questions:</strong> Keep the question word (pourquoi, quand, où, etc.)</p>
        </div>
      </div>
    </SectionCard>
  );
}

function TenseSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="tense-changes" title="Tense Changes" icon={FaBalanceScale} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
      <div className="space-y-4">
        <p className="text-slate-700">Tense changes depend on the reporting verb:</p>
        <div className="grid gap-3">
          {tenseConsistency.map((tc, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-600"><strong>Original:</strong> {tc.present}</p>
              <p className="text-teal-700 font-medium">Reported: {tc.reported}</p>
              <p className="text-sm text-slate-500">{tc.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800"><strong>At B1 level:</strong> Focus on present tense reporting. Past tense reporting is more advanced.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="teal">
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

export default function Lesson4Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b1Lesson4Progress");
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
      localStorage.setItem("b1Lesson4Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-50 flex items-center justify-center"><div className="text-teal-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B1" />
        <LessonHeader />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="teal" /></div>
        <DirectVsReportedSection isReviewed={reviewedSections.includes("direct-vs-reported")} onMarkReviewed={handleMarkReviewed} />
        <ReportingVerbsSection isReviewed={reviewedSections.includes("reporting-verbs")} onMarkReviewed={handleMarkReviewed} />
        <StatementsSection isReviewed={reviewedSections.includes("reporting-statements")} onMarkReviewed={handleMarkReviewed} />
        <QuestionsSection isReviewed={reviewedSections.includes("reporting-questions")} onMarkReviewed={handleMarkReviewed} />
        <TenseSection isReviewed={reviewedSections.includes("tense-changes")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-teal-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="teal" />
          </div>
        </div>
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={4} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson5" recapItems={["Direct vs reported speech", "Using dire que for statements", "Using demander si for yes/no questions", "Pronoun changes", "Common reporting verbs"]} accentColor="teal" />
        )}
      </div>
    </div>
  );
}
