# ADR-001: JWT-Based Authentication with Server-Side Refresh Token Revocation

**Status:** Accepted  
**Date:** 2026-05-30  
**Decider:** Project Architect

---

## Context

The platform requires user authentication. Users must be able to register, log in, and remain authenticated across browser sessions without re-entering credentials on every visit.

The backend is a stateless FastAPI API. The frontend is a Next.js app deployed separately on Vercel. Authentication must work across this cross-origin setup.

Post-MVP, the same API will need to support a mobile app. Authentication must not be tied to the browser's cookie jar.

Key tensions:
- **Statelessness vs revocability:** Pure JWT is stateless but tokens cannot be invalidated before expiry. Pure session tokens require server-side storage but are trivially revocable.
- **Security vs complexity:** More secure auth (device tokens, hardware keys, OAuth) adds significant implementation complexity that is inappropriate for a solo-founder MVP.
- **MVP speed vs future flexibility:** The auth system must be buildable quickly but must not prevent adding OAuth (Google, Apple) later.

---

## Decision

We will use a **short-lived JWT access token (15-minute TTL)** combined with a **long-lived refresh token (7-day TTL) stored server-side** in a `refresh_tokens` table.

- Access tokens are `Authorization: Bearer <token>` header tokens.
- Refresh tokens are stored hashed (SHA-256) in the database and can be revoked by deleting the row.
- Passwords are hashed with bcrypt (via `passlib`).
- Token signing uses HS256 with a secret loaded from an environment variable.
- For MVP, access tokens are stored in `localStorage`. In a future hardening pass, they move to `httpOnly` cookies.

---

## Rationale

This approach hits the correct balance for an MVP:

1. **Short-lived access tokens** limit the window of a stolen token without requiring constant database lookups on every request.
2. **Server-side refresh token table** enables logout-everywhere and account security actions (password reset invalidates all refresh tokens) without full session infrastructure.
3. **Stateless access token verification** means the API scales horizontally with no shared session store — the access token is verified by signature alone.
4. **Language-pair agnostic:** authentication is entirely independent of language. The `users` table stores `source_language_id` (a foreign key into the `languages` table) rather than a hard-coded language name.

---

## Alternatives Considered

### Alternative 1: Pure stateless JWT (no refresh token revocation)

**What it is:** Single JWT with a longer TTL (e.g. 7 days). No refresh token table. Logout is client-side only (delete token from storage).

**Why rejected:** A stolen token remains valid until expiry. No way to force-logout a compromised account. Unacceptable for a platform that stores learning progress and personal data.

### Alternative 2: Server-side session with session table

**What it is:** Traditional session ID stored in a cookie. Every request looks up the session in the database.

**Why rejected:** Requires shared session storage when scaling horizontally. Ties auth to cookies, which complicates the cross-origin setup and future mobile support. Higher database load per request than JWT signature verification.

### Alternative 3: OAuth only (Google, GitHub)

**What it is:** Delegate all authentication to third-party OAuth providers. No passwords stored.

**Why rejected:** Increases onboarding friction for users in regions where Google accounts are less common or trusted. Does not support enterprise/school deployments that may need internal accounts. Can be added post-MVP alongside the JWT system.

### Alternative 4: Magic link (email-only auth)

**What it is:** No passwords. Users log in by clicking an emailed link.

**Why rejected:** Requires a transactional email service on day one. Adds friction for users who want to log in quickly on a second device. Deferred to post-MVP consideration.

---

## Consequences

**Positive:**
- Logout and password reset reliably invalidate sessions.
- No database hit on most API requests (access token verified by signature).
- Compatible with future OAuth addition (OAuth flow just generates the same JWT pair).
- Simple to implement with `python-jose` and `passlib`.

**Negative / Trade-offs:**
- The `refresh_tokens` table must be periodically cleaned up (delete expired rows). Add a scheduled task post-MVP.
- `localStorage` token storage (MVP) is vulnerable to XSS. Must migrate to `httpOnly` cookies before any sensitive data is stored or significant user volume is reached.
- 15-minute access token TTL means users will experience silent token refreshes. The frontend must handle 401 responses by attempting a refresh before showing a login prompt.

**Constraints introduced:**
- All protected API endpoints must use `Depends(get_current_user)`. No exceptions.
- The `JWT_SECRET_KEY` environment variable is mandatory. The server must refuse to start if it is absent.
- Refresh token rotation (issue a new refresh token on each refresh call) should be added before the platform reaches public launch.

---

## Compliance Check

- [x] This decision does not hard-code any language name in source code
- [x] This decision does not assume English is the learner's native language
- [x] This decision does not prevent adding a new language pair via data change only
- [x] This decision does not assume a left-to-right script
- [ ] If this decision modifies the database schema, `docs/database_schema.md` has been updated — **Yes: `users` and `refresh_tokens` tables are defined there**
- [ ] If this decision modifies the API, `docs/api_contract.md` has been updated — **Yes: `/auth/*` endpoints documented**
- [x] If this decision modifies the architecture, `docs/architecture.md` has been updated

## Related Documents

- `docs/architecture.md` §Auth Layer
- `docs/database_schema.md` §users, §refresh_tokens
- `docs/api_contract.md` §1. Auth
- `docs/engineering_rules.md` Rule 4 (One Auth Dependency, Used Everywhere)
