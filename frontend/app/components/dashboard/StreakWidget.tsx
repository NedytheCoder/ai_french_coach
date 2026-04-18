"use client"

import { motion } from "framer-motion"
import { FaFire, FaCalendarCheck } from "react-icons/fa"

interface StreakWidgetProps {
  currentStreak: number
  longestStreak: number
  streakActive: boolean
  weekProgress: boolean[]
}

export function StreakWidget({
  currentStreak,
  longestStreak,
  streakActive,
  weekProgress,
}: StreakWidgetProps) {
  const days = ["M", "T", "W", "T", "F", "S", "S"]

  return (
    <motion.div
      className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-orange-500/25 overflow-hidden relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated fire background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
              animate={streakActive ? {
                scale: [1, 1.1, 1],
                rotate: [0, -3, 3, 0],
              } : {}}
              transition={{ duration: 0.5, repeat: streakActive ? Infinity : 0, repeatDelay: 2 }}
            >
              <FaFire className={`w-6 h-6 ${streakActive ? "text-yellow-200" : "text-white/60"}`} />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold">Daily Streak</h3>
              <p className="text-white/80 text-sm">
                {streakActive ? "Streak active!" : "Start learning today!"}
              </p>
            </div>
          </div>
          {streakActive && (
            <motion.div
              className="px-3 py-1 bg-yellow-400/30 backdrop-blur-sm rounded-full text-sm font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🔥 ON FIRE
            </motion.div>
          )}
        </div>

        <div className="flex items-baseline gap-2 mb-6">
          <motion.span
            className="text-6xl font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
          >
            {currentStreak}
          </motion.span>
          <span className="text-xl text-white/80">days</span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <FaCalendarCheck className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/80">
            Longest: <span className="font-semibold">{longestStreak} days</span>
          </span>
        </div>

        {/* Week progress indicators */}
        <div className="flex justify-between items-center">
          {days.map((day, index) => (
            <motion.div
              key={day + index}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
                  weekProgress[index]
                    ? "bg-white text-orange-500 shadow-lg"
                    : "bg-white/20 text-white/60"
                }`}
                whileHover={weekProgress[index] ? { scale: 1.1, rotate: 5 } : {}}
                animate={weekProgress[index] ? {
                  boxShadow: [
                    "0 0 0 0 rgba(255,255,255,0.4)",
                    "0 0 0 8px rgba(255,255,255,0)",
                  ],
                } : {}}
                transition={weekProgress[index] ? {
                  boxShadow: { duration: 1.5, repeat: Infinity },
                } : {}}
              >
                {weekProgress[index] && <FaFire className="w-4 h-4" />}
              </motion.div>
              <span className="text-xs text-white/70">{day}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
