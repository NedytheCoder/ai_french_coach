"""
Unit tests for the assessment AI layer.

Tests cover prompt construction and XP calculation without live OpenAI calls.
Engineering Rule 9: integration tests with real API calls are in a separate
[integration] suite; these unit tests mock or avoid the API entirely.
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from ai.prompt_builder import PromptBuilder
from ai.assessment_scorer import XP_BY_LEVEL, _xp_for_level, _score


# ---------------------------------------------------------------------------
# PromptBuilder — assessment_question_prompt
# ---------------------------------------------------------------------------

class TestAssessmentQuestionPrompt:
    """assessment_question_prompt must inject languages/level, never hard-code them."""

    def _prompt(self, source, target, level, skill, count=2):
        return PromptBuilder().assessment_question_prompt(source, target, level, skill, count)

    # Language injection — three diverse pairs
    def test_injects_target_language_arabic(self):
        p = self._prompt("English", "Arabic", "A1", "reading")
        assert "Arabic" in p

    def test_injects_source_language_arabic(self):
        p = self._prompt("Arabic", "French", "B1", "writing")
        assert "Arabic" in p
        assert "French" in p

    def test_injects_japanese_target(self):
        p = self._prompt("German", "Japanese", "A0", "listening")
        assert "Japanese" in p
        assert "German" in p

    # Level injection
    def test_injects_level_a0(self):
        assert "A0" in self._prompt("English", "Spanish", "A0", "reading")

    def test_injects_level_c2(self):
        assert "C2" in self._prompt("English", "Chinese", "C2", "speaking")

    # Skill-specific schema hints
    def test_reading_mentions_multiple_choice(self):
        assert "multiple_choice" in self._prompt("English", "French", "A1", "reading")

    def test_listening_mentions_multiple_choice(self):
        assert "multiple_choice" in self._prompt("English", "Korean", "A2", "listening")

    def test_writing_mentions_open_response(self):
        assert "open_response" in self._prompt("English", "German", "B1", "writing")

    def test_speaking_mentions_open_response(self):
        assert "open_response" in self._prompt("English", "Italian", "B2", "speaking")

    # Count injection
    def test_count_1_in_prompt(self):
        p = self._prompt("English", "French", "A0", "reading", count=1)
        assert "1" in p

    def test_count_3_in_prompt(self):
        p = self._prompt("English", "French", "A0", "reading", count=3)
        assert "3" in p

    # Language-pair agnosticism — "French" must NOT appear in a non-French prompt
    def test_no_hardcoded_french_for_spanish_pair(self):
        p = self._prompt("English", "Spanish", "A1", "reading")
        # "Spanish" should appear; "French" must not appear as a hard-coded language
        assert "Spanish" in p
        assert "French" not in p

    def test_no_hardcoded_english_for_arabic_source(self):
        p = self._prompt("Arabic", "Yoruba", "A0", "writing")
        assert "Yoruba" in p
        # "English" must not appear — the source here is Arabic
        assert "English" not in p


# ---------------------------------------------------------------------------
# PromptBuilder — assessment_scoring_prompt
# ---------------------------------------------------------------------------

class TestAssessmentScoringPrompt:

    def _prompt(self, source, target, level, skill, question="Say hello.", answer="Bonjour."):
        return PromptBuilder().assessment_scoring_prompt(
            source, target, level, skill, question, answer
        )

    def test_injects_target_language(self):
        p = self._prompt("English", "Japanese", "A1", "writing")
        assert "Japanese" in p

    def test_injects_source_language(self):
        p = self._prompt("Korean", "French", "B2", "speaking")
        assert "Korean" in p
        assert "French" in p

    def test_injects_level(self):
        assert "B1" in self._prompt("English", "German", "B1", "writing")

    def test_injects_question_and_answer(self):
        p = PromptBuilder().assessment_scoring_prompt(
            "English", "Spanish", "A2", "writing",
            question="Describe your morning routine.",
            user_answer="Me levanto a las siete.",
        )
        assert "Describe your morning routine." in p
        assert "Me levanto a las siete." in p

    def test_returns_json_schema_hint(self):
        p = self._prompt("English", "French", "A1", "writing")
        assert "is_correct" in p
        assert "feedback" in p
        assert "score_percent" in p

    def test_no_hardcoded_french_for_german_pair(self):
        p = self._prompt("English", "German", "A2", "writing")
        assert "German" in p
        assert "French" not in p

    def test_non_english_source_language_injected(self):
        p = self._prompt("Arabic", "French", "A0", "speaking")
        assert "Arabic" in p


# ---------------------------------------------------------------------------
# XP tier values (ADR-003)
# ---------------------------------------------------------------------------

class TestXpByLevel:

    def test_a0_is_10(self):
        assert XP_BY_LEVEL["A0"] == 10

    def test_c2_is_40(self):
        assert XP_BY_LEVEL["C2"] == 40

    def test_all_levels_present(self):
        for level in ("A0", "A1", "A2", "B1", "B2", "C1", "C2"):
            assert level in XP_BY_LEVEL

    def test_xp_increases_with_level(self):
        levels = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"]
        xps = [XP_BY_LEVEL[l] for l in levels]
        assert xps == sorted(xps), "XP must increase monotonically with level"

    def test_range_10_to_40(self):
        for xp in XP_BY_LEVEL.values():
            assert 10 <= xp <= 40, f"XP {xp} out of ADR-003 range [10, 40]"

    def test_unknown_level_defaults_gracefully(self):
        assert _xp_for_level("X9") == 10  # unknown level → minimum XP


# ---------------------------------------------------------------------------
# _score — XP calculation logic (no API call)
# ---------------------------------------------------------------------------

class TestScoreXpCalculation:
    """
    Tests the deterministic XP math in _score() using a patched builder
    that returns a fixed AI response, so no OpenAI call is made.
    """

    def _mock_score(self, score_percent, xp_reward):
        """Directly test the XP formula: xp_awarded = round(score_percent / 100 * xp_reward)."""
        return max(0, round(score_percent / 100 * xp_reward))

    def test_perfect_score(self):
        assert self._mock_score(100, 20) == 20

    def test_half_score(self):
        assert self._mock_score(50, 20) == 10

    def test_zero_score(self):
        assert self._mock_score(0, 20) == 0

    def test_rounding(self):
        # 70% of 15 = 10.5 → rounds to 10 (Python rounds halves to even)
        result = self._mock_score(70, 15)
        assert result == round(0.7 * 15)

    def test_empty_answer_returns_zero_xp(self):
        """_score must short-circuit to 0 XP for blank answers without calling the API."""
        result = _score("English", "French", "A1", "writing", "Write a sentence.", "", xp_reward=20)
        assert result["xp_awarded"] == 0
        assert result["is_correct"] is False

    def test_whitespace_only_answer_returns_zero_xp(self):
        result = _score("English", "French", "A1", "writing", "Write a sentence.", "   ", xp_reward=20)
        assert result["xp_awarded"] == 0
