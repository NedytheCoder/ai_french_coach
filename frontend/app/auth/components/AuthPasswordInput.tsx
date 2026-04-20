"use client";

import { motion } from "framer-motion";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface AuthPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  showStrengthIndicator?: boolean;
  value?: string;
}

export const AuthPasswordInput = forwardRef<HTMLInputElement, AuthPasswordInputProps>(
  ({ label, error, showStrengthIndicator = false, value = "", className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const getPasswordStrength = (pwd: string): { strength: number; label: string; color: string } => {
      if (!pwd) return { strength: 0, label: "", color: "bg-slate-200" };
      
      let score = 0;
      if (pwd.length >= 8) score++;
      if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
      if (/\d/.test(pwd)) score++;
      if (/[^a-zA-Z0-9]/.test(pwd)) score++;

      const levels = [
        { label: "Too weak", color: "bg-rose-500" },
        { label: "Weak", color: "bg-orange-500" },
        { label: "Fair", color: "bg-amber-500" },
        { label: "Good", color: "bg-emerald-500" },
        { label: "Strong", color: "bg-emerald-600" },
      ];

      return { strength: score, ...levels[score] };
    };

    const strength = getPasswordStrength(value);

    return (
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          {label}
          {props.required && <span className="text-rose-500 ml-1">*</span>}
        </label>
        
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={`w-full px-4 py-3 pr-12 bg-slate-50 border rounded-xl text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:bg-slate-50/80 ${
              error ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-200"
            } ${className}`}
            {...props}
          />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
          </button>
        </div>
        
        {showStrengthIndicator && value && (
          <div className="space-y-1">
            <div className="flex gap-1 h-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`flex-1 rounded-full transition-colors duration-300 ${
                    level <= strength.strength ? strength.color : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <p className={`text-xs ${strength.strength >= 3 ? "text-emerald-600" : "text-slate-500"}`}>
              {strength.label}
            </p>
          </div>
        )}
        
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

AuthPasswordInput.displayName = "AuthPasswordInput";
