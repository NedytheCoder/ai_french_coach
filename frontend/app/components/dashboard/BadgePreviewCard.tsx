"use client"

import { motion } from "framer-motion"
import { FaMedal, FaLock, FaStar } from "react-icons/fa"

interface Badge {
  id: string
  name: string
  icon: "medal" | "star" | "fire"
  color: "gold" | "silver" | "bronze" | "purple" | "blue"
  unlocked: boolean
  description: string
}

interface BadgePreviewCardProps {
  badges: Badge[]
  totalBadges: number
  unlockedCount: number
}

const badgeColors = {
  gold: "from-amber-400 to-yellow-500",
  silver: "from-slate-300 to-slate-400",
  bronze: "from-orange-400 to-amber-600",
  purple: "from-purple-400 to-purple-600",
  blue: "from-blue-400 to-cyan-500",
}

const badgeBgColors = {
  gold: "bg-amber-100",
  silver: "bg-slate-100",
  bronze: "bg-orange-100",
  purple: "bg-purple-100",
  blue: "bg-blue-100",
}

export function BadgePreviewCard({ badges, totalBadges, unlockedCount }: BadgePreviewCardProps) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25"
            whileHover={{ rotate: 5, scale: 1.05 }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaMedal className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Badges</h3>
            <p className="text-sm text-slate-500">
              {unlockedCount}/{totalBadges} unlocked
            </p>
          </div>
        </div>
        <motion.button
          className="text-sm font-semibold text-purple-600 hover:text-purple-700"
          whileHover={{ scale: 1.05 }}
        >
          View All
        </motion.button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {badges.slice(0, 6).map((badge, index) => (
          <motion.div
            key={badge.id}
            className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
              badge.unlocked
                ? `${badgeBgColors[badge.color]} cursor-pointer`
                : "bg-slate-50 opacity-60"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: badge.unlocked ? 1 : 0.6, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={badge.unlocked ? { scale: 1.05, y: -2 } : {}}
          >
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badgeColors[badge.color]} flex items-center justify-center shadow-md mb-2 ${
                !badge.unlocked && "grayscale"
              }`}
              animate={
                badge.unlocked
                  ? {
                      boxShadow: [
                        "0 4px 6px -1px rgba(0,0,0,0.1)",
                        "0 0 20px rgba(251,191,36,0.4)",
                        "0 4px 6px -1px rgba(0,0,0,0.1)",
                      ],
                    }
                  : {}
              }
              transition={badge.unlocked ? { duration: 2, repeat: Infinity } : {}}
            >
              {badge.icon === "medal" && <FaMedal className="w-6 h-6 text-white" />}
              {badge.icon === "star" && <FaStar className="w-6 h-6 text-white" />}
              {badge.icon === "fire" && (
                <span className="text-xl">🔥</span>
              )}
            </motion.div>
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight">
              {badge.name}
            </span>
            {!badge.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 rounded-2xl">
                <FaLock className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {unlockedCount > 0 && (
        <motion.div
          className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-amber-800 text-center font-medium">
            🎉 You&apos;re close to unlocking &quot;Polyglot Pro&quot;!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
