"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  FaGraduationCap,
  FaArrowRight,
  FaBookOpen,
  FaClipboardCheck,
  FaCheck,
  FaLock,
  FaArrowUp,
  FaPlay,
  FaHistory,
  FaCommentDots,
  FaCalendarAlt,
  FaLightbulb,
  // FaEarListen,
  FaHandshake,
} from "react-icons/fa"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// Progress Path: A0 → A1 → A2 → B1
function ProgressPath() {
  const levels = [
    { id: "A0", label: "A0", status: "completed", icon: FaCheck },
    { id: "A1", label: "A1", status: "completed", icon: FaCheck },
    { id: "A2", label: "A2", status: "current", icon: FaArrowUp },
    { id: "B1", label: "B1", status: "locked", icon: FaLock },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center items-center gap-2 md:gap-4 mb-8"
    >
      {levels.map((level, index) => (
        <div key={level.id} className="flex items-center gap-2 md:gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.15 }}
            className={`relative flex flex-col items-center ${
              level.status === "current" ? "scale-105" : ""
            }`}
          >
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-base md:text-lg shadow-md transition-all ${
                level.status === "completed"
                  ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
                  : level.status === "current"
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-200 shadow-lg ring-2 ring-blue-100"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
              }`}
            >
              <level.icon className="w-4 h-4 md:w-5 md:h-5" />

              {level.status === "current" && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-blue-500"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            <span
              className={`mt-1.5 text-xs font-semibold ${
                level.status === "current"
                  ? "text-blue-700"
                  : level.status === "completed"
                    ? "text-emerald-600"
                    : "text-slate-400"
              }`}
            >
              {level.label}
            </span>
          </motion.div>

          {index < levels.length - 1 && (
            <div
              className={`w-6 md:w-12 h-0.5 rounded-full ${
                level.status === "completed"
                  ? "bg-gradient-to-r from-emerald-400 to-blue-500"
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
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
          <FaGraduationCap className="w-4 h-4" />
          Level A2 — Pre-Intermediate
        </span>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
      >
        <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-blue-700 bg-clip-text text-transparent">
          Welcome to A2
        </span>
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-2 leading-relaxed"
      >
        You&apos;re now ready to handle{" "}
        <span className="text-blue-700 font-medium">more complex situations</span> in French.
      </motion.p>

      <motion.p variants={fadeInUp} className="text-slate-500 mb-8">
        Let&apos;s build confidence and flexibility.
      </motion.p>

      <motion.div variants={fadeInUp}>
        <Link href="/classes/A2/lesson1">
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              <FaPlay className="w-4 h-4" />
              Begin Level
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <span className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white">
            <FaArrowUp className="w-4 h-4" />
          </span>
          Building on Your Foundation
        </h2>

        <div className="space-y-3 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            At A2 level, you will <strong className="text-blue-700">build on your foundation</strong>.
            You&apos;re no longer starting from scratch — you&apos;re expanding what you know.
          </p>
          <p>
            You&apos;ll become more comfortable forming longer sentences, expressing opinions,
            and handling real-world situations in French.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Skill Cards
function SkillCards() {
  const skills = [
    { icon: FaHistory, label: "Talk about past", description: "Describe experiences and events", color: "from-blue-600 to-cyan-600", bgColor: "bg-blue-50" },
    { icon: FaCalendarAlt, label: "Future & conditional", description: "Express plans and possibilities", color: "from-indigo-600 to-violet-600", bgColor: "bg-indigo-50" },
    { icon: FaCommentDots, label: "Express opinions", description: "Share thoughts more clearly", color: "from-violet-600 to-purple-600", bgColor: "bg-violet-50" },
    // { icon: FaEarListen, label: "Longer conversations", description: "Understand extended dialogues", color: "from-cyan-600 to-teal-600", bgColor: "bg-cyan-50" },
    { icon: FaHandshake, label: "Real situations", description: "Handle everyday scenarios", color: "from-teal-600 to-emerald-600", bgColor: "bg-teal-50" },
    { icon: FaLightbulb, label: "Expanded vocabulary", description: "More words, more precision", color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50" },
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
        What You&apos;ll Learn
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
            className="group cursor-pointer"
          >
            <div className={`${skill.bgColor} rounded-lg p-4 border border-slate-100 hover:border-slate-200 transition-all h-full`}>
              <div className={`w-9 h-9 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center text-white mb-3 shadow-sm`}>
                <skill.icon className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1">{skill.label}</h3>
              <p className="text-xs text-slate-500">{skill.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// Lesson Roadmap
function LessonRoadmap() {
  const lessons = [
    { id: 1, title: "Past Experiences", status: "available" },
    { id: 2, title: "Future Plans", status: "locked" },
    { id: 3, title: "Opinions", status: "locked" },
    { id: 4, title: "Complex Sentences", status: "locked" },
    { id: 5, title: "Real Scenarios", status: "locked" },
    { id: 6, title: "A2 Completion", status: "locked" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4">
        Lesson Roadmap
      </h2>

      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <div className="flex flex-wrap gap-3">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                lesson.status === "available"
                  ? "bg-white text-blue-700 border border-blue-200 shadow-sm cursor-pointer hover:border-blue-300"
                  : "bg-slate-200 text-slate-400 border border-transparent"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                lesson.status === "available" ? "bg-blue-500 animate-pulse" : "bg-slate-400"
              }`} />
              {lesson.status === "locked" && <FaLock className="w-3 h-3" />}
              <span>Lesson {lesson.id}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-slate-600">
              Ready to start <span className="font-medium text-blue-700">Lesson 1</span>
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Capability Section
function CapabilitySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="bg-gradient-to-r from-slate-50 via-blue-50/50 to-indigo-50/30 rounded-xl p-5 md:p-6 border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shrink-0">
            <FaCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">
              You&apos;re Becoming Independent
            </h3>
            <div className="space-y-0.5 text-slate-600 text-sm">
              <p>You can now describe events and experiences.</p>
              <p className="text-blue-700 font-medium">Your understanding is expanding.</p>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 pb-14"
    >
      <div className="text-center">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
          Ready to Continue?
        </h2>
        <p className="text-slate-500 mb-5 text-sm">
          Each lesson strengthens your independence in French.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/classes/A2/lesson1"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all"
            >
              <FaPlay className="w-4 h-4" />
              Start Lesson 1
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <Link
            href="/classes/A1"
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            <FaBookOpen className="w-3 h-3" />
            Review A1
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

// Main Component
export default function A2LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Subtle background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-slate-200/20 to-transparent rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <WelcomeCard />
        <SkillCards />
        <LessonRoadmap />
        <CapabilitySection />
        <FinalCTASection />
      </main>
    </div>
  )
}
