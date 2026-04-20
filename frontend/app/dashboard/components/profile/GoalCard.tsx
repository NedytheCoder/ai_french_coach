"use client"

import { motion } from "framer-motion"
import { FaBullseye, FaCheck, FaFire } from "react-icons/fa"

interface GoalCardProps {
  dailyGoal: number
  weeklyProgress: number
  weeklyTarget: number
  currentStreak: number
  encouragement: string
  delay?: number
}

export default function GoalCard({
  dailyGoal,
  weeklyProgress,
  weeklyTarget,
  currentStreak,
  encouragement,
  delay = 0,
}: GoalCardProps) {
  const weeklyPercentage = Math.round((weeklyProgress / weeklyTarget) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-6 border border-orange-100 shadow-lg shadow-orange-100/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg">
          <FaBullseye className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Your Goals</h3>
          <p className="text-xs text-slate-500">Keep up the momentum!</p>
        </div>
      </div>

      {/* Daily Goal */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-white/70 rounded-xl">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
          <FaCheck className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">Daily Goal</p>
          <p className="text-xs text-slate-500">{dailyGoal} minutes of practice</p>
        </div>
        <span className="text-sm font-bold text-orange-600">{currentStreak}🔥</span>
      </div>

      {/* Weekly Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600">Weekly Target</span>
          <span className="font-bold text-slate-800">{weeklyProgress}/{weeklyTarget} lessons</span>
        </div>
        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${weeklyPercentage}%` }}
            transition={{ duration: 1, delay: delay + 0.3 }}
            className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
          />
        </div>
      </div>

      {/* Encouragement */}
      <div className="p-3 bg-white/50 rounded-xl">
        <p className="text-sm text-slate-700 italic">"{encouragement}"</p>
      </div>
    </motion.div>
  )
}
