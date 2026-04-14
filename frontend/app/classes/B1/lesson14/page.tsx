"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaNotEqual, FaArrowRight, FaBullseye, FaHandPaper, FaClock, FaList, FaGraduationCap } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav } from "../components";
import {
  sectionIds,
  lessonMeta,
  oppositionConnectors,
  consequenceConnectors,
  purposeConnectors,
  concessionConnectors,
  timeConnectors,
  usageExamples,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">B1 Lesson 14</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{lessonMeta.title}</h1>
      <p className="text-amber-100 text-lg">{lessonMeta.subtitle}</p>
    </div>
  );
}

function OppositionSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="opposition" title="Opposition" icon={FaNotEqual} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that show contrast or opposition:</p>
        <div className="grid gap-3">
          {oppositionConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex justify-between items-start">
                <p className="font-bold text-amber-800">{conn.connector}</p>
                <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded">{conn.level}</span>
              </div>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function ConsequenceSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="consequence" title="Consequence & Result" icon={FaArrowRight} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that show logical results:</p>
        <div className="grid gap-3">
          {consequenceConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex justify-between items-start">
                <p className="font-bold text-amber-800">{conn.connector}</p>
                <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded">{conn.level}</span>
              </div>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function PurposeSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="purpose" title="Purpose & Aim" icon={FaBullseye} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that show intention:</p>
        <div className="grid gap-3">
          {purposeConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex justify-between items-start">
                <p className="font-bold text-amber-800">{conn.connector}</p>
                <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded">{conn.level}</span>
              </div>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function ConcessionSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="concession" title="Concession" icon={FaHandPaper} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that concede a point:</p>
        <div className="grid gap-3">
          {concessionConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-bold text-amber-800">{conn.connector}</p>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
              <p className="text-xs text-amber-600 font-medium mt-1">{conn.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function TimeSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="time" title="Time & Sequence" icon={FaClock} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <p className="text-slate-700">Connectors that show temporal relationships:</p>
        <div className="grid gap-3">
          {timeConnectors.map((conn, idx) => (
            <div key={idx} className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="font-bold text-amber-800">{conn.connector}</p>
              <p className="text-amber-700">{conn.meaning}</p>
              <p className="text-sm text-slate-600">{conn.example}</p>
              <p className="text-xs text-amber-600 font-medium mt-1">{conn.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function ExamplesSection({ isReviewed, onMarkReviewed }: { isReviewed: boolean; onMarkReviewed: (id: string) => void }) {
  return (
    <SectionCard id="examples" title="Complete Examples" icon={FaList} isReviewed={isReviewed} onMarkReviewed={onMarkReviewed} accentColor="amber">
      <div className="space-y-4">
        <div className="grid gap-3">
          {usageExamples.map((ex, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="font-medium text-slate-800">{ex.french}</p>
              <p className="text-sm text-amber-600">{ex.breakdown}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

export default function Lesson14Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b1Lesson14Progress");
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
      localStorage.setItem("b1Lesson14Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-50 flex items-center justify-center"><div className="text-amber-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B1" />
        <LessonHeader />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"><ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="amber" /></div>
        <OppositionSection isReviewed={reviewedSections.includes("opposition")} onMarkReviewed={handleMarkReviewed} />
        <ConsequenceSection isReviewed={reviewedSections.includes("consequence")} onMarkReviewed={handleMarkReviewed} />
        <PurposeSection isReviewed={reviewedSections.includes("purpose")} onMarkReviewed={handleMarkReviewed} />
        <ConcessionSection isReviewed={reviewedSections.includes("concession")} onMarkReviewed={handleMarkReviewed} />
        <TimeSection isReviewed={reviewedSections.includes("time")} onMarkReviewed={handleMarkReviewed} />
        <ExamplesSection isReviewed={reviewedSections.includes("examples")} onMarkReviewed={handleMarkReviewed} />
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white">
            <h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="amber" />
          </div>
        </div>
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={14} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2" recapItems={["Opposition: cependant, néanmoins, toutefois, par contre, en revanche", "Consequence: par conséquent, en conséquence, de ce fait, c'est pourquoi", "Purpose: afin de, dans le but de", "Concession: bien que (subj), même si (ind), malgré", "Time: pendant que, lorsque, dès que, au moment où"]} accentColor="amber" />
        )}
      </div>
    </div>
  );
}
