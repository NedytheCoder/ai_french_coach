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

### M1-03: Languages Endpoint ✅ COMPLETED 2026-05-31

**Description:** Implement `GET /languages` returning all active languages from the database.

**Implemented:**
- `backend/models/languages.py` — `LanguageOut` and `LanguagesResponse` Pydantic models
- `backend/api/languages.py` — `GET /languages` returning `{ "languages": [...] }` ordered by name, active only
- `backend/main.py` — languages router registered
- `docs/api_contract.md §2` — added `is_rtl` field to response (required for RTL script support; language-pair agnosticism invariant)

**Dependencies:** M1-01  
**Priority:** Critical

---

### M1-04: Language Pair CRUD ✅ COMPLETED 2026-05-31

**Description:** Implement `GET /user/language-pairs`, `POST /user/language-pairs`, `DELETE /user/language-pairs/{id}`. Enforce the unique constraint (one pair per target language per user) and the source ≠ target constraint.

**Implemented:**
- `backend/models/pairs.py` — `LanguageBrief`, `PairOut`, `PairsResponse`, `CreatePairRequest`
- `backend/services/pairs_service.py` — `list_pairs`, `create_pair`, `delete_pair`; all business logic isolated per Rule 5
- `backend/api/pairs.py` — all three endpoints; all protected with `Depends(get_current_user)` per Rule 4
- `backend/main.py` — pairs router registered

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

### M1-06: Chat Endpoint ✅ COMPLETED 2026-05-31

**Description:** Implement `POST /chat` and `GET /chat/sessions` and `GET /chat/sessions/{id}/messages`. Use `PromptBuilder` for system prompts. Persist sessions and messages. Award 5 XP per assistant reply. Extract vocabulary from assistant response and save to `vocabulary_items`.

**Implemented:**
- `backend/ai/chat_handler.py` — wraps `PromptBuilder.tutor_system_prompt()` + OpenAI `gpt-4o-mini` call; appends a VOCAB instruction so the model returns `word=translation` pairs in one API call; `_parse_reply()` strips the VOCAB line from the displayed reply
- `backend/models/chat.py` — `ChatRequest`, `ChatResponse`, `SessionOut`, `SessionsResponse`, `MessageOut`, `MessagesResponse`
- `backend/services/chat_service.py` — `send_message` (pair ownership check, session get-or-create, history fetch, AI call, persist messages, XP award, vocabulary save), `list_sessions`, `get_messages`; streak tracking per ADR-003; daily `progress_records` upsert
- `backend/api/chat.py` — all three endpoints; auth-guarded with `Depends(get_current_user)` per Rule 4
- `backend/main.py` — chat router registered

**Key decisions:**
- Vocabulary extracted via a VOCAB suffix on the system prompt (one API call, not two); `source_translation` stored from the model's paired output
- `_HISTORY_LIMIT = 20` messages sent to AI for context
- 5 XP per assistant reply per ADR-003; streak and `progress_records` updated atomically in the same transaction

**Dependencies:** M1-04, M1-05  
**Priority:** Critical

---

### M1-07: Frontend Auth — Login and Register ✅ COMPLETED 2026-05-31

**Description:** Wire the existing `/auth/login` and `/auth/signup` pages to the new auth API. Implement `AuthContext` with `login`, `logout`, and `user` state. Store JWT in `localStorage` for MVP. Add `AuthGuard` HOC that redirects unauthenticated users to `/auth/login`.

**Implemented:**
- `app/auth/AuthProvider.tsx` — `AuthContext` with `login`, `register`, `logout`, `isLoading`, `isAuthenticated`; restores session via `GET /auth/me` with refresh-token fallback per `architecture.md` §Auth Flow
- `app/auth/AuthGuard.tsx` — redirects unauthenticated users to `/auth/login`; shows loading state while session is restoring
- `app/auth/login/page.tsx` — wired to `auth.login()`; redirects to `/dashboard` on success
- `app/auth/signup/page.tsx` — wired to `auth.register()`; fetches languages from `GET /languages` for native-language selector; form trimmed to API contract fields only
- `app/layout.tsx` — `AuthProvider` registered at root
- `docs/architecture.md` — updated auth routes (`auth/` vs `(auth)/`), `AuthContext` type, and Auth Flow diagram

**Fixes applied during audit:**
- Corrected broken import paths (`../../AuthProvider` → `../AuthProvider`) in login and signup pages
- Removed 3 hard-coded "French" strings (Rule 1 / governance §4.2)
- Added `GET /auth/me` + refresh-token fallback on session restore (architecture.md §Auth Flow)
- Stripped dead form fields from signup (phone, motivation, referral, goal — never stored)
- Updated `architecture.md` to match actual route structure and `AuthContext` shape

**Dependencies:** M1-02  
**Priority:** Critical

---

### M1-08: Frontend Language Pair Selection ✅ COMPLETED 2026-05-31

