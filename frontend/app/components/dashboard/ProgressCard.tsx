"use client"

import { motion } from "framer-motion"
import { FaGraduationCap, FaChevronRight, FaTrophy } from "react-icons/fa"
import { AnimatedProgressBar } from "./AnimatedProgressBar"

interface ProgressCardProps {
  currentLevel: string
  currentLesson: string
  overallProgress: number
  lessonsCompleted: number
  totalLessons: number
  nextMilestone: string
}

export function ProgressCard({
  currentLevel,
  currentLesson,
  overallProgress,
  lessonsCompleted,
  totalLessons,
  nextMilestone,
}: ProgressCardProps) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <FaGraduationCap className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Current Progress</h3>
            <p className="text-sm text-slate-500">Keep up the great work!</p>
          </div>
        </div>
        <motion.div
          className="flex items-center gap-1 text-purple-600 text-sm font-semibold cursor-pointer group-hover:text-purple-700"
          whileHover={{ x: 3 }}
        >
          Details <FaChevronRight className="w-4 h-4" />
        </motion.div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <p className="text-sm text-slate-600 mb-1">Current Level</p>
            <p className="text-2xl font-bold text-purple-700">{currentLevel}</p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <p className="text-sm text-slate-600 mb-1">Lessons Done</p>
            <p className="text-2xl font-bold text-blue-700">
              {lessonsCompleted}/{totalLessons}
            </p>
          </motion.div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-slate-700">Overall Progress</span>
            <span className="text-sm font-bold text-purple-600">{overallProgress}%</span>
          </div>
          <AnimatedProgressBar
            progress={overallProgress}
            color="purple"
            size="lg"
            animated={true}
          />
        </div>

        <motion.div
          className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center shadow-md">
            <FaTrophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Next Milestone</p>
            <p className="font-semibold text-slate-800">{nextMilestone}</p>
          </div>
        </motion.div>

        <div className="pt-2">
          <p className="text-sm text-slate-600 mb-2">Current Lesson</p>
          <p className="font-semibold text-slate-800">{currentLesson}</p>
        </div>
      </div>
    </motion.div>
  )
}
