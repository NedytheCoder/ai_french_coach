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
  FaLink,
  FaBalanceScale,
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
  ceQuiExamples,
  ceQueExamples,
  ceAQuoiExamples,
  ceDontExamples,
  lequelForms,
  lequelExamples,
  comparisonExamples,
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
        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white hover:from-indigo-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500 rounded-xl text-white">
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
                  className="mt-6 flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors font-medium"
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
    <div className="bg-gradient-to-br from-indigo-500 to-violet-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
          A2 Lesson 13
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">Advanced Relative Pronouns</h1>
      <p className="text-indigo-100 text-lg">
        Learn how to say what, which, and that more precisely in French.
      </p>
      <p className="mt-4 text-sm text-indigo-50">
        Focus on patterns and examples. You don't need to memorize everything at once.
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
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 rounded-full"
        />
      </div>
    </div>
  );
}

// Section Components
function WhatMakesAdvancedSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="what-makes-advanced"
      title='What Makes These Pronouns "Advanced"?'
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          These pronouns are used when there is <strong>no clear noun before them</strong>. They often replace ideas like:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li>"what"</li>
          <li>"the thing that"</li>
        </ul>

        <p className="text-slate-700 leading-relaxed mt-4">
          They depend on:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
          <li>subject vs object</li>
          <li>prepositions like <strong>à</strong> and <strong>de</strong></li>
        </ul>

        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 mt-4">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-indigo-500 mt-1 flex-shrink-0" />
            <p className="text-indigo-800">
              <strong>At A2 level</strong>, your goal is to recognize patterns and use the most common forms. Don't worry about memorizing everything at once.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function CeQuiSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="ce-qui"
      title="Understanding Ce Qui"
      icon={FaLink}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>ce qui = what (subject)</strong>
        </p>
        <p className="text-slate-700">
          Used when the pronoun is the <strong>subject</strong> of the clause.
        </p>

        <div className="space-y-4 mt-4">
          {ceQuiExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-indigo-50 rounded-xl border border-indigo-100"
            >
              <p className="font-semibold text-indigo-800">{ex.french}</p>
              <p className="text-sm text-indigo-600">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800">
            <strong>Rule:</strong> After <strong>ce qui</strong>, you usually see a verb directly. It acts like the subject.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function CeQueSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="ce-que"
      title="Understanding Ce Que / Ce Qu'"
      icon={FaExchangeAlt}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>ce que = what (object)</strong>
        </p>
        <p className="text-slate-700">
          Used when the pronoun is the <strong>object</strong> of the clause.
        </p>

        <div className="space-y-4 mt-4">
          {ceQueExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-indigo-50 rounded-xl border border-indigo-100"
            >
              <p className="font-semibold text-indigo-800">{ex.french}</p>
              <p className="text-sm text-indigo-600">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800">
            <strong>Rule:</strong> After <strong>ce que</strong>, you usually see a <strong>subject + verb</strong>.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function CeAQuoiSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="ce-a-quoi"
      title="Understanding Ce À Quoi"
      icon={FaLink}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Used with verbs or expressions that take <strong>à</strong>. It means "what … to / about / for".
        </p>

        <div className="space-y-4 mt-4">
          {ceAQuoiExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-indigo-50 rounded-xl border border-indigo-100"
            >
              {ex.replaced ? (
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Original: {ex.french}</p>
                  <p className="font-semibold text-indigo-800">→ {ex.replaced}</p>
                </div>
              ) : (
                <p className="font-semibold text-indigo-800">{ex.french}</p>
              )}
              <p className="text-sm text-indigo-600">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800">
            <strong>Rule:</strong> If the verb uses <strong>à</strong>, use <strong>ce à quoi</strong>.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function CeDontSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="ce-dont"
      title="Understanding Ce Dont"
      icon={FaExchangeAlt}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Used with verbs or expressions that take <strong>de</strong>. It means "what … of / about / from".
        </p>

        <div className="space-y-4 mt-4">
          {ceDontExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-indigo-50 rounded-xl border border-indigo-100"
            >
              {ex.replaced ? (
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">Original: {ex.french}</p>
                  <p className="font-semibold text-indigo-800">→ {ex.replaced}</p>
                </div>
              ) : (
                <p className="font-semibold text-indigo-800">{ex.french}</p>
              )}
              <p className="text-sm text-indigo-600">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <p className="text-amber-800">
            <strong>Rule:</strong> If the verb uses <strong>de</strong>, use <strong>ce dont</strong>.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function LequelFormsSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="lequel-forms"
      title="Introduction to Lequel Forms"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          These forms replace things after <strong>à</strong> or <strong>de</strong>. They agree with gender and number.
        </p>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h4 className="font-semibold text-slate-700 mb-3">Base forms</h4>
          <div className="grid grid-cols-2 gap-2">
            {lequelForms[0].forms?.map((form, idx) => (
              <span key={idx} className="text-slate-600 text-sm">{form}</span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
            <h4 className="font-semibold text-violet-800 mb-2">With à</h4>
            <div className="space-y-1">
              {lequelForms[1].withA?.map((form, idx) => (
                <p key={idx} className="text-violet-700 text-sm">{form}</p>
              ))}
            </div>
            <p className="text-xs text-violet-600 mt-2">{lequelForms[1].note}</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-2">With de</h4>
            <div className="space-y-1">
              {lequelForms[2].withDe?.map((form, idx) => (
                <p key={idx} className="text-purple-700 text-sm">{form}</p>
              ))}
            </div>
            <p className="text-xs text-purple-600 mt-2">{lequelForms[2].note}</p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <h4 className="font-semibold text-slate-700">Examples</h4>
          {lequelExamples.map((ex, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-lg">
              <p className="font-medium text-indigo-700">{ex.french}</p>
              <p className="text-sm text-slate-500">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Keep this light — focus on <strong>recognition</strong> rather than memorization at this stage.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function ComparisonSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="comparison"
      title="Simple Comparison"
      icon={FaBalanceScale}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        {comparisonExamples.map((comp, idx) => (
          <div
            key={idx}
            className="p-5 bg-slate-50 rounded-xl border border-slate-100"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="font-medium text-indigo-800">{idx === 0 ? comp.ceQui : comp.ceAQuoi}</p>
              </div>
              <div className="p-3 bg-violet-50 rounded-lg border border-violet-100">
                <p className="font-medium text-violet-800">{idx === 0 ? comp.ceQue : comp.ceDont}</p>
              </div>
            </div>
            <p className="text-slate-600 mt-4 text-sm">{comp.explanation}</p>
          </div>
        ))}

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <h4 className="font-semibold text-amber-800 mb-2">Quick Reference</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-indigo-700">Subject → ce qui</p>
              <p className="text-slate-600">What is happening</p>
            </div>
            <div>
              <p className="font-medium text-violet-700">Object → ce que</p>
              <p className="text-slate-600">What you want</p>
            </div>
            <div>
              <p className="font-medium text-indigo-700">À + verb → ce à quoi</p>
              <p className="text-slate-600">What you think about</p>
            </div>
            <div>
              <p className="font-medium text-violet-700">De + verb → ce dont</p>
              <p className="text-slate-600">What you need</p>
            </div>
          </div>
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
          Study these examples to see advanced relative pronouns in context:
        </p>

        <div className="grid gap-4 mt-4">
          {guidedExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
            >
              <span className="text-lg font-medium text-indigo-700">
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
            These mistakes are very common. Focus on whether the pronoun is the subject, object, or follows à/de.
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Practice Complete!
          </h2>
          <p className="text-slate-600">
            You scored {actualScore} out of {practiceQuestions.length}
          </p>
          <p className="text-lg font-medium text-indigo-600 mt-1">
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
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors font-medium"
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
          <span className="text-sm font-medium text-indigo-600">
            Score: {score}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-300"
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
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-3">
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
                      : "bg-indigo-100 border-2 border-indigo-500 text-indigo-800"
                    : hasSubmitted && idx === question.correct
                    ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                    : "bg-slate-50 border-2 border-slate-200 hover:border-indigo-300 text-slate-700"
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
                className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
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
      className="bg-gradient-to-br from-indigo-500 to-violet-400 rounded-2xl p-8 text-white shadow-lg"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <FaTrophy size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-indigo-100 mb-6">
          You've completed A2 Lesson 13 — Advanced Relative Pronouns
        </p>

        {practiceScore > 0 && (
          <p className="text-indigo-50 mb-4">
            Practice score: {practiceScore}/{practiceQuestions.length}
          </p>
        )}

        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-indigo-50 text-sm">
            <li>• How to use ce qui (subject) and ce que (object)</li>
            <li>• How to use ce dont with de expressions</li>
            <li>• How to use ce à quoi with à expressions</li>
            <li>• Basic recognition of auquel / duquel forms</li>
            <li>• How to choose the right form based on à, de, subject, or object</li>
          </ul>
        </div>

        <Link
          href="/learn/b1"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition-colors"
        >
          Continue to B1 Lessons
          <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function Lesson13Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("a2Lesson13Progress");
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
        "a2Lesson13Progress",
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-50 flex items-center justify-center">
        <div className="text-indigo-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/classes/A2"
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
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
        <WhatMakesAdvancedSection
          isReviewed={reviewedSections.includes("what-makes-advanced")}
          onMarkReviewed={handleMarkReviewed}
        />

        <CeQuiSection
          isReviewed={reviewedSections.includes("ce-qui")}
          onMarkReviewed={handleMarkReviewed}
        />

        <CeQueSection
          isReviewed={reviewedSections.includes("ce-que")}
          onMarkReviewed={handleMarkReviewed}
        />

        <CeAQuoiSection
          isReviewed={reviewedSections.includes("ce-a-quoi")}
          onMarkReviewed={handleMarkReviewed}
        />

        <CeDontSection
          isReviewed={reviewedSections.includes("ce-dont")}
          onMarkReviewed={handleMarkReviewed}
        />

        <LequelFormsSection
          isReviewed={reviewedSections.includes("lequel-forms")}
          onMarkReviewed={handleMarkReviewed}
        />

        <ComparisonSection
          isReviewed={reviewedSections.includes("comparison")}
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
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500 rounded-xl text-white">
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
