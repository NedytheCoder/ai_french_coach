"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  FaGraduationCap,
  FaArrowRight,
  FaClipboardCheck,
  FaHeart,
  FaStar,
  FaPlay,
  FaCheck,
  FaLock,
  FaBookOpen,
  FaVolumeUp,
  FaCalculator,
  FaComments,
  FaHeadphones,
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

// Floating decorations component
function FloatingDecorations() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Soft gradient orbs */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-emerald-200/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-200/15 rounded-full blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-amber-100/20 to-yellow-100/15 rounded-full blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-300/40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          <FaStar size={12} />
        </motion.div>
      ))}
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <motion.section
      className="relative text-center py-16 md:py-24"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Level Badge */}
      <motion.div variants={fadeInUp} className="mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200/50">
          <FaGraduationCap className="w-4 h-4" />
          Level A0 — Absolute Beginner
        </span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
      >
        <span className="bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent">
          Begin Your
        </span>
        <br />
        <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          French Journey
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeInUp}
        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed"
      >
        Welcome to the starting point of your adventure. 
        <span className="text-emerald-700 font-medium"> No prior experience needed</span> — 
        just curiosity and a willingness to start.
      </motion.p>

      {/* CTA Button */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/classes/A0/lesson1">
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              <FaPlay className="w-4 h-4 group-hover:animate-pulse" />
              Start Lesson 1
            </span>
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity"
              style={{ zIndex: -1 }}
            />
          </motion.button>
        </Link>

        <Link href="/placement-test">
          <motion.button
            className="flex items-center gap-2 px-6 py-4 text-slate-600 hover:text-emerald-700 font-medium rounded-2xl hover:bg-emerald-50/50 transition-all border border-slate-200 hover:border-emerald-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaClipboardCheck className="w-4 h-4" />
            Take Placement Test
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
      <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl p-8 md:p-10 border border-emerald-100/50 shadow-xl shadow-emerald-100/50">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100/40 to-transparent rounded-tr-3xl" />
        
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center text-white text-lg">
              👋
            </span>
            Hello, Future French Speaker
          </h2>
          
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              This course is designed for <strong className="text-emerald-700">complete beginners</strong>.
              You don't need any prior knowledge of French.
            </p>
            <p>
              We'll guide you step by step through every sound, word, and phrase. 
              Think of this as your gentle introduction to the beautiful French language.
            </p>
            <p className="text-slate-500">
              By the end of this level, you'll be ready to move into A1 with confidence 
              and a solid foundation.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Learning Skills Grid
function LearningSkillsGrid() {
  const skills = [
    { icon: FaBookOpen, label: "Alphabet & Sounds", color: "from-emerald-400 to-teal-400", bgColor: "bg-emerald-50" },
    { icon: FaVolumeUp, label: "Pronunciation", color: "from-cyan-400 to-blue-400", bgColor: "bg-cyan-50" },
    { icon: FaCalculator, label: "Numbers", color: "from-amber-400 to-orange-400", bgColor: "bg-amber-50" },
    { icon: FaComments, label: "Greetings", color: "from-purple-400 to-pink-400", bgColor: "bg-purple-50" },
    { icon: FaHeadphones, label: "Basic Listening", color: "from-rose-400 to-pink-400", bgColor: "bg-rose-50" },
  ]

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-12"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center"
      >
        What You'll Learn
        <span className="block text-lg font-normal text-slate-500 mt-2">
          Your first steps into French
        </span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group"
          >
            <div className={`${skill.bgColor} rounded-2xl p-6 border border-slate-100 hover:border-emerald-200 transition-all shadow-sm hover:shadow-lg cursor-pointer h-full`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all`}>
                <skill.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-700 text-sm md:text-base">{skill.label}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// Learning Path Preview
function LearningPathPreview() {
  const lessons = [
    { id: 1, title: "The Alphabet", status: "available", icon: "🔤" },
    { id: 2, title: "Basic Sounds", status: "locked", icon: "🎵" },
    { id: 3, title: "Numbers 1-10", status: "locked", icon: "🔢" },
    { id: 4, title: "Greetings", status: "locked", icon: "👋" },
    { id: 5, title: "Simple Words", status: "locked", icon: "💬" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12"
    >
      <div className="bg-gradient-to-br from-slate-50 to-emerald-50/20 rounded-3xl p-8 md:p-10 border border-slate-200/50">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 text-center">
          Your Learning Path
        </h2>
        <p className="text-slate-500 text-center mb-10">
          5 lessons to complete A0
        </p>

        {/* Path visualization */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-slate-200 to-slate-200 -translate-y-1/2 hidden md:block" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 relative">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
                className="flex flex-col items-center gap-3 w-full md:w-auto"
              >
                {/* Node */}
                <motion.div
                  whileHover={lesson.status === "available" ? { scale: 1.1 } : {}}
                  className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-all ${
                    lesson.status === "available"
                      ? "bg-gradient-to-br from-emerald-400 to-teal-400 text-white shadow-emerald-200 cursor-pointer"
                      : lesson.status === "completed"
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
                        : "bg-slate-100 text-slate-400 border-2 border-slate-200"
                  }`}
                >
                  {lesson.status === "completed" ? (
                    <FaCheck className="w-6 h-6" />
                  ) : lesson.status === "locked" ? (
                    <FaLock className="w-5 h-5" />
                  ) : (
                    lesson.icon
                  )}

                  {/* Pulse animation for available */}
                  {lesson.status === "available" && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-emerald-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <div className="text-center">
                  <p className={`font-medium text-sm ${lesson.status === "available" ? "text-emerald-700" : "text-slate-500"}`}>
                    Lesson {lesson.id}
                  </p>
                  <p className="text-xs text-slate-400">{lesson.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-slate-600">
              Ready to start <span className="font-medium text-emerald-700">Lesson 1</span>
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Encouragement Card
function EncouragementSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 rounded-3xl p-8 border border-amber-100/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-200/20 to-transparent rounded-full blur-2xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-400 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
            <FaHeart className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
              You've Got This! 💪
            </h3>
            <div className="space-y-1 text-slate-600">
              <p>You don't need to be perfect.</p>
              <p className="text-rose-600 font-medium">Just start — progress comes with practice.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Final CTA Section
function FinalCTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 pb-20"
    >
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
          Ready to Begin?
        </h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Your first lesson is just a click away. Let's start this adventure together.
        </p>

        <motion.div
          className="inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/classes/A0/lesson1"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-emerald-200 hover:shadow-2xl hover:shadow-emerald-200 transition-all overflow-hidden"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Content */}
            <span className="relative flex items-center gap-3">
              <FaPlay className="w-5 h-5 group-hover:animate-pulse" />
              Start Your First Lesson
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
          </Link>
        </motion.div>

        <p className="mt-6 text-sm text-slate-400">
          Or take the{" "}
          <Link href="/placement-test" className="text-emerald-600 hover:text-emerald-700 underline">
            placement test
          </Link>{" "}
          if you're unsure
        </p>
      </div>
    </motion.section>
  )
}

// Main Page Component
export default function A0LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20 overflow-hidden">
      <FloatingDecorations />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <WelcomeCard />
        <LearningSkillsGrid />
        <LearningPathPreview />
        <EncouragementSection />
        <FinalCTASection />
      </main>
    </div>
  )
}
