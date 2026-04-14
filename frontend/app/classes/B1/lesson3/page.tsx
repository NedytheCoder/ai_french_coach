"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaLink, FaBalanceScale, FaExclamationTriangle, FaUser, FaArrowRight } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";
import {
  sectionIds,
  lessonMeta,
  quiExamples,
  queExamples,
  ouExamples,
  dontExamples,
  pronounComparison,
  sentenceJoiningSteps,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 3</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-purple-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

function QuiSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="qui" title="Qui (Subject)" icon={FaUser} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <p className="text-slate-700">Use <strong>qui</strong> when the pronoun is the subject of the clause:</p>
        <div className="grid gap-3">
          {quiExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-medium text-purple-800">{ex.french}</p>
              <p className="text-sm text-purple-600">{ex.english}</p>
              <p className="text-sm text-slate-500 mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Tip:</strong> After qui, you'll usually see a verb directly.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function QueSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="que" title="Que (Direct Object)" icon={FaArrowRight} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <p className="text-slate-700">Use <strong>que</strong> when the pronoun is the direct object:</p>
        <div className="grid gap-3">
          {queExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-medium text-purple-800">{ex.french}</p>
              <p className="text-sm text-purple-600">{ex.english}</p>
              <p className="text-sm text-slate-500 mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800"><strong>Tip:</strong> After que, you'll usually see a subject + verb.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function OuSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="ou" title="Où (Place and Time)" icon={FaLink} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <p className="text-slate-700">Use <strong>où</strong> for places and times:</p>
        <div className="grid gap-3">
          {ouExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-medium text-purple-800">{ex.french}</p>
              <p className="text-sm text-purple-600">{ex.english}</p>
              <p className="text-sm text-slate-500 mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800"><strong>Note:</strong> Où = where (place) or when (time).</p>
        </div>
      </div>
    </SectionCard>
  );
}

function DontSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="dont" title="Dont (With 'de')" icon={FaBookOpen} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <p className="text-slate-700">Use <strong>dont</strong> with verbs that take <strong>de</strong>:</p>
        <div className="grid gap-3">
          {dontExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-medium text-purple-800">{ex.french}</p>
              <p className="text-sm text-purple-600">{ex.english}</p>
              <p className="text-sm text-slate-500 mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-emerald-800"><strong>Common verbs with de:</strong> parler de, se souvenir de, avoir besoin de, parler de</p>
        </div>
      </div>
    </SectionCard>
  );
}

function ComparisonSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="comparison" title="Qui vs Que vs Où vs Dont" icon={FaBalanceScale} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        <div className="grid gap-3">
          {pronounComparison.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center">
                <span className="font-bold text-purple-700 text-lg">{item.pronoun}</span>
                <span className="text-slate-600">{item.usage}</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{item.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function SentenceJoiningSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="sentence-joining" title="Joining Sentences" icon={FaLink} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
      <div className="space-y-4">
        {sentenceJoiningSteps.map((step, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="grid gap-2">
              <p className="text-slate-600"><strong>Original:</strong> {step.step1}</p>
              <p className="text-purple-800 font-medium">→ {step.step2}</p>
              <p className="text-sm text-slate-500">{step.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function MistakesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="mistakes" title="Common Mistakes" icon={FaExclamationTriangle} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="purple">
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

export default function Lesson3Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b1Lesson3Progress");
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
      localStorage.setItem("b1Lesson3Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-50 flex items-center justify-center"><div className="text-purple-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B1" />
        <LessonHeader />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="purple" /></div>
        <QuiSection isReviewed={reviewedSections.includes("qui")} onMarkReviewed={handleMarkReviewed} />
        <QueSection isReviewed={reviewedSections.includes("que")} onMarkReviewed={handleMarkReviewed} />
        <OuSection isReviewed={reviewedSections.includes("ou")} onMarkReviewed={handleMarkReviewed} />
        <DontSection isReviewed={reviewedSections.includes("dont")} onMarkReviewed={handleMarkReviewed} />
        <ComparisonSection isReviewed={reviewedSections.includes("comparison")} onMarkReviewed={handleMarkReviewed} />
        <SentenceJoiningSection isReviewed={reviewedSections.includes("sentence-joining")} onMarkReviewed={handleMarkReviewed} />
        <MistakesSection isReviewed={reviewedSections.includes("mistakes")} onMarkReviewed={handleMarkReviewed} />
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="purple" />
          </div>
        </div>
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={3} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B1/lesson4" recapItems={["Qui = subject pronoun", "Que = direct object pronoun", "Où = place and time", "Dont = with de verbs", "How to join sentences smoothly"]} accentColor="purple" />
        )}
      </div>
    </div>
  );
}
