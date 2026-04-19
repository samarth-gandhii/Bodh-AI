from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from services.llm_client import generation_llm
from utils.formatter import extract_js_code

# ---------------------------------------------------------
# 1. 3D SIMULATION ROUTE
# ---------------------------------------------------------
async def generate_gemini_3d(expanded_prompt: str, history: list):
    """Takes Falcon's blueprint and writes Three.js code with conversational context."""
    
    template = ChatPromptTemplate.from_messages([
        ("system", """You are an expert Three.js developer. Build an interactive 3D simulation.
         
         BLUEPRINT:
    {blueprint}
RULES:
1. Only use standard Three.js syntax (scene, camera, renderer).
2. NO import/export statements. Assume 'THREE' and 'OrbitControls' are global.
3. Use native DOM only for UI (sliders/buttons). No dat.gui or external libs.
4. Maintain visual consistency with any previous code in the chat history.
5. CRITICAL: NEVER OUTPUT HTML TAGS like <script> or <html>. Output PURE JavaScript code only. No markdown fences.
6. DO NOT use THREE.CSS2DRenderer or CSS3DRenderer. They are NOT available. For labels/text, use native HTML overlay elements or THREE.Sprite."""),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "Follow this blueprint to generate ONLY JavaScript code (no markdown fences): {blueprint}")
    ])
    
    # Sliding window: last 6 messages
    trimmed_history = history[-4:] if history else []
    
    chain = template | generation_llm
    response = await chain.ainvoke({
        "chat_history": trimmed_history,
        "blueprint": expanded_prompt
    })
    
    raw_text = getattr(response, 'content', str(response))
    clean_code = extract_js_code(raw_text)
    
    text_explanation = "I've generated the 3D simulation based on your request."
    
    return text_explanation, clean_code

# ---------------------------------------------------------
# 2. VIDEO ROUTE (Placeholder for now)
# ---------------------------------------------------------
async def generate_gemini_video(expanded_prompt: str, history: list):
    """Maintains history for future video generation integration."""
    text_explanation = "I've processed the video request using the latest context from our chat."
    mock_video_url = "https://www.w3schools.com/html/mov_bbb.mp4" 
    return text_explanation, mock_video_url

# ---------------------------------------------------------
# 3. TEXT ROUTE
# ---------------------------------------------------------
async def generate_gemini_text(prompt: str, history: list) -> str:
    """Handles standard text explanations with memory."""
    template = ChatPromptTemplate.from_messages([
        ("system", "You are an AI tutor specializing in Data Science. Use Markdown (Headings, bold, lists)."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{concept}")
    ])
    
    trimmed_history = history[-4:] if history else []
    chain = template | generation_llm
    
    response = await chain.ainvoke({
        "chat_history": trimmed_history,
        "concept": prompt
    })
    return getattr(response, 'content', str(response))

# ---------------------------------------------------------
# 4. QUIZ ROUTE
# ---------------------------------------------------------
async def generate_gemini_quiz(expanded_prompt: str, history: list) -> str:
    """Generates a quiz based on the current and past context."""
    template = ChatPromptTemplate.from_messages([
        ("system", "You are an expert curriculum designer. Generate a 5-question MCQ quiz in valid JSON format."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "Generate a quiz based on this blueprint: {blueprint}. Format: [{{'question': '...', 'options': [...], 'answer': '...'}}]")
    ])
    
    trimmed_history = history[-4:] if history else []
    chain = template | generation_llm
    
    response = await chain.ainvoke({
        "chat_history": trimmed_history,
        "blueprint": expanded_prompt
    })
    return getattr(response, 'content', str(response))