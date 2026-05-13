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
  Wand2, RotateCcw, ArrowRight, Compass, Pencil,
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
  standard: {
    key: "standard" as const,
    title: "ウツセバ式 標準セールスフロー",
    sub: "斉藤式 13フェーズ — 自己紹介〜クロージング",
    icon: Compass,
    accentColor: "border-fuchsia-400",
    badgeBg: "bg-fuchsia-50",
    badgeText: "text-fuchsia-700",
    badgeBorder: "border-fuchsia-200",
    headerBg: "from-fuchsia-500 to-purple-600",
    pinColor: "text-fuchsia-500",
    pinBg: "bg-fuchsia-50",
    phases: [
      {
        id: "self_intro",
        label: "1. 自己紹介・関係構築",
        meta: {
          goal: "事前準備で見つけた共通項・接点を1つだけ差し込み、相手に「ちゃんと調べてきてくれている」と感じさせる",
          duration: "1〜2分",
          signal: "「ありがとうございます」と相手の表情が柔らかくなったら次へ",
          pitfall: "事前情報がない状態で雑なヨイショに見える / 自社説明を長く話す",
          tone: "明るく丁寧。事実ベースの敬意で攻め、お世辞は避ける",
        },
        variants: {
          default: `「本日は〔社名〕様、お忙しい中ありがとうございます。
ちょっと始めになんですけど、
簡単に自己紹介させていただきたいなと思いまして…

実は事前にお調べしていて、
〔事前準備で見つけた接点を1つ差し込む〕
それで本当にこうしてお話できる機会、光栄に感じておりまして。

本日、お互いに楽しみにしていましたので、
有意義な時間になればなと思っております。」

────────────────────────────────
■ 〔事前準備で見つけた接点〕 例: 1つだけ刺さりやすいものを選ぶ
────────────────────────────────
  ・同郷ネタ            「私〇〇出身でして…」
  ・社歴・歴史          「〇年以上続いていらっしゃる、〇代目の歴史ある…」
  ・業界での存在感      「〇〇業界で〇〇という独自のポジションを…」
  ・共通の取引先 / 紹介者  「〇〇さんから "面白い会社" と伺っておりまして」
  ・受賞歴・メディア掲載 「〇〇で取り上げられているのを拝見しまして」
  ・代表のご経歴         「代表のご経歴を拝見していて、〇〇に感銘を受けまして」
  ・最近の動き(EC開設/新店/採用)「〇〇を始められたと伺いまして、御社の挑戦に…」
  ・新潟・地方の文脈     「地方発でここまで広げていらっしゃる会社さんって…」

★ 接点が一つも見つからない時は "正直モード"
  「実は本日、お会いするのを楽しみにしすぎて
   いろいろ調べたんですけど、なかなか表に出てない情報も多くて。
   今日はぜひ、御社のことを直接伺わせてください」`,
          short: `「お忙しい中ありがとうございます。
事前に〔接点〕を拝見していて、楽しみにお伺いしました。
（→ 自己紹介 30秒）よろしくお願いします。」`,
          exec: `「社長と直接お話できる機会、本当にありがたいです。

事前に〔事前準備で見つけた経営者個人の接点〕を拝見していて、
ぜひ直接お話ししたいと思っていました。

社長のお時間を無駄にしないよう、シンプルに行きます。」`,
          defensive: `「本日はお忙しい中ありがとうございます。

正直に申し上げますと、私のほうで事前にお調べしたうえで
お時間頂戴しているので、決して見当外れなお話はしないつもりです。
ただ、今日は売り込みでもなく、まず御社のことを
正しく理解したい気持ちでお伺いしています。

少しだけ、自己紹介とこちらの立ち位置だけお伝えしてもいいですか？」`,
        } as ScriptVariants,
      },
      {
        id: "three_check",
        label: "2. 3つの確認",
        meta: {
          goal: "「3つだけ確認」を宣言し、相手に「答える側」のポジションを取らせる",
          duration: "3〜5分",
          signal: "相手が3問とも答え切ったら、ご提案フェーズへ",
          pitfall: "確認のはずが詰問になる / 3つの宣言を忘れて散漫なヒアリングになる",
          tone: "丁寧で確信を持って。「テーマだけ言っちゃいますね」で先にフレームを開示",
        },
        variants: {
          default: `「本日せっかくお時間頂戴したっていうのもありまして、
"3つだけ" 確認させていただきたいんです。

その3つの確認が合うようであれば、
ちょっとご提案させていただきたいなと思ってるんですけど、大丈夫ですか？
（→ もちろん、を引き出す）

ちょっとテーマだけ先にお伝えしますね。

  ①  御社の中で、業務の中でどこに一番こう負担がかかってらっしゃるのか
  ②  ベテランさんの方々にどこぐらい依存してらっしゃるか、依存している業務があるかどうか
  ③  いつまで最前線でプレイヤーやっていくか、価値を下の世代にどう引き継いでいくか

この3つを一つずつ確認させていただきたいです。」

（→ ①から順に深掘る。鏡返しで相手の言葉を繰り返し、
   "なるほど、〇〇ということですね" で合意を取ってから次の問いへ）`,
          short: `「3つだけ確認させてください。

  ① いま業務でいちばん負担になっているのはどこですか？
  ② ベテランへの依存業務はどれくらいありますか？
  ③ 価値を次の世代に引き継ぐビジョンは見えていますか？

合うようであれば、ご提案させてください。」`,
          exec: `「社長にだけ伺いたい "3つの確認" があります。

  ① 御社の業務で、社長ご自身がいちばん時間を取られているのはどこか
  ② "あの人がいなくなったら困る" 業務は何件あるか
  ③ いつまで現場のプレイヤーをやり続けるご予定か

正直なところを伺えたら、その3つに刺さる打ち手だけを今日ご提案します。」`,
          defensive: `「すみません、いきなり提案でも売り込みでもなく、
"確認 3 点だけ" させていただきたいんです。

それで合わなかったら、今日は世間話で終わって大丈夫です。

  ① 業務で一番負担になっているのはどこか
  ② ベテラン依存になっている業務はどこか
  ③ 次の世代への引き継ぎ、ご想像はついているか

この3点、お答えいただける範囲で大丈夫です。」`,
        } as ScriptVariants,
      },
      {
        id: "deep_listen",
        label: "3. ヒアリング深堀",
        meta: {
          goal: "確認3点の答えを起点に、顧客の状況に合った切り口で深掘り。暗黙値・属人化・業務時間などを顧客の口から数値で出させる",
          duration: "5〜10分",
          signal: "顧客が「そうなんですよ…」と前のめりで体験を語り始めたら次へ",
          pitfall: "詰問になる / 数字を相手の口から引き出さず自分が想像で語る / 顧客の課題と無関係な切り口を選ぶ",
          tone: "傾聴・共感重視。鏡返しで合意を取りながら次の問いへ。3つの確認のお答えに沿って深掘り角度を選ぶ",
        },
        variants: {
          default: `「ありがとうございます。
特に営業力って、人と人のところなので、
営業力がある会社さんほどその "人" に依存しがちじゃないですか。

経験だったり、感覚センスの部分、
"暗黙値" と呼ばれている部分。
そういったところを、今後どうやって
次の世代に残していくか、ご想像ってついてらっしゃいますか？

（→ 答えを聞く。"まだついていない" を引き出す）

なるほど、ですよね。
ちなみに、若手の方が今のベテランの方々に
慣れるまでって、お答えできる範囲でいいので、
だいたいどれぐらいの時間を必要としそうですか？

（→ 数字を引き出す。例: 半年）

質問ばっかりで尋問みたいになって申し訳ないんですけど、
今の業務を例えば10個に分けたときに、
だいたい何割ずつぐらいの1日の流れ・業務の重圧という形ですか？
時間的な重圧も込みで聞かせてください。」`,
          short: `「3つの確認のうち〔○○〕について、もう少し深く聞かせてください。

ベテランへの依存度は業務の何割くらいですか？
若手が同じレベルになるまで、どれくらい時間がかかりそうですか？」`,
        } as ScriptVariants,
      },
      {
        id: "conclude_first",
        label: "4. 結論ファースト × AI誤解の先回り",
        meta: {
          goal: "提案フェーズに転換しつつ、「AI=営業代替」の警戒を一発で潰す",
          duration: "1〜2分",
          signal: "「あ、そういうことなんですね」と相手の警戒が解けたら次へ",
          pitfall: "AIツール導入をゴールに語ってしまう / 機能羅列に陥る",
          tone: "確信を込めて。冒頭で結論を投下し、誤解を即座にリフレーム",
        },
        variants: {
          default: `「ありがとうございます。
今日に関しては、まあご提案できるなって僕、判断したんですね。

その前に、よくある "AI" ってこう、耳にされたことってございますか？
（→ あると答える）

ありがとうございます。
AIって、どんなふうなイメージ持たれているかわからないんですけど、
結論から言って、

今回のお話は、よくある「AIの導入しましょうよ」っていう
ただの営業とは "全くもって違うお話" で。

AIで営業の代わりになりませんかとか、
そんなことを話すつもりは一切ないんですね。

あくまで御社が培ってきた、
そのトップセールスたちだったり、営業のその人の力、
そこをどうサポートしていけるものになるか。
それが今回の導入の鍵になってきます。」`,
          defensive: `「正直、AIって聞くと
"営業マン要らなくなるんじゃないか" って警戒される方も多いんですけど、
今日のお話は、全くもってその逆です。

御社の人の力をどう "最大化" するか。
そこに振り切ったプログラムです。
売り込みじゃなくて、まず聞いていただきたい立ち位置の話です。」`,
        } as ScriptVariants,
      },
      {
        id: "reduction_frame",
        label: "5. 50-70%削減フレーム",
        meta: {
          goal: "「雑務時間が半分以上消える」という強烈な印象を、相手の数字に紐づけて確定させる",
          duration: "3〜5分",
          signal: "相手が「えっ、それは大きいですね」と前のめりになったら次へ",
          pitfall: "削減数字だけ言って具体性が無い / 顧客の数字を聞かずに自分の数字で押す",
          tone: "具体的に、しかし数字は顧客から引き出してから掛け算する",
        },
        variants: {
          default: `「具体的になんですけど、
まず最初にやりたいことっていうのは、
皆さんが時間を費やしている "雑魚時間" と呼んでいる時間ですね。
ここを、まあ50%から70%削減しませんかってところから始めたいんです。

実際、社長もし仮になんですけど、
パソコンに向かってやる業務って、
1ヶ月、何時間くらいかけてらっしゃいますか？

（→ 数字を引き出す。例: 80時間/月）

なるほど、4時間/日くらいですね。
そしたらそのうちの、仮に少なく見積もって50%としても、
月40時間が浮きます。

その40時間、何に使いたいですか？

（→ 答えを聞き、相手が本当に大事にしていることを引き出す）

そういった削減した時間を、
本来あるべき業務に充てたり、
新しいお客様への商談に充てたり、
"商談以外の生産能力ある時間" として
取り戻していきましょうよ、というのが
最初にお伝えしたかったところでございます。」`,
        } as ScriptVariants,
      },
      {
        id: "number_sim",
        label: "6. 数字シミュレーション",
        meta: {
          goal: "1人の時間削減を、組織全体の売上インパクトに拡張して「これは投資だ」と認識させる",
          duration: "2〜3分",
          signal: "「これは数字でかいですね」と相手が口に出したら次へ",
          pitfall: "数字が抽象的になる / 控えめな掛け算で迫力が出ない",
          tone: "電卓を叩くように、相手の数字をその場で掛け算して見せる",
        },
        variants: {
          default: `「いいですね、お聞かせいただきましてありがとうございます。
じゃあ仮にこれが、御社全体に広がったとしましょう。

月40時間から仮に50時間が浮いた場合、
1日換算で 約4時間。

4時間あったら、社長、
新しいお客様、何件回れますか？
（→ 答え: 1〜3軒など）

なるほど、3軒回れるとすると、
従来の商談回転に加えて、
営業能力として "30%ぐらい増加" する計算になるじゃないですか。

仮に営業1名あたり月100万円ぐらいの売上だとすると、
30%改善で月30万円。
× 営業6名なら、合計180万円が
"見えていなかったところの数字" として
単月で上がってくる計算になります。

これが3ヶ月続くと…
半年続くと…
ここまでセットで考えていただきたいなと思っています。」`,
          short: `「浮いた4時間 × 営業マンの人数で、
月100万 × 30%改善 × 〔人数〕名 = 月+〔金額〕万円。
これが見えていないインパクトです。」`,
        } as ScriptVariants,
      },
      {
        id: "literacy_comfort",
        label: "7. リテラシー不安解消 (LINEたとえ)",
        meta: {
          goal: "「うちの社員には難しい」という最大の懸念を、LINE比喩で一発解消する",
          duration: "1〜2分",
          signal: "「LINE使えれば大丈夫そうですね」と相手が口に出したら次へ",
          pitfall: "技術用語(プロンプト、API)で説明 / 不安に蓋をする",
          tone: "親しみやすく。相手の従業員の顔を浮かべながら",
        },
        variants: {
          default: `「これは結構ご質問いただくんですけど、
"うちの社員でも使えるかな" って思いますよね。

社長、皆さん従業員の方々、
LINE って使ってるイメージありますか？

（→ ある、と答える）

さすが、ありがとうございます。
めちゃめちゃシンプルで、
社長もたぶんご存知だと思うんですけど、

AIって基本的にまあ、その、
"超優秀な日本語で会話できる部下" だと思っていただければOKです。

コールが難しいシステムとか、そういったお話ではなくて、
皆さん LINE で打つように、決められた定型文だったり、
"こんなことやりたい" を文字で投げる。
そういったところを慣らすところからやっていくので、
LINE が打てれば、基本的には使いこなせるようになっていきます。

さすがに "俺は絶対LINEもやんねえんだよ" って方がいたら
ちょっとあれなんですけど、
そんな方がいらっしゃらなければ大丈夫そうですね。」`,
        } as ScriptVariants,
      },
      {
        id: "tailored_pitch",
        label: "8. 御社特化提案 — 3つの柱",
        meta: {
          goal: "「うちには具体的に何ができる？」を3つの柱で絞り込んで答え、提案の解像度を一気に上げる",
          duration: "3〜5分",
          signal: "「すごいイメージ湧きました」「具体的にどう進めるんですか」と聞かれたら次へ",
          pitfall: "機能を全部見せて散らかる / 顧客の事業に紐づけられない",
          tone: "「事前情報からこうご提案させていただきます」と仕立て感を出す",
        },
        variants: {
          default: `「僕、勝手にあの、事前情報お聞きしていたので、
その中でご提案できそうだなと思ったのが、
こちら 3つの柱でございます。

【1】 ディフェンス側 — 事務作業の自動化
   見積もり作成・マニュアル作成、エクセルで打ち込んでいる部分。
   そこをまず AI で自動化。
   議事録は録音音声を投げるだけで生成、
   "優秀な秘書ができる" イメージで使っていただける。

【2】 攻め側 — 営業活動の支援
   ルート営業に対しても、新しいアイデア出し・提案内容の組み立て・
   フォローアップ文章の自動生成。
   トップ営業の "型" を AI が再現します。

【3】 EC・販路拡大 — 新規チャネルへの展開
   ECサイトがあるなら、写真の加工・商品文章の文字起こし・
   アップロード作業まで段階的に AI で。

この3つの柱で、御社にはご提案できるんじゃないかなと考えています。
人を増やさずに、人が増えた分の能力が得られる。
これが AI の一番の良さだと、僕は思うんですね。

最終的な判断・ダブルチェック、
本来上司として、上役としてやるべき業務、
そこは人間に残しておいて、
"雑務のゼロから一を作るところ" を AI に任せる構造です。」`,
        } as ScriptVariants,
      },
      {
        id: "closing_declare",
        label: "9. クロージング — 断言 × プログラム",
        meta: {
          goal: "「本当にできるんですか」を「断言」で一発解消し、具体プログラムを開示する",
          duration: "3〜5分",
          signal: "「あぁ、なるほど」とプログラム内容にうなずいたら次へ",
          pitfall: "断言を回避して曖昧表現にする / プログラム内容を抽象的に説明",
          tone: "確信を込めて。「断言させていただきます」を絶対に言い切る",
        },
        variants: {
          default: `「できると思っちゃっていいですか？
（→ もちろん、と頷かれる）

そこに関しては "断言" させていただきます。

ご一緒する流れなんですけど、

【最初の2日間】 研修プログラム
  業務の洗い出しと、その場でAI化に着手します。
  御社の業務をそのまま、
  "合宿を学ぶというよりは、その場で業務を AI 化していく" 設計です。

【その後の3ヶ月間】 伴走期間
  週次の振り返り + 平日チャットサポート。
  ここで日常業務に AI を定着させていきます。
  "当たり前に AI がある、当たり前にやれる" 状態を作ります。

ボリューム感は、3名から5名ぐらいで
始められる法人様が多いです。
ペルソナとしては、

  ・EC部門の担当者
  ・営業のベテランチーム（暗黙値を価値化したい方）
  ・若手のキーパーソン（マインドセット転換役）

こういった構成で組ませていただくのがおすすめです。」`,
          long: `「できると思っちゃっていいですか？
そこに関しては "断言" させていただきます。

具体的なプログラム設計をお話しします。

【Day 1〜2 / 研修フェーズ】
  まず御社の業務の洗い出しを一気にやります。
  "10個の業務" を全部出してもらって、
  そのうち AI 化できるものをその場で組み立て。
  "学ぶ" ではなく "業務をAI化する2日間" です。

【月1〜3 / 伴走フェーズ】
  週1のグループコンサル + 個別フォロー + 平日チャット。
  "当たり前に AI がある" 状態まで定着させます。

【メンバー構成のおすすめ】
  ・EC部門 / 営業ベテラン / 若手キーパーソン
  この3層を組み合わせると、組織への浸透速度が一段上がります。

  社長は雇用保険適用外なんですけど、
  料金は同じなので "もう一緒にどうぞ" でお入りいただくのが
  個人的にはおすすめです。」`,
        } as ScriptVariants,
      },
      {
        id: "exec_close",
        label: "10. 経営者クロージング — 助成金 + 節税",
        meta: {
          goal: "投資額の話を「もはやプラスになる」に反転させ、決算月前なら即決を狙う",
          duration: "3〜5分",
          signal: "「決算月いつでしたっけ」「経費計上できるなら」のフラグでクロージング確定",
          pitfall: "助成金や節税の話を後付けに見せる / 数字をぼかす",
          tone: "落ち着いて、しかし確信ベースで。電卓を見せながら話すイメージ",
        },
        variants: {
          default: `「結論からお伝えすると、
1人当たり 40万円 の費用がかかります。

ただ、助成金活用というところがあるので、
そのうちの 75% が後から返ってくる形になります。
実質 1人 10万円 でございますね。

その10万円に対する費用対効果が、
先ほどお伝えした月40時間の削減 + 売上の上振れ。

これは結構いいチャンスかなと思っています。

それに加えてなんですけど、
御社の決算月って、いつ頃でしょうか？

（→ 例: 6月）

ありがとうございます。
これは一つ考え方なんですけど、
決算月前であれば、

  ・研修費用を経費（損金）として計上できる
  ・法人税の節税効果が最大 33% ぐらい

このボリュームのメリットも出てきますので、
助成金 75% + 損金で実質コスト数% という構造になり、
場合によっては "もはやプラスになってくるケース" もあります。

100万置いておいて法人税で30%取られるところ、
研修に充てて 75% 返ってきて、節税効果でむしろプラス。
利益が出ている会社さんほど、これは美味しいタイミングです。」`,
        } as ScriptVariants,
      },
      {
        id: "demerit_rebuttal",
        label: "11. デメリット切り返し",
        meta: {
          goal: "完璧主義の最後のガード「デメリットないんですか」を笑いと誠実さで開く",
          duration: "1〜2分",
          signal: "「いやー、素晴らしい提案ですね」と相手が前のめりになったら次へ",
          pitfall: "「ありません」と否定だけで終わる / リスト風に苦しい欠点を並べる",
          tone: "誠実さ + 軽い笑い。プライドを見せる",
        },
        variants: {
          default: `「（"デメリットありますか?" と聞かれて）

デメリットですか？
…正直、ないですね。

というのは、私たちもプライドを持って
このサービスで打ち出させていただいておりまして、
入れることが僕らのゴールでは "なく"、
できるようになっていただく、
ここに一番の価値を感じていただきたいんです。

なので、もし強いて言うなら、

"僕たちが人として全然気に入ってもらえなかったとき"
くらいじゃないですかね。

それぐらい、自分たちのサービスには
自信を持たせていただいています。」`,
        } as ScriptVariants,
      },
      {
        id: "competitor_compare",
        label: "12. 他社比較 — 80%価値減 vs 伴走",
        meta: {
          goal: "他社検討のテーブルから自然に降ろし、「伴走の有無」が比較軸であることを刷り込む",
          duration: "1〜2分",
          signal: "「やっぱり伴走ですね」と相手が言ったらクロージング確定",
          pitfall: "他社批判に聞こえる / 数字なしで「違います」と言う",
          tone: "正直に。他社を批判せず「構造の違い」を説明",
        },
        variants: {
          default: `「"他社さん的にはどんな感じなんですか?" って
よくご質問いただくんですけど、

他社さんは基本的に、僕の知見でちょっと恐縮なんですけど、
今ある AI ツールっていうのを サブスク型 か 一括請求型 で
"導入して終わり" っていう事例が結構多いです。

ほぼそれですよね、ちゃんと。

なので、結局入れた後に
"なんだか使い方よくわからない" ってなってしまうと、
我々の価値も半減どころじゃなく、
"結構80%ぐらい減ってしまう" んじゃないかというのが、
正直、他社との違いかなと思っています。

ツールの中身よりも、
"使いこなせる状態まで伴走するか"。
そこが、他社さんとうちの一番の違いです。」`,
        } as ScriptVariants,
      },
      {
        id: "final_close",
        label: "13. 最終クロージング — 次のアクション確定",
        meta: {
          goal: "「進めましょう」を相手の口から出させて、雇用保険等の前提条件まで一気に詰める",
          duration: "2〜3分",
          signal: "「お願いします」「進めましょう」が出たら申込み手続きへ",
          pitfall: "条件確認をスルーして後から戻る / 持ち帰りを許す",
          tone: "決断を後押しする確信トーン。沈黙を恐れない",
        },
        variants: {
          default: `「であれば、このまま〔人数〕名様で進めさせていただきたいなと
思ってらっしゃいますか？

（→ はい、と頷かれる）

ありがとうございます。
じゃあちょっと注意事項だけ確認させていただいてもいいですか？

【条件1】 雇用保険に加入していること
  （→ 加入 / 未加入を確認）
  未加入の方がいらっしゃる場合は、
  受けるタイミングを分けることもできますので、
  ちょっと整理しましょう。

【条件2】 助成金の申請タイミング
  御社の状況だと、〔○月〕までの動きが
  一番費用対効果が出る計算になります。

【条件3】 ご担当者のリテラシー
  どなたが現場リーダーになりそうですか？
  ここだけ事前に伺っておくと、
  研修の質が一段上がります。

このまま進めていきましょう。
細かい手続きは私の方で全部サポートしますので、
社長は意思決定だけで大丈夫です。」`,
          short: `「であれば、このまま〔人数〕名様で進めましょう。

条件は3つ：
  ① 雇用保険加入の確認
  ② 助成金申請タイミング
  ③ ご担当者の特定

書類は全部こちらでサポートします。
今日、判子押せそうですか？」`,
        } as ScriptVariants,
      },
    ],
  },
}

