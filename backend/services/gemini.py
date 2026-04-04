from langchain_core.prompts import PromptTemplate
from services.llm_client import gemini_llm
from utils.formatter import extract_js_code # Ensure this file exists in your utils folder!

# ---------------------------------------------------------
# 1. 3D SIMULATION ROUTE
# ---------------------------------------------------------
async def generate_gemini_3d(expanded_prompt: str, history: list | None = None):
    """Takes Falcon's blueprint and writes Three.js code."""
    template = """You are an expert Three.js developer. Build an interactive 3D data science simulation based on this architectural blueprint:
    
    BLUEPRINT:
    {blueprint}
    
    RULES: 
    1. Only use standard Three.js syntax (e.g., scene, camera, renderer).
    2. Do NOT use import/export statements. 
    3. Assume 'THREE' and 'OrbitControls' are globally available via script tags.
    4. Provide the animation loop.
    5. Do NOT use dat.gui, lil-gui, stats.js, gsap, cannon-es, or any external dependency besides global THREE and OrbitControls.
    6. Build controls with native DOM only (document.createElement, input range, button, label).
    7. The output must run inside a plain iframe sandbox without module support.
    8. Output ONLY the pure JavaScript code inside ```javascript ``` blocks. Do not add conversational text."""
    
    prompt_template = PromptTemplate(template=template, input_variables=["blueprint"])
    chain = prompt_template | gemini_llm
    
    response = await chain.ainvoke({"blueprint": expanded_prompt})
    
    # Extract just the code from the response
    raw_text = getattr(response, 'content', str(response))
    clean_code = extract_js_code(raw_text)
    
    text_explanation = "I have generated the interactive 3D simulation based on your request. Click 'Open' to explore the Data Science concept in action."
    
    return text_explanation, clean_code

# ---------------------------------------------------------
# 2. VIDEO ROUTE
# ---------------------------------------------------------
async def generate_gemini_video(expanded_prompt: str, history: list | None = None):
    """Handles video logic. Returns a placeholder URL until Gemini video generation endpoints are integrated."""
    text_explanation = "Your Data Science educational video has been generated successfully based on the detailed Falcon blueprint."
    mock_video_url = "https://www.w3schools.com/html/mov_bbb.mp4" 
    
    return text_explanation, mock_video_url

# ---------------------------------------------------------
# 3. TEXT ROUTE
# ---------------------------------------------------------
async def generate_gemini_text(prompt: str, history: list | None = None) -> str:
    """Handles standard text explanations locally."""
    template = """You are an AI tutor specializing in Data Science and Data Analytics. 
    Explain the following concept clearly and concisely: {concept}
    
    CRITICAL INSTRUCTIONS:
    - Use Markdown formatting extensively (Headings, bullet points, bolding).
    """
    prompt_template = PromptTemplate(template=template, input_variables=["concept"])
    chain = prompt_template | gemini_llm
    response = await chain.ainvoke({"concept": prompt})
    return getattr(response, 'content', str(response))

# ---------------------------------------------------------
# 4. QUIZ ROUTE
# ---------------------------------------------------------
async def generate_gemini_quiz(expanded_prompt: str, history: list | None = None) -> str:
    """Handles quiz generation."""
    template = """You are an expert curriculum designer. Based on this blueprint:
    {blueprint}
    Generate a 5-question multiple-choice quiz.
    You MUST return the output as a valid JSON array of objects. 
    Format: [{{"question": "...", "options": ["A", "B", "C", "D"], "answer": "The correct option string"}}]
    Output ONLY raw JSON."""
    prompt_template = PromptTemplate(template=template, input_variables=["blueprint"])
    chain = prompt_template | gemini_llm
    response = await chain.ainvoke({"blueprint": expanded_prompt})
    return getattr(response, 'content', str(response))