**Description:** Build `/languages` page. Fetch supported languages from `GET /languages`. Allow user to add a new language pair via `POST /user/language-pairs`. Display active pairs on dashboard. Implement `LanguagePairContext`.

**Implemented:**
- `app/Types.ts` — added `Language`, `LanguageBrief`, `UserLanguagePair` types
- `lib/api.ts` — `languagesApi.list`, `pairsApi.list/create/remove` (per frontend engineering rule: fetch wrappers live in `lib/api.ts`)
- `lib/hooks.ts` — `useLanguages()`, `usePairs(token)` (per rule: components call hooks, not fetch)
- `app/LanguagePairProvider.tsx` — `LanguagePairContext` with `activePair`/`setActivePair` per `architecture.md` §State Management
- `app/layout.tsx` — `LanguagePairProvider` registered inside `AuthProvider`
- `app/languages/page.tsx` — auth-guarded; shows existing pairs with delete-with-confirm; add-pair form with source + target language selects populated from `GET /languages`; `is_rtl`-aware option labels
- `app/dashboard/page.tsx` — `LanguagePairsSection` component shows real pairs (empty state with link to `/languages`; loaded state shows cards linking to `/learn/[pairId]/chat`)

**Dependencies:** M1-04, M1-07  
**Priority:** Critical

---

### M1-09: Frontend Chat Page ✅ COMPLETED 2026-05-31

**Description:** Refactor the existing `/conversation` pages into a single `/learn/[pairId]/chat` page. Pass `pair_id` and `mode` in each request. Display session list and message history. Award XP feedback on each reply.

**Implemented:**
- `app/Types.ts` — added `ChatApiResponse`, `ChatSession`, `ChatMessage`
- `lib/api.ts` — `chatApi.send`, `chatApi.getSessions`, `chatApi.getMessages`
- `lib/hooks.ts` — `useSessions(token, pairId)`
- `app/learn/[pairId]/chat/page.tsx` — full chat UI wired to `POST /chat`; auth-guarded; `useParams()` for Next.js 16 client-component route params

**Language-pair agnosticism:**
- TTS uses `pair.target_language.code` (not hard-coded `"fr-FR"`)
- Empty state shows `pair.target_language.name` dynamically
- `dir="auto"` on input and message text for RTL language support
- All hard-coded French suggested prompts removed

**Features:**
- Mode selector (general / introductions / travel / daily_life) using API mode names
- Session history panel — browse past sessions, click to load messages
- "New chat" button — clears messages and resets session ID
- XP toast (+N XP ✨) on each AI reply, auto-dismisses after 2.5 s
- Voice recording → `/conversation/transcribe` → `/chat` pipeline
- TTS listen button on every assistant message

**Dependencies:** M1-06, M1-08  
**Priority:** Critical

---

### M1-10: Dashboard ✅ COMPLETED 2026-05-31

**Description:** Build `/dashboard` showing: active language pairs with current level and streak, recommended next action (start chat / take assessment), and total XP per pair. Data from `GET /user/language-pairs` and `GET /progress/{pair_id}`.

**Implemented:**
- `app/dashboard/page.tsx` — complete rewrite; all mock data removed
- Hero greets user by `user.display_name` (from `AuthContext`) with time-of-day greeting
- Per-pair cards show: source → target language, CEFR level badge (colour-coded), XP total, XP progress bar to next level, streak badge, primary action (Chat / Start chatting) and Assessment CTA for new learners
- `setActivePair()` called on pair selection (wires `LanguagePairContext`)
- Empty state with "Add your first language" CTA; "Add another language" tile appended to grid
- XP level thresholds defined as frontend constants (mirror `services/progress_service.py` per ADR-003)

**Deferred dependency:**
- `GET /progress/{pair_id}` (M4-01) not yet implemented; the progress chart and daily XP history will be added when M4-01 ships. Level progress bar is computed client-side from `total_xp` + threshold constants in the interim.

**Language-pair agnosticism:**
- All previous mock data removed, including hard-coded "French" strings in tip/quote text
- All pair content is driven by `source_language.name` / `target_language.name` from the DB

**Dependencies:** M1-08  
**Priority:** Critical

---

## Milestone 2 — Placement Assessment

Placement testing determines the learner's starting level and unlocks the appropriate lesson tier.

### M2-01: Assessment Content — Language-Pair-Aware Generation ✅ COMPLETED 2026-05-31

**Description:** Implement `backend/ai/assessment_scorer.py`. Create `PromptBuilder` methods for `assessment_scoring_prompt` (writing and speaking). Migrate existing hard-coded French assessment questions from `reception.py` / SQLite to the new `assessments` system. Ensure reading and listening questions can be AI-generated for any language pair.

