"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FaLock, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

import { AuthLayout } from "../components/AuthLayout";
import { AuthCard } from "../components/AuthCard";
import { AuthHeader } from "../components/AuthHeader";
import { AuthPasswordInput } from "../components/AuthPasswordInput";
import { AuthButton } from "../components/AuthButton";

// Validation Schema
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState<Partial<ChangePasswordFormData>>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ChangePasswordFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (name: keyof ChangePasswordFormData, value: string) => {
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

    const result = changePasswordSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ChangePasswordFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ChangePasswordFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    console.log("Change password form data:", formData);

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
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Password Updated!</h2>
            <p className="text-slate-600 mb-6">
              Your password has been changed successfully. Please use your new password next time you log in.
            </p>
            <AuthButton onClick={() => (window.location.href = "/dashboard")}>
              Go to Dashboard
            </AuthButton>
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
            title="Change Password"
            subtitle="Update your password to keep your account secure"
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <FaShieldAlt className="w-8 h-8 text-white" />
              </div>
            }
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <AuthPasswordInput
                label="Current Password"
                placeholder="Enter your current password"
                value={formData.currentPassword || ""}
                onChange={(e) => handleChange("currentPassword", e.target.value)}
                error={errors.currentPassword}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AuthPasswordInput
                label="New Password"
                placeholder="Create a new password"
                value={formData.newPassword || ""}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                error={errors.newPassword}
                showStrengthIndicator
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AuthPasswordInput
                label="Confirm New Password"
                placeholder="Confirm your new password"
                value={formData.confirmPassword || ""}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
                required
              />
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
                Update Password
              </AuthButton>
            </motion.div>
          </form>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
