'use client'

import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

interface LearningPointsListProps {
  title: string
  points: string[]
  iconColor?: string
}

export function LearningPointsList({
  title,
  points,
  iconColor = 'text-green-600'
}: LearningPointsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6"
    >
      <h2 className="text-xl font-bold text-slate-800 mb-4">{title}</h2>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>
              <FaCheck size={16} />
            </div>
            <span className="text-slate-700">{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
