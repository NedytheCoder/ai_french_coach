"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaSmile, FaQuestionCircle, FaExclamation, FaLink, FaList, FaExclamationTriangle } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";
import {
  sectionIds,
  lessonMeta,
  emotionTriggers,
  doubtTriggers,
  necessityTriggers,
  conjunctionTriggers,
  fullPatterns,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 6</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-emerald-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

function EmotionSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="emotion" title="Emotion & Sentiment" icon={FaSmile} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="emerald">
      <div className="space-y-4">
        <p className="text-slate-700">Expressions of emotion always trigger the subjunctive:</p>
        <div className="grid gap-3">
          {emotionTriggers.map((trig, idx) => (
            <div key={idx} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="font-semibold text-emerald-800">{trig.phrase}</p>
              <p className="text-slate-700">{trig.example}</p>
              <p className="text-sm text-emerald-600">{trig.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function DoubtSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="doubt" title="Doubt & Uncertainty" icon={FaQuestionCircle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="emerald">
      <div className="space-y-4">
        <p className="text-slate-700">Doubt and uncertainty require the subjunctive:</p>
        <div className="grid gap-3">
          {doubtTriggers.map((trig, idx) => (
            <div key={idx} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="font-semibold text-emerald-800">{trig.phrase}</p>
              <p className="text-slate-700">{trig.example}</p>
              <p className="text-sm text-emerald-600">{trig.note}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800"><strong>Important:</strong> Certainty (savoir que, être certain que, il est vrai que) uses indicative.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function NecessitySection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="necessity" title="Necessity & Importance" icon={FaExclamation} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="emerald">
      <div className="space-y-4">
        <p className="text-slate-700">Necessity and importance expressions trigger subjunctive:</p>
        <div className="grid gap-3">
          {necessityTriggers.map((trig, idx) => (
            <div key={idx} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="font-semibold text-emerald-800">{trig.phrase}</p>
              <p className="text-slate-700">{trig.example}</p>
              <p className="text-sm text-emerald-600">{trig.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function ConjunctionsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="conjunctions" title="Subjunctive Conjunctions" icon={FaLink} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="emerald">
      <div className="space-y-4">
        <p className="text-slate-700">These conjunctions always trigger the subjunctive:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-emerald-100">
              <tr>
                <th className="p-2 text-left text-emerald-800">Conjunction</th>
                <th className="p-2 text-left text-emerald-800">Meaning</th>
                <th className="p-2 text-left text-emerald-800">Example</th>
              </tr>
            </thead>
            <tbody>
              {conjunctionTriggers.map((conj, idx) => (
                <tr key={idx} className="border-b border-slate-100">
                  <td className="p-2 font-medium">{conj.conjunction}</td>
                  <td className="p-2 text-slate-600">{conj.meaning}</td>
                  <td className="p-2 text-slate-700">{conj.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}

function PatternsSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="full-patterns" title="Complete Pattern Summary" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="emerald">
      <div className="space-y-4">
        {fullPatterns.map((pat, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="font-semibold text-emerald-800 mb-2">{pat.category}</p>
            <p className="text-sm text-slate-600 mb-2">{pat.triggers.join(", ")}</p>
            <p className="text-slate-700">{pat.example}</p>
          </div>
        ))}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Memory trick:</strong> RED NINJA - Régret, Émotion, Doute, Nécessité, Impersonnel (expressions), Négation (ne pas penser), Je voudrais, Afin que</p>
        </div>
      </div>
    </SectionCard>
  );
}

function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="emerald">
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

export default function Lesson6Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b1Lesson6Progress");
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
      localStorage.setItem("b1Lesson6Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-50 flex items-center justify-center"><div className="text-emerald-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B1" />
        <LessonHeader />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="emerald" /></div>
        <EmotionSection isReviewed={reviewedSections.includes("emotion")} onMarkReviewed={handleMarkReviewed} />
        <DoubtSection isReviewed={reviewedSections.includes("doubt")} onMarkReviewed={handleMarkReviewed} />
        <NecessitySection isReviewed={reviewedSections.includes("necessity")} onMarkReviewed={handleMarkReviewed} />
        <ConjunctionsSection isReviewed={reviewedSections.includes("conjunctions")} onMarkReviewed={handleMarkReviewed} />
        <PatternsSection isReviewed={reviewedSections.includes("full-patterns")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="emerald" />
          </div>
        </div>
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={6} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson7" recapItems={["Emotion triggers subjunctive", "Doubt triggers subjunctive", "Necessity triggers subjunctive", "Specific conjunctions trigger subjunctive", "Certainty uses indicative"]} accentColor="emerald" />
        )}
      </div>
    </div>
  );
}
