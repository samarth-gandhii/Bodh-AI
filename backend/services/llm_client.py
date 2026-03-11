import os
from dotenv import load_dotenv
from langchain_ollama import OllamaLLM
from langchain_google_genai import ChatGoogleGenerativeAI

# Load environment variables (like your GEMINI_API_KEY)
load_dotenv()

# 1. Initialize Local Falcon 7B
# Make sure Ollama is running on your machine and you have pulled the falcon model: `ollama run falcon`
falcon_llm = OllamaLLM(model="falcon") 

# 2. Initialize Gemini 2.5 Flash
gemini_llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash", # Using the latest fast model
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.4 # Lower temperature for more accurate coding
)