"use client"

import { useTheme } from "@/contexts/theme-context"

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="rounded-md border px-3 py-1.5 text-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  )
}
