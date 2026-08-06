"""Application Configuration Module."""

from typing import List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Centralized application settings loaded from environment variables or defaults."""

    PROJECT_NAME: str = "AlignX Backend"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "AlignX Pose Assessment & Screening Backend API"
    HOST: str = "0.0.0.0"
    PORT: int = 5000
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"

    # CORS settings
    ALLOWED_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]

    # Camera & Model settings
    CAMERA_INDEX: int = 0
    MIN_DETECTION_CONFIDENCE: float = 0.5
    MODEL_COMPLEXITY: int = 1
    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        """Convert comma-separated string or list to List[str]."""
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v


settings = Settings()