**Implemented:**
- `backend/ai/prompt_builder.py` — two new methods added:
  - `assessment_question_prompt(source_language, target_language, level, skill, count)` — generates structured question prompts; reading/listening → `multiple_choice`; writing/speaking → `open_response`; no language names hard-coded
  - `assessment_scoring_prompt(source_language, target_language, level, skill, question, user_answer)` — returns `{is_correct, feedback, score_percent}`
- `backend/ai/assessment_scorer.py` — AI layer functions:
  - `generate_questions(source_language, target_language, level, skill, count)` → list of question dicts with `id`, `skill`, `level`, `xp_reward`, `correct_index` (stripped by M2-02 before sending to client)
  - `score_writing(...)` / `score_speaking(...)` → `{is_correct, feedback, xp_awarded}`
  - `XP_BY_LEVEL` constant: A0=10 → C2=40 (ADR-003 compliant)
  - Blank/whitespace answers short-circuit to 0 XP without an API call
  - Uses `response_format={"type": "json_object"}` for reliable structured output
- `backend/tests/test_assessment_scorer.py` — 32 unit tests passing; covers prompt language injection, schema hints, XP tier values, XP arithmetic, blank-answer guard

**Migration note:** The legacy French-specific SQLite tables (`reading_placement_tests`, `listening_placement_tests`, `writing_placement_tests`, `speaking_placement_tests`) were already dropped in M1-01 `migrate_db.py`. There was no row-level data to migrate; the content is fully replaced by AI-generated questions for any language pair.

**Dependencies:** M1-05  
**Priority:** High

---

### M2-02: Assessment Endpoints ✅ COMPLETED 2026-05-31

**Description:** Implement `POST /assessment/start`, `POST /assessment/{id}/submit`, `GET /assessment/{id}/result`, `POST /assessment/score-writing`, and `POST /assessment/score-speaking`. On completion, update `user_language_pairs.current_level` to the assessed level.

**Implemented:**
- `backend/database/migrations/__init__.py` — migration runner; applies numbered `*.sql` files once, records version in `schema_migrations`
- `backend/database/migrations/001_assessment_questions.sql` — adds `questions_json TEXT NOT NULL DEFAULT '[]'` to `assessments` (Rule 10: additive-only migration)
- `backend/database/migrations/002_assessment_feedback.sql` — adds `feedback TEXT` to `assessments`; persists the feedback text generated at submit time so `GET /assessment/{id}/result` can return it without recomputation
- `backend/scripts/init_db.py` — updated to call `apply_pending_migrations()` after schema creation
- `backend/ai/transcriber.py` — `transcribe(audio_bytes) -> str`; lazy OpenAI client; no language-specific hint (model auto-detects); Rule 2 compliant
- `backend/models/assessment.py` — Pydantic models for all 5 endpoints
- `backend/services/assessment_service.py` — Rule 5: all business logic; `start_assessment` generates 1 question/skill via AI; `submit_assessment` auto-scores multiple_choice and calls scorer for writing/speaking; updates `current_level` and `total_xp` on the pair; level advances when overall score ≥ 70%
- `backend/api/assessment.py` — all 5 handlers; auth-guarded (Rule 4); `correct_index` stripped before returning questions to client
- `backend/main.py` — assessment router registered

**Key decisions:**
- `questions_json` stores full questions (including `correct_index`) server-side; never exposed to client
- 1 question per skill (not 2) to keep generation latency ≤ ~5s for a 4-skill assessment
- Speaking answers in the assessment flow are pre-transcribed by the client (via `/conversation/transcribe`) and submitted as text; `POST /assessment/score-speaking` handles raw audio for standalone scoring
- Level advancement threshold: overall score ≥ 70% → advance to next CEFR level

**Dependencies:** M2-01, M1-04  
**Priority:** High

---

### M2-03: Frontend Assessment Flow ✅ COMPLETED 2026-05-31

**Description:** Build `/learn/[pairId]/assessment` page. Render reading (multiple choice), writing (textarea), and speaking (audio recorder) question types. Submit answers and display result with level placement and XP summary.

**Implemented:**
- `app/Types.ts` — added `AssessmentQuestion`, `AssessmentResult`, `StartAssessmentResponse`, `SubmitAssessmentResponse`
- `lib/api.ts` — `assessmentApi.start()`, `assessmentApi.submit()`
- `app/learn/[pairId]/assessment/page.tsx` — full 5-phase flow:
  - **Intro:** assessment type selector (placement/progress), skill checkboxes (all 4 default), start button
  - **Generating:** spinner while AI creates questions (~10–15s)
  - **Questions:** one question at a time with progress bar; three renderers:
    - `MultipleChoiceQuestion` — passage (`dir="auto"` for RTL), lettered option cards
    - `WritingQuestion` — textarea with `dir="auto"`, character count
    - `SpeakingQuestion` — mic button → record → auto-transcribe via `transcriptionApi` → show transcript with re-record option
  - **Submitting:** spinner while scoring
  - **Results:** assessed CEFR level + "Level Up!" badge if advanced, XP earned, per-skill breakdown, Start Chatting / Retake CTAs

