# Roadmap

## Phase 0: Foundation (this PR)
- Next.js + TS + Tailwind scaffold
- App shell, Navbar, pages: Home, Ask, Thread
- Components: QuestionForm, ThreadList, ExpertResponse
- Mock data + types
- Docs: README, ARCHITECTURE, ROADMAP

## Phase 1: Thread CRUD + Persistence
- Add Postgres via Prisma/Drizzle
- Server Actions for create/list/get threads
- Replace mock data with DB
- Basic search (title/body full-text)

## Phase 2: Expert Personas + Generator
- Persona model, CRUD
- Server-side router to pick experts
- Call out to LLM provider behind typed interface
- Caching of expansions

## Phase 3: Debate + TL;DR
- Debate Mode (experts respond to each other)
- TL;DR summarization across responses
- Sub-threads for deep dives

## Phase 4: Realtime + Observability
- Edge functions or websockets for live updates
- Metrics, tracing, structured logs
- Moderation pipeline

## Phase 5: Growth
- Auth + profiles
- Upvotes, bookmarks, follows
- Team presets, export/share

