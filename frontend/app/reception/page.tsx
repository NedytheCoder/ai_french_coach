/**
 * Reception Page - Gamified Onboarding Experience
 * ================================================
 *
 * Transformed into a "Choose Your Path" game-style decision screen.
 * Users feel like they're starting a journey and selecting their adventure.
 *
 * **Page Structure:**
 * 1. AnimatedHero - Game-style intro with floating elements
 * 2. PathSelection - Two main interactive cards (Test vs Manual)
 * 3. LevelGrid (conditional) - Gamified level selection when manual chosen
 * 4. ProgressPath - Visual A0→C2 progression indicator
 * 5. ActionCTA - Enhanced gamified continue button
 *
 * **Features:**
 * - Animated backgrounds and floating decorations
 * - Gamified path selection cards with hover effects
 * - Level nodes styled like game stages
 * - Visual progression path connecting levels
 * - Micro-interactions throughout
 * - All original logic preserved
 */

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FaRocket, FaMapMarkedAlt, FaBrain, FaArrowRight, FaStar,
  FaCheckCircle, FaLock, FaCompass, FaChevronRight
} from "react-icons/fa"
import { Level } from "../Types"
// API base URL - adjust based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// =============================================================================
// TYPES & DATA
// =============================================================================

type PathChoice = "test" | "manual" | null

// =============================================================================
// ANIMATED COMPONENTS
// =============================================================================

const particles = [
  { left: "57%", top: "61%", duration: 5.2, delay: 0.1 },
  { left: "33%", top: "35%", duration: 4.8, delay: 0.4 },
  { left: "6%", top: "61%", duration: 6.1, delay: 0.8 },
  { left: "56%", top: "32%", duration: 5.7, delay: 1.2 },
  { left: "63%", top: "86%", duration: 4.4, delay: 0.6 },
  { left: "89%", top: "64%", duration: 6.5, delay: 1.5 },
  { left: "88%", top: "52%", duration: 5.5, delay: 0.9 },
  { left: "73%", top: "89%", duration: 4.9, delay: 1.8 },
]

function FloatingDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: `${10 + i * 20}%`,
            top: `${15 + (i % 3) * 25}%`,
            background:
              i % 2 === 0
                ? "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.1) 100%)"
                : "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(59,130,246,0.08) 100%)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-purple-400/30 to-blue-400/30"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// =============================================================================
// HERO SECTION
// =============================================================================

function AnimatedHero() {
  return (
    <motion.div 
      className="text-center mb-12 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Welcome badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaCompass className="w-4 h-4 text-amber-600" />
        </motion.div>
        <span className="text-sm font-bold text-amber-700">Your Journey Begins Here</span>
      </motion.div>

      {/* Main headline */}
      <motion.h1 
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Choose Your{" "}
        <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Path
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p 
        className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Two ways to begin your French adventure. Let us guide you, or forge your own path.
      </motion.p>
    </motion.div>
  )
}

// =============================================================================
// PATH SELECTION CARDS
// =============================================================================

interface PathCardProps {
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
  ctaText: string
  isSelected: boolean
  isRecommended?: boolean
  color: "purple" | "green"
  onSelect: () => void
  delay?: number
}

