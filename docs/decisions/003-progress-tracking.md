# ADR-003: XP-Based Progress Tracking with Daily Records and Simple Spaced Repetition

**Status:** Accepted  
**Date:** 2026-05-30  
**Decider:** Project Architect

---

## Context

The platform needs a progress tracking system that serves two purposes simultaneously:

1. **Retention:** Keep learners coming back daily. Progress must feel tangible and rewarding.
2. **Accuracy:** Give learners an honest signal of their proficiency level so they practice at the right difficulty.

These purposes are in tension. Gamification metrics (XP, streaks, badges) drive engagement but can be gamed or become divorced from real proficiency. Proficiency-only tracking (assessment scores, error rates) is accurate but dry and discouraging.

Additional constraints:
- Progress must be tracked per language pair, not per user globally. A user learning both French and Japanese must have separate, independent progress tracks.
- The system must work without human teachers or manual grading. All progress signals must come from AI evaluation or objective question answers.
- The MVP must ship in approximately one month. A complex adaptive algorithm is out of scope.
- All progress data must be language-pair agnostic. No column name, metric, or calculation may assume a specific language.

---

## Decision

We will use a **three-layer progress system**:

**Layer 1 — XP (experience points):** A cumulative integer score earned per activity. XP accumulates per `user_language_pairs` record. Reaching defined XP thresholds unlocks the next CEFR level. XP is awarded for: lesson completion (10–40 XP by level), chat messages (5 XP per assistant reply), assessment answers (10–40 XP by level and skill), and vocabulary reviews (2 XP per correct review).

**Layer 2 — Daily activity records:** One row per `(pair_id, date)` in `progress_records`. Stores `xp_earned`, `lessons_completed`, and `messages_sent` for that day. Used for streak calculation and the 7-day activity chart on the progress page.

**Layer 3 — Vocabulary spaced repetition:** Each `vocabulary_items` row has a `next_review_at` date. The interval doubles on a correct review (1d → 2d → 4d → 8d…) and resets to 1 day on an incorrect review. This is a simplified SM-2 algorithm sufficient for the MVP.

CEFR level is stored on `user_language_pairs.current_level` and updated server-side when the XP threshold for the next level is crossed.

---

## Rationale

**Why XP and not raw scores:**
- XP is additive and always increases. Learners never feel like they are losing ground. This is critical for retention in the early stages when progress is slow.
- XP rewards effort (messages sent, lessons attempted) not just correctness, which is appropriate for A0–A2 learners who make many errors.
- XP thresholds give learners a concrete goal: "X XP until A2."

**Why daily records rather than event-level logging:**
- Event-level logging (one row per XP award) would produce hundreds of rows per active user per day. At scale this becomes expensive to query for charts and streak calculation.
- Aggregating to daily summaries is sufficient for the progress visualisations needed in the MVP.
- Raw event logging can be added later as an analytics layer without changing the progress system.

**Why store level in `user_language_pairs` rather than deriving it from XP:**
- Level must be queryable without aggregating XP history. Every API response that returns a pair includes the current level.
- A future feature (e.g. a placement test that overrides the XP-derived level) can set `current_level` directly without changing the XP logic.

**Why simple spaced repetition and not a full SM-2 or FSRS algorithm:**
- Full SM-2 requires per-card ease factors and review intervals stored as floats. This adds schema complexity for marginal accuracy benefit at MVP scale.
- The simplified algorithm (double on correct, reset on incorrect) is well understood, produces reasonable intervals, and can be replaced with full SM-2 post-MVP by changing a single service function.

**Why per language pair, not per user:**
- A user studying French and Japanese simultaneously has completely different vocabulary sets, levels, and progress rates. Conflating them produces meaningless aggregates.
- All entities in the progress system use `pair_id` as the join key. No progress data is stored at the `user_id` level.

---

## Alternatives Considered

### Alternative 1: Mastery-based progression (no XP)

**What it is:** Learners advance to the next level only when they demonstrate mastery on a skill assessment (>80% correct on 20 questions). No XP. Level is the only progress metric.

