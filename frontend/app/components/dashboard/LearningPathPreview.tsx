"use client"

import { motion } from "framer-motion"
import { FaCheck, FaLock, FaStar, FaCircle } from "react-icons/fa"

interface PathNode {
  id: string
  title: string
  status: "completed" | "current" | "locked"
  type: "lesson" | "quiz" | "milestone"
}

interface LearningPathPreviewProps {
  nodes: PathNode[]
  currentLevel: string
}

export function LearningPathPreview({ nodes, currentLevel }: LearningPathPreviewProps) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Learning Path</h3>
          <p className="text-sm text-slate-500">Your French adventure continues</p>
        </div>
        <motion.div
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold"
          whileHover={{ scale: 1.05 }}
        >
          {currentLevel}
        </motion.div>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-8 left-8 right-8 h-1 bg-slate-100 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((nodes.filter(n => n.status === "completed").length + 0.5) / nodes.length) * 100}%` }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          />
        </div>

        {/* Nodes */}
        <div className="flex justify-between items-start relative z-10">
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                  node.status === "completed"
                    ? "bg-gradient-to-br from-emerald-400 to-emerald-500 cursor-pointer"
                    : node.status === "current"
                    ? "bg-gradient-to-br from-purple-500 to-blue-500 ring-4 ring-purple-200"
                    : "bg-slate-100"
                }`}
                whileHover={
                  node.status !== "locked"
                    ? { scale: 1.1, rotate: 5 }
                    : {}
                }
                animate={
                  node.status === "current"
                    ? {
                        boxShadow: [
                          "0 10px 15px -3px rgba(139,92,246,0.3)",
                          "0 0 30px rgba(139,92,246,0.5)",
                          "0 10px 15px -3px rgba(139,92,246,0.3)",
                        ],
                      }
                    : {}
                }
                transition={
                  node.status === "current"
                    ? { boxShadow: { duration: 2, repeat: Infinity } }
                    : {}
                }
              >
                {node.status === "completed" && (
                  <FaCheck className="w-7 h-7 text-white" />
                )}
                {node.status === "current" && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {node.type === "milestone" ? (
                      <FaStar className="w-7 h-7 text-white" />
                    ) : (
                      <FaCircle className="w-4 h-4 text-white fill-current" />
                    )}
                  </motion.div>
                )}
                {node.status === "locked" && (
                  <FaLock className="w-5 h-5 text-slate-400" />
                )}
              </motion.div>

              <motion.div
                className={`mt-3 px-3 py-1.5 rounded-xl text-xs font-semibold text-center max-w-[80px] ${
                  node.status === "completed"
                    ? "bg-emerald-50 text-emerald-700"
                    : node.status === "current"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-slate-50 text-slate-400"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {node.title}
              </motion.div>

              {node.status === "current" && (
                <motion.div
                  className="mt-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold rounded-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15, delay: 1 }}
                >
                  NOW
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-sm text-purple-800 text-center font-medium">
          🎯 Complete your current lesson to unlock the next step!
        </p>
      </motion.div>
    </motion.div>
  )
}
