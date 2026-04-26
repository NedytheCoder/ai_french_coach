const getLevelFromScore = (score: number): { level: string; message: string; color: string } => {
  if (score <= 2) {
    return {
      level: "A0",
      message: "Every expert was once a beginner. Let's start your journey! 🌱",
      color: "from-green-400 to-emerald-500"
    }
  }
  if (score <= 4) {
    return {
      level: "A1",
      message: "Great start! You're building solid foundations. Keep going! 💪",
      color: "from-blue-400 to-cyan-500"
    }
  }
  if (score <= 6) {
    return {
      level: "A2",
      message: "Nice progress! You can express yourself in French now. 🎉",
      color: "from-purple-400 to-violet-500"
    }
  }
  if (score === 7) {
    return {
      level: "B1",
      message: "Impressive! Your speaking skills are getting strong. 🌟",
      color: "from-orange-400 to-amber-500"
    }
  }
  return {
    level: "B2",
    message: "Excellent! You have advanced speaking skills. 🏆",
    color: "from-red-400 to-rose-500"
  }
}

function ResultsScreen({
  totalXP,
  questionsCompleted,
  onRestart
}: {
  totalXP: number
  questionsCompleted: number
  onRestart: () => void
}) {
  const result = getLevelFromScore(questionsCompleted)

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 text-center"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Level badge */}
        <motion.div
          className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center shadow-xl`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="text-4xl font-bold text-white">{result.level}</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-2xl font-bold text-slate-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Speaking Test Complete!
        </motion.h2>

        <motion.p
          className="text-slate-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Great job practicing your French speaking skills!
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-4 bg-purple-50 rounded-2xl">
            <div className="text-3xl font-bold text-purple-600 mb-1">{questionsCompleted}</div>
            <div className="text-sm text-purple-700">Questions Done</div>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl">
            <div className="text-3xl font-bold text-amber-600 mb-1">{totalXP}</div>
            <div className="text-sm text-amber-700">XP Earned</div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(questionsCompleted / 8) * 100}%` }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={`h-full bg-gradient-to-r ${result.color} rounded-full`}
          />
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-slate-700 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {result.message}
        </motion.p>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            onClick={onRestart}
            className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Retake Test
          </motion.button>
          <Link href="/reception/tests" className="flex-1">
            <motion.button
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}