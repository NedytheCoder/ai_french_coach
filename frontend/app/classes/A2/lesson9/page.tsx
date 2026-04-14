"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaLightbulb,
  FaExchangeAlt,
  FaCogs,
  FaCheck,
  FaUser,
  FaClock,
  FaInfoCircle,
  FaBookOpen,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaTrophy,
  FaRedo,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import {
  sectionIds,
  activeVsPassiveExamples,
  passiveFormationSteps,
  agreementExamples,
  agentExamples,
  tenseExamples,
  passiveUses,
  guidedExamples,
  commonMistakes,
  practiceQuestions,
  getPerformanceMessage,
} from "./data";

// Types
interface SectionCardProps {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}

// Components
function SectionCard({
  id,
  title,
  icon: Icon,
  children,
  isReviewed,
  onMarkReviewed,
}: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-amber-50 to-white hover:from-amber-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500 rounded-xl text-white">
            <Icon size={24} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 text-left">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {isReviewed && (
            <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <FaCheckCircle size={16} />
              Reviewed
            </span>
          )}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaArrowRight className="rotate-90 text-slate-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              {children}
              {!isReviewed && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onMarkReviewed(id)}
                  className="mt-6 flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-colors font-medium"
                >
                  <FaCheckCircle size={18} />
                  Mark as reviewed
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LessonHeader() {
  return (
    <div className="bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
          A2 Lesson 9
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">The Passive Voice</h1>
      <p className="text-amber-100 text-lg">
        Learn how to say that something is done by someone in French.
      </p>
      <p className="mt-4 text-sm text-amber-50">
        Read the explanations, compare active and passive patterns, and complete the practice to build confidence.
      </p>
    </div>
  );
}

function ProgressBar({
  current,
  total,
  label,
}: {
  current: number;
  total: number;
  label: string;
}) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-slate-600">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
        />
      </div>
    </div>
  );
}

