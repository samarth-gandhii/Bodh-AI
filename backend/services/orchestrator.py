from schemas.models import GenerateRequest, GenerateResponse
from services.falcon import generate_falcon_text, expand_prompt
from services.gemini import generate_gemini_3d, generate_gemini_video

async def process_prompt(request: GenerateRequest) -> GenerateResponse:
    current_model = request.model_choice
    context = request.context_type

    # 1. YOUR OVERRIDE RULE: Force visual tasks to the Hybrid Pipeline
    if current_model == "Falcon 7B" and context in ["3D_simulation", "Video"]:
        print(f"Override: Falcon cannot generate {context}. Switching to Auto (Hybrid Pipeline).")
        current_model = "Auto"

    # 2. Routing Logic
    if current_model == "Falcon 7B":
        # Pure Text Route (Local)
        text_result = await generate_falcon_text(request.prompt)
        return GenerateResponse(
            text_explanation=text_result,
            model_used="Falcon 7B"
        )

    elif current_model in ["Auto", "Gemini 2.5 Flash"]:
        # Hybrid Pipeline Route
        if context == "3D_simulation":
            # Step A: Falcon Engineers the Prompt
            expanded_prompt = await expand_prompt(request.prompt, context)
            print(f"Falcon Blueprint: {expanded_prompt}")
            
            # Step B: Gemini Builds the Code
            text, code = await generate_gemini_3d(expanded_prompt)
            
            return GenerateResponse(
                text_explanation=text,
                canvas_code=code,
                model_used="Auto (Falcon Blueprint + Gemini Code)"
            )
            
        elif context == "Video":
            # Step A: Falcon Engineers the Prompt
            expanded_prompt = await expand_prompt(request.prompt, context)
            
            # Step B: Gemini handles the video
            text, video_url = await generate_gemini_video(expanded_prompt)
            
            return GenerateResponse(
                text_explanation=text,
                video_url=video_url,
                model_used="Auto (Falcon Blueprint + Gemini Video)"
            )
            
        else:
            # Fallback for standard Text when "Auto" is selected
            # You can route to Gemini here, but keeping it to Falcon saves API costs
            text_result = await generate_falcon_text(request.prompt)
            return GenerateResponse(
                text_explanation=text_result,
                model_used="Falcon 7B (via Auto)"
            )

    return GenerateResponse(text_explanation="Unknown request format.", model_used="Unknown")