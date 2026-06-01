"""Unit tests for rate_limit middleware — key function and limiter configuration."""
import os
from datetime import datetime, timedelta, timezone
from unittest.mock import MagicMock

import pytest
from jose import jwt

from middleware.rate_limit import (
    ASSESSMENT_SCORE_LIMIT,
    CHAT_LIMIT,
    LESSON_GENERATE_LIMIT,
    _ALGORITHM,
    _user_id_key,
    limiter,
)

_SECRET = "test-secret-for-rate-limit-tests"


def _make_access_token(user_id: int, secret: str = _SECRET) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    return jwt.encode(
        {"sub": str(user_id), "exp": expire, "type": "access"},
        secret,
        algorithm=_ALGORITHM,
    )


def _make_request(authorization: str | None = None, client_host: str = "10.0.0.1") -> MagicMock:
    request = MagicMock()
    request.headers = {"Authorization": authorization} if authorization else {}
    request.client = MagicMock()
    request.client.host = client_host
    return request


class TestUserIdKey:
    def test_returns_user_id_for_valid_access_token(self, monkeypatch):
        monkeypatch.setenv("JWT_SECRET_KEY", _SECRET)
        token = _make_access_token(42)
        request = _make_request(f"Bearer {token}")
        assert _user_id_key(request) == "user:42"

    def test_different_users_produce_different_keys(self, monkeypatch):
        monkeypatch.setenv("JWT_SECRET_KEY", _SECRET)
        token_a = _make_access_token(1)
        token_b = _make_access_token(2)
        assert _user_id_key(_make_request(f"Bearer {token_a}")) != _user_id_key(
            _make_request(f"Bearer {token_b}")
        )

    def test_falls_back_to_ip_when_no_authorization_header(self, monkeypatch):
        monkeypatch.setenv("JWT_SECRET_KEY", _SECRET)
        request = _make_request(client_host="192.168.1.1")
        key = _user_id_key(request)
        assert key == "192.168.1.1"

    def test_falls_back_to_ip_for_malformed_token(self, monkeypatch):
        monkeypatch.setenv("JWT_SECRET_KEY", _SECRET)
        request = _make_request("Bearer not-a-real-jwt", client_host="1.2.3.4")
        assert _user_id_key(request) == "1.2.3.4"

    def test_falls_back_to_ip_for_wrong_secret(self, monkeypatch):
        monkeypatch.setenv("JWT_SECRET_KEY", "wrong-secret")
        token = _make_access_token(7, secret=_SECRET)
        request = _make_request(f"Bearer {token}", client_host="5.6.7.8")
        assert _user_id_key(request) == "5.6.7.8"

    def test_falls_back_to_ip_for_refresh_token(self, monkeypatch):
        """Refresh tokens must not be accepted as rate-limit keys."""
        monkeypatch.setenv("JWT_SECRET_KEY", _SECRET)
        expire = datetime.now(timezone.utc) + timedelta(days=7)
        refresh = jwt.encode(
            {"sub": "99", "exp": expire, "type": "refresh"},
            _SECRET,
            algorithm=_ALGORITHM,
        )
        request = _make_request(f"Bearer {refresh}", client_host="9.9.9.9")
        assert _user_id_key(request) == "9.9.9.9"

    def test_falls_back_to_ip_when_bearer_prefix_missing(self, monkeypatch):
        monkeypatch.setenv("JWT_SECRET_KEY", _SECRET)
        token = _make_access_token(3)
        request = _make_request(token, client_host="11.11.11.11")
        assert _user_id_key(request) == "11.11.11.11"


class TestLimitConstants:
    def test_chat_limit_is_30_per_hour(self):
        assert CHAT_LIMIT == "30/hour"

    def test_lesson_generate_limit_is_10_per_hour(self):
        assert LESSON_GENERATE_LIMIT == "10/hour"

    def test_assessment_score_limit_is_10_per_hour(self):
        assert ASSESSMENT_SCORE_LIMIT == "10/hour"


class TestLimiterConfiguration:
    def test_limiter_exists(self):
        assert limiter is not None

    def test_limiter_uses_user_id_key_function(self):
        assert limiter._key_func is _user_id_key
