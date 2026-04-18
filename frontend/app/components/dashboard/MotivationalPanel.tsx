"use client"

import { motion } from "framer-motion"
import { FaLightbulb, FaQuoteLeft, FaArrowUp } from "react-icons/fa"

interface MotivationalPanelProps {
  tip: string
  quote: {
    text: string
    author: string
  }
  recommendedTask: {
    title: string
    description: string
    xpReward: number
  }
}

export function MotivationalPanel({ tip, quote, recommendedTask }: MotivationalPanelProps) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
    >
      {/* Tip Card */}
      <motion.div
        className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-100"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="flex items-start gap-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-xl flex items-center justify-center shrink-0"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaLightbulb className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <p className="text-sm font-bold text-amber-800 mb-1">Daily Tip</p>
            <p className="text-sm text-amber-700 leading-relaxed">{tip}</p>
          </div>
        </div>
      </motion.div>

      {/* Quote Card */}
      <motion.div
        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <FaQuoteLeft className="w-6 h-6 text-purple-300 mb-3" />
        <p className="text-sm text-purple-800 italic leading-relaxed mb-3">&quot;{quote.text}&quot;</p>
        <p className="text-xs text-purple-600 font-medium">— {quote.author}</p>
      </motion.div>

      {/* Recommended Task */}
      <motion.div
        className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="flex items-start gap-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center shrink-0"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaArrowUp className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex-1">
            <p className="text-sm font-bold text-emerald-800 mb-1">Recommended Next</p>
            <p className="text-sm text-emerald-700 font-medium mb-1">{recommendedTask.title}</p>
            <p className="text-xs text-emerald-600 mb-3">{recommendedTask.description}</p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-emerald-200 text-emerald-800 rounded-lg text-xs font-bold">
                +{recommendedTask.xpReward} XP
              </span>
              <span className="text-xs text-emerald-600">5 min</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
