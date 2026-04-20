"use client"

import { motion } from "framer-motion"
import { FaUser, FaEnvelope, FaPhone, FaBullseye, FaCalendar, FaEdit } from "react-icons/fa"

interface ProfileInfoCardProps {
  fullName: string
  email: string
  phone?: string
  learningGoal: string
  joinedDate: string
  focus: string[]
  delay?: number
  onEdit?: () => void
}

export default function ProfileInfoCard({
  fullName,
  email,
  phone,
  learningGoal,
  joinedDate,
  focus,
  delay = 0,
  onEdit,
}: ProfileInfoCardProps) {
  const infoItems = [
    { icon: FaUser, label: "Full Name", value: fullName },
    { icon: FaEnvelope, label: "Email", value: email },
    ...(phone ? [{ icon: FaPhone, label: "Phone", value: phone }] : []),
    { icon: FaBullseye, label: "Learning Goal", value: learningGoal },
    { icon: FaCalendar, label: "Joined", value: joinedDate },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <FaUser className="w-4 h-4 text-white" />
          </span>
          Personal Info
        </h3>
        {onEdit && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <FaEdit className="w-3 h-3" />
            Edit
          </motion.button>
        )}
      </div>

      <div className="space-y-3">
        {infoItems.map((item, index) => (
          <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
              <item.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="text-sm font-medium text-slate-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Focus Areas */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500 mb-2">Learning Focus</p>
        <div className="flex flex-wrap gap-2">
          {focus.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-medium rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
