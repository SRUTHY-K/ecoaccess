import os
import json
from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from schemas.models import ChatRequest, FeedbackRequest, EventConfig, CredentialsConfig
from core.config import CONFIG_FILE, CREDENTIALS_FILE, get_credentials
from services.ai_service import chat_copilot, translate_and_analyze_feedback, detect_waste_gemini
from services.rag_service import add_document_to_rag
from services.bq_service import predict_carbon_emissions_bq, forecast_energy_demand_bq

router = APIRouter()

@router.post("/chat")
def handle_chat(req: ChatRequest):
    return chat_copilot(req.query, req.context)

@router.post("/translate")
def handle_translate(req: FeedbackRequest):
    return translate_and_analyze_feedback(req.text)

@router.post("/upload-manual")
async def handle_upload(title: str = Form(...), text: str = Form(...)):
    doc_id = f"doc-{os.urandom(4).hex()}"
    add_document_to_rag(doc_id, title, text)
    return {"status": "success", "message": f"Document '{title}' embedded and indexed in AlloyDB RAG index."}

@router.get("/predictions/carbon")
def get_carbon_prediction(renewables: int, transit: int, recycling: int, attendance: int = 50000):
    val = predict_carbon_emissions_bq(renewables, transit, recycling, attendance)
    return {"carbonFootprint": val}

@router.get("/predictions/energy")
def get_energy_forecast():
    forecast_data = forecast_energy_demand_bq()
    return {"forecast": forecast_data}

@router.post("/detect-waste")
async def handle_detect_waste(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        mime_type = file.content_type or "image/jpeg"
        result = detect_waste_gemini(contents, mime_type)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/config")
def get_config():
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "eventTitle": "APAC Cricket Stadium Navigator",
        "eventSubtitle": "EcoAccess Smart Sustainability & Accessibility Navigation Center",
        "baseBudget": 30.0,
        "mapNodes": [
            { "id": "node-entry", "name": "🟢 Main Entrance Gate", "x": 10, "y": 85, "type": "entry", "color": "#2dd4bf", "details": "Gate 1 Main Entrance: Contextual ticketing, security screening checkpoints, level-grade access corridors, and physical routing support." },
            { "id": "node-exit", "name": "🔴 Main Exit Gate", "x": 90, "y": 15, "type": "exit", "color": "#f43f5e", "details": "Gate 8 Main Exit Gate: High-capacity pedestrian outflow corridor with clear directional lighting guiding spectators directly to transportation links." },
            { "id": "node-solar", "name": "☀️ Solar Charging Station", "x": 24, "y": 75, "type": "charging", "color": "var(--color-accent-yellow)", "details": "Clean Solar Energy Charging Station: Dynamic on-grid cleanliness monitoring active. Allows guests to locate clean energy power points instantly." },
            { "id": "node-shuttle", "name": "🚌 Shuttle Pick-up", "x": 88, "y": 78, "type": "shuttle", "color": "var(--color-accent-pink)", "details": "Shuttle Transit Hub: Low-emission shuttle vehicles depart to main transit links when at full capacity during peak times." },
            { "id": "node-headset", "name": "🎧 Audio Headset Pick Up", "x": 12, "y": 48, "type": "audio", "color": "var(--color-accent-white)", "details": "Assistive Hearing Desk: Collect dynamic audio commentary headsets for the APAC cricket match. Loop services active." },
            { "id": "node-toilet", "name": "♿ Restrooms", "x": 62, "y": 22, "type": "toilet", "color": "var(--color-accent-cyan)", "details": "Universal Restroom Facility: Level grade ramped access, auto sliding doors, and water-conserving sensor taps." },
            { "id": "node-help", "name": "ℹ️ Information & Help Desk", "x": 32, "y": 15, "type": "helpdesk", "color": "var(--color-accent-purple)", "details": "Venue Support Center: Live team support for physical routing, translation assistance, and general inquiries." },
            { "id": "node-food", "name": "🍎 Food Kiosk", "x": 78, "y": 38, "type": "food", "color": "#15803d", "details": "Plaza Food Kiosk: Organic and vegan concessions, plastic-free reusable cup drop points, and contactless payment." },
            { "id": "node-main-venue", "name": "Main Venue Zone", "x": 50, "y": 50, "type": "venue", "color": "#059669", "details": "Main Venue Zone: The primary stadium field hosting cricket match play and main athletics." }
        ]
    }

@router.post("/config")
def save_config(config: EventConfig):
    # Ensure parent directory of CONFIG_FILE exists
    os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
    with open(CONFIG_FILE, "w") as f:
        json.dump(config.model_dump(), f, indent=2)
    return {"status": "success"}

@router.get("/credentials")
def handle_get_credentials():
    return get_credentials()

@router.post("/credentials")
def handle_save_credentials(creds: CredentialsConfig):
    os.makedirs(os.path.dirname(CREDENTIALS_FILE), exist_ok=True)
    
    # If mode is not mock, test the connection
    if creds.apiMode != "mock":
        from google import genai
        try:
            if creds.apiMode == "ai_studio":
                if not creds.apiKey:
                    return {"status": "error", "message": "API Key is required for Google AI Studio mode."}
                test_client = genai.Client(api_key=creds.apiKey)
            else: # vertex_ai
                # Override env variables to check client
                os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"
                if creds.gcpProjectId:
                    os.environ["GOOGLE_CLOUD_PROJECT"] = creds.gcpProjectId
                if creds.gcpLocation:
                    os.environ["GOOGLE_CLOUD_LOCATION"] = creds.gcpLocation
                test_client = genai.Client()
            
            # Run light check
            test_client.models.generate_content(
                model="gemini-2.5-flash",
                contents="Ping"
            )
        except Exception as e:
            return {"status": "error", "message": f"Connection verification failed: {e}"}
            
    with open(CREDENTIALS_FILE, "w") as f:
        json.dump(creds.model_dump(), f, indent=2)
    return {"status": "success", "message": "Credentials configured and verified successfully!"}
