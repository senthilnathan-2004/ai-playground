import type { Meta, StoryObj } from "@storybook/react"
import type React from "react"

const Slider = (props: React.ComponentProps<"input">) => (
  <input
    type="range"
    {...props}
    className={"accent-blue-600 h-2 w-full rounded-lg bg-gray-200 " + (props.className ?? "")}
  />
)

const meta: Meta<typeof Slider> = {
  title: "Core/Slider",
  component: Slider,
  args: { min: 0, max: 100, step: 1, defaultValue: 50 },
}
export default meta

type Story = StoryObj<typeof Slider>
export const Default: Story = {}