function PathCard({ 
  icon: Icon, 
  title, 
  subtitle, 
  description, 
  ctaText,
  isSelected, 
  isRecommended,
  color,
  onSelect,
  delay = 0
}: PathCardProps) {
  const colors = {
    purple: {
      gradient: "from-purple-500 to-blue-500",
      bg: "from-purple-50 to-blue-50",
      border: "border-purple-200",
      borderActive: "border-purple-500",
      glow: "shadow-purple-500/20",
      icon: "text-purple-600",
    },
    green: {
      gradient: "from-emerald-500 to-cyan-500",
      bg: "from-emerald-50 to-cyan-50",
      border: "border-emerald-200",
      borderActive: "border-emerald-500",
      glow: "shadow-emerald-500/20",
      icon: "text-emerald-600",
    }
  }
  const c = colors[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="relative"
    >
      {isRecommended && (
        <motion.div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, type: "spring" }}
        >
          <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full text-white text-xs font-bold shadow-lg">
            RECOMMENDED
          </div>
        </motion.div>
      )}

      <motion.button
        onClick={onSelect}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left rounded-3xl border-2 p-8 transition-all duration-300 ${
          isSelected
            ? `bg-gradient-to-br ${c.bg} ${c.borderActive} shadow-xl ${c.glow}`
            : `bg-white ${c.border} hover:shadow-lg hover:border-opacity-70`
        }`}
      >
        {/* Icon */}
        <motion.div 
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
            isSelected ? c.gradient : "from-slate-100 to-slate-200"
          } flex items-center justify-center mb-6`}
          whileHover={{ rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Icon className={`w-8 h-8 ${isSelected ? "text-white" : c.icon}`} />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-slate-900 mb-1">{title}</h3>
        <p className={`text-sm font-semibold mb-3 ${isSelected ? "text-purple-600" : "text-slate-500"}`}>
          {subtitle}
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">{description}</p>

        {/* CTA Button */}
        <motion.div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold ${
            isSelected
              ? `bg-gradient-to-r ${c.gradient} text-white shadow-lg`
              : "bg-slate-100 text-slate-700"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{ctaText}</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

// =============================================================================
// PROGRESS PATH (A0 → C2)
// =============================================================================

function ProgressPath({ levels, selectedLevel }: { levels: Level[], selectedLevel: string | null }) {
  const levelIndex = selectedLevel ? levels.findIndex(l => l.level_code === selectedLevel) : -1

  return (
    <motion.div
      className="relative py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Path line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 rounded-full -translate-y-1/2">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: levelIndex >= 0 ? `${((levelIndex + 1) / levels.length) * 100}%` : "0%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Level nodes */}
      <div className="relative flex justify-between items-center">
        {levels.map((level, index) => {
          const isSelected = level.level_code === selectedLevel
          const isPast = levelIndex >= index
          const isFuture = levelIndex < index && levelIndex >= 0

          return (
            <motion.div
              key={level.level_code}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.08, type: "spring" }}
            >
              {/* Node */}
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold relative ${
                  isSelected
                    ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                    : isPast
                    ? "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white"
                    : "bg-white border-2 border-slate-300 text-slate-400"
                }`}
                whileHover={{ scale: 1.15 }}
                animate={isSelected ? {
                  boxShadow: [
                    "0 4px 15px -3px rgba(139,92,246,0.3)",
                    "0 0 25px rgba(139,92,246,0.5)",
                    "0 4px 15px -3px rgba(139,92,246,0.3)",
                  ],
                } : {}}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              >
                {isPast && !isSelected ? (
                  <FaCheckCircle className="w-5 h-5" />
                ) : (
                  level.level_code
                )}

                {/* Star badge for selected */}
                {isSelected && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <FaStar className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.div>

              {/* Label */}
              <motion.span
                className={`mt-2 text-xs font-semibold ${
                  isSelected ? "text-purple-600" : isPast ? "text-emerald-600" : "text-slate-400"
                }`}
                animate={isSelected ? { y: [0, -2, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isSelected ? "START" : ""}
              </motion.span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// =============================================================================
// GAMIFIED LEVEL GRID
// =============================================================================

interface LevelGridProps {
  levels: Level[]
  selectedLevel: string | null
  onSelectLevel: (levelId: string) => void
}

function LevelGrid({ levels, selectedLevel, onSelectLevel }: LevelGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden"
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
          <FaMapMarkedAlt className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-bold text-blue-700">Select Your Starting Point</span>
        </div>
        <p className="text-slate-600">Click a level to begin your journey</p>
      </motion.div>

      {/* Progress path */}
      <div className="mb-8">
        <ProgressPath levels={levels} selectedLevel={selectedLevel} />
      </div>

      {/* Level cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {levels.map((level, index) => (
          <LevelNode
            key={level.level_code}
            level={level}
            isSelected={selectedLevel === level.level_code}
            onSelect={() => onSelectLevel(level.level_code)}
            delay={0.3 + index * 0.08}
          />
        ))}
      </div>
    </motion.div>
  )
}

interface LevelNodeProps {
  level: Level
  isSelected: boolean
  onSelect: () => void
  delay: number
}

function LevelNode({ level, isSelected, onSelect, delay }: LevelNodeProps) {
  const difficultyColors = {
    Easy: "from-emerald-400 to-emerald-500",
    Medium: "from-amber-400 to-orange-500",
    Hard: "from-rose-400 to-rose-500",
  }

  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
        isSelected
          ? "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-500 shadow-xl shadow-purple-500/20"
          : "bg-white border-slate-200 hover:border-purple-300 hover:shadow-lg"
      }`}
    >
      {/* XP Badge */}
      <motion.div
        className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${
          isSelected 
            ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white" 
            : "bg-slate-100 text-slate-600"
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.1, type: "spring" }}
      >
        +{level.xp} XP
      </motion.div>

      {/* Level badge */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
        isSelected ? "from-purple-500 to-blue-500" : difficultyColors[level.difficulty]
      } flex items-center justify-center mb-3 shadow-md`}>
        <span className="text-white font-bold text-lg">{level.level_code}</span>
      </div>

      {/* Content */}
      <h4 className={`font-bold text-lg mb-1 ${isSelected ? "text-purple-700" : "text-slate-900"}`}>
        {level.title}
      </h4>
      <p className="text-sm text-slate-500 mb-3">{level.description}</p>

      {/* Difficulty indicator */}
      <div className="flex items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < (level.difficulty === "Easy" ? 1 : level.difficulty === "Medium" ? 2 : 3)
                ? isSelected ? "bg-purple-400" : "bg-slate-400"
                : "bg-slate-200"
            }`}
          />
        ))}
        <span className={`ml-2 text-xs font-medium ${
          isSelected ? "text-purple-600" : "text-slate-400"
        }`}>
          {level.difficulty}
        </span>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className="absolute bottom-3 right-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <FaCheckCircle className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.button>
  )
}

