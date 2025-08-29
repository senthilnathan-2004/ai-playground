"use client"

import { AppProviders } from "@/components/app-providers"
import { ModelSelector } from "@/components/model-selector"
import { ParamsPanel } from "@/components/params-panel"
import { PromptEditor } from "@/components/prompt-editor"
import { ChatOutput } from "@/components/chat-output"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Page() {
  return (
    <AppProviders>
      <main className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <h1 className="text-pretty text-lg font-semibold tracking-tight">AI Playground</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Layout */}
        <section className="mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-12">
          {/* Sidebar: Models + Params */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="flex flex-col gap-4">
              <ModelSelector />
              <ParamsPanel />
            </div>
          </aside>

          {/* Main: Prompt + Output */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="grid gap-4">
              <PromptEditor />
              <ChatOutput />
            </div>
          </div>
        </section>
      </main>
    </AppProviders>
  )
}
