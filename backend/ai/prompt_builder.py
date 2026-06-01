from typing import Literal

TutorMode = Literal["general", "introduction", "travelling", "daily_life"]
AssessmentSkill = Literal["reading", "listening", "writing", "speaking"]
LessonType = Literal["vocabulary", "grammar", "reading", "listening", "writing", "speaking"]

# Per-skill context injected into the question generation prompt.
# No language names — those are always injected at call time.
_QUESTION_SKILL_CONTEXT: dict[str, str] = {
    "reading": (
        "Generate reading comprehension questions. Each question provides a short passage "
        "in the target language, then asks the learner a question about it."
    ),
    "listening": (
        "Generate listening comprehension questions. Provide a short dialogue or monologue "
        "transcript in the target language (simulating what a learner would hear), "
        "then ask the learner a question about it."
    ),
    "writing": (
        "Generate writing tasks. Each task asks the learner to produce a short written "
        "response in the target language on an everyday topic appropriate for the level."
    ),
    "speaking": (
        "Generate speaking prompts. Each prompt asks the learner to speak about a topic "
        "or answer a question in the target language. The learner records their response."
    ),
}

_MULTIPLE_CHOICE_SCHEMA = """{
  "type": "multiple_choice",
  "passage": "<1–4 sentence text in TARGET_LANGUAGE, level-appropriate>",
  "question": "<comprehension question in SOURCE_LANGUAGE>",
  "options": ["<option A>", "<option B>", "<option C>"],
  "correct_index": <0, 1, or 2>,
  "instructions": "<one-sentence instruction in SOURCE_LANGUAGE>"
}"""

