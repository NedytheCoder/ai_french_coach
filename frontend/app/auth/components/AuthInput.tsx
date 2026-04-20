"use client";

import { motion } from "framer-motion";
import { forwardRef, InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {props.required && <span className="text-rose-500 ml-1">*</span>}
        </label>
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:bg-slate-50/80 ${
              icon ? "pl-11" : ""
            } ${error ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200"} ${className}`}
            {...props}
          />
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

AuthInput.displayName = "AuthInput";