**Language-pair agnosticism:**
- All question content rendered as received from API — no language names hard-coded
- `dir="auto"` on target-language text fields (passage, writing/speaking answers)
- Pair name and target language name always injected from pair data

**Dependencies:** M2-02  
**Priority:** High

---

## Milestone 3 — Lesson Delivery

Structured lessons that the learner works through at their placed level.

### M3-01: Lesson Generator ✅ COMPLETED 2026-05-31 (patched 2026-06-01)

**Description:** Implement `backend/ai/lesson_generator.py`. Support lesson types: vocabulary, grammar, reading, listening, writing, speaking. `generate_lesson(source_language, target_language, level, lesson_type, topic)` calls OpenAI with a structured prompt and returns a validated `content_json` blob. Cache generated lessons per `(pair_id, level, lesson_type, topic)` to avoid redundant AI calls.

**Implemented:**
- `backend/ai/prompt_builder.py` — added `LessonType` literal and `PromptBuilder.lesson_prompt(source_language, target_language, level, lesson_type, topic)` with per-type JSON schema instructions for all 6 lesson types
- `backend/ai/lesson_generator.py` — `GeneratedLesson` dataclass (`title`, `content: dict`, `xp_reward`); process-level dict cache keyed by `(source_language, target_language, level, lesson_type, topic)`; `generate_lesson()` calls `PromptBuilder.lesson_prompt()`, uses `response_format={"type": "json_object"}` for guaranteed JSON output, pops `title` from the blob, caches and returns `GeneratedLesson`

**Content schemas per type:**
- `vocabulary`: `{items: [{target_word, source_translation, example_sentence, example_translation}]}` — 8–12 items
- `grammar`: `{explanation, examples: [{target_sentence, source_translation, note}], exercises: [{prompt, answer, options}]}`
- `reading`: `{passage, passage_translation, questions: [{question, options, correct_index}]}`
- `listening`: `{transcript, transcript_translation, questions: [{question, options, correct_index}]}`
- `writing`: `{instructions, prompt, example_response, criteria: [string]}`
- `speaking`: `{context, prompts: [{text, example_response}]}`

**XP rewards:** vocabulary 25, grammar 30, reading 30, listening 30, writing 40, speaking 40

**Patch 2026-06-01:** Added `"listening": 30` to `_XP_BY_TYPE` (was absent, silently defaulted to 25). Updated `docs/architecture.md` `PromptBuilder.lesson_prompt` signature to include `topic` parameter.

**Dependencies:** M1-05  
**Priority:** High

---

### M3-02: Lesson Endpoints ✅ COMPLETED 2026-05-31 (patched 2026-06-01)

**Description:** Implement `POST /lesson/generate`, `GET /lesson/{id}`, and `POST /lesson/{id}/complete`. On completion, record XP in `progress_records`, check for level-up, update `user_language_pairs.current_level` if threshold crossed.

**Implemented:**
- `backend/models/lesson.py` — `GenerateLessonRequest`, `LessonOut`, `CompleteLessonRequest`, `CompleteLessonResponse`
- `backend/services/lesson_service.py` — `generate_or_get_lesson` (DB cache: returns existing lesson if `(pair_id, level, lesson_type, topic)` already exists; otherwise calls `ai.lesson_generator`, persists, returns); `get_lesson` (ownership-checked fetch); `complete_lesson` (idempotent: returns `xp_awarded: 0` if already completed; otherwise marks completed, awards proportional XP, upserts `progress_records`, updates streak, calls `check_and_advance_level`)
- `backend/services/progress_service.py` — added `check_and_advance_level(conn, pair_id)` using `_CUMULATIVE_XP` thresholds (authoritative per ADR-003); updates `current_level` in DB and returns `(leveled_up, new_level)`; added `_LEVEL_ORDER` constant
- `backend/api/lessons.py` — all three endpoints; auth-guarded; `POST /lesson/generate` has `@limiter.limit(LESSON_GENERATE_LIMIT)` rate limiting; `GET /lesson/{id}` and `POST /lesson/{id}/complete` are unrated
- `backend/main.py` — lessons router registered

**Key decisions:**
- DB-level caching in `generate_or_get_lesson`: returns the most recent lesson for `(pair_id, level, lesson_type, topic)` — if found, no AI call is made regardless of `is_completed` state
- XP awarded proportionally: `round(xp_reward * score / max_score)`; falls back to full `xp_reward` when `max_score == 0`
- Level-up check calls `progress_service.check_and_advance_level` to keep XP thresholds in one authoritative place (ADR-003)

**Patch 2026-06-01:** `complete_lesson` now guards against re-completion — if `is_completed` is already `1`, returns `xp_awarded: 0` and current `total_xp` without re-awarding XP or incrementing `progress_records`.

