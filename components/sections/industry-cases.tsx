"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Play, Building, Stethoscope, Briefcase, Monitor, Scale, Clock, Zap, Shield } from "lucide-react"

type VideoItem = {
  title: string
  desc: string
  duration: string
  tag: string
  tagColor: string
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
        title: "見積書・提案書 AI自動生成フロー",
        desc: "顧客情報を入力するだけで、現場仕様に合わせた見積書を5分で生成。2〜3時間かかっていた作業がどう変わるかを実演。",
        duration: "約3分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "音声入力 → 日報・報告書 自動作成",
        desc: "現場で音声録音するだけで議事録・日報が自動生成されるフローを実演。手入力ゼロで報告書が完成する様子を収録。",
        duration: "約2分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "商談前準備 AIエージェント（5分で仮説生成）",
        desc: "会社名・業種を入れるだけで、SPIN質問・課題仮説・提案軸が自動生成されるデモ。ベテランの思考プロセスをAIが再現。",
        duration: "約4分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "フォローアップ文章 自動生成",
        desc: "商談メモを入力すると、相手の課題に合わせたお礼・フォローメール文章をAIが生成するフロー。送信前の確認まで実演。",
        duration: "約2分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "若手への技術・営業ノウハウ継承",
        desc: "ベテランの商談録音→AIがパターン抽出→若手向けナレッジベース化の流れ。属人化ゼロの仕組みをデモ。",
        duration: "約5分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
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
        title: "診察記録 音声入力 → AI自動要約フロー",
        desc: "診療中・診療後の音声をAIがリアルタイムで要約・構造化するデモ。カルテ入力時間を大幅削減する様子を収録。",
        duration: "約3分",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
      },
      {
        title: "Eラーニング15章 学習画面デモ",
        desc: "ITリテラシーが低いスタッフでも使えるEラーニングの画面構成を紹介。Chapter1から段階的にAIを習慣化するプロセス。",
        duration: "約4分",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
      },
      {
        title: "スタッフ向け AIアシスタント 操作デモ",
        desc: "AIチャットで業務マニュアルを即検索・患者対応文章を生成するフロー。受付スタッフが実際に操作する様子を収録。",
        duration: "約3分",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
      },
      {
        title: "週次グループコンサル・伴走サポートの様子",
        desc: "定着プログラムの週次ミーティングの進め方と、平日チャットサポートで課題が解消されるプロセスを紹介。",
        duration: "約5分",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
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
        title: "商談前準備 5分完了デモ（AI仮説生成）",
        desc: "会社名・業種だけでSPIN質問・課題仮説・提案軸が5分で揃う様子。ベテランの商談準備プロセスをAIが完全再現。",
        duration: "約3分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "提案書 AI自動生成フロー",
        desc: "顧客の課題・規模・予算をインプットするだけで、個別最適化された提案書がAI生成されるフロー。品質均質化も実演。",
        duration: "約4分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "商談録音 → 議事録・次アクション自動生成",
        desc: "録音データをAIがテキスト化→課題・合意事項・次のアクションを自動抽出するフロー。CRM連携まで実演。",
        duration: "約3分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "フォローアップ文章 AIパーソナライズ生成",
        desc: "商談メモから顧客別にカスタマイズされたフォロー文章を生成するデモ。送信後の反応率改善事例も紹介。",
        duration: "約2分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "トップ営業のノウハウ → 組織展開フロー",
        desc: "ベストプレイヤーの商談パターンをAIが抽出→チーム全員のスクリプトに反映するプロセスを実演。",
        duration: "約5分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
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
        title: "議事録 AI自動生成フロー（録音→即時出力）",
        desc: "会議録音をアップロードするだけで、担当者・アクションアイテム・決定事項を自動整理するデモ。Notion/Slack連携も実演。",
        duration: "約3分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "提案書 AI自動生成（顧客情報→資料完成）",
        desc: "顧客の業種・課題・予算をインプットするだけで提案書が生成されるフロー。テンプレートからの品質均質化も紹介。",
        duration: "約4分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
      },
      {
        title: "Eラーニング15章 全社員AI習慣化デモ",
        desc: "エンジニア以外の非IT職員がAIを使いこなすまでのEラーニング学習フローを実演。3ヶ月定着プログラムの全体像も紹介。",
        duration: "約5分",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
      },
      {
        title: "ROI試算資料 AI自動生成",
        desc: "顧客データを入れるだけで、投資対効果を可視化した稟議用ROI資料をAIが生成するフロー。決裁通過率の改善事例も紹介。",
        duration: "約3分",
        tag: "ウリアゲAIX",
        tagColor: "bg-orange-100 text-orange-700",
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
        title: "契約書・文書ドラフト AI生成フロー",
        desc: "案件情報を入力するだけで契約書・覚書の初稿がAI生成されるデモ。数時間かかっていた作業が5分で完了する様子を収録。",
        duration: "約4分",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
      },
      {
        title: "顧客対応メール AI文章生成",
        desc: "案件内容を入れるだけで、丁寧でミスのないメール文章をAIが生成するフロー。1件10〜20分かかっていた作業がどう変わるか実演。",
        duration: "約2分",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
      },
      {
        title: "Eラーニング業務標準化デモ",
        desc: "ITリテラシー差があるスタッフ全員が同じレベルになるEラーニングの構成を紹介。15章の学習ロードマップと習熟度追跡機能も実演。",
        duration: "約5分",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
      },
      {
        title: "AIアシスタントで法令・マニュアル即検索",
        desc: "「この条項の意味は？」「この手続きの流れは？」をAIに即聞きして、業務をスムーズに進めるデモ。スタッフの自走力向上も紹介。",
        duration: "約3分",
        tag: "カクヤクAIX",
        tagColor: "bg-blue-100 text-blue-700",
      },
    ],
  },
]

function VideoPlaceholder({ video, index }: { video: VideoItem; index: number }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
      {/* Thumbnail placeholder */}
      <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 aspect-video flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </div>
          <span className="text-white/60 text-[10px] font-medium">動画準備中</span>
        </div>
        {/* Video number badge */}
        <div className="absolute top-2 left-2 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-white text-[9px] font-bold">{index + 1}</span>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 rounded px-1.5 py-0.5">
          <Clock className="w-2.5 h-2.5 text-white" />
          <span className="text-white text-[9px]">{video.duration}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-xs font-bold text-slate-800 leading-snug flex-1">{video.title}</h4>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${video.tagColor}`}>
            {video.tag}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed">{video.desc}</p>
      </div>
    </div>
  )
}

export function IndustryCasesSection() {
  const [expanded, setExpanded] = useState<string | null>("construction")

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
                  <div className="space-y-3">
                    {ind.videos.map((video, i) => (
                      <VideoPlaceholder key={i} video={video} index={i} />
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
