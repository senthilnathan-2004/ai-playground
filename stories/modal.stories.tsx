"use client"

import type { Meta, StoryObj } from "@storybook/react"
import type React from "react"
import { useState } from "react"

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-3 text-sm font-semibold">Modal</div>
        <div className="text-sm text-gray-700">{children}</div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="rounded-md bg-blue-600 px-3 py-1.5 text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

const Demo = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-4">
      <button className="rounded-md bg-blue-600 px-3 py-1.5 text-white" onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        Hello from a modal.
      </Modal>
    </div>
  )
}

const meta: Meta<typeof Demo> = { title: "Core/Modal", component: Demo }
export default meta
export type Story = StoryObj<typeof Demo>
export const Default: Story = {}
