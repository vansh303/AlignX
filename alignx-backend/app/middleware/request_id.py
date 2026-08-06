"""Request ID Correlation Middleware for HTTP and WebSockets."""

import uuid
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response
from app.core.logging import request_id_ctx_var, get_logger

logger = get_logger("middleware.request_id")


class RequestIdMiddleware(BaseHTTPMiddleware):
    """Middleware that injects or generates a unique X-Request-ID for every HTTP request."""

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        req_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())[:8]
        token = request_id_ctx_var.set(req_id)

        try:
            response = await call_next(request)
            response.headers["X-Request-ID"] = req_id
            return response
        finally:
            request_id_ctx_var.reset(token)
