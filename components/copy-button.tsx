"use client"

import { Copy, Check } from "lucide-react"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      className={`
        inline-flex items-center gap-1.5 min-h-[36px] px-3 rounded-lg text-xs font-bold
        transition-all duration-150
        ${copied
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 active:scale-95"
        }
        ${className ?? ""}
      `}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>コピー済み</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>コピー</span>
        </>
      )}
    </button>
  )
}
