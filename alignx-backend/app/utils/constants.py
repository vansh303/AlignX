"""Application Constants Module."""

# Posture Analysis Defaults
DEFAULT_SCORE: int = 88
DEFAULT_ISSUE: str = "Minor Forward Head Posture"
INITIAL_ISSUE: str = "Scanning..."

# Streaming Configuration
JPEG_QUALITY: int = 80
FRAME_BOUNDARY: str = "--frame"
STREAM_CONTENT_TYPE: str = "multipart/x-mixed-replace; boundary=frame"

# Header Constants
HEADER_REQUEST_ID: str = "X-Request-ID"
