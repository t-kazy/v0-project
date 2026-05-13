"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Zap, Shield, Brain, PlayCircle, Sparkles, ExternalLink, FileText, Link2, Layers, Banknote, ArrowRight, Search, List, Target, Tag, Building2, User, MessageSquare, Lightbulb } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

const SUBSIDY_FORM_SHORT_URL = "https://forms.gle/ozXzF9WmQjigiGa57"
const SUBSIDY_GROUP_NAME_TEMPLATE = "【AIX研修】株式会社〇〇様"

const mindsetQuotes = [
  { text: "「売るな、課題を解決せよ」", sub: "キーエンス流" },
  { text: "「相手が話す時間を7割にする」", sub: "ヒアリング原則" },
  { text: "「次のアクションを決めずに終わらない」", sub: "クロージング鉄則" },
]

const sizeOptions = [
  { value: "xs", label: "〜10名" },
  { value: "s", label: "11-50名" },
  { value: "m", label: "51-200名" },
  { value: "l", label: "201-1000名" },
  { value: "xl", label: "1001名+" },
] as const

const personOptions = [
  { value: "rep", label: "代表" },
  { value: "manager", label: "責任者" },
  { value: "member", label: "担当者" },
] as const

const painTags = [
  "営業が足りない",
  "売上が頭打ち",
  "若手が育たない",
  "リテラシーがバラバラ",
  "DXが定着しない",
  "全社員に展開できない",
  "業務効率化したい",
  "新規事業立ち上げ",
]

const stepMeta = [
  {
    id: "step-1",
    num: 1,
    title: "学ぶ",
    subtitle: "動画と資料で商談フロー全体を掴む",
    count: 3,
    gradient: "from-purple-500 to-pink-500",
    textColor: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icon: PlayCircle,
  },
  {
    id: "step-2",
    num: 2,
    title: "AIで備える",
    subtitle: "顧客リサーチ・提案書ドラフトをAIに任せる",
    count: 2,
    gradient: "from-sky-500 to-emerald-500",
    textColor: "text-sky-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    icon: Sparkles,
  },
  {
    id: "step-3",
    num: 3,
    title: "仮説をつくる",
    subtitle: "BANT風シートで顧客像を言語化する",
    count: 1,
    gradient: "from-blue-500 to-indigo-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: Target,
  },
] as const

type StepMeta = (typeof stepMeta)[number]
type Size = (typeof sizeOptions)[number]["value"]
type Person = (typeof personOptions)[number]["value"]
type Product = "uriage" | "kakuyaku"

interface PreMeetingSectionProps {
  onNavigate?: (tabId: number) => void
}

