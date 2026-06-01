"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  FiLock, FiCheck, FiStar, FiMessageCircle, FiBook, FiMic, FiFileText,
  FiEdit2, FiList, FiZap, FiChevronDown, FiChevronRight, FiAward, FiTrendingUp,
} from "react-icons/fi"
import { AuthGuard } from "../../auth/AuthGuard"
import { useAuth } from "../../auth/AuthProvider"
import { usePairs } from "../../../lib/hooks"
import { useToast } from "../../components/ToastProvider"
import { lessonApi } from "../../../lib/api"

// ─── Constants ────────────────────────────────────────────────────────────────

const CEFR_LEVELS = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"] as const
type CefrLevel = (typeof CEFR_LEVELS)[number]

const LEVEL_META: Record<CefrLevel, { label: string; color: string; bg: string }> = {
  A0: { label: "Beginner",           color: "text-slate-600",  bg: "bg-slate-100"  },
  A1: { label: "Elementary",         color: "text-green-700",  bg: "bg-green-100"  },
  A2: { label: "Pre-Intermediate",   color: "text-teal-700",   bg: "bg-teal-100"   },
  B1: { label: "Intermediate",       color: "text-blue-700",   bg: "bg-blue-100"   },
  B2: { label: "Upper-Intermediate", color: "text-indigo-700", bg: "bg-indigo-100" },
  C1: { label: "Advanced",           color: "text-purple-700", bg: "bg-purple-100" },
  C2: { label: "Proficient",         color: "text-amber-700",  bg: "bg-amber-100"  },
}

interface LessonTypeConfig {
  type: string
  label: string
  icon: React.ElementType
  xp: number
  iconBg: string
  iconColor: string
}

