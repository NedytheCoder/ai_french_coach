# Architecture

**Project:** AI Language Coach  
**Version:** 1.0 (MVP)  
**Date:** 2026-05-30

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                   │
│                                                         │
│   Next.js 15 (App Router) + TypeScript + Tailwind CSS   │
│   Framer Motion · React Context · Fetch API             │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS / REST
┌──────────────────────────▼──────────────────────────────┐
│                    BACKEND (FastAPI)                    │
│                                                         │
│   Auth Service │ User Service │ Lesson Service          │
│   Chat Service │ Progress Service │ Assessment Service  │
│   Vocabulary Service                                    │
│                                                         │
│   ┌──────────────────────────────────────────────────┐  │
│   │                  AI Layer                        │  │
│   │  PromptBuilder → OpenAI GPT-4o-mini              │  │
│   │  Transcription → OpenAI gpt-4o-transcribe        │  │
│   └──────────────────────────────────────────────────┘  │
└──────────┬────────────────────────────┬─────────────────┘
           │                            │
┌──────────▼──────────┐    ┌────────────▼─────────────────┐
│   SQLite (dev)      │    │        OpenAI API            │
│   PostgreSQL (prod) │    │  GPT-4o-mini · gpt-4o-       │
│                     │    │  transcribe                  │
└─────────────────────┘    └──────────────────────────────┘
```

---

## Frontend Architecture

### Technology Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | Already in use; SSR + file-based routing |
| Language | TypeScript | Type safety, maintainability |
| Styling | Tailwind CSS | Already in use; rapid UI |
| Animation | Framer Motion | Already in use |
| State Management | React Context + `useReducer` | Sufficient for MVP; no extra dependency |
| Data Fetching | Native `fetch` + custom hooks | Simple; no library overhead for MVP |
| Icons | react-icons | Already in use |

### Application Structure

```
frontend/app/
├── (auth)/                      # Auth group (no shared layout)
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── forgot-password/page.tsx
│   └── change-password/page.tsx
├── (app)/                       # Authenticated app group
│   ├── layout.tsx               # App shell (navbar, auth guard)
│   ├── dashboard/page.tsx       # Home after login
│   ├── languages/page.tsx       # Manage language pairs
│   ├── learn/
│   │   ├── [pairId]/            # Context: active language pair
│   │   │   ├── page.tsx         # Pair overview / learning path
│   │   │   ├── lesson/
│   │   │   │   └── [lessonId]/page.tsx
│   │   │   ├── chat/page.tsx    # AI tutor conversation
│   │   │   ├── assessment/page.tsx
│   │   │   ├── vocabulary/page.tsx
│   │   │   └── progress/page.tsx
├── page.tsx                     # Landing page
├── layout.tsx                   # Root layout
├── globals.css
└── Types.ts                     # Shared TypeScript types
```

### Key Pages

| Route | Purpose |
|---|---|
| `/` | Marketing landing page |
| `/login`, `/signup` | Authentication |
| `/dashboard` | Post-login home: active pairs, streaks, recommended next action |
| `/languages` | Add/remove language pairs |
| `/learn/[pairId]` | Learning hub for one language pair: levels, progress, path |
| `/learn/[pairId]/chat` | AI tutor conversation |
| `/learn/[pairId]/lesson/[lessonId]` | Structured lesson UI |
| `/learn/[pairId]/assessment` | Placement or progress assessment |
| `/learn/[pairId]/vocabulary` | Vocabulary review and flashcards |
| `/learn/[pairId]/progress` | XP history, streaks, level graph |

### State Management

The app uses two React Contexts:

**`AuthContext`** — session state
```ts
{
  user: User | null
  token: string | null
  login: (email, password) => Promise<void>
  logout: () => void
}
```

**`LanguagePairContext`** — active pair for the current session
```ts
{
  activePair: UserLanguagePair | null
  setActivePair: (pair: UserLanguagePair) => void
}
```

Lesson and chat state is local to those pages — no global state required for MVP.

### Auth Flow

```
User visits /dashboard
        │
        ▼
   Is token in localStorage?
   ├── No  → redirect to /login
   └── Yes → validate token with GET /auth/me
              ├── Invalid → clear token → /login
              └── Valid   → render dashboard
