"use client"

import { motion } from "framer-motion"
import { FaFire, FaStar, FaTrophy } from "react-icons/fa"

interface ProfileHeaderProps {
  name: string
  email: string
  level: string
  xp: number
  streak: number
  rank: string
  avatar?: string
}

export default function ProfileHeader({
  name,
  email,
  level,
  xp,
  streak,
  rank,
  avatar,
}: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 shadow-2xl shadow-purple-500/30"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative px-8 py-10 sm:px-12 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border-4 border-white/30">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {name.charAt(0)}
                </span>
              )}
            </div>
            {/* Level Badge */}
            <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">{level}</span>
            </div>
          </motion.div>

          {/* Info */}
          <div className="text-center sm:text-left flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-1"
            >
              {name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-purple-200 text-sm mb-3"
            >
              {email}
            </motion.p>

            {/* Rank Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full"
            >
              <FaTrophy className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{rank}</span>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 sm:gap-6"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-300 mb-1">
                <FaFire className="w-5 h-5" />
                <span className="text-xl font-bold text-white">{streak}</span>
              </div>
              <span className="text-xs text-purple-200">Day Streak</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-300 mb-1">
                <FaStar className="w-5 h-5" />
                <span className="text-xl font-bold text-white">{xp.toLocaleString()}</span>
              </div>
              <span className="text-xs text-purple-200">Total XP</span>
            </div>
          </motion.div>
        </div>

        {/* Motivational Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center sm:text-left text-purple-100 text-sm italic"
        >
          "Keep going — you're making great progress on your French journey! 🇫🇷"
        </motion.p>
      </div>
    </motion.div>
  )
}
