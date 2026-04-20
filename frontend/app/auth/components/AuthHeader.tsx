"use client";

import { motion } from "framer-motion";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export function AuthHeader({ title, subtitle, icon }: AuthHeaderProps) {
  return (
    <div className="text-center mb-8">
      {icon && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          {icon}
        </motion.div>
      )}
      
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {title}
      </motion.h1>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-slate-500"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