**Dependencies:** M3-01, M1-04  
**Priority:** High

---

### M3-03: Frontend Lesson Page ✅ COMPLETED 2026-06-01

**Description:** Build `/learn/[pairId]/lesson/[lessonId]` page. Render content based on `lesson_type`. Vocabulary lessons: flashcard-style flip cards. Grammar lessons: explanation + fill-in-the-blank. Reading: passage + multiple choice. Writing: prompt + textarea + AI score. Speaking: prompt + audio recorder + AI score. Show XP award and level-up celebration on completion.

**Implemented:**
- `frontend/app/Types.ts` — added `CompleteLessonResponse`, `WritingScoreResult`, `SpeakingScoreResult` types
- `frontend/lib/api.ts` — added `lessonApi.complete`, `scoringApi.scoreWriting`, `scoringApi.scoreSpeaking`
- `frontend/lib/hooks.ts` — added `useLesson(token, lessonId)` hook
- `frontend/app/learn/[pairId]/lesson/[lessonId]/page.tsx` — full lesson page with 6 renderers:
  - **VocabularyLesson** — tap-to-flip flashcards with progress bar; awards full XP on completion
  - **GrammarLesson** — learn phase (explanation + examples) then practice phase (fill-in-the-blank or multiple-choice exercises, auto-scored client-side)
  - **ReadingLesson** — passage (`dir="auto"`) + per-question multiple choice; reveals passage translation and correct answers on submit
  - **ListeningLesson** — transcript (`dir="auto"`) + per-question multiple choice; reveals transcript translation and correct answers on submit
  - **WritingLesson** — instructions + prompt + textarea; calls `POST /assessment/score-writing` for AI feedback + XP; shows example response after scoring
  - **SpeakingLesson** — per-prompt recorder → transcription → `POST /assessment/score-speaking` → AI feedback + example response
  - **CompletionScreen** — animated XP card, level-up badge when `result.level_up`, Continue Learning / Dashboard CTAs

**Patch 2026-06-01:** Added `ListeningLesson` renderer (was absent; `listening` lessons were unrenderable). Fixed stale closure in `SpeakingLesson.stopRecording` — transcription fallback now reads a local variable instead of the captured state value.

**Language-pair agnosticism:**
- `dir="auto"` on all target-language text fields
- No language names hard-coded; pair names always come from the pair record
- `pair_id` and `level` passed to scoring endpoints from the lesson record, not from component state

**Dependencies:** M3-02  
**Priority:** High

---

### M3-04: Learning Path Page ✅ COMPLETED 2026-05-31

**Description:** Build `/learn/[pairId]` page. Show CEFR levels A0–C2 as a path. Lock levels above the current level. Show lessons available per level. Show completion count and XP per level.

**Implemented:**
- `frontend/app/Types.ts` — added `LessonOut` type matching `POST /lesson/generate` response
- `frontend/lib/api.ts` — added `lessonApi.generate()` and `lessonApi.get()` fetch wrappers
- `frontend/app/learn/[pairId]/page.tsx` — full learning path page:
  - Sticky header with pair name (`source → target` from pair data), CEFR level badge, back link to `/dashboard`
  - Quick-nav strip linking to chat, assessment, vocabulary, progress sub-pages
  - Hero card: current level, total XP, streak (from `GET /user/language-pairs`)
  - Vertical CEFR level path (A0–C2); each level is a collapsible card:
    - **Completed levels** (below current): green check badge, collapsed by default, expandable
    - **Current level**: blue gradient, star badge, "CURRENT" pill, expanded by default
    - **Locked levels** (above current): 55% opacity, lock icon, non-interactive
  - Each unlocked level expands to show 6 lesson type cards (vocabulary/grammar/reading/listening/writing/speaking) in a 2-col grid on sm+ screens
  - Clicking a lesson type calls `POST /lesson/generate`, shows per-card spinner while generating, then navigates to `/learn/[pairId]/lesson/[lessonId]` (M3-03)
  - Error toast on generation failure; toast on pairs fetch failure

**Language-pair agnosticism:**
- Header and hero show `source_language.name → target_language.name` dynamically from pair record
- No language names anywhere in component logic; all content flows through `pair_id`
- No `dir="auto"` needed — all text is UI labels, not user-language content

**Patch 2026-06-01:** Added `listening` to `LESSON_TYPES` array. Fixed `generatingKey` not cleared on successful lesson generation (spinner persisted on back-navigation).

**Deferred dependency:**
- Per-level completion counts and XP require a `GET /lessons?pair_id=X&level=Y` endpoint (not yet in api_contract.md). Dashboard shows total XP from pair record in the interim; per-level stats will be added with that endpoint.

**Dependencies:** M3-02  
**Priority:** High

---

