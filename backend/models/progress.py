from pydantic import BaseModel


class DailyRecord(BaseModel):
    date: str
    xp_earned: int
    lessons_completed: int


class LevelProgress(BaseModel):
    current_level: str
    xp_in_level: int
    xp_required: int
    percent: int


class ProgressResponse(BaseModel):
    pair_id: int
    current_level: str
    total_xp: int
    streak_days: int
    longest_streak: int
    lessons_completed: int
    messages_sent: int
    daily_history: list[DailyRecord]
    level_progress: LevelProgress
