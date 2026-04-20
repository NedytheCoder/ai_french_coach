"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  FaChevronLeft,
  FaBook,
  FaQuestionCircle,
  FaFire,
  FaStar,
  FaTrophy,
  FaClock,
  FaChartLine,
  FaGraduationCap,
  FaCog,
  FaPlay,
  FaRedo,
  FaAward,
  FaUserEdit,
} from "react-icons/fa"
import {
  ProfileHeader,
  ProfileStatsCard,
  AchievementBadge,
  ProgressSummaryCard,
  RecentActivityCard,
  LevelCard,
  ProfileInfoCard,
  GoalCard,
  ProfileActionButton,
} from "../components/profile"

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex@frenchcoach.app",
  username: "alexj",
  level: "A0",
  xp: 2840,
  streak: 12,
  rank: "Explorer",
  phone: "+1 (555) 123-4567",
  learningGoal: "Travel to France",
  joinedDate: "January 2024",
  focus: ["Speaking", "Listening"],
}

// Stats data
const statsData = {
  lessonsCompleted: 24,
  quizzesPassed: 8,
  averageScore: 85,
  timeSpent: "12h 30m",
  strongestSkill: "Vocabulary",
  weakestSkill: "Grammar",
}

// Achievements data
const achievements = [
  { id: "1", name: "First Steps", description: "Complete your first lesson", type: "star" as const, color: "bronze" as const, unlocked: true, unlockedAt: "Jan 15" },
  { id: "2", name: "3-Day Streak", description: "Practice for 3 days straight", type: "fire" as const, color: "silver" as const, unlocked: true, unlockedAt: "Jan 18" },
  { id: "3", name: "Quiz Master", description: "Score 100% on any quiz", type: "trophy" as const, color: "gold" as const, unlocked: true, unlockedAt: "Jan 22" },
  { id: "4", name: "7-Day Streak", description: "Maintain a 7-day streak", type: "fire" as const, color: "gold" as const, unlocked: true, unlockedAt: "Jan 25" },
  { id: "5", name: "XP Hunter", description: "Earn 5,000 XP", type: "gem" as const, color: "purple" as const, unlocked: false },
  { id: "6", name: "Polyglot", description: "Complete A1 level", type: "crown" as const, color: "gold" as const, unlocked: false },
]

// Activity data
const recentActivities = [
  { id: "1", type: "lesson" as const, title: "Completed Lesson 3", description: "Basic Greetings", time: "2 hours ago" },
  { id: "2", type: "quiz" as const, title: "Passed Quiz", description: "Greetings & Introductions - 90%", time: "5 hours ago" },
  { id: "3", type: "streak" as const, title: "Streak Updated", description: "12 days and counting!", time: "Yesterday" },
  { id: "4", type: "badge" as const, title: "Badge Earned", description: "Quiz Master unlocked", time: "2 days ago" },
]

// Learning path data
const learningPath = {
  currentLevel: "A0",
  currentLesson: "Lesson 3: Basic Greetings",
  nextLesson: "Lesson 4: Numbers 1-10",
  lessonsInLevel: 20,
  completedInLevel: 7,
}

