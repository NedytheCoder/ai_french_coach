"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  FaArrowRight, FaCheckCircle, FaMicrophone, FaMicrophoneSlash,
  FaStar, FaGraduationCap, FaRedo, FaComments
} from "react-icons/fa"
import { FiBookOpen, FiHeadphones, FiEdit3, FiMic, FiLoader } from "react-icons/fi"
import { AuthGuard } from "../../../auth/AuthGuard"
import { useAuth } from "../../../auth/AuthProvider"
import { useToast } from "../../../components/ToastProvider"
import { usePairs } from "../../../../lib/hooks"
import { assessmentApi, transcriptionApi } from "../../../../lib/api"
import type { AssessmentQuestion, AssessmentResult } from "../../../Types"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Phase = "intro" | "generating" | "questions" | "submitting" | "results" | "error"
type AssessmentType = "placement" | "progress"

const ALL_SKILLS = ["reading", "listening", "writing", "speaking"] as const
type Skill = typeof ALL_SKILLS[number]

const SKILL_META: Record<Skill, { label: string; icon: React.ElementType; color: string }> = {
  reading:   { label: "Reading",   icon: FiBookOpen,  color: "from-blue-500 to-cyan-500"     },
  listening: { label: "Listening", icon: FiHeadphones, color: "from-purple-500 to-violet-500" },
  writing:   { label: "Writing",   icon: FiEdit3,     color: "from-emerald-500 to-teal-500"  },
  speaking:  { label: "Speaking",  icon: FiMic,       color: "from-amber-500 to-orange-500"  },
}

// ---------------------------------------------------------------------------
// Page export
// ---------------------------------------------------------------------------

export default function AssessmentPage() {
  return (
    <AuthGuard>
      <AssessmentContent />
    </AuthGuard>
  )
}

// ---------------------------------------------------------------------------
// Main content
// ---------------------------------------------------------------------------

function AssessmentContent() {
  const { pairId: rawId } = useParams<{ pairId: string }>()
  const pairId = parseInt(rawId, 10)
  const { accessToken } = useAuth()
  const { pairs } = usePairs(accessToken)
  const pair = pairs.find(p => p.id === pairId) ?? null
  const { addToast } = useToast()

  const [phase, setPhase]               = useState<Phase>("intro")
  const [assessmentType, setAssessmentType] = useState<AssessmentType>("placement")
  const [selectedSkills, setSelectedSkills] = useState<Set<Skill>>(new Set(ALL_SKILLS))
  const [assessmentId, setAssessmentId] = useState<number | null>(null)
  const [questions, setQuestions]       = useState<AssessmentQuestion[]>([])
  const [currentIdx, setCurrentIdx]     = useState(0)
  const [answers, setAnswers]           = useState<Record<string, string>>({})
  const [result, setResult]             = useState<AssessmentResult | null>(null)
  const [prevLevel, setPrevLevel]       = useState<string | null>(null)
  const [error, setError]               = useState("")

  const toggleSkill = (skill: Skill) => {
    setSelectedSkills(prev => {
      const next = new Set(prev)
      if (next.has(skill)) { if (next.size > 1) next.delete(skill) }
      else next.add(skill)
      return next
    })
  }

  const handleStart = async () => {
    if (!accessToken || !pairId) return
    setPhase("generating")
    setPrevLevel(pair?.current_level ?? null)
    try {
      const data = await assessmentApi.start(
        accessToken, pairId, assessmentType, Array.from(selectedSkills)
      )
      setAssessmentId(data.assessment_id)
      setQuestions(data.questions)
      setCurrentIdx(0)
      setAnswers({})
      setPhase("questions")
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to generate questions."
      setError(msg)
      addToast(msg, "error")
      setPhase("error")
    }
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1)
    }
  }

  const handleSubmit = async () => {
    if (!accessToken || !assessmentId) return
    setPhase("submitting")
    const payload = questions.map(q => ({
      question_id: q.id,
      skill: q.skill,
      answer: answers[q.id] ?? "",
    }))
    try {
      const data = await assessmentApi.submit(accessToken, assessmentId, payload)
      setResult(data.result)
      setPhase("results")
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to submit answers."
      setError(msg)
      addToast(msg, "error")
      setPhase("error")
    }
  }

  const currentQuestion = questions[currentIdx] ?? null
  const allAnswered = questions.length > 0 && questions.every(q => (answers[q.id] ?? "").trim() !== "")

  if (phase === "intro") {
    return (
      <IntroScreen
        pair={pair}
        assessmentType={assessmentType}
        onTypeChange={setAssessmentType}
        selectedSkills={selectedSkills}
        onToggleSkill={toggleSkill}
        onStart={handleStart}
      />
    )
  }

  if (phase === "generating") return <SpinnerScreen message="Generating your personalised assessment…" hint="This may take up to 15 seconds." />
  if (phase === "submitting") return <SpinnerScreen message="Scoring your answers…" hint="Almost there!" />

  if (phase === "error") {
    return (
      <CenteredCard>
        <p className="text-rose-600 font-medium mb-4">{error}</p>
        <button onClick={() => setPhase("intro")} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
          Try Again
        </button>
      </CenteredCard>
    )
  }

  if (phase === "questions" && currentQuestion) {
    return (
      <QuestionScreen
        pair={pair}
        question={currentQuestion}
        questionIndex={currentIdx}
        totalQuestions={questions.length}
        currentAnswer={answers[currentQuestion.id] ?? ""}
        onAnswer={(ans) => handleAnswer(currentQuestion.id, ans)}
        onNext={handleNext}
        isLast={currentIdx === questions.length - 1}
        allAnswered={allAnswered}
        onSubmit={handleSubmit}
      />
    )
  }

  if (phase === "results" && result) {
    return (
      <ResultsScreen
        pair={pair}
        result={result}
        prevLevel={prevLevel}
        pairId={pairId}
        onRetake={() => setPhase("intro")}
      />
    )
  }

  return null
}

