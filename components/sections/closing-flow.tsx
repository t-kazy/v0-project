"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, CheckCircle2, RotateCcw, Cpu, FileText as PaperIcon, AlertTriangle, Sparkles, X, ArrowUpRight, Building2, MessageSquareQuote, ExternalLink } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/use-local-storage"

type LiteracyLevel = "high" | "low"

const escalationTriggers = [
  {
    category: "開発系",
    examples: ["スクラッチ開発・カスタム機能要望", "既存システムとの特殊な連携", "独自AIモデルの構築要望", "技術的に踏み込んだPoC依頼"],
  },
  {
    category: "マーケティング系",
    examples: ["個別マーケ戦略の立案", "広告運用・MA設計の相談", "ブランディング・LP制作", "データ分析基盤の構築"],
  },
  {
    category: "その他",
    examples: ["当社標準サービス範囲外の要望", "他社サービスとの統合・置き換え", "特殊な契約形態(レベニューシェア等)"],
  },
]

const ESCALATION_SCRIPT = `「ありがとうございます。〇〇というご相談、非常に重要なポイントですね。

ただ、その領域は当社の標準的なサービス範囲を超える部分があり、私の判断だけで詳細をお約束することができません。

最適な形でご提案させていただくため、一度社内に持ち帰らせてください。

具体的にどのような〇〇をお考えか、もう少し詳しくお聞かせいただけますか？

内容を整理のうえ、〇営業日以内に運営チームから最適な対応案と次のステップをご連絡いたします。」`

const ESCALATION_HEARING = [
  "ご要望の具体的な内容（何を / どこまで）",
  "想定スケジュール（いつまでに）",
  "想定予算規模",
  "意思決定者・関与者",
  "現在検討中の他社・他案",
]

const literacyGuides: Record<LiteracyLevel, {
  label: string
  sub: string
  emoji: string
  accent: string
  bg: string
  border: string
  text: string
  icon: typeof Cpu
  approach: string
  watchOuts: string[]
}> = {
  high: {
    label: "ITリテラシー: 高い",
    sub: "テック先行型（DX推進中・自社開発検討あり）",
    emoji: "💻",
    accent: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: Cpu,
    approach: "数値・データ重視で論理的に。技術仕様や連携性にも踏み込み、自社開発との比較を視野に入れて話す。",
    watchOuts: [
      "「自社で作れる」プライドを崩す論点を準備（経営的ROI / 機会損失）",
      "技術質問への即答力が信頼に直結",
      "話すペースは速め・抽象論より具体仕様",
    ],
  },
  low: {
    label: "ITリテラシー: 低い",
    sub: "アナログ慣性型（紙・ハンコ・スマホ中心）",
    emoji: "📄",
    accent: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    icon: PaperIcon,
    approach: "専門用語を封印し、成功事例の「物語」で語る。小さな第一歩を提示して心理的ハードルを下げる。",
    watchOuts: [
      "1度「分かりにくい」と思われると一気に冷める",
      "成功事例は同業 or 同規模の具体例を用意",
      "話すペースはゆっくり・図や紙でも示す",
    ],
  },
}