/* ------------------------------------------------------------------ */
/*  Unified question pool — Phase 2 (3つの確認) と Phase 3 (深掘り)   */
/*  10 items. Closer picks up to 3 in Phase 2; the same 3 carry over   */
/*  to Phase 3 deep-dive, where each item has tailored intro/follow-up.*/
/* ------------------------------------------------------------------ */

type ConfirmQuestion = {
  id: string
  short: string         // chip label
  full: string          // Phase 2 confirmation question text
  deepIntro: string     // Phase 3 deep-dive lead-in sentence
  deepQuestion: string  // Phase 3 deep-dive main question
  deepFollowup: string  // Phase 3 closer-side note: what to listen for
  proposal: string      // Phase 4 1-line proposal hook (what AI does for this issue)
  tip: string           // when to pick this one
}

export const confirmationQuestions: ConfirmQuestion[] = [
  {
    id: "burden",
    short: "業務負担",
    full: "御社の中で、業務の中でどこに一番こう負担がかかってらっしゃるのか",
    deepIntro: "もう少し具体的に伺うと、",
    deepQuestion: "その負担になっている業務、パソコンに向かってやる時間って、1ヶ月、何時間くらいかけてらっしゃいますか？",
    deepFollowup: "（→ 80時間/月 など具体数字を出す → 50-70%削減フェーズの伏線）",
    proposal: "負担業務のうちパソコン作業を 50-70% 削減 → 浮いた時間で商談数を増やし、売上 +30% の試算が現実的",
    tip: "汎用。どの業種にも刺さる入り口",
  },
  {
    id: "veteran_dep",
    short: "ベテラン依存",
    full: "ベテランの方々にどこぐらい依存してらっしゃるか、属人化している業務があるかどうか",
    deepIntro: "特に営業力って、人と人のところなので、営業力がある会社さんほど「人」に依存しがちじゃないですか。",
    deepQuestion: "経験だったり感覚センス、いわゆる「暗黙値」と呼ばれる部分。そういったところを、今後どうやって次の世代に残していくか、ご想像ってついてらっしゃいますか？",
    deepFollowup: "（→「まだついていない / 難しい」を引き出す）",
    proposal: "ベテランの暗黙値を AI で型化し、若手即戦力化 → ベテランは本来の上流業務に集中",
    tip: "創業10年以上 / 職人型 / トップ営業に頼る組織",
  },
  {
    id: "succession",
    short: "次世代への継承",
    full: "いつまで最前線でプレイヤーやっていくか、価値を下の世代にどう引き継いでいくか",
    deepIntro: "もう一つだけ確認させてください。",
    deepQuestion: "今後組織を任せられそうな、化けそうな若手やキーマン候補って、何名くらいいらっしゃいますか？",
    deepFollowup: "（→「まだいない / 1人いる」を引き出す → 育成投資の文脈へ）",
    proposal: "属人化された価値を AI で再現可能な仕組みに変換 → 次世代への引き継ぎが時間ではなく仕組みで進む",
    tip: "代表が現場プレイヤー / 後継者問題のある会社 / 2代目・3代目",
  },
  {
    id: "growth_bottleneck",
    short: "成長の壁",
    full: "今、売上や組織を伸ばしていく上で、いちばんネックになっているのはどこか",
    deepIntro: "そのネックになっているところ、もう少し因数分解させてください。",
    deepQuestion: "「リソース(人手)」「ノウハウ(やり方)」「仕組み(再現性)」の3つで分けると、いまの感覚だとどこが一番大きいですか？",
    deepFollowup: "（→ 3つのうちどれが一番痛いかを引き出す → 提案フェーズの軸が決まる）",
    proposal: "ボトルネックに対して「人・ノウハウ・仕組み」の3層で AI が補完 → 人を増やさず能力だけ増える状態へ",
    tip: "成長志向の経営者 / 拡大フェーズの会社",
  },
  {
    id: "ceo_time",
    short: "社長の時間",
    full: "社長ご自身が今、いちばん時間を取られているのはどこか、本来やりたい仕事に集中できているか",
    deepIntro: "質問ばっかりで尋問みたいになって申し訳ないんですけど、",
    deepQuestion: "社長の1ヶ月の業務を10個に分けたとき、何割ずつぐらいの配分ですか？営業 / 事務 / 会議 / 採用 / 雑務など、ざっくりで大丈夫です",
    deepFollowup: "（→ 社長業以外の比率が大きいことを顕在化 → 雑務削減の動機を作る）",
    proposal: "社長業以外の業務を AI で巻き取り、本来やりたい意思決定・新規開拓に時間を再配分",
    tip: "代表との直接商談 / プレイングマネージャー型",
  },
  {
    id: "knowledge_mgmt",
    short: "ナレッジ管理",
    full: "現場のノウハウ・情報が、組織のどこにどう貯まっているか、形式知化できているか",
    deepIntro: "あと、組織の中で情報がどこに貯まっているか伺いたいんですが、",
    deepQuestion: "現場のノウハウや情報って、Excel・口伝・属人メモ・Slack…どこに今は貯まっていますか？",
    deepFollowup: "（→「バラバラ / 個人依存」を引き出す → ナレッジ化フックへ）",
    proposal: "分散している情報を AI が集約・即時検索可能に → 1人の知識が全社の資産に",
    tip: "多拠点・多店舗 / 情報共有が問題意識にある会社",
  },
  {
    id: "automation",
    short: "自動化候補",
    full: "今やっている業務のうち、もし自動化できるならまっさきに任せたい業務は何か",
    deepIntro: "その業務、もう少し具体的に伺うと、",
    deepQuestion: "いま1ヶ月に何時間くらいかけていて、誰が担当していますか？1人ですか、複数名ですか？",
    deepFollowup: "（→ 時間 × 担当人数 × 単価でコスト試算の材料を仕込む）",
    proposal: "見積もり・マニュアル・議事録など雑務時間を 50-70% 削減 → ROI 試算が一番ハッキリ出る切り口",
    tip: "IT/DXに前向き / リテラシー高めの会社",
  },
  {
    id: "repeat_pain",
    short: "繰り返しの質問・トラブル",
    full: "業務の中で、現場から同じ質問が繰り返し出てきたり、似たトラブルが3回以上起きているところがあるかどうか",
    deepIntro: "業務をやっている中で、",
    deepQuestion: "具体的にはどんな質問やトラブルが多いですか？どれぐらいの頻度で起きていますか？",
    deepFollowup: "（→「FAQ整備されてない / 教育に時間取られる」を引き出す → マニュアル/ナレッジ化フックへ）",
    proposal: "FAQ・マニュアルを AI で自動生成、現場の繰り返し質問を解消 → 教育コスト・対応工数を大幅削減",
    tip: "FAQ・マニュアル不足が課題の会社 / 教育コストが気になる経営者",
  },
  {
    id: "competitor_pressure",
    short: "競合の動き",
    full: "同業他社で、AI・EC・デジタル活用などの動きが気になっている会社さんがあるかどうか",
    deepIntro: "ちょっと余談なんですけど、",
    deepQuestion: "同じ業界で、デジタル活用で動きが速い会社さん、具体的に印象に残っている事例ってありますか？",
    deepFollowup: "（→ 競合意識を高める →「うちもそろそろ…」を引き出す）",
    proposal: "他社が3年かけて構築する仕組みを、3ヶ月の伴走で先取り → 業界内で先行ポジションへ",
    tip: "既に他社動向を気にしている会社 / 業界スピード感がある業種",
  },
  {
    id: "education_cost",
    short: "教育・採用コスト",
    full: "新人教育や採用のコスト・時間が、今いちばんのネックになっているかどうか",
    deepIntro: "ちなみに若手の方が今のベテランの方々と同じレベルになるまで、",
    deepQuestion: "お答えできる範囲で大丈夫なんですけど、だいたいどれぐらいの時間が必要そうですか？採用単価や離職率も、もしよろしければ。",
    deepFollowup: "（→ 半年〜3年 / 採用単価 / 離職率を引き出す → 人を増やさずスケールする文脈へ）",
    proposal: "新人がベテラン水準に達する時間を半年〜1年から大幅圧縮 → 採用コストと離職リスクが同時に下がる",
    tip: "新人教育に時間がかかる / 採用コストに困っている会社",
  },
]

