"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

/**
 * Level data interface
 * @property id - CEFR level identifier (A0, A1, A2, B1, B2)
 * @property title - Display title for the level
 * @property description - Description of who this level is for
 */
interface Level {
  id: string
  title: string
  description: string
}

/**
 * French CEFR levels data
 * 5 progressive levels from complete beginner to upper intermediate
 */
const levels: Level[] = [
  {
    id: "A0",
    title: "Complete beginner",
    description: "You are starting from zero or know only a few French words."
  },
  {
    id: "A1",
    title: "Beginner",
    description: "You can understand and use very simple French."
  },
  {
    id: "A2",
    title: "Elementary",
    description: "You can handle basic everyday conversations and simple sentences."
  },
  {
    id: "B1",
    title: "Intermediate",
    description: "You can understand the main point of clear French and express simple opinions."
  },
  {
    id: "B2",
    title: "Upper intermediate",
    description: "You can communicate more confidently and understand more detailed content."
  }
]

/**
 * LevelCard Component
 * Displays a single level option that users can select
 * @property level - The level data to display
 * @property isSelected - Whether this level is currently selected
 * @property onSelect - Callback when user clicks the card
 */
interface LevelCardProps {
  level: Level
  isSelected: boolean
  onSelect: () => void
}

function LevelCard({ level, isSelected, onSelect }: LevelCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
        isSelected
          ? "border-purple-500 bg-purple-50 shadow-lg shadow-purple-200 focus:ring-purple-200"
          : "border-slate-200 bg-white hover:border-purple-300 hover:shadow-md focus:ring-slate-200"
      }`}
    >
      {/* Level badge */}
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl text-xl font-bold ${
            isSelected
              ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {level.id}
        </span>
        <span
          className={`text-lg font-semibold ${
            isSelected ? "text-slate-900" : "text-slate-700"
          }`}
        >
          {level.title}
        </span>
      </div>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed ${
          isSelected ? "text-slate-700" : "text-slate-500"
        }`}
      >
        {level.description}
      </p>
    </motion.button>
  )
}

/**
 * PageHeader Component
 * Displays the headline and supporting text for the page
 */
function PageHeader() {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
        Choose your starting level
      </h1>
      <p className="text-slate-600 text-lg max-w-lg mx-auto leading-relaxed">
        Don&apos;t want to take the placement test? No problem. Pick the level
        that feels right for you, and you can start from there.
      </p>
    </div>
  )
}

/**
 * ActionBar Component
 * Displays the primary CTA and secondary navigation options
 * @property selectedLevel - Currently selected level ID or null
 * @property onContinue - Callback when user clicks continue
 */
interface ActionBarProps {
  selectedLevel: string | null
  onContinue: () => void
}

function ActionBar({ selectedLevel, onContinue }: ActionBarProps) {
  return (
    <div className="mt-10 space-y-4">
      {/* Primary CTA */}
      <button
        onClick={onContinue}
        disabled={!selectedLevel}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
          selectedLevel
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]"
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
        }`}
      >
        {selectedLevel
          ? `Continue with ${selectedLevel}`
          : "Select a level to continue"}
      </button>

      {/* Secondary option - placement test */}
      <div className="text-center">
        <Link
          href="reception/tests/read_test_level"
          className="text-slate-500 hover:text-purple-600 font-medium transition-colors inline-flex items-center gap-1"
        >
          <span>Take placement test instead</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Helper text */}
      <p className="text-center text-slate-400 text-sm">
        You can always change your level later.
      </p>
    </div>
  )
}

/**
 * LevelSelectionPage Component
 * Main page for manual level selection
 * Allows users to pick their starting French level without taking a placement test
 */
export default function LevelSelectionPage() {
  // Track the currently selected level
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  /**
   * Handle level selection
   * @param levelId - The ID of the selected level
   */
  const handleSelectLevel = (levelId: string) => {
    setSelectedLevel(levelId)
  }

  /**
   * Handle continue button click
   * Navigate to onboarding with selected level
   */
  const handleContinue = () => {
    if (selectedLevel) {
      // Navigate to onboarding or course with selected level
      // Using window.location for simplicity, can be replaced with router.push
      window.location.href = `/onboarding?level=${selectedLevel}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl">
        {/* Page header */}
        <PageHeader />

        {/* Level selection grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-4"
        >
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <LevelCard
                level={level}
                isSelected={selectedLevel === level.id}
                onSelect={() => handleSelectLevel(level.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Action bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ActionBar
            selectedLevel={selectedLevel}
            onContinue={handleContinue}
          />
        </motion.div>
      </div>
    </div>
  )
}
