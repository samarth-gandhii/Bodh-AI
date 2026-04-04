from pydantic import BaseModel
from pydantic import Field
from typing import Optional, Any

class GenerateRequest(BaseModel):
    prompt: str
    history: list[dict[str, str]] = Field(default_factory=list)
    model_choice: Optional[str] = "Gemini 2.5 Flash"  # Updated default
    context_type: Optional[str] = "Text"              # Updated default
    client_server_instance_id: Optional[str] = None

class GenerateResponse(BaseModel):
    text_explanation: str
    canvas_code: Optional[str] = None  
    video_url: Optional[str] = None    
    video_script: Optional[str] = None # Added for video.py
    quiz_data: Optional[Any] = None    # Added for quiz.py
    media_type: Optional[str] = "Text" # Added so frontend knows what panel to open
    model_used: Optional[str] = "Gemini 2.5 Flash"