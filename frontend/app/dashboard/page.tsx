"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  DashboardHero,
  ProgressCard,
  XPWidget,
  StreakWidget,
  BadgePreviewCard,
  LearningPathPreview,
  DailyGoalCard,
  QuickActionsGrid,
  ActivityCard,
  AchievementCard,
  MotivationalPanel,
  FloatingDecorations,
} from "../components/dashboard"
import { FaUser, FaCog } from "react-icons/fa"
import NotificationDropdown from "./components/NotificationDropdown"
import { Notification } from "./components/NotificationItem"

// Mock data for the dashboard
const mockUserData = {
  name: "Alex",
  currentLevel: "A0",
  lessonTitle: "Introductions & Greetings",
  dailyGoalProgress: 75,
}

const mockProgressData = {
  currentLevel: "A0",
  currentLesson: "Lesson 3: Basic Introductions",
  overallProgress: 35,
  lessonsCompleted: 7,
  totalLessons: 20,
  nextMilestone: "Complete A0 Level",
}

const mockXPData = {
  totalXP: 2840,
  xpToday: 150,
  xpToNextLevel: 160,
  rankTitle: "Explorer",
}

const mockStreakData = {
  currentStreak: 12,
  longestStreak: 18,
  streakActive: true,
  weekProgress: [true, true, true, true, true, false, false], // Mon-Sun
}

const mockBadges = [
  { id: "1", name: "First Steps", icon: "star" as const, color: "bronze" as const, unlocked: true, description: "Complete your first lesson" },
  { id: "2", name: "Week Warrior", icon: "fire" as const, color: "gold" as const, unlocked: true, description: "7-day streak" },
  { id: "3", name: "Quiz Master", icon: "star" as const, color: "silver" as const, unlocked: true, description: "Score 100% on a quiz" },
  { id: "4", name: "XP Hunter", icon: "medal" as const, color: "purple" as const, unlocked: false, description: "Earn 5000 XP" },
  { id: "5", name: "Polyglot", icon: "medal" as const, color: "gold" as const, unlocked: false, description: "Complete A1 level" },
  { id: "6", name: "Speedster", icon: "star" as const, color: "blue" as const, unlocked: false, description: "Complete a lesson in under 5 min" },
]

const mockLearningPath = {
  currentLevel: "A0 - Beginner",
  nodes: [
    { id: "1", title: "Basics", status: "completed" as const, type: "lesson" as const },
    { id: "2", title: "Greetings", status: "completed" as const, type: "lesson" as const },
    { id: "3", title: "Intro", status: "current" as const, type: "lesson" as const },
    { id: "4", title: "Quiz 1", status: "locked" as const, type: "quiz" as const },
    { id: "5", title: "A0 Complete", status: "locked" as const, type: "milestone" as const },
  ],
}

const mockDailyGoals = {
  dailyTarget: 50,
  overallProgress: 60,
  goals: [
    { id: "1", label: "Complete 2 lessons", target: 2, current: 1, icon: "lessons" as const },
    { id: "2", label: "Take 1 quiz", target: 1, current: 0, icon: "quizzes" as const },
    { id: "3", label: "Earn 50 XP", target: 50, current: 30, icon: "practice" as const },
  ],
}

const mockQuickActions = [
  { id: "1", label: "Continue Lesson", icon: "continue" as const, href: "/classes/A0/lesson3", color: "purple" as const, primary: true },
  { id: "2", label: "Review Mistakes", icon: "review" as const, href: "/review", color: "blue" as const },
  { id: "3", label: "Practice Quiz", icon: "quiz" as const, href: "/quiz", color: "green" as const },
  { id: "4", label: "Explore Levels", icon: "levels" as const, href: "/classes", color: "orange" as const },
  { id: "5", label: "Achievements", icon: "achievements" as const, href: "/achievements", color: "amber" as const },
  { id: "6", label: "Practice", icon: "practice" as const, href: "/practice", color: "pink" as const },
]

const mockActivity = {
  recentActivity: {
    id: "1",
    type: "quiz" as const,
    title: "A0 - Greetings Quiz",
    subtitle: "15/20 correct",
    timestamp: "2 hours ago",
    score: 75,
  },
  lastLesson: {
    title: "Basic Introductions",
    progress: 65,
    level: "A0",
  },
}

