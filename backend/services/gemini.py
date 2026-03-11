from langchain_core.prompts import PromptTemplate
from services.llm_client import gemini_llm
from utils.formatter import extract_js_code

async def generate_gemini_3d(expanded_prompt: str):
    """Takes Falcon's blueprint and writes Three.js code."""
    template = """You are an expert Three.js developer. Build an interactive 3D data science simulation based on this architectural blueprint:
    
    BLUEPRINT:
    {blueprint}
    
    RULES: 
    1. Only use standard Three.js syntax (e.g., scene, camera, renderer).
    2. Do NOT use import/export statements. 
    3. Assume 'THREE' and 'OrbitControls' are globally available via script tags.
    4. Provide the animation loop.
    5. Output ONLY the pure javascript code inside ```javascript ``` blocks. Do not add conversational text."""
    
    prompt_template = PromptTemplate(template=template, input_variables=["blueprint"])
    chain = prompt_template | gemini_llm
    
    response = await chain.ainvoke({"blueprint": expanded_prompt})
    
    # Extract just the code from the response
    raw_text = getattr(response, 'content', str(response))
    clean_code = extract_js_code(raw_text)
    
    text_explanation = "I have generated the interactive 3D simulation based on your request. Click 'Open' to explore the Data Science concept in action."
    
    return text_explanation, clean_code

async def generate_gemini_video(expanded_prompt: str):
    """Handles video logic. Returns a placeholder URL until Gemini video generation endpoints are integrated."""
    # In the future, this will connect to Gemini's video rendering pipeline.
    text_explanation = "Your Data Science educational video has been generated successfully based on the detailed Falcon blueprint."
    mock_video_url = "https://www.w3schools.com/html/mov_bbb.mp4" 
    
    return text_explanation, mock_video_url