export function buildThreeCheckScript(selectedIds: string[]): string {
  const numerals = ["①", "②", "③", "④", "⑤", "⑥", "⑦"]
  const selected = selectedIds
    .map((id) => confirmationQuestions.find((q) => q.id === id))
    .filter((q): q is ConfirmQuestion => !!q)

  if (selected.length === 0) {
    return `「本日せっかくお時間頂戴したっていうのもありまして、
何点か確認させていただきたいんです。

（→ 右上の確認質問プールから1〜3つ選んでください）」`
  }

  const numbered = selected.map((q, i) => `  ${numerals[i]}  ${q.full}`).join("\n")
  const n = selected.length
  const nText = n === 1 ? "1つ" : n === 2 ? "2つ" : `${n}つ`

  return `「本日せっかくお時間頂戴したっていうのもありまして、
"${nText}だけ" 確認させていただきたいんです。

その${nText}の確認が合うようであれば、
ちょっとご提案させていただきたいなと思ってるんですけど、大丈夫ですか？
（→ もちろん、を引き出す）

ちょっとテーマだけ先にお伝えしますね。

${numbered}

この${nText}を一つずつ確認させていただきたいです。」

（→ ①から順に深掘る。鏡返しで相手の言葉を繰り返し、
   "なるほど、〇〇ということですね" で合意を取ってから次の問いへ）`
}