const closingSteps = [
  {
    id: 1,
    title: "現状把握",
    purpose: "お客様の現在の状況を正確に理解する",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    script: `「まず、御社の現在の状況についてお聞かせください。
現在の営業チームは何名体制でしょうか？
月間の商談数と成約率はどのくらいですか？
現在、営業活動で一番の課題は何だとお感じですか？」`,
    confirmations: [
      { item: "チーム人数", check: "〇〇名" },
      { item: "月間商談数", check: "〇〇件" },
      { item: "現状の成約率", check: "〇〇%" },
    ],
  },
  {
    id: 2,
    title: "課題深掘り",
    purpose: "表面的な課題から本質的な問題を特定する",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    script: `「その課題について、もう少し詳しくお聞かせください。
その問題は、いつ頃から感じていらっしゃいますか？
これまでに何か対策は取られましたか？
その対策がうまくいかなかった原因は何だとお考えですか？」`,
    confirmations: [
      { item: "課題の発生時期", check: "〇〇年〇月頃" },
      { item: "過去の対策", check: "〇〇を実施" },
      { item: "失敗要因", check: "〇〇が原因" },
    ],
  },
  {
    id: 3,
    title: "影響の言語化",
    purpose: "課題が及ぼす影響を具体的に認識させる",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    script: `「この課題を放置した場合、どのような影響があると思われますか？
売上への影響はどのくらいでしょうか？
チームのモチベーションへの影響は？
競合との差は広がりそうですか？」`,
    confirmations: [
      { item: "売上への影響", check: "年間〇〇万円の損失" },
      { item: "チームへの影響", check: "離職リスク〇〇%" },
      { item: "競合との差", check: "〇〇で劣位" },
    ],
  },
  {
    id: 4,
    title: "理想状態",
    purpose: "解決後の理想的な状態をイメージさせる",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    script: `「理想的な状態とは、どのようなものでしょうか？
成約率はどのくらいまで上げたいですか？
営業チームにはどのような変化を期待しますか？
それが実現したら、御社はどのように変わりますか？」`,
    confirmations: [
      { item: "目標成約率", check: "〇〇%（現状+〇〇%）" },
      { item: "チームの変化", check: "〇〇ができるように" },
      { item: "会社の変化", check: "〇〇を達成" },
    ],
  },
  {
    id: 5,
    title: "クロージング",
    purpose: "導入への意思決定を促す",
    color: "bg-red-500",
    lightColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    script: `「ここまでのお話を整理させてください。
御社の課題は〇〇で、放置すると〇〇の影響がある。
理想は〇〇で、それには〇〇が必要。
当社のソリューションなら、それを〇〇で実現できます。
次のステップとして、〇〇はいかがでしょうか？」`,
    confirmations: [
      { item: "課題の合意", check: "はい / 修正あり" },
      { item: "解決策の理解", check: "十分 / 要説明" },
      { item: "次のアクション", check: "〇〇を予定" },
    ],
  },
]

