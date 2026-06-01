# ADR-004: Per-User In-Memory Rate Limiting with slowapi

**Status:** Accepted  
**Date:** 2026-05-31  
**Decider:** Project Architect

---

## Context

The AI-backed endpoints (`POST /chat`, `POST /lesson/generate`, `POST /assessment/score-writing`, `POST /assessment/score-speaking`) each trigger an OpenAI API call. Without rate limiting:

- A single user can exhaust the OpenAI budget by flooding requests
- A compromised token causes runaway costs with no circuit breaker
- Accidental client-side loops have no server-side backstop

For the MVP (M5-03), rate limiting must be:
- Per authenticated user (not per IP, to handle NAT and shared addresses)
- In-memory (no Redis or external dependency; upgrade path clear)
- Applied at the FastAPI decorator layer, not inside individual services

Specified limits: 30 chat messages per user per hour; 10 lesson generations per user per hour.

---

## Decision

We will use `slowapi` (a FastAPI-compatible wrapper around `limits`) for in-memory rate limiting. Rate limits are keyed by the authenticated user's ID, extracted by decoding the Bearer JWT in the key function. All counters are stored in process memory using `slowapi`'s default in-memory backend.

Rate limits:
- `POST /chat`: 30/hour per user
- `POST /lesson/generate`: 10/hour per user
- `POST /assessment/score-writing`: 10/hour per user
- `POST /assessment/score-speaking`: 10/hour per user

Limit configuration lives in `backend/middleware/rate_limit.py`. A 429 response is returned when a limit is exceeded.

---

## Rationale

**Why slowapi:**
- Designed for FastAPI; decorator syntax integrates cleanly with `@router.post`
- In-memory backend requires no external dependency (Redis not available on MVP Render free tier without added cost)
- Per-endpoint granularity: chat and lesson generation can carry different limits

**Why per-user, not per-IP:**
- Multiple users behind NAT share an IP; per-IP limits throttle innocent users
- All AI endpoints are auth-guarded, so a valid user ID is always present in the JWT

**Why in-memory:**
- Redis adds infrastructure cost and operational complexity for an MVP
- A single server process is sufficient for ~100 concurrent users (per `architecture.md` non-functional requirements)
- Upgrade to Redis-backed limiting is a one-line change to the `Limiter` constructor

**Why JWT re-decode in the key function:**
- slowapi key functions receive only the `Request` object; the FastAPI dependency-injected `current_user` is not available at key-evaluation time
- Re-decoding the JWT is a negligible CPU cost compared to the downstream OpenAI call
- Errors in key-function decoding fall back to IP, so the limiter never blocks the auth layer

---

## Alternatives Considered

### Alternative 1: Redis-backed rate limiting

**What it is:** Use `redis-py` + a managed Redis instance (e.g. Upstash) to store counters that survive restarts and work across multiple processes.

**Why rejected for MVP:** Adds a paid external dependency. The single-server MVP does not require cross-process counter sharing. This is the clear upgrade path post-MVP.

### Alternative 2: IP-based limiting

**What it is:** Key the rate limiter by client IP address rather than user ID.

**Why rejected:** Users behind corporate NAT or shared Wi-Fi share an IP. This would unfairly throttle legitimate users sharing a network.

### Alternative 3: Service-level counting in the database

**What it is:** Count requests per user per hour by querying or inserting into a `rate_limit_log` table.

**Why rejected:** Adds DB I/O to every rate-checked request, schema change required, and more complex than `slowapi` for the same MVP outcome.

---

## Consequences

**Positive:**
- OpenAI API costs are bounded per user per hour
- Rate limit state is zero-dependency and zero-infrastructure-cost
- Per-endpoint granularity allows different limits for expensive vs cheap AI calls
- Upgrade to Redis-backed limiting requires only a `Limiter` constructor change

**Negative / Trade-offs:**
- Rate limit state resets on server restart; a user who hit their limit can bypass it by waiting for a restart. Acceptable for MVP.
- In-memory state does not scale across multiple server processes. If the backend is horizontally scaled, limits effectively multiply by instance count. Acceptable for MVP single-process deployment.
- The key function decodes the JWT a second time in addition to `get_current_user`. This is negligible overhead compared to the AI call.

**Constraints introduced:**
- All AI-backed endpoint handlers must declare `request: Request` as their first parameter (slowapi requirement)
- `POST /lesson/generate` and `POST /assessment/score-*` handlers must apply `@limiter.limit(LESSON_GENERATE_LIMIT)` / `@limiter.limit(ASSESSMENT_SCORE_LIMIT)` when M3-02 and M2-02 are implemented

---

## Compliance Check

- [x] This decision does not hard-code any language name in source code — rate limiting is user-scoped, not language-scoped
- [x] This decision does not assume English is the learner's native language
- [x] This decision does not prevent adding a new language pair via data change only
- [x] This decision does not assume a left-to-right script
- [x] If this decision modifies the database schema, `docs/database_schema.md` has been updated — no schema change required
- [x] If this decision modifies the API, `docs/api_contract.md` has been updated — 429 responses documented in Conventions
- [x] If this decision modifies the architecture, `docs/architecture.md` has been updated — rate limiting middleware noted in backend architecture

## Related Documents

- `docs/architecture.md` §Backend Architecture
- `docs/api_contract.md` §Conventions
- `docs/development_backlog.md` M5-03