// ---------------------------------------------------------------------------
// Intro Screen
// ---------------------------------------------------------------------------

function IntroScreen({
  pair, assessmentType, onTypeChange, selectedSkills, onToggleSkill, onStart,
}: {
  pair: ReturnType<typeof usePairs>["pairs"][number] | null
  assessmentType: AssessmentType
  onTypeChange: (t: AssessmentType) => void
  selectedSkills: Set<Skill>
  onToggleSkill: (s: Skill) => void
  onStart: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">← Back</Link>
          <span className="font-semibold text-slate-800 flex items-center gap-2">
            <FaGraduationCap className="text-indigo-500 w-4 h-4" /> Assessment
          </span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        {/* Pair header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center">
          <p className="text-sm text-slate-500 mb-1">You are being assessed in</p>
          <div className="flex items-center justify-center gap-2 text-xl font-bold">
            <span className="text-slate-700">{pair?.source_language.name ?? "…"}</span>
            <FaArrowRight className="w-4 h-4 text-slate-400" />
            <span className="text-indigo-700">{pair?.target_language.name ?? "…"}</span>
          </div>
          <span className="inline-block mt-2 text-xs font-semibold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full">
            Current level: {pair?.current_level ?? "…"}
          </span>
        </motion.div>

        {/* Type selector */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">Assessment type</p>
          <div className="grid grid-cols-2 gap-3">
            {(["placement", "progress"] as const).map(t => (
              <button key={t} onClick={() => onTypeChange(t)}
                className={`p-4 rounded-2xl border text-sm font-medium text-left transition-all ${
                  assessmentType === t
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 text-slate-600 hover:border-indigo-200"
                }`}>
                <p className="font-semibold capitalize">{t}</p>
                <p className="text-xs mt-0.5 opacity-70">
                  {t === "placement" ? "Find your starting level" : "Check your progress"}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills selector */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">Skills to test</p>
          <div className="grid grid-cols-2 gap-3">
            {ALL_SKILLS.map(skill => {
              const meta = SKILL_META[skill]
              const active = selectedSkills.has(skill)
              return (
                <button key={skill} onClick={() => onToggleSkill(skill)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                    active ? "border-indigo-400 bg-indigo-50" : "border-slate-200 hover:border-indigo-200"
                  }`}>
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center shrink-0`}>
                    <meta.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${active ? "text-indigo-700" : "text-slate-700"}`}>{meta.label}</p>
                    {active && <p className="text-xs text-indigo-400">Included</p>}
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          onClick={onStart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
        >
          <FaGraduationCap className="w-5 h-5" />
          Start Assessment ({selectedSkills.size} question{selectedSkills.size !== 1 ? "s" : ""})
        </motion.button>
        <p className="text-center text-xs text-slate-400">AI-generated questions · takes ~10–15 seconds to prepare</p>
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Question Screen
// ---------------------------------------------------------------------------

function QuestionScreen({
  pair, question, questionIndex, totalQuestions,
  currentAnswer, onAnswer, onNext, isLast, allAnswered, onSubmit,
}: {
  pair: ReturnType<typeof usePairs>["pairs"][number] | null
  question: AssessmentQuestion
  questionIndex: number
  totalQuestions: number
  currentAnswer: string
  onAnswer: (a: string) => void
  onNext: () => void
  isLast: boolean
  allAnswered: boolean
  onSubmit: () => void
}) {
  const meta = SKILL_META[question.skill as Skill] ?? SKILL_META.reading
  const hasAnswer = currentAnswer.trim() !== ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10 flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-slate-100">
        <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${meta.color} bg-opacity-10`}>
            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center`}>
              <meta.icon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-semibold text-slate-700">{meta.label}</span>
          </div>
          <span className="text-xs text-slate-400">{questionIndex + 1} / {totalQuestions}</span>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div key={question.id}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex-1">
            {question.type === "multiple_choice" ? (
              <MultipleChoiceQuestion question={question} selected={currentAnswer} onSelect={onAnswer} />
            ) : question.skill === "speaking" ? (
              <SpeakingQuestion question={question} currentAnswer={currentAnswer} onAnswer={onAnswer} />
            ) : (
              <WritingQuestion question={question} answer={currentAnswer} onChange={onAnswer} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3">
          {!isLast ? (
            <button onClick={onNext} disabled={!hasAnswer}
              className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2">
              Next <FaArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={onSubmit} disabled={!allAnswered}
              className="flex-1 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20">
              <FaCheckCircle className="w-4 h-4" /> Submit Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Multiple Choice Question
// ---------------------------------------------------------------------------

function MultipleChoiceQuestion({
  question, selected, onSelect,
}: {
  question: AssessmentQuestion
  selected: string
  onSelect: (v: string) => void
}) {
  return (
    <div className="space-y-5">
      {question.passage && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Passage</p>
          {/* dir="auto" for RTL target languages */}
          <p className="text-slate-800 leading-relaxed text-base" dir="auto">{question.passage}</p>
        </div>
      )}
      <p className="text-base font-semibold text-slate-800">{question.question}</p>
      {question.instructions && (
        <p className="text-xs text-slate-500 italic">{question.instructions}</p>
      )}
      <div className="space-y-2.5">
        {(question.options ?? []).map((opt, i) => (
          <motion.button key={i} onClick={() => onSelect(String(i))}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-left font-medium text-sm transition-all ${
              selected === String(i)
                ? "border-indigo-400 bg-indigo-50 text-indigo-800"
                : "border-slate-200 bg-white hover:border-indigo-200 text-slate-700"
            }`}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              selected === String(i) ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Writing Question
// ---------------------------------------------------------------------------

function WritingQuestion({
  question, answer, onChange,
}: {
  question: AssessmentQuestion
  answer: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-base font-semibold text-slate-800">{question.question}</p>
      {question.instructions && (
        <p className="text-xs text-slate-500 italic">{question.instructions}</p>
      )}
      <textarea
        value={answer}
        onChange={e => onChange(e.target.value)}
        placeholder={question.placeholder ?? "Write your answer…"}
        dir="auto"
        rows={6}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
      />
      <p className="text-xs text-slate-400 text-right">{answer.length} characters</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Speaking Question
// ---------------------------------------------------------------------------

function SpeakingQuestion({
  question, currentAnswer, onAnswer,
}: {
  question: AssessmentQuestion
  currentAnswer: string
  onAnswer: (v: string) => void
}) {
  const [isRecording, setIsRecording] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcription, setTranscription] = useState(currentAnswer)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.start()
      setIsRecording(true)
    } catch { /* microphone unavailable */ }
  }

  const stopRecording = () => {
    if (!mediaRef.current || !isRecording) return
    mediaRef.current.stop()
    mediaRef.current.stream.getTracks().forEach(t => t.stop())
    setIsRecording(false)

    mediaRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" })
      setIsTranscribing(true)
      try {
        const data = await transcriptionApi.transcribe(blob)
        const text = data.transcription?.trim() ?? ""
        setTranscription(text)
        onAnswer(text)
      } catch { /* ignore */ } finally {
        setIsTranscribing(false)
      }
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-base font-semibold text-slate-800">{question.question}</p>
      {question.instructions && (
        <p className="text-xs text-slate-500 italic">{question.instructions}</p>
      )}

      <div className="flex justify-center py-4">
        {isTranscribing ? (
          <div className="flex flex-col items-center gap-2 text-slate-500 text-sm">
            <FiLoader className="w-8 h-8 animate-spin text-indigo-500" />
            Transcribing…
          </div>
        ) : isRecording ? (
          <motion.button onClick={stopRecording}
            className="w-20 h-20 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/30"
            animate={{ boxShadow: ["0 0 0 0 rgba(239,68,68,0.4)", "0 0 0 16px rgba(239,68,68,0)"] }}
            transition={{ duration: 1, repeat: Infinity }}>
            <FaMicrophoneSlash className="w-8 h-8" />
          </motion.button>
        ) : (
          <motion.button onClick={startRecording}
            className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-xl shadow-indigo-500/30"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FaMicrophone className="w-8 h-8" />
          </motion.button>
        )}
      </div>
      <p className="text-center text-xs text-slate-400">
        {isRecording ? "Recording — tap to stop" : isTranscribing ? "" : "Tap the mic to record your answer"}
      </p>

      {transcription && !isRecording && (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-xs font-medium text-slate-500">Transcription</p>
            <button onClick={() => { setTranscription(""); onAnswer("") }}
              className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors">
              <FaRedo className="w-3 h-3" /> Re-record
            </button>
          </div>
          <p className="text-sm text-slate-800" dir="auto">{transcription}</p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Results Screen
// ---------------------------------------------------------------------------

function ResultsScreen({
  pair, result, prevLevel, pairId, onRetake,
}: {
  pair: ReturnType<typeof usePairs>["pairs"][number] | null
  result: AssessmentResult
  prevLevel: string | null
  pairId: number
  onRetake: () => void
}) {
  const leveledUp = prevLevel !== null && prevLevel !== result.overall_level

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10 flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-4 py-10 space-y-6">

        {/* Level result */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-indigo-500/20">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <FaGraduationCap className="w-12 h-12 text-white" />
          </motion.div>

          {leveledUp && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 rounded-full text-amber-900 text-xs font-bold mb-3">
              <FaStar className="w-3 h-3" /> Level Up!
            </motion.div>
          )}

          <p className="text-white/80 text-sm mb-1">Your assessed level</p>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-6xl font-bold tracking-tight">{result.overall_level}
          </motion.p>
          <p className="text-white/70 text-sm mt-2">{pair?.target_language.name ?? ""}</p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-5 flex items-center justify-center gap-1.5 bg-white/20 rounded-2xl px-4 py-2 w-fit mx-auto">
            <FaStar className="w-4 h-4 text-amber-300" />
            <span className="font-bold">+{result.total_xp_awarded} XP earned</span>
          </motion.div>
        </motion.div>

        {/* Feedback */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
          <p className="text-sm text-slate-600 leading-relaxed">{result.feedback}</p>
        </motion.div>

        {/* Per-skill breakdown */}
        {Object.keys(result.skill_levels).length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
            <p className="text-sm font-semibold text-slate-700 mb-4">Skill breakdown</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(result.skill_levels).map(([skill, level]) => {
                const meta = SKILL_META[skill as Skill] ?? SKILL_META.reading
                return (
                  <div key={skill} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center shrink-0`}>
                      <meta.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 capitalize">{skill}</p>
                      <p className="text-sm font-bold text-slate-800">{level}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* CTA buttons */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3">
          <Link href={`/learn/${pairId}/chat`}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2">
            <FaComments className="w-4 h-4" /> Start Chatting
          </Link>
          <button onClick={onRetake}
            className="flex-1 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2">
            <FaRedo className="w-4 h-4" /> Retake
          </button>
        </motion.div>

        <div className="text-center">
          <Link href="/dashboard" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared utilities
// ---------------------------------------------------------------------------

function SpinnerScreen({ message, hint }: { message: string; hint?: string }) {
  return (
    <CenteredCard>
      <FiLoader className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
      <p className="font-semibold text-slate-800 mb-1">{message}</p>
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </CenteredCard>
  )
}

function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/10 px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 text-center max-w-sm w-full">
        {children}
      </motion.div>
    </div>
  )
}
