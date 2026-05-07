"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Play, Building, Stethoscope, Briefcase, Monitor, Scale, Clock, Zap, Shield, Sparkles, ExternalLink } from "lucide-react"

type VideoItem = {
  title: string
  desc: string
  duration: string
  tag: string
  tagColor: string
  url?: string
}

type Industry = {
  id: string
  name: string
  icon: React.ElementType
  product: "ウリアゲAIX" | "カクヤクAIX" | "両方"
  productColor: string
  productBg: string
  accentColor: string
  iconBg: string
  iconColor: string
  before: string[]
  after: string[]
  metrics: { label: string; value: string }[]
  videos: VideoItem[]
}

const industries: Industry[] = [
  {
    id: "common",
    name: "全業種共通（横断デモ）",
    icon: Sparkles,
    product: "両方",
    productColor: "text-purple-600",
    productBg: "bg-purple-50 border-purple-200",
    accentColor: "border-l-purple-400",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    before: [
      "業種を問わず、事務作業・教育・採用・議事録に時間が取られる",
      "新人育成が属人化、ノウハウが組織に広がらない",
      "リード・案件管理が手動で抜け漏れ発生",
    ],
    after: [
      "全業種で使える共通AIテンプレで業務削減",
      "教育資料・議事録・提案書をAIで自動化",
      "リード・案件管理をAIで自動化、抜け漏れゼロ",
    ],
    metrics: [
      { label: "対応業種", value: "全業種" },
      { label: "事務削減", value: "最大90%" },
      { label: "継続利用率", value: "95%" },
    ],
    videos: [
      {
        title: "共-1 新人育成・教育資料をAIで効率化",
        desc: "OJT・研修資料・マニュアル作成をAIで自動化。新人立ち上がり速度を大幅短縮するフローを実演。",
        duration: "デモ動画",
        tag: "両方",
        tagColor: "bg-purple-100 text-purple-700",
        url: "https://www.loom.com/share/0c2fe05fd13e46bd896662379f65e67a",
      },
      {
        title: "共-2 手書き日報をデータ化するAI",
        desc: "現場で書かれた手書き日報をAIで読み取り、構造化データに変換するデモ。OCR＋構造化処理を実演。",
        duration: "デモ動画",
        tag: "両方",
        tagColor: "bg-purple-100 text-purple-700",
        url: "https://www.loom.com/share/61457f531dc5427e91a85a7b4953bf16",
      },
      {
        title: "共-3 事務作業・報告業務をAIで時間削減",
        desc: "ルーティン事務・各種報告書作成をAIで自動化するデモ。業種問わず使える事務効率化の実演。",
        duration: "デモ動画",
        tag: "両方",
        tagColor: "bg-purple-100 text-purple-700",
        url: "https://www.loom.com/share/4e78b06e2e79446895833ce0c3b395b3",
      },
      {
        title: "共-4 採用・求人票・人事評価をAIで効率化",
        desc: "求人票作成・候補者対応・人事評価をAIで自動化するデモ。採用工数の大幅削減を実演。",
        duration: "デモ動画",
        tag: "両方",
        tagColor: "bg-purple-100 text-purple-700",
        url: "https://www.loom.com/share/a2349c0f6ad9485c98d12b04dab4e1ae",
      },
      {
        title: "共-5 会議・商談の議事録・提案書をAIで自動作成",
        desc: "会議録音から議事録・次アクション・提案書まで一気通貫でAI生成するデモ。",
        duration: "デモ動画",
        tag: "両方",
        tagColor: "bg-purple-100 text-purple-700",
        url: "https://www.loom.com/share/3f2c60b2e8804428ad8937316c526a69",
      },
      {
        title: "共-6 リード・案件管理をAIで自動化",
        desc: "リード獲得から案件追跡までAIで自動化するデモ。営業案件の抜け漏れゼロを実現するフロー。",
        duration: "デモ動画",
        tag: "両方",
        tagColor: "bg-purple-100 text-purple-700",
        url: "https://www.loom.com/share/531b4efa88cf4708b4e57a867bc50a2a",
      },
    ],
  },
  {
    id: "construction",
    name: "建築・建設",
    icon: Building,
    product: "ウリアゲAIX",
    productColor: "text-orange-600",
    productBg: "bg-orange-50 border-orange-200",
    accentColor: "border-l-orange-400",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    before: ["見積書・提案書作成に2〜3時間/件", "商談準備が担当者の経験頼り", "日報・報告書で現場から戻って1時間"],
    after: ["AIで見積書30分に短縮", "顧客情報からAIが仮説を生成", "音声入力→AI自動生成で10分"],
    metrics: [
      { label: "事務作業削減", value: "最大90%" },
      { label: "売上向上", value: "最大3倍" },
      { label: "継続利用率", value: "95%" },
    ],
    videos: [
      {
        title: "現場系：見積もり作成をAIで効率化",
        desc: "現場での見積もり作成プロセスをAIで自動化するデモ。建築・建設業向けの実用例を収録。",
        duration: "デモ動画",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
        url: "https://www.loom.com/share/1cffe42b65c64e448c21ed468f0302a9",
      },
      {
        title: "現場データ・見積もり・図面管理をAIで効率化",
        desc: "建築士・設計士向け、現場データ収集・見積もり・図面管理をAIで効率化するデモ。",
        duration: "デモ動画",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
        url: "https://www.loom.com/share/f03e3404e10c425c987bfea5ad029743",
      },
    ],
  },
  {
    id: "medical",
    name: "医療系（歯科・整骨院・クリニック）",
    icon: Stethoscope,
    product: "カクヤクAIX",
    productColor: "text-blue-600",
    productBg: "bg-blue-50 border-blue-200",
    accentColor: "border-l-blue-400",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    before: ["カルテ・記録入力に診療後1〜2時間", "スタッフのIT習熟度がバラバラ", "患者対応と事務が同時発生して処理しきれない"],
    after: ["音声録音→AIで自動要約", "Eラーニング15章で全員が標準化", "事務処理をAIで自動化・一元管理"],
    metrics: [
      { label: "記録業務削減", value: "最大80%" },
      { label: "残業削減", value: "平均40%" },
      { label: "継続利用率", value: "95%" },
    ],
    videos: [
      {
        title: "医-1 カルテ入力・患者情報管理をAIで効率化",
        desc: "カルテ入力・患者情報の構造化管理をAIで自動化するデモ。診療後の事務負荷を大幅削減。",
        duration: "デモ動画",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
        url: "https://www.loom.com/share/0485209dc2a547ceb186c653f1dfde43",
      },
      {
        title: "医-2 受付業務・空き時間管理をAIで効率化",
        desc: "受付対応・予約管理・空き時間の最適化をAIで自動化するデモ。受付スタッフの工数削減を実演。",
        duration: "デモ動画",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
        url: "https://www.loom.com/share/b3343f41ef894bc595c9f26d28bf33f1",
      },
      {
        title: "医-3 患者様への説明をAIで効率化",
        desc: "患者向け説明資料・案内文章をAIで自動生成するデモ。説明品質の均質化と時間短縮を両立。",
        duration: "デモ動画",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
        url: "https://www.loom.com/share/b67d8362a0704f1dae51664c35f638dc",
      },
    ],
  },
  {
    id: "sales",
    name: "営業職系（保険・不動産・キャリア）",
    icon: Briefcase,
    product: "ウリアゲAIX",
    productColor: "text-orange-600",
    productBg: "bg-orange-50 border-orange-200",
    accentColor: "border-l-orange-400",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    before: ["商談準備・提案書作成に30〜60分/件", "トップ営業のノウハウが組織に広がらない", "フォローアップのタイミングが属人依存"],
    after: ["AIで5分に短縮", "商談録音→AIがパターン抽出・共有", "AIがタイミング・文章を提案"],
    metrics: [
      { label: "商談準備時間", value: "5分/件" },
      { label: "成約率向上", value: "最大3倍" },
      { label: "継続利用率", value: "95%" },
    ],
    videos: [
      {
        title: "ファイナンシャルプランナー：商談準備の時間圧縮",
        desc: "FPの商談準備プロセスをAIで自動化するデモ。顧客分析・提案準備に時間がかかる課題への解決策を実演。",
        duration: "デモ動画",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
        url: "https://www.loom.com/share/75378854297c40aca5a4dea4a87f43e7",
      },
      {
        title: "営-1 勝てる商談設計をAIで構築",
        desc: "商談前の戦略設計をAIで構築するデモ。SPIN質問・課題仮説・提案軸を一気通貫で生成するフロー。",
        duration: "デモ動画",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
        url: "https://www.loom.com/share/1cb73145e7c3469fa232cfb53cdc8f6d",
      },
    ],
  },
  {
    id: "it",
    name: "IT・コンサル",
    icon: Monitor,
    product: "両方",
    productColor: "text-slate-600",
    productBg: "bg-slate-50 border-slate-200",
    accentColor: "border-l-slate-400",
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
    before: ["エンジニアが営業兼務で提案・見積に追われる", "議事録・タスク管理がSlack・メール混在", "提案資料のクオリティにばらつき"],
    after: ["AI提案書で品質均質化", "録音→AI即時議事録生成", "タスク管理AI一元化"],
    metrics: [
      { label: "提案準備削減", value: "最大60%" },
      { label: "事務作業削減", value: "最大90%" },
      { label: "継続利用率", value: "95%" },
    ],
    videos: [
      {
        title: "IT-1 課題整理・リサーチ・提案資料作成をAIで完結",
        desc: "ITコンサル業務における課題整理→リサーチ→提案資料作成までを一気通貫でAI化するデモ。",
        duration: "デモ動画",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
        url: "https://www.loom.com/share/f3d12c6b4e5c4e7e83165c3011a35186",
      },
    ],
  },
  {
    id: "professional",
    name: "士業（弁護士・税理士・司法書士）",
    icon: Scale,
    product: "カクヤクAIX",
    productColor: "text-blue-600",
    productBg: "bg-blue-50 border-blue-200",
    accentColor: "border-l-blue-400",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    before: ["書類作成・文書管理に膨大な時間", "顧客対応メールに1件10〜20分", "スタッフ教育が属人的でバラつき"],
    after: ["AI初稿を5分で生成", "AIで文章生成→確認して送信", "Eラーニング15章で標準化"],
    metrics: [
      { label: "文書作成削減", value: "最大70%" },
      { label: "メール対応削減", value: "最大60%" },
      { label: "継続利用率", value: "95%" },
    ],
    videos: [
      {
        title: "士-1 法的文書・申請書類の作成をAIで時間削減",
        desc: "弁護士・司法書士向け、法的文書・申請書類の作成プロセスをAIで自動化するデモ。",
        duration: "デモ動画",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
        url: "https://www.loom.com/share/8357220192944e73adb6b6f5e6b70cfa",
      },
      {
        title: "士-2 記帳・仕訳・書類集計をAIで自動化",
        desc: "税理士向け、記帳代行・仕訳・書類集計をAIで自動化するデモ。月次処理の負荷を大幅削減。",
        duration: "デモ動画",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
        url: "https://www.loom.com/share/898cabb3041b4e19b4d83ccc91b4844a",
      },
      {
        title: "士-3 勤怠・経営分析・提案書作成をAIで効率化",
        desc: "社労士・経営コンサル向け、勤怠管理・経営分析・提案書作成までAIで効率化するデモ。",
        duration: "デモ動画",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
        url: "https://www.loom.com/share/c78a729fb21549d5a99c538d9f90508a",
      },
    ],
  },
]

