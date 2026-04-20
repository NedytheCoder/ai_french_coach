"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost"

interface SettingsActionButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]",
  secondary:
    "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
  danger:
    "bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 hover:scale-[1.02]",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-800",
}

export default function SettingsActionButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
}: SettingsActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`
        inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      {loading && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
        />
      )}
      {!loading && icon}
      {children}
    </motion.button>
  )
}
