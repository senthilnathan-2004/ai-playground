"use client"

import { useAppState } from "@/contexts/app-state"
import { useState } from "react"

export function PromptEditor() {
  const {
    prompt,
    setPrompt,
    templates,
    templatesLoading,
    templatesError,
    loadTemplateIntoPrompt,
    saveTemplate,
    selectedModelId,
    params,
    addMessage,
    clearMessages,
  } = useAppState()

  const [templateName, setTemplateName] = useState("New Template")

  function runPrompt() {
    // Fake inference: echo prompt + params + model
    const model = selectedModelId ? `(${selectedModelId})` : "(no model selected)"
    const synthetic =
      `Response ${model}\n` +
      `temperature=${params.temperature}, maxTokens=${params.maxTokens}, topP=${params.topP}\n\n` +
      `You said:\n${prompt}`
    addMessage({ role: "assistant", content: synthetic })
  }

  return (
    <section aria-labelledby="prompt-title" className="rounded-lg border bg-card p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 id="prompt-title" className="text-sm font-medium">
          Prompt
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border px-2 py-1 text-xs transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={clearMessages}
          >
            Clear Output
          </button>
          <button
            type="button"
            className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={runPrompt}
          >
            Run
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write your instruction or message..."
          rows={6}
          aria-label="Prompt text"
          className="w-full resize-y rounded-md border bg-background p-3 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
        />

        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="template-name">
            Template name
          </label>
          <input
            id="template-name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            aria-label="Template name"
            className="min-w-40 flex-1 rounded-md border bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Template name"
          />
          <button
            type="button"
            className="rounded-md border px-2 py-1 text-xs transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => saveTemplate({ name: templateName, content: prompt })}
          >
            Save Template
          </button>

          <div className="ml-auto">
            {templatesLoading && <span className="text-xs text-muted-foreground">Loading templates…</span>}
            {templatesError && <span className="text-xs text-destructive">Templates failed to load</span>}
            {templates && (
              <label className="inline-flex items-center gap-2">
                <span className="text-xs">Load:</span>
                <select
                  className="rounded-md border bg-background px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Load prompt template"
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) loadTemplateIntoPrompt(e.target.value)
                  }}
                >
                  <option value="" disabled>
                    Choose template…
                  </option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
