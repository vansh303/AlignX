"""API Response Helper Utilities."""

from typing import Dict, Any


def format_screening_response(score: int, issue: str) -> Dict[str, Any]:
    """Format screening response payload preserving exact key schema expected by frontend."""
    return {
        "score": score,
        "issue": issue,
    }


def format_health_response(status: str = "healthy") -> Dict[str, str]:
    """Format health check response payload."""
    return {"status": status}


def format_error_response(message: str, detail: str = "") -> Dict[str, Any]:
    """Format generic error payload."""
    payload: Dict[str, Any] = {"error": message}
    if detail:
        payload["detail"] = detail
    return payload
