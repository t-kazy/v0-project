"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CopyButton } from "@/components/copy-button"
import {
  Zap, Shield, Layers, Star, ChevronDown, ChevronUp, AlertCircle,
  Target, Timer, Bell, AlertTriangle, Mic,
  Clock, BookOpen, Crown, Users, Sparkles,
  MessageCircle, Calculator, Quote, BookMarked, XCircle, Check, Search,
  Lightbulb, Building2, User as UserIcon,
} from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type VariantKey = "default" | "short" | "long" | "defensive" | "exec" | "staff"

type PhaseMeta = {
  goal: string
  duration: string
  signal: string
  pitfall: string
  tone: string
}

type ScriptVariants = { default: string } & Partial<Record<Exclude<VariantKey, "default">, string>>

const variantConfig: Record<VariantKey, { label: string; desc: string; icon: typeof Clock }> = {
  default: { label: "標準", desc: "ベース版", icon: BookOpen },
  short:   { label: "ショート", desc: "30秒で要点", icon: Timer },
  long:    { label: "ロング", desc: "じっくり版", icon: Clock },
  defensive: { label: "警戒モード", desc: "腕組み・疑い時", icon: Shield },
  exec:    { label: "経営者向け", desc: "意思決定者用", icon: Crown },
  staff:   { label: "現場向け", desc: "担当者用", icon: Users },
}

