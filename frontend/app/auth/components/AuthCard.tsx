"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
