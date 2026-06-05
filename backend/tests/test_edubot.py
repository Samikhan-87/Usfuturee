"""Backend tests for EduBot AI chat endpoint"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://futuree-academy.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestEduBot:
    """EduBot chat endpoint tests"""

    def test_root_health(self, session):
        r = session.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"

    def test_edubot_success(self, session):
        sid = str(uuid.uuid4())
        payload = {"session_id": sid, "message": "How do I check my grades?"}
        r = session.post(f"{BASE_URL}/api/chat/edubot", json=payload, timeout=60)
        assert r.status_code == 200, f"Got {r.status_code}: {r.text[:300]}"
        data = r.json()
        assert "reply" in data
        assert isinstance(data["reply"], str)
        assert len(data["reply"].strip()) > 0

    def test_edubot_empty_message_returns_400(self, session):
        sid = str(uuid.uuid4())
        r = session.post(f"{BASE_URL}/api/chat/edubot",
                         json={"session_id": sid, "message": "   "}, timeout=30)
        assert r.status_code == 400, f"Expected 400, got {r.status_code}: {r.text[:200]}"

    def test_edubot_missing_field_returns_422(self, session):
        r = session.post(f"{BASE_URL}/api/chat/edubot",
                         json={"session_id": str(uuid.uuid4())}, timeout=15)
        assert r.status_code == 422

    def test_edubot_session_continuity(self, session):
        """Two messages in same session should both succeed"""
        sid = str(uuid.uuid4())
        r1 = session.post(f"{BASE_URL}/api/chat/edubot",
                          json={"session_id": sid, "message": "Hi"}, timeout=60)
        assert r1.status_code == 200
        r2 = session.post(f"{BASE_URL}/api/chat/edubot",
                          json={"session_id": sid, "message": "Tell me about scholarships"}, timeout=60)
        assert r2.status_code == 200
        assert len(r2.json()["reply"]) > 0
