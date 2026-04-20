"use client";

import { motion } from "framer-motion";
import { forwardRef, InputHTMLAttributes } from "react";
import { FaCheck } from "react-icons/fa";

interface AuthCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  error?: string;
}

export const AuthCheckbox = forwardRef<HTMLInputElement, AuthCheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              className="peer sr-only"
              {...props}
            />
            <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
              error 
                ? "border-rose-300 peer-checked:bg-rose-500 peer-checked:border-rose-500" 
                : "border-slate-300 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 group-hover:border-indigo-400"
            }`}>
              <FaCheck className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
            {label}
          </span>
        </label>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-rose-500 ml-8"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

AuthCheckbox.displayName = "AuthCheckbox";
