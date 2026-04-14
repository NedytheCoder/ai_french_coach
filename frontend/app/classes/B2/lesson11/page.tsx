"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaProjectDiagram, FaCodeBranch, FaAlignLeft, FaLayerGroup, FaBullseye, FaFont, FaFeather } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";
import * as data from "./data";

export default function Lesson11Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson11Progress");
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
      localStorage.setItem("b2Lesson11Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / data.sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center"><div className="text-slate-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={11} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="slate" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="slate" />
        </div>

        <SectionCard id="intro" title="Complex Constructions" icon={FaProjectDiagram} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        <SectionCard id="embedding" title={data.embeddingSection.title} icon={FaLayerGroup} isReviewed={reviewedSections.includes("embedding")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700">{data.embeddingSection.explanation}</p>
            <div className="space-y-3">{data.embeddingSection.techniques.map((t, idx) => (<div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{t.technique}</p><p className="text-slate-600">{t.simple} → <span className="text-slate-800 font-medium">{t.embedded}</span></p><p className="text-sm text-slate-500">{t.note}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="participles" title={data.participlesSection.title} icon={FaFeather} isReviewed={reviewedSections.includes("participles")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700">{data.participlesSection.explanation}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"><h4 className="font-semibold text-emerald-800 mb-2">Present Participle</h4><p className="text-sm text-slate-700 mb-2">{data.participlesSection.presentParticiple.formation}</p><ul className="space-y-1">{data.participlesSection.presentParticiple.examples.map((ex, idx) => (<li key={idx} className="text-sm text-slate-600">{ex.sentence}</li>))}</ul></div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200"><h4 className="font-semibold text-amber-800 mb-2">Past Participle Absolute</h4><p className="text-sm text-slate-700 mb-2">{data.participlesSection.pastParticipleAbsolute.formation}</p><ul className="space-y-1">{data.participlesSection.pastParticipleAbsolute.examples.map((ex, idx) => (<li key={idx} className="text-sm text-slate-600">{ex.sentence}</li>))}</ul></div>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="subordination" title={data.subordinationSection.title} icon={FaCodeBranch} isReviewed={reviewedSections.includes("subordination")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700">{data.subordinationSection.explanation}</p>
            <div className="space-y-3">{data.subordinationSection.types.map((t, idx) => (<div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{t.type}</p><p className="text-slate-600">{t.markers}</p><p className="text-slate-500 italic">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="clefts" title={data.cleftsSection.title} icon={FaBullseye} isReviewed={reviewedSections.includes("clefts")} onMarkReviewed={handleMarkReviewed} accentColor="slate">
          <div className="space-y-4">
            <p className="text-slate-700">{data.cleftsSection.explanation}</p>
            <div className="space-y-3">{data.cleftsSection.types.map((t, idx) => (<div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{t.type}</p><p className="text-slate-700">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-slate-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="slate" /></div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={11} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes/B2/lesson12" recapItems={["Clause embedding techniques", "Present and past participles", "Subordination strategies", "Cleft sentences for emphasis", "Nominalization patterns"]} accentColor="slate" />
        )}
      </div>
    </div>
  );
}
