"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

interface SettingsInputProps {
  label: string
  description?: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "email" | "password" | "tel"
  placeholder?: string
  disabled?: boolean
}

export default function SettingsInput({
  label,
  description,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
}: SettingsInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div
      className={`p-4 bg-white/60 rounded-xl border border-slate-200/50 transition-all duration-200 ${
        isFocused ? "bg-white shadow-md border-purple-300" : "hover:bg-white"
      } ${disabled ? "opacity-60" : ""}`}
    >
      <label className={`text-sm font-semibold ${disabled ? "text-slate-500" : "text-slate-700"}`}>
        {label}
      </label>
      {description && <p className="text-xs text-slate-500 mt-1 mb-3">{description}</p>}

      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:bg-slate-100"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  )
}
