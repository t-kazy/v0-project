"use client"

import {
  ClipboardCheck,
  GitBranch,
  FileText,
  Building2,
  MessageSquareWarning,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

const sections = [
  {
    id: 0,
    icon: ClipboardCheck,
    label: "商談前チェック",
    timing: "商談10分前",
    phase: "before",
  },
  {
    id: 1,
    icon: GitBranch,
    label: "クロージングフロー",
    timing: "商談中・流れの確認",
    phase: "during",
  },
  {
    id: 2,
    icon: FileText,
    label: "トークスクリプト",
    timing: "言葉に詰まったとき",
    phase: "during",
  },
  {
    id: 3,
    icon: Building2,
    label: "業種別事例",
    timing: "事例を見せたいとき",
    phase: "during",
  },
  {
    id: 4,
    icon: MessageSquareWarning,
    label: "反論QA集",
    timing: "懸念を出されたとき",
    phase: "during",
  },
  {
    id: 5,
    icon: Calculator,
    label: "料金・ROI",
    timing: "お金の話になったとき",
    phase: "during",
  },
  {
    id: 6,
    icon: CheckCircle2,
    label: "商談後チェック",
    timing: "商談終了直後",
    phase: "after",
  },
]

interface HomeViewProps {
  onNavigate: (tabId: number) => void
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <motion.div
      className="pb-8 -mx-4 -mt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      {/* ===== HERO ===== */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e1a3a 0%, #2d1b4e 30%, #1e2a4a 60%, #162238 100%)" }}>

        {/* Animated mesh blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute rounded-full blur-[80px] opacity-20"
            style={{ width: 280, height: 280, top: -60, left: -80, background: "radial-gradient(circle, #dc2626, transparent 70%)" }}
            animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full blur-[80px] opacity-15"
            style={{ width: 260, height: 260, top: -40, right: -60, background: "radial-gradient(circle, #1d4ed8, transparent 70%)" }}
            animate={{ x: [0, -18, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute rounded-full blur-[100px] opacity-15"
            style={{ width: 300, height: 200, bottom: 0, left: "30%", background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
            animate={{ x: [0, 25, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 32px, rgba(255,255,255,0.8) 32px, rgba(255,255,255,0.8) 33px), repeating-linear-gradient(90deg, transparent, transparent 32px, rgba(255,255,255,0.8) 32px, rgba(255,255,255,0.8) 33px)"
          }}
        />

        {/* Title */}
        <motion.div variants={fadeUp} className="relative px-5 pt-8 pb-5 text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-3 backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase">Closer Control Panel</span>
          </div>
          <h1 className="text-white text-[26px] font-black leading-tight tracking-tight">
            クローザー専用<br />
            <span className="bg-gradient-to-r from-red-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              コントロールパネル
            </span>
          </h1>
          <p className="text-white/40 text-xs mt-2 tracking-wide">商談10分前に開く。必要な情報をすぐ引く。</p>
        </motion.div>

        {/* ===== PRODUCT CARDS ===== */}
        <div className="px-4 pb-6 grid grid-cols-2 gap-3">

          {/* ウリアゲAIX — RED */}
          <motion.button
            variants={cardVariants}
            onClick={() => onNavigate(2)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative overflow-hidden rounded-2xl min-h-[150px] flex flex-col justify-between p-4"
            style={{ background: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)" }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 0 30px rgba(220,38,38,0.3)" }} />
            {/* Decorative kanji */}
            <span className="absolute -right-2 -bottom-3 text-[88px] font-black text-white/10 select-none leading-none">攻</span>

            <div>
              <motion.div
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm"
                animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 12px rgba(255,255,255,0.25)", "0 0 0px rgba(255,255,255,0)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-white font-black text-sm">攻</span>
              </motion.div>
              <p className="text-white font-black text-sm leading-tight">ウリアゲ<br />AIX</p>
            </div>

            <div>
              <p className="text-red-200 text-[9px] font-medium leading-snug">営業強化・売上最大化</p>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-white/60 text-[9px]">スクリプトを開く</span>
                <ChevronRight className="w-3 h-3 text-white/60" />
              </div>
            </div>
          </motion.button>

          {/* カクヤクAIX — BLUE */}
          <motion.button
            variants={cardVariants}
            onClick={() => onNavigate(2)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative overflow-hidden rounded-2xl min-h-[150px] flex flex-col justify-between p-4"
            style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)" }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2, delay: 1.5 }}
            />
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 0 30px rgba(29,78,216,0.3)" }} />
            {/* Decorative kanji */}
            <span className="absolute -right-2 -bottom-3 text-[88px] font-black text-white/10 select-none leading-none">守</span>

            <div>
              <motion.div
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm"
                animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 12px rgba(255,255,255,0.25)", "0 0 0px rgba(255,255,255,0)"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <span className="text-white font-black text-sm">守</span>
              </motion.div>
              <p className="text-white font-black text-sm leading-tight">カクヤク<br />AIX</p>
            </div>

            <div>
              <p className="text-blue-200 text-[9px] font-medium leading-snug">組織変革・DX定着</p>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-white/60 text-[9px]">スクリプトを開く</span>
                <ChevronRight className="w-3 h-3 text-white/60" />
              </div>
            </div>
          </motion.button>
        </div>

        {/* ===== TAGLINE ===== */}
        <motion.div variants={fadeUp} className="px-4 pb-7">
          <div className="relative border border-white/10 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-sm overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            {/* Subtle animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "inset 0 0 20px rgba(251,191,36,0.1)" }}
            />
            <div className="flex-shrink-0">
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(251,191,36,0.15)" }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </div>
            <div>
              <p className="text-white text-xs font-bold leading-snug">最短3ヶ月で超生産性の<br />筋肉質な組織へ</p>
              <p className="text-white/40 text-[10px] mt-0.5">継続利用率 95% ・ 助成金承認率 100%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== SECTIONS ===== */}
      <div className="px-4 pt-5">
        <motion.p variants={fadeUp} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          商談フェーズ別コンテンツ
        </motion.p>

        {/* Before */}
        <motion.div variants={fadeUp} className="mb-2">
          <div className="flex items-center gap-2 mb-2 px-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-slate-400"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">商談前</span>
          </div>
          {sections.filter(s => s.phase === "before").map((s, i) => (
            <SectionRow key={s.id} section={s} onNavigate={onNavigate} index={i} />
          ))}
        </motion.div>

        {/* During */}
        <motion.div variants={fadeUp} className="mb-2">
          <div className="flex items-center gap-2 mb-2 px-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-red-500"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">商談中</span>
            <span className="text-[9px] text-red-400 font-medium ml-0.5">● LIVE</span>
          </div>
          {sections.filter(s => s.phase === "during").map((s, i) => (
            <SectionRow key={s.id} section={s} onNavigate={onNavigate} index={i} />
          ))}
        </motion.div>

        {/* After */}
        <motion.div variants={fadeUp} className="mb-2">
          <div className="flex items-center gap-2 mb-2 px-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">商談後</span>
          </div>
          {sections.filter(s => s.phase === "after").map((s, i) => (
            <SectionRow key={s.id} section={s} onNavigate={onNavigate} index={i} />
          ))}
        </motion.div>
      </div>

      {/* ===== BOTTOM QUOTE ===== */}
      <motion.div
        variants={fadeUp}
        className="mx-4 mt-5 rounded-2xl p-5 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e1a3a 0%, #1e2a4a 100%)" }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.15), transparent 70%)" }}
        />
        <p className="relative text-white/80 text-sm font-black leading-relaxed tracking-wide">
          「売るな、課題を解決せよ」
        </p>
        <p className="relative text-white/30 text-[10px] mt-1.5 tracking-wider">— キーエンス流 クロージング鉄則</p>
      </motion.div>

    </motion.div>
  )
}

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
      transition={{ delay: index * 0.06 + 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ x: 2 }}
      className="w-full flex items-center gap-3 px-3 py-3 mb-1.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-150 group"
    >
      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
        <Icon className="w-4 h-4 text-slate-600" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm font-bold text-slate-800 leading-none">{section.label}</p>
        <div className="flex items-center gap-1 mt-1">
          <Clock className="w-2.5 h-2.5 text-slate-400" />
          <p className="text-[10px] text-slate-400">{section.timing}</p>
        </div>
      </div>
      <motion.div
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      >
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
      </motion.div>
    </motion.button>
  )
}
