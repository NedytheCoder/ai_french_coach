"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  FiLoader, FiCheck, FiX, FiArrowRight, FiBookOpen,
} from "react-icons/fi"
import { FaMicrophone, FaMicrophoneSlash, FaStar, FaArrowUp } from "react-icons/fa"
import { AuthGuard } from "../../../../auth/AuthGuard"
import { useAuth } from "../../../../auth/AuthProvider"
import { usePairs, useLesson } from "../../../../../lib/hooks"
import { lessonApi, scoringApi, transcriptionApi } from "../../../../../lib/api"
import type { LessonOut, CompleteLessonResponse, UserLanguagePair } from "../../../../Types"

// ---------------------------------------------------------------------------
// Content shape interfaces (mirror ai/lesson_generator.py schemas)
// ---------------------------------------------------------------------------

interface VocabItem {
  target_word: string
  source_translation: string
  example_sentence: string
  example_translation: string
}

interface GrammarExample {
  target_sentence: string
  source_translation: string
  note?: string
}

interface GrammarExercise {
  prompt: string
  answer: string
  options?: string[]
}

interface ReadingQuestion {
  question: string
  options: string[]
  correct_index: number
}

interface SpeakingPrompt {
  text: string
  example_response: string
}

// ---------------------------------------------------------------------------
// Page export
// ---------------------------------------------------------------------------

export default function LessonPage() {
  return (
    <AuthGuard>
      <LessonContent />
    </AuthGuard>
  )
}

// ---------------------------------------------------------------------------
// Main orchestrator
// ---------------------------------------------------------------------------

type Phase = "lesson" | "completing" | "results" | "error"

function LessonContent() {
  const { pairId: rawPairId, lessonId: rawLessonId } = useParams<{ pairId: string; lessonId: string }>()
  const pairId = parseInt(rawPairId, 10)
  const lessonId = parseInt(rawLessonId, 10)
  const { accessToken } = useAuth()
  const { pairs } = usePairs(accessToken)
  const pair = pairs.find(p => p.id === pairId) ?? null
  const { lesson, isLoading, error: fetchError } = useLesson(accessToken, lessonId)

  const [phase, setPhase] = useState<Phase>("lesson")
  const [result, setResult] = useState<CompleteLessonResponse | null>(null)
  const [completeError, setCompleteError] = useState("")

  async function handleComplete(score: number, maxScore: number) {
    if (!accessToken) return
    setPhase("completing")
    try {
      const data = await lessonApi.complete(accessToken, lessonId, score, maxScore)
      setResult(data)
      setPhase("results")
    } catch (e) {
      setCompleteError(e instanceof Error ? e.message : "Failed to save completion.")
      setPhase("error")
    }
  }

  if (isLoading) return <SpinnerScreen message="Loading lesson…" />

  if (fetchError || !lesson) {
    return (
      <CenteredCard>
        <p className="text-rose-600 font-medium mb-4">{fetchError ?? "Lesson not found."}</p>
        <Link href={`/learn/${pairId}`} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
          Back to Learning Path
        </Link>
      </CenteredCard>
    )
  }

  if (phase === "completing") return <SpinnerScreen message="Saving your progress…" />

  if (phase === "error") {
    return (
      <CenteredCard>
        <p className="text-rose-600 font-medium mb-4">{completeError}</p>
        <button onClick={() => setPhase("lesson")} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
          Try Again
        </button>
      </CenteredCard>
    )
  }

  if (phase === "results" && result) {
    return <CompletionScreen lesson={lesson} result={result} pairId={pairId} />
  }

  return (
    <LessonShell lesson={lesson} pair={pair} pairId={pairId}>
      <LessonRenderer lesson={lesson} pair={pair} token={accessToken ?? ""} onComplete={handleComplete} />
    </LessonShell>
  )
}

// ---------------------------------------------------------------------------
// Shell — sticky nav with lesson title + XP badge
// ---------------------------------------------------------------------------

