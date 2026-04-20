"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SettingsCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function SettingsCard({ children, className = "", delay = 0 }: SettingsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/60 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}