**Why rejected:** Too discouraging for beginners. A learner who attempts 50 lessons but keeps failing the mastery check sees no progress signal. Churn would be high. XP ensures every session feels rewarding regardless of assessment performance.

### Alternative 2: Time-on-task tracking

**What it is:** Progress is measured in minutes of active learning. No XP, no assessments. Level advances when time thresholds are met.

**Why rejected:** Time is easily gamed (leave the tab open) and does not correlate with actual learning. No signal of whether the learner is performing correctly.

### Alternative 3: Fully adaptive proficiency model (IRT or Bayesian)

**What it is:** Item Response Theory or a Bayesian knowledge model that estimates a continuous proficiency parameter per skill per language pair, updated after every answer.

**Why rejected:** Requires a large item bank calibrated per language pair. Building this for every supported language pair is months of content and modelling work. Appropriate for post-Series-A product development, not a solo-founder MVP.

### Alternative 4: Event-level logging with daily aggregation computed at query time

**What it is:** Log every XP event to a raw events table. Compute daily summaries on the fly with GROUP BY queries.

**Why rejected:** Query performance degrades as event volume grows. Daily summary rows are cheap and make the progress page fast regardless of event volume. The raw events table can be added later if detailed analytics are needed.

### Alternative 5: Full SM-2 spaced repetition

**What it is:** Per-card `easiness_factor`, `repetitions`, and `interval` fields. Review schedule follows the original SuperMemo algorithm.

**Why rejected for MVP:** Three additional float fields per vocabulary item plus a more complex scheduling formula. The simplified doubling algorithm produces intervals that are within the same order of magnitude as SM-2 for new learners. Can be upgraded post-MVP.

---

## Consequences

**Positive:**
- XP always increases, which is psychologically reinforcing and reduces early churn.
- Daily records enable streak calculation in O(1) — query the last row per pair and compare to today's date.
- Progress page queries are simple and fast (select last 7 rows from `progress_records`).
- Vocabulary review scheduling is a single function that can be replaced without touching the database schema.
- Pair-scoped progress supports multiple simultaneous language journeys cleanly.

**Negative / Trade-offs:**
- XP is not a reliable proficiency signal. A learner could earn A2 XP by grinding chat messages without actually improving. The placement assessment provides the honest signal; XP provides the motivational signal. These must not be confused.
- The simplified spaced repetition will schedule some reviews too early (easy words) and some too late (hard words) compared to a calibrated SM-2. Acceptable for MVP.
- Daily records do not capture intra-day session data. If a user completes 5 lessons in the morning and 5 in the evening, the progress page shows "10 lessons today" but not the session boundary.

**Constraints introduced:**
- XP thresholds per level are application constants, not stored in the database. They are defined in one place (`services/progress_service.py`) and must not be duplicated.
- Streak calculation assumes UTC dates. The server and database must both operate in UTC. Client timezone display is a frontend concern only.
- Level-up must be checked server-side after every XP award. The level stored on `user_language_pairs` must always match the XP total at the time of the last update.
- All progress queries must be scoped to `pair_id`. Any query that joins directly to `user_id` without going through `user_language_pairs` is a bug.

---

## Compliance Check

- [x] This decision does not hard-code any language name in source code — all progress tables use `pair_id` FK; no language-specific columns
- [x] This decision does not assume English is the learner's native language
- [x] This decision does not prevent adding a new language pair via data change only — a new pair automatically gets its own progress track
- [x] This decision does not assume a left-to-right script
- [x] If this decision modifies the database schema, `docs/database_schema.md` has been updated — `progress_records`, `vocabulary_items`, `user_language_pairs` columns defined there
- [x] If this decision modifies the API, `docs/api_contract.md` has been updated — `GET /progress/{pair_id}` and `/vocabulary` endpoints documented
- [x] If this decision modifies the architecture, `docs/architecture.md` has been updated — Progress Tracking Layer section defined

## Related Documents

- `docs/architecture.md` §Progress Tracking Layer
- `docs/database_schema.md` §progress_records, §vocabulary_items, §user_language_pairs
- `docs/api_contract.md` §7. Progress, §8. Vocabulary
- `docs/development_backlog.md` Milestone 4 (Progress and Vocabulary)
