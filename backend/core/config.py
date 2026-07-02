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

# Ensure environment variables are set for GCP libraries
os.environ["GOOGLE_CLOUD_PROJECT"] = PROJECT_ID
os.environ["GOOGLE_CLOUD_LOCATION"] = LOCATION
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = os.environ.get("GOOGLE_GENAI_USE_VERTEXAI", "True")

# Initialize and expose the shared GenAI Client
client = genai.Client()
