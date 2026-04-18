"use client"

import { motion } from "framer-motion"
import { FaTrophy, FaLock, FaMedal, FaStar, FaFire, FaCrown, FaGem } from "react-icons/fa"

interface Achievement {
  id: string
  title: string
  description: string
  icon: "trophy" | "medal" | "star" | "fire" | "crown" | "gem"
  unlocked: boolean
  unlockedAt?: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface AchievementCardProps {
  achievements: Achievement[]
  unlockedCount: number
  totalCount: number
}

const iconMap = {
  trophy: FaTrophy,
  medal: FaMedal,
  star: FaStar,
  fire: FaFire,
  crown: FaCrown,
  gem: FaGem,
}

const rarityColors = {
  common: {
    bg: "from-slate-400 to-slate-500",
    border: "border-slate-200",
    bgLight: "bg-slate-50",
  },
  rare: {
    bg: "from-blue-400 to-cyan-500",
    border: "border-blue-200",
    bgLight: "bg-blue-50",
  },
  epic: {
    bg: "from-purple-400 to-pink-500",
    border: "border-purple-200",
    bgLight: "bg-purple-50",
  },
  legendary: {
    bg: "from-amber-400 via-orange-400 to-pink-500",
    border: "border-amber-200",
    bgLight: "bg-amber-50",
  },
}

export function AchievementCard({ achievements, unlockedCount, totalCount }: AchievementCardProps) {
  const recentAchievements = achievements.filter(a => a.unlocked).slice(0, 3)

  return (
    <motion.div
      className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25"
            whileHover={{ rotate: 5, scale: 1.05 }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaTrophy className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Achievements</h3>
            <p className="text-sm text-slate-500">
              {unlockedCount}/{totalCount} unlocked
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

      {/* Achievement Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Common", count: achievements.filter(a => a.rarity === "common" && a.unlocked).length, total: achievements.filter(a => a.rarity === "common").length, color: "bg-slate-400" },
          { label: "Rare", count: achievements.filter(a => a.rarity === "rare" && a.unlocked).length, total: achievements.filter(a => a.rarity === "rare").length, color: "bg-blue-400" },
          { label: "Epic+", count: achievements.filter(a => (a.rarity === "epic" || a.rarity === "legendary") && a.unlocked).length, total: achievements.filter(a => a.rarity === "epic" || a.rarity === "legendary").length, color: "bg-purple-400" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center p-3 bg-slate-50 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <p className="text-lg font-bold text-slate-800">
              {stat.count}/{stat.total}
            </p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Unlocked */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-600 mb-3">Recently Unlocked</p>
        {recentAchievements.length > 0 ? (
          recentAchievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon]
            const colors = rarityColors[achievement.rarity]

            return (
              <motion.div
                key={achievement.id}
                className={`flex items-center gap-4 p-4 ${colors.bgLight} rounded-2xl border ${colors.border}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-md`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      "0 4px 6px -1px rgba(0,0,0,0.1)",
                      "0 0 20px rgba(251,191,36,0.3)",
                      "0 4px 6px -1px rgba(0,0,0,0.1)",
                    ],
                  }}
                  transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{achievement.title}</p>
                  <p className="text-xs text-slate-500">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-white rounded-lg text-xs font-semibold capitalize text-slate-600">
                    {achievement.rarity}
                  </span>
                </div>
              </motion.div>
            )
          })
        ) : (
          <motion.div
            className="p-6 bg-slate-50 rounded-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-slate-500 text-sm">Complete lessons and quizzes to unlock achievements!</p>
          </motion.div>
        )}
      </div>

      {/* Next Achievement Hint */}
      {unlockedCount < totalCount && (
        <motion.div
          className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center">
              <FaLock className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">Next Unlock</p>
              <p className="text-xs text-slate-500">
                Complete 5 more lessons to earn &quot;Lesson Master&quot;
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