// Section Components
function WhatIsPassiveSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="what-is-passive"
      title="What is the Passive Voice?"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In the <strong>active voice</strong>, the subject does the action.
        </p>
        <p className="text-slate-700 leading-relaxed">
          In the <strong>passive voice</strong>, the subject receives the action.
        </p>
        <p className="text-slate-700 leading-relaxed">
          The passive voice is useful when the result or receiver of the action is more important than the person doing it.
        </p>

        <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium mb-2 inline-block">
                Active
              </span>
              <p className="font-medium text-slate-800">Le professeur explique la leçon.</p>
              <p className="text-sm text-slate-500">The teacher explains the lesson.</p>
            </div>
            <div>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-sm font-medium mb-2 inline-block">
                Passive
              </span>
              <p className="font-medium text-slate-800">La leçon est expliquée par le professeur.</p>
              <p className="text-sm text-slate-500">The lesson is explained by the teacher.</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-amber-800">
                <strong>Key points:</strong>
              </p>
              <ul className="list-disc list-inside text-amber-700 space-y-1">
                <li>The same idea is expressed, but the focus changes</li>
                <li>In the passive voice, the thing receiving the action becomes the subject</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function ActiveVsPassiveSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="active-vs-passive"
      title="Active Voice vs Passive Voice"
      icon={FaExchangeAlt}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          The passive voice changes how we look at a sentence. Let's see how:
        </p>

        {activeVsPassiveExamples.map((ex, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                  Active
                </span>
                <p className="font-medium text-slate-800 mt-1">{ex.active}</p>
                <p className="text-sm text-slate-500">{ex.activeEnglish}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                  Passive
                </span>
                <p className="font-medium text-slate-800 mt-1">{ex.passive}</p>
                <p className="text-sm text-slate-500">{ex.passiveEnglish}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 p-4 bg-slate-100 rounded-xl">
          <h4 className="font-semibold text-slate-800 mb-3">How the transformation works:</h4>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">1.</span>
              <span>The direct object of the active sentence becomes the subject of the passive sentence</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">2.</span>
              <span>The active subject can appear after <strong>par</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">3.</span>
              <span>The verb changes form in the passive sentence (être + past participle)</span>
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

function FormationSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="formation"
      title="How to Form the Passive Voice"
      icon={FaCogs}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
          <p className="font-semibold text-amber-800 text-lg text-center">
            subject + être + past participle (+ par + agent)
          </p>
        </div>

        <p className="text-slate-700">Steps to transform an active sentence:</p>

        <div className="space-y-4">
          {[
            "Identify the direct object in the active sentence",
            "Move it to subject position",
            "Conjugate être",
            "Use the past participle of the main verb",
            "Add par + agent if needed",
          ].map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-semibold text-sm">
                {idx + 1}
              </span>
              <span className="text-slate-700 pt-1">{step}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {passiveFormationSteps.map((ex, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <p className="text-sm font-medium text-slate-500 mb-3">Active: {ex.active}</p>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-medium w-20">Step 1:</span>
                  <span className="text-slate-700">{ex.step1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-medium w-20">Step 2:</span>
                  <span className="text-slate-700">{ex.step2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-medium w-20">Step 3:</span>
                  <span className="text-slate-700">{ex.step3}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-medium w-20">Step 4:</span>
                  <span className="text-slate-700">{ex.step4}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-100 rounded-lg">
                <p className="font-semibold text-amber-800">{ex.result}</p>
                <p className="text-sm text-amber-700">{ex.english}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800">
            <strong>Remember:</strong> The passive voice needs <strong>être</strong>. The past participle agrees with the new subject.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function AgreementSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="agreement"
      title="Agreement in the Passive Voice"
      icon={FaCheck}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In passive voice, the past participle agrees with the subject. That means it changes for masculine/feminine and singular/plural.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {agreementExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <p className="font-semibold text-slate-800">{ex.french}</p>
              <p className="text-sm text-slate-500">{ex.english}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                {ex.note}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-amber-800">
                <strong>Remember:</strong>
              </p>
              <ul className="list-disc list-inside text-amber-700 space-y-1">
                <li>Look at the subject of the passive sentence</li>
                <li>The past participle agrees with that subject</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function AgentSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="agent"
      title="Using par to Show the Agent"
      icon={FaUser}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>Par</strong> introduces the person or thing doing the action in the passive sentence. This is called the agent. Sometimes the agent is important, and sometimes it is omitted.
        </p>

        <div className="space-y-4 mt-4">
          {agentExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-100 rounded-lg">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Without agent
                  </span>
                  <p className="font-medium text-slate-800 mt-1">{ex.withoutAgent}</p>
                  <p className="text-sm text-slate-500">{ex.englishWithoutAgent}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                    With par
                  </span>
                  <p className="font-medium text-slate-800 mt-1">{ex.withAgent}</p>
                  <p className="text-sm text-slate-500">{ex.englishWithAgent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
          <p className="text-blue-800">
            <strong>Note:</strong> The passive can exist without saying who does the action. This is common when the result matters more than the agent.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function TensesSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="tenses"
      title="Passive Voice in Different Tenses"
      icon={FaClock}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          The passive can appear in different tenses by changing <strong>être</strong>. Here are examples of the most common tenses:
        </p>

        <div className="grid gap-4 mt-4">
          {tenseExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
            >
              <div>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium uppercase">
                  {ex.tense}
                </span>
                <p className="font-semibold text-slate-800 mt-2">{ex.french}</p>
                <p className="text-sm text-slate-500">{ex.english}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800">
            <strong>Important:</strong> The main goal at A2 is to recognize the passive structure, notice that être changes tense, and understand the overall meaning. You don't need to master all tense combinations yet.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function WhenToUseSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="when-to-use"
      title="When French Uses Passive Voice"
      icon={FaInfoCircle}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          French uses passive voice when:
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {passiveUses.map((use, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <h4 className="font-semibold text-amber-700 mb-2">{use.title}</h4>
              <p className="font-medium text-slate-800">{use.example}</p>
              <p className="text-sm text-slate-500">{use.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
          <p className="text-blue-800">
            <strong>Remember:</strong> You do not always need <strong>par</strong>. Often the most important information is what happened, not who did it.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function GuidedExamplesSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="guided-examples"
      title="Guided Examples"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Study these examples to see the passive voice in different contexts:
        </p>

        <div className="grid gap-4 mt-4">
          {guidedExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
            >
              <span className="text-lg font-medium text-slate-800">
                {ex.french}
              </span>
              <span className="text-sm text-slate-500">{ex.english}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function MistakesSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="mistakes"
      title="Common Beginner Mistakes"
      icon={FaExclamationTriangle}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800">
            These mistakes are very common. They usually happen when learners forget être, forget agreement, or use the wrong preposition for the agent.
          </p>
        </div>

        <div className="space-y-4 mt-4">
          {commonMistakes.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-xl border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-red-600 line-through">{ex.wrong}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-emerald-700 font-medium">{ex.correct}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3 bg-slate-50 p-2 rounded">
                {ex.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function PracticeSection({
  isReviewed,
  onMarkReviewed,
  onComplete,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
  onComplete: (score: number) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = practiceQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / practiceQuestions.length) * 100;

  const handleSelect = (index: number) => {
    if (!hasSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === question.correct;
    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < practiceQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
      setIsCorrect(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setShowResults(false);
  };

  const handleContinueAnyway = () => {
    onMarkReviewed("practice");
  };

  // Calculate actual score when showing results
  const actualScore = showResults
    ? isCorrect && hasSubmitted && currentQuestion === practiceQuestions.length - 1
      ? score + 1
      : score
    : score;

  if (showResults) {
    const performance = getPerformanceMessage(actualScore, practiceQuestions.length);

    // Call onComplete with the final score
    useEffect(() => {
      onComplete(actualScore);
    }, []);

    return (
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Practice Complete!
          </h2>
          <p className="text-slate-600">
            You scored {actualScore} out of {practiceQuestions.length}
          </p>
          <p className="text-lg font-medium text-amber-600 mt-1">
            {Math.round((actualScore / practiceQuestions.length) * 100)}%
          </p>
        </div>

        <div className={`p-6 rounded-xl border mb-6 ${
          performance.color === "green"
            ? "bg-emerald-50 border-emerald-100"
            : performance.color === "yellow"
            ? "bg-amber-50 border-amber-100"
            : "bg-blue-50 border-blue-100"
        }`}>
          <h3 className={`font-semibold mb-2 ${
            performance.color === "green"
              ? "text-emerald-800"
              : performance.color === "yellow"
              ? "text-amber-800"
              : "text-blue-800"
          }`}>
            {performance.title}
          </h3>
          <p className={`${
            performance.color === "green"
              ? "text-emerald-700"
              : performance.color === "yellow"
              ? "text-amber-700"
              : "text-blue-700"
          }`}>
            {performance.message}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleRetake}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-medium"
          >
            <FaRedo size={18} />
            Retake practice
          </button>
          <button
            onClick={handleContinueAnyway}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors font-medium"
          >
            Continue lesson
            <FaArrowAltCircleRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">
            Practice {currentQuestion + 1} of {practiceQuestions.length}
          </span>
          <span className="text-sm font-medium text-amber-600">
            Score: {score}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3">
              {question.topic}
            </span>
            <h3 className="text-lg font-medium text-slate-800">
              {question.prompt}
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedOption === idx
                    ? hasSubmitted
                      ? idx === question.correct
                        ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                        : "bg-red-100 border-2 border-red-500 text-red-800"
                      : "bg-amber-100 border-2 border-amber-500 text-amber-800"
                    : hasSubmitted && idx === question.correct
                    ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                    : "bg-slate-50 border-2 border-slate-200 hover:border-amber-300 text-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {hasSubmitted && idx === question.correct && (
                    <FaCheckCircle className="text-emerald-500" />
                  )}
                  {hasSubmitted && selectedOption === idx && idx !== question.correct && (
                    <span className="text-red-500 font-bold">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {hasSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl mb-6 ${
                isCorrect
                  ? "bg-emerald-50 border border-emerald-100"
                  : "bg-amber-50 border border-amber-100"
              }`}
            >
              <p
                className={`font-medium mb-2 ${
                  isCorrect ? "text-emerald-800" : "text-amber-800"
                }`}
              >
                {isCorrect
                  ? ["Nice 😏", "Good catch", "That's right"][
                      Math.floor(Math.random() * 3)
                    ]
                  : ["Careful now…", "You're getting it"][
                      Math.floor(Math.random() * 2)
                    ]}
              </p>
              <p className={isCorrect ? "text-emerald-700" : "text-amber-700"}>
                {question.explanation}
              </p>
            </motion.div>
          )}

          <div className="flex gap-4">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                {currentQuestion < practiceQuestions.length - 1 ? (
                  <>
                    Next
                    <FaArrowRight />
                  </>
                ) : (
                  "See Results"
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CompletionSection({
  practiceScore,
}: {
  practiceScore: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl p-8 text-white shadow-lg"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <FaTrophy size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-amber-100 mb-6">
          You've completed A2 Lesson 9 — The Passive Voice
        </p>

        {practiceScore > 0 && (
          <p className="text-amber-50 mb-4">
            Practice score: {practiceScore}/{practiceQuestions.length}
          </p>
        )}

        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-amber-50 text-sm">
            <li>• How to recognize and form the passive voice in French</li>
            <li>• How to use être + past participle</li>
            <li>• How to add the agent with par</li>
            <li>• How agreement works with the subject</li>
            <li>• When passive voice is natural and useful</li>
          </ul>
        </div>

        <Link
          href="/classes/A2/lesson10"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-colors"
        >
          Continue to Lesson 10
          <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function Lesson9Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("a2Lesson9Progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviewedSections(parsed.reviewedSections || []);
        setPracticeAnswers(parsed.practiceAnswers || {});
        setPracticeCompleted(parsed.practiceCompleted || false);
        setPracticeScore(parsed.practiceScore || 0);
        setLessonCompleted(parsed.lessonCompleted || false);
      } catch {
        // Invalid saved data, ignore
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(
        "a2Lesson9Progress",
        JSON.stringify({
          reviewedSections,
          practiceAnswers,
          practiceCompleted,
          practiceScore,
          lessonCompleted,
        })
      );
    }
  }, [reviewedSections, practiceAnswers, practiceCompleted, practiceScore, lessonCompleted, isClient]);

  const handleMarkReviewed = (id: string) => {
    setReviewedSections((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const handlePracticeComplete = (score: number) => {
    setPracticeScore(score);
    setPracticeCompleted(true);
  };

  const progress = useMemo(() => {
    const totalSections = sectionIds.length;
    const completed = reviewedSections.length;
    return Math.round((completed / totalSections) * 100);
  }, [reviewedSections]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-50 flex items-center justify-center">
        <div className="text-amber-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/classes/A2"
            className="flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors"
          >
            <FaArrowLeft size={18} />
            <span>Back to A2 Lessons</span>
          </Link>
        </div>

        {/* Header */}
        <LessonHeader />

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <ProgressBar
            current={reviewedSections.length}
            total={sectionIds.length}
            label="Lesson Progress"
          />
        </div>

        {/* Sections */}
        <WhatIsPassiveSection
          isReviewed={reviewedSections.includes("what-is-passive")}
          onMarkReviewed={handleMarkReviewed}
        />

        <ActiveVsPassiveSection
          isReviewed={reviewedSections.includes("active-vs-passive")}
          onMarkReviewed={handleMarkReviewed}
        />

        <FormationSection
          isReviewed={reviewedSections.includes("formation")}
          onMarkReviewed={handleMarkReviewed}
        />

        <AgreementSection
          isReviewed={reviewedSections.includes("agreement")}
          onMarkReviewed={handleMarkReviewed}
        />

        <AgentSection
          isReviewed={reviewedSections.includes("agent")}
          onMarkReviewed={handleMarkReviewed}
        />

        <TensesSection
          isReviewed={reviewedSections.includes("tenses")}
          onMarkReviewed={handleMarkReviewed}
        />

        <WhenToUseSection
          isReviewed={reviewedSections.includes("when-to-use")}
          onMarkReviewed={handleMarkReviewed}
        />

        <GuidedExamplesSection
          isReviewed={reviewedSections.includes("guided-examples")}
          onMarkReviewed={handleMarkReviewed}
        />

        <MistakesSection
          isReviewed={reviewedSections.includes("mistakes")}
          onMarkReviewed={handleMarkReviewed}
        />

        {/* Practice */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500 rounded-xl text-white">
                <FaQuestionCircle size={24} />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Guided Interactive Practice
              </h2>
            </div>
          </div>
          <div className="p-6">
            <PracticeSection
              isReviewed={reviewedSections.includes("practice")}
              onMarkReviewed={handleMarkReviewed}
              onComplete={handlePracticeComplete}
            />
          </div>
        </div>

        {/* Completion */}
        {(practiceCompleted || reviewedSections.includes("practice")) && (
          <CompletionSection practiceScore={practiceScore} />
        )}
      </div>
    </div>
  );
}
