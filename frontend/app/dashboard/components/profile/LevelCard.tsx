"use client"

import { motion } from "framer-motion"
import { FaGraduationCap, FaChevronRight } from "react-icons/fa"

interface LevelCardProps {
  currentLevel: string
  currentLesson: string
  nextLesson: string
  lessonsInLevel: number
  completedInLevel: number
  delay?: number
}

export default function LevelCard({
  currentLevel,
  currentLesson,
  nextLesson,
  lessonsInLevel,
  completedInLevel,
  delay = 0,
}: LevelCardProps) {
  const progress = Math.round((completedInLevel / lessonsInLevel) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
          <FaGraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Learning Path</h3>
          <p className="text-xs text-slate-500">You're making steady progress!</p>
        </div>
      </div>

      {/* Current Status */}
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Current Level</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">{currentLevel}</span>
          </div>
          <p className="font-semibold text-slate-800">{currentLesson}</p>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600">Level Progress</span>
            <span className="font-bold text-emerald-600">{progress}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: delay + 0.3 }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {completedInLevel} of {lessonsInLevel} lessons completed
          </p>
        </div>

        {/* Next Up */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div>
            <span className="text-xs text-slate-500">Up Next</span>
            <p className="font-semibold text-sm text-slate-700">{nextLesson}</p>
          </div>
          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <FaChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
