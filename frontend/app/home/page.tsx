"use client"
import { useState } from "react"

export default function Home() {
    const [message, setMessage] = useState("")
    const [prompt, setPrompt] = useState("")
    const [reply, setReply] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function getData() {
        const res = await fetch("http://127.0.0.1:8000")
        const data = await res.json()
        setMessage(data.message)
    }

    async function sendMessage() {
        if (!prompt.trim()) return
        
        setIsLoading(true)
        setReply("")
        
        try {
            const res = await fetch("http://127.0.0.1:8000/respond", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: prompt,
                }),
            })
            const data = await res.json()

            if (!res.ok) {
                setReply(`Error: ${data.detail || "Something went wrong"}`)
            } else {
                setReply(data.reply)
            }
        } catch (error) {
            setReply(`Error: Failed to connect to server`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">French Coach</h1>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">
                        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your message:
                        </label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            placeholder="Type your message in French or English..."
                            disabled={isLoading}
                        />
                    </div>
                    
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !prompt.trim()}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? "Sending..." : "Send Message"}
                    </button>
                </div>

                {reply && (
                    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">Reply:</h2>
                        <div className="text-gray-700 whitespace-pre-wrap">{reply}</div>
                    </div>
                )}

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