"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaBook,
  FaHeadphones,
  FaPen,
  FaMicrophone,
  FaStar,
  FaArrowRight,
  FaRedo,
  FaList,
  FaTrophy,
  FaChartLine,
  FaCheckCircle
} from "react-icons/fa"

// =============================================================================
// TYPES & CONSTANTS
// =============================================================================

type CEFRLevel = "A0" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2"

type SkillKey = "reading" | "listening" | "writing" | "speaking"

type SkillResult = {
  key: SkillKey
  label: string
  score: number
  percentage: number
  level: CEFRLevel
  feedback: string
}

const MAX_SCORE = 220
const LOCAL_STORAGE_KEYS = {
  reading: "reading_test_score",
  listening: "listening_test_score",
  writing: "writing_test_score",
  speaking: "speaking_test_score"
}

const ROUTE_MAP: Record<CEFRLevel, string> = {
  A0: "/a0",
  A1: "/a1",
  A2: "/a2",
  B1: "/b1",
  B2: "/b2",
  C1: "/c1",
  C2: "/c2"
}

const SKILL_ICONS: Record<SkillKey, React.ReactElement> = {
  reading: <FaBook />,
  listening: <FaHeadphones />,
  writing: <FaPen />,
  speaking: <FaMicrophone />
}

const SKILL_LABELS: Record<SkillKey, string> = {
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking"
}

const SKILL_COLORS: Record<SkillKey, { bg: string; text: string; gradient: string }> = {
  reading: { bg: "bg-emerald-100", text: "text-emerald-700", gradient: "from-emerald-500 via-teal-500 to-cyan-500" },
  listening: { bg: "bg-blue-100", text: "text-blue-700", gradient: "from-blue-400 via-blue-500 to-cyan-500" },
  writing: { bg: "bg-amber-100", text: "text-amber-700", gradient: "from-amber-500 via-orange-500 to-yellow-500" },
  speaking: { bg: "bg-purple-100", text: "text-purple-700", gradient: "from-purple-500 via-purple-600 to-violet-500" }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function clampScore(score: number): number {
  return Math.max(0, Math.min(MAX_SCORE, score))
}

function getLevelFromRawScore(score: number): CEFRLevel {
  const safeScore = clampScore(score)

  if (safeScore <= 20) return "A0"
  if (safeScore <= 50) return "A1"
  if (safeScore <= 90) return "A2"
  if (safeScore <= 115) return "B1"
  if (safeScore <= 145) return "B2"
  if (safeScore <= 180) return "C1"
  return "C2"
}

function getPercentage(score: number): number {
  return Math.round((clampScore(score) / MAX_SCORE) * 100)
}

function getFeedbackForLevel(level: CEFRLevel, skill: SkillKey): string {
  const skillName = SKILL_LABELS[skill].toLowerCase()

  const feedbackMap: Record<CEFRLevel, string> = {
    A0: "You're starting from the basics. Build confidence with simple words and phrases.",
    A1: "You understand early beginner material. Keep practicing simple everyday language.",
    A2: "You're developing solid foundations and can handle familiar topics.",
    B1: "You're reaching intermediate control and can understand clear everyday French.",
    B2: "You show strong independence and can handle more complex French.",
    C1: "You demonstrate advanced control with strong nuance and comprehension.",
    C2: "You're performing at mastery level with excellent precision."
  }

  const baseFeedback = feedbackMap[level]

  // Add skill-specific context
  if (skill === "reading" && level === "A2") {
    return "Your reading is developing well. You can handle familiar topics and simple texts."
  }
  if (skill === "listening" && level === "C1") {
    return "Your listening is a clear strength. You can understand advanced spoken French with nuance."
  }
  if (skill === "writing" && level === "A0") {
    return "Your writing is at the starting point. Focus on simple sentences and core vocabulary."
  }
  if (skill === "speaking" && level === "A1") {
    return "Your speaking is emerging. Keep practicing everyday phrases out loud."
  }

  return baseFeedback
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function LevelBadge({ level }: { level: CEFRLevel }) {

  const levelColors: Record<CEFRLevel, { bg: string; text: string; border: string }> = {
    A0: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
    A1: { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" },
    A2: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },
    B1: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-300" },
    B2: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" },
    C1: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300" },
    C2: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-300" }
  }

  const colors = levelColors[level]

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} ${colors.text} ${colors.border} border-2`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, delay: 0.3 }}
    >
      <FaStar className="w-4 h-4" />
      <span className="font-bold text-lg">{level}</span>
    </motion.div>
  )
}

function AnimatedProgressBar({ percentage, gradient }: { percentage: number; gradient: string }) {
  return (
    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
      <motion.div
        className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      />
    </div>
  )
}

function SkillResultCard({ result, index }: { result: SkillResult; index: number }) {
  const colors = SKILL_COLORS[result.key]

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-xl`}>
            {SKILL_ICONS[result.key]}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{result.label}</h3>
            <p className="text-sm text-slate-500">
              {result.score} / {MAX_SCORE} points
            </p>
          </div>
        </div>
        <LevelBadge level={result.level} />
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-600 mb-2">
          <span>Progress</span>
          <span className={`font-semibold ${colors.text}`}>{result.percentage}%</span>
        </div>
        <AnimatedProgressBar percentage={result.percentage} gradient={colors.gradient} />
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{result.feedback}</p>
    </motion.div>
  )
}

