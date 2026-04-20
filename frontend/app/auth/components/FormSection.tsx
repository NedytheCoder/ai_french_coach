"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  delay?: number;
}

export function FormSection({ title, description, children, delay = 0 }: FormSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="space-y-4"
    >
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );
}