export function buildDeepListenScript(selectedIds: string[]): string {
  const selected = selectedIds
    .map((id) => confirmationQuestions.find((q) => q.id === id))
    .filter((q): q is ConfirmQuestion => !!q)

  if (selected.length === 0) {
    return `「ありがとうございます。
3つの確認のお答えを伺ったうえで、もう少し深く聞かせてください。

（→ Phase 2「3つの確認」で選んだ項目がそのままここに反映されます。
   未選択の場合は、上のチップから1〜3つ選んでください）」`
  }

  const numerals = ["【1】", "【2】", "【3】", "【4】"]
  const sections = selected.map((q, i) => {
    return `${numerals[i]} ${q.short}
${q.deepIntro}
${q.deepQuestion}

${q.deepFollowup}`
  }).join("\n\n────────────────────────────\n\n")

  return `「ありがとうございます。
3つの確認のお答えを伺ったうえで、もう少しだけ深く聞かせてください。」

${sections}

────────────────────────────

「整理させていただくと、ここまでのお答えで
〔①の要点〕〔②の要点〕〔③の要点〕ということですね。
私の理解、合っていますか？」

（→ 鏡返しで合意を取ってから、次の "結論ファースト" フェーズへ）`
}

export function buildConcludeScript(selectedIds: string[]): string {
  const selected = selectedIds
    .map((id) => confirmationQuestions.find((q) => q.id === id))
    .filter((q): q is ConfirmQuestion => !!q)

  if (selected.length === 0) {
    return `「ありがとうございます。
お話を伺っていて、御社のテーマがだいぶ整理できました。

（→ Phase 2「3つの確認」で項目を選んでいただくと、
   その3つに紐づいた提案フックがここに反映されます）」`
  }

  const numerals = ["①", "②", "③"]
  const themes = selected.map((q, i) => `  ${numerals[i]}  ${q.short}`).join("\n")
  const hooks = selected.map((q, i) => `  ${numerals[i]}  ${q.short}\n     → ${q.proposal}`).join("\n\n")
  const n = selected.length
  const nText = n === 1 ? "1点" : n === 2 ? "2点" : "3点"

  return `「ありがとうございます。
お話を伺っていて、御社で動かしていきたいテーマが
だいぶ整理できました。

${themes}

この${nText}、私の理解で合っていますか？
（→「そうです」を引き出す）

今日に関しては、まあご提案できるなって僕、判断したんですね。
結論から言うと…

その前に、よくある "AI" ってこう、耳にされたことってございますか？
（→ あると答える）

ありがとうございます。
今回のお話は、よくある「AI の導入しましょうよ」っていう
ただの営業とは "全くもって違うお話" で。

AI で営業の代わりになりませんかとか、
そんなことを話すつもりは一切ないんですね。

あくまで御社が培ってきたものに対して、
今日お話しいただいた

${hooks}

この${nText}に、AI がどう機能するのか。
そこに振り切ったご提案を、これからさせてください。」`
}

