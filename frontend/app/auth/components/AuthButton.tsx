"use client";

import { ReactNode } from "react";

interface AuthButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function AuthButton({
  children,
  variant = "primary",
  size = "lg",
  isLoading = false,
  disabled,
  onClick,
  type = "button",
  className = "",
}: AuthButtonProps) {
  const baseStyles = "relative w-full font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
    secondary: "bg-white text-slate-700 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 active:scale-[0.98] disabled:opacity-60",
    ghost: "bg-transparent text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 active:scale-[0.98]",
  };

  const sizes = {
    default: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
