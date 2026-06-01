from typing import Literal, Optional
from pydantic import BaseModel

from ai.prompt_builder import AssessmentSkill

AssessmentType = Literal["placement", "progress"]


# ---- /assessment/start ----

class StartAssessmentRequest(BaseModel):
    pair_id: int
    assessment_type: AssessmentType
    skills: list[AssessmentSkill]


class QuestionOut(BaseModel):
    id: str
    skill: str
    type: str
    level: str
    xp_reward: int
    instructions: str
    question: Optional[str] = None
    passage: Optional[str] = None        # multiple_choice only
    options: Optional[list[str]] = None  # multiple_choice only
    placeholder: Optional[str] = None   # open_response only


class StartAssessmentResponse(BaseModel):
    assessment_id: int
    questions: list[QuestionOut]


# ---- /assessment/{id}/submit ----

class AnswerIn(BaseModel):
    question_id: str
    skill: str
    answer: str


class SubmitAssessmentRequest(BaseModel):
    answers: list[AnswerIn]


class AssessmentResult(BaseModel):
    overall_level: str
    skill_levels: dict[str, str]
    total_xp_awarded: int
    feedback: str


class SubmitAssessmentResponse(BaseModel):
    assessment_id: int
    result: AssessmentResult


# ---- /assessment/{id}/result ----

class GetResultResponse(BaseModel):
    assessment_id: int
    result: AssessmentResult


# ---- /assessment/score-writing ----

class ScoreWritingRequest(BaseModel):
    pair_id: int
    question: str
    level: str
    user_answer: str
    xp_reward: int


class ScoreWritingResponse(BaseModel):
    is_correct: bool
    feedback: str
    xp_awarded: int


# ---- /assessment/score-speaking ----

class ScoreSpeakingResponse(BaseModel):
    is_correct: bool
    feedback: str
    xp_awarded: int
    transcription: str
