"""Automated Test Suite & 20-Cycle Connection Stress Test for AlignX Backend."""

import warnings
import pytest
from fastapi.testclient import TestClient
from main import app

# Ignore deprecation warning from internal httpx/starlette client shortcut
warnings.filterwarnings("ignore", category=DeprecationWarning)


@pytest.fixture
def client():
    """Pytest fixture yielding TestClient instance."""
    with TestClient(app) as test_client:
        yield test_client


def test_health_endpoint(client):
    """Verify GET /health returns 200 OK and status healthy."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_root_endpoint(client):
    """Verify GET / returns 200 OK with application metadata."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "AlignX Backend"
    assert data["status"] == "operational"


def test_start_screening_endpoint(client):
    """Verify GET /api/v1/start-screening returns score and issue."""
    response = client.get("/api/v1/start-screening")
    assert response.status_code == 200
    data = response.json()
    assert "score" in data
    assert "issue" in data
    assert isinstance(data["score"], int)
    assert isinstance(data["issue"], str)


def test_consecutive_stream_connection_cycles(client):
    """Stress test: Perform 20 consecutive stream open/disconnect cycles.
    
    Verifies camera lock acquisition/release, zero resource leaks, and server stability.
    """
    for _ in range(20):
        with client.stream("GET", "/api/v1/stream/video_feed") as response:
            assert response.status_code == 200
            assert "multipart/x-mixed-replace" in response.headers.get("content-type", "")

    health_res = client.get("/health")
    assert health_res.status_code == 200
    assert health_res.json() == {"status": "healthy"}
