'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaCheck, FaArrowRight, FaHome, FaLock, FaLockOpen, FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'
import { pronouns, definiteArticles, indefiniteArticles, comparisonExamples, practiceQuestions } from './data'

interface SectionReview {
  pronouns: boolean
  definite: boolean
  indefinite: boolean
  comparison: boolean
}

interface PracticeAnswer {
  questionId: number
  selectedOption: number
  isCorrect: boolean
}

export default function A1LessonPage() {
  const [playCounts, setPlayCounts] = useState<{[key: string]: number}>({})
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [reviewedSections, setReviewedSections] = useState<SectionReview>({
    pronouns: false,
    definite: false,
    indefinite: false,
    comparison: false
  })
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)
  const [practiceAnswers, setPracticeAnswers] = useState<PracticeAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a1Lesson1Progress')
    if (saved) {
      const parsed = JSON.parse(saved)
      setReviewedSections(parsed.reviewedSections || { pronouns: false, definite: false, indefinite: false, comparison: false })
      setPracticeAnswers(parsed.practiceAnswers || [])
      setCurrentPracticeIndex(parsed.currentPracticeIndex || 0)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('a1Lesson1Progress', JSON.stringify({
        reviewedSections,
        practiceAnswers,
        currentPracticeIndex
      }))
    }
  }, [reviewedSections, practiceAnswers, currentPracticeIndex, isClient])

  const playAudio = (audioSrc: string, id: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(audioSrc)
    audioRef.current = audio
    setCurrentlyPlaying(id)

    audio.play().catch(() => {
      console.log('Audio playback failed for:', id)
    })

    audio.onended = () => {
      setCurrentlyPlaying(null)
      setPlayCounts(prev => ({
        ...prev,
        [id]: (prev[id] || 0) + 1
      }))
    }
  }

  const markSectionReviewed = (section: keyof SectionReview) => {
    setReviewedSections(prev => ({ ...prev, [section]: true }))
  }

  const handlePracticeAnswer = (optionIndex: number) => {
    if (showFeedback) return
    setSelectedOption(optionIndex)
  }

  const submitAnswer = () => {
    if (selectedOption === null) return
    
    const currentQuestion = practiceQuestions[currentPracticeIndex]
    const isCorrect = selectedOption === currentQuestion.correct
    
    setPracticeAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect
    }])
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    setSelectedOption(null)
    setShowFeedback(false)
    setCurrentPracticeIndex(prev => prev + 1)
  }

  const allSectionsReviewed = Object.values(reviewedSections).every(v => v)
  const practiceComplete = practiceAnswers.length === practiceQuestions.length
  const correctAnswers = practiceAnswers.filter(a => a.isCorrect).length
  const lessonComplete = allSectionsReviewed && practiceComplete

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-32">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to home link */}
        <div className="mb-6">
          <Link
            href="/classes/A1"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
          >
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A1 Lessons</span>
          </Link>
        </div>

        {/* Lesson Header */}
        <LessonHeader />

        {/* Progress Overview */}
        <ProgressBar 
          reviewedSections={reviewedSections}
          practiceProgress={practiceAnswers.length}
          totalPractice={practiceQuestions.length}
        />

        {/* Section 1: Subject Pronouns */}
        <SectionCard
          title="Subject Personal Pronouns"
          subtitle="Learn who is doing the action"
          icon="👤"
          isReviewed={reviewedSections.pronouns}
          onMarkReviewed={() => markSectionReviewed('pronouns')}
          index={0}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pronouns.map((pronoun, idx) => (
              <PronounCard
                key={pronoun.id}
                pronoun={pronoun}
                playCount={playCounts[pronoun.id] || 0}
                isPlaying={currentlyPlaying === pronoun.id}
                onPlay={() => playAudio(pronoun.audioSrc, pronoun.id)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* Section 2: Definite Articles */}
        <SectionCard
          title="Definite Articles (the)"
          subtitle="Use these when talking about specific things"
          icon="📌"
          isReviewed={reviewedSections.definite}
          onMarkReviewed={() => markSectionReviewed('definite')}
          index={1}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {definiteArticles.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                type="definite"
                playCount={playCounts[article.id] || 0}
                isPlaying={currentlyPlaying === article.id}
                onPlay={() => playAudio(article.audioSrc, article.id)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* Section 3: Indefinite Articles */}
        <SectionCard
          title="Indefinite Articles (a, an, some)"
          subtitle="Use these when talking about things in general"
          icon="📝"
          isReviewed={reviewedSections.indefinite}
          onMarkReviewed={() => markSectionReviewed('indefinite')}
          index={2}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {indefiniteArticles.map((article, idx) => (
              <ArticleCard
                key={article.id}
                article={article}
                type="indefinite"
                playCount={playCounts[article.id] || 0}
                isPlaying={currentlyPlaying === article.id}
                onPlay={() => playAudio(article.audioSrc, article.id)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* Section 4: Comparison */}
        <SectionCard
          title="Definite vs Indefinite Articles"
          subtitle="See the difference between specific and general"
          icon="🔄"
          isReviewed={reviewedSections.comparison}
          onMarkReviewed={() => markSectionReviewed('comparison')}
          index={3}
        >
          <ComparisonBlock />
        </SectionCard>

        {/* Section 5: Practice */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <span className="text-2xl">✏️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Practice Time</h2>
              <p className="text-sm text-slate-600">Test your understanding with 8 questions</p>
            </div>
          </div>

          {currentPracticeIndex < practiceQuestions.length ? (
            <PracticeCard
              question={practiceQuestions[currentPracticeIndex]}
              questionNumber={currentPracticeIndex + 1}
              totalQuestions={practiceQuestions.length}
              selectedOption={selectedOption}
              showFeedback={showFeedback}
              onSelectOption={handlePracticeAnswer}
              onSubmit={submitAnswer}
              onNext={nextQuestion}
            />
          ) : (
            <PracticeCompleteCard 
              score={correctAnswers}
              total={practiceQuestions.length}
            />
          )}
        </div>

        {/* Completion Section */}
        <AnimatePresence>
          {lessonComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaCheck className="text-white text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Nice work — you've completed A1 Lesson 1!
              </h2>
              <p className="text-slate-600 mb-6">
                You now know the basic subject pronouns and articles in French.
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{correctAnswers}/8</div>
                  <div className="text-sm text-slate-500">Practice Score</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {lessonComplete ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600">Lesson complete! Ready to continue.</span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-600">
                  {!allSectionsReviewed 
                    ? 'Review all sections to continue' 
                    : 'Complete all practice questions to continue'}
                </span>
              </>
            )}
          </div>
          <button
            disabled={!lessonComplete}
            onClick={() => window.location.href = '/classes/A1/lesson2'}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              lessonComplete
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

function LessonHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
        <span>A1 Lesson 1</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        Personal Pronouns and Articles
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        Learn how to say who is doing the action and how to use 'the', 'a', and 'an' in French.
      </p>
      <p className="text-sm text-slate-500">
        Read the examples, listen to the words, and complete the practice before moving on.
      </p>
    </motion.div>
  )
}

function ProgressBar({ 
  reviewedSections, 
  practiceProgress, 
  totalPractice 
}: { 
  reviewedSections: SectionReview
  practiceProgress: number
  totalPractice: number
}) {
  const sections = ['pronouns', 'definite', 'indefinite', 'comparison'] as const
  const completedSections = sections.filter(s => reviewedSections[s]).length
  const totalProgress = ((completedSections + practiceProgress / totalPractice) / 5) * 100

  return (
    <div className="mb-8 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">Lesson Progress</span>
        <span className="text-sm font-medium text-purple-600">{Math.round(totalProgress)}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${totalProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
        <span>{completedSections}/4 sections reviewed</span>
        <span>•</span>
        <span>{practiceProgress}/{totalPractice} practice questions</span>
      </div>
    </div>
  )
}

function SectionCard({ 
  title, 
  subtitle, 
  icon, 
  isReviewed, 
  onMarkReviewed, 
  index, 
  children 
}: {
  title: string
  subtitle: string
  icon: string
  isReviewed: boolean
  onMarkReviewed: () => void
  index: number
  children: React.ReactNode
}) {
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-amber-500'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-8"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Section Header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center text-white shadow-md`}>
                <span className="text-2xl">{icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                <p className="text-sm text-slate-600">{subtitle}</p>
              </div>
            </div>
            <button
              onClick={onMarkReviewed}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isReviewed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {isReviewed ? (
                <><FaCheck size={14} /> Reviewed</>
              ) : (
                <><FaCheck size={14} /> Mark as Reviewed</>
              )}
            </button>
          </div>
        </div>

        {/* Section Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

function PronounCard({ pronoun, playCount, isPlaying, onPlay, index }: {
  pronoun: typeof pronouns[0]
  playCount: number
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-purple-300 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">{pronoun.french}</h3>
          <p className="text-sm text-purple-600 font-medium">/{pronoun.phonetic}/</p>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${pronoun.french}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying
              ? 'bg-purple-100 text-purple-600 animate-pulse'
              : 'bg-white text-purple-600 hover:bg-purple-50 shadow-sm'
          }`}
        >
          <FaPlay size={16} />
        </button>
      </div>
      <p className="text-sm text-slate-600 mb-2">{pronoun.english}</p>
      <div className="text-sm text-slate-500 bg-white rounded-lg p-2 border border-slate-100">
        <span className="font-medium text-slate-700">{pronoun.example}</span>
        <span className="text-slate-400"> — {pronoun.exampleEnglish}</span>
      </div>
    </motion.div>
  )
}

function ArticleCard({ article, type, playCount, isPlaying, onPlay, index }: {
  article: typeof definiteArticles[0] | typeof indefiniteArticles[0]
  type: 'definite' | 'indefinite'
  playCount: number
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  const bgColor = type === 'definite' ? 'bg-blue-50 border-blue-200' : 'bg-emerald-50 border-emerald-200'
  const textColor = type === 'definite' ? 'text-blue-600' : 'text-emerald-600'
  const icon = type === 'definite' ? '📌' : '📝'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`${bgColor} rounded-xl p-4 border hover:shadow-sm transition-all`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-slate-800">{article.article}</span>
          <span className={`text-sm ${textColor} font-medium`}>/{article.phonetic}/</span>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${article.article}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying
              ? 'bg-white text-purple-600 animate-pulse'
              : 'bg-white text-slate-600 hover:text-purple-600 shadow-sm'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{article.usage}</p>
      <p className="text-sm font-medium text-slate-700">
        {article.example} <span className="text-slate-500">= {article.english}</span>
      </p>
    </motion.div>
  )
}

function ComparisonBlock() {
  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {comparisonExamples.map((ex, idx) => (
            <div key={idx} className="bg-white rounded-lg p-3 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400 uppercase">{ex.noun}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">{ex.definite.split(' ')[0]}</span>
                  <span className="text-slate-600">{ex.definiteEnglish}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm font-medium">{ex.indefinite.split(' ')[0]}</span>
                  <span className="text-slate-600">{ex.indefiniteEnglish}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2">💡 Key Tips</h4>
        <ul className="space-y-2 text-sm text-purple-700">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Use <strong>definite articles</strong> (le, la, l', les) when you mean a specific thing.</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Use <strong>indefinite articles</strong> (un, une, des) when you mean one thing in general, or some things.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

function PracticeCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  showFeedback,
  onSelectOption,
  onSubmit,
  onNext
}: {
  question: typeof practiceQuestions[0]
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  showFeedback: boolean
  onSelectOption: (index: number) => void
  onSubmit: () => void
  onNext: () => void
}) {
  const isCorrect = selectedOption === question.correct
  const feedbackMessages = [
    "Nice 😏",
    "Good catch",
    "You got it",
    "Perfect",
    "Well done"
  ]
  const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          question.topic === 'pronouns' 
            ? 'bg-purple-100 text-purple-700'
            : question.topic === 'definite'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-emerald-100 text-emerald-700'
        }`}>
          {question.topic}
        </span>
      </div>

      {/* Question Prompt */}
      <h3 className="text-lg font-medium text-slate-800 mb-6">{question.prompt}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelectOption(idx)}
            disabled={showFeedback}
            className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
              showFeedback
                ? idx === question.correct
                  ? 'border-green-400 bg-green-50 text-green-800'
                  : selectedOption === idx
                  ? 'border-red-400 bg-red-50 text-red-800'
                  : 'border-slate-200 text-slate-400'
                : selectedOption === idx
                ? 'border-purple-500 bg-purple-50 text-purple-800'
                : 'border-slate-200 hover:border-purple-300 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                showFeedback
                  ? idx === question.correct
                    ? 'border-green-500 bg-green-500'
                    : selectedOption === idx
                    ? 'border-red-500 bg-red-500'
                    : 'border-slate-300'
                  : selectedOption === idx
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-slate-300'
              }`}>
                {showFeedback && idx === question.correct && <FaCheck size={12} className="text-white" />}
                {showFeedback && selectedOption === idx && idx !== question.correct && <span className="text-white text-xs">×</span>}
                {!showFeedback && selectedOption === idx && <FaCheck size={12} className="text-white" />}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`p-4 rounded-xl mb-4 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
            {isCorrect ? randomMessage : "Careful now…"}
          </p>
          <p className="text-sm text-slate-600">{question.explanation}</p>
        </motion.div>
      )}

      {/* Action Button */}
      {!showFeedback ? (
        <button
          onClick={onSubmit}
          disabled={selectedOption === null}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            selectedOption !== null
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={onNext}
          className="w-full py-3 rounded-xl font-semibold bg-purple-500 text-white hover:bg-purple-600 transition-all flex items-center justify-center gap-2"
        >
          Next Question
          <FaChevronRight size={14} />
        </button>
      )}
    </motion.div>
  )
}

function PracticeCompleteCard({ score, total }: { score: number; total: number }) {
  const percentage = (score / total) * 100
  const isGood = percentage >= 70

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center"
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
        isGood ? 'bg-green-100' : 'bg-amber-100'
      }`}>
        <span className="text-3xl">{isGood ? '🎉' : '👍'}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">Practice Complete!</h3>
      <p className="text-slate-600 mb-4">
        You scored {score} out of {total}
      </p>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden max-w-xs mx-auto mb-4">
        <div 
          className={`h-full ${isGood ? 'bg-green-500' : 'bg-amber-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={`text-sm font-medium ${isGood ? 'text-green-600' : 'text-amber-600'}`}>
        {isGood 
          ? "Great job! You're ready to move on." 
          : "Good effort! Review the lesson and try again."}
      </p>
    </motion.div>
  )
}
