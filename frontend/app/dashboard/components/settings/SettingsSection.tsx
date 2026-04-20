"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { IconType } from "react-icons"

interface SettingsSectionProps {
  title: string
  description?: string
  icon?: IconType
  children: ReactNode
  delay?: number
  danger?: boolean
}

export default function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
  delay = 0,
  danger = false,
}: SettingsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      className="mb-8"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              danger
                ? "bg-gradient-to-br from-red-100 to-red-200 text-red-600"
                : "bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h2 className={`text-lg font-bold ${danger ? "text-red-700" : "text-slate-800"}`}>{title}</h2>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
      </div>

      {/* Section Content */}
      <div className="space-y-4">{children}</div>
    </motion.section>
  )
}
