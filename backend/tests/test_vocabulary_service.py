import sqlite3
from datetime import datetime, timedelta, timezone

import pytest

from services.vocabulary_service import _compute_next_review, _INITIAL_INTERVAL_DAYS


# ---------------------------------------------------------------------------
# _compute_next_review — spaced repetition logic
# ---------------------------------------------------------------------------

class TestComputeNextReview:
    def _days_from_now(self, next_review: str) -> int:
        nxt = datetime.fromisoformat(next_review.replace("Z", "+00:00")).date()
        today = datetime.now(timezone.utc).date()
        return (nxt - today).days

    def test_incorrect_always_resets_to_one_day(self):
        last = (datetime.now(timezone.utc) - timedelta(days=8)).isoformat()
        nxt = datetime.now(timezone.utc).isoformat()
        result = _compute_next_review(correct=False, last_seen_at=last, next_review_at=nxt)
        assert self._days_from_now(result) == _INITIAL_INTERVAL_DAYS

    def test_incorrect_resets_even_with_no_history(self):
        result = _compute_next_review(correct=False, last_seen_at=None, next_review_at=None)
        assert self._days_from_now(result) == _INITIAL_INTERVAL_DAYS

    def test_correct_with_no_history_uses_initial_interval(self):
        # No prior history → cannot compute previous interval → uses initial (1 day)
        result = _compute_next_review(correct=True, last_seen_at=None, next_review_at=None)
        assert self._days_from_now(result) == _INITIAL_INTERVAL_DAYS

    def test_correct_doubles_interval_one_to_two(self):
        last = datetime.now(timezone.utc) - timedelta(days=1)
        nxt = datetime.now(timezone.utc) + timedelta(days=0)  # interval was 1 day
        result = _compute_next_review(
            correct=True,
            last_seen_at=last.isoformat(),
            next_review_at=nxt.isoformat(),
        )
        assert self._days_from_now(result) == 2

    def test_correct_doubles_interval_two_to_four(self):
        last = datetime.now(timezone.utc) - timedelta(days=2)
        nxt = datetime.now(timezone.utc) + timedelta(days=0)  # interval was 2 days
        result = _compute_next_review(
            correct=True,
            last_seen_at=last.isoformat(),
            next_review_at=nxt.isoformat(),
        )
        assert self._days_from_now(result) == 4

    def test_correct_doubles_interval_four_to_eight(self):
        last = datetime.now(timezone.utc) - timedelta(days=4)
        nxt = datetime.now(timezone.utc) + timedelta(days=0)  # interval was 4 days
        result = _compute_next_review(
            correct=True,
            last_seen_at=last.isoformat(),
            next_review_at=nxt.isoformat(),
        )
        assert self._days_from_now(result) == 8

    def test_date_only_strings_are_handled(self):
        # chat_service saves next_review_at as a date-only string
        last = (datetime.now(timezone.utc).date() - timedelta(days=1)).isoformat()
        nxt = datetime.now(timezone.utc).date().isoformat()
        result = _compute_next_review(correct=True, last_seen_at=last, next_review_at=nxt)
        assert self._days_from_now(result) == 2

    def test_result_format_is_iso_utc(self):
        result = _compute_next_review(correct=False, last_seen_at=None, next_review_at=None)
        assert result.endswith("Z")
        datetime.fromisoformat(result.replace("Z", "+00:00"))  # must not raise
