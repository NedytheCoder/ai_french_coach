"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaClock, FaCheckCircle, FaArrowRight, FaBookOpen, FaClipboardCheck } from "react-icons/fa"

interface Activity {
  id: string
  type: "lesson" | "quiz" | "completed"
  title: string
  subtitle: string
  timestamp: string
  score?: number
}

interface ActivityCardProps {
  recentActivity: Activity
  lastLesson: {
    title: string
    progress: number
    level: string
  }
}

export function ActivityCard({ recentActivity, lastLesson }: ActivityCardProps) {
  const ActivityIcon = recentActivity.type === "quiz"
    ? FaClipboardCheck
    : recentActivity.type === "completed"
    ? FaCheckCircle
    : FaBookOpen

  return (
    <motion.div
      className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <h3 className="text-xl font-bold text-slate-800 mb-6">Continue Where You Left Off</h3>

      {/* Continue Lesson Card */}
      <motion.div
        className="mb-6 p-5 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md"
              whileHover={{ rotate: 5 }}
            >
              <FaBookOpen className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <p className="text-sm text-slate-500">Last Lesson</p>
              <p className="font-bold text-slate-800">{lastLesson.title}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
            {lastLesson.level}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">Progress</span>
            <span className="text-sm font-bold text-purple-600">{lastLesson.progress}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${lastLesson.progress}%` }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
            />
          </div>
        </div>

        <Link
          href="/classes/A0/lesson3"
          className="group flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
        >
          Resume Lesson
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </motion.div>

      {/* Recent Activity */}
      <div>
        <p className="text-sm font-semibold text-slate-600 mb-3">Recent Activity</p>
        <motion.div
          className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.01, backgroundColor: "rgba(139, 92, 246, 0.05)" }}
        >
          <motion.div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              recentActivity.type === "completed"
                ? "bg-emerald-100"
                : recentActivity.type === "quiz"
                ? "bg-amber-100"
                : "bg-purple-100"
            }`}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <ActivityIcon
              className={`w-5 h-5 ${
                recentActivity.type === "completed"
                  ? "text-emerald-600"
                  : recentActivity.type === "quiz"
                  ? "text-amber-600"
                  : "text-purple-600"
              }`}
            />
          </motion.div>
          <div className="flex-1">
            <p className="font-semibold text-slate-800 text-sm">{recentActivity.title}</p>
            <p className="text-xs text-slate-500">{recentActivity.subtitle}</p>
          </div>
          <div className="text-right">
            {recentActivity.score !== undefined && (
              <p className="font-bold text-emerald-600">{recentActivity.score}%</p>
            )}
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <FaClock className="w-3 h-3" />
              {recentActivity.timestamp}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
