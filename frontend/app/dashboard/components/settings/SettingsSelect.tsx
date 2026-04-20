"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface Option {
  value: string
  label: string
  icon?: string
}

interface SettingsSelectProps {
  label: string
  description?: string
  value: string
  options: Option[]
  onChange: (value: string) => void
}

export default function SettingsSelect({
  label,
  description,
  value,
  options,
  onChange,
}: SettingsSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className="p-4 bg-white/60 rounded-xl border border-slate-200/50 hover:bg-white hover:shadow-md transition-all duration-200">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {description && <p className="text-xs text-slate-500 mt-1 mb-3">{description}</p>}

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-purple-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <span>{selectedOption?.label || "Select..."}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-slate-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                  option.value === value
                    ? "bg-purple-50 text-purple-700 font-medium"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {option.icon && <span className="mr-2">{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}