const mockAchievements = [
  { id: "1", title: "First Steps", description: "Complete your first lesson", icon: "star" as const, unlocked: true, unlockedAt: "2024-01-15", rarity: "common" as const },
  { id: "2", title: "Week Warrior", description: "Maintain a 7-day streak", icon: "fire" as const, unlocked: true, unlockedAt: "2024-01-20", rarity: "rare" as const },
  { id: "3", title: "Quiz Master", description: "Score 100% on any quiz", icon: "trophy" as const, unlocked: true, unlockedAt: "2024-01-22", rarity: "epic" as const },
  { id: "4", title: "Polyglot Pro", description: "Complete entire A1 level", icon: "crown" as const, unlocked: false, rarity: "legendary" as const },
  { id: "5", title: "XP Collector", description: "Earn 10,000 total XP", icon: "gem" as const, unlocked: false, rarity: "epic" as const },
]

const mockMotivationalData = {
  tip: "Practice speaking French out loud, even if you're alone. It helps build muscle memory for pronunciation!",
  quote: {
    text: "To have another language is to possess a second soul.",
    author: "Charlemagne",
  },
  recommendedTask: {
    title: "Review: Numbers 1-20",
    description: "Quick 5-minute drill to reinforce number vocabulary",
    xpReward: 25,
  },
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Lesson completed",
    description: "You completed A1 Lesson 2: Basic Greetings",
    time: "2 min ago",
    type: "lesson",
    read: false,
  },
  {
    id: 2,
    title: "Streak updated",
    description: "You're on a 3-day streak! Keep it up! 🔥",
    time: "1 hour ago",
    type: "streak",
    read: false,
  },
  {
    id: 3,
    title: "Achievement unlocked",
    description: "Week Warrior: Maintain a 7-day streak",
    time: "Yesterday",
    type: "achievement",
    read: true,
  },
  {
    id: 4,
    title: "XP Boost earned",
    description: "You earned 150 XP today!",
    time: "2 days ago",
    type: "xp",
    read: true,
  },
]

export default function DashboardPage() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read when clicked
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    )
    setIsNotificationOpen(false)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 font-sans overflow-x-hidden">
      <FloatingDecorations />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                FrenchCoach
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <NotificationDropdown
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                onToggle={() => setIsNotificationOpen(!isNotificationOpen)}
                notifications={notifications}
                onMarkAllRead={handleMarkAllRead}
                onNotificationClick={handleNotificationClick}
              />
              <Link href="/dashboard/settings">
                <motion.button
                  className="p-2 text-slate-600 hover:text-purple-600 transition-colors rounded-xl hover:bg-slate-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCog className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/dashboard/profile">
              <motion.div
                className="w-9 h-9 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                >
                <FaUser className="w-4 h-4 text-white" />
              </motion.div>
                </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Hero Section */}
        <DashboardHero
          userName={mockUserData.name}
          currentLevel={mockUserData.currentLevel}
          lessonTitle={mockUserData.lessonTitle}
          dailyGoalProgress={mockUserData.dailyGoalProgress}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <ProgressCard
            currentLevel={mockProgressData.currentLevel}
            currentLesson={mockProgressData.currentLesson}
            overallProgress={mockProgressData.overallProgress}
            lessonsCompleted={mockProgressData.lessonsCompleted}
            totalLessons={mockProgressData.totalLessons}
            nextMilestone={mockProgressData.nextMilestone}
          />
          <XPWidget
            totalXP={mockXPData.totalXP}
            xpToday={mockXPData.xpToday}
            xpToNextLevel={mockXPData.xpToNextLevel}
            rankTitle={mockXPData.rankTitle}
          />
          <StreakWidget
            currentStreak={mockStreakData.currentStreak}
            longestStreak={mockStreakData.longestStreak}
            streakActive={mockStreakData.streakActive}
            weekProgress={mockStreakData.weekProgress}
          />
        </div>

        {/* Learning Path & Badges Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <LearningPathPreview
              nodes={mockLearningPath.nodes}
              currentLevel={mockLearningPath.currentLevel}
            />
          </div>
          <BadgePreviewCard
            badges={mockBadges}
            totalBadges={12}
            unlockedCount={3}
          />
        </div>

        {/* Daily Goals & Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <DailyGoalCard
            goals={mockDailyGoals.goals}
            overallProgress={mockDailyGoals.overallProgress}
            dailyTarget={mockDailyGoals.dailyTarget}
          />
          <div className="lg:col-span-2">
            <QuickActionsGrid actions={mockQuickActions} />
          </div>
        </div>

        {/* Activity, Achievements & Motivational Panel Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 mb-12">
          <ActivityCard
            recentActivity={mockActivity.recentActivity}
            lastLesson={mockActivity.lastLesson}
          />
          <AchievementCard
            achievements={mockAchievements}
            unlockedCount={3}
            totalCount={5}
          />
          <MotivationalPanel
            tip={mockMotivationalData.tip}
            quote={mockMotivationalData.quote}
            recommendedTask={mockMotivationalData.recommendedTask}
          />
        </div>
      </main>
    </div>
  )
}
