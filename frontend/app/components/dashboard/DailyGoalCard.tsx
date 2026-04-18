"use client"

import { motion } from "framer-motion"
import { FaBullseye, FaCheckCircle, FaBookOpen, FaClipboardCheck } from "react-icons/fa"
import { AnimatedProgressBar } from "./AnimatedProgressBar"

interface Goal {
  id: string
  label: string
  target: number
  current: number
  icon: "lessons" | "quizzes" | "practice"
}

interface DailyGoalCardProps {
  goals: Goal[]
  overallProgress: number
  dailyTarget: number
}

const iconMap = {
  lessons: FaBookOpen,
  quizzes: FaClipboardCheck,
  practice: FaBullseye,
}

export function DailyGoalCard({ goals, overallProgress, dailyTarget }: DailyGoalCardProps) {
  const allCompleted = overallProgress >= 100

  return (
    <motion.div
      className={`rounded-3xl p-6 md:p-8 shadow-lg transition-all duration-300 ${
        allCompleted
          ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-emerald-500/25"
          : "bg-white shadow-slate-200/50 border border-slate-100 hover:shadow-xl"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
              allCompleted
                ? "bg-white/20 backdrop-blur-sm"
                : "bg-gradient-to-br from-emerald-400 to-teal-400 shadow-emerald-500/25"
            }`}
            whileHover={{ rotate: 5, scale: 1.05 }}
            animate={allCompleted ? { rotate: [0, -10, 10, 0] } : {}}
            transition={allCompleted ? { duration: 0.5, repeat: 3, delay: 0.5 } : {}}
          >
            {allCompleted ? (
              <FaCheckCircle className="w-6 h-6 text-white" />
            ) : (
              <FaBullseye className="w-6 h-6 text-white" />
            )}
          </motion.div>
          <div>
            <h3 className={`text-lg font-bold ${allCompleted ? "text-white" : "text-slate-800"}`}>
              Daily Goals
            </h3>
            <p className={`text-sm ${allCompleted ? "text-white/80" : "text-slate-500"}`}>
              {allCompleted ? "All goals completed! 🎉" : "Keep pushing forward!"}
            </p>
          </div>
        </div>
        {allCompleted && (
          <motion.div
            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.3 }}
          >
            COMPLETE!
          </motion.div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className={`text-sm font-semibold ${allCompleted ? "text-white" : "text-slate-700"}`}>
            Daily Progress
          </span>
          <span className={`text-sm font-bold ${allCompleted ? "text-white" : "text-emerald-600"}`}>
            {Math.round(overallProgress)}%
          </span>
        </div>
        <div className={`h-3 rounded-full overflow-hidden ${allCompleted ? "bg-white/20" : "bg-slate-100"}`}>
          <motion.div
            className={`h-full rounded-full ${
              allCompleted
                ? "bg-white"
                : "bg-gradient-to-r from-emerald-500 to-teal-400"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {goals.map((goal, index) => {
          const Icon = iconMap[goal.icon]
          const progress = Math.min((goal.current / goal.target) * 100, 100)
          const isComplete = goal.current >= goal.target

          return (
            <motion.div
              key={goal.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                allCompleted
                  ? "bg-white/10"
                  : isComplete
                  ? "bg-emerald-50"
                  : "bg-slate-50"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  allCompleted
                    ? "bg-white/20"
                    : isComplete
                    ? "bg-emerald-400"
                    : "bg-slate-200"
                }`}
                animate={isComplete ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon
                  className={`w-5 h-5 ${
                    allCompleted || isComplete ? "text-white" : "text-slate-500"
                  }`}
                />
              </motion.div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${allCompleted ? "text-white" : "text-slate-700"}`}>
                  {goal.label}
                </p>
                <p className={`text-xs ${allCompleted ? "text-white/70" : "text-slate-500"}`}>
                  {goal.current}/{goal.target} completed
                </p>
              </div>
              {isComplete && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <FaCheckCircle className={`w-5 h-5 ${allCompleted ? "text-white" : "text-emerald-500"}`} />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      <motion.div
        className={`mt-6 p-4 rounded-2xl ${
          allCompleted
            ? "bg-white/10"
            : "bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p
          className={`text-sm text-center font-medium ${
            allCompleted ? "text-white" : "text-amber-800"
          }`}
        >
          {allCompleted
            ? "🌟 Amazing work! You crushed your goals today!"
            : `💪 ${dailyTarget - Math.round((overallProgress / 100) * dailyTarget)} more XP to reach your daily target!`}
        </p>
      </motion.div>
    </motion.div>
  )
}
