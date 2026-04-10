'use client'

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface EncouragementCardProps {
  title?: string
  messages: string[]
  icon?: IconType
  bgColor?: string
  borderColor?: string
  textColor?: string
}

export function EncouragementCard({
  title,
  messages,
  icon: Icon,
  bgColor = 'bg-amber-50',
  borderColor = 'border-amber-200',
  textColor = 'text-amber-800'
}: EncouragementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`${bgColor} rounded-2xl border ${borderColor} p-6 mb-6`}
    >
      {title && (
        <div className="flex items-center gap-2 mb-3">
          {Icon && <Icon size={20} className={textColor} />}
          <h3 className={`font-bold text-lg ${textColor}`}>{title}</h3>
        </div>
      )}
      <div className={`${textColor} space-y-2`}>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </motion.div>
  )
}
