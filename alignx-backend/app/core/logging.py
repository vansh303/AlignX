"""Structured Logging Module with Request ID Context Awareness."""

import logging
import sys
from contextvars import ContextVar
from typing import Optional

# Global contextvar storing current request / connection ID
request_id_ctx_var: ContextVar[Optional[str]] = ContextVar("request_id", default=None)


class RequestIDFilter(logging.Filter):
    """Logging filter to inject request_id contextvar into log records."""

    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = request_id_ctx_var.get() or "N/A"
        return True


def setup_logging(log_level: str = "INFO") -> None:
    """Configure root logger with structured formatting including Request ID."""
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level.upper())

    # Clear existing handlers
    root_logger.handlers.clear()

    formatter = logging.Formatter(
        "[%(asctime)s] [%(levelname)s] [req_id:%(request_id)s] [%(name)s]: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    console_handler.addFilter(RequestIDFilter())

    root_logger.addHandler(console_handler)


def get_logger(name: str) -> logging.Logger:
    """Get a named logger instance."""
    return logging.getLogger(name)
