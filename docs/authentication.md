# Authentication

## Rules

- Clerk is the **only** authentication provider. Do not add or integrate any other auth method (e.g. NextAuth, custom sessions/JWT, Passport).
- Use `proxy.ts` (via `clerkMiddleware`) for route protection. Do not add a `middleware.ts` file.
- `/dashboard` (and any route under it) is a protected route: it must require the user to be signed in. Enforce this in `proxy.ts` using `auth.protect()` on the matched routes, not only via client-side UI checks.
- If a signed-in user visits the homepage (`/`), redirect them to `/dashboard`. Perform this redirect on the server (e.g. via `auth()` in the page/layout or in `proxy.ts`), not with client-side effects.
- Sign in and sign up must always launch as **modals**, using Clerk's `<SignInButton mode="modal">` / `<SignUpButton mode="modal">` (or equivalent modal APIs). Do not link to the standalone `/sign-in` or `/sign-up` pages for triggering auth from the app UI.
- Keep the `ClerkProvider` in [app/layout.tsx](../app/layout.tsx) wrapping the app; do not remove or duplicate it.

## Reference

- Middleware: [proxy.ts](../proxy.ts)
- Sign-in route: [app/sign-in/[[...sign-in]]/page.tsx](../app/sign-in/%5B%5B...sign-in%5D%5D/page.tsx)
- Sign-up route: [app/sign-up/[[...sign-up]]/page.tsx](../app/sign-up/%5B%5B...sign-up%5D%5D/page.tsx)
