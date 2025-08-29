"use client"

import { useAppState } from "@/contexts/app-state"
import { ChatBubble } from "@/components/chat-bubble"

export function ChatOutput() {
  const { messages } = useAppState()

  function copyAll() {
    const text = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")
    navigator.clipboard.writeText(text).catch(() => {})
  }

  function downloadJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2))
    const a = document.createElement("a")
    a.href = dataStr
    a.download = "chat-output.json"
    a.click()
  }

  return (
    <section aria-labelledby="output-title" className="rounded-lg border bg-card p-0 shadow-sm">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <h2 id="output-title" className="text-sm font-medium">
          Output
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Copy all messages"
            className="rounded-md border px-2 py-1 text-xs transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={copyAll}
          >
            Copy
          </button>
          <button
            type="button"
            aria-label="Download messages as JSON"
            className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={downloadJSON}
          >
            Download JSON
          </button>
        </div>
      </div>
      <div className="max-h-[50vh] space-y-2 overflow-auto p-3">
        {messages.length === 0 && <p className="text-sm text-muted-foreground">Run a prompt to see responses here.</p>}
        {messages.map((m) => (
          <ChatBubble key={m.id} role={m.role} content={m.content} ts={m.ts} />
        ))}
      </div>
    </section>
  )
}
