"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaGavel, FaQuoteLeft, FaStream, FaBalanceScale, FaFlagCheckered, FaAdjust, FaTrophy } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";
import * as data from "./data";

export default function Lesson12Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson12Progress");
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
      localStorage.setItem("b2Lesson12Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / data.sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center"><div className="text-amber-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={12} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="amber" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="amber" />
        </div>

        <SectionCard id="intro" title="Argumentation Mastery" icon={FaGavel} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        <SectionCard id="thesis" title={data.thesisSection.title} icon={FaFlagCheckered} isReviewed={reviewedSections.includes("thesis")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.thesisSection.explanation}</p>
            <div className="space-y-3">{data.thesisSection.patterns.map((p, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{p.pattern}</p><p className="text-slate-700">{p.example}</p><p className="text-sm text-slate-500">{p.strength}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="evidence" title={data.evidenceSection.title} icon={FaQuoteLeft} isReviewed={reviewedSections.includes("evidence")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.evidenceSection.explanation}</p>
            <div className="space-y-3">{data.evidenceSection.markers.map((m, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{m.marker}</p><p className="text-slate-600 italic">{m.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="reasoning" title={data.reasoningSection.title} icon={FaStream} isReviewed={reviewedSections.includes("reasoning")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.reasoningSection.explanation}</p>
            <div className="grid md:grid-cols-2 gap-4">{data.reasoningSection.categories.map((cat, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{cat.category}</p><p className="text-slate-600">{cat.markers.join(", ")}</p><p className="text-sm text-slate-500 italic">{cat.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="objection" title={data.objectionSection.title} icon={FaBalanceScale} isReviewed={reviewedSections.includes("objection")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.objectionSection.explanation}</p>
            <div className="space-y-3">{data.objectionSection.strategies.map((s, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{s.strategy}</p><p className="text-slate-600">{s.pattern}</p><p className="text-sm text-slate-500 italic">{s.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="conclusion" title={data.conclusionSection.title} icon={FaFlagCheckered} isReviewed={reviewedSections.includes("conclusion")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.conclusionSection.explanation}</p>
            <div className="space-y-3">{data.conclusionSection.techniques.map((t, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{t.technique}</p><p className="text-slate-600">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="hedging" title={data.hedgingSection.title} icon={FaAdjust} isReviewed={reviewedSections.includes("hedging")} onMarkReviewed={handleMarkReviewed} accentColor="amber">
          <div className="space-y-4">
            <p className="text-slate-700">{data.hedgingSection.explanation}</p>
            <div className="space-y-3">{data.hedgingSection.devices.map((d, idx) => (<div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200"><p className="font-medium text-amber-800">{d.device}</p><p className="text-slate-600">{d.examples.join(", ")}</p></div>))}</div>
          </div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="amber" /></div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={12} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes" recapItems={["Thesis formulation patterns", "Evidence markers", "Logical reasoning connectors", "Objection handling strategies", "Conclusion techniques", "Hedging and qualification"]} accentColor="amber" />
        )}
      </div>
    </div>
  );
}
