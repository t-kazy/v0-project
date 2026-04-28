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
  Dumbbell,
  Banknote,
  CalendarDays,
  Zap,
  Shield,
  Home,
  Timer,
} from "lucide-react"
import { PreMeetingSection } from "@/components/sections/pre-meeting"
import { RoleplaySection } from "@/components/sections/roleplay"
import { ClosingFlowSection } from "@/components/sections/closing-flow"
import { TalkScriptsSection } from "@/components/sections/talk-scripts"
import { IndustryCasesSection } from "@/components/sections/industry-cases"
import { ObjectionsSection } from "@/components/sections/objections"
import { PricingROISection } from "@/components/sections/pricing-roi"
import { PostMeetingSection } from "@/components/sections/post-meeting"
import { SubsidyApplicationSection } from "@/components/sections/subsidy-application"
import { AvailabilityCalendarSection } from "@/components/sections/availability-calendar"
import { HomeView } from "@/components/home-view"
import { MeetingMemo } from "@/components/meeting-memo"
import { MeetingTimer } from "@/components/meeting-timer"

const tabs = [
  { id: 0, icon: ClipboardCheck,       label: "商談前チェック",   shortLabel: "準備", phase: "before", activeText: "text-blue-600",   activeBorder: "border-blue-500",   activeBg: "bg-blue-600",   mobileBg: "bg-blue-50"   },
  { id: 1, icon: GitBranch,            label: "クロージングフロー", shortLabel: "フロー", phase: "during", activeText: "text-blue-600",   activeBorder: "border-blue-500",   activeBg: "bg-blue-600",   mobileBg: "bg-blue-50"   },
  { id: 2, icon: FileText,             label: "トークスクリプト", shortLabel: "スクリプト", phase: "during", activeText: "text-blue-600",   activeBorder: "border-blue-500",   activeBg: "bg-blue-600",   mobileBg: "bg-blue-50"   },
  { id: 3, icon: Building2,            label: "業種別事例",       shortLabel: "事例", phase: "during", activeText: "text-blue-600",   activeBorder: "border-blue-500",   activeBg: "bg-blue-600",   mobileBg: "bg-blue-50"   },
  { id: 4, icon: MessageSquareWarning, label: "反論QA集",         shortLabel: "反論", phase: "during", activeText: "text-orange-600", activeBorder: "border-orange-500", activeBg: "bg-orange-500", mobileBg: "bg-orange-50" },
  { id: 5, icon: Calculator,           label: "料金・ROI",        shortLabel: "料金", phase: "during", activeText: "text-blue-600",   activeBorder: "border-blue-500",   activeBg: "bg-blue-600",   mobileBg: "bg-blue-50"   },
  { id: 6, icon: CheckCircle2,         label: "商談後チェック",   shortLabel: "事後", phase: "after",  activeText: "text-green-600",  activeBorder: "border-green-500",  activeBg: "bg-green-600",  mobileBg: "bg-green-50"  },
  { id: 7, icon: Dumbbell,             label: "ロープレ(テスト/練習/参考)", shortLabel: "ロープレ", phase: "before", activeText: "text-purple-600", activeBorder: "border-purple-500", activeBg: "bg-purple-600", mobileBg: "bg-purple-50" },
  { id: 8, icon: Banknote,             label: "助成金申請フォーム", shortLabel: "助成金", phase: "during", activeText: "text-emerald-600", activeBorder: "border-emerald-500", activeBg: "bg-emerald-600", mobileBg: "bg-emerald-50" },
  { id: 9, icon: CalendarDays,         label: "稼働カレンダー",   shortLabel: "稼働", phase: "before", activeText: "text-indigo-600", activeBorder: "border-indigo-500", activeBg: "bg-indigo-600", mobileBg: "bg-indigo-50" },
]

const phaseGroups = [
  { label: "商談前", phase: "before", dot: "bg-slate-400",   text: "text-slate-400"   },
  { label: "商談中", phase: "during", dot: "bg-red-500",     text: "text-red-500",    live: true },
  { label: "商談後", phase: "after",  dot: "bg-emerald-500", text: "text-emerald-500" },
]

