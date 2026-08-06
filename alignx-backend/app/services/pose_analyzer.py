"""Pose Analyzer Service Encapsulating MediaPipe Pose Estimation."""

import threading
from typing import Dict, Any, Optional
import cv2
import mediapipe as mp
from app.core.config import settings
from app.core.logging import get_logger
from app.utils.constants import DEFAULT_SCORE, DEFAULT_ISSUE, INITIAL_ISSUE

logger = get_logger("services.pose_analyzer")


class PoseAnalyzer:
    """Service responsible for processing video frames via MediaPipe Pose."""

    def __init__(self) -> None:
        self.mp_pose = mp.solutions.pose
        self.drawing = mp.solutions.drawing_utils
        self.pose = self.mp_pose.Pose(
            min_detection_confidence=settings.MIN_DETECTION_CONFIDENCE,
            model_complexity=settings.MODEL_COMPLEXITY,
        )
        self._lock = threading.Lock()
        self._last_scan: Dict[str, Any] = {
            "score": 0,
            "issue": INITIAL_ISSUE,
        }
        logger.info("PoseAnalyzer service initialized successfully")

    def process(self, frame: Optional[cv2.Mat]) -> Optional[cv2.Mat]:
        """Process a single frame: flip, landmark detection, annotation, and score update."""
        if frame is None:
            return None

        try:
            # Flip horizontally for mirror view
            frame = cv2.flip(frame, 1)

            # Convert to RGB for MediaPipe
            image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = self.pose.process(image_rgb)

            # Convert back to BGR for OpenCV encoding
            annotated_frame = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR)

            if results.pose_landmarks:
                self.drawing.draw_landmarks(
                    annotated_frame,
                    results.pose_landmarks,
                    self.mp_pose.POSE_CONNECTIONS,
                )
                with self._lock:
                    self._last_scan = {
                        "score": DEFAULT_SCORE,
                        "issue": DEFAULT_ISSUE,
                    }
            return annotated_frame
        except Exception as err:
            logger.error(f"Error during pose analysis frame processing: {err}", exc_info=True)
            return frame

    def get_last_scan(self) -> Dict[str, Any]:
        """Thread-safe getter for the current scan result."""
        with self._lock:
            return dict(self._last_scan)

    def close(self) -> None:
        """Release MediaPipe Pose resources cleanly."""
        try:
            if hasattr(self, "pose") and self.pose:
                self.pose.close()
                logger.info("MediaPipe Pose resources closed successfully")
        except Exception as err:
            logger.error(f"Error closing PoseAnalyzer: {err}")
