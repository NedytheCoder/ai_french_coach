"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaComments, FaTable, FaClock, FaArrowRight, FaQuestionCircle, FaCalendarAlt } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";
import * as data from "./data";

export default function Lesson7Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson7Progress");
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
      localStorage.setItem("b2Lesson7Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / data.sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center"><div className="text-cyan-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={7} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="cyan" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-cyan-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="cyan" />
        </div>

        <SectionCard id="intro" title="Reporting Speech" icon={FaComments} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        <SectionCard id="tense-shifts" title="Tense Shift Table" icon={FaTable} isReviewed={reviewedSections.includes("tense-shifts")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cyan-100"><tr><th className="p-3 text-left text-cyan-800">Direct</th><th className="p-3 text-left text-cyan-800">Present reporting</th><th className="p-3 text-left text-cyan-800">Past reporting</th><th className="p-3 text-left text-cyan-800">Shift</th></tr></thead>
              <tbody className="divide-y divide-cyan-100">{data.tenseShiftsTable.map((row, idx) => (<tr key={idx}><td className="p-3 italic text-slate-600">{row.direct}</td><td className="p-3 text-slate-700">{row.present}</td><td className="p-3 text-cyan-700">{row.past}</td><td className="p-3 text-sm text-slate-500">{row.shift}</td></tr>))}</tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard id="present-reporting" title={data.presentReporting.title} icon={FaArrowRight} isReviewed={reviewedSections.includes("present-reporting")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-4">
            <p className="text-slate-700">{data.presentReporting.explanation}</p>
            <div className="space-y-3">{data.presentReporting.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-cyan-50 rounded-lg border border-cyan-200"><p className="font-medium text-cyan-800">{ex.reported}</p><p className="text-sm text-slate-600">Direct: {ex.direct}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="past-reporting" title={data.pastReporting.title} icon={FaClock} isReviewed={reviewedSections.includes("past-reporting")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-4">
            <p className="text-slate-700">{data.pastReporting.explanation}</p>
            <p className="text-sm text-cyan-600 font-medium">{data.pastReporting.keyRule}</p>
            <div className="space-y-3">{data.pastReporting.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-cyan-50 rounded-lg border border-cyan-200"><p className="font-medium text-cyan-800">{ex.reported}</p><p className="text-sm text-slate-600">Direct: {ex.direct} → {ex.analysis}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="imperative" title={data.imperativeReporting.title} icon={FaArrowRight} isReviewed={reviewedSections.includes("imperative")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-4">
            <p className="text-slate-700">{data.imperativeReporting.explanation}</p>
            <div className="space-y-3">{data.imperativeReporting.transformations.map((t, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{t.direct} → {t.reported}</p><p className="text-sm text-cyan-600">{t.structure}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="questions" title={data.questionReporting.title} icon={FaQuestionCircle} isReviewed={reviewedSections.includes("questions")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-4">
            <p className="text-slate-700">{data.questionReporting.explanation}</p>
            <div className="space-y-3">{data.questionReporting.types.map((t, idx) => (<div key={idx} className="p-4 bg-cyan-50 rounded-lg border border-cyan-200"><p className="font-medium text-cyan-800">{t.type}</p><p className="text-slate-700">{t.direct} → {t.reported}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="time-words" title={data.timeWordShifts.title} icon={FaCalendarAlt} isReviewed={reviewedSections.includes("time-words")} onMarkReviewed={handleMarkReviewed} accentColor="cyan">
          <div className="space-y-3">{data.timeWordShifts.shifts.map((s, idx) => (<div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{s.original} → {s.becomes}</p><p className="text-sm text-slate-600">{s.example}</p></div>))}</div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-cyan-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-cyan-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="cyan" /></div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={7} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes/B2/lesson8" recapItems={["Présent → imparfait", "Passé composé → plus-que-parfait", "Futur → conditionnel", "Imperative reporting with infinitive", "Question reporting with si", "Time word shifts"]} accentColor="cyan" />
        )}
      </div>
    </div>
  );
}
