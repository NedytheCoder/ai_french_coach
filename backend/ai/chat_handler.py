import os
from openai import OpenAI
from ai.prompt_builder import PromptBuilder, TutorMode

_client: OpenAI | None = None
_builder = PromptBuilder()

# Appended to the system prompt so the model returns vocabulary in a parseable line.
# The pair format (word=translation) lets us persist source_translation without a second API call.
_VOCAB_SUFFIX = (
    "\n\nAt the very end of your response, on a new line, write exactly:\n"
    "VOCAB: target_word=source_translation, ...\n"
    "List 2-5 key target-language words or short phrases from your reply, each paired "
    "with its source-language translation using '='. Omit this line entirely if your "
    "reply contains no notable target-language vocabulary."
)


def _get_client() -> OpenAI:
    global _client
    if _client is None:
        _client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    return _client


def chat(
    history: list[dict],
    source_language: str,
    target_language: str,
    level: str,
    mode: TutorMode = "general",
) -> tuple[str, list[tuple[str, str]]]:
    """Call the AI tutor and return (reply, [(target_word, source_translation), ...])."""
    system_prompt = (
        _builder.tutor_system_prompt(source_language, target_language, level, mode)
        + _VOCAB_SUFFIX
    )

    response = _get_client().chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": system_prompt}, *history],
    )

    raw = (response.choices[0].message.content or "").strip()
    return _parse_reply(raw)


def _parse_reply(raw: str) -> tuple[str, list[tuple[str, str]]]:
    vocabulary: list[tuple[str, str]] = []
    reply_lines: list[str] = []

    for line in raw.split("\n"):
        stripped = line.strip()
        if stripped.upper().startswith("VOCAB:"):
            raw_pairs = stripped[len("VOCAB:"):].strip()
            for pair in raw_pairs.split(","):
                pair = pair.strip()
                if "=" in pair:
                    word, _, translation = pair.partition("=")
                    word = word.strip()
                    translation = translation.strip()
                    if word:
                        vocabulary.append((word, translation))
                elif pair:
                    vocabulary.append((pair, ""))
        else:
            reply_lines.append(line)

    reply = "\n".join(reply_lines).strip()
    return reply, vocabulary
