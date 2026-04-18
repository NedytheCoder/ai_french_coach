"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  FaBookOpen, FaHeadphones, FaPen, FaMicrophone, FaRocket,
  FaCheckCircle, FaClock, FaChartLine, FaGraduationCap,
  FaArrowRight, FaShieldAlt, FaLightbulb, FaStar,
  FaCompass, FaChevronRight
} from "react-icons/fa"

// =============================================================================
// TYPES & DATA
// =============================================================================

interface SkillInfo {
  id: string
  title: string
  icon: React.ElementType
  description: string
  format: string
  questions: string
  time: string
  color: string
  gradient: string
}

const skills: SkillInfo[] = [
  {
    id: "reading",
    title: "Reading",
    icon: FaBookOpen,
    description: "Understand written French texts",
    format: "Multiple choice / comprehension",
    questions: "~10–15 questions",
    time: "5–8 minutes",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "listening",
    title: "Listening",
    icon: FaHeadphones,
    description: "Understand spoken French",
    format: "Audio-based questions",
    questions: "~8–12 questions",
    time: "5–7 minutes",
    color: "purple",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: "writing",
    title: "Writing",
    icon: FaPen,
    description: "Express your ideas in French",
    format: "Short written responses",
    questions: "~2–3 prompts",
    time: "5–10 minutes",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "speaking",
    title: "Speaking",
    icon: FaMicrophone,
    description: "Speak and respond in French",
    format: "Voice responses",
    questions: "~2–3 prompts",
    time: "5–10 minutes",
    color: "orange",
    gradient: "from-orange-500 to-amber-500",
  },
]

const flowSteps = [
  { id: 1, title: "Reading", icon: FaBookOpen, color: "blue" },
  { id: 2, title: "Listening", icon: FaHeadphones, color: "purple" },
  { id: 3, title: "Writing", icon: FaPen, color: "emerald" },
  { id: 4, title: "Speaking", icon: FaMicrophone, color: "orange" },
]

// =============================================================================
// ANIMATED BACKGROUND
// =============================================================================

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            left: `${15 + i * 25}%`,
            top: `${10 + (i % 2) * 40}%`,
            background: `linear-gradient(135deg, ${
              i % 2 === 0 
                ? "rgba(59,130,246,0.12) 0%, rgba(147,51,234,0.08) 100%"
                : "rgba(34,197,94,0.1) 0%, rgba(59,130,246,0.06) 100%"
            })`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 7 + i * 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

// =============================================================================
// HERO SECTION
// =============================================================================

function PlacementHero() {
  return (
    <motion.section 
      className="relative text-center py-12 lg:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Mission badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-6"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaCompass className="w-4 h-4 text-amber-600" />
        </motion.div>
        <span className="text-sm font-bold text-amber-700">Mission: Find Your Level</span>
      </motion.div>

      {/* Main title */}
      <motion.h1 
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      >
        Placement{" "}
        <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          Test
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        className="text-xl text-slate-600 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Find your level and start at the right point.
      </motion.p>

      {/* Description */}
      <motion.p 
        className="text-slate-500 max-w-md mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        This test evaluates your French skills across four key areas.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Link href="/reception/tests/read_test_level">
          <motion.button
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              <FaRocket className="w-6 h-6 group-hover:animate-bounce" />
              <span>Start Test</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaChevronRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  )
}

// =============================================================================
// TEST FLOW PROGRESSION
// =============================================================================

