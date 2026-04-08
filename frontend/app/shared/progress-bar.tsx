'use client'

import { motion } from 'framer-motion'

export function ReadingExamProgressBar({
  value,
  label
}: {
  value: number
  label?: string
}) {
  const clamped = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0

  return (
    <div aria-label={label ?? 'Progress'} className="w-full">
      <div className="flex items-center justify-between gap-3 text-xs text-slate-600">
        <span className="font-medium">{label ?? 'Progress'}</span>
        <span className="font-semibold text-slate-800">{Math.round(clamped)}%</span>
      </div>
      <div className="mt-2 h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-600 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

