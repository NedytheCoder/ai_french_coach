"use client"

import { motion } from "framer-motion"

interface AnimatedProgressBarProps {
  progress: number
  color?: "purple" | "blue" | "green" | "orange" | "pink"
  size?: "sm" | "md" | "lg"
  animated?: boolean
  showPercentage?: boolean
  label?: string
}

const colorVariants = {
  purple: "from-purple-500 to-purple-400",
  blue: "from-blue-500 to-cyan-400",
  green: "from-emerald-500 to-teal-400",
  orange: "from-orange-500 to-amber-400",
  pink: "from-pink-500 to-rose-400",
}

const sizeVariants = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
}

export function AnimatedProgressBar({
  progress,
  color = "purple",
  size = "md",
  animated = true,
  showPercentage = false,
  label,
}: AnimatedProgressBarProps) {
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-slate-600 font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-slate-700">{progress}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizeVariants[size]}`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${colorVariants[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: animated ? 1.2 : 0,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2,
          }}
        />
      </div>
    </div>
  )
}
