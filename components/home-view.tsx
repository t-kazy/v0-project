"use client"

import { useState } from "react"
import {
  ClipboardCheck,
  GitBranch,
  FileText,
  Building2,
  MessageSquareWarning,
  Calculator,
  CheckCircle2,
  Dumbbell,
  Banknote,
  CalendarDays,
  ChevronRight,
  Clock,
  Zap,
  Shield,
  Search,
  Sparkles,
  Star,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { MeetingTimer } from "@/components/meeting-timer"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { scripts } from "@/components/sections/talk-scripts"
import { cn } from "@/lib/utils"

const CLOSING_TOTAL = 5

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sections = [
  { id: 0, icon: ClipboardCheck, label: "商談前チェック", timing: "商談10分前", phase: "before" as const },
  { id: 7, icon: Dumbbell, label: "ロープレ(テスト/練習)", timing: "商談前の実力確認", phase: "before" as const },
  { id: 9, icon: CalendarDays, label: "稼働カレンダー", timing: "テスト合格後・稼働枠登録", phase: "before" as const },
  { id: 1, icon: GitBranch, label: "クロージングフロー", timing: "商談中・流れの確認", phase: "during" as const },
  { id: 2, icon: FileText, label: "トークスクリプト", timing: "言葉に詰まったとき", phase: "during" as const },
  { id: 3, icon: Building2, label: "業種別事例", timing: "事例を見せたいとき", phase: "during" as const },
  { id: 4, icon: MessageSquareWarning, label: "反論QA集", timing: "懸念を出されたとき", phase: "during" as const },
  { id: 5, icon: Calculator, label: "料金・ROI", timing: "お金の話になったとき", phase: "during" as const },
  { id: 8, icon: Banknote, label: "助成金申請フォーム", timing: "クロージング→契約に進むとき", phase: "during" as const },
  { id: 6, icon: CheckCircle2, label: "商談後チェック", timing: "商談終了直後", phase: "after" as const },
]

const quickActions = [
  { id: 4, icon: MessageSquareWarning, label: "反論対応", desc: "即座に切り返し", color: "from-orange-500 to-red-600", iconBg: "bg-orange-500/20" },
  { id: 2, icon: FileText, label: "スクリプト", desc: "トーク確認", color: "from-blue-500 to-blue-700", iconBg: "bg-blue-500/20" },
  { id: 5, icon: Calculator, label: "料金提示", desc: "ROI計算", color: "from-emerald-500 to-teal-700", iconBg: "bg-emerald-500/20" },
]

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface HomeViewProps {
  onNavigate: (tabId: number) => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [completedSteps] = useLocalStorage<number[]>("closing-progress", [])
  const [pinnedKeys] = useLocalStorage<string[]>("pinned-scripts", [])

  const filteredSections = searchQuery
    ? sections.filter(
        (s) =>
          s.label.includes(searchQuery) ||
          s.timing.includes(searchQuery)
      )
    : sections

  return (
    <motion.div
      className="pb-8 -mx-4 lg:-mx-8 -mt-4 lg:-mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ===== HERO ===== */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0f0a1e 0%, #1a1040 25%, #0d1a3a 50%, #0a1628 100%)",
        }}
      >
        {/* Animated mesh background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Warm glow - top left */}
          <motion.div
            className="absolute rounded-full blur-[100px] opacity-30"
            style={{
              width: 320,
              height: 320,
              top: -80,
              left: -100,
              background:
                "radial-gradient(circle, #dc2626 0%, transparent 70%)",
            }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Cool glow - right */}
          <motion.div
            className="absolute rounded-full blur-[90px] opacity-20"
            style={{
              width: 280,
              height: 280,
              top: 20,
              right: -80,
              background:
                "radial-gradient(circle, #2563eb 0%, transparent 70%)",
            }}
            animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
          {/* Purple accent - center bottom */}
          <motion.div
            className="absolute rounded-full blur-[120px] opacity-15"
            style={{
              width: 350,
              height: 250,
              bottom: -40,
              left: "20%",
              background:
                "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            }}
            animate={{ x: [0, 35, 0] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)",
          }}
        />

        {/* Particle dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + i * 16}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Timer - absolute positioned top right */}
        <motion.div
          variants={fadeUp}
          className="relative z-20 flex justify-end px-4 lg:px-8 pt-4 lg:pt-6"
        >
          <MeetingTimer />
        </motion.div>

        {/* Hero content */}
        <motion.div variants={fadeUp} className="relative px-4 lg:px-8 pt-6 lg:pt-8 pb-4">
          {/* Badge */}
          <div className="flex items-center justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/60 text-[10px] font-bold tracking-[0.25em] uppercase">
                Closer Control Panel
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-2">
            <h1 className="text-white text-[26px] lg:text-4xl font-black leading-[1.2] tracking-tight">
              クローザー専用
              <br />
              <span className="bg-gradient-to-r from-red-400 via-orange-300 to-blue-400 bg-clip-text text-transparent">
                コントロールパネル
              </span>
            </h1>
            <p className="text-white/35 text-xs lg:text-sm mt-2 lg:mt-3 tracking-wide leading-relaxed">
              商談10分前に開く。必要な情報をすぐ引く。
            </p>
          </div>
        </motion.div>

        {/* ===== PRODUCT LOGO CARDS ===== */}
        <div className="px-4 lg:px-8 pb-5 lg:pb-6 grid grid-cols-2 gap-3 lg:gap-4">
          {/* ウリアゲAIX */}
          <motion.button
            variants={scaleIn}
            onClick={() => onNavigate(2)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03, y: -3 }}
            className="relative overflow-hidden rounded-2xl flex flex-col items-center p-0 group"
            style={{
              background:
                "linear-gradient(150deg, #1a0505 0%, #2d0a0a 40%, #0a0a0a 100%)",
            }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 3,
              }}
            />
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px rgba(220,38,38,0.15)",
              }}
            />

            {/* Logo with screen blend */}
            <div className="relative w-full pt-3 pb-2 px-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-uriage.png"
                alt="ウリアゲAIX"
                className="w-full h-auto"
                style={{ mixBlendMode: "screen" }}
              />
            </div>

            {/* Label */}
            <div className="relative z-10 w-full px-3 pb-3 flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-1 mb-0.5">
                  <Zap className="w-2.5 h-2.5 text-orange-400" />
                  <span className="text-orange-400 text-[9px] font-bold">攻</span>
                </div>
                <p className="text-white/40 text-[9px]">営業強化・売上最大化</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
            </div>
          </motion.button>

          {/* カクヤクAIX */}
          <motion.button
            variants={scaleIn}
            onClick={() => onNavigate(1)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03, y: -3 }}
            className="relative overflow-hidden rounded-2xl flex flex-col items-center p-0 group"
            style={{
              background:
                "linear-gradient(150deg, #020617 0%, #0a1a3a 40%, #0a0a0a 100%)",
            }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 3,
                delay: 1.5,
              }}
            />
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px rgba(37,99,235,0.15)",
              }}
            />

            {/* Logo with screen blend */}
            <div className="relative w-full pt-3 pb-2 px-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-kakuyaku.png"
                alt="カクヤクAIX"
                className="w-full h-auto"
                style={{ mixBlendMode: "screen" }}
              />
            </div>

            {/* Label */}
            <div className="relative z-10 w-full px-3 pb-3 flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-1 mb-0.5">
                  <Shield className="w-2.5 h-2.5 text-blue-400" />
                  <span className="text-blue-400 text-[9px] font-bold">守</span>
                </div>
                <p className="text-white/40 text-[9px]">組織変革・DX定着</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
            </div>
          </motion.button>
        </div>

        {/* ===== STATS BANNER ===== */}
        <motion.div variants={fadeUp} className="px-4 lg:px-8 pb-5 lg:pb-6">
          <div
            className="relative border border-white/[0.08] rounded-2xl px-4 py-3.5 backdrop-blur-sm overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                boxShadow: "inset 0 0 30px rgba(251,191,36,0.08)",
              }}
            />

            <div className="relative flex items-center gap-3">
              {/* Zap icon */}
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(251,191,36,0.12)" }}
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Zap className="w-5 h-5 text-yellow-400" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="text-white text-[13px] font-black leading-tight tracking-tight">
                  最短3ヶ月で超生産性の筋肉質な組織へ
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-2 flex-shrink-0">
                <div className="bg-white/[0.06] rounded-xl px-2.5 py-1.5 text-center">
                  <p className="text-yellow-300 text-sm font-black leading-none">
                    95%
                  </p>
                  <p className="text-white/40 text-[8px] mt-0.5">継続率</p>
                </div>
                <div className="bg-white/[0.06] rounded-xl px-2.5 py-1.5 text-center">
                  <p className="text-yellow-300 text-sm font-black leading-none">
                    100%
                  </p>
                  <p className="text-white/40 text-[8px] mt-0.5">承認率</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== CLOSING PROGRESS TRACKER ===== */}
      {completedSteps.length > 0 && (
        <motion.div variants={fadeUp} className="px-4 lg:px-8 pt-5 lg:pt-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-bold text-slate-800">クロージング進捗</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-800">
                  {completedSteps.length}
                  <span className="text-slate-300 font-bold">/{CLOSING_TOTAL}</span>
                </span>
                <button
                  onClick={() => onNavigate(1)}
                  className="text-[10px] font-bold text-blue-500 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg transition-colors"
                >
                  続ける →
                </button>
              </div>
            </div>
            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    completedSteps.length === CLOSING_TOTAL
                      ? "linear-gradient(90deg,#10b981,#34d399)"
                      : "linear-gradient(90deg,#3b82f6,#8b5cf6)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(completedSteps.length / CLOSING_TOTAL) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {["現状把握", "課題深掘", "影響", "理想", "決定"].map((label, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black transition-colors",
                    completedSteps.includes(i + 1)
                      ? "bg-blue-500 text-white shadow-sm"
                      : "bg-slate-100 text-slate-300"
                  )}>
                    {completedSteps.includes(i + 1) ? "✓" : i + 1}
                  </div>
                  <span className="text-[8px] text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ===== PINNED SCRIPTS ===== */}
      {pinnedKeys.length > 0 && (
        <motion.div variants={fadeUp} className="px-4 lg:px-8 pt-4">
          <div className="flex items-center gap-2 mb-2 px-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              ピン留めスクリプト
            </span>
          </div>
          <div className="space-y-2">
            {pinnedKeys.map((key) => {
              const s = scripts[key as keyof typeof scripts]
              if (!s) return null
              const PinIcon = s.icon
              return (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ x: 3 }}
                  onClick={() => onNavigate(2)}
                  className="w-full flex items-center gap-3 px-3 py-3 bg-amber-50 border border-amber-100 rounded-xl text-left group hover:border-amber-200 transition-colors"
                >
                  <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", s.badgeBg)}>
                    <PinIcon className={cn("w-4 h-4", s.badgeText)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700">{s.title}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{s.script.slice(0, 36)}…</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-300 group-hover:text-amber-500 transition-colors" />
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ===== QUICK ACTIONS (new feature) ===== */}
      <div className="px-4 lg:px-8 pt-5 lg:pt-6 pb-1">
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3 px-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            クイックアクション
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2.5">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.id}
                whileTap={{ scale: 0.93 }}
                whileHover={{ y: -2 }}
                onClick={() => onNavigate(action.id)}
                className="relative overflow-hidden rounded-2xl p-3 text-center group"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,1))",
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
                }}
              >
                {/* Gradient top accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${action.color} opacity-60 group-hover:opacity-100 transition-opacity`}
                />
                <div
                  className={`w-9 h-9 mx-auto rounded-xl ${action.iconBg} flex items-center justify-center mb-2`}
                >
                  <Icon className="w-4 h-4 text-slate-700" />
                </div>
                <p className="text-[11px] font-bold text-slate-800 leading-none">
                  {action.label}
                </p>
                <p className="text-[9px] text-slate-400 mt-1">{action.desc}</p>
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <motion.div variants={fadeUp} className="px-4 lg:px-8 pt-5 lg:pt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="セクション検索..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs hover:bg-slate-300 transition-colors"
              >
                &times;
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ===== SECTIONS: 1-col mobile / 3-col PC ===== */}
      <div className="px-4 lg:px-8 pt-5 lg:pt-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <PhaseGroup
            label="商談前"
            dotColor="bg-slate-400"
            labelColor="text-slate-400"
            sections={filteredSections.filter((s) => s.phase === "before")}
            onNavigate={onNavigate}
          />
          <PhaseGroup
            label="商談中"
            dotColor="bg-red-500"
            labelColor="text-red-500"
            isLive
            sections={filteredSections.filter((s) => s.phase === "during")}
            onNavigate={onNavigate}
          />
          <PhaseGroup
            label="商談後"
            dotColor="bg-emerald-500"
            labelColor="text-emerald-500"
            sections={filteredSections.filter((s) => s.phase === "after")}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* ===== BOTTOM QUOTE ===== */}
      <motion.div variants={fadeUp} className="mx-4 lg:mx-8 mt-2 mb-8">
        <div
          className="relative rounded-2xl overflow-hidden p-5 text-center"
          style={{
            background:
              "linear-gradient(150deg, #0f0a1e 0%, #1a1040 40%, #0d1a3a 100%)",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.15), transparent 70%)",
            }}
          />
          <p className="relative text-white/80 text-base font-black leading-relaxed tracking-wide">
            「売るな、課題を解決せよ」
          </p>
          <p className="relative text-white/25 text-xs mt-1.5 tracking-wider">
            — キーエンス流 クロージング鉄則
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Phase Group                                                        */
/* ------------------------------------------------------------------ */