export function PreMeetingSection({ onNavigate }: PreMeetingSectionProps = {}) {
  const [proposalMode, setProposalMode] = useState<"log" | "url" | "both" | null>(null)
  const [activeStep, setActiveStep] = useState<string>("step-1")

  // 仮説ノート state
  const [industry, setIndustry] = useState("")
  const [size, setSize] = useState<Size | null>(null)
  const [person, setPerson] = useState<Person | null>(null)
  const [hint, setHint] = useState("")
  const [pains, setPains] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [nextAction, setNextAction] = useState("")

  useEffect(() => {
    const sections = stepMeta
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveStep(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const togglePain = (p: string) => {
    setPains((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]))
  }

  const resetNote = () => {
    setIndustry("")
    setSize(null)
    setPerson(null)
    setHint("")
    setPains([])
    setSelectedProduct(null)
    setNextAction("")
  }

  const sizeLabel = sizeOptions.find((o) => o.value === size)?.label ?? ""
  const personLabel = personOptions.find((o) => o.value === person)?.label ?? ""
  const productLabel =
    selectedProduct === "uriage"
      ? "ウリアゲAIX (営業・売上特化)"
      : selectedProduct === "kakuyaku"
      ? "カクヤクAIX (組織変革・定着)"
      : ""

  const briefLines: string[] = []
  if (industry || sizeLabel) briefLines.push(`【業種・規模】${[industry, sizeLabel].filter(Boolean).join(" / ")}`)
  if (personLabel) briefLines.push(`【担当者】${personLabel}`)
  if (hint) briefLines.push(`【紹介者ヒント】${hint}`)
  if (pains.length) briefLines.push(`【想定課題】${pains.join("、")}`)
  if (productLabel) briefLines.push(`【提案軸】${productLabel}`)
  if (nextAction) briefLines.push(`【次の一手】${nextAction}`)
  const brief = briefLines.join("\n")

  const filledCount = [
    industry.trim().length > 0,
    size !== null,
    person !== null,
    hint.trim().length > 0,
    pains.length > 0,
    selectedProduct !== null,
    nextAction.trim().length > 0,
  ].filter(Boolean).length
  const totalFields = 7
  const noteProgress = (filledCount / totalFields) * 100
  const noteComplete = filledCount === totalFields

  const handleStepClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="space-y-4">

      {/* ===== HERO TOC ===== */}
      <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-white to-slate-50 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-sky-500 to-blue-600" />
        <CardContent className="pt-4 pb-4">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <List className="w-4 h-4 text-slate-600" />
              <h2 className="text-sm font-bold text-slate-800">商談前 完全準備フロー</h2>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              3ステップで万全の状態へ。タップで該当セクションへジャンプ
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {stepMeta.map((step) => {
              const Icon = step.icon
              const isActive = activeStep === step.id
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`relative text-left rounded-lg border-2 p-2.5 transition-all ${
                    isActive
                      ? `${step.borderColor} ${step.bgColor} shadow-sm`
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-sm`}>
                      <span className="text-white text-[10px] font-black">{step.num}</span>
                    </div>
                    <Icon className={`w-3.5 h-3.5 ${step.textColor}`} />
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 leading-tight">{step.title}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{step.count}項目</div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* ===== STEP 1: 学ぶ ===== */}
      <section id="step-1" className="space-y-3 scroll-mt-4">
        <SectionHeader step={stepMeta[0]} />

        {/* 1-1 VIDEO MANUAL CARD */}
        <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-purple-600 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded">1-1</span>
              <PlayCircle className="w-4 h-4 text-purple-600" />
              営業クローザー向け商談完全マニュアル
            </CardTitle>
            <p className="text-[10px] text-slate-500 mt-1">
              まずはこの動画で商談フロー全体を確認してください
            </p>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <div className="relative w-full overflow-hidden rounded-lg bg-slate-900" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://player.vimeo.com/video/1176589419?h=4eca962d70&badge=0&autopause=0&player_id=0&app_id=58479"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                title="営業クローザー向け商談完全マニュアル"
              />
            </div>
          </CardContent>
        </Card>

        {/* 1-2 CUSTOMER VIDEO CARD */}
        <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-purple-600 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded">1-2</span>
              <PlayCircle className="w-4 h-4 text-cyan-600" />
              顧客向け事前共有動画
            </CardTitle>
            <p className="text-[10px] text-slate-500 mt-1">
              商談前に顧客へお送りしている動画です。顧客が何を見て商談に来るかの確認用に
            </p>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <div className="relative w-full overflow-hidden rounded-lg bg-slate-900" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://player.vimeo.com/video/1186712259?h=7a1699fb0f&badge=0&autopause=0&player_id=0&app_id=58479"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                title="顧客向け事前共有動画"
              />
            </div>
          </CardContent>
        </Card>

        {/* 1-3 SERVICE DECK CARD (Canva) */}
        <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-purple-600 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded">1-3</span>
              <FileText className="w-4 h-4 text-blue-600" />
              サービス資料スライド
            </CardTitle>
            <p className="text-[10px] text-slate-500 mt-1">
              商談で使うサービス資料を確認・共有できます
            </p>
          </CardHeader>
          <CardContent className="pt-0 pb-4 space-y-2">
            <div className="relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://www.canva.com/design/DAHGleykgAI/tLJ62RaU_EcPcxH8UdJw8w/view?embed"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="fullscreen"
                allowFullScreen
                title="サービス資料スライド"
              />
            </div>
            <a
              href="https://www.canva.com/design/DAHGleykgAI/tLJ62RaU_EcPcxH8UdJw8w/view?utm_content=DAHGleykgAI&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hbd65b86cea"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Canvaで開く（フルスクリーン表示）
            </a>
          </CardContent>
        </Card>
      </section>

      {/* ===== STEP 2: AIで備える ===== */}
      <section id="step-2" className="space-y-3 scroll-mt-4">
        <SectionHeader step={stepMeta[1]} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* 2-1 RESEARCH AGENT */}
          <Card className="border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col">
            <div className="h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black text-sky-600 bg-sky-50 border border-sky-200 px-1.5 py-0.5 rounded">2-1</span>
                <Search className="w-4 h-4 text-sky-600" />
                事前調査カスタムエージェント (Genspark)
              </CardTitle>
              <p className="text-[10px] text-slate-500 mt-1">
                商談前に顧客企業の情報をAIで自動リサーチします
              </p>
            </CardHeader>
            <CardContent className="pt-0 pb-4 flex-1 flex flex-col">
              <div className="flex-1 space-y-3">
                <div className="p-2.5 bg-sky-50 border border-sky-100 rounded-lg">
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    <span className="font-bold text-sky-700">企業名・URL</span> を入力すると、業種・事業内容・直近トピックなどを調査してくれます。商談前のヒアリング仮説づくりにご活用ください。
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500" />
                    こんな使い方も
                  </p>
                  <ul className="space-y-1 text-[10px] text-slate-600 leading-relaxed">
                    <li className="flex gap-1.5">
                      <span className="text-sky-500 flex-shrink-0">▸</span>
                      <span>社長・担当者のインタビュー記事から<span className="font-bold text-slate-700">アイスブレイクのネタ</span>を仕込む</span>
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-sky-500 flex-shrink-0">▸</span>
                      <span>採用ページの募集要項から<span className="font-bold text-slate-700">"今困っていること"</span>を逆算する</span>
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-sky-500 flex-shrink-0">▸</span>
                      <span>ミッション・ビジョンを把握して<span className="font-bold text-slate-700">提案トーン</span>を合わせる</span>
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-sky-500 flex-shrink-0">▸</span>
                      <span>直近のプレスリリースから<span className="font-bold text-slate-700">最新の動き</span>をキャッチ</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-1 mt-3">
                <a
                  href="https://www.genspark.ai/agents?type=custom_super_agent&agent_id=b7221168-f7e9-467a-a215-c8aaca52367f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
                >
                  <Search className="w-4 h-4" />
                  事前調査を開始する
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
                <p className="text-[10px] text-slate-400 text-center">
                  ボタンをタップで Genspark エージェントが別タブで開きます
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2-2 PROPOSAL AGENT */}
          <Card className="border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">2-2</span>
                <Sparkles className="w-4 h-4 text-emerald-600" />
                提案書作成カスタムエージェント (Genspark)
              </CardTitle>
              <p className="text-[10px] text-slate-500 mt-1">
                商談内容をもとに提案書をAIで自動生成します
              </p>
            </CardHeader>
            <CardContent className="pt-0 pb-4 flex-1 flex flex-col">
              <div className="flex-1 space-y-3">
                {/* Mode selector */}
                <div>
                  <p className="text-[10px] font-bold text-slate-600 mb-1.5">入力する情報を選択</p>
                  <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setProposalMode(proposalMode === "log" ? null : "log")}
                    className={`relative p-2 rounded-lg border-2 transition-all duration-200 text-center ${
                      proposalMode === "log"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
                    }`}
                  >
                    <FileText className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <div className="text-[10px] font-bold text-slate-700 leading-tight">商談ログ</div>
                  </button>
                  <button
                    onClick={() => setProposalMode(proposalMode === "url" ? null : "url")}
                    className={`relative p-2 rounded-lg border-2 transition-all duration-200 text-center ${
                      proposalMode === "url"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
                    }`}
                  >
                    <Link2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <div className="text-[10px] font-bold text-slate-700 leading-tight">URL/資料</div>
                  </button>
                  <button
                    onClick={() => setProposalMode(proposalMode === "both" ? null : "both")}
                    className={`relative p-2 rounded-lg border-2 transition-all duration-200 text-center ${
                      proposalMode === "both"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
                    }`}
                  >
                    <Layers className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <div className="text-[10px] font-bold text-slate-700 leading-tight">両方</div>
                  </button>
                </div>
              </div>

              {/* Mode description */}
              {proposalMode === "log" && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    <span className="font-bold text-emerald-700">商談ログ</span> を貼り付けて提案書を生成します。商談中のメモ・録音文字起こし・ヒアリング内容を準備しておきましょう。
                  </p>
                </div>
              )}
              {proposalMode === "url" && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    <span className="font-bold text-emerald-700">企業URL・資料</span> から情報を取得して提案書を生成します。会社HP / 会社概要PDF / パンフレットを準備しておきましょう。
                  </p>
                </div>
              )}
              {proposalMode === "both" && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    <span className="font-bold text-emerald-700">商談ログ + 企業URL</span> の両方を組み合わせて、より精度の高い提案書を生成します。
                  </p>
                </div>
              )}
                {!proposalMode && (
                  <p className="text-[10px] text-slate-400 text-center py-2">
                    上のボタンから入力パターンを確認できます
                  </p>
                )}

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500" />
                    精度を上げるコツ
                  </p>
                  <ul className="space-y-1 text-[10px] text-slate-600 leading-relaxed">
                    <li className="flex gap-1.5">
                      <span className="text-emerald-500 flex-shrink-0">▸</span>
                      <span>仮説ノート (3-1) の<span className="font-bold text-slate-700">商談前ブリーフ</span>をそのまま貼り付けて素案化</span>
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-emerald-500 flex-shrink-0">▸</span>
                      <span>商談ログは<span className="font-bold text-slate-700">時系列・発言ベース</span>で書くと精度UP</span>
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-emerald-500 flex-shrink-0">▸</span>
                      <span>「両方」モードで<span className="font-bold text-slate-700">企業背景 × 商談内容</span>を掛け合わせると刺さる</span>
                    </li>
                    <li className="flex gap-1.5">
                      <span className="text-emerald-500 flex-shrink-0">▸</span>
                      <span>生成後は<span className="font-bold text-slate-700">自分の言葉でリライト</span>して納品クオリティに</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="space-y-1 mt-3">
                <a
                  href="https://www.genspark.ai/agents?type=custom_super_agent&agent_id=303b15c2-c01a-4bac-8da7-37ae7be0dcd1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  提案書を作成する
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
                <p className="text-[10px] text-slate-400 text-center">
                  ボタンをタップで Genspark エージェントが別タブで開きます
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ===== SUBSIDY (conditional, outside steps) ===== */}
      <div className="relative pt-2">
        <div className="flex items-center gap-2 mb-2 px-1">
          <div className="h-px flex-1 bg-amber-200" />
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">補足 ／ 該当時のみ</span>
          <div className="h-px flex-1 bg-amber-200" />
        </div>
        <Card className="border-amber-200 shadow-sm bg-amber-50/40 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-amber-600" />
              助成金案件の事前準備
            </CardTitle>
            <p className="text-[10px] text-slate-500 mt-1">
              助成金案件の場合、面談前にフォーム準備とLINEグループ作成が必要です
            </p>
          </CardHeader>
          <CardContent className="pt-0 pb-4 space-y-3">

            {/* STEP 1: Open form */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[11px] font-black">1</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs font-bold text-slate-800 leading-snug">Googleフォームを開いておく</p>
                <a
                  href={SUBSIDY_FORM_SHORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1.5 bg-white border border-amber-300 text-amber-700 rounded-lg text-[11px] font-bold hover:bg-amber-50 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  フォームを別タブで開く
                </a>
              </div>
            </div>

            {/* STEP 2: Create LINE group */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[11px] font-black">2</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs font-bold text-slate-800 leading-snug">LINEグループを新設</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <code className="flex-1 text-[11px] bg-white border border-amber-200 px-2 py-1 rounded font-mono text-slate-800 truncate">
                    {SUBSIDY_GROUP_NAME_TEMPLATE}
                  </code>
                  <CopyButton text={SUBSIDY_GROUP_NAME_TEMPLATE} />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">※「〇〇」に顧客企業名を入れる</p>
              </div>
            </div>

            {/* Link to full flow */}
            {onNavigate && (
              <button
                onClick={() => onNavigate(7)}
                className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-white border border-amber-300 text-amber-700 text-[11px] font-bold hover:bg-amber-50 transition-colors"
              >
                詳細な対応フローを「助成金申請フォーム」タブで見る
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </CardContent>
        </Card>
        <div className="h-px bg-amber-200 mt-2" />
      </div>

      {/* ===== STEP 3: 仮説をつくる ===== */}
      <section id="step-3" className="space-y-3 scroll-mt-4">
        <SectionHeader step={stepMeta[2]} />

        {/* 3-1 仮説ノート */}
        <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">3-1</span>
              <CardTitle className="text-sm font-bold text-slate-800">商談前 仮説ノート</CardTitle>
              {noteComplete && (
                <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                  完成!
                </span>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={resetNote} className="gap-1 text-slate-500 h-7 text-xs">
              <RotateCcw className="w-3 h-3" />
              リセット
            </Button>
          </CardHeader>
          <CardContent className="pt-0 pb-4 space-y-4">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>進捗</span>
                <span className="font-bold text-blue-600">{filledCount} / {totalFields}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-400"
                  style={{ width: `${noteProgress}%` }}
                />
              </div>
            </div>

            {/* 業種 + 規模 */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                <Building2 className="w-3 h-3 text-blue-600" />
                業種・規模
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="例: 製造業 / 飲食 / IT"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <div className="flex flex-wrap gap-1.5">
                {sizeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSize(size === opt.value ? null : opt.value)}
                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                      size === opt.value
                        ? "bg-blue-500 border-blue-500 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 担当者種別 */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                <User className="w-3 h-3 text-blue-600" />
                担当者種別
              </label>
              <div className="grid grid-cols-3 gap-2">
                {personOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPerson(person === opt.value ? null : opt.value)}
                    className={`text-xs py-2 rounded-lg border-2 font-bold transition-all ${
                      person === opt.value
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 紹介者ヒント */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                <MessageSquare className="w-3 h-3 text-blue-600" />
                紹介者から聞いたヒント
              </label>
              <textarea
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="例: 営業の人手不足で困っているらしい"
                rows={2}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
              />
            </div>

            {/* 想定課題タグ */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                <Tag className="w-3 h-3 text-blue-600" />
                想定課題 <span className="text-slate-400 font-normal">(複数選択可)</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {painTags.map((tag) => {
                  const active = pains.includes(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => togglePain(tag)}
                      className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${
                        active
                          ? "bg-blue-500 border-blue-500 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                      }`}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 提案軸 */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                <Target className="w-3 h-3 text-blue-600" />
                提案軸
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedProduct(selectedProduct === "uriage" ? null : "uriage")}
                  className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedProduct === "uriage"
                      ? "border-orange-400 bg-orange-50"
                      : "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/30"
                  }`}
                >
                  {selectedProduct === "uriage" && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">✓</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] font-bold text-orange-500">攻</span>
                  </div>
                  <div className="font-bold text-sm text-slate-800">ウリアゲAIX</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">営業・売上特化</div>
                </button>
                <button
                  onClick={() => setSelectedProduct(selectedProduct === "kakuyaku" ? null : "kakuyaku")}
                  className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedProduct === "kakuyaku"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                  }`}
                >
                  {selectedProduct === "kakuyaku" && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">✓</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 mb-1">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-bold text-blue-500">守</span>
                  </div>
                  <div className="font-bold text-sm text-slate-800">カクヤクAIX</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">組織変革・定着</div>
                </button>
              </div>
            </div>

            {/* 次の一手 */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                <Lightbulb className="w-3 h-3 text-blue-600" />
                次の一手 <span className="text-slate-400 font-normal">(商談で持ち帰りたいアクション)</span>
              </label>
              <textarea
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="例: 来週までにデモ日程を調整 / 経営層との会食をセット"
                rows={2}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
              />
            </div>

            {/* Brief preview */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  商談前ブリーフ <span className="text-slate-400 font-normal">(自動生成)</span>
                </p>
                {brief && <CopyButton text={brief} />}
              </div>
              {brief ? (
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg">
                  <pre className="text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">{brief}</pre>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-center">
                  <p className="text-[10px] text-slate-400">フィールドを埋めるとブリーフが自動生成されます</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ===== MINDSET (impactful, outside steps) ===== */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden text-white relative">
        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-pink-400 to-blue-400" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <CardHeader className="pb-2 pt-5 relative">
          <CardTitle className="text-base font-black text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-amber-300" />
            商談直前に思い出す 3カ条
          </CardTitle>
          <p className="text-[11px] text-blue-200/80 mt-1">
            準備が整ったら、深呼吸して心構えを確認
          </p>
        </CardHeader>
        <CardContent className="pt-2 pb-5 relative">
          <div className="space-y-2.5">
            {mindsetQuotes.map((quote, index) => (
              <div
                key={index}
                className="p-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg"
              >
                <div className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-black">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white leading-snug">{quote.text}</p>
                    <p className="text-[10px] text-blue-200/70 mt-0.5">{quote.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

function SectionHeader({ step }: { step: StepMeta }) {
  const Icon = step.icon
  return (
    <div className="flex items-center gap-3 px-1 pt-3">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md`}>
        <span className="text-white text-base font-black">{step.num}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Icon className={`w-4 h-4 ${step.textColor}`} />
          <h3 className="text-sm font-bold text-slate-800">STEP {step.num}: {step.title}</h3>
          <span className={`text-[9px] ${step.textColor} ${step.bgColor} ${step.borderColor} border font-bold px-2 py-0.5 rounded-full`}>
            {step.count}項目
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">{step.subtitle}</p>
      </div>
    </div>
  )
}
