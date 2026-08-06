"""Screening Data Schemas."""

from pydantic import BaseModel, Field


class ScreeningResponse(BaseModel):
    """Data model representing posture screening score and detected issues."""

    score: int = Field(..., description="Calculated posture score (0-100)")
    issue: str = Field(..., description="Primary posture issue description")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "score": 88,
                    "issue": "Minor Forward Head Posture",
                }
            ]
        }
    }
