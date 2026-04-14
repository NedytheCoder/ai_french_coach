"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaSortNumericDown, FaUser, FaArrowRight, FaMapMarkerAlt, FaBox, FaList, FaExclamationTriangle } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";
import {
  sectionIds,
  lessonMeta,
  orderRules,
  meTeSeExamples,
  leLaLesExamples,
  yEnExamples,
  commonExamples,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-violet-500 to-fuchsia-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 12</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-violet-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

function OrderSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="order-rules" title="Pronoun Order" icon={FaSortNumericDown} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <p className="text-slate-700">French pronouns appear in this strict order before the verb:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-violet-100">
              <tr>
                <th className="p-2 text-left text-violet-800">Position</th>
                <th className="p-2 text-left text-violet-800">Pronouns</th>
                <th className="p-2 text-left text-violet-800">Type</th>
              </tr>
            </thead>
            <tbody>
              {orderRules.map((rule, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium">{rule.position}</td>
                  <td className="p-2 text-violet-700 font-bold">{rule.pronouns}</td>
                  <td className="p-2 text-slate-600">{rule.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800 font-medium">Memory: "Me/Te/Se Le/La/Les Lui/Leur Y En"</p>
        </div>
      </div>
    </SectionCard>
  );
}

function MeTeSeSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="me-te-se" title="Me/Te/Se + Another Pronoun" icon={FaUser} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <div className="grid gap-3">
          {meTeSeExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="font-medium text-violet-800">{ex.before}</p>
              <p className="text-sm text-slate-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function LeLaLesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="le-la-les" title="Le/La/Les + Another Pronoun" icon={FaArrowRight} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <div className="grid gap-3">
          {leLaLesExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="font-medium text-violet-800">{ex.before}</p>
              <p className="text-sm text-slate-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function YEnSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="y-en" title="Y and En Combinations" icon={FaMapMarkerAlt} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <div className="grid gap-3">
          {yEnExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="font-medium text-violet-800">{ex.before}</p>
              <p className="text-sm text-slate-600">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-emerald-800"><strong>Key:</strong> Y always comes before en when both appear.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function ExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="examples" title="Common Examples" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="violet">
      <div className="space-y-4">
        <div className="grid gap-3">
          {commonExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-medium text-violet-800">{ex.sentence}</p>
              <p className="text-sm text-slate-600">{ex.breakdown}</p>
              <p className="text-slate-700">{ex.meaning}</p>
            </div>
          ))}
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

export default function Lesson12Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b1Lesson12Progress");
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
      localStorage.setItem("b1Lesson12Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
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
        <OrderSection isReviewed={reviewedSections.includes("order-rules")} onMarkReviewed={handleMarkReviewed} />
        <MeTeSeSection isReviewed={reviewedSections.includes("me-te-se")} onMarkReviewed={handleMarkReviewed} />
        <LeLaLesSection isReviewed={reviewedSections.includes("le-la-les")} onMarkReviewed={handleMarkReviewed} />
        <YEnSection isReviewed={reviewedSections.includes("y-en")} onMarkReviewed={handleMarkReviewed} />
        <ExamplesSection isReviewed={reviewedSections.includes("examples")} onMarkReviewed={handleMarkReviewed} />
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
          <CompletionSection lessonNumber={12} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson13" recapItems={["Pronoun order: me/te/se + le/la/les + lui/leur + y + en", "Direct object before indirect object", "Y before en", "Common double pronoun combinations", "Position before the verb"]} accentColor="violet" />
        )}
      </div>
    </div>
  );
}
