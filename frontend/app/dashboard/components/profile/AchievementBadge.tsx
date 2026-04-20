"use client"

import { motion } from "framer-motion"
import { FaStar, FaFire, FaTrophy, FaMedal, FaGem, FaCrown } from "react-icons/fa"

type BadgeType = "star" | "fire" | "trophy" | "medal" | "gem" | "crown"
type BadgeColor = "bronze" | "silver" | "gold" | "purple" | "blue" | "green"

interface AchievementBadgeProps {
  name: string
  description: string
  type: BadgeType
  color: BadgeColor
  unlocked: boolean
  unlockedAt?: string
  delay?: number
}

const iconMap = {
  star: FaStar,
  fire: FaFire,
  trophy: FaTrophy,
  medal: FaMedal,
  gem: FaGem,
  crown: FaCrown,
}

const colorMap = {
  bronze: "from-amber-700 to-amber-600",
  silver: "from-slate-400 to-slate-300",
  gold: "from-yellow-500 to-amber-400",
  purple: "from-purple-500 to-purple-400",
  blue: "from-blue-500 to-blue-400",
  green: "from-emerald-500 to-emerald-400",
}

const bgMap = {
  bronze: "bg-amber-100",
  silver: "bg-slate-100",
  gold: "bg-yellow-100",
  purple: "bg-purple-100",
  blue: "bg-blue-100",
  green: "bg-emerald-100",
}

export default function AchievementBadge({
  name,
  description,
  type,
  color,
  unlocked,
  unlockedAt,
  delay = 0,
}: AchievementBadgeProps) {
  const Icon = iconMap[type]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={unlocked ? { y: -4, scale: 1.02 } : {}}
      className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
        unlocked
          ? `bg-white border-transparent shadow-lg shadow-slate-200/50 cursor-pointer hover:shadow-xl`
          : `bg-slate-50 border-slate-200 opacity-60 grayscale`
      }`}
    >
      {/* Badge Icon */}
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-lg mb-3`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        <h3 className={`font-bold text-sm mb-1 ${unlocked ? "text-slate-800" : "text-slate-500"}`}>
          {name}
        </h3>
        <p className="text-xs text-slate-500 leading-tight">{description}</p>

        {unlocked && unlockedAt && (
          <span className="mt-2 text-xs text-slate-400">Unlocked {unlockedAt}</span>
        )}

        {!unlocked && (
          <div className="mt-2 px-2 py-1 bg-slate-200 rounded-full">
            <span className="text-xs font-medium text-slate-500">Locked</span>
          </div>
        )}
      </div>

      {/* Shine Effect for Unlocked */}
      {unlocked && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/20 to-transparent rotate-12" />
        </div>
      )}
    </motion.div>
  )
}
