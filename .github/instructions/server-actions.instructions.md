---
description: Read this before implementing or modifying data mutations. This file describes the server action rules for the project.
applyTo: **/*
---

# Server Actions

## Rules

- ALL data mutations in this app MUST be done via server actions. Do not mutate data from route handlers or directly in server components.
- Server actions MUST be called from client components. Do not call a server action from a server component.
- Server action files MUST be named `actions.ts` and colocated in the directory of the component that calls them.
- ALL data passed into a server action MUST have an explicit, appropriate TypeScript type. Do NOT type the input as `FormData`.
- ALL data received by a server action MUST be validated with `zod` before use.
- ALL server actions MUST check for a logged-in user first (via Clerk) before performing any database operation. If there is no logged-in user, the action must not proceed.
- Server actions MUST NOT contain Drizzle queries directly. Database operations must go through helper functions in the `/data` directory that wrap the Drizzle queries.
- Server actions MUST NOT throw errors. Catch failures (validation, auth, database) and return an object with an `error` property instead. On success, return an object with a `success` property.

## Reference

- Data helper functions: [data/](../../data/)
- Authentication rules: [authentication.instructions.md](./authentication.instructions.md)
- Data fetching rules: [data-fetching.instructions.md](./data-fetching.instructions.md)