function TestFlowSection() {
  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Section header */}
      <div className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <FaChartLine className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-bold text-blue-700">How It Works</span>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Your Test Journey
        </h2>
        <p className="text-slate-600">
          Each section builds on the previous one
        </p>
      </div>

      {/* Flow steps - horizontal on desktop, vertical on mobile */}
      <div className="relative">
        {/* Progress line - desktop */}
        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-1 bg-slate-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              {/* Step number badge */}
              <motion.div
                className="absolute -top-2 -left-2 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
              >
                {step.id}
              </motion.div>

              {/* Icon circle */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  step.color === "blue" ? "from-blue-500 to-cyan-500" :
                  step.color === "purple" ? "from-purple-500 to-violet-500" :
                  step.color === "emerald" ? "from-emerald-500 to-teal-500" :
                  "from-orange-500 to-amber-500"
                } flex items-center justify-center shadow-lg mb-3`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <step.icon className="w-7 h-7 text-white" />
              </motion.div>

              {/* Title */}
              <h3 className="font-bold text-slate-900">{step.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Vertical progress line for mobile */}
        <div className="md:hidden absolute left-8 top-16 bottom-16 w-1 bg-slate-200 rounded-full">
          <motion.div
            className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 rounded-full"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.section>
  )
}

// =============================================================================
// SKILL CARDS
// =============================================================================

function SkillCard({ skill, index }: { skill: SkillInfo; index: number }) {
  const colorVariants = {
    blue: {
      bg: "from-blue-50 to-cyan-50",
      border: "border-blue-200",
      borderHover: "hover:border-blue-300",
      icon: "from-blue-500 to-cyan-500",
      accent: "text-blue-600",
      badge: "bg-blue-100 text-blue-700",
    },
    purple: {
      bg: "from-purple-50 to-violet-50",
      border: "border-purple-200",
      borderHover: "hover:border-purple-300",
      icon: "from-purple-500 to-violet-500",
      accent: "text-purple-600",
      badge: "bg-purple-100 text-purple-700",
    },
    emerald: {
      bg: "from-emerald-50 to-teal-50",
      border: "border-emerald-200",
      borderHover: "hover:border-emerald-300",
      icon: "from-emerald-500 to-teal-500",
      accent: "text-emerald-600",
      badge: "bg-emerald-100 text-emerald-700",
    },
    orange: {
      bg: "from-orange-50 to-amber-50",
      border: "border-orange-200",
      borderHover: "hover:border-orange-300",
      icon: "from-orange-500 to-amber-500",
      accent: "text-orange-600",
      badge: "bg-orange-100 text-orange-700",
    },
  }

  const c = colorVariants[skill.color as keyof typeof colorVariants]

  return (
    <motion.div
      className={`relative p-6 rounded-2xl border-2 ${c.border} ${c.borderHover} bg-gradient-to-br ${c.bg} transition-all duration-300 hover:shadow-lg`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.icon} flex items-center justify-center mb-4 shadow-md`}>
        <skill.icon className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{skill.title}</h3>

      {/* Description */}
      <p className="text-slate-600 text-sm mb-4">{skill.description}</p>

      {/* Details */}
      <div className="space-y-2">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${c.badge}`}>
          <FaCheckCircle className="w-3 h-3" />
          <span>{skill.format}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <FaLightbulb className="w-4 h-4" />
            {skill.questions}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="w-4 h-4" />
            {skill.time}
          </span>
        </div>
      </div>

      {/* Step number indicator */}
      <div className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-sm font-bold ${c.accent}`}>
        {index + 1}
      </div>
    </motion.div>
  )
}