## Milestone 4 — Progress and Vocabulary

### M4-01: Progress Endpoint ✅ COMPLETED 2026-05-31

**Description:** Implement `GET /progress/{pair_id}`. Aggregate `progress_records` for daily history. Compute streak from `last_activity_date`. Compute level progress percentage from XP thresholds.

**Implemented:**
- `backend/models/progress.py` — `DailyRecord`, `LevelProgress`, `ProgressResponse` Pydantic models
- `backend/services/progress_service.py` — `get_progress`; XP thresholds and cumulative XP constants per ADR-003 (authoritative source); `_compute_level_progress` returns `xp_in_level`, `xp_required`, `percent`; last 7 daily records returned in ascending date order
- `backend/api/progress.py` — `GET /progress/{pair_id}`; auth-guarded with `Depends(get_current_user)`
- `backend/main.py` — progress router registered

**Dependencies:** M1-04  
**Priority:** Medium

--- 

### M4-02: Vocabulary Endpoints ✅ COMPLETED 2026-05-31

**Description:** Implement `GET /vocabulary`, `POST /vocabulary/{id}/review`. Implement simple spaced repetition: correct answer doubles the interval (1d → 2d → 4d → 8d…), incorrect answer resets to 1 day.

**Implemented:**
- `backend/models/vocabulary.py` — `VocabularyItemOut`, `VocabularyListResponse`, `ReviewRequest`, `ReviewResponse`
- `backend/services/vocabulary_service.py` — `list_vocabulary` (with optional `due_for_review` filter); `review_vocabulary` with doubled-interval SRS logic per ADR-003; 2 XP per correct review; updates `user_language_pairs.total_xp`
- `backend/api/vocabulary.py` — `GET /vocabulary`, `POST /vocabulary/{item_id}/review`; both auth-guarded
- `backend/main.py` — vocabulary router registered

**Dependencies:** M1-04  
**Priority:** Medium

---

### M4-03: Frontend Progress Page ✅ COMPLETED 2026-05-31

**Description:** Build `/learn/[pairId]/progress`. Display: streak badge, XP bar per level, daily XP chart (last 7 days), lessons completed count, messages sent count.

**Implemented:**
- `frontend/app/Types.ts` — added `DailyRecord`, `LevelProgress`, `ProgressData` types matching `GET /progress/{pair_id}` response shape
- `frontend/lib/api.ts` — `progressApi.get(token, pairId)` fetch wrapper
- `frontend/lib/hooks.ts` — `useProgress(token, pairId)` hook
- `frontend/app/learn/[pairId]/progress/page.tsx` — auth-guarded progress page; 2×2 stat cards (streak, longest streak, lessons, messages); animated level XP bar; 7-day CSS bar chart with hover XP labels; total XP hero card; empty/loading/error states

**Language-pair agnosticism:**
- Header shows `source_language.name → target_language.name` from the pair record (not hard-coded)
- No language names anywhere in the component; all data flows through `pair_id`
- Back link targets `/learn/${pairId}` (M3-04 route, language-pair-scoped)

**Dependencies:** M4-01  
**Priority:** Medium

---

### M4-04: Frontend Vocabulary Page ✅ COMPLETED 2026-05-31

**Description:** Build `/learn/[pairId]/vocabulary`. List words due for review. Flashcard-style review: show target word, reveal source translation, mark correct/incorrect. Show next review date.

**Implemented:**
- `frontend/app/Types.ts` — added `VocabularyItem` and `ReviewResult` types
- `frontend/lib/api.ts` — `vocabularyApi.list(token, pairId, dueForReview, limit)` and `vocabularyApi.review(token, itemId, correct)` fetch wrappers
- `frontend/lib/hooks.ts` — `useVocabulary(token, pairId, dueForReview)` hook
- `frontend/app/learn/[pairId]/vocabulary/page.tsx` — auth-guarded vocabulary page; two tabs: Review (flashcard session) and Browse (full word list)

**Review tab:**
- Shows only words due for review (`due_for_review=true`)
- Flashcard flow: target word shown → click Reveal → source translation + context sentence appear → mark Got it / Didn't get it
- Calls `POST /vocabulary/{id}/review` per card; XP toast on correct answers
- Session summary on completion with total XP earned and restart button
- "All caught up" empty state when no words are due

**Browse tab:**
- Shows all saved words with source translation and context sentence
- Next review date badge (amber "Due now" or grey date)
- Times-correct/times-seen accuracy display

**Language-pair agnosticism:**
- `dir="auto"` on all word/translation text for RTL script support
- Header shows `source_language.name → target_language.name` dynamically
- No language names or codes in component logic

**Dependencies:** M4-02  
**Priority:** Medium

---

## Milestone 5 — Polish and Launch Prep

### M5-01: Error Handling and Loading States ✅ COMPLETED 2026-05-31 (patched 2026-06-01)

