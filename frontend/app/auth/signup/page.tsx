"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaGraduationCap, FaRocket } from "react-icons/fa";

import { AuthLayout } from "../components/AuthLayout";
import { AuthCard } from "../components/AuthCard";
import { AuthHeader } from "../components/AuthHeader";
import { AuthInput } from "../components/AuthInput";
import { AuthPasswordInput } from "../components/AuthPasswordInput";
import { AuthSelect } from "../components/AuthSelect";
import { TextAreaField } from "../components/TextAreaField";
import { AuthCheckbox } from "../components/AuthCheckbox";
import { AuthButton } from "../components/AuthButton";
import { AuthFooterLink } from "../components/AuthFooterLink";
import { FormSection } from "../components/FormSection";
import { CountryCodeSelect } from "../components/CountryCodeSelect";

// Validation Schema
const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string(),
  phoneNumber: z.string().min(5, "Please enter a valid phone number"),
  referralSource: z.string().min(1, "Please select an option"),
  referralOther: z.string().optional(),
  motivation: z.string().min(10, "Please tell us more about your motivation (at least 10 characters)"),
  goal: z.string().min(1, "Please select a goal"),
  goalOther: z.string().optional(),
  currentLevel: z.string().optional(),
  learningFocus: z.string().optional(),
  dailyGoal: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine(
  (data) => {
    if (data.referralSource === "other") {
      return data.referralOther && data.referralOther.length >= 2;
    }
    return true;
  },
  {
    message: "Please specify where you heard about us",
    path: ["referralOther"],
  }
).refine(
  (data) => {
    if (data.goal === "other") {
      return data.goalOther && data.goalOther.length >= 2;
    }
    return true;
  },
  {
    message: "Please specify your goal",
    path: ["goalOther"],
  }
);

type SignupFormData = z.infer<typeof signupSchema>;

const referralOptions = [
  { value: "", label: "Select an option" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "friend", label: "Friend / Family" },
  { value: "google", label: "Google Search" },
  { value: "school", label: "School / University" },
  { value: "advertisement", label: "Advertisement" },
  { value: "other", label: "Other" },
];

const goalOptions = [
  { value: "", label: "Select your primary goal" },
  { value: "travel", label: "Travel" },
  { value: "work", label: "Work" },
  { value: "school", label: "School / Exams" },
  { value: "relocation", label: "Relocation" },
  { value: "conversation", label: "Conversation" },
  { value: "personal", label: "Personal growth" },
  { value: "other", label: "Other" },
];

