from fastapi import APIRouter
from schemas.models import GenerateRequest, GenerateResponse
from services.orchestrator import process_prompt

router = APIRouter()

@router.post("/generate", response_model=GenerateResponse)
async def generate_content(request: GenerateRequest):
    # Passes the frontend request straight into our LangChain orchestrator
    response = await process_prompt(request)
    return response