**Description:** Add consistent error boundaries, API error toasts, and skeleton loading states across all pages.

**Implemented:**
- `frontend/app/error.tsx` — Next.js 16 route error boundary (catches render errors in any nested route); "Try again" calls `unstable_retry`, "Go to dashboard" escape link
- `frontend/app/global-error.tsx` — root-level crash handler; includes its own `<html>/<body>` as required by Next.js 16
- `frontend/app/components/ToastProvider.tsx` — `ToastProvider` context + `useToast()` hook; dismissible toasts (error/success) with 4.5s auto-dismiss; stacked fixed-position; `role="alert"` for accessibility
- `frontend/app/components/Skeleton.tsx` — `SkeletonPairCard`, `SkeletonListItem`, `SkeletonLine` pulsing placeholder components
- `frontend/app/layout.tsx` — `ToastProvider` added around all app content
- `frontend/app/dashboard/page.tsx` — `useEffect` error→toast wiring; 2× `SkeletonPairCard` while loading (replaces loading text)
- `frontend/app/languages/page.tsx` — error toasts for `useLanguages` and `usePairs` fetch failures; 2× `SkeletonListItem` while loading; delete errors now toasted (was silently ignored)
- `frontend/app/learn/[pairId]/progress/page.tsx` — inline error block replaced with `useToast`; spinner retained

**Language-pair agnosticism:** All new components are generic UI; no language names anywhere ✅

**Rerun audit 2026-06-01:** All original artefacts pass. Next.js version confirmed as 16.2.1; `unstable_retry` prop name is correct per installed docs. Pages added post-M5-01 (lesson, vocabulary, chat) use inline error states rather than `addToast` — outside original scope but represent incomplete "across all pages" coverage. Tracked below.

**Known gaps (post-M5-01 scope growth):**
- `learn/[pairId]/lesson/[lessonId]` — completion errors use inline phase state; no toast
- `learn/[pairId]/vocabulary` — fetch errors use inline block; no toast
- `learn/[pairId]/chat` — API errors injected as fake assistant messages; no toast

**Dependencies:** Milestones 1–4  
**Priority:** Medium

---

### M5-02: Responsive Design Audit ✅ COMPLETED 2026-05-31

**Description:** Test and fix all pages on mobile (375px), tablet (768px), and desktop (1280px). The existing landing page is already responsive; audit the new app pages.

**Scope note:** M2-02/03, M3-02/03/04, M4-04 are not yet built; those pages will be audited when they ship. This audit covers all currently existing app pages.

**Pages audited (initial):** `/auth/login`, `/auth/signup`, `/auth/forgot-password`, `/auth/change-password`, `/dashboard`, `/languages`, `/learn/[pairId]/chat`, `/learn/[pairId]/progress`

**Issues found and fixed:**

1. **Governance violation — `AuthLayout.tsx`** (pre-existing, discovered during audit)
   - `DefaultLeftContent` hard-coded `"Start Your French Journey"` (Rule 1 / governance §4.2)
   - The logo badge displayed `"Fr"` (French abbreviation) as a character
   - Fixed: badge changed to `🌍` emoji; headline changed to `"Master a New Language"`

2. **`progress/page.tsx` — `StatCard` overflow on 375px**
   - `p-5 gap-4 w-11 h-11 text-2xl` in a 2-col grid leaves ~65px for the value text; 4+ digit numbers overflowed
   - Fixed: `p-4 sm:p-5`, `gap-3 sm:gap-4`, `w-10 h-10 sm:w-11 sm:h-11`, `text-xl sm:text-2xl`, added `min-w-0 truncate` to text container

**No issues found in (initial):** auth forms, dashboard nav/cards, languages form/pair cards, chat header/input/sessions panel — all already responsive across 375/768/1280px.

**Rerun audit 2026-06-01:** Extended coverage to all pages deferred from initial run. All original fixes confirmed intact. No regressions found.

**Pages audited (rerun — previously deferred):** `/learn/[pairId]/assessment`, `/learn/[pairId]/lesson/[lessonId]`, `/learn/[pairId]`, `/learn/[pairId]/vocabulary`

**Rerun result: CLEAN PASS on all four new pages.** No fixes required. Two defensive watch notes recorded:
- `assessment/page.tsx` IntroScreen: language pair header `flex` row has no `flex-wrap`; safe with current 12-language set but would overflow with future language names longer than ~12 characters (governance §4.3 risk).
- `vocabulary/page.tsx` + `lesson/[lessonId]/page.tsx`: flashcard `text-2xl` word display lacks `overflow-wrap: break-word`; safe for AI-generated vocabulary, theoretical edge case for single-token compound words without break opportunities.

**Dependencies:** Milestones 1–4  
**Priority:** Medium

---

### M5-03: Rate Limiting ✅ COMPLETED 2026-05-31

