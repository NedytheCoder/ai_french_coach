/**
 * Conversation Page - AI French Tutor Chat Interface
 * ===================================================
 *
 * A fully animated, gamified chat experience for practicing French.
 * Free-form WhatsApp-style conversation with premium visual polish.
 *
 * **Visual Features:**
 * - Animated background with floating elements
 * - Beautiful message bubbles with smooth entrance animations
 * - Premium chat header with avatar and subtitle
 * - Modern input area with soft glow and focus effects
 * - Typing indicator with animated dots
 * - Suggested prompt chips for quick starts
 * - Empty state with warm welcome message
 *
 * **Core Functionality (Preserved):**
 * - Text-based conversation with AI tutor
 * - Voice input with speech-to-text
 * - Text-to-speech (TTS) for listening practice
 * - Multiple conversation modes
 * - Auto-reply toggle
 *
 * **Architecture:**
 * - Frontend: Next.js with Framer Motion animations
 * - Backend: Python FastAPI server (localhost:8000)
 * - Speech: Web Speech API for TTS, MediaRecorder API for voice
 */

"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FiSend,
  FiMic,
  FiMicOff,
  FiVolume2,
  FiVolumeX,
  FiMessageCircle,
  FiStar,
  FiSmile,
  FiMapPin,
  FiUser,
  FiGlobe,
  FiBookOpen
} from "react-icons/fi"
import { FaRobot } from "react-icons/fa"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface Message {
  role: "user" | "assistant"
  content: string
}

type Mode = "chat" | "introduction" | "traveling" | "daily_conversations"

interface ModeConfig {
  id: Mode
  label: string
  icon: React.ElementType
  description: string
  color: string
  suggestedPrompts: string[]
}

// =============================================================================
// CONFIGURATION
// =============================================================================

const MODES: ModeConfig[] = [
  {
    id: "chat",
    label: "Free Chat",
    icon: FiMessageCircle,
    description: "Practice French naturally",
    color: "from-blue-500 to-cyan-500",
    suggestedPrompts: ["Bonjour, comment ça va ?", "Parlez-moi de Paris", "Quel temps fait-il ?"]
  },
  {
    id: "introduction",
    label: "Introductions",
    icon: FiUser,
    description: "Practice meeting people",
    color: "from-purple-500 to-pink-500",
    suggestedPrompts: ["Je m'appelle...", "Je viens de...", "Enchanté de vous rencontrer"]
  },
  {
    id: "traveling",
    label: "Travel",
    icon: FiMapPin,
    description: "Travel scenarios",
    color: "from-emerald-500 to-teal-500",
    suggestedPrompts: ["Où est la gare ?", "Je voudrais un billet", "L'addition, s'il vous plaît"]
  },
  {
    id: "daily_conversations",
    label: "Daily Life",
    icon: FiBookOpen,
    description: "Everyday conversations",
    color: "from-amber-500 to-orange-500",
    suggestedPrompts: ["Qu'est-ce que tu fais ?", "J'aime le café", "À quelle heure ?"]
  }
]