function LessonShell({
  lesson, pair, pairId, children,
}: {
  lesson: LessonOut
  pair: UserLanguagePair | null
  pairId: number
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href={`/learn/${pairId}`} className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
            ← Back
          </Link>
          <div className="text-center min-w-0 px-3">
            <p className="font-semibold text-slate-800 text-sm truncate">{lesson.title}</p>
            <p className="text-xs text-slate-400 truncate">
              {pair ? `${pair.source_language.name} → ${pair.target_language.name}` : ""} · {lesson.level}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full shrink-0">
            <FaStar className="w-3 h-3 text-amber-400" />
            {lesson.xp_reward} XP
          </div>
        </div>
      </nav>
      <main className="max-w-2xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Router — dispatches to the correct lesson sub-component
// ---------------------------------------------------------------------------

function LessonRenderer({
  lesson, pair, token, onComplete,
}: {
  lesson: LessonOut
  pair: UserLanguagePair | null
  token: string
  onComplete: (score: number, maxScore: number) => void
}) {
  switch (lesson.lesson_type) {
    case "vocabulary":
      return <VocabularyLesson lesson={lesson} onComplete={onComplete} />
    case "grammar":
      return <GrammarLesson lesson={lesson} onComplete={onComplete} />
    case "reading":
      return <ReadingLesson lesson={lesson} onComplete={onComplete} />
    case "listening":
      return <ListeningLesson lesson={lesson} onComplete={onComplete} />
    case "writing":
      return <WritingLesson lesson={lesson} pair={pair} token={token} onComplete={onComplete} />
    case "speaking":
      return <SpeakingLesson lesson={lesson} token={token} onComplete={onComplete} />
    default:
      return (
        <p className="text-center py-12 text-slate-500 text-sm">
          Unknown lesson type: {lesson.lesson_type}
        </p>
      )
  }
}

// ---------------------------------------------------------------------------
// Vocabulary — flashcard flip
// ---------------------------------------------------------------------------

function VocabularyLesson({
  lesson, onComplete,
}: {
  lesson: LessonOut
  onComplete: (s: number, m: number) => void
}) {
  const items = (lesson.content as { items?: VocabItem[] }).items ?? []
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  function next() {
    if (idx + 1 < items.length) {
      setIdx(i => i + 1)
      setFlipped(false)
    } else {
      onComplete(items.length, items.length)
    }
  }

  const item = items[idx]

  return (
    <div className="space-y-6">
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
          animate={{ width: `${(idx / items.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-xs text-slate-400 text-right -mt-4">{idx + 1} / {items.length}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${idx}-${flipped}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          onClick={() => setFlipped(f => !f)}
          className="cursor-pointer bg-white rounded-3xl border border-slate-200 shadow-md p-10 text-center min-h-[220px] flex flex-col items-center justify-center gap-4 hover:border-indigo-300 transition-colors select-none"
        >
          {!flipped ? (
            <>
              <p className="text-2xl font-bold text-slate-800" dir="auto">{item?.target_word}</p>
              <p className="text-xs text-slate-400">Tap to reveal translation</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-indigo-700" dir="auto">{item?.source_translation}</p>
              {item?.example_sentence && (
                <div className="mt-1 space-y-1 text-sm text-slate-500">
                  <p dir="auto" className="italic">{item.example_sentence}</p>
                  <p className="text-slate-400">{item.example_translation}</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        {!flipped ? (
          <button
            onClick={() => setFlipped(true)}
            className="flex-1 py-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-2xl transition-colors"
          >
            Reveal
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            onClick={next}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition-colors"
          >
            {idx + 1 < items.length
              ? <><FiArrowRight className="w-4 h-4" /> Next Card</>
              : <><FiCheck className="w-4 h-4" /> Complete Lesson</>
            }
          </motion.button>
        )}
      </div>
      <p className="text-center text-xs text-slate-400">Tap card or Reveal to flip</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Grammar — explanation + fill-in-the-blank exercises
// ---------------------------------------------------------------------------

function GrammarLesson({
  lesson, onComplete,
}: {
  lesson: LessonOut
  onComplete: (s: number, m: number) => void
}) {
  const content = lesson.content as {
    explanation?: string
    examples?: GrammarExample[]
    exercises?: GrammarExercise[]
  }
  const exercises = content.exercises ?? []

  const [phase, setPhase] = useState<"learn" | "practice">("learn")
  const [answers, setAnswers] = useState<string[]>(exercises.map(() => ""))
  const [selectedOptions, setSelectedOptions] = useState<number[]>(exercises.map(() => -1))
  const [submitted, setSubmitted] = useState(false)

  const results = exercises.map((ex, i) => {
    const userAns = ex.options ? (ex.options[selectedOptions[i]] ?? "") : answers[i]
    return userAns.trim().toLowerCase() === ex.answer.trim().toLowerCase()
  })
  const correctCount = results.filter(Boolean).length

  if (phase === "learn") {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">Grammar Rule</p>
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{content.explanation}</p>
        </motion.div>

        {(content.examples ?? []).length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Examples</p>
            {(content.examples ?? []).map((ex, i) => (
              <div key={i} className="space-y-0.5">
                <p className="font-medium text-slate-800" dir="auto">{ex.target_sentence}</p>
                <p className="text-sm text-slate-500">{ex.source_translation}</p>
                {ex.note && <p className="text-xs text-indigo-500 italic">{ex.note}</p>}
              </div>
            ))}
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onClick={() => setPhase("practice")}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
        >
          Practice Exercises <FiArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {submitted && (
        <p className="text-sm font-semibold text-slate-700 text-center">
          {correctCount} / {exercises.length} correct
        </p>
      )}

      {exercises.map((ex, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          className={`bg-white rounded-2xl border p-5 space-y-3 ${
            submitted
              ? results[i] ? "border-green-200 bg-green-50/20" : "border-rose-200 bg-rose-50/20"
              : "border-slate-200"
          }`}
        >
          <p className="text-sm font-medium text-slate-800" dir="auto">{ex.prompt}</p>

          {ex.options ? (
            <div className="grid grid-cols-2 gap-2">
              {ex.options.map((opt, j) => {
                const isSelected = selectedOptions[i] === j
                const isCorrectOpt = opt.trim().toLowerCase() === ex.answer.trim().toLowerCase()
                let cls = isSelected
                  ? "border-indigo-400 bg-indigo-50 text-indigo-800"
                  : "border-slate-200 text-slate-600 hover:border-indigo-200"
                if (submitted) {
                  if (isCorrectOpt) cls = "border-green-400 bg-green-50 text-green-800"
                  else if (isSelected) cls = "border-rose-300 bg-rose-50 text-rose-700"
                  else cls = "border-slate-100 text-slate-400"
                }
                return (
                  <button key={j} disabled={submitted}
                    onClick={() => {
                      const updated = [...selectedOptions]; updated[i] = j; setSelectedOptions(updated)
                    }}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${cls}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          ) : (
            <input
              type="text"
              disabled={submitted}
              value={answers[i]}
              onChange={e => { const a = [...answers]; a[i] = e.target.value; setAnswers(a) }}
              placeholder="Type your answer…"
              dir="auto"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-slate-50 disabled:text-slate-500"
            />
          )}

          {submitted && (
            <div className={`flex items-center gap-2 text-xs font-medium ${results[i] ? "text-green-700" : "text-rose-600"}`}>
              {results[i] ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
              {results[i] ? "Correct!" : `Answer: ${ex.answer}`}
            </div>
          )}
        </motion.div>
      ))}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={exercises.some((ex, i) => !ex.options && !answers[i].trim())}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-2xl transition-colors"
        >
          Check Answers
        </button>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          onClick={() => onComplete(correctCount, exercises.length || 1)}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <FiCheck className="w-4 h-4" /> Complete Lesson
        </motion.button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Reading — passage + multiple choice
// ---------------------------------------------------------------------------

function ReadingLesson({
  lesson, onComplete,
}: {
  lesson: LessonOut
  onComplete: (s: number, m: number) => void
}) {
  const content = lesson.content as {
    passage?: string
    passage_translation?: string
    questions?: ReadingQuestion[]
  }
  const questions = content.questions ?? []
  const [selected, setSelected] = useState<number[]>(questions.map(() => -1))
  const [submitted, setSubmitted] = useState(false)

  const results = questions.map((q, i) => selected[i] === q.correct_index)
  const correctCount = results.filter(Boolean).length
  const allAnswered = selected.every(s => s !== -1)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Passage</p>
        <p className="text-slate-800 leading-relaxed" dir="auto">{content.passage}</p>
        {submitted && content.passage_translation && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-500 italic"
          >
            {content.passage_translation}
          </motion.p>
        )}
      </motion.div>

      {questions.map((q, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }}
          className={`bg-white rounded-2xl border p-5 space-y-3 ${
            submitted ? results[i] ? "border-green-200" : "border-rose-200" : "border-slate-200"
          }`}
        >
          <p className="text-sm font-semibold text-slate-800">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, j) => {
              const isSelected = selected[i] === j
              const isCorrect = j === q.correct_index
              let cls = isSelected
                ? "border-indigo-400 bg-indigo-50 text-indigo-800"
                : "border-slate-200 bg-white hover:border-indigo-200 text-slate-700"
              if (submitted) {
                if (isCorrect) cls = "border-green-400 bg-green-50 text-green-800"
                else if (isSelected) cls = "border-rose-300 bg-rose-50 text-rose-700"
                else cls = "border-slate-100 text-slate-400"
              }
              return (
                <button key={j} disabled={submitted}
                  onClick={() => { const s = [...selected]; s[i] = j; setSelected(s) }}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium text-left transition-all ${cls}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    submitted && isCorrect ? "bg-green-500 text-white"
                    : submitted && isSelected && !isCorrect ? "bg-rose-400 text-white"
                    : isSelected ? "bg-indigo-500 text-white"
                    : "bg-slate-100 text-slate-500"
                  }`}>
                    {String.fromCharCode(65 + j)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
        </motion.div>
      ))}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-2xl transition-colors"
        >
          Check Answers
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
            <p className="text-3xl font-bold text-slate-800">{correctCount} / {questions.length}</p>
            <p className="text-sm text-slate-400 mt-0.5">correct</p>
          </div>
          <button
            onClick={() => onComplete(correctCount, questions.length || 1)}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <FiCheck className="w-4 h-4" /> Complete Lesson
          </button>
        </motion.div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Listening — transcript + multiple choice
// ---------------------------------------------------------------------------

function ListeningLesson({
  lesson, onComplete,
}: {
  lesson: LessonOut
  onComplete: (s: number, m: number) => void
}) {
  const content = lesson.content as {
    transcript?: string
    transcript_translation?: string
    questions?: ReadingQuestion[]
  }
  const questions = content.questions ?? []
  const [selected, setSelected] = useState<number[]>(questions.map(() => -1))
  const [submitted, setSubmitted] = useState(false)

  const results = questions.map((q, i) => selected[i] === q.correct_index)
  const correctCount = results.filter(Boolean).length
  const allAnswered = selected.every(s => s !== -1)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Transcript</p>
        <p className="text-slate-800 leading-relaxed" dir="auto">{content.transcript}</p>
        {submitted && content.transcript_translation && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-500 italic"
          >
            {content.transcript_translation}
          </motion.p>
        )}
      </motion.div>

      {questions.map((q, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05 }}
          className={`bg-white rounded-2xl border p-5 space-y-3 ${
            submitted ? results[i] ? "border-green-200" : "border-rose-200" : "border-slate-200"
          }`}
        >
          <p className="text-sm font-semibold text-slate-800">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, j) => {
              const isSelected = selected[i] === j
              const isCorrect = j === q.correct_index
              let cls = isSelected
                ? "border-indigo-400 bg-indigo-50 text-indigo-800"
                : "border-slate-200 bg-white hover:border-indigo-200 text-slate-700"
              if (submitted) {
                if (isCorrect) cls = "border-green-400 bg-green-50 text-green-800"
                else if (isSelected) cls = "border-rose-300 bg-rose-50 text-rose-700"
                else cls = "border-slate-100 text-slate-400"
              }
              return (
                <button key={j} disabled={submitted}
                  onClick={() => { const s = [...selected]; s[i] = j; setSelected(s) }}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium text-left transition-all ${cls}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    submitted && isCorrect ? "bg-green-500 text-white"
                    : submitted && isSelected && !isCorrect ? "bg-rose-400 text-white"
                    : isSelected ? "bg-indigo-500 text-white"
                    : "bg-slate-100 text-slate-500"
                  }`}>
                    {String.fromCharCode(65 + j)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
        </motion.div>
      ))}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-2xl transition-colors"
        >
          Check Answers
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
            <p className="text-3xl font-bold text-slate-800">{correctCount} / {questions.length}</p>
            <p className="text-sm text-slate-400 mt-0.5">correct</p>
          </div>
          <button
            onClick={() => onComplete(correctCount, questions.length || 1)}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <FiCheck className="w-4 h-4" /> Complete Lesson
          </button>
        </motion.div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Writing — prompt + textarea + AI score
// ---------------------------------------------------------------------------

type WritePhase = "write" | "scoring" | "scored"

function WritingLesson({
  lesson, pair, token, onComplete,
}: {
  lesson: LessonOut
  pair: UserLanguagePair | null
  token: string
  onComplete: (s: number, m: number) => void
}) {
  const content = lesson.content as {
    instructions?: string
    prompt?: string
    example_response?: string
    criteria?: string[]
  }
  const [answer, setAnswer] = useState("")
  const [wPhase, setWPhase] = useState<WritePhase>("write")
  const [feedback, setFeedback] = useState("")
  const [xpAwarded, setXpAwarded] = useState(0)
  const [error, setError] = useState("")

  async function handleScore() {
    if (!answer.trim() || !pair) return
    setWPhase("scoring")
    setError("")
    try {
      const result = await scoringApi.scoreWriting(
        token,
        lesson.pair_id,
        content.prompt ?? "",
        lesson.level,
        answer,
        lesson.xp_reward,
      )
      setFeedback(result.feedback)
      setXpAwarded(result.xp_awarded)
      setWPhase("scored")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Scoring failed.")
      setWPhase("write")
    }
  }

  if (wPhase === "scoring") {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <FiLoader className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm text-slate-500">Scoring your answer…</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3">
        {content.instructions && (
          <p className="text-xs text-slate-500">{content.instructions}</p>
        )}
        <p className="text-base font-semibold text-slate-800" dir="auto">{content.prompt}</p>
      </motion.div>

      {(content.criteria ?? []).length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-indigo-50 rounded-2xl border border-indigo-100 p-4 space-y-2">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Grading Criteria</p>
          <ul className="space-y-1">
            {(content.criteria ?? []).map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-indigo-700">
                <FiCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-400" />
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          disabled={wPhase === "scored"}
          placeholder="Write your answer here…"
          dir="auto"
          rows={8}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none disabled:bg-slate-50"
        />
        <p className="text-right text-xs text-slate-400 mt-1">{answer.length} characters</p>
      </motion.div>

      <AnimatePresence>
        {wPhase === "scored" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-indigo-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-indigo-700">AI Feedback</p>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                +{xpAwarded} XP
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wPhase === "scored" && content.example_response && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Example Response</p>
            <p className="text-sm text-slate-700 leading-relaxed" dir="auto">{content.example_response}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-rose-600 text-sm text-center">{error}</p>}

      {wPhase === "write" && (
        <button
          onClick={handleScore}
          disabled={!answer.trim() || !pair}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-2xl transition-colors"
        >
          Submit for Scoring
        </button>
      )}

      {wPhase === "scored" && (
        <motion.button
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          onClick={() => onComplete(xpAwarded, lesson.xp_reward)}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <FiCheck className="w-4 h-4" /> Complete Lesson
        </motion.button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Speaking — prompts + audio recorder + AI score
// ---------------------------------------------------------------------------

type SpeakPhase = "idle" | "recording" | "transcribing" | "scoring" | "scored"

function SpeakingLesson({
  lesson, token, onComplete,
}: {
  lesson: LessonOut
  token: string
  onComplete: (s: number, m: number) => void
}) {
  const content = lesson.content as {
    context?: string
    prompts?: SpeakingPrompt[]
  }
  const prompts = content.prompts ?? []
  const perPromptXp = prompts.length > 0 ? Math.round(lesson.xp_reward / prompts.length) : lesson.xp_reward

  const [idx, setIdx] = useState(0)
  const [sPhase, setSPhase] = useState<SpeakPhase>("idle")
  const [transcription, setTranscription] = useState("")
  const [feedback, setFeedback] = useState("")
  const [correctCount, setCorrectCount] = useState(0)
  const [error, setError] = useState("")
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const currentPrompt = prompts[idx]

  async function startRecording() {
    setError("")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.start()
      setSPhase("recording")
    } catch {
      setError("Microphone unavailable.")
    }
  }

  function stopRecording() {
    if (!mediaRef.current) return
    mediaRef.current.stop()
    mediaRef.current.stream.getTracks().forEach(t => t.stop())

    mediaRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" })

      setSPhase("transcribing")
      let localTranscription = ""
      try {
        const tx = await transcriptionApi.transcribe(blob)
        localTranscription = tx.transcription?.trim() ?? ""
        setTranscription(localTranscription)
      } catch {
        setTranscription("")
      }

      setSPhase("scoring")
      try {
        const result = await scoringApi.scoreSpeaking(
          token, blob, lesson.pair_id, currentPrompt?.text ?? "", lesson.level, perPromptXp
        )
        setFeedback(result.feedback)
        if (result.transcription && !localTranscription) setTranscription(result.transcription)
        if (result.is_correct) setCorrectCount(c => c + 1)
      } catch {
        setFeedback("Could not score this response.")
      }
      setSPhase("scored")
    }
  }

  function handleNext() {
    if (idx + 1 < prompts.length) {
      setIdx(i => i + 1)
      setSPhase("idle")
      setTranscription("")
      setFeedback("")
      setError("")
    } else {
      onComplete(correctCount, prompts.length || 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
          animate={{ width: `${(idx / prompts.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-xs text-slate-400 text-right -mt-4">{idx + 1} / {prompts.length}</p>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3">
        {content.context && (
          <p className="text-xs text-slate-500">{content.context}</p>
        )}
        {currentPrompt && (
          <p className="text-base font-semibold text-slate-800" dir="auto">{currentPrompt.text}</p>
        )}
      </motion.div>

      <div className="flex flex-col items-center gap-4 py-4">
        {sPhase === "transcribing" || sPhase === "scoring" ? (
          <div className="flex flex-col items-center gap-2 text-sm text-slate-500">
            <FiLoader className="w-8 h-8 text-indigo-500 animate-spin" />
            {sPhase === "transcribing" ? "Transcribing…" : "Scoring…"}
          </div>
        ) : sPhase === "recording" ? (
          <motion.button
            onClick={stopRecording}
            className="w-20 h-20 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/30"
            animate={{ boxShadow: ["0 0 0 0 rgba(239,68,68,0.4)", "0 0 0 16px rgba(239,68,68,0)"] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <FaMicrophoneSlash className="w-8 h-8" />
          </motion.button>
        ) : sPhase === "idle" ? (
          <motion.button
            onClick={startRecording}
            className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-xl shadow-indigo-500/30"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          >
            <FaMicrophone className="w-8 h-8" />
          </motion.button>
        ) : null}
        <p className="text-xs text-slate-400 text-center">
          {sPhase === "recording" ? "Recording — tap to stop" : sPhase === "idle" ? "Tap the mic to record" : ""}
        </p>
      </div>

      {transcription && sPhase === "scored" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500 mb-1">Your response</p>
          <p className="text-sm text-slate-800" dir="auto">{transcription}</p>
        </motion.div>
      )}

      {feedback && sPhase === "scored" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-indigo-200 p-5">
          <p className="text-sm font-semibold text-indigo-700 mb-2">Feedback</p>
          <p className="text-sm text-slate-700 leading-relaxed">{feedback}</p>
        </motion.div>
      )}

      {sPhase === "scored" && currentPrompt?.example_response && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500 mb-1">Example response</p>
          <p className="text-sm text-slate-700" dir="auto">{currentPrompt.example_response}</p>
        </motion.div>
      )}

      {error && <p className="text-rose-600 text-sm text-center">{error}</p>}

      {sPhase === "scored" && (
        <motion.button
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2"
        >
          {idx + 1 < prompts.length
            ? <><FiArrowRight className="w-4 h-4" /> Next Prompt</>
            : <><FiCheck className="w-4 h-4" /> Complete Lesson</>
          }
        </motion.button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Completion screen — XP + level-up celebration
// ---------------------------------------------------------------------------

function CompletionScreen({
  lesson, result, pairId,
}: {
  lesson: LessonOut
  result: CompleteLessonResponse
  pairId: number
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10 flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-4 py-12 space-y-6">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-indigo-500/20"
        >
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4"
          >
            <FaStar className="w-10 h-10 text-amber-300" />
          </motion.div>

          {result.level_up && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 rounded-full text-amber-900 text-xs font-bold mb-3"
            >
              <FaArrowUp className="w-3 h-3" /> Level Up! → {result.new_level}
            </motion.div>
          )}

          <p className="text-white/80 text-sm mb-1">Lesson Complete!</p>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-5xl font-bold tracking-tight"
          >
            +{result.xp_awarded} XP
          </motion.p>
          <p className="text-white/60 text-sm mt-2">Total: {result.total_xp} XP</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center"
        >
          <p className="text-sm text-slate-400 mb-1">You completed</p>
          <p className="font-semibold text-slate-800">{lesson.title}</p>
          <p className="text-xs text-slate-400 mt-0.5 capitalize">{lesson.lesson_type} · {lesson.level}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            href={`/learn/${pairId}`}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            <FiBookOpen className="w-4 h-4" /> Continue Learning
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared utilities
// ---------------------------------------------------------------------------

function SpinnerScreen({ message }: { message: string }) {
  return (
    <CenteredCard>
      <FiLoader className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
      <p className="font-semibold text-slate-800">{message}</p>
    </CenteredCard>
  )
}

function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center max-w-sm w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
