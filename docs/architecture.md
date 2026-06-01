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
├── auth/                        # Auth pages (URL prefix: /auth)
│   ├── AuthProvider.tsx         # AuthContext: session restore, login/register/logout
│   ├── AuthGuard.tsx            # Redirects unauthenticated users to /auth/login
│   ├── login/page.tsx           # /auth/login
│   ├── signup/page.tsx          # /auth/signup
│   ├── forgot-password/page.tsx # /auth/forgot-password
│   ├── change-password/page.tsx # /auth/change-password
│   └── components/              # Shared auth UI (AuthLayout, AuthCard, AuthInput, etc.)
├── components/                  # Shared app UI (Skeleton, ToastProvider)
├── dashboard/page.tsx           # Home after login; auth-guarded via AuthGuard
├── languages/page.tsx           # Manage language pairs; auth-guarded
├── learn/
│   └── [pairId]/                # Context: active language pair
│       ├── page.tsx             # Learning path (CEFR levels A0–C2)
│       ├── chat/page.tsx        # AI tutor conversation
│       ├── assessment/page.tsx  # Placement / progress assessment
│       ├── vocabulary/page.tsx  # Vocabulary review and flashcards
│       ├── progress/page.tsx    # XP history, streaks, level graph
│       └── lesson/
│           └── [lessonId]/page.tsx   # Structured lesson UI (M3-03, not yet built)
├── LanguagePairProvider.tsx     # LanguagePairContext: activePair / setActivePair
├── Types.ts                     # Shared TypeScript types
├── page.tsx                     # Marketing landing page
├── layout.tsx                   # Root layout (LanguageProvider → AuthProvider → LanguagePairProvider → ToastProvider)
├── error.tsx                    # Route-level error boundary
├── global-error.tsx             # Root-level error boundary
└── globals.css
```

Auth is enforced via the `AuthGuard` component wrapper, not a Next.js route group layout. All authenticated pages import and render `<AuthGuard>` directly.

```
frontend/i18n/
├── LanguageProvider.tsx    # I18nContext: UI language code, setLang, t() lookup
└── translations.ts          # UI translation strings, keyed by language code
```

### Key Pages

| Route | Purpose |
|---|---|
| `/` | Marketing landing page |
| `/auth/login`, `/auth/signup` | Authentication |
| `/dashboard` | Post-login home: active pairs, streaks, recommended next action |
| `/languages` | Add/remove language pairs |
| `/learn/[pairId]` | Learning hub for one language pair: levels, progress, path |
| `/learn/[pairId]/chat` | AI tutor conversation |
| `/learn/[pairId]/lesson/[lessonId]` | Structured lesson UI |
| `/learn/[pairId]/assessment` | Placement or progress assessment |
| `/learn/[pairId]/vocabulary` | Vocabulary review and flashcards |
| `/learn/[pairId]/progress` | XP history, streaks, level graph |

### State Management

The app uses three React Contexts, nested outermost-first in `layout.tsx`:

**`I18nContext`** — UI language selection (outermost; provided by `frontend/i18n/LanguageProvider.tsx`)
```ts
{
  lang: string                      // current UI language code, e.g. "en"
  setLang: (lang: string) => void
  t: (key: string) => string        // look up a UI translation key
}
```

**`AuthContext`** — session state (provided by `app/auth/AuthProvider.tsx`)
```ts
{
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (displayName: string, email: string, password: string, sourceLanguageCode: string) => Promise<void>
  logout: () => Promise<void>
}
```

**`LanguagePairContext`** — active pair for the current session (provided by `app/LanguagePairProvider.tsx`)
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
   Is auth state in localStorage?
   ├── No  → redirect to /auth/login
   └── Yes → validate access token with GET /auth/me
              ├── Valid (200)  → render dashboard
              └── Invalid (401) → attempt POST /auth/refresh
                                  ├── Refresh OK  → retry GET /auth/me → render dashboard
                                  └── Refresh fail → clear state → /auth/login
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

### Rate Limiting Middleware

All AI-backed endpoints are protected by per-user in-memory rate limiting via `slowapi` (ADR-004). Rate limit state lives in `backend/middleware/rate_limit.py`. The `Limiter` is attached to `app.state` in `main.py` and applied via `@limiter.limit(...)` decorators on individual endpoint handlers.

Limits: 30 chat requests/hour, 10 lesson generation requests/hour, 10 assessment scoring requests/hour.

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

    def assessment_question_prompt(
        self,
        source_language: str,
        target_language: str,
        level: str,
        skill: str,             # "reading" | "listening" | "writing" | "speaking"
        count: int,
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

    def lesson_prompt(
        self,
        source_language: str,
        target_language: str,
        level: str,
        lesson_type: str,       # "vocabulary" | "grammar" | "reading" | "listening" | "writing" | "speaking"
        topic: str | None = None,
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
