"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ProfileStatsCardProps {
  label: string
  value: string | number
  icon: ReactNode
  color?: "purple" | "blue" | "green" | "orange" | "pink"
  delay?: number
  trend?: string
}

const colorVariants = {
  purple: "from-purple-500 to-purple-600 shadow-purple-500/25",
  blue: "from-blue-500 to-blue-600 shadow-blue-500/25",
  green: "from-emerald-500 to-emerald-600 shadow-emerald-500/25",
  orange: "from-orange-500 to-orange-600 shadow-orange-500/25",
  pink: "from-pink-500 to-pink-600 shadow-pink-500/25",
}

export default function ProfileStatsCard({
  label,
  value,
  icon,
  color = "purple",
  delay = 0,
  trend,
}: ProfileStatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {trend && (
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <span>↑</span>
              {trend}
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorVariants[color]} flex items-center justify-center text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  )
}
