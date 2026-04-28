"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CopyButton } from "@/components/copy-button"
import { Zap, Shield, Layers, Star, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

export const scripts = {
  uriage: {
    key: "uriage" as const,
    title: "ウリアゲAIX",
    sub: "営業・売上特化（攻）",
    icon: Zap,
    accentColor: "border-orange-400",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
    badgeBorder: "border-orange-200",
    headerBg: "from-orange-500 to-red-600",
    pinColor: "text-orange-500",
    pinBg: "bg-orange-50",
    phases: [
      {
        id: "opening",
        label: "ヒアリング導入",
        script: `「今日はお時間いただきありがとうございます。
まず御社の現状を正確に理解したいので、いくつか確認させてください。

現在の営業チームは何名体制ですか？
月間の商談数と成約率はどのくらいでしょうか？
今、営業活動でいちばん"しんどい"と感じているのはどこですか？」

（→ 相手の言葉を繰り返す）
「〇〇ということですね。具体的にはどういう場面ですか？」`,
      },
      {
        id: "main",
        label: "メイントーク",
        script: `「おっしゃっていた
"トップ営業がいないと数字が出ない"という課題、
本当に多いんです。

原因はシンプルで、『営業のノウハウが人の頭の中にある』から。
それを仕組みに変えるのがウリアゲAIXです。

12種のAIエージェントが商談準備・日報・提案書・フォロー
すべてを自動化します。

たとえば商談準備、今どのくらい時間かけていますか？
（→ 回答を聞く）

それが5分になります。
提案書も顧客情報を入れるだけで自動生成。
トップ営業のトークを全員が使えるようになる。

結果として売上・利益が最大3倍、事務作業90%削減の実績があります。

3ヶ月の伴走プログラムで、週1回30分 + 平日チャットサポート付き。
実際に使いこなせる状態まで責任を持って伴走するから
継続利用率が95%なんです。」`,
      },
      {
        id: "urgency",
        label: "緊急性・タイミング",
        script: `「一つ聞いてもいいですか？

今の状態があと1年続いたとして、何が変わっていると思いますか？

（→ 相手に考えさせる）

競合他社はもうAIを使った営業を始めています。
早く動いた会社が"勝ちパターン"を先に手に入れる。
これはスピードゲームなんです。

それと、今なら助成金が使えます。
3ヶ月後に申請できる保証はないので、
動けるタイミングで動くのが一番賢い選択です。」`,
      },
      {
        id: "closing",
        label: "クロージング",
        script: `「整理させてください。

御社の課題は〔課題〕で、
このまま放置すると〔影響〕になる。
理想は〔理想状態〕ですよね。

ウリアゲAIXなら、3ヶ月でそこに到達できます。
助成金を使えば実質〔人数×10万円〕の投資です。

次のステップとして、まず申込書を出して
助成金の手続きを一緒に進めましょう。
書類は全部こちらでサポートします。

今日、前に進めますか？」`,
      },
      {
        id: "social_proof",
        label: "事例・社会的証明",
        script: `「似たような状況の会社の話をしてもいいですか？

〔業種〕の会社で、スタッフ〔人数〕名。
導入前は売上が伸び悩み、営業が属人的な状態でした。

ウリアゲAIXを入れて3ヶ月後、
商談準備時間が1/10になり、
成約率が〔数字〕%から〔数字〕%に上がりました。
年間で〔金額〕万円の売上増加です。

御社の場合、〔具体的な数字〕くらいの効果が見込めます。」`,
      },
    ],
  },
  kakuyaku: {
    key: "kakuyaku" as const,
    title: "カクヤクAIX",
    sub: "組織変革・DX定着（守）",
    icon: Shield,
    accentColor: "border-blue-500",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200",
    headerBg: "from-blue-600 to-blue-800",
    pinColor: "text-blue-500",
    pinBg: "bg-blue-50",
    phases: [
      {
        id: "opening",
        label: "ヒアリング導入",
        script: `「御社でDXや生産性向上に取り組んできた経緯を聞かせてください。

今まで何かツール導入やIT化を試みたことはありますか？
（→ 回答を聞く）

それがうまくいかなかった、あるいは定着しなかった理由は
何だと感じていらっしゃいますか？」

（→ 傾聴し、問題の核心をつかむ）
「つまり、ツールよりも"人が変わらないこと"が課題なんですね？」`,
      },
      {
        id: "main",
        label: "メイントーク",
        script: `「以前DXを試みたけど定着しなかった、という話、
本当によく聞きます。

なぜかというと、ほとんどの会社が
"ツールを入れること"をゴールにしてしまうから。

カクヤクAIXは、AIを『習慣』に変えることにフォーカスしています。
『思考・実行・改善』の3つの習慣を組織にインストールするイメージです。

Eラーニングが全15章。
ITリテラシーが低い方でも、基礎から段階的に学べる設計なので
"うちの社員に使えるか不安"という心配は、まずそこで解消できます。

さらに週次グループコンサル＋個別サポート＋チャットで
学んで終わりにしない仕組みにしています。

ツールではなく、組織そのものが変わる。
それがカクヤクAIXです。」`,
      },
      {
        id: "urgency",
        label: "緊急性・タイミング",
        script: `「DXって、始めるのが早ければ早いほど有利です。

なぜかというと、AIを使いこなす組織と
そうでない組織の差は、時間が経つほど広がるから。

それと、今は助成金が使える状況です。
人材開発支援助成金で、1名あたり最大30万円の補助が出ます。
500社申請して全社通過しているので、
手続きはこちらが全部サポートします。

この助成金が使えるうちに動くのが、
一番賢いタイミングだと思います。」`,
      },
      {
        id: "closing",
        label: "クロージング",
        script: `「お話を整理すると、

御社は〔課題〕という状況で、
このままだと〔リスク〕が続く。

カクヤクAIXで3ヶ月後には
〔理想状態〕を実現できます。

助成金を使えば実質〔人数×10万円〕。
投資回収も〔月数〕ヶ月で完了する計算です。

あとは一歩踏み出すだけです。
今日、申込書を出してスタートしましょう。
助成金の手続きはすぐに一緒に進められます。」`,
      },
      {
        id: "habitbuilding",
        label: "習慣化の説明",
        script: `「なぜ習慣化にこだわるかというと、
人が新しいことを定着させるには
平均66日かかると言われているからです。

そこで私たちは3ヶ月のプログラムに
週次の振り返りと個別フォローを組み込んでいます。

具体的には、
・週1回30分のオンラインミーティング
・平日はチャットでいつでも質問できる
・困ったことがあれば個別サポート

一人でやると挫折しやすいことも、
伴走があるから継続できる。
継続利用率95%の理由はここにあります。」`,
      },
    ],
  },
  both: {
    key: "both" as const,
    title: "両方の場合",
    sub: "攻×守 — 振り分けトーク",
    icon: Layers,
    accentColor: "border-slate-400",
    badgeBg: "bg-slate-50",
    badgeText: "text-slate-700",
    badgeBorder: "border-slate-200",
    headerBg: "from-slate-600 to-slate-800",
    pinColor: "text-slate-500",
    pinBg: "bg-slate-50",
    phases: [
      {
        id: "branching",
        label: "振り分けトーク",
        script: `「お話を聞いていて、2つの方向性があると思っています。

▶ 営業の数字を今すぐ上げたい
  → ウリアゲAIX（攻）

▶ 組織全体を長期的に変えたい
  → カクヤクAIX（守）

どちらが今の御社の優先度が高いですか？
（→ 相手に選ばせる）

もちろん、両方セットで始める会社も多いですし、
まず一方から試して、手応えを見てから拡げるやり方もあります。
どちらが御社に合っていそうですか？」`,
      },
      {
        id: "bothpitch",
        label: "セット提案",
        script: `「両方やりたいというのは、実は一番賢い選択です。

攻（ウリアゲ）で売上を上げながら、
守（カクヤク）で組織の土台を固める。

これを同時にやることで、
稼いだ利益を組織強化に再投資できる
好循環が生まれるんです。

助成金は1名あたり30万円補助されるので、
5名なら150万円の補助が出ます。
両プログラム合わせても実質負担はかなり抑えられます。」`,
      },
      {
        id: "decision",
        label: "意思決定の背中押し",
        script: `「迷っているということは、
何か引っかかっていることがあるんだと思います。

率直に聞いてもいいですか？
今、一番「でも…」と思っていることって何ですか？

（→ 本音を引き出す）

なるほど、〔懸念〕ということですね。
実はそこ、よく出てくる話で…
（→ 反論QA集を参照）

一つ言えるのは、
"やってから後悔した"という会社はほとんどいません。
"やらなかった"ことへの後悔はあっても。

今日、小さな一歩を踏み出してみませんか？」`,
      },
    ],
  },
}

const literacyItems = [
  {
    level: "高",
    badge: "bg-blue-100 text-blue-700",
    target: "IT部門・エンジニア・経営者（テック先行型）",
    approach: "機能・仕組み・ROIで語る",
    effectiveWords: ["ROI", "API連携", "SLA", "工数削減○○%", "構築済みの強み", "実装スピード", "セキュリティ要件"],
    ngWords: ["「DXとは…」の前提説明", "「簡単に始められます」", "「誰でも使えます」", "曖昧な定性的表現"],
  },
  {
    level: "低",
    badge: "bg-green-100 text-green-700",
    target: "現場スタッフ・シニア層（アナログ慣性型）",
    approach: "事例・Before/After・安心感で語る",
    effectiveWords: ["「ボタン1つで」", "「スマホからOK」", "「電話サポート付き」", "「○○社で実績」", "「現場ですぐ使える」", "「丁寧にお教えします」"],
    ngWords: ["DX / API / クラウド", "ROI / SaaS", "カタカナ用語連発", "「効率化されます」だけの抽象論"],
  },
  {
    level: "混在",
    badge: "bg-orange-100 text-orange-700",
    target: "全社員対象・部署混合",
    approach: "「社員が使いこなせるか？」に正面から答える",
    effectiveWords: ["「段階的」", "「レベル別」", "「見える化」", "「Eラーニングで個別対応」", "「全員が使えるよう設計」"],
    ngWords: ["「IT得意な人だけ使えます」", "「習熟が必要です」", "ハードル感じさせる表現"],
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TalkScriptsSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof scripts>("uriage")
  const [activePhase, setActivePhase] = useState(0)
  const [pinnedKeys, setPinnedKeys] = useLocalStorage<string[]>("pinned-scripts", [])
  const [showLiteracy, setShowLiteracy] = useState(false)

  const current = scripts[activeTab]
  const Icon = current.icon
  const isPinned = pinnedKeys.includes(activeTab)
  const phase = current.phases[activePhase] ?? current.phases[0]

  const togglePin = (key: string) => {
    setPinnedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const pinnedScripts = pinnedKeys
    .map((k) => scripts[k as keyof typeof scripts])
    .filter(Boolean)

  return (
    <div className="space-y-4">

      {/* ===== PINNED FAVORITES ===== */}
      <AnimatePresence>
        {pinnedScripts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-amber-100 flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-amber-700">ピン留め済み</span>
              <span className="text-[10px] text-amber-400 font-medium">{pinnedScripts.length}件</span>
            </div>
            <div className="divide-y divide-amber-100">
              {pinnedScripts.map((s) => {
                const PinIcon = s.icon
                return (
                  <motion.button
                    key={s.key}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(s.key)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-100/60 transition-colors text-left"
                  >
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", s.badgeBg)}>
                      <PinIcon className={cn("w-3.5 h-3.5", s.badgeText)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-700">{s.title}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{s.phases[0].script.slice(0, 40)}…</p>
                    </div>
                    <CopyButton text={s.phases[0].script} />
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== PRODUCT TAB SWITCHER ===== */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
        {(Object.keys(scripts) as Array<keyof typeof scripts>).map((key) => {
          const s = scripts[key]
          const TabIcon = s.icon
          const isActive = activeTab === key
          const isPinnedTab = pinnedKeys.includes(key)
          return (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setActivePhase(0) }}
              className={cn(
                "relative flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg",
                "text-xs font-bold transition-all duration-200 min-h-[44px]",
                isActive ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <TabIcon className={cn("w-3.5 h-3.5 flex-shrink-0", isActive ? s.badgeText : "")} />
              <span className="truncate">
                {key === "both" ? "両方" : key === "uriage" ? "ウリアゲ" : "カクヤク"}
              </span>
              {isPinnedTab && (
                <Star className="w-2 h-2 text-amber-400 fill-amber-400 absolute top-1.5 right-1.5" />
              )}
            </button>
          )
        })}
      </div>

      {/* ===== PHASE TABS ===== */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4">
        {current.phases.map((p, i) => (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePhase(i)}
            className={cn(
              "flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border",
              activePhase === i
                ? `${current.badgeBg} ${current.badgeText} ${current.badgeBorder}`
                : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
            )}
          >
            {p.label}
          </motion.button>
        ))}
      </div>

      {/* ===== SCRIPT CARD ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${activePhase}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${current.headerBg} p-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{current.title}</h3>
                  <p className="text-white/70 text-[10px]">{phase.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => togglePin(activeTab)}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    isPinned
                      ? "bg-amber-400/30 text-amber-200"
                      : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                  )}
                  title={isPinned ? "ピン解除" : "ピン留め"}
                >
                  <Star className={cn("w-4 h-4", isPinned ? "fill-amber-300 text-amber-300" : "")} />
                </motion.button>
                <CopyButton text={phase.script} />
              </div>
            </div>
          </div>

          {/* Script body */}
          <div className={`border-l-4 ${current.accentColor} m-4 pl-4`}>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-mono">
              {phase.script}
            </p>
          </div>

          {/* Navigation between phases */}
          <div className="px-4 pb-3 flex items-center justify-between">
            <button
              onClick={() => setActivePhase((i) => Math.max(0, i - 1))}
              disabled={activePhase === 0}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← 前
            </button>
            <p className="text-[10px] text-slate-300">
              {activePhase + 1} / {current.phases.length}
            </p>
            <button
              onClick={() => setActivePhase((i) => Math.min(current.phases.length - 1, i + 1))}
              disabled={activePhase === current.phases.length - 1}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              次 →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ===== 使い方ヒント ===== */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-700 leading-relaxed">
          <span className="font-bold">使い方：</span>
          相手の反応に合わせてフェーズタブを切り替えて使う。〔　〕内は実際の数字や言葉に置き換えて読む。★でピン留めするとホームからすぐアクセスできる。
        </p>
      </div>

      {/* ===== IT LITERACY CHEATSHEET ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          className="w-full px-4 pt-4 pb-3 flex items-center justify-between"
          onClick={() => setShowLiteracy(!showLiteracy)}
        >
          <div>
            <h3 className="text-sm font-bold text-slate-800 text-left">ITリテラシー別チートシート</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 text-left">相手に合わせて話し方を切り替える</p>
          </div>
          {showLiteracy
            ? <ChevronUp className="w-4 h-4 text-slate-300" />
            : <ChevronDown className="w-4 h-4 text-slate-300" />}
        </button>

        <AnimatePresence>
          {showLiteracy && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {literacyItems.map((row, i) => (
                  <div key={i} className="px-4 py-3 space-y-2.5">
                    <div className="flex items-start gap-3">
                      <span className={cn("text-xs font-black px-2 py-1 rounded-lg flex-shrink-0", row.badge)}>
                        {row.level}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-700">{row.target}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{row.approach}</p>
                      </div>
                    </div>

                    {/* Effective words */}
                    <div className="ml-9">
                      <p className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider mb-1">✓ 効果的なキーワード</p>
                      <div className="flex flex-wrap gap-1">
                        {row.effectiveWords.map((w, j) => (
                          <span key={j} className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* NG words */}
                    <div className="ml-9">
                      <p className="text-[9px] font-bold text-red-700 uppercase tracking-wider mb-1">✗ NG表現・避けたい言葉</p>
                      <div className="flex flex-wrap gap-1">
                        {row.ngWords.map((w, j) => (
                          <span key={j} className="text-[10px] bg-red-50 border border-red-200 text-red-700 px-2 py-0.5 rounded-full line-through decoration-red-400">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
