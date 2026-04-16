"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaTheaterMasks, FaLayerGroup, FaUniversity, FaBriefcase, FaComments, FaQuestionCircle } from "react-icons/fa";
import { ModuleHeader, ProgressBar, PracticeSection, CompletionCard, ModuleNav, SectionCard, NuanceBlock, WeakStrongExpertCard } from "../components";
import * as data from "./data";

export default function Module2Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("c2Module2Progress");
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
      localStorage.setItem("c2Module2Progress", JSON.stringify({ reviewedSections, practiceScore, practiceCompleted }));
    }
  }, [reviewedSections, practiceScore, practiceCompleted, isClient]);

  const handleMarkReviewed = (id: string) => { setReviewedSections((prev) => (prev.includes(id) ? prev : [...prev, id])); };
  const handlePracticeComplete = (score: number) => { setPracticeScore(score); setPracticeCompleted(true); };
  const progress = useMemo(() => Math.round((reviewedSections.length / data.sectionIds.length) * 100), [reviewedSections]);

  if (!isClient) return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center"><div className="text-indigo-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <ModuleNav backPath="/classes/C2/module1" />
        <ModuleHeader moduleNumber={2} title={data.moduleMeta.title} subtitle={data.moduleMeta.subtitle} />
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <ProgressBar current={reviewedSections.length} total={data.sectionIds.length} label="Module Progress" />
        </div>

        <SectionCard id="intro" title="Register Mastery" icon={FaTheaterMasks} isReviewed={reviewedSections.includes("intro")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-6">
            {data.introSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                <p className="text-slate-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="register-spectrum" title="The Four Registers" icon={FaLayerGroup} isReviewed={reviewedSections.includes("register-spectrum")} onMarkReviewed={handleMarkReviewed}>
          <div className="space-y-4">
            {data.registerSpectrum.registers.map((reg, idx) => (
              <div key={idx} className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2 mb-2">
                  {idx === 0 ? <FaUniversity className="text-indigo-600" /> : idx === 1 ? <FaBriefcase className="text-indigo-600" /> : <FaComments className="text-indigo-600" />}
                  <p className="font-semibold text-indigo-800">{reg.register}</p>
                </div>
                <p className="text-sm text-slate-600 mb-2">{reg.markers}</p>
                <p className="text-slate-700 italic text-sm">{reg.example}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <NuanceBlock title="Register Flexibility" highlight="Same meaning, different styles">
          <p className="text-slate-700 mb-4">C2 mastery means expressing the same idea appropriately across contexts:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-indigo-100"><tr><th className="p-3 text-left text-indigo-800">Context</th><th className="p-3 text-left text-indigo-800">Academic</th><th className="p-3 text-left text-indigo-800">Professional</th><th className="p-3 text-left text-indigo-800">Conversational</th></tr></thead>
              <tbody className="divide-y divide-indigo-100">
                {data.registerShifts.shifts.map((shift, idx) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-slate-800">{shift.context}</td>
                    <td className="p-3 text-slate-600 italic text-xs">{shift.academic}</td>
                    <td className="p-3 text-slate-600 italic text-xs">{shift.professional}</td>
                    <td className="p-3 text-slate-600 italic text-xs">{shift.conversational}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NuanceBlock>

        <SectionCard id="weak-strong-expert" title="Register Progression" icon={FaTheaterMasks} isReviewed={reviewedSections.includes("weak-strong-expert")} onMarkReviewed={handleMarkReviewed}>
          <WeakStrongExpertCard examples={data.weakStrongExpertExamples} />
        </SectionCard>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-white border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2"><FaQuestionCircle /> Register Practice</h2>
          </div>
          <div className="p-6">
            <PracticeSection questions={data.practiceQuestions} onComplete={handlePracticeComplete} getResultMessage={data.getResultMessage} />
          </div>
        </div>

        {practiceCompleted && (
          <CompletionCard moduleNumber={2} moduleTitle={data.moduleMeta.title} practiceScore={practiceScore} totalQuestions={data.practiceQuestions.length} nextModulePath="/classes/C2/module3" recapItems={["Four registers: Academic, Professional, Neutral, Conversational", "Academic markers: nominalization, hedging", "Professional markers: conditional courtesy", "Conversational markers: fillers, idioms", "Register shifting based on audience", "Traditional courtesy formulas"]} />
        )}
      </div>
    </div>
  );
}
