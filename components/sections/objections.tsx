"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Banknote, Brain, Clock, Target, Users, FileCheck } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

const objectionCategories = [
  {
    id: "cost",
    name: "コスト",
    icon: Banknote,
    color: "text-chart-1",
    bgColor: "bg-chart-1/20",
    objections: [
      {
        objection: "予算が厳しい",
        rebuttal: `「ご予算のご懸念、よく分かります。
実は、助成金を活用すると実質1/4の費用で導入できます。
例えば、通常40万円のところ、助成金適用後は10万円でスタートできます。
さらに、導入後3ヶ月で投資回収できているお客様が多いです。」`,
        closing: "具体的な費用対効果シミュレーションをお見せしましょうか？",
      },
      {
        objection: "費用対効果が見えない",
        rebuttal: `「ROIについてのご質問、ありがとうございます。
当社の顧客データでは、平均して導入後6ヶ月で200%のROIを達成しています。
具体的には、営業効率の向上で月20時間の工数削減、成約率15%向上が平均値です。
御社の数字で試算してみましょうか？」`,
        closing: "御社の現状数字を教えていただければ、具体的なシミュレーションをお出しできます。",
      },
    ],
  },
  {
    id: "literacy",
    name: "リテラシー不安",
    icon: Brain,
    color: "text-chart-2",
    bgColor: "bg-chart-2/20",
    objections: [
      {
        objection: "うちのスタッフには難しそう",
        rebuttal: `「スタッフの方のITスキルへのご心配、もっともです。
当社のソリューションは、スマホが使える方なら誰でも使えるように設計しています。
実際に、平均年齢55歳の企業様でも、2週間で全員が基本操作をマスターしています。
導入時には、個別のレベル別研修もご用意しています。」`,
        closing: "デモで実際の操作感をお試しいただけますが、いかがでしょうか？",
      },
      {
        objection: "社内に詳しい人がいない",
        rebuttal: `「社内にIT担当者がいらっしゃらないのですね。
実は、当社の顧客の60%以上が同じ状況でスタートしています。
24時間対応のサポートチャットと、専任のカスタマーサクセス担当がつきますので、
困ったときはいつでもサポートを受けられます。」`,
        closing: "サポート体制の詳細をご説明しましょうか？",
      },
    ],
  },
  {
    id: "time",
    name: "時間がない",
    icon: Clock,
    color: "text-chart-3",
    bgColor: "bg-chart-3/20",
    objections: [
      {
        objection: "導入に時間がかけられない",
        rebuttal: `「お忙しい中、導入時間のご懸念は当然です。
当社は最短1週間での導入実績があります。
設定のほとんどを当社側で行い、御社のご負担を最小限に抑えます。
初期設定後は、1日30分のトレーニングを5日間だけで使い始められます。」`,
        closing: "御社のスケジュールに合わせた導入プランをご提案しましょうか？",
      },
      {
        objection: "今は繁忙期で無理",
        rebuttal: `「繁忙期中とのこと、承知しました。
むしろ繁忙期こそ、業務効率化の効果が大きく出る時期です。
導入準備を今から始めて、繁忙期明けにスタートする方法もあります。
または、繁忙期中でも負担なく進められるミニマム導入プランもございます。」`,
        closing: "繁忙期明けを目標にしたスケジュールを組んでみましょうか？",
      },
    ],
  },
  {
    id: "adoption",
    name: "定着不安",
    icon: Target,
    color: "text-chart-4",
    bgColor: "bg-chart-4/20",
    objections: [
      {
        objection: "以前も似たツールを入れたが定着しなかった",
        rebuttal: `「過去のご経験から、定着への不安をお持ちなのですね。
当社の継続率は95%以上で、定着に特化したプログラムを用意しています。
定着しなかった原因を分析し、個別にカスタマイズしたオンボーディングを実施します。
定着までの90日間は、週次でフォローアップミーティングを行います。」`,
        closing: "過去の導入で何が問題だったか、詳しくお聞かせいただけますか？",
      },
      {
        objection: "現場が使わなくなりそう",
        rebuttal: `「現場への定着は、確かに重要なポイントですね。
当社は「使わざるを得ない」設計ではなく「使いたくなる」設計を重視しています。
ゲーミフィケーション要素や、使うことで仕事が楽になる体験設計で、
自然と定着する仕組みを組み込んでいます。」`,
        closing: "実際に定着に成功した企業の事例をご紹介しましょうか？",
      },
    ],
  },
  {
    id: "competitor",
    name: "競合比較",
    icon: Users,
    color: "text-chart-5",
    bgColor: "bg-chart-5/20",
    objections: [
      {
        objection: "他社と比較検討中",
        rebuttal: `「比較検討されているのは、良いご判断だと思います。
当社の強みは3つ：日本語に特化したAI、充実したサポート体制、助成金活用サポートです。
特に、他社では対応していない助成金申請のサポートまで一貫して行っています。
比較のポイントをお伝えしますので、ぜひフラットにご検討ください。」`,
        closing: "他社様との比較表をお作りしましょうか？",
      },
      {
        objection: "もっと安いサービスがある",
        rebuttal: `「価格面でのご検討、ありがとうございます。
確かに、単純な価格だけを見ると、より安いサービスもあります。
ただ、トータルコストで見ると、サポート費用、カスタマイズ費用、定着までの時間コストを含めると、
当社が最も費用対効果が高いとお選びいただくケースが多いです。」`,
        closing: "5年間のトータルコスト比較をお見せしましょうか？",
      },
    ],
  },
  {
    id: "approval",
    name: "稟議",
    icon: FileCheck,
    color: "text-primary",
    bgColor: "bg-primary/20",
    objections: [
      {
        objection: "上に相談しないと決められない",
        rebuttal: `「決裁者の方へのご相談が必要とのこと、承知しました。
稟議を通しやすくするための資料一式をご用意しています。
ROI試算、導入実績、FAQ集など、決裁者の方の疑問にお答えできる資料です。
よろしければ、決裁者の方への説明にも同席させていただけますか？」`,
        closing: "稟議用の資料を、御社向けにカスタマイズしてお送りしましょうか？",
      },
      {
        objection: "社内の合意形成が難しい",
        rebuttal: `「関係者の方々の合意形成、大切なポイントですね。
当社では、キーパーソンの方々向けの個別説明会も対応しています。
各部門の懸念点に合わせた説明ができますので、スムーズな合意形成をサポートします。
また、スモールスタートで効果を実証してから全社展開する方法もあります。」`,
        closing: "関係者の方々の一覧をいただければ、それぞれに合わせた資料を用意します。",
      },
    ],
  },
]

