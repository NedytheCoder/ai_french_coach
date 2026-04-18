"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

import { CiCircleCheck } from "react-icons/ci";
import { 
  FaArrowRight, FaBookOpen, FaCheckCircle, FaGithub, FaHeadphones, 
  FaInstagram, FaLinkedin, FaMicrophone, FaPen, FaPlayCircle, FaStar, 
  FaTwitter, FaFire, FaTrophy, FaGem, FaMedal, FaBolt, FaRocket,
  FaGraduationCap, FaLock, FaUnlock, FaHeart
} from "react-icons/fa";

// Animated counter hook
function useAnimatedCounter(target: number, duration: number = 2) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())
  
  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: "easeOut"
    })
    return controls.stop
  }, [target, duration, count])
  
  return rounded
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Learning Path Node Component
function PathNode({ 
  level, 
  label, 
  status, 
  index 
}: { 
  level: string; 
  label: string; 
  status: "completed" | "current" | "locked"; 
  index: number;
}) {
  const icons = {
    completed: FaCheckCircle,
    current: FaRocket,
    locked: FaLock,
  }
  const Icon = icons[status]
  
  const colors = {
    completed: "from-emerald-400 to-emerald-500",
    current: "from-purple-500 to-blue-500",
    locked: "from-slate-300 to-slate-400",
  }

  return (
    <motion.div
      className="flex flex-col items-center relative py-2 px-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <motion.div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[status]} flex items-center justify-center shadow-lg ${
          status === "current" ? "shadow-purple-500/30" : ""
        }`}
        whileHover={{ scale: 1.1, rotate: status === "current" ? 5 : 0 }}
        animate={status === "current" ? {
          boxShadow: [
            "0 10px 15px -3px rgba(139,92,246,0.3)",
            "0 0 30px rgba(139,92,246,0.5)",
            "0 10px 15px -3px rgba(139,92,246,0.3)",
          ],
        } : {}}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
      >
        <Icon className={`w-7 h-7 ${status === "locked" ? "text-slate-500" : "text-white"}`} />
      </motion.div>
      <div className="mt-3 text-center">
        <p className={`text-sm font-bold ${status === "current" ? "text-purple-600" : "text-slate-700"}`}>
          {level}
        </p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
      {status === "current" && (
        <motion.div
          className="absolute top-0 right-0 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.5 }}
        >
          <FaStar className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.div>
  )
}

// Gamified Feature Card
function GamifiedFeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  xpReward,
  index 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  color: string; 
  xpReward: number;
  index: number;
}) {
  const colorClasses: Record<string, { bg: string; icon: string; shadow: string }> = {
    purple: { bg: "from-purple-100 to-purple-50", icon: "text-purple-600", shadow: "shadow-purple-500/10" },
    blue: { bg: "from-blue-100 to-blue-50", icon: "text-blue-600", shadow: "shadow-blue-500/10" },
    cyan: { bg: "from-cyan-100 to-cyan-50", icon: "text-cyan-600", shadow: "shadow-cyan-500/10" },
    emerald: { bg: "from-emerald-100 to-emerald-50", icon: "text-emerald-600", shadow: "shadow-emerald-500/10" },
  }
  const colors = colorClasses[color]

  return (
    <motion.div
      className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl ${colors.shadow} transition-all duration-300 cursor-pointer`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div 
          className={`w-14 h-14 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center`}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Icon className={`w-7 h-7 ${colors.icon}`} />
        </motion.div>
        <motion.div 
          className="flex items-center gap-1 px-2 py-1 bg-amber-100 rounded-full"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
        >
          <FaBolt className="w-3 h-3 text-amber-600" />
          <span className="text-xs font-bold text-amber-700">+{xpReward} XP</span>
        </motion.div>
      </div>
      <h3 className="font-bold text-xl text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      
      <motion.div 
        className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-purple-600 transition-colors"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 + index * 0.1 }}
      >
        <span>Unlock Skill</span>
        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.div>
    </motion.div>
  )
}

