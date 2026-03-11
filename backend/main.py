from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router

app = FastAPI(title="Akriti Backend Engine")

# Allow Next.js (Port 3000) to communicate with FastAPI (Port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all API endpoints from routes.py
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"status": "Akriti Engine is running."}