export function ObjectionsSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("cost")

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  return (
    <div className="space-y-3">
      {objectionCategories.map((category) => {
        const isExpanded = expandedCategory === category.id
        const Icon = category.icon

        return (
          <Card
            key={category.id}
            className={cn(
              "transition-all duration-200",
              isExpanded && "ring-1 ring-orange-400"
            )}
          >
            <CardHeader
              className="pb-2 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", category.bgColor)}>
                    <Icon className={cn("w-5 h-5", category.color)} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{category.name}</CardTitle>
                    <span className="text-xs text-muted-foreground">
                      {category.objections.length}件の反論パターン
                    </span>
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
                {category.objections.map((obj, index) => (
                  <div key={index} className="space-y-3">
                    {index > 0 && <hr className="border-border" />}
                    
                    {/* Objection Header */}
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                        反論
                      </Badge>
                      <span className="font-medium">「{obj.objection}」</span>
                    </div>

                    {/* Rebuttal Script */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          切り返し
                        </Badge>
                        <CopyButton text={obj.rebuttal} />
                      </div>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                        {obj.rebuttal}
                      </div>
                    </div>

                    {/* Closing One-liner */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2">
                      <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300 shrink-0">
                        クロージング
                      </Badge>
                      <span className="text-sm">{obj.closing}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
