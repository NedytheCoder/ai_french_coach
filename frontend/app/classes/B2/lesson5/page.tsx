"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaArrowRight, FaQuestionCircle, FaHistory, FaExchangeAlt, FaBan } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";
import {
  sectionIds,
  lessonMeta,
  introSections,
  firstConditional,
  secondConditional,
  thirdConditional,
  mixedConditional,
  nuanceSection,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

export default function Lesson5Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson5Progress");
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
      localStorage.setItem("b2Lesson5Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center"><div className="text-emerald-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={5} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="emerald" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="emerald" />
        </div>

        <SectionCard id="intro" title="Hypothesis Logic" icon={FaLightbulb} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-6">{introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        <SectionCard id="first-conditional" title={firstConditional.title} icon={FaArrowRight} isReviewed={reviewedSections.includes("first-conditional")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            <p className="text-slate-700">{firstConditional.description}</p>
            <div className="flex gap-4 p-4 bg-emerald-50 rounded-lg">
              <div className="text-center"><p className="text-sm text-emerald-600">Si clause</p><p className="font-medium text-emerald-800">{firstConditional.structure.si}</p></div>
              <div className="flex items-center text-emerald-400">→</div>
              <div className="text-center"><p className="text-sm text-emerald-600">Result</p><p className="font-medium text-emerald-800">{firstConditional.structure.result}</p></div>
            </div>
            <div className="space-y-3">{firstConditional.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-emerald-200"><p className="font-medium text-emerald-800">{ex.sentence}</p><p className="text-sm text-slate-600">{ex.meaning} — {ex.nuance}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="second-conditional" title={secondConditional.title} icon={FaQuestionCircle} isReviewed={reviewedSections.includes("second-conditional")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            <p className="text-slate-700">{secondConditional.description}</p>
            <p className="text-sm text-rose-600 font-medium">⚠️ {secondConditional.commonError}</p>
            <div className="flex gap-4 p-4 bg-emerald-50 rounded-lg">
              <div className="text-center"><p className="text-sm text-emerald-600">Si clause</p><p className="font-medium text-emerald-800">{secondConditional.structure.si}</p></div>
              <div className="flex items-center text-emerald-400">→</div>
              <div className="text-center"><p className="text-sm text-emerald-600">Result</p><p className="font-medium text-emerald-800">{secondConditional.structure.result}</p></div>
            </div>
            <div className="space-y-3">{secondConditional.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-emerald-200"><p className="font-medium text-emerald-800">{ex.sentence}</p><p className="text-sm text-slate-600">{ex.meaning} — {ex.nuance}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="third-conditional" title={thirdConditional.title} icon={FaHistory} isReviewed={reviewedSections.includes("third-conditional")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            <p className="text-slate-700">{thirdConditional.description}</p>
            <div className="flex gap-4 p-4 bg-emerald-50 rounded-lg">
              <div className="text-center"><p className="text-sm text-emerald-600">Si clause</p><p className="font-medium text-emerald-800">{thirdConditional.structure.si}</p></div>
              <div className="flex items-center text-emerald-400">→</div>
              <div className="text-center"><p className="text-sm text-emerald-600">Result</p><p className="font-medium text-emerald-800">{thirdConditional.structure.result}</p></div>
            </div>
            <div className="space-y-3">{thirdConditional.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-emerald-200"><p className="font-medium text-emerald-800">{ex.sentence}</p><p className="text-sm text-slate-600">{ex.meaning} — {ex.nuance}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="mixed-conditional" title={mixedConditional.title} icon={FaExchangeAlt} isReviewed={reviewedSections.includes("mixed-conditional")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            <p className="text-slate-700">{mixedConditional.description}</p>
            <div className="space-y-3">{mixedConditional.types.map((t, idx) => (<div key={idx} className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"><p className="font-medium text-emerald-800">{t.type}</p><p className="text-sm text-emerald-700">{t.structure}</p><p className="text-slate-600 italic">{t.example}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="nuance" title={nuanceSection.title} icon={FaBan} isReviewed={reviewedSections.includes("nuance")} onMarkReviewed={handleMarkReviewed} accentColor="emerald">
          <div className="space-y-4">
            <div className="space-y-2">{nuanceSection.scale.map((s, idx) => (<div key={idx} className="p-3 rounded-lg bg-emerald-50"><p className="font-medium text-emerald-800">{s.level}</p><p className="text-slate-700 italic">{s.example}</p></div>))}</div>
            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200 mt-4"><p className="font-medium text-rose-800">⚠️ Golden Rule</p><p className="text-rose-700">{nuanceSection.keyRule}</p></div>
          </div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="emerald" /></div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={5} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson6" recapItems={["First conditional: Si + présent → futur", "Second conditional: Si + imparfait → conditionnel présent", "Third conditional: Si + plus-que-parfait → conditionnel passé", "Golden rule: Never conditional after si", "Mixed conditionals for complex scenarios"]} accentColor="emerald" />
        )}
      </div>
    </div>
  );
}