// =============================================================================
// MAIN CTA BUTTON
// =============================================================================

interface JourneyCTAProps {
  selectedPath: PathChoice
  selectedLevel: string | null
  onContinue: () => void
}

function JourneyCTA({ selectedPath, selectedLevel, onContinue }: JourneyCTAProps) {
  const isReady = selectedPath === "test" || (selectedPath === "manual" && selectedLevel)

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {isReady ? (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <motion.button
              onClick={onContinue}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/30 overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(139,92,246,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <span className="relative z-10 flex items-center gap-3">
                <FaRocket className="w-6 h-6 group-hover:animate-bounce" />
                <span>
                  {selectedPath === "test" 
                    ? "Begin Assessment" 
                    : `Start Journey from ${selectedLevel}`}
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FaChevronRight className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>

            <motion.p
              className="mt-4 text-slate-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ready to begin? Your adventure awaits!
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 rounded-full text-slate-400">
              <FaLock className="w-4 h-4" />
              <span>Select a path above to continue</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function ReceptionPage() {
  const [selectedPath, setSelectedPath] = useState<PathChoice>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [levels, setLevels] = useState<Level[]>([])

  // Fetch reception levels from database on mount
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reception/levels`)
        const data = await response.json()
        // console.log(data.message)
        // return
        if (data.levels && Array.isArray(data.levels)) {
          // console.log("Reception levels from database:", data.levels)
          setLevels(data.levels)
        } else {
          console.log("No titles found or error:", data.error)
        }
      } catch (error) {
        console.error("Failed to fetch reception levels:", error)
      }
    }

    fetchLevels()
  }, [])

  const handlePathSelect = (path: PathChoice) => {
    setSelectedPath(path)
    if (path === "test") {
      setSelectedLevel(null)
    }
  }

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId)
  }

  const handleContinue = () => {
    if (selectedPath === "test") {
      window.location.href = "/reception/tests/read_test_level"
    } else if (selectedPath === "manual" && selectedLevel) {
      window.location.href = `/onboarding?level=${selectedLevel}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 font-sans overflow-x-hidden relative">
      {/* Animated background */}
      <FloatingDecorations />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        {/* Hero */}
        <AnimatedHero />

        {/* Path Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <PathCard
            icon={FaBrain}
            title="Take Placement Test"
            subtitle="Let us find your level"
            description="Answer a few questions and we'll automatically determine the perfect starting point for your French journey."
            ctaText="Start Test"
            isSelected={selectedPath === "test"}
            isRecommended={true}
            color="purple"
            onSelect={() => handlePathSelect("test")}
            delay={0.2}
          />

          <PathCard
            icon={FaMapMarkedAlt}
            title="Choose Your Level"
            subtitle="Forge your own path"
            description="Already know your French level? Select from A0 to C2 and begin exactly where you feel comfortable."
            ctaText="Select Level"
            isSelected={selectedPath === "manual"}
            color="green"
            onSelect={() => handlePathSelect("manual")}
            delay={0.35}
          />
        </div>

        {/* Level Grid (conditional) */}
        <AnimatePresence>
          {selectedPath === "manual" && (
            <LevelGrid
              levels={levels}
              selectedLevel={selectedLevel}
              onSelectLevel={handleLevelSelect}
            />
          )}
        </AnimatePresence>

        {/* Main CTA */}
        <JourneyCTA
          selectedPath={selectedPath}
          selectedLevel={selectedLevel}
          onContinue={handleContinue}
        />

        {/* Footer note */}
        <motion.p
          className="text-center text-slate-400 text-sm mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          You can always adjust your level later from your profile settings
        </motion.p>
      </div>
    </div>
  )
}