function PhaseGroup({
  label,
  dotColor,
  labelColor,
  isLive,
  sections: phaseSections,
  onNavigate,
}: {
  label: string
  dotColor: string
  labelColor: string
  isLive?: boolean
  sections: typeof sections
  onNavigate: (id: number) => void
}) {
  if (phaseSections.length === 0) return null

  return (
    <motion.div variants={fadeUp} className="mb-3">
      <div className="flex items-center gap-2 mb-2 px-1">
        <motion.div
          className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
          animate={
            isLive
              ? { scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }
              : { scale: [1, 1.3, 1] }
          }
          transition={{
            duration: isLive ? 1.2 : 2.5,
            repeat: Infinity,
          }}
        />
        <span
          className={`text-[10px] font-bold ${labelColor} uppercase tracking-wider`}
        >
          {label}
        </span>
        {isLive && (
          <span className="text-[9px] text-red-400 font-bold ml-0.5 flex items-center gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            LIVE
          </span>
        )}
      </div>

      {phaseSections.map((s, i) => (
        <SectionRow key={s.id} section={s} onNavigate={onNavigate} index={i} />
      ))}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section Row                                                        */
/* ------------------------------------------------------------------ */

function SectionRow({
  section,
  onNavigate,
  index,
}: {
  section: (typeof sections)[number]
  onNavigate: (id: number) => void
  index: number
}) {
  const Icon = section.icon
  return (
    <motion.button
      onClick={() => onNavigate(section.id)}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.05 + 0.2,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ x: 3 }}
      className="w-full flex items-center gap-3 px-3 py-3 mb-1.5 bg-white border border-slate-200/80 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-150 group"
    >
      <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
        <Icon className="w-4 h-4 text-slate-600" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm font-bold text-slate-800 leading-none">
          {section.label}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <Clock className="w-2.5 h-2.5 text-slate-400" />
          <p className="text-[10px] text-slate-400">{section.timing}</p>
        </div>
      </div>
      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
      >
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
      </motion.div>
    </motion.button>
  )
}
