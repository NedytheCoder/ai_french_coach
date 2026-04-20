"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ProgressSummaryCardProps {
  title: string
  description?: string
  progress: number
  total: number
  icon: ReactNode
  color?: "purple" | "blue" | "green" | "orange"
  delay?: number
}

const colorMap = {
  purple: "from-purple-500 to-blue-500",
  blue: "from-blue-500 to-cyan-500",
  green: "from-emerald-500 to-teal-500",
  orange: "from-orange-500 to-amber-500",
}

export default function ProgressSummaryCard({
  title,
  description,
  progress,
  total,
  icon,
  color = "purple",
  delay = 0,
}: ProgressSummaryCardProps) {
  const percentage = Math.round((progress / total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-white shadow-lg`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-slate-800">{title}</h3>
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-semibold text-slate-700">{progress} of {total}</span>
          <span className="font-bold text-purple-600">{percentage}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: delay + 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full`}
          />
        </div>
      </div>
    </motion.div>
  )
}
