"use client"

import type React from "react"

import { createContext, useContext, useMemo, useState } from "react"
import useSWR from "swr"

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Failed to fetch ${url}`)
    return r.json()
  })

export type Model = {
  id: string
  name: string
  provider: string
  contextWindow: number
  tags?: string[]
}

export type Template = {
  id: string
  name: string
  content: string
}

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  ts: number
}

type Params = {
  temperature: number
  maxTokens: number
  topP: number
}

type AppState = {
  models: Model[] | undefined
  modelsLoading: boolean
  modelsError?: Error
  templates: Template[] | undefined
  templatesLoading: boolean
  templatesError?: Error

  selectedModelId?: string
  setSelectedModelId: (id: string) => void

  params: Params
  setParams: (p: Partial<Params>) => void

  prompt: string
  setPrompt: (p: string) => void

  messages: Message[]
  addMessage: (m: Omit<Message, "id" | "ts">) => void
  clearMessages: () => void

  saveTemplate: (t: Omit<Template, "id">) => void
  loadTemplateIntoPrompt: (id: string) => void
}

const AppStateContext = createContext<AppState | undefined>(undefined)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const {
    data: modelsData,
    isLoading: modelsLoading,
    error: modelsError,
  } = useSWR<{ models: Model[] }>("/api/models", fetcher)
  const {
    data: templatesData,
    isLoading: templatesLoading,
    error: templatesError,
    mutate,
  } = useSWR<{ templates: Template[] }>("/api/templates", fetcher)

  const [selectedModelId, setSelectedModelId] = useState<string | undefined>(undefined)
  const [params, setParamsState] = useState<Params>({ temperature: 0.7, maxTokens: 512, topP: 1 })
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const setParams = (patch: Partial<Params>) => setParamsState((p) => ({ ...p, ...patch }))

  const addMessage = (m: Omit<Message, "id" | "ts">) =>
    setMessages((prev) => [...prev, { ...m, id: crypto.randomUUID(), ts: Date.now() }])

  const clearMessages = () => setMessages([])

  const saveTemplate = (t: Omit<Template, "id">) => {
    // optimistic update to SWR cache since this is a mock API
    const newTemplate: Template = { id: crypto.randomUUID(), ...t }
    const next = { templates: [...(templatesData?.templates ?? []), newTemplate] }
    mutate(next, { revalidate: false })
  }

  const loadTemplateIntoPrompt = (id: string) => {
    const tpl = templatesData?.templates.find((t) => t.id === id)
    if (tpl) setPrompt(tpl.content)
  }

  const value = useMemo<AppState>(
    () => ({
      models: modelsData?.models,
      modelsLoading,
      modelsError,

      templates: templatesData?.templates,
      templatesLoading,
      templatesError,

      selectedModelId,
      setSelectedModelId,

      params,
      setParams,

      prompt,
      setPrompt,

      messages,
      addMessage,
      clearMessages,

      saveTemplate,
      loadTemplateIntoPrompt,
    }),
    [
      modelsData,
      modelsLoading,
      modelsError,
      templatesData,
      templatesLoading,
      templatesError,
      selectedModelId,
      params,
      prompt,
      messages,
    ],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider")
  return ctx
}
