'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface CTAButton {
  label: string
  href: string
  primary?: boolean
  icon?: ReactNode
}

interface CTASectionProps {
  buttons: CTAButton[]
}

export function CTASection({ buttons }: CTASectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-3"
    >
      {buttons.map((button, index) => (
        <Link
          key={index}
          href={button.href}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
            button.primary
              ? 'bg-gradient-to-r from-indigo-600 to-slate-700 text-white hover:shadow-lg'
              : 'border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
          }`}
        >
          {button.icon}
          <span>{button.label}</span>
        </Link>
      ))}
    </motion.div>
  )
}
