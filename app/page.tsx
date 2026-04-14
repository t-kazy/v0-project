"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ClipboardCheck,
  GitBranch,
  FileText,
  Building2,
  MessageSquareWarning,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    id: 0,
    icon: ClipboardCheck,
    title: "商談前チェック",
    description: "準備リスト・製品選択・マインドセット",
    color: "bg-blue-100 text-blue-600",
    items: ["チェックリスト", "キーワードヒント", "名言集"],
  },
  {
    id: 1,
    icon: GitBranch,
    title: "クロージングフロー",
    description: "5ステップの体系的なクロージング手順",
    color: "bg-green-100 text-green-600",
    items: ["アイスブレイク", "ヒアリング", "提案", "クロージング", "次回設定"],
  },
  {
    id: 2,
    icon: FileText,
    title: "トークスクリプト",
    description: "製品別・ITリテラシー別の台本",
    color: "bg-purple-100 text-purple-600",
    items: ["ウリアゲAIX", "カクヤクAIX", "リテラシー別対応"],
  },
  {
    id: 3,
    icon: Building2,
    title: "業種別事例",
    description: "5業種のBefore/After実績と動画",
    color: "bg-amber-100 text-amber-600",
    items: ["建築建設", "医療系", "営業職系", "IT・コンサル", "士業"],
  },
  {
    id: 4,
    icon: MessageSquareWarning,
    title: "反論QA",
    description: "6カテゴリの切り返しスクリプト",
    color: "bg-red-100 text-red-600",
    items: ["コスト", "リテラシー不安", "時間", "定着", "競合", "稟議"],
  },
  {
    id: 5,
    icon: Calculator,
    title: "料金・ROI",
    description: "料金表・助成金・ROI計算機",
    color: "bg-teal-100 text-teal-600",
    items: ["料金プラン", "助成金内訳", "ROI計算機", "導入フロー"],
  },
  {
    id: 6,
    icon: CheckCircle2,
    title: "商談後チェック",
    description: "フォローアップ・お礼メールテンプレート",
    color: "bg-indigo-100 text-indigo-600",
    items: ["チェックリスト", "次回日程", "お礼メール"],
  },
]

const highlights = [
  { icon: Zap, label: "商談成約率UP", value: "最大30%" },
  { icon: Target, label: "準備時間削減", value: "50%以上" },
  { icon: TrendingUp, label: "ROI最大化", value: "助成金75%OFF" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function TopPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,120,50,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,80,80,0.2) 0%, transparent 50%)"
          }} />
        </div>
        
        <div className="relative px-4 py-8 md:py-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-16">
              <Image
                src="/images/logo.png"
                alt="ウリアゲAIX カクヤク"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Hero Content with Mascot */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-40 h-48 mb-4">
              <Image
                src="/images/mascot-thumbsup.png"
                alt="AIXマスコット"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 text-balance">
              セールスクローザー<br />
              <span className="text-orange-400">コントロールパネル</span>
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base mb-6 max-w-md text-balance">
              商談中にリアルタイムで参照できる<br />
              営業支援ツール
            </p>

            {/* Highlight Stats */}
            <div className="flex gap-4 mb-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-center"
                >
                  <item.icon className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{item.value}</div>
                  <div className="text-[10px] text-slate-300">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/panel">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg shadow-orange-500/30 gap-2"
              >
                パネルを開く
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="px-4 py-8 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-2">
            収録コンテンツ
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            7つのセクションで商談を完全サポート
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div key={feature.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-slate-800">{feature.title}</h3>
                            <Badge variant="secondary" className="text-[10px] bg-slate-100">
                              {feature.id + 1}/7
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-500 mb-2">{feature.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {feature.items.map((item, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-4 py-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-6">
            対応製品
          </h2>
          
          <div className="relative w-full h-48 md:h-64 mb-6 rounded-xl overflow-hidden">
            <Image
              src="/images/products-hero.png"
              alt="ウリアゲAIX・カクヤクAIX"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">攻</div>
                <div className="text-lg font-bold text-slate-800">ウリアゲAIX</div>
                <p className="text-xs text-slate-500 mt-1">営業力強化・売上向上</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">守</div>
                <div className="text-lg font-bold text-slate-800">カクヤクAIX</div>
                <p className="text-xs text-slate-500 mt-1">業務効率化・コスト削減</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-8 bg-slate-900">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative w-24 h-28 mx-auto mb-4">
            <Image
              src="/images/mascot-hero.png"
              alt="AIXマスコット"
              fill
              className="object-contain"
            />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">
            商談を成功に導こう
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            最短3ヶ月で超生産性の筋肉質な組織へ
          </p>
          
          <Link href="/panel">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg shadow-orange-500/30 gap-2"
            >
              コントロールパネルを開く
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 bg-slate-950 text-center">
        <p className="text-slate-500 text-xs">
          Sales Closer Control Panel
        </p>
      </footer>
    </div>
  )
}
