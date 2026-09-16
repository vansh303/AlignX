
"""API Response Helper Utilities."""

from typing import Dict, Any, Optional


def format_screening_response(
    score: int,
    issue: str,
    neck_angle: Optional[float] = None,
    shoulder_angle: Optional[float] = None,
    shoulder_alignment: Optional[str] = None,
) -> Dict[str, Any]:
    """Format posture screening response."""

    return {
        "score": score,
        "issue": issue,
        "neck_angle": neck_angle,
        "shoulder_angle": shoulder_angle,
        "shoulder_alignment": shoulder_alignment,
    }


def format_health_response(
    status: str = "healthy",
) -> Dict[str, str]:
    """Format health check response."""

    return {
        "status": status,
    }


def format_error_response(
    message: str,
    detail: str = "",
) -> Dict[str, Any]:
    """Format generic error payload."""

    payload: Dict[str, Any] = {
        "error": message,
    }

    if detail:
        payload["detail"] = detail

    return payload

