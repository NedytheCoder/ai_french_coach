'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaHome,
  FaCheck,
  FaChevronRight,
  FaArrowRight,
  FaBookOpen,
  FaGraduationCap,
  FaLightbulb,
  FaTimes,
  FaRedo,
  FaChevronDown,
  FaChevronUp,
  FaVolumeUp,
  FaPlay,
  FaPause
} from 'react-icons/fa'
import Link from 'next/link'
import {
  pronunciationPatterns,
  soundComparisons,
  guidedExamples,
  practiceQuestions,
  sectionIds,
  SectionId,
  getPerformanceMessage,
  PronunciationPattern,
  SoundComparison,
  GuidedExample
} from './data'

interface LessonProgress {
  reviewedSections: SectionId[]
  practiceAnswers: { questionId: number; selectedOption: number; isCorrect: boolean }[]
  practiceCompleted: boolean
  lessonCompleted: boolean
}

const feedbackMessages = {
  correct: ['Nice 😏', 'Good catch', "That's right", "You're hearing the pattern", 'Well done!', 'Perfect!'],
  incorrect: ['Careful now…', 'Almost there', 'Keep trying', 'Not quite', 'Review the pattern']
}

function getRandomFeedback(isCorrect: boolean) {
  const messages = isCorrect ? feedbackMessages.correct : feedbackMessages.incorrect
  return messages[Math.floor(Math.random() * messages.length)]
}

export default function A1Lesson7Page() {
  const [reviewedSections, setReviewedSections] = useState<SectionId[]>([])
  const [practiceAnswers, setPracticeAnswers] = useState<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>([])
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a1Lesson7Progress')
    if (saved) {
      const parsed: LessonProgress = JSON.parse(saved)
      setReviewedSections(parsed.reviewedSections || [])
      setPracticeAnswers(parsed.practiceAnswers || [])
      setPracticeCompleted(parsed.practiceCompleted || false)
      setLessonCompleted(parsed.lessonCompleted || false)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('a1Lesson7Progress', JSON.stringify({
        reviewedSections,
        practiceAnswers,
        practiceCompleted,
        lessonCompleted
      }))
    }
  }, [reviewedSections, practiceAnswers, practiceCompleted, lessonCompleted, isClient])

  const markSectionReviewed = (sectionId: SectionId) => {
    if (!reviewedSections.includes(sectionId)) {
      setReviewedSections(prev => [...prev, sectionId])
    }
  }

  const allSectionsReviewed = sectionIds.every(id => reviewedSections.includes(id))
  const practiceScore = practiceAnswers.filter(a => a.isCorrect).length

  const completeLesson = () => {
    if (allSectionsReviewed && practiceCompleted) {
      setLessonCompleted(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back to home */}
        <div className="mb-6">
          <Link
            href="/classes/A1"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A1 Lessons</span>
          </Link>
        </div>

        {/* Lesson Header */}
        <LessonHeader />

        {/* Progress Bar */}
        <ProgressBar reviewedSections={reviewedSections} />

        {/* Sections */}
        <div className="space-y-6">
          <IntroSection
            isReviewed={reviewedSections.includes('intro')}
            onMarkReviewed={() => markSectionReviewed('intro')}
          />

          <CorePatternsSection
            isReviewed={reviewedSections.includes('core-patterns')}
            onMarkReviewed={() => markSectionReviewed('core-patterns')}
          />

          <SoundComparisonsSection
            isReviewed={reviewedSections.includes('sound-comparisons')}
            onMarkReviewed={() => markSectionReviewed('sound-comparisons')}
          />

          <GuidedExamplesSection
            isReviewed={reviewedSections.includes('guided-examples')}
            onMarkReviewed={() => markSectionReviewed('guided-examples')}
          />

          <PracticeSection
            isReviewed={reviewedSections.includes('practice')}
            onMarkReviewed={() => markSectionReviewed('practice')}
            practiceAnswers={practiceAnswers}
            setPracticeAnswers={setPracticeAnswers}
            onComplete={() => setPracticeCompleted(true)}
          />

          {/* Completion Section */}
          <CompletionSection
            isComplete={lessonCompleted}
            canComplete={allSectionsReviewed && practiceCompleted}
            score={practiceScore}
            total={practiceQuestions.length}
            onComplete={completeLesson}
          />
        </div>
      </div>
    </div>
  )
}

function LessonHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <FaGraduationCap size={14} />
          <span>A1 Pronunciation</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Pronunciation Guide II</h1>
        <p className="text-indigo-100 text-lg">
          Learn the most important French sound patterns beyond the alphabet.
        </p>
      </div>

      <div className="p-6 bg-indigo-50 border-t border-indigo-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
            <FaLightbulb className="text-indigo-700" size={14} />
          </div>
          <p className="text-indigo-800 text-sm">
            Listen, compare, repeat, and practice common pronunciation rules that appear in real French words.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ProgressBar({ reviewedSections }: { reviewedSections: SectionId[] }) {
  const totalSections = sectionIds.length
  const completedSections = reviewedSections.length
  const progress = Math.round((completedSections / totalSections) * 100)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 sticky top-4 z-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600">Lesson Progress</span>
        <span className="text-sm font-medium text-indigo-600">{completedSections}/{totalSections} sections</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

interface SectionProps {
  isReviewed: boolean
  onMarkReviewed: () => void
}

function SectionCard({
  id,
  title,
  icon: Icon,
  isReviewed,
  onMarkReviewed,
  children,
  defaultOpen = false
}: {
  id: string
  title: string
  icon: React.ElementType
  isReviewed: boolean
  onMarkReviewed: () => void
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  useEffect(() => {
    if (isOpen) {
      onMarkReviewed()
    }
  }, [isOpen])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isReviewed ? 'bg-green-100' : 'bg-indigo-100'
          }`}>
            {isReviewed ? (
              <FaCheck className="text-green-600" size={18} />
            ) : (
              <Icon className="text-indigo-600" size={18} />
            )}
          </div>
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {isReviewed && (
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Reviewed
            </span>
          )}
          {isOpen ? <FaChevronUp className="text-slate-400" /> : <FaChevronDown className="text-slate-400" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function IntroSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="intro"
      title="Why Patterns Matter"
      icon={FaLightbulb}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          In French, pronunciation is not always obvious from individual letters. Many sounds depend on the letters around them:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <p className="font-medium text-indigo-900 mb-1">Some letters are silent</p>
            <p className="text-sm text-indigo-700">Final consonants often disappear in pronunciation.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <p className="font-medium text-purple-900 mb-1">Some combinations make one sound</p>
            <p className="text-sm text-purple-700">Letter groups like "au" or "oi" create single sounds.</p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
          <h3 className="font-semibold text-amber-800 mb-3">Key principles:</h3>
          <ul className="space-y-2 text-amber-800">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span><strong>Do not</strong> try to pronounce every letter one by one.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span><strong>Look for</strong> sound groups and patterns.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              <span><strong>French pronunciation</strong> becomes easier when you notice repeating rules.</span>
            </li>
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

// Audio Player Component
function AudioPlayButton({ audioSrc, label }: { audioSrc: string; label?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.onended = () => setIsPlaying(false)
    }
    
    if (isPlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <button
      onClick={handlePlay}
      className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
        isPlaying
          ? 'bg-indigo-100 text-indigo-700'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
      aria-label={isPlaying ? 'Pause audio' : `Play audio${label ? `: ${label}` : ''}`}
    >
      {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
      <span className="text-xs">{isPlaying ? 'Playing...' : 'Listen'}</span>
    </button>
  )
}

// Pattern Card Component
function PatternCard({ pattern, index }: { pattern: PronunciationPattern; index: number }) {
  const colors = [
    { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-200 text-blue-800' },
    { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-200 text-green-800' },
    { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-200 text-purple-800' },
    { border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-200 text-amber-800' },
    { border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-700', badge: 'bg-rose-200 text-rose-800' },
  ]
  const color = colors[index % colors.length]

  return (
    <div className={`rounded-xl border-2 overflow-hidden ${color.border}`}>
      {/* Header */}
      <div className={`px-5 py-4 ${color.bg}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mb-2 ${color.badge}`}>
              Pattern {index + 1}
            </span>
            <h3 className="text-lg font-bold text-slate-800">{pattern.title}</h3>
          </div>
        </div>
        <p className={`text-sm mt-2 ${color.text}`}>{pattern.rule}</p>
      </div>

      {/* Examples */}
      <div className="bg-white p-5">
        <p className="text-slate-600 text-sm mb-4">{pattern.explanation}</p>
        
        <div className="space-y-3">
          {pattern.examples.map((example, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-slate-800 text-lg">{example.french}</span>
                  <span className="text-slate-500 text-sm">({example.english})</span>
                </div>
                <div className="text-indigo-600 font-medium text-sm">{example.phonetic}</div>
              </div>
              <AudioPlayButton audioSrc={example.audioSrc} label={example.french} />
            </div>
          ))}
        </div>

        {/* Mistake Note */}
        <div className={`mt-4 pt-4 border-t ${color.border}`}>
          <p className={`text-sm ${color.text}`}>
            <span className="font-medium">Common mistake:</span> {pattern.mistakeNote}
          </p>
        </div>
      </div>
    </div>
  )
}

function CorePatternsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="core-patterns"
      title="Core Pronunciation Patterns"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-6">
        <p className="text-slate-700 leading-relaxed">
          Here are the most important French pronunciation patterns you'll encounter again and again. Each pattern includes example words with audio:
        </p>

        <div className="space-y-4">
          {pronunciationPatterns.map((pattern, idx) => (
            <PatternCard key={pattern.id} pattern={pattern} index={idx} />
          ))}
        </div>

        {/* Very Common Badge */}
        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
              <FaVolumeUp className="text-indigo-700" size={14} />
            </div>
            <div>
              <h4 className="font-semibold text-indigo-900 mb-1">Pro tip</h4>
              <p className="text-indigo-800 text-sm">
                The patterns marked above cover about 80% of common French pronunciation situations. 
                Focus on these first rather than trying to memorize every rule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

// Sound Comparison Card
function SoundComparisonCard({ comparison, index }: { comparison: SoundComparison; index: number }) {
  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-indigo-200 text-indigo-800 mb-1">
          Comparison {index + 1}
        </span>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Left Sound */}
          <div className="bg-indigo-50 rounded-xl p-4 text-center border border-indigo-200">
            <p className="text-xs text-indigo-600 font-medium mb-1 uppercase tracking-wide">{comparison.left.label}</p>
            <p className="text-2xl font-bold text-slate-800 mb-1">{comparison.left.example}</p>
            <p className="text-indigo-600 font-medium">{comparison.left.phonetic}</p>
          </div>

          {/* Right Sound */}
          <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
            <p className="text-xs text-purple-600 font-medium mb-1 uppercase tracking-wide">{comparison.right.label}</p>
            <p className="text-2xl font-bold text-slate-800 mb-1">{comparison.right.example}</p>
            <p className="text-purple-600 font-medium">{comparison.right.phonetic}</p>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-4 italic">
          {comparison.note}
        </p>
      </div>
    </div>
  )
}

function SoundComparisonsSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="sound-comparisons"
      title="Sound Comparison"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Some French sounds are easy to confuse. Compare these pairs side by side:
        </p>

        <div className="space-y-4">
          {soundComparisons.map((comparison, idx) => (
            <SoundComparisonCard key={comparison.id} comparison={comparison} index={idx} />
          ))}
        </div>
      </div>
    </SectionCard>
  )
}

// Guided Example Card
function GuidedExampleCard({ example, index }: { example: GuidedExample; index: number }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-semibold text-slate-800 text-xl">{example.french}</span>
            <span className="text-slate-500 text-sm">({example.english})</span>
          </div>
          <p className="text-indigo-600 font-medium text-lg">{example.phonetic}</p>
        </div>
        <AudioPlayButton audioSrc={example.audioSrc} label={example.french} />
      </div>
    </div>
  )
}

function GuidedExamplesSection({ isReviewed, onMarkReviewed }: SectionProps) {
  return (
    <SectionCard
      id="guided-examples"
      title="Guided Listening & Reading"
      icon={FaBookOpen}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
    >
      <div className="space-y-4">
        <p className="text-slate-700 leading-relaxed">
          Practice hearing how multiple pronunciation patterns work together in real phrases:
        </p>

        <div className="space-y-3">
          {guidedExamples.map((example, idx) => (
            <GuidedExampleCard key={idx} example={example} index={idx} />
          ))}
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-green-800 text-sm">
            <span className="font-medium">Tip:</span> Listen to each phrase multiple times. 
            Try to hear the individual patterns you've learned (like the z sound in "maison" or the nasal vowel in "amis").
          </p>
        </div>
      </div>
    </SectionCard>
  )
}

// Practice Section
function PracticeSection({
  isReviewed,
  onMarkReviewed,
  practiceAnswers,
  setPracticeAnswers,
  onComplete
}: SectionProps & {
  practiceAnswers: { questionId: number; selectedOption: number; isCorrect: boolean }[]
  setPracticeAnswers: React.Dispatch<React.SetStateAction<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>>
  onComplete: () => void
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = practiceQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === practiceQuestions.length - 1
  const score = practiceAnswers.filter(a => a.isCorrect).length
  const total = practiceQuestions.length
  const percentage = Math.round((score / total) * 100)
  const performance = getPerformanceMessage(score, total)

  const handleSelectOption = (index: number) => {
    if (hasSubmitted) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null || hasSubmitted) return

    const isCorrect = selectedOption === currentQuestion.correct
    setFeedback(getRandomFeedback(isCorrect))
    setHasSubmitted(true)

    const newAnswers = [...practiceAnswers, {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect
    }]
    setPracticeAnswers(newAnswers)

    if (isLastQuestion) {
      onMarkReviewed()
    }
  }

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOption(null)
      setHasSubmitted(false)
      setFeedback('')
    } else {
      setShowResults(true)
    }
  }

  const handleRetake = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setHasSubmitted(false)
    setFeedback('')
    setShowResults(false)
    setPracticeAnswers([])
  }

  const handleContinueAnyway = () => {
    onComplete()
  }

  const progress = ((currentQuestionIndex + (hasSubmitted ? 1 : 0)) / practiceQuestions.length) * 100

  if (showResults) {
    return (
      <SectionCard
        id="practice"
        title="Guided Interactive Practice"
        icon={FaCheck}
        isReviewed={isReviewed}
        onMarkReviewed={onMarkReviewed}
        defaultOpen={true}
      >
        <div className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-3xl font-bold mb-4">
              {percentage}%
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2">
              {score}<span className="text-slate-400">/{total}</span>
            </div>
            <p className="text-slate-600">questions correct</p>
          </div>

          {/* Performance Message */}
          <div className={`rounded-xl p-6 border-2 ${
            performance.color === 'green' ? 'bg-green-50 border-green-200' :
            performance.color === 'blue' ? 'bg-blue-50 border-blue-200' :
            'bg-amber-50 border-amber-200'
          }`}>
            <h3 className={`text-xl font-bold mb-3 ${
              performance.color === 'green' ? 'text-green-700' :
              performance.color === 'blue' ? 'text-blue-700' :
              'text-amber-700'
            }`}>
              {performance.title}
            </h3>
            <p className="text-slate-700 leading-relaxed">{performance.message}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {performance.tone === 'high' ? (
              <button
                onClick={handleContinueAnyway}
                className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Lesson Summary</span>
                <FaArrowRight size={18} />
              </button>
            ) : (
              <>
                <button
                  onClick={handleRetake}
                  className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaRedo size={18} />
                  <span>Retake Practice</span>
                </button>
                <button
                  onClick={handleContinueAnyway}
                  className="w-full py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                >
                  Continue Anyway — I'll Review More Later
                </button>
              </>
            )}
          </div>
        </div>
      </SectionCard>
    )
  }

  return (
    <SectionCard
      id="practice"
      title="Guided Interactive Practice"
      icon={FaCheck}
      isReviewed={isReviewed}
      onMarkReviewed={onMarkReviewed}
      defaultOpen={true}
    >
      <div className="space-y-4">
        {/* Progress */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Practice {currentQuestionIndex + 1} of {practiceQuestions.length}
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-medium text-slate-800 mb-6">{currentQuestion.prompt}</h3>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                  hasSubmitted
                    ? idx === currentQuestion.correct
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : selectedOption === idx
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-slate-200 text-slate-400'
                    : selectedOption === idx
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                      : 'border-slate-200 hover:border-indigo-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    hasSubmitted
                      ? idx === currentQuestion.correct
                        ? 'border-green-500 bg-green-500'
                        : selectedOption === idx
                          ? 'border-red-500 bg-red-500'
                          : 'border-slate-300'
                      : selectedOption === idx
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-slate-300'
                  }`}>
                    {hasSubmitted ? (
                      idx === currentQuestion.correct ? (
                        <FaCheck size={12} className="text-white" />
                      ) : selectedOption === idx ? (
                        <FaTimes size={12} className="text-white" />
                      ) : null
                    ) : selectedOption === idx ? (
                      <FaCheck size={12} className="text-white" />
                    ) : null}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {hasSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 mb-4 ${
                selectedOption === currentQuestion.correct
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-amber-50 border border-amber-200'
              }`}
            >
              <p className={`font-medium mb-1 ${
                selectedOption === currentQuestion.correct ? 'text-green-700' : 'text-amber-700'
              }`}>
                {feedback}
              </p>
              <p className="text-sm text-slate-600">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          {/* Submit/Next Button */}
          <button
            onClick={hasSubmitted ? handleNext : handleSubmit}
            disabled={selectedOption === null}
            className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>
              {hasSubmitted
                ? isLastQuestion
                  ? 'See My Results'
                  : 'Next Question'
                : 'Check Answer'}
            </span>
            <FaChevronRight size={16} />
          </button>
        </div>
      </div>
    </SectionCard>
  )
}

// Completion Section
function CompletionSection({
  isComplete,
  canComplete,
  score,
  total,
  onComplete
}: {
  isComplete: boolean
  canComplete: boolean
  score: number
  total: number
  onComplete: () => void
}) {
  const percentage = Math.round((score / total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-1">
          {isComplete ? 'Lesson Complete!' : 'Complete the Lesson'}
        </h2>
        <p className="text-indigo-100">
          {isComplete
            ? "You've completed Pronunciation Guide II."
            : "Review all sections and complete the practice to finish."}
        </p>
      </div>

      <div className="p-6">
        {isComplete ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">
                {score}<span className="text-slate-400">/{total}</span>
              </div>
              <div className="text-lg text-slate-600">Practice Score: {percentage}%</div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <p className="text-green-800 font-medium mb-2">You now understand many of the most common French pronunciation patterns!</p>
              <p className="text-green-700 text-sm">Keep listening often — pronunciation improves with repetition.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/classes/A1"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <FaBookOpen size={16} />
                <span>Review Lessons</span>
              </Link>
              <Link
                href="/learn/a1/lesson-next"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all"
              >
                <span>Continue Learning</span>
                <FaArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-amber-800 text-sm">
                Complete all sections and the practice quiz to unlock the next lesson.
              </p>
            </div>

            <button
              onClick={onComplete}
              disabled={!canComplete}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                canComplete
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {canComplete ? 'Mark Lesson Complete' : 'Complete All Sections First'}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
