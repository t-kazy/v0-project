"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

const closingSteps = [
  {
    id: 1,
    title: "現状把握",
    purpose: "お客様の現在の状況を正確に理解する",
    script: `「まず、御社の現在の状況についてお聞かせください。
現在の営業チームは何名体制でしょうか？
月間の商談数と成約率はどのくらいですか？
現在、営業活動で一番の課題は何だとお感じですか？」`,
    confirmations: [
      { item: "チーム人数", check: "〇〇名" },
      { item: "月間商談数", check: "〇〇件" },
      { item: "現状の成約率", check: "〇〇%" },
    ],
  },
  {
    id: 2,
    title: "課題深掘り",
    purpose: "表面的な課題から本質的な問題を特定する",
    script: `「その課題について、もう少し詳しくお聞かせください。
その問題は、いつ頃から感じていらっしゃいますか？
これまでに何か対策は取られましたか？
その対策がうまくいかなかった原因は何だとお考えですか？」`,
    confirmations: [
      { item: "課題の発生時期", check: "〇〇年〇月頃" },
      { item: "過去の対策", check: "〇〇を実施" },
      { item: "失敗要因", check: "〇〇が原因" },
    ],
  },
  {
    id: 3,
    title: "影響の言語化",
    purpose: "課題が及ぼす影響を具体的に認識させる",
    script: `「この課題を放置した場合、どのような影響があると思われますか？
売上への影響はどのくらいでしょうか？
チームのモチベーションへの影響は？
競合との差は広がりそうですか？」`,
    confirmations: [
      { item: "売上への影響", check: "年間〇〇万円の損失" },
      { item: "チームへの影響", check: "離職リスク〇〇%" },
      { item: "競合との差", check: "〇〇で劣位" },
    ],
  },
  {
    id: 4,
    title: "理想状態",
    purpose: "解決後の理想的な状態をイメージさせる",
    script: `「理想的な状態とは、どのようなものでしょうか？
成約率はどのくらいまで上げたいですか？
営業チームにはどのような変化を期待しますか？
それが実現したら、御社はどのように変わりますか？」`,
    confirmations: [
      { item: "目標成約率", check: "〇〇%（現状+〇〇%）" },
      { item: "チームの変化", check: "〇〇ができるように" },
      { item: "会社の変化", check: "〇〇を達成" },
    ],
  },
  {
    id: 5,
    title: "クロージング",
    purpose: "導入への意思決定を促す",
    script: `「ここまでのお話を整理させてください。
御社の課題は〇〇で、放置すると〇〇の影響がある。
理想は〇〇で、それには〇〇が必要。
当社のソリューションなら、それを〇〇で実現できます。
次のステップとして、〇〇はいかがでしょうか？」`,
    confirmations: [
      { item: "課題の合意", check: "はい / 修正あり" },
      { item: "解決策の理解", check: "十分 / 要説明" },
      { item: "次のアクション", check: "〇〇を予定" },
    ],
  },
]

export function ClosingFlowSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const toggleComplete = (stepId: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    )
  }

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">クロージング進捗</span>
            <span className="text-sm font-medium">{completedSteps.length} / {closingSteps.length}</span>
          </div>
          <div className="flex gap-1">
            {closingSteps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "h-2 flex-1 rounded-full transition-colors",
                  completedSteps.includes(step.id) ? "bg-orange-500" : "bg-slate-200"
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-3">
        {closingSteps.map((step) => {
          const isExpanded = expandedStep === step.id
          const isCompleted = completedSteps.includes(step.id)

          return (
            <Card
              key={step.id}
              className={cn(
                "transition-all duration-200",
                isCompleted && "border-orange-300 bg-orange-50"
              )}
            >
              <CardHeader
                className="pb-2 cursor-pointer"
                onClick={() => toggleStep(step.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={isCompleted ? "default" : "outline"}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center p-0",
                        isCompleted && "bg-orange-500 text-white"
                      )}
                    >
                      {step.id}
                    </Badge>
                    <div>
                      <CardTitle className="text-base">{step.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{step.purpose}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="space-y-4">
                  {/* Script Block */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">トークスクリプト</span>
                      <CopyButton text={step.script} />
                    </div>
                    <div className="bg-secondary rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                      {step.script}
                    </div>
                  </div>

                  {/* Confirmation Table */}
                  <div>
                    <span className="text-sm font-medium mb-2 block">確認項目</span>
                    <div className="bg-secondary rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 font-medium">項目</th>
                            <th className="text-left p-3 font-medium">確認内容</th>
                          </tr>
                        </thead>
                        <tbody>
                          {step.confirmations.map((conf, index) => (
                            <tr key={index} className="border-b border-border last:border-0">
                              <td className="p-3 text-muted-foreground">{conf.item}</td>
                              <td className="p-3">{conf.check}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Complete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleComplete(step.id)
                    }}
                    className={cn(
                      "w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors",
                      isCompleted
                        ? "bg-orange-100 text-orange-700"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    )}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    {isCompleted ? "完了済み" : "このステップを完了"}
                  </button>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
