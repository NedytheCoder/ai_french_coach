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
  guidedExamples,
  nePasExamples,
  negations,
  passeComposeNegation,
  practiceQuestions,
  type PracticeQuestion,
  type PracticeTopic
} from './data'

type SectionKey =
  | 'recap'
  | 'structure'
  | 'other'
  | 'pc'
  | 'patterns'
  | 'guided'

type SectionReview = Record<SectionKey, boolean>

type PracticeAnswer = {
  questionId: number
  selectedOption: number
  isCorrect: boolean
}

export default function A1Lesson10Page() {
  const [reviewedSections, setReviewedSections] = useState<SectionReview>({
    recap: false,
    structure: false,
    other: false,
    pc: false,
    patterns: false,
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
  const score = practiceAnswers.filter(a => a.isCorrect).length
  const percentage = Math.round((score / practiceQuestions.length) * 100)

  const topicCounts = useMemo(() => {
    return practiceAnswers.reduce<Record<PracticeTopic, number>>(
      (acc, a) => {
        const q = practiceQuestions.find(x => x.id === a.questionId)
        if (!q) return acc
        acc[q.topic] = (acc[q.topic] || 0) + 1
        return acc
      },
      { nepas: 0, other: 0, 'passe-compose': 0, structure: 0 }
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

        {/* 2. Recap ne...pas */}
        <SectionCard
          title="Quick recap: ne...pas"
          subtitle="The most common negation"
          icon="🚫"
          isReviewed={reviewedSections.recap}
          onMarkReviewed={() => markSectionReviewed('recap')}
          index={0}
        >
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <p className="text-slate-700 mb-4">
              <strong>Ne...pas</strong> is the most common negation in French. It “wraps around” the verb.
            </p>

            <div className="space-y-4">
              {nePasExamples.map((ex, idx) => (
                <TwoLineExample
                  key={idx}
                  positive={ex.french}
                  negative={ex.negative}
                  english={ex.english}
                  index={idx}
                />
              ))}
            </div>

            <div className="mt-5 bg-purple-50 rounded-xl p-4 border border-purple-200 text-sm text-purple-900">
              <strong>Note:</strong> <strong>ne</strong> becomes <strong>n’</strong> before a vowel or silent h.
            </div>
          </div>
        </SectionCard>

        {/* 3. Structure */}
        <SectionCard
          title="How negation works (structure)"
          subtitle="Present vs passé composé"
          icon="🧩"
          isReviewed={reviewedSections.structure}
          onMarkReviewed={() => markSectionReviewed('structure')}
          index={1}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormulaCard
              title="Present tense"
              formula="Subject + ne + verb + negation word"
              examples={[
                "Je ne mange pas.",
                "Je ne mange jamais ici."
              ]}
              accent="blue"
            />
            <FormulaCard
              title="Passé composé"
              formula="Subject + ne + auxiliary + negation + past participle"
              examples={[
                "Je n’ai pas mangé.",
                "Elle n’est jamais arrivée."
              ]}
              accent="purple"
            />
          </div>
        </SectionCard>

        {/* 4. Other negations */}
        <SectionCard
          title="Other common negations"
          subtitle="Same structure — only the second word changes"
          icon="📌"
          isReviewed={reviewedSections.other}
          onMarkReviewed={() => markSectionReviewed('other')}
          index={2}
        >
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="text-sm text-slate-700 mb-4 space-y-1">
              <p><strong>Helper:</strong> All of these follow the same structure as ne...pas.</p>
              <p>Only the second word changes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {negations.map((n, idx) => (
                <NegationCard
                  key={n.form}
                  form={n.form}
                  meaning={n.meaning}
                  examples={n.examples}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* 5. Negation in passé composé */}
        <SectionCard
          title="Negation in passé composé"
          subtitle="Negation wraps around the auxiliary"
          icon="⏳"
          isReviewed={reviewedSections.pc}
          onMarkReviewed={() => markSectionReviewed('pc')}
          index={3}
        >
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <p className="text-amber-900 mb-4">
              In passé composé, negation goes around the <strong>auxiliary</strong> (avoir/être), not the past participle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {passeComposeNegation.map((ex, idx) => (
                <ExampleCard
                  key={idx}
                  french={ex.french}
                  english={ex.english}
                  tag="past"
                  isPlaying={currentlyPlaying === `pc-${idx}`}
                  onPlay={() => playAudio(`/audio/a1/negations/passe-compose/${idx + 1}.mp3`, `pc-${idx}`)}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </SectionCard>

        {/* 6. Important patterns */}
        <SectionCard
          title="Important patterns and rules"
          subtitle="3 beginner-safe rules"
          icon="🧠"
          isReviewed={reviewedSections.patterns}
          onMarkReviewed={() => markSectionReviewed('patterns')}
          index={4}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <RuleCard
              title="1) ne → n’"
              body="Before a vowel or silent h, ne becomes n’."
              examples={["Elle n’aime pas le café.", "Je n’ai pas mangé."]}
              accent="purple"
            />
            <RuleCard
              title="2) Past tense"
              body="In passé composé, negation surrounds the auxiliary."
              examples={["Je n’ai pas mangé.", "Nous n’avons rien vu."]}
              accent="blue"
            />
            <RuleCard
              title="3) de in negatives"
              body="“De” often replaces un/une/des in negatives."
              examples={["J’ai un chien → Je n’ai pas de chien.", "Elle a des amis → Elle n’a pas d’amis."]}
              accent="amber"
            />
          </div>
        </SectionCard>

        {/* 7. Guided examples */}
        <SectionCard
          title="Guided examples"
          subtitle="Notice the tense + the negation word"
          icon="🗣️"
          isReviewed={reviewedSections.guided}
          onMarkReviewed={() => markSectionReviewed('guided')}
          index={5}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {guidedExamples.map((ex, idx) => (
              <ExampleCard
                key={idx}
                french={ex.french}
                english={ex.english}
                tag={ex.tag === 'present' ? 'present' : 'past'}
                isPlaying={currentlyPlaying === `guided-${idx}`}
                onPlay={() => playAudio(`/audio/a1/negations/guided/${idx + 1}.mp3`, `guided-${idx}`)}
                index={idx}
              />
            ))}
          </div>
        </SectionCard>

        {/* 8. Practice */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <span className="text-2xl">✏️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Guided interactive practice</h2>
              <p className="text-sm text-slate-600">20 questions, one at a time</p>
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
                <PracticeResultsCard score={score} total={practiceQuestions.length} onRetake={retakePractice} onContinue={continueFromResults} />
              )}
            </div>
          ) : (
            <PracticeResultsCard score={score} total={practiceQuestions.length} onRetake={retakePractice} onContinue={continueFromResults} />
          )}
        </div>

        {/* 10. Completion */}
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
                    You’ve completed Lesson 10.
                  </h2>
                  <p className="text-slate-700 mb-4">
                    You can now form negative sentences using ne...pas and other common negations, in the present and passé composé.
                  </p>

                  <div className="bg-white rounded-xl p-4 border border-green-200 text-sm text-slate-700">
                    <div className="font-semibold text-slate-800 mb-2">Recap</div>
                    <ul className="space-y-1">
                      <li>- <strong>ne...pas</strong> (not)</li>
                      <li>- Other negations: <strong>jamais, plus, rien, personne, guerre</strong></li>
                      <li>- Placement rules (present vs passé composé)</li>
                      <li>- <strong>de</strong> often replaces un/une/des in negatives</li>
                    </ul>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <div className="bg-white rounded-2xl p-5 border border-green-200 text-center">
                    <div className="text-sm text-slate-500 mb-1">Practice score</div>
                    <div className="text-3xl font-bold text-green-700">
                      {score}/{practiceQuestions.length}
                    </div>
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
                  Lesson complete! You’re ready to continue.
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
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-slate-800 rounded-full text-white text-sm font-medium mb-4">
        <span>A1 Lesson 10</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
        Negation in French
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
        Learn how to say ‘not’, ‘never’, ‘nothing’, 'hardly' and more in French.
      </p>
      <p className="text-sm text-slate-500">
        Review ne...pas and discover other common negative structures.
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
  const sections = ['recap', 'structure', 'other', 'pc', 'patterns', 'guided'] as const
  const completedSections = sections.filter(s => reviewedSections[s]).length
  const totalProgress = ((completedSections + practiceProgress / totalPractice) / 7) * 100

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
        <span>{completedSections}/6 sections reviewed</span>
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
    'from-slate-700 to-purple-700',
    'from-blue-600 to-cyan-600',
    'from-amber-500 to-orange-500',
    'from-purple-500 to-blue-500',
    'from-emerald-500 to-teal-500',
    'from-indigo-500 to-purple-500'
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
                isReviewed ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
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

function TwoLineExample({
  positive,
  negative,
  english,
  index
}: {
  positive: string
  negative: string
  english: string
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="text-sm text-slate-500 font-semibold mb-2">Positive → Negative</div>
      <div className="space-y-2">
        <div className="font-semibold text-slate-800">{positive}</div>
        <div className="font-semibold text-slate-800">
          <span className="text-slate-400">→ </span>
          <span className="text-purple-700">{negative}</span>
        </div>
        <div className="text-sm text-slate-600">{english}</div>
      </div>
    </motion.div>
  )
}

function FormulaCard({
  title,
  formula,
  examples,
  accent
}: {
  title: string
  formula: string
  examples: string[]
  accent: 'blue' | 'purple'
}) {
  const styles = accent === 'blue'
    ? { bg: 'bg-blue-50', border: 'border-blue-200', chip: 'bg-blue-100 text-blue-700' }
    : { bg: 'bg-purple-50', border: 'border-purple-200', chip: 'bg-purple-100 text-purple-700' }

  return (
    <div className={`rounded-2xl p-5 border-2 ${styles.bg} ${styles.border}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${styles.chip}`}>pattern</span>
      </div>
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="text-sm text-slate-600 font-semibold">{formula}</div>
        <div className="mt-3 space-y-2">
          {examples.map((ex, idx) => (
            <div key={idx} className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              {ex}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NegationCard({
  form,
  meaning,
  examples,
  index
}: {
  form: string
  meaning: string
  examples: { french: string; english: string }[]
  index: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-bold text-slate-800">{form}</div>
          <div className="text-sm text-slate-600">{meaning}</div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-700 font-semibold">negation</span>
      </div>
      <div className="mt-3 space-y-2">
        {examples.map((ex, idx2) => (
          <div key={idx2} className="bg-white rounded-xl p-3 border border-slate-200">
            <div className="font-semibold text-slate-800">{ex.french}</div>
            <div className="text-sm text-slate-600">{ex.english}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ExampleCard({
  french,
  english,
  tag,
  isPlaying,
  onPlay,
  index
}: {
  french: string
  english: string
  tag: 'present' | 'past'
  isPlaying: boolean
  onPlay: () => void
  index: number
}) {
  const chip = tag === 'present' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
  const label = tag === 'present' ? 'present' : 'passé composé'

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="bg-white rounded-2xl p-5 border border-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${chip}`}>{label}</span>
          <div className="text-lg font-bold text-slate-800 mt-2">{french}</div>
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
    </motion.div>
  )
}

function RuleCard({
  title,
  body,
  examples,
  accent
}: {
  title: string
  body: string
  examples: string[]
  accent: 'purple' | 'blue' | 'amber'
}) {
  const styles =
    accent === 'purple'
      ? { bg: 'bg-purple-50', border: 'border-purple-200', chip: 'bg-purple-100 text-purple-700' }
      : accent === 'blue'
      ? { bg: 'bg-blue-50', border: 'border-blue-200', chip: 'bg-blue-100 text-blue-700' }
      : { bg: 'bg-amber-50', border: 'border-amber-200', chip: 'bg-amber-100 text-amber-700' }

  return (
    <div className={`rounded-2xl p-5 border-2 ${styles.bg} ${styles.border}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${styles.chip}`}>rule</span>
      </div>
      <p className="text-sm text-slate-700 mb-3">{body}</p>
      <div className="space-y-2">
        {examples.map((ex, idx) => (
          <div key={idx} className="text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2">
            {ex}
          </div>
        ))}
      </div>
    </div>
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
        <Chip label={`ne...pas: ${counts.nepas}`} />
        <Chip label={`other: ${counts.other}`} />
        <Chip label={`passé composé: ${counts['passe-compose']}`} />
        <Chip label={`structure: ${counts.structure}`} />
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

  const feedbackMessagesCorrect = ["Nice 😏", "Good catch", "That’s right", "You’re getting the pattern"]
  const feedbackMessagesWrong = ["Careful now…", "Good try — check the placement", "Almost — notice the structure"]
  const message = isCorrect
    ? feedbackMessagesCorrect[Math.floor(Math.random() * feedbackMessagesCorrect.length)]
    : feedbackMessagesWrong[Math.floor(Math.random() * feedbackMessagesWrong.length)]

  const topicBadge =
    question.topic === 'nepas'
      ? 'bg-purple-100 text-purple-700'
      : question.topic === 'other'
      ? 'bg-blue-100 text-blue-700'
      : question.topic === 'passe-compose'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-emerald-100 text-emerald-700'

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="text-sm font-medium text-slate-500">
          Practice {questionNumber} of {totalQuestions}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${topicBadge}`}>
          {question.topic}
        </span>
      </div>

      <h3 className="text-lg font-medium text-slate-800 mb-6">{question.prompt}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelectOption(idx)}
            disabled={showFeedback}
            aria-label={`Answer option ${idx + 1}: ${option}`}
            className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${
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
                {showFeedback && selectedOption === idx && idx !== question.correct && (
                  <span className="text-white text-xs">×</span>
                )}
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
          className={`p-4 rounded-xl mb-4 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
            {message}
          </p>
          <p className="text-sm text-slate-600">{question.explanation}</p>
        </motion.div>
      )}

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

function PracticeResultsCard({
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
    score <= 7
      ? {
          title: "Good effort — negation takes practice.",
          body: "Review the patterns, then retake the practice. A small review can help a lot."
        }
      : score <= 13
      ? {
          title: "Nice progress — you're understanding the patterns.",
          body: "You’re getting the placement right. Keep going and repeat the structures."
        }
      : {
          title: "Great job — you’re using negation well.",
          body: "You can use different negations and place them correctly."
        }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Practice results</h3>
          <p className="text-slate-800 font-semibold mb-2">{feedback.title}</p>
          <p className="text-sm text-slate-600">{feedback.body}</p>
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

