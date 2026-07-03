import os
import json
from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from schemas.models import ChatRequest, FeedbackRequest, EventConfig, CredentialsConfig
from core.config import CONFIG_FILE, CREDENTIALS_FILE, get_credentials
from core.logger import log_event
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
        "eventTitle": "EcoAccess Command Center",
        "eventSubtitle": "Smart Venue Telemetry, Sustainable Operations & Inclusive Decision Hub",
        "baseBudget": 30.0,
        "mapNodes": [
            { "id": "node-1", "name": "Venue A: Stadium Arena", "x": 50, "y": 50, "type": "stadium", "alert": "elevator" },
            { "id": "node-2", "name": "Venue C: Mega Fan Zone", "x": 80, "y": 35, "type": "fanzone", "alert": "grid" },
            { "id": "node-3", "name": "Venue B: Athletes' Village", "x": 30, "y": 25, "type": "village", "alert": "none" },
            { "id": "node-4", "name": "Venue D: Accessible Transport Hub", "x": 75, "y": 75, "type": "transporthub", "alert": "none" }
        ]
    }

@router.post("/config")
def save_config(config: EventConfig):
    # Ensure parent directory of CONFIG_FILE exists
    os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
    with open(CONFIG_FILE, "w") as f:
        json.dump(config.model_dump(), f, indent=2)
    log_event("INFO", "Backend", "save_config", "Event configuration persisted successfully.")
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
