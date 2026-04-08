'use client'

import { motion } from 'framer-motion'
import type { ReadingExamQuestion } from '../data'
import { ReadingExamProgressBar } from '@/app/shared/progress-bar'

export function ReadingQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onSubmit,
  onNext,
  isSubmitted,
  isLast
}: {
  question: ReadingExamQuestion
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  onSelectOption: (idx: number) => void
  onSubmit: () => void
  onNext: () => void
  isSubmitted: boolean
  isLast: boolean
}) {
  const progress = Math.round(((questionNumber - 1) / totalQuestions) * 100)

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm font-medium text-slate-700">
              Question <span className="font-bold text-slate-900">{questionNumber}</span> of{' '}
              <span className="font-bold text-slate-900">{totalQuestions}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                {question.topic}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-semibold border border-indigo-200">
                {question.difficulty}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <ReadingExamProgressBar value={progress} label="Exam progress" />
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">{question.prompt}</h2>

          <fieldset className="mt-6" aria-label="Answer choices">
            <legend className="sr-only">Choose one answer</legend>
            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx
                return (
                  <label
                    key={idx}
                    className={[
                      'group flex items-start gap-3 rounded-xl border p-4 transition-colors cursor-pointer',
                      'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2',
                      isSelected ? 'border-indigo-300 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50',
                      isSubmitted ? 'cursor-default opacity-90' : ''
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name={`q-${question.id}`}
                      className="mt-1 h-4 w-4 accent-indigo-600"
                      checked={isSelected}
                      onChange={() => onSelectOption(idx)}
                      disabled={isSubmitted}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{opt}</div>
                    </div>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            {!isSubmitted ? (
              <button
                type="button"
                onClick={onSubmit}
                disabled={selectedOption === null}
                className={[
                  'inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold transition-all',
                  selectedOption === null
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
                ].join(' ')}
              >
                Submit answer
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {isLast ? 'Finish exam' : 'Next'}
              </button>
            )}
          </div>

          <div className="mt-4 text-xs text-slate-500">
            Your answer is saved when you submit. You’ll see corrections and explanations at the end.
          </div>
        </div>
      </motion.div>
    </div>
  )
}