_OPEN_RESPONSE_SCHEMA = """{
  "type": "open_response",
  "question": "<prompt in SOURCE_LANGUAGE asking the learner to write or speak in TARGET_LANGUAGE>",
  "placeholder": "<brief placeholder hint in SOURCE_LANGUAGE>",
  "instructions": "<one-sentence instruction in SOURCE_LANGUAGE>"
}"""

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

    def assessment_question_prompt(
        self,
        source_language: str,
        target_language: str,
        level: str,
        skill: AssessmentSkill,
        count: int = 2,
    ) -> str:
        """System prompt that instructs the model to generate `count` assessment questions."""
        context = _QUESTION_SKILL_CONTEXT[skill]
        is_multiple_choice = skill in ("reading", "listening")
        schema = _MULTIPLE_CHOICE_SCHEMA if is_multiple_choice else _OPEN_RESPONSE_SCHEMA

        return (
            f"You are an expert {target_language} language assessor.\n"
            f"The learner's native language is {source_language}. "
            f"Target level: {level} (CEFR). Skill being assessed: {skill}.\n\n"
            f"Task: {context}\n\n"
            f"Rules:\n"
            f"- All target-language content MUST be written in {target_language}.\n"
            f"- All instructions, questions and option text for the learner MUST be in {source_language}.\n"
            f"- Difficulty MUST match {level} precisely — not easier, not harder.\n"
            f"- For multiple_choice: exactly 3 options, exactly one correct, "
            f"distractors must be plausible.\n"
            f"- Keep passages concise and varied across questions.\n\n"
            f"Return ONLY valid JSON with exactly {count} question(s):\n"
            f'{{"questions": [{schema}, ...]}}'
        )

    def assessment_scoring_prompt(
        self,
        source_language: str,
        target_language: str,
        level: str,
        skill: str,
        question: str,
        user_answer: str,
    ) -> str:
        """System prompt that instructs the model to score a learner's written or spoken answer."""
        return (
            f"You are an expert {target_language} language assessor scoring a learner's response.\n"
            f"Learner's native language: {source_language}. "
            f"Their level: {level} (CEFR). Skill tested: {skill}.\n\n"
            f"Question: {question}\n"
            f"Learner's answer: {user_answer}\n\n"
            f"Evaluate whether the answer demonstrates adequate {skill} competency for {level}.\n\n"
            f"Return ONLY valid JSON:\n"
            f'{{\n'
            f'  "is_correct": <true if competency demonstrated at {level}, false otherwise>,\n'
            f'  "feedback": "<2-3 sentences in {source_language}: acknowledge what was good, '
            f"correct specific errors by name, be encouraging>\",\n"
            f'  "score_percent": <integer 0-100 reflecting overall quality>\n'
            f"}}\n\n"
            f"Scoring guide:\n"
            f"- 80-100: Clear {level} competency, minor or no errors\n"
            f"- 50-79: Mostly correct, some noticeable errors\n"
            f"- 20-49: Partial understanding, significant errors\n"
            f"- 0-19: Off-topic, incomprehensible, or blank\n"
            f"- Set is_correct = true when score_percent >= 60"
        )

    def lesson_prompt(
        self,
        source_language: str,
        target_language: str,
        level: str,
        lesson_type: LessonType,
        topic: str | None = None,
    ) -> str:
        topic_line = f"Topic focus: {topic}.\n" if topic else ""
        preamble = (
            f"You are a professional language education content author.\n"
            f"Create a {level} CEFR {lesson_type} lesson for a learner "
            f"whose native language is {source_language} "
            f"and who is learning {target_language}.\n"
            f"{topic_line}"
            f"Return ONLY a valid JSON object — no markdown fences, no extra text.\n\n"
        )

        if lesson_type == "vocabulary":
            return preamble + (
                f"Include 8–12 vocabulary items appropriate for {level}. "
                f"All target-language content in {target_language}; "
                f"all translations in {source_language}. "
                f'JSON schema: {{"title":"string","items":['
                f'{{"target_word":"string","source_translation":"string",'
                f'"example_sentence":"string","example_translation":"string"}}]}}'
            )

        if lesson_type == "grammar":
            return preamble + (
                f"Explain the grammar rule in {source_language}. "
                f"Include 3–5 example sentences and 4–6 fill-in-the-blank exercises "
                f"(4 answer options each). All {target_language} content must match {level} difficulty. "
                f'JSON schema: {{"title":"string","explanation":"string",'
                f'"examples":[{{"target_sentence":"string","source_translation":"string","note":"string"}}],'
                f'"exercises":[{{"prompt":"sentence with ___ blank","answer":"string","options":["string"]}}]}}'
            )

        if lesson_type == "reading":
            return preamble + (
                f"Write a short reading passage in {target_language} appropriate for {level}. "
                f"Include the full passage translation in {source_language}. "
                f"Include 4–6 comprehension questions with 4 answer options each; "
                f"questions and options in {source_language}, correct_index is 0-based. "
                f'JSON schema: {{"title":"string","passage":"string","passage_translation":"string",'
                f'"questions":[{{"question":"string","options":["string"],"correct_index":0}}]}}'
            )

        if lesson_type == "listening":
            return preamble + (
                f"Write a short listening transcript — a dialogue or monologue in {target_language} "
                f"(simulating what the learner would hear) appropriate for {level}. "
                f"Include the full transcript translation in {source_language}. "
                f"Include 3–5 comprehension questions with 3 answer options each; "
                f"questions and options in {source_language}, correct_index is 0-based. "
                f'JSON schema: {{"title":"string","transcript":"string","transcript_translation":"string",'
                f'"questions":[{{"question":"string","options":["string"],"correct_index":0}}]}}'
            )

        if lesson_type == "writing":
            return preamble + (
                f"Provide a writing task with clear instructions, a writing prompt in {target_language}, "
                f"an example response in {target_language}, and 2–4 assessment criteria. "
                f"Instructions and criteria in {source_language}. "
                f'JSON schema: {{"title":"string","instructions":"string","prompt":"string",'
                f'"example_response":"string","criteria":["string"]}}'
            )

        if lesson_type == "speaking":
            return preamble + (
                f"Provide context and instructions in {source_language}. "
                f"Include 2–4 speaking prompts in {target_language} each with an example response. "
                f'JSON schema: {{"title":"string","context":"string",'
                f'"prompts":[{{"text":"string","example_response":"string"}}]}}'
            )

        raise ValueError(f"Unknown lesson_type: {lesson_type!r}")