// Live Stats Counter
function LiveStats() {
  const lessonsCount = useAnimatedCounter(12547, 2.5)
  const streakCount = useAnimatedCounter(3421, 2.5)
  const xpCount = useAnimatedCounter(892034, 2.5)

  return (
    <motion.div 
      className="grid grid-cols-3 gap-6 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {[
        { icon: FaBookOpen, value: lessonsCount, label: "Lessons Completed", color: "text-purple-600" },
        { icon: FaFire, value: streakCount, label: "Active Streaks", color: "text-orange-600" },
        { icon: FaStar, value: xpCount, label: "XP Earned Today", color: "text-amber-600" },
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.8)" }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          >
            <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
          </motion.div>
          <motion.p className="text-3xl font-bold text-slate-800">
            {stat.value}
          </motion.p>
          <p className="text-xs text-slate-600 font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Animated CTA Button
function AnimatedCTA({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const isPrimary = variant === "primary"
  
  return (
    <Link href={href}>
      <motion.div
        className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg overflow-hidden ${
          isPrimary 
            ? "bg-white text-purple-600 shadow-xl" 
            : "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {isPrimary && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowRight className="w-5 h-5" />
          </motion.div>
        </span>
      </motion.div>
    </Link>
  )
}

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const learningPath = [
    { level: "A0", label: "Beginner", status: "current" as const },
    { level: "A1", label: "Elementary", status: "locked" as const },
    { level: "A2", label: "Pre-Intermediate", status: "locked" as const },
    { level: "B1", label: "Intermediate", status: "locked" as const },
    { level: "B2", label: "Upper-Int", status: "locked" as const },
    { level: "C1", label: "Advanced", status: "locked" as const },
    { level: "C2", label: "Mastery", status: "locked" as const },
  ]

  const gamifiedFeatures = [
    { icon: FaMicrophone, title: "Speaking XP", description: "Practice conversations with AI and earn XP for every correct pronunciation", color: "purple", xpReward: 50 },
    { icon: FaHeadphones, title: "Listening Quests", description: "Train your ears with audio challenges and unlock listening achievements", color: "blue", xpReward: 40 },
    { icon: FaBookOpen, title: "Reading Rewards", description: "Read interactive stories, click words for help, collect vocabulary gems", color: "cyan", xpReward: 35 },
    { icon: FaPen, title: "Writing Badges", description: "Get instant corrections, learn from mistakes, earn perfect writing medals", color: "emerald", xpReward: 45 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 font-sans overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-white font-bold text-sm">F</span>
              </motion.div>
              <span className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                FrenchCoach
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <motion.button 
                onClick={() => scrollToSection("journey")} 
                className="text-slate-600 hover:text-purple-600 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Your Journey
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection("features")} 
                className="text-slate-600 hover:text-purple-600 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Skills
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection("how-it-works")} 
                className="text-slate-600 hover:text-purple-600 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                How to Play
              </motion.button>
              <Link 
                href="/dashboard" 
                className="group px-5 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105 flex items-center gap-2"
              >
                <FaRocket className="w-4 h-4 group-hover:animate-bounce" />
                Start Journey
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Game Style */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <FloatingParticles />
        
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1], 
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1], 
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-200/10 to-blue-200/10 rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaTrophy className="w-4 h-4 text-amber-600" />
                </motion.div>
                <span className="text-sm font-bold text-amber-800">Join 10,000+ learners leveling up!</span>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              >
                Begin Your{" "}
                <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  French
                </span>{" "}
                Adventure
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
              >
                Level up your language skills through AI-powered quests. Earn XP, unlock badges, and master French one achievement at a time.
              </motion.p>

              {/* XP Preview */}
              <motion.div
                className="flex items-center gap-4 mb-8 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-xl">
                  <FaStar className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-700">+500 XP</span>
                  <span className="text-sm text-purple-600">first lesson bonus</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-xl">
                  <FaFire className="w-5 h-5 text-amber-600" />
                  <span className="font-bold text-amber-700">7-Day</span>
                  <span className="text-sm text-amber-600">streak reward</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
              >
                <Link 
                  href="/dashboard"
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-bold text-base overflow-hidden shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <FaRocket className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
                  <span className="relative z-10">Start Your Journey</span>
                </Link>
                <motion.button 
                  onClick={() => scrollToSection("how-it-works")}
                  className="group px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-full font-semibold text-base hover:bg-white hover:border-purple-300 hover:text-purple-600 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPlayCircle className="w-5 h-5" />
                  See How It Works
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
              >
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <CiCircleCheck className="w-3 h-3 text-green-600" />
                  </div>
                  <span>Free forever</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <CiCircleCheck className="w-3 h-3 text-green-600" />
                  </div>
                  <span>No credit card</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <CiCircleCheck className="w-3 h-3 text-green-600" />
                  </div>
                  <span>Cancel anytime</span>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Hero Visual - Chat Preview */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
            >
              <div className="relative bg-gradient-to-br from-purple-100/50 to-blue-100/30 rounded-3xl p-8 backdrop-blur-sm border border-white/50 shadow-2xl shadow-purple-500/10">
                {/* Floating XP Badge */}
                <motion.div
                  className="absolute -top-4 -left-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-3 shadow-lg z-20"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <FaStar className="w-5 h-5 text-white" />
                    <span className="text-white font-bold">+25 XP</span>
                  </div>
                </motion.div>

                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">French Coach</p>
                      <p className="text-xs text-slate-500">Your Learning Partner</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-700 font-medium">Online</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <motion.div 
                      className="bg-slate-100 rounded-2xl rounded-tl-none p-3 max-w-[80%]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <p className="text-sm text-slate-700">Bonjour! Ready for today&apos;s quest? 🎯</p>
                    </motion.div>
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl rounded-tr-none p-3 max-w-[80%] ml-auto"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <p className="text-sm text-white">Oui! I&apos;m ready to level up!</p>
                    </motion.div>
                    <motion.div 
                      className="bg-slate-100 rounded-2xl rounded-tl-none p-3 max-w-[85%]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 }}
                    >
                      <p className="text-sm text-slate-700">Parfait! Let&apos;s practice greetings. You&apos;ll earn 25 XP! ✨</p>
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-2 pt-4">
                    <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm text-slate-400">
                      Type your answer...
                    </div>
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaMicrophone className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Achievement Popup */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-amber-100"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 2, type: "spring", stiffness: 200 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center">
                      <FaMedal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Achievement Unlocked!</p>
                      <p className="font-bold text-slate-800 text-sm">First Conversation</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Path Visualization */}
      <section id="journey" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50/20 to-blue-50/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaGraduationCap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">Your Learning Path</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Journey from A0 to C2
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Complete quests, earn XP, and unlock new levels on your path to French mastery
            </p>
          </motion.div>

          <div className="relative overflow-x-hidden max-w-full">
            {/* Connecting Line */}
            <div className="absolute top-8 left-[14%] right-[14%] h-1 bg-slate-200 rounded-full hidden lg:block">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-400 via-purple-500 to-slate-300 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "15%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
              />
            </div>

            {/* Path Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 lg:gap-4 py-2 overflow-hidden">
              {learningPath.map((node, index) => (
                <PathNode 
                  key={node.level} 
                  level={node.level} 
                  label={node.label} 
                  status={node.status}
                  index={index}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="mt-12 p-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl text-white text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-lg font-semibold mb-2">🎯 You&apos;re at Level A0 - Beginner</p>
            <p className="text-white/80">Complete your first lesson to unlock A1 and earn the &quot;First Steps&quot; badge!</p>
          </motion.div>
        </div>
      </section>

      {/* Gamified Features Section */}
      <section id="features" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FaGem className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">Unlock Skills & Earn XP</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Master 4 Language Skills
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Complete quests in each skill area to earn XP and unlock powerful abilities
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamifiedFeatures.map((feature, index) => (
              <GamifiedFeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                xpReward={feature.xpReward}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Game Steps */}
      <section id="how-it-works" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              How to Play
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Your quest for French fluency starts here
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "1", 
                title: "Create Hero", 
                desc: "Set up your profile and choose your learning goals",
                icon: FaRocket,
                color: "from-purple-500 to-purple-600",
                reward: "+100 XP"
              },
              { 
                step: "2", 
                title: "Assessment Quest", 
                desc: "Complete the placement test to determine your starting level",
                icon: FaGraduationCap,
                color: "from-blue-500 to-blue-600",
                reward: "+50 XP"
              },
              { 
                step: "3", 
                title: "Daily Missions", 
                desc: "Practice with AI-guided lessons tailored to your level",
                icon: FaFire,
                color: "from-cyan-500 to-cyan-600",
                reward: "+25 XP/lesson"
              },
              { 
                step: "4", 
                title: "Level Up!", 
                desc: "Track progress, earn badges, and unlock new content",
                icon: FaTrophy,
                color: "from-emerald-500 to-emerald-600",
                reward: "Epic Rewards"
              },
            ].map((item, index) => (
              <motion.div 
                key={item.step}
                className="relative group"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-purple-300 transition-all h-full hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <item.icon className="w-7 h-7" />
                    </motion.div>
                    <div className="px-3 py-1 bg-amber-100 rounded-full">
                      <span className="text-xs font-bold text-amber-700">{item.reward}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <span className="font-bold text-slate-600">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring" }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-green-700">Live Activity</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Join Learners Leveling Up Right Now
            </h2>
            <p className="text-slate-600">See what our community is achieving today</p>
          </motion.div>

          <LiveStats />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Hero Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how learners are achieving French fluency
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: "Sarah", 
                initials: "SM", 
                color: "from-purple-400 to-purple-500",
                level: "Level A2",
                xp: "3,240 XP",
                quote: "I went from complete beginner to having conversations in 3 months. The gamification keeps me hooked!",
                badge: "7-Day Streak"
              },
              { 
                name: "James", 
                initials: "JC", 
                color: "from-blue-400 to-blue-500",
                level: "Level B1",
                xp: "8,520 XP",
                quote: "The daily quests fit perfectly into my busy schedule. I've never been so consistent with learning!",
                badge: "Quiz Master"
              },
              { 
                name: "Emma", 
                initials: "ER", 
                color: "from-cyan-400 to-cyan-500",
                level: "Level A1",
                xp: "1,890 XP",
                quote: "Finally, an app that makes pronunciation fun! The AI feedback is like having a personal tutor.",
                badge: "Fast Learner"
              },
            ].map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <FaStar className="w-4 h-4 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                      <p className="text-slate-500 text-xs">{testimonial.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-purple-600">{testimonial.xp}</p>
                    <p className="text-xs text-amber-600">{testimonial.badge}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white shadow-2xl shadow-purple-500/25 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.5, 1], x: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
              />
            </div>

            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                <FaHeart className="w-4 h-4 text-pink-200" />
                <span className="text-sm font-bold">Loved by 10,000+ learners</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Ready to Level Up Your French?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of heroes on their journey to French mastery. Your first quest awaits!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <AnimatedCTA href="/dashboard" variant="primary">
                  Begin Your Adventure
                </AnimatedCTA>
              </div>

              <motion.div 
                className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="w-4 h-4" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="w-4 h-4" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="w-4 h-4" />
                  <span>Cancel anytime</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-semibold">FrenchCoach</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Gamified AI-powered French learning. Level up your language skills one quest at a time.
              </p>
              <div className="flex gap-4">
                {[FaInstagram, FaTwitter, FaLinkedin, FaGithub].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quests</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Start Learning</Link></li>
                <li><button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors">Skills</button></li>
                <li><button onClick={() => scrollToSection("journey")} className="hover:text-white transition-colors">Learning Path</button></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Achievements</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Guild</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">About</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Blog</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Contact</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rules</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>&copy; 2026 FrenchCoach. All rights reserved. Keep leveling up! 🚀</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