// XP rewards mirror backend/ai/lesson_generator.py (M3-01)
const LESSON_TYPES: LessonTypeConfig[] = [
  { type: "vocabulary", label: "Vocabulary", icon: FiBook,        xp: 25, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { type: "grammar",    label: "Grammar",    icon: FiList,        xp: 30, iconBg: "bg-blue-100",    iconColor: "text-blue-600"    },
  { type: "reading",    label: "Reading",    icon: FiFileText,    xp: 30, iconBg: "bg-indigo-100",  iconColor: "text-indigo-600"  },
  { type: "listening",  label: "Listening",  icon: FiMessageCircle, xp: 30, iconBg: "bg-cyan-100", iconColor: "text-cyan-600"    },
  { type: "writing",    label: "Writing",    icon: FiEdit2,       xp: 40, iconBg: "bg-purple-100",  iconColor: "text-purple-600"  },
  { type: "speaking",   label: "Speaking",   icon: FiMic,         xp: 40, iconBg: "bg-rose-100",    iconColor: "text-rose-600"    },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function LessonTypeCard({
  config,
  isGenerating,
  onStart,
}: {
  config: LessonTypeConfig
  isGenerating: boolean
  onStart: () => void
}) {
  const Icon = config.icon
  return (
    <motion.button
      type="button"
      onClick={onStart}
      disabled={isGenerating}
      className="w-full text-left bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.iconBg}`}>
          {isGenerating ? (
            <motion.div
              className="w-5 h-5 rounded-full border-2 border-slate-400 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800">{config.label}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <FiZap className="w-3 h-3 text-amber-500" />
            <span className="text-xs text-slate-500">{config.xp} XP</span>
          </div>
        </div>
        <FiChevronRight className="w-4 h-4 text-slate-300 shrink-0 group-hover:text-slate-400 transition-colors" />
      </div>
    </motion.button>
  )
}

function LevelCard({
  level,
  status,
  isExpanded,
  onToggle,
  generatingKey,
  onStartLesson,
}: {
  level: CefrLevel
  status: "completed" | "current" | "locked"
  isExpanded: boolean
  onToggle: () => void
  generatingKey: string | null
  onStartLesson: (lessonType: string) => void
}) {
  const meta = LEVEL_META[level]
  const isLocked = status === "locked"
  const isCurrent = status === "current"

  return (
    <motion.div
      className={`rounded-2xl border overflow-hidden ${isLocked ? "border-slate-100" : "border-slate-200 shadow-sm"}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isLocked ? 0.55 : 1, y: 0 }}
    >
      <button
        type="button"
        onClick={isLocked ? undefined : onToggle}
        disabled={isLocked}
        className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors
          ${isLocked
            ? "bg-slate-50 cursor-default"
            : isCurrent
              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
              : "bg-white hover:bg-slate-50"
          }`}
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
            ${isLocked
              ? "bg-slate-200 text-slate-400"
              : isCurrent
                ? "bg-white/20 text-white"
                : `${meta.bg} ${meta.color}`
            }`}
        >
          {isLocked
            ? <FiLock className="w-4 h-4" />
            : status === "completed"
              ? <FiCheck className="w-4 h-4" />
              : <FiStar className="w-4 h-4" />
          }
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-bold ${isCurrent ? "text-white" : isLocked ? "text-slate-400" : "text-slate-800"}`}>
              {level}
            </span>
            <span className={`text-xs ${isCurrent ? "text-white/80" : isLocked ? "text-slate-400" : "text-slate-500"}`}>
              {meta.label}
            </span>
            {isCurrent && (
              <span className="text-[10px] font-bold bg-white/25 text-white px-2 py-0.5 rounded-full">
                CURRENT
              </span>
            )}
          </div>
          {isLocked && (
            <p className="text-xs text-slate-400 mt-0.5">Advance to unlock this level</p>
          )}
        </div>

        {!isLocked && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={isCurrent ? "text-white/70" : "text-slate-400"}
          >
            <FiChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && !isLocked && (
          <motion.div
            key="panel"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50/60 border-t border-slate-100">
              {LESSON_TYPES.map((lt) => (
                <LessonTypeCard
                  key={lt.type}
                  config={lt}
                  isGenerating={generatingKey === `${level}-${lt.type}`}
                  onStart={() => onStartLesson(lt.type)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LearningPathPage() {
  return (
    <AuthGuard>
      <LearningPathContent />
    </AuthGuard>
  )
}

function LearningPathContent() {
  const params = useParams<{ pairId: string }>()
  const pairId = parseInt(params.pairId, 10)
  const router = useRouter()
  const { accessToken } = useAuth()
  const { pairs, isLoading, error } = usePairs(accessToken)
  const { addToast } = useToast()

  const pair = pairs.find((p) => p.id === pairId) ?? null
  const currentLevel = (pair?.current_level ?? "A0") as CefrLevel
  const currentLevelIndex = CEFR_LEVELS.indexOf(currentLevel)

  const initializedRef = useRef(false)
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set())
  const [generatingKey, setGeneratingKey] = useState<string | null>(null)

  useEffect(() => {
    if (error) addToast(error, "error")
  }, [error, addToast])

  useEffect(() => {
    if (pair && !initializedRef.current) {
      initializedRef.current = true
      setExpandedLevels(new Set([pair.current_level]))
    }
  }, [pair])

  function toggleLevel(level: string) {
    setExpandedLevels((prev) => {
      const next = new Set(prev)
      if (next.has(level)) next.delete(level)
      else next.add(level)
      return next
    })
  }

  async function handleStartLesson(level: CefrLevel, lessonType: string) {
    if (!accessToken) return
    const key = `${level}-${lessonType}`
    setGeneratingKey(key)
    try {
      const lesson = await lessonApi.generate(accessToken, pairId, level, lessonType)
      setGeneratingKey(null)
      router.push(`/learn/${pairId}/lesson/${lesson.lesson_id}`)
    } catch (e) {
      addToast(e instanceof Error ? e.message : "Failed to generate lesson", "error")
      setGeneratingKey(null)
    }
  }

  const quickNav = [
    { href: `/learn/${pairId}/chat`,       label: "Chat",       Icon: FiMessageCircle },
    { href: `/learn/${pairId}/assessment`,  label: "Assessment", Icon: FiAward         },
    { href: `/learn/${pairId}/vocabulary`,  label: "Vocabulary", Icon: FiBook          },
    { href: `/learn/${pairId}/progress`,    label: "Progress",   Icon: FiTrendingUp    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Header */}
      <motion.div
        className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 sm:px-6 py-4 sticky top-0 z-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-slate-600 transition-colors text-sm shrink-0"
          >
            ←
          </Link>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md shrink-0">
            <FiTrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base font-bold text-slate-800 truncate">
              {pair
                ? `${pair.source_language.name} → ${pair.target_language.name}`
                : "Loading…"}
            </h1>
            <p className="text-xs text-slate-500">Learning Path</p>
          </div>
          {pair && (
            <span
              className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_META[currentLevel].bg} ${LEVEL_META[currentLevel].color}`}
            >
              {currentLevel}
            </span>
          )}
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Quick navigation */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {quickNav.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors shrink-0 shadow-sm"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>

        {/* Hero stats */}
        {pair && (
          <motion.div
            className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-5 text-white"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <div className="flex items-center gap-6 flex-wrap">
              <div>
                <p className="text-xs font-medium text-white/70">Current Level</p>
                <p className="text-3xl font-bold mt-0.5">{currentLevel}</p>
                <p className="text-xs text-white/60 mt-0.5">{LEVEL_META[currentLevel].label}</p>
              </div>
              <div className="h-12 w-px bg-white/20 hidden sm:block" />
              <div>
                <p className="text-xs font-medium text-white/70">Total XP</p>
                <p className="text-2xl font-bold mt-0.5">{pair.total_xp.toLocaleString()}</p>
              </div>
              <div className="h-12 w-px bg-white/20 hidden sm:block" />
              <div>
                <p className="text-xs font-medium text-white/70">Streak</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <FiZap className="w-5 h-5 text-amber-300" />
                  <p className="text-2xl font-bold">{pair.streak_days}</p>
                </div>
                <p className="text-xs text-white/60 mt-0.5">days</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <motion.div
              className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* CEFR level path */}
        {!isLoading && pair && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">
              Learning Path
            </p>
            {CEFR_LEVELS.map((level, i) => {
              const status: "completed" | "current" | "locked" =
                i < currentLevelIndex
                  ? "completed"
                  : i === currentLevelIndex
                    ? "current"
                    : "locked"
              return (
                <LevelCard
                  key={level}
                  level={level}
                  status={status}
                  isExpanded={expandedLevels.has(level)}
                  onToggle={() => toggleLevel(level)}
                  generatingKey={generatingKey}
                  onStartLesson={(lt) => handleStartLesson(level, lt)}
                />
              )
            })}
          </div>
        )}

        {/* No pair found */}
        {!isLoading && !pair && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-slate-500 text-sm">Language pair not found.</p>
            <Link
              href="/languages"
              className="mt-4 px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Manage language pairs
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
