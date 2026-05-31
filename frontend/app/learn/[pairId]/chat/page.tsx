"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  FiSend, FiMic, FiMicOff, FiVolume2, FiVolumeX,
  FiMessageCircle, FiUser, FiMapPin, FiBookOpen, FiList, FiPlus
} from "react-icons/fi"
import { FaRobot } from "react-icons/fa"
import { AuthGuard } from "../../../auth/AuthGuard"
import { useAuth } from "../../../auth/AuthProvider"
import { usePairs, useSessions } from "../../../../lib/hooks"
import { chatApi, transcriptionApi } from "../../../../lib/api"
import type { UserLanguagePair, ChatMessage } from "../../../Types"

// ---------------------------------------------------------------------------
// Mode config — API mode names, language-agnostic labels
// ---------------------------------------------------------------------------

type ApiMode = "general" | "introduction" | "travelling" | "daily_life"

const MODES: { id: ApiMode; label: string; icon: React.ElementType; description: string; color: string }[] = [
  { id: "general",      label: "Free Chat",    icon: FiMessageCircle, description: "Open-ended conversation",    color: "from-blue-500 to-cyan-500"    },
  { id: "introduction", label: "Introductions", icon: FiUser,          description: "Greetings and self-intro",   color: "from-purple-500 to-pink-500"  },
  { id: "travelling",   label: "Travel",        icon: FiMapPin,        description: "Travel scenarios",           color: "from-emerald-500 to-teal-500" },
  { id: "daily_life",   label: "Daily Life",    icon: FiBookOpen,      description: "Everyday conversations",     color: "from-amber-500 to-orange-500" },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-25"
          style={{
            width: `${200 + i * 50}px`, height: `${200 + i * 50}px`,
            left: `${10 + i * 35}%`, top: `${20 + (i % 2) * 40}%`,
            background: i === 0
              ? "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.2))"
              : i === 1
              ? "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(59,130,246,0.15))"
              : "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.15))",
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl rounded-tl-md shadow-sm border border-slate-100 max-w-fit"
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
        <FaRobot className="w-3 h-3 text-white" />
      </div>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="w-2 h-2 rounded-full bg-slate-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </div>
    </motion.div>
  )
}

function XpToast({ xp }: { xp: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-28 right-5 z-50 bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-amber-500/30 pointer-events-none"
    >
      +{xp} XP ✨
    </motion.div>
  )
}

function MessageBubble({
  message, index, speakingId, onSpeak, onStop
}: {
  message: Pick<ChatMessage, "role" | "content">
  index: number
  speakingId: number | null
  onSpeak: (text: string, id: number) => void
  onStop: () => void
}) {
  const isUser = message.role === "user"
  const speaking = speakingId === index

  return (
    <motion.div className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}>
      <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[75%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${isUser ? "bg-gradient-to-br from-blue-500 to-cyan-500" : "bg-gradient-to-br from-purple-500 to-blue-500"}`}>
          {isUser ? <FiUser className="w-4 h-4 text-white" /> : <FaRobot className="w-4 h-4 text-white" />}
        </div>
        <div className={`relative group ${isUser ? "items-end" : "items-start"}`}>
          <div className={`px-4 py-3 rounded-2xl shadow-sm ${isUser ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-br-md" : "bg-white border border-slate-100 text-slate-800 rounded-tl-md"}`}>
            {/* dir="auto" lets the browser detect RTL content (Arabic, etc.) */}
            <p className={`text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${isUser ? "text-white" : "text-slate-700"}`} dir="auto">
              {message.content}
            </p>
          </div>
          {!isUser && (
            <motion.button
              onClick={() => speaking ? onStop() : onSpeak(message.content, index)}
              className={`absolute -bottom-8 left-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${speaking ? "bg-rose-100 text-rose-600 hover:bg-rose-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              {speaking ? <><FiVolumeX className="w-3.5 h-3.5" />Stop</> : <><FiVolume2 className="w-3.5 h-3.5" />Listen</>}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function ChatPage() {
  return (
    <AuthGuard>
      <ChatContent />
    </AuthGuard>
  )
}

function ChatContent() {
  const params = useParams<{ pairId: string }>()
  const pairId = parseInt(params.pairId, 10)

  const { accessToken } = useAuth()
  const { pairs } = usePairs(accessToken)
  const pair = pairs.find((p) => p.id === pairId) ?? null

  const { sessions, refetch: refetchSessions } = useSessions(accessToken, pairId)

  const [messages, setMessages] = useState<Pick<ChatMessage, "role" | "content">[]>([])
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState<ApiMode>("general")
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showModeMenu, setShowModeMenu] = useState(false)
  const [showSessions, setShowSessions] = useState(false)
  const [xpToast, setXpToast] = useState<number | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [speakingId, setSpeakingId] = useState<number | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    return () => { if (window.speechSynthesis) window.speechSynthesis.cancel() }
  }, [])

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus()
  }, [isLoading])

  // ---- Send message ----
  const sendMessage = async (text?: string) => {
    const content = (text ?? prompt).trim()
    if (!content || !accessToken || !pairId) return

    setIsLoading(true)
    setMessages((prev) => [...prev, { role: "user", content }])
    setPrompt("")

    try {
      const data = await chatApi.send(accessToken, pairId, content, mode, sessionId ?? undefined)
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
      setSessionId(data.session_id)
      setXpToast(data.xp_awarded)
      setTimeout(() => setXpToast(null), 2500)
      refetchSessions()
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Connection error"
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${msg}` }])
    } finally {
      setIsLoading(false)
    }
  }

  // ---- Load a past session ----
  const loadSession = async (sid: number) => {
    if (!accessToken) return
    try {
      const data = await chatApi.getMessages(accessToken, sid)
      setMessages(data.messages.map((m) => ({ role: m.role, content: m.content })))
      setSessionId(sid)
    } catch { /* ignore */ }
    setShowSessions(false)
  }

  // ---- New chat ----
  const startNewChat = () => {
    setMessages([])
    setSessionId(null)
    setShowSessions(false)
  }

  // ---- Voice recording ----
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      audioChunksRef.current = []
      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      recorder.start()
      setIsRecording(true)
    } catch { /* microphone not available */ }
  }

  const stopRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return
    mediaRecorderRef.current.stop()
    setIsRecording(false)
    mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop())

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
      setIsLoading(true)
      try {
        const data = await transcriptionApi.transcribe(blob)
        if (data.transcription?.trim()) {
          await sendMessage(data.transcription.trim())
        }
      } catch { /* ignore transcription failure */ } finally {
        setIsLoading(false)
      }
    }
  }

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop())
      setIsRecording(false)
      audioChunksRef.current = []
    }
  }

  // ---- TTS — uses target language code for language-agnostic speech ----
  const speak = (text: string, id: number) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = pair?.target_language.code ?? "en"
    u.rate = 0.9
    u.onstart = () => setSpeakingId(id)
    u.onend = u.onerror = () => setSpeakingId(null)
    window.speechSynthesis.speak(u)
  }

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel()
    setSpeakingId(null)
  }

  const currentMode = MODES.find((m) => m.id === mode) ?? MODES[0]

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden relative">
      <AnimatedBackground />

      {/* XP toast */}
      <AnimatePresence>{xpToast !== null && <XpToast xp={xpToast} />}</AnimatePresence>

      {/* Header */}
      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 sm:px-6 py-3 shrink-0"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          {/* Left — pair info */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/languages" className="text-slate-400 hover:text-slate-600 transition-colors shrink-0 text-sm">←</Link>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-md shrink-0">
              <FaRobot className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">
                {pair ? `${pair.source_language.name} → ${pair.target_language.name}` : "Loading…"}
              </p>
              {pair && (
                <p className="text-xs text-slate-500">Level {pair.current_level} · {pair.total_xp.toLocaleString()} XP</p>
              )}
            </div>
          </div>

          {/* Right — mode selector + sessions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Sessions button */}
            <motion.button
              onClick={() => setShowSessions(!showSessions)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              <FiList className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">History</span>
            </motion.button>

            {/* Mode selector */}
            <div className="relative">
              <motion.button
                onClick={() => !isLoading && setShowModeMenu(!showModeMenu)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              >
                <currentMode.icon className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-medium text-slate-700 hidden sm:inline">{currentMode.label}</span>
              </motion.button>

              <AnimatePresence>
                {showModeMenu && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  >
                    {MODES.map((m, i) => (
                      <motion.button key={m.id}
                        onClick={() => { setMode(m.id); setShowModeMenu(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left ${mode === m.id ? "bg-slate-50" : ""}`}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                      >
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                          <m.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{m.label}</p>
                          <p className="text-xs text-slate-500">{m.description}</p>
                        </div>
                        {mode === m.id && <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500" />}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sessions panel */}
      <AnimatePresence>
        {showSessions && (
          <motion.div
            className="absolute top-[4.5rem] right-0 w-72 max-h-[60vh] bg-white border-l border-b border-slate-200 shadow-xl z-40 overflow-y-auto flex flex-col"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-700">Past sessions</p>
              <button
                onClick={startNewChat}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                <FiPlus className="w-3.5 h-3.5" /> New
              </button>
            </div>
            {sessions.length === 0 ? (
              <p className="text-xs text-slate-400 px-4 py-3">No sessions yet.</p>
            ) : (
              sessions.map((s) => (
                <button key={s.id} onClick={() => loadSession(s.id)}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 transition-colors ${sessionId === s.id ? "bg-indigo-50" : ""}`}
                >
                  <p className="text-xs font-medium text-slate-700 capitalize">{s.mode.replace("_", " ")}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {s.message_count} messages · {new Date(s.created_at).toLocaleDateString()}
                  </p>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 relative" onClick={() => { setShowModeMenu(false); setShowSessions(false) }}>
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div key="empty" className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${currentMode.color} flex items-center justify-center shadow-xl mb-6`}>
                  <currentMode.icon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {pair ? `Start chatting in ${pair.target_language.name}` : "Loading your pair…"}
                </h2>
                <p className="text-slate-500 max-w-sm">
                  {currentMode.description}. Your AI tutor will guide you at your level.
                </p>
              </motion.div>
            ) : (
              <motion.div key="messages" className="space-y-6 pb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} index={i}
                    speakingId={speakingId} onSpeak={speak} onStop={stopSpeaking} />
                ))}
                {isLoading && (
                  <AnimatePresence><TypingIndicator /></AnimatePresence>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 px-4 sm:px-6 py-4 shrink-0"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto">
          <AnimatePresence>
            {isRecording && (
              <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-full shadow-lg text-sm font-medium"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              >
                <motion.div className="w-2.5 h-2.5 bg-white rounded-full"
                  animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                Recording… release to send
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              placeholder={isRecording ? "Recording…" : "Type a message…"}
              disabled={isLoading || isRecording}
              dir="auto"
              className="flex-1 px-5 py-3.5 bg-slate-100 border-0 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all disabled:opacity-50"
            />

            <motion.button onClick={() => sendMessage()}
              disabled={isLoading || !prompt.trim() || isRecording}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FiSend className="w-5 h-5" />
            </motion.button>

            <motion.button
              onPointerDown={startRecording} onPointerUp={stopRecording} onPointerCancel={cancelRecording}
              disabled={isLoading}
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-all ${isRecording ? "bg-rose-500 text-white shadow-rose-500/30" : "bg-slate-100 text-slate-600 hover:bg-slate-200"} disabled:opacity-40`}
              whileTap={{ scale: 0.95 }}
              animate={isRecording ? { boxShadow: ["0 0 0 0 rgba(244,63,94,0.4)", "0 0 0 10px rgba(244,63,94,0)"] } : {}}
              transition={{ boxShadow: { duration: 1, repeat: Infinity } }}
            >
              {isRecording ? <FiMicOff className="w-5 h-5" /> : <FiMic className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
