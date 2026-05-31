# ADR-002: OpenAI as the Sole AI Provider, Isolated Behind an Abstraction Layer

**Status:** Accepted  
**Date:** 2026-05-30  
**Decider:** Project Architect

---

## Context

The platform's core value proposition depends on AI. Three categories of AI capability are required:

1. **Conversational tutoring** — real-time chat responses that correct the learner, explain grammar, and continue conversations.
2. **Content generation** — producing lesson content (vocabulary lists, grammar exercises, reading passages, writing prompts) for any language pair at any CEFR level.
3. **Response evaluation** — scoring written and spoken answers with qualitative feedback.
4. **Speech-to-text** — transcribing audio recordings from the learner.

The platform is already integrated with OpenAI (GPT-4o-mini and gpt-4o-transcribe) in the existing codebase. A decision is needed on whether to formalise this choice, and critically, how to structure the integration so the provider can be changed later.

Key tensions:
- **Quality vs cost:** More capable models produce better educational content but cost more per API call. The MVP must control costs.
- **Provider lock-in vs simplicity:** Abstracting the AI layer adds code complexity. Not abstracting it makes provider migration expensive later.
- **Multilingual capability:** The AI provider must reliably handle all language pairs the platform supports, including non-Latin scripts (Arabic, Japanese, Korean, Chinese) and less-resourced languages (Yoruba).

---

## Decision

We will use **OpenAI as the sole AI provider for the MVP**, with all calls isolated behind a dedicated AI abstraction layer in `backend/ai/`.

- Chat and content generation: `gpt-4o-mini` (cost-effective, multilingual, fast)
- Transcription: `gpt-4o-transcribe`
- Scoring and evaluation: `gpt-4o-mini` with structured JSON output

No API handler or service module may call `openai.ChatCompletion` or equivalent directly. All calls route through:
- `backend/ai/prompt_builder.py` — constructs all prompts
- `backend/ai/lesson_generator.py` — lesson content generation
- `backend/ai/chat_handler.py` — conversation management
- `backend/ai/assessment_scorer.py` — answer evaluation
- `backend/ai/transcriber.py` — audio transcription

To change AI providers in the future, only these five files require modification.

---

## Rationale

**Why OpenAI:**
- The codebase already uses it — no net-new integration work.
- GPT-4o-mini handles all required language pairs well, including Arabic (RTL), Japanese, Korean, and Chinese.
- The `gpt-4o-transcribe` model is purpose-built for transcription and outperforms generic models.
- Reliable uptime and a mature Python SDK.
- Structured JSON output mode reduces the need for fragile response parsing.

**Why abstract behind `backend/ai/`:**
- OpenAI is the right MVP choice but not necessarily the right long-term choice. Anthropic Claude, Google Gemini, and open-source models (Mistral, LLaMA) are credible alternatives.
- A future "teacher marketplace" feature may require different AI models per language pair (e.g. a specialised model for low-resource languages).
- Centralising AI calls makes caching, rate limiting, cost tracking, and fallback logic implementable in one place.

**Why `gpt-4o-mini` over `gpt-4o`:**
- The MVP needs to control costs. At typical tutoring message volumes, `gpt-4o` would be 15–20x more expensive.
- Response quality from `gpt-4o-mini` is sufficient for A0–B1 learners, who represent the majority of early users.
- The AI layer abstraction makes upgrading to `gpt-4o` for specific use cases (C1/C2 lessons, assessment scoring) a one-line config change.

---

## Alternatives Considered

### Alternative 1: Anthropic Claude (claude-haiku-4-5 or claude-sonnet-4-6)

**What it is:** Use Anthropic's Claude models via the Anthropic SDK as the primary AI provider.

**Why rejected (for MVP):** The existing codebase uses OpenAI. Switching adds migration work with no clear quality advantage for the MVP's language pairs. Claude's multilingual capability is strong but less battle-tested for low-resource languages like Yoruba. Can be added as a secondary provider post-MVP.

### Alternative 2: Google Gemini

**What it is:** Google's Gemini models via the `google-generativeai` SDK.

**Why rejected:** Less mature Python SDK at time of writing. Structured JSON output less reliable than OpenAI's `response_format` parameter. Japanese and Korean handling is strong, but no clear advantage over GPT-4o-mini for the MVP language set.

### Alternative 3: Open-source models (Mistral, LLaMA via Ollama or Together.ai)

**What it is:** Self-hosted or third-party-hosted open-source LLMs.

**Why rejected:** Significantly lower quality on multilingual tasks for non-English languages, especially A0-level instruction. Requires infrastructure management inappropriate for a solo-founder MVP. May be viable post-MVP for cost reduction at scale, or for low-resource language pairs underserved by commercial models.

### Alternative 4: Direct OpenAI calls with no abstraction layer

**What it is:** Call `client.chat.completions.create()` inline in API handlers, as the existing codebase does.

**Why rejected:** The existing codebase does exactly this and it is a known problem. Hard-coded system prompts in handlers are not testable, not reusable, and assume French in several places. The abstraction layer is the fix.

---

## Consequences

**Positive:**
- Provider migration is a five-file change.
- All prompts are in one place, making the language-pair agnosticism invariant enforceable in one code review.
- Cost tracking can be added to `backend/ai/` without touching business logic.
- Caching AI responses (e.g. generated lessons) is implementable in the generator without changing callers.
- Prompt engineering improvements benefit all features simultaneously.

**Negative / Trade-offs:**
- The abstraction layer is five additional files. Adds initial setup cost.
- Centralising all AI calls creates a single point of failure — if the AI layer has a bug, all AI-powered features are affected. Mitigated by unit tests on `PromptBuilder`.
- `gpt-4o-mini` may produce lower-quality responses for C1/C2 content and for low-resource language pairs. Must monitor and be prepared to upgrade specific call sites to `gpt-4o`.

**Constraints introduced:**
- `OPENAI_API_KEY` is a mandatory environment variable. The server must not start without it.
- No direct OpenAI SDK calls outside `backend/ai/`. Enforced by code review.
- All prompts must be language-pair parameterised. No language name may appear as a string literal in any prompt template. Enforced by `engineering_rules.md` Rule 1 and Rule 2.
- Audio validation (file size, duration, volume, speech detection) must remain in `transcriber.py`, not in API handlers.

---

## Compliance Check

- [x] This decision does not hard-code any language name in source code
- [x] This decision does not assume English is the learner's native language — `PromptBuilder` accepts `source_language` and `target_language` parameters; both are injected at call time
- [x] This decision does not prevent adding a new language pair via data change only
- [x] This decision does not assume a left-to-right script — OpenAI handles RTL languages (Arabic, Hebrew) natively; the prompt builder must not assume word order or script direction
- [x] If this decision modifies the database schema, `docs/database_schema.md` has been updated — no schema changes
- [x] If this decision modifies the API, `docs/api_contract.md` has been updated — no API changes; AI is internal
- [x] If this decision modifies the architecture, `docs/architecture.md` has been updated — AI Layer section defines this structure

## Related Documents

- `docs/architecture.md` §AI Layer
- `docs/engineering_rules.md` Rule 2 (All AI Calls Go Through the AI Layer)
- `docs/engineering_rules.md` Rule 9 (Test the AI Layer With Real Prompts)
- `docs/api_contract.md` §9 (Speaking Assessment) and §10 (Writing Assessment)
