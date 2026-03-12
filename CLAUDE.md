# Physics Revision Platform

## Stack
- Next.js 14, TypeScript, Tailwind CSS, App Router
- Prisma ORM + Supabase Postgres
- Supabase Auth (@supabase/ssr)
- Groq SDK, model: llama-3.1-8b-instant
- KaTeX for LaTeX math rendering

## Structure
- app/(auth)/ — login, signup
- app/(student)/ — chapter pages
- app/(teacher)/ — score dashboard
- app/api/ — all route handlers
- components/ — all UI components
- lib/ — prisma.ts, supabase.ts, groq.ts
- prisma/ — schema.prisma, seed.ts
- data/chapters.json — all chapter content
- reference/existing-ui.tsx — original UI to replicate exactly

## Design Rules
ALL components must visually match reference/existing-ui.tsx exactly.
Colours: primary #1a1a2e, accent #3b82f6, success #16a34a,
warning #d97706, danger #dc2626, muted #6b7280

## Rules
- Components are presentational — no API calls inside components
- API calls only in app/api/ route handlers
- GROQ_API_KEY is server-only, never sent to browser
- Use Supabase SSR client in route handlers
- Prisma singleton in lib/prisma.ts
- Answers are upserted — one attempt per user per question

## Env vars (never hardcode)
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL, GROQ_API_KEY
