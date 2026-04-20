"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import Link from "next/link"

type ButtonVariant = "primary" | "secondary" | "outline"

interface ProfileActionButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  icon?: ReactNode
  fullWidth?: boolean
}

const variantStyles = {
  primary: "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
  secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
  outline: "bg-transparent text-purple-600 border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300",
}

export default function ProfileActionButton({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  fullWidth = false,
}: ProfileActionButtonProps) {
  const className = `
    inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
    ${variantStyles[variant]}
    ${fullWidth ? "w-full" : ""}
  `

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {icon}
      {children}
    </motion.span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  )
}
