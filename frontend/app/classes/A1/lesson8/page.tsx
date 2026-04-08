'use client'

import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaArrowRight,
  FaCheck,
  FaChevronRight,
  FaHome,
  FaPlay,
  FaRedoAlt
} from 'react-icons/fa'
import Link from 'next/link'
import {
  adjectives,
  adverbs,
  guidedExamples,
  placementExamples,
  practiceQuestions,
  type PracticeQuestion,
  type PracticeTopic
} from './data'

type SectionKey =
  | 'whatAdj'
  | 'commonAdj'
  | 'agreement'
  | 'placement'
  | 'whatAdv'
  | 'commonAdv'
  | 'compare'
  | 'guided'

type SectionReview = Record<SectionKey, boolean>

type PracticeAnswer = {
  questionId: number
  selectedOption: number
  isCorrect: boolean
}

export default function A1Lesson8Page() {
  const [reviewedSections, setReviewedSections] = useState<SectionReview>({
    whatAdj: false,
    commonAdj: false,
    agreement: false,
    placement: false,
    whatAdv: false,
    commonAdv: false,
    compare: false,
    guided: false
  })

  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0)
  const [practiceAnswers, setPracticeAnswers] = useState<PracticeAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const [showResults, setShowResults] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  const allSectionsReviewed = Object.values(reviewedSections).every(Boolean)
  const practiceComplete = practiceAnswers.length === practiceQuestions.length
  const correctAnswers = practiceAnswers.filter(a => a.isCorrect).length
  const percentage = Math.round((correctAnswers / practiceQuestions.length) * 100)

  const topicCounts = useMemo(() => {
    return practiceAnswers.reduce<Record<PracticeTopic, number>>(
      (acc, a) => {
        const q = practiceQuestions.find(x => x.id === a.questionId)
        if (!q) return acc
        acc[q.topic] = (acc[q.topic] || 0) + 1
        return acc
      },
      { 'adj-recognition': 0, agreement: 0, 'adverb-usage': 0, 'adj-vs-adv': 0 }
    )
  }, [practiceAnswers])

  const playAudio = (audioSrc: string, id: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(audioSrc)
    audioRef.current = audio
    setCurrentlyPlaying(id)

    audio.play().catch(() => {
      setCurrentlyPlaying(null)
    })

    audio.onended = () => setCurrentlyPlaying(null)
  }

  const markSectionReviewed = (section: SectionKey) => {
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
    setPracticeAnswers(prev => [
      ...prev,
      { questionId: currentQuestion.id, selectedOption, isCorrect }
    ])
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    const nextIndex = currentPracticeIndex + 1
    setSelectedOption(null)
    setShowFeedback(false)
    setCurrentPracticeIndex(nextIndex)
    if (nextIndex >= practiceQuestions.length) setShowResults(true)
  }

  const retakePractice = () => {
    setCurrentPracticeIndex(0)
    setPracticeAnswers([])
    setSelectedOption(null)
    setShowFeedback(false)
    setShowResults(false)
    setShowCompletion(false)
  }

  const continueFromResults = () => {
    setShowResults(false)
    setShowCompletion(true)
  }

  const lessonReadyToComplete = allSectionsReviewed && practiceComplete
  const lessonComplete = lessonReadyToComplete && showCompletion

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/classes/A1"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors"
          >
            <FaHome size={18} />
            <span className="text-sm font-medium">Back to A1 Lessons</span>
          </Link>
        </div>

        <LessonHeader />

        <ProgressBar
          reviewedSections={reviewedSections}
          practiceProgress={practiceAnswers.length}
          totalPractice={practiceQuestions.length}
        />

        {/* 2. What is an adjective? */}
        <SectionCard
          title="What is an adjective?"
          subtitle="Words that describe nouns"
          icon="🏷️"
          isReviewed={reviewedSections.whatAdj}
          onMarkReviewed={() => markSectionReviewed('whatAdj')}
          index={0}
        >
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>An <strong>adjective</strong> describes a noun (a person, place, or thing).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-500 font-bold text-xl">•</span>
                <span>It gives more information: size, color, quality, etc.</span>
              </li>
            </ul>

            <div className="mt-6 bg-white rounded-lg p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3">Examples:</h4>
              <div className="space-y-2 text-slate-600">
                <p><span className="font-medium text-purple-600">un grand livre</span></p>
                <p><span className="font-medium text-purple-600">une voiture rouge</span></p>
                <p><span className="font-medium text-purple-600">un petit chat</span></p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 3. Common A1 adjectives */}
        <SectionCard
          title="Common A1 adjectives"
          subtitle="Masculine + feminine forms"
          icon="📚"
          isReviewed={reviewedSections.commonAdj}
          onMarkReviewed={() => markSectionReviewed('commonAdj')}
          index={1}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adjectives.map((a, idx) => (
              <AdjectiveCard
                key={a.word}
                masculine={a.word}
                feminine={a.feminine}
                english={a.english}
                example={exampleForAdjective(a.word, a.feminine)}
                isPlaying={currentlyPlaying === `adj-${a.word}`}
                onPlay={() => playAudio(`/audio/a1/adj-adverbs/adjectives/${a.word}.mp3`, `adj-${a.word}`)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* 4. Agreement */}
        <SectionCard
          title="Adjective agreement"
          subtitle="Masculine/feminine + singular/plural (basic)"
          icon="🧩"
          isReviewed={reviewedSections.agreement}
          onMarkReviewed={() => markSectionReviewed('agreement')}
          index={2}
        >
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 mb-4">
              In French, adjectives <strong>agree</strong> with the noun. That means the adjective can change for:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5">
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-500">•</span>
                <span><strong>Masculine</strong> vs <strong>feminine</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-500">•</span>
                <span><strong>Singular</strong> vs <strong>plural</strong> (basic intro)</span>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExampleCard
                title="Feminine often adds “e”"
                examples={[
                  { french: "un petit chat", english: "a small cat" },
                  { french: "une petite maison", english: "a small house" }
                ]}
              />
              <ExampleCard
                title="Plural often adds “s”"
                examples={[
                  { french: "une voiture rouge", english: "a red car" },
                  { french: "des voitures rouges", english: "red cars" }
                ]}
              />
            </div>

            <div className="mt-5 bg-amber-50 rounded-xl p-4 border border-amber-200 text-sm text-amber-900">
              <strong>Simple rule:</strong> often add <strong>e</strong> for feminine, and add <strong>s</strong> for plural.
            </div>
          </div>
        </SectionCard>

        {/* 5. Placement */}
        <SectionCard
          title="Adjective placement"
          subtitle="Before vs after the noun"
          icon="📍"
          isReviewed={reviewedSections.placement}
          onMarkReviewed={() => markSectionReviewed('placement')}
          index={3}
        >
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 mb-4">
              Most adjectives come <strong>after</strong> the noun. Some very common adjectives often come <strong>before</strong>
              (think: small/big/beautiful/good, etc.).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {placementExamples.map((ex, idx) => (
                <PlacementCard key={idx} french={ex.french} english={ex.english} index={idx} />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* 6. What is an adverb? */}
        <SectionCard
          title="What is an adverb?"
          subtitle="Words that modify verbs"
          icon="⚡"
          isReviewed={reviewedSections.whatAdv}
          onMarkReviewed={() => markSectionReviewed('whatAdv')}
          index={4}
        >
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl">•</span>
                <span>An <strong>adverb</strong> modifies a <strong>verb</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl">•</span>
                <span>It describes <strong>how</strong> something is done.</span>
              </li>
            </ul>

            <div className="mt-6 bg-white rounded-lg p-4 border border-slate-200">
              <h4 className="font-semibold text-slate-800 mb-3">Examples:</h4>
              <div className="space-y-2 text-slate-600">
                <p><span className="font-medium text-blue-700">Il parle lentement.</span></p>
                <p><span className="font-medium text-blue-700">Elle travaille bien.</span></p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 7. Common A1 adverbs */}
        <SectionCard
          title="Common A1 adverbs"
          subtitle="Simple words you can use immediately"
          icon="🗣️"
          isReviewed={reviewedSections.commonAdv}
          onMarkReviewed={() => markSectionReviewed('commonAdv')}
          index={5}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adverbs.map((a, idx) => (
              <WordCard
                key={a.word}
                word={a.word}
                english={a.english}
                tag="adverb"
                isPlaying={currentlyPlaying === `adv-${a.word}`}
                onPlay={() => playAudio(`/audio/a1/adj-adverbs/adverbs/${a.word}.mp3`, `adv-${a.word}`)}
                index={idx}
              />
            ))}
          </div>
          <div className="mt-5 bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-700">
            <strong>Good news:</strong> Adverbs do <strong>not</strong> agree with nouns. They usually stay the same.
          </div>
        </SectionCard>

        {/* 8. Adjectives vs adverbs */}
        <SectionCard
          title="Adjectives vs adverbs"
          subtitle="Same idea, different job"
          icon="🔍"
          isReviewed={reviewedSections.compare}
          onMarkReviewed={() => markSectionReviewed('compare')}
          index={6}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CompareCard
              title="Adjective"
              bullets={[
                "describes a noun",
                "agrees with the noun (basic agreement)"
              ]}
              exampleFrench="Il est rapide."
              exampleEnglish="He is fast."
              accent="purple"
            />
            <CompareCard
              title="Adverb"
              bullets={[
                "describes a verb (an action)",
                "does NOT change form"
              ]}
              exampleFrench="Il court rapidement."
              exampleEnglish="He runs quickly."
              accent="blue"
            />
          </div>
        </SectionCard>

        {/* 9. Guided examples */}
        <SectionCard
          title="Guided examples"
          subtitle="Read, notice patterns, then copy"
          icon="🧠"
          isReviewed={reviewedSections.guided}
          onMarkReviewed={() => markSectionReviewed('guided')}
          index={7}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {guidedExamples.map((ex, idx) => (
              <GuidedExampleCard
                key={ex.id}
                french={ex.french}
                english={ex.english}
                focus={ex.focus}
                isPlaying={currentlyPlaying === ex.id}
                onPlay={() => playAudio(`/audio/a1/adj-adverbs/examples/${ex.id}.mp3`, ex.id)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* 10. Practice */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <span className="text-2xl">✏️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Guided interactive practice</h2>
              <p className="text-sm text-slate-600">16 questions, one at a time</p>
            </div>
          </div>

          {!showResults ? (
            <div className="space-y-4">
              <PracticeMetaRow answered={practiceAnswers.length} total={practiceQuestions.length} counts={topicCounts} />

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
                <ResultsCard
                  score={correctAnswers}
                  total={practiceQuestions.length}
                  onRetake={retakePractice}
                  onContinue={continueFromResults}
                />
              )}
            </div>
          ) : (
            <ResultsCard
              score={correctAnswers}
              total={practiceQuestions.length}
              onRetake={retakePractice}
              onContinue={continueFromResults}
            />
          )}
        </div>

        {/* 12. Completion */}
        <AnimatePresence>
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8"
            >
              <div className="flex items-start gap-4 flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-200 text-green-900 text-xs font-semibold mb-3">
                    <FaCheck />
                    Lesson completion
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Nice work — you finished A1 Lesson 8!
                  </h2>
                  <p className="text-slate-700 mb-3">
                    You can now describe things with adjectives, and modify actions with adverbs.
                  </p>

                  <div className="bg-white rounded-xl p-4 border border-green-200 text-sm text-slate-700">
                    <div className="font-semibold text-slate-800 mb-2">Recap</div>
                    <ul className="space-y-1">
                      <li>- <strong>Adjectives</strong> describe nouns.</li>
                      <li>- <strong>Adverbs</strong> describe verbs.</li>
                      <li>- Adjectives can <strong>agree</strong>; adverbs usually <strong>do not change</strong>.</li>
                    </ul>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <div className="bg-white rounded-2xl p-5 border border-green-200 text-center">
                    <div className="text-sm text-slate-500 mb-1">Practice score</div>
                    <div className="text-3xl font-bold text-green-700">{correctAnswers}/16</div>
                    <div className="text-sm font-medium text-slate-600">{percentage}%</div>
                    <div className="mt-4 flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={retakePractice}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
                      >
                        <FaRedoAlt size={14} />
                        Retake
                      </button>
                      <Link
                        href="/classes/A1"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transition-all"
                      >
                        Next lesson
                        <FaArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {lessonComplete ? (
              <>
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600 truncate">
                  Lesson complete! You’re ready for the next one.
                </span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-600 truncate">
                  {!allSectionsReviewed
                    ? 'Review all lesson sections to continue'
                    : !practiceComplete
                    ? 'Finish the practice to see your results'
                    : 'Continue to the completion screen'}
                </span>
              </>
            )}
          </div>

          <button
            disabled={!lessonReadyToComplete}
            onClick={() => {
              if (!lessonReadyToComplete) return
              setShowCompletion(true)
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }}
            className={`shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              lessonReadyToComplete
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
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
        <span>A1 Lesson 8</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        A1 Lesson 8 — Adjectives and Adverbs
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        Learn how to describe things and how to modify actions in French.
      </p>
      <p className="text-sm text-slate-500">
        Read the examples, notice the patterns, and complete the practice.
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
  const sections = [
    'whatAdj',
    'commonAdj',
    'agreement',
    'placement',
    'whatAdv',
    'commonAdv',
    'compare',
    'guided'
  ] as const
  const completedSections = sections.filter(s => reviewedSections[s]).length
  const totalProgress = ((completedSections + practiceProgress / totalPractice) / 9) * 100

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
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 flex-wrap">
        <span>{completedSections}/8 sections reviewed</span>
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
    'from-amber-500 to-orange-500',
    'from-indigo-500 to-purple-500',
    'from-rose-500 to-pink-500',
    'from-sky-500 to-indigo-500',
    'from-lime-500 to-emerald-500'
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center">
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
                isReviewed ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              <FaCheck size={14} />
              {isReviewed ? 'Reviewed' : 'Mark as Reviewed'}
            </button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </motion.div>
  )
}

function AdjectiveCard({
  masculine,
  feminine,
  english,
  example,
  isPlaying,
  onPlay,
  index
}: {
  masculine: string
  feminine: string
  english: string
  example: string
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="rounded-xl p-4 border-2 bg-slate-50 border-slate-200 hover:border-purple-300 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">masc</span>
            <span className="text-xl font-bold text-slate-800">{masculine}</span>
            <span className="text-slate-400">→</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">fem</span>
            <span className="text-xl font-bold text-purple-700">{feminine}</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">{english}</p>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${masculine}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying ? 'bg-white text-purple-600 animate-pulse' : 'bg-white text-slate-600 hover:text-purple-600 shadow-sm'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
      <div className="text-sm text-slate-500 bg-white rounded-lg p-3 border border-slate-100">
        <span className="font-medium text-slate-700">{example}</span>
      </div>
    </motion.div>
  )
}

function WordCard({
  word,
  english,
  tag,
  isPlaying,
  onPlay,
  index
}: {
  word: string
  english: string
  tag: 'adverb'
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="rounded-xl p-4 border-2 bg-slate-50 border-slate-200 hover:border-blue-300 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-800">{word}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">{tag}</span>
          </div>
          <p className="text-sm text-slate-600">{english}</p>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label={`Play pronunciation for ${word}`}
          className={`p-2 rounded-lg transition-all ${
            isPlaying ? 'bg-white text-blue-600 animate-pulse' : 'bg-white text-slate-600 hover:text-blue-600 shadow-sm'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
      <div className="text-xs text-slate-500 bg-white rounded-lg p-3 border border-slate-100">
        Example: {exampleForAdverb(word)}
      </div>
    </motion.div>
  )
}

function ExampleCard({
  title,
  examples
}: {
  title: string
  examples: { french: string; english: string }[]
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="font-bold text-slate-800 mb-3">{title}</div>
      <div className="space-y-3">
        {examples.map((ex, idx) => (
          <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
            <div className="font-semibold text-slate-800">{ex.french}</div>
            <div className="text-sm text-slate-600">{ex.english}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlacementCard({ french, english, index }: { french: string; english: string; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="text-lg font-bold text-slate-800">{french}</div>
      <div className="text-sm text-slate-600 mt-1">{english}</div>
    </motion.div>
  )
}

function CompareCard({
  title,
  bullets,
  exampleFrench,
  exampleEnglish,
  accent
}: {
  title: string
  bullets: string[]
  exampleFrench: string
  exampleEnglish: string
  accent: 'purple' | 'blue'
}) {
  const header =
    accent === 'purple'
      ? 'bg-purple-50 border-purple-200'
      : 'bg-blue-50 border-blue-200'
  const badge =
    accent === 'purple'
      ? 'bg-purple-100 text-purple-700'
      : 'bg-blue-100 text-blue-700'

  return (
    <div className={`rounded-2xl p-5 border-2 ${header}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${badge}`}>{title.toLowerCase()}</span>
      </div>
      <ul className="space-y-2 text-slate-700 mb-4">
        {bullets.map((b, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="font-bold text-slate-500">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="font-semibold text-slate-800">{exampleFrench}</div>
        <div className="text-sm text-slate-600">{exampleEnglish}</div>
      </div>
    </div>
  )
}

function GuidedExampleCard({
  french,
  english,
  focus,
  isPlaying,
  onPlay,
  index
}: {
  french: string
  english: string
  focus: string
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-bold text-slate-800">{french}</div>
          <div className="text-sm text-slate-600 mt-1">{english}</div>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          aria-label="Play audio"
          className={`p-2 rounded-lg transition-all ${
            isPlaying ? 'bg-purple-100 text-purple-600 animate-pulse' : 'bg-slate-50 text-slate-600 hover:text-purple-600 border border-slate-200'
          }`}
        >
          <FaPlay size={14} />
        </button>
      </div>
      <div className="mt-3 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-full inline-flex px-3 py-1">
        {focus}
      </div>
    </motion.div>
  )
}

function PracticeMetaRow({
  answered,
  total,
  counts
}: {
  answered: number
  total: number
  counts: Record<PracticeTopic, number>
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="text-sm text-slate-600">
        <strong className="text-slate-800">{answered}</strong> / {total} answered
      </div>
      <div className="flex gap-2 flex-wrap">
        <Chip label={`Adj recognition: ${counts['adj-recognition']}`} />
        <Chip label={`Agreement: ${counts.agreement}`} />
        <Chip label={`Adverb usage: ${counts['adverb-usage']}`} />
        <Chip label={`Adj vs adv: ${counts['adj-vs-adv']}`} />
      </div>
    </div>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
      {label}
    </span>
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
  question: PracticeQuestion
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  showFeedback: boolean
  onSelectOption: (index: number) => void
  onSubmit: () => void
  onNext: () => void
}) {
  const isCorrect = selectedOption === question.correct
  const topicBadge =
    question.topic === 'adj-recognition'
      ? 'bg-purple-100 text-purple-700'
      : question.topic === 'agreement'
      ? 'bg-amber-100 text-amber-700'
      : question.topic === 'adverb-usage'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-emerald-100 text-emerald-700'

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="text-sm font-medium text-slate-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${topicBadge}`}>{question.topic}</span>
      </div>

      <h3 className="text-lg font-medium text-slate-800 mb-6">{question.prompt}</h3>

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
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  showFeedback
                    ? idx === question.correct
                      ? 'border-green-500 bg-green-500'
                      : selectedOption === idx
                      ? 'border-red-500 bg-red-500'
                      : 'border-slate-300'
                    : selectedOption === idx
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-slate-300'
                }`}
              >
                {showFeedback && idx === question.correct && <FaCheck size={12} className="text-white" />}
                {showFeedback && selectedOption === idx && idx !== question.correct && <span className="text-white text-xs">×</span>}
                {!showFeedback && selectedOption === idx && <FaCheck size={12} className="text-white" />}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}
        >
          <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
            {isCorrect ? 'Nice — pattern spotted.' : 'Good effort — check the pattern.'}
          </p>
          <p className="text-sm text-slate-600">{question.explanation}</p>
        </motion.div>
      )}

      {!showFeedback ? (
        <button
          onClick={onSubmit}
          disabled={selectedOption === null}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            selectedOption !== null ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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

function ResultsCard({
  score,
  total,
  onRetake,
  onContinue
}: {
  score: number
  total: number
  onRetake: () => void
  onContinue: () => void
}) {
  const percentage = Math.round((score / total) * 100)
  const feedback =
    score <= 6
      ? {
          title: "Good effort — this takes practice.",
          detail: "Retake the practice, or continue and review examples again later."
        }
      : score <= 12
      ? {
          title: "Nice progress — you're understanding the patterns.",
          detail: "You’re building intuition. Another run will make it feel automatic."
        }
      : {
          title: "Great job — you’re using adjectives and adverbs well.",
          detail: "You can choose correct forms and use simple adverbs naturally."
        }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Practice results</h3>
          <p className="text-slate-600 mb-4">{feedback.title}</p>
          <p className="text-sm text-slate-500">{feedback.detail}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center w-full md:w-[260px]">
          <div className="text-sm text-slate-500 mb-1">Score</div>
          <div className="text-4xl font-bold text-purple-700">{score}/{total}</div>
          <div className="text-sm font-semibold text-slate-600 mt-1">{percentage}%</div>
          <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
        >
          <FaRedoAlt size={14} />
          Retake
        </button>
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg transition-all"
        >
          Continue
          <FaArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}

function exampleForAdjective(masc: string, fem: string) {
  if (masc === 'grand') return `un grand livre → une ${fem} maison`
  if (masc === 'petit') return `un petit chat → une ${fem} maison`
  if (masc === 'bon') return `un bon café → une ${fem} idée`
  if (masc === 'mauvais') return `un mauvais film → une ${fem} journée`
  if (masc === 'beau') return `un beau jardin → une ${fem} photo`
  if (masc === 'jeune') return `un jeune homme → une ${fem} femme`
  if (masc === 'vieux') return `un vieux livre → une ${fem} ville`
  if (masc === 'rapide') return `un train rapide → une voiture ${fem}`
  if (masc === 'lent') return `un bus lent → une tortue ${fem}`
  if (masc === 'facile') return `un exercice facile → une question ${fem}`
  return `un ${masc} ... → une ${fem} ...`
}

function exampleForAdverb(word: string) {
  if (word === 'bien') return 'Elle travaille bien.'
  if (word === 'mal') return 'Il chante mal.'
  if (word === 'vite') return 'Je marche vite.'
  if (word === 'lentement') return 'Il parle lentement.'
  if (word === 'souvent') return 'Je viens souvent.'
  if (word === 'toujours') return 'Elle est toujours ici.'
  if (word === 'parfois') return 'Nous sortons parfois.'
  if (word === 'ici') return 'Je suis ici.'
  if (word === 'là') return 'Le livre est là.'
  if (word === 'très') return 'C’est très facile.'
  return `... ${word}.`
}


