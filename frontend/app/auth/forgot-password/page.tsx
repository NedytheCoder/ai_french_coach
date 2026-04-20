"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FaEnvelope, FaKey, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

import { AuthLayout } from "../components/AuthLayout";
import { AuthCard } from "../components/AuthCard";
import { AuthHeader } from "../components/AuthHeader";
import { AuthInput } from "../components/AuthInput";
import { AuthButton } from "../components/AuthButton";

// Validation Schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState<Partial<ForgotPasswordFormData>>({
    email: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (name: keyof ForgotPasswordFormData, value: string) => {
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

    const result = forgotPasswordSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ForgotPasswordFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ForgotPasswordFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    console.log("Forgot password form data:", formData);

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
              <FaCheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Check Your Email</h2>
            <p className="text-slate-600 mb-6">
              We&apos;ve sent a password reset link to {formData.email}. Please check your inbox.
            </p>
            <Link href="/auth/login">
              <AuthButton variant="secondary">Back to Login</AuthButton>
            </Link>
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
            title="Reset Password"
            subtitle="Enter your email and we'll send you a reset link"
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <FaKey className="w-8 h-8 text-white" />
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
              <AuthButton
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Send Reset Link
              </AuthButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </motion.div>
          </form>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
