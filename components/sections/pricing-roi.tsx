"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, TrendingUp, CheckCircle, Award, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Mascot } from "@/components/mascot"

const implementationSteps = [
  { step: 1, title: "お申し込み・ご契約", duration: "当日〜数日", desc: "受講者名・人数を確定し、契約書を締結" },
  { step: 2, title: "助成金申請サポート", duration: "2〜4週間", desc: "500社・承認率100%の実績。安心してお任せください" },
  { step: 3, title: "キックオフ", duration: "1〜2週間以内", desc: "受講者全員でスタートミーティング・目標設定" },
  { step: 4, title: "研修・実践（3ヶ月）", duration: "週1回30分", desc: "Eラーニング + 週次ミーティング + 平日チャットサポート" },
  { step: 5, title: "修了・効果確認", duration: "3ヶ月後", desc: "成果レビュー・助成金受給申請" },
  { step: 6, title: "助成金受給", duration: "数ヶ月後", desc: "審査通過後、補助額が口座に振り込まれる" },
]

const keyMetrics = [
  { label: "継続利用率", value: "95%", icon: "🔄", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "売上向上", value: "最大3倍", icon: "📈", color: "text-orange-600", bg: "bg-orange-50" },
  { label: "事務作業削減", value: "最大90%", icon: "⚡", color: "text-green-600", bg: "bg-green-50" },
  { label: "助成金承認率", value: "100%", icon: "🏆", color: "text-blue-600", bg: "bg-blue-50" },
]

export function PricingROISection() {
  const [staffCount, setStaffCount] = useState(3)
  const [overtimeHours, setOvertimeHours] = useState(20)
  const [hourlyRate, setHourlyRate] = useState(2500)
  const [showSubsidy, setShowSubsidy] = useState(false)

  const currentMonthlyCost = staffCount * overtimeHours * hourlyRate
  const savedMonthlyCost = currentMonthlyCost * 0.5
  const annualSavings = savedMonthlyCost * 12
  const investmentTotal = staffCount * 100000
  const roiMonths = savedMonthlyCost > 0 ? Math.ceil(investmentTotal / savedMonthlyCost) : 0

  const fmt = (n: number) => new Intl.NumberFormat("ja-JP", {
    style: "currency", currency: "JPY", maximumFractionDigits: 0,
  }).format(n)

  return (
    <div className="space-y-4">

      {/* ===== KEY METRICS ===== */}
      <div className="grid grid-cols-2 gap-2.5">
        {keyMetrics.map((m, i) => (
          <div key={i} className={`${m.bg} rounded-xl p-3 border border-white shadow-sm`}>
            <div className="text-lg mb-0.5">{m.icon}</div>
            <div className={`text-xl font-black ${m.color}`}>{m.value}</div>
            <div className="text-[10px] text-slate-600 font-medium">{m.label}</div>
          </div>
        ))}
      </div>

      {/* ===== PRICING CARD with MASCOT ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-orange-400 to-red-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-500" />
            料金プラン
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-slate-100 rounded-xl p-3 text-center">
                  <div className="text-[10px] text-slate-500 mb-1">通常価格</div>
                  <div className="text-lg font-black text-slate-400 line-through">¥400,000</div>
                  <div className="text-[9px] text-slate-400">/ 1名</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-3 text-center shadow-md">
                  <div className="text-[10px] text-blue-200 mb-1">助成金適用後</div>
                  <div className="text-xl font-black text-white">¥100,000</div>
                  <div className="text-[9px] text-blue-300">/ 1名</div>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-2.5 text-center">
                <span className="text-xs font-bold text-orange-600">
                  社長・代表者は受講料
                  <span className="text-orange-700 text-sm mx-1">無料</span>
                  ・月額費用なし
                </span>
              </div>
            </div>
            <Mascot size="sm" variant="attack" className="flex-shrink-0 mt-2" />
          </div>

          <button
            onClick={() => setShowSubsidy(!showSubsidy)}
            className="mt-3 w-full flex items-center justify-between p-2.5 bg-blue-50 border border-blue-100 rounded-lg text-blue-700 text-xs font-bold"
          >
            <span>助成金（人材開発支援助成金）の詳細</span>
            {showSubsidy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showSubsidy && (
            <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
              {[
                { label: "受講料", val: "¥400,000", highlight: false },
                { label: "経費助成（75%）", val: "▲¥240,000", highlight: true },
                { label: "賃金助成", val: "▲¥60,000", highlight: true },
                { label: "実質負担", val: "¥100,000", highlight: false, bold: true },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between text-xs ${row.bold ? "font-bold text-blue-700 pt-1 border-t border-slate-200" : "text-slate-600"}`}>
                  <span>{row.label}</span>
                  <span className={row.highlight ? "text-green-600 font-bold" : ""}>{row.val}</span>
                </div>
              ))}
              <p className="text-[10px] text-slate-500 mt-1 pt-1 border-t border-slate-200">
                ※ 500社申請・全社通過（承認率100%）の実績あり
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===== ROI CALCULATOR ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-green-600" />
            <CardTitle className="text-sm font-bold text-slate-800">ROI計算機</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="grid gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-slate-600">対象スタッフ数（名）</Label>
              <Input
                type="number"
                value={staffCount}
                onChange={(e) => setStaffCount(Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                className="h-9 text-sm border-slate-200 bg-slate-50"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-slate-600">月間残業時間（時間/名）</Label>
              <Input
                type="number"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(Math.max(0, parseInt(e.target.value) || 0))}
                min={0}
                className="h-9 text-sm border-slate-200 bg-slate-50"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-slate-600">時給換算（円）</Label>
              <Input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(0, parseInt(e.target.value) || 0))}
                min={0}
                step={100}
                className="h-9 text-sm border-slate-200 bg-slate-50"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">現在の月間残業コスト</span>
              <span className="font-bold text-slate-700">{fmt(currentMonthlyCost)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-3 h-3 text-blue-500 flex-shrink-0" />
              <span className="text-[10px] text-blue-600 font-medium">事務作業50%削減を想定（保守的）</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">月間削減コスト</span>
              <span className="font-bold text-green-600">{fmt(savedMonthlyCost)}</span>
            </div>
            <div className="border-t border-blue-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">年間削減コスト</span>
                <span className="text-xl font-black text-blue-700">{fmt(annualSavings)}</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-blue-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">実質投資額（助成金後・{staffCount}名）</span>
              <span className="text-sm font-black text-orange-600">{fmt(investmentTotal)}</span>
            </div>
            {savedMonthlyCost > 0 && (
              <div className="flex items-center gap-2 text-xs text-green-700 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>投資回収の目安：<span className="text-green-800">{roiMonths}ヶ月</span></span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ===== IMPLEMENTATION FLOW ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-700" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            導入フロー
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-0">
            {implementationSteps.map((step, index) => (
              <div key={step.step} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm">
                    {step.step}
                  </div>
                  {index < implementationSteps.length - 1 && (
                    <div className="w-px h-8 bg-blue-100 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-3 pt-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <div className="font-bold text-xs text-slate-800">{step.title}</div>
                    <span className="text-[9px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded flex-shrink-0">{step.duration}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 bg-slate-800 rounded-xl p-3.5 relative overflow-hidden">
            <div className="absolute -right-2 -bottom-2 opacity-15">
              <Mascot size="sm" variant="defense" />
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed relative z-10">
              「まず申込いただいたら助成金の手続きを一緒に進めます。500社すべて通っているので、そこは心配いりません。あとは<span className="text-white font-bold">3ヶ月、週1回30分</span>だけお時間いただければ、残りは現場で実践するだけです。」
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