// Goals data
const goalsData = {
  dailyGoal: 10,
  weeklyProgress: 2,
  weeklyTarget: 5,
  currentStreak: 12,
  encouragement: "You're on a roll! Just 3 more lessons to hit your weekly goal.",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 font-sans overflow-x-hidden">
      {/* Animated Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-1/3 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
            >
              <motion.div whileHover={{ x: -3 }} className="flex items-center gap-2">
                <FaChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </motion.div>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <FaUserEdit className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800">My Profile</span>
            </div>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <FaCog className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Profile Hero */}
        <ProfileHeader
          name={userData.name}
          email={userData.email}
          level={userData.level}
          xp={userData.xp}
          streak={userData.streak}
          rank={userData.rank}
        />

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mt-6 mb-8"
        >
          <ProfileActionButton href="/classes/A0/lesson3" icon={<FaPlay className="w-4 h-4" />}>
            Continue Learning
          </ProfileActionButton>
          <ProfileActionButton variant="secondary" href="/review" icon={<FaRedo className="w-4 h-4" />}>
            Review Mistakes
          </ProfileActionButton>
          <ProfileActionButton variant="outline" href="/dashboard/settings" icon={<FaCog className="w-4 h-4" />}>
            Settings
          </ProfileActionButton>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <ProfileStatsCard
            label="Lessons"
            value={statsData.lessonsCompleted}
            icon={<FaBook className="w-5 h-5" />}
            color="blue"
            delay={0.25}
            trend="+3 this week"
          />
          <ProfileStatsCard
            label="Quizzes"
            value={statsData.quizzesPassed}
            icon={<FaQuestionCircle className="w-5 h-5" />}
            color="purple"
            delay={0.3}
          />
          <ProfileStatsCard
            label="Avg Score"
            value={`${statsData.averageScore}%`}
            icon={<FaChartLine className="w-5 h-5" />}
            color="green"
            delay={0.35}
          />
          <ProfileStatsCard
            label="Time Spent"
            value={statsData.timeSpent}
            icon={<FaClock className="w-5 h-5" />}
            color="orange"
            delay={0.4}
          />
          <ProfileStatsCard
            label="Streak"
            value={userData.streak}
            icon={<FaFire className="w-5 h-5" />}
            color="orange"
            delay={0.45}
            trend="Best: 18"
          />
          <ProfileStatsCard
            label="Total XP"
            value={userData.xp.toLocaleString()}
            icon={<FaStar className="w-5 h-5" />}
            color="pink"
            delay={0.5}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Personal Info & Level */}
          <div className="space-y-6">
            <ProfileInfoCard
              fullName={userData.name}
              email={userData.email}
              phone={userData.phone}
              learningGoal={userData.learningGoal}
              joinedDate={userData.joinedDate}
              focus={userData.focus}
              delay={0.55}
            />
            <LevelCard
              currentLevel={learningPath.currentLevel}
              currentLesson={learningPath.currentLesson}
              nextLesson={learningPath.nextLesson}
              lessonsInLevel={learningPath.lessonsInLevel}
              completedInLevel={learningPath.completedInLevel}
              delay={0.6}
            />
          </div>

          {/* Middle & Right Column - Activity & Goals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <RecentActivityCard activities={recentActivities} delay={0.65} />
              <GoalCard
                dailyGoal={goalsData.dailyGoal}
                weeklyProgress={goalsData.weeklyProgress}
                weeklyTarget={goalsData.weeklyTarget}
                currentStreak={goalsData.currentStreak}
                encouragement={goalsData.encouragement}
                delay={0.7}
              />
            </div>

            {/* Progress Summaries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProgressSummaryCard
                title="Lessons Progress"
                description={`${learningPath.completedInLevel} of ${learningPath.lessonsInLevel} lessons completed`}
                progress={learningPath.completedInLevel}
                total={learningPath.lessonsInLevel}
                icon={<FaGraduationCap className="w-5 h-5" />}
                color="purple"
                delay={0.75}
              />
              <ProgressSummaryCard
                title="Quiz Mastery"
                description="Average score across all quizzes"
                progress={statsData.averageScore}
                total={100}
                icon={<FaTrophy className="w-5 h-5" />}
                color="green"
                delay={0.8}
              />
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
              <FaAward className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Achievements</h2>
              <p className="text-sm text-slate-500">
                {achievements.filter((a) => a.unlocked).length} of {achievements.length} unlocked
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {achievements.map((achievement, index) => (
              <AchievementBadge
                key={achievement.id}
                name={achievement.name}
                description={achievement.description}
                type={achievement.type}
                color={achievement.color}
                unlocked={achievement.unlocked}
                unlockedAt={achievement.unlockedAt}
                delay={0.9 + index * 0.05}
              />
            ))}
          </div>
        </motion.div>

        {/* Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
        >
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <FaChartLine className="w-4 h-4 text-white" />
            </span>
            Skills Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-emerald-700">Strongest Skill</span>
                <span className="text-2xl">💪</span>
              </div>
              <p className="font-bold text-slate-800">{statsData.strongestSkill}</p>
              <p className="text-xs text-slate-500">Keep up the great work!</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-orange-700">Focus Area</span>
                <span className="text-2xl">🎯</span>
              </div>
              <p className="font-bold text-slate-800">{statsData.weakestSkill}</p>
              <p className="text-xs text-slate-500">A little more practice needed</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
