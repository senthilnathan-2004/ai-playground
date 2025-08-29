"use client"

import { cn } from "@/lib/utils"

export function ChatBubble(props: { role: "user" | "assistant"; content: string; ts?: number }) {
  const { role, content, ts } = props
  const isUser = role === "user"
  return (
    <div
      className={cn("group relative max-w-full", "flex", isUser ? "justify-end" : "justify-start")}
      role="group"
      aria-label={`${role} message`}
    >
      <div
        className={cn(
          "rounded-lg px-3 py-2 text-sm shadow-sm transition",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {ts && (
          <time
            className={cn("mt-1 block text-[10px]", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}
          >
            {new Date(ts).toLocaleTimeString()}
          </time>
        )}
      </div>
    </div>
  )
}
