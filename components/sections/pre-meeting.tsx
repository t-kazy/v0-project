"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RotateCcw, Zap, Shield, Brain, PlayCircle, Sparkles, ExternalLink, FileText, Link2, Layers, Banknote, ArrowRight } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

const SUBSIDY_FORM_SHORT_URL = "https://forms.gle/ozXzF9WmQjigiGa57"
const SUBSIDY_GROUP_NAME_TEMPLATE = "【AIX研修】株式会社〇〇様"

const checklistItems = [
  { text: "業種・会社規模を確認した", key: "industry" },
  { text: "担当者種別（代表 / 責任者 / 担当者）を確認した", key: "person" },
  { text: "紹介者から聞いた課題のヒントを確認した", key: "hint" },
  { text: "今日の提案軸（ウリアゲ or カクヤク）の仮説を立てた", key: "product" },
  { text: "AIツールの現状利用有無を想定した", key: "ai" },
  { text: "ITリテラシー感（高・中・低）の仮説を立てた", key: "literacy" },
  { text: "次のアクション候補を3つ頭に入れた", key: "action" },
]

const mindsetQuotes = [
  { text: "「売るな、課題を解決せよ」", sub: "キーエンス流" },
  { text: "「相手が話す時間を7割にする」", sub: "ヒアリング原則" },
  { text: "「次のアクションを決めずに終わらない」", sub: "クロージング鉄則" },
]

const uriageKeywords = ["「営業が足りない」", "「売上が上がらない」", "「若手が育たない」"]
const kakuyakuKeywords = ["「DXが定着しなかった」", "「全社員に…」", "「ITリテラシーがバラバラ」"]

interface PreMeetingSectionProps {
  onNavigate?: (tabId: number) => void
}

export function PreMeetingSection({ onNavigate }: PreMeetingSectionProps = {}) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(checklistItems.length).fill(false)
  )
  const [selectedProduct, setSelectedProduct] = useState<"uriage" | "kakuyaku" | null>(null)
  const [proposalMode, setProposalMode] = useState<"log" | "url" | "both" | null>(null)

  const handleCheckChange = (index: number, checked: boolean) => {
    const next = [...checkedItems]
    next[index] = checked
    setCheckedItems(next)
  }

  const resetChecklist = () => {
    setCheckedItems(new Array(checklistItems.length).fill(false))
    setSelectedProduct(null)
  }

  const completedCount = checkedItems.filter(Boolean).length
  const progress = (completedCount / checklistItems.length) * 100
  const isReady = completedCount === checklistItems.length

  return (
    <div className="space-y-4">

      {/* ===== VIDEO MANUAL CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
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

      {/* ===== CUSTOMER-FACING PRE-MEETING VIDEO CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
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

      {/* ===== SERVICE DECK CARD (Canva) ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
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


      {/* ===== GENSPARK AGENT CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            提案書作成カスタムエージェント (Genspark)
          </CardTitle>
          <p className="text-[10px] text-slate-500 mt-1">
            商談内容をもとに提案書をAIで自動生成します
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-3">
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

          {/* Action */}
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
        </CardContent>
      </Card>

      {/* ===== SUBSIDY PRE-PREP CARD (conditional) ===== */}
      <Card className="border-amber-200 shadow-sm bg-amber-50/40 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Banknote className="w-4 h-4 text-amber-600" />
              助成金案件の事前準備
            </CardTitle>
            <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200 flex-shrink-0">
              該当時のみ
            </span>
          </div>
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
              onClick={() => onNavigate(8)}
              className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-white border border-amber-300 text-amber-700 text-[11px] font-bold hover:bg-amber-50 transition-colors"
            >
              詳細な対応フローを「助成金申請フォーム」タブで見る
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </CardContent>
      </Card>

      {/* ===== CHECKLIST CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-700" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-bold text-slate-800">商談前チェックリスト</CardTitle>
            {isReady && (
              <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                準備OK!
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={resetChecklist} className="gap-1 text-slate-500 h-7 text-xs">
            <RotateCcw className="w-3 h-3" />
            リセット
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span>進捗</span>
              <span className="font-bold text-blue-600">{completedCount} / {checklistItems.length}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-1">
            {checklistItems.map((item, index) => (
              <label
                key={item.key}
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                  checkedItems[index]
                    ? "bg-blue-50 border border-blue-100"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <Checkbox
                  checked={checkedItems[index]}
                  onCheckedChange={(checked) => handleCheckChange(index, checked as boolean)}
                  className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <span className={`text-sm transition-colors ${
                  checkedItems[index] ? "line-through text-slate-400" : "text-slate-700"
                }`}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ===== PRODUCT SELECTOR ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-orange-400 via-red-400 to-blue-600" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800">今日の提案軸を決める</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {/* ウリアゲAIX */}
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

            {/* カクヤクAIX */}
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

          {/* Keyword hints appear after selection */}
          {selectedProduct === "uriage" && (
            <div className="mt-3 p-3 bg-orange-50 border border-orange-100 rounded-lg">
              <p className="text-[10px] font-bold text-orange-600 mb-1.5">キーワードヒント</p>
              <div className="flex flex-wrap gap-1.5">
                {uriageKeywords.map((kw, i) => (
                  <span key={i} className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{kw}</span>
                ))}
              </div>
            </div>
          )}
          {selectedProduct === "kakuyaku" && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-[10px] font-bold text-blue-600 mb-1.5">キーワードヒント</p>
              <div className="flex flex-wrap gap-1.5">
                {kakuyakuKeywords.map((kw, i) => (
                  <span key={i} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{kw}</span>
                ))}
              </div>
            </div>
          )}
          {!selectedProduct && (
            <p className="text-[10px] text-slate-400 text-center mt-3">選択するとキーワードヒントが表示されます</p>
          )}
        </CardContent>
      </Card>

      {/* ===== MINDSET CARD with MASCOT ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-slate-600 to-blue-700" />
        <CardHeader className="pb-1 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-600" />
            マインドセット確認
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-2">
              {mindsetQuotes.map((quote, index) => (
                <div
                  key={index}
                  className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg"
                >
                  <p className="text-xs font-bold text-slate-800 leading-snug">{quote.text}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{quote.sub}</p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
