"use client"

import type React from "react"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark"
type ThemeContextValue = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void }

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const THEME_KEY = "ai-playground-theme"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {
    const stored = (typeof window !== "undefined" && window.localStorage.getItem(THEME_KEY)) as Theme | null
    const prefersDark =
      typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial: Theme = stored ?? (prefersDark ? "dark" : "light")
    setThemeState(initial)
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement
      if (theme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
      window.localStorage.setItem(THEME_KEY, theme)
    }
  }, [theme])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggle = useCallback(() => setThemeState((t) => (t === "dark" ? "light" : "dark")), [])

  const value = useMemo(() => ({ theme, toggle, setTheme }), [theme, toggle, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
