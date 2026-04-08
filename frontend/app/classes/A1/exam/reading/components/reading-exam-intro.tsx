'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function ReadingExamIntro({
  totalQuestions,
  estimatedTime,
  onStart
}: {
  totalQuestions: number
  estimatedTime: string
  onStart: () => void
}) {
  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center">
      <div className="w-full max-w-3xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-7 sm:p-8 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-indigo-50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold">
              A1 Exam
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              A1 Reading Exam
            </h1>
            <p className="mt-2 text-slate-700">
              Test your understanding of the reading and grammar topics covered in A1.
            </p>
            <p className="mt-4 text-sm text-slate-600">
              This reading exam covers key A1 topics such as pronouns, articles, verbs, sentence structure, negation,
              prepositions, adjectives, adverbs, and the passé composé.
            </p>
          </div>

          <div className="p-7 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">Total questions</div>
                <div className="mt-1 text-lg font-bold text-slate-900">{totalQuestions}</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">Estimated time</div>
                <div className="mt-1 text-lg font-bold text-slate-900">{estimatedTime}</div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
              <div className="text-sm font-semibold text-slate-800 mb-2">Before you start</div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
                  <span>You will answer one question at a time.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
                  <span>Your final result will appear at the end.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
                  <span>
                    You need at least <strong>60%</strong> to pass this exam.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Start exam
              </button>
              <Link
                href="/learn/a1"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              >
                Review lessons first
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

