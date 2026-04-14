"use client"

import { useState } from "react"
import { CopyButton } from "@/components/copy-button"
import { Zap, Shield, Layers } from "lucide-react"

const scripts = {
  uriage: {
    title: "ウリアゲAIX",
    sub: "営業・売上特化（攻）",
    icon: Zap,
    accentColor: "border-orange-400",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
    badgeBorder: "border-orange-200",
    headerBg: "from-orange-500 to-red-500",
    script: `先ほどおっしゃっていた
"トップ営業がいないと数字が出ない"という課題、
多くの会社で聞く話です。

原因はシンプルで、『営業のノウハウが人の頭の中にある』からなんです。

ウリアゲAIXは、その営業フロー全体を
12種のAIエージェントに分業させるプログラムです。

例えば商談準備、今どのくらい時間かけていますか？（→ 回答を聞く）

それがAIで5分になります。
日報・議事録も自動生成。提案書も顧客情報から自動作成。

結果として、売上・利益が最大3倍。
事務作業は最大90%削減されています。

3ヶ月の定着プログラムで、週1の進捗確認＋平日チャットサポートで、
実際に使える状態まで責任をもって伴走します。
だから継続利用率が95%なんです。`,
  },
  kakuyaku: {
    title: "カクヤクAIX",
    sub: "組織変革・DX定着（守）",
    icon: Shield,
    accentColor: "border-blue-500",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200",
    headerBg: "from-blue-600 to-blue-800",
    script: `以前DXを試みたけど定着しなかった、とおっしゃっていましたよね。
本当に多いんです、そのパターン。

なぜかというと、ほとんどの会社が
"ツールを入れること"をゴールにしてしまうからです。

カクヤクAIXは、AIを『習慣』に変えることにフォーカスしています。
『思考・実行・改善』の3つの習慣を組織にインストールするイメージです。

Eラーニングが全15章あって、ITリテラシーが低い方でも
基礎から段階的にステップアップできる設計になっています。
なので『うちの社員に使えるか不安』という心配は、
まずそこで解消できます。

さらに週次のグループコンサル＋個別サポート＋チャットサポートで、
学んで終わりにしない仕組みにしています。

ツールではなく、組織そのものが変わる。それがカクヤクAIXです。`,
  },
  both: {
    title: "両方の場合",
    sub: "攻×守 — 振り分けトーク",
    icon: Layers,
    accentColor: "border-slate-400",
    badgeBg: "bg-slate-50",
    badgeText: "text-slate-700",
    badgeBorder: "border-slate-200",
    headerBg: "from-slate-600 to-slate-800",
    script: `お話を聞いていて、2つの方向性があると思っています。

営業の数字をすぐ上げたいなら → ウリアゲAIX
組織全体を長期的に変えたいなら → カクヤクAIX

どちらが今の優先度が高いですか？（→ 相手に選ばせる）

もちろん両方という選択肢もありますし、
段階的に始めるやり方もあります。`,
  },
}

const literacyItems = [
  {
    level: "高",
    badge: "bg-blue-100 text-blue-700",
    target: "IT部門・エンジニア・経営者",
    approach: "機能・仕組み・ROIで語る",
    keywords: "「拡張性」「API」「ROI」「セキュリティ」",
  },
  {
    level: "低",
    badge: "bg-green-100 text-green-700",
    target: "現場スタッフ・シニア層",
    approach: "事例・Before/After・安心感で語る",
    keywords: "「かんたん」「サポート充実」「すぐ使える」",
  },
  {
    level: "混在",
    badge: "bg-orange-100 text-orange-700",
    target: "全社員対象・部署混合",
    approach: "「社員が使いこなせるか？」に正面から答える",
    keywords: "「段階的」「レベル別」「見える化」",
  },
]

export function TalkScriptsSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof scripts>("uriage")
  const current = scripts[activeTab]
  const Icon = current.icon

  return (
    <div className="space-y-4">

      {/* ===== TAB SWITCHER ===== */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
        {(Object.keys(scripts) as Array<keyof typeof scripts>).map((key) => {
          const s = scripts[key]
          const TabIcon = s.icon
          const isActive = activeTab === key
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg
                text-xs font-bold transition-all duration-200 min-h-[44px]
                ${isActive
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
                }
              `}
            >
              <TabIcon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? s.badgeText : ""}`} />
              <span className="truncate">{key === "both" ? "両方" : key === "uriage" ? "ウリアゲ" : "カクヤク"}</span>
            </button>
          )
        })}
      </div>

      {/* ===== SCRIPT CARD ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Card header gradient */}
        <div className={`bg-gradient-to-r ${current.headerBg} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">{current.title}</h3>
                <p className="text-white/70 text-[10px]">{current.sub}</p>
              </div>
            </div>
            <CopyButton text={current.script} />
          </div>
        </div>

        {/* Script content */}
        <div className={`border-l-4 ${current.accentColor} m-4 pl-4`}>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-mono">
            {current.script}
          </p>
        </div>
      </div>

      {/* ===== IT LITERACY CHEATSHEET ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 pt-4 pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">ITリテラシー別チートシート</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">相手に合わせて話し方を切り替える</p>
        </div>
        <div className="divide-y divide-slate-100">
          {literacyItems.map((row, i) => (
            <div key={i} className="px-4 py-3">
              <div className="flex items-start gap-3">
                <span className={`text-xs font-black px-2 py-1 rounded-lg flex-shrink-0 ${row.badge}`}>
                  {row.level}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-700">{row.target}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{row.approach}</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">{row.keywords}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
