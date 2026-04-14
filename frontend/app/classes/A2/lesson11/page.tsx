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
  FaMapMarkerAlt,
  FaBox,
  FaBalanceScale,
  FaAlignLeft,
  FaClock,
  FaBookOpen,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaTrophy,
  FaRedo,
  FaArrowAltCircleRight,
  FaInfoCircle,
} from "react-icons/fa";
import {
  sectionIds,
  yUses,
  commonYVerbs,
  enUses,
  commonEnVerbs,
  yVsEnComparisons,
  positionExamples,
  tenseExamples,
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
        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-rose-50 to-white hover:from-rose-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-rose-500 rounded-xl text-white">
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
                  className="mt-6 flex items-center gap-2 px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg transition-colors font-medium"
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
    <div className="bg-gradient-to-br from-rose-500 to-pink-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
          A2 Lesson 11
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">Y and En</h1>
      <p className="text-rose-100 text-lg">
        Learn how to replace places, things, and quantity expressions with y and en in French.
      </p>
      <p className="mt-4 text-sm text-rose-50">
        Read the explanations, notice the patterns, and complete the practice to build confidence.
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
          className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full"
        />
      </div>
    </div>
  );
}

// Section Components
function WhatAreYEnSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="what-are-y-en"
      title="What are Y and En?"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>y</strong> and <strong>en</strong> are very common short pronouns in French. They replace repeated information and help French sound more natural.
        </p>

        <p className="text-slate-700 leading-relaxed">
          They often replace:
        </p>

        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li>places</li>
          <li>expressions with <strong>à</strong></li>
          <li>expressions with <strong>de</strong></li>
          <li>quantities</li>
        </ul>

        <div className="mt-6 p-4 bg-rose-50 rounded-xl border border-rose-100">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-rose-500 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-rose-800">
                <strong>Helpful tips:</strong>
              </p>
              <ul className="list-disc list-inside text-rose-700 space-y-1">
                <li>English does not always use direct equivalents, so it is better to learn them through patterns</li>
                <li>At A2 level, the goal is to recognize the main uses and begin using them correctly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function UnderstandingYSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="understanding-y"
      title="Understanding Y"
      icon={FaMapMarkerAlt}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          <strong>y</strong> usually replaces:
        </p>
        <ol className="list-decimal list-inside text-slate-700 space-y-2 ml-4">
          <li>a place</li>
          <li>something introduced by <strong>à</strong> (but usually not a person)</li>
        </ol>

        <div className="space-y-4">
          {yUses.map((use, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <h3 className="font-semibold text-rose-700 mb-2">{use.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{use.explanation}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <span className="text-xs font-medium text-slate-500 uppercase">Before</span>
                  <p className="font-medium text-slate-800">{use.exampleBefore}</p>
                  <p className="text-sm text-slate-500">{use.englishBefore}</p>
                </div>
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <span className="text-xs font-medium text-rose-600 uppercase">After with y</span>
                  <p className="font-medium text-rose-800">{use.exampleAfter}</p>
                  <p className="text-sm text-rose-600">{use.englishAfter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <h4 className="font-semibold text-amber-800 mb-3">Common expressions with y:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {commonYVerbs.map((verb, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white p-2 rounded">
                <span className="font-medium text-slate-700">{verb.expression}</span>
                <span className="text-sm text-slate-500">{verb.english}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function UnderstandingEnSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="understanding-en"
      title="Understanding En"
      icon={FaBox}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          <strong>en</strong> usually replaces:
        </p>
        <ol className="list-decimal list-inside text-slate-700 space-y-2 ml-4">
          <li>something introduced by <strong>de</strong></li>
          <li>a quantity expression</li>
          <li>partitive / indefinite quantity ideas</li>
        </ol>

        <div className="space-y-4">
          {enUses.map((use, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <h3 className="font-semibold text-rose-700 mb-2">{use.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{use.explanation}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <span className="text-xs font-medium text-slate-500 uppercase">Before</span>
                  <p className="font-medium text-slate-800">{use.exampleBefore}</p>
                  <p className="text-sm text-slate-500">{use.englishBefore}</p>
                </div>
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <span className="text-xs font-medium text-rose-600 uppercase">After with en</span>
                  <p className="font-medium text-rose-800">{use.exampleAfter}</p>
                  <p className="text-sm text-rose-600">{use.englishAfter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> <strong>en</strong> usually replaces things, not people. For people after <strong>de</strong>, French often uses stressed forms instead:
          </p>
          <p className="text-blue-700 mt-2 font-medium">Je parle de Marie. → Je parle d'elle.</p>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <h4 className="font-semibold text-amber-800 mb-3">Common expressions with en:</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {commonEnVerbs.map((verb, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white p-2 rounded">
                <span className="font-medium text-slate-700">{verb.expression}</span>
                <span className="text-sm text-slate-500">{verb.english}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function YVsEnSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="y-vs-en"
      title="Y vs En Comparison"
      icon={FaBalanceScale}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          A useful first question is: does the original expression use <strong>à</strong> or <strong>de</strong>? That does not solve everything, but it helps a lot.
        </p>

        <div className="space-y-4">
          {yVsEnComparisons.map((comp, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <span className="text-xs font-medium text-rose-600 uppercase">With y</span>
                  <p className="font-medium text-rose-800 mt-1">{comp.withY}</p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg border border-pink-100">
                  <span className="text-xs font-medium text-pink-600 uppercase">With en</span>
                  <p className="font-medium text-pink-800 mt-1">{comp.withEn}</p>
                </div>
              </div>
              <p className="text-slate-600 mt-4 text-sm">{comp.explanation}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
          <h4 className="font-semibold text-rose-800 mb-2">Quick Reference</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-rose-700">y</p>
              <ul className="text-sm text-rose-600 list-disc list-inside">
                <li>places</li>
                <li>à + thing/idea</li>
                <li>not usually people</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-pink-700">en</p>
              <ul className="text-sm text-pink-600 list-disc list-inside">
                <li>de + thing</li>
                <li>quantities</li>
                <li>partitive (some)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function PositionSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="position"
      title="Sentence Position of Y and En"
      icon={FaAlignLeft}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In simple affirmative sentences, <strong>y</strong> and <strong>en</strong> usually go <strong>before the conjugated verb</strong>.
        </p>

        <div className="p-5 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
          <p className="font-semibold text-rose-800 text-lg text-center">
            subject + y / en + verb
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {positionExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <p className="font-semibold text-rose-700">{ex.french}</p>
              <p className="text-sm text-slate-500">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
          <p className="text-blue-800">
            <strong>Note:</strong> If both a pronoun and a quantity appear, the quantity usually stays:
          </p>
          <ul className="text-blue-700 mt-2 space-y-1 text-sm">
            <li>J'en ai trois.</li>
            <li>Elle en veut un peu.</li>
          </ul>
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
      title="Y and En in Different Tenses"
      icon={FaClock}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>y</strong> and <strong>en</strong> keep the same basic position before the verb or auxiliary.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {tenseExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs font-medium uppercase">
                {ex.category}
              </span>
              <p className="font-semibold text-slate-800 mt-2">{ex.french}</p>
              <p className="text-sm text-slate-500">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800">
            <strong>Key rules:</strong>
          </p>
          <ul className="list-disc list-inside text-amber-700 mt-2 space-y-1">
            <li>Before the conjugated verb in simple tenses</li>
            <li>Before the infinitive in structures like <strong>aller + infinitive</strong></li>
            <li>Before the auxiliary in compound tenses</li>
          </ul>
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
          Study these examples to see y and en in different contexts:
        </p>

        <div className="grid gap-4 mt-4">
          {guidedExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <p className="font-medium text-slate-800">{ex.french}</p>
              <p className="text-sm text-slate-500">{ex.english}</p>
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
            These mistakes are very common. They usually happen because English does not organize these ideas in the same way.
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Practice Complete!
          </h2>
          <p className="text-slate-600">
            You scored {actualScore} out of {practiceQuestions.length}
          </p>
          <p className="text-lg font-medium text-rose-600 mt-1">
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
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-colors font-medium"
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
          <span className="text-sm font-medium text-rose-600">
            Score: {score}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-300"
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
            <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium mb-3">
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
                      : "bg-rose-100 border-2 border-rose-500 text-rose-800"
                    : hasSubmitted && idx === question.correct
                    ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                    : "bg-slate-50 border-2 border-slate-200 hover:border-rose-300 text-slate-700"
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
                  : ["Careful now…", "You're seeing the pattern"][
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
                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
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
      className="bg-gradient-to-br from-rose-500 to-pink-400 rounded-2xl p-8 text-white shadow-lg"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <FaTrophy size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-rose-100 mb-6">
          You've completed A2 Lesson 11 — Y and En
        </p>

        {practiceScore > 0 && (
          <p className="text-rose-50 mb-4">
            Practice score: {practiceScore}/{practiceQuestions.length}
          </p>
        )}

        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-rose-50 text-sm">
            <li>• The main uses of y and en in French</li>
            <li>• How to use y for places and à-expressions</li>
            <li>• How to use en for de-expressions and quantities</li>
            <li>• Where to place y and en in a sentence</li>
            <li>• How they work in different tenses</li>
          </ul>
        </div>

        <Link
          href="/classes/B1"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition-colors"
        >
          Continue to B1 Lessons
          <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function Lesson11Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("a2Lesson11Progress");
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
        "a2Lesson11Progress",
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
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-slate-50 flex items-center justify-center">
        <div className="text-rose-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/classes/A2"
            className="flex items-center gap-2 text-slate-600 hover:text-rose-600 transition-colors"
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
        <WhatAreYEnSection
          isReviewed={reviewedSections.includes("what-are-y-en")}
          onMarkReviewed={handleMarkReviewed}
        />

        <UnderstandingYSection
          isReviewed={reviewedSections.includes("understanding-y")}
          onMarkReviewed={handleMarkReviewed}
        />

        <UnderstandingEnSection
          isReviewed={reviewedSections.includes("understanding-en")}
          onMarkReviewed={handleMarkReviewed}
        />

        <YVsEnSection
          isReviewed={reviewedSections.includes("y-vs-en")}
          onMarkReviewed={handleMarkReviewed}
        />

        <PositionSection
          isReviewed={reviewedSections.includes("position")}
          onMarkReviewed={handleMarkReviewed}
        />

        <TensesSection
          isReviewed={reviewedSections.includes("tenses")}
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
          <div className="p-6 bg-gradient-to-r from-rose-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-500 rounded-xl text-white">
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
