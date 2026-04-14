"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RotateCcw, Calendar, Mail, ClipboardList, ArrowRight, Flame } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

const checklistCategories = [
  {
    title: "基本記録",
    icon: ClipboardList,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    items: [
      { id: "industry", label: "業種・従業員規模", input: true, placeholder: "例：建設業・30名" },
      { id: "decision", label: "決裁者かどうか確認した", input: false },
      { id: "issues", label: "主な課題（3つ以内）を記録した", input: true, placeholder: "例：属人化、事務作業過多" },
      { id: "literacy", label: "ITリテラシー感（高/中/低）を把握した", input: false },
      { id: "product", label: "提案サービスを記録した", input: false },
      { id: "objections", label: "出た反論・懸念を記録した", input: true, placeholder: "例：費用感、稟議が必要" },
    ],
  },
  {
    title: "温度感",
    icon: Flame,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    items: [
      { id: "heat-high", label: "◎ 即決 / 前向き", input: false },
      { id: "heat-mid", label: "△ 検討中（フォロー必要）", input: false },
      { id: "heat-low", label: "× 今回はなし", input: false },
    ],
  },
  {
    title: "次のアクション",
    icon: ArrowRight,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    items: [
      { id: "next-action", label: "合意した次のアクションを記録した", input: true, placeholder: "例：来週木曜 詳細プランを確認" },
      { id: "thank-you", label: "お礼LINE/メール送信（30分以内）", input: false },
      { id: "minutes", label: "議事録・提案要点まとめを送った", input: false },
    ],
  },
]

const thankYouTemplate = `本日はお時間をいただきありがとうございました。
おっしゃっていた○○の課題について、
参考になりそうな事例資料をお送りします。
引き続きよろしくお願いいたします。`

export function PostMeetingSection() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [nextDate, setNextDate] = useState("")
  const [nextNote, setNextNote] = useState("")

  const toggleCheck = (id: string, val: boolean) =>
    setChecked((p) => ({ ...p, [id]: val }))

  const setInput = (id: string, val: string) =>
    setInputs((p) => ({ ...p, [id]: val }))

  const resetAll = () => {
    setChecked({})
    setInputs({})
    setNextDate("")
    setNextNote("")
  }

  const totalItems = checklistCategories.reduce((a, c) => a + c.items.length, 0)
  const doneCount = Object.values(checked).filter(Boolean).length
  const progress = (doneCount / totalItems) * 100

  return (
    <div className="space-y-4">

      {/* ===== PROGRESS ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700">チェックリスト進捗</span>
          <span className="text-xs font-black text-green-600">{doneCount} / {totalItems}</span>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        {doneCount === totalItems && (
          <p className="text-[10px] text-green-600 font-bold mt-2 text-center">
            完了！次の商談の準備ができています 🎯
          </p>
        )}
      </div>

      {/* ===== CHECKLIST CATEGORIES ===== */}
      {checklistCategories.map((cat, ci) => {
        const Icon = cat.icon
        return (
          <div key={ci} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className={`flex items-center gap-2.5 px-4 py-3 border-b border-slate-100`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${cat.iconBg}`}>
                <Icon className={`w-3.5 h-3.5 ${cat.iconColor}`} />
              </div>
              <h3 className="text-sm font-bold text-slate-800">{cat.title}</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {cat.items.map((item) => (
                <div key={item.id}>
                  <label className={`flex items-center gap-3 px-4 min-h-[48px] cursor-pointer transition-colors ${
                    checked[item.id] ? "bg-green-50/50" : "hover:bg-slate-50"
                  }`}>
                    <Checkbox
                      checked={checked[item.id] || false}
                      onCheckedChange={(v) => toggleCheck(item.id, v as boolean)}
                      className="border-slate-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 flex-shrink-0"
                    />
                    <span className={`text-sm py-3 flex-1 leading-snug ${
                      checked[item.id] ? "line-through text-slate-400" : "text-slate-700"
                    }`}>
                      {item.label}
                    </span>
                  </label>
                  {"input" in item && item.input && checked[item.id] && (
                    <div className="px-4 pb-3">
                      <Input
                        placeholder={item.placeholder || "メモを入力..."}
                        value={inputs[item.id] || ""}
                        onChange={(e) => setInput(item.id, e.target.value)}
                        className="h-9 text-xs border-slate-200 bg-slate-50 ml-7"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* ===== NEXT ACTION DATE ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">次のアクション詳細</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-slate-600 font-bold">期日</Label>
            <Input
              type="date"
              value={nextDate}
              onChange={(e) => setNextDate(e.target.value)}
              className="h-11 border-slate-200 bg-slate-50 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-slate-600 font-bold">アクション内容</Label>
            <Textarea
              placeholder="次回のアクション内容を入力..."
              value={nextNote}
              onChange={(e) => setNextNote(e.target.value)}
              rows={3}
              className="border-slate-200 bg-slate-50 text-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* ===== THANK YOU TEMPLATE ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center">
              <Mail className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">お礼メッセージテンプレート</h3>
          </div>
          <CopyButton text={thankYouTemplate} />
        </div>
        <div className="m-4 border-l-4 border-slate-300 pl-4">
          <p className="text-xs text-slate-600 leading-relaxed font-mono whitespace-pre-wrap">{thankYouTemplate}</p>
        </div>
      </div>

      {/* ===== RESET BUTTON ===== */}
      <button
        onClick={resetAll}
        className="w-full flex items-center justify-center gap-2 min-h-[48px] rounded-xl border-2 border-dashed border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        次の商談のためにリセット
      </button>

    </div>
  )
}