function StrengthWeaknessCard({
  strongest,
  weakest
}: {
  strongest: SkillResult
  weakest: SkillResult
}) {
  return (
    <motion.div
      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <FaTrophy className="w-5 h-5 text-amber-500" />
        <h3 className="font-bold text-slate-800 text-lg">Strength & Focus</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-500 mb-1">Strongest Skill</p>
          <p className="font-bold text-slate-800 text-lg">{strongest.label}</p>
          <p className="text-sm text-emerald-600 font-semibold">{strongest.level}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-500 mb-1">Focus Area</p>
          <p className="font-bold text-slate-800 text-lg">{weakest.label}</p>
          <p className="text-sm text-amber-600 font-semibold">{weakest.level}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 text-center italic">
        "Your skills are allowed to grow at different speeds. This result helps you know where to focus."
      </p>
    </motion.div>
  )
}

function OverallResultCard({
  averageScore,
  averagePercentage,
  overallLevel
}: {
  averageScore: number
  averagePercentage: number
  overallLevel: CEFRLevel
}) {
  return (
    <motion.div
      className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl shadow-xl shadow-rose-200/50 border-2 border-rose-200 p-8 mt-7"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, delay: 0.7 }}
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FaChartLine className="w-6 h-6 text-rose-500" />
          <h3 className="font-bold text-slate-800 text-2xl">Overall French Level</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6">
        <div className="text-center mb-4">
          <p className="text-sm text-slate-500 mb-1">Overall Average</p>
          <p className="font-bold text-slate-800 text-3xl mb-2">
            {averageScore} / {MAX_SCORE}
          </p>
          <p className="text-2xl font-bold text-rose-600">{averagePercentage}%</p>
        </div>

        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.9 }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 via-red-400 to-pink-400 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-4xl">{overallLevel}</span>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-500 mb-1">Recommended Start</p>
          <p className="font-bold text-slate-800 text-xl">{overallLevel}</p>
        </div>
      </div>
    </motion.div>
  )
}

function ResultExplanationCard() {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, delay: 0.9 }}
    >
      <p className="text-sm text-slate-600 text-center leading-relaxed">
        "Your result is based on reading, listening, writing, and speaking. Some skills may be stronger than others, and that's completely normal. Your recommended level is a starting point, not a fixed label."
      </p>
    </motion.div>
  )
}

function ResultActions({
  overallLevel,
  onRetake,
  onChooseLevel
}: {
  overallLevel: CEFRLevel
  onRetake: () => void
  onChooseLevel: () => void
}) {
  const router = useRouter()

  const handleStartRecommended = () => {
    router.push(ROUTE_MAP[overallLevel])
  }

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, delay: 1 }}
    >
      <motion.button
        onClick={handleStartRecommended}
        className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(244,63,94,0.4)" }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Start Recommended Level</span>
        <FaArrowRight />
      </motion.button>

      <motion.button
        onClick={onRetake}
        className="w-full py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaRedo />
        <span>Retake Placement Test</span>
      </motion.button>

      <motion.button
        onClick={onChooseLevel}
        className="w-full py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaList />
        <span>Choose Level Manually</span>
      </motion.button>
    </motion.div>
  )
}

