import json
from google.genai import types
from core.config import client
from services.rag_service import query_rag_manual

def translate_and_analyze_feedback(feedback_text: str) -> dict:
    """Uses real Gemini-2.5-Flash to translate, analyze sentiment/urgency, and categorize feedback."""
    prompt = f"""
    Analyze the following spectator feedback:
    "{feedback_text}"
    
    Please perform:
    1. Translate to English (if it is not English).
    2. Sentiment analysis (output 'positive', 'negative', or 'neutral').
    3. Urgency classification (output 'high', 'medium', or 'low').
    4. Categorize it (must be one of: 'Accessibility', 'Energy', 'Inclusivity', 'Waste').
    
    Format the output strictly as a JSON object with keys:
    "translation", "sentiment", "urgency", "category"
    """
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Translation error: {e}")
        return {
            "translation": feedback_text,
            "sentiment": "neutral",
            "urgency": "medium",
            "category": "Inclusivity"
        }

def chat_copilot(query: str, system_context: str) -> dict:
    """Chats with Gemini using contextual RAG information and system event config."""
    # Find matching context from AlloyDB/RAG vector index
    rag_context = query_rag_manual(query)
    
    full_prompt = f"""
    Event Configuration Context:
    {system_context}
    
    Matched RAG Manual Context:
    {rag_context if rag_context else "No direct manual references found."}
    
    Operator Query:
    "{query}"
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt,
            config=types.GenerateContentConfig(
                system_instruction="You are Gemini, the EcoAccess Global Event Co-pilot. Answer operators accurately using the context provided."
            )
        )
        return {
            "text": response.text,
            "citations": ["AlloyDB pgvector Index", "Vertex AI Copilot"] if rag_context else ["Vertex AI Copilot"],
            "ragSnippet": rag_context
        }
    except Exception as e:
        print(f"Chat error: {e}")
        return {
            "text": f"Co-pilot error: {e}",
            "citations": [],
            "ragSnippet": ""
        }

def detect_waste_gemini(image_bytes: bytes, mime_type: str) -> dict:
    """Uses Gemini 2.5 Flash multimodal vision to detect bin fullness and contamination."""
    prompt = """
    Analyze this image of a waste bin or recycling station:
    1. Detect if there is any recycling contamination (e.g., landfill trash or plastic bottles in an organic compost bin, or organic compostable waste in a recycling bin). Set "contaminationDetected" to true/false.
    2. Describe the contamination details if detected, otherwise leave empty. Set "contaminationDetail" to a short string.
    3. Estimate the bin fullness level as a percentage (integer from 0 to 100). Set "fillLevel" to this integer.
    4. Categorize the bin status as "normal", "contamination_warning" (if contamination detected), or "overflowing" (if fillLevel >= 80). Set "status" to one of these values.
    
    Format the output strictly as a JSON object with keys:
    "contaminationDetected", "contaminationDetail", "fillLevel", "status"
    """
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=mime_type
                ),
                prompt
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Gemini vision error: {e}")
        # Default fallback
        return {
            "contaminationDetected": False,
            "contaminationDetail": "",
            "fillLevel": 45,
            "status": "normal"
        }
