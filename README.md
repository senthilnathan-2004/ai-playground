# AI Playground (Frontend Prototype)

Live URL: (add once deployed to Vercel)

Repository: (add GitHub link)

## Research

Reviewed UIs:
- OpenAI Playground — Flexible parameter controls and model switching, quick testing of prompts with saved presets.
- Anthropic Claude — Clean, focused chat-first experience with strong citation and safety UX.
- Microsoft Copilot Lab — Task-centric templates and educational prompts that can be personalized.
- Hugging Face Spaces — Wide variety of demos with simple, consistent layouts and quick start interactions.

Chosen features to combine (6):
1) Model selector (fast switching)
2) Prompt templates (save/load)
3) Parameter sliders (temperature, max tokens, top-p)
4) Chat/output stream with actions
5) Light/Dark theme toggle (persisted)
6) Responsive layout with keyboard accessibility

## Design

- Mockup: see `public/design/mockup.png` (simple high-fidelity mock illustrating layout)
- Color system (exactly 5 colors):
  - Primary: Blue 600 (#2563EB)
  - Neutrals: White (#FFFFFF), Slate-900 (#0F172A), Slate-700 (#334155)
  - Accent: Emerald 500 (#10B981)
  - Contrast meets WCAG AA for text against background.
- Typography:
  - Sans for headings and body (Geist via default shadcn setup), 1.4–1.6 line-height.
  - Heading weights 600–700, body 400–500, min body size 14px.
- Tailwind mapping:
  - Spacing: 4/6/8/12/16 for vertical rhythm (e.g., p-4, gap-4)
  - Colors: bg-background / text-foreground with primary/secondary utility classes
  - Layout: flex/grid with gap utilities, mobile-first, max-w-6xl container.
- Translation to code:
  - Sidebar (Model + Params) becomes a stacked column on mobile; grid columns at md+.
  - Buttons use hover/focus transitions, visible focus rings, and aria-labels for actions.
  - Sliders are native inputs with clear labels and live value text.

## Development

- Tech stack: Next.js App Router + React (TS strict), Tailwind v4 (shadcn base), SWR for data fetching, local mock APIs.
- Data:
  - GET `/api/models` returns model list.
  - GET `/api/templates` returns starter templates.
  - Save template is optimistic in client (SWR) for this prototype.
- State & Context:
  - ThemeContext persists theme to localStorage and toggles `.dark` class.
  - AppStateContext handles models, templates, selections, params, prompt, and messages.
- Components:
  - ModelSelector, ParamsPanel, PromptEditor, ChatOutput, ChatBubble, ThemeToggle.
- Accessibility & UX:
  - Keyboard-navigable controls with labels; visible focus rings; hover/focus transitions.
- Storybook:
  - `.storybook/` files (stories for Button, Slider, Modal, ChatBubble).
- Known limitations:
  - No real LLM calls; “Run” fabricates a response using current prompt/params.
  - Template save is client-side only (no persistence across reloads).

## How to Submit
- Deploy to Vercel and add the live URL above.
- Push code to GitHub; ensure this README and the `.storybook` folder are included.
- Include the mockup image (or link to your Figma/XD) in `public/design/`.
# ai-playground
# ai-playground
