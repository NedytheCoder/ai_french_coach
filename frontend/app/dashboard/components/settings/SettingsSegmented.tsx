"use client"

import { motion } from "framer-motion"

interface Option {
  value: string
  label: string
  icon?: React.ReactNode
}

interface SettingsSegmentedProps {
  label: string
  description?: string
  value: string
  options: Option[]
  onChange: (value: string) => void
}

export default function SettingsSegmented({
  label,
  description,
  value,
  options,
  onChange,
}: SettingsSegmentedProps) {
  return (
    <div className="p-4 bg-white/60 rounded-xl border border-slate-200/50 hover:bg-white transition-all duration-200">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {description && <p className="text-xs text-slate-500 mt-1 mb-3">{description}</p>}

      <div className="flex p-1 bg-slate-100 rounded-xl">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              value === option.value ? "text-white" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            {value === option.value && (
              <motion.div
                layoutId="segmented-background"
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-md"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {option.icon}
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
