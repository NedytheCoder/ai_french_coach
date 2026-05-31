"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { FaUser, FaCog, FaArrowRight, FaFire, FaPlus, FaStar, FaComments } from "react-icons/fa"
import { AuthGuard } from "../auth/AuthGuard"
import { useAuth } from "../auth/AuthProvider"
import { useLanguagePair } from "../LanguagePairProvider"
import { usePairs } from "../../lib/hooks"
import type { UserLanguagePair } from "../Types"

// ---------------------------------------------------------------------------
// XP thresholds — mirrors services/progress_service.py (ADR-003)
// GET /progress/{pair_id} (M4-01) will expose these once built.
// ---------------------------------------------------------------------------
const XP_TO_ADVANCE: Record<string, number> = {
  A0: 500, A1: 1000, A2: 2000, B1: 3500, B2: 5000, C1: 7500, C2: 0,
}
const XP_CUMULATIVE: Record<string, number> = {
  A0: 0, A1: 500, A2: 1500, B1: 3500, B2: 7000, C1: 12000, C2: 19500,
}

function levelProgress(level: string, totalXp: number) {
  const base = XP_CUMULATIVE[level] ?? 0
  const needed = XP_TO_ADVANCE[level] ?? 0
  if (needed === 0) return { inLevel: totalXp - base, needed: 0, pct: 100 }
  const inLevel = Math.max(0, totalXp - base)
  return { inLevel, needed, pct: Math.min(100, Math.round((inLevel / needed) * 100)) }
}

// ---------------------------------------------------------------------------
// Pair card
// ---------------------------------------------------------------------------

function PairCard({ pair }: { pair: UserLanguagePair }) {
  const { setActivePair } = useLanguagePair()
  const { inLevel, needed, pct } = levelProgress(pair.current_level, pair.total_xp)
  const isNewLearner = pair.total_xp === 0

  const levelColors: Record<string, string> = {
    A0: "bg-slate-100 text-slate-600",
    A1: "bg-green-100 text-green-700",
    A2: "bg-teal-100 text-teal-700",
    B1: "bg-blue-100 text-blue-700",
    B2: "bg-indigo-100 text-indigo-700",
    C1: "bg-purple-100 text-purple-700",
    C2: "bg-amber-100 text-amber-700",
  }
  const levelColor = levelColors[pair.current_level] ?? "bg-slate-100 text-slate-600"

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm shadow-slate-100 p-6 flex flex-col gap-5 hover:border-indigo-200 hover:shadow-indigo-50 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-bold text-slate-800">{pair.source_language.name}</span>
            <FaArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-lg font-bold text-indigo-700">{pair.target_language.name}</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${levelColor}`}>
              {pair.current_level}
            </span>
            {pair.streak_days > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-orange-600">
                <FaFire className="w-3 h-3" />
                {pair.streak_days}-day streak
              </span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-bold text-slate-800">{pair.total_xp.toLocaleString()}</p>
          <p className="text-xs text-slate-400">XP total</p>
        </div>
      </div>

      {/* XP progress bar */}
      {needed > 0 && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-slate-500">
              {inLevel.toLocaleString()} / {needed.toLocaleString()} XP to next level
            </span>
            <span className="text-xs font-semibold text-indigo-600">{pct}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
      {needed === 0 && (
        <div className="flex items-center gap-2">
          <FaStar className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold text-amber-700">Maximum level reached</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Link
          href={`/learn/${pair.id}/chat`}
          onClick={() => setActivePair(pair)}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl transition-colors"
        >
          <FaComments className="w-4 h-4" />
          {isNewLearner ? "Start chatting" : "Continue"}
        </Link>
        {isNewLearner && (
          <Link
            href={`/learn/${pair.id}/assessment`}
            className="flex items-center gap-2 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 text-sm font-medium px-4 py-2.5 rounded-2xl transition-colors"
          >
            <FaStar className="w-3.5 h-3.5" />
            Assessment
          </Link>
        )}
      </div>
    </motion.article>
  )
}

// ---------------------------------------------------------------------------
// Dashboard content
// ---------------------------------------------------------------------------

function DashboardContent() {
  const { user } = useAuth()
  const { accessToken } = useAuth()
  const { pairs, isLoading } = usePairs(accessToken)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10">
      {/* Nav */}
      <motion.nav
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">LC</span>
            </div>
            <span className="text-base font-semibold text-slate-800 hidden sm:inline">Language Coach</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/languages"
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-400 px-3 py-1.5 rounded-xl transition-colors">
              <FaPlus className="w-3 h-3" /> Add language
            </Link>
            <Link href="/dashboard/settings">
              <motion.button className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <FaCog className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link href="/dashboard/profile">
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <FaUser className="w-3.5 h-3.5 text-white" />
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <motion.div className="mb-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-medium text-indigo-600 mb-1">{greeting}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            {user?.display_name ?? "Welcome back"} 👋
          </h1>
          <p className="text-slate-500 mt-2">
            {isLoading
              ? "Loading your languages…"
              : pairs.length === 0
              ? "Add your first language to start learning."
              : `You're learning ${pairs.length} ${pairs.length === 1 ? "language" : "languages"}.`}
          </p>
        </motion.div>

        {/* Pairs grid */}
        <AnimatePresence mode="wait">
          {!isLoading && pairs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border-2 border-dashed border-slate-300 bg-white/60 p-12 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                <FaPlus className="w-7 h-7 text-indigo-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">No languages yet</h2>
              <p className="text-slate-500 mb-6 max-w-xs">
                Choose a language you speak and one you want to learn to get started.
              </p>
              <Link
                href="/languages"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
              >
                Add your first language
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              {pairs.map((pair) => <PairCard key={pair.id} pair={pair} />)}

              {/* Add language tile */}
              {pairs.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Link href="/languages"
                    className="flex flex-col items-center justify-center h-full min-h-[160px] rounded-3xl border-2 border-dashed border-slate-200 hover:border-indigo-300 bg-white/40 hover:bg-indigo-50/40 text-slate-400 hover:text-indigo-500 transition-all group">
                    <FaPlus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Add another language</span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page export
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
