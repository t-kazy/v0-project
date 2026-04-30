"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Banknote, ExternalLink, AlertCircle, UserPlus, MessageCircle, ClipboardList, CheckCircle2, FileCheck, Users } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSesav2xsIoGN7X5wi8qXhjN1AuvBsWHA5Ds_PWmtAyuxrUGkw/viewform"
const FORM_EMBED_URL = `${FORM_URL}?embedded=true`
const FORM_SHORT_URL = "https://forms.gle/ozXzF9WmQjigiGa57"

const LINE_KANAYA_URL = "https://line.me/ti/p/4tkj6J8AUe"
const LINE_HADA_URL = "https://line.me/ti/p/CVFCgU7gF8"
const LINE_OHNO_URL = "https://line.me/ti/p/LgTkPmbUxu"

const GROUP_NAME_TEMPLATE = "【AIX研修】株式会社〇〇様"

const COMPLETION_REPORT_TEMPLATE = `・面談実施済み
・助成金要件確認済み
・Googleフォーム入力完了`

const formPages = [
  { num: 1, label: "説明 / 企業様名" },
  { num: 2, label: "助成金対象チェック" },
  { num: 3, label: "申込・企業情報入力" },
  { num: 4, label: "紹介者（クローザー）情報入力", note: "※個別面談の担当者(クローザー)と紹介元が違うときは両方記入" },
]

export function SubsidyApplicationSection() {
  return (
    <div className="space-y-4">

      {/* ===== PURPOSE / OVERVIEW CARD ===== */}
      <Card className="border-amber-200 shadow-sm bg-amber-50/50 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            助成金案件 クローザー対応フロー
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-2">
          <p className="text-xs text-slate-700 leading-relaxed">
            助成金案件の面談において、<span className="font-bold text-amber-700">要件確認および社内連携・助成金案内開始まで</span>をスムーズに行うためのフローです。
          </p>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <div className="bg-white border border-amber-200 rounded-lg p-2 text-center">
              <p className="text-[9px] font-bold text-amber-600 uppercase">面談前</p>
              <p className="text-[10px] text-slate-600 mt-0.5">準備</p>
            </div>
            <div className="bg-white border border-amber-200 rounded-lg p-2 text-center">
              <p className="text-[9px] font-bold text-amber-600 uppercase">面談時</p>
              <p className="text-[10px] text-slate-600 mt-0.5">ヒアリング</p>
            </div>
            <div className="bg-white border border-amber-200 rounded-lg p-2 text-center">
              <p className="text-[9px] font-bold text-amber-600 uppercase">面談後</p>
              <p className="text-[10px] text-slate-600 mt-0.5">社内連携</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== PRE-MEETING CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-blue-600" />
            面談前に必ず行うこと
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-3">

          {/* STEP 1 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-[11px] font-black">1</span>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-bold text-slate-800 leading-snug">Googleフォームを開いておく</p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                面談中にヒアリングしながら入力します
              </p>
              <a
                href={FORM_SHORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-[11px] font-bold hover:bg-blue-100 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                フォームを別タブで開く
              </a>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-[11px] font-black">2</span>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-bold text-slate-800 leading-snug">LINEグループを新設しておく</p>
              <div className="mt-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 mb-1">グループ名</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-[11px] bg-white border border-slate-200 px-2 py-1 rounded font-mono text-slate-800">
                    {GROUP_NAME_TEMPLATE}
                  </code>
                  <CopyButton text={GROUP_NAME_TEMPLATE} />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">※「〇〇」に顧客企業名を入れて作成</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== DURING MEETING CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-orange-500 to-red-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-orange-600" />
            面談時の対応
          </CardTitle>
          <p className="text-[10px] text-slate-500 mt-1">
            助成金説明後、申請希望された場合
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-3">

          {/* STEP 1 - Form entry */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-[11px] font-black">1</span>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-bold text-slate-800 leading-snug">
                Googleフォームに必要事項を入力
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                ヒアリングしながら入力。要件がすべて満たされていることを確認のうえ進行する。
              </p>
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-[11px] font-bold text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  要件未確認のまま確約しないこと
                </p>
              </div>
              <div className="mt-2 bg-slate-50 border border-slate-200 rounded-lg p-2">
                <p className="text-[10px] font-bold text-slate-500 mb-1.5">フォーム構成（全4ページ）</p>
                <div className="space-y-1">
                  {formPages.map((p) => (
                    <div key={p.num} className="flex items-start gap-2">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-4 h-4 rounded bg-orange-100 text-orange-700 text-[9px] font-black">
                        {p.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-slate-700 leading-tight">{p.label}</p>
                        {p.note && <p className="text-[9px] text-orange-600 leading-tight mt-0.5">{p.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 - LINE invite */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-[11px] font-black">2</span>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-bold text-slate-800 leading-snug flex items-center gap-1.5">
                <UserPlus className="w-3 h-3 text-slate-500" />
                顧客をLINEグループへ招待
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                受講企業の担当者様・受講生を、その場でグループへ招待する
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== POST-MEETING CARD ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            面談後の対応
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-3">

          {/* STEP 1 - Invite internal members */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-[11px] font-black">1</span>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-bold text-slate-800 leading-snug flex items-center gap-1.5">
                <Users className="w-3 h-3 text-slate-500" />
                社内メンバーをグループへ招待
              </p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                下記メンバーを追加してください
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <a
                  href={LINE_KANAYA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[11px] font-bold shadow-sm hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-3 h-3" />
                  金谷 を追加
                </a>
                <a
                  href={LINE_HADA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[11px] font-bold shadow-sm hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-3 h-3" />
                  波田 を追加
                </a>
                <a
                  href={LINE_OHNO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[11px] font-bold shadow-sm hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-3 h-3" />
                  大野 を追加
                </a>
              </div>
            </div>
          </div>

          {/* STEP 2 - Report completion */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-[11px] font-black">2</span>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-xs font-bold text-slate-800 leading-snug">Googleフォーム入力完了の報告</p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                LINEグループへ以下の旨を投稿
              </p>
              <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-start justify-between gap-2">
                  <pre className="flex-1 text-[11px] text-slate-800 leading-relaxed font-sans whitespace-pre-wrap">{COMPLETION_REPORT_TEMPLATE}</pre>
                  <CopyButton text={COMPLETION_REPORT_TEMPLATE} />
                </div>
              </div>
            </div>
          </div>

          {/* Completion notice */}
          <div className="mt-2 p-2.5 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-[11px] text-green-800 leading-relaxed">
              <span className="font-bold">ここまででクローザー対応は完了。</span><br />
              以降は<span className="font-bold">秘書チーム</span>にて助成金案内 / CSへの共有を開始します。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ===== FORM CARD (EMBED) ===== */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Banknote className="w-4 h-4 text-emerald-600" />
            リスキリング助成金 申込・事前確認フォーム
          </CardTitle>
          <p className="text-[10px] text-slate-500 mt-1">
            お客様情報を入力して送信してください
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-3">

          {/* Embedded form */}
          <div className="relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50" style={{ height: "720px" }}>
            <iframe
              src={FORM_EMBED_URL}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              title="リスキリング助成金 申込・事前確認フォーム"
            >
              読み込み中…
            </iframe>
          </div>

          {/* Open in new tab button (below form) */}
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-sm hover:shadow-md transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            別タブでフォームを開く
          </a>
          <p className="text-[10px] text-slate-400 text-center">
            ※ 埋め込みが表示されない場合は上のボタンから別タブで開いてください
          </p>
        </CardContent>
      </Card>

    </div>
  )
}
