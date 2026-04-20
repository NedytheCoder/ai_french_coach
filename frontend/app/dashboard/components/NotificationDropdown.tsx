"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaBell, FaCheck } from "react-icons/fa"
import NotificationItem, { Notification } from "./NotificationItem"

interface NotificationDropdownProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
  notifications: Notification[]
  onMarkAllRead?: () => void
  onNotificationClick?: (notification: Notification) => void
}

export default function NotificationDropdown({
  isOpen,
  onClose,
  onToggle,
  notifications,
  onMarkAllRead,
  onNotificationClick,
}: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.filter((n) => !n.read).length

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button with Badge */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        className="relative p-2 text-slate-600 hover:text-purple-600 transition-colors rounded-xl hover:bg-slate-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaBell className="w-5 h-5" />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full right-0 mt-3 w-80 sm:w-96 z-[100]"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <FaBell className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                    <p className="text-xs text-slate-500">
                      {unreadCount > 0 ? `${unreadCount} new` : "All caught up"}
                    </p>
                  </div>
                </div>
                
                {unreadCount > 0 && onMarkAllRead && (
                  <motion.button
                    onClick={onMarkAllRead}
                    className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaCheck className="w-3 h-3" />
                    Mark all read
                  </motion.button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <NotificationItem
                          notification={notification}
                          onClick={() => onNotificationClick?.(notification)}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Empty State */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 px-4 text-center"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-3"
                    >
                      <FaBell className="w-7 h-7 text-slate-400" />
                    </motion.div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-1">No notifications yet</h4>
                    <p className="text-xs text-slate-500 max-w-[200px]">
                      Complete lessons and achieve goals to get notifications!
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-200/50 text-center">
                  <button className="text-xs text-slate-500 hover:text-purple-600 font-medium transition-colors">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
