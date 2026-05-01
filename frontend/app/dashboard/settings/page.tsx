"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FaUser,
  FaGraduationCap,
  FaPalette,
  FaBell,
  FaShieldAlt,
  FaLock,
  FaSignOutAlt,
  FaTrash,
  FaExclamationTriangle,
  FaCheck,
  FaCog,
  FaChevronLeft,
  FaGlobe,
  FaClock,
  FaVolumeUp,
  FaMoon,
  FaSun,
  FaDesktop,
  FaEye,
  FaEyeSlash,
  FaDownload,
} from "react-icons/fa"
import {
  SettingsSection,
  SettingsToggle,
  SettingsSelect,
  SettingsInput,
  SettingsActionButton,
  SettingsCard,
  SettingsSegmented,
} from "../components/settings"

// Mock user data
const initialProfile = {
  fullName: "Alex Johnson",
  email: "alex@frenchcoach.app",
  phone: "+1 (555) 123-4567",
  username: "alexj",
}

const learningLevels = [
  { value: "A0", label: "A0 - Beginner" },
  { value: "A1", label: "A1 - Elementary" },
  { value: "A2", label: "A2 - Pre-Intermediate" },
  { value: "B1", label: "B1 - Intermediate" },
  { value: "B2", label: "B2 - Upper Intermediate" },
  { value: "C1", label: "C1 - Advanced" },
]

const dailyGoals = [
  { value: "5", label: "5 minutes", icon: "⚡" },
  { value: "10", label: "10 minutes", icon: "🌱" },
  { value: "20", label: "20 minutes", icon: "🔥" },
  { value: "30", label: "30+ minutes", icon: "🚀" },
]

const themes = [
  { value: "light", label: "Light", icon: <FaSun className="w-4 h-4" /> },
  { value: "dark", label: "Dark", icon: <FaMoon className="w-4 h-4" /> },
  { value: "system", label: "System", icon: <FaDesktop className="w-4 h-4" /> },
]

