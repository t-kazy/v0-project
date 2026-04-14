"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"

const scripts = {
  uriage: {
    title: "ウリアゲAIX",
    badge: "営業強化",
    script: `【オープニング】
「本日は貴重なお時間をいただきありがとうございます。
ウリアゲAIXは、AIを活用して営業チームの生産性を飛躍的に向上させるソリューションです。」

【価値提案】
「御社の営業課題を解決するために、以下の3つの機能をご提供します：

1. AIによる商談分析
   - 商談の録音・文字起こしを自動化
   - 成功パターンの抽出と共有
   - 新人教育の効率化

2. 見込み客スコアリング
   - 過去データからの成約確度予測
   - 優先順位の自動提案
   - 追客タイミングの最適化

3. パーソナライズド提案書
   - 顧客に合わせた提案書の自動生成
   - 業界・規模別のテンプレート
   - 競合比較資料の自動更新」

【クロージング】
「導入企業の平均で、営業効率が40%向上、成約率が25%アップしています。
まずは2週間の無料トライアルから始めてみませんか？」`,
  },
  kakuyaku: {
    title: "カクヤクAIX",
    badge: "DX定着",
    script: `【オープニング】
「本日は貴重なお時間をいただきありがとうございます。
カクヤクAIXは、社内のDX推進と定着を支援するAIプラットフォームです。」

【価値提案】
「御社のDX課題を解決するために、以下の3つの機能をご提供します：

1. パーソナライズド学習
   - 個人のITスキルレベルに合わせた学習コンテンツ
   - 業務に直結した実践的なカリキュラム
   - 進捗の可視化とモチベーション管理

2. AIアシスタント
   - 24時間対応のチャットサポート
   - 操作方法の即座なガイド
   - よくある質問への自動回答

3. 組織全体の定着支援
   - 部署別の習熟度ダッシュボード
   - つまずきポイントの早期発見
   - マネージャー向けサポートツール」

【クロージング】
「導入企業では、DXツールの定着率が平均で3倍に向上しています。
御社の状況に合わせたプランをご提案させてください。」`,
  },
  both: {
    title: "両方の場合",
    badge: "フルパッケージ",
    script: `【オープニング】
「本日は貴重なお時間をいただきありがとうございます。
御社には、営業強化とDX定着の両面から支援できるソリューションをご提案します。」

【統合提案】
「ウリアゲAIXとカクヤクAIXを組み合わせることで、
営業部門の強化と、全社的なDX定着を同時に実現できます。

【相乗効果】
1. 営業チームへの展開をスムーズに
   - カクヤクAIXで営業ツールの使い方を全員がマスター
   - ウリアゲAIXで営業活動の質を向上

2. データの一元管理
   - 両システムの連携で、学習データと営業データを統合
   - より精度の高いAI分析が可能に

3. コスト効率
   - セット導入で20%のディスカウント
   - サポート窓口の一本化で管理コスト削減」

【クロージング】
「まずはどちらから始めるか、御社の優先順位に合わせてご提案いたします。
今の一番の課題は、営業力強化とDX定着、どちらでしょうか？」`,
  },
}

const literacyCheatsheet = [
  {
    level: "高",
    description: "IT部門・エンジニア",
    approach: "技術的な詳細、API連携、カスタマイズ性を強調",
    keywords: "「拡張性」「インテグレーション」「セキュリティ」",
  },
  {
    level: "低",
    description: "現場スタッフ・シニア層",
    approach: "簡単さ、サポート体制、具体的な操作手順を説明",
    keywords: "「かんたん」「サポート充実」「すぐ使える」",
  },
  {
    level: "混在",
    description: "部署混合・全社導入",
    approach: "段階的な導入、レベル別研修、管理者向け機能を紹介",
    keywords: "「段階的」「レベル別」「見える化」",
  },
]

export function TalkScriptsSection() {
  const [activeTab, setActiveTab] = useState("uriage")

  return (
    <div className="space-y-4">
      {/* Script Cards */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="uriage" className="text-xs">ウリアゲ</TabsTrigger>
          <TabsTrigger value="kakuyaku" className="text-xs">カクヤク</TabsTrigger>
          <TabsTrigger value="both" className="text-xs">両方</TabsTrigger>
        </TabsList>

        {Object.entries(scripts).map(([key, data]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{data.title}</CardTitle>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {data.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-2">
                  <CopyButton text={data.script} />
                </div>
                <div className="bg-secondary rounded-lg p-4 font-mono text-sm whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                  {data.script}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* IT Literacy Cheatsheet */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">ITリテラシー別チートシート</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">レベル</th>
                  <th className="text-left p-3 font-medium">対象</th>
                  <th className="text-left p-3 font-medium">アプローチ</th>
                </tr>
              </thead>
              <tbody>
                {literacyCheatsheet.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={
                          row.level === "高"
                            ? "border-primary text-primary"
                            : row.level === "低"
                            ? "border-accent text-accent"
                            : "border-muted-foreground"
                        }
                      >
                        {row.level}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{row.description}</div>
                      <div className="text-muted-foreground text-xs mt-1">
                        {row.keywords}
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{row.approach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
