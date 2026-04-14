"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Play, Building, Stethoscope, Briefcase, Monitor, Scale } from "lucide-react"
import { cn } from "@/lib/utils"

const industries = [
  {
    id: "construction",
    name: "建築・建設",
    icon: Building,
    recommendedProduct: "ウリアゲAIX",
    before: [
      "見積作成に3日かかっていた",
      "現場とオフィスの情報共有が遅い",
      "若手の技術継承が進まない",
    ],
    after: [
      "見積作成が3時間に短縮",
      "リアルタイムでの進捗共有",
      "AIによるナレッジベース構築",
    ],
    metrics: "売上20%UP、工期遅延30%減少",
  },
  {
    id: "medical",
    name: "医療系",
    icon: Stethoscope,
    recommendedProduct: "カクヤクAIX",
    before: [
      "電子カルテの操作に時間がかかる",
      "スタッフのIT習熟度がバラバラ",
      "新しいシステム導入に抵抗感",
    ],
    after: [
      "操作時間50%短縮",
      "全スタッフが基本操作をマスター",
      "スムーズなシステム移行",
    ],
    metrics: "患者対応時間20%増加、残業30%削減",
  },
  {
    id: "sales",
    name: "営業職系",
    icon: Briefcase,
    recommendedProduct: "ウリアゲAIX",
    before: [
      "商談の質にばらつきがある",
      "トップセールスのノウハウが共有されない",
      "追客のタイミングが属人的",
    ],
    after: [
      "成約率の標準偏差50%減少",
      "ベストプラクティスの全員共有",
      "AIによる最適タイミング通知",
    ],
    metrics: "成約率35%UP、新人の戦力化期間半減",
  },
  {
    id: "it",
    name: "IT・コンサル",
    icon: Monitor,
    recommendedProduct: "両方",
    before: [
      "プロジェクト管理が煩雑",
      "顧客への提案書作成に時間がかかる",
      "チーム間の情報断絶",
    ],
    after: [
      "プロジェクト可視化の自動化",
      "提案書のAI自動生成",
      "ナレッジの横断検索",
    ],
    metrics: "提案準備時間60%削減、顧客満足度15%向上",
  },
  {
    id: "professional",
    name: "士業",
    icon: Scale,
    recommendedProduct: "カクヤクAIX",
    before: [
      "書類作成の手間が膨大",
      "スタッフのITスキル向上が難しい",
      "顧問先への対応が遅れがち",
    ],
    after: [
      "定型書類の自動作成",
      "全スタッフのITスキル底上げ",
      "即座な顧問先対応",
    ],
    metrics: "書類作成時間70%削減、顧問先満足度20%向上",
  },
]

export function IndustryCasesSection() {
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>("construction")

  const toggleIndustry = (id: string) => {
    setExpandedIndustry(expandedIndustry === id ? null : id)
  }

  return (
    <div className="space-y-3">
      {industries.map((industry) => {
        const isExpanded = expandedIndustry === industry.id
        const Icon = industry.icon

        return (
          <Card
            key={industry.id}
            className={cn(
              "transition-all duration-200",
              isExpanded && "ring-1 ring-primary/50"
            )}
          >
            <CardHeader
              className="pb-2 cursor-pointer"
              onClick={() => toggleIndustry(industry.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{industry.name}</CardTitle>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "mt-1 text-xs",
                        industry.recommendedProduct === "ウリアゲAIX"
                          ? "bg-primary/20 text-primary"
                          : industry.recommendedProduct === "カクヤクAIX"
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {industry.recommendedProduct}
                    </Badge>
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
                {/* Before/After Table */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-destructive/10 rounded-lg p-3">
                    <div className="text-sm font-medium text-destructive mb-2">Before</div>
                    <ul className="space-y-2">
                      {industry.before.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-destructive mt-0.5">×</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-3">
                    <div className="text-sm font-medium text-accent mb-2">After</div>
                    <ul className="space-y-2">
                      {industry.after.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Metrics */}
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <span className="text-sm font-medium text-primary">{industry.metrics}</span>
                </div>

                {/* Video Placeholder */}
                <div className="bg-secondary rounded-lg p-8 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">事例動画</span>
                  <span className="text-xs text-muted-foreground mt-1">Coming Soon</span>
                </div>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
