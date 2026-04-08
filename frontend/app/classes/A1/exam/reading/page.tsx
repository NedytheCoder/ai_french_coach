'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { readingExamQuestions, type ReadingExamQuestion } from './data'
import { ReadingExamIntro } from './components/reading-exam-intro'
import { ReadingQuestionCard } from './components/reading-question-card'
import { ReadingExamResults, type ReadingExamAnswer } from './components/reading-exam-results'

type PersistedReadingExamState = {
  version: 1
  started: boolean
  completed: boolean
  currentIndex: number
  answers: ReadingExamAnswer[]
}

const STORAGE_KEY = 'a1-reading-exam-v1'

function safeParseState(raw: string | null): PersistedReadingExamState | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as PersistedReadingExamState
    if (!parsed || parsed.version !== 1) return null
    if (typeof parsed.started !== 'boolean') return null
    if (typeof parsed.completed !== 'boolean') return null
    if (typeof parsed.currentIndex !== 'number') return null
    if (!Array.isArray(parsed.answers)) return null
    return parsed
  } catch {
    return null
  }
}

function persistState(next: PersistedReadingExamState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore persistence failures (private mode, quota, etc.)
  }
}

export default function ReadingExamPage() {
  const questions = readingExamQuestions as readonly ReadingExamQuestion[]
  const totalQuestions = questions.length

  const [hydrated, setHydrated] = useState(false)
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<ReadingExamAnswer[]>([])

  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const currentQuestion = questions[currentIndex]

  const canSubmit = selectedOption !== null && !isSubmitted
  const canGoNext = isSubmitted

  const progressLabel = useMemo(() => {
    if (!started) return 'intro'
    if (completed) return 'results'
    return `q-${currentIndex + 1}`
  }, [started, completed, currentIndex])

  useEffect(() => {
    const restored = safeParseState(window.localStorage.getItem(STORAGE_KEY))
    if (restored) {
      setStarted(restored.started)
      setCompleted(restored.completed)
      setCurrentIndex(Math.min(Math.max(0, restored.currentIndex), Math.max(0, totalQuestions - 1)))
      setAnswers(restored.answers)
    }
    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!hydrated) return
    persistState({
      version: 1,
      started,
      completed,
      currentIndex,
      answers
    })
  }, [hydrated, started, completed, currentIndex, answers])

  useEffect(() => {
    if (!hydrated) return
    if (!started || completed) return

    const existing = answers.find(a => a.questionId === currentQuestion?.id)
    if (existing) {
      setSelectedOption(existing.selectedOption)
      setIsSubmitted(true)
    } else {
      setSelectedOption(null)
      setIsSubmitted(false)
    }
  }, [hydrated, started, completed, currentQuestion?.id, answers])

  const startExam = () => {
    setStarted(true)
    setCompleted(false)
    setCurrentIndex(0)
    setAnswers([])
    setSelectedOption(null)
    setIsSubmitted(false)
  }

  const submitAnswer = () => {
    if (!currentQuestion) return
    if (!canSubmit) return

    const selected = selectedOption as number
    setAnswers(prev => {
      const without = prev.filter(a => a.questionId !== currentQuestion.id)
      return [...without, { questionId: currentQuestion.id, selectedOption: selected }]
    })
    setIsSubmitted(true)
  }

  const next = () => {
    if (!canGoNext) return
    const nextIndex = currentIndex + 1
    if (nextIndex >= totalQuestions) {
      setCompleted(true)
      return
    }
    setCurrentIndex(nextIndex)
  }

  const retake = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setStarted(false)
    setCompleted(false)
    setCurrentIndex(0)
    setAnswers([])
    setSelectedOption(null)
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key={`screen-${progressLabel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReadingExamIntro totalQuestions={totalQuestions} estimatedTime="15–20 minutes" onStart={startExam} />
          </motion.div>
        ) : completed ? (
          <motion.div
            key={`screen-${progressLabel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReadingExamResults questions={questions} answers={answers} onRetake={retake} />
          </motion.div>
        ) : (
          <motion.div
            key={`screen-${progressLabel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReadingQuestionCard
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              selectedOption={selectedOption}
              onSelectOption={setSelectedOption}
              onSubmit={submitAnswer}
              onNext={next}
              isSubmitted={isSubmitted}
              isLast={currentIndex + 1 === totalQuestions}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

