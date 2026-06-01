from typing import Any, Literal, Optional

from pydantic import BaseModel

CefrLevel = Literal["A0", "A1", "A2", "B1", "B2", "C1", "C2"]
LessonTypeLiteral = Literal["vocabulary", "grammar", "reading", "listening", "writing", "speaking"]


class GenerateLessonRequest(BaseModel):
    pair_id: int
    level: CefrLevel
    lesson_type: LessonTypeLiteral
    topic: Optional[str] = None


class LessonOut(BaseModel):
    lesson_id: int
    pair_id: int
    level: str
    lesson_type: str
    title: str
    xp_reward: int
    content: dict[str, Any]
    is_completed: bool
    created_at: str


class CompleteLessonRequest(BaseModel):
    score: int
    max_score: int


class CompleteLessonResponse(BaseModel):
    lesson_id: int
    xp_awarded: int
    total_xp: int
    level_up: bool
    new_level: Optional[str]
