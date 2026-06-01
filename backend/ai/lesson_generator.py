import json
import os
from dataclasses import dataclass

from openai import OpenAI

from ai.prompt_builder import LessonType, PromptBuilder

_client: OpenAI | None = None
_builder = PromptBuilder()

# Process-level cache prevents redundant OpenAI calls within a running server.
# DB-level caching (one lesson per pair+level+type+topic) is enforced by lesson_service.
_cache: dict[tuple[str, str, str, str, str], "GeneratedLesson"] = {}

_XP_BY_TYPE: dict[str, int] = {
    "vocabulary": 25,
    "grammar": 30,
    "reading": 30,
    "listening": 30,
    "writing": 40,
    "speaking": 40,
}


@dataclass
class GeneratedLesson:
    title: str
    content: dict
    xp_reward: int


def _get_client() -> OpenAI:
    global _client
    if _client is None:
        _client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    return _client


def generate_lesson(
    source_language: str,
    target_language: str,
    level: str,
    lesson_type: LessonType,
    topic: str | None = None,
) -> GeneratedLesson:
    cache_key = (source_language, target_language, level, lesson_type, topic or "")
    if cache_key in _cache:
        return _cache[cache_key]

    prompt = _builder.lesson_prompt(
        source_language, target_language, level, lesson_type, topic
    )

    response = _get_client().chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )

    data: dict = json.loads(response.choices[0].message.content or "{}")
    title = str(data.pop("title", f"{target_language} {lesson_type.capitalize()} — {level}"))

    result = GeneratedLesson(
        title=title,
        content=data,
        xp_reward=_XP_BY_TYPE.get(lesson_type, 25),
    )
    _cache[cache_key] = result
    return result
