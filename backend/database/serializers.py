"""
Helpers to transform frontend lesson data files into DB-ready payloads.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


LEVEL_ORDER = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]
FRONTEND_CLASSES_DIR = (
    Path(__file__).resolve().parents[2] / "frontend" / "app" / "classes"
)
EXTRACTOR_PATH = Path(__file__).resolve().parent / "ts_export_extractor.mjs"


@dataclass
class LessonBundle:
    lesson_row: dict[str, Any]
    sections: list[dict[str, Any]]
    examples: list[dict[str, Any]]
    practice_questions: list[dict[str, Any]]
    result_messages: list[dict[str, Any]]


def parse_lesson_identity(path: Path) -> dict[str, Any]:
    rel = path.relative_to(FRONTEND_CLASSES_DIR)
    level_code = rel.parts[0]
    unit_slug = rel.parts[1]  # lesson1 / module2

    match = re.search(r"(\d+)$", unit_slug)
    lesson_number = int(match.group(1)) if match else None

    title = f"{level_code} {unit_slug.title()}"
    unit_kind = "module" if unit_slug.startswith("module") else "lesson"
    lesson_key = f"{level_code.lower()}-{unit_slug}"

    return {
        "level_code": level_code,
        "unit_slug": unit_slug,
        "unit_kind": unit_kind,
        "lesson_number": lesson_number,
        "lesson_key": lesson_key,
        "default_title": title,
    }


def _to_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False)


def _extract_text(value: Any) -> str | None:
    if isinstance(value, str):
        return value
    return None


def _extract_lesson_title(exports: dict[str, Any], fallback: str) -> tuple[str, str | None]:
    for key in ("lessonMeta", "moduleMeta"):
        meta = exports.get(key)
        if isinstance(meta, dict):
            title = meta.get("title") or fallback
            subtitle = meta.get("subtitle")
            return str(title), str(subtitle) if subtitle else None
    return fallback, None


def _derive_sections(exports: dict[str, Any]) -> list[dict[str, Any]]:
    raw_section_ids = exports.get("sectionIds", [])
    section_ids = [x for x in raw_section_ids if isinstance(x, str)] if isinstance(raw_section_ids, list) else []

    sections: list[dict[str, Any]] = []
    used = set()

    for idx, section_id in enumerate(section_ids, start=1):
        payload = exports.get(section_id)
        section_type = type(payload).__name__.lower() if payload is not None else "unknown"
        sections.append(
            {
                "section_key": section_id,
                "section_title": section_id.replace("-", " ").replace("_", " ").title(),
                "section_type": section_type,
                "content": _extract_text(payload),
                "extra_data_json": _to_json(payload) if payload is not None else None,
                "sort_order": idx,
            }
        )
        used.add(section_id)

    dynamic_candidates = []
    for key, value in exports.items():
        if key in used:
            continue
        if key in {"practiceQuestions", "sectionIds", "lessonMeta", "moduleMeta"}:
            continue
        if isinstance(value, (list, dict, str, int, float, bool)):
            dynamic_candidates.append((key, value))

    start = len(sections) + 1
    for offset, (key, value) in enumerate(dynamic_candidates):
        section_type = type(value).__name__.lower()
        sections.append(
            {
                "section_key": key,
                "section_title": key.replace("-", " ").replace("_", " ").title(),
                "section_type": section_type,
                "content": _extract_text(value),
                "extra_data_json": _to_json(value),
                "sort_order": start + offset,
            }
        )

    return sections


def _derive_examples(exports: dict[str, Any]) -> list[dict[str, Any]]:
    examples: list[dict[str, Any]] = []
    sort_order = 1

    for key, value in exports.items():
        if key == "practiceQuestions":
            continue
        if not isinstance(value, list):
            continue
        if not value:
            continue
        if not all(isinstance(item, dict) for item in value):
            continue

        for item in value:
            french_text = item.get("french") or item.get("example") or item.get("wrong") or item.get("condition")
            english_text = item.get("english") or item.get("exampleEnglish") or item.get("correct") or item.get("result")
            examples.append(
                {
                    "section_key": key,
                    "french_text": french_text if isinstance(french_text, str) else None,
                    "english_text": english_text if isinstance(english_text, str) else None,
                    "extra_data_json": _to_json(item),
                    "sort_order": sort_order,
                }
            )
            sort_order += 1

    return examples


def _derive_questions(exports: dict[str, Any]) -> list[dict[str, Any]]:
    practice = exports.get("practiceQuestions", [])
    if not isinstance(practice, list):
        return []

    out: list[dict[str, Any]] = []
    for idx, q in enumerate(practice, start=1):
        if not isinstance(q, dict):
            continue
        options = q.get("options")
        out.append(
            {
                "question_number": int(q.get("id", idx)),
                "topic": str(q.get("topic")) if q.get("topic") is not None else None,
                "prompt": str(q.get("prompt", "")),
                "question_type": str(q.get("type")) if q.get("type") is not None else None,
                "options_json": _to_json(options) if isinstance(options, list) else None,
                "correct_answer": str(q.get("correct")) if q.get("correct") is not None else None,
                "explanation": str(q.get("explanation")) if q.get("explanation") is not None else None,
                "difficulty": str(q.get("difficulty")) if q.get("difficulty") is not None else None,
                "metadata_json": _to_json(q),
                "sort_order": idx,
            }
        )
    return out


def _derive_result_messages(meta: dict[str, Any]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    raw = meta.get("result_messages", [])
    if not isinstance(raw, list):
        return rows

    for idx, entry in enumerate(raw, start=1):
        if not isinstance(entry, dict):
            continue
        payload = entry.get("payload")
        if not isinstance(payload, dict):
            continue
        title = payload.get("title")
        message = payload.get("message")
        if not isinstance(title, str) or not isinstance(message, str):
            continue
        rows.append(
            {
                "score_band": str(entry.get("score_band", f"band_{idx}")),
                "title": title,
                "message": message,
                "extra_data_json": _to_json(payload),
                "sort_order": idx,
            }
        )
    return rows


def extract_ts_exports(data_file: Path) -> dict[str, Any]:
    cmd = [
        "node",
        str(EXTRACTOR_PATH),
        "--file",
        str(data_file),
    ]
    result = subprocess.run(cmd, check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


def build_lesson_bundle(data_file: Path) -> LessonBundle:
    identity = parse_lesson_identity(data_file)
    source = data_file.read_text(encoding="utf-8")
    source_hash = hashlib.sha256(source.encode("utf-8")).hexdigest()

    extracted = extract_ts_exports(data_file)
    exports = extracted.get("exports", {})
    meta = extracted.get("meta", {})

    title, subtitle = _extract_lesson_title(exports, identity["default_title"])
    lesson_row = {
        "level_code": identity["level_code"],
        "lesson_key": identity["lesson_key"],
        "lesson_slug": identity["unit_slug"],
        "lesson_number": identity["lesson_number"],
        "title": title,
        "subtitle": subtitle,
        "objective": None,
        "description": None,
        "sort_order": identity["lesson_number"] or 999,
        "next_lesson_key": None,
        "source_path": str(data_file.relative_to(Path(__file__).resolve().parents[2])),
        "source_hash": source_hash,
    }

    return LessonBundle(
        lesson_row=lesson_row,
        sections=_derive_sections(exports),
        examples=_derive_examples(exports),
        practice_questions=_derive_questions(exports),
        result_messages=_derive_result_messages(meta),
    )


def discover_lesson_data_files() -> list[Path]:
    files = sorted(FRONTEND_CLASSES_DIR.glob("*/**/data.ts"))

    def sort_key(path: Path) -> tuple[int, int, str]:
        identity = parse_lesson_identity(path)
        level_idx = LEVEL_ORDER.index(identity["level_code"]) if identity["level_code"] in LEVEL_ORDER else 999
        order = identity["lesson_number"] or 999
        return (level_idx, order, str(path))

    return sorted(files, key=sort_key)


def get_level_seed_rows() -> list[dict[str, Any]]:
    return [
        {
            "code": level,
            "title": level,
            "description": f"{level} French lessons",
            "sort_order": idx + 1,
        }
        for idx, level in enumerate(LEVEL_ORDER)
    ]


if __name__ == "__main__":
    # quick smoke test
    paths = discover_lesson_data_files()
    if not paths:
        print("No lesson data files found.", file=sys.stderr)
        raise SystemExit(1)
    sample = build_lesson_bundle(paths[0])
    print(json.dumps(sample.lesson_row, indent=2))