function SkillsSection() {
  return (
    <motion.section 
      className="py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Section header */}
      <div className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <FaGraduationCap className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-bold text-purple-700">Test Structure</span>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Four Skills, One Goal
        </h2>
        <p className="text-slate-600 max-w-lg mx-auto">
          Each section is carefully designed to assess your abilities in a specific area
        </p>
      </div>

      {/* Skill cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {skills.map((skill, index) => (
          <SkillCard key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    </motion.section>
  )
}

// =============================================================================
// TIME ESTIMATE CARD
// =============================================================================

function TimeEstimateCard() {
  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white text-center overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20" />
          
          {/* Floating orbs */}
          <motion.div
            className="absolute top-4 left-4 w-20 h-20 rounded-full bg-blue-500/20 blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-purple-500/20 blur-2xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />

          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <FaClock className="w-8 h-8 text-amber-400" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">Total Estimated Time</h2>
            <p className="text-slate-400 mb-6">
              Complete all four sections at your own pace
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                ~20-30
              </span>
              <span className="text-2xl text-slate-400">minutes</span>
            </div>

            <p className="text-sm text-slate-400">
              You can pause between sections and return later
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// =============================================================================
// RESULTS PREVIEW
// =============================================================================

function ResultsPreview() {
  const benefits = [
    { icon: FaChartLine, title: "Your CEFR Level", desc: "A0 to C2 proficiency rating" },
    { icon: FaCompass, title: "Starting Point", desc: "Recommended level to begin" },
    { icon: FaRocket, title: "Learning Path", desc: "Personalized journey ahead" },
  ]

  const levels = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]

  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Section header */}
      <div className="text-center mb-10">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <FaStar className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700">What You Get</span>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Your Personalized Results
        </h2>
        <p className="text-slate-600">
          After completing the test, you will receive
        </p>
      </div>

      {/* Benefits grid */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            className="p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-md">
              <benefit.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">{benefit.title}</h3>
            <p className="text-sm text-slate-500">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Level preview */}
      <motion.div
        className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-center text-sm font-medium text-slate-500 mb-4">
          CEFR Levels you can achieve
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {levels.map((level, index) => (
            <motion.div
              key={level}
              className={`px-4 py-2 rounded-xl font-bold text-sm ${
                level === "B1" 
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30" 
                  : "bg-white text-slate-600 border border-slate-200"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {level}
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">
          B1 highlighted as example
        </p>
      </motion.div>
    </motion.section>
  )
}

// =============================================================================
// REASSURANCE SECTION
// =============================================================================

function ReassuranceSection() {
  const points = [
    { icon: FaShieldAlt, text: "You don't need to be perfect" },
    { icon: FaLightbulb, text: "Just do your best" },
    { icon: FaCheckCircle, text: "This helps us guide you better" },
  ]

  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="text-center mb-6">
            <motion.div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-200 mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FaStar className="w-7 h-7 text-amber-600" />
            </motion.div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              You're Ready
            </h2>
            <p className="text-slate-600">
              Take a deep breath. You've got this!
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {points.map((point, index) => (
              <motion.div
                key={point.text}
                className="flex items-center gap-3 p-4 bg-white/70 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <point.icon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">{point.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// =============================================================================
// CTA SECTION
// =============================================================================

function CTASection() {
  return (
    <motion.section
      className="py-16 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <FaRocket className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-bold text-blue-700">Let's Find Your Level</span>
      </motion.div>

      <motion.h2 
        className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Ready to Begin?
      </motion.h2>

      <motion.p 
        className="text-slate-600 mb-8 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Your personalized French learning journey starts with this simple assessment.
      </motion.p>

      {/* Primary CTA */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/reception/tests/read_test_level">
          <motion.button
            className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-500/30 overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaRocket className="w-6 h-6" />
              </motion.div>
              <span>Start Placement Test</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Secondary CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/reception">
          <button className="text-slate-500 hover:text-slate-700 font-medium transition-colors inline-flex items-center gap-2">
            <span>Or choose your level manually</span>
            <FaChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </motion.section>
  )
}

// =============================================================================
// FOOTER NOTE
// =============================================================================

function FooterNote() {
  return (
    <motion.p
      className="text-center text-slate-400 text-sm py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      Your progress is automatically saved. You can pause and return anytime.
    </motion.p>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function PlacementTestLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 font-sans overflow-x-hidden relative">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <PlacementHero />

        {/* Test Flow */}
        <TestFlowSection />

        {/* Skills Detail */}
        <SkillsSection />

        {/* Time Estimate */}
        <TimeEstimateCard />

        {/* Results Preview */}
        <ResultsPreview />

        {/* Reassurance */}
        <ReassuranceSection />

        {/* Final CTA */}
        <CTASection />

        {/* Footer */}
        <FooterNote />
      </div>
    </div>
  )
}
