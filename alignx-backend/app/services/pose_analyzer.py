
"""Pose Analyzer Service Encapsulating MediaPipe Pose Estimation."""

import threading
import math
from typing import Dict, Any, Optional

import cv2
import mediapipe as mp

from app.core.config import settings
from app.core.logging import get_logger
from app.utils.constants import (
    DEFAULT_SCORE,
    DEFAULT_ISSUE,
    INITIAL_ISSUE,
)

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

    @staticmethod
    def _calculate_neck_angle(landmarks) -> Optional[float]:
        """
        Calculate a prototype neck inclination angle.

        Uses:
        - Nose
        - Left shoulder
        - Right shoulder

        The midpoint of both shoulders is used as the reference point.
        This is a geometric prototype indicator, not a clinical measurement.
        """

        try:
            nose = landmarks[
                mp.solutions.pose.PoseLandmark.NOSE.value
            ]

            left_shoulder = landmarks[
                mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value
            ]

            right_shoulder = landmarks[
                mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value
            ]

            shoulder_x = (
                left_shoulder.x + right_shoulder.x
            ) / 2

            shoulder_y = (
                left_shoulder.y + right_shoulder.y
            ) / 2

            dx = nose.x - shoulder_x
            dy = shoulder_y - nose.y

            if abs(dx) < 1e-6 and abs(dy) < 1e-6:
                return None

            angle = math.degrees(
                math.atan2(abs(dx), dy)
            )

            return angle

        except (IndexError, AttributeError, ValueError):
            return None

    @staticmethod
    def _calculate_shoulder_angle(landmarks) -> Optional[float]:
        """
        Calculate a prototype shoulder alignment angle.
        
        Uses:
        - Left shoulder
        - Right shoulder
        """
        try:
            left_shoulder = landmarks[
                mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value
            ]
            right_shoulder = landmarks[
                mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value
            ]

            dx = right_shoulder.x - left_shoulder.x
            dy = right_shoulder.y - left_shoulder.y

            if abs(dx) < 1e-6 and abs(dy) < 1e-6:
                return None

            angle = math.degrees(math.atan2(abs(dy), abs(dx)))
            return angle
        except (IndexError, AttributeError, ValueError):
            return None

    @staticmethod
    def _calculate_posture_score(
        neck_angle: Optional[float],
    ) -> tuple[int, str]:
        """
        Convert the prototype neck-angle indicator into a demo score.

        Thresholds are engineering/demo choices because
        the project specification does not provide clinical thresholds.
        """

        if neck_angle is None:
            return DEFAULT_SCORE, DEFAULT_ISSUE

        if neck_angle <= 8:
            return 95, "Good Neck Alignment"

        if neck_angle <= 15:
            return 88, "Minor Forward Head Posture"

        if neck_angle <= 25:
            return 78, "Moderate Neck Inclination"

        return 65, "High Neck Inclination"

    def process(
        self,
        frame: Optional[cv2.Mat],
    ) -> Optional[cv2.Mat]:
        """
        Process a single frame:
        flip -> landmark detection -> annotation -> posture analysis.
        """

        if frame is None:
            return None

        try:
            # Mirror camera view
            frame = cv2.flip(frame, 1)

            # Convert BGR -> RGB for MediaPipe
            image_rgb = cv2.cvtColor(
                frame,
                cv2.COLOR_BGR2RGB,
            )

            # Run MediaPipe Pose
            results = self.pose.process(image_rgb)

            # Convert RGB -> BGR for OpenCV output
            annotated_frame = cv2.cvtColor(
                image_rgb,
                cv2.COLOR_RGB2BGR,
            )

            if results.pose_landmarks:
                # Draw pose skeleton
                self.drawing.draw_landmarks(
                    annotated_frame,
                    results.pose_landmarks,
                    self.mp_pose.POSE_CONNECTIONS,
                )

                # Get landmarks
                landmarks = results.pose_landmarks.landmark

                # Calculate neck angle
                neck_angle = self._calculate_neck_angle(
                    landmarks
                )
                
                # Calculate shoulder angle
                shoulder_angle = self._calculate_shoulder_angle(
                    landmarks
                )

                # Calculate score (neck)
                score, issue = self._calculate_posture_score(
                    neck_angle
                )
                
                # Process shoulder issue
                shoulder_alignment = "Aligned"
                shoulder_issue = None
                
                if shoulder_angle is not None:
                    if shoulder_angle > 5.0:
                        shoulder_alignment = "Noticeable Asymmetry"
                        shoulder_issue = "Shoulder Asymmetry"
                        score = max(0, score - 10)
                    elif shoulder_angle > 2.5:
                        shoulder_alignment = "Minor Asymmetry"
                        shoulder_issue = "Minor Shoulder Asymmetry"
                        score = max(0, score - 5)
                        
                # Combine issue text
                if shoulder_issue:
                    if issue in [DEFAULT_ISSUE, "Good Neck Alignment"]:
                        issue = shoulder_issue
                    else:
                        issue = f"{issue} & {shoulder_issue}"

                # Add a subtle visualization for the shoulders
                try:
                    h, w, _ = annotated_frame.shape
                    left_shoulder = landmarks[mp.solutions.pose.PoseLandmark.LEFT_SHOULDER.value]
                    right_shoulder = landmarks[mp.solutions.pose.PoseLandmark.RIGHT_SHOULDER.value]
                    pt1 = (int(left_shoulder.x * w), int(left_shoulder.y * h))
                    pt2 = (int(right_shoulder.x * w), int(right_shoulder.y * h))
                    cv2.line(annotated_frame, pt1, pt2, (0, 255, 255), 3)
                    cv2.circle(annotated_frame, pt1, 5, (0, 255, 255), -1)
                    cv2.circle(annotated_frame, pt2, 5, (0, 255, 255), -1)
                except Exception:
                    pass

                # Store latest result
                with self._lock:
                    self._last_scan = {
                        "score": score,
                        "issue": issue,
                        "neck_angle": (
                            round(neck_angle, 2)
                            if neck_angle is not None
                            else None
                        ),
                        "shoulder_angle": (
                            round(shoulder_angle, 2)
                            if shoulder_angle is not None
                            else None
                        ),
                        "shoulder_alignment": shoulder_alignment,
                    }

            return annotated_frame

        except Exception as err:
            logger.error(
                f"Error during pose analysis frame processing: {err}",
                exc_info=True,
            )

            return frame

    def get_last_scan(self) -> Dict[str, Any]:
        """Return the latest posture scan result safely."""

        with self._lock:
            return dict(self._last_scan)

    def close(self) -> None:
        """Release MediaPipe Pose resources cleanly."""

        try:
            if hasattr(self, "pose") and self.pose:
                self.pose.close()

                logger.info(
                    "MediaPipe Pose resources closed successfully"
                )

        except Exception as err:
            logger.error(
                f"Error closing PoseAnalyzer: {err}"
            )
