'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaArrowRight, 
  FaHome, 
  FaChevronRight, 
  FaCheck, 
  FaTimes, 
  FaRedo,
  FaGraduationCap,
  FaBookOpen,
  FaClock
} from 'react-icons/fa'
import Link from 'next/link'
import { 
  examQuestions, 
  ExamAnswer, 
  calculateTopicScores, 
  getPerformanceLabel, 
  getRecommendations,
  TopicScore
} from './data'

export default function A1CheckpointExamPage() {
  const [examStarted, setExamStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<ExamAnswer[]>([])
  const [examCompleted, setExamCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('a1ExamProgress')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.examStarted) setExamStarted(true)
      if (parsed.currentQuestionIndex) setCurrentQuestionIndex(parsed.currentQuestionIndex)
      if (parsed.answers) setAnswers(parsed.answers)
      if (parsed.examCompleted) setExamCompleted(true)
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('a1ExamProgress', JSON.stringify({
        examStarted,
        currentQuestionIndex,
        answers,
        examCompleted
      }))
    }
  }, [examStarted, currentQuestionIndex, answers, examCompleted, isClient])

  const startExam = () => {
    setExamStarted(true)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setExamCompleted(false)
  }

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return
    setSelectedOption(index)
  }

  const submitAnswer = () => {
    if (selectedOption === null) return

    const currentQuestion = examQuestions[currentQuestionIndex]
    const isCorrect = selectedOption === currentQuestion.correct

    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect
    }])

    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOption(null)
    } else {
      setExamCompleted(true)
    }
  }

  const retakeExam = () => {
    setExamStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setAnswers([])
    setExamCompleted(false)
    localStorage.removeItem('a1ExamProgress')
  }

  const score = answers.filter(a => a.isCorrect).length
  const topicScores = calculateTopicScores(answers)
  const performance = getPerformanceLabel(score, examQuestions.length)
  const recommendations = getRecommendations(topicScores)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back to home link */}
        {!examStarted && (
          <div className="mb-6">
            <Link
              href="/classes/A1"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <FaHome size={18} />
              <span className="text-sm font-medium">Back to A1 Lessons</span>
            </Link>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!examStarted ? (
            <ExamIntroScreen key="intro" onStart={startExam} />
          ) : examCompleted ? (
            <ExamResultsScreen
              key="results"
              score={score}
              total={examQuestions.length}
              performance={performance}
              topicScores={topicScores}
              recommendations={recommendations}
              answers={answers}
              onRetake={retakeExam}
            />
          ) : (
            <ExamQuestionScreen
              key="question"
              question={examQuestions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={examQuestions.length}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              onSubmit={submitAnswer}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ExamIntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          <span>A1 Review Exam</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Lessons 1 to 4 Checkpoint</h1>
        <p className="text-indigo-100 text-lg">
          Test what you've learned from your first four A1 French lessons.
        </p>
      </div>

      <div className="p-8">
        <p className="text-slate-600 mb-8">
          This exam covers pronouns, articles, nouns, and present tense verbs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaBookOpen className="text-indigo-600" size={20} />
            </div>
            <div className="text-2xl font-bold text-slate-800">20</div>
            <div className="text-sm text-slate-500">Questions</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaClock className="text-indigo-600" size={20} />
            </div>
            <div className="text-2xl font-bold text-slate-800">8–12</div>
            <div className="text-sm text-slate-500">Minutes</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaGraduationCap className="text-indigo-600" size={20} />
            </div>
            <div className="text-2xl font-bold text-slate-800">A1</div>
            <div className="text-sm text-slate-500">Level</div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-8">
          <h3 className="font-semibold text-amber-800 mb-2">What to expect:</h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>You will see one question at a time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>Your final results will appear at the end.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>You can review weak areas after finishing.</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
        >
          <span>Start Exam</span>
          <FaArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}

interface ExamQuestionScreenProps {
  question: typeof examQuestions[0]
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  onSelectOption: (index: number) => void
  onSubmit: () => void
}

function ExamQuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onSubmit
}: ExamQuestionScreenProps) {
  const progress = (questionNumber / totalQuestions) * 100

  const getTopicColor = () => {
    switch (question.topic) {
      case 'pronouns': return 'bg-blue-100 text-blue-700'
      case 'articles': return 'bg-purple-100 text-purple-700'
      case 'nouns': return 'bg-pink-100 text-pink-700'
      case 'verbs': return 'bg-green-100 text-green-700'
      default: return 'bg-amber-100 text-amber-700'
    }
  }

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'text-green-600'
      case 'medium': return 'text-amber-600'
      case 'hard': return 'text-red-600'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
    >
      {/* Progress Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTopicColor()}`}>
              {question.topic}
            </span>
            <span className={`text-xs font-medium ${getDifficultyColor()}`}>
              {question.difficulty}
            </span>
          </div>
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
      <div className="p-6 sm:p-8">
        <h2 className="text-xl font-medium text-slate-800 mb-8 leading-relaxed">
          {question.prompt}
        </h2>

        <div className="space-y-3 mb-8">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              disabled={selectedOption !== null}
              className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                selectedOption === idx
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                  : 'border-slate-200 hover:border-indigo-300 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === idx
                    ? 'border-indigo-500 bg-indigo-500'
                    : 'border-slate-300'
                }`}>
                  {selectedOption === idx && <FaCheck size={12} className="text-white" />}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onSubmit}
          disabled={selectedOption === null}
          className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            selectedOption !== null
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>{questionNumber === totalQuestions ? 'Finish Exam' : 'Next Question'}</span>
          <FaChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}

interface ExamResultsScreenProps {
  score: number
  total: number
  performance: { label: string; color: string; message: string }
  topicScores: TopicScore[]
  recommendations: string[]
  answers: ExamAnswer[]
  onRetake: () => void
}

function ExamResultsScreen({
  score,
  total,
  performance,
  topicScores,
  recommendations,
  answers,
  onRetake
}: ExamResultsScreenProps) {
  const percentage = Math.round((score / total) * 100)
  const [showReview, setShowReview] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Score Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-1">Exam Complete!</h2>
          <p className="text-indigo-100">Nice work — you've completed the checkpoint.</p>
        </div>

        <div className="p-8 text-center">
          <div className="mb-6">
            <div className="text-5xl font-bold text-slate-800 mb-2">
              {score}<span className="text-slate-400">/{total}</span>
            </div>
            <div className="text-lg text-slate-600">{percentage}%</div>
          </div>

          <div className="mb-6">
            <div className={`text-xl font-semibold ${performance.color} mb-1`}>
              {performance.label}
            </div>
            <p className="text-slate-600">{performance.message}</p>
          </div>

          <div className="h-3 bg-slate-200 rounded-full overflow-hidden max-w-sm mx-auto mb-8">
            <div 
              className={`h-full ${
                percentage >= 75 ? 'bg-green-500' : 
                percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Topic Breakdown</h3>
        <div className="space-y-3">
          {topicScores.map((topic) => (
            <div key={topic.topic} className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium text-slate-600">{topic.topic}</div>
              <div className="flex-1">
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      topic.percentage >= 60 ? 'bg-green-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-sm text-right">
                <span className="font-medium text-slate-800">{topic.correct}</span>
                <span className="text-slate-400">/{topic.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-amber-700">
                <span>•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="/classes/A1"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <FaBookOpen size={16} />
          <span>Review Lessons</span>
        </Link>
        <button
          onClick={onRetake}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
        >
          <FaRedo size={16} />
          <span>Retake Exam</span>
        </button>
        <Link
          href="/classes/A1/lesson5"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all"
        >
          <span>Continue Learning</span>
          <FaArrowRight size={16} />
        </Link>
      </div>

      {/* Review Toggle */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={() => setShowReview(!showReview)}
          className="w-full py-3 rounded-xl font-medium border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
        >
          {showReview ? 'Hide Review' : 'Review All Answers'}
        </button>
      </div>

      {/* Review Section */}
      <AnimatePresence>
        {showReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-slate-800">Answer Review</h3>
            {examQuestions.map((question, idx) => {
              const answer = answers.find(a => a.questionId === question.id)
              if (!answer) return null

              const isCorrect = answer.isCorrect
              const selectedText = question.options[answer.selectedOption]
              const correctText = question.options[question.correct]

              return (
                <div 
                  key={question.id}
                  className={`rounded-xl border-2 p-4 ${
                    isCorrect 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {isCorrect ? (
                        <FaCheck size={12} className="text-white" />
                      ) : (
                        <FaTimes size={12} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 mb-1">
                        {idx + 1}. {question.prompt}
                      </p>
                      <div className="text-sm space-y-1">
                        <p className="text-slate-600">
                          Your answer: <span className={isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>{selectedText}</span>
                        </p>
                        {!isCorrect && (
                          <p className="text-green-700">
                            Correct answer: <span className="font-medium">{correctText}</span>
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 mt-2 italic">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
