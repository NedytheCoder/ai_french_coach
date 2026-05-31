# Development Backlog

**Project:** AI Language Coach  
**Version:** 1.0 (MVP)  
**Date:** 2026-05-30

Tasks are ordered by dependency within each milestone. Complete each milestone before starting the next.

---

## Milestone 1 — Deployable Foundation

The smallest deployable system: auth, language pair selection, and AI tutor chat. No lessons required.

### M1-01: Database Schema Migration ✅ COMPLETED 2026-05-31

**Description:** Apply the new language-pair-agnostic schema (users, refresh_tokens, languages, user_language_pairs, conversation_sessions, messages, progress_records, vocabulary_items, assessments, assessment_answers). Seed the languages table. Write `init_db.py` for fresh installs and a migration script for the existing `app.db`.

**Implemented:**
- `backend/database/schema.py` — new schema, all 12 tables + indexes + language seed SQL
- `backend/scripts/init_db.py` — idempotent fresh-install script
- `backend/scripts/migrate_db.py` — migrates existing `app.db` (backs up, drops legacy tables, applies new schema, seeds languages, records migration in `schema_migrations`)

**Dependencies:** None  
**Priority:** Critical

---

### M1-02: Auth — Register and Login ✅ COMPLETED 2026-05-31

**Description:** Implement `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh`, and `GET /auth/me`. Password hashing with bcrypt. JWT access tokens (15 min) and refresh tokens (7 days) with server-side revocation via `refresh_tokens` table.

**Implemented:**
- `backend/models/auth.py` — Pydantic request/response models
- `backend/services/auth_service.py` — bcrypt hashing, JWT creation/verification, `get_current_user` dependency, refresh token storage/revocation
- `backend/api/auth.py` — all five auth endpoints per API contract
- `backend/main.py` — updated to register auth router; removed legacy debug prints and reception router

**Dependencies:** M1-01  
**Priority:** Critical

---

### M1-03: Languages Endpoint

**Description:** Implement `GET /languages` returning all active languages from the database.

**Dependencies:** M1-01  
**Priority:** Critical

---

### M1-04: Language Pair CRUD

**Description:** Implement `GET /user/language-pairs`, `POST /user/language-pairs`, `DELETE /user/language-pairs/{id}`. Enforce the unique constraint (one pair per target language per user) and the source ≠ target constraint.

**Dependencies:** M1-02, M1-03  
**Priority:** Critical

---

### M1-05: PromptBuilder — Core Abstraction ✓ COMPLETE

**Description:** Create `backend/ai/prompt_builder.py`. Implement `tutor_system_prompt(source_language, target_language, level)` for general, introduction, travelling, and daily_life modes. No language name is hard-coded; all are injected parameters. Write unit tests for each mode with at least three different language pairs.

**Dependencies:** None  
**Priority:** Critical  
**Completed:** 2026-05-31  
**Artefacts:** `backend/ai/prompt_builder.py`, `backend/tests/test_prompt_builder.py` (25 tests, all passing)

---

### M1-06: Chat Endpoint

**Description:** Implement `POST /chat` and `GET /chat/sessions` and `GET /chat/sessions/{id}/messages`. Use `PromptBuilder` for system prompts. Persist sessions and messages. Award 5 XP per assistant reply. Extract vocabulary from assistant response and save to `vocabulary_items`.

**Dependencies:** M1-04, M1-05  
**Priority:** Critical

---

### M1-07: Frontend Auth — Login and Register

**Description:** Wire the existing `/auth/login` and `/auth/signup` pages to the new auth API. Implement `AuthContext` with `login`, `logout`, and `user` state. Store JWT in `localStorage` for MVP. Add `AuthGuard` HOC that redirects unauthenticated users to `/login`.

**Dependencies:** M1-02  
**Priority:** Critical

---

### M1-08: Frontend Language Pair Selection

**Description:** Build `/languages` page. Fetch supported languages from `GET /languages`. Allow user to add a new language pair via `POST /user/language-pairs`. Display active pairs on dashboard. Implement `LanguagePairContext`.

**Dependencies:** M1-04, M1-07  
**Priority:** Critical

---

### M1-09: Frontend Chat Page

**Description:** Refactor the existing `/conversation` pages into a single `/learn/[pairId]/chat` page. Pass `pair_id` and `mode` in each request. Display session list and message history. Award XP feedback on each reply.

**Dependencies:** M1-06, M1-08  
**Priority:** Critical

---

### M1-10: Dashboard

**Description:** Build `/dashboard` showing: active language pairs with current level and streak, recommended next action (start chat / take assessment), and total XP per pair. Data from `GET /user/language-pairs` and `GET /progress/{pair_id}`.

**Dependencies:** M1-08  
**Priority:** Critical

---

## Milestone 2 — Placement Assessment

Placement testing determines the learner's starting level and unlocks the appropriate lesson tier.

### M2-01: Assessment Content — Language-Pair-Aware Generation

**Description:** Implement `backend/ai/assessment_scorer.py`. Create `PromptBuilder` methods for `assessment_scoring_prompt` (writing and speaking). Migrate existing hard-coded French assessment questions from `reception.py` / SQLite to the new `assessments` system. Ensure reading and listening questions can be AI-generated for any language pair.

**Dependencies:** M1-05  
**Priority:** High

---

### M2-02: Assessment Endpoints

**Description:** Implement `POST /assessment/start`, `POST /assessment/{id}/submit`, `GET /assessment/{id}/result`, `POST /assessment/score-writing`, and `POST /assessment/score-speaking`. On completion, update `user_language_pairs.current_level` to the assessed level.

