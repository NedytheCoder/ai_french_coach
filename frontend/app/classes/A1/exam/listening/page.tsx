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
  FaHeadphones,
  FaTimes,
  FaRedo,
  FaPlay,
  FaPause,
  FaLock,
  FaClock,
  FaQuestionCircle
} from 'react-icons/fa'
import Link from 'next/link'
import {
  listeningExamQuestions,
  PASSING_SCORE,
  TOTAL_QUESTIONS,
  ListeningQuestion,
  calculateExamResult,
  getPassFailMessage
} from './data'

interface ExamProgress {
  started: boolean
  currentQuestionIndex: number
  answers: { questionId: number; selectedOption: number; isCorrect: boolean }[]
  completed: boolean
}

export default function A1ListeningExamPage() {
  const [started, setStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ questionId: number; selectedOption: number; isCorrect: boolean }[]>([])
  const [completed, setCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a1ListeningExamProgress')
    if (saved) {
      const parsed: ExamProgress = JSON.parse(saved)
      setStarted(parsed.started || false)
      setCurrentQuestionIndex(parsed.currentQuestionIndex || 0)
      setAnswers(parsed.answers || [])
      setCompleted(parsed.completed || false)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('a1ListeningExamProgress', JSON.stringify({
        started,
        currentQuestionIndex,
        answers,
        completed
      }))
    }
  }, [started, currentQuestionIndex, answers, completed, isClient])

  const handleStart = () => {
    setStarted(true)
  }

  const handleAnswerSubmit = (questionId: number, selectedOption: number, isCorrect: boolean) => {
    const newAnswer = { questionId, selectedOption, isCorrect }
    setAnswers(prev => [...prev, newAnswer])
  }

  const handleNext = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setCompleted(true)
    }
  }

  const handleRetake = () => {
    setStarted(false)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setCompleted(false)
    localStorage.removeItem('a1ListeningExamProgress')
  }

  const result = completed ? calculateExamResult(answers) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 pb-24">
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

        {/* Exam Header */}
        <ExamHeader started={started} completed={completed} />

        {/* Main Content */}
        {!started ? (
          <ExamIntro onStart={handleStart} />
        ) : !completed ? (
          <QuestionCard
            question={listeningExamQuestions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            onAnswerSubmit={handleAnswerSubmit}
            onNext={handleNext}
            hasAnswered={answers.some(a => a.questionId === listeningExamQuestions[currentQuestionIndex].id)}
          />
        ) : (
          <ExamResults
            result={result!}
            onRetake={handleRetake}
            questions={listeningExamQuestions}
            answers={answers}
          />
        )}
      </div>
    </div>
  )
}

