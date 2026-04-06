'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaCheck, FaArrowRight, FaHome } from 'react-icons/fa'
import Link from 'next/link'
import { greetings, sections, Greeting } from './data'

interface PlayCount {
  [key: string]: number
}

export default function GreetingsLessonPage() {
  const [playCounts, setPlayCounts] = useState<PlayCount>({})
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('greetingsLessonProgress')
    if (saved) {
      setPlayCounts(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('greetingsLessonProgress', JSON.stringify(playCounts))
    }
  }, [playCounts, isClient])

  const playAudio = (greeting: Greeting) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(greeting.audioSrc)
    audioRef.current = audio
    setCurrentlyPlaying(greeting.id)

    audio.play().catch(() => {
      console.log('Audio playback failed for:', greeting.french)
    })

    audio.onended = () => {
      setCurrentlyPlaying(null)
      setPlayCounts(prev => ({
        ...prev,
        [greeting.id]: (prev[greeting.id] || 0) + 1
      }))
    }
  }

  const isGreetingComplete = (greeting: Greeting) => {
    return (playCounts[greeting.id] || 0) >= 2
  }

  const completedCount = greetings.filter(g => isGreetingComplete(g)).length
  const allComplete = completedCount === greetings.length
  const progressPercent = (completedCount / greetings.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back to home link */}
        <div className="mb-6">
          <Link
            href="/classes/A0"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
          >
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A0 Lessons</span>
          </Link>
        </div>

        {/* Lesson Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-3"
          >
            A0 Lesson 3: French Greetings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Master essential French greetings for everyday conversations
          </motion.p>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">👋</span> How to Practice
          </h2>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold">1.</span>
              <span>Tap each greeting to hear how it sounds in French</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold">2.</span>
              <span>Repeat the sound out loud to practice pronunciation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold">3.</span>
              <span>Use the English meaning and phonetic guide to help you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold">4.</span>
              <span>Play every greeting at least twice to unlock the next lesson</span>
            </li>
          </ul>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              {completedCount} of {greetings.length} greetings completed
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Greeting Sections */}
        {sections.map((section, sectionIndex) => (
          <div key={section.name} className="mb-10">
            <SectionHeader name={section.name} index={sectionIndex} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {greetings.slice(section.start, section.end).map((greeting, idx) => (
                <GreetingCard
                  key={greeting.id}
                  greeting={greeting}
                  playCount={playCounts[greeting.id] || 0}
                  isPlaying={currentlyPlaying === greeting.id}
                  isComplete={isGreetingComplete(greeting)}
                  onPlay={() => playAudio(greeting)}
                  index={section.start + idx}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${allComplete ? 'bg-green-500' : 'bg-amber-500'}`} />
            <span className="text-sm text-slate-600">
              {allComplete
                ? 'All greetings complete! Great job!'
                : 'Play every greeting twice to unlock the next topic.'}
            </span>
          </div>
          <button
            disabled={!allComplete}
            onClick={() => window.location.href = '/classes/A0/lesson4'}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              allComplete
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Next Topic</span>
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ name, index }: { name: string; index: number }) {
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500'
  ]
  const icons = ['👋', '👋', '💬']

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center text-white shadow-md`}>
          <span className="text-lg">{icons[index]}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">{name}</h2>
      </div>
      <div className="mt-2 h-0.5 bg-gradient-to-r from-purple-200 to-transparent" />
    </motion.div>
  )
}

interface GreetingCardProps {
  greeting: Greeting
  playCount: number
  isPlaying: boolean
  isComplete: boolean
  onPlay: () => void
  index: number
}

function GreetingCard({ greeting, playCount, isPlaying, isComplete, onPlay, index }: GreetingCardProps) {
  const getBorderColor = () => {
    if (isComplete) return 'border-green-400 bg-green-50/50'
    if (playCount === 1) return 'border-amber-300 bg-amber-50/30'
    return 'border-slate-200 bg-white'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`relative rounded-xl border-2 p-4 transition-all hover:shadow-md ${getBorderColor()}`}
    >
      {/* Completion Badge */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md z-10"
          >
            <FaCheck className="text-white" size={12} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* French Greeting */}
      <h3 className="text-xl font-bold text-slate-800 mb-1">{greeting.french}</h3>

      {/* English Meaning */}
      <p className="text-sm text-slate-600 mb-2">{greeting.english}</p>

      {/* Phonetic Guide */}
      <p className="text-sm font-medium text-purple-600 mb-3 italic">
        /{greeting.phonetic}/
      </p>

      {/* Play Button & Counter */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${greeting.french}`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isPlaying
              ? 'bg-purple-100 text-purple-600 animate-pulse'
              : 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-md'
          }`}
        >
          <FaPlay size={14} />
          <span>{isPlaying ? 'Playing...' : 'Play'}</span>
        </button>

        <span className={`text-sm font-medium ${
          isComplete ? 'text-green-600' : 'text-slate-500'
        }`}>
          Played {playCount}/2
        </span>
      </div>
    </motion.div>
  )
}
