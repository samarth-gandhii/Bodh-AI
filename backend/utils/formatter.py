import re

def extract_js_code(text: str) -> str:
    # We multiply a single backtick by 3 to bypass any IDE copy-paste bugs
    ticks = "`" * 3
    pattern = ticks + r"(?:javascript|js)?(.*?)" + ticks
    
    match = re.search(pattern, text, re.DOTALL)
    
    if match:
        return match.group(1).strip()
        
    return text.replace(ticks, "").strip()