export function buildReductionScript(selectedIds: string[]): string {
  const selected = selectedIds
    .map((id) => confirmationQuestions.find((q) => q.id === id))
    .filter((q): q is ConfirmQuestion => !!q)

  if (selected.length === 0) {
    return `「具体的になんですけど、まず最初にやりたいことは、
皆さんが時間を費やしている "雑魚時間" を、50-70% 削減しませんかってところから始めたい。

（→ Phase 2 で項目を選ぶと、各テーマに紐づいた削減フックがここに反映されます）」`
  }

  const numerals = ["①", "②", "③"]
  const items = selected.map((q, i) => `  ${numerals[i]}  ${q.short}\n     → ${q.proposal}`).join("\n\n")

  return `「具体的になんですけど、まず最初にやりたいことは、
皆さんが今お話しいただいた

${items}

ここに紐づく "雑魚時間" を、50-70% 削減しませんかってところから始めたいんです。

実際、社長もし仮になんですけど、
パソコンに向かってやる業務って、1ヶ月、何時間くらいかけてらっしゃいますか？

（→ 数字を引き出す。例: 80時間/月）

なるほど、そしたらそのうち、仮に少なく見積もって 50% としても、月40時間が浮きます。
その40時間、上記の3点の解決に投資できますよね。

そういった削減した時間を、
本来あるべき業務 — まさに〔上の①〕〔上の②〕〔上の③〕に充てていく。
これが最初のステップでございます。」`
}

export function buildNumberSimScript(selectedIds: string[]): string {
  const selected = selectedIds
    .map((id) => confirmationQuestions.find((q) => q.id === id))
    .filter((q): q is ConfirmQuestion => !!q)

  if (selected.length === 0) {
    return `「いいですね、お聞かせいただきましてありがとうございます。
じゃあ仮にこれが、御社全体に広がったとしましょう。

（→ Phase 2 で項目を選ぶと、各テーマに紐づいた数字インパクトがここに反映されます）」`
  }

  const numerals = ["①", "②", "③"]
  const items = selected.map((q, i) => `  ${numerals[i]}  ${q.short}`).join("\n")

  return `「いいですね、お聞かせいただきましてありがとうございます。
じゃあ仮にこれが、御社全体に広がったとしましょう。

今お話しいただいた

${items}

この3点に紐づく業務時間、月40〜50時間が浮いた場合、
1日換算で 約4時間。

4時間あったら、社長、
新しいお客様、何件回れますか？
（→ 答え: 1〜3軒など）

なるほど、3軒回れるとすると、
従来の商談回転に加えて、
営業能力として "30% ぐらい増加" する計算になるじゃないですか。

仮に営業1名あたり月100万円ぐらいの売上だとすると、
30% 改善で月30万円。
× 営業6名なら、合計180万円が
"見えていなかったところの数字" として
単月で上がってくる計算になります。

しかもこの削減は、
${selected[0].short}・${selected[selected.length > 1 ? 1 : 0].short}・${selected[selected.length > 2 ? 2 : 0].short}
この3点を同時に解いていくので、
時間が浮くだけでなく、組織の継承・標準化も並行で進む構造です。

これが3ヶ月続くと…
半年続くと…
ここまでセットで考えていただきたいなと思っています。」`
}

export function buildPillarScript(selectedIds: string[]): string {
  const selected = selectedIds
    .map((id) => confirmationQuestions.find((q) => q.id === id))
    .filter((q): q is ConfirmQuestion => !!q)

  if (selected.length === 0) {
    return `「僕、勝手にあの、事前情報お聞きしていたので、
その中でご提案できそうだなと思った 3つの柱でございます。

（→ Phase 2 で項目を選ぶと、御社特化の3つの柱がここに反映されます）」`
  }

  const pillars = selected.map((q, i) => `【${i + 1}】 ${q.short}
   ${q.proposal}

   ${q.deepFollowup}`).join("\n\n")

  return `「僕、勝手にあの、事前情報お聞きしていたので、
今日のお話を伺ってご提案できそうだと思った
"3つの柱" でございます。

${pillars}

この${selected.length === 1 ? "1本" : selected.length === 2 ? "2本" : "3本"}の柱で、御社にはご提案できるんじゃないかなと考えています。

人を増やさずに、人が増えた分の能力が得られる。
これが AI の一番の良さだと、僕は思うんですね。

最終的な判断・ダブルチェック、
本来上司として、上役としてやるべき業務、
そこは人間に残しておいて、
"雑務のゼロから一を作るところ" を AI に任せる構造です。」`
}