// =============================================================================
// ANIMATED BACKGROUND
// =============================================================================

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft gradient orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: `${200 + i * 50}px`,
            height: `${200 + i * 50}px`,
            left: `${10 + i * 35}%`,
            top: `${20 + (i % 2) * 40}%`,
            background: `linear-gradient(135deg, ${
              i === 0
                ? "rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.2) 100%"
                : i === 1
                  ? "rgba(34,197,94,0.2) 0%, rgba(59,130,246,0.15) 100%"
                  : "rgba(251,191,36,0.2) 0%, rgba(245,158,11,0.15) 100%"
            })`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-purple-300/20 to-blue-300/20"
          style={{
            left: `${10 + (i * 15)}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  )
}

// =============================================================================
// CHAT HEADER
// =============================================================================

function ChatHeader({
  currentMode,
  onModeChange,
  isLoading
}: {
  currentMode: Mode
  onModeChange: (mode: Mode) => void
  isLoading: boolean
}) {
  const mode = MODES.find(m => m.id === currentMode) || MODES[0]
  const [showModeMenu, setShowModeMenu] = useState(false)

  return (
    <motion.div
      className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 sm:px-6 py-4 shrink-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {/* Left: Avatar and title */}
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring" }}
          >
            <FaRobot className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              French Coach
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <FiStar className="w-4 h-4 text-amber-500" />
              </motion.span>
            </h1>
            <p className="text-sm text-slate-500">Practice French freely</p>
          </div>
        </div>

        {/* Right: Mode selector */}
        <div className="relative">
          <motion.button
            onClick={() => !isLoading && setShowModeMenu(!showModeMenu)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <mode.icon className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700 hidden sm:inline">{mode.label}</span>
            <motion.div
              animate={{ rotate: showModeMenu ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.button>

          {/* Mode dropdown */}
          <AnimatePresence>
            {showModeMenu && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {MODES.map((m, i) => (
                  <motion.button
                    key={m.id}
                    onClick={() => {
                      onModeChange(m.id)
                      setShowModeMenu(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left ${currentMode === m.id ? 'bg-slate-50' : ''}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                      <m.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{m.label}</p>
                      <p className="text-xs text-slate-500">{m.description}</p>
                    </div>
                    {currentMode === m.id && (
                      <motion.div
                        className="ml-auto w-2 h-2 rounded-full bg-emerald-500"
                        layoutId="activeMode"
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// TYPING INDICATOR
// =============================================================================

function TypingIndicator() {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl rounded-tl-md shadow-sm border border-slate-100 max-w-fit"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
        <FaRobot className="w-3 h-3 text-white" />
      </div>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-slate-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// =============================================================================
// MESSAGE BUBBLE
// =============================================================================

function MessageBubble({
  message,
  index,
  isSpeaking,
  speakingMessageId,
  onSpeak,
  onStop
}: {
  message: Message
  index: number
  isSpeaking: boolean
  speakingMessageId: number | null
  onSpeak: (text: string, id: number) => void
  onStop: () => void
}) {
  const isUser = message.role === "user"
  const isCurrentlySpeaking = isSpeaking && speakingMessageId === index

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
    >
      <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <motion.div
          className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
              : 'bg-gradient-to-br from-purple-500 to-blue-500'
          }`}
          whileHover={{ scale: 1.1 }}
        >
          {isUser ? (
            <FiUser className="w-4 h-4 text-white" />
          ) : (
            <FaRobot className="w-4 h-4 text-white" />
          )}
        </motion.div>

        {/* Message content */}
        <div className={`relative group ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm ${
              isUser
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-br-md'
                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-md'
            }`}
          >
            <p className={`text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${isUser ? 'text-white' : 'text-slate-700'}`}>
              {message.content}
            </p>
          </div>

          {/* Actions */}
          {!isUser && (
            <motion.button
              onClick={() => isCurrentlySpeaking ? onStop() : onSpeak(message.content, index)}
              className={`absolute -bottom-8 left-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isCurrentlySpeaking
                  ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCurrentlySpeaking ? (
                <>
                  <FiVolumeX className="w-3.5 h-3.5" />
                  Stop
                </>
              ) : (
                <>
                  <FiVolume2 className="w-3.5 h-3.5" />
                  Listen
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// EMPTY STATE
// =============================================================================

function EmptyState({
  currentMode,
  onPromptClick
}: {
  currentMode: Mode
  onPromptClick: (prompt: string) => void
}) {
  const mode = MODES.find(m => m.id === currentMode) || MODES[0]

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[50vh] px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Welcome icon */}
      <motion.div
        className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${mode.color} flex items-center justify-center shadow-xl mb-6`}
        animate={{
          y: [0, -5, 0],
          boxShadow: [
            "0 10px 40px -10px rgba(139,92,246,0.3)",
            "0 20px 60px -10px rgba(139,92,246,0.5)",
            "0 10px 40px -10px rgba(139,92,246,0.3)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <mode.icon className="w-10 h-10 text-white" />
      </motion.div>

      {/* Welcome text */}
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
        Start chatting in French
      </h2>
      <p className="text-slate-500 text-center mb-8 max-w-md">
        Practice naturally with your AI French tutor. Ask anything, make mistakes, and learn at your own pace.
      </p>

      {/* Suggested prompts */}
      <div className="flex flex-wrap justify-center gap-2 max-w-lg">
        {mode.suggestedPrompts.map((prompt, i) => (
          <motion.button
            key={i}
            onClick={() => onPromptClick(prompt)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {prompt}
          </motion.button>
        ))}
      </div>

      {/* Tips */}
      <motion.div
        className="mt-12 flex items-center gap-2 text-slate-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <FiSmile className="w-4 h-4" />
        <span>Tip: Hold the microphone button to speak in French</span>
      </motion.div>
    </motion.div>
  )
}

// =============================================================================
// CHAT INPUT
// =============================================================================

function ChatInput({
  prompt,
  onPromptChange,
  onSend,
  onRecordStart,
  onRecordEnd,
  onRecordCancel,
  isLoading,
  isRecording,
  autoReply,
  onAutoReplyChange
}: {
  prompt: string
  onPromptChange: (value: string) => void
  onSend: () => void
  onRecordStart: () => void
  onRecordEnd: () => void
  onRecordCancel: () => void
  isLoading: boolean
  isRecording: boolean
  autoReply: boolean
  onAutoReplyChange: (value: boolean) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus()
    }
  }, [isLoading])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <motion.div
      className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 px-4 sm:px-6 py-4 shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Recording indicator */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-full shadow-lg"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
            >
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <span className="text-sm font-medium">Recording... Release to send</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input bar */}
        <div className="flex items-center gap-3">
          {/* Auto-reply toggle */}
          <motion.button
            onClick={() => onAutoReplyChange(!autoReply)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${autoReply ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={autoReply ? "Auto-reply ON" : "Auto-reply OFF"}
          >
            <FiVolume2 className="w-5 h-5" />
            <span className="text-[10px] font-medium">{autoReply ? 'ON' : 'OFF'}</span>
          </motion.button>

          {/* Text input */}
          <div className={`flex-1 relative ${isFocused ? 'ring-2 ring-blue-400/50' : ''} rounded-2xl transition-all`}>
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isRecording ? "Recording..." : "Type your message in French..."}
              disabled={isLoading || isRecording}
              className="w-full px-5 py-3.5 bg-slate-100 border-0 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all disabled:opacity-50"
            />
          </div>

          {/* Send button */}
          <motion.button
            onClick={onSend}
            disabled={isLoading || !prompt.trim() || isRecording}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -5px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSend className="w-5 h-5" />
          </motion.button>

          {/* Mic button */}
          <motion.button
            onPointerDown={onRecordStart}
            onPointerUp={onRecordEnd}
            onPointerCancel={onRecordCancel}
            disabled={isLoading}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all ${
              isRecording
                ? 'bg-rose-500 text-white shadow-rose-500/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            } disabled:opacity-50`}
            whileHover={!isRecording ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            animate={isRecording ? {
              boxShadow: [
                "0 0 0 0 rgba(244,63,94,0.4)",
                "0 0 0 10px rgba(244,63,94,0)",
              ],
            } : {}}
            transition={{ boxShadow: { duration: 1, repeat: Infinity } }}
          >
            {isRecording ? <FiMicOff className="w-5 h-5" /> : <FiMic className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Home() {
  // ---------------------------------------------------------------------------
  // STATE (Preserved from original)
  // ---------------------------------------------------------------------------
  const [message, setMessage] = useState("")
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState<Mode>("chat")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [autoReply, setAutoReply] = useState(false)
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null)

  // ---------------------------------------------------------------------------
  // REFS (Preserved from original)
  // ---------------------------------------------------------------------------
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // ---------------------------------------------------------------------------
  // EFFECTS (Preserved from original)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // ---------------------------------------------------------------------------
  // API FUNCTIONS (Preserved from original)
  // ---------------------------------------------------------------------------
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/conversation` || "http://localhost:8000/conversation"

  async function getData() {
    const res = await fetch(API_BASE_URL)
    const data = await res.json()
    setMessage(data.message)
  }

  async function sendMessage() {
    if (!prompt.trim()) return

    setIsLoading(true)

    const userMessage: Message = { role: "user", content: prompt }
    const updatedHistory = [...messages, userMessage]

    setMessages(updatedHistory)

    try {
      let url = API_BASE_URL + "/respond"
      if (mode === "introduction") {
        url = API_BASE_URL + "/introduction"
      } else if (mode === "traveling") {
        url = API_BASE_URL + "/traveling"
      } else if (mode === "daily_conversations") {
        url = API_BASE_URL + "/daily_conversations"
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: updatedHistory }),
      })

      const data = await res.json()

      if (!res.ok) {
        const errorMessage: Message = { role: "assistant", content: "Error: " + data.detail || "Something went wrong" }
        setMessages(prev => [...prev, errorMessage])
      } else {
        const assistantMessage: Message = { role: "assistant", content: data.reply }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      const errorMessage: Message = { role: "assistant", content: "Error: Failed to connect to server" }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setPrompt("")
    }
  }

  async function recordAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Could not access microphone. Please check permissions.")
    }
  }

  async function sendAudio() {
    if (!mediaRecorderRef.current || !isRecording) return
    mediaRecorderRef.current.stop()
    setIsRecording(false)
    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
      const formData = new FormData()
      formData.append("file", audioBlob, "recording.webm")
      setIsLoading(true)

      try {
        const res = await fetch(`${API_BASE_URL}/transcribe`, { method: "POST", body: formData })
        const data = await res.json()

        if (!res.ok) {
          const errorMessage: Message = { role: "assistant", content: "Error: " + data.detail }
          setMessages(prev => [...prev, errorMessage])
        } else {
          if (!data.transcription || data.transcription.trim() === "") {
            const noSpeechMessage: Message = { role: "assistant", content: data.detail }
            setMessages(prev => [...prev, noSpeechMessage])
          } else {
            const userMessage: Message = { role: "user", content: data.transcription }
            const updatedHistory = [...messages, userMessage]
            setMessages(updatedHistory)

           let url = API_BASE_URL + "/respond"
      if (mode === "introduction") {
        url = API_BASE_URL + "/introduction"
      } else if (mode === "traveling") {
        url = API_BASE_URL + "/traveling"
      } else if (mode === "daily_conversations") {
        url = API_BASE_URL + "/daily_conversations"
      }

            const aiRes = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: updatedHistory })
            })
            const aiData = await aiRes.json()

            if (!aiRes.ok) {
              const errorMessage: Message = { role: "assistant", content: "Error: " + aiData.detail || "Something went wrong" }
              setMessages(prev => [...prev, errorMessage])
            } else {
              const assistantMessage: Message = { role: "assistant", content: aiData.reply }
              setMessages(prev => [...prev, assistantMessage])
              if (autoReply) {
                const newMessageIndex = messages.length + 1
                setTimeout(() => speak(aiData.reply, newMessageIndex), 500)
              }
            }
          }
        }
      } catch (error) {
        console.error("Error processing audio:", error)
        const errorMessage: Message = { role: "assistant", content: "Error: Failed to process audio" }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  function cancelAudio() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
      audioChunksRef.current = []
    }
  }

  function speak(text: string, messageId: number) {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported in your browser")
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "fr-FR"
    utterance.rate = 0.9
    utterance.onstart = () => {
      setIsSpeaking(true)
      setSpeakingMessageId(messageId)
    }
    utterance.onend = () => {
      setIsSpeaking(false)
      setSpeakingMessageId(null)
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      setSpeakingMessageId(null)
    }
    window.speechSynthesis.speak(utterance)
  }

  function stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    setSpeakingMessageId(null)
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden relative">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Header */}
      <ChatHeader
        currentMode={mode}
        onModeChange={setMode}
        isLoading={isLoading}
      />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 relative">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <EmptyState
                key="empty"
                currentMode={mode}
                onPromptClick={(p) => {
                  setPrompt(p)
                  setTimeout(() => sendMessage(), 100)
                }}
              />
            ) : (
              <motion.div
                key="messages"
                className="space-y-6 pb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {messages.map((msg, index) => (
                  <MessageBubble
                    key={index}
                    message={msg}
                    index={index}
                    isSpeaking={isSpeaking}
                    speakingMessageId={speakingMessageId}
                    onSpeak={speak}
                    onStop={stopSpeaking}
                  />
                ))}
                {isLoading && <TypingIndicator />}
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <ChatInput
        prompt={prompt}
        onPromptChange={setPrompt}
        onSend={sendMessage}
        onRecordStart={recordAudio}
        onRecordEnd={sendAudio}
        onRecordCancel={cancelAudio}
        isLoading={isLoading}
        isRecording={isRecording}
        autoReply={autoReply}
        onAutoReplyChange={setAutoReply}
      />
    </div>
  )
}
