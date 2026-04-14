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
  Flame,
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
    charImage: "/images/char-thinking.jpg",
  },
  {
    id: 1,
    icon: GitBranch,
    title: "クロージングフロー",
    description: "5ステップの体系的なクロージング手順",
    color: "bg-green-100 text-green-600",
    items: ["アイスブレイク", "ヒアリング", "提案", "クロージング", "次回設定"],
    charImage: null,
  },
  {
    id: 2,
    icon: FileText,
    title: "トークスクリプト",
    description: "製品別・ITリテラシー別の台本",
    color: "bg-purple-100 text-purple-600",
    items: ["ウリアゲAIX", "カクヤクAIX", "リテラシー別対応"],
    charImage: "/images/char-pointing.jpg",
  },
  {
    id: 3,
    icon: Building2,
    title: "業種別事例",
    description: "5業種のBefore/After実績と動画",
    color: "bg-amber-100 text-amber-600",
    items: ["建築建設", "医療系", "営業職系", "IT・コンサル", "士業"],
    charImage: null,
  },
  {
    id: 4,
    icon: MessageSquareWarning,
    title: "反論QA",
    description: "6カテゴリの切り返しスクリプト",
    color: "bg-red-100 text-red-600",
    items: ["コスト", "リテラシー不安", "時間", "定着", "競合", "稟議"],
    charImage: "/images/char-thumbsup.jpg",
  },
  {
    id: 5,
    icon: Calculator,
    title: "料金・ROI",
    description: "料金表・助成金・ROI計算機",
    color: "bg-teal-100 text-teal-600",
    items: ["料金プラン", "助成金内訳", "ROI計算機", "導入フロー"],
    charImage: null,
  },
  {
    id: 6,
    icon: CheckCircle2,
    title: "商談後チェック",
    description: "フォローアップ・お礼メールテンプレート",
    color: "bg-indigo-100 text-indigo-600",
    items: ["チェックリスト", "次回日程", "お礼メール"],
    charImage: "/images/char-victory.jpg",
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
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,120,50,0.4) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,80,80,0.3) 0%, transparent 50%)"
          }} />
        </div>
        
        <div className="relative px-4 py-8 md:py-12">
          {/* Title with Logo Style */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 mb-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="text-orange-400 font-bold text-sm tracking-wider">SALES CLOSER</span>
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              <span className="text-orange-400">ウリアゲ</span>AIX
              <span className="mx-2 text-slate-500">/</span>
              <span className="text-blue-400">カクヤク</span>AIX
            </h1>
          </motion.div>

          {/* Hero Content with Mascot */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-44 h-56 md:w-52 md:h-64"
            >
              <Image
                src="/images/char-hero.jpg"
                alt="AIXマスコット"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center md:text-left"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                コントロールパネル
              </h2>
              <p className="text-slate-300 text-sm md:text-base mb-4 max-w-xs">
                商談中にリアルタイムで参照できる営業支援ツール
              </p>

              {/* CTA Button */}
              <Link href="/panel">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg shadow-orange-500/30 gap-2"
                >
                  パネルを開く
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Highlight Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-3 mt-8"
          >
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center border border-white/10"
              >
                <item.icon className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{item.value}</div>
                <div className="text-[10px] text-slate-300">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="px-4 py-10 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-orange-100 text-orange-700 mb-2">CONTENTS</Badge>
            <h2 className="text-2xl font-bold text-slate-800">
              収録コンテンツ
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              7つのセクションで商談を完全サポート
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              const hasChar = feature.charImage !== null
              return (
                <motion.div key={feature.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200">
                    <CardContent className="p-0">
                      <div className={`flex ${hasChar ? 'items-stretch' : 'items-center'}`}>
                        {/* Character Image (left side) */}
                        {hasChar && (
                          <div className="relative w-24 h-28 flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-50">
                            <Image
                              src={feature.charImage}
                              alt="キャラクター"
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        )}
                        
                        <div className={`flex-1 p-4 ${!hasChar ? 'flex items-start gap-3' : ''}`}>
                          {!hasChar && (
                            <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center shrink-0`}>
                              <Icon className="w-5 h-5" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {hasChar && (
                                <div className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center shrink-0`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                              )}
                              <h3 className="font-bold text-slate-800">{feature.title}</h3>
                              <Badge variant="outline" className="text-[10px] ml-auto">
                                {feature.id + 1}/7
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-500 mb-2">{feature.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {feature.items.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
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
      <section className="px-4 py-10 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <Badge className="bg-blue-100 text-blue-700 mb-2">PRODUCTS</Badge>
            <h2 className="text-2xl font-bold text-slate-800">
              対応製品
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 border-orange-200 overflow-hidden">
              <CardContent className="p-4 text-center relative">
                <div className="absolute top-2 right-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-3xl font-black text-orange-600 mb-1">攻</div>
                <div className="text-lg font-bold text-slate-800">ウリアゲAIX</div>
                <p className="text-xs text-slate-500 mt-2">営業力強化・売上向上</p>
                <div className="mt-3 flex flex-wrap gap-1 justify-center">
                  <Badge variant="outline" className="text-[10px] border-orange-300 text-orange-600">新規開拓</Badge>
                  <Badge variant="outline" className="text-[10px] border-orange-300 text-orange-600">商談管理</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-blue-200 overflow-hidden">
              <CardContent className="p-4 text-center relative">
                <div className="absolute top-2 right-2">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-blue-600 mb-1">守</div>
                <div className="text-lg font-bold text-slate-800">カクヤクAIX</div>
                <p className="text-xs text-slate-500 mt-2">業務効率化・コスト削減</p>
                <div className="mt-3 flex flex-wrap gap-1 justify-center">
                  <Badge variant="outline" className="text-[10px] border-blue-300 text-blue-600">業務自動化</Badge>
                  <Badge variant="outline" className="text-[10px] border-blue-300 text-blue-600">DX推進</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,120,50,0.3) 0%, transparent 60%)"
          }} />
        </div>
        
        <div className="max-w-2xl mx-auto text-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-32 h-40 mx-auto mb-4"
          >
            <Image
              src="/images/char-victory.jpg"
              alt="AIXマスコット"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            商談を成功に導こう
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            最短3ヶ月で超生産性の筋肉質な組織へ
          </p>
          
          <Link href="/panel">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-10 py-6 text-lg rounded-full shadow-lg shadow-orange-500/30 gap-2"
            >
              コントロールパネルを開く
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 bg-slate-950">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/images/char-icon.jpg"
                alt="AIX"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-slate-400 text-xs font-medium">Sales Closer Control Panel</span>
          </div>
          <p className="text-slate-600 text-xs">
            Powered by AIX
          </p>
        </div>
      </footer>
    </div>
  )
}
