# ADR-000: [Short Imperative Title]

**Status:** Proposed | Accepted | Superseded by ADR-NNN | Deprecated  
**Date:** YYYY-MM-DD  
**Decider:** [Name or role]

---

## Context

<!-- 
What is the situation that makes a decision necessary?
What problem are we solving?
What forces are in tension (speed vs correctness, simplicity vs extensibility, etc.)?
Include any constraints that are non-negotiable.
-->

## Decision

<!--
State the decision in one or two plain sentences.
Use active voice: "We will use X" not "X was decided to be used".
-->

## Rationale

<!--
Why was this option chosen?
What properties of this decision make it the right fit for this project?
How does it serve the language-pair agnostic requirement?
-->

## Alternatives Considered

<!--
List each alternative that was seriously evaluated.
For each: name it, describe what it would have meant, and explain why it was rejected.
Do not list options that were never seriously considered.
-->

### Alternative 1: [Name]

**What it is:** ...  
**Why rejected:** ...

### Alternative 2: [Name]

**What it is:** ...  
**Why rejected:** ...

## Consequences

<!--
What becomes easier because of this decision?
What becomes harder?
What is now constrained or closed off?
What does this decision require us to do in the future?
-->

**Positive:**
- 

**Negative / Trade-offs:**
- 

**Constraints introduced:**
- 

## Compliance Check

<!-- Every ADR must answer these. -->

- [ ] This decision does not hard-code any language name in source code
- [ ] This decision does not assume English is the learner's native language
- [ ] This decision does not prevent adding a new language pair via data change only
- [ ] This decision does not assume a left-to-right script
- [ ] If this decision modifies the database schema, `docs/database_schema.md` has been updated
- [ ] If this decision modifies the API, `docs/api_contract.md` has been updated
- [ ] If this decision modifies the architecture, `docs/architecture.md` has been updated

## Related Documents

- `docs/architecture.md` §[section]
- `docs/engineering_rules.md` Rule [N]
- ADR-NNN (if this supersedes or relates to another decision)
