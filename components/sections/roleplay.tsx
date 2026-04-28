"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Trophy, ExternalLink, Dumbbell, Flame, Camera, MessageCircle, PlayCircle, Sparkles, Eye, Tag, ChevronDown } from "lucide-react"

const LINE_OFFICIAL_URL = "#" // TODO: 公式LINEのURLを後で差し替え (例: https://lin.ee/xxxxx)

const gradeCriteria = [
  { grade: "S", label: "大型案件 30名以上 担当可", color: "from-amber-400 to-yellow-500", textColor: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
  { grade: "A", label: "5名以上担当可（10名以上も可）", color: "from-emerald-400 to-teal-500", textColor: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  { grade: "B", label: "3名のみ担当（合格最低ライン）", color: "from-blue-400 to-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
]

const roleplayLevels = [
  {
    lv: 1,
    title: "事務代行会社 田中社長",
    difficulty: "低",
    difficultyColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    description: "ITリテラシーが低く、趣味の時間を増やしたい事務代行会社の女性社長。潜在的な欲求を引き出し、分かりやすい言葉で価値を伝えられるかが鍵です。",
    url: "https://chatgpt.com/g/g-69c8d48846548191a57639025e49e8eb-aixrohure-lv1-shi-wu-dai-xing-tian-zhong-she-chang",
    accentColor: "from-emerald-400 to-green-500",
  },
  {
    lv: 2,
    title: "税理士 山田所長",
    difficulty: "中",
    difficultyColor: "bg-blue-100 text-blue-700 border-blue-200",
    description: "紙とハンコを重んじる保守的な税理士。セキュリティ不安を解消し、高付加価値業務へのシフトを提案してください。",
    url: "https://chatgpt.com/g/g-69c8d8f4e4488191bee9dfffbe017c54-aixrohure-lv2-shui-li-shi-shan-tian-suo-chang",
    accentColor: "from-blue-400 to-cyan-500",
  },
  {
    lv: 3,
    title: "居酒屋 佐々木社長",
    difficulty: "高",
    difficultyColor: "bg-orange-100 text-orange-700 border-orange-200",
    description: "現場主義でスマホしか使えない居酒屋オーナー。属人的な教育課題をAIで解決し、多店舗展開の夢を後押ししてください。隠れた決裁者（奥様）への対応も必要です。",
    url: "https://chatgpt.com/g/g-69c8dc6176148191a80a6e29515c44db-aixrohure-lv3-yin-shi-dian-zuo-mu-she-chang",
    accentColor: "from-orange-400 to-amber-500",
  },
  {
    lv: 4,
    title: "建設業 浜田社長",
    difficulty: "高",
    difficultyColor: "bg-orange-100 text-orange-700 border-orange-200",
    description: "2024年問題と現場の疲弊に悩む建設業の2代目。過去のシステム導入失敗のトラウマを乗り越えさせ、先代会長への説得材料を渡してください。",
    url: "https://chatgpt.com/g/g-69c8de6d19388191a4f2f09b57db5b0f-aixrohure-lv4-jian-she-ye-wan-shan-she-chang",
    accentColor: "from-orange-500 to-red-500",
  },
  {
    lv: 5,
    title: "IT企業 高橋社長",
    difficulty: "超高",
    difficultyColor: "bg-red-100 text-red-700 border-red-200",
    description: "AIに精通した元フルスタックエンジニアの社長。「自社で作れる」というプライドを崩し、経営的ROIでクロージングしてください。",
    url: "https://chatgpt.com/g/g-69c8dfa8ad108191920d197da5e875ea-aixrohure-lv5-itqi-ye-gao-qiao-she-chang",
    accentColor: "from-red-500 to-pink-600",
  },
]

// ===== 参考商談ログ（ウツセバ代表 佐藤の実商談）=====
// ※ 抽出方針：佐藤代表の提案力は属人性が高いため、
//   代理店クローザーが「ウリアゲAIX/カクヤクAIX」のセールスに直接転用できる
//   フレーズ・フレームワーク・期待値調整の部分のみを抽出している。
//   個人の人脈エピソードや業界特有のディテールは除外。
type ReferenceLog = {
  id: number
  url: string
  title: string
  tags: string[]
  highlight: string[]   // 推しポイント（端的に「ここがすごい」を箇条書き）
  watchPoints: string[] // 見るべき箇所（時刻 + ポイントを箇条書き）
  accentColor: string
}

const referenceLogs: ReferenceLog[] = [
  {
    id: 1,
    url: "https://tldv.io/app/meetings/69d619171214a000131e9612/",
    title: "初回商談：建材卸（経営陣2名）× 事務自動化 / EC×AI / 研修クロージング",
    tags: ["初回商談", "経営陣同席", "建材卸", "B2C EC計画", "事務自動化", "EC×AI提案", "研修クロージング", "次回アポ獲得"],
    highlight: [
      "結論ファースト：「めちゃくちゃ結論から言いますと…全部自動化できる、怖い話です」と冒頭3秒で引き込む型",
      "期待値先回り調整：「100%は諦めた方がいいです、70-80%で十分」と言い切ることで顧客の完璧主義不安を解除し信頼獲得",
      "二項対立フレーム：「成果が出る会社と普通の会社」を対比、「考え方を変えないとサバイバル難しい」で危機感を煽る話法",
      "比喩力：EC×AIを『クリスマスケーキの断面図』で説明し、抽象的な透明性論を一発で腹落ちさせる",
    ],
    watchPoints: [
      "04:35 ◆冒頭の型「めちゃくちゃ結論から言いますと、パソコンとスマホでできることは全部自動化できるんですよ、超怖い話で」（注意を奪う切り出し）",
      "05:30 ◆AIX根本フレーム「売上の上げ方ってアプローチ2つしかないなと思ってまして、打席数を増やすと決定率を上げる」",
      "06:01 ◆当たり前を堂々と「パソコンの前に座ってる時間減らして、お客さんの前に立つ時間を増やす。当たり前ですけど、これなんですよ」",
      "08:01 ◆数字ファクトの投下「うちそれで人を増やさずに3.7倍いけたんですよ」（事例の流れで自然に出す）",
      "11:18 ◆権威付け「キーエンスとかプルデンシャル生命とか、トップ営業のノウハウを集合値でフィードバック」",
      "16:18 ★期待値先回りの鉄板「結果から言うと100%は諦めた方がいいです。70-80%ぐらいを作ってくれる」（完璧主義の不安を一言で解除）",
      "17:13 ◆教育を売る論理「人間って学習リードタイムがあるじゃないですか。明日からトップセールス吸ってもいいじゃない」",
      "20:21 ◆強烈肯定「めちゃめちゃ聡明なご判断だと思います」（顧客の意思決定を肯定して、さらに本音を引き出す）",
      "22:50 ★比喩で腹落ち「先に仕組みを見せた方がいい。クリスマスケーキの断面図と同じ理論。透明性が購買意欲に直結する」",
      "26:11 ◆二項対立で煽る「成果が出る会社と普通の会社がある。普通の会社は業務減らそうとだけ考える、そこで売上は上がらない」",
      "33:21 ◆時間切れ演出「この時間内だと話つきなさそう、アイデアがバーッと出ちゃうんで」→ 自然に次回アポへ",
      "35:23 ◆研修商材の言語化「AIライズアップ、2日間研修＋3ヶ月個別フォロー＋プッシュ型コーチ＋eラーニング、定着率100%」",
      "35:46 ◆研修価値の一言「『分かる』を『できる』に変える」",
      "37:29 ◆主導権を保つ次回設計「次までに我々も議題をまとめておく」（顧客側に丸投げしない継続性）",
    ],
    accentColor: "from-sky-400 to-cyan-500",
  },
  {
    id: 2,
    url: "https://tldv.io/app/meetings/69cde9b7ddea5b00136010c0/",
    title: "初回商談：代理店候補 × フルデモ → 即決クロージングへの導線設計",
    tags: ["初回商談", "代理店候補", "フルデモ商談", "3要素フレーム", "中小企業特化", "値決めロジック", "希少性訴求", "即決クロージング"],
    highlight: [
      "AIの3要素フレーム「伝え方・段取り・基準」— プロンプトに頼る顧客に『AIは言語学習と一緒』と本質を一言で",
      "「これやらない理由あります？」投資回収論理での言い切り — 1年で1万円浮けばペイ、で価格議論を消す",
      "『二度とない最大ラダー』希少性訴求 — 代理店候補に『今しかない』を植え付けるFOMO設計",
      "デモ → 『怖いっす』→『これ送ります』の3段ステップ — 興味付けから即決まで一気通貫",
    ],
    watchPoints: [
      "00:39 ◆関係構築の小ネタ「『保留率爆伸び営業マン』を間違えて送っちゃったんですよ」（自己開示の失敗ネタで距離を縮める入り）",
      "06:47 ◆自社ポジショニング「どこよりも速攻性があって、どこよりも丁寧にやれたら、日本一絶対取れる」（差別化の言語化）",
      "10:24 ★AIの3要素フレーム「AIは言語学習と全く一緒。ちゃんとした伝え方・ちゃんとした段取り・明確な基準、この3つがあったらワークする」（AIの本質を一発で）",
      "11:24 ◆強い切り捨て「これ断る人はそもそもセンスがない、営業マンをクロージングしてる」（覚悟を見せる言い切り）",
      "11:36 ◆ターゲット切り取り「年商5億以下の中小企業95%、大企業はめんどくさいから扱わない、うちはどこよりも優しく実践的」",
      "13:42 ★哲学の一言「今日同じこと2回やらなかったら、仕事の生産性は勝手に上がる」（覚えやすい原理原則）",
      "17:08 ◆疑念の先回り否定「これ全部嘘情報一切ない、全部本当です」（AI出力への不信を一言で消す）",
      "21:56 ◆独自ポジションの意外性「オンラインに出さず、オフラインだけで紹介限定で売ってます。理由は隠れられるから」",
      "22:30 ★投資回収言い切り「1年で1人当たり1万円ずつ浮いたらペイできる研修なんですけど、これやらない理由あります？」（価格議論を消すマジックフレーズ）",
      "22:53 ◆スマート付加価値「社長は無料。雇用保険適用外だけど1人増えても料金一緒なので、社長一緒にどうぞ」（断りにくい設計）",
      "23:53 ◆代理店報酬のFOMO「1人当たり5-8万円、30名決まれば240万円。これは二度とない最大ラダー、大越さんとの最初の契約だから」（希少性で動機付け）",
      "27:43 ★破壊的デモの引き出し「マニュアル作成が2-5時間→1時間、1アクション2分、これ見せるだけで『怖いっす』を引き出す」（顧客の言葉を変える瞬間）",
      "28:11 ◆サンプル動画の段階提供「興味付けでは動画だけ、契約してもらったらプロンプト全部上げる」（試食→本契約の設計）",
      "33:07 ★即決クロージング鉄板「業界相場20%（1人6万円）かかるけど、3日以内に決めてもらえばうちで持つ＋eラーニング3ヶ月期限を無期限化」（複合特典での即決誘導）",
      "33:54 ◆数字でのダメ押し「決定率9割超えてます」（プロダクトの強さをファクトで補強）",
      "37:08 ◆引き合い構造「無料セミナー→『いいんですか？』→『うちでもやってくんない？』が発生する」（プッシュ営業をプル営業に変える流れ）",
    ],
    accentColor: "from-teal-400 to-emerald-500",
  },
  {
    id: 3,
    url: "https://tldv.io/app/meetings/69b7b8784ddb450012bb77f1/",
    title: "初回商談：保険代理店経営者 × 業務フルデモ → 補助金活用クロージング",
    tags: ["初回商談", "保険代理店", "業界遅れ攻略", "70%置換フレーム", "業務2軸判断", "業界特有課題対応", "補助金75%活用", "5名研修クロージング"],
    highlight: [
      "「営業活動の70%はAIに置き換えられる」明確な数字フレームで顧客の頭を一発で整理する",
      "AI化判断の2軸「ボリューム×面倒くさい / 付加価値あるけどできなかった」— 顧客が自社業務をその場でマッピングできる思考軸",
      "マニュアル作成の2原則「車輪の再開発するな・活動データ全て置いておけ」（覚えやすい原理原則）",
      "ジャイアントキリング戦略「大手はガバナンス制限でCopilotしか使えない、中小こそAI使い倒せる」（中小特化の覚悟を煽る）",
    ],
    watchPoints: [
      "03:12 ◆業界フック「金融代理店の文脈だとめちゃめちゃ結果出ます、600社規模ホルダーに導入して鬼のように結果出てる」（社会的証明を即時提示）",
      "05:47 ★70%置き換えフレーム「営業活動自体のAI置き換えで大体7割いけます」（数字で全体像を一発で）",
      "06:53 ◆速度の段階提示「商談後2分で議事録、30分でPDF＋動画送付、1時間商談を半分に、電話でも契約決まる」",
      "07:49 ◆フロー転換「2人体制（聞く側＋教える側）をAIで置き換え、分からない時だけ先輩に聞くフローへ」（人員削減を肯定的に語る）",
      "12:22 ◆比喩力「ChatGPTは脳と口だけ、自立稼働AIは脳・目・口・手付きで画面の向こうにドラえもんがいる状態」（抽象を具体化）",
      "13:15 ◆期待値の先回り調整「Manaは青天井リスクあり、1回の実行で7万かかる、ちゃんとした段取りが必須」（顧客の幻想を先に潰す誠実さ）",
      "15:19 ★AI化判断の2軸「ボリューム多くて面倒くさい業務 / 付加価値あるけどできなかった業務」（顧客が自社業務をマッピングする思考軸）",
      "16:14 ◆業界課題の即言語化「業法改正・意向確認・音声データ保管・労務×法律のチャットボット」（業界固有課題を一気に並べて専門性を証明）",
      "18:40 ★マニュアル原則「車輪の再開発するな・活動データ全て置いておけ、この2つが一番大事」（覚えやすい原理原則）",
      "22:25 ◆データ形式の段階提案「Notionが理想だが浸透しづらい、現場はGoogleドライブから段階的に、最終はテキスト/CSVが加工しやすい」（顧客レベルに合わせる）",
      "33:46 ◆設計改善の3回ルール「問い合わせが3回発生したら設計ミス、書き方が分かりにくい証拠、通った人から改善案を出させる」（仕組み改善の原則）",
      "39:40 ★ジャイアントキリング「大手はガバナンスでManaやJaspers使えない、Copilotしか使えない。中小こそ自立稼働エージェントで10倍100倍の生産性」",
      "57:13 ★複合クロージング「カクヤクAI＋ウリアゲAI、1人40万を補助金75%で10万、2日研修＋3ヶ月伴走、結果100%」（条件・期間・実績を一括提示）",
      "01:04:31 ◆価格議論を消す余談「ほっとくと法人税30%、補助金75%＋損金で実質コスト5%、儲かってたら投資するだけで得」",
      "01:05:37 ◆期限の引き出し「いつ頃ご意向いただけそうですか」→「話聞いてやから来週ぐらいまでに」（クロージング期限を自然に取る）",
    ],
    accentColor: "from-emerald-400 to-green-500",
  },
  {
    id: 4,
    url: "https://tldv.io/app/meetings/69b0d6cb40e96e00139d91b9/",
    title: "紹介経由の初回商談：社団法人立ち上げ × 教材自動化 × 期限切迫クロージング",
    tags: ["紹介経由初回", "3者商談（紹介者同席）", "教材自動化ニーズ", "AIラーニング比喩", "実質負担ゼロロジック", "期限切迫クロージング", "雇用保険要件相談", "紹介者活用設計"],
    highlight: [
      "紹介者同席型の3者商談 — 紹介者の援護射撃（『3人にしないと』『もったいない』）を活かして価格・条件の納得感を倍速で補強する設計",
      "競合差別化キラーフレーズ「特定ツールの使い方研修はもうNG、後発組でも余裕で抜くこの時代に」— 時代論で他社をフェードアウトさせる",
      "「実質負担ゼロ」財務ロジック — 経費計上＋助成金75%＋法人税30%節税で『むしろプラスになるケースも』、価格議論を消す",
      "期限切迫クロージング「3月20日まで」— 4月から補助率半減という外部要因で意思決定を一気に加速させる",
    ],
    watchPoints: [
      "08:53 ◆結論ファースト「パソコンとスマホでできることは全部できます。マジで全部できます」（顧客の頭を一気に開く一言）",
      "09:12 ★AI化2軸「ルーティンで辛いところを効率化 / 普通ではできない変態的な付加価値創造」（自社業務をその場でマッピングさせる思考軸）",
      "14:05 ◆DIY顧客の絶妙な釣り「学べばできるけど、使い方のところはサポート入る方が圧倒的にいい」（自学派を排除せず取り込む話法）",
      "15:32 ◆誠実な使い分け「Manaは自立稼働で範囲広いけどアホほど金かかる、目的に応じて取り分ける」（顧客への正直さで信頼補強）",
      "21:34 ★競合差別化「特定ツールの使い方ワット研修はもう全部NG。後発組でも余裕で抜くこの時代に、なぜAIを使うのか・サポート伴走までがベスト」",
      "23:38 ★キャッチコピー「AIのライザップみたいな感じです」（一発でブランドが伝わる短い言葉の力）",
      "23:55 ◆現場摩擦ゼロ「システム入れると人辞めるけど、AIは画面の向こうにドラえもんがいる感覚で摩擦ない」（特に福祉・労働集約業界の懸念に先回り）",
      "24:15 ◆独自リソース提示「クラウドワーカー月間1000件、採用単価1万円、後ろにAIエンジニア、プッシュ型で毎週フォロー」（他社差別化を数字で）",
      "26:30 ◆料金のプリエンプティブ宣言「料金まで言っちゃうとめっちゃ商標見くそ安いです」（先に強気で投下して価格抵抗を消す）",
      "27:25 ◆紹介経由の特典明示「岡さんのご紹介なので、僕に直接聞いてもらって大丈夫です」（紹介の価値を顧客にその場で実感させる）",
      "30:01 ◆雇用保険要件への寄り添い「業務委託で対象外なら、別法人での名義借りや既存法人での申請で実現できる方法を一緒に探る」（断られないための解決策提示）",
      "31:27 ★実質負担ゼロの財務ロジック「100万置いといたら法人税30%取られる、それを使うと75%帰ってくる、節税効果でむしろプラスになるケースも」",
      "35:35 ★期限切迫の自然な提示「eラーニング助成金は3月20日まで、4月から補助率半分になる。理由は不正業者の取り締まり」（外部要因で即決を誘導）",
      "40:09 ◆紹介者へのアーカイブ開放「興味ある人へのシェアに使ってOK」（紹介者を媒介に拡散させる設計）",
    ],
    accentColor: "from-indigo-400 to-blue-500",
  },
  {
    id: 5,
    url: "https://tldv.io/app/meetings/699fc53bfc507800135d2adb/",
    title: "60分商談：建築・キッチン製造業（紹介者同席）× 業務全領域フルデモ × 実質30万クロージング",
    tags: ["60分初回商談", "建築・製造業", "紹介者同席", "業務全領域デモ", "顧客制約の先確認", "誠実さで信頼", "標準化の代弁力", "控えめシミュレーション"],
    highlight: [
      "「フォーマットこだわってます？」「最大何明細？」と顧客の制約条件をその場で確定するヒアリング型",
      "「全部できる」と言いつつ「図面は難しい」と認める誠実さで信頼を倍速で獲得する話法",
      "「中小企業の最大経営課題は標準化、『あの人が辞めたら困る』が一番経営的」— 顧客の本質をその場で言語化する代弁力",
      "「月60時間浮く×半分でも年100万円効果」+「実質30万」の控えめシミュレーションで投資判断を後押しする論理",
    ],
    watchPoints: [
      "00:10 ◆冒頭の構造化「課題感→優先順位→AIでどこまで楽になるか、ハテナを解消する時間にする」（60分の使い方を最初に宣言）",
      "01:11 ◆強い肯定の第一声「AIあんまり使ってないと聞いて『鬼のように改善します』」（顧客の遅れを否定せず逆に煽る）",
      "03:30 ★誠実な線引き「図面全部は先に言ってるのが難しい、最終仕上げは人間の手が必要」（できないことを正直に言うことで信頼獲得）",
      "05:35 ◆既存ソフト連携の現実的切り分け「見積りソフトの中まで入るのは難しい、新規別管理か概要決定からの作成か」（顧客の既存資産を否定しない）",
      "06:49 ★顧客制約の先確認「フォーマットめちゃくちゃこだわってます？」「最大で7-80明細」「ペーパー分けて2-3枚で大丈夫」（条件をその場で確定し提案を絞る）",
      "11:01 ◆外注費削減の論理「コンサル30-100万を、戦略はAIで自社内で、壁打ちだけ依頼で外注費1/3に」（顧客が即真似できる節約フレーム）",
      "14:54 ★ターゲット文章の生成デモ「『キッチンは設備ではなく住まいの思想を映す場所』富裕層向け文章をAIが一瞬で」（具体物で『これ欲しい』を引き出す）",
      "16:37 ◆画像合成のリアリティ「家具ない部屋に家具を合成、緑のパーカーを虎柄ファーに変える」（極端な比喩でAIの守備範囲を一発理解）",
      "18:33 ★職人技標準化の決定打「動画撮るだけで矢印付き手順書、編集なしで完了、旅館60年分のマニュアルが3ヶ月で電子化」",
      "23:23 ★顧客の本質代弁「中小企業の最大経営課題は標準化、『あの人が辞めたら困る』が一番経営的、現場の摩擦ゼロでなくすのが最初にやるべきこと」",
      "27:00 ◆手厚さ日本一の差別化「専任担当が個別対応、クラウドワーカー月1000件の採用力、大手は面倒だからやらない」",
      "30:54 ◆損金スキーム余談「決算ギリギリだと75%返って手元に現金残る、謎の損金スキーム」（追加メリットの暴露で価値を膨らませる）",
      "33:22 ★期限切迫＋背景説明「eラーニング助成金は3月まで、4月から補助率半分。理由はボタン押すだけで助成金回す業者の取り締まり」（外部要因と論理性で即決誘導）",
      "39:31 ★控えめシミュレーション「月60時間浮く×半分でも年100万円効果。甘めシミュレーションでも、これ業務だけで」（保守的な数字で投資判断を後押し）",
      "43:13 ◆顧客理解レベル合わせ「結局AIはLINEの向こうにいるすごいドラえもん、A/B/Cさんに頼んで返答いいAさんと喋ろっかなみたいな」（最後の腹落ち比喩）",
    ],
    accentColor: "from-violet-400 to-purple-500",
  },
  {
    id: 6,
    url: "https://tldv.io/app/meetings/69c60ec93290d5001359ca74/",
    title: "60分商談：複数事業経営者（紹介経由）× フルデモ × 経営者本人受講＋営業3名拡大",
    tags: ["60分初回商談", "紹介経由", "複数事業経営者", "経営者本人受講", "コールセンター事業改善", "営業3名拡大計画", "中小特化インサイト", "補助金最新情報"],
    highlight: [
      "AIに『言うこと聞いとけ』と言える — 上司の指示は角が立つが、AIは指示として通る、属人化を脱する設計の核",
      "経営者本人が『1人で3コマ』担う受講設計 — 雇用保険2人体制でも今のeラーニングなら成立する裏ワザ",
      "ダブルバインド提案を即生成「日本金融か海外金融か」 — 選択肢を与えて断る選択肢を消す話法",
      "「100億超えるとガバナンスでAI入れにくい」中小特化のインサイト — 大手の弱点を経営者目線で言語化",
    ],
    watchPoints: [
      "01:31 ◆顧客興味の修正「営業特化AIと聞いて来た顧客に『実は業務改善が一番売れてる、業務改善はみんなやってる、売上特化はうち』と差別化」（期待を上方修正）",
      "04:19 ★営業教育の現場心理「上司がああだこうだ言うと角が立つけど、『AIがこう言ってんねん、言うこと聞いとけ』なら通る」（属人化を脱する設計の核）",
      "08:01 ◆段階拡大の発想「一気に3人じゃなく、1人増やして育てて、その下に営業マン、AIで鍛え上げたら2人目を複製」（経営者目線の堅実プラン）",
      "08:33 ◆誠実な線引き「悪いところだけ言うと、人は人でしか磨かれない、最終そこは絶対必要」（AIの限界を認めて信頼獲得）",
      "09:34 ★ダブルバインド提案「日本金融はこう、海外金融のドミニオンはこう、と2案を即生成、人間に異論があるなら言ってください」（選択肢を与え断る選択肢を消す）",
      "16:24 ★人物名→情報自動収集デモ「会社名と名前だけ入れたらインスタまで取得、リアルタイムで顧客本人の情報を出して驚かせる」（即効性の演出）",
      "17:33 ◆共感ポイント拾い上げ「顧客のモットーをAI出力から拾い上げて『僕も好きです』」（個別最適化の即時性）",
      "18:13 ◆AI研修の弱点開示→自社の強み「結果出にくい・すぐ結果出ない・ツール乗せ替えに時間・定着しない、だからうちは伴奏する『ライズアップ』」",
      "19:31 ★商談即時提案フロー「商談直後8割提案書→『晴れ曇り雨どれですか』→晴れなら即決、次商談不要、1時間を半分の交渉だけに」（決定率90%超のロジック）",
      "23:42 ◆経営者本人受講設計「経営者は受けられない、従業員受講で横で聞く、eラーニング今ならOK」（顧客の制約をその場で解決）",
      "35:02 ★AI定着の定義「グーグル検索と同レベルで使ってる状態、シフトAI等の他社は失敗、うちは定着率100%」（成果定義の明確化）",
      "36:43 ◆AI＝人間哲学「AIは人間と一緒、語学学習と一緒、文法直しながら習慣化していくだけ」（シンプルで覚えやすい比喩）",
      "38:32 ★リスキリング1人3コマ裏ワザ「雇用保険2人体制でも、1人に3コマ担いで受講可能。eラーニングで今だけまかり通る」（顧客の制約を逆手に取る）",
      "52:33 ★中小特化インサイト「100億超えるとガバナンスでAI入れにくくなる、中小こそ自立稼働エージェントで使い倒せる」（経営者目線の差別化）",
      "54:34 ◆補助金最新情報＋誠実な警告「AI推進・IT補助金（旧IT導入補助金）に名称変更、補助率最大40%低下、キャッシュバック詐欺は国税がAIで一発検知するからNG」",
    ],
    accentColor: "from-fuchsia-400 to-pink-500",
  },
]

export function RoleplaySection() {
  const [openPractice, setOpenPractice] = useState(false)
  const [openReference, setOpenReference] = useState(false)
  const [openLogIds, setOpenLogIds] = useState<Set<number>>(new Set())

  const toggleLog = (id: number) => {
    setOpenLogIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-4">

      {/* ===== TEST CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            クローザーAIX事業理解度テスト
          </CardTitle>
          <p className="text-[10px] text-slate-500 mt-1">
            まずはAIX事業への理解度を確認しましょう
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-3">

          {/* Grading criteria */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Trophy className="w-3 h-3 text-amber-500" />
              <p className="text-[10px] font-bold text-slate-600">合格基準（B判定以上が合格最低ライン）</p>
            </div>
            <div className="space-y-1.5">
              {gradeCriteria.map((c) => (
                <div
                  key={c.grade}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border ${c.bgColor} ${c.borderColor}`}
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <span className="text-white text-sm font-black">{c.grade}</span>
                  </div>
                  <p className={`text-[11px] font-bold ${c.textColor} leading-snug`}>{c.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action */}
          <a
            href="https://chatgpt.com/g/g-69c6226d43688191a039a4b6e1427f17-aixzong-he-li-jie-du-tesutoai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
          >
            <GraduationCap className="w-4 h-4" />
            理解度テストを受ける
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* === POST-TEST SHARING FLOW === */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-green-400 rounded-full" />
              テスト終了後の共有フロー
            </p>

            {/* STEP 1 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[11px] font-black">1</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs font-bold text-slate-800 leading-snug flex items-center gap-1.5">
                  <Camera className="w-3 h-3 text-slate-500" />
                  テスト結果のスクリーンショットを撮る
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  判定（S/A/B）とフィードバックが見える形でキャプチャ
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[11px] font-black">2</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs font-bold text-slate-800 leading-snug flex items-center gap-1.5">
                  <MessageCircle className="w-3 h-3 text-slate-500" />
                  公式LINEに共有する
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  下のボタンからトークを開き、スクショを送信してください
                </p>
              </div>
            </div>
          </div>

          {/* LINE share button */}
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            公式LINEで結果を共有する
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
          <p className="text-[10px] text-slate-400 text-center">
            ※ 公式LINEのURLは後日設定されます
          </p>
        </CardContent>
      </Card>

      {/* ===== PRACTICE SECTION (header + cards together) ===== */}
      <div
        className={
          openPractice
            ? "rounded-2xl border-2 border-purple-300 bg-purple-50/40 shadow-md overflow-hidden"
            : ""
        }
      >
        <button
          onClick={() => setOpenPractice((v) => !v)}
          aria-expanded={openPractice}
          className={
            openPractice
              ? "w-full flex items-center justify-between gap-2 px-3 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white transition-colors"
              : "w-full flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
          }
        >
          <div className="flex items-center gap-2 min-w-0">
            <Dumbbell className={`w-4 h-4 flex-shrink-0 ${openPractice ? "text-white" : "text-slate-700"}`} />
            <div className="text-left min-w-0">
              <p className={`text-xs font-black uppercase tracking-wider leading-tight ${openPractice ? "text-white" : "text-slate-700"}`}>
                ロープレ練習 (Lv.1 〜 Lv.5)
              </p>
              <p className={`text-[10px] mt-0.5 leading-tight ${openPractice ? "text-purple-100" : "text-slate-500"}`}>
                段階的に難易度を上げて実戦力を鍛えましょう
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${openPractice ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"}`}>
              {roleplayLevels.length}件
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${openPractice ? "rotate-180 text-white" : "text-slate-500"}`}
            />
          </div>
        </button>

        {/* ===== ROLEPLAY CARDS (only when open) ===== */}
        {openPractice && (
          <div className="p-3 space-y-3">
            {roleplayLevels.map((rp) => (
        <Card key={rp.lv} className="border-slate-200 shadow-sm bg-white overflow-hidden">
          <div className={`h-1 bg-gradient-to-r ${rp.accentColor}`} />
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br ${rp.accentColor} text-white text-[11px] font-black shadow-sm`}>
                  Lv.{rp.lv}
                </span>
                <span className="leading-tight">{rp.title}</span>
              </CardTitle>
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${rp.difficultyColor}`}>
                {rp.difficulty === "超高" && <Flame className="w-2.5 h-2.5" />}
                難易度: {rp.difficulty}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 pb-4 space-y-3">
            <p className="text-[11px] text-slate-600 leading-relaxed">{rp.description}</p>
            <a
              href={rp.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r ${rp.accentColor} text-white text-xs font-bold shadow-sm hover:shadow-md transition-all`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              Lv.{rp.lv} ロープレを開始
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </CardContent>
        </Card>
            ))}
          </div>
        )}
      </div>

      {/* ===== REFERENCE LOGS SECTION (header + cards together) ===== */}
      <div
        className={
          openReference
            ? "rounded-2xl border-2 border-sky-300 bg-sky-50/40 shadow-md overflow-hidden"
            : ""
        }
      >
        <button
          onClick={() => setOpenReference((v) => !v)}
          aria-expanded={openReference}
          className={
            openReference
              ? "w-full flex items-center justify-between gap-2 px-3 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white transition-colors"
              : "w-full flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors mt-1"
          }
        >
          <div className="flex items-center gap-2 min-w-0">
            <PlayCircle className={`w-4 h-4 flex-shrink-0 ${openReference ? "text-white" : "text-slate-700"}`} />
            <div className="text-left min-w-0">
              <p className={`text-xs font-black uppercase tracking-wider leading-tight ${openReference ? "text-white" : "text-slate-700"}`}>
                参考商談ログ（ウツセバ代表 佐藤）
              </p>
              <p className={`text-[10px] mt-0.5 leading-tight ${openReference ? "text-sky-100" : "text-slate-500"}`}>
                実商談の生ログ。気になるテーマから見て学びましょう
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${openReference ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"}`}>
              {referenceLogs.length}件
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${openReference ? "rotate-180 text-white" : "text-slate-500"}`}
            />
          </div>
        </button>

        {/* ===== REFERENCE LOG CARDS ===== */}
        {openReference && (
          <div className="p-3 space-y-3">
            {referenceLogs.map((log) => {
        const isOpen = openLogIds.has(log.id)
        return (
          <Card key={log.id} className="border-slate-200 shadow-sm bg-white overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${log.accentColor}`} />

            {/* ===== クリック可能なヘッダー（常時表示）===== */}
            <button
              onClick={() => toggleLog(log.id)}
              aria-expanded={isOpen}
              className="w-full text-left hover:bg-slate-50 transition-colors"
            >
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-bold text-slate-800 flex items-start gap-2 min-w-0 flex-1">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br ${log.accentColor} text-white text-[11px] font-black shadow-sm flex-shrink-0 mt-0.5`}>
                      #{log.id}
                    </span>
                    <span className="leading-snug">{log.title}</span>
                  </CardTitle>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 mt-1.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {/* タグ */}
                {log.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {log.tags.map((t, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200"
                      >
                        <Tag className="w-2 h-2" />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {/* 件数サマリ（クローズ時のヒント）*/}
                <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    推しポイント {log.highlight.length}件
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="w-3 h-3 text-sky-500" />
                    タイムスタンプ {log.watchPoints.length}件
                  </span>
                </div>
              </CardHeader>
            </button>

            {/* ===== 展開時のみ表示 ===== */}
            {isOpen && (
              <CardContent className="pt-0 pb-4 space-y-2.5">
                {/* 推しポイント */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                  <p className="text-[10px] font-bold text-amber-700 flex items-center gap-1 mb-1.5">
                    <Sparkles className="w-3 h-3" />
                    推しポイント
                  </p>
                  <ul className="space-y-1">
                    {log.highlight.map((h, i) => (
                      <li key={i} className="text-[11px] text-slate-700 leading-relaxed flex gap-1.5">
                        <span className="text-amber-500 flex-shrink-0">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 見るべき箇所 */}
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-2.5">
                  <p className="text-[10px] font-bold text-sky-700 flex items-center gap-1 mb-1.5">
                    <Eye className="w-3 h-3" />
                    見るべき箇所（タイムスタンプ）
                  </p>
                  <ul className="space-y-1">
                    {log.watchPoints.map((w, i) => (
                      <li key={i} className="text-[11px] text-slate-700 leading-relaxed flex gap-1.5">
                        <span className="text-sky-500 flex-shrink-0">▸</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 動画埋め込み用プレースホルダ（将来 iframe 等に差し替え） */}
                {/*
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                    <iframe src="..." className="w-full h-full" allow="autoplay; fullscreen" />
                  </div>
                */}

                {/* リンクボタン */}
                <a
                  href={log.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r ${log.accentColor} text-white text-xs font-bold shadow-sm hover:shadow-md transition-all`}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  商談ログを開く
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </CardContent>
            )}
          </Card>
            )
          })}
          </div>
        )}
      </div>

    </div>
  )
}