export default function SettingsPage() {
  // Profile State
  const [profile, setProfile] = useState(initialProfile)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Learning Preferences
  const [currentLevel, setCurrentLevel] = useState("A0")
  const [targetLevel, setTargetLevel] = useState("B1")
  const [dailyGoal, setDailyGoal] = useState("10")
  const [focusAreas, setFocusAreas] = useState({
    speaking: true,
    listening: true,
    reading: false,
    writing: false,
  })

  // App Preferences
  const [theme, setTheme] = useState("light")
  const [soundEffects, setSoundEffects] = useState(true)
  const [animations, setAnimations] = useState(true)
  const [autoPlayAudio, setAutoPlayAudio] = useState(false)
  const [interfaceLanguage, setInterfaceLanguage] = useState("en")

  // Notifications
  const [notifications, setNotifications] = useState({
    lessonReminders: true,
    streakReminders: true,
    achievements: true,
    marketing: false,
    email: true,
    push: true,
  })

  // Security
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  // Save state
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSave = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleFocusAreaToggle = (area: keyof typeof focusAreas) => {
    setFocusAreas((prev) => ({ ...prev, [area]: !prev[area] }))
  }

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20 overflow-x-hidden">
      {/* Animated background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
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
                <FaCog className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800">Settings</span>
            </div>

            <div className="w-24" /> {/* Spacer for balance */}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-3">
            Settings
          </h1>
          <p className="text-slate-600 max-w-md mx-auto">
            Customize your learning experience and manage your account preferences.
          </p>
        </motion.div>

        {/* Profile Section */}
        <SettingsSection title="Profile" description="Your personal information" icon={FaUser} delay={0.1}>
          <SettingsCard delay={0.15}>
            <div className="p-6">
              {/* Avatar & Name Display */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-3xl font-bold text-white">{profile.fullName.charAt(0)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-600 hover:text-purple-600 border border-slate-200"
                  >
                    <FaCog className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800">{profile.fullName}</h3>
                  <p className="text-sm text-slate-500">@{profile.username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      Explorer
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      2,840 XP
                    </span>
                  </div>
                </div>
                <SettingsActionButton
                  variant="secondary"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  {isEditingProfile ? "Done" : "Edit"}
                </SettingsActionButton>
              </div>

              {/* Editable Fields */}
              <AnimatePresence>
                {isEditingProfile && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 border-t border-slate-200 pt-4"
                  >
                    <SettingsInput
                      label="Full Name"
                      value={profile.fullName}
                      onChange={(value) => setProfile((p) => ({ ...p, fullName: value }))}
                    />
                    <SettingsInput
                      label="Email"
                      type="email"
                      value={profile.email}
                      onChange={(value) => setProfile((p) => ({ ...p, email: value }))}
                    />
                    <SettingsInput
                      label="Phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(value) => setProfile((p) => ({ ...p, phone: value }))}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SettingsCard>
        </SettingsSection>

        {/* Learning Preferences */}
        <SettingsSection
          title="Learning Preferences"
          description="Customize your French learning journey"
          icon={FaGraduationCap}
          delay={0.2}
        >
          <SettingsCard delay={0.25}>
            <div className="p-6 space-y-6">
              {/* Level Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SettingsSelect
                  label="Current Level"
                  description="Your current French proficiency"
                  value={currentLevel}
                  options={learningLevels}
                  onChange={setCurrentLevel}
                />
                <SettingsSelect
                  label="Target Level"
                  description="Level you want to achieve"
                  value={targetLevel}
                  options={learningLevels}
                  onChange={setTargetLevel}
                />
              </div>

              {/* Daily Goal */}
              <SettingsSegmented
                label="Daily Learning Goal"
                description="How much time you want to practice each day"
                value={dailyGoal}
                options={dailyGoals}
                onChange={setDailyGoal}
              />

              {/* Focus Areas */}
              <div className="p-4 bg-white/60 rounded-xl border border-slate-200/50">
                <label className="text-sm font-semibold text-slate-700">Focus Areas</label>
                <p className="text-xs text-slate-500 mt-1 mb-3">Select the skills you want to focus on</p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(focusAreas).map(([area, enabled]) => (
                    <motion.button
                      key={area}
                      onClick={() => handleFocusAreaToggle(area as keyof typeof focusAreas)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                        enabled
                          ? "border-purple-400 bg-purple-50 text-purple-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize">{area}</span>
                        {enabled && <FaCheck className="w-4 h-4" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </SettingsCard>
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection
          title="App Preferences"
          description="Customize your app experience"
          icon={FaPalette}
          delay={0.3}
        >
          <SettingsCard delay={0.35}>
            <div className="p-6 space-y-6">
              {/* Theme */}
              <SettingsSegmented
                label="Theme"
                description="Choose your preferred appearance"
                value={theme}
                options={themes}
                onChange={setTheme}
              />

              {/* Interface Language */}
              <SettingsSelect
                label="Interface Language"
                description="Language for the app interface"
                value={interfaceLanguage}
                options={[
                  { value: "en", label: "English" },
                  { value: "fr", label: "French" },
                  { value: "es", label: "Spanish" },
                  { value: "de", label: "German" },
                ]}
                onChange={setInterfaceLanguage}
              />

              {/* Toggles */}
              <div className="space-y-3">
                <SettingsToggle
                  label="Sound Effects"
                  description="Play sounds for achievements and actions"
                  checked={soundEffects}
                  onChange={setSoundEffects}
                />
                <SettingsToggle
                  label="Animations"
                  description="Enable smooth animations throughout the app"
                  checked={animations}
                  onChange={setAnimations}
                />
                <SettingsToggle
                  label="Auto-play Audio"
                  description="Automatically play audio when available"
                  checked={autoPlayAudio}
                  onChange={setAutoPlayAudio}
                />
              </div>
            </div>
          </SettingsCard>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          title="Notifications"
          description="Manage how and when we notify you"
          icon={FaBell}
          delay={0.4}
        >
          <SettingsCard delay={0.45}>
            <div className="p-6 space-y-3">
              <SettingsToggle
                label="Lesson Reminders"
                description="Daily reminders to complete your lessons"
                checked={notifications.lessonReminders}
                onChange={() => handleNotificationToggle("lessonReminders")}
              />
              <SettingsToggle
                label="Streak Reminders"
                description="Warnings when your streak is about to break"
                checked={notifications.streakReminders}
                onChange={() => handleNotificationToggle("streakReminders")}
              />
              <SettingsToggle
                label="Achievements"
                description="Notify when you earn new badges or achievements"
                checked={notifications.achievements}
                onChange={() => handleNotificationToggle("achievements")}
              />
              <SettingsToggle
                label="Email Notifications"
                description="Receive updates and news via email"
                checked={notifications.email}
                onChange={() => handleNotificationToggle("email")}
              />
              <SettingsToggle
                label="Marketing Updates"
                description="Tips, offers, and new feature announcements"
                checked={notifications.marketing}
                onChange={() => handleNotificationToggle("marketing")}
              />
            </div>
          </SettingsCard>
        </SettingsSection>

        {/* Security */}
        <SettingsSection
          title="Security"
          description="Manage your account security"
          icon={FaShieldAlt}
          delay={0.5}
        >
          <SettingsCard delay={0.55}>
            <div className="p-6 space-y-6">
              {/* Change Password */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Password</h4>
                  <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                </div>
                <SettingsActionButton
                  variant="secondary"
                  onClick={() => setShowChangePassword(!showChangePassword)}
                >
                  Change
                </SettingsActionButton>
              </div>

              <AnimatePresence>
                {showChangePassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 border-t border-slate-200 pt-4"
                  >
                    <SettingsInput
                      label="Current Password"
                      type="password"
                      value={passwordData.current}
                      onChange={(value) => setPasswordData((p) => ({ ...p, current: value }))}
                    />
                    <SettingsInput
                      label="New Password"
                      type="password"
                      value={passwordData.new}
                      onChange={(value) => setPasswordData((p) => ({ ...p, new: value }))}
                    />
                    <SettingsInput
                      label="Confirm New Password"
                      type="password"
                      value={passwordData.confirm}
                      onChange={(value) => setPasswordData((p) => ({ ...p, confirm: value }))}
                    />
                    <div className="flex gap-3">
                      <SettingsActionButton onClick={() => setShowChangePassword(false)}>
                        Update Password
                      </SettingsActionButton>
                      <SettingsActionButton
                        variant="ghost"
                        onClick={() => setShowChangePassword(false)}
                      >
                        Cancel
                      </SettingsActionButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Two Factor */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                    <FaLock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700">Two-Factor Authentication</h4>
                    <p className="text-xs text-slate-500">Add an extra layer of security</p>
                  </div>
                </div>
                <SettingsActionButton variant="secondary" disabled>
                  Coming Soon
                </SettingsActionButton>
              </div>

              {/* Login Activity */}
              <div className="p-4 bg-slate-50 rounded-xl">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Recent Login Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Chrome on Windows</span>
                    <span className="text-xs text-green-600 font-medium">Active now</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Safari on iPhone</span>
                    <span className="text-xs text-slate-400">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </SettingsCard>
        </SettingsSection>

        {/* Privacy & Data */}
        <SettingsSection
          title="Privacy & Data"
          description="Manage your data and privacy preferences"
          icon={FaGlobe}
          delay={0.6}
        >
          <SettingsCard delay={0.65}>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Export Your Data</h4>
                  <p className="text-xs text-slate-500">Download all your learning data</p>
                </div>
                <SettingsActionButton variant="secondary" icon={<FaDownload className="w-4 h-4" />}>
                  Export
                </SettingsActionButton>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-700">
                  Your data is securely stored and never shared with third parties. Read our{" "}
                  <Link href="/privacy" className="underline font-medium hover:text-blue-800">
                    Privacy Policy
                  </Link>{" "}
                  for more details.
                </p>
              </div>
            </div>
          </SettingsCard>
        </SettingsSection>

        {/* Danger Zone */}
        <SettingsSection
          title="Account Actions"
          description="Manage your account status"
          icon={FaExclamationTriangle}
          delay={0.7}
          danger
        >
          <SettingsCard delay={0.75} className="border-red-200">
            <div className="p-6 space-y-4">
              {/* Log Out */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <FaSignOutAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700">Sign Out</h4>
                    <p className="text-xs text-slate-500">Log out from all devices</p>
                  </div>
                </div>
                <SettingsActionButton variant="secondary">Sign Out</SettingsActionButton>
              </div>

              {/* Delete Account */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                      <FaTrash className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-red-700">Delete Account</h4>
                      <p className="text-xs text-slate-500 max-w-xs">
                        Permanently delete your account and all associated data. This cannot be undone.
                      </p>
                    </div>
                  </div>
                  <SettingsActionButton
                    variant="danger"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </SettingsActionButton>
                </div>
              </div>
            </div>
          </SettingsCard>
        </SettingsSection>

        {/* Save Button - Sticky */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-300/50 border border-slate-200/50">
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-2 text-green-600 text-sm font-medium"
                >
                  <FaCheck className="w-4 h-4" />
                  Settings saved!
                </motion.div>
              )}
            </AnimatePresence>
            <SettingsActionButton variant="secondary" onClick={() => window.location.reload()}>
              Reset
            </SettingsActionButton>
            <SettingsActionButton onClick={handleSave}>Save Changes</SettingsActionButton>
          </div>
        </motion.div>
      </main>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                  <FaExclamationTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Delete Account?</h3>
                  <p className="text-sm text-slate-500">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-6">
                All your progress, achievements, and learning history will be permanently deleted.
                Are you absolutely sure?
              </p>

              <div className="flex gap-3">
                <SettingsActionButton
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </SettingsActionButton>
                <SettingsActionButton
                  variant="danger"
                  fullWidth
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    // Handle delete
                  }}
                >
                  Yes, Delete
                </SettingsActionButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
