import pytest
from ai.prompt_builder import PromptBuilder, TutorMode

LANGUAGE_PAIRS = [
    ("English", "Spanish", "A2"),
    ("English", "Japanese", "B1"),
    ("Arabic", "French", "A1"),
]

MODES: list[TutorMode] = ["general", "introduction", "travelling", "daily_life"]


class TestTutorSystemPrompt:
    def setup_method(self):
        self.builder = PromptBuilder()

    @pytest.mark.parametrize("source,target,level", LANGUAGE_PAIRS)
    @pytest.mark.parametrize("mode", MODES)
    def test_contains_languages_and_level(self, source, target, level, mode):
        prompt = self.builder.tutor_system_prompt(source, target, level, mode)
        assert source in prompt
        assert target in prompt
        assert level in prompt

    @pytest.mark.parametrize("mode", MODES)
    def test_modes_produce_distinct_prompts(self, mode):
        other_modes = [m for m in MODES if m != mode]
        prompt = self.builder.tutor_system_prompt("English", "Spanish", "A2", mode)
        for other in other_modes:
            other_prompt = self.builder.tutor_system_prompt("English", "Spanish", "A2", other)
            assert prompt != other_prompt

    def test_default_mode_is_general(self):
        with_default = self.builder.tutor_system_prompt("English", "Spanish", "A2")
        with_general = self.builder.tutor_system_prompt("English", "Spanish", "A2", "general")
        assert with_default == with_general

    @pytest.mark.parametrize("source,target,level", LANGUAGE_PAIRS)
    def test_returns_non_empty_string(self, source, target, level):
        for mode in MODES:
            result = self.builder.tutor_system_prompt(source, target, level, mode)
            assert isinstance(result, str)
            assert len(result) > 0

    def test_works_for_arbitrary_language_pair(self):
        prompt = self.builder.tutor_system_prompt("Swahili", "Yoruba", "A0", "general")
        assert "Swahili" in prompt
        assert "Yoruba" in prompt
        assert "A0" in prompt

    @pytest.mark.parametrize("mode,expected_keyword", [
        ("general", "open-ended"),
        ("introduction", "introduction"),
        ("travelling", "travel"),
        ("daily_life", "everyday"),
    ])
    def test_mode_focus_reflected_in_prompt(self, mode, expected_keyword):
        prompt = self.builder.tutor_system_prompt("English", "Spanish", "B1", mode)
        assert expected_keyword in prompt.lower()
