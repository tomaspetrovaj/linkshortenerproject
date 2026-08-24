# App Directory Instructions

These instructions apply to all routes and files under `app/`.

Read and follow the shared project guidance before changing code:

- [Authentication and data]
- [UI components]

## Local Rules

- Keep route-specific UI and composition here; move reusable components to `components/`.
- Keep pages and layouts server components unless interactivity requires a client boundary.
- Keep authentication and database enforcement on the server, even when the UI is conditionally rendered.
- Preserve the existing `ClerkProvider`, font setup, metadata API, Tailwind CSS v4, and shadcn/ui conventions unless the task requires a deliberate change.
- Use `proxy.ts` for request interception and route protection; do not add `middleware.ts`.
- When a route behavior changes, verify its loading, error, empty, signed-out, and unauthorized states where applicable.
