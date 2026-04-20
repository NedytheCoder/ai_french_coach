"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  leftContent?: ReactNode;
  showLeftPanel?: boolean;
}

export function AuthLayout({
  children,
  leftContent,
  showLeftPanel = true,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 flex">
      {/* Left Panel - Branding/Welcome */}
      {showLeftPanel && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="hidden lg:flex lg:w-1/2 xl:w-5/12 flex-col justify-center items-center p-12 relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl" />
          </div>

          {leftContent || <DefaultLeftContent />}
        </motion.div>
      )}

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 xl:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function DefaultLeftContent() {
  return (
    <div className="relative z-10 text-center max-w-md">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25">
          <span className="text-4xl font-bold text-white">Fr</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl font-bold text-slate-800 mb-4"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Start Your French Journey
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg text-slate-600 mb-8"
      >
        Build fluency step by step with personalized learning
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-3 text-left"
      >
        <BenefitItem icon="✓" text="Adaptive lessons that match your level" />
        <BenefitItem icon="✓" text="Practice real-world conversations" />
        <BenefitItem icon="✓" text="Track progress with clear milestones" />
      </motion.div>
    </div>
  );
}

function BenefitItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-700">
      <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}
