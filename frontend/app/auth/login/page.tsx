"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FaEnvelope, FaSignInAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { AuthLayout } from "../components/AuthLayout";
import { AuthCard } from "../components/AuthCard";
import { AuthHeader } from "../components/AuthHeader";
import { AuthInput } from "../components/AuthInput";
import { AuthPasswordInput } from "../components/AuthPasswordInput";
import { AuthButton } from "../components/AuthButton";
import { AuthFooterLink } from "../components/AuthFooterLink";
import { useAuth } from "../AuthProvider";

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
  const [serverError, setServerError] = useState("");

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && auth.user) {
      router.replace("/dashboard");
    }
  }, [auth.isLoading, auth.user, router]);

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
    setServerError("");
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

    try {
      await auth.login(result.data.email, result.data.password);
      router.push("/dashboard");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to sign in. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="p-6 sm:p-8">
          <AuthHeader
            title="Welcome Back"
            subtitle="Sign in to continue your language journey"
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <FaSignInAlt className="w-8 h-8 text-white" />
              </div>
            }
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {serverError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {serverError}
              </div>
            )}
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