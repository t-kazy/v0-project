"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, TrendingUp, CheckCircle, Award, ChevronDown, ChevronUp, ToggleLeft, ToggleRight, Info } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

// 助成金: 人材開発支援助成金
const SUBSIDY_PER_PERSON = 300_000   // 経費助成75% + 賃金助成
const PRICE_PER_PERSON   = 400_000   // 定価
const PRICE_WITH_SUBSIDY = 100_000   // 助成金適用後
const ADMIN_REDUCTION    = 0.50      // 事務作業削減率（保守的）
const CLOSE_RATE_UPLIFT  = 0.20      // 成約率改善幅（保守的）

const implementationSteps = [
  { step: 1, title: "お申し込み・ご契約",   duration: "当日〜数日",   desc: "受講者名・人数を確定し、契約書を締結" },
  { step: 2, title: "助成金申請サポート",   duration: "2〜4週間",     desc: "500社・承認率100%の実績。安心してお任せください" },
  { step: 3, title: "キックオフ",           duration: "1〜2週間以内", desc: "受講者全員でスタートミーティング・目標設定" },
  { step: 4, title: "研修・実践（3ヶ月）", duration: "週1回30分",    desc: "Eラーニング + 週次ミーティング + 平日チャットサポート" },
  { step: 5, title: "修了・効果確認",       duration: "3ヶ月後",      desc: "成果レビュー・助成金受給申請" },
  { step: 6, title: "助成金受給",           duration: "数ヶ月後",     desc: "審査通過後、補助額が口座に振り込まれる" },
]

