import type { Meta, StoryObj } from "@storybook/react"
import { ChatBubble } from "../components/chat-bubble"

const meta: Meta<typeof ChatBubble> = {
  title: "Core/ChatBubble",
  component: ChatBubble,
  args: { role: "assistant", content: "This is an example assistant reply.", ts: Date.now() },
}
export default meta

type Story = StoryObj<typeof ChatBubble>
export const Assistant: Story = {}
export const User: Story = {
  args: { role: "user", content: "A user message with details.", ts: Date.now() },
}