**Dependencies:** M2-01, M1-04  
**Priority:** High

---

### M2-03: Frontend Assessment Flow

**Description:** Build `/learn/[pairId]/assessment` page. Render reading (multiple choice), writing (textarea), and speaking (audio recorder) question types. Submit answers and display result with level placement and XP summary.

**Dependencies:** M2-02  
**Priority:** High

---

## Milestone 3 — Lesson Delivery

Structured lessons that the learner works through at their placed level.

### M3-01: Lesson Generator

**Description:** Implement `backend/ai/lesson_generator.py`. Support lesson types: vocabulary, grammar, reading, writing, speaking. `generate_lesson(source_language, target_language, level, lesson_type, topic)` calls OpenAI with a structured prompt and returns a validated `content_json` blob. Cache generated lessons per `(pair_id, level, lesson_type, topic)` to avoid redundant AI calls.

**Dependencies:** M1-05  
**Priority:** High

---

### M3-02: Lesson Endpoints

**Description:** Implement `POST /lesson/generate`, `GET /lesson/{id}`, and `POST /lesson/{id}/complete`. On completion, record XP in `progress_records`, check for level-up, update `user_language_pairs.current_level` if threshold crossed.

**Dependencies:** M3-01, M1-04  
**Priority:** High

---

### M3-03: Frontend Lesson Page

**Description:** Build `/learn/[pairId]/lesson/[lessonId]` page. Render content based on `lesson_type`. Vocabulary lessons: flashcard-style flip cards. Grammar lessons: explanation + fill-in-the-blank. Reading: passage + multiple choice. Writing: prompt + textarea + AI score. Speaking: prompt + audio recorder + AI score. Show XP award and level-up celebration on completion.

**Dependencies:** M3-02  
**Priority:** High

---

### M3-04: Learning Path Page

**Description:** Build `/learn/[pairId]` page. Show CEFR levels A0–C2 as a path. Lock levels above the current level. Show lessons available per level. Show completion count and XP per level.

**Dependencies:** M3-02  
**Priority:** High

---

## Milestone 4 — Progress and Vocabulary

### M4-01: Progress Endpoint

**Description:** Implement `GET /progress/{pair_id}`. Aggregate `progress_records` for daily history. Compute streak from `last_activity_date`. Compute level progress percentage from XP thresholds.

**Dependencies:** M1-04  
**Priority:** Medium

---

### M4-02: Vocabulary Endpoints

**Description:** Implement `GET /vocabulary`, `POST /vocabulary/{id}/review`. Implement simple spaced repetition: correct answer doubles the interval (1d → 2d → 4d → 8d…), incorrect answer resets to 1 day.

**Dependencies:** M1-04  
**Priority:** Medium

---

### M4-03: Frontend Progress Page

**Description:** Build `/learn/[pairId]/progress`. Display: streak badge, XP bar per level, daily XP chart (last 7 days), lessons completed count, messages sent count.

**Dependencies:** M4-01  
**Priority:** Medium

---

### M4-04: Frontend Vocabulary Page

**Description:** Build `/learn/[pairId]/vocabulary`. List words due for review. Flashcard-style review: show target word, reveal source translation, mark correct/incorrect. Show next review date.

**Dependencies:** M4-02  
**Priority:** Medium

---

## Milestone 5 — Polish and Launch Prep

### M5-01: Error Handling and Loading States

**Description:** Add consistent error boundaries, API error toasts, and skeleton loading states across all pages.

**Dependencies:** Milestones 1–4  
**Priority:** Medium

---

### M5-02: Responsive Design Audit

**Description:** Test and fix all pages on mobile (375px), tablet (768px), and desktop (1280px). The existing landing page is already responsive; audit the new app pages.

**Dependencies:** Milestones 1–4  
**Priority:** Medium

---

### M5-03: Rate Limiting

**Description:** Add rate limiting to AI-backed endpoints (`/chat`, `/lesson/generate`, `/assessment/score-*`). Use in-memory rate limiter (slowapi) for MVP. Limits: 30 chat messages per user per hour, 10 lesson generations per user per hour.

**Dependencies:** M1-06, M3-02  
**Priority:** Medium

---

### M5-04: Environment and Secrets Audit

**Description:** Verify all secrets are in environment variables. Remove `shutil.which("ffmpeg")` debug print and other debug logging from production code. Ensure CORS origins are tightly configured.

**Dependencies:** Milestones 1–4  
**Priority:** High

---

### M5-05: Deployment

**Description:** Deploy frontend to Vercel. Deploy backend to Render. Configure environment variables. Run database initialisation. Smoke test all critical flows (register → add pair → chat → assessment → lesson → progress).

**Dependencies:** M5-04  
**Priority:** Critical

---

## Post-MVP Backlog

These items are not required for launch but are sequenced for the first post-MVP sprint.

| ID | Feature | Notes |
|---|---|---|
| F-01 | Audio transcription in chat | Wire existing `transcriber.py` into the chat endpoint |
| F-02 | Password reset email | Send reset link via SendGrid or Resend |
| F-03 | Social login (Google) | OAuth 2.0 |
| F-04 | Leaderboard | Weekly XP ranking per language pair |
| F-05 | Streak recovery | Pay gems/tokens to restore a broken streak |
| F-06 | Push notifications | Web Push API for daily reminders |
| F-07 | PostgreSQL migration | Replace SQLite with managed Postgres |
| F-08 | Teacher marketplace | Booking and video call integration |
| F-09 | Group sessions | Shared chat rooms for a language pair |
| F-10 | Pronunciation scoring | Phoneme-level analysis beyond transcription |
