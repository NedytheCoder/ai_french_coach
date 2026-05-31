from typing import Literal

TutorMode = Literal["general", "introduction", "travelling", "daily_life"]

_TUTOR_MODE_FOCUS: dict[str, str] = {
    "general": (
        "Engage the learner in open-ended conversation on any topic they choose."
    ),
    "introduction": (
        "Focus on introductions and self-presentation: name, origin, occupation, "
        "hobbies, family, and basic personal facts."
    ),
    "travelling": (
        "Role-play travel scenarios: asking for directions, booking accommodation, "
        "ordering food, using public transport, and navigating unfamiliar places."
    ),
    "daily_life": (
        "Focus on everyday situations: shopping, cooking, work routines, "
        "family life, social plans, and common interactions."
    ),
}


class PromptBuilder:
    def tutor_system_prompt(
        self,
        source_language: str,
        target_language: str,
        level: str,
        mode: TutorMode = "general",
    ) -> str:
        focus = _TUTOR_MODE_FOCUS[mode]
        return (
            f"You are a patient and encouraging {target_language} language tutor.\n"
            f"The learner's native language is {source_language}. "
            f"Their current proficiency level is {level} (CEFR).\n\n"
            f"Session focus: {focus}\n\n"
            f"Guidelines:\n"
            f"- Respond primarily in {target_language}.\n"
            f"- Match vocabulary and grammar complexity to the {level} level.\n"
            f"- When the learner makes a language error, correct it gently "
            f"and show the correct form.\n"
            f"- Give brief grammar explanations in {source_language} when helpful.\n"
            f"- Be encouraging; never make the learner feel judged.\n"
            f"- If the learner writes in {source_language} instead of "
            f"{target_language}, acknowledge them warmly and invite them "
            f"to try again in {target_language}."
        )
