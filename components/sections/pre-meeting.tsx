"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Quote } from "lucide-react"

const checklistItems = [
  "資料の確認（最新版か）",
  "顧客情報の事前リサーチ",
  "競合情報の把握",
  "デモ環境の動作確認",
  "想定質問への回答準備",
  "価格表・見積書の用意",
  "次回アクションの候補を準備",
]

const mindsetQuotes = [
  "「売る」ではなく「解決する」",
  "相手の成功が、自分の成功",
  "No は質問への招待状",
]

const uriageKeywords = [
  "「営業が足りない」",
  "「売上が上がらない」",
  "「若手が育たない」",
]

const kakuyakuKeywords = [
  "「DXが定着しなかった」",
  "「全社員に浸透させたい」",
  "「ITリテラシーがバラバラ」",
]

export function PreMeetingSection() {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(checklistItems.length).fill(false)
  )
  const [selectedProduct, setSelectedProduct] = useState<"uriage" | "kakuyaku" | null>(null)

  const handleCheckChange = (index: number, checked: boolean) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = checked
    setCheckedItems(newCheckedItems)
  }

  const resetChecklist = () => {
    setCheckedItems(new Array(checklistItems.length).fill(false))
  }

  const completedCount = checkedItems.filter(Boolean).length

  return (
    <div className="space-y-4">
      {/* Checklist Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base">商談前チェックリスト</CardTitle>
          <Button variant="ghost" size="sm" onClick={resetChecklist} className="gap-1">
            <RotateCcw className="w-4 h-4" />
            リセット
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>進捗</span>
              <span>{completedCount} / {checklistItems.length}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="space-y-3">
            {checklistItems.map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={checkedItems[index]}
                  onCheckedChange={(checked) => handleCheckChange(index, checked as boolean)}
                />
                <span className={checkedItems[index] ? "line-through text-muted-foreground" : ""}>
                  {item}
                </span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Selector */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">対象製品の選択</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={selectedProduct === "uriage" ? "default" : "outline"}
              onClick={() => setSelectedProduct("uriage")}
              className="flex-1"
            >
              ウリアゲAIX
            </Button>
            <Button
              variant={selectedProduct === "kakuyaku" ? "default" : "outline"}
              onClick={() => setSelectedProduct("kakuyaku")}
              className="flex-1"
            >
              カクヤクAIX
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Keyword Hints */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">キーワードヒント</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                ウリアゲAIX
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {uriageKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-sm py-1">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                カクヤクAIX
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {kakuyakuKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-sm py-1">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mindset Quotes */}
      <Card className="bg-primary/10 border-primary/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Quote className="w-4 h-4 text-primary" />
            マインドセット
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mindsetQuotes.map((quote, index) => (
              <div
                key={index}
                className="p-3 bg-card rounded-lg border border-border"
              >
                <p className="text-lg font-medium text-center text-foreground">{quote}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
