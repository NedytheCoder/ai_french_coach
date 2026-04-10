'use client'

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface LevelHeaderProps {
  badge: string
  title: string
  subtitle: string
  icon?: IconType
  gradientFrom?: string
  gradientTo?: string
}

export function LevelHeader({
  badge,
  title,
  subtitle,
  icon: Icon,
  gradientFrom = 'from-indigo-500',
  gradientTo = 'to-purple-600'
}: LevelHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
    >
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} p-8 text-white`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          {Icon && <Icon size={14} />}
          <span>{badge}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-lg text-white/90">{subtitle}</p>
      </div>
    </motion.div>
  )
}
