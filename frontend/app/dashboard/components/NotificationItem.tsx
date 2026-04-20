"use client"

import { motion } from "framer-motion"
import { FaCheckCircle, FaFire, FaTrophy, FaStar, FaGem } from "react-icons/fa"

export interface Notification {
  id: number
  title: string
  description: string
  time: string
  type: "lesson" | "streak" | "achievement" | "xp" | "system"
  read?: boolean
}

interface NotificationItemProps {
  notification: Notification
  onClick?: () => void
}

const iconMap = {
  lesson: FaCheckCircle,
  streak: FaFire,
  achievement: FaTrophy,
  xp: FaStar,
  system: FaGem,
}

const colorMap = {
  lesson: "text-green-500 bg-green-100",
  streak: "text-orange-500 bg-orange-100",
  achievement: "text-yellow-500 bg-yellow-100",
  xp: "text-purple-500 bg-purple-100",
  system: "text-blue-500 bg-blue-100",
}

export default function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const Icon = iconMap[notification.type]
  const colorClass = colorMap[notification.type]

  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all duration-200 text-left group ${
        notification.read
          ? "bg-white/50 hover:bg-white/80"
          : "bg-white hover:bg-purple-50/50 border-l-2 border-purple-500"
      }`}
      whileHover={{ x: 2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center transition-transform group-hover:scale-110`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`text-sm font-semibold truncate ${notification.read ? "text-slate-600" : "text-slate-800"}`}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full" />
          )}
        </div>
        <p className="text-xs text-slate-500 truncate mt-0.5">{notification.description}</p>
        <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
      </div>
    </motion.button>
  )
}