**Description:** Add rate limiting to AI-backed endpoints (`/chat`, `/lesson/generate`, `/assessment/score-*`). Use in-memory rate limiter (slowapi) for MVP. Limits: 30 chat messages per user per hour, 10 lesson generations per user per hour.

**Implemented:**
- `backend/middleware/rate_limit.py` — `Limiter` with per-user JWT key function (`_user_id_key`); `CHAT_LIMIT = "30/hour"`, `LESSON_GENERATE_LIMIT = "10/hour"`, `ASSESSMENT_SCORE_LIMIT = "20/hour"` (raised from 10 — see rerun notes)
- `backend/main.py` — `app.state.limiter` assigned; `RateLimitExceeded` handler registered
- `backend/api/chat.py` — `POST /chat` decorated with `@limiter.limit(CHAT_LIMIT)`; `request: Request` added
- `backend/api/lessons.py` — `POST /lesson/generate` decorated with `@limiter.limit(LESSON_GENERATE_LIMIT)`; `request: Request` added
- `backend/api/assessment.py` — `POST /assessment/score-writing` and `POST /assessment/score-speaking` decorated with `@limiter.limit(ASSESSMENT_SCORE_LIMIT)`; `request: Request` added
- `backend/tests/test_rate_limit.py` — 12 unit tests; all passing
- `docs/decisions/004-rate-limiting.md` — ADR for slowapi adoption
- `docs/api_contract.md` — 429 status and rate limit table added to Conventions
- `docs/architecture.md` — Rate Limiting Middleware section added

**Key decisions (ADR-004):** Per-user keying (JWT `sub` claim); in-memory backend for MVP; key function falls back to client IP; Redis upgrade is a one-line constructor change.

**Rerun audit 2026-06-01:** Three artefacts were stale due to `ASSESSMENT_SCORE_LIMIT` being raised from `"10/hour"` to `"20/hour"` during the M3 milestone audit (Gap 2 fix — shared rate-limit bucket between assessment and lesson scoring flows). Fixed:
- `backend/tests/test_rate_limit.py` — `test_assessment_score_limit_is_10_per_hour` renamed to `test_assessment_score_limit_is_20_per_hour`; assertion updated to `"20/hour"`. All 12 tests now pass.
- `docs/decisions/004-rate-limiting.md` — assessment score limits updated to 20/hour; rationale for the change documented inline.
- `docs/architecture.md` — Rate Limiting section updated to reflect 20/hour with shared-budget note.
All other artefacts (endpoint decorators, key function, `main.py` wiring, `api_contract.md`) were already correct.

**Dependencies:** M1-06, M3-02  
**Priority:** Medium

---

### M5-04: Environment and Secrets Audit ✅ COMPLETED 2026-06-01

**Description:** Verify all secrets are in environment variables. Remove `shutil.which("ffmpeg")` debug print and other debug logging from production code. Ensure CORS origins are tightly configured.

**Implemented:**
- `backend/main.py` — startup enforcement for `JWT_SECRET_KEY` and `OPENAI_API_KEY`; server now raises `RuntimeError` on boot if either is absent (per ADR-002 constraint). CORS `allow_methods` tightened from `["*"]` to `["GET", "POST", "DELETE"]`; `allow_headers` tightened from `["*"]` to `["Content-Type", "Authorization"]`.
- `backend/api/conversation.py` — removed `print(f"Error during transcription: {e}")` debug statement from the active `/conversation/transcribe` handler.
- `backend/api/reception.py` — removed `print(DB_PATH)` debug statement from module level.
- `.gitignore` (root) — broadened `.env` pattern to `.env*` to cover `.env.local`, `.env.production`, and similar variants (frontend `.gitignore` already used `.env*`).

**Secrets verification result:**
- `JWT_SECRET_KEY` — `os.getenv()` in `auth_service.py`; `RuntimeError` if absent (startup + per-call) ✅
- `OPENAI_API_KEY` — `os.getenv()` in all AI layer modules; `RuntimeError` if absent at startup ✅
- `ALLOWED_ORIGINS` — `os.getenv()` with safe fallback in `main.py` ✅
- `DATABASE_PATH` — filesystem path, no secret ✅

**Note:** `shutil.which("ffmpeg")` was not present in the codebase — already resolved before this run. `print()` statements in `scripts/init_db.py`, `scripts/migrate_db.py`, and `database/migrations/__init__.py` are legitimate CLI/startup diagnostic output and were intentionally left.

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
| F-11 | Localize server-side assessment feedback | `_build_feedback()` in `assessment_service.py` returns English-only strings (§4.2 MVP exception). Post-MVP: generate via AI in `source_language`. |
| F-12 | Remove deprecated `/conversation/*` legacy endpoints | `/respond`, `/introduction`, `/traveling`, `/daily_conversations` return 410 Gone (see `api_contract.md` §12). Remove routes once confirmed no external consumers. |
