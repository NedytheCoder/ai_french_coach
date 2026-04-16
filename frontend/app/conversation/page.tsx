/**
 * Conversation Page - AI French Tutor Chat Interface
 * ===================================================
 *
 * This is the main conversation/chat interface for the French Coach application.
 * It provides a real-time chat interface with an AI French tutor, supporting:
 * - Text-based conversation with context-aware responses
 * - Voice input (speech-to-text) for practicing pronunciation
 * - Text-to-speech (TTS) for listening practice
 * - Multiple conversation modes (Chat, Introduction, Traveling, Daily Conversations)
 * - Auto-reply functionality for hands-free conversation flow
 *
 * **Architecture:**
 * - Frontend: Next.js page component with React hooks for state management
 * - Backend: Python FastAPI server (localhost:8000) for AI responses and transcription
 * - Speech: Web Speech API for TTS, MediaRecorder API for voice input
 *
 * **Conversation Modes:**
 * - chat: General French conversation practice
 * - introduction: Self-introduction scenarios
 * - traveling: Travel-related conversations
 * - daily_conversations: Everyday French dialogues
 *
 * **API Endpoints:**
 * - POST /respond: General chat responses
 * - POST /introduction: Introduction mode responses
 * - POST /traveling: Travel mode responses
 * - POST /daily_conversations: Daily conversation responses
 * - POST /transcribe: Audio transcription (STT)
 *
 * **Key Features:**
 * - Real-time message streaming with loading states
 * - Voice recording with visual recording indicator
 * - French TTS (fr-FR) with slower speech rate (0.9x) for learning
 * - Auto-scroll to latest message
 * - Message history maintained in component state
 */

"use client"

// =============================================================================
// IMPORTS
// =============================================================================

// React hooks for state management and side effects
import { useState, useRef, useEffect } from "react"
// Loading spinner component
import Loader from "@/app/components/Loader"
// Button component for actions
import Button from "@/app/components/Button"
// Message send icon
import { FiMessageCircle } from 'react-icons/fi'
// Microphone icon for voice input
import { FaMicrophone } from 'react-icons/fa'
// Toggle switch for auto-reply
import Toggle from "../components/Toggle"

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * Message - Interface for chat messages.
 *
 * @property role - Message sender ("user" or "assistant")
 * @property content - Message text content
 */
interface Message {
    role: "user" | "assistant"
    content: string
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * Home - Main conversation/chat page component.
 *
 * Manages the complete chat interface including:
 * - Message state and history
 * - User input (text and voice)
 * - AI response handling
 * - Text-to-speech playback
 * - Voice recording and transcription
 * - Conversation mode selection
 *
 * @returns JSX.Element - The chat interface
 */
export default function Home() {

    // ---------------------------------------------------------------------------
    // STATE
    // ---------------------------------------------------------------------------

    // Test connection message (debug/development use)
    const [message, setMessage] = useState("")

    // Current user input text
    const [prompt, setPrompt] = useState("")

    // Conversation mode: chat | introduction | traveling | daily_conversations
    const [mode, setMode] = useState<"chat" | "introduction" | "traveling" | "daily_conversations">("chat")

    // Chat message history (user + assistant messages)
    const [messages, setMessages] = useState<Message[]>([])

    // Loading state during API requests
    const [isLoading, setIsLoading] = useState(false)

    // Voice recording state
    const [isRecording, setIsRecording] = useState(false)

    // Text-to-speech playing state
    const [isSpeaking, setIsSpeaking] = useState(false)

    // Auto-reply TTS toggle
    const [autoReply, setAutoReply] = useState(false)

    // Currently speaking message index (for TTS control)
    const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null)

    // ---------------------------------------------------------------------------
    // REFS
    // ---------------------------------------------------------------------------

