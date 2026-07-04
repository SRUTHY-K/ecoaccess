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
    # 1. Prioritize environment variables (.env) if they are populated
    env_api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    env_project = os.environ.get("GOOGLE_CLOUD_PROJECT", "").strip()
    env_location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1").strip()
    env_use_vertex = os.environ.get("GOOGLE_GENAI_USE_VERTEXAI", "True").strip()

    # Determine if .env has valid non-placeholder configurations
    has_env_studio = bool(env_api_key)
    has_env_vertex = (env_use_vertex == "True" and env_project and env_project not in ["", "your-gcp-project-id"])

    if has_env_studio or has_env_vertex:
        # Deduce mode
        if env_use_vertex == "True" and env_project and env_project not in ["", "your-gcp-project-id"]:
            mode = "vertex_ai"
        elif env_api_key:
            mode = "ai_studio"
        else:
            mode = "mock"
            
        return {
            "apiMode": mode,
            "apiKey": env_api_key,
            "gcpProjectId": env_project,
            "gcpLocation": env_location
        }

    # 2. Fall back to credentials_config.json (UI settings) if environment is empty
    config = {
        "apiMode": "mock",
        "apiKey": "",
        "gcpProjectId": "",
        "gcpLocation": "us-central1"
    }

    if os.path.exists(CREDENTIALS_FILE):
        try:
            with open(CREDENTIALS_FILE, "r") as f:
                saved = json.load(f)
                # Override with saved UI config values if they are non-empty
                for key in ["apiMode", "apiKey", "gcpProjectId", "gcpLocation"]:
                    if key in saved and saved[key] != "":
                        config[key] = saved[key]
        except Exception:
            pass
            
    return config

_cached_client = None
_cached_creds = None

def get_genai_client():
    global _cached_client, _cached_creds
    creds = get_credentials()
    
    # Return cached client if credentials have not changed
    if _cached_client is not None and _cached_creds == creds:
        return _cached_client
        
    mode = creds.get("apiMode", "mock")
    
    if mode == "mock":
        _cached_client = None
        _cached_creds = creds
        return None
        
    if mode == "ai_studio":
        api_key = creds.get("apiKey", "")
        # Force AI Studio mode by overriding env variables temporarily
        os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "False"
        if api_key:
            client_inst = genai.Client(api_key=api_key)
        else:
            client_inst = genai.Client()
            
    elif mode == "vertex_ai":
        os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"
        project = creds.get("gcpProjectId", "")
        location = creds.get("gcpLocation", "")
        if project:
            os.environ["GOOGLE_CLOUD_PROJECT"] = project
        if location:
            os.environ["GOOGLE_CLOUD_LOCATION"] = location
        client_inst = genai.Client()
    else:
        client_inst = None
        
    _cached_client = client_inst
    _cached_creds = creds
    return _cached_client

class DynamicClientProxy:
    def __getattr__(self, name):
        real_client = get_genai_client()
        if not real_client:
            raise AttributeError(f"Running in local mock simulation mode (No credentials configured). Cannot access attribute '{name}'.")
        return getattr(real_client, name)

# Initialize and expose the shared GenAI Client proxy
client = DynamicClientProxy()

