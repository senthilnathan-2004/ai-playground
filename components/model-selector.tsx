"use client"

import { useAppState } from "@/contexts/app-state"
import { cn } from "@/lib/utils"

export function ModelSelector() {
  const { models, modelsLoading, modelsError, selectedModelId, setSelectedModelId } = useAppState()

  return (
    <section aria-labelledby="model-selector-title" className="rounded-lg border bg-card p-3 shadow-sm">
      <h2 id="model-selector-title" className="mb-2 text-sm font-medium">
        Model
      </h2>

      {modelsLoading && <p className="text-sm text-muted-foreground">Loading models…</p>}
      {modelsError && <p className="text-sm text-destructive">Failed to load models.</p>}

      {models && (
        <label className="block">
          <span className="sr-only">Choose a model</span>
          <select
            className={cn(
              "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition",
              "focus-visible:ring-2 focus-visible:ring-primary",
            )}
            value={selectedModelId ?? ""}
            aria-label="Choose a model"
            onChange={(e) => setSelectedModelId(e.target.value)}
          >
            <option value="" disabled>
              Select a model…
            </option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} • {m.provider}
              </option>
            ))}
          </select>
        </label>
      )}

      {models && selectedModelId && (
        <div className="mt-2 text-xs text-muted-foreground">
          <p>
            Context window:{" "}
            {new Intl.NumberFormat().format(models.find((m) => m.id === selectedModelId)?.contextWindow ?? 0)} tokens
          </p>
        </div>
      )}
    </section>
  )
}
