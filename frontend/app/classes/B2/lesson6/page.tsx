"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaExchangeAlt, FaTable, FaPenFancy, FaUserSecret, FaBullseye, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { SectionCard, ProgressBar, PracticeSection, CompletionSection, LessonNav, LessonHeader } from "../components";
import {
  sectionIds,
  lessonMeta,
  introSections,
  formationInfo,
  tensesTable,
  stylisticChoice,
  agentOmission,
  informationalFocus,
  transformationDrills,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

export default function Lesson6Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("b2Lesson6Progress");
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
      localStorage.setItem("b2Lesson6Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center"><div className="text-teal-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <LessonNav backPath="/classes/B2" />
        <LessonHeader lessonNumber={6} title={lessonMeta.title} subtitle={lessonMeta.subtitle} accentColor="teal" />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-teal-200">
          <ProgressBar current={reviewedSections.length} total={sectionIds.length} label="Lesson Progress" accentColor="teal" />
        </div>

        <SectionCard id="intro" title="Passive Voice Principles" icon={FaExchangeAlt} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-6">{introSections.map((section, idx) => (<div key={idx} className="space-y-2"><h3 className="text-lg font-semibold text-slate-800">{section.title}</h3><p className="text-slate-700 leading-relaxed">{section.content}</p></div>))}</div>
        </SectionCard>

        <SectionCard id="formation" title={formationInfo.title} icon={FaTable} isReviewed={reviewedSections.includes("formation")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-4">
            <p className="text-slate-700 font-medium">{formationInfo.rule}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-teal-100"><tr><th className="p-3 text-left text-teal-800">Tense</th><th className="p-3 text-left text-teal-800">Active</th><th className="p-3 text-left text-teal-800">Passive</th></tr></thead>
                <tbody className="divide-y divide-teal-100">{formationInfo.examples.map((ex, idx) => (<tr key={idx}><td className="p-3 font-medium text-teal-800">{ex.tense}</td><td className="p-3 text-slate-600 italic">{ex.active}</td><td className="p-3 text-slate-700">{ex.passive}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="tenses" title="Passive Across All Tenses" icon={FaTable} isReviewed={reviewedSections.includes("tenses")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-teal-100"><tr><th className="p-3 text-left text-teal-800">Tense</th><th className="p-3 text-left text-teal-800">Être form</th><th className="p-3 text-left text-teal-800">Example</th></tr></thead>
              <tbody className="divide-y divide-teal-100">{tensesTable.map((t, idx) => (<tr key={idx}><td className="p-3 font-medium text-teal-800">{t.tense}</td><td className="p-3 text-slate-700">{t.être}</td><td className="p-3 text-slate-600 italic">{t.example}</td></tr>))}</tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard id="stylistic-choice" title={stylisticChoice.title} icon={FaPenFancy} isReviewed={reviewedSections.includes("stylistic-choice")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-3">Use Active When:</h4>
                <ul className="space-y-2">{stylisticChoice.whenActive.map((item, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{item.situation}:</span> {item.example}</li>))}</ul>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <h4 className="font-semibold text-teal-800 mb-3">Use Passive When:</h4>
                <ul className="space-y-2">{stylisticChoice.whenPassive.map((item, idx) => (<li key={idx} className="text-sm text-slate-700"><span className="font-medium">{item.situation}:</span> {item.example}</li>))}</ul>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard id="agent-omission" title={agentOmission.title} icon={FaUserSecret} isReviewed={reviewedSections.includes("agent-omission")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-4">
            <p className="text-slate-700">{agentOmission.explanation}</p>
            <div className="space-y-3">{agentOmission.scenarios.map((s, idx) => (<div key={idx} className="p-4 bg-teal-50 rounded-lg border border-teal-200"><p className="font-medium text-teal-800">{s.scenario}</p><p className="text-slate-600 italic">{s.example}</p><p className="text-sm text-slate-500">{s.note}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="informational-focus" title={informationalFocus.title} icon={FaBullseye} isReviewed={reviewedSections.includes("informational-focus")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-4">
            <p className="text-slate-700">{informationalFocus.explanation}</p>
            <div className="space-y-3">{informationalFocus.examples.map((ex, idx) => (<div key={idx} className="p-4 bg-white rounded-lg border border-slate-200"><p className="font-medium text-slate-800">{ex.arrangement}</p><p className="text-slate-600 italic">{ex.sentence}</p><p className="text-sm text-teal-600">{ex.critique}</p></div>))}</div>
          </div>
        </SectionCard>

        <SectionCard id="transformation" title="Transformation Drills" icon={FaExchangeAlt} isReviewed={reviewedSections.includes("transformation")} onMarkReviewed={handleMarkReviewed} accentColor="teal">
          <div className="space-y-4">
            {transformationDrills.map((drill, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-1">Active:</p>
                    <p className="text-slate-700">{drill.active}</p>
                  </div>
                  <FaArrowRight className="text-teal-400" />
                  <div className="flex-1">
                    <p className="text-sm text-teal-600 mb-1">Passive:</p>
                    <p className="text-teal-700">{drill.passive}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-2">{drill.note}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-teal-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-teal-50 to-white"><h2 className="text-xl font-semibold text-slate-800">Guided Interactive Practice</h2></div>
          <div className="p-6"><PracticeSection questions={practiceQuestions} isReviewed={reviewedSections.includes("practice")} onMarkReviewed={handleMarkReviewed} onComplete={handlePracticeComplete} getPerformanceMessage={getPerformanceMessage} accentColor="teal" /></div>
        </div>

        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection lessonNumber={6} lessonTitle={lessonMeta.title} practiceScore={practiceScore} totalQuestions={practiceQuestions.length} nextLessonPath="/classes/B2/lesson7" recapItems={["Passive formation: être + participle", "Agreement with new subject", "Passive across all tenses", "Stylistic choice: active vs. passive", "Agent omission strategies", "Information flow management"]} accentColor="teal" />
        )}
      </div>
    </div>
  );
}
