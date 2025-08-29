"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/contexts/theme-context"
import { AppStateProvider } from "@/contexts/app-state"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppStateProvider>{children}</AppStateProvider>
    </ThemeProvider>
  )
}
