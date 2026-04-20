"use client";

import { motion } from "framer-motion";
import { forwardRef, SelectHTMLAttributes } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SelectOption {
  value: string;
  label: string;
}

interface AuthSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const AuthSelect = forwardRef<HTMLSelectElement, AuthSelectProps>(
  ({ label, error, options, placeholder, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {props.required && <span className="text-rose-500 ml-1">*</span>}
        </label>
        
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-4 py-3 pr-10 bg-slate-50 border rounded-xl text-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:bg-slate-50/80 appearance-none cursor-pointer ${
              error ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200"
            } ${!props.value ? "text-slate-400" : ""} ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <FaChevronDown className="w-4 h-4" />
          </div>
        </div>
        
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

AuthSelect.displayName = "AuthSelect";
