"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  FaGraduationCap,
  FaArrowRight,
  FaBookOpen,
  FaClipboardCheck,
  FaStar,
  FaArrowUp,
  FaCheck,
  FaLock,
  FaPlay,
  FaComments,
  FaPen,
  FaClock,
  FaTag,
  FaList,
  FaUndo,
  FaHourglass,
} from "react-icons/fa"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Progress Path Component
function ProgressPath() {
  const levels = [
    { id: "A0", label: "A0", status: "completed", icon: FaCheck },
    { id: "A1", label: "A1", status: "current", icon: FaArrowUp },
    { id: "A2", label: "A2", status: "locked", icon: FaLock },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex justify-center items-center gap-4 md:gap-8 mb-8"
    >
      {levels.map((level, index) => (
        <div key={level.id} className="flex items-center gap-4 md:gap-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`relative flex flex-col items-center ${
              level.status === "current" ? "scale-110" : ""
            }`}
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-lg md:text-xl shadow-lg transition-all ${
                level.status === "completed"
                  ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
                  : level.status === "current"
                    ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-blue-200 shadow-xl ring-4 ring-blue-100"
                    : "bg-slate-100 text-slate-400 border-2 border-slate-200"
              }`}
            >
              <level.icon className="w-5 h-5 md:w-6 md:h-6" />

              {/* Pulse effect for current */}
              {level.status === "current" && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-blue-400"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            <span
              className={`mt-2 text-sm font-semibold ${
                level.status === "current"
                  ? "text-blue-600"
                  : level.status === "completed"
                    ? "text-emerald-600"
                    : "text-slate-400"
              }`}
            >
              {level.label}
            </span>
          </motion.div>

          {/* Connector line */}
          {index < levels.length - 1 && (
            <div
              className={`w-8 md:w-16 h-1 rounded-full ${
                level.status === "completed"
                  ? "bg-gradient-to-r from-emerald-400 to-blue-400"
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
      className="relative text-center pt-12 pb-8"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Progress Path */}
      <ProgressPath />

      {/* Level Badge */}
      <motion.div variants={fadeInUp} className="mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200/50">
          <FaGraduationCap className="w-4 h-4" />
          Level A1 — Beginner Foundation
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
      >
        <span className="bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
          Welcome to A1
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeInUp}
        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-3 leading-relaxed"
      >
        You&apos;re starting to build <span className="text-blue-700 font-medium">real sentences</span> and{" "}
        <span className="text-blue-700 font-medium">communicate</span>.
      </motion.p>

      {/* Supporting line */}
      <motion.p
        variants={fadeInUp}
        className="text-slate-500 mb-8"
      >
        Let&apos;s take your French to the next level.
      </motion.p>

      {/* CTA */}
      <motion.div variants={fadeInUp}>
        <Link href="/classes/A1/lesson1">
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              <FaPlay className="w-4 h-4 group-hover:animate-pulse" />
              Begin Level
            </span>
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity"
              style={{ zIndex: -1 }}
            />
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
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-8 md:p-10 border border-blue-100/50 shadow-lg shadow-blue-100/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-tr-2xl" />

        <div className="relative">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-lg">
              <FaComments className="w-5 h-5" />
            </span>
            Building Real Communication
          </h2>

          <div className="space-y-3 text-slate-600 leading-relaxed">
            <p>
              In this level, you will <strong className="text-blue-700">begin to communicate in French</strong>.
              You&apos;ll move beyond individual words and start forming complete thoughts.
            </p>
            <p>
              You&apos;ll learn grammar, vocabulary, and sentence structure — the building blocks
              that make French start to make sense.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Skill Cards
function SkillCards() {
  const skills = [
    { icon: FaComments, label: "Build simple sentences", description: "Create your own phrases", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50" },
    { icon: FaPen, label: "Use common verbs", description: "Être, avoir, faire, aller", color: "from-indigo-500 to-purple-500", bgColor: "bg-indigo-50" },
    { icon: FaClock, label: "Basic past tense", description: "Passé composé basics", color: "from-violet-500 to-purple-500", bgColor: "bg-violet-50" },
    { icon: FaTag, label: "Prepositions", description: "À, de, dans, sur...", color: "from-cyan-500 to-blue-500", bgColor: "bg-cyan-50" },
    { icon: FaList, label: "Negation", description: "Say what you don't do", color: "from-teal-500 to-emerald-500", bgColor: "bg-teal-50" },
    { icon: FaUndo, label: "Sentence structure", description: "Subject + verb + object", color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50" },
  ]

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-10"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-xl md:text-2xl font-bold text-slate-800 mb-6"
      >
        What You&apos;ll Learn
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group"
          >
            <div className={`${skill.bgColor} rounded-xl p-5 border border-slate-100 hover:border-blue-200 transition-all shadow-sm hover:shadow-md cursor-pointer h-full`}>
              <div className={`w-10 h-10 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center text-white mb-3 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all`}>
                <skill.icon className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-800 text-base mb-1">{skill.label}</h3>
              <p className="text-sm text-slate-500">{skill.description}</p>
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
    { id: 1, title: "Pronouns & Articles", status: "available", icon: "👤" },
    { id: 2, title: "Common Verbs", status: "locked", icon: "✍️" },
    { id: 3, title: "Sentence Structure", status: "locked", icon: "🏗️" },
    { id: 4, title: "Prepositions", status: "locked", icon: "📍" },
    { id: 5, title: "Adjectives", status: "locked", icon: "🎨" },
    { id: 6, title: "Past Tense Basics", status: "locked", icon: "⏰" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10"
    >
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
        Lesson Roadmap
      </h2>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                whileHover={lesson.status === "available" ? { scale: 1.1 } : {}}
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl shadow-md transition-all ${
                  lesson.status === "available"
                    ? "bg-gradient-to-br from-blue-400 to-indigo-400 text-white shadow-blue-200 cursor-pointer ring-2 ring-blue-100"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {lesson.status === "locked" ? (
                  <FaLock className="w-4 h-4" />
                ) : (
                  lesson.icon
                )}
              </motion.div>
              <div className="text-center">
                <p className={`text-xs font-medium ${lesson.status === "available" ? "text-blue-600" : "text-slate-400"}`}>
                  Lesson {lesson.id}
                </p>
                <p className="text-xs text-slate-500 leading-tight">{lesson.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-blue-200 shadow-sm">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm text-slate-600">
              Ready to start <span className="font-medium text-blue-600">Lesson 1</span>
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
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-blue-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-full blur-xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
            <FaStar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
              You&apos;re Making Progress
            </h3>
            <div className="space-y-1 text-slate-600 text-sm">
              <p>You already know the basics from A0.</p>
              <p className="text-blue-700 font-medium">Now you&apos;ll start speaking more naturally.</p>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10 pb-16"
    >
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
          Ready to Continue?
        </h2>
        <p className="text-slate-500 mb-6 max-w-md mx-auto text-sm">
          Every lesson brings you closer to confident communication.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/classes/A1/lesson1"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all"
            >
              <FaPlay className="w-4 h-4 group-hover:animate-pulse" />
              Start Lesson 1
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <Link
            href="/classes/A0"
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            <FaBookOpen className="w-3 h-3" />
            Review A0 basics
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

// Main Component
export default function A1LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/10 to-indigo-50/10 overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-gradient-to-br from-indigo-200/15 to-purple-200/10 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <WelcomeCard />
        <SkillCards />
        <LessonRoadmap />
        <ConfidenceSection />
        <FinalCTASection />
      </main>
    </div>
  )
}
