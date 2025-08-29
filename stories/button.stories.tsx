import type { Meta, StoryObj } from "@storybook/react"
import type React from "react"

const Button = (props: React.ComponentProps<"button">) => (
  <button
    {...props}
    className={
      "rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 " +
      (props.className ?? "")
    }
  />
)

const meta: Meta<typeof Button> = {
  title: "Core/Button",
  component: Button,
}
export default meta

type Story = StoryObj<typeof Button>
export const Primary: Story = {
  args: { children: "Click me" },
}
export const Disabled: Story = {
  args: { children: "Disabled", disabled: true, className: "opacity-60" },
}
