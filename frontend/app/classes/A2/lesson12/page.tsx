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
  FaArrowDown,
} from "react-icons/fa";
import {
  sectionIds,
  quiExamples,
  queExamples,
  ouExamples,
  quiVsQueComparisons,
  joiningSteps,
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
        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white hover:from-emerald-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 rounded-xl text-white">
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
                  className="mt-6 flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors font-medium"
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
    <div className="bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
          A2 Lesson 12
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">Relative Pronouns: Qui, Que, Où</h1>
      <p className="text-emerald-100 text-lg">
        Learn how to connect ideas and avoid repetition in French.
      </p>
      <p className="mt-4 text-sm text-emerald-50">
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
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
        />
      </div>
    </div>
  );
}

// Section Components
function WhatAreRelativeSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="what-are-relative"
      title="What are Relative Pronouns?"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Relative pronouns connect two parts of a sentence. They help avoid repeating a noun. Instead of saying two short sentences, French often joins them into one.
        </p>

        <div className="space-y-6 mt-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">Two separate sentences:</p>
            <p className="text-slate-700"><strong>Voici le livre.</strong> <strong>Le livre</strong> est intéressant.</p>
            <p className="text-sm text-slate-500 mt-2">Here is the book. The book is interesting.</p>
          </div>

          <div className="flex justify-center">
            <FaArrowDown className="text-slate-300" size={24} />
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-sm text-emerald-600 mb-2">Joined with a relative pronoun:</p>
            <p className="font-medium text-emerald-800">Voici le livre <strong>qui</strong> est intéressant.</p>
            <p className="text-sm text-emerald-600 mt-2">Here is the book that is interesting.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-500 mb-2">Two separate sentences:</p>
            <p className="text-slate-700">Je connais la femme. Tu regardes <strong>la femme</strong>.</p>
            <p className="text-sm text-slate-500 mt-2">I know the woman. You are looking at the woman.</p>
          </div>

          <div className="flex justify-center">
            <FaArrowDown className="text-slate-300" size={24} />
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-sm text-emerald-600 mb-2">Joined with a relative pronoun:</p>
            <p className="font-medium text-emerald-800">Je connais la femme <strong>que</strong> tu regardes.</p>
            <p className="text-sm text-emerald-600 mt-2">I know the woman that you are looking at.</p>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-6">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-amber-800">
                <strong>Key points:</strong>
              </p>
              <ul className="list-disc list-inside text-amber-700 space-y-1">
                <li>Relative pronouns make your French sound smoother and more natural</li>
                <li>At A2 level, the most important ones are qui, que, and où</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function UnderstandingQuiSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="understanding-qui"
      title="Understanding Qui"
      icon={FaLink}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>Qui</strong> is used when the relative pronoun is the <strong>subject</strong> of the second clause. The word after <strong>qui</strong> is usually a verb.
        </p>

        <div className="space-y-4">
          {quiExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-white rounded-lg">
                  <span className="text-xs font-medium text-slate-500 uppercase">Before (two sentences)</span>
                  <p className="font-medium text-slate-800 mt-1">{ex.before}</p>
                  <p className="text-sm text-slate-500">{ex.englishBefore}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <span className="text-xs font-medium text-emerald-600 uppercase">After (one sentence)</span>
                  <p className="font-medium text-emerald-800 mt-1">{ex.after}</p>
                  <p className="text-sm text-emerald-600">{ex.englishAfter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
          <p className="text-blue-800">
            <strong>Helpful clue:</strong> After <strong>qui</strong>, the verb agrees with the noun being described. A useful beginner clue: if the repeated word is the <strong>doer of the action</strong> in the second clause, use <strong>qui</strong>.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function UnderstandingQueSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="understanding-que"
      title="Understanding Que / Qu'"
      icon={FaExchangeAlt}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>Que</strong> is used when the relative pronoun is the <strong>direct object</strong> of the second clause. In French, <strong>que</strong> becomes <strong>qu'</strong> before a vowel or silent h.
        </p>

        <div className="space-y-4">
          {queExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-white rounded-lg">
                  <span className="text-xs font-medium text-slate-500 uppercase">Before (two sentences)</span>
                  <p className="font-medium text-slate-800 mt-1">{ex.before}</p>
                  <p className="text-sm text-slate-500">{ex.englishBefore}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <span className="text-xs font-medium text-emerald-600 uppercase">After (one sentence)</span>
                  <p className="font-medium text-emerald-800 mt-1">{ex.after}</p>
                  <p className="text-sm text-emerald-600">{ex.englishAfter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-4">
          <p className="text-blue-800">
            <strong>Helpful clue:</strong> A useful beginner clue: if the repeated word <strong>receives the action</strong> in the second clause, use <strong>que</strong>. After <strong>que</strong>, you usually see a subject + verb.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function UnderstandingOuSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="understanding-ou"
      title="Understanding Où"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          <strong>Où</strong> is used for <strong>places</strong> and sometimes <strong>times</strong>. It usually means <em>where</em> or <em>when</em>. It connects a noun with information about place or time.
        </p>

        <div className="space-y-4">
          {ouExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-white rounded-lg">
                  <span className="text-xs font-medium text-slate-500 uppercase">Before (two sentences)</span>
                  <p className="font-medium text-slate-800 mt-1">{ex.before}</p>
                  <p className="text-sm text-slate-500">{ex.englishBefore}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <span className="text-xs font-medium text-emerald-600 uppercase">After (one sentence)</span>
                  <p className="font-medium text-emerald-800 mt-1">{ex.after}</p>
                  <p className="text-sm text-emerald-600">{ex.englishAfter}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mt-4">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-amber-800">
                <strong>Helpful tips:</strong>
              </p>
              <ul className="list-disc list-inside text-amber-700 mt-2 space-y-1">
                <li>Use où mostly for place and time</li>
                <li>If the noun refers to a location or moment, où is often the right choice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function QuiVsQueSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="qui-vs-que"
      title="Qui vs Que Comparison"
      icon={FaBalanceScale}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <h4 className="font-semibold text-emerald-800 mb-2">Qui</h4>
            <p className="text-emerald-700">The noun is the <strong>subject</strong> of the second clause</p>
            <p className="text-sm text-emerald-600">The doer of the action</p>
          </div>
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <h4 className="font-semibold text-teal-800 mb-2">Que</h4>
            <p className="text-teal-700">The noun is the <strong>direct object</strong> of the second clause</p>
            <p className="text-sm text-teal-600">The receiver of the action</p>
          </div>
        </div>

        <div className="space-y-4">
          {quiVsQueComparisons.map((comp, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <span className="text-xs font-medium text-emerald-600 uppercase">With qui</span>
                  <p className="font-medium text-emerald-800 mt-1">{comp.sentenceWithQui}</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                  <span className="text-xs font-medium text-teal-600 uppercase">With que</span>
                  <p className="font-medium text-teal-800 mt-1">{comp.sentenceWithQue}</p>
                </div>
              </div>
              <p className="text-slate-600 mt-4 text-sm">{comp.explanation}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800">
            <strong>Test:</strong> Look at the second clause. If the repeated noun is the <strong>subject</strong> there, use <strong>qui</strong>. If the repeated noun is the <strong>direct object</strong> there, use <strong>que</strong>.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function JoiningSentencesSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="joining-sentences"
      title="How Relative Pronouns Join Sentences"
      icon={FaLink}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          This process helps learners see how two short sentences become one. At A2 level, joining sentences correctly is the main goal.
        </p>

        <div className="space-y-6">
          {joiningSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold text-sm uppercase">
                  {step.type}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-white rounded-lg">
                  <span className="text-xs font-medium text-slate-500 uppercase">Step 1</span>
                  <p className="font-medium text-slate-800 mt-1">{step.step1}</p>
                </div>

                <div className="flex justify-center">
                  <FaArrowDown className="text-slate-300" size={20} />
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <span className="text-xs font-medium text-slate-500 uppercase">Step 2</span>
                  <p className="font-medium text-slate-800 mt-1">{step.step2}</p>
                </div>

                <div className="flex justify-center">
                  <FaArrowDown className="text-slate-300" size={20} />
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-xs font-medium text-blue-600 uppercase">Reason</span>
                  <p className="text-blue-700 mt-1">{step.step3}</p>
                </div>

                <div className="flex justify-center">
                  <FaArrowDown className="text-slate-300" size={20} />
                </div>

                <div className="p-3 bg-emerald-100 rounded-lg border-2 border-emerald-500">
                  <span className="text-xs font-medium text-emerald-700 uppercase">Result</span>
                  <p className="font-bold text-emerald-800 mt-1 text-lg">{step.result}</p>
                </div>
              </div>
            </div>
          ))}
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
          Study these examples to see relative pronouns in different contexts:
        </p>

        <div className="grid gap-4 mt-4">
          {guidedExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
            >
              <span className="text-lg font-medium text-emerald-700">
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
            These mistakes are very common. They usually happen when learners confuse subject and object roles, or forget that où is used for places and times.
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Practice Complete!
          </h2>
          <p className="text-slate-600">
            You scored {actualScore} out of {practiceQuestions.length}
          </p>
          <p className="text-lg font-medium text-emerald-600 mt-1">
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
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors font-medium"
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
          <span className="text-sm font-medium text-emerald-600">
            Score: {score}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
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
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-3">
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
                      : "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                    : hasSubmitted && idx === question.correct
                    ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                    : "bg-slate-50 border-2 border-slate-200 hover:border-emerald-300 text-slate-700"
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
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
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
      className="bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl p-8 text-white shadow-lg"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <FaTrophy size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-emerald-100 mb-6">
          You've completed A2 Lesson 12 — Relative Pronouns: Qui, Que, Où
        </p>

        {practiceScore > 0 && (
          <p className="text-emerald-50 mb-4">
            Practice score: {practiceScore}/{practiceQuestions.length}
          </p>
        )}

        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-emerald-50 text-sm">
            <li>• How to use qui, que, and où to join ideas in French</li>
            <li>• Using qui when the noun is the subject</li>
            <li>• Using que when the noun is the direct object</li>
            <li>• Using où for places and times</li>
            <li>• How to avoid repetition and make sentences more natural</li>
          </ul>
        </div>

        <Link
          href="/learn/b1"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-colors"
        >
          Continue to B1 Lessons
          <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function Lesson12Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("a2Lesson12Progress");
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
        "a2Lesson12Progress",
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-50 flex items-center justify-center">
        <div className="text-emerald-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/classes/A2"
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors"
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
        <WhatAreRelativeSection
          isReviewed={reviewedSections.includes("what-are-relative")}
          onMarkReviewed={handleMarkReviewed}
        />

        <UnderstandingQuiSection
          isReviewed={reviewedSections.includes("understanding-qui")}
          onMarkReviewed={handleMarkReviewed}
        />

        <UnderstandingQueSection
          isReviewed={reviewedSections.includes("understanding-que")}
          onMarkReviewed={handleMarkReviewed}
        />

        <UnderstandingOuSection
          isReviewed={reviewedSections.includes("understanding-ou")}
          onMarkReviewed={handleMarkReviewed}
        />

        <QuiVsQueSection
          isReviewed={reviewedSections.includes("qui-vs-que")}
          onMarkReviewed={handleMarkReviewed}
        />

        <JoiningSentencesSection
          isReviewed={reviewedSections.includes("joining-sentences")}
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
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500 rounded-xl text-white">
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
