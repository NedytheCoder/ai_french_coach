from pydantic import BaseModel


class LanguageOut(BaseModel):
    id: int
    code: str
    name: str
    native_name: str
    is_active: bool
    is_rtl: bool


class LanguagesResponse(BaseModel):
    languages: list[LanguageOut]