```

---

## Backend Architecture

### Technology Stack

| Concern | Choice |
|---|---|
| Framework | FastAPI |
| Language | Python 3.12 |
| Auth | JWT via `python-jose` + `passlib` |
| ORM | Raw SQL via `sqlite3` (MVP) → `asyncpg` + `SQLAlchemy` (prod) |
| AI Client | `openai` Python SDK |
| Audio | `pydub` |
| Env | `python-dotenv` |

### Service Boundaries

```
backend/
├── main.py                  # App factory, CORS, router registration
├── api/
│   ├── auth.py              # POST /auth/register, /login, /refresh, GET /auth/me
│   ├── users.py             # GET/PATCH /users/me
│   ├── languages.py         # GET /languages
│   ├── pairs.py             # CRUD /user/language-pairs
│   ├── lessons.py           # POST /lesson/generate, GET /lesson/:id, POST /lesson/:id/complete
│   ├── chat.py              # POST /chat, GET /chat/sessions
│   ├── assessment.py        # POST /assessment/start, /submit, GET /assessment/:id/result
│   ├── progress.py          # GET /progress/:pairId
│   └── vocabulary.py        # GET/POST /vocabulary, POST /vocabulary/:id/review
├── services/
│   ├── auth_service.py      # Token generation, password hashing
│   ├── lesson_service.py    # Lesson generation orchestration
│   ├── chat_service.py      # Conversation management
│   ├── assessment_service.py
│   ├── progress_service.py
│   └── vocabulary_service.py
├── ai/
│   ├── prompt_builder.py    # Language-pair-aware prompt construction
│   ├── lesson_generator.py  # Calls OpenAI to generate lesson content
│   ├── chat_handler.py      # Manages conversation context + AI call
│   ├── assessment_scorer.py # Grades writing and speaking responses
│   └── transcriber.py      # Audio → text pipeline
├── database/
│   ├── connection.py
│   ├── schema.py
│   └── migrations/
├── models/
│   └── *.py                 # Pydantic request/response models
└── data/
    └── app.db
```

### Auth Layer

- Passwords hashed with bcrypt via `passlib`
- JWT access tokens (15 min TTL) + refresh tokens (7 day TTL)
- Tokens stored in `httpOnly` cookies (production) or `localStorage` (MVP)
- Every protected route uses a FastAPI `Depends(get_current_user)` dependency

### AI Layer

The AI layer is isolated from all business logic. It has one responsibility: given a structured input, return a structured output.

**`PromptBuilder`** is the critical abstraction for language-pair agnosticism:

```python
class PromptBuilder:
    def tutor_system_prompt(
        self,
        source_language: str,   # e.g. "German"
        target_language: str,   # e.g. "Spanish"
        level: str,             # e.g. "A2"
    ) -> str: ...

    def lesson_prompt(
        self,
        source_language: str,
        target_language: str,
        level: str,
        lesson_type: str,       # "vocabulary" | "grammar" | "reading" | ...
    ) -> str: ...

    def assessment_scoring_prompt(
        self,
        source_language: str,
        target_language: str,
        level: str,
        skill: str,
        question: str,
        user_answer: str,
    ) -> str: ...
```

No prompt ever hard-codes a language name. Language names are always injected at call time from the active `UserLanguagePair`.

### Progress Tracking Layer

- XP is awarded on: lesson completion, chat messages sent, assessment answers
- Streak is incremented when a user records any activity on a calendar day
- Level unlock is checked server-side after each XP award: if accumulated XP crosses a threshold, the pair's `current_level` advances

---

## Database Architecture

See `docs/database_schema.md` for full schema.

### Key Design Decisions

1. **`Languages` table is the registry** — adding a new language is one `INSERT`. No schema change.
2. **`UserLanguagePairs` decouples users from languages** — a user can learn multiple languages; each pair is independent.
3. **`language_pair_id` foreign key is on every learning entity** — lessons, messages, vocabulary, assessments, and progress records all belong to a pair, not just a user.
4. **`content_json` on lessons** — lesson content is stored as a JSON blob. The schema does not need to change when lesson types change.
5. **No `english_translation` column anywhere** — all translation/explanation columns are named generically (`translation`, `source_text`) and contain text in whatever language the pair specifies.

---

## Deployment Architecture (MVP)

| Component | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Already in use; auto-deploy from `main` |
| Backend | Render (or Railway) | Free tier sufficient for MVP |
| Database | SQLite file on backend host | Upgrade to Postgres before scaling |
| AI | OpenAI API | API key in environment variables |
| Audio CDN | Not required for MVP | Serve audio from backend static files |

### Environment Variables

```
# Backend
OPENAI_API_KEY=
JWT_SECRET_KEY=
DATABASE_URL=sqlite:///./data/app.db
ALLOWED_ORIGINS=http://localhost:3000,https://your-app.vercel.app

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Non-Functional Requirements

| Concern | Target |
|---|---|
| API response time (non-AI) | < 200ms |
| AI response time | < 5s (acceptable for chat) |
| Lesson generation time | < 10s (cached after first call) |
| Concurrent users (MVP) | ~100 (single server process) |
| Auth token TTL | 15 min access, 7 day refresh |
