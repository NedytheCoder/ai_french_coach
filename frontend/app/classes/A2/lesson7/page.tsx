"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaLightbulb,
  FaGraduationCap,
  FaComments,
  FaList,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaBan,
  FaClock,
  FaBalanceScale,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaTrophy,
  FaBookOpen,
  FaRedo,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import {
  sectionIds,
  indirectObjectExamples,
  pronounReplacementExamples,
  indirectObjectPronouns,
  elisionExamples,
  commonIndirectVerbs,
  replacementExamples,
  positionExamples,
  negativeExamples,
  elisionNegativeExamples,
  passeComposeExamples,
  directVsIndirectExamples,
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
        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-cyan-50 to-white hover:from-cyan-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500 rounded-xl text-white">
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
                  className="mt-6 flex items-center gap-2 px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg transition-colors font-medium"
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
    <div className="bg-gradient-to-br from-cyan-600 to-teal-500 rounded-2xl p-8 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
          A2 Lesson 7
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        Indirect Object Pronouns
      </h1>
      <p className="text-cyan-100 text-lg">
        Learn how to replace indirect objects with pronouns in French.
      </p>
      <p className="mt-4 text-sm text-cyan-50">
        Read the explanations, notice the sentence patterns, and complete the practice to build confidence.
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
          className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
        />
      </div>
    </div>
  );
}

// Section Components
function IntroSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="intro"
      title="What is an Indirect Object?"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          An indirect object usually answers questions like:
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
          <li>to whom?</li>
          <li>for whom?</li>
        </ul>
        <p className="text-slate-700 leading-relaxed">
          In French, it is often introduced by <strong>à</strong> when referring to a person.
          Many common verbs use indirect objects.
        </p>

        <div className="grid gap-4 mt-6">
          {indirectObjectExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <p className="text-lg font-medium text-cyan-700 mb-2">
                {ex.sentence}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Verb:</strong> {ex.verb} |{" "}
                <strong>Indirect object:</strong> {ex.indirectObject}
              </p>
              <p className="text-sm text-slate-500 mt-1">{ex.english}</p>
            </div>
          ))}
        </div>

        <p className="text-slate-700 leading-relaxed mt-4">
          In "Je parle à Marie", the action is "parle" and the indirect object is "à Marie".
        </p>
      </div>
    </SectionCard>
  );
}

function WhatIsPronounSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="what-is-pronoun"
      title="What is an Indirect Object Pronoun?"
      icon={FaComments}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          An indirect object pronoun replaces the indirect object noun.
          This helps avoid repetition. In French, the indirect object pronoun usually comes before the verb.
        </p>

        <div className="space-y-4 mt-6">
          {pronounReplacementExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-gradient-to-r from-cyan-50 to-white rounded-xl border border-cyan-100"
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-500 line-through">{ex.original}</span>
                <FaArrowRight className="text-cyan-400" />
                <span className="text-lg font-medium text-cyan-700">
                  {ex.replaced}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800">
            <strong>Remember:</strong> The pronoun usually replaces a person introduced by à.
            French places these pronouns before the verb.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function PronounsTableSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="pronouns-table"
      title="The French Indirect Object Pronouns"
      icon={FaList}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cyan-50">
                <th className="px-4 py-3 text-left text-cyan-800 font-semibold rounded-tl-lg">
                  Pronoun
                </th>
                <th className="px-4 py-3 text-left text-cyan-800 font-semibold">
                  Means
                </th>
                <th className="px-4 py-3 text-left text-cyan-800 font-semibold">
                  Example
                </th>
                <th className="px-4 py-3 text-left text-cyan-800 font-semibold rounded-tr-lg">
                  English
                </th>
              </tr>
            </thead>
            <tbody>
              {indirectObjectPronouns.map((item, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="px-4 py-3 font-medium text-cyan-700">
                    {item.pronoun}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{item.use}</td>
                  <td className="px-4 py-3 font-medium text-cyan-600">
                    {item.example}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.english}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-semibold text-slate-800 mb-2">Elision</h4>
            <p className="text-slate-700">
              Before a vowel or silent h, <strong>me</strong> and <strong>te</strong> become <strong>m&apos;</strong> and <strong>t&apos;</strong>:
            </p>
            <div className="mt-3 space-y-2">
              {elisionExamples.map((ex, idx) => (
                <p key={idx} className="text-cyan-700">
                  {ex.french} <span className="text-slate-500">({ex.english})</span>
                </p>
              ))}
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <h4 className="font-semibold text-amber-800 mb-2">Important Note</h4>
            <p className="text-amber-700">
              Unlike direct object pronouns, there is no separate masculine/feminine singular distinction here.
            </p>
            <ul className="list-disc list-inside text-amber-700 mt-2 ml-2">
              <li><strong>lui</strong> means &quot;to him&quot; or &quot;to her&quot;</li>
              <li><strong>leur</strong> means &quot;to them&quot;</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function CommonVerbsSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="common-verbs"
      title="Common Verbs That Use Indirect Objects"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Many common verbs are followed by <strong>à + person</strong>, so they often use indirect object pronouns.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {commonIndirectVerbs.map((verb, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-cyan-50 transition-colors"
            >
              <p className="font-medium text-cyan-700">{verb.infinitive}</p>
              <p className="text-sm text-slate-500">{verb.english}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function ReplacingSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="replacing"
      title="Replacing Nouns with Indirect Object Pronouns"
      icon={FaExchangeAlt}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Follow these steps to replace an indirect object with a pronoun:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-4">
          <li>Find the indirect object</li>
          <li>Check if it is a person introduced by <strong>à</strong></li>
          <li>Replace it with the correct indirect object pronoun</li>
          <li>Move the pronoun before the verb</li>
        </ol>

        <div className="space-y-4 mt-6">
          {replacementExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-gradient-to-r from-cyan-50 to-white rounded-xl border border-cyan-100"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-slate-500 line-through">{ex.original}</span>
                <FaArrowRight className="text-cyan-400" />
                <span className="text-lg font-medium text-cyan-700">
                  {ex.replaced}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-2">{ex.explanation}</p>
            </div>
          ))}
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
      title="Sentence Position of Indirect Object Pronouns"
      icon={FaMapMarkerAlt}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In simple affirmative sentences, the indirect object pronoun usually comes before the conjugated verb.
        </p>

        <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
          <p className="text-center font-semibold text-cyan-800">
            Pattern: subject + indirect object pronoun + verb
          </p>
        </div>

        <div className="grid gap-4 mt-6">
          {positionExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
            >
              <span className="text-lg font-medium text-cyan-700">
                {ex.french}
              </span>
              <span className="text-sm text-slate-500">{ex.english}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800">
            <strong>Important:</strong> This word order is very important.
            The indirect object pronoun usually goes before the verb.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function NegationSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="negation"
      title="Indirect Object Pronouns in Negation"
      icon={FaBan}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          With negation, the pronoun stays close to the verb.
        </p>

        <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
          <p className="text-center font-semibold text-cyan-800">
            Pattern: subject + ne + pronoun + verb + pas
          </p>
        </div>

        <div className="space-y-4 mt-6">
          {negativeExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-slate-500 line-through">{ex.affirmative}</span>
                <FaArrowRight className="text-cyan-400" />
                <span className="text-lg font-medium text-cyan-700">
                  {ex.negative}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-2">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-slate-700">
            <strong>Note:</strong> The pronoun stays before the verb, even in negation.
          </p>
          <p className="text-slate-700">
            <strong>ne</strong> becomes <strong>n&apos;</strong> before a vowel:
          </p>
          <div className="ml-4 space-y-1">
            {elisionNegativeExamples.map((ex, idx) => (
              <p key={idx} className="text-cyan-700">
                {ex.french} <span className="text-slate-500">({ex.english})</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function PasseComposeSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="passe-compose"
      title="Indirect Object Pronouns in the Passé Composé"
      icon={FaClock}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In the passé composé, the indirect object pronoun comes before the auxiliary verb.
          At A2 level, learners should mainly focus on the position.
        </p>

        <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
          <p className="font-semibold text-cyan-800 mb-2">Pattern:</p>
          <p className="text-cyan-700">
            subject + indirect object pronoun + auxiliary + past participle
          </p>
          <p className="text-cyan-700 mt-1">
            or in negation: subject + ne + indirect object pronoun + auxiliary + pas + past participle
          </p>
        </div>

        <div className="space-y-4 mt-6">
          {passeComposeExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-gradient-to-r from-cyan-50 to-white rounded-xl border border-cyan-100"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-slate-500 line-through">{ex.original}</span>
                <FaArrowRight className="text-cyan-400" />
                <span className="text-lg font-medium text-cyan-700">
                  {ex.replaced}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-2">{ex.english}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <h4 className="font-semibold text-amber-800 mb-2">Teaching Note</h4>
          <p className="text-amber-700">
            Indirect object pronouns do not trigger the same past participle agreement rule that direct object pronouns do in the same way.
            At this level, keep the focus on identifying the pronoun and placing it correctly.
          </p>
          <p className="text-amber-700 mt-2">
            <strong>For now, focus mainly on where the pronoun goes.</strong>
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function DirectVsIndirectSection({
  isReviewed,
  onMarkReviewed,
}: {
  isReviewed: boolean;
  onMarkReviewed: (id: string) => void;
}) {
  return (
    <SectionCard
      id="direct-vs-indirect"
      title="Direct vs Indirect Comparison"
      icon={FaBalanceScale}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <h4 className="font-semibold text-emerald-800 mb-2">Direct Object</h4>
            <p className="text-emerald-700">
              Receives the action directly, without <strong>à</strong>
            </p>
          </div>
          <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
            <h4 className="font-semibold text-cyan-800 mb-2">Indirect Object</h4>
            <p className="text-cyan-700">
              Usually comes with <strong>à</strong> and often refers to a person
            </p>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {directVsIndirectExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs font-semibold text-emerald-600 uppercase">Direct</span>
                  <p className="text-emerald-700">{ex.direct}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-cyan-600 uppercase">Indirect</span>
                  <p className="text-cyan-700">{ex.indirect}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">{ex.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-amber-800">
            <strong>Key question:</strong> Is the verb followed directly by the object, or by à + person?
          </p>
          <p className="text-amber-700 mt-2">
            This difference is one of the most important things to notice.
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
          Study these examples to see indirect object pronouns in different contexts:
        </p>

        <div className="grid gap-4 mt-4">
          {guidedExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
            >
              <span className="text-lg font-medium text-cyan-700">
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
            These mistakes are very common. They usually happen when learners mix direct and indirect object patterns.
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
      onComplete(score + (isCorrect ? 0 : 0)); // Score will be passed properly
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

  if (showResults) {
    const finalScore = score + (isCorrect && !hasSubmitted ? 0 : isCorrect ? 1 : 0);
    const adjustedScore = hasSubmitted && isCorrect && currentQuestion === practiceQuestions.length - 1
      ? score + 1
      : score;
    const performance = getPerformanceMessage(adjustedScore, practiceQuestions.length);

    return (
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 mb-4">
            <span className="text-4xl">{performance.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Practice Complete!
          </h2>
          <p className="text-slate-600">
            You scored {adjustedScore} out of {practiceQuestions.length}
          </p>
          <p className="text-lg font-medium text-cyan-600 mt-1">
            {Math.round((adjustedScore / practiceQuestions.length) * 100)}%
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
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-colors font-medium"
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
          <span className="text-sm font-medium text-cyan-600">
            Score: {score}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-300"
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
            <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium mb-3">
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
                      : "bg-cyan-100 border-2 border-cyan-500 text-cyan-800"
                    : hasSubmitted && idx === question.correct
                    ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800"
                    : "bg-slate-50 border-2 border-slate-200 hover:border-cyan-300 text-slate-700"
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
                className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-medium transition-colors"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
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
      className="bg-gradient-to-br from-cyan-600 to-teal-500 rounded-2xl p-8 text-white shadow-lg"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
          <FaTrophy size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
        <p className="text-cyan-100 mb-6">
          You&apos;ve completed A2 Lesson 7 — Indirect Object Pronouns
        </p>

        {practiceScore > 0 && (
          <p className="text-cyan-50 mb-4">
            Practice score: {practiceScore}/{practiceQuestions.length}
          </p>
        )}

        <div className="bg-white/10 rounded-xl p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What you now know:</h3>
          <ul className="space-y-1 text-cyan-50 text-sm">
            <li>• How to identify an indirect object in a simple sentence</li>
            <li>• How to replace an indirect object with the correct French pronoun</li>
            <li>• How to place the indirect object pronoun correctly before the verb</li>
            <li>• How to use indirect object pronouns in negation</li>
            <li>• How indirect object pronouns work in the passé composé</li>
            <li>• How to distinguish indirect object pronouns from direct object pronouns</li>
          </ul>
        </div>

        <Link
          href="/classes/A2/lesson8"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-cyan-600 rounded-xl font-medium hover:bg-cyan-50 transition-colors"
        >
          Continue to Lesson 8
          <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function Lesson7Page() {
  const [reviewedSections, setReviewedSections] = useState<string[]>([]);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("a2Lesson7Progress");
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
        "a2Lesson7Progress",
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
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-slate-50 flex items-center justify-center">
        <div className="text-cyan-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/classes/A2"
            className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors"
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
        <IntroSection
          isReviewed={reviewedSections.includes("intro")}
          onMarkReviewed={handleMarkReviewed}
        />

        <WhatIsPronounSection
          isReviewed={reviewedSections.includes("what-is-pronoun")}
          onMarkReviewed={handleMarkReviewed}
        />

        <PronounsTableSection
          isReviewed={reviewedSections.includes("pronouns-table")}
          onMarkReviewed={handleMarkReviewed}
        />

        <CommonVerbsSection
          isReviewed={reviewedSections.includes("common-verbs")}
          onMarkReviewed={handleMarkReviewed}
        />

        <ReplacingSection
          isReviewed={reviewedSections.includes("replacing")}
          onMarkReviewed={handleMarkReviewed}
        />

        <PositionSection
          isReviewed={reviewedSections.includes("position")}
          onMarkReviewed={handleMarkReviewed}
        />

        <NegationSection
          isReviewed={reviewedSections.includes("negation")}
          onMarkReviewed={handleMarkReviewed}
        />

        <PasseComposeSection
          isReviewed={reviewedSections.includes("passe-compose")}
          onMarkReviewed={handleMarkReviewed}
        />

        <DirectVsIndirectSection
          isReviewed={reviewedSections.includes("direct-vs-indirect")}
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
          <div className="p-6 bg-gradient-to-r from-cyan-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500 rounded-xl text-white">
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