export function buildClosingDeclareScript(selectedIds: string[]): string {
  const selected = selectedIds
    .map((id) => confirmationQuestions.find((q) => q.id === id))
    .filter((q): q is ConfirmQuestion => !!q)

  if (selected.length === 0) {
    return `「できると思っちゃっていいですか？
そこに関しては "断言" させていただきます。

（→ Phase 2 で項目を選ぶと、御社の課題に対する伴走プログラムがここに反映されます）」`
  }

  const numerals = ["①", "②", "③"]
  const items = selected.map((q, i) => `  ${numerals[i]}  ${q.short}`).join("\n")

  return `「できると思っちゃっていいですか？
（→ もちろん、と頷かれる）

そこに関しては "断言" させていただきます。

ご一緒する流れなんですけど、

【最初の2日間】研修プログラム
  御社の業務の中で、今日お話しいただいた

${items}

  この3点について、その場で AI 化に着手します。
  御社の業務をそのまま、合宿で学ぶというよりは、
  "その場で業務を AI 化していく" 設計です。

【その後の3ヶ月間】伴走期間
  上記3点を中心に、週次の振り返り + 平日チャットサポート。
  ここで日常業務に AI を定着させていきます。
  "当たり前に AI がある、当たり前にやれる" 状態を作ります。

ボリューム感は、3名から5名ぐらいで
始められる法人様が多いです。

御社の場合、特に
${selected[0].short}を中心とした体制を組ませていただくのが
いちばん効果が出やすいかなと考えています。」`
}

export function buildExecCloseScript(selectedIds: string[]): string {
  const selected = selectedIds
    .map((id) => confirmationQuestions.find((q) => q.id === id))
    .filter((q): q is ConfirmQuestion => !!q)

  if (selected.length === 0) {
    return `「結論からお伝えすると、1人当たり40万円。
助成金で実質10万円、決算月前なら法人税節税で "もはやプラス" になるケースもあります。

（→ Phase 2 で項目を選ぶと、御社特化のROIフレームがここに反映されます）」`
  }

  const numerals = ["①", "②", "③"]
  const items = selected.map((q, i) => `  ${numerals[i]}  ${q.short} → ${q.proposal}`).join("\n")

  return `「結論からお伝えすると、
1人当たり 40万円 の費用がかかります。

ただ、助成金活用というところがあるので、
そのうちの 75% が後から返ってくる形になります。
実質 1人 10万円 でございますね。

その10万円に対する費用対効果なんですけど、
今日お話しいただいた

${items}

この${selected.length === 1 ? "1点" : selected.length === 2 ? "2点" : "3点"}全部に対して、
月40時間の削減 + 売上の上振れが見込めます。
1点あたりで割っても、十分にペイする計算です。

それに加えてなんですけど、
御社の決算月って、いつ頃でしょうか？
（→ 例: 6月）

ありがとうございます。
これは一つ考え方なんですけど、決算月前であれば、

  ・研修費用を経費（損金）として計上できる
  ・法人税の節税効果が最大 33% ぐらい

このボリュームのメリットも出てきます。
助成金 75% + 損金で実質コスト数% という構造になり、
場合によっては "もはやプラスになってくるケース" もあります。

100万置いておいて法人税で30%取られるところ、
研修に充てて 75% 返ってきて、節税効果でむしろプラス。

利益が出ている会社さんほど、
今日の3点に向き合うベストタイミングです。」`
}

