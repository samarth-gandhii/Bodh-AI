from fastapi import FastAPI
from fastapi import Request
from fastapi import Response
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router
from utils.server_state import SERVER_INSTANCE_ID

app = FastAPI(title="Pragnya AI Backend Engine")

# Development CORS: allow any origin/headers/methods.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all API endpoints from routes.py
app.include_router(api_router, prefix="/api")


@app.middleware("http")
async def attach_server_instance_header(request: Request, call_next):
    response: Response = await call_next(request)
    response.headers["X-Server-Instance"] = SERVER_INSTANCE_ID
    return response

@app.get("/")
async def root():
    return {"status": "Pragnya AI Engine is running."}