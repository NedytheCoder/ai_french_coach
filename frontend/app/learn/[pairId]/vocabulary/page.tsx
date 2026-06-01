"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import { FiBookOpen, FiCheck, FiX, FiEye, FiList, FiRotateCcw } from "react-icons/fi"
import { AuthGuard } from "../../../auth/AuthGuard"
import { useAuth } from "../../../auth/AuthProvider"
import { usePairs, useVocabulary } from "../../../../lib/hooks"
import { vocabularyApi } from "../../../../lib/api"
import type { VocabularyItem } from "../../../Types"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatReviewDate(iso: string | null): string {
  if (!iso) return "Due now"
  const d = new Date(iso)
  const now = new Date()
  if (d <= now) return "Due now"
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

// ---------------------------------------------------------------------------
// Browse tab — full word list
// ---------------------------------------------------------------------------

function WordRow({ item }: { item: VocabularyItem }) {
  const isDue = !item.next_review_at || new Date(item.next_review_at) <= new Date()
  return (
    <motion.div
      className="bg-white rounded-2xl px-5 py-4 border border-slate-100 shadow-sm flex items-start justify-between gap-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-800 text-base truncate" dir="auto">
          {item.target_word}
        </p>
        <p className="text-sm text-slate-500 mt-0.5 truncate" dir="auto">
          {item.source_translation}
        </p>
        {item.context_sentence && (
          <p className="text-xs text-slate-400 mt-1 italic truncate" dir="auto">
            {item.context_sentence}
          </p>
        )}
      </div>
      <div className="shrink-0 text-right">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            isDue
              ? "bg-amber-100 text-amber-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {formatReviewDate(item.next_review_at)}
        </span>
        <p className="text-xs text-slate-400 mt-1">
          {item.times_correct}/{item.times_seen} correct
        </p>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Review tab — flashcard session
// ---------------------------------------------------------------------------

type ReviewState = "front" | "back" | "done"

function FlashcardSession({
  queue,
  token,
  onComplete,
}: {
  queue: VocabularyItem[]
  token: string
  onComplete: (xpEarned: number) => void
}) {
  const [idx, setIdx] = useState(0)
  const [face, setFace] = useState<ReviewState>("front")
  const [xpTotal, setXpTotal] = useState(0)
  const [xpToast, setXpToast] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const item = queue[idx]

  async function handleAnswer(correct: boolean) {
    if (submitting) return
    setSubmitting(true)
    try {
      const result = await vocabularyApi.review(token, item.id, correct)
      if (result.xp_awarded > 0) {
        setXpTotal((x) => x + result.xp_awarded)
        setXpToast(result.xp_awarded)
        setTimeout(() => setXpToast(null), 2000)
      }
    } catch {
      // proceed even if the network call fails
    }
    setSubmitting(false)

    if (idx + 1 < queue.length) {
      setFace("front")
      setIdx((i) => i + 1)
    } else {
      onComplete(xpTotal + (correct ? 2 : 0))
    }
  }

  if (!item) return null

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
          animate={{ width: `${((idx) / queue.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-xs text-slate-400 -mt-4 self-end">
        {idx + 1} / {queue.length}
      </p>

      {/* Card */}
      <motion.div
        key={`card-${idx}`}
        className="w-full bg-white rounded-3xl border border-slate-100 shadow-md p-8 text-center min-h-[220px] flex flex-col items-center justify-center gap-4"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="text-2xl font-bold text-slate-800" dir="auto">
          {item.target_word}
        </p>

        <AnimatePresence>
          {face === "back" && (
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-lg text-indigo-700 font-semibold" dir="auto">
                {item.source_translation}
              </p>
              {item.context_sentence && (
                <p className="text-sm text-slate-400 italic mt-1" dir="auto">
                  {item.context_sentence}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Actions */}
      {face === "front" ? (
        <button
          onClick={() => setFace("back")}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors shadow"
        >
          <FiEye className="w-4 h-4" />
          Reveal
        </button>
      ) : (
        <div className="flex gap-4 w-full">
          <button
            onClick={() => handleAnswer(false)}
            disabled={submitting}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-200 font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            <FiX className="w-5 h-5" />
            Didn&apos;t get it
          </button>
          <button
            onClick={() => handleAnswer(true)}
            disabled={submitting}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-green-50 text-green-700 border border-green-200 font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
          >
            <FiCheck className="w-5 h-5" />
            Got it
          </button>
        </div>
      )}

      {/* XP toast */}
      <AnimatePresence>
        {xpToast !== null && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg pointer-events-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            +{xpToast} XP ✨
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ReviewSummary({
  total,
  xpEarned,
  onRestart,
}: {
  total: number
  xpEarned: number
  onRestart: () => void
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-6 py-8 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg">
        <FiCheck className="w-8 h-8 text-white" />
      </div>
      <div>
        <p className="text-xl font-bold text-slate-800">Session complete!</p>
        <p className="text-sm text-slate-500 mt-1">
          You reviewed {total} word{total !== 1 ? "s" : ""}
        </p>
      </div>
      {xpEarned > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-6 py-3">
          <p className="text-2xl font-bold text-indigo-600">+{xpEarned} XP</p>
          <p className="text-xs text-indigo-400 mt-0.5">earned this session</p>
        </div>
      )}
      <button
        onClick={onRestart}
        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors shadow"
      >
        <FiRotateCcw className="w-4 h-4" />
        Review again
      </button>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function VocabularyPage() {
  return (
    <AuthGuard>
      <VocabularyContent />
    </AuthGuard>
  )
}

function VocabularyContent() {
  const params = useParams<{ pairId: string }>()
  const pairId = parseInt(params.pairId, 10)

  const { accessToken } = useAuth()
  const { pairs } = usePairs(accessToken)
  const pair = pairs.find((p) => p.id === pairId) ?? null

  const [tab, setTab] = useState<"review" | "browse">("review")
  const [sessionKey, setSessionKey] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)
  const [sessionXp, setSessionXp] = useState(0)

  const dueItems = useVocabulary(accessToken, pairId, true)
  const allItems = useVocabulary(accessToken, pairId, false)

  const reviewQueue = dueItems.items
  const isLoading = tab === "review" ? dueItems.isLoading : allItems.isLoading
  const error = tab === "review" ? dueItems.error : allItems.error

  function handleSessionComplete(xpEarned: number) {
    setSessionXp(xpEarned)
    setSessionDone(true)
  }

  function handleRestart() {
    setSessionDone(false)
    setSessionXp(0)
    setSessionKey((k) => k + 1)
    dueItems.refetch()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20">
      {/* Header */}
      <motion.div
        className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 sm:px-6 py-4 sticky top-0 z-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            href={`/learn/${pairId}`}
            className="text-slate-400 hover:text-slate-600 transition-colors text-sm shrink-0"
          >
            ←
          </Link>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shrink-0">
            <FiBookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base font-bold text-slate-800 truncate">
              {pair ? `${pair.source_language.name} → ${pair.target_language.name}` : "Loading…"}
            </h1>
            <p className="text-xs text-slate-500">Vocabulary</p>
          </div>
          {allItems.items.length > 0 && (
            <span className="shrink-0 text-xs text-slate-400">
              {allItems.items.length} words
            </span>
          )}
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("review")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === "review"
                ? "bg-indigo-500 text-white shadow"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <FiRotateCcw className="w-4 h-4" />
            Review
            {dueItems.items.length > 0 && (
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  tab === "review" ? "bg-white/30" : "bg-amber-100 text-amber-700"
                }`}
              >
                {dueItems.items.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("browse")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === "browse"
                ? "bg-indigo-500 text-white shadow"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <FiList className="w-4 h-4" />
            Browse
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <motion.div
              className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Review tab */}
        {tab === "review" && !isLoading && !error && (
          <>
            {reviewQueue.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheck className="w-7 h-7 text-green-600" />
                </div>
                <p className="text-slate-700 font-semibold">All caught up!</p>
                <p className="text-slate-400 text-sm">No words due for review right now.</p>
                <button
                  onClick={() => setTab("browse")}
                  className="mt-2 px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
                >
                  Browse all words
                </button>
              </div>
            ) : sessionDone ? (
              <ReviewSummary
                total={reviewQueue.length}
                xpEarned={sessionXp}
                onRestart={handleRestart}
              />
            ) : (
              <FlashcardSession
                key={sessionKey}
                queue={reviewQueue}
                token={accessToken ?? ""}
                onComplete={handleSessionComplete}
              />
            )}
          </>
        )}

        {/* Browse tab */}
        {tab === "browse" && !isLoading && !error && (
          <>
            {allItems.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                <FiBookOpen className="w-10 h-10 text-slate-300" />
                <p className="text-slate-500 text-sm">
                  No vocabulary saved yet. Start chatting to collect words!
                </p>
                <Link
                  href={`/learn/${pairId}/chat`}
                  className="mt-2 px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors"
                >
                  Go to chat
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {allItems.items.map((item) => (
                  <WordRow key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
