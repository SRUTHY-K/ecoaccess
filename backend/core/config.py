import os
from google import genai

def load_dotenv():
    # Find .env file in possible paths:
    # 1. Project root (two levels up from backend/core/config.py)
    # 2. Inside backend directory (one level up)
    # 3. Current working directory
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    paths = [
        os.path.join(base_dir, ".env"),
        os.path.join(os.path.dirname(base_dir), ".env"),
        ".env"
    ]
    for path in paths:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if not line or line.startswith("#"):
                            continue
                        parts = line.split("=", 1)
                        if len(parts) == 2:
                            key, val = parts
                            key = key.strip()
                            val = val.strip().strip("'\"")
                            # Set if not already specified in environment
                            if key not in os.environ:
                                os.environ[key] = val
                break
            except Exception as e:
                print(f"Error loading {path}: {e}")

# Load .env configurations
load_dotenv()

# Project Configuration
PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT", "river-sonar-497916-s5")
LOCATION = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")
CONFIG_FILE = "data/event_config.json"
CREDENTIALS_FILE = "data/credentials_config.json"

# Ensure environment variables are set for GCP libraries
os.environ["GOOGLE_CLOUD_PROJECT"] = PROJECT_ID
os.environ["GOOGLE_CLOUD_LOCATION"] = LOCATION
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = os.environ.get("GOOGLE_GENAI_USE_VERTEXAI", "True")

import json

def get_credentials():
    if os.path.exists(CREDENTIALS_FILE):
        try:
            with open(CREDENTIALS_FILE, "r") as f:
                return json.load(f)
        except Exception:
            pass
    
    # Default fallbacks
    mode = "mock"
    use_vertex = os.environ.get("GOOGLE_GENAI_USE_VERTEXAI", "True")
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "river-sonar-497916-s5")
    location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")
    api_key = os.environ.get("GEMINI_API_KEY", "")
    
    # Try to deduce mode
    if api_key:
        mode = "ai_studio"
    elif use_vertex == "True" and project != "your-gcp-project-id":
        mode = "vertex_ai"
        
    return {
        "apiMode": mode,
        "apiKey": api_key,
        "gcpProjectId": project,
        "gcpLocation": location
    }

def get_genai_client():
    creds = get_credentials()
    mode = creds.get("apiMode", "mock")
    
    if mode == "mock":
        return None
        
    if mode == "ai_studio":
        api_key = creds.get("apiKey", "")
        # Force AI Studio mode by overriding env variables temporarily
        os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "False"
        if api_key:
            return genai.Client(api_key=api_key)
        return genai.Client()
        
    if mode == "vertex_ai":
        os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"
        project = creds.get("gcpProjectId", "")
        location = creds.get("gcpLocation", "")
        if project:
            os.environ["GOOGLE_CLOUD_PROJECT"] = project
        if location:
            os.environ["GOOGLE_CLOUD_LOCATION"] = location
        return genai.Client()
    return None

class DynamicClientProxy:
    def __getattr__(self, name):
        real_client = get_genai_client()
        if not real_client:
            raise ValueError("Running in local mock simulation mode (No credentials configured)")
        return getattr(real_client, name)

# Initialize and expose the shared GenAI Client proxy
client = DynamicClientProxy()

