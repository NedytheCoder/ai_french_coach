"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  FaPlay,
  FaRedo,
  FaClipboardList,
  FaGraduationCap,
  FaTrophy,
  FaBook,
} from "react-icons/fa"

interface QuickAction {
  id: string
  label: string
  icon: "continue" | "review" | "quiz" | "levels" | "achievements" | "practice"
  href: string
  color: "purple" | "blue" | "green" | "orange" | "pink" | "amber"
  primary?: boolean
}

interface QuickActionsGridProps {
  actions: QuickAction[]
}

const iconMap = {
  continue: FaPlay,
  review: FaRedo,
  quiz: FaClipboardList,
  levels: FaGraduationCap,
  achievements: FaTrophy,
  practice: FaBook,
}

const colorVariants = {
  purple: {
    bg: "from-purple-500 to-purple-600",
    light: "bg-purple-50",
    text: "text-purple-600",
    shadow: "shadow-purple-500/25",
  },
  blue: {
    bg: "from-blue-500 to-cyan-500",
    light: "bg-blue-50",
    text: "text-blue-600",
    shadow: "shadow-blue-500/25",
  },
  green: {
    bg: "from-emerald-500 to-teal-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    shadow: "shadow-emerald-500/25",
  },
  orange: {
    bg: "from-orange-500 to-amber-500",
    light: "bg-orange-50",
    text: "text-orange-600",
    shadow: "shadow-orange-500/25",
  },
  pink: {
    bg: "from-pink-500 to-rose-500",
    light: "bg-pink-50",
    text: "text-pink-600",
    shadow: "shadow-pink-500/25",
  },
  amber: {
    bg: "from-amber-500 to-yellow-500",
    light: "bg-amber-50",
    text: "text-amber-600",
    shadow: "shadow-amber-500/25",
  },
}

export function QuickActionsGrid({ actions }: QuickActionsGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = iconMap[action.icon]
          const colors = colorVariants[action.color]

          if (action.primary) {
            return (
              <motion.div
                key={action.id}
                className="col-span-2 md:col-span-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link
                  href={action.href}
                  className={`group flex flex-col items-center justify-center p-6 bg-gradient-to-br ${colors.bg} rounded-2xl text-white shadow-lg ${colors.shadow} hover:shadow-xl transition-all duration-300 h-full min-h-[140px]`}
                >
                  <motion.div
                    className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <span className="font-bold text-lg">{action.label}</span>
                </Link>
              </motion.div>
            )
          }

          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Link
                href={action.href}
                className={`group flex flex-col items-center justify-center p-5 ${colors.light} rounded-2xl border border-slate-100 hover:border-transparent hover:bg-gradient-to-br ${colors.bg} hover:text-white transition-all duration-300 h-full min-h-[120px]`}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${colors.light} group-hover:bg-white/20`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className={`w-6 h-6 ${colors.text} group-hover:text-white transition-colors`} />
                </motion.div>
                <span className={`font-semibold ${colors.text} group-hover:text-white transition-colors text-center`}>
                  {action.label}
                </span>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
