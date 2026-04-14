"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaUsers, FaListOl, FaMapMarkerAlt, FaBoxOpen, FaArrowsAltH } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";
import * as data from "./data";

export default function Lesson9Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson9Progress");
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
      localStorage.setItem("b2Lesson9Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / data.sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center"><div className="text-rose-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={9} title={data.lessonMeta.title} subtitle={data.lessonMeta.subtitle} accentColor="rose" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-rose-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Lesson Progress" accentColor="rose" />
        </div>

        <SectionCard id="intro" title="Pronoun Mastery" icon={FaUsers} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="rose">
          <div className="space-y-6">{data.introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        <SectionCard id="double-object" title={data.doubleObjectSection.title} icon={FaListOl} isReviewed={reviewedSections.includes("double-object")} onMarkReviewed={handleMarkReviewed} accentColor="rose">
          <div className="space-y-4">
            <p className="text-slate-700">{data.doubleObjectSection.explanation}</p>
            <p className="p-3 bg-rose-50 rounded font-mono text-rose-800 text-sm">{data.doubleObjectSection.orderRule}</p>
            <div className="space-y-3">{data.doubleObjectSection.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{ex.combined}</p><p className="text-sm text-rose-600">{ex.pronouns}: {ex.analysis}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="position" title={data.positionSection.title} icon={FaArrowsAltH} isReviewed={reviewedSections.includes("position")} onMarkReviewed={handleMarkReviewed} accentColor="rose">
          <div className="space-y-4">
            <p className="text-slate-700">{data.positionSection.explanation}</p>
            <div className="space-y-3">{data.positionSection.positions.map((pos, idx) => (<div key={idx} className="p-4 bg-rose-50 rounded-lg border border-rose-200"><p className="font-medium text-rose-800">{pos.type}</p><p className="text-slate-700">{pos.example}</p><p className="text-sm text-slate-500">{pos.rule}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="y-en" title={data.yEnSection.title} icon={FaMapMarkerAlt} isReviewed={reviewedSections.includes("y-en")} onMarkReviewed={handleMarkReviewed} accentColor="rose">
          <div className="space-y-4">
            <p className="text-slate-700">{data.yEnSection.explanation}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"><h4 className="font-semibold text-emerald-800 mb-2">Y (à + place/thing)</h4><ul className="space-y-1">{data.yEnSection.yUses.map((u, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{u.use}:</span> {u.example}</li>))}</ul></div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200"><h4 className="font-semibold text-amber-800 mb-2">En (de + thing/quantity)</h4><ul className="space-y-1">{data.yEnSection.enUses.map((u, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{u.use}:</span> {u.example}</li>))}</ul></div>
            </div>
          </div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-rose-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-rose-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={data.practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={data.getPerformanceMessage} accentColor="rose" /></div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={9} lessonTitle={data.lessonMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextLessonPath="/classes/B2/lesson10" recapItems={["Order: me/te/se/nous/vous → le/la/les → lui/leur → y → en", "3rd person: direct before indirect", "Y = à + place/thing", "En = de + thing/quantity", "Imperative position changes", "Me/te → moi/toi after affirmative imperative"]} accentColor="rose" />
        )}
      </div>
    </div>
  );
}
