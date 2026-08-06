"""AlignX Backend Main Application Entry Point."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import v1_router, ws_router, init_services
from app.core.config import settings
from app.core.logging import setup_logging, get_logger
from app.middleware.request_id import RequestIdMiddleware
from app.services.pose_analyzer import PoseAnalyzer
from app.services.stream_service import StreamService
from app.utils.responses import format_health_response

logger = get_logger("main")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan manager handling startup and shutdown initialization."""
    # 1. Initialize Logging
    setup_logging(settings.LOG_LEVEL)
    logger.info(f"Starting {settings.PROJECT_NAME} v{settings.VERSION} [{settings.ENVIRONMENT}]")

    # 2. Instantiate Services
    pose_analyzer = PoseAnalyzer()
    stream_service = StreamService(pose_analyzer)

    # 3. Inject Services into Routers
    init_services(pose_analyzer, stream_service)
    logger.info("Core services initialized and attached to API routers")

    yield

    # 4. Cleanup Services on Shutdown
    logger.info("Shutting down application services...")
    pose_analyzer.close()
    logger.info("Application shutdown complete")


# Instantiate FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Attach Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RequestIdMiddleware)


# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Catch-all unhandled exception handler masking raw tracebacks from clients."""
    logger.error(f"Unhandled exception on {request.method} {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal Server Error", "message": "An unexpected error occurred."},
    )


# Health Check Endpoint
@app.get(
    "/health",
    tags=["system"],
    summary="Health Check",
    description="Returns simple server health status.",
)
async def health_check() -> dict:
    """Return server operational health status."""
    return format_health_response()


# Root Endpoint
@app.get(
    "/",
    tags=["system"],
    summary="Root Metadata Endpoint",
    description="Returns backend metadata.",
)
async def root() -> dict:
    """Return backend service metadata."""
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "status": "operational",
    }


# Include Routers
app.include_router(v1_router)
app.include_router(ws_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )