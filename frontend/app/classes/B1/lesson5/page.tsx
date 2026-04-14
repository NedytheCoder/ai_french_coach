"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaCloud, FaListOl, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";
import {
  sectionIds,
  lessonMeta,
  hypothesisTypes,
  siPatterns,
  realHypotheses,
  unrealPresentExamples,
  unrealPastExamples,
  commonPitfalls,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-cyan-500 to-blue-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 5</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-cyan-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

function WhatAreHypothesesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="what-are-hypotheses" title="What are Hypotheses?" icon={FaCloud} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        <p className="text-slate-700">Hypotheses are sentences that express conditions and their results:</p>
        <div className="grid gap-3">
          {hypothesisTypes.map((ht, idx) => (
            <div key={idx} className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
              <p className="font-semibold text-cyan-800">{ht.type}</p>
              <p className="text-sm text-slate-600">{ht.definition}</p>
              <p className="text-cyan-700 mt-1">{ht.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function SiPatternsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="si-patterns" title="The Three Si Patterns" icon={FaListOl} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        <div className="grid gap-4">
          {siPatterns.map((sp, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border-2 border-cyan-100">
              <p className="font-bold text-cyan-800 mb-2">{sp.pattern}</p>
              <p className="text-sm text-slate-500 mb-2">{sp.usage}</p>
              <p className="text-slate-700">{sp.example}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
          <p className="text-red-800"><strong>Golden rule:</strong> Never use conditional after si. The conditional only appears in the result clause.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function RealSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="real-hypotheses" title="Real Hypotheses" icon={FaCheckCircle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        <p className="text-slate-700">Real hypotheses talk about likely or possible situations:</p>
        <div className="grid gap-3">
          {realHypotheses.map((rh, idx) => (
            <div key={idx} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="font-medium text-emerald-800">Si {rh.si}, {rh.result}</p>
              <p className="text-sm text-emerald-600">{rh.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800"><strong>Structure:</strong> Si + présent, futur simple</p>
        </div>
      </div>
    </SectionCard>
  );
}

function UnrealPresentSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="unreal-present" title="Unreal Present (Wishes)" icon={FaCloud} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        <p className="text-slate-700">Unreal present describes imaginary situations contrary to reality:</p>
        <div className="grid gap-3">
          {unrealPresentExamples.map((up, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-medium text-purple-800">{up.si}, {up.result}</p>
              <p className="text-sm text-purple-600">{up.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Structure:</strong> Si + imparfait, conditionnel présent</p>
        </div>
      </div>
    </SectionCard>
  );
}

function UnrealPastSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="unreal-past" title="Unreal Past (Regrets)" icon={FaTimesCircle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        <p className="text-slate-700">Unreal past expresses regrets about things that didn't happen:</p>
        <div className="grid gap-3">
          {unrealPastExamples.map((up, idx) => (
            <div key={idx} className="p-4 bg-rose-50 rounded-xl border border-rose-100">
              <p className="font-medium text-rose-800">{up.si}, {up.result}</p>
              <p className="text-sm text-rose-600">{up.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="text-indigo-800"><strong>Structure:</strong> Si + plus-que-parfait, conditionnel passé</p>
        </div>
      </div>
    </SectionCard>
  );
}

function PitfallsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="common-pitfalls" title="Common Pitfalls" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="cyan">
      <div className="space-y-4">
        {commonPitfalls.map((ex, idx) => (
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

export default function Lesson5Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b1Lesson5Progress");
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
      localStorage.setItem("b1Lesson5Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-slate-50 flex items-center justify-center"><div className="text-cyan-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B1" />
        <LessonHeader />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="cyan" /></div>
        <WhatAreHypothesesSection isReviewed={reviewedSections.includes("what-are-hypotheses")} onMarkReviewed={handleMarkReviewed} />
        <SiPatternsSection isReviewed={reviewedSections.includes("si-patterns")} onMarkReviewed={handleMarkReviewed} />
        <RealSection isReviewed={reviewedSections.includes("real-hypotheses")} onMarkReviewed={handleMarkReviewed} />
        <UnrealPresentSection isReviewed={reviewedSections.includes("unreal-present")} onMarkReviewed={handleMarkReviewed} />
        <UnrealPastSection isReviewed={reviewedSections.includes("unreal-past")} onMarkReviewed={handleMarkReviewed} />
        <PitfallsSection isReviewed={reviewedSections.includes("common-pitfalls")} onMarkReviewed={handleMarkReviewed} />
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-cyan-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="cyan" />
          </div>
        </div>
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={5} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson6" recapItems={["Three si patterns", "Real hypotheses: présent + futur", "Unreal present: imparfait + conditionnel", "Unreal past: plus-que-parfait + conditionnel passé", "Never use conditional after si"]} accentColor="cyan" />
        )}
      </div>
    </div>
  );
}
