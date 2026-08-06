"""General Helper Utilities."""

import time
import uuid


def generate_short_id() -> str:
    """Generate short unique identifier string."""
    return str(uuid.uuid4())[:8]


def current_timestamp_ms() -> int:
    """Return current Unix timestamp in milliseconds."""
    return int(time.time() * 1000)
