"use client"

import { motion } from "framer-motion"

interface SettingsToggleProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export default function SettingsToggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: SettingsToggleProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-white/60 rounded-xl border border-slate-200/50 transition-all duration-200 ${
        disabled ? "opacity-60" : "hover:bg-white hover:shadow-md"
      }`}
    >
      <div className="flex-1 pr-4">
        <label className={`text-sm font-semibold ${disabled ? "text-slate-500" : "text-slate-700"}`}>
          {label}
        </label>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </div>

      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
          checked ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-slate-300"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        aria-checked={checked}
        role="switch"
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md ${
            checked ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  )
}
