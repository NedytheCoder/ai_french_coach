"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaBalanceScale, FaHeart, FaQuestionCircle, FaBullseye, FaBan, FaClock } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";
import {
  sectionIds,
  lessonMeta,
  introSections,
  triggerCategories,
  concessionSection,
  obligationSection,
  emotionSection,
  doubtSection,
  purposeSection,
  restrictionSection,
  pastSubjunctiveSection,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

export default function Lesson4Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson4Progress");
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
      localStorage.setItem("b2Lesson4Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center"><div className="text-violet-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={4} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="violet" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-violet-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="violet" />
        </div>

        <SectionCard id="intro" title="The Subjunctive System" icon={FaBookOpen} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-6">
            {introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}
          </div>
        </SectionCard>

        <SectionCard id="triggers" title="Six Trigger Categories" icon={FaBalanceScale} isReviewed={reviewedSections.includes("triggers")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-violet-100"><tr><th className="p-3 text-left text-violet-800">Category</th><th className="p-3 text-left text-violet-800">Triggers</th><th className="p-3 text-left text-violet-800">Example</th></tr></thead>
              <tbody className="divide-y divide-violet-100">{triggerCategories.map((t, idx) => (<tr key={idx}><td className="p-3 font-medium text-violet-800">{t.category}</td><td className="p-3 text-slate-700">{t.trigger}</td><td className="p-3 text-slate-600 italic">{t.example}</td></tr>))}</tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard id="concession" title={concessionSection.title} icon={FaBalanceScale} isReviewed={reviewedSections.includes("concession")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{concessionSection.explanation}</p>
            <div className="space-y-3">{concessionSection.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="font-medium text-violet-800">{ex.sentence}</p><p className="text-sm text-slate-600">{ex.analysis}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="obligation" title={obligationSection.title} icon={FaBullseye} isReviewed={reviewedSections.includes("obligation")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{obligationSection.explanation}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-violet-100"><tr><th className="p-3 text-left text-violet-800">Level</th><th className="p-3 text-left text-violet-800">Expression</th><th className="p-3 text-left text-violet-800">Example</th></tr></thead>
                <tbody className="divide-y divide-violet-100">{obligationSection.scale.map((s, idx) => (<tr key={idx}><td className="p-3 text-slate-600">{s.level}</td><td className="p-3 font-medium text-violet-700">{s.expression}</td><td className="p-3 text-slate-600 italic">{s.example}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="emotion" title={emotionSection.title} icon={FaHeart} isReviewed={reviewedSections.includes("emotion")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{emotionSection.explanation}</p>
            <div className="grid gap-3">{emotionSection.categories.map((cat, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="font-medium text-violet-800">{cat.emotion}</p><p className="text-slate-700">{cat.triggers}</p><p className="text-slate-600 italic">{cat.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="doubt" title={doubtSection.title} icon={FaQuestionCircle} isReviewed={reviewedSections.includes("doubt")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{doubtSection.explanation}</p>
            <div className="space-y-2">{doubtSection.scale.map((s, idx) => (<div key={idx} className={`p-3 rounded-lg ${idx < 2 ? "bg-slate-50" : "bg-violet-50"}`}><p className="font-medium text-slate-700">{s.certainty}</p><p className="text-slate-600 italic">{s.expression}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="purpose" title={purposeSection.title} icon={FaBullseye} isReviewed={reviewedSections.includes("purpose")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{purposeSection.explanation}</p>
            <div className="space-y-3">{purposeSection.triggers.map((t, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="font-medium text-violet-800">{t.trigger} <span className="text-slate-500 font-normal">({t.meaning})</span></p><p className="text-slate-600 italic">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="restriction" title={restrictionSection.title} icon={FaBan} isReviewed={reviewedSections.includes("restriction")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{restrictionSection.explanation}</p>
            <div className="space-y-3">{restrictionSection.triggers.map((t, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="font-medium text-violet-800">{t.trigger} <span className="text-slate-500 font-normal">({t.meaning})</span></p><p className="text-slate-600 italic">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="past-subjunctive" title={pastSubjunctiveSection.title} icon={FaClock} isReviewed={reviewedSections.includes("past-subjunctive")} onMarkReviewed={handleMarkReviewed} accentColor="violet">
          <div className="space-y-4">
            <p className="text-slate-700">{pastSubjunctiveSection.explanation}</p>
            <p className="text-sm text-slate-600 italic">{pastSubjunctiveSection.formation}</p>
            <div className="space-y-3">{pastSubjunctiveSection.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-violet-50 rounded-lg border border-violet-200"><p className="text-slate-700"><span className="text-slate-500">Present:</span> {ex.present}</p><p className="text-violet-700"><span className="text-violet-500">Past:</span> {ex.past}</p><p className="text-sm text-slate-600">{ex.note}</p></div>))}</div>
          </div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-violet-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-violet-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="violet" /></div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={4} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson5" recapItems={["Six trigger categories", "Concession: bien que, quoique", "Emotion and doubt triggers", "Purpose: pour que, afin que", "Restriction: à moins que, pourvu que", "Past subjunctive formation"]} accentColor="violet" />
        )}
      </div>
    </div>
  );
}
