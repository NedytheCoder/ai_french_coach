"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaGraduationCap, FaLightbulb, FaBalanceScale, FaExclamationTriangle, FaQuestionCircle } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";
import {
  sectionIds,
  lessonMeta,
  whatIsSubjunctive,
  triggerPhrases,
  formationRules,
  regularExamples,
  irregularSubjunctives,
  subjunctiveVsIndicative,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-violet-500 to-purple-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 2</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-violet-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

function WhatIsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="what-is-subjunctive" title="What is the Subjunctive?" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          {whatIsSubjunctive.map((item, idx) => (<li key={idx}>{item}</li>))}
        </ul>
        <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
          <p className="text-violet-800"><strong>Think of it this way:</strong> The subjunctive is used for things that are not yet real, or that express subjectivity.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function TriggersSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="triggers" title="Common Triggers" icon={FaLightbulb} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <p className="text-slate-700">These phrases typically introduce the subjunctive:</p>
        <div className="grid gap-3">
          {triggerPhrases.map((trig, idx) => (
            <div key={idx} className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="font-semibold text-violet-800">{trig.phrase} ({trig.english})</p>
              <p className="text-slate-700">{trig.example}</p>
              <p className="text-sm text-violet-600">{trig.exampleEnglish}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function FormationSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="formation" title="Formation" icon={FaGraduationCap} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <ul className="list-disc list-inside text-slate-700 space-y-2">
          {formationRules.map((rule, idx) => (<li key={idx}>{rule}</li>))}
        </ul>
        <div className="grid gap-3 mt-4">
          {regularExamples.map((ex, idx) => (
            <div key={idx} className="p-3 bg-violet-50 rounded-lg border border-violet-100">
              <p className="font-medium text-violet-800">{ex.infinitive}: ils {ex.ils} → stem: {ex.stem}</p>
              <p className="text-sm text-slate-600">{ex.je}, {ex.tu}...</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function CommonVerbsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="common-verbs" title="Common Irregular Verbs" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <p className="text-slate-700">These high-frequency verbs have irregular subjunctive forms:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-violet-100">
              <tr>
                <th className="p-2 text-left text-violet-800">Infinitive</th>
                <th className="p-2 text-left text-violet-800">je</th>
                <th className="p-2 text-left text-violet-800">tu</th>
                <th className="p-2 text-left text-violet-800">il</th>
              </tr>
            </thead>
            <tbody>
              {irregularSubjunctives.map((verb, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium">{verb.infinitive}</td>
                  <td className="p-2">{verb.je}</td>
                  <td className="p-2">{verb.tu}</td>
                  <td className="p-2">{verb.il}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}

function VsIndicativeSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="vs-indicative" title="Subjunctive vs Indicative" icon={FaBalanceScale} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <div className="grid gap-3">
          {subjunctiveVsIndicative.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${item.mood === "Subjunctive" ? "bg-violet-50 border-violet-100" : "bg-blue-50 border-blue-100"}`}>
              <p className={`font-semibold ${item.mood === "Subjunctive" ? "text-violet-800" : "text-blue-800"}`}>{item.mood}: {item.context}</p>
              <p className="text-slate-700">{item.example}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Key rule:</strong> Indicative = facts/reality. Subjunctive = uncertainty/desire/emotion.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
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

export default function Lesson2Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b1Lesson2Progress");
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
      localStorage.setItem("b1Lesson2Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-50 flex items-center justify-center"><div className="text-violet-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B1" />
        <LessonHeader />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="violet" /></div>
        <WhatIsSection isReviewed={reviewedSections.includes("what-is-subjunctive")} onMarkReviewed={handleMarkReviewed} />
        <TriggersSection isReviewed={reviewedSections.includes("triggers")} onMarkReviewed={handleMarkReviewed} />
        <FormationSection isReviewed={reviewedSections.includes("formation")} onMarkReviewed={handleMarkReviewed} />
        <CommonVerbsSection isReviewed={reviewedSections.includes("common-verbs")} onMarkReviewed={handleMarkReviewed} />
        <VsIndicativeSection isReviewed={reviewedSections.includes("vs-indicative")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-violet-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="violet" />
          </div>
        </div>
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={2} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson3" recapItems={["When to use subjunctive vs indicative", "Common triggers: il faut que, je veux que, bien que", "Formation from ils stem", "Irregular subjunctive forms (être, avoir, aller, faire)", "Difference between doubt and certainty"]} accentColor="violet" />
        )}
      </div>
    </div>
  );
}
