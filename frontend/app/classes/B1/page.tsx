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
  FaCommentAlt,
  FaGlobe,
  FaUserFriends,
  FaBriefcase,
  FaPlane,
  FaStar,
  FaLightbulb,
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

// Progress Path: A0 → A1 → A2 → B1 → B2
function ProgressPath() {
  const levels = [
    { id: "A0", label: "A0", status: "completed", icon: FaCheck },
    { id: "A1", label: "A1", status: "completed", icon: FaCheck },
    { id: "A2", label: "A2", status: "completed", icon: FaCheck },
    { id: "B1", label: "B1", status: "current", icon: FaArrowUp },
    { id: "B2", label: "B2", status: "locked", icon: FaLock },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center items-center gap-1.5 md:gap-3 mb-8"
    >
      {levels.map((level, index) => (
        <div key={level.id} className="flex items-center gap-1.5 md:gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.12 }}
            className={`relative flex flex-col items-center ${
              level.status === "current" ? "scale-105" : ""
            }`}
          >
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-sm md:text-base shadow-sm transition-all ${
                level.status === "completed"
                  ? "bg-slate-200 text-slate-500"
                  : level.status === "current"
                    ? "bg-gradient-to-br from-blue-700 to-indigo-700 text-white shadow-blue-200 shadow-md ring-2 ring-blue-100"
                    : "bg-slate-100 text-slate-300 border border-slate-200"
              }`}
            >
              <level.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />

              {level.status === "current" && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-blue-600"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            <span
              className={`mt-1 text-xs font-medium ${
                level.status === "current"
                  ? "text-blue-700"
                  : level.status === "completed"
                    ? "text-slate-500"
                    : "text-slate-400"
              }`}
            >
              {level.label}
            </span>
          </motion.div>

          {index < levels.length - 1 && (
            <div
              className={`w-4 md:w-8 h-px rounded-full ${
                level.status === "completed"
                  ? "bg-gradient-to-r from-slate-300 to-slate-400"
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
      className="relative text-center pt-8 pb-6"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <ProgressPath />

      <motion.div variants={fadeInUp} className="mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
          <FaGraduationCap className="w-4 h-4" />
          Level B1 — Intermediate
        </span>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
      >
        <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-blue-800 bg-clip-text text-transparent">
          Welcome to B1
        </span>
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-2 leading-relaxed"
      >
        You can now communicate in{" "}
        <span className="text-blue-700 font-medium">everyday situations</span>.
      </motion.p>

      <motion.p variants={fadeInUp} className="text-slate-500 mb-8">
        Let&apos;s improve fluency, confidence, and clarity.
      </motion.p>

      <motion.div variants={fadeInUp}>
        <Link href="/classes/B1/lesson1">
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all"
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
          <span className="w-9 h-9 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-lg flex items-center justify-center text-white">
            <FaGlobe className="w-4 h-4" />
          </span>
          Real Communication Begins Here
        </h2>

        <div className="space-y-3 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            You&apos;re no longer just <strong className="text-blue-700">learning</strong> French — 
            you&apos;re now <strong className="text-blue-700">using</strong> it.
          </p>
          <p>
            At B1, you&apos;ll move from reacting to situations to{" "}
            <strong>initiating conversations</strong>. You&apos;ll handle travel, work discussions, 
            and social situations with greater ease.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Skill Cards
function SkillCards() {
  const skills = [
    { icon: FaCommentAlt, label: "Express opinions", description: "Share your thoughts clearly", color: "from-blue-700 to-blue-600", bgColor: "bg-blue-50" },
    { icon: FaUserFriends, label: "Handle conversations", description: "Real back-and-forth dialogue", color: "from-indigo-700 to-indigo-600", bgColor: "bg-indigo-50" },
    { icon: FaGlobe, label: "Describe experiences", description: "Tell stories from your life", color: "from-violet-700 to-purple-600", bgColor: "bg-violet-50" },
    { icon: FaBriefcase, label: "Work discussions", description: "Professional situations", color: "from-slate-700 to-slate-600", bgColor: "bg-slate-100" },
    { icon: FaPlane, label: "Travel confidently", description: "Navigate real scenarios", color: "from-cyan-700 to-cyan-600", bgColor: "bg-cyan-50" },
    { icon: FaStar, label: "Complex structures", description: "Hypotheses & reported speech", color: "from-teal-700 to-teal-600", bgColor: "bg-teal-50" },
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

// Real-World Scenarios
function RealWorldScenarios() {
  const scenarios = [
    { title: "Talk about your day", description: "Share what happened naturally" },
    { title: "Give your opinion", description: "Express agreement or disagreement" },
    { title: "Handle problems", description: "Navigate unexpected situations" },
    { title: "Tell stories", description: "Describe past experiences" },
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
        Real-World Skills
      </h2>

      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-all"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-md flex items-center justify-center text-white text-xs shrink-0 mt-0.5">
                <FaCheck className="w-3 h-3" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 text-sm">{scenario.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{scenario.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// Lesson Roadmap
function LessonRoadmap() {
  const lessons = [
    { id: 1, title: "Conditionals", status: "available" },
    { id: 2, title: "Reported Speech", status: "locked" },
    { id: 3, title: "Complex Structures", status: "locked" },
    { id: 4, title: "Expressing Ideas", status: "locked" },
    { id: 5, title: "Real Conversations", status: "locked" },
    { id: 6, title: "B1 Completion", status: "locked" },
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
        Training Path
      </h2>

      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <div className="flex flex-wrap gap-2">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                lesson.status === "available"
                  ? "bg-white text-blue-700 border border-blue-200 shadow-sm cursor-pointer hover:border-blue-300"
                  : "bg-slate-200 text-slate-400 border border-transparent"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                lesson.status === "available" ? "bg-blue-600 animate-pulse" : "bg-slate-400"
              }`} />
              {lesson.status === "locked" && <FaLock className="w-3 h-3" />}
              <span>{lesson.title}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-xs">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-slate-600">
              Ready: <span className="font-medium text-blue-700">Lesson 1</span>
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Confidence Section
function ConfidenceSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 rounded-xl p-5 md:p-6 border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full blur-xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-lg flex items-center justify-center text-white shadow-md shrink-0">
            <FaLightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">
              You Can Handle Real Conversations
            </h3>
            <div className="space-y-0.5 text-slate-600 text-sm">
              <p>You&apos;re becoming independent in French.</p>
              <p className="text-blue-700 font-medium">Keep building your fluency.</p>
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
          Ready to Communicate?
        </h2>
        <p className="text-slate-500 mb-5 text-sm">
          Each lesson brings you closer to real fluency.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/classes/B1/lesson1"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all"
            >
              <FaPlay className="w-4 h-4" />
              Start Lesson 1
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <Link
            href="/classes/A2"
            className="text-sm text-slate-500 hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            <FaBookOpen className="w-3 h-3" />
            Review A2
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

// Main Component
export default function B1WelcomePage() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Minimal background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <WelcomeCard />
        <SkillCards />
        <RealWorldScenarios />
        <LessonRoadmap />
        <ConfidenceSection />
        <FinalCTASection />
      </main>
    </div>
  )
}
