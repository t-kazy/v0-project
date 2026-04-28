"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PenLine, X, Trash2, Clock } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface Memo {
  id: string
  text: string
  createdAt: number
}

export function MeetingMemo() {
  const [open, setOpen] = useState(false)
  const [memos, setMemos] = useLocalStorage<Memo[]>("meeting-memos", [])
  const [draft, setDraft] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Focus textarea when opened
  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 100)
  }, [open])

  const addMemo = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    setMemos((prev) => [
      { id: Date.now().toString(), text: trimmed, createdAt: Date.now() },
      ...prev,
    ])
    setDraft("")
  }

  const deleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((m) => m.id !== id))
  }

  const clearAll = () => setMemos([])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) addMemo()
  }

  const formatTime = (ts: number) => {
    const d = new Date(ts)
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen(true)}
        className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/30 flex items-center justify-center"
      >
        <PenLine className="w-5 h-5 text-white" />
        {/* Badge */}
        <AnimatePresence>
          {memos.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shadow"
            >
              {memos.length > 9 ? "9+" : memos.length}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-slate-200" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                    <PenLine className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">商談メモ</h2>
                    <p className="text-[10px] text-slate-400">{memos.length}件保存中</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {memos.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      全削除
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Input area */}
              <div className="px-4 py-3 border-b border-slate-100">
                <textarea
                  ref={textareaRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="メモを入力... (⌘+Enterで保存)"
                  rows={3}
                  className="w-full text-sm text-slate-700 placeholder-slate-300 bg-slate-50 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300 focus:bg-white transition-all"
                />
                <div className="flex justify-end mt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={addMemo}
                    disabled={!draft.trim()}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-600 transition-colors"
                  >
                    保存
                  </motion.button>
                </div>
              </div>

              {/* Memo list */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                <AnimatePresence initial={false}>
                  {memos.length === 0 ? (
                    <div className="text-center py-8 text-slate-300">
                      <PenLine className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">メモはまだありません</p>
                    </div>
                  ) : (
                    memos.map((memo) => (
                      <motion.div
                        key={memo.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                            {memo.text}
                          </p>
                          <div className="flex items-center gap-1 mt-1.5">
                            <Clock className="w-2.5 h-2.5 text-slate-300" />
                            <span className="text-[10px] text-slate-400">{formatTime(memo.createdAt)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteMemo(memo.id)}
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors flex-shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
