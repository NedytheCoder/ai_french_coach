from typing import Optional
from pydantic import BaseModel


class VocabularyItemOut(BaseModel):
    id: int
    target_word: str
    source_translation: str
    context_sentence: Optional[str]
    times_seen: int
    times_correct: int
    next_review_at: Optional[str]


class VocabularyListResponse(BaseModel):
    items: list[VocabularyItemOut]


class ReviewRequest(BaseModel):
    correct: bool


class ReviewResponse(BaseModel):
    item_id: int
    next_review_at: str
    xp_awarded: int
