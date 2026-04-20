"use client"

import { motion } from "framer-motion"
import { FaCheckCircle, FaTrophy, FaFire, FaBook, FaQuestionCircle } from "react-icons/fa"

type ActivityType = "lesson" | "quiz" | "streak" | "badge" | "achievement"

interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  time: string
}

interface RecentActivityCardProps {
  activities: Activity[]
  delay?: number
}

const iconMap = {
  lesson: FaBook,
  quiz: FaQuestionCircle,
  streak: FaFire,
  badge: FaTrophy,
  achievement: FaCheckCircle,
}

const colorMap = {
  lesson: "bg-blue-100 text-blue-600",
  quiz: "bg-purple-100 text-purple-600",
  streak: "bg-orange-100 text-orange-600",
  badge: "bg-yellow-100 text-yellow-600",
  achievement: "bg-green-100 text-green-600",
}

export default function RecentActivityCard({ activities, delay = 0 }: RecentActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <FaCheckCircle className="w-4 h-4 text-white" />
        </span>
        Recent Activity
      </h3>

      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type]
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${colorMap[activity.type]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-800">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.description}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{activity.time}</span>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500">
          <p className="text-sm">No recent activity yet</p>
          <p className="text-xs mt-1">Complete a lesson to get started!</p>
        </div>
      )}
    </motion.div>
  )
}
