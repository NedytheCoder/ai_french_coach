"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUserTie, FaComments, FaPenFancy, FaBalanceScale, FaExclamationCircle } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader, ComparisonCard } from "../components";
import {
  sectionIds,
  lessonMeta,
  introSections,
  tuVsVous,
  formalMarkers,
  informalMarkers,
  rewritingExamples,
  comparisonTable,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

export default function Lesson1Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson1Progress");
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
      localStorage.setItem("b2Lesson1Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-50 flex items-center justify-center"><div className="text-slate-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={1} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="slate" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="slate" />
        </div>

        <SectionCard id="intro" title="Understanding Register" icon={FaGraduationCap} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-6">
            {introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="tu-vs-vous" title={tuVsVous.title} icon={FaUserTie} isReviewed={reviewedSections.includes("tu-vs-vous")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed">{tuVsVous.explanation}</p>
            <div className="grid gap-3">
              {tuVsVous.examples.map((ex, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-slate-700">{ex.context}</span>
                    <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-sm">{ex.choice}</span>
                  </div>
                  <p className="text-sm text-slate-600">{ex.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard id="formal-markers" title={formalMarkers.title} icon={FaPenFancy} isReviewed={reviewedSections.includes("formal-markers")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100"><tr><th className="p-3 text-left text-slate-700">Feature</th><th className="p-3 text-left text-slate-700">Example</th><th className="p-3 text-left text-slate-700">Note</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {formalMarkers.features.map((f, idx) => (<tr key={idx}><td className="p-3 font-medium text-slate-800">{f.feature}</td><td className="p-3 text-slate-700 italic">{f.example}</td><td className="p-3 text-slate-600">{f.note}</td></tr>))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard id="informal-markers" title={informalMarkers.title} icon={FaComments} isReviewed={reviewedSections.includes("informal-markers")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100"><tr><th className="p-3 text-left text-slate-700">Feature</th><th className="p-3 text-left text-slate-700">Example</th><th className="p-3 text-left text-slate-700">Note</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {informalMarkers.features.map((f, idx) => (<tr key={idx}><td className="p-3 font-medium text-slate-800">{f.feature}</td><td className="p-3 text-slate-700 italic">{f.example}</td><td className="p-3 text-slate-600">{f.note}</td></tr>))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard id="rewriting" title="Register Transformation" icon={FaPenFancy} isReviewed={reviewedSections.includes("rewriting")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            {rewritingExamples.map((ex, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{ex.note}</p>
                <p className="text-slate-800"><span className="font-medium text-slate-600">Neutral:</span> {ex.neutral}</p>
                <p className="text-slate-800"><span className="font-medium text-emerald-600">Formal:</span> {ex.formal}</p>
                <p className="text-slate-800"><span className="font-medium text-amber-600">Informal:</span> {ex.informal}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="comparison" title="Context-Based Comparison" icon={FaBalanceScale} isReviewed={reviewedSections.includes("comparison")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <ComparisonCard title="Register by Situation" items={comparisonTable.map(row => ({ label: row.situation, content: `${row.formal} / ${row.neutral} / ${row.informal}` }))} accentColor="slate" />
        </SectionCard>

        <SectionCard id="mistakes" title="Common Register Errors" icon={FaExclamationCircle} isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            {commonMistakes.map((mistake, idx) => (
              <div key={idx} className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                <p className="font-medium text-rose-800 mb-1">Error: {mistake.wrong}</p>
                <p className="text-sm text-rose-700 mb-1">Problem: {mistake.problem}</p>
                <p className="text-sm text-emerald-700">Solution: {mistake.solution}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="slate" />
          </div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={1} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson2" recapItems={["Three registers: soutenu, courant, familier", "Tu vs vous in social context", "Formal markers: subjunctive, conditional, passive", "Informal markers: dropped ne, elisions, fillers", "Register transformation techniques"]} accentColor="slate" />
        )}
      </div>
    </div>
  );
}
