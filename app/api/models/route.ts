import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    models: [
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI", contextWindow: 16000, tags: ["fast", "cheap"] },
      { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", contextWindow: 128000, tags: ["vision", "quality"] },
      {
        id: "claude-3-5-sonnet",
        name: "Claude 3.5 Sonnet",
        provider: "Anthropic",
        contextWindow: 200000,
        tags: ["reasoning"],
      },
      { id: "mistral-large", name: "Mistral Large", provider: "Mistral", contextWindow: 32000 },
      { id: "llama-3.1-70b", name: "Llama 3.1 70B", provider: "Meta", contextWindow: 8000, tags: ["open"] },
    ],
  })
}