function EmptyResultState({ onContinue, onRestart }: { onContinue: () => void; onRestart: () => void }) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md w-full">
        <motion.div
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaList className="w-10 h-10 text-slate-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Placement results incomplete</h1>
            <p className="text-slate-600">
              We couldn't find all four skill scores. Complete the placement test to reveal your full French level.
            </p>
          </div>

          <div className="space-y-3">
            <motion.button
              onClick={onContinue}
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Continue Placement Test</span>
              <FaArrowRight />
            </motion.button>

            <motion.button
              onClick={onRestart}
              className="w-full py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaRedo />
              <span>Restart Placement Test</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function PlacementResultPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [skillResults, setSkillResults] = useState<SkillResult[]>([])
  const [overallLevel, setOverallLevel] = useState<CEFRLevel | null>(null)
  const [averageScore, setAverageScore] = useState(0)
  const [averagePercentage, setAveragePercentage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const loadResults = () => {
      try {
        const scores: Record<SkillKey, number> = {
          reading: 0,
          listening: 0,
          writing: 0,
          speaking: 0
        }

        let allScoresPresent = true

        // Read and validate scores from localStorage
        Object.keys(LOCAL_STORAGE_KEYS).forEach((key) => {
          const skillKey = key as SkillKey
          const value = localStorage.getItem(LOCAL_STORAGE_KEYS[skillKey])

          if (value === null || value === "") {
            allScoresPresent = false
            return
          }

          const parsedScore = parseInt(value, 10)

          if (isNaN(parsedScore)) {
            allScoresPresent = false
            return
          }

          scores[skillKey] = clampScore(parsedScore)
        })

        if (!allScoresPresent) {
          setIsComplete(false)
          setIsLoading(false)
          return
        }

        // Calculate individual skill results
        const results: SkillResult[] = (Object.keys(scores) as SkillKey[]).map((key) => ({
          key,
          label: SKILL_LABELS[key],
          score: scores[key],
          percentage: getPercentage(scores[key]),
          level: getLevelFromRawScore(scores[key]),
          feedback: getFeedbackForLevel(getLevelFromRawScore(scores[key]), key)
        }))

        setSkillResults(results)

        // Calculate overall average
        const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
        const avgScore = Math.round(totalScore / 4)
        const avgPercentage = getPercentage(avgScore)

        setAverageScore(avgScore)
        setAveragePercentage(avgPercentage)
        setOverallLevel(getLevelFromRawScore(avgScore))
        setIsComplete(true)
      } catch (error) {
        console.error("Error loading placement results:", error)
        setIsComplete(false)
      } finally {
        setIsLoading(false)
      }
    }

    loadResults()
  }, [])

  const handleRetake = () => {
    // Clear all localStorage keys
    Object.values(LOCAL_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
    router.push("/reception/tests")
  }

  const handleRestart = () => {
    // Clear all localStorage keys
    Object.values(LOCAL_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
    router.push("/reception/tests")
  }

  const handleContinue = () => {
    router.push("/reception/tests")
  }

  const handleChooseLevel = () => {
    router.push("/reception")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-lg font-semibold text-slate-700">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!isComplete) {
    return <EmptyResultState onContinue={handleContinue} onRestart={handleRestart} />
  }

  if (!overallLevel) {
    return <EmptyResultState onContinue={handleContinue} onRestart={handleRestart} />
  }

  // Find strongest and weakest skills
  const strongest = skillResults.reduce((prev, current) => (current.score > prev.score ? current : prev))
  const weakest = skillResults.reduce((prev, current) => (current.score < prev.score ? current : prev))

  // Check for weak skill warning
  const weakSkillWarning = weakest.score <= averageScore - 40 ? (
    <motion.div
      className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, delay: 0.8 }}
    >
      <p className="text-sm text-amber-800 text-center">
        Your overall level is {overallLevel}, but {weakest.label.toLowerCase()} may need extra attention.
      </p>
    </motion.div>
  ) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
          >
            <FaCheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Placement Complete</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Your Placement Results</h1>
          <p className="text-slate-600">Here's your skill-by-skill French level breakdown.</p>
        </motion.div>

        {/* Skill Level Breakdown */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FaChartLine className="text-amber-500" />
            Skill Level Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillResults.map((result, index) => (
              <SkillResultCard key={result.key} result={result} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Strength and Weakness Summary */}
        <StrengthWeaknessCard strongest={strongest} weakest={weakest} />

        {/* Weak Skill Warning */}
        {weakSkillWarning}

        {/* Overall Level Reveal */}
        <div className="mb-6">
          <OverallResultCard
            averageScore={averageScore}
            averagePercentage={averagePercentage}
            overallLevel={overallLevel}
          />
        </div>

        {/* Result Explanation */}
        <div className="mb-6">
          <ResultExplanationCard />
        </div>

        {/* Action Buttons */}
        <div className="mb-8">
          <ResultActions
            overallLevel={overallLevel}
            onRetake={handleRetake}
            onChooseLevel={handleChooseLevel}
          />
        </div>
      </div>
    </div>
  )
}