const keyMetrics = [
  { label: "継続利用率", value: "95%",    icon: "🔄", color: "text-blue-600",   bg: "bg-blue-50"   },
  { label: "売上向上",   value: "最大3倍", icon: "📈", color: "text-orange-600", bg: "bg-orange-50" },
  { label: "事務作業削減", value: "最大90%", icon: "⚡", color: "text-green-600", bg: "bg-green-50"  },
  { label: "助成金承認率", value: "100%",   icon: "🏆", color: "text-blue-600",   bg: "bg-blue-50"   },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const fmt = (n: number) =>
  new Intl.NumberFormat("ja-JP", {
    style: "currency", currency: "JPY", maximumFractionDigits: 0,
  }).format(n)

const fmtM = (n: number) => {
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}億円`
  if (n >= 10_000)       return `${Math.round(n / 10_000)}万円`
  return fmt(n)
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PricingROISection() {
  // --- inputs ---
  const [staffCount,    setStaffCount]    = useState(5)
  const [overtimeHours, setOvertimeHours] = useState(20)
  const [hourlyRate,    setHourlyRate]    = useState(2500)
  const [monthlyMeetings, setMonthlyMeetings] = useState(30)
  const [closeRate,     setCloseRate]     = useState(20)       // %
  const [avgDealValue,  setAvgDealValue]  = useState(300_000)  // 円
  const [monthlyRevenue, setMonthlyRevenue] = useState(3_000_000) // 円（参考）

  // --- toggles ---
  const [subsidyEnabled, setSubsidyEnabled] = useState(true)
  const [showSubsidyDetail, setShowSubsidyDetail] = useState(false)
  const [showFlow, setShowFlow] = useState(false)

  // --- derived: 事務削減効果 ---
  const monthlyAdminCost     = staffCount * overtimeHours * hourlyRate
  const monthlyAdminSaving   = monthlyAdminCost * ADMIN_REDUCTION
  const annualAdminSaving    = monthlyAdminSaving * 12

  // --- derived: 売上向上効果 ---
  const newCloseRate         = closeRate * (1 + CLOSE_RATE_UPLIFT)         // %
  const addedDealsPerMonth   = monthlyMeetings * ((newCloseRate - closeRate) / 100)
  const monthlyRevUpside     = addedDealsPerMonth * avgDealValue
  const annualRevUpside      = monthlyRevUpside * 12

  // --- total ---
  const annualTotalEffect    = annualAdminSaving + annualRevUpside

  // --- investment ---
  const pricePerPerson       = subsidyEnabled ? PRICE_WITH_SUBSIDY : PRICE_PER_PERSON
  const totalInvestment      = staffCount * pricePerPerson
  const subsidySaving        = subsidyEnabled ? staffCount * SUBSIDY_PER_PERSON : 0

  // --- ROI ---
  const monthlyEffect        = monthlyAdminSaving + monthlyRevUpside
  const roiMonths            = monthlyEffect > 0 ? Math.ceil(totalInvestment / monthlyEffect) : 0

  // --- 5-year ---
  const fiveYearNet          = annualTotalEffect * 5 - totalInvestment

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

      {/* ===== PRICING CARD ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-orange-400 to-red-500" />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-bold text-slate-800">料金プラン</h3>
          </div>

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

          <div className="bg-orange-50 border border-orange-100 rounded-xl p-2.5 text-center mb-3">
            <span className="text-xs font-bold text-orange-600">
              社長・代表者は受講料
              <span className="text-orange-700 text-sm mx-1">無料</span>
              ・月額費用なし
            </span>
          </div>

          {/* 助成金アコーディオン */}
          <button
            onClick={() => setShowSubsidyDetail(!showSubsidyDetail)}
            className="w-full flex items-center justify-between p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-xs font-bold"
          >
            <span>助成金（人材開発支援助成金）の詳細</span>
            {showSubsidyDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {showSubsidyDetail && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  {[
                    { label: "受講料",          val: "¥400,000",  highlight: false },
                    { label: "経費助成（75%）", val: "▲¥240,000", highlight: true  },
                    { label: "賃金助成",        val: "▲¥60,000",  highlight: true  },
                    { label: "実質負担",        val: "¥100,000",  highlight: false, bold: true },
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ===== ROI CALCULATOR ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-bold text-slate-800">ROI計算機</h3>
            </div>
            {/* 助成金トグル */}
            <button
              onClick={() => setSubsidyEnabled(!subsidyEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                subsidyEnabled
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
            >
              {subsidyEnabled
                ? <ToggleRight className="w-4 h-4 text-blue-500" />
                : <ToggleLeft className="w-4 h-4 text-slate-400" />}
              助成金
              <span className={subsidyEnabled ? "text-blue-500" : "text-slate-400"}>
                {subsidyEnabled ? "あり" : "なし"}
              </span>
            </button>
          </div>

          {/* --- Input section header --- */}
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">現状の数字を入力</p>

          <div className="space-y-3">

            {/* Section: 組織規模 */}
            <div className="bg-slate-50 rounded-xl p-3 space-y-3">
              <p className="text-[10px] font-bold text-slate-500">組織規模</p>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500 font-medium">対象人数（名）</label>
                  <NumberInput
                    value={staffCount}
                    onChange={setStaffCount}
                    min={1} step={1}
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-medium">月間残業（h/名）</label>
                  <NumberInput
                    value={overtimeHours}
                    onChange={setOvertimeHours}
                    min={0} step={5}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 font-medium">時給換算（円）</label>
                <NumberInput
                  value={hourlyRate}
                  onChange={setHourlyRate}
                  min={0} step={100}
                  prefix="¥"
                />
              </div>
            </div>

            {/* Section: 営業数値 */}
            <div className="bg-slate-50 rounded-xl p-3 space-y-3">
              <p className="text-[10px] font-bold text-slate-500">営業数値</p>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500 font-medium">月間商談数（件）</label>
                  <NumberInput
                    value={monthlyMeetings}
                    onChange={setMonthlyMeetings}
                    min={0} step={5}
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-medium">現在の成約率（%）</label>
                  <NumberInput
                    value={closeRate}
                    onChange={(v) => setCloseRate(Math.min(100, v))}
                    min={0} max={100} step={1}
                    suffix="%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500 font-medium">平均成約単価（円）</label>
                  <NumberInput
                    value={avgDealValue}
                    onChange={setAvgDealValue}
                    min={0} step={10000}
                    prefix="¥"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-medium">月間売上（円）※参考</label>
                  <NumberInput
                    value={monthlyRevenue}
                    onChange={setMonthlyRevenue}
                    min={0} step={100000}
                    prefix="¥"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- Results --- */}
          <div className="mt-4 space-y-3">

            {/* 投資額 */}
            <div className={`rounded-xl p-3 border ${subsidyEnabled ? "bg-blue-50 border-blue-100" : "bg-slate-50 border-slate-100"}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600">導入コスト（{staffCount}名）</span>
                <div className="flex items-center gap-1">
                  {subsidyEnabled && (
                    <span className="text-[9px] bg-blue-500 text-white font-bold px-1.5 py-0.5 rounded">助成金適用</span>
                  )}
                </div>
              </div>

              {subsidyEnabled ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>通常価格</span>
                    <span className="line-through">{fmtM(staffCount * PRICE_PER_PERSON)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-green-600 font-bold">
                    <span>助成金補助額</span>
                    <span>▲ {fmtM(subsidySaving)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-blue-700 pt-1 border-t border-blue-200">
                    <span>実質負担</span>
                    <span>{fmtM(totalInvestment)}</span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between text-sm font-black text-slate-700">
                  <span>通常価格</span>
                  <span>{fmtM(totalInvestment)}</span>
                </div>
              )}
            </div>

            {/* 効果内訳 */}
            <div className="bg-gradient-to-br from-slate-50 to-emerald-50 border border-emerald-100 rounded-xl p-3 space-y-2.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">年間効果内訳</p>

              <div className="space-y-2">
                <EffectRow
                  label="事務削減効果"
                  sub={`残業${ADMIN_REDUCTION * 100}%削減想定`}
                  monthly={monthlyAdminSaving}
                  annual={annualAdminSaving}
                  color="text-blue-600"
                />
                <EffectRow
                  label="売上向上効果"
                  sub={`成約率 ${closeRate}% → ${newCloseRate.toFixed(1)}%`}
                  monthly={monthlyRevUpside}
                  annual={annualRevUpside}
                  color="text-orange-600"
                />
              </div>

              <div className="border-t border-emerald-200 pt-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">年間合計効果</span>
                  <span className="text-2xl font-black text-emerald-700">{fmtM(annualTotalEffect)}</span>
                </div>
              </div>

              {/* ROI */}
              {monthlyEffect > 0 && (
                <div className="bg-white rounded-xl p-3 border border-emerald-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-xs font-bold text-slate-700">投資回収期間</span>
                    </div>
                    <span className="text-xl font-black text-emerald-700">
                      {roiMonths}<span className="text-sm font-bold text-emerald-500">ヶ月</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="text-[11px] text-slate-500">5年間累計純利益</span>
                    <span className={`text-base font-black ${fiveYearNet > 0 ? "text-emerald-700" : "text-red-500"}`}>
                      {fiveYearNet > 0 ? "+" : ""}{fmtM(fiveYearNet)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 助成金あり/なし 比較 */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="flex items-center gap-1.5 mb-2">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-[10px] font-bold text-slate-500">助成金あり/なし 比較</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "助成金あり", inv: staffCount * PRICE_WITH_SUBSIDY, active: subsidyEnabled },
                  { label: "助成金なし", inv: staffCount * PRICE_PER_PERSON, active: !subsidyEnabled },
                ].map((col) => {
                  const recovery = monthlyEffect > 0 ? Math.ceil(col.inv / monthlyEffect) : 0
                  return (
                    <div key={col.label} className={`rounded-xl p-2.5 border text-center transition-all ${col.active ? "bg-white border-blue-200 shadow-sm" : "bg-slate-100 border-slate-200"}`}>
                      <p className={`text-[10px] font-bold mb-1 ${col.active ? "text-blue-700" : "text-slate-500"}`}>{col.label}</p>
                      <p className={`text-sm font-black ${col.active ? "text-blue-700" : "text-slate-400"}`}>{fmtM(col.inv)}</p>
                      <p className="text-[9px] text-slate-400 mt-1">回収 {recovery}ヶ月</p>
                    </div>
                  )
                })}
              </div>
              {monthlyEffect > 0 && (
                <p className="text-[10px] text-emerald-600 font-bold text-center mt-2">
                  助成金で {staffCount * SUBSIDY_PER_PERSON >= 10_000 ? `${Math.round(staffCount * SUBSIDY_PER_PERSON / 10_000)}万円` : fmt(staffCount * SUBSIDY_PER_PERSON)} お得・回収が {Math.ceil((staffCount * PRICE_PER_PERSON) / monthlyEffect) - roiMonths}ヶ月早い
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== IMPLEMENTATION FLOW ===== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-700" />
        <button
          className="w-full flex items-center justify-between p-4"
          onClick={() => setShowFlow(!showFlow)}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">導入フロー</h3>
          </div>
          {showFlow ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        <AnimatePresence>
          {showFlow && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
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

                <div className="mt-3 bg-slate-800 rounded-xl p-3.5">
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    「まず申込いただいたら助成金の手続きを一緒に進めます。500社すべて通っているので、そこは心配いりません。あとは<span className="text-white font-bold">3ヶ月、週1回30分</span>だけお時間いただければ、残りは現場で実践するだけです。」
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function NumberInput({
  value, onChange, min = 0, max, step = 1, prefix, suffix,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
}) {
  return (
    <div className="relative mt-1">
      {prefix && (
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value) || 0
          const clamped = max !== undefined ? Math.min(max, Math.max(min, v)) : Math.max(min, v)
          onChange(clamped)
        }}
        min={min}
        max={max}
        step={step}
        className={`w-full h-9 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all ${prefix ? "pl-6" : "pl-3"} ${suffix ? "pr-7" : "pr-3"}`}
      />
      {suffix && (
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  )
}

function EffectRow({
  label, sub, monthly, annual, color,
}: {
  label: string
  sub: string
  monthly: number
  annual: number
  color: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-700">{label}</p>
        <p className="text-[10px] text-slate-400">{sub}</p>
      </div>
      <div className="text-right flex-shrink-0 ml-2">
        <p className={`text-sm font-black ${color}`}>{fmtM(annual)}<span className="text-[10px] font-normal text-slate-400">/年</span></p>
        <p className="text-[10px] text-slate-400">{fmtM(monthly)}/月</p>
      </div>
    </div>
  )
}
