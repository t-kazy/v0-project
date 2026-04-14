"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RotateCcw, Zap, Shield, Brain } from "lucide-react"
import { Mascot } from "@/components/mascot"

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

export function PreMeetingSection() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(checklistItems.length).fill(false)
  )
  const [selectedProduct, setSelectedProduct] = useState<"uriage" | "kakuyaku" | null>(null)

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
          <div className="flex gap-3">
            {/* Mascot */}
            <div className="flex-shrink-0 flex items-end">
              <Mascot size="md" variant="default" />
            </div>
            {/* Quotes */}
            <div className="flex-1 space-y-2">
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
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