function ExamHeader({ started, completed }: { started: boolean; completed: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-slate-700 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <FaGraduationCap size={14} />
          <span>A1 Exam</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">A1 Listening Exam</h1>
        <p className="text-indigo-100 text-lg">
          Test your understanding of spoken French across the A1 topics you have studied.
        </p>
      </div>

      {!started && (
        <div className="p-6 bg-indigo-50 border-t border-indigo-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0">
              <FaHeadphones className="text-indigo-700" size={14} />
            </div>
            <p className="text-indigo-800 text-sm">
              This listening exam covers key A1 topics such as pronouns, articles, verbs, sentence structure, pronunciation patterns, prepositions, adjectives, adverbs, negation, and the passé composé.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function ExamIntro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <FaHeadphones className="text-indigo-600" size={28} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to begin?</h2>
        <p className="text-slate-600">This exam will assess your listening comprehension at A1 level.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
          <div className="text-2xl font-bold text-slate-800 mb-1">{TOTAL_QUESTIONS}</div>
          <div className="text-sm text-slate-600">questions</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
          <div className="text-2xl font-bold text-slate-800 mb-1">8–12</div>
          <div className="text-sm text-slate-600">minutes</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
          <div className="text-2xl font-bold text-slate-800 mb-1">{PASSING_SCORE}/{TOTAL_QUESTIONS}</div>
          <div className="text-sm text-slate-600">to pass</div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 mb-8">
        <h3 className="font-semibold text-amber-800 mb-3">Important notes:</h3>
        <ul className="space-y-2 text-amber-800 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">•</span>
            <span>You will answer one question at a time.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">•</span>
            <span>Your final result will appear at the end.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">•</span>
            <span>You need at least {PASSING_SCORE}/{TOTAL_QUESTIONS} ({Math.round((PASSING_SCORE/TOTAL_QUESTIONS)*100)}%) to pass this exam.</span>
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <button
          onClick={onStart}
          className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-600 to-slate-700 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <FaPlay size={18} />
          <span>Start exam</span>
        </button>
        <Link
          href="/classes/A1"
          className="w-full py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
        >
          <FaBookOpen size={16} />
          <span>Review lessons first</span>
        </Link>
      </div>
    </motion.div>
  )
}

// Audio Player Component
function AudioPlayer({ audioSrc, label }: { audioSrc: string; label?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playCount, setPlayCount] = useState(0)
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
      if (playCount === 0) {
        setPlayCount(1)
      }
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handlePlay}
        className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
          isPlaying
            ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
        aria-label={isPlaying ? 'Pause audio' : `Play audio${label ? `: ${label}` : ''}`}
      >
        {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
        <span>{isPlaying ? 'Playing...' : playCount > 0 ? 'Replay' : 'Play audio'}</span>
      </button>
      {playCount > 0 && (
        <span className="text-sm text-slate-500">
          Played {playCount} {playCount === 1 ? 'time' : 'times'}
        </span>
      )}
    </div>
  )
}

interface QuestionCardProps {
  question: ListeningQuestion
  questionNumber: number
  totalQuestions: number
  onAnswerSubmit: (questionId: number, selectedOption: number, isCorrect: boolean) => void
  onNext: () => void
  hasAnswered: boolean
}

function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  onNext,
  hasAnswered
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(hasAnswered)

  useEffect(() => {
    setSelectedOption(null)
    setSubmitted(hasAnswered)
  }, [question.id, hasAnswered])

  const handleSelectOption = (index: number) => {
    if (submitted) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    if (selectedOption === null || submitted) return
    const isCorrect = selectedOption === question.correct
    onAnswerSubmit(question.id, selectedOption, isCorrect)
    setSubmitted(true)
  }

  const progress = (questionNumber / totalQuestions) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
    >
      {/* Progress Bar */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              question.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
              'bg-rose-100 text-rose-700'
            }`}>
              {question.difficulty}
            </span>
            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
              {question.topic}
            </span>
          </div>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-600 to-slate-700"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="p-6">
        {/* Audio Player */}
        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-200 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center">
              <FaHeadphones className="text-indigo-700" size={18} />
            </div>
            <div>
              <p className="font-semibold text-indigo-900">Listen carefully</p>
              <p className="text-sm text-indigo-700">You can replay the audio as needed</p>
            </div>
          </div>
          <AudioPlayer audioSrc={question.audioSrc} label={question.transcript} />
        </div>

        {/* Question Prompt */}
        <h3 className="text-lg font-medium text-slate-800 mb-6">{question.prompt}</h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={submitted}
              className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                submitted
                  ? idx === question.correct
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                    : selectedOption === idx
                      ? 'border-slate-300 bg-slate-50 text-slate-600'
                      : 'border-slate-200 text-slate-600'
                  : selectedOption === idx
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                    : 'border-slate-200 hover:border-indigo-300 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  submitted
                    ? idx === question.correct
                      ? 'border-indigo-500 bg-indigo-500'
                      : selectedOption === idx
                        ? 'border-slate-300 bg-slate-300'
                        : 'border-slate-300'
                    : selectedOption === idx
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-slate-300'
                }`}>
                  {submitted ? (
                    idx === question.correct ? (
                      <FaCheck size={12} className="text-white" />
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

        {/* Submit/Next Button */}
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-indigo-600 to-slate-700 text-white hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Submit answer</span>
            <FaChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-slate-700 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>{questionNumber === totalQuestions ? 'See results' : 'Next question'}</span>
            <FaChevronRight size={16} />
          </button>
        )}
      </div>
    </motion.div>
  )
}

interface ExamResultsProps {
  result: { score: number; passed: boolean; answers: { questionId: number; selectedOption: number; isCorrect: boolean }[] }
  onRetake: () => void
  questions: ListeningQuestion[]
  answers: { questionId: number; selectedOption: number; isCorrect: boolean }[]
}

