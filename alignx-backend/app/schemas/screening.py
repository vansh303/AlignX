
"""Screening Data Schemas."""

from typing import Optional

from pydantic import BaseModel, Field


class ScreeningResponse(BaseModel):
    """Data model representing posture screening results."""

    score: int = Field(
        ...,
        description="Calculated posture score (0-100)",
    )

    issue: str = Field(
        ...,
        description="Primary posture issue description",
    )

    neck_angle: Optional[float] = Field(
        None,
        description="Prototype neck inclination angle in degrees",
    )

    shoulder_angle: Optional[float] = Field(
        None,
        description="Prototype shoulder alignment angle in degrees",
    )

    shoulder_alignment: Optional[str] = Field(
        None,
        description="Shoulder alignment status",
    )

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "score": 88,
                    "issue": "Minor Forward Head Posture",
                    "neck_angle": 12.43,
                    "shoulder_angle": 2.5,
                    "shoulder_alignment": "Aligned"
                }
            ]
        }
    }
