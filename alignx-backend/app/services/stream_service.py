"""Stream Service Managing Video Capture Hardware and Response Stream Generation."""

import threading
import time
from typing import Generator
import cv2
from fastapi.responses import StreamingResponse
from app.core.config import settings
from app.core.logging import get_logger, request_id_ctx_var
from app.services.pose_analyzer import PoseAnalyzer
from app.utils.constants import JPEG_QUALITY, STREAM_CONTENT_TYPE, FRAME_BOUNDARY

logger = get_logger("services.stream_service")


class StreamService:
    """Service handling camera lifecycle, frame encoding, and streaming response generation."""

    def __init__(self, pose_analyzer: PoseAnalyzer) -> None:
        self.pose_analyzer = pose_analyzer
        self._camera_lock = threading.Lock()

    def generate_frames(self) -> Generator[bytes, None, None]:
        """Generator function producing JPEG frame bytes wrapped in multipart boundaries.
        
        Guarantees camera resource lock acquisition and cleanup via try...finally block.
        """
        req_id = request_id_ctx_var.get() or "N/A"
        logger.info(f"Stream connection initiated [req_id:{req_id}]. Attempting camera lock acquisition...")

        # Acquire synchronous camera lock to prevent simultaneous camera hardware access
        acquired = self._camera_lock.acquire(blocking=False)
        if not acquired:
            logger.warning(f"Camera is currently locked by another active stream session [req_id:{req_id}]. Aborting new connection.")
            return

        cap = None
        try:
            cap = cv2.VideoCapture(settings.CAMERA_INDEX)
            if not cap.isOpened():
                logger.error(f"Failed to open video capture device at index {settings.CAMERA_INDEX} [req_id:{req_id}]")
                return

            logger.info(f"Video capture device successfully opened [index:{settings.CAMERA_INDEX}] [req_id:{req_id}]")

            encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), JPEG_QUALITY]

            while True:
                success, frame = cap.read()
                if not success or frame is None:
                    logger.warning(f"Failed to read frame from camera [req_id:{req_id}]")
                    time.sleep(0.03)
                    continue

                # Process frame through PoseAnalyzer service
                processed_frame = self.pose_analyzer.process(frame)
                target_frame = processed_frame if processed_frame is not None else frame

                # Encode frame to JPEG
                ret, buffer = cv2.imencode(".jpg", target_frame, encode_param)
                if not ret:
                    logger.warning(f"Frame encoding failed [req_id:{req_id}]")
                    continue

                frame_bytes = buffer.tobytes()

                # Yield multipart boundary format expected by browsers / standard image tag stream
                yield (
                    f"{FRAME_BOUNDARY}\r\n"
                    f"Content-Type: image/jpeg\r\n"
                    f"Content-Length: {len(frame_bytes)}\r\n\r\n".encode("utf-8")
                    + frame_bytes
                    + b"\r\n"
                )

        except Exception as err:
            logger.error(f"Unexpected error in video stream generation loop [req_id:{req_id}]: {err}", exc_info=True)
        finally:
            # Ensure camera device release and lock release under all exit paths
            if cap is not None:
                try:
                    cap.release()
                    logger.info(f"VideoCapture device released successfully [req_id:{req_id}]")
                except Exception as rel_err:
                    logger.error(f"Error releasing VideoCapture device [req_id:{req_id}]: {rel_err}")

            self._camera_lock.release()
            logger.info(f"Camera lock released [req_id:{req_id}]")

    def create_streaming_response(self) -> StreamingResponse:
        """Create and return FastAPI StreamingResponse wrapping the frame generator."""
        return StreamingResponse(
            self.generate_frames(),
            media_type=STREAM_CONTENT_TYPE,
            headers={
                "Cache-Control": "no-cache, no-store, must-revalidate, pre-check=0, post-check=0, max-age=0",
                "Pragma": "no-cache",
                "Expires": "0",
                "Connection": "close",
            },
        )
