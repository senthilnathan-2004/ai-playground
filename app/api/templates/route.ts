import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    templates: [
      {
        id: "t-1",
        name: "Summarize Text",
        content: "Summarize the following passage in 3 bullet points focusing on key facts:\n\n{{text}}",
      },
      {
        id: "t-2",
        name: "Rewrite for Simplicity",
        content:
          "Rewrite the following passage using simpler language suitable for a 9th-grade reading level:\n\n{{text}}",
      },
      {
        id: "t-3",
        name: "Extract Action Items",
        content:
          "From the following meeting notes, extract concrete action items with owners and due dates:\n\n{{notes}}",
      },
    ],
  })
}
