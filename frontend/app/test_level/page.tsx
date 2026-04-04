"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { 
  UilArrowRight, 
  UilArrowLeft,
  UilCheckCircle, 
  UilMicrophone,
  UilHeadphones,
  UilBookOpen,
  UilPen,
  UilPlay,
  UilPause,
  UilSpinner,
  UilStar,
  UilAward,
  UilBrain,
  UilMessage,
  UilSmile,
  UilClock
} from '@iconscout/react-unicons'

interface Answer {
  reading?: number
  listening?: number
  writing?: string
  speaking?: string
}

export default function TestLevel() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = intro, 1-4 = steps, 5 = processing, 6 = results
  const [answers, setAnswers] = useState<Answer>({})
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{level: string, description: string} | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [encouragement, setEncouragement] = useState("")
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const encouragements = [
    "You're doing great! 🌟",
    "Keep it up! Almost there! 💪",
    "You're amazing! 🎉",
    "Fantastic progress! ✨",
    "You're a natural! 🌟"
  ]

  useEffect(() => {
    if (currentStep > 0 && currentStep < 5) {
      setEncouragement(encouragements[Math.floor(Math.random() * encouragements.length)])
    }
  }, [currentStep])

  useEffect(() => {
    if (containerRef.current && currentStep > 0 && currentStep < 6) {
      gsap.fromTo(".step-content", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      )
    }
  }, [currentStep])

  const startTest = () => {
    gsap.to(".intro-card", {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => setCurrentStep(1)
    })
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      submitTest()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      setCurrentStep(0)
    }
  }

  const submitTest = () => {
    setCurrentStep(5)
    setIsLoading(true)
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock result calculation based on answers
      const mockLevel = Math.random() > 0.5 ? "A1" : Math.random() > 0.5 ? "A2" : "B1"
      const levels: Record<string, {level: string, description: string}> = {
        "A1": { level: "A1 - Beginner", description: "You're just starting your French journey! We'll help you build a strong foundation with basic vocabulary and simple conversations." },
        "A2": { level: "A2 - Elementary", description: "You know the basics! Let's expand your vocabulary and help you handle everyday situations with confidence." },
        "B1": { level: "B1 - Intermediate", description: "Great progress! You can communicate in most situations. We'll help you refine your grammar and express more complex ideas." }
      }
      
      setResult(levels[mockLevel])
      setIsLoading(false)
      setCurrentStep(6)
    }, 3000)
  }

  const playAudio = () => {
    setIsPlaying(true)
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 3000)
  }

  const startRecording = async () => {
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
      
      mediaRecorder.onstop = () => {
        setRecordingComplete(true)
        setAnswers({...answers, speaking: "recording_completed"})
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      
      // Auto stop after 10 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorder.state === "recording") {
          stopRecording()
        }
      }, 10000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  const progressPercentage = currentStep === 0 ? 0 : currentStep === 6 ? 100 : (currentStep / 4) * 100

  // Step 1: Reading Questions
  const readingQuestions = [
    {
      question: "What does 'Bonjour' mean?",
      options: ["Goodbye", "Hello", "Thank you", "Please"],
      correct: 1
    },
    {
      question: "Choose the correct translation: 'The cat sleeps'",
      options: ["Le chat dort", "La chat dort", "Le chat dormir", "Les chats dorment"],
      correct: 0
    }
  ]

  // Step 2: Listening Questions
  const listeningQuestions = [
    {
      instruction: "Listen to the audio and select what you hear:",
      options: ["Comment ça va?", "Comment allez-vous?", "Ça va bien, merci", "Je vais bien"]
    }
  ]

  // Intro Screen
  if (currentStep === 0) {
    return (
      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/home" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  FrenchCoach
                </span>
              </Link>
              <Link 
                href="/home" 
                className="text-sm text-slate-600 hover:text-purple-600 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-sm font-medium text-purple-700 mb-6">
                <UilBrain className="w-4 h-4" />
                <span>Smart Assessment</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                Let&apos;s Find Your French Level
              </h1>
              <p className="text-lg text-slate-600">
                Quick, friendly test to personalize your learning journey
              </p>
            </div>

            {/* Intro Card */}
            <div className="intro-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-white/60">
              {/* AI Assistant Message */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                  <UilSmile className="w-6 h-6 text-white" />
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl rounded-tl-none p-4">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Hi there! I&apos;m your AI tutor. I&apos;ll help you find your perfect starting level so we can create a personalized learning plan just for you. 
                  </p>
                </div>
              </div>

              {/* What to expect */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <UilBookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Reading & Vocabulary</p>
                    <p className="text-xs text-slate-500">Simple multiple choice</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UilHeadphones className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Listening</p>
                    <p className="text-xs text-slate-500">Audio comprehension</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <UilPen className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Writing</p>
                    <p className="text-xs text-slate-500">Short sentence writing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <UilMicrophone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Speaking</p>
                    <p className="text-xs text-slate-500">Voice recording</p>
                  </div>
                </div>
              </div>

              {/* Time estimate */}
              <div className="flex items-center justify-center gap-2 text-slate-500 mb-8">
                <UilClock className="w-4 h-4" />
                <span className="text-sm">Takes about 3–5 minutes</span>
              </div>

              {/* Start Button */}
              <button
                onClick={startTest}
                className="w-full group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Start Test
                <UilArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-xs text-slate-400 mt-4">
                No pressure! This is just to help us personalize your experience. 😊
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Processing Screen
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
              <UilBrain className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto animate-ping opacity-20"></div>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Analyzing your results...
          </h2>
          <p className="text-slate-600">
            Our AI is evaluating your responses to find your perfect level. Just a moment!
          </p>
        </div>
      </div>
    )
  }

  // Results Screen
  if (currentStep === 6 && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/home" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-semibold">FrenchCoach</span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-white/60 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full text-sm font-medium text-amber-700 mb-6">
                <UilAward className="w-4 h-4" />
                <span>Assessment Complete!</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Your Level: {result.level}
              </h2>

              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6"></div>

              <p className="text-slate-600 mb-8 leading-relaxed">
                {result.description}
              </p>

              {/* Level Badge */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(3)].map((_, i) => (
                    <UilStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-600">
                  Based on your responses, we recommend starting with <strong>{result.level}</strong> lessons.
                </p>
              </div>

              <Link
                href="/conversation"
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-[1.02]"
              >
                Start Learning
                <UilArrowRight className="w-5 h-5" />
              </Link>

              <p className="text-xs text-slate-400 mt-4">
                You can always retake this test later from your profile settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Assessment Steps (1-4)
  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-semibold">FrenchCoach</span>
            </Link>
            <button 
              onClick={() => setCurrentStep(0)}
              className="text-sm text-slate-600 hover:text-purple-600 transition-colors"
            >
              Exit Test
            </button>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Step {currentStep} of 4
            </span>
            <span className="text-sm text-purple-600 font-medium">
              {encouragement}
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
            //   style={{ width: `${progressPercentage}%` }}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="step-content bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-white/60">
            {/* Step 1: Reading & Vocabulary */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center">
                    <UilBookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Reading & Vocabulary</h2>
                    <p className="text-sm text-slate-500">Choose the correct answer</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {readingQuestions.map((q, idx) => (
                    <div key={idx} className="space-y-3">
                      <p className="font-medium text-slate-800">{idx + 1}. {q.question}</p>
                      <div className="grid gap-2">
                        {q.options.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => setAnswers({...answers, reading: optIdx})}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              answers.reading === optIdx 
                                ? "border-purple-500 bg-purple-50" 
                                : "border-slate-200 hover:border-purple-300 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-slate-700">{option}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Listening */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center">
                    <UilHeadphones className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Listening</h2>
                    <p className="text-sm text-slate-500">Listen and select what you hear</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 text-center">
                  <button
                    onClick={playAudio}
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto hover:shadow-lg hover:scale-105 transition-all"
                  >
                    {isPlaying ? (
                      <UilPause className="w-8 h-8 text-white" />
                    ) : (
                      <UilPlay className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                  <p className="text-sm text-slate-600 mt-3">
                    {isPlaying ? "Playing..." : "Click to play audio"}
                  </p>
                </div>

                <p className="font-medium text-slate-800 mb-3">What did you hear?</p>
                <div className="grid gap-2">
                  {listeningQuestions[0].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAnswers({...answers, listening: idx})}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        answers.listening === idx 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-slate-700">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Writing */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-xl flex items-center justify-center">
                    <UilPen className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Writing</h2>
                    <p className="text-sm text-slate-500">Write a short description in French</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 mb-6">
                  <p className="font-medium text-slate-800 mb-2">Prompt:</p>
                  <p className="text-slate-700">
                    Describe yourself in 1–2 sentences in French. Include your name and where you&apos;re from.
                  </p>
                </div>

                <textarea
                  value={answers.writing || ""}
                  onChange={(e) => setAnswers({...answers, writing: e.target.value})}
                  placeholder="Ex: Je m'appelle Marie. Je viens de Paris."
                  className="w-full h-40 p-4 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none resize-none text-slate-700 placeholder:text-slate-400"
                />

                <p className="text-sm text-slate-500 mt-2">
                  Don&apos;t worry about perfect grammar — just do your best! 😊
                </p>
              </div>
            )}

            {/* Step 4: Speaking */}
            {currentStep === 4 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl flex items-center justify-center">
                    <UilMicrophone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Speaking</h2>
                    <p className="text-sm text-slate-500">Record your voice</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6">
                  <p className="font-medium text-slate-800 mb-2">Say this in French:</p>
                  <p className="text-lg text-slate-700 italic">
                    &ldquo;Hello, my name is [your name]. I am learning French.&rdquo;
                  </p>
                </div>

                <div className="text-center">
                  {!recordingComplete ? (
                    <div>
                      <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all ${
                          isRecording 
                            ? "bg-red-500 animate-pulse" 
                            : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:scale-105"
                        }`}
                      >
                        <UilMicrophone className="w-10 h-10 text-white" />
                      </button>
                      <p className="text-slate-600 mt-4 font-medium">
                        {isRecording ? "Recording... Click to stop" : "Tap to start recording"}
                      </p>
                      {isRecording && (
                        <p className="text-sm text-slate-500 mt-2">
                          Auto-stops in 10 seconds
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-emerald-50 rounded-2xl p-6">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <UilCheckCircle className="w-8 h-8 text-emerald-600" />
                      </div>
                      <p className="font-medium text-emerald-800">Recording complete!</p>
                      <p className="text-sm text-emerald-600 mt-1">
                        Great job! Our AI will analyze your pronunciation.
                      </p>
                      <button
                        onClick={() => {
                          setRecordingComplete(false)
                          setAnswers({...answers, speaking: undefined})
                        }}
                        className="mt-4 text-sm text-emerald-600 hover:text-emerald-700 underline"
                      >
                        Record again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={handleBack}
                className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-medium hover:border-purple-300 hover:text-purple-600 transition-all flex items-center gap-2"
              >
                <UilArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && answers.reading === undefined) ||
                  (currentStep === 2 && answers.listening === undefined) ||
                  (currentStep === 3 && !answers.writing) ||
                  (currentStep === 4 && !recordingComplete)
                }
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {currentStep === 4 ? "Finish" : "Next"}
                <UilArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}