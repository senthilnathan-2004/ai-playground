"use client"

import { useAppState } from "@/contexts/app-state"

export function ParamsPanel() {
  const { params, setParams } = useAppState()

  return (
    <section aria-labelledby="params-title" className="rounded-lg border bg-card p-3 shadow-sm">
      <h2 id="params-title" className="mb-2 text-sm font-medium">
        Parameters
      </h2>

      <div className="grid gap-4">
        <SliderField
          id="temperature"
          label="Temperature"
          min={0}
          max={2}
          step={0.1}
          value={params.temperature}
          onChange={(v) => setParams({ temperature: v })}
          help="Higher = more creative"
        />
        <SliderField
          id="maxTokens"
          label="Max tokens"
          min={64}
          max={4096}
          step={64}
          value={params.maxTokens}
          onChange={(v) => setParams({ maxTokens: Math.round(v) })}
          help="Upper bound on output length"
        />
        <SliderField
          id="topP"
          label="Top P"
          min={0}
          max={1}
          step={0.05}
          value={params.topP}
          onChange={(v) => setParams({ topP: v })}
          help="Alternative to temperature"
        />
      </div>
    </section>
  )
}

function SliderField(props: {
  id: string
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  help?: string
}) {
  const { id, label, min, max, step, value, onChange, help } = props
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
        <span className="text-xs tabular-nums text-muted-foreground">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
      {help && <p className="text-xs text-muted-foreground">{help}</p>}
    </div>
  )
}
