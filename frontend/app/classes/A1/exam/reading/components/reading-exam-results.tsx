'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ReadingExamQuestion } from '../data'
import { ReadingExamProgressBar } from '@/app/shared/progress-bar'

export type ReadingExamAnswer = {
  questionId: number
  selectedOption: number
}

function getPassInfo(score: number, total: number) {
  const percentage = Math.round((score / total) * 100)
  const passMark = 60
  const passed = percentage >= passMark
  return { percentage, passed, passMark }
}

export function ReadingExamResults({
  questions,
  answers,
  onRetake
}: {
  questions: readonly ReadingExamQuestion[]
  answers: ReadingExamAnswer[]
  onRetake: () => void
}) {
  const total = questions.length
  const answerById = new Map(answers.map(a => [a.questionId, a.selectedOption] as const))
  const score = questions.reduce((acc, q) => {
    const selected = answerById.get(q.id)
    return acc + (selected === q.correct ? 1 : 0)
  }, 0)

  const { percentage, passed, passMark } = getPassInfo(score, total)
  const minimumPassingScore = Math.ceil((passMark / 100) * total)

  return (
    <div className="min-h-[calc(100vh-2rem)]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-7 sm:p-8 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-indigo-50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold">
              A1 Exam
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">A1 Reading Exam — Results</h1>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-500">Final score</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">
                  {score}/{total}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-500">Percentage</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">{percentage}%</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-500">Pass mark</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">
                  {minimumPassingScore}/{total}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <ReadingExamProgressBar value={percentage} label="Score" />
            </div>
          </div>

          <div className="p-7 sm:p-8">
            <div
              className={[
                'rounded-2xl border p-6',
                passed ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'
              ].join(' ')}
              role="status"
              aria-live="polite"
            >
              <div className="text-sm font-semibold text-slate-700">
                {passed ? 'Passed' : 'Not yet passed'}
              </div>

              {passed ? (
                <>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">Well done</h2>
                  <p className="mt-2 text-slate-700">
                    You’ve passed the A1 Reading Exam. Your reading foundation is strong enough to move forward.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">Not quite there yet</h2>
                  <p className="mt-2 text-slate-700">
                    You’ve already built some useful reading skills. Review the lessons that felt harder, then come back
                    and try again.
                  </p>
                  <p className="mt-2 text-slate-700">
                    You need at least <strong>{passMark}%</strong> ({minimumPassingScore}/{total}) to move on.
                    Revisiting the lessons can help you improve your grade.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {passed ? (
                <Link
                  href="/learn/a2/lesson-1"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  Continue to next class
                </Link>
              ) : (
                <div className="w-full sm:w-auto">
                  <div className="text-sm text-slate-700 font-semibold mb-1">Next class is locked</div>
                  <div className="text-sm text-slate-600">
                    You need at least <strong>{passMark}%</strong> to unlock the next class. You can revisit lessons and
                    try again.
                  </div>
                </div>
              )}

              <Link
                href="/learn/a1"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              >
                Review lessons
              </Link>

              <button
                type="button"
                onClick={onRetake}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              >
                Retake exam
              </button>
            </div>

            {!passed && (
              <div className="mt-4 text-xs text-slate-500">
                Continue to next class is hidden until you pass. Your results stay on this page until you retake.
              </div>
            )}

            <div className="mt-10">
              <h3 className="text-lg font-bold text-slate-900">Answer review</h3>
              <p className="mt-1 text-sm text-slate-600">
                Explanations are shown here (not during the exam) so you can review calmly.
              </p>

              <div className="mt-5 space-y-4">
                {questions.map(q => {
                  const selectedIdx = answerById.get(q.id)
                  const selectedText =
                    selectedIdx === undefined ? 'No answer selected' : q.options[selectedIdx] ?? 'No answer selected'
                  const correctText = q.options[q.correct]
                  const isCorrect = selectedIdx === q.correct

                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="text-sm font-semibold text-slate-700">
                          Question {q.id}
                          <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                            {q.topic}
                          </span>
                        </div>
                        <span
                          className={[
                            'text-xs font-semibold px-2.5 py-1 rounded-full border',
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          ].join(' ')}
                        >
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>

                      <div className="mt-3 font-medium text-slate-900">{q.prompt}</div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div className="text-xs font-semibold text-slate-500">Your answer</div>
                          <div className="mt-1 text-sm font-semibold text-slate-900">{selectedText}</div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div className="text-xs font-semibold text-slate-500">Correct answer</div>
                          <div className="mt-1 text-sm font-semibold text-slate-900">{correctText}</div>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
                        <div className="text-xs font-semibold text-indigo-900">Explanation</div>
                        <div className="mt-1 text-sm text-indigo-900">{q.explanation}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

