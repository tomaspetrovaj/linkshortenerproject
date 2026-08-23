---
description: Read this before creating or modifying UI components. This file describes the UI component rules for the project.
---

# UI Components

## Rules

- All UI elements in this app use [shadcn/ui](https://ui.shadcn.com/). Do not hand-write custom components for things shadcn/ui already provides (buttons, inputs, dialogs, forms, dropdowns, etc.).
- Do not create custom one-off components as a substitute for a shadcn/ui component. If a needed component isn't installed yet, add it via the shadcn CLI rather than building it from scratch.
- Installed components live in `components/ui/`. Import them via the `@/components/ui` alias (see [components.json](../components.json)).
- Compose pages/features using existing `components/ui/` primitives; keep route-specific composition in `app/`, per [app/AGENTS.md](../app/AGENTS.md).
- Do not modify generated files in `components/ui/` to add one-off, page-specific behavior — compose/wrap them instead in your feature code.

## Reference

- shadcn/ui config: [components.json](../components.json)
- Installed components: [components/ui/](../components/ui/)
