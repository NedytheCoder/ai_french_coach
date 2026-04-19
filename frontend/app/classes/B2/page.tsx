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
  FaCommentDots,
  FaFileAlt,
  FaLayerGroup,
  FaProjectDiagram,
  FaBalanceScale,
  FaTrophy,
  FaEye,
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

// Progress Path: A0 → A1 → A2 → B1 → B2 → C1
function ProgressPath() {
  const levels = [
    { id: "A0", label: "A0", status: "completed" },
    { id: "A1", label: "A1", status: "completed" },
    { id: "A2", label: "A2", status: "completed" },
    { id: "B1", label: "B1", status: "completed" },
    { id: "B2", label: "B2", status: "current" },
    { id: "C1", label: "C1", status: "locked" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center items-center gap-1 md:gap-2 mb-8 overflow-x-auto overflow-y-hidden px-2"
    >
      {levels.map((level, index) => (
        <div key={level.id} className="flex items-center gap-1 md:gap-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex flex-col items-center ${
              level.status === "current" ? "scale-105" : ""
            }`}
          >
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center text-xs md:text-sm transition-all ${
                level.status === "completed"
                  ? "bg-slate-200 text-slate-400"
                  : level.status === "current"
                    ? "bg-slate-800 text-white shadow-lg ring-2 ring-slate-300"
                    : "bg-slate-100 text-slate-300 border border-slate-200"
              }`}
            >
              {level.status === "completed" ? (
                <FaCheck className="w-3 h-3 md:w-3.5 md:h-3.5" />
              ) : level.status === "current" ? (
                <FaArrowUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
              ) : (
                <FaLock className="w-3 h-3 md:w-3.5 md:h-3.5" />
              )}

              {level.status === "current" && (
                <motion.div
                  className="absolute inset-0 rounded-md bg-slate-700"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            <span
              className={`mt-1 text-xs font-medium ${
                level.status === "current"
                  ? "text-slate-800"
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
              className={`w-3 md:w-6 h-px rounded-full ${
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
      className="relative text-center pt-8 pb-6"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <ProgressPath />

      <motion.div variants={fadeInUp} className="mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
          <FaGraduationCap className="w-4 h-4" />
          Level B2 — Upper Intermediate
        </span>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
      >
        <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
          Welcome to B2
        </span>
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-2 leading-relaxed"
      >
        You can communicate clearly — now refine your{" "}
        <span className="text-slate-800 font-medium">precision</span> and{" "}
        <span className="text-slate-800 font-medium">nuance</span>.
      </motion.p>

      <motion.p variants={fadeInUp} className="text-slate-500 mb-8">
        Develop control, clarity, and deeper understanding.
      </motion.p>

      <motion.div variants={fadeInUp}>
        <Link href="/classes/B2/lesson1">
          <motion.button
            className="group relative px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl shadow-lg shadow-slate-300 hover:shadow-slate-400 transition-all"
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
          <span className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-white">
            <FaEye className="w-4 h-4" />
          </span>
          Refine Your Expression
        </h2>

        <div className="space-y-3 text-slate-600 leading-relaxed text-sm md:text-base">
          <p>
            You already <strong className="text-slate-800">express yourself well</strong> in French. 
            At B2, you&apos;ll add <strong className="text-slate-800">depth and precision</strong> to that expression.
          </p>
          <p>
            You&apos;ll engage in <strong>meaningful discussions</strong> on abstract topics, understand complex texts, 
            and interact with fluency that makes regular conversation with native speakers natural.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Skill Cards
function SkillCards() {
  const skills = [
    { icon: FaCommentDots, label: "Nuanced opinions", description: "Express subtle viewpoints", color: "bg-slate-800" },
    { icon: FaFileAlt, label: "Complex texts", description: "Understand detailed content", color: "bg-slate-700" },
    { icon: FaLayerGroup, label: "Advanced grammar", description: "Use structures naturally", color: "bg-slate-600" },
    { icon: FaProjectDiagram, label: "Clear arguments", description: "Structure reasoning well", color: "bg-slate-700" },
    { icon: FaBalanceScale, label: "Tone & register", description: "Adapt to context", color: "bg-slate-600" },
    { icon: FaTrophy, label: "Fluency", description: "Speak with spontaneity", color: "bg-slate-800" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
            className="group cursor-pointer"
          >
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 hover:border-slate-300 transition-all h-full">
              <div className={`w-9 h-9 ${skill.color} rounded-lg flex items-center justify-center text-white mb-3 shadow-sm`}>
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

// Nuance & Control Section
function NuanceSection() {
  const aspects = [
    { title: "Refine your tone", description: "Match register to situation" },
    { title: "Express subtlety", description: "Convey nuanced meaning" },
    { title: "Adapt to context", description: "Choose appropriate language" },
    { title: "Control flow", description: "Structure complex ideas" },
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
        Nuance & Control
      </h2>

      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {aspects.map((aspect, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-300 transition-all"
            >
              <div className="w-5 h-5 bg-slate-700 rounded flex items-center justify-center text-white text-xs shrink-0 mt-0.5">
                <FaCheck className="w-3 h-3" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 text-sm">{aspect.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{aspect.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 text-center">
          This level is about <span className="font-medium text-slate-700">quality, not quantity</span>
        </p>
      </div>
    </motion.section>
  )
}

// Lesson Roadmap
function LessonRoadmap() {
  const lessons = [
    { id: 1, title: "Advanced Grammar", status: "available" },
    { id: 2, title: "Argumentation", status: "locked" },
    { id: 3, title: "Complex Structures", status: "locked" },
    { id: 4, title: "Discourse Flow", status: "locked" },
    { id: 5, title: "Nuance & Tone", status: "locked" },
    { id: 6, title: "B2 Mastery", status: "locked" },
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
        Curriculum
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
                  ? "bg-white text-slate-800 border border-slate-300 shadow-sm cursor-pointer hover:border-slate-400"
                  : "bg-slate-200 text-slate-400 border border-transparent"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                lesson.status === "available" ? "bg-slate-700 animate-pulse" : "bg-slate-400"
              }`} />
              {lesson.status === "locked" && <FaLock className="w-3 h-3" />}
              <span>{lesson.title}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 text-xs">
            <div className="w-1.5 h-1.5 bg-slate-700 rounded-full animate-pulse" />
            <span className="text-slate-600">
              Ready: <span className="font-medium text-slate-800">Lesson 1</span>
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Expectation Section
function ExpectationSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl p-5 md:p-6 border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-slate-200/30 to-transparent rounded-full blur-xl" />

        <div className="relative flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="w-11 h-11 bg-slate-800 rounded-lg flex items-center justify-center text-white shadow-md shrink-0">
            <FaTrophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1">
              Clarity and Precision Matter
            </h3>
            <div className="space-y-0.5 text-slate-600 text-sm">
              <p>At this level, you&apos;ll refine how you express ideas.</p>
              <p className="text-slate-800 font-medium">You&apos;re building advanced fluency.</p>
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
          Ready to Sharpen Your French?
        </h2>
        <p className="text-slate-500 mb-5 text-sm">
          Each lesson refines your control and precision.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/classes/B2/lesson1"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-slate-800 text-white font-semibold rounded-xl shadow-lg shadow-slate-300 hover:shadow-xl transition-all"
            >
              <FaPlay className="w-4 h-4" />
              Start Lesson 1
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <Link
            href="/classes/B1"
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
          >
            <FaBookOpen className="w-3 h-3" />
            Review B1
          </Link>
        </div>
      </div>
    </motion.section>
  )
}

// Main Component
export default function B2WelcomePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Very minimal background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-slate-100/50 to-transparent rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <WelcomeCard />
        <SkillCards />
        <NuanceSection />
        <LessonRoadmap />
        <ExpectationSection />
        <FinalCTASection />
      </main>
    </div>
  )
}
