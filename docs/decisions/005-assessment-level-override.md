# ADR-005: Assessment Results Set `current_level` Directly, Independent of XP Thresholds

**Status:** Accepted  
**Date:** 2026-06-01  
**Decider:** Project Architect

---

## Context

Two independent mechanisms can write to `user_language_pairs.current_level`:

1. **XP-threshold advancement** (`progress_service.check_and_advance_level`): level advances when cumulative XP crosses the next threshold defined in `_XP_THRESHOLDS`. This is purely additive — XP never decreases, so level never goes down.

2. **Assessment result placement** (`assessment_service.submit_assessment`): level is set directly to the result of a placement or progress assessment. A score ≥ 70% advances to the next CEFR grade; a score < 70% keeps the current grade.

These mechanisms conflict in both directions:
- A learner who grinds chat messages to accumulate XP could exceed the threshold for the next level without ever demonstrating language competency. If XP always wins, placement assessments become meaningless.
- A learner who takes a placement assessment and scores below 70% stays at their current level. If XP thresholds are checked immediately after (total_xp might already exceed the next threshold), the XP system would immediately promote them, negating the placement result.

A documented decision is needed on which mechanism takes precedence and how they interact.

---

## Decision

Assessment results are the **authoritative proficiency signal**. When `submit_assessment` completes, it writes `overall_level` directly to `user_language_pairs.current_level` and does **not** call `check_and_advance_level` afterward.

The XP system is a **motivational signal**. `check_and_advance_level` is called only after lesson completions and vocabulary reviews — activities where competency is implied by the structure of the task. It is not called after assessments.

The CEFR level ordering used by both mechanisms (`CEFR_LEVELS`) is defined once in `services/progress_service.py` and imported by `services/assessment_service.py`.

---

## Rationale

**Assessment is a better proficiency signal than XP.** XP rewards effort and activity volume; a learner can reach the A1→A2 XP threshold by sending many chat messages without demonstrating A2-level competency. An assessment measures output quality directly and is graded by the AI scorer against CEFR criteria.

**Placement assessments must be able to set level regardless of XP.** A returning learner with prior XP who takes a placement test should land at their actual proficiency level. If XP thresholds ran after the assessment, they could immediately override the placement result.

**Progress assessments that score below the threshold should hold level.** If a learner's XP already exceeds the threshold but they fail a progress check, we trust the performance signal over the accumulated-effort signal. The level stays at the assessed grade; the excess XP is retained and will advance the level on the next qualifying activity.

**Simplicity matters for MVP.** A reconciliation algorithm that blends XP and assessment signals adds complexity with no clear benefit over simply trusting the more direct measure.

---

## Alternatives Considered

### Alternative 1: XP thresholds are always authoritative; assessments set a soft "recommended level"

**What it is:** Assessment results are advisory only. `current_level` is always derived from cumulative XP. Assessments update a separate `assessed_level` column; the UI shows both.

**Why rejected:** Adds schema complexity and UI confusion. A learner who places at A2 but whose XP only warrants A0 would see "Your level: A0" despite the assessment result. The placement test loses its value as an onboarding tool.

### Alternative 2: Call `check_and_advance_level` after every assessment

**What it is:** After `submit_assessment` sets `current_level = overall_level`, immediately call `check_and_advance_level` to check whether the XP total warrants a further advance.

**Why rejected:** This can produce a double-advance: the assessment scores the learner at A1, then a large XP total immediately promotes them to A2 without any A2 competency check. The assessment result is effectively overridden by accumulated chat history.

### Alternative 3: Separate XP tracks per mechanism; combined threshold

**What it is:** Maintain separate `activity_xp` and `assessment_xp` columns. Level advances when a weighted combination crosses the threshold.

**Why rejected:** Over-engineered for the MVP. Requires schema migration and a tuning exercise with no validated data to calibrate the weights. Can be revisited post-MVP with real learner data.

---

## Consequences

**Positive:**
- Placement assessments reliably set a learner's starting level regardless of prior XP state.
- Assessment failure correctly holds level even when XP total is sufficient for advancement.
- The interaction between the two mechanisms is unambiguous and testable.

**Negative / Trade-offs:**
- A learner who earns significant XP during an assessment will not see a level-up from those XP earnings in the same request. The next qualifying activity (lesson completion, vocabulary review) will trigger `check_and_advance_level` and may advance level at that point.
- If assessment XP pushes total_xp well past multiple thresholds, `check_and_advance_level` will only advance one level at a time — the learner may see rapid successive level-ups on their next few activities.

**Constraints introduced:**
- `submit_assessment` must **not** call `check_and_advance_level` after writing `current_level`.
- `CEFR_LEVELS` (the ordered list of CEFR grades) is defined once in `services/progress_service.py` and must be imported, never redefined, in any other module.
- `_next_level` in `assessment_service.py` advances by exactly one CEFR grade. It must not advance multiple levels regardless of score magnitude.

---

## Compliance Check

- [x] This decision does not hard-code any language name in source code — level codes (A0–C2) are CEFR designations, not language names
- [x] This decision does not assume English is the learner's native language
- [x] This decision does not prevent adding a new language pair via data change only — level logic is pair-scoped via `pair_id`; adding a new language pair row requires no code change
- [x] This decision does not assume a left-to-right script
- [x] If this decision modifies the database schema, `docs/database_schema.md` has been updated — no schema change; `current_level` column already exists on `user_language_pairs`
- [x] If this decision modifies the API, `docs/api_contract.md` has been updated — no API shape change; behaviour was already implemented, this ADR records the intent
- [x] If this decision modifies the architecture, `docs/architecture.md` has been updated — no structural change to service boundaries

## Related Documents

- `docs/architecture.md` §Progress Tracking Layer
- `docs/database_schema.md` §user_language_pairs
- `docs/engineering_rules.md` Rule 5 (Services Own Business Logic)
- ADR-003 (XP-Based Progress Tracking — defines `_XP_THRESHOLDS` and the authoritative source constraint)
