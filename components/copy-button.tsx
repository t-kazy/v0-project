"use client"

import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

interface CopyButtonProps {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => copy(text)}
      className={`gap-2 ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-accent" />
          <span className="text-accent">コピー済み</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>コピー</span>
        </>
      )}
    </Button>
  )
}
