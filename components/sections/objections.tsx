"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Banknote, Brain, Clock, Target, Users, FileCheck, Bot } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

const categories = [
  {
    id: "cost",
    name: "コスト・費用対効果",
    icon: Banknote,
    accent: "border-l-amber-400",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    tag: "bg-amber-100 text-amber-700",
    objections: [
      {
        q: "費用感が心配です / 高いんじゃないですか？",
        script: `「具体的な数字はお伝えしますが、
まず前提として、現状の"見えていないコスト"を確認させてください。

例えば、事務作業に今月スタッフが何時間使っていますか？
それを時給換算すると、月にいくらになりますか？

事務作業90%削減のケースでは、
残業代が月○万円削減されたお客様もいます。
投資対効果でお話しすることはできますよ。」`,
        next: "料金表を見ながら、御社のケースで計算してみましょうか？",
        tip: "助成金トーク必須：「この助成金は申請した500社すべて通っています。実質10万円/人で始められると思って聞いていただけると話がしやすいです。」",
      },
      {
        q: "決算期前で予算が締まっています / 今期は厳しい",
        script: `「決算月前であれば、むしろ "今やるのが一番美味しい" タイミングなんです。

理由は3つあります。

① 1人40万円の研修費用、これがそのまま "損金" として計上できます
② 法人税の節税効果が最大33%。100万置いておくと法人税で取られるところ、
   研修に使うとほぼ全額が経費になる
③ そこに助成金75%が後から戻ってくるので、
   キャッシュアウトを上回るキャッシュインになるケースもあります

つまり、利益が出ている会社さんほど、
"投資"というよりは "節税付きの売上ドライバー" として
活用できる構造になっています。

御社の決算月はいつですか？」`,
        next: "御社の決算月から逆算して、最適なスタート時期を一緒に整理しましょうか？",
        tip: "斉藤式: 「もはやプラスになってきますね」のワンライン。決算月前の社長には特に刺さる。",
      },
    ],
  },
  {
    id: "literacy",
    name: "リテラシー不安",
    icon: Brain,
    accent: "border-l-blue-400",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tag: "bg-blue-100 text-blue-700",
    objections: [
      {
        q: "AIはよくわからなくて… / 社員が使いこなせるか不安",
        script: `「わからなくて当然です。
実は『AIがわからない』という状態の会社ほど、
カクヤクAIXで劇的に変わっているんです。

Eラーニングが全15章あって、
ITリテラシーがゼロの方でも基礎から学べる設計になっています。
さらに週次コンサル＋チャットサポートで、
迷ったときにすぐ聞ける環境があります。

継続利用率95%というのは、この仕組みがあるからです。」`,
        next: "実際にITが苦手なスタッフが多い○○業の事例、よかったら見てみますか？",
      },
    ],
  },
  {
    id: "time",
    name: "時間・余裕がない",
    icon: Clock,
    accent: "border-l-orange-400",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    tag: "bg-orange-100 text-orange-700",
    objections: [
      {
        q: "今忙しくて新しいことを入れる余裕がない",
        script: `「おっしゃる通り、忙しいですよね。
ただ一つ確認させてください。

忙しい理由は、もしかして事務作業や書類仕事が
圧迫しているからじゃないですか？

それを削減するためのサービスなので、
忙しい今だからこそ意味があります。

逆に言うと、忙しい今を放置すると、
半年後も同じ忙しさが続くことになります。」`,
        next: "導入初月から効果が出たケース、紹介してもいいですか？",
      },
    ],
  },
  {
    id: "adoption",
    name: "定着不安",
    icon: Target,
    accent: "border-l-green-400",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    tag: "bg-green-100 text-green-700",
    objections: [
      {
        q: "ツール入れても使わなくなりそう / 以前DXが失敗した",
        script: `「そのご心配は正しいです。
というより、失敗したDXのほとんどが
『ツールを入れること』をゴールにしているからです。

私たちは3ヶ月の定着プログラムで
週1の進捗確認＋平日チャットサポートを提供しています。
やって終わり、ではなく使える状態まで責任をもって伴走します。
だから継続利用率が95%なんです。」`,
        next: "3ヶ月後のゴールイメージ、一緒に描いてみましょうか？",
      },
    ],
  },
  {
    id: "ai_concern",
    name: "AI・プロダクト懸念",
    icon: Bot,
    accent: "border-l-fuchsia-400",
    iconBg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-600",
    tag: "bg-fuchsia-100 text-fuchsia-700",
    objections: [
      {
        q: "AIで営業の代わりにされちゃうんじゃないですか？ / うちの営業マンの仕事は？",
        script: `「結論から言うと、私たちのご提案は
"AIで営業の代わりにする" ものでは一切ありません。

御社が培ってきたトップセールスたちの力、
営業のその人の力、
そこをどうサポートして、若手に継承していくか。
それが今回の導入の鍵です。

雑務のゼロから一を作るところはAIに任せて、
本来上司・上役としてやるべき "最終ジャッジ" や
"判断" のところは人間が担う、という分担です。

なので、営業マンの仕事を奪うのではなく、
"営業マンの腕を最大化する裏方" として
AIを使っていただくイメージで聞いてください。」`,
        next: "御社のトップ営業の方々が、もっと商談時間に集中できる状態を一緒に作りませんか？",
        tip: "斉藤式: 結論ファースト+先回り否定で、相手の警戒を冒頭で潰す。提案前のアンカーとして使う",
      },
      {
        q: "本当にそんなに上手くいくんですか？ / デメリットってないんですか？",
        script: `「デメリットですか？
…正直、ないですね。

というのは、私たちもプライドを持って
このサービスで打ち出させていただいておりまして、
入れることが僕らのゴールでは "なく"、
できるようになっていただく、
ここに一番の価値を感じていただきたいんです。

なので、もし強いて言うなら、
"僕たちが人として全然気に入ってもらえなかったときくらい"
じゃないですかね。

それぐらい、自分たちのサービスには
自信を持たせていただいています。」`,
        next: "御社にハマるかどうか、私のほうでも率直に判断したいので、もう少し業務の話を聞かせてください",
        tip: "斉藤式: デメリット質問は信頼を試す問い。笑いと誠実さで完璧主義の最後のガードを開く",
      },
      {
        q: "100%自動化できるんですか？ / 全部AIに任せられる？",
        script: `「最初から100%は、正直、実現できないです。

ただ、段階的にそこへ持っていきましょうよ、
というのが、今回の私たちのAI導入が
"ただのAI導入" じゃない理由の一つです。

物を買うだけで、その後使えなかったら
意味ないじゃないですか。

なので、最初の2日間の研修で業務をAI化するところを
具体的に組み立てて、
そこから3ヶ月の伴走で "実装率を段階的に100%に近づける"
という設計にしています。」`,
        next: "御社の業務のうち、まず最初にAI化していくところを一緒に決めましょう",
        tip: "斉藤式: 過剰約束をしないことで逆に信頼を得る。「先に言っちゃうと」の誠実さがポイント",
      },
    ],
  },
  {
    id: "competitor",
    name: "競合比較",
    icon: Users,
    accent: "border-l-purple-400",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    tag: "bg-purple-100 text-purple-700",
    objections: [
      {
        q: "他社も検討しています",
        script: `「ぜひ比較検討してください。
ただ一点だけ確認させてください。

他社の提案は『ツールの提供』ですか、
それとも『定着まで伴走』するものですか？

多くのAIツールはツールの提供で終わりです。
私たちは3ヶ月の伴走支援で、
実際に使える状態まで責任を持つところが違います。」`,
        next: "比較のポイントを整理したシートがあるので、確認しますか？",
      },
      {
        q: "他社さんも同じようなAIツールを持っていますよね？",
        script: `「正直に申し上げますね。

他社さんは基本的に、今あるAIツールを
"サブスク型" または "一括請求型" で導入して終わり、
という事例が圧倒的に多いです。

でも、入れた後に "なんだか使い方よくわからない" となってしまうと、
本来手に入るはずだった価値が、半減どころか
"80%ぐらい減ってしまう" んじゃないかと思っていまして。

ツールの中身よりも、"使いこなせる状態まで伴走するか" が
本当の差別化ポイントです。

そこが、他社さんとうちの一番の違いだと思っていただけたら嬉しいです。」`,
        next: "他社さんの提案資料があれば、伴走範囲の有無を一緒に確認しましょうか？",
        tip: "斉藤式: 数字で語ること(80%減)が刺さる。他社批判ではなく「構造の違い」として説明",
      },
    ],
  },
  {
    id: "approval",
    name: "稟議・決裁",
    icon: FileCheck,
    accent: "border-l-slate-400",
    iconBg: "bg-slate-50",
    iconColor: "text-slate-600",
    tag: "bg-slate-100 text-slate-700",
    objections: [
      {
        q: "社内稟議が必要で… / 私一人では決められない",
        script: `「もちろんです。稟議が必要なのは当然のことです。
一つお手伝いできることがあります。

稟議を通すために必要な情報、一緒に整理しましょう。
・導入の目的と期待効果
・費用と投資回収期間の試算
・他社事例・継続率などの根拠数字

この3点が揃えば稟議は通りやすいです。
次のアクションとして、資料の叩き台を作りましょうか？」`,
        next: "決裁者の方も交えて、もう一度打ち合わせの機会をいただけますか？",
      },
    ],
  },
]

