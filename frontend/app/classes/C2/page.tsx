"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  FaArrowRight,
  FaBookOpen,
  FaCheck,
  FaPlay,
  FaCrown,
  FaPenNib,
  FaBrain,
  FaComments,
  FaQuoteRight,
} from "react-icons/fa"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

// Minimal Progress Path: A0 → A1 → A2 → B1 → B2 → C1 → C2
function ProgressPath() {
  const levels = [
    { id: "A0", status: "completed" },
    { id: "A1", status: "completed" },
    { id: "A2", status: "completed" },
    { id: "B1", status: "completed" },
    { id: "B2", status: "completed" },
    { id: "C1", status: "completed" },
    { id: "C2", status: "current" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center items-center gap-0.5 md:gap-1 mb-10"
    >
      {levels.map((level, index) => (
        <div key={level.id} className="flex items-center gap-0.5 md:gap-1">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.06 }}
            className="relative flex flex-col items-center"
          >
            <div
              className={`w-6 h-6 md:w-7 md:h-7 rounded-sm flex items-center justify-center text-xs transition-all ${
                level.status === "completed"
                  ? "bg-slate-200 text-slate-400"
                  : "bg-slate-800 text-white shadow-sm"
              }`}
            >
              {level.status === "completed" ? (
                <FaCheck className="w-2.5 h-2.5" />
              ) : (
                <FaCrown className="w-3 h-3" />
              )}

              {level.status === "current" && (
                <motion.div
                  className="absolute inset-0 rounded-sm bg-slate-700"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            <span
              className={`mt-1 text-xs font-medium ${
                level.status === "current" ? "text-slate-700" : "text-slate-400"
              }`}
            >
              {level.id}
            </span>
          </motion.div>

          {index < levels.length - 1 && (
            <div
              className={`w-1.5 md:w-3 h-px rounded-full ${
                level.status === "completed" ? "bg-slate-300" : "bg-slate-200"
              }`}
            />
          )}
        </div>
      ))}
    </motion.div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <motion.section
      className="relative text-center pt-12 pb-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <ProgressPath />

      <motion.div variants={fadeInUp} className="mb-3">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-medium border border-slate-200">
          Level C2 — Mastery
        </span>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight"
      >
        <span className="text-slate-900">
          Welcome to C2
        </span>
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="text-xl md:text-2xl text-slate-600 max-w-xl mx-auto mb-2 leading-relaxed"
      >
        Mastery, precision, and complete control.
      </motion.p>

      <motion.p variants={fadeInUp} className="text-slate-400 mb-10 text-sm md:text-base">
        Express complex ideas with clarity, depth, and confidence.
      </motion.p>

      <motion.div variants={fadeInUp}>
        <Link href="/classes/C2/module1">
          <motion.button
            className="group relative px-10 py-4 bg-slate-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="flex items-center gap-2">
              <FaPlay className="w-3.5 h-3.5" />
              Enter Mastery
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  )
}

// Welcome Section
function WelcomeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-10 border-t border-slate-100"
    >
      <div className="max-w-xl mx-auto text-center">
        <p className="text-slate-600 leading-relaxed text-base md:text-lg">
          You&apos;ve reached <span className="font-semibold text-slate-800">near-native control</span>. 
          You&apos;re ready for <span className="font-semibold text-slate-800">intellectual expression</span>,{" "}
          <span className="font-semibold text-slate-800">stylistic flexibility</span>, and the highest level 
          of linguistic sophistication.
        </p>
      </div>
    </motion.div>
  )
}

// Mastery Skills
function MasterySkills() {
  const skills = [
    { icon: FaPenNib, label: "Interpret subtle meaning", description: "Understand implicit nuance" },
    { icon: FaBrain, label: "Express with precision", description: "Convey ideas exactly" },
    { icon: FaComments, label: "Adapt to any context", description: "Master all registers" },
    { icon: FaQuoteRight, label: "Articulate complex arguments", description: "Build sophisticated reasoning" },
  ]

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-10 border-t border-slate-100"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-lg md:text-xl font-semibold text-slate-800 mb-8 text-center"
      >
        What You&apos;ll Master
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="group"
          >
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-all">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-600 transition-all shrink-0">
                <skill.icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 text-sm mb-0.5">{skill.label}</h3>
                <p className="text-xs text-slate-400">{skill.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// Intellectual Capabilities
function IntellectualCapabilities() {
  const capabilities = [
    "Analyze and interpret complex texts",
    "Communicate with nuance and depth",
    "Adapt tone effortlessly",
    "Master rhetorical expression",
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-10 border-t border-slate-100"
    >
      <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-6 text-center">
        Intellectual Capabilities
      </h2>

      <div className="max-w-md mx-auto">
        <div className="space-y-3">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-3 py-2"
            >
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              <span className="text-slate-600 text-sm">{capability}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// Module Preview
function ModulePreview() {
  const modules = [
    { id: 1, title: "Rhetorical Mastery" },
    { id: 2, title: "Critical Analysis" },
    { id: 3, title: "Implicit Meaning" },
    { id: 4, title: "Elegant Expression" },
    { id: 5, title: "Complete Control" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-10 border-t border-slate-100"
    >
      <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-6 text-center">
        Curriculum
      </h2>

      <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              index === 0
                ? "bg-white text-slate-700 border border-slate-200 shadow-sm"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            <span className={`inline-block w-1 h-1 rounded-full mr-2 ${
              index === 0 ? "bg-slate-600 animate-pulse" : "bg-slate-300"
            }`} />
            {module.title}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-xs text-slate-500">
          <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse" />
          Ready: <span className="font-medium text-slate-700">Module 1</span>
        </span>
      </div>
    </motion.section>
  )
}

// Mastery Achievement Section
function MasteryAchievement() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-10 border-t border-slate-100"
    >
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 rounded-full mb-4">
          <FaCrown className="w-6 h-6 text-slate-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-slate-800 mb-3">
          You Are at the Highest Level
        </h3>
        
        <p className="text-slate-500 leading-relaxed text-sm">
          This stage focuses on <span className="font-medium text-slate-700">precision and depth</span>. 
          You&apos;re refining complete language control. You&apos;ll express yourself with{" "}
          <span className="font-medium text-slate-700">precision and nuance</span> even in the most 
          complex situations.
        </p>
      </div>
    </motion.section>
  )
}

// Final CTA
function FinalCTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12 pb-20 border-t border-slate-100"
    >
      <div className="text-center max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          Ready to Achieve Mastery?
        </h2>
        
        <p className="text-slate-400 mb-6 text-sm">
          Complete the final stage of your French journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Link
              href="/classes/C2/module1"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <FaPlay className="w-3.5 h-3.5" />
              Start Module 1
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <Link
            href="/classes/C1"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
          >
            <FaBookOpen className="w-3 h-3" />
            Return to C1
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

// Main Component
export default function C2WelcomePage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans overflow-hidden">
      {/* No background decorations - pure minimalism */}
      
      <main className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <HeroSection />
        <WelcomeSection />
        <MasterySkills />
        <IntellectualCapabilities />
        <ModulePreview />
        <MasteryAchievement />
        <FinalCTASection />
      </main>
    </div>
  )
}
