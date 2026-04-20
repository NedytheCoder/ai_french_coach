"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

import { AuthLayout } from "../components/AuthLayout";
import { AuthCard } from "../components/AuthCard";
import { AuthHeader } from "../components/AuthHeader";
import { AuthInput } from "../components/AuthInput";
import { AuthPasswordInput } from "../components/AuthPasswordInput";
import { AuthButton } from "../components/AuthButton";
import { AuthFooterLink } from "../components/AuthFooterLink";

// Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [formData, setFormData] = useState<Partial<LoginFormData>>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (name: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    console.log("Login form data:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <AuthCard className="p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
              <FaSignInAlt className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back!</h2>
            <p className="text-slate-600 mb-6">Successfully logged in. Redirecting...</p>
          </motion.div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard>
        <div className="p-6 sm:p-8">
          <AuthHeader
            title="Welcome Back"
            subtitle="Sign in to continue your French journey"
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <FaSignInAlt className="w-8 h-8 text-white" />
              </div>
            }
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <AuthInput
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                icon={<FaEnvelope className="w-5 h-5" />}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AuthPasswordInput
                label="Password"
                placeholder="Enter your password"
                value={formData.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between"
            >
              <a
                href="/auth/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors hover:underline"
              >
                Forgot password?
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AuthButton
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Sign In
              </AuthButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AuthFooterLink
                text="Don't have an account?"
                linkText="Sign up"
                href="/auth/signup"
              />
            </motion.div>
          </form>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}