export function ObjectionsSection() {
  const [expanded, setExpanded] = useState<string | null>("cost")

  return (
    <div className="space-y-2">

      {/* Header tip */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <span className="text-lg">💡</span>
        <p className="text-[11px] text-orange-700 font-medium leading-snug">
          反論が来たら「そうですよね」と一度受け止めてから切り返す。否定は禁止。
        </p>
      </div>

      {/* Accordion */}
      {categories.map((cat) => {
        const isOpen = expanded === cat.id
        const Icon = cat.icon

        return (
          <div
            key={cat.id}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 ${
              isOpen ? "border-slate-300" : "border-slate-200"
            }`}
          >
            {/* Category header — min 44px touch target */}
            <button
              onClick={() => setExpanded(isOpen ? null : cat.id)}
              className="w-full flex items-center justify-between px-4 py-3.5 min-h-[56px] text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.iconBg}`}>
                  <Icon className={`w-4.5 h-4.5 ${cat.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{cat.name}</p>
                  <p className="text-[10px] text-slate-400">{cat.objections.length}パターン収録</p>
                </div>
              </div>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isOpen ? "bg-slate-800" : "bg-slate-100"}`}>
                {isOpen
                  ? <ChevronUp className="w-4 h-4 text-white" />
                  : <ChevronDown className="w-4 h-4 text-slate-500" />
                }
              </div>
            </button>

            {/* Expanded content */}
            {isOpen && cat.objections.map((obj, idx) => (
              <div key={idx} className={`border-t border-slate-100 border-l-4 ${cat.accent}`}>
                {/* Objection bubble */}
                <div className="px-4 pt-4 pb-3">
                  <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${cat.tag}`}>
                    <span>反論</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">「{obj.q}」</p>
                </div>

                {/* Rebuttal script */}
                <div className="px-4 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">切り返しスクリプト</span>
                    <CopyButton text={obj.script} />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-mono">{obj.script}</p>
                  </div>
                </div>

                {/* Next one-liner */}
                <div className="mx-4 mb-3 bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">次の一言</span>
                  <p className="text-xs text-blue-800 leading-snug">{obj.next}</p>
                </div>

                {/* Tip (optional) */}
                {"tip" in obj && obj.tip && (
                  <div className="mx-4 mb-4 bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                    <span className="text-sm flex-shrink-0">⚡</span>
                    <p className="text-[11px] text-amber-800 leading-snug">{obj.tip}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
