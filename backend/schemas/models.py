from pydantic import BaseModel
from typing import Optional

class GenerateRequest(BaseModel):
    prompt: str
    model_choice: str  
    context_type: Optional[str] = "Text" 

class GenerateResponse(BaseModel):
    text_explanation: str
    canvas_code: Optional[str] = None  
    video_url: Optional[str] = None    
    model_used: str