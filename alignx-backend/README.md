# AlignX Backend API

Enterprise-grade, stabilized FastAPI backend for **AlignX** pose screening and real-time posture analysis.

---

## Key Features

- **Real-Time Video Stream**: Live MJPEG video stream with MediaPipe Pose landmark overlays via `GET /api/v1/stream/video_feed`.
- **Posture Screening API**: Posture assessment metrics via `GET /api/v1/start-screening`.
- **Real-Time WebSocket Feedback**: Low-latency posture feedback text push via `WS /ws/feedback`.
- **Camera Concurrency Guard**: Threading-lock protected OpenCV camera hardware lifecycle preventing hardware locks and race conditions.
- **Resource Leak Prevention**: Guaranteed camera device release (`cap.release()`) on client disconnect or stream exit.
- **Structured Logging & Request Correlation**: Unique `X-Request-ID` attached to all HTTP requests and WebSocket connections.

---

## Directory Structure

```text
alignx-backend/
├── app/
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       └── router.py         # Thin API & WebSocket route handlers
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py         # Pydantic Settings configuration
│   │   └── logging.py        # Structured logging with Request ID filter
│   ├── middleware/
│   │   ├── __init__.py
│   │   └── request_id.py     # Request correlation ID middleware
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── screening.py      # Screening response Pydantic models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── pose_analyzer.py  # MediaPipe pose estimation service
│   │   └── stream_service.py # Camera hardware & MJPEG stream service
│   └── utils/
│       ├── __init__.py
│       ├── constants.py      # Centralized defaults & stream boundaries
│       ├── helpers.py        # General helper utilities
│       └── responses.py      # Standard response builders
├── main.py                   # FastAPI application & lifespan context
├── requirements.txt          # Python dependencies
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore directives
└── README.md                 # Project documentation
```

---

## Installation & Setup

### 1. Prerequisites
- Python 3.10+ installed.

### 2. Create & Activate Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

---

## Running the Server

Start the development server with Uvicorn:

```bash
python main.py
```
Or:
```bash
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```

- API Base URL: `http://localhost:5000`
- Interactive API Docs (Swagger): `http://localhost:5000/docs`
- ReDoc API Docs: `http://localhost:5000/redoc`
- Health Endpoint: `http://localhost:5000/health`

---

## API Specification

| Endpoint | Method / Protocol | Description |
| :--- | :--- | :--- |
| `GET /health` | HTTP GET | Simple server operational health check |
| `GET /api/v1/stream/video_feed` | HTTP GET (MJPEG) | Video stream with pose estimation overlays |
| `GET /api/v1/start-screening` | HTTP GET | Returns JSON with current `score` and `issue` |
| `WS /ws/feedback` | WebSocket | Pushes real-time posture feedback text |

---

## Architecture & Module Explanations

1. **`app/services/stream_service.py`**: Manages `cv2.VideoCapture` hardware acquisition guarded by `threading.Lock()`. Ensures `cap.release()` is executed inside `try...finally` blocks upon client disconnects.
2. **`app/services/pose_analyzer.py`**: Encapsulates MediaPipe Pose execution and maintains thread-safe state for posture scan results.
3. **`app/api/v1/router.py`**: Extremely thin routing layer. Receives HTTP/WS requests and delegates frame generation and state retrieval to domain services.
4. **`app/middleware/request_id.py`**: Injects `X-Request-ID` into request headers and context variables for request correlation across logs.
5. **`app/core/config.py`**: Type-safe settings management powered by `pydantic-settings`.

---

## Future Extension Strategy

- **WebRTC Migration**: The separation of `StreamService` enables seamless swapping of HTTP MJPEG streams with WebRTC peer connections.
- **Async Database Layer**: `app/repositories/` can be populated with SQLAlchemy/Tortoise ORM models without touching router contracts.
- **Authentication**: JWT middleware can be added to `app/middleware/` without modifying core domain services.
