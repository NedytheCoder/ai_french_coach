'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface LevelLandingPageProps {
  children: ReactNode
  className?: string
}

export function LevelLandingPage({ children, className = '' }: LevelLandingPageProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 pb-24 ${className}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