/* ------------------------------------------------------------------ */
/*  Scripts data (Layer 1 + 3: meta + variants)                        */
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
        meta: {
          goal: "現状の営業体制と \"しんどさ\" を3つ以上引き出す",
          duration: "5〜10分",
          signal: "相手が \"そうなんですよ…\" と前のめりになったら次へ",
          pitfall: "問いかけずに自分が話しすぎる / 解決策を先出ししてしまう",
          tone: "傾聴・共感重視。鏡返しで相手の言葉を繰り返す",
        },
        variants: {
          default: `「今日はお時間いただきありがとうございます。
まず御社の現状を正確に理解したいので、いくつか確認させてください。

現在の営業チームは何名体制ですか？
月間の商談数と成約率はどのくらいでしょうか？
今、営業活動でいちばん"しんどい"と感じているのはどこですか？」

（→ 相手の言葉を繰り返す）
「〇〇ということですね。具体的にはどういう場面ですか？」`,
        } as ScriptVariants,
      },
      {
        id: "main",
        label: "メイントーク",
        meta: {
          goal: "AIエージェントの仕組みを腹落ちさせ、自社にも当てはまると思わせる",
          duration: "5〜8分",
          signal: "\"うちでも使えますか？\" \"具体的にどうやるの？\" の質問が出たら次へ",
          pitfall: "機能羅列に陥る / 数字を後回しにする",
          tone: "確信と熱量。\"課題→仕組み→数字\" の順で押し切る",
        },
        variants: {
          default: `「おっしゃっていた
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
          short: `「結論から言うと、ウリアゲAIXは
"営業ノウハウが人の頭に溜まっている問題"を
仕組みに変えるツールです。

12種のAIエージェントが商談準備・日報・提案書を自動化。
売上3倍、事務90%削減が実績ベースで出ています。

3ヶ月の伴走付き、継続率95%です。」`,
          long: `「実は、私たちが扱っている "ウリアゲAIX" は、
ただのSaaSツールではありません。

"営業の仕組み化" そのものをパッケージにしています。

具体的には、
1. 商談準備
2. 商談中のメモ・記録
3. 商談後のフォローアップ
4. 日報・週報の作成
5. 提案書・見積書の作成
6. 顧客分析・提案改善

これら全6プロセスをAIエージェントが自動でこなします。

通常、トップ営業1人が抱えている暗黙知は、
教えるのに数年かかりますよね。
でもAIエージェントなら、トップ営業の "型" を
全社員が即日使える状態にできるんです。

たとえば商談準備、御社では今どのくらい時間かけていますか？
（→ 回答を聞く）

ウリアゲAIXに切り替えると、
それが"5分"になります。
顧客情報を入れるだけで、提案ストーリーを
AIが自動で組み立ててくれる。

結果として、過去500社の導入実績で
平均的に売上利益最大3倍、事務作業90%削減という
効果が出ています。

ただし、ツールだけ渡しても使いこなせないので、
3ヶ月の伴走プログラムをセットにしています。

週1回30分のミーティング + 平日チャットサポート。
"使いこなせる状態" まで責任を持って伴走するから、
継続利用率は95%。

ここまでの全体像、ピンときますか？」`,
          defensive: `「お気持ち、よくわかります。AIツールっていま乱立していますよね。

なので今日は "売り込み" ではなく、
御社の課題が本当に解決できるかどうか、
率直にお話しさせてください。

ウリアゲAIXが他と違うのは、
"ツールを売って終わり" ではない点です。

3ヶ月の伴走 + 継続率95%。
逆にいうと、5%の方は使いこなせなかった。
合わない会社もあります。

なので今日は、御社にハマるかどうか、
私にも判断させてください。

御社の現状、もう少し詳しく聞いていいですか？」`,
        } as ScriptVariants,
      },
      {
        id: "urgency",
        label: "緊急性・タイミング",
        meta: {
          goal: "「今動く」理由を腹落ちさせる",
          duration: "2〜4分",
          signal: "「いつ始められる？」「準備は何が必要？」が出たら次へ",
          pitfall: "煽りすぎて警戒される / 助成金の話が後付けに見える",
          tone: "落ち着いて、しかし確信を込めて。事実ベースで語る",
        },
        variants: {
          default: `「一つ聞いてもいいですか？

今の状態があと1年続いたとして、何が変わっていると思いますか？

（→ 相手に考えさせる）

競合他社はもうAIを使った営業を始めています。
早く動いた会社が"勝ちパターン"を先に手に入れる。
これはスピードゲームなんです。

それと、今なら助成金が使えます。
3ヶ月後に申請できる保証はないので、
動けるタイミングで動くのが一番賢い選択です。」`,
        } as ScriptVariants,
      },
      {
        id: "closing",
        label: "クロージング",
        meta: {
          goal: "次のアクションを今日決めて口に出させる",
          duration: "3〜5分",
          signal: "「お願いします」「進めましょう」が出たらすぐ申込みへ",
          pitfall: "持ち帰り検討を許す / 期限を曖昧にする",
          tone: "決断を後押しする確信トーン。沈黙を恐れない",
        },
        variants: {
          default: `「整理させてください。

御社の課題は〔課題〕で、
このまま放置すると〔影響〕になる。
理想は〔理想状態〕ですよね。

ウリアゲAIXなら、3ヶ月でそこに到達できます。
助成金を使えば実質〔人数×10万円〕の投資です。

次のステップとして、まず申込書を出して
助成金の手続きを一緒に進めましょう。
書類は全部こちらでサポートします。

今日、前に進めますか？」`,
          short: `「整理すると、御社の課題は〔課題〕で、
ウリアゲAIXで3ヶ月後には〔理想〕に到達できます。

助成金で実質〔金額〕。
今日、申込書を出して進めましょうか？」`,
          exec: `「経営判断として整理させてください。

御社の現状の機会損失は年間〔金額〕万円。
ウリアゲAIX導入の投資は実質〔金額〕万円。
回収期間は〔月数〕ヶ月の計算です。

これは "やる/やらない" ではなく、
"いつやるか" の判断だと思います。

社長として、今日決めますか？それとも来月以降ですか？」`,
        } as ScriptVariants,
      },
      {
        id: "social_proof",
        label: "事例・社会的証明",
        meta: {
          goal: "「自分たちと近い会社が成功した」と認識させる",
          duration: "2〜3分",
          signal: "「うちもそれくらいの規模感」「似たような状況」が出たら次へ",
          pitfall: "規模・業種が違いすぎて他人事に聞こえる",
          tone: "ストーリーテリング。Before→転機→After の三幕構成で",
        },
        variants: {
          default: `「似たような状況の会社の話をしてもいいですか？

〔業種〕の会社で、スタッフ〔人数〕名。
導入前は売上が伸び悩み、営業が属人的な状態でした。

ウリアゲAIXを入れて3ヶ月後、
商談準備時間が1/10になり、
成約率が〔数字〕%から〔数字〕%に上がりました。
年間で〔金額〕万円の売上増加です。

御社の場合、〔具体的な数字〕くらいの効果が見込めます。」`,
        } as ScriptVariants,
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
        meta: {
          goal: "過去のIT・DXの \"失敗体験\" を引き出し、今回は違うと感じさせる",
          duration: "5〜10分",
          signal: "「人が変わらない」「定着しない」と相手が言ったら次へ",
          pitfall: "ツール比較に陥る / 過去の失敗を批判してしまう",
          tone: "理解と共感。\"そうなりますよね\" で受け止める",
        },
        variants: {
          default: `「御社でDXや生産性向上に取り組んできた経緯を聞かせてください。

今まで何かツール導入やIT化を試みたことはありますか？
（→ 回答を聞く）

それがうまくいかなかった、あるいは定着しなかった理由は
何だと感じていらっしゃいますか？」

（→ 傾聴し、問題の核心をつかむ）
「つまり、ツールよりも"人が変わらないこと"が課題なんですね？」`,
        } as ScriptVariants,
      },
      {
        id: "main",
        label: "メイントーク",
        meta: {
          goal: "「ツールではなく習慣」のコンセプトを刷り込む",
          duration: "5〜8分",
          signal: "「うちの社員でも使えそう」「学習コンテンツを見たい」と聞かれたら次へ",
          pitfall: "Eラーニングを \"ただの教材\" として説明 / 習慣化の重要性が伝わらない",
          tone: "教育者的・確信的。仕組みの裏側にある原理を語る",
        },
        variants: {
          default: `「以前DXを試みたけど定着しなかった、という話、
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
          short: `「カクヤクAIXは "ツール導入" ではなく
"組織の習慣変革" にフォーカスしたプログラムです。

Eラーニング15章 + 週次グループコンサル + 個別サポート。
3ヶ月で "AIを使いこなす組織" に変わります。

過去500社の継続率は95%です。」`,
          long: `「DXが定着しなかった会社の話を聞くと、
原因はだいたい3つに集約されます。

1. ツールを導入することがゴールになっていた
2. 学習する仕組みがなく、使い手のリテラシー差を放置していた
3. 成果が出るまでの伴走者がいなかった

カクヤクAIXは、この3つすべてに答えを用意しています。

まず、Eラーニング全15章。
ITリテラシーが低い方でも、ボタン操作の基礎から
プロンプト設計までを段階的に学べる設計です。

次に、週次のグループコンサル。
他社の活用事例も共有されるので、
「うちもこう使えばいいのか」が見えてきます。

そして、個別サポート + 平日チャット。
個別の業務に落とし込むときに必ず詰まりますが、
そこで挫折させない仕組みです。

結果として、3ヶ月後には
"AIを思考・実行・改善のループに組み込める組織" に変わります。

御社のITリテラシー、いま部署ごとにバラつきがありませんか？
（→ 回答を聞く）

カクヤクAIXは、まさにその "バラつき" を
レベル別教材で吸収する設計になっています。」`,
          defensive: `「正直、過去にDXで失敗した経験があると、
新しい話に警戒するのは当然だと思います。

ですので、今日は機能の説明ではなく、
"なぜ前回はうまくいかなかったか" を一緒に整理させてください。

そのうえで、カクヤクAIXが
そのギャップを埋められるかどうか、
率直に判断していただきたいんです。

無理に売り込みません。
合わない場合は、私の方からお断りすることもあります。

前回のDX、何が一番のボトルネックでしたか？」`,
        } as ScriptVariants,
      },
      {
        id: "urgency",
        label: "緊急性・タイミング",
        meta: {
          goal: "「DXは時間が経つほど差が広がる」を腹落ちさせ、今動く意味を作る",
          duration: "2〜4分",
          signal: "「いつから始めるのが現実的？」が出たら次へ",
          pitfall: "競合脅威を煽りすぎる / 助成金が条件付きであることを軽視させる",
          tone: "事実ベース・冷静に。データで語る",
        },
        variants: {
          default: `「DXって、始めるのが早ければ早いほど有利です。

なぜかというと、AIを使いこなす組織と
そうでない組織の差は、時間が経つほど広がるから。

それと、今は助成金が使える状況です。
人材開発支援助成金で、1名あたり最大30万円の補助が出ます。
500社申請して全社通過しているので、
手続きはこちらが全部サポートします。

この助成金が使えるうちに動くのが、
一番賢いタイミングだと思います。」`,
        } as ScriptVariants,
      },
      {
        id: "closing",
        label: "クロージング",
        meta: {
          goal: "「投資 vs リターン」を計算式で示し、今日の意思決定を引き出す",
          duration: "3〜5分",
          signal: "「やりましょう」「進めてください」が出たらすぐ申込み手続きへ",
          pitfall: "金額の話で空気が重くなる / 助成金の手続きが面倒に思われる",
          tone: "落ち着いた決断トーン。具体的な数字で背中を押す",
        },
        variants: {
          default: `「お話を整理すると、

御社は〔課題〕という状況で、
このままだと〔リスク〕が続く。

カクヤクAIXで3ヶ月後には
〔理想状態〕を実現できます。

助成金を使えば実質〔人数×10万円〕。
投資回収も〔月数〕ヶ月で完了する計算です。

あとは一歩踏み出すだけです。
今日、申込書を出してスタートしましょう。
助成金の手続きはすぐに一緒に進められます。」`,
          short: `「整理すると、御社は〔課題〕で
カクヤクAIXで〔理想状態〕に到達できる。

助成金で実質〔金額〕。
今日、申込書を出して始めますか？」`,
          exec: `「経営の意思決定として整理させてください。

組織のリテラシー差を放置すると、
〔人数〕名 × 月〔時間〕時間 = 年間〔金額〕万円の機会損失。

カクヤクAIX導入の投資は実質〔金額〕万円。
回収期間〔月数〕ヶ月の計算です。

3年後の組織の姿を考えるなら、
"今やる" 一択だと思います。

社長として、今日意思決定されますか？」`,
        } as ScriptVariants,
      },
      {
        id: "habitbuilding",
        label: "習慣化の説明",
        meta: {
          goal: "\"伴走で挫折させない仕組み\" を伝え、不安を消す",
          duration: "2〜3分",
          signal: "「ちゃんと続けられそう」「サポート手厚いね」と漏らしたら次へ",
          pitfall: "ノウハウ自慢に聞こえる / 数字 (66日, 95%) の根拠が弱く感じる",
          tone: "丁寧で誠実。\"一緒に伴走します\" の姿勢を強く出す",
        },
        variants: {
          default: `「なぜ習慣化にこだわるかというと、
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
        } as ScriptVariants,
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
        meta: {
          goal: "ウリアゲ vs カクヤク の優先度を相手に選ばせる",
          duration: "1〜2分",
          signal: "「攻 (or 守) かな…」と相手が言ったらその方向の本パートへ",
          pitfall: "片方を強く推しすぎて、もう片方を否定したように聞こえる",
          tone: "中立・選択肢を整理する案内人として",
        },
        variants: {
          default: `「お話を聞いていて、2つの方向性があると思っています。

▶ 営業の数字を今すぐ上げたい
  → ウリアゲAIX（攻）

▶ 組織全体を長期的に変えたい
  → カクヤクAIX（守）

どちらが今の御社の優先度が高いですか？
（→ 相手に選ばせる）

もちろん、両方セットで始める会社も多いですし、
まず一方から試して、手応えを見てから拡げるやり方もあります。
どちらが御社に合っていそうですか？」`,
          short: `「お話を聞いて、2方向あります。

▶ 数字を今すぐ → ウリアゲ（攻）
▶ 組織を長期的に → カクヤク（守）

どっちが今の優先度高いですか？」`,
        } as ScriptVariants,
      },
      {
        id: "bothpitch",
        label: "セット提案",
        meta: {
          goal: "両方セット導入のメリット (好循環) を腹落ちさせる",
          duration: "2〜3分",
          signal: "「合わせていくらですか？」「助成金で実質いくら？」と聞かれたら数字へ",
          pitfall: "セットを押し売りに見せる / 単体導入の選択肢を見えなくする",
          tone: "戦略コンサル的に。短期×長期の組み合わせの妙を語る",
        },
        variants: {
          default: `「両方やりたいというのは、実は一番賢い選択です。

攻（ウリアゲ）で売上を上げながら、
守（カクヤク）で組織の土台を固める。

これを同時にやることで、
稼いだ利益を組織強化に再投資できる
好循環が生まれるんです。

助成金は1名あたり30万円補助されるので、
5名なら150万円の補助が出ます。
両プログラム合わせても実質負担はかなり抑えられます。」`,
        } as ScriptVariants,
      },
      {
        id: "decision",
        label: "意思決定の背中押し",
        meta: {
          goal: "「迷い→言語化→共感→決断」のステップで一歩踏み出させる",
          duration: "3〜5分",
          signal: "「やってみます」「申込書を見せてください」が出たらすぐクロージング",
          pitfall: "押しが弱くまた持ち帰り / 切り返しトーク集を参照せず流してしまう",
          tone: "共感ベース。沈黙を作って相手に考えさせる時間を作る",
        },
        variants: {
          default: `「迷っているということは、
何か引っかかっていることがあるんだと思います。

率直に聞いてもいいですか？
今、一番「でも…」と思っていることって何ですか？

（→ 本音を引き出す）

なるほど、〔懸念〕ということですね。
実はそこ、よく出てくる話で…
（→ 切り返しトーク集を参照）

一つ言えるのは、
"やってから後悔した"という会社はほとんどいません。
"やらなかった"ことへの後悔はあっても。

今日、小さな一歩を踏み出してみませんか？」`,
        } as ScriptVariants,
      },
    ],
  },
}

/* ------------------------------------------------------------------ */
/*  Aux content data (Layer 2)                                         */
/* ------------------------------------------------------------------ */

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

const questionBank = [
  {
    category: "現状ヒアリング",
    desc: "商談序盤で相手の状況を引き出す",
    color: "blue" as const,
    icon: UserIcon,
    items: [
      "現在のチーム体制を教えてください（人数・役割）",
      "直近で力を入れている施策は何ですか？",
      "営業活動でいちばん工数を取られているところはどこですか？",
      "過去にツール導入を試したことはありますか？",
      "もしあれば、その時うまくいかなかった理由は何でしたか？",
    ],
  },
  {
    category: "課題深掘り",
    desc: "出てきたキーワードを掘り下げる",
    color: "amber" as const,
    icon: Search,
    items: [
      "具体的にはどういう場面ですか？",
      "その時、どう感じましたか？",
      "ちなみにそれはいつ頃からですか？",
      "他にも似たような悩みはありますか？",
      "逆にうまくいっていることはありますか？",
    ],
  },
  {
    category: "確認・要約",
    desc: "認識ズレをなくして次に進む",
    color: "emerald" as const,
    icon: Check,
    items: [
      "整理すると、〔○○〕ということですよね？私の理解、合っていますか？",
      "優先順位をつけるなら、どれが一番ですか？",
      "もし○○が解決したら、何が変わりそうですか？",
    ],
  },
  {
    category: "決断喚起",
    desc: "クロージング・意思決定段階で",
    color: "red" as const,
    icon: Zap,
    items: [
      "もし今、この状況が1年続いたら何が変わりますか？",
      "動くなら、いつ動きたいですか？",
      "逆に、何があれば前に進められますか？",
      "今日のお話で、一番響いたのはどこですか？",
    ],
  },
]

const stats = [
  { value: "最大3倍", label: "売上・利益アップ", note: "ウリアゲAIX導入企業平均" },
  { value: "90%", label: "事務作業削減", note: "AIエージェント12種で自動化" },
  { value: "1/10", label: "商談準備時間", note: "60分 → 6分相当" },
  { value: "95%", label: "継続利用率", note: "3ヶ月伴走プログラム" },
  { value: "30万円", label: "助成金/1人", note: "人材開発支援助成金" },
  { value: "500社", label: "申請全社通過", note: "助成金審査実績" },
  { value: "15章", label: "Eラーニング", note: "リテラシー別段階学習" },
  { value: "12種", label: "AIエージェント", note: "ウリアゲ全機能" },
  { value: "66日", label: "習慣化平均", note: "新行動定着の目安" },
  { value: "3ヶ月", label: "伴走プログラム", note: "週1MTG + 平日チャット" },
  { value: "週1回", label: "30分MTG", note: "オンライン振り返り" },
  { value: "5名", label: "150万円補助", note: "助成金で実質負担減" },
]

const metaphors = [
  {
    situation: "営業の属人化",
    phrase: "営業ノウハウは料理人の感覚と同じ。レシピにすれば誰でも再現できる",
    when: "「うちはトップ営業頼り」と言われた時",
  },
  {
    situation: "AI導入の不安",
    phrase: "車の運転と同じ。最初は不安でも、乗ってみれば慣れる",
    when: "「AIは難しそう」と言われた時",
  },
  {
    situation: "DX定着のコツ",
    phrase: "ジムの会員になるのと同じ。続ける仕組みがないと辞める",
    when: "「過去のDXで挫折した」話が出た時",
  },
  {
    situation: "助成金活用",
    phrase: "国が背中を押している補助制度。使わない手はない",
    when: "助成金が高い・面倒と思われた時",
  },
  {
    situation: "ツール vs 習慣",
    phrase: "最新の包丁を買っても、料理上手にはならない",
    when: "ツール比較で機能議論になった時",
  },
  {
    situation: "商談数と成果",
    phrase: "種まきと同じ。芽は後から出る、まずは打席に立つ",
    when: "目先の成果ばかり気にする相手に",
  },
  {
    situation: "リテラシー差",
    phrase: "学校の授業と同じで、レベル別クラスが必要",
    when: "「うちの社員に使えるか」と不安がられた時",
  },
  {
    situation: "意思決定の遅延",
    phrase: "天気予報を見て傘を持つかどうか、決められないと出社できない",
    when: "持ち帰り検討で時間を稼がれそうな時",
  },
]

const stories = [
  {
    industry: "製造業 (社員50名)",
    color: "orange" as const,
    product: "ウリアゲAIX",
    before: "営業3名が属人的に動き、若手が育たず売上が頭打ち",
    trigger: "ベテラン2名の同時離職リスクで危機感",
    after: "3ヶ月でAI営業フローが定着、若手が即戦力化、受注2倍",
    point: "「人」依存から「仕組み」依存への転換",
  },
  {
    industry: "飲食業 (10店舗)",
    color: "blue" as const,
    product: "カクヤクAIX",
    before: "店長ごとにオペレーションがバラバラ、新人教育コスト高",
    trigger: "新店オープンで標準化が急務に",
    after: "Eラーニングで業務標準化、離職率改善、新人教育コスト1/3",
    point: "ITリテラシー混在組織でも回せる仕組み",
  },
  {
    industry: "IT受託開発 (社員30名)",
    color: "purple" as const,
    product: "両方セット",
    before: "ベテラン依存×若手育たず、新規開拓も停滞",
    trigger: "既存案件依存リスクと将来人材不足",
    after: "売上1.5倍 + 若手の戦力化、ベテラン負担も大幅減",
    point: "攻 (ウリアゲ) と守 (カクヤク) の好循環",
  },
]

const ngExpressions = [
  {
    ng: "絶対大丈夫です",
    ok: "過去500社で全社合格しています",
    reason: "断定は警戒される。実績ベースで具体化",
  },
  {
    ng: "みんな使ってます",
    ok: "○○業界では○社が導入済みです",
    reason: "「みんな」は曖昧、業界特定で説得力UP",
  },
  {
    ng: "便利になります",
    ok: "○時間/週、削減できます",
    reason: "効果は数字で語る。曖昧表現は記憶に残らない",
  },
  {
    ng: "営業頑張ります",
    ok: "数字でコミットします",
    reason: "気合より定量目標。プロらしさが出る",
  },
  {
    ng: "簡単に使えます",
    ok: "Eラーニングで段階的に学べます",
    reason: "「簡単」は人によって違う。手順で示す",
  },
  {
    ng: "他社さんもやってます",
    ok: "業界トップ層が動いています",
    reason: "他人事感を消し、競合意識を刺激",
  },
  {
    ng: "ご検討ください",
    ok: "今日この場で○○を決めましょう",
    reason: "持ち帰りを許さない、決断を後押し",
  },
  {
    ng: "DXとは…(から始まる説明)",
    ok: "御社の状況でいうと○○です",
    reason: "前提説明より、相手の状況にすぐ落とし込む",
  },
  {
    ng: "予算はどのくらいでしょうか？(序盤で聞く)",
    ok: "現状でいちばん困っていることは？(序盤)",
    reason: "予算前に課題を明確化。逆だと値段交渉になる",
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TalkScriptsSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof scripts>("uriage")
  const [activePhase, setActivePhase] = useState(0)
  const [activeVariant, setActiveVariant] = useState<VariantKey>("default")
  const [pinnedKeys, setPinnedKeys] = useLocalStorage<string[]>("pinned-scripts", [])
  const [openAux, setOpenAux] = useState<Set<string>>(new Set())

  const current = scripts[activeTab]
  const Icon = current.icon
  const isPinned = pinnedKeys.includes(activeTab)
  const phase = current.phases[activePhase] ?? current.phases[0]
  const availableVariants = (Object.keys(phase.variants) as VariantKey[]).filter((k) => phase.variants[k])
  const currentScript = phase.variants[activeVariant] ?? phase.variants.default

  const togglePin = (key: string) => {
    setPinnedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const toggleAux = (key: string) => {
    setOpenAux((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
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
                const preview = s.phases[0].variants.default
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
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{preview.slice(0, 40)}…</p>
                    </div>
                    <CopyButton text={preview} />
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
              onClick={() => { setActiveTab(key); setActivePhase(0); setActiveVariant("default") }}
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
            onClick={() => { setActivePhase(i); setActiveVariant("default") }}
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
          key={`${activeTab}-${activePhase}-${activeVariant}`}
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
                <CopyButton text={currentScript} />
              </div>
            </div>
          </div>

          {/* Variant pills (only if multiple variants exist) */}
          {availableVariants.length > 1 && (
            <div className="px-4 pt-3 pb-1 flex items-center gap-2 overflow-x-auto border-b border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 flex-shrink-0">バリエーション:</span>
              {availableVariants.map((vk) => {
                const v = variantConfig[vk]
                const VIcon = v.icon
                const isActiveVariant = activeVariant === vk
                return (
                  <button
                    key={vk}
                    onClick={() => setActiveVariant(vk)}
                    className={cn(
                      "flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all",
                      isActiveVariant
                        ? `${current.badgeBg} ${current.badgeText} ${current.badgeBorder}`
                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                    )}
                    title={v.desc}
                  >
                    <VIcon className="w-3 h-3" />
                    {v.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Script body */}
          <div className={`border-l-4 ${current.accentColor} m-4 pl-4`}>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-mono">
              {currentScript}
            </p>
          </div>

          {/* Meta info panel */}
          <div className="px-4 pb-3 space-y-1.5 border-t border-slate-100 pt-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              このフェーズの設計
            </p>
            <MetaRow icon={Target} color="emerald" label="ゴール" text={phase.meta.goal} />
            <MetaRow icon={Timer} color="slate" label="目安時間" text={phase.meta.duration} />
            <MetaRow icon={Bell} color="blue" label="次に進めるシグナル" text={phase.meta.signal} />
            <MetaRow icon={AlertTriangle} color="red" label="やりがちな罠" text={phase.meta.pitfall} />
            <MetaRow icon={Mic} color="purple" label="トーンの目安" text={phase.meta.tone} />
          </div>

          {/* Navigation between phases */}
          <div className="px-4 pb-3 flex items-center justify-between border-t border-slate-100 pt-2">
            <button
              onClick={() => { setActivePhase((i) => Math.max(0, i - 1)); setActiveVariant("default") }}
              disabled={activePhase === 0}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← 前
            </button>
            <p className="text-[10px] text-slate-300">
              {activePhase + 1} / {current.phases.length}
            </p>
            <button
              onClick={() => { setActivePhase((i) => Math.min(current.phases.length - 1, i + 1)); setActiveVariant("default") }}
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
          フェーズタブを切り替えて場面別に確認。バリエーションがあるフェーズは相手の温度に合わせて選ぶ。〔　〕内は実数字に置き換える。★ピン留めでホームから即アクセス。
        </p>
      </div>

      {/* ===== AUX SECTION HEADER ===== */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2 px-1">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
            補助コンテンツ集
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <p className="text-[10px] text-slate-400 text-center mb-3">
          場面に応じて開いて参照。営業トークの引き出しを増やす
        </p>
      </div>

      {/* ===== AUX 1: 質問テンプレート集 ===== */}
      <AuxCard
        id="questions"
        title="質問テンプレート集"
        desc="ヒアリング・深掘り・確認・決断 の4カテゴリ"
        icon={MessageCircle}
        accent="from-blue-500 to-indigo-500"
        iconColor="text-blue-600"
        open={openAux.has("questions")}
        onToggle={() => toggleAux("questions")}
      >
        <div className="divide-y divide-slate-100">
          {questionBank.map((cat) => {
            const CatIcon = cat.icon
            const colorMap = {
              blue: { badge: "bg-blue-50 text-blue-700 border-blue-200", icon: "text-blue-600" },
              amber: { badge: "bg-amber-50 text-amber-700 border-amber-200", icon: "text-amber-600" },
              emerald: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: "text-emerald-600" },
              red: { badge: "bg-red-50 text-red-700 border-red-200", icon: "text-red-600" },
            }[cat.color]
            return (
              <div key={cat.category} className="px-4 py-3 space-y-2">
                <div className="flex items-center gap-2">
                  <CatIcon className={`w-3.5 h-3.5 ${colorMap.icon}`} />
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${colorMap.badge}`}>
                    {cat.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{cat.desc}</span>
                </div>
                <ul className="space-y-1.5 ml-1">
                  {cat.items.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 group">
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5">Q{i + 1}.</span>
                      <p className="flex-1 text-[12px] text-slate-700 leading-relaxed">{q}</p>
                      <CopyButton text={q} />
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </AuxCard>

      {/* ===== AUX 2: 数字・実績ストック ===== */}
      <AuxCard
        id="stats"
        title="数字・実績ストック"
        desc="トーク中にコピペで挿入できる実績数字"
        icon={Calculator}
        accent="from-emerald-500 to-teal-500"
        iconColor="text-emerald-600"
        open={openAux.has("stats")}
        onToggle={() => toggleAux("stats")}
      >
        <div className="grid grid-cols-2 gap-2 p-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-2.5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-lg"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-emerald-700">{s.value}</span>
                <span className="text-[10px] font-bold text-slate-700 truncate">{s.label}</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">{s.note}</p>
            </div>
          ))}
        </div>
      </AuxCard>

      {/* ===== AUX 3: たとえ話・比喩集 ===== */}
      <AuxCard
        id="metaphors"
        title="たとえ話・比喩集"
        desc="抽象的な話を一気に伝わる比喩へ"
        icon={Quote}
        accent="from-purple-500 to-pink-500"
        iconColor="text-purple-600"
        open={openAux.has("metaphors")}
        onToggle={() => toggleAux("metaphors")}
      >
        <div className="divide-y divide-slate-100">
          {metaphors.map((m, i) => (
            <div key={i} className="px-4 py-3 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                  {m.situation}
                </span>
                <span className="text-[9px] text-slate-400">{m.when}</span>
              </div>
              <div className="flex items-start gap-2 group">
                <Quote className="w-3 h-3 text-purple-300 flex-shrink-0 mt-1" />
                <p className="flex-1 text-[12px] text-slate-700 leading-relaxed italic">「{m.phrase}」</p>
                <CopyButton text={m.phrase} />
              </div>
            </div>
          ))}
        </div>
      </AuxCard>

      {/* ===== AUX 4: 顧客事例ストーリー ===== */}
      <AuxCard
        id="stories"
        title="顧客事例ストーリー"
        desc="Before / 転機 / After の三幕構成テンプレ"
        icon={BookMarked}
        accent="from-orange-500 to-red-500"
        iconColor="text-orange-600"
        open={openAux.has("stories")}
        onToggle={() => toggleAux("stories")}
      >
        <div className="divide-y divide-slate-100">
          {stories.map((st, i) => {
            const colorMap = {
              orange: { bar: "bg-orange-400", badge: "bg-orange-50 text-orange-700 border-orange-200" },
              blue: { bar: "bg-blue-500", badge: "bg-blue-50 text-blue-700 border-blue-200" },
              purple: { bar: "bg-purple-500", badge: "bg-purple-50 text-purple-700 border-purple-200" },
            }[st.color]
            const fullText = `【${st.industry} / ${st.product}】\nBefore: ${st.before}\n転機: ${st.trigger}\nAfter: ${st.after}\nポイント: ${st.point}`
            return (
              <div key={i} className="px-4 py-3 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">{st.industry}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${colorMap.badge}`}>
                    {st.product}
                  </span>
                  <CopyButton text={fullText} />
                </div>
                <div className="space-y-1.5 ml-1">
                  <StoryRow label="Before" text={st.before} barColor="bg-slate-300" />
                  <StoryRow label="転機" text={st.trigger} barColor="bg-amber-400" />
                  <StoryRow label="After" text={st.after} barColor={colorMap.bar} />
                  <div className="flex items-start gap-2 pt-1">
                    <Lightbulb className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-600 italic">ポイント: {st.point}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </AuxCard>

      {/* ===== AUX 5: NG表現と言い換え ===== */}
      <AuxCard
        id="ng"
        title="NG表現と言い換え"
        desc="つい言いがちな失言と、プロが使う表現"
        icon={XCircle}
        accent="from-red-500 to-rose-500"
        iconColor="text-red-600"
        open={openAux.has("ng")}
        onToggle={() => toggleAux("ng")}
      >
        <div className="divide-y divide-slate-100">
          {ngExpressions.map((ex, i) => (
            <div key={i} className="px-4 py-3 space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-black text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full flex-shrink-0">NG</span>
                <p className="flex-1 text-[12px] text-slate-600 line-through decoration-red-300">{ex.ng}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex-shrink-0">OK</span>
                <p className="flex-1 text-[12px] text-slate-800 font-bold">{ex.ok}</p>
                <CopyButton text={ex.ok} />
              </div>
              <p className="text-[10px] text-slate-500 ml-12 italic">→ {ex.reason}</p>
            </div>
          ))}
        </div>
      </AuxCard>

      {/* ===== AUX 6: ITリテラシー別チートシート (existing, kept) ===== */}
      <AuxCard
        id="literacy"
        title="ITリテラシー別チートシート"
        desc="相手のリテラシー帯に合わせて言葉を切り替える"
        icon={Sparkles}
        accent="from-cyan-500 to-blue-500"
        iconColor="text-cyan-600"
        open={openAux.has("literacy")}
        onToggle={() => toggleAux("literacy")}
      >
        <div className="divide-y divide-slate-100">
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
      </AuxCard>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Helper components                                                  */
/* ------------------------------------------------------------------ */

function MetaRow({
  icon: Icon,
  color,
  label,
  text,
}: {
  icon: typeof Target
  color: "emerald" | "slate" | "blue" | "red" | "purple"
  label: string
  text: string
}) {
  const colorMap = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
  }[color]

  return (
    <div className="flex items-start gap-2">
      <div className={cn("flex-shrink-0 w-6 h-6 rounded-md border flex items-center justify-center", colorMap)}>
        <Icon className="w-3 h-3" />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-tight">{label}</p>
        <p className="text-[11px] text-slate-700 leading-snug mt-0.5">{text}</p>
      </div>
    </div>
  )
}

function AuxCard({
  id,
  title,
  desc,
  icon: Icon,
  accent,
  iconColor,
  open,
  onToggle,
  children,
}: {
  id: string
  title: string
  desc: string
  icon: typeof MessageCircle
  accent: string
  iconColor: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${accent}`} />
      <button
        className="w-full px-4 pt-4 pb-3 flex items-center justify-between gap-3"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-sm font-bold text-slate-800">{title}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>
          </div>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-slate-300 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-slate-300 flex-shrink-0" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-slate-100"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StoryRow({ label, text, barColor }: { label: string; text: string; barColor: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className={`flex-shrink-0 w-1 self-stretch rounded-full ${barColor}`} />
      <div className="flex-1 min-w-0">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{label}</span>
        <p className="text-[11px] text-slate-700 leading-snug">{text}</p>
      </div>
    </div>
  )
}
