"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Calculator, TrendingUp, CheckCircle, Award } from "lucide-react"

const implementationSteps = [
  { step: 1, title: "お問い合わせ", duration: "当日" },
  { step: 2, title: "ヒアリング", duration: "1週間以内" },
  { step: 3, title: "提案・見積", duration: "2週間以内" },
  { step: 4, title: "契約・助成金申請", duration: "2〜4週間" },
  { step: 5, title: "導入・研修", duration: "1〜2週間" },
  { step: 6, title: "運用開始", duration: "継続サポート" },
]

const keyMetrics = [
  { label: "継続率", value: "95%", description: "導入企業の継続利用率" },
  { label: "売上向上", value: "最大3倍", description: "営業成績の改善実績" },
  { label: "工数削減", value: "40%", description: "平均的な業務効率化" },
  { label: "ROI", value: "200%+", description: "6ヶ月以内の投資対効果" },
]

export function PricingROISection() {
  const [staffCount, setStaffCount] = useState(5)
  const [overtimeHours, setOvertimeHours] = useState(20)
  const [hourlyRate, setHourlyRate] = useState(2500)

  const currentMonthlyCost = staffCount * overtimeHours * hourlyRate
  const savedMonthlyCost = currentMonthlyCost * 0.5
  const annualSavings = savedMonthlyCost * 12

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      {/* Pricing Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">料金プラン（1名あたり）</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary rounded-lg p-4 text-center">
              <span className="text-sm text-muted-foreground block mb-1">通常価格</span>
              <span className="text-2xl font-bold line-through text-muted-foreground">¥400,000</span>
            </div>
            <div className="bg-accent/20 rounded-lg p-4 text-center border border-accent/30">
              <span className="text-sm text-accent block mb-1">助成金適用後</span>
              <span className="text-2xl font-bold text-accent">¥100,000</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">助成金で75%OFF!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              人材開発支援助成金（人への投資促進コース）を活用することで、
              研修費用の最大75%が助成されます。申請手続きも当社がサポートします。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Subsidy Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">助成金の内訳</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">研修費用</span>
              <span className="font-medium">¥400,000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">助成金（経費助成）</span>
              <span className="font-medium text-accent">-¥240,000</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">助成金（賃金助成）</span>
              <span className="font-medium text-accent">-¥60,000</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium">実質負担額</span>
              <span className="text-xl font-bold text-primary">¥100,000</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card className="border-primary/30">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">ROI計算機</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="staff">対象スタッフ数（名）</Label>
              <Input
                id="staff"
                type="number"
                value={staffCount}
                onChange={(e) => setStaffCount(Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtime">月間残業時間（時間/名）</Label>
              <Input
                id="overtime"
                type="number"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(Math.max(0, parseInt(e.target.value) || 0))}
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">時給換算（円）</Label>
              <Input
                id="rate"
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(0, parseInt(e.target.value) || 0))}
                min={0}
                step={100}
              />
            </div>
          </div>

          <div className="bg-secondary rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">現在の月間残業コスト</span>
              <span className="font-medium">{formatCurrency(currentMonthlyCost)}</span>
            </div>
            <div className="flex items-center gap-2 py-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">50%削減を想定</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">月間削減コスト</span>
              <span className="font-medium text-accent">{formatCurrency(savedMonthlyCost)}</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between items-center">
              <span className="font-medium">年間削減コスト</span>
              <span className="text-xl font-bold text-primary">{formatCurrency(annualSavings)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">導入フロー</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {implementationSteps.map((step, index) => (
              <div key={step.step} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                    {step.step}
                  </div>
                  {index < implementationSteps.length - 1 && (
                    <div className="w-0.5 h-8 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="bg-primary/5 border-primary/30">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">導入効果</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-card rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
                <div className="font-medium text-sm">{metric.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
