"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ClipboardCheck,
  GitBranch,
  FileText,
  Building2,
  MessageSquareWarning,
  Calculator,
  CheckCircle2,
  Zap,
  Shield,
} from "lucide-react"
import { PreMeetingSection } from "@/components/sections/pre-meeting"
import { ClosingFlowSection } from "@/components/sections/closing-flow"
import { TalkScriptsSection } from "@/components/sections/talk-scripts"
import { IndustryCasesSection } from "@/components/sections/industry-cases"
import { ObjectionsSection } from "@/components/sections/objections"
import { PricingROISection } from "@/components/sections/pricing-roi"
import { PostMeetingSection } from "@/components/sections/post-meeting"
import { MascotIcon } from "@/components/mascot"

const tabs = [
  {
    id: 0,
    label: "準備",
    icon: ClipboardCheck,
    fullLabel: "商談前チェック",
    color: "text-blue-600",
    bg: "bg-blue-50",
    activeBg: "bg-blue-600",
  },
  {
    id: 1,
    label: "フロー",
    icon: GitBranch,
    fullLabel: "クロージングフロー",
    color: "text-blue-600",
    bg: "bg-blue-50",
    activeBg: "bg-blue-600",
  },
  {
    id: 2,
    label: "スクリプト",
    icon: FileText,
    fullLabel: "トークスクリプト",
    color: "text-blue-600",
    bg: "bg-blue-50",
    activeBg: "bg-blue-600",
  },
  {
    id: 3,
    label: "事例",
    icon: Building2,
    fullLabel: "業種別事例",
    color: "text-blue-600",
    bg: "bg-blue-50",
    activeBg: "bg-blue-600",
  },
  {
    id: 4,
    label: "反論",
    icon: MessageSquareWarning,
    fullLabel: "反論QA集",
    color: "text-orange-600",
    bg: "bg-orange-50",
    activeBg: "bg-orange-500",
  },
  {
    id: 5,
    label: "料金",
    icon: Calculator,
    fullLabel: "料金・ROI",
    color: "text-blue-600",
    bg: "bg-blue-50",
    activeBg: "bg-blue-600",
  },
  {
    id: 6,
    label: "事後",
    icon: CheckCircle2,
    fullLabel: "商談後チェック",
    color: "text-green-600",
    bg: "bg-green-50",
    activeBg: "bg-green-600",
  },
]

export default function SalesControlPanel() {
  const [activeTab, setActiveTab] = useState(0)
  const currentTab = tabs[activeTab]

  const renderSection = () => {
    switch (activeTab) {
      case 0: return <PreMeetingSection />
      case 1: return <ClosingFlowSection />
      case 2: return <TalkScriptsSection />
      case 3: return <IndustryCasesSection />
      case 4: return <ObjectionsSection />
      case 5: return <PricingROISection />
      case 6: return <PostMeetingSection />
      default: return <PreMeetingSection />
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-foreground">

      {/* ===== STICKY HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">

        {/* Brand bar */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MascotIcon size={22} glow />
            <span className="text-white text-xs font-bold tracking-wide">
              ウリアゲAIX × カクヤクAIX
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-orange-300 text-[10px] font-bold">
              <Zap className="w-3 h-3" />
              <span>攻</span>
            </div>
            <span className="text-white/30 text-[10px]">|</span>
            <div className="flex items-center gap-1 text-blue-200 text-[10px] font-bold">
              <Shield className="w-3 h-3" />
              <span>守</span>
            </div>
          </div>
        </div>

        {/* Section title */}
        <div className="px-4 py-2.5 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-5 rounded-full ${currentTab.activeBg}`} />
            <h1 className="text-sm font-bold text-slate-800">
              {currentTab.fullLabel}
            </h1>
          </div>
          <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
            {activeTab + 1} / {tabs.length}
          </span>
        </div>

      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="pb-28 px-4 py-4 max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ===== FIXED BOTTOM NAVIGATION ===== */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-t border-slate-100 safe-area-bottom shadow-[0_-2px_16px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-stretch py-1 px-0 max-w-xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex flex-col items-center justify-center py-2 px-1
                  rounded-xl mx-0.5 transition-all duration-200
                  min-w-0 flex-1 relative
                  ${isActive
                    ? `${tab.bg} ${tab.color}`
                    : "text-slate-400 hover:text-slate-600"
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className={`absolute inset-0 rounded-xl ${tab.bg}`}
                    transition={{ type: "spring", bounce: 0.18, duration: 0.32 }}
                  />
                )}
                {isActive && (
                  <div className={`absolute -top-px left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full ${tab.activeBg}`} />
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? tab.color : ""}`} />
                <span className={`text-[9px] mt-0.5 font-medium truncate relative z-10 ${isActive ? `${tab.color} font-bold` : ""}`}>
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
