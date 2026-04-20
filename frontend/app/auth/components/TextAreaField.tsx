"use client";

import { motion } from "framer-motion";
import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  charCount?: number;
  maxLength?: number;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, charCount, maxLength, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700">
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
          {maxLength && (
            <span className={`text-xs ${charCount && charCount > maxLength * 0.9 ? "text-amber-500" : "text-slate-400"}`}>
              {charCount || 0}/{maxLength}
            </span>
          )}
        </div>
        
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:bg-slate-50/80 resize-none ${
            error ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200"
          } ${className}`}
          rows={4}
          {...props}
        />
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-rose-500"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

TextAreaField.displayName = "TextAreaField";
