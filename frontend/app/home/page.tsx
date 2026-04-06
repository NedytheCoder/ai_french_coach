"use client"

import { motion } from "framer-motion"
import Link from "next/link"

import { CiCircleCheck } from "react-icons/ci";
import { FaArrowRight, FaBookOpen, FaCheckCircle, FaGithub, FaHeadphones, FaInstagram, FaLinkedin, FaMicrophone, FaPen, FaPlayCircle, FaStar, FaTwitter } from "react-icons/fa";

export default function LandingPage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }

  const fadeInLeft = {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }

  const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }

  const staggerContainer = {
    initial: {},
    whileInView: {},
    viewport: { once: true, amount: 0.2 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                FrenchCoach
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("features")} className="text-slate-600 hover:text-purple-600 transition-colors text-sm font-medium">
                Features
              </button>
              <button onClick={() => scrollToSection("how-it-works")} className="text-slate-600 hover:text-purple-600 transition-colors text-sm font-medium">
                How It Works
              </button>
              <button onClick={() => scrollToSection("testimonials")} className="text-slate-600 hover:text-purple-600 transition-colors text-sm font-medium">
                Reviews
              </button>
              <Link 
                href="/conversation" 
                className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.h1 
                className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              >
                Become Fluent in{" "}
                <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  French
                </span>{" "}
                with AI
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
              >
                Master speaking, listening, reading, and writing — even as a complete beginner. Your personal AI tutor is ready 24/7.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
              >
                <Link 
                  href="/conversation"
                  className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold text-base hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Start Learning Free
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={() => scrollToSection("how-it-works")}
                  className="group px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-full font-semibold text-base hover:bg-white hover:border-purple-300 hover:text-purple-600 transition-all flex items-center justify-center gap-2"
                >
                  <FaPlayCircle className="w-5 h-5" />
                  See How It Works
                </button>
              </motion.div>
              <motion.div 
                className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <CiCircleCheck className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CiCircleCheck className="w-4 h-4 text-green-500" />
                  <span>Free forever plan</span>
                </div>
              </motion.div>
            </div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
            >
              <div className="relative bg-gradient-to-br from-purple-100/50 to-blue-100/30 rounded-3xl p-8 backdrop-blur-sm border border-white/50 shadow-2xl shadow-purple-500/10">
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">French Coach</p>
                      <p className="text-xs text-slate-500">Online</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm text-slate-700">Bonjour! Comment ça va aujourd&apos;hui?</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl rounded-tr-none p-3 max-w-[80%] ml-auto">
                      <p className="text-sm text-white">Ça va bien, merci! Et toi?</p>
                    </div>
                    <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                      <p className="text-sm text-slate-700">Très bien! Your French is improving. Let&apos;s practice more...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-4">
                    <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm text-slate-400">
                      Type your message...
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <FaMicrophone className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CiCircleCheck className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">Corrected!</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Master All 4 Language Skills
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you develop complete fluency through personalized practice
            </p>
          </motion.div>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
          >
            <motion.div 
              className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-purple-500/10 hover:scale-105 transition-all"
              variants={fadeInUp}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FaMicrophone className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-2">Speaking</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Practice real conversations with AI. Get instant feedback on pronunciation and grammar.
              </p>
            </motion.div>
            <motion.div 
              className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105 transition-all"
              variants={fadeInUp}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FaHeadphones className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-2">Listening</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Train your ears with real-life audio. From casual chats to news broadcasts.
              </p>
            </motion.div>
            <motion.div 
              className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:scale-105 transition-all"
              variants={fadeInUp}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FaBookOpen className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-2">Reading</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Interactive texts with smart assistance. Click any word for instant translation.
              </p>
            </motion.div>
            <motion.div 
              className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-500/10 hover:scale-105 transition-all"
              variants={fadeInUp}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FaPen className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-2">Writing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get instant corrections and suggestions. Learn from your mistakes in real-time.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Your journey to French fluency in four simple steps
            </p>
          </motion.div>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div 
              className="relative"
              variants={fadeInLeft}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-purple-300 transition-colors h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Sign Up</h3>
                <p className="text-slate-600 text-sm">
                  Create your free account in seconds. No credit card required.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeInLeft}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-blue-300 transition-colors h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Level Assessment</h3>
                <p className="text-slate-600 text-sm">
                  Take a quick 5-minute assessment to determine your starting level.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeInLeft}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-cyan-300 transition-colors h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Daily Practice</h3>
                <p className="text-slate-600 text-sm">
                  Practice with AI guidance tailored to your level and goals.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={fadeInLeft}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-emerald-300 transition-colors h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Track Progress</h3>
                <p className="text-slate-600 text-sm">
                  Monitor your improvement with detailed analytics and insights.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.h2 
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Why Choose FrenchCoach?
              </motion.h2>
              <motion.p 
                className="text-lg text-slate-600 mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              >
                We&apos;ve designed the perfect learning experience for beginners who want real results.
              </motion.p>
              <motion.div 
                className="space-y-6"
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.15 }}
              >
                <motion.div 
                  className="flex items-start gap-4"
                  variants={fadeInRight}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center shrink-0">
                    <FaCheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Personalized Learning Paths</h4>
                    <p className="text-slate-600 text-sm">AI adapts to your pace, interests, and goals for maximum efficiency.</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-4"
                  variants={fadeInRight}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shrink-0">
                    <FaCheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Instant AI Feedback</h4>
                    <p className="text-slate-600 text-sm">Get corrections and suggestions in real-time as you practice.</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-4"
                  variants={fadeInRight}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center shrink-0">
                    <FaCheckCircle className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Learn at Your Own Pace</h4>
                    <p className="text-slate-600 text-sm">No pressure, no schedules. Practice whenever works best for you.</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-4"
                  variants={fadeInRight}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center shrink-0">
                    <FaCheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Designed for Beginners</h4>
                    <p className="text-slate-600 text-sm">Start from zero with gentle guidance that builds your confidence.</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="bg-gradient-to-br from-purple-100/50 to-blue-100/30 rounded-3xl p-8 backdrop-blur-sm border border-white/50">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold text-slate-800">Your Progress</h4>
                    <span className="text-sm text-purple-600 font-medium">Level A2</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Speaking</span>
                        <span className="text-slate-800 font-medium">68%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[68%] bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Listening</span>
                        <span className="text-slate-800 font-medium">75%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[75%] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Reading</span>
                        <span className="text-slate-800 font-medium">82%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[82%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Writing</span>
                        <span className="text-slate-800 font-medium">71%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[71%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500">Current Streak</p>
                        <p className="text-xl font-bold text-slate-800">12 days</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Loved by Learners
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of students who are already speaking French with confidence
            </p>
          </motion.div>
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                &quot;I went from knowing nothing to having basic conversations in just 3 months. The AI feedback is incredibly helpful!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Sarah Mitchell</p>
                  <p className="text-slate-500 text-xs">Started 3 months ago</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                &quot;The daily practice keeps me motivated. I love how it adapts to my schedule and learning style.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">JC</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">James Chen</p>
                  <p className="text-slate-500 text-xs">Busy professional</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-shadow"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                &quot;Finally, an app that actually teaches you to speak! The pronunciation feedback is a game-changer.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">ER</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Emma Rodriguez</p>
                  <p className="text-slate-500 text-xs">Travel enthusiast</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white shadow-2xl shadow-purple-500/25"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Start Your French Journey Today
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already speaking French with confidence. Your first lesson is free!
            </p>
            <Link 
              href="/conversation"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Get Started Free
              <FaArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-6 text-sm text-white/80">
              No credit card required • Free forever plan available
            </p>
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
                AI-powered French learning for beginners who want to become fluent.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors">
                  <FaGithub className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/conversation" className="hover:text-white transition-colors">Start Learning</Link></li>
                <li><button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection("how-it-works")} className="hover:text-white transition-colors">How It Works</button></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Pricing</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">About</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Blog</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Contact</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>&copy; 2026 FrenchCoach. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}0