"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaLink, FaTable, FaSitemap, FaCodeBranch, FaEllipsisH } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";
import * as data from "./data";

export default function Lesson8Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson8Progress");
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
      localStorage.setItem("b2Lesson8Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / data.sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center"><div className="text-indigo-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={8} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="indigo" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="indigo" />
        </div>

        <SectionCard id="intro" title="Relative Pronoun Mastery" icon={FaLink} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="indigo">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        <SectionCard id="qui-que-ou" title="Qui, Que, Où Review" icon={FaTable} isReviewed={reviewedSections.includes("qui-que-ou")} onMarkReviewed={handleMarkReviewed} accentColor="indigo">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-100"><tr><th className="p-3 text-left text-indigo-800">Pronoun</th><th className="p-3 text-left text-indigo-800">Function</th><th className="p-3 text-left text-indigo-800">Example</th></tr></thead>
              <tbody className="divide-y divide-indigo-100">{data.basicReview.summary.map((row, idx) => (<tr key={idx}><td className="p-3 font-medium text-indigo-800">{row.pronoun}</td><td className="p-3 text-slate-700">{row.function}</td><td className="p-3 text-slate-600 italic">{row.example}</td></tr>))}</tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard id="dont" title={data.dontSection.title} icon={FaSitemap} isReviewed={reviewedSections.includes("dont")} onMarkReviewed={handleMarkReviewed} accentColor="indigo">
          <div className="space-y-4">
            <p className="text-slate-700">{data.dontSection.explanation}</p>
            <div className="space-y-3">{data.dontSection.uses.map((use, idx) => (<div key={idx} className="p-4 bg-indigo-50 rounded-lg border border-indigo-200"><p className="font-medium text-indigo-800">{use.type}</p><p className="text-slate-700">{use.example}</p><p className="text-sm text-slate-500">{use.meaning}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="lequel" title={data.lequelSection.title} icon={FaCodeBranch} isReviewed={reviewedSections.includes("lequel")} onMarkReviewed={handleMarkReviewed} accentColor="indigo">
          <div className="space-y-4">
            <p className="text-slate-700">{data.lequelSection.explanation}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200"><h4 className="font-semibold text-indigo-800 mb-2">Forms</h4><ul className="space-y-1">{data.lequelSection.forms.map((f, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{f.form}:</span> {f.example}</li>))}</ul></div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200"><h4 className="font-semibold text-purple-800 mb-2">Contractions</h4><ul className="space-y-1">{data.lequelSection.contractions.map((c, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{c.becomes}:</span> {c.example}</li>))}</ul></div>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="ce-qui-que" title={data.ceQuiQueSection.title} icon={FaEllipsisH} isReviewed={reviewedSections.includes("ce-qui-que")} onMarkReviewed={handleMarkReviewed} accentColor="indigo">
          <div className="space-y-4">
            <p className="text-slate-700">{data.ceQuiQueSection.explanation}</p>
            <div className="space-y-3">{data.ceQuiQueSection.usage.map((u, idx) => (<div key={idx} className="p-4 bg-indigo-50 rounded-lg border border-indigo-200"><p className="font-medium text-indigo-800">{u.pronoun} <span className="text-slate-500 font-normal">({u.function})</span></p><p className="text-slate-700">{u.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-indigo-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="indigo" /></div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={8} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes/B2/lesson9" recapItems={["Qui = subject", "Que = direct object", "Où = place/time", "Dont = de-relationship", "Lequel after prepositions", "Ce qui/que/dont = indefinite"]} accentColor="indigo" />
        )}
      </div>
    </div>
  );
}