export function buildFinalCloseScript(selectedIds: string[]): string {
  const selected = selectedIds
    .map((id) => confirmationQuestions.find((q) => q.id === id))
    .filter((q): q is ConfirmQuestion => !!q)

  if (selected.length === 0) {
    return `「であれば、このまま〔人数〕名様で進めさせていただきたいなと思ってらっしゃいますか？

（→ Phase 2 で項目を選ぶと、御社特化のクロージング文がここに反映されます）」`
  }

  const numerals = ["①", "②", "③"]
  const items = selected.map((q, i) => `  ${numerals[i]}  ${q.short}`).join("\n")

  return `「であれば、このまま〔人数〕名様で、
今日お話しいただいた

${items}

この${selected.length === 1 ? "1点" : selected.length === 2 ? "2点" : "3点"}の解決に向けて、進めさせていただきたいなと
思ってらっしゃいますか？

（→ はい、と頷かれる）

ありがとうございます。
じゃあちょっと注意事項だけ確認させていただいてもいいですか？

【条件1】雇用保険に加入していること
  （→ 加入 / 未加入を確認）
  未加入の方がいらっしゃる場合は、
  受けるタイミングを分けることもできます。

【条件2】助成金の申請タイミング
  御社の状況だと、〔○月〕までの動きが
  一番費用対効果が出る計算になります。

【条件3】ご担当者のリテラシー
  上記3点の現場リーダーになりそうな方、
  どなたか心当たりはありますか？
  ここだけ事前に伺っておくと、
  研修の質が一段上がります。

このまま進めていきましょう。
細かい手続きは私の方で全部サポートしますので、
社長は意思決定だけで大丈夫です。」`
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
  {
    category: "斉藤式・3つの確認",
    desc: "オープニング直後の鉄板フレーム",
    color: "purple" as const,
    icon: Compass,
    items: [
      "御社の中で今、業務の中でどこに一番こう負担がかかってらっしゃるのか、お答えできる範囲でいいので教えてください",
      "ベテランさんが結構いらっしゃるじゃないですか。そういったベテランの方々にどこぐらい依存してらっしゃるか、依存している業務があるかどうか",
      "社長がどう感じていらっしゃるかわからないんですけど、いつまで最前線でプレイヤーやっていくか、どういうふうにこの価値を下の世代に引き継いでいくか、ご想像ってついていますか？",
      "若手の方が今のベテランの方々に慣れるまで、だいたいどれぐらいの時間を必要としそうですか？",
      "今の業務を例えば10個に分けたとき、大体何割ずつぐらいの1日の流れですか？時間的な重圧も込みで",
      "パソコンに向かってやる業務って、1ヶ月何時間くらいかけてらっしゃいますか？",
      "（数字を引き出した後）その時間が半分浮いたとして、社長何件商談とか新しいお客様回れますか？",
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
  { value: "実質10万", label: "1人当たり費用", note: "40万 × 助成金75% 還付" },
  { value: "50〜70%", label: "雑務時間削減", note: "斉藤式 — 段階的に到達" },
  { value: "+30%", label: "営業能力UP", note: "浮いた時間で商談1〜2軒追加可" },
  { value: "33%", label: "法人税節税", note: "決算月前計上で最大ボリューム" },
  { value: "180万/月", label: "売上インパクト例", note: "6名×100万×30%改善" },
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
    situation: "AI＝部下のたとえ（斉藤式）",
    phrase: "AIは基本的に、超優秀な日本語で会話できる部下だと思ってください。LINEで打つようにメッセージを送れる人なら、誰でも使い始められます",
    when: "「AIってシステムとか難しそう」と言われた時。LINEを使っているかを確認してから繰り出す",
  },
  {
    situation: "雑務ゼロイチをAIに",
    phrase: "雑務のゼロから一を作り出すところはAIに任せて、上司・上役は本来の判断業務に集中する。それが理想の役割分担です",
    when: "「AIに任せて大丈夫?」「人間の仕事は?」と聞かれた時",
  },
  {
    situation: "現場摩擦ゼロのAI",
    phrase: "システムを入れると人が辞めるけど、AIは画面の向こうにドラえもんがいる感覚で、現場の摩擦がゼロ",
    when: "「ツール入れると現場が反発する」と懸念された時",
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
  {
    ng: "AIで営業の代わりになれます",
    ok: "御社が培ってきた営業の力をどうサポートするかが今回の鍵です",
    reason: "AI=営業代替で売ると失注確定。「営業の力を活かす味方」のフレームに振り切る",
  },
  {
    ng: "100%自動化できます",
    ok: "最初から100%は正直無理です。段階的にそこへ行きましょう",
    reason: "過剰約束は信頼を毀損する。正直に線を引くと逆に信頼が深まる(斉藤式)",
  },
  {
    ng: "(デメリットを聞かれて) 特にありません",
    ok: "強いて言うなら、私たちが人として気に入ってもらえなかった時くらいですかね",
    reason: "デメリット質問は信頼を試す問い。完璧主義の防御を笑いとプロ意識で開く",
  },
]


/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TalkScriptsSection() {
  const [activePhase, setActivePhase] = useState(0)
  const [activeVariant, setActiveVariant] = useState<VariantKey>("default")
  const [openAux, setOpenAux] = useState<Set<string>>(new Set())
  const [selectedConfirmIds, setSelectedConfirmIds] = useState<string[]>([
    "burden",
    "veteran_dep",
    "succession",
  ])
  const [linkedEditorOpen, setLinkedEditorOpen] = useState(false)

  const current = scripts.standard
  const Icon = current.icon
  const phase = current.phases[activePhase] ?? current.phases[0]
  const availableVariants = (Object.keys(phase.variants) as VariantKey[]).filter((k) => phase.variants[k])
  const baseScript = phase.variants[activeVariant] ?? phase.variants.default

  const isThreeCheckDefault = phase.id === "three_check" && activeVariant === "default"
  const isDeepListenDefault = phase.id === "deep_listen" && activeVariant === "default"
  const isConcludeDefault = phase.id === "conclude_first" && activeVariant === "default"
  const isReductionDefault = phase.id === "reduction_frame" && activeVariant === "default"
  const isNumberSimDefault = phase.id === "number_sim" && activeVariant === "default"
  const isPillarDefault = phase.id === "tailored_pitch" && activeVariant === "default"
  const isClosingDeclareDefault = phase.id === "closing_declare" && activeVariant === "default"
  const isExecCloseDefault = phase.id === "exec_close" && activeVariant === "default"
  const isFinalCloseDefault = phase.id === "final_close" && activeVariant === "default"

  // Phase 5-13 (excl. 7/11/12) share the same "selection summary" indicator
  const isLinkedLater =
    isReductionDefault ||
    isNumberSimDefault ||
    isPillarDefault ||
    isClosingDeclareDefault ||
    isExecCloseDefault ||
    isFinalCloseDefault

  const currentScript = isThreeCheckDefault
    ? buildThreeCheckScript(selectedConfirmIds)
    : isDeepListenDefault
    ? buildDeepListenScript(selectedConfirmIds)
    : isConcludeDefault
    ? buildConcludeScript(selectedConfirmIds)
    : isReductionDefault
    ? buildReductionScript(selectedConfirmIds)
    : isNumberSimDefault
    ? buildNumberSimScript(selectedConfirmIds)
    : isPillarDefault
    ? buildPillarScript(selectedConfirmIds)
    : isClosingDeclareDefault
    ? buildClosingDeclareScript(selectedConfirmIds)
    : isExecCloseDefault
    ? buildExecCloseScript(selectedConfirmIds)
    : isFinalCloseDefault
    ? buildFinalCloseScript(selectedConfirmIds)
    : baseScript

  const toggleConfirm = (id: string) => {
    setSelectedConfirmIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) return [...prev.slice(1), id]
      return [...prev, id]
    })
  }

  const toggleAux = (key: string) => {
    setOpenAux((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="space-y-4">

      {/* Sticky wrapper: PHASE NAV + SCRIPT CARD だけが対象。
          下の AUX (テンプレ/数字/例え話) に入ったらナビは追随しない */}
      <div className="space-y-4">

      {/* ===== PHASE NAV — Stepper with section gradients ===== */}
      {(() => {
        const phaseStepperLabels: Record<string, string> = {
          self_intro: "自己",
          three_check: "確認",
          deep_listen: "深掘",
          conclude_first: "結論",
          reduction_frame: "削減",
          number_sim: "数字",
          literacy_comfort: "比喩",
          tailored_pitch: "3つの柱",
          closing_declare: "Pgm",
          exec_close: "経営者",
          demerit_rebuttal: "デメ",
          competitor_compare: "他社",
          final_close: "最終",
        }
        const sections = [
          {
            label: "ヒアリング",
            range: [0, 3] as [number, number],
            line: "from-slate-400 to-slate-500",
            passed: "from-slate-400 to-slate-500",
            active: "from-slate-700 to-slate-900",
            bg: "bg-slate-100",
            text: "text-slate-700",
            ring: "ring-slate-300",
            glow: "shadow-slate-400/40",
          },
          {
            label: "提案・展開",
            range: [3, 8] as [number, number],
            line: "from-amber-400 to-orange-500",
            passed: "from-amber-400 to-orange-500",
            active: "from-amber-500 to-orange-600",
            bg: "bg-amber-100",
            text: "text-amber-800",
            ring: "ring-amber-300",
            glow: "shadow-amber-400/40",
          },
          {
            label: "クロージング",
            range: [8, 13] as [number, number],
            line: "from-rose-400 to-fuchsia-500",
            passed: "from-rose-400 to-fuchsia-500",
            active: "from-rose-500 to-fuchsia-600",
            bg: "bg-rose-100",
            text: "text-rose-800",
            ring: "ring-rose-300",
            glow: "shadow-rose-400/40",
          },
        ]
        const findSection = (i: number) =>
          sections.find((s) => i >= s.range[0] && i < s.range[1])!
        const activeSection = findSection(activePhase)
        return (
          <div className="sticky top-12 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-md p-3 space-y-2">
            {/* Section headers spanning their phase ranges */}
            <div className="flex gap-1.5">
              {sections.map((sec) => {
                const count = sec.range[1] - sec.range[0]
                const isCurrent = sec === activeSection
                return (
                  <div
                    key={sec.label}
                    style={{ flex: count }}
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors",
                      isCurrent ? `${sec.bg} ${sec.text}` : "text-slate-300"
                    )}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                      {sec.label}
                    </span>
                    <div
                      className={cn(
                        "h-px flex-1",
                        isCurrent ? "bg-current opacity-40" : "bg-slate-200"
                      )}
                    />
                  </div>
                )
              })}
            </div>

            {/* Stepper row */}
            <div className="flex items-start gap-1.5">
              {sections.map((sec) => {
                const phasesInSec = current.phases.slice(sec.range[0], sec.range[1])
                const localActive =
                  activePhase >= sec.range[1]
                    ? phasesInSec.length - 1
                    : activePhase >= sec.range[0]
                    ? activePhase - sec.range[0]
                    : -1
                const progressFraction =
                  phasesInSec.length <= 1
                    ? localActive >= 0
                      ? 1
                      : 0
                    : Math.max(0, localActive) / (phasesInSec.length - 1)
                return (
                  <div
                    key={sec.label}
                    style={{ flex: phasesInSec.length }}
                    className="relative flex items-start justify-between pt-0.5"
                  >
                    {/* base line */}
                    {phasesInSec.length > 1 && (
                      <div className="absolute top-3.5 left-3.5 right-3.5 h-0.5 bg-slate-200 rounded-full" />
                    )}
                    {/* progress line */}
                    {phasesInSec.length > 1 && progressFraction > 0 && (
                      <motion.div
                        initial={false}
                        animate={{ scaleX: progressFraction }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        style={{ transformOrigin: "left" }}
                        className={cn(
                          "absolute top-3.5 left-3.5 right-3.5 h-0.5 rounded-full bg-gradient-to-r",
                          sec.line
                        )}
                      />
                    )}

                    {phasesInSec.map((p, idx) => {
                      const i = sec.range[0] + idx
                      const isActive = activePhase === i
                      const isPassed = activePhase > i
                      return (
                        <motion.button
                          key={p.id}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setActivePhase(i)
                            setActiveVariant("default")
                          }}
                          title={p.label}
                          className="relative flex flex-col items-center gap-1 group z-10 min-w-0"
                        >
                          <motion.span
                            animate={{ scale: isActive ? 1.15 : 1 }}
                            transition={{ type: "spring", stiffness: 320, damping: 22 }}
                            className={cn(
                              "flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-black transition-all",
                              isActive
                                ? `bg-gradient-to-br ${sec.active} text-white shadow-lg ${sec.glow} ring-2 ring-offset-2 ring-offset-white ${sec.ring}`
                                : isPassed
                                ? `bg-gradient-to-br ${sec.passed} text-white shadow-sm`
                                : "bg-white border-2 border-slate-300 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-600"
                            )}
                          >
                            {i + 1}
                          </motion.span>
                          <span
                            className={cn(
                              "text-[9px] font-bold leading-none whitespace-nowrap transition-colors",
                              isActive
                                ? sec.text
                                : isPassed
                                ? "text-slate-600"
                                : "text-slate-400"
                            )}
                          >
                            {phaseStepperLabels[p.id] ?? p.label}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      {/* ===== SCRIPT CARD ===== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activePhase}-${activeVariant}`}
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

          {/* Three-check picker — only on phase 2 default variant */}
          {isThreeCheckDefault && (
            <div className="mx-4 mt-3 p-3 bg-fuchsia-50/60 border border-fuchsia-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-fuchsia-700 uppercase tracking-wider">
                  確認質問プール — 最大3つ選ぶ
                </p>
                <span className="text-[10px] font-bold text-fuchsia-600 bg-white border border-fuchsia-200 px-2 py-0.5 rounded-full">
                  {selectedConfirmIds.length} / 3
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {confirmationQuestions.map((q) => {
                  const idx = selectedConfirmIds.indexOf(q.id)
                  const isSel = idx >= 0
                  return (
                    <button
                      key={q.id}
                      onClick={() => toggleConfirm(q.id)}
                      title={q.tip}
                      className={cn(
                        "inline-flex items-center gap-1 text-[11px] font-bold pl-1.5 pr-2.5 py-1 rounded-full border transition-colors",
                        isSel
                          ? "bg-fuchsia-500 text-white border-fuchsia-500"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      )}
                    >
                      <span
                        className={cn(
                          "w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center",
                          isSel ? "bg-white text-fuchsia-600" : "bg-slate-100 text-slate-400"
                        )}
                      >
                        {isSel ? idx + 1 : "+"}
                      </span>
                      {q.short}
                    </button>
                  )
                })}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 leading-snug">
                ★ 選択した順に①②③として下のスクリプトへ反映。再クリックで解除、4つ目を選ぶと最古が押し出されます。各チップにホバーで使いどころのヒント。
              </p>
            </div>
          )}

          {/* Deep-listen picker — only on phase 3 default variant */}
          {isConcludeDefault && (
            <div className="mx-4 mt-3 p-3 bg-rose-50/60 border border-rose-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                  提案テーマ — Phase 2/3 と連動
                </p>
                <span className="text-[10px] font-bold text-rose-600 bg-white border border-rose-200 px-2 py-0.5 rounded-full">
                  {selectedConfirmIds.length} / 3
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {confirmationQuestions.map((q) => {
                  const idx = selectedConfirmIds.indexOf(q.id)
                  const isSel = idx >= 0
                  return (
                    <button
                      key={q.id}
                      onClick={() => toggleConfirm(q.id)}
                      title={q.tip}
                      className={cn(
                        "inline-flex items-center gap-1 text-[11px] font-bold pl-1.5 pr-2.5 py-1 rounded-full border transition-colors",
                        isSel
                          ? "bg-rose-500 text-white border-rose-500"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      )}
                    >
                      <span
                        className={cn(
                          "w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center",
                          isSel ? "bg-white text-rose-600" : "bg-slate-100 text-slate-400"
                        )}
                      >
                        {isSel ? idx + 1 : "+"}
                      </span>
                      {q.short}
                    </button>
                  )
                })}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 leading-snug">
                ★ 選択中のテーマがそのまま提案フックとしてスクリプトに挿入されます。ここで変更すると Phase 2/3 のスクリプトも更新されます。
              </p>
            </div>
          )}

          {isDeepListenDefault && (
            <div className="mx-4 mt-3 p-3 bg-sky-50/60 border border-sky-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                  深掘り対象 — Phase 2 と連動
                </p>
                <span className="text-[10px] font-bold text-sky-600 bg-white border border-sky-200 px-2 py-0.5 rounded-full">
                  {selectedConfirmIds.length} / 3
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {confirmationQuestions.map((q) => {
                  const idx = selectedConfirmIds.indexOf(q.id)
                  const isSel = idx >= 0
                  return (
                    <button
                      key={q.id}
                      onClick={() => toggleConfirm(q.id)}
                      title={q.tip}
                      className={cn(
                        "inline-flex items-center gap-1 text-[11px] font-bold pl-1.5 pr-2.5 py-1 rounded-full border transition-colors",
                        isSel
                          ? "bg-sky-500 text-white border-sky-500"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      )}
                    >
                      <span
                        className={cn(
                          "w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center",
                          isSel ? "bg-white text-sky-600" : "bg-slate-100 text-slate-400"
                        )}
                      >
                        {isSel ? idx + 1 : "+"}
                      </span>
                      {q.short}
                    </button>
                  )
                })}
              </div>
              <p className="text-[10px] text-slate-500 mt-2 leading-snug">
                ★ Phase 2「3つの確認」で選んだ項目がそのまま深掘り対象に。ここで選び直すと Phase 2 のスクリプトにも反映されます。
              </p>
            </div>
          )}

          {/* Selection summary for Phase 5-13 dynamic scripts (editable via dropdown) */}
          {isLinkedLater && (
            <div className="mx-4 mt-3 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-2.5 flex items-center gap-1.5 flex-wrap text-[10px]">
                <span className="font-bold text-slate-500 uppercase tracking-wider mr-1">選択中テーマ:</span>
                {selectedConfirmIds.length === 0 ? (
                  <span className="text-slate-400 italic flex-1">
                    Phase 2-4 で項目を選ぶか、右の「編集」から選択してください
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5 flex-wrap flex-1">
                    {selectedConfirmIds.map((id, i) => {
                      const q = confirmationQuestions.find((x) => x.id === id)
                      if (!q) return null
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-full"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-slate-800 text-white text-[8px] font-black flex items-center justify-center">
                            {i + 1}
                          </span>
                          {q.short}
                        </span>
                      )
                    })}
                  </div>
                )}
                <button
                  onClick={() => setLinkedEditorOpen((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors ml-auto",
                    linkedEditorOpen
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                  )}
                >
                  <Pencil className="w-3 h-3" />
                  {linkedEditorOpen ? "閉じる" : "編集"}
                  {linkedEditorOpen
                    ? <ChevronUp className="w-3 h-3" />
                    : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {linkedEditorOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-slate-200 bg-white"
                  >
                    <div className="p-2.5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                          確認質問プール — このフェーズのまま編集
                        </p>
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                          {selectedConfirmIds.length} / 3
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {confirmationQuestions.map((q) => {
                          const idx = selectedConfirmIds.indexOf(q.id)
                          const isSel = idx >= 0
                          return (
                            <button
                              key={q.id}
                              onClick={() => toggleConfirm(q.id)}
                              title={q.tip}
                              className={cn(
                                "inline-flex items-center gap-1 text-[11px] font-bold pl-1.5 pr-2.5 py-1 rounded-full border transition-colors",
                                isSel
                                  ? "bg-slate-800 text-white border-slate-800"
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                              )}
                            >
                              <span
                                className={cn(
                                  "w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center",
                                  isSel ? "bg-white text-slate-800" : "bg-slate-100 text-slate-400"
                                )}
                              >
                                {isSel ? idx + 1 : "+"}
                              </span>
                              {q.short}
                            </button>
                          )
                        })}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2 leading-snug">
                        ※ 選択は全フェーズ（Phase 2-13）で共通。最大3つ、4つ目を選ぶと一番古いものが外れます。
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

      </div>
      {/* /Sticky wrapper end */}

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
            const colorMap = ({
              blue: { badge: "bg-blue-50 text-blue-700 border-blue-200", icon: "text-blue-600" },
              amber: { badge: "bg-amber-50 text-amber-700 border-amber-200", icon: "text-amber-600" },
              emerald: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: "text-emerald-600" },
              red: { badge: "bg-red-50 text-red-700 border-red-200", icon: "text-red-600" },
              purple: { badge: "bg-purple-50 text-purple-700 border-purple-200", icon: "text-purple-600" },
            } as const)[cat.color]
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

