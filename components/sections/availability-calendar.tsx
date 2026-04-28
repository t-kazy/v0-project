"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, CalendarPlus, ExternalLink, Users, AlertCircle, AlertTriangle } from "lucide-react"

const CALENDAR_ID = "utsuseba.staff@gmail.com"
const CALENDAR_ID_ENC = encodeURIComponent(CALENDAR_ID)

const EVENT_CREATE_URL =
  "https://calendar.google.com/calendar/u/0/r/eventedit" +
  `?text=${encodeURIComponent("【氏名】対応可")}` +
  `&details=${encodeURIComponent("対応可能商談数:\n連絡可な時間帯:\nメモ:")}` +
  `&src=${CALENDAR_ID_ENC}`

const CALENDAR_EMBED_URL =
  `https://calendar.google.com/calendar/embed?src=${CALENDAR_ID_ENC}` +
  "&mode=WEEK&ctz=Asia%2FTokyo"

const CALENDAR_OPEN_URL =
  `https://calendar.google.com/calendar/u/0/r?cid=${CALENDAR_ID_ENC}`

export function AvailabilityCalendarSection() {
  return (
    <div className="space-y-4">

      {/* ===== INFO CARD ===== */}
      <Card className="border-purple-200 shadow-sm bg-purple-50/50 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-purple-600" />
            稼働カレンダー登録について
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-2">
          <p className="text-xs text-slate-700 leading-relaxed">
            商談前チェック・ロープレテストを<span className="font-bold text-purple-700">B判定以上</span>でクリアしたら、
            ウツセバ共有カレンダーへご自身の<span className="font-bold">稼働可能枠</span>を登録してください。
          </p>
          <div className="bg-white border border-purple-100 rounded-lg p-2.5 space-y-1.5">
            <p className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">入力ルール</p>
            <ul className="text-[11px] text-slate-700 space-y-1">
              <li className="flex gap-1.5"><span className="text-purple-400">•</span><span>タイトル: <span className="font-mono bg-slate-100 px-1.5 rounded">【氏名】対応可</span></span></li>
              <li className="flex gap-1.5"><span className="text-purple-400">•</span><span>終日 or 時間枠を指定</span></li>
              <li className="flex gap-1.5"><span className="text-purple-400">•</span><span>メモに「対応可能商談数」「連絡可な時間帯」を記入</span></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* ===== CLOSER REGISTRATION CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <CalendarPlus className="w-4 h-4 text-indigo-600" />
            クローザー: 稼働枠を登録
          </CardTitle>
          <p className="text-[10px] text-slate-500 mt-1">
            ボタンから Google カレンダーのイベント作成画面が開きます
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-3">

          {/* Step-by-step guide */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 bg-indigo-400 rounded-full" />
              登録手順 STEP 1〜4
            </p>

            {/* STEP 1 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[11px] font-black">1</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs font-bold text-slate-800 leading-snug">タイトルを入力</p>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  <span className="font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px]">【氏名】対応可</span> の形式で入力<br />
                  <span className="text-slate-400">例: 【山田太郎】対応可</span>
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[11px] font-black">2</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs font-bold text-slate-800 leading-snug">日時を設定</p>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  1時間単位 or 終日で指定<br />
                  <span className="text-slate-400">毎週同じ時間帯なら「繰り返し」設定が便利</span>
                </p>
              </div>
            </div>

            {/* STEP 3 - HIGHLIGHTED */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[11px] font-black">3</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-amber-700 leading-snug">保存先カレンダーを変更</p>
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                </div>
                <div className="mt-1 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-[11px] text-slate-700 leading-relaxed">
                    初期値は自分のカレンダーなので、<br />
                    <span className="font-bold text-amber-700">「utsuseba.staff」カレンダー</span>に変更してください
                  </p>
                  <p className="text-[10px] text-amber-600 mt-1">
                    ※ここを変えないと運営側に表示されません
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-sm">
                <span className="text-white text-[11px] font-black">4</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs font-bold text-slate-800 leading-snug">メモ欄に追加情報を記入 → 保存</p>
                <ul className="text-[11px] text-slate-600 mt-0.5 space-y-0.5">
                  <li className="flex gap-1.5"><span className="text-indigo-400">•</span><span>対応可能商談数</span></li>
                  <li className="flex gap-1.5"><span className="text-indigo-400">•</span><span>連絡可な時間帯</span></li>
                  <li className="flex gap-1.5"><span className="text-indigo-400">•</span><span>対応可能エリア (オンライン/対面)</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href={EVENT_CREATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
          >
            <CalendarPlus className="w-4 h-4" />
            カレンダーに稼働枠を追加する
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            ※ 事前にウツセバカレンダー (utsuseba.staff@gmail.com) への<br />
            編集権限が付与されている必要があります
          </p>
        </CardContent>
      </Card>

      {/* ===== OPS OVERVIEW CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            運営: クローザー稼働状況
          </CardTitle>
          <p className="text-[10px] text-slate-500 mt-1">
            全クローザーの稼働可能枠を一覧で確認 → 案件アサインに活用
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-3">
          <div className="relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50" style={{ height: "720px" }}>
            <iframe
              src={CALENDAR_EMBED_URL}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              scrolling="no"
              title="クローザー稼働カレンダー"
            >
              読み込み中…
            </iframe>
          </div>
          <a
            href={CALENDAR_OPEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            Googleカレンダーで開く
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
          <p className="text-[10px] text-slate-400 text-center">
            ※ 埋め込みが表示されない場合は閲覧権限が付与されているかご確認ください
          </p>
        </CardContent>
      </Card>

    </div>
  )
}