    // MediaRecorder instance for voice input
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)

    // Audio data chunks during recording
    const audioChunksRef = useRef<Blob[]>([])

    // Reference for auto-scrolling to bottom of messages
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Reference for input field focus management
    const inputRef = useRef<HTMLInputElement>(null)

    // ---------------------------------------------------------------------------
    // EFFECTS
    // ---------------------------------------------------------------------------

    /**
     * Auto-scroll to bottom when messages change.
     * Keeps the latest message visible in the conversation area.
     */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    /**
     * Keep input focused after loading completes.
     * Ensures user can immediately type after receiving a response.
     */
    useEffect(() => {
        inputRef.current?.focus()
    }, [isLoading])

    /**
     * Cleanup TTS on component unmount.
     * Prevents speech synthesis from continuing after leaving the page.
     */
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel()
            }
        }
    }, [])

    // ---------------------------------------------------------------------------
    // API FUNCTIONS
    // ---------------------------------------------------------------------------

    /**
     * Test connection to the backend server.
     * Development/debug function to verify API availability.
     */
    async function getData() {
        const res = await fetch("http://127.0.0.1:8000")
        const data = await res.json()
        setMessage(data.message)
    }

    /**
     * Send text message to AI and receive response.
     *
     * Flow:
     * 1. Validate input
     * 2. Add user message to local state
     * 3. Send to appropriate backend endpoint based on mode
     * 4. Handle response or error
     * 5. Add assistant message to state
     */
    async function sendMessage() {
        if (!prompt.trim()) return

        setIsLoading(true)

        // Create user message and updated history
        const userMessage: Message = { role: "user", content: prompt }
        const updatedHistory = [...messages, userMessage]

        // Update local state
        setMessages(updatedHistory)
        // Switching urls depending on the mode the user wants 
        try {
            let url = "http://127.0.0.1:8000/respond"
            if (mode === "introduction") {
                url = "http://127.0.0.1:8000/introduction"
            } else if (mode === "traveling") {
                url = "http://127.0.0.1:8000/traveling"
            } else if (mode === "daily_conversations") {
                url = "http://127.0.0.1:8000/daily_conversations"
            } const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ message: updatedHistory, }),
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

    /**
     * Start recording audio from user's microphone.
     *
     * Uses MediaRecorder API to capture audio chunks.
     * Requires microphone permissions from the user.
     */
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

    /**
     * Stop recording, transcribe audio, and get AI response.
     *
     * Flow:
     * 1. Stop MediaRecorder and release microphone
     * 2. Send audio blob to /transcribe endpoint
     * 3. Add transcription as user message
     * 4. Get AI response based on selected mode
     * 5. Auto-play TTS if autoReply is enabled
     */
    async function sendAudio() {
        if (!mediaRecorderRef.current || !isRecording) return
        mediaRecorderRef.current.stop()
        setIsRecording(false)
        // Stop all tracks to release the microphone 
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
            const formData = new FormData()
            formData.append("file", audioBlob, "recording.webm")
            setIsLoading(true)
            try {
                const res = await fetch("http://127.0.0.1:8000/transcribe", { method: "POST", body: formData, })
                const data = await res.json()
                if (!res.ok) {
                    const errorMessage: Message = { role: "assistant", 
                        content: "Error: " + data.detail}
                    setMessages(prev => [...prev, errorMessage])
                } else {
                    // Check if transcription is empty
                    if (!data.transcription || data.transcription.trim() === "") {
                        const noSpeechMessage: Message = { role: "assistant", content: data.detail }
                        setMessages(prev => [...prev, noSpeechMessage])
                    } else {
                        // Add transcribed text as user message 
                        const userMessage: Message = { role: "user", content: data.transcription }
                        const updatedHistory = [...messages, userMessage]
                        setMessages(updatedHistory)
                        // Now get AI response using the same mode endpoint 
                        let url = "http://127.0.0.1:8000/respond"
                        if (mode === "introduction") {
                            url = "http://127.0.0.1:8000/introduction"
                        } else if (mode === "traveling") {
                            url = "http://127.0.0.1:8000/traveling"
                        } else if (mode === "daily_conversations") {
                            url = "http://127.0.0.1:8000/daily_conversations"
                        }
                        const aiRes = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ message: updatedHistory, }) })
                        const aiData = await aiRes.json()
                        if (!aiRes.ok) {
                            const errorMessage: Message = { role: "assistant", content: "Error: " + aiData.detail || "Something went wrong" }
                            setMessages(prev => [...prev, errorMessage])
                        } else {
                            const assistantMessage: Message = { role: "assistant", content: aiData.reply }
                            setMessages(prev => [...prev, assistantMessage])
                            // Auto-play if autoReply is enabled
                            if (autoReply) {
                                // Calculate the index of the new assistant message
                                const newMessageIndex = messages.length + 1
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

    //Function to cancel the recording
    function cancelAudio() {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
            setIsRecording(false)
            audioChunksRef.current = []
        }
    }

/**
 * Speak text using Web Speech API TTS.
 *
 * Configuration:
 * - Language: fr-FR (French)
 * - Rate: 0.9 (slightly slower for language learning)
 *
 * @param text - Text to speak
 * @param messageId - Index of message being spoken (for UI state)
 */
function speak(text: string, messageId: number) {
    if (!window.speechSynthesis) {
        alert("Text-to-speech is not supported in your browser")
        return
    }
    // Cancel any ongoing speech 
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "fr-FR" // French language 
    utterance.rate = 0.9 // Slightly slower for language learning 
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

/**
 * Stop current TTS playback.
 * Cancels any ongoing speech synthesis.
 */
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
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Main container: full height, flex column layout, gray background */}
        {/* Header: App title + Mode selector */}
        <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white shrink-0">
            {/* App branding */}
            <h1 className="text-2xl font-bold text-gray-900">French Coach</h1>
            {/* Conversation mode selector */}
            <div>
                <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1"> Mode: </label>
                <select id="mode" value={mode} onChange={(e) => setMode(e.target.value as typeof mode)} className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" disabled={isLoading} >
                    <option value="chat">Chat</option>
                    <option value="introduction">Introduction</option>
                    <option value="traveling">Traveling</option>
                    <option value="daily_conversations">Daily Conversations</option>
                </select>
            </div>
        </div>
        {/* Scrollable Conversation Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 relative">
            {/* Recording Indicator Overlay */}
            {isRecording && (<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-pulse"> <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                    <span className="text-sm font-medium">Recording...</span>
                </div>
            </div>
            )}
            {/* Messages container */}
            <div className="max-w-2xl mx-auto space-y-4">
                {/* Empty state prompt */}
                {messages.length === 0 && (<div className="text-center text-gray-400 mt-20"> Start a conversation in French! </div>)}
                {messages.map((msg, index) => (
                    <div key={index} className={`p-4 rounded-lg ${msg.role === "user" ? "bg-blue-50 border border-blue-200 ml-auto max-w-[80%]" : "bg-white border border-gray-200 mr-auto max-w-[80%]"}`}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <span className={`text-xs font-semibold ${msg.role === "user" ? "text-blue-700" : "text-gray-700"}`}>
                                {msg.role === "user" ? "You" : "Assistant"}
                            </span>
                            {msg.role === "assistant" && (
                                <button
                                    onClick={() => isSpeaking && speakingMessageId === index ? stopSpeaking() : speak(msg.content, index)}
                                    className={`text-xs px-2 py-1 rounded-full transition-colors cursor-pointer ${isSpeaking && speakingMessageId === index ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-blue-100 text-blue-600 hover:bg-blue-200"}`}
                                >
                                    {isSpeaking && speakingMessageId === index ? "⏹ Stop" : "🔊 Listen"}
                                </button>
                            )}
                        </div>
                        <div className="text-gray-800 whitespace-pre-wrap text-sm">{msg.content}</div>
                    </div>
                ))}
                <div className="">{isLoading && <Loader />}</div>

            </div>
            {/* Dummy element to scroll to */ }
            <div ref={messagesEndRef} />
        </div>

        {/* Fixed Input Area */ }
        <div className="border-t border-gray-200 bg-white px-4 py-3 shrink-0">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
                <div className="flex items-center gap-1 flex-col">
                    <Toggle checked={autoReply} onCheckedChange={setAutoReply} className="scale-[0.7]"/>
                    <span className="text-xs">{autoReply ? "Auto-reply: ON" : "Auto-reply: OFF"}</span>
                </div>
                <input ref={inputRef} id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())} className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Type your message..." disabled={isLoading} />
                <Button className="cursor-pointer shrink-0" children={<FiMessageCircle />} onClick={sendMessage} disabled={isLoading || !prompt.trim() || isRecording} />
                <Button className="cursor-pointer shrink-0" children={<FaMicrophone />} onPointerDown={recordAudio} onPointerUp={sendAudio} onPointerCancel={cancelAudio} disabled={isLoading || isRecording} />
            </div>
            {isRecording && (<div className="text-center text-red-500 text-xs mt-2"> Recording... Release to send </div>)}
        </div>
    </div>
    )
}