const levelOptions = [
  { value: "", label: "Select your level (optional)" },
  { value: "complete_beginner", label: "Complete Beginner" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const focusOptions = [
  { value: "", label: "Preferred focus (optional)" },
  { value: "speaking", label: "Speaking" },
  { value: "reading", label: "Reading" },
  { value: "writing", label: "Writing" },
  { value: "listening", label: "Listening" },
  { value: "all", label: "All equally" },
];

const dailyGoalOptions = [
  { value: "", label: "Daily learning goal (optional)" },
  { value: "5", label: "5 minutes" },
  { value: "10", label: "10 minutes" },
  { value: "20", label: "20 minutes" },
  { value: "30", label: "30+ minutes" },
];

export default function SignupPage() {
  const [formData, setFormData] = useState<Partial<SignupFormData>>({
    countryCode: "+1",
    referralSource: "",
    goal: "",
    currentLevel: "",
    learningFocus: "",
    dailyGoal: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: keyof SignupFormData, value: unknown) => {
    const fieldSchema = signupSchema.shape[name];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
    if (!result.success) {
      setErrors((prev) => ({ ...prev, [name]: result.error.issues[0].message }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleChange = (name: keyof SignupFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    console.log("Signup form data:", formData);

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
              <FaRocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Aboard!</h2>
            <p className="text-slate-600 mb-6">
              Your account has been created. Let&apos;s start your French learning journey!
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
            title="Start Your Journey"
            subtitle="Create your account to begin learning French"
            icon={
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <FaGraduationCap className="w-8 h-8 text-white" />
              </div>
            }
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info Section */}
            <FormSection title="Personal Information" delay={0.1}>
              <AuthInput
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
                error={errors.fullName}
                icon={<FaUser className="w-5 h-5" />}
                required
              />

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

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Phone Number<span className="text-rose-500 ml-1">*</span>
                </label>
                <div className="flex gap-2">
                  <CountryCodeSelect
                    value={formData.countryCode || "+1"}
                    onChange={(code) => handleChange("countryCode", code)}
                    error={errors.phoneNumber}
                  />
                  <AuthInput
                    label=""
                    placeholder="Phone number"
                    value={formData.phoneNumber || ""}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    error={errors.phoneNumber}
                    className="flex-1"
                    required
                  />
                </div>
              </div>
            </FormSection>

            {/* Motivation Section */}
            <FormSection title="Your Motivation" description="Help us personalize your experience" delay={0.2}>
              <AuthSelect
                label="Where did you hear about us?"
                options={referralOptions}
                value={formData.referralSource || ""}
                onChange={(e) => handleChange("referralSource", e.target.value)}
                error={errors.referralSource}
                placeholder="Select an option"
                required
              />

              <AnimatePresence>
                {formData.referralSource === "other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AuthInput
                      label="Please specify"
                      placeholder="Tell us where you found us"
                      value={formData.referralOther || ""}
                      onChange={(e) => handleChange("referralOther", e.target.value)}
                      error={errors.referralOther}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <TextAreaField
                label="Why would you like to learn French?"
                placeholder="Share your motivation and goals..."
                value={formData.motivation || ""}
                onChange={(e) => handleChange("motivation", e.target.value)}
                error={errors.motivation}
                charCount={formData.motivation?.length || 0}
                maxLength={500}
                required
              />

              <AuthSelect
                label="What's your primary goal?"
                options={goalOptions}
                value={formData.goal || ""}
                onChange={(e) => handleChange("goal", e.target.value)}
                error={errors.goal}
                placeholder="Select your goal"
                required
              />

              <AnimatePresence>
                {formData.goal === "other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AuthInput
                      label="Please specify your goal"
                      placeholder="Describe your goal"
                      value={formData.goalOther || ""}
                      onChange={(e) => handleChange("goalOther", e.target.value)}
                      error={errors.goalOther}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </FormSection>

            {/* Optional Learning Preferences */}
            <FormSection title="Learning Preferences" description="Optional - helps us tailor your experience" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <AuthSelect
                  label="Current Level"
                  options={levelOptions}
                  value={formData.currentLevel || ""}
                  onChange={(e) => handleChange("currentLevel", e.target.value)}
                />
                <AuthSelect
                  label="Learning Focus"
                  options={focusOptions}
                  value={formData.learningFocus || ""}
                  onChange={(e) => handleChange("learningFocus", e.target.value)}
                />
                <AuthSelect
                  label="Daily Goal"
                  options={dailyGoalOptions}
                  value={formData.dailyGoal || ""}
                  onChange={(e) => handleChange("dailyGoal", e.target.value)}
                />
              </div>
            </FormSection>

            {/* Security Section */}
            <FormSection title="Security" delay={0.4}>
              <AuthPasswordInput
                label="Password"
                placeholder="Create a strong password"
                value={formData.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
                showStrengthIndicator
                required
              />

              <AuthPasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword || ""}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
                required
              />
            </FormSection>

            {/* Terms */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AuthCheckbox
                label={
                  <>
                    I agree to the{" "}
                    <a href="/terms" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </>
                }
                checked={formData.termsAccepted || false}
                onChange={(e) => handleChange("termsAccepted", e.target.checked)}
                error={errors.termsAccepted}
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <AuthButton
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Create Account
              </AuthButton>
            </motion.div>

            {/* Footer Link */}
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