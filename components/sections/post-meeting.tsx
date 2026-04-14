"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RotateCcw, Calendar, Mail } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

const checklistCategories = [
  {
    title: "商談内容の記録",
    items: [
      { id: "customer-needs", label: "顧客のニーズを記録した", input: true },
      { id: "objections", label: "出た反論と対応を記録した", input: true },
      { id: "decision-maker", label: "決裁者情報を確認した", input: true },
      { id: "budget", label: "予算感を確認した", input: true },
    ],
  },
  {
    title: "次回アクション",
    items: [
      { id: "next-meeting", label: "次回商談日程を確認した", input: false },
      { id: "proposal", label: "提案書の送付予定を伝えた", input: false },
      { id: "trial", label: "トライアル/デモの予定を設定した", input: false },
      { id: "contact-info", label: "担当者の連絡先を確認した", input: false },
    ],
  },
  {
    title: "社内共有",
    items: [
      { id: "crm-update", label: "CRM/SFAに情報を入力した", input: false },
      { id: "manager-report", label: "上長に報告した", input: false },
      { id: "team-share", label: "チームに共有した", input: false },
    ],
  },
]

const thankYouTemplate = `〇〇様

本日は貴重なお時間をいただき、誠にありがとうございました。

商談でお話しした内容を改めて整理いたしました。

【本日のポイント】
・御社の課題：〇〇
・ご提案したソリューション：〇〇
・期待される効果：〇〇

【次のステップ】
・〇〇（日程：〇月〇日）

ご不明点がございましたら、お気軽にお問い合わせください。
引き続きどうぞよろしくお願いいたします。

〇〇株式会社
〇〇`

export function PostMeetingSection() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [inputValues, setInputValues] = useState<Record<string, string>>({})
  const [nextActionDate, setNextActionDate] = useState("")
  const [nextActionNote, setNextActionNote] = useState("")

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }))
  }

  const handleInputChange = (id: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [id]: value }))
  }

  const resetAll = () => {
    setCheckedItems({})
    setInputValues({})
    setNextActionDate("")
    setNextActionNote("")
  }

  const totalItems = checklistCategories.reduce(
    (acc, category) => acc + category.items.length,
    0
  )
  const completedItems = Object.values(checkedItems).filter(Boolean).length

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card className="bg-secondary/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">チェックリスト進捗</span>
            <span className="text-sm font-medium">{completedItems} / {totalItems}</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${(completedItems / totalItems) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Checklist Sections */}
      {checklistCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{category.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {category.items.map((item) => (
              <div key={item.id} className="space-y-2">
                <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                  <Checkbox
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={(checked) => handleCheckChange(item.id, checked as boolean)}
                  />
                  <span className={checkedItems[item.id] ? "line-through text-muted-foreground" : ""}>
                    {item.label}
                  </span>
                </label>
                {item.input && checkedItems[item.id] && (
                  <Input
                    placeholder="メモを入力..."
                    value={inputValues[item.id] || ""}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    className="ml-9"
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Next Action */}
      <Card className="border-primary/30">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">次回アクション</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="next-date">予定日</Label>
            <Input
              id="next-date"
              type="date"
              value={nextActionDate}
              onChange={(e) => setNextActionDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="next-note">アクション内容</Label>
            <Textarea
              id="next-note"
              placeholder="次回のアクション内容を入力..."
              value={nextActionNote}
              onChange={(e) => setNextActionNote(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Thank You Template */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <CardTitle className="text-base">お礼メールテンプレート</CardTitle>
            </div>
            <CopyButton text={thankYouTemplate} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-secondary rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-[300px] overflow-y-auto">
            {thankYouTemplate}
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
        onClick={resetAll}
      >
        <RotateCcw className="w-4 h-4" />
        次の商談のためにリセット
      </Button>
    </div>
  )
}
