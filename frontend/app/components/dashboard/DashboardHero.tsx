"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaPlay, FaStar } from "react-icons/fa"

interface DashboardHeroProps {
  userName: string
  currentLevel: string
  lessonTitle: string
  dailyGoalProgress: number
}

export function DashboardHero({
  userName,
  currentLevel,
  lessonTitle,
  dailyGoalProgress,
}: DashboardHeroProps) {
  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <motion.section
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 p-8 md:p-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-10 right-1/3"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaStar className="w-5 h-5 text-yellow-200/80" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20"
          animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <FaStar className="w-5 h-5 text-amber-300/50" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
            Level {currentLevel}
          </span>
          {dailyGoalProgress >= 100 && (
            <motion.span
              className="px-3 py-1 bg-amber-400/30 backdrop-blur-sm rounded-full text-amber-100 text-sm font-medium flex items-center gap-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.5 }}
            >
              <FaStar className="w-3 h-3" />
              Daily Goal Complete!
            </motion.span>
          )}
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {greeting()}, {userName}! 👋
        </motion.h1>

        <motion.p
          className="text-lg text-white/80 mb-8 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          You&apos;re making great progress! Continue with{" "}
          <span className="font-semibold text-white">{lessonTitle}</span> to keep
          your streak alive.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/classes/A0/lesson3"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/30 hover:scale-105 transition-all duration-300"
          >
            <motion.div
              className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaPlay className="w-4 h-4 text-purple-600 ml-0.5" />
            </motion.div>
            <span>Continue Learning</span>
          </Link>

          <motion.button
            className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Progress
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
