"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Timer } from "lucide-react"

export function MeetingTimer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  const reset = useCallback(() => {
    setRunning(false)
    setSeconds(0)
  }, [])

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  // Color shifts at time thresholds
  const isWarning = seconds >= 50 * 60 // 50min
  const isDanger = seconds >= 60 * 60  // 60min

  const ringColor = isDanger
    ? "text-red-500"
    : isWarning
      ? "text-amber-500"
      : "text-emerald-400"

  return (
    <motion.div layout className="relative">
      {/* Collapsed: compact pill */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center gap-2 rounded-2xl px-3 py-2 backdrop-blur-md
          border transition-colors duration-300
          ${running
            ? "bg-white/15 border-white/20"
            : "bg-white/10 border-white/10"
          }
        `}
      >
        <div className="relative">
          <Timer className={`w-4 h-4 ${ringColor}`} />
          {running && (
            <motion.div
              className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${isDanger ? "bg-red-500" : isWarning ? "bg-amber-400" : "bg-emerald-400"}`}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
        <span className="text-white font-mono text-sm font-bold tracking-wider">
          {mm}:{ss}
        </span>
      </motion.button>

      {/* Expanded: full controls */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl min-w-[200px] z-50"
          >
            {/* Time display */}
            <div className="text-center mb-3">
              <p className={`font-mono text-3xl font-black tracking-wider ${ringColor}`}>
                {mm}:{ss}
              </p>
              <p className="text-white/40 text-[10px] mt-1 font-medium">
                {isDanger ? "60分超過 — クロージングへ" : isWarning ? "残り10分 — まとめへ" : "商談タイマー"}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); setRunning(!running) }}
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                  ${running
                    ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                    : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  }
                `}
              >
                {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); reset() }}
                className="w-10 h-10 rounded-xl bg-white/10 text-white/50 hover:text-white/80 hover:bg-white/15 flex items-center justify-center transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
