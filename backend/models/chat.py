from typing import Literal, Optional
from pydantic import BaseModel

ChatMode = Literal["general", "introduction", "travelling", "daily_life"]


class ChatRequest(BaseModel):
    pair_id: int
    session_id: Optional[int] = None
    message: str
    mode: ChatMode = "general"


class ChatResponse(BaseModel):
    session_id: int
    reply: str
    xp_awarded: int
    vocabulary_saved: list[str]


class SessionOut(BaseModel):
    id: int
    pair_id: int
    mode: str
    message_count: int
    created_at: str
    last_message_at: Optional[str]


class SessionsResponse(BaseModel):
    sessions: list[SessionOut]


class MessageOut(BaseModel):
    id: int
    role: str
    content: str
    created_at: str


class MessagesResponse(BaseModel):
    session_id: int
    messages: list[MessageOut]
