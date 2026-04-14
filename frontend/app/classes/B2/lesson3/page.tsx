"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaFeather, FaClock, FaHistory, FaTheaterMasks, FaBalanceScale } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";
import {
  sectionIds,
  lessonMeta,
  introSections,
  passeSimpleInfo,
  recognitionExamples,
  passeAntérieurInfo,
  passeAntérieurExamples,
  literaryUsageContexts,
  timelineComparisons,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

export default function Lesson3Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson3Progress");
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
      localStorage.setItem("b2Lesson3Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-stone-50 to-slate-50 flex items-center justify-center"><div className="text-stone-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={3} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="stone" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="stone" />
        </div>

        <SectionCard id="intro" title="Literary Tenses" icon={FaBookOpen} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="stone">
          <div className="space-y-6">
            {introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="what-is-passe-simple" title={passeSimpleInfo.title} icon={FaFeather} isReviewed={reviewedSections.includes("what-is-passe-simple")} onMarkReviewed={handleMarkReviewed} accentColor="stone">
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed">{passeSimpleInfo.explanation}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-100"><tr><th className="p-3 text-left text-stone-800">Type</th><th className="p-3 text-left text-stone-800">Example</th><th className="p-3 text-left text-stone-800">Note</th></tr></thead>
                <tbody className="divide-y divide-stone-100">
                  {passeSimpleInfo.formation.map((f, idx) => (<tr key={idx}><td className="p-3 font-medium text-stone-800">{f.type}</td><td className="p-3 text-stone-700 italic">{f.example}</td><td className="p-3 text-slate-600">{f.note}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="recognition" title="Recognition Examples" icon={FaHistory} isReviewed={reviewedSections.includes("recognition")} onMarkReviewed={handleMarkReviewed} accentColor="stone">
          <div className="space-y-3">
            {recognitionExamples.map((ex, idx) => (
              <div key={idx} className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                <p className="font-medium text-stone-800 mb-2">{ex.text}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-2 py-1 bg-stone-200 text-stone-700 rounded">{ex.verb}</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">{ex.meaning}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="passif-anterieur" title={passeAntérieurInfo.title} icon={FaClock} isReviewed={reviewedSections.includes("passif-anterieur")} onMarkReviewed={handleMarkReviewed} accentColor="stone">
          <div className="space-y-4">
            <p className="text-slate-700">{passeAntérieurInfo.explanation}</p>
            <p className="text-sm text-slate-600 italic">{passeAntérieurInfo.usage}</p>
            <div className="space-y-3 mt-4">
              {passeAntérieurExamples.map((ex, idx) => (
                <div key={idx} className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                  <p className="font-medium text-stone-800 mb-1">{ex.text}</p>
                  <p className="text-sm text-slate-600">{ex.breakdown}</p>
                  <p className="text-xs text-stone-500 mt-1">{ex.timeline}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard id="literary-usage" title="Where You Will Encounter These Tenses" icon={FaTheaterMasks} isReviewed={reviewedSections.includes("literary-usage")} onMarkReviewed={handleMarkReviewed} accentColor="stone">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-100"><tr><th className="p-3 text-left text-stone-800">Context</th><th className="p-3 text-left text-stone-800">Example</th><th className="p-3 text-left text-stone-800">Frequency</th></tr></thead>
              <tbody className="divide-y divide-stone-100">
                {literaryUsageContexts.map((ctx, idx) => (<tr key={idx}><td className="p-3 font-medium text-stone-800">{ctx.context}</td><td className="p-3 text-slate-700">{ctx.example}</td><td className="p-3 text-slate-600"><span className="px-2 py-1 bg-stone-100 rounded text-xs">{ctx.frequency}</span></td></tr>))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard id="comparison" title="Timeline Comparison" icon={FaBalanceScale} isReviewed={reviewedSections.includes("comparison")} onMarkReviewed={handleMarkReviewed} accentColor="stone">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-100"><tr><th className="p-3 text-left text-stone-800">Tense</th><th className="p-3 text-left text-stone-800">Example</th><th className="p-3 text-left text-stone-800">Usage</th><th className="p-3 text-left text-stone-800">Level</th></tr></thead>
              <tbody className="divide-y divide-stone-100">
                {timelineComparisons.map((t, idx) => (<tr key={idx}><td className="p-3 font-medium text-stone-800">{t.tense}</td><td className="p-3 text-slate-700 italic">{t.example}</td><td className="p-3 text-slate-600">{t.usage}</td><td className="p-3 text-slate-600">{t.level}</td></tr>))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-stone-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="stone" />
          </div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={3} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson4" recapItems={["Passé simple formation", "Common irregular forms: fut, eut, fit, vit", "Passé antérieur structure", "Recognition in literary texts", "Timeline understanding"]} accentColor="stone" />
        )}
      </div>
    </div>
  );
}
