"use client"
import { useState, useRef } from "react"

interface Message {
    role: "user" | "assistant"
    content: string
}

export default function Home() {

    // State for the test connection message
    const [message, setMessage] = useState("")
    
    // State for the prompt input
    const [prompt, setPrompt] = useState("")
    
    // State for the mode (chat, introduction, traveling, daily_conversations)
    const [mode, setMode] = useState<"chat" | "introduction" | "traveling" | "daily_conversations">("chat")
    
    // State for the series of messages sent to the backend
    const [messages, setMessages] = useState<Message[]>([])
    
    // State for loading
    const [isLoading, setIsLoading] = useState(false)
    
    // State for recording
    const [isRecording, setIsRecording] = useState(false)

    // 
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)

    // 
    const audioChunksRef = useRef<Blob[]>([])


    //Function to test the connection to the backend
    async function getData() {
        const res = await fetch("http://127.0.0.1:8000")
        const data = await res.json()
        setMessage(data.message)
    }

    //Function to send the prompt and history to the backend
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
            }
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: updatedHistory,
                }),
            })
            const data = await res.json()

            if (!res.ok) {
                const errorMessage: Message = { role: "assistant", content: `Error: ${data.detail || "Something went wrong"}` }
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

    //Function to record audio from the user
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

    //Function to send the recorded audio to the backend for transcription and a response
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
                const res = await fetch("http://127.0.0.1:8000/transcribe", {
                    method: "POST",
                    body: formData,
                })
                const data = await res.json()

                if (!res.ok) {
                    const errorMessage: Message = { role: "assistant", content: `Error: ${data.detail || "Transcription failed"}` }
                    setMessages(prev => [...prev, errorMessage])
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
                    
                    const aiRes = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            message: updatedHistory,
                        }),
                    })
                    const aiData = await aiRes.json()

                    if (!aiRes.ok) {
                        const errorMessage: Message = { role: "assistant", content: `Error: ${aiData.detail || "Something went wrong"}` }
                        setMessages(prev => [...prev, errorMessage])
                    } else {
                        const assistantMessage: Message = { role: "assistant", content: aiData.reply }
                        setMessages(prev => [...prev, assistantMessage])
                    }
                }
            } catch (error) {
                const errorMessage: Message = { role: "assistant", content: "Error: Failed to transcribe audio" }
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

    return (
        <div className="max-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">French Coach</h1>

                <div className="mb-6">
                    <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-2">
                        Conversation Mode:
                    </label>
                    <select
                        id="mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value as typeof mode)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        disabled={isLoading}
                    >
                        <option value="chat">Chat</option>
                        <option value="introduction">Introduction</option>
                        <option value="traveling">Traveling</option>
                        <option value="daily_conversations">Daily Conversations</option>
                    </select>
                </div>

                {messages.length > 0 && (
                    <div className="mt-6 space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg ${msg.role === "user"
                                        ? "bg-blue-50 border border-blue-200 ml-8"
                                        : "bg-white border border-gray-200 mr-8"
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-sm font-semibold ${msg.role === "user" ? "text-blue-700" : "text-gray-700"
                                        }`}>
                                        {msg.role === "user" ? "You" : "Assistant"}
                                    </span>
                                </div>
                                <div className="text-gray-800 whitespace-pre-wrap">{msg.content}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Textarea for messages */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            placeholder="Type your message preferably in French or English..."
                            disabled={isLoading}
                        />
                        {prompt.trim() ? <></> : <></>}
                    </div>

                    <div>
                        

                        <button
                            onPointerDown={recordAudio}
                            onPointerUp={sendAudio}
                            onPointerCancel={cancelAudio}
                            disabled={isLoading || isRecording}
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isRecording ? "Recording... (Hold)" : "Hold to Record Audio"}
                        </button>
                    </div>

                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={getData}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        Test Connection
                    </button>
                    {message && <span className="ml-4 text-sm text-gray-500">Status: {message}</span>}
                </div>
            </div>
        </div>
    );
}