export default function SalesControlPanel() {
  const [activeTab, setActiveTab] = useState<number | null>(null)
  const isHome = activeTab === null
  const currentTab = activeTab !== null ? tabs[activeTab] : null

  const renderSection = () => {
    switch (activeTab) {
      case 0: return <PreMeetingSection onNavigate={setActiveTab} />
      case 1: return <ClosingFlowSection />
      case 2: return <TalkScriptsSection />
      case 3: return <IndustryCasesSection />
      case 4: return <ObjectionsSection />
      case 5: return <PricingROISection />
      case 6: return <PostMeetingSection />
      case 7: return <RoleplaySection />
      case 8: return <SubsidyApplicationSection />
      case 9: return <AvailabilityCalendarSection />
      default: return null
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#f1f5f9] overflow-hidden">

      {/* ===== TOP HEADER ===== */}
      <header className="flex-shrink-0 z-50 bg-gradient-to-r from-[#0f0a1e] via-[#1a1040] to-[#0d1a3a] border-b border-white/10 shadow-lg">
        <div className="flex items-center justify-between px-4 lg:px-6 py-2.5 lg:py-3">

          {/* Brand */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-white font-bold text-xs lg:text-sm tracking-wide">ウリアゲAIX</span>
            </div>
            <span className="text-white/20 text-xs">×</span>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-white font-bold text-xs lg:text-sm tracking-wide">カクヤクAIX</span>
            </div>
            <div className="hidden lg:block h-4 w-px bg-white/10 mx-1" />
            <span className="hidden lg:block text-white/40 text-xs font-medium tracking-widest uppercase">
              Closer Control Panel
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 lg:gap-3">
            <MeetingTimer />
            <MeetingMemo />
            <div className="hidden lg:flex items-center gap-1.5 text-white/30 text-[10px] font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== BODY ===== */}
      <div className="flex flex-1 min-h-0">

        {/* ===== LEFT SIDEBAR — PC only ===== */}
        <aside className="hidden lg:flex flex-shrink-0 w-56 bg-white border-r border-slate-200 flex-col overflow-y-auto shadow-sm">

          {/* Home */}
          <div className="p-3 border-b border-slate-100">
            <button
              onClick={() => setActiveTab(null)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all
                ${isHome ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"}
              `}
            >
              <Home className="w-4 h-4 flex-shrink-0" />
              <span>ホーム</span>
            </button>
          </div>

          {/* Nav groups */}
          <nav className="flex-1 p-3 space-y-4">
            {phaseGroups.map((group) => (
              <div key={group.phase}>
                <div className="flex items-center gap-2 px-2 mb-1.5">
                  <motion.div
                    className={`w-1.5 h-1.5 rounded-full ${group.dot}`}
                    animate={group.live
                      ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }
                      : { scale: [1, 1.2, 1] }
                    }
                    transition={{ duration: group.live ? 1.2 : 2.5, repeat: Infinity }}
                  />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${group.text}`}>
                    {group.label}
                  </span>
                  {group.live && (
                    <span className="text-[9px] text-red-400 font-bold flex items-center gap-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                      </span>
                      LIVE
                    </span>
                  )}
                </div>
                {tabs.filter((t) => t.phase === group.phase).map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                        transition-all duration-150 mb-1 border-l-2
                        ${isActive
                          ? `bg-slate-50 ${tab.activeText} ${tab.activeBorder} font-bold`
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 border-transparent"
                        }
                      `}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? tab.activeText : ""}`} />
                      <span className="truncate text-left leading-tight">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          <div className="p-3 border-t border-slate-100">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-50">
              <Timer className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] text-slate-400">タイマーはヘッダーから</span>
            </div>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 min-w-0 overflow-y-auto pb-20 lg:pb-0">

          {/* Page title bar */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-2.5 lg:py-3 flex items-center justify-between shadow-sm">
            {isHome ? (
              <h1 className="text-sm lg:text-base font-bold text-slate-800">コンテンツ一覧</h1>
            ) : (
              <div className="flex items-center gap-2 lg:gap-3">
                {/* Back button — mobile only */}
                <button
                  onClick={() => setActiveTab(null)}
                  className="lg:hidden w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <Home className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <div className={`w-1 h-5 lg:h-6 rounded-full ${currentTab?.activeBg}`} />
                <h1 className="text-sm lg:text-base font-bold text-slate-800">{currentTab?.label}</h1>
              </div>
            )}
            {!isHome && (
              <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                {(activeTab ?? 0) + 1} / {tabs.length}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab ?? "home"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {isHome
                  ? <HomeView onNavigate={(id) => setActiveTab(id)} />
                  : <div className="max-w-4xl mx-auto">{renderSection()}</div>
                }
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* ===== BOTTOM NAV — mobile only ===== */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-t border-slate-100 safe-area-bottom shadow-[0_-2px_16px_rgba(0,0,0,0.06)]">
        <div className="flex justify-around items-stretch py-1 px-0">

          {/* Home */}
          <button
            onClick={() => setActiveTab(null)}
            className={`
              flex flex-col items-center justify-center py-2 px-1 rounded-xl mx-0.5
              transition-all duration-200 min-w-0 flex-1 relative
              ${isHome ? "text-slate-700" : "text-slate-400 hover:text-slate-600"}
            `}
          >
            {isHome && (
              <motion.div layoutId="activeTabBg" className="absolute inset-0 rounded-xl bg-slate-100"
                transition={{ type: "spring", bounce: 0.18, duration: 0.32 }} />
            )}
            {isHome && <div className="absolute -top-px left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-slate-500" />}
            <Home className="w-5 h-5 relative z-10" />
            <span className={`text-[9px] mt-0.5 font-medium relative z-10 ${isHome ? "font-bold" : ""}`}>ホーム</span>
          </button>

          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex flex-col items-center justify-center py-2 px-1 rounded-xl mx-0.5
                  transition-all duration-200 min-w-0 flex-1 relative
                  ${isActive ? `${tab.mobileBg} ${tab.activeText}` : "text-slate-400 hover:text-slate-600"}
                `}
              >
                {isActive && (
                  <motion.div layoutId="activeTabBg" className={`absolute inset-0 rounded-xl ${tab.mobileBg}`}
                    transition={{ type: "spring", bounce: 0.18, duration: 0.32 }} />
                )}
                {isActive && <div className={`absolute -top-px left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full ${tab.activeBg}`} />}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? tab.activeText : ""}`} />
                <span className={`text-[9px] mt-0.5 font-medium truncate relative z-10 ${isActive ? `${tab.activeText} font-bold` : ""}`}>
                  {tab.shortLabel}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

    </div>
  )
}
