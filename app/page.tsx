"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ClipboardCheck,
  GitBranch,
  FileText,
  Building2,
  MessageSquareWarning,
  Calculator,
  CheckCircle2,
} from "lucide-react"
import { PreMeetingSection } from "@/components/sections/pre-meeting"
import { ClosingFlowSection } from "@/components/sections/closing-flow"
import { TalkScriptsSection } from "@/components/sections/talk-scripts"
import { IndustryCasesSection } from "@/components/sections/industry-cases"
import { ObjectionsSection } from "@/components/sections/objections"
import { PricingROISection } from "@/components/sections/pricing-roi"
import { PostMeetingSection } from "@/components/sections/post-meeting"

const tabs = [
  { id: 0, label: "準備", icon: ClipboardCheck, fullLabel: "商談前チェック" },
  { id: 1, label: "フロー", icon: GitBranch, fullLabel: "クロージングフロー" },
  { id: 2, label: "スクリプト", icon: FileText, fullLabel: "トークスクリプト" },
  { id: 3, label: "事例", icon: Building2, fullLabel: "業種別事例" },
  { id: 4, label: "反論", icon: MessageSquareWarning, fullLabel: "反論QA" },
  { id: 5, label: "料金", icon: Calculator, fullLabel: "料金・ROI" },
  { id: 6, label: "事後", icon: CheckCircle2, fullLabel: "商談後チェック" },
]

export default function SalesControlPanel() {
  const [activeTab, setActiveTab] = useState(0)

  const renderSection = () => {
    switch (activeTab) {
      case 0:
        return <PreMeetingSection />
      case 1:
        return <ClosingFlowSection />
      case 2:
        return <TalkScriptsSection />
      case 3:
        return <IndustryCasesSection />
      case 4:
        return <ObjectionsSection />
      case 5:
        return <PricingROISection />
      case 6:
        return <PostMeetingSection />
      default:
        return <PreMeetingSection />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Header with Mascot */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-border shadow-lg">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/images/mascot-thumbsup.png"
                alt="AIXマスコット"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">{tabs[activeTab].fullLabel}</h1>
              <p className="text-[10px] text-orange-400 font-medium">セールスクローザー コントロールパネル</p>
            </div>
          </div>
          <div className="relative w-20 h-10 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="ウリアゲAIX カクヤク"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24 px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.1)] safe-area-bottom">
        <div className="flex justify-around items-center py-2 px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-orange-600" : ""}`} />
                <span className={`text-[10px] mt-1 truncate ${isActive ? "font-semibold text-orange-600" : ""}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
