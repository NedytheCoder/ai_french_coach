"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  FiTrendingUp, FiMessageCircle, FiBookOpen, FiAward, FiZap
} from "react-icons/fi"
import { AuthGuard } from "../../../auth/AuthGuard"
import { useAuth } from "../../../auth/AuthProvider"
import { usePairs, useProgress } from "../../../../lib/hooks"
import { useToast } from "../../../components/ToastProvider"
import type { DailyRecord } from "../../../Types"

// ---------------------------------------------------------------------------
// XP thresholds — mirrors backend/services/progress_service.py (ADR-003)
// ---------------------------------------------------------------------------
const LEVEL_COLORS: Record<string, string> = {
  A0: "bg-slate-100 text-slate-600",
  A1: "bg-green-100 text-green-700",
  A2: "bg-teal-100 text-teal-700",
  B1: "bg-blue-100 text-blue-700",
  B2: "bg-indigo-100 text-indigo-700",
  C1: "bg-purple-100 text-purple-700",
  C2: "bg-amber-100 text-amber-700",
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType
  label: string
  value: number | string
  color: string
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xl sm:text-2xl font-bold text-slate-800 truncate">{value}</p>
        <p className="text-xs text-slate-500 mt-0.5 truncate">{label}</p>
      </div>
    </motion.div>
  )
}

function XpBarChart({ history }: { history: DailyRecord[] }) {
  const maxXp = Math.max(...history.map((d) => d.xp_earned), 1)

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <p className="text-sm font-semibold text-slate-700 mb-4">Daily XP — last 7 days</p>
      <div className="flex items-end gap-2 h-28">
        {history.map((day, i) => {
          const heightPct = Math.round((day.xp_earned / maxXp) * 100)
          const label = new Date(day.date + "T00:00:00Z").toLocaleDateString(undefined, {
            weekday: "short",
          })
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-cyan-400 relative group"
                style={{ height: `${heightPct}%`, minHeight: day.xp_earned > 0 ? "4px" : "0" }}
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
              >
                {day.xp_earned > 0 && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.xp_earned} XP
                  </span>
                )}
              </motion.div>
              <span className="text-[10px] text-slate-400">{label}</span>
            </div>
          )
        })}
        {history.length === 0 && (
          <p className="text-sm text-slate-400 w-full text-center self-center">
            No activity yet. Start chatting to earn XP!
          </p>
        )}
      </div>
    </div>
  )
}

function LevelProgressBar({
  currentLevel,
  xpInLevel,
  xpRequired,
  percent,
}: {
  currentLevel: string
  xpInLevel: number
  xpRequired: number
  percent: number
}) {
  const levelClass = LEVEL_COLORS[currentLevel] ?? "bg-slate-100 text-slate-600"
  const isMaxLevel = xpRequired === 0

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-700">Level progress</p>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${levelClass}`}>
          {currentLevel}
        </span>
      </div>
      {isMaxLevel ? (
        <p className="text-sm text-amber-600 font-semibold">Maximum level reached!</p>
      ) : (
        <>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-slate-400">{xpInLevel.toLocaleString()} XP earned</span>
            <span className="text-xs text-slate-400">{xpRequired.toLocaleString()} XP to advance</span>
          </div>
        </>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function ProgressPage() {
  return (
    <AuthGuard>
      <ProgressContent />
    </AuthGuard>
  )
}

function ProgressContent() {
  const params = useParams<{ pairId: string }>()
  const pairId = parseInt(params.pairId, 10)

  const { accessToken } = useAuth()
  const { pairs } = usePairs(accessToken)
  const pair = pairs.find((p) => p.id === pairId) ?? null

  const { progress, isLoading, error } = useProgress(accessToken, pairId)
  const { addToast } = useToast()

  useEffect(() => {
    if (error) addToast(error, "error")
  }, [error, addToast])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Header */}
      <motion.div
        className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 sm:px-6 py-4 sticky top-0 z-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href={`/learn/${pairId}`} className="text-slate-400 hover:text-slate-600 transition-colors text-sm shrink-0">
            ←
          </Link>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md shrink-0">
            <FiTrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-slate-800 truncate">
              {pair ? `${pair.source_language.name} → ${pair.target_language.name}` : "Loading…"}
            </h1>
            <p className="text-xs text-slate-500">Progress</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {isLoading && (
          <div className="flex justify-center py-16">
            <motion.div
              className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {progress && !isLoading && (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                icon={FiZap}
                label="Day streak"
                value={progress.streak_days}
                color="bg-amber-100 text-amber-600"
              />
              <StatCard
                icon={FiAward}
                label="Longest streak"
                value={progress.longest_streak}
                color="bg-purple-100 text-purple-600"
              />
              <StatCard
                icon={FiBookOpen}
                label="Lessons completed"
                value={progress.lessons_completed}
                color="bg-teal-100 text-teal-600"
              />
              <StatCard
                icon={FiMessageCircle}
                label="Messages sent"
                value={progress.messages_sent}
                color="bg-blue-100 text-blue-600"
              />
            </div>

            {/* Level progress */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <LevelProgressBar
                currentLevel={progress.level_progress.current_level}
                xpInLevel={progress.level_progress.xp_in_level}
                xpRequired={progress.level_progress.xp_required}
                percent={progress.level_progress.percent}
              />
            </motion.div>

            {/* Daily XP chart */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <XpBarChart history={progress.daily_history} />
            </motion.div>

            {/* Total XP */}
            <motion.div
              className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-5 text-white flex items-center justify-between"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div>
                <p className="text-sm font-medium opacity-80">Total XP earned</p>
                <p className="text-3xl font-bold mt-0.5">{progress.total_xp.toLocaleString()}</p>
              </div>
              <FiTrendingUp className="w-10 h-10 opacity-30" />
            </motion.div>
          </>
        )}

        {!progress && !isLoading && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FiTrendingUp className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 text-sm">No progress data yet.</p>
            <Link
              href={`/learn/${pairId}/chat`}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Start chatting to earn XP
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
