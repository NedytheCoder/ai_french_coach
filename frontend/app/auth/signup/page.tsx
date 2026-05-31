"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { FaUser, FaEnvelope, FaGraduationCap } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { AuthLayout } from "../components/AuthLayout";
import { AuthCard } from "../components/AuthCard";
import { AuthHeader } from "../components/AuthHeader";
import { AuthInput } from "../components/AuthInput";
import { AuthPasswordInput } from "../components/AuthPasswordInput";
import { AuthSelect } from "../components/AuthSelect";
import { AuthButton } from "../components/AuthButton";
import { AuthFooterLink } from "../components/AuthFooterLink";
import { useAuth } from "../AuthProvider";
import { useLanguages } from "../../../lib/hooks";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    sourceLanguageCode: z.string().min(1, "Please select your native language"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [formData, setFormData] = useState<Partial<SignupFormData>>({
    sourceLanguageCode: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const auth = useAuth();
  const router = useRouter();
  const { languages } = useLanguages();

  const languageOptions = languages.map((l) => ({ value: l.code, label: l.name }));

  useEffect(() => {
    if (!auth.isLoading && auth.user) {
      router.replace("/dashboard");
    }
  }, [auth.isLoading, auth.user, router]);

  const handleChange = (name: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setIsSubmitting(true);

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof SignupFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await auth.register(
        result.data.fullName,
        result.data.email,
        result.data.password,
        result.data.sourceLanguageCode
      );
      router.push("/dashboard");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Unable to create your account. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className="p-6 sm:p-8">
          <AuthHeader
            title="Create Account"
            subtitle="Sign up to start your language learning journey"
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <FaGraduationCap className="w-8 h-8 text-white" />
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
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.fullName ?? ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
                error={errors.fullName}
                icon={<FaUser className="w-5 h-5" />}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AuthInput
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email ?? ""}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                icon={<FaEnvelope className="w-5 h-5" />}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AuthSelect
                label="Native language"
                options={[{ value: "", label: "Select your language" }, ...languageOptions]}
                value={formData.sourceLanguageCode ?? ""}
                onChange={(e) => handleChange("sourceLanguageCode", e.target.value)}
                error={errors.sourceLanguageCode}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AuthPasswordInput
                label="Password"
                placeholder="Create a strong password"
                value={formData.password ?? ""}
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
                showStrengthIndicator
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AuthPasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword ?? ""}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-2"
            >
              <AuthButton type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                Create Account
              </AuthButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <AuthFooterLink
                text="Already have an account?"
                linkText="Log in"
                href="/auth/login"
              />
            </motion.div>
          </form>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