function ExamResults({ result, onRetake, questions, answers }: ExamResultsProps) {
  const percentage = Math.round((result.score / TOTAL_QUESTIONS) * 100)
  const message = getPassFailMessage(result.passed)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Results Summary Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className={`p-8 text-white text-center ${
          result.passed
            ? 'bg-gradient-to-r from-green-600 to-emerald-600'
            : 'bg-gradient-to-r from-amber-500 to-orange-500'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
            {result.passed ? (
              <FaCheck className="text-white" size={36} />
            ) : (
              <FaClock className="text-white" size={36} />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-1">{result.passed ? 'Passed!' : 'Not yet passed'}</h2>
          <p className="text-white/90">A1 Listening Exam Results</p>
        </div>

        <div className="p-6">
          {/* Score Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-slate-100 border-4 border-slate-200 mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-800">{percentage}%</div>
                <div className="text-sm text-slate-600">{result.score}/{TOTAL_QUESTIONS}</div>
              </div>
            </div>
            <p className="text-slate-600">Your score</p>
          </div>

          {/* Pass/Fail Message */}
          <div className={`rounded-xl p-6 border-2 mb-8 ${
            result.passed
              ? 'bg-green-50 border-green-200'
              : 'bg-amber-50 border-amber-200'
          }`}>
            <h3 className={`text-xl font-bold mb-3 ${
              result.passed ? 'text-green-700' : 'text-amber-700'
            }`}>
              {message.title}
            </h3>
            <div className="space-y-2 text-slate-700">
              {message.body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {result.passed ? (
              <>
                <Link
                  href="/learn/a2/lesson-1"
                  className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-600 to-slate-700 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaArrowRight size={18} />
                  <span>Continue to next class</span>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/classes/A1"
                    className="py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <FaBookOpen size={16} />
                    <span>Review lessons</span>
                  </Link>
                  <button
                    onClick={onRetake}
                    className="py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                  >
                    <FaRedo size={16} />
                    <span>Retake exam</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/classes/A1"
                  className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-600 to-slate-700 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaBookOpen size={18} />
                  <span>Review lessons</span>
                </Link>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <FaLock className="text-slate-400 mt-1" size={16} />
                    <div>
                      <p className="font-medium text-slate-800 mb-1">Next class locked</p>
                      <p className="text-sm text-slate-600">
                        You need at least {PASSING_SCORE}/{TOTAL_QUESTIONS} to unlock the next class. 
                        Revisit the lessons and try again.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onRetake}
                  className="w-full py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                >
                  <FaRedo size={16} />
                  <span>Retake exam now</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Answer Review Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <FaQuestionCircle className="text-indigo-600" />
          Answer Review
        </h3>

        <div className="space-y-4">
          {questions.map((question, idx) => {
            const answer = answers.find(a => a.questionId === question.id)
            const isCorrect = answer?.isCorrect ?? false
            const selectedOption = answer?.selectedOption ?? -1

            return (
              <div
                key={question.id}
                className={`rounded-xl border-2 overflow-hidden ${
                  isCorrect ? 'border-green-200' : 'border-red-200'
                }`}
              >
                <div className={`px-4 py-3 ${
                  isCorrect ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-xs font-bold ${
                      isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {isCorrect ? <FaCheck size={12} /> : <FaTimes size={12} />}
                    </span>
                    <span className="font-semibold text-slate-800">Question {idx + 1}</span>
                    <span className={`ml-auto inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-sm text-slate-500 mb-1">Transcript:</p>
                    <p className="font-medium text-slate-800 italic">"{question.transcript}"</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-slate-500 mb-1">Prompt:</p>
                    <p className="text-slate-800">{question.prompt}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    <div className={`p-3 rounded-lg ${
                      isCorrect ? 'bg-green-100 border border-green-200' : 'bg-slate-100 border border-slate-200'
                    }`}>
                      <p className="text-xs text-slate-500 mb-1">Your answer:</p>
                      <p className={`font-medium ${
                        isCorrect ? 'text-green-800' : 'text-slate-700'
                      }`}>
                        {selectedOption >= 0 ? question.options[selectedOption] : 'Not answered'}
                      </p>
                    </div>
                    {!isCorrect && (
                      <div className="p-3 rounded-lg bg-green-100 border border-green-200">
                        <p className="text-xs text-green-600 mb-1">Correct answer:</p>
                        <p className="font-medium text-green-800">{question.options[question.correct]}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                    <p className="text-sm text-indigo-800">
                      <span className="font-medium">Explanation:</span> {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
