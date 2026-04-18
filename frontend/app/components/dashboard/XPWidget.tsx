"use client"

import { motion } from "framer-motion"
import { FaStar, FaBolt } from "react-icons/fa"

interface XPWidgetProps {
  totalXP: number
  xpToday: number
  xpToNextLevel: number
  rankTitle: string
}

export function XPWidget({ totalXP, xpToday, xpToNextLevel, rankTitle }: XPWidgetProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-orange-500/25 overflow-hidden relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
              whileHover={{ rotate: 10, scale: 1.1 }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaStar className="w-6 h-6 text-yellow-100" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold">XP Points</h3>
              <p className="text-white/80 text-sm">Keep earning!</p>
            </div>
          </div>
          <motion.div
            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.5 }}
          >
            {rankTitle}
          </motion.div>
        </div>

        <div className="mb-6">
          <motion.p
            className="text-5xl font-bold mb-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
          >
            {totalXP.toLocaleString()}
          </motion.p>
          <p className="text-white/80 text-sm">Total XP earned</p>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-xl"
            whileHover={{ scale: 1.05 }}
          >
            <FaBolt className="w-4 h-4 text-yellow-200" />
            <span className="font-semibold text-sm">+{xpToday} today</span>
          </motion.div>
          <p className="text-white/70 text-sm">{xpToNextLevel} XP to next rank</p>
        </div>

        {/* XP progress to next rank */}
        <div className="mt-4">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((totalXP % 1000) / 1000) * 100}%` }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
