import os
from dotenv import load_dotenv
from langchain_ollama import OllamaLLM
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

# Setup Models
falcon = OllamaLLM(model="falcon7b")
gemini = ChatGoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=os.getenv("GEMINI_API_KEY"))

async def run_akriti_pipeline(user_prompt: str):
    # Stage 1: Blueprinting (Falcon)
    blueprint_prompt = ChatPromptTemplate.from_template(
        "Design a 3D scene architecture for: {input}. List the objects, positions, and colors."
    )
    blueprint_chain = blueprint_prompt | falcon
    blueprint = await blueprint_chain.ainvoke({"input": user_prompt})

    # Stage 2: Code Generation (Gemini)
    code_prompt = ChatPromptTemplate.from_template(
        "Convert this 3D blueprint into pure Three.js code: {blueprint}. "
        "Rules: Use a 'scene', 'camera', and 'renderer'. No imports/exports. "
        "Assume 'THREE' is available globally. Add a basic animation loop."
    )
    code_chain = code_prompt | gemini
    response = await code_chain.ainvoke({"blueprint": blueprint})
    
    # Return content string (Gemini returns a BaseMessage object)
    return response.content