from pydantic import BaseModel


class LanguageBrief(BaseModel):
    code: str
    name: str


class PairOut(BaseModel):
    id: int
    source_language: LanguageBrief
    target_language: LanguageBrief
    current_level: str
    total_xp: int
    streak_days: int
    created_at: str


class PairsResponse(BaseModel):
    pairs: list[PairOut]


class CreatePairRequest(BaseModel):
    source_language_code: str
    target_language_code: str