export function ClosingFlowSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1)
  const [completedSteps, setCompletedSteps] = useLocalStorage<number[]>(
    "closing-progress",
    []
  )
  const [literacyLevel, setLiteracyLevel] = useLocalStorage<LiteracyLevel | null>(
    "closing-literacy-level",
    null
  )
  const [escalationOpen, setEscalationOpen] = useState(false)

  const toggleStep = (stepId: number) =>
    setExpandedStep(expandedStep === stepId ? null : stepId)

  const toggleComplete = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    )
  }

  const resetProgress = () => setCompletedSteps([])

  const progress = (completedSteps.length / closingSteps.length) * 100

  const guide = literacyLevel ? literacyGuides[literacyLevel] : null

  return (
    <div className="space-y-4">

      {/* ===== AI CRISIS DIAGNOSIS CARD (ニーズ喚起ツール) ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-orange-500 to-red-500" />
        <div className="p-4 space-y-2.5">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">ニーズ喚起ツール</span>
            </div>
            <p className="text-sm font-bold text-slate-800 leading-tight">AI危機診断</p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
              理想は商談前に顧客側で実施。未診断の場合は商談中にこの画面を共有 / URLを送って一緒に進めてください
            </p>
          </div>

          {/* Primary CTA */}
          <a
            href="https://aidiagnosis-wxpz59bh.manus.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
          >
            <AlertTriangle className="w-4 h-4" />
            AI危機診断を開く
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

      {/* ===== LITERACY BRANCH CARD ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest">大前提</span>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-tight">お客様のITリテラシーは？</p>
              <p className="text-[10px] text-slate-400 mt-0.5">話し方・キーワード選びの方針が変わります</p>
            </div>
            {literacyLevel && (
              <button
                onClick={() => setLiteracyLevel(null)}
                className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                <X className="w-3 h-3" />
                変更
              </button>
            )}
          </div>

          {/* Selection buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            {(["high", "low"] as LiteracyLevel[]).map((lv) => {
              const g = literacyGuides[lv]
              const Icon = g.icon
              const selected = literacyLevel === lv
              return (
                <button
                  key={lv}
                  onClick={() => setLiteracyLevel(lv)}
                  className={cn(
                    "relative p-3 rounded-xl border-2 transition-all duration-200 text-left",
                    selected
                      ? `${g.border} ${g.bg}`
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {selected && (
                    <div className={cn(
                      "absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center",
                      `bg-gradient-to-br ${g.accent}`
                    )}>
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={cn("w-4 h-4", selected ? g.text : "text-slate-400")} />
                    <span className={cn("text-[9px] font-black uppercase tracking-wider", selected ? g.text : "text-slate-400")}>
                      {lv === "high" ? "高い" : "低い"}
                    </span>
                  </div>
                  <p className={cn("text-xs font-bold leading-tight", selected ? "text-slate-800" : "text-slate-700")}>
                    {lv === "high" ? "テック先行型" : "アナログ慣性型"}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                    {lv === "high" ? "DX推進中・自社開発検討" : "紙・ハンコ・スマホ中心"}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Guide content */}
          <AnimatePresence mode="wait">
            {guide && (
              <motion.div
                key={literacyLevel}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                {/* Approach */}
                <div className={cn("p-2.5 rounded-lg border", guide.border, guide.bg)}>
                  <p className={cn("text-[10px] font-bold uppercase tracking-wider mb-1", guide.text)}>
                    アプローチ基本方針
                  </p>
                  <p className="text-[11px] text-slate-700 leading-relaxed">{guide.approach}</p>
                </div>

                {/* Reference to talk-scripts for keywords */}
                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    💬 <span className="font-bold">効果的キーワード / NG表現</span> は
                    「<span className="font-bold text-slate-800">トークスクリプト</span>」タブの
                    「<span className="font-bold text-slate-800">ITリテラシー別チートシート</span>」をご参照ください
                  </p>
                </div>

                {/* Watch outs */}
                <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    商談の進め方・注意点
                  </p>
                  <ul className="space-y-1">
                    {guide.watchOuts.map((w, i) => (
                      <li key={i} className="text-[11px] text-slate-700 leading-relaxed flex gap-1.5">
                        <span className="text-amber-500 flex-shrink-0">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
            {!guide && (
              <p className="text-[10px] text-slate-400 text-center py-1">
                選択するとアプローチ方針が表示されます
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===== ESCALATION CARD (high literacy only, collapsible) ===== */}
      <AnimatePresence>
        {literacyLevel === "high" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl border-2 border-rose-200 shadow-sm overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-rose-500 to-orange-500" />

            {/* Toggle header (always visible) */}
            <button
              onClick={() => setEscalationOpen((v) => !v)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-rose-50/40 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <ArrowUpRight className="w-3 h-3 text-rose-500" />
                  <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest">
                    テック先行型 限定 / 必要時のみ
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-800 leading-tight">
                  こんな相談が出たら…？
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  開発 / マーケの個別相談 → クローザー判断不可・持ち帰り対応
                </p>
              </div>
              {escalationOpen
                ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
            </button>

            {/* Collapsible content */}
            <AnimatePresence>
              {escalationOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3 border-t border-rose-100">

                    {/* Lead text */}
                    <p className="text-[11px] text-slate-600 leading-relaxed pt-3">
                      テック先行型のお客様からは、現場DX以外に<span className="font-bold text-rose-700">開発・マーケの個別相談</span>が
                      来ることがあります。クローザーの一存で進めず、必ず一度持ち帰って運営判断を仰いでください。
                    </p>

                    {/* Escalation triggers */}
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-2">
                      <p className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                        エスカレーション対象（こんな相談が出たら持ち帰り）
                      </p>
                      <div className="space-y-2">
                        {escalationTriggers.map((t) => (
                          <div key={t.category} className="bg-white border border-rose-100 rounded-lg p-2">
                            <p className="text-[11px] font-bold text-rose-700 mb-1 flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {t.category}
                            </p>
                            <ul className="space-y-0.5">
                              {t.examples.map((ex, i) => (
                                <li key={i} className="text-[11px] text-slate-700 flex gap-1.5 leading-snug">
                                  <span className="text-rose-400 flex-shrink-0">•</span>
                                  <span>{ex}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Escalation script */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                          <MessageSquareQuote className="w-3 h-3 text-rose-500" />
                          持ち帰りトークスクリプト
                        </p>
                        <CopyButton text={ESCALATION_SCRIPT} />
                      </div>
                      <div className="rounded-xl p-3 border-l-4 border-rose-300 bg-slate-50">
                        <p className="font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {ESCALATION_SCRIPT}
                        </p>
                      </div>
                    </div>

                    {/* Hearing items */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1.5">
                        持ち帰る前にヒアリングする項目
                      </p>
                      <ul className="space-y-1">
                        {ESCALATION_HEARING.map((item, i) => (
                          <li key={i} className="text-[11px] text-slate-700 flex gap-1.5 leading-snug">
                            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded bg-amber-200 text-amber-800 text-[8px] font-black flex-shrink-0">
                              {i + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* After-meeting flow */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                        持ち帰り後のフロー
                      </p>
                      <ol className="space-y-1.5">
                        <li className="flex gap-2 text-[11px] text-slate-700 leading-relaxed">
                          <span className="flex-shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-700 text-white text-[9px] font-black">1</span>
                          <span>商談メモ + ヒアリング内容を整理</span>
                        </li>
                        <li className="flex gap-2 text-[11px] text-slate-700 leading-relaxed">
                          <span className="flex-shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-700 text-white text-[9px] font-black">2</span>
                          <span>運営にエスカレーション報告（LINE / Slack 等）</span>
                        </li>
                        <li className="flex gap-2 text-[11px] text-slate-700 leading-relaxed">
                          <span className="flex-shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-700 text-white text-[9px] font-black">3</span>
                          <span>運営判断を待ち、対応可否・条件を確認</span>
                        </li>
                        <li className="flex gap-2 text-[11px] text-slate-700 leading-relaxed">
                          <span className="flex-shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-700 text-white text-[9px] font-black">4</span>
                          <span>お客様へ <span className="font-bold">○営業日以内</span> に最適な対応案と次のステップを連絡</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== PROGRESS OVERVIEW ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-bold text-slate-800">クロージング進捗</p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {completedSteps.length === closingSteps.length
                ? "🎉 全ステップ完了！"
                : `残り ${closingSteps.length - completedSteps.length} ステップ`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-2xl font-black text-slate-800 leading-none">
                {completedSteps.length}
                <span className="text-sm font-bold text-slate-300">/{closingSteps.length}</span>
              </p>
            </div>
            <button
              onClick={resetProgress}
              className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              title="進捗をリセット"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background:
                progress === 100
                  ? "linear-gradient(90deg, #10b981, #34d399)"
                  : "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Step dots */}
        <div className="flex justify-between mt-2.5">
          {closingSteps.map((step) => {
            const done = completedSteps.includes(step.id)
            return (
              <button
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className="flex flex-col items-center gap-1 group"
              >
                <motion.div
                  animate={done ? { scale: [1, 1.2, 1] } : {}}
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-colors",
                    done
                      ? `${step.color} text-white shadow-sm`
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  )}
                >
                  {done ? "✓" : step.id}
                </motion.div>
                <span className={cn(
                  "text-[8px] font-medium hidden sm:block",
                  done ? step.textColor : "text-slate-300"
                )}>
                  {step.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== STEPS ===== */}
      <div className="space-y-2.5">
        {closingSteps.map((step) => {
          const isExpanded = expandedStep === step.id
          const isCompleted = completedSteps.includes(step.id)

          return (
            <motion.div
              key={step.id}
              layout
              className={cn(
                "bg-white rounded-2xl border shadow-sm overflow-hidden transition-colors",
                isCompleted ? `${step.borderColor} ${step.lightColor}` : "border-slate-200"
              )}
            >
              {/* Step header */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                onClick={() => toggleStep(step.id)}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                    isCompleted ? `${step.color} shadow-sm` : "bg-slate-100"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-white" />
                  ) : (
                    <span className="text-sm font-black text-slate-500">{step.id}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-bold leading-none",
                    isCompleted ? step.textColor : "text-slate-800"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{step.purpose}</p>
                </div>
                {isExpanded
                  ? <ChevronUp className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-slate-300 flex-shrink-0" />}
              </button>

              {/* Step content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3 border-t border-slate-100">
                      {/* Script */}
                      <div className="pt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-600">トークスクリプト</span>
                          <CopyButton text={step.script} />
                        </div>
                        <div className={cn(
                          "rounded-xl p-3 border-l-4",
                          step.borderColor,
                          "bg-slate-50"
                        )}>
                          <p className="font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                            {step.script}
                          </p>
                        </div>
                      </div>

                      {/* Confirmations */}
                      <div>
                        <span className="text-xs font-bold text-slate-600 mb-2 block">確認項目</span>
                        <div className="rounded-xl overflow-hidden border border-slate-100">
                          {step.confirmations.map((conf, i) => (
                            <div
                              key={i}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2.5 text-xs",
                                i !== step.confirmations.length - 1 && "border-b border-slate-100"
                              )}
                            >
                              <span className="text-slate-400 min-w-[80px]">{conf.item}</span>
                              <span className="text-slate-600 font-mono">{conf.check}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Complete button */}
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => { e.stopPropagation(); toggleComplete(step.id) }}
                        className={cn(
                          "w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all",
                          isCompleted
                            ? `${step.lightColor} ${step.textColor} border ${step.borderColor}`
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {isCompleted ? "完了済み（タップで取消）" : "このステップを完了"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
