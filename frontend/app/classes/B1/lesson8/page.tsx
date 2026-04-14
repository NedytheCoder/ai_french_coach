"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaHistory, FaGraduationCap, FaLightbulb, FaList, FaExclamationTriangle, FaClock } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";
import {
  sectionIds,
  lessonMeta,
  whatIs,
  formationRules,
  avoirEtre,
  usageCases,
  siClauses,
  commonExamples,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-rose-500 to-pink-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 8</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-rose-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

function WhatIsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="what-is" title="What is the Past Conditional?" icon={FaHistory} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="rose">
      <div className="space-y-4">
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          {whatIs.map((item, idx) => (<li key={idx}>{item}</li>))}
        </ul>
        <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
          <p className="text-rose-800"><strong>In English:</strong> "Would have + past participle" - "I would have gone", "She would have said"</p>
        </div>
      </div>
    </SectionCard>
  );
}

function FormationSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="formation" title="Formation" icon={FaGraduationCap} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="rose">
      <div className="space-y-4">
        <ul className="list-decimal list-inside text-slate-700 space-y-2">
          {formationRules.map((rule, idx) => (<li key={idx}>{rule}</li>))}
        </ul>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead className="bg-rose-100">
              <tr>
                <th className="p-2 text-left text-rose-800">Auxiliary</th>
                <th className="p-2 text-left text-rose-800">je</th>
                <th className="p-2 text-left text-rose-800">tu</th>
                <th className="p-2 text-left text-rose-800">il</th>
                <th className="p-2 text-left text-rose-800">nous</th>
              </tr>
            </thead>
            <tbody>
              {avoirEtre.map((aux, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium">{aux.auxiliary}</td>
                  <td className="p-2">{aux.je}</td>
                  <td className="p-2">{aux.tu}</td>
                  <td className="p-2">{aux.il}</td>
                  <td className="p-2">{aux.nous}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}

function UsageSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="usage" title="Common Uses" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="rose">
      <div className="space-y-4">
        <div className="grid gap-3">
          {usageCases.map((use, idx) => (
            <div key={idx} className="p-4 bg-rose-50 rounded-xl border border-rose-100">
              <p className="font-semibold text-rose-800">{use.case}</p>
              <p className="text-rose-700">{use.example}</p>
              <p className="text-sm text-rose-600">{use.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function ExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="examples" title="Common Examples" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="rose">
      <div className="space-y-4">
        <div className="grid gap-3">
          {commonExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <span className="text-rose-700 font-medium">{ex.french}</span>
              <span className="text-slate-600 text-sm">{ex.english}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function SiClausesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="si-clauses" title="Si Clauses with Past Conditional" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="rose">
      <div className="space-y-4">
        <div className="grid gap-4">
          {siClauses.map((sc, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-bold text-amber-800">{sc.pattern}</p>
              <p className="text-amber-700">{sc.example}</p>
              <p className="text-sm text-amber-600">{sc.note}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
          <p className="text-red-800"><strong>Golden rule:</strong> Never use conditional after si. The conditional (present or past) only appears in the result clause.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="rose">
      <div className="space-y-4">
        {commonMistakes.map((ex, idx) => (
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

export default function Lesson8Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b1Lesson8Progress");
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
      localStorage.setItem("b1Lesson8Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-rose-50 to-slate-50 flex items-center justify-center"><div className="text-rose-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B1" />
        <LessonHeader />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="rose" /></div>
        <WhatIsSection isReviewed={reviewedSections.includes("what-is")} onMarkReviewed={handleMarkReviewed} />
        <FormationSection isReviewed={reviewedSections.includes("formation")} onMarkReviewed={handleMarkReviewed} />
        <UsageSection isReviewed={reviewedSections.includes("usage")} onMarkReviewed={handleMarkReviewed} />
        <ExamplesSection isReviewed={reviewedSections.includes("examples")} onMarkReviewed={handleMarkReviewed} />
        <SiClausesSection isReviewed={reviewedSections.includes("si-clauses")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-rose-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="rose" />
          </div>
        </div>
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={8} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson9" recapItems={["Past conditional formation", "Common uses: regrets, missed opportunities", "Si + plus-que-parfait, conditionnel passé", "Should have / Could have expressions", "Never use conditional after si"]} accentColor="rose" />
        )}
      </div>
    </div>
  );
}
