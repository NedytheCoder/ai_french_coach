"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  FaGraduationCap,
  FaArrowRight,
  FaBookOpen,
  FaCheck,
  FaLock,
  FaArrowUp,
  FaPlay,
  FaFeather,
  FaLanguage,
  FaPalette,
  FaMicrophone,
  FaGem,
  FaCrown,
} from "react-icons/fa"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

// Progress Path: A0 → A1 → A2 → B1 → B2 → C1 → C2
function ProgressPath() {
  const levels = [
    { id: "A0", label: "A0", status: "completed" },
    { id: "A1", label: "A1", status: "completed" },
    { id: "A2", label: "A2", status: "completed" },
    { id: "B1", label: "B1", status: "completed" },
    { id: "B2", label: "B2", status: "completed" },
    { id: "C1", label: "C1", status: "current" },
    { id: "C2", label: "C2", status: "locked" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center items-center gap-1 md:gap-1.5 mb-8 overflow-x-auto overflow-y-hidden px-2"
    >
      {levels.map((level, index) => (
        <div key={level.id} className="flex items-center gap-1 md:gap-1.5">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.08 }}
            className={`relative flex flex-col items-center ${
              level.status === "current" ? "scale-105" : ""
            }`}
          >
            <div
              className={`w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-xs transition-all ${
                level.status === "completed"
                  ? "bg-slate-200 text-slate-400"
                  : level.status === "current"
                    ? "bg-slate-700 text-white shadow-md ring-2 ring-slate-300"
                    : "bg-slate-100 text-slate-300 border border-slate-200"
              }`}
            >
              {level.status === "completed" ? (
                <FaCheck className="w-2.5 h-2.5 md:w-3 md:h-3" />
              ) : level.status === "current" ? (
                <FaArrowUp className="w-2.5 h-2.5 md:w-3 md:h-3" />
              ) : (
                <FaLock className="w-2.5 h-2.5 md:w-3 md:h-3" />
              )}

              {level.status === "current" && (
                <motion.div
                  className="absolute inset-0 rounded bg-slate-600"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            <span
              className={`mt-1 text-xs font-medium ${
                level.status === "current"
                  ? "text-slate-700"
                  : level.status === "completed"
                    ? "text-slate-400"
                    : "text-slate-300"
              }`}
            >
              {level.label}
            </span>
          </motion.div>

          {index < levels.length - 1 && (
            <div
              className={`w-2 md:w-4 h-px rounded-full ${
                level.status === "completed"
                  ? "bg-slate-300"
                  : "bg-slate-200"
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
      className="relative text-center pt-10 pb-6"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <ProgressPath />

      <motion.div variants={fadeInUp} className="mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
          <FaGraduationCap className="w-4 h-4" />
          Level C1 — Advanced
        </span>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
      >
        <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
          Welcome to C1
        </span>
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-2 leading-relaxed"
      >
        Refine your expression and communicate with{" "}
        <span className="text-slate-700 font-medium">clarity</span> and{" "}
        <span className="text-slate-700 font-medium">confidence</span>.
      </motion.p>

      <motion.p variants={fadeInUp} className="text-slate-400 mb-8">
        Master nuance, tone, and natural flow.
      </motion.p>

      <motion.div variants={fadeInUp}>
        <Link href="/classes/C1/module1">
          <motion.button
            className="group relative px-8 py-4 bg-slate-700 text-white font-semibold rounded-xl shadow-lg shadow-slate-200 hover:shadow-slate-300 transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              <FaPlay className="w-4 h-4" />
              Begin Mastery
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  )
}

// Welcome Card
function WelcomeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-100 shadow-sm">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <span className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center text-white">
            <FaGem className="w-4 h-4" />
          </span>
          Refinement and Style
        </h2>

        <div className="space-y-3 text-slate-500 leading-relaxed text-sm md:text-base">
          <p>
            You&apos;re already <strong className="text-slate-700">fluent</strong> in French. 
            At C1, you&apos;ll focus on <strong className="text-slate-700">style, refinement,</strong> and expressing 
            complex ideas with <strong className="text-slate-700">elegance</strong>.
          </p>
          <p>
            You&apos;ll express ideas <strong>fluently and spontaneously</strong> without searching for expressions. 
            You&apos;ll use language flexibly for social, academic, and professional purposes.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Skill Cards
function SkillCards() {
  const skills = [
    { icon: FaFeather, label: "Complex expression", description: "Express ideas clearly" },
    { icon: FaPalette, label: "Tone adaptation", description: "Match context perfectly" },
    { icon: FaLanguage, label: "Natural phrasing", description: "Sound like a native" },
    { icon: FaMicrophone, label: "Fluent delivery", description: "Speak spontaneously" },
  ]

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-8"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-lg md:text-xl font-bold text-slate-800 mb-5"
      >
        What You&apos;ll Master
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-lg p-4 border border-slate-100 hover:border-slate-200 transition-all h-full">
              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-3 group-hover:bg-slate-200 group-hover:text-slate-700 transition-all">
                <skill.icon className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1">{skill.label}</h3>
              <p className="text-xs text-slate-400">{skill.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// Nuance & Expression Section
function NuanceSection() {
  const aspects = [
    { title: "Say things naturally", description: "Sound effortless and native-like" },
    { title: "Control tone", description: "Adapt style to any situation" },
    { title: "Express with precision", description: "Convey exactly what you mean" },
    { title: "Flow naturally", description: "Move between topics smoothly" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
        Nuance & Expression
      </h2>

      <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {aspects.map((aspect, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-all"
            >
              <div className="w-5 h-5 bg-slate-200 rounded flex items-center justify-center text-slate-600 text-xs shrink-0 mt-0.5">
                <FaCheck className="w-3 h-3" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 text-sm">{aspect.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{aspect.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 text-center">
          This level is about <span className="font-medium text-slate-600">mastery of expression</span>
        </p>
      </div>
    </motion.section>
  )
}

// Module Preview
function ModulePreview() {
  const modules = [
    { id: 1, title: "Register Control", status: "available" },
    { id: 2, title: "Discourse Flow", status: "locked" },
    { id: 3, title: "Natural Phrasing", status: "locked" },
    { id: 4, title: "Persuasion", status: "locked" },
    { id: 5, title: "Style & Elegance", status: "locked" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
        Curriculum
      </h2>

      <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100">
        <div className="flex flex-wrap gap-2">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.3 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                module.status === "available"
                  ? "bg-white text-slate-700 border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300"
                  : "bg-slate-100 text-slate-400 border border-transparent"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                module.status === "available" ? "bg-slate-600 animate-pulse" : "bg-slate-300"
              }`} />
              {module.status === "locked" && <FaLock className="w-3 h-3" />}
              <span>{module.title}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-xs">
            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse" />
            <span className="text-slate-500">
              Ready: <span className="font-medium text-slate-700">Module 1</span>
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Refinement Section
function RefinementSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-slate-100 to-transparent rounded-full blur-xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="w-11 h-11 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 shadow-sm shrink-0">
            <FaCrown className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">
              Approaching Mastery
            </h3>
            <div className="space-y-0.5 text-slate-500 text-sm">
              <p>At this level, natural expression matters.</p>
              <p className="text-slate-700 font-medium">You&apos;ll refine clarity and style.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Final CTA
function FinalCTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 pb-14"
    >
      <div className="text-center">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
          Ready to Perfect Your French?
        </h2>
        <p className="text-slate-400 mb-5 text-sm">
          Each module brings you closer to native-like expression.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/classes/C1/module1"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-slate-700 text-white font-semibold rounded-xl shadow-lg shadow-slate-200 hover:shadow-xl transition-all"
            >
              <FaPlay className="w-4 h-4" />
              Start Module 1
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <Link
            href="/classes/B2"
            className="text-sm text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1"
          >
            <FaBookOpen className="w-3 h-3" />
            Review B2
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

// Main Component
export default function C1WelcomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-hidden">
      {/* Extremely minimal background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-slate-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <WelcomeCard />
        <SkillCards />
        <NuanceSection />
        <ModulePreview />
        <RefinementSection />
        <FinalCTASection />
      </main>
    </div>
  )
}