function VideoPlaceholder({
  video,
  index,
  indId,
  expanded,
  onToggle,
}: {
  video: VideoItem
  index: number
  indId: string
  expanded: boolean
  onToggle: () => void
}) {
  const embedUrl = video.url?.replace("/share/", "/embed/")
  const hasVideo = !!embedUrl

  return (
    <div
      id={`video-${indId}-${index}`}
      className={`bg-white border rounded-xl overflow-hidden transition-all scroll-mt-20 ${
        expanded ? "border-orange-300 ring-2 ring-orange-200/60 shadow-sm" : "border-slate-200"
      }`}
    >
      {/* Header (always visible, click to toggle) */}
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="w-full flex items-start gap-3 p-3 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-800 text-white text-[11px] font-black flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-xs font-bold text-slate-800 leading-snug flex-1">{video.title}</h4>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${video.tagColor}`}>
              {video.tag}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">{video.desc}</p>
        </div>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 transition-colors ${
            hasVideo
              ? expanded
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-600"
              : "bg-slate-200 text-slate-400"
          }`}
        >
          {expanded
            ? <ChevronUp className="w-4 h-4" />
            : <Play className="w-3.5 h-3.5 ml-0.5" fill={hasVideo ? "currentColor" : "none"} />
          }
        </span>
      </button>

      {/* Expanded: iframe */}
      {expanded && hasVideo && (
        <div className="border-t border-slate-200">
          <div className="relative aspect-video bg-black">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              frameBorder={0}
              allowFullScreen
              allow="autoplay; fullscreen"
            />
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-emerald-500/90 rounded px-1.5 py-0.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-white text-[9px] font-bold">実デモ</span>
            </div>
          </div>
          <div className="px-3 py-2 flex items-center justify-end bg-slate-50">
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-600 hover:text-purple-700 transition-colors"
            >
              Loomで開く
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      )}

      {/* Expanded: placeholder for videos without URL */}
      {expanded && !hasVideo && (
        <div className="relative aspect-video bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border-t border-slate-200">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
            </div>
            <span className="text-white/60 text-[10px] font-medium">動画準備中</span>
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 rounded px-1.5 py-0.5">
            <Clock className="w-2.5 h-2.5 text-white" />
            <span className="text-white text-[9px]">{video.duration}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function IndustryCasesSection() {
  const [expanded, setExpanded] = useState<string | null>("common")
  const [expandedVideos, setExpandedVideos] = useState<Record<string, Set<number>>>({})

  const isVideoExpanded = (indId: string, idx: number) =>
    expandedVideos[indId]?.has(idx) ?? false

  const toggleVideo = (indId: string, idx: number) => {
    setExpandedVideos((prev) => {
      const set = new Set(prev[indId] ?? [])
      if (set.has(idx)) set.delete(idx)
      else set.add(idx)
      return { ...prev, [indId]: set }
    })
  }

  const expandAndScrollToVideo = (indId: string, idx: number) => {
    setExpandedVideos((prev) => {
      const set = new Set(prev[indId] ?? [])
      set.add(idx)
      return { ...prev, [indId]: set }
    })
    setTimeout(() => {
      document
        .getElementById(`video-${indId}-${idx}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 60)
  }

  return (
    <div className="space-y-2">

      {industries.map((ind) => {
        const isOpen = expanded === ind.id
        const Icon = ind.icon

        return (
          <div
            key={ind.id}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 ${
              isOpen ? "border-slate-300" : "border-slate-200"
            }`}
          >
            {/* Header */}
            <button
              onClick={() => setExpanded(isOpen ? null : ind.id)}
              className="w-full flex items-center justify-between px-4 py-3.5 min-h-[60px] text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${ind.iconBg}`}>
                  <Icon className={`w-5 h-5 ${ind.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{ind.name}</p>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border mt-0.5 ${ind.productBg} ${ind.productColor}`}>
                    {ind.product === "ウリアゲAIX" && <Zap className="w-2.5 h-2.5" />}
                    {ind.product === "カクヤクAIX" && <Shield className="w-2.5 h-2.5" />}
                    {ind.product}
                  </span>
                </div>
              </div>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isOpen ? "bg-slate-800" : "bg-slate-100"}`}>
                {isOpen
                  ? <ChevronUp className="w-4 h-4 text-white" />
                  : <ChevronDown className="w-4 h-4 text-slate-500" />
                }
              </div>
            </button>

            {isOpen && (
              <div className={`border-t border-slate-100 border-l-4 ${ind.accentColor}`}>

                {/* Before / After */}
                <div className="px-4 pt-4 pb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                      <p className="text-[10px] font-black text-red-500 mb-2 uppercase tracking-wide">Before</p>
                      <ul className="space-y-1.5">
                        {ind.before.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-snug">
                            <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">×</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                      <p className="text-[10px] font-black text-green-600 mb-2 uppercase tracking-wide">After</p>
                      <ul className="space-y-1.5">
                        {ind.after.map((a, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-snug">
                            <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="px-4 pb-3">
                  <div className="flex gap-2">
                    {ind.metrics.map((m, i) => (
                      <div key={i} className="flex-1 bg-slate-800 rounded-xl p-2.5 text-center">
                        <p className="text-white font-black text-sm">{m.value}</p>
                        <p className="text-slate-400 text-[9px] mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video section */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Play className="w-3.5 h-3.5 text-slate-500" />
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">事例・デモ動画</p>
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold">
                      {ind.videos.length}本
                    </span>
                  </div>

                  {/* Chip index — quickly see all videos at a glance, click to play */}
                  {ind.videos.length > 1 && (
                    <div className="mb-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        収録動画 一覧（クリックでジャンプ＆再生）
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {ind.videos.map((v, i) => {
                          const active = isVideoExpanded(ind.id, i)
                          return (
                            <button
                              key={i}
                              onClick={() => expandAndScrollToVideo(ind.id, i)}
                              className={`inline-flex items-center gap-1 text-[10px] font-bold pl-1 pr-2 py-1 rounded-full border transition-colors ${
                                active
                                  ? "bg-orange-500 text-white border-orange-500"
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800"
                              }`}
                              title={v.title}
                            >
                              <span
                                className={`w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center ${
                                  active ? "bg-white text-orange-600" : "bg-slate-800 text-white"
                                }`}
                              >
                                {i + 1}
                              </span>
                              <span className="truncate max-w-[160px] sm:max-w-[200px]">{v.title}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {ind.videos.map((video, i) => (
                      <VideoPlaceholder
                        key={i}
                        video={video}
                        index={i}
                        indId={ind.id}
                        expanded={isVideoExpanded(ind.id, i)}
                        onToggle={() => toggleVideo(ind.id, i)}
                      />
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
