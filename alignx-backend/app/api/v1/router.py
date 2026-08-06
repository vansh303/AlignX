"""API Router module handling V1 REST endpoints and root WebSocket route."""

import asyncio
import uuid
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse
from app.core.logging import get_logger, request_id_ctx_var
from app.schemas.screening import ScreeningResponse
from app.services.pose_analyzer import PoseAnalyzer
from app.services.stream_service import StreamService
from app.utils.constants import INITIAL_ISSUE
from app.utils.responses import format_screening_response

logger = get_logger("api.router")

# Router instances
v1_router = APIRouter(prefix="/api/v1", tags=["v1"])
ws_router = APIRouter(tags=["websocket"])

# Global service references attached during app lifespan
pose_analyzer_service: PoseAnalyzer = None  # type: ignore
stream_service: StreamService = None  # type: ignore


def init_services(pose_analyzer: PoseAnalyzer, streamer: StreamService) -> None:
    """Initialize global service references for router endpoints."""
    global pose_analyzer_service, stream_service
    pose_analyzer_service = pose_analyzer
    stream_service = streamer


@v1_router.get(
    "/stream/video_feed",
    summary="Video Feed Stream",
    description="Streams video frames with MediaPipe pose landmarks via MJPEG.",
)
def video_feed() -> StreamingResponse:
    """Delegate video stream generation entirely to StreamService."""
    return stream_service.create_streaming_response()


@v1_router.get(
    "/start-screening",
    response_model=ScreeningResponse,
    summary="Start Posture Screening",
    description="Returns latest posture screening score and detected issue.",
)
async def start_screening() -> ScreeningResponse:
    """Return latest pose analyzer scan result."""
    data = pose_analyzer_service.get_last_scan()
    formatted = format_screening_response(data.get("score", 0), data.get("issue", INITIAL_ISSUE))
    return ScreeningResponse(**formatted)


@ws_router.websocket("/ws/feedback")
async def websocket_feedback(websocket: WebSocket) -> None:
    """WebSocket endpoint pushing real-time posture feedback text to frontend."""
    ws_id = str(uuid.uuid4())[:8]
    token = request_id_ctx_var.set(f"ws-{ws_id}")

    await websocket.accept()
    logger.info(f"WebSocket client connected [/ws/feedback] [ws_id:{ws_id}]")

    last_sent = ""
    try:
        while True:
            scan_data = pose_analyzer_service.get_last_scan()
            issue = scan_data.get("issue", INITIAL_ISSUE)

            if issue != INITIAL_ISSUE and issue != last_sent:
                logger.info(f"Sending posture update to client: '{issue}' [ws_id:{ws_id}]")
                await websocket.send_text(issue)
                last_sent = issue

            await asyncio.sleep(2.0)

    except WebSocketDisconnect:
        logger.info(f"WebSocket client disconnected gracefully [ws_id:{ws_id}]")
    except Exception as err:
        logger.error(f"Error in WebSocket feedback loop [ws_id:{ws_id}]: {err}")
    finally:
        request_id_ctx_var.reset(token)
