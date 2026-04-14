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
  Shield,
} from "lucide-react"

const sections = [
  {
    id: 0,
    icon: ClipboardCheck,
    label: "商談前チェック",
    timing: "商談10分前",
    desc: "業種・担当者確認、提案軸（攻/守）の仮説立て、マインドセット確認",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    dot: "bg-blue-500",
    phase: "before",
  },
  {
    id: 1,
    icon: GitBranch,
    label: "クロージングフロー",
    timing: "商談中・流れの確認",
    desc: "SPIN営業法ベースの5ステップ。現状把握→課題深掘り→影響→理想→クロージング",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    dot: "bg-blue-500",
    phase: "during",
  },
  {
    id: 2,
    icon: FileText,
    label: "トークスクリプト",
    timing: "言葉に詰まったとき",
    desc: "ウリアゲAIX・カクヤクAIX・両方対応のコピペ可能なトークスクリプト集",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    dot: "bg-blue-500",
    phase: "during",
  },
  {
    id: 3,
    icon: Building2,
    label: "業種別事例",
    timing: "事例を見せたいとき",
    desc: "建設・医療・営業・IT・士業の5業種別 Before/After事例ライブラリ",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    dot: "bg-blue-500",
    phase: "during",
  },
  {
    id: 4,
    icon: MessageSquareWarning,
    label: "反論QA集",
    timing: "懸念を出されたとき",
    desc: "コスト・リテラシー不安・時間・定着・競合比較・稟議の6カテゴリ対応",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    dot: "bg-orange-500",
    phase: "during",
  },
  {
    id: 5,
    icon: Calculator,
    label: "料金・ROI",
    timing: "お金の話になったとき",
    desc: "助成金適用後¥100,000〜。インタラクティブROI計算機・導入フロー",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    dot: "bg-blue-500",
    phase: "during",
  },
  {
    id: 6,
    icon: CheckCircle2,
    label: "商談後チェック",
    timing: "商談終了直後",
    desc: "温度感・反論・次のアクションを記録。お礼メッセージテンプレート付き",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
    dot: "bg-green-500",
    phase: "after",
  },
]

const phases = [
  { key: "before", label: "商談前", icon: Clock, color: "text-slate-600", lineColor: "bg-slate-300" },
  { key: "during", label: "商談中", icon: Zap, color: "text-blue-600", lineColor: "bg-blue-300" },
  { key: "after", label: "商談後", icon: CheckCircle2, color: "text-green-600", lineColor: "bg-green-300" },
]

interface HomeViewProps {
  onNavigate: (tabId: number) => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="pb-8">

      {/* ===== HERO ===== */}
      <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 px-5 pt-6 pb-8 -mx-4 -mt-4 mb-5">
        <div className="max-w-xl mx-auto">
          {/* Product badges */}
          <div className="flex gap-2 mb-3">
            <span className="flex items-center gap-1 text-[10px] font-bold bg-orange-400/20 text-orange-200 border border-orange-400/30 px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" />
              ウリアゲAIX（攻）
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold bg-blue-400/20 text-blue-200 border border-blue-300/30 px-2 py-0.5 rounded-full">
              <Shield className="w-3 h-3" />
              カクヤクAIX（守）
            </span>
          </div>

          <h1 className="text-white text-xl font-black leading-tight mb-1">
            クローザー専用<br />コントロールパネル
          </h1>
          <p className="text-blue-200 text-xs leading-relaxed">
            商談10分前に開いて、必要な情報をすぐ引く。<br />
            全7セクションが商談の流れに沿って設計されています。
          </p>

          {/* Stats row */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
            {[
              { val: "7", label: "セクション" },
              { val: "5", label: "業種別事例" },
              { val: "6", label: "反論パターン" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-white text-lg font-black">{s.val}</div>
                <div className="text-blue-300 text-[9px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== HOW TO USE ===== */}
      <div className="mb-5">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
          商談フェーズ別ガイド
        </h2>

        <div className="space-y-4">
          {phases.map((phase) => {
            const phaseSections = sections.filter((s) => s.phase === phase.key)
            const PhaseIcon = phase.icon

            return (
              <div key={phase.key}>
                {/* Phase header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${phase.lineColor.replace("bg-", "bg-").replace("-300", "-100")}`}>
                    <PhaseIcon className={`w-3 h-3 ${phase.color}`} />
                  </div>
                  <span className={`text-xs font-bold ${phase.color}`}>{phase.label}</span>
                  <div className={`flex-1 h-px ${phase.lineColor} opacity-50`} />
                </div>

                {/* Section cards */}
                <div className="space-y-2 pl-1">
                  {phaseSections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => onNavigate(section.id)}
                        className={`w-full text-left bg-white border ${section.border} rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all duration-150 active:scale-[0.98] group`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className={`w-9 h-9 rounded-lg ${section.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className={`w-4.5 h-4.5 ${section.color}`} />
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-bold text-slate-800">{section.label}</span>
                              <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0 group-hover:text-slate-500 transition-colors" />
                            </div>
                            <div className="flex items-center gap-1 mt-0.5 mb-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span className="text-[10px] text-slate-400 font-medium">{section.timing}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug">{section.desc}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ===== QUICK ACCESS ===== */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
          クイックアクセス
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl ${section.bg} border ${section.border} active:scale-95 transition-transform`}
              >
                <Icon className={`w-5 h-5 ${section.color}`} />
                <span className={`text-[9px] font-bold ${section.color} text-center leading-tight`}>
                  {section.label.length > 6 ? section.label.slice(0, 5) + "…" : section.label}
                </span>
              </button>
            )
          })}
          {/* Spacer for 4-column grid alignment */}
          <div />
        </div>
      </div>

      {/* ===== FOOTER NOTE ===== */}
      <div className="mt-6 p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center">
        <p className="text-[10px] text-slate-500 leading-relaxed">
          「次のアクションを決めずに終わらない」<br />
          <span className="text-slate-400">— キーエンス流 クロージング鉄則</span>
        </p>
      </div>

    </div>
  )
}
