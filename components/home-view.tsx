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
} from "lucide-react"

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

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="pb-8 -mx-4 -mt-4">

      {/* ===== HERO: BLACK BASE ===== */}
      <div className="relative bg-[#0d0d0d] overflow-hidden">

        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)"
          }}
        />

        {/* Title */}
        <div className="relative px-5 pt-7 pb-5 text-center">
          <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Closer Control Panel</p>
          <h1 className="text-white text-2xl font-black leading-tight tracking-tight">
            クローザー専用<br />コントロールパネル
          </h1>
          <p className="text-white/40 text-xs mt-2">商談10分前に開く。必要な情報をすぐ引く。</p>
        </div>

        {/* ===== PRODUCT SPLIT ===== */}
        <div className="px-4 pb-6 grid grid-cols-2 gap-3">

          {/* ウリアゲAIX — RED */}
          <button
            onClick={() => onNavigate(2)}
            className="relative overflow-hidden rounded-2xl min-h-[140px] flex flex-col justify-between p-4 active:scale-[0.97] transition-transform"
            style={{ background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)" }}
          >
            {/* Decorative kanji */}
            <span className="absolute -right-3 -bottom-4 text-[80px] font-black text-white/10 select-none leading-none">攻</span>

            <div>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-black text-sm">攻</span>
              </div>
              <p className="text-white font-black text-sm leading-tight">ウリアゲ<br />AIX</p>
            </div>

            <div>
              <p className="text-red-200 text-[9px] font-medium leading-snug">営業強化・売上最大化</p>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-white/60 text-[9px]">スクリプトを開く</span>
                <ChevronRight className="w-3 h-3 text-white/60" />
              </div>
            </div>
          </button>

          {/* カクヤクAIX — BLUE */}
          <button
            onClick={() => onNavigate(2)}
            className="relative overflow-hidden rounded-2xl min-h-[140px] flex flex-col justify-between p-4 active:scale-[0.97] transition-transform"
            style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}
          >
            {/* Decorative kanji */}
            <span className="absolute -right-3 -bottom-4 text-[80px] font-black text-white/10 select-none leading-none">守</span>

            <div>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-black text-sm">守</span>
              </div>
              <p className="text-white font-black text-sm leading-tight">カクヤク<br />AIX</p>
            </div>

            <div>
              <p className="text-blue-200 text-[9px] font-medium leading-snug">組織変革・DX定着</p>
              <div className="flex items-center gap-1 mt-1.5">
                <span className="text-white/60 text-[9px]">スクリプトを開く</span>
                <ChevronRight className="w-3 h-3 text-white/60" />
              </div>
            </div>
          </button>
        </div>

        {/* ===== TAGLINE ===== */}
        <div className="px-4 pb-7">
          <div className="border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <span className="text-white/60 text-lg">⚡</span>
              </div>
            </div>
            <div>
              <p className="text-white text-xs font-bold leading-snug">最短3ヶ月で超生産性の<br />筋肉質な組織へ</p>
              <p className="text-white/40 text-[10px] mt-0.5">継続利用率 95% ・ 助成金承認率 100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTIONS ===== */}
      <div className="px-4 pt-5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          商談フェーズ別コンテンツ
        </p>

        {/* Before */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">商談前</span>
          </div>
          {sections.filter(s => s.phase === "before").map(s => (
            <SectionRow key={s.id} section={s} onNavigate={onNavigate} />
          ))}
        </div>

        {/* During */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">商談中</span>
          </div>
          {sections.filter(s => s.phase === "during").map(s => (
            <SectionRow key={s.id} section={s} onNavigate={onNavigate} />
          ))}
        </div>

        {/* After */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">商談後</span>
          </div>
          {sections.filter(s => s.phase === "after").map(s => (
            <SectionRow key={s.id} section={s} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* ===== BOTTOM QUOTE ===== */}
      <div className="mx-4 mt-5 rounded-2xl bg-[#0d0d0d] p-4 text-center">
        <p className="text-white/70 text-xs font-bold leading-relaxed">
          「売るな、課題を解決せよ」
        </p>
        <p className="text-white/30 text-[10px] mt-1">— キーエンス流 クロージング鉄則</p>
      </div>

    </div>
  )
}

function SectionRow({
  section,
  onNavigate,
}: {
  section: (typeof sections)[number]
  onNavigate: (id: number) => void
}) {
  const Icon = section.icon
  return (
    <button
      onClick={() => onNavigate(section.id)}
      className="w-full flex items-center gap-3 px-3 py-3 mb-1 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150 group"
    >
      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-600" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm font-bold text-slate-800 leading-none">{section.label}</p>
        <div className="flex items-center gap-1 mt-1">
          <Clock className="w-2.5 h-2.5 text-slate-400" />
          <p className="text-[10px] text-slate-400">{section.timing}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
    </button>
  )
}
